Clazz.declarePackage ("sun.awt.datatransfer");
Clazz.load (["java.awt.datatransfer.Transferable", "java.util.HashMap"], "sun.awt.datatransfer.ClipboardTransferable", ["java.io.IOException", "java.awt.datatransfer.UnsupportedFlavorException", "sun.awt.datatransfer.DataTransferer", "$.SunClipboard"], function () {
c$ = Clazz.decorateAsClass (function () {
this.flavorsToData = null;
this.flavors = null;
if (!Clazz.isClassDefined ("sun.awt.datatransfer.ClipboardTransferable.DataFactory")) {
sun.awt.datatransfer.ClipboardTransferable.$ClipboardTransferable$DataFactory$ ();
}
Clazz.instantialize (this, arguments);
}, sun.awt.datatransfer, "ClipboardTransferable", null, java.awt.datatransfer.Transferable);
Clazz.prepareFields (c$, function () {
this.flavorsToData =  new java.util.HashMap ();
this.flavors =  new Array (0);
});
Clazz.makeConstructor (c$, 
function (clipboard) {
clipboard.openClipboard (null);
try {
var formats = clipboard.getClipboardFormats ();
if (formats != null && formats.length > 0) {
var cached_data =  new java.util.HashMap (formats.length, 1.0);
var flavorsForFormats = sun.awt.datatransfer.DataTransferer.getInstance ().getFlavorsForFormats (formats, sun.awt.datatransfer.SunClipboard.flavorMap);
for (var iter = flavorsForFormats.keySet ().iterator (); iter.hasNext (); ) {
var flavor = iter.next ();
var lFormat = flavorsForFormats.get (flavor);
this.fetchOneFlavor (clipboard, flavor, lFormat, cached_data);
}
this.flavors = sun.awt.datatransfer.DataTransferer.getInstance ().setToSortedDataFlavorArray (this.flavorsToData.keySet (), flavorsForFormats);
}} finally {
clipboard.closeClipboard ();
}
}, "sun.awt.datatransfer.SunClipboard");
Clazz.defineMethod (c$, "fetchOneFlavor", 
 function (clipboard, flavor, lFormat, cached_data) {
if (!this.flavorsToData.containsKey (flavor)) {
var format = lFormat.longValue ();
var data = null;
if (!cached_data.containsKey (lFormat)) {
try {
data = clipboard.getClipboardData (format);
} catch (e$$) {
if (Clazz.exceptionOf (e$$, java.io.IOException)) {
var e = e$$;
{
data = e;
}
} else {
var e = e$$;
{
e.printStackTrace ();
}
}
}
cached_data.put (lFormat, data);
} else {
data = cached_data.get (lFormat);
}if (Clazz.instanceOf (data, java.io.IOException)) {
this.flavorsToData.put (flavor, data);
return false;
} else if (data != null) {
this.flavorsToData.put (flavor, Clazz.innerTypeInstance (sun.awt.datatransfer.ClipboardTransferable.DataFactory, this, null, format, data));
return true;
}}return false;
}, "sun.awt.datatransfer.SunClipboard,java.awt.datatransfer.DataFlavor,Long,java.util.HashMap");
Clazz.overrideMethod (c$, "getTransferDataFlavors", 
function () {
return this.flavors.clone ();
});
Clazz.overrideMethod (c$, "isDataFlavorSupported", 
function (flavor) {
return this.flavorsToData.containsKey (flavor);
}, "java.awt.datatransfer.DataFlavor");
Clazz.overrideMethod (c$, "getTransferData", 
function (flavor) {
if (!this.isDataFlavorSupported (flavor)) {
throw  new java.awt.datatransfer.UnsupportedFlavorException (flavor);
}var ret = this.flavorsToData.get (flavor);
if (Clazz.instanceOf (ret, java.io.IOException)) {
throw ret;
} else if (Clazz.instanceOf (ret, sun.awt.datatransfer.ClipboardTransferable.DataFactory)) {
var factory = ret;
ret = factory.getTransferData (flavor);
}return ret;
}, "java.awt.datatransfer.DataFlavor");
c$.$ClipboardTransferable$DataFactory$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.format = 0;
this.data = null;
Clazz.instantialize (this, arguments);
}, sun.awt.datatransfer.ClipboardTransferable, "DataFactory");
Clazz.makeConstructor (c$, 
function (a, b) {
this.format = a;
this.data = b;
}, "~N,~A");
Clazz.defineMethod (c$, "getTransferData", 
function (a) {
return sun.awt.datatransfer.DataTransferer.getInstance ().translateBytes (this.data, a, this.format, this.b$["sun.awt.datatransfer.ClipboardTransferable"]);
}, "java.awt.datatransfer.DataFlavor");
c$ = Clazz.p0p ();
};
});
