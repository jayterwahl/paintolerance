<!--
Source: https://wxt.dev/api/reference/wxt/utils/define-app-config/functions/defineAppConfig.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../../../index.md) > [wxt/utils/define-app-config](../index.md) > defineAppConfig

# Function: defineAppConfig()

> **defineAppConfig**(`config`): [`WxtAppConfig`](../interfaces/WxtAppConfig.md)

Runtime app config defined in `<srcDir>/app.config.ts`.

You can add fields to this interface via ["Module
Augmentation"](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation):

```ts
// app.config.ts
import 'wxt/utils/define-app-config';

declare module 'wxt/utils/define-app-config' {
  export interface WxtAppConfig {
    analytics: AnalyticsConfig;
  }
}
```

## Parameters

▪ **config**: [`WxtAppConfig`](../interfaces/WxtAppConfig.md)

## Source

[packages/wxt/src/utils/define-app-config.ts:21](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/define-app-config.ts#L21)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

