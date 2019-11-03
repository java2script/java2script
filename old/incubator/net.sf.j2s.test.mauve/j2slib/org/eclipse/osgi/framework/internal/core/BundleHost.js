Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.eclipse.osgi.framework.internal.core.AbstractBundle"], "org.eclipse.osgi.framework.internal.core.BundleHost", ["java.lang.ClassNotFoundException", "$.Exception", "org.eclipse.osgi.framework.debug.Debug", "org.eclipse.osgi.framework.internal.core.BundleContextImpl", "$.BundleLoaderProxy", "$.Msg", "org.eclipse.osgi.util.NLS", "org.osgi.framework.BundleException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.proxy = null;
this.context = null;
this.fragments = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "BundleHost", org.eclipse.osgi.framework.internal.core.AbstractBundle);
Clazz.makeConstructor (c$, 
function (bundledata, framework) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.internal.core.BundleHost, [bundledata, framework]);
this.context = null;
this.fragments = null;
}, "org.eclipse.osgi.framework.adaptor.BundleData,org.eclipse.osgi.framework.internal.core.Framework");
Clazz.overrideMethod (c$, "load", 
function () {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
if ((this.state & (2)) == 0) {
org.eclipse.osgi.framework.debug.Debug.println ("Bundle.load called when state != INSTALLED: " + this);
org.eclipse.osgi.framework.debug.Debug.printStackTrace ( new Exception ("Stack trace"));
}if (this.proxy != null) {
org.eclipse.osgi.framework.debug.Debug.println ("Bundle.load called when proxy != null: " + this);
org.eclipse.osgi.framework.debug.Debug.printStackTrace ( new Exception ("Stack trace"));
}}if (this.framework.isActive ()) {
var sm = System.getSecurityManager ();
if (sm != null && this.framework.permissionAdmin != null) {
this.domain = this.framework.permissionAdmin.createProtectionDomain (this);
}}this.proxy = null;
});
Clazz.overrideMethod (c$, "reload", 
function (newBundle) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
if ((this.state & (6)) == 0) {
org.eclipse.osgi.framework.debug.Debug.println ("Bundle.reload called when state != INSTALLED | RESOLVED: " + this);
org.eclipse.osgi.framework.debug.Debug.printStackTrace ( new Exception ("Stack trace"));
}}var exporting = false;
if (this.framework.isActive ()) {
if (this.state == 4) {
var curProxy = this.getLoaderProxy ();
exporting = curProxy.inUse ();
if (exporting) curProxy.getBundleLoader ().createClassLoader ();
 else org.eclipse.osgi.framework.internal.core.BundleHost.closeBundleLoader (this.proxy);
this.state = 2;
this.proxy = null;
this.fragments = null;
}} else {
try {
this.bundledata.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}this.bundledata = newBundle.bundledata;
this.bundledata.setBundle (this);
if (this.framework.isActive () && System.getSecurityManager () != null && this.framework.permissionAdmin != null) this.domain = this.framework.permissionAdmin.createProtectionDomain (this);
return (exporting);
}, "org.eclipse.osgi.framework.internal.core.AbstractBundle");
Clazz.overrideMethod (c$, "refresh", 
function () {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
if ((this.state & (7)) == 0) {
org.eclipse.osgi.framework.debug.Debug.println ("Bundle.reload called when state != UNINSTALLED | INSTALLED | RESOLVED: " + this);
org.eclipse.osgi.framework.debug.Debug.printStackTrace ( new Exception ("Stack trace"));
}}if (this.state == 4) {
org.eclipse.osgi.framework.internal.core.BundleHost.closeBundleLoader (this.proxy);
this.proxy = null;
this.fragments = null;
this.state = 2;
}this.manifestLocalization = null;
});
Clazz.overrideMethod (c$, "unload", 
function () {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
if ((this.state & (7)) == 0) {
org.eclipse.osgi.framework.debug.Debug.println ("Bundle.unload called when state != UNINSTALLED | INSTALLED | RESOLVED: " + this);
org.eclipse.osgi.framework.debug.Debug.printStackTrace ( new Exception ("Stack trace"));
}}var exporting = false;
if (this.framework.isActive ()) {
if (this.state == 4) {
var curProxy = this.getLoaderProxy ();
exporting = curProxy.inUse ();
if (exporting) curProxy.getBundleLoader ().createClassLoader ();
 else org.eclipse.osgi.framework.internal.core.BundleHost.closeBundleLoader (this.proxy);
this.state = 2;
this.proxy = null;
this.fragments = null;
this.domain = null;
}}if (!exporting) {
try {
this.bundledata.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}return (exporting);
});
Clazz.defineMethod (c$, "checkLoader", 
($fz = function () {
this.checkValid ();
if (!this.isResolved ()) {
if (!this.framework.packageAdmin.resolveBundles ([this])) {
return null;
}}if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
if ((this.state & (60)) == 0) {
org.eclipse.osgi.framework.debug.Debug.println ("Bundle.checkLoader() called when state != STARTING | ACTIVE | STOPPING | RESOLVED: " + this);
org.eclipse.osgi.framework.debug.Debug.printStackTrace ( new Exception ("Stack trace"));
}}var loader = this.getBundleLoader ();
if (loader == null) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Bundle.checkLoader() called when loader == null: " + this);
org.eclipse.osgi.framework.debug.Debug.printStackTrace ( new Exception ("Stack trace"));
}return null;
}return loader;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "loadClass", 
function (name, checkPermission) {
if (checkPermission) {
try {
this.framework.checkAdminPermission (this, "class");
} catch (e) {
if (Clazz.instanceOf (e, SecurityException)) {
throw  new ClassNotFoundException ();
} else {
throw e;
}
}
}var loader = this.checkLoader ();
if (loader == null) throw  new ClassNotFoundException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_CNFE_NOT_RESOLVED, this.getBundleData ().getLocation (), name));
return (loader.loadClass (name));
}, "~S,~B");
Clazz.overrideMethod (c$, "getResource", 
function (name) {
var loader = null;
try {
this.framework.checkAdminPermission (this, "resource");
} catch (ee) {
if (Clazz.instanceOf (ee, SecurityException)) {
return null;
} else {
throw ee;
}
}
loader = this.checkLoader ();
if (loader == null) return null;
return (loader.getResource (name));
}, "~S");
Clazz.overrideMethod (c$, "getResources", 
function (name) {
var loader = null;
try {
this.framework.checkAdminPermission (this, "resource");
} catch (ee) {
if (Clazz.instanceOf (ee, SecurityException)) {
return null;
} else {
throw ee;
}
}
loader = this.checkLoader ();
if (loader == null) return null;
return loader.getResources (name);
}, "~S");
Clazz.overrideMethod (c$, "startWorker", 
function (persistent) {
var start = 0;
if (this.framework.active) {
if ((this.state & (40)) != 0) {
return ;
}try {
if (this.state == 2) {
if (!this.framework.packageAdmin.resolveBundles ([this])) {
throw  new org.osgi.framework.BundleException (this.getResolutionFailureMessage ());
}}if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Bundle: Active sl = " + this.framework.startLevelManager.getStartLevel () + "; Bundle " + this.getBundleId () + " sl = " + this.getStartLevel ());
}if (this.getStartLevel () <= this.framework.startLevelManager.getStartLevel ()) {
if (true) {
if (org.eclipse.osgi.framework.debug.Debug.MONITOR_ACTIVATION) {
var bundleStats = this.framework.adaptor.getBundleWatcher ();
if (bundleStats != null) bundleStats.startActivation (this);
}if (org.eclipse.osgi.framework.debug.Debug.DEBUG_BUNDLE_TIME) {
start = System.currentTimeMillis ();
System.out.println ("Starting " + this.getSymbolicName ());
}}this.state = 8;
this.framework.publishBundleEvent (128, this);
this.context = this.createContext ();
try {
this.context.start ();
if (this.framework.active) {
this.state = 32;
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("->started " + this);
}this.framework.publishBundleEvent (2, this);
}} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.BundleException)) {
this.context.close ();
this.context = null;
this.state = 4;
throw e;
} else {
throw e;
}
}
if (this.state == 1) {
this.context.close ();
this.context = null;
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_UNINSTALLED_EXCEPTION, this.getBundleData ().getLocation ()));
}}} finally {
if (true && this.state == 32) {
if (org.eclipse.osgi.framework.debug.Debug.MONITOR_ACTIVATION) {
var bundleStats = this.framework.adaptor.getBundleWatcher ();
if (bundleStats != null) bundleStats.endActivation (this);
}if (org.eclipse.osgi.framework.debug.Debug.DEBUG_BUNDLE_TIME) System.out.println ("End starting " + this.getSymbolicName () + " " + (System.currentTimeMillis () - start));
}}
}if (persistent) {
this.setStatus (1, true);
}}, "~B");
Clazz.defineMethod (c$, "createContext", 
function () {
return ( new org.eclipse.osgi.framework.internal.core.BundleContextImpl (this));
});
Clazz.overrideMethod (c$, "getContext", 
function () {
return (this.context);
});
Clazz.overrideMethod (c$, "stopWorker", 
function (persistent) {
if (persistent) {
this.setStatus (1, false);
}if (this.framework.active) {
if ((this.state & (22)) != 0) {
return ;
}this.state = 16;
this.framework.publishBundleEvent (256, this);
try {
this.context.stop ();
} finally {
this.context.close ();
this.context = null;
this.checkValid ();
this.state = 4;
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("->stopped " + this);
}this.framework.publishBundleEvent (4, this);
}
}}, "~B");
Clazz.overrideMethod (c$, "getRegisteredServices", 
function () {
this.checkValid ();
if (this.context == null) {
return (null);
}return (this.context.getRegisteredServices ());
});
Clazz.overrideMethod (c$, "getServicesInUse", 
function () {
this.checkValid ();
if (this.context == null) {
return (null);
}return (this.context.getServicesInUse ());
});
Clazz.overrideMethod (c$, "getFragments", 
function () {
{
if (this.fragments == null) return null;
var result =  new Array (this.fragments.length);
System.arraycopy (this.fragments, 0, result, 0, result.length);
return result;
}});
Clazz.defineMethod (c$, "attachFragment", 
function (fragment) {
var loader = this.getLoaderProxy ().getBasicBundleLoader ();
if (loader != null) loader.attachFragment (fragment);
if (this.fragments == null) {
this.fragments = [fragment];
} else {
var inserted = false;
var newFragments =  new Array (this.fragments.length + 1);
for (var i = 0; i < this.fragments.length; i++) {
if (fragment === this.fragments[i]) return ;
if (!inserted && fragment.getBundleId () < this.fragments[i].getBundleId ()) {
if (loader != null) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_LOADER_ATTACHMENT_ERROR, this.fragments[i].getSymbolicName (), this.getSymbolicName ()));
}newFragments[i] = fragment;
inserted = true;
}newFragments[inserted ? i + 1 : i] = this.fragments[i];
}
if (!inserted) newFragments[newFragments.length - 1] = fragment;
this.fragments = newFragments;
}}, "org.eclipse.osgi.framework.internal.core.BundleFragment");
Clazz.overrideMethod (c$, "getBundleLoader", 
function () {
return this.getLoaderProxy ().getBundleLoader ();
});
Clazz.defineMethod (c$, "getLoaderProxy", 
function () {
if (this.proxy == null) {
{
if (this.proxy == null) {
var bundleDescription = this.getBundleDescription ();
this.proxy =  new org.eclipse.osgi.framework.internal.core.BundleLoaderProxy (this, bundleDescription);
bundleDescription.setUserObject (this.proxy);
}}}return this.proxy;
});
c$.closeBundleLoader = Clazz.defineMethod (c$, "closeBundleLoader", 
function (proxy) {
if (proxy == null) return ;
var loader = proxy.getBasicBundleLoader ();
if (loader != null) loader.close ();
proxy.setStale ();
var description = proxy.getBundleDescription ();
description.setUserObject (null);
}, "org.eclipse.osgi.framework.internal.core.BundleLoaderProxy");
});
