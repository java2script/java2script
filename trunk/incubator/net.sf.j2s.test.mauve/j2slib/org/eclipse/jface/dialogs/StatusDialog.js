Clazz.declarePackage ("org.eclipse.jface.dialogs");
Clazz.load (["org.eclipse.jface.dialogs.Dialog", "$wt.custom.CLabel"], "org.eclipse.jface.dialogs.StatusDialog", ["org.eclipse.core.runtime.Status", "org.eclipse.jface.dialogs.IDialogConstants", "org.eclipse.jface.resource.JFaceColors", "$.JFaceResources", "$wt.layout.GridData", "$.GridLayout", "$wt.widgets.Composite"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fOkButton = null;
this.fStatusLine = null;
this.fLastStatus = null;
this.fTitle = null;
this.fImage = null;
this.fStatusLineAboveButtons = true;
if (!Clazz.isClassDefined ("org.eclipse.jface.dialogs.StatusDialog.MessageLine")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.fNormalMsgAreaBackground = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.dialogs.StatusDialog, "MessageLine", $wt.custom.CLabel);
Clazz.makeConstructor (c$, 
function (a) {
this.construct (a, 16384);
}, "$wt.widgets.Composite");
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, org.eclipse.jface.dialogs.StatusDialog.MessageLine, [a, b]);
this.fNormalMsgAreaBackground = this.getBackground ();
}, "$wt.widgets.Composite,~N");
Clazz.defineMethod (c$, "findImage", 
($fz = function (a) {
if (a.isOK ()) {
return null;
} else if (a.matches (4)) {
return org.eclipse.jface.resource.JFaceResources.getImage ("dialog_message_error_image");
} else if (a.matches (2)) {
return org.eclipse.jface.resource.JFaceResources.getImage ("dialog_messasge_warning_image");
} else if (a.matches (1)) {
return org.eclipse.jface.resource.JFaceResources.getImage ("dialog_messasge_info_image");
}return null;
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.IStatus");
Clazz.defineMethod (c$, "setErrorStatus", 
function (a) {
if (a != null && !a.isOK ()) {
var b = a.getMessage ();
if (b != null && b.length > 0) {
this.setText (b);
this.setImage (this.findImage (a));
this.setBackground (org.eclipse.jface.resource.JFaceColors.getErrorBackground (this.getDisplay ()));
return ;
}}this.setText ("");
this.setImage (null);
this.setBackground (this.fNormalMsgAreaBackground);
}, "org.eclipse.core.runtime.IStatus");
c$ = Clazz.p0p ();
}
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.dialogs, "StatusDialog", org.eclipse.jface.dialogs.Dialog);
Clazz.makeConstructor (c$, 
function (parent) {
Clazz.superConstructor (this, org.eclipse.jface.dialogs.StatusDialog, [parent]);
this.fLastStatus =  new org.eclipse.core.runtime.Status (0, "org.eclipse.jface", 0, "", null);
}, "$wt.widgets.Shell");
Clazz.defineMethod (c$, "setStatusLineAboveButtons", 
function (aboveButtons) {
this.fStatusLineAboveButtons = aboveButtons;
}, "~B");
Clazz.defineMethod (c$, "updateStatus", 
function (status) {
this.fLastStatus = status;
if (this.fStatusLine != null && !this.fStatusLine.isDisposed ()) {
this.updateButtonsEnableState (status);
this.fStatusLine.setErrorStatus (status);
}}, "org.eclipse.core.runtime.IStatus");
Clazz.defineMethod (c$, "getStatus", 
function () {
return this.fLastStatus;
});
Clazz.defineMethod (c$, "updateButtonsEnableState", 
function (status) {
if (this.fOkButton != null && !this.fOkButton.isDisposed ()) this.fOkButton.setEnabled (!status.matches (4));
}, "org.eclipse.core.runtime.IStatus");
Clazz.defineMethod (c$, "configureShell", 
function (shell) {
Clazz.superCall (this, org.eclipse.jface.dialogs.StatusDialog, "configureShell", [shell]);
if (this.fTitle != null) shell.setText (this.fTitle);
}, "$wt.widgets.Shell");
Clazz.defineMethod (c$, "create", 
function () {
Clazz.superCall (this, org.eclipse.jface.dialogs.StatusDialog, "create", []);
if (this.fLastStatus != null) {
if (this.fLastStatus.matches (4)) {
this.fLastStatus =  new org.eclipse.core.runtime.Status (4, this.fLastStatus.getPlugin (), this.fLastStatus.getCode (), "", this.fLastStatus.getException ());
}this.updateStatus (this.fLastStatus);
}});
Clazz.overrideMethod (c$, "createButtonsForButtonBar", 
function (parent) {
this.fOkButton = this.createButton (parent, 0, org.eclipse.jface.dialogs.IDialogConstants.OK_LABEL, true);
this.createButton (parent, 1, org.eclipse.jface.dialogs.IDialogConstants.CANCEL_LABEL, false);
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "createButtonBar", 
function (parent) {
var composite =  new $wt.widgets.Composite (parent, 0);
var layout =  new $wt.layout.GridLayout ();
if (this.fStatusLineAboveButtons) {
layout.numColumns = 1;
} else {
layout.numColumns = 2;
}layout.marginHeight = 0;
layout.marginWidth = this.convertHorizontalDLUsToPixels (7);
composite.setLayout (layout);
composite.setLayoutData ( new $wt.layout.GridData (768));
this.fStatusLine = Clazz.innerTypeInstance (org.eclipse.jface.dialogs.StatusDialog.MessageLine, this, null, composite);
this.fStatusLine.setAlignment (16384);
this.fStatusLine.setLayoutData ( new $wt.layout.GridData (768));
this.fStatusLine.setErrorStatus (null);
org.eclipse.jface.dialogs.Dialog.applyDialogFont (composite);
Clazz.superCall (this, org.eclipse.jface.dialogs.StatusDialog, "createButtonBar", [composite]);
return composite;
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "setTitle", 
function (title) {
this.fTitle = title != null ? title : "";
var shell = this.getShell ();
if ((shell != null) && !shell.isDisposed ()) shell.setText (this.fTitle);
}, "~S");
Clazz.defineMethod (c$, "setImage", 
function (image) {
this.fImage = image;
var shell = this.getShell ();
if ((shell != null) && !shell.isDisposed ()) shell.setImage (this.fImage);
}, "$wt.graphics.Image");
});
