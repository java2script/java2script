Clazz.declarePackage ("org.eclipse.core.internal.jobs");
Clazz.load (["java.util.HashMap", "$.HashSet"], "org.eclipse.core.internal.jobs.ImplicitJobs", ["java.lang.Thread", "org.eclipse.core.internal.jobs.JobManager", "$.ThreadJob", "org.eclipse.core.internal.runtime.Assert", "$.InternalPlatform", "org.eclipse.core.runtime.Status"], function () {
c$ = Clazz.decorateAsClass (function () {
this.jobCache = null;
this.manager = null;
this.suspendedRules = null;
this.threadJobs = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.jobs, "ImplicitJobs");
Clazz.prepareFields (c$, function () {
this.suspendedRules =  new java.util.HashSet (20);
this.threadJobs =  new java.util.HashMap (20);
});
Clazz.makeConstructor (c$, 
function (manager) {
this.manager = manager;
}, "org.eclipse.core.internal.jobs.JobManager");
Clazz.defineMethod (c$, "begin", 
function (rule, monitor, suspend) {
if (org.eclipse.core.internal.jobs.JobManager.DEBUG_BEGIN_END) org.eclipse.core.internal.jobs.JobManager.debug ("Begin rule: " + rule);
var currentThread = Thread.currentThread ();
var threadJob;
{
threadJob = this.threadJobs.get (currentThread);
if (threadJob != null) {
threadJob.push (rule);
return ;
}if (rule == null) return ;
var realJob = this.manager.currentJob ();
if (realJob != null && realJob.getRule () != null) threadJob = this.newThreadJob (realJob.getRule ());
 else {
threadJob = this.newThreadJob (rule);
threadJob.acquireRule = true;
}if (rule != null && this.isSuspended (rule)) threadJob.acquireRule = false;
threadJob.setRealJob (realJob);
threadJob.setThread (currentThread);
}try {
threadJob.push (rule);
if (threadJob.acquireRule) {
if (this.manager.runNow (threadJob)) this.manager.getLockManager ().addLockThread (Thread.currentThread (), rule);
 else threadJob.joinRun (monitor);
}} finally {
{
this.threadJobs.put (currentThread, threadJob);
if (suspend && rule != null) this.suspendedRules.add (rule);
}if (threadJob.isBlocked) {
threadJob.isBlocked = false;
this.manager.reportUnblocked (monitor);
}}
}, "org.eclipse.core.runtime.jobs.ISchedulingRule,org.eclipse.core.runtime.IProgressMonitor,~B");
Clazz.defineMethod (c$, "end", 
function (rule, resume) {
if (org.eclipse.core.internal.jobs.JobManager.DEBUG_BEGIN_END) org.eclipse.core.internal.jobs.JobManager.debug ("End rule: " + rule);
var threadJob = this.threadJobs.get (Thread.currentThread ());
if (threadJob == null) org.eclipse.core.internal.runtime.Assert.isLegal (rule == null, "endRule without matching beginRule: " + rule);
 else if (threadJob.pop (rule)) {
this.endThreadJob (threadJob, resume);
}}, "org.eclipse.core.runtime.jobs.ISchedulingRule,~B");
Clazz.defineMethod (c$, "endJob", 
function (lastJob) {
var currentThread = Thread.currentThread ();
var error;
{
var threadJob = this.threadJobs.get (currentThread);
if (threadJob == null) return ;
var msg = "Worker thread ended job: " + lastJob + ", but still holds rule: " + threadJob;
error =  new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 1, msg, null);
this.endThreadJob (threadJob, false);
}try {
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log (error);
} catch (e) {
if (Clazz.instanceOf (e, RuntimeException)) {
System.err.println (error.getMessage ());
} else {
throw e;
}
}
}, "org.eclipse.core.internal.jobs.InternalJob");
Clazz.defineMethod (c$, "endThreadJob", 
($fz = function (threadJob, resume) {
var currentThread = Thread.currentThread ();
this.threadJobs.remove (currentThread);
var rule = threadJob.getRule ();
if (resume && rule != null) this.suspendedRules.remove (rule);
if (threadJob.acquireRule) this.manager.getLockManager ().removeLockThread (currentThread, rule);
if (threadJob.isRunning ()) this.manager.endJob (threadJob, org.eclipse.core.runtime.Status.OK_STATUS, false);
this.recycle (threadJob);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.jobs.ThreadJob,~B");
Clazz.defineMethod (c$, "isSuspended", 
($fz = function (rule) {
if (this.suspendedRules.size () == 0) return false;
for (var it = this.suspendedRules.iterator (); it.hasNext (); ) if ((it.next ()).contains (rule)) return true;

return false;
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.jobs.ISchedulingRule");
Clazz.defineMethod (c$, "newThreadJob", 
($fz = function (rule) {
if (this.jobCache != null) {
var job = this.jobCache;
job.setRule (rule);
job.acquireRule = job.$isRunning = false;
job.realJob = null;
this.jobCache = null;
return job;
}return  new org.eclipse.core.internal.jobs.ThreadJob (this.manager, rule);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.jobs.ISchedulingRule");
Clazz.defineMethod (c$, "recycle", 
($fz = function (job) {
if (this.jobCache == null && job.recycle ()) this.jobCache = job;
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.jobs.ThreadJob");
Clazz.defineMethod (c$, "resume", 
function (rule) {
this.end (rule, true);
if (org.eclipse.core.internal.jobs.JobManager.DEBUG_BEGIN_END) org.eclipse.core.internal.jobs.JobManager.debug ("Resume rule: " + rule);
}, "org.eclipse.core.runtime.jobs.ISchedulingRule");
Clazz.defineMethod (c$, "suspend", 
function (rule, monitor) {
if (org.eclipse.core.internal.jobs.JobManager.DEBUG_BEGIN_END) org.eclipse.core.internal.jobs.JobManager.debug ("Suspend rule: " + rule);
this.begin (rule, monitor, true);
}, "org.eclipse.core.runtime.jobs.ISchedulingRule,org.eclipse.core.runtime.IProgressMonitor");
Clazz.defineMethod (c$, "transfer", 
function (rule, destinationThread) {
if (rule == null) return ;
var currentThread = Thread.currentThread ();
if (currentThread === destinationThread) return ;
var job = this.threadJobs.get (destinationThread);
org.eclipse.core.internal.runtime.Assert.isLegal (job == null);
job = this.threadJobs.get (currentThread);
org.eclipse.core.internal.runtime.Assert.isLegal (job != null);
org.eclipse.core.internal.runtime.Assert.isLegal (job.getRule () === rule);
job.setThread (destinationThread);
this.threadJobs.remove (currentThread);
this.threadJobs.put (destinationThread, job);
if (job.acquireRule) {
this.manager.getLockManager ().removeLockThread (currentThread, rule);
this.manager.getLockManager ().addLockThread (destinationThread, rule);
}}, "org.eclipse.core.runtime.jobs.ISchedulingRule,Thread");
});
