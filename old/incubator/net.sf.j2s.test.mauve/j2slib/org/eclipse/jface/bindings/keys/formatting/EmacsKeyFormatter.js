Clazz.declarePackage ("org.eclipse.jface.bindings.keys.formatting");
Clazz.load (["org.eclipse.jface.bindings.keys.formatting.AbstractKeyFormatter", "java.util.ResourceBundle"], "org.eclipse.jface.bindings.keys.formatting.EmacsKeyFormatter", ["org.eclipse.jface.bindings.keys.KeyLookupFactory", "org.eclipse.jface.util.Util"], function () {
c$ = Clazz.declareType (org.eclipse.jface.bindings.keys.formatting, "EmacsKeyFormatter", org.eclipse.jface.bindings.keys.formatting.AbstractKeyFormatter);
Clazz.defineMethod (c$, "format", 
function (key) {
var lookup = org.eclipse.jface.bindings.keys.KeyLookupFactory.getDefault ();
if (lookup.isModifierKey (key)) {
var formattedName = org.eclipse.jface.util.Util.translateString (org.eclipse.jface.bindings.keys.formatting.EmacsKeyFormatter.$RESOURCE_BUNDLE, lookup.formalNameLookup (key), null);
if (formattedName != null) {
return formattedName;
}}return Clazz.superCall (this, org.eclipse.jface.bindings.keys.formatting.EmacsKeyFormatter, "format", [key]).toLowerCase ();
}, "~N");
Clazz.overrideMethod (c$, "getKeyDelimiter", 
function () {
return org.eclipse.jface.util.Util.translateString (org.eclipse.jface.bindings.keys.formatting.EmacsKeyFormatter.$RESOURCE_BUNDLE, "KEY_DELIMITER", "+");
});
Clazz.overrideMethod (c$, "getKeyStrokeDelimiter", 
function () {
return org.eclipse.jface.util.Util.translateString (org.eclipse.jface.bindings.keys.formatting.EmacsKeyFormatter.$RESOURCE_BUNDLE, "KEY_STROKE_DELIMITER", " ");
});
Clazz.overrideMethod (c$, "sortModifierKeys", 
function (modifierKeys) {
var lookup = org.eclipse.jface.bindings.keys.KeyLookupFactory.getDefault ();
var sortedKeys =  Clazz.newArray (4, 0);
var index = 0;
if ((modifierKeys & lookup.getAlt ()) != 0) {
sortedKeys[index++] = lookup.getAlt ();
}if ((modifierKeys & lookup.getCommand ()) != 0) {
sortedKeys[index++] = lookup.getCommand ();
}if ((modifierKeys & lookup.getCtrl ()) != 0) {
sortedKeys[index++] = lookup.getCtrl ();
}if ((modifierKeys & lookup.getShift ()) != 0) {
sortedKeys[index++] = lookup.getShift ();
}return sortedKeys;
}, "~N");
c$.$RESOURCE_BUNDLE = c$.prototype.$RESOURCE_BUNDLE = java.util.ResourceBundle.getBundle (org.eclipse.jface.bindings.keys.formatting.EmacsKeyFormatter.getName ());
});
