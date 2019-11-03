Clazz.declarePackage ("org.eclipse.core.internal.runtime");
Clazz.load (["org.eclipse.core.runtime.Plugin", "org.osgi.framework.BundleActivator"], "org.eclipse.core.internal.runtime.PlatformActivator", ["java.lang.RuntimeException", "java.util.Hashtable", "org.eclipse.core.internal.boot.PlatformURLBaseConnection", "$.PlatformURLHandler", "org.eclipse.core.internal.content.ContentTypeManager", "org.eclipse.core.internal.registry.ExtensionRegistry", "org.eclipse.core.internal.runtime.InternalPlatform", "$.Messages", "$.PlatformURLConfigConnection", "$.PlatformURLFragmentConnection", "$.PlatformURLMetaConnection", "$.PlatformURLPluginConnection", "org.eclipse.osgi.framework.log.FrameworkLog", "org.eclipse.osgi.service.environment.EnvironmentInfo", "org.eclipse.osgi.service.runnable.ParameterizedRunnable", "org.eclipse.osgi.service.urlconversion.URLConverter", "org.eclipse.osgi.util.NLS", "org.osgi.service.packageadmin.PackageAdmin", "org.osgi.service.url.URLStreamHandlerService"], function () {
c$ = Clazz.decorateAsClass (function () {
this.environmentServiceReference = null;
this.urlServiceReference = null;
this.logServiceReference = null;
this.packageAdminReference = null;
this.entryLocatorRegistration = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.runtime, "PlatformActivator", org.eclipse.core.runtime.Plugin, org.osgi.framework.BundleActivator);
c$.getContext = Clazz.defineMethod (c$, "getContext", 
function () {
return org.eclipse.core.internal.runtime.PlatformActivator.context;
});
Clazz.overrideMethod (c$, "start", 
function (runtimeContext) {
($t$ = org.eclipse.core.internal.runtime.PlatformActivator.context = runtimeContext, org.eclipse.core.internal.runtime.PlatformActivator.prototype.context = org.eclipse.core.internal.runtime.PlatformActivator.context, $t$);
this.acquireInfoService ();
this.acquireURLConverterService ();
this.acquireFrameworkLogService ();
this.acquirePackageAdminService ();
this.startInternalPlatform ();
this.startRegistry (runtimeContext);
org.eclipse.core.internal.content.ContentTypeManager.startup ();
this.installPlatformURLSupport ();
this.registerApplicationService ();
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().setRuntimeInstance (this);
Clazz.superCall (this, org.eclipse.core.internal.runtime.PlatformActivator, "start", [runtimeContext]);
}, "org.osgi.framework.BundleContext");
Clazz.defineMethod (c$, "installPlatformURLSupport", 
($fz = function () {
org.eclipse.core.internal.runtime.PlatformURLPluginConnection.startup ();
org.eclipse.core.internal.runtime.PlatformURLFragmentConnection.startup ();
org.eclipse.core.internal.runtime.PlatformURLMetaConnection.startup ();
org.eclipse.core.internal.runtime.PlatformURLConfigConnection.startup ();
org.eclipse.core.internal.boot.PlatformURLBaseConnection.startup (org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getInstallURL ());
var properties =  new java.util.Hashtable (1);
properties.put ("url.handler.protocol", ["platform"]);
org.eclipse.core.internal.runtime.PlatformActivator.context.registerService (org.osgi.service.url.URLStreamHandlerService.getName (),  new org.eclipse.core.internal.boot.PlatformURLHandler (), properties);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "startRegistry", 
($fz = function (runtimeContext) {
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().setExtensionRegistry ( new org.eclipse.core.internal.registry.ExtensionRegistry ());
}, $fz.isPrivate = true, $fz), "org.osgi.framework.BundleContext");
Clazz.overrideMethod (c$, "stop", 
function (runtimeContext) {
org.eclipse.core.internal.content.ContentTypeManager.shutdown ();
this.stopRegistry (runtimeContext);
this.unregisterEntryLocator ();
this.environmentInfoServiceReleased (this.environmentServiceReference);
this.urlServiceReleased (this.urlServiceReference);
this.logServiceReleased (this.logServiceReference);
this.packageAdminServiceReleased (this.packageAdminReference);
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().stop (runtimeContext);
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().setRuntimeInstance (null);
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getRuntimeFileManager ().close ();
}, "org.osgi.framework.BundleContext");
Clazz.defineMethod (c$, "stopRegistry", 
($fz = function (runtimeContext) {
var registry = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getRegistry ();
if (registry == null) return ;
registry.stop ();
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().setExtensionRegistry (null);
}, $fz.isPrivate = true, $fz), "org.osgi.framework.BundleContext");
Clazz.defineMethod (c$, "acquireInfoService", 
($fz = function () {
this.environmentServiceReference = org.eclipse.core.internal.runtime.PlatformActivator.context.getServiceReference (org.eclipse.osgi.service.environment.EnvironmentInfo.getName ());
if (this.environmentServiceReference == null) return ;
($t$ = org.eclipse.core.internal.runtime.InternalPlatform.infoService = org.eclipse.core.internal.runtime.PlatformActivator.context.getService (this.environmentServiceReference), org.eclipse.core.internal.runtime.InternalPlatform.prototype.infoService = org.eclipse.core.internal.runtime.InternalPlatform.infoService, $t$);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "acquireURLConverterService", 
($fz = function () {
this.urlServiceReference = org.eclipse.core.internal.runtime.PlatformActivator.context.getServiceReference (org.eclipse.osgi.service.urlconversion.URLConverter.getName ());
if (this.urlServiceReference == null) return ;
($t$ = org.eclipse.core.internal.runtime.InternalPlatform.urlConverter = org.eclipse.core.internal.runtime.PlatformActivator.context.getService (this.urlServiceReference), org.eclipse.core.internal.runtime.InternalPlatform.prototype.urlConverter = org.eclipse.core.internal.runtime.InternalPlatform.urlConverter, $t$);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "acquireFrameworkLogService", 
($fz = function () {
this.logServiceReference = org.eclipse.core.internal.runtime.PlatformActivator.context.getServiceReference (org.eclipse.osgi.framework.log.FrameworkLog.getName ());
if (this.logServiceReference == null) return ;
($t$ = org.eclipse.core.internal.runtime.InternalPlatform.frameworkLog = org.eclipse.core.internal.runtime.PlatformActivator.context.getService (this.logServiceReference), org.eclipse.core.internal.runtime.InternalPlatform.prototype.frameworkLog = org.eclipse.core.internal.runtime.InternalPlatform.frameworkLog, $t$);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "acquirePackageAdminService", 
($fz = function () {
this.packageAdminReference = org.eclipse.core.internal.runtime.PlatformActivator.context.getServiceReference (org.osgi.service.packageadmin.PackageAdmin.getName ());
if (this.packageAdminReference == null) return ;
($t$ = org.eclipse.core.internal.runtime.InternalPlatform.packageAdmin = org.eclipse.core.internal.runtime.PlatformActivator.context.getService (this.packageAdminReference), org.eclipse.core.internal.runtime.InternalPlatform.prototype.packageAdmin = org.eclipse.core.internal.runtime.InternalPlatform.packageAdmin, $t$);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "startInternalPlatform", 
($fz = function () {
org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().start (org.eclipse.core.internal.runtime.PlatformActivator.context);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "environmentInfoServiceReleased", 
($fz = function (reference) {
if (this.environmentServiceReference == null) return ;
if (this.environmentServiceReference !== reference) return ;
($t$ = org.eclipse.core.internal.runtime.InternalPlatform.infoService = null, org.eclipse.core.internal.runtime.InternalPlatform.prototype.infoService = org.eclipse.core.internal.runtime.InternalPlatform.infoService, $t$);
org.eclipse.core.internal.runtime.PlatformActivator.context.ungetService (this.environmentServiceReference);
this.environmentServiceReference = null;
}, $fz.isPrivate = true, $fz), "org.osgi.framework.ServiceReference");
Clazz.defineMethod (c$, "urlServiceReleased", 
($fz = function (reference) {
if (this.urlServiceReference == null) return ;
if (this.urlServiceReference !== reference) return ;
($t$ = org.eclipse.core.internal.runtime.InternalPlatform.urlConverter = null, org.eclipse.core.internal.runtime.InternalPlatform.prototype.urlConverter = org.eclipse.core.internal.runtime.InternalPlatform.urlConverter, $t$);
org.eclipse.core.internal.runtime.PlatformActivator.context.ungetService (this.urlServiceReference);
this.urlServiceReference = null;
}, $fz.isPrivate = true, $fz), "org.osgi.framework.ServiceReference");
Clazz.defineMethod (c$, "logServiceReleased", 
($fz = function (reference) {
if (this.logServiceReference == null) return ;
if (this.logServiceReference !== reference) return ;
($t$ = org.eclipse.core.internal.runtime.InternalPlatform.frameworkLog = null, org.eclipse.core.internal.runtime.InternalPlatform.prototype.frameworkLog = org.eclipse.core.internal.runtime.InternalPlatform.frameworkLog, $t$);
org.eclipse.core.internal.runtime.PlatformActivator.context.ungetService (this.logServiceReference);
this.logServiceReference = null;
}, $fz.isPrivate = true, $fz), "org.osgi.framework.ServiceReference");
Clazz.defineMethod (c$, "packageAdminServiceReleased", 
($fz = function (reference) {
if (this.packageAdminReference == null) return ;
if (this.packageAdminReference !== reference) return ;
($t$ = org.eclipse.core.internal.runtime.InternalPlatform.packageAdmin = null, org.eclipse.core.internal.runtime.InternalPlatform.prototype.packageAdmin = org.eclipse.core.internal.runtime.InternalPlatform.packageAdmin, $t$);
org.eclipse.core.internal.runtime.PlatformActivator.context.ungetService (this.packageAdminReference);
this.packageAdminReference = null;
}, $fz.isPrivate = true, $fz), "org.osgi.framework.ServiceReference");
Clazz.defineMethod (c$, "registerApplicationService", 
($fz = function () {
var work = (function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.runtime.PlatformActivator$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.core.internal.runtime, "PlatformActivator$1", null, org.eclipse.osgi.service.runnable.ParameterizedRunnable);
Clazz.overrideMethod (c$, "run", 
function (arg) {
var application = null;
var applicationId = System.getProperty ("eclipse.application");
if (applicationId == null) {
var product = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getProduct ();
if (product != null) {
applicationId = product.getApplication ();
if (applicationId != null) System.getProperties ().setProperty ("eclipse.application", applicationId);
}}if (applicationId == null) throw  new RuntimeException (org.eclipse.core.internal.runtime.Messages.application_noIdFound);
var registry = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getRegistry ();
var applicationExtension = registry.getExtension ("org.eclipse.core.runtime", "applications", applicationId);
if (applicationExtension == null) {
var availableApps = registry.getExtensionPoint ("org.eclipse.core.runtime.applications").getExtensions ();
var availableAppsString = "<NONE>";
if (availableApps.length != 0) {
availableAppsString = availableApps[0].getUniqueIdentifier ();
for (var i = 1; i < availableApps.length; i++) {
availableAppsString = availableAppsString + ", " + availableApps[i].getUniqueIdentifier ();
}
}throw  new RuntimeException (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.application_notFound, applicationId, availableAppsString));
}var configs = applicationExtension.getConfigurationElements ();
if (configs.length == 0) throw  new RuntimeException (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.application_invalidExtension, applicationId));
var config = configs[0];
application = config.createExecutableExtension ("run");
if (arg == null) arg = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getApplicationArgs ();
var result = application.run (arg);
var exitCode = Clazz.instanceOf (result, Integer) ? (result).intValue () : 0;
System.getProperties ().setProperty ("eclipse.exitcode", Integer.toString (exitCode));
if (org.eclipse.core.internal.runtime.InternalPlatform.DEBUG) System.out.println (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.application_returned, ([applicationId, result == null ? "null" : result.toString ()])));
return result;
}, "~O");
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.core.internal.runtime.PlatformActivator$1, i$, v$);
}) (this, null);
var properties =  new java.util.Hashtable (1);
properties.put ("eclipse.application", "default");
org.eclipse.core.internal.runtime.PlatformActivator.context.registerService (org.eclipse.osgi.service.runnable.ParameterizedRunnable.getName (), work, properties);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "unregisterEntryLocator", 
($fz = function () {
if (this.entryLocatorRegistration != null) {
this.entryLocatorRegistration.unregister ();
this.entryLocatorRegistration = null;
}}, $fz.isPrivate = true, $fz));
Clazz.defineStatics (c$,
"PROP_ECLIPSE_EXITCODE", "eclipse.exitcode",
"PROP_ECLIPSE_APPLICATION", "eclipse.application",
"NL_SYSTEM_BUNDLE", "org.eclipse.osgi.nl",
"NL_PROP_EXT", ".properties",
"context", null);
});
