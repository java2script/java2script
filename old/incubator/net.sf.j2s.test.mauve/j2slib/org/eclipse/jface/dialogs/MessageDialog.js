Clazz.declarePackage ("org.eclipse.jface.dialogs");
Clazz.load (["org.eclipse.jface.dialogs.IconAndMessageDialog"], "org.eclipse.jface.dialogs.MessageDialog", ["java.lang.NullPointerException", "org.eclipse.jface.dialogs.IDialogConstants", "$wt.layout.GridData", "$.GridLayout", "$wt.widgets.Composite", "$.Label"], function () {
c$ = Clazz.decorateAsClass (function () {
this.buttonLabels = null;
this.$buttons = null;
this.defaultButtonIndex = 0;
this.title = null;
this.titleImage = null;
this.image = null;
this.customArea = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.dialogs, "MessageDialog", org.eclipse.jface.dialogs.IconAndMessageDialog);
Clazz.makeConstructor (c$, 
function (parentShell, dialogTitle, dialogTitleImage, dialogMessage, dialogImageType, dialogButtonLabels, defaultIndex) {
Clazz.superConstructor (this, org.eclipse.jface.dialogs.MessageDialog, [parentShell]);
this.title = dialogTitle;
this.titleImage = dialogTitleImage;
this.message = dialogMessage;
switch (dialogImageType) {
case 1:
{
this.image = this.getErrorImage ();
break;
}case 2:
{
this.image = this.getInfoImage ();
break;
}case 3:
{
this.image = this.getQuestionImage ();
break;
}case 4:
{
this.image = this.getWarningImage ();
break;
}}
this.buttonLabels = dialogButtonLabels;
this.defaultButtonIndex = defaultIndex;
}, "$wt.widgets.Shell,~S,$wt.graphics.Image,~S,~N,~A,~N");
Clazz.overrideMethod (c$, "buttonPressed", 
function (buttonId) {
this.setReturnCode (buttonId);
this.close ();
}, "~N");
Clazz.defineMethod (c$, "configureShell", 
function (shell) {
Clazz.superCall (this, org.eclipse.jface.dialogs.MessageDialog, "configureShell", [shell]);
if (this.title != null) shell.setText (this.title);
if (this.titleImage != null) shell.setImage (this.titleImage);
}, "$wt.widgets.Shell");
Clazz.overrideMethod (c$, "createButtonsForButtonBar", 
function (parent) {
this.$buttons =  new Array (this.buttonLabels.length);
for (var i = 0; i < this.buttonLabels.length; i++) {
var label = this.buttonLabels[i];
var button = this.createButton (parent, i, label, this.defaultButtonIndex == i);
this.$buttons[i] = button;
}
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "createCustomArea", 
function (parent) {
return null;
}, "$wt.widgets.Composite");
Clazz.overrideMethod (c$, "createDialogArea", 
function (parent) {
this.createMessageArea (parent);
var composite =  new $wt.widgets.Composite (parent, 0);
var layout =  new $wt.layout.GridLayout ();
layout.marginHeight = 0;
layout.marginWidth = 0;
composite.setLayout (layout);
var data =  new $wt.layout.GridData (1808);
data.horizontalSpan = 2;
composite.setLayoutData (data);
this.customArea = this.createCustomArea (composite);
if (this.customArea == null) this.customArea =  new $wt.widgets.Label (composite, 0);
return composite;
}, "$wt.widgets.Composite");
Clazz.overrideMethod (c$, "getButton", 
function (index) {
return this.$buttons[index];
}, "~N");
Clazz.defineMethod (c$, "getMinimumMessageWidth", 
function () {
return this.convertHorizontalDLUsToPixels (300);
});
Clazz.defineMethod (c$, "handleShellCloseEvent", 
function () {
Clazz.superCall (this, org.eclipse.jface.dialogs.MessageDialog, "handleShellCloseEvent", []);
this.setReturnCode (-1);
});
c$.openConfirm = Clazz.defineMethod (c$, "openConfirm", 
function (parent, title, message) {
var dialog =  new org.eclipse.jface.dialogs.MessageDialog (parent, title, null, message, 3, [org.eclipse.jface.dialogs.IDialogConstants.OK_LABEL, org.eclipse.jface.dialogs.IDialogConstants.CANCEL_LABEL], 0);
return dialog.open () == 0;
}, "$wt.widgets.Shell,~S,~S");
c$.openError = Clazz.defineMethod (c$, "openError", 
function (parent, title, message) {
var dialog =  new org.eclipse.jface.dialogs.MessageDialog (parent, title, null, message, 1, [org.eclipse.jface.dialogs.IDialogConstants.OK_LABEL], 0);
dialog.open ();
return ;
}, "$wt.widgets.Shell,~S,~S");
c$.openInformation = Clazz.defineMethod (c$, "openInformation", 
function (parent, title, message) {
var dialog =  new org.eclipse.jface.dialogs.MessageDialog (parent, title, null, message, 2, [org.eclipse.jface.dialogs.IDialogConstants.OK_LABEL], 0);
dialog.open ();
return ;
}, "$wt.widgets.Shell,~S,~S");
c$.openQuestion = Clazz.defineMethod (c$, "openQuestion", 
function (parent, title, message) {
var dialog =  new org.eclipse.jface.dialogs.MessageDialog (parent, title, null, message, 3, [org.eclipse.jface.dialogs.IDialogConstants.YES_LABEL, org.eclipse.jface.dialogs.IDialogConstants.NO_LABEL], 0);
return dialog.open () == 0;
}, "$wt.widgets.Shell,~S,~S");
c$.openWarning = Clazz.defineMethod (c$, "openWarning", 
function (parent, title, message) {
var dialog =  new org.eclipse.jface.dialogs.MessageDialog (parent, title, null, message, 4, [org.eclipse.jface.dialogs.IDialogConstants.OK_LABEL], 0);
dialog.open ();
return ;
}, "$wt.widgets.Shell,~S,~S");
Clazz.defineMethod (c$, "createButton", 
function (parent, id, label, defaultButton) {
var button = Clazz.superCall (this, org.eclipse.jface.dialogs.MessageDialog, "createButton", [parent, id, label, defaultButton]);
if (defaultButton && !this.customShouldTakeFocus ()) button.setFocus ();
return button;
}, "$wt.widgets.Composite,~N,~S,~B");
Clazz.defineMethod (c$, "customShouldTakeFocus", 
function () {
if (Clazz.instanceOf (this.customArea, $wt.widgets.Label)) return false;
if (Clazz.instanceOf (this.customArea, $wt.custom.CLabel)) return (this.customArea.getStyle () & 524288) > 0;
return true;
});
Clazz.defineMethod (c$, "getImage", 
function () {
return this.image;
});
Clazz.defineMethod (c$, "getButtonLabels", 
function () {
return this.buttonLabels;
});
Clazz.defineMethod (c$, "getDefaultButtonIndex", 
function () {
return this.defaultButtonIndex;
});
Clazz.defineMethod (c$, "setButtons", 
function (buttons) {
if (buttons == null) {
throw  new NullPointerException ("The array of buttons cannot be null.");
}this.$buttons = buttons;
}, "~A");
Clazz.defineMethod (c$, "setButtonLabels", 
function (buttonLabels) {
if (buttonLabels == null) {
throw  new NullPointerException ("The array of button labels cannot be null.");
}this.buttonLabels = buttonLabels;
}, "~A");
Clazz.defineStatics (c$,
"NONE", 0,
"ERROR", 1,
"INFORMATION", 2,
"QUESTION", 3,
"WARNING", 4);
});
