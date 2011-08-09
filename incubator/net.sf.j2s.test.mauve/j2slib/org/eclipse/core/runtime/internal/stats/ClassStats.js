Clazz.declarePackage ("org.eclipse.core.runtime.internal.stats");
Clazz.load (["java.util.ArrayList"], "org.eclipse.core.runtime.internal.stats.ClassStats", ["org.eclipse.core.runtime.internal.stats.StatsManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.className = null;
this.classloader = null;
this.loadOrder = -1;
this.timestamp = 0;
this.timeLoading = 0;
this.timeLoadingOthers = 0;
this.loadedBy = null;
this.$loaded = null;
this.duringStartup = false;
this.traceStart = -1;
this.traceEnd = -1;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.internal.stats, "ClassStats");
Clazz.prepareFields (c$, function () {
this.$loaded =  new java.util.ArrayList (2);
});
Clazz.makeConstructor (c$, 
function (name, classloader) {
this.className = name;
this.timestamp = System.currentTimeMillis ();
this.duringStartup = org.eclipse.core.runtime.internal.stats.StatsManager.isBooting ();
this.classloader = classloader;
}, "~S,org.eclipse.core.runtime.internal.stats.ClassloaderStats");
Clazz.defineMethod (c$, "setLoadOrder", 
function (order) {
this.loadOrder = order;
}, "~N");
Clazz.defineMethod (c$, "loadingDone", 
function () {
this.timeLoading = System.currentTimeMillis () - this.timestamp;
});
Clazz.defineMethod (c$, "getTimeLoading", 
function () {
return this.timeLoading;
});
Clazz.defineMethod (c$, "getLocalTimeLoading", 
function () {
return this.timeLoading - this.timeLoadingOthers;
});
Clazz.defineMethod (c$, "addTimeLoadingOthers", 
function (time) {
this.timeLoadingOthers = this.timeLoadingOthers + time;
}, "~N");
Clazz.defineMethod (c$, "getTraceStart", 
function () {
return this.traceStart;
});
Clazz.defineMethod (c$, "getTraceEnd", 
function () {
return this.traceEnd;
});
Clazz.defineMethod (c$, "setTraceStart", 
function (position) {
this.traceStart = position;
}, "~N");
Clazz.defineMethod (c$, "setTraceEnd", 
function (position) {
this.traceEnd = position;
}, "~N");
Clazz.defineMethod (c$, "loaded", 
function (child) {
this.$loaded.add (child);
}, "org.eclipse.core.runtime.internal.stats.ClassStats");
Clazz.defineMethod (c$, "setLoadedBy", 
function (parent) {
this.loadedBy = parent;
}, "org.eclipse.core.runtime.internal.stats.ClassStats");
Clazz.defineMethod (c$, "getLoadedBy", 
function () {
return this.loadedBy;
});
Clazz.defineMethod (c$, "getLoadedClasses", 
function () {
return this.$loaded;
});
Clazz.defineMethod (c$, "getClassName", 
function () {
return this.className;
});
Clazz.defineMethod (c$, "isStartupClass", 
function () {
return this.duringStartup;
});
Clazz.defineMethod (c$, "getClassloader", 
function () {
return this.classloader;
});
Clazz.defineMethod (c$, "getLoadOrder", 
function () {
return this.loadOrder;
});
Clazz.defineMethod (c$, "getTimestamp", 
function () {
return this.timestamp;
});
Clazz.defineMethod (c$, "toBaseClass", 
function () {
this.duringStartup = true;
this.loadOrder = -2;
});
});
