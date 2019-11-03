Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["org.eclipse.jface.viewers.StructuredViewer", "java.util.ArrayList"], "org.eclipse.jface.viewers.AbstractListViewer", ["org.eclipse.jface.util.Assert"], function () {
c$ = Clazz.decorateAsClass (function () {
this.listMap = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "AbstractListViewer", org.eclipse.jface.viewers.StructuredViewer);
Clazz.prepareFields (c$, function () {
this.listMap =  new java.util.ArrayList ();
});
Clazz.defineMethod (c$, "add", 
function (elements) {
this.assertElementsNotNull (elements);
var filtered = this.filter (elements);
var labelProvider = this.getLabelProvider ();
for (var i = 0; i < filtered.length; i++) {
var element = filtered[i];
var ix = this.indexForElement (element);
this.listAdd (this.getLabelProviderText (labelProvider, element), ix);
this.listMap.add (ix, element);
this.mapElement (element, this.getControl ());
}
}, "~A");
Clazz.defineMethod (c$, "getLabelProviderText", 
($fz = function (labelProvider, element) {
var text = labelProvider.getText (element);
if (text == null) return "";
return text;
}, $fz.isPrivate = true, $fz), "org.eclipse.jface.viewers.ILabelProvider,~O");
Clazz.defineMethod (c$, "add", 
function (element) {
this.add ([element]);
}, "~O");
Clazz.overrideMethod (c$, "doFindInputItem", 
function (element) {
if (element != null && this.equals (element, this.getRoot ())) return this.getControl ();
return null;
}, "~O");
Clazz.overrideMethod (c$, "doFindItem", 
function (element) {
if (element != null) {
if (this.listMap.contains (element)) return this.getControl ();
}return null;
}, "~O");
Clazz.overrideMethod (c$, "doUpdateItem", 
function (data, element, fullMap) {
if (element != null) {
var ix = this.listMap.indexOf (element);
if (ix >= 0) {
var labelProvider = this.getLabelProvider ();
this.listSetItem (ix, this.getLabelProviderText (labelProvider, element));
}}}, "$wt.widgets.Widget,~O,~B");
Clazz.defineMethod (c$, "getElementAt", 
function (index) {
if (index >= 0 && index < this.listMap.size ()) return this.listMap.get (index);
return null;
}, "~N");
Clazz.overrideMethod (c$, "getSelectionFromWidget", 
function () {
var ixs = this.listGetSelectionIndices ();
var list =  new java.util.ArrayList (ixs.length);
for (var i = 0; i < ixs.length; i++) {
var e = this.getElementAt (ixs[i]);
if (e != null) list.add (e);
}
return list;
});
Clazz.defineMethod (c$, "indexForElement", 
function (element) {
var sorter = this.getSorter ();
if (sorter == null) return this.listGetItemCount ();
var count = this.listGetItemCount ();
var min = 0;
var max = count - 1;
while (min <= max) {
var mid = Math.floor ((min + max) / 2);
var data = this.listMap.get (mid);
var compare = sorter.compare (this, data, element);
if (compare == 0) {
while (compare == 0) {
++mid;
if (mid >= count) {
break;
}data = this.listMap.get (mid);
compare = sorter.compare (this, data, element);
}
return mid;
}if (compare < 0) min = mid + 1;
 else max = mid - 1;
}
return min;
}, "~O");
Clazz.overrideMethod (c$, "inputChanged", 
function (input, oldInput) {
this.listMap.clear ();
var children = this.getSortedChildren (this.getRoot ());
var size = children.length;
this.listRemoveAll ();
var labels =  new Array (size);
for (var i = 0; i < size; i++) {
var el = children[i];
labels[i] = this.getLabelProviderText (this.getLabelProvider (), el);
this.listMap.add (el);
this.mapElement (el, this.getControl ());
}
this.listSetItems (labels);
}, "~O,~O");
Clazz.defineMethod (c$, "internalRefresh", 
function (element) {
var list = this.getControl ();
if (element == null || this.equals (element, this.getRoot ())) {
if (this.listMap != null) this.listMap.clear ();
this.unmapAllElements ();
var selection = this.getSelectionFromWidget ();
list.setRedraw (false);
this.listRemoveAll ();
var children = this.getSortedChildren (this.getRoot ());
var items =  new Array (children.length);
var labelProvider = this.getLabelProvider ();
for (var i = 0; i < items.length; i++) {
var el = children[i];
items[i] = this.getLabelProviderText (labelProvider, el);
this.listMap.add (el);
this.mapElement (el, list);
}
this.listSetItems (items);
list.setRedraw (true);
this.setSelectionToWidget (selection, false);
} else {
this.doUpdateItem (list, element, true);
}}, "~O");
Clazz.defineMethod (c$, "internalRemove", 
($fz = function (elements) {
var input = this.getInput ();
for (var i = 0; i < elements.length; ++i) {
if (this.equals (elements[i], input)) {
this.setInput (null);
return ;
}var ix = this.listMap.indexOf (elements[i]);
if (ix >= 0) {
this.listRemove (ix);
this.listMap.remove (ix);
this.unmapElement (elements[i], this.getControl ());
}}
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "remove", 
function (elements) {
this.assertElementsNotNull (elements);
this.preservingSelection ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.AbstractListViewer$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "AbstractListViewer$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["org.eclipse.jface.viewers.AbstractListViewer"].internalRemove (this.f$.elements);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.AbstractListViewer$1, i$, v$);
}) (this, Clazz.cloneFinals ("elements", elements)));
}, "~A");
Clazz.defineMethod (c$, "remove", 
function (element) {
this.remove ([element]);
}, "~O");
Clazz.defineMethod (c$, "setLabelProvider", 
function (labelProvider) {
org.eclipse.jface.util.Assert.isTrue (Clazz.instanceOf (labelProvider, org.eclipse.jface.viewers.ILabelProvider));
Clazz.superCall (this, org.eclipse.jface.viewers.AbstractListViewer, "setLabelProvider", [labelProvider]);
}, "org.eclipse.jface.viewers.IBaseLabelProvider");
Clazz.defineMethod (c$, "setSelectionToWidget", 
function ($in, reveal) {
if ($in == null || $in.size () == 0) {
this.listDeselectAll ();
} else {
var n = $in.size ();
var ixs =  Clazz.newArray (n, 0);
var count = 0;
for (var i = 0; i < n; ++i) {
var el = $in.get (i);
var ix = this.listMap.indexOf (el);
if (ix >= 0) ixs[count++] = ix;
}
if (count < n) {
System.arraycopy (ixs, 0, ixs =  Clazz.newArray (count, 0), 0, count);
}this.listSetSelection (ixs);
if (reveal) {
this.listShowSelection ();
}}}, "java.util.List,~B");
Clazz.defineMethod (c$, "getElementIndex", 
function (element) {
return this.listMap.indexOf (element);
}, "~O");
});
