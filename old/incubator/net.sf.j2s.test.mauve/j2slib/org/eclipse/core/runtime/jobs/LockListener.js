Clazz.declarePackage ("org.eclipse.core.runtime.jobs");
Clazz.load (["org.eclipse.core.internal.runtime.InternalPlatform"], "org.eclipse.core.runtime.jobs.LockListener", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.manager = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.jobs, "LockListener");
Clazz.prepareFields (c$, function () {
this.manager = (org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getJobManager ()).getLockManager ();
});
Clazz.defineMethod (c$, "aboutToWait", 
function (lockOwner) {
return false;
}, "Thread");
Clazz.defineMethod (c$, "aboutToRelease", 
function () {
});
Clazz.defineMethod (c$, "isLockOwnerThread", 
function () {
return this.manager.isLockOwner ();
});
});
