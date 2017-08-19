Clazz.declarePackage ("sun.awt");
Clazz.load (["java.awt.Toolkit", "sun.awt.ComponentFactory", "$.WindowClosingListener", "$.WindowClosingSupport", "java.util.HashMap"], "sun.awt.SunToolkit", ["java.lang.NullPointerException", "$.Thread", "java.awt.Component", "$.Dimension", "$.EventQueue", "$.Panel", "$.Window", "sun.awt.AWTAccessor", "$.AWTAutoShutdown", "$.AppContext", "$.PeerEvent", "$.PostEventQueue", "sun.font.FontDesignMetrics"], function () {
c$ = Clazz.decorateAsClass (function () {
this.windowClosingListener = null;
Clazz.instantialize (this, arguments);
}, sun.awt, "SunToolkit", java.awt.Toolkit, [sun.awt.WindowClosingSupport, sun.awt.WindowClosingListener, sun.awt.ComponentFactory]);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, sun.awt.SunToolkit, []);
var eventQueue;
eventQueue =  new java.awt.EventQueue ();
var appContext = sun.awt.AppContext.getAppContext ();
if (appContext != null) {
appContext.put (sun.awt.AppContext.EVENT_QUEUE_KEY, eventQueue);
var postEventQueue =  new sun.awt.PostEventQueue (eventQueue);
appContext.put ("PostEventQueue", postEventQueue);
}});
Clazz.defineMethod (c$, "useBufferPerWindow", 
function () {
return false;
});
c$.createNewAppContext = Clazz.defineMethod (c$, "createNewAppContext", 
function () {
var threadGroup = Thread.currentThread ().getThreadGroup ();
return sun.awt.SunToolkit.createNewAppContext (threadGroup);
});
c$.createNewAppContext = Clazz.defineMethod (c$, "createNewAppContext", 
function (threadGroup) {
var eventQueue;
var eqName = System.getProperty ("AWT.EventQueueClass", "java.awt.EventQueue");
try {
eventQueue = Clazz._4Name (eqName).newInstance ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.err.println ("Failed loading " + eqName + ": " + e);
eventQueue =  new java.awt.EventQueue ();
} else {
throw e;
}
}
var appContext =  new sun.awt.AppContext (threadGroup);
appContext.put (sun.awt.AppContext.EVENT_QUEUE_KEY, eventQueue);
var postEventQueue =  new sun.awt.PostEventQueue (eventQueue);
appContext.put ("PostEventQueue", postEventQueue);
return appContext;
}, "ThreadGroup");
c$.wakeupEventQueue = Clazz.defineMethod (c$, "wakeupEventQueue", 
function (q, isShutdown) {
q.wakeup (isShutdown);
}, "java.awt.EventQueue,~B");
c$.targetToPeer = Clazz.defineMethod (c$, "targetToPeer", 
function (target) {
if (target != null) {
return sun.awt.AWTAutoShutdown.getInstance ().getPeer (target);
}return null;
}, "~O");
c$.targetCreatedPeer = Clazz.defineMethod (c$, "targetCreatedPeer", 
function (target, peer) {
if (target != null && peer != null) {
sun.awt.AWTAutoShutdown.getInstance ().registerPeer (target, peer);
}}, "~O,~O");
c$.targetDisposedPeer = Clazz.defineMethod (c$, "targetDisposedPeer", 
function (target, peer) {
if (target != null && peer != null) {
sun.awt.AWTAutoShutdown.getInstance ().unregisterPeer (target, peer);
}}, "~O,~O");
c$.setAppContext = Clazz.defineMethod (c$, "setAppContext", 
 function (target, context) {
if (Clazz.instanceOf (target, java.awt.Component)) {
sun.awt.AWTAccessor.getComponentAccessor ().setAppContext (target, context);
} else {
return false;
}return true;
}, "~O,sun.awt.AppContext");
c$.getAppContext = Clazz.defineMethod (c$, "getAppContext", 
 function (target) {
if (Clazz.instanceOf (target, java.awt.Component)) {
{
return target.appContext;
}} else {
return null;
}}, "~O");
c$.targetToAppContext = Clazz.defineMethod (c$, "targetToAppContext", 
function (target) {
if (target == null) {
return null;
}var context = sun.awt.SunToolkit.getAppContext (target);
if (context == null) {
context = sun.awt.SunToolkit.appContextMap.get (target);
}return context;
}, "~O");
c$.setLWRequestStatus = Clazz.defineMethod (c$, "setLWRequestStatus", 
function (changed, status) {
sun.awt.AWTAccessor.getWindowAccessor ().setLWRequestStatus (changed, status);
}, "java.awt.Window,~B");
c$.checkAndSetPolicy = Clazz.defineMethod (c$, "checkAndSetPolicy", 
function (cont, isSwingCont) {
}, "java.awt.Container,~B");
c$.insertTargetMapping = Clazz.defineMethod (c$, "insertTargetMapping", 
function (target, appContext) {
if (!sun.awt.SunToolkit.setAppContext (target, appContext)) {
sun.awt.SunToolkit.appContextMap.put (target, appContext);
}}, "~O,sun.awt.AppContext");
c$.postEvent = Clazz.defineMethod (c$, "postEvent", 
function (appContext, event) {
if (event == null) {
throw  new NullPointerException ();
}var postEventQueue = appContext.get ("PostEventQueue");
if (postEventQueue != null) {
postEventQueue.postEvent (event);
}}, "sun.awt.AppContext,java.awt.AWTEvent");
c$.postPriorityEvent = Clazz.defineMethod (c$, "postPriorityEvent", 
function (e) {
var pe =  new sun.awt.PeerEvent (java.awt.Toolkit.getDefaultToolkit (), ((Clazz.isClassDefined ("sun.awt.SunToolkit$1") ? 0 : sun.awt.SunToolkit.$SunToolkit$1$ ()), Clazz.innerTypeInstance (sun.awt.SunToolkit$1, this, Clazz.cloneFinals ("e", e))), 2);
sun.awt.SunToolkit.postEvent (sun.awt.SunToolkit.targetToAppContext (e.getSource ()), pe);
}, "java.awt.AWTEvent");
c$.flushPendingEvents = Clazz.defineMethod (c$, "flushPendingEvents", 
function () {
var appContext = sun.awt.AppContext.getAppContext ();
var postEventQueue = appContext.get ("PostEventQueue");
if (postEventQueue != null) {
postEventQueue.flush ();
}});
c$.isPostEventQueueEmpty = Clazz.defineMethod (c$, "isPostEventQueueEmpty", 
function () {
var appContext = sun.awt.AppContext.getAppContext ();
var postEventQueue = appContext.get ("PostEventQueue");
return (postEventQueue == null || postEventQueue.noEvents ());
});
c$.executeOnEventHandlerThread = Clazz.defineMethod (c$, "executeOnEventHandlerThread", 
function (target, runnable) {
sun.awt.SunToolkit.executeOnEventHandlerThread ( new sun.awt.PeerEvent (target, runnable, 1));
}, "~O,Runnable");
c$.executeOnEventHandlerThread = Clazz.defineMethod (c$, "executeOnEventHandlerThread", 
function (target, runnable, when) {
sun.awt.SunToolkit.executeOnEventHandlerThread (((Clazz.isClassDefined ("sun.awt.SunToolkit$2") ? 0 : sun.awt.SunToolkit.$SunToolkit$2$ ()), Clazz.innerTypeInstance (sun.awt.SunToolkit$2, this, Clazz.cloneFinals ("when", when), target, runnable, 1)));
}, "~O,Runnable,~N");
c$.executeOnEventHandlerThread = Clazz.defineMethod (c$, "executeOnEventHandlerThread", 
function (peerEvent) {
sun.awt.SunToolkit.postEvent (sun.awt.SunToolkit.targetToAppContext (peerEvent.getSource ()), peerEvent);
}, "sun.awt.PeerEvent");
c$.invokeLaterOnAppContext = Clazz.defineMethod (c$, "invokeLaterOnAppContext", 
function (appContext, dispatcher) {
sun.awt.SunToolkit.postEvent (appContext,  new sun.awt.PeerEvent (java.awt.Toolkit.getDefaultToolkit (), dispatcher, 1));
}, "sun.awt.AppContext,Runnable");
c$.isDispatchThreadForAppContext = Clazz.defineMethod (c$, "isDispatchThreadForAppContext", 
function (target) {
var appContext = sun.awt.SunToolkit.targetToAppContext (target);
var eq = appContext.get (sun.awt.AppContext.EVENT_QUEUE_KEY);
var next = sun.awt.AWTAccessor.getEventQueueAccessor ().getNextQueue (eq);
while (next != null) {
eq = next;
next = sun.awt.AWTAccessor.getEventQueueAccessor ().getNextQueue (eq);
}
return (Thread.currentThread () === sun.awt.AWTAccessor.getEventQueueAccessor ().getDispatchThread (eq));
}, "~O");
Clazz.overrideMethod (c$, "getScreenSize", 
function () {
return  new java.awt.Dimension (this.getScreenWidth (), this.getScreenHeight ());
});
Clazz.overrideMethod (c$, "getFontMetrics", 
function (font) {
return sun.font.FontDesignMetrics.getMetrics (font);
}, "java.awt.Font");
Clazz.overrideMethod (c$, "getFontList", 
function () {
var hardwiredFontList =  Clazz.newArray (-1, ["Dialog", "SansSerif", "Serif", "Monospaced", "DialogInput"]);
return hardwiredFontList;
});
Clazz.overrideMethod (c$, "createPanel", 
function (target) {
return this.createComponent (target);
}, "java.awt.Panel");
Clazz.defineMethod (c$, "disableBackgroundErase", 
function (component) {
this.disableBackgroundEraseImpl (component);
}, "java.awt.Component");
Clazz.defineMethod (c$, "disableBackgroundEraseImpl", 
 function (component) {
sun.awt.AWTAccessor.getComponentAccessor ().setBackgroundEraseDisabled (component, true);
}, "java.awt.Component");
c$.getSunAwtNoerasebackground = Clazz.defineMethod (c$, "getSunAwtNoerasebackground", 
function () {
return false;
});
c$.getSunAwtErasebackgroundonresize = Clazz.defineMethod (c$, "getSunAwtErasebackgroundonresize", 
function () {
return true;
});
Clazz.defineMethod (c$, "setOverrideRedirect", 
function (target) {
}, "java.awt.Window");
c$.getImageFromHash = Clazz.defineMethod (c$, "getImageFromHash", 
function (tk, url) {
var img = sun.awt.SunToolkit.imgCache.get (url);
if (img == null) {
try {
img = tk.createImage (url);
sun.awt.SunToolkit.imgCache.put (url, img);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}return img;
}, "java.awt.Toolkit,java.net.URL");
c$.getImageFromHash = Clazz.defineMethod (c$, "getImageFromHash", 
function (tk, filename) {
var img = sun.awt.SunToolkit.imgCache.get (filename);
if (img == null) {
try {
tk.createImage (filename);
sun.awt.SunToolkit.imgCache.put (filename, img);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}return img;
}, "java.awt.Toolkit,~S");
Clazz.defineMethod (c$, "getImage", 
function (filename) {
return sun.awt.SunToolkit.getImageFromHash (this, filename);
}, "~S");
Clazz.defineMethod (c$, "getImage", 
function (url) {
return sun.awt.SunToolkit.getImageFromHash (this, url);
}, "java.net.URL");
Clazz.overrideMethod (c$, "checkImage", 
function (img, w, h, o) {
return 0;
}, "java.awt.Image,~N,~N,java.awt.image.ImageObserver");
Clazz.overrideMethod (c$, "prepareImage", 
function (img, w, h, o) {
if (w == 0 || h == 0) {
return true;
}return true;
}, "java.awt.Image,~N,~N,java.awt.image.ImageObserver");
Clazz.overrideMethod (c$, "getSystemEventQueueImpl", 
function () {
return sun.awt.SunToolkit.getSystemEventQueueImplPP (sun.awt.AppContext.getAppContext ());
});
c$.getSystemEventQueueImplPPS = Clazz.defineMethod (c$, "getSystemEventQueueImplPPS", 
function () {
return sun.awt.SunToolkit.getSystemEventQueueImplPP (sun.awt.AppContext.getAppContext ());
});
c$.getSystemEventQueueImplPP = Clazz.defineMethod (c$, "getSystemEventQueueImplPP", 
function (appContext) {
var theEventQueue = appContext.get (sun.awt.AppContext.EVENT_QUEUE_KEY);
return theEventQueue;
}, "sun.awt.AppContext");
c$.getNativeContainer = Clazz.defineMethod (c$, "getNativeContainer", 
function (c) {
return java.awt.Toolkit.getNativeContainer (c);
}, "java.awt.Component");
Clazz.defineMethod (c$, "enableInputMethodsForTextComponent", 
function () {
return false;
});
c$.getStartupLocale = Clazz.defineMethod (c$, "getStartupLocale", 
function () {
if (sun.awt.SunToolkit.startupLocale == null) {
{
}}return sun.awt.SunToolkit.startupLocale;
});
Clazz.defineMethod (c$, "getDefaultKeyboardLocale", 
function () {
return sun.awt.SunToolkit.getStartupLocale ();
});
c$.setDataTransfererClassName = Clazz.defineMethod (c$, "setDataTransfererClassName", 
function (className) {
sun.awt.SunToolkit.dataTransfererClassName = className;
}, "~S");
c$.getDataTransfererClassName = Clazz.defineMethod (c$, "getDataTransfererClassName", 
function () {
if (sun.awt.SunToolkit.dataTransfererClassName == null) {
java.awt.Toolkit.getDefaultToolkit ();
}return sun.awt.SunToolkit.dataTransfererClassName;
});
Clazz.overrideMethod (c$, "getWindowClosingListener", 
function () {
return this.windowClosingListener;
});
Clazz.overrideMethod (c$, "setWindowClosingListener", 
function (wcl) {
this.windowClosingListener = wcl;
}, "sun.awt.WindowClosingListener");
Clazz.defineMethod (c$, "windowClosingNotify", 
function (event) {
if (this.windowClosingListener != null) {
return this.windowClosingListener.windowClosingNotify (event);
} else {
return null;
}}, "java.awt.event.WindowEvent");
Clazz.defineMethod (c$, "windowClosingDelivered", 
function (event) {
if (this.windowClosingListener != null) {
return this.windowClosingListener.windowClosingDelivered (event);
} else {
return null;
}}, "java.awt.event.WindowEvent");
c$.isModalExcluded = Clazz.defineMethod (c$, "isModalExcluded", 
function (window) {
return true;
}, "java.awt.Window");
c$.isLightweightOrUnknown = Clazz.defineMethod (c$, "isLightweightOrUnknown", 
function (comp) {
if (comp.isLightweight () || !(Clazz.instanceOf (java.awt.Toolkit.getDefaultToolkit (), sun.awt.SunToolkit))) {
return true;
}return !(Clazz.instanceOf (comp, java.awt.Panel) || Clazz.instanceOf (comp, java.awt.Window));
}, "java.awt.Component");
Clazz.defineMethod (c$, "getDesktopAAHints", 
function () {
return null;
});
c$.getContainingWindow = Clazz.defineMethod (c$, "getContainingWindow", 
function (comp) {
while (comp != null && !(Clazz.instanceOf (comp, java.awt.Window))) {
comp = comp.getParent ();
}
return comp;
}, "java.awt.Component");
Clazz.defineMethod (c$, "isNativeGTKAvailable", 
function () {
return false;
});
Clazz.defineMethod (c$, "isWindowOpacitySupported", 
function () {
return false;
});
Clazz.defineMethod (c$, "isWindowShapingSupported", 
function () {
return false;
});
Clazz.defineMethod (c$, "isWindowTranslucencySupported", 
function () {
return false;
});
Clazz.defineMethod (c$, "isTranslucencyCapable", 
function (gc) {
return false;
}, "java.awt.GraphicsConfiguration");
Clazz.defineMethod (c$, "needUpdateWindow", 
function () {
return false;
});
c$.$SunToolkit$1$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.declareAnonymous (sun.awt, "SunToolkit$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
sun.awt.AWTAccessor.getAWTEventAccessor ().setPosted (this.$finals.e);
(this.$finals.e.getSource ()).dispatchEvent (this.$finals.e);
});
c$ = Clazz.p0p ();
};
c$.$SunToolkit$2$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.declareAnonymous (sun.awt, "SunToolkit$2", sun.awt.PeerEvent);
Clazz.overrideMethod (c$, "getWhen", 
function () {
return this.$finals.when;
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"GRAB_EVENT_MASK", 0x80000000,
"POST_EVENT_QUEUE_KEY", "PostEventQueue");
c$.appContextMap = c$.prototype.appContextMap =  new java.util.HashMap ();
c$.imgCache = c$.prototype.imgCache =  new java.util.HashMap ();
Clazz.defineStatics (c$,
"startupLocale", null,
"dataTransfererClassName", null,
"DESKTOPFONTHINTS", "awt.font.desktophints");
});
