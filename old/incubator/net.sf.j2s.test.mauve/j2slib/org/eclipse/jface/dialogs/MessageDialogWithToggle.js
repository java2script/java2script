Clazz.declarePackage ("org.eclipse.jface.dialogs");
Clazz.load (["org.eclipse.jface.dialogs.MessageDialog"], "org.eclipse.jface.dialogs.MessageDialogWithToggle", ["java.lang.NullPointerException", "org.eclipse.jface.dialogs.IDialogConstants", "org.eclipse.jface.resource.JFaceResources", "$wt.events.SelectionAdapter", "$wt.layout.GridData", "$wt.widgets.Button"], function () {
c$ = Clazz.decorateAsClass (function () {
this.prefKey = null;
this.prefStore = null;
this.toggleButton = null;
this.toggleMessage = null;
this.toggleState = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.dialogs, "MessageDialogWithToggle", org.eclipse.jface.dialogs.MessageDialog);
c$.openError = Clazz.defineMethod (c$, "openError", 
function (parent, title, message, toggleMessage, toggleState, store, key) {
var dialog =  new org.eclipse.jface.dialogs.MessageDialogWithToggle (parent, title, null, message, 1, [org.eclipse.jface.dialogs.IDialogConstants.OK_LABEL], 0, toggleMessage, toggleState);
dialog.prefStore = store;
dialog.prefKey = key;
dialog.open ();
return dialog;
}, "$wt.widgets.Shell,~S,~S,~S,~B,org.eclipse.jface.preference.IPreferenceStore,~S");
c$.openInformation = Clazz.defineMethod (c$, "openInformation", 
function (parent, title, message, toggleMessage, toggleState, store, key) {
var dialog =  new org.eclipse.jface.dialogs.MessageDialogWithToggle (parent, title, null, message, 2, [org.eclipse.jface.dialogs.IDialogConstants.OK_LABEL], 0, toggleMessage, toggleState);
dialog.prefStore = store;
dialog.prefKey = key;
dialog.open ();
return dialog;
}, "$wt.widgets.Shell,~S,~S,~S,~B,org.eclipse.jface.preference.IPreferenceStore,~S");
c$.openOkCancelConfirm = Clazz.defineMethod (c$, "openOkCancelConfirm", 
function (parent, title, message, toggleMessage, toggleState, store, key) {
var dialog =  new org.eclipse.jface.dialogs.MessageDialogWithToggle (parent, title, null, message, 3, [org.eclipse.jface.dialogs.IDialogConstants.OK_LABEL, org.eclipse.jface.dialogs.IDialogConstants.CANCEL_LABEL], 0, toggleMessage, toggleState);
dialog.prefStore = store;
dialog.prefKey = key;
dialog.open ();
return dialog;
}, "$wt.widgets.Shell,~S,~S,~S,~B,org.eclipse.jface.preference.IPreferenceStore,~S");
c$.openWarning = Clazz.defineMethod (c$, "openWarning", 
function (parent, title, message, toggleMessage, toggleState, store, key) {
var dialog =  new org.eclipse.jface.dialogs.MessageDialogWithToggle (parent, title, null, message, 4, [org.eclipse.jface.dialogs.IDialogConstants.OK_LABEL], 0, toggleMessage, toggleState);
dialog.prefStore = store;
dialog.prefKey = key;
dialog.open ();
return dialog;
}, "$wt.widgets.Shell,~S,~S,~S,~B,org.eclipse.jface.preference.IPreferenceStore,~S");
c$.openYesNoCancelQuestion = Clazz.defineMethod (c$, "openYesNoCancelQuestion", 
function (parent, title, message, toggleMessage, toggleState, store, key) {
var dialog =  new org.eclipse.jface.dialogs.MessageDialogWithToggle (parent, title, null, message, 3, [org.eclipse.jface.dialogs.IDialogConstants.YES_LABEL, org.eclipse.jface.dialogs.IDialogConstants.NO_LABEL, org.eclipse.jface.dialogs.IDialogConstants.CANCEL_LABEL], 0, toggleMessage, toggleState);
dialog.prefStore = store;
dialog.prefKey = key;
dialog.open ();
return dialog;
}, "$wt.widgets.Shell,~S,~S,~S,~B,org.eclipse.jface.preference.IPreferenceStore,~S");
c$.openYesNoQuestion = Clazz.defineMethod (c$, "openYesNoQuestion", 
function (parent, title, message, toggleMessage, toggleState, store, key) {
var dialog =  new org.eclipse.jface.dialogs.MessageDialogWithToggle (parent, title, null, message, 3, [org.eclipse.jface.dialogs.IDialogConstants.YES_LABEL, org.eclipse.jface.dialogs.IDialogConstants.NO_LABEL], 0, toggleMessage, toggleState);
dialog.prefStore = store;
dialog.prefKey = key;
dialog.open ();
return dialog;
}, "$wt.widgets.Shell,~S,~S,~S,~B,org.eclipse.jface.preference.IPreferenceStore,~S");
Clazz.makeConstructor (c$, 
function (parentShell, dialogTitle, image, message, dialogImageType, dialogButtonLabels, defaultIndex, toggleMessage, toggleState) {
Clazz.superConstructor (this, org.eclipse.jface.dialogs.MessageDialogWithToggle, [parentShell, dialogTitle, image, message, dialogImageType, dialogButtonLabels, defaultIndex]);
this.toggleMessage = toggleMessage;
this.toggleState = toggleState;
this.setButtonLabels (dialogButtonLabels);
}, "$wt.widgets.Shell,~S,$wt.graphics.Image,~S,~N,~A,~N,~S,~B");
Clazz.defineMethod (c$, "buttonPressed", 
function (buttonId) {
Clazz.superCall (this, org.eclipse.jface.dialogs.MessageDialogWithToggle, "buttonPressed", [buttonId]);
if (buttonId != 1 && this.toggleState && this.prefStore != null && this.prefKey != null) {
switch (buttonId) {
case 2:
case 4:
case 10:
case 0:
this.prefStore.setValue (this.prefKey, "always");
break;
case 3:
case 21:
this.prefStore.setValue (this.prefKey, "never");
break;
}
}}, "~N");
Clazz.overrideMethod (c$, "createButtonsForButtonBar", 
function (parent) {
var buttonLabels = this.getButtonLabels ();
var buttons =  new Array (buttonLabels.length);
var defaultButtonIndex = this.getDefaultButtonIndex ();
for (var i = 0; i < buttonLabels.length; i++) {
var id = i;
var label = buttonLabels[i];
if (org.eclipse.jface.dialogs.IDialogConstants.OK_LABEL.equals (label)) {
id = 0;
} else if (org.eclipse.jface.dialogs.IDialogConstants.YES_LABEL.equals (label)) {
id = 2;
} else if (org.eclipse.jface.dialogs.IDialogConstants.NO_LABEL.equals (label)) {
id = 3;
} else if (org.eclipse.jface.dialogs.IDialogConstants.CANCEL_LABEL.equals (label)) {
id = 1;
} else if (org.eclipse.jface.dialogs.IDialogConstants.YES_TO_ALL_LABEL.equals (label)) {
id = 4;
} else if (org.eclipse.jface.dialogs.IDialogConstants.SKIP_LABEL.equals (label)) {
id = 5;
} else if (org.eclipse.jface.dialogs.IDialogConstants.STOP_LABEL.equals (label)) {
id = 6;
} else if (org.eclipse.jface.dialogs.IDialogConstants.ABORT_LABEL.equals (label)) {
id = 7;
} else if (org.eclipse.jface.dialogs.IDialogConstants.RETRY_LABEL.equals (label)) {
id = 8;
} else if (org.eclipse.jface.dialogs.IDialogConstants.IGNORE_LABEL.equals (label)) {
id = 9;
} else if (org.eclipse.jface.dialogs.IDialogConstants.PROCEED_LABEL.equals (label)) {
id = 10;
} else if (org.eclipse.jface.dialogs.IDialogConstants.OPEN_LABEL.equals (label)) {
id = 11;
} else if (org.eclipse.jface.dialogs.IDialogConstants.CLOSE_LABEL.equals (label)) {
id = 12;
} else if (org.eclipse.jface.dialogs.IDialogConstants.BACK_LABEL.equals (label)) {
id = 14;
} else if (org.eclipse.jface.dialogs.IDialogConstants.NEXT_LABEL.equals (label)) {
id = 15;
} else if (org.eclipse.jface.dialogs.IDialogConstants.FINISH_LABEL.equals (label)) {
id = 16;
} else if (org.eclipse.jface.dialogs.IDialogConstants.HELP_LABEL.equals (label)) {
id = 17;
} else if (org.eclipse.jface.dialogs.IDialogConstants.NO_TO_ALL_LABEL.equals (label)) {
id = 21;
}var button = this.createButton (parent, id, label, defaultButtonIndex == i);
buttons[i] = button;
}
this.setButtons (buttons);
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "createDialogArea", 
function (parent) {
var dialogAreaComposite = Clazz.superCall (this, org.eclipse.jface.dialogs.MessageDialogWithToggle, "createDialogArea", [parent]);
this.setToggleButton (this.createToggleButton (dialogAreaComposite));
return dialogAreaComposite;
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "createToggleButton", 
function (parent) {
var button =  new $wt.widgets.Button (parent, 16416);
var data =  new $wt.layout.GridData (0);
data.horizontalSpan = 2;
button.setLayoutData (data);
button.setFont (parent.getFont ());
button.addSelectionListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.dialogs.MessageDialogWithToggle$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.dialogs, "MessageDialogWithToggle$1", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (e) {
this.b$["org.eclipse.jface.dialogs.MessageDialogWithToggle"].toggleState = this.f$.button.getSelection ();
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.dialogs.MessageDialogWithToggle$1, i$, v$);
}) (this, Clazz.cloneFinals ("button", button)));
return button;
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "getToggleButton", 
function () {
return this.toggleButton;
});
Clazz.defineMethod (c$, "getPrefStore", 
function () {
return this.prefStore;
});
Clazz.defineMethod (c$, "getPrefKey", 
function () {
return this.prefKey;
});
Clazz.defineMethod (c$, "getToggleState", 
function () {
return this.toggleState;
});
Clazz.defineMethod (c$, "setPrefKey", 
function (prefKey) {
this.prefKey = prefKey;
}, "~S");
Clazz.defineMethod (c$, "setPrefStore", 
function (prefStore) {
this.prefStore = prefStore;
}, "org.eclipse.jface.preference.IPreferenceStore");
Clazz.defineMethod (c$, "setToggleButton", 
function (button) {
if (button == null) {
throw  new NullPointerException ("A message dialog with toggle may not have a null toggle button.");
}if (!button.isDisposed ()) {
var text;
if (this.toggleMessage == null) {
text = org.eclipse.jface.resource.JFaceResources.getString ("MessageDialogWithToggle.defaultToggleMessage");
} else {
text = this.toggleMessage;
}button.setText (text);
button.setSelection (this.toggleState);
}this.toggleButton = button;
}, "$wt.widgets.Button");
Clazz.defineMethod (c$, "setToggleMessage", 
function (message) {
this.toggleMessage = message;
if ((this.toggleButton != null) && (!this.toggleButton.isDisposed ())) {
var text;
if (this.toggleMessage == null) {
text = org.eclipse.jface.resource.JFaceResources.getString ("MessageDialogWithToggle.defaultToggleMessage");
} else {
text = this.toggleMessage;
}this.toggleButton.setText (text);
}}, "~S");
Clazz.defineMethod (c$, "setToggleState", 
function (toggleState) {
this.toggleState = toggleState;
if ((this.toggleButton != null) && (!this.toggleButton.isDisposed ())) {
this.toggleButton.setSelection (toggleState);
}}, "~B");
Clazz.defineStatics (c$,
"ALWAYS", "always",
"NEVER", "never",
"PROMPT", "prompt");
});
