Clazz.declarePackage ("org.eclipse.jface.bindings.keys");
Clazz.load (["org.eclipse.jface.bindings.Trigger"], "org.eclipse.jface.bindings.keys.KeyStroke", ["java.lang.NullPointerException", "java.util.StringTokenizer", "org.eclipse.jface.bindings.keys.KeyLookupFactory", "$.ParseException", "org.eclipse.jface.bindings.keys.formatting.KeyFormatterFactory", "org.eclipse.jface.util.Util"], function () {
c$ = Clazz.decorateAsClass (function () {
this.modifierKeys = 0;
this.naturalKey = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.bindings.keys, "KeyStroke", org.eclipse.jface.bindings.Trigger, Comparable);
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function (naturalKey) {
return  new org.eclipse.jface.bindings.keys.KeyStroke (0, naturalKey);
}, "~N");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function (modifierKeys, naturalKey) {
return  new org.eclipse.jface.bindings.keys.KeyStroke (modifierKeys, naturalKey);
}, "~N,~N");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function (string) {
if (string == null) {
throw  new NullPointerException ("Cannot parse a null string");
}var lookup = org.eclipse.jface.bindings.keys.KeyLookupFactory.getDefault ();
var modifierKeys = 0;
var naturalKey = 0;
var stringTokenizer =  new java.util.StringTokenizer (string, "+", true);
var i = 0;
while (stringTokenizer.hasMoreTokens ()) {
var token = stringTokenizer.nextToken ();
if (i % 2 == 0) {
if (stringTokenizer.hasMoreTokens ()) {
token = token.toUpperCase ();
var modifierKey = lookup.formalModifierLookup (token);
if (modifierKey == 0) {
throw  new org.eclipse.jface.bindings.keys.ParseException ("Cannot create key stroke with duplicate or non-existent modifier key: " + token);
}modifierKeys |= modifierKey;
} else if (token.length == 1) {
naturalKey = (token.charAt (0)).charCodeAt (0);
} else {
token = token.toUpperCase ();
naturalKey = lookup.formalKeyLookup (token);
}}i++;
}
try {
return  new org.eclipse.jface.bindings.keys.KeyStroke (modifierKeys, naturalKey);
} catch (t) {
if (Clazz.instanceOf (t, Throwable)) {
throw  new org.eclipse.jface.bindings.keys.ParseException ("Cannot create key stroke with " + modifierKeys + " and " + naturalKey);
} else {
throw t;
}
}
}, "~S");
Clazz.makeConstructor (c$, 
($fz = function (modifierKeys, naturalKey) {
Clazz.superConstructor (this, org.eclipse.jface.bindings.keys.KeyStroke, []);
this.modifierKeys = modifierKeys;
this.naturalKey = naturalKey;
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.overrideMethod (c$, "compareTo", 
function (object) {
var keyStroke = object;
var compareTo = org.eclipse.jface.util.Util.compare (this.modifierKeys, keyStroke.modifierKeys);
if (compareTo == 0) {
compareTo = org.eclipse.jface.util.Util.compare (this.naturalKey, keyStroke.naturalKey);
}return compareTo;
}, "~O");
Clazz.overrideMethod (c$, "equals", 
function (object) {
if (!(Clazz.instanceOf (object, org.eclipse.jface.bindings.keys.KeyStroke))) {
return false;
}var keyStroke = object;
if (this.modifierKeys != keyStroke.modifierKeys) {
return false;
}return (this.naturalKey == keyStroke.naturalKey);
}, "~O");
Clazz.defineMethod (c$, "format", 
function () {
return org.eclipse.jface.bindings.keys.formatting.KeyFormatterFactory.getDefault ().format (this);
});
Clazz.defineMethod (c$, "getModifierKeys", 
function () {
return this.modifierKeys;
});
Clazz.defineMethod (c$, "getNaturalKey", 
function () {
return this.naturalKey;
});
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.modifierKeys << 4 + this.naturalKey;
});
Clazz.defineMethod (c$, "isComplete", 
function () {
return (this.naturalKey != 0);
});
Clazz.overrideMethod (c$, "toString", 
function () {
return org.eclipse.jface.bindings.keys.formatting.KeyFormatterFactory.getFormalKeyFormatter ().format (this);
});
Clazz.defineStatics (c$,
"KEY_DELIMITER", "\u002B");
c$.KEY_DELIMITERS = c$.prototype.KEY_DELIMITERS = "+";
Clazz.defineStatics (c$,
"NO_KEY", 0);
});
