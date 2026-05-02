<!--
Source: https://wxt.dev/api/reference/wxt/utils/content-script-ui/types/interfaces/ContentScriptOverlayPositioningOptions.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../../../../index.md) > [wxt/utils/content-script-ui/types](../index.md) > ContentScriptOverlayPositioningOptions

# Interface: ContentScriptOverlayPositioningOptions

## Contents

* [Properties](ContentScriptOverlayPositioningOptions.md#properties)
  * [alignment](ContentScriptOverlayPositioningOptions.md#alignment)
  * [position](ContentScriptOverlayPositioningOptions.md#position)
  * [zIndex](ContentScriptOverlayPositioningOptions.md#zindex)

## Properties

### alignment

> **alignment**?: [`ContentScriptOverlayAlignment`](../type-aliases/ContentScriptOverlayAlignment.md)

When using `type: "overlay"`, the mounted element is 0px by 0px in size.
Alignment specifies which corner is aligned with that 0x0 pixel space.

[Visualization of alignment
options](https://wxt.dev/content-script-ui-alignment.png)

#### Default

```ts
'top-left'
```

#### Source

[packages/wxt/src/utils/content-script-ui/types.ts:58](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-ui/types.ts#L58)

***

### position

> **position**: `"overlay"`

#### Source

[packages/wxt/src/utils/content-script-ui/types.ts:43](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-ui/types.ts#L43)

***

### zIndex

> **zIndex**?: `number`

The `z-index` used on the `wrapper` element. Set to a positive number to
show your UI over website content.

#### Source

[packages/wxt/src/utils/content-script-ui/types.ts:48](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-ui/types.ts#L48)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

