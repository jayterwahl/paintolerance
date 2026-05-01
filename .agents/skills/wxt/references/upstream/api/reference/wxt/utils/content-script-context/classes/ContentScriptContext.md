<!--
Source: https://wxt.dev/api/reference/wxt/utils/content-script-context/classes/ContentScriptContext.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../../../index.md) > [wxt/utils/content-script-context](../index.md) > ContentScriptContext

# Class: ContentScriptContext

Implements
[`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController).
Used to detect and stop content script code when the script is invalidated.

It also provides several utilities like `ctx.setTimeout` and
`ctx.setInterval` that should be used in content scripts instead of
`window.setTimeout` or `window.setInterval`.

To create context for testing, you can use the class's constructor:

```ts
import { ContentScriptContext } from 'wxt/utils/content-scripts-context';

test('storage listener should be removed when context is invalidated', () => {
  const ctx = new ContentScriptContext('test');
  const item = storage.defineItem('local:count', { defaultValue: 0 });
  const watcher = vi.fn();

  const unwatch = item.watch(watcher);
  ctx.onInvalidated(unwatch); // Listen for invalidate here

  await item.setValue(1);
  expect(watcher).toBeCalledTimes(1);
  expect(watcher).toBeCalledWith(1, 0);

  ctx.notifyInvalidated(); // Use this function to invalidate the context
  await item.setValue(2);
  expect(watcher).toBeCalledTimes(1);
});
```

## Contents

* [Implements](ContentScriptContext.md#implements)
* [Constructors](ContentScriptContext.md#constructors)
  * [new ContentScriptContext(contentScriptName, options)](ContentScriptContext.md#new-contentscriptcontextcontentscriptname-options)
* [Properties](ContentScriptContext.md#properties)
  * [abortController](ContentScriptContext.md#abortcontroller)
  * [contentScriptName](ContentScriptContext.md#contentscriptname)
  * [id](ContentScriptContext.md#id)
  * [locationWatcher](ContentScriptContext.md#locationwatcher)
  * [options](ContentScriptContext.md#options)
  * [SCRIPT\_STARTED\_MESSAGE\_TYPE](ContentScriptContext.md#script-started-message-type)
* [Accessors](ContentScriptContext.md#accessors)
  * [isInvalid](ContentScriptContext.md#isinvalid)
  * [isValid](ContentScriptContext.md#isvalid)
  * [signal](ContentScriptContext.md#signal)
* [Methods](ContentScriptContext.md#methods)
  * [abort()](ContentScriptContext.md#abort)
  * [addEventListener()](ContentScriptContext.md#addeventlistener)
  * [block()](ContentScriptContext.md#block)
  * [listenForNewerScripts()](ContentScriptContext.md#listenfornewerscripts)
  * [notifyInvalidated()](ContentScriptContext.md#notifyinvalidated)
  * [onInvalidated()](ContentScriptContext.md#oninvalidated)
  * [requestAnimationFrame()](ContentScriptContext.md#requestanimationframe)
  * [requestIdleCallback()](ContentScriptContext.md#requestidlecallback)
  * [setInterval()](ContentScriptContext.md#setinterval)
  * [setTimeout()](ContentScriptContext.md#settimeout)
  * [stopOldScripts()](ContentScriptContext.md#stopoldscripts)
  * [verifyScriptStartedEvent()](ContentScriptContext.md#verifyscriptstartedevent)

## Implements

* `AbortController`

## Constructors

### new ContentScriptContext(contentScriptName, options)

> **new ContentScriptContext**(`contentScriptName`, `options`?): [`ContentScriptContext`](ContentScriptContext.md)

#### Parameters

▪ **contentScriptName**: `string`

▪ **options?**: `Omit`<[`ContentScriptDefinition`](../../../type-aliases/ContentScriptDefinition.md), `"main"`>

#### Source

[packages/wxt/src/utils/content-script-context.ts:52](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-context.ts#L52)

## Properties

### abortController

> **`private`** **abortController**: `AbortController`

#### Source

[packages/wxt/src/utils/content-script-context.ts:49](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-context.ts#L49)

***

### contentScriptName

> **`private`** **`readonly`** **contentScriptName**: `string`

#### Source

[packages/wxt/src/utils/content-script-context.ts:53](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-context.ts#L53)

***

### id

> **`private`** **id**: `string`

#### Source

[packages/wxt/src/utils/content-script-context.ts:48](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-context.ts#L48)

***

### locationWatcher

> **`private`** **locationWatcher**: `object`

#### Type declaration

##### run()

Ensure the location watcher is actively looking for URL changes. If it's
already watching, this is a noop.

#### Source

[packages/wxt/src/utils/content-script-context.ts:50](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-context.ts#L50)

***

### options

> **`readonly`** **options**?: `Omit`<[`ContentScriptDefinition`](../../../type-aliases/ContentScriptDefinition.md), `"main"`>

#### Source

[packages/wxt/src/utils/content-script-context.ts:54](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-context.ts#L54)

***

### SCRIPT\_STARTED\_MESSAGE\_TYPE

> **`private`** **`static`** **SCRIPT\_STARTED\_MESSAGE\_TYPE**: `string`

#### Source

[packages/wxt/src/utils/content-script-context.ts:44](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-context.ts#L44)

## Accessors

### isInvalid

> **`get`** **isInvalid**(): `boolean`

#### Source

[packages/wxt/src/utils/content-script-context.ts:71](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-context.ts#L71)

***

### isValid

> **`get`** **isValid**(): `boolean`

#### Source

[packages/wxt/src/utils/content-script-context.ts:78](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-context.ts#L78)

***

### signal

> **`get`** **signal**(): `AbortSignal`

#### Source

[packages/wxt/src/utils/content-script-context.ts:63](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-context.ts#L63)

## Methods

### abort()

> **abort**(`reason`?): `void`

#### Parameters

▪ **reason?**: `any`

#### Implementation of

AbortController.abort

#### Source

[packages/wxt/src/utils/content-script-context.ts:67](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-context.ts#L67)

***

### addEventListener()

#### addEventListener(target, type, handler, options)

> **addEventListener**<`TType`>(`target`, `type`, `handler`, `options`?): `void`

Call `target.addEventListener` and remove the event listener when the
context is invalidated.

Listeners can be canceled by calling the normal `removeEventListener`
function.

Includes additional events useful for content scripts:

* `"wxt:locationchange"` - Triggered when HTML5 history mode is used to
  change URL. Content scripts are not reloaded when navigating this way, so
  this can be used to reset the content script state on URL change, or run
  custom code.

##### Type parameters

▪ **TType** extends keyof [`WxtWindowEventMap`](../interfaces/WxtWindowEventMap.md)

##### Parameters

▪ **target**: `Window`

▪ **type**: `TType`

▪ **handler**: (`event`) => `void`

▪ **options?**: `AddEventListenerOptions`

##### Returns

##### Example

```ts
ctx.addEventListener(document, 'visibilitychange', () => {
    // ...
  });
  ctx.addEventListener(window, 'wxt:locationchange', () => {
    // ...
  });
```

##### Source

[packages/wxt/src/utils/content-script-context.ts:203](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-context.ts#L203)

#### addEventListener(target, type, handler, options)

> **addEventListener**<`TType`>(`target`, `type`, `handler`, `options`?): `void`

##### Type parameters

▪ **TType** extends keyof `DocumentEventMap`

##### Parameters

▪ **target**: `Document`

▪ **type**: `TType`

▪ **handler**: (`event`) => `void`

▪ **options?**: `AddEventListenerOptions`

##### Source

[packages/wxt/src/utils/content-script-context.ts:209](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-context.ts#L209)

#### addEventListener(target, params)

> **addEventListener**<`TTarget`>(`target`, ...`params`): `void`

##### Type parameters

▪ **TTarget** extends `EventTarget`

##### Parameters

▪ **target**: `TTarget`

▪ ...**params**: `Parameters`<`TTarget`\[`"addEventListener"`]>

##### Source

[packages/wxt/src/utils/content-script-context.ts:215](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-context.ts#L215)

***

### block()

> **block**<`T`>(): `Promise`<`T`>

Return a promise that never resolves. Useful if you have an async function
that shouldn't run after the context is expired.

#### Type parameters

▪ **T**

#### Returns

#### Example

```ts
const getValueFromStorage = async () => {
    if (ctx.isInvalid) return ctx.block();

    // ...
  };
```

#### Source

[packages/wxt/src/utils/content-script-context.ts:112](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-context.ts#L112)

***

### listenForNewerScripts()

> **listenForNewerScripts**(): `void`

#### Source

[packages/wxt/src/utils/content-script-context.ts:281](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-context.ts#L281)

***

### notifyInvalidated()

> **notifyInvalidated**(): `void`

Abort the abort controller and execute all `onInvalidated` listeners.

#### Source

[packages/wxt/src/utils/content-script-context.ts:244](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-context.ts#L244)

***

### onInvalidated()

> **onInvalidated**(`cb`): () => `void`

Add a listener that is called when the content script's context is
invalidated.

#### Parameters

▪ **cb**: () => `void`

#### Returns

A function to remove the listener.

> > (): `void`
>
> ##### Source
>
> [packages/wxt/src/utils/content-script-context.ts:96](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-context.ts#L96)

#### Example

```ts
browser.runtime.onMessage.addListener(cb);
  const removeInvalidatedListener = ctx.onInvalidated(() => {
    browser.runtime.onMessage.removeListener(cb);
  });
  // ...
  removeInvalidatedListener();
```

#### Source

[packages/wxt/src/utils/content-script-context.ts:96](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-context.ts#L96)

***

### requestAnimationFrame()

> **requestAnimationFrame**(`callback`): `number`

Wrapper around `window.requestAnimationFrame` that automatically cancels
the request when invalidated.

Callbacks can be canceled by calling the normal `cancelAnimationFrame`
function.

#### Parameters

▪ **callback**: `FrameRequestCallback`

#### Source

[packages/wxt/src/utils/content-script-context.ts:153](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-context.ts#L153)

***

### requestIdleCallback()

> **requestIdleCallback**(`callback`, `options`?): `number`

Wrapper around `window.requestIdleCallback` that automatically cancels the
request when invalidated.

Callbacks can be canceled by calling the normal `cancelIdleCallback`
function.

#### Parameters

▪ **callback**: `IdleRequestCallback`

▪ **options?**: `IdleRequestOptions`

#### Source

[packages/wxt/src/utils/content-script-context.ts:169](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-context.ts#L169)

***

### setInterval()

> **setInterval**(`handler`, `timeout`?): `number`

Wrapper around `window.setInterval` that automatically clears the interval
when invalidated.

Intervals can be cleared by calling the normal `clearInterval` function.

#### Parameters

▪ **handler**: () => `void`

▪ **timeout?**: `number`

#### Source

[packages/wxt/src/utils/content-script-context.ts:124](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-context.ts#L124)

***

### setTimeout()

> **setTimeout**(`handler`, `timeout`?): `number`

Wrapper around `window.setTimeout` that automatically clears the interval
when invalidated.

Timeouts can be cleared by calling the normal `setTimeout` function.

#### Parameters

▪ **handler**: () => `void`

▪ **timeout?**: `number`

#### Source

[packages/wxt/src/utils/content-script-context.ts:138](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-context.ts#L138)

***

### stopOldScripts()

> **stopOldScripts**(): `void`

#### Source

[packages/wxt/src/utils/content-script-context.ts:251](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-context.ts#L251)

***

### verifyScriptStartedEvent()

> **verifyScriptStartedEvent**(`event`): `boolean`

#### Parameters

▪ **event**: `CustomEvent`<`any`>

#### Source

[packages/wxt/src/utils/content-script-context.ts:273](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-context.ts#L273)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

