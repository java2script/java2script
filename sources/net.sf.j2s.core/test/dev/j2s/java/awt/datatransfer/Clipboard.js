Clazz.declarePackage ("java.awt.datatransfer");
Clazz.load (null, "java.awt.datatransfer.Clipboard", ["java.awt.EventQueue", "java.lang.NullPointerException", "java.util.Arrays", "$.HashSet", "java.awt.datatransfer.FlavorEvent", "$.FlavorListener", "$.UnsupportedFlavorException", "sun.awt.EventListenerAggregate"], function () {
c$ = Clazz.decorateAsClass (function () {
this.name = null;
this.owner = null;
this.contents = null;
this.flavorListeners = null;
this.currentDataFlavors = null;
Clazz.instantialize (this, arguments);
}, java.awt.datatransfer, "Clipboard");
Clazz.makeConstructor (c$, 
function (name) {
this.name = name;
}, "~S");
Clazz.defineMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.defineMethod (c$, "setContents", 
function (contents, owner) {
var oldOwner = this.owner;
var oldContents = this.contents;
this.owner = owner;
this.contents = contents;
if (oldOwner != null && oldOwner !== owner) {
java.awt.EventQueue.invokeLater (((Clazz.isClassDefined ("java.awt.datatransfer.Clipboard$1") ? 0 : java.awt.datatransfer.Clipboard.$Clipboard$1$ ()), Clazz.innerTypeInstance (java.awt.datatransfer.Clipboard$1, this, Clazz.cloneFinals ("oldOwner", oldOwner, "oldContents", oldContents))));
}this.fireFlavorsChanged ();
}, "java.awt.datatransfer.Transferable,java.awt.datatransfer.ClipboardOwner");
Clazz.defineMethod (c$, "getContents", 
function (requestor) {
return this.contents;
}, "~O");
Clazz.defineMethod (c$, "getAvailableDataFlavors", 
function () {
var cntnts = this.getContents (null);
if (cntnts == null) {
return  new Array (0);
}return cntnts.getTransferDataFlavors ();
});
Clazz.defineMethod (c$, "isDataFlavorAvailable", 
function (flavor) {
if (flavor == null) {
throw  new NullPointerException ("flavor");
}var cntnts = this.getContents (null);
if (cntnts == null) {
return false;
}return cntnts.isDataFlavorSupported (flavor);
}, "java.awt.datatransfer.DataFlavor");
Clazz.defineMethod (c$, "getData", 
function (flavor) {
if (flavor == null) {
throw  new NullPointerException ("flavor");
}var cntnts = this.getContents (null);
if (cntnts == null) {
throw  new java.awt.datatransfer.UnsupportedFlavorException (flavor);
}return cntnts.getTransferData (flavor);
}, "java.awt.datatransfer.DataFlavor");
Clazz.defineMethod (c$, "addFlavorListener", 
function (listener) {
if (listener == null) {
return;
}if (this.flavorListeners == null) {
this.currentDataFlavors = this.getAvailableDataFlavorSet ();
this.flavorListeners =  new sun.awt.EventListenerAggregate (java.awt.datatransfer.FlavorListener);
}this.flavorListeners.add (listener);
}, "java.awt.datatransfer.FlavorListener");
Clazz.defineMethod (c$, "removeFlavorListener", 
function (listener) {
if (listener == null || this.flavorListeners == null) {
return;
}this.flavorListeners.remove (listener);
}, "java.awt.datatransfer.FlavorListener");
Clazz.defineMethod (c$, "getFlavorListeners", 
function () {
return this.flavorListeners == null ?  new Array (0) : this.flavorListeners.getListenersCopy ();
});
Clazz.defineMethod (c$, "fireFlavorsChanged", 
 function () {
if (this.flavorListeners == null) {
return;
}var prevDataFlavors = this.currentDataFlavors;
this.currentDataFlavors = this.getAvailableDataFlavorSet ();
if (prevDataFlavors.equals (this.currentDataFlavors)) {
return;
}var flavorListenerArray = this.flavorListeners.getListenersInternal ();
for (var i = 0; i < flavorListenerArray.length; i++) {
var listener = flavorListenerArray[i];
java.awt.EventQueue.invokeLater (((Clazz.isClassDefined ("java.awt.datatransfer.Clipboard$2") ? 0 : java.awt.datatransfer.Clipboard.$Clipboard$2$ ()), Clazz.innerTypeInstance (java.awt.datatransfer.Clipboard$2, this, Clazz.cloneFinals ("listener", listener))));
}
});
Clazz.defineMethod (c$, "getAvailableDataFlavorSet", 
 function () {
var set =  new java.util.HashSet ();
var contents = this.getContents (null);
if (contents != null) {
var flavors = contents.getTransferDataFlavors ();
if (flavors != null) {
set.addAll (java.util.Arrays.asList (flavors));
}}return set;
});
c$.$Clipboard$1$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.declareAnonymous (java.awt.datatransfer, "Clipboard$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.f$.oldOwner.lostOwnership (this.b$["java.awt.datatransfer.Clipboard"], this.f$.oldContents);
});
c$ = Clazz.p0p ();
};
c$.$Clipboard$2$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.declareAnonymous (java.awt.datatransfer, "Clipboard$2", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.f$.listener.flavorsChanged ( new java.awt.datatransfer.FlavorEvent (this.b$["java.awt.datatransfer.Clipboard"]));
});
c$ = Clazz.p0p ();
};
});
