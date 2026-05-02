<!--
Source: https://wxt.dev/api/reference/wxt/interfaces/WxtPackageManager.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > WxtPackageManager

# Interface: WxtPackageManager

Package management utils built on top of
[`nypm`](https://www.npmjs.com/package/nypm)

## Contents

* [Extends](WxtPackageManager.md#extends)
* [Properties](WxtPackageManager.md#properties)
  * [addDependency](WxtPackageManager.md#adddependency)
  * [addDevDependency](WxtPackageManager.md#adddevdependency)
  * [buildMeta](WxtPackageManager.md#buildmeta)
  * [command](WxtPackageManager.md#command)
  * [downloadDependency](WxtPackageManager.md#downloaddependency)
  * [ensureDependencyInstalled](WxtPackageManager.md#ensuredependencyinstalled)
  * [files](WxtPackageManager.md#files)
  * [installDependencies](WxtPackageManager.md#installdependencies)
  * [listDependencies](WxtPackageManager.md#listdependencies)
  * [lockFile](WxtPackageManager.md#lockfile)
  * [majorVersion](WxtPackageManager.md#majorversion)
  * [name](WxtPackageManager.md#name)
  * [overridesKey](WxtPackageManager.md#overrideskey)
  * [removeDependency](WxtPackageManager.md#removedependency)
  * [version](WxtPackageManager.md#version)

## Extends

* `PackageManager`

## Properties

### addDependency

> **addDependency**: (`name`, `options`?) => `Promise`<`OperationResult`>

Adds dependency to the project.

#### Parameters

▪ **name**: `string` | `string`\[]

Name of the dependency to add.

▪ **options?**: `OperationOptions`

Options to pass to the API call.

#### Source

[packages/wxt/src/types.ts:1647](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1647)

***

### addDevDependency

> **addDevDependency**: (`name`, `options`?) => `Promise`<`OperationResult`>

Adds dev dependency to the project.

#### Parameters

▪ **name**: `string` | `string`\[]

Name of the dev dependency to add.

▪ **options?**: `Omit`<`OperationOptions`, `"dev"`>

Options to pass to the API call.

#### Source

[packages/wxt/src/types.ts:1648](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1648)

***

### buildMeta

> **buildMeta**?: `string`

#### Inherited from

Nypm.PackageManager.buildMeta

#### Source

node\_modules/.bun/nypm@0.6.5/node\_modules/nypm/dist/index.d.mts:7

***

### command

> **command**: `string`

#### Inherited from

Nypm.PackageManager.command

#### Source

node\_modules/.bun/nypm@0.6.5/node\_modules/nypm/dist/index.d.mts:5

***

### downloadDependency

> **downloadDependency**: (`id`, `downloadDir`) => `Promise`<`string`>

Download a package's TGZ file and move it into the `downloadDir`. Use's
`npm pack <name>`, so you must have setup authorization in `.npmrc` file,
regardless of the package manager used.

#### Parameters

▪ **id**: `string`

Name of the package to download, can include a version (like
`wxt@0.17.1`)

▪ **downloadDir**: `string`

Where to store the package.

#### Source

[packages/wxt/src/types.ts:1662](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1662)

***

### ensureDependencyInstalled

> **ensureDependencyInstalled**: (`name`, `options`?) => `Promise`<`true` | `undefined`>

Ensures dependency is installed.

#### Parameters

▪ **name**: `string`

Name of the dependency.

▪ **options?**: `Pick`<`OperationOptions`, `"workspace"` | `"cwd"` | `"dev"`>

Options to pass to the API call.

#### Source

[packages/wxt/src/types.ts:1649](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1649)

***

### files

> **files**?: `string`\[]

#### Inherited from

Nypm.PackageManager.files

#### Source

node\_modules/.bun/nypm@0.6.5/node\_modules/nypm/dist/index.d.mts:10

***

### installDependencies

> **installDependencies**: (`options`?) => `Promise`<`OperationResult`>

Installs project dependencies.

#### Parameters

▪ **options?**: `Pick`<`OperationOptions`, `"cwd"` | `"silent"` | `"packageManager"` | `"corepack"` | `"dry"`> & `object`

Options to pass to the API call.

#### Source

[packages/wxt/src/types.ts:1650](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1650)

***

### listDependencies

> **listDependencies**: (`options`?) => `Promise`<[`Dependency`](Dependency.md)\[]>

Run `npm ls`, `pnpm ls`, or `bun pm ls`, or `yarn list` and return the
results.

WARNING: Yarn always returns all dependencies

#### Parameters

▪ **options?**: `object`

▪ **options.all?**: `boolean`

▪ **options.cwd?**: `string`

#### Source

[packages/wxt/src/types.ts:1669](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1669)

***

### lockFile

> **lockFile**?: `string` | `string`\[]

#### Inherited from

Nypm.PackageManager.lockFile

#### Source

node\_modules/.bun/nypm@0.6.5/node\_modules/nypm/dist/index.d.mts:9

***

### majorVersion

> **majorVersion**?: `string`

#### Inherited from

Nypm.PackageManager.majorVersion

#### Source

node\_modules/.bun/nypm@0.6.5/node\_modules/nypm/dist/index.d.mts:8

***

### name

> **name**: `PackageManagerName`

#### Inherited from

Nypm.PackageManager.name

#### Source

node\_modules/.bun/nypm@0.6.5/node\_modules/nypm/dist/index.d.mts:4

***

### overridesKey

> **overridesKey**: `string`

Key used to override package versions. Sometimes called "resolutions".

#### Source

[packages/wxt/src/types.ts:1674](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1674)

***

### removeDependency

> **removeDependency**: (`name`, `options`?) => `Promise`<`OperationResult`>

Removes dependency from the project.

#### Parameters

▪ **name**: `string` | `string`\[]

Name of the dependency to remove.

▪ **options?**: `OperationOptions`

Options to pass to the API call.

#### Source

[packages/wxt/src/types.ts:1651](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1651)

***

### version

> **version**?: `string`

#### Inherited from

Nypm.PackageManager.version

#### Source

node\_modules/.bun/nypm@0.6.5/node\_modules/nypm/dist/index.d.mts:6

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

