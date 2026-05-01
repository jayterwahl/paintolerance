# WXT API Map

Use this when you need exact import paths, functions, interfaces, or TypeDoc pages. For signatures/details, read the listed upstream API page.

## Generated docs

- Full API index: `./upstream/api/reference.md`
- Full doc map: `./doc-map.md`
- Upstream docs bundle: `./upstream/llms-full.txt`

Search locally:

```sh
rg "Function: defineConfig|Interface: InlineConfig|Class: ContentScriptContext" ./references/upstream/api/reference
```

## Common import paths

| Need | Import path / source | API docs |
| --- | --- | --- |
| Configure WXT | `import { defineConfig } from 'wxt'` | `./upstream/api/reference/wxt/functions/defineConfig.md` |
| Programmatic build/prepare/zip/server | `wxt` | `./upstream/api/reference/wxt.md` |
| Browser APIs | `import { browser, type Browser } from 'wxt/browser'` | `./upstream/guide/essentials/extension-apis.md` |
| Auto-imported APIs | `#imports` | inspect `.wxt/types/imports-module.d.ts` |
| Background entrypoint | auto-import, `#imports`, or `wxt/utils/define-background` | `./upstream/api/reference/wxt/utils/define-background/functions/defineBackground.md` |
| Content script entrypoint | auto-import, `#imports`, or `wxt/utils/define-content-script` | `./upstream/api/reference/wxt/utils/define-content-script/functions/defineContentScript.md` |
| Unlisted script entrypoint | auto-import, `#imports`, or `wxt/utils/define-unlisted-script` | `./upstream/api/reference/wxt/utils/define-unlisted-script/functions/defineUnlistedScript.md` |
| App config | `wxt/utils/define-app-config`, `wxt/utils/app-config` | `./upstream/api/reference/wxt/utils/define-app-config.md`, `./upstream/api/reference/wxt/utils/app-config.md` |
| Content script context | `wxt/utils/content-script-context` | `./upstream/api/reference/wxt/utils/content-script-context/classes/ContentScriptContext.md` |
| Integrated content UI | `wxt/utils/content-script-ui/integrated` | `./upstream/api/reference/wxt/utils/content-script-ui/integrated/functions/createIntegratedUi.md` |
| Shadow root content UI | `wxt/utils/content-script-ui/shadow-root` | `./upstream/api/reference/wxt/utils/content-script-ui/shadow-root/functions/createShadowRootUi.md` |
| Iframe content UI | `wxt/utils/content-script-ui/iframe` | `./upstream/api/reference/wxt/utils/content-script-ui/iframe/functions/createIframeUi.md` |
| Content UI option types | `wxt/utils/content-script-ui/types` | `./upstream/api/reference/wxt/utils/content-script-ui/types.md` |
| Inject script | `wxt/utils/inject-script` | `./upstream/api/reference/wxt/utils/inject-script/functions/injectScript.md` |
| Storage | auto-import, `#imports`, or `wxt/utils/storage` | `./upstream/api/reference/wxt/utils/storage.md` |
| Match patterns | `wxt/utils/match-patterns` | `./upstream/api/reference/wxt/utils/match-patterns.md` |
| Split shadow root CSS | `wxt/utils/split-shadow-root-css` | `./upstream/api/reference/wxt/utils/split-shadow-root-css/functions/splitShadowRootCss.md` |
| WXT modules | `wxt/modules` | `./upstream/api/reference/wxt/modules.md` |
| Vitest plugin | `wxt/testing/vitest-plugin` | `./upstream/guide/essentials/unit-testing.md` |
| fakeBrowser | `wxt/testing/fake-browser` | `./upstream/api/reference/wxt/testing/fake-browser.md` |

## `wxt` module highlights

Functions:

- `defineConfig()`
- `defineRunnerConfig()`
- `defineWebExtConfig()`
- `build()`
- `createServer()`
- `initialize()`
- `prepare()`
- `clean()`
- `zip()`
- `normalizePath()`

Important interfaces/types:

- `InlineConfig`, `UserConfig`, `ResolvedConfig`
- `WebExtConfig`
- `Wxt`, `WxtHooks`, `WxtModule`, `WxtModuleWithMetadata`
- `BackgroundEntrypointOptions`, `ContentScriptEntrypoint`, `PopupEntrypointOptions`, `SidepanelEntrypointOptions`
- `TargetBrowser`, `TargetManifestVersion`
- `UserManifest`, `UserManifestFn`

## `wxt/modules` helpers

- `defineWxtModule()`
- `addAlias()`
- `addEntrypoint()`
- `addImportPreset()`
- `addPublicAssets()`
- `addViteConfig()`
- `addWxtPlugin()`

Read each helper's TypeDoc page under `./upstream/api/reference/wxt/modules/functions/`.

## Content script UI APIs

Read exact option types before implementing advanced positioning or auto-mount:

- `AutoMount`, `AutoMountOptions`, `StopAutoMount`
- `ContentScriptUi<TMounted>`
- `ContentScriptUiOptions<TMounted>`
- `ContentScriptPositioningOptions`
- `ContentScriptAppendMode`
- `ContentScriptOverlayAlignment`
- `MountFunctions`

These live under `./upstream/api/reference/wxt/utils/content-script-ui/types/`.

## Storage APIs

Read `./upstream/api/reference/wxt/utils/storage/interfaces/WxtStorage.md` for the complete method surface. Important concepts:

- `storage` variable
- `WxtStorageItem<TValue, TMetadata>`
- `StorageArea`, `StorageItemKey`
- `WatchCallback`, `Unwatch`
- `GetItemOptions`, `WxtStorageItemOptions`
- `MigrationError`

## Auto-import caveat

If auto-imports are enabled, many WXT APIs can be used without explicit imports. For code clarity or tests, explicit imports are often better. Always check `.wxt/types/imports-module.d.ts` for the exact generated mapping in the current project.
