<!--
Source: https://wxt.dev/api/reference/wxt/interfaces/WxtModuleWithMetadata.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > WxtModuleWithMetadata

# Interface: WxtModuleWithMetadata`<TOptions>`

## Contents

* [Extends](WxtModuleWithMetadata.md#extends)
* [Type parameters](WxtModuleWithMetadata.md#type-parameters)
* [Properties](WxtModuleWithMetadata.md#properties)
  * [configKey](WxtModuleWithMetadata.md#configkey)
  * [hooks](WxtModuleWithMetadata.md#hooks)
  * [id](WxtModuleWithMetadata.md#id)
  * [imports](WxtModuleWithMetadata.md#imports)
  * [name](WxtModuleWithMetadata.md#name)
  * [setup](WxtModuleWithMetadata.md#setup)
  * [type](WxtModuleWithMetadata.md#type)

## Extends

* [`WxtModule`](WxtModule.md)<`TOptions`>

## Type parameters

▪ **TOptions** extends [`WxtModuleOptions`](../type-aliases/WxtModuleOptions.md)

## Properties

### configKey

> **configKey**?: `string`

Key for users to pass options into your module from their `wxt.config.ts`
file.

#### Inherited from

[`WxtModule`](WxtModule.md).[`configKey`](WxtModule.md#configkey)

#### Source

[packages/wxt/src/types.ts:1695](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1695)

***

### hooks

> **hooks**?: `NestedHooks`<[`WxtHooks`](WxtHooks.md)>

Alternative to adding hooks in setup function with `wxt.hooks`. Hooks are
added before the `setup` function is called.

#### Inherited from

[`WxtModule`](WxtModule.md).[`hooks`](WxtModule.md#hooks)

#### Source

[packages/wxt/src/types.ts:1702](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1702)

***

### id

> **id**: `string`

#### Source

[packages/wxt/src/types.ts:1714](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1714)

***

### imports

> **imports**?: `Import`\[]

Provide a list of imports to add to auto-imports.

#### Inherited from

[`WxtModule`](WxtModule.md).[`imports`](WxtModule.md#imports)

#### Source

[packages/wxt/src/types.ts:1697](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1697)

***

### name

> **name**?: `string`

#### Inherited from

[`WxtModule`](WxtModule.md).[`name`](WxtModule.md#name)

#### Source

[packages/wxt/src/types.ts:1690](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1690)

***

### setup

> **setup**?: [`WxtModuleSetup`](../type-aliases/WxtModuleSetup.md)<`TOptions`>

A custom function that can be used to setup hooks and call module-specific
APIs.

#### Inherited from

[`WxtModule`](WxtModule.md).[`setup`](WxtModule.md#setup)

#### Source

[packages/wxt/src/types.ts:1707](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1707)

***

### type

> **type**: `"local"` | `"node_module"`

#### Source

[packages/wxt/src/types.ts:1713](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1713)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

