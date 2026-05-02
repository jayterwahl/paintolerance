<!--
Source: https://wxt.dev/api/reference/wxt/utils/content-script-ui/integrated/interfaces/IntegratedContentScriptUi.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../../../../index.md) > [wxt/utils/content-script-ui/integrated](../index.md) > IntegratedContentScriptUi

# Interface: IntegratedContentScriptUi`<TMounted>`

## Contents

* [Extends](IntegratedContentScriptUi.md#extends)
* [Type parameters](IntegratedContentScriptUi.md#type-parameters)
* [Properties](IntegratedContentScriptUi.md#properties)
  * [autoMount](IntegratedContentScriptUi.md#automount)
  * [mount](IntegratedContentScriptUi.md#mount)
  * [mounted](IntegratedContentScriptUi.md#mounted)
  * [remove](IntegratedContentScriptUi.md#remove)
  * [wrapper](IntegratedContentScriptUi.md#wrapper)

## Extends

* [`ContentScriptUi`](../../types/interfaces/ContentScriptUi.md)<`TMounted`>

## Type parameters

▪ **TMounted**

## Properties

### autoMount

> **autoMount**: (`options`?) => `void`

Call `ui.autoMount()` to automatically mount and remove the UI as the
anchor is dynamically added/removed by the webpage.

#### Parameters

▪ **options?**: [`AutoMountOptions`](../../types/type-aliases/AutoMountOptions.md)

#### Inherited from

[`ContentScriptUi`](../../types/interfaces/ContentScriptUi.md).[`autoMount`](../../types/interfaces/ContentScriptUi.md#automount)

#### Source

[packages/wxt/src/utils/content-script-ui/types.ts:120](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-ui/types.ts#L120)

***

### mount

> **mount**: () => `void`

Function that mounts or remounts the UI on the page.

#### Inherited from

[`ContentScriptUi`](../../types/interfaces/ContentScriptUi.md).[`mount`](../../types/interfaces/ContentScriptUi.md#mount)

#### Source

[packages/wxt/src/utils/content-script-ui/types.ts:109](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-ui/types.ts#L109)

***

### mounted

> **mounted**: `undefined` | `TMounted`

#### Inherited from

[`ContentScriptUi`](../../types/interfaces/ContentScriptUi.md).[`mounted`](../../types/interfaces/ContentScriptUi.md#mounted)

#### Source

[packages/wxt/src/utils/content-script-ui/types.ts:4](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-ui/types.ts#L4)

***

### remove

> **remove**: () => `void`

Function that removes the UI from the webpage.

#### Inherited from

[`ContentScriptUi`](../../types/interfaces/ContentScriptUi.md).[`remove`](../../types/interfaces/ContentScriptUi.md#remove)

#### Source

[packages/wxt/src/utils/content-script-ui/types.ts:112](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-ui/types.ts#L112)

***

### wrapper

> **wrapper**: `HTMLElement`

A wrapper div that assists in positioning.

#### Source

[packages/wxt/src/utils/content-script-ui/integrated.ts:58](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-ui/integrated.ts#L58)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

