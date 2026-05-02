import { browser } from 'wxt/browser';
import { defineContentScript } from 'wxt/utils/define-content-script';
import { GROK_ICON_PATH, GROK_ICON_VIEW_BOX } from '../utils/icons';
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
type HoverActionKind = 'reply' | 'repost' | 'like' | 'unlike' | 'view' | 'bookmark' | 'share' | 'grok' | 'more';
type ToggleActionKind = 'repost' | 'like' | 'bookmark';
type SvgShape = readonly ['path' | 'polyline', string];

interface HoverActionStyle {
  tooltip: string;
  color: string;
  backgroundColor: string;
}

interface ProfileCardTheme {
  background: string;
  primaryText: string;
  secondaryText: string;
  border: string;
  subtleBorder: string;
  followBackground: string;
  followText: string;
  followingBackground: string;
  followingText: string;
  followingHoverBackground: string;
  unfollowText: string;
  unfollowBorder: string;
  pillBackground: string;
  summaryHoverBackground: string;
  shadow: string;
}

type HeaderControlKind = 'decorative' | 'grok' | 'more';

interface HeaderControlSource {
  kind: HeaderControlKind;
  svg: SVGSVGElement | null;
  rect: DOMRect;
}

const ACTION_GRAY = 'rgb(113, 118, 123)';
const ACTION_BLUE = 'rgb(29, 155, 240)';
const ACTION_GREEN = 'rgb(0, 186, 124)';
const ACTION_PINK = 'rgb(249, 24, 128)';
const HEADER_GROK_CENTER_GAP = 26;
const HEART_OUTLINE_SVG = '<g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g>';
const HEART_FILLED_SVG = '<g><path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g>';
const BOOKMARK_OUTLINE_SVG = '<g><path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path></g>';
const BOOKMARK_FILLED_SVG = '<g><path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5z"></path></g>';
const VERIFIED_BADGE_SVG = '<svg viewBox="0 0 22 22" aria-label="Verified account" role="img" style="display:block;width:20px;height:20px;color:rgb(29,155,240);fill:currentColor;flex-shrink:0;"><g><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path></g></svg>';
const PROFILE_SUMMARY_SVG = `<svg viewBox="${GROK_ICON_VIEW_BOX}" aria-hidden="true" style="display:block;width:24px;height:24px;fill:currentColor;flex-shrink:0;"><g><path d="${GROK_ICON_PATH}"></path></g></svg>`;

