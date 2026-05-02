<!--
Source: https://wxt.dev/api/reference/wxt/utils/inject-script/functions/injectScript.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../../../index.md) > [wxt/utils/inject-script](../index.md) > injectScript

# Function: injectScript()

> **injectScript**(`path`, `options`?): `Promise`<[`InjectScriptResult`](../interfaces/InjectScriptResult.md)>

This function can only be called inside content scripts.

Inject an unlisted script into the page. Scripts are added to the `<head>`
element or `document.documentElement` if there is no head.

Make sure to add the injected script to your manifest's
`web_accessible_resources`.

## Parameters

▪ **path**: `any`

▪ **options?**: [`InjectScriptOptions`](../interfaces/InjectScriptOptions.md)

## Returns

A result object containing the created script element.

## Source

[packages/wxt/src/utils/inject-script.ts:21](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/inject-script.ts#L21)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

