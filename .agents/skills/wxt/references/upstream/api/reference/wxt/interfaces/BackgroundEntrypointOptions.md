<!--
Source: https://wxt.dev/api/reference/wxt/interfaces/BackgroundEntrypointOptions.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > BackgroundEntrypointOptions

# Interface: BackgroundEntrypointOptions

## Contents

* [Extends](BackgroundEntrypointOptions.md#extends)
* [Properties](BackgroundEntrypointOptions.md#properties)
  * [exclude](BackgroundEntrypointOptions.md#exclude)
  * [include](BackgroundEntrypointOptions.md#include)
  * [persistent](BackgroundEntrypointOptions.md#persistent)
  * [type](BackgroundEntrypointOptions.md#type)

## Extends

* [`BaseEntrypointOptions`](BaseEntrypointOptions.md)

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

### persistent

> **persistent**?: [`PerBrowserOption`](../type-aliases/PerBrowserOption.md)<`boolean`>

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

#### Source

[packages/wxt/src/types.ts:609](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L609)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

