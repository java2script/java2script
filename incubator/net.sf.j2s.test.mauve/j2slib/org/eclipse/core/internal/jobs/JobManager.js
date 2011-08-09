Clazz.declarePackage ("org.eclipse.core.internal.jobs");
Clazz.load (["org.eclipse.core.runtime.jobs.IJobManager", "java.lang.Boolean", "org.eclipse.core.internal.jobs.ImplicitJobs", "$.JobListeners", "$.LockManager", "org.eclipse.core.internal.runtime.InternalPlatform", "org.eclipse.core.runtime.jobs.ISchedulingRule"], "org.eclipse.core.internal.jobs.JobManager", ["java.lang.IllegalStateException", "$.InterruptedException", "$.StringBuffer", "$.Thread", "java.text.FieldPosition", "$.SimpleDateFormat", "java.util.ArrayList", "$.Collections", "$.Date", "$.HashSet", "org.eclipse.core.internal.jobs.JobQueue", "$.JobStatus", "$.Semaphore", "$.WorkerPool", "org.eclipse.core.internal.runtime.Assert", "$.Messages", "$.Policy", "org.eclipse.core.runtime.NullProgressMonitor", "$.OperationCanceledException", "$.Status", "org.eclipse.core.runtime.jobs.Job", "$.JobChangeAdapter", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.active = true;
this.implicitJobs = null;
this.jobListeners = null;
this.lock = null;
this.lockManager = null;
this.pool = null;
this.progressProvider = null;
this.running = null;
this.sleeping = null;
this.suspended = false;
this.waiting = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.jobs, "JobManager", null, org.eclipse.core.runtime.jobs.IJobManager);
Clazz.prepareFields (c$, function () {
this.implicitJobs =  new org.eclipse.core.internal.jobs.ImplicitJobs (this);
this.jobListeners =  new org.eclipse.core.internal.jobs.JobListeners ();
this.lock =  new Object ();
this.lockManager =  new org.eclipse.core.internal.jobs.LockManager ();
});
c$.debug = Clazz.defineMethod (c$, "debug", 
function (msg) {
var msgBuf =  new StringBuffer (msg.length + 40);
if (org.eclipse.core.internal.jobs.JobManager.DEBUG_TIMING) {
if (org.eclipse.core.internal.jobs.JobManager.DEBUG_FORMAT == null) ($t$ = org.eclipse.core.internal.jobs.JobManager.DEBUG_FORMAT =  new java.text.SimpleDateFormat ("HH:mm:ss.SSS"), org.eclipse.core.internal.jobs.JobManager.prototype.DEBUG_FORMAT = org.eclipse.core.internal.jobs.JobManager.DEBUG_FORMAT, $t$);
org.eclipse.core.internal.jobs.JobManager.DEBUG_FORMAT.format ( new java.util.Date (), msgBuf,  new java.text.FieldPosition (0));
msgBuf.append ('-');
}msgBuf.append ('[').append (Thread.currentThread ()).append (']').append (msg);
System.out.println (msgBuf.toString ());
}, "~S");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function () {
if (org.eclipse.core.internal.jobs.JobManager.instance == null)  new org.eclipse.core.internal.jobs.JobManager ();
return org.eclipse.core.internal.jobs.JobManager.instance;
});
c$.printState = Clazz.defineMethod (c$, "printState", 
function (state) {
switch (state) {
case 0:
return "NONE";
case 2:
return "WAITING";
case 1:
return "SLEEPING";
case 4:
return "RUNNING";
case 8:
return "BLOCKED";
case 16:
return "ABOUT_TO_RUN";
case 32:
return "ABOUT_TO_SCHEDULE";
}
return "UNKNOWN";
}, "~N");
c$.shutdown = Clazz.defineMethod (c$, "shutdown", 
function () {
if (org.eclipse.core.internal.jobs.JobManager.instance != null) {
org.eclipse.core.internal.jobs.JobManager.instance.doShutdown ();
($t$ = org.eclipse.core.internal.jobs.JobManager.instance = null, org.eclipse.core.internal.jobs.JobManager.prototype.instance = org.eclipse.core.internal.jobs.JobManager.instance, $t$);
}});
Clazz.makeConstructor (c$, 
($fz = function () {
($t$ = org.eclipse.core.internal.jobs.JobManager.instance = this, org.eclipse.core.internal.jobs.JobManager.prototype.instance = org.eclipse.core.internal.jobs.JobManager.instance, $t$);
{
this.waiting =  new org.eclipse.core.internal.jobs.JobQueue (false);
this.sleeping =  new org.eclipse.core.internal.jobs.JobQueue (true);
this.running =  new java.util.HashSet (10);
this.pool =  new org.eclipse.core.internal.jobs.WorkerPool (this);
}}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "addJobChangeListener", 
function (listener) {
this.jobListeners.add (listener);
}, "org.eclipse.core.runtime.jobs.IJobChangeListener");
Clazz.overrideMethod (c$, "beginRule", 
function (rule, monitor) {
this.validateRule (rule);
this.implicitJobs.begin (rule, this.monitorFor (monitor), false);
}, "org.eclipse.core.runtime.jobs.ISchedulingRule,org.eclipse.core.runtime.IProgressMonitor");
Clazz.defineMethod (c$, "cancel", 
function (job) {
var monitor = null;
{
switch (job.getState ()) {
case 0:
return true;
case 4:
if (job.internalGetState () == 4) {
monitor = job.getProgressMonitor ();
break;
}default:
this.changeState (job, 0);
}
}if (monitor != null) {
if (!monitor.isCanceled ()) monitor.setCanceled (true);
return false;
}this.jobListeners.done (job, org.eclipse.core.runtime.Status.CANCEL_STATUS, false);
return true;
}, "org.eclipse.core.internal.jobs.InternalJob");
Clazz.defineMethod (c$, "cancel", 
function (family) {
for (var it = this.select (family).iterator (); it.hasNext (); ) this.cancel (it.next ());

}, "~O");
Clazz.defineMethod (c$, "changeState", 
($fz = function (job, newState) {
{
var oldState = job.internalGetState ();
switch (oldState) {
case 0:
case 32:
break;
case 8:
job.remove ();
break;
case 2:
try {
this.waiting.remove (job);
} catch (e) {
if (Clazz.instanceOf (e, RuntimeException)) {
org.eclipse.core.internal.runtime.Assert.isLegal (false, "Tried to remove a job that wasn't in the queue");
} else {
throw e;
}
}
break;
case 1:
try {
this.sleeping.remove (job);
} catch (e) {
if (Clazz.instanceOf (e, RuntimeException)) {
org.eclipse.core.internal.runtime.Assert.isLegal (false, "Tried to remove a job that wasn't in the queue");
} else {
throw e;
}
}
break;
case 4:
case 16:
this.running.remove (job);
break;
default:
org.eclipse.core.internal.runtime.Assert.isLegal (false, "Invalid job state: " + job + ", state: " + oldState);
}
job.internalSetState (newState);
switch (newState) {
case 0:
job.setStartTime (-1);
case 8:
break;
case 2:
this.waiting.enqueue (job);
break;
case 1:
this.sleeping.enqueue (job);
break;
case 4:
case 16:
job.setStartTime (-1);
this.running.add (job);
break;
case 32:
break;
default:
org.eclipse.core.internal.runtime.Assert.isLegal (false, "Invalid job state: " + job + ", state: " + newState);
}
}}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.jobs.InternalJob,~N");
Clazz.defineMethod (c$, "createMonitor", 
function (job, group, ticks) {
{
if (job.getState () != 0) return null;
var monitor = null;
if (this.progressProvider != null) monitor = this.progressProvider.createMonitor (job, group, ticks);
if (monitor == null) monitor =  new org.eclipse.core.runtime.NullProgressMonitor ();
return monitor;
}}, "org.eclipse.core.internal.jobs.InternalJob,org.eclipse.core.runtime.IProgressMonitor,~N");
Clazz.defineMethod (c$, "createMonitor", 
($fz = function (job) {
var monitor = null;
if (this.progressProvider != null) monitor = this.progressProvider.createMonitor (job);
if (monitor == null) monitor =  new org.eclipse.core.runtime.NullProgressMonitor ();
return monitor;
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.jobs.Job");
Clazz.overrideMethod (c$, "createProgressGroup", 
function () {
if (this.progressProvider != null) return this.progressProvider.createProgressGroup ();
return  new org.eclipse.core.runtime.NullProgressMonitor ();
});
Clazz.overrideMethod (c$, "currentJob", 
function () {
var current = Thread.currentThread ();
if (Clazz.instanceOf (current, org.eclipse.core.internal.jobs.Worker)) return (current).currentJob ();
{
for (var it = this.running.iterator (); it.hasNext (); ) {
var job = it.next ();
if (job.getThread () === current) return job;
}
}return null;
});
Clazz.defineMethod (c$, "delayFor", 
($fz = function (priority) {
switch (priority) {
case 10:
return 0;
case 20:
return 50;
case 30:
return 100;
case 40:
return 500;
case 50:
return 1000;
default:
org.eclipse.core.internal.runtime.Assert.isTrue (false, "Job has invalid priority: " + priority);
return 0;
}
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "doSchedule", 
($fz = function (job, delay) {
{
if (job.getPriority () == 50) {
var minDelay = this.running.size () * 100;
delay = Math.max (delay, minDelay);
}if (delay > 0) {
job.setStartTime (System.currentTimeMillis () + delay);
this.changeState (job, 1);
} else {
job.setStartTime (System.currentTimeMillis () + this.delayFor (job.getPriority ()));
this.changeState (job, 2);
}}}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.jobs.InternalJob,~N");
Clazz.defineMethod (c$, "doShutdown", 
($fz = function () {
var toCancel = null;
{
if (this.active) {
this.active = false;
toCancel = this.running.toArray ( new Array (this.running.size ()));
this.sleeping.clear ();
this.waiting.clear ();
this.running.clear ();
}}if (toCancel != null) {
for (var i = 0; i < toCancel.length; i++) {
var job = toCancel[i];
this.cancel (job);
var jobName;
if (Clazz.instanceOf (job, org.eclipse.core.internal.jobs.ThreadJob)) {
var realJob = (job).realJob;
if (realJob != null) jobName = realJob.getClass ().getName ();
 else jobName = "ThreadJob on rule: " + job.getRule ();
} else {
jobName = job.getClass ().getName ();
}var msg = "Job found still running after platform shutdown.  Jobs should be canceled by the plugin that scheduled them during shutdown: " + jobName;
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (2, "org.eclipse.core.runtime", 2, msg, null));
}
this.pool.shutdown ();
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "endJob", 
function (job, result, notify) {
var blocked = null;
var blockedJobCount = 0;
var rescheduleDelay = -1;
{
if (result === org.eclipse.core.runtime.jobs.Job.ASYNC_FINISH) return ;
if (job.getState () == 0) return ;
if (org.eclipse.core.internal.jobs.JobManager.DEBUG && notify) org.eclipse.core.internal.jobs.JobManager.debug ("Ending job: " + job);
job.setResult (result);
job.setProgressMonitor (null);
job.setThread (null);
rescheduleDelay = job.getStartTime ();
this.changeState (job, 0);
blocked = job.previous ();
job.setPrevious (null);
while (blocked != null) {
var previous = blocked.previous ();
this.changeState (blocked, 2);
blockedJobCount++;
blocked = previous;
}
}for (var i = 0; i < blockedJobCount; i++) this.pool.jobQueued (blocked);

var reschedule = this.active && rescheduleDelay > -1 && job.shouldSchedule ();
if (notify) this.jobListeners.done (job, result, reschedule);
if (reschedule) this.schedule (job, rescheduleDelay, reschedule);
}, "org.eclipse.core.internal.jobs.InternalJob,org.eclipse.core.runtime.IStatus,~B");
Clazz.overrideMethod (c$, "endRule", 
function (rule) {
this.implicitJobs.end (rule, false);
}, "org.eclipse.core.runtime.jobs.ISchedulingRule");
Clazz.overrideMethod (c$, "find", 
function (family) {
var members = this.select (family);
return members.toArray ( new Array (members.size ()));
}, "~O");
Clazz.defineMethod (c$, "findBlockingJob", 
function (waitingJob) {
if (waitingJob.getRule () == null) return null;
{
if (this.running.isEmpty ()) return null;
var hasBlockedJobs = false;
for (var it = this.running.iterator (); it.hasNext (); ) {
var job = it.next ();
if (waitingJob.isConflicting (job)) return job;
if (!hasBlockedJobs) hasBlockedJobs = job.previous () != null;
}
if (!hasBlockedJobs) return null;
for (var it = this.running.iterator (); it.hasNext (); ) {
var job = it.next ();
while (true) {
job = job.previous ();
if (job == null) break;
if (waitingJob.isConflicting (job)) return job;
}
}
}return null;
}, "org.eclipse.core.internal.jobs.InternalJob");
Clazz.defineMethod (c$, "getLockManager", 
function () {
return this.lockManager;
});
Clazz.defineMethod (c$, "isActive", 
function () {
return this.active;
});
Clazz.defineMethod (c$, "isBlocking", 
function (runningJob) {
{
if (runningJob.getState () != 4) return false;
var previous = runningJob.previous ();
while (previous != null) {
if (!previous.isSystem ()) return true;
if (Clazz.instanceOf (previous, org.eclipse.core.internal.jobs.ThreadJob) && (previous).shouldInterrupt ()) return true;
previous = previous.previous ();
}
return false;
}}, "org.eclipse.core.internal.jobs.InternalJob");
Clazz.overrideMethod (c$, "isIdle", 
function () {
{
return this.running.isEmpty () && this.waiting.isEmpty ();
}});
Clazz.defineMethod (c$, "join", 
function (job) {
var listener;
var barrier;
{
var state = job.getState ();
if (state == 0) return ;
if (this.suspended && state != 4) return ;
barrier =  new org.eclipse.core.internal.jobs.Semaphore (null);
listener = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.jobs.JobManager$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.jobs, "JobManager$1", org.eclipse.core.runtime.jobs.JobChangeAdapter);
Clazz.overrideMethod (c$, "done", 
function (event) {
this.f$.barrier.release ();
}, "org.eclipse.core.runtime.jobs.IJobChangeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.jobs.JobManager$1, i$, v$);
}) (this, Clazz.cloneFinals ("barrier", barrier));
job.addJobChangeListener (listener);
}try {
while (true) {
this.lockManager.aboutToWait (job.getThread ());
try {
if (barrier.acquire (9223372036854775807)) break;
} catch (e) {
if (Clazz.instanceOf (e, InterruptedException)) {
} else {
throw e;
}
}
}
} finally {
this.lockManager.aboutToRelease ();
job.removeJobChangeListener (listener);
}
}, "org.eclipse.core.internal.jobs.InternalJob");
Clazz.defineMethod (c$, "join", 
function (family, monitor) {
monitor = this.monitorFor (monitor);
var listener = null;
var jobs;
var jobCount;
var blocking = null;
{
var states = this.suspended ? 4 : 7;
jobs = java.util.Collections.synchronizedSet ( new java.util.HashSet (this.select (family, states)));
jobCount = jobs.size ();
if (jobCount == 0) return ;
if (jobCount == 1) blocking = jobs.iterator ().next ();
listener = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.jobs.JobManager$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.jobs, "JobManager$2", org.eclipse.core.runtime.jobs.JobChangeAdapter);
Clazz.overrideMethod (c$, "done", 
function (event) {
if (!(event).reschedule) this.f$.jobs.remove (event.getJob ());
}, "org.eclipse.core.runtime.jobs.IJobChangeEvent");
Clazz.overrideMethod (c$, "scheduled", 
function (event) {
if ((event).reschedule) return ;
var job = event.getJob ();
if (job.belongsTo (this.f$.family)) this.f$.jobs.add (job);
}, "org.eclipse.core.runtime.jobs.IJobChangeEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.jobs.JobManager$2, i$, v$);
}) (this, Clazz.cloneFinals ("jobs", jobs, "family", family));
this.addJobChangeListener (listener);
}try {
monitor.beginTask (org.eclipse.core.internal.runtime.Messages.jobs_blocked0, jobCount);
monitor.subTask (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.jobs_waitFamSub, Integer.toString (jobCount)));
this.reportBlocked (monitor, blocking);
var jobsLeft;
var reportedWorkDone = 0;
while ((jobsLeft = jobs.size ()) > 0) {
var actualWorkDone = Math.max (0, jobCount - jobsLeft);
if (reportedWorkDone < actualWorkDone) {
monitor.worked (actualWorkDone - reportedWorkDone);
reportedWorkDone = actualWorkDone;
monitor.subTask (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.jobs_waitFamSub, Integer.toString (jobsLeft)));
}if (Thread.interrupted ()) throw  new InterruptedException ();
if (monitor.isCanceled ()) throw  new org.eclipse.core.runtime.OperationCanceledException ();
this.lockManager.aboutToWait (null);
Thread.sleep (100);
}
} finally {
this.removeJobChangeListener (listener);
this.reportUnblocked (monitor);
monitor.done ();
}
}, "~O,org.eclipse.core.runtime.IProgressMonitor");
Clazz.defineMethod (c$, "monitorFor", 
($fz = function (monitor) {
if (monitor == null || (Clazz.instanceOf (monitor, org.eclipse.core.runtime.NullProgressMonitor))) {
if (this.progressProvider != null) {
try {
monitor = this.progressProvider.getDefaultMonitor ();
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
var msg = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.meta_pluginProblems, "org.eclipse.core.runtime");
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log ( new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 2, msg, e));
} else {
throw e;
}
}
}}return org.eclipse.core.internal.runtime.Policy.monitorFor (monitor);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.IProgressMonitor");
Clazz.overrideMethod (c$, "newLock", 
function () {
return this.lockManager.newLock ();
});
Clazz.defineMethod (c$, "nextJob", 
($fz = function () {
{
if (this.suspended) return null;
var now = System.currentTimeMillis ();
var job = this.sleeping.peek ();
while (job != null && job.getStartTime () < now) {
job.setStartTime (now + this.delayFor (job.getPriority ()));
this.changeState (job, 2);
job = this.sleeping.peek ();
}
while ((job = this.waiting.peek ()) != null) {
var blocker = this.findBlockingJob (job);
if (blocker == null) break;
this.changeState (job, 8);
org.eclipse.core.internal.runtime.Assert.isTrue (job.next () == null);
org.eclipse.core.internal.runtime.Assert.isTrue (job.previous () == null);
blocker.addLast (job);
}
if (job != null) {
this.changeState (job, 16);
if (org.eclipse.core.internal.jobs.JobManager.DEBUG) org.eclipse.core.internal.jobs.JobManager.debug ("Starting job: " + job);
}return job;
}}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "removeJobChangeListener", 
function (listener) {
this.jobListeners.remove (listener);
}, "org.eclipse.core.runtime.jobs.IJobChangeListener");
Clazz.defineMethod (c$, "reportBlocked", 
function (monitor, blockingJob) {
if (!(Clazz.instanceOf (monitor, org.eclipse.core.runtime.IProgressMonitorWithBlocking))) return ;
var reason;
if (blockingJob == null || Clazz.instanceOf (blockingJob, org.eclipse.core.internal.jobs.ThreadJob) || blockingJob.isSystem ()) {
reason =  new org.eclipse.core.runtime.Status (1, "org.eclipse.core.runtime", 1, org.eclipse.core.internal.runtime.Messages.jobs_blocked0, null);
} else {
var msg = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.jobs_blocked1, blockingJob.getName ());
reason =  new org.eclipse.core.internal.jobs.JobStatus (1, blockingJob, msg);
}(monitor).setBlocked (reason);
}, "org.eclipse.core.runtime.IProgressMonitor,org.eclipse.core.internal.jobs.InternalJob");
Clazz.defineMethod (c$, "reportUnblocked", 
function (monitor) {
if (Clazz.instanceOf (monitor, org.eclipse.core.runtime.IProgressMonitorWithBlocking)) (monitor).clearBlocked ();
}, "org.eclipse.core.runtime.IProgressMonitor");
Clazz.defineMethod (c$, "resume", 
function () {
{
this.suspended = false;
this.pool.jobQueued (null);
}});
Clazz.defineMethod (c$, "resume", 
function (rule) {
this.implicitJobs.resume (rule);
}, "org.eclipse.core.runtime.jobs.ISchedulingRule");
Clazz.defineMethod (c$, "runNow", 
function (job) {
{
if (this.findBlockingJob (job) != null) return false;
this.changeState (job, 4);
job.setProgressMonitor ( new org.eclipse.core.runtime.NullProgressMonitor ());
job.run (null);
}return true;
}, "org.eclipse.core.internal.jobs.InternalJob");
Clazz.defineMethod (c$, "schedule", 
function (job, delay, reschedule) {
if (!this.active) throw  new IllegalStateException ("Job manager has been shut down.");
org.eclipse.core.internal.runtime.Assert.isNotNull (job, "Job is null");
org.eclipse.core.internal.runtime.Assert.isLegal (delay >= 0, "Scheduling delay is negative");
{
if (job.getState () == 4) {
job.setStartTime (delay);
return ;
}if (job.internalGetState () != 0) return ;
if (org.eclipse.core.internal.jobs.JobManager.DEBUG) org.eclipse.core.internal.jobs.JobManager.debug ("Scheduling job: " + job);
this.changeState (job, 32);
}this.jobListeners.scheduled (job, delay, reschedule);
this.doSchedule (job, delay);
this.pool.jobQueued (job);
}, "org.eclipse.core.internal.jobs.InternalJob,~N,~B");
Clazz.defineMethod (c$, "select", 
($fz = function (members, family, firstJob, stateMask) {
if (firstJob == null) return ;
var job = firstJob;
do {
if ((family == null || job.belongsTo (family)) && ((job.getState () & stateMask) != 0)) members.add (job);
job = job.previous ();
} while (job != null && job !== firstJob);
}, $fz.isPrivate = true, $fz), "java.util.List,~O,org.eclipse.core.internal.jobs.InternalJob,~N");
Clazz.defineMethod (c$, "select", 
($fz = function (family) {
return this.select (family, 7);
}, $fz.isPrivate = true, $fz), "~O");
Clazz.defineMethod (c$, "select", 
($fz = function (family, stateMask) {
var members =  new java.util.ArrayList ();
{
if ((stateMask & 4) != 0) {
for (var it = this.running.iterator (); it.hasNext (); ) {
this.select (members, family, it.next (), stateMask);
}
}if ((stateMask & 2) != 0) this.select (members, family, this.waiting.peek (), stateMask);
if ((stateMask & 1) != 0) this.select (members, family, this.sleeping.peek (), stateMask);
}return members;
}, $fz.isPrivate = true, $fz), "~O,~N");
Clazz.overrideMethod (c$, "setLockListener", 
function (listener) {
this.lockManager.setLockListener (listener);
}, "org.eclipse.core.runtime.jobs.LockListener");
Clazz.defineMethod (c$, "setPriority", 
function (job, newPriority) {
{
var oldPriority = job.getPriority ();
if (oldPriority == newPriority) return ;
job.internalSetPriority (newPriority);
if (job.getState () == 2) {
var oldStart = job.getStartTime ();
job.setStartTime (oldStart + (this.delayFor (newPriority) - this.delayFor (oldPriority)));
this.waiting.resort (job);
}}}, "org.eclipse.core.internal.jobs.InternalJob,~N");
Clazz.overrideMethod (c$, "setProgressProvider", 
function (provider) {
this.progressProvider = provider;
}, "org.eclipse.core.runtime.jobs.ProgressProvider");
Clazz.defineMethod (c$, "setRule", 
function (job, rule) {
{
org.eclipse.core.internal.runtime.Assert.isLegal (job.getState () == 0);
this.validateRule (rule);
job.internalSetRule (rule);
}}, "org.eclipse.core.internal.jobs.InternalJob,org.eclipse.core.runtime.jobs.ISchedulingRule");
Clazz.defineMethod (c$, "sleep", 
function (job) {
{
switch (job.getState ()) {
case 4:
if (job.internalGetState () == 4) return false;
break;
case 1:
job.setStartTime (9223372036854775807);
this.changeState (job, 1);
return true;
case 0:
return true;
case 2:
break;
}
job.setStartTime (9223372036854775807);
this.changeState (job, 1);
}this.jobListeners.sleeping (job);
return true;
}, "org.eclipse.core.internal.jobs.InternalJob");
Clazz.defineMethod (c$, "sleep", 
function (family) {
for (var it = this.select (family).iterator (); it.hasNext (); ) {
this.sleep (it.next ());
}
}, "~O");
Clazz.defineMethod (c$, "sleepHint", 
function () {
{
if (this.suspended) return 9223372036854775807;
if (!this.waiting.isEmpty ()) return 0;
var next = this.sleeping.peek ();
if (next == null) return 9223372036854775807;
return next.getStartTime () - System.currentTimeMillis ();
}});
Clazz.defineMethod (c$, "startJob", 
function () {
var job = null;
while (true) {
job = this.nextJob ();
if (job == null) return null;
if (job.shouldRun ()) {
this.jobListeners.aboutToRun (job);
{
if (job.getState () == 4) {
var internal = job;
if (internal.getProgressMonitor () == null) internal.setProgressMonitor (this.createMonitor (job));
internal.internalSetState (4);
break;
}}}if (job.getState () != 1) {
this.endJob (job, org.eclipse.core.runtime.Status.CANCEL_STATUS, true);
continue ;}}
this.jobListeners.running (job);
return job;
});
Clazz.defineMethod (c$, "suspend", 
function () {
{
this.suspended = true;
}});
Clazz.defineMethod (c$, "suspend", 
function (rule, monitor) {
org.eclipse.core.internal.runtime.Assert.isNotNull (rule);
this.implicitJobs.suspend (rule, this.monitorFor (monitor));
}, "org.eclipse.core.runtime.jobs.ISchedulingRule,org.eclipse.core.runtime.IProgressMonitor");
Clazz.overrideMethod (c$, "transferRule", 
function (rule, destinationThread) {
this.implicitJobs.transfer (rule, destinationThread);
}, "org.eclipse.core.runtime.jobs.ISchedulingRule,Thread");
Clazz.defineMethod (c$, "validateRule", 
($fz = function (rule) {
if (rule == null) return ;
org.eclipse.core.internal.runtime.Assert.isLegal (rule.contains (rule));
org.eclipse.core.internal.runtime.Assert.isLegal (!rule.contains (org.eclipse.core.internal.jobs.JobManager.nullRule));
org.eclipse.core.internal.runtime.Assert.isLegal (rule.isConflicting (rule));
org.eclipse.core.internal.runtime.Assert.isLegal (!rule.isConflicting (org.eclipse.core.internal.jobs.JobManager.nullRule));
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.jobs.ISchedulingRule");
Clazz.defineMethod (c$, "wakeUp", 
function (job, delay) {
org.eclipse.core.internal.runtime.Assert.isLegal (delay >= 0, "Scheduling delay is negative");
{
if (job.getState () != 1) return ;
this.doSchedule (job, delay);
}this.pool.jobQueued (job);
if (delay == 0) this.jobListeners.awake (job);
}, "org.eclipse.core.internal.jobs.InternalJob,~N");
Clazz.defineMethod (c$, "wakeUp", 
function (family) {
for (var it = this.select (family).iterator (); it.hasNext (); ) {
this.wakeUp (it.next (), 0);
}
}, "~O");
c$.OPTION_DEADLOCK_ERROR = c$.prototype.OPTION_DEADLOCK_ERROR = "org.eclipse.core.runtime/jobs/errorondeadlock";
c$.OPTION_DEBUG_BEGIN_END = c$.prototype.OPTION_DEBUG_BEGIN_END = "org.eclipse.core.runtime/jobs/beginend";
c$.OPTION_DEBUG_JOBS = c$.prototype.OPTION_DEBUG_JOBS = "org.eclipse.core.runtime/jobs";
c$.OPTION_DEBUG_JOBS_TIMING = c$.prototype.OPTION_DEBUG_JOBS_TIMING = "org.eclipse.core.runtime/jobs/timing";
c$.OPTION_LOCKS = c$.prototype.OPTION_LOCKS = "org.eclipse.core.runtime/jobs/locks";
c$.DEBUG = c$.prototype.DEBUG = Boolean.TRUE.toString ().equalsIgnoreCase (org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getOption ("org.eclipse.core.runtime/jobs"));
c$.DEBUG_BEGIN_END = c$.prototype.DEBUG_BEGIN_END = Boolean.TRUE.toString ().equalsIgnoreCase (org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getOption ("org.eclipse.core.runtime/jobs/beginend"));
c$.DEBUG_DEADLOCK = c$.prototype.DEBUG_DEADLOCK = Boolean.TRUE.toString ().equalsIgnoreCase (org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getOption ("org.eclipse.core.runtime/jobs/errorondeadlock"));
Clazz.defineStatics (c$,
"DEBUG_FORMAT", null);
c$.DEBUG_LOCKS = c$.prototype.DEBUG_LOCKS = Boolean.TRUE.toString ().equalsIgnoreCase (org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getOption ("org.eclipse.core.runtime/jobs/locks"));
c$.DEBUG_TIMING = c$.prototype.DEBUG_TIMING = Boolean.TRUE.toString ().equalsIgnoreCase (org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getOption ("org.eclipse.core.runtime/jobs/timing"));
Clazz.defineStatics (c$,
"instance", null);
c$.nullRule = c$.prototype.nullRule = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.jobs.JobManager$3")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.jobs, "JobManager$3", null, org.eclipse.core.runtime.jobs.ISchedulingRule);
Clazz.defineMethod (c$, "contains", 
function (rule) {
return rule === this;
}, "org.eclipse.core.runtime.jobs.ISchedulingRule");
Clazz.defineMethod (c$, "isConflicting", 
function (rule) {
return rule === this;
}, "org.eclipse.core.runtime.jobs.ISchedulingRule");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.jobs.JobManager$3, i$, v$);
}) (this, null);
});
