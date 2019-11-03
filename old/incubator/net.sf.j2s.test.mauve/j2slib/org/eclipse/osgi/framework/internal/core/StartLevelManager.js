Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["java.util.EventListener", "org.eclipse.osgi.framework.eventmgr.EventDispatcher", "org.osgi.framework.ServiceFactory"], "org.eclipse.osgi.framework.internal.core.StartLevelManager", ["java.lang.IllegalArgumentException", "$.RuntimeException", "java.security.AccessController", "$.PrivilegedExceptionAction", "org.eclipse.osgi.framework.debug.Debug", "org.eclipse.osgi.framework.eventmgr.EventListeners", "$.EventManager", "$.ListenerQueue", "org.eclipse.osgi.framework.internal.core.Msg", "$.StartLevelEvent", "$.StartLevelImpl", "$.Util", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.frameworkBeginningStartLevel = 1;
this.initialBundleStartLevel = 1;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "StartLevelManager", null, [org.eclipse.osgi.framework.eventmgr.EventDispatcher, java.util.EventListener, org.osgi.framework.ServiceFactory]);
Clazz.makeConstructor (c$, 
function (framework) {
($t$ = org.eclipse.osgi.framework.internal.core.StartLevelManager.framework = framework, org.eclipse.osgi.framework.internal.core.StartLevelManager.prototype.framework = org.eclipse.osgi.framework.internal.core.StartLevelManager.framework, $t$);
}, "org.eclipse.osgi.framework.internal.core.Framework");
Clazz.defineMethod (c$, "initialize", 
function () {
this.initialBundleStartLevel = org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.adaptor.getInitialBundleStartLevel ();
var value = org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.getProperty ("osgi.framework.beginningstartlevel");
if (value == null) {
value = "1";
} else {
try {
if (Integer.parseInt (value) <= 0) {
System.err.println (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.PROPERTIES_INVALID_FW_STARTLEVEL, "1"));
value = "1";
}} catch (nfe) {
if (Clazz.instanceOf (nfe, NumberFormatException)) {
System.err.println (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.PROPERTIES_INVALID_FW_STARTLEVEL, "1"));
value = "1";
} else {
throw nfe;
}
}
}org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.setProperty ("osgi.framework.beginningstartlevel", value);
this.frameworkBeginningStartLevel = Integer.parseInt (value);
($t$ = org.eclipse.osgi.framework.internal.core.StartLevelManager.eventManager =  new org.eclipse.osgi.framework.eventmgr.EventManager ("Start Level Event Dispatcher"), org.eclipse.osgi.framework.internal.core.StartLevelManager.prototype.eventManager = org.eclipse.osgi.framework.internal.core.StartLevelManager.eventManager, $t$);
($t$ = org.eclipse.osgi.framework.internal.core.StartLevelManager.startLevelListeners =  new org.eclipse.osgi.framework.eventmgr.EventListeners (), org.eclipse.osgi.framework.internal.core.StartLevelManager.prototype.startLevelListeners = org.eclipse.osgi.framework.internal.core.StartLevelManager.startLevelListeners, $t$);
org.eclipse.osgi.framework.internal.core.StartLevelManager.startLevelListeners.addListener (this, this);
});
Clazz.defineMethod (c$, "cleanup", 
function () {
org.eclipse.osgi.framework.internal.core.StartLevelManager.eventManager.close ();
($t$ = org.eclipse.osgi.framework.internal.core.StartLevelManager.eventManager = null, org.eclipse.osgi.framework.internal.core.StartLevelManager.prototype.eventManager = org.eclipse.osgi.framework.internal.core.StartLevelManager.eventManager, $t$);
org.eclipse.osgi.framework.internal.core.StartLevelManager.startLevelListeners.removeAllListeners ();
($t$ = org.eclipse.osgi.framework.internal.core.StartLevelManager.startLevelListeners = null, org.eclipse.osgi.framework.internal.core.StartLevelManager.prototype.startLevelListeners = org.eclipse.osgi.framework.internal.core.StartLevelManager.startLevelListeners, $t$);
});
Clazz.defineMethod (c$, "getInitialBundleStartLevel", 
function () {
return this.initialBundleStartLevel;
});
Clazz.defineMethod (c$, "getFrameworkStartLevel", 
function () {
return this.frameworkBeginningStartLevel;
});
Clazz.defineMethod (c$, "setInitialBundleStartLevel", 
function (startlevel) {
org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.checkAdminPermission (org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.systemBundle, "startlevel");
if (startlevel <= 0) {
throw  new IllegalArgumentException ();
}this.initialBundleStartLevel = startlevel;
org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.adaptor.setInitialBundleStartLevel (startlevel);
}, "~N");
Clazz.defineMethod (c$, "getStartLevel", 
function () {
return org.eclipse.osgi.framework.internal.core.StartLevelManager.activeSL;
});
Clazz.defineMethod (c$, "setStartLevel", 
function (newSL, callerBundle) {
if (newSL <= 0) {
throw  new IllegalArgumentException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.STARTLEVEL_EXCEPTION_INVALID_REQUESTED_STARTLEVEL, "" + newSL));
}org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.checkAdminPermission (org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.systemBundle, "startlevel");
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_STARTLEVEL) {
org.eclipse.osgi.framework.debug.Debug.println ("StartLevelImpl: setStartLevel: " + newSL + "; callerBundle = " + callerBundle.getBundleId ());
}this.issueEvent ( new org.eclipse.osgi.framework.internal.core.StartLevelEvent (1, newSL, callerBundle));
}, "~N,org.osgi.framework.Bundle");
Clazz.defineMethod (c$, "setStartLevel", 
function (newSL) {
this.setStartLevel (newSL, org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.systemBundle);
}, "~N");
Clazz.defineMethod (c$, "launch", 
function (startlevel) {
this.doSetStartLevel (startlevel, org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.systemBundle);
}, "~N");
Clazz.defineMethod (c$, "shutdown", 
function () {
this.doSetStartLevel (0, org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.systemBundle);
});
Clazz.defineMethod (c$, "doSetStartLevel", 
($fz = function (newSL, callerBundle) {
{
var tempSL = org.eclipse.osgi.framework.internal.core.StartLevelManager.activeSL;
if (newSL > tempSL) {
for (var i = tempSL; i < newSL; i++) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_STARTLEVEL) {
org.eclipse.osgi.framework.debug.Debug.println ("sync - incrementing Startlevel from " + tempSL);
}tempSL++;
this.incFWSL (i + 1, callerBundle);
}
} else {
for (var i = tempSL; i > newSL; i--) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_STARTLEVEL) {
org.eclipse.osgi.framework.debug.Debug.println ("sync - decrementing Startlevel from " + tempSL);
}tempSL--;
this.decFWSL (i - 1);
}
}org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.publishFrameworkEvent (8, callerBundle, null);
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_STARTLEVEL) {
org.eclipse.osgi.framework.debug.Debug.println ("StartLevelImpl: doSetStartLevel: STARTLEVEL_CHANGED event published");
}}}, $fz.isPrivate = true, $fz), "~N,org.eclipse.osgi.framework.internal.core.AbstractBundle");
Clazz.defineMethod (c$, "saveActiveStartLevel", 
function (newSL) {
{
($t$ = org.eclipse.osgi.framework.internal.core.StartLevelManager.activeSL = newSL, org.eclipse.osgi.framework.internal.core.StartLevelManager.prototype.activeSL = org.eclipse.osgi.framework.internal.core.StartLevelManager.activeSL, $t$);
}}, "~N");
Clazz.defineMethod (c$, "isBundlePersistentlyStarted", 
function (bundle) {
if (bundle.getState () == 1) {
throw  new IllegalArgumentException (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_UNINSTALLED_EXCEPTION);
}var b = bundle;
var status = b.getBundleData ().getStatus ();
return ((status & 1) == 1);
}, "org.osgi.framework.Bundle");
Clazz.defineMethod (c$, "getBundleStartLevel", 
function (bundle) {
if (bundle.getState () == 1) {
throw  new IllegalArgumentException (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_UNINSTALLED_EXCEPTION);
}return (bundle).getStartLevel ();
}, "org.osgi.framework.Bundle");
Clazz.defineMethod (c$, "setBundleStartLevel", 
function (bundle, newSL) {
var exceptionText = "";
if (bundle.getBundleId () == 0) {
exceptionText = org.eclipse.osgi.framework.internal.core.Msg.STARTLEVEL_CANT_CHANGE_SYSTEMBUNDLE_STARTLEVEL;
} else if (bundle.getState () == 1) {
exceptionText = org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_UNINSTALLED_EXCEPTION;
} else if (newSL <= 0) {
exceptionText = org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.STARTLEVEL_EXCEPTION_INVALID_REQUESTED_STARTLEVEL, "" + newSL);
}if (exceptionText.length > 0) {
throw  new IllegalArgumentException (exceptionText);
}org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.checkAdminPermission (bundle, "execute");
try {
if (newSL != (bundle).getStartLevel ()) {
var b = bundle;
b.getBundleData ().setStartLevel (newSL);
try {
java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.StartLevelManager$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "StartLevelManager$1", null, java.security.PrivilegedExceptionAction);
Clazz.overrideMethod (c$, "run", 
function () {
this.f$.b.getBundleData ().save ();
return null;
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.StartLevelManager$1, i$, v$);
}) (this, Clazz.cloneFinals ("b", b)));
} catch (e) {
if (Clazz.instanceOf (e, java.security.PrivilegedActionException)) {
if (Clazz.instanceOf (e.getException (), java.io.IOException)) {
throw e.getException ();
}throw e.getException ();
} else {
throw e;
}
}
this.issueEvent ( new org.eclipse.osgi.framework.internal.core.StartLevelEvent (0, newSL, bundle));
}} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.publishFrameworkEvent (2, bundle, e);
} else {
throw e;
}
}
}, "org.osgi.framework.Bundle,~N");
Clazz.defineMethod (c$, "issueEvent", 
($fz = function (sle) {
var queue =  new org.eclipse.osgi.framework.eventmgr.ListenerQueue (org.eclipse.osgi.framework.internal.core.StartLevelManager.eventManager);
queue.queueListeners (org.eclipse.osgi.framework.internal.core.StartLevelManager.startLevelListeners, this);
queue.dispatchEventAsynchronous (sle.getType (), sle);
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.framework.internal.core.StartLevelEvent");
Clazz.overrideMethod (c$, "dispatchEvent", 
function (listener, listenerObject, eventAction, eventObject) {
try {
switch (eventAction) {
case 0:
this.setBundleSL (eventObject);
break;
case 1:
this.doSetStartLevel ((eventObject).getNewSL (), (eventObject).getBundle ());
break;
}
} catch (t) {
if (Clazz.instanceOf (t, Throwable)) {
org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.adaptor.handleRuntimeError (t);
} else {
throw t;
}
}
}, "~O,~O,~N,~O");
Clazz.defineMethod (c$, "incFWSL", 
function (activeSL, callerBundle) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_STARTLEVEL) {
org.eclipse.osgi.framework.debug.Debug.println ("SLL: incFWSL: saving activeSL of " + activeSL);
}org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.startLevelManager.saveActiveStartLevel (activeSL);
var launch;
var bundles = org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.bundles;
launch = this.getInstalledBundles (bundles);
if (activeSL == 1) {
this.loadInstalledBundles (launch);
this.resumeBundles (launch, true);
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_STARTLEVEL) {
org.eclipse.osgi.framework.debug.Debug.println ("SLL: Framework started");
}org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.publishFrameworkEvent (1, callerBundle, null);
} else {
this.resumeBundles (launch, false);
}}, "~N,org.eclipse.osgi.framework.internal.core.AbstractBundle");
Clazz.defineMethod (c$, "getInstalledBundles", 
($fz = function (bundles) {
var installedBundles;
{
var allBundles = bundles.getBundles ();
installedBundles =  new Array (allBundles.size ());
allBundles.toArray (installedBundles);
org.eclipse.osgi.framework.internal.core.Util.sort (installedBundles, 0, installedBundles.length);
}return installedBundles;
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.framework.internal.core.BundleRepository");
Clazz.defineMethod (c$, "loadInstalledBundles", 
($fz = function (installedBundles) {
for (var i = 0; i < installedBundles.length; i++) {
var bundle = installedBundles[i];
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_STARTLEVEL) {
org.eclipse.osgi.framework.debug.Debug.println ("SLL: Trying to load bundle " + bundle);
}bundle.load ();
}
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineMethod (c$, "resumeBundles", 
($fz = function (launch, launchingFW) {
if (launchingFW) {
try {
org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.systemBundle.state = 8;
org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.systemBundle.context.start ();
} catch (be) {
if (Clazz.instanceOf (be, org.osgi.framework.BundleException)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_STARTLEVEL) {
org.eclipse.osgi.framework.debug.Debug.println ("SLL: Bundle resume exception: " + be.getMessage ());
org.eclipse.osgi.framework.debug.Debug.printStackTrace (be.getNestedException ());
}org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.publishFrameworkEvent (2, org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.systemBundle, be);
throw  new RuntimeException (be.getMessage ());
} else {
throw be;
}
}
}var fwsl = org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.startLevelManager.getStartLevel ();
for (var i = 0; i < launch.length; i++) {
var bsl = launch[i].getStartLevel ();
if (bsl < fwsl) {
continue ;} else if (bsl == fwsl) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_STARTLEVEL) {
org.eclipse.osgi.framework.debug.Debug.println ("SLL: Active sl = " + fwsl + "; Bundle " + launch[i].getBundleId () + " sl = " + bsl);
}org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.resumeBundle (launch[i]);
} else {
break;
}}
org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.systemBundle.state = 32;
}, $fz.isPrivate = true, $fz), "~A,~B");
Clazz.defineMethod (c$, "decFWSL", 
function (activeSL) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_STARTLEVEL) {
org.eclipse.osgi.framework.debug.Debug.println ("SLL: decFWSL: saving activeSL of " + activeSL);
}org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.startLevelManager.saveActiveStartLevel (activeSL);
var bundles = org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.bundles;
if (activeSL == 0) {
this.suspendAllBundles (bundles);
this.unloadAllBundles (bundles);
} else {
var shutdown = this.getInstalledBundles (bundles);
for (var i = shutdown.length - 1; i >= 0; i--) {
var bsl = shutdown[i].getStartLevel ();
if (bsl > activeSL + 1) {
continue ;} else if (bsl <= activeSL) {
break;
} else if (shutdown[i].isActive ()) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_STARTLEVEL) {
org.eclipse.osgi.framework.debug.Debug.println ("SLL: stopping bundle " + shutdown[i].getBundleId ());
}org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.suspendBundle (shutdown[i], false);
}}
}}, "~N");
Clazz.defineMethod (c$, "suspendAllBundles", 
($fz = function (bundles) {
var changed;
do {
changed = false;
var shutdown = this.getInstalledBundles (bundles);
for (var i = shutdown.length - 1; i >= 0; i--) {
var bundle = shutdown[i];
if (org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.suspendBundle (bundle, false)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_STARTLEVEL) {
org.eclipse.osgi.framework.debug.Debug.println ("SLL: stopped bundle " + bundle.getBundleId ());
}changed = true;
}}
} while (changed);
try {
org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.systemBundle.context.stop ();
} catch (sbe) {
if (Clazz.instanceOf (sbe, org.osgi.framework.BundleException)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_STARTLEVEL) {
org.eclipse.osgi.framework.debug.Debug.println ("SLL: Bundle suspend exception: " + sbe.getMessage ());
org.eclipse.osgi.framework.debug.Debug.printStackTrace (sbe.getNestedException ());
}org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.publishFrameworkEvent (2, org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.systemBundle, sbe);
} else {
throw sbe;
}
}
org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.systemBundle.state = 4;
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.framework.internal.core.BundleRepository");
Clazz.defineMethod (c$, "unloadAllBundles", 
($fz = function (bundles) {
{
var allBundles = bundles.getBundles ();
var size = allBundles.size ();
for (var i = 0; i < size; i++) {
var bundle = allBundles.get (i);
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_STARTLEVEL) {
org.eclipse.osgi.framework.debug.Debug.println ("SLL: Trying to unload bundle " + bundle);
}bundle.refresh ();
try {
bundle.getBundleData ().close ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}
}}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.framework.internal.core.BundleRepository");
Clazz.defineMethod (c$, "setBundleSL", 
function (startLevelEvent) {
{
var activeSL = org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.startLevelManager.getStartLevel ();
var newSL = startLevelEvent.getNewSL ();
var bundle = startLevelEvent.getBundle ();
var bundlestate = bundle.getState ();
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_STARTLEVEL) {
org.eclipse.osgi.framework.debug.Debug.print ("SLL: bundle active=" + bundle.isActive ());
org.eclipse.osgi.framework.debug.Debug.print ("; newSL = " + newSL);
org.eclipse.osgi.framework.debug.Debug.println ("; activeSL = " + activeSL);
}if (bundle.isActive () && (newSL > activeSL)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_STARTLEVEL) {
org.eclipse.osgi.framework.debug.Debug.println ("SLL: stopping bundle " + bundle.getBundleId ());
}org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.suspendBundle (bundle, false);
} else {
if (!bundle.isActive () && (newSL <= activeSL)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_STARTLEVEL) {
org.eclipse.osgi.framework.debug.Debug.println ("SLL: starting bundle " + bundle.getBundleId ());
}org.eclipse.osgi.framework.internal.core.StartLevelManager.framework.resumeBundle (bundle);
}}if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_STARTLEVEL) {
org.eclipse.osgi.framework.debug.Debug.println ("SLL: Bundle Startlevel set to " + newSL);
}}}, "org.eclipse.osgi.framework.internal.core.StartLevelEvent");
Clazz.overrideMethod (c$, "getService", 
function (owner, registration) {
return  new org.eclipse.osgi.framework.internal.core.StartLevelImpl (owner, org.eclipse.osgi.framework.internal.core.StartLevelManager.framework);
}, "org.osgi.framework.Bundle,org.osgi.framework.ServiceRegistration");
Clazz.overrideMethod (c$, "ungetService", 
function (owner, registration, service) {
}, "org.osgi.framework.Bundle,org.osgi.framework.ServiceRegistration,~O");
Clazz.defineStatics (c$,
"framework", null,
"eventManager", null,
"startLevelListeners", null,
"activeSL", 0);
c$.lock = c$.prototype.lock =  new Object ();
});
