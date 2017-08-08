Clazz.declarePackage ("java.awt.dnd");
Clazz.load (["java.awt.dnd.DropTargetEvent"], "java.awt.dnd.DropTargetDragEvent", ["java.lang.IllegalArgumentException", "$.NullPointerException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.location = null;
this.actions = 0;
this.dropAction = 0;
Clazz.instantialize (this, arguments);
}, java.awt.dnd, "DropTargetDragEvent", java.awt.dnd.DropTargetEvent);
Clazz.makeConstructor (c$, 
function (dtc, cursorLocn, dropAction, srcActions) {
Clazz.superConstructor (this, java.awt.dnd.DropTargetDragEvent, [dtc]);
if (cursorLocn == null) throw  new NullPointerException ("cursorLocn");
if (dropAction != 0 && dropAction != 1 && dropAction != 2 && dropAction != 1073741824) throw  new IllegalArgumentException ("dropAction" + dropAction);
if ((srcActions & -1073741828) != 0) throw  new IllegalArgumentException ("srcActions");
this.location = cursorLocn;
this.actions = srcActions;
this.dropAction = dropAction;
}, "java.awt.dnd.DropTargetContext,java.awt.Point,~N,~N");
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
Clazz.defineMethod (c$, "acceptDrag", 
function (dragOperation) {
this.getDropTargetContext ().acceptDrag (dragOperation);
}, "~N");
Clazz.defineMethod (c$, "rejectDrag", 
function () {
this.getDropTargetContext ().rejectDrag ();
});
});
