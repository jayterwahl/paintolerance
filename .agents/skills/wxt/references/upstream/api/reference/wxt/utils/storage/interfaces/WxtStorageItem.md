<!--
Source: https://wxt.dev/api/reference/wxt/utils/storage/interfaces/WxtStorageItem.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../../../index.md) > [wxt/utils/storage](../index.md) > WxtStorageItem

# Interface: WxtStorageItem`<TValue, TMetadata>`

## Contents

* [Type parameters](WxtStorageItem.md#type-parameters)
* [Properties](WxtStorageItem.md#properties)
  * [defaultValue](WxtStorageItem.md#defaultvalue)
  * [fallback](WxtStorageItem.md#fallback)
  * [key](WxtStorageItem.md#key)
* [Methods](WxtStorageItem.md#methods)
  * [getMeta()](WxtStorageItem.md#getmeta)
  * [getValue()](WxtStorageItem.md#getvalue)
  * [migrate()](WxtStorageItem.md#migrate)
  * [removeMeta()](WxtStorageItem.md#removemeta)
  * [removeValue()](WxtStorageItem.md#removevalue)
  * [setMeta()](WxtStorageItem.md#setmeta)
  * [setValue()](WxtStorageItem.md#setvalue)
  * [watch()](WxtStorageItem.md#watch)

## Type parameters

▪ **TValue**

▪ **TMetadata** extends `Record`<`string`, `unknown`>

## Properties

### defaultValue

> **defaultValue**: `TValue`

#### Deprecated

Renamed to fallback, use it instead.

#### Source

packages/storage/dist/index.d.mts:154

***

### fallback

> **fallback**: `TValue`

The value provided by the `fallback` option.

#### Source

packages/storage/dist/index.d.mts:156

***

### key

> **key**: \`local:${string}\` | \`session:${string}\` | \`sync:${string}\` | \`managed:${string}\`

The storage key passed when creating the storage item.

#### Source

packages/storage/dist/index.d.mts:152

## Methods

### getMeta()

> **getMeta**(): `Promise`<`NullablePartial`<`TMetadata`>>

Get metadata.

#### Source

packages/storage/dist/index.d.mts:160

***

### getValue()

> **getValue**(): `Promise`<`TValue`>

Get the latest value from storage.

#### Source

packages/storage/dist/index.d.mts:158

***

### migrate()

> **migrate**(): `Promise`<`void`>

If there are migrations defined on the storage item, migrate to the latest
version.

**This function is ran automatically whenever the extension updates**, so
you don't have to call it manually.

#### Source

packages/storage/dist/index.d.mts:178

***

### removeMeta()

> **removeMeta**(`properties`?): `Promise`<`void`>

Remove all metadata or certain properties from metadata.

#### Parameters

▪ **properties?**: `string`\[]

#### Source

packages/storage/dist/index.d.mts:168

***

### removeValue()

> **removeValue**(`opts`?): `Promise`<`void`>

Remove the value from storage.

#### Parameters

▪ **opts?**: [`RemoveItemOptions`](RemoveItemOptions.md)

#### Source

packages/storage/dist/index.d.mts:166

***

### setMeta()

> **setMeta**(`properties`): `Promise`<`void`>

Set metadata properties.

#### Parameters

▪ **properties**: `NullablePartial`<`TMetadata`>

#### Source

packages/storage/dist/index.d.mts:164

***

### setValue()

> **setValue**(`value`): `Promise`<`void`>

Set the value in storage.

#### Parameters

▪ **value**: `TValue`

#### Source

packages/storage/dist/index.d.mts:162

***

### watch()

> **watch**(`cb`): [`Unwatch`](../type-aliases/Unwatch.md)

Listen for changes to the value in storage.

#### Parameters

▪ **cb**: [`WatchCallback`](../type-aliases/WatchCallback.md)<`TValue`>

#### Source

packages/storage/dist/index.d.mts:170

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

