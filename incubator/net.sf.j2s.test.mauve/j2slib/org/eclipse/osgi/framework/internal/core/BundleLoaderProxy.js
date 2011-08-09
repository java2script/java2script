Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.eclipse.osgi.framework.internal.core.PackageSource", "org.osgi.service.packageadmin.RequiredBundle"], "org.eclipse.osgi.framework.internal.core.BundleLoaderProxy", ["java.lang.StringBuffer", "java.util.ArrayList", "org.eclipse.osgi.framework.internal.core.BundleLoader", "$.FilteredSourcePackage", "$.KeyedHashSet", "$.SingleSourcePackage", "$.SystemBundleLoader"], function () {
c$ = Clazz.decorateAsClass (function () {
this.loader = null;
this.bundle = null;
this.description = null;
this.stale = false;
this.pkgSources = null;
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.BundleLoaderProxy.ReexportPackageSource")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core.BundleLoaderProxy, "ReexportPackageSource", org.eclipse.osgi.framework.internal.core.PackageSource);
Clazz.defineMethod (c$, "getSuppliers", 
function () {
var a = this.b$["org.eclipse.osgi.framework.internal.core.BundleLoaderProxy"].getBundleLoader ().getPackageSource (this.id);
if (a == null) return null;
return a.getSuppliers ();
});
Clazz.overrideMethod (c$, "loadClass", 
function (a) {
try {
return this.b$["org.eclipse.osgi.framework.internal.core.BundleLoaderProxy"].getBundleLoader ().findClass (a, false);
} catch (e) {
if (Clazz.instanceOf (e, ClassNotFoundException)) {
return null;
} else {
throw e;
}
}
}, "~S");
Clazz.overrideMethod (c$, "getResource", 
function (a) {
return this.b$["org.eclipse.osgi.framework.internal.core.BundleLoaderProxy"].getBundleLoader ().findResource (a, false);
}, "~S");
Clazz.overrideMethod (c$, "getResources", 
function (a) {
return this.b$["org.eclipse.osgi.framework.internal.core.BundleLoaderProxy"].getBundleLoader ().findResources (a);
}, "~S");
c$ = Clazz.p0p ();
}
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "BundleLoaderProxy", null, org.osgi.service.packageadmin.RequiredBundle);
Clazz.makeConstructor (c$, 
function (bundle, description) {
this.bundle = bundle;
this.description = description;
this.pkgSources =  new org.eclipse.osgi.framework.internal.core.KeyedHashSet (false);
}, "org.eclipse.osgi.framework.internal.core.BundleHost,org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.defineMethod (c$, "getBundleLoader", 
function () {
if (this.loader == null && this.bundle.isResolved ()) {
{
if (this.loader == null) try {
if (this.bundle.getBundleId () == 0) this.loader =  new org.eclipse.osgi.framework.internal.core.SystemBundleLoader (this.bundle, this);
 else this.loader =  new org.eclipse.osgi.framework.internal.core.BundleLoader (this.bundle, this);
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.BundleException)) {
this.bundle.framework.publishFrameworkEvent (2, this.bundle, e);
return null;
} else {
throw e;
}
}
}}return this.loader;
});
Clazz.defineMethod (c$, "getBasicBundleLoader", 
function () {
return this.loader;
});
Clazz.defineMethod (c$, "getBundleHost", 
function () {
return this.bundle;
});
Clazz.defineMethod (c$, "setStale", 
function () {
this.stale = true;
});
Clazz.defineMethod (c$, "isStale", 
function () {
return this.stale;
});
Clazz.overrideMethod (c$, "toString", 
function () {
var symbolicName = this.bundle.getSymbolicName ();
var sb =  new StringBuffer (symbolicName == null ? this.bundle.getBundleData ().getLocation () : symbolicName);
sb.append ("; ").append ("bundle-version");
sb.append ("=\"").append (this.description.getVersion ().toString ()).append ("\"");
return sb.toString ();
});
Clazz.overrideMethod (c$, "getBundle", 
function () {
if (this.isStale ()) return null;
return this.bundle;
});
Clazz.overrideMethod (c$, "getRequiringBundles", 
function () {
if (this.isStale ()) return null;
var dependents = this.description.getDependents ();
if (dependents == null || dependents.length == 0) return null;
var result =  new java.util.ArrayList (dependents.length);
for (var i = 0; i < dependents.length; i++) this.addRequirers (dependents[i], result);

return result.size () == 0 ? null : result.toArray ( new Array (result.size ()));
});
Clazz.defineMethod (c$, "addRequirers", 
function (dependent, result) {
if (dependent.getHost () != null) return ;
var dependentProxy = this.getBundleLoader ().getLoaderProxy (dependent);
if (dependentProxy == null) return ;
if (result.contains (dependentProxy.bundle)) return ;
var dependentLoader = dependentProxy.getBundleLoader ();
var requiredBundles = dependentLoader.requiredBundles;
var reexportTable = dependentLoader.reexportTable;
if (requiredBundles == null) return ;
var size = reexportTable == null ? 0 : reexportTable.length;
var reexportIndex = 0;
for (var i = 0; i < requiredBundles.length; i++) {
if (requiredBundles[i] === this) {
result.add (dependentProxy.bundle);
if (reexportIndex < size && reexportTable[reexportIndex] == i) {
reexportIndex++;
var dependents = dependent.getDependents ();
if (dependents == null) return ;
for (var j = 0; j < dependents.length; j++) dependentProxy.addRequirers (dependents[j], result);

}return ;
}}
return ;
}, "org.eclipse.osgi.service.resolver.BundleDescription,java.util.ArrayList");
Clazz.overrideMethod (c$, "getSymbolicName", 
function () {
return this.description.getSymbolicName ();
});
Clazz.overrideMethod (c$, "getVersion", 
function () {
return this.description.getVersion ();
});
Clazz.overrideMethod (c$, "isRemovalPending", 
function () {
return this.description.isRemovalPending ();
});
Clazz.defineMethod (c$, "getBundleDescription", 
function () {
return this.description;
});
Clazz.defineMethod (c$, "getPackageSource", 
function (pkgName) {
var pkgSource = this.pkgSources.getByKey (pkgName);
if (pkgSource == null) {
pkgSource =  new org.eclipse.osgi.framework.internal.core.SingleSourcePackage (pkgName, -1, this);
{
this.pkgSources.add (pkgSource);
}}return pkgSource;
}, "~S");
Clazz.defineMethod (c$, "inUse", 
function () {
return this.description.getDependents ().length > 0;
});
Clazz.defineMethod (c$, "createPackageSource", 
function ($export, storeSource) {
var pkgSource = null;
if (!$export.isRoot ()) {
pkgSource = Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.BundleLoaderProxy.ReexportPackageSource, this, null, $export.getName ());
} else {
var includes = $export.getDirective ("include");
var excludes = $export.getDirective ("exclude");
var friends = $export.getDirective ("x-friends");
if (friends != null) {
var strict = "strict".equals (this.bundle.framework.adaptor.getState ().getPlatformProperties ()[0].get ("osgi.resolverMode"));
if (!strict) friends = null;
}if (includes != null || excludes != null || friends != null) {
var exports = this.description.getExportPackages ();
var index = -1;
var first = -1;
for (var i = 0; i < exports.length; i++) {
if (first == -1 && exports[i].getName ().equals ($export.getName ())) first = i;
if (exports[i] === $export && first != i) {
index = i;
break;
}}
pkgSource =  new org.eclipse.osgi.framework.internal.core.FilteredSourcePackage ($export.getName (), index, this, includes, excludes, friends);
}}if (storeSource) {
if (pkgSource != null && this.pkgSources.getByKey ($export.getName ()) == null) {
this.pkgSources.add (pkgSource);
}} else {
if (pkgSource == null) pkgSource = this.getPackageSource ($export.getName ());
}return pkgSource;
}, "org.eclipse.osgi.service.resolver.ExportPackageDescription,~B");
});
