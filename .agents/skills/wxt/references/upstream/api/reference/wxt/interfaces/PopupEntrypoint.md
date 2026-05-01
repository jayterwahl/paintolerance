<!--
Source: https://wxt.dev/api/reference/wxt/interfaces/PopupEntrypoint.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > PopupEntrypoint

# Interface: PopupEntrypoint

## Contents

* [Extends](PopupEntrypoint.md#extends)
* [Properties](PopupEntrypoint.md#properties)
  * [inputPath](PopupEntrypoint.md#inputpath)
  * [name](PopupEntrypoint.md#name)
  * [options](PopupEntrypoint.md#options)
  * [outputDir](PopupEntrypoint.md#outputdir)
  * [skipped](PopupEntrypoint.md#skipped)
  * [type](PopupEntrypoint.md#type)

## Extends

* [`BaseEntrypoint`](BaseEntrypoint.md)

## Properties

### inputPath

> **inputPath**: `string`

Absolute path to the entrypoint's input file.

#### Inherited from

[`BaseEntrypoint`](BaseEntrypoint.md).[`inputPath`](BaseEntrypoint.md#inputpath)

#### Source

[packages/wxt/src/types.ts:830](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L830)

***

### name

> **name**: `string`

The entrypoint's name. This is the filename or dirname without the type
suffix.

Examples:

* `popup.html` → `popup`
* `options/index.html` → `options`
* `named.sandbox.html` → `named`
* `named.sandbox/index.html` → `named`
* `sandbox.html` → `sandbox`
* `sandbox/index.html` → `sandbox`
* `overlay.content.ts` → `overlay`
* `overlay.content/index.ts` → `overlay`

The name is used when generating an output file:
`<entrypoint.outputDir>/<entrypoint.name>.<ext>`

#### Inherited from

[`BaseEntrypoint`](BaseEntrypoint.md).[`name`](BaseEntrypoint.md#name)

#### Source

[packages/wxt/src/types.ts:828](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L828)

***

### options

> **options**: [`ResolvedPerBrowserOptions`](../type-aliases/ResolvedPerBrowserOptions.md)<[`PopupEntrypointOptions`](PopupEntrypointOptions.md), `"defaultIcon"`>

#### Source

[packages/wxt/src/types.ts:880](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L880)

***

### outputDir

> **outputDir**: `string`

Absolute path to the entrypoint's output directory. Can be
`wxt.config.outDir` or a subdirectory of it.

#### Inherited from

[`BaseEntrypoint`](BaseEntrypoint.md).[`outputDir`](BaseEntrypoint.md#outputdir)

#### Source

[packages/wxt/src/types.ts:835](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L835)

***

### skipped

> **skipped**?: `boolean`

When true, the entrypoint will not be built by WXT. Normally this is set
based on the `filterEntrypoints` config or the entrypoint's
`include`/`exclude` options defined inside the file.

See
https://wxt.dev/guide/essentials/target-different-browsers.html#filtering-entrypoints

#### Inherited from

[`BaseEntrypoint`](BaseEntrypoint.md).[`skipped`](BaseEntrypoint.md#skipped)

#### Source

[packages/wxt/src/types.ts:844](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L844)

***

### type

> **type**: `"popup"`

#### Source

[packages/wxt/src/types.ts:879](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L879)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

