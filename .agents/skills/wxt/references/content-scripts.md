# WXT Content Scripts

Read this for content script lifecycle, CSS, content script UIs, Shadow DOM/IFrame/integrated strategies, page-context injection, and context invalidation.

## Upstream pages to read

- `./upstream/guide/essentials/content-scripts.md`
- `./upstream/guide/essentials/entrypoints.md` (Content Scripts section)
- `./upstream/guide/essentials/scripting.md`
- `./upstream/guide/essentials/assets.md` (Inside Content Scripts section)
- API: `./upstream/api/reference/wxt/utils/content-script-context/classes/ContentScriptContext.md`
- API: `./upstream/api/reference/wxt/utils/content-script-ui/integrated/functions/createIntegratedUi.md`
- API: `./upstream/api/reference/wxt/utils/content-script-ui/shadow-root/functions/createShadowRootUi.md`
- API: `./upstream/api/reference/wxt/utils/content-script-ui/iframe/functions/createIframeUi.md`
- API: `./upstream/api/reference/wxt/utils/inject-script/functions/injectScript.md`

## Basic content script

```ts
export default defineContentScript({
  matches: ['*://*.example.com/*'],
  runAt: 'document_idle',
  main(ctx) {
    // runtime DOM/browser code here
  },
});
```

Never run DOM or extension API code at top level; WXT imports this module at build time.

## ContentScriptContext

The first `main` argument tracks whether the content script has been invalidated (extension updated/disabled/uninstalled). Prefer context helpers so async work is cleaned up safely:

```ts
export default defineContentScript({
  matches: ['<all_urls>'],
  main(ctx) {
    ctx.addEventListener(window, 'message', (event) => {});
    ctx.setInterval(() => {}, 1000);
    ctx.requestAnimationFrame(() => {});

    if (ctx.isValid) {
      // still safe to call extension APIs
    }
  },
});
```

## CSS in content scripts

Import CSS from the content script entrypoint; WXT adds it to the generated manifest CSS array by default:

```ts
import './style.css';

export default defineContentScript({
  matches: ['*://*/*'],
  main(ctx) {},
});
```

For Shadow Root UI, set `cssInjectionMode: 'ui'` so styles are injected into the UI shadow root rather than the page.

## UI strategy decision table

| Method | Helper | Isolated styles | Isolated events | HMR | Uses page context | Use when |
| --- | --- | --- | --- | --- | --- | --- |
| Integrated | `createIntegratedUi` | No | No | No | Yes | Simple DOM injection; page styles/events are acceptable. |
| Shadow Root | `createShadowRootUi` | Yes | Optional (`isolateEvents`) | No | Yes | Most extension overlays/widgets; style isolation needed. |
| IFrame | `createIframeUi` | Yes | Yes | Yes | No | Complex UI needing HMR and full isolation; communication boundary is okay. |

## Integrated UI pattern

```ts
export default defineContentScript({
  matches: ['<all_urls>'],
  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      anchor: 'body',
      onMount(container) {
        container.textContent = 'Hello';
      },
      onRemove(mounted) {
        // framework unmount cleanup when applicable
      },
    });

    ui.mount();
  },
});
```

## Shadow Root UI pattern

```ts
import './style.css';

export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui',
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: 'my-extension-ui',
      position: 'inline',
      anchor: 'body',
      onMount(container) {
        const app = document.createElement('div');
        container.append(app);
        return app;
      },
      onRemove(app) {
        app?.remove();
      },
    });

    ui.mount();
  },
});
```

## Framework mounting

- React: create a wrapper div when mounting into a Shadow Root container, then `ReactDOM.createRoot(wrapper)`; return the root and `root.unmount()` in `onRemove`.
- Vue: `const app = createApp(App); app.mount(container); return app;` and `app.unmount()`.
- Svelte: `mount(App, { target: container })` and `unmount(app)`.
- Solid: `const dispose = render(() => <App />, container); return dispose;` and call dispose.

Read the upstream content script page for full framework examples.

## Positioning and auto-mount

WXT UI helpers support inline, overlay, modal, and anchored positioning options. Use the API pages for exact option names. For dynamic pages/SPAs, use auto-mount options/observers so UI remounts when anchors appear/disappear.

## Assets inside content scripts

Imported/public asset paths are usually relative paths like `/icon.png`. In a content script, convert them to extension URLs before using them in DOM/fetch:

```ts
import iconPath from '/icon/128.png';

const img = document.createElement('img');
img.src = browser.runtime.getURL(iconPath);
```

If the page itself must access the asset (e.g. iframe, image, injected script), add it to `manifest.web_accessible_resources`.

## Page-context / MAIN world scripts

- `world: 'MAIN'` runs a content script in the page/main world when supported, but limits extension API access.
- For manually injected code, use an unlisted script plus `injectScript()` and ensure the script is web-accessible when needed.
- For `browser.scripting.executeScript`, a WXT content script with `registration: 'runtime'` can return a value from `main`; the executeScript result receives it.

## Runtime registration

Use `registration: 'runtime'` for content scripts you execute/register yourself rather than manifest-registering them. Read the API reference for exact behavior and browser support.
