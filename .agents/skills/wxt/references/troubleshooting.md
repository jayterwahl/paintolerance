# WXT Troubleshooting

Read this when WXT build/dev/test behavior is surprising.

## Upstream pages to read

- `./upstream/guide/essentials/config/entrypoint-loaders.md`
- `./upstream/guide/essentials/extension-apis.md` (Entrypoint Limitations section)
- `./upstream/guide/resources/faq.md`
- `./upstream/guide/resources/migrate.md`
- `./upstream/guide/resources/upgrading.md`
- `./upstream/guide/essentials/content-scripts.md`
- `./upstream/guide/essentials/config/auto-imports.md`
- `./upstream/guide/essentials/config/environment-variables.md`
- `./upstream/guide/essentials/publishing.md`

## Debug commands

```sh
wxt prepare --debug
wxt --debug
wxt build --debug
wxt build --level trace
DEBUG=@wxt-dev/runner wxt dev
```

`wxt prepare --debug` is especially useful for hook execution order and entrypoint loader preprocessing.

## Common symptoms and fixes

### `Browser.action... not implemented` or extension API error during build

Cause: `browser`/`chrome` API used at top level of a JS/TS entrypoint. WXT imports entrypoints in Node during build.

Fix: move runtime API calls into `defineBackground`, `defineContentScript({ main })`, or `defineUnlistedScript`.

### DOM/window/document errors during build

Cause: DOM code at top level or unsupported browser globals during entrypoint loading.

Fix: put DOM code inside content/unlisted script `main`; use `wxt prepare --debug` to inspect preprocessed code.

### Entrypoint not found or wrong files being built

Causes:

- Deeply nested entrypoint (`entrypoints/foo/bar/index.ts`) — WXT supports only root or one directory deep.
- Related files placed directly under `entrypoints/`.
- Incorrect filename pattern (`youtube/content.ts` instead of `youtube.content.ts` or `youtube.content/index.ts`).

Fix: use the entrypoint patterns in `./entrypoints.md`.

### HTML page routing breaks on refresh/path navigation

Extension pages are static files. Use hash routing (`popup.html#/settings`) for React/Vue/Svelte/Solid routers.

### TypeScript cannot see WXT globals/auto-imports

Fixes:

1. Run `wxt prepare`.
2. Ensure `tsconfig.json` extends `.wxt/tsconfig.json` or references `.wxt/wxt.d.ts`.
3. Inspect `.wxt/types/imports-module.d.ts`.
4. If aliases are wrong, configure `alias` in `wxt.config.ts`, not only in `tsconfig.json`.

### ESLint complains about auto-imported globals

Configure generated ESLint globals:

```ts
export default defineConfig({
  imports: {
    eslintrc: { enabled: 9 }, // or 8
  },
});
```

Then import/extend the generated ESLint config as described in upstream auto-import docs.

### Env var is undefined

Checklist:

- Runtime env vars must start with `WXT_` or `VITE_`.
- Correct dotenv file for mode/browser (`.env.[mode].[browser]`, etc.).
- For `manifest`, use function syntax so env is read after dotenv loading.
- `import.meta.env.DEV/PROD/MODE` are runtime Vite vars; in config manifest function use the `mode` argument.

### Content script CSS not isolated or missing

- Import CSS from the content script entrypoint.
- For Shadow Root UI, set `cssInjectionMode: 'ui'`.
- For standalone CSS-only content scripts, create CSS entrypoint and add it to the manifest with `build:manifestGenerated` hook.
- Read content script UI API docs for exact CSS/positioning options.

### Asset works in popup but not content script/page

Cause: content script runs on the page origin; `/asset.png` resolves against the web page unless converted.

Fix:

```ts
img.src = browser.runtime.getURL(assetPath);
```

If the page itself needs to fetch/use it, add `web_accessible_resources`.

### Cross-browser API missing at runtime

Types are broad. Use feature detection and target-dependent manifest/config:

```ts
browser.runtime.onSuspend?.addListener(() => {});
(browser.action ?? browser.browser_action).onClicked.addListener(() => {});
```

### Permissions changed and extension disables after update

This is browser behavior. Test permission changes with browser update testing tools. See `testing-publishing.md`.

### Firefox source ZIP rebuild mismatch

Potential causes: `.env` affecting hashes, missing private packages, omitted source files. Test extracted source ZIP rebuild, include a source review README, and configure `zip.includeSources` or `zip.downloadPackages` as needed.

### UnoCSS warns `uno.css` not found during dev

The official UnoCSS docs say this dev warning can be safely ignored; styles are applied during build.

### Vite plugin behaves differently than expected

WXT orchestrates Vite differently from plain `vite build`. Make plugin use mode/command conditions explicitly:

```ts
export default defineConfig({
  vite: (env) => ({
    plugins: env.mode === 'production' ? [plugin()] : [],
  }),
});
```

Search WXT GitHub issues for plugin-specific incompatibilities.

### Background module output not as expected

Background scripts default to IIFE. Set `type: 'module'` in `defineBackground` for MV3 ESM. MV2 ignores it.

### Browser does not open as desired in dev

Configure `web-ext.config.ts`, `webExt` in `wxt.config.ts`, or `$HOME/web-ext.config.ts`. Set binaries manually, persist Chromium profile with `chromiumArgs`, or disable auto-open with `disabled: true`.
