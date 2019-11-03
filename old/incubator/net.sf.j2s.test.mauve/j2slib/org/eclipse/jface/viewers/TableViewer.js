Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["org.eclipse.jface.viewers.StructuredViewer"], "org.eclipse.jface.viewers.TableViewer", ["java.util.ArrayList", "org.eclipse.jface.util.Assert", "org.eclipse.jface.viewers.DoubleClickEvent", "$.OpenEvent", "$.TableEditorImpl", "$.ViewerLabel", "$wt.custom.TableEditor", "$wt.events.MouseAdapter", "$wt.widgets.Listener", "$.Table", "$.TableItem"], function () {
c$ = Clazz.decorateAsClass (function () {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.TableViewer.VirtualManager")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.cachedElements = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers.TableViewer, "VirtualManager");
Clazz.prepareFields (c$, function () {
this.cachedElements =  new Array (0);
});
Clazz.makeConstructor (c$, 
function () {
this.addTableListener ();
});
Clazz.defineMethod (c$, "addTableListener", 
($fz = function () {
this.b$["org.eclipse.jface.viewers.TableViewer"].table.addListener (36, (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.TableViewer.VirtualManager$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers.TableViewer, "VirtualManager$1", null, $wt.widgets.Listener);
Clazz.overrideMethod (c$, "handleEvent", 
function (a) {
var b = a.item;
var c = this.b$["org.eclipse.jface.viewers.TableViewer"].table.indexOf (b);
var d = this.b$["org.eclipse.jface.viewers.TableViewer.VirtualManager"].resolveElement (c);
if (d == null) {
var e = this.b$["org.eclipse.jface.viewers.TableViewer"].getContentProvider ();
if (Clazz.instanceOf (e, org.eclipse.jface.viewers.ILazyContentProvider)) {
(e).updateElement (c);
return ;
}}this.b$["org.eclipse.jface.viewers.TableViewer"].associate (d, b);
this.b$["org.eclipse.jface.viewers.TableViewer"].updateItem (b, d);
}, "$wt.widgets.Event");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.TableViewer.VirtualManager$1, i$, v$);
}) (this, null));
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "resolveElement", 
function (a) {
var b = null;
if (a < this.cachedElements.length) b = this.cachedElements[a];
return b;
}, "~N");
Clazz.defineMethod (c$, "notVisibleAdded", 
function (a, b) {
var c = b + 1;
if (c > this.b$["org.eclipse.jface.viewers.TableViewer"].getTable ().getItemCount ()) {
this.b$["org.eclipse.jface.viewers.TableViewer"].getTable ().setItemCount (c);
var d =  new Array (c);
System.arraycopy (this.cachedElements, 0, d, 0, this.cachedElements.length);
this.cachedElements = d;
}this.cachedElements[b] = a;
}, "~O,~N");
c$ = Clazz.p0p ();
}
this.virtualManager = null;
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.TableViewer.TableColorAndFontNoOp")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers.TableViewer, "TableColorAndFontNoOp");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "setFontsAndColors", 
function (a, b, c) {
}, "$wt.widgets.TableItem,~O,~N");
c$ = Clazz.p0p ();
}
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.TableViewer.TableColorAndFontCollector")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.fontProvider = null;
this.colorProvider = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers.TableViewer, "TableColorAndFontCollector", org.eclipse.jface.viewers.TableViewer.TableColorAndFontNoOp, null, Clazz.innerTypeInstance (org.eclipse.jface.viewers.TableViewer.TableColorAndFontNoOp, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, org.eclipse.jface.viewers.TableViewer.TableColorAndFontCollector, []);
if (Clazz.instanceOf (a, org.eclipse.jface.viewers.ITableFontProvider)) this.fontProvider = a;
if (Clazz.instanceOf (a, org.eclipse.jface.viewers.ITableColorProvider)) this.colorProvider = a;
}, "org.eclipse.jface.viewers.IBaseLabelProvider");
Clazz.overrideMethod (c$, "setFontsAndColors", 
function (a, b, c) {
if (this.colorProvider != null) {
a.setBackground (c, this.colorProvider.getBackground (b, c));
a.setForeground (c, this.colorProvider.getForeground (b, c));
}if (this.fontProvider != null) a.setFont (c, this.fontProvider.getFont (b, c));
}, "$wt.widgets.TableItem,~O,~N");
c$ = Clazz.p0p ();
}
this.tableViewerImpl = null;
this.table = null;
this.tableEditor = null;
this.tableColorAndFont = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "TableViewer", org.eclipse.jface.viewers.StructuredViewer);
Clazz.prepareFields (c$, function () {
this.tableColorAndFont = Clazz.innerTypeInstance (org.eclipse.jface.viewers.TableViewer.TableColorAndFontNoOp, this, null);
});
Clazz.makeConstructor (c$, 
function (parent) {
this.construct (parent, 2818);
}, "$wt.widgets.Composite");
Clazz.makeConstructor (c$, 
function (parent, style) {
this.construct ( new $wt.widgets.Table (parent, style));
}, "$wt.widgets.Composite,~N");
Clazz.makeConstructor (c$, 
function (table) {
Clazz.superConstructor (this, org.eclipse.jface.viewers.TableViewer, []);
this.table = table;
this.hookControl (table);
this.tableEditor =  new $wt.custom.TableEditor (table);
this.initTableViewerImpl ();
this.initializeVirtualManager (table.getStyle ());
}, "$wt.widgets.Table");
Clazz.defineMethod (c$, "initializeVirtualManager", 
($fz = function (style) {
if ((style & 268435456) == 0) return ;
this.virtualManager = Clazz.innerTypeInstance (org.eclipse.jface.viewers.TableViewer.VirtualManager, this, null);
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "add", 
function (elements) {
this.assertElementsNotNull (elements);
var filtered = this.filter (elements);
for (var i = 0; i < filtered.length; i++) {
var element = filtered[i];
var index = this.indexForElement (element);
this.createItem (element, index);
}
}, "~A");
Clazz.defineMethod (c$, "createItem", 
($fz = function (element, index) {
if (this.virtualManager == null) this.updateItem ( new $wt.widgets.TableItem (this.getTable (), 0, index), element);
 else {
this.virtualManager.notVisibleAdded (element, index);
}}, $fz.isPrivate = true, $fz), "~O,~N");
Clazz.defineMethod (c$, "add", 
function (element) {
this.add ([element]);
}, "~O");
Clazz.defineMethod (c$, "cancelEditing", 
function () {
this.tableViewerImpl.cancelEditing ();
});
Clazz.overrideMethod (c$, "doFindInputItem", 
function (element) {
if (this.equals (element, this.getRoot ())) return this.getTable ();
return null;
}, "~O");
Clazz.overrideMethod (c$, "doFindItem", 
function (element) {
var children = this.table.getItems ();
for (var i = 0; i < children.length; i++) {
var item = children[i];
var data = item.getData ();
if (data != null && this.equals (data, element)) return item;
}
return null;
}, "~O");
Clazz.overrideMethod (c$, "doUpdateItem", 
function (widget, element, fullMap) {
if (Clazz.instanceOf (widget, $wt.widgets.TableItem)) {
var item = widget;
if (fullMap) {
this.associate (element, item);
} else {
item.setData (element);
this.mapElement (element, item);
}var prov = this.getLabelProvider ();
var tprov = null;
var lprov = null;
var vprov = null;
if (Clazz.instanceOf (prov, org.eclipse.jface.viewers.ILabelProvider)) lprov = prov;
if (Clazz.instanceOf (prov, org.eclipse.jface.viewers.IViewerLabelProvider)) {
vprov = prov;
}if (Clazz.instanceOf (prov, org.eclipse.jface.viewers.ITableLabelProvider)) {
tprov = prov;
}var columnCount = this.table.getColumnCount ();
var ti = item;
this.getColorAndFontCollector ().setFontsAndColors (element);
for (var column = 0; column < columnCount || column == 0; column++) {
var text = "";
var image = null;
this.tableColorAndFont.setFontsAndColors (ti, element, column);
if (tprov == null) {
if (column == 0) {
var updateLabel =  new org.eclipse.jface.viewers.ViewerLabel (item.getText (), item.getImage ());
if (vprov != null) this.buildLabel (updateLabel, element, vprov);
 else {
if (lprov != null) this.buildLabel (updateLabel, element, lprov);
}if (item.isDisposed ()) {
this.unmapElement (element);
return ;
}text = updateLabel.getText ();
image = updateLabel.getImage ();
}} else {
text = tprov.getColumnText (element, column);
image = tprov.getColumnImage (element, column);
}if (text == null) text = "";
ti.setText (column, text);
if (ti.getImage (column) !== image) {
ti.setImage (column, image);
}}
this.getColorAndFontCollector ().applyFontsAndColors (ti);
}}, "$wt.widgets.Widget,~O,~B");
Clazz.defineMethod (c$, "editElement", 
function (element, column) {
this.tableViewerImpl.editElement (element, column);
}, "~O,~N");
Clazz.defineMethod (c$, "getCellEditors", 
function () {
return this.tableViewerImpl.getCellEditors ();
});
Clazz.defineMethod (c$, "getCellModifier", 
function () {
return this.tableViewerImpl.getCellModifier ();
});
Clazz.defineMethod (c$, "getColumnProperties", 
function () {
return this.tableViewerImpl.getColumnProperties ();
});
Clazz.overrideMethod (c$, "getControl", 
function () {
return this.table;
});
Clazz.defineMethod (c$, "getElementAt", 
function (index) {
if (index >= 0 && index < this.table.getItemCount ()) {
var i = this.table.getItem (index);
if (i != null) return i.getData ();
}return null;
}, "~N");
Clazz.overrideMethod (c$, "getSelectionFromWidget", 
function () {
var items = this.table.getSelection ();
var list =  new java.util.ArrayList (items.length);
for (var i = 0; i < items.length; i++) {
var item = items[i];
var e = item.getData ();
if (e != null) list.add (e);
}
return list;
});
Clazz.defineMethod (c$, "getTable", 
function () {
return this.table;
});
Clazz.defineMethod (c$, "hookControl", 
function (control) {
Clazz.superCall (this, org.eclipse.jface.viewers.TableViewer, "hookControl", [control]);
var tableControl = control;
tableControl.addMouseListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.TableViewer$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "TableViewer$1", $wt.events.MouseAdapter);
Clazz.overrideMethod (c$, "mouseDown", 
function (e) {
this.b$["org.eclipse.jface.viewers.TableViewer"].tableViewerImpl.handleMouseDown (e);
}, "$wt.events.MouseEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.TableViewer$1, i$, v$);
}) (this, null));
}, "$wt.widgets.Control");
Clazz.defineMethod (c$, "indexForElement", 
function (element) {
var sorter = this.getSorter ();
if (sorter == null) return this.table.getItemCount ();
var count = this.table.getItemCount ();
var min = 0;
var max = count - 1;
while (min <= max) {
var mid = Math.floor ((min + max) / 2);
var data = this.table.getItem (mid).getData ();
var compare = sorter.compare (this, data, element);
if (compare == 0) {
while (compare == 0) {
++mid;
if (mid >= count) {
break;
}data = this.table.getItem (mid).getData ();
compare = sorter.compare (this, data, element);
}
return mid;
}if (compare < 0) min = mid + 1;
 else max = mid - 1;
}
return min;
}, "~O");
Clazz.defineMethod (c$, "initTableViewerImpl", 
($fz = function () {
this.tableViewerImpl = (function (i$, arg0, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.TableViewer$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "TableViewer$2", org.eclipse.jface.viewers.TableEditorImpl);
Clazz.overrideMethod (c$, "getBounds", 
function (item, columnNumber) {
return (item).getBounds (columnNumber);
}, "$wt.widgets.Item,~N");
Clazz.overrideMethod (c$, "getColumnCount", 
function () {
return this.b$["org.eclipse.jface.viewers.TableViewer"].getTable ().getColumnCount ();
});
Clazz.overrideMethod (c$, "getSelection", 
function () {
return this.b$["org.eclipse.jface.viewers.TableViewer"].getTable ().getSelection ();
});
Clazz.overrideMethod (c$, "setEditor", 
function (w, item, columnNumber) {
this.b$["org.eclipse.jface.viewers.TableViewer"].tableEditor.setEditor (w, item, columnNumber);
}, "$wt.widgets.Control,$wt.widgets.Item,~N");
Clazz.overrideMethod (c$, "setSelection", 
function (selection, b) {
this.b$["org.eclipse.jface.viewers.TableViewer"].setSelection (selection, b);
}, "org.eclipse.jface.viewers.StructuredSelection,~B");
Clazz.overrideMethod (c$, "showSelection", 
function () {
this.b$["org.eclipse.jface.viewers.TableViewer"].getTable ().showSelection ();
});
Clazz.overrideMethod (c$, "setLayoutData", 
function (layoutData) {
this.b$["org.eclipse.jface.viewers.TableViewer"].tableEditor.grabHorizontal = layoutData.grabHorizontal;
this.b$["org.eclipse.jface.viewers.TableViewer"].tableEditor.horizontalAlignment = layoutData.horizontalAlignment;
this.b$["org.eclipse.jface.viewers.TableViewer"].tableEditor.minimumWidth = layoutData.minimumWidth;
}, "org.eclipse.jface.viewers.CellEditor.LayoutData");
Clazz.overrideMethod (c$, "handleDoubleClickEvent", 
function () {
var viewer = this.getViewer ();
this.b$["org.eclipse.jface.viewers.TableViewer"].fireDoubleClick ( new org.eclipse.jface.viewers.DoubleClickEvent (viewer, viewer.getSelection ()));
this.b$["org.eclipse.jface.viewers.TableViewer"].fireOpen ( new org.eclipse.jface.viewers.OpenEvent (viewer, viewer.getSelection ()));
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.TableViewer$2, i$, v$, arg0);
}) (this, this, null);
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "inputChanged", 
function (input, oldInput) {
this.getControl ().setRedraw (false);
try {
this.refresh ();
} finally {
this.getControl ().setRedraw (true);
}
}, "~O,~O");
Clazz.defineMethod (c$, "insert", 
function (element, position) {
this.tableViewerImpl.applyEditorValue ();
if (this.getSorter () != null || this.hasFilters ()) {
this.add (element);
return ;
}if (position == -1) position = this.table.getItemCount ();
this.createItem (element, position);
}, "~O,~N");
Clazz.defineMethod (c$, "internalRefresh", 
function (element) {
this.internalRefresh (element, true);
}, "~O");
Clazz.defineMethod (c$, "internalRefresh", 
function (element, updateLabels) {
this.tableViewerImpl.applyEditorValue ();
if (element == null || this.equals (element, this.getRoot ())) {
if (this.virtualManager == null) this.internalRefreshAll (updateLabels);
 else {
this.internalVirtualRefreshAll ();
}} else {
var w = this.findItem (element);
if (w != null) {
this.updateItem (w, element);
}}}, "~O,~B");
Clazz.defineMethod (c$, "internalVirtualRefreshAll", 
($fz = function () {
var root = this.getRoot ();
var contentProvider = this.getContentProvider ();
if (!(Clazz.instanceOf (contentProvider, org.eclipse.jface.viewers.ILazyContentProvider)) && (Clazz.instanceOf (contentProvider, org.eclipse.jface.viewers.IStructuredContentProvider))) {
if (root != null) this.virtualManager.cachedElements = (this.getContentProvider ()).getElements (root);
}this.getTable ().clearAll ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "internalRefreshAll", 
($fz = function (updateLabels) {
var children = this.getSortedChildren (this.getRoot ());
var items = this.getTable ().getItems ();
var min = Math.min (children.length, items.length);
for (var i = 0; i < min; ++i) {
var item = items[i];
if (this.equals (children[i], item.getData ())) {
if (updateLabels) {
this.updateItem (item, children[i]);
} else {
this.associate (children[i], item);
}} else {
item.setText ("");
item.setImage ( new Array (Math.max (1, this.table.getColumnCount ())));
this.disassociate (item);
}}
if (min < items.length) {
for (var i = items.length; --i >= min; ) {
this.disassociate (items[i]);
}
this.table.remove (min, items.length - 1);
}if (this.table.getItemCount () == 0) {
this.table.removeAll ();
}for (var i = 0; i < min; ++i) {
var item = items[i];
if (item.getData () == null) this.updateItem (item, children[i]);
}
for (var i = min; i < children.length; ++i) {
this.createItem (children[i], i);
}
}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineMethod (c$, "internalRemove", 
($fz = function (elements) {
var input = this.getInput ();
for (var i = 0; i < elements.length; ++i) {
if (this.equals (elements[i], input)) {
this.setInput (null);
return ;
}}
var indices =  Clazz.newArray (elements.length, 0);
var count = 0;
for (var i = 0; i < elements.length; ++i) {
var w = this.findItem (elements[i]);
if (Clazz.instanceOf (w, $wt.widgets.TableItem)) {
var item = w;
this.disassociate (item);
indices[count++] = this.table.indexOf (item);
}}
if (count < indices.length) {
System.arraycopy (indices, 0, indices =  Clazz.newArray (count, 0), 0, count);
}this.table.remove (indices);
if (this.table.getItemCount () == 0) {
this.table.removeAll ();
}}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "isCellEditorActive", 
function () {
return this.tableViewerImpl.isCellEditorActive ();
});
Clazz.defineMethod (c$, "remove", 
function (elements) {
this.assertElementsNotNull (elements);
this.preservingSelection ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.TableViewer$3")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "TableViewer$3", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["org.eclipse.jface.viewers.TableViewer"].internalRemove (this.f$.elements);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.TableViewer$3, i$, v$);
}) (this, Clazz.cloneFinals ("elements", elements)));
}, "~A");
Clazz.defineMethod (c$, "remove", 
function (element) {
this.remove ([element]);
}, "~O");
Clazz.overrideMethod (c$, "reveal", 
function (element) {
org.eclipse.jface.util.Assert.isNotNull (element);
var w = this.findItem (element);
if (Clazz.instanceOf (w, $wt.widgets.TableItem)) this.getTable ().showItem (w);
}, "~O");
Clazz.defineMethod (c$, "setCellEditors", 
function (editors) {
this.tableViewerImpl.setCellEditors (editors);
}, "~A");
Clazz.defineMethod (c$, "setCellModifier", 
function (modifier) {
this.tableViewerImpl.setCellModifier (modifier);
}, "org.eclipse.jface.viewers.ICellModifier");
Clazz.defineMethod (c$, "setColumnProperties", 
function (columnProperties) {
this.tableViewerImpl.setColumnProperties (columnProperties);
}, "~A");
Clazz.defineMethod (c$, "setLabelProvider", 
function (labelProvider) {
org.eclipse.jface.util.Assert.isTrue (Clazz.instanceOf (labelProvider, org.eclipse.jface.viewers.ITableLabelProvider) || Clazz.instanceOf (labelProvider, org.eclipse.jface.viewers.ILabelProvider));
Clazz.superCall (this, org.eclipse.jface.viewers.TableViewer, "setLabelProvider", [labelProvider]);
if (Clazz.instanceOf (labelProvider, org.eclipse.jface.viewers.ITableFontProvider) || Clazz.instanceOf (labelProvider, org.eclipse.jface.viewers.ITableColorProvider)) this.tableColorAndFont = Clazz.innerTypeInstance (org.eclipse.jface.viewers.TableViewer.TableColorAndFontCollector, this, null, labelProvider);
 else this.tableColorAndFont = Clazz.innerTypeInstance (org.eclipse.jface.viewers.TableViewer.TableColorAndFontNoOp, this, null);
}, "org.eclipse.jface.viewers.IBaseLabelProvider");
Clazz.defineMethod (c$, "setSelectionToWidget", 
function (list, reveal) {
if (list == null) {
this.table.deselectAll ();
return ;
}var size = list.size ();
var items =  new Array (size);
var firstItem = null;
var count = 0;
for (var i = 0; i < size; ++i) {
var o = list.get (i);
var w = this.findItem (o);
if (Clazz.instanceOf (w, $wt.widgets.TableItem)) {
var item = w;
items[count++] = item;
if (firstItem == null) firstItem = item;
}}
if (count < size) {
System.arraycopy (items, 0, items =  new Array (count), 0, count);
}this.table.setSelection (items);
if (reveal && firstItem != null) {
this.table.showItem (firstItem);
}}, "java.util.List,~B");
Clazz.defineMethod (c$, "setItemCount", 
function (count) {
this.getTable ().setItemCount (count);
this.getTable ().redraw ();
}, "~N");
Clazz.defineMethod (c$, "replace", 
function (element, index) {
var item = this.getTable ().getItem (index);
this.refreshItem (item, element);
}, "~O,~N");
Clazz.defineMethod (c$, "clear", 
function (index) {
var item = this.getTable ().getItem (index);
if (item.getData () != null) {
this.disassociate (item);
}this.table.clear (index);
}, "~N");
Clazz.defineMethod (c$, "getRawChildren", 
function (parent) {
org.eclipse.jface.util.Assert.isTrue (!(Clazz.instanceOf (this.getContentProvider (), org.eclipse.jface.viewers.ILazyContentProvider)), "Cannot get raw children with an ILazyContentProvider");
return Clazz.superCall (this, org.eclipse.jface.viewers.TableViewer, "getRawChildren", [parent]);
}, "~O");
Clazz.overrideMethod (c$, "assertContentProviderType", 
function (provider) {
org.eclipse.jface.util.Assert.isTrue (Clazz.instanceOf (provider, org.eclipse.jface.viewers.IStructuredContentProvider) || Clazz.instanceOf (provider, org.eclipse.jface.viewers.ILazyContentProvider));
}, "org.eclipse.jface.viewers.IContentProvider");
});
