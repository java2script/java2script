Clazz.declarePackage ("org.eclipse.osgi.internal.resolver");
Clazz.load (["java.util.HashMap", "$.WeakHashMap", "org.eclipse.osgi.framework.util.SecureAction"], "org.eclipse.osgi.internal.resolver.StateReader", ["java.io.BufferedInputStream", "$.DataInputStream", "$.File", "$.IOException", "java.lang.Boolean", "$.RuntimeException", "java.lang.ref.WeakReference", "java.util.ArrayList", "$.Hashtable", "org.eclipse.osgi.internal.resolver.BundleDescriptionImpl", "$.BundleSpecificationImpl", "$.ExportPackageDescriptionImpl", "$.HostSpecificationImpl", "$.ImportPackageSpecificationImpl", "$.StateImpl", "org.eclipse.osgi.service.resolver.VersionRange", "org.osgi.framework.Version"], function () {
c$ = Clazz.decorateAsClass (function () {
this.objectTable = null;
this.stateFile = null;
this.lazyFile = null;
this.lazyLoad = true;
this.numBundles = 0;
this.stringCache = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.internal.resolver, "StateReader");
Clazz.prepareFields (c$, function () {
this.objectTable =  new java.util.HashMap ();
this.stringCache =  new java.util.WeakHashMap ();
});
Clazz.makeConstructor (c$, 
function () {
this.lazyLoad = false;
});
Clazz.makeConstructor (c$, 
function (stateDirectory) {
if (!stateDirectory.exists ()) stateDirectory.mkdirs ();
this.stateFile =  new java.io.File (stateDirectory, ".state");
this.lazyFile =  new java.io.File (stateDirectory, ".lazy");
this.lazyLoad = false;
}, "java.io.File");
Clazz.makeConstructor (c$, 
function (stateFile, lazyFile, lazyLoad) {
this.stateFile = stateFile;
this.lazyFile = lazyFile;
this.lazyLoad = lazyLoad;
}, "java.io.File,java.io.File,~B");
Clazz.defineMethod (c$, "addToObjectTable", 
($fz = function (object, index) {
this.objectTable.put ( new Integer (index), object);
}, $fz.isPrivate = true, $fz), "~O,~N");
Clazz.defineMethod (c$, "getFromObjectTable", 
($fz = function (index) {
return this.objectTable.get ( new Integer (index));
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "readState", 
($fz = function (state, expectedTimestamp) {
var $in =  new java.io.DataInputStream ( new java.io.BufferedInputStream (org.eclipse.osgi.internal.resolver.StateReader.secureAction.getFileInputStream (this.stateFile), 65536));
var lazyIn = null;
try {
if ($in.readByte () != 21) return false;
var tag = this.readTag ($in);
if (tag != 1) return false;
var index = $in.readInt ();
var timestampRead = $in.readLong ();
if (expectedTimestamp >= 0 && timestampRead != expectedTimestamp) return false;
this.addToObjectTable (state, index);
var numSets = $in.readInt ();
var platformProps =  new Array (numSets);
for (var i = 0; i < numSets; i++) {
var props =  new java.util.Hashtable (org.eclipse.osgi.internal.resolver.StateImpl.PROPS.length);
var numProps = $in.readInt ();
for (var j = 0; j < numProps; j++) {
var value = this.readPlatformProp ($in);
if (value != null && j < org.eclipse.osgi.internal.resolver.StateImpl.PROPS.length) props.put (org.eclipse.osgi.internal.resolver.StateImpl.PROPS[j], value);
}
platformProps[i] = props;
}
state.setPlatformProperties (platformProps);
this.numBundles = $in.readInt ();
if (this.numBundles == 0) return true;
for (var i = 0; i < this.numBundles; i++) {
var bundle = this.readBundleDescription ($in);
state.basicAddBundle (bundle);
if (bundle.isResolved ()) state.addResolvedBundle (bundle);
}
state.setTimeStamp (timestampRead);
state.setResolved ($in.readBoolean ());
if (this.lazyLoad) return true;
lazyIn =  new java.io.DataInputStream ( new java.io.BufferedInputStream (org.eclipse.osgi.internal.resolver.StateReader.secureAction.getFileInputStream (this.lazyFile), 65536));
for (var i = 0; i < this.numBundles; i++) this.readBundleDescriptionLazyData (lazyIn, 0);

} finally {
$in.close ();
if (lazyIn != null) try {
lazyIn.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}
return true;
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.resolver.StateImpl,~N");
Clazz.defineMethod (c$, "readStateDeprecated", 
($fz = function (state, $in, expectedTimestamp) {
if ($in.readByte () != 21) return false;
var tag = this.readTag ($in);
if (tag != 1) return false;
var index = $in.readInt ();
var timestampRead = $in.readLong ();
if (expectedTimestamp >= 0 && timestampRead != expectedTimestamp) return false;
this.addToObjectTable (state, index);
var numSets = $in.readInt ();
var platformProps =  new Array (numSets);
for (var i = 0; i < numSets; i++) {
var props =  new java.util.Hashtable (org.eclipse.osgi.internal.resolver.StateImpl.PROPS.length);
var numProps = $in.readInt ();
for (var j = 0; j < numProps; j++) {
var value = this.readPlatformProp ($in);
if (value != null && j < org.eclipse.osgi.internal.resolver.StateImpl.PROPS.length) props.put (org.eclipse.osgi.internal.resolver.StateImpl.PROPS[j], value);
}
platformProps[i] = props;
}
state.setPlatformProperties (platformProps);
this.numBundles = $in.readInt ();
if (this.numBundles == 0) return true;
for (var i = 0; i < this.numBundles; i++) {
var bundle = this.readBundleDescription ($in);
state.basicAddBundle (bundle);
if (bundle.isResolved ()) state.addResolvedBundle (bundle);
}
state.setTimeStamp (timestampRead);
state.setResolved ($in.readBoolean ());
$in.readInt ();
if (this.lazyLoad) return true;
for (var i = 0; i < this.numBundles; i++) this.readBundleDescriptionLazyData ($in, 0);

return true;
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.resolver.StateImpl,java.io.DataInputStream,~N");
Clazz.defineMethod (c$, "readPlatformProp", 
($fz = function ($in) {
var type = $in.readByte ();
if (type == 0) return null;
var num = $in.readInt ();
if (num == 1) return this.readString ($in, false);
var result =  new Array (num);
for (var i = 0; i < result.length; i++) result[i] = this.readString ($in, false);

return result;
}, $fz.isPrivate = true, $fz), "java.io.DataInputStream");
Clazz.defineMethod (c$, "readBundleDescription", 
($fz = function ($in) {
var tag = this.readTag ($in);
if (tag == 0) return null;
if (tag == 2) return this.getFromObjectTable ($in.readInt ());
var result =  new org.eclipse.osgi.internal.resolver.BundleDescriptionImpl ();
this.addToObjectTable (result, $in.readInt ());
result.setBundleId ($in.readLong ());
this.readBaseDescription (result, $in);
result.setLazyDataOffset ($in.readInt ());
result.setLazyDataSize ($in.readInt ());
result.setStateBit (1, $in.readBoolean ());
result.setStateBit (2, $in.readBoolean ());
result.setStateBit (32, $in.readBoolean ());
result.setStateBit (64, $in.readBoolean ());
result.setStateBit (128, $in.readBoolean ());
result.setHost (this.readHostSpec ($in));
var numDeps = $in.readInt ();
if (numDeps > 0) {
var deps =  new Array (numDeps);
for (var i = 0; i < numDeps; i++) deps[i] = this.readBundleDescription ($in);

result.addDependencies (deps);
}var hostSpec = result.getHost ();
if (hostSpec != null) {
var hosts = hostSpec.getHosts ();
if (hosts != null) {
for (var i = 0; i < hosts.length; i++) (hosts[i]).addDependency (result);

result.addDependencies (hosts);
}}result.setFullyLoaded (false);
return result;
}, $fz.isPrivate = true, $fz), "java.io.DataInputStream");
Clazz.defineMethod (c$, "readBundleDescriptionLazyData", 
($fz = function ($in, skip) {
if (skip > 0) $in.skipBytes (skip);
var index = $in.readInt ();
var result = this.getFromObjectTable (index);
if (result.isFullyLoaded ()) {
$in.skipBytes (result.getLazyDataSize () - 4);
return result;
}result.setLocation (this.readString ($in, false));
result.setPlatformFilter (this.readString ($in, false));
var exportCount = $in.readInt ();
if (exportCount > 0) {
var exports =  new Array (exportCount);
for (var i = 0; i < exports.length; i++) exports[i] = this.readExportPackageDesc ($in);

result.setExportPackages (exports);
}var importCount = $in.readInt ();
if (importCount > 0) {
var imports =  new Array (importCount);
for (var i = 0; i < imports.length; i++) imports[i] = this.readImportPackageSpec ($in);

result.setImportPackages (imports);
}var requiredBundleCount = $in.readInt ();
if (requiredBundleCount > 0) {
var requiredBundles =  new Array (requiredBundleCount);
for (var i = 0; i < requiredBundles.length; i++) requiredBundles[i] = this.readBundleSpec ($in);

result.setRequiredBundles (requiredBundles);
}var selectedCount = $in.readInt ();
if (selectedCount > 0) {
var selected =  new Array (selectedCount);
for (var i = 0; i < selected.length; i++) selected[i] = this.readExportPackageDesc ($in);

result.setSelectedExports (selected);
}var resolvedCount = $in.readInt ();
if (resolvedCount > 0) {
var resolved =  new Array (resolvedCount);
for (var i = 0; i < resolved.length; i++) resolved[i] = this.readExportPackageDesc ($in);

result.setResolvedImports (resolved);
}var resolvedRequiredCount = $in.readInt ();
if (resolvedRequiredCount > 0) {
var resolved =  new Array (resolvedRequiredCount);
for (var i = 0; i < resolved.length; i++) resolved[i] = this.readBundleDescription ($in);

result.setResolvedRequires (resolved);
}result.setFullyLoaded (true);
return result;
}, $fz.isPrivate = true, $fz), "java.io.DataInputStream,~N");
Clazz.defineMethod (c$, "readBundleSpec", 
($fz = function ($in) {
var result =  new org.eclipse.osgi.internal.resolver.BundleSpecificationImpl ();
this.readVersionConstraint (result, $in);
result.setSupplier (this.readBundleDescription ($in));
result.setExported ($in.readBoolean ());
result.setOptional ($in.readBoolean ());
return result;
}, $fz.isPrivate = true, $fz), "java.io.DataInputStream");
Clazz.defineMethod (c$, "readExportPackageDesc", 
($fz = function ($in) {
var tag = this.readTag ($in);
if (tag == 0) return null;
if (tag == 2) return this.getFromObjectTable ($in.readInt ());
var exportPackageDesc =  new org.eclipse.osgi.internal.resolver.ExportPackageDescriptionImpl ();
var tableIndex = $in.readInt ();
this.addToObjectTable (exportPackageDesc, tableIndex);
exportPackageDesc.setTableIndex (tableIndex);
this.readBaseDescription (exportPackageDesc, $in);
exportPackageDesc.setRoot ($in.readBoolean ());
exportPackageDesc.setAttributes (this.readMap ($in));
exportPackageDesc.setDirectives (this.readMap ($in));
return exportPackageDesc;
}, $fz.isPrivate = true, $fz), "java.io.DataInputStream");
Clazz.defineMethod (c$, "readMap", 
($fz = function ($in) {
var count = $in.readInt ();
if (count == 0) return null;
var result =  new java.util.HashMap (count);
for (var i = 0; i < count; i++) {
var key = this.readString ($in, false);
var value = null;
var type = $in.readByte ();
if (type == 0) value = this.readString ($in, false);
 else if (type == 1) value = this.readList ($in);
 else if (type == 2) value =  new Boolean ($in.readBoolean ());
result.put (key, value);
}
return result;
}, $fz.isPrivate = true, $fz), "java.io.DataInputStream");
Clazz.defineMethod (c$, "readList", 
($fz = function ($in) {
var count = $in.readInt ();
if (count == 0) return null;
var result =  new Array (count);
for (var i = 0; i < count; i++) result[i] = this.readString ($in, false);

return result;
}, $fz.isPrivate = true, $fz), "java.io.DataInputStream");
Clazz.defineMethod (c$, "readBaseDescription", 
($fz = function (root, $in) {
root.setName (this.readString ($in, false));
root.setVersion (this.readVersion ($in));
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.resolver.BaseDescriptionImpl,java.io.DataInputStream");
Clazz.defineMethod (c$, "readImportPackageSpec", 
($fz = function ($in) {
var result =  new org.eclipse.osgi.internal.resolver.ImportPackageSpecificationImpl ();
this.readVersionConstraint (result, $in);
result.setSupplier (this.readExportPackageDesc ($in));
result.setBundleSymbolicName (this.readString ($in, false));
result.setBundleVersionRange (this.readVersionRange ($in));
result.setAttributes (this.readMap ($in));
result.setDirectives (this.readMap ($in));
return result;
}, $fz.isPrivate = true, $fz), "java.io.DataInputStream");
Clazz.defineMethod (c$, "readHostSpec", 
($fz = function ($in) {
var tag = this.readTag ($in);
if (tag == 0) return null;
var result =  new org.eclipse.osgi.internal.resolver.HostSpecificationImpl ();
this.readVersionConstraint (result, $in);
var hostCount = $in.readInt ();
if (hostCount > 0) {
var hosts =  new Array (hostCount);
for (var i = 0; i < hosts.length; i++) hosts[i] = this.readBundleDescription ($in);

result.setHosts (hosts);
}return result;
}, $fz.isPrivate = true, $fz), "java.io.DataInputStream");
Clazz.defineMethod (c$, "readVersionConstraint", 
($fz = function (version, $in) {
version.setName (this.readString ($in, false));
version.setVersionRange (this.readVersionRange ($in));
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.resolver.VersionConstraintImpl,java.io.DataInputStream");
Clazz.defineMethod (c$, "readVersion", 
($fz = function ($in) {
var tag = this.readTag ($in);
if (tag == 0) return org.osgi.framework.Version.emptyVersion;
var majorComponent = $in.readInt ();
var minorComponent = $in.readInt ();
var serviceComponent = $in.readInt ();
var qualifierComponent = this.readString ($in, false);
var result =  new org.osgi.framework.Version (majorComponent, minorComponent, serviceComponent, qualifierComponent);
return result;
}, $fz.isPrivate = true, $fz), "java.io.DataInputStream");
Clazz.defineMethod (c$, "readVersionRange", 
($fz = function ($in) {
var tag = this.readTag ($in);
if (tag == 0) return null;
return  new org.eclipse.osgi.service.resolver.VersionRange (this.readVersion ($in), $in.readBoolean (), this.readVersion ($in), $in.readBoolean ());
}, $fz.isPrivate = true, $fz), "java.io.DataInputStream");
Clazz.defineMethod (c$, "loadStateDeprecated", 
function (state, input, expectedTimestamp) {
try {
return this.readStateDeprecated (state, input, expectedTimestamp);
} finally {
input.close ();
}
}, "org.eclipse.osgi.internal.resolver.StateImpl,java.io.DataInputStream,~N");
Clazz.defineMethod (c$, "loadState", 
function (state, expectedTimestamp) {
return this.readState (state, expectedTimestamp);
}, "org.eclipse.osgi.internal.resolver.StateImpl,~N");
Clazz.defineMethod (c$, "readString", 
($fz = function ($in, intern) {
var type = $in.readByte ();
if (type == 0) return null;
var result;
if (intern) result = $in.readUTF ().intern ();
 else result = $in.readUTF ();
var ref = this.stringCache.get (result);
if (ref != null) {
var refString = ref.get ();
if (refString != null) result = refString;
} else this.stringCache.put (result,  new java.lang.ref.WeakReference (result));
return result;
}, $fz.isPrivate = true, $fz), "java.io.DataInputStream,~B");
Clazz.defineMethod (c$, "readTag", 
($fz = function ($in) {
return $in.readByte ();
}, $fz.isPrivate = true, $fz), "java.io.DataInputStream");
Clazz.defineMethod (c$, "openLazyFile", 
($fz = function () {
if (this.lazyFile == null) throw  new java.io.IOException ();
return  new java.io.DataInputStream ( new java.io.BufferedInputStream (org.eclipse.osgi.internal.resolver.StateReader.secureAction.getFileInputStream (this.lazyFile), 65536));
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "isLazyLoaded", 
function () {
return this.lazyLoad;
});
Clazz.defineMethod (c$, "fullyLoad", 
function () {
var $in = null;
try {
$in = this.openLazyFile ();
for (var i = 0; i < this.numBundles; i++) this.readBundleDescriptionLazyData ($in, 0);

} catch (ioe) {
if (Clazz.instanceOf (ioe, java.io.IOException)) {
throw  new RuntimeException ();
} else {
throw ioe;
}
} finally {
if ($in != null) try {
$in.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}
});
Clazz.defineMethod (c$, "fullyLoad", 
function (target) {
var $in = null;
try {
$in = this.openLazyFile ();
var toLoad =  new java.util.ArrayList ();
this.addDependencies (target, toLoad);
var skipBytes = this.getSkipBytes (toLoad);
for (var i = 0; i < skipBytes.length; i++) this.readBundleDescriptionLazyData ($in, skipBytes[i]);

} finally {
if ($in != null) $in.close ();
}
}, "org.eclipse.osgi.internal.resolver.BundleDescriptionImpl");
Clazz.defineMethod (c$, "addDependencies", 
($fz = function (target, toLoad) {
if (toLoad.contains (target) || target.isFullyLoaded ()) return ;
var load = toLoad.iterator ();
var i = 0;
while (load.hasNext ()) {
var bundle = load.next ();
if (target.getLazyDataOffset () < bundle.getLazyDataOffset ()) break;
i++;
}
if (i >= toLoad.size ()) toLoad.add (target);
 else toLoad.add (i, target);
var deps = target.getBundleDependencies ();
for (var iter = deps.iterator (); iter.hasNext (); ) this.addDependencies (iter.next (), toLoad);

}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.resolver.BundleDescriptionImpl,java.util.List");
Clazz.defineMethod (c$, "getSkipBytes", 
($fz = function (toLoad) {
var skipBytes =  Clazz.newArray (toLoad.size (), 0);
for (var i = 0; i < skipBytes.length; i++) {
var current = toLoad.get (i);
if (i == 0) {
skipBytes[i] = current.getLazyDataOffset ();
continue ;}var previous = toLoad.get (i - 1);
skipBytes[i] = current.getLazyDataOffset () - previous.getLazyDataOffset () - previous.getLazyDataSize ();
}
return skipBytes;
}, $fz.isPrivate = true, $fz), "java.util.ArrayList");
Clazz.defineStatics (c$,
"STATE_FILE", ".state",
"LAZY_FILE", ".lazy");
c$.secureAction = c$.prototype.secureAction =  new org.eclipse.osgi.framework.util.SecureAction ();
Clazz.defineStatics (c$,
"STATE_CACHE_VERSION", 21,
"NULL", 0,
"OBJECT", 1,
"INDEX", 2);
});
