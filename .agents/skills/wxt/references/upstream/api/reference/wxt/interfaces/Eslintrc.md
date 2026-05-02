<!--
Source: https://wxt.dev/api/reference/wxt/interfaces/Eslintrc.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > Eslintrc

# Interface: Eslintrc

## Contents

* [Properties](Eslintrc.md#properties)
  * [enabled](Eslintrc.md#enabled)
  * [filePath](Eslintrc.md#filepath)
  * [globalsPropValue](Eslintrc.md#globalspropvalue)

## Properties

### enabled

> **enabled**?: `boolean` | `8` | `9` | `"auto"`

When true, generates a file that can be used by ESLint to know which
variables are valid globals.

* `false`: Don't generate the file.
* `'auto'`: Check if eslint is installed, and if it is, generate a compatible
  config file.
* `true`: Same as `8`.
* `8`: Generate a config file compatible with ESLint 8.
* `9`: Generate a config file compatible with ESLint 9.

#### Default

```ts
'auto'
```

#### Source

[packages/wxt/src/types.ts:1595](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1595)

***

### filePath

> **filePath**?: `string`

File path to save the generated eslint config.

Default depends on version of ESLint used:

* 9 and above: './.wxt/eslint-auto-imports.mjs'
* 8 and below: './.wxt/eslintrc-auto-import.json'

#### Source

[packages/wxt/src/types.ts:1604](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1604)

***

### globalsPropValue

> **globalsPropValue**?: [`EslintGlobalsPropValue`](../type-aliases/EslintGlobalsPropValue.md)

#### Default

```ts
true
```

#### Source

[packages/wxt/src/types.ts:1606](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1606)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

