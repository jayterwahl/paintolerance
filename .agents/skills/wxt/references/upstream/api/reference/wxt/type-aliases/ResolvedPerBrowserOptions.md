<!--
Source: https://wxt.dev/api/reference/wxt/type-aliases/ResolvedPerBrowserOptions.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > ResolvedPerBrowserOptions

# Type alias: ResolvedPerBrowserOptions`<T, TOmitted>`

> **ResolvedPerBrowserOptions**<`T`, `TOmitted`>: `{ [key in keyof Omit<T, TOmitted>]: T[key] extends PerBrowserOption<infer U> ? U : T[key] }` & `{ [key in TOmitted]: T[key] }`

Convert `{ key: PerBrowserOption<T> }` to just `{ key: T }`, stripping away
the `PerBrowserOption` type for all fields inside the object.

A optional second list of keys can be passed if a field isn't compatible with
`PerBrowserOption`, like `defaultIcon`.

## Type parameters

| Parameter | Default |
| :------ | :------ |
| `T` | - |
| `TOmitted` extends keyof `T` | `never` |

## Source

[packages/wxt/src/types.ts:972](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L972)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

