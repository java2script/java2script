Clazz.declarePackage ("org.eclipse.jface.dialogs");
Clazz.load (["org.eclipse.jface.dialogs.Dialog"], "org.eclipse.jface.dialogs.IconAndMessageDialog", ["org.eclipse.jface.resource.JFaceResources", "$wt.accessibility.AccessibleAdapter", "$wt.layout.GridData", "$.GridLayout", "$wt.widgets.Composite", "$.Display", "$.Label"], function () {
c$ = Clazz.decorateAsClass (function () {
this.message = null;
this.messageLabel = null;
this.imageLabel = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.dialogs, "IconAndMessageDialog", org.eclipse.jface.dialogs.Dialog);
Clazz.defineMethod (c$, "createMessageArea", 
function (composite) {
var image = this.getImage ();
if (image != null) {
this.imageLabel =  new $wt.widgets.Label (composite, 0);
image.setBackground (this.imageLabel.getBackground ());
this.imageLabel.setImage (image);
this.addAccessibleListeners (this.imageLabel, image);
this.imageLabel.setLayoutData ( new $wt.layout.GridData (66));
}if (this.message != null) {
this.messageLabel =  new $wt.widgets.Label (composite, this.getMessageLabelStyle ());
this.messageLabel.setText (this.message);
var data =  new $wt.layout.GridData (770);
data.widthHint = this.convertHorizontalDLUsToPixels (300);
this.messageLabel.setLayoutData (data);
}return composite;
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "getAccessibleMessageFor", 
($fz = function (image) {
if (image.equals (this.getErrorImage ())) return org.eclipse.jface.resource.JFaceResources.getString ("error");
if (image.equals (this.getWarningImage ())) return org.eclipse.jface.resource.JFaceResources.getString ("warning");
if (image.equals (this.getInfoImage ())) return org.eclipse.jface.resource.JFaceResources.getString ("info");
if (image.equals (this.getQuestionImage ())) return org.eclipse.jface.resource.JFaceResources.getString ("question");
return null;
}, $fz.isPrivate = true, $fz), "$wt.graphics.Image");
Clazz.defineMethod (c$, "addAccessibleListeners", 
($fz = function (label, image) {
label.getAccessible ().addAccessibleListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.dialogs.IconAndMessageDialog$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.dialogs, "IconAndMessageDialog$1", $wt.accessibility.AccessibleAdapter);
Clazz.overrideMethod (c$, "getName", 
function (event) {
var accessibleMessage = this.b$["org.eclipse.jface.dialogs.IconAndMessageDialog"].getAccessibleMessageFor (this.f$.image);
if (accessibleMessage == null) return ;
event.result = accessibleMessage;
}, "$wt.accessibility.AccessibleEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.dialogs.IconAndMessageDialog$1, i$, v$);
}) (this, Clazz.cloneFinals ("image", image)));
}, $fz.isPrivate = true, $fz), "$wt.widgets.Label,$wt.graphics.Image");
Clazz.defineMethod (c$, "getMessageLabelStyle", 
function () {
return 64;
});
Clazz.overrideMethod (c$, "createButtonBar", 
function (parent) {
var composite =  new $wt.widgets.Composite (parent, 0);
var layout =  new $wt.layout.GridLayout ();
layout.numColumns = 0;
layout.makeColumnsEqualWidth = true;
layout.marginWidth = 0;
layout.marginHeight = 0;
layout.horizontalSpacing = this.convertHorizontalDLUsToPixels (4);
layout.verticalSpacing = this.convertVerticalDLUsToPixels (4);
composite.setLayout (layout);
var data =  new $wt.layout.GridData (132);
data.horizontalSpan = 2;
composite.setLayoutData (data);
composite.setFont (parent.getFont ());
this.createButtonsForButtonBar (composite);
return composite;
}, "$wt.widgets.Composite");
Clazz.overrideMethod (c$, "createContents", 
function (parent) {
this.initializeDialogUnits (parent);
var layout =  new $wt.layout.GridLayout ();
layout.numColumns = 2;
layout.marginHeight = Math.floor (this.convertVerticalDLUsToPixels (7) * 3 / 2);
layout.marginWidth = this.convertHorizontalDLUsToPixels (7);
layout.verticalSpacing = this.convertVerticalDLUsToPixels (4);
layout.horizontalSpacing = this.convertHorizontalDLUsToPixels (4) * 2;
layout.makeColumnsEqualWidth = false;
parent.setLayout (layout);
parent.setLayoutData ( new $wt.layout.GridData (1808));
this.createDialogAndButtonArea (parent);
return parent;
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "createDialogAndButtonArea", 
function (parent) {
this.dialogArea = this.createDialogArea (parent);
this.buttonBar = this.createButtonBar (parent);
org.eclipse.jface.dialogs.Dialog.applyDialogFont (parent);
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "getErrorImage", 
function () {
return this.getSWTImage (1);
});
Clazz.defineMethod (c$, "getWarningImage", 
function () {
return this.getSWTImage (8);
});
Clazz.defineMethod (c$, "getInfoImage", 
function () {
return this.getSWTImage (2);
});
Clazz.defineMethod (c$, "getQuestionImage", 
function () {
return this.getSWTImage (4);
});
Clazz.defineMethod (c$, "getSWTImage", 
($fz = function (imageID) {
var shell = this.getShell ();
var display;
if (shell == null) {
shell = this.getParentShell ();
}if (shell == null) {
display = $wt.widgets.Display.getCurrent ();
} else {
display = shell.getDisplay ();
}var image =  new Array (1);
display.syncExec ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.dialogs.IconAndMessageDialog$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.dialogs, "IconAndMessageDialog$2", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.f$.image[0] = this.f$.display.getSystemImage (this.f$.imageID);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.dialogs.IconAndMessageDialog$2, i$, v$);
}) (this, Clazz.cloneFinals ("image", image, "display", display, "imageID", imageID)));
return image[0];
}, $fz.isPrivate = true, $fz), "~N");
});
