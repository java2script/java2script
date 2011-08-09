Clazz.declarePackage ("org.eclipse.core.runtime.internal.adaptor");
Clazz.load (["org.eclipse.osgi.framework.console.CommandProvider"], "org.eclipse.core.runtime.internal.adaptor.EclipseCommandProvider", ["java.lang.Long", "$.StringBuffer", "org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg", "org.eclipse.osgi.service.resolver.PlatformAdmin", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.context = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.internal.adaptor, "EclipseCommandProvider", null, org.eclipse.osgi.framework.console.CommandProvider);
Clazz.makeConstructor (c$, 
function (context) {
this.context = context;
}, "org.osgi.framework.BundleContext");
Clazz.overrideMethod (c$, "getHelp", 
function () {
var help =  new StringBuffer (512);
help.append (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.NEW_LINE);
help.append ("---");
help.append (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_CONSOLE_COMMANDS_HEADER);
help.append ("---");
help.append (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.NEW_LINE);
help.append ("\tdiag - " + org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_CONSOLE_HELP_DIAG_COMMAND_DESCRIPTION);
help.append (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.NEW_LINE);
help.append ("\tactive - " + org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_CONSOLE_HELP_ACTIVE_COMMAND_DESCRIPTION);
help.append (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.NEW_LINE);
help.append ("\tgetprop " + org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_CONSOLE_HELP_GETPROP_COMMAND_DESCRIPTION);
return help.toString ();
});
Clazz.defineMethod (c$, "getBundleDescriptionFromToken", 
($fz = function (state, token) {
try {
var id = Long.parseLong (token);
return state.getBundle (id);
} catch (nfe) {
if (Clazz.instanceOf (nfe, NumberFormatException)) {
var allBundles = state.getBundles (token);
if (allBundles.length > 0) return allBundles[0];
} else {
throw nfe;
}
}
return null;
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.service.resolver.State,~S");
Clazz.defineMethod (c$, "_diag", 
function (ci) {
var nextArg = ci.nextArgument ();
if (nextArg == null) {
ci.println (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_CONSOLE_NO_BUNDLE_SPECIFIED_ERROR);
return ;
}var platformAdminRef = this.context.getServiceReference (org.eclipse.osgi.service.resolver.PlatformAdmin.getName ());
if (platformAdminRef == null) {
ci.print ("  ");
ci.println (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_CONSOLE_NO_CONSTRAINTS_NO_PLATFORM_ADMIN_MESSAGE);
return ;
}try {
var platformAdmin = this.context.getService (platformAdminRef);
if (platformAdmin == null) return ;
var systemState = platformAdmin.getState (false);
while (nextArg != null) {
var bundle = this.getBundleDescriptionFromToken (systemState, nextArg);
if (bundle == null) {
ci.println (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_CONSOLE_CANNOT_FIND_BUNDLE_ERROR, nextArg));
nextArg = ci.nextArgument ();
continue ;}ci.println (bundle.getLocation () + " [" + bundle.getBundleId () + "]");
var unsatisfied = platformAdmin.getStateHelper ().getUnsatisfiedConstraints (bundle);
if (unsatisfied.length == 0) {
var message = org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_CONSOLE_NO_CONSTRAINTS;
if (!bundle.isResolved ()) {
var symbolicName = bundle.getSymbolicName ();
var resolved = symbolicName == null ? null : this.getResolvedBundle (systemState, symbolicName);
if (resolved != null) message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_CONSOLE_OTHER_VERSION, resolved.getLocation ());
}ci.print ("  ");
ci.println (message);
}for (var i = 0; i < unsatisfied.length; i++) {
ci.print ("  ");
ci.println (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.getResolutionFailureMessage (unsatisfied[i]));
}
nextArg = ci.nextArgument ();
}
} finally {
this.context.ungetService (platformAdminRef);
}
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "getResolvedBundle", 
($fz = function (state, symbolicName) {
var homonyms = state.getBundles (symbolicName);
for (var i = 0; i < homonyms.length; i++) if (homonyms[i].isResolved ()) return homonyms[i];

return null;
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.service.resolver.State,~S");
Clazz.defineMethod (c$, "_active", 
function (ci) {
var allBundles = this.context.getBundles ();
var activeCount = 0;
for (var i = 0; i < allBundles.length; i++) if (allBundles[i].getState () == 32) {
ci.println (allBundles[i]);
activeCount++;
}
ci.print ("  ");
ci.println (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_CONSOLE_BUNDLES_ACTIVE, String.valueOf (activeCount)));
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
Clazz.defineMethod (c$, "_getprop", 
function (ci) {
var allProperties = System.getProperties ();
var filter = ci.nextArgument ();
var propertyNames = allProperties.keys ();
while (propertyNames.hasMoreElements ()) {
var prop = propertyNames.nextElement ();
if (filter == null || prop.startsWith (filter)) {
ci.println (prop + '=' + allProperties.getProperty (prop));
}}
}, "org.eclipse.osgi.framework.console.CommandInterpreter");
});
