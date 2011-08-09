Clazz.declarePackage ("org.eclipse.core.runtime.adaptor");
Clazz.load (null, "org.eclipse.core.runtime.adaptor.EclipseStarter", ["java.io.File", "java.lang.Boolean", "$.Character", "$.ClassLoader", "$.IllegalStateException", "$.Long", "$.StringBuffer", "$.Thread", "java.net.URL", "java.util.ArrayList", "$.Hashtable", "$.Properties", "$.StringTokenizer", "$.Vector", "org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg", "$.EclipseLog", "$.LocationManager", "org.eclipse.core.runtime.internal.adaptor.ContextFinder", "$.EclipseEnvironmentInfo", "$.Semaphore", "org.eclipse.core.runtime.internal.stats.StatsManager", "org.eclipse.osgi.framework.adaptor.FilePath", "org.eclipse.osgi.framework.internal.core.OSGi", "org.eclipse.osgi.framework.log.FrameworkLogEntry", "org.eclipse.osgi.internal.profile.Profile", "org.eclipse.osgi.service.runnable.ParameterizedRunnable", "org.eclipse.osgi.util.NLS", "org.osgi.framework.FrameworkListener", "org.osgi.service.packageadmin.PackageAdmin", "org.osgi.service.startlevel.StartLevel", "org.osgi.util.tracker.ServiceTracker"], function () {
c$ = Clazz.declareType (org.eclipse.core.runtime.adaptor, "EclipseStarter");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.locationString = null;
this.location = null;
this.level = 0;
this.start = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.adaptor.EclipseStarter, "InitialBundle");
Clazz.makeConstructor (c$, 
function (a, b, c, d) {
this.locationString = a;
this.location = b;
this.level = c;
this.start = d;
}, "~S,java.net.URL,~N,~B");
c$ = Clazz.p0p ();
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
var url = org.eclipse.core.runtime.adaptor.EclipseStarter.getProtectionDomain ().getCodeSource ().getLocation ();
System.getProperties ().put ("osgi.framework", url.toExternalForm ());
var filePart = url.getFile ();
System.getProperties ().put ("osgi.install.area", filePart.substring (0, filePart.lastIndexOf ('/')));
System.getProperties ().put ("osgi.noShutdown", "true");
org.eclipse.core.runtime.adaptor.EclipseStarter.run (args, null);
}, "~A");
c$.run = Clazz.defineMethod (c$, "run", 
function (args, endSplashHandler) {
if (true && org.eclipse.osgi.internal.profile.Profile.STARTUP) org.eclipse.osgi.internal.profile.Profile.logEnter ("EclipseStarter.run()", null);
if (org.eclipse.core.runtime.adaptor.EclipseStarter.running) throw  new IllegalStateException (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_STARTUP_ALREADY_RUNNING);
var startupFailed = true;
try {
org.eclipse.core.runtime.adaptor.EclipseStarter.startup (args, endSplashHandler);
startupFailed = false;
if (Boolean.getBoolean ("eclipse.ignoreApp")) return null;
return org.eclipse.core.runtime.adaptor.EclipseStarter.run (null);
} catch (e) {
if (Clazz.instanceOf (e, Throwable)) {
if (endSplashHandler != null) endSplashHandler.run ();
var logEntry =  new org.eclipse.osgi.framework.log.FrameworkLogEntry ("org.eclipse.osgi", startupFailed ? org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_STARTUP_STARTUP_ERROR : org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_STARTUP_APP_ERROR, 1, e, null);
if (org.eclipse.core.runtime.adaptor.EclipseStarter.log != null) {
org.eclipse.core.runtime.adaptor.EclipseStarter.log.log (logEntry);
org.eclipse.core.runtime.adaptor.EclipseStarter.logUnresolvedBundles (org.eclipse.core.runtime.adaptor.EclipseStarter.context.getBundles ());
} else e.printStackTrace ();
} else {
throw e;
}
} finally {
try {
if (!Boolean.getBoolean ("osgi.noShutdown")) org.eclipse.core.runtime.adaptor.EclipseStarter.shutdown ();
} catch (e) {
if (Clazz.instanceOf (e, Throwable)) {
var logEntry =  new org.eclipse.osgi.framework.log.FrameworkLogEntry ("org.eclipse.osgi", org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_STARTUP_SHUTDOWN_ERROR, 1, e, null);
if (org.eclipse.core.runtime.adaptor.EclipseStarter.log != null) org.eclipse.core.runtime.adaptor.EclipseStarter.log.log (logEntry);
 else e.printStackTrace ();
} else {
throw e;
}
}
if (true && org.eclipse.osgi.internal.profile.Profile.STARTUP) org.eclipse.osgi.internal.profile.Profile.logExit ("EclipseStarter.run()");
if (true) {
var report = org.eclipse.osgi.internal.profile.Profile.getProfileLog ();
if (report != null && report.length > 0) System.out.println (report);
}}
if (Boolean.getBoolean ("osgi.forcedRestart")) {
System.getProperties ().put ("eclipse.exitcode", "23");
return null;
}System.getProperties ().put ("eclipse.exitcode", "13");
System.getProperties ().put ("eclipse.exitdata", org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_STARTUP_ERROR_CHECK_LOG, org.eclipse.core.runtime.adaptor.EclipseStarter.log.getFile ().getPath ()));
return null;
}, "~A,Runnable");
c$.isRunning = Clazz.defineMethod (c$, "isRunning", 
function () {
return org.eclipse.core.runtime.adaptor.EclipseStarter.running;
});
c$.createFrameworkLog = Clazz.defineMethod (c$, "createFrameworkLog", 
function () {
var frameworkLog;
var logFileProp = System.getProperty ("osgi.logfile");
if (logFileProp != null) {
frameworkLog =  new org.eclipse.core.runtime.adaptor.EclipseLog ( new java.io.File (logFileProp));
} else {
var location = org.eclipse.core.runtime.adaptor.LocationManager.getConfigurationLocation ();
var configAreaDirectory = null;
if (location != null) configAreaDirectory =  new java.io.File (location.getURL ().getFile ());
if (configAreaDirectory != null) {
var logFileName = Long.toString (System.currentTimeMillis ()) + ".log";
var logFile =  new java.io.File (configAreaDirectory, logFileName);
System.getProperties ().put ("osgi.logfile", logFile.getAbsolutePath ());
frameworkLog =  new org.eclipse.core.runtime.adaptor.EclipseLog (logFile);
} else frameworkLog =  new org.eclipse.core.runtime.adaptor.EclipseLog ();
}if ("true".equals (System.getProperty ("eclipse.consoleLog"))) frameworkLog.setConsoleLog (true);
return frameworkLog;
});
c$.startup = Clazz.defineMethod (c$, "startup", 
function (args, endSplashHandler) {
if (true && org.eclipse.osgi.internal.profile.Profile.STARTUP) org.eclipse.osgi.internal.profile.Profile.logEnter ("EclipseStarter.startup()", null);
if (org.eclipse.core.runtime.adaptor.EclipseStarter.running) throw  new IllegalStateException (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_STARTUP_ALREADY_RUNNING);
org.eclipse.core.runtime.adaptor.EclipseStarter.processCommandLine (args);
org.eclipse.core.runtime.adaptor.LocationManager.initializeLocations ();
($t$ = org.eclipse.core.runtime.adaptor.EclipseStarter.log = org.eclipse.core.runtime.adaptor.EclipseStarter.createFrameworkLog (), org.eclipse.core.runtime.adaptor.EclipseStarter.prototype.log = org.eclipse.core.runtime.adaptor.EclipseStarter.log, $t$);
org.eclipse.core.runtime.adaptor.EclipseStarter.initializeContextFinder ();
org.eclipse.core.runtime.adaptor.EclipseStarter.loadConfigurationInfo ();
org.eclipse.core.runtime.adaptor.EclipseStarter.finalizeProperties ();
if (true) org.eclipse.osgi.internal.profile.Profile.initProps ();
if (true && org.eclipse.osgi.internal.profile.Profile.STARTUP) org.eclipse.osgi.internal.profile.Profile.logTime ("EclipseStarter.startup()", "props inited");
($t$ = org.eclipse.core.runtime.adaptor.EclipseStarter.adaptor = org.eclipse.core.runtime.adaptor.EclipseStarter.createAdaptor (), org.eclipse.core.runtime.adaptor.EclipseStarter.prototype.adaptor = org.eclipse.core.runtime.adaptor.EclipseStarter.adaptor, $t$);
if (true && org.eclipse.osgi.internal.profile.Profile.STARTUP) org.eclipse.osgi.internal.profile.Profile.logTime ("EclipseStarter.startup()", "adapter created");
(org.eclipse.core.runtime.adaptor.EclipseStarter.adaptor).setLog (org.eclipse.core.runtime.adaptor.EclipseStarter.log);
if (true && org.eclipse.osgi.internal.profile.Profile.STARTUP) org.eclipse.osgi.internal.profile.Profile.logTime ("EclipseStarter.startup()", "adapter log set");
var osgi =  new org.eclipse.osgi.framework.internal.core.OSGi (org.eclipse.core.runtime.adaptor.EclipseStarter.adaptor);
if (true && org.eclipse.osgi.internal.profile.Profile.STARTUP) org.eclipse.osgi.internal.profile.Profile.logTime ("EclipseStarter.startup()", "OSGi created");
osgi.launch ();
if (true && org.eclipse.osgi.internal.profile.Profile.STARTUP) org.eclipse.osgi.internal.profile.Profile.logTime ("EclipseStarter.startup()", "osgi launched");
var console = System.getProperty ("osgi.console");
if (console != null) {
org.eclipse.core.runtime.adaptor.EclipseStarter.startConsole (osgi,  new Array (0), console);
if (true && org.eclipse.osgi.internal.profile.Profile.STARTUP) org.eclipse.osgi.internal.profile.Profile.logTime ("EclipseStarter.startup()", "console started");
}($t$ = org.eclipse.core.runtime.adaptor.EclipseStarter.context = osgi.getBundleContext (), org.eclipse.core.runtime.adaptor.EclipseStarter.prototype.context = org.eclipse.core.runtime.adaptor.EclipseStarter.context, $t$);
org.eclipse.core.runtime.adaptor.EclipseStarter.publishSplashScreen (endSplashHandler);
if (true && org.eclipse.osgi.internal.profile.Profile.STARTUP) org.eclipse.osgi.internal.profile.Profile.logTime ("EclipseStarter.startup()", "loading basic bundles");
var startBundles = org.eclipse.core.runtime.adaptor.EclipseStarter.loadBasicBundles ();
org.eclipse.core.runtime.adaptor.EclipseStarter.setStartLevel (org.eclipse.core.runtime.adaptor.EclipseStarter.getStartLevel ());
if ("true".equals (System.getProperty ("eclipse.refreshBundles"))) org.eclipse.core.runtime.adaptor.EclipseStarter.refreshPackages (org.eclipse.core.runtime.adaptor.EclipseStarter.getCurrentBundles (false));
if (true && org.eclipse.osgi.internal.profile.Profile.STARTUP) org.eclipse.osgi.internal.profile.Profile.logTime ("EclipseStarter.startup()", "StartLevel set");
org.eclipse.core.runtime.adaptor.EclipseStarter.ensureBundlesActive (startBundles);
if (org.eclipse.core.runtime.adaptor.EclipseStarter.debug || System.getProperty ("osgi.dev") != null) org.eclipse.core.runtime.adaptor.EclipseStarter.logUnresolvedBundles (org.eclipse.core.runtime.adaptor.EclipseStarter.context.getBundles ());
($t$ = org.eclipse.core.runtime.adaptor.EclipseStarter.running = true, org.eclipse.core.runtime.adaptor.EclipseStarter.prototype.running = org.eclipse.core.runtime.adaptor.EclipseStarter.running, $t$);
if (true && org.eclipse.osgi.internal.profile.Profile.STARTUP) org.eclipse.osgi.internal.profile.Profile.logExit ("EclipseStarter.startup()");
}, "~A,Runnable");
c$.initializeContextFinder = Clazz.defineMethod (c$, "initializeContextFinder", 
($fz = function () {
var current = Thread.currentThread ();
try {
var getContextClassLoader = Thread.getMethod ("getContextClassLoader", [null]);
var setContextClassLoader = Thread.getMethod ("setContextClassLoader", [ClassLoader]);
var params = [ new org.eclipse.core.runtime.internal.adaptor.ContextFinder (getContextClassLoader.invoke (current, [null]))];
setContextClassLoader.invoke (current, params);
return ;
} catch (e$$) {
if (Clazz.instanceOf (e$$, SecurityException)) {
var e = e$$;
{
}
} else if (Clazz.instanceOf (e$$, NoSuchMethodException)) {
var e = e$$;
{
}
} else if (Clazz.instanceOf (e$$, IllegalArgumentException)) {
var e = e$$;
{
}
} else if (Clazz.instanceOf (e$$, IllegalAccessException)) {
var e = e$$;
{
}
} else if (Clazz.instanceOf (e$$, java.lang.reflect.InvocationTargetException)) {
var e = e$$;
{
}
} else {
throw e$$;
}
}
var entry =  new org.eclipse.osgi.framework.log.FrameworkLogEntry ("org.eclipse.osgi", org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_CLASSLOADER_CANNOT_SET_CONTEXTFINDER, null), 0, null, null);
org.eclipse.core.runtime.adaptor.EclipseStarter.log.log (entry);
}, $fz.isPrivate = true, $fz));
c$.getStartLevel = Clazz.defineMethod (c$, "getStartLevel", 
($fz = function () {
var level = System.getProperty ("osgi.startLevel");
if (level != null) try {
return Integer.parseInt (level);
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
if (org.eclipse.core.runtime.adaptor.EclipseStarter.debug) System.out.println ("Start level = " + level + "  parsed. Using hardcoded default: 6");
} else {
throw e;
}
}
return 6;
}, $fz.isPrivate = true, $fz));
c$.run = Clazz.defineMethod (c$, "run", 
function (argument) {
if (true && org.eclipse.osgi.internal.profile.Profile.STARTUP) org.eclipse.osgi.internal.profile.Profile.logEnter ("EclipseStarter.run(Object)()", null);
if (!org.eclipse.core.runtime.adaptor.EclipseStarter.running) throw  new IllegalStateException (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_STARTUP_NOT_RUNNING);
if (org.eclipse.core.runtime.adaptor.EclipseStarter.initialize) return  new Integer (0);
org.eclipse.core.runtime.adaptor.EclipseStarter.initializeApplicationTracker ();
if (true && org.eclipse.osgi.internal.profile.Profile.STARTUP) org.eclipse.osgi.internal.profile.Profile.logTime ("EclipseStarter.run(Object)()", "applicaton tracker initialized");
var application = org.eclipse.core.runtime.adaptor.EclipseStarter.applicationTracker.getService ();
org.eclipse.core.runtime.adaptor.EclipseStarter.applicationTracker.close ();
if (application == null) throw  new IllegalStateException (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_STARTUP_ERROR_NO_APPLICATION);
if (org.eclipse.core.runtime.adaptor.EclipseStarter.debug) {
var timeString = System.getProperty ("eclipse.startTime");
var time = timeString == null ? 0 : Long.parseLong (timeString);
System.out.println ("Starting application: " + (System.currentTimeMillis () - time));
}if (true && (org.eclipse.osgi.internal.profile.Profile.STARTUP || org.eclipse.osgi.internal.profile.Profile.BENCHMARK)) org.eclipse.osgi.internal.profile.Profile.logTime ("EclipseStarter.run(Object)()", "framework initialized! starting application...");
try {
return application.run (argument);
} finally {
if (true && org.eclipse.osgi.internal.profile.Profile.STARTUP) org.eclipse.osgi.internal.profile.Profile.logExit ("EclipseStarter.run(Object)()");
}
}, "~O");
c$.shutdown = Clazz.defineMethod (c$, "shutdown", 
function () {
if (!org.eclipse.core.runtime.adaptor.EclipseStarter.running) return ;
org.eclipse.core.runtime.adaptor.EclipseStarter.stopSystemBundle ();
});
c$.ensureBundlesActive = Clazz.defineMethod (c$, "ensureBundlesActive", 
($fz = function (bundles) {
for (var i = 0; i < bundles.length; i++) {
if (bundles[i].getState () != 32) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_STARTUP_ERROR_BUNDLE_NOT_ACTIVE, bundles[i]);
throw  new IllegalStateException (message);
}}
}, $fz.isPrivate = true, $fz), "~A");
c$.logUnresolvedBundles = Clazz.defineMethod (c$, "logUnresolvedBundles", 
($fz = function (bundles) {
var state = org.eclipse.core.runtime.adaptor.EclipseStarter.adaptor.getState ();
var logService = org.eclipse.core.runtime.adaptor.EclipseStarter.adaptor.getFrameworkLog ();
var stateHelper = org.eclipse.core.runtime.adaptor.EclipseStarter.adaptor.getPlatformAdmin ().getStateHelper ();
for (var i = 0; i < bundles.length; i++) if (bundles[i].getState () == 2) {
var generalMessage = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_STARTUP_ERROR_BUNDLE_NOT_RESOLVED, bundles[i]);
var description = state.getBundle (bundles[i].getBundleId ());
if (description == null) continue ;var logChildren = null;
var unsatisfied = stateHelper.getUnsatisfiedConstraints (description);
if (unsatisfied.length > 0) {
logChildren =  new Array (unsatisfied.length);
for (var j = 0; j < unsatisfied.length; j++) logChildren[j] =  new org.eclipse.osgi.framework.log.FrameworkLogEntry ("org.eclipse.osgi", org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.getResolutionFailureMessage (unsatisfied[j]), 0, null, null);

} else if (description.getSymbolicName () != null) {
var homonyms = state.getBundles (description.getSymbolicName ());
for (var j = 0; j < homonyms.length; j++) if (homonyms[j].isResolved ()) {
logChildren =  new Array (1);
logChildren[0] =  new org.eclipse.osgi.framework.log.FrameworkLogEntry ("org.eclipse.osgi", org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_CONSOLE_OTHER_VERSION, homonyms[j].getLocation ()), 0, null, null);
}
}logService.log ( new org.eclipse.osgi.framework.log.FrameworkLogEntry ("org.eclipse.osgi", generalMessage, 0, null, logChildren));
}
}, $fz.isPrivate = true, $fz), "~A");
c$.publishSplashScreen = Clazz.defineMethod (c$, "publishSplashScreen", 
($fz = function (endSplashHandler) {
var properties =  new java.util.Hashtable ();
properties.put ("name", "splashscreen");
var handler = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.runtime.adaptor.EclipseStarter$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.runtime.adaptor, "EclipseStarter$1", null, Runnable);
Clazz.defineMethod (c$, "run", 
function () {
org.eclipse.core.runtime.internal.stats.StatsManager.doneBooting ();
this.f$.endSplashHandler.run ();
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.runtime.adaptor.EclipseStarter$1, i$, v$);
}) (this, Clazz.cloneFinals ("endSplashHandler", endSplashHandler));
org.eclipse.core.runtime.adaptor.EclipseStarter.context.registerService (Runnable.getName (), handler, properties);
}, $fz.isPrivate = true, $fz), "Runnable");
c$.searchForBundle = Clazz.defineMethod (c$, "searchForBundle", 
($fz = function (name, parent) {
var url = null;
var fileLocation = null;
var reference = false;
try {
var child =  new java.net.URL (name);
url =  new java.net.URL ( new java.io.File (parent).toURL (), name);
} catch (e) {
if (Clazz.instanceOf (e, java.net.MalformedURLException)) {
var child =  new java.io.File (name);
fileLocation = child.isAbsolute () ? child :  new java.io.File (parent, name);
url =  new java.net.URL ("reference", null, fileLocation.toURL ().toExternalForm ());
reference = true;
} else {
throw e;
}
}
if (!reference) {
var baseURL = url;
if (url.getProtocol ().equals ("reference")) {
reference = true;
var baseSpec = url.getFile ();
if (baseSpec.startsWith ("file:")) {
var child =  new java.io.File (baseSpec.substring (5));
baseURL = child.isAbsolute () ? child.toURL () :  new java.io.File (parent, child.getPath ()).toURL ();
} else baseURL =  new java.net.URL (baseSpec);
}fileLocation =  new java.io.File (baseURL.getFile ());
if (!fileLocation.isAbsolute ()) fileLocation =  new java.io.File (parent, fileLocation.toString ());
}if (reference) {
var result = org.eclipse.core.runtime.adaptor.EclipseStarter.searchFor (fileLocation.getName (),  new java.io.File (fileLocation.getParent ()).getAbsolutePath ());
if (result != null) url =  new java.net.URL ("reference", null, "file:" + result);
 else return null;
}try {
var result = url.openConnection ();
result.connect ();
return url;
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
return null;
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz), "~S,~S");
c$.loadBasicBundles = Clazz.defineMethod (c$, "loadBasicBundles", 
($fz = function () {
var startTime = System.currentTimeMillis ();
var osgiBundles = System.getProperty ("osgi.bundles");
var osgiExtensions = System.getProperty ("osgi.framework.extensions");
if (osgiExtensions != null && osgiExtensions.length > 0) {
osgiBundles = osgiExtensions + ',' + osgiBundles;
System.getProperties ().put ("osgi.bundles", osgiBundles);
}var installEntries = org.eclipse.core.runtime.adaptor.EclipseStarter.getArrayFromList (osgiBundles, ",");
var initialBundles = org.eclipse.core.runtime.adaptor.EclipseStarter.getInitialBundles (installEntries);
var curInitBundles = org.eclipse.core.runtime.adaptor.EclipseStarter.getCurrentBundles (true);
var toRefresh =  new java.util.ArrayList (curInitBundles.length);
org.eclipse.core.runtime.adaptor.EclipseStarter.uninstallBundles (curInitBundles, initialBundles, toRefresh);
var startBundles =  new java.util.ArrayList (installEntries.length);
org.eclipse.core.runtime.adaptor.EclipseStarter.installBundles (initialBundles, curInitBundles, startBundles, toRefresh);
if (!toRefresh.isEmpty ()) org.eclipse.core.runtime.adaptor.EclipseStarter.refreshPackages (toRefresh.toArray ( new Array (toRefresh.size ())));
var startInitBundles = startBundles.toArray ( new Array (startBundles.size ()));
org.eclipse.core.runtime.adaptor.EclipseStarter.startBundles (startInitBundles);
if (org.eclipse.core.runtime.adaptor.EclipseStarter.debug) System.out.println ("Time to load bundles: " + (System.currentTimeMillis () - startTime));
return startInitBundles;
}, $fz.isPrivate = true, $fz));
c$.getInitialBundles = Clazz.defineMethod (c$, "getInitialBundles", 
($fz = function (installEntries) {
var result =  new java.util.ArrayList (installEntries.length);
var defaultStartLevel = Integer.parseInt (System.getProperty ("osgi.bundles.defaultStartLevel", "4"));
var syspath = org.eclipse.core.runtime.adaptor.EclipseStarter.getSysPath ();
for (var i = 0; i < installEntries.length; i++) {
var name = installEntries[i];
var level = defaultStartLevel;
var start = false;
var index = name.indexOf ('@');
if (index >= 0) {
var attributes = org.eclipse.core.runtime.adaptor.EclipseStarter.getArrayFromList (name.substring (index + 1, name.length), ":");
name = name.substring (0, index);
for (var j = 0; j < attributes.length; j++) {
var attribute = attributes[j];
if (attribute.equals ("start")) start = true;
 else level = Integer.parseInt (attribute);
}
}var location = org.eclipse.core.runtime.adaptor.EclipseStarter.searchForBundle (name, syspath);
if (location == null) {
var entry =  new org.eclipse.osgi.framework.log.FrameworkLogEntry ("org.eclipse.osgi", org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_STARTUP_BUNDLE_NOT_FOUND, installEntries[i]), 0, null, null);
org.eclipse.core.runtime.adaptor.EclipseStarter.log.log (entry);
continue ;}location = org.eclipse.core.runtime.adaptor.EclipseStarter.makeRelative (org.eclipse.core.runtime.adaptor.LocationManager.getInstallLocation ().getURL (), location);
var locationString = "initial@" + location.toExternalForm ();
result.add ( new org.eclipse.core.runtime.adaptor.EclipseStarter.InitialBundle (locationString, location, level, start));
}
return result.toArray ( new Array (result.size ()));
}, $fz.isPrivate = true, $fz), "~A");
c$.refreshPackages = Clazz.defineMethod (c$, "refreshPackages", 
($fz = function (bundles) {
var packageAdminRef = org.eclipse.core.runtime.adaptor.EclipseStarter.context.getServiceReference (org.osgi.service.packageadmin.PackageAdmin.getName ());
var packageAdmin = null;
if (packageAdminRef != null) {
packageAdmin = org.eclipse.core.runtime.adaptor.EclipseStarter.context.getService (packageAdminRef);
if (packageAdmin == null) return ;
}var semaphore =  new org.eclipse.core.runtime.internal.adaptor.Semaphore (0);
var listener = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.runtime.adaptor.EclipseStarter$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.runtime.adaptor, "EclipseStarter$2", null, org.osgi.framework.FrameworkListener);
Clazz.overrideMethod (c$, "frameworkEvent", 
function (event) {
if (event.getType () == 4) this.f$.semaphore.release ();
}, "org.osgi.framework.FrameworkEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.runtime.adaptor.EclipseStarter$2, i$, v$);
}) (this, Clazz.cloneFinals ("semaphore", semaphore));
org.eclipse.core.runtime.adaptor.EclipseStarter.context.addFrameworkListener (listener);
packageAdmin.refreshPackages (bundles);
semaphore.acquire ();
org.eclipse.core.runtime.adaptor.EclipseStarter.context.removeFrameworkListener (listener);
org.eclipse.core.runtime.adaptor.EclipseStarter.context.ungetService (packageAdminRef);
}, $fz.isPrivate = true, $fz), "~A");
c$.startConsole = Clazz.defineMethod (c$, "startConsole", 
($fz = function (osgi, consoleArgs, consolePort) {
try {
var consoleClassName = System.getProperty ("osgi.consoleClass", "org.eclipse.osgi.framework.internal.core.FrameworkConsole");
var consoleClass = Class.forName (consoleClassName);
var parameterTypes;
var parameters;
if (consolePort.length == 0) {
parameterTypes = [org.eclipse.osgi.framework.internal.core.OSGi, Array];
parameters = [osgi, consoleArgs];
} else {
parameterTypes = [org.eclipse.osgi.framework.internal.core.OSGi, Number, Array];
parameters = [osgi,  new Integer (consolePort), consoleArgs];
}var constructor = consoleClass.getConstructor (parameterTypes);
var console = constructor.newInstance (parameters);
var t =  new Thread ((console), "OSGi Console");
t.start ();
} catch (e$$) {
if (Clazz.instanceOf (e$$, NumberFormatException)) {
var nfe = e$$;
{
System.err.println (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_STARTUP_INVALID_PORT, consolePort));
}
} else if (Clazz.instanceOf (e$$, Exception)) {
var ex = e$$;
{
System.out.println (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_STARTUP_FAILED_FIND, "OSGi Console"));
}
} else {
throw e$$;
}
}
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.framework.internal.core.OSGi,~A,~S");
c$.createAdaptor = Clazz.defineMethod (c$, "createAdaptor", 
($fz = function () {
var adaptorClassName = System.getProperty ("osgi.adaptor", "org.eclipse.core.runtime.adaptor.EclipseAdaptor");
var adaptorClass = Class.forName (adaptorClassName);
var constructorArgs = [Array];
var constructor = adaptorClass.getConstructor (constructorArgs);
return constructor.newInstance ([ new Array (0)]);
}, $fz.isPrivate = true, $fz));
c$.processCommandLine = Clazz.defineMethod (c$, "processCommandLine", 
($fz = function (args) {
org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.setAllArgs (args);
if (args.length == 0) {
org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.setFrameworkArgs (args);
org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.setAllArgs (args);
return args;
}var configArgs =  Clazz.newArray (args.length, 0);
configArgs[0] = -1;
var configArgIndex = 0;
for (var i = 0; i < args.length; i++) {
var found = false;
if (args[i].equalsIgnoreCase ("-debug") && ((i + 1 == args.length) || ((i + 1 < args.length) && (args[i + 1].startsWith ("-"))))) {
System.getProperties ().put ("osgi.debug", "");
($t$ = org.eclipse.core.runtime.adaptor.EclipseStarter.debug = true, org.eclipse.core.runtime.adaptor.EclipseStarter.prototype.debug = org.eclipse.core.runtime.adaptor.EclipseStarter.debug, $t$);
found = true;
}if (args[i].equalsIgnoreCase ("-dev") && ((i + 1 == args.length) || ((i + 1 < args.length) && (args[i + 1].startsWith ("-"))))) {
System.getProperties ().put ("osgi.dev", "");
found = true;
}if (args[i].equalsIgnoreCase ("-initialize")) {
($t$ = org.eclipse.core.runtime.adaptor.EclipseStarter.initialize = true, org.eclipse.core.runtime.adaptor.EclipseStarter.prototype.initialize = org.eclipse.core.runtime.adaptor.EclipseStarter.initialize, $t$);
found = true;
}if (args[i].equalsIgnoreCase ("-clean")) {
System.getProperties ().put ("osgi.clean", "true");
found = true;
}if (args[i].equalsIgnoreCase ("-consoleLog")) {
System.getProperties ().put ("eclipse.consoleLog", "true");
found = true;
}if (args[i].equalsIgnoreCase ("-console") && ((i + 1 == args.length) || ((i + 1 < args.length) && (args[i + 1].startsWith ("-"))))) {
System.getProperties ().put ("osgi.console", "");
found = true;
}if (args[i].equalsIgnoreCase ("-noExit")) {
System.getProperties ().put ("osgi.noShutdown", "true");
found = true;
}if (found) {
configArgs[configArgIndex++] = i;
continue ;}if (i == args.length - 1 || args[i + 1].startsWith ("-")) {
continue ;}var arg = args[++i];
if (args[i - 1].equalsIgnoreCase ("-console")) {
System.getProperties ().put ("osgi.console", arg);
found = true;
}if (args[i - 1].equalsIgnoreCase ("-configuration")) {
System.getProperties ().put ("osgi.configuration.area", arg);
found = true;
}if (args[i - 1].equalsIgnoreCase ("-data")) {
System.getProperties ().put ("osgi.instance.area", arg);
found = true;
}if (args[i - 1].equalsIgnoreCase ("-user")) {
System.getProperties ().put ("osgi.user.area", arg);
found = true;
}if (args[i - 1].equalsIgnoreCase ("-dev")) {
System.getProperties ().put ("osgi.dev", arg);
found = true;
}if (args[i - 1].equalsIgnoreCase ("-debug")) {
System.getProperties ().put ("osgi.debug", arg);
($t$ = org.eclipse.core.runtime.adaptor.EclipseStarter.debug = true, org.eclipse.core.runtime.adaptor.EclipseStarter.prototype.debug = org.eclipse.core.runtime.adaptor.EclipseStarter.debug, $t$);
found = true;
}if (args[i - 1].equalsIgnoreCase ("-ws")) {
System.getProperties ().put ("osgi.ws", arg);
found = true;
}if (args[i - 1].equalsIgnoreCase ("-os")) {
System.getProperties ().put ("osgi.os", arg);
found = true;
}if (args[i - 1].equalsIgnoreCase ("-arch")) {
System.getProperties ().put ("osgi.arch", arg);
found = true;
}if (args[i - 1].equalsIgnoreCase ("-nl")) {
System.getProperties ().put ("osgi.nl", arg);
found = true;
}if (found) {
configArgs[configArgIndex++] = i - 1;
configArgs[configArgIndex++] = i;
}}
if (configArgIndex == 0) {
org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.setFrameworkArgs ( new Array (0));
org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.setAppArgs (args);
return args;
}var appArgs =  new Array (args.length - configArgIndex);
var frameworkArgs =  new Array (configArgIndex);
configArgIndex = 0;
var j = 0;
var k = 0;
for (var i = 0; i < args.length; i++) {
if (i == configArgs[configArgIndex]) {
frameworkArgs[k++] = args[i];
configArgIndex++;
} else appArgs[j++] = args[i];
}
org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.setFrameworkArgs (frameworkArgs);
org.eclipse.core.runtime.internal.adaptor.EclipseEnvironmentInfo.setAppArgs (appArgs);
return appArgs;
}, $fz.isPrivate = true, $fz), "~A");
c$.getArrayFromList = Clazz.defineMethod (c$, "getArrayFromList", 
($fz = function (prop, separator) {
if (prop == null || prop.trim ().equals ("")) return  new Array (0);
var list =  new java.util.Vector ();
var tokens =  new java.util.StringTokenizer (prop, separator);
while (tokens.hasMoreTokens ()) {
var token = tokens.nextToken ().trim ();
if (!token.equals ("")) list.addElement (token);
}
return list.isEmpty () ?  new Array (0) : list.toArray ( new Array (list.size ()));
}, $fz.isPrivate = true, $fz), "~S,~S");
c$.getSysPath = Clazz.defineMethod (c$, "getSysPath", 
function () {
var result = System.getProperty ("osgi.syspath");
if (result != null) return result;
result = org.eclipse.core.runtime.adaptor.EclipseStarter.getSysPathFromURL (System.getProperty ("osgi.framework"));
if (result == null) result = org.eclipse.core.runtime.adaptor.EclipseStarter.getSysPathFromCodeSource ();
if (result == null) throw  new IllegalStateException ("Can not find the system path.");
if (Character.isUpperCase (result.charAt (0))) {
var chars = result.toCharArray ();
chars[0] = Character.toLowerCase (chars[0]);
result =  String.instantialize (chars);
}System.getProperties ().put ("osgi.syspath", result);
return result;
});
c$.getSysPathFromURL = Clazz.defineMethod (c$, "getSysPathFromURL", 
($fz = function (urlSpec) {
if (urlSpec == null) return null;
var url = null;
try {
url =  new java.net.URL (urlSpec);
} catch (e) {
if (Clazz.instanceOf (e, java.net.MalformedURLException)) {
return null;
} else {
throw e;
}
}
var fwkFile =  new java.io.File (url.getFile ());
fwkFile =  new java.io.File (fwkFile.getAbsolutePath ());
fwkFile =  new java.io.File (fwkFile.getParent ());
return fwkFile.getAbsolutePath ();
}, $fz.isPrivate = true, $fz), "~S");
c$.getSysPathFromCodeSource = Clazz.defineMethod (c$, "getSysPathFromCodeSource", 
($fz = function () {
var pd = org.eclipse.core.runtime.adaptor.EclipseStarter.getProtectionDomain ();
if (pd == null) return null;
var cs = pd.getCodeSource ();
if (cs == null) return null;
var url = cs.getLocation ();
if (url == null) return null;
var result = url.getFile ();
if (result.endsWith (".jar")) {
result = result.substring (0, result.lastIndexOf ('/'));
if ("folder".equals (System.getProperty ("osgi.framework.shape"))) result = result.substring (0, result.lastIndexOf ('/'));
} else {
if (result.endsWith ("/")) result = result.substring (0, result.length - 1);
result = result.substring (0, result.lastIndexOf ('/'));
result = result.substring (0, result.lastIndexOf ('/'));
}return result;
}, $fz.isPrivate = true, $fz));
c$.getCurrentBundles = Clazz.defineMethod (c$, "getCurrentBundles", 
($fz = function (includeInitial) {
var installed = org.eclipse.core.runtime.adaptor.EclipseStarter.context.getBundles ();
var initial =  new java.util.ArrayList ();
for (var i = 0; i < installed.length; i++) {
var bundle = installed[i];
if (bundle.getLocation ().startsWith ("initial@")) {
if (includeInitial) initial.add (bundle);
} else if (!includeInitial && bundle.getBundleId () != 0) initial.add (bundle);
}
return initial.toArray ( new Array (initial.size ()));
}, $fz.isPrivate = true, $fz), "~B");
c$.getBundleByLocation = Clazz.defineMethod (c$, "getBundleByLocation", 
($fz = function (location, bundles) {
for (var i = 0; i < bundles.length; i++) {
var bundle = bundles[i];
if (location.equalsIgnoreCase (bundle.getLocation ())) return bundle;
}
return null;
}, $fz.isPrivate = true, $fz), "~S,~A");
c$.uninstallBundles = Clazz.defineMethod (c$, "uninstallBundles", 
($fz = function (curInitBundles, newInitBundles, toRefresh) {
for (var i = 0; i < curInitBundles.length; i++) {
var found = false;
for (var j = 0; j < newInitBundles.length; j++) {
if (curInitBundles[i].getLocation ().equalsIgnoreCase (newInitBundles[j].locationString)) {
found = true;
break;
}}
if (!found) try {
curInitBundles[i].uninstall ();
toRefresh.add (curInitBundles[i]);
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.BundleException)) {
var entry =  new org.eclipse.osgi.framework.log.FrameworkLogEntry ("org.eclipse.osgi", org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_STARTUP_FAILED_UNINSTALL, curInitBundles[i].getLocation ()), 0, e, null);
org.eclipse.core.runtime.adaptor.EclipseStarter.log.log (entry);
} else {
throw e;
}
}
}
}, $fz.isPrivate = true, $fz), "~A,~A,java.util.List");
c$.installBundles = Clazz.defineMethod (c$, "installBundles", 
($fz = function (initialBundles, curInitBundles, startBundles, toRefresh) {
var reference = org.eclipse.core.runtime.adaptor.EclipseStarter.context.getServiceReference (org.osgi.service.startlevel.StartLevel.getName ());
var startService = null;
if (reference != null) startService = org.eclipse.core.runtime.adaptor.EclipseStarter.context.getService (reference);
for (var i = 0; i < initialBundles.length; i++) {
var osgiBundle = org.eclipse.core.runtime.adaptor.EclipseStarter.getBundleByLocation (initialBundles[i].locationString, curInitBundles);
try {
if (osgiBundle == null) {
var $in = initialBundles[i].location.openStream ();
osgiBundle = org.eclipse.core.runtime.adaptor.EclipseStarter.context.installBundle (initialBundles[i].locationString, $in);
if (initialBundles[i].level >= 0 && startService != null) startService.setBundleStartLevel (osgiBundle, initialBundles[i].level);
}if (initialBundles[i].start) startBundles.add (osgiBundle);
if ((osgiBundle.getState () & 2) != 0) toRefresh.add (osgiBundle);
} catch (e$$) {
if (Clazz.instanceOf (e$$, org.osgi.framework.BundleException)) {
var e = e$$;
{
var entry =  new org.eclipse.osgi.framework.log.FrameworkLogEntry ("org.eclipse.osgi", org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_STARTUP_FAILED_INSTALL, initialBundles[i].location), 0, e, null);
org.eclipse.core.runtime.adaptor.EclipseStarter.log.log (entry);
}
} else if (Clazz.instanceOf (e$$, java.io.IOException)) {
var e = e$$;
{
var entry =  new org.eclipse.osgi.framework.log.FrameworkLogEntry ("org.eclipse.osgi", org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_STARTUP_FAILED_INSTALL, initialBundles[i].location), 0, e, null);
org.eclipse.core.runtime.adaptor.EclipseStarter.log.log (entry);
}
} else {
throw e$$;
}
}
}
org.eclipse.core.runtime.adaptor.EclipseStarter.context.ungetService (reference);
}, $fz.isPrivate = true, $fz), "~A,~A,java.util.ArrayList,java.util.List");
c$.startBundles = Clazz.defineMethod (c$, "startBundles", 
($fz = function (bundles) {
for (var i = 0; i < bundles.length; i++) {
var bundle = bundles[i];
if (bundle.getState () == 2) throw  new IllegalStateException (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_STARTUP_ERROR_BUNDLE_NOT_RESOLVED, bundle.getLocation ()));
try {
bundle.start ();
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.BundleException)) {
var entry =  new org.eclipse.osgi.framework.log.FrameworkLogEntry ("org.eclipse.osgi", org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_STARTUP_FAILED_START, bundle.getLocation ()), 0, e, null);
org.eclipse.core.runtime.adaptor.EclipseStarter.log.log (entry);
} else {
throw e;
}
}
}
}, $fz.isPrivate = true, $fz), "~A");
c$.initializeApplicationTracker = Clazz.defineMethod (c$, "initializeApplicationTracker", 
($fz = function () {
var filter = null;
try {
var appClass = org.eclipse.osgi.service.runnable.ParameterizedRunnable.getName ();
filter = org.eclipse.core.runtime.adaptor.EclipseStarter.context.createFilter ("(&(objectClass=" + appClass + ")(eclipse.application=*))");
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.InvalidSyntaxException)) {
} else {
throw e;
}
}
($t$ = org.eclipse.core.runtime.adaptor.EclipseStarter.applicationTracker =  new org.osgi.util.tracker.ServiceTracker (org.eclipse.core.runtime.adaptor.EclipseStarter.context, filter, null), org.eclipse.core.runtime.adaptor.EclipseStarter.prototype.applicationTracker = org.eclipse.core.runtime.adaptor.EclipseStarter.applicationTracker, $t$);
org.eclipse.core.runtime.adaptor.EclipseStarter.applicationTracker.open ();
}, $fz.isPrivate = true, $fz));
c$.loadConfigurationInfo = Clazz.defineMethod (c$, "loadConfigurationInfo", 
($fz = function () {
var configArea = org.eclipse.core.runtime.adaptor.LocationManager.getConfigurationLocation ();
if (configArea == null) return ;
var location = null;
try {
location =  new java.net.URL (configArea.getURL ().toExternalForm () + "config.ini");
} catch (e) {
if (Clazz.instanceOf (e, java.net.MalformedURLException)) {
} else {
throw e;
}
}
org.eclipse.core.runtime.adaptor.EclipseStarter.mergeProperties (System.getProperties (), org.eclipse.core.runtime.adaptor.EclipseStarter.loadProperties (location));
}, $fz.isPrivate = true, $fz));
c$.loadProperties = Clazz.defineMethod (c$, "loadProperties", 
($fz = function (location) {
var result =  new java.util.Properties ();
if (location == null) return result;
try {
var $in = location.openStream ();
try {
result.load ($in);
} finally {
$in.close ();
}
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
return result;
}, $fz.isPrivate = true, $fz), "java.net.URL");
c$.makeRelative = Clazz.defineMethod (c$, "makeRelative", 
($fz = function (base, location) {
if (base == null) return location;
if (!"file".equals (base.getProtocol ())) return location;
var reference = location.getProtocol ().equals ("reference");
var nonReferenceLocation = location;
if (reference) nonReferenceLocation =  new java.net.URL (location.getPath ());
if (!base.getProtocol ().equals (nonReferenceLocation.getProtocol ())) return location;
var locationPath =  new java.io.File (nonReferenceLocation.getPath ());
if (!locationPath.isAbsolute ()) return location;
var relativePath = org.eclipse.core.runtime.adaptor.EclipseStarter.makeRelative ( new java.io.File (base.getPath ()), locationPath);
var urlPath = relativePath.getPath ();
if ((java.io.File.separatorChar).charCodeAt (0) != ('/').charCodeAt (0)) urlPath = urlPath.$replace (java.io.File.separatorChar, '/');
if (nonReferenceLocation.getPath ().endsWith ("/")) urlPath += ('/').charCodeAt (0);
var relativeURL =  new java.net.URL (base.getProtocol (), base.getHost (), base.getPort (), urlPath);
if (reference) relativeURL =  new java.net.URL ("reference:" + relativeURL.toExternalForm ());
return relativeURL;
}, $fz.isPrivate = true, $fz), "java.net.URL,java.net.URL");
c$.makeRelative = Clazz.defineMethod (c$, "makeRelative", 
($fz = function (base, location) {
if (!location.isAbsolute ()) return location;
var relative =  new java.io.File ( new org.eclipse.osgi.framework.adaptor.FilePath (base).makeRelative ( new org.eclipse.osgi.framework.adaptor.FilePath (location)));
return relative;
}, $fz.isPrivate = true, $fz), "java.io.File,java.io.File");
c$.mergeProperties = Clazz.defineMethod (c$, "mergeProperties", 
($fz = function (destination, source) {
for (var e = source.keys (); e.hasMoreElements (); ) {
var key = e.nextElement ();
var value = source.getProperty (key);
if (destination.getProperty (key) == null) destination.put (key, value);
}
}, $fz.isPrivate = true, $fz), "java.util.Properties,java.util.Properties");
c$.stopSystemBundle = Clazz.defineMethod (c$, "stopSystemBundle", 
($fz = function () {
if (org.eclipse.core.runtime.adaptor.EclipseStarter.context == null || !org.eclipse.core.runtime.adaptor.EclipseStarter.running) return ;
var systemBundle = org.eclipse.core.runtime.adaptor.EclipseStarter.context.getBundle (0);
if (systemBundle.getState () == 32) {
var semaphore =  new org.eclipse.core.runtime.internal.adaptor.Semaphore (0);
var listener = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.runtime.adaptor.EclipseStarter$3")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.runtime.adaptor, "EclipseStarter$3", null, org.osgi.framework.FrameworkListener);
Clazz.overrideMethod (c$, "frameworkEvent", 
function (event) {
if (event.getType () == 8) this.f$.semaphore.release ();
}, "org.osgi.framework.FrameworkEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.runtime.adaptor.EclipseStarter$3, i$, v$);
}) (this, Clazz.cloneFinals ("semaphore", semaphore));
org.eclipse.core.runtime.adaptor.EclipseStarter.context.addFrameworkListener (listener);
systemBundle.stop ();
semaphore.acquire ();
org.eclipse.core.runtime.adaptor.EclipseStarter.context.removeFrameworkListener (listener);
}($t$ = org.eclipse.core.runtime.adaptor.EclipseStarter.context = null, org.eclipse.core.runtime.adaptor.EclipseStarter.prototype.context = org.eclipse.core.runtime.adaptor.EclipseStarter.context, $t$);
($t$ = org.eclipse.core.runtime.adaptor.EclipseStarter.applicationTracker = null, org.eclipse.core.runtime.adaptor.EclipseStarter.prototype.applicationTracker = org.eclipse.core.runtime.adaptor.EclipseStarter.applicationTracker, $t$);
($t$ = org.eclipse.core.runtime.adaptor.EclipseStarter.running = false, org.eclipse.core.runtime.adaptor.EclipseStarter.prototype.running = org.eclipse.core.runtime.adaptor.EclipseStarter.running, $t$);
}, $fz.isPrivate = true, $fz));
c$.setStartLevel = Clazz.defineMethod (c$, "setStartLevel", 
($fz = function (value) {
var tracker =  new org.osgi.util.tracker.ServiceTracker (org.eclipse.core.runtime.adaptor.EclipseStarter.context, org.osgi.service.startlevel.StartLevel.getName (), null);
tracker.open ();
var startLevel = tracker.getService ();
var semaphore =  new org.eclipse.core.runtime.internal.adaptor.Semaphore (0);
var listener = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.runtime.adaptor.EclipseStarter$4")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.runtime.adaptor, "EclipseStarter$4", null, org.osgi.framework.FrameworkListener);
Clazz.overrideMethod (c$, "frameworkEvent", 
function (event) {
if (event.getType () == 8 && this.f$.startLevel.getStartLevel () == this.f$.value) this.f$.semaphore.release ();
}, "org.osgi.framework.FrameworkEvent");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.runtime.adaptor.EclipseStarter$4, i$, v$);
}) (this, Clazz.cloneFinals ("startLevel", startLevel, "value", value, "semaphore", semaphore));
org.eclipse.core.runtime.adaptor.EclipseStarter.context.addFrameworkListener (listener);
startLevel.setStartLevel (value);
semaphore.acquire ();
org.eclipse.core.runtime.adaptor.EclipseStarter.context.removeFrameworkListener (listener);
tracker.close ();
}, $fz.isPrivate = true, $fz), "~N");
c$.searchFor = Clazz.defineMethod (c$, "searchFor", 
($fz = function (target, start) {
var candidates =  new java.io.File (start).list ();
if (candidates == null) return null;
var result = null;
var maxVersion = null;
for (var i = 0; i < candidates.length; i++) {
var candidate =  new java.io.File (start, candidates[i]);
if (!candidate.getName ().equals (target) && !candidate.getName ().startsWith (target + "_")) continue ;var name = candidate.getName ();
var version = "";
var index = name.indexOf ('_');
if (index != -1) version = name.substring (index + 1);
var currentVersion = org.eclipse.core.runtime.adaptor.EclipseStarter.getVersionElements (version);
if (maxVersion == null) {
result = candidate.getAbsolutePath ();
maxVersion = currentVersion;
} else {
if (org.eclipse.core.runtime.adaptor.EclipseStarter.compareVersion (maxVersion, currentVersion) < 0) {
result = candidate.getAbsolutePath ();
maxVersion = currentVersion;
}}}
if (result == null) return null;
return result.$replace (java.io.File.separatorChar, '/') + "/";
}, $fz.isPrivate = true, $fz), "~S,~S");
c$.getVersionElements = Clazz.defineMethod (c$, "getVersionElements", 
($fz = function (version) {
var result = [ new Integer (0),  new Integer (0),  new Integer (0), ""];
var t =  new java.util.StringTokenizer (version, ".");
var token;
var i = 0;
while (t.hasMoreTokens () && i < 4) {
token = t.nextToken ();
if (i < 3) {
try {
result[i++] =  new Integer (token);
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
break;
} else {
throw e;
}
}
} else {
result[i++] = token;
}}
return result;
}, $fz.isPrivate = true, $fz), "~S");
c$.compareVersion = Clazz.defineMethod (c$, "compareVersion", 
($fz = function (left, right) {
var result = (left[0]).compareTo (right[0]);
if (result != 0) return result;
result = (left[1]).compareTo (right[1]);
if (result != 0) return result;
result = (left[2]).compareTo (right[2]);
if (result != 0) return result;
return (left[3]).compareTo (right[3]);
}, $fz.isPrivate = true, $fz), "~A,~A");
c$.finalizeProperties = Clazz.defineMethod (c$, "finalizeProperties", 
($fz = function () {
if (System.getProperty ("osgi.dev") != null && System.getProperty ("osgi.checkConfiguration") == null) System.getProperties ().put ("osgi.checkConfiguration", "true");
}, $fz.isPrivate = true, $fz));
Clazz.defineStatics (c$,
"adaptor", null,
"context", null,
"applicationTracker", null,
"initialize", false,
"debug", false,
"running", false,
"CLEAN", "-clean",
"CONSOLE", "-console",
"CONSOLE_LOG", "-consoleLog",
"DEBUG", "-debug",
"INITIALIZE", "-initialize",
"DEV", "-dev",
"WS", "-ws",
"OS", "-os",
"ARCH", "-arch",
"NL", "-nl",
"CONFIGURATION", "-configuration",
"USER", "-user",
"NOEXIT", "-noExit",
"DATA", "-data",
"PROP_BUNDLES", "osgi.bundles",
"PROP_BUNDLES_STARTLEVEL", "osgi.bundles.defaultStartLevel",
"PROP_EXTENSIONS", "osgi.framework.extensions",
"PROP_INITIAL_STARTLEVEL", "osgi.startLevel",
"PROP_DEBUG", "osgi.debug",
"PROP_DEV", "osgi.dev",
"PROP_CLEAN", "osgi.clean",
"PROP_CONSOLE", "osgi.console",
"PROP_CONSOLE_CLASS", "osgi.consoleClass",
"PROP_CHECK_CONFIG", "osgi.checkConfiguration",
"PROP_OS", "osgi.os",
"PROP_WS", "osgi.ws",
"PROP_NL", "osgi.nl",
"PROP_ARCH", "osgi.arch",
"PROP_ADAPTOR", "osgi.adaptor",
"PROP_SYSPATH", "osgi.syspath",
"PROP_LOGFILE", "osgi.logfile",
"PROP_FRAMEWORK", "osgi.framework",
"PROP_INSTALL_AREA", "osgi.install.area",
"PROP_FRAMEWORK_SHAPE", "osgi.framework.shape",
"PROP_NOSHUTDOWN", "osgi.noShutdown",
"PROP_EXITCODE", "eclipse.exitcode",
"PROP_EXITDATA", "eclipse.exitdata",
"PROP_CONSOLE_LOG", "eclipse.consoleLog",
"PROP_VM", "eclipse.vm",
"PROP_VMARGS", "eclipse.vmargs",
"PROP_COMMANDS", "eclipse.commands",
"PROP_IGNOREAPP", "eclipse.ignoreApp",
"PROP_REFRESH_BUNDLES", "eclipse.refreshBundles",
"FILE_SCHEME", "file:",
"FILE_PROTOCOL", "file",
"REFERENCE_SCHEME", "reference:",
"REFERENCE_PROTOCOL", "reference",
"INITIAL_LOCATION", "initial@",
"DEFAULT_ADAPTOR_CLASS", "org.eclipse.core.runtime.adaptor.EclipseAdaptor",
"DEFAULT_INITIAL_STARTLEVEL", 6,
"DEFAULT_BUNDLES_STARTLEVEL", "4",
"DEFAULT_CONSOLE_CLASS", "org.eclipse.osgi.framework.internal.core.FrameworkConsole",
"CONSOLE_NAME", "OSGi Console",
"log", null);
});
