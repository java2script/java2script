Clazz.declarePackage ("java.awt.dnd");
Clazz.load (null, "java.awt.dnd.DropTargetContext", ["java.util.Arrays", "java.awt.dnd.InvalidDnDOperationException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.dropTarget = null;
this.dropTargetContextPeer = null;
this.transferable = null;
Clazz.instantialize (this, arguments);
}, java.awt.dnd, "DropTargetContext", null, java.io.Serializable);
Clazz.makeConstructor (c$, 
function (dt) {
this.dropTarget = dt;
}, "java.awt.dnd.DropTarget");
Clazz.defineMethod (c$, "getDropTarget", 
function () {
return this.dropTarget;
});
Clazz.defineMethod (c$, "getComponent", 
function () {
return this.dropTarget.getComponent ();
});
Clazz.defineMethod (c$, "addNotify", 
function (dtcp) {
this.dropTargetContextPeer = dtcp;
}, "java.awt.dnd.peer.DropTargetContextPeer");
Clazz.defineMethod (c$, "removeNotify", 
function () {
this.dropTargetContextPeer = null;
this.transferable = null;
});
Clazz.defineMethod (c$, "setTargetActions", 
function (actions) {
var peer = this.getDropTargetContextPeer ();
if (peer != null) {
{
peer.setTargetActions (actions);
this.getDropTarget ().doSetDefaultActions (actions);
}} else {
this.getDropTarget ().doSetDefaultActions (actions);
}}, "~N");
Clazz.defineMethod (c$, "getTargetActions", 
function () {
var peer = this.getDropTargetContextPeer ();
return ((peer != null) ? peer.getTargetActions () : this.dropTarget.getDefaultActions ());
});
Clazz.defineMethod (c$, "dropComplete", 
function (success) {
var peer = this.getDropTargetContextPeer ();
if (peer != null) {
peer.dropComplete (success);
}}, "~B");
Clazz.defineMethod (c$, "acceptDrag", 
function (dragOperation) {
var peer = this.getDropTargetContextPeer ();
if (peer != null) {
peer.acceptDrag (dragOperation);
}}, "~N");
Clazz.defineMethod (c$, "rejectDrag", 
function () {
var peer = this.getDropTargetContextPeer ();
if (peer != null) {
peer.rejectDrag ();
}});
Clazz.defineMethod (c$, "acceptDrop", 
function (dropOperation) {
var peer = this.getDropTargetContextPeer ();
if (peer != null) {
peer.acceptDrop (dropOperation);
}}, "~N");
Clazz.defineMethod (c$, "rejectDrop", 
function () {
var peer = this.getDropTargetContextPeer ();
if (peer != null) {
peer.rejectDrop ();
}});
Clazz.defineMethod (c$, "getCurrentDataFlavors", 
function () {
var peer = this.getDropTargetContextPeer ();
return peer != null ? peer.getTransferDataFlavors () :  new Array (0);
});
Clazz.defineMethod (c$, "getCurrentDataFlavorsAsList", 
function () {
return java.util.Arrays.asList (this.getCurrentDataFlavors ());
});
Clazz.defineMethod (c$, "isDataFlavorSupported", 
function (df) {
return this.getCurrentDataFlavorsAsList ().contains (df);
}, "java.awt.datatransfer.DataFlavor");
Clazz.defineMethod (c$, "getTransferable", 
function () {
var peer = this.getDropTargetContextPeer ();
if (peer == null) {
throw  new java.awt.dnd.InvalidDnDOperationException ();
} else {
if (this.transferable == null) {
var t = peer.getTransferable ();
var isLocal = peer.isTransferableJVMLocal ();
}return this.transferable;
}});
Clazz.defineMethod (c$, "getDropTargetContextPeer", 
function () {
return this.dropTargetContextPeer;
});
});
