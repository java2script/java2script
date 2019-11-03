Clazz.declarePackage ("org.eclipse.osgi.framework.adaptor.core");
Clazz.load (["java.lang.ClassLoader", "org.eclipse.osgi.framework.adaptor.BundleClassLoader"], "org.eclipse.osgi.framework.adaptor.core.AbstractClassLoader", ["org.eclipse.osgi.framework.debug.Debug"], function () {
c$ = Clazz.decorateAsClass (function () {
this.delegate = null;
this.hostdomain = null;
this.hostclasspath = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.adaptor.core, "AbstractClassLoader", ClassLoader, org.eclipse.osgi.framework.adaptor.BundleClassLoader);
Clazz.makeConstructor (c$, 
function (delegate, domain, classpath, parent) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.adaptor.core.AbstractClassLoader, [parent]);
this.delegate = delegate;
this.hostdomain = domain;
this.hostclasspath = classpath;
}, "org.eclipse.osgi.framework.adaptor.ClassLoaderDelegate,java.security.ProtectionDomain,~A,ClassLoader");
Clazz.defineMethod (c$, "loadClass", 
function (name, resolve) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_LOADER) org.eclipse.osgi.framework.debug.Debug.println ("BundleClassLoader[" + this.delegate + "].loadClass(" + name + ")");
try {
var clazz = this.delegate.findClass (name);
if (resolve) this.resolveClass (clazz);
return (clazz);
} catch (e$$) {
if (Clazz.instanceOf (e$$, Error)) {
var e = e$$;
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_LOADER) {
org.eclipse.osgi.framework.debug.Debug.println ("BundleClassLoader[" + this.delegate + "].loadClass(" + name + ") failed.");
org.eclipse.osgi.framework.debug.Debug.printStackTrace (e);
}throw e;
}
} else if (Clazz.instanceOf (e$$, ClassNotFoundException)) {
var e = e$$;
{
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_LOADER) {
org.eclipse.osgi.framework.debug.Debug.println ("BundleClassLoader[" + this.delegate + "].loadClass(" + name + ") failed.");
org.eclipse.osgi.framework.debug.Debug.printStackTrace (e);
}throw e;
}
} else {
throw e$$;
}
}
}, "~S,~B");
Clazz.overrideMethod (c$, "getResource", 
function (name) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_LOADER) {
org.eclipse.osgi.framework.debug.Debug.println ("BundleClassLoader[" + this.delegate + "].getResource(" + name + ")");
}var url = this.delegate.findResource (name);
if (url != null) return (url);
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_LOADER) {
org.eclipse.osgi.framework.debug.Debug.println ("BundleClassLoader[" + this.delegate + "].getResource(" + name + ") failed.");
}return (null);
}, "~S");
Clazz.overrideMethod (c$, "findResources", 
function (name) {
return (this.delegate.findResources (name));
}, "~S");
Clazz.overrideMethod (c$, "findLibrary", 
function (libname) {
return this.delegate.findLibrary (libname);
}, "~S");
Clazz.overrideMethod (c$, "findLocalResource", 
function (resource) {
return this.findResource (resource);
}, "~S");
Clazz.overrideMethod (c$, "findLocalClass", 
function (classname) {
return this.findClass (classname);
}, "~S");
Clazz.overrideMethod (c$, "getDelegate", 
function () {
return this.delegate;
});
Clazz.overrideMethod (c$, "close", 
function () {
});
});
