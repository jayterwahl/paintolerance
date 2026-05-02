# WXT Entrypoints

Read this when adding or modifying background scripts, content scripts, popup/options/newtab/sidepanel/devtools pages, unlisted pages/scripts/CSS, or entrypoint-specific manifest options.

## Upstream pages to read

- `./upstream/guide/essentials/entrypoints.md`
- `./upstream/guide/essentials/config/entrypoint-loaders.md`
- `./upstream/guide/essentials/extension-apis.md` (Entrypoint Limitations section)
- API: `./upstream/api/reference/wxt/utils/define-background/functions/defineBackground.md`
- API: `./upstream/api/reference/wxt/utils/define-content-script/functions/defineContentScript.md`
- API: `./upstream/api/reference/wxt/utils/define-unlisted-script/functions/defineUnlistedScript.md`

## Discovery rules

An entrypoint is either a file in `entrypoints/` or a one-level directory containing `index.*`:

```text
entrypoints/{name}.{ext}
entrypoints/{name}/index.{ext}
```

Use the directory form when an entrypoint needs related files:

```text
entrypoints/popup/index.html     # entrypoint
entrypoints/popup/main.ts
entrypoints/popup/style.css
```

Do **not** put related files directly in `entrypoints/`; WXT will treat them as entrypoints. WXT does **not** support deeply nested entrypoints; use names such as `youtube.content/` rather than `youtube/content/`.

## Listed vs unlisted

- **Listed entrypoints** are referenced in the generated manifest (background, content script, popup, options, sidepanel, etc.).
- **Unlisted entrypoints** are bundled but not referenced in the manifest. Use them for welcome pages, manually opened pages, injected scripts, standalone CSS, etc.

## Runtime code boundary (important)

WXT imports JS/TS entrypoints in Node during build to read options. Therefore:

```ts
// ❌ Bad: runs during build import
browser.action.onClicked.addListener(() => {});

// ✅ Good: runtime code inside main
export default defineBackground(() => {
  browser.action.onClicked.addListener(() => {});
});
```

The same applies to DOM code in content/unlisted scripts.

## Entrypoint-specific manifest options

- JS/TS entrypoints export WXT definitions:

  ```ts
  export default defineContentScript({
    matches: ['*://*.example.com/*'],
    main(ctx) {},
  });
  ```

- HTML entrypoints use `<meta name="manifest.*" content="...">`:

  ```html
  <meta name="manifest.open_in_tab" content="true" />
  <meta name="manifest.exclude" content="['firefox']" />
  ```

## Entry type quick reference

| Type | Filename patterns | Output | Key notes |
| --- | --- | --- | --- |
| Background | `background.[jt]s`, `background/index.[jt]s` | `/background.js` | MV2 script/background page; MV3 service worker. `main` cannot be async. Supports `persistent`, `type: 'module'`, `include`, `exclude`. |
| Content script | `content.[jt]sx?`, `{name}.content.[jt]sx?`, directory forms | `/content-scripts/{name}.js` | Define `matches`; `main(ctx)` can be async. Supports `allFrames`, `runAt`, `world`, `cssInjectionMode`, `registration`, include/exclude. |
| Popup | `popup.html`, `popup/index.html` | `/popup.html` | Generates action popup. `<title>` becomes default title; meta tags configure icons/type/browser_style/theme_icons. |
| Options | `options.html`, `options/index.html` | `/options.html` | Configure `open_in_tab`, `chrome_style`, `browser_style` with meta tags. |
| Side panel | `sidepanel.html`, `{name}.sidepanel.html`, directory forms | `/sidepanel.html` or `/{name}.html` | Chrome uses `side_panel`; Firefox uses `sidebar_action`; WXT adds sidepanel permission when present. |
| New tab/history/bookmarks | `newtab.html`, `history.html`, `bookmarks.html`, directory forms | matching `.html` | Overrides browser pages via manifest. |
| Devtools | `devtools.html`, `devtools/index.html` | `/devtools.html` | Add panels/panes from page code. |
| Sandbox | `sandbox.html`, `{name}.sandbox.html`, directory forms | `/sandbox.html` or `/{name}.html` | Chromium only. |
| Unlisted page | `{name}.html`, `{name}/index.html` | `/{name}.html` | Open with `browser.runtime.getURL('/{name}.html')`. |
| Unlisted script | `{name}.[jt]sx?`, `{name}/index.[jt]sx?` | `/{name}.js` | Use `defineUnlistedScript`; responsible for loading/running it. Add to `web_accessible_resources` when needed. |
| Unlisted CSS | `{name}.css` and preprocessors, directory forms | `/{name}.css` or `/content-scripts/{name}.css` | Always unlisted; add to manifest or import from JS as needed. |

## Include/exclude filtering

Every entrypoint can be included/excluded by target browser:

```ts
export default defineContentScript({
  include: ['firefox'],
  matches: ['*://*/*'],
  main(ctx) {},
});
```

HTML entrypoints use meta tags:

```html
<meta name="manifest.exclude" content="['chrome']" />
```

You can also use `filterEntrypoints` in config or `--filter-entrypoint` on the CLI.

## Background ESM

```ts
export default defineBackground({
  type: 'module',
  main() {},
});
```

Only MV3 supports ESM background scripts/service workers. MV2 ignores `type` and bundles as IIFE.
