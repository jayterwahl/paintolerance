<!--
Source: https://wxt.dev/api/reference/wxt/utils/content-script-ui/types/interfaces/ContentScriptAnchoredOptions.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../../../../index.md) > [wxt/utils/content-script-ui/types](../index.md) > ContentScriptAnchoredOptions

# Interface: ContentScriptAnchoredOptions

## Contents

* [Properties](ContentScriptAnchoredOptions.md#properties)
  * [anchor](ContentScriptAnchoredOptions.md#anchor)
  * [append](ContentScriptAnchoredOptions.md#append)

## Properties

### anchor

> **anchor**?: `null` | `string` | `Element` | () => `undefined` | `null` | `string` | `Element`

A CSS selector, XPath expression, element, or function that returns one of
the three. Along with `append`, the `anchor` dictates where in the page the
UI will be added.

#### Source

[packages/wxt/src/utils/content-script-ui/types.ts:87](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-ui/types.ts#L87)

***

### append

> **append**?: [`ContentScriptAppendMode`](../type-aliases/ContentScriptAppendMode.md) | (`anchor`, `ui`) => `void`

In combination with `anchor`, decide how to add the UI to the DOM.

* `"last"` (default) - Add the UI as the last child of the `anchor` element
* `"first"` - Add the UI as the first child of the `anchor` element
* `"replace"` - Replace the `anchor` element with the UI.
* `"before"` - Add the UI as the sibling before the `anchor` element
* `"after"` - Add the UI as the sibling after the `anchor` element
* `(anchor, ui) => void` - Customizable function that let's you add the UI to
  the DOM

#### Source

[packages/wxt/src/utils/content-script-ui/types.ts:104](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-ui/types.ts#L104)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

