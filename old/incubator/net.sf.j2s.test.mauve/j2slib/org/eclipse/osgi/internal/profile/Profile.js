Clazz.declarePackage ("org.eclipse.osgi.internal.profile");
Clazz.load (null, "org.eclipse.osgi.internal.profile.Profile", ["java.lang.Boolean", "org.eclipse.osgi.framework.debug.FrameworkDebugOptions", "org.eclipse.osgi.internal.profile.DefaultProfileLogger"], function () {
c$ = Clazz.declareType (org.eclipse.osgi.internal.profile, "Profile");
c$.initProps = Clazz.defineMethod (c$, "initProps", 
function () {
var prop;
var dbgOptions = null;
if (System.getProperty ("osgi.debug") != null) {
dbgOptions = org.eclipse.osgi.framework.debug.FrameworkDebugOptions.getDefault ();
if (dbgOptions != null) {
($t$ = org.eclipse.osgi.internal.profile.Profile.STARTUP = dbgOptions.getBooleanOption ("org.eclipse.osgi/profile/startup", false), org.eclipse.osgi.internal.profile.Profile.prototype.STARTUP = org.eclipse.osgi.internal.profile.Profile.STARTUP, $t$);
($t$ = org.eclipse.osgi.internal.profile.Profile.BENCHMARK = dbgOptions.getBooleanOption ("org.eclipse.osgi/profile/benchmark", false), org.eclipse.osgi.internal.profile.Profile.prototype.BENCHMARK = org.eclipse.osgi.internal.profile.Profile.BENCHMARK, $t$);
($t$ = org.eclipse.osgi.internal.profile.Profile.DEBUG = dbgOptions.getBooleanOption ("org.eclipse.osgi/profile/debug", false), org.eclipse.osgi.internal.profile.Profile.prototype.DEBUG = org.eclipse.osgi.internal.profile.Profile.DEBUG, $t$);
if (org.eclipse.osgi.internal.profile.Profile.profileLogger == null) ($t$ = org.eclipse.osgi.internal.profile.Profile.profileLoggerClassName = dbgOptions.getOption ("org.eclipse.osgi/profile/impl"), org.eclipse.osgi.internal.profile.Profile.prototype.profileLoggerClassName = org.eclipse.osgi.internal.profile.Profile.profileLoggerClassName, $t$);
}}if ((prop = System.getProperty ("osgi.profile.startup")) != null) {
($t$ = org.eclipse.osgi.internal.profile.Profile.STARTUP = Boolean.$valueOf (prop).booleanValue (), org.eclipse.osgi.internal.profile.Profile.prototype.STARTUP = org.eclipse.osgi.internal.profile.Profile.STARTUP, $t$);
if (dbgOptions != null) dbgOptions.setOption ("org.eclipse.osgi/profile/startup",  new Boolean (org.eclipse.osgi.internal.profile.Profile.STARTUP).toString ());
}if ((prop = System.getProperty ("osgi.profile.benchmark")) != null) {
($t$ = org.eclipse.osgi.internal.profile.Profile.BENCHMARK = Boolean.$valueOf (prop).booleanValue (), org.eclipse.osgi.internal.profile.Profile.prototype.BENCHMARK = org.eclipse.osgi.internal.profile.Profile.BENCHMARK, $t$);
if (dbgOptions != null) dbgOptions.setOption ("org.eclipse.osgi/profile/benchmark",  new Boolean (org.eclipse.osgi.internal.profile.Profile.BENCHMARK).toString ());
}if ((prop = System.getProperty ("osgi.profile.debug")) != null) {
($t$ = org.eclipse.osgi.internal.profile.Profile.DEBUG = Boolean.$valueOf (prop).booleanValue (), org.eclipse.osgi.internal.profile.Profile.prototype.DEBUG = org.eclipse.osgi.internal.profile.Profile.DEBUG, $t$);
if (dbgOptions != null) dbgOptions.setOption ("org.eclipse.osgi/profile/debug",  new Boolean (org.eclipse.osgi.internal.profile.Profile.DEBUG).toString ());
}if (org.eclipse.osgi.internal.profile.Profile.profileLogger == null) {
if ((prop = System.getProperty ("osgi.profile.impl")) != null) {
($t$ = org.eclipse.osgi.internal.profile.Profile.profileLoggerClassName = prop, org.eclipse.osgi.internal.profile.Profile.prototype.profileLoggerClassName = org.eclipse.osgi.internal.profile.Profile.profileLoggerClassName, $t$);
if (dbgOptions != null) dbgOptions.setOption ("org.eclipse.osgi/profile/impl", org.eclipse.osgi.internal.profile.Profile.profileLoggerClassName);
}} else {
org.eclipse.osgi.internal.profile.Profile.profileLogger.initProps ();
}});
c$.logEnter = Clazz.defineMethod (c$, "logEnter", 
function (id) {
org.eclipse.osgi.internal.profile.Profile.logTime (1, id, "enter", null);
}, "~S");
c$.logEnter = Clazz.defineMethod (c$, "logEnter", 
function (id, description) {
org.eclipse.osgi.internal.profile.Profile.logTime (1, id, "enter", description);
}, "~S,~S");
c$.logExit = Clazz.defineMethod (c$, "logExit", 
function (id) {
org.eclipse.osgi.internal.profile.Profile.logTime (2, id, "exit", null);
}, "~S");
c$.logExit = Clazz.defineMethod (c$, "logExit", 
function (id, description) {
org.eclipse.osgi.internal.profile.Profile.logTime (2, id, "exit", description);
}, "~S,~S");
c$.logTime = Clazz.defineMethod (c$, "logTime", 
function (id, msg) {
org.eclipse.osgi.internal.profile.Profile.logTime (0, id, msg, null);
}, "~S,~S");
c$.logTime = Clazz.defineMethod (c$, "logTime", 
function (id, msg, description) {
org.eclipse.osgi.internal.profile.Profile.logTime (0, id, msg, description);
}, "~S,~S,~S");
c$.logTime = Clazz.defineMethod (c$, "logTime", 
function (flag, id, msg, description) {
if (org.eclipse.osgi.internal.profile.Profile.profileLogger == null) {
if (org.eclipse.osgi.internal.profile.Profile.profileLoggerClassName != null) {
var profileImplClass = null;
try {
profileImplClass = Class.forName (org.eclipse.osgi.internal.profile.Profile.profileLoggerClassName);
($t$ = org.eclipse.osgi.internal.profile.Profile.profileLogger = profileImplClass.newInstance (), org.eclipse.osgi.internal.profile.Profile.prototype.profileLogger = org.eclipse.osgi.internal.profile.Profile.profileLogger, $t$);
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
}
}if (org.eclipse.osgi.internal.profile.Profile.profileLogger == null) ($t$ = org.eclipse.osgi.internal.profile.Profile.profileLogger =  new org.eclipse.osgi.internal.profile.DefaultProfileLogger (), org.eclipse.osgi.internal.profile.Profile.prototype.profileLogger = org.eclipse.osgi.internal.profile.Profile.profileLogger, $t$);
}org.eclipse.osgi.internal.profile.Profile.profileLogger.logTime (flag, id, msg, description);
}, "~N,~S,~S,~S");
c$.getProfileLog = Clazz.defineMethod (c$, "getProfileLog", 
function () {
if (org.eclipse.osgi.internal.profile.Profile.profileLogger != null) return org.eclipse.osgi.internal.profile.Profile.profileLogger.getProfileLog ();
return "";
});
Clazz.defineStatics (c$,
"PROFILE", true,
"STARTUP", false,
"BENCHMARK", false,
"DEBUG", false,
"OSGI_PROP", "osgi.profile.");
c$.PROP_STARTUP = c$.prototype.PROP_STARTUP = "osgi.profile.startup";
c$.PROP_BENCHMARK = c$.prototype.PROP_BENCHMARK = "osgi.profile.benchmark";
c$.PROP_DEBUG = c$.prototype.PROP_DEBUG = "osgi.profile.debug";
c$.PROP_IMPL = c$.prototype.PROP_IMPL = "osgi.profile.impl";
Clazz.defineStatics (c$,
"OSGI_OPTION", "org.eclipse.osgi/profile/");
c$.OPTION_STARTUP = c$.prototype.OPTION_STARTUP = "org.eclipse.osgi/profile/startup";
c$.OPTION_BENCHMARK = c$.prototype.OPTION_BENCHMARK = "org.eclipse.osgi/profile/benchmark";
c$.OPTION_DEBUG = c$.prototype.OPTION_DEBUG = "org.eclipse.osgi/profile/debug";
c$.OPTION_IMPL = c$.prototype.OPTION_IMPL = "org.eclipse.osgi/profile/impl";
Clazz.defineStatics (c$,
"FLAG_NONE", 0,
"FLAG_ENTER", 1,
"FLAG_EXIT", 2,
"ENTER_DESCRIPTION", "enter",
"EXIT_DESCRIPTION", "exit",
"profileLogger", null,
"profileLoggerClassName", null);
{
org.eclipse.osgi.internal.profile.Profile.initProps ();
}});
