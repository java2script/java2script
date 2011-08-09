Clazz.declarePackage ("org.eclipse.jface.dialogs");
Clazz.load (["org.eclipse.jface.dialogs.Dialog"], "org.eclipse.jface.dialogs.TitleAreaDialog", ["org.eclipse.jface.resource.ImageDescriptor", "$.JFaceColors", "$.JFaceResources", "$wt.events.DisposeListener", "$wt.graphics.Color", "$.Point", "$wt.layout.FormAttachment", "$.FormData", "$.FormLayout", "$.GridData", "$.GridLayout", "$wt.widgets.Composite", "$.Label", "$.Text"], function () {
c$ = Clazz.decorateAsClass (function () {
this.titleLabel = null;
this.titleImage = null;
this.bottomFillerLabel = null;
this.leftFillerLabel = null;
this.titleAreaRGB = null;
this.titleAreaColor = null;
this.message = "";
this.errorMessage = null;
this.messageLabel = null;
this.workArea = null;
this.messageImageLabel = null;
this.messageImage = null;
this.normalMsgAreaBackground = null;
this.errorMsgAreaBackground = null;
this.errorMsgImage = null;
this.showingError = false;
this.titleImageLargest = true;
this.messageLabelHeight = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.dialogs, "TitleAreaDialog", org.eclipse.jface.dialogs.Dialog);
Clazz.overrideMethod (c$, "createContents", 
function (parent) {
this.initializeDialogUnits (parent);
var layout =  new $wt.layout.FormLayout ();
parent.setLayout (layout);
var data =  new $wt.layout.FormData ();
data.top =  new $wt.layout.FormAttachment (0, 0);
data.bottom =  new $wt.layout.FormAttachment (100, 0);
parent.setLayoutData (data);
this.workArea =  new $wt.widgets.Composite (parent, 0);
var childLayout =  new $wt.layout.GridLayout ();
childLayout.marginHeight = 0;
childLayout.marginWidth = 0;
childLayout.verticalSpacing = 0;
this.workArea.setLayout (childLayout);
var top = this.createTitleArea (parent);
this.resetWorkAreaAttachments (top);
this.workArea.setFont (org.eclipse.jface.resource.JFaceResources.getDialogFont ());
this.initializeDialogUnits (this.workArea);
this.dialogArea = this.createDialogArea (this.workArea);
this.buttonBar = this.createButtonBar (this.workArea);
return parent;
}, "$wt.widgets.Composite");
Clazz.overrideMethod (c$, "createDialogArea", 
function (parent) {
var composite =  new $wt.widgets.Composite (parent, 0);
var layout =  new $wt.layout.GridLayout ();
layout.marginHeight = 0;
layout.marginWidth = 0;
layout.verticalSpacing = 0;
layout.horizontalSpacing = 0;
composite.setLayout (layout);
composite.setLayoutData ( new $wt.layout.GridData (1808));
composite.setFont (parent.getFont ());
var titleBarSeparator =  new $wt.widgets.Label (composite, 258);
titleBarSeparator.setLayoutData ( new $wt.layout.GridData (768));
return composite;
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "createTitleArea", 
($fz = function (parent) {
parent.addDisposeListener ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.dialogs.TitleAreaDialog$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.jface.dialogs, "TitleAreaDialog$1", null, $wt.events.DisposeListener);
Clazz.overrideMethod (c$, "widgetDisposed", 
function (e) {
if (this.b$["org.eclipse.jface.dialogs.TitleAreaDialog"].titleAreaColor != null) this.b$["org.eclipse.jface.dialogs.TitleAreaDialog"].titleAreaColor.dispose ();
}, "$wt.events.DisposeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.dialogs.TitleAreaDialog$1, i$, v$);
}) (this, null));
var display = parent.getDisplay ();
var background;
var foreground;
if (this.titleAreaRGB != null) {
this.titleAreaColor =  new $wt.graphics.Color (display, this.titleAreaRGB);
background = this.titleAreaColor;
foreground = null;
} else {
background = org.eclipse.jface.resource.JFaceColors.getBannerBackground (display);
foreground = org.eclipse.jface.resource.JFaceColors.getBannerForeground (display);
}var verticalSpacing = this.convertVerticalDLUsToPixels (4);
var horizontalSpacing = this.convertHorizontalDLUsToPixels (4);
parent.setBackground (background);
this.titleImage =  new $wt.widgets.Label (parent, 16777216);
this.titleImage.setBackground (background);
this.titleImage.setImage (org.eclipse.jface.resource.JFaceResources.getImage ("dialog_title_banner_image"));
var imageData =  new $wt.layout.FormData ();
imageData.top =  new $wt.layout.FormAttachment (0, 0);
imageData.right =  new $wt.layout.FormAttachment (100, 0);
this.titleImage.setLayoutData (imageData);
this.titleLabel =  new $wt.widgets.Label (parent, 16384);
org.eclipse.jface.resource.JFaceColors.setColors (this.titleLabel, foreground, background);
this.titleLabel.setFont (org.eclipse.jface.resource.JFaceResources.getBannerFont ());
this.titleLabel.setText (" ");
var titleData =  new $wt.layout.FormData ();
titleData.top =  new $wt.layout.FormAttachment (0, verticalSpacing);
titleData.right =  new $wt.layout.FormAttachment (this.titleImage);
titleData.left =  new $wt.layout.FormAttachment (0, horizontalSpacing);
this.titleLabel.setLayoutData (titleData);
this.messageImageLabel =  new $wt.widgets.Label (parent, 16777216);
this.messageImageLabel.setBackground (background);
this.messageLabel =  new $wt.widgets.Text (parent, 72);
org.eclipse.jface.resource.JFaceColors.setColors (this.messageLabel, foreground, background);
this.messageLabel.setText (" \n ");
this.messageLabel.setFont (org.eclipse.jface.resource.JFaceResources.getDialogFont ());
this.messageLabelHeight = this.messageLabel.computeSize (-1, -1).y;
this.leftFillerLabel =  new $wt.widgets.Label (parent, 16777216);
this.leftFillerLabel.setBackground (background);
this.bottomFillerLabel =  new $wt.widgets.Label (parent, 16777216);
this.bottomFillerLabel.setBackground (background);
this.setLayoutsForNormalMessage (verticalSpacing, horizontalSpacing);
this.determineTitleImageLargest ();
if (this.titleImageLargest) return this.titleImage;
return this.messageLabel;
}, $fz.isPrivate = true, $fz), "$wt.widgets.Composite");
Clazz.defineMethod (c$, "determineTitleImageLargest", 
($fz = function () {
var titleY = this.titleImage.computeSize (-1, -1).y;
var verticalSpacing = this.convertVerticalDLUsToPixels (4);
var labelY = this.titleLabel.computeSize (-1, -1).y;
labelY += verticalSpacing;
labelY += this.messageLabelHeight;
labelY += verticalSpacing;
this.titleImageLargest = titleY > labelY;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setLayoutsForNormalMessage", 
($fz = function (verticalSpacing, horizontalSpacing) {
var messageImageData =  new $wt.layout.FormData ();
messageImageData.top =  new $wt.layout.FormAttachment (this.titleLabel, verticalSpacing);
messageImageData.left =  new $wt.layout.FormAttachment (0, 5);
this.messageImageLabel.setLayoutData (messageImageData);
var messageLabelData =  new $wt.layout.FormData ();
messageLabelData.top =  new $wt.layout.FormAttachment (this.titleLabel, verticalSpacing);
messageLabelData.right =  new $wt.layout.FormAttachment (this.titleImage);
messageLabelData.left =  new $wt.layout.FormAttachment (this.messageImageLabel, horizontalSpacing);
messageLabelData.height = this.messageLabelHeight;
if (this.titleImageLargest) messageLabelData.bottom =  new $wt.layout.FormAttachment (this.titleImage, 0, 1024);
this.messageLabel.setLayoutData (messageLabelData);
var fillerData =  new $wt.layout.FormData ();
fillerData.left =  new $wt.layout.FormAttachment (0, horizontalSpacing);
fillerData.top =  new $wt.layout.FormAttachment (this.messageImageLabel, 0);
fillerData.bottom =  new $wt.layout.FormAttachment (this.messageLabel, 0, 1024);
this.bottomFillerLabel.setLayoutData (fillerData);
var data =  new $wt.layout.FormData ();
data.top =  new $wt.layout.FormAttachment (this.messageImageLabel, 0, 128);
data.left =  new $wt.layout.FormAttachment (0, 0);
data.bottom =  new $wt.layout.FormAttachment (this.messageImageLabel, 0, 1024);
data.right =  new $wt.layout.FormAttachment (this.messageImageLabel, 0);
this.leftFillerLabel.setLayoutData (data);
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "getInitialSize", 
function () {
var shellSize = Clazz.superCall (this, org.eclipse.jface.dialogs.TitleAreaDialog, "getInitialSize", []);
return  new $wt.graphics.Point (Math.max (this.convertHorizontalDLUsToPixels (350), shellSize.x), Math.max (this.convertVerticalDLUsToPixels (150), shellSize.y));
});
Clazz.defineMethod (c$, "getTitleArea", 
function () {
return this.getShell ();
});
Clazz.defineMethod (c$, "getTitleImageLabel", 
function () {
return this.titleImage;
});
Clazz.defineMethod (c$, "setErrorMessage", 
function (newErrorMessage) {
if (this.errorMessage == null ? newErrorMessage == null : this.errorMessage.equals (newErrorMessage)) return ;
this.errorMessage = newErrorMessage;
if (this.errorMessage == null) {
if (this.showingError) {
this.showingError = false;
this.setMessageBackgrounds (false);
}if (this.message == null) this.message = "";
this.updateMessage (this.message);
this.messageImageLabel.setImage (this.messageImage);
this.setImageLabelVisible (this.messageImage != null);
} else {
var displayedErrorMessage = " " + this.errorMessage;
this.updateMessage (displayedErrorMessage);
if (!this.showingError) {
this.showingError = true;
if (this.errorMsgAreaBackground == null) {
this.errorMsgAreaBackground = org.eclipse.jface.resource.JFaceColors.getErrorBackground (this.messageLabel.getDisplay ());
this.errorMsgImage = org.eclipse.jface.resource.JFaceResources.getImage ("dialog_message_error_image");
}this.normalMsgAreaBackground = this.messageLabel.getBackground ();
this.setMessageBackgrounds (true);
this.messageImageLabel.setImage (this.errorMsgImage);
this.setImageLabelVisible (true);
}}this.layoutForNewMessage ();
}, "~S");
Clazz.defineMethod (c$, "layoutForNewMessage", 
($fz = function () {
var verticalSpacing = this.convertVerticalDLUsToPixels (4);
var horizontalSpacing = this.convertHorizontalDLUsToPixels (4);
if (this.errorMessage == null && this.messageImage == null) {
this.setImageLabelVisible (false);
this.setLayoutsForNormalMessage (verticalSpacing, horizontalSpacing);
} else {
this.messageImageLabel.setVisible (true);
this.bottomFillerLabel.setVisible (true);
this.leftFillerLabel.setVisible (true);
var data =  new $wt.layout.FormData ();
data.left =  new $wt.layout.FormAttachment (0, 5);
data.top =  new $wt.layout.FormAttachment (this.titleLabel, verticalSpacing);
this.messageImageLabel.setLayoutData (data);
data =  new $wt.layout.FormData ();
data.top =  new $wt.layout.FormAttachment (this.messageImageLabel, 0);
data.left =  new $wt.layout.FormAttachment (0, 0);
data.bottom =  new $wt.layout.FormAttachment (this.messageLabel, 0, 1024);
data.right =  new $wt.layout.FormAttachment (this.messageImageLabel, 0, 131072);
this.bottomFillerLabel.setLayoutData (data);
data =  new $wt.layout.FormData ();
data.top =  new $wt.layout.FormAttachment (this.messageImageLabel, 0, 128);
data.left =  new $wt.layout.FormAttachment (0, 0);
data.bottom =  new $wt.layout.FormAttachment (this.messageImageLabel, 0, 1024);
data.right =  new $wt.layout.FormAttachment (this.messageImageLabel, 0);
this.leftFillerLabel.setLayoutData (data);
var messageLabelData =  new $wt.layout.FormData ();
messageLabelData.top =  new $wt.layout.FormAttachment (this.titleLabel, verticalSpacing);
messageLabelData.right =  new $wt.layout.FormAttachment (this.titleImage);
messageLabelData.left =  new $wt.layout.FormAttachment (this.messageImageLabel, 0);
messageLabelData.height = this.messageLabelHeight;
if (this.titleImageLargest) messageLabelData.bottom =  new $wt.layout.FormAttachment (this.titleImage, 0, 1024);
this.messageLabel.setLayoutData (messageLabelData);
}if (this.dialogArea != null) this.getShell ().layout (true);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setMessage", 
function (newMessage) {
this.setMessage (newMessage, 0);
}, "~S");
Clazz.defineMethod (c$, "setMessage", 
function (newMessage, newType) {
var newImage = null;
if (newMessage != null) {
switch (newType) {
case 0:
break;
case 1:
newImage = org.eclipse.jface.resource.JFaceResources.getImage ("dialog_messasge_info_image");
break;
case 2:
newImage = org.eclipse.jface.resource.JFaceResources.getImage ("dialog_messasge_warning_image");
break;
case 3:
newImage = org.eclipse.jface.resource.JFaceResources.getImage ("dialog_message_error_image");
break;
}
}this.showMessage (newMessage, newImage);
}, "~S,~N");
Clazz.defineMethod (c$, "showMessage", 
($fz = function (newMessage, newImage) {
if (this.message.equals (newMessage) && this.messageImage === newImage) return ;
this.message = newMessage;
if (this.message == null) this.message = "";
var shownMessage = (newImage == null) ? this.message : " " + this.message;
this.messageImage = newImage;
if (!this.showingError) {
this.updateMessage (shownMessage);
this.messageImageLabel.setImage (this.messageImage);
this.setImageLabelVisible (this.messageImage != null);
this.layoutForNewMessage ();
}}, $fz.isPrivate = true, $fz), "~S,$wt.graphics.Image");
Clazz.defineMethod (c$, "updateMessage", 
($fz = function (newMessage) {
this.messageLabel.setText (newMessage);
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "setTitle", 
function (newTitle) {
if (this.titleLabel == null) return ;
var title = newTitle;
if (title == null) title = "";
this.titleLabel.setText (title);
}, "~S");
Clazz.defineMethod (c$, "setTitleAreaColor", 
function (color) {
this.titleAreaRGB = color;
}, "$wt.graphics.RGB");
Clazz.defineMethod (c$, "setTitleImage", 
function (newTitleImage) {
this.titleImage.setImage (newTitleImage);
this.titleImage.setVisible (newTitleImage != null);
if (newTitleImage != null) {
this.determineTitleImageLargest ();
var top;
if (this.titleImageLargest) top = this.titleImage;
 else top = this.messageLabel;
this.resetWorkAreaAttachments (top);
}}, "$wt.graphics.Image");
Clazz.defineMethod (c$, "setImageLabelVisible", 
($fz = function (visible) {
this.messageImageLabel.setVisible (visible);
this.bottomFillerLabel.setVisible (visible);
this.leftFillerLabel.setVisible (visible);
}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineMethod (c$, "setMessageBackgrounds", 
($fz = function (showingError) {
var color;
if (showingError) color = this.errorMsgAreaBackground;
 else color = this.normalMsgAreaBackground;
this.messageLabel.setBackground (color);
this.messageImageLabel.setBackground (color);
this.bottomFillerLabel.setBackground (color);
this.leftFillerLabel.setBackground (color);
}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineMethod (c$, "resetWorkAreaAttachments", 
($fz = function (top) {
var childData =  new $wt.layout.FormData ();
childData.top =  new $wt.layout.FormAttachment (top);
childData.right =  new $wt.layout.FormAttachment (100, 0);
childData.left =  new $wt.layout.FormAttachment (0, 0);
childData.bottom =  new $wt.layout.FormAttachment (100, 0);
this.workArea.setLayoutData (childData);
}, $fz.isPrivate = true, $fz), "$wt.widgets.Control");
c$.DLG_IMG_TITLE_ERROR = c$.prototype.DLG_IMG_TITLE_ERROR = "dialog_message_error_image";
Clazz.defineStatics (c$,
"DLG_IMG_TITLE_BANNER", "dialog_title_banner_image",
"INFO_MESSAGE", "INFO_MESSAGE",
"WARNING_MESSAGE", "WARNING_MESSAGE",
"H_GAP_IMAGE", 5,
"MIN_DIALOG_WIDTH", 350,
"MIN_DIALOG_HEIGHT", 150);
{
var reg = org.eclipse.jface.resource.JFaceResources.getImageRegistry ();
reg.put ("dialog_title_banner_image", org.eclipse.jface.resource.ImageDescriptor.createFromFile (org.eclipse.jface.dialogs.TitleAreaDialog, "images/title_banner.gif"));
}});
