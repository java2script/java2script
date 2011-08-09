Clazz.declarePackage ("org.eclipse.jface.preference");
Clazz.load (["org.eclipse.jface.preference.FieldEditor"], "org.eclipse.jface.preference.ScaleFieldEditor", ["$wt.events.DisposeListener", "$.SelectionAdapter", "$wt.layout.GridData", "$wt.widgets.Scale"], function () {
c$ = Clazz.decorateAsClass (function () {
this.incrementValue = 0;
this.maxValue = 0;
this.minValue = 0;
this.oldValue = 0;
this.pageIncrementValue = 0;
this.scale = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.preference, "ScaleFieldEditor", org.eclipse.jface.preference.FieldEditor);
Clazz.makeConstructor (c$, 
function (name, labelText, parent) {
Clazz.superConstructor (this, org.eclipse.jface.preference.ScaleFieldEditor, [name, labelText, parent]);
this.setDefaultValues ();
}, "~S,~S,$wt.widgets.Composite");
Clazz.makeConstructor (c$, 
function (name, labelText, parent, min, max, increment, pageIncrement) {
Clazz.superConstructor (this, org.eclipse.jface.preference.ScaleFieldEditor, [name, labelText, parent]);
this.setValues (min, max, increment, pageIncrement);
}, "~S,~S,$wt.widgets.Composite,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "adjustForNumColumns", 
function (numColumns) {
(this.scale.getLayoutData ()).horizontalSpan = numColumns - 1;
}, "~N");
Clazz.overrideMethod (c$, "doFillIntoGrid", 
function (parent, numColumns) {
var control = this.getLabelControl (parent);
var gd =  new $wt.layout.GridData ();
control.setLayoutData (gd);
this.scale = this.getScaleControl (parent);
gd =  new $wt.layout.GridData (768);
gd.verticalAlignment = 4;
gd.horizontalSpan = numColumns - 1;
gd.grabExcessHorizontalSpace = true;
this.scale.setLayoutData (gd);
this.updateScale ();
}, "$wt.widgets.Composite,~N");
Clazz.overrideMethod (c$, "doLoad", 
function () {
if (this.scale != null) {
var value = this.getPreferenceStore ().getInt (this.getPreferenceName ());
this.scale.setSelection (value);
this.oldValue = value;
}});
Clazz.overrideMethod (c$, "doLoadDefault", 
function () {
if (this.scale != null) {
var value = this.getPreferenceStore ().getDefaultInt (this.getPreferenceName ());
this.scale.setSelection (value);
}this.valueChanged ();
});
Clazz.overrideMethod (c$, "doStore", 
function () {
this.getPreferenceStore ().setValue (this.getPreferenceName (), this.scale.getSelection ());
});
Clazz.defineMethod (c$, "getIncrement", 
function () {
return this.incrementValue;
});
Clazz.defineMethod (c$, "getMaximum", 
function () {
return this.maxValue;
});
Clazz.defineMethod (c$, "getMinimum", 
function () {
return this.minValue;
});
Clazz.overrideMethod (c$, "getNumberOfControls", 
function () {
return 2;
});
Clazz.defineMethod (c$, "getPageIncrement", 
function () {
return this.pageIncrementValue;
});
Clazz.defineMethod (c$, "getScaleControl", 
function () {
return this.scale;
});
Clazz.defineMethod (c$, "getScaleControl", 
($fz = function (parent) {
if (this.scale == null) {
this.scale =  new $wt.widgets.Scale (parent, 256);
this.scale.setFont (parent.getFont ());
this.scale.addSelectionListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.ScaleFieldEditor$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "ScaleFieldEditor$1", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (event) {
this.b$["org.eclipse.jface.preference.ScaleFieldEditor"].valueChanged ();
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.ScaleFieldEditor$1, i$, v$);
}) (this, null));
this.scale.addDisposeListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.ScaleFieldEditor$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "ScaleFieldEditor$2", null, $wt.events.DisposeListener);
Clazz.overrideMethod (c$, "widgetDisposed", 
function (event) {
this.b$["org.eclipse.jface.preference.ScaleFieldEditor"].scale = null;
}, "$wt.events.DisposeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.ScaleFieldEditor$2, i$, v$);
}) (this, null));
} else {
this.checkParent (this.scale, parent);
}return this.scale;
}, $fz.isPrivate = true, $fz), "$wt.widgets.Composite");
Clazz.defineMethod (c$, "setDefaultValues", 
($fz = function () {
this.setValues (0, 10, 1, 1);
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "setFocus", 
function () {
if (this.scale != null && !this.scale.isDisposed ()) {
this.scale.setFocus ();
}});
Clazz.defineMethod (c$, "setIncrement", 
function (increment) {
this.incrementValue = increment;
this.updateScale ();
}, "~N");
Clazz.defineMethod (c$, "setMaximum", 
function (max) {
this.maxValue = max;
this.updateScale ();
}, "~N");
Clazz.defineMethod (c$, "setMinimum", 
function (min) {
this.minValue = min;
this.updateScale ();
}, "~N");
Clazz.defineMethod (c$, "setPageIncrement", 
function (pageIncrement) {
this.pageIncrementValue = pageIncrement;
this.updateScale ();
}, "~N");
Clazz.defineMethod (c$, "setValues", 
($fz = function (min, max, increment, pageIncrement) {
this.incrementValue = increment;
this.maxValue = max;
this.minValue = min;
this.pageIncrementValue = pageIncrement;
this.updateScale ();
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~N");
Clazz.defineMethod (c$, "updateScale", 
($fz = function () {
if (this.scale != null && !this.scale.isDisposed ()) {
this.scale.setMinimum (this.getMinimum ());
this.scale.setMaximum (this.getMaximum ());
this.scale.setIncrement (this.getIncrement ());
this.scale.setPageIncrement (this.getPageIncrement ());
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "valueChanged", 
function () {
this.setPresentsDefaultValue (false);
var newValue = this.scale.getSelection ();
if (newValue != this.oldValue) {
this.fireStateChanged ("field_editor_is_valid", false, true);
this.fireValueChanged ("field_editor_value",  new Integer (this.oldValue),  new Integer (newValue));
this.oldValue = newValue;
}});
});
