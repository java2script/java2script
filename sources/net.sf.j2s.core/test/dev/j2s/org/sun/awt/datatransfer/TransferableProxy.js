Clazz.declarePackage ("sun.awt.datatransfer");
Clazz.load (["java.awt.datatransfer.Transferable"], "sun.awt.datatransfer.TransferableProxy", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.transferable = null;
this.isLocal = false;
Clazz.instantialize (this, arguments);
}, sun.awt.datatransfer, "TransferableProxy", null, java.awt.datatransfer.Transferable);
Clazz.makeConstructor (c$, 
function (t, local) {
this.transferable = t;
this.isLocal = local;
}, "java.awt.datatransfer.Transferable,~B");
Clazz.defineMethod (c$, "getTransferDataFlavors", 
function () {
return this.transferable.getTransferDataFlavors ();
});
Clazz.defineMethod (c$, "isDataFlavorSupported", 
function (flavor) {
return this.transferable.isDataFlavorSupported (flavor);
}, "java.awt.datatransfer.DataFlavor");
Clazz.defineMethod (c$, "getTransferData", 
function (df) {
var data = this.transferable.getTransferData (df);
return data;
}, "java.awt.datatransfer.DataFlavor");
});
