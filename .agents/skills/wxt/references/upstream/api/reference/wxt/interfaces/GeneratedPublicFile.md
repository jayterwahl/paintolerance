<!--
Source: https://wxt.dev/api/reference/wxt/interfaces/GeneratedPublicFile.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > GeneratedPublicFile

# Interface: GeneratedPublicFile

## Contents

* [Extends](GeneratedPublicFile.md#extends)
* [Properties](GeneratedPublicFile.md#properties)
  * [contents](GeneratedPublicFile.md#contents)
  * [relativeDest](GeneratedPublicFile.md#relativedest)

## Extends

* [`ResolvedBasePublicFile`](ResolvedBasePublicFile.md)

## Properties

### contents

> **contents**: `string`

Text to write to the file.

#### Source

[packages/wxt/src/types.ts:1741](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1741)

***

### relativeDest

> **relativeDest**: `string`

The relative path in the output directory to copy the file to.

#### Example

```ts
'content-scripts/base-styles.css';
```

#### Inherited from

[`ResolvedBasePublicFile`](ResolvedBasePublicFile.md).[`relativeDest`](ResolvedBasePublicFile.md#relativedest)

#### Source

[packages/wxt/src/types.ts:1726](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1726)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

