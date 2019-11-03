Clazz.declarePackage ("org.eclipse.jface.bindings.keys");
Clazz.load (["org.eclipse.jface.bindings.keys.formatting.NativeKeyFormatter"], "org.eclipse.jface.bindings.keys.SWTKeySupport", ["java.lang.Character", "org.eclipse.jface.bindings.keys.KeyStroke", "$wt.SWT"], function () {
c$ = Clazz.declareType (org.eclipse.jface.bindings.keys, "SWTKeySupport");
c$.convertAcceleratorToKeyStroke = Clazz.defineMethod (c$, "convertAcceleratorToKeyStroke", 
function (accelerator) {
var modifierKeys = accelerator & $WT.MODIFIER_MASK;
var naturalKey;
if (accelerator == modifierKeys) {
naturalKey = 0;
} else {
naturalKey = accelerator - modifierKeys;
}return org.eclipse.jface.bindings.keys.KeyStroke.getInstance (modifierKeys, naturalKey);
}, "~N");
c$.convertEventToModifiedAccelerator = Clazz.defineMethod (c$, "convertEventToModifiedAccelerator", 
function (event) {
var modifiers = event.stateMask & $WT.MODIFIER_MASK;
var character = org.eclipse.jface.bindings.keys.SWTKeySupport.topKey (event);
return modifiers + org.eclipse.jface.bindings.keys.SWTKeySupport.toUpperCase (character.charCodeAt (0));
}, "$wt.widgets.Event");
c$.convertEventToUnmodifiedAccelerator = Clazz.defineMethod (c$, "convertEventToUnmodifiedAccelerator", 
function (event) {
return org.eclipse.jface.bindings.keys.SWTKeySupport.convertEventToUnmodifiedAccelerator (event.stateMask, event.keyCode);
}, "$wt.widgets.Event");
c$.convertEventToUnmodifiedAccelerator = Clazz.defineMethod (c$, "convertEventToUnmodifiedAccelerator", 
($fz = function (stateMask, keyCode) {
var modifiers = stateMask & $WT.MODIFIER_MASK;
var character = keyCode;
return modifiers + org.eclipse.jface.bindings.keys.SWTKeySupport.toUpperCase (character);
}, $fz.isPrivate = true, $fz), "~N,~N");
c$.convertEventToUnmodifiedAccelerator = Clazz.defineMethod (c$, "convertEventToUnmodifiedAccelerator", 
function (event) {
return org.eclipse.jface.bindings.keys.SWTKeySupport.convertEventToUnmodifiedAccelerator (event.stateMask, event.keyCode);
}, "$wt.events.KeyEvent");
c$.convertEventToUnshiftedModifiedAccelerator = Clazz.defineMethod (c$, "convertEventToUnshiftedModifiedAccelerator", 
function (event) {
if (Character.isLetter (String.fromCharCode (event.keyCode))) {
return org.eclipse.jface.bindings.keys.SWTKeySupport.convertEventToUnmodifiedAccelerator (event);
}var modifiers = event.stateMask & ($WT.MODIFIER_MASK ^ 131072);
var character = org.eclipse.jface.bindings.keys.SWTKeySupport.topKey (event);
return modifiers + org.eclipse.jface.bindings.keys.SWTKeySupport.toUpperCase (character.charCodeAt (0));
}, "$wt.widgets.Event");
c$.convertKeyStrokeToAccelerator = Clazz.defineMethod (c$, "convertKeyStrokeToAccelerator", 
function (keyStroke) {
return keyStroke.getModifierKeys () + keyStroke.getNaturalKey ();
}, "org.eclipse.jface.bindings.keys.KeyStroke");
c$.getKeyFormatterForPlatform = Clazz.defineMethod (c$, "getKeyFormatterForPlatform", 
function () {
return org.eclipse.jface.bindings.keys.SWTKeySupport.NATIVE_FORMATTER;
});
c$.topKey = Clazz.defineMethod (c$, "topKey", 
($fz = function (event) {
var character = event.character;
var ctrlDown = (event.stateMask & 262144) != 0;
if (ctrlDown && (event.character).charCodeAt (0) != event.keyCode && (event.character).charCodeAt (0) < 0x20) character = String.fromCharCode ((character).charCodeAt (0) + 0x40);
return character;
}, $fz.isPrivate = true, $fz), "$wt.widgets.Event");
c$.toUpperCase = Clazz.defineMethod (c$, "toUpperCase", 
($fz = function (keyCode) {
if (keyCode > 0xFFFF) {
return keyCode;
}var character = String.fromCharCode (keyCode);
return Character.isLetter (character) ? Character.toUpperCase (character) : keyCode;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.makeConstructor (c$, 
function () {
});
c$.NATIVE_FORMATTER = c$.prototype.NATIVE_FORMATTER =  new org.eclipse.jface.bindings.keys.formatting.NativeKeyFormatter ();
});
