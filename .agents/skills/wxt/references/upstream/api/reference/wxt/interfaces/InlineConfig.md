<!--
Source: https://wxt.dev/api/reference/wxt/interfaces/InlineConfig.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > InlineConfig

# Interface: InlineConfig

## Contents

* [Properties](InlineConfig.md#properties)
  * [alias](InlineConfig.md#alias)
  * [analysis](InlineConfig.md#analysis)
  * [browser](InlineConfig.md#browser)
  * [configFile](InlineConfig.md#configfile)
  * [debug](InlineConfig.md#debug)
  * [dev](InlineConfig.md#dev)
  * [entrypointsDir](InlineConfig.md#entrypointsdir)
  * [experimental](InlineConfig.md#experimental)
  * [filterEntrypoints](InlineConfig.md#filterentrypoints)
  * [hooks](InlineConfig.md#hooks)
  * [imports](InlineConfig.md#imports)
  * [logger](InlineConfig.md#logger)
  * [manifest](InlineConfig.md#manifest)
  * [manifestVersion](InlineConfig.md#manifestversion)
  * [mode](InlineConfig.md#mode)
  * [modules](InlineConfig.md#modules)
  * [modulesDir](InlineConfig.md#modulesdir)
  * [outDir](InlineConfig.md#outdir)
  * [outDirTemplate](InlineConfig.md#outdirtemplate)
  * [publicDir](InlineConfig.md#publicdir)
  * [root](InlineConfig.md#root)
  * [runner](InlineConfig.md#runner)
  * [srcDir](InlineConfig.md#srcdir)
  * [suppressWarnings](InlineConfig.md#suppresswarnings)
  * [targetBrowsers](InlineConfig.md#targetbrowsers)
  * [vite](InlineConfig.md#vite)
  * [webExt](InlineConfig.md#webext)
  * [zip](InlineConfig.md#zip)

## Properties

### alias

> **alias**?: `Record`<`string`, `string`>

Add additional paths to the `.wxt/tsconfig.json`. Use this instead of
overwriting the `paths` in the root `tsconfig.json` if you want to add new
paths.

The key is the import alias and the value is either a relative path to the
root directory or an absolute path.

#### Example

```ts
{ "testing": "src/utils/testing.ts" }
```

#### Source

[packages/wxt/src/types.ts:364](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L364)

***

### analysis

> **analysis**?: `object`

#### Type declaration

##### enabled

> **enabled**?: `boolean`

Explicitly include bundle analysis when running `wxt build`. This can be
overridden by the command line `--analyze` option.

###### Default

```ts
false
```

##### keepArtifacts

> **keepArtifacts**?: `boolean`

By default, the `stats-*.json` artifacts generated during bundle analysis
are deleted. Set to `true` to keep them.

One stats file is output per build step.

###### Default

```ts
false
```

##### open

> **open**?: `boolean`

Set to true to automatically open the `stats.html` file when the build is
finished. When building in CI, the browser will never open.

###### Default

```ts
false
```

##### outputFile

> **outputFile**?: `string`

Name of the output HTML file. Relative to the project's root directory.

Changing the filename of the outputFile also effects the names of the
artifacts generated when setting `keepArtifacts` to true:

* "stats.html" => "stats-\*.json"
* "stats/bundle.html" => "bundle-\*.json"
* ".analysis/index.html" => "index-\*.json"

###### Default

```ts
'stats.html'
```

##### template

> **template**?: `TemplateType`

When running `wxt build --analyze` or setting `analysis.enabled` to true,
customize how the bundle will be visualized. See
[`rollup-plugin-visualizer`](https://github.com/btd/rollup-plugin-visualizer#how-to-use-generated-files)
for more details.

###### Default

```ts
'treemap'
```

#### Source

[packages/wxt/src/types.ts:306](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L306)

***

### browser

> **browser**?: `string`

Explicitly set a browser to build for. This will override the default
browser for each command, and can be overridden by the command line
`--browser` option.

#### Default

```ts
"chrome"
```

#### Source

[packages/wxt/src/types.ts:119](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L119)

***

### configFile

> **configFile**?: `string` | `false`

> Only available when using the JS API. Not available in `wxt.config.ts`
> files

Path to `wxt.config.ts` file or `false` to disable config file discovery.

#### Default

```ts
'wxt.config.ts'
```

#### Source

[packages/wxt/src/types.ts:84](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L84)

***

### debug

> **debug**?: `boolean`

Set to `true` to show debug logs. Overridden by the command line `--debug`
option.

#### Default

```ts
false
```

#### Source

[packages/wxt/src/types.ts:91](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L91)

***

### dev

> **dev**?: `object`

Config effecting dev mode only.

#### Type declaration

##### reloadCommand

> **reloadCommand**?: `string` | `false`

Controls whether a custom keyboard shortcut command, `Alt+R`, is added
during dev mode to quickly reload the extension.

If false, the shortcut is not added during development.

If set to a custom string, you can override the key combo used. See
[Chrome's command
docs](https://developer.chrome.com/docs/extensions/reference/api/commands)
for available options.

###### Default

```ts
'Alt+R'
```

##### server

> **server**?: `object`

##### server.host

> **server.host**?: `string`

Host to bind the dev server to.

###### Default

```ts
'localhost'
```

##### server.hostname

> **server.hostname**?: `string`

Hostname to run the dev server on.

###### Deprecated

Use `host` to specify the interface to bind to, or use
`origin` to specify the dev server hostname.

##### server.origin

> **server.origin**?: `string`

Origin to use to connect from the extension ui runtime to the dev
server.

###### Default

```ts
'http://localhost:3000'
```

##### server.port

> **server.port**?: `number`

Port to run the dev server on. Defaults to the first open port from
3000 to 3010.

##### server.strictPort

> **server.strictPort**?: `boolean`

Whether the dev server should fail if the specified port is already in
use. When `false` and a `port` is specified, the next available port
will be used instead of throwing an error.

###### Default

```ts
false
```

#### Source

[packages/wxt/src/types.ts:368](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L368)

***

### entrypointsDir

> **entrypointsDir**?: `string`

#### Default

```ts
'${config.srcDir}/entrypoints'
```

#### Source

[packages/wxt/src/types.ts:38](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L38)

***

### experimental

> **experimental**?: `object`

Experimental settings - use with caution.

#### Source

[packages/wxt/src/types.ts:366](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L366)

***

### filterEntrypoints

> **filterEntrypoints**?: `string`\[]

A list of entrypoint names (`"popup"`, `"options"`, etc.) to build. Will
speed up the build if your extension has lots of entrypoints, and you don't
need to build all of them to develop a feature. If specified, this
completely overrides the `include`/`exclude` option provided
per-entrypoint.

#### Source

[packages/wxt/src/types.ts:48](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L48)

***

### hooks

> **hooks**?: `NestedHooks`<[`WxtHooks`](WxtHooks.md)>

Project hooks for running logic during the build process.

#### Source

[packages/wxt/src/types.ts:420](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L420)

***

### imports

> **imports**?: `false` | [`WxtUnimportOptions`](../type-aliases/WxtUnimportOptions.md)

Customize auto-import options. Set to `false` to disable auto-imports.

For example, to add a directory to auto-import from, you can use:

```ts
export default defineConfig({
  imports: {
    dirs: ['some-directory'],
  },
});
```

#### Source

[packages/wxt/src/types.ts:110](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L110)

***

### logger

> **logger**?: [`Logger`](Logger.md)

Override the logger used.

#### Default

```ts
consola
```

#### Source

[packages/wxt/src/types.ts:140](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L140)

***

### manifest

> **manifest**?: [`UserManifest`](../type-aliases/UserManifest.md) | `Promise`<[`UserManifest`](../type-aliases/UserManifest.md)> | [`UserManifestFn`](../type-aliases/UserManifestFn.md)

Customize the `manifest.json` output. Can be an object, promise, or
function that returns an object or promise.

#### Source

[packages/wxt/src/types.ts:145](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L145)

***

### manifestVersion

> **manifestVersion**?: [`TargetManifestVersion`](../type-aliases/TargetManifestVersion.md)

Explicitly set a manifest version to target. This will override the default
manifest version for each command, and can be overridden by the command
line `--mv2` or `--mv3` option.

#### Source

[packages/wxt/src/types.ts:133](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L133)

***

### mode

> **mode**?: `string`

Explicitly set a mode to run in. This will override the default mode for
each command, and can be overridden by the command line `--mode` option.

#### Source

[packages/wxt/src/types.ts:96](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L96)

***

### modules

> **modules**?: `string`\[]

List of WXT module names to include. Can be the full package name
("wxt-module-analytics"), or just the suffix ("analytics" would resolve to
"wxt-module-analytics").

#### Source

[packages/wxt/src/types.ts:426](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L426)

***

### modulesDir

> **modulesDir**?: `string`

#### Default

```ts
'${config.root}/modules'
```

#### Source

[packages/wxt/src/types.ts:40](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L40)

***

### outDir

> **outDir**?: `string`

Output directory that stored build folders and ZIPs.

#### Default

```ts
'.output'
```

#### Source

[packages/wxt/src/types.ts:54](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L54)

***

### outDirTemplate

> **outDirTemplate**?: `string`

Template string for customizing the output directory structure. Available
variables:

* `{{browser}}`: The target browser (e.g., 'chrome',
  'firefox')
* `{{manifestVersion}}`: The manifest version (e.g., 2 or
  3\)
* `{{mode}}`: The build mode (e.g., 'development',
  'production')
* `{{modeSuffix}}`: A suffix based on the mode ('-dev' for
  development, '' for production)
* `{{command}}`: The WXT command being run (e.g., 'build',
  'serve')

#### Example

```ts
'{{browser}}-mv{{manifestVersion}}';
```

#### Default

`"{{browser}}-mv{{manifestVersion}}{{modeSuffix}}"`

#### Source

[packages/wxt/src/types.ts:75](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L75)

***

### publicDir

> **publicDir**?: `string`

Directory containing files that will be copied to the output directory
as-is.

#### Default

```ts
'${config.root}/public'
```

#### Source

[packages/wxt/src/types.ts:36](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L36)

***

### root

> **root**?: `string`

Your project's root directory containing the `package.json` used to fill
out the `manifest.json`.

#### Default

```ts
process.cwd()
```

#### Source

[packages/wxt/src/types.ts:19](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L19)

***

### runner

> **runner**?: [`WebExtConfig`](WebExtConfig.md)

#### Deprecated

Use `webExt` instead. Same option, just renamed.

#### Source

[packages/wxt/src/types.ts:169](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L169)

***

### srcDir

> **srcDir**?: `string`

Directory containing all source code. Set to `"src"` to move all source
code to a `src/` directory.

After changing, remember to move the `public/` and `entrypoints/`
directories into the new source dir.

#### Default

```ts
config.root
```

#### Source

[packages/wxt/src/types.ts:29](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L29)

***

### suppressWarnings

> **suppressWarnings**?: `object`

Suppress specific warnings during the build process.

#### Example

```ts
export default defineConfig({
    suppressWarnings: {
      firefoxDataCollection: true,
    },
  });
```

#### Type declaration

##### firefoxDataCollection

> **firefoxDataCollection**?: `boolean`

Suppress warnings for:
https://extensionworkshop.com/documentation/develop/firefox-builtin-data-consent

#### Source

[packages/wxt/src/types.ts:156](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L156)

***

### targetBrowsers

> **targetBrowsers**?: `string`\[]

Target browsers to support. When set, `import.meta.env.BROWSER` will be
narrowed to a string literal type containing only the specified browser
names.

#### Default

```ts
[ ]
```

#### Source

[packages/wxt/src/types.ts:127](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L127)

***

### vite

> **vite**?: (`env`) => [`WxtViteConfig`](../type-aliases/WxtViteConfig.md) | `Promise`<[`WxtViteConfig`](../type-aliases/WxtViteConfig.md)>

Return custom Vite options from a function. See
<https://vitejs.dev/config/shared-options.html>.

[`root`](#root), [`configFile`](#configfile), and [`mode`](#mode) should be
set in WXT's config instead of Vite's.

This is a function because any vite plugins added need to be recreated for
each individual build step, in case they have internal state causing them
to fail when reused.

#### Parameters

▪ **env**: [`ConfigEnv`](ConfigEnv.md)

#### Source

[packages/wxt/src/types.ts:442](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L442)

***

### webExt

> **webExt**?: [`WebExtConfig`](WebExtConfig.md)

Configure browser startup. Options set here can be overridden in a
`web-ext.config.ts` file.

#### Source

[packages/wxt/src/types.ts:167](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L167)

***

### zip

> **zip**?: `object`

#### Type declaration

##### artifactTemplate

> **artifactTemplate**?: `string`

Configure the filename output when zipping files.

Available template variables:

* `{{name}}` - The project's name converted to
  kebab-case
* `{{version}}` - The version\_name or version from the
  manifest
* `{{packageVersion}}` - The version from the
  package.json
* `{{browser}}` - The target browser from the
  `--browser` CLI flag
* `{{mode}}` - The current mode
* `{{manifestVersion}}` - Either "2" or "3"

###### Default

```ts
'{{name}}-{{version}}-{{browser}}.zip'
```

##### compressionLevel

> **compressionLevel**?: `0` | `2` | `1` | `3` | `4` | `5` | `6` | `7` | `8` | `9`

Compression level to use when zipping files.

Levels: 0 (no compression) to 9 (maximum compression).

###### Default

```ts
9
```

##### downloadPackages

> **downloadPackages**?: `string`\[]

The Firefox review process requires the extension be buildable from
source to make reviewing easier. This field allows you to use private
packages without exposing your auth tokens.

Just list the name of all the packages you want to download and include
in the sources zip. Usually, these will be private packages behind auth
tokens, but they don't have to be.

All packages listed here will be downloaded to in `.wxt/local_modules/`
and an `overrides` or `resolutions` field (depending on your package
manager) will be added to the `package.json`, pointing to the downloaded
packages.

> ***DO NOT include versions or version filters.*** Just the package name.
> If multiple versions of a package are present in the project, all
> versions will be downloaded and referenced in the package.json
> correctly.

###### Example

```ts
// Correct:
  ['@scope/package-name', 'package-name'];

  // Incorrect, don't include versions!!!
  ['@scope/package-name@1.1.3', 'package-name@^2'];
```

###### Default

```ts
[ ]
```

##### exclude

> **exclude**?: `string`\[]

[Picomatch](https://www.npmjs.com/package/picomatch) patterns of files to
exclude when zipping the extension.

###### Example

```ts
[
    '**/*.map', // Exclude all sourcemaps
  ];
```

##### excludeSources

> **excludeSources**?: `string`\[]

[Picomatch](https://www.npmjs.com/package/picomatch) patterns of files to
exclude when creating a ZIP of all your source code for Firefox. Patterns
are relative to your `config.zip.sourcesRoot`.

Hidden files, node\_modules, and tests are ignored by default.

###### Example

```ts
[
    'coverage', // Ignore the coverage directory in the `sourcesRoot`
  ];
```

##### includeSources

> **includeSources**?: `string`\[]

[Picomatch](https://www.npmjs.com/package/picomatch) patterns of files to
include when creating a ZIP of all your source code for Firefox. Patterns
are relative to your `config.zip.sourcesRoot`.

This setting overrides `excludeSources`. So if a file matches both lists,
it is included in the ZIP.

###### Example

```ts
[
    'coverage', // Include the coverage directory in the `sourcesRoot`
  ];
```

##### name

> **name**?: `string`

Override the artifactTemplate's `{name}` template variable. Defaults to
the `package.json`'s name, or if that doesn't exist, the current working
directories name.

##### sourcesRoot

> **sourcesRoot**?: `string`

Root directory to ZIP when generating the sources ZIP.

###### Default

```ts
config.root
```

##### sourcesTemplate

> **sourcesTemplate**?: `string`

Configure the filename output when zipping files.

Available template variables:

* `{{name}}` - The project's name converted to
  kebab-case
* `{{version}}` - The version\_name or version from the
  manifest
* `{{packageVersion}}` - The version from the
  package.json
* `{{browser}}` - The target browser from the
  `--browser` CLI flag
* `{{mode}}` - The current mode
* `{{manifestVersion}}` - Either "2" or "3"

###### Default

```ts
'{{name}}-{{version}}-sources.zip'
```

##### zipSources

> **zipSources**?: `boolean`

When zipping the extension, also zip sources.

* `undefined`: zip sources if the target browser is "firefox" or "opera"
* `true`: always zip sources
* `false`: never zip sources

###### Default

```ts
undefined
```

#### Source

[packages/wxt/src/types.ts:170](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L170)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

