Clazz.declarePackage ("org.eclipse.osgi.framework.adaptor.core");
Clazz.load (["java.lang.ClassLoader", "org.eclipse.osgi.framework.adaptor.FrameworkAdaptor"], "org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor", ["java.io.BufferedInputStream", "$.File", "$.FileInputStream", "$.FileOutputStream", "$.IOException", "java.lang.IllegalStateException", "$.UnsupportedOperationException", "java.net.URL", "java.util.Hashtable", "$.Properties", "$.StringTokenizer", "org.eclipse.osgi.framework.adaptor.BundleOperation", "org.eclipse.osgi.framework.adaptor.core.AdaptorMsg", "$.BundleFile", "$.StateManager", "org.eclipse.osgi.framework.debug.Debug", "org.eclipse.osgi.framework.internal.core.BundleResourceHandler", "$.DefaultPermissionStorage", "$.ServiceRegistryImpl", "$.SystemBundleData", "org.eclipse.osgi.framework.util.Headers", "org.eclipse.osgi.util.ManifestElement", "$.NLS", "org.osgi.framework.BundleException", "$.FrameworkEvent"], function () {
c$ = Clazz.decorateAsClass (function () {
this.ADAPTOR_MANIFEST = "ADAPTOR.MF";
this.DEFAULT_SIGNEDBUNDLE_SUPPORT = "org.eclipse.osgi.framework.pkcs7verify.SignedBundleSupportImpl";
this.eventPublisher = null;
this.serviceRegistry = null;
this.properties = null;
this.context = null;
this.initialBundleStartLevel = 1;
this.manifest = null;
this.stopping = false;
this.nextId = 1;
this.stateManager = null;
this.bundleStoreRootDir = null;
this.elementFactory = null;
this.addURLMethod = null;
this.configuredExtensions = null;
this.supportSignedBundles = true;
this.signedBundleSupport = null;
this.frameworkLog = null;
this.bundleStore = null;
this.permissionStore = null;
this.reset = false;
this.dataRootDir = null;
this.invalidState = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.adaptor.core, "AbstractFrameworkAdaptor", null, org.eclipse.osgi.framework.adaptor.FrameworkAdaptor);
Clazz.pu$h ();
c$ = Clazz.declareType (org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor, "ParentClassLoader", ClassLoader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor.ParentClassLoader, [null]);
});
c$ = Clazz.p0p ();
Clazz.makeConstructor (c$, 
function (args) {
var fwloader = org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor.getClassLoader ();
if (fwloader != null) this.addURLMethod = org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor.findaddURLMethod (fwloader.getClass ());
if (args != null) {
for (var i = 0; i < args.length; i++) {
var arg = args[i];
if (arg.equalsIgnoreCase ("reset")) {
this.reset = true;
} else if (arg.indexOf ("=") != -1) {
var tok =  new java.util.StringTokenizer (args[i], "=");
if (tok.countTokens () == 2) {
var key = tok.nextToken ();
if (key.equalsIgnoreCase ("bundledir")) {
this.bundleStore = tok.nextToken ();
}}}}
}}, "~A");
Clazz.overrideMethod (c$, "initialize", 
function (eventPublisher) {
this.eventPublisher = eventPublisher;
this.serviceRegistry =  new org.eclipse.osgi.framework.internal.core.ServiceRegistryImpl ();
(this.serviceRegistry).initialize ();
this.loadProperties ();
this.readAdaptorManifest ();
this.initBundleStoreRootDir ();
this.frameworkLog = this.createFrameworkLog ();
}, "org.eclipse.osgi.framework.adaptor.EventPublisher");
Clazz.overrideMethod (c$, "getProperties", 
function () {
return this.properties;
});
Clazz.overrideMethod (c$, "getFrameworkLog", 
function () {
if (this.frameworkLog == null) this.frameworkLog = this.createFrameworkLog ();
return this.frameworkLog;
});
Clazz.overrideMethod (c$, "getState", 
function () {
return this.stateManager.getSystemState ();
});
Clazz.overrideMethod (c$, "getPlatformAdmin", 
function () {
return this.stateManager;
});
Clazz.overrideMethod (c$, "mapLocationToURLConnection", 
function (location) {
try {
return ( new java.net.URL (location).openConnection ());
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.ADAPTOR_URL_CREATE_EXCEPTION, location), e);
} else {
throw e;
}
}
}, "~S");
Clazz.overrideMethod (c$, "getTotalFreeSpace", 
function () {
return -1;
});
Clazz.overrideMethod (c$, "getServiceRegistry", 
function () {
return this.serviceRegistry;
});
Clazz.overrideMethod (c$, "frameworkStart", 
function (context) {
this.stopping = false;
this.context = context;
org.eclipse.osgi.framework.internal.core.BundleResourceHandler.setContext (context);
if (this.frameworkLog == null) this.frameworkLog = this.createFrameworkLog ();
if (this.stateManager == null) this.stateManager = this.createStateManager ();
var state = this.stateManager.getSystemState ();
this.checkSystemState (state);
var systemBundle = state.getBundle (0);
if (systemBundle == null || !systemBundle.isResolved ()) throw  new IllegalStateException ();
}, "org.osgi.framework.BundleContext");
Clazz.overrideMethod (c$, "frameworkStop", 
function (context) {
this.shutdownStateManager ();
this.context = null;
org.eclipse.osgi.framework.internal.core.BundleResourceHandler.setContext (null);
this.frameworkLog.close ();
this.frameworkLog = null;
}, "org.osgi.framework.BundleContext");
Clazz.overrideMethod (c$, "frameworkStopping", 
function (context) {
this.stopping = true;
}, "org.osgi.framework.BundleContext");
Clazz.overrideMethod (c$, "getExportPackages", 
function () {
if (this.manifest == null) return null;
return this.manifest.get ("Export-Package");
});
Clazz.overrideMethod (c$, "getExportServices", 
function () {
if (this.manifest == null) return null;
return this.manifest.get ("Export-Service");
});
Clazz.overrideMethod (c$, "getProvidePackages", 
function () {
if (this.manifest == null) return null;
return this.manifest.get ("Provide-Package");
});
Clazz.defineMethod (c$, "getEventPublisher", 
function () {
return this.eventPublisher;
});
Clazz.defineMethod (c$, "isStopping", 
function () {
return this.stopping;
});
Clazz.overrideMethod (c$, "getInitialBundleStartLevel", 
function () {
return this.initialBundleStartLevel;
});
Clazz.overrideMethod (c$, "setInitialBundleStartLevel", 
function (value) {
this.initialBundleStartLevel = value;
}, "~N");
Clazz.overrideMethod (c$, "getBundleWatcher", 
function () {
return null;
});
Clazz.defineMethod (c$, "loadProperties", 
function () {
this.properties =  new java.util.Properties ();
var resource = System.getProperty ("osgi.framework.properties", "osgi.properties");
try {
var $in = null;
var file =  new java.io.File (resource);
if (file.exists ()) {
$in =  new java.io.FileInputStream (file);
}if ($in == null) {
$in = this.getClass ().getResourceAsStream (resource);
}if ($in != null) {
try {
this.properties.load ( new java.io.BufferedInputStream ($in));
} finally {
try {
$in.close ();
} catch (ee) {
if (Clazz.instanceOf (ee, java.io.IOException)) {
} else {
throw ee;
}
}
}
} else {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) org.eclipse.osgi.framework.debug.Debug.println ("Skipping osgi.properties: " + resource);
}} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Unable to load osgi.properties: " + e.getMessage ());
}} else {
throw e;
}
}
if (this.addURLMethod != null) this.properties.put ("org.osgi.supports.framework.extension", "true");
});
Clazz.defineMethod (c$, "getNextBundleId", 
function () {
while (this.nextId < 9223372036854775807) {
var id = this.nextId;
this.nextId++;
var bundleDir =  new java.io.File (this.getBundleStoreRootDir (), String.valueOf (id));
if (bundleDir.exists ()) {
continue ;}this.persistNextBundleID (id);
return (id);
}
throw  new java.io.IOException (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.ADAPTOR_STORAGE_EXCEPTION);
});
Clazz.defineMethod (c$, "initDataRootDir", 
function () {
this.dataRootDir = this.getBundleStoreRootDir ();
});
Clazz.defineMethod (c$, "readAdaptorManifest", 
function () {
var $in = null;
var adaptorClazz = this.getClass ();
while ($in == null && org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor.isAssignableFrom (adaptorClazz)) {
$in = adaptorClazz.getResourceAsStream ("ADAPTOR.MF");
adaptorClazz = adaptorClazz.getSuperclass ();
}
if ($in == null) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Unable to find adaptor bundle manifest ADAPTOR.MF");
}this.manifest =  new org.eclipse.osgi.framework.util.Headers ( new java.util.Properties ());
return ;
}try {
this.manifest = org.eclipse.osgi.framework.util.Headers.parseManifest ($in);
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.BundleException)) {
org.eclipse.osgi.framework.debug.Debug.println ("Unable to read adaptor bundle manifest ADAPTOR.MF");
} else {
throw e;
}
}
});
Clazz.overrideMethod (c$, "createSystemBundleData", 
function () {
return  new org.eclipse.osgi.framework.internal.core.SystemBundleData (this);
});
c$.copyDir = Clazz.defineMethod (c$, "copyDir", 
function (inDir, outDir) {
var files = inDir.list ();
if (files != null && files.length > 0) {
outDir.mkdir ();
for (var i = 0; i < files.length; i++) {
var inFile =  new java.io.File (inDir, files[i]);
var outFile =  new java.io.File (outDir, files[i]);
if (inFile.isDirectory ()) {
org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor.copyDir (inFile, outFile);
} else {
var $in =  new java.io.FileInputStream (inFile);
org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor.readFile ($in, outFile);
}}
}}, "java.io.File,java.io.File");
c$.readFile = Clazz.defineMethod (c$, "readFile", 
function ($in, file) {
var fos = null;
try {
fos =  new java.io.FileOutputStream (file);
var buffer =  Clazz.newArray (1024, 0);
var count;
while ((count = $in.read (buffer, 0, buffer.length)) > 0) {
fos.write (buffer, 0, count);
}
fos.close ();
fos = null;
$in.close ();
$in = null;
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
if (fos != null) {
try {
fos.close ();
} catch (ee) {
if (Clazz.instanceOf (ee, java.io.IOException)) {
} else {
throw ee;
}
}
}if ($in != null) {
try {
$in.close ();
} catch (ee) {
if (Clazz.instanceOf (ee, java.io.IOException)) {
} else {
throw ee;
}
}
}if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Unable to read file");
org.eclipse.osgi.framework.debug.Debug.printStackTrace (e);
}throw e;
} else {
throw e;
}
}
}, "java.io.InputStream,java.io.File");
c$.findaddURLMethod = Clazz.defineMethod (c$, "findaddURLMethod", 
($fz = function (clazz) {
if (clazz == null) return null;
try {
var result = clazz.getDeclaredMethod ("addURL", [java.net.URL]);
result.setAccessible (true);
return result;
} catch (e$$) {
if (Clazz.instanceOf (e$$, NoSuchMethodException)) {
var e = e$$;
{
}
} else if (Clazz.instanceOf (e$$, SecurityException)) {
var e = e$$;
{
}
} else {
throw e$$;
}
}
return org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor.findaddURLMethod (clazz.getSuperclass ());
}, $fz.isPrivate = true, $fz), "Class");
Clazz.overrideMethod (c$, "getBundleClassLoaderParent", 
function () {
return org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor.bundleClassLoaderParent;
});
Clazz.defineMethod (c$, "processExtension", 
function (bundleData, type) {
if ((bundleData.getType () & 2) != 0) {
this.validateExtension (bundleData);
this.processFrameworkExtension (bundleData, type);
} else if ((bundleData.getType () & 4) != 0) {
this.validateExtension (bundleData);
this.processBootExtension (bundleData, type);
}}, "org.eclipse.osgi.framework.adaptor.BundleData,~N");
Clazz.defineMethod (c$, "validateExtension", 
function (bundleData) {
var extensionManifest = bundleData.getManifest ();
if (extensionManifest.get ("Import-Package") != null) throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.ADAPTOR_EXTENSION_IMPORT_ERROR, bundleData.getLocation ()));
if (extensionManifest.get ("Require-Bundle") != null) throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.ADAPTOR_EXTENSION_REQUIRE_ERROR, bundleData.getLocation ()));
if (extensionManifest.get ("Bundle-NativeCode") != null) throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.ADAPTOR_EXTENSION_NATIVECODE_ERROR, bundleData.getLocation ()));
}, "org.eclipse.osgi.framework.adaptor.BundleData");
Clazz.defineMethod (c$, "processFrameworkExtension", 
function (bundleData, type) {
if (this.addURLMethod == null) throw  new org.osgi.framework.BundleException ("Framework extensions are not supported.",  new UnsupportedOperationException ());
if ((type & (12)) != 0) return ;
var extensions = this.getConfiguredExtensions ();
for (var i = 0; i < extensions.length; i++) if (extensions[i].equals (bundleData.getSymbolicName ())) return ;

var files = this.getExtensionFiles (bundleData);
if (files == null) return ;
for (var i = 0; i < files.length; i++) {
if (files[i] == null) continue ;var exceptionLog = null;
try {
this.addURLMethod.invoke (this.getClass ().getClassLoader (), [files[i].toURL ()]);
} catch (e$$) {
if (Clazz.instanceOf (e$$, java.lang.reflect.InvocationTargetException)) {
var e = e$$;
{
exceptionLog = e.getTargetException ();
}
} else if (Clazz.instanceOf (e$$, Throwable)) {
var t = e$$;
{
exceptionLog = t;
}
} else {
throw e$$;
}
} finally {
if (exceptionLog != null) this.eventPublisher.publishFrameworkEvent (2, (bundleData).getBundle (), exceptionLog);
}
}
}, "org.eclipse.osgi.framework.adaptor.BundleData,~N");
Clazz.defineMethod (c$, "getConfiguredExtensions", 
function () {
if (this.configuredExtensions != null) return this.configuredExtensions;
var prop = System.getProperty ("osgi.framework.extensions");
if (prop == null || prop.trim ().length == 0) this.configuredExtensions =  new Array (0);
 else this.configuredExtensions = org.eclipse.osgi.util.ManifestElement.getArrayFromList (prop);
return this.configuredExtensions;
});
Clazz.defineMethod (c$, "processBootExtension", 
function (bundleData, type) {
throw  new org.osgi.framework.BundleException ("Boot classpath extensions are not supported.",  new UnsupportedOperationException ());
}, "org.eclipse.osgi.framework.adaptor.BundleData,~N");
Clazz.defineMethod (c$, "getExtensionFiles", 
function (bundleData) {
var files = null;
try {
var paths = bundleData.getClassPath ();
if (System.getProperty ("osgi.dev") != null) {
var origPaths = paths;
paths =  new Array (origPaths.length + 1);
System.arraycopy (origPaths, 0, paths, 0, origPaths.length);
paths[paths.length - 1] = "bin";
}files = (bundleData).getClasspathFiles (paths);
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.BundleException)) {
this.eventPublisher.publishFrameworkEvent (2, (bundleData).getBundle (), e);
} else {
throw e;
}
}
return files;
}, "org.eclipse.osgi.framework.adaptor.BundleData");
Clazz.overrideMethod (c$, "handleRuntimeError", 
function (error) {
}, "Throwable");
Clazz.defineMethod (c$, "getDataRootDir", 
function () {
if (this.dataRootDir == null) this.initDataRootDir ();
return this.dataRootDir;
});
Clazz.defineMethod (c$, "createBundleFile", 
function (basefile, bundledata) {
if (basefile.isDirectory ()) return  new org.eclipse.osgi.framework.adaptor.core.BundleFile.DirBundleFile (basefile);
return  new org.eclipse.osgi.framework.adaptor.core.BundleFile.ZipBundleFile (basefile, bundledata);
}, "java.io.File,org.eclipse.osgi.framework.adaptor.BundleData");
Clazz.defineMethod (c$, "createBaseBundleFile", 
function (basefile, bundledata) {
var base = this.createBundleFile (basefile, bundledata);
if (System.getSecurityManager () == null || !this.supportSignedBundles) return base;
var support = this.getSignedBundleSupport ();
if (support == null) return base;
var signedBundle = support.createSignedBundle ();
signedBundle.setBundleFile (base);
return signedBundle;
}, "java.io.File,org.eclipse.osgi.framework.adaptor.BundleData");
Clazz.overrideMethod (c$, "matchDNChain", 
function (pattern, dnChain) {
var support = this.getSignedBundleSupport ();
if (support != null) return support.matchDNChain (pattern, dnChain);
return false;
}, "~S,~A");
Clazz.defineMethod (c$, "getSignedBundleSupport", 
function () {
if (System.getSecurityManager () == null || !this.supportSignedBundles) return null;
try {
if (this.signedBundleSupport == null) {
var clazzName = System.getProperty ("osgi.bundlesigning.support", "org.eclipse.osgi.framework.pkcs7verify.SignedBundleSupportImpl");
var clazz = Class.forName (clazzName);
this.signedBundleSupport = clazz.newInstance ();
}return this.signedBundleSupport;
} catch (e$$) {
if (Clazz.instanceOf (e$$, ClassNotFoundException)) {
var e = e$$;
{
this.supportSignedBundles = false;
}
} else if (Clazz.instanceOf (e$$, IllegalAccessException)) {
var e = e$$;
{
this.supportSignedBundles = false;
}
} else if (Clazz.instanceOf (e$$, InstantiationException)) {
var e = e$$;
{
this.supportSignedBundles = false;
}
} else {
throw e$$;
}
}
return null;
});
Clazz.overrideMethod (c$, "installBundle", 
function (location, source) {
return ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor$1")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.data = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.adaptor.core, "AbstractFrameworkAdaptor$1", null, org.eclipse.osgi.framework.adaptor.BundleOperation);
Clazz.overrideMethod (c$, "begin", 
function () {
var id;
try {
var $in = this.f$.source.getInputStream ();
var sourceURL = this.f$.source.getURL ();
var protocol = sourceURL == null ? null : sourceURL.getProtocol ();
try {
try {
id = this.b$["org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor"].getNextBundleId ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.ADAPTOR_STORAGE_EXCEPTION, e);
} else {
throw e;
}
}
this.data = this.b$["org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor"].getElementFactory ().createBundleData (this.b$["org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor"], id);
this.data.setLastModified (System.currentTimeMillis ());
this.data.setLocation (this.f$.location);
this.data.setStartLevel (this.b$["org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor"].getInitialBundleStartLevel ());
if (Clazz.instanceOf ($in, org.eclipse.osgi.framework.internal.core.ReferenceInputStream)) {
var reference = ($in).getReference ();
if (!"file".equals (reference.getProtocol ())) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.ADAPTOR_URL_CREATE_EXCEPTION, reference));
}this.data.setReference (true);
this.data.setFileName (reference.getPath ());
this.data.initializeNewBundle ();
} else {
var genDir = this.data.createGenerationDir ();
if (!genDir.exists ()) {
throw  new java.io.IOException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.ADAPTOR_DIRECTORY_CREATE_EXCEPTION, genDir.getPath ()));
}var fileName = "bundlefile";
var outFile =  new java.io.File (genDir, fileName);
if ("file".equals (protocol)) {
var inFile =  new java.io.File (this.f$.source.getURL ().getPath ());
if (inFile.isDirectory ()) {
org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor.copyDir (inFile, outFile);
} else {
org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor.readFile ($in, outFile);
}} else {
org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor.readFile ($in, outFile);
}this.data.setReference (false);
this.data.setFileName (fileName);
this.data.initializeNewBundle ();
}} finally {
try {
$in.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}
} catch (ioe) {
if (Clazz.instanceOf (ioe, java.io.IOException)) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.BUNDLE_READ_EXCEPTION, ioe);
} else {
throw ioe;
}
}
return (this.data);
});
Clazz.overrideMethod (c$, "undo", 
function () {
if (this.data != null) {
try {
this.data.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Unable to close " + this.data + ": " + e.getMessage ());
}} else {
throw e;
}
}
}if (this.data != null) {
var bundleDir = this.data.getBundleStoreDir ();
if (!this.b$["org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor"].rm (bundleDir)) {
var $delete =  new java.io.File (bundleDir, ".delete");
if (!$delete.exists ()) {
try {
var out =  new java.io.FileOutputStream ($delete);
out.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Unable to write " + $delete.getPath () + ": " + e.getMessage ());
}} else {
throw e;
}
}
}}}});
Clazz.overrideMethod (c$, "commit", 
function (postpone) {
this.b$["org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor"].processExtension (this.data, 2);
try {
this.data.save ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.ADAPTOR_STORAGE_EXCEPTION, e);
} else {
throw e;
}
}
this.b$["org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor"].updateState (this.data, 1);
}, "~B");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor$1, i$, v$);
}) (this, Clazz.cloneFinals ("source", source, "location", location)));
}, "~S,java.net.URLConnection");
Clazz.defineMethod (c$, "rm", 
function (file) {
if (file.exists ()) {
if (file.isDirectory ()) {
var list = file.list ();
if (list != null) {
var len = list.length;
for (var i = 0; i < len; i++) {
this.rm ( new java.io.File (file, list[i]));
}
}}if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
if (file.isDirectory ()) {
org.eclipse.osgi.framework.debug.Debug.println ("rmdir " + file.getPath ());
} else {
org.eclipse.osgi.framework.debug.Debug.println ("rm " + file.getPath ());
}}var success = file.$delete ();
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
if (!success) {
org.eclipse.osgi.framework.debug.Debug.println ("  rm failed!!");
}}return (success);
}return (true);
}, "java.io.File");
Clazz.defineMethod (c$, "shutdownStateManager", 
function () {
try {
if (this.canWrite () && (this.getBundleStoreRootDir ().exists () || this.getBundleStoreRootDir ().mkdirs ())) this.stateManager.shutdown ( new java.io.File (this.getBundleStoreRootDir (), ".state"),  new java.io.File (this.getBundleStoreRootDir (), ".lazy"));
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
this.frameworkLog.log ( new org.osgi.framework.FrameworkEvent (2, this.context.getBundle (), e));
} else {
throw e;
}
} finally {
this.stateManager = null;
}
});
Clazz.defineMethod (c$, "getBundleStoreRootDir", 
function () {
return this.bundleStoreRootDir;
});
Clazz.overrideMethod (c$, "updateBundle", 
function (bundledata, source) {
return ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor$2")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.data = null;
this.newData = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.adaptor.core, "AbstractFrameworkAdaptor$2", null, org.eclipse.osgi.framework.adaptor.BundleOperation);
Clazz.overrideMethod (c$, "begin", 
function () {
this.data = this.f$.bundledata;
try {
var $in = this.f$.source.getInputStream ();
var sourceURL = this.f$.source.getURL ();
var protocol = sourceURL == null ? null : sourceURL.getProtocol ();
try {
if (Clazz.instanceOf ($in, org.eclipse.osgi.framework.internal.core.ReferenceInputStream)) {
var refIn = $in;
var reference = (refIn).getReference ();
if (!"file".equals (reference.getProtocol ())) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.ADAPTOR_URL_CREATE_EXCEPTION, reference));
}var path = reference.getPath ();
if (path.equals (this.data.getFileName ())) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.ADAPTOR_SAME_REF_UPDATE, reference));
}try {
this.newData = this.data.nextGeneration (reference.getPath ());
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.ADAPTOR_STORAGE_EXCEPTION, e);
} else {
throw e;
}
}
var bundleGenerationDir = this.newData.createGenerationDir ();
if (!bundleGenerationDir.exists ()) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.ADAPTOR_DIRECTORY_CREATE_EXCEPTION, bundleGenerationDir.getPath ()));
}this.newData.createBaseBundleFile ();
} else {
try {
this.newData = this.data.nextGeneration (null);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.ADAPTOR_STORAGE_EXCEPTION, e);
} else {
throw e;
}
}
var bundleGenerationDir = this.newData.createGenerationDir ();
if (!bundleGenerationDir.exists ()) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.ADAPTOR_DIRECTORY_CREATE_EXCEPTION, bundleGenerationDir.getPath ()));
}var outFile = this.newData.getBaseFile ();
if ("file".equals (protocol)) {
var inFile =  new java.io.File (this.f$.source.getURL ().getPath ());
if (inFile.isDirectory ()) {
org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor.copyDir (inFile, outFile);
} else {
org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor.readFile ($in, outFile);
}} else {
org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor.readFile ($in, outFile);
}this.newData.createBaseBundleFile ();
}} finally {
try {
$in.close ();
} catch (ee) {
if (Clazz.instanceOf (ee, java.io.IOException)) {
} else {
throw ee;
}
}
}
this.newData.loadFromManifest ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.BUNDLE_READ_EXCEPTION, e);
} else {
throw e;
}
}
return (this.newData);
});
Clazz.overrideMethod (c$, "commit", 
function (postpone) {
this.b$["org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor"].processExtension (this.data, 4);
this.b$["org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor"].processExtension (this.newData, 8);
try {
this.newData.setLastModified (System.currentTimeMillis ());
this.newData.save ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.ADAPTOR_STORAGE_EXCEPTION, e);
} else {
throw e;
}
}
this.b$["org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor"].updateState (this.newData, 8);
var originalGenerationDir = this.data.createGenerationDir ();
if (postpone || !this.b$["org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor"].rm (originalGenerationDir)) {
var $delete =  new java.io.File (originalGenerationDir, ".delete");
if (!$delete.exists ()) {
try {
var out =  new java.io.FileOutputStream ($delete);
out.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Unable to write " + $delete.getPath () + ": " + e.getMessage ());
}this.b$["org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor"].eventPublisher.publishFrameworkEvent (2, this.data.getBundle (), e);
} else {
throw e;
}
}
}}}, "~B");
Clazz.overrideMethod (c$, "undo", 
function () {
if (this.newData != null) {
var nextGenerationDir = this.newData.createGenerationDir ();
if (!this.b$["org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor"].rm (nextGenerationDir)) {
var $delete =  new java.io.File (nextGenerationDir, ".delete");
if (!$delete.exists ()) {
try {
var out =  new java.io.FileOutputStream ($delete);
out.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Unable to write " + $delete.getPath () + ": " + e.getMessage ());
}} else {
throw e;
}
}
}}}});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor$2, i$, v$);
}) (this, Clazz.cloneFinals ("bundledata", bundledata, "source", source)));
}, "org.eclipse.osgi.framework.adaptor.BundleData,java.net.URLConnection");
Clazz.defineMethod (c$, "checkSystemState", 
function (state) {
var bundles = state.getBundles ();
if (bundles == null) return ;
var removedBundle = false;
for (var i = 0; i < bundles.length; i++) {
if (this.context.getBundle (bundles[i].getBundleId ()) == null) {
state.removeBundle (bundles[i]);
removedBundle = true;
}}
if (removedBundle) state.resolve (false);
}, "org.eclipse.osgi.service.resolver.State");
Clazz.defineMethod (c$, "createStateManager", 
function () {
this.stateManager =  new org.eclipse.osgi.framework.adaptor.core.StateManager ( new java.io.File (this.getBundleStoreRootDir (), ".state"),  new java.io.File (this.getBundleStoreRootDir (), ".lazy"), this.context);
var systemState = null;
if (!this.invalidState) {
systemState = this.stateManager.readSystemState ();
if (systemState != null) return this.stateManager;
}systemState = this.stateManager.createSystemState ();
var installedBundles = this.context.getBundles ();
if (installedBundles == null) return this.stateManager;
var factory = this.stateManager.getFactory ();
for (var i = 0; i < installedBundles.length; i++) {
var toAdd = installedBundles[i];
try {
var manifest = toAdd.getHeaders ("");
var newDescription = factory.createBundleDescription (systemState, manifest, toAdd.getLocation (), toAdd.getBundleId ());
systemState.addBundle (newDescription);
} catch (be) {
if (Clazz.instanceOf (be, org.osgi.framework.BundleException)) {
} else {
throw be;
}
}
}
systemState.resolve ();
this.invalidState = false;
return this.stateManager;
});
Clazz.overrideMethod (c$, "uninstallBundle", 
function (bundledata) {
return ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor$3")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.data = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.adaptor.core, "AbstractFrameworkAdaptor$3", null, org.eclipse.osgi.framework.adaptor.BundleOperation);
Clazz.overrideMethod (c$, "begin", 
function () {
this.data = this.f$.bundledata;
return (this.f$.bundledata);
});
Clazz.overrideMethod (c$, "commit", 
function (postpone) {
var bundleDir = this.data.getBundleStoreDir ();
if (postpone || !this.b$["org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor"].rm (bundleDir)) {
var $delete =  new java.io.File (bundleDir, ".delete");
if (!$delete.exists ()) {
try {
var out =  new java.io.FileOutputStream ($delete);
out.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Unable to write " + $delete.getPath () + ": " + e.getMessage ());
}} else {
throw e;
}
}
}}this.b$["org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor"].processExtension (this.data, 4);
this.data.setLastModified (System.currentTimeMillis ());
this.b$["org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor"].updateState (this.data, 16);
}, "~B");
Clazz.overrideMethod (c$, "undo", 
function () {
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor$3, i$, v$);
}) (this, Clazz.cloneFinals ("bundledata", bundledata)));
}, "org.eclipse.osgi.framework.adaptor.BundleData");
Clazz.defineMethod (c$, "initBundleStoreRootDir", 
function () {
if (this.bundleStore == null) {
this.bundleStore = System.getProperty ("osgi.bundlestore");
if (this.bundleStore == null) {
this.bundleStore = this.properties.getProperty ("osgi.bundlestore", "bundles");
}}this.bundleStoreRootDir =  new java.io.File (this.bundleStore);
this.properties.put ("osgi.bundlestore", this.bundleStoreRootDir.getAbsolutePath ());
});
Clazz.defineMethod (c$, "register", 
function (name, service, bundle) {
var properties =  new java.util.Hashtable (7);
var headers = bundle.getHeaders ();
properties.put ("service.vendor", headers.get ("Bundle-Vendor"));
properties.put ("service.ranking",  new Integer (2147483647));
properties.put ("service.pid", bundle.getBundleId () + "." + service.getClass ().getName ());
return this.context.registerService (name, service, properties);
}, "~S,~O,org.osgi.framework.Bundle");
Clazz.overrideMethod (c$, "initializeStorage", 
function () {
var bundleStore;
if (this.reset && (bundleStore = this.getBundleStoreRootDir ()).exists ()) {
if (!this.canWrite () || !this.rm (bundleStore)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Could not remove directory: " + bundleStore.getPath ());
}throw  new java.io.IOException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.ADAPTOR_DIRECTORY_REMOVE_EXCEPTION, bundleStore));
}}this.initializeMetadata ();
});
Clazz.overrideMethod (c$, "getPermissionStorage", 
function () {
if (this.permissionStore == null) {
{
if (this.permissionStore == null) {
this.permissionStore =  new org.eclipse.osgi.framework.internal.core.DefaultPermissionStorage (this);
}}}return this.permissionStore;
});
Clazz.overrideMethod (c$, "compactStorage", 
function () {
if (this.canWrite ()) this.compact (this.getBundleStoreRootDir ());
});
Clazz.defineMethod (c$, "compact", 
($fz = function (directory) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("compact(" + directory.getPath () + ")");
}var list = directory.list ();
if (list == null) return ;
var len = list.length;
for (var i = 0; i < len; i++) {
if ("data".equals (list[i])) {
continue ;}var target =  new java.io.File (directory, list[i]);
if (!target.isDirectory ()) continue ;var $delete =  new java.io.File (target, ".delete");
if ($delete.exists ()) {
if (!this.rm (target) && !$delete.exists ()) {
try {
var out =  new java.io.FileOutputStream ($delete);
out.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Unable to write " + $delete.getPath () + ": " + e.getMessage ());
}} else {
throw e;
}
}
}} else {
this.compact (target);
}}
}, $fz.isPrivate = true, $fz), "java.io.File");
Clazz.defineMethod (c$, "getMetaDataFile", 
function () {
return  new java.io.File (this.getBundleStoreRootDir (), ".framework");
});
Clazz.defineMethod (c$, "updateState", 
function (bundleData, type) {
if (this.stateManager == null) {
this.invalidState = true;
return ;
}var systemState = this.stateManager.getSystemState ();
switch (type) {
case 8:
systemState.removeBundle (bundleData.getBundleID ());
case 1:
var newDescription = this.stateManager.getFactory ().createBundleDescription (systemState, bundleData.getManifest (), bundleData.getLocation (), bundleData.getBundleID ());
systemState.addBundle (newDescription);
break;
case 16:
systemState.removeBundle (bundleData.getBundleID ());
break;
}
}, "org.eclipse.osgi.framework.adaptor.BundleData,~N");
Clazz.defineMethod (c$, "canWrite", 
function () {
return true;
});
Clazz.defineStatics (c$,
"PROP_PARENT_CLASSLOADER", "osgi.parentClassloader",
"PROP_FRAMEWORK_EXTENSIONS", "osgi.framework.extensions",
"PROP_SIGNINGSUPPORT", "osgi.bundlesigning.support",
"PARENT_CLASSLOADER_APP", "app",
"PARENT_CLASSLOADER_EXT", "ext",
"PARENT_CLASSLOADER_BOOT", "boot",
"PARENT_CLASSLOADER_FWK", "fwk",
"BUNDLEFILE_NAME", "bundlefile",
"EXTENSION_INITIALIZE", 0x01,
"EXTENSION_INSTALLED", 0x02,
"EXTENSION_UNINSTALLED", 0x04,
"EXTENSION_UPDATED", 0x08,
"bundleClassLoaderParent", null);
{
var type = System.getProperty ("osgi.parentClassloader", "boot");
if ("fwk".equalsIgnoreCase (type)) ($t$ = org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor.bundleClassLoaderParent = org.eclipse.osgi.framework.adaptor.FrameworkAdaptor.getClassLoader (), org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor.prototype.bundleClassLoaderParent = org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor.bundleClassLoaderParent, $t$);
 else if ("app".equalsIgnoreCase (type)) ($t$ = org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor.bundleClassLoaderParent = ClassLoader.getSystemClassLoader (), org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor.prototype.bundleClassLoaderParent = org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor.bundleClassLoaderParent, $t$);
 else if ("ext".equalsIgnoreCase (type)) {
var appCL = ClassLoader.getSystemClassLoader ();
if (appCL != null) ($t$ = org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor.bundleClassLoaderParent = appCL.getParent (), org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor.prototype.bundleClassLoaderParent = org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor.bundleClassLoaderParent, $t$);
}if (org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor.bundleClassLoaderParent == null) ($t$ = org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor.bundleClassLoaderParent =  new org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor.ParentClassLoader (), org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor.prototype.bundleClassLoaderParent = org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor.bundleClassLoaderParent, $t$);
}Clazz.defineStatics (c$,
"BUNDLE_STORE", "osgi.bundlestore",
"DATA_DIR_NAME", "data");
});
