<!--
Source: https://wxt.dev/api/reference/wxt/type-aliases/UserManifest.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > UserManifest

# Type alias: UserManifest

> **UserManifest**: `{ [key in keyof Browser.runtime.ManifestV3 as key extends "action" | "background" | "chrome_url_overrides" | "devtools_page" | "manifest_version" | "options_page" | "options_ui" | "permissions" | "sandbox" | "web_accessible_resources" ? never : key]?: Browser.runtime.ManifestV3[key] }` & `object`

Manifest customization available in the `wxt.config.ts` file. You cannot
configure entrypoints here, they are configured inline.

## Type declaration

### action

> **action**?: `Browser.runtime.ManifestV3`\[`"action"`] & `object`

#### Type declaration

##### default\_area

> **default\_area**?: `"navbar"` | `"menupanel"` | `"tabstrip"` | `"personaltoolbar"`

##### theme\_icons

> **theme\_icons**?: [`ThemeIcon`](../interfaces/ThemeIcon.md)\[]

### browser\_action

> **browser\_action**?: `Browser.runtime.ManifestV2`\[`"browser_action"`] & `object`

#### Type declaration

##### browser\_style

> **browser\_style**?: `boolean`

##### default\_area

> **default\_area**?: `"navbar"` | `"menupanel"` | `"tabstrip"` | `"personaltoolbar"`

##### theme\_icons

> **theme\_icons**?: [`ThemeIcon`](../interfaces/ThemeIcon.md)\[]

### browser\_specific\_settings

> **browser\_specific\_settings**?: `object`

### browser\_specific\_settings.gecko

> **browser\_specific\_settings.gecko**?: `object`

### browser\_specific\_settings.gecko.data\_collection\_permissions

> **browser\_specific\_settings.gecko.data\_collection\_permissions**?: [`FirefoxDataCollectionPermissions`](../interfaces/FirefoxDataCollectionPermissions.md)

Firefox data collection permissions configuration. See:
https://extensionworkshop.com/documentation/develop/firefox-builtin-data-consent/#specifying-data-types

### browser\_specific\_settings.gecko.id

> **browser\_specific\_settings.gecko.id**?: `string`

### browser\_specific\_settings.gecko.strict\_max\_version

> **browser\_specific\_settings.gecko.strict\_max\_version**?: `string`

### browser\_specific\_settings.gecko.strict\_min\_version

> **browser\_specific\_settings.gecko.strict\_min\_version**?: `string`

### browser\_specific\_settings.gecko.update\_url

> **browser\_specific\_settings.gecko.update\_url**?: `string`

### browser\_specific\_settings.gecko\_android

> **browser\_specific\_settings.gecko\_android**?: `object`

### browser\_specific\_settings.gecko\_android.strict\_max\_version

> **browser\_specific\_settings.gecko\_android.strict\_max\_version**?: `string`

### browser\_specific\_settings.gecko\_android.strict\_min\_version

> **browser\_specific\_settings.gecko\_android.strict\_min\_version**?: `string`

### browser\_specific\_settings.safari

> **browser\_specific\_settings.safari**?: `object`

### browser\_specific\_settings.safari.strict\_max\_version

> **browser\_specific\_settings.safari.strict\_max\_version**?: `string`

### browser\_specific\_settings.safari.strict\_min\_version

> **browser\_specific\_settings.safari.strict\_min\_version**?: `string`

### page\_action

> **page\_action**?: `Browser.runtime.ManifestV2`\[`"page_action"`] & `object`

#### Type declaration

##### browser\_style

> **browser\_style**?: `boolean`

### permissions

> **permissions**?: (`Browser.runtime.ManifestPermissions` | `string` & `Record`<`never`, `never`>)\[]

### web\_accessible\_resources

> **web\_accessible\_resources**?: `string`\[] | `Browser.runtime.ManifestV3`\[`"web_accessible_resources"`]

## Source

[packages/wxt/src/types.ts:1017](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1017)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

