<!--
Source: https://wxt.dev/api/reference/wxt/type-aliases/WxtUnimportOptions.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > WxtUnimportOptions

# Type alias: WxtUnimportOptions

> **WxtUnimportOptions**: `Partial`<`UnimportOptions`> & `object`

## Type declaration

### eslintrc

> **eslintrc**?: [`Eslintrc`](../interfaces/Eslintrc.md)

When using ESLint, auto-imported variables are linted as "undeclared
globals". This option lets you configure a base eslintrc that, when
extended, fixes these lint errors.

See
<https://wxt.dev/guide/key-concepts/auto-imports.html#eslint>

## Source

[packages/wxt/src/types.ts:1617](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1617)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

