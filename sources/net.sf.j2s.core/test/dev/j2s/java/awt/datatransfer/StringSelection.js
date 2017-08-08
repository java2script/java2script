Clazz.declarePackage ("java.awt.datatransfer");
Clazz.load (["java.awt.datatransfer.ClipboardOwner", "$.Transferable", "$.DataFlavor"], "java.awt.datatransfer.StringSelection", ["java.io.StringReader", "java.awt.datatransfer.UnsupportedFlavorException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.data = null;
Clazz.instantialize (this, arguments);
}, java.awt.datatransfer, "StringSelection", null, [java.awt.datatransfer.Transferable, java.awt.datatransfer.ClipboardOwner]);
Clazz.makeConstructor (c$, 
function (data) {
this.data = data;
}, "~S");
Clazz.overrideMethod (c$, "getTransferDataFlavors", 
function () {
return java.awt.datatransfer.StringSelection.flavors.clone ();
});
Clazz.overrideMethod (c$, "isDataFlavorSupported", 
function (flavor) {
for (var i = 0; i < java.awt.datatransfer.StringSelection.flavors.length; i++) {
if (flavor.equals (java.awt.datatransfer.StringSelection.flavors[i])) {
return true;
}}
return false;
}, "java.awt.datatransfer.DataFlavor");
Clazz.overrideMethod (c$, "getTransferData", 
function (flavor) {
if (flavor.equals (java.awt.datatransfer.StringSelection.flavors[0])) {
return this.data;
} else if (flavor.equals (java.awt.datatransfer.StringSelection.flavors[1])) {
return  new java.io.StringReader (this.data == null ? "" : this.data);
} else {
throw  new java.awt.datatransfer.UnsupportedFlavorException (flavor);
}}, "java.awt.datatransfer.DataFlavor");
Clazz.overrideMethod (c$, "lostOwnership", 
function (clipboard, contents) {
}, "java.awt.datatransfer.Clipboard,java.awt.datatransfer.Transferable");
Clazz.defineStatics (c$,
"STRING", 0,
"PLAIN_TEXT", 1);
c$.flavors = c$.prototype.flavors =  Clazz.newArray (-1, [java.awt.datatransfer.DataFlavor.stringFlavor, java.awt.datatransfer.DataFlavor.plainTextFlavor]);
});
