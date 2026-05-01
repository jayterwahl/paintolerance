<!--
Source: https://wxt.dev/api/reference/wxt/type-aliases/WxtResolvedUnimportOptions.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > WxtResolvedUnimportOptions

# Type alias: WxtResolvedUnimportOptions

> **WxtResolvedUnimportOptions**: `Partial`<`UnimportOptions`> & `object`

## Type declaration

### disabled

> **disabled**: `boolean`

Set to `true` when the user disabled auto-imports. We still use unimport
for the #imports module, but other features should be disabled.

You don't need to check this value before modifying the auto-import
options. Even if `disabled` is `true`, there's no harm in adding imports to
the config - they'll just be ignored.

### eslintrc

> **eslintrc**: [`ResolvedEslintrc`](../interfaces/ResolvedEslintrc.md)

## Source

[packages/wxt/src/types.ts:1629](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1629)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

