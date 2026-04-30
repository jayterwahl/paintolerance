/**
 * Pain Tolerance — Observer + Injector (content script)
 *
 * MutationObserver watches for tweet cells authored by the configured user.
 * Injector places fake reply previews beneath detected tweets.
 *
 * Depends on: PT_SELECTORS (selectors.js), PT_YAPPER (yapper.js),
 *             PT_AVATARS (avatars.js), PT_CORPUS (corpus.js)
 */

const PT_CONTENT = (() => {
  let userHandle = '';
  let isActive = false;
  let intensity = 'medium'; // mild | medium | unhinged

  // ── Virtual-Scroll Overlay ─────────────────────────────────────────
  // Profile pages use React virtual scroll: tweet cells are position:absolute
  // inside a tall container. Injecting siblings into that container means
  // React re-renders immediately reset every position we touch. Instead we
  // maintain a position:fixed overlay outside the React tree and track reply
  // container positions via getBoundingClientRect + scroll listener.

  let vsOverlay = null;
  const vsMap = new Map(); // tweetId → { cell: Element, container: Element }
  let vsRafId = null;
  let lastUrl = location.href;

  function getVsOverlay() {
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

  function updateVsOverlay() {
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

  function scheduleVsUpdate() {
    if (!vsRafId) {
      vsRafId = requestAnimationFrame(updateVsOverlay);
    }
  }

  /** Read the page's actual background color so overlay containers are opaque. */
  function getPageBg() {
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

  const INTENSITY_MAP = {
    mild: [3, 5],
    medium: [6, 10],
    unhinged: [11, 20],
  };

  // ── Helpers ──────────────────────────────────────────────────────

  function getReplyCount() {
    const [min, max] = INTENSITY_MAP[intensity] || INTENSITY_MAP.medium;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Extract the tweet ID from a tweet cell element.
   * Looks for the permalink anchor containing /status/<id>.
   */
  function extractTweetId(tweetEl) {
    const timeEl = tweetEl.querySelector(PT_SELECTORS.TWEET_LINK);
    if (!timeEl) return null;
    const anchor = timeEl.closest('a');
    if (!anchor) return null;
    const match = anchor.href.match(/\/status\/(\d+)/);
    return match ? match[1] : null;
  }

  /**
   * Check if a tweet cell was authored by the configured user handle.
   */
  function isUserTweet(tweetEl) {
    const authorEl = tweetEl.querySelector(PT_SELECTORS.TWEET_AUTHOR);
    if (!authorEl) return false;
    const text = authorEl.textContent.toLowerCase();
    const handle = userHandle.toLowerCase().replace(/^@/, '');
    return text.includes('@' + handle);
  }

  /**
   * Check if a tweet is embedded inside a quoted tweet card.
   * We should not inject replies on quoted tweets — only on standalone tweets.
   */
  function isQuotedTweet(tweetEl) {
    return !!tweetEl.closest(PT_SELECTORS.QUOTE_CONTAINER);
  }

  /**
   * Check if a tweet is a continuation of a user's thread (not the last tweet).
   * In a thread, intermediate tweets have a connecting line (vertical bar)
   * to the next tweet. We only inject on the last tweet in a thread to avoid
   * flooding every single tweet in a long thread.
   */
  function isThreadContinuation(tweetEl) {
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
  function makeSvgIcon(type) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '18');
    svg.setAttribute('height', '18');
    svg.style.cssText =
      'fill:none;stroke:currentColor;stroke-width:1.5;' +
      'stroke-linecap:round;stroke-linejoin:round;vertical-align:middle;flex-shrink:0;';

    const shapes = {
      // Speech bubble (reply)
      reply: [['path', 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z']],
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
      ]],
      // Bookmark ribbon
      bookmark: [['path', 'M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z']],
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

  /**
   * Build a compact reply preview element matching Twitter's native
   * reply preview structure beneath a tweet on timeline/profile view.
   */
  function buildReplyPreview(reply) {
    // Outer container
    const container = document.createElement('div');
    container.classList.add('pt-reply-preview');
    container.style.cssText =
      'display:flex;padding:12px 16px;border-top:1px solid rgb(47,51,54);gap:12px;';

    // Avatar
    const avatarImg = document.createElement('img');
    avatarImg.src = reply.avatar;
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

    const actions = [
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
        countSpan.textContent = action.count >= 1000
          ? (action.count / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
          : String(action.count);
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

  /**
   * Build a wrapper that holds all reply previews for a single tweet,
   * with a connecting line visual.
   */
  function buildReplyContainer(replies) {
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

  function inflateReplyCount(tweetEl, addedCount) {
    const countEl = tweetEl.querySelector(PT_SELECTORS.REPLY_COUNT);
    if (!countEl) return;
    const span = countEl.querySelector('span > span');
    if (!span) return;
    const current = parseInt(span.textContent, 10) || 0;
    span.textContent = String(current + addedCount);
  }

  // ── Thread view detection ─────────────────────────────────────────

  function isThreadView() {
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
  function isInVirtualScroll(tweetEl) {
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
  function findCellBoundary(article) {
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

  function injectReplies(tweetEl) {
    const tweetId = extractTweetId(tweetEl);
    if (!tweetId) return;

    // Find the cell boundary first so we can check for existing injected content.
    const article = tweetEl.closest('article') || tweetEl;
    const cellDiv = findCellBoundary(article);

    // Deduplicate: check vsMap (virtual scroll path) and next sibling (normal flow path)
    if (vsMap.has(tweetId)) {
      tweetEl.setAttribute(PT_SELECTORS.MARKER_ATTR, 'true');
      return;
    }
    if (cellDiv) {
      const nextEl = cellDiv.nextElementSibling;
      if (nextEl && nextEl.classList.contains('pt-reply-container')) {
        tweetEl.setAttribute(PT_SELECTORS.MARKER_ATTR, 'true');
        return;
      }
    }

    const count = getReplyCount();
    const replies = PT_YAPPER.generateReplies(tweetId, count);

    // Detect virtual-scroll context by walking up from the tweet element itself.
    // Checking cellDiv.position is unreliable — findCellBoundary sometimes returns
    // a static-position intermediate wrapper instead of the absolute outer shell.
    const inVirtualScroll = isInVirtualScroll(tweetEl);

    const replyContainer = buildReplyContainer(replies);
    replyContainer.setAttribute('data-pt-tweet', tweetId);

    if (cellDiv && (isThreadView() || inVirtualScroll)) {
      // Thread view: use vsOverlay to avoid inflating scroll height, which would
      // prevent Twitter's load-more sentinel from ever firing (only the initial
      // ~3 replies would be visible). Profile-page virtual scroll: same overlay,
      // different reason — React re-renders reset positions inside its tree.
      const rect = cellDiv.getBoundingClientRect();
      replyContainer.style.cssText =
        'position:absolute;pointer-events:auto;' +
        'background-color:' + getPageBg() + ';' +
        'border-bottom:1px solid rgb(47,51,54);' +
        'top:' + rect.bottom + 'px;' +
        'left:' + rect.left + 'px;' +
        'width:' + rect.width + 'px;';
      getVsOverlay().appendChild(replyContainer);
      vsMap.set(tweetId, { cell: cellDiv, container: replyContainer });
    } else if (cellDiv && cellDiv.parentElement) {
      // Normal flow (timeline): insert directly after the cell.
      cellDiv.parentElement.insertBefore(replyContainer, cellDiv.nextSibling);
    }

    // Inflate the reply count
    inflateReplyCount(tweetEl, count);

    // Mark as processed
    tweetEl.setAttribute(PT_SELECTORS.MARKER_ATTR, 'true');
  }

  // ── Observer ─────────────────────────────────────────────────────

  function processTweets() {
    if (!isActive || !userHandle) return;

    // SPA navigation: nuke stale VS overlay entries immediately when URL changes.
    // scheduleVsUpdate() fires too late (cells still in DOM when rAF runs).
    const currentUrl = location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      for (const [, entry] of vsMap) entry.container.remove();
      vsMap.clear();
    }

    const tweets = document.querySelectorAll(PT_SELECTORS.TWEET_CELL);
    for (const tweet of tweets) {
      // Skip already-processed tweets
      if (tweet.hasAttribute(PT_SELECTORS.MARKER_ATTR)) continue;

      // Only process the user's own tweets
      if (!isUserTweet(tweet)) continue;

      // Skip quoted tweets (user's tweet embedded inside someone else's tweet)
      if (isQuotedTweet(tweet)) continue;

      // Skip thread continuations (only inject on the last tweet in a thread)
      if (isThreadContinuation(tweet)) continue;

      // On a status page the focal tweet (ID == URL's /status/<id>) is in an
      // expanded layout; inserting fake replies directly after it causes overlap
      // with the tweet card's own section. Skip it — self-replies in the thread
      // (different IDs) are still processed normally.
      if (isThreadView()) {
        const focalId = window.location.pathname.match(/\/status\/(\d+)/)?.[1];
        if (focalId && extractTweetId(tweet) === focalId) continue;
      }

      injectReplies(tweet);
    }
  }

  let observer = null;

  function startObserver() {
    if (observer) return;

    // Keep VS overlay containers aligned with their tweet cells during scroll
    window.addEventListener('scroll', scheduleVsUpdate, { passive: true, capture: true });

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
      processTweets();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  function stopObserver() {
    window.removeEventListener('scroll', scheduleVsUpdate, { capture: true });
    // Clean up fixed overlay and its entries
    if (vsOverlay) { vsOverlay.remove(); vsOverlay = null; }
    vsMap.clear();
    if (vsRafId) { cancelAnimationFrame(vsRafId); vsRafId = null; }
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  }

  // ── Settings + Init ──────────────────────────────────────────────

  function loadSettings() {
    chrome.storage.sync.get(
      { handle: '', active: false, intensity: 'medium' },
      (settings) => {
        userHandle = settings.handle;
        isActive = settings.active;
        intensity = settings.intensity;

        if (isActive && userHandle) {
          startObserver();
        } else {
          stopObserver();
        }
      }
    );
  }

  // Listen for settings changes from popup
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'sync') return;

    if (changes.handle) userHandle = changes.handle.newValue || '';
    if (changes.active) isActive = changes.active.newValue || false;
    if (changes.intensity) intensity = changes.intensity.newValue || 'medium';

    if (isActive && userHandle) {
      startObserver();
    } else {
      stopObserver();
    }
  });

  // Init
  loadSettings();

  return { processTweets, startObserver, stopObserver };
})();
