Clazz.declarePackage ("java.awt.event");
Clazz.load (["java.awt.event.ComponentEvent"], "java.awt.event.InputEvent", ["java.lang.StringBuilder", "java.awt.Toolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.when = 0;
this.modifiers = 0;
this.canAccessSystemClipboard = false;
Clazz.instantialize (this, arguments);
}, java.awt.event, "InputEvent", java.awt.event.ComponentEvent);
Clazz.makeConstructor (c$, 
function (source, id, when, modifiers) {
Clazz.superConstructor (this, java.awt.event.InputEvent, [source, id]);
this.when = when;
this.modifiers = modifiers;
this.canAccessSystemClipboard = false;
}, "java.awt.Component,~N,~N,~N");
Clazz.defineMethod (c$, "isShiftDown", 
function () {
return (this.modifiers & 1) != 0;
});
Clazz.defineMethod (c$, "isControlDown", 
function () {
return (this.modifiers & 2) != 0;
});
Clazz.defineMethod (c$, "isMetaDown", 
function () {
return (this.modifiers & 4) != 0;
});
Clazz.defineMethod (c$, "isAltDown", 
function () {
return (this.modifiers & 8) != 0;
});
Clazz.defineMethod (c$, "isAltGraphDown", 
function () {
return (this.modifiers & 32) != 0;
});
Clazz.defineMethod (c$, "getWhen", 
function () {
return this.when;
});
Clazz.defineMethod (c$, "getModifiers", 
function () {
return this.modifiers & (-16321);
});
Clazz.defineMethod (c$, "getModifiersEx", 
function () {
return this.modifiers & -64;
});
Clazz.overrideMethod (c$, "consume", 
function () {
{
if (this.bdata && this.bdata.jqevent) {
this.bdata.jqevent.stopPropagation();
this.bdata.jqevent.preventDefault();
}
}this.consumed = true;
});
Clazz.overrideMethod (c$, "isConsumed", 
function () {
return this.consumed;
});
c$.getModifiersExText = Clazz.defineMethod (c$, "getModifiersExText", 
function (modifiers) {
var buf =  new StringBuilder ();
if ((modifiers & 256) != 0) {
buf.append (java.awt.Toolkit.getProperty ("AWT.meta", "Meta"));
buf.append ("+");
}if ((modifiers & 128) != 0) {
buf.append (java.awt.Toolkit.getProperty ("AWT.control", "Ctrl"));
buf.append ("+");
}if ((modifiers & 512) != 0) {
buf.append (java.awt.Toolkit.getProperty ("AWT.alt", "Alt"));
buf.append ("+");
}if ((modifiers & 64) != 0) {
buf.append (java.awt.Toolkit.getProperty ("AWT.shift", "Shift"));
buf.append ("+");
}if ((modifiers & 8192) != 0) {
buf.append (java.awt.Toolkit.getProperty ("AWT.altGraph", "Alt Graph"));
buf.append ("+");
}if ((modifiers & 1024) != 0) {
buf.append (java.awt.Toolkit.getProperty ("AWT.button1", "Button1"));
buf.append ("+");
}if ((modifiers & 2048) != 0) {
buf.append (java.awt.Toolkit.getProperty ("AWT.button2", "Button2"));
buf.append ("+");
}if ((modifiers & 4096) != 0) {
buf.append (java.awt.Toolkit.getProperty ("AWT.button3", "Button3"));
buf.append ("+");
}if (buf.length () > 0) {
buf.setLength (buf.length () - 1);
}return buf.toString ();
}, "~N");
Clazz.defineStatics (c$,
"SHIFT_MASK", 1,
"CTRL_MASK", 2,
"META_MASK", 4,
"ALT_MASK", 8,
"ALT_GRAPH_MASK", 32,
"BUTTON1_MASK", 16,
"BUTTON2_MASK", 8,
"BUTTON3_MASK", 4,
"SHIFT_DOWN_MASK", 64,
"CTRL_DOWN_MASK", 128,
"META_DOWN_MASK", 256,
"ALT_DOWN_MASK", 512,
"BUTTON1_DOWN_MASK", 1024,
"BUTTON2_DOWN_MASK", 2048,
"BUTTON3_DOWN_MASK", 4096,
"ALT_GRAPH_DOWN_MASK", 8192,
"FIRST_HIGH_BIT", 16384,
"JDK_1_3_MODIFIERS", 63,
"HIGH_MODIFIERS", -16384);
});
