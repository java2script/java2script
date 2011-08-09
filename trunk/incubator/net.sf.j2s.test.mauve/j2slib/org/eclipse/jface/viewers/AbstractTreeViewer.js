Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["org.eclipse.jface.util.SafeRunnable", "org.eclipse.jface.viewers.StructuredViewer", "org.eclipse.jface.util.ListenerList"], "org.eclipse.jface.viewers.AbstractTreeViewer", ["java.util.ArrayList", "org.eclipse.jface.util.Assert", "org.eclipse.jface.viewers.CustomHashtable", "$.TreeExpansionEvent", "$wt.custom.BusyIndicator", "$wt.events.TreeListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.treeListeners = null;
this.$expandToLevel = 0;
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.AbstractTreeViewer.UpdateItemSafeRunnable")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.element = null;
this.item = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers.AbstractTreeViewer, "UpdateItemSafeRunnable", org.eclipse.jface.util.SafeRunnable);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, org.eclipse.jface.viewers.AbstractTreeViewer.UpdateItemSafeRunnable, []);
this.item = a;
this.element = b;
}, "$wt.widgets.Item,~O");
Clazz.defineMethod (c$, "run", 
function () {
this.b$["org.eclipse.jface.viewers.AbstractTreeViewer"].doUpdateItem (this.item, this.element);
});
c$ = Clazz.p0p ();
}
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "AbstractTreeViewer", org.eclipse.jface.viewers.StructuredViewer);
Clazz.prepareFields (c$, function () {
this.treeListeners =  new org.eclipse.jface.util.ListenerList (1);
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.jface.viewers.AbstractTreeViewer, []);
});
Clazz.defineMethod (c$, "add", 
function (parentElement, childElements) {
org.eclipse.jface.util.Assert.isNotNull (parentElement);
this.assertElementsNotNull (childElements);
var widget = this.findItem (parentElement);
if (widget == null) return ;
this.internalAdd (widget, parentElement, childElements);
}, "~O,~A");
Clazz.defineMethod (c$, "internalAdd", 
function (widget, parentElement, childElements) {
if (Clazz.instanceOf (widget, $wt.widgets.Item)) {
var ti = widget;
if (!this.getExpanded (ti)) {
var needDummy = this.isExpandable (parentElement);
var haveDummy = false;
var items = this.getItems (ti);
for (var i = 0; i < items.length; i++) {
if (items[i].getData () != null) {
this.disassociate (items[i]);
items[i].dispose ();
} else {
if (needDummy && !haveDummy) {
haveDummy = true;
} else {
items[i].dispose ();
}}}
if (needDummy && !haveDummy) this.newItem (ti, 0, -1);
return ;
}}if (childElements.length > 0) {
var filtered = this.filter (childElements);
if (this.getSorter () != null) this.getSorter ().sort (this, filtered);
this.createAddedElements (widget, filtered);
}}, "$wt.widgets.Widget,~O,~A");
Clazz.defineMethod (c$, "createAddedElements", 
($fz = function (widget, elements) {
if (elements.length == 1) {
if (this.equals (elements[0], widget.getData ())) return ;
}var sorter = this.getSorter ();
var items = this.getChildren (widget);
var lastInsertion = 0;
if (items.length == 0) {
for (var i = 0; i < elements.length; i++) {
this.createTreeItem (widget, elements[i], -1);
}
return ;
}for (var i = 0; i < elements.length; i++) {
var newItem = true;
var element = elements[i];
var index;
if (sorter == null) {
if (this.itemExists (items, element)) {
this.refresh (element);
newItem = false;
}index = -1;
} else {
lastInsertion = this.insertionPosition (items, sorter, lastInsertion, element);
if (lastInsertion == items.length) index = -1;
 else {
while (lastInsertion < items.length && sorter.compare (this, element, items[lastInsertion].getData ()) == 0) {
if (items[lastInsertion].getData ().equals (element)) {
this.refresh (element);
newItem = false;
}lastInsertion++;
}
if (lastInsertion == items.length) index = -1;
 else index = lastInsertion + i;
}}if (newItem) this.createTreeItem (widget, element, index);
}
}, $fz.isPrivate = true, $fz), "$wt.widgets.Widget,~A");
Clazz.defineMethod (c$, "itemExists", 
($fz = function (items, element) {
if (this.usingElementMap ()) return this.findItem (element) != null;
for (var i = 0; i < items.length; i++) {
if (items[i].getData ().equals (element)) return true;
}
return false;
}, $fz.isPrivate = true, $fz), "~A,~O");
Clazz.defineMethod (c$, "insertionPosition", 
($fz = function (items, sorter, lastInsertion, element) {
var size = items.length;
if (sorter == null) return size;
var min = lastInsertion;
var max = size - 1;
while (min <= max) {
var mid = Math.floor ((min + max) / 2);
var data = items[mid].getData ();
var compare = sorter.compare (this, data, element);
if (compare == 0) {
return mid;
}if (compare < 0) min = mid + 1;
 else max = mid - 1;
}
return min;
}, $fz.isPrivate = true, $fz), "~A,org.eclipse.jface.viewers.ViewerSorter,~N,~O");
Clazz.defineMethod (c$, "indexForElement", 
function (parent, element) {
var sorter = this.getSorter ();
var items = this.getChildren (parent);
var count = items.length;
if (sorter == null) return count;
var min = 0;
var max = count - 1;
while (min <= max) {
var mid = Math.floor ((min + max) / 2);
var data = items[mid].getData ();
var compare = sorter.compare (this, data, element);
if (compare == 0) {
while (compare == 0) {
++mid;
if (mid >= count) {
break;
}data = items[mid].getData ();
compare = sorter.compare (this, data, element);
}
return mid;
}if (compare < 0) min = mid + 1;
 else max = mid - 1;
}
return min;
}, "$wt.widgets.Widget,~O");
Clazz.defineMethod (c$, "add", 
function (parentElement, childElement) {
this.add (parentElement, [childElement]);
}, "~O,~O");
Clazz.defineMethod (c$, "addSelectionListener", 
function (control, listener) {
}, "$wt.widgets.Control,$wt.events.SelectionListener");
Clazz.defineMethod (c$, "addTreeListener", 
function (listener) {
this.treeListeners.add (listener);
}, "org.eclipse.jface.viewers.ITreeViewerListener");
Clazz.defineMethod (c$, "associate", 
function (element, item) {
var data = item.getData ();
if (data != null && data !== element && this.equals (data, element)) {
this.unmapElement (data, item);
item.setData (element);
this.mapElement (element, item);
} else {
Clazz.superCall (this, org.eclipse.jface.viewers.AbstractTreeViewer, "associate", [element, item]);
}}, "~O,$wt.widgets.Item");
Clazz.defineMethod (c$, "collapseAll", 
function () {
var root = this.getRoot ();
if (root != null) {
this.collapseToLevel (root, -1);
}});
Clazz.defineMethod (c$, "collapseToLevel", 
function (element, level) {
org.eclipse.jface.util.Assert.isNotNull (element);
var w = this.findItem (element);
if (w != null) this.internalCollapseToLevel (w, level);
}, "~O,~N");
Clazz.defineMethod (c$, "createChildren", 
function (widget) {
var tis = this.getChildren (widget);
if (tis != null && tis.length > 0) {
var data = tis[0].getData ();
if (data != null) return ;
}$wt.custom.BusyIndicator.showWhile (widget.getDisplay (), (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.AbstractTreeViewer$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "AbstractTreeViewer$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
if (this.f$.tis != null) {
for (var i = 0; i < this.f$.tis.length; i++) {
if (this.f$.tis[i].getData () != null) {
this.b$["org.eclipse.jface.viewers.AbstractTreeViewer"].disassociate (this.f$.tis[i]);
org.eclipse.jface.util.Assert.isTrue (this.f$.tis[i].getData () == null, "Second or later child is non -null");
}this.f$.tis[i].dispose ();
}
}var d = this.f$.widget.getData ();
if (d != null) {
var parentElement = d;
var children = this.b$["org.eclipse.jface.viewers.AbstractTreeViewer"].getSortedChildren (parentElement);
for (var i = 0; i < children.length; i++) {
this.b$["org.eclipse.jface.viewers.AbstractTreeViewer"].createTreeItem (this.f$.widget, children[i], -1);
}
}});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.AbstractTreeViewer$1, i$, v$);
}) (this, Clazz.cloneFinals ("tis", tis, "widget", widget)));
}, "$wt.widgets.Widget");
Clazz.defineMethod (c$, "createTreeItem", 
function (parent, element, index) {
var item = this.newItem (parent, 0, index);
this.updateItem (item, element);
this.updatePlus (item, element);
}, "$wt.widgets.Widget,~O,~N");
Clazz.defineMethod (c$, "disassociate", 
function (item) {
Clazz.superCall (this, org.eclipse.jface.viewers.AbstractTreeViewer, "disassociate", [item]);
if (this.usingElementMap ()) this.disassociateChildren (item);
}, "$wt.widgets.Item");
Clazz.defineMethod (c$, "disassociateChildren", 
($fz = function (item) {
var items = this.getChildren (item);
for (var i = 0; i < items.length; i++) {
if (items[i].getData () != null) this.disassociate (items[i]);
}
}, $fz.isPrivate = true, $fz), "$wt.widgets.Item");
Clazz.overrideMethod (c$, "doFindInputItem", 
function (element) {
var root = this.getRoot ();
if (root == null) return null;
if (this.equals (root, element)) return this.getControl ();
return null;
}, "~O");
Clazz.overrideMethod (c$, "doFindItem", 
function (element) {
var root = this.getRoot ();
if (root == null) return null;
var items = this.getChildren (this.getControl ());
if (items != null) {
for (var i = 0; i < items.length; i++) {
var o = this.internalFindItem (items[i], element);
if (o != null) return o;
}
}return null;
}, "~O");
Clazz.defineMethod (c$, "doUpdateItem", 
function (widget, element, fullMap) {
if (Clazz.instanceOf (widget, $wt.widgets.Item)) {
var item = widget;
if (fullMap) {
this.associate (element, item);
} else {
item.setData (element);
this.mapElement (element, item);
}org.eclipse.jface.util.SafeRunnable.run (Clazz.innerTypeInstance (org.eclipse.jface.viewers.AbstractTreeViewer.UpdateItemSafeRunnable, this, null, item, element));
}}, "$wt.widgets.Widget,~O,~B");
Clazz.defineMethod (c$, "expandAll", 
function () {
this.expandToLevel (-1);
});
Clazz.defineMethod (c$, "expandToLevel", 
function (level) {
this.expandToLevel (this.getRoot (), level);
}, "~N");
Clazz.defineMethod (c$, "expandToLevel", 
function (element, level) {
var w = this.internalExpand (element, true);
if (w != null) this.internalExpandToLevel (w, level);
}, "~O,~N");
Clazz.defineMethod (c$, "fireTreeCollapsed", 
function (event) {
var listeners = this.treeListeners.getListeners ();
for (var i = 0; i < listeners.length; ++i) {
var l = listeners[i];
org.eclipse.jface.util.SafeRunnable.run ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.AbstractTreeViewer$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "AbstractTreeViewer$2", org.eclipse.jface.util.SafeRunnable);
Clazz.defineMethod (c$, "run", 
function () {
this.f$.l.treeCollapsed (this.f$.event);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.AbstractTreeViewer$2, i$, v$);
}) (this, Clazz.cloneFinals ("l", l, "event", event)));
}
}, "org.eclipse.jface.viewers.TreeExpansionEvent");
Clazz.defineMethod (c$, "fireTreeExpanded", 
function (event) {
var listeners = this.treeListeners.getListeners ();
for (var i = 0; i < listeners.length; ++i) {
var l = listeners[i];
org.eclipse.jface.util.SafeRunnable.run ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.AbstractTreeViewer$3")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "AbstractTreeViewer$3", org.eclipse.jface.util.SafeRunnable);
Clazz.defineMethod (c$, "run", 
function () {
this.f$.l.treeExpanded (this.f$.event);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.AbstractTreeViewer$3, i$, v$);
}) (this, Clazz.cloneFinals ("l", l, "event", event)));
}
}, "org.eclipse.jface.viewers.TreeExpansionEvent");
Clazz.defineMethod (c$, "getAutoExpandLevel", 
function () {
return this.$expandToLevel;
});
Clazz.defineMethod (c$, "getChild", 
function (widget, index) {
return this.getChildren (widget)[index];
}, "$wt.widgets.Widget,~N");
Clazz.defineMethod (c$, "getExpandedElements", 
function () {
var v =  new java.util.ArrayList ();
this.internalCollectExpanded (v, this.getControl ());
return v.toArray ();
});
Clazz.defineMethod (c$, "getExpandedState", 
function (element) {
org.eclipse.jface.util.Assert.isNotNull (element);
var item = this.findItem (element);
if (Clazz.instanceOf (item, $wt.widgets.Item)) return this.getExpanded (item);
return false;
}, "~O");
Clazz.defineMethod (c$, "getNextItem", 
function (item, includeChildren) {
if (item == null) {
return null;
}if (includeChildren && this.getExpanded (item)) {
var children = this.getItems (item);
if (children != null && children.length > 0) {
return children[0];
}}var parent = this.getParentItem (item);
if (parent == null) {
return null;
}var siblings = this.getItems (parent);
if (siblings != null) {
if (siblings.length <= 1) return this.getNextItem (parent, false);
for (var i = 0; i < siblings.length; i++) {
if (siblings[i] === item && i < (siblings.length - 1)) {
return siblings[i + 1];
}}
}return this.getNextItem (parent, false);
}, "$wt.widgets.Item,~B");
Clazz.defineMethod (c$, "getPreviousItem", 
function (item) {
var parent = this.getParentItem (item);
if (parent == null) {
return null;
}var siblings = this.getItems (parent);
if (siblings.length == 0 || siblings[0] === item) {
return parent;
}var previous = siblings[0];
for (var i = 1; i < siblings.length; i++) {
if (siblings[i] === item) {
return this.rightMostVisibleDescendent (previous);
}previous = siblings[i];
}
return null;
}, "$wt.widgets.Item");
Clazz.defineMethod (c$, "getRawChildren", 
function (parent) {
if (parent != null) {
if (this.equals (parent, this.getRoot ())) return Clazz.superCall (this, org.eclipse.jface.viewers.AbstractTreeViewer, "getRawChildren", [parent]);
var cp = this.getContentProvider ();
if (cp != null) {
var result = cp.getChildren (parent);
if (result != null) return result;
}}return  new Array (0);
}, "~O");
Clazz.overrideMethod (c$, "getSelectionFromWidget", 
function () {
var items = this.getSelection (this.getControl ());
var list =  new java.util.ArrayList (items.length);
for (var i = 0; i < items.length; i++) {
var item = items[i];
var e = item.getData ();
if (e != null) list.add (e);
}
return list;
});
Clazz.defineMethod (c$, "handleTreeCollapse", 
function (event) {
if (event.item.getData () != null) {
this.fireTreeCollapsed ( new org.eclipse.jface.viewers.TreeExpansionEvent (this, event.item.getData ()));
}}, "$wt.events.TreeEvent");
Clazz.defineMethod (c$, "handleTreeExpand", 
function (event) {
this.createChildren (event.item);
if (event.item.getData () != null) {
this.fireTreeExpanded ( new org.eclipse.jface.viewers.TreeExpansionEvent (this, event.item.getData ()));
}}, "$wt.events.TreeEvent");
Clazz.defineMethod (c$, "hookControl", 
function (control) {
Clazz.superCall (this, org.eclipse.jface.viewers.AbstractTreeViewer, "hookControl", [control]);
this.addTreeListener (control, (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.AbstractTreeViewer$4")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "AbstractTreeViewer$4", null, $wt.events.TreeListener);
Clazz.overrideMethod (c$, "treeExpanded", 
function (event) {
this.b$["org.eclipse.jface.viewers.AbstractTreeViewer"].handleTreeExpand (event);
}, "$wt.events.TreeEvent");
Clazz.overrideMethod (c$, "treeCollapsed", 
function (event) {
this.b$["org.eclipse.jface.viewers.AbstractTreeViewer"].handleTreeCollapse (event);
}, "$wt.events.TreeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.AbstractTreeViewer$4, i$, v$);
}) (this, null));
}, "$wt.widgets.Control");
Clazz.overrideMethod (c$, "inputChanged", 
function (input, oldInput) {
this.preservingSelection ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.AbstractTreeViewer$5")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "AbstractTreeViewer$5", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
var tree = this.b$["org.eclipse.jface.viewers.AbstractTreeViewer"].getControl ();
var useRedraw = true;
if (useRedraw) tree.setRedraw (false);
this.b$["org.eclipse.jface.viewers.AbstractTreeViewer"].removeAll (tree);
tree.setData (this.b$["org.eclipse.jface.viewers.AbstractTreeViewer"].getRoot ());
this.b$["org.eclipse.jface.viewers.AbstractTreeViewer"].createChildren (tree);
this.b$["org.eclipse.jface.viewers.AbstractTreeViewer"].internalExpandToLevel (tree, this.b$["org.eclipse.jface.viewers.AbstractTreeViewer"].$expandToLevel);
if (useRedraw) tree.setRedraw (true);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.AbstractTreeViewer$5, i$, v$);
}) (this, null));
}, "~O,~O");
Clazz.defineMethod (c$, "internalCollapseToLevel", 
function (widget, level) {
if (level == -1 || level > 0) {
if (Clazz.instanceOf (widget, $wt.widgets.Item)) this.setExpanded (widget, false);
if (level == -1 || level > 1) {
var children = this.getChildren (widget);
if (children != null) {
var nextLevel = (level == -1 ? -1 : level - 1);
for (var i = 0; i < children.length; i++) this.internalCollapseToLevel (children[i], nextLevel);

}}}}, "$wt.widgets.Widget,~N");
Clazz.defineMethod (c$, "internalCollectExpanded", 
($fz = function (result, widget) {
var items = this.getChildren (widget);
for (var i = 0; i < items.length; i++) {
var item = items[i];
if (this.getExpanded (item)) {
var data = item.getData ();
if (data != null) result.add (data);
}this.internalCollectExpanded (result, item);
}
}, $fz.isPrivate = true, $fz), "java.util.List,$wt.widgets.Widget");
Clazz.defineMethod (c$, "internalExpand", 
function (element, expand) {
if (element == null) return null;
var w = this.internalGetWidgetToSelect (element);
if (w == null) {
if (this.equals (element, this.getRoot ())) {
return null;
}var cp = this.getContentProvider ();
if (cp == null) {
return null;
}var parent = cp.getParent (element);
if (parent != null) {
var pw = this.internalExpand (parent, false);
if (pw != null) {
this.createChildren (pw);
if (Clazz.instanceOf (pw, $wt.widgets.Item)) {
var item = pw;
w = this.internalFindChild (item, element);
if (expand) {
while (item != null && !this.getExpanded (item)) {
this.setExpanded (item, true);
item = this.getParentItem (item);
}
}}}}}return w;
}, "~O,~B");
Clazz.defineMethod (c$, "internalGetWidgetToSelect", 
function (element) {
return this.findItem (element);
}, "~O");
Clazz.defineMethod (c$, "internalExpandToLevel", 
function (widget, level) {
if (level == -1 || level > 0) {
this.createChildren (widget);
if (Clazz.instanceOf (widget, $wt.widgets.Item)) this.setExpanded (widget, true);
if (level == -1 || level > 1) {
var children = this.getChildren (widget);
if (children != null) {
var newLevel = (level == -1 ? -1 : level - 1);
for (var i = 0; i < children.length; i++) this.internalExpandToLevel (children[i], newLevel);

}}}}, "$wt.widgets.Widget,~N");
Clazz.defineMethod (c$, "internalFindChild", 
($fz = function (parent, element) {
var items = this.getChildren (parent);
for (var i = 0; i < items.length; i++) {
var item = items[i];
var data = item.getData ();
if (data != null && this.equals (data, element)) return item;
}
return null;
}, $fz.isPrivate = true, $fz), "$wt.widgets.Item,~O");
Clazz.defineMethod (c$, "internalFindItem", 
($fz = function (parent, element) {
var data = parent.getData ();
if (data != null) {
if (this.equals (data, element)) return parent;
}var items = this.getChildren (parent);
for (var i = 0; i < items.length; i++) {
var item = items[i];
var o = this.internalFindItem (item, element);
if (o != null) return o;
}
return null;
}, $fz.isPrivate = true, $fz), "$wt.widgets.Item,~O");
Clazz.defineMethod (c$, "internalRefresh", 
function (element) {
this.internalRefresh (element, true);
}, "~O");
Clazz.defineMethod (c$, "internalRefresh", 
function (element, updateLabels) {
if (element == null) {
this.internalRefresh (this.getControl (), this.getRoot (), true, updateLabels);
return ;
}var item = this.findItem (element);
if (item != null) {
this.internalRefresh (item, element, true, updateLabels);
}}, "~O,~B");
Clazz.defineMethod (c$, "internalRefresh", 
function (widget, element, doStruct, updateLabels) {
if (Clazz.instanceOf (widget, $wt.widgets.Item)) {
if (doStruct) {
this.updatePlus (widget, element);
}if (updateLabels || !this.equals (element, widget.getData ())) {
this.doUpdateItem (widget, element, true);
} else {
this.associate (element, widget);
}}if (doStruct) {
this.internalRefreshStruct (widget, element, updateLabels);
} else {
var children = this.getChildren (widget);
if (children != null) {
for (var i = 0; i < children.length; i++) {
var item = children[i];
var data = item.getData ();
if (data != null) this.internalRefresh (item, data, doStruct, updateLabels);
}
}}}, "$wt.widgets.Widget,~O,~B,~B");
Clazz.defineMethod (c$, "internalRefreshStruct", 
($fz = function (widget, element, updateLabels) {
this.updateChildren (widget, element, null, updateLabels);
var children = this.getChildren (widget);
if (children != null) {
for (var i = 0; i < children.length; i++) {
var item = children[i];
var data = item.getData ();
if (data != null) this.internalRefreshStruct (item, data, updateLabels);
}
}}, $fz.isPrivate = true, $fz), "$wt.widgets.Widget,~O,~B");
Clazz.defineMethod (c$, "internalRemove", 
function (elements) {
var input = this.getInput ();
var parentItems =  new org.eclipse.jface.viewers.CustomHashtable (5);
for (var i = 0; i < elements.length; ++i) {
if (this.equals (elements[i], input)) {
this.setInput (null);
return ;
}var childItem = this.findItem (elements[i]);
if (Clazz.instanceOf (childItem, $wt.widgets.Item)) {
var parentItem = this.getParentItem (childItem);
if (parentItem != null) {
parentItems.put (parentItem, parentItem);
}this.disassociate (childItem);
childItem.dispose ();
}}
var tree = this.getControl ();
for (var e = parentItems.keys (); e.hasMoreElements (); ) {
var parentItem = e.nextElement ();
if (parentItem.isDisposed ()) continue ;if (!this.getExpanded (parentItem) && this.getItemCount (parentItem) == 0) {
if (this.isExpandable (parentItem.getData ())) {
this.newItem (parentItem, 0, -1);
} else {
tree.redraw ();
}}}
}, "~A");
Clazz.defineMethod (c$, "internalSetExpanded", 
($fz = function (expandedElements, widget) {
var items = this.getChildren (widget);
for (var i = 0; i < items.length; i++) {
var item = items[i];
var data = item.getData ();
if (data != null) {
var expanded = expandedElements.remove (data) != null;
if (expanded != this.getExpanded (item)) {
if (expanded) {
this.createChildren (item);
}this.setExpanded (item, expanded);
}}this.internalSetExpanded (expandedElements, item);
}
}, $fz.isPrivate = true, $fz), "org.eclipse.jface.viewers.CustomHashtable,$wt.widgets.Widget");
Clazz.defineMethod (c$, "isExpandable", 
function (element) {
var cp = this.getContentProvider ();
return cp != null && cp.hasChildren (element);
}, "~O");
Clazz.overrideMethod (c$, "labelProviderChanged", 
function () {
var tree = this.getControl ();
tree.setRedraw (false);
this.internalRefresh (tree, this.getRoot (), false, true);
tree.setRedraw (true);
});
Clazz.defineMethod (c$, "remove", 
function (elements) {
this.assertElementsNotNull (elements);
this.preservingSelection ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.AbstractTreeViewer$6")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "AbstractTreeViewer$6", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["org.eclipse.jface.viewers.AbstractTreeViewer"].internalRemove (this.f$.elements);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.AbstractTreeViewer$6, i$, v$);
}) (this, Clazz.cloneFinals ("elements", elements)));
}, "~A");
Clazz.defineMethod (c$, "remove", 
function (element) {
this.remove ([element]);
}, "~O");
Clazz.defineMethod (c$, "removeTreeListener", 
function (listener) {
this.treeListeners.remove (listener);
}, "org.eclipse.jface.viewers.ITreeViewerListener");
Clazz.overrideMethod (c$, "reveal", 
function (element) {
org.eclipse.jface.util.Assert.isNotNull (element);
var w = this.internalExpand (element, true);
if (Clazz.instanceOf (w, $wt.widgets.Item)) this.showItem (w);
}, "~O");
Clazz.defineMethod (c$, "rightMostVisibleDescendent", 
($fz = function (item) {
var children = this.getItems (item);
if (this.getExpanded (item) && children != null && children.length > 0) {
return this.rightMostVisibleDescendent (children[children.length - 1]);
}return item;
}, $fz.isPrivate = true, $fz), "$wt.widgets.Item");
Clazz.overrideMethod (c$, "scrollDown", 
function (x, y) {
var current = this.getItem (x, y);
if (current != null) {
var next = this.getNextItem (current, true);
this.showItem (next == null ? current : next);
return next;
}return null;
}, "~N,~N");
Clazz.overrideMethod (c$, "scrollUp", 
function (x, y) {
var current = this.getItem (x, y);
if (current != null) {
var previous = this.getPreviousItem (current);
this.showItem (previous == null ? current : previous);
return previous;
}return null;
}, "~N,~N");
Clazz.defineMethod (c$, "setAutoExpandLevel", 
function (level) {
this.$expandToLevel = level;
}, "~N");
Clazz.defineMethod (c$, "setContentProvider", 
function (provider) {
org.eclipse.jface.util.Assert.isTrue (Clazz.instanceOf (provider, org.eclipse.jface.viewers.ITreeContentProvider));
Clazz.superCall (this, org.eclipse.jface.viewers.AbstractTreeViewer, "setContentProvider", [provider]);
}, "org.eclipse.jface.viewers.IContentProvider");
Clazz.defineMethod (c$, "setExpandedElements", 
function (elements) {
this.assertElementsNotNull (elements);
var expandedElements = this.newHashtable (elements.length * 2 + 1);
for (var i = 0; i < elements.length; ++i) {
var element = elements[i];
this.internalExpand (element, false);
expandedElements.put (element, element);
}
this.internalSetExpanded (expandedElements, this.getControl ());
}, "~A");
Clazz.defineMethod (c$, "setExpandedState", 
function (element, expanded) {
org.eclipse.jface.util.Assert.isNotNull (element);
var item = this.internalExpand (element, false);
if (Clazz.instanceOf (item, $wt.widgets.Item)) {
if (expanded) {
this.createChildren (item);
}this.setExpanded (item, expanded);
}}, "~O,~B");
Clazz.defineMethod (c$, "setSelectionToWidget", 
function (v, reveal) {
if (v == null) {
this.setSelection ( new java.util.ArrayList (0));
return ;
}var size = v.size ();
var newSelection =  new java.util.ArrayList (size);
for (var i = 0; i < size; ++i) {
var w = this.internalExpand (v.get (i), false);
if (Clazz.instanceOf (w, $wt.widgets.Item)) {
newSelection.add (w);
}}
this.setSelection (newSelection);
if (reveal && newSelection.size () > 0) {
this.showItem (newSelection.get (0));
}}, "java.util.List,~B");
Clazz.defineMethod (c$, "updateChildren", 
function (widget, parent, elementChildren) {
this.updateChildren (widget, parent, elementChildren, true);
}, "$wt.widgets.Widget,~O,~A");
Clazz.defineMethod (c$, "updateChildren", 
($fz = function (widget, parent, elementChildren, updateLabels) {
if (Clazz.instanceOf (widget, $wt.widgets.Item)) {
var ti = widget;
if (!this.getExpanded (ti)) {
var needDummy = this.isExpandable (parent);
var haveDummy = false;
var items = this.getItems (ti);
for (var i = 0; i < items.length; i++) {
if (items[i].getData () != null) {
this.disassociate (items[i]);
items[i].dispose ();
} else {
if (needDummy && !haveDummy) {
haveDummy = true;
} else {
items[i].dispose ();
}}}
if (needDummy && !haveDummy) {
this.newItem (ti, 0, -1);
}return ;
}}if (elementChildren == null) {
elementChildren = this.getSortedChildren (parent);
}var tree = this.getControl ();
var oldCnt = -1;
if (widget === tree) oldCnt = this.getItemCount (tree);
var items = this.getChildren (widget);
var expanded = this.newHashtable (13);
for (var i = 0; i < items.length; ++i) {
if (this.getExpanded (items[i])) {
var element = items[i].getData ();
if (element != null) {
expanded.put (element, element);
}}}
var min = Math.min (elementChildren.length, items.length);
for (var i = items.length; --i >= min; ) {
if (items[i].getData () != null) {
this.disassociate (items[i]);
}items[i].dispose ();
}
for (var i = 0; i < min; ++i) {
var item = items[i];
var oldElement = item.getData ();
if (oldElement != null) {
var newElement = elementChildren[i];
if (newElement !== oldElement) {
if (this.equals (newElement, oldElement)) {
item.setData (newElement);
this.mapElement (newElement, item);
} else {
this.disassociate (item);
item.setImage (null);
item.setText ("");
}}}}
for (var i = 0; i < min; ++i) {
var item = items[i];
var newElement = elementChildren[i];
if (item.getData () == null) {
this.associate (newElement, item);
this.updatePlus (item, newElement);
this.updateItem (item, newElement);
this.setExpanded (item, expanded.containsKey (newElement));
} else {
this.updatePlus (item, newElement);
if (updateLabels) {
this.updateItem (item, newElement);
}}}
if (min < elementChildren.length) {
for (var i = min; i < elementChildren.length; ++i) {
this.createTreeItem (widget, elementChildren[i], i);
}
if (expanded.size () > 0) {
items = this.getChildren (widget);
for (var i = min; i < elementChildren.length; ++i) {
if (expanded.containsKey (elementChildren[i])) {
this.setExpanded (items[i], true);
}}
}}if (widget === tree && oldCnt == 0 && this.getItemCount (tree) != 0) {
tree.setRedraw (false);
tree.setRedraw (true);
}}, $fz.isPrivate = true, $fz), "$wt.widgets.Widget,~O,~A,~B");
Clazz.defineMethod (c$, "updatePlus", 
function (item, element) {
var hasPlus = this.getItemCount (item) > 0;
var needsPlus = this.isExpandable (element);
var removeAll = false;
var addDummy = false;
var data = item.getData ();
if (data != null && this.equals (element, data)) {
if (hasPlus != needsPlus) {
if (needsPlus) addDummy = true;
 else removeAll = true;
}} else {
removeAll = true;
addDummy = needsPlus;
this.setExpanded (item, false);
}if (removeAll) {
var items = this.getItems (item);
for (var i = 0; i < items.length; i++) {
if (items[i].getData () != null) this.disassociate (items[i]);
items[i].dispose ();
}
}if (addDummy) this.newItem (item, 0, -1);
}, "$wt.widgets.Item,~O");
Clazz.defineMethod (c$, "getVisibleExpandedElements", 
function () {
var v =  new java.util.ArrayList ();
this.internalCollectVisibleExpanded (v, this.getControl ());
return v.toArray ();
});
Clazz.defineMethod (c$, "internalCollectVisibleExpanded", 
($fz = function (result, widget) {
var items = this.getChildren (widget);
for (var i = 0; i < items.length; i++) {
var item = items[i];
if (this.getExpanded (item)) {
var data = item.getData ();
if (data != null) result.add (data);
this.internalCollectVisibleExpanded (result, item);
}}
}, $fz.isPrivate = true, $fz), "java.util.ArrayList,$wt.widgets.Widget");
Clazz.defineStatics (c$,
"ALL_LEVELS", -1);
});
