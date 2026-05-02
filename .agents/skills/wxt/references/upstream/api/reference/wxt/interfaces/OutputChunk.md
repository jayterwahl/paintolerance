<!--
Source: https://wxt.dev/api/reference/wxt/interfaces/OutputChunk.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > OutputChunk

# Interface: OutputChunk

## Contents

* [Properties](OutputChunk.md#properties)
  * [fileName](OutputChunk.md#filename)
  * [moduleIds](OutputChunk.md#moduleids)
  * [type](OutputChunk.md#type)

## Properties

### fileName

> **fileName**: `string`

Relative, normalized path relative to the output directory.

Ex: "content-scripts/overlay.js"

#### Source

[packages/wxt/src/types.ts:495](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L495)

***

### moduleIds

> **moduleIds**: `string`\[]

Absolute, normalized paths to all dependencies this chunk relies on.

#### Source

[packages/wxt/src/types.ts:497](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L497)

***

### type

> **type**: `"chunk"`

#### Source

[packages/wxt/src/types.ts:489](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L489)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

