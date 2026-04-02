/**
 * Gom Yapper — DOM Selector Map
 *
 * Centralizes all Twitter/X DOM selectors so that when Twitter ships
 * DOM changes, only this file needs updating.
 */

const GOM_SELECTORS = {
  // Outermost container for a single tweet
  TWEET_CELL: '[data-testid="tweet"]',

  // Tweet body text
  TWEET_TEXT: '[data-testid="tweetText"]',

  // Author info container (contains display name + handle)
  TWEET_AUTHOR: '[data-testid="User-Name"]',

  // Action buttons
  REPLY_BUTTON: '[data-testid="reply"]',
  RETWEET_BUTTON: '[data-testid="retweet"]',
  LIKE_BUTTON: '[data-testid="like"]',

  // The row containing all action buttons
  TWEET_ACTIONS: 'div[role="group"]',

  // Reply count — the span inside the reply button
  REPLY_COUNT: '[data-testid="reply"] span[data-testid="app-text-transition-container"]',

  // Navigation back button (useful for detecting thread view)
  BACK_BUTTON: '[data-testid="app-bar-back"]',

  // Tweet permalink (contains the tweet ID in href)
  TWEET_LINK: 'a[href*="/status/"] time',

  // Avatar image inside a tweet
  TWEET_AVATAR: '[data-testid="Tweet-User-Avatar"]',

  // The timeline container
  TIMELINE: '[data-testid="primaryColumn"]',

  // Conversation thread (reply list in thread view)
  TWEET_THREAD: 'section[role="region"]',

  // Marker attribute to flag processed tweets
  MARKER_ATTR: 'data-gom-yapped',
};
