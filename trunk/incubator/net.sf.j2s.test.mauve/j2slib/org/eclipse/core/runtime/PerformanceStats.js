Clazz.declarePackage ("org.eclipse.core.runtime");
Clazz.load (["java.util.Collections", "$.HashMap"], "org.eclipse.core.runtime.PerformanceStats", ["java.io.PrintWriter", "java.lang.Long", "$.StringBuffer", "org.eclipse.core.internal.runtime.InternalPlatform", "$.PerformanceStatsProcessor", "org.eclipse.core.runtime.Platform"], function () {
c$ = Clazz.decorateAsClass (function () {
this.blame = null;
this.blamePluginId = null;
this.context = null;
this.currentStart = -1;
this.event = null;
this.$isFailure = false;
this.runCount = 0;
this.runningTime = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime, "PerformanceStats");
Clazz.pu$h ();
c$ = Clazz.declareType (org.eclipse.core.runtime.PerformanceStats, "PerformanceListener");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "eventFailed", 
function (a, b) {
}, "org.eclipse.core.runtime.PerformanceStats,~N");
Clazz.defineMethod (c$, "eventsOccurred", 
function (a) {
}, "~A");
c$ = Clazz.p0p ();
c$.addListener = Clazz.defineMethod (c$, "addListener", 
function (listener) {
if (org.eclipse.core.runtime.PerformanceStats.ENABLED) org.eclipse.core.internal.runtime.PerformanceStatsProcessor.addListener (listener);
}, "org.eclipse.core.runtime.PerformanceStats.PerformanceListener");
c$.clear = Clazz.defineMethod (c$, "clear", 
function () {
org.eclipse.core.runtime.PerformanceStats.statMap.clear ();
});
c$.getAllStats = Clazz.defineMethod (c$, "getAllStats", 
function () {
return org.eclipse.core.runtime.PerformanceStats.statMap.values ().toArray ( new Array (org.eclipse.core.runtime.PerformanceStats.statMap.values ().size ()));
});
c$.getStats = Clazz.defineMethod (c$, "getStats", 
function (eventName, blameObject) {
if (!org.eclipse.core.runtime.PerformanceStats.ENABLED || eventName == null || blameObject == null) return org.eclipse.core.runtime.PerformanceStats.EMPTY_STATS;
var newStats =  new org.eclipse.core.runtime.PerformanceStats (eventName, blameObject);
if (!org.eclipse.core.runtime.PerformanceStats.TRACE_SUCCESS) return newStats;
var oldStats = org.eclipse.core.runtime.PerformanceStats.statMap.get (newStats);
if (oldStats != null) return oldStats;
org.eclipse.core.runtime.PerformanceStats.statMap.put (newStats, newStats);
return newStats;
}, "~S,~O");
c$.isEnabled = Clazz.defineMethod (c$, "isEnabled", 
function (eventName) {
if (!org.eclipse.core.runtime.PerformanceStats.ENABLED) return false;
var option = org.eclipse.core.runtime.Platform.getDebugOption (eventName);
return option != null && !option.equalsIgnoreCase ("false") && !option.equalsIgnoreCase ("-1");
}, "~S");
c$.printStats = Clazz.defineMethod (c$, "printStats", 
function () {
if (!org.eclipse.core.runtime.PerformanceStats.ENABLED) return ;
var writer =  new java.io.PrintWriter (System.out);
org.eclipse.core.internal.runtime.PerformanceStatsProcessor.printStats (writer);
writer.flush ();
writer.close ();
});
c$.printStats = Clazz.defineMethod (c$, "printStats", 
function (out) {
if (!org.eclipse.core.runtime.PerformanceStats.ENABLED) return ;
org.eclipse.core.internal.runtime.PerformanceStatsProcessor.printStats (out);
}, "java.io.PrintWriter");
c$.removeListener = Clazz.defineMethod (c$, "removeListener", 
function (listener) {
if (org.eclipse.core.runtime.PerformanceStats.ENABLED) org.eclipse.core.internal.runtime.PerformanceStatsProcessor.removeListener (listener);
}, "org.eclipse.core.runtime.PerformanceStats.PerformanceListener");
c$.removeStats = Clazz.defineMethod (c$, "removeStats", 
function (eventName, blameObject) {
{
for (var it = org.eclipse.core.runtime.PerformanceStats.statMap.keySet ().iterator (); it.hasNext (); ) {
var stats = it.next ();
if (stats.getEvent ().equals (eventName) && stats.getBlame ().equals (blameObject)) it.remove ();
}
}}, "~S,~O");
Clazz.makeConstructor (c$, 
($fz = function (event, blame) {
this.construct (event, blame, null);
}, $fz.isPrivate = true, $fz), "~S,~O");
Clazz.makeConstructor (c$, 
($fz = function (event, blameObject, context) {
this.event = event;
this.blame = Clazz.instanceOf (blameObject, String) ? blameObject : blameObject.getClass ().getName ();
this.blamePluginId = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getBundleId (blameObject);
this.context = context;
}, $fz.isPrivate = true, $fz), "~S,~O,~S");
Clazz.defineMethod (c$, "addRun", 
function (elapsed, contextName) {
if (!org.eclipse.core.runtime.PerformanceStats.ENABLED) return ;
this.runCount++;
this.runningTime += elapsed;
if (elapsed > this.getThreshold (this.event)) org.eclipse.core.internal.runtime.PerformanceStatsProcessor.failed (this.createFailureStats (contextName, elapsed), this.blamePluginId, elapsed);
if (org.eclipse.core.runtime.PerformanceStats.TRACE_SUCCESS) org.eclipse.core.internal.runtime.PerformanceStatsProcessor.changed (this);
}, "~N,~S");
Clazz.defineMethod (c$, "createFailureStats", 
($fz = function (contextName, elapsed) {
var failedStat =  new org.eclipse.core.runtime.PerformanceStats (this.event, this.blame, contextName);
var old = org.eclipse.core.runtime.PerformanceStats.statMap.get (failedStat);
if (old == null) org.eclipse.core.runtime.PerformanceStats.statMap.put (failedStat, failedStat);
 else failedStat = old;
failedStat.$isFailure = true;
failedStat.runCount++;
failedStat.runningTime += elapsed;
return failedStat;
}, $fz.isPrivate = true, $fz), "~S,~N");
Clazz.defineMethod (c$, "endRun", 
function () {
if (!org.eclipse.core.runtime.PerformanceStats.ENABLED || this.currentStart == -1) return ;
this.addRun (System.currentTimeMillis () - this.currentStart, this.context);
this.currentStart = -1;
});
Clazz.defineMethod (c$, "equals", 
function (obj) {
if (!(Clazz.instanceOf (obj, org.eclipse.core.runtime.PerformanceStats))) return false;
var that = obj;
if (!this.event.equals (that.event)) return false;
if (!this.getBlameString ().equals (that.getBlameString ())) return false;
return this.context == null ? that.context == null : this.context.equals (that.context);
}, "~O");
Clazz.defineMethod (c$, "getBlame", 
function () {
return this.blame;
});
Clazz.defineMethod (c$, "getBlameString", 
function () {
return this.blame;
});
Clazz.defineMethod (c$, "getContext", 
function () {
return this.context;
});
Clazz.defineMethod (c$, "getEvent", 
function () {
return this.event;
});
Clazz.defineMethod (c$, "getRunCount", 
function () {
return this.runCount;
});
Clazz.defineMethod (c$, "getRunningTime", 
function () {
return this.runningTime;
});
Clazz.defineMethod (c$, "getThreshold", 
($fz = function (eventName) {
var value = org.eclipse.core.runtime.PerformanceStats.thresholdMap.get (eventName);
if (value == null) {
var option = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getOption (eventName);
if (option != null) {
try {
value =  new Long (option);
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
} else {
throw e;
}
}
}if (value == null) value =  new Long (9223372036854775807);
org.eclipse.core.runtime.PerformanceStats.thresholdMap.put (eventName, value);
}return value.longValue ();
}, $fz.isPrivate = true, $fz), "~S");
Clazz.overrideMethod (c$, "hashCode", 
function () {
var hash = this.event.hashCode () * 37 + this.getBlameString ().hashCode ();
if (this.context != null) hash = hash * 37 + this.context.hashCode ();
return hash;
});
Clazz.defineMethod (c$, "isFailure", 
function () {
return this.$isFailure;
});
Clazz.defineMethod (c$, "reset", 
function () {
this.runningTime = 0;
this.runCount = 0;
});
Clazz.defineMethod (c$, "startRun", 
function () {
if (org.eclipse.core.runtime.PerformanceStats.ENABLED) this.startRun (null);
});
Clazz.defineMethod (c$, "startRun", 
function (contextName) {
if (!org.eclipse.core.runtime.PerformanceStats.ENABLED) return ;
this.context = contextName;
this.currentStart = System.currentTimeMillis ();
}, "~S");
Clazz.overrideMethod (c$, "toString", 
function () {
var result =  new StringBuffer ("PerformanceStats(");
result.append (this.event);
result.append (',');
result.append (this.blame);
if (this.context != null) {
result.append (',');
result.append (this.context);
}result.append (')');
return result.toString ();
});
c$.EMPTY_STATS = c$.prototype.EMPTY_STATS =  new org.eclipse.core.runtime.PerformanceStats ("", "");
Clazz.defineStatics (c$,
"ENABLED", false,
"NOT_STARTED", -1);
c$.statMap = c$.prototype.statMap = java.util.Collections.synchronizedMap ( new java.util.HashMap ());
c$.thresholdMap = c$.prototype.thresholdMap = java.util.Collections.synchronizedMap ( new java.util.HashMap ());
Clazz.defineStatics (c$,
"TRACE_SUCCESS", false);
{
($t$ = org.eclipse.core.runtime.PerformanceStats.ENABLED = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getBooleanOption ("org.eclipse.core.runtime/perf", false), org.eclipse.core.runtime.PerformanceStats.prototype.ENABLED = org.eclipse.core.runtime.PerformanceStats.ENABLED, $t$);
($t$ = org.eclipse.core.runtime.PerformanceStats.TRACE_SUCCESS = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getBooleanOption ("org.eclipse.core.runtime/perf/success", org.eclipse.core.runtime.PerformanceStats.ENABLED), org.eclipse.core.runtime.PerformanceStats.prototype.TRACE_SUCCESS = org.eclipse.core.runtime.PerformanceStats.TRACE_SUCCESS, $t$);
}});
