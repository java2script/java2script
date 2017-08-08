Clazz.declarePackage ("java.awt.dnd");
Clazz.load (["java.awt.GraphicsEnvironment", "java.awt.datatransfer.SystemFlavorMap"], "java.awt.dnd.DragSource", ["java.lang.RuntimeException", "java.awt.Toolkit", "java.awt.dnd.DnDEventMulticaster", "$.DragSourceContext", "$.DragSourceListener", "$.DragSourceMotionListener", "$.InvalidDnDOperationException", "$.MouseDragGestureRecognizer", "sun.awt.dnd.SunDragSourceContextPeer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.flavorMap = null;
this.listener = null;
this.motionListener = null;
Clazz.instantialize (this, arguments);
}, java.awt.dnd, "DragSource", null, java.io.Serializable);
Clazz.prepareFields (c$, function () {
this.flavorMap = java.awt.datatransfer.SystemFlavorMap.getDefaultFlavorMap ();
});
c$.load = Clazz.defineMethod (c$, "load", 
 function (name) {
if (java.awt.GraphicsEnvironment.isHeadless ()) {
return null;
}try {
return java.awt.Toolkit.getDefaultToolkit ().getDesktopProperty (name);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
throw  new RuntimeException ("failed to load system cursor: " + name + " : " + e.getMessage ());
} else {
throw e;
}
}
}, "~S");
c$.getDefaultDragSource = Clazz.defineMethod (c$, "getDefaultDragSource", 
function () {
return java.awt.dnd.DragSource.dflt;
});
c$.isDragImageSupported = Clazz.defineMethod (c$, "isDragImageSupported", 
function () {
var t = java.awt.Toolkit.getDefaultToolkit ();
var supported;
try {
supported = java.awt.Toolkit.getDefaultToolkit ().getDesktopProperty ("DnD.isDragImageSupported");
return supported.booleanValue ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return false;
} else {
throw e;
}
}
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "startDrag", 
function (trigger, dragCursor, dragImage, imageOffset, transferable, dsl, flavorMap) {
sun.awt.dnd.SunDragSourceContextPeer.setDragDropInProgress (true);
try {
if (flavorMap != null) this.flavorMap = flavorMap;
var dscp = java.awt.Toolkit.getDefaultToolkit ().createDragSourceContextPeer (trigger);
var dsc = this.createDragSourceContext (dscp, trigger, dragCursor, dragImage, imageOffset, transferable, dsl);
if (dsc == null) {
throw  new java.awt.dnd.InvalidDnDOperationException ();
}dscp.startDrag (dsc, dsc.getCursor (), dragImage, imageOffset);
} catch (e) {
if (Clazz.exceptionOf (e, RuntimeException)) {
sun.awt.dnd.SunDragSourceContextPeer.setDragDropInProgress (false);
throw e;
} else {
throw e;
}
}
}, "java.awt.dnd.DragGestureEvent,java.awt.Cursor,java.awt.Image,java.awt.Point,java.awt.datatransfer.Transferable,java.awt.dnd.DragSourceListener,java.awt.datatransfer.FlavorMap");
Clazz.defineMethod (c$, "startDrag", 
function (trigger, dragCursor, transferable, dsl, flavorMap) {
this.startDrag (trigger, dragCursor, null, null, transferable, dsl, flavorMap);
}, "java.awt.dnd.DragGestureEvent,java.awt.Cursor,java.awt.datatransfer.Transferable,java.awt.dnd.DragSourceListener,java.awt.datatransfer.FlavorMap");
Clazz.defineMethod (c$, "startDrag", 
function (trigger, dragCursor, dragImage, dragOffset, transferable, dsl) {
this.startDrag (trigger, dragCursor, dragImage, dragOffset, transferable, dsl, null);
}, "java.awt.dnd.DragGestureEvent,java.awt.Cursor,java.awt.Image,java.awt.Point,java.awt.datatransfer.Transferable,java.awt.dnd.DragSourceListener");
Clazz.defineMethod (c$, "startDrag", 
function (trigger, dragCursor, transferable, dsl) {
this.startDrag (trigger, dragCursor, null, null, transferable, dsl, null);
}, "java.awt.dnd.DragGestureEvent,java.awt.Cursor,java.awt.datatransfer.Transferable,java.awt.dnd.DragSourceListener");
Clazz.defineMethod (c$, "createDragSourceContext", 
function (dscp, dgl, dragCursor, dragImage, imageOffset, t, dsl) {
return  new java.awt.dnd.DragSourceContext (dscp, dgl, dragCursor, dragImage, imageOffset, t, dsl);
}, "java.awt.dnd.peer.DragSourceContextPeer,java.awt.dnd.DragGestureEvent,java.awt.Cursor,java.awt.Image,java.awt.Point,java.awt.datatransfer.Transferable,java.awt.dnd.DragSourceListener");
Clazz.defineMethod (c$, "getFlavorMap", 
function () {
return this.flavorMap;
});
Clazz.defineMethod (c$, "createDragGestureRecognizer", 
function (recognizerAbstractClass, c, actions, dgl) {
return java.awt.Toolkit.getDefaultToolkit ().createDragGestureRecognizer (recognizerAbstractClass, this, c, actions, dgl);
}, "Class,java.awt.Component,~N,java.awt.dnd.DragGestureListener");
Clazz.defineMethod (c$, "createDefaultDragGestureRecognizer", 
function (c, actions, dgl) {
return java.awt.Toolkit.getDefaultToolkit ().createDragGestureRecognizer (java.awt.dnd.MouseDragGestureRecognizer, this, c, actions, dgl);
}, "java.awt.Component,~N,java.awt.dnd.DragGestureListener");
Clazz.defineMethod (c$, "addDragSourceListener", 
function (dsl) {
if (dsl != null) {
{
this.listener = java.awt.dnd.DnDEventMulticaster.add (this.listener, dsl);
}}}, "java.awt.dnd.DragSourceListener");
Clazz.defineMethod (c$, "removeDragSourceListener", 
function (dsl) {
if (dsl != null) {
{
this.listener = java.awt.dnd.DnDEventMulticaster.remove (this.listener, dsl);
}}}, "java.awt.dnd.DragSourceListener");
Clazz.defineMethod (c$, "getDragSourceListeners", 
function () {
return this.getListeners (java.awt.dnd.DragSourceListener);
});
Clazz.defineMethod (c$, "addDragSourceMotionListener", 
function (dsml) {
if (dsml != null) {
{
this.motionListener = java.awt.dnd.DnDEventMulticaster.add (this.motionListener, dsml);
}}}, "java.awt.dnd.DragSourceMotionListener");
Clazz.defineMethod (c$, "removeDragSourceMotionListener", 
function (dsml) {
if (dsml != null) {
{
this.motionListener = java.awt.dnd.DnDEventMulticaster.remove (this.motionListener, dsml);
}}}, "java.awt.dnd.DragSourceMotionListener");
Clazz.defineMethod (c$, "getDragSourceMotionListeners", 
function () {
return this.getListeners (java.awt.dnd.DragSourceMotionListener);
});
Clazz.defineMethod (c$, "getListeners", 
function (listenerType) {
var l = null;
if (listenerType === java.awt.dnd.DragSourceListener) {
l = this.listener;
} else if (listenerType === java.awt.dnd.DragSourceMotionListener) {
l = this.motionListener;
}return java.awt.dnd.DnDEventMulticaster.getListeners (l, listenerType);
}, "Class");
Clazz.defineMethod (c$, "processDragEnter", 
function (dsde) {
var dsl = this.listener;
if (dsl != null) {
dsl.dragEnter (dsde);
}}, "java.awt.dnd.DragSourceDragEvent");
Clazz.defineMethod (c$, "processDragOver", 
function (dsde) {
var dsl = this.listener;
if (dsl != null) {
dsl.dragOver (dsde);
}}, "java.awt.dnd.DragSourceDragEvent");
Clazz.defineMethod (c$, "processDropActionChanged", 
function (dsde) {
var dsl = this.listener;
if (dsl != null) {
dsl.dropActionChanged (dsde);
}}, "java.awt.dnd.DragSourceDragEvent");
Clazz.defineMethod (c$, "processDragExit", 
function (dse) {
var dsl = this.listener;
if (dsl != null) {
dsl.dragExit (dse);
}}, "java.awt.dnd.DragSourceEvent");
Clazz.defineMethod (c$, "processDragDropEnd", 
function (dsde) {
var dsl = this.listener;
if (dsl != null) {
dsl.dragDropEnd (dsde);
}}, "java.awt.dnd.DragSourceDropEvent");
Clazz.defineMethod (c$, "processDragMouseMoved", 
function (dsde) {
var dsml = this.motionListener;
if (dsml != null) {
dsml.dragMouseMoved (dsde);
}}, "java.awt.dnd.DragSourceDragEvent");
c$.getDragThreshold = Clazz.defineMethod (c$, "getDragThreshold", 
function () {
return 5;
});
c$.DefaultCopyDrop = c$.prototype.DefaultCopyDrop = java.awt.dnd.DragSource.load ("DnD.Cursor.CopyDrop");
c$.DefaultMoveDrop = c$.prototype.DefaultMoveDrop = java.awt.dnd.DragSource.load ("DnD.Cursor.MoveDrop");
c$.DefaultLinkDrop = c$.prototype.DefaultLinkDrop = java.awt.dnd.DragSource.load ("DnD.Cursor.LinkDrop");
c$.DefaultCopyNoDrop = c$.prototype.DefaultCopyNoDrop = java.awt.dnd.DragSource.load ("DnD.Cursor.CopyNoDrop");
c$.DefaultMoveNoDrop = c$.prototype.DefaultMoveNoDrop = java.awt.dnd.DragSource.load ("DnD.Cursor.MoveNoDrop");
c$.DefaultLinkNoDrop = c$.prototype.DefaultLinkNoDrop = java.awt.dnd.DragSource.load ("DnD.Cursor.LinkNoDrop");
c$.dflt = c$.prototype.dflt = (java.awt.GraphicsEnvironment.isHeadless ()) ? null :  new java.awt.dnd.DragSource ();
Clazz.defineStatics (c$,
"dragSourceListenerK", "dragSourceL",
"dragSourceMotionListenerK", "dragSourceMotionL");
});
