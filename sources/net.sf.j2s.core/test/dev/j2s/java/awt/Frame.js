Clazz.declarePackage ("java.awt");
Clazz.load (["java.awt.Window"], "java.awt.Frame", ["java.lang.IllegalArgumentException", "java.awt.Cursor", "$.IllegalComponentStateException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.maximizedBounds = null;
this.title = "Untitled";
this.resizable = true;
this.undecorated = false;
this.mbManagement = false;
this.$state = 0;
this.ownedWindows = null;
Clazz.instantialize (this, arguments);
}, java.awt, "Frame", java.awt.Window);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.awt.Frame, []);
this.initTitleGC (null, null);
});
Clazz.makeConstructor (c$, 
function (gc) {
Clazz.superConstructor (this, java.awt.Frame, []);
this.initTitleGC (null, gc);
}, "java.awt.GraphicsConfiguration");
Clazz.makeConstructor (c$, 
function (title) {
Clazz.superConstructor (this, java.awt.Frame, []);
this.initTitleGC (title, null);
}, "~S");
Clazz.makeConstructor (c$, 
function (title, gc) {
Clazz.superConstructor (this, java.awt.Frame, []);
this.initTitleGC (title, gc);
}, "~S,java.awt.GraphicsConfiguration");
Clazz.defineMethod (c$, "initTitleGC", 
function (title, gc) {
this.title = (title == null ? "" : title);
this.initWinGC (null, gc);
}, "~S,java.awt.GraphicsConfiguration");
Clazz.overrideMethod (c$, "constructComponentName", 
function () {
{
return "frame" + java.awt.Frame.$nameCounter++;
}});
Clazz.defineMethod (c$, "addNotify", 
function () {
this.getOrCreatePeer ();
var p = this.peer;
p.setMaximizedBounds (this.maximizedBounds);
Clazz.superCall (this, java.awt.Frame, "addNotify", []);
});
Clazz.overrideMethod (c$, "getOrCreatePeer", 
function () {
return (this.ui == null ? null : this.peer == null ? (this.peer = this.getToolkit ().createFrame (this)) : this.peer);
});
Clazz.defineMethod (c$, "getTitle", 
function () {
return this.title;
});
Clazz.defineMethod (c$, "setTitle", 
function (title) {
var oldTitle = this.title;
if (title == null) {
title = "";
}{
this.title = title;
var peer = this.peer;
if (peer != null) {
peer.setTitle (title);
}}this.firePropertyChangeObject ("title", oldTitle, title);
}, "~S");
Clazz.defineMethod (c$, "getIconImage", 
function () {
var icons = this.icons;
if (icons != null) {
if (icons.size () > 0) {
return icons.get (0);
}}return null;
});
Clazz.defineMethod (c$, "isResizable", 
function () {
return this.resizable;
});
Clazz.defineMethod (c$, "setResizable", 
function (resizable) {
var oldResizable = this.resizable;
{
this.resizable = resizable;
}this.firePropertyChangeBool ("resizable", oldResizable, resizable);
}, "~B");
Clazz.defineMethod (c$, "setState", 
function (state) {
var current = this.getExtendedState ();
if (state == 1 && (current & 1) == 0) {
this.setExtendedState (current | 1);
} else if (state == 0 && (current & 1) != 0) {
this.setExtendedState (current & -2);
}}, "~N");
Clazz.defineMethod (c$, "setExtendedState", 
function (state) {
if (!this.isFrameStateSupported (state)) {
return;
}this.$state = state;
}, "~N");
Clazz.defineMethod (c$, "isFrameStateSupported", 
 function (state) {
if (!this.getToolkit ().isFrameStateSupported (state)) {
if (((state & 1) != 0) && !this.getToolkit ().isFrameStateSupported (1)) {
return false;
} else {
state &= -2;
}return this.getToolkit ().isFrameStateSupported (state);
}return true;
}, "~N");
Clazz.defineMethod (c$, "getState", 
function () {
return (this.getExtendedState () & 1) != 0 ? 1 : 0;
});
Clazz.defineMethod (c$, "getExtendedState", 
function () {
return this.$state;
});
Clazz.defineMethod (c$, "setMaximizedBounds", 
function (bounds) {
this.maximizedBounds = bounds;
}, "java.awt.Rectangle");
Clazz.defineMethod (c$, "getMaximizedBounds", 
function () {
return this.maximizedBounds;
});
Clazz.defineMethod (c$, "setUndecorated", 
function (undecorated) {
{
if (this.isDisplayable ()) {
throw  new java.awt.IllegalComponentStateException ("The frame is displayable.");
}this.undecorated = undecorated;
}}, "~B");
Clazz.defineMethod (c$, "isUndecorated", 
function () {
return this.undecorated;
});
Clazz.defineMethod (c$, "paramString", 
function () {
var str = Clazz.superCall (this, java.awt.Frame, "paramString", []);
if (this.title != null) {
str += ",title=" + this.title;
}if (this.resizable) {
str += ",resizable";
}this.getExtendedState ();
if (this.$state == 0) {
str += ",normal";
} else {
if ((this.$state & 1) != 0) {
str += ",iconified";
}if ((this.$state & 6) == 6) {
str += ",maximized";
} else if ((this.$state & 2) != 0) {
str += ",maximized_horiz";
} else if ((this.$state & 4) != 0) {
str += ",maximized_vert";
}}return str;
});
Clazz.defineMethod (c$, "setCursor", 
function (cursorType) {
if (cursorType < 0 || cursorType > 13) {
throw  new IllegalArgumentException ("illegal cursor type");
}this.setCursor (java.awt.Cursor.getPredefinedCursor (cursorType));
}, "~N");
Clazz.defineMethod (c$, "getCursorType", 
function () {
return (this.getCursor ().getType ());
});
c$.getFrames = Clazz.defineMethod (c$, "getFrames", 
function () {
var allWindows = java.awt.Window.getWindows ();
var frameCount = 0;
for (var w, $w = 0, $$w = allWindows; $w < $$w.length && ((w = $$w[$w]) || true); $w++) {
if (Clazz.instanceOf (w, java.awt.Frame)) {
frameCount++;
}}
var frames =  new Array (frameCount);
var c = 0;
for (var w, $w = 0, $$w = allWindows; $w < $$w.length && ((w = $$w[$w]) || true); $w++) {
if (Clazz.instanceOf (w, java.awt.Frame)) {
frames[c++] = w;
}}
return frames;
});
Clazz.defineStatics (c$,
"DEFAULT_CURSOR", 0,
"CROSSHAIR_CURSOR", 1,
"TEXT_CURSOR", 2,
"WAIT_CURSOR", 3,
"SW_RESIZE_CURSOR", 4,
"SE_RESIZE_CURSOR", 5,
"NW_RESIZE_CURSOR", 6,
"NE_RESIZE_CURSOR", 7,
"N_RESIZE_CURSOR", 8,
"S_RESIZE_CURSOR", 9,
"W_RESIZE_CURSOR", 10,
"E_RESIZE_CURSOR", 11,
"HAND_CURSOR", 12,
"MOVE_CURSOR", 13,
"NORMAL", 0,
"ICONIFIED", 1,
"MAXIMIZED_HORIZ", 2,
"MAXIMIZED_VERT", 4,
"MAXIMIZED_BOTH", 6,
"$base", "frame",
"$nameCounter", 0);
});
