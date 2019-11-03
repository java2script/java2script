Clazz.declarePackage ("org.eclipse.jface.preference");
Clazz.load (["org.eclipse.jface.preference.StringFieldEditor"], "org.eclipse.jface.preference.IntegerFieldEditor", ["org.eclipse.jface.resource.JFaceResources"], function () {
c$ = Clazz.decorateAsClass (function () {
this.minValidValue = 0;
this.maxValidValue = 2147483647;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.preference, "IntegerFieldEditor", org.eclipse.jface.preference.StringFieldEditor);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.jface.preference.IntegerFieldEditor, []);
});
Clazz.makeConstructor (c$, 
function (name, labelText, parent) {
this.construct (name, labelText, parent, 10);
}, "~S,~S,$wt.widgets.Composite");
Clazz.makeConstructor (c$, 
function (name, labelText, parent, textLimit) {
Clazz.superConstructor (this, org.eclipse.jface.preference.IntegerFieldEditor, []);
this.init (name, labelText);
this.setTextLimit (textLimit);
this.setEmptyStringAllowed (false);
this.setErrorMessage (org.eclipse.jface.resource.JFaceResources.getString ("IntegerFieldEditor.errorMessage"));
this.createControl (parent);
}, "~S,~S,$wt.widgets.Composite,~N");
Clazz.defineMethod (c$, "setValidRange", 
function (min, max) {
this.minValidValue = min;
this.maxValidValue = max;
}, "~N,~N");
Clazz.overrideMethod (c$, "checkState", 
function () {
var text = this.getTextControl ();
if (text == null) return false;
var numberString = text.getText ();
try {
var number = Integer.$valueOf (numberString).intValue ();
if (number >= this.minValidValue && number <= this.maxValidValue) {
this.clearErrorMessage ();
return true;
} else {
this.showErrorMessage ();
return false;
}} catch (e1) {
if (Clazz.instanceOf (e1, NumberFormatException)) {
this.showErrorMessage ();
} else {
throw e1;
}
}
return false;
});
Clazz.overrideMethod (c$, "doLoad", 
function () {
var text = this.getTextControl ();
if (text != null) {
var value = this.getPreferenceStore ().getInt (this.getPreferenceName ());
text.setText ("" + value);
}});
Clazz.overrideMethod (c$, "doLoadDefault", 
function () {
var text = this.getTextControl ();
if (text != null) {
var value = this.getPreferenceStore ().getDefaultInt (this.getPreferenceName ());
text.setText ("" + value);
}this.valueChanged ();
});
Clazz.overrideMethod (c$, "doStore", 
function () {
var text = this.getTextControl ();
if (text != null) {
var i =  new Integer (text.getText ());
this.getPreferenceStore ().setValue (this.getPreferenceName (), i.intValue ());
}});
Clazz.defineMethod (c$, "getIntValue", 
function () {
return  new Integer (this.getStringValue ()).intValue ();
});
Clazz.defineStatics (c$,
"DEFAULT_TEXT_LIMIT", 10);
});
