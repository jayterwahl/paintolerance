<!--
Source: https://wxt.dev/api/reference/wxt/utils/match-patterns/classes/MatchPattern.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../../../index.md) > [wxt/utils/match-patterns](../index.md) > MatchPattern

# Class: MatchPattern

Class for parsing and performing operations on match patterns.

## Contents

* [Example](MatchPattern.md#example)
* [Constructors](MatchPattern.md#constructors)
  * [new MatchPattern(matchPattern)](MatchPattern.md#new-matchpatternmatchpattern)
* [Properties](MatchPattern.md#properties)
  * [convertPatternToRegex](MatchPattern.md#convertpatterntoregex)
  * [escapeForRegex](MatchPattern.md#escapeforregex)
  * [hostnameMatch](MatchPattern.md#hostnamematch)
  * [isAllUrls](MatchPattern.md#isallurls)
  * [isFileMatch](MatchPattern.md#isfilematch)
  * [isFtpMatch](MatchPattern.md#isftpmatch)
  * [isHostPathMatch](MatchPattern.md#ishostpathmatch)
  * [isHttpMatch](MatchPattern.md#ishttpmatch)
  * [isHttpsMatch](MatchPattern.md#ishttpsmatch)
  * [isUrnMatch](MatchPattern.md#isurnmatch)
  * [pathnameMatch](MatchPattern.md#pathnamematch)
  * [protocolMatches](MatchPattern.md#protocolmatches)
  * [PROTOCOLS](MatchPattern.md#protocols)
* [Methods](MatchPattern.md#methods)
  * [includes()](MatchPattern.md#includes)

## Example

```ts
const pattern = new MatchPattern("*://google.com/*");

pattern.includes("https://google.com");            // true
pattern.includes("http://youtube.com/watch?v=123") // false
```

## Constructors

### new MatchPattern(matchPattern)

> **new MatchPattern**(`matchPattern`): [`MatchPattern`](MatchPattern.md)

Parse a match pattern string. If it is invalid, the constructor will throw an
`InvalidMatchPattern` error.

#### Parameters

▪ **matchPattern**: `string`

The match pattern to parse.

#### Source

node\_modules/.bun/@webext-core+match-patterns@1.0.3/node\_modules/@webext-core/match-patterns/lib/index.d.ts:22

## Properties

### convertPatternToRegex

> **`private`** **convertPatternToRegex**: `any`

#### Source

node\_modules/.bun/@webext-core+match-patterns@1.0.3/node\_modules/@webext-core/match-patterns/lib/index.d.ts:33

***

### escapeForRegex

> **`private`** **escapeForRegex**: `any`

#### Source

node\_modules/.bun/@webext-core+match-patterns@1.0.3/node\_modules/@webext-core/match-patterns/lib/index.d.ts:34

***

### hostnameMatch

> **`private`** **hostnameMatch**: `any`

#### Source

node\_modules/.bun/@webext-core+match-patterns@1.0.3/node\_modules/@webext-core/match-patterns/lib/index.d.ts:13

***

### isAllUrls

> **`private`** **isAllUrls**?: `any`

#### Source

node\_modules/.bun/@webext-core+match-patterns@1.0.3/node\_modules/@webext-core/match-patterns/lib/index.d.ts:15

***

### isFileMatch

> **`private`** **isFileMatch**: `any`

#### Source

node\_modules/.bun/@webext-core+match-patterns@1.0.3/node\_modules/@webext-core/match-patterns/lib/index.d.ts:30

***

### isFtpMatch

> **`private`** **isFtpMatch**: `any`

#### Source

node\_modules/.bun/@webext-core+match-patterns@1.0.3/node\_modules/@webext-core/match-patterns/lib/index.d.ts:31

***

### isHostPathMatch

> **`private`** **isHostPathMatch**: `any`

#### Source

node\_modules/.bun/@webext-core+match-patterns@1.0.3/node\_modules/@webext-core/match-patterns/lib/index.d.ts:29

***

### isHttpMatch

> **`private`** **isHttpMatch**: `any`

#### Source

node\_modules/.bun/@webext-core+match-patterns@1.0.3/node\_modules/@webext-core/match-patterns/lib/index.d.ts:27

***

### isHttpsMatch

> **`private`** **isHttpsMatch**: `any`

#### Source

node\_modules/.bun/@webext-core+match-patterns@1.0.3/node\_modules/@webext-core/match-patterns/lib/index.d.ts:28

***

### isUrnMatch

> **`private`** **isUrnMatch**: `any`

#### Source

node\_modules/.bun/@webext-core+match-patterns@1.0.3/node\_modules/@webext-core/match-patterns/lib/index.d.ts:32

***

### pathnameMatch

> **`private`** **pathnameMatch**: `any`

#### Source

node\_modules/.bun/@webext-core+match-patterns@1.0.3/node\_modules/@webext-core/match-patterns/lib/index.d.ts:14

***

### protocolMatches

> **`private`** **protocolMatches**: `any`

#### Source

node\_modules/.bun/@webext-core+match-patterns@1.0.3/node\_modules/@webext-core/match-patterns/lib/index.d.ts:12

***

### PROTOCOLS

> **`static`** **PROTOCOLS**: `string`\[]

#### Source

node\_modules/.bun/@webext-core+match-patterns@1.0.3/node\_modules/@webext-core/match-patterns/lib/index.d.ts:11

## Methods

### includes()

> **includes**(`url`): `boolean`

Check if a URL is included in a pattern.

#### Parameters

▪ **url**: `string` | `URL` | `Location`

#### Source

node\_modules/.bun/@webext-core+match-patterns@1.0.3/node\_modules/@webext-core/match-patterns/lib/index.d.ts:26

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

