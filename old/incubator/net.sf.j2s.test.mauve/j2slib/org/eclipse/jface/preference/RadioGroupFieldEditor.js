Clazz.declarePackage ("org.eclipse.jface.preference");
Clazz.load (["org.eclipse.jface.preference.FieldEditor"], "org.eclipse.jface.preference.RadioGroupFieldEditor", ["org.eclipse.jface.util.Assert", "$wt.events.DisposeListener", "$.SelectionAdapter", "$wt.layout.GridData", "$.GridLayout", "$wt.widgets.Button", "$.Composite", "$.Group"], function () {
c$ = Clazz.decorateAsClass (function () {
this.labelsAndValues = null;
this.numColumns = 0;
this.indent = 8;
this.value = null;
this.radioBox = null;
this.radioButtons = null;
this.useGroup = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.preference, "RadioGroupFieldEditor", org.eclipse.jface.preference.FieldEditor);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.jface.preference.RadioGroupFieldEditor, []);
});
Clazz.makeConstructor (c$, 
function (name, labelText, numColumns, labelAndValues, parent) {
this.construct (name, labelText, numColumns, labelAndValues, parent, false);
}, "~S,~S,~N,~A,$wt.widgets.Composite");
Clazz.makeConstructor (c$, 
function (name, labelText, numColumns, labelAndValues, parent, useGroup) {
Clazz.superConstructor (this, org.eclipse.jface.preference.RadioGroupFieldEditor, []);
this.init (name, labelText);
org.eclipse.jface.util.Assert.isTrue (this.checkArray (labelAndValues));
this.labelsAndValues = labelAndValues;
this.numColumns = numColumns;
this.useGroup = useGroup;
this.createControl (parent);
}, "~S,~S,~N,~A,$wt.widgets.Composite,~B");
Clazz.overrideMethod (c$, "adjustForNumColumns", 
function (numColumns) {
var control = this.getLabelControl ();
if (control != null) {
(control.getLayoutData ()).horizontalSpan = numColumns;
}(this.radioBox.getLayoutData ()).horizontalSpan = numColumns;
}, "~N");
Clazz.defineMethod (c$, "checkArray", 
($fz = function (table) {
if (table == null) return false;
for (var i = 0; i < table.length; i++) {
var array = table[i];
if (array == null || array.length != 2) return false;
}
return true;
}, $fz.isPrivate = true, $fz), "~A");
Clazz.overrideMethod (c$, "doFillIntoGrid", 
function (parent, numColumns) {
if (this.useGroup) {
var control = this.getRadioBoxControl (parent);
var gd =  new $wt.layout.GridData (768);
control.setLayoutData (gd);
} else {
var control = this.getLabelControl (parent);
var gd =  new $wt.layout.GridData ();
gd.horizontalSpan = numColumns;
control.setLayoutData (gd);
control = this.getRadioBoxControl (parent);
gd =  new $wt.layout.GridData ();
gd.horizontalSpan = numColumns;
gd.horizontalIndent = this.indent;
control.setLayoutData (gd);
}}, "$wt.widgets.Composite,~N");
Clazz.overrideMethod (c$, "doLoad", 
function () {
this.updateValue (this.getPreferenceStore ().getString (this.getPreferenceName ()));
});
Clazz.overrideMethod (c$, "doLoadDefault", 
function () {
this.updateValue (this.getPreferenceStore ().getDefaultString (this.getPreferenceName ()));
});
Clazz.overrideMethod (c$, "doStore", 
function () {
if (this.value == null) {
this.getPreferenceStore ().setToDefault (this.getPreferenceName ());
return ;
}this.getPreferenceStore ().setValue (this.getPreferenceName (), this.value);
});
Clazz.overrideMethod (c$, "getNumberOfControls", 
function () {
return 1;
});
Clazz.defineMethod (c$, "getRadioBoxControl", 
function (parent) {
if (this.radioBox == null) {
var font = parent.getFont ();
if (this.useGroup) {
var group =  new $wt.widgets.Group (parent, 0);
group.setFont (font);
var text = this.getLabelText ();
if (text != null) group.setText (text);
this.radioBox = group;
var layout =  new $wt.layout.GridLayout ();
layout.horizontalSpacing = 8;
layout.numColumns = this.numColumns;
this.radioBox.setLayout (layout);
} else {
this.radioBox =  new $wt.widgets.Composite (parent, 0);
var layout =  new $wt.layout.GridLayout ();
layout.marginWidth = 0;
layout.marginHeight = 0;
layout.horizontalSpacing = 8;
layout.numColumns = this.numColumns;
this.radioBox.setLayout (layout);
this.radioBox.setFont (font);
}this.radioButtons =  new Array (this.labelsAndValues.length);
for (var i = 0; i < this.labelsAndValues.length; i++) {
var radio =  new $wt.widgets.Button (this.radioBox, 16400);
this.radioButtons[i] = radio;
var labelAndValue = this.labelsAndValues[i];
radio.setText (labelAndValue[0]);
radio.setData (labelAndValue[1]);
radio.setFont (font);
radio.addSelectionListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.RadioGroupFieldEditor$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "RadioGroupFieldEditor$1", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (event) {
var oldValue = this.b$["org.eclipse.jface.preference.RadioGroupFieldEditor"].value;
this.b$["org.eclipse.jface.preference.RadioGroupFieldEditor"].value = event.widget.getData ();
this.b$["org.eclipse.jface.preference.RadioGroupFieldEditor"].setPresentsDefaultValue (false);
this.b$["org.eclipse.jface.preference.RadioGroupFieldEditor"].fireValueChanged ("field_editor_value", oldValue, this.b$["org.eclipse.jface.preference.RadioGroupFieldEditor"].value);
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.RadioGroupFieldEditor$1, i$, v$);
}) (this, null));
}
this.radioBox.addDisposeListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.RadioGroupFieldEditor$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "RadioGroupFieldEditor$2", null, $wt.events.DisposeListener);
Clazz.overrideMethod (c$, "widgetDisposed", 
function (event) {
this.b$["org.eclipse.jface.preference.RadioGroupFieldEditor"].radioBox = null;
this.b$["org.eclipse.jface.preference.RadioGroupFieldEditor"].radioButtons = null;
}, "$wt.events.DisposeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.RadioGroupFieldEditor$2, i$, v$);
}) (this, null));
} else {
this.checkParent (this.radioBox, parent);
}return this.radioBox;
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "setIndent", 
function (indent) {
if (indent < 0) this.indent = 0;
 else this.indent = indent;
}, "~N");
Clazz.defineMethod (c$, "updateValue", 
($fz = function (selectedValue) {
this.value = selectedValue;
if (this.radioButtons == null) return ;
if (this.value != null) {
var found = false;
for (var i = 0; i < this.radioButtons.length; i++) {
var radio = this.radioButtons[i];
var selection = false;
if ((radio.getData ()).equals (this.value)) {
selection = true;
found = true;
}radio.setSelection (selection);
}
if (found) return ;
}if (this.radioButtons.length > 0) {
this.radioButtons[0].setSelection (true);
this.value = this.radioButtons[0].getData ();
}return ;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "setEnabled", 
function (enabled, parent) {
if (!this.useGroup) Clazz.superCall (this, org.eclipse.jface.preference.RadioGroupFieldEditor, "setEnabled", [enabled, parent]);
for (var i = 0; i < this.radioButtons.length; i++) {
this.radioButtons[i].setEnabled (enabled);
}
}, "~B,$wt.widgets.Composite");
});
