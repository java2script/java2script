Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.osgi.service.packageadmin.PackageAdmin"], "org.eclipse.osgi.framework.internal.core.PackageAdminImpl", ["java.lang.Exception", "$.IllegalArgumentException", "$.RuntimeException", "$.Thread", "java.security.AccessController", "$.PrivilegedAction", "java.util.ArrayList", "org.eclipse.osgi.framework.debug.Debug", "org.eclipse.osgi.framework.internal.core.BundleHost", "$.ExportedPackageImpl", "$.Msg", "$.Util", "org.eclipse.osgi.service.resolver.VersionRange", "org.eclipse.osgi.util.NLS", "org.osgi.framework.BundleException", "$.Version"], function () {
c$ = Clazz.decorateAsClass (function () {
this.framework = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "PackageAdminImpl", null, org.osgi.service.packageadmin.PackageAdmin);
Clazz.makeConstructor (c$, 
function (framework) {
this.framework = framework;
}, "org.eclipse.osgi.framework.internal.core.Framework");
Clazz.defineMethod (c$, "getExportedPackages", 
function (bundle) {
var allExports =  new java.util.ArrayList ();
{
var allDescriptions = this.framework.adaptor.getState ().getExportedPackages ();
for (var i = 0; i < allDescriptions.length; i++) {
if (!allDescriptions[i].isRoot ()) continue ;var exportedPackage = this.createExportedPackage (allDescriptions[i]);
if (exportedPackage == null) continue ;if (bundle == null || exportedPackage.supplier.getBundle () === bundle) allExports.add (exportedPackage);
}
}return (allExports.size () == 0 ? null : allExports.toArray ( new Array (allExports.size ())));
}, "org.osgi.framework.Bundle");
Clazz.defineMethod (c$, "createExportedPackage", 
($fz = function (description) {
var exporter = description.getExporter ();
if (exporter == null || exporter.getHost () != null) return null;
var proxy = exporter.getUserObject ();
if (proxy == null) {
var bundle = this.framework.getBundle (exporter.getBundleId ());
if (bundle == null) return null;
proxy = bundle.getLoaderProxy ();
}return  new org.eclipse.osgi.framework.internal.core.ExportedPackageImpl (description, proxy);
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.service.resolver.ExportPackageDescription");
Clazz.overrideMethod (c$, "getExportedPackage", 
function (name) {
var allExports = this.getExportedPackages (Clazz.castNullAs ("org.osgi.framework.Bundle"));
if (allExports == null) return null;
var result = null;
for (var i = 0; i < allExports.length; i++) {
if (name.equals (allExports[i].getName ())) {
if (result == null) {
result = allExports[i];
} else {
var curVersion = org.osgi.framework.Version.parseVersion (result.getSpecificationVersion ());
var newVersion = org.osgi.framework.Version.parseVersion (allExports[i].getSpecificationVersion ());
if (newVersion.compareTo (curVersion) >= 0) result = allExports[i];
}}}
return result;
}, "~S");
Clazz.defineMethod (c$, "getExportedPackages", 
function (name) {
var allExports = this.getExportedPackages (Clazz.castNullAs ("org.osgi.framework.Bundle"));
if (allExports == null) return null;
var result =  new java.util.ArrayList (1);
for (var i = 0; i < allExports.length; i++) if (name.equals (allExports[i].getName ())) result.add (allExports[i]);

return (result.size () == 0 ? null : result.toArray ( new Array (result.size ())));
}, "~S");
Clazz.overrideMethod (c$, "refreshPackages", 
function (input) {
this.framework.checkAdminPermission (this.framework.systemBundle, "resolve");
var copy = null;
if (input != null) {
{
copy =  new Array (input.length);
System.arraycopy (input, 0, copy, 0, input.length);
}}var bundles = copy;
var refresh = this.framework.secureAction.createThread ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.PackageAdminImpl$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "PackageAdminImpl$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["org.eclipse.osgi.framework.internal.core.PackageAdminImpl"].doResolveBundles (this.f$.bundles, true);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.PackageAdminImpl$1, i$, v$);
}) (this, Clazz.cloneFinals ("bundles", bundles)), "Refresh Packages");
refresh.start ();
}, "~A");
Clazz.overrideMethod (c$, "resolveBundles", 
function (bundles) {
this.framework.checkAdminPermission (this.framework.systemBundle, "resolve");
this.doResolveBundles (null, false);
if (bundles == null) bundles = this.framework.getAllBundles ();
for (var i = 0; i < bundles.length; i++) if (!(bundles[i]).isResolved ()) return false;

return true;
}, "~A");
Clazz.defineMethod (c$, "doResolveBundles", 
function (bundles, refreshPackages) {
try {
this.framework.publishBundleEvent (-2147483647, this.framework.systemBundle);
var refreshedBundles = null;
var descriptions = null;
{
var numBundles = bundles == null ? 0 : bundles.length;
if (!refreshPackages) descriptions =  new Array (0);
 else if (numBundles > 0) {
var results =  new java.util.ArrayList (numBundles);
for (var i = 0; i < numBundles; i++) {
var description = bundles[i].getBundleDescription ();
if (description != null && description.getBundleId () != 0 && !results.contains (description)) results.add (description);
var sameNames = this.framework.bundles.getBundles (bundles[i].getSymbolicName ());
if (sameNames != null && sameNames.length > 1) {
for (var j = 0; j < sameNames.length; j++) if (sameNames[j] !== bundles[i]) {
var sameName = sameNames[j].getBundleDescription ();
if (sameName != null && sameName.getBundleId () != 0 && sameName.isSingleton () && !results.contains (sameName)) results.add (sameName);
}
}}
descriptions = (results.size () == 0 ? null : results.toArray ( new Array (results.size ())));
}}var stateDelta = this.framework.adaptor.getState ().resolve (descriptions);
refreshedBundles = this.processDelta (stateDelta.getChanges (), refreshPackages);
if (refreshPackages) {
var allBundles = this.framework.getAllBundles ();
for (var i = 0; i < allBundles.length; i++) allBundles[i].unresolvePermissions (refreshedBundles);

this.resumeBundles (refreshedBundles);
}} catch (t) {
if (Clazz.instanceOf (t, Throwable)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_PACKAGEADMIN) {
org.eclipse.osgi.framework.debug.Debug.println ("PackageAdminImpl.doResolveBundles: Error occured :");
org.eclipse.osgi.framework.debug.Debug.printStackTrace (t);
}if (Clazz.instanceOf (t, RuntimeException)) throw t;
if (Clazz.instanceOf (t, Error)) throw t;
} else {
throw t;
}
} finally {
this.framework.publishBundleEvent (-2147483648, this.framework.systemBundle);
if (refreshPackages) this.framework.publishFrameworkEvent (4, this.framework.systemBundle, null);
}
}, "~A,~B");
Clazz.defineMethod (c$, "resumeBundles", 
($fz = function (bundles) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_PACKAGEADMIN) {
org.eclipse.osgi.framework.debug.Debug.println ("PackageAdminImpl: restart the bundles");
}if (bundles == null) return ;
for (var i = 0; i < bundles.length; i++) {
if (bundles[i].isResolved ()) this.framework.resumeBundle (bundles[i]);
}
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "suspendBundle", 
($fz = function (bundle) {
if (bundle.isActive () && !bundle.isFragment ()) {
var suspended = this.framework.suspendBundle (bundle, true);
if (!suspended) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_STATE_CHANGE_EXCEPTION);
}} else {
if (bundle.getStateChanging () !== Thread.currentThread ()) bundle.beginStateChange ();
}if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_PACKAGEADMIN) {
if (bundle.stateChanging == null) {
org.eclipse.osgi.framework.debug.Debug.println ("Bundle state change lock is clear! " + bundle);
org.eclipse.osgi.framework.debug.Debug.printStackTrace ( new Exception ("Stack trace"));
}}}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.framework.internal.core.AbstractBundle");
Clazz.defineMethod (c$, "applyRemovalPending", 
($fz = function (bundleDelta) {
if ((bundleDelta.getType () & 256) != 0) {
var bundle = bundleDelta.getBundle ();
if (bundle.getDependents () != null && bundle.getDependents ().length > 0) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_PACKAGEADMIN) {
org.eclipse.osgi.framework.debug.Debug.println ("Bundles still depend on removed bundle! " + bundle);
org.eclipse.osgi.framework.debug.Debug.printStackTrace ( new Exception ("Stack trace"));
}throw  new org.osgi.framework.BundleException (org.eclipse.osgi.framework.internal.core.Msg.OSGI_INTERNAL_ERROR);
}var proxy = bundle.getUserObject ();
if (proxy != null) {
org.eclipse.osgi.framework.internal.core.BundleHost.closeBundleLoader (proxy);
try {
proxy.getBundleHost ().getBundleData ().close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}}}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.service.resolver.BundleDelta");
Clazz.defineMethod (c$, "setResolved", 
($fz = function (bundleDescription) {
if (!bundleDescription.isResolved ()) return null;
var bundle = this.framework.getBundle (bundleDescription.getBundleId ());
if (bundle == null) {
var be =  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_NOT_IN_FRAMEWORK, bundleDescription));
this.framework.publishFrameworkEvent (2, this.framework.systemBundle, be);
return null;
}var resolve = true;
if (bundle.isFragment ()) {
var hosts = bundleDescription.getHost ().getHosts ();
for (var i = 0; i < hosts.length; i++) {
var host = this.framework.getBundle (hosts[i].getBundleId ());
resolve = (bundle).addHost (host.getLoaderProxy ());
}
}if (resolve) bundle.resolve ();
return bundle;
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.defineMethod (c$, "applyDeltas", 
($fz = function (bundleDeltas) {
var results =  new java.util.ArrayList (bundleDeltas.length);
for (var i = 0; i < bundleDeltas.length; i++) {
var type = bundleDeltas[i].getType ();
if ((type & (384)) != 0) this.applyRemovalPending (bundleDeltas[i]);
if ((type & 8) != 0) {
var bundle = this.setResolved (bundleDeltas[i].getBundle ());
if (bundle != null && bundle.isResolved ()) results.add (bundle);
}}
return (results.size () == 0 ? null : results.toArray ( new Array (results.size ())));
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "processDelta", 
($fz = function (bundleDeltas, refreshPackages) {
org.eclipse.osgi.framework.internal.core.Util.sort (bundleDeltas, 0, bundleDeltas.length);
var bundlesList =  new java.util.ArrayList (bundleDeltas.length);
for (var i = 0; i < bundleDeltas.length; i++) {
var changedBundle = this.framework.getBundle (bundleDeltas[i].getBundle ().getBundleId ());
if (changedBundle != null) bundlesList.add (changedBundle);
}
var refresh = bundlesList.toArray ( new Array (bundlesList.size ()));
var previouslyResolved =  Clazz.newArray (refresh.length, false);
var resolved = null;
try {
try {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_PACKAGEADMIN) {
org.eclipse.osgi.framework.debug.Debug.println ("refreshPackages: Suspend each bundle and acquire its state change lock");
}var restart = false;
for (var i = refresh.length - 1; i >= 0; i--) {
previouslyResolved[i] = refresh[i].isResolved ();
if (refresh[i] === this.framework.systemBundle) restart = true;
 else if (((refresh[i].bundledata.getType () & 2) != 0) && previouslyResolved[i]) restart = true;
 else if ((refresh[i].bundledata.getType () & 4) != 0) restart = true;
}
if (restart) {
if (refreshPackages) this.framework.publishFrameworkEvent (4, this.framework.systemBundle, null);
this.restartFramework ();
}if (refreshPackages) for (var i = refresh.length - 1; i >= 0; i--) this.suspendBundle (refresh[i]);

if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_PACKAGEADMIN) {
org.eclipse.osgi.framework.debug.Debug.println ("refreshPackages: refresh the bundles");
}{
for (var i = 0; i < refresh.length; i++) refresh[i].refresh ();

}for (var i = 0; i < refresh.length; i++) {
if (previouslyResolved[i]) this.framework.publishBundleEvent (64, refresh[i]);
}
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_PACKAGEADMIN) {
org.eclipse.osgi.framework.debug.Debug.println ("refreshPackages: applying deltas to bundles");
}{
resolved = this.applyDeltas (bundleDeltas);
}} finally {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_PACKAGEADMIN) {
org.eclipse.osgi.framework.debug.Debug.println ("refreshPackages: release the state change locks");
}if (refreshPackages) for (var i = 0; i < refresh.length; i++) {
var changedBundle = refresh[i];
changedBundle.completeStateChange ();
}
}
if (refreshPackages) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_PACKAGEADMIN) org.eclipse.osgi.framework.debug.Debug.println ("refreshPackages: clean up adaptor storage");
try {
this.framework.adaptor.compactStorage ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_PACKAGEADMIN) {
org.eclipse.osgi.framework.debug.Debug.println ("refreshPackages exception: " + e.getMessage ());
org.eclipse.osgi.framework.debug.Debug.printStackTrace (e);
}this.framework.publishFrameworkEvent (2, this.framework.systemBundle,  new org.osgi.framework.BundleException (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_REFRESH_FAILURE, e));
} else {
throw e;
}
}
}} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.BundleException)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_PACKAGEADMIN) {
org.eclipse.osgi.framework.debug.Debug.println ("refreshPackages exception: " + e.getMessage ());
org.eclipse.osgi.framework.debug.Debug.printStackTrace (e.getNestedException ());
}this.framework.publishFrameworkEvent (2, this.framework.systemBundle,  new org.osgi.framework.BundleException (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_REFRESH_FAILURE, e));
} else {
throw e;
}
}
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_PACKAGEADMIN) org.eclipse.osgi.framework.debug.Debug.println ("refreshPackages: send out RESOLVED events");
if (resolved != null) for (var i = 0; i < resolved.length; i++) this.framework.publishBundleEvent (32, resolved[i]);

