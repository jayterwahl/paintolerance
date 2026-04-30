# Pain Tolerance — Product Requirements Document

## Vision

The internet is increasingly populated by bots, bad-faith reply guys, and low-effort sneering. Most of it is contentless — designed to provoke an emotional reaction rather than make an argument. The Pain Tolerance is a Chrome extension that inoculates Twitter/X users against this by simulating a flood of hostile replies on their own posts. Like the pain tolerance training, it tests whether you can master your instinctive emotional reaction to scorn — except instead of a poisoned needle, it's a poisoned timeline.

The extension injects fake, visually indistinguishable reply indicators and reply threads beneath the user's own tweets. The fake replies come from generated personas and are produced entirely offline via a combinatorial mad-libs engine. No API keys, no network calls, no external dependencies.

## Target platform

Chrome only (Manifest V3). Targets twitter.com and x.com.

## Core experience

When the extension is active and configured with the user's handle, every tweet the user authored — on their timeline, on their profile, and in thread views — appears to have received a wave of hostile, dismissive, or absurdly off-topic replies. The replies are visually indistinguishable from real Twitter replies: same DOM structure, same avatar style, same metrics layout, same timestamp format.

The user learns, over time, to notice the pattern: these replies contain no real argumentation, no substance, no signal. They are pure noise. That recognition is the training.

---

## Architecture overview

### Components

**1. Observer (content script: `content.js`)**

