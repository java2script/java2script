Clazz.declarePackage ("org.eclipse.core.runtime.adaptor");
Clazz.load (null, "org.eclipse.core.runtime.adaptor.LocationManager", ["java.io.File", "$.FileInputStream", "java.lang.Boolean", "java.net.URL", "java.util.Properties", "org.eclipse.core.runtime.internal.adaptor.BasicLocation"], function () {
c$ = Clazz.declareType (org.eclipse.core.runtime.adaptor, "LocationManager");
c$.buildURL = Clazz.defineMethod (c$, "buildURL", 
function (spec, trailingSlash) {
if (spec == null) return null;
var isFile = spec.startsWith ("file:");
try {
if (isFile) return org.eclipse.core.runtime.adaptor.LocationManager.adjustTrailingSlash ( new java.io.File (spec.substring (5)).toURL (), trailingSlash);
 else return  new java.net.URL (spec);
} catch (e) {
if (Clazz.instanceOf (e, java.net.MalformedURLException)) {
if (isFile) return null;
try {
return org.eclipse.core.runtime.adaptor.LocationManager.adjustTrailingSlash ( new java.io.File (spec).toURL (), trailingSlash);
} catch (e1) {
if (Clazz.instanceOf (e1, java.net.MalformedURLException)) {
return null;
} else {
throw e1;
}
}
} else {
throw e;
}
}
}, "~S,~B");
c$.adjustTrailingSlash = Clazz.defineMethod (c$, "adjustTrailingSlash", 
($fz = function (url, trailingSlash) {
var file = url.getFile ();
if (trailingSlash == (file.endsWith ("/"))) return url;
file = trailingSlash ? file + "/" : file.substring (0, file.length - 1);
return  new java.net.URL (url.getProtocol (), url.getHost (), file);
}, $fz.isPrivate = true, $fz), "java.net.URL,~B");
c$.mungeConfigurationLocation = Clazz.defineMethod (c$, "mungeConfigurationLocation", 
($fz = function () {
var location = System.getProperty ("osgi.configuration.area");
if (location != null) {
location = org.eclipse.core.runtime.adaptor.LocationManager.buildURL (location, false).toExternalForm ();
if (location.endsWith (".cfg")) {
var index = location.lastIndexOf ('/');
location = location.substring (0, index + 1);
}if (!location.endsWith ("/")) location += "/";
System.getProperties ().put ("osgi.configuration.area", location);
}}, $fz.isPrivate = true, $fz));
c$.initializeLocations = Clazz.defineMethod (c$, "initializeLocations", 
function () {
($t$ = org.eclipse.core.runtime.adaptor.LocationManager.installLocation = org.eclipse.core.runtime.adaptor.LocationManager.buildLocation ("osgi.install.area", null, null, true), org.eclipse.core.runtime.adaptor.LocationManager.prototype.installLocation = org.eclipse.core.runtime.adaptor.LocationManager.installLocation, $t$);
var temp = org.eclipse.core.runtime.adaptor.LocationManager.buildLocation ("osgi.user.area.default", null, "", false);
var defaultLocation = temp == null ? null : temp.getURL ();
if (defaultLocation == null) defaultLocation = org.eclipse.core.runtime.adaptor.LocationManager.buildURL ( new java.io.File (System.getProperty ("user.home"), "user").getAbsolutePath (), true);
($t$ = org.eclipse.core.runtime.adaptor.LocationManager.userLocation = org.eclipse.core.runtime.adaptor.LocationManager.buildLocation ("osgi.user.area", defaultLocation, "", false), org.eclipse.core.runtime.adaptor.LocationManager.prototype.userLocation = org.eclipse.core.runtime.adaptor.LocationManager.userLocation, $t$);
temp = org.eclipse.core.runtime.adaptor.LocationManager.buildLocation ("osgi.instance.area.default", null, "", false);
defaultLocation = temp == null ? null : temp.getURL ();
if (defaultLocation == null) defaultLocation = org.eclipse.core.runtime.adaptor.LocationManager.buildURL ( new java.io.File (System.getProperty ("user.dir"), "workspace").getAbsolutePath (), true);
($t$ = org.eclipse.core.runtime.adaptor.LocationManager.instanceLocation = org.eclipse.core.runtime.adaptor.LocationManager.buildLocation ("osgi.instance.area", defaultLocation, "", false), org.eclipse.core.runtime.adaptor.LocationManager.prototype.instanceLocation = org.eclipse.core.runtime.adaptor.LocationManager.instanceLocation, $t$);
org.eclipse.core.runtime.adaptor.LocationManager.mungeConfigurationLocation ();
temp = org.eclipse.core.runtime.adaptor.LocationManager.buildLocation ("osgi.configuration.area.default", null, "", false);
defaultLocation = temp == null ? null : temp.getURL ();
if (defaultLocation == null) defaultLocation = org.eclipse.core.runtime.adaptor.LocationManager.buildURL (org.eclipse.core.runtime.adaptor.LocationManager.computeDefaultConfigurationLocation (), true);
($t$ = org.eclipse.core.runtime.adaptor.LocationManager.configurationLocation = org.eclipse.core.runtime.adaptor.LocationManager.buildLocation ("osgi.configuration.area", defaultLocation, "", false), org.eclipse.core.runtime.adaptor.LocationManager.prototype.configurationLocation = org.eclipse.core.runtime.adaptor.LocationManager.configurationLocation, $t$);
var parentLocation = org.eclipse.core.runtime.adaptor.LocationManager.computeSharedConfigurationLocation ();
if (parentLocation != null && !parentLocation.equals (org.eclipse.core.runtime.adaptor.LocationManager.configurationLocation.getURL ())) {
var parent =  new org.eclipse.core.runtime.internal.adaptor.BasicLocation (null, parentLocation, true);
(org.eclipse.core.runtime.adaptor.LocationManager.configurationLocation).setParent (parent);
}org.eclipse.core.runtime.adaptor.LocationManager.initializeDerivedConfigurationLocations ();
});
c$.buildLocation = Clazz.defineMethod (c$, "buildLocation", 
($fz = function (property, defaultLocation, userDefaultAppendage, readOnlyDefault) {
var location = System.getProperties ().remove (property);
var userReadOnlySetting = System.getProperty (property + ".readOnly");
var readOnly = (userReadOnlySetting == null ? readOnlyDefault : Boolean.$valueOf (userReadOnlySetting).booleanValue ());
if (location == null) return  new org.eclipse.core.runtime.internal.adaptor.BasicLocation (property, defaultLocation, readOnly);
var trimmedLocation = location.trim ();
if (trimmedLocation.equalsIgnoreCase ("@none")) return null;
if (trimmedLocation.equalsIgnoreCase ("@noDefault")) return  new org.eclipse.core.runtime.internal.adaptor.BasicLocation (property, null, readOnly);
if (trimmedLocation.startsWith ("@user.home")) {
var base = org.eclipse.core.runtime.adaptor.LocationManager.substituteVar (location, "@user.home", "user.home");
location =  new java.io.File (base, userDefaultAppendage).getAbsolutePath ();
} else if (trimmedLocation.startsWith ("@user.dir")) {
var base = org.eclipse.core.runtime.adaptor.LocationManager.substituteVar (location, "@user.dir", "user.dir");
location =  new java.io.File (base, userDefaultAppendage).getAbsolutePath ();
}var url = org.eclipse.core.runtime.adaptor.LocationManager.buildURL (location, true);
var result = null;
if (url != null) {
result =  new org.eclipse.core.runtime.internal.adaptor.BasicLocation (property, null, readOnly);
result.setURL (url, false);
}return result;
}, $fz.isPrivate = true, $fz), "~S,java.net.URL,~S,~B");
c$.substituteVar = Clazz.defineMethod (c$, "substituteVar", 
($fz = function (source, $var, prop) {
var value = System.getProperty (prop, "");
return value + source.substring ($var.length);
}, $fz.isPrivate = true, $fz), "~S,~S,~S");
c$.initializeDerivedConfigurationLocations = Clazz.defineMethod (c$, "initializeDerivedConfigurationLocations", 
($fz = function () {
if (System.getProperty ("osgi.manifest.cache") == null) System.getProperties ().put ("osgi.manifest.cache", org.eclipse.core.runtime.adaptor.LocationManager.getConfigurationFile ("manifests").getAbsolutePath ());
}, $fz.isPrivate = true, $fz));
c$.computeInstallConfigurationLocation = Clazz.defineMethod (c$, "computeInstallConfigurationLocation", 
($fz = function () {
var property = System.getProperty ("osgi.install.area");
if (property != null) {
try {
return  new java.net.URL (property);
} catch (e) {
if (Clazz.instanceOf (e, java.net.MalformedURLException)) {
} else {
throw e;
}
}
}return null;
}, $fz.isPrivate = true, $fz));
c$.computeSharedConfigurationLocation = Clazz.defineMethod (c$, "computeSharedConfigurationLocation", 
($fz = function () {
var property = System.getProperty ("osgi.sharedConfiguration.area");
if (property == null) return null;
try {
var sharedConfigurationURL =  new java.net.URL (property);
if (sharedConfigurationURL.getPath ().startsWith ("/")) return sharedConfigurationURL;
var installURL = org.eclipse.core.runtime.adaptor.LocationManager.installLocation.getURL ();
if (!sharedConfigurationURL.getProtocol ().equals (installURL.getProtocol ())) return sharedConfigurationURL;
sharedConfigurationURL =  new java.net.URL (installURL, sharedConfigurationURL.getPath ());
System.getProperties ().put ("osgi.sharedConfiguration.area", sharedConfigurationURL.toExternalForm ());
} catch (e) {
if (Clazz.instanceOf (e, java.net.MalformedURLException)) {
} else {
throw e;
}
}
return null;
}, $fz.isPrivate = true, $fz));
c$.computeDefaultConfigurationLocation = Clazz.defineMethod (c$, "computeDefaultConfigurationLocation", 
($fz = function () {
var installURL = org.eclipse.core.runtime.adaptor.LocationManager.computeInstallConfigurationLocation ();
if (installURL != null) {
var installDir =  new java.io.File (installURL.getFile ());
if ("file".equals (installURL.getProtocol ()) && org.eclipse.core.runtime.adaptor.LocationManager.canWrite (installDir)) return  new java.io.File (installDir, "configuration").getAbsolutePath ();
}return org.eclipse.core.runtime.adaptor.LocationManager.computeDefaultUserAreaLocation ("configuration");
}, $fz.isPrivate = true, $fz));
c$.canWrite = Clazz.defineMethod (c$, "canWrite", 
($fz = function (installDir) {
if (installDir.canWrite () == false) return false;
if (!installDir.isDirectory ()) return false;
var fileTest = null;
try {
fileTest = java.io.File.createTempFile ("writtableArea", null, installDir);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
return false;
} else {
throw e;
}
} finally {
if (fileTest != null) fileTest.$delete ();
}
return true;
}, $fz.isPrivate = true, $fz), "java.io.File");
c$.computeDefaultUserAreaLocation = Clazz.defineMethod (c$, "computeDefaultUserAreaLocation", 
($fz = function (pathAppendage) {
var installProperty = System.getProperty ("osgi.install.area");
var installURL = org.eclipse.core.runtime.adaptor.LocationManager.buildURL (installProperty, true);
if (installURL == null) return null;
var installDir =  new java.io.File (installURL.getFile ());
var appName = ".eclipse";
var eclipseProduct =  new java.io.File (installDir, ".eclipseproduct");
if (eclipseProduct.exists ()) {
var props =  new java.util.Properties ();
try {
props.load ( new java.io.FileInputStream (eclipseProduct));
var appId = props.getProperty ("id");
if (appId == null || appId.trim ().length == 0) appId = "eclipse";
var appVersion = props.getProperty ("version");
if (appVersion == null || appVersion.trim ().length == 0) appVersion = "";
appName += java.io.File.separator + appId + "_" + appVersion;
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}var userHome = System.getProperty ("user.home");
return  new java.io.File (userHome, appName + "/" + pathAppendage).getAbsolutePath ();
}, $fz.isPrivate = true, $fz), "~S");
c$.getUserLocation = Clazz.defineMethod (c$, "getUserLocation", 
function () {
return org.eclipse.core.runtime.adaptor.LocationManager.userLocation;
});
c$.getConfigurationLocation = Clazz.defineMethod (c$, "getConfigurationLocation", 
function () {
return org.eclipse.core.runtime.adaptor.LocationManager.configurationLocation;
});
c$.getInstallLocation = Clazz.defineMethod (c$, "getInstallLocation", 
function () {
return org.eclipse.core.runtime.adaptor.LocationManager.installLocation;
});
c$.getInstanceLocation = Clazz.defineMethod (c$, "getInstanceLocation", 
function () {
return org.eclipse.core.runtime.adaptor.LocationManager.instanceLocation;
});
c$.getOSGiConfigurationDir = Clazz.defineMethod (c$, "getOSGiConfigurationDir", 
function () {
return  new java.io.File (org.eclipse.core.runtime.adaptor.LocationManager.configurationLocation.getURL ().getFile (), "org.eclipse.osgi");
});
c$.getConfigurationFile = Clazz.defineMethod (c$, "getConfigurationFile", 
function (filename) {
var dir = org.eclipse.core.runtime.adaptor.LocationManager.getOSGiConfigurationDir ();
if (!dir.exists ()) dir.mkdirs ();
return  new java.io.File (dir, filename);
}, "~S");
Clazz.defineStatics (c$,
"installLocation", null,
"configurationLocation", null,
"userLocation", null,
"instanceLocation", null,
"READ_ONLY_AREA_SUFFIX", ".readOnly",
"PROP_INSTALL_AREA", "osgi.install.area",
"PROP_CONFIG_AREA", "osgi.configuration.area",
"PROP_CONFIG_AREA_DEFAULT", "osgi.configuration.area.default",
"PROP_SHARED_CONFIG_AREA", "osgi.sharedConfiguration.area",
"PROP_INSTANCE_AREA", "osgi.instance.area",
"PROP_INSTANCE_AREA_DEFAULT", "osgi.instance.area.default",
"PROP_USER_AREA", "osgi.user.area",
"PROP_USER_AREA_DEFAULT", "osgi.user.area.default",
"PROP_MANIFEST_CACHE", "osgi.manifest.cache",
"PROP_USER_HOME", "user.home",
"PROP_USER_DIR", "user.dir",
"BUNDLES_DIR", "bundles",
"STATE_FILE", ".state",
"LAZY_FILE", ".lazy",
"BUNDLE_DATA_FILE", ".bundledata",
"MANIFESTS_DIR", "manifests",
"CONFIG_FILE", "config.ini",
"ECLIPSE_PROPERTIES", "eclipse.properties",
"ECLIPSE", "eclipse",
"PRODUCT_SITE_MARKER", ".eclipseproduct",
"PRODUCT_SITE_ID", "id",
"PRODUCT_SITE_VERSION", "version",
"CONFIG_DIR", "configuration",
"NONE", "@none",
"NO_DEFAULT", "@noDefault",
"USER_HOME", "@user.home",
"USER_DIR", "@user.dir");
});
