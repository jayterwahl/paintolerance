<!--
Source: https://wxt.dev/api/reference/wxt/utils/content-script-ui/types/type-aliases/ContentScriptUiOptions.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../../../../index.md) > [wxt/utils/content-script-ui/types](../index.md) > ContentScriptUiOptions

# Type alias: ContentScriptUiOptions`<TMounted>`

> **ContentScriptUiOptions**<`TMounted`>: [`ContentScriptPositioningOptions`](ContentScriptPositioningOptions.md) & [`ContentScriptAnchoredOptions`](../interfaces/ContentScriptAnchoredOptions.md) & `object`

## Type declaration

### onRemove

> **onRemove**?: (`mounted`) => `void`

Callback called before the UI is removed from the webpage. Use to cleanup
your UI, like unmounting your Vue or React apps.

Note that this callback is called only when `ui.remove` is called - that
means it is not called automatically when the anchor is removed, unless
you use `autoMount`.

#### Parameters

▪ **mounted**: `TMounted` | `undefined`

## Type parameters

| Parameter |
| :------ |
| `TMounted` |

## Source

[packages/wxt/src/utils/content-script-ui/types.ts:7](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-ui/types.ts#L7)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