// X/Twitter's native reply-action hover colours, captured from real reply UI.
const HOVER_ACTION_STYLES: Record<HoverActionKind, HoverActionStyle> = {
  reply: { tooltip: 'Reply', color: ACTION_BLUE, backgroundColor: 'rgba(29, 155, 240, 0.1)' },
  repost: { tooltip: 'Repost', color: ACTION_GREEN, backgroundColor: 'rgba(0, 186, 124, 0.1)' },
  like: { tooltip: 'Like', color: ACTION_PINK, backgroundColor: 'rgba(249, 24, 128, 0.1)' },
  unlike: { tooltip: 'Unlike', color: ACTION_PINK, backgroundColor: 'rgba(249, 24, 128, 0.1)' },
  view: { tooltip: 'View', color: ACTION_BLUE, backgroundColor: 'rgba(29, 155, 240, 0.1)' },
  bookmark: { tooltip: 'Bookmark', color: ACTION_BLUE, backgroundColor: 'rgba(29, 155, 240, 0.1)' },
  share: { tooltip: 'Share', color: ACTION_BLUE, backgroundColor: 'rgba(29, 155, 240, 0.1)' },
  grok: { tooltip: 'Explain this post', color: ACTION_BLUE, backgroundColor: 'rgba(29, 155, 240, 0.1)' },
  more: { tooltip: 'More', color: ACTION_BLUE, backgroundColor: 'rgba(29, 155, 240, 0.1)' },
};

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
  let hoverTooltipEl: HTMLDivElement | null = null;
  let hoverTooltipOwner: HTMLElement | null = null;
  let hoverTooltipTimer: number | null = null;
  let profileHoverCardEl: HTMLDivElement | null = null;
  let profileHoverOwner: HTMLElement | null = null;
  let profileHoverTimer: number | null = null;
  let profileHoverHideTimer: number | null = null;

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

  function getTwitterFontFamily(): string {
    // Twitter sets TwitterChirp on inner tweet nodes, not always on body.
    const fontSource =
      document.querySelector('[data-testid="tweetText"]') ||
      document.querySelector('[data-testid="User-Name"]') ||
      document.querySelector('[data-testid="primaryColumn"]') ||
      document.body;
    return window.getComputedStyle(fontSource).fontFamily;
  }

  function getPagePrimaryTextColor(): string {
    const sources = [
      document.querySelector<HTMLElement>('[data-testid="primaryColumn"] [data-testid="tweetText"]'),
      document.querySelector<HTMLElement>('[data-testid="tweetText"]'),
      document.querySelector<HTMLElement>('[data-testid="User-Name"] span'),
      document.body,
    ];
    for (const source of sources) {
      if (!source) continue;
      const color = window.getComputedStyle(source).color;
      if (color && color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent') {
        return color;
      }
    }
    return 'rgb(15, 20, 25)';
  }

  function getVsOverlay(): HTMLDivElement {
    if (!vsOverlay || !document.contains(vsOverlay)) {
      vsOverlay = document.createElement('div');
      vsOverlay.id = 'pt-vs-overlay';

      vsOverlay.style.cssText =
        'position:fixed;top:0;left:0;width:100%;height:100%;' +
        'pointer-events:none;z-index:99999;overflow:visible;' +
        'font-family:' + getTwitterFontFamily() + ';';
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
    avatarImg.setAttribute('data-testid', 'Tweet-User-Avatar');
    avatarImg.style.cssText =
      'width:32px;height:32px;border-radius:50%;flex-shrink:0;';

    // Right column (name row + text + metrics)
    const rightCol = document.createElement('div');
    rightCol.style.cssText = 'display:flex;flex-direction:column;gap:2px;min-width:0;flex:1;';

    // Name row
    const nameRow = document.createElement('div');
    nameRow.setAttribute('data-testid', 'User-Name');
    nameRow.style.cssText =
      'display:flex;align-items:center;gap:4px;font-size:15px;line-height:20px;';

    const displayNameSpan = document.createElement('span');
    displayNameSpan.setAttribute('role', 'link');
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
    handleSpan.setAttribute('role', 'link');
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

    installInjectedReplyProfileHover(container, reply);
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

  function setViewsMetric(root: Element, count: number): void {
    const action = root.querySelector<HTMLElement>(
      'a[href*="/analytics"], [aria-label*="View post analytics"], [aria-label*="view post analytics"]',
    );
    if (!action) return;

    setMetricText(action, count);
    action.setAttribute('aria-label', `${formatMetric(count)} views. View post analytics`);
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

  function setActionTreeColor(action: Element, color: string): void {
    if (action instanceof HTMLElement) {
      setImportant(action, 'color', color);
    }

    for (const child of action.querySelectorAll<HTMLElement>('*')) {
      setImportant(child, 'color', color);
    }

    for (const svg of action.querySelectorAll<SVGSVGElement>('svg')) {
      svg.style.setProperty('color', color, 'important');
      svg.style.setProperty('fill', 'currentColor', 'important');
    }
  }

  function tintActionGray(action: Element): void {
    setActionTreeColor(action, ACTION_GRAY);
  }

  function actionControlFor(action: HTMLElement): HTMLElement {
    if (action.matches('button, a, [role="button"], [role="link"], [data-pt-header-more="true"]')) {
      return action;
    }

    return action.querySelector<HTMLElement>(
      'button, a, [role="button"], [role="link"], [data-pt-header-more="true"]',
    ) ?? action;
  }

  function findHoverActionControl(root: Element, row: Element | null, selector: string): HTMLElement | null {
    const item = findActionItem(row, selector);
    if (item) return actionControlFor(item);

    const direct = root.querySelector<HTMLElement>(selector);
    return direct ? actionControlFor(direct) : null;
  }

  function hoverBackgroundForAction(action: HTMLElement): HTMLElement | null {
    const svg = action.querySelector<SVGSVGElement>('svg');
    const iconWrap = svg?.parentElement instanceof HTMLElement ? svg.parentElement : null;
    if (!svg || !iconWrap) return null;

    if (window.getComputedStyle(iconWrap).position === 'static') {
      setImportant(iconWrap, 'position', 'relative');
    }
    svg.style.setProperty('position', 'relative', 'important');
    svg.style.setProperty('z-index', '1', 'important');

    let background = iconWrap.querySelector<HTMLElement>('[data-pt-hover-bg="true"]');
    if (!background) {
      background = document.createElement('div');
      background.dataset.ptHoverBg = 'true';
      iconWrap.insertBefore(background, svg);
    }

    setImportant(background, 'position', 'absolute');
    setImportant(background, 'width', '34px');
    setImportant(background, 'height', '34px');
    setImportant(background, 'border-radius', '9999px');
    setImportant(background, 'transform', 'translate(-50%, -50%)');
    setImportant(background, 'right', 'auto');
    setImportant(background, 'bottom', 'auto');
    setImportant(background, 'margin', '0px');
    setImportant(background, 'z-index', '0');

    const iconWrapRect = iconWrap.getBoundingClientRect();
    const svgRect = svg.getBoundingClientRect();
    if (document.contains(action) && iconWrapRect.width > 0 && iconWrapRect.height > 0 && svgRect.width > 0 && svgRect.height > 0) {
      setImportant(background, 'left', `${svgRect.left - iconWrapRect.left + svgRect.width / 2}px`);
      setImportant(background, 'top', `${svgRect.top - iconWrapRect.top + svgRect.height / 2}px`);
    } else {
      setImportant(background, 'left', '50%');
      setImportant(background, 'top', '50%');
    }

    setImportant(background, 'pointer-events', 'none');
    setImportant(background, 'transition-property', 'background-color');
    setImportant(background, 'transition-duration', '0.2s');
    return background;
  }

  function isSelectedAction(action: HTMLElement): boolean {
    return action.dataset.ptActionSelected === 'true';
  }

  function isToggleActionKind(kind: HoverActionKind): kind is ToggleActionKind {
    return kind === 'repost' || kind === 'like' || kind === 'bookmark';
  }

  function restingActionColor(action: HTMLElement, kind: HoverActionKind): string {
    return isSelectedAction(action) && isToggleActionKind(kind)
      ? HOVER_ACTION_STYLES[kind].color
      : ACTION_GRAY;
  }

  function tooltipLabelForAction(action: HTMLElement, kind: HoverActionKind): string {
    if (!isSelectedAction(action)) return HOVER_ACTION_STYLES[kind].tooltip;
    if (kind === 'repost') return 'Undo repost';
    if (kind === 'bookmark') return 'Remove from Bookmarks';
    if (kind === 'like' || kind === 'unlike') return 'Unlike';
    return HOVER_ACTION_STYLES[kind].tooltip;
  }

  function setActionHoverState(action: HTMLElement, kind: HoverActionKind, isHovered: boolean): void {
    const style = HOVER_ACTION_STYLES[kind];
    setActionTreeColor(action, isHovered ? style.color : restingActionColor(action, kind));

    const background = hoverBackgroundForAction(action);
    if (background) {
      setImportant(
        background,
        'background-color',
        isHovered ? style.backgroundColor : 'rgba(0, 0, 0, 0)',
      );
    }
  }

  function setActionSvgMarkup(action: HTMLElement, markup: string): void {
    const svg = action.querySelector<SVGSVGElement>('svg');
    if (svg) svg.innerHTML = markup;
  }

  function baseActionMetric(action: HTMLElement): number {
    if (action.dataset.ptBaseMetric === undefined) {
      action.dataset.ptBaseMetric = String(parseMetricText(action.textContent ?? ''));
    }
    return parseMetricText(action.dataset.ptBaseMetric);
  }

  function updateToggleMetric(action: HTMLElement, kind: ToggleActionKind, selected: boolean): void {
    if (kind === 'bookmark') return;
    setMetricText(action, baseActionMetric(action) + (selected ? 1 : 0));
  }

  function setFakeActionSelected(action: HTMLElement, kind: ToggleActionKind, selected: boolean): void {
    if (action.dataset.ptBaseAriaLabel === undefined) {
      action.dataset.ptBaseAriaLabel = action.getAttribute('aria-label') ?? '';
    }

    action.dataset.ptActionSelected = selected ? 'true' : 'false';
    action.setAttribute('aria-pressed', selected ? 'true' : 'false');

    if (kind === 'repost') {
      action.setAttribute('data-testid', selected ? 'unretweet' : 'retweet');
      action.setAttribute('aria-label', selected ? 'Undo repost' : action.dataset.ptBaseAriaLabel);
    } else if (kind === 'like') {
      action.setAttribute('data-testid', selected ? 'unlike' : 'like');
      action.setAttribute('aria-label', selected ? 'Unlike' : action.dataset.ptBaseAriaLabel);
      setActionSvgMarkup(action, selected ? HEART_FILLED_SVG : HEART_OUTLINE_SVG);
    } else {
      action.setAttribute('data-testid', 'bookmark');
      action.setAttribute('aria-label', selected ? 'Remove from Bookmarks' : action.dataset.ptBaseAriaLabel);
      setActionSvgMarkup(action, selected ? BOOKMARK_FILLED_SVG : BOOKMARK_OUTLINE_SVG);
    }

    updateToggleMetric(action, kind, selected);
    setActionHoverState(action, kind, action.matches(':hover'));
  }

  function toggleFakeAction(action: HTMLElement, kind: ToggleActionKind): void {
    setFakeActionSelected(action, kind, !isSelectedAction(action));
  }

  function isUnlikeAction(action: HTMLElement): boolean {
    const ariaLabel = action.getAttribute('aria-label') ??
      action.querySelector<HTMLElement>('[aria-label]')?.getAttribute('aria-label') ??
      '';

    return action.matches('[data-testid="unlike"]') ||
      action.querySelector('[data-testid="unlike"]') !== null ||
      /\b(Unlike|Liked)\b/i.test(ariaLabel);
  }

  function clearHoverTooltipTimer(): void {
    if (hoverTooltipTimer !== null) {
      window.clearTimeout(hoverTooltipTimer);
      hoverTooltipTimer = null;
    }
  }

  function hideHoverTooltip(owner?: HTMLElement): void {
    if (owner && hoverTooltipOwner && owner !== hoverTooltipOwner) return;
    clearHoverTooltipTimer();
    hoverTooltipEl?.remove();
    hoverTooltipEl = null;
    hoverTooltipOwner = null;
  }

  function showHoverTooltip(owner: HTMLElement, label: string): void {
    clearHoverTooltipTimer();
    hoverTooltipEl?.remove();
    hoverTooltipEl = null;
    hoverTooltipOwner = null;

    const tooltip = document.createElement('div');
    tooltip.dataset.ptHoverTooltip = 'true';
    tooltip.textContent = label;
    const fontFamily = getTwitterFontFamily();
    tooltip.style.cssText =
      'position:fixed;z-index:2147483647;pointer-events:none;' +
      'padding:2px 4px;border-radius:2px;background:rgb(83, 100, 113);' +
      'color:rgb(255, 255, 255);font-size:12px;line-height:18px;font-weight:400;' +
      'white-space:nowrap;box-sizing:border-box;' +
      `font-family:${fontFamily};`;
    document.body.appendChild(tooltip);

    const anchor = owner.querySelector<HTMLElement>('[data-pt-hover-bg="true"]') ??
      owner.querySelector<SVGSVGElement>('svg') ??
      owner;
    const ownerRect = anchor.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const gap = 6;
    let top = ownerRect.bottom + gap;
    if (top + tooltipRect.height > window.innerHeight - 4) {
      top = ownerRect.top - tooltipRect.height - gap;
    }

    const left = Math.min(
      Math.max(4, ownerRect.left + ownerRect.width / 2 - tooltipRect.width / 2),
      Math.max(4, window.innerWidth - tooltipRect.width - 4),
    );

    tooltip.style.left = `${Math.round(left)}px`;
    tooltip.style.top = `${Math.round(Math.max(4, top))}px`;
    hoverTooltipEl = tooltip;
    hoverTooltipOwner = owner;
  }

  function scheduleHoverTooltip(owner: HTMLElement, label: string): void {
    clearHoverTooltipTimer();
    hoverTooltipTimer = window.setTimeout(() => {
      hoverTooltipTimer = null;
      if (!document.contains(owner)) return;
      showHoverTooltip(owner, label);
    }, 750);
  }

  function clearProfileHoverTimers(): void {
    if (profileHoverTimer !== null) {
      window.clearTimeout(profileHoverTimer);
      profileHoverTimer = null;
    }
    if (profileHoverHideTimer !== null) {
      window.clearTimeout(profileHoverHideTimer);
      profileHoverHideTimer = null;
    }
  }

  function removeProfileHoverCard(owner?: HTMLElement): void {
    if (owner && profileHoverOwner && owner !== profileHoverOwner) return;
    clearProfileHoverTimers();
    profileHoverCardEl?.remove();
    profileHoverCardEl = null;
    profileHoverOwner = null;
  }

  function scheduleProfileHoverHide(owner: HTMLElement): void {
    if (profileHoverHideTimer !== null) window.clearTimeout(profileHoverHideTimer);
    profileHoverHideTimer = window.setTimeout(() => {
      profileHoverHideTimer = null;
      removeProfileHoverCard(owner);
    }, 180);
  }

  function parseRgbColor(value: string): readonly [number, number, number] | null {
    const match = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (!match) return null;
    return [Number(match[1]), Number(match[2]), Number(match[3])] as const;
  }

  function isDarkTheme(): boolean {
    const rgb = parseRgbColor(getPageBg());
    if (!rgb) return true;
    const [r, g, b] = rgb;
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) < 128;
  }

  function getProfileCardTheme(): ProfileCardTheme {
    if (isDarkTheme()) {
      return {
        background: 'rgb(0, 0, 0)',
        primaryText: 'rgb(231, 233, 234)',
        secondaryText: 'rgb(113, 118, 123)',
        border: 'rgb(47, 51, 54)',
        subtleBorder: 'rgb(83, 100, 113)',
        followBackground: 'rgb(239, 243, 244)',
        followText: 'rgb(15, 20, 25)',
        followingBackground: 'rgba(0, 0, 0, 0)',
        followingText: 'rgb(239, 243, 244)',
        followingHoverBackground: 'rgba(244, 33, 46, 0.1)',
        unfollowText: 'rgb(244, 33, 46)',
        unfollowBorder: 'rgb(103, 7, 15)',
        pillBackground: 'rgb(32, 35, 39)',
        summaryHoverBackground: 'rgba(239, 243, 244, 0.1)',
        shadow: 'rgba(255, 255, 255, 0.2) 0px 0px 28px, rgba(0, 0, 0, 0.4) 0px 8px 28px',
      };
    }

    return {
      background: 'rgb(255, 255, 255)',
      primaryText: 'rgb(15, 20, 25)',
      secondaryText: 'rgb(83, 100, 113)',
      border: 'rgb(207, 217, 222)',
      subtleBorder: 'rgb(207, 217, 222)',
      followBackground: 'rgb(15, 20, 25)',
      followText: 'rgb(255, 255, 255)',
      followingBackground: 'rgba(255, 255, 255, 0)',
      followingText: 'rgb(15, 20, 25)',
      followingHoverBackground: 'rgba(244, 33, 46, 0.1)',
      unfollowText: 'rgb(244, 33, 46)',
      unfollowBorder: 'rgb(253, 201, 206)',
      pillBackground: 'rgb(239, 243, 244)',
      summaryHoverBackground: 'rgba(15, 20, 25, 0.1)',
      shadow: 'rgba(101, 119, 134, 0.2) 0px 0px 24px, rgba(101, 119, 134, 0.15) 0px 8px 24px',
    };
  }

  function formatProfileCount(count: number): string {
    const rounded = Math.max(0, Math.floor(count));
    if (rounded >= 1_000_000) return `${(rounded / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
    if (rounded >= 10_000) return `${(rounded / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
    return rounded.toLocaleString('en-US');
  }

  function profileFollowingState(owner: HTMLElement, reply: GeneratedReply): boolean {
    if (owner.dataset.ptProfileFollowing === 'true') return true;
    if (owner.dataset.ptProfileFollowing === 'false') return false;
    return reply.profile.following;
  }

  function setProfileFollowingState(owner: HTMLElement, following: boolean): void {
    owner.dataset.ptProfileFollowing = following ? 'true' : 'false';
  }

  function applyProfileFollowButtonState(
    button: HTMLButtonElement,
    following: boolean,
    isHovering: boolean,
    theme: ProfileCardTheme,
  ): void {
    if (following && isHovering) {
      button.textContent = 'Unfollow';
      setImportant(button, 'background-color', theme.followingHoverBackground);
      setImportant(button, 'border-color', theme.unfollowBorder);
      setImportant(button, 'color', theme.unfollowText);
      return;
    }

    if (following) {
      button.textContent = 'Following';
      setImportant(button, 'background-color', theme.followingBackground);
      setImportant(button, 'border-color', theme.subtleBorder);
      setImportant(button, 'color', theme.followingText);
      return;
    }

    button.textContent = 'Follow';
    setImportant(button, 'background-color', theme.followBackground);
    setImportant(button, 'border-color', theme.followBackground);
    setImportant(button, 'color', theme.followText);
  }

  function createProfileStat(count: number, label: string, theme: ProfileCardTheme): HTMLDivElement {
    const stat = document.createElement('div');
    stat.style.cssText = 'display:flex;align-items:baseline;gap:4px;min-width:0;';

    const countEl = document.createElement('span');
    countEl.textContent = formatProfileCount(count);
    countEl.style.cssText = `font-size:17px;line-height:20px;font-weight:800;color:${theme.primaryText};`;

    const labelEl = document.createElement('span');
    labelEl.textContent = label;
    labelEl.style.cssText = `font-size:17px;line-height:20px;font-weight:400;color:${theme.secondaryText};`;

    stat.append(countEl, labelEl);
    return stat;
  }

  function createMutualAvatar(name: string, index: number, theme: ProfileCardTheme): HTMLDivElement {
    const avatar = document.createElement('div');
    const gradients = [
      'linear-gradient(135deg, rgb(29, 155, 240), rgb(120, 86, 255))',
      'linear-gradient(135deg, rgb(249, 24, 128), rgb(255, 122, 0))',
      'linear-gradient(135deg, rgb(0, 186, 124), rgb(29, 155, 240))',
    ];
    avatar.textContent = (name.trim()[0] ?? '?').toUpperCase();
    avatar.style.cssText =
      'width:28px;height:28px;border-radius:9999px;display:flex;align-items:center;justify-content:center;' +
      `font-size:12px;line-height:12px;font-weight:800;color:white;background:${gradients[index % gradients.length]};` +
      `border:2px solid ${theme.background};box-sizing:border-box;` +
      (index === 0 ? '' : 'margin-left:-9px;');
    return avatar;
  }

  function mutualFollowerText(reply: GeneratedReply): string {
    const names = reply.profile.mutualFollowers;
    if (names.length === 0) return '';

    const visibleNames = names.slice(0, 2).join(', ');
    const extra = reply.profile.mutualFollowerExtraCount;
    if (extra <= 0) return `Followed by ${visibleNames}`;
    return `Followed by ${visibleNames}, and ${extra.toLocaleString('en-US')} others you follow`;
  }

  function positionProfileHoverCard(card: HTMLElement, anchor: HTMLElement): void {
    const anchorRect = anchor.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const gap = 10;
    const margin = 8;

    let top = anchorRect.bottom + gap;
    if (top + cardRect.height > window.innerHeight - margin && anchorRect.top - cardRect.height - gap >= margin) {
      top = anchorRect.top - cardRect.height - gap;
    }
    top = Math.min(top, window.innerHeight - cardRect.height - margin);

    let left = anchorRect.left;
    if (anchorRect.width < 72) left = anchorRect.left - 12;
    left = Math.min(left, window.innerWidth - cardRect.width - margin);
    left = Math.max(margin, left);

    setImportant(card, 'top', `${Math.round(Math.max(margin, top))}px`);
    setImportant(card, 'left', `${Math.round(left)}px`);
    setImportant(card, 'visibility', 'visible');
  }

  function buildProfileHoverCard(owner: HTMLElement, reply: GeneratedReply, theme: ProfileCardTheme): HTMLDivElement {
    const card = document.createElement('div');
    card.dataset.ptProfileHoverCard = 'true';
    const fontFamily = getTwitterFontFamily();
    card.style.cssText =
      'position:fixed;z-index:2147483646;visibility:hidden;box-sizing:border-box;' +
      'width:400px;max-width:calc(100vw - 16px);padding:20px 22px 20px 22px;' +
      `border:1px solid ${theme.border};border-radius:16px;background:${theme.background};` +
      `color:${theme.primaryText};box-shadow:${theme.shadow};font-family:${fontFamily};`;

    const topRow = document.createElement('div');
    topRow.style.cssText = 'display:flex;align-items:flex-start;justify-content:space-between;gap:16px;';

    const avatar = document.createElement('img');
    avatar.src = resolveAvatarUrl(reply.avatar);
    avatar.alt = '';
    avatar.style.cssText = 'width:64px;height:64px;border-radius:9999px;object-fit:cover;flex-shrink:0;';

    const followButton = document.createElement('button');
    followButton.type = 'button';
    followButton.style.cssText =
      'height:48px;min-width:108px;padding:0 20px;border-radius:9999px;border:1px solid;' +
      'font-size:20px;line-height:24px;font-weight:800;cursor:pointer;box-sizing:border-box;' +
      'transition-property:background-color,border-color,color;transition-duration:0.2s;';
    applyProfileFollowButtonState(followButton, profileFollowingState(owner, reply), false, theme);
    followButton.addEventListener('mouseenter', () => {
      applyProfileFollowButtonState(followButton, profileFollowingState(owner, reply), true, theme);
    });
    followButton.addEventListener('mouseleave', () => {
      applyProfileFollowButtonState(followButton, profileFollowingState(owner, reply), false, theme);
    });
    followButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      setProfileFollowingState(owner, !profileFollowingState(owner, reply));
      applyProfileFollowButtonState(followButton, profileFollowingState(owner, reply), followButton.matches(':hover'), theme);
    });

    topRow.append(avatar, followButton);

    const nameRow = document.createElement('div');
    nameRow.style.cssText = 'display:flex;align-items:center;gap:4px;margin-top:14px;min-width:0;';

    const displayName = document.createElement('div');
    displayName.textContent = reply.displayName;
    displayName.style.cssText =
      `font-size:22px;line-height:26px;font-weight:800;color:${theme.primaryText};` +
      'overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0;';
    nameRow.appendChild(displayName);

    if (reply.verified) {
      const badge = document.createElement('span');
      badge.innerHTML = VERIFIED_BADGE_SVG;
      badge.style.cssText = 'display:flex;align-items:center;flex-shrink:0;';
      nameRow.appendChild(badge);
    }

    const handleRow = document.createElement('div');
    handleRow.style.cssText = 'display:flex;align-items:center;gap:5px;margin-top:1px;min-width:0;';

    const handle = document.createElement('span');
    handle.textContent = reply.handle;
    handle.style.cssText = `font-size:17px;line-height:22px;font-weight:400;color:${theme.secondaryText};`;
    handleRow.appendChild(handle);

    if (reply.profile.followsYou) {
      const followsYou = document.createElement('span');
      followsYou.textContent = 'Follows you';
      followsYou.style.cssText =
        `font-size:13px;line-height:16px;font-weight:500;color:${theme.secondaryText};` +
        `background:${theme.pillBackground};border-radius:4px;padding:1px 4px;`;
      handleRow.appendChild(followsYou);
    }

    const bio = document.createElement('div');
    bio.textContent = reply.profile.bio;
    bio.style.cssText =
      `margin-top:18px;font-size:17px;line-height:24px;font-weight:400;color:${theme.primaryText};` +
      'white-space:normal;overflow-wrap:break-word;';

    const stats = document.createElement('div');
    stats.style.cssText = 'display:flex;align-items:center;gap:28px;margin-top:18px;';
    stats.append(
      createProfileStat(reply.profile.followingCount, 'Following', theme),
      createProfileStat(reply.profile.followersCount, 'Followers', theme),
    );

    card.append(topRow, nameRow, handleRow, bio, stats);

    const mutualText = mutualFollowerText(reply);
    if (mutualText) {
      const mutualRow = document.createElement('div');
      mutualRow.style.cssText = 'display:flex;align-items:center;gap:12px;margin-top:18px;min-width:0;';

      const avatarStack = document.createElement('div');
      avatarStack.style.cssText = 'display:flex;align-items:center;flex-shrink:0;min-width:48px;';
      reply.profile.mutualFollowers.slice(0, 3).forEach((name, index) => {
        avatarStack.appendChild(createMutualAvatar(name, index, theme));
      });

      const mutualLabel = document.createElement('div');
      mutualLabel.textContent = mutualText;
      mutualLabel.style.cssText =
        `font-size:17px;line-height:22px;font-weight:400;color:${theme.secondaryText};` +
        'min-width:0;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;';

      mutualRow.append(avatarStack, mutualLabel);
      card.appendChild(mutualRow);
    }

    const summaryButton = document.createElement('button');
    summaryButton.type = 'button';
    summaryButton.innerHTML = `${PROFILE_SUMMARY_SVG}<span>Profile Summary</span>`;
    summaryButton.style.cssText =
      'width:100%;height:48px;margin-top:20px;border-radius:9999px;border:1px solid;' +
      'display:flex;align-items:center;justify-content:center;gap:8px;background:transparent;' +
      `border-color:${theme.subtleBorder};color:${theme.primaryText};` +
      'font-size:20px;line-height:24px;font-weight:800;cursor:pointer;box-sizing:border-box;' +
      'transition-property:background-color;transition-duration:0.2s;';
    summaryButton.addEventListener('mouseenter', () => {
      setImportant(summaryButton, 'background-color', theme.summaryHoverBackground);
    });
    summaryButton.addEventListener('mouseleave', () => {
      setImportant(summaryButton, 'background-color', 'transparent');
    });
    summaryButton.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
    });
    card.appendChild(summaryButton);

    card.addEventListener('mouseenter', () => {
      if (profileHoverHideTimer !== null) {
        window.clearTimeout(profileHoverHideTimer);
        profileHoverHideTimer = null;
      }
    });
    card.addEventListener('mouseleave', () => scheduleProfileHoverHide(owner));

    return card;
  }

  function showProfileHoverCard(anchor: HTMLElement, owner: HTMLElement, reply: GeneratedReply): void {
    clearProfileHoverTimers();
    hideHoverTooltip();

    if (profileHoverCardEl && profileHoverOwner === owner) {
      positionProfileHoverCard(profileHoverCardEl, anchor);
      return;
    }

    profileHoverCardEl?.remove();
    profileHoverCardEl = null;

    const theme = getProfileCardTheme();
    const card = buildProfileHoverCard(owner, reply, theme);
    document.body.appendChild(card);
    positionProfileHoverCard(card, anchor);
    profileHoverCardEl = card;
    profileHoverOwner = owner;
  }

  function scheduleProfileHoverCard(anchor: HTMLElement, owner: HTMLElement, reply: GeneratedReply): void {
    if (profileHoverHideTimer !== null) {
      window.clearTimeout(profileHoverHideTimer);
      profileHoverHideTimer = null;
    }
    if (profileHoverCardEl && profileHoverOwner === owner) {
      positionProfileHoverCard(profileHoverCardEl, anchor);
      return;
    }
    if (profileHoverCardEl && profileHoverOwner !== owner) {
      removeProfileHoverCard();
    }

    if (profileHoverTimer !== null) window.clearTimeout(profileHoverTimer);
    profileHoverTimer = window.setTimeout(() => {
      profileHoverTimer = null;
      if (!document.contains(anchor) || !document.contains(owner)) return;
      showProfileHoverCard(anchor, owner, reply);
    }, 500);
  }

  function setProfileTargetUnderline(target: HTMLElement, underlined: boolean): void {
    const candidates = target.querySelectorAll<HTMLElement>('span, div[dir="ltr"]');
    const elements = candidates.length > 0 ? Array.from(candidates) : [target];
    for (const el of elements) {
      el.style.setProperty('text-decoration-line', underlined ? 'underline' : 'none', 'important');
    }
  }

  function installProfileHoverTarget(target: HTMLElement, owner: HTMLElement, reply: GeneratedReply): void {
    if (target.dataset.ptProfileHoverTarget === 'true') return;
    target.dataset.ptProfileHoverTarget = 'true';
    setImportant(target, 'cursor', 'pointer');

    target.addEventListener('mouseenter', () => {
      if (!target.matches(PT_SELECTORS.TWEET_AVATAR)) setProfileTargetUnderline(target, true);
      scheduleProfileHoverCard(target, owner, reply);
    });
    target.addEventListener('mouseleave', () => {
      if (!target.matches(PT_SELECTORS.TWEET_AVATAR)) setProfileTargetUnderline(target, false);
      scheduleProfileHoverHide(owner);
    });
    target.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
  }

  function installInjectedReplyProfileHover(root: HTMLElement, reply: GeneratedReply): void {
    if (root.dataset.ptProfileHoverInstalled === 'true') return;
    root.dataset.ptProfileHoverInstalled = 'true';

    const targets = new Set<HTMLElement>();
    const avatar = root.querySelector<HTMLElement>(PT_SELECTORS.TWEET_AVATAR);
    if (avatar) targets.add(avatar);

    const author = root.querySelector<HTMLElement>(PT_SELECTORS.TWEET_AUTHOR);
    if (author) {
      const userLinks = Array.from(author.querySelectorAll<HTMLElement>('a, [role="link"]'))
        .filter(link => !link.querySelector('time'))
        .slice(0, 2);
      if (userLinks.length > 0) {
        userLinks.forEach(link => targets.add(link));
      } else {
        targets.add(author);
      }
    }

    for (const target of targets) {
      installProfileHoverTarget(target, root, reply);
    }
  }

  function installActionHover(
    action: HTMLElement | null,
    kind: HoverActionKind,
    toggleKind?: ToggleActionKind,
  ): void {
    if (!action) return;
    const installedKind = action.dataset.ptHoverInstalled as HoverActionKind | undefined;
    if (installedKind === kind) return;

    action.dataset.ptHoverInstalled = kind;
    action.dataset.ptHoverTooltip = tooltipLabelForAction(action, kind);
    setImportant(action, 'cursor', 'pointer');
    if (toggleKind) {
      action.dataset.ptBaseMetric = String(parseMetricText(action.textContent ?? ''));
      action.dataset.ptBaseAriaLabel = action.getAttribute('aria-label') ?? '';
      setFakeActionSelected(action, toggleKind, false);
    } else {
      setActionHoverState(action, kind, false);
    }

    action.addEventListener('mouseenter', () => {
      setActionHoverState(action, kind, true);
      scheduleHoverTooltip(action, tooltipLabelForAction(action, kind));
    });
    action.addEventListener('mouseleave', () => {
      setActionHoverState(action, kind, false);
      hideHoverTooltip(action);
    });
    action.addEventListener('blur', () => {
      setActionHoverState(action, kind, false);
      hideHoverTooltip(action);
    });
    action.addEventListener('mousedown', () => hideHoverTooltip(action));
    action.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (toggleKind) toggleFakeAction(action, toggleKind);
      const tooltipLabel = tooltipLabelForAction(action, kind);
      action.dataset.ptHoverTooltip = tooltipLabel;
      hideHoverTooltip(action);
      if (toggleKind && action.matches(':hover')) {
        scheduleHoverTooltip(action, tooltipLabel);
      }
    });
  }

  function installInjectedReplyHoverAffordances(root: HTMLElement): void {
    const row = root.querySelector(PT_SELECTORS.TWEET_ACTIONS);

    installActionHover(findHoverActionControl(root, row, '[data-testid="reply"]'), 'reply');
    installActionHover(
      findHoverActionControl(
        root,
        row,
        '[data-testid="retweet"], [data-testid="unretweet"], [aria-label*="Repost"], [aria-label*="repost"]',
      ),
      'repost',
      'repost',
    );

    const likeAction = findHoverActionControl(
      root,
      row,
      '[data-testid="like"], [data-testid="unlike"], [aria-label*="Like"], [aria-label*="Liked"]',
    );
    installActionHover(likeAction, likeAction && isUnlikeAction(likeAction) ? 'unlike' : 'like', 'like');

    installActionHover(
      findHoverActionControl(
        root,
        row,
        'a[href*="/analytics"], [aria-label*="View post analytics"], [aria-label*="view post analytics"]',
      ),
      'view',
    );
    installActionHover(
      findHoverActionControl(root, row, '[data-testid="bookmark"], [aria-label*="Bookmark"]'),
      'bookmark',
      'bookmark',
    );
    installActionHover(
      findHoverActionControl(
        root,
        row,
        '[data-testid="share"], [data-testid="send"], [aria-label*="Share"], [aria-label*="share"]',
      ),
      'share',
    );

    const overlayGrok = root.querySelector<HTMLElement>('[data-pt-header-grok="true"]');
    const nativeGrokCandidate = root.querySelector(
      '[aria-label="Explain this post"], [aria-label*="Grok"], [data-testid*="grok" i]',
    );
    const nativeGrok = nativeGrokCandidate instanceof HTMLElement
      ? nativeGrokCandidate
      : nativeGrokCandidate?.closest<HTMLElement>('button, a, [role="button"], [role="link"]') ?? null;
    installActionHover(overlayGrok ?? (nativeGrok ? actionControlFor(nativeGrok) : null), 'grok');

    const overlayMore = root.querySelector<HTMLElement>('[data-pt-header-more="true"]');
    const nativeMore = root.querySelector<HTMLElement>(
      '[data-testid="caret"], button[aria-label="More"], [role="button"][aria-label="More"]',
    );
    installActionHover(overlayMore ?? (nativeMore ? actionControlFor(nativeMore) : null), 'more');
  }

  function isMoreActionSvg(svg: SVGSVGElement): boolean {
    return Array.from(svg.querySelectorAll('path')).some((path) =>
      (path.getAttribute('d') ?? '').startsWith('M3 12c0-1.1'),
    );
  }

  function isGrokActionSvg(svg: SVGSVGElement): boolean {
    return Array.from(svg.querySelectorAll('path')).some((path) =>
      (path.getAttribute('d') ?? '').startsWith('M12.745 20.54l10.97'),
    );
  }

  function hideNativeHeaderControls(tweet: HTMLElement): void {
    const actionRow = tweet.querySelector(PT_SELECTORS.TWEET_ACTIONS);
    const svgs = new Set(topRightHeaderSvgs(tweet));

    // The cloned real reply can already contain a native Grok button from the
    // template. That source button is often laid out for the donor tweet, so it
    // can sit far left of More. Hide native header glyphs and draw our overlay
    // from the current More rect instead of letting stale cloned controls show
    // through underneath.
    for (const svg of tweet.querySelectorAll<SVGSVGElement>('svg')) {
      if (actionRow?.contains(svg)) continue;
      if (svg.closest(PT_SELECTORS.TWEET_AVATAR)) continue;
      if (svg.closest('[data-pt-header-controls="true"]')) continue;
      if (isGrokActionSvg(svg)) svgs.add(svg);
    }

    for (const svg of svgs) {
      const control = svg.closest<HTMLElement>('button, a, [role="button"], [role="link"]');
      if (control) {
        setImportant(control, 'visibility', 'hidden');
        setImportant(control, 'pointer-events', 'none');
      } else {
        svg.style.setProperty('visibility', 'hidden', 'important');
        svg.style.setProperty('pointer-events', 'none', 'important');
      }
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

    setActionSvgMarkup(action as HTMLElement, HEART_OUTLINE_SVG);
    setMetricText(action, count);
  }

  function normalizeBookmarkShareGap(root: Element): void {
    const bookmarkSvg = root.querySelector<SVGSVGElement>(
      '[data-testid="bookmark"] svg, [aria-label*="Bookmark"] svg',
    );
    if (!bookmarkSvg) return;

    bookmarkSvg.style.setProperty('margin-right', '0.5rem', 'important');
    bookmarkSvg.style.removeProperty('transform');
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

    const bookmarkControl = actionControlFor(bookmarkItem);
    bookmarkControl.setAttribute('data-testid', 'bookmark');
    bookmarkControl.setAttribute('aria-label', 'Bookmark');
    bookmarkControl.removeAttribute('aria-pressed');
    bookmarkControl.removeAttribute('aria-expanded');
    bookmarkControl.removeAttribute('aria-haspopup');

    const transition = bookmarkItem.querySelector('[data-testid="app-text-transition-container"]');
    transition?.remove();

    setActionSvgMarkup(bookmarkItem, BOOKMARK_OUTLINE_SVG);
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

  function createGrokSvg(width = 22, height = 22): SVGSVGElement {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', GROK_ICON_VIEW_BOX);
    svg.setAttribute('aria-hidden', 'true');

    const group = document.createElementNS(ns, 'g');
    const path = document.createElementNS(ns, 'path');
    path.setAttribute('d', GROK_ICON_PATH);
    path.setAttribute('fill', 'currentColor');
    group.appendChild(path);
    svg.appendChild(group);

    svg.style.setProperty('display', 'block', 'important');
    svg.style.setProperty('width', `${width}px`, 'important');
    svg.style.setProperty('height', `${height}px`, 'important');
    svg.style.setProperty('fill', 'currentColor', 'important');
    svg.style.setProperty('color', ACTION_GRAY, 'important');
    svg.style.setProperty('position', 'relative', 'important');
    svg.style.setProperty('z-index', '1', 'important');
    return svg;
  }

  function prepareHeaderSvg(svg: SVGSVGElement, width: number, height: number): SVGSVGElement {
    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.removeAttribute('id');
    clone.style.setProperty('display', 'block', 'important');
    clone.style.setProperty('width', `${width}px`, 'important');
    clone.style.setProperty('height', `${height}px`, 'important');
    clone.style.setProperty('color', ACTION_GRAY, 'important');
    clone.style.setProperty('fill', 'currentColor', 'important');
    clone.style.setProperty('position', 'relative', 'important');
    clone.style.setProperty('z-index', '1', 'important');

    for (const child of clone.querySelectorAll<SVGElement>('*')) {
      child.style.setProperty('color', ACTION_GRAY, 'important');
      if (child.getAttribute('fill') !== 'none') child.setAttribute('fill', 'currentColor');
    }

    return clone;
  }

  function ensureHeaderControls(root: Element, templateBoundary: Element): void {
    const cloneTweet = root.querySelector<HTMLElement>(PT_SELECTORS.TWEET_CELL);
    const templateTweet = templateBoundary.querySelector<HTMLElement>(PT_SELECTORS.TWEET_CELL);
    if (!cloneTweet || !templateTweet) return;

    const sourceSvgs = topRightHeaderSvgs(templateTweet);
    if (sourceSvgs.length === 0) return;

    const sourceRects = sourceSvgs.map(svg => svg.getBoundingClientRect());
    const explicitMoreIndex = sourceSvgs.findIndex(isMoreActionSvg);
    const moreIndex = explicitMoreIndex === -1 ? sourceSvgs.length - 1 : explicitMoreIndex;

    const controls: HeaderControlSource[] = sourceSvgs
      .map((svg, index): HeaderControlSource => {
        const kind: HeaderControlKind = index === moreIndex
          ? 'more'
          : isGrokActionSvg(svg) ? 'grok' : 'decorative';
        return {
          kind,
          svg,
          rect: sourceRects[index],
        };
      })
      // The native template source can carry stale Grok placement from a prior
      // layout. Always place our reusable Grok icon from the More button so the
      // header spacing matches the currently rendered real reply below it.
      .filter(control => control.kind !== 'grok');

    const moreRect = sourceRects[moreIndex];
    const grokSize = Math.max(20, Math.min(22, moreRect.height || 22));
    const moreCenterX = moreRect.left + moreRect.width / 2;
    const moreCenterY = moreRect.top + moreRect.height / 2;
    controls.push({
      kind: 'grok',
      svg: null,
      rect: new DOMRect(
        moreCenterX - HEADER_GROK_CENTER_GAP - grokSize / 2,
        moreCenterY - grokSize / 2,
        grokSize,
        grokSize,
      ),
    });

    controls.sort((a, b) => a.rect.left - b.rect.left);

    const controlsRect = unionRects(controls.map(control => control.rect));
    if (!controlsRect) return;

    root.querySelectorAll('[data-pt-header-controls="true"]').forEach(el => el.remove());
    hideNativeHeaderControls(cloneTweet);

    const templateTweetRect = templateTweet.getBoundingClientRect();
    const overlay = document.createElement('div');
    overlay.dataset.ptHeaderControls = 'true';
    setImportant(overlay, 'position', 'absolute');
    setImportant(overlay, 'top', `${controlsRect.top - templateTweetRect.top}px`);
    setImportant(overlay, 'right', `${templateTweetRect.right - controlsRect.right}px`);
    setImportant(overlay, 'width', `${controlsRect.width}px`);
    setImportant(overlay, 'height', `${controlsRect.height}px`);
    setImportant(overlay, 'color', ACTION_GRAY);
    setImportant(overlay, 'z-index', '2');
    setImportant(overlay, 'pointer-events', 'none');

    for (const control of controls) {
      const sourceRect = control.rect;
      const isMore = control.kind === 'more';
      const isGrok = control.kind === 'grok';
      const isInteractive = isMore || isGrok;
      const hitSize = isInteractive ? Math.max(34, sourceRect.width, sourceRect.height) : sourceRect.width;
      const slot = document.createElement('div');
      if (isGrok) {
        slot.dataset.ptHeaderGrok = 'true';
        slot.setAttribute('role', 'button');
        slot.setAttribute('aria-label', 'Explain this post');
        slot.setAttribute('tabindex', '-1');
      } else if (isMore) {
        slot.dataset.ptHeaderMore = 'true';
        slot.setAttribute('role', 'button');
        slot.setAttribute('aria-label', 'More');
        slot.setAttribute('tabindex', '-1');
      } else {
        slot.setAttribute('aria-hidden', 'true');
      }
      setImportant(slot, 'position', 'absolute');
      setImportant(slot, 'left', `${sourceRect.left - controlsRect.left - (hitSize - sourceRect.width) / 2}px`);
      setImportant(slot, 'top', `${sourceRect.top - controlsRect.top - (hitSize - sourceRect.height) / 2}px`);
      setImportant(slot, 'width', `${hitSize}px`);
      setImportant(slot, 'height', `${isInteractive ? hitSize : sourceRect.height}px`);
      setImportant(slot, 'color', ACTION_GRAY);
      setImportant(slot, 'pointer-events', isInteractive ? 'auto' : 'none');
      setImportant(slot, 'cursor', isInteractive ? 'pointer' : 'default');
      setImportant(slot, 'overflow', 'visible');

      if (isInteractive) {
        setImportant(slot, 'display', 'flex');
        setImportant(slot, 'align-items', 'center');
        setImportant(slot, 'justify-content', 'center');

        const background = document.createElement('div');
        background.dataset.ptHoverBg = 'true';
        setImportant(background, 'position', 'absolute');
        setImportant(background, 'inset', '0px');
        setImportant(background, 'border-radius', '9999px');
        setImportant(background, 'background-color', 'rgba(0, 0, 0, 0)');
        setImportant(background, 'pointer-events', 'none');
        slot.appendChild(background);
      }

      const clone = control.svg
        ? prepareHeaderSvg(control.svg, sourceRect.width, sourceRect.height)
        : createGrokSvg(sourceRect.width, sourceRect.height);
      slot.appendChild(clone);
      overlay.appendChild(slot);
    }

    setImportant(cloneTweet, 'position', 'relative');
    cloneTweet.appendChild(overlay);
  }

  function stripMediaContainers(root: HTMLElement): void {
    const selectors = [
      '[data-testid="tweetPhoto"]',
      '[data-testid="videoPlayer"]',
      '[data-testid="videoComponent"]',
      '[data-testid="tweetGif"]',
      '[data-testid="poll"]',
      '[data-testid="quoteTweet"]',
      '[data-testid^="card.wrapper"]',
      '[data-testid^="card.layout"]',
    ];
    for (const node of root.querySelectorAll(selectors.join(','))) {
      node.remove();
    }

    // Twitter often renders link cards / website previews / unannotated media
    // wrappers without any data-testid. Catch them structurally: anything
    // sitting between tweetText and the action row inside a fake reply is
    // never something we need to render.
    const text = root.querySelector(PT_SELECTORS.TWEET_TEXT);
    const actions = root.querySelector(PT_SELECTORS.TWEET_ACTIONS);
    if (!text || !actions) return;

    let lca: Element | null = text.parentElement;
    while (lca && !lca.contains(actions)) lca = lca.parentElement;
    if (!lca) return;

    let textChild: Element | null = null;
    let actionsChild: Element | null = null;
    for (const child of Array.from(lca.children)) {
      if (child.contains(text)) textChild = child;
      if (child.contains(actions)) actionsChild = child;
    }
    if (!textChild || !actionsChild || textChild === actionsChild) return;

    let current = textChild.nextElementSibling;
    while (current && current !== actionsChild) {
      const next = current.nextElementSibling;
      current.remove();
      current = next;
    }
  }

  // The hardcoded fallback reply template bakes in Twitter's lights-out text
  // color. In light or dim mode the cloned fake replies look ghosted, so
  // rewrite any element with that exact inline color to use the page's actual
  // primary text color. No-op when the page already uses the same color.
  const TEMPLATE_PRIMARY_TEXT_COLOR = 'rgb(231, 233, 234)';

  function applyPagePrimaryTextColor(root: HTMLElement): void {
    const pageColor = getPagePrimaryTextColor();
    if (!pageColor || pageColor === TEMPLATE_PRIMARY_TEXT_COLOR) return;
    for (const el of root.querySelectorAll<HTMLElement>('[style*="color"]')) {
      if (el.style.color === TEMPLATE_PRIMARY_TEXT_COLOR) {
        el.style.color = pageColor;
      }
    }
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
    setImportant(el, 'pointer-events', 'auto');
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
    hideHoverTooltip();
    removeProfileHoverCard();
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

    const avatarRoot = root.querySelector<HTMLElement>(PT_SELECTORS.TWEET_AVATAR);
    if (!avatarRoot) return;

    // Update any real avatar img if the cloned reply has one, but do not rely on
    // it. Some X avatar DOMs are nested background layers with no img; returning
    // early there leaves every clone showing the donor/template avatar.
    for (const existing of avatarRoot.querySelectorAll<HTMLImageElement>('img')) {
      existing.src = src;
      existing.srcset = '';
      existing.alt = '';
    }

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
      'border-radius:9999px;z-index:999;display:block;pointer-events:none;';
    avatarContainer.appendChild(injected);
  }

  function buildThreadReplyFromTemplate(
    reply: GeneratedReply,
    templateBoundary: Element,
    parentTweetId: string,
    parentTweetViews: number,
  ): HTMLElement {
    const clone = templateBoundary.cloneNode(true) as HTMLElement;
    clone.classList.add('pt-reply-container');
    clone.setAttribute('data-pt-parent-tweet', parentTweetId);
    clone.setAttribute('data-pt-fake-reply', 'true');
    clone.setAttribute('aria-hidden', 'true');

    const tweet = clone.querySelector<HTMLElement>(PT_SELECTORS.TWEET_CELL);
    tweet?.removeAttribute(PT_SELECTORS.MARKER_ATTR);
    tweet?.setAttribute('data-pt-fake-reply', 'true');

    stripMediaContainers(clone);

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

    const replySeed = `${parentTweetId}:${reply.handle}:${reply.text}`;
    const replyViews = PT_YAPPER.generateReplyViewCount(replySeed, parentTweetViews);
    const engagement = PT_YAPPER.generateReplyEngagementCounts(replySeed, parentTweetId, replyViews);

    setActionMetric(clone, 'reply', engagement.replies);
    setActionMetric(clone, 'retweet', reply.metrics.retweets);
    resetLikeAction(clone, engagement.likes);
    setViewsMetric(clone, replyViews);
    ensureBookmarkAction(clone, templateBoundary);
    alignActionRowToTemplate(clone, templateBoundary);
    ensureHeaderControls(clone, templateBoundary);

    neutralizeInteractiveElements(clone);
    applyPagePrimaryTextColor(clone);
    installInjectedReplyHoverAffordances(clone);
    installInjectedReplyProfileHover(clone, reply);

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
    if (text.endsWith('B')) return Math.round(parsed * 1000000000);
    return Math.round(parsed);
  }

  function parseViewCountText(value: string | null | undefined): number | null {
    if (!value) return null;
    const normalized = value.replace(/\u00a0/g, ' ');
    const beforeViews = normalized.match(/([\d,.]+)\s*([KMB]?)\s+views?\b/i);
    if (beforeViews) {
      const count = parseMetricText(`${beforeViews[1]}${beforeViews[2]}`);
      return count > 0 ? count : null;
    }

    const afterViews = normalized.match(/\bviews?\s+([\d,.]+)\s*([KMB]?)/i);
    if (afterViews) {
      const count = parseMetricText(`${afterViews[1]}${afterViews[2]}`);
      return count > 0 ? count : null;
    }

    return null;
  }

  function getTweetViewCount(tweetEl: Element): number {
    const rows = Array.from(tweetEl.querySelectorAll<HTMLElement>(PT_SELECTORS.TWEET_ACTIONS))
      .filter(row => !row.closest(PT_SELECTORS.QUOTE_CONTAINER));

    for (const row of rows) {
      const analytics = row.querySelector<HTMLElement>('a[href*="/analytics"]');
      const count = parseViewCountText(analytics?.getAttribute('aria-label')) ??
        parseViewCountText(row.getAttribute('aria-label')) ??
        (analytics ? parseMetricText(analytics.textContent ?? '') : 0);
      if (count > 0) return count;
    }

    const candidates = Array.from(tweetEl.querySelectorAll<HTMLElement>('a[href*="/analytics"], [aria-label*="views"], [aria-label*="Views"]'))
      .filter(el => !el.closest(PT_SELECTORS.QUOTE_CONTAINER));
    for (const candidate of candidates) {
      const count = parseViewCountText(candidate.getAttribute('aria-label')) ??
        (candidate.matches('a[href*="/analytics"]') ? parseMetricText(candidate.textContent ?? '') : 0);
      if (count > 0) return count;
    }

    return 100;
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
    originalTweetViews: number,
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
      const fake = buildThreadReplyFromTemplate(reply, templateBoundary, tweetId, originalTweetViews);
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
    originalTweetViews: number,
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
        : injectFallbackThreadReplies(tweetId, cellDiv, replies, originalTweetViews);
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
      const fake = buildThreadReplyFromTemplate(reply, templateBoundary, tweetId, originalTweetViews);
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
    const originalTweetViews = getTweetViewCount(tweetEl);
    const replies = PT_YAPPER.generateReplies(tweetId, count);

    if (!injectFocalThreadReplies(tweetId, cellDiv, replies, displayedReplyCount, originalTweetViews)) {
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

  function handleViewportScroll(): void {
    hideHoverTooltip();
    removeProfileHoverCard();
    scheduleVsUpdate();
  }

  function startObserver(): void {
    if (observer) return;

    // Keep VS overlay containers aligned with their tweet cells during scroll.
    // Native hover affordances disappear on scroll, so clear ours too.
    ctx.addEventListener(window, 'scroll', handleViewportScroll, { passive: true, capture: true });

    // Process existing tweets on page
    processTweets();

    observer = new MutationObserver((mutations) => {
      if (profileHoverOwner && !document.contains(profileHoverOwner)) {
        removeProfileHoverCard();
      }

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
    window.removeEventListener('scroll', handleViewportScroll, { capture: true });
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
