<!--
Source: https://wxt.dev/api/reference/wxt/functions/clean.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > clean

# Function: clean()

## clean(config)

> **clean**(`config`?): `Promise`<`void`>

Remove generated/temp files from the directory.

### Parameters

▪ **config?**: [`InlineConfig`](../interfaces/InlineConfig.md)

Optional config that will override your `<root>/wxt.config.ts`.

### Returns

### Example

```ts
await clean();
```

### Source

[packages/wxt/src/core/clean.ts:16](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/core/clean.ts#L16)

## clean(root)

> **clean**(`root`?): `Promise`<`void`>

Remove generated/temp files from the directory.

### Parameters

▪ **root?**: `string`

The directory to look for generated/temp files in. Defaults to
`process.cwd()`. Can be relative to `process.cwd()` or absolute.

### Returns

### Deprecated

### Example

```ts
await clean();
```

### Source

[packages/wxt/src/core/clean.ts:27](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/core/clean.ts#L27)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

