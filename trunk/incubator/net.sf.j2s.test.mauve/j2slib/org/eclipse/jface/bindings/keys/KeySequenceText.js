Clazz.declarePackage ("org.eclipse.jface.bindings.keys");
Clazz.load (["$wt.events.FocusListener", "$.ModifyListener", "$wt.widgets.Listener", "org.eclipse.jface.bindings.keys.KeySequence"], "org.eclipse.jface.bindings.keys.KeySequenceText", ["java.lang.IllegalArgumentException", "java.util.ArrayList", "$.Collections", "$.TreeSet", "org.eclipse.jface.bindings.keys.KeyStroke", "$.SWTKeySupport", "$wt.SWT", "$wt.events.DisposeListener", "$wt.graphics.Font", "$wt.widgets.Display", "$.Event"], function () {
c$ = Clazz.decorateAsClass (function () {
if (!Clazz.isClassDefined ("org.eclipse.jface.bindings.keys.KeySequenceText.KeyTrapListener")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.insertionIndex = -1;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.bindings.keys.KeySequenceText, "KeyTrapListener", null, $wt.widgets.Listener);
Clazz.defineMethod (c$, "clearInsertionIndex", 
function () {
this.insertionIndex = -1;
});
Clazz.defineMethod (c$, "deleteKeyStroke", 
($fz = function (a) {
this.clearInsertionIndex ();
if (this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].hasSelection ()) {
var b =  new Array (1);
this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].deleteSelection (a, false, b);
return b[0];
}if (a.length > 0) {
var b = a.length - 1;
var c =  new Array (b);
System.arraycopy (a, 0, c, 0, b);
return c;
}return a;
}, $fz.isPrivate = true, $fz), "~A");
Clazz.overrideMethod (c$, "handleEvent", 
function (a) {
var b = this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].getKeySequence ().getKeyStrokes ();
if (a.type == 1) {
b = this.handleKeyDown (a, b);
} else if (a.type == 2) {
b = this.handleKeyUp (a, b);
}this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].setKeySequence (org.eclipse.jface.bindings.keys.KeySequence.getInstance (b));
a.doit = false;
}, "$wt.widgets.Event");
Clazz.defineMethod (c$, "handleKeyDown", 
($fz = function (a, b) {
if (((a.character).charCodeAt (0) == ('\u0008').charCodeAt (0)) && (a.stateMask == 0)) {
return this.deleteKeyStroke (b);
}return this.insertKeyStroke (a, b);
}, $fz.isPrivate = true, $fz), "$wt.widgets.Event,~A");
Clazz.defineMethod (c$, "handleKeyUp", 
($fz = function (a, b) {
if (this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].hasIncompleteStroke ()) {
var c =  new $wt.widgets.Event ();
if ((a.keyCode & $WT.MODIFIER_MASK) != 0) {
c.stateMask = a.stateMask - a.keyCode;
} else {
c.stateMask = a.stateMask;
}var d = org.eclipse.jface.bindings.keys.SWTKeySupport.convertEventToUnmodifiedAccelerator (c);
var e = org.eclipse.jface.bindings.keys.SWTKeySupport.convertAcceleratorToKeyStroke (d);
var f = b.length;
var g;
if ((f > 0) && (e.getModifierKeys () != 0)) {
g =  new Array (f);
System.arraycopy (b, 0, g, 0, f - 1);
g[f - 1] = e;
} else if (f > 0) {
g =  new Array (f - 1);
System.arraycopy (b, 0, g, 0, f - 1);
} else if (e.getModifierKeys () != 0) {
g =  new Array (f + 1);
System.arraycopy (b, 0, g, 0, f);
g[f] = e;
} else {
g = b;
}return g;
}return b;
}, $fz.isPrivate = true, $fz), "$wt.widgets.Event,~A");
Clazz.defineMethod (c$, "insertKeyStroke", 
($fz = function (a, b) {
var c = org.eclipse.jface.bindings.keys.SWTKeySupport.convertEventToUnmodifiedAccelerator (a);
var d = org.eclipse.jface.bindings.keys.SWTKeySupport.convertAcceleratorToKeyStroke (c);
if ((16777299 == d.getNaturalKey ()) || (16777298 == d.getNaturalKey ()) || (16777300 == d.getNaturalKey ())) {
return b;
}if (this.insertionIndex != -1) {
if (d.isComplete ()) {
b = this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].insertStrokeAt (b, d, this.insertionIndex);
this.clearInsertionIndex ();
}} else if (this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].hasSelection ()) {
var e =  new Array (1);
this.insertionIndex = this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].deleteSelection (b, d.isComplete (), e);
b = e[0];
if ((d.isComplete ()) || (this.insertionIndex >= b.length)) {
b = this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].insertStrokeAt (b, d, this.insertionIndex);
this.clearInsertionIndex ();
}} else {
if ((this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].hasIncompleteStroke ()) && (b.length > 0)) {
var e =  new Array (b.length - 1);
System.arraycopy (b, 0, e, 0, b.length - 1);
b = e;
}if ((b.length == 0) || (this.insertionIndex >= b.length) || (this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].isCursorInLastPosition ())) {
b = this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].insertStrokeAt (b, d, b.length);
this.clearInsertionIndex ();
} else {
var e =  new Array (1);
this.insertionIndex = this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].deleteSelection (b, d.isComplete (), e);
b = e[0];
if (d.isComplete ()) {
b = this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].insertStrokeAt (b, d, this.insertionIndex);
this.clearInsertionIndex ();
}}}return b;
}, $fz.isPrivate = true, $fz), "$wt.widgets.Event,~A");
c$ = Clazz.p0p ();
}
if (!Clazz.isClassDefined ("org.eclipse.jface.bindings.keys.KeySequenceText.TraversalFilter")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.bindings.keys.KeySequenceText, "TraversalFilter", null, $wt.widgets.Listener);
Clazz.overrideMethod (c$, "handleEvent", 
function (a) {
switch (a.detail) {
case 2:
case 128:
case 0:
case 512:
case 256:
case 4:
a.type = 0;
a.doit = false;
break;
case 16:
case 8:
if ((a.stateMask & ($WT.MODIFIER_MASK ^ 131072)) != 0) {
a.type = 0;
a.doit = false;
break;
}case 64:
case 32:
default:
if (this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].hasIncompleteStroke ()) {
var b = this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].getKeySequence ().getKeyStrokes ();
var c = b.length - 1;
if (c >= 1) {
var d =  new Array (c);
System.arraycopy (b, 0, d, 0, c);
this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].setKeySequence (org.eclipse.jface.bindings.keys.KeySequence.getInstance (d));
} else {
this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].setKeySequence (org.eclipse.jface.bindings.keys.KeySequence.getInstance ());
}}}
}, "$wt.widgets.Event");
c$ = Clazz.p0p ();
}
if (!Clazz.isClassDefined ("org.eclipse.jface.bindings.keys.KeySequenceText.TraversalFilterManager")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.filter = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.bindings.keys.KeySequenceText, "TraversalFilterManager", null, $wt.events.FocusListener);
Clazz.prepareFields (c$, function () {
this.filter = Clazz.innerTypeInstance (org.eclipse.jface.bindings.keys.KeySequenceText.TraversalFilter, this, null);
});
Clazz.overrideMethod (c$, "focusGained", 
function (a) {
$wt.widgets.Display.getCurrent ().addFilter (31, this.filter);
}, "$wt.events.FocusEvent");
Clazz.overrideMethod (c$, "focusLost", 
function (a) {
$wt.widgets.Display.getCurrent ().removeFilter (31, this.filter);
}, "$wt.events.FocusEvent");
c$ = Clazz.p0p ();
}
if (!Clazz.isClassDefined ("org.eclipse.jface.bindings.keys.KeySequenceText.UpdateSequenceListener")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.bindings.keys.KeySequenceText, "UpdateSequenceListener", null, $wt.events.ModifyListener);
Clazz.overrideMethod (c$, "modifyText", 
function (a) {
try {
var b = this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].getKeySequence ();
var c = this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].getText ();
var d = org.eclipse.jface.bindings.keys.KeySequence.getInstance (c);
if (!b.equals (d)) {
this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].setKeySequence (d);
}} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.jface.bindings.keys.ParseException)) {
this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].setKeySequence (this.b$["org.eclipse.jface.bindings.keys.KeySequenceText"].getKeySequence ());
} else {
throw e;
}
}
}, "$wt.events.ModifyEvent");
c$ = Clazz.p0p ();
}
this.keyFilter = null;
this.keySequence = null;
this.maxStrokes = -1;
this.text = null;
this.updateSequenceListener = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.bindings.keys, "KeySequenceText");
Clazz.prepareFields (c$, function () {
this.keyFilter = Clazz.innerTypeInstance (org.eclipse.jface.bindings.keys.KeySequenceText.KeyTrapListener, this, null);
this.keySequence = org.eclipse.jface.bindings.keys.KeySequence.getInstance ();
this.updateSequenceListener = Clazz.innerTypeInstance (org.eclipse.jface.bindings.keys.KeySequenceText.UpdateSequenceListener, this, null);
});
Clazz.makeConstructor (c$, 
function (wrappedText) {
this.text = wrappedText;
if ("carbon".equals ($WT.getPlatform ())) {
var font =  new $wt.graphics.Font (this.text.getDisplay (), "Lucida Grande", 13, 0);
this.text.setFont (font);
this.text.addDisposeListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.bindings.keys.KeySequenceText$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.bindings.keys, "KeySequenceText$1", null, $wt.events.DisposeListener);
Clazz.overrideMethod (c$, "widgetDisposed", 
function (e) {
this.f$.font.dispose ();
}, "$wt.events.DisposeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.bindings.keys.KeySequenceText$1, i$, v$);
}) (this, Clazz.cloneFinals ("font", font)));
}this.text.addListener (2, this.keyFilter);
this.text.addListener (1, this.keyFilter);
this.text.addFocusListener (Clazz.innerTypeInstance (org.eclipse.jface.bindings.keys.KeySequenceText.TraversalFilterManager, this, null));
this.text.addModifyListener (this.updateSequenceListener);
}, "$wt.widgets.Text");
Clazz.defineMethod (c$, "clear", 
function () {
this.keySequence = org.eclipse.jface.bindings.keys.KeySequence.getInstance ();
this.text.setText ("");
});
Clazz.defineMethod (c$, "deleteSelection", 
($fz = function (keyStrokes, allowIncomplete, deletedKeyStrokes) {
var selection = this.text.getSelection ();
var start = selection.x;
var end = selection.y;
var string =  String.instantialize ();
var currentStrokes =  new java.util.ArrayList ();
var startTextIndex = 0;
var keyStrokesLength = keyStrokes.length;
var i;
for (i = 0; (i < keyStrokesLength) && (string.length < start); i++) {
startTextIndex = string.length;
currentStrokes.add (keyStrokes[i]);
string = org.eclipse.jface.bindings.keys.KeySequence.getInstance (currentStrokes).format ();
}
var startStrokeIndex;
if (string.length == start) {
startStrokeIndex = currentStrokes.size ();
} else {
startStrokeIndex = currentStrokes.size () - 1;
}var endStrokeIndex;
if (start == end) {
return startStrokeIndex;
}for (; (i < keyStrokesLength) && (string.length < end); i++) {
currentStrokes.add (keyStrokes[i]);
string = org.eclipse.jface.bindings.keys.KeySequence.getInstance (currentStrokes).format ();
}
endStrokeIndex = currentStrokes.size () - 1;
if (endStrokeIndex < 0) {
endStrokeIndex = 0;
}var newLength = endStrokeIndex - startStrokeIndex + 1;
deletedKeyStrokes[0] =  new Array (newLength);
var startStroke = keyStrokes[startStrokeIndex];
System.arraycopy (keyStrokes, 0, keyStrokes, 0, newLength);
if (allowIncomplete) {
var modifierKeys = startStroke.getModifierKeys ();
var incompleteStroke = org.eclipse.jface.bindings.keys.KeyStroke.getInstance (modifierKeys, 0);
var incompleteStrokeLength = incompleteStroke.format ().length;
if ((startTextIndex + incompleteStrokeLength) <= start) {
var added =  new Array (newLength + 1);
System.arraycopy (deletedKeyStrokes[0], 0, added, 0, startStrokeIndex);
added[startStrokeIndex] = incompleteStroke;
System.arraycopy (deletedKeyStrokes[0], startStrokeIndex, added, startStrokeIndex + 1, newLength);
deletedKeyStrokes[0] = added;
}}return startStrokeIndex;
}, $fz.isPrivate = true, $fz), "~A,~B,~A");
Clazz.defineMethod (c$, "getKeySequence", 
function () {
return this.keySequence;
});
Clazz.defineMethod (c$, "getText", 
($fz = function () {
return this.text.getText ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "hasIncompleteStroke", 
($fz = function () {
return !this.keySequence.isComplete ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "hasSelection", 
($fz = function () {
return (this.text.getSelectionCount () > 0);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "insert", 
function (stroke) {
if (!stroke.isComplete ()) {
return ;
}var keySequence = this.getKeySequence ();
var oldKeyStrokes = keySequence.getKeyStrokes ();
var newKeyStrokes;
if ((this.hasIncompleteStroke ()) && (!keySequence.isEmpty ())) {
var newKeyStrokesLength = oldKeyStrokes.length - 1;
newKeyStrokes =  new Array (newKeyStrokesLength);
System.arraycopy (oldKeyStrokes, 0, newKeyStrokes, 0, newKeyStrokesLength);
} else {
newKeyStrokes = oldKeyStrokes;
}var deletedKeyStrokes =  new Array (1);
var index = this.deleteSelection (newKeyStrokes, false, deletedKeyStrokes);
if (index == -1) {
index = 0;
}var strokes = (deletedKeyStrokes[0] == null) ?  new Array (0) : deletedKeyStrokes[0];
var keyStrokes = this.insertStrokeAt (strokes, stroke, index);
this.keyFilter.clearInsertionIndex ();
this.setKeySequence (org.eclipse.jface.bindings.keys.KeySequence.getInstance (keyStrokes));
}, "org.eclipse.jface.bindings.keys.KeyStroke");
Clazz.defineMethod (c$, "insertStrokeAt", 
($fz = function (keyStrokes, stroke, index) {
var keyStrokesLength = keyStrokes.length;
var currentStroke = (index >= keyStrokesLength) ? null : keyStrokes[index];
if ((currentStroke != null) && (!currentStroke.isComplete ())) {
var modifierKeys = currentStroke.getModifierKeys ();
var naturalKey = stroke.getNaturalKey ();
modifierKeys |= stroke.getModifierKeys ();
keyStrokes[index] = org.eclipse.jface.bindings.keys.KeyStroke.getInstance (modifierKeys, naturalKey);
return keyStrokes;
}var newKeyStrokes =  new Array (keyStrokesLength + 1);
System.arraycopy (keyStrokes, 0, newKeyStrokes, 0, index);
newKeyStrokes[index] = stroke;
if (index < keyStrokesLength) {
System.arraycopy (keyStrokes, index, newKeyStrokes, index + 1, keyStrokesLength);
}return newKeyStrokes;
}, $fz.isPrivate = true, $fz), "~A,org.eclipse.jface.bindings.keys.KeyStroke,~N");
Clazz.defineMethod (c$, "isCursorInLastPosition", 
($fz = function () {
return (this.text.getSelection ().y >= this.getText ().length);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setKeySequence", 
function (newKeySequence) {
this.keySequence = newKeySequence;
if (this.maxStrokes != -1) {
var oldKeyStrokes = this.keySequence.getKeyStrokes ();
if (this.maxStrokes < oldKeyStrokes.length) {
var newKeyStrokes =  new Array (this.maxStrokes);
System.arraycopy (oldKeyStrokes, 0, newKeyStrokes, 0, this.maxStrokes);
this.keySequence = org.eclipse.jface.bindings.keys.KeySequence.getInstance (newKeyStrokes);
}}var currentString = this.getText ();
var newString = this.keySequence.format ();
if (!currentString.equals (newString)) {
this.text.removeModifyListener (this.updateSequenceListener);
this.text.setText (this.keySequence.format ());
this.text.addModifyListener (this.updateSequenceListener);
this.text.setSelection (this.getText ().length);
}}, "org.eclipse.jface.bindings.keys.KeySequence");
Clazz.defineMethod (c$, "getKeyStrokeLimit", 
function () {
return this.maxStrokes;
});
Clazz.defineMethod (c$, "setKeyStrokeLimit", 
function (keyStrokeLimit) {
if (keyStrokeLimit > 0 || keyStrokeLimit == -1) this.maxStrokes = keyStrokeLimit;
 else throw  new IllegalArgumentException ();
this.setKeySequence (this.getKeySequence ());
}, "~N");
{
var trappedKeys =  new java.util.TreeSet ();
trappedKeys.add (org.eclipse.jface.bindings.keys.SWTKeySupport.convertAcceleratorToKeyStroke ('\u0009'.charCodeAt (0)));
trappedKeys.add (org.eclipse.jface.bindings.keys.SWTKeySupport.convertAcceleratorToKeyStroke (131081));
trappedKeys.add (org.eclipse.jface.bindings.keys.SWTKeySupport.convertAcceleratorToKeyStroke ('\u0008'.charCodeAt (0)));
var trappedKeyList =  new java.util.ArrayList (trappedKeys);
($t$ = org.eclipse.jface.bindings.keys.KeySequenceText.TRAPPED_KEYS = java.util.Collections.unmodifiableList (trappedKeyList), org.eclipse.jface.bindings.keys.KeySequenceText.prototype.TRAPPED_KEYS = org.eclipse.jface.bindings.keys.KeySequenceText.TRAPPED_KEYS, $t$);
}Clazz.defineStatics (c$,
"EMPTY_STRING", "",
"INFINITE", -1,
"TRAPPED_KEYS", null);
});
