Clazz.declarePackage ("org.eclipse.jface.dialogs");
Clazz.load (["org.eclipse.jface.dialogs.Dialog"], "org.eclipse.jface.dialogs.InputDialog", ["org.eclipse.jface.dialogs.IDialogConstants", "$wt.events.ModifyListener", "$wt.layout.GridData", "$wt.widgets.Label", "$.Text"], function () {
c$ = Clazz.decorateAsClass (function () {
this.title = null;
this.message = null;
this.value = "";
this.validator = null;
this.okButton = null;
this.text = null;
this.errorMessageText = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.dialogs, "InputDialog", org.eclipse.jface.dialogs.Dialog);
Clazz.makeConstructor (c$, 
function (parentShell, dialogTitle, dialogMessage, initialValue, validator) {
Clazz.superConstructor (this, org.eclipse.jface.dialogs.InputDialog, [parentShell]);
this.title = dialogTitle;
this.message = dialogMessage;
if (initialValue == null) this.value = "";
 else this.value = initialValue;
this.validator = validator;
}, "$wt.widgets.Shell,~S,~S,~S,org.eclipse.jface.dialogs.IInputValidator");
Clazz.defineMethod (c$, "buttonPressed", 
function (buttonId) {
if (buttonId == 0) {
this.value = this.text.getText ();
} else {
this.value = null;
}Clazz.superCall (this, org.eclipse.jface.dialogs.InputDialog, "buttonPressed", [buttonId]);
}, "~N");
Clazz.defineMethod (c$, "configureShell", 
function (shell) {
Clazz.superCall (this, org.eclipse.jface.dialogs.InputDialog, "configureShell", [shell]);
if (this.title != null) shell.setText (this.title);
}, "$wt.widgets.Shell");
Clazz.overrideMethod (c$, "createButtonsForButtonBar", 
function (parent) {
this.okButton = this.createButton (parent, 0, org.eclipse.jface.dialogs.IDialogConstants.OK_LABEL, true);
this.createButton (parent, 1, org.eclipse.jface.dialogs.IDialogConstants.CANCEL_LABEL, false);
this.text.setFocus ();
if (this.value != null) {
this.text.setText (this.value);
this.text.selectAll ();
}}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "createDialogArea", 
function (parent) {
var composite = Clazz.superCall (this, org.eclipse.jface.dialogs.InputDialog, "createDialogArea", [parent]);
if (this.message != null) {
var label =  new $wt.widgets.Label (composite, 64);
label.setText (this.message);
var data =  new $wt.layout.GridData (1796);
data.widthHint = this.convertHorizontalDLUsToPixels (300);
label.setLayoutData (data);
label.setFont (parent.getFont ());
}this.text =  new $wt.widgets.Text (composite, 2052);
this.text.setLayoutData ( new $wt.layout.GridData (768));
this.text.addModifyListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.dialogs.InputDialog$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.dialogs, "InputDialog$1", null, $wt.events.ModifyListener);
Clazz.overrideMethod (c$, "modifyText", 
function (e) {
this.b$["org.eclipse.jface.dialogs.InputDialog"].validateInput ();
}, "$wt.events.ModifyEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.dialogs.InputDialog$1, i$, v$);
}) (this, null));
this.errorMessageText =  new $wt.widgets.Text (composite, 8);
this.errorMessageText.setLayoutData ( new $wt.layout.GridData (768));
this.errorMessageText.setBackground (this.errorMessageText.getDisplay ().getSystemColor (22));
org.eclipse.jface.dialogs.Dialog.applyDialogFont (composite);
return composite;
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "getErrorMessageLabel", 
function () {
return null;
});
Clazz.defineMethod (c$, "getOkButton", 
function () {
return this.okButton;
});
Clazz.defineMethod (c$, "getText", 
function () {
return this.text;
});
Clazz.defineMethod (c$, "getValidator", 
function () {
return this.validator;
});
Clazz.defineMethod (c$, "getValue", 
function () {
return this.value;
});
Clazz.defineMethod (c$, "validateInput", 
function () {
var errorMessage = null;
if (this.validator != null) {
errorMessage = this.validator.isValid (this.text.getText ());
}this.setErrorMessage (errorMessage);
});
Clazz.defineMethod (c$, "setErrorMessage", 
function (errorMessage) {
this.errorMessageText.setText (errorMessage == null ? "" : errorMessage);
this.okButton.setEnabled (errorMessage == null);
this.errorMessageText.getParent ().update ();
}, "~S");
});
