Clazz.declarePackage ("org.eclipse.core.internal.runtime");
Clazz.load (["org.eclipse.core.runtime.jobs.Job", "java.util.ArrayList", "$.HashMap", "org.eclipse.core.internal.runtime.ListenerList"], "org.eclipse.core.internal.runtime.PerformanceStatsProcessor", ["java.lang.Boolean", "$.Long", "$.RuntimeException", "org.eclipse.core.internal.runtime.InternalPlatform", "$.PlatformActivator", "$.PlatformLogWriter", "org.eclipse.core.runtime.PerformanceStats", "$.Platform", "$.Status", "org.eclipse.osgi.framework.log.FrameworkLog"], function () {
c$ = Clazz.decorateAsClass (function () {
this.changes = null;
this.failures = null;
this.$listeners = null;
this.log = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.runtime, "PerformanceStatsProcessor", org.eclipse.core.runtime.jobs.Job);
Clazz.prepareFields (c$, function () {
this.changes =  new java.util.ArrayList ();
this.failures =  new java.util.HashMap ();
this.$listeners =  new org.eclipse.core.internal.runtime.ListenerList ();
});
c$.addListener = Clazz.defineMethod (c$, "addListener", 
function (listener) {
org.eclipse.core.internal.runtime.PerformanceStatsProcessor.instance.$listeners.add (listener);
}, "org.eclipse.core.runtime.PerformanceStats.PerformanceListener");
c$.changed = Clazz.defineMethod (c$, "changed", 
function (stats) {
{
org.eclipse.core.internal.runtime.PerformanceStatsProcessor.instance.changes.add (stats);
}org.eclipse.core.internal.runtime.PerformanceStatsProcessor.instance.schedule (2000);
}, "org.eclipse.core.runtime.PerformanceStats");
c$.failed = Clazz.defineMethod (c$, "failed", 
function (stats, pluginId, elapsed) {
{
org.eclipse.core.internal.runtime.PerformanceStatsProcessor.instance.failures.put (stats,  new Long (elapsed));
}org.eclipse.core.internal.runtime.PerformanceStatsProcessor.instance.schedule (2000);
org.eclipse.core.internal.runtime.PerformanceStatsProcessor.instance.logFailure (stats, pluginId, elapsed);
}, "org.eclipse.core.runtime.PerformanceStats,~S,~N");
c$.printStats = Clazz.defineMethod (c$, "printStats", 
function (out) {
var totalTime = 0;
var totalCount = 0;
var allStats = org.eclipse.core.runtime.PerformanceStats.getAllStats ();
for (var i = 0; i < allStats.length; i++) {
var stats = allStats[i];
totalTime += stats.getRunningTime ();
totalCount += stats.getRunCount ();
}
out.println ("---------------------------------------------------------------");
for (var i = 0; i < allStats.length; i++) {
var stats = allStats[i];
out.print ("Event: ");
out.print (stats.getEvent ());
out.print (" Blame: ");
out.print (stats.getBlameString ());
if (stats.getContext () != null) {
out.print (" Context: ");
out.print (stats.getContext ());
}out.println ();
var runCount = stats.getRunCount ();
if (runCount > 0) {
out.print ("Run count: ");
out.print (Integer.toString (runCount));
out.print (" (");
out.print (Integer.toString (Math.round ((runCount * 100.0 / totalCount))));
out.println (" % of total)");
}var runTime = stats.getRunningTime ();
if (runTime > 0) {
out.print ("Duration (ms): ");
out.print (Long.toString (runTime));
out.print (" (");
out.print (Integer.toString (Math.round ((runTime * 100.0 / totalTime))));
out.println (" % of total)");
}out.println ("");
}
}, "java.io.PrintWriter");
c$.removeListener = Clazz.defineMethod (c$, "removeListener", 
function (listener) {
org.eclipse.core.internal.runtime.PerformanceStatsProcessor.instance.$listeners.remove (listener);
}, "org.eclipse.core.runtime.PerformanceStats.PerformanceListener");
Clazz.makeConstructor (c$, 
($fz = function () {
Clazz.superConstructor (this, org.eclipse.core.internal.runtime.PerformanceStatsProcessor, ["Performance Stats"]);
this.setSystem (true);
this.setPriority (50);
var context = org.eclipse.core.internal.runtime.PlatformActivator.getContext ();
var filter = '(' + "performance" + '=' + Boolean.TRUE.toString () + ')';
var references;
var perfLog = null;
try {
references = context.getServiceReferences (org.eclipse.osgi.framework.log.FrameworkLog.getName (), filter);
if (references != null && references.length > 0) {
perfLog = context.getService (references[0]);
var logLocation = org.eclipse.core.runtime.Platform.getLogFileLocation ();
logLocation = logLocation.removeLastSegments (1).append ("performance.log");
perfLog.setFile (logLocation.toFile (), false);
}} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
var error =  new org.eclipse.core.runtime.Status (4, "org.eclipse.core.runtime", 1, "Error loading performance log", e);
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().log (error);
} else {
throw e;
}
}
if (perfLog == null) perfLog = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getFrameworkLog ();
this.log =  new org.eclipse.core.internal.runtime.PlatformLogWriter (perfLog);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "logFailure", 
($fz = function (stats, pluginId, elapsed) {
if (this.log == null) return ;
if (pluginId == null) pluginId = "org.eclipse.core.runtime";
var msg = "Performance failure: " + stats.getEvent () + " blame: " + stats.getBlameString () + " context: " + stats.getContext () + " duration: " + elapsed;
this.log.logging ( new org.eclipse.core.runtime.Status (2, pluginId, 1, msg,  new RuntimeException ()), pluginId);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.PerformanceStats,~S,~N");
Clazz.overrideMethod (c$, "run", 
function (monitor) {
var events;
var failedEvents;
var failedTimes;
{
events = this.changes.toArray ( new Array (this.changes.size ()));
this.changes.clear ();
failedEvents = this.failures.keySet ().toArray ( new Array (this.failures.size ()));
failedTimes = this.failures.values ().toArray ( new Array (this.failures.size ()));
this.failures.clear ();
}var toNotify = this.$listeners.getListeners ();
for (var i = 0; i < toNotify.length; i++) {
var listener = (toNotify[i]);
if (events.length > 0) listener.eventsOccurred (events);
for (var j = 0; j < failedEvents.length; j++) listener.eventFailed (failedEvents[j], failedTimes[j].longValue ());

}
this.schedule (2000);
return org.eclipse.core.runtime.Status.OK_STATUS;
}, "org.eclipse.core.runtime.IProgressMonitor");
Clazz.overrideMethod (c$, "shouldRun", 
function () {
return !this.changes.isEmpty () || !this.failures.isEmpty ();
});
c$.instance = c$.prototype.instance =  new org.eclipse.core.internal.runtime.PerformanceStatsProcessor ();
Clazz.defineStatics (c$,
"SCHEDULE_DELAY", 2000);
});
