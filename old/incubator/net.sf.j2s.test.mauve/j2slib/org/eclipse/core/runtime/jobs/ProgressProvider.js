Clazz.declarePackage ("org.eclipse.core.runtime.jobs");
Clazz.load (null, "org.eclipse.core.runtime.jobs.ProgressProvider", ["org.eclipse.core.runtime.NullProgressMonitor", "$.SubProgressMonitor"], function () {
c$ = Clazz.declareType (org.eclipse.core.runtime.jobs, "ProgressProvider");
Clazz.defineMethod (c$, "createProgressGroup", 
function () {
return  new org.eclipse.core.runtime.NullProgressMonitor ();
});
Clazz.defineMethod (c$, "createMonitor", 
function (job, group, ticks) {
return  new org.eclipse.core.runtime.SubProgressMonitor (group, ticks);
}, "org.eclipse.core.runtime.jobs.Job,org.eclipse.core.runtime.IProgressMonitor,~N");
Clazz.defineMethod (c$, "getDefaultMonitor", 
function () {
return  new org.eclipse.core.runtime.NullProgressMonitor ();
});
});
