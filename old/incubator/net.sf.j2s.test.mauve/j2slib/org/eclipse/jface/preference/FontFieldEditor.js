Clazz.declarePackage ("org.eclipse.jface.preference");
Clazz.load (["org.eclipse.jface.preference.FieldEditor"], "org.eclipse.jface.preference.FontFieldEditor", ["org.eclipse.jface.preference.PreferenceConverter", "org.eclipse.jface.resource.JFaceResources", "$.StringConverter", "org.eclipse.jface.util.Assert", "$wt.events.DisposeListener", "$.SelectionAdapter", "$wt.graphics.Font", "$wt.layout.GridData", "$wt.widgets.Button", "$.FontDialog", "$.Label", "$.Text"], function () {
c$ = Clazz.decorateAsClass (function () {
this.changeFontButton = null;
this.changeButtonText = null;
this.previewText = null;
this.chosenFont = null;
this.valueControl = null;
this.previewer = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.preference, "FontFieldEditor", org.eclipse.jface.preference.FieldEditor);
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.text = null;
this.string = null;
this.font = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.preference.FontFieldEditor, "DefaultPreviewer");
Clazz.makeConstructor (c$, 
function (a, b) {
this.string = a;
this.text =  new $wt.widgets.Text (b, 2056);
this.text.addDisposeListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.FontFieldEditor.DefaultPreviewer$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference.FontFieldEditor, "DefaultPreviewer$1", null, $wt.events.DisposeListener);
Clazz.overrideMethod (c$, "widgetDisposed", 
function (a) {
if (this.b$["org.eclipse.jface.preference.FontFieldEditor.DefaultPreviewer"].font != null) this.b$["org.eclipse.jface.preference.FontFieldEditor.DefaultPreviewer"].font.dispose ();
}, "$wt.events.DisposeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.FontFieldEditor.DefaultPreviewer$1, i$, v$);
}) (this, null));
if (this.string != null) this.text.setText (this.string);
}, "~S,$wt.widgets.Composite");
Clazz.defineMethod (c$, "getControl", 
function () {
return this.text;
});
Clazz.defineMethod (c$, "setFont", 
function (a) {
if (this.font != null) this.font.dispose ();
this.font =  new $wt.graphics.Font (this.text.getDisplay (), a);
this.text.setFont (this.font);
}, "~A");
Clazz.defineMethod (c$, "getPreferredExtent", 
function () {
return 40;
});
c$ = Clazz.p0p ();
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.jface.preference.FontFieldEditor, []);
});
Clazz.makeConstructor (c$, 
function (name, labelText, previewAreaText, parent) {
Clazz.superConstructor (this, org.eclipse.jface.preference.FontFieldEditor, []);
this.init (name, labelText);
this.previewText = previewAreaText;
this.changeButtonText = org.eclipse.jface.resource.JFaceResources.getString ("openChange");
this.createControl (parent);
}, "~S,~S,~S,$wt.widgets.Composite");
Clazz.makeConstructor (c$, 
function (name, labelText, parent) {
this.construct (name, labelText, null, parent);
}, "~S,~S,$wt.widgets.Composite");
Clazz.overrideMethod (c$, "adjustForNumColumns", 
function (numColumns) {
var data =  new $wt.layout.GridData ();
if (this.valueControl.getLayoutData () != null) data = this.valueControl.getLayoutData ();
data.horizontalSpan = numColumns - this.getNumberOfControls () + 1;
this.valueControl.setLayoutData (data);
}, "~N");
Clazz.overrideMethod (c$, "applyFont", 
function () {
if (this.chosenFont != null && this.previewer != null) this.previewer.setFont (this.chosenFont);
});
Clazz.overrideMethod (c$, "doFillIntoGrid", 
function (parent, numColumns) {
this.getLabelControl (parent);
this.valueControl = this.getValueControl (parent);
var gd =  new $wt.layout.GridData (768);
gd.horizontalSpan = numColumns - this.getNumberOfControls () + 1;
this.valueControl.setLayoutData (gd);
if (this.previewText != null) {
this.previewer =  new org.eclipse.jface.preference.FontFieldEditor.DefaultPreviewer (this.previewText, parent);
gd =  new $wt.layout.GridData (768);
gd.heightHint = this.previewer.getPreferredExtent ();
gd.widthHint = this.previewer.getPreferredExtent ();
this.previewer.getControl ().setLayoutData (gd);
}this.changeFontButton = this.getChangeControl (parent);
gd =  new $wt.layout.GridData ();
var widthHint = this.convertHorizontalDLUsToPixels (this.changeFontButton, 61);
gd.widthHint = Math.max (widthHint, this.changeFontButton.computeSize (-1, -1, true).x);
this.changeFontButton.setLayoutData (gd);
}, "$wt.widgets.Composite,~N");
Clazz.overrideMethod (c$, "doLoad", 
function () {
if (this.changeFontButton == null) return ;
this.updateFont (org.eclipse.jface.preference.PreferenceConverter.getFontDataArray (this.getPreferenceStore (), this.getPreferenceName ()));
});
Clazz.overrideMethod (c$, "doLoadDefault", 
function () {
if (this.changeFontButton == null) return ;
this.updateFont (org.eclipse.jface.preference.PreferenceConverter.getDefaultFontDataArray (this.getPreferenceStore (), this.getPreferenceName ()));
});
Clazz.overrideMethod (c$, "doStore", 
function () {
if (this.chosenFont != null) org.eclipse.jface.preference.PreferenceConverter.setValue (this.getPreferenceStore (), this.getPreferenceName (), this.chosenFont);
});
Clazz.defineMethod (c$, "getChangeControl", 
function (parent) {
if (this.changeFontButton == null) {
this.changeFontButton =  new $wt.widgets.Button (parent, 8);
if (this.changeButtonText != null) this.changeFontButton.setText (this.changeButtonText);
this.changeFontButton.addSelectionListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.FontFieldEditor$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "FontFieldEditor$1", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (event) {
var fontDialog =  new $wt.widgets.FontDialog (this.b$["org.eclipse.jface.preference.FontFieldEditor"].changeFontButton.getShell ());
if (this.b$["org.eclipse.jface.preference.FontFieldEditor"].chosenFont != null) fontDialog.setFontList (this.b$["org.eclipse.jface.preference.FontFieldEditor"].chosenFont);
DialogSync2Async.block (fontDialog, this, function () {
var font = fontDialog.dialogReturn;
if (font != null) {
var oldFont = this.b$["org.eclipse.jface.preference.FontFieldEditor"].chosenFont;
if (oldFont == null) oldFont = org.eclipse.jface.resource.JFaceResources.getDefaultFont ().getFontData ();
this.b$["org.eclipse.jface.preference.FontFieldEditor"].setPresentsDefaultValue (false);
var newData =  new Array (1);
newData[0] = font;
this.b$["org.eclipse.jface.preference.FontFieldEditor"].updateFont (newData);
this.b$["org.eclipse.jface.preference.FontFieldEditor"].fireValueChanged ("field_editor_value", oldFont[0], font);
}});
return;
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.FontFieldEditor$1, i$, v$);
}) (this, null));
this.changeFontButton.addDisposeListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.FontFieldEditor$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "FontFieldEditor$2", null, $wt.events.DisposeListener);
Clazz.overrideMethod (c$, "widgetDisposed", 
function (event) {
this.b$["org.eclipse.jface.preference.FontFieldEditor"].changeFontButton = null;
}, "$wt.events.DisposeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.FontFieldEditor$2, i$, v$);
}) (this, null));
this.changeFontButton.setFont (parent.getFont ());
this.setButtonLayoutData (this.changeFontButton);
} else {
this.checkParent (this.changeFontButton, parent);
}return this.changeFontButton;
}, "$wt.widgets.Composite");
Clazz.overrideMethod (c$, "getNumberOfControls", 
function () {
if (this.previewer == null) return 3;
 else return 4;
});
Clazz.defineMethod (c$, "getPreferredPreviewHeight", 
function () {
if (this.previewer == null) return -1;
return this.previewer.getPreferredExtent ();
});
Clazz.defineMethod (c$, "getPreviewControl", 
function () {
if (this.previewer == null) return null;
return this.previewer.getControl ();
});
Clazz.defineMethod (c$, "getValueControl", 
function (parent) {
if (this.valueControl == null) {
this.valueControl =  new $wt.widgets.Label (parent, 16384);
this.valueControl.setFont (parent.getFont ());
this.valueControl.addDisposeListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.FontFieldEditor$3")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "FontFieldEditor$3", null, $wt.events.DisposeListener);
Clazz.overrideMethod (c$, "widgetDisposed", 
function (event) {
this.b$["org.eclipse.jface.preference.FontFieldEditor"].valueControl = null;
}, "$wt.events.DisposeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.FontFieldEditor$3, i$, v$);
}) (this, null));
} else {
this.checkParent (this.valueControl, parent);
}return this.valueControl;
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "setChangeButtonText", 
function (text) {
org.eclipse.jface.util.Assert.isNotNull (text);
this.changeButtonText = text;
if (this.changeFontButton != null) this.changeFontButton.setText (text);
}, "~S");
Clazz.defineMethod (c$, "updateFont", 
($fz = function (font) {
var bestFont = org.eclipse.jface.resource.JFaceResources.getFontRegistry ().filterData (font, this.valueControl.getDisplay ());
if (bestFont == null) bestFont = this.getDefaultFontData ();
this.chosenFont = bestFont;
if (this.valueControl != null) {
this.valueControl.setText (org.eclipse.jface.resource.StringConverter.asString (this.chosenFont[0]));
}if (this.previewer != null) {
this.previewer.setFont (bestFont);
}}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "setToDefault", 
function () {
var defaultFontData = org.eclipse.jface.preference.PreferenceConverter.getDefaultFontDataArray (this.getPreferenceStore (), this.getPreferenceName ());
org.eclipse.jface.preference.PreferenceConverter.setValue (this.getPreferenceStore (), this.getPreferenceName (), defaultFontData);
});
Clazz.defineMethod (c$, "getDefaultFontData", 
($fz = function () {
return this.valueControl.getDisplay ().getSystemFont ().getFontData ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setEnabled", 
function (enabled, parent) {
Clazz.superCall (this, org.eclipse.jface.preference.FontFieldEditor, "setEnabled", [enabled, parent]);
this.getChangeControl (parent).setEnabled (enabled);
this.getValueControl (parent).setEnabled (enabled);
}, "~B,$wt.widgets.Composite");
});
