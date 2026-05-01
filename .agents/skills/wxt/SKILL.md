---
name: wxt
description: Comprehensive WXT web extension framework skill. Use when building, modifying, debugging, testing, configuring, migrating, or publishing browser/web extensions with WXT; covers project structure, entrypoints, manifest generation, content scripts/UI, storage, messaging, modules, CLI, browser targets, frontend frameworks, testing, and publishing.
metadata:
  source: https://wxt.dev/llms-full.txt
  vendored: "2026-04-30"
---

# WXT Skill

WXT is a Vite-powered framework for browser/web extensions. This skill vendors the official WXT documentation and organizes it for progressive disclosure.

## Mandatory Workflow

1. **Identify the task area** from the decision tree below.
2. **Read the matching curated reference file(s)** in `./references/`.
3. **For exact options, signatures, edge cases, or API details, read the vendored upstream page** under `./references/upstream/` (or use `./references/doc-map.md`). Do not rely on memory for exact WXT APIs.
4. **Inspect the user's project** before editing: package manager, scripts, `wxt.config.ts`, `tsconfig.json`, `entrypoints/`, `modules/`, and generated `.wxt/types/imports-module.d.ts` when present.
5. **After config/type/import changes**, run the project's package-manager command for `wxt prepare`, typecheck, tests, or build when available.

## Critical Rules

- **Do not create or edit a source `manifest.json`** for normal WXT projects. WXT generates it from `wxt.config.ts`, entrypoint options, modules, and hooks.
- **Do not edit `.wxt/` or `.output/` by hand.** They are generated.
- **Never use `browser`, `chrome`, DOM, window, or extension APIs at top level in JS/TS entrypoints** (`background`, `content`, unlisted scripts). WXT imports entrypoints in Node at build time. Put runtime code inside `main` / `defineBackground` / `defineContentScript` / `defineUnlistedScript`.
- **Use WXT entrypoint helpers**: `defineBackground`, `defineContentScript`, `defineUnlistedScript`, and HTML `<meta name="manifest.*">` for entrypoint-specific manifest options.
- **Use `browser` from WXT** (`wxt/browser`, auto-import, or `#imports`) and feature-detect APIs that differ across browsers/MV versions.
- **Content script assets/CSS are special**: import CSS in the content script; use `cssInjectionMode: "ui"` for Shadow Root UI; use `browser.runtime.getURL()` and `web_accessible_resources` for extension assets accessed by a page/content script.
- **Routers inside extension pages should use hash mode** (`popup.html#/...`), not path/history routing.

## Quick Commands

```sh
# Create a project
pnpm dlx wxt@latest init      # or bunx/npx wxt@latest init

# Common scripts (prefer the project's package.json scripts)
wxt                         # dev server, default browser target is chrome
wxt -b firefox              # dev targeting Firefox
wxt build                   # production build
wxt build -b firefox --mv3  # browser + manifest target
wxt build --analyze         # bundle analysis
wxt zip                     # build and zip
wxt zip -b firefox --sources
wxt prepare                 # generate .wxt types/config
wxt clean                   # remove generated files/caches
wxt submit init             # set up store submission secrets
wxt submit --dry-run ...    # submit prepared ZIPs to stores
```

## Decision Tree

```
What are you doing?
├─ New/migrated project, scripts, structure, TS aliases
│  └─ Read ./references/getting-started.md
├─ Entrypoint, popup/options/sidepanel/background/content script, manifest options
│  └─ Read ./references/entrypoints.md
├─ Content script UI, CSS isolation, page injection, invalidation
│  └─ Read ./references/content-scripts.md + ./references/entrypoints.md
├─ Manifest, browser targets, Vite, env vars, runtime config, hooks
│  └─ Read ./references/configuration.md
├─ Extension APIs, storage, messaging, assets, i18n, scripting
│  └─ Read ./references/runtime-apis.md
├─ React/Vue/Svelte/Solid, WXT modules, official add-on packages
│  └─ Read ./references/frameworks-modules.md
├─ Unit tests, E2E, updates, zip, submit, stores
│  └─ Read ./references/testing-publishing.md
├─ CLI flags/commands
│  └─ Read ./references/cli.md
├─ Exact imports/functions/types/API reference
│  └─ Read ./references/api.md and ./references/doc-map.md
└─ Debugging odd build/runtime behavior
   └─ Read ./references/troubleshooting.md
```

## Reference Files

| File | Purpose |
| --- | --- |
| `./references/getting-started.md` | Installation, project layout, scripts, TS setup, generated directories. |
| `./references/entrypoints.md` | File-based entrypoints, listed/unlisted entrypoints, manifest options. |
| `./references/content-scripts.md` | Content script context, CSS, UI helpers, Shadow DOM/IFrame/integrated patterns. |
| `./references/configuration.md` | `wxt.config.ts`, manifest generation, env, Vite, hooks, auto-imports, browser startup. |
| `./references/runtime-apis.md` | `browser`, storage, messaging, i18n, scripting, assets, remote code. |
| `./references/frameworks-modules.md` | Framework modules, multiple apps, hash routers, WXT modules, official packages. |
| `./references/testing-publishing.md` | Vitest, Playwright, update tests, zip/submit, store-specific publishing. |
| `./references/cli.md` | Command/flag reference and common package scripts. |
| `./references/api.md` | Import path and API reference map for WXT modules/functions/types. |
| `./references/troubleshooting.md` | Common errors and fixes. |
| `./references/doc-map.md` | Generated map of all vendored upstream documentation pages. |
| `./references/upstream/` | The scraped official WXT docs/API pages from `wxt.dev/llms-full.txt`. |

## Upstream Source Docs

The official documentation bundle was scraped from:

- Index: <https://wxt.dev/llms.txt>
- Full bundle: <https://wxt.dev/llms-full.txt>
- Docs text bundle: <https://wxt.dev/knowledge/docs.txt>
- Site: <https://wxt.dev/>
- Repository: <https://github.com/wxt-dev/wxt>

For exact API pages, use `./references/doc-map.md` or `rg "Function: defineContentScript|Interface: InlineConfig|WxtHooks" ./references/upstream`.
