Clazz.declarePackage ("org.eclipse.core.runtime.jobs");
Clazz.load (["org.eclipse.core.runtime.jobs.IJobChangeListener"], "org.eclipse.core.runtime.jobs.JobChangeAdapter", null, function () {
c$ = Clazz.declareType (org.eclipse.core.runtime.jobs, "JobChangeAdapter", null, org.eclipse.core.runtime.jobs.IJobChangeListener);
Clazz.overrideMethod (c$, "aboutToRun", 
function (event) {
}, "org.eclipse.core.runtime.jobs.IJobChangeEvent");
Clazz.overrideMethod (c$, "awake", 
function (event) {
}, "org.eclipse.core.runtime.jobs.IJobChangeEvent");
Clazz.overrideMethod (c$, "done", 
function (event) {
}, "org.eclipse.core.runtime.jobs.IJobChangeEvent");
Clazz.overrideMethod (c$, "running", 
function (event) {
}, "org.eclipse.core.runtime.jobs.IJobChangeEvent");
Clazz.overrideMethod (c$, "scheduled", 
function (event) {
}, "org.eclipse.core.runtime.jobs.IJobChangeEvent");
Clazz.overrideMethod (c$, "sleeping", 
function (event) {
}, "org.eclipse.core.runtime.jobs.IJobChangeEvent");
});
