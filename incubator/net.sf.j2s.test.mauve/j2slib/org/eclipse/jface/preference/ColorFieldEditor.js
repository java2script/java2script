Clazz.declarePackage ("org.eclipse.jface.preference");
Clazz.load (["org.eclipse.jface.preference.FieldEditor"], "org.eclipse.jface.preference.ColorFieldEditor", ["org.eclipse.jface.preference.ColorSelector", "$.PreferenceConverter", "org.eclipse.jface.resource.JFaceResources", "org.eclipse.jface.util.IPropertyChangeListener", "$wt.graphics.GC", "$.Point", "$wt.layout.GridData"], function () {
c$ = Clazz.decorateAsClass (function () {
this.colorSelector = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.preference, "ColorFieldEditor", org.eclipse.jface.preference.FieldEditor);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.jface.preference.ColorFieldEditor, []);
});
Clazz.overrideMethod (c$, "adjustForNumColumns", 
function (numColumns) {
(this.colorSelector.getButton ().getLayoutData ()).horizontalSpan = numColumns - 1;
}, "~N");
Clazz.defineMethod (c$, "computeImageSize", 
function (window) {
var gc =  new $wt.graphics.GC (window);
var f = org.eclipse.jface.resource.JFaceResources.getFontRegistry ().get ("org.eclipse.jface.defaultfont");
gc.setFont (f);
var height = gc.getFontMetrics ().getHeight ();
gc.dispose ();
var p =  new $wt.graphics.Point (height * 3 - 6, height);
return p;
}, "$wt.widgets.Control");
Clazz.overrideMethod (c$, "doFillIntoGrid", 
function (parent, numColumns) {
var control = this.getLabelControl (parent);
var gd =  new $wt.layout.GridData ();
gd.horizontalSpan = numColumns - 1;
control.setLayoutData (gd);
var colorButton = this.getChangeControl (parent);
gd =  new $wt.layout.GridData ();
var widthHint = this.convertHorizontalDLUsToPixels (colorButton, 61);
gd.widthHint = Math.max (widthHint, colorButton.computeSize (-1, -1, true).x);
colorButton.setLayoutData (gd);
}, "$wt.widgets.Composite,~N");
Clazz.overrideMethod (c$, "doLoad", 
function () {
if (this.colorSelector == null) return ;
this.colorSelector.setColorValue (org.eclipse.jface.preference.PreferenceConverter.getColor (this.getPreferenceStore (), this.getPreferenceName ()));
});
Clazz.overrideMethod (c$, "doLoadDefault", 
function () {
if (this.colorSelector == null) return ;
this.colorSelector.setColorValue (org.eclipse.jface.preference.PreferenceConverter.getDefaultColor (this.getPreferenceStore (), this.getPreferenceName ()));
});
Clazz.overrideMethod (c$, "doStore", 
function () {
org.eclipse.jface.preference.PreferenceConverter.setValue (this.getPreferenceStore (), this.getPreferenceName (), this.colorSelector.getColorValue ());
});
Clazz.defineMethod (c$, "getColorSelector", 
function () {
return this.colorSelector;
});
Clazz.defineMethod (c$, "getChangeControl", 
function (parent) {
if (this.colorSelector == null) {
this.colorSelector =  new org.eclipse.jface.preference.ColorSelector (parent);
this.colorSelector.addListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.ColorFieldEditor$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "ColorFieldEditor$1", null, org.eclipse.jface.util.IPropertyChangeListener);
Clazz.overrideMethod (c$, "propertyChange", 
function (event) {
this.b$["org.eclipse.jface.preference.ColorFieldEditor"].fireValueChanged (event.getProperty (), event.getOldValue (), event.getNewValue ());
this.b$["org.eclipse.jface.preference.ColorFieldEditor"].setPresentsDefaultValue (false);
}, "org.eclipse.jface.util.PropertyChangeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.ColorFieldEditor$1, i$, v$);
}) (this, null));
} else {
this.checkParent (this.colorSelector.getButton (), parent);
}return this.colorSelector.getButton ();
}, "$wt.widgets.Composite");
Clazz.overrideMethod (c$, "getNumberOfControls", 
function () {
return 2;
});
Clazz.defineMethod (c$, "setEnabled", 
function (enabled, parent) {
Clazz.superCall (this, org.eclipse.jface.preference.ColorFieldEditor, "setEnabled", [enabled, parent]);
this.getChangeControl (parent).setEnabled (enabled);
}, "~B,$wt.widgets.Composite");
});
