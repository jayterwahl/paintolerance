<!--
Source: https://wxt.dev/api/reference/wxt/utils/content-script-ui/shadow-root/type-aliases/ShadowRootContentScriptUiOptions.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../../../../index.md) > [wxt/utils/content-script-ui/shadow-root](../index.md) > ShadowRootContentScriptUiOptions

# Type alias: ShadowRootContentScriptUiOptions`<TMounted>`

> **ShadowRootContentScriptUiOptions**<`TMounted`>: [`ContentScriptUiOptions`](../../types/type-aliases/ContentScriptUiOptions.md)<`TMounted`> & `object`

## Type declaration

### css

> **css**?: `string`

Custom CSS text to apply to the UI. If your content script
imports/generates CSS and you've set `cssInjectionMode: "ui"`, the
imported CSS will be included automatically. You do not need to pass
those styles in here. This is for any additional styles not in the
imported CSS.

### inheritStyles

> **inheritStyles**?: `boolean`

By default, WXT adds `all: initial` to the shadow root before the rest of
your CSS. This resets any inheritable CSS styles that [normally pierce
the Shadow
DOM](https://open-wc.org/guides/knowledge/styling/styles-piercing-shadow-dom/).

WXT resets everything but:

* **`rem` Units**: they continue to scale based off the webpage's HTML
  `font-size`.
* **CSS Variables/Custom Properties**: CSS variables defined outside the
  shadow root can be accessed inside it.
* **`@font-face` Definitions**: Fonts defined outside the shadow root can
  be used inside it.

To disable this behavior and inherit styles from the webpage, set
`inheritStyles: true`.

#### Default

```ts
false
```

### isolateEvents

> **isolateEvents**?: `boolean` | `string`\[]

When enabled, `event.stopPropagation` will be called on events trying to
bubble out of the shadow root.

* Set to `true` to stop the propagation of a default set of events,
  `["keyup", "keydown", "keypress"]`
* Set to an array of event names to stop the propagation of a custom list
  of events

### mode

> **mode**?: `"open"` | `"closed"`

ShadowRoot's mode.

#### Default

```ts
'open'
```

#### See

https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/mode

### name

> **name**: `string`

The name of the custom component used to host the ShadowRoot. Must be
kebab-case.

### onMount

> **onMount**: (`uiContainer`, `shadow`, `shadowHost`) => `TMounted`

Callback executed when mounting the UI. This function should create and
append the UI to the `uiContainer` element. It is called every time
`ui.mount()` is called.

Optionally return a value that can be accessed at `ui.mounted` or in the
`onRemove` callback.

#### Parameters

▪ **uiContainer**: `HTMLElement`

▪ **shadow**: `ShadowRoot`

▪ **shadowHost**: `HTMLElement`

## Type parameters

| Parameter |
| :------ |
| `TMounted` |

## Source

[packages/wxt/src/utils/content-script-ui/shadow-root.ts:154](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-ui/shadow-root.ts#L154)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

