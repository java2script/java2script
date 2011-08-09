Clazz.declarePackage ("org.eclipse.jface.dialogs");
Clazz.load (null, "org.eclipse.jface.dialogs.DialogMessageArea", ["org.eclipse.jface.dialogs.Dialog", "org.eclipse.jface.resource.JFaceResources", "$wt.custom.CLabel", "$wt.layout.GridData", "$.GridLayout", "$wt.widgets.Composite", "$.Label", "$.Text"], function () {
c$ = Clazz.decorateAsClass (function () {
this.messageText = null;
this.messageImageLabel = null;
this.messageComposite = null;
this.lastMessageText = null;
this.lastMessageType = 0;
this.titleLabel = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.dialogs, "DialogMessageArea");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "createContents", 
function (parent) {
this.titleLabel =  new $wt.custom.CLabel (parent, 0);
this.titleLabel.setFont (org.eclipse.jface.resource.JFaceResources.getBannerFont ());
this.messageComposite =  new $wt.widgets.Composite (parent, 0);
var messageLayout =  new $wt.layout.GridLayout ();
messageLayout.numColumns = 2;
messageLayout.marginWidth = 0;
messageLayout.marginHeight = 0;
messageLayout.makeColumnsEqualWidth = false;
this.messageComposite.setLayout (messageLayout);
this.messageImageLabel =  new $wt.widgets.Label (this.messageComposite, 0);
this.messageImageLabel.setImage (org.eclipse.jface.resource.JFaceResources.getImage ("dialog_messasge_info_image"));
this.messageImageLabel.setLayoutData ( new $wt.layout.GridData (4));
this.messageText =  new $wt.widgets.Text (this.messageComposite, 0);
this.messageText.setEditable (false);
var textData =  new $wt.layout.GridData (772);
this.messageText.setLayoutData (textData);
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "setTitleLayoutData", 
function (layoutData) {
this.titleLabel.setLayoutData (layoutData);
}, "~O");
Clazz.defineMethod (c$, "setMessageLayoutData", 
function (layoutData) {
this.messageComposite.setLayoutData (layoutData);
}, "~O");
Clazz.defineMethod (c$, "showTitle", 
function (titleMessage, titleImage) {
this.titleLabel.setImage (titleImage);
this.titleLabel.setText (titleMessage);
this.restoreTitle ();
return ;
}, "~S,$wt.graphics.Image");
Clazz.defineMethod (c$, "restoreTitle", 
function () {
this.titleLabel.setVisible (true);
this.messageComposite.setVisible (false);
this.lastMessageText = null;
this.lastMessageType = 0;
});
Clazz.defineMethod (c$, "updateText", 
function (newMessage, newType) {
var newImage = null;
switch (newType) {
case 0:
if (newMessage == null) this.restoreTitle ();
 else this.showTitle (newMessage, null);
return ;
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
this.messageComposite.setVisible (true);
this.titleLabel.setVisible (false);
if (newMessage.equals (this.messageText.getText ()) && newImage === this.messageImageLabel.getImage ()) return ;
this.messageImageLabel.setImage (newImage);
this.messageText.setText (org.eclipse.jface.dialogs.Dialog.shortenText (newMessage, this.messageText));
this.lastMessageText = newMessage;
}, "~S,~N");
Clazz.defineMethod (c$, "clearErrorMessage", 
function () {
if (this.lastMessageText == null) this.restoreTitle ();
 else this.updateText (this.lastMessageText, this.lastMessageType);
});
});
