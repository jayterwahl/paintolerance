<!--
Source: https://wxt.dev/api/reference/wxt/interfaces/BaseEntrypointOptions.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > BaseEntrypointOptions

# Interface: BaseEntrypointOptions

## Contents

* [Extended By](BaseEntrypointOptions.md#extended-by)
* [Properties](BaseEntrypointOptions.md#properties)
  * [exclude](BaseEntrypointOptions.md#exclude)
  * [include](BaseEntrypointOptions.md#include)

## Extended By

* [`BackgroundEntrypointOptions`](BackgroundEntrypointOptions.md)
* [`BaseScriptEntrypointOptions`](BaseScriptEntrypointOptions.md)
* [`PopupEntrypointOptions`](PopupEntrypointOptions.md)
* [`OptionsEntrypointOptions`](OptionsEntrypointOptions.md)
* [`SidepanelEntrypointOptions`](SidepanelEntrypointOptions.md)

## Properties

### exclude

> **exclude**?: `string`\[]

List of target browsers to exclude this entrypoint from. Cannot be used
with `include`. You must choose one of the two options.

#### Default

```ts
undefined
```

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

#### Source

[packages/wxt/src/types.ts:588](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L588)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

