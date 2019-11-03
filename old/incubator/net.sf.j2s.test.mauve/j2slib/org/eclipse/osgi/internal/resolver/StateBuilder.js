Clazz.declarePackage ("org.eclipse.osgi.internal.resolver");
Clazz.load (null, "org.eclipse.osgi.internal.resolver.StateBuilder", ["java.lang.Boolean", "java.util.ArrayList", "$.HashMap", "$.HashSet", "org.eclipse.osgi.internal.resolver.BundleDescriptionImpl", "$.BundleSpecificationImpl", "$.ExportPackageDescriptionImpl", "$.HostSpecificationImpl", "$.ImportPackageSpecificationImpl", "$.StateMsg", "org.eclipse.osgi.service.resolver.VersionRange", "org.eclipse.osgi.util.ManifestElement", "$.NLS", "org.osgi.framework.BundleException", "$.Version"], function () {
c$ = Clazz.declareType (org.eclipse.osgi.internal.resolver, "StateBuilder");
c$.createBundleDescription = Clazz.defineMethod (c$, "createBundleDescription", 
function (state, manifest, location) {
var result =  new org.eclipse.osgi.internal.resolver.BundleDescriptionImpl ();
var manifestVersionHeader = manifest.get ("Bundle-ManifestVersion");
var manifestVersion = 1;
if (manifestVersionHeader != null) manifestVersion = Integer.parseInt (manifestVersionHeader);
if (manifestVersion >= 2) org.eclipse.osgi.internal.resolver.StateBuilder.validateHeaders (manifest);
var symbolicNameHeader = manifest.get ("Bundle-SymbolicName");
if (symbolicNameHeader != null) {
var symbolicNameElements = org.eclipse.osgi.util.ManifestElement.parseHeader ("Bundle-SymbolicName", symbolicNameHeader);
if (symbolicNameElements.length > 0) {
result.setSymbolicName (symbolicNameElements[0].getValue ());
var singleton = symbolicNameElements[0].getDirective ("singleton");
if (singleton == null) singleton = symbolicNameElements[0].getAttribute ("singleton");
result.setStateBit (2, "true".equals (singleton));
var fragmentAttachment = symbolicNameElements[0].getDirective ("fragment-attachment");
if (fragmentAttachment != null) {
if (fragmentAttachment.equals ("resolve-time")) {
result.setStateBit (64, true);
result.setStateBit (128, false);
} else if (fragmentAttachment.equals ("never")) {
result.setStateBit (64, false);
result.setStateBit (128, false);
}}}}var version = manifest.get ("Bundle-Version");
try {
result.setVersion ((version != null) ? org.osgi.framework.Version.parseVersion (version) : org.osgi.framework.Version.emptyVersion);
} catch (ex) {
if (Clazz.instanceOf (ex, IllegalArgumentException)) {
if (manifestVersion >= 2) throw  new org.osgi.framework.BundleException (ex.getMessage ());
} else {
throw ex;
}
}
result.setLocation (location);
result.setPlatformFilter (manifest.get ("Eclipse-PlatformFilter"));
var host = org.eclipse.osgi.util.ManifestElement.parseHeader ("Fragment-Host", manifest.get ("Fragment-Host"));
if (host != null) result.setHost (org.eclipse.osgi.internal.resolver.StateBuilder.createHostSpecification (host[0]));
var exports = org.eclipse.osgi.util.ManifestElement.parseHeader ("Export-Package", manifest.get ("Export-Package"));
var reexports = org.eclipse.osgi.util.ManifestElement.parseHeader ("Reexport-Package", manifest.get ("Reexport-Package"));
var provides = org.eclipse.osgi.util.ManifestElement.parseHeader ("Provide-Package", manifest.get ("Provide-Package"));
var strict = state != null && state.inStrictMode ();
var providedExports =  new java.util.ArrayList (provides == null ? 0 : provides.length);
result.setExportPackages (org.eclipse.osgi.internal.resolver.StateBuilder.createExportPackages (exports, reexports, provides, providedExports, manifestVersion, strict));
var imports = org.eclipse.osgi.util.ManifestElement.parseHeader ("Import-Package", manifest.get ("Import-Package"));
var dynamicImports = org.eclipse.osgi.util.ManifestElement.parseHeader ("DynamicImport-Package", manifest.get ("DynamicImport-Package"));
result.setImportPackages (org.eclipse.osgi.internal.resolver.StateBuilder.createImportPackages (result.getExportPackages (), providedExports, imports, dynamicImports, manifestVersion));
var requires = org.eclipse.osgi.util.ManifestElement.parseHeader ("Require-Bundle", manifest.get ("Require-Bundle"));
result.setRequiredBundles (org.eclipse.osgi.internal.resolver.StateBuilder.createRequiredBundles (requires));
return result;
}, "org.eclipse.osgi.internal.resolver.StateImpl,java.util.Dictionary,~S");
c$.validateHeaders = Clazz.defineMethod (c$, "validateHeaders", 
($fz = function (manifest) {
for (var i = 0; i < org.eclipse.osgi.internal.resolver.StateBuilder.DEFINED_OSGI_VALIDATE_HEADERS.length; i++) {
var header = manifest.get (org.eclipse.osgi.internal.resolver.StateBuilder.DEFINED_OSGI_VALIDATE_HEADERS[i]);
if (header != null) {
var elements = org.eclipse.osgi.util.ManifestElement.parseHeader (org.eclipse.osgi.internal.resolver.StateBuilder.DEFINED_OSGI_VALIDATE_HEADERS[i], header);
org.eclipse.osgi.internal.resolver.StateBuilder.checkForDuplicateDirectives (elements);
if (org.eclipse.osgi.internal.resolver.StateBuilder.DEFINED_OSGI_VALIDATE_HEADERS[i] === "Reexport-Package") org.eclipse.osgi.internal.resolver.StateBuilder.checkForUsesDirective (elements);
if (org.eclipse.osgi.internal.resolver.StateBuilder.DEFINED_OSGI_VALIDATE_HEADERS[i] === "Import-Package" || org.eclipse.osgi.internal.resolver.StateBuilder.DEFINED_OSGI_VALIDATE_HEADERS[i] === "DynamicImport-Package") org.eclipse.osgi.internal.resolver.StateBuilder.checkImportExportSyntax (elements, false);
if (org.eclipse.osgi.internal.resolver.StateBuilder.DEFINED_OSGI_VALIDATE_HEADERS[i] === "Export-Package") org.eclipse.osgi.internal.resolver.StateBuilder.checkImportExportSyntax (elements, true);
} else if (org.eclipse.osgi.internal.resolver.StateBuilder.DEFINED_OSGI_VALIDATE_HEADERS[i] === "Bundle-SymbolicName") {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.internal.resolver.StateMsg.HEADER_REQUIRED, "Bundle-SymbolicName"));
}}
}, $fz.isPrivate = true, $fz), "java.util.Dictionary");
c$.createRequiredBundles = Clazz.defineMethod (c$, "createRequiredBundles", 
($fz = function (specs) {
if (specs == null) return null;
var result =  new Array (specs.length);
for (var i = 0; i < specs.length; i++) result[i] = org.eclipse.osgi.internal.resolver.StateBuilder.createRequiredBundle (specs[i]);

return result;
}, $fz.isPrivate = true, $fz), "~A");
c$.createRequiredBundle = Clazz.defineMethod (c$, "createRequiredBundle", 
($fz = function (spec) {
var result =  new org.eclipse.osgi.internal.resolver.BundleSpecificationImpl ();
result.setName (spec.getValue ());
result.setVersionRange (org.eclipse.osgi.internal.resolver.StateBuilder.getVersionRange (spec.getAttribute ("bundle-version")));
result.setExported ("reexport".equals (spec.getDirective ("visibility")) || "true".equals (spec.getAttribute ("reprovide")));
result.setOptional ("optional".equals (spec.getDirective ("resolution")) || "true".equals (spec.getAttribute ("optional")));
return result;
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.util.ManifestElement");
c$.createImportPackages = Clazz.defineMethod (c$, "createImportPackages", 
($fz = function (exported, providedExports, imported, dynamicImported, manifestVersion) {
var allImports = null;
if (manifestVersion < 2) {
if (exported.length == 0 && imported == null && dynamicImported == null) return null;
allImports =  new java.util.ArrayList (exported.length + (imported == null ? 0 : imported.length));
for (var i = 0; i < exported.length; i++) {
if (providedExports.contains (exported[i].getName ())) continue ;var result =  new org.eclipse.osgi.internal.resolver.ImportPackageSpecificationImpl ();
result.setName (exported[i].getName ());
result.setVersionRange (org.eclipse.osgi.internal.resolver.StateBuilder.getVersionRange (exported[i].getVersion ().toString ()));
result.setDirective ("resolution", "static");
allImports.add (result);
}
} else {
allImports =  new java.util.ArrayList (imported == null ? 0 : imported.length);
}if (dynamicImported != null) for (var i = 0; i < dynamicImported.length; i++) org.eclipse.osgi.internal.resolver.StateBuilder.addImportPackages (dynamicImported[i], allImports, manifestVersion, true);

if (imported != null) for (var i = 0; i < imported.length; i++) org.eclipse.osgi.internal.resolver.StateBuilder.addImportPackages (imported[i], allImports, manifestVersion, false);

return allImports.toArray ( new Array (allImports.size ()));
}, $fz.isPrivate = true, $fz), "~A,java.util.ArrayList,~A,~A,~N");
c$.addImportPackages = Clazz.defineMethod (c$, "addImportPackages", 
($fz = function (importPackage, allImports, manifestVersion, dynamic) {
var importNames = importPackage.getValueComponents ();
for (var i = 0; i < importNames.length; i++) {
if (manifestVersion < 2) {
var iter = allImports.iterator ();
while (iter.hasNext ()) if (importNames[i].equals ((iter.next ()).getName ())) iter.remove ();

}var result =  new org.eclipse.osgi.internal.resolver.ImportPackageSpecificationImpl ();
result.setName (importNames[i]);
var versionString = importPackage.getAttribute ("version");
if (versionString == null) versionString = importPackage.getAttribute ("specification-version");
result.setVersionRange (org.eclipse.osgi.internal.resolver.StateBuilder.getVersionRange (versionString));
result.setBundleSymbolicName (importPackage.getAttribute ("bundle-symbolic-name"));
result.setBundleVersionRange (org.eclipse.osgi.internal.resolver.StateBuilder.getVersionRange (importPackage.getAttribute ("bundle-version")));
if (manifestVersion >= 2) result.setAttributes (org.eclipse.osgi.internal.resolver.StateBuilder.getAttributes (importPackage, org.eclipse.osgi.internal.resolver.StateBuilder.DEFINED_MATCHING_ATTRS));
if (dynamic) result.setDirective ("resolution", "dynamic");
 else result.setDirective ("resolution", org.eclipse.osgi.internal.resolver.StateBuilder.getResolution (importPackage.getDirective ("resolution")));
allImports.add (result);
}
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.util.ManifestElement,java.util.ArrayList,~N,~B");
c$.getResolution = Clazz.defineMethod (c$, "getResolution", 
($fz = function (resolution) {
var result = "static";
if ("optional".equals (resolution)) result = "optional";
return result;
}, $fz.isPrivate = true, $fz), "~S");
c$.createExportPackages = Clazz.defineMethod (c$, "createExportPackages", 
function (exported, reexported, provides, providedExports, manifestVersion, strict) {
var numExports = (exported == null ? 0 : exported.length) + (reexported == null ? 0 : reexported.length) + (provides == null ? 0 : provides.length);
if (numExports == 0) return null;
var allExports =  new java.util.ArrayList (numExports);
if (exported != null) for (var i = 0; i < exported.length; i++) org.eclipse.osgi.internal.resolver.StateBuilder.addExportPackages (exported[i], allExports, manifestVersion, false, strict);

if (reexported != null) for (var i = 0; i < reexported.length; i++) org.eclipse.osgi.internal.resolver.StateBuilder.addExportPackages (reexported[i], allExports, manifestVersion, true, strict);

if (provides != null) org.eclipse.osgi.internal.resolver.StateBuilder.addProvidePackages (provides, allExports, providedExports);
return allExports.toArray ( new Array (allExports.size ()));
}, "~A,~A,~A,java.util.ArrayList,~N,~B");
c$.addExportPackages = Clazz.defineMethod (c$, "addExportPackages", 
($fz = function (exportPackage, allExports, manifestVersion, reexported, strict) {
var exportNames = exportPackage.getValueComponents ();
for (var i = 0; i < exportNames.length; i++) {
if (strict && "true".equals (exportPackage.getDirective ("x-internal"))) continue ;var result =  new org.eclipse.osgi.internal.resolver.ExportPackageDescriptionImpl ();
result.setName (exportNames[i]);
var versionString = exportPackage.getAttribute ("version");
if (versionString == null) versionString = exportPackage.getAttribute ("specification-version");
if (versionString != null) result.setVersion (org.osgi.framework.Version.parseVersion (versionString));
result.setDirective ("uses", org.eclipse.osgi.util.ManifestElement.getArrayFromList (exportPackage.getDirective ("uses")));
result.setDirective ("include", exportPackage.getDirective ("include"));
result.setDirective ("exclude", exportPackage.getDirective ("exclude"));
result.setDirective ("x-friends", org.eclipse.osgi.util.ManifestElement.getArrayFromList (exportPackage.getDirective ("x-friends")));
result.setDirective ("x-internal", Boolean.$valueOf (exportPackage.getDirective ("x-internal")));
result.setDirective ("mandatory", org.eclipse.osgi.util.ManifestElement.getArrayFromList (exportPackage.getDirective ("mandatory")));
result.setAttributes (org.eclipse.osgi.internal.resolver.StateBuilder.getAttributes (exportPackage, org.eclipse.osgi.internal.resolver.StateBuilder.DEFINED_MATCHING_ATTRS));
result.setRoot (!reexported);
allExports.add (result);
}
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.util.ManifestElement,java.util.ArrayList,~N,~B,~B");
c$.addProvidePackages = Clazz.defineMethod (c$, "addProvidePackages", 
($fz = function (provides, allExports, providedExports) {
var currentExports = allExports.toArray ( new Array (allExports.size ()));
for (var i = 0; i < provides.length; i++) {
var duplicate = false;
for (var j = 0; j < currentExports.length; j++) if (provides[i].getValue ().equals (currentExports[j].getName ())) {
duplicate = true;
break;
}
if (!duplicate) {
var result =  new org.eclipse.osgi.internal.resolver.ExportPackageDescriptionImpl ();
result.setName (provides[i].getValue ());
result.setRoot (true);
allExports.add (result);
}providedExports.add (provides[i].getValue ());
}
}, $fz.isPrivate = true, $fz), "~A,java.util.ArrayList,java.util.ArrayList");
c$.getAttributes = Clazz.defineMethod (c$, "getAttributes", 
($fz = function (exportPackage, definedAttrs) {
var keys = exportPackage.getKeys ();
var arbitraryAttrs = null;
if (keys == null) return null;
while (keys.hasMoreElements ()) {
var definedAttr = false;
var key = keys.nextElement ();
for (var i = 0; i < definedAttrs.length; i++) {
if (definedAttrs[i].equals (key)) {
definedAttr = true;
break;
}}
if (!definedAttr) {
if (arbitraryAttrs == null) arbitraryAttrs =  new java.util.HashMap ();
arbitraryAttrs.put (key, exportPackage.getAttribute (key));
}}
return arbitraryAttrs;
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.util.ManifestElement,~A");
c$.createHostSpecification = Clazz.defineMethod (c$, "createHostSpecification", 
($fz = function (spec) {
if (spec == null) return null;
var result =  new org.eclipse.osgi.internal.resolver.HostSpecificationImpl ();
result.setName (spec.getValue ());
result.setVersionRange (org.eclipse.osgi.internal.resolver.StateBuilder.getVersionRange (spec.getAttribute ("bundle-version")));
result.setIsMultiHost ("true".equals (spec.getDirective ("multiple-hosts")));
return result;
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.util.ManifestElement");
c$.getVersionRange = Clazz.defineMethod (c$, "getVersionRange", 
($fz = function (versionRange) {
if (versionRange == null) return null;
return  new org.eclipse.osgi.service.resolver.VersionRange (versionRange);
}, $fz.isPrivate = true, $fz), "~S");
c$.checkImportExportSyntax = Clazz.defineMethod (c$, "checkImportExportSyntax", 
($fz = function (elements, $export) {
if (elements == null) return ;
var length = elements.length;
var packages =  new java.util.HashSet (length);
for (var i = 0; i < length; i++) {
var packageNames = elements[i].getValueComponents ();
for (var j = 0; j < packageNames.length; j++) {
if (!$export && packages.contains (packageNames[j])) throw  new org.osgi.framework.BundleException (org.eclipse.osgi.internal.resolver.StateMsg.HEADER_PACKAGE_DUPLICATES);
if (packageNames[j].startsWith ("java.")) throw  new org.osgi.framework.BundleException (org.eclipse.osgi.internal.resolver.StateMsg.HEADER_PACKAGE_JAVA);
packages.add (packageNames[j]);
}
var version = elements[i].getAttribute ("version");
if (version != null) {
var specVersion = elements[i].getAttribute ("specification-version");
if (specVersion != null && !specVersion.equals (version)) throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.internal.resolver.StateMsg.HEADER_VERSION_ERROR, "version", "specification-version"));
}if ($export) {
if (elements[i].getAttribute ("bundle-symbolic-name") != null) throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.internal.resolver.StateMsg.HEADER_EXPORT_ATTR_ERROR, "bundle-symbolic-name", "Export-Package"));
if (elements[i].getAttribute ("bundle-version") != null) throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.internal.resolver.StateMsg.HEADER_EXPORT_ATTR_ERROR, "bundle-version", "Export-Package"));
}}
}, $fz.isPrivate = true, $fz), "~A,~B");
c$.checkForDuplicateDirectives = Clazz.defineMethod (c$, "checkForDuplicateDirectives", 
($fz = function (elements) {
for (var i = 0; i < elements.length; i++) {
var keys = elements[i].getDirectiveKeys ();
if (keys != null) {
while (keys.hasMoreElements ()) {
var key = keys.nextElement ();
var directives = elements[i].getDirectives (key);
if (directives.length > 1) throw  new org.osgi.framework.BundleException (org.eclipse.osgi.internal.resolver.StateMsg.HEADER_DIRECTIVE_DUPLICATES);
}
}}
}, $fz.isPrivate = true, $fz), "~A");
c$.checkForUsesDirective = Clazz.defineMethod (c$, "checkForUsesDirective", 
($fz = function (elements) {
for (var i = 0; i < elements.length; i++) if (elements[i].getDirective ("uses") != null) throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.internal.resolver.StateMsg.HEADER_REEXPORT_USES, "uses", "Reexport-Package"));

}, $fz.isPrivate = true, $fz), "~A");
c$.DEFINED_MATCHING_ATTRS = c$.prototype.DEFINED_MATCHING_ATTRS = ["bundle-symbolic-name", "bundle-version", "specification-version", "version"];
c$.DEFINED_OSGI_VALIDATE_HEADERS = c$.prototype.DEFINED_OSGI_VALIDATE_HEADERS = ["Import-Package", "DynamicImport-Package", "Export-Package", "Fragment-Host", "Bundle-SymbolicName", "Reexport-Package", "Require-Bundle"];
});
