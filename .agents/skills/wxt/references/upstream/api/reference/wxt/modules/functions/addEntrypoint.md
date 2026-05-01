<!--
Source: https://wxt.dev/api/reference/wxt/modules/functions/addEntrypoint.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../../index.md) > [wxt/modules](../index.md) > addEntrypoint

# Function: addEntrypoint()

> **addEntrypoint**(`wxt`, `entrypoint`): `void`

Adds a TS/JS file as an entrypoint to the project. This file will be bundled
along with the other entrypoints.

If you're publishing the module to NPM, you should probably pre-build the
entrypoint and use `addPublicAssets` instead to copy pre-bundled assets into
the output directory. This will speed up project builds since it just has to
copy some files instead of bundling them.

To extract entrypoint options from a JS/TS file, use
`wxt.builder.importEntrypoint` (see example).

## Parameters

▪ **wxt**: [`Wxt`](../../interfaces/Wxt.md)

The wxt instance provided by the module's setup function.

▪ **entrypoint**: [`Entrypoint`](../../type-aliases/Entrypoint.md)

The entrypoint to be bundled along with the extension.

## Returns

## Example

```ts
export default defineWxtModule(async (wxt, options) => {
    const entrypointPath = '/path/to/my-entrypoint.ts';
    addEntrypoint(wxt, {
      type: 'content-script',
      name: 'some-name',
      inputPath: entrypointPath,
      outputDir: wxt.config.outDir,
      options: await wxt.builder.importEntrypoint(entrypointPath),
    });
  });
```

## Source

[packages/wxt/src/modules.ts:56](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/modules.ts#L56)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

