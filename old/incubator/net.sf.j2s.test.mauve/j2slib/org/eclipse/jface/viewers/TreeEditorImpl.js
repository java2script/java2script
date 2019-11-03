Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (null, "org.eclipse.jface.viewers.TreeEditorImpl", ["org.eclipse.jface.viewers.ICellEditorListener", "$.StructuredSelection", "$wt.events.FocusAdapter", "$.MouseAdapter", "$wt.widgets.Display"], function () {
c$ = Clazz.decorateAsClass (function () {
this.cellEditor = null;
this.cellEditors = null;
this.cellModifier = null;
this.columnProperties = null;
this.treeItem = null;
this.columnNumber = 0;
this.cellEditorListener = null;
this.focusListener = null;
this.mouseListener = null;
this.doubleClickExpirationTime = 0;
this.viewer = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "TreeEditorImpl");
Clazz.makeConstructor (c$, 
function (viewer) {
this.viewer = viewer;
this.initCellEditorListener ();
}, "org.eclipse.jface.viewers.StructuredViewer");
Clazz.defineMethod (c$, "getViewer", 
function () {
return this.viewer;
});
Clazz.defineMethod (c$, "activateCellEditor", 
($fz = function () {
if (this.cellEditors != null) {
if (this.cellEditors[this.columnNumber] != null && this.cellModifier != null) {
var element = this.treeItem.getData ();
var property = this.columnProperties[this.columnNumber];
if (this.cellModifier.canModify (element, property)) {
this.cellEditor = this.cellEditors[this.columnNumber];
this.cellEditor.addListener (this.cellEditorListener);
var value = this.cellModifier.getValue (element, property);
this.cellEditor.setValue (value);
var control = this.cellEditor.getControl ();
this.cellEditor.activate ();
if (control == null) return ;
this.setLayoutData (this.cellEditor.getLayoutData ());
this.setEditor (control, this.treeItem, this.columnNumber);
this.cellEditor.setFocus ();
if (this.focusListener == null) {
this.focusListener = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.TreeEditorImpl$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "TreeEditorImpl$1", $wt.events.FocusAdapter);
Clazz.overrideMethod (c$, "focusLost", 
function (e) {
this.b$["org.eclipse.jface.viewers.TreeEditorImpl"].applyEditorValue ();
}, "$wt.events.FocusEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.TreeEditorImpl$1, i$, v$);
}) (this, null);
}control.addFocusListener (this.focusListener);
this.mouseListener = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.TreeEditorImpl$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "TreeEditorImpl$2", $wt.events.MouseAdapter);
Clazz.overrideMethod (c$, "mouseDown", 
function (e) {
if (e.time <= this.b$["org.eclipse.jface.viewers.TreeEditorImpl"].doubleClickExpirationTime) {
this.f$.control.removeMouseListener (this.b$["org.eclipse.jface.viewers.TreeEditorImpl"].mouseListener);
this.b$["org.eclipse.jface.viewers.TreeEditorImpl"].cancelEditing ();
this.b$["org.eclipse.jface.viewers.TreeEditorImpl"].handleDoubleClickEvent ();
} else if (this.b$["org.eclipse.jface.viewers.TreeEditorImpl"].mouseListener != null) {
this.f$.control.removeMouseListener (this.b$["org.eclipse.jface.viewers.TreeEditorImpl"].mouseListener);
}}, "$wt.events.MouseEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.TreeEditorImpl$2, i$, v$);
}) (this, Clazz.cloneFinals ("control", control));
control.addMouseListener (this.mouseListener);
}}}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "activateCellEditor", 
($fz = function (event) {
if (this.treeItem == null || this.treeItem.isDisposed ()) {
return ;
}var columnToEdit;
var columns = this.getColumnCount ();
if (columns == 0) {
columnToEdit = 0;
} else {
columnToEdit = -1;
for (var i = 0; i < columns; i++) {
var bounds = this.getBounds (this.treeItem, i);
if (bounds.contains (event.x, event.y)) {
columnToEdit = i;
break;
}}
if (columnToEdit == -1) {
return ;
}}this.columnNumber = columnToEdit;
this.activateCellEditor ();
}, $fz.isPrivate = true, $fz), "$wt.events.MouseEvent");
Clazz.defineMethod (c$, "applyEditorValue", 
function () {
var c = this.cellEditor;
if (c != null) {
this.cellEditor = null;
var t = this.treeItem;
if (t != null && !t.isDisposed ()) {
this.saveEditorValue (c, t);
}this.setEditor (null, null, 0);
c.removeListener (this.cellEditorListener);
var control = c.getControl ();
if (control != null) {
if (this.mouseListener != null) {
control.removeMouseListener (this.mouseListener);
}if (this.focusListener != null) {
control.removeFocusListener (this.focusListener);
}}c.deactivate ();
}});
Clazz.defineMethod (c$, "cancelEditing", 
function () {
if (this.cellEditor != null) {
this.setEditor (null, null, 0);
this.cellEditor.removeListener (this.cellEditorListener);
var oldEditor = this.cellEditor;
this.cellEditor = null;
oldEditor.deactivate ();
}});
Clazz.defineMethod (c$, "editElement", 
function (element, column) {
if (this.cellEditor != null) this.applyEditorValue ();
this.setSelection ( new org.eclipse.jface.viewers.StructuredSelection (element), true);
var selection = this.getSelection ();
if (selection.length != 1) return ;
this.treeItem = selection[0];
this.showSelection ();
this.columnNumber = column;
this.activateCellEditor ();
}, "~O,~N");
Clazz.defineMethod (c$, "getCellEditors", 
function () {
return this.cellEditors;
});
Clazz.defineMethod (c$, "getCellModifier", 
function () {
return this.cellModifier;
});
Clazz.defineMethod (c$, "getColumnProperties", 
function () {
return this.columnProperties;
});
Clazz.defineMethod (c$, "handleMouseDown", 
function (event) {
if (event.button != 1) return ;
if (this.cellEditor != null) this.applyEditorValue ();
this.doubleClickExpirationTime = event.time + $wt.widgets.Display.getCurrent ().getDoubleClickTime ();
var items = this.getSelection ();
if (items.length != 1) {
this.treeItem = null;
return ;
}this.treeItem = items[0];
this.activateCellEditor (event);
}, "$wt.events.MouseEvent");
Clazz.defineMethod (c$, "initCellEditorListener", 
($fz = function () {
this.cellEditorListener = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.TreeEditorImpl$3")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "TreeEditorImpl$3", null, org.eclipse.jface.viewers.ICellEditorListener);
Clazz.overrideMethod (c$, "editorValueChanged", 
function (oldValidState, newValidState) {
}, "~B,~B");
Clazz.overrideMethod (c$, "cancelEditor", 
function () {
this.b$["org.eclipse.jface.viewers.TreeEditorImpl"].cancelEditing ();
});
Clazz.overrideMethod (c$, "applyEditorValue", 
function () {
this.b$["org.eclipse.jface.viewers.TreeEditorImpl"].applyEditorValue ();
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.TreeEditorImpl$3, i$, v$);
}) (this, null);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "isCellEditorActive", 
function () {
return this.cellEditor != null;
});
Clazz.defineMethod (c$, "saveEditorValue", 
($fz = function (cellEditor, treeItem) {
if (this.cellModifier != null) {
var property = null;
if (this.columnProperties != null && this.columnNumber < this.columnProperties.length) property = this.columnProperties[this.columnNumber];
this.cellModifier.modify (treeItem, property, cellEditor.getValue ());
}}, $fz.isPrivate = true, $fz), "org.eclipse.jface.viewers.CellEditor,$wt.widgets.Item");
Clazz.defineMethod (c$, "setCellEditors", 
function (editors) {
this.cellEditors = editors;
}, "~A");
Clazz.defineMethod (c$, "setCellModifier", 
function (modifier) {
this.cellModifier = modifier;
}, "org.eclipse.jface.viewers.ICellModifier");
Clazz.defineMethod (c$, "setColumnProperties", 
function (columnProperties) {
this.columnProperties = columnProperties;
}, "~A");
});
