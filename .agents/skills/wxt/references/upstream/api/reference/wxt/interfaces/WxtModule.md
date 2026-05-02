<!--
Source: https://wxt.dev/api/reference/wxt/interfaces/WxtModule.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > WxtModule

# Interface: WxtModule`<TOptions>`

## Contents

* [Extended By](WxtModule.md#extended-by)
* [Type parameters](WxtModule.md#type-parameters)
* [Properties](WxtModule.md#properties)
  * [configKey](WxtModule.md#configkey)
  * [hooks](WxtModule.md#hooks)
  * [imports](WxtModule.md#imports)
  * [name](WxtModule.md#name)
  * [setup](WxtModule.md#setup)

## Extended By

* [`WxtModuleWithMetadata`](WxtModuleWithMetadata.md)

## Type parameters

▪ **TOptions** extends [`WxtModuleOptions`](../type-aliases/WxtModuleOptions.md)

## Properties

### configKey

> **configKey**?: `string`

Key for users to pass options into your module from their `wxt.config.ts`
file.

#### Source

[packages/wxt/src/types.ts:1695](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1695)

***

### hooks

> **hooks**?: `NestedHooks`<[`WxtHooks`](WxtHooks.md)>

Alternative to adding hooks in setup function with `wxt.hooks`. Hooks are
added before the `setup` function is called.

#### Source

[packages/wxt/src/types.ts:1702](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1702)

***

### imports

> **imports**?: `Import`\[]

Provide a list of imports to add to auto-imports.

#### Source

[packages/wxt/src/types.ts:1697](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1697)

***

### name

> **name**?: `string`

#### Source

[packages/wxt/src/types.ts:1690](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1690)

***

### setup

> **setup**?: [`WxtModuleSetup`](../type-aliases/WxtModuleSetup.md)<`TOptions`>

A custom function that can be used to setup hooks and call module-specific
APIs.

#### Source

[packages/wxt/src/types.ts:1707](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1707)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

