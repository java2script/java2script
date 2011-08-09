Clazz.declarePackage ("org.eclipse.osgi.internal.resolver");
Clazz.load (["org.eclipse.osgi.service.resolver.State", "java.util.HashSet", "$.Hashtable", "org.eclipse.osgi.framework.internal.core.KeyedHashSet"], "org.eclipse.osgi.internal.resolver.StateImpl", ["java.lang.IllegalArgumentException", "$.IllegalStateException", "$.Long", "$.UnsupportedOperationException", "java.util.ArrayList", "org.eclipse.osgi.framework.adaptor.core.StateManager", "org.eclipse.osgi.framework.debug.Debug", "$.FrameworkDebugOptions", "org.eclipse.osgi.internal.resolver.StateBuilder", "$.StateDeltaImpl", "org.eclipse.osgi.util.ManifestElement"], function () {
c$ = Clazz.decorateAsClass (function () {
this.resolver = null;
this.changes = null;
this.resolving = false;
this.removalPendings = null;
this.resolved = true;
this.timeStamp = 0;
this.bundleDescriptions = null;
this.factory = null;
this.resolvedBundles = null;
this.fullyLoaded = false;
this.reader = null;
this.platformProperties = null;
this.systemExports = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.internal.resolver, "StateImpl", null, org.eclipse.osgi.service.resolver.State);
Clazz.prepareFields (c$, function () {
this.removalPendings =  new java.util.HashSet ();
this.timeStamp = System.currentTimeMillis ();
this.bundleDescriptions =  new org.eclipse.osgi.framework.internal.core.KeyedHashSet (false);
this.resolvedBundles =  new org.eclipse.osgi.framework.internal.core.KeyedHashSet ();
this.platformProperties = [ new java.util.Hashtable (org.eclipse.osgi.internal.resolver.StateImpl.PROPS.length)];
this.systemExports =  new Array (0);
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "addBundle", 
function (description) {
if (!this.basicAddBundle (description)) return false;
this.resolved = false;
this.getDelta ().recordBundleAdded (description);
if (this.resolver != null) this.resolver.bundleAdded (description);
return true;
}, "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.overrideMethod (c$, "updateBundle", 
function (newDescription) {
var existing = this.bundleDescriptions.get (newDescription);
if (existing == null) return false;
if (!this.bundleDescriptions.remove (existing)) return false;
this.resolvedBundles.remove (existing);
if (!this.basicAddBundle (newDescription)) return false;
this.resolved = false;
this.getDelta ().recordBundleUpdated (newDescription);
if (this.resolver != null) {
var pending = existing.getDependents ().length > 0;
this.resolver.bundleUpdated (newDescription, existing, pending);
if (pending) {
this.getDelta ().recordBundleRemovalPending (existing);
this.removalPendings.add (existing);
} else {
{
try {
this.resolving = true;
this.resolveBundle (existing, false, null, null, null, null);
} finally {
this.resolving = false;
}
}}}return true;
}, "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.defineMethod (c$, "removeBundle", 
function (bundleId) {
var toRemove = this.getBundle (bundleId);
if (toRemove == null || !this.removeBundle (toRemove)) return null;
return toRemove;
}, "~N");
Clazz.defineMethod (c$, "removeBundle", 
function (toRemove) {
if (!this.bundleDescriptions.remove (toRemove)) return false;
this.resolvedBundles.remove (toRemove);
this.resolved = false;
this.getDelta ().recordBundleRemoved (toRemove);
if (this.resolver != null) {
var pending = toRemove.getDependents ().length > 0;
this.resolver.bundleRemoved (toRemove, pending);
if (pending) {
this.getDelta ().recordBundleRemovalPending (toRemove);
this.removalPendings.add (toRemove);
} else {
{
try {
this.resolving = true;
this.resolveBundle (toRemove, false, null, null, null, null);
} finally {
this.resolving = false;
}
}}}return true;
}, "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.overrideMethod (c$, "getChanges", 
function () {
return this.getDelta ();
});
Clazz.defineMethod (c$, "getDelta", 
($fz = function () {
if (this.changes == null) this.changes =  new org.eclipse.osgi.internal.resolver.StateDeltaImpl (this);
return this.changes;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getBundles", 
function (symbolicName) {
var bundles =  new java.util.ArrayList ();
for (var iter = this.bundleDescriptions.iterator (); iter.hasNext (); ) {
var bundle = iter.next ();
if (symbolicName.equals (bundle.getSymbolicName ())) bundles.add (bundle);
}
return bundles.toArray ( new Array (bundles.size ()));
}, "~S");
Clazz.defineMethod (c$, "getBundles", 
function () {
return this.bundleDescriptions.elements ( new Array (this.bundleDescriptions.size ()));
});
Clazz.defineMethod (c$, "getBundle", 
function (id) {
var result = this.bundleDescriptions.getByKey ( new Long (id));
if (result != null) return result;
for (var iter = this.removalPendings.iterator (); iter.hasNext (); ) {
var removedBundle = iter.next ();
if (removedBundle.getBundleId () == id) return removedBundle;
}
return null;
}, "~N");
Clazz.defineMethod (c$, "getBundle", 
function (name, version) {
var allBundles = this.getBundles (name);
if (allBundles.length == 1) return version == null || allBundles[0].getVersion ().equals (version) ? allBundles[0] : null;
if (allBundles.length == 0) return null;
var unresolvedFound = null;
var resolvedFound = null;
for (var i = 0; i < allBundles.length; i++) {
var current = allBundles[i];
var base;
if (current.isResolved ()) base = resolvedFound;
 else base = unresolvedFound;
if (version == null || current.getVersion ().equals (version)) {
if (base != null && (base.getVersion ().compareTo (current.getVersion ()) <= 0 || base.getBundleId () > current.getBundleId ())) {
if (base === resolvedFound) resolvedFound = current;
 else unresolvedFound = current;
} else {
if (current.isResolved ()) resolvedFound = current;
 else unresolvedFound = current;
}}}
if (resolvedFound != null) return resolvedFound;
return unresolvedFound;
}, "~S,org.osgi.framework.Version");
Clazz.overrideMethod (c$, "getTimeStamp", 
function () {
return this.timeStamp;
});
Clazz.overrideMethod (c$, "isResolved", 
function () {
return this.resolved || this.isEmpty ();
});
Clazz.overrideMethod (c$, "resolveConstraint", 
function (constraint, supplier) {
(constraint).setSupplier (supplier);
}, "org.eclipse.osgi.service.resolver.VersionConstraint,org.eclipse.osgi.service.resolver.BaseDescription");
Clazz.overrideMethod (c$, "resolveBundle", 
function (bundle, status, hosts, selectedExports, resolvedRequires, resolvedImports) {
if (!this.resolving) throw  new IllegalStateException ();
var modifiable = bundle;
this.getDelta ().recordBundleResolved (modifiable, status);
modifiable.setLazyLoaded (false);
modifiable.setStateBit (1, status);
if (status) {
this.resolveConstraints (modifiable, hosts, selectedExports, resolvedRequires, resolvedImports);
this.resolvedBundles.add (modifiable);
} else {
this.unresolveConstraints (modifiable);
this.resolvedBundles.remove (modifiable);
}}, "org.eclipse.osgi.service.resolver.BundleDescription,~B,~A,~A,~A,~A");
Clazz.overrideMethod (c$, "removeBundleComplete", 
function (bundle) {
if (!this.resolving) throw  new IllegalStateException ();
this.getDelta ().recordBundleRemovalComplete (bundle);
this.removalPendings.remove (bundle);
}, "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.defineMethod (c$, "resolveConstraints", 
($fz = function (bundle, hosts, selectedExports, resolvedRequires, resolvedImports) {
var hostSpec = bundle.getHost ();
if (hostSpec != null) {
if (hosts != null) {
hostSpec.setHosts (hosts);
for (var i = 0; i < hosts.length; i++) (hosts[i]).addDependency (bundle);

}}bundle.setSelectedExports (selectedExports);
bundle.setResolvedRequires (resolvedRequires);
bundle.setResolvedImports (resolvedImports);
bundle.addDependencies (hosts);
bundle.addDependencies (resolvedRequires);
bundle.addDependencies (resolvedImports);
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.resolver.BundleDescriptionImpl,~A,~A,~A,~A");
Clazz.defineMethod (c$, "unresolveConstraints", 
($fz = function (bundle) {
var host = bundle.getHost ();
if (host != null) host.setHosts (null);
bundle.setSelectedExports (null);
bundle.setResolvedImports (null);
bundle.setResolvedRequires (null);
bundle.removeDependencies ();
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.resolver.BundleDescriptionImpl");
Clazz.defineMethod (c$, "resolve", 
($fz = function (incremental, reResolve) {
try {
this.resolving = true;
if (this.resolver == null) throw  new IllegalStateException ("no resolver set");
this.fullyLoad ();
var start = 0;
if (org.eclipse.osgi.framework.adaptor.core.StateManager.DEBUG_PLATFORM_ADMIN_RESOLVER) start = System.currentTimeMillis ();
if (!incremental) {
this.resolved = false;
reResolve = this.getBundles ();
if (this.removalPendings.size () > 0) {
var removed = this.getRemovalPendings ();
reResolve = this.mergeBundles (reResolve, removed);
}this.flush (reResolve);
}if (this.resolved && reResolve == null) return  new org.eclipse.osgi.internal.resolver.StateDeltaImpl (this);
if (this.removalPendings.size () > 0) {
var removed = this.getRemovalPendings ();
reResolve = this.mergeBundles (reResolve, removed);
}this.resolver.resolve (reResolve, this.platformProperties);
this.resolved = true;
var savedChanges = this.changes == null ?  new org.eclipse.osgi.internal.resolver.StateDeltaImpl (this) : this.changes;
this.changes =  new org.eclipse.osgi.internal.resolver.StateDeltaImpl (this);
if (org.eclipse.osgi.framework.adaptor.core.StateManager.DEBUG_PLATFORM_ADMIN_RESOLVER) {
var time = System.currentTimeMillis () - start;
org.eclipse.osgi.framework.debug.Debug.println ("Time spent resolving: " + time);
($t$ = org.eclipse.osgi.internal.resolver.StateImpl.cumulativeTime = org.eclipse.osgi.internal.resolver.StateImpl.cumulativeTime + time, org.eclipse.osgi.internal.resolver.StateImpl.prototype.cumulativeTime = org.eclipse.osgi.internal.resolver.StateImpl.cumulativeTime, $t$);
org.eclipse.osgi.framework.debug.FrameworkDebugOptions.getDefault ().setOption ("org.eclipse.core.runtime.adaptor/resolver/timing/value", Long.toString (org.eclipse.osgi.internal.resolver.StateImpl.cumulativeTime));
}return savedChanges;
} finally {
this.resolving = false;
}
}, $fz.isPrivate = true, $fz), "~B,~A");
Clazz.defineMethod (c$, "mergeBundles", 
($fz = function (reResolve, removed) {
if (reResolve == null) return removed;
if (reResolve.length == 0) return reResolve;
var result =  new java.util.ArrayList (reResolve.length + removed.length);
for (var i = 0; i < reResolve.length; i++) result.add (reResolve[i]);

for (var i = 0; i < removed.length; i++) {
var found = false;
for (var j = 0; j < reResolve.length; j++) {
if (removed[i] === reResolve[j]) {
found = true;
break;
}}
if (!found) result.add (removed[i]);
}
return result.toArray ( new Array (result.size ()));
}, $fz.isPrivate = true, $fz), "~A,~A");
Clazz.defineMethod (c$, "flush", 
($fz = function (bundles) {
this.resolver.flush ();
this.resolved = false;
if (this.resolvedBundles.isEmpty ()) return ;
for (var i = 0; i < bundles.length; i++) {
this.resolveBundle (bundles[i], false, null, null, null, null);
}
this.resolvedBundles.clear ();
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "resolve", 
function () {
return this.resolve (true, null);
});
Clazz.defineMethod (c$, "resolve", 
function (incremental) {
return this.resolve (incremental, null);
}, "~B");
Clazz.defineMethod (c$, "resolve", 
function (reResolve) {
return this.resolve (true, reResolve);
}, "~A");
Clazz.overrideMethod (c$, "setOverrides", 
function (value) {
throw  new UnsupportedOperationException ();
}, "~O");
Clazz.overrideMethod (c$, "getResolvedBundles", 
function () {
return this.resolvedBundles.elements ( new Array (this.resolvedBundles.size ()));
});
Clazz.overrideMethod (c$, "isEmpty", 
function () {
return this.bundleDescriptions.isEmpty ();
});
Clazz.defineMethod (c$, "setResolved", 
function (resolved) {
this.resolved = resolved;
}, "~B");
Clazz.defineMethod (c$, "basicAddBundle", 
function (description) {
(description).setContainingState (this);
return this.bundleDescriptions.add (description);
}, "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.defineMethod (c$, "addResolvedBundle", 
function (resolvedBundle) {
this.resolvedBundles.add (resolvedBundle);
}, "org.eclipse.osgi.internal.resolver.BundleDescriptionImpl");
Clazz.overrideMethod (c$, "getExportedPackages", 
function () {
this.fullyLoad ();
var allExportedPackages =  new java.util.ArrayList ();
for (var iter = this.resolvedBundles.iterator (); iter.hasNext (); ) {
var bundle = iter.next ();
var bundlePackages = bundle.getSelectedExports ();
if (bundlePackages == null) continue ;for (var i = 0; i < bundlePackages.length; i++) allExportedPackages.add (bundlePackages[i]);

}
for (var iter = this.removalPendings.iterator (); iter.hasNext (); ) {
var bundle = iter.next ();
var bundlePackages = bundle.getSelectedExports ();
if (bundlePackages == null) continue ;for (var i = 0; i < bundlePackages.length; i++) allExportedPackages.add (bundlePackages[i]);

}
return allExportedPackages.toArray ( new Array (allExportedPackages.size ()));
});
Clazz.defineMethod (c$, "getFragments", 
function (host) {
var fragments =  new java.util.ArrayList ();
for (var iter = this.bundleDescriptions.iterator (); iter.hasNext (); ) {
var bundle = iter.next ();
var hostSpec = bundle.getHost ();
if (hostSpec != null) {
var hosts = hostSpec.getHosts ();
if (hosts != null) for (var i = 0; i < hosts.length; i++) if (hosts[i] === host) {
fragments.add (bundle);
break;
}
}}
return fragments.toArray ( new Array (fragments.size ()));
}, "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.overrideMethod (c$, "setTimeStamp", 
function (newTimeStamp) {
this.timeStamp = newTimeStamp;
}, "~N");
Clazz.overrideMethod (c$, "getFactory", 
function () {
return this.factory;
});
Clazz.defineMethod (c$, "setFactory", 
function (factory) {
this.factory = factory;
}, "org.eclipse.osgi.service.resolver.StateObjectFactory");
Clazz.overrideMethod (c$, "getBundleByLocation", 
function (location) {
for (var i = this.bundleDescriptions.iterator (); i.hasNext (); ) {
var current = i.next ();
if (location.equals (current.getLocation ())) return current;
}
return null;
}, "~S");
Clazz.overrideMethod (c$, "getResolver", 
function () {
return this.resolver;
});
Clazz.overrideMethod (c$, "setResolver", 
function (newResolver) {
if (this.resolver === newResolver) return ;
if (this.resolver != null) {
var oldResolver = this.resolver;
this.resolver = null;
oldResolver.setState (null);
}this.resolver = newResolver;
if (this.resolver == null) return ;
this.resolver.setState (this);
}, "org.eclipse.osgi.service.resolver.Resolver");
Clazz.defineMethod (c$, "setPlatformProperties", 
function (platformProperties) {
if (this.platformProperties.length != 1) this.platformProperties = [ new java.util.Hashtable (org.eclipse.osgi.internal.resolver.StateImpl.PROPS.length)];
return this.setProps (this.platformProperties[0], platformProperties);
}, "java.util.Dictionary");
Clazz.defineMethod (c$, "setPlatformProperties", 
function (platformProperties) {
if (platformProperties.length == 0) throw  new IllegalArgumentException ();
if (this.platformProperties.length != platformProperties.length) {
this.platformProperties =  new Array (platformProperties.length);
for (var i = 0; i < platformProperties.length; i++) this.platformProperties[i] =  new java.util.Hashtable (org.eclipse.osgi.internal.resolver.StateImpl.PROPS.length);

}var result = false;
for (var i = 0; i < platformProperties.length; i++) result = new Boolean (result | this.setProps (this.platformProperties[i], platformProperties[0])).valueOf ();

return result;
}, "~A");
Clazz.overrideMethod (c$, "getPlatformProperties", 
function () {
return this.platformProperties;
});
Clazz.defineMethod (c$, "checkProp", 
($fz = function (origObj, newObj) {
if ((origObj == null && newObj != null) || (origObj != null && newObj == null)) return true;
if (origObj == null) return false;
if (origObj.getClass () !== newObj.getClass ()) return true;
if (Clazz.instanceOf (origObj, String)) return !origObj.equals (newObj);
var origProps = origObj;
var newProps = newObj;
if (origProps.length != newProps.length) return true;
for (var i = 0; i < origProps.length; i++) {
if (!origProps[i].equals (newProps[i])) return true;
}
return false;
}, $fz.isPrivate = true, $fz), "~O,~O");
Clazz.defineMethod (c$, "setProps", 
($fz = function (origProps, newProps) {
var changed = false;
for (var i = 0; i < org.eclipse.osgi.internal.resolver.StateImpl.PROPS.length; i++) {
var origProp = origProps.get (org.eclipse.osgi.internal.resolver.StateImpl.PROPS[i]);
var newProp = newProps.get (org.eclipse.osgi.internal.resolver.StateImpl.PROPS[i]);
if (this.checkProp (origProp, newProp)) {
changed = true;
if (newProp == null) origProps.remove (org.eclipse.osgi.internal.resolver.StateImpl.PROPS[i]);
 else origProps.put (org.eclipse.osgi.internal.resolver.StateImpl.PROPS[i], newProp);
if (org.eclipse.osgi.internal.resolver.StateImpl.PROPS[i].equals ("org.osgi.framework.system.packages")) this.setSystemExports (newProp);
}}
return changed;
}, $fz.isPrivate = true, $fz), "java.util.Dictionary,java.util.Dictionary");
Clazz.defineMethod (c$, "getRemovalPendings", 
function () {
return this.removalPendings.toArray ( new Array (this.removalPendings.size ()));
});
Clazz.overrideMethod (c$, "linkDynamicImport", 
function (importingBundle, requestedPackage) {
if (this.resolver == null) throw  new IllegalStateException ("no resolver set");
this.fullyLoad ();
var result = this.resolver.resolveDynamicImport (importingBundle, requestedPackage);
if (result == null) return null;
(importingBundle).addDynamicResolvedImport (result);
return result;
}, "org.eclipse.osgi.service.resolver.BundleDescription,~S");
Clazz.defineMethod (c$, "setReader", 
function (reader) {
this.reader = reader;
}, "org.eclipse.osgi.internal.resolver.StateReader");
Clazz.defineMethod (c$, "getReader", 
function () {
return this.reader;
});
Clazz.defineMethod (c$, "fullyLoad", 
function () {
if (this.fullyLoaded == true) return ;
if (this.reader != null && this.reader.isLazyLoaded ()) this.reader.fullyLoad ();
this.fullyLoaded = true;
});
Clazz.defineMethod (c$, "unloadLazyData", 
function (expireTime) {
var currentTime = System.currentTimeMillis ();
var bundles = this.getBundles ();
{
for (var i = 0; i < bundles.length; i++) (bundles[i]).unload (currentTime, expireTime);

}}, "~N");
Clazz.defineMethod (c$, "setSystemExports", 
function (exportSpec) {
try {
var elements = org.eclipse.osgi.util.ManifestElement.parseHeader ("Export-Package", exportSpec);
this.systemExports = org.eclipse.osgi.internal.resolver.StateBuilder.createExportPackages (elements, null, null, null, 2, false);
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.BundleException)) {
} else {
throw e;
}
}
}, "~S");
Clazz.overrideMethod (c$, "getSystemPackages", 
function () {
if (this.systemExports == null) return  new Array (0);
return this.systemExports;
});
Clazz.defineMethod (c$, "inStrictMode", 
function () {
return "strict".equals (this.getPlatformProperties ()[0].get ("osgi.resolverMode"));
});
c$.PROPS = c$.prototype.PROPS = ["osgi.os", "osgi.ws", "osgi.nl", "osgi.arch", "org.osgi.framework.system.packages", "osgi.resolverMode"];
Clazz.defineStatics (c$,
"cumulativeTime", 0);
});
