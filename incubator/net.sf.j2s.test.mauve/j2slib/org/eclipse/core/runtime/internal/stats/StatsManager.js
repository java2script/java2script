Clazz.declarePackage ("org.eclipse.core.runtime.internal.stats");
Clazz.load (["org.eclipse.osgi.framework.adaptor.BundleWatcher", "java.util.HashMap", "$.Hashtable"], "org.eclipse.core.runtime.internal.stats.StatsManager", ["java.io.FileOutputStream", "$.PrintWriter", "java.lang.Long", "$.Thread", "$.Throwable", "java.util.Stack", "$.StringTokenizer", "$.Vector", "org.eclipse.core.runtime.internal.stats.BundleStats", "$.ClassloaderStats", "org.eclipse.osgi.framework.debug.FrameworkDebugOptions"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bundles = null;
this.activationStacks = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.internal.stats, "StatsManager", null, org.eclipse.osgi.framework.adaptor.BundleWatcher);
Clazz.prepareFields (c$, function () {
this.bundles =  new java.util.Hashtable (20);
this.activationStacks =  new java.util.HashMap (5);
});
c$.getDefault = Clazz.defineMethod (c$, "getDefault", 
function () {
if (org.eclipse.core.runtime.internal.stats.StatsManager.defaultInstance == null) {
($t$ = org.eclipse.core.runtime.internal.stats.StatsManager.defaultInstance =  new org.eclipse.core.runtime.internal.stats.StatsManager (), org.eclipse.core.runtime.internal.stats.StatsManager.prototype.defaultInstance = org.eclipse.core.runtime.internal.stats.StatsManager.defaultInstance, $t$);
org.eclipse.core.runtime.internal.stats.StatsManager.defaultInstance.initialize ();
}return org.eclipse.core.runtime.internal.stats.StatsManager.defaultInstance;
});
c$.setDebugOptions = Clazz.defineMethod (c$, "setDebugOptions", 
function () {
var options = org.eclipse.osgi.framework.debug.FrameworkDebugOptions.getDefault ();
if (options == null) return ;
($t$ = org.eclipse.core.runtime.internal.stats.StatsManager.MONITOR_ACTIVATION = options.getBooleanOption ("org.eclipse.osgi/monitor/activation", false), org.eclipse.core.runtime.internal.stats.StatsManager.prototype.MONITOR_ACTIVATION = org.eclipse.core.runtime.internal.stats.StatsManager.MONITOR_ACTIVATION, $t$);
($t$ = org.eclipse.core.runtime.internal.stats.StatsManager.MONITOR_CLASSES = options.getBooleanOption ("org.eclipse.osgi/monitor/classes", false), org.eclipse.core.runtime.internal.stats.StatsManager.prototype.MONITOR_CLASSES = org.eclipse.core.runtime.internal.stats.StatsManager.MONITOR_CLASSES, $t$);
($t$ = org.eclipse.core.runtime.internal.stats.StatsManager.MONITOR_RESOURCES = options.getBooleanOption ("org.eclipse.osgi/monitor/resources", false), org.eclipse.core.runtime.internal.stats.StatsManager.prototype.MONITOR_RESOURCES = org.eclipse.core.runtime.internal.stats.StatsManager.MONITOR_RESOURCES, $t$);
($t$ = org.eclipse.core.runtime.internal.stats.StatsManager.TRACE_CLASSES = options.getBooleanOption ("org.eclipse.osgi/trace/classLoading", false), org.eclipse.core.runtime.internal.stats.StatsManager.prototype.TRACE_CLASSES = org.eclipse.core.runtime.internal.stats.StatsManager.TRACE_CLASSES, $t$);
($t$ = org.eclipse.core.runtime.internal.stats.StatsManager.TRACE_BUNDLES = options.getBooleanOption ("org.eclipse.osgi/trace/activation", false), org.eclipse.core.runtime.internal.stats.StatsManager.prototype.TRACE_BUNDLES = org.eclipse.core.runtime.internal.stats.StatsManager.TRACE_BUNDLES, $t$);
($t$ = org.eclipse.core.runtime.internal.stats.StatsManager.TRACE_FILENAME = options.getOption ("org.eclipse.osgi/trace/filename", org.eclipse.core.runtime.internal.stats.StatsManager.TRACE_FILENAME), org.eclipse.core.runtime.internal.stats.StatsManager.prototype.TRACE_FILENAME = org.eclipse.core.runtime.internal.stats.StatsManager.TRACE_FILENAME, $t$);
($t$ = org.eclipse.core.runtime.internal.stats.StatsManager.TRACE_FILTERS = options.getOption ("org.eclipse.osgi/trace/filters", org.eclipse.core.runtime.internal.stats.StatsManager.TRACE_FILTERS), org.eclipse.core.runtime.internal.stats.StatsManager.prototype.TRACE_FILTERS = org.eclipse.core.runtime.internal.stats.StatsManager.TRACE_FILTERS, $t$);
});
c$.doneBooting = Clazz.defineMethod (c$, "doneBooting", 
function () {
($t$ = org.eclipse.core.runtime.internal.stats.StatsManager.booting = false, org.eclipse.core.runtime.internal.stats.StatsManager.prototype.booting = org.eclipse.core.runtime.internal.stats.StatsManager.booting, $t$);
});
c$.isBooting = Clazz.defineMethod (c$, "isBooting", 
function () {
return org.eclipse.core.runtime.internal.stats.StatsManager.booting;
});
c$.getArrayFromList = Clazz.defineMethod (c$, "getArrayFromList", 
function (prop) {
if (prop == null || prop.trim ().equals ("")) return  new Array (0);
var list =  new java.util.Vector ();
var tokens =  new java.util.StringTokenizer (prop, ",");
while (tokens.hasMoreTokens ()) {
var token = tokens.nextToken ().trim ();
if (!token.equals ("")) list.addElement (token);
}
return list.isEmpty () ?  new Array (0) : list.toArray ( new Array (list.size ()));
}, "~S");
Clazz.defineMethod (c$, "initialize", 
($fz = function () {
var bundle = this.findBundle ("org.eclipse.osgi", 0);
bundle.setTimestamp (System.currentTimeMillis ());
bundle.setActivationOrder (this.bundles.size ());
bundle.setDuringStartup (org.eclipse.core.runtime.internal.stats.StatsManager.booting);
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "startActivation", 
function (bundle) {
var info = this.findBundle (bundle.getSymbolicName (), bundle.getBundleId ());
info.setTimestamp (System.currentTimeMillis ());
info.setActivationOrder (this.bundles.size ());
info.setDuringStartup (org.eclipse.core.runtime.internal.stats.StatsManager.booting);
var activationStack = this.activationStacks.get (Thread.currentThread ());
if (activationStack == null) {
activationStack =  new java.util.Stack ();
this.activationStacks.put (Thread.currentThread (), activationStack);
}if (activationStack.size () != 0) {
var activatedBy = activationStack.peek ();
activatedBy.activated (info);
info.setActivatedBy (activatedBy);
}activationStack.push (info);
if (org.eclipse.core.runtime.internal.stats.StatsManager.TRACE_BUNDLES == true) {
this.traceActivate (bundle, info);
}}, "org.osgi.framework.Bundle");
Clazz.overrideMethod (c$, "endActivation", 
function (symbolicName) {
var activationStack = this.activationStacks.get (Thread.currentThread ());
var info = activationStack.pop ();
info.endActivation ();
}, "org.osgi.framework.Bundle");
Clazz.defineMethod (c$, "traceActivate", 
($fz = function (bundle, info) {
try {
var output =  new java.io.PrintWriter ( new java.io.FileOutputStream (org.eclipse.core.runtime.internal.stats.ClassloaderStats.traceFile.getAbsolutePath (), true));
try {
var startPosition = org.eclipse.core.runtime.internal.stats.ClassloaderStats.traceFile.length ();
output.println ("Activating bundle: " + bundle.getSymbolicName ());
output.println ("Bundle activation stack:");
var activationStack = this.activationStacks.get (Thread.currentThread ());
for (var i = activationStack.size () - 1; i >= 0; i--) output.println ("\t" + (activationStack.get (i)).getSymbolicName ());

output.println ("Class loading stack:");
var classStack = org.eclipse.core.runtime.internal.stats.ClassloaderStats.getClassStack ();
for (var i = classStack.size () - 1; i >= 0; i--) output.println ("\t" + (classStack.get (i)).getClassName ());

output.println ("Stack trace:");
 new Throwable ().printStackTrace (output);
info.setTraceStart (startPosition);
} finally {
output.close ();
info.setTraceEnd (org.eclipse.core.runtime.internal.stats.ClassloaderStats.traceFile.length ());
}
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz), "org.osgi.framework.Bundle,org.eclipse.core.runtime.internal.stats.BundleStats");
Clazz.defineMethod (c$, "findBundle", 
function (symbolicName, id) {
var result = this.bundles.get ( new Long (id));
try {
if (result == null) {
result =  new org.eclipse.core.runtime.internal.stats.BundleStats (symbolicName, id);
this.bundles.put ( new Long (id), result);
}} catch (e) {
if (Clazz.instanceOf (e, IllegalAccessError)) {
e.printStackTrace ();
} else {
throw e;
}
}
return result;
}, "~S,~N");
Clazz.defineMethod (c$, "getBundles", 
function () {
return this.bundles.values ().toArray ( new Array (this.bundles.size ()));
});
Clazz.defineMethod (c$, "getBundle", 
function (id) {
return this.bundles.get ( new Long (id));
}, "~N");
Clazz.defineStatics (c$,
"booting", true,
"defaultInstance", null,
"MONITOR_ACTIVATION", false,
"MONITOR_CLASSES", false,
"MONITOR_RESOURCES", false,
"TRACE_FILENAME", "runtime.traces",
"TRACE_FILTERS", "trace.properties",
"TRACE_CLASSES", false,
"TRACE_BUNDLES", false,
"FRAMEWORK_SYMBOLICNAME", "org.eclipse.osgi");
c$.OPTION_MONITOR_ACTIVATION = c$.prototype.OPTION_MONITOR_ACTIVATION = "org.eclipse.osgi/monitor/activation";
c$.OPTION_MONITOR_CLASSES = c$.prototype.OPTION_MONITOR_CLASSES = "org.eclipse.osgi/monitor/classes";
c$.OPTION_MONITOR_RESOURCES = c$.prototype.OPTION_MONITOR_RESOURCES = "org.eclipse.osgi/monitor/resources";
c$.OPTION_TRACE_BUNDLES = c$.prototype.OPTION_TRACE_BUNDLES = "org.eclipse.osgi/trace/activation";
c$.OPTION_TRACE_CLASSES = c$.prototype.OPTION_TRACE_CLASSES = "org.eclipse.osgi/trace/classLoading";
c$.OPTION_TRACE_FILENAME = c$.prototype.OPTION_TRACE_FILENAME = "org.eclipse.osgi/trace/filename";
c$.OPTION_TRACE_FILTERS = c$.prototype.OPTION_TRACE_FILTERS = "org.eclipse.osgi/trace/filters";
{
org.eclipse.core.runtime.internal.stats.StatsManager.setDebugOptions ();
}});
