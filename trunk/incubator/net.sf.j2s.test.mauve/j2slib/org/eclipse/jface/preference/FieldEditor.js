Clazz.declarePackage ("org.eclipse.jface.preference");
Clazz.load (null, "org.eclipse.jface.preference.FieldEditor", ["java.lang.Boolean", "org.eclipse.jface.dialogs.Dialog", "org.eclipse.jface.util.Assert", "$.PropertyChangeEvent", "$wt.events.DisposeListener", "$wt.graphics.GC", "$wt.layout.GridData", "$.GridLayout", "$wt.widgets.Label"], function () {
c$ = Clazz.decorateAsClass (function () {
this.preferenceStore = null;
this.preferenceName = null;
this.isDefaultPresented = false;
this.labelText = null;
this.label = null;
this.propertyChangeListener = null;
this.page = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.preference, "FieldEditor");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (name, labelText, parent) {
this.init (name, labelText);
this.createControl (parent);
}, "~S,~S,$wt.widgets.Composite");
Clazz.defineMethod (c$, "applyFont", 
function () {
});
Clazz.defineMethod (c$, "checkParent", 
function (control, parent) {
org.eclipse.jface.util.Assert.isTrue (control.getParent () === parent, "Different parents");
}, "$wt.widgets.Control,$wt.widgets.Composite");
Clazz.defineMethod (c$, "clearErrorMessage", 
function () {
if (this.page != null) this.page.setErrorMessage (null);
});
Clazz.defineMethod (c$, "clearMessage", 
function () {
if (this.page != null) this.page.setMessage (null);
});
Clazz.defineMethod (c$, "convertHorizontalDLUsToPixels", 
function (control, dlus) {
var gc =  new $wt.graphics.GC (control);
gc.setFont (control.getFont ());
var averageWidth = gc.getFontMetrics ().getAverageCharWidth ();
gc.dispose ();
var horizontalDialogUnitSize = averageWidth * 0.25;
return Math.round (dlus * horizontalDialogUnitSize);
}, "$wt.widgets.Control,~N");
Clazz.defineMethod (c$, "convertVerticalDLUsToPixels", 
function (control, dlus) {
var gc =  new $wt.graphics.GC (control);
gc.setFont (control.getFont ());
var height = gc.getFontMetrics ().getHeight ();
gc.dispose ();
var verticalDialogUnitSize = height * 0.125;
return Math.round (dlus * verticalDialogUnitSize);
}, "$wt.widgets.Control,~N");
Clazz.defineMethod (c$, "createControl", 
function (parent) {
var layout =  new $wt.layout.GridLayout ();
layout.numColumns = this.getNumberOfControls ();
layout.marginWidth = 0;
layout.marginHeight = 0;
layout.horizontalSpacing = 8;
parent.setLayout (layout);
this.doFillIntoGrid (parent, layout.numColumns);
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "dispose", 
function () {
});
Clazz.defineMethod (c$, "fillIntoGrid", 
function (parent, numColumns) {
org.eclipse.jface.util.Assert.isTrue (numColumns >= this.getNumberOfControls ());
org.eclipse.jface.util.Assert.isTrue (Clazz.instanceOf (parent.getLayout (), $wt.layout.GridLayout));
this.doFillIntoGrid (parent, numColumns);
}, "$wt.widgets.Composite,~N");
Clazz.defineMethod (c$, "fireStateChanged", 
function (property, oldValue, newValue) {
if (oldValue == newValue) return ;
this.fireValueChanged (property,  new Boolean (oldValue),  new Boolean (newValue));
}, "~S,~B,~B");
Clazz.defineMethod (c$, "fireValueChanged", 
function (property, oldValue, newValue) {
if (this.propertyChangeListener == null) return ;
this.propertyChangeListener.propertyChange ( new org.eclipse.jface.util.PropertyChangeEvent (this, property, oldValue, newValue));
}, "~S,~O,~O");
Clazz.defineMethod (c$, "getFieldEditorFontName", 
function () {
return "org.eclipse.jface.dialogfont";
});
Clazz.defineMethod (c$, "getLabelControl", 
function () {
return this.label;
});
Clazz.defineMethod (c$, "getLabelControl", 
function (parent) {
if (this.label == null) {
this.label =  new $wt.widgets.Label (parent, 16384);
this.label.setFont (parent.getFont ());
var text = this.getLabelText ();
if (text != null) this.label.setText (text);
this.label.addDisposeListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.FieldEditor$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "FieldEditor$1", null, $wt.events.DisposeListener);
Clazz.overrideMethod (c$, "widgetDisposed", 
function (event) {
this.b$["org.eclipse.jface.preference.FieldEditor"].label = null;
}, "$wt.events.DisposeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.FieldEditor$1, i$, v$);
}) (this, null));
} else {
this.checkParent (this.label, parent);
}return this.label;
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "getLabelText", 
function () {
return this.labelText;
});
Clazz.defineMethod (c$, "getPreferenceName", 
function () {
return this.preferenceName;
});
Clazz.defineMethod (c$, "getPreferencePage", 
function () {
if (this.page != null && Clazz.instanceOf (this.page, org.eclipse.jface.preference.PreferencePage)) return this.page;
return null;
});
Clazz.defineMethod (c$, "getPage", 
function () {
return this.page;
});
Clazz.defineMethod (c$, "getPreferenceStore", 
function () {
return this.preferenceStore;
});
Clazz.defineMethod (c$, "init", 
function (name, text) {
org.eclipse.jface.util.Assert.isNotNull (name);
org.eclipse.jface.util.Assert.isNotNull (text);
this.preferenceName = name;
this.labelText = text;
}, "~S,~S");
Clazz.defineMethod (c$, "isValid", 
function () {
return true;
});
Clazz.defineMethod (c$, "load", 
function () {
if (this.preferenceStore != null) {
this.isDefaultPresented = false;
this.doLoad ();
this.refreshValidState ();
}});
Clazz.defineMethod (c$, "loadDefault", 
function () {
if (this.preferenceStore != null) {
this.isDefaultPresented = true;
this.doLoadDefault ();
this.refreshValidState ();
}});
Clazz.defineMethod (c$, "presentsDefaultValue", 
function () {
return this.isDefaultPresented;
});
Clazz.defineMethod (c$, "refreshValidState", 
function () {
});
Clazz.defineMethod (c$, "setFocus", 
function () {
});
Clazz.defineMethod (c$, "setLabelText", 
function (text) {
org.eclipse.jface.util.Assert.isNotNull (text);
this.labelText = text;
if (this.label != null) this.label.setText (text);
}, "~S");
Clazz.defineMethod (c$, "setPreferenceName", 
function (name) {
this.preferenceName = name;
}, "~S");
Clazz.defineMethod (c$, "setPreferencePage", 
function (preferencePage) {
this.setPage (preferencePage);
}, "org.eclipse.jface.preference.PreferencePage");
Clazz.defineMethod (c$, "setPage", 
function (dialogPage) {
this.page = dialogPage;
}, "org.eclipse.jface.dialogs.DialogPage");
Clazz.defineMethod (c$, "setPreferenceStore", 
function (store) {
this.preferenceStore = store;
}, "org.eclipse.jface.preference.IPreferenceStore");
Clazz.defineMethod (c$, "setPresentsDefaultValue", 
function (booleanValue) {
this.isDefaultPresented = booleanValue;
}, "~B");
Clazz.defineMethod (c$, "setPropertyChangeListener", 
function (listener) {
this.propertyChangeListener = listener;
}, "org.eclipse.jface.util.IPropertyChangeListener");
Clazz.defineMethod (c$, "showErrorMessage", 
function (msg) {
if (this.page != null) this.page.setErrorMessage (msg);
}, "~S");
Clazz.defineMethod (c$, "showMessage", 
function (msg) {
if (this.page != null) this.page.setErrorMessage (msg);
}, "~S");
Clazz.defineMethod (c$, "store", 
function () {
if (this.preferenceStore == null) return ;
if (this.isDefaultPresented) {
this.preferenceStore.setToDefault (this.preferenceName);
} else {
this.doStore ();
}});
Clazz.defineMethod (c$, "setButtonLayoutData", 
function (button) {
var data =  new $wt.layout.GridData (256);
var gc =  new $wt.graphics.GC (button);
gc.setFont (button.getFont ());
var fontMetrics = gc.getFontMetrics ();
gc.dispose ();
var widthHint = org.eclipse.jface.dialogs.Dialog.convertVerticalDLUsToPixels (fontMetrics, 61);
data.widthHint = Math.max (widthHint, button.computeSize (-1, -1, true).x);
button.setLayoutData (data);
}, "$wt.widgets.Button");
Clazz.defineMethod (c$, "setEnabled", 
function (enabled, parent) {
this.getLabelControl (parent).setEnabled (enabled);
}, "~B,$wt.widgets.Composite");
Clazz.defineStatics (c$,
"IS_VALID", "field_editor_is_valid",
"VALUE", "field_editor_value",
"HORIZONTAL_GAP", 8);
});