A MutationObserver watching the Twitter DOM for tweet cells authored by the configured user handle. Uses `data-testid` attributes as primary selectors (more stable than Twitter's obfuscated CSS class names). When the user's tweet is detected and has not yet been processed (checked via a `data-pt-yapped` marker attribute), it is flagged for injection.

Runs on every DOM mutation. Must be performant — early-exit on mutations that don't involve tweet cells.

**2. Selector map (`selectors.js`)**

A single-file abstraction mapping logical names to current Twitter DOM selectors. Isolates all DOM-structure assumptions into one place so that when Twitter ships DOM changes, a single file update fixes everything.

Logical names include:

- `TWEET_CELL` — the outermost container for a single tweet
- `TWEET_AUTHOR` — the element containing the author's handle
- `TWEET_TEXT` — the tweet body text
- `REPLY_COUNT` — the reply count indicator
- `TWEET_ACTIONS` — the row of action buttons (reply, retweet, like, etc.)
- `TWEET_THREAD` — the reply thread container (in thread view)

**3. Injector (`injector.js`)**

Receives flagged tweet elements and injects fake reply content. Responsibilities:

- Increment the visible reply count on the tweet by a random amount (controlled by intensity setting)
- In timeline/profile view: append a compact "top reply" preview beneath the tweet, matching Twitter's native reply preview structure
- In thread view: insert full fake reply tweet cells into the reply list, interleaved with real replies
- Mark processed tweets with `data-pt-yapped="true"` to prevent re-injection on DOM re-renders
- Re-inject when previously processed tweets are destroyed and re-created by Twitter's virtual scrolling

The injector clones the DOM structure of real tweet cells. It does not use innerHTML with raw HTML strings — it builds elements programmatically to match the exact nesting, class names, and `data-testid` attributes of real tweets.

**4. Yapper engine (`yapper.js`)**

The content generation core. Produces a complete fake reply object containing: display name, handle, avatar data URL, tweet text, timestamp string, and engagement metrics.

Generation pipeline:

1. Roll an **archetype** (weighted random selection)
2. Select a **template** from that archetype's bank
3. Fill **slots** from the appropriate filler arrays
4. Generate an **identity** (display name + handle + avatar)
5. Generate **metrics** (likes, retweets, replies — weighted distribution)
6. Generate a **timestamp** relative to the original tweet's apparent age

**5. Corpus (`corpus.js`)**

The static data bank. Contains all templates, slot fillers, archetype definitions, and identity generation material. Bundled with the extension at build time. Target size: 40–60KB.

**6. Avatar generator (`avatars.js`)**

Generates profile picture data URLs using an offscreen canvas. The fake username is hashed to deterministically select:

- A background color (from a curated palette of ~20 muted tones matching common Twitter avatar colors)
- A foreground letter (first character of the display name)
- Font weight and slight size variation

Occasionally (10–15% of the time), generates a solid-color circle with no letter, mimicking accounts that uploaded a flat-color image. This distribution mirrors real bot account avatar patterns.

Output: a `data:image/png;base64,...` URL ready to set as an `<img>` src.

**7. Popup UI (`popup.html` + `popup.js`)**

Minimal settings interface:

- **Handle input**: text field for the user's Twitter/X handle (stored in `chrome.storage.sync`)
- **Active toggle**: on/off switch
- **Intensity slider**: controls how many fake replies appear per tweet
  - Mild (3–5 replies)
  - Medium (6–10 replies)
  - Unhinged (11–20 replies)
- **Status indicator**: shows whether the extension is currently active and on a supported page

---

## Archetype system

Each fake reply is generated from one of eight persona archetypes. Archetypes are selected via weighted random — some appear more frequently than others to mirror real Twitter reply distributions.

| Archetype | Weight | Description | Example output pattern |
|---|---|---|---|
| Ratio Guy | 20% | One-word or two-word dismissals. Maximum contempt, minimum effort. | "ratio", "L", "nobody asked", "cope" |
| Crypto Bro | 15% | Derails any topic into crypto/web3/NFT promotion. Completely off-topic. | "this is why you need to look into {coin}. {shill_phrase}" |
| Pseudo-Intellectual | 12% | Sneering condescension disguised as insight. Uses "tell me you don't understand X" format. | "tell me you don't understand {concept} without telling me you don't understand {concept}" |
| Unhinged Reply Guy | 15% | Disproportionate emotional reaction. All caps optional. Treats mild takes as personal attacks. | "I cannot BELIEVE you would say this. {overreaction}. Blocked." |
| The Bot | 15% | Spam patterns: emoji floods, "check my profile", engagement farming. | "{emoji_spam} Amazing post! Check out my {spam_product}" |
| Concern Troll | 8% | Faux-sympathetic framing that's actually dismissive. | "I mean this in the nicest way but {backhanded_concern}" |
| Off-Topic Ranter | 10% | Completely ignores the original tweet and launches into an unrelated grievance. | "Speaking of which, {unrelated_rant}" |
| One-Word Oracle | 5% | Single word or emoji. Enigmatic. Infuriating. | "no", "wrong", "lol", "mid", "ok" |

---

## Template and slot system

Templates are strings with named slots wrapped in curly braces. Each archetype has 20–30 templates. Slots are filled from independent arrays.

### Slot categories

- `{insult}` — generic dismissals: "this ain't it", "touch grass", "most sane twitter user", etc. (50+ entries)
- `{concept}` — pseudo-intellectual topics: "market dynamics", "second-order effects", "basic economics", etc. (40+ entries)
- `{coin}` — fake cryptocurrency names: "$YAPPR", "$MOONRUG", "$COPIUM", etc. (30+ entries)
- `{shill_phrase}` — crypto pitches: "still early", "NFA but DYOR", "wagmi", etc. (20+ entries)
- `{emoji_spam}` — emoji sequences: fire/rocket/100 combos (20+ patterns)
- `{overreaction}` — disproportionate responses: "this is literally the worst take of 2024", "my therapist is going to hear about this", etc. (40+ entries)
- `{backhanded_concern}` — concern troll phrases: "you might want to sit this one out", "maybe log off for a bit", etc. (30+ entries)
- `{unrelated_rant}` — off-topic tangents: "why does every restaurant have a QR code menu now", "I switched to Linux and my life changed", etc. (40+ entries)
- `{spam_product}` — bot promotion targets: "bio for a surprise", "new project", "pinned tweet", etc. (15+ entries)
- `{hashtag}` — random hashtags that add nothing: "#truth", "#facts", "#wakeup", etc. (20+ entries)

### Combinatorial depth

With 8 archetypes averaging 25 templates each, and 5 slots per template averaging 35 fillers each:

- Unique template fills: 8 × 25 × 35^5 ≈ **10.5 billion** possible outputs
- Even accounting for templates with fewer slots, the effective unique output space is in the hundreds of millions

This is more than sufficient to avoid visible repetition without any network calls.

---

## Identity generation (`avatars.js` + `yapper.js`)

### Display names

Generated from a bank of first-name and last-name/descriptor fragments:

- First names: common names, crypto-themed names ("CryptoKing", "NFTMaxi"), generic nouns ("truth", "freedom", "based")
- Suffixes: numbers (4 digits), birth years ("1994"), emoji, ".eth", "DAO", etc.

### Handles

Follow real Twitter handle patterns:

- `{name}{4_digit_number}` (e.g., @jake8294)
- `{name}_{name}` (e.g., @real_thoughts)
- `{adjective}{noun}{numbers}` (e.g., @basedtakes99)
- `{name}{birth_year}` (e.g., @mike1997)

### Blue checkmarks

~20% of generated identities receive a blue checkmark. Adjustable. Reflects the post-Twitter-Blue reality where checkmarks no longer signal credibility.

---

## Metrics generation

Fake replies receive randomized engagement metrics following a power-law distribution:

- **Likes**: 70% get 0–2, 20% get 3–15, 8% get 16–50, 2% get 50+ (capped at ~200)
- **Retweets**: 85% get 0, 10% get 1–3, 5% get 4–10
- **Replies**: 80% get 0, 15% get 1–3, 5% get 4–8
- **Timestamps**: randomly distributed between 1 minute and 4 hours after the original tweet, with a decay curve (more replies appear early)

---

## DOM injection strategy

### Selector stability

Twitter's DOM uses `data-testid` attributes on key elements. These are more stable than CSS class names (which are hashed and change between builds) but still change periodically. The selector map in `selectors.js` centralizes all selectors.

Known stable `data-testid` values (as of early 2025):

- `tweet` — individual tweet cell
- `tweetText` — tweet body
- `User-Name` — author info container
- `reply`, `retweet`, `like` — action buttons
- `app-bar-back` — navigation (useful for detecting thread view)

### Injection points

**Timeline / Profile view**: After each of the user's tweet cells, inject a compact reply preview container. This mirrors Twitter's native "show replies" affordance — a smaller tweet cell with a connecting line to the parent.

**Thread view**: Insert full-size tweet cells into the reply list. These are structurally identical to real reply cells, with the same nesting depth, avatar placement, and action row.

### Re-render resilience

Twitter's React-based rendering destroys and recreates DOM nodes frequently (virtual scrolling, tab switches, navigation). The Observer must:

1. Detect when a previously-yapped tweet has been recreated (the `data-pt-yapped` attribute will be gone)
2. Re-inject content using the same seed (so the user sees the same fake replies, not new random ones)
3. Seed is derived from the tweet's ID (extracted from the tweet's permalink element), ensuring deterministic generation per tweet

