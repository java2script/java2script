Clazz.declarePackage ("java.awt.event");
Clazz.load (["java.awt.event.ComponentEvent"], "java.awt.event.FocusEvent", ["sun.awt.AppContext", "$.SunToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.temporary = false;
this.opposite = null;
Clazz.instantialize (this, arguments);
}, java.awt.event, "FocusEvent", java.awt.event.ComponentEvent);
Clazz.makeConstructor (c$, 
function (source, id, temporary, opposite) {
Clazz.superConstructor (this, java.awt.event.FocusEvent, [source, id]);
this.temporary = temporary;
this.opposite = opposite;
}, "java.awt.Component,~N,~B,java.awt.Component");
Clazz.makeConstructor (c$, 
function (source, id, temporary) {
this.construct (source, id, temporary, null);
}, "java.awt.Component,~N,~B");
Clazz.makeConstructor (c$, 
function (source, id) {
this.construct (source, id, false);
}, "java.awt.Component,~N");
Clazz.defineMethod (c$, "isTemporary", 
function () {
return this.temporary;
});
Clazz.defineMethod (c$, "getOppositeComponent", 
function () {
if (this.opposite == null) {
return null;
}return (sun.awt.SunToolkit.targetToAppContext (this.opposite) === sun.awt.AppContext.getAppContext ()) ? this.opposite : null;
});
Clazz.overrideMethod (c$, "paramString", 
function () {
var typeStr;
switch (this.id) {
case 1004:
typeStr = "FOCUS_GAINED";
break;
case 1005:
typeStr = "FOCUS_LOST";
break;
default:
typeStr = "unknown type";
}
return typeStr + (this.temporary ? ",temporary" : ",permanent") + ",opposite=" + this.getOppositeComponent ();
});
Clazz.defineStatics (c$,
"FOCUS_FIRST", 1004,
"FOCUS_LAST", 1005,
"FOCUS_GAINED", 1004,
"FOCUS_LOST", 1005);
});
