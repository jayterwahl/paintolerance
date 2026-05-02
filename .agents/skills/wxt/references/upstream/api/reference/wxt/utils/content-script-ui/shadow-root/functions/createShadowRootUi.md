<!--
Source: https://wxt.dev/api/reference/wxt/utils/content-script-ui/shadow-root/functions/createShadowRootUi.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../../../../index.md) > [wxt/utils/content-script-ui/shadow-root](../index.md) > createShadowRootUi

# Function: createShadowRootUi()

> **createShadowRootUi**<`TMounted`>(`ctx`, `options`): `Promise`<[`ShadowRootContentScriptUi`](../interfaces/ShadowRootContentScriptUi.md)<`TMounted`>>

Create a content script UI inside a
[`ShadowRoot`](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot).

> This function is async because it has to load the CSS via a network call.

## Type parameters

▪ **TMounted**

## Parameters

▪ **ctx**: [`ContentScriptContext`](../../../content-script-context/classes/ContentScriptContext.md)

▪ **options**: [`ShadowRootContentScriptUiOptions`](../type-aliases/ShadowRootContentScriptUiOptions.md)<`TMounted`>

## Returns

## See

https://wxt.dev/guide/essentials/content-scripts.html#shadow-root

## Source

[packages/wxt/src/utils/content-script-ui/shadow-root.ts:18](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-ui/shadow-root.ts#L18)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

