<!--
Source: https://wxt.dev/api/reference/wxt/interfaces/UnlistedScriptDefinition.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > UnlistedScriptDefinition

# Interface: UnlistedScriptDefinition

## Contents

* [Extends](UnlistedScriptDefinition.md#extends)
* [Properties](UnlistedScriptDefinition.md#properties)
  * [exclude](UnlistedScriptDefinition.md#exclude)
  * [globalName](UnlistedScriptDefinition.md#globalname)
  * [include](UnlistedScriptDefinition.md#include)
* [Methods](UnlistedScriptDefinition.md#methods)
  * [main()](UnlistedScriptDefinition.md#main)

## Extends

* [`BaseScriptEntrypointOptions`](BaseScriptEntrypointOptions.md)

## Properties

### exclude

> **exclude**?: `string`\[]

List of target browsers to exclude this entrypoint from. Cannot be used
with `include`. You must choose one of the two options.

#### Default

```ts
undefined
```

#### Inherited from

[`BaseScriptEntrypointOptions`](BaseScriptEntrypointOptions.md).[`exclude`](BaseScriptEntrypointOptions.md#exclude)

#### Source

[packages/wxt/src/types.ts:595](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L595)

***

### globalName

> **globalName**?: `string` | `boolean` | (`entrypoint`) => `string`

The variable name for the IIFE in the output bundle.

This option is relevant for scripts inserted into the page context where
the default IIFE variable name may conflict with an existing variable on
the target page. This applies to content scripts with world=MAIN, and
others, such as unlisted scripts, that could be dynamically injected into
the page with a `<script>`  tag.

Available options:

* `true`: automatically generate a name for the IIFE based on the entrypoint
  name
* `false`: Output the IIFE without a variable name, making it anonymous. This
  is the safest option to avoid conflicts with existing variables on the
  page. This will become the default in a future version of WXT.
* `string`: Use the provided string as the global variable name.
* `function`: A function that receives the entrypoint and returns a string to
  use as the variable name.

#### Default

```ts
true
```

#### Inherited from

[`BaseScriptEntrypointOptions`](BaseScriptEntrypointOptions.md).[`globalName`](BaseScriptEntrypointOptions.md#globalname)

#### Source

[packages/wxt/src/types.ts:635](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L635)

***

### include

> **include**?: `string`\[]

List of target browsers to include this entrypoint in. Defaults to being
included in all builds. Cannot be used with `exclude`. You must choose one
of the two options.

#### Default

```ts
undefined
```

#### Inherited from

[`BaseScriptEntrypointOptions`](BaseScriptEntrypointOptions.md).[`include`](BaseScriptEntrypointOptions.md#include)

#### Source

[packages/wxt/src/types.ts:588](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L588)

## Methods

### main()

> **main**(): `any`

Main function executed when the unlisted script is ran.

When running a content script with `browser.scripting.executeScript`,
values returned from this function will be returned in the `executeScript`
result as well. Otherwise returning a value does nothing.

#### Source

[packages/wxt/src/types.ts:955](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L955)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

