<!--
Source: https://wxt.dev/api/reference/wxt/interfaces/OptionsEntrypointOptions.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > OptionsEntrypointOptions

# Interface: OptionsEntrypointOptions

## Contents

* [Extends](OptionsEntrypointOptions.md#extends)
* [Properties](OptionsEntrypointOptions.md#properties)
  * [browserStyle](OptionsEntrypointOptions.md#browserstyle)
  * [chromeStyle](OptionsEntrypointOptions.md#chromestyle)
  * [exclude](OptionsEntrypointOptions.md#exclude)
  * [include](OptionsEntrypointOptions.md#include)
  * [openInTab](OptionsEntrypointOptions.md#openintab)
  * [title](OptionsEntrypointOptions.md#title)

## Extends

* [`BaseEntrypointOptions`](BaseEntrypointOptions.md)

## Properties

### browserStyle

> **browserStyle**?: [`PerBrowserOption`](../type-aliases/PerBrowserOption.md)<`boolean`>

#### Source

[packages/wxt/src/types.ts:788](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L788)

***

### chromeStyle

> **chromeStyle**?: [`PerBrowserOption`](../type-aliases/PerBrowserOption.md)<`boolean`>

#### Source

[packages/wxt/src/types.ts:789](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L789)

***

### exclude

> **exclude**?: `string`\[]

List of target browsers to exclude this entrypoint from. Cannot be used
with `include`. You must choose one of the two options.

#### Default

```ts
undefined
```

#### Inherited from

[`BaseEntrypointOptions`](BaseEntrypointOptions.md).[`exclude`](BaseEntrypointOptions.md#exclude)

#### Source

[packages/wxt/src/types.ts:595](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L595)

***

### include

> **include**?: `string`\[]

List of target browsers to include this entrypoint in. Defaults to being
included in all builds. Cannot be used with `exclude`. You must choose one
of the two options.

#### Default

```ts
undefined
```

#### Inherited from

[`BaseEntrypointOptions`](BaseEntrypointOptions.md).[`include`](BaseEntrypointOptions.md#include)

#### Source

[packages/wxt/src/types.ts:588](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L588)

***

### openInTab

> **openInTab**?: [`PerBrowserOption`](../type-aliases/PerBrowserOption.md)<`boolean`>

#### Source

[packages/wxt/src/types.ts:787](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L787)

***

### title

> **title**?: `string`

#### Source

[packages/wxt/src/types.ts:786](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L786)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

