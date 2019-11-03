Clazz.declarePackage ("org.eclipse.core.runtime");
Clazz.load (["org.eclipse.core.runtime.IProgressMonitor", "$.IProgressMonitorWithBlocking"], "org.eclipse.core.runtime.ProgressMonitorWrapper", ["org.eclipse.core.internal.runtime.Assert"], function () {
c$ = Clazz.decorateAsClass (function () {
this.progressMonitor = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime, "ProgressMonitorWrapper", null, [org.eclipse.core.runtime.IProgressMonitor, org.eclipse.core.runtime.IProgressMonitorWithBlocking]);
Clazz.makeConstructor (c$, 
function (monitor) {
org.eclipse.core.internal.runtime.Assert.isNotNull (monitor);
this.progressMonitor = monitor;
}, "org.eclipse.core.runtime.IProgressMonitor");
Clazz.defineMethod (c$, "beginTask", 
function (name, totalWork) {
this.progressMonitor.beginTask (name, totalWork);
}, "~S,~N");
Clazz.defineMethod (c$, "clearBlocked", 
function () {
if (Clazz.instanceOf (this.progressMonitor, org.eclipse.core.runtime.IProgressMonitorWithBlocking)) (this.progressMonitor).clearBlocked ();
});
Clazz.defineMethod (c$, "done", 
function () {
this.progressMonitor.done ();
});
Clazz.defineMethod (c$, "getWrappedProgressMonitor", 
function () {
return this.progressMonitor;
});
Clazz.defineMethod (c$, "internalWorked", 
function (work) {
this.progressMonitor.internalWorked (work);
}, "~N");
Clazz.defineMethod (c$, "isCanceled", 
function () {
return this.progressMonitor.isCanceled ();
});
Clazz.defineMethod (c$, "setBlocked", 
function (reason) {
if (Clazz.instanceOf (this.progressMonitor, org.eclipse.core.runtime.IProgressMonitorWithBlocking)) (this.progressMonitor).setBlocked (reason);
}, "org.eclipse.core.runtime.IStatus");
Clazz.defineMethod (c$, "setCanceled", 
function (b) {
this.progressMonitor.setCanceled (b);
}, "~B");
Clazz.defineMethod (c$, "setTaskName", 
function (name) {
this.progressMonitor.setTaskName (name);
}, "~S");
Clazz.defineMethod (c$, "subTask", 
function (name) {
this.progressMonitor.subTask (name);
}, "~S");
Clazz.defineMethod (c$, "worked", 
function (work) {
this.progressMonitor.worked (work);
}, "~N");
});
