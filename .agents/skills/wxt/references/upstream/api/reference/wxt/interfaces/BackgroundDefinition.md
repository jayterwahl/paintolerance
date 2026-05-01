<!--
Source: https://wxt.dev/api/reference/wxt/interfaces/BackgroundDefinition.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > BackgroundDefinition

# Interface: BackgroundDefinition

## Contents

* [Extends](BackgroundDefinition.md#extends)
* [Properties](BackgroundDefinition.md#properties)
  * [exclude](BackgroundDefinition.md#exclude)
  * [include](BackgroundDefinition.md#include)
  * [persistent](BackgroundDefinition.md#persistent)
  * [type](BackgroundDefinition.md#type)
* [Methods](BackgroundDefinition.md#methods)
  * [main()](BackgroundDefinition.md#main)

## Extends

* [`BackgroundEntrypointOptions`](BackgroundEntrypointOptions.md)

## Properties

### exclude

> **exclude**?: `string`\[]

List of target browsers to exclude this entrypoint from. Cannot be used
with `include`. You must choose one of the two options.

#### Default

```ts
undefined
```

#### Inherited from

[`BackgroundEntrypointOptions`](BackgroundEntrypointOptions.md).[`exclude`](BackgroundEntrypointOptions.md#exclude)

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

[`BackgroundEntrypointOptions`](BackgroundEntrypointOptions.md).[`include`](BackgroundEntrypointOptions.md#include)

#### Source

[packages/wxt/src/types.ts:588](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L588)

***

### persistent

> **persistent**?: [`PerBrowserOption`](../type-aliases/PerBrowserOption.md)<`boolean`>

#### Inherited from

[`BackgroundEntrypointOptions`](BackgroundEntrypointOptions.md).[`persistent`](BackgroundEntrypointOptions.md#persistent)

#### Source

[packages/wxt/src/types.ts:599](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L599)

***

### type

> **type**?: [`PerBrowserOption`](../type-aliases/PerBrowserOption.md)<`"module"`>

Set to `"module"` to output the background entrypoint as ESM. ESM outputs
can share chunks and reduce the overall size of the bundled extension.

When `undefined`, the background is bundled individually into an IIFE
format.

#### Default

```ts
undefined
```

#### Inherited from

[`BackgroundEntrypointOptions`](BackgroundEntrypointOptions.md).[`type`](BackgroundEntrypointOptions.md#type)

#### Source

[packages/wxt/src/types.ts:609](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L609)

## Methods

### main()

> **main**(): `void`

Main function executed when the background script is started. Cannot be
async.

#### Source

[packages/wxt/src/types.ts:944](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L944)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

