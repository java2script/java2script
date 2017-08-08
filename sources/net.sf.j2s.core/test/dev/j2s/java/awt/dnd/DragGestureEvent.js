Clazz.declarePackage ("java.awt.dnd");
Clazz.load (["java.util.EventObject"], "java.awt.dnd.DragGestureEvent", ["java.lang.IllegalArgumentException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.events = null;
this.dragSource = null;
this.component = null;
this.origin = null;
this.action = 0;
Clazz.instantialize (this, arguments);
}, java.awt.dnd, "DragGestureEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (dgr, act, ori, evs) {
Clazz.superConstructor (this, java.awt.dnd.DragGestureEvent, [dgr]);
if ((this.component = dgr.getComponent ()) == null) throw  new IllegalArgumentException ("null component");
if ((this.dragSource = dgr.getDragSource ()) == null) throw  new IllegalArgumentException ("null DragSource");
if (evs == null || evs.isEmpty ()) throw  new IllegalArgumentException ("null or empty list of events");
if (act != 1 && act != 2 && act != 1073741824) throw  new IllegalArgumentException ("bad action");
if (ori == null) throw  new IllegalArgumentException ("null origin");
this.events = evs;
this.action = act;
this.origin = ori;
}, "java.awt.dnd.DragGestureRecognizer,~N,java.awt.Point,java.util.List");
Clazz.defineMethod (c$, "getSourceAsDragGestureRecognizer", 
function () {
return this.getSource ();
});
Clazz.defineMethod (c$, "getComponent", 
function () {
return this.component;
});
Clazz.defineMethod (c$, "getDragSource", 
function () {
return this.dragSource;
});
Clazz.defineMethod (c$, "getDragOrigin", 
function () {
return this.origin;
});
Clazz.defineMethod (c$, "iterator", 
function () {
return this.events.iterator ();
});
Clazz.defineMethod (c$, "toArray", 
function () {
return this.events.toArray ();
});
Clazz.defineMethod (c$, "toArray", 
function (array) {
return this.events.toArray (array);
}, "~A");
Clazz.defineMethod (c$, "getDragAction", 
function () {
return this.action;
});
Clazz.defineMethod (c$, "getTriggerEvent", 
function () {
return this.getSourceAsDragGestureRecognizer ().getTriggerEvent ();
});
Clazz.defineMethod (c$, "startDrag", 
function (dragCursor, transferable) {
this.dragSource.startDrag (this, dragCursor, transferable, null);
}, "java.awt.Cursor,java.awt.datatransfer.Transferable");
Clazz.defineMethod (c$, "startDrag", 
function (dragCursor, transferable, dsl) {
this.dragSource.startDrag (this, dragCursor, transferable, dsl);
}, "java.awt.Cursor,java.awt.datatransfer.Transferable,java.awt.dnd.DragSourceListener");
Clazz.defineMethod (c$, "startDrag", 
function (dragCursor, dragImage, imageOffset, transferable, dsl) {
this.dragSource.startDrag (this, dragCursor, dragImage, imageOffset, transferable, dsl);
}, "java.awt.Cursor,java.awt.Image,java.awt.Point,java.awt.datatransfer.Transferable,java.awt.dnd.DragSourceListener");
});
