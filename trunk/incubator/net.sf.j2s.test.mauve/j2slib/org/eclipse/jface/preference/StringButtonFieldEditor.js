Clazz.declarePackage ("org.eclipse.jface.preference");
Clazz.load (["org.eclipse.jface.preference.StringFieldEditor"], "org.eclipse.jface.preference.StringButtonFieldEditor", ["org.eclipse.jface.resource.JFaceResources", "org.eclipse.jface.util.Assert", "$wt.events.DisposeListener", "$.SelectionAdapter", "$wt.layout.GridData", "$wt.widgets.Button"], function () {
c$ = Clazz.decorateAsClass (function () {
this.changeButton = null;
this.changeButtonText = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.preference, "StringButtonFieldEditor", org.eclipse.jface.preference.StringFieldEditor);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.jface.preference.StringButtonFieldEditor, []);
});
Clazz.makeConstructor (c$, 
function (name, labelText, parent) {
Clazz.superConstructor (this, org.eclipse.jface.preference.StringButtonFieldEditor, []);
this.init (name, labelText);
this.createControl (parent);
}, "~S,~S,$wt.widgets.Composite");
Clazz.overrideMethod (c$, "adjustForNumColumns", 
function (numColumns) {
(this.getTextControl ().getLayoutData ()).horizontalSpan = numColumns - 2;
}, "~N");
Clazz.defineMethod (c$, "doFillIntoGrid", 
function (parent, numColumns) {
Clazz.superCall (this, org.eclipse.jface.preference.StringButtonFieldEditor, "doFillIntoGrid", [parent, numColumns - 1]);
this.changeButton = this.getChangeControl (parent);
var gd =  new $wt.layout.GridData ();
gd.horizontalAlignment = 4;
var widthHint = this.convertHorizontalDLUsToPixels (this.changeButton, 61);
gd.widthHint = Math.max (widthHint, this.changeButton.computeSize (-1, -1, true).x);
this.changeButton.setLayoutData (gd);
}, "$wt.widgets.Composite,~N");
Clazz.defineMethod (c$, "getChangeControl", 
function (parent) {
if (this.changeButton == null) {
this.changeButton =  new $wt.widgets.Button (parent, 8);
if (this.changeButtonText == null) this.changeButtonText = org.eclipse.jface.resource.JFaceResources.getString ("openChange");
this.changeButton.setText (this.changeButtonText);
this.changeButton.setFont (parent.getFont ());
this.changeButton.addSelectionListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.StringButtonFieldEditor$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "StringButtonFieldEditor$1", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (evt) {
var newValue = this.b$["org.eclipse.jface.preference.StringButtonFieldEditor"].changePressed ();
if (newValue != null) {
this.b$["org.eclipse.jface.preference.StringButtonFieldEditor"].setStringValue (newValue);
}}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.StringButtonFieldEditor$1, i$, v$);
}) (this, null));
this.changeButton.addDisposeListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.StringButtonFieldEditor$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "StringButtonFieldEditor$2", null, $wt.events.DisposeListener);
Clazz.overrideMethod (c$, "widgetDisposed", 
function (event) {
this.b$["org.eclipse.jface.preference.StringButtonFieldEditor"].changeButton = null;
}, "$wt.events.DisposeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.StringButtonFieldEditor$2, i$, v$);
}) (this, null));
} else {
this.checkParent (this.changeButton, parent);
}return this.changeButton;
}, "$wt.widgets.Composite");
Clazz.overrideMethod (c$, "getNumberOfControls", 
function () {
return 3;
});
Clazz.defineMethod (c$, "getShell", 
function () {
if (this.changeButton == null) return null;
return this.changeButton.getShell ();
});
Clazz.defineMethod (c$, "setChangeButtonText", 
function (text) {
org.eclipse.jface.util.Assert.isNotNull (text);
this.changeButtonText = text;
if (this.changeButton != null) this.changeButton.setText (text);
}, "~S");
Clazz.defineMethod (c$, "setEnabled", 
function (enabled, parent) {
Clazz.superCall (this, org.eclipse.jface.preference.StringButtonFieldEditor, "setEnabled", [enabled, parent]);
if (this.changeButton != null) {
this.changeButton.setEnabled (enabled);
}}, "~B,$wt.widgets.Composite");
});
