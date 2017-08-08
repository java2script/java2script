Clazz.declarePackage ("java.awt");
Clazz.load (["java.awt.AWTEventMulticaster", "java.awt.event.AWTEventListener", "java.util.HashMap"], "java.awt.Toolkit", ["java.lang.IllegalArgumentException", "java.util.ArrayList", "java.awt.Cursor", "$.GraphicsEnvironment", "$.Insets", "$.RenderingHints", "java.awt.event.AWTEventListenerProxy", "java.beans.PropertyChangeSupport", "sun.awt.NullComponentPeer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.desktopProperties = null;
this.desktopPropsSupport = null;
this.calls = null;
this.eventListener = null;
this.listener2SelectiveListener = null;
if (!Clazz.isClassDefined ("java.awt.Toolkit.SelectiveAWTEventListener")) {
java.awt.Toolkit.$Toolkit$SelectiveAWTEventListener$ ();
}
Clazz.instantialize (this, arguments);
}, java.awt, "Toolkit");
Clazz.prepareFields (c$, function () {
this.desktopProperties =  new java.util.HashMap ();
this.desktopPropsSupport = java.awt.Toolkit.createPropertyChangeSupport (this);
this.calls =  Clazz.newIntArray (32, 0);
this.listener2SelectiveListener =  new java.util.HashMap ();
});
Clazz.defineMethod (c$, "createComponent", 
function (target) {
if (java.awt.Toolkit.lightweightMarker == null) {
java.awt.Toolkit.lightweightMarker =  new sun.awt.NullComponentPeer ();
}return java.awt.Toolkit.lightweightMarker;
}, "java.awt.Component");
Clazz.defineMethod (c$, "loadSystemColors", 
function (systemColors) {
}, "~A");
Clazz.defineMethod (c$, "setDynamicLayout", 
function (dynamic) {
}, "~B");
Clazz.defineMethod (c$, "isDynamicLayoutSet", 
function () {
if (this !== java.awt.Toolkit.getDefaultToolkit ()) {
return java.awt.Toolkit.getDefaultToolkit ().isDynamicLayoutSet ();
} else {
return false;
}});
Clazz.defineMethod (c$, "isDynamicLayoutActive", 
function () {
if (this !== java.awt.Toolkit.getDefaultToolkit ()) {
return java.awt.Toolkit.getDefaultToolkit ().isDynamicLayoutActive ();
} else {
return false;
}});
Clazz.defineMethod (c$, "getScreenInsets", 
function (gc) {
if (this !== java.awt.Toolkit.getDefaultToolkit ()) {
return java.awt.Toolkit.getDefaultToolkit ().getScreenInsets (gc);
} else {
return  new java.awt.Insets (0, 0, 0, 0);
}}, "java.awt.GraphicsConfiguration");
c$.getDefaultToolkit = Clazz.defineMethod (c$, "getDefaultToolkit", 
function () {
return (java.awt.Toolkit.toolkit == null ? java.awt.Toolkit.toolkit =  new swingjs.JSToolkit () : java.awt.Toolkit.toolkit);
});
Clazz.defineMethod (c$, "createImage", 
function (imagedata) {
return this.createImage (imagedata, 0, imagedata.length);
}, "~A");
Clazz.defineMethod (c$, "getPrintJob", 
function (frame, jobtitle, jobAttributes, pageAttributes) {
if (java.awt.GraphicsEnvironment.isHeadless ()) {
throw  new IllegalArgumentException ();
}if (this !== java.awt.Toolkit.getDefaultToolkit ()) {
return java.awt.Toolkit.getDefaultToolkit ().getPrintJob (frame, jobtitle, jobAttributes, pageAttributes);
} else {
return this.getPrintJob (frame, jobtitle, null);
}}, "java.awt.Frame,~S,java.awt.JobAttributes,java.awt.PageAttributes");
Clazz.defineMethod (c$, "getSystemSelection", 
function () {
if (this !== java.awt.Toolkit.getDefaultToolkit ()) {
return java.awt.Toolkit.getDefaultToolkit ().getSystemSelection ();
} else {
java.awt.GraphicsEnvironment.checkHeadless ();
return null;
}});
Clazz.defineMethod (c$, "getMenuShortcutKeyMask", 
function () {
return 2;
});
c$.getNativeContainer = Clazz.defineMethod (c$, "getNativeContainer", 
function (c) {
return null;
}, "java.awt.Component");
Clazz.defineMethod (c$, "createCustomCursor", 
function (cursor, hotSpot, name) {
return  new java.awt.Cursor (0);
}, "java.awt.Image,java.awt.Point,~S");
Clazz.defineMethod (c$, "isFrameStateSupported", 
function (state) {
return (state == 0);
}, "~N");
c$.getProperty = Clazz.defineMethod (c$, "getProperty", 
function (key, defaultValue) {
if (java.awt.Toolkit.resources != null) {
try {
return java.awt.Toolkit.resources.getString (key);
} catch (e) {
if (Clazz.exceptionOf (e, java.util.MissingResourceException)) {
} else {
throw e;
}
}
}return defaultValue;
}, "~S,~S");
Clazz.defineMethod (c$, "getSystemEventQueue", 
function () {
return this.getSystemEventQueueImpl ();
});
c$.getEventQueue = Clazz.defineMethod (c$, "getEventQueue", 
function () {
return java.awt.Toolkit.getDefaultToolkit ().getSystemEventQueueImpl ();
});
Clazz.defineMethod (c$, "createDragGestureRecognizer", 
function (abstractRecognizerClass, ds, c, srcActions, dgl) {
return null;
}, "Class,java.awt.dnd.DragSource,java.awt.Component,~N,java.awt.dnd.DragGestureListener");
Clazz.defineMethod (c$, "getDesktopProperty", 
function (propertyName) {
if (this.desktopProperties.isEmpty ()) {
this.initializeDesktopProperties ();
}var value;
if (propertyName.equals ("awt.dynamicLayoutSupported")) {
value = this.lazilyLoadDesktopProperty (propertyName);
return value;
}value = this.desktopProperties.get (propertyName);
if (value == null) {
value = this.lazilyLoadDesktopProperty (propertyName);
if (value != null) {
this.setDesktopProperty (propertyName, value);
}}if (Clazz.instanceOf (value, java.awt.RenderingHints)) {
value = (value).clone ();
}return value;
}, "~S");
Clazz.defineMethod (c$, "setDesktopProperty", 
function (name, newValue) {
var oldValue;
{
oldValue = this.desktopProperties.get (name);
this.desktopProperties.put (name, newValue);
}this.desktopPropsSupport.firePropertyChange (name, oldValue, newValue);
}, "~S,~O");
Clazz.defineMethod (c$, "lazilyLoadDesktopProperty", 
function (name) {
return null;
}, "~S");
Clazz.defineMethod (c$, "initializeDesktopProperties", 
function () {
});
Clazz.defineMethod (c$, "addPropertyChangeListener", 
function (name, pcl) {
this.desktopPropsSupport.addPropertyChangeListener (name, pcl);
}, "~S,java.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "removePropertyChangeListener", 
function (name, pcl) {
this.desktopPropsSupport.removePropertyChangeListener (name, pcl);
}, "~S,java.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "getPropertyChangeListeners", 
function () {
return this.desktopPropsSupport.getPropertyChangeListeners ();
});
Clazz.defineMethod (c$, "getPropertyChangeListeners", 
function (propertyName) {
return this.desktopPropsSupport.getPropertyChangeListeners (propertyName);
}, "~S");
Clazz.defineMethod (c$, "isAlwaysOnTopSupported", 
function () {
return true;
});
c$.deProxyAWTEventListener = Clazz.defineMethod (c$, "deProxyAWTEventListener", 
 function (l) {
var localL = l;
if (localL == null) {
return null;
}if (Clazz.instanceOf (l, java.awt.event.AWTEventListenerProxy)) {
localL = (l).getListener ();
}return localL;
}, "java.awt.event.AWTEventListener");
Clazz.defineMethod (c$, "addAWTEventListener", 
function (listener, eventMask) {
var localL = java.awt.Toolkit.deProxyAWTEventListener (listener);
if (localL == null) {
return;
}{
var selectiveListener = this.listener2SelectiveListener.get (localL);
if (selectiveListener == null) {
selectiveListener = Clazz.innerTypeInstance (java.awt.Toolkit.SelectiveAWTEventListener, this, null, localL, eventMask);
this.listener2SelectiveListener.put (localL, selectiveListener);
this.eventListener = java.awt.Toolkit.ToolkitEventMulticaster.add (this.eventListener, selectiveListener);
}selectiveListener.orEventMasks (eventMask);
java.awt.Toolkit.enabledOnToolkitMask |= eventMask;
var mask = eventMask;
for (var i = 0; i < 32; i++) {
if (mask == 0) {
break;
}if ((mask & 1) != 0) {
this.calls[i]++;
}mask >>>= 1;
}
}}, "java.awt.event.AWTEventListener,~N");
Clazz.defineMethod (c$, "removeAWTEventListener", 
function (listener) {
var localL = java.awt.Toolkit.deProxyAWTEventListener (listener);
if (listener == null) {
return;
}{
var selectiveListener = this.listener2SelectiveListener.get (localL);
if (selectiveListener != null) {
this.listener2SelectiveListener.remove (localL);
var listenerCalls = selectiveListener.getCalls ();
for (var i = 0; i < 32; i++) {
this.calls[i] -= listenerCalls[i];
if (this.calls[i] == 0) {
java.awt.Toolkit.enabledOnToolkitMask &= ~(1 << i);
}}
}this.eventListener = java.awt.Toolkit.ToolkitEventMulticaster.remove (this.eventListener, (selectiveListener == null) ? localL : selectiveListener);
}}, "java.awt.event.AWTEventListener");
c$.enabledOnToolkit = Clazz.defineMethod (c$, "enabledOnToolkit", 
function (eventMask) {
return (java.awt.Toolkit.enabledOnToolkitMask & eventMask) != 0;
}, "~N");
Clazz.defineMethod (c$, "countAWTEventListeners", 
function (eventMask) {
var ci = 0;
for (; eventMask != 0; eventMask >>>= 1, ci++) {
}
ci--;
return this.calls[ci];
}, "~N");
Clazz.defineMethod (c$, "getAWTEventListeners", 
function () {
{
var la = java.awt.Toolkit.ToolkitEventMulticaster.getListeners (this.eventListener, java.awt.event.AWTEventListener);
var ret =  new Array (la.length);
for (var i = 0; i < la.length; i++) {
var sael = la[i];
var tempL = sael.getListener ();
ret[i] =  new java.awt.event.AWTEventListenerProxy (sael.getEventMask (), tempL);
}
return ret;
}});
Clazz.defineMethod (c$, "getAWTEventListeners", 
function (eventMask) {
{
var la = java.awt.Toolkit.ToolkitEventMulticaster.getListeners (this.eventListener, java.awt.event.AWTEventListener);
var list =  new java.util.ArrayList (la.length);
for (var i = 0; i < la.length; i++) {
var sael = la[i];
if ((sael.getEventMask () & eventMask) == eventMask) {
list.add ( new java.awt.event.AWTEventListenerProxy (sael.getEventMask (), sael.getListener ()));
}}
return list.toArray ( new Array (0));
}}, "~N");
Clazz.defineMethod (c$, "notifyAWTEventListeners", 
function (theEvent) {
var eventListener = this.eventListener;
if (eventListener != null) {
eventListener.eventDispatched (theEvent);
}}, "java.awt.AWTEvent");
c$.createPropertyChangeSupport = Clazz.defineMethod (c$, "createPropertyChangeSupport", 
 function (toolkit) {
return  new java.beans.PropertyChangeSupport (toolkit);
}, "java.awt.Toolkit");
c$.$Toolkit$SelectiveAWTEventListener$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.listener = null;
this.eventMask = 0;
this.calls = null;
Clazz.instantialize (this, arguments);
}, java.awt.Toolkit, "SelectiveAWTEventListener", null, java.awt.event.AWTEventListener);
Clazz.prepareFields (c$, function () {
this.calls =  Clazz.newIntArray (32, 0);
});
Clazz.defineMethod (c$, "getListener", 
function () {
return this.listener;
});
Clazz.defineMethod (c$, "getEventMask", 
function () {
return this.eventMask;
});
Clazz.defineMethod (c$, "getCalls", 
function () {
return this.calls;
});
Clazz.defineMethod (c$, "orEventMasks", 
function (a) {
this.eventMask |= a;
for (var b = 0; b < 32; b++) {
if (a == 0) {
break;
}if ((a & 1) != 0) {
this.calls[b]++;
}a >>>= 1;
}
}, "~N");
Clazz.makeConstructor (c$, 
function (a, b) {
this.listener = a;
this.eventMask = b;
}, "java.awt.event.AWTEventListener,~N");
Clazz.defineMethod (c$, "eventDispatched", 
function (a) {
var b = 0;
if (((b = this.eventMask & 1) != 0 && a.id >= 100 && a.id <= 103) || ((b = this.eventMask & 2) != 0 && a.id >= 300 && a.id <= 301) || ((b = this.eventMask & 4) != 0 && a.id >= 1004 && a.id <= 1005) || ((b = this.eventMask & 8) != 0 && a.id >= 400 && a.id <= 402) || ((b = this.eventMask & 131072) != 0 && a.id == 507) || ((b = this.eventMask & 32) != 0 && (a.id == 503 || a.id == 506)) || ((b = this.eventMask & 16) != 0 && a.id != 503 && a.id != 506 && a.id != 507 && a.id >= 500 && a.id <= 507) || ((b = this.eventMask & 64) != 0 && (a.id >= 200 && a.id <= 209)) || ((b = this.eventMask & 128) != 0 && a.id >= 1001 && a.id <= 1001) || ((b = this.eventMask & 256) != 0 && a.id >= 601 && a.id <= 601) || ((b = this.eventMask & 512) != 0 && a.id >= 701 && a.id <= 701) || ((b = this.eventMask & 1024) != 0 && a.id >= 900 && a.id <= 900) || ((b = this.eventMask & 2048) != 0 && a.id >= 1100 && a.id <= 1101) || ((b = this.eventMask & 8192) != 0 && a.id >= 800 && a.id <= 801) || ((b = this.eventMask & 16384) != 0 && a.id >= 1200 && a.id <= 1201) || ((b = this.eventMask & 32768) != 0 && a.id == 1400) || ((b = this.eventMask & 65536) != 0 && (a.id == 1401 || a.id == 1402)) || ((b = this.eventMask & 262144) != 0 && a.id == 209) || ((b = this.eventMask & 524288) != 0 && (a.id == 207 || a.id == 208))) {
var c = 0;
for (var d = b; d != 0; d >>>= 1, c++) {
}
c--;
for (var e = 0; e < this.calls[c]; e++) {
this.listener.eventDispatched (a);
}
}}, "java.awt.AWTEvent");
c$ = Clazz.p0p ();
};
Clazz.pu$h(c$);
c$ = Clazz.declareType (java.awt.Toolkit, "ToolkitEventMulticaster", java.awt.AWTEventMulticaster, java.awt.event.AWTEventListener);
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
if (a == null) return b;
if (b == null) return a;
return  new java.awt.Toolkit.ToolkitEventMulticaster (a, b);
}, "java.awt.event.AWTEventListener,java.awt.event.AWTEventListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (a, b) {
return java.awt.AWTEventMulticaster.removeInternal (a, b);
}, "java.awt.event.AWTEventListener,java.awt.event.AWTEventListener");
Clazz.defineMethod (c$, "remove", 
function (a) {
if (a === this.a) return this.b;
if (a === this.b) return this.a;
var b = java.awt.AWTEventMulticaster.removeInternal (this.a, a);
var c = java.awt.AWTEventMulticaster.removeInternal (this.b, a);
if (b === this.a && c === this.b) {
return this;
}return java.awt.Toolkit.ToolkitEventMulticaster.add (b, c);
}, "java.util.EventListener");
Clazz.defineMethod (c$, "eventDispatched", 
function (a) {
(this.a).eventDispatched (a);
(this.b).eventDispatched (a);
}, "java.awt.AWTEvent");
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"lightweightMarker", null,
"toolkit", null,
"resources", null,
"LONG_BITS", 32,
"enabledOnToolkitMask", 0);
});
