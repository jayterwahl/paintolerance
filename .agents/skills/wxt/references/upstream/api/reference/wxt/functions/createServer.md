<!--
Source: https://wxt.dev/api/reference/wxt/functions/createServer.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > createServer

# Function: createServer()

> **createServer**(`inlineConfig`?): `Promise`<[`WxtDevServer`](../interfaces/WxtDevServer.md)>

Creates a dev server and pre-builds all the files that need to exist before
loading the extension.

## Parameters

▪ **inlineConfig?**: [`InlineConfig`](../interfaces/InlineConfig.md)

## Returns

## Example

```ts
const server = await wxt.createServer({
    // Enter config...
  });
  await server.start();
```

## Source

[packages/wxt/src/core/create-server.ts:24](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/core/create-server.ts#L24)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

