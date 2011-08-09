Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["java.lang.SecurityManager", "org.eclipse.osgi.framework.adaptor.ClassLoaderDelegate", "java.security.AccessController", "$.PrivilegedAction", "org.eclipse.osgi.framework.internal.core.Framework"], "org.eclipse.osgi.framework.internal.core.BundleLoader", ["java.lang.ClassLoader", "$.ClassNotFoundException", "java.util.ArrayList", "$.HashSet", "$.Vector", "org.eclipse.osgi.framework.debug.Debug", "org.eclipse.osgi.framework.internal.core.KeyedHashSet", "$.Msg", "$.MultiSourcePackage", "$.NullPackageSource", "$.PolicyHandler", "$.SingleSourcePackage", "org.osgi.framework.BundleException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.proxy = null;
this.bundle = null;
this.classloader = null;
this.parent = null;
this.importedSources = null;
this.requiredSources = null;
this.dynamicImportPackageStems = null;
this.dynamicImportPackages = null;
this.exportedPackages = null;
this.requiredBundles = null;
this.reexportTable = null;
this.loaderFlags = 0;
this.policy = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "BundleLoader", null, org.eclipse.osgi.framework.adaptor.ClassLoaderDelegate);
Clazz.pu$h ();
c$ = Clazz.declareType (org.eclipse.osgi.framework.internal.core.BundleLoader, "ClassContext", SecurityManager);
c$ = Clazz.p0p ();
c$.getPackageName = Clazz.defineMethod (c$, "getPackageName", 
function (name) {
if (name != null) {
var index = name.lastIndexOf ('.');
if (index > 0) return name.substring (0, index);
}return ".";
}, "~S");
c$.getResourcePackageName = Clazz.defineMethod (c$, "getResourcePackageName", 
function (name) {
if (name != null) {
var begin = ((name.length > 1) && ((name.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0))) ? 1 : 0;
var end = name.lastIndexOf ('/');
if (end > begin) return name.substring (begin, end).$replace ('/', '.');
}return ".";
}, "~S");
Clazz.makeConstructor (c$, 
function (bundle, proxy) {
this.bundle = bundle;
this.proxy = proxy;
try {
bundle.getBundleData ().open ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_READ_EXCEPTION, e);
} else {
throw e;
}
}
this.initialize (proxy.getBundleDescription ());
}, "org.eclipse.osgi.framework.internal.core.BundleHost,org.eclipse.osgi.framework.internal.core.BundleLoaderProxy");
Clazz.defineMethod (c$, "initialize", 
function (description) {
var required = description.getResolvedRequires ();
if (required.length > 0) {
var reExportSet =  new java.util.HashSet (required.length);
var requiredSpecs = description.getRequiredBundles ();
if (requiredSpecs != null && requiredSpecs.length > 0) for (var i = 0; i < requiredSpecs.length; i++) if (requiredSpecs[i].isExported ()) reExportSet.add (requiredSpecs[i].getName ());

this.requiredBundles =  new Array (required.length);
var reexported =  Clazz.newArray (required.length, 0);
var reexportIndex = 0;
for (var i = 0; i < required.length; i++) {
this.requiredBundles[i] = this.getLoaderProxy (required[i]);
if (reExportSet.contains (required[i].getSymbolicName ())) reexported[reexportIndex++] = i;
}
if (reexportIndex > 0) {
this.reexportTable =  Clazz.newArray (reexportIndex, 0);
System.arraycopy (reexported, 0, this.reexportTable, 0, reexportIndex);
}}var exports = description.getSelectedExports ();
if (exports != null && exports.length > 0) {
this.exportedPackages =  new java.util.ArrayList (exports.length);
for (var i = 0; i < exports.length; i++) {
if (!this.exportedPackages.contains (exports[i].getName ())) {
this.exportedPackages.add (exports[i].getName ());
this.proxy.createPackageSource (exports[i], true);
}}
}var fragmentObjects = this.bundle.getFragments ();
var fragments =  new Array (fragmentObjects == null ? 0 : fragmentObjects.length);
for (var i = 0; i < fragments.length; i++) fragments[i] = (fragmentObjects[i]).getBundleDescription ();

if (description.hasDynamicImports ()) this.addDynamicImportPackage (description.getImportPackages ());
for (var i = 0; i < fragments.length; i++) if (fragments[i].isResolved () && fragments[i].hasDynamicImports ()) this.addDynamicImportPackage (fragments[i].getImportPackages ());

try {
var buddyList = null;
if ((buddyList = this.bundle.getBundleData ().getManifest ().get ("Eclipse-BuddyPolicy")) != null) this.policy =  new org.eclipse.osgi.framework.internal.core.PolicyHandler (this, buddyList);
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.BundleException)) {
} else {
throw e;
}
}
}, "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.defineMethod (c$, "addImportedPackages", 
($fz = function (packages) {
if ((this.loaderFlags & 1) != 0) return ;
if (packages != null && packages.length > 0) {
if (this.importedSources == null) this.importedSources =  new org.eclipse.osgi.framework.internal.core.KeyedHashSet (packages.length, false);
for (var i = 0; i < packages.length; i++) {
var source = this.createExportPackageSource (packages[i]);
if (source != null) this.importedSources.add (source);
}
}this.loaderFlags |= 1;
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "createExportPackageSource", 
function ($export) {
var exportProxy = this.getLoaderProxy ($export.getExporter ());
if (exportProxy == null) return null;
var requiredSource = exportProxy.getBundleLoader ().findRequiredSource ($export.getName ());
var exportSource = exportProxy.createPackageSource ($export, false);
if (requiredSource == null) return exportSource;
return org.eclipse.osgi.framework.internal.core.BundleLoader.createMultiSource ($export.getName (), [requiredSource, exportSource]);
}, "org.eclipse.osgi.service.resolver.ExportPackageDescription");
c$.createMultiSource = Clazz.defineMethod (c$, "createMultiSource", 
($fz = function (packageName, sources) {
if (sources.length == 1) return sources[0];
var sourceList =  new java.util.ArrayList (sources.length);
for (var i = 0; i < sources.length; i++) {
var innerSources = sources[i].getSuppliers ();
for (var j = 0; j < innerSources.length; j++) if (!sourceList.contains (innerSources[j])) sourceList.add (innerSources[j]);

}
return  new org.eclipse.osgi.framework.internal.core.MultiSourcePackage (packageName, sourceList.toArray ( new Array (sourceList.size ())));
}, $fz.isPrivate = true, $fz), "~S,~A");
Clazz.defineMethod (c$, "getLoaderProxy", 
function (source) {
var sourceProxy = source.getUserObject ();
if (sourceProxy == null) {
var exportingID = source.getBundleId ();
var exportingBundle = this.bundle.framework.getBundle (exportingID);
if (exportingBundle == null) return null;
sourceProxy = exportingBundle.getLoaderProxy ();
}return sourceProxy;
}, "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.defineMethod (c$, "close", 
function () {
if ((this.loaderFlags & 8) != 0) return ;
if (this.classloader != null) this.classloader.close ();
if (this.policy != null) {
this.policy.close ();
this.policy = null;
}this.loaderFlags |= 8;
});
Clazz.defineMethod (c$, "loadClass", 
function (name) {
return this.createClassLoader ().loadClass (name);
}, "~S");
Clazz.defineMethod (c$, "getResource", 
function (name) {
return this.createClassLoader ().getResource (name);
}, "~S");
Clazz.defineMethod (c$, "getResources", 
function (name) {
return this.createClassLoader ().getResources (name);
}, "~S");
Clazz.defineMethod (c$, "createClassLoader", 
function () {
if (this.classloader != null) return this.classloader;
{
if (this.classloader != null) return this.classloader;
try {
var classpath = this.bundle.getBundleData ().getClassPath ();
if (classpath != null) {
var bcl = this.createBCLPrevileged (this.bundle.getProtectionDomain (), classpath);
this.parent = this.getParentPrivileged (bcl);
this.classloader = bcl;
} else {
this.bundle.framework.publishFrameworkEvent (2, this.bundle,  new org.osgi.framework.BundleException (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_NO_CLASSPATH_MATCH));
}} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.BundleException)) {
this.bundle.framework.publishFrameworkEvent (2, this.bundle, e);
} else {
throw e;
}
}
}return this.classloader;
});
Clazz.defineMethod (c$, "findLocalClass", 
function (name) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_LOADER) org.eclipse.osgi.framework.debug.Debug.println ("BundleLoader[" + this + "].findLocalClass(" + name + ")");
try {
var clazz = this.createClassLoader ().findLocalClass (name);
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_LOADER && clazz != null) org.eclipse.osgi.framework.debug.Debug.println ("BundleLoader[" + this + "] found local class " + name);
return clazz;
} catch (e) {
if (Clazz.instanceOf (e, ClassNotFoundException)) {
return null;
} else {
throw e;
}
}
}, "~S");
Clazz.defineMethod (c$, "findClass", 
function (name) {
return this.findClass (name, true);
}, "~S");
Clazz.defineMethod (c$, "findClass", 
function (name, checkParent) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_LOADER) org.eclipse.osgi.framework.debug.Debug.println ("BundleLoader[" + this + "].loadBundleClass(" + name + ")");
var pkgName = org.eclipse.osgi.framework.internal.core.BundleLoader.getPackageName (name);
if (checkParent && this.parent != null) {
if (name.startsWith ("java.")) return this.parent.loadClass (name);
 else if (this.isBootDelegationPackage (pkgName)) try {
return this.parent.loadClass (name);
} catch (cnfe) {
if (Clazz.instanceOf (cnfe, ClassNotFoundException)) {
} else {
throw cnfe;
}
}
}var result = null;
var source = this.findImportedSource (pkgName);
if (source != null) {
result = source.loadClass (name);
if (result != null) return result;
throw  new ClassNotFoundException (name);
}source = this.findRequiredSource (pkgName);
if (source != null) result = source.loadClass (name);
if (result == null) result = this.findLocalClass (name);
if (result != null) return result;
if (source == null) {
source = this.findDynamicSource (pkgName);
if (source != null) result = source.loadClass (name);
}if (result == null && this.policy != null) result = this.policy.doBuddyClassLoading (name);
if (result == null && this.findParentResource (name)) result = this.parent.loadClass (name);
if (result == null) throw  new ClassNotFoundException (name);
return result;
}, "~S,~B");
Clazz.defineMethod (c$, "findParentResource", 
($fz = function (name) {
if (this.bundle.framework.bootDelegateAll || !this.bundle.framework.contextBootDelegation) return false;
var context = org.eclipse.osgi.framework.internal.core.BundleLoader.CLASS_CONTEXT.getClassContext ();
if (context == null || context.length < 2) return false;
for (var i = 1; i < context.length; i++) if (context[i] !== org.eclipse.osgi.framework.internal.core.BundleLoader && !ClassLoader.isAssignableFrom (context[i])) {
var cl = org.eclipse.osgi.framework.internal.core.BundleLoader.getClassLoader (context[i]);
if (cl !== org.eclipse.osgi.framework.internal.core.BundleLoader.FW_CLASSLOADER) {
if (Class !== context[i] && !(Clazz.instanceOf (cl, org.eclipse.osgi.framework.adaptor.BundleClassLoader))) return true;
break;
}}
return false;
}, $fz.isPrivate = true, $fz), "~S");
c$.getClassLoader = Clazz.defineMethod (c$, "getClassLoader", 
($fz = function (clazz) {
if (System.getSecurityManager () == null) return clazz.getClassLoader ();
return java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.BundleLoader$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "BundleLoader$1", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
return this.f$.clazz.getClassLoader ();
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.BundleLoader$1, i$, v$);
}) (this, Clazz.cloneFinals ("clazz", clazz)));
}, $fz.isPrivate = true, $fz), "Class");
Clazz.defineMethod (c$, "isClosed", 
function () {
return (this.loaderFlags & 8) != 0;
});
Clazz.defineMethod (c$, "findResource", 
function (name) {
return this.findResource (name, true);
}, "~S");
Clazz.defineMethod (c$, "findResource", 
function (name, checkParent) {
if ((name.length > 1) && ((name.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0))) name = name.substring (1);
var pkgName = org.eclipse.osgi.framework.internal.core.BundleLoader.getResourcePackageName (name);
if (checkParent && this.parent != null) {
if (pkgName.startsWith ("java.")) return this.parent.getResource (name);
 else if (this.isBootDelegationPackage (pkgName)) {
var result = this.parent.getResource (name);
if (result != null) return result;
}}var result = null;
var source = this.findImportedSource (pkgName);
if (source != null) return source.getResource (name);
source = this.findRequiredSource (pkgName);
if (source != null) result = source.getResource (name);
if (result == null) result = this.findLocalResource (name);
if (result != null) return result;
if (source == null) {
source = this.findDynamicSource (pkgName);
if (source != null) result = source.getResource (name);
}if (result == null && this.policy != null) return this.policy.doBuddyResourceLoading (name);
if (result == null && this.findParentResource (name)) result = this.parent.getResource (name);
return result;
}, "~S,~B");
Clazz.defineMethod (c$, "isBootDelegationPackage", 
($fz = function (name) {
if (this.bundle.framework.bootDelegateAll) return true;
if (this.bundle.framework.bootDelegation != null) for (var i = 0; i < this.bundle.framework.bootDelegation.length; i++) if (name.equals (this.bundle.framework.bootDelegation[i])) return true;

if (this.bundle.framework.bootDelegationStems != null) for (var i = 0; i < this.bundle.framework.bootDelegationStems.length; i++) if (name.startsWith (this.bundle.framework.bootDelegationStems[i])) return true;

return false;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.overrideMethod (c$, "findResources", 
function (name) {
if ((name.length > 1) && ((name.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0))) name = name.substring (1);
var pkgName = org.eclipse.osgi.framework.internal.core.BundleLoader.getResourcePackageName (name);
var result = null;
var source = this.findImportedSource (pkgName);
if (source != null) return source.getResources (name);
source = this.findRequiredSource (pkgName);
if (source != null) result = source.getResources (name);
if (result == null) result = this.findLocalResources (name);
 else {
var localResults = this.findLocalResources (name);
if (localResults != null) {
var compoundResults =  new java.util.Vector ();
while (result.hasMoreElements ()) compoundResults.add (result.nextElement ());

while (localResults.hasMoreElements ()) compoundResults.add (localResults.nextElement ());

result = compoundResults.elements ();
}}if (result != null) return result;
if (source == null) {
source = this.findDynamicSource (pkgName);
if (source != null) result = source.getResources (name);
}if (result == null && this.policy != null) result = this.policy.doBuddyResourcesLoading (name);
return result;
}, "~S");
Clazz.defineMethod (c$, "findLocalResource", 
function (name) {
return this.createClassLoader ().findLocalResource (name);
}, "~S");
Clazz.defineMethod (c$, "findLocalResources", 
function (name) {
return this.createClassLoader ().findLocalResources (name);
}, "~S");
Clazz.overrideMethod (c$, "findLibrary", 
function (name) {
if (System.getSecurityManager () == null) return this.findLocalLibrary (name);
return java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.BundleLoader$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "BundleLoader$2", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
return this.b$["org.eclipse.osgi.framework.internal.core.BundleLoader"].findLocalLibrary (this.f$.name);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.BundleLoader$2, i$, v$);
}) (this, Clazz.cloneFinals ("name", name)));
}, "~S");
Clazz.defineMethod (c$, "findLocalLibrary", 
function (name) {
var result = this.bundle.getBundleData ().findLibrary (name);
if (result != null) return result;
var fragments = this.bundle.getFragments ();
if (fragments == null || fragments.length == 0) return null;
for (var i = 0; i < fragments.length; i++) {
result = (fragments[i]).getBundleData ().findLibrary (name);
if (result != null) return result;
}
return result;
}, "~S");
Clazz.defineMethod (c$, "getBundle", 
function () {
return this.bundle;
});
Clazz.defineMethod (c$, "createBCLPrevileged", 
($fz = function (pd, cp) {
if (System.getSecurityManager () == null) return this.createBCL (pd, cp);
return java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.BundleLoader$3")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "BundleLoader$3", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
return this.b$["org.eclipse.osgi.framework.internal.core.BundleLoader"].createBCL (this.f$.pd, this.f$.cp);
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.BundleLoader$3, i$, v$);
}) (this, Clazz.cloneFinals ("pd", pd, "cp", cp)));
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.framework.adaptor.BundleProtectionDomain,~A");
Clazz.defineMethod (c$, "createBCL", 
function (pd, cp) {
var bcl = this.bundle.getBundleData ().createClassLoader (this, pd, cp);
var fragments = this.bundle.getFragments ();
if (fragments != null) for (var i = 0; i < fragments.length; i++) {
var fragment = fragments[i];
try {
bcl.attachFragment (fragment.getBundleData (), fragment.domain, fragment.getBundleData ().getClassPath ());
} catch (be) {
if (Clazz.instanceOf (be, org.osgi.framework.BundleException)) {
this.bundle.framework.publishFrameworkEvent (2, this.bundle, be);
} else {
throw be;
}
}
}
bcl.initialize ();
return bcl;
}, "org.eclipse.osgi.framework.adaptor.BundleProtectionDomain,~A");
Clazz.defineMethod (c$, "toString", 
function () {
var result = this.bundle.getBundleData ();
return result == null ? "BundleLoader.bundledata == null!" : result.toString ();
});
Clazz.defineMethod (c$, "isDynamicallyImported", 
function (pkgname) {
if (Clazz.instanceOf (this, org.eclipse.osgi.framework.internal.core.SystemBundleLoader)) return false;
if (pkgname.startsWith ("java.")) return true;
if ((this.loaderFlags & 2) == 0) return false;
if ((this.loaderFlags & 4) != 0) return true;
if (this.dynamicImportPackages != null) for (var i = 0; i < this.dynamicImportPackages.length; i++) if (pkgname.equals (this.dynamicImportPackages[i])) return true;

if (this.dynamicImportPackageStems != null) for (var i = 0; i < this.dynamicImportPackageStems.length; i++) if (pkgname.startsWith (this.dynamicImportPackageStems[i])) return true;

return false;
}, "~S");
Clazz.defineMethod (c$, "addExportedProvidersFor", 
function (symbolicName, packageName, result, visited) {
if (!visited.add (this.bundle)) return ;
var local = null;
if (this.isExportedPackage (packageName)) local = this.proxy.getPackageSource (packageName);
if (this.requiredBundles != null) {
var size = this.reexportTable == null ? 0 : this.reexportTable.length;
var reexportIndex = 0;
for (var i = 0; i < this.requiredBundles.length; i++) {
if (local != null) {
this.requiredBundles[i].getBundleLoader ().addExportedProvidersFor (symbolicName, packageName, result, visited);
} else if (reexportIndex < size && this.reexportTable[reexportIndex] == i) {
reexportIndex++;
this.requiredBundles[i].getBundleLoader ().addExportedProvidersFor (symbolicName, packageName, result, visited);
}}
}if (local != null && local.isFriend (symbolicName)) {
if (Clazz.instanceOf (local, org.eclipse.osgi.framework.internal.core.BundleLoaderProxy.ReexportPackageSource)) local =  new org.eclipse.osgi.framework.internal.core.SingleSourcePackage (packageName, -1, this.proxy);
result.add (local);
}}, "~S,~S,java.util.ArrayList,org.eclipse.osgi.framework.internal.core.KeyedHashSet");
Clazz.defineMethod (c$, "isExportedPackage", 
function (name) {
return this.exportedPackages == null ? false : this.exportedPackages.contains (name);
}, "~S");
Clazz.defineMethod (c$, "addDynamicImportPackage", 
($fz = function (packages) {
if (packages == null) return ;
var dynamicImports =  new java.util.ArrayList (packages.length);
for (var i = 0; i < packages.length; i++) if ("dynamic".equals (packages[i].getDirective ("resolution"))) dynamicImports.add (packages[i].getName ());

if (dynamicImports.size () > 0) this.addDynamicImportPackage (dynamicImports.toArray ( new Array (dynamicImports.size ())));
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "addDynamicImportPackage", 
($fz = function (packages) {
if (packages == null) return ;
this.loaderFlags |= 2;
if (this.importedSources == null) {
this.importedSources =  new org.eclipse.osgi.framework.internal.core.KeyedHashSet (10, false);
}if (packages == null) return ;
var size = packages.length;
var stems;
if (this.dynamicImportPackageStems == null) {
stems =  new java.util.ArrayList (size);
} else {
stems =  new java.util.ArrayList (size + this.dynamicImportPackageStems.length);
for (var i = 0; i < this.dynamicImportPackageStems.length; i++) {
stems.add (this.dynamicImportPackageStems[i]);
}
}var names;
if (this.dynamicImportPackages == null) {
names =  new java.util.ArrayList (size);
} else {
names =  new java.util.ArrayList (size + this.dynamicImportPackages.length);
for (var i = 0; i < this.dynamicImportPackages.length; i++) {
names.add (this.dynamicImportPackages[i]);
}
}for (var i = 0; i < size; i++) {
var name = packages[i];
if (this.isDynamicallyImported (name)) continue ;if (name.equals ("*")) {
this.loaderFlags |= 4;
return ;
}if (name.endsWith (".*")) stems.add (name.substring (0, name.length - 1));
 else names.add (name);
}
size = stems.size ();
if (size > 0) this.dynamicImportPackageStems = stems.toArray ( new Array (size));
size = names.size ();
if (size > 0) this.dynamicImportPackages = names.toArray ( new Array (size));
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "addDynamicImportPackage", 
function (packages) {
if (packages == null) return ;
var dynamicImports =  new java.util.ArrayList (packages.length);
for (var i = 0; i < packages.length; i++) dynamicImports.add (packages[i].getValue ());

if (dynamicImports.size () > 0) this.addDynamicImportPackage (dynamicImports.toArray ( new Array (dynamicImports.size ())));
}, "~A");
Clazz.defineMethod (c$, "attachFragment", 
function (fragment) {
if (this.classloader == null) return ;
var classpath = fragment.getBundleData ().getClassPath ();
if (classpath != null) this.classloader.attachFragment (fragment.getBundleData (), fragment.domain, classpath);
}, "org.eclipse.osgi.framework.internal.core.BundleFragment");
Clazz.defineMethod (c$, "findSource", 
($fz = function (pkgName) {
if (pkgName == null) return null;
var result = this.findImportedSource (pkgName);
if (result != null) return result;
return this.findRequiredSource (pkgName);
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "findImportedSource", 
($fz = function (pkgName) {
if ((this.loaderFlags & 1) == 0) this.addImportedPackages (this.proxy.getBundleDescription ().getResolvedImports ());
return this.importedSources == null ? null : this.importedSources.getByKey (pkgName);
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "findDynamicSource", 
($fz = function (pkgName) {
if (this.isDynamicallyImported (pkgName)) {
var exportPackage = this.bundle.framework.adaptor.getState ().linkDynamicImport (this.proxy.getBundleDescription (), pkgName);
if (exportPackage != null) {
var source = this.createExportPackageSource (exportPackage);
this.importedSources.add (source);
return source;
}}return null;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "findRequiredSource", 
($fz = function (pkgName) {
if (this.requiredBundles == null) return null;
if (this.requiredSources != null) {
var result = this.requiredSources.getByKey (pkgName);
if (result != null) return result.isNullSource () ? null : result;
}var visited =  new org.eclipse.osgi.framework.internal.core.KeyedHashSet (false);
var result =  new java.util.ArrayList (3);
for (var i = 0; i < this.requiredBundles.length; i++) {
var requiredLoader = this.requiredBundles[i].getBundleLoader ();
requiredLoader.addExportedProvidersFor (this.proxy.getSymbolicName (), pkgName, result, visited);
}
if (this.requiredSources == null) this.requiredSources =  new org.eclipse.osgi.framework.internal.core.KeyedHashSet (10, false);
if (result.size () == 0) {
this.requiredSources.add (org.eclipse.osgi.framework.internal.core.NullPackageSource.getNullPackageSource (pkgName));
return null;
} else if (result.size () == 1) {
var source = result.get (0);
this.requiredSources.add (source);
return source;
} else {
var srcs = result.toArray ( new Array (result.size ()));
var source = org.eclipse.osgi.framework.internal.core.BundleLoader.createMultiSource (pkgName, srcs);
this.requiredSources.add (source);
return source;
}}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "getPackageSource", 
function (pkgName) {
var result = this.findSource (pkgName);
if (!this.isExportedPackage (pkgName)) return result;
var localSource = this.proxy.getPackageSource (pkgName);
if (Clazz.instanceOf (localSource, org.eclipse.osgi.framework.internal.core.BundleLoaderProxy.ReexportPackageSource)) localSource =  new org.eclipse.osgi.framework.internal.core.SingleSourcePackage (pkgName, -1, this.proxy);
if (result == null) return localSource;
if (localSource == null) return result;
return org.eclipse.osgi.framework.internal.core.BundleLoader.createMultiSource (pkgName, [result, localSource]);
}, "~S");
Clazz.defineMethod (c$, "getParentPrivileged", 
($fz = function (bcl) {
if (System.getSecurityManager () == null) return bcl.getParent ();
return java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.BundleLoader$4")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "BundleLoader$4", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
return this.f$.bcl.getParent ();
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.BundleLoader$4, i$, v$);
}) (this, Clazz.cloneFinals ("bcl", bcl)));
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.framework.adaptor.BundleClassLoader");
Clazz.defineStatics (c$,
"DEFAULT_PACKAGE", ".",
"JAVA_PACKAGE", "java.",
"FLAG_IMPORTSINIT", 0x01,
"FLAG_HASDYNAMICIMPORTS", 0x02,
"FLAG_HASDYNAMICEIMPORTALL", 0x04,
"FLAG_CLOSED", 0x08);
c$.CLASS_CONTEXT = c$.prototype.CLASS_CONTEXT = java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.BundleLoader$5")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "BundleLoader$5", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
return  new org.eclipse.osgi.framework.internal.core.BundleLoader.ClassContext ();
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.BundleLoader$5, i$, v$);
}) (this, null));
c$.FW_CLASSLOADER = c$.prototype.FW_CLASSLOADER = org.eclipse.osgi.framework.internal.core.BundleLoader.getClassLoader (org.eclipse.osgi.framework.internal.core.Framework);
});
