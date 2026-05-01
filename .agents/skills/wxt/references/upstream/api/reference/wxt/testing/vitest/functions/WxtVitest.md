<!--
Source: https://wxt.dev/api/reference/wxt/testing/vitest/functions/WxtVitest.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../../../index.md) > [wxt/testing/vitest](../index.md) > WxtVitest

# Function: WxtVitest()

> **WxtVitest**(`inlineConfig`?): `Promise`<`vite.PluginOption`\[]>

Vite plugin that configures Vitest with everything required to test a WXT
extension, based on the `<root>/wxt.config.ts`

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import { WxtVitest } from 'wxt/testing/vitest-plugin';

export default defineConfig({
  plugins: [WxtVitest()],
});
```

## Parameters

▪ **inlineConfig?**: [`InlineConfig`](../../../interfaces/InlineConfig.md)

Customize WXT's config for testing. Any config specified
here overrides the config from your `wxt.config.ts` file.

## Source

[packages/wxt/src/testing/wxt-vitest-plugin.ts:37](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/testing/wxt-vitest-plugin.ts#L37)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

