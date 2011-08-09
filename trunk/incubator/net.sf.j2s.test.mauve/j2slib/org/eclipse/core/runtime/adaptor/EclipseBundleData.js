Clazz.declarePackage ("org.eclipse.core.runtime.adaptor");
Clazz.load (["org.eclipse.osgi.framework.adaptor.core.AbstractBundleData"], "org.eclipse.core.runtime.adaptor.EclipseBundleData", ["java.io.BufferedReader", "$.File", "$.FileInputStream", "$.FileOutputStream", "$.IOException", "$.InputStreamReader", "java.lang.Byte", "$.IllegalStateException", "$.Long", "$.Runtime", "java.util.ArrayList", "$.StringTokenizer", "org.eclipse.core.runtime.adaptor.EclipseAdaptor", "$.EclipseAdaptorMsg", "$.LocationManager", "org.eclipse.core.runtime.internal.adaptor.CachedManifest", "$.EclipseEnvironmentInfo", "$.PluginConverterImpl", "org.eclipse.osgi.framework.log.FrameworkLogEntry", "org.eclipse.osgi.framework.util.Headers", "org.eclipse.osgi.util.ManifestElement", "$.NLS", "org.osgi.framework.BundleException", "$.Version"], function () {
c$ = Clazz.decorateAsClass (function () {
this.manifestTimeStamp = 0;
this.manifestType = 0;
this.pluginClass = null;
this.autoStart = false;
this.autoStartExceptions = null;
this.buddyList = null;
this.registeredBuddyList = null;
this.$hasPackageInfo = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.adaptor, "EclipseBundleData", org.eclipse.osgi.framework.adaptor.core.AbstractBundleData);
c$.buildLibraryVariants = Clazz.defineMethod (c$, "buildLibraryVariants", 
($fz = function () {
var result =  new java.util.ArrayList ();
var info = org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.getDefault ();
result.add ("ws/" + info.getWS () + "/");
result.add ("os/" + info.getOS () + "/" + info.getOSArch () + "/");
result.add ("os/" + info.getOS () + "/");
var nl = info.getNL ();
nl = nl.$replace ('_', '/');
while (nl.length > 0) {
result.add ("nl/" + nl + "/");
var i = nl.lastIndexOf ('/');
nl = (i < 0) ? "" : nl.substring (0, i);
}
result.add ("");
return result.toArray ( new Array (result.size ()));
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "initializeExistingBundle", 
function () {
this.createBaseBundleFile ();
if (!this.checkManifestTimeStamp ()) {
if (this.getBundleStoreDir ().exists ()) {
var out =  new java.io.FileOutputStream ( new java.io.File (this.getBundleStoreDir (), ".delete"));
out.close ();
}throw  new java.io.IOException ();
}});
Clazz.defineMethod (c$, "checkManifestTimeStamp", 
($fz = function () {
if (!"true".equalsIgnoreCase (System.getProperty ("osgi.checkConfiguration"))) return true;
if (org.eclipse.core.runtime.internal.adaptor.PluginConverterImpl.getTimeStamp (this.getBaseFile (), this.getManifestType ()) == this.getManifestTimeStamp ()) {
if ((this.getManifestType () & (9)) != 0) return true;
var cacheLocation = System.getProperty ("osgi.manifest.cache");
var parentConfiguration = org.eclipse.core.runtime.adaptor.LocationManager.getConfigurationLocation ().getParentLocation ();
if (parentConfiguration != null) {
try {
return this.checkManifestAndParent (cacheLocation, this.getSymbolicName (), this.getVersion ().toString (), this.getManifestType ()) != null;
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.BundleException)) {
return false;
} else {
throw e;
}
}
}var cacheFile =  new java.io.File (cacheLocation, this.getSymbolicName () + '_' + this.getVersion () + ".MF");
if (cacheFile.isFile ()) return true;
}return false;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "findLibrary", 
function (libName) {
var result = Clazz.superCall (this, org.eclipse.core.runtime.adaptor.EclipseBundleData, "findLibrary", [libName]);
if (result != null) return result;
if (org.eclipse.core.runtime.adaptor.EclipseBundleData.libraryVariants == null) ($t$ = org.eclipse.core.runtime.adaptor.EclipseBundleData.libraryVariants = org.eclipse.core.runtime.adaptor.EclipseBundleData.buildLibraryVariants (), org.eclipse.core.runtime.adaptor.EclipseBundleData.prototype.libraryVariants = org.eclipse.core.runtime.adaptor.EclipseBundleData.libraryVariants, $t$);
if (libName.length == 0) return null;
if ((libName.charAt (0)).charCodeAt (0) == ('/').charCodeAt (0) || (libName.charAt (0)).charCodeAt (0) == ('\\').charCodeAt (0)) libName = libName.substring (1);
libName = System.mapLibraryName (libName);
return this.searchVariants (org.eclipse.core.runtime.adaptor.EclipseBundleData.libraryVariants, libName);
}, "~S");
Clazz.defineMethod (c$, "searchVariants", 
($fz = function (variants, path) {
for (var i = 0; i < variants.length; i++) {
var libEntry = this.baseBundleFile.getEntry (variants[i] + path);
if (libEntry == null) {
} else {
var libFile = this.baseBundleFile.getFile (variants[i] + path);
if (libFile == null) return null;
if ("hpux".equals (org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.getDefault ().getOS ())) {
try {
Runtime.getRuntime ().exec (["chmod", "755", libFile.getAbsolutePath ()]).waitFor ();
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
}
}return libFile.getAbsolutePath ();
}}
return null;
}, $fz.isPrivate = true, $fz), "~A,~S");
Clazz.defineMethod (c$, "getManifest", 
function () {
return this.getManifest (false);
});
Clazz.defineMethod (c$, "getManifest", 
function (first) {
if (this.manifest == null) this.manifest = first ? this.loadManifest () :  new org.eclipse.core.runtime.internal.adaptor.CachedManifest (this);
return this.manifest;
}, "~B");
Clazz.defineMethod (c$, "isComplete", 
($fz = function (manifest) {
if (manifest.get ("Bundle-SymbolicName") != null) return true;
return this.getEntry ("plugin.xml") == null && this.getEntry ("fragment.xml") == null;
}, $fz.isPrivate = true, $fz), "java.util.Dictionary");
Clazz.defineMethod (c$, "loadManifest", 
function () {
var url = this.getEntry ("META-INF/MANIFEST.MF");
if (url != null) {
var builtIn = this.loadManifestFrom (url);
if (!this.isComplete (builtIn)) {
var generatedManifest = this.generateManifest (builtIn);
if (generatedManifest != null) return generatedManifest;
}this.manifestType = 1;
if (this.getBaseFile ().isFile ()) {
this.manifestTimeStamp = this.getBaseFile ().lastModified ();
this.manifestType |= 8;
} else this.manifestTimeStamp = this.getBaseBundleFile ().getEntry ("META-INF/MANIFEST.MF").getTime ();
return builtIn;
}var result = this.generateManifest (null);
if (result == null) throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_DATA_MANIFEST_NOT_FOUND, this.getLocation ()));
return result;
});
Clazz.defineMethod (c$, "basicCheckManifest", 
($fz = function (cacheLocation, symbolicName, version, inputType) {
var currentFile =  new java.io.File (cacheLocation, symbolicName + '_' + version + ".MF");
if (org.eclipse.core.runtime.internal.adaptor.PluginConverterImpl.upToDate (currentFile, this.getBaseFile (), inputType)) {
try {
return org.eclipse.osgi.framework.util.Headers.parseManifest ( new java.io.FileInputStream (currentFile));
} catch (e) {
if (Clazz.instanceOf (e, java.io.FileNotFoundException)) {
} else {
throw e;
}
}
}return null;
}, $fz.isPrivate = true, $fz), "~S,~S,~S,~N");
Clazz.defineMethod (c$, "checkManifestAndParent", 
($fz = function (cacheLocation, symbolicName, version, inputType) {
var result = this.basicCheckManifest (cacheLocation, symbolicName, version, inputType);
if (result != null) return result;
var parentConfiguration = null;
if ((parentConfiguration = org.eclipse.core.runtime.adaptor.LocationManager.getConfigurationLocation ().getParentLocation ()) != null) {
result = this.basicCheckManifest ( new java.io.File (parentConfiguration.getURL ().getFile (), "org.eclipse.osgi/manifests").toString (), symbolicName, version, inputType);
}return result;
}, $fz.isPrivate = true, $fz), "~S,~S,~S,~N");
Clazz.defineMethod (c$, "generateManifest", 
($fz = function (originalManifest) {
var cacheLocation = System.getProperty ("osgi.manifest.cache");
if (this.getSymbolicName () != null) {
var existingHeaders = this.checkManifestAndParent (cacheLocation, this.getSymbolicName (), this.getVersion ().toString (), this.manifestType);
if (existingHeaders != null) return existingHeaders;
}var converter = org.eclipse.core.runtime.internal.adaptor.PluginConverterImpl.getDefault ();
var generatedManifest;
try {
generatedManifest = converter.convertManifest (this.getBaseFile (), true, null, true, null);
} catch (pce) {
if (Clazz.instanceOf (pce, org.eclipse.osgi.service.pluginconversion.PluginConversionException)) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_CONVERTER_ERROR_CONVERTING, this.getBaseFile ());
throw  new org.osgi.framework.BundleException (message, pce);
} else {
throw pce;
}
}
var version = org.osgi.framework.Version.parseVersion (generatedManifest.get ("Bundle-Version"));
var symbolicName = org.eclipse.osgi.util.ManifestElement.parseHeader ("Bundle-SymbolicName", generatedManifest.get ("Bundle-SymbolicName"))[0].getValue ();
var generatedFrom = org.eclipse.osgi.util.ManifestElement.parseHeader ("Generated-from", generatedManifest.get ("Generated-from"))[0];
var existingHeaders = this.checkManifestAndParent (cacheLocation, symbolicName, version.toString (), Byte.parseByte (generatedFrom.getAttribute ("type")));
this.setManifestTimeStamp (Long.parseLong (generatedFrom.getValue ()));
this.setManifestType (Byte.parseByte (generatedFrom.getAttribute ("type")));
if (!this.adaptor.canWrite () || existingHeaders != null) return existingHeaders;
if (originalManifest != null) {
var keysEnum = originalManifest.keys ();
while (keysEnum.hasMoreElements ()) {
var key = keysEnum.nextElement ();
generatedManifest.put (key, originalManifest.get (key));
}
}var bundleManifestLocation =  new java.io.File (cacheLocation, symbolicName + '_' + version.toString () + ".MF");
try {
converter.writeManifest (bundleManifestLocation, generatedManifest, true);
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
} else {
throw e;
}
}
return generatedManifest;
}, $fz.isPrivate = true, $fz), "java.util.Dictionary");
Clazz.defineMethod (c$, "loadManifestFrom", 
($fz = function (manifestURL) {
try {
return org.eclipse.osgi.framework.util.Headers.parseManifest (manifestURL.openStream ());
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_DATA_ERROR_READING_MANIFEST, this.getLocation ()), e);
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz), "java.net.URL");
Clazz.defineMethod (c$, "loadFromManifest", 
function () {
this.getManifest (true);
Clazz.superCall (this, org.eclipse.core.runtime.adaptor.EclipseBundleData, "loadFromManifest", []);
if (Clazz.instanceOf (this.manifest, org.eclipse.core.runtime.internal.adaptor.CachedManifest)) throw  new IllegalStateException ();
this.pluginClass = this.manifest.get ("Plugin-Class");
this.parseAutoStart (this.manifest.get ("Eclipse-AutoStart"));
this.buddyList = this.manifest.get ("Eclipse-BuddyPolicy");
this.registeredBuddyList = this.manifest.get ("Eclipse-RegisterBuddy");
this.$hasPackageInfo = this.hasPackageInfo (this.getEntry ("META-INF/MANIFEST.MF"));
});
Clazz.defineMethod (c$, "hasPackageInfo", 
($fz = function (url) {
if (url == null) return false;
var br = null;
try {
br =  new java.io.BufferedReader ( new java.io.InputStreamReader (url.openStream ()));
var line;
while ((line = br.readLine ()) != null) {
if (line.startsWith ("Specification-Title: ") || line.startsWith ("Specification-Version: ") || line.startsWith ("Specification-Vendor: ") || line.startsWith ("Implementation-Title: ") || line.startsWith ("Implementation-Version: ") || line.startsWith ("Implementation-Vendor: ")) return true;
}
} catch (ioe) {
if (Clazz.instanceOf (ioe, java.io.IOException)) {
} else {
throw ioe;
}
} finally {
if (br != null) try {
br.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}
return false;
}, $fz.isPrivate = true, $fz), "java.net.URL");
Clazz.defineMethod (c$, "getPluginClass", 
function () {
return this.pluginClass;
});
Clazz.defineMethod (c$, "getBuddyList", 
function () {
return this.buddyList;
});
Clazz.defineMethod (c$, "getRegisteredBuddyList", 
function () {
return this.registeredBuddyList;
});
Clazz.defineMethod (c$, "setPluginClass", 
function (value) {
this.pluginClass = value;
}, "~S");
Clazz.defineMethod (c$, "getManifestTimeStamp", 
function () {
return this.manifestTimeStamp;
});
Clazz.defineMethod (c$, "setManifestTimeStamp", 
function (stamp) {
this.manifestTimeStamp = stamp;
}, "~N");
Clazz.defineMethod (c$, "getManifestType", 
function () {
return this.manifestType;
});
Clazz.defineMethod (c$, "setManifestType", 
function (manifestType) {
this.manifestType = manifestType;
}, "~N");
Clazz.defineMethod (c$, "setAutoStart", 
function (value) {
this.autoStart = value;
}, "~B");
Clazz.defineMethod (c$, "isAutoStart", 
function () {
return this.autoStart;
});
Clazz.defineMethod (c$, "getPersistentStatus", 
function () {
return this.isAutoStartable () ? (-2) & this.getStatus () : this.getStatus ();
});
Clazz.defineMethod (c$, "setAutoStartExceptions", 
function (autoStartExceptions) {
this.autoStartExceptions = autoStartExceptions;
}, "~A");
Clazz.defineMethod (c$, "getAutoStartExceptions", 
function () {
return this.autoStartExceptions;
});
Clazz.defineMethod (c$, "parseAutoStart", 
($fz = function (headerValue) {
this.autoStart = false;
this.autoStartExceptions = null;
var allElements = null;
try {
allElements = org.eclipse.osgi.util.ManifestElement.parseHeader ("Eclipse-AutoStart", headerValue);
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.BundleException)) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_CLASSLOADER_CANNOT_GET_HEADERS, this.getLocation ());
org.eclipse.core.runtime.adaptor.EclipseAdaptor.getDefault ().getFrameworkLog ().log ( new org.eclipse.osgi.framework.log.FrameworkLogEntry ("org.eclipse.osgi", message, 0, e, null));
} else {
throw e;
}
}
if (allElements == null) return ;
this.autoStart = "true".equalsIgnoreCase (allElements[0].getValue ());
var exceptionsValue = allElements[0].getAttribute ("exceptions");
if (exceptionsValue == null) return ;
var tokenizer =  new java.util.StringTokenizer (exceptionsValue, ",");
var numberOfTokens = tokenizer.countTokens ();
this.autoStartExceptions =  new Array (numberOfTokens);
for (var i = 0; i < numberOfTokens; i++) this.autoStartExceptions[i] = tokenizer.nextToken ().trim ();

}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "isAutoStartable", 
function () {
return this.autoStart || (this.autoStartExceptions != null && this.autoStartExceptions.length > 0);
});
Clazz.overrideMethod (c$, "save", 
function () {
if (this.adaptor.canWrite ()) (this.adaptor).saveMetaDataFor (this);
});
Clazz.overrideMethod (c$, "toString", 
function () {
return "BundleData for " + this.getSymbolicName () + " (" + this.id + ")";
});
Clazz.overrideMethod (c$, "getParentGenerationDir", 
function () {
var parentConfiguration = null;
var currentConfiguration = org.eclipse.core.runtime.adaptor.LocationManager.getConfigurationLocation ();
if (currentConfiguration != null && (parentConfiguration = currentConfiguration.getParentLocation ()) != null) return  new java.io.File (parentConfiguration.getURL ().getFile (), "org.eclipse.osgi" + '/' + "bundles" + '/' + this.getBundleID () + '/' + this.getGeneration ());
return null;
});
Clazz.defineStatics (c$,
"MANIFEST_TYPE_UNKNOWN", 0x00,
"MANIFEST_TYPE_BUNDLE", 0x01,
"MANIFEST_TYPE_PLUGIN", 0x02,
"MANIFEST_TYPE_FRAGMENT", 0x04,
"MANIFEST_TYPE_JAR", 0x08,
"libraryVariants", null,
"PROTOCOL", "platform",
"FILE", "file",
"PROP_CHECK_CONFIG", "osgi.checkConfiguration");
});
