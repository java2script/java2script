Clazz.declarePackage ("java.awt.dnd");
Clazz.load (["java.awt.dnd.DropTargetListener", "java.awt.event.ActionListener", "java.awt.Rectangle", "java.awt.datatransfer.SystemFlavorMap"], "java.awt.dnd.DropTarget", ["java.lang.IllegalArgumentException", "java.util.TooManyListenersException", "java.awt.Toolkit", "java.awt.dnd.Autoscroll", "$.DropTargetContext", "java.awt.dnd.peer.DropTargetPeer", "java.awt.peer.LightweightPeer", "javax.swing.Timer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.dropTargetContext = null;
this.component = null;
this.componentPeer = null;
this.nativePeer = null;
this.actions = 3;
this.active = true;
this.autoScroller = null;
this.dtListener = null;
this.flavorMap = null;
Clazz.instantialize (this, arguments);
}, java.awt.dnd, "DropTarget", null, [java.awt.dnd.DropTargetListener, java.io.Serializable]);
Clazz.prepareFields (c$, function () {
this.dropTargetContext = this.createDropTargetContext ();
this.flavorMap = java.awt.datatransfer.SystemFlavorMap.getDefaultFlavorMap ();
});
Clazz.makeConstructor (c$, 
function (c, ops, dtl, act, fm) {
this.component = c;
this.setDefaultActions (ops);
if (dtl != null) try {
this.addDropTargetListener (dtl);
} catch (tmle) {
if (Clazz.exceptionOf (tmle, java.util.TooManyListenersException)) {
} else {
throw tmle;
}
}
if (c != null) {
c.setDropTarget (this);
this.setActive (act);
}if (fm != null) this.flavorMap = fm;
}, "java.awt.Component,~N,java.awt.dnd.DropTargetListener,~B,java.awt.datatransfer.FlavorMap");
Clazz.makeConstructor (c$, 
function (c, ops, dtl, act) {
this.construct (c, ops, dtl, act, null);
}, "java.awt.Component,~N,java.awt.dnd.DropTargetListener,~B");
Clazz.makeConstructor (c$, 
function () {
this.construct (null, 3, null, true, null);
});
Clazz.makeConstructor (c$, 
function (c, dtl) {
this.construct (c, 3, dtl, true, null);
}, "java.awt.Component,java.awt.dnd.DropTargetListener");
Clazz.makeConstructor (c$, 
function (c, ops, dtl) {
this.construct (c, ops, dtl, true);
}, "java.awt.Component,~N,java.awt.dnd.DropTargetListener");
Clazz.defineMethod (c$, "setComponent", 
function (c) {
if (this.component === c || this.component != null && this.component.equals (c)) return;
var old;
var oldPeer = null;
if ((old = this.component) != null) {
this.clearAutoscroll ();
this.component = null;
if (this.componentPeer != null) {
oldPeer = this.componentPeer;
this.removeNotify (this.componentPeer);
}old.setDropTarget (null);
}if ((this.component = c) != null) try {
c.setDropTarget (this);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
if (old != null) {
old.setDropTarget (this);
this.addNotify (oldPeer);
}} else {
throw e;
}
}
}, "java.awt.Component");
Clazz.defineMethod (c$, "getComponent", 
function () {
return this.component;
});
Clazz.defineMethod (c$, "setDefaultActions", 
function (ops) {
this.getDropTargetContext ().setTargetActions (ops & (1073741827));
}, "~N");
Clazz.defineMethod (c$, "doSetDefaultActions", 
function (ops) {
this.actions = ops;
}, "~N");
Clazz.defineMethod (c$, "getDefaultActions", 
function () {
return this.actions;
});
Clazz.defineMethod (c$, "setActive", 
function (isActive) {
if (isActive != this.active) {
this.active = isActive;
}if (!this.active) this.clearAutoscroll ();
}, "~B");
Clazz.defineMethod (c$, "isActive", 
function () {
return this.active;
});
Clazz.defineMethod (c$, "addDropTargetListener", 
function (dtl) {
if (dtl == null) return;
if (this.equals (dtl)) throw  new IllegalArgumentException ("DropTarget may not be its own Listener");
if (this.dtListener == null) this.dtListener = dtl;
 else throw  new java.util.TooManyListenersException ();
}, "java.awt.dnd.DropTargetListener");
Clazz.defineMethod (c$, "removeDropTargetListener", 
function (dtl) {
if (dtl != null && this.dtListener != null) {
if (this.dtListener.equals (dtl)) this.dtListener = null;
 else throw  new IllegalArgumentException ("listener mismatch");
}}, "java.awt.dnd.DropTargetListener");
Clazz.defineMethod (c$, "dragEnter", 
function (dtde) {
if (!this.active) return;
if (this.dtListener != null) {
this.dtListener.dragEnter (dtde);
} else dtde.getDropTargetContext ().setTargetActions (0);
this.initializeAutoscrolling (dtde.getLocation ());
}, "java.awt.dnd.DropTargetDragEvent");
Clazz.defineMethod (c$, "dragOver", 
function (dtde) {
if (!this.active) return;
if (this.dtListener != null && this.active) this.dtListener.dragOver (dtde);
this.updateAutoscroll (dtde.getLocation ());
}, "java.awt.dnd.DropTargetDragEvent");
Clazz.defineMethod (c$, "dropActionChanged", 
function (dtde) {
if (!this.active) return;
if (this.dtListener != null) this.dtListener.dropActionChanged (dtde);
this.updateAutoscroll (dtde.getLocation ());
}, "java.awt.dnd.DropTargetDragEvent");
Clazz.defineMethod (c$, "dragExit", 
function (dte) {
if (!this.active) return;
if (this.dtListener != null && this.active) this.dtListener.dragExit (dte);
this.clearAutoscroll ();
}, "java.awt.dnd.DropTargetEvent");
Clazz.defineMethod (c$, "drop", 
function (dtde) {
this.clearAutoscroll ();
if (this.dtListener != null && this.active) this.dtListener.drop (dtde);
 else {
dtde.rejectDrop ();
}}, "java.awt.dnd.DropTargetDropEvent");
Clazz.defineMethod (c$, "getFlavorMap", 
function () {
return this.flavorMap;
});
Clazz.defineMethod (c$, "setFlavorMap", 
function (fm) {
this.flavorMap = fm == null ? java.awt.datatransfer.SystemFlavorMap.getDefaultFlavorMap () : fm;
}, "java.awt.datatransfer.FlavorMap");
Clazz.defineMethod (c$, "addNotify", 
function (peer) {
if (peer === this.componentPeer) return;
this.componentPeer = peer;
for (var c = this.component; c != null && Clazz.instanceOf (peer, java.awt.peer.LightweightPeer); c = c.getParent ()) {
peer = c.getPeer ();
}
if (Clazz.instanceOf (peer, java.awt.dnd.peer.DropTargetPeer)) {
this.nativePeer = peer;
(peer).addDropTarget (this);
} else {
this.nativePeer = null;
}}, "java.awt.peer.ComponentPeer");
Clazz.defineMethod (c$, "removeNotify", 
function (peer) {
if (this.nativePeer != null) (this.nativePeer).removeDropTarget (this);
this.componentPeer = this.nativePeer = null;
}, "java.awt.peer.ComponentPeer");
Clazz.defineMethod (c$, "getDropTargetContext", 
function () {
return this.dropTargetContext;
});
Clazz.defineMethod (c$, "createDropTargetContext", 
function () {
return  new java.awt.dnd.DropTargetContext (this);
});
Clazz.defineMethod (c$, "createDropTargetAutoScroller", 
function (c, p) {
return  new java.awt.dnd.DropTarget.DropTargetAutoScroller (c, p);
}, "java.awt.Component,java.awt.Point");
Clazz.defineMethod (c$, "initializeAutoscrolling", 
function (p) {
if (this.component == null || !(Clazz.instanceOf (this.component, java.awt.dnd.Autoscroll))) return;
this.autoScroller = this.createDropTargetAutoScroller (this.component, p);
}, "java.awt.Point");
Clazz.defineMethod (c$, "updateAutoscroll", 
function (dragCursorLocn) {
if (this.autoScroller != null) this.autoScroller.updateLocation (dragCursorLocn);
}, "java.awt.Point");
Clazz.defineMethod (c$, "clearAutoscroll", 
function () {
if (this.autoScroller != null) {
this.autoScroller.stop ();
this.autoScroller = null;
}});
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.component = null;
this.autoScroll = null;
this.timer = null;
this.locn = null;
this.prev = null;
this.outer = null;
this.inner = null;
this.hysteresis = 10;
Clazz.instantialize (this, arguments);
}, java.awt.dnd.DropTarget, "DropTargetAutoScroller", null, java.awt.event.ActionListener);
Clazz.prepareFields (c$, function () {
this.outer =  new java.awt.Rectangle ();
this.inner =  new java.awt.Rectangle ();
});
Clazz.makeConstructor (c$, 
function (a, b) {
this.component = a;
this.autoScroll = this.component;
var c = java.awt.Toolkit.getDefaultToolkit ();
var d = Integer.$valueOf (100);
var e = Integer.$valueOf (100);
try {
d = c.getDesktopProperty ("DnD.Autoscroll.initialDelay");
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
try {
e = c.getDesktopProperty ("DnD.Autoscroll.interval");
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
this.timer =  new javax.swing.Timer (e.intValue (), this);
this.timer.setCoalesce (true);
this.timer.setInitialDelay (d.intValue ());
this.locn = b;
this.prev = b;
try {
this.hysteresis = (c.getDesktopProperty ("DnD.Autoscroll.cursorHysteresis")).intValue ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
this.timer.start ();
}, "java.awt.Component,java.awt.Point");
Clazz.defineMethod (c$, "updateRegion", 
 function () {
var a = this.autoScroll.getAutoscrollInsets ();
var b = this.component.getSize ();
if (b.width != this.outer.width || b.height != this.outer.height) this.outer.reshape (0, 0, b.width, b.height);
if (this.inner.x != a.left || this.inner.y != a.top) this.inner.setLocation (a.left, a.top);
var c = b.width - (a.left + a.right);
var d = b.height - (a.top + a.bottom);
if (c != this.inner.width || d != this.inner.height) this.inner.setSize (c, d);
});
Clazz.defineMethod (c$, "updateLocation", 
function (a) {
this.prev = this.locn;
this.locn = a;
if (Math.abs (this.locn.x - this.prev.x) > this.hysteresis || Math.abs (this.locn.y - this.prev.y) > this.hysteresis) {
if (this.timer.isRunning ()) this.timer.stop ();
} else {
if (!this.timer.isRunning ()) this.timer.start ();
}}, "java.awt.Point");
Clazz.defineMethod (c$, "stop", 
function () {
this.timer.stop ();
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
this.updateRegion ();
if (this.outer.contains (this.locn) && !this.inner.contains (this.locn)) this.autoScroll.autoscroll (this.locn);
}, "java.awt.event.ActionEvent");
c$ = Clazz.p0p ();
});
