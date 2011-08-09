Clazz.declarePackage ("org.eclipse.jface.action");
Clazz.load (["org.eclipse.jface.action.IStatusLineManager", "$.SubContributionManager"], "org.eclipse.jface.action.SubStatusLineManager", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.message = null;
this.errorMessage = null;
this.messageImage = null;
this.errorImage = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.action, "SubStatusLineManager", org.eclipse.jface.action.SubContributionManager, org.eclipse.jface.action.IStatusLineManager);
Clazz.defineMethod (c$, "getParentStatusLineManager", 
function () {
return this.getParent ();
});
Clazz.defineMethod (c$, "getProgressMonitor", 
function () {
return this.getParentStatusLineManager ().getProgressMonitor ();
});
Clazz.defineMethod (c$, "isCancelEnabled", 
function () {
return this.getParentStatusLineManager ().isCancelEnabled ();
});
Clazz.defineMethod (c$, "setCancelEnabled", 
function (enabled) {
this.getParentStatusLineManager ().setCancelEnabled (enabled);
}, "~B");
Clazz.defineMethod (c$, "setErrorMessage", 
function (message) {
this.errorImage = null;
this.errorMessage = message;
if (this.isVisible ()) this.getParentStatusLineManager ().setErrorMessage (this.errorMessage);
}, "~S");
Clazz.defineMethod (c$, "setErrorMessage", 
function (image, message) {
this.errorImage = image;
this.errorMessage = message;
if (this.isVisible ()) this.getParentStatusLineManager ().setErrorMessage (this.errorImage, this.errorMessage);
}, "$wt.graphics.Image,~S");
Clazz.defineMethod (c$, "setMessage", 
function (message) {
this.messageImage = null;
this.message = message;
if (this.isVisible ()) this.getParentStatusLineManager ().setMessage (message);
}, "~S");
Clazz.defineMethod (c$, "setMessage", 
function (image, message) {
this.messageImage = image;
this.message = message;
if (this.isVisible ()) this.getParentStatusLineManager ().setMessage (this.messageImage, message);
}, "$wt.graphics.Image,~S");
Clazz.defineMethod (c$, "setVisible", 
function (visible) {
Clazz.superCall (this, org.eclipse.jface.action.SubStatusLineManager, "setVisible", [visible]);
if (visible) {
this.getParentStatusLineManager ().setErrorMessage (this.errorImage, this.errorMessage);
this.getParentStatusLineManager ().setMessage (this.messageImage, this.message);
} else {
this.getParentStatusLineManager ().setMessage (null, null);
this.getParentStatusLineManager ().setErrorMessage (null, null);
}}, "~B");
Clazz.defineMethod (c$, "update", 
function (force) {
this.getParentStatusLineManager ().update (force);
}, "~B");
});
