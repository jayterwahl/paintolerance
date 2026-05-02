<!--
Source: https://wxt.dev/api/reference/wxt/utils/content-script-ui/types/interfaces/MountFunctions.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../../../../index.md) > [wxt/utils/content-script-ui/types](../index.md) > MountFunctions

# Interface: MountFunctions

## Contents

* [Extends](MountFunctions.md#extends)
* [Properties](MountFunctions.md#properties)
  * [autoMount](MountFunctions.md#automount)
  * [mount](MountFunctions.md#mount)
  * [remove](MountFunctions.md#remove)

## Extends

* [`BaseMountFunctions`](BaseMountFunctions.md)

## Properties

### autoMount

> **autoMount**: (`options`?) => `void`

Call `ui.autoMount()` to automatically mount and remove the UI as the
anchor is dynamically added/removed by the webpage.

#### Parameters

▪ **options?**: [`AutoMountOptions`](../type-aliases/AutoMountOptions.md)

#### Source

[packages/wxt/src/utils/content-script-ui/types.ts:120](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-ui/types.ts#L120)

***

### mount

> **mount**: () => `void`

Function that mounts or remounts the UI on the page.

#### Inherited from

[`BaseMountFunctions`](BaseMountFunctions.md).[`mount`](BaseMountFunctions.md#mount)

#### Source

[packages/wxt/src/utils/content-script-ui/types.ts:109](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-ui/types.ts#L109)

***

### remove

> **remove**: () => `void`

Function that removes the UI from the webpage.

#### Inherited from

[`BaseMountFunctions`](BaseMountFunctions.md).[`remove`](BaseMountFunctions.md#remove)

#### Source

[packages/wxt/src/utils/content-script-ui/types.ts:112](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-ui/types.ts#L112)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

