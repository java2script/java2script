Clazz.declarePackage ("org.eclipse.jface.preference");
Clazz.load (["org.eclipse.jface.dialogs.DialogPage", "org.eclipse.jface.preference.IPreferencePage"], "org.eclipse.jface.preference.PreferencePage", ["org.eclipse.jface.dialogs.Dialog", "org.eclipse.jface.resource.JFaceResources", "org.eclipse.jface.util.IPropertyChangeListener", "$wt.events.DisposeListener", "$.SelectionAdapter", "$wt.graphics.Point", "$wt.layout.GridData", "$.GridLayout", "$wt.widgets.Button", "$.Composite", "$.Event", "$.Label"], function () {
c$ = Clazz.decorateAsClass (function () {
this.preferenceStore = null;
this.$isValid = true;
this.body = null;
this.createDefaultAndApplyButton = true;
this.defaultsButton = null;
this.container = null;
this.applyButton = null;
this.descriptionLabel = null;
this.size = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.preference, "PreferencePage", org.eclipse.jface.dialogs.DialogPage, org.eclipse.jface.preference.IPreferencePage);
Clazz.makeConstructor (c$, 
function () {
this.construct ("");
});
Clazz.overrideMethod (c$, "computeSize", 
function () {
if (this.size != null) return this.size;
var control = this.getControl ();
if (control != null) {
this.size = this.doComputeSize ();
return this.size;
}return  new $wt.graphics.Point (0, 0);
});
Clazz.defineMethod (c$, "contributeButtons", 
function (parent) {
}, "$wt.widgets.Composite");
Clazz.overrideMethod (c$, "createControl", 
function (parent) {
var gd;
var content =  new $wt.widgets.Composite (parent, 0);
this.setControl (content);
var layout =  new $wt.layout.GridLayout ();
layout.marginWidth = 0;
layout.marginHeight = 0;
content.setLayout (layout);
this.applyDialogFont (content);
this.initializeDialogUnits (content);
this.descriptionLabel = this.createDescriptionLabel (content);
if (this.descriptionLabel != null) {
this.descriptionLabel.setLayoutData ( new $wt.layout.GridData (768));
}this.body = this.createContents (content);
if (this.body != null) this.body.setLayoutData ( new $wt.layout.GridData (1808));
var buttonBar =  new $wt.widgets.Composite (content, 0);
layout =  new $wt.layout.GridLayout ();
layout.numColumns = 0;
layout.marginHeight = 0;
layout.marginWidth = 0;
layout.makeColumnsEqualWidth = false;
buttonBar.setLayout (layout);
gd =  new $wt.layout.GridData (128);
buttonBar.setLayoutData (gd);
this.contributeButtons (buttonBar);
if (this.createDefaultAndApplyButton) {
layout.numColumns = layout.numColumns + 2;
var labels = org.eclipse.jface.resource.JFaceResources.getStrings (["defaults", "apply"]);
var widthHint = this.convertHorizontalDLUsToPixels (61);
this.defaultsButton =  new $wt.widgets.Button (buttonBar, 8);
this.defaultsButton.setText (labels[0]);
org.eclipse.jface.dialogs.Dialog.applyDialogFont (this.defaultsButton);
var data =  new $wt.layout.GridData (256);
var minButtonSize = this.defaultsButton.computeSize (-1, -1, true);
data.widthHint = Math.max (widthHint, minButtonSize.x);
this.defaultsButton.setLayoutData (data);
this.defaultsButton.addSelectionListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.PreferencePage$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "PreferencePage$1", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (e) {
this.b$["org.eclipse.jface.preference.PreferencePage"].performDefaults ();
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.PreferencePage$1, i$, v$);
}) (this, null));
this.applyButton =  new $wt.widgets.Button (buttonBar, 8);
this.applyButton.setText (labels[1]);
org.eclipse.jface.dialogs.Dialog.applyDialogFont (this.applyButton);
data =  new $wt.layout.GridData (256);
minButtonSize = this.applyButton.computeSize (-1, -1, true);
data.widthHint = Math.max (widthHint, minButtonSize.x);
this.applyButton.setLayoutData (data);
this.applyButton.addSelectionListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.PreferencePage$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "PreferencePage$2", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (e) {
this.b$["org.eclipse.jface.preference.PreferencePage"].performApply ();
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.PreferencePage$2, i$, v$);
}) (this, null));
this.applyButton.setEnabled (this.isValid ());
this.applyDialogFont (buttonBar);
} else {
if (buttonBar.getChildren ().length < 1) buttonBar.dispose ();
}}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "applyDialogFont", 
function (composite) {
org.eclipse.jface.dialogs.Dialog.applyDialogFont (composite);
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "createDescriptionLabel", 
function (parent) {
var result = null;
var description = this.getDescription ();
if (description != null) {
result =  new $wt.widgets.Label (parent, 64);
result.setFont (parent.getFont ());
result.setText (description);
}return result;
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "doComputeSize", 
function () {
if (this.descriptionLabel != null && this.body != null) {
var bodySize = this.body.computeSize (-1, -1, true);
var gd = this.descriptionLabel.getLayoutData ();
gd.widthHint = bodySize.x;
}return this.getControl ().computeSize (-1, -1, true);
});
Clazz.defineMethod (c$, "doGetPreferenceStore", 
function () {
return null;
});
Clazz.defineMethod (c$, "getContainer", 
function () {
return this.container;
});
Clazz.defineMethod (c$, "getPreferenceStore", 
function () {
if (this.preferenceStore == null) this.preferenceStore = this.doGetPreferenceStore ();
if (this.preferenceStore != null) return this.preferenceStore;
 else if (this.container != null) return this.container.getPreferenceStore ();
return null;
});
Clazz.overrideMethod (c$, "isValid", 
function () {
return this.$isValid;
});
Clazz.defineMethod (c$, "noDefaultAndApplyButton", 
function () {
this.createDefaultAndApplyButton = false;
});
Clazz.overrideMethod (c$, "okToLeave", 
function () {
return this.isValid ();
});
Clazz.defineMethod (c$, "performApply", 
function () {
this.performOk ();
});
Clazz.overrideMethod (c$, "performCancel", 
function () {
return true;
});
Clazz.defineMethod (c$, "performDefaults", 
function () {
this.updateApplyButton ();
});
Clazz.overrideMethod (c$, "performOk", 
function () {
return true;
});
Clazz.overrideMethod (c$, "setContainer", 
function (container) {
this.container = container;
}, "org.eclipse.jface.preference.IPreferencePageContainer");
Clazz.defineMethod (c$, "setPreferenceStore", 
function (store) {
this.preferenceStore = store;
}, "org.eclipse.jface.preference.IPreferenceStore");
Clazz.overrideMethod (c$, "setSize", 
function (uiSize) {
var control = this.getControl ();
if (control != null) {
control.setSize (uiSize);
this.size = uiSize;
}}, "$wt.graphics.Point");
Clazz.overrideMethod (c$, "setTitle", 
function (title) {
Clazz.superCall (this, org.eclipse.jface.preference.PreferencePage, "setTitle", [title]);
if (this.getContainer () != null) this.getContainer ().updateTitle ();
}, "~S");
Clazz.defineMethod (c$, "setValid", 
function (b) {
var oldValue = this.$isValid;
this.$isValid = b;
if (oldValue != this.$isValid) {
if (this.getContainer () != null) this.getContainer ().updateButtons ();
this.updateApplyButton ();
}}, "~B");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getTitle ();
});
Clazz.defineMethod (c$, "updateApplyButton", 
function () {
if (this.applyButton != null) this.applyButton.setEnabled (this.isValid ());
});
Clazz.defineMethod (c$, "createNoteComposite", 
function (font, composite, title, message) {
var messageComposite =  new $wt.widgets.Composite (composite, 0);
var messageLayout =  new $wt.layout.GridLayout ();
messageLayout.numColumns = 2;
messageLayout.marginWidth = 0;
messageLayout.marginHeight = 0;
messageComposite.setLayout (messageLayout);
messageComposite.setLayoutData ( new $wt.layout.GridData (256));
messageComposite.setFont (font);
var noteLabel =  new $wt.widgets.Label (messageComposite, 1);
noteLabel.setText (title);
noteLabel.setFont (org.eclipse.jface.resource.JFaceResources.getBannerFont ());
noteLabel.setLayoutData ( new $wt.layout.GridData (2));
var fontListener = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.PreferencePage$3")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "PreferencePage$3", null, org.eclipse.jface.util.IPropertyChangeListener);
Clazz.overrideMethod (c$, "propertyChange", 
function (event) {
if ("org.eclipse.jface.bannerfont".equals (event.getProperty ())) {
this.f$.noteLabel.setFont (org.eclipse.jface.resource.JFaceResources.getFont ("org.eclipse.jface.bannerfont"));
}}, "org.eclipse.jface.util.PropertyChangeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.PreferencePage$3, i$, v$);
}) (this, Clazz.cloneFinals ("noteLabel", noteLabel));
org.eclipse.jface.resource.JFaceResources.getFontRegistry ().addListener (fontListener);
noteLabel.addDisposeListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.preference.PreferencePage$4")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.preference, "PreferencePage$4", null, $wt.events.DisposeListener);
Clazz.overrideMethod (c$, "widgetDisposed", 
function (event) {
org.eclipse.jface.resource.JFaceResources.getFontRegistry ().removeListener (this.f$.fontListener);
}, "$wt.events.DisposeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.preference.PreferencePage$4, i$, v$);
}) (this, Clazz.cloneFinals ("fontListener", fontListener)));
var messageLabel =  new $wt.widgets.Label (messageComposite, 64);
messageLabel.setText (message);
messageLabel.setFont (font);
return messageComposite;
}, "$wt.graphics.Font,$wt.widgets.Composite,~S,~S");
Clazz.defineMethod (c$, "getApplyButton", 
function () {
return this.applyButton;
});
Clazz.defineMethod (c$, "getDefaultsButton", 
function () {
return this.defaultsButton;
});
Clazz.overrideMethod (c$, "performHelp", 
function () {
this.getControl ().notifyListeners (28,  new $wt.widgets.Event ());
});
Clazz.defineMethod (c$, "applyData", 
function (data) {
}, "~O");
Clazz.defineMethod (c$, "setErrorMessage", 
function (newMessage) {
Clazz.superCall (this, org.eclipse.jface.preference.PreferencePage, "setErrorMessage", [newMessage]);
if (this.getContainer () != null) {
this.getContainer ().updateMessage ();
}}, "~S");
Clazz.defineMethod (c$, "setMessage", 
function (newMessage, newType) {
Clazz.superCall (this, org.eclipse.jface.preference.PreferencePage, "setMessage", [newMessage, newType]);
if (this.getContainer () != null) this.getContainer ().updateMessage ();
}, "~S,~N");
});
