<!--
Source: https://wxt.dev/api/reference/wxt/utils/content-script-ui/integrated/type-aliases/IntegratedContentScriptUiOptions.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../../../../index.md) > [wxt/utils/content-script-ui/integrated](../index.md) > IntegratedContentScriptUiOptions

# Type alias: IntegratedContentScriptUiOptions`<TMounted>`

> **IntegratedContentScriptUiOptions**<`TMounted`>: [`ContentScriptUiOptions`](../../types/type-aliases/ContentScriptUiOptions.md)<`TMounted`> & `object`

## Type declaration

### onMount

> **onMount**: (`wrapper`) => `TMounted`

Callback executed when mounting the UI. This function should create and
append the UI to the `wrapper` element. It is called every time
`ui.mount()` is called.

Optionally return a value that can be accessed at `ui.mounted` or in the
`onRemove` callback.

#### Parameters

▪ **wrapper**: `HTMLElement`

### tag

> **tag**?: `string`

Tag used to create the wrapper element.

#### Default

```ts
'div'
```

## Type parameters

| Parameter |
| :------ |
| `TMounted` |

## Source

[packages/wxt/src/utils/content-script-ui/integrated.ts:61](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-ui/integrated.ts#L61)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

