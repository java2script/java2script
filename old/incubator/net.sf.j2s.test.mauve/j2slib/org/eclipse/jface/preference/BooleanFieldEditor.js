Clazz.declarePackage ("org.eclipse.jface.preference");
Clazz.load (["org.eclipse.jface.preference.FieldEditor"], "org.eclipse.jface.preference.BooleanFieldEditor", ["$wt.events.DisposeListener", "$.SelectionAdapter", "$wt.layout.GridData", "$wt.widgets.Button"], function () {
c$ = Clazz.decorateAsClass (function () {
this.style = 0;
this.wasSelected = false;
this.checkBox = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.preference, "BooleanFieldEditor", org.eclipse.jface.preference.FieldEditor);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.jface.preference.BooleanFieldEditor, []);
});
Clazz.makeConstructor (c$, 
function (name, labelText, style, parent) {
Clazz.superConstructor (this, org.eclipse.jface.preference.BooleanFieldEditor, []);
this.init (name, labelText);
this.style = style;
this.createControl (parent);
}, "~S,~S,~N,$wt.widgets.Composite");
Clazz.makeConstructor (c$, 
function (name, label, parent) {
this.construct (name, label, 0, parent);
}, "~S,~S,$wt.widgets.Composite");
Clazz.overrideMethod (c$, "adjustForNumColumns", 
function (numColumns) {
if (this.style == 1) numColumns--;
(this.checkBox.getLayoutData ()).horizontalSpan = numColumns;
}, "~N");
Clazz.overrideMethod (c$, "doFillIntoGrid", 
function (parent, numColumns) {
var text = this.getLabelText ();
switch (this.style) {
case 1:
this.getLabelControl (parent);
numColumns--;
text = null;
default:
this.checkBox = this.getChangeControl (parent);
var gd =  new $wt.layout.GridData ();
gd.horizontalSpan = numColumns;
this.checkBox.setLayoutData (gd);
if (text != null) this.checkBox.setText (text);
}
}, "$wt.widgets.Composite,~N");
Clazz.overrideMethod (c$, "doLoad", 
function () {
if (this.checkBox != null) {
var value = this.getPreferenceStore ().getBoolean (this.getPreferenceName ());
this.checkBox.setSelection (value);
this.wasSelected = value;
}});
Clazz.overrideMethod (c$, "doLoadDefault", 
function () {
if (this.checkBox != null) {
var value = this.getPreferenceStore ().getDefaultBoolean (this.getPreferenceName ());
this.checkBox.setSelection (value);
this.wasSelected = value;
}});
Clazz.overrideMethod (c$, "doStore", 
function () {
this.getPreferenceStore ().setValue (this.getPreferenceName (), this.checkBox.getSelection ());
});
Clazz.defineMethod (c$, "getBooleanValue", 
function () {
return this.checkBox.getSelection ();
});
Clazz.defineMethod (c$, "getChangeControl", 
function (parent) {
if (this.checkBox == null) {
this.checkBox =  new $wt.widgets.Button (parent, 16416);
this.checkBox.setFont (parent.getFont ());
this.checkBox.addSelectionListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.BooleanFieldEditor$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "BooleanFieldEditor$1", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (e) {
var isSelected = this.b$["org.eclipse.jface.preference.BooleanFieldEditor"].checkBox.getSelection ();
this.b$["org.eclipse.jface.preference.BooleanFieldEditor"].valueChanged (this.b$["org.eclipse.jface.preference.BooleanFieldEditor"].wasSelected, isSelected);
this.b$["org.eclipse.jface.preference.BooleanFieldEditor"].wasSelected = isSelected;
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.BooleanFieldEditor$1, i$, v$);
}) (this, null));
this.checkBox.addDisposeListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.BooleanFieldEditor$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "BooleanFieldEditor$2", null, $wt.events.DisposeListener);
Clazz.overrideMethod (c$, "widgetDisposed", 
function (event) {
this.b$["org.eclipse.jface.preference.BooleanFieldEditor"].checkBox = null;
}, "$wt.events.DisposeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.BooleanFieldEditor$2, i$, v$);
}) (this, null));
} else {
this.checkParent (this.checkBox, parent);
}return this.checkBox;
}, "$wt.widgets.Composite");
Clazz.overrideMethod (c$, "getNumberOfControls", 
function () {
switch (this.style) {
case 1:
return 2;
default:
return 1;
}
});
Clazz.overrideMethod (c$, "setFocus", 
function () {
if (this.checkBox != null) {
this.checkBox.setFocus ();
}});
Clazz.defineMethod (c$, "setLabelText", 
function (text) {
Clazz.superCall (this, org.eclipse.jface.preference.BooleanFieldEditor, "setLabelText", [text]);
var label = this.getLabelControl ();
if (label == null && this.checkBox != null) {
this.checkBox.setText (text);
}}, "~S");
Clazz.defineMethod (c$, "valueChanged", 
function (oldValue, newValue) {
this.setPresentsDefaultValue (false);
if (oldValue != newValue) this.fireStateChanged ("field_editor_value", oldValue, newValue);
}, "~B,~B");
Clazz.defineMethod (c$, "setEnabled", 
function (enabled, parent) {
if (this.style == 1) Clazz.superCall (this, org.eclipse.jface.preference.BooleanFieldEditor, "setEnabled", [enabled, parent]);
this.getChangeControl (parent).setEnabled (enabled);
}, "~B,$wt.widgets.Composite");
Clazz.defineStatics (c$,
"DEFAULT", 0,
"SEPARATE_LABEL", 1);
});
