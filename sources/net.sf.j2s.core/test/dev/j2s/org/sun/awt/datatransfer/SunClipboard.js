Clazz.declarePackage ("sun.awt.datatransfer");
Clazz.load (["java.awt.datatransfer.Clipboard", "java.beans.PropertyChangeListener", "java.awt.datatransfer.SystemFlavorMap"], "sun.awt.datatransfer.SunClipboard", ["java.lang.Boolean", "$.IllegalStateException", "$.NullPointerException", "$.StringBuffer", "java.awt.EventQueue", "java.awt.datatransfer.FlavorEvent", "$.FlavorListener", "$.UnsupportedFlavorException", "sun.awt.AppContext", "$.EventListenerAggregate", "$.PeerEvent", "$.SunToolkit", "sun.awt.datatransfer.ClipboardTransferable", "$.DataTransferer", "$.TransferableProxy"], function () {
c$ = Clazz.decorateAsClass (function () {
this.contentsContext = null;
this.CLIPBOARD_FLAVOR_LISTENER_KEY = null;
this.numberOfFlavorListeners = 0;
this.$currentDataFlavors = null;
Clazz.instantialize (this, arguments);
}, sun.awt.datatransfer, "SunClipboard", java.awt.datatransfer.Clipboard, java.beans.PropertyChangeListener);
Clazz.makeConstructor (c$, 
function (name) {
Clazz.superConstructor (this, sun.awt.datatransfer.SunClipboard, [name]);
this.CLIPBOARD_FLAVOR_LISTENER_KEY =  new StringBuffer (name + "_CLIPBOARD_FLAVOR_LISTENER_KEY");
}, "~S");
Clazz.overrideMethod (c$, "setContents", 
function (contents, owner) {
if (contents == null) {
throw  new NullPointerException ("contents");
}this.initContext ();
var oldOwner = this.owner;
var oldContents = this.contents;
try {
this.owner = owner;
this.contents =  new sun.awt.datatransfer.TransferableProxy (contents, true);
this.setContentsNative (contents);
} finally {
if (oldOwner != null && oldOwner !== owner) {
java.awt.EventQueue.invokeLater (((Clazz.isClassDefined ("sun.awt.datatransfer.SunClipboard$1") ? 0 : sun.awt.datatransfer.SunClipboard.$SunClipboard$1$ ()), Clazz.innerTypeInstance (sun.awt.datatransfer.SunClipboard$1, this, Clazz.cloneFinals ("oldOwner", oldOwner, "oldContents", oldContents))));
}}
}, "java.awt.datatransfer.Transferable,java.awt.datatransfer.ClipboardOwner");
Clazz.defineMethod (c$, "initContext", 
 function () {
var context = sun.awt.AppContext.getAppContext ();
if (this.contentsContext !== context) {
{
if (context.isDisposed ()) {
throw  new IllegalStateException ("Can't set contents from disposed AppContext");
}context.addPropertyChangeListener ("disposed", this);
}if (this.contentsContext != null) {
this.contentsContext.removePropertyChangeListener ("disposed", this);
}this.contentsContext = context;
}});
Clazz.overrideMethod (c$, "getContents", 
function (requestor) {
if (this.contents != null) {
return this.contents;
}return  new sun.awt.datatransfer.ClipboardTransferable (this);
}, "~O");
Clazz.defineMethod (c$, "getContextContents", 
 function () {
var context = sun.awt.AppContext.getAppContext ();
return (context === this.contentsContext) ? this.contents : null;
});
Clazz.overrideMethod (c$, "getAvailableDataFlavors", 
function () {
var cntnts = this.getContextContents ();
if (cntnts != null) {
return cntnts.getTransferDataFlavors ();
}var formats = this.getClipboardFormatsOpenClose ();
return sun.awt.datatransfer.DataTransferer.getInstance ().getFlavorsForFormatsAsArray (formats, sun.awt.datatransfer.SunClipboard.flavorMap);
});
Clazz.overrideMethod (c$, "isDataFlavorAvailable", 
function (flavor) {
if (flavor == null) {
throw  new NullPointerException ("flavor");
}var cntnts = this.getContextContents ();
if (cntnts != null) {
return cntnts.isDataFlavorSupported (flavor);
}var formats = this.getClipboardFormatsOpenClose ();
return sun.awt.datatransfer.SunClipboard.formatArrayAsDataFlavorSet (formats).contains (flavor);
}, "java.awt.datatransfer.DataFlavor");
Clazz.overrideMethod (c$, "getData", 
function (flavor) {
if (flavor == null) {
throw  new NullPointerException ("flavor");
}var cntnts = this.getContextContents ();
if (cntnts != null) {
return cntnts.getTransferData (flavor);
}var format = 0;
var data = null;
var localeTransferable = null;
try {
this.openClipboard (null);
var formats = this.getClipboardFormats ();
var lFormat = sun.awt.datatransfer.DataTransferer.getInstance ().getFlavorsForFormats (formats, sun.awt.datatransfer.SunClipboard.flavorMap).get (flavor);
if (lFormat == null) {
throw  new java.awt.datatransfer.UnsupportedFlavorException (flavor);
}format = lFormat.longValue ();
data = this.getClipboardData (format);
if (sun.awt.datatransfer.DataTransferer.getInstance ().isLocaleDependentTextFormat (format)) {
localeTransferable = this.createLocaleTransferable (formats);
}} finally {
this.closeClipboard ();
}
return sun.awt.datatransfer.DataTransferer.getInstance ().translateBytes (data, flavor, format, localeTransferable);
}, "java.awt.datatransfer.DataFlavor");
Clazz.defineMethod (c$, "createLocaleTransferable", 
function (formats) {
return null;
}, "~A");
Clazz.defineMethod (c$, "openClipboard", 
function (newOwner) {
}, "sun.awt.datatransfer.SunClipboard");
Clazz.defineMethod (c$, "closeClipboard", 
function () {
});
Clazz.overrideMethod (c$, "propertyChange", 
function (evt) {
if ("disposed".equals (evt.getPropertyName ()) && Boolean.TRUE.equals (evt.getNewValue ())) {
var disposedContext = evt.getSource ();
this.lostOwnershipLater (disposedContext);
}}, "java.beans.PropertyChangeEvent");
Clazz.defineMethod (c$, "lostOwnershipImpl", 
function () {
this.lostOwnershipLater (null);
});
Clazz.defineMethod (c$, "lostOwnershipLater", 
function (disposedContext) {
var context = this.contentsContext;
if (context == null) {
return;
}var runnable = ((Clazz.isClassDefined ("sun.awt.datatransfer.SunClipboard$2") ? 0 : sun.awt.datatransfer.SunClipboard.$SunClipboard$2$ ()), Clazz.innerTypeInstance (sun.awt.datatransfer.SunClipboard$2, this, Clazz.cloneFinals ("disposedContext", disposedContext)));
sun.awt.SunToolkit.postEvent (context,  new sun.awt.PeerEvent (this, runnable, 1));
}, "sun.awt.AppContext");
Clazz.defineMethod (c$, "getClipboardFormatsOpenClose", 
function () {
try {
this.openClipboard (null);
return this.getClipboardFormats ();
} finally {
this.closeClipboard ();
}
});
c$.formatArrayAsDataFlavorSet = Clazz.defineMethod (c$, "formatArrayAsDataFlavorSet", 
 function (formats) {
return (formats == null) ? null : sun.awt.datatransfer.DataTransferer.getInstance ().getFlavorsForFormatsAsSet (formats, sun.awt.datatransfer.SunClipboard.flavorMap);
}, "~A");
Clazz.overrideMethod (c$, "addFlavorListener", 
function (listener) {
if (listener == null) {
return;
}var appContext = sun.awt.AppContext.getAppContext ();
var contextFlavorListeners = appContext.get (this.CLIPBOARD_FLAVOR_LISTENER_KEY);
if (contextFlavorListeners == null) {
contextFlavorListeners =  new sun.awt.EventListenerAggregate (java.awt.datatransfer.FlavorListener);
appContext.put (this.CLIPBOARD_FLAVOR_LISTENER_KEY, contextFlavorListeners);
}contextFlavorListeners.add (listener);
if (this.numberOfFlavorListeners++ == 0) {
var currentFormats = null;
try {
this.openClipboard (null);
currentFormats = this.getClipboardFormats ();
} catch (exc) {
if (Clazz.exceptionOf (exc, IllegalStateException)) {
} else {
throw exc;
}
} finally {
this.closeClipboard ();
}
this.$currentDataFlavors = sun.awt.datatransfer.SunClipboard.formatArrayAsDataFlavorSet (currentFormats);
this.registerClipboardViewerChecked ();
}}, "java.awt.datatransfer.FlavorListener");
Clazz.overrideMethod (c$, "removeFlavorListener", 
function (listener) {
if (listener == null) {
return;
}var appContext = sun.awt.AppContext.getAppContext ();
var contextFlavorListeners = appContext.get (this.CLIPBOARD_FLAVOR_LISTENER_KEY);
if (contextFlavorListeners == null) {
return;
}if (contextFlavorListeners.remove (listener) && --this.numberOfFlavorListeners == 0) {
this.unregisterClipboardViewerChecked ();
this.$currentDataFlavors = null;
}}, "java.awt.datatransfer.FlavorListener");
Clazz.overrideMethod (c$, "getFlavorListeners", 
function () {
var contextFlavorListeners = sun.awt.AppContext.getAppContext ().get (this.CLIPBOARD_FLAVOR_LISTENER_KEY);
return contextFlavorListeners == null ?  new Array (0) : contextFlavorListeners.getListenersCopy ();
});
Clazz.defineMethod (c$, "areFlavorListenersRegistered", 
function () {
return (this.numberOfFlavorListeners > 0);
});
Clazz.defineMethod (c$, "checkChange", 
function (formats) {
var prevDataFlavors = this.$currentDataFlavors;
this.$currentDataFlavors = sun.awt.datatransfer.SunClipboard.formatArrayAsDataFlavorSet (formats);
if ((prevDataFlavors != null) && (this.$currentDataFlavors != null) && prevDataFlavors.equals (this.$currentDataFlavors)) {
return;
}if (!Clazz.isClassDefined ("sun.awt.datatransfer.SunClipboard$1SunFlavorChangeNotifier")) {
sun.awt.datatransfer.SunClipboard.$SunClipboard$1SunFlavorChangeNotifier$ ();
}
;for (var it = sun.awt.AppContext.getAppContexts ().iterator (); it.hasNext (); ) {
var appContext = it.next ();
if (appContext == null || appContext.isDisposed ()) {
continue;
}var flavorListeners = appContext.get (this.CLIPBOARD_FLAVOR_LISTENER_KEY);
if (flavorListeners != null) {
var flavorListenerArray = flavorListeners.getListenersInternal ();
for (var i = 0; i < flavorListenerArray.length; i++) {
sun.awt.SunToolkit.postEvent (appContext,  new sun.awt.PeerEvent (this, Clazz.innerTypeInstance (sun.awt.datatransfer.SunClipboard$1SunFlavorChangeNotifier, this, null, flavorListenerArray[i]), 1));
}
}}
}, "~A");
c$.$SunClipboard$1$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.declareAnonymous (sun.awt.datatransfer, "SunClipboard$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.$finals.oldOwner.lostOwnership (this.b$["sun.awt.datatransfer.SunClipboard"], this.$finals.oldContents);
});
c$ = Clazz.p0p ();
};
c$.$SunClipboard$2$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.declareAnonymous (sun.awt.datatransfer, "SunClipboard$2", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
var sunClipboard = this.b$["sun.awt.datatransfer.SunClipboard"];
var owner = null;
var contents = null;
{
var context = sunClipboard.contentsContext;
if (context == null) {
return;
}if (this.$finals.disposedContext == null || context === this.$finals.disposedContext) {
owner = sunClipboard.owner;
contents = sunClipboard.contents;
sunClipboard.contentsContext = null;
sunClipboard.owner = null;
sunClipboard.contents = null;
sunClipboard.clearNativeContext ();
context.removePropertyChangeListener ("disposed", sunClipboard);
} else {
return;
}}if (owner != null) {
owner.lostOwnership (sunClipboard, contents);
}});
c$ = Clazz.p0p ();
};
c$.$SunClipboard$1SunFlavorChangeNotifier$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.flavorListener = null;
Clazz.instantialize (this, arguments);
}, sun.awt.datatransfer, "SunClipboard$1SunFlavorChangeNotifier", null, Runnable);
Clazz.makeConstructor (c$, 
function (a) {
this.flavorListener = a;
}, "java.awt.datatransfer.FlavorListener");
Clazz.overrideMethod (c$, "run", 
function () {
if (this.flavorListener != null) {
this.flavorListener.flavorsChanged ( new java.awt.datatransfer.FlavorEvent (this.b$["sun.awt.datatransfer.SunClipboard"]));
}});
c$ = Clazz.p0p ();
};
c$.flavorMap = c$.prototype.flavorMap = java.awt.datatransfer.SystemFlavorMap.getDefaultFlavorMap ();
});
