Clazz.declarePackage ("java.awt.dnd");
Clazz.load (["java.awt.dnd.DropTargetEvent", "java.awt.Point"], "java.awt.dnd.DropTargetDropEvent", ["java.lang.IllegalArgumentException", "$.NullPointerException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.location = null;
this.actions = 0;
this.dropAction = 0;
this.isLocalTx = false;
Clazz.instantialize (this, arguments);
}, java.awt.dnd, "DropTargetDropEvent", java.awt.dnd.DropTargetEvent);
Clazz.prepareFields (c$, function () {
this.location = java.awt.dnd.DropTargetDropEvent.zero;
});
Clazz.makeConstructor (c$, 
function (dtc, cursorLocn, dropAction, srcActions) {
Clazz.superConstructor (this, java.awt.dnd.DropTargetDropEvent, [dtc]);
if (cursorLocn == null) throw  new NullPointerException ("cursorLocn");
if (dropAction != 0 && dropAction != 1 && dropAction != 2 && dropAction != 1073741824) throw  new IllegalArgumentException ("dropAction = " + dropAction);
if ((srcActions & -1073741828) != 0) throw  new IllegalArgumentException ("srcActions");
this.location = cursorLocn;
this.actions = srcActions;
this.dropAction = dropAction;
}, "java.awt.dnd.DropTargetContext,java.awt.Point,~N,~N");
Clazz.makeConstructor (c$, 
function (dtc, cursorLocn, dropAction, srcActions, isLocal) {
this.construct (dtc, cursorLocn, dropAction, srcActions);
this.isLocalTx = isLocal;
}, "java.awt.dnd.DropTargetContext,java.awt.Point,~N,~N,~B");
Clazz.defineMethod (c$, "getLocation", 
function () {
return this.location;
});
Clazz.defineMethod (c$, "getCurrentDataFlavors", 
function () {
return this.getDropTargetContext ().getCurrentDataFlavors ();
});
Clazz.defineMethod (c$, "getCurrentDataFlavorsAsList", 
function () {
return this.getDropTargetContext ().getCurrentDataFlavorsAsList ();
});
Clazz.defineMethod (c$, "isDataFlavorSupported", 
function (df) {
return this.getDropTargetContext ().isDataFlavorSupported (df);
}, "java.awt.datatransfer.DataFlavor");
Clazz.defineMethod (c$, "getSourceActions", 
function () {
return this.actions;
});
Clazz.defineMethod (c$, "getDropAction", 
function () {
return this.dropAction;
});
Clazz.defineMethod (c$, "getTransferable", 
function () {
return this.getDropTargetContext ().getTransferable ();
});
Clazz.defineMethod (c$, "acceptDrop", 
function (dropAction) {
this.getDropTargetContext ().acceptDrop (dropAction);
}, "~N");
Clazz.defineMethod (c$, "rejectDrop", 
function () {
this.getDropTargetContext ().rejectDrop ();
});
Clazz.defineMethod (c$, "dropComplete", 
function (success) {
this.getDropTargetContext ().dropComplete (success);
}, "~B");
Clazz.defineMethod (c$, "isLocalTransfer", 
function () {
return this.isLocalTx;
});
c$.zero = c$.prototype.zero =  new java.awt.Point (0, 0);
});
