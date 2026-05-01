<!--
Source: https://wxt.dev/api/reference/wxt/interfaces/WebExtConfig.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > WebExtConfig

# Interface: WebExtConfig

Options for how [`web-ext`](https://github.com/mozilla/web-ext) starts the
browser.

## Contents

* [Properties](WebExtConfig.md#properties)
  * [binaries](WebExtConfig.md#binaries)
  * [chromiumArgs](WebExtConfig.md#chromiumargs)
  * [chromiumPort](WebExtConfig.md#chromiumport)
  * [chromiumPref](WebExtConfig.md#chromiumpref)
  * [chromiumProfile](WebExtConfig.md#chromiumprofile)
  * [disabled](WebExtConfig.md#disabled)
  * [firefoxArgs](WebExtConfig.md#firefoxargs)
  * [firefoxPref](WebExtConfig.md#firefoxpref)
  * [firefoxProfile](WebExtConfig.md#firefoxprofile)
  * [keepProfileChanges](WebExtConfig.md#keepprofilechanges)
  * [openConsole](WebExtConfig.md#openconsole)
  * [openDevtools](WebExtConfig.md#opendevtools)
  * [startUrls](WebExtConfig.md#starturls)

## Properties

### binaries

> **binaries**?: `Record`<`string`, `string`>

List of browser names and the binary that should be used to open the
browser.

#### See

* https://extensionworkshop.com/documentation/develop/web-ext-command-reference/#chromium-binary
* https://extensionworkshop.com/documentation/develop/web-ext-command-reference/#firefox

#### Source

[packages/wxt/src/types.ts:1132](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1132)

***

### chromiumArgs

> **chromiumArgs**?: `string`\[]

#### See

https://extensionworkshop.com/documentation/develop/web-ext-command-reference/#args

#### Source

[packages/wxt/src/types.ts:1175](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1175)

***

### chromiumPort

> **chromiumPort**?: `number`

By default, chrome opens a random port for debugging. Set this value to use
a specific port.

#### Source

[packages/wxt/src/types.ts:1169](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1169)

***

### chromiumPref

> **chromiumPref**?: `Record`<`string`, `any`>

An map of chrome preferences from
https://chromium.googlesource.com/chromium/src/+/main/chrome/common/pref\_names.h

#### Example

```ts
// change your downloads directory
  {
  download: {
  default_directory: "/my/custom/dir",
  },
  }
```

#### Default

```ts
// Enable dev mode and allow content script sourcemaps
{
  devtools: {
    synced_preferences_sync_disabled: {
      skipContentScripts: false,
    },
  }
  extensions: {
    ui: {
      developer_mode: true,
    },
  }
}
```

#### Source

[packages/wxt/src/types.ts:1164](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1164)

***

### chromiumProfile

> **chromiumProfile**?: `string`

#### See

https://extensionworkshop.com/documentation/develop/web-ext-command-reference/#chromium-profile

#### Source

[packages/wxt/src/types.ts:1136](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1136)

***

### disabled

> **disabled**?: `boolean`

Whether or not to open the browser with the extension installed in dev
mode.

#### Default

```ts
false
```

#### Source

[packages/wxt/src/types.ts:1120](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1120)

***

### firefoxArgs

> **firefoxArgs**?: `string`\[]

#### See

https://extensionworkshop.com/documentation/develop/web-ext-command-reference/#args

#### Source

[packages/wxt/src/types.ts:1173](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1173)

***

### firefoxPref

> **firefoxPref**?: `Record`<`string`, `string` | `number` | `boolean`>

#### See

https://extensionworkshop.com/documentation/develop/web-ext-command-reference/#pref

#### Source

[packages/wxt/src/types.ts:1171](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1171)

***

### firefoxProfile

> **firefoxProfile**?: `string`

#### See

https://extensionworkshop.com/documentation/develop/web-ext-command-reference/#firefox-profile

#### Source

[packages/wxt/src/types.ts:1134](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1134)

***

### keepProfileChanges

> **keepProfileChanges**?: `boolean`

#### See

https://extensionworkshop.com/documentation/develop/web-ext-command-reference/#keep-profile-changes

#### Source

[packages/wxt/src/types.ts:1179](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1179)

***

### openConsole

> **openConsole**?: `boolean`

#### See

https://extensionworkshop.com/documentation/develop/web-ext-command-reference/#browser-console

#### Source

[packages/wxt/src/types.ts:1122](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1122)

***

### openDevtools

> **openDevtools**?: `boolean`

#### See

https://extensionworkshop.com/documentation/develop/web-ext-command-reference/#devtools

#### Source

[packages/wxt/src/types.ts:1124](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1124)

***

### startUrls

> **startUrls**?: `string`\[]

#### See

https://extensionworkshop.com/documentation/develop/web-ext-command-reference/#start-url

#### Source

[packages/wxt/src/types.ts:1177](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1177)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

