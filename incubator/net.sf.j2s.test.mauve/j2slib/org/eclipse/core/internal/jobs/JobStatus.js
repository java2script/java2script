Clazz.declarePackage ("org.eclipse.core.internal.jobs");
Clazz.load (["org.eclipse.core.runtime.Status", "org.eclipse.core.runtime.jobs.IJobStatus"], "org.eclipse.core.internal.jobs.JobStatus", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.job = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.jobs, "JobStatus", org.eclipse.core.runtime.Status, org.eclipse.core.runtime.jobs.IJobStatus);
Clazz.makeConstructor (c$, 
function (severity, job, message) {
Clazz.superConstructor (this, org.eclipse.core.internal.jobs.JobStatus, [severity, "org.eclipse.core.runtime", 1, message, null]);
this.job = job;
}, "~N,org.eclipse.core.runtime.jobs.Job,~S");
Clazz.overrideMethod (c$, "getJob", 
function () {
return this.job;
});
});
