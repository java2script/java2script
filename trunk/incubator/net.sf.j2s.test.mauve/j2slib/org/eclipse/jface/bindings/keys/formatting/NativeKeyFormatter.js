Clazz.declarePackage ("org.eclipse.jface.bindings.keys.formatting");
Clazz.load (["org.eclipse.jface.bindings.keys.formatting.AbstractKeyFormatter", "java.util.HashMap"], "org.eclipse.jface.bindings.keys.formatting.NativeKeyFormatter", ["java.util.ResourceBundle", "org.eclipse.jface.bindings.keys.KeyLookupFactory", "org.eclipse.jface.util.Util", "$wt.SWT"], function () {
c$ = Clazz.declareType (org.eclipse.jface.bindings.keys.formatting, "NativeKeyFormatter", org.eclipse.jface.bindings.keys.formatting.AbstractKeyFormatter);
Clazz.defineMethod (c$, "format", 
function (key) {
var lookup = org.eclipse.jface.bindings.keys.KeyLookupFactory.getDefault ();
var name = lookup.formalNameLookup (key);
if ("carbon".equals ($WT.getPlatform ())) {
var formattedName = org.eclipse.jface.bindings.keys.formatting.NativeKeyFormatter.CARBON_KEY_LOOK_UP.get (name);
if (formattedName != null) {
return formattedName;
}}return Clazz.superCall (this, org.eclipse.jface.bindings.keys.formatting.NativeKeyFormatter, "format", [key]);
}, "~N");
Clazz.overrideMethod (c$, "getKeyDelimiter", 
function () {
if ("carbon".equals ($WT.getPlatform ())) {
return org.eclipse.jface.util.Util.translateString (org.eclipse.jface.bindings.keys.formatting.NativeKeyFormatter.$RESOURCE_BUNDLE, "CARBON_KEY_DELIMITER", "");
}return org.eclipse.jface.util.Util.translateString (org.eclipse.jface.bindings.keys.formatting.NativeKeyFormatter.$RESOURCE_BUNDLE, "KEY_DELIMITER", "+");
});
Clazz.overrideMethod (c$, "getKeyStrokeDelimiter", 
function () {
if ("win32".equals ($WT.getPlatform ())) {
return org.eclipse.jface.util.Util.translateString (org.eclipse.jface.bindings.keys.formatting.NativeKeyFormatter.$RESOURCE_BUNDLE, "WIN32_KEY_STROKE_DELIMITER", " ");
}return org.eclipse.jface.util.Util.translateString (org.eclipse.jface.bindings.keys.formatting.NativeKeyFormatter.$RESOURCE_BUNDLE, "KEY_STROKE_DELIMITER", " ");
});
Clazz.overrideMethod (c$, "sortModifierKeys", 
function (modifierKeys) {
var lookup = org.eclipse.jface.bindings.keys.KeyLookupFactory.getDefault ();
var platform = $WT.getPlatform ();
var sortedKeys =  Clazz.newArray (4, 0);
var index = 0;
if ("win32".equals (platform)) {
if ((modifierKeys & lookup.getCtrl ()) != 0) {
sortedKeys[index++] = lookup.getCtrl ();
}if ((modifierKeys & lookup.getAlt ()) != 0) {
sortedKeys[index++] = lookup.getAlt ();
}if ((modifierKeys & lookup.getShift ()) != 0) {
sortedKeys[index++] = lookup.getShift ();
}} else if ("gtk".equals (platform) || "motif".equals (platform)) {
if ((modifierKeys & lookup.getShift ()) != 0) {
sortedKeys[index++] = lookup.getShift ();
}if ((modifierKeys & lookup.getCtrl ()) != 0) {
sortedKeys[index++] = lookup.getCtrl ();
}if ((modifierKeys & lookup.getAlt ()) != 0) {
sortedKeys[index++] = lookup.getAlt ();
}} else if ("carbon".equals (platform)) {
if ((modifierKeys & lookup.getShift ()) != 0) {
sortedKeys[index++] = lookup.getShift ();
}if ((modifierKeys & lookup.getCtrl ()) != 0) {
sortedKeys[index++] = lookup.getCtrl ();
}if ((modifierKeys & lookup.getAlt ()) != 0) {
sortedKeys[index++] = lookup.getAlt ();
}if ((modifierKeys & lookup.getCommand ()) != 0) {
sortedKeys[index++] = lookup.getCommand ();
}}return sortedKeys;
}, "~N");
Clazz.defineStatics (c$,
"CARBON_KEY_DELIMITER_KEY", "CARBON_KEY_DELIMITER");
c$.CARBON_KEY_LOOK_UP = c$.prototype.CARBON_KEY_LOOK_UP =  new java.util.HashMap ();
Clazz.defineStatics (c$,
"$RESOURCE_BUNDLE", null,
"WIN32_KEY_STROKE_DELIMITER_KEY", "WIN32_KEY_STROKE_DELIMITER");
{
($t$ = org.eclipse.jface.bindings.keys.formatting.NativeKeyFormatter.$RESOURCE_BUNDLE = java.util.ResourceBundle.getBundle (org.eclipse.jface.bindings.keys.formatting.NativeKeyFormatter.getName ()), org.eclipse.jface.bindings.keys.formatting.NativeKeyFormatter.prototype.$RESOURCE_BUNDLE = org.eclipse.jface.bindings.keys.formatting.NativeKeyFormatter.$RESOURCE_BUNDLE, $t$);
var carbonBackspace = "\u232B";
org.eclipse.jface.bindings.keys.formatting.NativeKeyFormatter.CARBON_KEY_LOOK_UP.put ("BS", "\u232b");
org.eclipse.jface.bindings.keys.formatting.NativeKeyFormatter.CARBON_KEY_LOOK_UP.put ("BACKSPACE", "\u232b");
org.eclipse.jface.bindings.keys.formatting.NativeKeyFormatter.CARBON_KEY_LOOK_UP.put ("CR", "\u21A9");
var carbonDelete = "\u2326";
org.eclipse.jface.bindings.keys.formatting.NativeKeyFormatter.CARBON_KEY_LOOK_UP.put ("DEL", "\u2326");
org.eclipse.jface.bindings.keys.formatting.NativeKeyFormatter.CARBON_KEY_LOOK_UP.put ("DELETE", "\u2326");
org.eclipse.jface.bindings.keys.formatting.NativeKeyFormatter.CARBON_KEY_LOOK_UP.put ("SPACE", "\u2423");
org.eclipse.jface.bindings.keys.formatting.NativeKeyFormatter.CARBON_KEY_LOOK_UP.put ("ALT", "\u2325");
org.eclipse.jface.bindings.keys.formatting.NativeKeyFormatter.CARBON_KEY_LOOK_UP.put ("COMMAND", "\u2318");
org.eclipse.jface.bindings.keys.formatting.NativeKeyFormatter.CARBON_KEY_LOOK_UP.put ("CTRL", "\u2303");
org.eclipse.jface.bindings.keys.formatting.NativeKeyFormatter.CARBON_KEY_LOOK_UP.put ("SHIFT", "\u21E7");
org.eclipse.jface.bindings.keys.formatting.NativeKeyFormatter.CARBON_KEY_LOOK_UP.put ("ARROW_DOWN", "\u2193");
org.eclipse.jface.bindings.keys.formatting.NativeKeyFormatter.CARBON_KEY_LOOK_UP.put ("ARROW_LEFT", "\u2190");
org.eclipse.jface.bindings.keys.formatting.NativeKeyFormatter.CARBON_KEY_LOOK_UP.put ("ARROW_RIGHT", "\u2192");
org.eclipse.jface.bindings.keys.formatting.NativeKeyFormatter.CARBON_KEY_LOOK_UP.put ("ARROW_UP", "\u2191");
org.eclipse.jface.bindings.keys.formatting.NativeKeyFormatter.CARBON_KEY_LOOK_UP.put ("END", "\u2198");
org.eclipse.jface.bindings.keys.formatting.NativeKeyFormatter.CARBON_KEY_LOOK_UP.put ("NUMPAD_ENTER", "\u2324");
org.eclipse.jface.bindings.keys.formatting.NativeKeyFormatter.CARBON_KEY_LOOK_UP.put ("HOME", "\u2196");
org.eclipse.jface.bindings.keys.formatting.NativeKeyFormatter.CARBON_KEY_LOOK_UP.put ("PAGE_DOWN", "\u21DF");
org.eclipse.jface.bindings.keys.formatting.NativeKeyFormatter.CARBON_KEY_LOOK_UP.put ("PAGE_UP", "\u21DE");
}});
