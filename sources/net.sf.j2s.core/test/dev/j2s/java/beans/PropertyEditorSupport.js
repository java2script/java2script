Clazz.declarePackage ("java.beans");
Clazz.load (["java.beans.PropertyEditor"], "java.beans.PropertyEditorSupport", ["java.lang.IllegalArgumentException", "$.NullPointerException", "java.util.Vector", "java.beans.PropertyChangeEvent"], function () {
c$ = Clazz.decorateAsClass (function () {
this.value = null;
this.source = null;
this.listeners = null;
Clazz.instantialize (this, arguments);
}, java.beans, "PropertyEditorSupport", null, java.beans.PropertyEditor);
Clazz.makeConstructor (c$, 
function () {
this.setSource (this);
});
Clazz.makeConstructor (c$, 
function (source) {
if (source == null) {
throw  new NullPointerException ();
}this.setSource (source);
}, "~O");
Clazz.defineMethod (c$, "getSource", 
function () {
return this.source;
});
Clazz.defineMethod (c$, "setSource", 
function (source) {
this.source = source;
}, "~O");
Clazz.overrideMethod (c$, "setValue", 
function (value) {
this.value = value;
this.firePropertyChange ();
}, "~O");
Clazz.overrideMethod (c$, "getValue", 
function () {
return this.value;
});
Clazz.overrideMethod (c$, "isPaintable", 
function () {
return false;
});
Clazz.overrideMethod (c$, "paintValue", 
function (gfx, box) {
}, "java.awt.Graphics,java.awt.Rectangle");
Clazz.overrideMethod (c$, "getJavaInitializationString", 
function () {
return "???";
});
Clazz.overrideMethod (c$, "getAsText", 
function () {
return (this.value != null) ? this.value.toString () : "null";
});
Clazz.overrideMethod (c$, "setAsText", 
function (text) {
if (Clazz.instanceOf (this.value, String)) {
this.setValue (text);
return;
}throw  new IllegalArgumentException (text);
}, "~S");
Clazz.overrideMethod (c$, "getTags", 
function () {
return null;
});
Clazz.overrideMethod (c$, "getCustomEditor", 
function () {
return null;
});
Clazz.overrideMethod (c$, "supportsCustomEditor", 
function () {
return false;
});
Clazz.overrideMethod (c$, "addPropertyChangeListener", 
function (listener) {
if (this.listeners == null) {
this.listeners =  new java.util.Vector ();
}this.listeners.addElement (listener);
}, "java.beans.PropertyChangeListener");
Clazz.overrideMethod (c$, "removePropertyChangeListener", 
function (listener) {
if (this.listeners == null) {
return;
}this.listeners.removeElement (listener);
}, "java.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "firePropertyChange", 
function () {
var targets;
{
if (this.listeners == null) {
return;
}targets = this.listeners.clone ();
}var evt =  new java.beans.PropertyChangeEvent (this.source, null, null, null);
for (var i = 0; i < targets.size (); i++) {
var target = targets.elementAt (i);
target.propertyChange (evt);
}
});
});
