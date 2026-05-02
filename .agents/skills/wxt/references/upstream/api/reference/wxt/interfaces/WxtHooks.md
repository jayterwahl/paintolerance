<!--
Source: https://wxt.dev/api/reference/wxt/interfaces/WxtHooks.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > WxtHooks

# Interface: WxtHooks

## Contents

* [Properties](WxtHooks.md#properties)
  * [build:before](WxtHooks.md#buildbefore)
  * [build:done](WxtHooks.md#builddone)
  * [build:manifestGenerated](WxtHooks.md#buildmanifestgenerated)
  * [build:publicAssets](WxtHooks.md#buildpublicassets)
  * [config:resolved](WxtHooks.md#configresolved)
  * [entrypoints:found](WxtHooks.md#entrypointsfound)
  * [entrypoints:grouped](WxtHooks.md#entrypointsgrouped)
  * [entrypoints:resolved](WxtHooks.md#entrypointsresolved)
  * [prepare:publicPaths](WxtHooks.md#preparepublicpaths)
  * [prepare:types](WxtHooks.md#preparetypes)
  * [ready](WxtHooks.md#ready)
  * [server:closed](WxtHooks.md#serverclosed)
  * [server:created](WxtHooks.md#servercreated)
  * [server:started](WxtHooks.md#serverstarted)
  * [vite:build:extendConfig](WxtHooks.md#vitebuildextendconfig)
  * [vite:devServer:extendConfig](WxtHooks.md#vitedevserverextendconfig)
  * [zip:done](WxtHooks.md#zipdone)
  * [zip:extension:done](WxtHooks.md#zipextensiondone)
  * [zip:extension:start](WxtHooks.md#zipextensionstart)
  * [zip:sources:done](WxtHooks.md#zipsourcesdone)
  * [zip:sources:start](WxtHooks.md#zipsourcesstart)
  * [zip:start](WxtHooks.md#zipstart)

## Properties

### build:before

> **build:before**: (`wxt`) => [`HookResult`](../type-aliases/HookResult.md)

Called before the build is started in both dev mode and build mode.

#### Parameters

▪ **wxt**: [`Wxt`](Wxt.md)

The configured WXT object

#### Source

[packages/wxt/src/types.ts:1304](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1304)

***

### build:done

> **build:done**: (`wxt`, `output`) => [`HookResult`](../type-aliases/HookResult.md)

Called once the build process has finished. You can add files to the build
summary here by pushing to `output.publicAssets`.

#### Parameters

▪ **wxt**: [`Wxt`](Wxt.md)

The configured WXT object

▪ **output**: `Readonly`<[`BuildOutput`](BuildOutput.md)>

The results of the build

#### Source

[packages/wxt/src/types.ts:1312](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1312)

***

### build:manifestGenerated

> **build:manifestGenerated**: (`wxt`, `manifest`) => [`HookResult`](../type-aliases/HookResult.md)

Called once the manifest has been generated. Used to transform the manifest
by reference before it is written to the output directory.

#### Parameters

▪ **wxt**: [`Wxt`](Wxt.md)

The configured WXT object

▪ **manifest**: `Manifest`

The manifest that was generated

#### Source

[packages/wxt/src/types.ts:1320](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1320)

***

### build:publicAssets

> **build:publicAssets**: (`wxt`, `files`) => [`HookResult`](../type-aliases/HookResult.md)

Called when public assets are found. You can modify the `files` list by
reference to add or remove public files.

#### Parameters

▪ **wxt**: [`Wxt`](Wxt.md)

The configured WXT object

▪ **files**: [`ResolvedPublicFile`](../type-aliases/ResolvedPublicFile.md)\[]

#### Source

[packages/wxt/src/types.ts:1356](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1356)

***

### config:resolved

> **config:resolved**: (`wxt`) => [`HookResult`](../type-aliases/HookResult.md)

Called whenever config is loaded or reloaded. Use this hook to modify
config by modifying `wxt.config`.

#### Parameters

▪ **wxt**: [`Wxt`](Wxt.md)

The configured WXT object

#### Source

[packages/wxt/src/types.ts:1257](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1257)

***

### entrypoints:found

> **entrypoints:found**: (`wxt`, `infos`) => [`HookResult`](../type-aliases/HookResult.md)

Called once the names and paths of all entrypoints have been resolved.

#### Parameters

▪ **wxt**: [`Wxt`](Wxt.md)

The configured WXT object

▪ **infos**: [`EntrypointInfo`](EntrypointInfo.md)\[]

List of entrypoints found in the project's `entrypoints`
directory

#### Source

[packages/wxt/src/types.ts:1331](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1331)

***

### entrypoints:grouped

> **entrypoints:grouped**: (`wxt`, `groups`) => [`HookResult`](../type-aliases/HookResult.md)

Called once all entrypoints have been grouped into their build groups.

#### Parameters

▪ **wxt**: [`Wxt`](Wxt.md)

The configured WXT object

▪ **groups**: [`EntrypointGroup`](../type-aliases/EntrypointGroup.md)\[]

#### Source

[packages/wxt/src/types.ts:1347](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1347)

***

### entrypoints:resolved

> **entrypoints:resolved**: (`wxt`, `entrypoints`) => [`HookResult`](../type-aliases/HookResult.md)

Called once all entrypoints have been loaded from the `entrypointsDir`. Use
`wxt.builder.importEntrypoint` to load entrypoint options from the file, or
manually define them.

#### Parameters

▪ **wxt**: [`Wxt`](Wxt.md)

The configured WXT object

▪ **entrypoints**: [`Entrypoint`](../type-aliases/Entrypoint.md)\[]

The list of entrypoints to be built

#### Source

[packages/wxt/src/types.ts:1340](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1340)

***

### prepare:publicPaths

> **prepare:publicPaths**: (`wxt`, `paths`) => [`HookResult`](../type-aliases/HookResult.md)

Called before generating the list of public paths inside
`.wxt/types/paths.d.ts`. Use this hook to add additional paths (relative to
output directory) WXT doesn't add automatically.

#### Example

```ts
wxt.hooks.hook('prepare:publicPaths', (wxt, paths) => {
    paths.push('icons/128.png');
    paths.push({
      type: 'templateLiteral',
      path: '_favicon/?${string}',
    });
  });
```

#### Parameters

▪ **wxt**: [`Wxt`](Wxt.md)

The configured WXT object

▪ **paths**: [`PublicPathEntry`](../type-aliases/PublicPathEntry.md)\[]

This list of paths TypeScript allows `browser.runtime.getURL`
to be called with.

#### Source

[packages/wxt/src/types.ts:1298](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1298)

***

### prepare:types

> **prepare:types**: (`wxt`, `entries`) => [`HookResult`](../type-aliases/HookResult.md)

Called before WXT writes .wxt/tsconfig.json and .wxt/wxt.d.ts, allowing
addition of custom references and declarations in wxt.d.ts, or directly
modifying the options in `tsconfig.json`.

#### Example

```ts
wxt.hooks.hook('prepare:types', (wxt, entries) => {
    // Add a file, ".wxt/types/example.d.ts", that defines a global
    // variable called "example" in the TS project.
    entries.push({
      path: 'types/example.d.ts',
      text: 'declare const a: string;',
      tsReference: true,
    });
    // use module to add Triple-Slash Directive in .wxt/wxt.d.ts
    // eg: /// <reference types="@types/example" />
    entries.push({
      module: '@types/example',
    });
  });
```

#### Parameters

▪ **wxt**: [`Wxt`](Wxt.md)

▪ **entries**: [`WxtDirEntry`](../type-aliases/WxtDirEntry.md)\[]

#### Source

[packages/wxt/src/types.ts:1279](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1279)

***

### ready

> **ready**: (`wxt`) => [`HookResult`](../type-aliases/HookResult.md)

Called after WXT modules are initialized, when the WXT instance is ready to
be used. `wxt.server` isn't available yet, use `server:created` to get it.

#### Parameters

▪ **wxt**: [`Wxt`](Wxt.md)

The configured WXT object

#### Source

[packages/wxt/src/types.ts:1250](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1250)

***

### server:closed

> **server:closed**: (`wxt`, `server`) => [`HookResult`](../type-aliases/HookResult.md)

Called when the dev server is stopped.

#### Parameters

▪ **wxt**: [`Wxt`](Wxt.md)

The configured WXT object

▪ **server**: [`WxtDevServer`](WxtDevServer.md)

Same as `wxt.server`, the object WXT uses to control the dev
server.

#### Source

[packages/wxt/src/types.ts:1420](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1420)

***

### server:created

> **server:created**: (`wxt`, `server`) => [`HookResult`](../type-aliases/HookResult.md)

Called when the dev server is created (and `wxt.server` is assigned).
Server has not been started yet.

#### Parameters

▪ **wxt**: [`Wxt`](Wxt.md)

The configured WXT object

▪ **server**: [`WxtDevServer`](WxtDevServer.md)

Same as `wxt.server`, the object WXT uses to control the dev
server.

#### Source

[packages/wxt/src/types.ts:1404](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1404)

***

### server:started

> **server:started**: (`wxt`, `server`) => [`HookResult`](../type-aliases/HookResult.md)

Called when the dev server is started.

#### Parameters

▪ **wxt**: [`Wxt`](Wxt.md)

The configured WXT object

▪ **server**: [`WxtDevServer`](WxtDevServer.md)

Same as `wxt.server`, the object WXT uses to control the dev
server.

#### Source

[packages/wxt/src/types.ts:1412](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1412)

***

### vite:build:extendConfig

> **vite:build:extendConfig**: (`entrypoints`, `viteConfig`) => [`HookResult`](../type-aliases/HookResult.md)

Called when WXT has created Vite's config for a build step. Useful if you
want to add plugins or update the vite config per entrypoint group.

#### Parameters

▪ **entrypoints**: readonly [`Entrypoint`](../type-aliases/Entrypoint.md)\[]

The list of entrypoints being built with the provided
config.

▪ **viteConfig**: `InlineConfig`

The config that will be used for the dev server.

#### Source

[packages/wxt/src/types.ts:466](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L466)

***

### vite:devServer:extendConfig

> **vite:devServer:extendConfig**: (`config`) => [`HookResult`](../type-aliases/HookResult.md)

Called when WXT has created Vite's config for the dev server. Useful if you
want to add plugins or update the vite config per entrypoint group.

#### Parameters

▪ **config**: `InlineConfig`

#### Source

[packages/wxt/src/types.ts:477](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L477)

***

### zip:done

> **zip:done**: (`wxt`, `zipFiles`) => [`HookResult`](../type-aliases/HookResult.md)

Called after the entire zip process is complete.

#### Parameters

▪ **wxt**: [`Wxt`](Wxt.md)

The configured WXT object

▪ **zipFiles**: `string`\[]

An array of paths to all created zip files

#### Source

[packages/wxt/src/types.ts:1395](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1395)

***

### zip:extension:done

> **zip:extension:done**: (`wxt`, `zipPath`) => [`HookResult`](../type-aliases/HookResult.md)

Called after zipping the extension files.

#### Parameters

▪ **wxt**: [`Wxt`](Wxt.md)

The configured WXT object

▪ **zipPath**: `string`

The path to the created extension zip file

#### Source

[packages/wxt/src/types.ts:1375](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1375)

***

### zip:extension:start

> **zip:extension:start**: (`wxt`) => [`HookResult`](../type-aliases/HookResult.md)

Called before zipping the extension files.

#### Parameters

▪ **wxt**: [`Wxt`](Wxt.md)

The configured WXT object

#### Source

[packages/wxt/src/types.ts:1368](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1368)

***

### zip:sources:done

> **zip:sources:done**: (`wxt`, `zipPath`) => [`HookResult`](../type-aliases/HookResult.md)

Called after zipping the source files (for Firefox).

#### Parameters

▪ **wxt**: [`Wxt`](Wxt.md)

The configured WXT object

▪ **zipPath**: `string`

The path to the created sources zip file

#### Source

[packages/wxt/src/types.ts:1388](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1388)

***

### zip:sources:start

> **zip:sources:start**: (`wxt`) => [`HookResult`](../type-aliases/HookResult.md)

Called before zipping the source files (for Firefox).

#### Parameters

▪ **wxt**: [`Wxt`](Wxt.md)

The configured WXT object

#### Source

[packages/wxt/src/types.ts:1381](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1381)

***

### zip:start

> **zip:start**: (`wxt`) => [`HookResult`](../type-aliases/HookResult.md)

Called before the zip process starts.

#### Parameters

▪ **wxt**: [`Wxt`](Wxt.md)

The configured WXT object

#### Source

[packages/wxt/src/types.ts:1362](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1362)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

