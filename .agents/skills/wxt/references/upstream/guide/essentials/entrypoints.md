<!--
Source: https://wxt.dev/guide/essentials/entrypoints.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

# Entrypoints

WXT uses the files inside the `entrypoints/` directory as inputs when bundling your extension. They can be HTML, JS, CSS, or any variant of those file types supported by Vite (TS, JSX, SCSS, etc).

## Folder Structure

Inside the `entrypoints/` directory, an entrypoint is defined as a single file or directory (with an `index` file) inside it.

:::code-group

```html [Single File]
📂 entrypoints/
   📄 {name}.{ext}
```

```html [Directory]
📂 entrypoints/
   📂 {name}/
      📄 index.{ext}
```

:::

The entrypoint's `name` dictates the type of entrypoint. For example, to add a ["Background" entrypoint](#background), either of these files would work:

:::code-group

```html [Single File]
📂 entrypoints/
   📄 background.ts
```

```html [Directory]
📂 entrypoints/
   📂 background/
      📄 index.ts
```

:::

Refer to the [Entrypoint Types](#entrypoint-types) section for the full list of listed entrypoints and their filename patterns.

### Including Other Files

When using an entrypoint directory, `entrypoints/{name}/index.{ext}`, you can add related files next to the `index` file.

```html
📂 entrypoints/
   📂 popup/
      📄 index.html     ← This file is the entrypoint
      📄 main.ts
      📄 style.css
   📂 background/
      📄 index.ts       ← This file is the entrypoint
      📄 alarms.ts
      📄 messaging.ts
   📂 youtube.content/
      📄 index.ts       ← This file is the entrypoint
      📄 style.css
```

:::danger
**DO NOT** put files related to an entrypoint directly inside the `entrypoints/` directory. WXT will treat them as entrypoints and try to build them, usually resulting in an error.

Instead, use a directory for that entrypoint:

```html
📂 entrypoints/
   📄 popup.html <!-- [!code --] -->
   📄 popup.ts <!-- [!code --] -->
   📄 popup.css <!-- [!code --] -->
   📂 popup/ <!-- [!code ++] -->
      📄 index.html <!-- [!code ++] -->
      📄 main.ts <!-- [!code ++] -->
      📄 style.css <!-- [!code ++] -->
```

:::

### Deeply Nested Entrypoints

While the `entrypoints/` directory might resemble the `pages/` directory of other web frameworks, like Nuxt or Next.js, **it does not support deeply nesting entrypoints** in the same way.

Entrypoints must be zero or one levels deep for WXT to discover and build them:

```html
📂 entrypoints/
   📂 youtube/ <!-- [!code --] -->
       📂 content/ <!-- [!code --] -->
          📄 index.ts <!-- [!code --] -->
          📄 ... <!-- [!code --] -->
       📂 injected/ <!-- [!code --] -->
          📄 index.ts <!-- [!code --] -->
          📄 ... <!-- [!code --] -->
   📂 youtube.content/ <!-- [!code ++] -->
      📄 index.ts <!-- [!code ++] -->
      📄 ... <!-- [!code ++] -->
   📂 youtube-injected/ <!-- [!code ++] -->
      📄 index.ts <!-- [!code ++] -->
      📄 ... <!-- [!code ++] -->
```

## Unlisted Entrypoints

In web extensions, there are two types of entrypoints:

1. **Listed**: Referenced in the `manifest.json`
2. **Unlisted**: Not referenced in the `manifest.json`

Throughout the rest of WXT's documentation, listed entrypoints are referred to by name. For example:

* Popup
* Options
* Background
* Content Script

However, not all entrypoints in web extensions are listed in the manifest. Some are not listed in the manifest, but are still used by extensions. For example:

* A welcome page shown in a new tab when the extension is installed
* JS files injected by content scripts into the main world

For more details on how to add unlisted entrypoints, see:

* [Unlisted Pages](#unlisted-pages)
* [Unlisted Scripts](#unlisted-scripts)
* [Unlisted CSS](#unlisted-css)

## Defining Manifest Options

Most listed entrypoints have options that need to be added to the `manifest.json`. However with WXT, instead of defining the options in a separate file, *you define these options inside the entrypoint file itself*.

For example, here's how to define `matches` for content scripts:

```ts [entrypoints/content.ts]
export default defineContentScript({
  matches: ['*://*.wxt.dev/*'],
  main() {
    // ...
  },
});
```

For HTML entrypoints, options are configured as `<meta>` tags. For example, to use a `page_action` for your MV2 popup:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta name="manifest.type" content="page_action" />
  </head>
</html>
```

> Refer to the [Entrypoint Types](#entrypoint-types) sections for a list of options configurable inside each entrypoint, and how to define them.

When building your extension, WXT will look at the options defined in your entrypoints, and generate the manifest accordingly.

## Entrypoint Types

### Background

[Chrome Docs](https://developer.chrome.com/docs/extensions/mv3/manifest/background/) • [Firefox Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/background)

:::code-group

```ts [Minimal]
export default defineBackground(() => {
  // Executed when background is loaded
});
```

```ts [With Manifest Options]
export default defineBackground({
  // Set manifest options
  persistent: undefined | true | false,
  type: undefined | 'module',

  // Set include/exclude if the background should be removed from some builds
  include: undefined | string[],
  exclude: undefined | string[],

  main() {
    // Executed when background is loaded, CANNOT BE ASYNC
  },
});
```

:::

For MV2, the background is added as a script to the background page. For MV3, the background becomes a service worker.

When defining your background entrypoint, keep in mind that WXT will import this file in a NodeJS environment during the build process. That means you cannot place any runtime code outside the `main` function.

```ts
browser.action.onClicked.addListener(() => { // [!code --]
  // ... // [!code --]
}); // [!code --]

export default defineBackground(() => {
  browser.action.onClicked.addListener(() => { // [!code ++]
    // ... // [!code ++]
  }); // [!code ++]
});
```

Refer to the [Entrypoint Loaders](/guide/essentials/config/entrypoint-loaders) documentation for more details.

### Bookmarks

[Chrome Docs](https://developer.chrome.com/docs/extensions/mv3/override/) • [Firefox Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/chrome_url_overrides)

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Title</title>
    <!-- Set include/exclude if the page should be removed from some builds -->
    <meta name="manifest.include" content="['chrome', ...]" />
    <meta name="manifest.exclude" content="['chrome', ...]" />
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```

When you define a Bookmarks entrypoint, WXT will automatically update the manifest to override the browser's bookmarks page with your own HTML page.

### Content Scripts

[Chrome Docs](https://developer.chrome.com/docs/extensions/mv3/content_scripts/) • [Firefox Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts)

```ts
export default defineContentScript({
  // Set manifest options
  matches: string[],
  excludeMatches: undefined | [],
  includeGlobs: undefined | [],
  excludeGlobs: undefined | [],
  allFrames: undefined | true | false,
  runAt: undefined | 'document_start' | 'document_end' | 'document_idle',
  matchAboutBlank: undefined | true | false,
  matchOriginAsFallback: undefined | true | false,
  world: undefined | 'ISOLATED' | 'MAIN',

  // Set include/exclude if the background should be removed from some builds
  include: undefined | string[],
  exclude: undefined | string[],

  // Configure how CSS is injected onto the page
  cssInjectionMode: undefined | "manifest" | "manual" | "ui",

  // Configure how/when content script will be registered
  registration: undefined | "manifest" | "runtime",

  main(ctx: ContentScriptContext) {
    // Executed when content script is loaded, can be async
  },
});
```

When defining content script entrypoints, keep in mind that WXT will import this file in a NodeJS environment during the build process. That means you cannot place any runtime code outside the `main` function.

```ts
const container = document.createElement('div'); // [!code --]
document.body.append(container); // [!code --]

export default defineContentScript({
  main: function () {
    const container = document.createElement('div'); // [!code ++]
    document.body.append(container); // [!code ++]
  },
});
```

Refer to the [Entrypoint Loaders](/guide/essentials/config/entrypoint-loaders) documentation for more details.

See [Content Script UI](/guide/essentials/content-scripts) for more info on creating UIs and including CSS in content scripts.

### Devtools

[Chrome Docs](https://developer.chrome.com/docs/extensions/mv3/devtools/) • [Firefox Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/devtools_page)

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Set include/exclude if the page should be removed from some builds -->
    <meta name="manifest.include" content="['chrome', ...]" />
    <meta name="manifest.exclude" content="['chrome', ...]" />
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```

Follow the [Devtools Example](https://github.com/wxt-dev/examples/tree/main/examples/devtools-extension#readme) to add different panels and panes.

### History

[Chrome Docs](https://developer.chrome.com/docs/extensions/mv3/override/) • [Firefox Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/chrome_url_overrides)

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Title</title>
    <!-- Set include/exclude if the page should be removed from some builds -->
    <meta name="manifest.include" content="['chrome', ...]" />
    <meta name="manifest.exclude" content="['chrome', ...]" />
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```

When you define a History entrypoint, WXT will automatically update the manifest to override the browser's history page with your own HTML page.

### Newtab

[Chrome Docs](https://developer.chrome.com/docs/extensions/mv3/override/) • [Firefox Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/chrome_url_overrides)

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Title</title>
    <!-- Set include/exclude if the page should be removed from some builds -->
    <meta name="manifest.include" content="['chrome', ...]" />
    <meta name="manifest.exclude" content="['chrome', ...]" />
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```

When you define a Newtab entrypoint, WXT will automatically update the manifest to override the browser's new tab page with your own HTML page.

### Options

[Chrome Docs](https://developer.chrome.com/docs/extensions/mv3/options/) • [Firefox Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/options_ui)

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Options Title</title>

    <!-- Customize the manifest options -->
    <meta name="manifest.open_in_tab" content="true|false" />
    <meta name="manifest.chrome_style" content="true|false" />
    <meta name="manifest.browser_style" content="true|false" />

    <!-- Set include/exclude if the page should be removed from some builds -->
    <meta name="manifest.include" content="['chrome', ...]" />
    <meta name="manifest.exclude" content="['chrome', ...]" />
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```

### Popup

[Chrome Docs](https://developer.chrome.com/docs/extensions/reference/action/) • [Firefox Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/action)

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Set the `action.default_title` in the manifest -->
    <title>Default Popup Title</title>

    <!-- Customize the manifest options -->
    <meta
      name="manifest.default_icon"
      content="{
        '16': '/icon-16.png',
        '24': '/icon-24.png',
        ...
      }"
    />
    <meta name="manifest.type" content="page_action|browser_action" />
    <meta name="manifest.browser_style" content="true|false" />
    <!-- Firefox only: where to place the action button -->
    <meta
      name="manifest.default_area"
      content="navbar|menupanel|tabstrip|personaltoolbar"
    />
    <!-- Firefox only: icons for light/dark themes -->
    <meta
      name="manifest.theme_icons"
      content="[
        { light: '/icon-light-16.png', dark: '/icon-dark-16.png', size: 16 },
        { light: '/icon-light-32.png', dark: '/icon-dark-32.png', size: 32 }
      ]"
    />

    <!-- Set include/exclude if the page should be removed from some builds -->
    <meta name="manifest.include" content="['chrome', ...]" />
    <meta name="manifest.exclude" content="['chrome', ...]" />
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```

### Sandbox

[Chrome Docs](https://developer.chrome.com/docs/extensions/mv3/manifest/sandbox/)

:::warning Chromium Only
Firefox does not support sandboxed pages.
:::

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Title</title>

    <!-- Set include/exclude if the page should be removed from some builds -->
    <meta name="manifest.include" content="['chrome', ...]" />
    <meta name="manifest.exclude" content="['chrome', ...]" />
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```

### Side Panel

[Chrome Docs](https://developer.chrome.com/docs/extensions/reference/sidePanel/) • [Firefox Docs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Sidebars)

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Default Side Panel Title</title>

    <!-- Customize the manifest options -->
    <meta
      name="manifest.default_icon"
      content="{
        '16': '/icon-16.png',
        '24': '/icon-24.png',
        ...
      }"
    />
    <meta name="manifest.open_at_install" content="true|false" />
    <meta name="manifest.browser_style" content="true|false" />

    <!-- Set include/exclude if the page should be removed from some builds -->
    <meta name="manifest.include" content="['chrome', ...]" />
    <meta name="manifest.exclude" content="['chrome', ...]" />
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```

In Chrome, side panels use the `side_panel` API, while Firefox uses the `sidebar_action` API.

### Unlisted CSS

```css
body {
  /* ... */
}
```

Follow Vite's guide to setup your preprocessor of choice: <https://vitejs.dev/guide/features.html#css-pre-processors>

CSS entrypoints are always unlisted. To add CSS to a content script, see the [Content Script](/guide/essentials/content-scripts#css) docs.

### Unlisted Pages

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Title</title>

    <!-- Set include/exclude if the page should be removed from some builds -->
    <meta name="manifest.include" content="['chrome', ...]" />
    <meta name="manifest.exclude" content="['chrome', ...]" />
  </head>
  <body>
    <!-- ... -->
  </body>
</html>
```

At runtime, unlisted pages are accessible at `/{name}.html`:

```ts
const url = browser.runtime.getURL('/{name}.html');

console.log(url); // "chrome-extension://{id}/{name}.html"
window.open(url); // Open the page in a new tab
```

### Unlisted Scripts

:::code-group

```ts [Minimal]
export default defineUnlistedScript(() => {
  // Executed when script is loaded
});
```

```ts [With Options]
export default defineUnlistedScript({
  // Set include/exclude if the script should be removed from some builds
  include: undefined | string[],
  exclude: undefined | string[],

  main() {
    // Executed when script is loaded
  },
});
```

:::

At runtime, unlisted scripts are accessible from `/{name}.js`:

```ts
const url = browser.runtime.getURL('/{name}.js');

console.log(url); // "chrome-extension://{id}/{name}.js"
```

You are responsible for loading/running these scripts where needed. If necessary, don't forget to add the script and/or any related assets to [`web_accessible_resources`](https://developer.chrome.com/docs/extensions/reference/manifest/web-accessible-resources).

When defining an unlisted script, keep in mind that WXT will import this file in a NodeJS environment during the build process. That means you cannot place any runtime code outside the `main` function.

```ts
document.querySelectorAll('a').forEach((anchor) => { // [!code --]
  // ... // [!code --]
}); // [!code --]

export default defineUnlistedScript(() => {
  document.querySelectorAll('a').forEach((anchor) => { // [!code ++]
    // ... // [!code ++]
  }); // [!code ++]
});
```

Refer to the [Entrypoint Loaders](/guide/essentials/config/entrypoint-loaders) documentation for more details.

