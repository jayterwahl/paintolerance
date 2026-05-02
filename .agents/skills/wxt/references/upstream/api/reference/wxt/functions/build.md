<!--
Source: https://wxt.dev/api/reference/wxt/functions/build.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > build

# Function: build()

> **build**(`config`?): `Promise`<[`BuildOutput`](../interfaces/BuildOutput.md)>

Bundles the extension for production. Returns a promise of the build result.
Discovers the `wxt.config.ts` file in the root directory, and merges that
config with what is passed in.

## Parameters

▪ **config?**: [`InlineConfig`](../interfaces/InlineConfig.md)

## Returns

## Example

```ts
// Use config from `wxt.config.ts`
  const res = await build();

  // or override config `from wxt.config.ts`
  const res = await build({
    // Override config...
  });
```

## Source

[packages/wxt/src/core/build.ts:19](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/core/build.ts#L19)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

