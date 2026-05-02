<!--
Source: https://wxt.dev/api/reference/wxt/interfaces/ResolvedConfig.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > ResolvedConfig

# Interface: ResolvedConfig

## Contents

* [Properties](ResolvedConfig.md#properties)
  * [alias](ResolvedConfig.md#alias)
  * [analysis](ResolvedConfig.md#analysis)
  * [browser](ResolvedConfig.md#browser)
  * [builtinModules](ResolvedConfig.md#builtinmodules)
  * [command](ResolvedConfig.md#command)
  * [debug](ResolvedConfig.md#debug)
  * [dev](ResolvedConfig.md#dev)
  * [entrypointsDir](ResolvedConfig.md#entrypointsdir)
  * [env](ResolvedConfig.md#env)
  * [experimental](ResolvedConfig.md#experimental)
  * [filterEntrypoints](ResolvedConfig.md#filterentrypoints)
  * [fsCache](ResolvedConfig.md#fscache)
  * [hooks](ResolvedConfig.md#hooks)
  * [imports](ResolvedConfig.md#imports)
  * [logger](ResolvedConfig.md#logger)
  * [manifest](ResolvedConfig.md#manifest)
  * [manifestVersion](ResolvedConfig.md#manifestversion)
  * [mode](ResolvedConfig.md#mode)
  * [modulesDir](ResolvedConfig.md#modulesdir)
  * [outBaseDir](ResolvedConfig.md#outbasedir)
  * [outDir](ResolvedConfig.md#outdir)
  * [plugins](ResolvedConfig.md#plugins)
  * [publicDir](ResolvedConfig.md#publicdir)
  * [root](ResolvedConfig.md#root)
  * [runnerConfig](ResolvedConfig.md#runnerconfig)
  * [srcDir](ResolvedConfig.md#srcdir)
  * [suppressWarnings](ResolvedConfig.md#suppresswarnings)
  * [targetBrowsers](ResolvedConfig.md#targetbrowsers)
  * [typesDir](ResolvedConfig.md#typesdir)
  * [userConfigMetadata](ResolvedConfig.md#userconfigmetadata)
  * [userModules](ResolvedConfig.md#usermodules)
  * [vite](ResolvedConfig.md#vite)
  * [wxtDir](ResolvedConfig.md#wxtdir)
  * [wxtModuleDir](ResolvedConfig.md#wxtmoduledir)
  * [zip](ResolvedConfig.md#zip)

## Properties

### alias

> **alias**: `Record`<`string`, `string`>

Import aliases to absolute paths.

#### Source

[packages/wxt/src/types.ts:1514](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1514)

***

### analysis

> **analysis**: `object`

#### Type declaration

##### enabled

> **enabled**: `boolean`

##### keepArtifacts

> **keepArtifacts**: `boolean`

##### open

> **open**: `boolean`

##### outputDir

> **outputDir**: `string`

The directory where the final `stats.html` file is located

##### outputFile

> **outputFile**: `string`

Absolute file path to the `stats.html` file

##### outputName

> **outputName**: `string`

Name of the `stats.html` file, minus ".html"

##### template

> **template**: `NonNullable`<`undefined` | `TemplateType`>

#### Source

[packages/wxt/src/types.ts:1500](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1500)

***

### browser

> **browser**: `string`

#### Source

[packages/wxt/src/types.ts:1477](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1477)

***

### builtinModules

> **builtinModules**: [`WxtModule`](WxtModule.md)<`any`>\[]

#### Source

[packages/wxt/src/types.ts:1548](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1548)

***

### command

> **command**: [`WxtCommand`](../type-aliases/WxtCommand.md)

#### Source

[packages/wxt/src/types.ts:1476](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1476)

***

### debug

> **debug**: `boolean`

#### Source

[packages/wxt/src/types.ts:1469](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1469)

***

### dev

> **dev**: `object`

#### Type declaration

##### reloadCommand

> **reloadCommand**: `string` | `false`

##### server

> **server**?: `object`

Only defined during dev command

##### server.host

> **server.host**: `string`

##### server.origin

> **server.origin**: `string`

##### server.port

> **server.port**: `number`

##### server.strictPort

> **server.strictPort**: `boolean`

##### server.watchDebounce

> **server.watchDebounce**: `number`

The milliseconds to debounce when a file is saved before reloading. The
only way to set this option is to set the `WXT_WATCH_DEBOUNCE`
environment variable, either globally (like in `.bashrc` file) or
per-project (in `.env` file).

For example:

```
# ~/.zshrc
export WXT_WATCH_DEBOUNCE=1000
```

Or

```
# .env
WXT_WATCH_DEBOUNCE=1000
```

###### Default

```ts
800
```

#### Source

[packages/wxt/src/types.ts:1518](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1518)

***

### entrypointsDir

> **entrypointsDir**: `string`

#### Source

[packages/wxt/src/types.ts:1452](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1452)

***

### env

> **env**: [`ConfigEnv`](ConfigEnv.md)

#### Source

[packages/wxt/src/types.ts:1480](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1480)

***

### experimental

> **experimental**: `object`

#### Source

[packages/wxt/src/types.ts:1515](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1515)

***

### filterEntrypoints

> **filterEntrypoints**?: `Set`<`string`>

#### Source

[packages/wxt/src/types.ts:1454](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1454)

***

### fsCache

> **fsCache**: [`FsCache`](FsCache.md)

#### Source

[packages/wxt/src/types.ts:1484](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1484)

***

### hooks

> **hooks**: `NestedHooks`<[`WxtHooks`](WxtHooks.md)>

#### Source

[packages/wxt/src/types.ts:1547](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1547)

***

### imports

> **imports**: [`WxtResolvedUnimportOptions`](../type-aliases/WxtResolvedUnimportOptions.md)

#### Source

[packages/wxt/src/types.ts:1482](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1482)

***

### logger

> **logger**: [`Logger`](Logger.md)

#### Source

[packages/wxt/src/types.ts:1481](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1481)

***

### manifest

> **manifest**: [`UserManifest`](../type-aliases/UserManifest.md)

#### Source

[packages/wxt/src/types.ts:1483](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1483)

***

### manifestVersion

> **manifestVersion**: [`TargetManifestVersion`](../type-aliases/TargetManifestVersion.md)

#### Source

[packages/wxt/src/types.ts:1479](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1479)

***

### mode

> **mode**: `string`

#### Source

[packages/wxt/src/types.ts:1475](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1475)

***

### modulesDir

> **modulesDir**: `string`

#### Source

[packages/wxt/src/types.ts:1453](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1453)

***

### outBaseDir

> **outBaseDir**: `string`

Absolute path to the `.output` directory

#### Example

```ts
'/path/to/project/.output';
```

#### Source

[packages/wxt/src/types.ts:1461](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1461)

***

### outDir

> **outDir**: `string`

Absolute path to the target output directory.

#### Example

```ts
'/path/to/project/.output/chrome-mv3';
```

#### Source

[packages/wxt/src/types.ts:1468](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1468)

***

### plugins

> **plugins**: `string`\[]

An array of string to import plugins from. These paths should be resolvable
by vite, and they should `export default defineWxtPlugin(...)`.

#### Example

```ts
['@wxt-dev/module-vue/plugin', 'wxt-module-google-analytics/plugin'];
```

#### Source

[packages/wxt/src/types.ts:1557](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1557)

***

### publicDir

> **publicDir**: `string`

#### Source

[packages/wxt/src/types.ts:1443](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1443)

***

### root

> **root**: `string`

#### Source

[packages/wxt/src/types.ts:1441](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1441)

***

### runnerConfig

> **runnerConfig**: `ResolvedConfig`<[`WebExtConfig`](WebExtConfig.md), `ConfigLayerMeta`>

#### Source

[packages/wxt/src/types.ts:1485](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1485)

***

### srcDir

> **srcDir**: `string`

#### Source

[packages/wxt/src/types.ts:1442](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1442)

***

### suppressWarnings

> **suppressWarnings**: `object`

List of warning identifiers to suppress during the build process.

#### Type declaration

##### firefoxDataCollection

> **firefoxDataCollection**?: `boolean`

#### Source

[packages/wxt/src/types.ts:1517](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1517)

***

### targetBrowsers

> **targetBrowsers**: `string`\[]

#### Source

[packages/wxt/src/types.ts:1478](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1478)

***

### typesDir

> **typesDir**: `string`

#### Source

[packages/wxt/src/types.ts:1451](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1451)

***

### userConfigMetadata

> **userConfigMetadata**: `Omit`<`ResolvedConfig`<[`UserConfig`](../type-aliases/UserConfig.md), `ConfigLayerMeta`>, `"config"`>

#### Source

[packages/wxt/src/types.ts:1512](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1512)

***

### userModules

> **userModules**: [`WxtModuleWithMetadata`](WxtModuleWithMetadata.md)<`any`>\[]

#### Source

[packages/wxt/src/types.ts:1549](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1549)

***

### vite

> **vite**: (`env`) => [`WxtViteConfig`](../type-aliases/WxtViteConfig.md) | `Promise`<[`WxtViteConfig`](../type-aliases/WxtViteConfig.md)>

#### Parameters

▪ **env**: [`ConfigEnv`](ConfigEnv.md)

#### Source

[packages/wxt/src/types.ts:447](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L447)

***

### wxtDir

> **wxtDir**: `string`

Absolute path pointing to `.wxt` directory in project root.

#### Example

```ts
'/path/to/project/.wxt';
```

#### Source

[packages/wxt/src/types.ts:1450](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1450)

***

### wxtModuleDir

> **wxtModuleDir**: `string`

Absolute path pointing to the `node_modules/wxt` directory, wherever WXT is
installed.

#### Source

[packages/wxt/src/types.ts:1474](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1474)

***

### zip

> **zip**: `object`

#### Type declaration

##### artifactTemplate

> **artifactTemplate**: `string`

##### compressionLevel

> **compressionLevel**: `0` | `1` | `2` | `3` | `4` | `5` | `6` | `7` | `8` | `9`

##### downloadPackages

> **downloadPackages**: `string`\[]

##### downloadedPackagesDir

> **downloadedPackagesDir**: `string`

##### exclude

> **exclude**: `string`\[]

##### excludeSources

> **excludeSources**: `string`\[]

##### includeSources

> **includeSources**: `string`\[]

##### name

> **name**?: `string`

##### sourcesRoot

> **sourcesRoot**: `string`

##### sourcesTemplate

> **sourcesTemplate**: `string`

##### zipSources

> **zipSources**: `boolean`

If true, when zipping the extension, also zip the sources.

#### Source

[packages/wxt/src/types.ts:1486](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1486)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

