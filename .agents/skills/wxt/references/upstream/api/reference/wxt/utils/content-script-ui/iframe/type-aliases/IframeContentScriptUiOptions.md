<!--
Source: https://wxt.dev/api/reference/wxt/utils/content-script-ui/iframe/type-aliases/IframeContentScriptUiOptions.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../../../../index.md) > [wxt/utils/content-script-ui/iframe](../index.md) > IframeContentScriptUiOptions

# Type alias: IframeContentScriptUiOptions`<TMounted>`

> **IframeContentScriptUiOptions**<`TMounted`>: [`ContentScriptUiOptions`](../../types/type-aliases/ContentScriptUiOptions.md)<`TMounted`> & `object`

## Type declaration

### onBeforeMount

> **onBeforeMount**?: (`wrapper`, `iframe`) => `void`

Callback executed before mounting the UI. Use this function to customize
the iframe or wrapper elements before they are injected into the DOM. It
is called every time `ui.mount()` is called.

#### Parameters

▪ **wrapper**: `HTMLElement`

▪ **iframe**: `HTMLIFrameElement`

### onMount

> **onMount**?: (`wrapper`, `iframe`) => `TMounted`

Callback executed when mounting the UI. Use this function to customize
the iframe or wrapper element's appearance. It is called every time
`ui.mount()` is called.

Optionally return a value that can be accessed at `ui.mounted` or in the
`onRemove` callback.

#### Parameters

▪ **wrapper**: `HTMLElement`

▪ **iframe**: `HTMLIFrameElement`

### page

> **page**: `HtmlPublicPath`

The path to the HTML page that will be shown in the iframe. This string
is passed into `browser.runtime.getURL`.

## Type parameters

| Parameter |
| :------ |
| `TMounted` |

## Source

[packages/wxt/src/utils/content-script-ui/iframe.ts:58](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-ui/iframe.ts#L58)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

