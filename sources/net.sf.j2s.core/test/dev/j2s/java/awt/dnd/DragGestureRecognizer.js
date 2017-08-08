Clazz.declarePackage ("java.awt.dnd");
Clazz.load (["java.util.ArrayList"], "java.awt.dnd.DragGestureRecognizer", ["java.lang.IllegalArgumentException", "java.util.TooManyListenersException", "java.awt.dnd.DragGestureEvent"], function () {
c$ = Clazz.decorateAsClass (function () {
this.dragSource = null;
this.component = null;
this.dragGestureListener = null;
this.sourceActions = 0;
this.events = null;
Clazz.instantialize (this, arguments);
}, java.awt.dnd, "DragGestureRecognizer", null, java.io.Serializable);
Clazz.prepareFields (c$, function () {
this.events =  new java.util.ArrayList (1);
});
Clazz.makeConstructor (c$, 
function (ds, c, sa, dgl) {
if (ds == null) throw  new IllegalArgumentException ("null DragSource");
this.dragSource = ds;
this.component = c;
this.sourceActions = sa & (1073741827);
try {
if (dgl != null) this.addDragGestureListener (dgl);
} catch (tmle) {
if (Clazz.exceptionOf (tmle, java.util.TooManyListenersException)) {
} else {
throw tmle;
}
}
}, "java.awt.dnd.DragSource,java.awt.Component,~N,java.awt.dnd.DragGestureListener");
Clazz.makeConstructor (c$, 
function (ds, c, sa) {
this.construct (ds, c, sa, null);
}, "java.awt.dnd.DragSource,java.awt.Component,~N");
Clazz.makeConstructor (c$, 
function (ds, c) {
this.construct (ds, c, 0);
}, "java.awt.dnd.DragSource,java.awt.Component");
Clazz.makeConstructor (c$, 
function (ds) {
this.construct (ds, null);
}, "java.awt.dnd.DragSource");
Clazz.defineMethod (c$, "getDragSource", 
function () {
return this.dragSource;
});
Clazz.defineMethod (c$, "getComponent", 
function () {
return this.component;
});
Clazz.defineMethod (c$, "setComponent", 
function (c) {
if (this.component != null && this.dragGestureListener != null) this.unregisterListeners ();
this.component = c;
if (this.component != null && this.dragGestureListener != null) this.registerListeners ();
}, "java.awt.Component");
Clazz.defineMethod (c$, "getSourceActions", 
function () {
return this.sourceActions;
});
Clazz.defineMethod (c$, "setSourceActions", 
function (actions) {
this.sourceActions = actions & (1073741827);
}, "~N");
Clazz.defineMethod (c$, "getTriggerEvent", 
function () {
return this.events.isEmpty () ? null : this.events.get (0);
});
Clazz.defineMethod (c$, "resetRecognizer", 
function () {
this.events.clear ();
});
Clazz.defineMethod (c$, "addDragGestureListener", 
function (dgl) {
if (this.dragGestureListener != null) throw  new java.util.TooManyListenersException ();
 else {
this.dragGestureListener = dgl;
if (this.component != null) this.registerListeners ();
}}, "java.awt.dnd.DragGestureListener");
Clazz.defineMethod (c$, "removeDragGestureListener", 
function (dgl) {
if (this.dragGestureListener == null || !this.dragGestureListener.equals (dgl)) throw  new IllegalArgumentException ();
 else {
this.dragGestureListener = null;
if (this.component != null) this.unregisterListeners ();
}}, "java.awt.dnd.DragGestureListener");
Clazz.defineMethod (c$, "fireDragGestureRecognized", 
function (dragAction, p) {
try {
if (this.dragGestureListener != null) {
this.dragGestureListener.dragGestureRecognized ( new java.awt.dnd.DragGestureEvent (this, dragAction, p, this.events));
}} finally {
this.events.clear ();
}
}, "~N,java.awt.Point");
Clazz.defineMethod (c$, "appendEvent", 
function (awtie) {
this.events.add (awtie);
}, "java.awt.event.InputEvent");
});
