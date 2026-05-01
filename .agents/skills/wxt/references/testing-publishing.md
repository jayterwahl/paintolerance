# WXT Testing, Updates, and Publishing

Read this for unit tests, E2E, update testing, browser targets, zips, store submission, and CI release workflows.

## Upstream pages to read

- `./upstream/guide/essentials/unit-testing.md`
- `./upstream/guide/essentials/e2e-testing.md`
- `./upstream/guide/essentials/testing-updates.md`
- `./upstream/guide/essentials/publishing.md`
- `./upstream/guide/essentials/target-different-browsers.md`
- `./upstream/runner.md`
- API: `./upstream/api/reference/wxt/testing.md`
- API: `./upstream/api/reference/wxt/testing/fake-browser.md`
- API: `./upstream/api/reference/wxt/testing/vitest.md`

## Unit testing with Vitest

WXT provides a Vitest plugin:

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import { WxtVitest } from 'wxt/testing/vitest-plugin';

export default defineConfig({
  plugins: [WxtVitest()],
});
```

The plugin:

- Polyfills `browser` with in-memory `@webext-core/fake-browser`.
- Adds Vite config/plugins from `wxt.config.ts`.
- Configures auto-imports.
- Applies internal WXT Vite plugins (remote code bundling, etc.).
- Sets WXT env vars (`import.meta.env.BROWSER`, `MANIFEST_VERSION`, etc.).
- Configures aliases (`@`, `~`, etc.).

## fakeBrowser

```ts
import { fakeBrowser } from 'wxt/testing/fake-browser';

beforeEach(() => {
  fakeBrowser.reset();
});
```

`fakeBrowser` implements storage in memory, so storage tests often do not need manual mocks.

## Mocking WXT APIs

`#imports` is transformed to real import paths during preprocessing. Mock the real path, not `#imports`:

```ts
vi.mock('wxt/utils/inject-script', () => ({
  injectScript: vi.fn(),
}));
```

Use `.wxt/types/imports-module.d.ts` to find the real path. Run `wxt prepare` if missing.

## Other testing frameworks

Possible but more setup: disable/replicate auto-imports, aliases, extension API mocks, env vars, and WXT Vite plugins. Prefer Vitest when possible.

## E2E with Playwright

Playwright is the recommended option for Chrome extension E2E tests. Build first, then pass the output directory to Playwright's Chrome extension setup:

```text
/path/to/project/.output/chrome-mv3
```

See upstream docs and WXT examples for a complete setup.

## Target browsers and manifest versions

```sh
wxt             # default chrome
wxt -b firefox
wxt build -b edge
wxt build -b safari --mv2
wxt build --mv3
```

Defaults: MV2 for Safari and Firefox, MV3 for most other browsers. At runtime use:

```ts
if (import.meta.env.FIREFOX) {}
if (import.meta.env.MANIFEST_VERSION === 2) {}
```

Filter entrypoints with `include`/`exclude`, HTML manifest meta tags, `filterEntrypoints`, or `--filter-entrypoint`.

## Testing updates

Permission/host permission changes can disable extensions until users accept new permissions. Test with:

- Chromium: Google's Extension Update Testing tool.
- Firefox: Mozilla's Test Permission Requests docs.

For update logic:

```ts
browser.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'update') {
    // migration/update behavior
  }
});
```

Unit test simple logic; use update testing tools for manual integration checks.

## Zip outputs

```sh
wxt zip
wxt zip -b firefox
wxt zip -b edge
wxt zip -b firefox --sources
```

Chrome Web Store uses the Chrome zip. Edge can often reuse the Chrome zip unless Edge-specific features require a separate build.

## Store submission automation

WXT wraps `publish-browser-extension`:

```sh
wxt submit init
wxt submit --dry-run \
  --chrome-zip .output/{extension}-{version}-chrome.zip \
  --firefox-zip .output/{extension}-{version}-firefox.zip \
  --firefox-sources-zip .output/{extension}-{version}-sources.zip \
  --edge-zip .output/{extension}-{version}-chrome.zip
```

Then remove `--dry-run` for a real release. In CI, provide all secrets as environment variables.

## Firefox source ZIP

Firefox requires source code ZIPs so reviewers can rebuild the extension.

- `wxt zip -b firefox` creates both extension and source zips.
- Manually inspect source zip contents.
- Include `README.md` or `SOURCE_CODE_REVIEW.md` with rebuild commands.
- Test rebuilding from extracted sources and compare output.
- `.env` files can affect chunk hashes; either delete before zipping or include non-secret env files in sources via config.
- Private packages can be included with `zip.downloadPackages`, but require `.npmrc` setup because WXT uses `npm pack`.

## Safari

Automated Safari publishing is not supported. Build with WXT then use Apple's converter:

```sh
pnpm wxt build -b safari
xcrun safari-web-extension-converter .output/safari-mv2
```
