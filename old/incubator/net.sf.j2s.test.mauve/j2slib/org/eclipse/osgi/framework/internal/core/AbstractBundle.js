Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.eclipse.osgi.framework.internal.core.KeyedElement", "org.osgi.framework.Bundle"], "org.eclipse.osgi.framework.internal.core.AbstractBundle", ["java.lang.Exception", "$.IllegalStateException", "$.Long", "$.SecurityException", "$.StringBuffer", "$.Thread", "java.security.AccessControlContext", "$.AccessController", "$.AllPermission", "$.PrivilegedAction", "$.PrivilegedExceptionAction", "java.util.ArrayList", "$.Enumeration", "$.Hashtable", "$.Locale", "$.NoSuchElementException", "org.eclipse.osgi.framework.debug.Debug", "org.eclipse.osgi.framework.internal.core.BundleSource", "$.FilterImpl", "$.ManifestLocalization", "$.Msg", "org.eclipse.osgi.util.NLS", "org.osgi.framework.BundleException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.framework = null;
this.state = 0;
this.stateChanging = null;
this.bundledata = null;
this.statechangeLock = null;
this.domain = null;
this.runtimeResolveError = null;
this.manifestLocalization = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "AbstractBundle", null, [org.osgi.framework.Bundle, Comparable, org.eclipse.osgi.framework.internal.core.KeyedElement]);
Clazz.prepareFields (c$, function () {
this.statechangeLock =  new Object ();
});
c$.createBundle = Clazz.defineMethod (c$, "createBundle", 
function (bundledata, framework) {
if ((bundledata.getType () & 1) > 0) return  new org.eclipse.osgi.framework.internal.core.BundleFragment (bundledata, framework);
return  new org.eclipse.osgi.framework.internal.core.BundleHost (bundledata, framework);
}, "org.eclipse.osgi.framework.adaptor.BundleData,org.eclipse.osgi.framework.internal.core.Framework");
Clazz.makeConstructor (c$, 
function (bundledata, framework) {
this.state = 2;
this.stateChanging = null;
this.bundledata = bundledata;
this.framework = framework;
bundledata.setBundle (this);
}, "org.eclipse.osgi.framework.adaptor.BundleData,org.eclipse.osgi.framework.internal.core.Framework");
Clazz.defineMethod (c$, "close", 
function () {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
if ((this.state & (2)) == 0) {
org.eclipse.osgi.framework.debug.Debug.println ("Bundle.close called when state != INSTALLED: " + this);
org.eclipse.osgi.framework.debug.Debug.printStackTrace ( new Exception ("Stack trace"));
}}this.state = 1;
});
Clazz.defineMethod (c$, "loadBundleActivator", 
function () {
var activatorClassName = this.bundledata.getActivator ();
if (activatorClassName != null) {
try {
var activatorClass = this.loadClass (activatorClassName, false);
return (activatorClass.newInstance ());
} catch (t) {
if (Clazz.instanceOf (t, Throwable)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.printStackTrace (t);
}throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_INVALID_ACTIVATOR_EXCEPTION, activatorClassName, this.bundledata.getSymbolicName ()), t);
} else {
throw t;
}
}
}return (null);
});
Clazz.overrideMethod (c$, "getState", 
function () {
return (this.state);
});
Clazz.defineMethod (c$, "isActive", 
function () {
return ((this.state & (40)) != 0);
});
Clazz.defineMethod (c$, "isResolved", 
function () {
return (this.state & (3)) == 0;
});
Clazz.overrideMethod (c$, "start", 
function () {
this.framework.checkAdminPermission (this, "execute");
this.checkValid ();
this.beginStateChange ();
try {
this.startWorker (true);
} finally {
this.completeStateChange ();
}
});
Clazz.defineMethod (c$, "resume", 
function () {
if (this.state == 1) {
return ;
}this.beginStateChange ();
try {
this.startWorker (false);
} finally {
this.completeStateChange ();
}
});
Clazz.overrideMethod (c$, "stop", 
function () {
this.framework.checkAdminPermission (this, "execute");
this.checkValid ();
this.beginStateChange ();
try {
this.stopWorker (true);
} finally {
this.completeStateChange ();
}
});
Clazz.defineMethod (c$, "setStatus", 
function (mask, state) {
try {
java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.AbstractBundle$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "AbstractBundle$1", null, java.security.PrivilegedExceptionAction);
Clazz.overrideMethod (c$, "run", 
function () {
var status = this.b$["org.eclipse.osgi.framework.internal.core.AbstractBundle"].bundledata.getStatus ();
var test = ((status & this.f$.mask) != 0);
if (test != this.f$.state) {
this.b$["org.eclipse.osgi.framework.internal.core.AbstractBundle"].bundledata.setStatus (this.f$.state ? (status | this.f$.mask) : (status & ~this.f$.mask));
this.b$["org.eclipse.osgi.framework.internal.core.AbstractBundle"].bundledata.save ();
}return null;
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.AbstractBundle$1, i$, v$);
}) (this, Clazz.cloneFinals ("mask", mask, "state", state)));
} catch (pae) {
if (Clazz.instanceOf (pae, java.security.PrivilegedActionException)) {
this.framework.publishFrameworkEvent (2, this, pae.getException ());
} else {
throw pae;
}
}
}, "~N,~B");
Clazz.defineMethod (c$, "suspend", 
function (lock) {
if (this.state == 1) {
return ;
}this.beginStateChange ();
try {
this.stopWorker (false);
} finally {
if (!lock) {
this.completeStateChange ();
}}
}, "~B");
Clazz.defineMethod (c$, "update", 
function () {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("update location " + this.bundledata.getLocation ());
}this.framework.checkAdminPermission (this, "lifecycle");
if ((this.bundledata.getType () & (6)) != 0) this.framework.checkAdminPermission (this, "extensionLifecycle");
this.checkValid ();
this.beginStateChange ();
try {
var callerContext = java.security.AccessController.getContext ();
this.updateWorker ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.AbstractBundle$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "AbstractBundle$2", null, java.security.PrivilegedExceptionAction);
Clazz.overrideMethod (c$, "run", 
function () {
var updateLocation = this.b$["org.eclipse.osgi.framework.internal.core.AbstractBundle"].bundledata.getLocation ();
if (this.b$["org.eclipse.osgi.framework.internal.core.AbstractBundle"].bundledata.getManifest ().get ("Bundle-UpdateLocation") != null) {
updateLocation = this.b$["org.eclipse.osgi.framework.internal.core.AbstractBundle"].bundledata.getManifest ().get ("Bundle-UpdateLocation");
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("   from location: " + updateLocation);
}}var source = this.b$["org.eclipse.osgi.framework.internal.core.AbstractBundle"].framework.adaptor.mapLocationToURLConnection (updateLocation);
this.b$["org.eclipse.osgi.framework.internal.core.AbstractBundle"].updateWorkerPrivileged (source, this.f$.callerContext);
return null;
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.AbstractBundle$2, i$, v$);
}) (this, Clazz.cloneFinals ("callerContext", callerContext)));
} finally {
this.completeStateChange ();
}
});
Clazz.defineMethod (c$, "update", 
function ($in) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("update location " + this.bundledata.getLocation ());
org.eclipse.osgi.framework.debug.Debug.println ("   from: " + $in);
}this.framework.checkAdminPermission (this, "lifecycle");
if ((this.bundledata.getType () & (6)) != 0) this.framework.checkAdminPermission (this, "extensionLifecycle");
this.checkValid ();
this.beginStateChange ();
try {
var callerContext = java.security.AccessController.getContext ();
this.updateWorker ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.AbstractBundle$3")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "AbstractBundle$3", null, java.security.PrivilegedExceptionAction);
Clazz.overrideMethod (c$, "run", 
function () {
var source =  new org.eclipse.osgi.framework.internal.core.BundleSource (this.f$.$in);
this.b$["org.eclipse.osgi.framework.internal.core.AbstractBundle"].updateWorkerPrivileged (source, this.f$.callerContext);
return null;
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.AbstractBundle$3, i$, v$);
}) (this, Clazz.cloneFinals ("in", in, "callerContext", callerContext)));
} finally {
this.completeStateChange ();
}
}, "java.io.InputStream");
Clazz.defineMethod (c$, "updateWorker", 
function (action) {
var bundleActive = false;
if (!this.isFragment ()) bundleActive = (this.state == 32);
if (bundleActive) {
try {
this.stopWorker (false);
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.BundleException)) {
this.framework.publishFrameworkEvent (2, this, e);
if (this.state == 32) {
throw e;
}} else {
throw e;
}
}
}try {
java.security.AccessController.doPrivileged (action);
this.framework.publishBundleEvent (8, this);
} catch (pae) {
if (Clazz.instanceOf (pae, java.security.PrivilegedActionException)) {
if (Clazz.instanceOf (pae.getException (), RuntimeException)) throw pae.getException ();
throw pae.getException ();
} else {
throw pae;
}
} finally {
if (bundleActive) {
try {
this.startWorker (false);
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.BundleException)) {
this.framework.publishFrameworkEvent (2, this, e);
} else {
throw e;
}
}
}}
}, "java.security.PrivilegedExceptionAction");
Clazz.defineMethod (c$, "updateWorkerPrivileged", 
function (source, callerContext) {
var oldBundle = org.eclipse.osgi.framework.internal.core.AbstractBundle.createBundle (this.bundledata, this.framework);
var reloaded = false;
var storage = this.framework.adaptor.updateBundle (this.bundledata, source);
var bundles = this.framework.getBundles ();
try {
var newBundleData = storage.begin ();
var newBundle = this.framework.createAndVerifyBundle (newBundleData);
var nativepaths = this.framework.selectNativeCode (newBundle);
if (nativepaths != null) {
this.bundledata.installNativeCode (nativepaths);
}var exporting;
var st = this.getState ();
{
exporting = this.reload (newBundle);
this.manifestLocalization = null;
}reloaded = true;
if (System.getSecurityManager () != null) {
var extension = (this.bundledata.getType () & (6)) != 0;
if (extension && !this.hasPermission ( new java.security.AllPermission ())) throw  new org.osgi.framework.BundleException (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_EXTENSION_PERMISSION,  new SecurityException (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_EXTENSION_PERMISSION));
try {
java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.AbstractBundle$4")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "AbstractBundle$4", null, java.security.PrivilegedExceptionAction);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["org.eclipse.osgi.framework.internal.core.AbstractBundle"].framework.checkAdminPermission (this.f$.newBundle, "lifecycle");
if (this.f$.extension) this.b$["org.eclipse.osgi.framework.internal.core.AbstractBundle"].framework.checkAdminPermission (this.f$.newBundle, "extensionLifecycle");
return null;
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.AbstractBundle$4, i$, v$);
}) (this, Clazz.cloneFinals ("newBundle", newBundle, "extension", extension)), callerContext);
} catch (e) {
if (Clazz.instanceOf (e, java.security.PrivilegedActionException)) {
throw e.getException ();
} else {
throw e;
}
}
}if (st == 4) this.framework.publishBundleEvent (64, this);
storage.commit (exporting);
} catch (t) {
if (Clazz.instanceOf (t, Throwable)) {
try {
storage.undo ();
if (reloaded) {
{
this.reload (oldBundle);
}}} catch (ee) {
if (Clazz.instanceOf (ee, org.osgi.framework.BundleException)) {
this.framework.publishFrameworkEvent (2, this, ee);
} else {
throw ee;
}
}
if (Clazz.instanceOf (t, SecurityException)) throw t;
if (Clazz.instanceOf (t, org.osgi.framework.BundleException)) throw t;
throw  new org.osgi.framework.BundleException (t.getMessage (), t);
} else {
throw t;
}
}
}, "java.net.URLConnection,java.security.AccessControlContext");
Clazz.overrideMethod (c$, "uninstall", 
function () {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("uninstall location: " + this.bundledata.getLocation ());
}this.framework.checkAdminPermission (this, "lifecycle");
if ((this.bundledata.getType () & (6)) != 0) this.framework.checkAdminPermission (this, "extensionLifecycle");
this.checkValid ();
this.beginStateChange ();
try {
this.uninstallWorker ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.AbstractBundle$5")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "AbstractBundle$5", null, java.security.PrivilegedExceptionAction);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["org.eclipse.osgi.framework.internal.core.AbstractBundle"].uninstallWorkerPrivileged ();
return null;
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.AbstractBundle$5, i$, v$);
}) (this, null));
} finally {
this.completeStateChange ();
}
});
Clazz.defineMethod (c$, "uninstallWorker", 
function (action) {
var bundleActive = false;
if (!this.isFragment ()) bundleActive = (this.state == 32);
if (bundleActive) {
try {
this.stopWorker (true);
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.BundleException)) {
this.framework.publishFrameworkEvent (2, this, e);
} else {
throw e;
}
}
}try {
java.security.AccessController.doPrivileged (action);
} catch (pae) {
if (Clazz.instanceOf (pae, java.security.PrivilegedActionException)) {
if (bundleActive) {
try {
this.startWorker (false);
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.BundleException)) {
this.framework.publishFrameworkEvent (2, this, e);
} else {
throw e;
}
}
}throw pae.getException ();
} else {
throw pae;
}
}
this.framework.publishBundleEvent (16, this);
}, "java.security.PrivilegedExceptionAction");
Clazz.defineMethod (c$, "uninstallWorkerPrivileged", 
function () {
var unloaded = false;
this.getHeaders ();
var storage = this.framework.adaptor.uninstallBundle (this.bundledata);
var bundles = this.framework.getBundles ();
try {
storage.begin ();
var exporting;
var st = this.getState ();
{
bundles.remove (this);
exporting = this.unload ();
}if (st == 4) this.framework.publishBundleEvent (64, this);
unloaded = true;
storage.commit (exporting);
this.close ();
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.BundleException)) {
try {
storage.undo ();
if (unloaded) {
{
this.load ();
bundles.add (this);
}}} catch (ee) {
if (Clazz.instanceOf (ee, org.osgi.framework.BundleException)) {
this.framework.publishFrameworkEvent (2, this, ee);
} else {
throw ee;
}
}
throw e;
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "getHeaders", 
function () {
return this.getHeaders (null);
});
Clazz.defineMethod (c$, "getHeaders", 
function (localeString) {
this.framework.checkAdminPermission (this, "metadata");
try {
this.initializeManifestLocalization ();
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.BundleException)) {
this.framework.publishFrameworkEvent (2, this, e);
return  new java.util.Hashtable ();
} else {
throw e;
}
}
if (localeString == null) localeString = java.util.Locale.getDefault ().toString ();
return this.manifestLocalization.getHeaders (localeString);
}, "~S");
Clazz.overrideMethod (c$, "getBundleId", 
function () {
return (this.bundledata.getBundleID ());
});
Clazz.overrideMethod (c$, "getLocation", 
function () {
this.framework.checkAdminPermission (this, "metadata");
return (this.bundledata.getLocation ());
});
Clazz.overrideMethod (c$, "hasPermission", 
function (permission) {
this.checkValid ();
if (this.domain != null) {
if (Clazz.instanceOf (permission, java.security.Permission)) {
var sm = System.getSecurityManager ();
if (Clazz.instanceOf (sm, org.eclipse.osgi.framework.internal.core.FrameworkSecurityManager)) {
var acc =  new java.security.AccessControlContext ([this.domain]);
try {
sm.checkPermission (permission, acc);
return true;
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
return false;
} else {
throw e;
}
}
}return this.domain.implies (permission);
}return false;
}return true;
}, "~O");
Clazz.defineMethod (c$, "beginStateChange", 
function () {
{
var doubleFault = false;
while (true) {
if (this.stateChanging == null) {
this.stateChanging = Thread.currentThread ();
return ;
}if (doubleFault || (this.stateChanging === Thread.currentThread ())) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_STATE_CHANGE_EXCEPTION, this.getBundleData ().getLocation (), this.stateChanging.getName ()));
}try {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println (" Waiting for state to change in bundle " + this);
}var start = 0;
if (true) start = System.currentTimeMillis ();
this.statechangeLock.wait (5000);
if (true) {
var end = System.currentTimeMillis ();
if (end - start > 0) {
System.out.println ("Waiting... : " + this.getSymbolicName () + ' ' + (end - start));
}}} catch (e) {
if (Clazz.instanceOf (e, InterruptedException)) {
} else {
throw e;
}
}
doubleFault = true;
}
}});
Clazz.defineMethod (c$, "completeStateChange", 
function () {
{
if (this.stateChanging != null) {
this.stateChanging = null;
this.statechangeLock.notify ();
}}});
Clazz.defineMethod (c$, "toString", 
function () {
return (this.bundledata.getLocation () + " [" + this.getBundleId () + "]");
});
Clazz.overrideMethod (c$, "compareTo", 
function (obj) {
var slcomp = this.getStartLevel () - (obj).getStartLevel ();
if (slcomp != 0) {
return slcomp;
}var idcomp = this.getBundleId () - (obj).getBundleId ();
return (idcomp < 0) ? -1 : ((idcomp > 0) ? 1 : 0);
}, "~O");
Clazz.defineMethod (c$, "checkValid", 
function () {
if (this.state == 1) {
throw  new IllegalStateException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_UNINSTALLED_EXCEPTION, this.getBundleData ().getLocation ()));
}});
Clazz.defineMethod (c$, "getProtectionDomain", 
function () {
return this.domain;
});
Clazz.defineMethod (c$, "unresolvePermissions", 
function (refreshedBundles) {
if (this.domain != null) {
var collection = this.domain.getPermissions ();
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Unresolving permissions in bundle " + this);
}collection.unresolvePermissions (refreshedBundles);
}}, "~A");
Clazz.defineMethod (c$, "getFragments", 
function () {
this.checkValid ();
return null;
});
Clazz.defineMethod (c$, "isFragment", 
function () {
return false;
});
Clazz.defineMethod (c$, "getHosts", 
function () {
this.checkValid ();
return null;
});
Clazz.defineMethod (c$, "loadClass", 
function (classname) {
return this.loadClass (classname, true);
}, "~S");
Clazz.overrideMethod (c$, "getEntryPaths", 
function (path) {
try {
this.framework.checkAdminPermission (this, "resource");
} catch (e) {
if (Clazz.instanceOf (e, SecurityException)) {
return null;
} else {
throw e;
}
}
this.checkValid ();
return java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.AbstractBundle$6")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "AbstractBundle$6", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
return this.b$["org.eclipse.osgi.framework.internal.core.AbstractBundle"].bundledata.getEntryPaths (this.f$.path);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.AbstractBundle$6, i$, v$);
}) (this, Clazz.cloneFinals ("path", path)));
}, "~S");
Clazz.defineMethod (c$, "getEntry", 
function (fileName) {
try {
this.framework.checkAdminPermission (this, "resource");
} catch (e) {
if (Clazz.instanceOf (e, SecurityException)) {
return null;
} else {
throw e;
}
}
this.checkValid ();
if (System.getSecurityManager () == null) return this.bundledata.getEntry (fileName);
var ffileName = fileName;
return java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.AbstractBundle$7")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "AbstractBundle$7", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
return this.b$["org.eclipse.osgi.framework.internal.core.AbstractBundle"].bundledata.getEntry (this.f$.ffileName);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.AbstractBundle$7, i$, v$);
}) (this, Clazz.cloneFinals ("ffileName", ffileName)));
}, "~S");
Clazz.overrideMethod (c$, "getSymbolicName", 
function () {
return this.bundledata.getSymbolicName ();
});
Clazz.overrideMethod (c$, "getLastModified", 
function () {
return this.bundledata.getLastModified ();
});
Clazz.defineMethod (c$, "getBundleData", 
function () {
return this.bundledata;
});
Clazz.defineMethod (c$, "getVersion", 
function () {
return this.bundledata.getVersion ();
});
Clazz.defineMethod (c$, "getBundleDescription", 
function () {
return this.framework.adaptor.getState ().getBundle (this.getBundleId ());
});
Clazz.defineMethod (c$, "getStartLevel", 
function () {
return this.bundledata.getStartLevel ();
});
Clazz.defineMethod (c$, "resolve", 
function () {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
if ((this.state & (2)) == 0) {
org.eclipse.osgi.framework.debug.Debug.println ("Bundle.resolve called when state != INSTALLED: " + this);
org.eclipse.osgi.framework.debug.Debug.printStackTrace ( new Exception ("Stack trace"));
}}if (this.state == 2) {
this.state = 4;
}});
Clazz.defineMethod (c$, "getResolutionFailureMessage", 
function () {
var defaultMessage = org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_UNRESOLVED_EXCEPTION;
if (false) {
return defaultMessage;
}if (this.runtimeResolveError != null) {
return this.runtimeResolveError;
}var bundleDescription = this.getBundleDescription ();
if (bundleDescription == null) {
return defaultMessage;
}if (bundleDescription.isResolved ()) {
throw  new IllegalStateException (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_UNRESOLVED_STATE_CONFLICT);
}var unsatisfied = this.framework.adaptor.getPlatformAdmin ().getStateHelper ().getUnsatisfiedConstraints (bundleDescription);
if (unsatisfied.length == 0) {
return org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_UNRESOLVED_NOT_CHOSEN_EXCEPTION;
}var missing =  new StringBuffer ();
for (var i = 0; i < unsatisfied.length; i++) {
if (Clazz.instanceOf (unsatisfied[i], org.eclipse.osgi.service.resolver.ImportPackageSpecification)) {
missing.append (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_UNRESOLVED_PACKAGE, this.toString (unsatisfied[i])));
} else if (Clazz.instanceOf (unsatisfied[i], org.eclipse.osgi.service.resolver.HostSpecification)) {
missing.append (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_UNRESOLVED_HOST, this.toString (unsatisfied[i])));
} else {
missing.append (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_UNRESOLVED_BUNDLE, this.toString (unsatisfied[i])));
}missing.append (',');
}
missing.deleteCharAt (missing.length () - 1);
return org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_UNRESOLVED_UNSATISFIED_CONSTRAINT_EXCEPTION, missing.toString ());
});
Clazz.defineMethod (c$, "toString", 
($fz = function (constraint) {
var versionRange = constraint.getVersionRange ();
if (versionRange == null) return constraint.getName ();
return constraint.getName () + '_' + versionRange;
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.service.resolver.VersionConstraint");
Clazz.overrideMethod (c$, "getKeyHashCode", 
function () {
return this.getBundleId ();
});
Clazz.overrideMethod (c$, "compare", 
function (other) {
return this.getBundleId () == (other).getBundleId ();
}, "org.eclipse.osgi.framework.internal.core.KeyedElement");
Clazz.overrideMethod (c$, "getKey", 
function () {
return  new Long (this.getBundleId ());
});
Clazz.defineMethod (c$, "getResourceBundle", 
function (localeString) {
try {
this.initializeManifestLocalization ();
} catch (ex) {
if (Clazz.instanceOf (ex, org.osgi.framework.BundleException)) {
return (null);
} else {
throw ex;
}
}
if (localeString == null) {
localeString = java.util.Locale.getDefault ().toString ();
}return this.manifestLocalization.getResourceBundle (localeString);
}, "~S");
Clazz.defineMethod (c$, "initializeManifestLocalization", 
($fz = function () {
if (this.manifestLocalization == null) {
var rawHeaders;
rawHeaders = this.bundledata.getManifest ();
this.manifestLocalization =  new org.eclipse.osgi.framework.internal.core.ManifestLocalization (this, rawHeaders);
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "testStateChanging", 
function (thread) {
return this.stateChanging === thread;
}, "~O");
Clazz.defineMethod (c$, "getStateChanging", 
function () {
return this.stateChanging;
});
Clazz.overrideMethod (c$, "findEntries", 
function (path, filePattern, recurse) {
try {
this.framework.checkAdminPermission (this, "resource");
} catch (e) {
if (Clazz.instanceOf (e, SecurityException)) {
return null;
} else {
throw e;
}
}
this.checkValid ();
var pathList =  new java.util.ArrayList ();
var patternFilter = null;
var patternProps = null;
if (filePattern != null) try {
patternFilter =  new org.eclipse.osgi.framework.internal.core.FilterImpl ("(filename=" + filePattern + ")");
patternProps =  new java.util.Hashtable (2);
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.InvalidSyntaxException)) {
} else {
throw e;
}
}
this.findLocalEntryPaths (path, patternFilter, patternProps, recurse, pathList);
var fragments = this.getFragments ();
var numFragments = fragments == null ? -1 : fragments.length;
for (var i = 0; i < numFragments; i++) (fragments[i]).findLocalEntryPaths (path, patternFilter, patternProps, recurse, pathList);

if (pathList.size () == 0) return null;
var pathArray = pathList.toArray ( new Array (pathList.size ()));
return (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.AbstractBundle$8")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.curIndex = 0;
this.curFragment = -1;
this.$nextElement = null;
this.noMoreElements = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "AbstractBundle$8", null, java.util.Enumeration);
Clazz.defineMethod (c$, "hasMoreElements", 
function () {
if (this.$nextElement != null) return true;
this.getNextElement ();
return this.$nextElement != null;
});
Clazz.defineMethod (c$, "nextElement", 
function () {
if (!this.hasMoreElements ()) throw  new java.util.NoSuchElementException ();
var result;
result = this.$nextElement;
this.getNextElement ();
return result;
});
Clazz.defineMethod (c$, "getNextElement", 
($fz = function () {
this.$nextElement = null;
if (this.curIndex >= this.f$.pathArray.length) return ;
var curPath = this.f$.pathArray[this.curIndex];
if (this.curFragment == -1) {
this.$nextElement = this.b$["org.eclipse.osgi.framework.internal.core.AbstractBundle"].getEntry (curPath);
this.curFragment++;
}while (this.$nextElement == null && this.curFragment < this.f$.numFragments) this.$nextElement = this.f$.fragments[this.curFragment++].getEntry (curPath);

if (this.f$.numFragments == -1 || this.curFragment >= this.f$.numFragments) {
this.curIndex++;
this.curFragment = -1;
}if (this.$nextElement == null) this.getNextElement ();
}, $fz.isPrivate = true, $fz));
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.AbstractBundle$8, i$, v$);
}) (this, Clazz.cloneFinals ("pathArray", pathArray, "numFragments", numFragments, "fragments", fragments));
}, "~S,~S,~B");
Clazz.defineMethod (c$, "findLocalEntryPaths", 
function (path, patternFilter, patternProps, recurse, pathList) {
var entryPaths = this.bundledata.getEntryPaths (path);
if (entryPaths == null) return ;
while (entryPaths.hasMoreElements ()) {
var entry = entryPaths.nextElement ();
var lastSlash = entry.lastIndexOf ('/');
if (patternProps != null) {
var secondToLastSlash = entry.lastIndexOf ('/', lastSlash - 1);
var fileStart;
var fileEnd = entry.length;
if (lastSlash < 0) fileStart = 0;
 else if (lastSlash != entry.length - 1) fileStart = lastSlash + 1;
 else {
fileEnd = lastSlash;
if (secondToLastSlash < 0) fileStart = 0;
 else fileStart = secondToLastSlash + 1;
}var fileName = entry.substring (fileStart, fileEnd);
patternProps.put ("filename", fileName);
}if (!pathList.contains (entry) && (patternFilter == null || patternFilter.matchCase (patternProps))) pathList.add (entry);
if (recurse && !entry.equals (path) && entry.length > 0 && lastSlash == (entry.length - 1)) this.findLocalEntryPaths (entry, patternFilter, patternProps, recurse, pathList);
}
return ;
}, "~S,org.osgi.framework.Filter,java.util.Hashtable,~B,java.util.List");
});
