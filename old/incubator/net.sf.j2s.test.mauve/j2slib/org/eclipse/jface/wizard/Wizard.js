Clazz.declarePackage ("org.eclipse.jface.wizard");
Clazz.load (["org.eclipse.jface.wizard.IWizard", "java.util.ArrayList", "org.eclipse.jface.resource.JFaceResources"], "org.eclipse.jface.wizard.Wizard", ["org.eclipse.jface.resource.ImageDescriptor", "org.eclipse.jface.util.Assert"], function () {
c$ = Clazz.decorateAsClass (function () {
this.container = null;
this.pages = null;
this.$needsProgressMonitor = false;
this.forcePreviousAndNextButtons = false;
this.$isHelpAvailable = false;
this.defaultImage = null;
this.defaultImageDescriptor = null;
this.titleBarColor = null;
this.windowTitle = null;
this.dialogSettings = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.wizard, "Wizard", null, org.eclipse.jface.wizard.IWizard);
Clazz.prepareFields (c$, function () {
this.pages =  new java.util.ArrayList ();
this.defaultImageDescriptor = org.eclipse.jface.resource.JFaceResources.getImageRegistry ().getDescriptor ("org.eclipse.jface.wizard.Wizard.pageImage");
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "addPage", 
function (page) {
this.pages.add (page);
page.setWizard (this);
}, "org.eclipse.jface.wizard.IWizardPage");
Clazz.overrideMethod (c$, "addPages", 
function () {
});
Clazz.overrideMethod (c$, "canFinish", 
function () {
for (var i = 0; i < this.pages.size (); i++) {
if (!(this.pages.get (i)).isPageComplete ()) return false;
}
return true;
});
Clazz.overrideMethod (c$, "createPageControls", 
function (pageContainer) {
for (var i = 0; i < this.pages.size (); i++) {
var page = this.pages.get (i);
page.createControl (pageContainer);
org.eclipse.jface.util.Assert.isNotNull (page.getControl ());
}
}, "$wt.widgets.Composite");
Clazz.overrideMethod (c$, "dispose", 
function () {
for (var i = 0; i < this.pages.size (); i++) {
(this.pages.get (i)).dispose ();
}
if (this.defaultImage != null) {
org.eclipse.jface.resource.JFaceResources.getResources ().destroyImage (this.defaultImageDescriptor);
this.defaultImage = null;
}});
Clazz.overrideMethod (c$, "getContainer", 
function () {
return this.container;
});
Clazz.overrideMethod (c$, "getDefaultPageImage", 
function () {
if (this.defaultImage == null) {
this.defaultImage = org.eclipse.jface.resource.JFaceResources.getResources ().createImageWithDefault (this.defaultImageDescriptor);
}return this.defaultImage;
});
Clazz.overrideMethod (c$, "getDialogSettings", 
function () {
return this.dialogSettings;
});
Clazz.overrideMethod (c$, "getNextPage", 
function (page) {
var index = this.pages.indexOf (page);
if (index == this.pages.size () - 1 || index == -1) return null;
return this.pages.get (index + 1);
}, "org.eclipse.jface.wizard.IWizardPage");
Clazz.overrideMethod (c$, "getPage", 
function (name) {
for (var i = 0; i < this.pages.size (); i++) {
var page = this.pages.get (i);
var pageName = page.getName ();
if (pageName.equals (name)) return page;
}
return null;
}, "~S");
Clazz.overrideMethod (c$, "getPageCount", 
function () {
return this.pages.size ();
});
Clazz.overrideMethod (c$, "getPages", 
function () {
return this.pages.toArray ( new Array (this.pages.size ()));
});
Clazz.overrideMethod (c$, "getPreviousPage", 
function (page) {
var index = this.pages.indexOf (page);
if (index == 0 || index == -1) return null;
 else return this.pages.get (index - 1);
}, "org.eclipse.jface.wizard.IWizardPage");
Clazz.defineMethod (c$, "getShell", 
function () {
if (this.container == null) return null;
return this.container.getShell ();
});
Clazz.overrideMethod (c$, "getStartingPage", 
function () {
if (this.pages.size () == 0) return null;
return this.pages.get (0);
});
Clazz.overrideMethod (c$, "getTitleBarColor", 
function () {
return this.titleBarColor;
});
Clazz.overrideMethod (c$, "getWindowTitle", 
function () {
return this.windowTitle;
});
Clazz.overrideMethod (c$, "isHelpAvailable", 
function () {
return this.$isHelpAvailable;
});
Clazz.overrideMethod (c$, "needsPreviousAndNextButtons", 
function () {
return this.forcePreviousAndNextButtons || this.pages.size () > 1;
});
Clazz.overrideMethod (c$, "needsProgressMonitor", 
function () {
return this.$needsProgressMonitor;
});
Clazz.overrideMethod (c$, "performCancel", 
function () {
return true;
});
Clazz.overrideMethod (c$, "setContainer", 
function (wizardContainer) {
this.container = wizardContainer;
}, "org.eclipse.jface.wizard.IWizardContainer");
Clazz.defineMethod (c$, "setDefaultPageImageDescriptor", 
function (imageDescriptor) {
this.defaultImageDescriptor = imageDescriptor;
}, "org.eclipse.jface.resource.ImageDescriptor");
Clazz.defineMethod (c$, "setDialogSettings", 
function (settings) {
this.dialogSettings = settings;
}, "org.eclipse.jface.dialogs.IDialogSettings");
Clazz.defineMethod (c$, "setForcePreviousAndNextButtons", 
function (b) {
this.forcePreviousAndNextButtons = b;
}, "~B");
Clazz.defineMethod (c$, "setHelpAvailable", 
function (b) {
this.$isHelpAvailable = b;
}, "~B");
Clazz.defineMethod (c$, "setNeedsProgressMonitor", 
function (b) {
this.$needsProgressMonitor = b;
}, "~B");
Clazz.defineMethod (c$, "setTitleBarColor", 
function (color) {
this.titleBarColor = color;
}, "$wt.graphics.RGB");
Clazz.defineMethod (c$, "setWindowTitle", 
function (newTitle) {
this.windowTitle = newTitle;
if (this.container != null) this.container.updateWindowTitle ();
}, "~S");
Clazz.defineStatics (c$,
"DEFAULT_IMAGE", "org.eclipse.jface.wizard.Wizard.pageImage");
{
org.eclipse.jface.resource.JFaceResources.getImageRegistry ().put ("org.eclipse.jface.wizard.Wizard.pageImage", org.eclipse.jface.resource.ImageDescriptor.createFromFile (org.eclipse.jface.wizard.Wizard, "images/page.gif"));
}});