return refresh;
}, $fz.isPrivate = true, $fz), "~A,~B");
Clazz.defineMethod (c$, "restartFramework", 
($fz = function () {
System.getProperties ().put ("osgi.forcedRestart", "true");
this.framework.shutdown ();
System.exit (23);
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "getRequiredBundles", 
function (symbolicName) {
var bundles;
if (symbolicName == null) bundles = this.framework.getAllBundles ();
 else bundles = this.framework.getBundleBySymbolicName (symbolicName);
if (bundles == null || bundles.length == 0) return null;
var result =  new java.util.ArrayList (bundles.length);
for (var i = 0; i < bundles.length; i++) {
if (bundles[i].isFragment () || !bundles[i].isResolved () || bundles[i].getSymbolicName () == null) continue ;result.add ((bundles[i]).getLoaderProxy ());
}
return result.size () == 0 ? null : result.toArray ( new Array (result.size ()));
}, "~S");
Clazz.overrideMethod (c$, "getBundles", 
function (symbolicName, versionRange) {
if (symbolicName == null) {
throw  new IllegalArgumentException ();
}var bundles = this.framework.getBundleBySymbolicName (symbolicName);
if (bundles == null) return null;
if (versionRange == null) {
var result =  new Array (bundles.length);
System.arraycopy (bundles, 0, result, 0, result.length);
return result;
}var result =  new java.util.ArrayList (bundles.length);
var range =  new org.eclipse.osgi.service.resolver.VersionRange (versionRange);
for (var i = 0; i < bundles.length; i++) {
if (range.isIncluded (bundles[i].getVersion ())) {
result.add (bundles[i]);
}}
if (result.size () == 0) return null;
return result.toArray ( new Array (result.size ()));
}, "~S,~S");
Clazz.overrideMethod (c$, "getFragments", 
function (bundle) {
return (bundle).getFragments ();
}, "org.osgi.framework.Bundle");
Clazz.overrideMethod (c$, "getHosts", 
function (bundle) {
var hosts = (bundle).getHosts ();
if (hosts == null) return null;
var result =  new Array (hosts.length);
for (var i = 0; i < hosts.length; i++) result[i] = hosts[i].getBundleHost ();

return result;
}, "org.osgi.framework.Bundle");
Clazz.defineMethod (c$, "getBundlePriv", 
function (clazz) {
var cl = clazz.getClassLoader ();
if (Clazz.instanceOf (cl, org.eclipse.osgi.framework.adaptor.BundleClassLoader)) return ((cl).getDelegate ()).bundle;
if (cl === this.getClass ().getClassLoader ()) return this.framework.systemBundle;
return null;
}, "Class");
Clazz.overrideMethod (c$, "getBundle", 
function (clazz) {
if (System.getSecurityManager () == null) return this.getBundlePriv (clazz);
return java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.PackageAdminImpl$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "PackageAdminImpl$2", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
return this.b$["org.eclipse.osgi.framework.internal.core.PackageAdminImpl"].getBundlePriv (this.f$.clazz);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.PackageAdminImpl$2, i$, v$);
}) (this, Clazz.cloneFinals ("clazz", clazz)));
}, "Class");
Clazz.overrideMethod (c$, "getBundleType", 
function (bundle) {
return (bundle).isFragment () ? 1 : 0;
}, "org.osgi.framework.Bundle");
Clazz.defineMethod (c$, "cleanup", 
function () {
});
Clazz.defineMethod (c$, "setResolvedBundles", 
function (systemBundle) {
this.checkSystemBundle (systemBundle);
var state = this.framework.adaptor.getState ();
var descriptions = state.getBundles ();
for (var i = 0; i < descriptions.length; i++) {
if (descriptions[i].getBundleId () == 0) this.setFrameworkVersion (descriptions[i]);
 else this.setResolved (descriptions[i]);
}
}, "org.eclipse.osgi.framework.internal.core.SystemBundle");
Clazz.defineMethod (c$, "checkSystemBundle", 
($fz = function (systemBundle) {
try {
var state = this.framework.adaptor.getState ();
var newSystemBundle = state.getFactory ().createBundleDescription (state, systemBundle.getHeaders (""), systemBundle.getLocation (), 0);
if (newSystemBundle == null) throw  new org.osgi.framework.BundleException (org.eclipse.osgi.framework.internal.core.Msg.OSGI_SYSTEMBUNDLE_DESCRIPTION_ERROR);
var oldSystemBundle = state.getBundle (0);
if (oldSystemBundle != null) {
var different = false;
if (newSystemBundle.getVersion () != null && !newSystemBundle.getVersion ().equals (oldSystemBundle.getVersion ())) different = true;
var oldPackages = oldSystemBundle.getExportPackages ();
var newPackages = newSystemBundle.getExportPackages ();
if (oldPackages.length >= newPackages.length) {
for (var i = 0; i < newPackages.length; i++) {
if (oldPackages[i].getName ().equals (newPackages[i].getName ())) {
var oldVersion = oldPackages[i].getVersion ();
var newVersion = newPackages[i].getVersion ();
if (oldVersion == null) {
if (newVersion != null) {
different = true;
break;
}} else if (!oldVersion.equals (newVersion)) {
different = true;
break;
}} else {
different = true;
break;
}}
} else {
different = true;
}if (different) {
state.removeBundle (0);
state.addBundle (newSystemBundle);
state.resolve (false);
}} else {
state.addBundle (newSystemBundle);
state.resolve (false);
}} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.BundleException)) {
e.printStackTrace ();
throw  new RuntimeException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.OSGI_SYSTEMBUNDLE_CREATE_EXCEPTION, e.getMessage ()));
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.framework.internal.core.SystemBundle");
Clazz.defineMethod (c$, "setFrameworkVersion", 
($fz = function (systemBundle) {
var packages = systemBundle.getExportPackages ();
for (var i = 0; i < packages.length; i++) if (packages[i].getName ().equals ("org.osgi.framework")) {
System.getProperties ().put ("org.osgi.framework.version", packages[i].getVersion ().toString ());
break;
}
System.getProperties ().put ("osgi.framework.version", systemBundle.getVersion ().toString ());
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.service.resolver.BundleDescription");
});
