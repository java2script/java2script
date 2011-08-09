Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["org.eclipse.jface.viewers.CellEditor", "$wt.widgets.Layout"], "org.eclipse.jface.viewers.DialogCellEditor", ["java.text.MessageFormat", "org.eclipse.jface.resource.ImageDescriptor", "$.JFaceResources", "$wt.events.KeyAdapter", "$.SelectionAdapter", "$wt.graphics.Point", "$wt.widgets.Button", "$.Composite", "$.Label"], function () {
c$ = Clazz.decorateAsClass (function () {
this.editor = null;
this.contents = null;
this.defaultLabel = null;
this.button = null;
this.value = null;
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.DialogCellEditor.DialogCellLayout")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers.DialogCellEditor, "DialogCellLayout", $wt.widgets.Layout);
Clazz.overrideMethod (c$, "layout", 
function (a, b) {
var c = a.getClientArea ();
var d = this.b$["org.eclipse.jface.viewers.DialogCellEditor"].button.computeSize (-1, -1, b);
if (this.b$["org.eclipse.jface.viewers.DialogCellEditor"].contents != null) this.b$["org.eclipse.jface.viewers.DialogCellEditor"].contents.setBounds (0, 0, c.width - d.x, c.height);
this.b$["org.eclipse.jface.viewers.DialogCellEditor"].button.setBounds (c.width - d.x, 0, d.x, c.height);
}, "$wt.widgets.Composite,~B");
Clazz.overrideMethod (c$, "computeSize", 
function (a, b, c, d) {
if (b != -1 && c != -1) return  new $wt.graphics.Point (b, c);
var e = this.b$["org.eclipse.jface.viewers.DialogCellEditor"].contents.computeSize (-1, -1, d);
var f = this.b$["org.eclipse.jface.viewers.DialogCellEditor"].button.computeSize (-1, -1, d);
var g =  new $wt.graphics.Point (f.x, Math.max (e.y, f.y));
return g;
}, "$wt.widgets.Composite,~N,~N,~B");
c$ = Clazz.p0p ();
}
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "DialogCellEditor", org.eclipse.jface.viewers.CellEditor);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.jface.viewers.DialogCellEditor, []);
this.setStyle (0);
});
Clazz.makeConstructor (c$, 
function (parent) {
this.construct (parent, 0);
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "createButton", 
function (parent) {
var result =  new $wt.widgets.Button (parent, 1024);
result.setText ("...");
return result;
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "createContents", 
function (cell) {
this.defaultLabel =  new $wt.widgets.Label (cell, 16384);
this.defaultLabel.setFont (cell.getFont ());
this.defaultLabel.setBackground (cell.getBackground ());
return this.defaultLabel;
}, "$wt.widgets.Composite");
Clazz.overrideMethod (c$, "createControl", 
function (parent) {
var font = parent.getFont ();
var bg = parent.getBackground ();
this.editor =  new $wt.widgets.Composite (parent, this.getStyle ());
this.editor.setFont (font);
this.editor.setBackground (bg);
this.editor.setLayout (Clazz.innerTypeInstance (org.eclipse.jface.viewers.DialogCellEditor.DialogCellLayout, this, null));
this.contents = this.createContents (this.editor);
this.updateContents (this.value);
this.button = this.createButton (this.editor);
this.button.setFont (font);
this.button.addKeyListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.DialogCellEditor$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "DialogCellEditor$1", $wt.events.KeyAdapter);
Clazz.overrideMethod (c$, "keyReleased", 
function (e) {
if ((e.character).charCodeAt (0) == ('\u001b').charCodeAt (0)) {
this.b$["org.eclipse.jface.viewers.DialogCellEditor"].fireCancelEditor ();
}}, "$wt.events.KeyEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.DialogCellEditor$1, i$, v$);
}) (this, null));
this.button.addSelectionListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.DialogCellEditor$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.viewers, "DialogCellEditor$2", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (event) {
var newValue = this.b$["org.eclipse.jface.viewers.DialogCellEditor"].openDialogBox (this.b$["org.eclipse.jface.viewers.DialogCellEditor"].editor);
if (newValue != null) {
var newValidState = this.b$["org.eclipse.jface.viewers.DialogCellEditor"].isCorrect (newValue);
if (newValidState) {
this.b$["org.eclipse.jface.viewers.DialogCellEditor"].markDirty ();
this.b$["org.eclipse.jface.viewers.DialogCellEditor"].doSetValue (newValue);
} else {
this.b$["org.eclipse.jface.viewers.DialogCellEditor"].setErrorMessage (java.text.MessageFormat.format (this.b$["org.eclipse.jface.viewers.DialogCellEditor"].getErrorMessage (), [newValue.toString ()]));
}this.b$["org.eclipse.jface.viewers.DialogCellEditor"].fireApplyEditorValue ();
}}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.DialogCellEditor$2, i$, v$);
}) (this, null));
this.setValueValid (true);
return this.editor;
}, "$wt.widgets.Composite");
Clazz.overrideMethod (c$, "doGetValue", 
function () {
return this.value;
});
Clazz.overrideMethod (c$, "doSetFocus", 
function () {
this.button.setFocus ();
});
Clazz.overrideMethod (c$, "doSetValue", 
function (value) {
this.value = value;
this.updateContents (value);
}, "~O");
Clazz.defineMethod (c$, "getDefaultLabel", 
function () {
return this.defaultLabel;
});
Clazz.defineMethod (c$, "updateContents", 
function (value) {
if (this.defaultLabel == null) return ;
var text = "";
if (value != null) text = value.toString ();
this.defaultLabel.setText (text);
}, "~O");
Clazz.defineStatics (c$,
"CELL_EDITOR_IMG_DOTS_BUTTON", "cell_editor_dots_button_image");
{
var reg = org.eclipse.jface.resource.JFaceResources.getImageRegistry ();
reg.put ("cell_editor_dots_button_image", org.eclipse.jface.resource.ImageDescriptor.createFromFile (org.eclipse.jface.viewers.DialogCellEditor, "images/dots_button.gif"));
}Clazz.defineStatics (c$,
"$defaultStyle", 0);
});
