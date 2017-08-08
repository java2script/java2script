Clazz.declarePackage ("java.awt");
Clazz.load (["java.lang.Enum", "java.awt.image.ImageObserver", "java.util.HashMap", "java.awt.ComponentOrientation"], "java.awt.Component", ["java.lang.Boolean", "$.Character", "$.Double", "$.Float", "$.IllegalArgumentException", "$.Long", "$.NullPointerException", "$.Short", "$.Thread", "java.awt.AWTEventMulticaster", "$.Cursor", "$.Dimension", "$.EventQueue", "$.IllegalComponentStateException", "$.Point", "$.Rectangle", "$.Toolkit", "java.awt.event.ComponentEvent", "$.ComponentListener", "$.FocusEvent", "$.FocusListener", "$.HierarchyBoundsListener", "$.HierarchyEvent", "$.HierarchyListener", "$.InputEvent", "$.InputMethodEvent", "$.InputMethodListener", "$.KeyEvent", "$.KeyListener", "$.MouseEvent", "$.MouseListener", "$.MouseMotionListener", "$.MouseWheelEvent", "$.MouseWheelListener", "$.PaintEvent", "java.awt.peer.LightweightPeer", "java.beans.PropertyChangeListener", "$.PropertyChangeSupport", "sun.awt.AppContext", "$.SunToolkit", "swingjs.JSToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.peer = null;
this.parent = null;
this.appContext = null;
this.x = 0;
this.y = 0;
this.width = 0;
this.height = 0;
this.foreground = null;
this.background = null;
this.font = null;
this.peerFont = null;
this.cursor = null;
this.locale = null;
this.visible = true;
this.enabled = true;
this.valid = false;
this.popups = null;
this.name = null;
this.nameExplicitlySet = false;
this.focusable = true;
this.$isFocusTraversableOverridden = 0;
this.focusTraversalKeysEnabled = false;
this.minSize = null;
this.minSizeSet = false;
this.prefSize = null;
this.prefSizeSet = false;
this.maxSize = null;
this.maxSizeSet = false;
this.componentOrientation = null;
this.newEventsOnly = false;
this.componentListener = null;
this.focusListener = null;
this.hierarchyListener = null;
this.hierarchyBoundsListener = null;
this.keyListener = null;
this.mouseListener = null;
this.mouseMotionListener = null;
this.mouseWheelListener = null;
this.inputMethodListener = null;
this.windowClosingException = null;
this.eventMask = 4096;
this.changeSupport = null;
this.changeSupportLock = null;
this.isPacked = false;
this.boundsOp = 3;
this.isAddNotifyComplete = false;
this.backgroundEraseDisabled = false;
this.dropTarget = null;
this.graphicsConfig = null;
this.eventCache = null;
this.coalescingEnabled = false;
this.autoFocusTransferOnDisposal = true;
Clazz.instantialize (this, arguments);
}, java.awt, "Component", null, java.awt.image.ImageObserver);
Clazz.prepareFields (c$, function () {
this.componentOrientation = java.awt.ComponentOrientation.UNKNOWN;
this.changeSupportLock =  new Clazz._O ();
this.coalescingEnabled = this.checkCoalescing ();
});
Clazz.defineMethod (c$, "getAppContext", 
function () {
return this.appContext;
});
Clazz.defineMethod (c$, "getChangeSupportLock", 
 function () {
return this.changeSupportLock;
});
Clazz.defineMethod (c$, "getBoundsOp", 
function () {
return this.boundsOp;
});
Clazz.defineMethod (c$, "setBoundsOp", 
function (op) {
if (op == 5) {
this.boundsOp = 3;
} else if (this.boundsOp == 3) {
this.boundsOp = op;
}}, "~N");
Clazz.makeConstructor (c$, 
function () {
this.setAppContext ();
});
Clazz.defineMethod (c$, "setAppContext", 
function () {
this.appContext = sun.awt.AppContext.getAppContext ();
});
Clazz.defineMethod (c$, "constructComponentName", 
function () {
return null;
});
Clazz.defineMethod (c$, "getName", 
function () {
if (this.name == null && !this.nameExplicitlySet) {
{
if (this.name == null && !this.nameExplicitlySet) this.name = this.constructComponentName ();
}}return this.name;
});
Clazz.defineMethod (c$, "setName", 
function (name) {
var oldName;
{
oldName = this.name;
this.name = name;
this.nameExplicitlySet = true;
}this.firePropertyChangeObject ("name", oldName, name);
}, "~S");
Clazz.defineMethod (c$, "getParent", 
function () {
return this.getParent_NoClientCode ();
});
Clazz.defineMethod (c$, "getParent_NoClientCode", 
function () {
return this.parent;
});
Clazz.defineMethod (c$, "getContainer", 
function () {
return this.getParent ();
});
Clazz.defineMethod (c$, "getPeer", 
function () {
return this.peer;
});
Clazz.defineMethod (c$, "setDropTarget", 
function (dt) {
if (dt === this.dropTarget || (this.dropTarget != null && this.dropTarget.equals (dt))) return;
var old;
if ((old = this.dropTarget) != null) {
if (this.peer != null) this.dropTarget.removeNotify (this.peer);
var t = this.dropTarget;
this.dropTarget = null;
try {
t.setComponent (null);
} catch (iae) {
if (Clazz.exceptionOf (iae, IllegalArgumentException)) {
} else {
throw iae;
}
}
}if ((this.dropTarget = dt) != null) {
try {
this.dropTarget.setComponent (this);
if (this.peer != null) this.dropTarget.addNotify (this.peer);
} catch (iae) {
if (Clazz.exceptionOf (iae, IllegalArgumentException)) {
if (old != null) {
try {
old.setComponent (this);
if (this.peer != null) this.dropTarget.addNotify (this.peer);
} catch (iae1) {
if (Clazz.exceptionOf (iae1, IllegalArgumentException)) {
} else {
throw iae1;
}
}
}} else {
throw iae;
}
}
}}, "java.awt.dnd.DropTarget");
Clazz.defineMethod (c$, "getDropTarget", 
function () {
return this.dropTarget;
});
Clazz.defineMethod (c$, "getGraphicsConfiguration", 
function () {
return swingjs.JSToolkit.getGraphicsConfiguration ();
});
Clazz.defineMethod (c$, "resetGC", 
function () {
});
Clazz.defineMethod (c$, "getToolkit", 
function () {
return this.getToolkitImpl ();
});
Clazz.defineMethod (c$, "getToolkitImpl", 
function () {
var peer = this.peer;
if ((peer != null) && !(Clazz.instanceOf (peer, java.awt.peer.LightweightPeer))) {
return peer.getToolkit ();
}var parent = this.parent;
if (parent != null) {
return parent.getToolkitImpl ();
}return java.awt.Toolkit.getDefaultToolkit ();
});
Clazz.defineMethod (c$, "isValid", 
function () {
return this.valid;
});
Clazz.defineMethod (c$, "isDisplayable", 
function () {
return true;
});
Clazz.defineMethod (c$, "isVisible", 
function () {
return this.isVisible_NoClientCode ();
});
Clazz.defineMethod (c$, "isVisible_NoClientCode", 
function () {
return this.visible;
});
Clazz.defineMethod (c$, "isRecursivelyVisible", 
function () {
return this.visible && (this.parent == null || this.parent.isRecursivelyVisible ());
});
Clazz.defineMethod (c$, "pointRelativeToComponent", 
function (absolute) {
var compCoords = this.getLocationOnScreen ();
return  new java.awt.Point (absolute.x - compCoords.x, absolute.y - compCoords.y);
}, "java.awt.Point");
Clazz.defineMethod (c$, "getMousePosition", 
function () {
return null;
});
Clazz.defineMethod (c$, "isSameOrAncestorOf", 
function (comp, allowChildren) {
return comp === this;
}, "java.awt.Component,~B");
Clazz.defineMethod (c$, "isShowing", 
function () {
if (this.visible) {
var parent = this.parent;
return (parent == null) || parent.isShowing ();
}return false;
});
Clazz.defineMethod (c$, "isEnabled", 
function () {
return this.isEnabledImpl ();
});
Clazz.defineMethod (c$, "isEnabledImpl", 
function () {
return this.enabled;
});
Clazz.defineMethod (c$, "setEnabled", 
function (b) {
this.enable (b);
}, "~B");
Clazz.defineMethod (c$, "enable", 
function () {
if (!this.enabled) {
this.enabled = true;
var peer = this.getOrCreatePeer ();
if (peer != null) {
peer.setEnabled (true);
if (this.visible) {
this.updateCursorImmediately ();
}}}});
Clazz.defineMethod (c$, "enable", 
function (b) {
if (b) {
this.enable ();
} else {
this.disable ();
}}, "~B");
Clazz.defineMethod (c$, "disable", 
function () {
if (this.enabled) {
this.enabled = false;
var peer = this.getOrCreatePeer ();
if (peer != null) {
peer.setEnabled (false);
if (this.visible) {
this.updateCursorImmediately ();
}}}});
Clazz.defineMethod (c$, "isDoubleBuffered", 
function () {
return false;
});
Clazz.defineMethod (c$, "setVisible", 
function (b) {
if (b) {
this.show ();
} else {
this.hide ();
}}, "~B");
Clazz.defineMethod (c$, "show", 
function () {
this.showSAEM ();
});
Clazz.defineMethod (c$, "showSAEM", 
function () {
if (!this.visible) {
this.visible = true;
this.updatePeerVisibility (true);
if (this.componentListener != null || (this.eventMask & 1) != 0 || java.awt.Toolkit.enabledOnToolkit (1)) {
var e =  new java.awt.event.ComponentEvent (this, 102);
java.awt.Toolkit.getEventQueue ().postEvent (e);
}}var parent = this.parent;
if (parent != null) {
parent.invalidate ();
}});
Clazz.defineMethod (c$, "updatePeerVisibility", 
function (isVisible) {
this.updatePeerVisibilityOrig (isVisible);
}, "~B");
Clazz.defineMethod (c$, "updatePeerVisibilityOrig", 
function (isVisible) {
this.peer.setVisible (isVisible);
this.createHierarchyEvents (1400, this, this.parent, 4, java.awt.Toolkit.enabledOnToolkit (32768));
if (Clazz.instanceOf (this.peer, java.awt.peer.LightweightPeer)) {
this.repaint ();
}this.updateCursorImmediately ();
}, "~B");
Clazz.defineMethod (c$, "getOrCreatePeer", 
function () {
return this.peer;
});
Clazz.defineMethod (c$, "containsFocus", 
function () {
return this.isFocusOwner ();
});
Clazz.defineMethod (c$, "clearCurrentFocusCycleRootOnHide", 
function () {
});
Clazz.defineMethod (c$, "hide", 
function () {
this.hideSAEM ();
});
Clazz.defineMethod (c$, "hideSAEM", 
function () {
this.isPacked = false;
if (this.visible) {
this.clearCurrentFocusCycleRootOnHide ();
this.visible = false;
this.mixOnHiding (this.isLightweight ());
this.updatePeerVisibility (false);
if (this.componentListener != null || (this.eventMask & 1) != 0 || java.awt.Toolkit.enabledOnToolkit (1)) {
var e =  new java.awt.event.ComponentEvent (this, 103);
java.awt.Toolkit.getEventQueue ().postEvent (e);
}}var parent = this.parent;
if (parent != null) {
parent.invalidate ();
}});
Clazz.defineMethod (c$, "getForeground", 
function () {
var foreground = this.foreground;
if (foreground != null) {
return foreground;
}var parent = this.parent;
return (parent != null) ? parent.getForeground () : null;
});
Clazz.defineMethod (c$, "setForeground", 
function (c) {
var oldColor = this.foreground;
var peer = this.getOrCreatePeer ();
this.foreground = c;
if (peer != null) {
c = this.getForeground ();
if (c != null) {
peer.setForeground (c);
}}this.firePropertyChangeObject ("foreground", oldColor, c);
}, "java.awt.Color");
Clazz.defineMethod (c$, "isForegroundSet", 
function () {
return (this.foreground != null);
});
Clazz.defineMethod (c$, "getBackground", 
function () {
var background = this.background;
if (background != null) {
return background;
}var parent = this.parent;
return (parent != null) ? parent.getBackground () : null;
});
Clazz.defineMethod (c$, "setBackground", 
function (c) {
var oldColor = this.background;
var peer = this.getOrCreatePeer ();
this.background = c;
if (peer != null) {
c = this.getBackground ();
if (c != null) {
peer.setBackground (c);
}}this.firePropertyChangeObject ("background", oldColor, c);
}, "java.awt.Color");
Clazz.defineMethod (c$, "isBackgroundSet", 
function () {
return (this.background != null);
});
Clazz.defineMethod (c$, "getFont", 
function () {
return this.getFont_NoClientCode ();
});
Clazz.defineMethod (c$, "getFont_NoClientCode", 
function () {
var font = this.font;
if (font != null) {
return font;
}var parent = this.parent;
if (parent != null) return parent.getFont_NoClientCode ();
return null;
});
Clazz.defineMethod (c$, "setFont", 
function (f) {
this.setFontComp (f);
}, "java.awt.Font");
Clazz.defineMethod (c$, "setFontComp", 
function (f) {
var oldFont;
var newFont;
oldFont = this.font;
newFont = this.font = f;
{
{
}var peer = this.getOrCreatePeer ();
if (peer != null) {
f = this.getFont ();
if (f != null) {
peer.setFont (f);
this.peerFont = f;
}}}this.firePropertyChangeObject ("font", oldFont, newFont);
if (f !== oldFont && (oldFont == null || !oldFont.equals (f))) {
this.invalidateIfValid ();
}}, "java.awt.Font");
Clazz.defineMethod (c$, "isFontSet", 
function () {
return (this.font != null);
});
Clazz.defineMethod (c$, "getLocale", 
function () {
var locale = this.locale;
if (locale != null) {
return locale;
}var parent = this.parent;
if (parent == null) {
throw  new java.awt.IllegalComponentStateException ("This component must have a parent in order to determine its locale");
} else {
return parent.getLocale ();
}});
Clazz.defineMethod (c$, "setLocale", 
function (l) {
var oldValue = this.locale;
this.locale = l;
this.firePropertyChangeObject ("locale", oldValue, l);
this.invalidateIfValid ();
}, "java.util.Locale");
Clazz.defineMethod (c$, "getLocation", 
function () {
return this.location ();
});
Clazz.defineMethod (c$, "getLocationOnScreen", 
function () {
return this.getLocationOnScreen_NoTreeLock ();
});
Clazz.defineMethod (c$, "getLocationOnScreen_NoTreeLock", 
function () {
if (this.isShowing ()) {
if (Clazz.instanceOf (this.peer, java.awt.peer.LightweightPeer)) {
var host = this.getNativeContainer ();
var pt = host.peer.getLocationOnScreen ();
for (var c = this; c !== host; c = c.getParent ()) {
pt.x += c.x;
pt.y += c.y;
}
return pt;
} else {
var pt = this.peer.getLocationOnScreen ();
return pt;
}} else {
throw  new java.awt.IllegalComponentStateException ("component must be showing on the screen to determine its location");
}});
Clazz.defineMethod (c$, "location", 
function () {
return this.location_NoClientCode ();
});
Clazz.defineMethod (c$, "location_NoClientCode", 
 function () {
return  new java.awt.Point (this.x, this.y);
});
Clazz.defineMethod (c$, "setLocation", 
function (x, y) {
this.setBoundsOp (1);
this.setBounds (x, y, this.width, this.height);
}, "~N,~N");
Clazz.defineMethod (c$, "move", 
function (x, y) {
this.setLocation (x, y);
}, "~N,~N");
Clazz.defineMethod (c$, "setLocation", 
function (p) {
this.setLocation (p.x, p.y);
}, "java.awt.Point");
Clazz.defineMethod (c$, "getSize", 
function () {
return this.size ();
});
Clazz.defineMethod (c$, "size", 
function () {
return  new java.awt.Dimension (this.width, this.height);
});
Clazz.defineMethod (c$, "setSize", 
function (width, height) {
{
if (arguments.length == 1) {
var d = arguments[0];
width = d.width;
height = d.height;
}
}this.resize (width, height);
}, "~N,~N");
Clazz.defineMethod (c$, "resize", 
function (width, height) {
this.setBoundsOp (2);
this.setBounds (this.x, this.y, width, height);
}, "~N,~N");
Clazz.defineMethod (c$, "setBounds", 
function (x, y, width, height) {
this.reshape (x, y, width, height);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setBounds", 
function (r) {
this.setBounds (r.x, r.y, r.width, r.height);
}, "java.awt.Rectangle");
Clazz.defineMethod (c$, "reshape", 
function (x, y, width, height) {
try {
this.setBoundsOp (3);
width = Math.max (0, width);
height = Math.max (0, height);
var resized = (this.width != width) || (this.height != height);
var moved = (this.x != x) || (this.y != y);
if (!resized && !moved) {
return;
}var oldX = this.x;
var oldY = this.y;
var oldWidth = this.width;
var oldHeight = this.height;
this.x = x;
this.y = y;
this.width = width;
this.height = height;
if (resized) {
this.isPacked = false;
}var needNotify = true;
this.mixOnReshaping ();
if (this.getOrCreatePeer () != null) {
this.reshapeNativePeer (x, y, width, height, this.getBoundsOp ());
resized = (oldWidth != this.width) || (oldHeight != this.height);
moved = (oldX != this.x) || (oldY != this.y);
if (Clazz.instanceOf (this, java.awt.Window)) {
needNotify = false;
}if (resized) {
this.invalidate ();
}if (this.parent != null) {
this.parent.invalidateIfValid ();
}}if (needNotify) {
this.notifyNewBounds (resized, moved);
}this.repaintParentIfNeeded (oldX, oldY, oldWidth, oldHeight);
} finally {
this.setBoundsOp (5);
}
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "repaintParentIfNeeded", 
 function (oldX, oldY, oldWidth, oldHeight) {
if (this.parent != null && Clazz.instanceOf (this.peer, java.awt.peer.LightweightPeer) && this.isShowing ()) {
this.parent.repaint (oldX, oldY, oldWidth, oldHeight);
this.repaint ();
}}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "reshapeNativePeer", 
 function (x, y, width, height, op) {
var nativeX = x;
var nativeY = y;
for (var c = this.parent; (c != null) && (Clazz.instanceOf (c.peer, java.awt.peer.LightweightPeer)); c = c.parent) {
nativeX += c.x;
nativeY += c.y;
}
this.peer.setBounds (nativeX, nativeY, width, height, op);
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "notifyNewBounds", 
 function (resized, moved) {
if (this.componentListener != null || (this.eventMask & 1) != 0 || java.awt.Toolkit.enabledOnToolkit (1)) {
if (resized) {
var e =  new java.awt.event.ComponentEvent (this, 101);
java.awt.Toolkit.getEventQueue ().postEvent (e);
}if (moved) {
var e =  new java.awt.event.ComponentEvent (this, 100);
java.awt.Toolkit.getEventQueue ().postEvent (e);
}} else {
if (Clazz.instanceOf (this, java.awt.Container) && (this).countComponents () > 0) {
var enabledOnToolkit = java.awt.Toolkit.enabledOnToolkit (65536);
if (resized) {
(this).createChildHierarchyEvents (1402, 0, enabledOnToolkit);
}if (moved) {
(this).createChildHierarchyEvents (1401, 0, enabledOnToolkit);
}}}}, "~B,~B");
Clazz.defineMethod (c$, "getX", 
function () {
return this.x;
});
Clazz.defineMethod (c$, "getY", 
function () {
return this.y;
});
Clazz.defineMethod (c$, "getWidth", 
function () {
return this.width;
});
Clazz.defineMethod (c$, "getHeight", 
function () {
return this.height;
});
Clazz.defineMethod (c$, "getBounds", 
function (rv) {
if (rv == null) return  new java.awt.Rectangle (this.getX (), this.getY (), this.getWidth (), this.getHeight ());
rv.reshape (this.getX (), this.getY (), this.getWidth (), this.getHeight ());
return rv;
}, "java.awt.Rectangle");
Clazz.defineMethod (c$, "getSize", 
function (rv) {
if (rv == null) {
return  new java.awt.Dimension (this.getWidth (), this.getHeight ());
} else {
rv.setSize (this.getWidth (), this.getHeight ());
return rv;
}}, "java.awt.Dimension");
Clazz.defineMethod (c$, "getLocation", 
function (rv) {
if (rv == null) {
return  new java.awt.Point (this.getX (), this.getY ());
} else {
rv.setLocation (this.getX (), this.getY ());
return rv;
}}, "java.awt.Point");
Clazz.defineMethod (c$, "isOpaque", 
function () {
return true;
});
Clazz.defineMethod (c$, "isLightweight", 
function () {
return false;
});
Clazz.defineMethod (c$, "setPreferredSize", 
function (preferredSize) {
this.setPrefSizeComp (preferredSize);
}, "java.awt.Dimension");
Clazz.defineMethod (c$, "setPrefSizeComp", 
function (preferredSize) {
var old = (this.prefSizeSet ? this.prefSize : null);
this.prefSize = preferredSize;
this.prefSizeSet = (preferredSize != null);
this.firePropertyChangeObject ("preferredSize", old, preferredSize);
}, "java.awt.Dimension");
Clazz.defineMethod (c$, "isPreferredSizeSet", 
function () {
return this.prefSizeSet;
});
Clazz.defineMethod (c$, "getPreferredSize", 
function () {
return this.preferredSize ();
});
Clazz.defineMethod (c$, "preferredSize", 
function () {
return this.prefSizeComp ();
});
Clazz.defineMethod (c$, "prefSizeComp", 
function () {
var dim = this.prefSize;
if (dim == null || !(this.isPreferredSizeSet () || this.isValid ())) {
this.prefSize = this.getMinimumSize ();
dim = this.prefSize;
}return  new java.awt.Dimension (dim);
});
Clazz.defineMethod (c$, "setMinimumSize", 
function (minimumSize) {
var old;
if (this.minSizeSet) {
old = this.minSize;
} else {
old = null;
}this.minSize = minimumSize;
this.minSizeSet = (minimumSize != null);
this.firePropertyChangeObject ("minimumSize", old, minimumSize);
}, "java.awt.Dimension");
Clazz.defineMethod (c$, "isMinimumSizeSet", 
function () {
return this.minSizeSet;
});
Clazz.defineMethod (c$, "getMinimumSize", 
function () {
return this.minimumSize ();
});
Clazz.defineMethod (c$, "minimumSize", 
function () {
var dim = this.minSize;
if (dim == null || !(this.isMinimumSizeSet () || this.isValid ())) {
this.minSize = this.getSize ();
dim = this.minSize;
}return  new java.awt.Dimension (dim);
});
Clazz.defineMethod (c$, "setMaximumSize", 
function (maximumSize) {
var old;
if (this.maxSizeSet) {
old = this.maxSize;
} else {
old = null;
}this.maxSize = maximumSize;
this.maxSizeSet = (maximumSize != null);
this.firePropertyChangeObject ("maximumSize", old, maximumSize);
}, "java.awt.Dimension");
Clazz.defineMethod (c$, "isMaximumSizeSet", 
function () {
return this.maxSizeSet;
});
Clazz.defineMethod (c$, "getMaximumSize", 
function () {
return this.getMaxSizeComp ();
});
Clazz.defineMethod (c$, "getMaxSizeComp", 
function () {
if (this.isMaximumSizeSet ()) {
return  new java.awt.Dimension (this.maxSize);
}return  new java.awt.Dimension (32767, 32767);
});
Clazz.defineMethod (c$, "getAlignmentX", 
function () {
return this.getAlignmentXComp ();
});
Clazz.defineMethod (c$, "getAlignmentXComp", 
function () {
return 0.5;
});
Clazz.defineMethod (c$, "getAlignmentY", 
function () {
return this.getAlignmentYComp ();
});
Clazz.defineMethod (c$, "getAlignmentYComp", 
function () {
return 0.5;
});
Clazz.defineMethod (c$, "getBaseline", 
function (width, height) {
if (width < 0 || height < 0) {
throw  new IllegalArgumentException ("Width and height must be >= 0");
}return -1;
}, "~N,~N");
Clazz.defineMethod (c$, "getBaselineResizeBehavior", 
function () {
return java.awt.Component.BaselineResizeBehavior.OTHER;
});
Clazz.defineMethod (c$, "doLayout", 
function () {
this.layout ();
});
Clazz.defineMethod (c$, "layout", 
function () {
});
Clazz.defineMethod (c$, "validate", 
function () {
this.validateComponent ();
});
Clazz.defineMethod (c$, "validateComponent", 
function () {
{
var peer = this.peer;
var wasValid = this.isValid ();
if (!wasValid && peer != null) {
var newfont = this.getFont ();
var oldfont = this.peerFont;
if (newfont !== oldfont && (oldfont == null || !oldfont.equals (newfont))) {
peer.setFont (newfont);
this.peerFont = newfont;
}peer.layout ();
}this.valid = true;
if (!wasValid) {
this.mixOnValidating ();
}}});
Clazz.defineMethod (c$, "invalidate", 
function () {
this.invalidateComp ();
});
Clazz.defineMethod (c$, "invalidateComp", 
function () {
this.valid = false;
if (!this.isPreferredSizeSet ()) {
this.prefSize = null;
}if (!this.isMinimumSizeSet ()) {
this.minSize = null;
}if (!this.isMaximumSizeSet ()) {
this.maxSize = null;
}if (this.parent != null) {
this.parent.invalidateIfValid ();
}});
Clazz.defineMethod (c$, "invalidateIfValid", 
function () {
if (this.isValid ()) {
this.invalidate ();
}});
Clazz.defineMethod (c$, "getGraphics", 
function () {
var g;
if ((g = (this.parent == null ? null : this.parent.getGraphics ())) != null) g.setFont (this.getFont ());
return g;
});
Clazz.defineMethod (c$, "getTreeLock", 
function () {
return this;
});
Clazz.defineMethod (c$, "getFontMetrics", 
function (font) {
return font.getFontMetrics ();
}, "java.awt.Font");
Clazz.defineMethod (c$, "setCursor", 
function (cursor) {
this.cursor = cursor;
this.updateCursorImmediately ();
}, "java.awt.Cursor");
Clazz.defineMethod (c$, "updateCursorImmediately", 
function () {
swingjs.JSToolkit.setCursor (this.cursor);
});
Clazz.defineMethod (c$, "getCursor", 
function () {
return this.getCursor_NoClientCode ();
});
Clazz.defineMethod (c$, "getCursor_NoClientCode", 
function () {
var cursor = this.cursor;
if (cursor != null) {
return cursor;
}var parent = this.parent;
if (parent != null) {
return parent.getCursor_NoClientCode ();
} else {
return java.awt.Cursor.getPredefinedCursor (0);
}});
Clazz.defineMethod (c$, "isCursorSet", 
function () {
return (this.cursor != null);
});
Clazz.defineMethod (c$, "paint", 
function (g) {
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "update", 
function (g) {
this.paint (g);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "paintAll", 
function (g) {
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "lightweightPaint", 
function (g) {
this.lwPaintComp (g);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "lwPaintComp", 
function (g) {
this.paint (g);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "paintHeavyweightComponents", 
function (g) {
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "repaint", 
function () {
this.repaint (0, 0, 0, this.width, this.height);
});
Clazz.defineMethod (c$, "repaint", 
function (tm) {
this.repaint (tm, 0, 0, this.width, this.height);
}, "~N");
Clazz.defineMethod (c$, "repaint", 
function (x, y, width, height) {
this.repaint (0, x, y, width, height);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "repaint", 
function (tm, x, y, width, height) {
if (this.canPaint ()) {
if (this.peer != null) {
if (this.isVisible () && width > 0 && height > 0) {
var e =  new java.awt.event.PaintEvent (this, 801,  new java.awt.Rectangle (x, y, width, height));
java.awt.Toolkit.getEventQueue ().postEvent (e);
} else {
this.peer.setVisible (false);
}}} else if (this.parent != null) {
var px = this.x + ((x < 0) ? 0 : x);
var py = this.y + ((y < 0) ? 0 : y);
var pwidth = (width > this.width) ? this.width : width;
var pheight = (height > this.height) ? this.height : height;
this.parent.repaint (tm, px, py, pwidth, pheight);
}}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "canPaint", 
function () {
return !(Clazz.instanceOf (this.peer, java.awt.peer.LightweightPeer));
});
Clazz.defineMethod (c$, "print", 
function (g) {
this.paint (g);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "printAll", 
function (g) {
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "printHeavyweightComponents", 
function (g) {
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "imageUpdate", 
function (img, infoflags, x, y, w, h) {
return false;
}, "java.awt.Image,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "createImage", 
function (producer) {
return this.getToolkit ().createImage (producer);
}, "java.awt.image.ImageProducer");
Clazz.defineMethod (c$, "createImage", 
function (width, height) {
return java.awt.Toolkit.getDefaultToolkit ().createImage (null, width, height);
}, "~N,~N");
Clazz.defineMethod (c$, "createVolatileImage", 
function (width, height) {
return null;
}, "~N,~N");
Clazz.defineMethod (c$, "createVolatileImage", 
function (width, height, caps) {
return this.createVolatileImage (width, height);
}, "~N,~N,java.awt.ImageCapabilities");
Clazz.defineMethod (c$, "prepareImage", 
function (image, observer) {
return this.prepareImage (image, -1, -1, observer);
}, "java.awt.Image,java.awt.image.ImageObserver");
Clazz.defineMethod (c$, "prepareImage", 
function (image, width, height, observer) {
return false;
}, "java.awt.Image,~N,~N,java.awt.image.ImageObserver");
Clazz.defineMethod (c$, "checkImage", 
function (image, observer) {
return this.checkImage (image, -1, -1, observer);
}, "java.awt.Image,java.awt.image.ImageObserver");
Clazz.defineMethod (c$, "checkImage", 
function (image, width, height, observer) {
return 0;
}, "java.awt.Image,~N,~N,java.awt.image.ImageObserver");
Clazz.defineMethod (c$, "setIgnoreRepaint", 
function (ignoreRepaint) {
}, "~B");
Clazz.defineMethod (c$, "getIgnoreRepaint", 
function () {
return false;
});
Clazz.defineMethod (c$, "contains", 
function (x, y) {
return this.inside (x, y);
}, "~N,~N");
Clazz.defineMethod (c$, "inside", 
function (x, y) {
return (x >= 0) && (x < this.width) && (y >= 0) && (y < this.height);
}, "~N,~N");
Clazz.defineMethod (c$, "getComponentAt", 
function (x, y) {
return this.locate (x, y);
}, "~N,~N");
Clazz.defineMethod (c$, "locate", 
function (x, y) {
return this.contains (x, y) ? this : null;
}, "~N,~N");
Clazz.defineMethod (c$, "getComponentAt", 
function (p) {
return this.getComponentAt (p.x, p.y);
}, "java.awt.Point");
Clazz.defineMethod (c$, "deliverEvent", 
function (e) {
this.postEvent (e);
}, "java.awt.Event");
Clazz.defineMethod (c$, "dispatchEvent", 
function (e) {
this.dispatchEventImpl (e);
}, "java.awt.AWTEvent");
Clazz.defineMethod (c$, "dispatchEventImpl", 
function (e) {
this.dispatchEventImplComp (e);
}, "java.awt.AWTEvent");
Clazz.defineMethod (c$, "dispatchEventImplComp", 
function (e) {
var id = e.getID ();
java.awt.EventQueue.setCurrentEventAndMostRecentTime (e);
if (!e.focusManagerIsDispatching) {
if (e.isPosted) {
e.isPosted = true;
}}if (!e.isConsumed ()) {
if (Clazz.instanceOf (e, java.awt.event.KeyEvent)) {
if (e.isConsumed ()) {
return;
}}}if (this.areInputMethodsEnabled ()) {
if ((Clazz.instanceOf (e, java.awt.event.InputEvent)) || (Clazz.instanceOf (e, java.awt.event.FocusEvent))) {
}} else {
if (id == 1004) {
}}switch (id) {
case 401:
case 402:
var p = ((Clazz.instanceOf (this, java.awt.Container)) ? this : this.parent);
if (p != null) {
p.preProcessKeyEvent (e);
}break;
case 201:
break;
default:
break;
}
if (this.newEventsOnly) {
if (this.eventEnabled (e)) {
this.processEvent (e);
}} else if (id == 507) {
this.autoProcessMouseWheel (e);
} else if (!(Clazz.instanceOf (e, java.awt.event.MouseEvent) && !this.postsOldMouseEvents ())) {
}if (id == 201 && !e.isConsumed ()) {
}if (!(Clazz.instanceOf (e, java.awt.event.KeyEvent))) {
}}, "java.awt.AWTEvent");
Clazz.defineMethod (c$, "autoProcessMouseWheel", 
function (e) {
}, "java.awt.event.MouseWheelEvent");
Clazz.defineMethod (c$, "dispatchMouseWheelToAncestor", 
function (e) {
var newX;
var newY;
newX = e.getX () + this.getX ();
newY = e.getY () + this.getY ();
var newMWE;
{
var anc = this.getParent ();
while (anc != null && !anc.eventEnabled (e)) {
newX += anc.getX ();
newY += anc.getY ();
if (!(Clazz.instanceOf (anc, java.awt.Window))) {
anc = anc.getParent ();
} else {
break;
}}
if (anc != null && anc.eventEnabled (e)) {
newMWE =  new java.awt.event.MouseWheelEvent (anc, e.getID (), e.getWhen (), e.getModifiers (), newX, newY, e.getXOnScreen (), e.getYOnScreen (), e.getClickCount (), e.isPopupTrigger (), e.getScrollType (), e.getScrollAmount (), e.getWheelRotation ());
(e).copyPrivateDataInto (newMWE);
anc.dispatchEventToSelf (newMWE);
}}return true;
}, "java.awt.event.MouseWheelEvent");
Clazz.defineMethod (c$, "checkWindowClosingException", 
function () {
if (this.windowClosingException != null) {
if (Clazz.instanceOf (this, java.awt.Dialog)) {
(this).interruptBlocking ();
} else {
this.windowClosingException.fillInStackTrace ();
this.windowClosingException.printStackTrace ();
this.windowClosingException = null;
}return true;
}return false;
});
Clazz.defineMethod (c$, "areInputMethodsEnabled", 
function () {
return ((this.eventMask & 4096) != 0) && ((this.eventMask & 8) != 0 || this.keyListener != null);
});
Clazz.defineMethod (c$, "eventEnabled", 
function (e) {
return this.eventTypeEnabled (e.id);
}, "java.awt.AWTEvent");
Clazz.defineMethod (c$, "eventTypeEnabled", 
function (type) {
switch (type) {
case 100:
case 101:
case 102:
case 103:
if ((this.eventMask & 1) != 0 || this.componentListener != null) {
return true;
}break;
case 1004:
case 1005:
if ((this.eventMask & 4) != 0 || this.focusListener != null) {
return true;
}break;
case 401:
case 402:
case 400:
if ((this.eventMask & 8) != 0 || this.keyListener != null) {
return true;
}break;
case 501:
case 502:
case 504:
case 505:
case 500:
if ((this.eventMask & 16) != 0 || this.mouseListener != null) {
return true;
}break;
case 503:
case 506:
if ((this.eventMask & 32) != 0 || this.mouseMotionListener != null) {
return true;
}break;
case 507:
if ((this.eventMask & 131072) != 0 || this.mouseWheelListener != null) {
return true;
}break;
case 1100:
case 1101:
if ((this.eventMask & 2048) != 0 || this.inputMethodListener != null) {
return true;
}break;
case 1400:
if ((this.eventMask & 32768) != 0 || this.hierarchyListener != null) {
return true;
}break;
case 1401:
case 1402:
if ((this.eventMask & 65536) != 0 || this.hierarchyBoundsListener != null) {
return true;
}break;
case 1001:
if ((this.eventMask & 128) != 0) {
return true;
}break;
case 900:
if ((this.eventMask & 1024) != 0) {
return true;
}break;
case 701:
if ((this.eventMask & 512) != 0) {
return true;
}break;
case 601:
if ((this.eventMask & 256) != 0) {
return true;
}break;
default:
break;
}
if (type > 1999) {
return true;
}return false;
}, "~N");
Clazz.defineMethod (c$, "postEvent", 
function (e) {
if (this.handleEvent (e)) {
e.consume ();
return true;
}var parent = this.parent;
var eventx = e.x;
var eventy = e.y;
if (parent != null) {
e.translate (this.x, this.y);
if (parent.postEvent (e)) {
e.consume ();
return true;
}e.x = eventx;
e.y = eventy;
}return false;
}, "java.awt.Event");
Clazz.defineMethod (c$, "addComponentListener", 
function (l) {
if (l == null) {
return;
}this.componentListener = java.awt.AWTEventMulticaster.add (this.componentListener, l);
this.newEventsOnly = true;
}, "java.awt.event.ComponentListener");
Clazz.defineMethod (c$, "removeComponentListener", 
function (l) {
if (l == null) {
return;
}this.componentListener = java.awt.AWTEventMulticaster.remove (this.componentListener, l);
}, "java.awt.event.ComponentListener");
Clazz.defineMethod (c$, "getComponentListeners", 
function () {
return (this.getListeners (java.awt.event.ComponentListener));
});
Clazz.defineMethod (c$, "addFocusListener", 
function (l) {
if (l == null) {
return;
}this.focusListener = java.awt.AWTEventMulticaster.add (this.focusListener, l);
this.newEventsOnly = true;
}, "java.awt.event.FocusListener");
Clazz.defineMethod (c$, "removeFocusListener", 
function (l) {
if (l == null) {
return;
}this.focusListener = java.awt.AWTEventMulticaster.remove (this.focusListener, l);
}, "java.awt.event.FocusListener");
Clazz.defineMethod (c$, "getFocusListeners", 
function () {
return (this.getListeners (java.awt.event.FocusListener));
});
Clazz.defineMethod (c$, "addHierarchyListener", 
function (l) {
}, "java.awt.event.HierarchyListener");
Clazz.defineMethod (c$, "removeHierarchyListener", 
function (l) {
}, "java.awt.event.HierarchyListener");
Clazz.defineMethod (c$, "getHierarchyListeners", 
function () {
return (this.getListeners (java.awt.event.HierarchyListener));
});
Clazz.defineMethod (c$, "addHierarchyBoundsListener", 
function (l) {
if (l == null) {
return;
}var notifyAncestors;
{
notifyAncestors = (this.hierarchyBoundsListener == null && (this.eventMask & 65536) == 0);
this.hierarchyBoundsListener = java.awt.AWTEventMulticaster.add (this.hierarchyBoundsListener, l);
notifyAncestors = (notifyAncestors && this.hierarchyBoundsListener != null);
this.newEventsOnly = true;
}if (notifyAncestors) {
{
this.adjustListeningChildrenOnParent (65536, 1);
}}}, "java.awt.event.HierarchyBoundsListener");
Clazz.defineMethod (c$, "removeHierarchyBoundsListener", 
function (l) {
if (l == null) {
return;
}var notifyAncestors;
{
notifyAncestors = (this.hierarchyBoundsListener != null && (this.eventMask & 65536) == 0);
this.hierarchyBoundsListener = java.awt.AWTEventMulticaster.remove (this.hierarchyBoundsListener, l);
notifyAncestors = (notifyAncestors && this.hierarchyBoundsListener == null);
}if (notifyAncestors) {
{
this.adjustListeningChildrenOnParent (65536, -1);
}}}, "java.awt.event.HierarchyBoundsListener");
Clazz.defineMethod (c$, "numListening", 
function (mask) {
return this.numListeningMask (mask);
}, "~N");
Clazz.defineMethod (c$, "numListeningMask", 
function (mask) {
if ((mask == 32768 && (this.hierarchyListener != null || (this.eventMask & 32768) != 0)) || (mask == 65536 && (this.hierarchyBoundsListener != null || (this.eventMask & 65536) != 0))) {
return 1;
} else {
return 0;
}}, "~N");
Clazz.defineMethod (c$, "countHierarchyMembers", 
function () {
return 1;
});
Clazz.defineMethod (c$, "createHierarchyEvents", 
function (id, changed, changedParent, changeFlags, enabledOnToolkit) {
return this.createHierEventsComp (id, changed, changedParent, changeFlags, enabledOnToolkit);
}, "~N,java.awt.Component,java.awt.Container,~N,~B");
Clazz.defineMethod (c$, "createHierEventsComp", 
function (id, changed, changedParent, changeFlags, enabledOnToolkit) {
switch (id) {
case 1400:
if (this.hierarchyListener != null || (this.eventMask & 32768) != 0 || enabledOnToolkit) {
var e =  new java.awt.event.HierarchyEvent (this, id, changed, changedParent, changeFlags);
this.dispatchEvent (e);
return 1;
}break;
case 1401:
case 1402:
if (this.hierarchyBoundsListener != null || (this.eventMask & 65536) != 0 || enabledOnToolkit) {
var e =  new java.awt.event.HierarchyEvent (this, id, changed, changedParent);
this.dispatchEvent (e);
return 1;
}break;
default:
break;
}
return 0;
}, "~N,java.awt.Component,java.awt.Container,~N,~B");
Clazz.defineMethod (c$, "getHierarchyBoundsListeners", 
function () {
return (this.getListeners (java.awt.event.HierarchyBoundsListener));
});
Clazz.defineMethod (c$, "adjustListeningChildrenOnParent", 
function (mask, num) {
if (this.parent != null) {
this.parent.adjustListeningChildren (mask, num);
}}, "~N,~N");
Clazz.defineMethod (c$, "addKeyListener", 
function (l) {
if (l == null) {
return;
}this.keyListener = java.awt.AWTEventMulticaster.add (this.keyListener, l);
this.newEventsOnly = true;
}, "java.awt.event.KeyListener");
Clazz.defineMethod (c$, "removeKeyListener", 
function (l) {
if (l == null) {
return;
}this.keyListener = java.awt.AWTEventMulticaster.remove (this.keyListener, l);
}, "java.awt.event.KeyListener");
Clazz.defineMethod (c$, "getKeyListeners", 
function () {
return (this.getListeners (java.awt.event.KeyListener));
});
Clazz.defineMethod (c$, "addMouseListener", 
function (l) {
if (l == null) {
return;
}this.mouseListener = java.awt.AWTEventMulticaster.add (this.mouseListener, l);
this.newEventsOnly = true;
}, "java.awt.event.MouseListener");
Clazz.defineMethod (c$, "removeMouseListener", 
function (l) {
if (l == null) {
return;
}this.mouseListener = java.awt.AWTEventMulticaster.remove (this.mouseListener, l);
}, "java.awt.event.MouseListener");
Clazz.defineMethod (c$, "getMouseListeners", 
function () {
return (this.getListeners (java.awt.event.MouseListener));
});
Clazz.defineMethod (c$, "addMouseMotionListener", 
function (l) {
if (l == null) {
return;
}this.mouseMotionListener = java.awt.AWTEventMulticaster.add (this.mouseMotionListener, l);
this.newEventsOnly = true;
}, "java.awt.event.MouseMotionListener");
Clazz.defineMethod (c$, "removeMouseMotionListener", 
function (l) {
if (l == null) {
return;
}this.mouseMotionListener = java.awt.AWTEventMulticaster.remove (this.mouseMotionListener, l);
}, "java.awt.event.MouseMotionListener");
Clazz.defineMethod (c$, "getMouseMotionListeners", 
function () {
return (this.getListeners (java.awt.event.MouseMotionListener));
});
Clazz.defineMethod (c$, "addMouseWheelListener", 
function (l) {
if (l == null) {
return;
}this.mouseWheelListener = java.awt.AWTEventMulticaster.add (this.mouseWheelListener, l);
this.newEventsOnly = true;
}, "java.awt.event.MouseWheelListener");
Clazz.defineMethod (c$, "removeMouseWheelListener", 
function (l) {
if (l == null) {
return;
}this.mouseWheelListener = java.awt.AWTEventMulticaster.remove (this.mouseWheelListener, l);
}, "java.awt.event.MouseWheelListener");
Clazz.defineMethod (c$, "getMouseWheelListeners", 
function () {
return (this.getListeners (java.awt.event.MouseWheelListener));
});
Clazz.defineMethod (c$, "addInputMethodListener", 
function (l) {
if (l == null) {
return;
}this.inputMethodListener = java.awt.AWTEventMulticaster.add (this.inputMethodListener, l);
this.newEventsOnly = true;
}, "java.awt.event.InputMethodListener");
Clazz.defineMethod (c$, "removeInputMethodListener", 
function (l) {
if (l == null) {
return;
}this.inputMethodListener = java.awt.AWTEventMulticaster.remove (this.inputMethodListener, l);
}, "java.awt.event.InputMethodListener");
Clazz.defineMethod (c$, "getInputMethodListeners", 
function () {
return (this.getListeners (java.awt.event.InputMethodListener));
});
Clazz.defineMethod (c$, "getListeners", 
function (listenerType) {
return this.getListenersComp (listenerType);
}, "Class");
Clazz.defineMethod (c$, "getListenersComp", 
function (listenerType) {
var l = null;
if (listenerType === java.awt.event.ComponentListener) {
l = this.componentListener;
} else if (listenerType === java.awt.event.FocusListener) {
l = this.focusListener;
} else if (listenerType === java.awt.event.HierarchyListener) {
l = this.hierarchyListener;
} else if (listenerType === java.awt.event.HierarchyBoundsListener) {
l = this.hierarchyBoundsListener;
} else if (listenerType === java.awt.event.KeyListener) {
l = this.keyListener;
} else if (listenerType === java.awt.event.MouseListener) {
l = this.mouseListener;
} else if (listenerType === java.awt.event.MouseMotionListener) {
l = this.mouseMotionListener;
} else if (listenerType === java.awt.event.MouseWheelListener) {
l = this.mouseWheelListener;
} else if (listenerType === java.awt.event.InputMethodListener) {
l = this.inputMethodListener;
} else if (listenerType === java.beans.PropertyChangeListener) {
return this.getPropertyChangeListeners ();
}return java.awt.AWTEventMulticaster.getListeners (l, listenerType);
}, "Class");
Clazz.defineMethod (c$, "enableEvents", 
function (eventsToEnable) {
var notifyAncestors = 0;
{
if ((eventsToEnable & 32768) != 0 && this.hierarchyListener == null && (this.eventMask & 32768) == 0) {
notifyAncestors |= 32768;
}if ((eventsToEnable & 65536) != 0 && this.hierarchyBoundsListener == null && (this.eventMask & 65536) == 0) {
notifyAncestors |= 65536;
}this.eventMask |= eventsToEnable;
this.newEventsOnly = true;
}if (this.parent != null && Clazz.instanceOf (this.peer, java.awt.peer.LightweightPeer)) {
this.parent.proxyEnableEvents (this.eventMask);
}if (notifyAncestors != 0) {
{
this.adjustListeningChildrenOnParent (notifyAncestors, 1);
}}}, "~N");
Clazz.defineMethod (c$, "disableEvents", 
function (eventsToDisable) {
var notifyAncestors = 0;
{
if ((eventsToDisable & 32768) != 0 && this.hierarchyListener == null && (this.eventMask & 32768) != 0) {
notifyAncestors |= 32768;
}if ((eventsToDisable & 65536) != 0 && this.hierarchyBoundsListener == null && (this.eventMask & 65536) != 0) {
notifyAncestors |= 65536;
}this.eventMask &= ~eventsToDisable;
}if (notifyAncestors != 0) {
{
this.adjustListeningChildrenOnParent (notifyAncestors, -1);
}}}, "~N");
Clazz.defineMethod (c$, "checkCoalescing", 
 function () {
if (this.getClass ().getClassLoader () == null) {
return false;
}var clazz = this.getClass ();
{
var value = java.awt.Component.coalesceMap.get (clazz);
if (value != null) {
return value.booleanValue ();
}var enabled = Boolean.$valueOf (swingjs.JSToolkit.checkClassMethod (this, "coalesceEvents", "\\java.awt.AWTEvent\\java.awt.AWTEvent"));
java.awt.Component.coalesceMap.put (clazz, enabled);
return enabled.booleanValue ();
}});
Clazz.defineMethod (c$, "isCoalescingEnabled", 
function () {
return this.coalescingEnabled;
});
Clazz.defineMethod (c$, "coalesceEvents", 
function (existingEvent, newEvent) {
return null;
}, "java.awt.AWTEvent,java.awt.AWTEvent");
Clazz.defineMethod (c$, "processEvent", 
function (e) {
this.processEventComp (e);
}, "java.awt.AWTEvent");
Clazz.defineMethod (c$, "processEventComp", 
function (e) {
if (Clazz.instanceOf (e, java.awt.event.FocusEvent)) {
this.processFocusEvent (e);
} else if (Clazz.instanceOf (e, java.awt.event.MouseEvent)) {
switch (e.getID ()) {
case 501:
case 502:
case 500:
case 504:
case 505:
this.processMouseEvent (e);
break;
case 503:
case 506:
this.processMouseMotionEvent (e);
break;
case 507:
this.processMouseWheelEvent (e);
break;
}
} else if (Clazz.instanceOf (e, java.awt.event.KeyEvent)) {
this.processKeyEvent (e);
} else if (Clazz.instanceOf (e, java.awt.event.ComponentEvent)) {
this.processComponentEvent (e);
} else if (Clazz.instanceOf (e, java.awt.event.InputMethodEvent)) {
this.processInputMethodEvent (e);
} else if (Clazz.instanceOf (e, java.awt.event.HierarchyEvent)) {
switch (e.getID ()) {
case 1400:
this.processHierarchyEvent (e);
break;
case 1401:
case 1402:
this.processHierarchyBoundsEvent (e);
break;
}
}}, "java.awt.AWTEvent");
Clazz.defineMethod (c$, "processComponentEvent", 
function (e) {
var listener = this.componentListener;
if (listener != null) {
var id = e.getID ();
switch (id) {
case 101:
listener.componentResized (e);
break;
case 100:
listener.componentMoved (e);
break;
case 102:
listener.componentShown (e);
break;
case 103:
listener.componentHidden (e);
break;
}
}}, "java.awt.event.ComponentEvent");
Clazz.defineMethod (c$, "processFocusEvent", 
function (e) {
var listener = this.focusListener;
if (listener != null) {
var id = e.getID ();
switch (id) {
case 1004:
listener.focusGained (e);
break;
case 1005:
listener.focusLost (e);
break;
}
}}, "java.awt.event.FocusEvent");
Clazz.defineMethod (c$, "processKeyEvent", 
function (e) {
var listener = this.keyListener;
if (listener != null) {
var id = e.getID ();
switch (id) {
case 400:
listener.keyTyped (e);
break;
case 401:
listener.keyPressed (e);
break;
case 402:
listener.keyReleased (e);
break;
}
}}, "java.awt.event.KeyEvent");
Clazz.defineMethod (c$, "processMouseEvent", 
function (e) {
var listener = this.mouseListener;
if (listener != null) {
var id = e.getID ();
switch (id) {
case 501:
listener.mousePressed (e);
break;
case 502:
listener.mouseReleased (e);
break;
case 500:
listener.mouseClicked (e);
break;
case 505:
listener.mouseExited (e);
break;
case 504:
listener.mouseEntered (e);
break;
}
}}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "processMouseMotionEvent", 
function (e) {
var listener = this.mouseMotionListener;
if (listener != null) {
var id = e.getID ();
switch (id) {
case 503:
listener.mouseMoved (e);
break;
case 506:
listener.mouseDragged (e);
break;
}
}}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "processMouseWheelEvent", 
function (e) {
var listener = this.mouseWheelListener;
if (listener != null) {
var id = e.getID ();
switch (id) {
case 507:
listener.mouseWheelMoved (e);
break;
}
}}, "java.awt.event.MouseWheelEvent");
Clazz.defineMethod (c$, "postsOldMouseEvents", 
function () {
return false;
});
Clazz.defineMethod (c$, "processInputMethodEvent", 
function (e) {
var listener = this.inputMethodListener;
if (listener != null) {
var id = e.getID ();
switch (id) {
case 1100:
listener.inputMethodTextChanged (e);
break;
case 1101:
listener.caretPositionChanged (e);
break;
}
}}, "java.awt.event.InputMethodEvent");
Clazz.defineMethod (c$, "processHierarchyEvent", 
function (e) {
var listener = this.hierarchyListener;
if (listener != null) {
var id = e.getID ();
switch (id) {
case 1400:
listener.hierarchyChanged (e);
break;
}
}}, "java.awt.event.HierarchyEvent");
Clazz.defineMethod (c$, "processHierarchyBoundsEvent", 
function (e) {
var listener = this.hierarchyBoundsListener;
if (listener != null) {
var id = e.getID ();
switch (id) {
case 1401:
listener.ancestorMoved (e);
break;
case 1402:
listener.ancestorResized (e);
break;
}
}}, "java.awt.event.HierarchyEvent");
Clazz.defineMethod (c$, "handleEvent", 
function (evt) {
switch (evt.id) {
case 504:
return this.mouseEnter (evt, evt.x, evt.y);
case 505:
return this.mouseExit (evt, evt.x, evt.y);
case 503:
return this.mouseMove (evt, evt.x, evt.y);
case 501:
return this.mouseDown (evt, evt.x, evt.y);
case 506:
return this.mouseDrag (evt, evt.x, evt.y);
case 502:
return this.mouseUp (evt, evt.x, evt.y);
case 401:
case 403:
return this.keyDown (evt, evt.key);
case 402:
case 404:
return this.keyUp (evt, evt.key);
case 1001:
return this.action (evt, evt.arg);
case 1004:
return this.gotFocus (evt, evt.arg);
case 1005:
return this.lostFocus (evt, evt.arg);
}
return false;
}, "java.awt.Event");
Clazz.defineMethod (c$, "mouseDown", 
function (evt, x, y) {
return false;
}, "java.awt.Event,~N,~N");
Clazz.defineMethod (c$, "mouseDrag", 
function (evt, x, y) {
return false;
}, "java.awt.Event,~N,~N");
Clazz.defineMethod (c$, "mouseUp", 
function (evt, x, y) {
return false;
}, "java.awt.Event,~N,~N");
Clazz.defineMethod (c$, "mouseMove", 
function (evt, x, y) {
return false;
}, "java.awt.Event,~N,~N");
Clazz.defineMethod (c$, "mouseEnter", 
function (evt, x, y) {
return false;
}, "java.awt.Event,~N,~N");
Clazz.defineMethod (c$, "mouseExit", 
function (evt, x, y) {
return false;
}, "java.awt.Event,~N,~N");
Clazz.defineMethod (c$, "keyDown", 
function (evt, key) {
return false;
}, "java.awt.Event,~N");
Clazz.defineMethod (c$, "keyUp", 
function (evt, key) {
return false;
}, "java.awt.Event,~N");
Clazz.defineMethod (c$, "action", 
function (evt, what) {
return false;
}, "java.awt.Event,~O");
Clazz.defineMethod (c$, "addNotify", 
function () {
this.addNotifyComp ();
});
Clazz.defineMethod (c$, "addNotifyComp", 
function () {
{
var peer = this.getOrCreatePeer ();
if (this.parent != null) {
var mask = 0;
if ((this.mouseListener != null) || ((this.eventMask & 16) != 0)) {
mask |= 16;
}if ((this.mouseMotionListener != null) || ((this.eventMask & 32) != 0)) {
mask |= 32;
}if ((this.mouseWheelListener != null) || ((this.eventMask & 131072) != 0)) {
mask |= 131072;
}if (this.focusListener != null || (this.eventMask & 4) != 0) {
mask |= 4;
}if (this.keyListener != null || (this.eventMask & 8) != 0) {
mask |= 8;
}if (mask != 0) {
this.parent.proxyEnableEvents (mask);
}}this.invalidate ();
this.peerFont = this.getFont ();
if (this.getContainer () != null && !this.isAddNotifyComplete) {
this.getContainer ().increaseComponentCount (this);
}if (this.parent != null && this.parent.peer != null) {
var parentContPeer = this.parent.peer;
if (Clazz.instanceOf (parentContPeer, java.awt.peer.LightweightPeer) && !(Clazz.instanceOf (peer, java.awt.peer.LightweightPeer))) {
var hwParent = this.getNativeContainer ();
if (hwParent != null && hwParent.peer != null) {
parentContPeer = hwParent.peer;
}}}this.isAddNotifyComplete = true;
if (this.hierarchyListener != null || (this.eventMask & 32768) != 0 || java.awt.Toolkit.enabledOnToolkit (32768)) {
var e =  new java.awt.event.HierarchyEvent (this, 1400, this, this.parent, 2 | ((this.isRecursivelyVisible ()) ? 4 : 0));
this.dispatchEvent (e);
}}});
Clazz.defineMethod (c$, "getNativeContainer", 
function () {
var p = this.parent;
while (p != null && Clazz.instanceOf (p.peer, java.awt.peer.LightweightPeer)) {
p = p.getParent ();
}
return p;
});
Clazz.defineMethod (c$, "removeNotify", 
function () {
this.removeNotifyComp ();
});
Clazz.defineMethod (c$, "removeNotifyComp", 
function () {
{
if (this.getContainer () != null && this.isAddNotifyComplete) {
this.getContainer ().decreaseComponentCount (this);
}var p = this.getOrCreatePeer ();
if (p != null) {
if (this.visible) {
p.setVisible (false);
}java.awt.Toolkit.getEventQueue ().removeSourceEvents (this, false);
p.dispose ();
this.isAddNotifyComplete = false;
}if (this.hierarchyListener != null || (this.eventMask & 32768) != 0 || java.awt.Toolkit.enabledOnToolkit (32768)) {
var e =  new java.awt.event.HierarchyEvent (this, 1400, this, this.parent, 2 | ((this.isRecursivelyVisible ()) ? 4 : 0));
this.dispatchEvent (e);
}}});
Clazz.defineMethod (c$, "gotFocus", 
function (evt, what) {
return false;
}, "java.awt.Event,~O");
Clazz.defineMethod (c$, "lostFocus", 
function (evt, what) {
return false;
}, "java.awt.Event,~O");
Clazz.defineMethod (c$, "isFocusTraversable", 
function () {
if (this.$isFocusTraversableOverridden == 0) {
this.$isFocusTraversableOverridden = 1;
}return this.focusable;
});
Clazz.defineMethod (c$, "isFocusable", 
function () {
return this.isFocusTraversable ();
});
Clazz.defineMethod (c$, "setFocusable", 
function (focusable) {
var oldFocusable;
{
oldFocusable = this.focusable;
this.focusable = focusable;
}this.$isFocusTraversableOverridden = 2;
this.firePropertyChangeObject ("focusable", Boolean.$valueOf (oldFocusable), Boolean.$valueOf (focusable));
}, "~B");
Clazz.defineMethod (c$, "isFocusTraversableOverridden", 
function () {
return (this.$isFocusTraversableOverridden != 1);
});
Clazz.defineMethod (c$, "getFocusTraversalKeysEnabled", 
function () {
return this.focusTraversalKeysEnabled;
});
Clazz.defineMethod (c$, "requestFocus", 
function () {
swingjs.JSToolkit.requestFocus (this);
});
Clazz.defineMethod (c$, "requestFocus", 
function (temporary) {
return swingjs.JSToolkit.requestFocus (this);
}, "~B");
Clazz.defineMethod (c$, "requestFocusInWindow", 
function () {
return swingjs.JSToolkit.requestFocus (this);
});
Clazz.defineMethod (c$, "requestFocusInWindow", 
function (temporary) {
return swingjs.JSToolkit.requestFocus (this);
}, "~B");
Clazz.defineMethod (c$, "getFocusCycleRootAncestor", 
function () {
var rootAncestor = this.parent;
while (rootAncestor != null && !rootAncestor.isFocusCycleRoot ()) {
rootAncestor = rootAncestor.parent;
}
return rootAncestor;
});
Clazz.defineMethod (c$, "isFocusCycleRoot", 
function (container) {
return this.isFocusCycleRootComp (container);
}, "java.awt.Container");
Clazz.defineMethod (c$, "isFocusCycleRootComp", 
function (container) {
var rootAncestor = this.getFocusCycleRootAncestor ();
return (rootAncestor === container);
}, "java.awt.Container");
Clazz.defineMethod (c$, "hasFocus", 
function () {
return swingjs.JSToolkit.hasFocus (this);
});
Clazz.defineMethod (c$, "isFocusOwner", 
function () {
return this.hasFocus ();
});
Clazz.defineMethod (c$, "setAutoFocusTransferOnDisposal", 
function (value) {
this.autoFocusTransferOnDisposal = value;
}, "~B");
Clazz.defineMethod (c$, "isAutoFocusTransferOnDisposal", 
function () {
return this.autoFocusTransferOnDisposal;
});
Clazz.defineMethod (c$, "paramString", 
function () {
return this.paramStringComp ();
});
Clazz.defineMethod (c$, "paramStringComp", 
function () {
var thisName = this.getName ();
var str = (thisName != null ? thisName : "");
if (!this.isValid ()) {
str += ",invalid";
}if (!this.visible) {
str += ",hidden";
}if (!this.enabled) {
str += ",disabled";
}str += ",parent:" + (this.parent == null ? null : this.parent.getName ()) + "," + this.x + "," + this.y + "," + this.width + "x" + this.height;
return str;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getClass ().getName () + "[" + this.paramString () + "]";
});
Clazz.defineMethod (c$, "addPropertyChangeListener", 
function (listener) {
this.addPropChangeListenerComp (listener);
}, "java.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "addPropChangeListenerComp", 
function (listener) {
{
if (listener == null) {
return;
}if (this.changeSupport == null) {
this.changeSupport =  new java.beans.PropertyChangeSupport (this);
}this.changeSupport.addPropertyChangeListener1 (listener);
}}, "java.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "removePropertyChangeListener", 
function (listener) {
{
if (listener == null || this.changeSupport == null) {
return;
}this.changeSupport.removePropertyChangeListener (listener);
}}, "java.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "getPropertyChangeListeners", 
function () {
{
if (this.changeSupport == null) {
return  new Array (0);
}return this.changeSupport.getPropertyChangeListeners ();
}});
Clazz.defineMethod (c$, "addPropertyChangeListener", 
function (propertyName, listener) {
this.addPropChangeListComp (propertyName, listener);
}, "~S,java.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "addPropChangeListComp", 
function (propertyName, listener) {
{
if (arguments.length == 1) {
addPropertyChangeListener1(propertyName); return; }
}{
if (listener == null) {
return;
}if (this.changeSupport == null) {
this.changeSupport =  new java.beans.PropertyChangeSupport (this);
}this.changeSupport.addPropertyChangeListener2 (propertyName, listener);
}}, "~S,java.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "removePropertyChangeListener", 
function (propertyName, listener) {
{
if (listener == null || this.changeSupport == null) {
return;
}this.changeSupport.removePropertyChangeListener (propertyName, listener);
}}, "~S,java.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "getPropertyChangeListeners", 
function (propertyName) {
{
if (this.changeSupport == null) {
return  new Array (0);
}return this.changeSupport.getPropertyChangeListeners (propertyName);
}}, "~S");
Clazz.defineMethod (c$, "firePropertyChange", 
function (propertyName, oldValue, newValue) {
this.firePropertyChangeObject (propertyName, oldValue, newValue);
}, "~S,~O,~O");
Clazz.defineMethod (c$, "firePropertyChangeObject", 
function (propertyName, oldValue, newValue) {
var changeSupport;
{
changeSupport = this.changeSupport;
}if (changeSupport == null || (oldValue != null && newValue != null && oldValue.equals (newValue))) {
return;
}changeSupport.firePropertyChange (propertyName, oldValue, newValue);
}, "~S,~O,~O");
Clazz.defineMethod (c$, "firePropertyChange", 
function (propertyName, oldValue, newValue) {
this.firePropertyChangeBool (propertyName, oldValue, newValue);
}, "~S,~B,~B");
Clazz.defineMethod (c$, "firePropertyChangeBool", 
function (propertyName, oldValue, newValue) {
var changeSupport = this.changeSupport;
if (changeSupport == null || oldValue == newValue) {
return;
}changeSupport.firePropertyChange (propertyName, Boolean.$valueOf (oldValue), Boolean.$valueOf (newValue));
}, "~S,~B,~B");
Clazz.defineMethod (c$, "firePropertyChange", 
function (propertyName, oldValue, newValue) {
this.firePropertyChangeInt (propertyName, oldValue, newValue);
}, "~S,~N,~N");
Clazz.defineMethod (c$, "firePropertyChangeInt", 
function (propertyName, oldValue, newValue) {
var changeSupport = this.changeSupport;
if (changeSupport == null || oldValue == newValue) {
return;
}changeSupport.firePropertyChange (propertyName, Integer.$valueOf (oldValue), Integer.$valueOf (newValue));
}, "~S,~N,~N");
Clazz.defineMethod (c$, "firePropertyChange", 
function (propertyName, oldValue, newValue) {
this.firePropertyChangeChar (propertyName, oldValue, newValue);
}, "~S,~S,~S");
Clazz.defineMethod (c$, "firePropertyChangeChar", 
function (propertyName, oldValue, newValue) {
if (this.changeSupport == null || oldValue == newValue) {
return;
}this.firePropertyChangeObject (propertyName,  new Character (oldValue),  new Character (newValue));
}, "~S,~S,~S");
Clazz.defineMethod (c$, "firePropertyChangeShort", 
function (propertyName, oldValue, newValue) {
if (this.changeSupport == null || oldValue == newValue) {
return;
}this.firePropertyChangeObject (propertyName, Short.$valueOf (oldValue), Short.$valueOf (newValue));
}, "~S,~N,~N");
Clazz.defineMethod (c$, "firePropertyChangeLong", 
function (propertyName, oldValue, newValue) {
if (this.changeSupport == null || oldValue == newValue) {
return;
}this.firePropertyChangeObject (propertyName, Long.$valueOf (oldValue), Long.$valueOf (newValue));
}, "~S,~N,~N");
Clazz.defineMethod (c$, "firePropertyChangeFloat", 
function (propertyName, oldValue, newValue) {
if (this.changeSupport == null || oldValue == newValue) {
return;
}this.firePropertyChangeObject (propertyName, Float.$valueOf (oldValue), Float.$valueOf (newValue));
}, "~S,~N,~N");
Clazz.defineMethod (c$, "firePropertyChangeDouble", 
function (propertyName, oldValue, newValue) {
if (this.changeSupport == null || oldValue == newValue) {
return;
}this.firePropertyChangeObject (propertyName, Double.$valueOf (oldValue), Double.$valueOf (newValue));
}, "~S,~N,~N");
Clazz.defineMethod (c$, "setComponentOrientation", 
function (o) {
var oldValue = this.componentOrientation;
this.componentOrientation = o;
this.firePropertyChangeObject ("componentOrientation", oldValue, o);
this.invalidateIfValid ();
}, "java.awt.ComponentOrientation");
Clazz.defineMethod (c$, "getComponentOrientation", 
function () {
return this.componentOrientation;
});
Clazz.defineMethod (c$, "applyComponentOrientation", 
function (orientation) {
this.applyCompOrientComp (orientation);
}, "java.awt.ComponentOrientation");
Clazz.defineMethod (c$, "applyCompOrientComp", 
function (orientation) {
if (orientation == null) {
throw  new NullPointerException ();
}this.setComponentOrientation (orientation);
}, "java.awt.ComponentOrientation");
Clazz.defineMethod (c$, "canBeFocusOwner", 
function () {
if (this.isEnabled () && this.isDisplayable () && this.isVisible () && this.isFocusable ()) {
return true;
}return false;
});
Clazz.defineMethod (c$, "canBeFocusOwnerRecursively", 
function () {
if (!this.canBeFocusOwner ()) {
return false;
}if (this.parent != null) {
return this.parent.canContainFocusOwner (this);
}return true;
});
Clazz.defineMethod (c$, "relocateComponent", 
function () {
});
Clazz.defineMethod (c$, "getContainingWindow", 
function () {
return sun.awt.SunToolkit.getContainingWindow (this);
});
c$.isInstanceOf = Clazz.defineMethod (c$, "isInstanceOf", 
function (obj, className) {
if (obj == null) return false;
if (className == null) return false;
var cls = obj.getClass ();
while (cls != null) {
if (cls.getName ().equals (className)) {
return true;
}cls = cls.getSuperclass ();
}
return false;
}, "~O,~S");
Clazz.defineMethod (c$, "areBoundsValid", 
function () {
var cont = this.getContainer ();
return cont == null || cont.isValid () || cont.getLayout () == null;
});
Clazz.defineMethod (c$, "getLocationOnWindow", 
function () {
var curLocation = this.getLocation ();
for (var parent = this.getContainer (); parent != null && !(Clazz.instanceOf (parent, java.awt.Window)); parent = parent.getContainer ()) {
curLocation.x += parent.getX ();
curLocation.y += parent.getY ();
}
return curLocation;
});
Clazz.defineMethod (c$, "getSiblingIndexAbove", 
function () {
var parent = this.getContainer ();
if (parent == null) {
return -1;
}var nextAbove = parent.getComponentZOrder (this) - 1;
return nextAbove < 0 ? -1 : nextAbove;
});
Clazz.defineMethod (c$, "getSiblingIndexBelow", 
function () {
var parent = this.getContainer ();
if (parent == null) {
return -1;
}var nextBelow = parent.getComponentZOrder (this) + 1;
return nextBelow >= parent.getComponentCount () ? -1 : nextBelow;
});
Clazz.defineMethod (c$, "mixOnShowing", 
function () {
});
Clazz.defineMethod (c$, "mixOnHiding", 
function (isLightweight) {
}, "~B");
Clazz.defineMethod (c$, "mixOnReshaping", 
function () {
swingjs.JSToolkit.taintUI (this);
});
Clazz.defineMethod (c$, "mixOnZOrderChanging", 
function (oldZorder, newZorder) {
}, "~N,~N");
Clazz.defineMethod (c$, "mixOnValidating", 
function () {
});
c$.doesClassImplement = Clazz.defineMethod (c$, "doesClassImplement", 
 function (cls, interfaceName) {
if (cls == null) return false;
for (var c, $c = 0, $$c = cls.getInterfaces (); $c < $$c.length && ((c = $$c[$c]) || true); $c++) {
if (c.getName ().equals (interfaceName)) {
return true;
}}
return java.awt.Component.doesClassImplement (cls.getSuperclass (), interfaceName);
}, "Class,~S");
c$.doesImplement = Clazz.defineMethod (c$, "doesImplement", 
function (obj, interfaceName) {
if (obj == null) return false;
if (interfaceName == null) return false;
return java.awt.Component.doesClassImplement (obj.getClass (), interfaceName);
}, "~O,~S");
Clazz.pu$h(c$);
c$ = Clazz.declareType (java.awt.Component, "BaselineResizeBehavior", Enum);
Clazz.defineEnumConstant (c$, "CONSTANT_ASCENT", 0, []);
Clazz.defineEnumConstant (c$, "CONSTANT_DESCENT", 1, []);
Clazz.defineEnumConstant (c$, "CENTER_OFFSET", 2, []);
Clazz.defineEnumConstant (c$, "OTHER", 3, []);
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.declareType (java.awt.Component, "AWTTreeLock");
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"FOCUS_TRAVERSABLE_UNKNOWN", 0,
"FOCUS_TRAVERSABLE_DEFAULT", 1,
"FOCUS_TRAVERSABLE_SET", 2,
"actionListenerK", "actionL",
"adjustmentListenerK", "adjustmentL",
"componentListenerK", "componentL",
"containerListenerK", "containerL",
"focusListenerK", "focusL",
"itemListenerK", "itemL",
"keyListenerK", "keyL",
"mouseListenerK", "mouseL",
"mouseMotionListenerK", "mouseMotionL",
"mouseWheelListenerK", "mouseWheelL",
"textListenerK", "textL",
"ownedWindowK", "ownedL",
"windowListenerK", "windowL",
"inputMethodListenerK", "inputMethodL",
"hierarchyListenerK", "hierarchyL",
"hierarchyBoundsListenerK", "hierarchyBoundsL",
"windowStateListenerK", "windowStateL",
"windowFocusListenerK", "windowFocusL",
"isInc", false,
"incRate", 0,
"TOP_ALIGNMENT", 0.0,
"CENTER_ALIGNMENT", 0.5,
"BOTTOM_ALIGNMENT", 1.0,
"LEFT_ALIGNMENT", 0.0,
"RIGHT_ALIGNMENT", 1.0);
c$.coalesceMap = c$.prototype.coalesceMap =  new java.util.HashMap ();
});
