Clazz.declarePackage ("org.eclipse.core.runtime.adaptor");
Clazz.load (["org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor", "org.osgi.framework.ServiceFactory", "org.eclipse.osgi.framework.adaptor.FrameworkAdaptor"], "org.eclipse.core.runtime.adaptor.EclipseAdaptor", ["java.io.BufferedInputStream", "$.BufferedOutputStream", "$.DataInputStream", "$.DataOutputStream", "$.File", "$.PrintWriter", "java.lang.Boolean", "java.util.ArrayList", "$.Hashtable", "javax.xml.parsers.DocumentBuilderFactory", "$.SAXParserFactory", "org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg", "$.EclipseElementFactory", "$.EclipseLog", "$.EclipseStarter", "$.FileManager", "$.LocationManager", "$.StreamManager", "org.eclipse.core.runtime.internal.adaptor.BasicLocation", "$.BundleLocalizationImpl", "$.BundleStopper", "$.EclipseBundleInstaller", "$.EclipseCommandProvider", "$.EclipseEnvironmentInfo", "$.PluginConverterImpl", "$.PluginParser", "$.URLConverterImpl", "org.eclipse.core.runtime.internal.stats.StatsManager", "org.eclipse.osgi.framework.adaptor.FilePath", "org.eclipse.osgi.framework.adaptor.core.InvalidVersion", "$.StateManager", "org.eclipse.osgi.framework.console.CommandProvider", "org.eclipse.osgi.framework.debug.Debug", "$.FrameworkDebugOptions", "org.eclipse.osgi.framework.log.FrameworkLog", "$.FrameworkLogEntry", "org.eclipse.osgi.service.datalocation.Location", "org.eclipse.osgi.service.environment.EnvironmentInfo", "org.eclipse.osgi.service.localization.BundleLocalization", "org.eclipse.osgi.service.pluginconversion.PluginConverter", "org.eclipse.osgi.service.resolver.PlatformAdmin", "org.eclipse.osgi.service.urlconversion.URLConverter", "org.eclipse.osgi.util.NLS", "org.osgi.framework.FrameworkEvent", "$.Version"], function () {
c$ = Clazz.decorateAsClass (function () {
this.cacheVersion = 0;
this.timeStamp = 0;
this.installPath = null;
this.exitOnError = true;
this.stopper = null;
this.fileManager = null;
this.reinitialize = false;
if (!Clazz.isClassDefined ("org.eclipse.core.runtime.adaptor.EclipseAdaptor.SaxParsingService")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.adaptor.EclipseAdaptor, "SaxParsingService", null, org.osgi.framework.ServiceFactory);
Clazz.overrideMethod (c$, "getService", 
function (a, b) {
return javax.xml.parsers.SAXParserFactory.newInstance ();
}, "org.osgi.framework.Bundle,org.osgi.framework.ServiceRegistration");
Clazz.overrideMethod (c$, "ungetService", 
function (a, b, c) {
}, "org.osgi.framework.Bundle,org.osgi.framework.ServiceRegistration,~O");
c$ = Clazz.p0p ();
}
if (!Clazz.isClassDefined ("org.eclipse.core.runtime.adaptor.EclipseAdaptor.DomParsingService")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.adaptor.EclipseAdaptor, "DomParsingService", null, org.osgi.framework.ServiceFactory);
Clazz.overrideMethod (c$, "getService", 
function (a, b) {
return javax.xml.parsers.DocumentBuilderFactory.newInstance ();
}, "org.osgi.framework.Bundle,org.osgi.framework.ServiceRegistration");
Clazz.overrideMethod (c$, "ungetService", 
function (a, b, c) {
}, "org.osgi.framework.Bundle,org.osgi.framework.ServiceRegistration,~O");
c$ = Clazz.p0p ();
}
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.adaptor, "EclipseAdaptor", org.eclipse.osgi.framework.adaptor.core.AbstractFrameworkAdaptor);
Clazz.makeConstructor (c$, 
function (args) {
Clazz.superConstructor (this, org.eclipse.core.runtime.adaptor.EclipseAdaptor, [args]);
($t$ = org.eclipse.core.runtime.adaptor.EclipseAdaptor.instance = this, org.eclipse.core.runtime.adaptor.EclipseAdaptor.prototype.instance = org.eclipse.core.runtime.adaptor.EclipseAdaptor.instance, $t$);
this.setDebugOptions ();
}, "~A");
c$.getDefault = Clazz.defineMethod (c$, "getDefault", 
function () {
return org.eclipse.core.runtime.adaptor.EclipseAdaptor.instance;
});
Clazz.defineMethod (c$, "createPerformanceLog", 
($fz = function () {
var logFileProp = System.getProperty ("osgi.logfile");
if (logFileProp != null) {
var lastSlash = logFileProp.lastIndexOf (java.io.File.separatorChar);
if (lastSlash > 0) {
var logFile = logFileProp.substring (0, lastSlash + 1) + "performance.log";
return  new org.eclipse.core.runtime.adaptor.EclipseLog ( new java.io.File (logFile));
}}return  new org.eclipse.core.runtime.adaptor.EclipseLog ( new java.io.PrintWriter (System.err));
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "initialize", 
function (publisher) {
if (Boolean.getBoolean ("osgi.clean")) this.cleanOSGiCache ();
var readOnlyConfiguration = org.eclipse.core.runtime.adaptor.LocationManager.getConfigurationLocation ().isReadOnly ();
this.fileManager = this.initFileManager (org.eclipse.core.runtime.adaptor.LocationManager.getOSGiConfigurationDir (), readOnlyConfiguration ? "none" : null, readOnlyConfiguration);
this.readHeaders ();
Clazz.superCall (this, org.eclipse.core.runtime.adaptor.EclipseAdaptor, "initialize", [publisher]);
if (System.getProperty ("org.osgi.framework.bootdelegation") == null && !"none".equals (System.getProperty ("osgi.java.profile.bootdelegation"))) System.getProperties ().put ("org.osgi.framework.bootdelegation", "*");
var installLoc = org.eclipse.core.runtime.adaptor.LocationManager.getInstallLocation ();
if (installLoc != null) {
var installURL = installLoc.getURL ();
this.installPath = installURL.getPath ();
}}, "org.eclipse.osgi.framework.adaptor.EventPublisher");
Clazz.overrideMethod (c$, "initializeMetadata", 
function () {
});
Clazz.overrideMethod (c$, "initBundleStoreRootDir", 
function () {
var configurationLocation = org.eclipse.core.runtime.adaptor.LocationManager.getOSGiConfigurationDir ();
if (configurationLocation != null) {
this.bundleStoreRootDir =  new java.io.File (configurationLocation, "bundles");
this.bundleStore = this.bundleStoreRootDir.getAbsolutePath ();
} else {
this.bundleStore = "bundles";
this.bundleStoreRootDir =  new java.io.File (this.bundleStore);
}this.properties.put ("osgi.bundlestore", this.bundleStoreRootDir.getAbsolutePath ());
});
Clazz.overrideMethod (c$, "createFrameworkLog", 
function () {
if (this.frameworkLog != null) return this.frameworkLog;
return org.eclipse.core.runtime.adaptor.EclipseStarter.createFrameworkLog ();
});
Clazz.defineMethod (c$, "findStateFiles", 
($fz = function () {
if (this.reinitialize) return  new Array (2);
var stateFile = null;
var lazyFile = null;
try {
stateFile = this.fileManager.lookup (".state", false);
lazyFile = this.fileManager.lookup (".lazy", false);
} catch (ex) {
if (Clazz.instanceOf (ex, java.io.IOException)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Error reading state file " + ex.getMessage ());
org.eclipse.osgi.framework.debug.Debug.printStackTrace (ex);
}} else {
throw ex;
}
}
if (stateFile == null || !stateFile.isFile ()) {
var parentConfiguration = null;
var currentConfiguration = org.eclipse.core.runtime.adaptor.LocationManager.getConfigurationLocation ();
if (currentConfiguration != null && (parentConfiguration = currentConfiguration.getParentLocation ()) != null) {
try {
var stateLocationDir =  new java.io.File (parentConfiguration.getURL ().getFile (), "org.eclipse.osgi");
var newFileManager = this.initFileManager (stateLocationDir, "none", true);
stateFile = newFileManager.lookup (".state", false);
lazyFile = newFileManager.lookup (".lazy", false);
} catch (ex) {
if (Clazz.instanceOf (ex, java.io.IOException)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Error reading state file " + ex.getMessage ());
org.eclipse.osgi.framework.debug.Debug.printStackTrace (ex);
}} else {
throw ex;
}
}
} else {
try {
if (this.canWrite ()) {
stateFile = this.fileManager.lookup (".state", true);
lazyFile = this.fileManager.lookup (".lazy", true);
}} catch (ex) {
if (Clazz.instanceOf (ex, java.io.IOException)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Error reading state file " + ex.getMessage ());
org.eclipse.osgi.framework.debug.Debug.printStackTrace (ex);
}} else {
throw ex;
}
}
}}return [stateFile, lazyFile];
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "createStateManager", 
function () {
var stateFiles = this.findStateFiles ();
var stateFile = stateFiles[0];
var lazyFile = stateFiles[1];
this.stateManager =  new org.eclipse.osgi.framework.adaptor.core.StateManager (stateFile, lazyFile, this.context, this.timeStamp);
this.stateManager.setInstaller ( new org.eclipse.core.runtime.internal.adaptor.EclipseBundleInstaller (this.context));
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
var toAddManifest = toAdd.getHeaders ("");
if (Clazz.instanceOf (toAddManifest, org.eclipse.core.runtime.internal.adaptor.CachedManifest)) toAddManifest = (toAddManifest).getManifest ();
var newDescription = factory.createBundleDescription (systemState, toAddManifest, toAdd.getLocation (), toAdd.getBundleId ());
systemState.addBundle (newDescription);
} catch (be) {
if (Clazz.instanceOf (be, org.osgi.framework.BundleException)) {
} else {
throw be;
}
}
}
systemState.setTimeStamp (this.timeStamp);
systemState.resolve ();
this.invalidState = false;
return this.stateManager;
});
Clazz.overrideMethod (c$, "shutdownStateManager", 
function () {
if (!this.canWrite () || this.stateManager.getCachedTimeStamp () == this.stateManager.getSystemState ().getTimeStamp ()) return ;
try {
var stateTmpFile = java.io.File.createTempFile (".state", ".new", org.eclipse.core.runtime.adaptor.LocationManager.getOSGiConfigurationDir ());
var lazyTmpFile = java.io.File.createTempFile (".lazy", ".new", org.eclipse.core.runtime.adaptor.LocationManager.getOSGiConfigurationDir ());
this.stateManager.shutdown (stateTmpFile, lazyTmpFile);
this.fileManager.lookup (".state", true);
this.fileManager.lookup (".lazy", true);
this.fileManager.update ([".state", ".lazy"], [stateTmpFile.getName (), lazyTmpFile.getName ()]);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
this.frameworkLog.log ( new org.osgi.framework.FrameworkEvent (2, this.context.getBundle (), e));
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "cleanOSGiCache", 
($fz = function () {
var osgiConfig = org.eclipse.core.runtime.adaptor.LocationManager.getOSGiConfigurationDir ();
if (!this.rm (osgiConfig)) {
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "readHeaders", 
($fz = function () {
var bundleDataStream = this.findBundleDataFile ();
if (bundleDataStream == null) return ;
try {
var $in =  new java.io.DataInputStream ( new java.io.BufferedInputStream (bundleDataStream));
try {
this.cacheVersion = $in.readByte ();
if (this.cacheVersion == 16) {
this.timeStamp = $in.readLong ();
this.initialBundleStartLevel = $in.readInt ();
this.nextId = $in.readLong ();
}} finally {
$in.close ();
}
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Error reading framework metadata: " + e.getMessage ());
org.eclipse.osgi.framework.debug.Debug.printStackTrace (e);
}} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "getElementFactory", 
function () {
if (this.elementFactory == null) this.elementFactory =  new org.eclipse.core.runtime.adaptor.EclipseElementFactory ();
return this.elementFactory;
});
Clazz.defineMethod (c$, "frameworkStart", 
function (aContext) {
org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.getDefault ();
this.registerEndorsedXMLParser (aContext);
var converter =  new org.eclipse.core.runtime.internal.adaptor.PluginConverterImpl (aContext);
Clazz.superCall (this, org.eclipse.core.runtime.adaptor.EclipseAdaptor, "frameworkStart", [aContext]);
var bundle = aContext.getBundle ();
var location;
location = org.eclipse.core.runtime.adaptor.LocationManager.getUserLocation ();
var locationProperties =  new java.util.Hashtable (1);
if (location != null) {
locationProperties.put ("type", "osgi.user.area");
aContext.registerService (org.eclipse.osgi.service.datalocation.Location.getName (), location, locationProperties);
}location = org.eclipse.core.runtime.adaptor.LocationManager.getInstanceLocation ();
if (location != null) {
locationProperties.put ("type", "osgi.instance.area");
aContext.registerService (org.eclipse.osgi.service.datalocation.Location.getName (), location, locationProperties);
}location = org.eclipse.core.runtime.adaptor.LocationManager.getConfigurationLocation ();
if (location != null) {
locationProperties.put ("type", "osgi.configuration.area");
aContext.registerService (org.eclipse.osgi.service.datalocation.Location.getName (), location, locationProperties);
}location = org.eclipse.core.runtime.adaptor.LocationManager.getInstallLocation ();
if (location != null) {
locationProperties.put ("type", "osgi.install.area");
aContext.registerService (org.eclipse.osgi.service.datalocation.Location.getName (), location, locationProperties);
}this.register (org.eclipse.osgi.service.environment.EnvironmentInfo.getName (), org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.getDefault (), bundle);
this.register (org.eclipse.osgi.service.resolver.PlatformAdmin.getName (), this.stateManager, bundle);
this.register (org.eclipse.osgi.service.pluginconversion.PluginConverter.getName (), converter, bundle);
this.register (org.eclipse.osgi.service.urlconversion.URLConverter.getName (),  new org.eclipse.core.runtime.internal.adaptor.URLConverterImpl (), bundle);
this.register (org.eclipse.osgi.framework.console.CommandProvider.getName (),  new org.eclipse.core.runtime.internal.adaptor.EclipseCommandProvider (aContext), bundle);
this.register (org.eclipse.osgi.framework.log.FrameworkLog.getName (), this.getFrameworkLog (), bundle);
this.registerPerformanceLog (bundle);
this.register (org.eclipse.osgi.service.localization.BundleLocalization.getName (),  new org.eclipse.core.runtime.internal.adaptor.BundleLocalizationImpl (), bundle);
}, "org.osgi.framework.BundleContext");
Clazz.defineMethod (c$, "registerPerformanceLog", 
($fz = function (bundle) {
var service = this.createPerformanceLog ();
var serviceName = org.eclipse.osgi.framework.log.FrameworkLog.getName ();
var serviceProperties =  new java.util.Hashtable (7);
var headers = bundle.getHeaders ();
serviceProperties.put ("service.vendor", headers.get ("Bundle-Vendor"));
serviceProperties.put ("service.ranking",  new Integer (-2147483648));
serviceProperties.put ("service.pid", bundle.getBundleId () + '.' + service.getClass ().getName ());
serviceProperties.put ("performance", Boolean.TRUE.toString ());
this.context.registerService (serviceName, service, serviceProperties);
}, $fz.isPrivate = true, $fz), "org.osgi.framework.Bundle");
Clazz.defineMethod (c$, "setDebugOptions", 
($fz = function () {
var options = org.eclipse.osgi.framework.debug.FrameworkDebugOptions.getDefault ();
if (options == null) return ;
($t$ = org.eclipse.osgi.framework.adaptor.core.StateManager.DEBUG = options != null, org.eclipse.osgi.framework.adaptor.core.StateManager.prototype.DEBUG = org.eclipse.osgi.framework.adaptor.core.StateManager.DEBUG, $t$);
($t$ = org.eclipse.osgi.framework.adaptor.core.StateManager.DEBUG_READER = options.getBooleanOption ("org.eclipse.osgi/eclipseadaptor/resolver/reader/timing", false), org.eclipse.osgi.framework.adaptor.core.StateManager.prototype.DEBUG_READER = org.eclipse.osgi.framework.adaptor.core.StateManager.DEBUG_READER, $t$);
($t$ = org.eclipse.osgi.framework.adaptor.core.StateManager.MONITOR_PLATFORM_ADMIN = options.getBooleanOption ("org.eclipse.osgi/eclipseadaptor/resolver/timing", false), org.eclipse.osgi.framework.adaptor.core.StateManager.prototype.MONITOR_PLATFORM_ADMIN = org.eclipse.osgi.framework.adaptor.core.StateManager.MONITOR_PLATFORM_ADMIN, $t$);
($t$ = org.eclipse.osgi.framework.adaptor.core.StateManager.DEBUG_PLATFORM_ADMIN = options.getBooleanOption ("org.eclipse.osgi/eclipseadaptor/debug/platformadmin", false), org.eclipse.osgi.framework.adaptor.core.StateManager.prototype.DEBUG_PLATFORM_ADMIN = org.eclipse.osgi.framework.adaptor.core.StateManager.DEBUG_PLATFORM_ADMIN, $t$);
($t$ = org.eclipse.osgi.framework.adaptor.core.StateManager.DEBUG_PLATFORM_ADMIN_RESOLVER = options.getBooleanOption ("org.eclipse.osgi/eclipseadaptor/debug/platformadmin/resolver", false), org.eclipse.osgi.framework.adaptor.core.StateManager.prototype.DEBUG_PLATFORM_ADMIN_RESOLVER = org.eclipse.osgi.framework.adaptor.core.StateManager.DEBUG_PLATFORM_ADMIN_RESOLVER, $t$);
($t$ = org.eclipse.core.runtime.internal.adaptor.PluginConverterImpl.DEBUG = options.getBooleanOption ("org.eclipse.osgi/eclipseadaptor/converter/debug", false), org.eclipse.core.runtime.internal.adaptor.PluginConverterImpl.prototype.DEBUG = org.eclipse.core.runtime.internal.adaptor.PluginConverterImpl.DEBUG, $t$);
($t$ = org.eclipse.core.runtime.internal.adaptor.BasicLocation.DEBUG = options.getBooleanOption ("org.eclipse.osgi/eclipseadaptor/debug/location", false), org.eclipse.core.runtime.internal.adaptor.BasicLocation.prototype.DEBUG = org.eclipse.core.runtime.internal.adaptor.BasicLocation.DEBUG, $t$);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "registerEndorsedXMLParser", 
($fz = function (bc) {
try {
Class.forName ("javax.xml.parsers.SAXParserFactory");
bc.registerService ("javax.xml.parsers.SAXParserFactory", Clazz.innerTypeInstance (org.eclipse.core.runtime.adaptor.EclipseAdaptor.SaxParsingService, this, null),  new java.util.Hashtable ());
Class.forName ("javax.xml.parsers.DocumentBuilderFactory");
bc.registerService ("javax.xml.parsers.DocumentBuilderFactory", Clazz.innerTypeInstance (org.eclipse.core.runtime.adaptor.EclipseAdaptor.DomParsingService, this, null),  new java.util.Hashtable ());
} catch (e) {
if (Clazz.instanceOf (e, ClassNotFoundException)) {
var message = org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_ADAPTOR_ERROR_XML_SERVICE;
this.getFrameworkLog ().log ( new org.eclipse.osgi.framework.log.FrameworkLogEntry ("org.eclipse.osgi", message, 0, e, null));
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz), "org.osgi.framework.BundleContext");
Clazz.overrideMethod (c$, "canWrite", 
function () {
return !this.fileManager.isReadOnly ();
});
Clazz.defineMethod (c$, "frameworkStop", 
function (aContext) {
this.saveMetaData ();
Clazz.superCall (this, org.eclipse.core.runtime.adaptor.EclipseAdaptor, "frameworkStop", [aContext]);
this.printStats ();
org.eclipse.core.runtime.internal.adaptor.PluginParser.releaseXMLParsing ();
this.fileManager.close ();
}, "org.osgi.framework.BundleContext");
Clazz.defineMethod (c$, "printStats", 
($fz = function () {
var debugOptions = org.eclipse.osgi.framework.debug.FrameworkDebugOptions.getDefault ();
if (debugOptions == null) return ;
var registryParsing = debugOptions.getOption ("org.eclipse.core.runtime/registry/parsing/timing/value");
if (registryParsing != null) org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.debug ("Time spent in registry parsing: " + registryParsing);
var packageAdminResolution = debugOptions.getOption ("debug.packageadmin/timing/value");
if (packageAdminResolution != null) System.out.println ("Time spent in package admin resolve: " + packageAdminResolution);
var constraintResolution = debugOptions.getOption ("org.eclipse.core.runtime.adaptor/resolver/timing/value");
if (constraintResolution != null) System.out.println ("Time spent resolving the dependency system: " + constraintResolution);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "findBundleDataFile", 
($fz = function () {
if (this.reinitialize) return null;
var streamManager =  new org.eclipse.core.runtime.adaptor.StreamManager (this.fileManager);
var bundleDataStream = null;
try {
bundleDataStream = streamManager.getInputStream (".bundledata", 0);
} catch (ex) {
if (Clazz.instanceOf (ex, java.io.IOException)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Error reading framework metadata: " + ex.getMessage ());
org.eclipse.osgi.framework.debug.Debug.printStackTrace (ex);
}} else {
throw ex;
}
}
if (bundleDataStream == null) {
var currentConfiguration = org.eclipse.core.runtime.adaptor.LocationManager.getConfigurationLocation ();
var parentConfiguration = null;
if (currentConfiguration != null && (parentConfiguration = currentConfiguration.getParentLocation ()) != null) {
try {
var bundledataLocationDir =  new java.io.File (parentConfiguration.getURL ().getFile (), "org.eclipse.osgi");
var newFileManager = this.initFileManager (bundledataLocationDir, "none", true);
bundleDataStream = streamManager.getInputStream (".bundledata", 0);
newFileManager.close ();
} catch (e$$) {
if (Clazz.instanceOf (e$$, java.net.MalformedURLException)) {
var e1 = e$$;
{
}
} else if (Clazz.instanceOf (e$$, java.io.IOException)) {
var e1 = e$$;
{
}
} else {
throw e$$;
}
}
}}return bundleDataStream;
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "getInstalledBundles", 
function () {
var bundleDataStream = this.findBundleDataFile ();
if (bundleDataStream == null) return null;
try {
var $in =  new java.io.DataInputStream ( new java.io.BufferedInputStream (bundleDataStream));
try {
var version = $in.readByte ();
if (version != 16) return null;
$in.readLong ();
$in.readInt ();
$in.readLong ();
var bundleCount = $in.readInt ();
var result =  new java.util.ArrayList (bundleCount);
var id = -1;
var bundleDiscarded = false;
for (var i = 0; i < bundleCount; i++) {
try {
id = $in.readLong ();
if (id != 0) {
var data = this.getElementFactory ().createBundleData (this, id);
this.loadMetaDataFor (data, $in, version);
data.initializeExistingBundle ();
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) org.eclipse.osgi.framework.debug.Debug.println ("BundleData created: " + data);
this.processExtension (data, 1);
result.add (data);
}} catch (e$$) {
if (Clazz.instanceOf (e$$, NumberFormatException)) {
var e = e$$;
{
bundleDiscarded = true;
}
} else if (Clazz.instanceOf (e$$, org.osgi.framework.BundleException)) {
var e = e$$;
{
bundleDiscarded = true;
}
} else if (Clazz.instanceOf (e$$, java.io.IOException)) {
var e = e$$;
{
bundleDiscarded = true;
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Error reading framework metadata: " + e.getMessage ());
org.eclipse.osgi.framework.debug.Debug.printStackTrace (e);
}}
} else {
throw e$$;
}
}
}
if (bundleDiscarded) System.getProperties ().put ("eclipse.refreshBundles", "true");
return result.toArray ( new Array (result.size ()));
} finally {
$in.close ();
}
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Error reading framework metadata: " + e.getMessage ());
org.eclipse.osgi.framework.debug.Debug.printStackTrace (e);
}} else {
throw e;
}
}
return null;
});
Clazz.defineMethod (c$, "loadMetaDataFor", 
function (data, $in, version) {
var flag = $in.readByte ();
if (flag == 0) return ;
data.setLocation (this.readString ($in, false));
data.setFileName (this.readString ($in, false));
data.setSymbolicName (this.readString ($in, false));
data.setVersion (this.loadVersion ($in));
data.setActivator (this.readString ($in, false));
data.setAutoStart ($in.readBoolean ());
var exceptionsCount = $in.readInt ();
var autoStartExceptions = exceptionsCount > 0 ?  new Array (exceptionsCount) : null;
for (var i = 0; i < exceptionsCount; i++) autoStartExceptions[i] = $in.readUTF ();

data.setAutoStartExceptions (autoStartExceptions);
data.$hasPackageInfo = $in.readBoolean ();
data.buddyList = this.readString ($in, false);
data.registeredBuddyList = this.readString ($in, false);
data.setPluginClass (this.readString ($in, false));
data.setClassPathString (this.readString ($in, false));
data.setNativePaths (this.readString ($in, false));
data.setExecutionEnvironment (this.readString ($in, false));
data.setDynamicImports (this.readString ($in, false));
data.setGeneration ($in.readInt ());
data.setStartLevel ($in.readInt ());
data.setStatus ($in.readInt ());
data.setReference ($in.readBoolean ());
data.setManifestTimeStamp ($in.readLong ());
data.setManifestType ($in.readByte ());
data.setLastModified ($in.readLong ());
data.setType ($in.readInt ());
if (data.isReference ()) {
var storedPath =  new java.io.File (data.getFileName ());
if (!storedPath.isAbsolute ()) data.setFileName ( new org.eclipse.osgi.framework.adaptor.FilePath (this.installPath + data.getFileName ()).toString ());
}}, "org.eclipse.core.runtime.adaptor.EclipseBundleData,java.io.DataInputStream,~N");
Clazz.defineMethod (c$, "loadVersion", 
($fz = function ($in) {
var versionString = this.readString ($in, false);
try {
return org.osgi.framework.Version.parseVersion (versionString);
} catch (e) {
if (Clazz.instanceOf (e, IllegalArgumentException)) {
return  new org.eclipse.osgi.framework.adaptor.core.InvalidVersion (versionString);
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz), "java.io.DataInputStream");
Clazz.defineMethod (c$, "saveMetaDataFor", 
function (data) {
if (!data.isAutoStartable ()) {
this.timeStamp--;
}}, "org.eclipse.core.runtime.adaptor.EclipseBundleData");
Clazz.defineMethod (c$, "persistInitialBundleStartLevel", 
function (value) {
this.timeStamp--;
}, "~N");
Clazz.overrideMethod (c$, "persistNextBundleID", 
function (value) {
}, "~N");
Clazz.defineMethod (c$, "saveMetaDataFor", 
function (data, out) {
if (data.getBundleID () == 0 || !(Clazz.instanceOf (data, org.eclipse.osgi.framework.adaptor.core.AbstractBundleData))) {
out.writeByte (0);
return ;
}var bundleData = data;
out.writeByte (1);
this.writeStringOrNull (out, bundleData.getLocation ());
var storedFileName = bundleData.isReference () ?  new org.eclipse.osgi.framework.adaptor.FilePath (this.installPath).makeRelative ( new org.eclipse.osgi.framework.adaptor.FilePath (bundleData.getFileName ())) : bundleData.getFileName ();
this.writeStringOrNull (out, storedFileName);
this.writeStringOrNull (out, bundleData.getSymbolicName ());
this.writeStringOrNull (out, bundleData.getVersion ().toString ());
this.writeStringOrNull (out, bundleData.getActivator ());
out.writeBoolean (bundleData.isAutoStart ());
var autoStartExceptions = bundleData.getAutoStartExceptions ();
if (autoStartExceptions == null) out.writeInt (0);
 else {
out.writeInt (autoStartExceptions.length);
for (var i = 0; i < autoStartExceptions.length; i++) out.writeUTF (autoStartExceptions[i]);

}out.writeBoolean (bundleData.$hasPackageInfo);
this.writeStringOrNull (out, bundleData.buddyList);
this.writeStringOrNull (out, bundleData.registeredBuddyList);
this.writeStringOrNull (out, bundleData.getPluginClass ());
this.writeStringOrNull (out, bundleData.getClassPathString ());
this.writeStringOrNull (out, bundleData.getNativePathsString ());
this.writeStringOrNull (out, bundleData.getExecutionEnvironment ());
this.writeStringOrNull (out, bundleData.getDynamicImports ());
out.writeInt (bundleData.getGeneration ());
out.writeInt (bundleData.getStartLevel ());
out.writeInt (bundleData.getPersistentStatus ());
out.writeBoolean (bundleData.isReference ());
out.writeLong (bundleData.getManifestTimeStamp ());
out.writeByte (bundleData.getManifestType ());
out.writeLong (bundleData.getLastModified ());
out.writeInt (bundleData.getType ());
}, "org.eclipse.osgi.framework.adaptor.BundleData,java.io.DataOutputStream");
Clazz.defineMethod (c$, "readString", 
($fz = function ($in, intern) {
var type = $in.readByte ();
if (type == 0) return null;
return intern ? $in.readUTF ().intern () : $in.readUTF ();
}, $fz.isPrivate = true, $fz), "java.io.DataInputStream,~B");
Clazz.defineMethod (c$, "writeStringOrNull", 
($fz = function (out, string) {
if (string == null) out.writeByte (0);
 else {
out.writeByte (1);
out.writeUTF (string);
}}, $fz.isPrivate = true, $fz), "java.io.DataOutputStream,~S");
Clazz.defineMethod (c$, "saveMetaData", 
function () {
if ( new Boolean (!this.canWrite () | this.timeStamp == this.stateManager.getSystemState ().getTimeStamp ()).valueOf ()) return ;
var streamManager =  new org.eclipse.core.runtime.adaptor.StreamManager (this.fileManager);
try {
var fmos = streamManager.getOutputStream (".bundledata");
var out =  new java.io.DataOutputStream ( new java.io.BufferedOutputStream (fmos));
var error = true;
try {
out.writeByte (16);
out.writeLong (this.stateManager.getSystemState ().getTimeStamp ());
out.writeInt (this.initialBundleStartLevel);
out.writeLong (this.nextId);
var bundles = this.context.getBundles ();
out.writeInt (bundles.length);
for (var i = 0; i < bundles.length; i++) {
var id = bundles[i].getBundleId ();
out.writeLong (id);
if (id != 0) {
var data = (bundles[i]).getBundleData ();
this.saveMetaDataFor (data, out);
}}
out.close ();
error = false;
} finally {
if (error) {
fmos.abort ();
try {
out.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}}
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
this.frameworkLog.log ( new org.osgi.framework.FrameworkEvent (2, this.context.getBundle (), e));
return ;
} else {
throw e;
}
}
});
Clazz.overrideMethod (c$, "getBundleWatcher", 
function () {
return org.eclipse.core.runtime.internal.stats.StatsManager.getDefault ();
});
Clazz.defineMethod (c$, "getContext", 
function () {
return this.context;
});
Clazz.defineMethod (c$, "frameworkStopping", 
function (aContext) {
Clazz.superCall (this, org.eclipse.core.runtime.adaptor.EclipseAdaptor, "frameworkStopping", [aContext]);
this.stopper =  new org.eclipse.core.runtime.internal.adaptor.BundleStopper (this.context);
this.stopper.stopBundles ();
}, "org.osgi.framework.BundleContext");
Clazz.defineMethod (c$, "isFatalException", 
($fz = function (error) {
if (Clazz.instanceOf (error, VirtualMachineError)) {
return true;
}if (Clazz.instanceOf (error, ThreadDeath)) {
return true;
}return false;
}, $fz.isPrivate = true, $fz), "Throwable");
Clazz.overrideMethod (c$, "handleRuntimeError", 
function (error) {
try {
this.exitOnError = Boolean.$valueOf (System.getProperty ("eclipse.exitOnError", "true")).booleanValue ();
var message = org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_ADAPTOR_RUNTIME_ERROR;
if (this.exitOnError && this.isFatalException (error)) message += ' ' + org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_ADAPTOR_EXITING;
var logEntry =  new org.eclipse.osgi.framework.log.FrameworkLogEntry ("org.eclipse.osgi", message, 0, error, null);
this.getFrameworkLog ().log (logEntry);
} catch (t) {
if (Clazz.instanceOf (t, Throwable)) {
try {
error.printStackTrace ();
t.printStackTrace ();
} catch (t1) {
if (Clazz.instanceOf (t1, Throwable)) {
} else {
throw t1;
}
}
} else {
throw t;
}
} finally {
if (this.exitOnError && this.isFatalException (error)) System.exit (13);
}
}, "Throwable");
Clazz.defineMethod (c$, "setLog", 
function (log) {
this.frameworkLog = log;
}, "org.eclipse.osgi.framework.log.FrameworkLog");
Clazz.defineMethod (c$, "getBundleStopper", 
function () {
return this.stopper;
});
Clazz.defineMethod (c$, "initFileManager", 
($fz = function (baseDir, lockMode, readOnly) {
var fManager =  new org.eclipse.core.runtime.adaptor.FileManager (baseDir, lockMode, readOnly);
try {
fManager.open (!readOnly);
} catch (ex) {
if (Clazz.instanceOf (ex, java.io.IOException)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Error reading framework metadata: " + ex.getMessage ());
org.eclipse.osgi.framework.debug.Debug.printStackTrace (ex);
}var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_STARTUP_FILEMANAGER_OPEN_ERROR, ex.getMessage ());
var logEntry =  new org.eclipse.osgi.framework.log.FrameworkLogEntry ("org.eclipse.osgi", message, 0, ex, null);
this.getFrameworkLog ().log (logEntry);
} else {
throw ex;
}
}
return fManager;
}, $fz.isPrivate = true, $fz), "java.io.File,~S,~B");
Clazz.defineStatics (c$,
"PROP_CLEAN", "osgi.clean",
"PROP_EXITONERROR", "eclipse.exitOnError",
"F_LOG", ".log",
"PLUGIN_CLASS", "Plugin-Class",
"ECLIPSE_AUTOSTART", "Eclipse-AutoStart",
"ECLIPSE_AUTOSTART_EXCEPTIONS", "exceptions",
"SAXFACTORYNAME", "javax.xml.parsers.SAXParserFactory",
"DOMFACTORYNAME", "javax.xml.parsers.DocumentBuilderFactory");
c$.RUNTIME_ADAPTOR = c$.prototype.RUNTIME_ADAPTOR = "org.eclipse.osgi/eclipseadaptor";
c$.OPTION_PLATFORM_ADMIN = c$.prototype.OPTION_PLATFORM_ADMIN = "org.eclipse.osgi/eclipseadaptor/debug/platformadmin";
c$.OPTION_PLATFORM_ADMIN_RESOLVER = c$.prototype.OPTION_PLATFORM_ADMIN_RESOLVER = "org.eclipse.osgi/eclipseadaptor/debug/platformadmin/resolver";
c$.OPTION_MONITOR_PLATFORM_ADMIN = c$.prototype.OPTION_MONITOR_PLATFORM_ADMIN = "org.eclipse.osgi/eclipseadaptor/resolver/timing";
c$.OPTION_RESOLVER_READER = c$.prototype.OPTION_RESOLVER_READER = "org.eclipse.osgi/eclipseadaptor/resolver/reader/timing";
c$.OPTION_CONVERTER = c$.prototype.OPTION_CONVERTER = "org.eclipse.osgi/eclipseadaptor/converter/debug";
c$.OPTION_LOCATION = c$.prototype.OPTION_LOCATION = "org.eclipse.osgi/eclipseadaptor/debug/location";
Clazz.defineStatics (c$,
"BUNDLEDATA_VERSION", 16,
"NULL", 0,
"OBJECT", 1,
"instance", null);
});
