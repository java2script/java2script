Clazz.declarePackage ("org.eclipse.osgi.internal.resolver");
Clazz.load (["org.eclipse.osgi.service.resolver.StateObjectFactory"], "org.eclipse.osgi.internal.resolver.StateObjectFactoryImpl", ["java.io.DataInputStream", "$.DataOutputStream", "$.File", "$.IOException", "java.lang.IllegalArgumentException", "org.eclipse.osgi.internal.resolver.BundleDescriptionImpl", "$.BundleSpecificationImpl", "$.ExportPackageDescriptionImpl", "$.HostSpecificationImpl", "$.ImportPackageSpecificationImpl", "$.StateBuilder", "$.StateReader", "$.StateWriter", "$.SystemState", "$.UserState"], function () {
c$ = Clazz.declareType (org.eclipse.osgi.internal.resolver, "StateObjectFactoryImpl", null, org.eclipse.osgi.service.resolver.StateObjectFactory);
Clazz.defineMethod (c$, "createBundleDescription", 
function (manifest, location, id) {
return this.createBundleDescription (null, manifest, location, id);
}, "java.util.Dictionary,~S,~N");
Clazz.defineMethod (c$, "createBundleDescription", 
function (state, manifest, location, id) {
var result = org.eclipse.osgi.internal.resolver.StateBuilder.createBundleDescription (state, manifest, location);
result.setBundleId (id);
return result;
}, "org.eclipse.osgi.service.resolver.State,java.util.Dictionary,~S,~N");
Clazz.defineMethod (c$, "createBundleDescription", 
function (id, symbolicName, version, location, required, host, imports, exports, providedPackages, singleton) {
var bundle =  new org.eclipse.osgi.internal.resolver.BundleDescriptionImpl ();
bundle.setBundleId (id);
bundle.setSymbolicName (symbolicName);
bundle.setVersion (version);
bundle.setLocation (location);
bundle.setRequiredBundles (required);
bundle.setHost (host);
bundle.setImportPackages (imports);
bundle.setExportPackages (exports);
bundle.setStateBit (2, singleton);
return bundle;
}, "~N,~S,org.osgi.framework.Version,~S,~A,org.eclipse.osgi.service.resolver.HostSpecification,~A,~A,~A,~B");
Clazz.defineMethod (c$, "createBundleDescription", 
function (original) {
var bundle =  new org.eclipse.osgi.internal.resolver.BundleDescriptionImpl ();
bundle.setBundleId (original.getBundleId ());
bundle.setSymbolicName (original.getSymbolicName ());
bundle.setVersion (original.getVersion ());
bundle.setLocation (original.getLocation ());
var originalRequired = original.getRequiredBundles ();
var newRequired =  new Array (originalRequired.length);
for (var i = 0; i < newRequired.length; i++) newRequired[i] = this.createBundleSpecification (originalRequired[i]);

bundle.setRequiredBundles (newRequired);
var originalExports = original.getExportPackages ();
var newExports =  new Array (originalExports.length);
for (var i = 0; i < newExports.length; i++) newExports[i] = this.createExportPackageDescription (originalExports[i]);

bundle.setExportPackages (newExports);
var originalImports = original.getImportPackages ();
var newImports =  new Array (originalImports.length);
for (var i = 0; i < newImports.length; i++) newImports[i] = this.createImportPackageSpecification (originalImports[i]);

bundle.setImportPackages (newImports);
if (original.getHost () != null) bundle.setHost (this.createHostSpecification (original.getHost ()));
bundle.setStateBit (2, original.isSingleton ());
bundle.setStateBit (64, original.attachFragments ());
bundle.setStateBit (128, original.dynamicFragments ());
bundle.setStateBit (32, original.hasDynamicImports ());
return bundle;
}, "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.defineMethod (c$, "createBundleSpecification", 
function (requiredSymbolicName, requiredVersionRange, $export, optional) {
var bundleSpec =  new org.eclipse.osgi.internal.resolver.BundleSpecificationImpl ();
bundleSpec.setName (requiredSymbolicName);
bundleSpec.setVersionRange (requiredVersionRange);
bundleSpec.setExported ($export);
bundleSpec.setOptional (optional);
return bundleSpec;
}, "~S,org.eclipse.osgi.service.resolver.VersionRange,~B,~B");
Clazz.defineMethod (c$, "createBundleSpecification", 
function (original) {
var bundleSpec =  new org.eclipse.osgi.internal.resolver.BundleSpecificationImpl ();
bundleSpec.setName (original.getName ());
bundleSpec.setVersionRange (original.getVersionRange ());
bundleSpec.setExported (original.isExported ());
bundleSpec.setOptional (original.isOptional ());
return bundleSpec;
}, "org.eclipse.osgi.service.resolver.BundleSpecification");
Clazz.defineMethod (c$, "createHostSpecification", 
function (hostSymbolicName, versionRange) {
var hostSpec =  new org.eclipse.osgi.internal.resolver.HostSpecificationImpl ();
hostSpec.setName (hostSymbolicName);
hostSpec.setVersionRange (versionRange);
return hostSpec;
}, "~S,org.eclipse.osgi.service.resolver.VersionRange");
Clazz.defineMethod (c$, "createHostSpecification", 
function (original) {
var hostSpec =  new org.eclipse.osgi.internal.resolver.HostSpecificationImpl ();
hostSpec.setName (original.getName ());
hostSpec.setVersionRange (original.getVersionRange ());
return hostSpec;
}, "org.eclipse.osgi.service.resolver.HostSpecification");
Clazz.defineMethod (c$, "createImportPackageSpecification", 
function (packageName, versionRange, bundleSymbolicName, bundleVersionRange, directives, attributes, importer) {
var packageSpec =  new org.eclipse.osgi.internal.resolver.ImportPackageSpecificationImpl ();
packageSpec.setName (packageName);
packageSpec.setVersionRange (versionRange);
packageSpec.setBundleSymbolicName (bundleSymbolicName);
packageSpec.setBundleVersionRange (bundleVersionRange);
packageSpec.setDirectives (directives);
packageSpec.setAttributes (attributes);
packageSpec.setBundle (importer);
return packageSpec;
}, "~S,org.eclipse.osgi.service.resolver.VersionRange,~S,org.eclipse.osgi.service.resolver.VersionRange,java.util.Map,java.util.Map,org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.defineMethod (c$, "createImportPackageSpecification", 
function (original) {
var packageSpec =  new org.eclipse.osgi.internal.resolver.ImportPackageSpecificationImpl ();
packageSpec.setName (original.getName ());
packageSpec.setVersionRange (original.getVersionRange ());
packageSpec.setBundleSymbolicName (original.getBundleSymbolicName ());
packageSpec.setBundleVersionRange (original.getBundleVersionRange ());
packageSpec.setDirectives (original.getDirectives ());
packageSpec.setAttributes (original.getAttributes ());
return packageSpec;
}, "org.eclipse.osgi.service.resolver.ImportPackageSpecification");
Clazz.defineMethod (c$, "createExportPackageDescription", 
function (original) {
return this.createExportPackageDescription (original.getName (), original.getVersion (), original.getDirectives (), original.getAttributes (), original.isRoot (), null);
}, "org.eclipse.osgi.service.resolver.ExportPackageDescription");
Clazz.defineMethod (c$, "createExportPackageDescription", 
function (packageName, version, directives, attributes, root, exporter) {
var exportPackage =  new org.eclipse.osgi.internal.resolver.ExportPackageDescriptionImpl ();
exportPackage.setName (packageName);
exportPackage.setVersion (version);
exportPackage.setDirectives (directives);
exportPackage.setAttributes (attributes);
exportPackage.setRoot (root);
exportPackage.setExporter (exporter);
return exportPackage;
}, "~S,org.osgi.framework.Version,java.util.Map,java.util.Map,~B,org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.defineMethod (c$, "createSystemState", 
function () {
var state =  new org.eclipse.osgi.internal.resolver.SystemState ();
state.setFactory (this);
return state;
});
Clazz.defineMethod (c$, "createState", 
function () {
return this.internalCreateState ();
});
Clazz.defineMethod (c$, "createState", 
function (original) {
var newState = this.internalCreateState ();
newState.setTimeStamp (original.getTimeStamp ());
var bundles = original.getBundles ();
for (var i = 0; i < bundles.length; i++) newState.basicAddBundle (this.createBundleDescription (bundles[i]));

newState.setResolved (false);
return newState;
}, "org.eclipse.osgi.service.resolver.State");
Clazz.defineMethod (c$, "internalCreateState", 
($fz = function () {
var state =  new org.eclipse.osgi.internal.resolver.UserState ();
state.setFactory (this);
return state;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "readSystemState", 
function (stateFile, lazyFile, lazyLoad, expectedTimeStamp) {
var reader =  new org.eclipse.osgi.internal.resolver.StateReader (stateFile, lazyFile, lazyLoad);
var restoredState =  new org.eclipse.osgi.internal.resolver.SystemState ();
restoredState.setReader (reader);
restoredState.setFactory (this);
if (!reader.loadState (restoredState, expectedTimeStamp)) return null;
return restoredState;
}, "java.io.File,java.io.File,~B,~N");
Clazz.defineMethod (c$, "readState", 
function (stream) {
return this.internalReadStateDeprecated (this.internalCreateState (),  new java.io.DataInputStream (stream), -1);
}, "java.io.InputStream");
Clazz.defineMethod (c$, "readState", 
function (stream) {
return this.internalReadStateDeprecated (this.internalCreateState (), stream, -1);
}, "java.io.DataInputStream");
Clazz.defineMethod (c$, "readState", 
function (stateDirectory) {
return this.internalReadState (this.internalCreateState (), stateDirectory, -1);
}, "java.io.File");
Clazz.defineMethod (c$, "internalReadStateDeprecated", 
($fz = function (toRestore, stream, expectedTimestamp) {
var reader =  new org.eclipse.osgi.internal.resolver.StateReader ();
if (!reader.loadStateDeprecated (toRestore, stream, expectedTimestamp)) return null;
return toRestore;
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.resolver.StateImpl,java.io.DataInputStream,~N");
Clazz.defineMethod (c$, "internalReadState", 
($fz = function (toRestore, stateDirectory, expectedTimestamp) {
var stateFile =  new java.io.File (stateDirectory, ".state");
var lazyFile =  new java.io.File (stateDirectory, ".lazy");
var reader =  new org.eclipse.osgi.internal.resolver.StateReader (stateFile, lazyFile, false);
if (!reader.loadState (toRestore, expectedTimestamp)) return null;
return toRestore;
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.resolver.StateImpl,java.io.File,~N");
Clazz.defineMethod (c$, "writeState", 
function (state, stream) {
this.internalWriteStateDeprecated (state, stream);
}, "org.eclipse.osgi.service.resolver.State,java.io.DataOutputStream");
Clazz.defineMethod (c$, "writeState", 
function (state, stateDirectory) {
if (stateDirectory == null) throw  new java.io.IOException ();
var writer =  new org.eclipse.osgi.internal.resolver.StateWriter ();
var stateFile =  new java.io.File (stateDirectory, ".state");
var lazyFile =  new java.io.File (stateDirectory, ".lazy");
writer.saveState (state, stateFile, lazyFile);
}, "org.eclipse.osgi.service.resolver.State,java.io.File");
Clazz.defineMethod (c$, "writeState", 
function (state, stream) {
this.internalWriteStateDeprecated (state,  new java.io.DataOutputStream (stream));
}, "org.eclipse.osgi.service.resolver.State,java.io.OutputStream");
Clazz.defineMethod (c$, "writeState", 
function (state, stateFile, lazyFile) {
var writer =  new org.eclipse.osgi.internal.resolver.StateWriter ();
writer.saveState (state, stateFile, lazyFile);
}, "org.eclipse.osgi.service.resolver.State,java.io.File,java.io.File");
Clazz.defineMethod (c$, "internalWriteStateDeprecated", 
function (state, stream) {
if (state.getFactory () !== this) throw  new IllegalArgumentException ();
var writer =  new org.eclipse.osgi.internal.resolver.StateWriter ();
writer.saveStateDeprecated (state, stream);
}, "org.eclipse.osgi.service.resolver.State,java.io.DataOutputStream");
});
