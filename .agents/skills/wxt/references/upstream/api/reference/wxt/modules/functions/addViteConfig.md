<!--
Source: https://wxt.dev/api/reference/wxt/modules/functions/addViteConfig.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../../index.md) > [wxt/modules](../index.md) > addViteConfig

# Function: addViteConfig()

> **addViteConfig**(`wxt`, `viteConfig`): `void`

Merge additional vite config for one or more entrypoint "groups" that make up
individual builds. Config in the project's `wxt.config.ts` file takes
precedence over any config added by this function.

## Parameters

▪ **wxt**: [`Wxt`](../../interfaces/Wxt.md)

The wxt instance provided by the module's setup function.

▪ **viteConfig**: (`env`) => `undefined` | `UserConfig`

A function that returns the vite config the module is
adding. Same format as `vite` in `wxt.config.ts`.

## Returns

## Example

```ts
export default defineWxtModule((wxt, options) => {
  addViteConfig(wxt, () => ({
  build: {
  sourceMaps: true,
  },
  });
  });
```

## Source

[packages/wxt/src/modules.ts:109](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/modules.ts#L109)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

