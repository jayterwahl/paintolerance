<!--
Source: https://wxt.dev/api/reference/wxt/interfaces/CopiedPublicFile.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > CopiedPublicFile

# Interface: CopiedPublicFile

## Contents

* [Extends](CopiedPublicFile.md#extends)
* [Properties](CopiedPublicFile.md#properties)
  * [absoluteSrc](CopiedPublicFile.md#absolutesrc)
  * [relativeDest](CopiedPublicFile.md#relativedest)

## Extends

* [`ResolvedBasePublicFile`](ResolvedBasePublicFile.md)

## Properties

### absoluteSrc

> **absoluteSrc**: `string`

The absolute path to the file that will be copied to the output directory.

#### Example

```ts
'/path/to/any/file.css';
```

#### Source

[packages/wxt/src/types.ts:1736](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1736)

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