---

## File structure

```
pain-tolerance/
├── manifest.json          # Chrome extension manifest (v3)
├── content.js             # Observer + Injector (content script)
├── selectors.js           # DOM selector map
├── yapper.js              # Generation engine
├── corpus.js              # Templates, slot fillers, archetype data
├── avatars.js             # Canvas-based avatar generator
├── popup/
│   ├── popup.html         # Settings UI
│   ├── popup.js           # Settings logic
│   └── popup.css          # Settings styles
└── icons/
    ├── icon16.png         # Toolbar icon
    ├── icon48.png         # Extension management icon
    └── icon128.png        # Chrome Web Store icon
```

### Manifest V3 configuration

```json
{
  "manifest_version": 3,
  "name": "Pain Tolerance",
  "version": "1.0.0",
  "description": "Resilience training for your timeline. Simulated hostile replies to harden you against internet scorn.",
  "permissions": ["storage"],
  "content_scripts": [
    {
      "matches": ["*://twitter.com/*", "*://x.com/*"],
      "js": ["corpus.js", "avatars.js", "selectors.js", "yapper.js", "content.js"],
      "run_at": "document_idle"
    }
  ],
  "action": {
    "default_popup": "popup/popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  }
}
```

---

## Chrome Web Store considerations

### Policy compliance

- The extension modifies only the visual appearance of the user's own feed — it does not scrape data, intercept requests, or communicate with external servers
- No data collection: the only stored data is the user's own handle and preferences in `chrome.storage.sync`
- No remote code execution: all generation logic is bundled statically
- Clear description that the extension adds fictional content to the UI for training purposes

### Listing description (draft)

> The internet is full of bots and bad-faith reply guys trying to get a rise out of you. The Pain Tolerance helps you build immunity.
>
> This extension adds simulated hostile replies to your own tweets — mean, dismissive, off-topic, and completely fake. The replies come from generated personas and are produced entirely offline. No AI, no API keys, no data collection.
>
> Over time, you'll notice the pattern: contentless sneering, engagement bait, derailed conversations. Once you can spot it in simulation, you'll spot it in the wild.
>
> Named after the pain tolerance training — a test of whether you can master your instincts under pressure.

---

## Development phases

### Phase 1: Core loop

- Selector map with current Twitter DOM structure
- Observer detecting the user's tweets on timeline and profile
- Yapper engine with 3 archetypes and basic templates
- Injector placing fake reply previews beneath tweets
- Popup with handle input and on/off toggle
- Canvas avatar generation

### Phase 2: Full corpus

- All 8 archetypes with full template banks
- Complete slot filler arrays (300+ total entries across all categories)
- Identity generation with realistic handle patterns and checkmark distribution
- Metrics generation with power-law distribution
- Intensity slider in popup

### Phase 3: Thread view + polish

- Full fake reply injection in thread/conversation view
- Deterministic seeding from tweet ID for re-render consistency
- Reply count inflation on tweet cells
- Edge case handling: quoted tweets, threads by the user, tweets with media

### Phase 4: Store submission

- Extension icons and branding
- Chrome Web Store listing assets (screenshots, description)
- Final policy compliance review
- Beta testing with real Twitter accounts

---

## Open questions

1. **Keyword awareness**: Should the yapper engine extract keywords from the original tweet text to make some replies contextually relevant (e.g., if you tweet about cooking, a reply says "your pasta takes are criminal")? This increases believability but adds complexity. Could be a Phase 3+ feature.

2. **Quote tweet simulation**: Should the extension also simulate fake quote tweets (visible as notifications or on the user's tweet)? This is a different injection surface and significantly more complex.

3. **Graduation metric**: Should the extension track how long the user has been using it and surface a "you've been yapped for 30 days" milestone? Could reinforce the training metaphor.

4. **Selector update mechanism**: When Twitter changes their DOM, users will need to update `selectors.js`. Options: manual update via extension update, community-maintained selector file, or a lightweight hosted selector config (though this conflicts with the "no network" principle).
