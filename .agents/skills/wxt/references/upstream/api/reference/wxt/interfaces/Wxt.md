<!--
Source: https://wxt.dev/api/reference/wxt/interfaces/Wxt.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > Wxt

# Interface: Wxt

## Contents

* [Properties](Wxt.md#properties)
  * [builder](Wxt.md#builder)
  * [config](Wxt.md#config)
  * [hook](Wxt.md#hook)
  * [hooks](Wxt.md#hooks)
  * [logger](Wxt.md#logger)
  * [pm](Wxt.md#pm)
  * [reloadConfig](Wxt.md#reloadconfig)
  * [server](Wxt.md#server)

## Properties

### builder

> **builder**: [`WxtBuilder`](WxtBuilder.md)

The module in charge of executing all the build steps.

#### Source

[packages/wxt/src/types.ts:1437](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1437)

***

### config

> **config**: [`ResolvedConfig`](ResolvedConfig.md)

#### Source

[packages/wxt/src/types.ts:1424](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1424)

***

### hook

> **hook**: <`NameT`>(`name`, `function_`, `options`?) => () => `void`

Alias for `wxt.hooks.hook(...)`.

#### Type parameters

▪ **NameT** extends `HookKeys`<[`WxtHooks`](WxtHooks.md)>

#### Parameters

▪ **name**: `NameT`

▪ **function\_**: `InferCallback`<[`WxtHooks`](WxtHooks.md), `NameT`>

▪ **options?**: `object`

▪ **options.allowDeprecated?**: `boolean`

#### Returns

> > (): `void`
>
> ##### Source
>
> node\_modules/.bun/hookable@6.1.0/node\_modules/hookable/dist/index.d.mts:39

#### Source

[packages/wxt/src/types.ts:1427](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1427)

***

### hooks

> **hooks**: `Hookable`<[`WxtHooks`](WxtHooks.md), `HookKeys`<[`WxtHooks`](WxtHooks.md)>>

#### Source

[packages/wxt/src/types.ts:1425](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1425)

***

### logger

> **logger**: [`Logger`](Logger.md)

Alias for config.logger

#### Source

[packages/wxt/src/types.ts:1429](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1429)

***

### pm

> **pm**: [`WxtPackageManager`](WxtPackageManager.md)

Package manager utilities.

#### Source

[packages/wxt/src/types.ts:1433](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1433)

***

### reloadConfig

> **reloadConfig**: () => `Promise`<`void`>

Reload config file and update `wxt.config` with the result.

#### Source

[packages/wxt/src/types.ts:1431](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1431)

***

### server

> **server**?: [`WxtDevServer`](WxtDevServer.md)

If the dev server was started, it will be available.

#### Source

[packages/wxt/src/types.ts:1435](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1435)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

