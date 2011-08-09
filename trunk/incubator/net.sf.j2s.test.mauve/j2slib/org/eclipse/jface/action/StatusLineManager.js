Clazz.declarePackage ("org.eclipse.jface.action");
Clazz.load (["org.eclipse.jface.action.ContributionManager", "$.IStatusLineManager"], "org.eclipse.jface.action.StatusLineManager", ["org.eclipse.core.runtime.IProgressMonitorWithBlocking", "org.eclipse.jface.action.GroupMarker", "$.StatusLine"], function () {
c$ = Clazz.decorateAsClass (function () {
this.statusLine = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.action, "StatusLineManager", org.eclipse.jface.action.ContributionManager, org.eclipse.jface.action.IStatusLineManager);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.jface.action.StatusLineManager, []);
this.add ( new org.eclipse.jface.action.GroupMarker ("BEGIN_GROUP"));
this.add ( new org.eclipse.jface.action.GroupMarker ("MIDDLE_GROUP"));
this.add ( new org.eclipse.jface.action.GroupMarker ("END_GROUP"));
});
Clazz.defineMethod (c$, "createControl", 
function (parent) {
return this.createControl (parent, 0);
}, "$wt.widgets.Composite");
Clazz.defineMethod (c$, "createControl", 
function (parent, style) {
if (!this.statusLineExist () && parent != null) {
this.statusLine =  new org.eclipse.jface.action.StatusLine (parent, style);
this.update (false);
}return this.statusLine;
}, "$wt.widgets.Composite,~N");
Clazz.defineMethod (c$, "dispose", 
function () {
if (this.statusLineExist ()) this.statusLine.dispose ();
this.statusLine = null;
var items = this.getItems ();
for (var i = 0; i < items.length; i++) {
items[i].dispose ();
}
});
Clazz.defineMethod (c$, "getControl", 
function () {
return this.statusLine;
});
Clazz.defineMethod (c$, "getProgressMonitorDelegate", 
function () {
return this.getControl ();
});
Clazz.overrideMethod (c$, "getProgressMonitor", 
function () {
return (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.jface.action.StatusLineManager$1")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.progressDelegate = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.action, "StatusLineManager$1", null, org.eclipse.core.runtime.IProgressMonitorWithBlocking);
Clazz.prepareFields (c$, function () {
this.progressDelegate = this.b$["org.eclipse.jface.action.StatusLineManager"].getProgressMonitorDelegate ();
});
Clazz.defineMethod (c$, "beginTask", 
function (name, totalWork) {
this.progressDelegate.beginTask (name, totalWork);
}, "~S,~N");
Clazz.defineMethod (c$, "done", 
function () {
this.progressDelegate.done ();
});
Clazz.defineMethod (c$, "internalWorked", 
function (work) {
this.progressDelegate.internalWorked (work);
}, "~N");
Clazz.defineMethod (c$, "isCanceled", 
function () {
return this.progressDelegate.isCanceled ();
});
Clazz.defineMethod (c$, "setCanceled", 
function (value) {
if (this.b$["org.eclipse.jface.action.StatusLineManager"].statusLine.isDisposed ()) return ;
this.progressDelegate.setCanceled (value);
}, "~B");
Clazz.defineMethod (c$, "setTaskName", 
function (name) {
this.progressDelegate.setTaskName (name);
}, "~S");
Clazz.defineMethod (c$, "subTask", 
function (name) {
this.progressDelegate.subTask (name);
}, "~S");
Clazz.defineMethod (c$, "worked", 
function (work) {
this.progressDelegate.worked (work);
}, "~N");
Clazz.overrideMethod (c$, "clearBlocked", 
function () {
});
Clazz.overrideMethod (c$, "setBlocked", 
function (reason) {
}, "org.eclipse.core.runtime.IStatus");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.jface.action.StatusLineManager$1, i$, v$);
}) (this, null);
});
Clazz.overrideMethod (c$, "isCancelEnabled", 
function () {
return this.statusLineExist () && (this.statusLine).isCancelEnabled ();
});
Clazz.overrideMethod (c$, "setCancelEnabled", 
function (enabled) {
if (this.statusLineExist ()) (this.statusLine).setCancelEnabled (enabled);
}, "~B");
Clazz.defineMethod (c$, "setErrorMessage", 
function (message) {
if (this.statusLineExist ()) (this.statusLine).setErrorMessage (message);
}, "~S");
Clazz.defineMethod (c$, "setErrorMessage", 
function (image, message) {
if (this.statusLineExist ()) (this.statusLine).setErrorMessage (image, message);
}, "$wt.graphics.Image,~S");
Clazz.defineMethod (c$, "setMessage", 
function (message) {
if (this.statusLineExist ()) (this.statusLine).setMessage (message);
}, "~S");
Clazz.defineMethod (c$, "setMessage", 
function (image, message) {
if (this.statusLineExist ()) (this.statusLine).setMessage (image, message);
}, "$wt.graphics.Image,~S");
Clazz.defineMethod (c$, "statusLineExist", 
($fz = function () {
return this.statusLine != null && !this.statusLine.isDisposed ();
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "update", 
function (force) {
if (this.isDirty () || force) {
if (this.statusLineExist ()) {
this.statusLine.setRedraw (false);
var ws = this.statusLine.getChildren ();
for (var i = 0; i < ws.length; i++) {
var w = ws[i];
var data = w.getData ();
if (Clazz.instanceOf (data, org.eclipse.jface.action.IContributionItem)) {
w.dispose ();
}}
var oldChildCount = this.statusLine.getChildren ().length;
var items = this.getItems ();
for (var i = 0; i < items.length; ++i) {
var ci = items[i];
if (ci.isVisible ()) {
ci.fill (this.statusLine);
var newChildren = this.statusLine.getChildren ();
for (var j = oldChildCount; j < newChildren.length; j++) {
newChildren[j].setData (ci);
}
oldChildCount = newChildren.length;
}}
this.setDirty (false);
this.statusLine.layout ();
this.statusLine.setRedraw (true);
}}}, "~B");
Clazz.defineStatics (c$,
"BEGIN_GROUP", "BEGIN_GROUP",
"MIDDLE_GROUP", "MIDDLE_GROUP",
"END_GROUP", "END_GROUP");
});
