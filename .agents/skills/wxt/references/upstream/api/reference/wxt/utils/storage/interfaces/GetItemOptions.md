<!--
Source: https://wxt.dev/api/reference/wxt/utils/storage/interfaces/GetItemOptions.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../../../index.md) > [wxt/utils/storage](../index.md) > GetItemOptions

# Interface: GetItemOptions`<T>`

## Contents

* [Type parameters](GetItemOptions.md#type-parameters)
* [Properties](GetItemOptions.md#properties)
  * [defaultValue](GetItemOptions.md#defaultvalue)
  * [fallback](GetItemOptions.md#fallback)

## Type parameters

▪ **T**

## Properties

### defaultValue

> **defaultValue**?: `T`

#### Deprecated

Renamed to `fallback`, use it instead.

#### Source

packages/storage/dist/index.d.mts:184

***

### fallback

> **fallback**?: `T`

Default value returned when `getItem` would otherwise return `null`.

#### Source

packages/storage/dist/index.d.mts:186

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

