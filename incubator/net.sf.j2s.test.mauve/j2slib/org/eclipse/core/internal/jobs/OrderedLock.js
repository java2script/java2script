Clazz.declarePackage ("org.eclipse.core.internal.jobs");
Clazz.load (["org.eclipse.core.runtime.jobs.ILock", "$.ISchedulingRule", "org.eclipse.core.internal.jobs.Queue"], "org.eclipse.core.internal.jobs.OrderedLock", ["java.lang.InterruptedException", "$.Thread", "org.eclipse.core.internal.jobs.Semaphore", "org.eclipse.core.internal.runtime.Assert"], function () {
c$ = Clazz.decorateAsClass (function () {
this.currentOperationThread = null;
this.depth = 0;
this.manager = null;
this.number = 0;
this.operations = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.jobs, "OrderedLock", null, [org.eclipse.core.runtime.jobs.ILock, org.eclipse.core.runtime.jobs.ISchedulingRule]);
Clazz.prepareFields (c$, function () {
this.operations =  new org.eclipse.core.internal.jobs.Queue ();
});
Clazz.makeConstructor (c$, 
function (manager) {
this.manager = manager;
this.number = ($t$ = org.eclipse.core.internal.jobs.OrderedLock.nextLockNumber ++, org.eclipse.core.internal.jobs.OrderedLock.prototype.nextLockNumber = org.eclipse.core.internal.jobs.OrderedLock.nextLockNumber, $t$);
}, "org.eclipse.core.internal.jobs.LockManager");
Clazz.defineMethod (c$, "acquire", 
function () {
while (true) {
try {
if (this.acquire (9223372036854775807)) return ;
} catch (e) {
if (Clazz.instanceOf (e, InterruptedException)) {
} else {
throw e;
}
}
}
});
Clazz.defineMethod (c$, "acquire", 
function (delay) {
if (Thread.interrupted ()) throw  new InterruptedException ();
var success = false;
if (delay <= 0) return this.attempt ();
var semaphore = this.createSemaphore ();
if (semaphore == null) return true;
if (false) System.out.println ("[" + Thread.currentThread () + "] Operation waiting to be executed... " + this);
success = this.doAcquire (semaphore, delay);
this.manager.resumeSuspendedLocks (Thread.currentThread ());
if (false && success) System.out.println ("[" + Thread.currentThread () + "] Operation started... " + this);
 else if (false) System.out.println ("[" + Thread.currentThread () + "] Operation timed out... " + this);
return success;
}, "~N");
Clazz.defineMethod (c$, "attempt", 
($fz = function () {
if ((this.currentOperationThread === Thread.currentThread ()) || (this.currentOperationThread == null && this.operations.isEmpty ())) {
this.depth++;
this.setCurrentOperationThread (Thread.currentThread ());
return true;
}return false;
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "contains", 
function (rule) {
return false;
}, "org.eclipse.core.runtime.jobs.ISchedulingRule");
Clazz.defineMethod (c$, "createSemaphore", 
($fz = function () {
return this.attempt () ? null : this.enqueue ( new org.eclipse.core.internal.jobs.Semaphore (Thread.currentThread ()));
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "doAcquire", 
($fz = function (semaphore, delay) {
var success = false;
if (this.manager.aboutToWait (this.currentOperationThread)) {
this.operations.remove (semaphore);
this.depth++;
this.manager.addLockThread (this.currentOperationThread, this);
return true;
}semaphore = this.createSemaphore ();
if (semaphore == null) return true;
this.manager.addLockWaitThread (Thread.currentThread (), this);
try {
success = semaphore.acquire (delay);
} catch (e) {
if (Clazz.instanceOf (e, InterruptedException)) {
if (false) System.out.println ("[" + Thread.currentThread () + "] Operation interrupted while waiting... :-|");
throw e;
} else {
throw e;
}
}
if (success) {
this.depth++;
this.updateCurrentOperation ();
} else {
this.operations.remove (semaphore);
this.manager.removeLockWaitThread (Thread.currentThread (), this);
}return success;
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.jobs.Semaphore,~N");
Clazz.defineMethod (c$, "doRelease", 
($fz = function () {
this.manager.aboutToRelease ();
this.depth = 0;
var next = this.operations.peek ();
this.setCurrentOperationThread (null);
if (next != null) next.release ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "enqueue", 
($fz = function (newSemaphore) {
var semaphore = this.operations.get (newSemaphore);
if (semaphore == null) {
this.operations.enqueue (newSemaphore);
return newSemaphore;
}return semaphore;
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.jobs.Semaphore");
Clazz.defineMethod (c$, "forceRelease", 
function () {
var oldDepth = this.depth;
this.doRelease ();
return oldDepth;
});
Clazz.overrideMethod (c$, "getDepth", 
function () {
return this.depth;
});
Clazz.overrideMethod (c$, "isConflicting", 
function (rule) {
return rule === this;
}, "org.eclipse.core.runtime.jobs.ISchedulingRule");
Clazz.overrideMethod (c$, "release", 
function () {
if (this.depth == 0) return ;
org.eclipse.core.internal.runtime.Assert.isTrue (this.depth >= 0, "Lock released too many times");
if (--this.depth == 0) this.doRelease ();
 else this.manager.removeLockThread (this.currentOperationThread, this);
});
Clazz.defineMethod (c$, "setCurrentOperationThread", 
($fz = function (newThread) {
if ((this.currentOperationThread != null) && (newThread == null)) this.manager.removeLockThread (this.currentOperationThread, this);
this.currentOperationThread = newThread;
if (this.currentOperationThread != null) this.manager.addLockThread (this.currentOperationThread, this);
}, $fz.isPrivate = true, $fz), "Thread");
Clazz.defineMethod (c$, "setDepth", 
function (newDepth) {
for (var i = this.depth; i < newDepth; i++) {
this.manager.addLockThread (this.currentOperationThread, this);
}
this.depth = newDepth;
}, "~N");
Clazz.overrideMethod (c$, "toString", 
function () {
return "OrderedLock (" + this.number + ")";
});
Clazz.defineMethod (c$, "updateCurrentOperation", 
($fz = function () {
this.operations.dequeue ();
this.setCurrentOperationThread (Thread.currentThread ());
}, $fz.isPrivate = true, $fz));
Clazz.defineStatics (c$,
"DEBUG", false,
"nextLockNumber", 0);
});
