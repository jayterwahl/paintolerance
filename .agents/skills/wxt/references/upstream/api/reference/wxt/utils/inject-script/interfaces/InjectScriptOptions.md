<!--
Source: https://wxt.dev/api/reference/wxt/utils/inject-script/interfaces/InjectScriptOptions.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../../../index.md) > [wxt/utils/inject-script](../index.md) > InjectScriptOptions

# Interface: InjectScriptOptions

## Contents

* [Properties](InjectScriptOptions.md#properties)
  * [keepInDom](InjectScriptOptions.md#keepindom)
  * [modifyScript](InjectScriptOptions.md#modifyscript)

## Properties

### keepInDom

> **keepInDom**?: `boolean`

By default, the injected script is removed from the DOM after being
injected. To disable this behavior, set this flag to true.

#### Source

[packages/wxt/src/utils/inject-script.ts:85](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/inject-script.ts#L85)

***

### modifyScript

> **modifyScript**?: (`script`) => `void` | `Promise`<`void`>

Modify the script element just before it is added to the DOM.

It can be used to e.g. modify `script.async`/`script.defer`, add event
listeners to the element, or pass data to the script via `script.dataset`
(which can be accessed by the script via `document.currentScript`).

#### Parameters

▪ **script**: `HTMLScriptElement`

#### Source

[packages/wxt/src/utils/inject-script.ts:93](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/inject-script.ts#L93)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

