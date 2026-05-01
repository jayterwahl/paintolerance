<!--
Source: https://wxt.dev/api/reference/wxt/interfaces/PopupEntrypointOptions.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > PopupEntrypointOptions

# Interface: PopupEntrypointOptions

## Contents

* [Extends](PopupEntrypointOptions.md#extends)
* [Properties](PopupEntrypointOptions.md#properties)
  * [actionType](PopupEntrypointOptions.md#actiontype)
  * [browserStyle](PopupEntrypointOptions.md#browserstyle)
  * [defaultArea](PopupEntrypointOptions.md#defaultarea)
  * [defaultIcon](PopupEntrypointOptions.md#defaulticon)
  * [defaultState](PopupEntrypointOptions.md#defaultstate)
  * [defaultTitle](PopupEntrypointOptions.md#defaulttitle)
  * [exclude](PopupEntrypointOptions.md#exclude)
  * [include](PopupEntrypointOptions.md#include)
  * [mv2Key](PopupEntrypointOptions.md#mv2key)
  * [themeIcons](PopupEntrypointOptions.md#themeicons)

## Extends

* [`BaseEntrypointOptions`](BaseEntrypointOptions.md)

## Properties

### actionType

> **actionType**?: [`PerBrowserOption`](../type-aliases/PerBrowserOption.md)<`"browser_action"` | `"page_action"`>

The type of action to use in the manifest.

In MV2, defaults to `"browser_action"`. In MV3, `"browser_action"` is
converted to `"action"`, while `"page_action"` is kept as-is (Firefox MV3
only).

#### Source

[packages/wxt/src/types.ts:756](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L756)

***

### browserStyle

> **browserStyle**?: [`PerBrowserOption`](../type-aliases/PerBrowserOption.md)<`boolean`>

#### Source

[packages/wxt/src/types.ts:767](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L767)

***

### defaultArea

> **defaultArea**?: [`PerBrowserOption`](../type-aliases/PerBrowserOption.md)<`"navbar"` | `"menupanel"` | `"tabstrip"` | `"personaltoolbar"`>

Firefox only. Defines the part of the browser in which the button is
initially placed.

#### See

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/action#default\_area

#### Source

[packages/wxt/src/types.ts:774](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L774)

***

### defaultIcon

> **defaultIcon**?: `Record`<`string`, `string`>

#### Source

[packages/wxt/src/types.ts:759](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L759)

***

### defaultState

> **defaultState**?: [`PerBrowserOption`](../type-aliases/PerBrowserOption.md)<`"enabled"` | `"disabled"`>

Chrome only. Controls the initial enabled/disabled state of the action.

#### See

https://developer.chrome.com/docs/extensions/reference/api/action#enabled\_state

#### Source

[packages/wxt/src/types.ts:766](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L766)

***

### defaultTitle

> **defaultTitle**?: [`PerBrowserOption`](../type-aliases/PerBrowserOption.md)<`string`>

#### Source

[packages/wxt/src/types.ts:760](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L760)

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

### mv2Key

> **mv2Key**?: [`PerBrowserOption`](../type-aliases/PerBrowserOption.md)<`"browser_action"` | `"page_action"`>

#### Deprecated

Use `actionType` instead.

#### Source

[packages/wxt/src/types.ts:758](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L758)

***

### themeIcons

> **themeIcons**?: [`ThemeIcon`](ThemeIcon.md)\[]

Firefox only. Icons for light and dark themes.

#### See

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/action#theme\_icons

#### Source

[packages/wxt/src/types.ts:782](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L782)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

