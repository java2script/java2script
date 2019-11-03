Clazz.declarePackage ("org.eclipse.osgi.internal.resolver");
Clazz.load (["org.eclipse.osgi.framework.internal.core.KeyedElement", "org.eclipse.osgi.internal.resolver.BaseDescriptionImpl", "org.eclipse.osgi.service.resolver.BundleDescription"], "org.eclipse.osgi.internal.resolver.BundleDescriptionImpl", ["java.lang.Long", "$.RuntimeException", "java.util.ArrayList", "org.eclipse.osgi.framework.internal.core.Constants"], function () {
c$ = Clazz.decorateAsClass (function () {
this.stateBits = 200;
this.bundleId = -1;
this.host = null;
this.containingState = null;
this.userObject = null;
this.lazyDataOffset = -1;
this.lazyDataSize = -1;
this.dependencies = null;
this.dependents = null;
this.lazyData = null;
this.lazyTimeStamp = 0;
if (!Clazz.isClassDefined ("org.eclipse.osgi.internal.resolver.BundleDescriptionImpl.LazyData")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.location = null;
this.platformFilter = null;
this.requiredBundles = null;
this.exportPackages = null;
this.importPackages = null;
this.selectedExports = null;
this.resolvedRequires = null;
this.resolvedImports = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.internal.resolver.BundleDescriptionImpl, "LazyData");
c$ = Clazz.p0p ();
}
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.internal.resolver, "BundleDescriptionImpl", org.eclipse.osgi.internal.resolver.BaseDescriptionImpl, [org.eclipse.osgi.service.resolver.BundleDescription, org.eclipse.osgi.framework.internal.core.KeyedElement]);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.osgi.internal.resolver.BundleDescriptionImpl, []);
});
Clazz.overrideMethod (c$, "getBundleId", 
function () {
return this.bundleId;
});
Clazz.overrideMethod (c$, "getSymbolicName", 
function () {
return this.getName ();
});
Clazz.overrideMethod (c$, "getLocation", 
function () {
this.fullyLoad ();
return this.lazyData.location;
});
Clazz.overrideMethod (c$, "getPlatformFilter", 
function () {
this.fullyLoad ();
return this.lazyData.platformFilter;
});
Clazz.overrideMethod (c$, "getImportPackages", 
function () {
this.fullyLoad ();
if (this.lazyData.importPackages == null) return  new Array (0);
return this.lazyData.importPackages;
});
Clazz.overrideMethod (c$, "getRequiredBundles", 
function () {
this.fullyLoad ();
if (this.lazyData.requiredBundles == null) return  new Array (0);
return this.lazyData.requiredBundles;
});
Clazz.overrideMethod (c$, "getExportPackages", 
function () {
this.fullyLoad ();
var result = this.lazyData.exportPackages;
if (org.eclipse.osgi.framework.internal.core.Constants.getInternalSymbolicName ().equals (this.getSymbolicName ())) result = this.mergeSystemExports (result);
if (result == null) return  new Array (0);
return result;
});
Clazz.defineMethod (c$, "mergeSystemExports", 
($fz = function (existingExports) {
if (this.containingState == null) return existingExports;
var systemExports = this.containingState.getSystemPackages ();
if (systemExports == null || systemExports.length == 0) return existingExports;
for (var i = 0; i < systemExports.length; i++) (systemExports[i]).setExporter (this);

var allExports =  new Array (existingExports.length + systemExports.length);
System.arraycopy (existingExports, 0, allExports, 0, existingExports.length);
System.arraycopy (systemExports, 0, allExports, existingExports.length, systemExports.length);
return allExports;
}, $fz.isPrivate = true, $fz), "~A");
Clazz.overrideMethod (c$, "isResolved", 
function () {
return (this.stateBits & 1) != 0;
});
Clazz.overrideMethod (c$, "getContainingState", 
function () {
return this.containingState;
});
Clazz.overrideMethod (c$, "getFragments", 
function () {
if (this.host != null) return  new Array (0);
return this.containingState.getFragments (this);
});
Clazz.defineMethod (c$, "getHost", 
function () {
return this.host;
});
Clazz.overrideMethod (c$, "isSingleton", 
function () {
return (this.stateBits & 2) != 0;
});
Clazz.overrideMethod (c$, "isRemovalPending", 
function () {
return (this.stateBits & 4) != 0;
});
Clazz.overrideMethod (c$, "hasDynamicImports", 
function () {
return (this.stateBits & 32) != 0;
});
Clazz.overrideMethod (c$, "attachFragments", 
function () {
return (this.stateBits & 64) != 0;
});
Clazz.overrideMethod (c$, "dynamicFragments", 
function () {
return (this.stateBits & 128) != 0;
});
Clazz.overrideMethod (c$, "getSelectedExports", 
function () {
this.fullyLoad ();
if (this.lazyData.selectedExports == null) return  new Array (0);
return this.lazyData.selectedExports;
});
Clazz.overrideMethod (c$, "getResolvedRequires", 
function () {
this.fullyLoad ();
if (this.lazyData.resolvedRequires == null) return  new Array (0);
return this.lazyData.resolvedRequires;
});
Clazz.overrideMethod (c$, "getResolvedImports", 
function () {
this.fullyLoad ();
if (this.lazyData.resolvedImports == null) return  new Array (0);
return this.lazyData.resolvedImports;
});
Clazz.defineMethod (c$, "setBundleId", 
function (bundleId) {
this.bundleId = bundleId;
}, "~N");
Clazz.defineMethod (c$, "setSymbolicName", 
function (symbolicName) {
this.setName (symbolicName);
}, "~S");
Clazz.defineMethod (c$, "setLocation", 
function (location) {
this.checkLazyData ();
this.lazyData.location = location;
}, "~S");
Clazz.defineMethod (c$, "setPlatformFilter", 
function (platformFilter) {
this.checkLazyData ();
this.lazyData.platformFilter = platformFilter;
}, "~S");
Clazz.defineMethod (c$, "setExportPackages", 
function (exportPackages) {
this.checkLazyData ();
this.lazyData.exportPackages = exportPackages;
if (exportPackages != null) {
for (var i = 0; i < exportPackages.length; i++) {
(exportPackages[i]).setExporter (this);
}
}}, "~A");
Clazz.defineMethod (c$, "setImportPackages", 
function (importPackages) {
this.checkLazyData ();
this.lazyData.importPackages = importPackages;
if (importPackages != null) {
for (var i = 0; i < importPackages.length; i++) {
if ("system.bundle".equals (importPackages[i].getBundleSymbolicName ())) (importPackages[i]).setBundleSymbolicName (org.eclipse.osgi.framework.internal.core.Constants.getInternalSymbolicName ());
(importPackages[i]).setBundle (this);
if ("dynamic".equals (importPackages[i].getDirective ("resolution"))) this.stateBits |= 32;
}
}}, "~A");
Clazz.defineMethod (c$, "setRequiredBundles", 
function (requiredBundles) {
this.checkLazyData ();
this.lazyData.requiredBundles = requiredBundles;
if (requiredBundles != null) for (var i = 0; i < requiredBundles.length; i++) {
if ("system.bundle".equals (requiredBundles[i].getName ())) (requiredBundles[i]).setName (org.eclipse.osgi.framework.internal.core.Constants.getInternalSymbolicName ());
(requiredBundles[i]).setBundle (this);
}
}, "~A");
Clazz.defineMethod (c$, "getStateBits", 
function () {
return this.stateBits;
});
Clazz.defineMethod (c$, "setStateBit", 
function (stateBit, on) {
if (on) this.stateBits |= stateBit;
 else this.stateBits &= ~stateBit;
}, "~N,~B");
Clazz.defineMethod (c$, "setContainingState", 
function (value) {
this.containingState = value;
if (this.containingState != null && this.containingState.getReader () != null) {
if (this.containingState.getReader ().isLazyLoaded ()) this.stateBits |= 16;
 else this.stateBits &= -17;
} else {
this.stateBits &= -17;
}}, "org.eclipse.osgi.service.resolver.State");
Clazz.defineMethod (c$, "setHost", 
function (host) {
this.host = host;
if (host != null) {
if ("system.bundle".equals (host.getName ())) (host).setName (org.eclipse.osgi.framework.internal.core.Constants.getInternalSymbolicName ());
(host).setBundle (this);
}}, "org.eclipse.osgi.service.resolver.HostSpecification");
Clazz.defineMethod (c$, "setLazyLoaded", 
function (lazyLoad) {
this.fullyLoad ();
if (lazyLoad) this.stateBits |= 16;
 else this.stateBits &= -17;
}, "~B");
Clazz.defineMethod (c$, "setSelectedExports", 
function (selectedExports) {
this.checkLazyData ();
this.lazyData.selectedExports = selectedExports;
if (selectedExports != null) {
for (var i = 0; i < selectedExports.length; i++) {
(selectedExports[i]).setExporter (this);
}
}}, "~A");
Clazz.defineMethod (c$, "setResolvedImports", 
function (resolvedImports) {
this.checkLazyData ();
this.lazyData.resolvedImports = resolvedImports;
}, "~A");
Clazz.defineMethod (c$, "setResolvedRequires", 
function (resolvedRequires) {
this.checkLazyData ();
this.lazyData.resolvedRequires = resolvedRequires;
}, "~A");
Clazz.overrideMethod (c$, "toString", 
function () {
if (this.getSymbolicName () == null) return "[" + this.getBundleId () + "]";
return this.getSymbolicName () + "_" + this.getVersion ();
});
Clazz.overrideMethod (c$, "getKey", 
function () {
return  new Long (this.bundleId);
});
Clazz.overrideMethod (c$, "compare", 
function (other) {
if (!(Clazz.instanceOf (other, org.eclipse.osgi.internal.resolver.BundleDescriptionImpl))) return false;
var otherBundleDescription = other;
return this.bundleId == otherBundleDescription.bundleId;
}, "org.eclipse.osgi.framework.internal.core.KeyedElement");
Clazz.overrideMethod (c$, "getKeyHashCode", 
function () {
return (this.bundleId % 2147483647);
});
Clazz.defineMethod (c$, "removeDependencies", 
function () {
if (this.dependencies == null) return ;
var iter = this.dependencies.iterator ();
while (iter.hasNext ()) {
(iter.next ()).removeDependent (this);
}
this.dependencies = null;
});
Clazz.defineMethod (c$, "addDependencies", 
function (newDependencies) {
if (newDependencies == null) return ;
for (var i = 0; i < newDependencies.length; i++) {
this.addDependency (newDependencies[i]);
}
}, "~A");
Clazz.defineMethod (c$, "addDependency", 
function (dependency) {
if (this.dependencies == null) this.dependencies =  new java.util.ArrayList (10);
var bundle;
if (Clazz.instanceOf (dependency, org.eclipse.osgi.service.resolver.ExportPackageDescription)) bundle = (dependency).getExporter ();
 else bundle = dependency;
if (!this.dependencies.contains (bundle)) {
bundle.addDependent (this);
this.dependencies.add (bundle);
}}, "org.eclipse.osgi.internal.resolver.BaseDescriptionImpl");
Clazz.defineMethod (c$, "getBundleDependencies", 
function () {
if (this.dependencies == null) return  new java.util.ArrayList (0);
var required =  new java.util.ArrayList (this.dependencies.size ());
for (var iter = this.dependencies.iterator (); iter.hasNext (); ) {
var dep = iter.next ();
if (dep !== this && Clazz.instanceOf (dep, org.eclipse.osgi.service.resolver.BundleDescription) && (dep).getHost () == null) required.add (dep);
}
return required;
});
Clazz.overrideMethod (c$, "getUserObject", 
function () {
return this.userObject;
});
Clazz.overrideMethod (c$, "setUserObject", 
function (userObject) {
this.userObject = userObject;
}, "~O");
Clazz.defineMethod (c$, "addDependent", 
function (dependent) {
if (this.dependents == null) this.dependents =  new java.util.ArrayList (10);
if (!this.dependents.contains (dependent)) this.dependents.add (dependent);
}, "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.defineMethod (c$, "removeDependent", 
function (dependent) {
if (this.dependents == null) return ;
this.dependents.remove (dependent);
}, "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.overrideMethod (c$, "getDependents", 
function () {
if (this.dependents == null) return  new Array (0);
return this.dependents.toArray ( new Array (this.dependents.size ()));
});
Clazz.defineMethod (c$, "setFullyLoaded", 
function (fullyLoaded) {
if (fullyLoaded) {
this.stateBits |= 8;
this.lazyTimeStamp = System.currentTimeMillis ();
} else {
this.stateBits &= -9;
}}, "~B");
Clazz.defineMethod (c$, "isFullyLoaded", 
function () {
return (this.stateBits & 8) != 0;
});
Clazz.defineMethod (c$, "setLazyDataOffset", 
function (lazyDataOffset) {
this.lazyDataOffset = lazyDataOffset;
}, "~N");
Clazz.defineMethod (c$, "getLazyDataOffset", 
function () {
return this.lazyDataOffset;
});
Clazz.defineMethod (c$, "setLazyDataSize", 
function (lazyDataSize) {
this.lazyDataSize = lazyDataSize;
}, "~N");
Clazz.defineMethod (c$, "getLazyDataSize", 
function () {
return this.lazyDataSize;
});
Clazz.defineMethod (c$, "fullyLoad", 
($fz = function () {
if ((this.stateBits & 16) == 0) return ;
if (this.isFullyLoaded ()) return ;
try {
this.containingState.getReader ().fullyLoad (this);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
throw  new RuntimeException (e.getMessage ());
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "addDynamicResolvedImport", 
function (result) {
this.addDependency (result);
this.checkLazyData ();
if (this.lazyData.resolvedImports == null) {
this.lazyData.resolvedImports = [result];
return ;
}var newImports =  new Array (this.lazyData.resolvedImports.length + 1);
System.arraycopy (this.lazyData.resolvedImports, 0, newImports, 0, this.lazyData.resolvedImports.length);
newImports[newImports.length - 1] = result;
this.lazyData.resolvedImports = newImports;
}, "org.eclipse.osgi.internal.resolver.ExportPackageDescriptionImpl");
Clazz.defineMethod (c$, "unload", 
function (currentTime, expireTime) {
if ((this.stateBits & 16) == 0) return ;
if (!this.isFullyLoaded () || (currentTime - this.lazyTimeStamp - expireTime) <= 0) return ;
this.setFullyLoaded (false);
var tempData = this.lazyData;
this.lazyData = null;
if (tempData == null || tempData.selectedExports == null) return ;
for (var i = 0; i < tempData.selectedExports.length; i++) this.containingState.getReader ().objectTable.remove ( new Integer ((tempData.selectedExports[i]).getTableIndex ()));

}, "~N,~N");
Clazz.defineMethod (c$, "checkLazyData", 
($fz = function () {
if (this.lazyData == null) this.lazyData = Clazz.innerTypeInstance (org.eclipse.osgi.internal.resolver.BundleDescriptionImpl.LazyData, this, null);
}, $fz.isPrivate = true, $fz));
Clazz.defineStatics (c$,
"RESOLVED", 0x01,
"SINGLETON", 0x02,
"REMOVAL_PENDING", 0x04,
"FULLY_LOADED", 0x08,
"LAZY_LOADED", 0x10,
"HAS_DYNAMICIMPORT", 0x20,
"ATTACH_FRAGMENTS", 0x40,
"DYNAMIC_FRAGMENTS", 0x80);
});
