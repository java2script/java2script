Clazz.declarePackage ("org.eclipse.core.internal.runtime");
Clazz.load (["java.util.ArrayList", "$.HashMap"], "org.eclipse.core.internal.runtime.InternalPlatform", ["java.io.File", "$.IOException", "java.lang.IllegalStateException", "java.net.URL", "java.util.Properties", "$.StringTokenizer", "$.Vector", "org.eclipse.core.internal.content.ContentTypeManager", "org.eclipse.core.internal.jobs.JobManager", "org.eclipse.core.internal.preferences.PreferencesService", "org.eclipse.core.internal.runtime.AdapterManager", "$.Assert", "$.AuthorizationHandler", "$.DataArea", "$.FindSupport", "$.Log", "$.Messages", "$.PlatformLogWriter", "$.Product", "$.ResourceTranslator", "org.eclipse.core.runtime.ISafeRunnable", "$.MultiStatus", "$.Path", "$.Status", "org.eclipse.core.runtime.adaptor.FileManager", "org.eclipse.osgi.framework.log.FrameworkLogEntry", "org.eclipse.osgi.service.debug.DebugOptions", "org.eclipse.osgi.service.resolver.PlatformAdmin", "org.eclipse.osgi.util.NLS", "org.osgi.util.tracker.ServiceTracker"], function () {
c$ = Clazz.decorateAsClass (function () {
this.cachedInstanceLocation = null;
this.configurationLocation = null;
this.context = null;
this.debugTracker = null;
this.groupProviders = null;
this.installLocation = null;
this.instanceLocation = null;
this.missingProductReported = false;
this.options = null;
this.product = null;
this.registry = null;
this.runtimeFileManager = null;
this.runtimeInstance = null;
this.userLocation = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.runtime, "InternalPlatform");
Clazz.prepareFields (c$, function () {
this.groupProviders =  new java.util.ArrayList (3);
});
c$.getDefault = Clazz.defineMethod (c$, "getDefault", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.singleton;
});
Clazz.makeConstructor (c$, 
($fz = function () {
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "addAuthorizationInfo", 
function (serverUrl, realm, authScheme, info) {
org.eclipse.core.internal.runtime.AuthorizationHandler.addAuthorizationInfo (serverUrl, realm, authScheme, info);
}, "java.net.URL,~S,~S,java.util.Map");
Clazz.defineMethod (c$, "addLogListener", 
function (listener) {
this.assertInitialized ();
{
org.eclipse.core.internal.runtime.InternalPlatform.logListeners.remove (listener);
org.eclipse.core.internal.runtime.InternalPlatform.logListeners.add (listener);
}}, "org.eclipse.core.runtime.ILogListener");
Clazz.defineMethod (c$, "addProtectionSpace", 
function (resourceUrl, realm) {
org.eclipse.core.internal.runtime.AuthorizationHandler.addProtectionSpace (resourceUrl, realm);
}, "java.net.URL,~S");
Clazz.defineMethod (c$, "asActualURL", 
($fz = function (url) {
if (!url.getProtocol ().equals ("platform")) return url;
var connection = url.openConnection ();
if (Clazz.instanceOf (connection, org.eclipse.core.internal.boot.PlatformURLConnection)) return (connection).getResolvedURL ();
return url;
}, $fz.isPrivate = true, $fz), "java.net.URL");
Clazz.defineMethod (c$, "asLocalURL", 
function (url) {
var result = url;
if (result.getProtocol ().equals ("platform")) result = this.asActualURL (url);
if (result.getProtocol ().startsWith ("bundle")) {
if (org.eclipse.core.internal.runtime.InternalPlatform.urlConverter == null) throw  new java.io.IOException ("url.noaccess");
result = org.eclipse.core.internal.runtime.InternalPlatform.urlConverter.convertToFileURL (result);
}return result;
}, "java.net.URL");
Clazz.defineMethod (c$, "assertInitialized", 
($fz = function () {
if (!org.eclipse.core.internal.runtime.InternalPlatform.initialized) org.eclipse.core.internal.runtime.Assert.isTrue (false, org.eclipse.core.internal.runtime.Messages.meta_appNotInit);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "clearRegistryCache", 
function () {
if (Clazz.instanceOf (this.registry, org.eclipse.core.internal.registry.ExtensionRegistry)) (this.registry).clearRegistryCache ();
});
Clazz.defineMethod (c$, "endSplash", 
function () {
var handler = org.eclipse.core.internal.runtime.InternalPlatform.splashHandler;
if (handler == null) return ;
($t$ = org.eclipse.core.internal.runtime.InternalPlatform.splashHandler = null, org.eclipse.core.internal.runtime.InternalPlatform.prototype.splashHandler = org.eclipse.core.internal.runtime.InternalPlatform.splashHandler, $t$);
this.run ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.runtime.InternalPlatform$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.runtime, "InternalPlatform$1", null, org.eclipse.core.runtime.ISafeRunnable);
Clazz.defineMethod (c$, "handleException", 
function (e) {
}, "Throwable");
Clazz.defineMethod (c$, "run", 
function () {
this.f$.handler.run ();
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.runtime.InternalPlatform$1, i$, v$);
}) (this, Clazz.cloneFinals ("handler", handler)));
});
Clazz.defineMethod (c$, "find", 
function (b, path) {
return org.eclipse.core.internal.runtime.FindSupport.find (b, path);
}, "org.osgi.framework.Bundle,org.eclipse.core.runtime.IPath");
Clazz.defineMethod (c$, "find", 
function (bundle, path, override) {
return org.eclipse.core.internal.runtime.FindSupport.find (bundle, path, override);
}, "org.osgi.framework.Bundle,org.eclipse.core.runtime.IPath,java.util.Map");
Clazz.defineMethod (c$, "flushAuthorizationInfo", 
function (serverUrl, realm, authScheme) {
org.eclipse.core.internal.runtime.AuthorizationHandler.flushAuthorizationInfo (serverUrl, realm, authScheme);
}, "java.net.URL,~S,~S");
Clazz.defineMethod (c$, "getAdapterManager", 
function () {
this.assertInitialized ();
if (org.eclipse.core.internal.runtime.InternalPlatform.adapterManager == null) ($t$ = org.eclipse.core.internal.runtime.InternalPlatform.adapterManager =  new org.eclipse.core.internal.runtime.AdapterManager (), org.eclipse.core.internal.runtime.InternalPlatform.prototype.adapterManager = org.eclipse.core.internal.runtime.InternalPlatform.adapterManager, $t$);
return org.eclipse.core.internal.runtime.InternalPlatform.adapterManager;
});
Clazz.defineMethod (c$, "getApplicationArgs", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.appArgs;
});
Clazz.defineMethod (c$, "getAuthorizationInfo", 
function (serverUrl, realm, authScheme) {
return org.eclipse.core.internal.runtime.AuthorizationHandler.getAuthorizationInfo (serverUrl, realm, authScheme);
}, "java.net.URL,~S,~S");
Clazz.defineMethod (c$, "getBooleanOption", 
function (option, defaultValue) {
var value = this.getOption (option);
if (value == null) return defaultValue;
return value.equalsIgnoreCase ("true");
}, "~S,~B");
Clazz.defineMethod (c$, "getBundle", 
function (symbolicName) {
if (org.eclipse.core.internal.runtime.InternalPlatform.packageAdmin == null) return null;
var bundles = org.eclipse.core.internal.runtime.InternalPlatform.packageAdmin.getBundles (symbolicName, null);
if (bundles == null) return null;
for (var i = 0; i < bundles.length; i++) {
if ((bundles[i].getState () & (3)) == 0) {
return bundles[i];
}}
return null;
}, "~S");
Clazz.defineMethod (c$, "getBundleContext", 
function () {
return this.context;
});
Clazz.defineMethod (c$, "getBundleGroupProviders", 
function () {
return this.groupProviders.toArray ( new Array (this.groupProviders.size ()));
});
Clazz.defineMethod (c$, "getBundleId", 
function (object) {
if (object == null) return null;
if (org.eclipse.core.internal.runtime.InternalPlatform.packageAdmin == null) return null;
var source = org.eclipse.core.internal.runtime.InternalPlatform.packageAdmin.getBundle (object.getClass ());
if (source != null && source.getSymbolicName () != null) return source.getSymbolicName ();
return null;
}, "~O");
Clazz.defineMethod (c$, "getBundles", 
function (symbolicName, version) {
if (org.eclipse.core.internal.runtime.InternalPlatform.packageAdmin == null) return null;
var bundles = org.eclipse.core.internal.runtime.InternalPlatform.packageAdmin.getBundles (symbolicName, version);
if (bundles == null) return null;
if (bundles.length == 1 && (bundles[0].getState () & (3)) == 0) return bundles;
var selectedBundles =  new Array (bundles.length);
var added = 0;
for (var i = 0; i < bundles.length; i++) {
if ((bundles[i].getState () & (3)) == 0) {
selectedBundles[added++] = bundles[i];
}}
if (added == 0) return null;
var results =  new Array (added);
System.arraycopy (selectedBundles, 0, results, 0, added);
return results;
}, "~S,~S");
Clazz.defineMethod (c$, "getCommandLineArgs", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.allArgs;
});
Clazz.defineMethod (c$, "getConfigurationLocation", 
function () {
this.assertInitialized ();
return this.configurationLocation.getService ();
});
Clazz.defineMethod (c$, "getContentTypeManager", 
function () {
return org.eclipse.core.internal.content.ContentTypeManager.getInstance ();
});
Clazz.defineMethod (c$, "getEnvironmentInfoService", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.infoService;
});
Clazz.defineMethod (c$, "getFragments", 
function (bundle) {
if (org.eclipse.core.internal.runtime.InternalPlatform.packageAdmin == null) return null;
return org.eclipse.core.internal.runtime.InternalPlatform.packageAdmin.getFragments (bundle);
}, "org.osgi.framework.Bundle");
Clazz.defineMethod (c$, "getFrameworkLog", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.frameworkLog;
});
Clazz.defineMethod (c$, "getHosts", 
function (bundle) {
if (org.eclipse.core.internal.runtime.InternalPlatform.packageAdmin == null) return null;
return org.eclipse.core.internal.runtime.InternalPlatform.packageAdmin.getHosts (bundle);
}, "org.osgi.framework.Bundle");
Clazz.defineMethod (c$, "getInstallLocation", 
function () {
this.assertInitialized ();
return this.installLocation.getService ();
});
Clazz.defineMethod (c$, "getInstallURL", 
function () {
var location = this.getInstallLocation ();
if (location == null) throw  new IllegalStateException ("The installation location must not be null");
return location.getURL ();
});
Clazz.defineMethod (c$, "getInstanceLocation", 
function () {
this.assertInitialized ();
return this.instanceLocation.getService ();
});
Clazz.defineMethod (c$, "getIntegerOption", 
function (option, defaultValue) {
var value = this.getOption (option);
if (value == null) return defaultValue;
try {
return Integer.parseInt (value);
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
return defaultValue;
} else {
throw e;
}
}
}, "~S,~N");
Clazz.defineMethod (c$, "getJobManager", 
function () {
return org.eclipse.core.internal.jobs.JobManager.getInstance ();
});
Clazz.defineMethod (c$, "getLocation", 
function () {
if (this.cachedInstanceLocation == null) {
var location = this.getInstanceLocation ();
if (location == null) return null;
var file =  new java.io.File (location.getURL ().getFile ());
this.cachedInstanceLocation =  new org.eclipse.core.runtime.Path (file.toString ());
}return this.cachedInstanceLocation;
});
Clazz.defineMethod (c$, "getLog", 
function (bundle) {
var result = org.eclipse.core.internal.runtime.InternalPlatform.logs.get (bundle);
if (result != null) return result;
result =  new org.eclipse.core.internal.runtime.Log (bundle);
org.eclipse.core.internal.runtime.InternalPlatform.logs.put (bundle, result);
return result;
}, "org.osgi.framework.Bundle");
Clazz.defineMethod (c$, "getLogFileLocation", 
function () {
return this.getMetaArea ().getLogLocation ();
});
Clazz.defineMethod (c$, "getMetaArea", 
function () {
if (org.eclipse.core.internal.runtime.InternalPlatform.metaArea != null) return org.eclipse.core.internal.runtime.InternalPlatform.metaArea;
($t$ = org.eclipse.core.internal.runtime.InternalPlatform.metaArea =  new org.eclipse.core.internal.runtime.DataArea (), org.eclipse.core.internal.runtime.InternalPlatform.prototype.metaArea = org.eclipse.core.internal.runtime.InternalPlatform.metaArea, $t$);
return org.eclipse.core.internal.runtime.InternalPlatform.metaArea;
});
Clazz.defineMethod (c$, "getNL", 
function () {
return System.getProperty ("osgi.nl");
});
Clazz.defineMethod (c$, "getOption", 
function (option) {
if (this.options != null) return this.options.getOption (option);
return null;
}, "~S");
Clazz.defineMethod (c$, "getOS", 
function () {
return System.getProperty ("osgi.os");
});
Clazz.defineMethod (c$, "getOSArch", 
function () {
return System.getProperty ("osgi.arch");
});
Clazz.defineMethod (c$, "getPlatformAdmin", 
function () {
var platformAdminReference = this.context.getServiceReference (org.eclipse.osgi.service.resolver.PlatformAdmin.getName ());
if (platformAdminReference == null) return null;
return this.context.getService (platformAdminReference);
});
Clazz.defineMethod (c$, "getPluginPath", 
function (pluginPathLocation) {
var input = null;
if (pluginPathLocation == null) return null;
try {
input = pluginPathLocation.openStream ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
if (input == null) try {
var url =  new java.net.URL ("platform:/base/.plugin-path");
input = url.openStream ();
} catch (e$$) {
if (Clazz.instanceOf (e$$, java.net.MalformedURLException)) {
var e = e$$;
{
}
} else if (Clazz.instanceOf (e$$, java.io.IOException)) {
var e = e$$;
{
}
} else {
throw e$$;
}
}
if (input == null) return null;
var result = null;
try {
try {
result = this.readPluginPath (input);
} finally {
input.close ();
}
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
return result;
}, "java.net.URL");
Clazz.defineMethod (c$, "getPreferencesService", 
function () {
return org.eclipse.core.internal.preferences.PreferencesService.getDefault ();
});
Clazz.defineMethod (c$, "getPreferenceTranslator", 
function (uniqueIdentifier, basePrefFileName) {
return  new java.util.Properties ();
}, "~S,~S");
Clazz.defineMethod (c$, "getProduct", 
function () {
if (this.product != null) return this.product;
var productId = System.getProperty ("eclipse.product");
if (productId == null) return null;
var entries = this.getRegistry ().getConfigurationElementsFor ("org.eclipse.core.runtime", "products", productId);
if (entries.length > 0) {
this.product =  new org.eclipse.core.internal.runtime.Product (productId, entries[0]);
return this.product;
}var elements = this.getRegistry ().getConfigurationElementsFor ("org.eclipse.core.runtime", "products");
var logEntries = null;
for (var i = 0; i < elements.length; i++) {
var element = elements[i];
if (element.getName ().equalsIgnoreCase ("provider")) {
try {
var provider = element.createExecutableExtension ("run");
var products = provider.getProducts ();
for (var j = 0; j < products.length; j++) {
var provided = products[j];
if (provided.getId ().equalsIgnoreCase (productId)) {
this.product = provided;
return this.product;
}}
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
if (logEntries == null) logEntries =  new java.util.ArrayList (3);
logEntries.add ( new org.eclipse.osgi.framework.log.FrameworkLogEntry ("org.eclipse.core.runtime", org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.provider_invalid, element.getParent ().toString ()), 0, e, null));
} else {
throw e;
}
}
}}
if (logEntries != null) this.getFrameworkLog ().log ( new org.eclipse.osgi.framework.log.FrameworkLogEntry ("org.eclipse.core.runtime", org.eclipse.core.internal.runtime.Messages.provider_invalid_general, 0, null, logEntries.toArray ()));
if (!this.missingProductReported) {
this.getFrameworkLog ().log ( new org.eclipse.osgi.framework.log.FrameworkLogEntry ("org.eclipse.core.runtime", org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.product_notFound, productId), 0, null, null));
this.missingProductReported = true;
}return null;
});
Clazz.defineMethod (c$, "getProtectionSpace", 
function (resourceUrl) {
return org.eclipse.core.internal.runtime.AuthorizationHandler.getProtectionSpace (resourceUrl);
}, "java.net.URL");
Clazz.defineMethod (c$, "getRegistry", 
function () {
return this.registry;
});
Clazz.defineMethod (c$, "getResourceBundle", 
function (bundle) {
return org.eclipse.core.internal.runtime.ResourceTranslator.getResourceBundle (bundle);
}, "org.osgi.framework.Bundle");
Clazz.defineMethod (c$, "getResourceString", 
function (bundle, value) {
return org.eclipse.core.internal.runtime.ResourceTranslator.getResourceString (bundle, value);
}, "org.osgi.framework.Bundle,~S");
Clazz.defineMethod (c$, "getResourceString", 
function (bundle, value, resourceBundle) {
return org.eclipse.core.internal.runtime.ResourceTranslator.getResourceString (bundle, value, resourceBundle);
}, "org.osgi.framework.Bundle,~S,java.util.ResourceBundle");
Clazz.defineMethod (c$, "getRuntimeFileManager", 
function () {
return this.runtimeFileManager;
});
Clazz.defineMethod (c$, "getRuntimeInstance", 
function () {
return this.runtimeInstance;
});
Clazz.defineMethod (c$, "getSplashHandler", 
($fz = function () {
var ref;
try {
ref = this.context.getServiceReferences (Runnable.getName (), null);
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.InvalidSyntaxException)) {
return null;
} else {
throw e;
}
}
for (var i = 0; i < ref.length; i++) {
var name = ref[i].getProperty ("name");
if (name != null && name.equals ("splashscreen")) {
var result = this.context.getService (ref[i]);
this.context.ungetService (ref[i]);
return result;
}}
return null;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getStateLocation", 
function (bundle) {
return this.getStateLocation (bundle, true);
}, "org.osgi.framework.Bundle");
Clazz.defineMethod (c$, "getStateLocation", 
function (bundle, create) {
this.assertInitialized ();
var result = this.getMetaArea ().getStateLocation (bundle);
if (create) result.toFile ().mkdirs ();
return result;
}, "org.osgi.framework.Bundle,~B");
Clazz.defineMethod (c$, "getStateTimeStamp", 
function () {
var admin = this.getPlatformAdmin ();
return admin == null ? -1 : admin.getState (false).getTimeStamp ();
});
Clazz.defineMethod (c$, "getURLConverter", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.urlConverter;
});
Clazz.defineMethod (c$, "getUserLocation", 
function () {
this.assertInitialized ();
return this.userLocation.getService ();
});
Clazz.defineMethod (c$, "getWS", 
function () {
return System.getProperty ("osgi.ws");
});
Clazz.defineMethod (c$, "handleException", 
($fz = function (code, e) {
if (!(Clazz.instanceOf (e, org.eclipse.core.runtime.OperationCanceledException))) {
var pluginId = this.getBundleId (code);
if (pluginId == null) pluginId = "org.eclipse.core.runtime";
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.meta_pluginProblems, pluginId);
var status;
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
status =  new org.eclipse.core.runtime.MultiStatus (pluginId, 2, message, e);
(status).merge ((e).getStatus ());
} else {
status =  new org.eclipse.core.runtime.Status (4, pluginId, 2, message, e);
}if (org.eclipse.core.internal.runtime.InternalPlatform.initialized) this.log (status);
 else e.printStackTrace ();
}code.handleException (e);
}, $fz.isPrivate = true, $fz), "org.eclipse.core.runtime.ISafeRunnable,Throwable");
Clazz.defineMethod (c$, "hasLogWriter", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.platformLog != null && org.eclipse.core.internal.runtime.InternalPlatform.logListeners.contains (org.eclipse.core.internal.runtime.InternalPlatform.platformLog);
});
Clazz.defineMethod (c$, "initializeAuthorizationHandler", 
($fz = function () {
org.eclipse.core.internal.runtime.AuthorizationHandler.setKeyringFile (org.eclipse.core.internal.runtime.InternalPlatform.keyringFile);
org.eclipse.core.internal.runtime.AuthorizationHandler.setPassword (org.eclipse.core.internal.runtime.InternalPlatform.password);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "initializeDebugFlags", 
function () {
($t$ = org.eclipse.core.internal.runtime.InternalPlatform.DEBUG = this.getBooleanOption ("org.eclipse.core.runtime/debug", false), org.eclipse.core.internal.runtime.InternalPlatform.prototype.DEBUG = org.eclipse.core.internal.runtime.InternalPlatform.DEBUG, $t$);
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG) {
($t$ = org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_CONTEXT = this.getBooleanOption ("org.eclipse.core.runtime/debug/context", false), org.eclipse.core.internal.runtime.InternalPlatform.prototype.DEBUG_CONTEXT = org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_CONTEXT, $t$);
($t$ = org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_REGISTRY = this.getBooleanOption ("org.eclipse.core.runtime/registry/debug", false), org.eclipse.core.internal.runtime.InternalPlatform.prototype.DEBUG_REGISTRY = org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_REGISTRY, $t$);
($t$ = org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_REGISTRY_DUMP = this.getOption ("org.eclipse.core.runtime/registry/debug/dump"), org.eclipse.core.internal.runtime.InternalPlatform.prototype.DEBUG_REGISTRY_DUMP = org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_REGISTRY_DUMP, $t$);
($t$ = org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL = this.getBooleanOption ("org.eclipse.core.runtime/preferences/general", false), org.eclipse.core.internal.runtime.InternalPlatform.prototype.DEBUG_PREFERENCE_GENERAL = org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GENERAL, $t$);
($t$ = org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GET = this.getBooleanOption ("org.eclipse.core.runtime/preferences/get", false), org.eclipse.core.internal.runtime.InternalPlatform.prototype.DEBUG_PREFERENCE_GET = org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_GET, $t$);
($t$ = org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_SET = this.getBooleanOption ("org.eclipse.core.runtime/preferences/set", false), org.eclipse.core.internal.runtime.InternalPlatform.prototype.DEBUG_PREFERENCE_SET = org.eclipse.core.internal.runtime.InternalPlatform.DEBUG_PREFERENCE_SET, $t$);
}});
Clazz.defineMethod (c$, "initializeLocationTrackers", 
($fz = function () {
var FILTER_PREFIX = "(&(objectClass=org.eclipse.osgi.service.datalocation.Location)(type=";
var filter = null;
try {
filter = this.context.createFilter ("(&(objectClass=org.eclipse.osgi.service.datalocation.Location)(type=osgi.configuration.area))");
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.InvalidSyntaxException)) {
} else {
throw e;
}
}
this.configurationLocation =  new org.osgi.util.tracker.ServiceTracker (this.context, filter, null);
this.configurationLocation.open ();
try {
filter = this.context.createFilter ("(&(objectClass=org.eclipse.osgi.service.datalocation.Location)(type=osgi.user.area))");
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.InvalidSyntaxException)) {
} else {
throw e;
}
}
this.userLocation =  new org.osgi.util.tracker.ServiceTracker (this.context, filter, null);
this.userLocation.open ();
try {
filter = this.context.createFilter ("(&(objectClass=org.eclipse.osgi.service.datalocation.Location)(type=osgi.instance.area))");
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.InvalidSyntaxException)) {
} else {
throw e;
}
}
this.instanceLocation =  new org.osgi.util.tracker.ServiceTracker (this.context, filter, null);
this.instanceLocation.open ();
try {
filter = this.context.createFilter ("(&(objectClass=org.eclipse.osgi.service.datalocation.Location)(type=osgi.install.area))");
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.InvalidSyntaxException)) {
} else {
throw e;
}
}
this.installLocation =  new org.osgi.util.tracker.ServiceTracker (this.context, filter, null);
this.installLocation.open ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "initializeRuntimeFileManager", 
($fz = function () {
var configuration = this.getConfigurationLocation ();
var controlledDir =  new java.io.File (configuration.getURL ().getPath () + '/' + "org.eclipse.core.runtime");
this.runtimeFileManager =  new org.eclipse.core.runtime.adaptor.FileManager (controlledDir, configuration.isReadOnly () ? "none" : null, configuration.isReadOnly ());
this.runtimeFileManager.open (!configuration.isReadOnly ());
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "isFragment", 
function (bundle) {
if (org.eclipse.core.internal.runtime.InternalPlatform.packageAdmin == null) return false;
return (org.eclipse.core.internal.runtime.InternalPlatform.packageAdmin.getBundleType (bundle) & 1) > 0;
}, "org.osgi.framework.Bundle");
Clazz.defineMethod (c$, "isRunning", 
function () {
try {
return org.eclipse.core.internal.runtime.InternalPlatform.initialized && this.context.getBundle ().getState () == 32;
} catch (e) {
if (Clazz.instanceOf (e, IllegalStateException)) {
return false;
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "knownOSArchValues", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.ARCH_LIST;
});
Clazz.defineMethod (c$, "knownOSValues", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.OS_LIST;
});
Clazz.defineMethod (c$, "knownWSValues", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.WS_LIST;
});
Clazz.defineMethod (c$, "log", 
function (status) {
if (!org.eclipse.core.internal.runtime.InternalPlatform.initialized) {
var t = status.getException ();
if (t != null) t.printStackTrace ();
this.assertInitialized ();
}var listeners;
{
listeners = org.eclipse.core.internal.runtime.InternalPlatform.logListeners.toArray ( new Array (org.eclipse.core.internal.runtime.InternalPlatform.logListeners.size ()));
}for (var i = 0; i < listeners.length; i++) {
var listener = listeners[i];
var code = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.runtime.InternalPlatform$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.runtime, "InternalPlatform$2", null, org.eclipse.core.runtime.ISafeRunnable);
Clazz.defineMethod (c$, "handleException", 
function (e) {
}, "Throwable");
Clazz.defineMethod (c$, "run", 
function () {
this.f$.listener.logging (this.f$.status, "org.eclipse.core.runtime");
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.runtime.InternalPlatform$2, i$, v$);
}) (this, Clazz.cloneFinals ("listener", listener, "status", status));
this.run (code);
}
}, "org.eclipse.core.runtime.IStatus");
Clazz.defineMethod (c$, "processCommandLine", 
($fz = function (args) {
var TRUE = "true";
if (args == null) return args;
($t$ = org.eclipse.core.internal.runtime.InternalPlatform.allArgs = args, org.eclipse.core.internal.runtime.InternalPlatform.prototype.allArgs = org.eclipse.core.internal.runtime.InternalPlatform.allArgs, $t$);
if (args.length == 0) return args;
var configArgs =  Clazz.newArray (args.length, 0);
configArgs[0] = -1;
var configArgIndex = 0;
for (var i = 0; i < args.length; i++) {
var found = false;
if (args[i].equalsIgnoreCase ("-noregistrycache")) {
System.getProperties ().setProperty ("eclipse.noRegistryCache", "true");
found = true;
}if (args[i].equalsIgnoreCase ("-noLazyRegistryCacheLoading")) {
System.getProperties ().setProperty ("eclipse.noLazyRegistryCacheLoading", "true");
found = true;
}if (args[i].equalsIgnoreCase ("-classloaderProperties")) found = true;
if (args[i].equalsIgnoreCase ("-noPackagePrefixes")) found = true;
if (args[i].equalsIgnoreCase ("-plugins")) found = true;
if (args[i].equalsIgnoreCase ("-firstUse")) found = true;
if (args[i].equalsIgnoreCase ("-noUpdate")) found = true;
if (args[i].equalsIgnoreCase ("-newUpdates")) found = true;
if (args[i].equalsIgnoreCase ("-update")) found = true;
if (found) {
configArgs[configArgIndex++] = i;
continue ;}if (i == args.length - 1 || args[i + 1].startsWith ("-")) continue ;var arg = args[++i];
if (args[i - 1].equalsIgnoreCase ("-keyring")) {
($t$ = org.eclipse.core.internal.runtime.InternalPlatform.keyringFile = arg, org.eclipse.core.internal.runtime.InternalPlatform.prototype.keyringFile = org.eclipse.core.internal.runtime.InternalPlatform.keyringFile, $t$);
found = true;
}if (args[i - 1].equalsIgnoreCase ("-password")) {
($t$ = org.eclipse.core.internal.runtime.InternalPlatform.password = arg, org.eclipse.core.internal.runtime.InternalPlatform.prototype.password = org.eclipse.core.internal.runtime.InternalPlatform.password, $t$);
found = true;
}if (args[i - 1].equalsIgnoreCase ("-product") || args[i - 1].equalsIgnoreCase ("-feature")) {
System.getProperties ().setProperty ("eclipse.product", arg);
found = true;
}if (args[i - 1].equalsIgnoreCase ("-application")) {
System.getProperties ().setProperty ("eclipse.application", arg);
found = true;
}if (args[i - 1].equalsIgnoreCase ("-plugincustomization")) {
($t$ = org.eclipse.core.internal.runtime.InternalPlatform.pluginCustomizationFile = arg, org.eclipse.core.internal.runtime.InternalPlatform.prototype.pluginCustomizationFile = org.eclipse.core.internal.runtime.InternalPlatform.pluginCustomizationFile, $t$);
found = true;
}if (args[i - 1].equalsIgnoreCase ("-classloaderProperties")) found = true;
if (args[i - 1].equalsIgnoreCase ("-boot")) found = true;
if (found) {
configArgs[configArgIndex++] = i - 1;
configArgs[configArgIndex++] = i;
}}
if (configArgIndex == 0) {
($t$ = org.eclipse.core.internal.runtime.InternalPlatform.appArgs = args, org.eclipse.core.internal.runtime.InternalPlatform.prototype.appArgs = org.eclipse.core.internal.runtime.InternalPlatform.appArgs, $t$);
return args;
}($t$ = org.eclipse.core.internal.runtime.InternalPlatform.appArgs =  new Array (args.length - configArgIndex), org.eclipse.core.internal.runtime.InternalPlatform.prototype.appArgs = org.eclipse.core.internal.runtime.InternalPlatform.appArgs, $t$);
($t$ = org.eclipse.core.internal.runtime.InternalPlatform.frameworkArgs =  new Array (configArgIndex), org.eclipse.core.internal.runtime.InternalPlatform.prototype.frameworkArgs = org.eclipse.core.internal.runtime.InternalPlatform.frameworkArgs, $t$);
configArgIndex = 0;
var j = 0;
var k = 0;
for (var i = 0; i < args.length; i++) {
if (i == configArgs[configArgIndex]) {
org.eclipse.core.internal.runtime.InternalPlatform.frameworkArgs[k++] = args[i];
configArgIndex++;
} else org.eclipse.core.internal.runtime.InternalPlatform.appArgs[j++] = args[i];
}
return org.eclipse.core.internal.runtime.InternalPlatform.appArgs;
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "readPluginPath", 
($fz = function (input) {
var ini =  new java.util.Properties ();
try {
ini.load (input);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
return null;
} else {
throw e;
}
}
var result =  new java.util.Vector (5);
for (var groups = ini.propertyNames (); groups.hasMoreElements (); ) {
var group = groups.nextElement ();
for (var entries =  new java.util.StringTokenizer (ini.getProperty (group), ";"); entries.hasMoreElements (); ) {
var entry = entries.nextElement ();
if (!entry.equals ("")) try {
result.addElement ( new java.net.URL (entry));
} catch (e) {
if (Clazz.instanceOf (e, java.net.MalformedURLException)) {
System.err.println ("Ignoring plugin: " + entry);
} else {
throw e;
}
}
}
}
return result.toArray ( new Array (result.size ()));
}, $fz.isPrivate = true, $fz), "java.io.InputStream");
Clazz.defineMethod (c$, "registerBundleGroupProvider", 
function (provider) {
this.groupProviders.add (provider);
}, "org.eclipse.core.runtime.IBundleGroupProvider");
Clazz.defineMethod (c$, "removeLogListener", 
function (listener) {
this.assertInitialized ();
{
org.eclipse.core.internal.runtime.InternalPlatform.logListeners.remove (listener);
}}, "org.eclipse.core.runtime.ILogListener");
Clazz.defineMethod (c$, "resolve", 
function (url) {
var result = this.asActualURL (url);
if (!result.getProtocol ().startsWith ("bundle")) return result;
if (org.eclipse.core.internal.runtime.InternalPlatform.urlConverter == null) {
throw  new java.io.IOException ("url.noaccess");
}result = org.eclipse.core.internal.runtime.InternalPlatform.urlConverter.convertToLocalURL (result);
return result;
}, "java.net.URL");
Clazz.defineMethod (c$, "run", 
function (code) {
org.eclipse.core.internal.runtime.Assert.isNotNull (code);
try {
code.run ();
} catch (e$$) {
if (Clazz.instanceOf (e$$, Exception)) {
var e = e$$;
{
this.handleException (code, e);
}
} else if (Clazz.instanceOf (e$$, LinkageError)) {
var e = e$$;
{
this.handleException (code, e);
}
} else {
throw e$$;
}
}
}, "org.eclipse.core.runtime.ISafeRunnable");
Clazz.defineMethod (c$, "setExtensionRegistry", 
function (value) {
this.registry = value;
}, "org.eclipse.core.runtime.IExtensionRegistry");
Clazz.defineMethod (c$, "setOption", 
function (option, value) {
if (this.options != null) this.options.setOption (option, value);
}, "~S,~S");
Clazz.defineMethod (c$, "setRuntimeInstance", 
function (runtime) {
this.runtimeInstance = runtime;
}, "org.eclipse.core.runtime.Plugin");
Clazz.defineMethod (c$, "start", 
function (runtimeContext) {
this.context = runtimeContext;
this.initializeLocationTrackers ();
org.eclipse.core.internal.runtime.ResourceTranslator.start ();
($t$ = org.eclipse.core.internal.runtime.InternalPlatform.splashHandler = this.getSplashHandler (), org.eclipse.core.internal.runtime.InternalPlatform.prototype.splashHandler = org.eclipse.core.internal.runtime.InternalPlatform.splashHandler, $t$);
this.processCommandLine (org.eclipse.core.internal.runtime.InternalPlatform.infoService.getNonFrameworkArgs ());
this.debugTracker =  new org.osgi.util.tracker.ServiceTracker (this.context, org.eclipse.osgi.service.debug.DebugOptions.getName (), null);
this.debugTracker.open ();
this.options = this.debugTracker.getService ();
this.initializeDebugFlags ();
($t$ = org.eclipse.core.internal.runtime.InternalPlatform.initialized = true, org.eclipse.core.internal.runtime.InternalPlatform.prototype.initialized = org.eclipse.core.internal.runtime.InternalPlatform.initialized, $t$);
this.getMetaArea ();
this.initializeAuthorizationHandler ();
($t$ = org.eclipse.core.internal.runtime.InternalPlatform.platformLog =  new org.eclipse.core.internal.runtime.PlatformLogWriter (this.getFrameworkLog ()), org.eclipse.core.internal.runtime.InternalPlatform.prototype.platformLog = org.eclipse.core.internal.runtime.InternalPlatform.platformLog, $t$);
this.addLogListener (org.eclipse.core.internal.runtime.InternalPlatform.platformLog);
this.initializeRuntimeFileManager ();
}, "org.osgi.framework.BundleContext");
Clazz.defineMethod (c$, "stop", 
function (bundleContext) {
this.assertInitialized ();
org.eclipse.core.internal.jobs.JobManager.shutdown ();
this.debugTracker.close ();
org.eclipse.core.internal.runtime.ResourceTranslator.stop ();
($t$ = org.eclipse.core.internal.runtime.InternalPlatform.initialized = false, org.eclipse.core.internal.runtime.InternalPlatform.prototype.initialized = org.eclipse.core.internal.runtime.InternalPlatform.initialized, $t$);
this.context = null;
}, "org.osgi.framework.BundleContext");
Clazz.defineMethod (c$, "translatePreference", 
function (value, props) {
value = value.trim ();
if (props == null || value.startsWith ("%%")) return value;
if (value.startsWith ("%")) {
var ix = value.indexOf (" ");
var key = ix == -1 ? value : value.substring (0, ix);
var dflt = ix == -1 ? value : value.substring (ix + 1);
return props.getProperty (key.substring (1), dflt);
}return value;
}, "~S,java.util.Properties");
Clazz.defineMethod (c$, "unregisterBundleGroupProvider", 
function (provider) {
this.groupProviders.remove (provider);
}, "org.eclipse.core.runtime.IBundleGroupProvider");
Clazz.defineStatics (c$,
"adapterManager", null);
c$.allArgs = c$.prototype.allArgs =  new Array (0);
c$.appArgs = c$.prototype.appArgs =  new Array (0);
Clazz.defineStatics (c$,
"APPLICATION", "-application");
c$.ARCH_LIST = c$.prototype.ARCH_LIST = ["PA_RISC", "ppc", "sparc", "x86", "x86_64", "ia64", "ia64_32"];
Clazz.defineStatics (c$,
"BOOT", "-boot",
"CLASSLOADER_PROPERTIES", "-classloaderProperties",
"DEBUG", false,
"DEBUG_CONTEXT", false,
"DEBUG_PREFERENCE_GENERAL", false,
"DEBUG_PREFERENCE_GET", false,
"DEBUG_PREFERENCE_SET", false,
"DEBUG_REGISTRY", false,
"DEBUG_REGISTRY_DUMP", null,
"splashHandler", null,
"FEATURE", "-feature",
"FIRST_USE", "-firstUse");
c$.frameworkArgs = c$.prototype.frameworkArgs =  new Array (0);
Clazz.defineStatics (c$,
"frameworkLog", null,
"infoService", null,
"initialized", false,
"KEY_DOUBLE_PREFIX", "%%",
"KEY_PREFIX", "%",
"KEYRING", "-keyring",
"keyringFile", null);
c$.logListeners = c$.prototype.logListeners =  new java.util.ArrayList (5);
c$.logs = c$.prototype.logs =  new java.util.HashMap (5);
Clazz.defineStatics (c$,
"metaArea", null,
"NEW_UPDATES", "-newUpdates",
"NO_LAZY_REGISTRY_CACHE_LOADING", "-noLazyRegistryCacheLoading",
"NO_PACKAGE_PREFIXES", "-noPackagePrefixes",
"NO_REGISTRY_CACHE", "-noregistrycache",
"NO_UPDATE", "-noUpdate");
c$.OS_LIST = c$.prototype.OS_LIST = ["aix", "hpux", "linux", "macosx", "qnx", "solaris", "win32"];
Clazz.defineStatics (c$,
"packageAdmin", null,
"password", "",
"PASSWORD", "-password",
"platformLog", null,
"PLUGIN_CUSTOMIZATION", "-plugincustomization",
"PLUGIN_PATH", ".plugin-path",
"pluginCustomizationFile", null,
"PLUGINS", "-plugins",
"PRODUCT", "-product",
"PROP_ADAPTOR", "osgi.adaptor",
"PROP_APPLICATION", "eclipse.application",
"PROP_ARCH", "osgi.arch",
"PROP_CHECK_CONFIG", "osgi.checkConfiguration",
"PROP_CONFIG_AREA", "osgi.configuration.area",
"PROP_CONSOLE", "osgi.console",
"PROP_CONSOLE_CLASS", "osgi.consoleClass",
"PROP_CONSOLE_LOG", "eclipse.consoleLog",
"PROP_DEBUG", "osgi.debug",
"PROP_DEV", "osgi.dev",
"PROP_EXITCODE", "eclipse.exitcode",
"PROP_INSTALL_AREA", "osgi.install.area",
"PROP_INSTANCE_AREA", "osgi.instance.area",
"PROP_MANIFEST_CACHE", "osgi.manifest.cache",
"PROP_NL", "osgi.nl",
"PROP_NO_LAZY_CACHE_LOADING", "eclipse.noLazyRegistryCacheLoading",
"PROP_NO_REGISTRY_CACHE", "eclipse.noRegistryCache",
"PROP_NO_REGISTRY_FLUSHING", "eclipse.noRegistryFlushing",
"PROP_OS", "osgi.os",
"PROP_PRODUCT", "eclipse.product",
"PROP_SYSPATH", "osgi.syspath",
"PROP_USER_AREA", "osgi.user.area",
"PROP_WS", "osgi.ws");
c$.singleton = c$.prototype.singleton =  new org.eclipse.core.internal.runtime.InternalPlatform ();
Clazz.defineStatics (c$,
"UPDATE", "-update",
"urlConverter", null);
c$.WS_LIST = c$.prototype.WS_LIST = ["carbon", "gtk", "motif", "photon", "win32"];
});
