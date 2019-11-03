Clazz.declarePackage ("org.eclipse.core.internal.jobs");
Clazz.load (null, "org.eclipse.core.internal.jobs.WorkerPool", ["java.lang.Thread", "org.eclipse.core.internal.jobs.JobManager", "$.Worker", "org.eclipse.core.internal.runtime.Assert"], function () {
c$ = Clazz.decorateAsClass (function () {
this.busyThreads = 0;
this.defaultContextLoader = null;
this.manager = null;
this.numThreads = 0;
this.sleepingThreads = 0;
this.threads = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.jobs, "WorkerPool");
Clazz.prepareFields (c$, function () {
this.threads =  new Array (10);
});
Clazz.makeConstructor (c$, 
function (manager) {
this.manager = manager;
this.defaultContextLoader = Thread.currentThread ().getContextClassLoader ();
}, "org.eclipse.core.internal.jobs.JobManager");
Clazz.defineMethod (c$, "add", 
($fz = function (worker) {
var size = this.threads.length;
if (this.numThreads + 1 > size) {
var newThreads =  new Array (2 * size);
System.arraycopy (this.threads, 0, newThreads, 0, size);
this.threads = newThreads;
}this.threads[this.numThreads++] = worker;
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.jobs.Worker");
Clazz.defineMethod (c$, "decrementBusyThreads", 
($fz = function () {
if (--this.busyThreads < 0) {
if (org.eclipse.core.internal.jobs.JobManager.DEBUG) org.eclipse.core.internal.runtime.Assert.isTrue (false, Integer.toString (this.busyThreads));
this.busyThreads = 0;
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "endJob", 
function (job, result) {
this.decrementBusyThreads ();
if ((job.getRule () != null) && !(Clazz.instanceOf (job, org.eclipse.core.internal.jobs.ThreadJob))) {
this.manager.getLockManager ().removeLockCompletely (Thread.currentThread (), job.getRule ());
}this.manager.endJob (job, result, true);
this.manager.implicitJobs.endJob (job);
}, "org.eclipse.core.internal.jobs.InternalJob,org.eclipse.core.runtime.IStatus");
Clazz.defineMethod (c$, "endWorker", 
function (worker) {
if (this.remove (worker) && org.eclipse.core.internal.jobs.JobManager.DEBUG) org.eclipse.core.internal.jobs.JobManager.debug ("worker removed from pool: " + worker);
}, "org.eclipse.core.internal.jobs.Worker");
Clazz.defineMethod (c$, "incrementBusyThreads", 
($fz = function () {
if (++this.busyThreads > this.numThreads) {
if (org.eclipse.core.internal.jobs.JobManager.DEBUG) org.eclipse.core.internal.runtime.Assert.isTrue (false, Integer.toString (this.busyThreads) + ',' + this.numThreads);
this.busyThreads = this.numThreads;
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "jobQueued", 
function (job) {
if (this.sleepingThreads > 0) {
this.notify ();
return ;
}if (this.busyThreads >= this.numThreads) {
var worker =  new org.eclipse.core.internal.jobs.Worker (this);
this.add (worker);
if (org.eclipse.core.internal.jobs.JobManager.DEBUG) org.eclipse.core.internal.jobs.JobManager.debug ("worker added to pool: " + worker);
worker.start ();
return ;
}}, "org.eclipse.core.internal.jobs.InternalJob");
Clazz.defineMethod (c$, "remove", 
($fz = function (worker) {
for (var i = 0; i < this.threads.length; i++) {
if (this.threads[i] === worker) {
System.arraycopy (this.threads, i + 1, this.threads, i, this.numThreads - i - 1);
this.threads[--this.numThreads] = null;
return true;
}}
return false;
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.jobs.Worker");
Clazz.defineMethod (c$, "shutdown", 
function () {
this.notifyAll ();
});
Clazz.defineMethod (c$, "sleep", 
($fz = function (duration) {
this.sleepingThreads++;
this.busyThreads--;
if (org.eclipse.core.internal.jobs.JobManager.DEBUG) org.eclipse.core.internal.jobs.JobManager.debug ("worker sleeping for: " + duration + "ms");
try {
this.wait (duration);
} catch (e) {
if (Clazz.instanceOf (e, InterruptedException)) {
if (org.eclipse.core.internal.jobs.JobManager.DEBUG) org.eclipse.core.internal.jobs.JobManager.debug ("worker interrupted while waiting... :-|");
} else {
throw e;
}
} finally {
this.sleepingThreads--;
this.busyThreads++;
}
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "startJob", 
function (worker) {
{
if (!this.manager.isActive ()) {
this.endWorker (worker);
return null;
}this.incrementBusyThreads ();
}var job = null;
try {
job = this.manager.startJob ();
var idleStart = System.currentTimeMillis ();
while (this.manager.isActive () && job == null) {
var hint = this.manager.sleepHint ();
if (hint > 0) this.sleep (Math.min (hint, 60000));
job = this.manager.startJob ();
{
if (job == null && (System.currentTimeMillis () - idleStart > 60000) && (this.numThreads - this.busyThreads) > 1) {
this.endWorker (worker);
return null;
}}}
if (job != null) {
if ((job.getRule () != null) && !(Clazz.instanceOf (job, org.eclipse.core.internal.jobs.ThreadJob))) {
this.manager.getLockManager ().addLockThread (Thread.currentThread (), job.getRule ());
}if (this.manager.sleepHint () <= 0) this.jobQueued (null);
}} finally {
if (job == null) this.decrementBusyThreads ();
}
return job;
}, "org.eclipse.core.internal.jobs.Worker");
Clazz.defineStatics (c$,
"BEST_BEFORE", 60000,
"MIN_THREADS", 1);
});
