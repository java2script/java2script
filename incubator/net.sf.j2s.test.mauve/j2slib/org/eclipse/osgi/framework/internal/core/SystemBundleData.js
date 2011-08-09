Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.eclipse.osgi.framework.adaptor.core.AbstractBundleData"], "org.eclipse.osgi.framework.internal.core.SystemBundleData", ["java.io.File", "java.lang.ClassLoader", "org.eclipse.osgi.framework.adaptor.core.AdaptorMsg", "$.BundleFile", "org.eclipse.osgi.framework.debug.Debug", "org.eclipse.osgi.framework.util.Headers", "org.osgi.framework.BundleException"], function () {
c$ = Clazz.declareType (org.eclipse.osgi.framework.internal.core, "SystemBundleData", org.eclipse.osgi.framework.adaptor.core.AbstractBundleData);
Clazz.makeConstructor (c$, 
function (adaptor) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.internal.core.SystemBundleData, [adaptor, 0]);
var osgiBase = this.getOsgiBase ();
this.createBundleFile (osgiBase);
this.manifest = this.createManifest (osgiBase);
this.setMetaData ();
this.setLastModified (System.currentTimeMillis ());
}, "org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor");
Clazz.defineMethod (c$, "getOsgiBase", 
($fz = function () {
var frameworkLocation = System.getProperty ("osgi.framework");
if (frameworkLocation != null) return  new java.io.File (frameworkLocation.substring (5));
try {
var url = this.getClass ().getProtectionDomain ().getCodeSource ().getLocation ();
return  new java.io.File (url.getPath ());
} catch (e) {
if (Clazz.instanceOf (e, Throwable)) {
} else {
throw e;
}
}
frameworkLocation = System.getProperty ("user.dir");
if (frameworkLocation != null) return  new java.io.File (frameworkLocation);
return null;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "createManifest", 
($fz = function (osgiBase) {
var $in = null;
if (osgiBase != null && osgiBase.exists ()) {
try {
var entry = this.baseBundleFile.getEntry ("META-INF/MANIFEST.MF");
if (entry != null) $in = entry.getInputStream ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}if ($in == null) {
$in = this.getManifestAsResource ();
}if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
if ($in == null) {
org.eclipse.osgi.framework.debug.Debug.println ("Unable to find system bundle manifest META-INF/MANIFEST.MF");
}}if ($in == null) throw  new org.osgi.framework.BundleException (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.SYSTEMBUNDLE_MISSING_MANIFEST);
var systemManifest = org.eclipse.osgi.framework.util.Headers.parseManifest ($in);
var exportPackages = this.adaptor.getExportPackages ();
var exportServices = this.adaptor.getExportServices ();
var providePackages = this.adaptor.getProvidePackages ();
if (exportPackages != null) this.appendManifestValue (systemManifest, "Export-Package", exportPackages);
if (exportServices != null) this.appendManifestValue (systemManifest, "Export-Service", exportServices);
if (providePackages != null) this.appendManifestValue (systemManifest, "Provide-Package", providePackages);
return systemManifest;
}, $fz.isPrivate = true, $fz), "java.io.File");
Clazz.defineMethod (c$, "getManifestAsResource", 
($fz = function () {
var cl = this.getClass ().getClassLoader ();
try {
var manifests = cl != null ? cl.getResources ("META-INF/MANIFEST.MF") : ClassLoader.getSystemResources ("META-INF/MANIFEST.MF");
while (manifests.hasMoreElements ()) {
var url = manifests.nextElement ();
try {
var headers = org.eclipse.osgi.framework.util.Headers.parseManifest (url.openStream ());
if ("true".equals (headers.get ("Eclipse-SystemBundle"))) return url.openStream ();
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.BundleException)) {
} else {
throw e;
}
}
}
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
return null;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "appendManifestValue", 
($fz = function (systemManifest, header, append) {
var newValue = systemManifest.get (header);
if (newValue == null) {
newValue = append;
} else {
newValue += "," + append;
}systemManifest.set (header, null);
systemManifest.set (header, newValue);
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.framework.util.Headers,~S,~S");
Clazz.defineMethod (c$, "createBundleFile", 
($fz = function (osgiBase) {
if (osgiBase != null) try {
this.baseBundleFile = this.adaptor.createBundleFile (osgiBase, this);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
 else this.baseBundleFile = (function (i$, arg0, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.SystemBundleData$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "SystemBundleData$1", org.eclipse.osgi.framework.adaptor.core.BundleFile);
Clazz.overrideMethod (c$, "getFile", 
function (path) {
return null;
}, "~S");
Clazz.defineMethod (c$, "getEntry", 
function (path) {
return null;
}, "~S");
Clazz.overrideMethod (c$, "getEntryPaths", 
function (path) {
return null;
}, "~S");
Clazz.overrideMethod (c$, "close", 
function () {
});
Clazz.overrideMethod (c$, "open", 
function () {
});
Clazz.overrideMethod (c$, "containsDir", 
function (dir) {
return false;
}, "~S");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.SystemBundleData$1, i$, v$, arg0);
}) (this, osgiBase, null);
}, $fz.isPrivate = true, $fz), "java.io.File");
Clazz.defineMethod (c$, "setMetaData", 
($fz = function () {
this.setLocation ("System Bundle");
this.loadFromManifest ();
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "createClassLoader", 
function (delegate, domain, bundleclasspath) {
return null;
}, "org.eclipse.osgi.framework.adaptor.ClassLoaderDelegate,org.eclipse.osgi.framework.adaptor.BundleProtectionDomain,~A");
Clazz.overrideMethod (c$, "createGenerationDir", 
function () {
return null;
});
Clazz.overrideMethod (c$, "findLibrary", 
function (libname) {
return null;
}, "~S");
Clazz.overrideMethod (c$, "installNativeCode", 
function (nativepaths) {
}, "~A");
Clazz.overrideMethod (c$, "getDataFile", 
function (path) {
return null;
}, "~S");
Clazz.overrideMethod (c$, "getStartLevel", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "getStatus", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "save", 
function () {
});
Clazz.defineMethod (c$, "getBundleSigners", 
function () {
return null;
});
Clazz.defineStatics (c$,
"OSGI_FRAMEWORK", "osgi.framework");
});
