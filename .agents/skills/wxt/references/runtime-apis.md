# WXT Runtime APIs

Read this for extension API access, storage, messaging, assets, i18n, scripting, remote code, and related runtime utilities.

## Upstream pages to read

- `./upstream/guide/essentials/extension-apis.md`
- `./upstream/guide/essentials/storage.md`
- `./upstream/storage.md`
- `./upstream/guide/essentials/messaging.md`
- `./upstream/guide/essentials/i18n.md`
- `./upstream/i18n.md`
- `./upstream/guide/essentials/assets.md`
- `./upstream/guide/essentials/favicons.md`
- `./upstream/guide/essentials/scripting.md`
- `./upstream/guide/essentials/remote-code.md`
- API: `./upstream/api/reference/wxt/utils/storage.md`
- API: `./upstream/api/reference/wxt/utils/match-patterns.md`
- API: `./upstream/api/reference/wxt/utils/inject-script/functions/injectScript.md`

## Extension APIs via `browser`

WXT provides a unified `browser` variable for Chrome/Firefox/Safari/etc. It exports the runtime global `browser` or `chrome`, with promise-style typing.

```ts
import { browser, type Browser } from 'wxt/browser';

browser.action.onClicked.addListener(() => {});
function handleMessage(message: unknown, sender: Browser.runtime.MessageSender) {}
```

With auto-imports, `browser` may already be available. You can also import from `#imports` if generated in the project.

### Feature detection

Types assume APIs exist; runtime support depends on browser, permissions, and MV version. Feature-detect:

```ts
browser.runtime.onSuspend?.addListener(() => {});
(browser.action ?? browser.browser_action).onClicked.addListener(() => {});
```

### Type augmentation

Firefox-specific APIs not in `@types/chrome` may need augmentation. See upstream `extension-apis.md` for the `@wxt-dev/browser` augmentation pattern.

## WXT Storage

WXT re-exports `@wxt-dev/storage`. Prefer auto-import or explicit import from `#imports`; direct API module path is `wxt/utils/storage`.

### Permission

Add storage permission:

```ts
export default defineConfig({
  manifest: {
    permissions: ['storage'],
  },
});
```

### Basic usage

All keys require an area prefix: `local:`, `session:`, `sync:`, or `managed:`.

```ts
await storage.getItem<number>('local:installDate');
await storage.setItem('local:installDate', Date.now());

const unwatch = storage.watch<number>('local:installDate', (next, prev) => {});
unwatch();
```

### Define typed items

Use `defineItem` for repeated keys, defaults, initialization, and migrations:

```ts
export const showChangelog = storage.defineItem<boolean>(
  'local:showChangelogOnUpdate',
  { fallback: true },
);

await showChangelog.getValue();
await showChangelog.setValue(false);
showChangelog.watch((next, prev) => {});
```

Use `fallback` to return a default when missing; use `init` to initialize and persist once.

### Migrations

Set `version` and `migrations`. WXT tracks version metadata at key + `$`; migrations run when `defineItem` is called and storage operations wait for migration completion.

```ts
const ignored = storage.defineItem<IgnoredWebsiteV2[]>('local:ignored', {
  fallback: [],
  version: 2,
  migrations: {
    2: (oldValue: string[]) => oldValue.map((website) => ({ id: crypto.randomUUID(), website })),
  },
});
```

### Metadata and bulk operations

Storage supports metadata (`getMeta`, `setMeta`, `removeMeta`) and bulk operations (`getItems`, `setItems`, `removeItems`, `getMetas`, `setMetas`). Read the API reference for exact tuple/object shapes.

## Messaging

WXT does not replace the browser messaging APIs. The official docs recommend wrappers for type safety and ergonomics:

- `trpc-chrome`
- `webext-bridge`
- `@webext-core/messaging`
- `@webext-core/proxy-service`
- `Comctx`

If using vanilla APIs, read Chrome/Mozilla messaging docs and keep browser-specific return-value behavior in mind.

## Scripting

Use the standard `browser.scripting` API. WXT content scripts can be executed with `registration: 'runtime'` and return from `main`:

```ts
// background
const res = await browser.scripting.executeScript({
  target: { tabId },
  files: ['content-scripts/example.js'],
});

// entrypoints/example.content.ts
export default defineContentScript({
  registration: 'runtime',
  main(ctx) {
    return 'Hello';
  },
});
```

## Assets

- `assets/`: imported/referenced assets are processed by Vite/WXT.
- `public/`: copied to output as-is.
- In HTML, use relative paths for assets under `assets/`.
- In CSS, use `url(~/assets/file.png)` or `/public-file.png`.
- In content scripts, convert paths with `browser.runtime.getURL(path)`.
- Public assets are not content-script accessible by default; add `web_accessible_resources` when page/content needs to load them.

## WASM

Copy WASM into output (often via `build:publicAssets` hook/module), add it to `web_accessible_resources` if fetched from content/page context, then pass `browser.runtime.getURL('/file.wasm')` to the package initializer.

## Remote code

Use `url:` imports to download and bundle remote code at build time, avoiding MV3 remote-code violations:

```ts
import 'url:https://www.googletagmanager.com/gtag/js?id=G-XXXXXX';
```

## I18n

WXT works with browser i18n and the `@wxt-dev/i18n` package.

With WXT module:

```ts
export default defineConfig({
  modules: ['@wxt-dev/i18n/module'],
  manifest: { default_locale: 'en' },
});
```

Messages live in `<srcDir>/locales/<locale>.yml|json|jsonc|json5|toml`. Use:

```ts
import { i18n } from '#i18n';
i18n.t('helloWorld');
```

Supports simple/nested keys, `$1` substitutions, basic plural forms, and type generation during `wxt prepare`/build. Browser language controls the active locale.

## Favicons

Read upstream `favicons.md` for extension favicon handling and browser/store differences.
