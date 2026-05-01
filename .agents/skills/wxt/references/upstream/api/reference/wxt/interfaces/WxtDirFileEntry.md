<!--
Source: https://wxt.dev/api/reference/wxt/interfaces/WxtDirFileEntry.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > WxtDirFileEntry

# Interface: WxtDirFileEntry

Represents a file to be written to the project's `.wxt/` directory.

## Contents

* [Properties](WxtDirFileEntry.md#properties)
  * [path](WxtDirFileEntry.md#path)
  * [text](WxtDirFileEntry.md#text)
  * [tsReference](WxtDirFileEntry.md#tsreference)

## Properties

### path

> **path**: `string`

Path relative to the `.wxt/` directory. So "tsconfig.json" would resolve to
".wxt/tsconfig.json".

#### Source

[packages/wxt/src/types.ts:1774](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1774)

***

### text

> **text**: `string`

The text that will be written to the file.

#### Source

[packages/wxt/src/types.ts:1776](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1776)

***

### tsReference

> **tsReference**?: `boolean`

Set to `true` to add a reference to this file in `.wxt/wxt.d.ts`.

#### Source

[packages/wxt/src/types.ts:1778](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1778)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

