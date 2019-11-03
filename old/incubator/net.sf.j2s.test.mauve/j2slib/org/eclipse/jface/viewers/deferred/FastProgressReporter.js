Clazz.declarePackage ("org.eclipse.jface.viewers.deferred");
c$ = Clazz.decorateAsClass (function () {
this.monitor = null;
this.canceled = false;
this.cancelCheck = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers.deferred, "FastProgressReporter");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (monitor, totalProgress) {
this.monitor = monitor;
this.canceled = monitor.isCanceled ();
}, "org.eclipse.core.runtime.IProgressMonitor,~N");
Clazz.defineMethod (c$, "isCanceled", 
function () {
if (this.monitor == null) {
return this.canceled;
}this.cancelCheck++;
if (this.cancelCheck > org.eclipse.jface.viewers.deferred.FastProgressReporter.CANCEL_CHECK_PERIOD) {
this.canceled = this.monitor.isCanceled ();
this.cancelCheck = 0;
}return this.canceled;
});
Clazz.defineMethod (c$, "cancel", 
function () {
this.canceled = true;
if (this.monitor == null) {
return ;
}this.monitor.setCanceled (true);
});
Clazz.defineStatics (c$,
"CANCEL_CHECK_PERIOD", 40);
