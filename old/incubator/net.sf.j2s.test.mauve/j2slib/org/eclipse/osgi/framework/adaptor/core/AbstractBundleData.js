Clazz.declarePackage ("org.eclipse.osgi.framework.adaptor.core");
Clazz.load (["org.eclipse.osgi.framework.adaptor.BundleData"], "org.eclipse.osgi.framework.adaptor.core.AbstractBundleData", ["java.io.File", "$.IOException", "java.lang.IllegalStateException", "$.InternalError", "$.Long", "$.StringBuffer", "java.net.URL", "java.util.ArrayList", "$.StringTokenizer", "org.eclipse.osgi.framework.adaptor.core.AdaptorMsg", "$.InvalidVersion", "org.eclipse.osgi.framework.debug.Debug", "org.eclipse.osgi.framework.internal.core.Constants", "org.eclipse.osgi.framework.internal.protocol.bundleentry.Handler", "org.eclipse.osgi.framework.util.Headers", "org.eclipse.osgi.util.ManifestElement", "$.NLS", "org.osgi.framework.BundleException", "$.Version"], function () {
c$ = Clazz.decorateAsClass (function () {
this.adaptor = null;
this.manifest = null;
this.bundle = null;
this.id = 0;
this.bundleStoreDir = null;
this.baseBundleFile = null;
this.location = null;
this.fileName = null;
this.nativePaths = null;
this.generation = 1;
this.startLevel = -1;
this.dirData = null;
this.status = 0;
this.reference = false;
this.lastModified = 0;
this.symbolicName = null;
this.version = null;
this.activator = null;
this.classpath = null;
this.executionEnvironment = null;
this.dynamicImports = null;
this.type = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.adaptor.core, "AbstractBundleData", null, [org.eclipse.osgi.framework.adaptor.BundleData, Cloneable]);
Clazz.makeConstructor (c$, 
function (adaptor, id) {
this.adaptor = adaptor;
this.id = id;
this.initBundleStoreDirs (String.valueOf (id));
}, "org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor,~N");
Clazz.overrideMethod (c$, "getManifest", 
function () {
if (this.manifest == null) {
{
if (this.manifest == null) {
var url = this.getEntry ("META-INF/MANIFEST.MF");
if (url == null) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.MANIFEST_NOT_FOUND_EXCEPTION, "META-INF/MANIFEST.MF", this.getLocation ()));
}try {
this.manifest = org.eclipse.osgi.framework.util.Headers.parseManifest (url.openStream ());
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.MANIFEST_NOT_FOUND_EXCEPTION, "META-INF/MANIFEST.MF", this.getLocation ()), e);
} else {
throw e;
}
}
}}}return this.manifest;
});
Clazz.overrideMethod (c$, "setBundle", 
function (bundle) {
this.bundle = bundle;
}, "org.osgi.framework.Bundle");
Clazz.defineMethod (c$, "getBundle", 
function () {
return this.bundle;
});
Clazz.overrideMethod (c$, "getBundleID", 
function () {
return (this.id);
});
Clazz.overrideMethod (c$, "getEntry", 
function (path) {
var entry = this.getBaseBundleFile ().getEntry (path);
if (entry == null) {
return null;
}if (path.length == 0 || (path.charAt (0)).charCodeAt (0) != ('/').charCodeAt (0)) path = path = '/' + path;
try {
return  new java.net.URL ("bundleentry", Long.toString (this.id), 0, path,  new org.eclipse.osgi.framework.internal.protocol.bundleentry.Handler (entry));
} catch (e) {
if (Clazz.instanceOf (e, java.net.MalformedURLException)) {
return null;
} else {
throw e;
}
}
}, "~S");
Clazz.overrideMethod (c$, "getEntryPaths", 
function (path) {
return this.getBaseBundleFile ().getEntryPaths (path);
}, "~S");
Clazz.overrideMethod (c$, "createClassLoader", 
function (delegate, domain, bundleclasspath) {
return this.getAdaptor ().getElementFactory ().createClassLoader (delegate, domain, bundleclasspath, this);
}, "org.eclipse.osgi.framework.adaptor.ClassLoaderDelegate,org.eclipse.osgi.framework.adaptor.BundleProtectionDomain,~A");
Clazz.defineMethod (c$, "getAdaptor", 
function () {
return this.adaptor;
});
c$.getClassPath = Clazz.defineMethod (c$, "getClassPath", 
function (classpath) {
if (classpath == null) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_LOADER) org.eclipse.osgi.framework.debug.Debug.println ("  no classpath");
return ["."];
}var result =  new java.util.ArrayList (classpath.length);
for (var i = 0; i < classpath.length; i++) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_LOADER) org.eclipse.osgi.framework.debug.Debug.println ("  found classpath entry " + classpath[i].getValueComponents ());
var paths = classpath[i].getValueComponents ();
for (var j = 0; j < paths.length; j++) {
result.add (paths[j]);
}
}
return result.toArray ( new Array (result.size ()));
}, "~A");
Clazz.overrideMethod (c$, "getLocation", 
function () {
return this.location;
});
Clazz.defineMethod (c$, "setLocation", 
function (location) {
this.location = location;
}, "~S");
Clazz.defineMethod (c$, "getFileName", 
function () {
return this.fileName;
});
Clazz.defineMethod (c$, "setFileName", 
function (fileName) {
this.fileName = fileName;
}, "~S");
Clazz.defineMethod (c$, "getNativePaths", 
function () {
return this.nativePaths;
});
Clazz.defineMethod (c$, "getNativePathsString", 
function () {
if (this.nativePaths == null || this.nativePaths.length == 0) return null;
var sb =  new StringBuffer ();
for (var i = 0; i < this.nativePaths.length; i++) {
sb.append (this.nativePaths[i]);
if (i < this.nativePaths.length - 1) sb.append (',');
}
return sb.toString ();
});
Clazz.defineMethod (c$, "setNativePaths", 
function (nativePaths) {
this.nativePaths = nativePaths;
}, "~A");
Clazz.defineMethod (c$, "setNativePaths", 
function (nativePaths) {
if (nativePaths == null) return ;
var result =  new java.util.ArrayList (5);
var st =  new java.util.StringTokenizer (nativePaths, ",");
while (st.hasMoreTokens ()) {
var path = st.nextToken ();
result.add (path);
}
this.setNativePaths (result.toArray ( new Array (result.size ())));
}, "~S");
Clazz.defineMethod (c$, "getGeneration", 
function () {
return this.generation;
});
Clazz.defineMethod (c$, "setGeneration", 
function (generation) {
this.generation = generation;
}, "~N");
Clazz.overrideMethod (c$, "getLastModified", 
function () {
return this.lastModified;
});
Clazz.defineMethod (c$, "setLastModified", 
function (lastModified) {
this.lastModified = lastModified;
}, "~N");
Clazz.overrideMethod (c$, "getStartLevel", 
function () {
return this.startLevel;
});
Clazz.overrideMethod (c$, "setStartLevel", 
function (startLevel) {
this.startLevel = startLevel;
}, "~N");
Clazz.overrideMethod (c$, "getStatus", 
function () {
return this.status;
});
Clazz.overrideMethod (c$, "setStatus", 
function (status) {
this.status = status;
}, "~N");
Clazz.defineMethod (c$, "isReference", 
function () {
return this.reference;
});
Clazz.defineMethod (c$, "setReference", 
function (reference) {
this.reference = reference;
}, "~B");
Clazz.overrideMethod (c$, "getSymbolicName", 
function () {
return this.symbolicName;
});
Clazz.defineMethod (c$, "getBundleStoreDir", 
function () {
return this.bundleStoreDir;
});
Clazz.defineMethod (c$, "setSymbolicName", 
function (symbolicName) {
this.symbolicName = symbolicName;
}, "~S");
Clazz.defineMethod (c$, "loadFromManifest", 
function () {
this.getManifest ();
if (this.manifest == null) throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.ADAPTOR_ERROR_GETTING_MANIFEST, this.getLocation ()));
try {
this.setVersion (org.osgi.framework.Version.parseVersion (this.manifest.get ("Bundle-Version")));
} catch (e) {
if (Clazz.instanceOf (e, IllegalArgumentException)) {
this.setVersion ( new org.eclipse.osgi.framework.adaptor.core.InvalidVersion (this.manifest.get ("Bundle-Version")));
} else {
throw e;
}
}
var bsnHeader = org.eclipse.osgi.util.ManifestElement.parseHeader ("Bundle-SymbolicName", this.manifest.get ("Bundle-SymbolicName"));
var bundleType = 0;
if (bsnHeader != null) {
this.setSymbolicName (bsnHeader[0].getValue ());
var singleton = bsnHeader[0].getDirective ("singleton");
if (singleton == null) singleton = bsnHeader[0].getAttribute ("singleton");
if ("true".equals (singleton)) bundleType |= 8;
}this.setClassPathString (this.manifest.get ("Bundle-ClassPath"));
this.setActivator (this.manifest.get ("Bundle-Activator"));
var host = this.manifest.get ("Fragment-Host");
if (host != null) {
bundleType |= 1;
var hostElement = org.eclipse.osgi.util.ManifestElement.parseHeader ("Fragment-Host", host);
if (org.eclipse.osgi.framework.internal.core.Constants.getInternalSymbolicName ().equals (hostElement[0].getValue ()) || "system.bundle".equals (hostElement[0].getValue ())) {
var extensionType = hostElement[0].getDirective ("extension");
if (extensionType == null || extensionType.equals ("framework")) bundleType |= 2;
 else bundleType |= 4;
}}this.setType (bundleType);
this.setExecutionEnvironment (this.manifest.get ("Bundle-RequiredExecutionEnvironment"));
this.setDynamicImports (this.manifest.get ("DynamicImport-Package"));
});
Clazz.overrideMethod (c$, "getVersion", 
function () {
return this.version;
});
Clazz.defineMethod (c$, "setVersion", 
function (version) {
this.version = version;
}, "org.osgi.framework.Version");
Clazz.overrideMethod (c$, "getActivator", 
function () {
return this.activator;
});
Clazz.defineMethod (c$, "getDataDir", 
function () {
return this.dirData;
});
Clazz.defineMethod (c$, "setBundleStoreDir", 
function (bundleStoreDir) {
this.bundleStoreDir = bundleStoreDir;
}, "java.io.File");
Clazz.defineMethod (c$, "initBundleStoreDirs", 
function (bundleID) {
this.setBundleStoreDir ( new java.io.File ((this.adaptor).getBundleStoreRootDir (), bundleID));
}, "~S");
Clazz.defineMethod (c$, "setActivator", 
function (activator) {
this.activator = activator;
}, "~S");
Clazz.defineMethod (c$, "getClassPath", 
function () {
var classpathElements = org.eclipse.osgi.util.ManifestElement.parseHeader ("Bundle-ClassPath", this.classpath);
return org.eclipse.osgi.framework.adaptor.core.AbstractBundleData.getClassPath (classpathElements);
});
Clazz.defineMethod (c$, "getClassPathString", 
function () {
return this.classpath;
});
Clazz.defineMethod (c$, "setClassPathString", 
function (classpath) {
this.classpath = classpath;
}, "~S");
Clazz.overrideMethod (c$, "getExecutionEnvironment", 
function () {
return this.executionEnvironment;
});
Clazz.defineMethod (c$, "setExecutionEnvironment", 
function (executionEnvironment) {
this.executionEnvironment = executionEnvironment;
}, "~S");
Clazz.overrideMethod (c$, "getDynamicImports", 
function () {
return this.dynamicImports;
});
Clazz.defineMethod (c$, "setDynamicImports", 
function (dynamicImports) {
this.dynamicImports = dynamicImports;
}, "~S");
Clazz.overrideMethod (c$, "getType", 
function () {
return this.type;
});
Clazz.defineMethod (c$, "setType", 
function (type) {
this.type = type;
}, "~N");
Clazz.overrideMethod (c$, "matchDNChain", 
function (pattern) {
if (System.getSecurityManager () == null) return false;
if (Clazz.instanceOf (this.getBaseBundleFile (), org.eclipse.osgi.framework.adaptor.core.SignedBundle)) return (this.getBaseBundleFile ()).matchDNChain (pattern);
return false;
}, "~S");
Clazz.defineMethod (c$, "nextGeneration", 
function (referenceFile) {
var nextGeneration = this.getGeneration ();
while (nextGeneration < 2147483647) {
nextGeneration++;
var nextDirGeneration =  new java.io.File (this.getBundleStoreDir (), String.valueOf (nextGeneration));
if (nextDirGeneration.exists ()) {
continue ;}var next;
try {
next = this.clone ();
} catch (e) {
if (Clazz.instanceOf (e, CloneNotSupportedException)) {
throw  new InternalError ();
} else {
throw e;
}
}
next.setGeneration (nextGeneration);
if (referenceFile != null) {
next.setReference (true);
next.setFileName (referenceFile);
} else {
if (next.isReference ()) {
next.setReference (false);
next.setFileName ("bundlefile");
}}next.manifest = null;
return (next);
}
throw  new java.io.IOException (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.ADAPTOR_STORAGE_EXCEPTION);
}, "~S");
Clazz.defineMethod (c$, "initializeNewBundle", 
function () {
this.createBaseBundleFile ();
this.loadFromManifest ();
});
Clazz.defineMethod (c$, "createBaseBundleFile", 
function () {
this.baseBundleFile = this.getAdaptor ().createBaseBundleFile (this.getBaseFile (), this);
return this.baseBundleFile;
});
Clazz.defineMethod (c$, "getBaseFile", 
function () {
return this.isReference () ?  new java.io.File (this.getFileName ()) :  new java.io.File (this.createGenerationDir (), this.getFileName ());
});
Clazz.defineMethod (c$, "getClasspathFiles", 
function (classpaths) {
var results =  new java.util.ArrayList (classpaths.length);
for (var i = 0; i < classpaths.length; i++) {
if (".".equals (classpaths[i])) results.add (this.getBaseFile ());
 else {
var result = this.getBaseBundleFile ().getFile (classpaths[i]);
if (result != null) results.add (result);
}}
return results.toArray ( new Array (results.size ()));
}, "~A");
Clazz.defineMethod (c$, "setDataDir", 
function (dirData) {
this.dirData = dirData;
}, "java.io.File");
Clazz.overrideMethod (c$, "findLibrary", 
function (libname) {
var mappedName = System.mapLibraryName (libname);
var path = null;
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_LOADER) {
org.eclipse.osgi.framework.debug.Debug.println ("  mapped library name: " + mappedName);
}path = this.findNativePath (mappedName);
if (path == null) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_LOADER) {
org.eclipse.osgi.framework.debug.Debug.println ("  library does not exist: " + mappedName);
}path = this.findNativePath (libname);
}if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_LOADER) {
org.eclipse.osgi.framework.debug.Debug.println ("  returning library: " + path);
}return path;
}, "~S");
Clazz.overrideMethod (c$, "open", 
function () {
this.baseBundleFile.open ();
});
Clazz.defineMethod (c$, "findNativePath", 
function (libname) {
if (!libname.startsWith ("/")) {
libname = '/' + libname;
}var nativepaths = this.getNativePaths ();
if (nativepaths != null) {
for (var i = 0; i < nativepaths.length; i++) {
if (nativepaths[i].endsWith (libname)) {
var nativeFile = this.baseBundleFile.getFile (nativepaths[i]);
if (nativeFile != null) return nativeFile.getAbsolutePath ();
}}
}return null;
}, "~S");
Clazz.defineMethod (c$, "createGenerationDir", 
function () {
var generationDir = this.getGenerationDir ();
if (!generationDir.exists () && (!this.adaptor.canWrite () || !generationDir.mkdirs ())) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Unable to create bundle generation directory: " + generationDir.getPath ());
}}return generationDir;
});
Clazz.defineMethod (c$, "getBaseBundleFile", 
function () {
return this.baseBundleFile;
});
Clazz.overrideMethod (c$, "close", 
function () {
if (this.baseBundleFile != null) {
this.baseBundleFile.close ();
}});
Clazz.overrideMethod (c$, "getDataFile", 
function (path) {
if (this.getDataDir () == null) {
var dataRoot = this.adaptor.getDataRootDir ();
if (dataRoot == null) throw  new IllegalStateException (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.ADAPTOR_DATA_AREA_NOT_SET);
this.setDataDir ( new java.io.File (dataRoot, this.id + "/" + "data"));
}if (!this.getDataDir ().exists () && (!this.adaptor.canWrite () || !this.getDataDir ().mkdirs ())) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Unable to create bundle data directory: " + this.getDataDir ().getPath ());
}}return ( new java.io.File (this.getDataDir (), path));
}, "~S");
Clazz.overrideMethod (c$, "installNativeCode", 
function (nativepaths) {
var sb =  new StringBuffer ();
for (var i = 0; i < nativepaths.length; i++) {
var nativeFile = this.baseBundleFile.getFile (nativepaths[i]);
if (nativeFile == null) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.BUNDLE_NATIVECODE_EXCEPTION, nativepaths[i]));
}sb.append (nativepaths[i]);
if (i < nativepaths.length - 1) {
sb.append (",");
}}
if (sb.length () > 0) this.setNativePaths (sb.toString ());
}, "~A");
Clazz.defineMethod (c$, "getGenerationDir", 
function () {
return  new java.io.File (this.getBundleStoreDir (), String.valueOf (this.getGeneration ()));
});
Clazz.defineMethod (c$, "getParentGenerationDir", 
function () {
return null;
});
});
