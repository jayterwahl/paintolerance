<!--
Source: https://wxt.dev/api/reference/wxt/utils/inject-script/interfaces/InjectScriptResult.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../../../index.md) > [wxt/utils/inject-script](../index.md) > InjectScriptResult

# Interface: InjectScriptResult

## Contents

* [Properties](InjectScriptResult.md#properties)
  * [script](InjectScriptResult.md#script)

## Properties

### script

> **script**: `HTMLScriptElement`

The created script element. It can be used to e.g. send messages to the
script in the form of custom events. The script can add an event listener
for them via `document.currentScript`.

#### Source

[packages/wxt/src/utils/inject-script.ts:102](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/inject-script.ts#L102)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

