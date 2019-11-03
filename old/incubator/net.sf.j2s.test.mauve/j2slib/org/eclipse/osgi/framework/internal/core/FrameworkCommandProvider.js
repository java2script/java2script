Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.eclipse.osgi.framework.console.CommandProvider"], "org.eclipse.osgi.framework.internal.core.FrameworkCommandProvider", ["java.io.ByteArrayInputStream", "java.lang.Long", "$.Runtime", "$.StringBuffer", "$.Thread", "java.net.URL", "java.util.Hashtable", "$.Properties", "$.StringTokenizer", "$.Vector", "org.eclipse.osgi.framework.internal.core.ConsoleMsg", "$.Util", "org.eclipse.osgi.framework.launcher.Launcher", "org.eclipse.osgi.internal.profile.Profile", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.osgi = null;
this.context = null;
this.slImpl = null;
this.tab = "\t";
this.newline = "\r\n";
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "FrameworkCommandProvider", null, org.eclipse.osgi.framework.console.CommandProvider);
Clazz.makeConstructor (c$, 
function (osgi) {
this.osgi = osgi;
this.context = osgi.getBundleContext ();
this.slImpl = osgi.framework.startLevelManager;
var props =  new java.util.Hashtable ();
props.put ("service.ranking",  new Integer (2147483647));
this.context.registerService (org.eclipse.osgi.framework.console.CommandProvider.getName (), this, props);
}, "org.eclipse.osgi.framework.internal.core.OSGi");
Clazz.overrideMethod (c$, "getHelp", 
function () {
var help =  new StringBuffer (1024);
help.append (this.newline);
help.append (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_VALID_COMMANDS_HEADER);
help.append (this.newline);
this.addHeader (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_CONTROLLING_FRAMEWORK_HEADER, help);
this.addCommand ("launch", org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_LAUNCH_COMMAND_DESCRIPTION, help);
this.addCommand ("shutdown", org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_SHUTDOWN_COMMAND_DESCRIPTION, help);
this.addCommand ("close", org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_CLOSE_COMMAND_DESCRIPTION, help);
this.addCommand ("exit", org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_EXIT_COMMAND_DESCRIPTION, help);
this.addCommand ("gc", org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_GC_COMMAND_DESCRIPTION, help);
this.addCommand ("init", org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_INIT_COMMAND_DESCRIPTION, help);
this.addCommand ("setprop", org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_KEYVALUE_ARGUMENT_DESCRIPTION, org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_SETPROP_COMMAND_DESCRIPTION, help);
this.addHeader (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_CONTROLLING_BUNDLES_HEADER, help);
this.addCommand ("install", org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_INSTALL_COMMAND_DESCRIPTION, help);
this.addCommand ("uninstall", org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_UNINSTALL_COMMAND_DESCRIPTION, help);
this.addCommand ("start", org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_START_COMMAND_DESCRIPTION, help);
this.addCommand ("stop", org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_STOP_COMMAND_DESCRIPTION, help);
this.addCommand ("refresh", org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_REFRESH_COMMAND_DESCRIPTION, help);
this.addCommand ("update", org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_UPDATE_COMMAND_DESCRIPTION, help);
this.addHeader (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_DISPLAYING_STATUS_HEADER, help);
this.addCommand ("status", org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_STATUS_COMMAND_DESCRIPTION, help);
this.addCommand ("ss", org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_SS_COMMAND_DESCRIPTION, help);
this.addCommand ("services", org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_FILTER_ARGUMENT_DESCRIPTION, org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_SERVICES_COMMAND_DESCRIPTION, help);
this.addCommand ("packages", org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_PACKAGES_ARGUMENT_DESCRIPTION, org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_PACKAGES_COMMAND_DESCRIPTION, help);
this.addCommand ("bundles", org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_BUNDLES_COMMAND_DESCRIPTION, help);
this.addCommand ("bundle", org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_IDLOCATION_ARGUMENT_DESCRIPTION, org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_BUNDLE_COMMAND_DESCRIPTION, help);
this.addCommand ("headers", org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_IDLOCATION_ARGUMENT_DESCRIPTION, org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_HEADERS_COMMAND_DESCRIPTION, help);
this.addCommand ("log", org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_IDLOCATION_ARGUMENT_DESCRIPTION, org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_LOG_COMMAND_DESCRIPTION, help);
this.addHeader (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_EXTRAS_HEADER, help);
this.addCommand ("exec", org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_COMMAND_ARGUMENT_DESCRIPTION, org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_EXEC_COMMAND_DESCRIPTION, help);
this.addCommand ("fork", org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_COMMAND_ARGUMENT_DESCRIPTION, org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_FORK_COMMAND_DESCRIPTION, help);
this.addHeader (org.eclipse.osgi.framework.internal.core.ConsoleMsg.STARTLEVEL_HELP_HEADING, help);
this.addCommand ("sl", org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_OPTIONAL_IDLOCATION_ARGUMENT_DESCRIPTION, org.eclipse.osgi.framework.internal.core.ConsoleMsg.STARTLEVEL_HELP_SL, help);
this.addCommand ("setfwsl", org.eclipse.osgi.framework.internal.core.ConsoleMsg.STARTLEVEL_ARGUMENT_DESCRIPTION, org.eclipse.osgi.framework.internal.core.ConsoleMsg.STARTLEVEL_HELP_SETFWSL, help);
this.addCommand ("setbsl", org.eclipse.osgi.framework.internal.core.ConsoleMsg.STARTLEVEL_IDLOCATION_ARGUMENT_DESCRIPTION, org.eclipse.osgi.framework.internal.core.ConsoleMsg.STARTLEVEL_HELP_SETBSL, help);
this.addCommand ("setibsl", org.eclipse.osgi.framework.internal.core.ConsoleMsg.STARTLEVEL_ARGUMENT_DESCRIPTION, org.eclipse.osgi.framework.internal.core.ConsoleMsg.STARTLEVEL_HELP_SETIBSL, help);
this.addHeader (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_PROFILE_HEADING, help);
this.addCommand ("profilelog", org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HELP_PROFILELOG_DESCRIPTION, help);
return help.toString ();
});
Clazz.defineMethod (c$, "addHeader", 
($fz = function (header, help) {
help.append ("---");
help.append (header);
help.append ("---");
help.append (this.newline);
}, $fz.isPrivate = true, $fz), "~S,StringBuffer");
Clazz.defineMethod (c$, "addCommand", 
($fz = function (command, description, help) {
help.append (this.tab);
help.append (command);
help.append (" - ");
help.append (description);
help.append (this.newline);
}, $fz.isPrivate = true, $fz), "~S,~S,StringBuffer");
Clazz.defineMethod (c$, "addCommand", 
($fz = function (command, parameters, description, help) {
help.append (this.tab);
help.append (command);
help.append (" ");
help.append (parameters);
help.append (" - ");
help.append (description);
help.append (this.newline);
}, $fz.isPrivate = true, $fz), "~S,~S,~S,StringBuffer");
Clazz.defineMethod (c$, "_exit", 
function (intp) {
intp.println ();
System.exit (0);
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_launch", 
function (intp) {
this.osgi.launch ();
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_shutdown", 
function (intp) {
this.osgi.shutdown ();
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_sta", 
function (intp) {
this._start (intp);
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_start", 
function (intp) {
var nextArg = intp.nextArgument ();
if (nextArg == null) {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_BUNDLE_SPECIFIED_ERROR);
}while (nextArg != null) {
var bundle = this.getBundleFromToken (intp, nextArg, true);
if (bundle != null) {
bundle.start ();
}nextArg = intp.nextArgument ();
}
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_sto", 
function (intp) {
this._stop (intp);
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_stop", 
function (intp) {
var nextArg = intp.nextArgument ();
if (nextArg == null) {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_BUNDLE_SPECIFIED_ERROR);
}while (nextArg != null) {
var bundle = this.getBundleFromToken (intp, nextArg, true);
if (bundle != null) {
bundle.stop ();
}nextArg = intp.nextArgument ();
}
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_i", 
function (intp) {
this._install (intp);
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_install", 
function (intp) {
var url = intp.nextArgument ();
if (url == null) {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NOTHING_TO_INSTALL_ERROR);
} else {
var bundle = this.context.installBundle (url);
intp.print (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_BUNDLE_ID_MESSAGE);
intp.println ( new Long (bundle.getBundleId ()));
var nextArg = intp.nextArgument ();
if (nextArg != null) {
var start = nextArg.toLowerCase ();
if (org.eclipse.osgi.framework.launcher.Launcher.matchCommand ("start", start, 1)) {
bundle.start ();
}}}}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_up", 
function (intp) {
this._update (intp);
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_update", 
function (intp) {
var token = intp.nextArgument ();
if (token == null) {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_BUNDLE_SPECIFIED_ERROR);
}while (token != null) {
if ("*".equals (token)) {
var bundles = this.context.getBundles ();
var size = bundles.length;
if (size > 0) {
for (var i = 0; i < size; i++) {
var bundle = bundles[i];
if (bundle.getBundleId () != 0) {
try {
bundle.update ();
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.BundleException)) {
intp.printStackTrace (e);
} else {
throw e;
}
}
}}
} else {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_INSTALLED_BUNDLES_ERROR);
}} else {
var bundle = this.getBundleFromToken (intp, token, true);
if (bundle != null) {
var source = intp.nextArgument ();
try {
if (source != null) {
bundle.update ( new java.net.URL (source).openStream ());
} else {
bundle.update ();
}} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.BundleException)) {
intp.printStackTrace (e);
} else {
throw e;
}
}
}}token = intp.nextArgument ();
}
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_un", 
function (intp) {
this._uninstall (intp);
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_uninstall", 
function (intp) {
var nextArg = intp.nextArgument ();
if (nextArg == null) {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_BUNDLE_SPECIFIED_ERROR);
}while (nextArg != null) {
var bundle = this.getBundleFromToken (intp, nextArg, true);
if (bundle != null) {
bundle.uninstall ();
}nextArg = intp.nextArgument ();
}
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_s", 
function (intp) {
this._status (intp);
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_status", 
function (intp) {
if (this.osgi.isActive ()) {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_FRAMEWORK_IS_LAUNCHED_MESSAGE);
} else {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_FRAMEWORK_IS_SHUTDOWN_MESSAGE);
}intp.println ();
var bundles = this.context.getBundles ();
var size = bundles.length;
if (size == 0) {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_INSTALLED_BUNDLES_ERROR);
return ;
}intp.print (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_ID);
intp.print (this.tab);
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_BUNDLE_LOCATION_MESSAGE);
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_STATE_BUNDLE_FILE_NAME_HEADER);
for (var i = 0; i < size; i++) {
var bundle = bundles[i];
intp.print ( new Long (bundle.getBundleId ()));
intp.print (this.tab);
intp.println (bundle.getLocation ());
intp.print ("  ");
intp.print (this.getStateName (bundle.getState ()));
intp.println (bundle.bundledata);
}
var services = this.context.getServiceReferences (null, null);
if (services != null) {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_REGISTERED_SERVICES_MESSAGE);
size = services.length;
for (var i = 0; i < size; i++) {
intp.println (services[i]);
}
}}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_se", 
function (intp) {
this._services (intp);
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_services", 
function (intp) {
var filter = null;
var nextArg = intp.nextArgument ();
if (nextArg != null) {
var buf =  new StringBuffer ();
while (nextArg != null) {
buf.append (' ');
buf.append (nextArg);
nextArg = intp.nextArgument ();
}
filter = buf.toString ();
}var services = this.context.getServiceReferences (null, filter);
if (services != null) {
var size = services.length;
if (size > 0) {
for (var j = 0; j < size; j++) {
var service = services[j];
intp.println (service);
intp.print ("  ");
intp.print (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_REGISTERED_BY_BUNDLE_MESSAGE);
intp.print (" ");
intp.println (service.getBundle ());
var users = service.getUsingBundles ();
if (users != null) {
intp.print ("  ");
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_BUNDLES_USING_SERVICE_MESSAGE);
for (var k = 0; k < users.length; k++) {
intp.print ("    ");
intp.println (users[k]);
}
} else {
intp.print ("  ");
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_BUNDLES_USING_SERVICE_MESSAGE);
}}
return ;
}}intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_REGISTERED_SERVICES_MESSAGE);
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_p", 
function (intp) {
this._packages (intp);
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_packages", 
function (intp) {
var bundle = null;
var token = intp.nextArgument ();
if (token != null) {
bundle = this.getBundleFromToken (intp, token, false);
}var packageAdminRef = this.context.getServiceReference ("org.osgi.service.packageadmin.PackageAdmin");
if (packageAdminRef != null) {
var packageAdmin = this.context.getService (packageAdminRef);
if (packageAdmin != null) {
try {
var packages = null;
if ((token != null) && (bundle == null)) {
var pkg = packageAdmin.getExportedPackage (token);
if (pkg != null) {
packages = [pkg];
}} else {
packages = packageAdmin.getExportedPackages (bundle);
}if (packages == null) {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_EXPORTED_PACKAGES_MESSAGE);
} else {
for (var i = 0; i < packages.length; i++) {
var pkg = packages[i];
intp.print (pkg);
var removalPending = pkg.isRemovalPending ();
if (removalPending) {
intp.print ("(");
intp.print (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_REMOVAL_PENDING_MESSAGE);
intp.println (")");
}var exporter = pkg.getExportingBundle ();
if (exporter != null) {
intp.print ("<");
intp.print (exporter);
intp.println (">");
var importers = pkg.getImportingBundles ();
for (var j = 0; j < importers.length; j++) {
intp.print ("  ");
intp.print (importers[j]);
intp.print (" ");
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_IMPORTS_MESSAGE);
}
} else {
intp.print ("<");
intp.print (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_STALE_MESSAGE);
intp.println (">");
}}
}} finally {
this.context.ungetService (packageAdminRef);
}
}} else {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_EXPORTED_PACKAGES_NO_PACKAGE_ADMIN_MESSAGE);
}}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_bundles", 
function (intp) {
var bundles = this.context.getBundles ();
var size = bundles.length;
if (size == 0) {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_INSTALLED_BUNDLES_ERROR);
return ;
}for (var i = 0; i < size; i++) {
var bundle = bundles[i];
var id = bundle.getBundleId ();
intp.println (bundle);
intp.print ("  ");
intp.print (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_ID_MESSAGE, String.valueOf (id)));
intp.print (", ");
intp.print (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_STATUS_MESSAGE, this.getStateName (bundle.getState ())));
if (id != 0) {
var dataRoot = this.osgi.framework.getDataFile (bundle, "");
var root = (dataRoot == null) ? null : dataRoot.getAbsolutePath ();
intp.print (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_DATA_ROOT_MESSAGE, root));
} else {
intp.println ();
}var services = bundle.getRegisteredServices ();
if (services != null) {
intp.print ("  ");
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_REGISTERED_SERVICES_MESSAGE);
for (var j = 0; j < services.length; j++) {
intp.print ("    ");
intp.println (services[j]);
}
} else {
intp.print ("  ");
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_REGISTERED_SERVICES_MESSAGE);
}services = bundle.getServicesInUse ();
if (services != null) {
intp.print ("  ");
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_SERVICES_IN_USE_MESSAGE);
for (var j = 0; j < services.length; j++) {
intp.print ("    ");
intp.println (services[j]);
}
} else {
intp.print ("  ");
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_SERVICES_IN_USE_MESSAGE);
}}
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_b", 
function (intp) {
this._bundle (intp);
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_bundle", 
function (intp) {
var nextArg = intp.nextArgument ();
if (nextArg == null) {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_BUNDLE_SPECIFIED_ERROR);
}while (nextArg != null) {
var bundle = this.getBundleFromToken (intp, nextArg, true);
if (bundle != null) {
var id = bundle.getBundleId ();
intp.println (bundle);
intp.print ("  ");
intp.print (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_ID_MESSAGE, String.valueOf (id)));
intp.print (", ");
intp.print (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_STATUS_MESSAGE, this.getStateName (bundle.getState ())));
if (id != 0) {
var dataRoot = this.osgi.framework.getDataFile (bundle, "");
var root = (dataRoot == null) ? null : dataRoot.getAbsolutePath ();
intp.print (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_DATA_ROOT_MESSAGE, root));
} else {
intp.println ();
}var services = bundle.getRegisteredServices ();
if (services != null) {
intp.print ("  ");
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_REGISTERED_SERVICES_MESSAGE);
for (var j = 0; j < services.length; j++) {
intp.print ("    ");
intp.println (services[j]);
}
} else {
intp.print ("  ");
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_REGISTERED_SERVICES_MESSAGE);
}services = bundle.getServicesInUse ();
if (services != null) {
intp.print ("  ");
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_SERVICES_IN_USE_MESSAGE);
for (var j = 0; j < services.length; j++) {
intp.print ("    ");
intp.println (services[j]);
}
} else {
intp.print ("  ");
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_SERVICES_IN_USE_MESSAGE);
}var packageAdminRef = this.context.getServiceReference ("org.osgi.service.packageadmin.PackageAdmin");
if (packageAdminRef != null) {
var packageAdmin = this.context.getService (packageAdminRef);
if (packageAdmin != null) {
try {
var exportedpkgs = packageAdmin.getExportedPackages (Clazz.castNullAs ("org.osgi.framework.Bundle"));
if (exportedpkgs == null) {
intp.print ("  ");
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_EXPORTED_PACKAGES_MESSAGE);
intp.print ("  ");
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_IMPORTED_PACKAGES_MESSAGE);
} else {
var title = true;
for (var i = 0; i < exportedpkgs.length; i++) {
var exportedpkg = exportedpkgs[i];
if (exportedpkg.getExportingBundle () === bundle) {
if (title) {
intp.print ("  ");
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_EXPORTED_PACKAGES_MESSAGE);
title = false;
}intp.print ("    ");
intp.print (exportedpkg);
if (exportedpkg.isRemovalPending ()) {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_EXPORTED_REMOVAL_PENDING_MESSAGE);
} else {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_EXPORTED_MESSAGE);
}}}
if (title) {
intp.print ("  ");
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_EXPORTED_PACKAGES_MESSAGE);
}title = true;
for (var i = 0; i < exportedpkgs.length; i++) {
var exportedpkg = exportedpkgs[i];
var importers = exportedpkg.getImportingBundles ();
for (var j = 0; j < importers.length; j++) {
if (importers[j] === bundle) {
if (title) {
intp.print ("  ");
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_IMPORTED_PACKAGES_MESSAGE);
title = false;
}intp.print ("    ");
intp.print (exportedpkg);
var exporter = exportedpkg.getExportingBundle ();
if (exporter != null) {
intp.print ("<");
intp.print (exporter);
intp.println (">");
} else {
intp.print ("<");
intp.print (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_STALE_MESSAGE);
intp.println (">");
}break;
}}
}
if (title) {
intp.print ("  ");
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_IMPORTED_PACKAGES_MESSAGE);
}intp.print ("  ");
if ((packageAdmin.getBundleType (bundle) & 1) > 0) {
var hosts = packageAdmin.getHosts (bundle);
if (hosts != null) {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_HOST_MESSAGE);
for (var i = 0; i < hosts.length; i++) {
intp.print ("    ");
intp.println (hosts[i]);
}
} else {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_HOST_MESSAGE);
}} else {
var fragments = packageAdmin.getFragments (bundle);
if (fragments != null) {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_FRAGMENT_MESSAGE);
for (var i = 0; i < fragments.length; i++) {
intp.print ("    ");
intp.println (fragments[i]);
}
} else {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_FRAGMENT_MESSAGE);
}}var requiredBundles = packageAdmin.getRequiredBundles (null);
var requiredBundle = null;
if (requiredBundles != null) {
for (var i = 0; i < requiredBundles.length; i++) {
if (requiredBundles[i].getBundle () === bundle) {
requiredBundle = requiredBundles[i];
break;
}}
}if (requiredBundle == null) {
intp.print ("  ");
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_NAMED_CLASS_SPACES_MESSAGE);
} else {
intp.print ("  ");
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NAMED_CLASS_SPACE_MESSAGE);
intp.print ("    ");
intp.print (requiredBundle);
if (requiredBundle.isRemovalPending ()) {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_REMOVAL_PENDING_MESSAGE);
} else {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_PROVIDED_MESSAGE);
}}title = true;
for (var i = 0; i < requiredBundles.length; i++) {
if (requiredBundles[i] === requiredBundle) continue ;var depBundles = requiredBundles[i].getRequiringBundles ();
if (depBundles == null) continue ;for (var j = 0; j < depBundles.length; j++) {
if (depBundles[j] === bundle) {
if (title) {
intp.print ("  ");
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_REQUIRED_BUNDLES_MESSAGE);
title = false;
}intp.print ("    ");
intp.print (requiredBundles[i]);
var provider = requiredBundles[i].getBundle ();
intp.print ("<");
intp.print (provider);
intp.println (">");
}}
}
if (title) {
intp.print ("  ");
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_REQUIRED_BUNDLES_MESSAGE);
}}} finally {
this.context.ungetService (packageAdminRef);
}
}} else {
intp.print ("  ");
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_EXPORTED_PACKAGES_NO_PACKAGE_ADMIN_MESSAGE);
}var sm = System.getSecurityManager ();
if (sm != null) {
var domain = bundle.getProtectionDomain ();
intp.println (domain);
}}nextArg = intp.nextArgument ();
}
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_l", 
function (intp) {
this._log (intp);
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_log", 
function (intp) {
var logid = -1;
var token = intp.nextArgument ();
if (token != null) {
var bundle = this.getBundleFromToken (intp, token, false);
if (bundle == null) {
try {
logid = Long.parseLong (token);
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
return ;
} else {
throw e;
}
}
} else {
logid = bundle.getBundleId ();
}}var logreaderRef = this.context.getServiceReference ("org.osgi.service.log.LogReaderService");
if (logreaderRef != null) {
var logreader = this.context.getService (logreaderRef);
if (logreader != null) {
try {
var logentries = (logreader.getClass ().getMethod ("getLog", [null]).invoke (logreader, [null]));
if (logentries.hasMoreElements ()) {
var logentry = logentries.nextElement ();
var clazz = logentry.getClass ();
var getBundle = clazz.getMethod ("getBundle", [null]);
var getLevel = clazz.getMethod ("getLevel", [null]);
var getMessage = clazz.getMethod ("getMessage", [null]);
var getServiceReference = clazz.getMethod ("getServiceReference", [null]);
var getException = clazz.getMethod ("getException", [null]);
while (true) {
var bundle = getBundle.invoke (logentry, [null]);
if ((logid == -1) || ((bundle != null) && (logid == bundle.getBundleId ()))) {
var level = getLevel.invoke (logentry, [null]);
switch (level.intValue ()) {
case 4:
intp.print (">");
intp.print (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_DEBUG_MESSAGE);
intp.print (" ");
break;
case 3:
intp.print (">");
intp.print (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_INFO_MESSAGE);
intp.print (" ");
break;
case 2:
intp.print (">");
intp.print (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_WARNING_MESSAGE);
intp.print (" ");
break;
case 1:
intp.print (">");
intp.print (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_ERROR_MESSAGE);
intp.print (" ");
break;
default:
intp.print (">");
intp.print (level);
intp.print (" ");
break;
}
if (bundle != null) {
intp.print ("[");
intp.print ( new Long (bundle.getBundleId ()));
intp.print ("] ");
}intp.print (getMessage.invoke (logentry, [null]));
intp.print (" ");
var svcref = getServiceReference.invoke (logentry, [null]);
if (svcref != null) {
intp.print ("{");
intp.print ("service.id");
intp.print ("=");
intp.print (svcref.getProperty ("service.id").toString ());
intp.println ("}");
} else {
if (bundle != null) {
intp.println (bundle.getLocation ());
} else {
intp.println ();
}}var t = getException.invoke (logentry, [null]);
if (t != null) {
intp.printStackTrace (t);
}}if (logentries.hasMoreElements ()) {
logentry = logentries.nextElement ();
} else {
break;
}}
}} finally {
this.context.ungetService (logreaderRef);
}
return ;
}}intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_LOGSERVICE_NOT_REGISTERED_MESSAGE);
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_gc", 
function (intp) {
var before = Runtime.getRuntime ().freeMemory ();
System.gc ();
System.gc ();
System.runFinalization ();
try {
Thread.sleep (100);
} catch (e) {
if (Clazz.instanceOf (e, InterruptedException)) {
} else {
throw e;
}
}
var after = Runtime.getRuntime ().freeMemory ();
intp.print (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_TOTAL_MEMORY_MESSAGE);
intp.println (String.valueOf (Runtime.getRuntime ().totalMemory ()));
intp.print (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_FREE_MEMORY_BEFORE_GARBAGE_COLLECTION_MESSAGE);
intp.println (String.valueOf (before));
intp.print (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_FREE_MEMORY_AFTER_GARBAGE_COLLECTION_MESSAGE);
intp.println (String.valueOf (after));
intp.print (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_MEMORY_GAINED_WITH_GARBAGE_COLLECTION_MESSAGE);
intp.println (String.valueOf (after - before));
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_init", 
function (intp) {
if (this.osgi.isActive ()) {
intp.print (this.newline);
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_FRAMEWORK_LAUNCHED_PLEASE_SHUTDOWN_MESSAGE);
return ;
}var bundles = this.context.getBundles ();
var size = bundles.length;
if (size > 0) {
for (var i = 0; i < size; i++) {
var bundle = bundles[i];
if (bundle.getBundleId () != 0) {
try {
bundle.uninstall ();
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.BundleException)) {
intp.printStackTrace (e);
} else {
throw e;
}
}
}}
} else {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_INSTALLED_BUNDLES_ERROR);
}}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_close", 
function (intp) {
intp.println ();
this.osgi.close ();
System.exit (0);
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_r", 
function (intp) {
this._refresh (intp);
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_refresh", 
function (intp) {
var packageAdminRef = this.context.getServiceReference ("org.osgi.service.packageadmin.PackageAdmin");
if (packageAdminRef != null) {
var packageAdmin = this.context.getService (packageAdminRef);
if (packageAdmin != null) {
try {
var refresh = null;
var token = intp.nextArgument ();
if (token != null) {
var bundles =  new java.util.Vector ();
while (token != null) {
var bundle = this.getBundleFromToken (intp, token, true);
if (bundle != null) {
bundles.addElement (bundle);
}token = intp.nextArgument ();
}
var size = bundles.size ();
if (size == 0) {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_INVALID_BUNDLE_SPECIFICATION_ERROR);
return ;
}refresh =  new Array (size);
bundles.copyInto (refresh);
}packageAdmin.refreshPackages (refresh);
} finally {
this.context.ungetService (packageAdminRef);
}
}} else {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_CAN_NOT_REFRESH_NO_PACKAGE_ADMIN_ERROR);
}}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_exec", 
function (intp) {
var command = intp.nextArgument ();
if (command == null) {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_COMMAND_SPECIFIED_ERROR);
return ;
}var p = Runtime.getRuntime ().exec (command);
intp.println (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_STARTED_IN_MESSAGE, command, String.valueOf (p)));
var result = p.waitFor ();
intp.println (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_EXECUTED_RESULT_CODE_MESSAGE, command, String.valueOf (result)));
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_fork", 
function (intp) {
var command = intp.nextArgument ();
if (command == null) {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_COMMAND_SPECIFIED_ERROR);
return ;
}var p = Runtime.getRuntime ().exec (command);
intp.println (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_STARTED_IN_MESSAGE, command, String.valueOf (p)));
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_h", 
function (intp) {
this._headers (intp);
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_headers", 
function (intp) {
var nextArg = intp.nextArgument ();
if (nextArg == null) {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_BUNDLE_SPECIFIED_ERROR);
}while (nextArg != null) {
var bundle = this.getBundleFromToken (intp, nextArg, true);
if (bundle != null) {
intp.printDictionary (bundle.getHeaders (), org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_BUNDLE_HEADERS_TITLE);
}nextArg = intp.nextArgument ();
}
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_pr", 
function (intp) {
this._props (intp);
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_props", 
function (intp) {
intp.printDictionary (System.getProperties (), org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_SYSTEM_PROPERTIES_TITLE);
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_setp", 
function (intp) {
this._setprop (intp);
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_setprop", 
function (intp) {
var argument = intp.nextArgument ();
if (argument == null) {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_PARAMETERS_SPECIFIED_TITLE);
this._props (intp);
} else {
var $in =  new java.io.ByteArrayInputStream (argument.getBytes ());
try {
var sysprops = System.getProperties ();
var newprops =  new java.util.Properties ();
newprops.load ($in);
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_SETTING_PROPERTIES_TITLE);
var keys = newprops.propertyNames ();
while (keys.hasMoreElements ()) {
var key = keys.nextElement ();
var value = newprops.get (key);
sysprops.put (key, value);
intp.println (this.tab + key + " = " + value);
}
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
} finally {
try {
$in.close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}
}}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_ss", 
function (intp) {
if (this.osgi.isActive ()) {
intp.println ();
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_FRAMEWORK_IS_LAUNCHED_MESSAGE);
} else {
intp.println ();
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_FRAMEWORK_IS_SHUTDOWN_MESSAGE);
}var bundles = this.context.getBundles ();
if (bundles.length == 0) {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_INSTALLED_BUNDLES_ERROR);
} else {
intp.print (this.newline);
intp.print (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_ID);
intp.print (this.tab);
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_STATE_BUNDLE_TITLE);
for (var i = 0; i < bundles.length; i++) {
var b = bundles[i];
var label = b.getSymbolicName ();
if (label == null || label.length == 0) label = b.toString ();
 else label = label + "_" + b.getVersion ();
intp.println (b.getBundleId () + "\t" + this.getStateName (b.getState ()) + label);
if (b.isFragment ()) {
var hosts = b.getHosts ();
if (hosts != null) for (var j = 0; j < hosts.length; j++) intp.println ("\t            Master=" + hosts[j].getBundleHost ().getBundleId ());

} else {
var fragments = b.getFragments ();
if (fragments != null) {
intp.print ("\t            Fragments=");
for (var f = 0; f < fragments.length; f++) {
var fragment = fragments[f];
intp.print ((f > 0 ? ", " : "") + fragment.getBundleId ());
}
intp.println ();
}}}
}}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_t", 
function (intp) {
this._threads (intp);
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_threads", 
function (intp) {
var threadGroups = this.getThreadGroups ();
org.eclipse.osgi.framework.internal.core.Util.sort (threadGroups);
var tg = this.getTopThreadGroup ();
var threads =  new Array (tg.activeCount ());
var count = tg.enumerate (threads, true);
org.eclipse.osgi.framework.internal.core.Util.sort (threads);
var sb =  new StringBuffer (120);
intp.println ();
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_THREADGROUP_TITLE);
for (var i = 0; i < threadGroups.length; i++) {
tg = threadGroups[i];
var all = tg.activeCount ();
var local = tg.enumerate ( new Array (all), false);
var p = tg.getParent ();
var parent = (p == null) ? "-none-" : p.getName ();
sb.setLength (0);
sb.append (org.eclipse.osgi.framework.internal.core.Util.toString (this.simpleClassName (tg), 18)).append (" ").append (org.eclipse.osgi.framework.internal.core.Util.toString (tg.getName (), 21)).append (" ").append (org.eclipse.osgi.framework.internal.core.Util.toString (parent, 16)).append (org.eclipse.osgi.framework.internal.core.Util.toString ( new Integer (tg.getMaxPriority ()), 3)).append (org.eclipse.osgi.framework.internal.core.Util.toString ( new Integer (local), 4)).append ("/").append (org.eclipse.osgi.framework.internal.core.Util.toString (String.valueOf (all), 6));
intp.println (sb.toString ());
}
intp.print (this.newline);
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_THREADTYPE_TITLE);
for (var j = 0; j < count; j++) {
var t = threads[j];
if (t != null) {
sb.setLength (0);
sb.append (org.eclipse.osgi.framework.internal.core.Util.toString (this.simpleClassName (t), 18)).append (" ").append (org.eclipse.osgi.framework.internal.core.Util.toString (t.getName (), 21)).append (" ").append (org.eclipse.osgi.framework.internal.core.Util.toString (t.getThreadGroup ().getName (), 16)).append (org.eclipse.osgi.framework.internal.core.Util.toString ( new Integer (t.getPriority ()), 3));
intp.println (sb.toString ());
}}
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_sl", 
function (intp) {
if (this.isStartLevelSvcPresent (intp)) {
var bundle = null;
var token = intp.nextArgument ();
var value = 0;
if (token != null) {
bundle = this.getBundleFromToken (intp, token, true);
if (bundle == null) {
return ;
}}if (bundle == null) {
value = this.slImpl.getStartLevel ();
intp.println (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.ConsoleMsg.STARTLEVEL_FRAMEWORK_ACTIVE_STARTLEVEL, String.valueOf (value)));
} else {
value = this.slImpl.getBundleStartLevel (bundle);
intp.println (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.ConsoleMsg.STARTLEVEL_BUNDLE_STARTLEVEL,  new Long (bundle.getBundleId ()),  new Integer (value)));
}}}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_setfwsl", 
function (intp) {
if (this.isStartLevelSvcPresent (intp)) {
var value = 0;
var token = intp.nextArgument ();
if (token == null) {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.STARTLEVEL_NO_STARTLEVEL_GIVEN);
value = this.slImpl.getStartLevel ();
intp.println (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.ConsoleMsg.STARTLEVEL_FRAMEWORK_ACTIVE_STARTLEVEL, String.valueOf (value)));
} else {
value = this.getStartLevelFromToken (intp, token);
if (value > 0) {
try {
this.slImpl.setStartLevel (value);
intp.println (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.ConsoleMsg.STARTLEVEL_FRAMEWORK_ACTIVE_STARTLEVEL, String.valueOf (value)));
} catch (e) {
if (Clazz.instanceOf (e, IllegalArgumentException)) {
intp.println (e.getMessage ());
} else {
throw e;
}
}
}}}}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_setbsl", 
function (intp) {
if (this.isStartLevelSvcPresent (intp)) {
var token;
var bundle = null;
token = intp.nextArgument ();
if (token == null) {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.STARTLEVEL_NO_STARTLEVEL_OR_BUNDLE_GIVEN);
return ;
}var newSL = this.getStartLevelFromToken (intp, token);
token = intp.nextArgument ();
if (token == null) {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.STARTLEVEL_NO_STARTLEVEL_OR_BUNDLE_GIVEN);
return ;
}while (token != null) {
bundle = this.getBundleFromToken (intp, token, true);
if (bundle != null) {
try {
this.slImpl.setBundleStartLevel (bundle, newSL);
intp.println (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.ConsoleMsg.STARTLEVEL_BUNDLE_STARTLEVEL,  new Long (bundle.getBundleId ()),  new Integer (newSL)));
} catch (e) {
if (Clazz.instanceOf (e, IllegalArgumentException)) {
intp.println (e.getMessage ());
} else {
throw e;
}
}
}token = intp.nextArgument ();
}
}}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_setibsl", 
function (intp) {
if (this.isStartLevelSvcPresent (intp)) {
var value = 0;
var token = intp.nextArgument ();
if (token == null) {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.STARTLEVEL_NO_STARTLEVEL_GIVEN);
value = this.slImpl.getInitialBundleStartLevel ();
intp.println (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.ConsoleMsg.STARTLEVEL_INITIAL_BUNDLE_STARTLEVEL, String.valueOf (value)));
} else {
value = this.getStartLevelFromToken (intp, token);
if (value > 0) {
try {
this.slImpl.setInitialBundleStartLevel (value);
intp.println (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.ConsoleMsg.STARTLEVEL_INITIAL_BUNDLE_STARTLEVEL, String.valueOf (value)));
} catch (e) {
if (Clazz.instanceOf (e, IllegalArgumentException)) {
intp.println (e.getMessage ());
} else {
throw e;
}
}
}}}}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_requiredBundles", 
function (intp) {
this._classSpaces (intp);
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_classSpaces", 
function (intp) {
var token = intp.nextArgument ();
var packageAdminRef = this.context.getServiceReference ("org.osgi.service.packageadmin.PackageAdmin");
if (packageAdminRef != null) {
var packageAdmin = this.context.getService (packageAdminRef);
if (packageAdmin != null) {
try {
var symBundles = null;
symBundles = packageAdmin.getRequiredBundles (token);
if (symBundles == null) {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_NAMED_CLASS_SPACES_MESSAGE);
} else {
for (var i = 0; i < symBundles.length; i++) {
var symBundle = symBundles[i];
intp.print (symBundle);
var removalPending = symBundle.isRemovalPending ();
if (removalPending) {
intp.print ("(");
intp.print (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_REMOVAL_PENDING_MESSAGE);
intp.println (")");
}var provider = symBundle.getBundle ();
if (provider != null) {
intp.print ("<");
intp.print (provider);
intp.println (">");
var requiring = symBundle.getRequiringBundles ();
if (requiring != null) for (var j = 0; j < requiring.length; j++) {
intp.print ("  ");
intp.print (requiring[j]);
intp.print (" ");
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_REQUIRES_MESSAGE);
}
} else {
intp.print ("<");
intp.print (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_STALE_MESSAGE);
intp.println (">");
}}
}} finally {
this.context.ungetService (packageAdminRef);
}
}} else {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_NO_EXPORTED_PACKAGES_NO_PACKAGE_ADMIN_MESSAGE);
}}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_profilelog", 
function (intp) {
intp.println (org.eclipse.osgi.internal.profile.Profile.getProfileLog ());
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_getPackages", 
function (intp) {
var nextArg = intp.nextArgument ();
if (nextArg == null) return ;
var bundle = this.getBundleFromToken (intp, nextArg, true);
var ref = this.context.getServiceReference ("org.eclipse.osgi.service.resolver.PlatformAdmin");
if (ref == null) return ;
var platformAdmin = this.context.getService (ref);
try {
var exports = platformAdmin.getStateHelper ().getVisiblePackages (bundle.getBundleDescription ());
for (var i = 0; i < exports.length; i++) {
intp.println (exports[i] + ": " + platformAdmin.getStateHelper ().getAccessCode (bundle.getBundleDescription (), exports[i]));
}
} finally {
this.context.ungetService (ref);
}
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "isStartLevelSvcPresent", 
function (intp) {
var retval = false;
var slSvcRef = this.context.getServiceReference ("org.osgi.service.startlevel.StartLevel");
if (slSvcRef != null) {
var slSvc = this.context.getService (slSvcRef);
if (slSvc != null) {
retval = true;
}} else {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_CAN_NOT_USE_STARTLEVEL_NO_STARTLEVEL_SVC_ERROR);
}return retval;
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "getBundleFromToken", 
function (intp, token, error) {
var bundle;
try {
var id = Long.parseLong (token);
bundle = this.context.getBundle (id);
} catch (nfe) {
if (Clazz.instanceOf (nfe, NumberFormatException)) {
bundle = (this.context).getBundleByLocation (token);
} else {
throw nfe;
}
}
if ((bundle == null) && error) {
intp.println (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_CANNOT_FIND_BUNDLE_ERROR, token));
}return (bundle);
}, "org.eclipse.osgi.framework.console.CommandInterpreter,~S,~B");
Clazz.defineMethod (c$, "getStartLevelFromToken", 
function (intp, value) {
var retval = -1;
try {
retval = Integer.parseInt (value);
if (Integer.parseInt (value) <= 0) {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.STARTLEVEL_POSITIVE_INTEGER);
}} catch (nfe) {
if (Clazz.instanceOf (nfe, NumberFormatException)) {
intp.println (org.eclipse.osgi.framework.internal.core.ConsoleMsg.STARTLEVEL_POSITIVE_INTEGER);
} else {
throw nfe;
}
}
return retval;
}, "org.eclipse.osgi.framework.console.CommandInterpreter,~S");
Clazz.defineMethod (c$, "getStateName", 
function (state) {
switch (state) {
case 1:
return (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_UNINSTALLED_MESSAGE);
case 2:
return (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_INSTALLED_MESSAGE);
case 4:
return (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_RESOLVED_MESSAGE);
case 8:
return (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_STARTING_MESSAGE);
case 16:
return (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_STOPPING_MESSAGE);
case 32:
return (org.eclipse.osgi.framework.internal.core.ConsoleMsg.CONSOLE_ACTIVE_MESSAGE);
default:
return (Integer.toHexString (state));
}
}, "~N");
Clazz.defineMethod (c$, "getThreadGroups", 
function () {
var tg = this.getTopThreadGroup ();
var groups =  new Array (tg.activeGroupCount ());
var count = tg.enumerate (groups, true);
if (count == groups.length) {
return groups;
}var ngroups =  new Array (count);
System.arraycopy (groups, 0, ngroups, 0, count);
return ngroups;
});
Clazz.defineMethod (c$, "getTopThreadGroup", 
function () {
var topGroup = Thread.currentThread ().getThreadGroup ();
if (topGroup != null) {
while (topGroup.getParent () != null) {
topGroup = topGroup.getParent ();
}
}return topGroup;
});
Clazz.defineMethod (c$, "simpleClassName", 
function (o) {
var t =  new java.util.StringTokenizer (o.getClass ().getName (), ".");
var ct = t.countTokens ();
for (var i = 1; i < ct; i++) {
t.nextToken ();
}
return t.nextToken ();
}, "~O");
});
