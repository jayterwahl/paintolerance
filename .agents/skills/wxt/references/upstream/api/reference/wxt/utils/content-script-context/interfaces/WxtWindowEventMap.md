<!--
Source: https://wxt.dev/api/reference/wxt/utils/content-script-context/interfaces/WxtWindowEventMap.md
Vendored from https://wxt.dev/llms-full.txt on 2026-04-30.
-->

[API](../../../../index.md) > [wxt/utils/content-script-context](../index.md) > WxtWindowEventMap

# Interface: WxtWindowEventMap

## Contents

* [Extends](WxtWindowEventMap.md#extends)
* [Properties](WxtWindowEventMap.md#properties)
  * [DOMContentLoaded](WxtWindowEventMap.md#domcontentloaded)
  * [abort](WxtWindowEventMap.md#abort)
  * [afterprint](WxtWindowEventMap.md#afterprint)
  * [animationcancel](WxtWindowEventMap.md#animationcancel)
  * [animationend](WxtWindowEventMap.md#animationend)
  * [animationiteration](WxtWindowEventMap.md#animationiteration)
  * [animationstart](WxtWindowEventMap.md#animationstart)
  * [auxclick](WxtWindowEventMap.md#auxclick)
  * [beforeinput](WxtWindowEventMap.md#beforeinput)
  * [beforematch](WxtWindowEventMap.md#beforematch)
  * [beforeprint](WxtWindowEventMap.md#beforeprint)
  * [beforetoggle](WxtWindowEventMap.md#beforetoggle)
  * [beforeunload](WxtWindowEventMap.md#beforeunload)
  * [blur](WxtWindowEventMap.md#blur)
  * [cancel](WxtWindowEventMap.md#cancel)
  * [canplay](WxtWindowEventMap.md#canplay)
  * [canplaythrough](WxtWindowEventMap.md#canplaythrough)
  * [change](WxtWindowEventMap.md#change)
  * [click](WxtWindowEventMap.md#click)
  * [close](WxtWindowEventMap.md#close)
  * [compositionend](WxtWindowEventMap.md#compositionend)
  * [compositionstart](WxtWindowEventMap.md#compositionstart)
  * [compositionupdate](WxtWindowEventMap.md#compositionupdate)
  * [contextlost](WxtWindowEventMap.md#contextlost)
  * [contextmenu](WxtWindowEventMap.md#contextmenu)
  * [contextrestored](WxtWindowEventMap.md#contextrestored)
  * [copy](WxtWindowEventMap.md#copy)
  * [cuechange](WxtWindowEventMap.md#cuechange)
  * [cut](WxtWindowEventMap.md#cut)
  * [dblclick](WxtWindowEventMap.md#dblclick)
  * [devicemotion](WxtWindowEventMap.md#devicemotion)
  * [deviceorientation](WxtWindowEventMap.md#deviceorientation)
  * [deviceorientationabsolute](WxtWindowEventMap.md#deviceorientationabsolute)
  * [drag](WxtWindowEventMap.md#drag)
  * [dragend](WxtWindowEventMap.md#dragend)
  * [dragenter](WxtWindowEventMap.md#dragenter)
  * [dragleave](WxtWindowEventMap.md#dragleave)
  * [dragover](WxtWindowEventMap.md#dragover)
  * [dragstart](WxtWindowEventMap.md#dragstart)
  * [drop](WxtWindowEventMap.md#drop)
  * [durationchange](WxtWindowEventMap.md#durationchange)
  * [emptied](WxtWindowEventMap.md#emptied)
  * [ended](WxtWindowEventMap.md#ended)
  * [error](WxtWindowEventMap.md#error)
  * [focus](WxtWindowEventMap.md#focus)
  * [focusin](WxtWindowEventMap.md#focusin)
  * [focusout](WxtWindowEventMap.md#focusout)
  * [formdata](WxtWindowEventMap.md#formdata)
  * [gamepadconnected](WxtWindowEventMap.md#gamepadconnected)
  * [gamepaddisconnected](WxtWindowEventMap.md#gamepaddisconnected)
  * [gotpointercapture](WxtWindowEventMap.md#gotpointercapture)
  * [hashchange](WxtWindowEventMap.md#hashchange)
  * [input](WxtWindowEventMap.md#input)
  * [invalid](WxtWindowEventMap.md#invalid)
  * [keydown](WxtWindowEventMap.md#keydown)
  * [keypress](WxtWindowEventMap.md#keypress)
  * [keyup](WxtWindowEventMap.md#keyup)
  * [languagechange](WxtWindowEventMap.md#languagechange)
  * [load](WxtWindowEventMap.md#load)
  * [loadeddata](WxtWindowEventMap.md#loadeddata)
  * [loadedmetadata](WxtWindowEventMap.md#loadedmetadata)
  * [loadstart](WxtWindowEventMap.md#loadstart)
  * [lostpointercapture](WxtWindowEventMap.md#lostpointercapture)
  * [message](WxtWindowEventMap.md#message)
  * [messageerror](WxtWindowEventMap.md#messageerror)
  * [mousedown](WxtWindowEventMap.md#mousedown)
  * [mouseenter](WxtWindowEventMap.md#mouseenter)
  * [mouseleave](WxtWindowEventMap.md#mouseleave)
  * [mousemove](WxtWindowEventMap.md#mousemove)
  * [mouseout](WxtWindowEventMap.md#mouseout)
  * [mouseover](WxtWindowEventMap.md#mouseover)
  * [mouseup](WxtWindowEventMap.md#mouseup)
  * [offline](WxtWindowEventMap.md#offline)
  * [online](WxtWindowEventMap.md#online)
  * [orientationchange](WxtWindowEventMap.md#orientationchange)
  * [pagehide](WxtWindowEventMap.md#pagehide)
  * [pagereveal](WxtWindowEventMap.md#pagereveal)
  * [pageshow](WxtWindowEventMap.md#pageshow)
  * [pageswap](WxtWindowEventMap.md#pageswap)
  * [paste](WxtWindowEventMap.md#paste)
  * [pause](WxtWindowEventMap.md#pause)
  * [play](WxtWindowEventMap.md#play)
  * [playing](WxtWindowEventMap.md#playing)
  * [pointercancel](WxtWindowEventMap.md#pointercancel)
  * [pointerdown](WxtWindowEventMap.md#pointerdown)
  * [pointerenter](WxtWindowEventMap.md#pointerenter)
  * [pointerleave](WxtWindowEventMap.md#pointerleave)
  * [pointermove](WxtWindowEventMap.md#pointermove)
  * [pointerout](WxtWindowEventMap.md#pointerout)
  * [pointerover](WxtWindowEventMap.md#pointerover)
  * [pointerrawupdate](WxtWindowEventMap.md#pointerrawupdate)
  * [pointerup](WxtWindowEventMap.md#pointerup)
  * [popstate](WxtWindowEventMap.md#popstate)
  * [progress](WxtWindowEventMap.md#progress)
  * [ratechange](WxtWindowEventMap.md#ratechange)
  * [rejectionhandled](WxtWindowEventMap.md#rejectionhandled)
  * [reset](WxtWindowEventMap.md#reset)
  * [resize](WxtWindowEventMap.md#resize)
  * [scroll](WxtWindowEventMap.md#scroll)
  * [scrollend](WxtWindowEventMap.md#scrollend)
  * [securitypolicyviolation](WxtWindowEventMap.md#securitypolicyviolation)
  * [seeked](WxtWindowEventMap.md#seeked)
  * [seeking](WxtWindowEventMap.md#seeking)
  * [select](WxtWindowEventMap.md#select)
  * [selectionchange](WxtWindowEventMap.md#selectionchange)
  * [selectstart](WxtWindowEventMap.md#selectstart)
  * [slotchange](WxtWindowEventMap.md#slotchange)
  * [stalled](WxtWindowEventMap.md#stalled)
  * [storage](WxtWindowEventMap.md#storage)
  * [submit](WxtWindowEventMap.md#submit)
  * [suspend](WxtWindowEventMap.md#suspend)
  * [timeupdate](WxtWindowEventMap.md#timeupdate)
  * [toggle](WxtWindowEventMap.md#toggle)
  * [touchcancel](WxtWindowEventMap.md#touchcancel)
  * [touchend](WxtWindowEventMap.md#touchend)
  * [touchmove](WxtWindowEventMap.md#touchmove)
  * [touchstart](WxtWindowEventMap.md#touchstart)
  * [transitioncancel](WxtWindowEventMap.md#transitioncancel)
  * [transitionend](WxtWindowEventMap.md#transitionend)
  * [transitionrun](WxtWindowEventMap.md#transitionrun)
  * [transitionstart](WxtWindowEventMap.md#transitionstart)
  * [unhandledrejection](WxtWindowEventMap.md#unhandledrejection)
  * [unload](WxtWindowEventMap.md#unload)
  * [vite:preloadError](WxtWindowEventMap.md#vitepreloaderror)
  * [volumechange](WxtWindowEventMap.md#volumechange)
  * [waiting](WxtWindowEventMap.md#waiting)
  * [webkitanimationend](WxtWindowEventMap.md#webkitanimationend)
  * [webkitanimationiteration](WxtWindowEventMap.md#webkitanimationiteration)
  * [webkitanimationstart](WxtWindowEventMap.md#webkitanimationstart)
  * [webkittransitionend](WxtWindowEventMap.md#webkittransitionend)
  * [wheel](WxtWindowEventMap.md#wheel)
  * [wxt:locationchange](WxtWindowEventMap.md#wxtlocationchange)

## Extends

* `WindowEventMap`

## Properties

### DOMContentLoaded

> **DOMContentLoaded**: `Event`

#### Inherited from

WindowEventMap.DOMContentLoaded

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:36344

***

### abort

> **abort**: `UIEvent`

#### Inherited from

WindowEventMap.abort

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12634

***

### afterprint

> **afterprint**: `Event`

#### Inherited from

WindowEventMap.afterprint

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:36808

***

### animationcancel

> **animationcancel**: `AnimationEvent`

#### Inherited from

WindowEventMap.animationcancel

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12635

***

### animationend

> **animationend**: `AnimationEvent`

#### Inherited from

WindowEventMap.animationend

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12636

***

### animationiteration

> **animationiteration**: `AnimationEvent`

#### Inherited from

WindowEventMap.animationiteration

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12637

***

### animationstart

> **animationstart**: `AnimationEvent`

#### Inherited from

WindowEventMap.animationstart

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12638

***

### auxclick

> **auxclick**: `PointerEvent`

#### Inherited from

WindowEventMap.auxclick

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12639

***

### beforeinput

> **beforeinput**: `InputEvent`

#### Inherited from

WindowEventMap.beforeinput

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12640

***

### beforematch

> **beforematch**: `Event`

#### Inherited from

WindowEventMap.beforematch

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12641

***

### beforeprint

> **beforeprint**: `Event`

#### Inherited from

WindowEventMap.beforeprint

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:36809

***

### beforetoggle

> **beforetoggle**: `ToggleEvent`

#### Inherited from

WindowEventMap.beforetoggle

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12642

***

### beforeunload

> **beforeunload**: `BeforeUnloadEvent`

#### Inherited from

WindowEventMap.beforeunload

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:36810

***

### blur

> **blur**: `FocusEvent`

#### Inherited from

WindowEventMap.blur

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12643

***

### cancel

> **cancel**: `Event`

#### Inherited from

WindowEventMap.cancel

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12644

***

### canplay

> **canplay**: `Event`

#### Inherited from

WindowEventMap.canplay

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12645

***

### canplaythrough

> **canplaythrough**: `Event`

#### Inherited from

WindowEventMap.canplaythrough

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12646

***

### change

> **change**: `Event`

#### Inherited from

WindowEventMap.change

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12647

***

### click

> **click**: `PointerEvent`

#### Inherited from

WindowEventMap.click

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12648

***

### close

> **close**: `Event`

#### Inherited from

WindowEventMap.close

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12649

***

### compositionend

> **compositionend**: `CompositionEvent`

#### Inherited from

WindowEventMap.compositionend

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12650

***

### compositionstart

> **compositionstart**: `CompositionEvent`

#### Inherited from

WindowEventMap.compositionstart

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12651

***

### compositionupdate

> **compositionupdate**: `CompositionEvent`

#### Inherited from

WindowEventMap.compositionupdate

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12652

***

### contextlost

> **contextlost**: `Event`

#### Inherited from

WindowEventMap.contextlost

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12653

***

### contextmenu

> **contextmenu**: `PointerEvent`

#### Inherited from

WindowEventMap.contextmenu

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12654

***

### contextrestored

> **contextrestored**: `Event`

#### Inherited from

WindowEventMap.contextrestored

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12655

***

### copy

> **copy**: `ClipboardEvent`

#### Inherited from

WindowEventMap.copy

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12656

***

### cuechange

> **cuechange**: `Event`

#### Inherited from

WindowEventMap.cuechange

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12657

***

### cut

> **cut**: `ClipboardEvent`

#### Inherited from

WindowEventMap.cut

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12658

***

### dblclick

> **dblclick**: `MouseEvent`

#### Inherited from

WindowEventMap.dblclick

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12659

***

### devicemotion

> **devicemotion**: `DeviceMotionEvent`

#### Inherited from

WindowEventMap.devicemotion

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:36345

***

### deviceorientation

> **deviceorientation**: `DeviceOrientationEvent`

#### Inherited from

WindowEventMap.deviceorientation

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:36346

***

### deviceorientationabsolute

> **deviceorientationabsolute**: `DeviceOrientationEvent`

#### Inherited from

WindowEventMap.deviceorientationabsolute

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:36347

***

### drag

> **drag**: `DragEvent`

#### Inherited from

WindowEventMap.drag

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12660

***

### dragend

> **dragend**: `DragEvent`

#### Inherited from

WindowEventMap.dragend

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12661

***

### dragenter

> **dragenter**: `DragEvent`

#### Inherited from

WindowEventMap.dragenter

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12662

***

### dragleave

> **dragleave**: `DragEvent`

#### Inherited from

WindowEventMap.dragleave

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12663

***

### dragover

> **dragover**: `DragEvent`

#### Inherited from

WindowEventMap.dragover

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12664

***

### dragstart

> **dragstart**: `DragEvent`

#### Inherited from

WindowEventMap.dragstart

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12665

***

### drop

> **drop**: `DragEvent`

#### Inherited from

WindowEventMap.drop

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12666

***

### durationchange

> **durationchange**: `Event`

#### Inherited from

WindowEventMap.durationchange

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12667

***

### emptied

> **emptied**: `Event`

#### Inherited from

WindowEventMap.emptied

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12668

***

### ended

> **ended**: `Event`

#### Inherited from

WindowEventMap.ended

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12669

***

### error

> **error**: `ErrorEvent`

#### Inherited from

WindowEventMap.error

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12670

***

### focus

> **focus**: `FocusEvent`

#### Inherited from

WindowEventMap.focus

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12671

***

### focusin

> **focusin**: `FocusEvent`

#### Inherited from

WindowEventMap.focusin

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12672

***

### focusout

> **focusout**: `FocusEvent`

#### Inherited from

WindowEventMap.focusout

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12673

***

### formdata

> **formdata**: `FormDataEvent`

#### Inherited from

WindowEventMap.formdata

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12674

***

### gamepadconnected

> **gamepadconnected**: `GamepadEvent`

#### Inherited from

WindowEventMap.gamepadconnected

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:36348

***

### gamepaddisconnected

> **gamepaddisconnected**: `GamepadEvent`

#### Inherited from

WindowEventMap.gamepaddisconnected

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:36349

***

### gotpointercapture

> **gotpointercapture**: `PointerEvent`

#### Inherited from

WindowEventMap.gotpointercapture

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12675

***

### hashchange

> **hashchange**: `HashChangeEvent`

#### Inherited from

WindowEventMap.hashchange

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:36813

***

### input

> **input**: `Event`

#### Inherited from

WindowEventMap.input

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12676

***

### invalid

> **invalid**: `Event`

#### Inherited from

WindowEventMap.invalid

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12677

***

### keydown

> **keydown**: `KeyboardEvent`

#### Inherited from

WindowEventMap.keydown

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12678

***

### keypress

> **keypress**: `KeyboardEvent`

#### Inherited from

WindowEventMap.keypress

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12679

***

### keyup

> **keyup**: `KeyboardEvent`

#### Inherited from

WindowEventMap.keyup

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12680

***

### languagechange

> **languagechange**: `Event`

#### Inherited from

WindowEventMap.languagechange

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:36814

***

### load

> **load**: `Event`

#### Inherited from

WindowEventMap.load

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12681

***

### loadeddata

> **loadeddata**: `Event`

#### Inherited from

WindowEventMap.loadeddata

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12682

***

### loadedmetadata

> **loadedmetadata**: `Event`

#### Inherited from

WindowEventMap.loadedmetadata

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12683

***

### loadstart

> **loadstart**: `Event`

#### Inherited from

WindowEventMap.loadstart

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12684

***

### lostpointercapture

> **lostpointercapture**: `PointerEvent`

#### Inherited from

WindowEventMap.lostpointercapture

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12685

***

### message

> **message**: `MessageEvent`<`any`>

#### Inherited from

WindowEventMap.message

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:36815

***

### messageerror

> **messageerror**: `MessageEvent`<`any`>

#### Inherited from

WindowEventMap.messageerror

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:36816

***

### mousedown

> **mousedown**: `MouseEvent`

#### Inherited from

WindowEventMap.mousedown

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12686

***

### mouseenter

> **mouseenter**: `MouseEvent`

#### Inherited from

WindowEventMap.mouseenter

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12687

***

### mouseleave

> **mouseleave**: `MouseEvent`

#### Inherited from

WindowEventMap.mouseleave

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12688

***

### mousemove

> **mousemove**: `MouseEvent`

#### Inherited from

WindowEventMap.mousemove

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12689

***

### mouseout

> **mouseout**: `MouseEvent`

#### Inherited from

WindowEventMap.mouseout

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12690

***

### mouseover

> **mouseover**: `MouseEvent`

#### Inherited from

WindowEventMap.mouseover

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12691

***

### mouseup

> **mouseup**: `MouseEvent`

#### Inherited from

WindowEventMap.mouseup

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12692

***

### offline

> **offline**: `Event`

#### Inherited from

WindowEventMap.offline

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:36817

***

### online

> **online**: `Event`

#### Inherited from

WindowEventMap.online

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:36818

***

### orientationchange

> **orientationchange**: `Event`

#### Inherited from

WindowEventMap.orientationchange

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:36350

***

### pagehide

> **pagehide**: `PageTransitionEvent`

#### Inherited from

WindowEventMap.pagehide

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:36819

***

### pagereveal

> **pagereveal**: `PageRevealEvent`

#### Inherited from

WindowEventMap.pagereveal

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:36820

***

### pageshow

> **pageshow**: `PageTransitionEvent`

#### Inherited from

WindowEventMap.pageshow

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:36821

***

### pageswap

> **pageswap**: `PageSwapEvent`

#### Inherited from

WindowEventMap.pageswap

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:36822

***

### paste

> **paste**: `ClipboardEvent`

#### Inherited from

WindowEventMap.paste

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12693

***

### pause

> **pause**: `Event`

#### Inherited from

WindowEventMap.pause

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12694

***

### play

> **play**: `Event`

#### Inherited from

WindowEventMap.play

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12695

***

### playing

> **playing**: `Event`

#### Inherited from

WindowEventMap.playing

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12696

***

### pointercancel

> **pointercancel**: `PointerEvent`

#### Inherited from

WindowEventMap.pointercancel

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12697

***

### pointerdown

> **pointerdown**: `PointerEvent`

#### Inherited from

WindowEventMap.pointerdown

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12698

***

### pointerenter

> **pointerenter**: `PointerEvent`

#### Inherited from

WindowEventMap.pointerenter

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12699

***

### pointerleave

> **pointerleave**: `PointerEvent`

#### Inherited from

WindowEventMap.pointerleave

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12700

***

### pointermove

> **pointermove**: `PointerEvent`

#### Inherited from

WindowEventMap.pointermove

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12701

***

### pointerout

> **pointerout**: `PointerEvent`

#### Inherited from

WindowEventMap.pointerout

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12702

***

### pointerover

> **pointerover**: `PointerEvent`

#### Inherited from

WindowEventMap.pointerover

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12703

***

### pointerrawupdate

> **pointerrawupdate**: `Event`

#### Inherited from

WindowEventMap.pointerrawupdate

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12704

***

### pointerup

> **pointerup**: `PointerEvent`

#### Inherited from

WindowEventMap.pointerup

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12705

***

### popstate

> **popstate**: `PopStateEvent`

#### Inherited from

WindowEventMap.popstate

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:36823

***

### progress

> **progress**: `ProgressEvent`<`EventTarget`>

#### Inherited from

WindowEventMap.progress

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12706

***

### ratechange

> **ratechange**: `Event`

#### Inherited from

WindowEventMap.ratechange

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12707

***

### rejectionhandled

> **rejectionhandled**: `PromiseRejectionEvent`

#### Inherited from

WindowEventMap.rejectionhandled

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:36824

***

### reset

> **reset**: `Event`

#### Inherited from

WindowEventMap.reset

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12708

***

### resize

> **resize**: `UIEvent`

#### Inherited from

WindowEventMap.resize

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12709

***

### scroll

> **scroll**: `Event`

#### Inherited from

WindowEventMap.scroll

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12710

***

### scrollend

> **scrollend**: `Event`

#### Inherited from

WindowEventMap.scrollend

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12711

***

### securitypolicyviolation

> **securitypolicyviolation**: `SecurityPolicyViolationEvent`

#### Inherited from

WindowEventMap.securitypolicyviolation

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12712

***

### seeked

> **seeked**: `Event`

#### Inherited from

WindowEventMap.seeked

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12713

***

### seeking

> **seeking**: `Event`

#### Inherited from

WindowEventMap.seeking

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12714

***

### select

> **select**: `Event`

#### Inherited from

WindowEventMap.select

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12715

***

### selectionchange

> **selectionchange**: `Event`

#### Inherited from

WindowEventMap.selectionchange

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12716

***

### selectstart

> **selectstart**: `Event`

#### Inherited from

WindowEventMap.selectstart

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12717

***

### slotchange

> **slotchange**: `Event`

#### Inherited from

WindowEventMap.slotchange

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12718

***

### stalled

> **stalled**: `Event`

#### Inherited from

WindowEventMap.stalled

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12719

***

### storage

> **storage**: `StorageEvent`

#### Inherited from

WindowEventMap.storage

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:36825

***

### submit

> **submit**: `SubmitEvent`

#### Inherited from

WindowEventMap.submit

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12720

***

### suspend

> **suspend**: `Event`

#### Inherited from

WindowEventMap.suspend

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12721

***

### timeupdate

> **timeupdate**: `Event`

#### Inherited from

WindowEventMap.timeupdate

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12722

***

### toggle

> **toggle**: `ToggleEvent`

#### Inherited from

WindowEventMap.toggle

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12723

***

### touchcancel

> **touchcancel**: `TouchEvent`

#### Inherited from

WindowEventMap.touchcancel

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12724

***

### touchend

> **touchend**: `TouchEvent`

#### Inherited from

WindowEventMap.touchend

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12725

***

### touchmove

> **touchmove**: `TouchEvent`

#### Inherited from

WindowEventMap.touchmove

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12726

***

### touchstart

> **touchstart**: `TouchEvent`

#### Inherited from

WindowEventMap.touchstart

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12727

***

### transitioncancel

> **transitioncancel**: `TransitionEvent`

#### Inherited from

WindowEventMap.transitioncancel

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12728

***

### transitionend

> **transitionend**: `TransitionEvent`

#### Inherited from

WindowEventMap.transitionend

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12729

***

### transitionrun

> **transitionrun**: `TransitionEvent`

#### Inherited from

WindowEventMap.transitionrun

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12730

***

### transitionstart

> **transitionstart**: `TransitionEvent`

#### Inherited from

WindowEventMap.transitionstart

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12731

***

### unhandledrejection

> **unhandledrejection**: `PromiseRejectionEvent`

#### Inherited from

WindowEventMap.unhandledrejection

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:36826

***

### unload

> **unload**: `Event`

#### Inherited from

WindowEventMap.unload

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:36827

***

### vite:preloadError

> **vite:preloadError**: `VitePreloadErrorEvent`

#### Inherited from

WindowEventMap.vite:preloadError

#### Source

node\_modules/.bun/vite@7.3.1+1d00b8d6ec155a96/node\_modules/vite/client.d.ts:278

***

### volumechange

> **volumechange**: `Event`

#### Inherited from

WindowEventMap.volumechange

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12732

***

### waiting

> **waiting**: `Event`

#### Inherited from

WindowEventMap.waiting

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12733

***

### webkitanimationend

> **webkitanimationend**: `Event`

#### Inherited from

WindowEventMap.webkitanimationend

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12734

***

### webkitanimationiteration

> **webkitanimationiteration**: `Event`

#### Inherited from

WindowEventMap.webkitanimationiteration

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12735

***

### webkitanimationstart

> **webkitanimationstart**: `Event`

#### Inherited from

WindowEventMap.webkitanimationstart

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12736

***

### webkittransitionend

> **webkittransitionend**: `Event`

#### Inherited from

WindowEventMap.webkittransitionend

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12737

***

### wheel

> **wheel**: `WheelEvent`

#### Inherited from

WindowEventMap.wheel

#### Source

node\_modules/.bun/typescript@5.9.3/node\_modules/typescript/lib/lib.dom.d.ts:12738

***

### wxt:locationchange

> **wxt:locationchange**: `WxtLocationChangeEvent`

#### Source

[packages/wxt/src/utils/content-script-context.ts:306](https://github.com/wxt-dev/wxt/blob/c15167ca86ac954d03bdd70be14515379f237072/packages/wxt/src/utils/content-script-context.ts#L306)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)

