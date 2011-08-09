Clazz.declarePackage ("org.eclipse.jface.wizard");
Clazz.load (["org.eclipse.jface.dialogs.DialogPage", "org.eclipse.jface.wizard.IWizardPage"], "org.eclipse.jface.wizard.WizardPage", ["org.eclipse.jface.util.Assert"], function () {
c$ = Clazz.decorateAsClass (function () {
this.name = null;
this.wizard = null;
this.$isPageComplete = true;
this.previousPage = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.wizard, "WizardPage", org.eclipse.jface.dialogs.DialogPage, org.eclipse.jface.wizard.IWizardPage);
Clazz.makeConstructor (c$, 
function (pageName) {
this.construct (pageName, null, Clazz.castNullAs ("org.eclipse.jface.resource.ImageDescriptor"));
}, "~S");
Clazz.makeConstructor (c$, 
function (pageName, title, titleImage) {
Clazz.superConstructor (this, org.eclipse.jface.wizard.WizardPage, [title, titleImage]);
org.eclipse.jface.util.Assert.isNotNull (pageName);
this.name = pageName;
}, "~S,~S,org.eclipse.jface.resource.ImageDescriptor");
Clazz.overrideMethod (c$, "canFlipToNextPage", 
function () {
return this.isPageComplete () && this.getNextPage () != null;
});
Clazz.defineMethod (c$, "getContainer", 
function () {
if (this.wizard == null) return null;
return this.wizard.getContainer ();
});
Clazz.defineMethod (c$, "getDialogSettings", 
function () {
if (this.wizard == null) return null;
return this.wizard.getDialogSettings ();
});
Clazz.overrideMethod (c$, "getImage", 
function () {
var result = Clazz.superCall (this, org.eclipse.jface.wizard.WizardPage, "getImage", []);
if (result == null && this.wizard != null) return this.wizard.getDefaultPageImage ();
return result;
});
Clazz.overrideMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.overrideMethod (c$, "getNextPage", 
function () {
if (this.wizard == null) return null;
return this.wizard.getNextPage (this);
});
Clazz.overrideMethod (c$, "getPreviousPage", 
function () {
if (this.previousPage != null) return this.previousPage;
if (this.wizard == null) return null;
return this.wizard.getPreviousPage (this);
});
Clazz.overrideMethod (c$, "getShell", 
function () {
var container = this.getContainer ();
if (container == null) return null;
return container.getShell ();
});
Clazz.overrideMethod (c$, "getWizard", 
function () {
return this.wizard;
});
Clazz.defineMethod (c$, "isCurrentPage", 
function () {
return (this.getContainer () != null && this === this.getContainer ().getCurrentPage ());
});
Clazz.overrideMethod (c$, "isPageComplete", 
function () {
return this.$isPageComplete;
});
Clazz.overrideMethod (c$, "setDescription", 
function (description) {
Clazz.superCall (this, org.eclipse.jface.wizard.WizardPage, "setDescription", [description]);
if (this.isCurrentPage ()) this.getContainer ().updateTitleBar ();
}, "~S");
Clazz.defineMethod (c$, "setErrorMessage", 
function (newMessage) {
Clazz.superCall (this, org.eclipse.jface.wizard.WizardPage, "setErrorMessage", [newMessage]);
if (this.isCurrentPage ()) {
this.getContainer ().updateMessage ();
}}, "~S");
Clazz.overrideMethod (c$, "setImageDescriptor", 
function (image) {
Clazz.superCall (this, org.eclipse.jface.wizard.WizardPage, "setImageDescriptor", [image]);
if (this.isCurrentPage ()) this.getContainer ().updateTitleBar ();
}, "org.eclipse.jface.resource.ImageDescriptor");
Clazz.defineMethod (c$, "setMessage", 
function (newMessage, newType) {
Clazz.superCall (this, org.eclipse.jface.wizard.WizardPage, "setMessage", [newMessage, newType]);
if (this.isCurrentPage ()) this.getContainer ().updateMessage ();
}, "~S,~N");
Clazz.defineMethod (c$, "setPageComplete", 
function (complete) {
this.$isPageComplete = complete;
if (this.isCurrentPage ()) this.getContainer ().updateButtons ();
}, "~B");
Clazz.overrideMethod (c$, "setPreviousPage", 
function (page) {
this.previousPage = page;
}, "org.eclipse.jface.wizard.IWizardPage");
Clazz.overrideMethod (c$, "setTitle", 
function (title) {
Clazz.superCall (this, org.eclipse.jface.wizard.WizardPage, "setTitle", [title]);
if (this.isCurrentPage ()) {
this.getContainer ().updateTitleBar ();
}}, "~S");
Clazz.overrideMethod (c$, "setWizard", 
function (newWizard) {
this.wizard = newWizard;
}, "org.eclipse.jface.wizard.IWizard");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.name;
});
});
