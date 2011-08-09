Clazz.declarePackage ("org.eclipse.core.internal.jobs");
Clazz.load (["org.eclipse.core.runtime.jobs.IJobChangeEvent"], "org.eclipse.core.internal.jobs.JobChangeEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.job = null;
this.result = null;
this.delay = -1;
this.reschedule = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.jobs, "JobChangeEvent", null, org.eclipse.core.runtime.jobs.IJobChangeEvent);
Clazz.overrideMethod (c$, "getDelay", 
function () {
return this.delay;
});
Clazz.overrideMethod (c$, "getJob", 
function () {
return this.job;
});
Clazz.overrideMethod (c$, "getResult", 
function () {
return this.result;
});
});
