Clazz.declarePackage ("org.eclipse.jface.dialogs");
Clazz.load (null, "org.eclipse.jface.dialogs.ControlEnableState", ["java.util.ArrayList"], function () {
c$ = Clazz.decorateAsClass (function () {
this.exceptions = null;
this.states = null;
if (!Clazz.isClassDefined ("org.eclipse.jface.dialogs.ControlEnableState.ItemState")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.item = null;
this.state = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.dialogs.ControlEnableState, "ItemState");
Clazz.makeConstructor (c$, 
function (a, b) {
this.item = a;
this.state = b;
}, "$wt.widgets.Control,~B");
Clazz.defineMethod (c$, "restore", 
function () {
if (this.item == null || this.item.isDisposed ()) return ;
this.item.setEnabled (this.state);
});
c$ = Clazz.p0p ();
}
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.dialogs, "ControlEnableState");
Clazz.makeConstructor (c$, 
function (w) {
this.construct (w, null);
}, "$wt.widgets.Control");
Clazz.makeConstructor (c$, 
function (w, exceptions) {
this.states =  new java.util.ArrayList ();
this.exceptions = exceptions;
this.readStateForAndDisable (w);
}, "$wt.widgets.Control,java.util.List");
c$.disable = Clazz.defineMethod (c$, "disable", 
function (w) {
return  new org.eclipse.jface.dialogs.ControlEnableState (w);
}, "$wt.widgets.Control");
c$.disable = Clazz.defineMethod (c$, "disable", 
function (w, exceptions) {
return  new org.eclipse.jface.dialogs.ControlEnableState (w, exceptions);
}, "$wt.widgets.Control,java.util.List");
Clazz.defineMethod (c$, "readStateForAndDisable", 
($fz = function (control) {
if ((this.exceptions != null && this.exceptions.contains (control))) return ;
if (Clazz.instanceOf (control, $wt.widgets.Composite)) {
var c = control;
var children = c.getChildren ();
for (var i = 0; i < children.length; i++) {
this.readStateForAndDisable (children[i]);
}
}this.states.add (Clazz.innerTypeInstance (org.eclipse.jface.dialogs.ControlEnableState.ItemState, this, null, control, control.getEnabled ()));
control.setEnabled (false);
}, $fz.isPrivate = true, $fz), "$wt.widgets.Control");
Clazz.defineMethod (c$, "restore", 
function () {
var size = this.states.size ();
for (var i = 0; i < size; i++) {
(this.states.get (i)).restore ();
}
});
});
