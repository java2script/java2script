Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["org.eclipse.jface.viewers.CellEditor"], "org.eclipse.jface.viewers.CheckboxCellEditor", ["java.lang.Boolean", "org.eclipse.jface.util.Assert"], function () {
c$ = Clazz.decorateAsClass (function () {
this.value = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "CheckboxCellEditor", org.eclipse.jface.viewers.CellEditor);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.jface.viewers.CheckboxCellEditor, []);
this.setStyle (0);
});
Clazz.makeConstructor (c$, 
function (parent) {
this.construct (parent, 0);
}, "$wt.widgets.Composite");
Clazz.overrideMethod (c$, "activate", 
function () {
this.value = !this.value;
this.fireApplyEditorValue ();
});
Clazz.overrideMethod (c$, "createControl", 
function (parent) {
return null;
}, "$wt.widgets.Composite");
Clazz.overrideMethod (c$, "doGetValue", 
function () {
return  new Boolean (this.value);
});
Clazz.overrideMethod (c$, "doSetFocus", 
function () {
});
Clazz.overrideMethod (c$, "doSetValue", 
function (value) {
org.eclipse.jface.util.Assert.isTrue (Clazz.instanceOf (value, Boolean));
this.value = (value).booleanValue ();
}, "~O");
Clazz.defineStatics (c$,
"$defaultStyle", 0);
});
