Clazz.declarePackage ("java.awt");
Clazz.load (["java.awt.Container", "java.util.Vector", "java.awt.Color"], ["java.awt.FocusManager", "$.Window"], ["java.lang.IllegalArgumentException", "java.util.ArrayList", "$.Arrays", "java.applet.Applet", "java.awt.AWTEventMulticaster", "$.BorderLayout", "$.ComponentOrientation", "$.Cursor", "$.GraphicsEnvironment", "$.Point", "$.Toolkit", "java.awt.event.WindowEvent", "$.WindowFocusListener", "$.WindowListener", "$.WindowStateListener", "java.util.Locale", "$.ResourceBundle", "javax.swing.JComponent", "$.RootPaneContainer", "sun.awt.AppContext", "swingjs.JSToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.warningString = null;
this.icons = null;
this.temporaryLostComponent = null;
this.syncLWRequests = false;
this.beforeFirstShow = true;
this.state = 0;
this.alwaysOnTop = false;
this.ownedWindowList = null;
this.showWithParent = false;
this.modalBlocker = null;
this.modalExclusionType = null;
this.windowListener = null;
this.windowStateListener = null;
this.windowFocusListener = null;
this.focusableWindowState = true;
this.isInShow = false;
this.opacity = 1.0;
this.shape = null;
this.isTrayIconWindow = false;
this.opaque = true;
Clazz.instantialize (this, arguments);
}, java.awt, "Window", java.awt.Container);
Clazz.prepareFields (c$, function () {
this.ownedWindowList =  new java.util.Vector ();
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.awt.Window, []);
this.initWinGC (null, null);
});
Clazz.makeConstructor (c$, 
function (gc) {
Clazz.superConstructor (this, java.awt.Window, []);
this.initWinGC (null, gc);
}, "java.awt.GraphicsConfiguration");
Clazz.makeConstructor (c$, 
function (owner) {
Clazz.superConstructor (this, java.awt.Window, []);
this.initWinGC (owner, null);
}, "java.awt.Window");
Clazz.makeConstructor (c$, 
function (owner, gc) {
Clazz.superConstructor (this, java.awt.Window, []);
this.initWinGC (owner, gc);
}, "java.awt.Window,java.awt.GraphicsConfiguration");
Clazz.defineMethod (c$, "initWinGC", 
function (owner, gc) {
this.setAppContext ();
this.parent = owner;
if (owner != null) owner.addOwnedWindow (this);
this.syncLWRequests = java.awt.Window.systemSyncLWRequests;
this.addToWindowList ();
this.cursor = java.awt.Cursor.getPredefinedCursor (0);
this.visible = false;
this.setLayout ( new java.awt.BorderLayout ());
this.modalExclusionType = java.awt.Dialog.ModalExclusionType.NO_EXCLUDE;
}, "java.awt.Window,java.awt.GraphicsConfiguration");
Clazz.overrideMethod (c$, "constructComponentName", 
function () {
{
return "win" + java.awt.Window.nameCounter++;
}});
Clazz.defineMethod (c$, "getIconImages", 
function () {
var icons = this.icons;
if (icons == null || icons.size () == 0) {
return  new java.util.ArrayList ();
}return  new java.util.ArrayList (icons);
});
Clazz.defineMethod (c$, "setIconImages", 
function (icons) {
this.icons = (icons == null) ?  new java.util.ArrayList () :  new java.util.ArrayList (icons);
this.firePropertyChangeObject ("iconImage", null, null);
}, "java.util.List");
Clazz.defineMethod (c$, "setIconImage", 
function (image) {
var imageList =  new java.util.ArrayList ();
if (image != null) {
imageList.add (image);
}this.setIconImages (imageList);
}, "java.awt.Image");
Clazz.defineMethod (c$, "addNotify", 
function () {
var parent = this.parent;
if (parent != null && parent.getPeer () == null) parent.addNotify ();
this.getOrCreatePeer ();
swingjs.JSToolkit.getAppletViewer ().addWindow (this);
Clazz.superCall (this, java.awt.Window, "addNotify", []);
});
Clazz.overrideMethod (c$, "getOrCreatePeer", 
function () {
return (this.ui == null ? null : this.peer == null ? (this.peer = this.getToolkit ().createWindow (this)) : this.peer);
});
Clazz.defineMethod (c$, "removeNotify", 
function () {
swingjs.JSToolkit.getAppletViewer ().allWindows.removeObj (this);
Clazz.superCall (this, java.awt.Window, "removeNotify", []);
});
Clazz.defineMethod (c$, "pack", 
function () {
var parent = this.parent;
if (parent != null && parent.getPeer () == null) {
parent.addNotify ();
}if (this.peer == null) {
this.addNotify ();
}if (this.beforeFirstShow) {
this.isPacked = true;
}this.repackContainer ();
});
Clazz.defineMethod (c$, "setMinimumSize", 
function (minimumSize) {
{
Clazz.superCall (this, java.awt.Window, "setMinimumSize", [minimumSize]);
var size = this.getSize ();
if (this.isMinimumSizeSet ()) {
if (size.width < minimumSize.width || size.height < minimumSize.height) {
var nw = Math.max (this.width, minimumSize.width);
var nh = Math.max (this.height, minimumSize.height);
this.setSize (nw, nh);
}}}}, "java.awt.Dimension");
Clazz.defineMethod (c$, "reshape", 
function (x, y, width, height) {
if (this.isMinimumSizeSet ()) {
var minSize = this.getMinimumSize ();
if (width < minSize.width) {
width = minSize.width;
}if (height < minSize.height) {
height = minSize.height;
}}Clazz.superCall (this, java.awt.Window, "reshape", [x, y, width, height]);
}, "~N,~N,~N,~N");
c$.closeSplashScreen = Clazz.defineMethod (c$, "closeSplashScreen", 
function () {
});
Clazz.defineMethod (c$, "setVisible", 
function (b) {
Clazz.superCall (this, java.awt.Window, "setVisible", [b]);
if (b) this.repaint ();
}, "~B");
Clazz.defineMethod (c$, "show", 
function () {
this.validate ();
this.isInShow = true;
if (this.visible) {
this.toFront ();
} else {
this.beforeFirstShow = false;
java.awt.Window.closeSplashScreen ();
Clazz.superCall (this, java.awt.Window, "show", []);
for (var i = 0; i < this.ownedWindowList.size (); i++) {
var child = this.ownedWindowList.elementAt (i);
if ((child != null) && child.showWithParent) {
child.show ();
child.showWithParent = false;
}}
if (!this.isModalBlocked ()) {
this.updateChildrenBlocking ();
} else {
this.modalBlocker.toFront_NoClientCode ();
}if (Clazz.instanceOf (this, java.awt.Frame) || Clazz.instanceOf (this, java.awt.Dialog)) {
java.awt.Window.updateChildFocusableWindowState (this);
}}this.isInShow = false;
if ((this.state & 1) == 0) {
this.postWindowEvent (200);
this.state |= 1;
}});
c$.updateChildFocusableWindowState = Clazz.defineMethod (c$, "updateChildFocusableWindowState", 
function (w) {
for (var i = 0; i < w.ownedWindowList.size (); i++) {
var child = w.ownedWindowList.elementAt (i);
if (child != null) {
java.awt.Window.updateChildFocusableWindowState (child);
}}
}, "java.awt.Window");
Clazz.defineMethod (c$, "postWindowEvent", 
function (id) {
if (this.windowListener != null || (this.eventMask & 64) != 0 || java.awt.Toolkit.enabledOnToolkit (64)) {
var e =  new java.awt.event.WindowEvent (this, id);
java.awt.Toolkit.getEventQueue ().postEvent (e);
}}, "~N");
Clazz.defineMethod (c$, "hide", 
function () {
{
for (var i = 0; i < this.ownedWindowList.size (); i++) {
var child = this.ownedWindowList.elementAt (i);
if ((child != null) && child.visible) {
child.hide ();
child.showWithParent = true;
}}
}Clazz.superCall (this, java.awt.Window, "hide", []);
});
Clazz.overrideMethod (c$, "clearMostRecentFocusOwnerOnHide", 
function () {
});
Clazz.defineMethod (c$, "dispose", 
function () {
this.doDispose ();
});
Clazz.defineMethod (c$, "disposeImpl", 
function () {
this.dispose ();
});
Clazz.defineMethod (c$, "doDispose", 
function () {
var me = this;
var action = ((Clazz.isClassDefined ("java.awt.Window$1") ? 0 : java.awt.Window.$Window$1$ ()), Clazz.innerTypeInstance (java.awt.Window$1, this, Clazz.cloneFinals ("me", me)));
action.run ();
this.postWindowEvent (202);
});
Clazz.overrideMethod (c$, "adjustListeningChildrenOnParent", 
function (mask, num) {
}, "~N,~N");
Clazz.overrideMethod (c$, "adjustDecendantsOnParent", 
function (num) {
}, "~N");
Clazz.defineMethod (c$, "toFront", 
function () {
this.toFront_NoClientCode ();
});
Clazz.defineMethod (c$, "toFront_NoClientCode", 
function () {
if (this.visible) {
var peer = this.peer;
if (peer != null) {
peer.toFront ();
}if (this.isModalBlocked ()) {
this.modalBlocker.toFront_NoClientCode ();
}}});
Clazz.defineMethod (c$, "toBack", 
function () {
this.toBack_NoClientCode ();
});
Clazz.defineMethod (c$, "toBack_NoClientCode", 
function () {
if (this.isAlwaysOnTop ()) {
try {
this.setAlwaysOnTop (false);
} catch (e) {
if (Clazz.exceptionOf (e, SecurityException)) {
} else {
throw e;
}
}
}if (this.visible) {
}});
Clazz.overrideMethod (c$, "getToolkit", 
function () {
return java.awt.Toolkit.getDefaultToolkit ();
});
Clazz.defineMethod (c$, "getWarningString", 
function () {
return this.warningString;
});
Clazz.overrideMethod (c$, "getLocale", 
function () {
if (this.locale == null) {
return java.util.Locale.getDefault ();
}return this.locale;
});
Clazz.defineMethod (c$, "setCursor", 
function (cursor) {
if (cursor == null) {
cursor = java.awt.Cursor.getPredefinedCursor (0);
}Clazz.superCall (this, java.awt.Window, "setCursor", [cursor]);
}, "java.awt.Cursor");
Clazz.defineMethod (c$, "getOwner", 
function () {
return this.getOwner_NoClientCode ();
});
Clazz.defineMethod (c$, "getOwner_NoClientCode", 
function () {
return this.parent;
});
Clazz.defineMethod (c$, "getOwnedWindows", 
function () {
return this.getOwnedWindows_NoClientCode ();
});
Clazz.defineMethod (c$, "getOwnedWindows_NoClientCode", 
function () {
var realCopy;
{
var fullSize = this.ownedWindowList.size ();
var realSize = 0;
var fullCopy =  new Array (fullSize);
for (var i = 0; i < fullSize; i++) {
fullCopy[realSize] = this.ownedWindowList.elementAt (i);
if (fullCopy[realSize] != null) {
realSize++;
}}
if (fullSize != realSize) {
realCopy = java.util.Arrays.copyOf (fullCopy, realSize);
} else {
realCopy = fullCopy;
}}return realCopy;
});
Clazz.defineMethod (c$, "isModalBlocked", 
function () {
return this.modalBlocker != null;
});
Clazz.defineMethod (c$, "setModalBlocked", 
function (blocker, blocked, peerCall) {
}, "java.awt.Dialog,~B,~B");
Clazz.defineMethod (c$, "getModalBlocker", 
function () {
return this.modalBlocker;
});
c$.getAllWindows = Clazz.defineMethod (c$, "getAllWindows", 
function () {
var v =  new java.util.ArrayList ();
v.addAll (swingjs.JSToolkit.getAppletViewer ().allWindows);
return v;
});
c$.getAllUnblockedWindows = Clazz.defineMethod (c$, "getAllUnblockedWindows", 
function () {
var allWindows = swingjs.JSToolkit.getAppletViewer ().allWindows;
var unblocked =  new java.util.ArrayList ();
for (var i = 0; i < allWindows.size (); i++) {
var w = allWindows.get (i);
if (!w.isModalBlocked ()) {
unblocked.add (w);
}}
return unblocked;
});
c$.getWindows = Clazz.defineMethod (c$, "getWindows", 
 function (appContext) {
{
var realCopy;
var windowList = appContext.get (java.awt.Window);
if (windowList != null) {
var fullSize = windowList.size ();
var realSize = 0;
var fullCopy =  new Array (fullSize);
for (var i = 0; i < fullSize; i++) {
var w = windowList.get (i);
if (w != null) {
fullCopy[realSize++] = w;
}}
if (fullSize != realSize) {
realCopy = java.util.Arrays.copyOf (fullCopy, realSize);
} else {
realCopy = fullCopy;
}} else {
realCopy =  new Array (0);
}return realCopy;
}}, "sun.awt.AppContext");
c$.getWindows = Clazz.defineMethod (c$, "getWindows", 
function () {
return java.awt.Window.getWindows (sun.awt.AppContext.getAppContext ());
});
c$.getOwnerlessWindows = Clazz.defineMethod (c$, "getOwnerlessWindows", 
function () {
var allWindows = java.awt.Window.getWindows ();
var ownerlessCount = 0;
for (var w, $w = 0, $$w = allWindows; $w < $$w.length && ((w = $$w[$w]) || true); $w++) {
if (w.getOwner () == null) {
ownerlessCount++;
}}
var ownerless =  new Array (ownerlessCount);
var c = 0;
for (var w, $w = 0, $$w = allWindows; $w < $$w.length && ((w = $$w[$w]) || true); $w++) {
if (w.getOwner () == null) {
ownerless[c++] = w;
}}
return ownerless;
});
Clazz.defineMethod (c$, "getDocumentRoot", 
function () {
{
var w = this;
while (w.getOwner () != null) {
w = w.getOwner ();
}
return w;
}});
Clazz.defineMethod (c$, "setModalExclusionType", 
function (exclusionType) {
if (exclusionType == null) {
exclusionType = java.awt.Dialog.ModalExclusionType.NO_EXCLUDE;
}if (!java.awt.Toolkit.getDefaultToolkit ().isModalExclusionTypeSupported (exclusionType)) {
exclusionType = java.awt.Dialog.ModalExclusionType.NO_EXCLUDE;
}if (this.modalExclusionType === exclusionType) {
return;
}this.modalExclusionType = exclusionType;
}, "java.awt.Dialog.ModalExclusionType");
Clazz.defineMethod (c$, "getModalExclusionType", 
function () {
return this.modalExclusionType;
});
Clazz.defineMethod (c$, "isModalExcluded", 
function (exclusionType) {
if ((this.modalExclusionType != null) && this.modalExclusionType.compareTo (exclusionType) >= 0) {
return true;
}var owner = this.getOwner_NoClientCode ();
return (owner != null) && owner.isModalExcluded (exclusionType);
}, "java.awt.Dialog.ModalExclusionType");
Clazz.defineMethod (c$, "updateChildrenBlocking", 
function () {
});
Clazz.defineMethod (c$, "addWindowListener", 
function (l) {
if (l == null) {
return;
}this.newEventsOnly = true;
this.windowListener = java.awt.AWTEventMulticaster.add (this.windowListener, l);
}, "java.awt.event.WindowListener");
Clazz.defineMethod (c$, "addWindowStateListener", 
function (l) {
if (l == null) {
return;
}this.windowStateListener = java.awt.AWTEventMulticaster.add (this.windowStateListener, l);
this.newEventsOnly = true;
}, "java.awt.event.WindowStateListener");
Clazz.defineMethod (c$, "addWindowFocusListener", 
function (l) {
if (l == null) {
return;
}this.windowFocusListener = java.awt.AWTEventMulticaster.add (this.windowFocusListener, l);
this.newEventsOnly = true;
}, "java.awt.event.WindowFocusListener");
Clazz.defineMethod (c$, "removeWindowListener", 
function (l) {
if (l == null) {
return;
}this.windowListener = java.awt.AWTEventMulticaster.remove (this.windowListener, l);
}, "java.awt.event.WindowListener");
Clazz.defineMethod (c$, "removeWindowStateListener", 
function (l) {
if (l == null) {
return;
}this.windowStateListener = java.awt.AWTEventMulticaster.remove (this.windowStateListener, l);
}, "java.awt.event.WindowStateListener");
Clazz.defineMethod (c$, "removeWindowFocusListener", 
function (l) {
if (l == null) {
return;
}this.windowFocusListener = java.awt.AWTEventMulticaster.remove (this.windowFocusListener, l);
}, "java.awt.event.WindowFocusListener");
Clazz.defineMethod (c$, "getWindowListeners", 
function () {
return (this.getListeners (java.awt.event.WindowListener));
});
Clazz.defineMethod (c$, "getWindowFocusListeners", 
function () {
return (this.getListeners (java.awt.event.WindowFocusListener));
});
Clazz.defineMethod (c$, "getWindowStateListeners", 
function () {
return (this.getListeners (java.awt.event.WindowStateListener));
});
Clazz.defineMethod (c$, "getListeners", 
function (listenerType) {
var l = null;
if (listenerType === java.awt.event.WindowFocusListener) {
l = this.windowFocusListener;
} else if (listenerType === java.awt.event.WindowStateListener) {
l = this.windowStateListener;
} else if (listenerType === java.awt.event.WindowListener) {
l = this.windowListener;
} else {
return Clazz.superCall (this, java.awt.Window, "getListeners", [listenerType]);
}return java.awt.AWTEventMulticaster.getListeners (l, listenerType);
}, "Class");
Clazz.defineMethod (c$, "eventEnabled", 
function (e) {
switch (e.id) {
case 200:
case 201:
case 202:
case 203:
case 204:
case 205:
case 206:
if ((this.eventMask & 64) != 0 || this.windowListener != null) {
return true;
}return false;
case 207:
case 208:
if ((this.eventMask & 524288) != 0 || this.windowFocusListener != null) {
return true;
}return false;
case 209:
if ((this.eventMask & 262144) != 0 || this.windowStateListener != null) {
return true;
}return false;
default:
break;
}
return Clazz.superCall (this, java.awt.Window, "eventEnabled", [e]);
}, "java.awt.AWTEvent");
Clazz.overrideMethod (c$, "processEvent", 
function (e) {
if (Clazz.instanceOf (e, java.awt.event.WindowEvent)) {
switch (e.getID ()) {
case 200:
case 201:
case 202:
case 203:
case 204:
case 205:
case 206:
this.processWindowEvent (e);
break;
case 207:
case 208:
this.processWindowFocusEvent (e);
break;
case 209:
this.processWindowStateEvent (e);
default:
break;
}
return;
}this.processEventCont (e);
}, "java.awt.AWTEvent");
Clazz.defineMethod (c$, "processWindowEvent", 
function (e) {
var listener = this.windowListener;
if (listener != null) {
switch (e.getID ()) {
case 200:
listener.windowOpened (e);
break;
case 201:
listener.windowClosing (e);
break;
case 202:
listener.windowClosed (e);
break;
case 203:
listener.windowIconified (e);
break;
case 204:
listener.windowDeiconified (e);
break;
case 205:
listener.windowActivated (e);
break;
case 206:
listener.windowDeactivated (e);
break;
default:
break;
}
}}, "java.awt.event.WindowEvent");
Clazz.defineMethod (c$, "processWindowFocusEvent", 
function (e) {
var listener = this.windowFocusListener;
if (listener != null) {
switch (e.getID ()) {
case 207:
listener.windowGainedFocus (e);
break;
case 208:
listener.windowLostFocus (e);
break;
default:
break;
}
}}, "java.awt.event.WindowEvent");
Clazz.defineMethod (c$, "processWindowStateEvent", 
function (e) {
var listener = this.windowStateListener;
if (listener != null) {
switch (e.getID ()) {
case 209:
listener.windowStateChanged (e);
break;
default:
break;
}
}}, "java.awt.event.WindowEvent");
Clazz.overrideMethod (c$, "preProcessKeyEvent", 
function (e) {
}, "java.awt.event.KeyEvent");
Clazz.overrideMethod (c$, "postProcessKeyEvent", 
function (e) {
}, "java.awt.event.KeyEvent");
Clazz.defineMethod (c$, "setAlwaysOnTop", 
function (alwaysOnTop) {
var oldAlwaysOnTop;
{
oldAlwaysOnTop = this.alwaysOnTop;
this.alwaysOnTop = alwaysOnTop;
}if (oldAlwaysOnTop != alwaysOnTop) {
if (this.isAlwaysOnTopSupported ()) {
}this.firePropertyChangeBool ("alwaysOnTop", oldAlwaysOnTop, alwaysOnTop);
}}, "~B");
Clazz.defineMethod (c$, "isAlwaysOnTopSupported", 
function () {
return java.awt.Toolkit.getDefaultToolkit ().isAlwaysOnTopSupported ();
});
Clazz.defineMethod (c$, "isAlwaysOnTop", 
function () {
return this.alwaysOnTop;
});
Clazz.defineMethod (c$, "isActive", 
function () {
return false;
});
Clazz.defineMethod (c$, "isFocused", 
function () {
return swingjs.JSToolkit.isFocused (this);
});
Clazz.overrideMethod (c$, "getFocusTraversalKeys", 
function (id) {
return null;
}, "~N");
Clazz.defineMethod (c$, "setFocusCycleRoot", 
function (focusCycleRoot) {
}, "~B");
Clazz.defineMethod (c$, "isFocusCycleRoot", 
function () {
return true;
});
Clazz.overrideMethod (c$, "getFocusCycleRootAncestor", 
function () {
return null;
});
Clazz.defineMethod (c$, "isFocusableWindow", 
function () {
if (!this.getFocusableWindowState ()) {
return false;
}if (Clazz.instanceOf (this, java.awt.Frame) || Clazz.instanceOf (this, java.awt.Dialog)) {
return true;
}for (var owner = this.getOwner (); owner != null; owner = owner.getOwner ()) {
if (Clazz.instanceOf (owner, java.awt.Frame) || Clazz.instanceOf (owner, java.awt.Dialog)) {
return owner.isShowing ();
}}
return false;
});
Clazz.defineMethod (c$, "getFocusableWindowState", 
function () {
return this.focusableWindowState;
});
Clazz.defineMethod (c$, "setFocusableWindowState", 
function (focusableWindowState) {
var oldFocusableWindowState;
{
oldFocusableWindowState = this.focusableWindowState;
this.focusableWindowState = focusableWindowState;
}this.firePropertyChangeBool ("focusableWindowState", oldFocusableWindowState, focusableWindowState);
if (oldFocusableWindowState && !focusableWindowState && this.isFocused ()) {
for (var owner = this.getOwner (); owner != null; owner = owner.getOwner ()) {
}
}}, "~B");
Clazz.defineMethod (c$, "dispatchEventImpl", 
function (e) {
if (e.getID () == 101) {
this.invalidate ();
this.validate ();
}Clazz.superCall (this, java.awt.Window, "dispatchEventImpl", [e]);
}, "java.awt.AWTEvent");
Clazz.overrideMethod (c$, "postEvent", 
function (e) {
if (this.handleEvent (e)) {
e.consume ();
return true;
}return false;
}, "java.awt.Event");
Clazz.defineMethod (c$, "isShowing", 
function () {
return this.visible;
});
Clazz.defineMethod (c$, "applyResourceBundle", 
function (rb) {
this.applyComponentOrientation (java.awt.ComponentOrientation.getOrientation (rb));
}, "java.util.ResourceBundle");
Clazz.defineMethod (c$, "applyResourceBundle", 
function (rbName) {
this.applyResourceBundle (java.util.ResourceBundle.getBundle (rbName));
}, "~S");
Clazz.defineMethod (c$, "addOwnedWindow", 
function (weakWindow) {
if (weakWindow != null) {
{
if (!this.ownedWindowList.contains (weakWindow)) {
this.ownedWindowList.addElement (weakWindow);
}}}}, "java.awt.Window");
Clazz.defineMethod (c$, "removeOwnedWindow", 
function (weakWindow) {
if (weakWindow != null) {
this.ownedWindowList.removeElement (weakWindow);
}}, "java.awt.Window");
Clazz.defineMethod (c$, "connectOwnedWindow", 
function (child) {
child.parent = this;
this.addOwnedWindow (child);
}, "java.awt.Window");
Clazz.defineMethod (c$, "addToWindowList", 
 function () {
var windowList = this.appContext.get (java.awt.Window);
if (windowList == null) {
windowList =  new java.util.Vector ();
this.appContext.put (java.awt.Window, windowList);
}windowList.add (this);
});
c$.removeFromWindowList = Clazz.defineMethod (c$, "removeFromWindowList", 
 function (context, w) {
{
var windowList = context.get (java.awt.Window);
if (windowList != null) {
windowList.remove (w);
}}}, "sun.awt.AppContext,java.awt.Window");
Clazz.defineMethod (c$, "getGraphicsConfiguration", 
function () {
if (this.graphicsConfig == null) this.graphicsConfig = swingjs.JSToolkit.getGraphicsConfiguration ();
return this.graphicsConfig;
});
Clazz.overrideMethod (c$, "resetGC", 
function () {
});
Clazz.defineMethod (c$, "setLocationRelativeTo", 
function (c) {
var root = null;
if (c != null) {
if (Clazz.instanceOf (c, java.awt.Window) || Clazz.instanceOf (c, java.applet.Applet)) {
root = c;
} else {
var parent;
for (parent = c.getParent (); parent != null; parent = parent.getParent ()) {
if (Clazz.instanceOf (parent, java.awt.Window) || Clazz.instanceOf (parent, java.applet.Applet)) {
root = parent;
break;
}}
}}if ((c != null && !c.isShowing ()) || root == null || !root.isShowing ()) {
var paneSize = this.getSize ();
var centerPoint = java.awt.GraphicsEnvironment.getLocalGraphicsEnvironment ().getCenterPoint ();
this.setLocation (centerPoint.x - Clazz.doubleToInt (paneSize.width / 2), centerPoint.y - Clazz.doubleToInt (paneSize.height / 2));
} else {
var invokerSize = c.getSize ();
var invokerScreenLocation = c.getLocationOnScreen ();
var windowBounds = this.getBounds ();
var dx = invokerScreenLocation.x + ((invokerSize.width - windowBounds.width) >> 1);
var dy = invokerScreenLocation.y + ((invokerSize.height - windowBounds.height) >> 1);
var ss = root.getGraphicsConfiguration ().getBounds ();
if (dy + windowBounds.height > ss.y + ss.height) {
dy = ss.y + ss.height - windowBounds.height;
if (invokerScreenLocation.x - ss.x + Clazz.doubleToInt (invokerSize.width / 2) < Clazz.doubleToInt (ss.width / 2)) {
dx = invokerScreenLocation.x + invokerSize.width;
} else {
dx = invokerScreenLocation.x - windowBounds.width;
}}if (dx + windowBounds.width > ss.x + ss.width) {
dx = ss.x + ss.width - windowBounds.width;
}if (dx < ss.x) dx = ss.x;
if (dy < ss.y) dy = ss.y;
this.setLocation (dx, dy);
}}, "java.awt.Component");
Clazz.defineMethod (c$, "deliverMouseWheelToAncestor", 
function (e) {
}, "java.awt.event.MouseWheelEvent");
Clazz.overrideMethod (c$, "dispatchMouseWheelToAncestor", 
function (e) {
return false;
}, "java.awt.event.MouseWheelEvent");
Clazz.defineMethod (c$, "getTemporaryLostComponent", 
function () {
return this.temporaryLostComponent;
});
Clazz.defineMethod (c$, "setTemporaryLostComponent", 
function (component) {
var previousComp = this.temporaryLostComponent;
if (component == null || component.canBeFocusOwner ()) {
this.temporaryLostComponent = component;
} else {
this.temporaryLostComponent = null;
}return previousComp;
}, "java.awt.Component");
Clazz.defineMethod (c$, "canContainFocusOwner", 
function (focusOwnerCandidate) {
return Clazz.superCall (this, java.awt.Window, "canContainFocusOwner", [focusOwnerCandidate]) && this.isFocusableWindow ();
}, "java.awt.Component");
Clazz.defineMethod (c$, "setBounds", 
function (r) {
this.setBounds (r.x, r.y, r.width, r.height);
}, "java.awt.Rectangle");
Clazz.overrideMethod (c$, "isRecursivelyVisible", 
function () {
return this.visible;
});
Clazz.defineMethod (c$, "getOpacity", 
function () {
{
return this.opacity;
}});
Clazz.defineMethod (c$, "setOpacity", 
function (opacity) {
{
if (opacity < 0.0 || opacity > 1.0) {
throw  new IllegalArgumentException ("The value of opacity should be in the range [0.0f .. 1.0f].");
}this.opacity = opacity;
}}, "~N");
Clazz.defineMethod (c$, "getShape", 
function () {
{
return this.shape;
}});
Clazz.defineMethod (c$, "setShape", 
function (shape) {
{
this.shape = shape;
}}, "java.awt.Shape");
Clazz.defineMethod (c$, "setOpaque", 
function (opaque) {
{
java.awt.Window.setLayersOpaque (this, opaque);
this.opaque = opaque;
var peer = this.getPeer ();
if (peer != null) {
peer.setOpaque (opaque);
}}}, "~B");
c$.setLayersOpaque = Clazz.defineMethod (c$, "setLayersOpaque", 
 function (component, isOpaque) {
if (Clazz.instanceOf (component, javax.swing.RootPaneContainer)) {
var rpc = component;
var root = rpc.getRootPane ();
var lp = root.getLayeredPane ();
var c = root.getContentPane ();
var content = (Clazz.instanceOf (c, javax.swing.JComponent)) ? c : null;
lp.setOpaque (isOpaque);
root.setOpaque (isOpaque);
root.setDoubleBuffered (isOpaque);
if (content != null) {
content.setOpaque (isOpaque);
content.setDoubleBuffered (isOpaque);
var numChildren = content.getComponentCount ();
if (numChildren > 0) {
var child = content.getComponent (0);
if (Clazz.instanceOf (child, javax.swing.RootPaneContainer)) {
java.awt.Window.setLayersOpaque (child, isOpaque);
}}}}var bg = component.getBackground ();
var hasTransparentBg = java.awt.Window.TRANSPARENT_BACKGROUND_COLOR.equals (bg);
var container = null;
if (Clazz.instanceOf (component, java.awt.Container)) {
container = component;
}if (isOpaque) {
if (hasTransparentBg) {
var newColor = null;
if (container != null && container.preserveBackgroundColor != null) {
newColor = container.preserveBackgroundColor;
} else {
newColor =  new java.awt.Color (255, 255, 255);
}component.setBackground (newColor);
}} else {
if (!hasTransparentBg && container != null) {
container.preserveBackgroundColor = bg;
}component.setBackground (java.awt.Window.TRANSPARENT_BACKGROUND_COLOR);
}}, "java.awt.Component,~B");
Clazz.overrideMethod (c$, "getContainer", 
function () {
return null;
});
Clazz.overrideMethod (c$, "mixOnReshaping", 
function () {
});
Clazz.overrideMethod (c$, "getLocationOnWindow", 
function () {
return  new java.awt.Point (0, 0);
});
c$.$Window$1$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.declareAnonymous (java.awt, "Window$1", null, Runnable);
Clazz.defineMethod (c$, "run", 
function () {
(this.f$.me).getUI ().uninstallUI (null);
var ownedWindowArray;
{
ownedWindowArray =  new Array (this.b$["java.awt.Window"].ownedWindowList.size ());
this.b$["java.awt.Window"].ownedWindowList.copyInto (ownedWindowArray);
}for (var i = 0; i < ownedWindowArray.length; i++) {
var child = ownedWindowArray[i];
if (child != null) child.disposeImpl ();
}
this.b$["java.awt.Window"].hide ();
this.b$["java.awt.Window"].beforeFirstShow = true;
this.b$["java.awt.Window"].removeNotify ();
this.b$["java.awt.Window"].clearCurrentFocusCycleRootOnHide ();
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"systemSyncLWRequests", false,
"OPENED", 0x01,
"base", "win",
"nameCounter", 0);
c$.TRANSPARENT_BACKGROUND_COLOR = c$.prototype.TRANSPARENT_BACKGROUND_COLOR =  new java.awt.Color (0, 0, 0, 0);
c$ = Clazz.decorateAsClass (function () {
this.focusRoot = null;
this.focusOwner = null;
Clazz.instantialize (this, arguments);
}, java.awt, "FocusManager");
});
