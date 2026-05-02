<!--
Source: https://wxt.dev/api/reference/wxt/utils/content-script-ui/shadow-root/interfaces/ShadowRootContentScriptUi.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../../../../index.md) > [wxt/utils/content-script-ui/shadow-root](../index.md) > ShadowRootContentScriptUi

# Interface: ShadowRootContentScriptUi`<TMounted>`

## Contents

* [Extends](ShadowRootContentScriptUi.md#extends)
* [Type parameters](ShadowRootContentScriptUi.md#type-parameters)
* [Properties](ShadowRootContentScriptUi.md#properties)
  * [autoMount](ShadowRootContentScriptUi.md#automount)
  * [mount](ShadowRootContentScriptUi.md#mount)
  * [mounted](ShadowRootContentScriptUi.md#mounted)
  * [remove](ShadowRootContentScriptUi.md#remove)
  * [shadow](ShadowRootContentScriptUi.md#shadow)
  * [shadowHost](ShadowRootContentScriptUi.md#shadowhost)
  * [uiContainer](ShadowRootContentScriptUi.md#uicontainer)

## Extends

* [`ContentScriptUi`](../../types/interfaces/ContentScriptUi.md)<`TMounted`>

## Type parameters

▪ **TMounted**

## Properties

### autoMount

> **autoMount**: (`options`?) => `void`

Call `ui.autoMount()` to automatically mount and remove the UI as the
anchor is dynamically added/removed by the webpage.

#### Parameters

▪ **options?**: [`AutoMountOptions`](../../types/type-aliases/AutoMountOptions.md)

#### Inherited from

[`ContentScriptUi`](../../types/interfaces/ContentScriptUi.md).[`autoMount`](../../types/interfaces/ContentScriptUi.md#automount)

#### Source

[packages/wxt/src/utils/content-script-ui/types.ts:120](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-ui/types.ts#L120)

***

### mount

> **mount**: () => `void`

Function that mounts or remounts the UI on the page.

#### Inherited from

[`ContentScriptUi`](../../types/interfaces/ContentScriptUi.md).[`mount`](../../types/interfaces/ContentScriptUi.md#mount)

#### Source

[packages/wxt/src/utils/content-script-ui/types.ts:109](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-ui/types.ts#L109)

***

### mounted

> **mounted**: `undefined` | `TMounted`

#### Inherited from

[`ContentScriptUi`](../../types/interfaces/ContentScriptUi.md).[`mounted`](../../types/interfaces/ContentScriptUi.md#mounted)

#### Source

[packages/wxt/src/utils/content-script-ui/types.ts:4](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-ui/types.ts#L4)

***

### remove

> **remove**: () => `void`

Function that removes the UI from the webpage.

#### Inherited from

[`ContentScriptUi`](../../types/interfaces/ContentScriptUi.md).[`remove`](../../types/interfaces/ContentScriptUi.md#remove)

#### Source

[packages/wxt/src/utils/content-script-ui/types.ts:112](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-ui/types.ts#L112)

***

### shadow

> **shadow**: `ShadowRoot`

The shadow root performing the isolation.

#### Source

[packages/wxt/src/utils/content-script-ui/shadow-root.ts:151](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-ui/shadow-root.ts#L151)

***

### shadowHost

> **shadowHost**: `HTMLElement`

The `HTMLElement` hosting the shadow root used to isolate the UI's styles.
This is the element that get's added to the DOM. This element's style is
not isolated from the webpage.

#### Source

[packages/wxt/src/utils/content-script-ui/shadow-root.ts:144](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-ui/shadow-root.ts#L144)

***

### uiContainer

> **uiContainer**: `HTMLElement`

The container element inside the `ShadowRoot` whose styles are isolated.
The UI is mounted inside this `HTMLElement`.

#### Source

[packages/wxt/src/utils/content-script-ui/shadow-root.ts:149](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-ui/shadow-root.ts#L149)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

