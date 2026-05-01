<!--
Source: https://wxt.dev/api/reference/wxt/utils/storage/interfaces/WxtStorageItemOptions.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../../../index.md) > [wxt/utils/storage](../index.md) > WxtStorageItemOptions

# Interface: WxtStorageItemOptions`<T>`

## Contents

* [Type parameters](WxtStorageItemOptions.md#type-parameters)
* [Properties](WxtStorageItemOptions.md#properties)
  * [debug](WxtStorageItemOptions.md#debug)
  * [defaultValue](WxtStorageItemOptions.md#defaultvalue)
  * [fallback](WxtStorageItemOptions.md#fallback)
  * [init](WxtStorageItemOptions.md#init)
  * [migrations](WxtStorageItemOptions.md#migrations)
  * [onMigrationComplete](WxtStorageItemOptions.md#onmigrationcomplete)
  * [version](WxtStorageItemOptions.md#version)

## Type parameters

▪ **T**

## Properties

### debug

> **debug**?: `boolean`

Print debug logs, such as migration process.

#### Default

```ts
false
```

#### Source

packages/storage/dist/index.d.mts:231

***

### defaultValue

> **defaultValue**?: `T`

#### Deprecated

Renamed to `fallback`, use it instead.

#### Source

packages/storage/dist/index.d.mts:205

***

### fallback

> **fallback**?: `T`

Default value returned when `getValue` would otherwise return `null`.

#### Source

packages/storage/dist/index.d.mts:207

***

### init

> **init**?: () => `T` | `Promise`<`T`>

If passed, a value in storage will be initialized immediately after
defining the storage item. This function returns the value that will be
saved to storage during the initialization process if a value doesn't
already exist.

#### Source

packages/storage/dist/index.d.mts:214

***

### migrations

> **migrations**?: `Record`<`number`, (`oldValue`) => `any`>

A map of version numbers to the functions used to migrate the data to that
version.

#### Source

packages/storage/dist/index.d.mts:225

***

### onMigrationComplete

> **onMigrationComplete**?: (`migratedValue`, `targetVersion`) => `void`

A callback function that runs on migration complete.

#### Parameters

▪ **migratedValue**: `T`

▪ **targetVersion**: `number`

#### Source

packages/storage/dist/index.d.mts:233

***

### version

> **version**?: `number`

Provide a version number for the storage item to enable migrations. When
changing the version in the future, migration functions will be ran on
application startup.

#### Source

packages/storage/dist/index.d.mts:220

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

