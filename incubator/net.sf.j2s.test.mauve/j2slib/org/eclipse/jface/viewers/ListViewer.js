Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["org.eclipse.jface.viewers.AbstractListViewer"], "org.eclipse.jface.viewers.ListViewer", ["org.eclipse.jface.util.Assert", "$wt.widgets.List"], function () {
c$ = Clazz.decorateAsClass (function () {
this.list = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "ListViewer", org.eclipse.jface.viewers.AbstractListViewer);
Clazz.makeConstructor (c$, 
function (parent) {
this.construct (parent, 2818);
}, "$wt.widgets.Composite");
Clazz.makeConstructor (c$, 
function (parent, style) {
this.construct ( new $wt.widgets.List (parent, style));
}, "$wt.widgets.Composite,~N");
Clazz.makeConstructor (c$, 
function (list) {
Clazz.superConstructor (this, org.eclipse.jface.viewers.ListViewer, []);
this.list = list;
this.hookControl (list);
}, "$wt.widgets.List");
Clazz.overrideMethod (c$, "getControl", 
function () {
return this.list;
});
Clazz.defineMethod (c$, "getList", 
function () {
return this.list;
});
Clazz.overrideMethod (c$, "reveal", 
function (element) {
org.eclipse.jface.util.Assert.isNotNull (element);
var index = this.getElementIndex (element);
if (index == -1) return ;
var count = this.list.getItemCount ();
if (count == 0) return ;
var height = this.list.getItemHeight ();
var rect = this.list.getClientArea ();
var topIndex = this.list.getTopIndex ();
var visibleCount = Math.max (Math.floor ((rect.x + rect.height) / height), 1);
var bottomIndex = Math.min (topIndex + visibleCount + 1, count - 1);
if ((topIndex <= index) && (index <= bottomIndex)) return ;
var newTop = Math.min (Math.max (index - (Math.floor (visibleCount / 2)), 0), count - 1);
this.list.setTopIndex (newTop);
}, "~O");
Clazz.overrideMethod (c$, "listAdd", 
function (string, index) {
this.list.add (string, index);
}, "~S,~N");
Clazz.overrideMethod (c$, "listSetItem", 
function (index, string) {
this.list.setItem (index, string);
}, "~N,~S");
Clazz.overrideMethod (c$, "listGetSelectionIndices", 
function () {
return this.list.getSelectionIndices ();
});
Clazz.overrideMethod (c$, "listGetItemCount", 
function () {
return this.list.getItemCount ();
});
Clazz.overrideMethod (c$, "listSetItems", 
function (labels) {
this.list.setItems (labels);
}, "~A");
Clazz.overrideMethod (c$, "listRemoveAll", 
function () {
this.list.removeAll ();
});
Clazz.overrideMethod (c$, "listRemove", 
function (index) {
this.list.remove (index);
}, "~N");
Clazz.overrideMethod (c$, "listSetSelection", 
function (ixs) {
this.list.setSelection (ixs);
}, "~A");
Clazz.overrideMethod (c$, "listDeselectAll", 
function () {
this.list.deselectAll ();
});
Clazz.overrideMethod (c$, "listShowSelection", 
function () {
this.list.showSelection ();
});
});
