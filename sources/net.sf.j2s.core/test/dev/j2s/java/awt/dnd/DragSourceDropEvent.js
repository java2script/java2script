Clazz.declarePackage ("java.awt.dnd");
Clazz.load (["java.awt.dnd.DragSourceEvent"], "java.awt.dnd.DragSourceDropEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.dropSuccess = false;
this.dropAction = 0;
Clazz.instantialize (this, arguments);
}, java.awt.dnd, "DragSourceDropEvent", java.awt.dnd.DragSourceEvent);
Clazz.makeConstructor (c$, 
function (dsc, action, success) {
Clazz.superConstructor (this, java.awt.dnd.DragSourceDropEvent, [dsc]);
this.dropSuccess = success;
this.dropAction = action;
}, "java.awt.dnd.DragSourceContext,~N,~B");
Clazz.makeConstructor (c$, 
function (dsc, action, success, x, y) {
Clazz.superConstructor (this, java.awt.dnd.DragSourceDropEvent, [dsc, x, y]);
this.dropSuccess = success;
this.dropAction = action;
}, "java.awt.dnd.DragSourceContext,~N,~B,~N,~N");
Clazz.makeConstructor (c$, 
function (dsc) {
Clazz.superConstructor (this, java.awt.dnd.DragSourceDropEvent, [dsc]);
this.dropSuccess = false;
}, "java.awt.dnd.DragSourceContext");
Clazz.defineMethod (c$, "getDropSuccess", 
function () {
return this.dropSuccess;
});
Clazz.defineMethod (c$, "getDropAction", 
function () {
return this.dropAction;
});
});
