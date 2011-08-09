Clazz.declarePackage ("org.eclipse.jface.dialogs");
Clazz.load (["org.eclipse.jface.dialogs.IDialogPage", "$.IMessageProvider"], "org.eclipse.jface.dialogs.DialogPage", ["org.eclipse.jface.dialogs.Dialog", "org.eclipse.jface.resource.JFaceResources", "$wt.graphics.GC", "$wt.layout.GridData"], function () {
c$ = Clazz.decorateAsClass (function () {
this.control = null;
this.title = null;
this.description = null;
this.image = null;
this.imageDescriptor = null;
this.message = null;
this.messageType = 0;
this.errorMessage = null;
this.fontMetrics = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.dialogs, "DialogPage", null, [org.eclipse.jface.dialogs.IDialogPage, org.eclipse.jface.dialogs.IMessageProvider]);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (title) {
this.title = title;
}, "~S");
Clazz.makeConstructor (c$, 
function (title, image) {
this.construct (title);
this.imageDescriptor = image;
}, "~S,org.eclipse.jface.resource.ImageDescriptor");
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
Clazz.overrideMethod (c$, "dispose", 
function () {
if (this.image != null) {
this.image.dispose ();
this.image = null;
}});
Clazz.overrideMethod (c$, "getControl", 
function () {
return this.control;
});
Clazz.overrideMethod (c$, "getDescription", 
function () {
return this.description;
});
Clazz.defineMethod (c$, "getDialogFontName", 
function () {
return "org.eclipse.jface.dialogfont";
});
Clazz.overrideMethod (c$, "getErrorMessage", 
function () {
return this.errorMessage;
});
Clazz.defineMethod (c$, "getFont", 
function () {
return org.eclipse.jface.resource.JFaceResources.getFontRegistry ().get (this.getDialogFontName ());
});
Clazz.overrideMethod (c$, "getImage", 
function () {
if (this.image == null) {
if (this.imageDescriptor != null) {
this.image = this.imageDescriptor.createImage ();
}}return this.image;
});
Clazz.overrideMethod (c$, "getMessage", 
function () {
return this.message;
});
Clazz.overrideMethod (c$, "getMessageType", 
function () {
return this.messageType;
});
Clazz.defineMethod (c$, "getShell", 
function () {
return this.getControl ().getShell ();
});
Clazz.overrideMethod (c$, "getTitle", 
function () {
return this.title;
});
Clazz.defineMethod (c$, "getToolTipText", 
function (widgetId) {
return null;
}, "~N");
Clazz.defineMethod (c$, "initializeDialogUnits", 
function (testControl) {
var gc =  new $wt.graphics.GC (testControl);
gc.setFont (org.eclipse.jface.resource.JFaceResources.getDialogFont ());
this.fontMetrics = gc.getFontMetrics ();
gc.dispose ();
}, "$wt.widgets.Control");
Clazz.defineMethod (c$, "setButtonLayoutData", 
function (button) {
var data =  new $wt.layout.GridData (256);
var widthHint = this.convertHorizontalDLUsToPixels (61);
var minSize = button.computeSize (-1, -1, true);
data.widthHint = Math.max (widthHint, minSize.x);
button.setLayoutData (data);
return data;
}, "$wt.widgets.Button");
Clazz.defineMethod (c$, "isControlCreated", 
function () {
return this.control != null;
});
Clazz.overrideMethod (c$, "performHelp", 
function () {
});
Clazz.defineMethod (c$, "setControl", 
function (newControl) {
this.control = newControl;
}, "$wt.widgets.Control");
Clazz.overrideMethod (c$, "setDescription", 
function (description) {
this.description = description;
}, "~S");
Clazz.defineMethod (c$, "setErrorMessage", 
function (newMessage) {
this.errorMessage = newMessage;
}, "~S");
Clazz.overrideMethod (c$, "setImageDescriptor", 
function (desc) {
this.imageDescriptor = desc;
if (this.image != null) {
this.image.dispose ();
this.image = null;
}}, "org.eclipse.jface.resource.ImageDescriptor");
Clazz.defineMethod (c$, "setMessage", 
function (newMessage) {
this.setMessage (newMessage, 0);
}, "~S");
Clazz.defineMethod (c$, "setMessage", 
function (newMessage, newType) {
this.message = newMessage;
this.messageType = newType;
}, "~S,~N");
Clazz.overrideMethod (c$, "setTitle", 
function (title) {
this.title = title;
}, "~S");
Clazz.overrideMethod (c$, "setVisible", 
function (visible) {
this.control.setVisible (visible);
}, "~B");
});
