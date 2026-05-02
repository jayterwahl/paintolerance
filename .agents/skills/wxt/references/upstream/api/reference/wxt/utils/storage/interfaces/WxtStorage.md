<!--
Source: https://wxt.dev/api/reference/wxt/utils/storage/interfaces/WxtStorage.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../../../index.md) > [wxt/utils/storage](../index.md) > WxtStorage

# Interface: WxtStorage

## Contents

* [Methods](WxtStorage.md#methods)
  * [clear()](WxtStorage.md#clear)
  * [defineItem()](WxtStorage.md#defineitem)
  * [getItem()](WxtStorage.md#getitem)
  * [getItems()](WxtStorage.md#getitems)
  * [getMeta()](WxtStorage.md#getmeta)
  * [getMetas()](WxtStorage.md#getmetas)
  * [removeItem()](WxtStorage.md#removeitem)
  * [removeItems()](WxtStorage.md#removeitems)
  * [removeMeta()](WxtStorage.md#removemeta)
  * [restoreSnapshot()](WxtStorage.md#restoresnapshot)
  * [setItem()](WxtStorage.md#setitem)
  * [setItems()](WxtStorage.md#setitems)
  * [setMeta()](WxtStorage.md#setmeta)
  * [setMetas()](WxtStorage.md#setmetas)
  * [snapshot()](WxtStorage.md#snapshot)
  * [unwatch()](WxtStorage.md#unwatch)
  * [watch()](WxtStorage.md#watch)

## Methods

### clear()

> **clear**(`base`): `Promise`<`void`>

Removes all items from the provided storage area.

#### Parameters

▪ **base**: [`StorageArea`](../type-aliases/StorageArea.md)

#### Source

packages/storage/dist/index.d.mts:109

***

### defineItem()

#### defineItem(key)

> **defineItem**<`TValue`, `TMetadata`>(`key`): [`WxtStorageItem`](WxtStorageItem.md)<`null` | `TValue`, `TMetadata`>

Define a storage item with a default value, type, or versioning.

Read full docs: https://wxt.dev/storage.html#defining-storage-items

##### Type parameters

▪ **TValue**

▪ **TMetadata** extends `Record`<`string`, `unknown`> = `object`

##### Parameters

▪ **key**: \`local:${string}\` | \`session:${string}\` | \`sync:${string}\` | \`managed:${string}\`

##### Source

packages/storage/dist/index.d.mts:138

#### defineItem(key, options)

> **defineItem**<`TValue`, `TMetadata`>(`key`, `options`): [`WxtStorageItem`](WxtStorageItem.md)<`TValue`, `TMetadata`>

##### Type parameters

▪ **TValue**

▪ **TMetadata** extends `Record`<`string`, `unknown`> = `object`

##### Parameters

▪ **key**: \`local:${string}\` | \`session:${string}\` | \`sync:${string}\` | \`managed:${string}\`

▪ **options**: [`WxtStorageItemOptions`](WxtStorageItemOptions.md)<`TValue`> & `object`

##### Source

packages/storage/dist/index.d.mts:139

#### defineItem(key, options)

> **defineItem**<`TValue`, `TMetadata`>(`key`, `options`): [`WxtStorageItem`](WxtStorageItem.md)<`TValue`, `TMetadata`>

##### Type parameters

▪ **TValue**

▪ **TMetadata** extends `Record`<`string`, `unknown`> = `object`

##### Parameters

▪ **key**: \`local:${string}\` | \`session:${string}\` | \`sync:${string}\` | \`managed:${string}\`

▪ **options**: [`WxtStorageItemOptions`](WxtStorageItemOptions.md)<`TValue`> & `object`

##### Source

packages/storage/dist/index.d.mts:142

#### defineItem(key, options)

> **defineItem**<`TValue`, `TMetadata`>(`key`, `options`): [`WxtStorageItem`](WxtStorageItem.md)<`TValue`, `TMetadata`>

##### Type parameters

▪ **TValue**

▪ **TMetadata** extends `Record`<`string`, `unknown`> = `object`

##### Parameters

▪ **key**: \`local:${string}\` | \`session:${string}\` | \`sync:${string}\` | \`managed:${string}\`

▪ **options**: [`WxtStorageItemOptions`](WxtStorageItemOptions.md)<`TValue`> & `object`

##### Source

packages/storage/dist/index.d.mts:145

#### defineItem(key, options)

> **defineItem**<`TValue`, `TMetadata`>(`key`, `options`): [`WxtStorageItem`](WxtStorageItem.md)<`null` | `TValue`, `TMetadata`>

##### Type parameters

▪ **TValue**

▪ **TMetadata** extends `Record`<`string`, `unknown`> = `object`

##### Parameters

▪ **key**: \`local:${string}\` | \`session:${string}\` | \`sync:${string}\` | \`managed:${string}\`

▪ **options**: [`WxtStorageItemOptions`](WxtStorageItemOptions.md)<`TValue`>

##### Source

packages/storage/dist/index.d.mts:148

***

### getItem()

#### getItem(key, opts)

> **getItem**<`TValue`>(`key`, `opts`): `Promise`<`TValue`>

Get an item from storage, or return `null` if it doesn't exist.

##### Type parameters

▪ **TValue**

##### Parameters

▪ **key**: \`local:${string}\` | \`session:${string}\` | \`sync:${string}\` | \`managed:${string}\`

▪ **opts**: [`GetItemOptions`](GetItemOptions.md)<`TValue`> & `object`

##### Returns

##### Example

```ts
await storage.getItem<number>('local:installDate');
```

##### Source

packages/storage/dist/index.d.mts:12

#### getItem(key, opts)

> **getItem**<`TValue`>(`key`, `opts`?): `Promise`<`null` | `TValue`>

##### Type parameters

▪ **TValue**

##### Parameters

▪ **key**: \`local:${string}\` | \`session:${string}\` | \`sync:${string}\` | \`managed:${string}\`

▪ **opts?**: [`GetItemOptions`](GetItemOptions.md)<`TValue`>

##### Source

packages/storage/dist/index.d.mts:15

***

### getItems()

> **getItems**(`keys`): `Promise`<`object`\[]>

Get multiple items from storage. The return order is guaranteed to be the
same as the order requested.

#### Parameters

▪ **keys**: (\`local:${string}\` | \`session:${string}\` | \`sync:${string}\` | \`managed:${string}\` | [`WxtStorageItem`](WxtStorageItem.md)<`any`, `any`> | `object`)\[]

#### Returns

#### Example

```ts
await storage.getItems(['local:installDate', 'session:someCounter']);
```

#### Source

packages/storage/dist/index.d.mts:23

***

### getMeta()

> **getMeta**<`T`>(`key`): `Promise`<`T`>

Return an object containing metadata about the key. Object is stored at
`key + "$"`. If value is not an object, it returns an empty object.

#### Type parameters

▪ **T** extends `Record`<`string`, `unknown`>

#### Parameters

▪ **key**: \`local:${string}\` | \`session:${string}\` | \`sync:${string}\` | \`managed:${string}\`

#### Returns

#### Example

```ts
await storage.getMeta('local:installDate');
```

#### Source

packages/storage/dist/index.d.mts:37

***

### getMetas()

> **getMetas**(`keys`): `Promise`<`object`\[]>

Get the metadata of multiple storage items.

#### Parameters

▪ **keys**: (\`local:${string}\` | \`session:${string}\` | \`sync:${string}\` | \`managed:${string}\` | [`WxtStorageItem`](WxtStorageItem.md)<`any`, `any`>)\[]

List of keys or items to get the metadata of.

#### Returns

An array containing storage keys and their metadata.

#### Source

packages/storage/dist/index.d.mts:44

***

### removeItem()

> **removeItem**(`key`, `opts`?): `Promise`<`void`>

Removes an item from storage.

#### Parameters

▪ **key**: \`local:${string}\` | \`session:${string}\` | \`sync:${string}\` | \`managed:${string}\`

▪ **opts?**: [`RemoveItemOptions`](RemoveItemOptions.md)

#### Returns

#### Example

```ts
await storage.removeItem('local:installDate');
```

#### Source

packages/storage/dist/index.d.mts:99

***

### removeItems()

> **removeItems**(`keys`): `Promise`<`void`>

Remove a list of keys from storage.

#### Parameters

▪ **keys**: (\`local:${string}\` | \`session:${string}\` | \`sync:${string}\` | \`managed:${string}\` | [`WxtStorageItem`](WxtStorageItem.md)<`any`, `any`> | `object` | `object`)\[]

#### Source

packages/storage/dist/index.d.mts:101

***

### removeMeta()

> **removeMeta**(`key`, `properties`?): `Promise`<`void`>

Remove the entire metadata for a key, or specific properties by name.

#### Parameters

▪ **key**: \`local:${string}\` | \`session:${string}\` | \`sync:${string}\` | \`managed:${string}\`

▪ **properties?**: `string` | `string`\[]

#### Returns

#### Example

```ts
// Remove all metadata properties from the item
  await storage.removeMeta('local:installDate');

  // Remove only specific the "v" field
  await storage.removeMeta('local:installDate', 'v');
```

#### Source

packages/storage/dist/index.d.mts:120

***

### restoreSnapshot()

> **restoreSnapshot**(`base`, `data`): `Promise`<`void`>

Restores the results of `snapshot`. If new properties have been saved since
the snapshot, they are not overridden. Only values existing in the snapshot
are overridden.

#### Parameters

▪ **base**: [`StorageArea`](../type-aliases/StorageArea.md)

▪ **data**: `any`

#### Source

packages/storage/dist/index.d.mts:128

***

### setItem()

> **setItem**<`T`>(`key`, `value`): `Promise`<`void`>

Set a value in storage. Setting a value to `null` or `undefined` is
equivalent to calling `removeItem`.

#### Type parameters

▪ **T**

#### Parameters

▪ **key**: \`local:${string}\` | \`session:${string}\` | \`sync:${string}\` | \`managed:${string}\`

▪ **value**: `null` | `T`

#### Returns

#### Example

```ts
await storage.setItem<number>('local:installDate', Date.now());
```

#### Source

packages/storage/dist/index.d.mts:55

***

### setItems()

> **setItems**(`values`): `Promise`<`void`>

Set multiple values in storage. If a value is set to `null` or `undefined`,
the key is removed.

#### Parameters

▪ **values**: (`object` | `object`)\[]

#### Returns

#### Example

```ts
await storage.setItem([
  { key: "local:installDate", value: Date.now() },
  { key: "session:someCounter, value: 5 },
  ]);
```

#### Source

packages/storage/dist/index.d.mts:66

***

### setMeta()

> **setMeta**<`T`>(`key`, `properties`): `Promise`<`void`>

Sets metadata properties. If some properties are already set, but are not
included in the `properties` parameter, they will not be removed.

#### Type parameters

▪ **T** extends `Record`<`string`, `unknown`>

#### Parameters

▪ **key**: \`local:${string}\` | \`session:${string}\` | \`sync:${string}\` | \`managed:${string}\`

▪ **properties**: `null` | `T`

#### Returns

#### Example

```ts
await storage.setMeta('local:installDate', { appVersion });
```

#### Source

packages/storage/dist/index.d.mts:80

***

### setMetas()

> **setMetas**(`metas`): `Promise`<`void`>

Set the metadata of multiple storage items.

#### Parameters

▪ **metas**: (`object` | `object`)\[]

List of storage keys or items and metadata to set for each.

#### Source

packages/storage/dist/index.d.mts:86

***

### snapshot()

> **snapshot**(`base`, `opts`?): `Promise`<`Record`<`string`, `unknown`>>

Return all the items in storage.

#### Parameters

▪ **base**: [`StorageArea`](../type-aliases/StorageArea.md)

▪ **opts?**: [`SnapshotOptions`](SnapshotOptions.md)

#### Source

packages/storage/dist/index.d.mts:122

***

### unwatch()

> **unwatch**(): `void`

Remove all watch listeners.

#### Source

packages/storage/dist/index.d.mts:132

***

### watch()

> **watch**<`T`>(`key`, `cb`): [`Unwatch`](../type-aliases/Unwatch.md)

Watch for changes to a specific key in storage.

#### Type parameters

▪ **T**

#### Parameters

▪ **key**: \`local:${string}\` | \`session:${string}\` | \`sync:${string}\` | \`managed:${string}\`

▪ **cb**: [`WatchCallback`](../type-aliases/WatchCallback.md)<`null` | `T`>

#### Source

packages/storage/dist/index.d.mts:130

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

