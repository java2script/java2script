Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["org.eclipse.jface.viewers.ICheckable", "$.TreeViewer", "org.eclipse.jface.util.ListenerList"], "org.eclipse.jface.viewers.CheckboxTreeViewer", ["java.util.ArrayList", "org.eclipse.jface.util.Assert", "$.SafeRunnable", "org.eclipse.jface.viewers.CheckStateChangedEvent", "$wt.widgets.Tree"], function () {
c$ = Clazz.decorateAsClass (function () {
this.checkStateListeners = null;
this.lastClickedItem = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "CheckboxTreeViewer", org.eclipse.jface.viewers.TreeViewer, org.eclipse.jface.viewers.ICheckable);
Clazz.prepareFields (c$, function () {
this.checkStateListeners =  new org.eclipse.jface.util.ListenerList (3);
});
Clazz.makeConstructor (c$, 
function (parent) {
this.construct (parent, 2048);
}, "$wt.widgets.Composite");
Clazz.makeConstructor (c$, 
function (parent, style) {
this.construct ( new $wt.widgets.Tree (parent, 32 | style));
}, "$wt.widgets.Composite,~N");
Clazz.overrideMethod (c$, "addCheckStateListener", 
function (listener) {
this.checkStateListeners.add (listener);
}, "org.eclipse.jface.viewers.ICheckStateListener");
Clazz.defineMethod (c$, "applyState", 
($fz = function (checked, grayed, widget) {
var items = this.getChildren (widget);
for (var i = 0; i < items.length; i++) {
var item = items[i];
if (Clazz.instanceOf (item, $wt.widgets.TreeItem)) {
var data = item.getData ();
if (data != null) {
var ti = item;
ti.setChecked (checked.containsKey (data));
ti.setGrayed (grayed.containsKey (data));
}}this.applyState (checked, grayed, item);
}
}, $fz.isPrivate = true, $fz), "org.eclipse.jface.viewers.CustomHashtable,org.eclipse.jface.viewers.CustomHashtable,$wt.widgets.Widget");
Clazz.defineMethod (c$, "fireCheckStateChanged", 
function (event) {
var array = this.checkStateListeners.getListeners ();
for (var i = 0; i < array.length; i++) {
var l = array[i];
org.eclipse.jface.util.SafeRunnable.run ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.CheckboxTreeViewer$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "CheckboxTreeViewer$1", org.eclipse.jface.util.SafeRunnable);
Clazz.defineMethod (c$, "run", 
function () {
this.f$.l.checkStateChanged (this.f$.event);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.CheckboxTreeViewer$1, i$, v$);
}) (this, Clazz.cloneFinals ("l", l, "event", event)));
}
}, "org.eclipse.jface.viewers.CheckStateChangedEvent");
Clazz.defineMethod (c$, "gatherState", 
($fz = function (checked, grayed, widget) {
var items = this.getChildren (widget);
for (var i = 0; i < items.length; i++) {
var item = items[i];
if (Clazz.instanceOf (item, $wt.widgets.TreeItem)) {
var data = item.getData ();
if (data != null) {
var ti = item;
if (ti.getChecked ()) checked.put (data, data);
if (ti.getGrayed ()) grayed.put (data, data);
}}this.gatherState (checked, grayed, item);
}
}, $fz.isPrivate = true, $fz), "org.eclipse.jface.viewers.CustomHashtable,org.eclipse.jface.viewers.CustomHashtable,$wt.widgets.Widget");
Clazz.overrideMethod (c$, "getChecked", 
function (element) {
var widget = this.findItem (element);
if (Clazz.instanceOf (widget, $wt.widgets.TreeItem)) return (widget).getChecked ();
return false;
}, "~O");
Clazz.defineMethod (c$, "getCheckedElements", 
function () {
var v =  new java.util.ArrayList ();
var tree = this.getControl ();
this.internalCollectChecked (v, tree);
return v.toArray ();
});
Clazz.defineMethod (c$, "getGrayed", 
function (element) {
var widget = this.findItem (element);
if (Clazz.instanceOf (widget, $wt.widgets.TreeItem)) {
return (widget).getGrayed ();
}return false;
}, "~O");
Clazz.defineMethod (c$, "getGrayedElements", 
function () {
var result =  new java.util.ArrayList ();
this.internalCollectGrayed (result, this.getControl ());
return result.toArray ();
});
Clazz.defineMethod (c$, "handleDoubleSelect", 
function (event) {
if (this.lastClickedItem != null) {
var item = this.lastClickedItem;
var data = item.getData ();
if (data != null) {
var state = item.getChecked ();
this.setChecked (data, !state);
this.fireCheckStateChanged ( new org.eclipse.jface.viewers.CheckStateChangedEvent (this, data, !state));
}this.lastClickedItem = null;
} else Clazz.superCall (this, org.eclipse.jface.viewers.CheckboxTreeViewer, "handleDoubleSelect", [event]);
}, "$wt.events.SelectionEvent");
Clazz.defineMethod (c$, "handleSelect", 
function (event) {
this.lastClickedItem = null;
if (event.detail == 32) {
var item = event.item;
this.lastClickedItem = item;
Clazz.superCall (this, org.eclipse.jface.viewers.CheckboxTreeViewer, "handleSelect", [event]);
var data = item.getData ();
if (data != null) {
this.fireCheckStateChanged ( new org.eclipse.jface.viewers.CheckStateChangedEvent (this, data, item.getChecked ()));
}} else Clazz.superCall (this, org.eclipse.jface.viewers.CheckboxTreeViewer, "handleSelect", [event]);
}, "$wt.events.SelectionEvent");
Clazz.defineMethod (c$, "internalCollectChecked", 
($fz = function (result, widget) {
var items = this.getChildren (widget);
for (var i = 0; i < items.length; i++) {
var item = items[i];
if (Clazz.instanceOf (item, $wt.widgets.TreeItem) && (item).getChecked ()) {
var data = item.getData ();
if (data != null) result.add (data);
}this.internalCollectChecked (result, item);
}
}, $fz.isPrivate = true, $fz), "java.util.List,$wt.widgets.Widget");
Clazz.defineMethod (c$, "internalCollectGrayed", 
($fz = function (result, widget) {
var items = this.getChildren (widget);
for (var i = 0; i < items.length; i++) {
var item = items[i];
if (Clazz.instanceOf (item, $wt.widgets.TreeItem) && (item).getGrayed ()) {
var data = item.getData ();
if (data != null) result.add (data);
}this.internalCollectGrayed (result, item);
}
}, $fz.isPrivate = true, $fz), "java.util.List,$wt.widgets.Widget");
Clazz.defineMethod (c$, "internalSetChecked", 
($fz = function (checkedElements, widget) {
var items = this.getChildren (widget);
for (var i = 0; i < items.length; i++) {
var item = items[i];
var data = item.getData ();
if (data != null) {
var checked = checkedElements.containsKey (data);
if (checked != item.getChecked ()) {
item.setChecked (checked);
}}this.internalSetChecked (checkedElements, item);
}
}, $fz.isPrivate = true, $fz), "org.eclipse.jface.viewers.CustomHashtable,$wt.widgets.Widget");
Clazz.defineMethod (c$, "internalSetGrayed", 
($fz = function (grayedElements, widget) {
var items = this.getChildren (widget);
for (var i = 0; i < items.length; i++) {
var item = items[i];
var data = item.getData ();
if (data != null) {
var grayed = grayedElements.containsKey (data);
if (grayed != item.getGrayed ()) {
item.setGrayed (grayed);
}}this.internalSetGrayed (grayedElements, item);
}
}, $fz.isPrivate = true, $fz), "org.eclipse.jface.viewers.CustomHashtable,$wt.widgets.Widget");
Clazz.defineMethod (c$, "preservingSelection", 
function (updateCode) {
var n = this.getItemCount (this.getControl ());
var checkedNodes = this.newHashtable (n * 2 + 1);
var grayedNodes = this.newHashtable (n * 2 + 1);
this.gatherState (checkedNodes, grayedNodes, this.getControl ());
Clazz.superCall (this, org.eclipse.jface.viewers.CheckboxTreeViewer, "preservingSelection", [updateCode]);
this.applyState (checkedNodes, grayedNodes, this.getControl ());
}, "Runnable");
Clazz.overrideMethod (c$, "removeCheckStateListener", 
function (listener) {
this.checkStateListeners.remove (listener);
}, "org.eclipse.jface.viewers.ICheckStateListener");
Clazz.overrideMethod (c$, "setChecked", 
function (element, state) {
org.eclipse.jface.util.Assert.isNotNull (element);
var widget = this.internalExpand (element, false);
if (Clazz.instanceOf (widget, $wt.widgets.TreeItem)) {
(widget).setChecked (state);
return true;
}return false;
}, "~O,~B");
Clazz.defineMethod (c$, "setCheckedChildren", 
($fz = function (item, state) {
this.createChildren (item);
var items = this.getChildren (item);
if (items != null) {
for (var i = 0; i < items.length; i++) {
var it = items[i];
if (it.getData () != null && (Clazz.instanceOf (it, $wt.widgets.TreeItem))) {
var treeItem = it;
treeItem.setChecked (state);
this.setCheckedChildren (treeItem, state);
}}
}}, $fz.isPrivate = true, $fz), "$wt.widgets.Item,~B");
Clazz.defineMethod (c$, "setCheckedElements", 
function (elements) {
this.assertElementsNotNull (elements);
var checkedElements = this.newHashtable (elements.length * 2 + 1);
for (var i = 0; i < elements.length; ++i) {
var element = elements[i];
this.internalExpand (element, false);
checkedElements.put (element, element);
}
var tree = this.getControl ();
tree.setRedraw (false);
this.internalSetChecked (checkedElements, tree);
tree.setRedraw (true);
}, "~A");
Clazz.defineMethod (c$, "setGrayed", 
function (element, state) {
org.eclipse.jface.util.Assert.isNotNull (element);
var widget = this.internalExpand (element, false);
if (Clazz.instanceOf (widget, $wt.widgets.TreeItem)) {
(widget).setGrayed (state);
return true;
}return false;
}, "~O,~B");
Clazz.defineMethod (c$, "setGrayChecked", 
function (element, state) {
org.eclipse.jface.util.Assert.isNotNull (element);
var widget = this.internalExpand (element, false);
if (Clazz.instanceOf (widget, $wt.widgets.TreeItem)) {
var item = widget;
item.setChecked (state);
item.setGrayed (state);
return true;
}return false;
}, "~O,~B");
Clazz.defineMethod (c$, "setGrayedElements", 
function (elements) {
this.assertElementsNotNull (elements);
var grayedElements = this.newHashtable (elements.length * 2 + 1);
for (var i = 0; i < elements.length; ++i) {
var element = elements[i];
this.internalExpand (element, false);
grayedElements.put (element, element);
}
var tree = this.getControl ();
tree.setRedraw (false);
this.internalSetGrayed (grayedElements, tree);
tree.setRedraw (true);
}, "~A");
Clazz.defineMethod (c$, "setParentsGrayed", 
function (element, state) {
org.eclipse.jface.util.Assert.isNotNull (element);
var widget = this.internalExpand (element, false);
if (Clazz.instanceOf (widget, $wt.widgets.TreeItem)) {
var item = widget;
item.setGrayed (state);
item = item.getParentItem ();
while (item != null) {
item.setGrayed (state);
item = item.getParentItem ();
}
return true;
}return false;
}, "~O,~B");
Clazz.defineMethod (c$, "setSubtreeChecked", 
function (element, state) {
var widget = this.internalExpand (element, false);
if (Clazz.instanceOf (widget, $wt.widgets.TreeItem)) {
var item = widget;
item.setChecked (state);
this.setCheckedChildren (item, state);
return true;
}return false;
}, "~O,~B");
});
