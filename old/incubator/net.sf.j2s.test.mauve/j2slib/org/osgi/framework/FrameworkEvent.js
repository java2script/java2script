Clazz.declarePackage ("org.osgi.framework");
Clazz.load (["java.util.EventObject"], "org.osgi.framework.FrameworkEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.bundle = null;
this.throwable = null;
this.type = 0;
Clazz.instantialize (this, arguments);
}, org.osgi.framework, "FrameworkEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (type, source) {
Clazz.superConstructor (this, org.osgi.framework.FrameworkEvent, [source]);
this.type = type;
this.bundle = null;
this.throwable = null;
}, "~N,~O");
Clazz.makeConstructor (c$, 
function (type, bundle, throwable) {
Clazz.superConstructor (this, org.osgi.framework.FrameworkEvent, [bundle]);
this.type = type;
this.bundle = bundle;
this.throwable = throwable;
}, "~N,org.osgi.framework.Bundle,Throwable");
Clazz.defineMethod (c$, "getThrowable", 
function () {
return this.throwable;
});
Clazz.defineMethod (c$, "getBundle", 
function () {
return this.bundle;
});
Clazz.defineMethod (c$, "getType", 
function () {
return this.type;
});
Clazz.defineStatics (c$,
"STARTED", 0x00000001,
"ERROR", 0x00000002,
"PACKAGES_REFRESHED", 0x00000004,
"STARTLEVEL_CHANGED", 0x00000008,
"WARNING", 0x00000010,
"INFO", 0x00000020);
});
