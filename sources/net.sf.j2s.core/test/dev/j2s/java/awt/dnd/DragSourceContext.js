Clazz.declarePackage ("java.awt.dnd");
Clazz.load (["java.awt.dnd.DragSourceListener", "$.DragSourceMotionListener"], "java.awt.dnd.DragSourceContext", ["java.lang.IllegalArgumentException", "$.NullPointerException", "java.util.TooManyListenersException", "java.awt.dnd.DragSource"], function () {
c$ = Clazz.decorateAsClass (function () {
this.peer = null;
this.trigger = null;
this.cursor = null;
this.transferable = null;
this.listener = null;
this.useCustomCursor = false;
this.sourceActions = 0;
Clazz.instantialize (this, arguments);
}, java.awt.dnd, "DragSourceContext", null, [java.awt.dnd.DragSourceListener, java.awt.dnd.DragSourceMotionListener, java.io.Serializable]);
Clazz.makeConstructor (c$, 
function (dscp, trigger, dragCursor, dragImage, offset, t, dsl) {
if (dscp == null) {
throw  new NullPointerException ("DragSourceContextPeer");
}if (trigger == null) {
throw  new NullPointerException ("Trigger");
}if (trigger.getDragSource () == null) {
throw  new IllegalArgumentException ("DragSource");
}if (trigger.getComponent () == null) {
throw  new IllegalArgumentException ("Component");
}if (trigger.getSourceAsDragGestureRecognizer ().getSourceActions () == 0) {
throw  new IllegalArgumentException ("source actions");
}if (trigger.getDragAction () == 0) {
throw  new IllegalArgumentException ("no drag action");
}if (t == null) {
throw  new NullPointerException ("Transferable");
}if (dragImage != null && offset == null) {
throw  new NullPointerException ("offset");
}this.peer = dscp;
this.trigger = trigger;
this.cursor = dragCursor;
this.transferable = t;
this.listener = dsl;
this.sourceActions = trigger.getSourceAsDragGestureRecognizer ().getSourceActions ();
this.useCustomCursor = (dragCursor != null);
this.updateCurrentCursor (trigger.getDragAction (), this.getSourceActions (), 0);
}, "java.awt.dnd.peer.DragSourceContextPeer,java.awt.dnd.DragGestureEvent,java.awt.Cursor,java.awt.Image,java.awt.Point,java.awt.datatransfer.Transferable,java.awt.dnd.DragSourceListener");
Clazz.defineMethod (c$, "getDragSource", 
function () {
return this.trigger.getDragSource ();
});
Clazz.defineMethod (c$, "getComponent", 
function () {
return this.trigger.getComponent ();
});
Clazz.defineMethod (c$, "getTrigger", 
function () {
return this.trigger;
});
Clazz.defineMethod (c$, "getSourceActions", 
function () {
return this.sourceActions;
});
Clazz.defineMethod (c$, "setCursor", 
function (c) {
this.useCustomCursor = (c != null);
this.setCursorImpl (c);
}, "java.awt.Cursor");
Clazz.defineMethod (c$, "getCursor", 
function () {
return this.cursor;
});
Clazz.defineMethod (c$, "addDragSourceListener", 
function (dsl) {
if (dsl == null) return;
if (this.equals (dsl)) throw  new IllegalArgumentException ("DragSourceContext may not be its own listener");
if (this.listener != null) throw  new java.util.TooManyListenersException ();
 else this.listener = dsl;
}, "java.awt.dnd.DragSourceListener");
Clazz.defineMethod (c$, "removeDragSourceListener", 
function (dsl) {
if (this.listener != null && this.listener.equals (dsl)) {
this.listener = null;
} else throw  new IllegalArgumentException ();
}, "java.awt.dnd.DragSourceListener");
Clazz.defineMethod (c$, "transferablesFlavorsChanged", 
function () {
if (this.peer != null) this.peer.transferablesFlavorsChanged ();
});
Clazz.defineMethod (c$, "dragEnter", 
function (dsde) {
var dsl = this.listener;
if (dsl != null) {
dsl.dragEnter (dsde);
}this.getDragSource ().processDragEnter (dsde);
this.updateCurrentCursor (this.getSourceActions (), dsde.getTargetActions (), 1);
}, "java.awt.dnd.DragSourceDragEvent");
Clazz.defineMethod (c$, "dragOver", 
function (dsde) {
var dsl = this.listener;
if (dsl != null) {
dsl.dragOver (dsde);
}this.getDragSource ().processDragOver (dsde);
this.updateCurrentCursor (this.getSourceActions (), dsde.getTargetActions (), 2);
}, "java.awt.dnd.DragSourceDragEvent");
Clazz.defineMethod (c$, "dragExit", 
function (dse) {
var dsl = this.listener;
if (dsl != null) {
dsl.dragExit (dse);
}this.getDragSource ().processDragExit (dse);
this.updateCurrentCursor (0, 0, 0);
}, "java.awt.dnd.DragSourceEvent");
Clazz.defineMethod (c$, "dropActionChanged", 
function (dsde) {
var dsl = this.listener;
if (dsl != null) {
dsl.dropActionChanged (dsde);
}this.getDragSource ().processDropActionChanged (dsde);
this.updateCurrentCursor (this.getSourceActions (), dsde.getTargetActions (), 3);
}, "java.awt.dnd.DragSourceDragEvent");
Clazz.defineMethod (c$, "dragDropEnd", 
function (dsde) {
var dsl = this.listener;
if (dsl != null) {
dsl.dragDropEnd (dsde);
}this.getDragSource ().processDragDropEnd (dsde);
}, "java.awt.dnd.DragSourceDropEvent");
Clazz.overrideMethod (c$, "dragMouseMoved", 
function (dsde) {
this.getDragSource ().processDragMouseMoved (dsde);
}, "java.awt.dnd.DragSourceDragEvent");
Clazz.defineMethod (c$, "getTransferable", 
function () {
return this.transferable;
});
Clazz.defineMethod (c$, "updateCurrentCursor", 
function (sourceAct, targetAct, status) {
if (this.useCustomCursor) {
return;
}var c = null;
switch (status) {
default:
targetAct = 0;
case 1:
case 2:
case 3:
var ra = sourceAct & targetAct;
if (ra == 0) {
if ((sourceAct & 1073741824) == 1073741824) c = java.awt.dnd.DragSource.DefaultLinkNoDrop;
 else if ((sourceAct & 2) == 2) c = java.awt.dnd.DragSource.DefaultMoveNoDrop;
 else c = java.awt.dnd.DragSource.DefaultCopyNoDrop;
} else {
if ((ra & 1073741824) == 1073741824) c = java.awt.dnd.DragSource.DefaultLinkDrop;
 else if ((ra & 2) == 2) c = java.awt.dnd.DragSource.DefaultMoveDrop;
 else c = java.awt.dnd.DragSource.DefaultCopyDrop;
}}
this.setCursorImpl (c);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "setCursorImpl", 
 function (c) {
if (this.cursor == null || !this.cursor.equals (c)) {
this.cursor = c;
if (this.peer != null) this.peer.setCursor (this.cursor);
}}, "java.awt.Cursor");
Clazz.defineStatics (c$,
"DEFAULT", 0,
"ENTER", 1,
"OVER", 2,
"CHANGED", 3,
"emptyTransferable", null);
});
