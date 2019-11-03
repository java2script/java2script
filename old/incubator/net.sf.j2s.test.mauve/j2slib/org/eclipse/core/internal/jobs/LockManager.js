Clazz.declarePackage ("org.eclipse.core.internal.jobs");
Clazz.load (["java.util.HashMap", "org.eclipse.core.internal.jobs.DeadlockDetector"], "org.eclipse.core.internal.jobs.LockManager", ["java.lang.Thread", "java.util.Stack", "org.eclipse.core.internal.jobs.OrderedLock", "org.eclipse.core.internal.runtime.InternalPlatform", "$.Messages", "org.eclipse.core.runtime.MultiStatus", "$.Status"], function () {
c$ = Clazz.decorateAsClass (function () {
this.lockListener = null;
this.locks = null;
this.suspendedLocks = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.jobs, "LockManager");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.depth = 0;
this.lock = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.jobs.LockManager, "LockState");
c$.suspend = Clazz.defineMethod (c$, "suspend", 
function (a) {
var b =  new org.eclipse.core.internal.jobs.LockManager.LockState ();
b.lock = a;
b.depth = a.forceRelease ();
return b;
}, "org.eclipse.core.internal.jobs.OrderedLock");
Clazz.defineMethod (c$, "resume", 
function () {
while (true) {
try {
if (this.lock.acquire (9223372036854775807)) break;
} catch (e) {
if (Clazz.instanceOf (e, InterruptedException)) {
} else {
throw e;
}
}
}
this.lock.setDepth (this.depth);
});
c$ = Clazz.p0p ();
Clazz.prepareFields (c$, function () {
this.locks =  new org.eclipse.core.internal.jobs.DeadlockDetector ();
this.suspendedLocks =  new java.util.HashMap ();
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "aboutToRelease", 
function () {
if (this.lockListener == null) return ;
try {
this.lockListener.aboutToRelease ();
} catch (e$$) {
if (Clazz.instanceOf (e$$, Exception)) {
var e = e$$;
{
org.eclipse.core.internal.jobs.LockManager.handleException (e);
}
} else if (Clazz.instanceOf (e$$, LinkageError)) {
var e = e$$;
{
org.eclipse.core.internal.jobs.LockManager.handleException (e);
}
} else {
throw e$$;
}
}
});
Clazz.defineMethod (c$, "aboutToWait", 
function (lockOwner) {
if (this.lockListener == null) return false;
try {
return this.lockListener.aboutToWait (lockOwner);
} catch (e$$) {
if (Clazz.instanceOf (e$$, Exception)) {
var e = e$$;
{
org.eclipse.core.internal.jobs.LockManager.handleException (e);
}
} else if (Clazz.instanceOf (e$$, LinkageError)) {
var e = e$$;
{
org.eclipse.core.internal.jobs.LockManager.handleException (e);
}
} else {
throw e$$;
}
}
return false;
}, "Thread");
Clazz.defineMethod (c$, "addLockThread", 
function (thread, lock) {
if (this.locks == null) return ;
try {
{
this.locks.lockAcquired (thread, lock);
}} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
this.handleInternalError (e);
} else {
throw e;
}
}
}, "Thread,org.eclipse.core.runtime.jobs.ISchedulingRule");
Clazz.defineMethod (c$, "addLockWaitThread", 
function (thread, lock) {
if (this.locks == null) return ;
try {
var found = null;
{
found = this.locks.lockWaitStart (thread, lock);
}if (found == null) return ;
var toSuspend = found.getLocks ();
var suspended =  new Array (toSuspend.length);
for (var i = 0; i < toSuspend.length; i++) suspended[i] = org.eclipse.core.internal.jobs.LockManager.LockState.suspend (toSuspend[i]);

{
var prevLocks = this.suspendedLocks.get (found.getCandidate ());
if (prevLocks == null) prevLocks =  new java.util.Stack ();
prevLocks.push (suspended);
this.suspendedLocks.put (found.getCandidate (), prevLocks);
}} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
this.handleInternalError (e);
} else {
throw e;
}
}
}, "Thread,org.eclipse.core.runtime.jobs.ISchedulingRule");
c$.handleException = Clazz.defineMethod (c$, "handleException", 
($fz = function (e) {
var status;
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
status =  new org.eclipse.core.runtime.MultiStatus ("org.eclipse.core.runtime", 2, org.eclipse.core.internal.runtime.Messages.jobs_internalError, e);
(status).merge ((e).getStatus ());
} else {
status =  new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 2, org.eclipse.core.internal.runtime.Messages.jobs_internalError, e);
}org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log (status);
}, $fz.isPrivate = true, $fz), "Throwable");
Clazz.defineMethod (c$, "handleInternalError", 
($fz = function (t) {
try {
org.eclipse.core.internal.jobs.LockManager.handleException (t);
this.locks.toDebugString ();
} catch (e2) {
if (Clazz.instanceOf (e2, Exception)) {
} else {
throw e2;
}
}
this.locks = null;
}, $fz.isPrivate = true, $fz), "Throwable");
Clazz.defineMethod (c$, "isEmpty", 
function () {
return this.locks.isEmpty ();
});
Clazz.defineMethod (c$, "isLockOwner", 
function () {
var current = Thread.currentThread ();
if (Clazz.instanceOf (current, org.eclipse.core.internal.jobs.Worker)) return true;
if (this.locks == null) return false;
{
return this.locks.contains (Thread.currentThread ());
}});
Clazz.defineMethod (c$, "newLock", 
function () {
return  new org.eclipse.core.internal.jobs.OrderedLock (this);
});
Clazz.defineMethod (c$, "removeLockCompletely", 
function (thread, rule) {
if (this.locks == null) return ;
try {
{
this.locks.lockReleasedCompletely (thread, rule);
}} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
this.handleInternalError (e);
} else {
throw e;
}
}
}, "Thread,org.eclipse.core.runtime.jobs.ISchedulingRule");
Clazz.defineMethod (c$, "removeLockThread", 
function (thread, lock) {
try {
{
this.locks.lockReleased (thread, lock);
}} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
this.handleInternalError (e);
} else {
throw e;
}
}
}, "Thread,org.eclipse.core.runtime.jobs.ISchedulingRule");
Clazz.defineMethod (c$, "removeLockWaitThread", 
function (thread, lock) {
try {
{
this.locks.lockWaitStop (thread, lock);
}} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
this.handleInternalError (e);
} else {
throw e;
}
}
}, "Thread,org.eclipse.core.runtime.jobs.ISchedulingRule");
Clazz.defineMethod (c$, "resumeSuspendedLocks", 
function (owner) {
var toResume;
{
var prevLocks = this.suspendedLocks.get (owner);
if (prevLocks == null) return ;
toResume = prevLocks.pop ();
if (prevLocks.empty ()) this.suspendedLocks.remove (owner);
}for (var i = 0; i < toResume.length; i++) toResume[i].resume ();

}, "Thread");
Clazz.defineMethod (c$, "setLockListener", 
function (listener) {
this.lockListener = listener;
}, "org.eclipse.core.runtime.jobs.LockListener");
});
