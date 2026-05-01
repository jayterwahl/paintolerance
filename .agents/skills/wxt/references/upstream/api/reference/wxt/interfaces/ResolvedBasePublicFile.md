<!--
Source: https://wxt.dev/api/reference/wxt/interfaces/ResolvedBasePublicFile.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > ResolvedBasePublicFile

# Interface: ResolvedBasePublicFile

## Contents

* [Extended By](ResolvedBasePublicFile.md#extended-by)
* [Properties](ResolvedBasePublicFile.md#properties)
  * [relativeDest](ResolvedBasePublicFile.md#relativedest)

## Extended By

* [`CopiedPublicFile`](CopiedPublicFile.md)
* [`GeneratedPublicFile`](GeneratedPublicFile.md)

## Properties

### relativeDest

> **relativeDest**: `string`

The relative path in the output directory to copy the file to.

#### Example

```ts
'content-scripts/base-styles.css';
```

#### Source

[packages/wxt/src/types.ts:1726](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1726)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

