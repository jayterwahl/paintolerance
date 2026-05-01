import { browser } from 'wxt/browser';
import { defineContentScript } from 'wxt/utils/define-content-script';
import { PT_SELECTORS } from '../utils/selectors';
import { THREAD_REPLY_TEMPLATE_HTML } from '../utils/thread-reply-template';
import { PT_YAPPER, type GeneratedReply } from '../utils/yapper';

/**
 * Pain Tolerance — Observer + Injector (content script)
 *
 * MutationObserver watches for tweet cells authored by the configured user.
 * Injector places fake reply previews beneath detected tweets.
 */
type Intensity = 'mild' | 'medium' | 'unhinged';
type ActionType = 'reply' | 'retweet' | 'like' | 'bookmark' | 'views';
type SvgShape = readonly ['path' | 'polyline', string];

interface Settings {
  handle: string;
  active: boolean;
  intensity: Intensity;
}

interface VsEntry {
  cell: Element;
  container: HTMLDivElement;
}

interface ShiftedSibling {
  el: HTMLElement;
  virtualTop: number;
  visualTop: number;
  height: number;
  originalStyle: string | null;
}

interface ThreadInjection {
  tweetId: string;
  parent: HTMLElement;
  cell: Element;
  fakes: HTMLElement[];
  shiftedSiblings: ShiftedSibling[];
  itemHeight: number;
  originalParentMinHeight: string;
  originalParentHeight: number;
}

interface StorageChange {
  newValue?: unknown;
}

const DEFAULT_SETTINGS: Settings = {
  handle: '',
  active: false,
  intensity: 'medium',
};

