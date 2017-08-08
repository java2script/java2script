Clazz.declarePackage ("java.awt.dnd");
Clazz.load (["java.util.EventObject"], "java.awt.dnd.DropTargetEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.context = null;
Clazz.instantialize (this, arguments);
}, java.awt.dnd, "DropTargetEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (dtc) {
Clazz.superConstructor (this, java.awt.dnd.DropTargetEvent, [dtc.getDropTarget ()]);
this.context = dtc;
}, "java.awt.dnd.DropTargetContext");
Clazz.defineMethod (c$, "getDropTargetContext", 
function () {
return this.context;
});
});
