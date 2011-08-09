Clazz.declarePackage ("org.eclipse.core.internal.jobs");
c$ = Clazz.decorateAsClass (function () {
this.threads = null;
this.candidate = null;
this.locks = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.jobs, "Deadlock");
Clazz.makeConstructor (c$, 
function (threads, locks, candidate) {
this.threads = threads;
this.locks = locks;
this.candidate = candidate;
}, "~A,~A,Thread");
Clazz.defineMethod (c$, "getLocks", 
function () {
return this.locks;
});
Clazz.defineMethod (c$, "getCandidate", 
function () {
return this.candidate;
});
Clazz.defineMethod (c$, "getThreads", 
function () {
return this.threads;
});
