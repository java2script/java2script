Clazz.declarePackage ("java.awt.event");
Clazz.load (["java.awt.event.ComponentEvent"], "java.awt.event.PaintEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.updateRect = null;
Clazz.instantialize (this, arguments);
}, java.awt.event, "PaintEvent", java.awt.event.ComponentEvent);
Clazz.makeConstructor (c$, 
function (source, id, updateRect) {
Clazz.superConstructor (this, java.awt.event.PaintEvent, [source, id]);
this.updateRect = updateRect;
}, "java.awt.Component,~N,java.awt.Rectangle");
Clazz.defineMethod (c$, "getUpdateRect", 
function () {
return this.updateRect;
});
Clazz.defineMethod (c$, "setUpdateRect", 
function (updateRect) {
this.updateRect = updateRect;
}, "java.awt.Rectangle");
Clazz.overrideMethod (c$, "paramString", 
function () {
var typeStr;
switch (this.id) {
case 800:
typeStr = "PAINT";
break;
case 801:
typeStr = "UPDATE";
break;
default:
typeStr = "unknown type";
}
return typeStr + ",updateRect=" + (this.updateRect != null ? this.updateRect.toString () : "null");
});
Clazz.defineStatics (c$,
"PAINT_FIRST", 800,
"PAINT_LAST", 801,
"PAINT", 800,
"UPDATE", 801);
});
