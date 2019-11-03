Clazz.declarePackage ("org.eclipse.core.internal.jobs");
Clazz.load (["java.lang.Thread"], "org.eclipse.core.internal.jobs.Worker", ["java.lang.NullPointerException", "org.eclipse.core.internal.runtime.InternalPlatform", "$.Messages", "org.eclipse.core.runtime.Status", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$currentJob = null;
this.pool = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.jobs, "Worker", Thread);
Clazz.makeConstructor (c$, 
function (pool) {
Clazz.superConstructor (this, org.eclipse.core.internal.jobs.Worker, ["Worker-" + ($t$ = org.eclipse.core.internal.jobs.Worker.nextWorkerNumber ++, org.eclipse.core.internal.jobs.Worker.prototype.nextWorkerNumber = org.eclipse.core.internal.jobs.Worker.nextWorkerNumber, $t$)]);
this.pool = pool;
this.setContextClassLoader (pool.defaultContextLoader);
}, "org.eclipse.core.internal.jobs.WorkerPool");
Clazz.defineMethod (c$, "currentJob", 
function () {
return this.$currentJob;
});
Clazz.defineMethod (c$, "handleException", 
($fz = function (job, t) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.jobs_internalError, job.getName ());
return  new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 2, message, t);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.jobs.InternalJob,Throwable");
Clazz.defineMethod (c$, "log", 
($fz = function (result) {
try {
var platform = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ();
if (platform.isRunning ()) {
platform.log (result);
return ;
}} catch (e) {
if (Clazz.instanceOf (e, RuntimeException)) {
} else {
throw e;
}
}
var t = result.getException ();
if (t != null) t.printStackTrace ();
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.IStatus");
Clazz.overrideMethod (c$, "run", 
function () {
this.setPriority (5);
try {
while ((this.$currentJob = this.pool.startJob (this)) != null) {
if (this.$currentJob == null) return ;
this.$currentJob.setThread (this);
var result = org.eclipse.core.runtime.Status.OK_STATUS;
try {
result = this.$currentJob.run (this.$currentJob.getProgressMonitor ());
} catch (e$$) {
if (Clazz.instanceOf (e$$, org.eclipse.core.runtime.OperationCanceledException)) {
var e = e$$;
{
result = org.eclipse.core.runtime.Status.CANCEL_STATUS;
}
} else if (Clazz.instanceOf (e$$, Exception)) {
var e = e$$;
{
result = this.handleException (this.$currentJob, e);
}
} else if (Clazz.instanceOf (e$$, ThreadDeath)) {
var e = e$$;
{
throw e;
}
} else if (Clazz.instanceOf (e$$, Error)) {
var e = e$$;
{
result = this.handleException (this.$currentJob, e);
}
} else {
throw e$$;
}
} finally {
Thread.interrupted ();
if (result == null) result = this.handleException (this.$currentJob,  new NullPointerException ());
this.pool.endJob (this.$currentJob, result);
if ((result.getSeverity () & (6)) != 0) this.log (result);
this.$currentJob = null;
}
}
} catch (t) {
if (Clazz.instanceOf (t, Throwable)) {
t.printStackTrace ();
} else {
throw t;
}
} finally {
this.$currentJob = null;
this.pool.endWorker (this);
}
});
Clazz.defineStatics (c$,
"nextWorkerNumber", 0);
});
