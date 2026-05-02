<!--
Source: https://wxt.dev/api/reference/wxt/functions/zip.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > zip

# Function: zip()

> **zip**(`config`?): `Promise`<`string`\[]>

Build and zip the extension for distribution.

## Parameters

▪ **config?**: [`InlineConfig`](../interfaces/InlineConfig.md)

Optional config that will override your `<root>/wxt.config.ts`.

## Returns

A list of all files included in the ZIP.

## Source

[packages/wxt/src/core/zip.ts:22](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/core/zip.ts#L22)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

