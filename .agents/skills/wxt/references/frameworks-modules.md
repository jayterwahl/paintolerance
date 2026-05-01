# WXT Frameworks, Modules, and Official Packages

Read this for React/Vue/Svelte/Solid setup, multi-entrypoint UI architecture, routing, local/NPM WXT modules, and official WXT add-on packages.

## Upstream pages to read

- `./upstream/guide/essentials/frontend-frameworks.md`
- `./upstream/guide/essentials/wxt-modules.md`
- `./upstream/guide/essentials/config/hooks.md`
- `./upstream/guide/essentials/config/vite.md`
- `./upstream/auto-icons.md`
- `./upstream/i18n.md`
- `./upstream/analytics.md`
- `./upstream/unocss.md`
- `./upstream/runner.md`
- `./upstream/is-background.md`
- API: `./upstream/api/reference/wxt/modules.md`
- API: `./upstream/api/reference/wxt/modules/functions/defineWxtModule.md`
- API: `./upstream/api/reference/wxt/interfaces/WxtModule.md`

## Frontend framework modules

WXT has official modules:

```ts
// React
export default defineConfig({ modules: ['@wxt-dev/module-react'] });

// Vue
export default defineConfig({ modules: ['@wxt-dev/module-vue'] });

// Svelte
export default defineConfig({ modules: ['@wxt-dev/module-svelte'] });

// Solid
export default defineConfig({ modules: ['@wxt-dev/module-solid'] });
```

Install the matching NPM package first. These modules mainly simplify Vite config and auto-imports. Any framework with a Vite plugin can be configured manually:

```ts
import react from '@vitejs/plugin-react';

export default defineConfig({
  vite: () => ({ plugins: [react()] }),
});
```

## Multiple apps per extension

Browser extensions usually have multiple isolated UIs: popup, options, side panel, content UI, changelog/welcome page. Create one app instance per entrypoint. Prefer directory entrypoints:

```text
src/
  assets/tailwind.css
  components/Button.tsx
  entrypoints/options/
    index.html
    App.tsx
    main.tsx
    style.css
    router.ts
```

## Routers

Extension pages are static files (`chrome-extension://id/popup.html`). Configure routers in hash mode (`popup.html#/settings`) rather than history/path mode.

## Using published WXT modules

```sh
pnpm add -D some-wxt-module
```

```ts
export default defineConfig({
  modules: ['some-wxt-module'],
});
```

Some modules expose build-time options in `wxt.config.ts` and runtime options in `app.config.ts`; read module docs and type hints.

## Local WXT modules

Files in `modules/` are auto-discovered and loaded alphabetically:

```ts
// modules/my-module.ts
import { defineWxtModule } from 'wxt/modules';

export default defineWxtModule({
  setup(wxt) {
    wxt.hook('build:manifestGenerated', (wxt, manifest) => {
      manifest.name += ' (modified)';
    });
  },
});
```

Use local modules when build logic grows beyond one-off config hooks.

## Module recipes

### Update resolved config

```ts
export default defineWxtModule({
  setup(wxt) {
    wxt.hook('config:resolved', () => {
      wxt.config.outDir = 'dist';
    });
  },
});
```

### Add build-time options

```ts
import { defineWxtModule } from 'wxt/modules';
import 'wxt';

export interface MyModuleOptions {
  enabled?: boolean;
}

declare module 'wxt' {
  export interface InlineConfig {
    myModule?: MyModuleOptions;
  }
}

export default defineWxtModule<MyModuleOptions>({
  configKey: 'myModule',
  setup(wxt, options) {},
});
```

### Add runtime config

```ts
import 'wxt/utils/define-app-config';

declare module 'wxt/utils/define-app-config' {
  export interface WxtAppConfig {
    myModule?: { enabled: boolean };
  }
}
```

Runtime options are read with `getAppConfig()`.

### Add custom entrypoint options

Augment entrypoint option types and read them in `entrypoints:resolved`:

```ts
import 'wxt';

declare module 'wxt' {
  export interface BackgroundEntrypointOptions {
    myCustomOption?: string;
  }
}
```

HTML entrypoints can pass custom WXT module options via `<meta name="wxt.myHtmlOption" content="...">`.

### Generate files/public assets

Use `build:publicAssets` to copy or generate files and `build:manifestGenerated` to add web-accessible resources when needed.

### Generate runtime modules/types

Use helpers from `wxt/modules`:

- `addAlias`
- `addEntrypoint`
- `addImportPreset`
- `addPublicAssets`
- `addViteConfig`
- `addWxtPlugin`
- `defineWxtModule`

For generated type files in `.wxt`, hook `prepare:types` and set `tsReference: true` when the declaration must be part of the TS project.

## Logging in modules

Use `wxt.logger` for visible info/warn/error messages. Use `obug` for debug logs (`DEBUG=my-module wxt dev`).

## Official packages

### `@wxt-dev/auto-icons`

Generates icon sizes from `<srcDir>/assets/icon.png`, supports SVG, dev greyscale/overlay.

```ts
export default defineConfig({
  modules: ['@wxt-dev/auto-icons'],
  autoIcons: {},
});
```

### `@wxt-dev/i18n`

Type-safe wrapper around browser i18n. Use module `@wxt-dev/i18n/module`, configure `manifest.default_locale`, place messages in `<srcDir>/locales`, and use `i18n.t(...)` from `#i18n`.

### `@wxt-dev/unocss`

```ts
export default defineConfig({
  modules: ['@wxt-dev/unocss'],
  unocss: {
    excludeEntrypoints: ['background'],
  },
});
```

Import `virtual:uno.css` in entrypoints. Dev may warn `uno.css` not found; docs say this can be ignored and styles apply during build.

### `@wxt-dev/analytics`

Module: `@wxt-dev/analytics/module`. Configure providers in `app.config.ts`, then import `analytics` from `#analytics` and call `track`, `page`, `identify`, `autoTrack`. Supports GA4 Measurement Protocol, Umami, and custom providers. Analytics is disabled by default unless configured.

### `@wxt-dev/runner`

Programmatically open browsers and install local extension directories. Intended to replace `web-ext` later. Requires Node >= 22.4 or Bun >= 1.2. Debug with `DEBUG=@wxt-dev/runner`.

### `@wxt-dev/is-background`

Tiny package exporting `isBackground()` to detect background context.
