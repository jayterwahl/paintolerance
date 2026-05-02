<!--
Source: https://wxt.dev/api/reference/wxt/interfaces/WxtBuilderServer.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > WxtBuilderServer

# Interface: WxtBuilderServer

## Contents

* [Properties](WxtBuilderServer.md#properties)
  * [watcher](WxtBuilderServer.md#watcher)
  * [ws](WxtBuilderServer.md#ws)
* [Methods](WxtBuilderServer.md#methods)
  * [close()](WxtBuilderServer.md#close)
  * [listen()](WxtBuilderServer.md#listen)
  * [on()](WxtBuilderServer.md#on-1)
  * [transformHtml()](WxtBuilderServer.md#transformhtml)

## Properties

### watcher

> **watcher**: `FSWatcher`

Chokidar file watcher instance.

#### Source

[packages/wxt/src/types.ts:1228](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1228)

***

### ws

> **ws**: `object`

The web socket server used to communicate with the extension.

#### Type declaration

##### on()

Listen for messages over the server's websocket.

###### Parameters

▪ **message**: `string`

▪ **cb**: (`payload`) => `void`

##### send()

Send a message via the server's websocket, with an optional payload.

###### Parameters

▪ **message**: `string`

▪ **payload?**: `any`

###### Returns

###### Example

```ts
ws.send("wxt:reload-extension");
  ws.send("wxt:reload-content-script", { ... });
```

#### Source

[packages/wxt/src/types.ts:1215](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1215)

## Methods

### close()

> **close**(): `Promise`<`void`>

Stop the server.

#### Source

[packages/wxt/src/types.ts:1207](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1207)

***

### listen()

> **listen**(): `Promise`<`void`>

Start the server.

#### Source

[packages/wxt/src/types.ts:1205](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1205)

***

### on()

> **`optional`** **on**(`event`, `callback`): `void`

#### Parameters

▪ **event**: `string`

▪ **callback**: () => `void`

#### Source

[packages/wxt/src/types.ts:1229](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1229)

***

### transformHtml()

> **transformHtml**(`url`, `html`, `originalUrl`?): `Promise`<`string`>

Transform the HTML for dev mode.

#### Parameters

▪ **url**: `string`

▪ **html**: `string`

▪ **originalUrl?**: `string`

#### Source

[packages/wxt/src/types.ts:1209](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1209)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

