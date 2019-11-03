Clazz.declarePackage ("org.eclipse.core.internal.jobs");
Clazz.load (["org.eclipse.core.runtime.jobs.Job"], "org.eclipse.core.internal.jobs.ThreadJob", ["java.lang.IllegalArgumentException", "$.RuntimeException", "$.StringBuffer", "$.Thread", "org.eclipse.core.internal.jobs.JobManager", "org.eclipse.core.internal.runtime.Assert", "$.InternalPlatform", "$.Messages", "org.eclipse.core.runtime.OperationCanceledException", "$.Status"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$manager = null;
this.acquireRule = false;
this.isBlocked = false;
this.$isRunning = false;
this.lastPush = null;
this.realJob = null;
this.ruleStack = null;
this.top = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.jobs, "ThreadJob", org.eclipse.core.runtime.jobs.Job);
Clazz.makeConstructor (c$, 
function (manager, rule) {
Clazz.superConstructor (this, org.eclipse.core.internal.jobs.ThreadJob, ["Implicit Job"]);
this.$manager = manager;
this.setSystem (true);
this.setPriority (10);
this.ruleStack =  new Array (2);
this.top = -1;
this.setRule (rule);
}, "org.eclipse.core.internal.jobs.JobManager,org.eclipse.core.runtime.jobs.ISchedulingRule");
Clazz.defineMethod (c$, "illegalPop", 
($fz = function (rule) {
var buf =  new StringBuffer ("Attempted to endRule: ");
buf.append (rule);
if (this.top >= 0 && this.top < this.ruleStack.length) {
buf.append (", does not match most recent begin: ");
buf.append (this.ruleStack[this.top]);
} else {
if (this.top < 0) buf.append (", but there was no matching beginRule");
 else buf.append (", but the rule stack was out of bounds: " + this.top);
}buf.append (".  See log for trace information if rule tracing is enabled.");
var msg = buf.toString ();
if (org.eclipse.core.internal.jobs.JobManager.DEBUG || org.eclipse.core.internal.jobs.JobManager.DEBUG_BEGIN_END) {
System.out.println (msg);
var t = this.lastPush == null ?  new IllegalArgumentException () : this.lastPush;
var error =  new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 1, msg, t);
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log (error);
}org.eclipse.core.internal.runtime.Assert.isLegal (false, msg);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.jobs.ISchedulingRule");
Clazz.defineMethod (c$, "illegalPush", 
($fz = function (pushRule, baseRule) {
var buf =  new StringBuffer ("Attempted to beginRule: ");
buf.append (pushRule);
buf.append (", does not match outer scope rule: ");
buf.append (baseRule);
var msg = buf.toString ();
if (org.eclipse.core.internal.jobs.JobManager.DEBUG) {
System.out.println (msg);
var error =  new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 1, msg,  new IllegalArgumentException ());
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log (error);
}org.eclipse.core.internal.runtime.Assert.isLegal (false, msg);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.jobs.ISchedulingRule,org.eclipse.core.runtime.jobs.ISchedulingRule");
Clazz.defineMethod (c$, "isCanceled", 
($fz = function (monitor) {
try {
return monitor.isCanceled ();
} catch (e) {
if (Clazz.instanceOf (e, RuntimeException)) {
var msg = org.eclipse.core.internal.runtime.Messages.jobs_internalError;
var status =  new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 2, msg, e);
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log (status);
} else {
throw e;
}
}
return false;
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.IProgressMonitor");
Clazz.defineMethod (c$, "isRunning", 
function () {
return this.$isRunning;
});
Clazz.defineMethod (c$, "joinRun", 
function (monitor) {
if (this.isCanceled (monitor)) throw  new org.eclipse.core.runtime.OperationCanceledException ();
var blockingJob = this.$manager.findBlockingJob (this);
var blocker = blockingJob == null ? null : blockingJob.getThread ();
if (!this.$manager.getLockManager ().aboutToWait (blocker)) {
try {
this.waitStart (monitor, blockingJob);
while (true) {
if (this.isCanceled (monitor)) throw  new org.eclipse.core.runtime.OperationCanceledException ();
if (this.$manager.runNow (this)) break;
blockingJob = this.$manager.findBlockingJob (this);
blocker = blockingJob == null ? null : blockingJob.getThread ();
if (this.$manager.getLockManager ().aboutToWait (blocker)) break;
{
try {
this.wait (250);
} catch (e) {
if (Clazz.instanceOf (e, InterruptedException)) {
} else {
throw e;
}
}
}}
} finally {
this.waitEnd (monitor);
}
}this.$manager.getLockManager ().aboutToRelease ();
}, "org.eclipse.core.runtime.IProgressMonitor");
Clazz.defineMethod (c$, "pop", 
function (rule) {
if (this.top < 0 || this.ruleStack[this.top] !== rule) this.illegalPop (rule);
this.ruleStack[this.top--] = null;
return this.top < 0;
}, "org.eclipse.core.runtime.jobs.ISchedulingRule");
Clazz.defineMethod (c$, "push", 
function (rule) {
var baseRule = this.getRule ();
if (++this.top >= this.ruleStack.length) {
var newStack =  new Array (this.ruleStack.length * 2);
System.arraycopy (this.ruleStack, 0, newStack, 0, this.ruleStack.length);
this.ruleStack = newStack;
}this.ruleStack[this.top] = rule;
if (org.eclipse.core.internal.jobs.JobManager.DEBUG_BEGIN_END) this.lastPush =  new RuntimeException ().fillInStackTrace ();
if (baseRule != null && rule != null && !baseRule.contains (rule)) this.illegalPush (rule, baseRule);
}, "org.eclipse.core.runtime.jobs.ISchedulingRule");
Clazz.defineMethod (c$, "recycle", 
function () {
if (this.getState () != 0) return false;
this.acquireRule = this.$isRunning = this.isBlocked = false;
this.realJob = null;
this.setRule (null);
this.setThread (null);
if (this.ruleStack.length != 2) this.ruleStack =  new Array (2);
 else this.ruleStack[0] = this.ruleStack[1] = null;
this.top = -1;
return true;
});
Clazz.overrideMethod (c$, "run", 
function (monitor) {
{
this.$isRunning = true;
this.notify ();
}return org.eclipse.core.runtime.jobs.Job.ASYNC_FINISH;
}, "org.eclipse.core.runtime.IProgressMonitor");
Clazz.defineMethod (c$, "setRealJob", 
function (realJob) {
this.realJob = realJob;
}, "org.eclipse.core.runtime.jobs.Job");
Clazz.defineMethod (c$, "shouldInterrupt", 
function () {
return this.realJob == null ? true : !this.realJob.isSystem ();
});
Clazz.overrideMethod (c$, "toString", 
function () {
var buf =  new StringBuffer ("ThreadJob");
buf.append ('(').append (this.realJob).append (',').append ('[');
for (var i = 0; i <= this.top && i < this.ruleStack.length; i++) buf.append (this.ruleStack[i]).append (',');

buf.append (']').append (')');
return buf.toString ();
});
Clazz.defineMethod (c$, "waitEnd", 
($fz = function (monitor) {
var lockManager = this.$manager.getLockManager ();
var currentThread = Thread.currentThread ();
if (this.isRunning ()) {
lockManager.addLockThread (currentThread, this.getRule ());
lockManager.resumeSuspendedLocks (currentThread);
} else {
lockManager.removeLockWaitThread (currentThread, this.getRule ());
}}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.IProgressMonitor");
Clazz.defineMethod (c$, "waitStart", 
($fz = function (monitor, blockingJob) {
this.$manager.getLockManager ().addLockWaitThread (Thread.currentThread (), this.getRule ());
this.isBlocked = true;
this.$manager.reportBlocked (monitor, blockingJob);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.IProgressMonitor,org.eclipse.core.internal.jobs.InternalJob");
});
