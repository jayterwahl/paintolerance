<!--
Source: https://wxt.dev/api/reference/wxt/interfaces/ConfigEnv.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../index.md) > [wxt](../index.md) > ConfigEnv

# Interface: ConfigEnv

## Contents

* [Properties](ConfigEnv.md#properties)
  * [browser](ConfigEnv.md#browser)
  * [command](ConfigEnv.md#command)
  * [manifestVersion](ConfigEnv.md#manifestversion)
  * [mode](ConfigEnv.md#mode)

## Properties

### browser

> **browser**: `string`

Browser passed in from the CLI via the `-b` or `--browser` flag. Defaults
to `"chrome"` when not passed.

#### Source

[packages/wxt/src/types.ts:1094](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1094)

***

### command

> **command**: [`WxtCommand`](../type-aliases/WxtCommand.md)

The command used to run WXT. `"serve"` during development and `"build"` for
any other command.

#### Source

[packages/wxt/src/types.ts:1089](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1089)

***

### manifestVersion

> **manifestVersion**: `2` | `3`

Manifest version passed in from the CLI via the `--mv2` or `--mv3` flags.
When not passed, it depends on the target browser. See [the
guide](https://wxt.dev/guide/key-concepts/multiple-browsers.html#target-manifest-version)
for more details.

#### Source

[packages/wxt/src/types.ts:1101](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1101)

***

### mode

> **mode**: `string`

The build mode passed into the CLI. By default, `wxt` uses `"development"`
and `wxt build|zip` uses `"production"`.

#### Source

[packages/wxt/src/types.ts:1084](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/types.ts#L1084)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

