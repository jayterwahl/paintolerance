<!--
Source: https://wxt.dev/api/reference/wxt/interfaces/SidepanelEntrypointOptions.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > SidepanelEntrypointOptions

# Interface: SidepanelEntrypointOptions

## Contents

* [Extends](SidepanelEntrypointOptions.md#extends)
* [Properties](SidepanelEntrypointOptions.md#properties)
  * [browserStyle](SidepanelEntrypointOptions.md#browserstyle)
  * [defaultIcon](SidepanelEntrypointOptions.md#defaulticon)
  * [defaultTitle](SidepanelEntrypointOptions.md#defaulttitle)
  * [exclude](SidepanelEntrypointOptions.md#exclude)
  * [include](SidepanelEntrypointOptions.md#include)
  * [openAtInstall](SidepanelEntrypointOptions.md#openatinstall)

## Extends

* [`BaseEntrypointOptions`](BaseEntrypointOptions.md)

## Properties

### browserStyle

> **browserStyle**?: [`PerBrowserOption`](../type-aliases/PerBrowserOption.md)<`boolean`>

#### Deprecated

See
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/sidebar\_action#syntax

#### Source

[packages/wxt/src/types.ts:804](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L804)

***

### defaultIcon

> **defaultIcon**?: `string` | `Record`<`string`, `string`>

#### Source

[packages/wxt/src/types.ts:805](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L805)

***

### defaultTitle

> **defaultTitle**?: [`PerBrowserOption`](../type-aliases/PerBrowserOption.md)<`string`>

#### Source

[packages/wxt/src/types.ts:806](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L806)

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

### openAtInstall

> **openAtInstall**?: [`PerBrowserOption`](../type-aliases/PerBrowserOption.md)<`boolean`>

Firefox only. See
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/sidebar\_action#syntax

#### Default

```ts
false
```

#### Source

[packages/wxt/src/types.ts:799](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L799)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

