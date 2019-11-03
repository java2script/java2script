Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.eclipse.osgi.framework.internal.core.BundleHost"], "org.eclipse.osgi.framework.internal.core.SystemBundle", ["org.eclipse.osgi.framework.debug.Debug", "org.eclipse.osgi.framework.internal.core.Constants", "$.Msg", "org.osgi.framework.BundleException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.systemDomain = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "SystemBundle", org.eclipse.osgi.framework.internal.core.BundleHost);
Clazz.makeConstructor (c$, 
function (framework) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.internal.core.SystemBundle, [framework.adaptor.createSystemBundleData (), framework]);
org.eclipse.osgi.framework.internal.core.Constants.setInternalSymbolicName (this.bundledata.getSymbolicName ());
this.state = 4;
this.context = this.createContext ();
}, "org.eclipse.osgi.framework.internal.core.Framework");
Clazz.overrideMethod (c$, "load", 
function () {
var sm = System.getSecurityManager ();
if (sm != null) {
this.systemDomain = this.getClass ().getProtectionDomain ();
}});
Clazz.overrideMethod (c$, "reload", 
function (newBundle) {
return (false);
}, "org.eclipse.osgi.framework.internal.core.AbstractBundle");
Clazz.overrideMethod (c$, "refresh", 
function () {
});
Clazz.overrideMethod (c$, "unload", 
function () {
return (false);
});
Clazz.overrideMethod (c$, "close", 
function () {
this.context.close ();
this.context = null;
this.state = 1;
});
Clazz.defineMethod (c$, "loadClass", 
function (name, checkPermission) {
if (checkPermission) {
this.framework.checkAdminPermission (this, "class");
this.checkValid ();
}return (Class.forName (name));
}, "~S,~B");
Clazz.overrideMethod (c$, "getResource", 
function (name) {
return (null);
}, "~S");
Clazz.defineMethod (c$, "isUnresolved", 
function () {
return (false);
});
Clazz.overrideMethod (c$, "start", 
function () {
this.framework.checkAdminPermission (this, "execute");
});
Clazz.overrideMethod (c$, "resume", 
function () {
this.framework.startLevelManager.initialize ();
this.framework.startLevelManager.launch (this.framework.startLevelManager.getFrameworkStartLevel ());
});
Clazz.overrideMethod (c$, "stop", 
function () {
this.framework.checkAdminPermission (this, "execute");
if (this.state == 32) {
var shutdown = this.framework.secureAction.createThread ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.SystemBundle$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "SystemBundle$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
try {
this.b$["org.eclipse.osgi.framework.internal.core.SystemBundle"].framework.shutdown ();
} catch (t) {
if (Clazz.instanceOf (t, Throwable)) {
this.b$["org.eclipse.osgi.framework.internal.core.SystemBundle"].framework.adaptor.handleRuntimeError (t);
} else {
throw t;
}
}
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.SystemBundle$1, i$, v$);
}) (this, null), "System Bundle Shutdown");
shutdown.start ();
}});
Clazz.defineMethod (c$, "suspend", 
function () {
this.framework.startLevelManager.shutdown ();
this.framework.startLevelManager.cleanup ();
this.framework.packageAdmin.cleanup ();
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("->Framework shutdown");
}});
Clazz.defineMethod (c$, "suspend", 
function (lock) {
}, "~B");
Clazz.defineMethod (c$, "update", 
function () {
this.framework.checkAdminPermission (this, "lifecycle");
if (this.state == 32) {
var restart = this.framework.secureAction.createThread ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.SystemBundle$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "SystemBundle$2", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["org.eclipse.osgi.framework.internal.core.SystemBundle"].framework.shutdown ();
this.b$["org.eclipse.osgi.framework.internal.core.SystemBundle"].framework.launch ();
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.SystemBundle$2, i$, v$);
}) (this, null), "System Bundle Update");
restart.start ();
}});
Clazz.defineMethod (c$, "update", 
function ($in) {
this.update ();
try {
$in.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}, "java.io.InputStream");
Clazz.overrideMethod (c$, "uninstall", 
function () {
this.framework.checkAdminPermission (this, "lifecycle");
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_SYSTEMBUNDLE_UNINSTALL_EXCEPTION);
});
Clazz.overrideMethod (c$, "hasPermission", 
function (permission) {
if (this.systemDomain != null) {
if (Clazz.instanceOf (permission, java.security.Permission)) {
return this.systemDomain.implies (permission);
}return false;
}return true;
}, "~O");
Clazz.overrideMethod (c$, "unresolvePermissions", 
function (refreshedBundles) {
}, "~A");
Clazz.overrideMethod (c$, "getSymbolicName", 
function () {
return "system.bundle";
});
});
