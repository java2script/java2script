Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["org.eclipse.jface.viewers.ICheckable", "$.TableViewer", "org.eclipse.jface.util.ListenerList"], "org.eclipse.jface.viewers.CheckboxTableViewer", ["java.util.ArrayList", "org.eclipse.jface.util.Assert", "$.SafeRunnable", "org.eclipse.jface.viewers.CheckStateChangedEvent", "$.ColumnWeightData", "$.TableLayout", "$wt.widgets.Table", "$.TableColumn"], function () {
c$ = Clazz.decorateAsClass (function () {
this.checkStateListeners = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "CheckboxTableViewer", org.eclipse.jface.viewers.TableViewer, org.eclipse.jface.viewers.ICheckable);
Clazz.prepareFields (c$, function () {
this.checkStateListeners =  new org.eclipse.jface.util.ListenerList (3);
});
Clazz.makeConstructor (c$, 
function (parent) {
this.construct (parent, 2048);
}, "$wt.widgets.Composite");
Clazz.makeConstructor (c$, 
function (parent, style) {
this.construct (org.eclipse.jface.viewers.CheckboxTableViewer.createTable (parent, style));
}, "$wt.widgets.Composite,~N");
c$.newCheckList = Clazz.defineMethod (c$, "newCheckList", 
function (parent, style) {
var table =  new $wt.widgets.Table (parent, 32 | style);
return  new org.eclipse.jface.viewers.CheckboxTableViewer (table);
}, "$wt.widgets.Composite,~N");
Clazz.overrideMethod (c$, "addCheckStateListener", 
function (listener) {
this.checkStateListeners.add (listener);
}, "org.eclipse.jface.viewers.ICheckStateListener");
c$.createTable = Clazz.defineMethod (c$, "createTable", 
function (parent, style) {
var table =  new $wt.widgets.Table (parent, 32 | style);
 new $wt.widgets.TableColumn (table, 0);
var layout =  new org.eclipse.jface.viewers.TableLayout ();
layout.addColumnData ( new org.eclipse.jface.viewers.ColumnWeightData (100));
table.setLayout (layout);
return table;
}, "$wt.widgets.Composite,~N");
Clazz.defineMethod (c$, "fireCheckStateChanged", 
($fz = function (event) {
var array = this.checkStateListeners.getListeners ();
for (var i = 0; i < array.length; i++) {
var l = array[i];
org.eclipse.jface.util.SafeRunnable.run ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.CheckboxTableViewer$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "CheckboxTableViewer$1", org.eclipse.jface.util.SafeRunnable);
Clazz.defineMethod (c$, "run", 
function () {
this.f$.l.checkStateChanged (this.f$.event);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.CheckboxTableViewer$1, i$, v$);
}) (this, Clazz.cloneFinals ("l", l, "event", event)));
}
}, $fz.isPrivate = true, $fz), "org.eclipse.jface.viewers.CheckStateChangedEvent");
Clazz.overrideMethod (c$, "getChecked", 
function (element) {
var widget = this.findItem (element);
if (Clazz.instanceOf (widget, $wt.widgets.TableItem)) {
return (widget).getChecked ();
}return false;
}, "~O");
Clazz.defineMethod (c$, "getCheckedElements", 
function () {
var children = this.getTable ().getItems ();
var v =  new java.util.ArrayList (children.length);
for (var i = 0; i < children.length; i++) {
var item = children[i];
if (item.getChecked ()) v.add (item.getData ());
}
return v.toArray ();
});
Clazz.defineMethod (c$, "getGrayed", 
function (element) {
var widget = this.findItem (element);
if (Clazz.instanceOf (widget, $wt.widgets.TableItem)) {
return (widget).getGrayed ();
}return false;
}, "~O");
Clazz.defineMethod (c$, "getGrayedElements", 
function () {
var children = this.getTable ().getItems ();
var v =  new java.util.ArrayList (children.length);
for (var i = 0; i < children.length; i++) {
var item = children[i];
if (item.getGrayed ()) v.add (item.getData ());
}
return v.toArray ();
});
Clazz.defineMethod (c$, "handleSelect", 
function (event) {
if (event.detail == 32) {
Clazz.superCall (this, org.eclipse.jface.viewers.CheckboxTableViewer, "handleSelect", [event]);
var item = event.item;
var data = item.getData ();
if (data != null) {
this.fireCheckStateChanged ( new org.eclipse.jface.viewers.CheckStateChangedEvent (this, data, item.getChecked ()));
}} else Clazz.superCall (this, org.eclipse.jface.viewers.CheckboxTableViewer, "handleSelect", [event]);
}, "$wt.events.SelectionEvent");
Clazz.defineMethod (c$, "preservingSelection", 
function (updateCode) {
var children = this.getTable ().getItems ();
var checked = this.newHashtable (children.length * 2 + 1);
var grayed = this.newHashtable (children.length * 2 + 1);
for (var i = 0; i < children.length; i++) {
var item = children[i];
var data = item.getData ();
if (data != null) {
if (item.getChecked ()) checked.put (data, data);
if (item.getGrayed ()) grayed.put (data, data);
}}
Clazz.superCall (this, org.eclipse.jface.viewers.CheckboxTableViewer, "preservingSelection", [updateCode]);
children = this.getTable ().getItems ();
for (var i = 0; i < children.length; i++) {
var item = children[i];
var data = item.getData ();
if (data != null) {
item.setChecked (checked.containsKey (data));
item.setGrayed (grayed.containsKey (data));
}}
}, "Runnable");
Clazz.overrideMethod (c$, "removeCheckStateListener", 
function (listener) {
this.checkStateListeners.remove (listener);
}, "org.eclipse.jface.viewers.ICheckStateListener");
Clazz.defineMethod (c$, "setAllChecked", 
function (state) {
var children = this.getTable ().getItems ();
for (var i = 0; i < children.length; i++) {
var item = children[i];
item.setChecked (state);
}
}, "~B");
Clazz.defineMethod (c$, "setAllGrayed", 
function (state) {
var children = this.getTable ().getItems ();
for (var i = 0; i < children.length; i++) {
var item = children[i];
item.setGrayed (state);
}
}, "~B");
Clazz.overrideMethod (c$, "setChecked", 
function (element, state) {
org.eclipse.jface.util.Assert.isNotNull (element);
var widget = this.findItem (element);
if (Clazz.instanceOf (widget, $wt.widgets.TableItem)) {
(widget).setChecked (state);
return true;
}return false;
}, "~O,~B");
Clazz.defineMethod (c$, "setCheckedElements", 
function (elements) {
this.assertElementsNotNull (elements);
var set = this.newHashtable (elements.length * 2 + 1);
for (var i = 0; i < elements.length; ++i) {
set.put (elements[i], elements[i]);
}
var items = this.getTable ().getItems ();
for (var i = 0; i < items.length; ++i) {
var item = items[i];
var element = item.getData ();
if (element != null) {
var check = set.containsKey (element);
if (item.getChecked () != check) {
item.setChecked (check);
}}}
}, "~A");
Clazz.defineMethod (c$, "setGrayed", 
function (element, state) {
org.eclipse.jface.util.Assert.isNotNull (element);
var widget = this.findItem (element);
if (Clazz.instanceOf (widget, $wt.widgets.TableItem)) {
(widget).setGrayed (state);
return true;
}return false;
}, "~O,~B");
Clazz.defineMethod (c$, "setGrayedElements", 
function (elements) {
this.assertElementsNotNull (elements);
var set = this.newHashtable (elements.length * 2 + 1);
for (var i = 0; i < elements.length; ++i) {
set.put (elements[i], elements[i]);
}
var items = this.getTable ().getItems ();
for (var i = 0; i < items.length; ++i) {
var item = items[i];
var element = item.getData ();
if (element != null) {
var gray = set.containsKey (element);
if (item.getGrayed () != gray) {
item.setGrayed (gray);
}}}
}, "~A");
});
