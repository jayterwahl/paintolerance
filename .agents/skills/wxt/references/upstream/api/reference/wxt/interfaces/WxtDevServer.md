<!--
Source: https://wxt.dev/api/reference/wxt/interfaces/WxtDevServer.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > WxtDevServer

# Interface: WxtDevServer

## Contents

* [Extends](WxtDevServer.md#extends)
* [Properties](WxtDevServer.md#properties)
  * [currentOutput](WxtDevServer.md#currentoutput)
  * [host](WxtDevServer.md#host)
  * [origin](WxtDevServer.md#origin)
  * [port](WxtDevServer.md#port)
  * [reloadContentScript](WxtDevServer.md#reloadcontentscript)
  * [reloadExtension](WxtDevServer.md#reloadextension)
  * [reloadPage](WxtDevServer.md#reloadpage)
  * [restartBrowser](WxtDevServer.md#restartbrowser)
  * [watcher](WxtDevServer.md#watcher)
  * [ws](WxtDevServer.md#ws)
* [Methods](WxtDevServer.md#methods)
  * [on()](WxtDevServer.md#on-1)
  * [restart()](WxtDevServer.md#restart)
  * [start()](WxtDevServer.md#start)
  * [stop()](WxtDevServer.md#stop)
  * [transformHtml()](WxtDevServer.md#transformhtml)

## Extends

* `Omit`<[`WxtBuilderServer`](WxtBuilderServer.md), `"listen"` | `"close"`>.[`ServerInfo`](ServerInfo.md)

## Properties

### currentOutput

> **currentOutput**: `undefined` | [`BuildOutput`](BuildOutput.md)

Stores the current build output of the server.

#### Source

[packages/wxt/src/types.ts:518](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L518)

***

### host

> **host**: `string`

Ex: `"localhost"`

#### Inherited from

[`ServerInfo`](ServerInfo.md).[`host`](ServerInfo.md#host)

#### Source

[packages/wxt/src/types.ts:1234](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1234)

***

### origin

> **origin**: `string`

Ex: `"http://localhost:3000"`

#### Inherited from

[`ServerInfo`](ServerInfo.md).[`origin`](ServerInfo.md#origin)

#### Source

[packages/wxt/src/types.ts:1238](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1238)

***

### port

> **port**: `number`

Ex: `3000`

#### Inherited from

[`ServerInfo`](ServerInfo.md).[`port`](ServerInfo.md#port)

#### Source

[packages/wxt/src/types.ts:1236](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1236)

***

### reloadContentScript

> **reloadContentScript**: (`payload`) => `void`

Tell the extension to restart a content script.

#### Parameters

▪ **payload**: [`ReloadContentScriptPayload`](ReloadContentScriptPayload.md)

Information about the content script to reload.

#### Source

[packages/wxt/src/types.ts:554](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L554)

***

### reloadExtension

> **reloadExtension**: () => `void`

Tell the extension to reload by running `browser.runtime.reload`.

#### Source

[packages/wxt/src/types.ts:535](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L535)

***

### reloadPage

> **reloadPage**: (`path`) => `void`

Tell an extension page to reload.

The path is the bundle path, not the input paths, so if the input paths is
"src/options/index.html", you would pass "options.html" because that's
where it is written to in the dist directory, and where it's available at
in the actual extension.

#### Example

```ts
server.reloadPage('popup.html');
  server.reloadPage('sandbox.html');
```

#### Parameters

▪ **path**: `string`

#### Source

[packages/wxt/src/types.ts:548](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L548)

***

### restartBrowser

> **restartBrowser**: () => `void`

Grab the latest runner config and restart the browser.

#### Source

[packages/wxt/src/types.ts:556](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L556)

***

### watcher

> **watcher**: `FSWatcher`

Chokidar file watcher instance.

#### Inherited from

Omit.watcher

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

#### Inherited from

Omit.ws

#### Source

[packages/wxt/src/types.ts:1215](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1215)

## Methods

### on()

> **`optional`** **on**(`event`, `callback`): `void`

#### Parameters

▪ **event**: `string`

▪ **callback**: () => `void`

#### Inherited from

Omit.on

#### Source

[packages/wxt/src/types.ts:1229](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1229)

***

### restart()

> **restart**(): `Promise`<`void`>

Close the browser, stop the server, rebuild the entire extension, and start
the server again.

#### Source

[packages/wxt/src/types.ts:527](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L527)

***

### start()

> **start**(): `Promise`<`void`>

Start the server.

#### Source

[packages/wxt/src/types.ts:520](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L520)

***

### stop()

> **stop**(): `Promise`<`void`>

Stop the server.

#### Source

[packages/wxt/src/types.ts:522](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L522)

***

### transformHtml()

> **transformHtml**(`url`, `html`, `originalUrl`?): `Promise`<`string`>

Transform the HTML for dev mode.

#### Parameters

▪ **url**: `string`

▪ **html**: `string`

▪ **originalUrl?**: `string`

#### Overrides

Omit.transformHtml

#### Source

[packages/wxt/src/types.ts:529](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L529)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

