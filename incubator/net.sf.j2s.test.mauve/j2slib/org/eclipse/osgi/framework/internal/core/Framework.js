Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.eclipse.osgi.framework.adaptor.EventPublisher", "org.eclipse.osgi.framework.eventmgr.EventDispatcher", "org.eclipse.osgi.framework.internal.core.AliasMapper", "org.eclipse.osgi.framework.util.SecureAction"], "org.eclipse.osgi.framework.internal.core.Framework", ["java.io.BufferedInputStream", "java.lang.Long", "$.NoClassDefFoundError", "$.RuntimeException", "$.SecurityException", "$.StringBuffer", "$.Thread", "java.net.URL", "$.URLConnection", "java.security.AccessController", "$.AllPermission", "$.PrivilegedAction", "$.PrivilegedExceptionAction", "java.util.ArrayList", "$.HashMap", "$.Hashtable", "$.Locale", "$.Properties", "$.StringTokenizer", "org.eclipse.osgi.framework.debug.Debug", "org.eclipse.osgi.framework.eventmgr.EventListeners", "$.EventManager", "$.ListenerQueue", "org.eclipse.osgi.framework.internal.core.AbstractBundle", "$.BundleNativeCode", "$.BundleRepository", "$.BundleSource", "$.ConditionalPermissionAdminImpl", "$.FilterImpl", "$.MessageResourceBundle", "$.Msg", "$.PackageAdminImpl", "$.PermissionAdminImpl", "$.StartLevelManager", "$.SystemBundle", "org.eclipse.osgi.framework.internal.protocol.ContentHandlerFactory", "$.StreamHandlerFactory", "org.eclipse.osgi.internal.profile.Profile", "org.eclipse.osgi.util.ManifestElement", "$.NLS", "org.osgi.framework.AdminPermission", "$.BundleEvent", "$.BundleException", "$.FrameworkEvent", "$.ServiceEvent", "$.ServicePermission", "$.Version"], function () {
c$ = Clazz.decorateAsClass (function () {
this.adaptor = null;
this.properties = null;
this.active = false;
this.bundles = null;
this.packageAdmin = null;
this.permissionAdmin = null;
this.startLevelManager = null;
this.serviceRegistry = null;
this.serviceid = 0;
this.vmProfile = null;
this.bundleEvent = null;
this.bundleEventSync = null;
this.serviceEvent = null;
this.frameworkEvent = null;
this.eventManager = null;
this.installLock = null;
this.systemBundle = null;
this.bootDelegation = null;
this.bootDelegationStems = null;
this.bootDelegateAll = false;
this.contextBootDelegation = false;
this.condPermAdmin = null;
this.secureAction = null;
this.adminPermissions = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "Framework", null, [org.eclipse.osgi.framework.eventmgr.EventDispatcher, org.eclipse.osgi.framework.adaptor.EventPublisher]);
Clazz.prepareFields (c$, function () {
this.contextBootDelegation = "true".equals (System.getProperty ("osgi.context.bootdelegation", "true"));
this.secureAction =  new org.eclipse.osgi.framework.util.SecureAction ();
});
Clazz.makeConstructor (c$, 
function (adaptor) {
this.initialize (adaptor);
}, "org.eclipse.osgi.framework.adaptor.FrameworkAdaptor");
Clazz.defineMethod (c$, "initialize", 
function (adaptor) {
if (true && org.eclipse.osgi.internal.profile.Profile.STARTUP) org.eclipse.osgi.internal.profile.Profile.logEnter ("Framework.initialze()", null);
var start = System.currentTimeMillis ();
this.adaptor = adaptor;
this.active = false;
this.installSecurityManager ();
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SECURITY) {
org.eclipse.osgi.framework.debug.Debug.println ("SecurityManager: " + System.getSecurityManager ());
org.eclipse.osgi.framework.debug.Debug.println ("ProtectionDomain of Framework.class: \n" + this.getClass ().getProtectionDomain ());
}org.eclipse.osgi.framework.internal.core.MessageResourceBundle.setAdaptor (adaptor);
adaptor.initialize (this);
if (true && org.eclipse.osgi.internal.profile.Profile.STARTUP) org.eclipse.osgi.internal.profile.Profile.logTime ("Framework.initialze()", "adapter initialized");
try {
adaptor.initializeStorage ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
throw  new RuntimeException (e.getMessage ());
} else {
throw e;
}
}
if (true && org.eclipse.osgi.internal.profile.Profile.STARTUP) org.eclipse.osgi.internal.profile.Profile.logTime ("Framework.initialze()", "adapter storage initialized");
this.initializeProperties (adaptor.getProperties ());
this.packageAdmin =  new org.eclipse.osgi.framework.internal.core.PackageAdminImpl (this);
var sm = System.getSecurityManager ();
if (sm != null) {
try {
this.permissionAdmin =  new org.eclipse.osgi.framework.internal.core.PermissionAdminImpl (this, adaptor.getPermissionStorage ());
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
throw  new RuntimeException (e.getMessage ());
} else {
throw e;
}
}
try {
this.condPermAdmin =  new org.eclipse.osgi.framework.internal.core.ConditionalPermissionAdminImpl (this, adaptor.getPermissionStorage ());
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
e.printStackTrace ();
throw  new RuntimeException (e.getMessage ());
} else {
throw e;
}
}
}if (true && org.eclipse.osgi.internal.profile.Profile.STARTUP) org.eclipse.osgi.internal.profile.Profile.logTime ("Framework.initialze()", "done init props & new PermissionAdminImpl");
this.startLevelManager =  new org.eclipse.osgi.framework.internal.core.StartLevelManager (this);
this.eventManager =  new org.eclipse.osgi.framework.eventmgr.EventManager ("Framework Event Dispatcher");
this.bundleEvent =  new org.eclipse.osgi.framework.eventmgr.EventListeners ();
this.bundleEventSync =  new org.eclipse.osgi.framework.eventmgr.EventListeners ();
this.serviceEvent =  new org.eclipse.osgi.framework.eventmgr.EventListeners ();
this.frameworkEvent =  new org.eclipse.osgi.framework.eventmgr.EventListeners ();
if (true && org.eclipse.osgi.internal.profile.Profile.STARTUP) org.eclipse.osgi.internal.profile.Profile.logTime ("Framework.initialze()", "done new EventManager");
this.serviceid = 1;
this.serviceRegistry = adaptor.getServiceRegistry ();
this.installLock =  new java.util.Hashtable (10);
this.createSystemBundle ();
this.loadVMProfile ();
this.setBootDelegation ();
if (true && org.eclipse.osgi.internal.profile.Profile.STARTUP) org.eclipse.osgi.internal.profile.Profile.logTime ("Framework.initialze()", "done createSystemBundle");
java.net.URL.setURLStreamHandlerFactory ( new org.eclipse.osgi.framework.internal.protocol.StreamHandlerFactory (this.systemBundle.context, adaptor));
java.net.URLConnection.setContentHandlerFactory ( new org.eclipse.osgi.framework.internal.protocol.ContentHandlerFactory (this.systemBundle.context));
if (true && org.eclipse.osgi.internal.profile.Profile.STARTUP) org.eclipse.osgi.internal.profile.Profile.logTime ("Framework.initialze()", "done new URLStream/Content HandlerFactory");
var bundleDatas = adaptor.getInstalledBundles ();
this.bundles =  new org.eclipse.osgi.framework.internal.core.BundleRepository (bundleDatas == null ? 10 : bundleDatas.length + 1, this.packageAdmin);
this.bundles.add (this.systemBundle);
if (bundleDatas != null) {
for (var i = 0; i < bundleDatas.length; i++) {
try {
var bundle = org.eclipse.osgi.framework.internal.core.AbstractBundle.createBundle (bundleDatas[i], this);
this.bundles.add (bundle);
} catch (be) {
if (Clazz.instanceOf (be, org.osgi.framework.BundleException)) {
this.publishFrameworkEvent (2, this.systemBundle, be);
} else {
throw be;
}
}
}
}if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) System.out.println ("Initialize the framework: " + (System.currentTimeMillis () - start));
if (true && org.eclipse.osgi.internal.profile.Profile.STARTUP) org.eclipse.osgi.internal.profile.Profile.logExit ("Framework.initialize()");
}, "org.eclipse.osgi.framework.adaptor.FrameworkAdaptor");
Clazz.defineMethod (c$, "createSystemBundle", 
($fz = function () {
try {
this.systemBundle =  new org.eclipse.osgi.framework.internal.core.SystemBundle (this);
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.BundleException)) {
e.printStackTrace ();
throw  new RuntimeException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.OSGI_SYSTEMBUNDLE_CREATE_EXCEPTION, e.getMessage ()));
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "initializeProperties", 
function (adaptorProperties) {
this.properties = System.getProperties ();
var enumKeys = adaptorProperties.propertyNames ();
while (enumKeys.hasMoreElements ()) {
var key = enumKeys.nextElement ();
if (this.properties.getProperty (key) == null) {
this.properties.put (key, adaptorProperties.getProperty (key));
}}
this.properties.put ("org.osgi.framework.vendor", "Eclipse");
this.properties.put ("org.osgi.framework.version", "1.3");
var value = this.properties.getProperty ("org.osgi.framework.processor");
if (value == null) {
value = this.properties.getProperty ("os.arch");
if (value != null) {
this.properties.put ("org.osgi.framework.processor", value);
}}value = this.properties.getProperty ("org.osgi.framework.os.name");
if (value == null) {
value = this.properties.getProperty ("os.name");
try {
var canonicalValue = org.eclipse.osgi.framework.internal.core.Framework.aliasMapper.aliasOSName (value);
if (canonicalValue != null) {
value = canonicalValue;
}} catch (ex) {
if (Clazz.instanceOf (ex, ClassCastException)) {
} else {
throw ex;
}
}
if (value != null) {
this.properties.put ("org.osgi.framework.os.name", value);
}}value = this.properties.getProperty ("org.osgi.framework.os.version");
if (value == null) {
value = this.properties.getProperty ("os.version");
if (value != null) {
var space = value.indexOf (' ');
if (space > 0) {
value = value.substring (0, space);
}this.properties.put ("org.osgi.framework.os.version", value);
}}value = this.properties.getProperty ("org.osgi.framework.language");
if (value == null) {
value = this.properties.getProperty ("user.language");
if (value != null) {
this.properties.put ("org.osgi.framework.language", value);
var tokenizer =  new java.util.StringTokenizer (value, "_");
var segments = tokenizer.countTokens ();
try {
switch (segments) {
case 2:
var userLocale =  new java.util.Locale (tokenizer.nextToken (), tokenizer.nextToken ());
java.util.Locale.setDefault (userLocale);
break;
case 3:
userLocale =  new java.util.Locale (tokenizer.nextToken (), tokenizer.nextToken (), tokenizer.nextToken ());
java.util.Locale.setDefault (userLocale);
break;
}
} catch (e) {
if (Clazz.instanceOf (e, java.util.NoSuchElementException)) {
} else {
throw e;
}
}
}}this.setExecutionEnvironment ();
}, "java.util.Properties");
Clazz.defineMethod (c$, "setExecutionEnvironment", 
($fz = function () {
var value = this.properties.getProperty ("org.osgi.framework.executionenvironment", "");
var j2meConfig = this.properties.getProperty ("microedition.configuration");
var j2meProfile = this.properties.getProperty ("microedition.profiles");
var ee =  new StringBuffer (value);
if (j2meConfig != null && j2meConfig.length > 0 && j2meProfile != null && j2meProfile.length > 0) {
this.vmProfile = j2meConfig + '_' + j2meProfile;
var ic = value.indexOf (j2meConfig);
if (!(ic >= 0) || !(ic + j2meConfig.length < value.length && (value.charAt (ic + j2meConfig.length)).charCodeAt (0) == ('/').charCodeAt (0)) || !(value.startsWith (j2meProfile, ic + j2meConfig.length + 1))) {
if (ee.length () > 0) {
ee.append (',');
}ee.append (j2meConfig).append ('/').append (j2meProfile);
}} else if (value.length > 0) {
var st =  new java.util.StringTokenizer (value, ",");
this.vmProfile = st.nextToken ().$replace ('/', '_');
} else {
var javaSpecVersion = this.properties.getProperty ("java.specification.version");
if (javaSpecVersion != null) {
var st =  new java.util.StringTokenizer (javaSpecVersion, " _-");
javaSpecVersion = st.nextToken ();
this.vmProfile = "J2SE-" + javaSpecVersion;
var index = value.indexOf (this.vmProfile);
if (index < 0) {
if (ee.length () > 0) ee.append (',');
ee.append (this.vmProfile);
}}}this.properties.put ("org.osgi.framework.executionenvironment", ee.toString ());
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setBootDelegation", 
($fz = function () {
var bootDelegationProp = this.properties.getProperty ("org.osgi.framework.bootdelegation");
if (bootDelegationProp == null) return ;
if (bootDelegationProp.trim ().length == 0) return ;
var bootPackages = org.eclipse.osgi.util.ManifestElement.getArrayFromList (bootDelegationProp);
var exactMatch =  new java.util.ArrayList (bootPackages.length);
var stemMatch =  new java.util.ArrayList (bootPackages.length);
for (var i = 0; i < bootPackages.length; i++) {
if (bootPackages[i].equals ("*")) {
this.bootDelegateAll = true;
return ;
} else if (bootPackages[i].endsWith ("*")) {
if (bootPackages[i].length > 2 && bootPackages[i].endsWith (".*")) stemMatch.add (bootPackages[i].substring (0, bootPackages[i].length - 1));
} else {
exactMatch.add (bootPackages[i]);
}}
if (exactMatch.size () > 0) this.bootDelegation = exactMatch.toArray ( new Array (exactMatch.size ()));
if (stemMatch.size () > 0) this.bootDelegationStems = stemMatch.toArray ( new Array (stemMatch.size ()));
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "loadVMProfile", 
($fz = function () {
var $in = this.findVMProfile ();
var profileProps =  new java.util.Properties ();
if ($in != null) {
try {
profileProps.load ( new java.io.BufferedInputStream ($in));
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
} finally {
try {
$in.close ();
} catch (ee) {
if (Clazz.instanceOf (ee, java.io.IOException)) {
} else {
throw ee;
}
}
}
}var systemExports = this.properties.getProperty ("org.osgi.framework.system.packages");
if (systemExports == null) {
systemExports = profileProps.getProperty ("org.osgi.framework.system.packages");
if (systemExports != null) this.properties.put ("org.osgi.framework.system.packages", systemExports);
}var type = this.properties.getProperty ("osgi.java.profile.bootdelegation");
var profileBootDelegation = profileProps.getProperty ("org.osgi.framework.bootdelegation");
if ("override".equals (type)) {
if (profileBootDelegation == null) this.properties.remove ("org.osgi.framework.bootdelegation");
 else this.properties.put ("org.osgi.framework.bootdelegation", profileBootDelegation);
} else if ("none".equals (type)) this.properties.remove ("org.osgi.framework.bootdelegation");
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "findVMProfile", 
($fz = function () {
var url = null;
var propJavaProfile = System.getProperty ("osgi.java.profile");
if (propJavaProfile != null) try {
url =  new java.net.URL (propJavaProfile);
} catch (e1) {
if (Clazz.instanceOf (e1, java.net.MalformedURLException)) {
} else {
throw e1;
}
}
if (url == null && this.vmProfile != null) {
var javaProfile = this.vmProfile + ".profile";
url = this.systemBundle.getEntry (javaProfile);
if (url == null) url = this.getClass ().getResource (javaProfile);
}if (url != null) try {
return url.openStream ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
return null;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "isActive", 
function () {
return (this.active);
});
Clazz.defineMethod (c$, "close", 
function () {
if (this.active) {
this.shutdown ();
}{
var allBundles = this.bundles.getBundles ();
var size = allBundles.size ();
for (var i = 0; i < size; i++) {
var bundle = allBundles.get (i);
bundle.close ();
}
this.bundles.removeAllBundles ();
}this.serviceRegistry = null;
if (this.bundleEvent != null) {
this.bundleEvent.removeAllListeners ();
this.bundleEvent = null;
}if (this.bundleEventSync != null) {
this.bundleEventSync.removeAllListeners ();
this.bundleEventSync = null;
}if (this.serviceEvent != null) {
this.serviceEvent.removeAllListeners ();
this.serviceEvent = null;
}if (this.frameworkEvent != null) {
this.frameworkEvent.removeAllListeners ();
this.frameworkEvent = null;
}if (this.eventManager != null) {
this.eventManager.close ();
this.eventManager = null;
}this.permissionAdmin = null;
this.condPermAdmin = null;
this.packageAdmin = null;
this.adaptor = null;
});
Clazz.defineMethod (c$, "launch", 
function () {
if (this.active) {
return ;
}this.active = true;
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Trying to launch framework");
}this.systemBundle.resume ();
});
Clazz.defineMethod (c$, "shutdown", 
function () {
if (!this.active) {
return ;
}this.systemBundle.state = 16;
try {
this.adaptor.frameworkStopping (this.systemBundle.getContext ());
} catch (t) {
if (Clazz.instanceOf (t, Throwable)) {
this.publishFrameworkEvent (2, this.systemBundle, t);
} else {
throw t;
}
}
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Trying to shutdown Framework");
}this.systemBundle.suspend ();
try {
this.adaptor.compactStorage ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
this.publishFrameworkEvent (2, this.systemBundle, e);
} else {
throw e;
}
}
this.active = false;
});
Clazz.defineMethod (c$, "createAndVerifyBundle", 
function (bundledata) {
if (bundledata.getSymbolicName () != null) {
var installedBundle = this.getBundleBySymbolicName (bundledata.getSymbolicName (), bundledata.getVersion ());
if (installedBundle != null && installedBundle.getBundleId () != bundledata.getBundleID ()) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_INSTALL_SAME_UNIQUEID, [installedBundle.getSymbolicName (), installedBundle.getVersion ().toString (), installedBundle.getLocation ()]));
}}this.verifyExecutionEnvironment (bundledata.getManifest ());
return org.eclipse.osgi.framework.internal.core.AbstractBundle.createBundle (bundledata, this);
}, "org.eclipse.osgi.framework.adaptor.BundleData");
Clazz.defineMethod (c$, "verifyExecutionEnvironment", 
function (manifest) {
var headerValue = manifest.get ("Bundle-RequiredExecutionEnvironment");
if (headerValue == null) {
return true;
}var bundleRequiredEE = org.eclipse.osgi.util.ManifestElement.parseHeader ("Bundle-RequiredExecutionEnvironment", headerValue);
if (bundleRequiredEE.length == 0) {
return true;
}var systemEE = System.getProperty ("org.osgi.framework.executionenvironment");
if (systemEE != null && !systemEE.equals ("")) {
var systemEEs = org.eclipse.osgi.util.ManifestElement.parseHeader ("Bundle-RequiredExecutionEnvironment", systemEE);
for (var i = 0; i < systemEEs.length; i++) {
for (var j = 0; j < bundleRequiredEE.length; j++) {
if (systemEEs[i].getValue ().equals (bundleRequiredEE[j].getValue ())) {
return true;
}}
}
}var bundleEE =  new StringBuffer (25);
for (var i = 0; i < bundleRequiredEE.length; i++) {
if (i > 0) {
bundleEE.append (",");
}bundleEE.append (bundleRequiredEE[i].getValue ());
}
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_INSTALL_REQUIRED_EE_EXCEPTION, bundleEE.toString ()));
}, "java.util.Dictionary");
Clazz.defineMethod (c$, "getProperty", 
function (key) {
return this.properties.getProperty (key);
}, "~S");
Clazz.defineMethod (c$, "getProperty", 
function (key, def) {
return this.properties.getProperty (key, def);
}, "~S,~S");
Clazz.defineMethod (c$, "setProperty", 
function (key, value) {
return this.properties.put (key, value);
}, "~S,~S");
Clazz.defineMethod (c$, "installBundle", 
function (location) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("install from location: " + location);
}var callerContext = java.security.AccessController.getContext ();
return this.installWorker (location, (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.Framework$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "Framework$1", null, java.security.PrivilegedExceptionAction);
Clazz.overrideMethod (c$, "run", 
function () {
var source = this.b$["org.eclipse.osgi.framework.internal.core.Framework"].adaptor.mapLocationToURLConnection (this.f$.location);
return this.b$["org.eclipse.osgi.framework.internal.core.Framework"].installWorkerPrivileged (this.f$.location, source, this.f$.callerContext);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.Framework$1, i$, v$);
}) (this, Clazz.cloneFinals ("location", location, "callerContext", callerContext)));
}, "~S");
Clazz.defineMethod (c$, "installBundle", 
function (location, $in) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("install from inputstream: " + location + ", " + $in);
}var callerContext = java.security.AccessController.getContext ();
return this.installWorker (location, (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.Framework$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "Framework$2", null, java.security.PrivilegedExceptionAction);
Clazz.overrideMethod (c$, "run", 
function () {
var source =  new org.eclipse.osgi.framework.internal.core.BundleSource (this.f$.$in);
return this.b$["org.eclipse.osgi.framework.internal.core.Framework"].installWorkerPrivileged (this.f$.location, source, this.f$.callerContext);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.Framework$2, i$, v$);
}) (this, Clazz.cloneFinals ("in", in, "location", location, "callerContext", callerContext)));
}, "~S,java.io.InputStream");
Clazz.defineMethod (c$, "installWorker", 
function (location, action) {
{
while (true) {
var bundle = this.getBundleByLocation (location);
if (bundle != null) {
return bundle;
}var current = Thread.currentThread ();
var reservation = this.installLock.put (location, current);
if (reservation == null) {
break;
}if (current.equals (reservation)) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_INSTALL_RECURSION_EXCEPTION);
}try {
this.installLock.wait ();
} catch (e) {
if (Clazz.instanceOf (e, InterruptedException)) {
} else {
throw e;
}
}
}
}try {
var bundle = java.security.AccessController.doPrivileged (action);
this.publishBundleEvent (1, bundle);
return bundle;
} catch (e) {
if (Clazz.instanceOf (e, java.security.PrivilegedActionException)) {
if (Clazz.instanceOf (e.getException (), RuntimeException)) throw e.getException ();
throw e.getException ();
} else {
throw e;
}
} finally {
{
this.installLock.remove (location);
this.installLock.notifyAll ();
}}
}, "~S,java.security.PrivilegedExceptionAction");
Clazz.defineMethod (c$, "installWorkerPrivileged", 
function (location, source, callerContext) {
var storage = this.adaptor.installBundle (location, source);
var bundle;
try {
var bundledata = storage.begin ();
bundle = this.createAndVerifyBundle (bundledata);
try {
var nativepaths = this.selectNativeCode (bundle);
if (nativepaths != null) {
bundledata.installNativeCode (nativepaths);
}bundle.load ();
if (System.getSecurityManager () != null) {
var extension = (bundledata.getType () & (6)) != 0;
if (extension && !bundle.hasPermission ( new java.security.AllPermission ())) throw  new org.osgi.framework.BundleException (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_EXTENSION_PERMISSION,  new SecurityException (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_EXTENSION_PERMISSION));
try {
java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.Framework$3")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "Framework$3", null, java.security.PrivilegedExceptionAction);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["org.eclipse.osgi.framework.internal.core.Framework"].checkAdminPermission (this.f$.bundle, "lifecycle");
if (this.f$.extension) this.b$["org.eclipse.osgi.framework.internal.core.Framework"].checkAdminPermission (this.f$.bundle, "extensionLifecycle");
return null;
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.Framework$3, i$, v$);
}) (this, Clazz.cloneFinals ("bundle", bundle, "extension", extension)), callerContext);
} catch (e) {
if (Clazz.instanceOf (e, java.security.PrivilegedActionException)) {
throw e.getException ();
} else {
throw e;
}
}
}storage.commit (false);
} catch (error) {
if (Clazz.instanceOf (error, Throwable)) {
{
bundle.unload ();
}bundle.close ();
throw error;
} else {
throw error;
}
}
this.bundles.add (bundle);
} catch (t) {
if (Clazz.instanceOf (t, Throwable)) {
try {
storage.undo ();
} catch (ee) {
if (Clazz.instanceOf (ee, org.osgi.framework.BundleException)) {
this.publishFrameworkEvent (2, this.systemBundle, ee);
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
return bundle;
}, "~S,java.net.URLConnection,java.security.AccessControlContext");
Clazz.defineMethod (c$, "selectNativeCode", 
function (bundle) {
var headerValue = (bundle).getBundleData ().getManifest ().get ("Bundle-NativeCode");
if (headerValue == null) {
return (null);
}var elements = org.eclipse.osgi.util.ManifestElement.parseHeader ("Bundle-NativeCode", headerValue);
var bundleNativeCodes =  new java.util.ArrayList (elements.length);
var length = elements.length;
var optional = false;
if (elements[length - 1].getValue ().equals ("*")) {
optional = true;
length--;
}var processor = this.getProperty ("org.osgi.framework.processor");
var osname = this.getProperty ("org.osgi.framework.os.name");
var osversion;
try {
osversion = org.osgi.framework.Version.parseVersion (this.getProperty ("org.osgi.framework.os.version"));
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
osversion = org.osgi.framework.Version.emptyVersion;
} else {
throw e;
}
}
var language = this.getProperty ("org.osgi.framework.language");
for (var i = 0; i < length; i++) {
var bnc =  new org.eclipse.osgi.framework.internal.core.BundleNativeCode (elements[i], bundle);
if (bnc.matchProcessorOSNameFilter (processor, osname) > 0 && bnc.matchOSVersion (osversion) != null && bnc.matchLanguage (language) > 0) bundleNativeCodes.add (bnc);
}
if (bundleNativeCodes.size () == 0) return this.noMatches (optional);
var iter = bundleNativeCodes.iterator ();
var highestRanking = iter.next ();
while (iter.hasNext ()) {
var bnc = iter.next ();
if (this.isBncGreaterThan (bnc, highestRanking, osversion, language)) highestRanking = bnc;
}
return highestRanking.getPaths ();
}, "org.osgi.framework.Bundle");
Clazz.defineMethod (c$, "isBncGreaterThan", 
($fz = function (candidate, highestRanking, version, language) {
var currentHigh = highestRanking.matchOSVersion (version);
var candidateHigh = candidate.matchOSVersion (version);
if (currentHigh.compareTo (candidateHigh) < 0) return true;
if (highestRanking.matchLanguage (language) < candidate.matchLanguage (language)) return true;
return false;
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.framework.internal.core.BundleNativeCode,org.eclipse.osgi.framework.internal.core.BundleNativeCode,org.osgi.framework.Version,~S");
Clazz.defineMethod (c$, "getBundle", 
function (id) {
{
return this.bundles.getBundle (id);
}}, "~N");
Clazz.defineMethod (c$, "getBundleBySymbolicName", 
function (symbolicName, version) {
{
return this.bundles.getBundle (symbolicName, version);
}}, "~S,org.osgi.framework.Version");
Clazz.defineMethod (c$, "getBundles", 
function () {
return (this.bundles);
});
Clazz.defineMethod (c$, "getAllBundles", 
function () {
{
var allBundles = this.bundles.getBundles ();
var size = allBundles.size ();
if (size == 0) {
return (null);
}var bundlelist =  new Array (size);
allBundles.toArray (bundlelist);
return (bundlelist);
}});
Clazz.defineMethod (c$, "resumeBundle", 
function (bundle) {
if (bundle.isActive ()) {
return ;
}try {
var status = bundle.getBundleData ().getStatus ();
if ((status & 1) == 0) {
return ;
}if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Trying to start bundle " + bundle);
}bundle.resume ();
} catch (be) {
if (Clazz.instanceOf (be, org.osgi.framework.BundleException)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Bundle resume exception: " + be.getMessage ());
org.eclipse.osgi.framework.debug.Debug.printStackTrace (be.getNestedException ());
}this.publishFrameworkEvent (2, bundle, be);
} else {
throw be;
}
}
}, "org.eclipse.osgi.framework.internal.core.AbstractBundle");
Clazz.defineMethod (c$, "suspendBundle", 
function (bundle, lock) {
var changed = false;
if (!bundle.isActive () || bundle.isFragment ()) {
return changed;
}try {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Trying to suspend bundle " + bundle);
}bundle.suspend (lock);
} catch (be) {
if (Clazz.instanceOf (be, org.osgi.framework.BundleException)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Bundle suspend exception: " + be.getMessage ());
org.eclipse.osgi.framework.debug.Debug.printStackTrace (be.getNestedException ());
}this.publishFrameworkEvent (2, bundle, be);
} else {
throw be;
}
}
if (!bundle.isActive ()) {
changed = true;
}return (changed);
}, "org.eclipse.osgi.framework.internal.core.AbstractBundle,~B");
Clazz.defineMethod (c$, "getBundleByLocation", 
function (location) {
{
var finalLocation = location;
return java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.Framework$4")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "Framework$4", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
var allBundles = this.b$["org.eclipse.osgi.framework.internal.core.Framework"].bundles.getBundles ();
var size = allBundles.size ();
for (var i = 0; i < size; i++) {
var bundle = allBundles.get (i);
if (this.f$.finalLocation.equals (bundle.getLocation ())) {
return (bundle);
}}
return (null);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.Framework$4, i$, v$);
}) (this, Clazz.cloneFinals ("finalLocation", finalLocation)));
}}, "~S");
Clazz.defineMethod (c$, "getBundleBySymbolicName", 
function (symbolicName) {
{
return this.bundles.getBundles (symbolicName);
}}, "~S");
Clazz.defineMethod (c$, "getServiceReferences", 
function (clazz, filterstring, context, allservices) {
var filter = (filterstring == null) ? null :  new org.eclipse.osgi.framework.internal.core.FilterImpl (filterstring);
var services = null;
if (clazz != null) {
try {
this.checkGetServicePermission (clazz);
} catch (se) {
if (Clazz.instanceOf (se, SecurityException)) {
return (null);
} else {
throw se;
}
}
}{
services = this.serviceRegistry.lookupServiceReferences (clazz, filter);
if (services == null) {
return null;
}var removed = 0;
for (var i = services.length - 1; i >= 0; i--) {
var ref = services[i];
var classes = ref.getClasses ();
if (allservices || context.isAssignableTo (services[i])) {
if (clazz == null) try {
this.checkGetServicePermission (classes);
} catch (se) {
if (Clazz.instanceOf (se, SecurityException)) {
services[i] = null;
removed++;
} else {
throw se;
}
}
} else {
services[i] = null;
removed++;
}}
if (removed > 0) {
var temp = services;
services =  new Array (temp.length - removed);
for (var i = temp.length - 1; i >= 0; i--) {
if (temp[i] == null) removed--;
 else services[i - removed] = temp[i];
}
}}return services == null || services.length == 0 ? null : services;
}, "~S,~S,org.eclipse.osgi.framework.internal.core.BundleContextImpl,~B");
Clazz.defineMethod (c$, "getNextServiceId", 
function () {
var id = this.serviceid;
this.serviceid++;
return (id);
});
Clazz.defineMethod (c$, "getDataFile", 
function (bundle, filename) {
return java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.Framework$5")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "Framework$5", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
return this.f$.bundle.getBundleData ().getDataFile (this.f$.filename);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.Framework$5, i$, v$);
}) (this, Clazz.cloneFinals ("bundle", bundle, "filename", filename)));
}, "org.eclipse.osgi.framework.internal.core.AbstractBundle,~S");
Clazz.defineMethod (c$, "checkAdminPermission", 
function (bundle, action) {
var sm = System.getSecurityManager ();
if (sm != null) sm.checkPermission (this.getAdminPermission (bundle, action));
}, "org.osgi.framework.Bundle,~S");
Clazz.defineMethod (c$, "getAdminPermission", 
($fz = function (bundle, action) {
if (this.adminPermissions == null) this.adminPermissions =  new java.util.HashMap ();
var ID =  new Long (bundle.getBundleId ());
var bundlePermissions = this.adminPermissions.get (ID);
if (bundlePermissions == null) {
bundlePermissions =  new java.util.HashMap ();
this.adminPermissions.put (ID, bundlePermissions);
}var result = bundlePermissions.get (action);
if (result == null) {
result =  new org.osgi.framework.AdminPermission (bundle, action);
bundlePermissions.put (action, result);
}return result;
}, $fz.isPrivate = true, $fz), "org.osgi.framework.Bundle,~S");
Clazz.defineMethod (c$, "checkRegisterServicePermission", 
function (names) {
var sm = System.getSecurityManager ();
if (sm != null) {
var len = names.length;
for (var i = 0; i < len; i++) {
sm.checkPermission ( new org.osgi.framework.ServicePermission (names[i], "register"));
}
}}, "~A");
Clazz.defineMethod (c$, "checkGetServicePermission", 
function (names) {
var sm = System.getSecurityManager ();
if (sm != null) {
var se = null;
var len = names.length;
for (var i = 0; i < len; i++) {
try {
sm.checkPermission ( new org.osgi.framework.ServicePermission (names[i], "get"));
return ;
} catch (e) {
if (Clazz.instanceOf (e, SecurityException)) {
se = e;
} else {
throw e;
}
}
}
throw se;
}}, "~A");
Clazz.defineMethod (c$, "checkGetServicePermission", 
function (name) {
var sm = System.getSecurityManager ();
if (sm != null) {
sm.checkPermission ( new org.osgi.framework.ServicePermission (name, "get"));
}}, "~S");
Clazz.defineMethod (c$, "installSecurityManager", 
function () {
var securityManager = System.getProperty ("java.security.manager");
if (securityManager != null) {
var sm = System.getSecurityManager ();
if (sm == null) {
if (securityManager.length < 1) {
securityManager = "java.lang.SecurityManager";
}try {
var clazz = Class.forName (securityManager);
sm = clazz.newInstance ();
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SECURITY) {
org.eclipse.osgi.framework.debug.Debug.println ("Setting SecurityManager to: " + sm);
}System.setSecurityManager (sm);
return ;
} catch (e$$) {
if (Clazz.instanceOf (e$$, ClassNotFoundException)) {
var e = e$$;
{
}
} else if (Clazz.instanceOf (e$$, ClassCastException)) {
var e = e$$;
{
}
} else if (Clazz.instanceOf (e$$, InstantiationException)) {
var e = e$$;
{
}
} else if (Clazz.instanceOf (e$$, IllegalAccessException)) {
var e = e$$;
{
}
} else {
throw e$$;
}
}
throw  new NoClassDefFoundError (securityManager);
}}});
Clazz.overrideMethod (c$, "publishFrameworkEvent", 
function (type, bundle, throwable) {
if (this.frameworkEvent != null) {
if (bundle == null) bundle = this.systemBundle;
var event =  new org.osgi.framework.FrameworkEvent (type, bundle, throwable);
if (System.getSecurityManager () == null) {
this.publishFrameworkEventPrivileged (event);
} else {
java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.Framework$6")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "Framework$6", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["org.eclipse.osgi.framework.internal.core.Framework"].publishFrameworkEventPrivileged (this.f$.event);
return null;
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.Framework$6, i$, v$);
}) (this, Clazz.cloneFinals ("event", event)));
}}}, "~N,org.osgi.framework.Bundle,Throwable");
Clazz.defineMethod (c$, "publishFrameworkEventPrivileged", 
function (event) {
if (event.getType () == 2) {
var frameworkLog = this.adaptor.getFrameworkLog ();
if (frameworkLog != null) frameworkLog.log (event);
}var listeners =  new org.eclipse.osgi.framework.eventmgr.ListenerQueue (this.eventManager);
var contexts =  new org.eclipse.osgi.framework.eventmgr.ListenerQueue (this.eventManager);
{
contexts.queueListeners (this.frameworkEvent, this);
contexts.dispatchEventSynchronous (4, listeners);
}listeners.dispatchEventAsynchronous (4, event);
}, "org.osgi.framework.FrameworkEvent");
Clazz.defineMethod (c$, "publishBundleEvent", 
function (type, bundle) {
if ((this.bundleEventSync != null) || (this.bundleEvent != null)) {
var event =  new org.osgi.framework.BundleEvent (type, bundle);
if (System.getSecurityManager () == null) {
this.publishBundleEventPrivileged (event);
} else {
java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.Framework$7")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "Framework$7", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["org.eclipse.osgi.framework.internal.core.Framework"].publishBundleEventPrivileged (this.f$.event);
return null;
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.Framework$7, i$, v$);
}) (this, Clazz.cloneFinals ("event", event)));
}}}, "~N,org.osgi.framework.Bundle");
Clazz.defineMethod (c$, "publishBundleEventPrivileged", 
function (event) {
var listenersSync = null;
if (this.bundleEventSync != null) {
listenersSync =  new org.eclipse.osgi.framework.eventmgr.ListenerQueue (this.eventManager);
var contexts =  new org.eclipse.osgi.framework.eventmgr.ListenerQueue (this.eventManager);
{
contexts.queueListeners (this.bundleEventSync, this);
contexts.dispatchEventSynchronous (2, listenersSync);
}}var listenersAsync = null;
if (this.bundleEvent != null && (event.getType () & (384)) == 0) {
listenersAsync =  new org.eclipse.osgi.framework.eventmgr.ListenerQueue (this.eventManager);
var contexts =  new org.eclipse.osgi.framework.eventmgr.ListenerQueue (this.eventManager);
{
contexts.queueListeners (this.bundleEvent, this);
contexts.dispatchEventSynchronous (1, listenersAsync);
}}if (listenersSync != null) {
listenersSync.dispatchEventSynchronous (2, event);
}if (listenersAsync != null) {
listenersAsync.dispatchEventAsynchronous (1, event);
}}, "org.osgi.framework.BundleEvent");
Clazz.defineMethod (c$, "publishServiceEvent", 
function (type, reference) {
if (this.serviceEvent != null) {
var event =  new org.osgi.framework.ServiceEvent (type, reference);
if (System.getSecurityManager () == null) {
this.publishServiceEventPrivileged (event);
} else {
java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.Framework$8")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "Framework$8", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["org.eclipse.osgi.framework.internal.core.Framework"].publishServiceEventPrivileged (this.f$.event);
return null;
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.Framework$8, i$, v$);
}) (this, Clazz.cloneFinals ("event", event)));
}}}, "~N,org.osgi.framework.ServiceReference");
Clazz.defineMethod (c$, "publishServiceEventPrivileged", 
function (event) {
var listeners =  new org.eclipse.osgi.framework.eventmgr.ListenerQueue (this.eventManager);
var contexts =  new org.eclipse.osgi.framework.eventmgr.ListenerQueue (this.eventManager);
{
contexts.queueListeners (this.serviceEvent, this);
contexts.dispatchEventSynchronous (3, listeners);
}listeners.dispatchEventSynchronous (3, event);
}, "org.osgi.framework.ServiceEvent");
Clazz.overrideMethod (c$, "dispatchEvent", 
function (l, lo, action, object) {
try {
var context = l;
if (context.isValid ()) {
var queue = object;
switch (action) {
case 1:
{
queue.queueListeners (context.bundleEvent, context);
break;
}case 2:
{
queue.queueListeners (context.bundleEventSync, context);
break;
}case 3:
{
queue.queueListeners (context.serviceEvent, context);
break;
}case 4:
{
queue.queueListeners (context.frameworkEvent, context);
break;
}}
}} catch (t) {
if (Clazz.instanceOf (t, Throwable)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Exception in Top level event dispatcher: " + t.getMessage ());
org.eclipse.osgi.framework.debug.Debug.printStackTrace (t);
}this.adaptor.handleRuntimeError (t);
publisherror : {
if (action == 4) {
var event = object;
if (event.getType () == 2) {
break publisherror;
}}var context = l;
this.publishFrameworkEvent (2, context.bundle, t);
}} else {
throw t;
}
}
}, "~O,~O,~N,~O");
Clazz.defineMethod (c$, "noMatches", 
($fz = function (optional) {
if (optional) {
return null;
}throw  new org.osgi.framework.BundleException (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_NATIVECODE_MATCH_EXCEPTION);
}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineStatics (c$,
"BUNDLEEVENT", 1,
"BUNDLEEVENTSYNC", 2,
"SERVICEEVENT", 3,
"FRAMEWORKEVENT", 4,
"BATCHEVENT_BEGIN", -2147483647,
"BATCHEVENT_END", -2147483648);
c$.aliasMapper = c$.prototype.aliasMapper =  new org.eclipse.osgi.framework.internal.core.AliasMapper ();
});
