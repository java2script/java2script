Clazz.declarePackage ("org.eclipse.core.internal.jobs");
Clazz.load (null, "org.eclipse.core.internal.jobs.JobQueue", ["org.eclipse.core.internal.jobs.InternalJob", "org.eclipse.core.internal.runtime.Assert", "org.eclipse.core.runtime.Status"], function () {
c$ = Clazz.decorateAsClass (function () {
this.dummy = null;
this.allowConflictOvertaking = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.jobs, "JobQueue");
Clazz.makeConstructor (c$, 
function (allowConflictOvertaking) {
this.dummy = (function (i$, arg0, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.jobs.JobQueue$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.jobs, "JobQueue$1", org.eclipse.core.internal.jobs.InternalJob);
Clazz.overrideMethod (c$, "run", 
function (m) {
return org.eclipse.core.runtime.Status.OK_STATUS;
}, "org.eclipse.core.runtime.IProgressMonitor");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.jobs.JobQueue$1, i$, v$, arg0);
}) (this, "Queue-Head", null);
this.dummy.setNext (this.dummy);
this.dummy.setPrevious (this.dummy);
this.allowConflictOvertaking = allowConflictOvertaking;
}, "~B");
Clazz.defineMethod (c$, "clear", 
function () {
this.dummy.setNext (this.dummy);
this.dummy.setPrevious (this.dummy);
});
Clazz.defineMethod (c$, "dequeue", 
function () {
var toRemove = this.dummy.previous ();
if (toRemove === this.dummy) return null;
return toRemove.remove ();
});
Clazz.defineMethod (c$, "enqueue", 
function (newEntry) {
org.eclipse.core.internal.runtime.Assert.isTrue (newEntry.next () == null);
org.eclipse.core.internal.runtime.Assert.isTrue (newEntry.previous () == null);
var tail = this.dummy.next ();
while (tail !== this.dummy && tail.compareTo (newEntry) < 0 && (this.allowConflictOvertaking || !newEntry.isConflicting (tail))) tail = tail.next ();

newEntry.setNext (tail);
newEntry.setPrevious (tail.previous ());
tail.previous ().setNext (newEntry);
tail.setPrevious (newEntry);
}, "org.eclipse.core.internal.jobs.InternalJob");
Clazz.defineMethod (c$, "remove", 
function (toRemove) {
toRemove.remove ();
}, "org.eclipse.core.internal.jobs.InternalJob");
Clazz.defineMethod (c$, "resort", 
function (entry) {
this.remove (entry);
this.enqueue (entry);
}, "org.eclipse.core.internal.jobs.InternalJob");
Clazz.defineMethod (c$, "isEmpty", 
function () {
return this.dummy.next () === this.dummy;
});
Clazz.defineMethod (c$, "peek", 
function () {
return this.dummy.previous () === this.dummy ? null : this.dummy.previous ();
});
});
