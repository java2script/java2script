Clazz.declarePackage ("org.eclipse.jface.preference");
Clazz.load (["org.eclipse.jface.preference.PreferencePage", "org.eclipse.jface.util.IPropertyChangeListener"], "org.eclipse.jface.preference.FieldEditorPreferencePage", ["java.util.ArrayList", "$wt.layout.GridData", "$.GridLayout", "$wt.widgets.Composite"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fields = null;
this.style = 0;
this.invalidFieldEditor = null;
this.fieldEditorParent = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.preference, "FieldEditorPreferencePage", org.eclipse.jface.preference.PreferencePage, org.eclipse.jface.util.IPropertyChangeListener);
Clazz.makeConstructor (c$, 
function (style) {
Clazz.superConstructor (this, org.eclipse.jface.preference.FieldEditorPreferencePage);
this.style = style;
}, "~N");
Clazz.makeConstructor (c$, 
function (title, style) {
Clazz.superConstructor (this, org.eclipse.jface.preference.FieldEditorPreferencePage, [title]);
this.style = style;
}, "~S,~N");
Clazz.makeConstructor (c$, 
function (title, image, style) {
Clazz.superConstructor (this, org.eclipse.jface.preference.FieldEditorPreferencePage, [title, image]);
this.style = style;
}, "~S,org.eclipse.jface.resource.ImageDescriptor,~N");
Clazz.defineMethod (c$, "addField", 
function (editor) {
if (this.fields == null) this.fields =  new java.util.ArrayList ();
this.fields.add (editor);
}, "org.eclipse.jface.preference.FieldEditor");
Clazz.defineMethod (c$, "adjustGridLayout", 
function () {
var numColumns = this.calcNumberOfColumns ();
(this.fieldEditorParent.getLayout ()).numColumns = numColumns;
if (this.fields != null) {
for (var i = 0; i < this.fields.size (); i++) {
var fieldEditor = this.fields.get (i);
fieldEditor.adjustForNumColumns (numColumns);
}
}});
Clazz.defineMethod (c$, "applyFont", 
function () {
if (this.fields != null) {
var e = this.fields.iterator ();
while (e.hasNext ()) {
var pe = e.next ();
pe.applyFont ();
}
}});
Clazz.defineMethod (c$, "calcNumberOfColumns", 
($fz = function () {
var result = 0;
if (this.fields != null) {
var e = this.fields.iterator ();
while (e.hasNext ()) {
var pe = e.next ();
result = Math.max (result, pe.getNumberOfControls ());
}
}return result;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "checkState", 
function () {
var valid = true;
this.invalidFieldEditor = null;
if (this.fields != null) {
var size = this.fields.size ();
for (var i = 0; i < size; i++) {
var editor = this.fields.get (i);
valid = valid && editor.isValid ();
if (!valid) {
this.invalidFieldEditor = editor;
break;
}}
}this.setValid (valid);
});
Clazz.overrideMethod (c$, "createContents", 
function (parent) {
this.fieldEditorParent =  new $wt.widgets.Composite (parent, 0);
var layout =  new $wt.layout.GridLayout ();
layout.numColumns = 1;
layout.marginHeight = 0;
layout.marginWidth = 0;
this.fieldEditorParent.setLayout (layout);
this.fieldEditorParent.setFont (parent.getFont ());
this.createFieldEditors ();
if (this.style == 1) this.adjustGridLayout ();
this.initialize ();
this.checkState ();
return this.fieldEditorParent;
}, "$wt.widgets.Composite");
Clazz.overrideMethod (c$, "dispose", 
function () {
Clazz.superCall (this, org.eclipse.jface.preference.FieldEditorPreferencePage, "dispose", []);
if (this.fields != null) {
var e = this.fields.iterator ();
while (e.hasNext ()) {
var pe = e.next ();
pe.setPage (null);
pe.setPropertyChangeListener (null);
pe.setPreferenceStore (null);
}
}});
Clazz.defineMethod (c$, "getFieldEditorParent", 
function () {
if (this.style == 0) {
var parent =  new $wt.widgets.Composite (this.fieldEditorParent, 0);
parent.setLayoutData ( new $wt.layout.GridData (768));
return parent;
}return this.fieldEditorParent;
});
Clazz.defineMethod (c$, "initialize", 
function () {
if (this.fields != null) {
var e = this.fields.iterator ();
while (e.hasNext ()) {
var pe = e.next ();
pe.setPage (this);
pe.setPropertyChangeListener (this);
pe.setPreferenceStore (this.getPreferenceStore ());
pe.load ();
}
}});
Clazz.defineMethod (c$, "performDefaults", 
function () {
if (this.fields != null) {
var e = this.fields.iterator ();
while (e.hasNext ()) {
var pe = e.next ();
pe.loadDefault ();
}
}this.checkState ();
Clazz.superCall (this, org.eclipse.jface.preference.FieldEditorPreferencePage, "performDefaults", []);
});
Clazz.overrideMethod (c$, "performOk", 
function () {
if (this.fields != null) {
var e = this.fields.iterator ();
while (e.hasNext ()) {
var pe = e.next ();
pe.store ();
pe.setPresentsDefaultValue (false);
}
}return true;
});
Clazz.overrideMethod (c$, "propertyChange", 
function (event) {
if (event.getProperty ().equals ("field_editor_is_valid")) {
var newValue = (event.getNewValue ()).booleanValue ();
if (newValue) {
this.checkState ();
} else {
this.invalidFieldEditor = event.getSource ();
this.setValid (newValue);
}}}, "org.eclipse.jface.util.PropertyChangeEvent");
Clazz.overrideMethod (c$, "setVisible", 
function (visible) {
Clazz.superCall (this, org.eclipse.jface.preference.FieldEditorPreferencePage, "setVisible", [visible]);
if (visible && this.invalidFieldEditor != null) {
this.invalidFieldEditor.setFocus ();
}}, "~B");
Clazz.defineStatics (c$,
"FLAT", 0,
"GRID", 1,
"VERTICAL_SPACING", 10,
"MARGIN_WIDTH", 0,
"MARGIN_HEIGHT", 0);
});
