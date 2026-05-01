<!--
Source: https://wxt.dev/api/reference/wxt/interfaces/FirefoxDataCollectionPermissions.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > FirefoxDataCollectionPermissions

# Interface: FirefoxDataCollectionPermissions

Firefox data collection permissions configuration. See:
https://extensionworkshop.com/documentation/develop/firefox-builtin-data-consent/#specifying-data-types

## Contents

* [Properties](FirefoxDataCollectionPermissions.md#properties)
  * [optional](FirefoxDataCollectionPermissions.md#optional)
  * [required](FirefoxDataCollectionPermissions.md#required)

## Properties

### optional

> **optional**?: ([`FirefoxDataCollectionType`](../type-aliases/FirefoxDataCollectionType.md) | `"technicalAndInteraction"`)\[]

Optional data collection permissions. Users can opt in after installation.
Can include personal data types or "technicalAndInteraction" (which can
only be optional).

#### Source

[packages/wxt/src/types.ts:1010](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1010)

***

### required

> **required**?: ([`FirefoxDataCollectionType`](../type-aliases/FirefoxDataCollectionType.md) | `"none"`)\[]

Required data collection permissions. Users must opt in to use the
extension. Can include personal data types or "none" to explicitly indicate
no data collection.

#### Source

[packages/wxt/src/types.ts:1004](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1004)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

