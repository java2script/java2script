Clazz.declarePackage ("org.eclipse.core.runtime");
Clazz.load (["org.eclipse.core.internal.runtime.Messages"], "org.eclipse.core.runtime.Platform", ["java.lang.IllegalStateException", "java.util.HashMap"], function () {
c$ = Clazz.declareType (org.eclipse.core.runtime, "Platform");
c$.addAuthorizationInfo = Clazz.defineMethod (c$, "addAuthorizationInfo", 
function (serverUrl, realm, authScheme, info) {
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().addAuthorizationInfo (serverUrl, realm, authScheme, info);
}, "java.net.URL,~S,~S,java.util.Map");
c$.addLogListener = Clazz.defineMethod (c$, "addLogListener", 
function (listener) {
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().addLogListener (listener);
}, "org.eclipse.core.runtime.ILogListener");
c$.addProtectionSpace = Clazz.defineMethod (c$, "addProtectionSpace", 
function (resourceUrl, realm) {
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().addProtectionSpace (resourceUrl, realm);
}, "java.net.URL,~S");
c$.asLocalURL = Clazz.defineMethod (c$, "asLocalURL", 
function (url) {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().asLocalURL (url);
}, "java.net.URL");
c$.endSplash = Clazz.defineMethod (c$, "endSplash", 
function () {
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().endSplash ();
});
c$.flushAuthorizationInfo = Clazz.defineMethod (c$, "flushAuthorizationInfo", 
function (serverUrl, realm, authScheme) {
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().flushAuthorizationInfo (serverUrl, realm, authScheme);
}, "java.net.URL,~S,~S");
c$.getAdapterManager = Clazz.defineMethod (c$, "getAdapterManager", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getAdapterManager ();
});
c$.getAuthorizationInfo = Clazz.defineMethod (c$, "getAuthorizationInfo", 
function (serverUrl, realm, authScheme) {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getAuthorizationInfo (serverUrl, realm, authScheme);
}, "java.net.URL,~S,~S");
c$.getCommandLineArgs = Clazz.defineMethod (c$, "getCommandLineArgs", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getCommandLineArgs ();
});
c$.getContentTypeManager = Clazz.defineMethod (c$, "getContentTypeManager", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getContentTypeManager ();
});
c$.getDebugOption = Clazz.defineMethod (c$, "getDebugOption", 
function (option) {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getOption (option);
}, "~S");
c$.getLocation = Clazz.defineMethod (c$, "getLocation", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getLocation ();
});
c$.getLogFileLocation = Clazz.defineMethod (c$, "getLogFileLocation", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getMetaArea ().getLogLocation ();
});
c$.getPlugin = Clazz.defineMethod (c$, "getPlugin", 
function (id) {
try {
var registry = org.eclipse.core.runtime.Platform.getPluginRegistry ();
if (registry == null) throw  new IllegalStateException ();
var pd = registry.getPluginDescriptor (id);
if (pd == null) return null;
return pd.getPlugin ();
} catch (e) {
if (Clazz.instanceOf (e, org.eclipse.core.runtime.CoreException)) {
} else {
throw e;
}
}
return null;
}, "~S");
c$.getPluginRegistry = Clazz.defineMethod (c$, "getPluginRegistry", 
function () {
var compatibility = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getBundle ("org.eclipse.core.runtime.compatibility");
if (compatibility == null) throw  new IllegalStateException ();
var oldInternalPlatform = null;
try {
oldInternalPlatform = compatibility.loadClass ("org.eclipse.core.internal.plugins.InternalPlatform");
var getPluginRegistry = oldInternalPlatform.getMethod ("getPluginRegistry", [null]);
return getPluginRegistry.invoke (oldInternalPlatform, [null]);
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
} else {
throw e;
}
}
return null;
});
c$.getPluginStateLocation = Clazz.defineMethod (c$, "getPluginStateLocation", 
function (plugin) {
return plugin.getStateLocation ();
}, "org.eclipse.core.runtime.Plugin");
c$.getProtectionSpace = Clazz.defineMethod (c$, "getProtectionSpace", 
function (resourceUrl) {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getProtectionSpace (resourceUrl);
}, "java.net.URL");
c$.removeLogListener = Clazz.defineMethod (c$, "removeLogListener", 
function (listener) {
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().removeLogListener (listener);
}, "org.eclipse.core.runtime.ILogListener");
c$.resolve = Clazz.defineMethod (c$, "resolve", 
function (url) {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().resolve (url);
}, "java.net.URL");
c$.run = Clazz.defineMethod (c$, "run", 
function (runnable) {
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().run (runnable);
}, "org.eclipse.core.runtime.ISafeRunnable");
c$.getJobManager = Clazz.defineMethod (c$, "getJobManager", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getJobManager ();
});
c$.getExtensionRegistry = Clazz.defineMethod (c$, "getExtensionRegistry", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getRegistry ();
});
c$.find = Clazz.defineMethod (c$, "find", 
function (bundle, path) {
return org.eclipse.core.internal.runtime.FindSupport.find (bundle, path, null);
}, "org.osgi.framework.Bundle,org.eclipse.core.runtime.IPath");
c$.find = Clazz.defineMethod (c$, "find", 
function (bundle, path, override) {
return org.eclipse.core.internal.runtime.FindSupport.find (bundle, path, override);
}, "org.osgi.framework.Bundle,org.eclipse.core.runtime.IPath,java.util.Map");
c$.getStateLocation = Clazz.defineMethod (c$, "getStateLocation", 
function (bundle) {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getStateLocation (bundle);
}, "org.osgi.framework.Bundle");
c$.getStateStamp = Clazz.defineMethod (c$, "getStateStamp", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getStateTimeStamp ();
});
c$.getLog = Clazz.defineMethod (c$, "getLog", 
function (bundle) {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getLog (bundle);
}, "org.osgi.framework.Bundle");
c$.getResourceBundle = Clazz.defineMethod (c$, "getResourceBundle", 
function (bundle) {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getResourceBundle (bundle);
}, "org.osgi.framework.Bundle");
c$.getResourceString = Clazz.defineMethod (c$, "getResourceString", 
function (bundle, value) {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getResourceString (bundle, value);
}, "org.osgi.framework.Bundle,~S");
c$.getResourceString = Clazz.defineMethod (c$, "getResourceString", 
function (bundle, value, resourceBundle) {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getResourceString (bundle, value, resourceBundle);
}, "org.osgi.framework.Bundle,~S,java.util.ResourceBundle");
c$.getOSArch = Clazz.defineMethod (c$, "getOSArch", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getOSArch ();
});
c$.getNL = Clazz.defineMethod (c$, "getNL", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getNL ();
});
c$.getOS = Clazz.defineMethod (c$, "getOS", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getOS ();
});
c$.getWS = Clazz.defineMethod (c$, "getWS", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getWS ();
});
c$.getApplicationArgs = Clazz.defineMethod (c$, "getApplicationArgs", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getApplicationArgs ();
});
c$.getPlatformAdmin = Clazz.defineMethod (c$, "getPlatformAdmin", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getPlatformAdmin ();
});
c$.getInstanceLocation = Clazz.defineMethod (c$, "getInstanceLocation", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getInstanceLocation ();
});
c$.getBundleGroupProviders = Clazz.defineMethod (c$, "getBundleGroupProviders", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getBundleGroupProviders ();
});
c$.getPreferencesService = Clazz.defineMethod (c$, "getPreferencesService", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getPreferencesService ();
});
c$.getProduct = Clazz.defineMethod (c$, "getProduct", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getProduct ();
});
c$.registerBundleGroupProvider = Clazz.defineMethod (c$, "registerBundleGroupProvider", 
function (provider) {
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().registerBundleGroupProvider (provider);
}, "org.eclipse.core.runtime.IBundleGroupProvider");
c$.unregisterBundleGroupProvider = Clazz.defineMethod (c$, "unregisterBundleGroupProvider", 
function (provider) {
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().unregisterBundleGroupProvider (provider);
}, "org.eclipse.core.runtime.IBundleGroupProvider");
c$.getConfigurationLocation = Clazz.defineMethod (c$, "getConfigurationLocation", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getConfigurationLocation ();
});
c$.getUserLocation = Clazz.defineMethod (c$, "getUserLocation", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getUserLocation ();
});
c$.getInstallLocation = Clazz.defineMethod (c$, "getInstallLocation", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getInstallLocation ();
});
c$.isFragment = Clazz.defineMethod (c$, "isFragment", 
function (bundle) {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().isFragment (bundle);
}, "org.osgi.framework.Bundle");
c$.getFragments = Clazz.defineMethod (c$, "getFragments", 
function (bundle) {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getFragments (bundle);
}, "org.osgi.framework.Bundle");
c$.getBundle = Clazz.defineMethod (c$, "getBundle", 
function (symbolicName) {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getBundle (symbolicName);
}, "~S");
c$.getBundles = Clazz.defineMethod (c$, "getBundles", 
function (symbolicName, version) {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getBundles (symbolicName, version);
}, "~S,~S");
c$.getHosts = Clazz.defineMethod (c$, "getHosts", 
function (bundle) {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getHosts (bundle);
}, "org.osgi.framework.Bundle");
c$.isRunning = Clazz.defineMethod (c$, "isRunning", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().isRunning ();
});
c$.knownOSArchValues = Clazz.defineMethod (c$, "knownOSArchValues", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().knownOSArchValues ();
});
c$.knownOSValues = Clazz.defineMethod (c$, "knownOSValues", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().knownOSValues ();
});
c$.knownPlatformLineSeparators = Clazz.defineMethod (c$, "knownPlatformLineSeparators", 
function () {
var result =  new java.util.HashMap ();
result.put (org.eclipse.core.runtime.Platform.LINE_SEPARATOR_KEY_MAC_OS_9, "\r");
result.put (org.eclipse.core.runtime.Platform.LINE_SEPARATOR_KEY_UNIX, "\n");
result.put (org.eclipse.core.runtime.Platform.LINE_SEPARATOR_KEY_WINDOWS, "\r\n");
return result;
});
c$.knownWSValues = Clazz.defineMethod (c$, "knownWSValues", 
function () {
return org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().knownWSValues ();
});
c$.inDebugMode = Clazz.defineMethod (c$, "inDebugMode", 
function () {
return System.getProperty ("osgi.debug") != null;
});
c$.inDevelopmentMode = Clazz.defineMethod (c$, "inDevelopmentMode", 
function () {
return System.getProperty ("osgi.dev") != null;
});
Clazz.defineStatics (c$,
"PI_RUNTIME", "org.eclipse.core.runtime",
"PT_APPLICATIONS", "applications",
"PT_ADAPTERS", "adapters",
"PT_PREFERENCES", "preferences",
"PT_PRODUCT", "products");
c$.OPTION_STARTTIME = c$.prototype.OPTION_STARTTIME = "org.eclipse.core.runtime/starttime";
Clazz.defineStatics (c$,
"PREF_PLATFORM_PERFORMANCE", "runtime.performance",
"PREF_LINE_SEPARATOR", "line.separator",
"MIN_PERFORMANCE", 1,
"MAX_PERFORMANCE", 5,
"PARSE_PROBLEM", 1,
"PLUGIN_ERROR", 2,
"INTERNAL_ERROR", 3,
"FAILED_READ_METADATA", 4,
"FAILED_WRITE_METADATA", 5,
"FAILED_DELETE_METADATA", 6,
"OS_WIN32", "win32",
"OS_LINUX", "linux",
"OS_AIX", "aix",
"OS_SOLARIS", "solaris",
"OS_HPUX", "hpux",
"OS_QNX", "qnx",
"OS_MACOSX", "macosx",
"OS_UNKNOWN", "unknown",
"ARCH_X86", "x86",
"ARCH_PA_RISC", "PA_RISC",
"ARCH_PPC", "ppc",
"ARCH_SPARC", "sparc",
"ARCH_X86_64", "x86_64");
c$.ARCH_AMD64 = c$.prototype.ARCH_AMD64 = "x86_64";
Clazz.defineStatics (c$,
"ARCH_IA64", "ia64",
"ARCH_IA64_32", "ia64_32",
"WS_WIN32", "win32",
"WS_MOTIF", "motif",
"WS_GTK", "gtk",
"WS_PHOTON", "photon",
"WS_CARBON", "carbon",
"WS_UNKNOWN", "unknown");
c$.LINE_SEPARATOR_KEY_MAC_OS_9 = c$.prototype.LINE_SEPARATOR_KEY_MAC_OS_9 = org.eclipse.core.internal.runtime.Messages.line_separator_platform_mac_os_9;
c$.LINE_SEPARATOR_KEY_UNIX = c$.prototype.LINE_SEPARATOR_KEY_UNIX = org.eclipse.core.internal.runtime.Messages.line_separator_platform_unix;
c$.LINE_SEPARATOR_KEY_WINDOWS = c$.prototype.LINE_SEPARATOR_KEY_WINDOWS = org.eclipse.core.internal.runtime.Messages.line_separator_platform_windows;
Clazz.defineStatics (c$,
"LINE_SEPARATOR_VALUE_CR", "\r",
"LINE_SEPARATOR_VALUE_LF", "\n",
"LINE_SEPARATOR_VALUE_CRLF", "\r\n");
});
