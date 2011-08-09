Clazz.declarePackage ("org.eclipse.core.runtime.internal.adaptor");
Clazz.load (["org.eclipse.osgi.service.pluginconversion.PluginConverter"], "org.eclipse.core.runtime.internal.adaptor.PluginConverterImpl", ["java.io.BufferedInputStream", "$.BufferedReader", "$.BufferedWriter", "$.File", "$.FileInputStream", "$.FileOutputStream", "$.InputStreamReader", "$.OutputStreamWriter", "java.lang.IllegalArgumentException", "$.Long", "$.StringBuffer", "java.net.URL", "java.util.ArrayList", "$.HashSet", "$.Hashtable", "$.TreeSet", "java.util.jar.JarFile", "org.eclipse.core.runtime.adaptor.EclipseAdaptor", "$.EclipseAdaptorMsg", "org.eclipse.core.runtime.internal.adaptor.PluginParser", "org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper", "org.eclipse.osgi.framework.log.FrameworkLogEntry", "org.eclipse.osgi.service.pluginconversion.PluginConversionException", "org.eclipse.osgi.service.resolver.VersionRange", "org.eclipse.osgi.util.ManifestElement", "$.NLS", "org.osgi.framework.Version"], function () {
c$ = Clazz.decorateAsClass (function () {
this.context = null;
this.out = null;
this.pluginInfo = null;
this.pluginManifestLocation = null;
this.generatedManifest = null;
this.manifestType = 0;
this.target = null;
this.devProperties = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.internal.adaptor, "PluginConverterImpl", null, org.eclipse.osgi.service.pluginconversion.PluginConverter);
c$.getDefault = Clazz.defineMethod (c$, "getDefault", 
function () {
return org.eclipse.core.runtime.internal.adaptor.PluginConverterImpl.instance;
});
Clazz.makeConstructor (c$, 
function (context) {
this.context = context;
($t$ = org.eclipse.core.runtime.internal.adaptor.PluginConverterImpl.instance = this, org.eclipse.core.runtime.internal.adaptor.PluginConverterImpl.prototype.instance = org.eclipse.core.runtime.internal.adaptor.PluginConverterImpl.instance, $t$);
}, "org.osgi.framework.BundleContext");
Clazz.defineMethod (c$, "init", 
($fz = function () {
this.out = null;
this.pluginInfo = null;
this.pluginManifestLocation = null;
this.generatedManifest =  new java.util.Hashtable (10);
this.manifestType = 0;
this.target = null;
this.devProperties = null;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "fillPluginInfo", 
($fz = function (pluginBaseLocation) {
this.pluginManifestLocation = pluginBaseLocation;
if (this.pluginManifestLocation == null) throw  new IllegalArgumentException ();
var pluginFile = this.findPluginManifest (pluginBaseLocation);
if (pluginFile == null) throw  new org.eclipse.osgi.service.pluginconversion.PluginConversionException (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_CONVERTER_FILENOTFOUND, pluginBaseLocation.getAbsolutePath ()));
this.pluginInfo = this.parsePluginInfo (pluginFile);
var validation = this.pluginInfo.validateForm ();
if (validation != null) throw  new org.eclipse.osgi.service.pluginconversion.PluginConversionException (validation);
}, $fz.isPrivate = true, $fz), "java.io.File");
Clazz.defineMethod (c$, "filterExport", 
($fz = function (exportToFilter, filter) {
if (filter == null || filter.contains ("*")) return exportToFilter;
var filteredExport =  new java.util.HashSet (exportToFilter.size ());
for (var iter = exportToFilter.iterator (); iter.hasNext (); ) {
var anExport = iter.next ();
for (var iter2 = filter.iterator (); iter2.hasNext (); ) {
var aFilter = iter2.next ();
var dotStar = aFilter.indexOf (".*");
if (dotStar != -1) aFilter = aFilter.substring (0, dotStar);
if (anExport.equals (aFilter)) {
filteredExport.add (anExport);
break;
}}
}
return filteredExport;
}, $fz.isPrivate = true, $fz), "java.util.Collection,java.util.Collection");
Clazz.defineMethod (c$, "findOSJars", 
($fz = function (pluginRoot, path, filter) {
path = path.substring (4);
var found =  new java.util.ArrayList (0);
for (var i = 0; i < org.eclipse.core.runtime.internal.adaptor.PluginConverterImpl.OS_LIST.length; i++) {
var searchedPath = "os/" + org.eclipse.core.runtime.internal.adaptor.PluginConverterImpl.OS_LIST[i] + "/" + path;
if ( new java.io.File (pluginRoot, searchedPath).exists ()) found.add (searchedPath + (filter ? ";(os=" + org.eclipse.core.runtime.internal.adaptor.PluginConverterImpl.WS_LIST[i] + ")" : ""));
for (var j = 0; j < org.eclipse.core.runtime.internal.adaptor.PluginConverterImpl.ARCH_LIST.length; j++) {
searchedPath = "os/" + org.eclipse.core.runtime.internal.adaptor.PluginConverterImpl.OS_LIST[i] + "/" + org.eclipse.core.runtime.internal.adaptor.PluginConverterImpl.ARCH_LIST[j] + "/" + path;
if ( new java.io.File (pluginRoot, searchedPath).exists ()) {
found.add (searchedPath + (filter ? ";(& (os=" + org.eclipse.core.runtime.internal.adaptor.PluginConverterImpl.WS_LIST[i] + ") (arch=" + org.eclipse.core.runtime.internal.adaptor.PluginConverterImpl.ARCH_LIST[j] + ")" : ""));
}}
}
return found;
}, $fz.isPrivate = true, $fz), "java.io.File,~S,~B");
Clazz.defineMethod (c$, "findPluginManifest", 
($fz = function (baseLocation) {
var xmlFileLocation;
var stream = null;
var baseURL = null;
try {
if (baseLocation.getName ().endsWith (".jar")) {
baseURL =  new java.net.URL ("jar:file:" + baseLocation.toString () + "!/");
this.manifestType |= 8;
} else {
baseURL = baseLocation.toURL ();
}} catch (e1) {
if (Clazz.instanceOf (e1, java.net.MalformedURLException)) {
} else {
throw e1;
}
}
try {
xmlFileLocation =  new java.net.URL (baseURL, "plugin.xml");
stream = xmlFileLocation.openStream ();
this.manifestType |= 2;
return xmlFileLocation;
} catch (e$$) {
if (Clazz.instanceOf (e$$, java.net.MalformedURLException)) {
var e = e$$;
{
var entry =  new org.eclipse.osgi.framework.log.FrameworkLogEntry ("org.eclipse.osgi", e.getMessage (), 0, e, null);
org.eclipse.core.runtime.adaptor.EclipseAdaptor.getDefault ().getFrameworkLog ().log (entry);
return null;
}
} else if (Clazz.instanceOf (e$$, java.io.IOException)) {
var ioe = e$$;
{
}
} else {
throw e$$;
}
} finally {
try {
if (stream != null) stream.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}
try {
xmlFileLocation =  new java.net.URL (baseURL, "fragment.xml");
stream = xmlFileLocation.openStream ();
this.manifestType |= 4;
return xmlFileLocation;
} catch (e$$) {
if (Clazz.instanceOf (e$$, java.net.MalformedURLException)) {
var e = e$$;
{
var entry =  new org.eclipse.osgi.framework.log.FrameworkLogEntry ("org.eclipse.osgi", e.getMessage (), 0, e, null);
org.eclipse.core.runtime.adaptor.EclipseAdaptor.getDefault ().getFrameworkLog ().log (entry);
return null;
}
} else if (Clazz.instanceOf (e$$, java.io.IOException)) {
var ioe = e$$;
{
}
} else {
throw e$$;
}
} finally {
try {
if (stream != null) stream.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}
return null;
}, $fz.isPrivate = true, $fz), "java.io.File");
Clazz.defineMethod (c$, "findWSJars", 
($fz = function (pluginRoot, path, filter) {
path = path.substring (4);
var found =  new java.util.ArrayList (0);
for (var i = 0; i < org.eclipse.core.runtime.internal.adaptor.PluginConverterImpl.WS_LIST.length; i++) {
var searchedPath = "ws/" + org.eclipse.core.runtime.internal.adaptor.PluginConverterImpl.WS_LIST[i] + path;
if ( new java.io.File (pluginRoot, searchedPath).exists ()) {
found.add (searchedPath + (filter ? ";(ws=" + org.eclipse.core.runtime.internal.adaptor.PluginConverterImpl.WS_LIST[i] + ")" : ""));
}}
return found;
}, $fz.isPrivate = true, $fz), "java.io.File,~S,~B");
Clazz.defineMethod (c$, "fillManifest", 
function (compatibilityManifest, analyseJars) {
this.generateManifestVersion ();
this.generateHeaders ();
this.generateClasspath ();
this.generateActivator ();
this.generatePluginClass ();
if (analyseJars) this.generateProvidePackage ();
this.generateRequireBundle ();
this.generateLocalizationEntry ();
this.generateEclipseHeaders ();
if (compatibilityManifest) {
this.generateTimestamp ();
}}, "~B,~B");
Clazz.overrideMethod (c$, "writeManifest", 
function (generationLocation, manifestToWrite, compatibilityManifest) {
try {
var parentFile =  new java.io.File (generationLocation.getParent ());
parentFile.mkdirs ();
generationLocation.createNewFile ();
if (!generationLocation.isFile ()) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_CONVERTER_ERROR_CREATING_BUNDLE_MANIFEST, this.pluginInfo.getUniqueId (), generationLocation);
throw  new org.eclipse.osgi.service.pluginconversion.PluginConversionException (message);
}manifestToWrite =  new java.util.Hashtable (manifestToWrite);
this.out =  new java.io.BufferedWriter ( new java.io.OutputStreamWriter ( new java.io.FileOutputStream (generationLocation), "UTF-8"));
this.writeEntry ("Manifest-Version", manifestToWrite.remove ("Manifest-Version"));
this.writeEntry ("Generated-from", manifestToWrite.remove ("Generated-from"));
if ("3.1".equals (this.target)) this.writeEntry ("Bundle-ManifestVersion", manifestToWrite.remove ("Bundle-ManifestVersion"));
this.writeEntry ("Bundle-Name", manifestToWrite.remove ("Bundle-Name"));
this.writeEntry ("Bundle-SymbolicName", manifestToWrite.remove ("Bundle-SymbolicName"));
this.writeEntry ("Bundle-Version", manifestToWrite.remove ("Bundle-Version"));
this.writeEntry ("Bundle-ClassPath", manifestToWrite.remove ("Bundle-ClassPath"));
this.writeEntry ("Bundle-Activator", manifestToWrite.remove ("Bundle-Activator"));
this.writeEntry ("Bundle-Vendor", manifestToWrite.remove ("Bundle-Vendor"));
this.writeEntry ("Fragment-Host", manifestToWrite.remove ("Fragment-Host"));
this.writeEntry ("Bundle-Localization", manifestToWrite.remove ("Bundle-Localization"));
if ("3.1".equals (this.target)) this.writeEntry ("Export-Package", manifestToWrite.remove ("Export-Package"));
 else this.writeEntry ("Provide-Package", manifestToWrite.remove ("Provide-Package"));
this.writeEntry ("Require-Bundle", manifestToWrite.remove ("Require-Bundle"));
var keys = manifestToWrite.keys ();
while (keys.hasMoreElements ()) {
var key = keys.nextElement ();
this.writeEntry (key, manifestToWrite.get (key));
}
this.out.flush ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_CONVERTER_ERROR_CREATING_BUNDLE_MANIFEST, this.pluginInfo.getUniqueId (), generationLocation);
throw  new org.eclipse.osgi.service.pluginconversion.PluginConversionException (message, e);
} else {
throw e;
}
} finally {
if (this.out != null) try {
this.out.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}
}, "java.io.File,java.util.Dictionary,~B");
Clazz.defineMethod (c$, "generateLocalizationEntry", 
($fz = function () {
this.generatedManifest.put ("Bundle-Localization", "plugin");
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "generateManifestVersion", 
($fz = function () {
this.generatedManifest.put ("Manifest-Version", "1.0");
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "requireRuntimeCompatibility", 
($fz = function () {
var requireList = this.pluginInfo.getRequires ();
for (var iter = requireList.iterator (); iter.hasNext (); ) {
if ((iter.next ()).getName ().equalsIgnoreCase ("org.eclipse.core.runtime.compatibility")) return true;
}
return false;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "generateActivator", 
($fz = function () {
if (!this.pluginInfo.isFragment ()) if (!this.requireRuntimeCompatibility ()) {
var pluginClass = this.pluginInfo.getPluginClass ();
if (pluginClass != null && !pluginClass.trim ().equals ("")) this.generatedManifest.put ("Bundle-Activator", pluginClass);
} else {
this.generatedManifest.put ("Bundle-Activator", "org.eclipse.core.internal.compatibility.PluginActivator");
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "generateClasspath", 
($fz = function () {
var classpath = this.pluginInfo.getLibrariesName ();
if (classpath.length != 0) this.generatedManifest.put ("Bundle-ClassPath", this.getStringFromArray (classpath, ",\n "));
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "generateHeaders", 
($fz = function () {
if ("3.1".equals (this.target)) this.generatedManifest.put ("Bundle-ManifestVersion", "2");
this.generatedManifest.put ("Bundle-Name", this.pluginInfo.getPluginName ());
this.generatedManifest.put ("Bundle-Version", this.pluginInfo.getVersion ());
this.generatedManifest.put ("Bundle-SymbolicName", this.getSymbolicNameEntry ());
var provider = this.pluginInfo.getProviderName ();
if (provider != null) this.generatedManifest.put ("Bundle-Vendor", provider);
if (this.pluginInfo.isFragment ()) {
var hostBundle =  new StringBuffer ();
hostBundle.append (this.pluginInfo.getMasterId ());
var versionRange = this.getVersionRange (this.pluginInfo.getMasterVersion (), this.pluginInfo.getMasterMatch ());
if (versionRange != null) hostBundle.append (versionRange);
this.generatedManifest.put ("Fragment-Host", hostBundle.toString ());
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getSymbolicNameEntry", 
($fz = function () {
if (!this.pluginInfo.isSingleton ()) return this.pluginInfo.getUniqueId ();
var result =  new StringBuffer (this.pluginInfo.getUniqueId ());
result.append ("; ");
result.append ("singleton");
var assignment = "3.1".equals (this.target) ? ":=" : "=";
result.append (assignment).append ("true");
return result.toString ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "generatePluginClass", 
($fz = function () {
if (this.requireRuntimeCompatibility ()) {
var pluginClass = this.pluginInfo.getPluginClass ();
if (pluginClass != null) this.generatedManifest.put ("Plugin-Class", pluginClass);
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "generateProvidePackage", 
($fz = function () {
var exports = this.getExports ();
if (exports != null && exports.size () != 0) {
this.generatedManifest.put ("3.1".equals (this.target) ? "Export-Package" : "Provide-Package", this.getStringFromCollection (exports, ",\n "));
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "generateRequireBundle", 
($fz = function () {
var requiredBundles = this.pluginInfo.getRequires ();
if (requiredBundles.size () == 0) return ;
var bundleRequire =  new StringBuffer ();
for (var iter = requiredBundles.iterator (); iter.hasNext (); ) {
var element = iter.next ();
var modImport =  new StringBuffer (element.getName ());
var versionRange = this.getVersionRange (element.getVersion (), element.getMatch ());
if (versionRange != null) modImport.append (versionRange);
if (element.isExported ()) {
if ("3.1".equals (this.target)) modImport.append (';').append ("visibility").append (":=").append ("reexport");
 else modImport.append (';').append ("reprovide").append ("=true");
}if (element.isOptional ()) {
if ("3.1".equals (this.target)) modImport.append (';').append ("resolution").append (":=").append ("optional");
 else modImport.append (';').append ("optional").append ("=true");
}bundleRequire.append (modImport.toString ());
if (iter.hasNext ()) bundleRequire.append (",\n ");
}
this.generatedManifest.put ("Require-Bundle", bundleRequire.toString ());
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "generateTimestamp", 
($fz = function () {
this.generatedManifest.put ("Generated-from", Long.toString (org.eclipse.core.runtime.internal.adaptor.PluginConverterImpl.getTimeStamp (this.pluginManifestLocation, this.manifestType)) + ";" + "type" + "=" + this.manifestType);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "generateEclipseHeaders", 
($fz = function () {
if (this.pluginInfo.isFragment ()) return ;
var pluginClass = this.pluginInfo.getPluginClass ();
if (this.pluginInfo.hasExtensionExtensionPoints () || (pluginClass != null && !pluginClass.trim ().equals (""))) this.generatedManifest.put ("Eclipse-AutoStart", "true");
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getExports", 
($fz = function () {
var libs = this.pluginInfo.getLibraries ();
if (libs == null) return null;
if (this.devProperties != null || org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.inDevelopmentMode ()) {
var devClassPath = org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.getDevClassPath (this.pluginInfo.getUniqueId (), this.devProperties);
var allExportClauses =  new java.util.ArrayList (libs.size ());
var libEntries = libs.entrySet ();
for (var iter = libEntries.iterator (); iter.hasNext (); ) {
var element = iter.next ();
allExportClauses.addAll (element.getValue ());
}
if (devClassPath != null) {
var ignoreDotProp = org.eclipse.osgi.framework.adaptor.core.DevClassPathHelper.getDevClassPath ("@ignoredot@", this.devProperties);
if (devClassPath.length > 0 && ignoreDotProp != null && ignoreDotProp.length > 0 && "true".equals (ignoreDotProp[0])) libs.remove (".");
for (var i = 0; i < devClassPath.length; i++) libs.put (devClassPath[i], allExportClauses);

}}var result =  new java.util.TreeSet ();
var libEntries = libs.entrySet ();
for (var iter = libEntries.iterator (); iter.hasNext (); ) {
var element = iter.next ();
var filter = element.getValue ();
if (filter.size () == 0) continue ;var libEntryText = (element.getKey ()).trim ();
var libraryLocation;
if (libEntryText.equals (".")) libraryLocation = this.pluginManifestLocation;
 else {
var libEntryAsPath =  new java.io.File (libEntryText);
libraryLocation = libEntryAsPath.isAbsolute () ? libEntryAsPath :  new java.io.File (this.pluginManifestLocation, libEntryText);
}var exports = null;
if (libraryLocation.exists ()) {
if (libraryLocation.isFile ()) exports = this.filterExport (this.getExportsFromJAR (libraryLocation), filter);
 else if (libraryLocation.isDirectory ()) exports = this.filterExport (this.getExportsFromDir (libraryLocation), filter);
} else {
var expandedLibs = this.getLibrariesExpandingVariables (element.getKey (), false);
exports =  new java.util.HashSet ();
for (var iterator = expandedLibs.iterator (); iterator.hasNext (); ) {
var libName = iterator.next ();
var libFile =  new java.io.File (this.pluginManifestLocation, libName);
if (libFile.isFile ()) {
exports.addAll (this.filterExport (this.getExportsFromJAR (libFile), filter));
}}
}if (exports != null) result.addAll (exports);
}
return result;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getExportsFromDir", 
($fz = function (location) {
return this.getExportsFromDir (location, "");
}, $fz.isPrivate = true, $fz), "java.io.File");
Clazz.defineMethod (c$, "getExportsFromDir", 
($fz = function (location, packageName) {
var prefix = (packageName.length > 0) ? (packageName + '.') : "";
var files = location.list ();
var exportedPaths =  new java.util.HashSet ();
var containsFile = false;
if (files != null) for (var i = 0; i < files.length; i++) {
if (!this.isValidPackageName (files[i])) continue ;var pkgFile =  new java.io.File (location, files[i]);
if (pkgFile.isDirectory ()) exportedPaths.addAll (this.getExportsFromDir (pkgFile, prefix + files[i]));
 else containsFile = true;
}
if (containsFile) if (packageName.length > 0) exportedPaths.add (packageName);
 else exportedPaths.add (".");
return exportedPaths;
}, $fz.isPrivate = true, $fz), "java.io.File,~S");
Clazz.defineMethod (c$, "getExportsFromJAR", 
($fz = function (jarFile) {
var names =  new java.util.HashSet ();
var file = null;
try {
file =  new java.util.jar.JarFile (jarFile);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_CONVERTER_PLUGIN_LIBRARY_IGNORED, jarFile, this.pluginInfo.getUniqueId ());
org.eclipse.core.runtime.adaptor.EclipseAdaptor.getDefault ().getFrameworkLog ().log ( new org.eclipse.osgi.framework.log.FrameworkLogEntry ("org.eclipse.osgi", message, 0, e, null));
return names;
} else {
throw e;
}
}
for (var entriesEnum = file.entries (); entriesEnum.hasMoreElements (); ) {
var entry = entriesEnum.nextElement ();
var name = entry.getName ();
if (!this.isValidPackageName (name)) continue ;var lastSlash = name.lastIndexOf ("/");
if (lastSlash != -1) {
if (lastSlash != name.length - 1 && name.lastIndexOf (' ') == -1) names.add (name.substring (0, lastSlash).$replace ('/', '.'));
} else {
names.add (".");
}}
try {
file.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
return names;
}, $fz.isPrivate = true, $fz), "java.io.File");
Clazz.defineMethod (c$, "getLibrariesExpandingVariables", 
($fz = function (libraryPath, filter) {
var $var = this.hasPrefix (libraryPath);
if ($var == null) {
var returnValue =  new java.util.ArrayList (1);
returnValue.add (libraryPath);
return returnValue;
}if ($var.equals ("ws")) {
return this.findWSJars (this.pluginManifestLocation, libraryPath, filter);
}if ($var.equals ("os")) {
return this.findOSJars (this.pluginManifestLocation, libraryPath, filter);
}return  new java.util.ArrayList (0);
}, $fz.isPrivate = true, $fz), "~S,~B");
Clazz.defineMethod (c$, "hasPrefix", 
($fz = function (libPath) {
if (libPath.startsWith ("$ws$")) return "ws";
if (libPath.startsWith ("$os$")) return "os";
if (libPath.startsWith ("$nl$")) return "nl";
return null;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "isValidPackageName", 
($fz = function (name) {
if (name.indexOf (' ') > 0 || name.equalsIgnoreCase ("META-INF") || name.startsWith ("META-INF/")) return false;
return true;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "parsePluginInfo", 
($fz = function (pluginLocation) {
var input = null;
try {
input =  new java.io.BufferedInputStream (pluginLocation.openStream ());
return  new org.eclipse.core.runtime.internal.adaptor.PluginParser (this.context, this.target).parsePlugin (input);
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_CONVERTER_ERROR_PARSING_PLUGIN_MANIFEST, this.pluginManifestLocation);
throw  new org.eclipse.osgi.service.pluginconversion.PluginConversionException (message, e);
} else {
throw e;
}
} finally {
if (input != null) try {
input.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}
}, $fz.isPrivate = true, $fz), "java.net.URL");
c$.upToDate = Clazz.defineMethod (c$, "upToDate", 
function (generationLocation, pluginLocation, manifestType) {
if (!generationLocation.isFile ()) return false;
var secondLine = null;
var reader = null;
try {
reader =  new java.io.BufferedReader ( new java.io.InputStreamReader ( new java.io.FileInputStream (generationLocation)));
reader.readLine ();
secondLine = reader.readLine ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
return false;
} else {
throw e;
}
} finally {
if (reader != null) try {
reader.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}
var tag = "Generated-from: ";
if (secondLine == null || !secondLine.startsWith (tag)) return false;
secondLine = secondLine.substring (tag.length);
var generatedFrom;
try {
generatedFrom = org.eclipse.osgi.util.ManifestElement.parseHeader ("Generated-from", secondLine)[0];
} catch (be) {
if (Clazz.instanceOf (be, org.osgi.framework.BundleException)) {
return false;
} else {
throw be;
}
}
var timestampStr = generatedFrom.getValue ();
try {
return Long.parseLong (timestampStr.trim ()) == org.eclipse.core.runtime.internal.adaptor.PluginConverterImpl.getTimeStamp (pluginLocation, manifestType);
} catch (nfe) {
if (Clazz.instanceOf (nfe, NumberFormatException)) {
} else {
throw nfe;
}
}
return false;
}, "java.io.File,java.io.File,~N");
c$.getTimeStamp = Clazz.defineMethod (c$, "getTimeStamp", 
function (pluginLocation, manifestType) {
if ((manifestType & 8) != 0) return pluginLocation.lastModified ();
 else if ((manifestType & 2) != 0) return  new java.io.File (pluginLocation, "plugin.xml").lastModified ();
 else if ((manifestType & 4) != 0) return  new java.io.File (pluginLocation, "fragment.xml").lastModified ();
 else if ((manifestType & 1) != 0) return  new java.io.File (pluginLocation, "META-INF/MANIFEST.MF").lastModified ();
return -1;
}, "java.io.File,~N");
Clazz.defineMethod (c$, "writeEntry", 
($fz = function (key, value) {
if (value != null && value.length > 0) {
this.out.write (this.splitOnComma (key + ": " + value));
this.out.write ('\n'.charCodeAt (0));
}}, $fz.isPrivate = true, $fz), "~S,~S");
Clazz.defineMethod (c$, "splitOnComma", 
($fz = function (value) {
if (value.length < org.eclipse.core.runtime.internal.adaptor.PluginConverterImpl.MAXLINE || value.indexOf ("\n ") >= 0) return value;
var values = org.eclipse.osgi.util.ManifestElement.getArrayFromList (value);
if (values == null || values.length == 0) return value;
var sb =  new StringBuffer (value.length + ((values.length - 1) * ",\n ".length));
for (var i = 0; i < values.length - 1; i++) sb.append (values[i]).append (",\n ");

sb.append (values[values.length - 1]);
return sb.toString ();
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "getStringFromArray", 
($fz = function (values, separator) {
if (values == null) return "";
var result =  new StringBuffer ();
for (var i = 0; i < values.length; i++) {
if (i > 0) result.append (separator);
result.append (values[i]);
}
return result.toString ();
}, $fz.isPrivate = true, $fz), "~A,~S");
Clazz.defineMethod (c$, "getStringFromCollection", 
($fz = function (collection, separator) {
var result =  new StringBuffer ();
var first = true;
for (var i = collection.iterator (); i.hasNext (); ) {
if (first) first = false;
 else result.append (separator);
result.append (i.next ());
}
return result.toString ();
}, $fz.isPrivate = true, $fz), "java.util.Collection,~S");
Clazz.defineMethod (c$, "convertManifest", 
function (pluginBaseLocation, compatibility, target, analyseJars, devProperties) {
if (org.eclipse.core.runtime.internal.adaptor.PluginConverterImpl.DEBUG) System.out.println ("Convert " + pluginBaseLocation);
this.init ();
this.target = target == null ? "3.1" : target;
this.devProperties = devProperties;
this.fillPluginInfo (pluginBaseLocation);
this.fillManifest (compatibility, analyseJars);
return this.generatedManifest;
}, "java.io.File,~B,~S,~B,java.util.Dictionary");
Clazz.defineMethod (c$, "convertManifest", 
function (pluginBaseLocation, bundleManifestLocation, compatibilityManifest, target, analyseJars, devProperties) {
this.convertManifest (pluginBaseLocation, compatibilityManifest, target, analyseJars, devProperties);
if (bundleManifestLocation == null) {
var cacheLocation = System.getProperties ().get ("osgi.manifest.cache");
bundleManifestLocation =  new java.io.File (cacheLocation, this.pluginInfo.getUniqueId () + '_' + this.pluginInfo.getVersion () + ".MF");
}if (org.eclipse.core.runtime.internal.adaptor.PluginConverterImpl.upToDate (bundleManifestLocation, this.pluginManifestLocation, this.manifestType)) return bundleManifestLocation;
this.writeManifest (bundleManifestLocation, this.generatedManifest, compatibilityManifest);
return bundleManifestLocation;
}, "java.io.File,java.io.File,~B,~S,~B,java.util.Dictionary");
Clazz.defineMethod (c$, "getVersionRange", 
($fz = function (reqVersion, matchRule) {
if (reqVersion == null) return null;
var minVersion = org.osgi.framework.Version.parseVersion (reqVersion);
var versionRange;
if (matchRule != null) {
if (matchRule.equalsIgnoreCase ("perfect")) {
versionRange =  new org.eclipse.osgi.service.resolver.VersionRange (minVersion, true, minVersion, true).toString ();
} else if (matchRule.equalsIgnoreCase ("equivalent")) {
versionRange =  new org.eclipse.osgi.service.resolver.VersionRange (minVersion, true,  new org.osgi.framework.Version (minVersion.getMajor (), minVersion.getMinor () + 1, 0, ""), false).toString ();
} else if (matchRule.equalsIgnoreCase ("compatible")) {
versionRange =  new org.eclipse.osgi.service.resolver.VersionRange (minVersion, true,  new org.osgi.framework.Version (minVersion.getMajor () + 1, 0, 0, ""), false).toString ();
} else if (matchRule.equalsIgnoreCase ("greaterOrEqual")) {
versionRange = reqVersion;
} else {
versionRange =  new org.eclipse.osgi.service.resolver.VersionRange (minVersion, true,  new org.osgi.framework.Version (minVersion.getMajor () + 1, 0, 0, ""), false).toString ();
}} else {
versionRange =  new org.eclipse.osgi.service.resolver.VersionRange (minVersion, true,  new org.osgi.framework.Version (minVersion.getMajor () + 1, 0, 0, ""), false).toString ();
}var result =  new StringBuffer ();
result.append (';').append ("bundle-version").append ('=');
result.append ('\"').append (versionRange).append ('\"');
return result.toString ();
}, $fz.isPrivate = true, $fz), "~S,~S");
Clazz.defineStatics (c$,
"DEBUG", false,
"SEMICOLON", "; ",
"UTF_8", "UTF-8",
"LIST_SEPARATOR", ",\n ",
"LINE_SEPARATOR", "\n ",
"DOT", ".",
"MAXLINE", 511,
"TARGET31", "3.1",
"MANIFEST_VERSION", "Manifest-Version",
"PLUGIN_PROPERTIES_FILENAME", "plugin",
"instance", null);
c$.ARCH_LIST = c$.prototype.ARCH_LIST = ["PA_RISC", "ppc", "sparc", "x86", "x86_64", "ia64"];
Clazz.defineStatics (c$,
"FRAGMENT_MANIFEST", "fragment.xml",
"GENERATED_FROM", "Generated-from",
"MANIFEST_TYPE_ATTRIBUTE", "type");
c$.OS_LIST = c$.prototype.OS_LIST = ["aix", "hpux", "linux", "macosx", "qnx", "solaris", "win32"];
Clazz.defineStatics (c$,
"PI_RUNTIME", "org.eclipse.core.runtime",
"PI_BOOT", "org.eclipse.core.boot",
"PI_RUNTIME_COMPATIBILITY", "org.eclipse.core.runtime.compatibility",
"PLUGIN_MANIFEST", "plugin.xml",
"COMPATIBILITY_ACTIVATOR", "org.eclipse.core.internal.compatibility.PluginActivator");
c$.WS_LIST = c$.prototype.WS_LIST = ["carbon", "gtk", "motif", "photon", "win32"];
Clazz.defineStatics (c$,
"IGNORE_DOT", "@ignoredot@");
});
