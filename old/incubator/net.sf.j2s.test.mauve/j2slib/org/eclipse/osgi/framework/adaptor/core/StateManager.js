Clazz.declarePackage ("org.eclipse.osgi.framework.adaptor.core");
Clazz.load (["org.eclipse.osgi.service.resolver.PlatformAdmin"], "org.eclipse.osgi.framework.adaptor.core.StateManager", ["java.lang.Boolean", "$.IllegalArgumentException", "$.Long", "$.Thread", "org.eclipse.osgi.internal.module.ResolverImpl", "org.eclipse.osgi.internal.resolver.ReadOnlyState", "$.StateHelperImpl", "$.StateMsg", "$.StateObjectFactoryImpl", "org.osgi.framework.BundleException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.expireTime = 300000;
this.readStartupTime = 0;
this.systemState = null;
this.factory = null;
this.lastTimeStamp = 0;
this.installer = null;
this.cachedState = false;
this.stateFile = null;
this.lazyFile = null;
this.expectedTimeStamp = 0;
this.context = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.adaptor.core, "StateManager", null, [org.eclipse.osgi.service.resolver.PlatformAdmin, Runnable]);
Clazz.makeConstructor (c$, 
function (stateFile, lazyFile, context) {
this.construct (stateFile, lazyFile, context, -1);
}, "java.io.File,java.io.File,org.osgi.framework.BundleContext");
Clazz.makeConstructor (c$, 
function (stateFile, lazyFile, context, expectedTimeStamp) {
this.stateFile = stateFile;
this.lazyFile = lazyFile;
this.context = context;
this.expectedTimeStamp = expectedTimeStamp;
this.factory =  new org.eclipse.osgi.internal.resolver.StateObjectFactoryImpl ();
}, "java.io.File,java.io.File,org.osgi.framework.BundleContext,~N");
Clazz.defineMethod (c$, "shutdown", 
function (stateFile, lazyFile) {
var removalPendings = this.systemState.getRemovalPendings ();
if (removalPendings.length > 0) this.systemState.resolve (removalPendings);
this.writeState (stateFile, lazyFile);
}, "java.io.File,java.io.File");
Clazz.defineMethod (c$, "readSystemState", 
($fz = function (stateFile, lazyFile, expectedTimeStamp) {
if (stateFile == null || !stateFile.isFile ()) return ;
if (org.eclipse.osgi.framework.adaptor.core.StateManager.DEBUG_READER) this.readStartupTime = System.currentTimeMillis ();
try {
var lazyLoad = !Boolean.$valueOf (System.getProperty (org.eclipse.osgi.framework.adaptor.core.StateManager.PROP_NO_LAZY_LOADING)).booleanValue ();
this.systemState = this.factory.readSystemState (stateFile, lazyFile, lazyLoad, expectedTimeStamp);
if (this.systemState == null || !this.initializeSystemState ()) {
this.systemState = null;
return ;
}this.cachedState = true;
try {
this.expireTime = Long.parseLong (System.getProperty (org.eclipse.osgi.framework.adaptor.core.StateManager.PROP_LAZY_UNLOADING_TIME, Long.toString (this.expireTime)));
} catch (nfe) {
if (Clazz.instanceOf (nfe, NumberFormatException)) {
this.expireTime = 0;
} else {
throw nfe;
}
}
if (lazyLoad && this.expireTime > 0) {
var t =  new Thread (this, "State Data Manager");
t.setDaemon (true);
t.start ();
}} catch (ioe) {
if (Clazz.instanceOf (ioe, java.io.IOException)) {
ioe.printStackTrace ();
} else {
throw ioe;
}
} finally {
if (org.eclipse.osgi.framework.adaptor.core.StateManager.DEBUG_READER) System.out.println ("Time to read state: " + (System.currentTimeMillis () - this.readStartupTime));
}
}, $fz.isPrivate = true, $fz), "java.io.File,java.io.File,~N");
Clazz.defineMethod (c$, "writeState", 
($fz = function (stateFile, lazyFile) {
if (this.systemState == null) return ;
if (this.cachedState && this.lastTimeStamp == this.systemState.getTimeStamp ()) return ;
this.systemState.fullyLoad ();
this.factory.writeState (this.systemState, stateFile, lazyFile);
}, $fz.isPrivate = true, $fz), "java.io.File,java.io.File");
Clazz.defineMethod (c$, "initializeSystemState", 
($fz = function () {
this.systemState.setResolver (this.getResolver (System.getSecurityManager () != null));
this.lastTimeStamp = this.systemState.getTimeStamp ();
return !this.systemState.setPlatformProperties (System.getProperties ());
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "createSystemState", 
function () {
if (this.systemState == null) {
this.systemState = this.factory.createSystemState ();
this.initializeSystemState ();
}return this.systemState;
});
Clazz.defineMethod (c$, "readSystemState", 
function () {
if (this.systemState == null) this.readSystemState (this.stateFile, this.lazyFile, this.expectedTimeStamp);
return this.systemState;
});
Clazz.defineMethod (c$, "getSystemState", 
function () {
return this.systemState;
});
Clazz.defineMethod (c$, "getCachedTimeStamp", 
function () {
return this.lastTimeStamp;
});
Clazz.defineMethod (c$, "getState", 
function (mutable) {
return mutable ? this.factory.createState (this.systemState) :  new org.eclipse.osgi.internal.resolver.ReadOnlyState (this.systemState);
}, "~B");
Clazz.defineMethod (c$, "getState", 
function () {
return this.getState (true);
});
Clazz.overrideMethod (c$, "getFactory", 
function () {
return this.factory;
});
Clazz.overrideMethod (c$, "commit", 
function (state) {
if (this.installer == null) throw  new IllegalArgumentException ("PlatformAdmin.commit() not supported");
if (!(Clazz.instanceOf (state, org.eclipse.osgi.internal.resolver.UserState))) throw  new IllegalArgumentException ("Wrong state implementation");
if (state.getTimeStamp () != this.systemState.getTimeStamp ()) throw  new org.osgi.framework.BundleException (org.eclipse.osgi.internal.resolver.StateMsg.COMMIT_INVALID_TIMESTAMP);
var delta = state.compare (this.systemState);
var changes = delta.getChanges ();
for (var i = 0; i < changes.length; i++) if ((changes[i].getType () & 1) > 0) this.installer.installBundle (changes[i].getBundle ());
 else if ((changes[i].getType () & 2) > 0) this.installer.uninstallBundle (changes[i].getBundle ());
 else if ((changes[i].getType () & 4) > 0) this.installer.updateBundle (changes[i].getBundle ());
 else {
}
}, "org.eclipse.osgi.service.resolver.State");
Clazz.defineMethod (c$, "getResolver", 
function () {
return this.getResolver (false);
});
Clazz.defineMethod (c$, "getResolver", 
($fz = function (checkPermissions) {
return  new org.eclipse.osgi.internal.module.ResolverImpl (this.context, checkPermissions);
}, $fz.isPrivate = true, $fz), "~B");
Clazz.overrideMethod (c$, "getStateHelper", 
function () {
return org.eclipse.osgi.internal.resolver.StateHelperImpl.getInstance ();
});
Clazz.defineMethod (c$, "getInstaller", 
function () {
return this.installer;
});
Clazz.defineMethod (c$, "setInstaller", 
function (installer) {
this.installer = installer;
}, "org.eclipse.osgi.framework.adaptor.core.BundleInstaller");
Clazz.overrideMethod (c$, "run", 
function () {
while (true) {
try {
Thread.sleep (this.expireTime);
} catch (e) {
if (Clazz.instanceOf (e, InterruptedException)) {
return ;
} else {
throw e;
}
}
if (this.systemState != null && this.lastTimeStamp == this.systemState.getTimeStamp ()) this.systemState.unloadLazyData (this.expireTime);
}
});
Clazz.defineStatics (c$,
"DEBUG", false,
"DEBUG_READER", false,
"DEBUG_PLATFORM_ADMIN", false,
"DEBUG_PLATFORM_ADMIN_RESOLVER", false,
"MONITOR_PLATFORM_ADMIN", false,
"PROP_NO_LAZY_LOADING", "osgi.noLazyStateLoading",
"PROP_LAZY_UNLOADING_TIME", "osgi.lazyStateUnloadingTime");
});
