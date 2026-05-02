<!--
Source: https://wxt.dev/api/reference/wxt/utils/content-script-ui/types/interfaces/ContentScriptUi.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../../../../index.md) > [wxt/utils/content-script-ui/types](../index.md) > ContentScriptUi

# Interface: ContentScriptUi`<TMounted>`

## Contents

* [Extends](ContentScriptUi.md#extends)
* [Type parameters](ContentScriptUi.md#type-parameters)
* [Properties](ContentScriptUi.md#properties)
  * [autoMount](ContentScriptUi.md#automount)
  * [mount](ContentScriptUi.md#mount)
  * [mounted](ContentScriptUi.md#mounted)
  * [remove](ContentScriptUi.md#remove)

## Extends

* [`MountFunctions`](MountFunctions.md)

## Type parameters

▪ **TMounted**

## Properties

### autoMount

> **autoMount**: (`options`?) => `void`

Call `ui.autoMount()` to automatically mount and remove the UI as the
anchor is dynamically added/removed by the webpage.

#### Parameters

▪ **options?**: [`AutoMountOptions`](../type-aliases/AutoMountOptions.md)

#### Inherited from

[`MountFunctions`](MountFunctions.md).[`autoMount`](MountFunctions.md#automount)

#### Source

[packages/wxt/src/utils/content-script-ui/types.ts:120](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-ui/types.ts#L120)

***

### mount

> **mount**: () => `void`

Function that mounts or remounts the UI on the page.

#### Inherited from

[`MountFunctions`](MountFunctions.md).[`mount`](MountFunctions.md#mount)

#### Source

[packages/wxt/src/utils/content-script-ui/types.ts:109](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-ui/types.ts#L109)

***

### mounted

> **mounted**: `undefined` | `TMounted`

#### Source

[packages/wxt/src/utils/content-script-ui/types.ts:4](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-ui/types.ts#L4)

***

### remove

> **remove**: () => `void`

Function that removes the UI from the webpage.

#### Inherited from

[`MountFunctions`](MountFunctions.md).[`remove`](MountFunctions.md#remove)

#### Source

[packages/wxt/src/utils/content-script-ui/types.ts:112](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-ui/types.ts#L112)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

