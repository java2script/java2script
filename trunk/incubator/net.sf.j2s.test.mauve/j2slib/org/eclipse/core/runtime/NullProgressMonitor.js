Clazz.declarePackage ("org.eclipse.core.runtime");
Clazz.load (["org.eclipse.core.runtime.IProgressMonitor"], "org.eclipse.core.runtime.NullProgressMonitor", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.cancelled = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime, "NullProgressMonitor", null, org.eclipse.core.runtime.IProgressMonitor);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "beginTask", 
function (name, totalWork) {
}, "~S,~N");
Clazz.overrideMethod (c$, "done", 
function () {
});
Clazz.overrideMethod (c$, "internalWorked", 
function (work) {
}, "~N");
Clazz.overrideMethod (c$, "isCanceled", 
function () {
return this.cancelled;
});
Clazz.overrideMethod (c$, "setCanceled", 
function (cancelled) {
this.cancelled = cancelled;
}, "~B");
Clazz.overrideMethod (c$, "setTaskName", 
function (name) {
}, "~S");
Clazz.overrideMethod (c$, "subTask", 
function (name) {
}, "~S");
Clazz.overrideMethod (c$, "worked", 
function (work) {
}, "~N");
});
