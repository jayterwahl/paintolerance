<!--
Source: https://wxt.dev/api/reference/wxt/utils/split-shadow-root-css/functions/splitShadowRootCss.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../../../index.md) > [wxt/utils/split-shadow-root-css](../index.md) > splitShadowRootCss

# Function: splitShadowRootCss()

> **splitShadowRootCss**(`css`): `object`

Given a CSS string that will be loaded into a shadow root, split it into two
parts:

* `documentCss`: CSS that needs to be applied to the document (like
  `@property`)
* `shadowCss`: CSS that needs to be applied to the shadow root

## Parameters

▪ **css**: `string`

## Returns

> ### documentCss
>
> > **documentCss**: `string`
>
> ### shadowCss
>
> > **shadowCss**: `string`

## Source

[packages/wxt/src/utils/split-shadow-root-css.ts:15](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/split-shadow-root-css.ts#L15)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

