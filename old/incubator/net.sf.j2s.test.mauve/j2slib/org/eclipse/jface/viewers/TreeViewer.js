Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["org.eclipse.jface.viewers.AbstractTreeViewer"], "org.eclipse.jface.viewers.TreeViewer", ["org.eclipse.jface.util.Assert", "org.eclipse.jface.viewers.DoubleClickEvent", "$.OpenEvent", "$.TreeEditorImpl", "$.ViewerLabel", "$wt.custom.TreeEditor", "$wt.events.MouseAdapter", "$wt.graphics.Point", "$wt.widgets.Tree", "$.TreeItem"], function () {
c$ = Clazz.decorateAsClass (function () {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.TreeViewer.TreeColorAndFontCollector")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.fontProvider = null;
this.colorProvider = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers.TreeViewer, "TreeColorAndFontCollector");
Clazz.makeConstructor (c$, 
function (a) {
if (Clazz.instanceOf (a, org.eclipse.jface.viewers.ITableFontProvider)) this.fontProvider = a;
if (Clazz.instanceOf (a, org.eclipse.jface.viewers.ITableColorProvider)) this.colorProvider = a;
}, "org.eclipse.jface.viewers.IBaseLabelProvider");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "setFontsAndColors", 
function (a, b, c) {
if (this.colorProvider != null) {
a.setBackground (c, this.colorProvider.getBackground (b, c));
a.setForeground (c, this.colorProvider.getForeground (b, c));
}if (this.fontProvider != null) a.setFont (c, this.fontProvider.getFont (b, c));
}, "$wt.widgets.TreeItem,~O,~N");
c$ = Clazz.p0p ();
}
this.treeViewerImpl = null;
this.tree = null;
this.treeEditor = null;
this.treeColorAndFont = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "TreeViewer", org.eclipse.jface.viewers.AbstractTreeViewer);
Clazz.prepareFields (c$, function () {
this.treeColorAndFont = Clazz.innerTypeInstance (org.eclipse.jface.viewers.TreeViewer.TreeColorAndFontCollector, this, null);
});
Clazz.makeConstructor (c$, 
function (parent) {
this.construct (parent, 2818);
}, "$wt.widgets.Composite");
Clazz.makeConstructor (c$, 
function (parent, style) {
this.construct ( new $wt.widgets.Tree (parent, style));
}, "$wt.widgets.Composite,~N");
Clazz.makeConstructor (c$, 
function (tree) {
Clazz.superConstructor (this, org.eclipse.jface.viewers.TreeViewer);
this.tree = tree;
this.hookControl (tree);
this.treeEditor =  new $wt.custom.TreeEditor (tree);
this.initTreeViewerImpl ();
}, "$wt.widgets.Tree");
Clazz.defineMethod (c$, "addTreeListener", 
function (c, listener) {
(c).addTreeListener (listener);
}, "$wt.widgets.Control,$wt.events.TreeListener");
Clazz.defineMethod (c$, "cancelEditing", 
function () {
this.treeViewerImpl.cancelEditing ();
});
Clazz.defineMethod (c$, "doUpdateItem", 
function (item, element) {
if (!(Clazz.instanceOf (item, $wt.widgets.TreeItem))) return ;
var treeItem = item;
if (treeItem.isDisposed ()) {
this.unmapElement (element);
return ;
}this.getColorAndFontCollector ().setFontsAndColors (element);
var prov = this.getLabelProvider ();
var tprov = null;
var lprov = null;
var vprov = null;
if (Clazz.instanceOf (prov, org.eclipse.jface.viewers.ILabelProvider)) lprov = prov;
if (Clazz.instanceOf (prov, org.eclipse.jface.viewers.IViewerLabelProvider)) {
vprov = prov;
}if (Clazz.instanceOf (prov, org.eclipse.jface.viewers.ITableLabelProvider)) {
tprov = prov;
}var columnCount = this.tree.getColumnCount ();
if (columnCount == 0) {
var updateLabel =  new org.eclipse.jface.viewers.ViewerLabel (treeItem.getText (), treeItem.getImage ());
if (vprov != null) this.buildLabel (updateLabel, element, vprov);
 else {
if (lprov != null) this.buildLabel (updateLabel, element, lprov);
}if (treeItem.isDisposed ()) {
this.unmapElement (element);
return ;
}if (updateLabel.hasNewText ()) treeItem.setText (updateLabel.getText ());
if (updateLabel.hasNewImage ()) treeItem.setImage (updateLabel.getImage ());
} else {
for (var column = 0; column < columnCount; column++) {
var text = "";
var image = null;
this.treeColorAndFont.setFontsAndColors (treeItem, element, column);
if (tprov == null) {
if (column == 0) {
var updateLabel =  new org.eclipse.jface.viewers.ViewerLabel (treeItem.getText (), treeItem.getImage ());
if (vprov != null) this.buildLabel (updateLabel, element, vprov);
 else {
if (lprov != null) this.buildLabel (updateLabel, element, lprov);
}if (treeItem.isDisposed ()) {
this.unmapElement (element);
return ;
}text = updateLabel.getText ();
image = updateLabel.getImage ();
}} else {
text = tprov.getColumnText (element, column);
image = tprov.getColumnImage (element, column);
}if (text == null) text = "";
treeItem.setText (column, text);
if (treeItem.getImage (column) !== image) {
treeItem.setImage (column, image);
}}
}this.getColorAndFontCollector ().applyFontsAndColors (treeItem);
}, "$wt.widgets.Item,~O");
Clazz.defineMethod (c$, "editElement", 
function (element, column) {
this.treeViewerImpl.editElement (element, column);
}, "~O,~N");
Clazz.defineMethod (c$, "getCellEditors", 
function () {
return this.treeViewerImpl.getCellEditors ();
});
Clazz.defineMethod (c$, "getCellModifier", 
function () {
return this.treeViewerImpl.getCellModifier ();
});
Clazz.overrideMethod (c$, "getChildren", 
function (o) {
if (Clazz.instanceOf (o, $wt.widgets.TreeItem)) return (o).getItems ();
if (Clazz.instanceOf (o, $wt.widgets.Tree)) return (o).getItems ();
return null;
}, "$wt.widgets.Widget");
Clazz.defineMethod (c$, "getColumnProperties", 
function () {
return this.treeViewerImpl.getColumnProperties ();
});
Clazz.overrideMethod (c$, "getControl", 
function () {
return this.tree;
});
Clazz.overrideMethod (c$, "getExpanded", 
function (item) {
return (item).getExpanded ();
}, "$wt.widgets.Item");
Clazz.overrideMethod (c$, "getItem", 
function (x, y) {
return this.getTree ().getItem (this.getTree ().toControl ( new $wt.graphics.Point (x, y)));
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
Clazz.defineMethod (c$, "getTree", 
function () {
return this.tree;
});
Clazz.defineMethod (c$, "hookControl", 
function (control) {
Clazz.superCall (this, org.eclipse.jface.viewers.TreeViewer, "hookControl", [control]);
var treeControl = control;
treeControl.addMouseListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.TreeViewer$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "TreeViewer$1", $wt.events.MouseAdapter);
Clazz.overrideMethod (c$, "mouseDown", 
function (e) {
this.b$["org.eclipse.jface.viewers.TreeViewer"].treeViewerImpl.handleMouseDown (e);
}, "$wt.events.MouseEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.TreeViewer$1, i$, v$);
}) (this, null));
}, "$wt.widgets.Control");
Clazz.defineMethod (c$, "initTreeViewerImpl", 
($fz = function () {
this.treeViewerImpl = (function (i$, arg0, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.TreeViewer$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "TreeViewer$2", org.eclipse.jface.viewers.TreeEditorImpl);
Clazz.overrideMethod (c$, "getBounds", 
function (item, columnNumber) {
return (item).getBounds (columnNumber);
}, "$wt.widgets.Item,~N");
Clazz.overrideMethod (c$, "getColumnCount", 
function () {
return this.b$["org.eclipse.jface.viewers.TreeViewer"].getTree ().getColumnCount ();
});
Clazz.overrideMethod (c$, "getSelection", 
function () {
return this.b$["org.eclipse.jface.viewers.TreeViewer"].getTree ().getSelection ();
});
Clazz.overrideMethod (c$, "setEditor", 
function (w, item, columnNumber) {
this.b$["org.eclipse.jface.viewers.TreeViewer"].treeEditor.setEditor (w, item, columnNumber);
}, "$wt.widgets.Control,$wt.widgets.Item,~N");
Clazz.overrideMethod (c$, "setSelection", 
function (selection, b) {
this.b$["org.eclipse.jface.viewers.TreeViewer"].setSelection (selection, b);
}, "org.eclipse.jface.viewers.StructuredSelection,~B");
Clazz.overrideMethod (c$, "showSelection", 
function () {
this.b$["org.eclipse.jface.viewers.TreeViewer"].getTree ().showSelection ();
});
Clazz.overrideMethod (c$, "setLayoutData", 
function (layoutData) {
this.b$["org.eclipse.jface.viewers.TreeViewer"].treeEditor.grabHorizontal = layoutData.grabHorizontal;
this.b$["org.eclipse.jface.viewers.TreeViewer"].treeEditor.horizontalAlignment = layoutData.horizontalAlignment;
this.b$["org.eclipse.jface.viewers.TreeViewer"].treeEditor.minimumWidth = layoutData.minimumWidth;
}, "org.eclipse.jface.viewers.CellEditor.LayoutData");
Clazz.overrideMethod (c$, "handleDoubleClickEvent", 
function () {
var viewer = this.getViewer ();
this.b$["org.eclipse.jface.viewers.TreeViewer"].fireDoubleClick ( new org.eclipse.jface.viewers.DoubleClickEvent (viewer, viewer.getSelection ()));
this.b$["org.eclipse.jface.viewers.TreeViewer"].fireOpen ( new org.eclipse.jface.viewers.OpenEvent (viewer, viewer.getSelection ()));
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.TreeViewer$2, i$, v$, arg0);
}) (this, this, null);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "isCellEditorActive", 
function () {
return this.treeViewerImpl.isCellEditorActive ();
});
Clazz.overrideMethod (c$, "newItem", 
function (parent, flags, ix) {
var item;
if (ix >= 0) {
if (Clazz.instanceOf (parent, $wt.widgets.TreeItem)) item =  new $wt.widgets.TreeItem (parent, flags, ix);
 else item =  new $wt.widgets.TreeItem (parent, flags, ix);
} else {
if (Clazz.instanceOf (parent, $wt.widgets.TreeItem)) item =  new $wt.widgets.TreeItem (parent, flags);
 else item =  new $wt.widgets.TreeItem (parent, flags);
}return item;
}, "$wt.widgets.Widget,~N,~N");
Clazz.overrideMethod (c$, "removeAll", 
function (widget) {
(widget).removeAll ();
}, "$wt.widgets.Control");
Clazz.defineMethod (c$, "setCellEditors", 
function (editors) {
this.treeViewerImpl.setCellEditors (editors);
}, "~A");
Clazz.defineMethod (c$, "setCellModifier", 
function (modifier) {
this.treeViewerImpl.setCellModifier (modifier);
}, "org.eclipse.jface.viewers.ICellModifier");
Clazz.defineMethod (c$, "setColumnProperties", 
function (columnProperties) {
this.treeViewerImpl.setColumnProperties (columnProperties);
}, "~A");
Clazz.overrideMethod (c$, "setExpanded", 
function (node, expand) {
(node).setExpanded (expand);
}, "$wt.widgets.Item,~B");
Clazz.defineMethod (c$, "setLabelProvider", 
function (labelProvider) {
org.eclipse.jface.util.Assert.isTrue (Clazz.instanceOf (labelProvider, org.eclipse.jface.viewers.ITableLabelProvider) || Clazz.instanceOf (labelProvider, org.eclipse.jface.viewers.ILabelProvider));
Clazz.superCall (this, org.eclipse.jface.viewers.TreeViewer, "setLabelProvider", [labelProvider]);
this.treeColorAndFont = Clazz.innerTypeInstance (org.eclipse.jface.viewers.TreeViewer.TreeColorAndFontCollector, this, null, labelProvider);
}, "org.eclipse.jface.viewers.IBaseLabelProvider");
Clazz.defineMethod (c$, "setSelection", 
function (items) {
var current = this.getSelection (this.getTree ());
if (this.isSameSelection (items, current)) return ;
var newItems =  new Array (items.size ());
items.toArray (newItems);
this.getTree ().setSelection (newItems);
}, "java.util.List");
Clazz.defineMethod (c$, "isSameSelection", 
function (items, current) {
var n = items.size ();
if (n != current.length) return false;
var itemSet = this.newHashtable (n * 2 + 1);
for (var i = items.iterator (); i.hasNext (); ) {
var item = i.next ();
var element = item.getData ();
itemSet.put (element, element);
}
for (var i = 0; i < current.length; i++) {
if (!itemSet.containsKey (current[i].getData ())) return false;
}
return true;
}, "java.util.List,~A");
Clazz.overrideMethod (c$, "showItem", 
function (item) {
this.getTree ().showItem (item);
}, "$wt.widgets.Item");
Clazz.overrideMethod (c$, "getChild", 
function (widget, index) {
if (Clazz.instanceOf (widget, $wt.widgets.TreeItem)) return (widget).getItem (index);
if (Clazz.instanceOf (widget, $wt.widgets.Tree)) return (widget).getItem (index);
return null;
}, "$wt.widgets.Widget,~N");
});
