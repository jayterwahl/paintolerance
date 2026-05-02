<!--
Source: https://wxt.dev/api/reference/wxt/interfaces/WxtBuilder.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > WxtBuilder

# Interface: WxtBuilder

## Contents

* [Properties](WxtBuilder.md#properties)
  * [name](WxtBuilder.md#name)
  * [version](WxtBuilder.md#version)
* [Methods](WxtBuilder.md#methods)
  * [build()](WxtBuilder.md#build)
  * [createServer()](WxtBuilder.md#createserver)
  * [importEntrypoint()](WxtBuilder.md#importentrypoint)
  * [importEntrypoints()](WxtBuilder.md#importentrypoints)

## Properties

### name

> **name**: `string`

Name of tool used to build. Ex: "Vite" or "Webpack".

#### Source

[packages/wxt/src/types.ts:1184](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1184)

***

### version

> **version**: `string`

Version of tool used to build. Ex: "5.0.2"

#### Source

[packages/wxt/src/types.ts:1186](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1186)

## Methods

### build()

> **build**(`group`): `Promise`<[`BuildStepOutput`](BuildStepOutput.md)>

Build a single entrypoint group. This is effectively one of the multiple
"steps" during the build process.

#### Parameters

▪ **group**: [`EntrypointGroup`](../type-aliases/EntrypointGroup.md)

#### Source

[packages/wxt/src/types.ts:1198](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1198)

***

### createServer()

> **createServer**(`info`): `Promise`<[`WxtBuilderServer`](WxtBuilderServer.md)>

Start a dev server at the provided port.

#### Parameters

▪ **info**: [`ServerInfo`](ServerInfo.md)

#### Source

[packages/wxt/src/types.ts:1200](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1200)

***

### importEntrypoint()

> **importEntrypoint**<`T`>(`path`): `Promise`<`T`>

Import a JS entrypoint file, returning the default export containing the
options.

#### Type parameters

▪ **T**

#### Parameters

▪ **path**: `string`

#### Source

[packages/wxt/src/types.ts:1191](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1191)

***

### importEntrypoints()

> **importEntrypoints**(`paths`): `Promise`<`Record`<`string`, `unknown`>\[]>

Import a list of JS entrypoint files, returning their options.

#### Parameters

▪ **paths**: `string`\[]

#### Source

[packages/wxt/src/types.ts:1193](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1193)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

