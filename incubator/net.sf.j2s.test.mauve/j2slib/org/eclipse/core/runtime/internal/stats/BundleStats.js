Clazz.declarePackage ("org.eclipse.core.runtime.internal.stats");
Clazz.load (["java.util.ArrayList"], "org.eclipse.core.runtime.internal.stats.BundleStats", ["org.eclipse.core.runtime.internal.stats.ClassloaderStats", "$.StatsManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.symbolicName = null;
this.id = 0;
this.activationOrder = 0;
this.timestamp = 0;
this.duringStartup = false;
this.startupTime = 0;
this.startupMethodTime = 0;
this.traceStart = -1;
this.traceEnd = -1;
this.bundlesActivated = null;
this.activatedBy = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.internal.stats, "BundleStats");
Clazz.prepareFields (c$, function () {
this.bundlesActivated =  new java.util.ArrayList (3);
});
Clazz.makeConstructor (c$, 
function (name, id) {
this.symbolicName = name;
this.id = id;
}, "~S,~N");
Clazz.defineMethod (c$, "getTimestamp", 
function () {
return this.timestamp;
});
Clazz.defineMethod (c$, "getActivationOrder", 
function () {
return this.activationOrder;
});
Clazz.defineMethod (c$, "activated", 
function (info) {
this.bundlesActivated.add (info);
}, "org.eclipse.core.runtime.internal.stats.BundleStats");
Clazz.defineMethod (c$, "getActivatedBy", 
function () {
return this.activatedBy;
});
Clazz.defineMethod (c$, "getId", 
function () {
return this.id;
});
Clazz.defineMethod (c$, "getSymbolicName", 
function () {
return this.symbolicName;
});
Clazz.defineMethod (c$, "getStartupTime", 
function () {
return this.startupTime;
});
Clazz.defineMethod (c$, "getStartupMethodTime", 
function () {
return this.startupMethodTime;
});
Clazz.defineMethod (c$, "isStartupBundle", 
function () {
return this.duringStartup;
});
Clazz.defineMethod (c$, "getClassLoadCount", 
function () {
if (!org.eclipse.core.runtime.internal.stats.StatsManager.MONITOR_CLASSES) return 0;
var loader = org.eclipse.core.runtime.internal.stats.ClassloaderStats.getLoader (this.symbolicName);
return loader == null ? 0 : loader.getClassLoadCount ();
});
Clazz.defineMethod (c$, "getClassLoadTime", 
function () {
if (!org.eclipse.core.runtime.internal.stats.StatsManager.MONITOR_CLASSES) return 0;
var loader = org.eclipse.core.runtime.internal.stats.ClassloaderStats.getLoader (this.symbolicName);
return loader == null ? 0 : loader.getClassLoadTime ();
});
Clazz.defineMethod (c$, "getBundlesActivated", 
function () {
return this.bundlesActivated;
});
Clazz.defineMethod (c$, "getTraceStart", 
function () {
return this.traceStart;
});
Clazz.defineMethod (c$, "getTraceEnd", 
function () {
return this.traceEnd;
});
Clazz.defineMethod (c$, "setTimestamp", 
function (value) {
this.timestamp = value;
}, "~N");
Clazz.defineMethod (c$, "setActivationOrder", 
function (value) {
this.activationOrder = value;
}, "~N");
Clazz.defineMethod (c$, "setTraceStart", 
function (time) {
this.traceStart = time;
}, "~N");
Clazz.defineMethod (c$, "setDuringStartup", 
function (value) {
this.duringStartup = value;
}, "~B");
Clazz.defineMethod (c$, "endActivation", 
function () {
this.startupTime = System.currentTimeMillis () - this.timestamp;
});
Clazz.defineMethod (c$, "setTraceEnd", 
function (position) {
this.traceEnd = position;
}, "~N");
Clazz.defineMethod (c$, "setActivatedBy", 
function (value) {
this.activatedBy = value;
}, "org.eclipse.core.runtime.internal.stats.BundleStats");
});
