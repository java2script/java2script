Clazz.declarePackage ("org.eclipse.jface.bindings.keys.formatting");
Clazz.load (["org.eclipse.jface.bindings.keys.formatting.AbstractKeyFormatter"], "org.eclipse.jface.bindings.keys.formatting.FormalKeyFormatter", ["org.eclipse.jface.bindings.keys.KeyLookupFactory"], function () {
c$ = Clazz.declareType (org.eclipse.jface.bindings.keys.formatting, "FormalKeyFormatter", org.eclipse.jface.bindings.keys.formatting.AbstractKeyFormatter);
Clazz.defineMethod (c$, "format", 
function (key) {
var lookup = org.eclipse.jface.bindings.keys.KeyLookupFactory.getDefault ();
return lookup.formalNameLookup (key);
}, "~N");
Clazz.overrideMethod (c$, "getKeyDelimiter", 
function () {
return "+";
});
Clazz.overrideMethod (c$, "getKeyStrokeDelimiter", 
function () {
return " ";
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
});
