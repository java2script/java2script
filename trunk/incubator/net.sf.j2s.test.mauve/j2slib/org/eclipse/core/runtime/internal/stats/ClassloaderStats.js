Clazz.declarePackage ("org.eclipse.core.runtime.internal.stats");
Clazz.load (["java.util.ArrayList", "$.Collections", "$.HashMap", "$.HashSet", "$.Stack"], "org.eclipse.core.runtime.internal.stats.ClassloaderStats", ["java.io.File", "$.FileInputStream", "$.FileOutputStream", "$.PrintWriter", "java.lang.Throwable", "java.util.Arrays", "$.Properties", "org.eclipse.core.runtime.internal.stats.ClassStats", "$.StatsManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.id = null;
this.loadingTime = 0;
this.failureCount = 0;
this.classes = null;
this.bundles = null;
this.keepTraces = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.internal.stats, "ClassloaderStats");
Clazz.prepareFields (c$, function () {
this.classes = java.util.Collections.synchronizedMap ( new java.util.HashMap (20));
this.bundles =  new java.util.ArrayList (2);
});
c$.initializeTraceOptions = Clazz.defineMethod (c$, "initializeTraceOptions", 
($fz = function () {
var filename = org.eclipse.core.runtime.internal.stats.StatsManager.TRACE_FILENAME;
($t$ = org.eclipse.core.runtime.internal.stats.ClassloaderStats.traceFile =  new java.io.File (filename), org.eclipse.core.runtime.internal.stats.ClassloaderStats.prototype.traceFile = org.eclipse.core.runtime.internal.stats.ClassloaderStats.traceFile, $t$);
org.eclipse.core.runtime.internal.stats.ClassloaderStats.traceFile.$delete ();
if (!org.eclipse.core.runtime.internal.stats.StatsManager.TRACE_CLASSES) return ;
filename = org.eclipse.core.runtime.internal.stats.StatsManager.TRACE_FILTERS;
if (filename == null || filename.length == 0) return ;
try {
var filterFile =  new java.io.File (filename);
System.out.print ("Runtime tracing elements defined in: " + filterFile.getAbsolutePath () + "...");
var input =  new java.io.FileInputStream (filterFile);
System.out.println ("  Loaded.");
var filters = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.runtime.internal.stats.ClassloaderStats$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.runtime.internal.stats, "ClassloaderStats$1", java.util.Properties);
Clazz.overrideMethod (c$, "put", 
function (key, value) {
org.eclipse.core.runtime.internal.stats.ClassloaderStats.addFilters (key, value);
return null;
}, "~O,~O");
c$.serialVersionUID = 3546359543853365296;
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.runtime.internal.stats.ClassloaderStats$1, i$, v$);
}) (this, null);
try {
filters.load (input);
} finally {
input.close ();
}
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
System.out.println ("  No trace filters loaded.");
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz));
c$.addFilters = Clazz.defineMethod (c$, "addFilters", 
function (key, value) {
var filters = org.eclipse.core.runtime.internal.stats.StatsManager.getArrayFromList (value);
if ("plugins".equals (key)) org.eclipse.core.runtime.internal.stats.ClassloaderStats.pluginFilters.addAll (java.util.Arrays.asList (filters));
if ("packages".equals (key)) org.eclipse.core.runtime.internal.stats.ClassloaderStats.packageFilters.addAll (java.util.Arrays.asList (filters));
}, "~S,~S");
c$.startLoadingClass = Clazz.defineMethod (c$, "startLoadingClass", 
function (id, className) {
org.eclipse.core.runtime.internal.stats.ClassloaderStats.findLoader (id).startLoadClass (className);
}, "~S,~S");
c$.findLoader = Clazz.defineMethod (c$, "findLoader", 
($fz = function (id) {
{
var result = org.eclipse.core.runtime.internal.stats.ClassloaderStats.loaders.get (id);
if (result == null) {
result =  new org.eclipse.core.runtime.internal.stats.ClassloaderStats (id);
org.eclipse.core.runtime.internal.stats.ClassloaderStats.loaders.put (id, result);
}return result;
}}, $fz.isPrivate = true, $fz), "~S");
c$.getClassStack = Clazz.defineMethod (c$, "getClassStack", 
function () {
return org.eclipse.core.runtime.internal.stats.ClassloaderStats.classStack;
});
c$.getLoaders = Clazz.defineMethod (c$, "getLoaders", 
function () {
return org.eclipse.core.runtime.internal.stats.ClassloaderStats.loaders.values ().toArray ( new Array (0));
});
c$.endLoadingClass = Clazz.defineMethod (c$, "endLoadingClass", 
function (id, className, success) {
org.eclipse.core.runtime.internal.stats.ClassloaderStats.findLoader (id).endLoadClass (className, success);
}, "~S,~S,~B");
c$.loadedBundle = Clazz.defineMethod (c$, "loadedBundle", 
function (id, info) {
org.eclipse.core.runtime.internal.stats.ClassloaderStats.findLoader (id).loadedBundle (info);
}, "~S,org.eclipse.core.runtime.internal.stats.ResourceBundleStats");
c$.getLoader = Clazz.defineMethod (c$, "getLoader", 
function (id) {
return org.eclipse.core.runtime.internal.stats.ClassloaderStats.loaders.get (id);
}, "~S");
Clazz.makeConstructor (c$, 
function (id) {
this.id = id;
this.keepTraces = org.eclipse.core.runtime.internal.stats.ClassloaderStats.pluginFilters.contains (id);
}, "~S");
Clazz.defineMethod (c$, "addBaseClasses", 
function (baseClasses) {
for (var i = 0; i < baseClasses.length; i++) {
var name = baseClasses[i];
if (this.classes.get (name) == null) {
var value =  new org.eclipse.core.runtime.internal.stats.ClassStats (name, this);
value.toBaseClass ();
this.classes.put (name, value);
}}
}, "~A");
Clazz.defineMethod (c$, "loadedBundle", 
($fz = function (bundle) {
this.bundles.add (bundle);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.internal.stats.ResourceBundleStats");
Clazz.defineMethod (c$, "getBundles", 
function () {
return this.bundles;
});
Clazz.defineMethod (c$, "startLoadClass", 
($fz = function (name) {
org.eclipse.core.runtime.internal.stats.ClassloaderStats.classStack.push (this.findClass (name));
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "findClass", 
($fz = function (name) {
var result = this.classes.get (name);
return result == null ?  new org.eclipse.core.runtime.internal.stats.ClassStats (name, this) : result;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "endLoadClass", 
($fz = function (name, success) {
var current = org.eclipse.core.runtime.internal.stats.ClassloaderStats.classStack.pop ();
if (!success) {
this.failureCount++;
return ;
}if (current.getLoadOrder () >= 0) return ;
this.classes.put (name, current);
current.setLoadOrder (this.classes.size ());
current.loadingDone ();
this.traceLoad (name, current);
if (org.eclipse.core.runtime.internal.stats.ClassloaderStats.classStack.size () != 0) {
var previous = (org.eclipse.core.runtime.internal.stats.ClassloaderStats.classStack.peek ());
previous.addTimeLoadingOthers (current.getTimeLoading ());
current.setLoadedBy (previous);
previous.loaded (current);
} else {
this.loadingTime = this.loadingTime + current.getTimeLoading ();
}}, $fz.isPrivate = true, $fz), "~S,~B");
Clazz.defineMethod (c$, "traceLoad", 
($fz = function (name, target) {
if (!this.keepTraces) {
var found = false;
for (var i = 0; !found && i < org.eclipse.core.runtime.internal.stats.ClassloaderStats.packageFilters.size (); i++) if (name.startsWith (org.eclipse.core.runtime.internal.stats.ClassloaderStats.packageFilters.get (i))) found = true;

if (!found) return ;
}try {
target.setTraceStart (org.eclipse.core.runtime.internal.stats.ClassloaderStats.traceFile.length ());
var output =  new java.io.PrintWriter ( new java.io.FileOutputStream (org.eclipse.core.runtime.internal.stats.ClassloaderStats.traceFile.getAbsolutePath (), true));
try {
output.println ("Loading class: " + name);
output.println ("Class loading stack:");
output.println ("\t" + name);
for (var i = org.eclipse.core.runtime.internal.stats.ClassloaderStats.classStack.size () - 1; i >= 0; i--) output.println ("\t" + (org.eclipse.core.runtime.internal.stats.ClassloaderStats.classStack.get (i)).getClassName ());

output.println ("Stack trace:");
 new Throwable ().printStackTrace (output);
} finally {
output.close ();
}
target.setTraceEnd (org.eclipse.core.runtime.internal.stats.ClassloaderStats.traceFile.length ());
} catch (e) {
if (Clazz.instanceOf (e, java.io.FileNotFoundException)) {
e.printStackTrace ();
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz), "~S,org.eclipse.core.runtime.internal.stats.ClassStats");
Clazz.defineMethod (c$, "getClassLoadCount", 
function () {
return this.classes.size ();
});
Clazz.defineMethod (c$, "getClassLoadTime", 
function () {
return this.loadingTime;
});
Clazz.defineMethod (c$, "getClasses", 
function () {
return this.classes.values ().toArray ( new Array (0));
});
Clazz.defineMethod (c$, "getId", 
function () {
return this.id;
});
c$.packageFilters = c$.prototype.packageFilters =  new java.util.ArrayList (4);
c$.pluginFilters = c$.prototype.pluginFilters =  new java.util.HashSet (5);
c$.classStack = c$.prototype.classStack =  new java.util.Stack ();
c$.loaders = c$.prototype.loaders = java.util.Collections.synchronizedMap ( new java.util.HashMap (20));
Clazz.defineStatics (c$,
"traceFile", null);
{
if (org.eclipse.core.runtime.internal.stats.StatsManager.TRACE_CLASSES || org.eclipse.core.runtime.internal.stats.StatsManager.TRACE_BUNDLES) org.eclipse.core.runtime.internal.stats.ClassloaderStats.initializeTraceOptions ();
}});
