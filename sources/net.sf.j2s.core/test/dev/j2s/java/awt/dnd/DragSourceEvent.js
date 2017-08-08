Clazz.declarePackage ("java.awt.dnd");
Clazz.load (["java.util.EventObject"], "java.awt.dnd.DragSourceEvent", ["java.awt.Point"], function () {
c$ = Clazz.decorateAsClass (function () {
this.locationSpecified = false;
this.x = 0;
this.y = 0;
Clazz.instantialize (this, arguments);
}, java.awt.dnd, "DragSourceEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (dsc) {
Clazz.superConstructor (this, java.awt.dnd.DragSourceEvent, [dsc]);
this.locationSpecified = false;
this.x = 0;
this.y = 0;
}, "java.awt.dnd.DragSourceContext");
Clazz.makeConstructor (c$, 
function (dsc, x, y) {
Clazz.superConstructor (this, java.awt.dnd.DragSourceEvent, [dsc]);
this.locationSpecified = true;
this.x = x;
this.y = y;
}, "java.awt.dnd.DragSourceContext,~N,~N");
Clazz.defineMethod (c$, "getDragSourceContext", 
function () {
return this.getSource ();
});
Clazz.defineMethod (c$, "getLocation", 
function () {
if (this.locationSpecified) {
return  new java.awt.Point (this.x, this.y);
} else {
return null;
}});
Clazz.defineMethod (c$, "getX", 
function () {
return this.x;
});
Clazz.defineMethod (c$, "getY", 
function () {
return this.y;
});
});
