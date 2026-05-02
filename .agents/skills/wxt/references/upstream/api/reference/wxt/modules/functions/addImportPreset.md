<!--
Source: https://wxt.dev/api/reference/wxt/modules/functions/addImportPreset.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../../index.md) > [wxt/modules](../index.md) > addImportPreset

# Function: addImportPreset()

> **addImportPreset**(`wxt`, `preset`): `void`

Add an Unimport preset
([built-in](https://github.com/unjs/unimport?tab=readme-ov-file#built-in-presets),
[custom](https://github.com/unjs/unimport?tab=readme-ov-file#custom-presets),
or
[auto-scanned](https://github.com/unjs/unimport?tab=readme-ov-file#exports-auto-scan)),
to the project's list of auto-imported utilities.

Some things to note:

* This function will only de-duplicate built-in preset names. It will not stop
  you adding duplicate custom or auto-scanned presets.
* If the project has disabled imports, this function has no effect.

## Parameters

▪ **wxt**: [`Wxt`](../../interfaces/Wxt.md)

The wxt instance provided by the module's setup function.

▪ **preset**: `"vitest"` | `Preset` | `"@vue/composition-api"` | `"@vueuse/core"` | `"@vueuse/head"` | `"pinia"` | `"preact"` | `"quasar"` | `"react"` | `"react-router"` | `"react-router-dom"` | `"svelte"` | `"svelte/animate"` | `"svelte/easing"` | `"svelte/motion"` | `"svelte/store"` | `"svelte/transition"` | `"vee-validate"` | `"vitepress"` | `"vue-demi"` | `"vue-i18n"` | `"vue-router"` | `"vue-router-composables"` | `"vue"` | `"vue/macros"` | `"vuex"` | `"uni-app"` | `"solid-js"` | `"solid-app-router"` | `"rxjs"` | `"date-fns"`

The preset to add to the project.

## Returns

## Example

```ts
export default defineWxtModule((wxt) => {
  // Built-in preset:
  addImportPreset(wxt, "vue");
  // Custom preset:
  addImportPreset(wxt, {
  from: "vue",
  imports: ["ref", "reactive", ...],
  });
  // Auto-scanned preset:
  addImportPreset(wxt, { package: "vue" });
  });
```

## Source

[packages/wxt/src/modules.ts:175](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/modules.ts#L175)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

