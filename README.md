# Pain Tolerance

A Chrome/Firefox extension that injects fake hostile replies under your own tweets so you can practice shrugging them off.

[Install from the Chrome Web Store](https://chromewebstore.google.com/detail/pain-tolerance/dlnhigiephmidefdkmenkeeaogecfhad)

## What it does

The internet is full of bots and bad-faith reply guys trying to get a rise out of you. Pain Tolerance helps you build immunity by simulating that flood on your own timeline — mean, dismissive, off-topic, and completely fake replies generated from local templates.

- Enter your Twitter/X handle in the popup
- Toggle the extension on
- Your own tweets appear to attract a wave of hostile replies
- Pick an intensity: Mild (3–5), Medium (6–10), or Unhinged (11–20)

Seven reply archetypes are rotated: Ratio Guy, Unhinged Reply Guy, Pseudo-Intellectual, Sneering Dismissal, Concern Troll, Off-Topic Ranter, and One-Word Oracle. Over time the pattern becomes obvious — no argument, no substance, pure noise — and that recognition is the point.

## Privacy

- No network calls. All replies are generated offline by a combinatorial template engine.
- No AI, no API keys, no remote code.
- The only data stored is your handle, on/off state, and intensity, via `browser.storage.sync`.
- The extension only modifies the visual appearance of your own feed; it does not read or transmit tweet content.

## Tech stack

- [WXT](https://wxt.dev/) for the extension build system and manifest generation
- TypeScript
- Manifest V3 (Chrome target; Firefox build scripts included)
- Content script on `twitter.com` and `x.com`, plus a popup for configuration

The full design and architecture write-up lives in [`PRD.md`](PRD.md).

## Development

```sh
npm install
npm run dev            # Chrome dev build with HMR
npm run dev:firefox    # Firefox dev build
npm run typecheck
npm run build          # production Chrome build
npm run build:firefox
npm run zip            # zip for Chrome Web Store submission
npm run zip:firefox
```

Built output lands in `.output/`. Load `.output/chrome-mv3` (or `chrome-mv3-dev`) as an unpacked extension in `chrome://extensions`.

### Project layout

```
entrypoints/
  background.ts              # MV3 service worker
  popup/                     # handle + toggle + intensity UI
  twitter.content.ts         # DOM observer + reply injection
utils/
  corpus.ts                  # template fragments per archetype
  thread-reply-template.ts   # rendered reply HTML
  yapper.ts, avatars.ts      # fake persona + avatar generation
  selectors.ts               # Twitter/X DOM selectors
public/avatar-pool/          # static avatar assets
store/                       # Chrome Web Store listing assets
wxt.config.ts                # manifest config
```

### Dev-only host permissions

`wxt.config.ts` grants `http://localhost:47831/*` host permissions only in dev mode, for the optional visual-QA receiver in `scripts/visual-qa/`. Production zips ship without those permissions.

## License

See repository for license details.
