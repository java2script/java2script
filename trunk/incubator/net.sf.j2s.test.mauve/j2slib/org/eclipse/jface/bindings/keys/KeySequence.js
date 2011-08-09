Clazz.declarePackage ("org.eclipse.jface.bindings.keys");
Clazz.load (["org.eclipse.jface.bindings.TriggerSequence"], "org.eclipse.jface.bindings.keys.KeySequence", ["java.lang.IllegalArgumentException", "$.NullPointerException", "java.util.ArrayList", "$.StringTokenizer", "org.eclipse.jface.bindings.keys.KeyStroke", "$.ParseException", "org.eclipse.jface.bindings.keys.formatting.KeyFormatterFactory", "org.eclipse.jface.util.Util"], function () {
c$ = Clazz.declareType (org.eclipse.jface.bindings.keys, "KeySequence", org.eclipse.jface.bindings.TriggerSequence, Comparable);
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function () {
return org.eclipse.jface.bindings.keys.KeySequence.EMPTY_KEY_SEQUENCE;
});
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function (keySequence, keyStroke) {
if (keySequence == null || keyStroke == null) throw  new NullPointerException ();
var oldKeyStrokes = keySequence.getKeyStrokes ();
var oldKeyStrokeLength = oldKeyStrokes.length;
var newKeyStrokes =  new Array (oldKeyStrokeLength + 1);
System.arraycopy (oldKeyStrokes, 0, newKeyStrokes, 0, oldKeyStrokeLength);
newKeyStrokes[oldKeyStrokeLength] = keyStroke;
return  new org.eclipse.jface.bindings.keys.KeySequence (newKeyStrokes);
}, "org.eclipse.jface.bindings.keys.KeySequence,org.eclipse.jface.bindings.keys.KeyStroke");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function (keyStroke) {
return  new org.eclipse.jface.bindings.keys.KeySequence ([keyStroke]);
}, "org.eclipse.jface.bindings.keys.KeyStroke");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function (keyStrokes) {
return  new org.eclipse.jface.bindings.keys.KeySequence (keyStrokes);
}, "~A");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function (keyStrokes) {
return  new org.eclipse.jface.bindings.keys.KeySequence (keyStrokes.toArray ( new Array (keyStrokes.size ())));
}, "java.util.List");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function (string) {
if (string == null) throw  new NullPointerException ();
var keyStrokes =  new java.util.ArrayList ();
var stringTokenizer =  new java.util.StringTokenizer (string, " \u0008\r\u001b\f\n\u0000\t\u000b");
while (stringTokenizer.hasMoreTokens ()) keyStrokes.add (org.eclipse.jface.bindings.keys.KeyStroke.getInstance (stringTokenizer.nextToken ()));

try {
return  new org.eclipse.jface.bindings.keys.KeySequence (keyStrokes.toArray ( new Array (keyStrokes.size ())));
} catch (t) {
if (Clazz.instanceOf (t, Throwable)) {
throw  new org.eclipse.jface.bindings.keys.ParseException ("Could not construct key sequence with these key strokes: " + keyStrokes);
} else {
throw t;
}
}
}, "~S");
Clazz.makeConstructor (c$, 
function (keyStrokes) {
Clazz.superConstructor (this, org.eclipse.jface.bindings.keys.KeySequence, [keyStrokes]);
for (var i = 0; i < this.triggers.length - 1; i++) {
var keyStroke = this.triggers[i];
if (!keyStroke.isComplete ()) throw  new IllegalArgumentException ();
}
}, "~A");
Clazz.overrideMethod (c$, "compareTo", 
function (object) {
var castedObject = object;
return org.eclipse.jface.util.Util.compare (this.triggers, castedObject.triggers);
}, "~O");
Clazz.overrideMethod (c$, "format", 
function () {
return org.eclipse.jface.bindings.keys.formatting.KeyFormatterFactory.getDefault ().format (this);
});
Clazz.defineMethod (c$, "getKeyStrokes", 
function () {
var triggerLength = this.triggers.length;
var keyStrokes =  new Array (triggerLength);
System.arraycopy (this.triggers, 0, keyStrokes, 0, triggerLength);
return keyStrokes;
});
Clazz.overrideMethod (c$, "getPrefixes", 
function () {
var numberOfPrefixes = this.triggers.length;
var prefixes =  new Array (numberOfPrefixes);
prefixes[0] = org.eclipse.jface.bindings.keys.KeySequence.getInstance ();
for (var i = 0; i < numberOfPrefixes - 1; i++) {
var prefixKeyStrokes =  new Array (i + 1);
System.arraycopy (this.triggers, 0, prefixKeyStrokes, 0, i + 1);
prefixes[i + 1] = org.eclipse.jface.bindings.keys.KeySequence.getInstance (prefixKeyStrokes);
}
return prefixes;
});
Clazz.defineMethod (c$, "isComplete", 
function () {
var triggersLength = this.triggers.length;
for (var i = 0; i < triggersLength; i++) {
if (!(this.triggers[i]).isComplete ()) {
return false;
}}
return true;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return org.eclipse.jface.bindings.keys.formatting.KeyFormatterFactory.getFormalKeyFormatter ().format (this);
});
c$.EMPTY_KEY_SEQUENCE = c$.prototype.EMPTY_KEY_SEQUENCE =  new org.eclipse.jface.bindings.keys.KeySequence ( new Array (0));
Clazz.defineStatics (c$,
"KEY_STROKE_DELIMITER", "\u0020");
c$.KEY_STROKE_DELIMITERS = c$.prototype.KEY_STROKE_DELIMITERS = " \u0008\r\u001b\f\n\u0000\t\u000b";
});
