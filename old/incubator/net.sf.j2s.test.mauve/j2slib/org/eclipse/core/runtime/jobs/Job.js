Clazz.declarePackage ("org.eclipse.core.runtime.jobs");
Clazz.load (["org.eclipse.core.internal.jobs.InternalJob", "org.eclipse.core.runtime.IAdaptable", "$.Status"], "org.eclipse.core.runtime.jobs.Job", null, function () {
c$ = Clazz.declareType (org.eclipse.core.runtime.jobs, "Job", org.eclipse.core.internal.jobs.InternalJob, org.eclipse.core.runtime.IAdaptable);
Clazz.overrideMethod (c$, "belongsTo", 
function (family) {
return false;
}, "~O");
Clazz.defineMethod (c$, "schedule", 
function () {
Clazz.superCall (this, org.eclipse.core.runtime.jobs.Job, "schedule", [0]);
});
Clazz.defineMethod (c$, "shouldRun", 
function () {
return true;
});
Clazz.overrideMethod (c$, "shouldSchedule", 
function () {
return true;
});
Clazz.defineMethod (c$, "wakeUp", 
function () {
Clazz.superCall (this, org.eclipse.core.runtime.jobs.Job, "wakeUp", [0]);
});
c$.ASYNC_FINISH = c$.prototype.ASYNC_FINISH =  new org.eclipse.core.runtime.Status (0, "org.eclipse.core.runtime", 1, "", null);
Clazz.defineStatics (c$,
"INTERACTIVE", 10,
"SHORT", 20,
"LONG", 30,
"BUILD", 40,
"DECORATE", 50,
"NONE", 0,
"SLEEPING", 0x01,
"WAITING", 0x02,
"RUNNING", 0x04);
});