export default defineContentScript({
  matches: ['*://twitter.com/*', '*://x.com/*'],
  runAt: 'document_idle',
  main(ctx) {
  let userHandle = '';
  let isActive = false;
  let intensity: Intensity = 'medium';

  // ── Virtual-Scroll Overlay ─────────────────────────────────────────
  // Profile pages use React virtual scroll: tweet cells are position:absolute
  // inside a tall container. Injecting siblings into that container means
  // React re-renders immediately reset every position we touch. Instead we
  // maintain a position:fixed overlay outside the React tree and track reply
  // container positions via getBoundingClientRect + scroll listener.

  let vsOverlay: HTMLDivElement | null = null;
  const vsMap = new Map<string, VsEntry>();
  let vsRafId: number | null = null;
  let lastUrl = location.href;
  let debugEl: HTMLDivElement | null = null;
  let qaReportTimer: number | null = null;
  const threadInjections = new Map<string, ThreadInjection>();
  let threadLayoutRafId: number | null = null;
  let threadResizeObserver: ResizeObserver | null = null;

  function isDebugEnabled(): boolean {
    return new URLSearchParams(location.search).has('ptdebug') ||
      localStorage.getItem('PT_DEBUG') === '1';
  }

  function debug(message: string): void {
    if (!isDebugEnabled()) return;
    console.debug('[Pain Tolerance]', message);

    if (!debugEl || !document.contains(debugEl)) {
      debugEl = document.createElement('div');
      debugEl.id = 'pt-debug';
      debugEl.style.cssText =
        'position:fixed;right:12px;bottom:12px;z-index:2147483647;' +
        'max-width:360px;padding:10px 12px;border-radius:10px;' +
        'background:rgba(29,155,240,0.95);color:white;font:12px/16px monospace;' +
        'white-space:pre-wrap;pointer-events:none;box-shadow:0 4px 24px rgba(0,0,0,0.35);';
      document.documentElement.appendChild(debugEl);
    }

    debugEl.textContent = message;
  }

  function rectOf(el: Element | null): Record<string, number> | null {
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return {
      x: Math.round(rect.x * 100) / 100,
      y: Math.round(rect.y * 100) / 100,
      top: Math.round(rect.top * 100) / 100,
      right: Math.round(rect.right * 100) / 100,
      bottom: Math.round(rect.bottom * 100) / 100,
      left: Math.round(rect.left * 100) / 100,
      width: Math.round(rect.width * 100) / 100,
      height: Math.round(rect.height * 100) / 100,
    };
  }

  function styleOf(el: Element | null): Record<string, string> | null {
    if (!el) return null;
    const style = window.getComputedStyle(el);
    return {
      display: style.display,
      position: style.position,
      top: style.top,
      right: style.right,
      bottom: style.bottom,
      left: style.left,
      transform: style.transform,
      translate: style.translate,
      zIndex: style.zIndex,
      opacity: style.opacity,
      visibility: style.visibility,
      overflow: style.overflow,
      overflowX: style.overflowX,
      overflowY: style.overflowY,
      boxSizing: style.boxSizing,
      margin: style.margin,
      padding: style.padding,
      border: style.border,
      backgroundColor: style.backgroundColor,
      color: style.color,
      fontFamily: style.fontFamily,
      fontSize: style.fontSize,
      fontWeight: style.fontWeight,
      lineHeight: style.lineHeight,
    };
  }

  function describeElement(el: Element | null, label: string): Record<string, unknown> | null {
    if (!el) return null;
    const htmlEl = el as HTMLElement;
    return {
      label,
      tag: el.tagName.toLowerCase(),
      id: htmlEl.id || null,
      className: htmlEl.className || null,
      dataTestId: htmlEl.dataset?.testid ?? null,
      ptParentTweet: htmlEl.dataset?.ptParentTweet ?? null,
      ptFakeReply: htmlEl.dataset?.ptFakeReply ?? null,
      inlineStyle: htmlEl.getAttribute('style'),
      rect: rectOf(el),
      style: styleOf(el),
      text: (el.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 220),
    };
  }

  function describeSibling(el: Element, index: number): Record<string, unknown> {
    const tweet = el.querySelector(PT_SELECTORS.TWEET_CELL);
    return {
      index,
      self: describeElement(el, 'sibling'),
      tweet: describeElement(tweet, 'siblingTweet'),
      tweetId: tweet ? extractTweetId(tweet) : null,
      isUserTweet: tweet ? isUserTweet(tweet) : false,
      isFake: el instanceof HTMLElement && (el.dataset.ptFakeReply === 'true' || el.dataset.ptParentTweet !== undefined),
    };
  }

  function collectQaReport(reason: string): Record<string, unknown> {
    const focalTweetId = getFocalTweetId();
    const tweets = Array.from(document.querySelectorAll(PT_SELECTORS.TWEET_CELL));
    const focalTweet = tweets.find(tweet => extractTweetId(tweet) === focalTweetId) ??
      tweets.find(tweet => isUserTweet(tweet)) ??
      null;
    const focalArticle = focalTweet?.closest('article') ?? focalTweet;
    const focalBoundary = focalArticle ? findCellBoundary(focalArticle) : null;
    const templateBoundary = focalBoundary && focalTweetId
      ? findFirstThreadReplyBoundaryAfter(focalBoundary, focalTweetId)
      : null;
    const parent = focalBoundary?.parentElement ?? null;
    const siblings = parent
      ? Array.from(parent.children).map((child, index) => describeSibling(child, index)).slice(0, 30)
      : [];
    const fakes = Array.from(document.querySelectorAll('[data-pt-parent-tweet]'))
      .map((fake, index) => ({
        index,
        self: describeElement(fake, 'fake'),
        tweet: describeElement(fake.querySelector(PT_SELECTORS.TWEET_CELL), 'fakeTweet'),
        avatar: describeElement(fake.querySelector(`${PT_SELECTORS.TWEET_AVATAR} img`), 'fakeAvatar'),
        author: describeElement(fake.querySelector(PT_SELECTORS.TWEET_AUTHOR), 'fakeAuthor'),
        text: describeElement(fake.querySelector(PT_SELECTORS.TWEET_TEXT), 'fakeText'),
        actionRow: describeElement(fake.querySelector(PT_SELECTORS.TWEET_ACTIONS), 'fakeActionRow'),
      }));
    const realReplies = tweets
      .filter(tweet => extractTweetId(tweet) !== focalTweetId && !tweet.closest('[data-pt-fake-reply="true"]'))
      .slice(0, 6)
      .map((tweet, index) => ({
        index,
        tweetId: extractTweetId(tweet),
        tweet: describeElement(tweet, 'realReplyTweet'),
        boundary: describeElement(findCellBoundary(tweet.closest('article') ?? tweet), 'realReplyBoundary'),
        avatar: describeElement(tweet.querySelector(`${PT_SELECTORS.TWEET_AVATAR} img`), 'realReplyAvatar'),
        author: describeElement(tweet.querySelector(PT_SELECTORS.TWEET_AUTHOR), 'realReplyAuthor'),
        text: describeElement(tweet.querySelector(PT_SELECTORS.TWEET_TEXT), 'realReplyText'),
        actionRow: describeElement(tweet.querySelector(PT_SELECTORS.TWEET_ACTIONS), 'realReplyActionRow'),
      }));

    return {
      reason,
      url: location.href,
      timestamp: new Date().toISOString(),
      viewport: { width: window.innerWidth, height: window.innerHeight, scrollX, scrollY },
      settings: { handle: userHandle, active: isActive, intensity },
      counts: {
        tweets: tweets.length,
        userTweets: tweets.filter(tweet => isUserTweet(tweet)).length,
        fakeNodes: fakes.length,
      },
      focalTweetId,
      focalTweet: describeElement(focalTweet, 'focalTweet'),
      focalBoundary: describeElement(focalBoundary, 'focalBoundary'),
      focalParent: describeElement(parent, 'focalParent'),
      templateBoundary: describeElement(templateBoundary, 'templateBoundary'),
      templateTweet: describeElement(templateBoundary?.querySelector(PT_SELECTORS.TWEET_CELL) ?? null, 'templateTweet'),
      fakes,
      realReplies,
      siblings,
    };
  }

  async function sendQaReport(reason: string): Promise<void> {
    if (!isDebugEnabled()) return;
    const report = collectQaReport(reason);

    try {
      const response = await browser.runtime.sendMessage({
        type: 'pain-tolerance:qa-report',
        report,
      }) as { ok?: boolean; endpoint?: string; error?: string } | undefined;

      if (response?.ok) {
        debug(`${reason}\nQA report saved\nendpoint=${response.endpoint ?? '(unknown)'}\nfakes=${(report.fakes as unknown[]).length}\ntweets=${(report.counts as { tweets: number }).tweets}`);
      } else {
        debug(`${reason}\nQA report failed in background\n${response?.error ?? 'No response from background'}`);
      }
    } catch (error) {
      debug(`${reason}\nQA report messaging failed\n${error instanceof Error ? error.message : String(error)}`);
    }
  }

  function scheduleQaReport(reason: string): void {
    if (!isDebugEnabled()) return;
    if (qaReportTimer !== null) window.clearTimeout(qaReportTimer);
    qaReportTimer = window.setTimeout(() => {
      qaReportTimer = null;
      void sendQaReport(reason);
    }, 400);
  }

  function getVsOverlay(): HTMLDivElement {
    if (!vsOverlay || !document.contains(vsOverlay)) {
      vsOverlay = document.createElement('div');
      vsOverlay.id = 'pt-vs-overlay';

      // Twitter sets TwitterChirp on an inner container, not body — inherit it
      // explicitly so overlay text doesn't fall back to system fonts.
      // Query an actual rendered tweet text node — that's where Twitter
      // applies TwitterChirp, not on the column container.
      const fontSource =
        document.querySelector('[data-testid="tweetText"]') ||
        document.querySelector('[data-testid="User-Name"]') ||
        document.querySelector('[data-testid="primaryColumn"]') ||
        document.body;
      const fontFamily = window.getComputedStyle(fontSource).fontFamily;

      vsOverlay.style.cssText =
        'position:fixed;top:0;left:0;width:100%;height:100%;' +
        'pointer-events:none;z-index:99999;overflow:visible;' +
        'font-family:' + fontFamily + ';';
      document.body.appendChild(vsOverlay);
    }
    return vsOverlay;
  }

  function updateVsOverlay(): void {
    vsRafId = null;

    // Collect live entries (clean up stale ones)
    const live = [];
    for (const [tweetId, entry] of vsMap) {
      if (!document.contains(entry.cell)) {
        entry.container.remove();
        vsMap.delete(tweetId);
        continue;
      }
      live.push(entry);
    }

    // Sort by tweet bottom edge so we place containers top-to-bottom
    live.sort((a, b) =>
      a.cell.getBoundingClientRect().bottom - b.cell.getBoundingClientRect().bottom
    );

    // Place each container directly below its tweet, but never overlapping
    // the previous container (multiple tweets' blocks must not collide).
    let bottomEdge = -Infinity;
    for (const { cell, container } of live) {
      const rect = cell.getBoundingClientRect();

      if (rect.width === 0 || rect.top > window.innerHeight + 400) {
        container.style.visibility = 'hidden';
        continue;
      }

      const top = Math.max(rect.bottom, bottomEdge);
      bottomEdge = top + container.offsetHeight;

      if (top + container.offsetHeight < -400) {
        container.style.visibility = 'hidden';
        continue;
      }

      container.style.visibility = '';
      container.style.top = top + 'px';
      container.style.left = rect.left + 'px';
      container.style.width = rect.width + 'px';
    }
  }

  function scheduleVsUpdate(): void {
    if (!vsRafId) {
      vsRafId = ctx.requestAnimationFrame(updateVsOverlay);
    }
  }

  /** Read the page's actual background color so overlay containers are opaque. */
  function getPageBg(): string {
    const candidates = [
      document.querySelector('[data-testid="primaryColumn"]'),
      document.querySelector('main'),
      document.body,
    ];
    for (const el of candidates) {
      if (!el) continue;
      const bg = window.getComputedStyle(el).backgroundColor;
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') return bg;
    }
    return 'rgb(0,0,0)';
  }

  const INTENSITY_MAP: Record<Intensity, readonly [number, number]> = {
    mild: [3, 5],
    medium: [6, 10],
    unhinged: [11, 20],
  };

  function normalizeIntensity(value: unknown): Intensity {
    return value === 'mild' || value === 'medium' || value === 'unhinged'
      ? value
      : 'medium';
  }

  // ── Helpers ──────────────────────────────────────────────────────

  function getGeneratedReplyCount(tweetId: string): number {
    return PT_YAPPER.generateReplyCount(tweetId, INTENSITY_MAP[intensity] || INTENSITY_MAP.medium);
  }

  /**
   * Extract the tweet ID from a tweet cell element.
   * Looks for the permalink anchor containing /status/<id>.
   */
  function extractTweetId(tweetEl: Element): string | null {
    const timeEl = tweetEl.querySelector(PT_SELECTORS.TWEET_LINK);
    if (!timeEl) return null;
    const anchor = timeEl.closest<HTMLAnchorElement>('a');
    if (!anchor) return null;
    const match = anchor.href.match(/\/status\/(\d+)/);
    return match ? match[1] : null;
  }

  /**
   * Check if a tweet cell was authored by the configured user handle.
   */
  function isUserTweet(tweetEl: Element): boolean {
    const authorEl = tweetEl.querySelector(PT_SELECTORS.TWEET_AUTHOR);
    if (!authorEl) return false;

    const handle = userHandle.toLowerCase().replace(/^@/, '');
    const rawText = (authorEl.textContent ?? '').toLowerCase();
    const compactText = rawText.replace(/\s+/g, '');

    return compactText.includes('@' + handle) || compactText.includes(handle);
  }

  /**
   * Check if a tweet is embedded inside a quoted tweet card.
   * We should not inject replies on quoted tweets — only on standalone tweets.
   */
  function isQuotedTweet(tweetEl: Element): boolean {
    return !!tweetEl.closest(PT_SELECTORS.QUOTE_CONTAINER);
  }

  /**
   * Check if a tweet is a continuation of a user's thread (not the last tweet).
   * In a thread, intermediate tweets have a connecting line (vertical bar)
   * to the next tweet. We only inject on the last tweet in a thread to avoid
   * flooding every single tweet in a long thread.
   */
  function isThreadContinuation(tweetEl: Element): boolean {
    // On the profile page / home timeline every tweet is a standalone post.
    // Only apply thread-continuation logic when we're actually inside a thread.
    if (!isThreadView()) return false;

    const article = tweetEl.closest('article') || tweetEl;
    const cellDiv = article.closest('[data-testid="cellInnerDiv"]') || article.parentElement;
    if (!cellDiv) return false;

    // Twitter draws a vertical connecting line between thread tweets.
    // The cell containing a non-terminal thread tweet has a sibling cell
    // with a connecting line element before the next tweet.
    // Check if this cell's article has a vertical connector below it
    // (usually rendered as a div with a specific height between thread tweets).
    const nextCell = cellDiv.nextElementSibling;
    if (!nextCell) return false;

    // If the next cell contains a tweet by the same user and doesn't have
    // social context (retweet/like label), this is a thread continuation.
    const nextTweet = nextCell.querySelector(PT_SELECTORS.TWEET_CELL);
    if (nextTweet && isUserTweet(nextTweet)) {
      // Verify it's not a retweet or social context item
      const hasSocialContext = nextCell.querySelector(PT_SELECTORS.SOCIAL_CONTEXT);
      if (!hasSocialContext) return true;
    }

    return false;
  }

  // ── SVG Icon Helper ──────────────────────────────────────────────

  /**
   * Create a small SVG icon that matches Twitter's native outline icon style.
   * Uses stroke="currentColor" so it inherits the surrounding text color (gray).
   */
  function makeSvgIcon(type: ActionType): SVGSVGElement {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '18');
    svg.setAttribute('height', '18');
    svg.style.cssText =
      'fill:none;stroke:currentColor;stroke-width:1.5;' +
      'stroke-linecap:round;stroke-linejoin:round;vertical-align:middle;flex-shrink:0;';

    const shapes: Record<ActionType, readonly SvgShape[]> = {
      // Speech bubble (reply)
      reply: [['path', 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z']] as const,
      // Circular arrows (retweet)
      retweet: [
        ['polyline', '17 1 21 5 17 9'],
        ['path',     'M3 11V9a4 4 0 0 1 4-4h14'],
        ['polyline', '7 23 3 19 7 15'],
        ['path',     'M21 13v2a4 4 0 0 1-4 4H3'],
      ],
      // Heart outline (like)
      like: [['path',
        'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 ' +
        '7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
      ]] as const,
      // Bookmark ribbon
      bookmark: [['path', 'M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z']] as const,
      // Bar chart (views / analytics)
      views: [
        ['path', 'M18 20V10'],
        ['path', 'M12 20V4'],
        ['path', 'M6 20v-6'],
      ],
    };

    for (const [tag, data] of (shapes[type] || [])) {
      const el = document.createElementNS(ns, tag);
      el.setAttribute(tag === 'polyline' ? 'points' : 'd', data);
      svg.appendChild(el);
    }
    return svg;
  }

  // ── DOM Builder ──────────────────────────────────────────────────

  function formatMetric(count: number): string {
    return count >= 1000
      ? (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
      : String(count);
  }

  function resolveAvatarUrl(avatar: string): string {
    if (!avatar) return '';
    if (avatar.startsWith('/') && !avatar.startsWith('//')) {
      return browser.runtime.getURL(avatar as Parameters<typeof browser.runtime.getURL>[0]);
    }
    return avatar;
  }

  /**
   * Build a compact reply preview element matching Twitter's native
   * reply preview structure beneath a tweet on timeline/profile view.
   */
  function buildReplyPreview(reply: GeneratedReply): HTMLDivElement {
    // Outer container
    const container = document.createElement('div');
    container.classList.add('pt-reply-preview');
    container.style.cssText =
      'display:flex;padding:12px 16px;border-top:1px solid rgb(47,51,54);gap:12px;';

    // Avatar
    const avatarImg = document.createElement('img');
    avatarImg.src = resolveAvatarUrl(reply.avatar);
    avatarImg.alt = '';
    avatarImg.style.cssText =
      'width:32px;height:32px;border-radius:50%;flex-shrink:0;';

    // Right column (name row + text + metrics)
    const rightCol = document.createElement('div');
    rightCol.style.cssText = 'display:flex;flex-direction:column;gap:2px;min-width:0;flex:1;';

    // Name row
    const nameRow = document.createElement('div');
    nameRow.style.cssText =
      'display:flex;align-items:center;gap:4px;font-size:15px;line-height:20px;';

    const displayNameSpan = document.createElement('span');
    // color:inherit picks up Twitter's own primary-text colour in both light and dark mode
    displayNameSpan.style.cssText = 'font-weight:700;color:inherit;';
    displayNameSpan.textContent = reply.displayName;

    nameRow.appendChild(displayNameSpan);

    if (reply.verified) {
      const badge = document.createElement('span');
      badge.textContent = '\u2713';
      badge.style.cssText =
        'color:rgb(29,155,240);font-size:14px;font-weight:700;';
      nameRow.appendChild(badge);
    }

    const handleSpan = document.createElement('span');
    handleSpan.style.cssText = 'color:rgb(113,118,123);font-weight:400;';
    handleSpan.textContent = reply.handle;

    const dotSpan = document.createElement('span');
    dotSpan.style.cssText = 'color:rgb(113,118,123);padding:0 4px;';
    dotSpan.textContent = '\u00B7';

    const timeSpan = document.createElement('span');
    timeSpan.style.cssText = 'color:rgb(113,118,123);font-weight:400;';
    timeSpan.textContent = reply.timestamp;

    nameRow.appendChild(handleSpan);
    nameRow.appendChild(dotSpan);
    nameRow.appendChild(timeSpan);

    // Tweet text
    const textDiv = document.createElement('div');
    textDiv.style.cssText =
      'font-size:15px;line-height:20px;color:inherit;overflow-wrap:break-word;';
    textDiv.textContent = reply.text;

    // Action buttons row (reply, retweet, like, bookmark, views)
    const actionRow = document.createElement('div');
    actionRow.style.cssText =
      'display:flex;justify-content:space-between;max-width:425px;margin-top:6px;' +
      'font-size:13px;color:rgb(113,118,123);';

    const actions: Array<{ type: ActionType; count: number }> = [
      { type: 'reply',    count: reply.metrics.replies },
      { type: 'retweet',  count: reply.metrics.retweets },
      { type: 'like',     count: reply.metrics.likes },
      { type: 'bookmark', count: reply.metrics.bookmarks },
      { type: 'views',    count: reply.metrics.views },
    ];

    for (const action of actions) {
      const btn = document.createElement('div');
      btn.style.cssText =
        'display:flex;align-items:center;gap:4px;cursor:pointer;' +
        'padding:4px 8px;border-radius:9999px;';
      btn.appendChild(makeSvgIcon(action.type));
      if (action.count > 0) {
        const countSpan = document.createElement('span');
        countSpan.textContent = formatMetric(action.count);
        btn.appendChild(countSpan);
      }
      actionRow.appendChild(btn);
    }

    rightCol.appendChild(nameRow);
    rightCol.appendChild(textDiv);
    rightCol.appendChild(actionRow);

    container.appendChild(avatarImg);
    container.appendChild(rightCol);

    return container;
  }

  function replaceFirstMatchingSpan(
    root: Element | null,
    predicate: (text: string, span: HTMLSpanElement) => boolean,
    value: string,
  ): boolean {
    if (!root) return false;
    const spans = Array.from(root.querySelectorAll<HTMLSpanElement>('span'));
    const match = spans.find(span => predicate((span.textContent ?? '').trim(), span));
    if (!match) return false;
    match.textContent = value;
    return true;
  }

  function createMetricTransition(action: Element): HTMLElement | null {
    const inner = action.querySelector<HTMLElement>('div[dir="ltr"]') ??
      action.querySelector<HTMLElement>('div') ??
      (action instanceof HTMLElement ? action : null);
    if (!inner) return null;

    const wrapper = document.createElement('div');
    wrapper.className = 'css-175oi2r r-xoduu5 r-1udh08x';
    wrapper.innerHTML =
      '<span data-testid="app-text-transition-container" style="transition-property: transform; transition-duration: 0.3s; transform: translate3d(0px, 0px, 0px);">' +
        '<span class="css-1jxf684 r-1ttztb7 r-qvutc0 r-poiln3 r-n6v787 r-1cwl3u0 r-1k6nrdp r-n7gxbd">' +
          '<span class="css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-poiln3"></span>' +
        '</span>' +
      '</span>';
    inner.appendChild(wrapper);
    return wrapper.querySelector<HTMLElement>('[data-testid="app-text-transition-container"]');
  }

  function setMetricText(action: Element, count: number): void {
    let transition = action.querySelector<HTMLElement>('[data-testid="app-text-transition-container"]');

    if (count <= 0) {
      transition?.remove();
      return;
    }

    transition ??= createMetricTransition(action);
    if (!transition) return;

    const metric = formatMetric(count);
    const leaf = transition.querySelector<HTMLElement>('span > span') ??
      Array.from(transition.querySelectorAll<HTMLElement>('span')).reverse()
        .find(span => span.children.length === 0) ??
      transition;

    leaf.textContent = metric;
  }

  function setActionMetric(root: Element, testId: string, count: number): void {
    const action = root.querySelector(`[data-testid="${testId}"]`);
    if (!action) return;
    setMetricText(action, count);
  }

  function actionItemFor(row: Element, descendant: Element | null): HTMLElement | null {
    if (!descendant) return null;

    let item: Element | null = descendant;
    while (item?.parentElement && item.parentElement !== row) {
      item = item.parentElement;
    }

    return item instanceof HTMLElement ? item : null;
  }

  function findActionItem(row: Element | null, selector: string): HTMLElement | null {
    if (!row) return null;
    return actionItemFor(row, row.querySelector(selector));
  }

  function tintActionGray(action: Element): void {
    if (action instanceof HTMLElement) {
      setImportant(action, 'color', 'rgb(113, 118, 123)');
    }

    for (const child of action.querySelectorAll<HTMLElement>('*')) {
      setImportant(child, 'color', 'rgb(113, 118, 123)');
    }

    const svg = action.querySelector<SVGSVGElement>('svg');
    if (svg) {
      svg.style.setProperty('color', 'rgb(113, 118, 123)', 'important');
      svg.style.setProperty('fill', 'currentColor', 'important');
    }
  }

  function resetLikeAction(root: Element, count: number): void {
    const likedAction = root.querySelector('[data-testid="unlike"]');
    const likeAction = root.querySelector('[data-testid="like"]');
    const action = likedAction ?? likeAction;
    if (!action) return;

    action.setAttribute('data-testid', 'like');
    action.setAttribute('aria-label', count > 0 ? `${formatMetric(count)} Likes` : 'Like');
    action.removeAttribute('aria-pressed');

    tintActionGray(action);

    const svg = action.querySelector<SVGSVGElement>('svg');
    if (svg) {
      svg.innerHTML = '<g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g>';
    }

    setMetricText(action, count);
  }

  function normalizeBookmarkShareGap(root: Element): void {
    const bookmarkSvg = root.querySelector<SVGSVGElement>(
      '[data-testid="bookmark"] svg, [aria-label*="Bookmark"] svg',
    );
    bookmarkSvg?.style.setProperty('margin-right', '0.5rem', 'important');
  }

  function visibleActionItems(row: Element): HTMLElement[] {
    return Array.from(row.children)
      .filter((child): child is HTMLElement => child instanceof HTMLElement)
      .filter((child) => {
        const rect = child.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      });
  }

  function alignActionRowToTemplate(root: Element, templateBoundary: Element): void {
    const row = root.querySelector(PT_SELECTORS.TWEET_ACTIONS);
    const templateRow = templateBoundary.querySelector(PT_SELECTORS.TWEET_ACTIONS);
    if (!(row instanceof HTMLElement) || !(templateRow instanceof HTMLElement)) return;

    const items = visibleActionItems(row);
    const templateItems = visibleActionItems(templateRow);
    if (items.length === 0 || items.length !== templateItems.length) return;

    const templateRowRect = templateRow.getBoundingClientRect();
    setImportant(row, 'position', 'relative');
    setImportant(row, 'display', 'block');
    setImportant(row, 'height', `${templateRowRect.height}px`);
    setImportant(row, 'min-height', `${templateRowRect.height}px`);

    items.forEach((item, index) => {
      const templateRect = templateItems[index].getBoundingClientRect();
      setImportant(item, 'position', 'absolute');
      setImportant(item, 'top', `${templateRect.top - templateRowRect.top}px`);
      setImportant(item, 'left', `${templateRect.left - templateRowRect.left}px`);
      setImportant(item, 'width', `${templateRect.width}px`);
      setImportant(item, 'height', `${templateRect.height}px`);
      setImportant(item, 'margin', '0px');
      setImportant(item, 'transform', 'none');
      setImportant(item, 'translate', 'none');
    });
  }

  function ensureBookmarkAction(root: Element, templateBoundary: Element): void {
    const row = root.querySelector(PT_SELECTORS.TWEET_ACTIONS);
    if (!row) return;

    const existingBookmark = findActionItem(row, '[data-testid="bookmark"], [aria-label*="Bookmark"]');
    if (existingBookmark) {
      tintActionGray(existingBookmark);
      normalizeBookmarkShareGap(root);
      return;
    }

    const shareItem = findActionItem(
      row,
      '[data-testid="share"], [data-testid="send"], [aria-label*="Share"], [aria-label*="share"]',
    ) ?? (row.lastElementChild instanceof HTMLElement ? row.lastElementChild : null);
    if (!shareItem) return;

    const templateRow = templateBoundary.querySelector(PT_SELECTORS.TWEET_ACTIONS);
    const templateBookmark = findActionItem(
      templateRow,
      '[data-testid="bookmark"], [aria-label*="Bookmark"]',
    );

    const bookmarkItem = (templateBookmark ?? shareItem).cloneNode(true) as HTMLElement;
    bookmarkItem.setAttribute('data-testid', 'bookmark');
    bookmarkItem.setAttribute('aria-label', 'Bookmark');
    bookmarkItem.removeAttribute('aria-pressed');

    const transition = bookmarkItem.querySelector('[data-testid="app-text-transition-container"]');
    transition?.remove();

    const svg = bookmarkItem.querySelector<SVGSVGElement>('svg');
    if (svg) {
      svg.innerHTML = '<g><path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path></g>';
    }
    tintActionGray(bookmarkItem);

    row.insertBefore(bookmarkItem, shareItem);
    normalizeBookmarkShareGap(root);
  }

  function isHeaderSvgRect(tweetRect: DOMRect, rect: DOMRect): boolean {
    if (rect.width < 8 || rect.height < 8) return false;
    if (rect.width > 36 || rect.height > 36) return false;
    if (rect.top < tweetRect.top - 4 || rect.top > tweetRect.top + 48) return false;
    if (rect.left < tweetRect.right - 128) return false;
    if (rect.right > tweetRect.right + 4) return false;
    return true;
  }

  function topRightHeaderSvgs(tweet: HTMLElement): SVGSVGElement[] {
    const tweetRect = tweet.getBoundingClientRect();
    const actionRow = tweet.querySelector(PT_SELECTORS.TWEET_ACTIONS);

    return Array.from(tweet.querySelectorAll<SVGSVGElement>('svg'))
      .filter((svg) => {
        if (actionRow?.contains(svg)) return false;
        if (svg.closest(PT_SELECTORS.TWEET_AVATAR)) return false;
        if (svg.closest('[data-pt-header-controls="true"]')) return false;
        return isHeaderSvgRect(tweetRect, svg.getBoundingClientRect());
      })
      .sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left)
      .slice(-2);
  }

  function unionRects(rects: readonly DOMRect[]): DOMRect | null {
    if (rects.length === 0) return null;
    const left = Math.min(...rects.map(rect => rect.left));
    const top = Math.min(...rects.map(rect => rect.top));
    const right = Math.max(...rects.map(rect => rect.right));
    const bottom = Math.max(...rects.map(rect => rect.bottom));
    return new DOMRect(left, top, right - left, bottom - top);
  }

  function ensureHeaderControls(root: Element, templateBoundary: Element): void {
    const cloneTweet = root.querySelector<HTMLElement>(PT_SELECTORS.TWEET_CELL);
    const templateTweet = templateBoundary.querySelector<HTMLElement>(PT_SELECTORS.TWEET_CELL);
    if (!cloneTweet || !templateTweet) return;

    const sourceSvgs = topRightHeaderSvgs(templateTweet);
    if (sourceSvgs.length === 0) return;

    const sourceRects = sourceSvgs.map(svg => svg.getBoundingClientRect());
    const controlsRect = unionRects(sourceRects);
    if (!controlsRect) return;

    root.querySelectorAll('[data-pt-header-controls="true"]').forEach(el => el.remove());

    const templateTweetRect = templateTweet.getBoundingClientRect();
    const overlay = document.createElement('div');
    overlay.dataset.ptHeaderControls = 'true';
    setImportant(overlay, 'position', 'absolute');
    setImportant(overlay, 'top', `${controlsRect.top - templateTweetRect.top}px`);
    setImportant(overlay, 'right', `${templateTweetRect.right - controlsRect.right}px`);
    setImportant(overlay, 'width', `${controlsRect.width}px`);
    setImportant(overlay, 'height', `${controlsRect.height}px`);
    setImportant(overlay, 'color', 'rgb(113, 118, 123)');
    setImportant(overlay, 'z-index', '2');
    setImportant(overlay, 'pointer-events', 'none');

    sourceSvgs.forEach((svg, index) => {
      const sourceRect = sourceRects[index];
      const slot = document.createElement('div');
      slot.setAttribute('aria-hidden', 'true');
      setImportant(slot, 'position', 'absolute');
      setImportant(slot, 'left', `${sourceRect.left - controlsRect.left}px`);
      setImportant(slot, 'top', `${sourceRect.top - controlsRect.top}px`);
      setImportant(slot, 'width', `${sourceRect.width}px`);
      setImportant(slot, 'height', `${sourceRect.height}px`);
      setImportant(slot, 'color', 'rgb(113, 118, 123)');

      const clone = svg.cloneNode(true) as SVGSVGElement;
      clone.removeAttribute('id');
      clone.style.setProperty('display', 'block', 'important');
      clone.style.setProperty('width', `${sourceRect.width}px`, 'important');
      clone.style.setProperty('height', `${sourceRect.height}px`, 'important');
      clone.style.setProperty('color', 'rgb(113, 118, 123)', 'important');

      for (const child of clone.querySelectorAll<SVGElement>('*')) {
        child.style.setProperty('color', 'rgb(113, 118, 123)', 'important');
        if (child.getAttribute('fill') !== 'none') child.setAttribute('fill', 'currentColor');
      }

      slot.appendChild(clone);
      overlay.appendChild(slot);
    });

    setImportant(cloneTweet, 'position', 'relative');
    cloneTweet.appendChild(overlay);
  }

  function neutralizeInteractiveElements(root: HTMLElement): void {
    for (const anchor of root.querySelectorAll<HTMLAnchorElement>('a[href]')) {
      anchor.href = '#';
      anchor.removeAttribute('target');
      anchor.setAttribute('tabindex', '-1');
      anchor.addEventListener('click', event => event.preventDefault());
    }

    for (const button of root.querySelectorAll<HTMLElement>('button, [role="button"]')) {
      button.setAttribute('tabindex', '-1');
      button.addEventListener('click', event => event.preventDefault());
    }
  }

  /**
   * Build a fake thread reply by cloning a real reply cell currently rendered by
   * Twitter/X, then replacing only the content. This lets Twitter's own classes,
   * spacing, borders, typography, icon sizing, and theme styles remain the source
   * of truth for status-page replies.
   */
  function setImportant(el: HTMLElement, property: string, value: string): void {
    el.style.setProperty(property, value, 'important');
  }

  function setAbsoluteVirtualLayout(el: HTMLElement, top: number, width: number): void {
    setImportant(el, 'position', 'absolute');
    setImportant(el, 'top', `${top}px`);
    setImportant(el, 'right', 'auto');
    setImportant(el, 'bottom', 'auto');
    setImportant(el, 'left', '0px');
    setImportant(el, 'width', `${width}px`);
    setImportant(el, 'transform', 'translateY(0px)');
    setImportant(el, 'translate', 'none');
    setImportant(el, 'opacity', '1');
    setImportant(el, 'visibility', 'visible');
    setImportant(el, 'background-color', getPageBg());
  }

  function prepareThreadCloneLayout(clone: HTMLElement, top: number, width: number): void {
    setAbsoluteVirtualLayout(clone, top, width);
    setImportant(clone, 'z-index', '1');

    const tweet = clone.querySelector<HTMLElement>(PT_SELECTORS.TWEET_CELL);
    let el = tweet?.parentElement ?? null;
    while (el && el !== clone) {
      setImportant(el, 'position', 'relative');
      setImportant(el, 'top', '0px');
      setImportant(el, 'left', '0px');
      setImportant(el, 'right', 'auto');
      setImportant(el, 'bottom', 'auto');
      setImportant(el, 'transform', 'none');
      setImportant(el, 'translate', 'none');
      setImportant(el, 'opacity', '1');
      setImportant(el, 'visibility', 'visible');
      el = el.parentElement;
    }
  }

  function getTranslateY(el: HTMLElement): number {
    const inlineTransform = el.style.transform;
    const inlineMatch = inlineTransform.match(/translateY\((-?\d+(?:\.\d+)?)px\)/);
    if (inlineMatch) return Number(inlineMatch[1]);

    const computedTransform = window.getComputedStyle(el).transform;
    if (!computedTransform || computedTransform === 'none') return 0;

    const matrixMatch = computedTransform.match(/^matrix\(([^)]+)\)$/);
    if (matrixMatch) {
      const parts = matrixMatch[1].split(',').map(part => Number(part.trim()));
      return Number.isFinite(parts[5]) ? parts[5] : 0;
    }

    return 0;
  }

  function getVisualTop(el: Element, parentRect: DOMRect): number {
    return el.getBoundingClientRect().top - parentRect.top;
  }

  function getVirtualTop(el: HTMLElement, parentRect: DOMRect): number {
    return getVisualTop(el, parentRect) - getTranslateY(el);
  }

  function setVirtualTopPreservingTransform(el: HTMLElement, top: number, width: number): void {
    setImportant(el, 'position', 'absolute');
    setImportant(el, 'top', `${top}px`);
    setImportant(el, 'right', 'auto');
    setImportant(el, 'bottom', 'auto');
    setImportant(el, 'left', '0px');
    setImportant(el, 'width', `${width}px`);
    setImportant(el, 'opacity', '1');
    setImportant(el, 'visibility', 'visible');
    setImportant(el, 'background-color', getPageBg());
  }

  function captureShiftedSibling(el: Element, parentRect: DOMRect): ShiftedSibling | null {
    if (!(el instanceof HTMLElement)) return null;
    const rect = el.getBoundingClientRect();
    return {
      el,
      virtualTop: getVirtualTop(el, parentRect),
      visualTop: getVisualTop(el, parentRect),
      height: rect.height,
      originalStyle: el.getAttribute('style'),
    };
  }

  function layoutThreadInjection(entry: ThreadInjection): void {
    if (!document.contains(entry.parent) || !document.contains(entry.cell)) {
      threadInjections.delete(entry.tweetId);
      return;
    }

    const parentRect = entry.parent.getBoundingClientRect();
    const cellRect = entry.cell.getBoundingClientRect();
    const startTop = cellRect.bottom - parentRect.top;
    let fakeTop = startTop;

    for (const fake of entry.fakes) {
      if (!document.contains(fake)) continue;
      setAbsoluteVirtualLayout(fake, fakeTop, parentRect.width);
      fakeTop += fake.getBoundingClientRect().height || entry.itemHeight;
    }

    const totalAddedHeight = fakeTop - startTop;

    let requiredBottom = fakeTop;
    for (const sibling of entry.shiftedSiblings) {
      if (!document.contains(sibling.el)) continue;

      // Let Twitter/X keep owning native virtual-list placement via transform.
      // We only add the height occupied by our fake block as a stable top offset.
      // If the reply composer expands, X updates the real replies' transforms;
      // adding startTop again here would double-count that movement and create a
      // growing gap above the first real reply.
      setVirtualTopPreservingTransform(
        sibling.el,
        sibling.virtualTop + totalAddedHeight,
        parentRect.width,
      );
      sibling.el.dataset.ptShifted = 'true';

      const rect = sibling.el.getBoundingClientRect();
      requiredBottom = Math.max(requiredBottom, rect.bottom - parentRect.top);
    }

    const minHeight = Math.max(entry.originalParentHeight, requiredBottom);
    setImportant(entry.parent, 'min-height', `${minHeight}px`);
  }

  function layoutThreadInjections(): void {
    threadLayoutRafId = null;
    for (const entry of threadInjections.values()) {
      layoutThreadInjection(entry);
    }
  }

  function clearThreadInjections(): void {
    for (const entry of threadInjections.values()) {
      for (const fake of entry.fakes) fake.remove();
      for (const sibling of entry.shiftedSiblings) {
        if (sibling.originalStyle === null) {
          sibling.el.removeAttribute('style');
        } else {
          sibling.el.setAttribute('style', sibling.originalStyle);
        }
        delete sibling.el.dataset.ptShifted;
      }
      entry.parent.style.minHeight = entry.originalParentMinHeight;
    }
    threadInjections.clear();
  }

  function clearInjectedArtifacts({ clearMarkers = true }: { clearMarkers?: boolean } = {}): void {
    clearThreadInjections();

    for (const [, entry] of vsMap) entry.container.remove();
    vsMap.clear();

    vsOverlay?.remove();
    vsOverlay = null;
    document.getElementById('pt-vs-overlay')?.remove();

    document.querySelectorAll<HTMLElement>('.pt-reply-container, [data-pt-fake-reply="true"]').forEach(el => el.remove());
    if (clearMarkers) {
      restoreGeneratedReplyCounts();
      document.querySelectorAll(`${PT_SELECTORS.TWEET_CELL}[${PT_SELECTORS.MARKER_ATTR}]`).forEach(tweet => {
        tweet.removeAttribute(PT_SELECTORS.MARKER_ATTR);
      });
    }
  }

  function scheduleThreadRelayout(): void {
    if (threadLayoutRafId === null) {
      threadLayoutRafId = ctx.requestAnimationFrame(layoutThreadInjections);
    }
  }

  function getThreadResizeObserver(): ResizeObserver | null {
    if (!('ResizeObserver' in window)) return null;
    if (!threadResizeObserver) {
      threadResizeObserver = new ResizeObserver(scheduleThreadRelayout);
    }
    return threadResizeObserver;
  }

  function setReplyAvatar(root: Element, avatarPath: string): void {
    const src = resolveAvatarUrl(avatarPath);
    if (!src) return;

    const existing = root.querySelector<HTMLImageElement>(`${PT_SELECTORS.TWEET_AVATAR} img, img[src], img`);
    if (existing) {
      existing.src = src;
      existing.srcset = '';
      existing.alt = '';
      return;
    }

    const avatarRoot = root.querySelector<HTMLElement>(PT_SELECTORS.TWEET_AVATAR);
    if (!avatarRoot) return;

    const avatarContainer = avatarRoot.querySelector<HTMLElement>('[data-testid^="UserAvatar-Container-"]') ??
      avatarRoot.querySelector<HTMLElement>('a') ??
      avatarRoot;

    avatarContainer.querySelector<HTMLImageElement>('img[data-pt-avatar="true"]')?.remove();
    setImportant(avatarContainer, 'position', 'relative');
    setImportant(avatarContainer, 'overflow', 'hidden');
    setImportant(avatarContainer, 'border-radius', '9999px');

    const injected = document.createElement('img');
    injected.setAttribute('data-pt-avatar', 'true');
    injected.src = src;
    injected.alt = '';
    injected.style.cssText =
      'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;' +
      'border-radius:9999px;z-index:2;display:block;pointer-events:none;';
    avatarContainer.appendChild(injected);
  }

  function buildThreadReplyFromTemplate(
    reply: GeneratedReply,
    templateBoundary: Element,
    parentTweetId: string,
  ): HTMLElement {
    const clone = templateBoundary.cloneNode(true) as HTMLElement;
    clone.classList.add('pt-reply-container');
    clone.setAttribute('data-pt-parent-tweet', parentTweetId);
    clone.setAttribute('data-pt-fake-reply', 'true');
    clone.setAttribute('aria-hidden', 'true');

    const tweet = clone.querySelector<HTMLElement>(PT_SELECTORS.TWEET_CELL);
    tweet?.removeAttribute(PT_SELECTORS.MARKER_ATTR);
    tweet?.setAttribute('data-pt-fake-reply', 'true');

    setReplyAvatar(clone, reply.avatar);

    const author = clone.querySelector(PT_SELECTORS.TWEET_AUTHOR);
    replaceFirstMatchingSpan(
      author,
      text => text.length > 0 && !text.startsWith('@') && text !== '·',
      reply.displayName,
    );
    replaceFirstMatchingSpan(author, text => text.startsWith('@'), reply.handle);

    const time = clone.querySelector('time');
    if (time) {
      time.textContent = reply.timestamp;
      time.removeAttribute('datetime');
    }

    if (!reply.verified) {
      const verifiedIcon = author?.querySelector('[aria-label*="Verified"], [data-testid="icon-verified"]');
      const removable = verifiedIcon?.closest('span, div');
      removable?.remove();
    }

    const text = clone.querySelector(PT_SELECTORS.TWEET_TEXT);
    if (text) text.textContent = reply.text;

    setActionMetric(clone, 'reply', reply.metrics.replies);
    setActionMetric(clone, 'retweet', reply.metrics.retweets);
    resetLikeAction(clone, reply.metrics.likes);
    ensureBookmarkAction(clone, templateBoundary);
    alignActionRowToTemplate(clone, templateBoundary);
    ensureHeaderControls(clone, templateBoundary);

    neutralizeInteractiveElements(clone);

    return clone;
  }

  /**
   * Build a wrapper that holds all reply previews for a single tweet,
   * with a connecting line visual.
   */
  function buildReplyContainer(replies: readonly GeneratedReply[]): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.classList.add('pt-reply-container');
    wrapper.style.cssText = 'border-bottom:1px solid rgb(47,51,54);';
    wrapper.setAttribute('aria-hidden', 'true');

    for (const reply of replies) {
      wrapper.appendChild(buildReplyPreview(reply));
    }

    return wrapper;
  }

  // ── Reply Count Inflation ────────────────────────────────────────

  function parseMetricText(value: string): number {
    const text = value.trim().toUpperCase();
    const parsed = Number.parseFloat(text.replace(/,/g, ''));
    if (!Number.isFinite(parsed)) return 0;
    if (text.endsWith('K')) return Math.round(parsed * 1000);
    if (text.endsWith('M')) return Math.round(parsed * 1000000);
    return Math.round(parsed);
  }

  function getReplyAction(tweetEl: Element): HTMLElement | null {
    return tweetEl.querySelector<HTMLElement>(PT_SELECTORS.REPLY_BUTTON);
  }

  function getDisplayedReplyCount(tweetEl: Element): number {
    const countEl = tweetEl.querySelector(PT_SELECTORS.REPLY_COUNT);
    return countEl ? parseMetricText(countEl.textContent ?? '') : 0;
  }

  function getBaseReplyCount(tweetEl: Element): number {
    const action = getReplyAction(tweetEl);
    if (!action) return getDisplayedReplyCount(tweetEl);

    const stored = action.getAttribute('data-pt-base-reply-count');
    if (stored !== null) return parseMetricText(stored);

    const base = getDisplayedReplyCount(tweetEl);
    action.setAttribute('data-pt-base-reply-count', String(base));
    return base;
  }

  function applyGeneratedReplyCount(tweetEl: Element, generatedCount: number): void {
    const action = getReplyAction(tweetEl);
    if (!action) return;

    const total = getBaseReplyCount(tweetEl) + generatedCount;
    setMetricText(action, total);
    action.setAttribute('data-pt-generated-reply-count', String(generatedCount));
    action.setAttribute('aria-label', total > 0 ? `${formatMetric(total)} Replies. Reply` : 'Reply');
  }

  function inflateReplyCount(tweetEl: Element, addedCount: number): void {
    applyGeneratedReplyCount(tweetEl, addedCount);
  }

  function restoreGeneratedReplyCounts(): void {
    document.querySelectorAll<HTMLElement>('[data-pt-base-reply-count]').forEach((action) => {
      const base = parseMetricText(action.getAttribute('data-pt-base-reply-count') ?? '0');
      setMetricText(action, base);
      action.setAttribute('aria-label', base > 0 ? `${formatMetric(base)} Replies. Reply` : 'Reply');
      action.removeAttribute('data-pt-base-reply-count');
      action.removeAttribute('data-pt-generated-reply-count');
    });
  }

  // ── Thread view detection ─────────────────────────────────────────

  function isThreadView(): boolean {
    // Thread views always have /status/ in the URL (e.g. /user/status/12345).
    // Profile pages, search, etc. also have a back button but no /status/ segment.
    return window.location.pathname.includes('/status/');
  }

  // ── Virtual-scroll detector ──────────────────────────────────────

  /**
   * Returns true if the tweet element lives inside any position:absolute
   * ancestor — i.e. it's in a virtual-scroll container.
   * We can't rely on cellDiv.position because findCellBoundary sometimes
   * returns a static-position intermediate wrapper rather than the absolute
   * outer shell, giving a false negative.
   */
  function isInVirtualScroll(tweetEl: Element): boolean {
    let el = tweetEl.parentElement;
    while (el && el !== document.body) {
      if (window.getComputedStyle(el).position === 'absolute') return true;
      el = el.parentElement;
    }
    return false;
  }

  // ── Injector ─────────────────────────────────────────────────────

  /**
   * Find the outermost element that represents a single tweet card in the feed.
   * Twitter's virtual list uses data-testid="cellInnerDiv" on most views, but
   * the profile page and some other views omit it. In those cases we walk up
   * until the parent contains tweet articles from OTHER cards — that parent is
   * the feed container and the current element is the card boundary.
   */
  function findCellBoundary(article: Element): Element | null {
    // Find the cellInnerDiv first — it's a reliable anchor point.
    // But cellInnerDiv may itself be wrapped inside Twitter's virtual-scroll
    // container (e.g. a css-XXXXX div with position:absolute + translateY).
    // We must walk UP past cellInnerDiv to find the outermost card element
    // that is a direct child of the feed container.  Stopping at cellInnerDiv
    // would cause our reply container to land inside the positioned wrapper,
    // making it invisible at the wrong scroll offset.
    const cell = article.closest('[data-testid="cellInnerDiv"]');
    let el = cell || article;

    while (el.parentElement && el.parentElement !== document.body) {
      const parent = el.parentElement;
      // Stop when the parent has OTHER direct children that also contain
      // tweet elements — that means parent is the feed container and el
      // is the outermost boundary for this single tweet card.
      const hasOtherTweetSiblings = Array.from(parent.children).some(
        child => child !== el && child.querySelector('[data-testid="tweet"]') !== null
      );
      if (hasOtherTweetSiblings) return el;
      el = parent;
    }
    return cell || article.parentElement;
  }

  function getFocalTweetId(): string | null {
    return window.location.pathname.match(/\/status\/(\d+)/)?.[1] ?? null;
  }

  function findFirstThreadReplyBoundaryAfter(cellDiv: Element, focalTweetId: string): Element | null {
    let candidate = cellDiv.nextElementSibling;
    while (candidate) {
      if (candidate instanceof HTMLElement && candidate.dataset.ptFakeReply === 'true') {
        candidate = candidate.nextElementSibling;
        continue;
      }

      const tweet = candidate.querySelector(PT_SELECTORS.TWEET_CELL);
      if (tweet && extractTweetId(tweet) !== focalTweetId) return candidate;
      candidate = candidate.nextElementSibling;
    }
    return null;
  }

  function hasInjectedRepliesFor(parent: Element, tweetId: string): boolean {
    return parent.querySelector(`[data-pt-parent-tweet="${tweetId}"]`) !== null;
  }

  function createHardcodedThreadReplyTemplate(parent: HTMLElement, width: number): HTMLElement | null {
    const template = document.createElement('template');
    template.innerHTML = THREAD_REPLY_TEMPLATE_HTML.trim();
    const boundary = template.content.firstElementChild;
    if (!(boundary instanceof HTMLElement)) return null;

    setAbsoluteVirtualLayout(boundary, -100000, width);
    setImportant(boundary, 'visibility', 'hidden');
    setImportant(boundary, 'pointer-events', 'none');
    setImportant(boundary, 'z-index', '-1');
    parent.appendChild(boundary);
    return boundary;
  }

  function injectFallbackThreadReplies(
    tweetId: string,
    cellDiv: Element,
    replies: readonly GeneratedReply[],
  ): boolean {
    const parent = cellDiv.parentElement;
    if (!(parent instanceof HTMLElement)) return false;

    const parentRect = parent.getBoundingClientRect();
    const templateBoundary = createHardcodedThreadReplyTemplate(parent, parentRect.width);
    if (!templateBoundary) return false;

    const templateRect = templateBoundary.getBoundingClientRect();
    const itemHeight = Math.max(1, templateRect.height);
    const insertionAnchor = cellDiv.nextSibling;
    const fakes: HTMLElement[] = [];

    replies.forEach((reply, index) => {
      const fake = buildThreadReplyFromTemplate(reply, templateBoundary, tweetId);
      prepareThreadCloneLayout(fake, itemHeight * index, parentRect.width);
      fakes.push(fake);
      parent.insertBefore(fake, insertionAnchor);
    });

    templateBoundary.remove();

    const entry: ThreadInjection = {
      tweetId,
      parent,
      cell: cellDiv,
      fakes,
      shiftedSiblings: [],
      itemHeight,
      originalParentMinHeight: parent.style.minHeight,
      originalParentHeight: parentRect.height,
    };
    threadInjections.set(tweetId, entry);

    const resizeObserver = getThreadResizeObserver();
    resizeObserver?.observe(parent);
    if (cellDiv instanceof Element) resizeObserver?.observe(cellDiv);

    layoutThreadInjection(entry);
    return true;
  }

  function injectFocalThreadReplies(
    tweetId: string,
    cellDiv: Element,
    replies: readonly GeneratedReply[],
    displayedReplyCount: number,
  ): boolean {
    const parent = cellDiv.parentElement;
    if (!parent) return false;
    if (hasInjectedRepliesFor(parent, tweetId)) return true;

    const templateBoundary = findFirstThreadReplyBoundaryAfter(cellDiv, tweetId);
    if (!templateBoundary) {
      // If X says real replies exist, wait for one to render so we can clone its
      // native cell. If the post has no real replies, use the hardcoded captured
      // reply-cell template instead of doing nothing forever.
      return displayedReplyCount > 0
        ? false
        : injectFallbackThreadReplies(tweetId, cellDiv, replies);
    }

    if (!(parent instanceof HTMLElement)) return false;

    const parentRect = parent.getBoundingClientRect();
    const templateRect = templateBoundary.getBoundingClientRect();
    const itemHeight = Math.max(1, templateRect.height);
    const children = Array.from(parent.children);
    const templateIndex = children.indexOf(templateBoundary);
    const siblingsToShift = templateIndex === -1 ? [] : children.slice(templateIndex);
    const shiftedSiblings = siblingsToShift
      .map(child => captureShiftedSibling(child, parentRect))
      .filter((sibling): sibling is ShiftedSibling => sibling !== null);
    const fakes: HTMLElement[] = [];

    replies.forEach((reply, index) => {
      const fake = buildThreadReplyFromTemplate(reply, templateBoundary, tweetId);
      prepareThreadCloneLayout(fake, 0 + itemHeight * index, parentRect.width);
      fakes.push(fake);
      parent.insertBefore(fake, templateBoundary);
    });

    const entry: ThreadInjection = {
      tweetId,
      parent,
      cell: cellDiv,
      fakes,
      shiftedSiblings,
      itemHeight,
      originalParentMinHeight: parent.style.minHeight,
      originalParentHeight: parentRect.height,
    };
    threadInjections.set(tweetId, entry);

    const resizeObserver = getThreadResizeObserver();
    resizeObserver?.observe(parent);
    if (cellDiv instanceof Element) resizeObserver?.observe(cellDiv);

    layoutThreadInjection(entry);

    return true;
  }

  function injectReplies(tweetEl: Element): void {
    const tweetId = extractTweetId(tweetEl) ?? (isThreadView() ? getFocalTweetId() : null);
    if (!tweetId) {
      debug('skip: matching user tweet but no tweet id found');
      return;
    }

    // Find the cell boundary first so we can check for existing injected content.
    const article = tweetEl.closest('article') || tweetEl;
    const cellDiv = findCellBoundary(article);

    // Deduplicate: check vsMap (virtual scroll path), explicit parent marker
    // (thread clone path), and next sibling (normal flow path).
    if (vsMap.has(tweetId)) {
      tweetEl.setAttribute(PT_SELECTORS.MARKER_ATTR, 'true');
      return;
    }
    if (cellDiv) {
      if (cellDiv.parentElement && hasInjectedRepliesFor(cellDiv.parentElement, tweetId)) {
        tweetEl.setAttribute(PT_SELECTORS.MARKER_ATTR, 'true');
        return;
      }

      const nextEl = cellDiv.nextElementSibling;
      if (nextEl && nextEl.classList.contains('pt-reply-container')) {
        tweetEl.setAttribute(PT_SELECTORS.MARKER_ATTR, 'true');
        return;
      }
    }

    const focalTweetId = getFocalTweetId();
    if (!cellDiv || !isThreadView() || focalTweetId !== tweetId) return;

    const count = getGeneratedReplyCount(tweetId);
    const displayedReplyCount = getDisplayedReplyCount(tweetEl);
    const replies = PT_YAPPER.generateReplies(tweetId, count);

    if (!injectFocalThreadReplies(tweetId, cellDiv, replies, displayedReplyCount)) {
      debug(`waiting for real reply template\nhandle=${userHandle}\ntweet=${tweetId}\ncount=${count}`);
      scheduleQaReport('waiting for real reply template');
      return;
    }

    inflateReplyCount(tweetEl, count);
    tweetEl.setAttribute(PT_SELECTORS.MARKER_ATTR, 'true');
    debug(`injected focal thread replies\nhandle=${userHandle}\ntweet=${tweetId}\ncount=${count}`);
    scheduleQaReport('injected focal thread replies');
  }

  // ── Observer ─────────────────────────────────────────────────────

  function processTweets(): void {
    if (!isActive || !userHandle) {
      debug(`inactive\nhandle=${userHandle || '(empty)'}\nactive=${isActive}`);
      scheduleQaReport('inactive');
      return;
    }

    // SPA navigation: clear any previously injected profile/thread artifacts.
    const currentUrl = location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      clearInjectedArtifacts();
    }

    const shouldInjectThreadReplies = isThreadView() && getFocalTweetId() !== null;

    // Profile/timeline pages should show Twitter/X's native cards only, but we
    // still update reply counts so they match the deterministic injected count
    // users will see after clicking through to a status page.
    if (!shouldInjectThreadReplies) {
      clearInjectedArtifacts({ clearMarkers: false });
    }

    const tweets = document.querySelectorAll(PT_SELECTORS.TWEET_CELL);
    let userTweetCount = 0;
    let markedTweetCount = 0;
    for (const tweet of tweets) {
      const isMine = isUserTweet(tweet);
      if (isMine) userTweetCount += 1;

      // Skip already-processed tweets
      if (tweet.hasAttribute(PT_SELECTORS.MARKER_ATTR)) {
        if (isMine) markedTweetCount += 1;
        continue;
      }

      // Only process the user's own tweets
      if (!isMine) continue;

      // Skip quoted tweets (user's tweet embedded inside someone else's tweet)
      if (isQuotedTweet(tweet)) continue;

      // Skip thread continuations (only inject on the last tweet in a thread)
      if (isThreadContinuation(tweet)) continue;

      if (shouldInjectThreadReplies) {
        injectReplies(tweet);
      } else {
        const tweetId = extractTweetId(tweet);
        if (!tweetId) continue;
        applyGeneratedReplyCount(tweet, getGeneratedReplyCount(tweetId));
        tweet.setAttribute(PT_SELECTORS.MARKER_ATTR, 'true');
      }
    }

    debug(`processed tweets\nhandle=${userHandle}\nactive=${isActive}\nscanned=${tweets.length}\nuserTweets=${userTweetCount}\nmarked=${markedTweetCount}\nurl=${location.pathname}`);
    scheduleQaReport('processed tweets');
  }

  let observer: MutationObserver | null = null;

  function startObserver(): void {
    if (observer) return;

    // Keep VS overlay containers aligned with their tweet cells during scroll
    ctx.addEventListener(window, 'scroll', scheduleVsUpdate, { passive: true, capture: true });

    // Process existing tweets on page
    processTweets();

    observer = new MutationObserver((mutations) => {
      // Early exit: only care about mutations that add nodes
      let hasAddedNodes = false;
      for (const m of mutations) {
        if (m.addedNodes.length > 0) {
          hasAddedNodes = true;
          break;
        }
      }
      if (!hasAddedNodes) return;

      // Reposition/cull VS overlay entries on every DOM change so stale
      // profile-page containers don't linger after SPA navigation.
      scheduleVsUpdate();
      scheduleThreadRelayout();
      processTweets();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  function stopObserver(): void {
    window.removeEventListener('scroll', scheduleVsUpdate, { capture: true });
    // Clean up fixed overlay and its entries
    if (vsOverlay) { vsOverlay.remove(); vsOverlay = null; }
    vsMap.clear();
    clearInjectedArtifacts();
    threadResizeObserver?.disconnect();
    threadResizeObserver = null;
    if (threadLayoutRafId !== null) { cancelAnimationFrame(threadLayoutRafId); threadLayoutRafId = null; }
    if (vsRafId !== null) { cancelAnimationFrame(vsRafId); vsRafId = null; }
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  }

  // ── Settings + Init ──────────────────────────────────────────────

  async function loadSettings(): Promise<void> {
    const settings = (await browser.storage.sync.get(DEFAULT_SETTINGS)) as Settings;

    userHandle = settings.handle;
    isActive = settings.active;
    intensity = normalizeIntensity(settings.intensity);

    if (isActive && userHandle) {
      startObserver();
    } else {
      stopObserver();
    }
  }

  // Listen for settings changes from popup
  function handleStorageChange(changes: Record<string, StorageChange>, area: string): void {
    if (area !== 'sync') return;

    const shouldRecalculate = Boolean(changes.handle || changes.intensity);

    if (changes.handle) userHandle = typeof changes.handle.newValue === 'string' ? changes.handle.newValue : '';
    if (changes.active) isActive = changes.active.newValue === true;
    if (changes.intensity) intensity = normalizeIntensity(changes.intensity.newValue);

    if (isActive && userHandle) {
      if (shouldRecalculate) clearInjectedArtifacts();
      startObserver();
      processTweets();
    } else {
      stopObserver();
    }
  }

  browser.storage.onChanged.addListener(handleStorageChange);

  ctx.onInvalidated(() => {
    stopObserver();
    browser.storage.onChanged.removeListener(handleStorageChange);
  });

  // Init
  void loadSettings();

  return { processTweets, startObserver, stopObserver };
  },
});
