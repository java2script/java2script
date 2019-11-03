Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["org.eclipse.jface.viewers.AbstractTreeViewer", "$.TableEditorImpl"], "org.eclipse.jface.viewers.TableTreeViewer", ["org.eclipse.jface.util.Assert", "org.eclipse.jface.viewers.DoubleClickEvent", "$.OpenEvent", "$.ViewerLabel", "$wt.custom.TableTree", "$.TableTreeEditor", "$.TableTreeItem", "$wt.events.MouseAdapter", "$wt.graphics.Point"], function () {
c$ = Clazz.decorateAsClass (function () {
this.tableViewerImpl = null;
this.tableTree = null;
this.tableTreeEditor = null;
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.TableTreeViewer.TableTreeViewerImpl")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers.TableTreeViewer, "TableTreeViewerImpl", org.eclipse.jface.viewers.TableEditorImpl);
Clazz.overrideMethod (c$, "getBounds", 
function (a, b) {
return (a).getBounds (b);
}, "$wt.widgets.Item,~N");
Clazz.overrideMethod (c$, "getColumnCount", 
function () {
return this.b$["org.eclipse.jface.viewers.TableTreeViewer"].getTableTree ().getTable ().getColumnCount ();
});
Clazz.overrideMethod (c$, "getSelection", 
function () {
return this.b$["org.eclipse.jface.viewers.TableTreeViewer"].getTableTree ().getSelection ();
});
Clazz.overrideMethod (c$, "setEditor", 
function (a, b, c) {
this.b$["org.eclipse.jface.viewers.TableTreeViewer"].tableTreeEditor.setEditor (a, b, c);
}, "$wt.widgets.Control,$wt.widgets.Item,~N");
Clazz.overrideMethod (c$, "setSelection", 
function (a, b) {
this.b$["org.eclipse.jface.viewers.TableTreeViewer"].setSelection (a, b);
}, "org.eclipse.jface.viewers.StructuredSelection,~B");
Clazz.overrideMethod (c$, "showSelection", 
function () {
this.b$["org.eclipse.jface.viewers.TableTreeViewer"].getTableTree ().showSelection ();
});
Clazz.overrideMethod (c$, "setLayoutData", 
function (a) {
this.b$["org.eclipse.jface.viewers.TableTreeViewer"].tableTreeEditor.horizontalAlignment = a.horizontalAlignment;
this.b$["org.eclipse.jface.viewers.TableTreeViewer"].tableTreeEditor.grabHorizontal = a.grabHorizontal;
this.b$["org.eclipse.jface.viewers.TableTreeViewer"].tableTreeEditor.minimumWidth = a.minimumWidth;
}, "org.eclipse.jface.viewers.CellEditor.LayoutData");
Clazz.overrideMethod (c$, "handleDoubleClickEvent", 
function () {
var a = this.getViewer ();
this.b$["org.eclipse.jface.viewers.TableTreeViewer"].fireDoubleClick ( new org.eclipse.jface.viewers.DoubleClickEvent (a, a.getSelection ()));
this.b$["org.eclipse.jface.viewers.TableTreeViewer"].fireOpen ( new org.eclipse.jface.viewers.OpenEvent (a, a.getSelection ()));
});
c$ = Clazz.p0p ();
}
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "TableTreeViewer", org.eclipse.jface.viewers.AbstractTreeViewer);
Clazz.makeConstructor (c$, 
function (tree) {
Clazz.superConstructor (this, org.eclipse.jface.viewers.TableTreeViewer);
this.tableTree = tree;
this.hookControl (tree);
this.tableTreeEditor =  new $wt.custom.TableTreeEditor (this.tableTree);
this.tableViewerImpl = Clazz.innerTypeInstance (org.eclipse.jface.viewers.TableTreeViewer.TableTreeViewerImpl, this, null, this);
}, "$wt.custom.TableTree");
Clazz.makeConstructor (c$, 
function (parent) {
this.construct (parent, 2818);
}, "$wt.widgets.Composite");
Clazz.makeConstructor (c$, 
function (parent, style) {
this.construct ( new $wt.custom.TableTree (parent, style));
}, "$wt.widgets.Composite,~N");
Clazz.defineMethod (c$, "addTreeListener", 
function (c, listener) {
(c).addTreeListener (listener);
}, "$wt.widgets.Control,$wt.events.TreeListener");
Clazz.defineMethod (c$, "cancelEditing", 
function () {
this.tableViewerImpl.cancelEditing ();
});
Clazz.defineMethod (c$, "doUpdateItem", 
function (item, element) {
var prov = this.getLabelProvider ();
var tprov = null;
if (Clazz.instanceOf (prov, org.eclipse.jface.viewers.ITableLabelProvider)) tprov = prov;
var columnCount = this.tableTree.getTable ().getColumnCount ();
var ti = item;
for (var column = 0; column < columnCount || column == 0; column++) {
var text = "";
var image = null;
if (tprov != null) {
text = tprov.getColumnText (element, column);
image = tprov.getColumnImage (element, column);
} else {
if (column == 0) {
var updateLabel =  new org.eclipse.jface.viewers.ViewerLabel (item.getText (), item.getImage ());
this.buildLabel (updateLabel, element);
if (item.isDisposed ()) {
this.unmapElement (element);
return ;
}text = updateLabel.getText ();
image = updateLabel.getImage ();
}}if (text == null) text = "";
ti.setText (column, text);
if (ti.getImage (column) !== image) ti.setImage (column, image);
this.getColorAndFontCollector ().setFontsAndColors (element);
this.getColorAndFontCollector ().applyFontsAndColors (ti);
}
}, "$wt.widgets.Item,~O");
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
Clazz.overrideMethod (c$, "getChildren", 
function (o) {
if (Clazz.instanceOf (o, $wt.custom.TableTreeItem)) return (o).getItems ();
if (Clazz.instanceOf (o, $wt.custom.TableTree)) return (o).getItems ();
return null;
}, "$wt.widgets.Widget");
Clazz.overrideMethod (c$, "getChild", 
function (widget, index) {
if (Clazz.instanceOf (widget, $wt.custom.TableTreeItem)) return (widget).getItem (index);
if (Clazz.instanceOf (widget, $wt.custom.TableTree)) return (widget).getItem (index);
return null;
}, "$wt.widgets.Widget,~N");
Clazz.defineMethod (c$, "getColumnProperties", 
function () {
return this.tableViewerImpl.getColumnProperties ();
});
Clazz.overrideMethod (c$, "getControl", 
function () {
return this.tableTree;
});
Clazz.defineMethod (c$, "getElementAt", 
function (index) {
var i = this.tableTree.getItems ()[index];
if (i != null) return i.getData ();
return null;
}, "~N");
Clazz.overrideMethod (c$, "getExpanded", 
function (item) {
return (item).getExpanded ();
}, "$wt.widgets.Item");
Clazz.overrideMethod (c$, "getItem", 
function (x, y) {
return this.getTableTree ().getTable ().getItem (this.getTableTree ().toControl ( new $wt.graphics.Point (x, y)));
}, "~N,~N");
Clazz.defineMethod (c$, "getItemCount", 
function (widget) {
return (widget).getItemCount ();
}, "$wt.widgets.Control");
Clazz.defineMethod (c$, "getItemCount", 
function (item) {
return (item).getItemCount ();
}, "$wt.widgets.Item");
Clazz.overrideMethod (c$, "getItems", 
function (item) {
return (item).getItems ();
}, "$wt.widgets.Item");
Clazz.overrideMethod (c$, "getParentItem", 
function (item) {
return (item).getParentItem ();
}, "$wt.widgets.Item");
Clazz.defineMethod (c$, "getSelection", 
function (widget) {
return (widget).getSelection ();
}, "$wt.widgets.Control");
Clazz.defineMethod (c$, "getTableTree", 
function () {
return this.tableTree;
});
Clazz.defineMethod (c$, "hookControl", 
function (control) {
Clazz.superCall (this, org.eclipse.jface.viewers.TableTreeViewer, "hookControl", [control]);
this.tableTree.getTable ().addMouseListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.TableTreeViewer$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "TableTreeViewer$1", $wt.events.MouseAdapter);
Clazz.overrideMethod (c$, "mouseDown", 
function (e) {
var items = this.b$["org.eclipse.jface.viewers.TableTreeViewer"].tableTree.getTable ().getItems ();
for (var i = 0; i < items.length; i++) {
var rect = items[i].getImageBounds (0);
if (rect.contains (e.x, e.y)) return ;
}
this.b$["org.eclipse.jface.viewers.TableTreeViewer"].tableViewerImpl.handleMouseDown (e);
}, "$wt.events.MouseEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.TableTreeViewer$1, i$, v$);
}) (this, null));
}, "$wt.widgets.Control");
Clazz.defineMethod (c$, "isCellEditorActive", 
function () {
return this.tableViewerImpl.isCellEditorActive ();
});
Clazz.overrideMethod (c$, "newItem", 
function (parent, flags, ix) {
var item;
if (ix >= 0) {
if (Clazz.instanceOf (parent, $wt.custom.TableTreeItem)) item =  new $wt.custom.TableTreeItem (parent, flags, ix);
 else item =  new $wt.custom.TableTreeItem (parent, flags, ix);
} else {
if (Clazz.instanceOf (parent, $wt.custom.TableTreeItem)) item =  new $wt.custom.TableTreeItem (parent, flags);
 else item =  new $wt.custom.TableTreeItem (parent, flags);
}return item;
}, "$wt.widgets.Widget,~N,~N");
Clazz.overrideMethod (c$, "removeAll", 
function (widget) {
(widget).removeAll ();
}, "$wt.widgets.Control");
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
Clazz.overrideMethod (c$, "setExpanded", 
function (node, expand) {
(node).setExpanded (expand);
}, "$wt.widgets.Item,~B");
Clazz.defineMethod (c$, "setLabelProvider", 
function (labelProvider) {
org.eclipse.jface.util.Assert.isTrue (Clazz.instanceOf (labelProvider, org.eclipse.jface.viewers.ITableLabelProvider) || Clazz.instanceOf (labelProvider, org.eclipse.jface.viewers.ILabelProvider));
Clazz.superCall (this, org.eclipse.jface.viewers.TableTreeViewer, "setLabelProvider", [labelProvider]);
}, "org.eclipse.jface.viewers.IBaseLabelProvider");
Clazz.defineMethod (c$, "setSelection", 
function (items) {
var newItems =  new Array (items.size ());
items.toArray (newItems);
this.getTableTree ().setSelection (newItems);
}, "java.util.List");
Clazz.overrideMethod (c$, "showItem", 
function (item) {
this.getTableTree ().showItem (item);
}, "$wt.widgets.Item");
});
