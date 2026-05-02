<!--
Source: https://wxt.dev/api/reference/wxt/modules/functions/addPublicAssets.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../../index.md) > [wxt/modules](../index.md) > addPublicAssets

# Function: addPublicAssets()

> **addPublicAssets**(`wxt`, `dir`): `void`

Copy files inside a directory (as if it were the public directory) into the
extension's output directory. The directory itself is not copied, just the
files inside it. If a filename matches an existing one, it is ignored.

## Parameters

▪ **wxt**: [`Wxt`](../../interfaces/Wxt.md)

The wxt instance provided by the module's setup function.

▪ **dir**: `string`

The directory to copy.

## Returns

## Example

```ts
export default defineWxtModule((wxt, options) => {
    addPublicAssets(wxt, './dist/prebundled');
  });
```

## Source

[packages/wxt/src/modules.ts:75](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/modules.ts#L75)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

