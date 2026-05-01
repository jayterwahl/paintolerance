<!--
Source: https://wxt.dev/api/reference/wxt/modules/functions/addWxtPlugin.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../../index.md) > [wxt/modules](../index.md) > addWxtPlugin

# Function: addWxtPlugin()

> **addWxtPlugin**(`wxt`, `plugin`): `void`

Add a runtime plugin to the project. In each entrypoint, before executing the
`main` function, plugins are executed.

## Parameters

▪ **wxt**: [`Wxt`](../../interfaces/Wxt.md)

The wxt instance provided by the module's setup function.

▪ **plugin**: `string`

An import from an NPM module, or an absolute file path to the
file to load at runtime.

## Returns

## Example

```ts
export default defineWxtModule((wxt) => {
    addWxtPlugin(wxt, 'wxt-module-analytics/client-plugin');
  });
```

## Source

[packages/wxt/src/modules.ts:139](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/modules.ts#L139)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

