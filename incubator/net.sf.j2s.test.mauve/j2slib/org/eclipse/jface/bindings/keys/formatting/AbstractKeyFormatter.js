Clazz.declarePackage ("org.eclipse.jface.bindings.keys.formatting");
Clazz.load (["org.eclipse.jface.bindings.keys.formatting.IKeyFormatter", "java.util.ResourceBundle"], "org.eclipse.jface.bindings.keys.formatting.AbstractKeyFormatter", ["java.lang.StringBuffer", "org.eclipse.jface.bindings.keys.KeyLookupFactory", "org.eclipse.jface.util.Util"], function () {
c$ = Clazz.declareType (org.eclipse.jface.bindings.keys.formatting, "AbstractKeyFormatter", null, org.eclipse.jface.bindings.keys.formatting.IKeyFormatter);
Clazz.defineMethod (c$, "format", 
function (key) {
var lookup = org.eclipse.jface.bindings.keys.KeyLookupFactory.getDefault ();
var name = lookup.formalNameLookup (key);
if (name.length == 1) {
return name;
}return org.eclipse.jface.util.Util.translateString (org.eclipse.jface.bindings.keys.formatting.AbstractKeyFormatter.RESOURCE_BUNDLE, name, name);
}, "~N");
Clazz.defineMethod (c$, "format", 
function (keySequence) {
var stringBuffer =  new StringBuffer ();
var keyStrokes = keySequence.getKeyStrokes ();
var keyStrokesLength = keyStrokes.length;
for (var i = 0; i < keyStrokesLength; i++) {
stringBuffer.append (this.format (keyStrokes[i]));
if (i + 1 < keyStrokesLength) {
stringBuffer.append (this.getKeyStrokeDelimiter ());
}}
return stringBuffer.toString ();
}, "org.eclipse.jface.bindings.keys.KeySequence");
Clazz.defineMethod (c$, "format", 
function (keyStroke) {
var keyDelimiter = this.getKeyDelimiter ();
var modifierKeys = keyStroke.getModifierKeys ();
var sortedModifierKeys = this.sortModifierKeys (modifierKeys);
var stringBuffer =  new StringBuffer ();
if (sortedModifierKeys != null) {
for (var i = 0; i < sortedModifierKeys.length; i++) {
var modifierKey = sortedModifierKeys[i];
if (modifierKey != 0) {
stringBuffer.append (this.format (modifierKey));
stringBuffer.append (keyDelimiter);
}}
}var naturalKey = keyStroke.getNaturalKey ();
if (naturalKey != 0) {
stringBuffer.append (this.format (naturalKey));
}return stringBuffer.toString ();
}, "org.eclipse.jface.bindings.keys.KeyStroke");
Clazz.defineStatics (c$,
"KEY_DELIMITER_KEY", "KEY_DELIMITER",
"KEY_STROKE_DELIMITER_KEY", "KEY_STROKE_DELIMITER",
"NO_MODIFIER_KEYS",  Clazz.newArray (0, 0));
c$.RESOURCE_BUNDLE = c$.prototype.RESOURCE_BUNDLE = java.util.ResourceBundle.getBundle (org.eclipse.jface.bindings.keys.formatting.AbstractKeyFormatter.getName ());
});
