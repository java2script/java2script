Clazz.declarePackage ("org.eclipse.core.internal.jobs");
Clazz.load (["java.util.ArrayList"], "org.eclipse.core.internal.jobs.DeadlockDetector", ["java.lang.IllegalStateException", "$.StringBuffer", "org.eclipse.core.internal.jobs.Deadlock", "$.JobManager", "org.eclipse.core.internal.runtime.Assert", "$.InternalPlatform", "org.eclipse.core.runtime.MultiStatus", "$.Status"], function () {
c$ = Clazz.decorateAsClass (function () {
this.graph = null;
this.locks = null;
this.lockThreads = null;
this.resize = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.jobs, "DeadlockDetector");
Clazz.prepareFields (c$, function () {
this.graph = org.eclipse.core.internal.jobs.DeadlockDetector.EMPTY_MATRIX;
this.locks =  new java.util.ArrayList ();
this.lockThreads =  new java.util.ArrayList ();
});
Clazz.defineMethod (c$, "addCycleThreads", 
($fz = function (deadlockedThreads, next) {
var blocking = this.blockingThreads (next);
if (blocking.length == 0) return false;
var inCycle = false;
for (var i = 0; i < blocking.length; i++) {
if (deadlockedThreads.contains (blocking[i])) {
inCycle = true;
} else {
deadlockedThreads.add (blocking[i]);
if (this.addCycleThreads (deadlockedThreads, blocking[i])) inCycle = true;
 else deadlockedThreads.remove (blocking[i]);
}}
return inCycle;
}, $fz.isPrivate = true, $fz), "java.util.ArrayList,Thread");
Clazz.defineMethod (c$, "blockingThreads", 
($fz = function (current) {
var lock = this.getWaitingLock (current);
return this.getThreadsOwningLock (lock);
}, $fz.isPrivate = true, $fz), "Thread");
Clazz.defineMethod (c$, "checkWaitCycles", 
($fz = function (waitingThreads, lockIndex) {
for (var i = 0; i < this.graph.length; i++) {
if (this.graph[i][lockIndex] > org.eclipse.core.internal.jobs.DeadlockDetector.NO_STATE) {
if (waitingThreads[i] > org.eclipse.core.internal.jobs.DeadlockDetector.NO_STATE) {
return true;
}waitingThreads[i]++;
for (var j = 0; j < this.graph[i].length; j++) {
if (this.graph[i][j] == org.eclipse.core.internal.jobs.DeadlockDetector.WAITING_FOR_LOCK) {
if (this.checkWaitCycles (waitingThreads, j)) return true;
}}
waitingThreads[i]--;
}}
return false;
}, $fz.isPrivate = true, $fz), "~A,~N");
Clazz.defineMethod (c$, "contains", 
function (t) {
return this.lockThreads.contains (t);
}, "Thread");
Clazz.defineMethod (c$, "fillPresentEntries", 
($fz = function (newLock, lockIndex) {
for (var j = 0; j < this.locks.size (); j++) {
if ((j != lockIndex) && (newLock.isConflicting (this.locks.get (j)))) {
for (var i = 0; i < this.graph.length; i++) {
if ((this.graph[i][j] > org.eclipse.core.internal.jobs.DeadlockDetector.NO_STATE) && (this.graph[i][lockIndex] == org.eclipse.core.internal.jobs.DeadlockDetector.NO_STATE)) this.graph[i][lockIndex] = this.graph[i][j];
}
}}
for (var j = 0; j < this.locks.size (); j++) {
if ((j != lockIndex) && (newLock.isConflicting (this.locks.get (j)))) {
for (var i = 0; i < this.graph.length; i++) {
if ((this.graph[i][lockIndex] > org.eclipse.core.internal.jobs.DeadlockDetector.NO_STATE) && (this.graph[i][j] == org.eclipse.core.internal.jobs.DeadlockDetector.NO_STATE)) this.graph[i][j] = this.graph[i][lockIndex];
}
}}
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.jobs.ISchedulingRule,~N");
Clazz.defineMethod (c$, "getOwnedLocks", 
($fz = function (current) {
var ownedLocks =  new java.util.ArrayList (1);
var index = this.indexOf (current, false);
for (var j = 0; j < this.graph[index].length; j++) {
if (this.graph[index][j] > org.eclipse.core.internal.jobs.DeadlockDetector.NO_STATE) ownedLocks.add (this.locks.get (j));
}
if (ownedLocks.size () == 0) org.eclipse.core.internal.runtime.Assert.isLegal (false, "A thread with no locks is part of a deadlock.");
return ownedLocks.toArray ();
}, $fz.isPrivate = true, $fz), "Thread");
Clazz.defineMethod (c$, "getThreadsInDeadlock", 
($fz = function (cause) {
var deadlockedThreads =  new java.util.ArrayList (2);
if (this.ownsLocks (cause)) deadlockedThreads.add (cause);
this.addCycleThreads (deadlockedThreads, cause);
return deadlockedThreads.toArray ( new Array (deadlockedThreads.size ()));
}, $fz.isPrivate = true, $fz), "Thread");
Clazz.defineMethod (c$, "getThreadsOwningLock", 
($fz = function (rule) {
if (rule == null) return  new Array (0);
var lockIndex = this.indexOf (rule, false);
var blocking =  new java.util.ArrayList (1);
for (var i = 0; i < this.graph.length; i++) {
if (this.graph[i][lockIndex] > org.eclipse.core.internal.jobs.DeadlockDetector.NO_STATE) blocking.add (this.lockThreads.get (i));
}
if ((blocking.size () == 0) && (org.eclipse.core.internal.jobs.JobManager.DEBUG_LOCKS)) System.out.println ("Lock " + rule + " is involved in deadlock but is not owned by any thread.");
if ((blocking.size () > 1) && (Clazz.instanceOf (rule, org.eclipse.core.runtime.jobs.ILock)) && (org.eclipse.core.internal.jobs.JobManager.DEBUG_LOCKS)) System.out.println ("Lock " + rule + " is owned by more than 1 thread, but it is not a rule.");
return blocking.toArray ( new Array (blocking.size ()));
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.jobs.ISchedulingRule");
Clazz.defineMethod (c$, "getWaitingLock", 
($fz = function (current) {
var index = this.indexOf (current, false);
for (var j = 0; j < this.graph[index].length; j++) {
if (this.graph[index][j] == org.eclipse.core.internal.jobs.DeadlockDetector.WAITING_FOR_LOCK) return this.locks.get (j);
}
return null;
}, $fz.isPrivate = true, $fz), "Thread");
Clazz.defineMethod (c$, "indexOf", 
($fz = function (lock, add) {
var index = this.locks.indexOf (lock);
if ((index < 0) && add) {
this.locks.add (lock);
this.resize = true;
index = this.locks.size () - 1;
}return index;
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.jobs.ISchedulingRule,~B");
Clazz.defineMethod (c$, "indexOf", 
($fz = function (owner, add) {
var index = this.lockThreads.indexOf (owner);
if ((index < 0) && add) {
this.lockThreads.add (owner);
this.resize = true;
index = this.lockThreads.size () - 1;
}return index;
}, $fz.isPrivate = true, $fz), "Thread,~B");
Clazz.defineMethod (c$, "isEmpty", 
function () {
return (this.locks.size () == 0) && (this.lockThreads.size () == 0) && (this.graph.length == 0);
});
Clazz.defineMethod (c$, "lockAcquired", 
function (owner, lock) {
var lockIndex = this.indexOf (lock, true);
var threadIndex = this.indexOf (owner, true);
if (this.resize) this.resizeGraph ();
if (this.graph[threadIndex][lockIndex] == org.eclipse.core.internal.jobs.DeadlockDetector.WAITING_FOR_LOCK) this.graph[threadIndex][lockIndex] = org.eclipse.core.internal.jobs.DeadlockDetector.NO_STATE;
var conflicting =  new java.util.ArrayList (1);
var NUM_PASSES = 2;
conflicting.add (lock);
this.graph[threadIndex][lockIndex]++;
for (var i = 0; i < NUM_PASSES; i++) {
for (var k = 0; k < conflicting.size (); k++) {
var current = conflicting.get (k);
for (var j = 0; j < this.locks.size (); j++) {
var possible = this.locks.get (j);
if (current.isConflicting (possible) && !conflicting.contains (possible)) {
conflicting.add (possible);
this.graph[threadIndex][j]++;
}}
}
}
}, "Thread,org.eclipse.core.runtime.jobs.ISchedulingRule");
Clazz.defineMethod (c$, "lockReleased", 
function (owner, lock) {
var lockIndex = this.indexOf (lock, false);
var threadIndex = this.indexOf (owner, false);
if (threadIndex < 0) {
if (org.eclipse.core.internal.jobs.JobManager.DEBUG_LOCKS) System.out.println ("[lockReleased] Lock " + lock + " was already released by thread " + owner.getName ());
return ;
}if (lockIndex < 0) {
if (org.eclipse.core.internal.jobs.JobManager.DEBUG_LOCKS) System.out.println ("[lockReleased] Thread " + owner.getName () + " already released lock " + lock);
return ;
}if ((Clazz.instanceOf (lock, org.eclipse.core.runtime.jobs.ILock)) && (this.graph[threadIndex][lockIndex] == org.eclipse.core.internal.jobs.DeadlockDetector.WAITING_FOR_LOCK)) {
this.graph[threadIndex][lockIndex] = org.eclipse.core.internal.jobs.DeadlockDetector.NO_STATE;
return ;
}for (var j = 0; j < this.graph[threadIndex].length; j++) {
if ((lock.isConflicting (this.locks.get (j))) || (!(Clazz.instanceOf (lock, org.eclipse.core.runtime.jobs.ILock)) && !(Clazz.instanceOf (this.locks.get (j), org.eclipse.core.runtime.jobs.ILock)) && (this.graph[threadIndex][j] > org.eclipse.core.internal.jobs.DeadlockDetector.NO_STATE))) {
if (this.graph[threadIndex][j] == org.eclipse.core.internal.jobs.DeadlockDetector.NO_STATE) {
if (org.eclipse.core.internal.jobs.JobManager.DEBUG_LOCKS) System.out.println ("[lockReleased] More releases than acquires for thread " + owner.getName () + " and lock " + lock);
} else {
this.graph[threadIndex][j]--;
}}}
if (this.graph[threadIndex][lockIndex] == org.eclipse.core.internal.jobs.DeadlockDetector.NO_STATE) this.reduceGraph (threadIndex, lock);
}, "Thread,org.eclipse.core.runtime.jobs.ISchedulingRule");
Clazz.defineMethod (c$, "lockReleasedCompletely", 
function (owner, rule) {
var ruleIndex = this.indexOf (rule, false);
var threadIndex = this.indexOf (owner, false);
if (threadIndex < 0) {
if (org.eclipse.core.internal.jobs.JobManager.DEBUG_LOCKS) System.out.println ("[lockReleasedCompletely] Lock " + rule + " was already released by thread " + owner.getName ());
return ;
}if (ruleIndex < 0) {
if (org.eclipse.core.internal.jobs.JobManager.DEBUG_LOCKS) System.out.println ("[lockReleasedCompletely] Thread " + owner.getName () + " already released lock " + rule);
return ;
}for (var j = 0; j < this.graph[threadIndex].length; j++) {
if (!(Clazz.instanceOf (this.locks.get (j), org.eclipse.core.runtime.jobs.ILock)) && (this.graph[threadIndex][j] > org.eclipse.core.internal.jobs.DeadlockDetector.NO_STATE)) this.graph[threadIndex][j] = org.eclipse.core.internal.jobs.DeadlockDetector.NO_STATE;
}
this.reduceGraph (threadIndex, rule);
}, "Thread,org.eclipse.core.runtime.jobs.ISchedulingRule");
Clazz.defineMethod (c$, "lockWaitStart", 
function (client, lock) {
this.setToWait (client, lock, false);
var lockIndex = this.indexOf (lock, false);
var temp =  Clazz.newArray (this.lockThreads.size (), 0);
if (!this.checkWaitCycles (temp, lockIndex)) return null;
var threads = this.getThreadsInDeadlock (client);
var candidate = this.resolutionCandidate (threads);
var locksToSuspend = this.realLocksForThread (candidate);
var deadlock =  new org.eclipse.core.internal.jobs.Deadlock (threads, locksToSuspend, candidate);
if (org.eclipse.core.internal.jobs.JobManager.DEBUG_LOCKS) this.reportDeadlock (deadlock);
if (org.eclipse.core.internal.jobs.JobManager.DEBUG_DEADLOCK) throw  new IllegalStateException ("Deadlock detected. Caused by thread " + client.getName () + '.');
for (var i = 0; i < locksToSuspend.length; i++) this.setToWait (deadlock.getCandidate (), locksToSuspend[i], true);

return deadlock;
}, "Thread,org.eclipse.core.runtime.jobs.ISchedulingRule");
Clazz.defineMethod (c$, "lockWaitStop", 
function (owner, lock) {
var lockIndex = this.indexOf (lock, false);
var threadIndex = this.indexOf (owner, false);
if (threadIndex < 0) {
if (org.eclipse.core.internal.jobs.JobManager.DEBUG_LOCKS) System.out.println ("Thread " + owner.getName () + " was already removed.");
return ;
}if (lockIndex < 0) {
if (org.eclipse.core.internal.jobs.JobManager.DEBUG_LOCKS) System.out.println ("Lock " + lock + " was already removed.");
return ;
}if (this.graph[threadIndex][lockIndex] != org.eclipse.core.internal.jobs.DeadlockDetector.WAITING_FOR_LOCK) org.eclipse.core.internal.runtime.Assert.isTrue (false, "Thread " + owner.getName () + " was not waiting for lock " + lock.toString () + " so it could not time out.");
this.graph[threadIndex][lockIndex] = org.eclipse.core.internal.jobs.DeadlockDetector.NO_STATE;
this.reduceGraph (threadIndex, lock);
}, "Thread,org.eclipse.core.runtime.jobs.ISchedulingRule");
Clazz.defineMethod (c$, "ownsLocks", 
($fz = function (cause) {
var threadIndex = this.indexOf (cause, false);
for (var j = 0; j < this.graph[threadIndex].length; j++) {
if (this.graph[threadIndex][j] > org.eclipse.core.internal.jobs.DeadlockDetector.NO_STATE) return true;
}
return false;
}, $fz.isPrivate = true, $fz), "Thread");
Clazz.defineMethod (c$, "ownsRealLocks", 
($fz = function (owner) {
var threadIndex = this.indexOf (owner, false);
for (var j = 0; j < this.graph[threadIndex].length; j++) {
if (this.graph[threadIndex][j] > org.eclipse.core.internal.jobs.DeadlockDetector.NO_STATE) {
var lock = this.locks.get (j);
if (Clazz.instanceOf (lock, org.eclipse.core.runtime.jobs.ILock)) return true;
}}
return false;
}, $fz.isPrivate = true, $fz), "Thread");
Clazz.defineMethod (c$, "ownsRuleLocks", 
($fz = function (owner) {
var threadIndex = this.indexOf (owner, false);
for (var j = 0; j < this.graph[threadIndex].length; j++) {
if (this.graph[threadIndex][j] > org.eclipse.core.internal.jobs.DeadlockDetector.NO_STATE) {
var lock = this.locks.get (j);
if (!(Clazz.instanceOf (lock, org.eclipse.core.runtime.jobs.ILock))) return true;
}}
return false;
}, $fz.isPrivate = true, $fz), "Thread");
Clazz.defineMethod (c$, "realLocksForThread", 
($fz = function (owner) {
var threadIndex = this.indexOf (owner, false);
var ownedLocks =  new java.util.ArrayList (1);
for (var j = 0; j < this.graph[threadIndex].length; j++) {
if ((this.graph[threadIndex][j] > org.eclipse.core.internal.jobs.DeadlockDetector.NO_STATE) && (Clazz.instanceOf (this.locks.get (j), org.eclipse.core.runtime.jobs.ILock))) ownedLocks.add (this.locks.get (j));
}
if (ownedLocks.size () == 0) org.eclipse.core.internal.runtime.Assert.isLegal (false, "A thread with no real locks was chosen to resolve deadlock.");
return ownedLocks.toArray ( new Array (ownedLocks.size ()));
}, $fz.isPrivate = true, $fz), "Thread");
Clazz.defineMethod (c$, "reduceGraph", 
($fz = function (row, lock) {
var numLocks = this.locks.size ();
var emptyColumns =  Clazz.newArray (numLocks, false);
for (var j = 0; j < numLocks; j++) {
if ((lock.isConflicting (this.locks.get (j))) || !(Clazz.instanceOf (this.locks.get (j), org.eclipse.core.runtime.jobs.ILock))) emptyColumns[j] = true;
}
var rowEmpty = true;
var numEmpty = 0;
for (var j = 0; j < this.graph[row].length; j++) {
if (this.graph[row][j] != org.eclipse.core.internal.jobs.DeadlockDetector.NO_STATE) {
rowEmpty = false;
break;
}}
for (var j = emptyColumns.length - 1; j >= 0; j--) {
for (var i = 0; i < this.graph.length; i++) {
if (emptyColumns[j] && (this.graph[i][j] != org.eclipse.core.internal.jobs.DeadlockDetector.NO_STATE)) {
emptyColumns[j] = false;
break;
}}
if (emptyColumns[j]) {
this.locks.remove (j);
numEmpty++;
}}
if ((numEmpty == 0) && (!rowEmpty)) return ;
if (rowEmpty) this.lockThreads.remove (row);
var numThreads = this.lockThreads.size ();
numLocks = this.locks.size ();
if (numThreads == 0 && numLocks == 0) {
this.graph = org.eclipse.core.internal.jobs.DeadlockDetector.EMPTY_MATRIX;
return ;
}var tempGraph =  Clazz.newArray (numThreads, numLocks, 0);
var numRowsSkipped = 0;
for (var i = 0; i < this.graph.length - numRowsSkipped; i++) {
if ((i == row) && rowEmpty) {
numRowsSkipped++;
if (i >= this.graph.length - numRowsSkipped) break;
}var numColsSkipped = 0;
for (var j = 0; j < this.graph[i].length - numColsSkipped; j++) {
while (emptyColumns[j + numColsSkipped]) {
numColsSkipped++;
if (j >= this.graph[i].length - numColsSkipped) break;
}
if (j >= this.graph[i].length - numColsSkipped) break;
tempGraph[i][j] = this.graph[i + numRowsSkipped][j + numColsSkipped];
}
}
this.graph = tempGraph;
org.eclipse.core.internal.runtime.Assert.isTrue (numThreads == this.graph.length, "Rows and threads don't match.");
org.eclipse.core.internal.runtime.Assert.isTrue (numLocks == ((this.graph.length > 0) ? this.graph[0].length : 0), "Columns and locks don't match.");
}, $fz.isPrivate = true, $fz), "~N,org.eclipse.core.runtime.jobs.ISchedulingRule");
Clazz.defineMethod (c$, "reportDeadlock", 
($fz = function (deadlock) {
var msg = "Deadlock detected. All locks owned by thread " + deadlock.getCandidate ().getName () + " will be suspended.";
var main =  new org.eclipse.core.runtime.MultiStatus ("org.eclipse.core.runtime", 2, msg,  new IllegalStateException ());
var threads = deadlock.getThreads ();
for (var i = 0; i < threads.length; i++) {
var ownedLocks = this.getOwnedLocks (threads[i]);
var waitLock = this.getWaitingLock (threads[i]);
var buf =  new StringBuffer ("Thread ");
buf.append (threads[i].getName ());
buf.append (" has locks: ");
for (var j = 0; j < ownedLocks.length; j++) {
buf.append (ownedLocks[j]);
buf.append ((j < ownedLocks.length - 1) ? ", " : " ");
}
buf.append ("and is waiting for lock ");
buf.append (waitLock);
var child =  new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 2, buf.toString (), null);
main.add (child);
}
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log (main);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.jobs.Deadlock");
Clazz.defineMethod (c$, "resizeGraph", 
($fz = function () {
var newRows = this.lockThreads.size ();
var newCols = this.locks.size ();
if (newRows == 0 && newCols == 0) {
this.graph = org.eclipse.core.internal.jobs.DeadlockDetector.EMPTY_MATRIX;
return ;
}var tempGraph =  Clazz.newArray (newRows, newCols, 0);
for (var i = 0; i < this.graph.length; i++) System.arraycopy (this.graph[i], 0, tempGraph[i], 0, this.graph[i].length);

this.graph = tempGraph;
this.resize = false;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "resolutionCandidate", 
($fz = function (candidates) {
for (var i = 0; i < candidates.length; i++) {
if (!this.ownsRuleLocks (candidates[i])) return candidates[i];
}
for (var i = 0; i < candidates.length; i++) {
if (this.ownsRealLocks (candidates[i])) return candidates[i];
}
return candidates[0];
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "setToWait", 
($fz = function (owner, lock, suspend) {
var needTransfer = false;
if (!suspend && !(Clazz.instanceOf (lock, org.eclipse.core.runtime.jobs.ILock))) needTransfer = true;
var lockIndex = this.indexOf (lock, !suspend);
var threadIndex = this.indexOf (owner, !suspend);
if (this.resize) this.resizeGraph ();
this.graph[threadIndex][lockIndex] = org.eclipse.core.internal.jobs.DeadlockDetector.WAITING_FOR_LOCK;
if (needTransfer) this.fillPresentEntries (lock, lockIndex);
}, $fz.isPrivate = true, $fz), "Thread,org.eclipse.core.runtime.jobs.ISchedulingRule,~B");
Clazz.defineMethod (c$, "toDebugString", 
function () {
System.out.println (" :: ");
for (var j = 0; j < this.locks.size (); j++) {
System.out.print (" " + this.locks.get (j) + ',');
}
System.out.println ();
for (var i = 0; i < this.graph.length; i++) {
System.out.print (" " + (this.lockThreads.get (i)).getName () + " : ");
for (var j = 0; j < this.graph[i].length; j++) {
System.out.print (" " + this.graph[i][j] + ',');
}
System.out.println ();
}
System.out.println ("-------");
});
Clazz.defineStatics (c$,
"NO_STATE", 0,
"WAITING_FOR_LOCK", -1,
"EMPTY_MATRIX",  Clazz.newArray (0, 0, 0));
});
