Clazz.declarePackage ("sun.awt");
Clazz.load (["java.awt.peer.LightweightPeer", "$.PanelPeer"], "sun.awt.NullComponentPeer", ["java.lang.IllegalStateException", "$.UnsupportedOperationException", "java.awt.Dimension", "$.Insets", "$.Point", "$.Rectangle"], function () {
c$ = Clazz.declareType (sun.awt, "NullComponentPeer", null, [java.awt.peer.LightweightPeer, java.awt.peer.PanelPeer]);
Clazz.overrideMethod (c$, "isObscured", 
function () {
return false;
});
Clazz.overrideMethod (c$, "canDetermineObscurity", 
function () {
return false;
});
Clazz.overrideMethod (c$, "isFocusable", 
function () {
return false;
});
Clazz.overrideMethod (c$, "setVisible", 
function (b) {
}, "~B");
Clazz.defineMethod (c$, "show", 
function () {
});
Clazz.defineMethod (c$, "hide", 
function () {
});
Clazz.overrideMethod (c$, "setEnabled", 
function (b) {
}, "~B");
Clazz.defineMethod (c$, "enable", 
function () {
});
Clazz.defineMethod (c$, "disable", 
function () {
});
Clazz.overrideMethod (c$, "paint", 
function (g) {
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "repaint", 
function (tm, x, y, width, height) {
}, "~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "print", 
function (g) {
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "setBounds", 
function (x, y, width, height, op) {
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "reshape", 
function (x, y, width, height) {
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "coalescePaintEvent", 
function (e) {
}, "java.awt.event.PaintEvent");
Clazz.defineMethod (c$, "handleEvent", 
function (e) {
return false;
}, "java.awt.Event");
Clazz.defineMethod (c$, "handleEvent", 
function (arg0) {
}, "java.awt.AWTEvent");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return  new java.awt.Dimension (1, 1);
});
Clazz.overrideMethod (c$, "getMinimumSize", 
function () {
return  new java.awt.Dimension (1, 1);
});
Clazz.overrideMethod (c$, "getToolkit", 
function () {
return null;
});
Clazz.overrideMethod (c$, "getColorModel", 
function () {
return null;
});
Clazz.overrideMethod (c$, "getGraphics", 
function () {
return null;
});
Clazz.overrideMethod (c$, "getGraphicsConfiguration", 
function () {
return null;
});
Clazz.overrideMethod (c$, "getFontMetrics", 
function (font) {
return null;
}, "java.awt.Font");
Clazz.overrideMethod (c$, "dispose", 
function () {
});
Clazz.overrideMethod (c$, "setForeground", 
function (c) {
}, "java.awt.Color");
Clazz.overrideMethod (c$, "setBackground", 
function (c) {
}, "java.awt.Color");
Clazz.overrideMethod (c$, "setFont", 
function (f) {
}, "java.awt.Font");
Clazz.overrideMethod (c$, "updateCursorImmediately", 
function () {
});
Clazz.defineMethod (c$, "setCursor", 
function (cursor) {
}, "java.awt.Cursor");
Clazz.overrideMethod (c$, "requestFocus", 
function (lightweightChild, temporary, focusedWindowChangeAllowed, time, cause) {
return false;
}, "java.awt.Component,~B,~B,~N,sun.awt.CausedFocusEvent.Cause");
Clazz.defineMethod (c$, "createImage", 
function (producer) {
return null;
}, "java.awt.image.ImageProducer");
Clazz.defineMethod (c$, "createImage", 
function (width, height) {
return null;
}, "~N,~N");
Clazz.overrideMethod (c$, "prepareImage", 
function (img, w, h, o) {
return false;
}, "java.awt.Image,~N,~N,java.awt.image.ImageObserver");
Clazz.overrideMethod (c$, "checkImage", 
function (img, w, h, o) {
return 0;
}, "java.awt.Image,~N,~N,java.awt.image.ImageObserver");
Clazz.defineMethod (c$, "preferredSize", 
function () {
return this.getPreferredSize ();
});
Clazz.defineMethod (c$, "minimumSize", 
function () {
return this.getMinimumSize ();
});
Clazz.overrideMethod (c$, "getLocationOnScreen", 
function () {
return  new java.awt.Point (0, 0);
});
Clazz.overrideMethod (c$, "getInsets", 
function () {
return this.insets ();
});
Clazz.overrideMethod (c$, "beginValidate", 
function () {
});
Clazz.overrideMethod (c$, "endValidate", 
function () {
});
Clazz.defineMethod (c$, "insets", 
function () {
return  new java.awt.Insets (0, 0, 0, 0);
});
Clazz.defineMethod (c$, "isPaintPending", 
function () {
return false;
});
Clazz.overrideMethod (c$, "handlesWheelScrolling", 
function () {
return false;
});
Clazz.overrideMethod (c$, "createVolatileImage", 
function (width, height) {
return null;
}, "~N,~N");
Clazz.overrideMethod (c$, "beginLayout", 
function () {
});
Clazz.overrideMethod (c$, "endLayout", 
function () {
});
Clazz.overrideMethod (c$, "getBackBuffer", 
function () {
throw  new IllegalStateException ("Page-flipping is not allowed on a lightweight component");
});
Clazz.overrideMethod (c$, "destroyBuffers", 
function () {
});
Clazz.overrideMethod (c$, "isReparentSupported", 
function () {
return false;
});
Clazz.overrideMethod (c$, "reparent", 
function (newNativeParent) {
throw  new UnsupportedOperationException ();
}, "java.awt.peer.ContainerPeer");
Clazz.defineMethod (c$, "restack", 
function () {
throw  new UnsupportedOperationException ();
});
Clazz.defineMethod (c$, "isRestackSupported", 
function () {
return false;
});
Clazz.overrideMethod (c$, "layout", 
function () {
});
Clazz.overrideMethod (c$, "getBounds", 
function () {
return  new java.awt.Rectangle (0, 0, 0, 0);
});
});
