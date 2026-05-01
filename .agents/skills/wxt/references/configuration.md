# WXT Configuration

Read this for `wxt.config.ts`, manifest generation, browser startup, env vars, runtime config, Vite integration, auto-imports, hooks, TypeScript, and build modes.

## Upstream pages to read

- `./upstream/guide/essentials/config/manifest.md`
- `./upstream/guide/essentials/config/browser-startup.md`
- `./upstream/guide/essentials/config/auto-imports.md`
- `./upstream/guide/essentials/config/environment-variables.md`
- `./upstream/guide/essentials/config/runtime.md`
- `./upstream/guide/essentials/config/vite.md`
- `./upstream/guide/essentials/config/build-mode.md`
- `./upstream/guide/essentials/config/typescript.md`
- `./upstream/guide/essentials/config/hooks.md`
- `./upstream/guide/essentials/config/entrypoint-loaders.md`
- API: `./upstream/api/reference/wxt/functions/defineConfig.md`
- API: `./upstream/api/reference/wxt/interfaces/InlineConfig.md`
- API: `./upstream/api/reference/wxt/interfaces/WxtHooks.md`
- API: `./upstream/api/reference/wxt/interfaces/WebExtConfig.md`

## Main config

```ts
// wxt.config.ts
import { defineConfig } from 'wxt';

export default defineConfig({
  srcDir: 'src',
  modules: [],
  manifest: {},
  vite: () => ({}),
});
```

Use `defineConfig` so TypeScript sees WXT config types and module augmentations.

## Manifest generation

WXT generates `manifest.json` from:

1. `manifest` in `wxt.config.ts`.
2. Entrypoint-specific options in JS/TS entrypoints or HTML meta tags.
3. WXT modules.
4. Hooks.

Build output: `.output/{target}/manifest.json`.

### Global manifest object

```ts
export default defineConfig({
  manifest: {
    permissions: ['storage'],
    host_permissions: ['https://example.com/*'],
  },
});
```

### Manifest function

Use function syntax for target-dependent config or env vars:

```ts
export default defineConfig({
  manifest: ({ browser, manifestVersion, mode, command }) => ({
    permissions: browser === 'firefox' ? ['storage'] : ['storage', 'sidePanel'],
    oauth2: {
      client_id: import.meta.env.WXT_CLIENT_ID,
    },
  }),
});
```

WXT cannot load `.env` before the config module is loaded, so env vars inside manifest must use function syntax.

### MV2/MV3 compatibility

Define manifest properties in MV3 format when possible. WXT converts compatible fields to MV2 when targeting MV2 (`action` → `browser_action`, `web_accessible_resources` object array → string array, etc.). Version-specific fields are stripped from other targets when appropriate.

## Permissions and host permissions

Most permissions are manual. WXT adds only a few automatically (for example development hot reload permissions and sidepanel permission when a sidepanel entrypoint exists).

```ts
export default defineConfig({
  manifest: ({ browser, manifestVersion }) => ({
    permissions: browser === 'chrome'
      ? ['storage', 'declarativeNetRequest']
      : ['storage', 'webRequest'],
    host_permissions: manifestVersion === 3 ? ['https://example.com/*'] : [],
  }),
});
```

You are responsible for browser-specific permission support.

## Icons

WXT auto-discovers icons in `public/` with conventional names such as `icon-16.png`, `icon-48.png`, `icon-128.png`. You can manually set `manifest.icons`, or use `@wxt-dev/auto-icons` to generate sizes from a base icon.

Firefox `theme_icons` are auto-discovered for paired `icon-light-{size}.png` / `icon-dark-{size}.png` files when targeting Firefox.

## Browser startup config

During dev, WXT uses `web-ext` to open a browser. Configure startup in:

1. `<rootDir>/web-ext.config.ts` (ignored/local per developer).
2. `webExt` inside `wxt.config.ts` (versioned/shared).
3. `$HOME/web-ext.config.ts` (user defaults).

```ts
import { defineWebExtConfig } from 'wxt';

export default defineWebExtConfig({
  binaries: {
    chrome: '/path/to/chrome-beta',
    firefox: 'firefoxdeveloperedition',
  },
  chromiumArgs: ['--user-data-dir=./.wxt/chrome-data'],
});
```

Disable auto-open with `disabled: true` if loading manually.

## Environment variables

Supported dotenv files include `.env`, `.env.local`, `.env.[mode]`, `.env.[browser]`, `.env.[mode].[browser]`, and `.local` variants.

Runtime env vars must be prefixed with `WXT_` or `VITE_`:

```sh
WXT_API_KEY=...
```

```ts
fetch(`/api?key=${import.meta.env.WXT_API_KEY}`);
```

Built-ins include:

| Env | Meaning |
| --- | --- |
| `import.meta.env.MANIFEST_VERSION` | `2` or `3` |
| `import.meta.env.BROWSER` | target browser string |
| `import.meta.env.CHROME/FIREFOX/SAFARI/EDGE/OPERA` | browser booleans |
| `import.meta.env.MODE` | Vite/WXT mode |
| `import.meta.env.PROD` / `DEV` | production/dev booleans |

## Runtime config (`app.config.ts`)

Use for non-secret runtime configuration:

```ts
import { defineAppConfig } from '#imports';

declare module 'wxt/utils/define-app-config' {
  export interface WxtAppConfig {
    theme?: 'light' | 'dark';
    apiKey?: string;
  }
}

export default defineAppConfig({
  theme: 'dark',
  apiKey: import.meta.env.WXT_API_KEY,
});
```

Read with:

```ts
import { getAppConfig } from '#imports';
const config = getAppConfig();
```

Do not store secrets in committed `app.config.ts`; use env vars.

## Vite config

```ts
export default defineConfig({
  vite: (configEnv) => ({
    plugins: [
      // Vite plugins
    ],
  }),
});
```

Avoid changing Vite build output unless necessary; WXT defaults produce valid extension bundles. Some Vite plugins require mode-aware configuration because WXT uses dev servers and builds differently than plain Vite.

## Auto-imports

WXT uses `unimport`. By default, WXT auto-imports its APIs and exports from:

- `<srcDir>/components/*`
- `<srcDir>/composables/*`
- `<srcDir>/hooks/*`
- `<srcDir>/utils/*`

Run `wxt prepare` and inspect `.wxt/types/imports-module.d.ts` for the full generated list.

Disable auto-imports:

```ts
export default defineConfig({
  imports: false,
});
```

Explicit import via `#imports` remains useful:

```ts
import { createShadowRootUi, MatchPattern } from '#imports';
```

For ESLint globals, configure `imports.eslintrc.enabled` for ESLint 8 or 9 and import/extend the generated config.

## Hooks

Add hooks in `wxt.config.ts` or local/NPM modules:

```ts
export default defineConfig({
  hooks: {
    'build:manifestGenerated': (wxt, manifest) => {
      if (wxt.config.mode === 'development') manifest.name += ' (DEV)';
    },
  },
});
```

Hook order:

1. NPM modules in `modules` order.
2. User modules in `modules/`, alphabetically.
3. Hooks in `wxt.config.ts`.

Use `wxt prepare --debug` to inspect hook execution order.

## Build modes

```sh
wxt --mode production
wxt build --mode staging
wxt zip --mode testing
```

Defaults: `development` for `wxt` dev command; `production` for build/zip.

## Entrypoint loaders

WXT imports JS/TS entrypoints in Node during build. It polyfills some DOM APIs with `linkedom`, fakes `browser`/`chrome` with `@webext-core/fake-browser`, and strips/tree-shakes `main`, but this is not perfect. Keep runtime-only code inside entrypoint `main` functions.
