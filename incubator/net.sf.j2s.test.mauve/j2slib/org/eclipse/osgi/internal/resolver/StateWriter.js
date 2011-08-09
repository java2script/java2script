Clazz.declarePackage ("org.eclipse.osgi.internal.resolver");
Clazz.load (["java.util.ArrayList", "$.HashMap"], "org.eclipse.osgi.internal.resolver.StateWriter", ["java.io.DataOutputStream", "$.FileOutputStream", "org.eclipse.osgi.internal.resolver.StateHelperImpl", "$.StateImpl", "org.eclipse.osgi.service.resolver.VersionRange", "org.osgi.framework.Version"], function () {
c$ = Clazz.decorateAsClass (function () {
this.objectTable = null;
this.forcedWrite = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.internal.resolver, "StateWriter");
Clazz.prepareFields (c$, function () {
this.objectTable =  new java.util.HashMap ();
this.forcedWrite =  new java.util.ArrayList ();
});
Clazz.defineMethod (c$, "addToObjectTable", 
($fz = function (object) {
var cur = this.objectTable.get (object);
if (cur != null) return cur.intValue ();
this.objectTable.put (object,  new Integer (this.objectTable.size ()));
return (this.objectTable.size () - 1);
}, $fz.isPrivate = true, $fz), "~O");
Clazz.defineMethod (c$, "getFromObjectTable", 
($fz = function (object) {
if (this.objectTable != null) {
var objectResult = this.objectTable.get (object);
if (objectResult != null) {
return (objectResult).intValue ();
}}return -1;
}, $fz.isPrivate = true, $fz), "~O");
Clazz.defineMethod (c$, "writePrefix", 
($fz = function (object, out) {
if (this.writeIndex (object, out)) return true;
var index = this.addToObjectTable (object);
out.writeByte (1);
out.writeInt (index);
return false;
}, $fz.isPrivate = true, $fz), "~O,java.io.DataOutputStream");
Clazz.defineMethod (c$, "writeStateDeprecated", 
($fz = function (state, out) {
state.setSystemExports (null);
out.write (21);
if (this.writePrefix (state, out)) return ;
out.writeLong (state.getTimeStamp ());
var propSet = state.getPlatformProperties ();
out.writeInt (propSet.length);
for (var i = 0; i < propSet.length; i++) {
var props = propSet[i];
out.writeInt (org.eclipse.osgi.internal.resolver.StateImpl.PROPS.length);
for (var j = 0; j < org.eclipse.osgi.internal.resolver.StateImpl.PROPS.length; j++) this.writePlatformProp (props.get (org.eclipse.osgi.internal.resolver.StateImpl.PROPS[j]), out);

}
var bundles = state.getBundles ();
org.eclipse.osgi.internal.resolver.StateHelperImpl.getInstance ().sortBundles (bundles);
out.writeInt (bundles.length);
if (bundles.length == 0) return ;
for (var i = 0; i < bundles.length; i++) this.writeBundleDescription (bundles[i], out, false);

out.writeBoolean (state.isResolved ());
out.writeInt (out.size ());
for (var i = 0; i < bundles.length; i++) this.writeBundleDescriptionLazyData (bundles[i], out);

}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.resolver.StateImpl,java.io.DataOutputStream");
Clazz.defineMethod (c$, "saveState", 
function (state, stateFile, lazyFile) {
var outLazy = null;
var outState = null;
var fosLazy = null;
var fosState = null;
try {
state.setSystemExports (null);
var bundles = state.getBundles ();
org.eclipse.osgi.internal.resolver.StateHelperImpl.getInstance ().sortBundles (bundles);
for (var i = 0; i < bundles.length; i++) this.addToObjectTable (bundles[i]);

fosLazy =  new java.io.FileOutputStream (lazyFile);
outLazy =  new java.io.DataOutputStream (fosLazy);
for (var i = 0; i < bundles.length; i++) this.writeBundleDescriptionLazyData (bundles[i], outLazy);

fosState =  new java.io.FileOutputStream (stateFile);
outState =  new java.io.DataOutputStream (fosState);
outState.write (21);
if (this.writePrefix (state, outState)) return ;
outState.writeLong (state.getTimeStamp ());
var propSet = state.getPlatformProperties ();
outState.writeInt (propSet.length);
for (var i = 0; i < propSet.length; i++) {
var props = propSet[i];
outState.writeInt (org.eclipse.osgi.internal.resolver.StateImpl.PROPS.length);
for (var j = 0; j < org.eclipse.osgi.internal.resolver.StateImpl.PROPS.length; j++) this.writePlatformProp (props.get (org.eclipse.osgi.internal.resolver.StateImpl.PROPS[j]), outState);

}
outState.writeInt (bundles.length);
if (bundles.length == 0) return ;
for (var i = 0; i < bundles.length; i++) this.writeBundleDescription (bundles[i], outState, true);

outState.writeBoolean (state.isResolved ());
} finally {
if (outLazy != null) try {
outLazy.flush ();
fosLazy.getFD ().sync ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
try {
outLazy.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
if (outState != null) try {
outState.flush ();
fosState.getFD ().sync ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
try {
outState.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}
}, "org.eclipse.osgi.internal.resolver.StateImpl,java.io.File,java.io.File");
Clazz.defineMethod (c$, "writePlatformProp", 
($fz = function (obj, out) {
if (obj == null) out.writeByte (0);
 else {
out.writeByte (1);
if (Clazz.instanceOf (obj, String)) {
out.writeInt (1);
this.writeStringOrNull (obj, out);
} else {
var props = obj;
out.writeInt (props.length);
for (var i = 0; i < props.length; i++) this.writeStringOrNull (props[i], out);

}}}, $fz.isPrivate = true, $fz), "~O,java.io.DataOutputStream");
Clazz.defineMethod (c$, "writeBundleDescription", 
($fz = function (bundle, out, force) {
if (force && !this.forcedWrite.contains (bundle)) {
var index = this.addToObjectTable (bundle);
out.writeByte (1);
out.writeInt (index);
this.forcedWrite.add (bundle);
} else if (this.writePrefix (bundle, out)) return ;
out.writeLong (bundle.getBundleId ());
this.writeBaseDescription (bundle, out);
out.writeInt ((bundle).getLazyDataOffset ());
out.writeInt ((bundle).getLazyDataSize ());
out.writeBoolean (bundle.isResolved ());
out.writeBoolean (bundle.isSingleton ());
out.writeBoolean (bundle.hasDynamicImports ());
out.writeBoolean (bundle.attachFragments ());
out.writeBoolean (bundle.dynamicFragments ());
this.writeHostSpec (bundle.getHost (), out, force);
var dependencies = (bundle).getBundleDependencies ();
out.writeInt (dependencies.size ());
for (var iter = dependencies.iterator (); iter.hasNext (); ) this.writeBundleDescription (iter.next (), out, force);

}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.service.resolver.BundleDescription,java.io.DataOutputStream,~B");
Clazz.defineMethod (c$, "writeBundleDescriptionLazyData", 
($fz = function (bundle, out) {
var dataStart = out.size ();
var index = this.getFromObjectTable (bundle);
(bundle).setLazyDataOffset (out.size ());
out.writeInt (index);
this.writeStringOrNull (bundle.getLocation (), out);
this.writeStringOrNull (bundle.getPlatformFilter (), out);
var exports = bundle.getExportPackages ();
out.writeInt (exports.length);
for (var i = 0; i < exports.length; i++) this.writeExportPackageDesc (exports[i], out);

var imports = bundle.getImportPackages ();
out.writeInt (imports.length);
for (var i = 0; i < imports.length; i++) this.writeImportPackageSpec (imports[i], out);

var requiredBundles = bundle.getRequiredBundles ();
out.writeInt (requiredBundles.length);
for (var i = 0; i < requiredBundles.length; i++) this.writeBundleSpec (requiredBundles[i], out);

var selectedExports = bundle.getSelectedExports ();
if (selectedExports == null) {
out.writeInt (0);
} else {
out.writeInt (selectedExports.length);
for (var i = 0; i < selectedExports.length; i++) this.writeExportPackageDesc (selectedExports[i], out);

}var resolvedImports = bundle.getResolvedImports ();
if (resolvedImports == null) {
out.writeInt (0);
} else {
out.writeInt (resolvedImports.length);
for (var i = 0; i < resolvedImports.length; i++) this.writeExportPackageDesc (resolvedImports[i], out);

}var resolvedRequires = bundle.getResolvedRequires ();
if (resolvedRequires == null) {
out.writeInt (0);
} else {
out.writeInt (resolvedRequires.length);
for (var i = 0; i < resolvedRequires.length; i++) this.writeBundleDescription (resolvedRequires[i], out, false);

}(bundle).setLazyDataSize (out.size () - dataStart);
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.service.resolver.BundleDescription,java.io.DataOutputStream");
Clazz.defineMethod (c$, "writeBundleSpec", 
($fz = function (bundle, out) {
this.writeVersionConstraint (bundle, out);
this.writeBundleDescription (bundle.getSupplier (), out, false);
out.writeBoolean (bundle.isExported ());
out.writeBoolean (bundle.isOptional ());
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.resolver.BundleSpecificationImpl,java.io.DataOutputStream");
Clazz.defineMethod (c$, "writeExportPackageDesc", 
($fz = function (exportPackageDesc, out) {
if (this.writePrefix (exportPackageDesc, out)) return ;
this.writeBaseDescription (exportPackageDesc, out);
out.writeBoolean (exportPackageDesc.isRoot ());
this.writeMap (out, exportPackageDesc.getAttributes ());
this.writeMap (out, exportPackageDesc.getDirectives ());
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.resolver.ExportPackageDescriptionImpl,java.io.DataOutputStream");
Clazz.defineMethod (c$, "writeMap", 
($fz = function (out, source) {
if (source == null) {
out.writeInt (0);
} else {
out.writeInt (source.size ());
var iter = source.keySet ().iterator ();
while (iter.hasNext ()) {
var key = iter.next ();
var value = source.get (key);
this.writeStringOrNull (key, out);
if (Clazz.instanceOf (value, String)) {
out.writeByte (0);
this.writeStringOrNull (value, out);
} else if (Clazz.instanceOf (value, Array)) {
out.writeByte (1);
this.writeList (out, value);
} else if (Clazz.instanceOf (value, Boolean)) {
out.writeByte (2);
out.writeBoolean ((value).booleanValue ());
}}
}}, $fz.isPrivate = true, $fz), "java.io.DataOutputStream,java.util.Map");
Clazz.defineMethod (c$, "writeList", 
($fz = function (out, list) {
if (list == null) {
out.writeInt (0);
} else {
out.writeInt (list.length);
for (var i = 0; i < list.length; i++) this.writeStringOrNull (list[i], out);

}}, $fz.isPrivate = true, $fz), "java.io.DataOutputStream,~A");
Clazz.defineMethod (c$, "writeBaseDescription", 
($fz = function (rootDesc, out) {
this.writeStringOrNull (rootDesc.getName (), out);
this.writeVersion (rootDesc.getVersion (), out);
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.service.resolver.BaseDescription,java.io.DataOutputStream");
Clazz.defineMethod (c$, "writeImportPackageSpec", 
($fz = function (importPackageSpec, out) {
this.writeVersionConstraint (importPackageSpec, out);
if (importPackageSpec.getBundle ().isResolved ()) this.writeExportPackageDesc (importPackageSpec.getSupplier (), out);
 else out.writeByte (0);
this.writeStringOrNull (importPackageSpec.getBundleSymbolicName (), out);
this.writeVersionRange (importPackageSpec.getBundleVersionRange (), out);
this.writeMap (out, importPackageSpec.getAttributes ());
this.writeMap (out, importPackageSpec.getDirectives ());
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.service.resolver.ImportPackageSpecification,java.io.DataOutputStream");
Clazz.defineMethod (c$, "writeHostSpec", 
($fz = function (host, out, force) {
if (host == null) {
out.writeByte (0);
return ;
}out.writeByte (1);
this.writeVersionConstraint (host, out);
var hosts = host.getHosts ();
if (hosts == null) {
out.writeInt (0);
return ;
}out.writeInt (hosts.length);
for (var i = 0; i < hosts.length; i++) this.writeBundleDescription (hosts[i], out, force);

}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.resolver.HostSpecificationImpl,java.io.DataOutputStream,~B");
Clazz.defineMethod (c$, "writeVersionConstraint", 
($fz = function (constraint, out) {
this.writeStringOrNull (constraint.getName (), out);
this.writeVersionRange (constraint.getVersionRange (), out);
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.service.resolver.VersionConstraint,java.io.DataOutputStream");
Clazz.defineMethod (c$, "writeVersion", 
($fz = function (version, out) {
if (version == null || version.equals (org.osgi.framework.Version.emptyVersion)) {
out.writeByte (0);
return ;
}out.writeByte (1);
out.writeInt (version.getMajor ());
out.writeInt (version.getMinor ());
out.writeInt (version.getMicro ());
this.writeQualifier (version.getQualifier (), out);
}, $fz.isPrivate = true, $fz), "org.osgi.framework.Version,java.io.DataOutputStream");
Clazz.defineMethod (c$, "writeVersionRange", 
($fz = function (versionRange, out) {
if (versionRange == null || versionRange.equals (org.eclipse.osgi.service.resolver.VersionRange.emptyRange)) {
out.writeByte (0);
return ;
}out.writeByte (1);
this.writeVersion (versionRange.getMinimum (), out);
out.writeBoolean (versionRange.getIncludeMinimum ());
this.writeVersion (versionRange.getMaximum (), out);
out.writeBoolean (versionRange.getIncludeMaximum ());
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.service.resolver.VersionRange,java.io.DataOutputStream");
Clazz.defineMethod (c$, "writeIndex", 
($fz = function (object, out) {
if (object == null) {
out.writeByte (0);
return true;
}var index = this.getFromObjectTable (object);
if (index == -1) return false;
out.writeByte (2);
out.writeInt (index);
return true;
}, $fz.isPrivate = true, $fz), "~O,java.io.DataOutputStream");
Clazz.defineMethod (c$, "saveStateDeprecated", 
function (state, output) {
try {
this.writeStateDeprecated (state, output);
} finally {
output.close ();
}
}, "org.eclipse.osgi.internal.resolver.StateImpl,java.io.DataOutputStream");
Clazz.defineMethod (c$, "writeStringOrNull", 
($fz = function (string, out) {
if (string == null) out.writeByte (0);
 else {
out.writeByte (1);
out.writeUTF (string);
}}, $fz.isPrivate = true, $fz), "~S,java.io.DataOutputStream");
Clazz.defineMethod (c$, "writeQualifier", 
($fz = function (string, out) {
if (string != null && string.length == 0) string = null;
this.writeStringOrNull (string, out);
}, $fz.isPrivate = true, $fz), "~S,java.io.DataOutputStream");
});
