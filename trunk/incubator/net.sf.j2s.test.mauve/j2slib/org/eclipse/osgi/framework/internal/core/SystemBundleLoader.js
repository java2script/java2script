Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.eclipse.osgi.framework.internal.core.BundleLoader"], "org.eclipse.osgi.framework.internal.core.SystemBundleLoader", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.classLoader = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "SystemBundleLoader", org.eclipse.osgi.framework.internal.core.BundleLoader);
Clazz.makeConstructor (c$, 
function (bundle, proxy) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.internal.core.SystemBundleLoader, [bundle, proxy]);
this.classLoader = this.getClass ().getClassLoader ();
}, "org.eclipse.osgi.framework.internal.core.BundleHost,org.eclipse.osgi.framework.internal.core.BundleLoaderProxy");
Clazz.defineMethod (c$, "findClass", 
function (name) {
return this.classLoader.loadClass (name);
}, "~S");
Clazz.overrideMethod (c$, "findLibrary", 
function (name) {
return null;
}, "~S");
Clazz.overrideMethod (c$, "findLocalClass", 
function (name) {
var clazz = null;
try {
clazz = this.classLoader.loadClass (name);
} catch (e) {
if (Clazz.instanceOf (e, ClassNotFoundException)) {
} else {
throw e;
}
}
return clazz;
}, "~S");
Clazz.overrideMethod (c$, "findLocalResource", 
function (name) {
return this.classLoader.getResource (name);
}, "~S");
Clazz.overrideMethod (c$, "findLocalResources", 
function (name) {
try {
return this.classLoader.getResources (name);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
return null;
} else {
throw e;
}
}
}, "~S");
Clazz.defineMethod (c$, "findResource", 
function (name) {
return this.classLoader.getResource (name);
}, "~S");
Clazz.overrideMethod (c$, "findResources", 
function (name) {
return this.classLoader.getResources (name);
}, "~S");
Clazz.overrideMethod (c$, "close", 
function () {
});
});
