Clazz.declarePackage ("org.osgi.framework");
Clazz.load (["java.util.EventObject"], "org.osgi.framework.BundleEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.bundle = null;
this.type = 0;
Clazz.instantialize (this, arguments);
}, org.osgi.framework, "BundleEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (type, bundle) {
Clazz.superConstructor (this, org.osgi.framework.BundleEvent, [bundle]);
this.bundle = bundle;
this.type = type;
}, "~N,org.osgi.framework.Bundle");
Clazz.defineMethod (c$, "getBundle", 
function () {
return this.bundle;
});
Clazz.defineMethod (c$, "getType", 
function () {
return this.type;
});
Clazz.defineStatics (c$,
"INSTALLED", 0x00000001,
"STARTED", 0x00000002,
"STOPPED", 0x00000004,
"UPDATED", 0x00000008,
"UNINSTALLED", 0x00000010,
"RESOLVED", 0x00000020,
"UNRESOLVED", 0x00000040,
"STARTING", 0x00000080,
"STOPPING", 0x00000100);
});
