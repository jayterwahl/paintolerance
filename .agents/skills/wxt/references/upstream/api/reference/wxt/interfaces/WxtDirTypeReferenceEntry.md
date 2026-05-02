<!--
Source: https://wxt.dev/api/reference/wxt/interfaces/WxtDirTypeReferenceEntry.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > WxtDirTypeReferenceEntry

# Interface: WxtDirTypeReferenceEntry

Represents type reference to a node module to be added to `.wxt/wxt.d.ts`
file

## Contents

* [Properties](WxtDirTypeReferenceEntry.md#properties)
  * [module](WxtDirTypeReferenceEntry.md#module)

## Properties

### module

> **module**: `string`

Specifies the module name that will be used in the `/// <reference
types="..." />` directive. This value will be added to the `.wxt/wxt.d.ts`
file to include type definitions from the specified module.

#### Source

[packages/wxt/src/types.ts:1765](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1765)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

