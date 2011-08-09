Clazz.declarePackage ("org.eclipse.osgi.framework.debug");
Clazz.load (null, "org.eclipse.osgi.framework.debug.Debug", ["java.lang.Throwable", "java.lang.reflect.Modifier", "org.eclipse.osgi.framework.debug.FrameworkDebugOptions"], function () {
c$ = Clazz.declareType (org.eclipse.osgi.framework.debug, "Debug");
c$.print = Clazz.defineMethod (c$, "print", 
function (x) {
org.eclipse.osgi.framework.debug.Debug.out.print (x);
}, "~B");
c$.print = Clazz.defineMethod (c$, "print", 
function (x) {
org.eclipse.osgi.framework.debug.Debug.out.print (x);
}, "~N");
c$.print = Clazz.defineMethod (c$, "print", 
function (x) {
org.eclipse.osgi.framework.debug.Debug.out.print (x);
}, "~N");
c$.print = Clazz.defineMethod (c$, "print", 
function (x) {
org.eclipse.osgi.framework.debug.Debug.out.print (x);
}, "~N");
c$.print = Clazz.defineMethod (c$, "print", 
function (x) {
org.eclipse.osgi.framework.debug.Debug.out.print (x);
}, "~N");
c$.print = Clazz.defineMethod (c$, "print", 
function (x) {
org.eclipse.osgi.framework.debug.Debug.out.print (x);
}, "~N");
c$.print = Clazz.defineMethod (c$, "print", 
function (x) {
org.eclipse.osgi.framework.debug.Debug.out.print (x);
}, "~A");
c$.print = Clazz.defineMethod (c$, "print", 
function (x) {
org.eclipse.osgi.framework.debug.Debug.out.print (x);
}, "~S");
c$.print = Clazz.defineMethod (c$, "print", 
function (x) {
org.eclipse.osgi.framework.debug.Debug.out.print (x);
}, "~O");
c$.println = Clazz.defineMethod (c$, "println", 
function (x) {
org.eclipse.osgi.framework.debug.Debug.out.println (x);
}, "~B");
c$.println = Clazz.defineMethod (c$, "println", 
function (x) {
org.eclipse.osgi.framework.debug.Debug.out.println (x);
}, "~N");
c$.println = Clazz.defineMethod (c$, "println", 
function (x) {
org.eclipse.osgi.framework.debug.Debug.out.println (x);
}, "~N");
c$.println = Clazz.defineMethod (c$, "println", 
function (x) {
org.eclipse.osgi.framework.debug.Debug.out.println (x);
}, "~N");
c$.println = Clazz.defineMethod (c$, "println", 
function (x) {
org.eclipse.osgi.framework.debug.Debug.out.println (x);
}, "~N");
c$.println = Clazz.defineMethod (c$, "println", 
function (x) {
org.eclipse.osgi.framework.debug.Debug.out.println (x);
}, "~N");
c$.println = Clazz.defineMethod (c$, "println", 
function (x) {
org.eclipse.osgi.framework.debug.Debug.out.println (x);
}, "~A");
c$.println = Clazz.defineMethod (c$, "println", 
function (x) {
org.eclipse.osgi.framework.debug.Debug.out.println (x);
}, "~S");
c$.println = Clazz.defineMethod (c$, "println", 
function (x) {
org.eclipse.osgi.framework.debug.Debug.out.println (x);
}, "~O");
c$.printStackTrace = Clazz.defineMethod (c$, "printStackTrace", 
function (t) {
t.printStackTrace (org.eclipse.osgi.framework.debug.Debug.out);
var methods = t.getClass ().getMethods ();
var size = methods.length;
var throwable = Throwable;
for (var i = 0; i < size; i++) {
var method = methods[i];
if (java.lang.reflect.Modifier.isPublic (method.getModifiers ()) && method.getName ().startsWith ("get") && throwable.isAssignableFrom (method.getReturnType ()) && (method.getParameterTypes ().length == 0)) {
try {
var nested = method.invoke (t, [null]);
if ((nested != null) && (nested !== t)) {
org.eclipse.osgi.framework.debug.Debug.out.println ("Nested Exception:");
org.eclipse.osgi.framework.debug.Debug.printStackTrace (nested);
}} catch (e$$) {
if (Clazz.instanceOf (e$$, IllegalAccessException)) {
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
}}
}, "Throwable");
Clazz.defineStatics (c$,
"DEBUG", true,
"DEBUG_GENERAL", false,
"DEBUG_BUNDLE_TIME", false,
"DEBUG_LOADER", false,
"DEBUG_EVENTS", false,
"DEBUG_SERVICES", false,
"DEBUG_PACKAGES", false,
"DEBUG_MANIFEST", false,
"DEBUG_FILTER", false,
"DEBUG_SECURITY", false,
"DEBUG_STARTLEVEL", false,
"DEBUG_PACKAGEADMIN", false,
"DEBUG_PACKAGEADMIN_TIMING", false,
"DEBUG_MESSAGE_BUNDLES", false,
"MONITOR_ACTIVATION", false,
"ECLIPSE_OSGI", "org.eclipse.osgi");
c$.OPTION_DEBUG_GENERAL = c$.prototype.OPTION_DEBUG_GENERAL = "org.eclipse.osgi/debug";
c$.OPTION_DEBUG_BUNDLE_TIME = c$.prototype.OPTION_DEBUG_BUNDLE_TIME = "org.eclipse.osgi/debug/bundleTime";
c$.OPTION_DEBUG_LOADER = c$.prototype.OPTION_DEBUG_LOADER = "org.eclipse.osgi/debug/loader";
c$.OPTION_DEBUG_EVENTS = c$.prototype.OPTION_DEBUG_EVENTS = "org.eclipse.osgi/debug/events";
c$.OPTION_DEBUG_SERVICES = c$.prototype.OPTION_DEBUG_SERVICES = "org.eclipse.osgi/debug/services";
c$.OPTION_DEBUG_PACKAGES = c$.prototype.OPTION_DEBUG_PACKAGES = "org.eclipse.osgi/debug/packages";
c$.OPTION_DEBUG_MANIFEST = c$.prototype.OPTION_DEBUG_MANIFEST = "org.eclipse.osgi/debug/manifest";
c$.OPTION_DEBUG_FILTER = c$.prototype.OPTION_DEBUG_FILTER = "org.eclipse.osgi/debug/filter";
c$.OPTION_DEBUG_SECURITY = c$.prototype.OPTION_DEBUG_SECURITY = "org.eclipse.osgi/debug/security";
c$.OPTION_DEBUG_STARTLEVEL = c$.prototype.OPTION_DEBUG_STARTLEVEL = "org.eclipse.osgi/debug/startlevel";
c$.OPTION_DEBUG_PACKAGEADMIN = c$.prototype.OPTION_DEBUG_PACKAGEADMIN = "org.eclipse.osgi/debug/packageadmin";
c$.OPTION_DEBUG_PACKAGEADMIN_TIMING = c$.prototype.OPTION_DEBUG_PACKAGEADMIN_TIMING = "org.eclipse.osgi/debug/packageadmin/timing";
c$.OPTION_MONITOR_ACTIVATION = c$.prototype.OPTION_MONITOR_ACTIVATION = "org.eclipse.osgi/monitor/activation";
c$.OPTION_DEBUG_MESSAGE_BUNDLES = c$.prototype.OPTION_DEBUG_MESSAGE_BUNDLES = "org.eclipse.osgi/debug/messageBundles";
{
var dbgOptions = org.eclipse.osgi.framework.debug.FrameworkDebugOptions.getDefault ();
if (dbgOptions != null) {
($t$ = org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL = dbgOptions.getBooleanOption ("org.eclipse.osgi/debug", false), org.eclipse.osgi.framework.debug.Debug.prototype.DEBUG_GENERAL = org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL, $t$);
($t$ = org.eclipse.osgi.framework.debug.Debug.DEBUG_BUNDLE_TIME = dbgOptions.getBooleanOption ("org.eclipse.osgi/debug/bundleTime", false) || dbgOptions.getBooleanOption ("org.eclipse.core.runtime/timing/startup", false), org.eclipse.osgi.framework.debug.Debug.prototype.DEBUG_BUNDLE_TIME = org.eclipse.osgi.framework.debug.Debug.DEBUG_BUNDLE_TIME, $t$);
($t$ = org.eclipse.osgi.framework.debug.Debug.DEBUG_LOADER = dbgOptions.getBooleanOption ("org.eclipse.osgi/debug/loader", false), org.eclipse.osgi.framework.debug.Debug.prototype.DEBUG_LOADER = org.eclipse.osgi.framework.debug.Debug.DEBUG_LOADER, $t$);
($t$ = org.eclipse.osgi.framework.debug.Debug.DEBUG_EVENTS = dbgOptions.getBooleanOption ("org.eclipse.osgi/debug/events", false), org.eclipse.osgi.framework.debug.Debug.prototype.DEBUG_EVENTS = org.eclipse.osgi.framework.debug.Debug.DEBUG_EVENTS, $t$);
($t$ = org.eclipse.osgi.framework.debug.Debug.DEBUG_SERVICES = dbgOptions.getBooleanOption ("org.eclipse.osgi/debug/services", false), org.eclipse.osgi.framework.debug.Debug.prototype.DEBUG_SERVICES = org.eclipse.osgi.framework.debug.Debug.DEBUG_SERVICES, $t$);
($t$ = org.eclipse.osgi.framework.debug.Debug.DEBUG_PACKAGES = dbgOptions.getBooleanOption ("org.eclipse.osgi/debug/packages", false), org.eclipse.osgi.framework.debug.Debug.prototype.DEBUG_PACKAGES = org.eclipse.osgi.framework.debug.Debug.DEBUG_PACKAGES, $t$);
($t$ = org.eclipse.osgi.framework.debug.Debug.DEBUG_MANIFEST = dbgOptions.getBooleanOption ("org.eclipse.osgi/debug/manifest", false), org.eclipse.osgi.framework.debug.Debug.prototype.DEBUG_MANIFEST = org.eclipse.osgi.framework.debug.Debug.DEBUG_MANIFEST, $t$);
($t$ = org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER = dbgOptions.getBooleanOption ("org.eclipse.osgi/debug/filter", false), org.eclipse.osgi.framework.debug.Debug.prototype.DEBUG_FILTER = org.eclipse.osgi.framework.debug.Debug.DEBUG_FILTER, $t$);
($t$ = org.eclipse.osgi.framework.debug.Debug.DEBUG_SECURITY = dbgOptions.getBooleanOption ("org.eclipse.osgi/debug/security", false), org.eclipse.osgi.framework.debug.Debug.prototype.DEBUG_SECURITY = org.eclipse.osgi.framework.debug.Debug.DEBUG_SECURITY, $t$);
($t$ = org.eclipse.osgi.framework.debug.Debug.DEBUG_STARTLEVEL = dbgOptions.getBooleanOption ("org.eclipse.osgi/debug/startlevel", false), org.eclipse.osgi.framework.debug.Debug.prototype.DEBUG_STARTLEVEL = org.eclipse.osgi.framework.debug.Debug.DEBUG_STARTLEVEL, $t$);
($t$ = org.eclipse.osgi.framework.debug.Debug.DEBUG_PACKAGEADMIN = dbgOptions.getBooleanOption ("org.eclipse.osgi/debug/packageadmin", false), org.eclipse.osgi.framework.debug.Debug.prototype.DEBUG_PACKAGEADMIN = org.eclipse.osgi.framework.debug.Debug.DEBUG_PACKAGEADMIN, $t$);
($t$ = org.eclipse.osgi.framework.debug.Debug.DEBUG_PACKAGEADMIN_TIMING = dbgOptions.getBooleanOption ("org.eclipse.osgi/debug/packageadmin/timing", false) || dbgOptions.getBooleanOption ("org.eclipse.core.runtime/debug", false), org.eclipse.osgi.framework.debug.Debug.prototype.DEBUG_PACKAGEADMIN_TIMING = org.eclipse.osgi.framework.debug.Debug.DEBUG_PACKAGEADMIN_TIMING, $t$);
($t$ = org.eclipse.osgi.framework.debug.Debug.DEBUG_MESSAGE_BUNDLES = dbgOptions.getBooleanOption ("org.eclipse.osgi/debug/messageBundles", false), org.eclipse.osgi.framework.debug.Debug.prototype.DEBUG_MESSAGE_BUNDLES = org.eclipse.osgi.framework.debug.Debug.DEBUG_MESSAGE_BUNDLES, $t$);
($t$ = org.eclipse.osgi.framework.debug.Debug.MONITOR_ACTIVATION = dbgOptions.getBooleanOption ("org.eclipse.osgi/monitor/activation", false), org.eclipse.osgi.framework.debug.Debug.prototype.MONITOR_ACTIVATION = org.eclipse.osgi.framework.debug.Debug.MONITOR_ACTIVATION, $t$);
}}c$.out = c$.prototype.out = System.out;
});
