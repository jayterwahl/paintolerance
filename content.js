/**
 * Gom Yapper — Observer + Injector (content script)
 *
 * MutationObserver watches for tweet cells authored by the configured user.
 * Injector places fake reply previews beneath detected tweets.
 *
 * Depends on: GOM_SELECTORS (selectors.js), GOM_YAPPER (yapper.js),
 *             GOM_AVATARS (avatars.js), GOM_CORPUS (corpus.js)
 */

const GOM_CONTENT = (() => {
  let userHandle = '';
  let isActive = false;
  let intensity = 'medium'; // mild | medium | unhinged

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
    const timeEl = tweetEl.querySelector(GOM_SELECTORS.TWEET_LINK);
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
    const authorEl = tweetEl.querySelector(GOM_SELECTORS.TWEET_AUTHOR);
    if (!authorEl) return false;
    const text = authorEl.textContent.toLowerCase();
    const handle = userHandle.toLowerCase().replace(/^@/, '');
    return text.includes('@' + handle);
  }

  // ── DOM Builder ──────────────────────────────────────────────────

  /**
   * Build a compact reply preview element matching Twitter's native
   * reply preview structure beneath a tweet on timeline/profile view.
   */
  function buildReplyPreview(reply) {
    // Outer container
    const container = document.createElement('div');
    container.classList.add('gom-reply-preview');
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
    displayNameSpan.style.cssText = 'font-weight:700;color:rgb(231,233,234);';
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
      'font-size:15px;line-height:20px;color:rgb(231,233,234);overflow-wrap:break-word;';
    textDiv.textContent = reply.text;

    // Metrics row
    const metricsRow = document.createElement('div');
    metricsRow.style.cssText =
      'display:flex;gap:24px;margin-top:4px;font-size:13px;color:rgb(113,118,123);';

    if (reply.metrics.replies > 0) {
      const repSpan = document.createElement('span');
      repSpan.textContent = '\uD83D\uDCAC ' + reply.metrics.replies;
      metricsRow.appendChild(repSpan);
    }
    if (reply.metrics.retweets > 0) {
      const rtSpan = document.createElement('span');
      rtSpan.textContent = '\uD83D\uDD01 ' + reply.metrics.retweets;
      metricsRow.appendChild(rtSpan);
    }
    if (reply.metrics.likes > 0) {
      const likeSpan = document.createElement('span');
      likeSpan.textContent = '\u2764\uFE0F ' + reply.metrics.likes;
      metricsRow.appendChild(likeSpan);
    }

    rightCol.appendChild(nameRow);
    rightCol.appendChild(textDiv);
    if (metricsRow.children.length > 0) {
      rightCol.appendChild(metricsRow);
    }

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
    wrapper.classList.add('gom-reply-container');
    wrapper.style.cssText =
      'border-bottom:1px solid rgb(47,51,54);background:rgb(0,0,0);';

    for (const reply of replies) {
      wrapper.appendChild(buildReplyPreview(reply));
    }

    return wrapper;
  }

  // ── Reply Count Inflation ────────────────────────────────────────

  function inflateReplyCount(tweetEl, addedCount) {
    const countEl = tweetEl.querySelector(GOM_SELECTORS.REPLY_COUNT);
    if (!countEl) return;
    const span = countEl.querySelector('span > span');
    if (!span) return;
    const current = parseInt(span.textContent, 10) || 0;
    span.textContent = String(current + addedCount);
  }

  // ── Injector ─────────────────────────────────────────────────────

  function injectReplies(tweetEl) {
    const tweetId = extractTweetId(tweetEl);
    if (!tweetId) return;

    const count = getReplyCount();
    const replies = GOM_YAPPER.generateReplies(tweetId, count);

    // Build and insert after the tweet cell
    const replyContainer = buildReplyContainer(replies);

    // Find the article ancestor (the actual tweet boundary in the DOM)
    const article = tweetEl.closest('article') || tweetEl;
    const cellDiv = article.closest('[data-testid="cellInnerDiv"]') || article.parentElement;

    if (cellDiv && cellDiv.parentElement) {
      cellDiv.parentElement.insertBefore(replyContainer, cellDiv.nextSibling);
    }

    // Inflate the reply count
    inflateReplyCount(tweetEl, count);

    // Mark as processed
    tweetEl.setAttribute(GOM_SELECTORS.MARKER_ATTR, 'true');
  }

  // ── Observer ─────────────────────────────────────────────────────

  function processTweets() {
    if (!isActive || !userHandle) return;

    const tweets = document.querySelectorAll(GOM_SELECTORS.TWEET_CELL);
    for (const tweet of tweets) {
      // Skip already-processed tweets
      if (tweet.hasAttribute(GOM_SELECTORS.MARKER_ATTR)) continue;

      // Only process the user's own tweets
      if (!isUserTweet(tweet)) continue;

      injectReplies(tweet);
    }
  }

  let observer = null;

  function startObserver() {
    if (observer) return;

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

      processTweets();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  function stopObserver() {
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
