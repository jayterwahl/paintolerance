<!--
Source: https://wxt.dev/api/reference/wxt/interfaces/IsolatedWorldContentScriptDefinition.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > IsolatedWorldContentScriptDefinition

# Interface: IsolatedWorldContentScriptDefinition

## Contents

* [Extends](IsolatedWorldContentScriptDefinition.md#extends)
* [Properties](IsolatedWorldContentScriptDefinition.md#properties)
  * [allFrames](IsolatedWorldContentScriptDefinition.md#allframes)
  * [cssInjectionMode](IsolatedWorldContentScriptDefinition.md#cssinjectionmode)
  * [exclude](IsolatedWorldContentScriptDefinition.md#exclude)
  * [excludeGlobs](IsolatedWorldContentScriptDefinition.md#excludeglobs)
  * [excludeMatches](IsolatedWorldContentScriptDefinition.md#excludematches)
  * [globalName](IsolatedWorldContentScriptDefinition.md#globalname)
  * [include](IsolatedWorldContentScriptDefinition.md#include)
  * [includeGlobs](IsolatedWorldContentScriptDefinition.md#includeglobs)
  * [matchAboutBlank](IsolatedWorldContentScriptDefinition.md#matchaboutblank)
  * [matchOriginAsFallback](IsolatedWorldContentScriptDefinition.md#matchoriginasfallback)
  * [matches](IsolatedWorldContentScriptDefinition.md#matches)
  * [registration](IsolatedWorldContentScriptDefinition.md#registration)
  * [runAt](IsolatedWorldContentScriptDefinition.md#runat)
  * [world](IsolatedWorldContentScriptDefinition.md#world)
* [Methods](IsolatedWorldContentScriptDefinition.md#methods)
  * [main()](IsolatedWorldContentScriptDefinition.md#main)

## Extends

* [`IsolatedWorldContentScriptEntrypointOptions`](IsolatedWorldContentScriptEntrypointOptions.md)

## Properties

### allFrames

> **allFrames**?: [`PerBrowserOption`](../type-aliases/PerBrowserOption.md)<`undefined` | `boolean`>

See https://developer.chrome.com/docs/extensions/mv3/content\_scripts/

#### Default

```ts
false
```

#### Inherited from

[`IsolatedWorldContentScriptEntrypointOptions`](IsolatedWorldContentScriptEntrypointOptions.md).[`allFrames`](IsolatedWorldContentScriptEntrypointOptions.md#allframes)

#### Source

[packages/wxt/src/types.ts:677](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L677)

***

### cssInjectionMode

> **cssInjectionMode**?: [`PerBrowserOption`](../type-aliases/PerBrowserOption.md)<`"manifest"` | `"manual"` | `"ui"`>

Customize how imported/generated styles are injected with the content
script. Regardless of the mode selected, CSS will always be built and
included in the output directory.

* `"manifest"` - Include the CSS in the manifest, under the content script's
  `css` array.
* `"manual"` - Exclude the CSS from the manifest. You are responsible for
  manually loading it onto the page. Use
  `browser.runtime.getURL("content-scripts/<name>.css")` to get the file's
  URL
* `"ui"` - Exclude the CSS from the manifest. CSS will be automatically added
  to your UI when calling `createShadowRootUi`

#### Default

```ts
'manifest'
```

#### Inherited from

[`IsolatedWorldContentScriptEntrypointOptions`](IsolatedWorldContentScriptEntrypointOptions.md).[`cssInjectionMode`](IsolatedWorldContentScriptEntrypointOptions.md#cssinjectionmode)

#### Source

[packages/wxt/src/types.ts:700](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L700)

***

### exclude

> **exclude**?: `string`\[]

List of target browsers to exclude this entrypoint from. Cannot be used
with `include`. You must choose one of the two options.

#### Default

```ts
undefined
```

#### Inherited from

[`IsolatedWorldContentScriptEntrypointOptions`](IsolatedWorldContentScriptEntrypointOptions.md).[`exclude`](IsolatedWorldContentScriptEntrypointOptions.md#exclude)

#### Source

[packages/wxt/src/types.ts:595](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L595)

***

### excludeGlobs

> **excludeGlobs**?: [`PerBrowserOption`](../type-aliases/PerBrowserOption.md)<`undefined` | `string`\[]>

See https://developer.chrome.com/docs/extensions/mv3/content\_scripts/

#### Default

```ts
[ ]
```

#### Inherited from

[`IsolatedWorldContentScriptEntrypointOptions`](IsolatedWorldContentScriptEntrypointOptions.md).[`excludeGlobs`](IsolatedWorldContentScriptEntrypointOptions.md#excludeglobs)

#### Source

[packages/wxt/src/types.ts:671](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L671)

***

### excludeMatches

> **excludeMatches**?: [`PerBrowserOption`](../type-aliases/PerBrowserOption.md)<`undefined` | `string`\[]>

See https://developer.chrome.com/docs/extensions/mv3/content\_scripts/

#### Default

```ts
[ ]
```

#### Inherited from

[`IsolatedWorldContentScriptEntrypointOptions`](IsolatedWorldContentScriptEntrypointOptions.md).[`excludeMatches`](IsolatedWorldContentScriptEntrypointOptions.md#excludematches)

#### Source

[packages/wxt/src/types.ts:659](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L659)

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

[`IsolatedWorldContentScriptEntrypointOptions`](IsolatedWorldContentScriptEntrypointOptions.md).[`globalName`](IsolatedWorldContentScriptEntrypointOptions.md#globalname)

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

[`IsolatedWorldContentScriptEntrypointOptions`](IsolatedWorldContentScriptEntrypointOptions.md).[`include`](IsolatedWorldContentScriptEntrypointOptions.md#include)

#### Source

[packages/wxt/src/types.ts:588](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L588)

***

### includeGlobs

> **includeGlobs**?: [`PerBrowserOption`](../type-aliases/PerBrowserOption.md)<`undefined` | `string`\[]>

See https://developer.chrome.com/docs/extensions/mv3/content\_scripts/

#### Default

```ts
[ ]
```

#### Inherited from

[`IsolatedWorldContentScriptEntrypointOptions`](IsolatedWorldContentScriptEntrypointOptions.md).[`includeGlobs`](IsolatedWorldContentScriptEntrypointOptions.md#includeglobs)

#### Source

[packages/wxt/src/types.ts:665](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L665)

***

### matchAboutBlank

> **matchAboutBlank**?: [`PerBrowserOption`](../type-aliases/PerBrowserOption.md)<`undefined` | `boolean`>

See https://developer.chrome.com/docs/extensions/mv3/content\_scripts/

#### Default

```ts
false
```

#### Inherited from

[`IsolatedWorldContentScriptEntrypointOptions`](IsolatedWorldContentScriptEntrypointOptions.md).[`matchAboutBlank`](IsolatedWorldContentScriptEntrypointOptions.md#matchaboutblank)

#### Source

[packages/wxt/src/types.ts:651](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L651)

***

### matchOriginAsFallback

> **matchOriginAsFallback**?: [`PerBrowserOption`](../type-aliases/PerBrowserOption.md)<`boolean`>

See https://developer.chrome.com/docs/extensions/mv3/content\_scripts/

#### Default

```ts
false
```

#### Inherited from

[`IsolatedWorldContentScriptEntrypointOptions`](IsolatedWorldContentScriptEntrypointOptions.md).[`matchOriginAsFallback`](IsolatedWorldContentScriptEntrypointOptions.md#matchoriginasfallback)

#### Source

[packages/wxt/src/types.ts:683](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L683)

***

### matches

> **matches**?: [`PerBrowserOption`](../type-aliases/PerBrowserOption.md)<`string`\[]>

#### Inherited from

[`IsolatedWorldContentScriptEntrypointOptions`](IsolatedWorldContentScriptEntrypointOptions.md).[`matches`](IsolatedWorldContentScriptEntrypointOptions.md#matches)

#### Source

[packages/wxt/src/types.ts:639](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L639)

***

### registration

> **registration**?: [`PerBrowserOption`](../type-aliases/PerBrowserOption.md)<`"runtime"` | `"manifest"`>

Specify how the content script is registered.

* `"manifest"`: The content script will be added to the `content_scripts`
  entry in the manifest. This is the normal and most well known way of
  registering a content script.
* `"runtime"`: The content script's `matches` is added to `host_permissions`
  and you are responsible for using the scripting API to register/execute
  the content script dynamically at runtime.

#### Default

```ts
'manifest'
```

#### Inherited from

[`IsolatedWorldContentScriptEntrypointOptions`](IsolatedWorldContentScriptEntrypointOptions.md).[`registration`](IsolatedWorldContentScriptEntrypointOptions.md#registration)

#### Source

[packages/wxt/src/types.ts:713](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L713)

***

### runAt

> **runAt**?: [`PerBrowserOption`](../type-aliases/PerBrowserOption.md)<`undefined` | `RunAt`>

See https://developer.chrome.com/docs/extensions/mv3/content\_scripts/

#### Default

```ts
'documentIdle'
```

#### Inherited from

[`IsolatedWorldContentScriptEntrypointOptions`](IsolatedWorldContentScriptEntrypointOptions.md).[`runAt`](IsolatedWorldContentScriptEntrypointOptions.md#runat)

#### Source

[packages/wxt/src/types.ts:645](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L645)

***

### world

> **world**?: `"ISOLATED"`

See
https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts#isolated\_world

#### Default

```ts
'ISOLATED'
```

#### Inherited from

[`IsolatedWorldContentScriptEntrypointOptions`](IsolatedWorldContentScriptEntrypointOptions.md).[`world`](IsolatedWorldContentScriptEntrypointOptions.md#world)

#### Source

[packages/wxt/src/types.ts:731](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L731)

## Methods

### main()

> **main**(`ctx`): `any`

Main function executed when the content script is loaded.

When running a content script with `browser.scripting.executeScript`,
values returned from this function will be returned in the `executeScript`
result as well. Otherwise returning a value does nothing.

#### Parameters

▪ **ctx**: [`ContentScriptContext`](../utils/content-script-context/classes/ContentScriptContext.md)

#### Source

[packages/wxt/src/types.ts:921](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L921)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

