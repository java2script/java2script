Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["org.eclipse.jface.viewers.AbstractListViewer"], "org.eclipse.jface.viewers.ComboViewer", ["$wt.widgets.Combo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.combo = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "ComboViewer", org.eclipse.jface.viewers.AbstractListViewer);
Clazz.makeConstructor (c$, 
function (parent) {
this.construct (parent, 2056);
}, "$wt.widgets.Composite");
Clazz.makeConstructor (c$, 
function (parent, style) {
this.construct ( new $wt.widgets.Combo (parent, style));
}, "$wt.widgets.Composite,~N");
Clazz.makeConstructor (c$, 
function (list) {
Clazz.superConstructor (this, org.eclipse.jface.viewers.ComboViewer, []);
this.combo = list;
this.hookControl (list);
}, "$wt.widgets.Combo");
Clazz.overrideMethod (c$, "listAdd", 
function (string, index) {
this.combo.add (string, index);
}, "~S,~N");
Clazz.overrideMethod (c$, "listSetItem", 
function (index, string) {
this.combo.setItem (index, string);
}, "~N,~S");
Clazz.overrideMethod (c$, "listGetSelectionIndices", 
function () {
return [this.combo.getSelectionIndex ()];
});
Clazz.overrideMethod (c$, "listGetItemCount", 
function () {
return this.combo.getItemCount ();
});
Clazz.overrideMethod (c$, "listSetItems", 
function (labels) {
this.combo.setItems (labels);
}, "~A");
Clazz.overrideMethod (c$, "listRemoveAll", 
function () {
this.combo.removeAll ();
});
Clazz.overrideMethod (c$, "listRemove", 
function (index) {
this.combo.remove (index);
}, "~N");
Clazz.overrideMethod (c$, "getControl", 
function () {
return this.combo;
});
Clazz.defineMethod (c$, "getCombo", 
function () {
return this.combo;
});
Clazz.overrideMethod (c$, "reveal", 
function (element) {
return ;
}, "~O");
Clazz.overrideMethod (c$, "listSetSelection", 
function (ixs) {
for (var idx = 0; idx < ixs.length; idx++) {
this.combo.select (ixs[idx]);
}
}, "~A");
Clazz.overrideMethod (c$, "listDeselectAll", 
function () {
this.combo.deselectAll ();
this.combo.clearSelection ();
});
Clazz.overrideMethod (c$, "listShowSelection", 
function () {
});
});
