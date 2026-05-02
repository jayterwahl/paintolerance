<!--
Source: https://wxt.dev/api/reference/wxt.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../index.md) > wxt

# Module: wxt

This module contains:

* JS APIs used by the CLI to build extensions or start dev mode.
* Helper functions for defining project config.
* Types for building and extension or configuring WXT.

## Index

### Interfaces

* [BackgroundDefinition](interfaces/BackgroundDefinition.md)
* [BackgroundEntrypoint](interfaces/BackgroundEntrypoint.md)
* [BackgroundEntrypointOptions](interfaces/BackgroundEntrypointOptions.md)
* [BaseContentScriptEntrypointOptions](interfaces/BaseContentScriptEntrypointOptions.md)
* [BaseEntrypoint](interfaces/BaseEntrypoint.md)
* [BaseEntrypointOptions](interfaces/BaseEntrypointOptions.md)
* [BaseScriptEntrypointOptions](interfaces/BaseScriptEntrypointOptions.md)
* [BuildOutput](interfaces/BuildOutput.md)
* [BuildStepOutput](interfaces/BuildStepOutput.md)
* [ConfigEnv](interfaces/ConfigEnv.md)
* [ContentScriptEntrypoint](interfaces/ContentScriptEntrypoint.md)
* [CopiedPublicFile](interfaces/CopiedPublicFile.md)
* [Dependency](interfaces/Dependency.md)
* [EntrypointInfo](interfaces/EntrypointInfo.md)
* [Eslintrc](interfaces/Eslintrc.md)
* [ExtensionRunner](interfaces/ExtensionRunner.md)
* [FirefoxDataCollectionPermissions](interfaces/FirefoxDataCollectionPermissions.md)
* [FsCache](interfaces/FsCache.md)
* [GeneratedPublicFile](interfaces/GeneratedPublicFile.md)
* [GenericEntrypoint](interfaces/GenericEntrypoint.md)
* [InlineConfig](interfaces/InlineConfig.md)
* [IsolatedWorldContentScriptDefinition](interfaces/IsolatedWorldContentScriptDefinition.md)
* [IsolatedWorldContentScriptEntrypointOptions](interfaces/IsolatedWorldContentScriptEntrypointOptions.md)
* [Logger](interfaces/Logger.md)
* [MainWorldContentScriptDefinition](interfaces/MainWorldContentScriptDefinition.md)
* [MainWorldContentScriptEntrypointOptions](interfaces/MainWorldContentScriptEntrypointOptions.md)
* [OptionsEntrypoint](interfaces/OptionsEntrypoint.md)
* [OptionsEntrypointOptions](interfaces/OptionsEntrypointOptions.md)
* [OutputAsset](interfaces/OutputAsset.md)
* [OutputChunk](interfaces/OutputChunk.md)
* [PopupEntrypoint](interfaces/PopupEntrypoint.md)
* [PopupEntrypointOptions](interfaces/PopupEntrypointOptions.md)
* [ReloadContentScriptPayload](interfaces/ReloadContentScriptPayload.md)
* [ResolvedBasePublicFile](interfaces/ResolvedBasePublicFile.md)
* [ResolvedConfig](interfaces/ResolvedConfig.md)
* [ResolvedEslintrc](interfaces/ResolvedEslintrc.md)
* [ServerInfo](interfaces/ServerInfo.md)
* [SidepanelEntrypoint](interfaces/SidepanelEntrypoint.md)
* [SidepanelEntrypointOptions](interfaces/SidepanelEntrypointOptions.md)
* [ThemeIcon](interfaces/ThemeIcon.md)
* [UnlistedScriptDefinition](interfaces/UnlistedScriptDefinition.md)
* [UnlistedScriptEntrypoint](interfaces/UnlistedScriptEntrypoint.md)
* [WebExtConfig](interfaces/WebExtConfig.md)
* [Wxt](interfaces/Wxt.md)
* [WxtBuilder](interfaces/WxtBuilder.md)
* [WxtBuilderServer](interfaces/WxtBuilderServer.md)
* [WxtDevServer](interfaces/WxtDevServer.md)
* [WxtDirFileEntry](interfaces/WxtDirFileEntry.md)
* [WxtDirTypeReferenceEntry](interfaces/WxtDirTypeReferenceEntry.md)
* [WxtHooks](interfaces/WxtHooks.md)
* [WxtModule](interfaces/WxtModule.md)
* [WxtModuleWithMetadata](interfaces/WxtModuleWithMetadata.md)
* [WxtPackageManager](interfaces/WxtPackageManager.md)

### Type Aliases

* [ContentScriptDefinition](type-aliases/ContentScriptDefinition.md)
* [Entrypoint](type-aliases/Entrypoint.md)
* [EntrypointGroup](type-aliases/EntrypointGroup.md)
* [EslintGlobalsPropValue](type-aliases/EslintGlobalsPropValue.md)
* [ExtensionRunnerConfig](type-aliases/ExtensionRunnerConfig.md)
* [FirefoxDataCollectionType](type-aliases/FirefoxDataCollectionType.md)
* [HookResult](type-aliases/HookResult.md)
* [OnContentScriptStopped](type-aliases/OnContentScriptStopped.md)
* [OutputFile](type-aliases/OutputFile.md)
* [PerBrowserMap](type-aliases/PerBrowserMap.md)
* [PerBrowserOption](type-aliases/PerBrowserOption.md)
* [PublicPathEntry](type-aliases/PublicPathEntry.md)
* [ResolvedPerBrowserOptions](type-aliases/ResolvedPerBrowserOptions.md)
* [ResolvedPublicFile](type-aliases/ResolvedPublicFile.md)
* [TargetBrowser](type-aliases/TargetBrowser.md)
* [TargetManifestVersion](type-aliases/TargetManifestVersion.md)
* [UserConfig](type-aliases/UserConfig.md)
* [UserManifest](type-aliases/UserManifest.md)
* [UserManifestFn](type-aliases/UserManifestFn.md)
* [WxtCommand](type-aliases/WxtCommand.md)
* [WxtDirEntry](type-aliases/WxtDirEntry.md)
* [WxtModuleOptions](type-aliases/WxtModuleOptions.md)
* [WxtModuleSetup](type-aliases/WxtModuleSetup.md)
* [WxtPlugin](type-aliases/WxtPlugin.md)
* [WxtResolvedUnimportOptions](type-aliases/WxtResolvedUnimportOptions.md)
* [WxtUnimportOptions](type-aliases/WxtUnimportOptions.md)
* [WxtViteConfig](type-aliases/WxtViteConfig.md)

### Variables

* [version](variables/version.md)

### Functions

* [build](functions/build.md)
* [clean](functions/clean.md)
* [createServer](functions/createServer.md)
* [defineConfig](functions/defineConfig.md)
* [defineRunnerConfig](functions/defineRunnerConfig.md)
* [defineWebExtConfig](functions/defineWebExtConfig.md)
* [initialize](functions/initialize.md)
* [normalizePath](functions/normalizePath.md)
* [prepare](functions/prepare.md)
* [zip](functions/zip.md)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

