Clazz.declarePackage ("org.eclipse.jface.dialogs");
Clazz.load (["org.eclipse.jface.window.Window", "java.util.HashMap", "org.eclipse.jface.dialogs.IDialogBlockedHandler", "org.eclipse.jface.resource.FileImageDescriptor", "$.JFaceResources"], "org.eclipse.jface.dialogs.Dialog", ["java.lang.Exception", "java.util.Arrays", "org.eclipse.core.runtime.Status", "org.eclipse.jface.dialogs.IDialogConstants", "org.eclipse.jface.resource.ImageDescriptor", "org.eclipse.jface.util.Policy", "org.eclipse.jface.window.SameShellProvider", "$wt.SWT", "$wt.events.SelectionAdapter", "$wt.graphics.GC", "$wt.layout.FormData", "$.GridData", "$.GridLayout", "$wt.widgets.Button", "$.Composite"], function () {
c$ = Clazz.decorateAsClass (function () {
this.dialogArea = null;
this.buttonBar = null;
this.buttons = null;
this.fontMetrics = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.dialogs, "Dialog", org.eclipse.jface.window.Window);
Clazz.prepareFields (c$, function () {
this.buttons =  new java.util.HashMap ();
});
c$.convertHeightInCharsToPixels = Clazz.defineMethod (c$, "convertHeightInCharsToPixels", 
function (fontMetrics, chars) {
return fontMetrics.getHeight () * chars;
}, "$wt.graphics.FontMetrics,~N");
c$.convertHorizontalDLUsToPixels = Clazz.defineMethod (c$, "convertHorizontalDLUsToPixels", 
function (fontMetrics, dlus) {
return Math.floor ((fontMetrics.getAverageCharWidth () * dlus + 2) / 4);
}, "$wt.graphics.FontMetrics,~N");
c$.convertVerticalDLUsToPixels = Clazz.defineMethod (c$, "convertVerticalDLUsToPixels", 
function (fontMetrics, dlus) {
return Math.floor ((fontMetrics.getHeight () * dlus + 4) / 8);
}, "$wt.graphics.FontMetrics,~N");
c$.convertWidthInCharsToPixels = Clazz.defineMethod (c$, "convertWidthInCharsToPixels", 
function (fontMetrics, chars) {
return fontMetrics.getAverageCharWidth () * chars;
}, "$wt.graphics.FontMetrics,~N");
c$.shortenText = Clazz.defineMethod (c$, "shortenText", 
function (textValue, control) {
if (textValue == null) return null;
var gc =  new $wt.graphics.GC (control);
var maxWidth = control.getBounds ().width - 5;
if (gc.textExtent (textValue).x < maxWidth) {
gc.dispose ();
return textValue;
}var length = textValue.length;
var pivot = Math.floor (length / 2);
var start = pivot;
var end = pivot + 1;
while (start >= 0 && end < length) {
var s1 = textValue.substring (0, start);
var s2 = textValue.substring (end, length);
var s = s1 + "..." + s2;
var l = gc.textExtent (s).x;
if (l < maxWidth) {
gc.dispose ();
return s;
}start--;
end++;
}
gc.dispose ();
return textValue;
}, "~S,$wt.widgets.Control");
Clazz.makeConstructor (c$, 
function (parentShell) {
this.construct ( new org.eclipse.jface.window.SameShellProvider (parentShell));
if (parentShell == null && org.eclipse.jface.util.Policy.DEBUG_DIALOG_NO_PARENT) org.eclipse.jface.util.Policy.getLog ().log ( new org.eclipse.core.runtime.Status (1, "org.eclipse.jface", 1, this.getClass () + " created with no shell",  new Exception ()));
}, "$wt.widgets.Shell");
Clazz.makeConstructor (c$, 
function (parentShell) {
Clazz.superConstructor (this, org.eclipse.jface.dialogs.Dialog, [parentShell]);
this.setShellStyle (2144 | 65536 | org.eclipse.jface.window.Window.getDefaultOrientation ());
this.setBlockOnOpen (true);
}, "org.eclipse.jface.window.IShellProvider");
Clazz.defineMethod (c$, "buttonPressed", 
function (buttonId) {
if (0 == buttonId) this.okPressed ();
 else if (1 == buttonId) this.cancelPressed ();
}, "~N");
Clazz.defineMethod (c$, "cancelPressed", 
function () {
this.setReturnCode (1);
this.close ();
});
Clazz.defineMethod (c$, "convertHeightInCharsToPixels", 
function (chars) {
if (this.fontMetrics == null) return 0;
return org.eclipse.jface.dialogs.Dialog.convertHeightInCharsToPixels (this.fontMetrics, chars);
}, "~N");
Clazz.defineMethod (c$, "convertHorizontalDLUsToPixels", 
function (dlus) {
if (this.fontMetrics == null) return 0;
return org.eclipse.jface.dialogs.Dialog.convertHorizontalDLUsToPixels (this.fontMetrics, dlus);
}, "~N");
Clazz.defineMethod (c$, "convertVerticalDLUsToPixels", 
function (dlus) {
if (this.fontMetrics == null) return 0;
return org.eclipse.jface.dialogs.Dialog.convertVerticalDLUsToPixels (this.fontMetrics, dlus);
}, "~N");
Clazz.defineMethod (c$, "convertWidthInCharsToPixels", 
function (chars) {
if (this.fontMetrics == null) return 0;
return org.eclipse.jface.dialogs.Dialog.convertWidthInCharsToPixels (this.fontMetrics, chars);
}, "~N");
Clazz.defineMethod (c$, "createButton", 
function (parent, id, label, defaultButton) {
(parent.getLayout ()).numColumns++;
var button =  new $wt.widgets.Button (parent, 8);
button.setText (label);
button.setFont (org.eclipse.jface.resource.JFaceResources.getDialogFont ());
button.setData ( new Integer (id));
button.addSelectionListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.dialogs.Dialog$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.dialogs, "Dialog$1", $wt.events.SelectionAdapter);
Clazz.overrideMethod (c$, "widgetSelected", 
function (event) {
this.b$["org.eclipse.jface.dialogs.Dialog"].buttonPressed ((event.widget.getData ()).intValue ());
}, "$wt.events.SelectionEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.dialogs.Dialog$1, i$, v$);
}) (this, null));
if (defaultButton) {
var shell = parent.getShell ();
if (shell != null) {
shell.setDefaultButton (button);
}}this.buttons.put ( new Integer (id), button);
this.setButtonLayoutData (button);
return button;
}, "$wt.widgets.Composite,~N,~S,~B");
Clazz.defineMethod (c$, "createButtonBar", 
function (parent) {
var composite =  new $wt.widgets.Composite (parent, 0);
var layout =  new $wt.layout.GridLayout ();
layout.numColumns = 0;
layout.makeColumnsEqualWidth = true;
layout.marginWidth = this.convertHorizontalDLUsToPixels (7);
layout.marginHeight = this.convertVerticalDLUsToPixels (7);
layout.horizontalSpacing = this.convertHorizontalDLUsToPixels (4);
layout.verticalSpacing = this.convertVerticalDLUsToPixels (4);
composite.setLayout (layout);
var data =  new $wt.layout.GridData (132);
composite.setLayoutData (data);
composite.setFont (parent.getFont ());
this.createButtonsForButtonBar (composite);
return composite;
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "createButtonsForButtonBar", 
function (parent) {
this.createButton (parent, 0, org.eclipse.jface.dialogs.IDialogConstants.OK_LABEL, true);
this.createButton (parent, 1, org.eclipse.jface.dialogs.IDialogConstants.CANCEL_LABEL, false);
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "initializeBounds", 
function () {
var platform = $WT.getPlatform ();
if ("carbon".equals (platform)) {
var shell = this.getShell ();
if (shell != null) {
var defaultButton = shell.getDefaultButton ();
if (defaultButton != null && this.isContained (this.buttonBar, defaultButton)) defaultButton.moveBelow (null);
}}Clazz.superCall (this, org.eclipse.jface.dialogs.Dialog, "initializeBounds", []);
});
Clazz.defineMethod (c$, "isContained", 
($fz = function (container, control) {
var parent;
while ((parent = control.getParent ()) != null) {
if (parent === container) return true;
control = parent;
}
return false;
}, $fz.isPrivate = true, $fz), "$wt.widgets.Control,$wt.widgets.Control");
Clazz.overrideMethod (c$, "createContents", 
function (parent) {
var composite =  new $wt.widgets.Composite (parent, 0);
var layout =  new $wt.layout.GridLayout ();
layout.marginHeight = 0;
layout.marginWidth = 0;
layout.verticalSpacing = 0;
composite.setLayout (layout);
composite.setLayoutData ( new $wt.layout.GridData (1808));
org.eclipse.jface.dialogs.Dialog.applyDialogFont (composite);
this.initializeDialogUnits (composite);
this.dialogArea = this.createDialogArea (composite);
this.buttonBar = this.createButtonBar (composite);
return composite;
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "createDialogArea", 
function (parent) {
var composite =  new $wt.widgets.Composite (parent, 0);
var layout =  new $wt.layout.GridLayout ();
layout.marginHeight = this.convertVerticalDLUsToPixels (7);
layout.marginWidth = this.convertHorizontalDLUsToPixels (7);
layout.verticalSpacing = this.convertVerticalDLUsToPixels (4);
layout.horizontalSpacing = this.convertHorizontalDLUsToPixels (4);
composite.setLayout (layout);
composite.setLayoutData ( new $wt.layout.GridData (1808));
org.eclipse.jface.dialogs.Dialog.applyDialogFont (composite);
return composite;
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "getButton", 
function (id) {
return this.buttons.get ( new Integer (id));
}, "~N");
Clazz.defineMethod (c$, "getButtonBar", 
function () {
return this.buttonBar;
});
Clazz.defineMethod (c$, "getCancelButton", 
function () {
return this.getButton (1);
});
Clazz.defineMethod (c$, "getDialogArea", 
function () {
return this.dialogArea;
});
c$.getImage = Clazz.defineMethod (c$, "getImage", 
function (key) {
return org.eclipse.jface.resource.JFaceResources.getImageRegistry ().get (key);
}, "~S");
Clazz.defineMethod (c$, "getOKButton", 
function () {
return this.getButton (0);
});
Clazz.defineMethod (c$, "initializeDialogUnits", 
function (control) {
var gc =  new $wt.graphics.GC (control);
gc.setFont (org.eclipse.jface.resource.JFaceResources.getDialogFont ());
this.fontMetrics = gc.getFontMetrics ();
gc.dispose ();
}, "$wt.widgets.Control");
Clazz.defineMethod (c$, "okPressed", 
function () {
this.setReturnCode (0);
this.close ();
});
Clazz.defineMethod (c$, "setButtonLayoutData", 
function (button) {
var data =  new $wt.layout.GridData (256);
var widthHint = this.convertHorizontalDLUsToPixels (61);
var minSize = button.computeSize (-1, -1, true);
data.widthHint = Math.max (widthHint, minSize.x);
button.setLayoutData (data);
}, "$wt.widgets.Button");
Clazz.defineMethod (c$, "setButtonLayoutFormData", 
function (button) {
var data =  new $wt.layout.FormData ();
var widthHint = this.convertHorizontalDLUsToPixels (61);
var minSize = button.computeSize (-1, -1, true);
data.width = Math.max (widthHint, minSize.x);
button.setLayoutData (data);
}, "$wt.widgets.Button");
Clazz.defineMethod (c$, "close", 
function () {
var returnValue = Clazz.superCall (this, org.eclipse.jface.dialogs.Dialog, "close", []);
if (returnValue) {
this.buttons =  new java.util.HashMap ();
this.buttonBar = null;
this.dialogArea = null;
}return returnValue;
});
c$.applyDialogFont = Clazz.defineMethod (c$, "applyDialogFont", 
function (control) {
if (control == null || org.eclipse.jface.dialogs.Dialog.dialogFontIsDefault ()) return ;
var dialogFont = org.eclipse.jface.resource.JFaceResources.getDialogFont ();
org.eclipse.jface.dialogs.Dialog.applyDialogFont (control, dialogFont);
}, "$wt.widgets.Control");
c$.applyDialogFont = Clazz.defineMethod (c$, "applyDialogFont", 
($fz = function (control, dialogFont) {
if (org.eclipse.jface.dialogs.Dialog.hasDefaultFont (control)) control.setFont (dialogFont);
if (Clazz.instanceOf (control, $wt.widgets.Composite)) {
var children = (control).getChildren ();
for (var i = 0; i < children.length; i++) org.eclipse.jface.dialogs.Dialog.applyDialogFont (children[i], dialogFont);

}}, $fz.isPrivate = true, $fz), "$wt.widgets.Control,$wt.graphics.Font");
c$.hasDefaultFont = Clazz.defineMethod (c$, "hasDefaultFont", 
($fz = function (control) {
var controlFontData = control.getFont ().getFontData ();
var defaultFontData = org.eclipse.jface.dialogs.Dialog.getDefaultFont (control).getFontData ();
if (controlFontData.length == defaultFontData.length) {
for (var i = 0; i < controlFontData.length; i++) {
if (controlFontData[i].equals (defaultFontData[i])) continue ;return false;
}
return true;
}return false;
}, $fz.isPrivate = true, $fz), "$wt.widgets.Control");
c$.getDefaultFont = Clazz.defineMethod (c$, "getDefaultFont", 
($fz = function (control) {
var fontName = "DEFAULT_FONT_" + control.getClass ().getName ();
if (org.eclipse.jface.resource.JFaceResources.getFontRegistry ().hasValueFor (fontName)) return org.eclipse.jface.resource.JFaceResources.getFontRegistry ().get (fontName);
var cached = control.getFont ();
control.setFont (null);
var defaultFont = control.getFont ();
control.setFont (cached);
org.eclipse.jface.resource.JFaceResources.getFontRegistry ().put (fontName, defaultFont.getFontData ());
return defaultFont;
}, $fz.isPrivate = true, $fz), "$wt.widgets.Control");
c$.dialogFontIsDefault = Clazz.defineMethod (c$, "dialogFontIsDefault", 
function () {
var dialogFontData = org.eclipse.jface.resource.JFaceResources.getFontRegistry ().getFontData ("org.eclipse.jface.dialogfont");
var defaultFontData = org.eclipse.jface.resource.JFaceResources.getFontRegistry ().getFontData ("org.eclipse.jface.defaultfont");
return java.util.Arrays.equals (dialogFontData, defaultFontData);
});
Clazz.defineMethod (c$, "create", 
function () {
Clazz.superCall (this, org.eclipse.jface.dialogs.Dialog, "create", []);
org.eclipse.jface.dialogs.Dialog.applyDialogFont (this.buttonBar);
});
c$.getBlockedHandler = Clazz.defineMethod (c$, "getBlockedHandler", 
function () {
return org.eclipse.jface.dialogs.Dialog.blockedHandler;
});
c$.setBlockedHandler = Clazz.defineMethod (c$, "setBlockedHandler", 
function (blockedHandler) {
($t$ = org.eclipse.jface.dialogs.Dialog.blockedHandler = blockedHandler, org.eclipse.jface.dialogs.Dialog.prototype.blockedHandler = org.eclipse.jface.dialogs.Dialog.blockedHandler, $t$);
}, "org.eclipse.jface.dialogs.IDialogBlockedHandler");
Clazz.defineStatics (c$,
"DLG_IMG_ERROR", "dialog_error_image",
"DLG_IMG_INFO", "dialog_info_imageg",
"DLG_IMG_QUESTION", "dialog_question_image",
"DLG_IMG_WARNING", "dialog_warning_image",
"DLG_IMG_MESSAGE_INFO", "dialog_messasge_info_image",
"DLG_IMG_MESSAGE_WARNING", "dialog_messasge_warning_image",
"DLG_IMG_MESSAGE_ERROR", "dialog_message_error_image",
"ELLIPSIS", "...");
{
var reg = org.eclipse.jface.resource.JFaceResources.getImageRegistry ();
reg.put ("dialog_messasge_info_image", org.eclipse.jface.resource.ImageDescriptor.createFromFile (org.eclipse.jface.dialogs.Dialog, "images/message_info.gif"));
reg.put ("dialog_messasge_warning_image", org.eclipse.jface.resource.ImageDescriptor.createFromFile (org.eclipse.jface.dialogs.Dialog, "images/message_warning.gif"));
reg.put ("dialog_message_error_image", org.eclipse.jface.resource.ImageDescriptor.createFromFile (org.eclipse.jface.dialogs.Dialog, "images/message_error.gif"));
}Clazz.defineStatics (c$,
"HORIZONTAL_DIALOG_UNIT_PER_CHAR", 4,
"VERTICAL_DIALOG_UNITS_PER_CHAR", 8);
c$.blockedHandler = c$.prototype.blockedHandler = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.dialogs.Dialog$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.dialogs, "Dialog$2", null, org.eclipse.jface.dialogs.IDialogBlockedHandler);
Clazz.overrideMethod (c$, "clearBlocked", 
function () {
});
Clazz.defineMethod (c$, "showBlocked", 
function (blocking, blockingStatus, blockedName) {
}, "org.eclipse.core.runtime.IProgressMonitor,org.eclipse.core.runtime.IStatus,~S");
Clazz.defineMethod (c$, "showBlocked", 
function (parentShell, blocking, blockingStatus, blockedName) {
}, "$wt.widgets.Shell,org.eclipse.core.runtime.IProgressMonitor,org.eclipse.core.runtime.IStatus,~S");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.dialogs.Dialog$2, i$, v$);
}) (this, null);
});
