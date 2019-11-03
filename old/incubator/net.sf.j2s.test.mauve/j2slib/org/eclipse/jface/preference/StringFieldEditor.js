Clazz.declarePackage ("org.eclipse.jface.preference");
Clazz.load (["org.eclipse.jface.preference.FieldEditor"], "org.eclipse.jface.preference.StringFieldEditor", ["org.eclipse.jface.resource.JFaceResources", "org.eclipse.jface.util.Assert", "$wt.events.DisposeListener", "$.FocusAdapter", "$.KeyAdapter", "$wt.graphics.GC", "$wt.layout.GridData", "$wt.widgets.Text"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$isValid = false;
this.oldValue = null;
this.textField = null;
this.widthInChars = 0;
this.textLimit = 0;
this.errorMessage = null;
this.emptyStringAllowed = true;
this.validateStrategy = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.preference, "StringFieldEditor", org.eclipse.jface.preference.FieldEditor);
Clazz.prepareFields (c$, function () {
this.widthInChars = org.eclipse.jface.preference.StringFieldEditor.UNLIMITED;
this.textLimit = org.eclipse.jface.preference.StringFieldEditor.UNLIMITED;
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.jface.preference.StringFieldEditor, []);
});
Clazz.makeConstructor (c$, 
function (name, labelText, width, strategy, parent) {
Clazz.superConstructor (this, org.eclipse.jface.preference.StringFieldEditor, []);
this.init (name, labelText);
this.widthInChars = width;
this.setValidateStrategy (strategy);
this.$isValid = false;
this.errorMessage = org.eclipse.jface.resource.JFaceResources.getString ("StringFieldEditor.errorMessage");
this.createControl (parent);
}, "~S,~S,~N,~N,$wt.widgets.Composite");
Clazz.makeConstructor (c$, 
function (name, labelText, width, parent) {
this.construct (name, labelText, width, 0, parent);
}, "~S,~S,~N,$wt.widgets.Composite");
Clazz.makeConstructor (c$, 
function (name, labelText, parent) {
this.construct (name, labelText, org.eclipse.jface.preference.StringFieldEditor.UNLIMITED, parent);
}, "~S,~S,$wt.widgets.Composite");
Clazz.overrideMethod (c$, "adjustForNumColumns", 
function (numColumns) {
var gd = this.textField.getLayoutData ();
gd.horizontalSpan = numColumns - 1;
gd.grabExcessHorizontalSpace = gd.horizontalSpan == 1;
}, "~N");
Clazz.defineMethod (c$, "checkState", 
function () {
var result = false;
if (this.emptyStringAllowed) result = true;
if (this.textField == null) result = false;
var txt = this.textField.getText ();
result = (txt.trim ().length > 0) || this.emptyStringAllowed;
result = result && this.doCheckState ();
if (result) this.clearErrorMessage ();
 else this.showErrorMessage (this.errorMessage);
return result;
});
Clazz.defineMethod (c$, "doCheckState", 
function () {
return true;
});
Clazz.overrideMethod (c$, "doFillIntoGrid", 
function (parent, numColumns) {
this.getLabelControl (parent);
this.textField = this.getTextControl (parent);
var gd =  new $wt.layout.GridData ();
gd.horizontalSpan = numColumns - 1;
if (this.widthInChars != org.eclipse.jface.preference.StringFieldEditor.UNLIMITED) {
var gc =  new $wt.graphics.GC (this.textField);
try {
var extent = gc.textExtent ("X");
gd.widthHint = this.widthInChars * extent.x;
} finally {
gc.dispose ();
}
} else {
gd.horizontalAlignment = 4;
gd.grabExcessHorizontalSpace = true;
}this.textField.setLayoutData (gd);
}, "$wt.widgets.Composite,~N");
Clazz.overrideMethod (c$, "doLoad", 
function () {
if (this.textField != null) {
var value = this.getPreferenceStore ().getString (this.getPreferenceName ());
this.textField.setText (value);
this.oldValue = value;
}});
Clazz.overrideMethod (c$, "doLoadDefault", 
function () {
if (this.textField != null) {
var value = this.getPreferenceStore ().getDefaultString (this.getPreferenceName ());
this.textField.setText (value);
}this.valueChanged ();
});
Clazz.overrideMethod (c$, "doStore", 
function () {
this.getPreferenceStore ().setValue (this.getPreferenceName (), this.textField.getText ());
});
Clazz.defineMethod (c$, "getErrorMessage", 
function () {
return this.errorMessage;
});
Clazz.overrideMethod (c$, "getNumberOfControls", 
function () {
return 2;
});
Clazz.defineMethod (c$, "getStringValue", 
function () {
if (this.textField != null) return this.textField.getText ();
 else return this.getPreferenceStore ().getString (this.getPreferenceName ());
});
Clazz.defineMethod (c$, "getTextControl", 
function () {
return this.textField;
});
Clazz.defineMethod (c$, "getTextControl", 
function (parent) {
if (this.textField == null) {
this.textField =  new $wt.widgets.Text (parent, 2052);
this.textField.setFont (parent.getFont ());
switch (this.validateStrategy) {
case 0:
this.textField.addKeyListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.StringFieldEditor$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "StringFieldEditor$1", $wt.events.KeyAdapter);
Clazz.overrideMethod (c$, "keyReleased", 
function (e) {
this.b$["org.eclipse.jface.preference.StringFieldEditor"].valueChanged ();
}, "$wt.events.KeyEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.StringFieldEditor$1, i$, v$);
}) (this, null));
break;
case 1:
this.textField.addKeyListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.StringFieldEditor$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "StringFieldEditor$2", $wt.events.KeyAdapter);
Clazz.overrideMethod (c$, "keyPressed", 
function (e) {
this.b$["org.eclipse.jface.preference.StringFieldEditor"].clearErrorMessage ();
}, "$wt.events.KeyEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.StringFieldEditor$2, i$, v$);
}) (this, null));
this.textField.addFocusListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.StringFieldEditor$3")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "StringFieldEditor$3", $wt.events.FocusAdapter);
Clazz.overrideMethod (c$, "focusGained", 
function (e) {
this.b$["org.eclipse.jface.preference.StringFieldEditor"].refreshValidState ();
}, "$wt.events.FocusEvent");
Clazz.overrideMethod (c$, "focusLost", 
function (e) {
this.b$["org.eclipse.jface.preference.StringFieldEditor"].valueChanged ();
this.b$["org.eclipse.jface.preference.StringFieldEditor"].clearErrorMessage ();
}, "$wt.events.FocusEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.StringFieldEditor$3, i$, v$);
}) (this, null));
break;
default:
org.eclipse.jface.util.Assert.isTrue (false, "Unknown validate strategy");
}
this.textField.addDisposeListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.StringFieldEditor$4")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "StringFieldEditor$4", null, $wt.events.DisposeListener);
Clazz.overrideMethod (c$, "widgetDisposed", 
function (event) {
this.b$["org.eclipse.jface.preference.StringFieldEditor"].textField = null;
}, "$wt.events.DisposeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.StringFieldEditor$4, i$, v$);
}) (this, null));
if (this.textLimit > 0) {
this.textField.setTextLimit (this.textLimit);
}} else {
this.checkParent (this.textField, parent);
}return this.textField;
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "isEmptyStringAllowed", 
function () {
return this.emptyStringAllowed;
});
Clazz.overrideMethod (c$, "isValid", 
function () {
return this.$isValid;
});
Clazz.overrideMethod (c$, "refreshValidState", 
function () {
this.$isValid = this.checkState ();
});
Clazz.defineMethod (c$, "setEmptyStringAllowed", 
function (b) {
this.emptyStringAllowed = b;
}, "~B");
Clazz.defineMethod (c$, "setErrorMessage", 
function (message) {
this.errorMessage = message;
}, "~S");
Clazz.overrideMethod (c$, "setFocus", 
function () {
if (this.textField != null) {
this.textField.setFocus ();
}});
Clazz.defineMethod (c$, "setStringValue", 
function (value) {
if (this.textField != null) {
if (value == null) value = "";
this.oldValue = this.textField.getText ();
if (!this.oldValue.equals (value)) {
this.textField.setText (value);
this.valueChanged ();
}}}, "~S");
Clazz.defineMethod (c$, "setTextLimit", 
function (limit) {
this.textLimit = limit;
if (this.textField != null) this.textField.setTextLimit (limit);
}, "~N");
Clazz.defineMethod (c$, "setValidateStrategy", 
function (value) {
org.eclipse.jface.util.Assert.isTrue (value == 1 || value == 0);
this.validateStrategy = value;
}, "~N");
Clazz.defineMethod (c$, "showErrorMessage", 
function () {
this.showErrorMessage (this.errorMessage);
});
Clazz.defineMethod (c$, "valueChanged", 
function () {
this.setPresentsDefaultValue (false);
var oldState = this.$isValid;
this.refreshValidState ();
if (this.$isValid != oldState) this.fireStateChanged ("field_editor_is_valid", oldState, this.$isValid);
var newValue = this.textField.getText ();
if (!newValue.equals (this.oldValue)) {
this.fireValueChanged ("field_editor_value", this.oldValue, newValue);
this.oldValue = newValue;
}});
Clazz.defineMethod (c$, "setEnabled", 
function (enabled, parent) {
Clazz.superCall (this, org.eclipse.jface.preference.StringFieldEditor, "setEnabled", [enabled, parent]);
this.getTextControl (parent).setEnabled (enabled);
}, "~B,$wt.widgets.Composite");
Clazz.defineStatics (c$,
"VALIDATE_ON_KEY_STROKE", 0,
"VALIDATE_ON_FOCUS_LOST", 1,
"UNLIMITED", -1);
});
