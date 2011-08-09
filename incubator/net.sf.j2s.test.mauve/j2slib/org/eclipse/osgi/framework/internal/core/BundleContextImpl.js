Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.eclipse.osgi.framework.eventmgr.EventDispatcher", "org.osgi.framework.BundleContext", "java.lang.Boolean"], "org.eclipse.osgi.framework.internal.core.BundleContextImpl", ["java.lang.IllegalArgumentException", "$.IllegalStateException", "$.NullPointerException", "java.security.AccessController", "$.PrivilegedAction", "$.PrivilegedExceptionAction", "java.util.Hashtable", "org.eclipse.osgi.framework.debug.Debug", "org.eclipse.osgi.framework.eventmgr.EventListeners", "org.eclipse.osgi.framework.internal.core.FilterImpl", "$.FilteredServiceListener", "$.Msg", "$.ServiceRegistrationImpl", "org.eclipse.osgi.internal.profile.Profile", "org.eclipse.osgi.util.NLS", "org.osgi.framework.BundleException", "$.ServicePermission"], function () {
c$ = Clazz.decorateAsClass (function () {
this.valid = false;
this.bundle = null;
this.framework = null;
this.servicesInUse = null;
this.bundleEvent = null;
this.bundleEventSync = null;
this.serviceEvent = null;
this.frameworkEvent = null;
this.activator = null;
this.contextLock = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "BundleContextImpl", null, [org.osgi.framework.BundleContext, org.eclipse.osgi.framework.eventmgr.EventDispatcher]);
Clazz.prepareFields (c$, function () {
this.contextLock =  new Object ();
});
Clazz.makeConstructor (c$, 
function (bundle) {
this.bundle = bundle;
this.valid = true;
this.framework = bundle.framework;
this.bundleEvent = null;
this.bundleEventSync = null;
this.serviceEvent = null;
this.frameworkEvent = null;
this.servicesInUse = null;
this.activator = null;
}, "org.eclipse.osgi.framework.internal.core.BundleHost");
Clazz.defineMethod (c$, "close", 
function () {
this.valid = false;
if (this.serviceEvent != null) {
this.framework.serviceEvent.removeListener (this);
this.serviceEvent = null;
}if (this.frameworkEvent != null) {
this.framework.frameworkEvent.removeListener (this);
this.frameworkEvent = null;
}if (this.bundleEvent != null) {
this.framework.bundleEvent.removeListener (this);
this.bundleEvent = null;
}if (this.bundleEventSync != null) {
this.framework.bundleEventSync.removeListener (this);
this.bundleEventSync = null;
}var publishedReferences = null;
{
publishedReferences = this.framework.serviceRegistry.lookupServiceReferences (this);
}if (publishedReferences != null) {
for (var i = 0; i < publishedReferences.length; i++) {
try {
(publishedReferences[i]).registration.unregister ();
} catch (e) {
if (Clazz.instanceOf (e, IllegalStateException)) {
} else {
throw e;
}
}
}
}if (this.servicesInUse != null) {
var usedSize;
var usedRefs = null;
{
usedSize = this.servicesInUse.size ();
if (usedSize > 0) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SERVICES) {
org.eclipse.osgi.framework.debug.Debug.println ("Releasing services");
}usedRefs =  new Array (usedSize);
var refsEnum = this.servicesInUse.keys ();
for (var i = 0; i < usedSize; i++) {
usedRefs[i] = refsEnum.nextElement ();
}
}}for (var i = 0; i < usedSize; i++) {
(usedRefs[i]).registration.releaseService (this);
}
this.servicesInUse = null;
}this.bundle = null;
});
Clazz.overrideMethod (c$, "getProperty", 
function (key) {
var sm = System.getSecurityManager ();
if (sm != null) {
sm.checkPropertyAccess (key);
}return (this.framework.getProperty (key));
}, "~S");
Clazz.defineMethod (c$, "getBundle", 
function () {
this.checkValid ();
return (this.bundle);
});
Clazz.defineMethod (c$, "installBundle", 
function (location) {
this.checkValid ();
return this.framework.installBundle (location);
}, "~S");
Clazz.defineMethod (c$, "installBundle", 
function (location, $in) {
this.checkValid ();
return this.framework.installBundle (location, $in);
}, "~S,java.io.InputStream");
Clazz.defineMethod (c$, "getBundle", 
function (id) {
return (this.framework.getBundle (id));
}, "~N");
Clazz.defineMethod (c$, "getBundleByLocation", 
function (location) {
return (this.framework.getBundleByLocation (location));
}, "~S");
Clazz.overrideMethod (c$, "getBundles", 
function () {
return this.framework.getAllBundles ();
});
Clazz.defineMethod (c$, "addServiceListener", 
function (listener, filter) {
this.checkValid ();
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_EVENTS) {
var listenerName = listener.getClass ().getName () + "@" + Integer.toHexString (listener.hashCode ());
org.eclipse.osgi.framework.debug.Debug.println ("addServiceListener[" + this.bundle + "](" + listenerName + ", \"" + filter + "\")");
}var filteredListener =  new org.eclipse.osgi.framework.internal.core.FilteredServiceListener (filter, listener, this);
{
if (this.serviceEvent == null) {
this.serviceEvent =  new org.eclipse.osgi.framework.eventmgr.EventListeners ();
this.framework.serviceEvent.addListener (this, this);
}this.serviceEvent.addListener (listener, filteredListener);
}}, "org.osgi.framework.ServiceListener,~S");
Clazz.defineMethod (c$, "addServiceListener", 
function (listener) {
try {
this.addServiceListener (listener, null);
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.InvalidSyntaxException)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("InvalidSyntaxException w/ null filter" + e.getMessage ());
org.eclipse.osgi.framework.debug.Debug.printStackTrace (e);
}} else {
throw e;
}
}
}, "org.osgi.framework.ServiceListener");
Clazz.overrideMethod (c$, "removeServiceListener", 
function (listener) {
this.checkValid ();
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SERVICES) {
var listenerName = listener.getClass ().getName () + "@" + Integer.toHexString (listener.hashCode ());
org.eclipse.osgi.framework.debug.Debug.println ("removeServiceListener[" + this.bundle + "](" + listenerName + ")");
}if (this.serviceEvent != null) {
{
this.serviceEvent.removeListener (listener);
}}}, "org.osgi.framework.ServiceListener");
Clazz.overrideMethod (c$, "addBundleListener", 
function (listener) {
this.checkValid ();
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_EVENTS) {
var listenerName = listener.getClass ().getName () + "@" + Integer.toHexString (listener.hashCode ());
org.eclipse.osgi.framework.debug.Debug.println ("addBundleListener[" + this.bundle + "](" + listenerName + ")");
}if (Clazz.instanceOf (listener, org.osgi.framework.SynchronousBundleListener)) {
this.framework.checkAdminPermission (this.getBundle (), "listener");
{
if (this.bundleEventSync == null) {
this.bundleEventSync =  new org.eclipse.osgi.framework.eventmgr.EventListeners ();
this.framework.bundleEventSync.addListener (this, this);
}this.bundleEventSync.addListener (listener, listener);
}} else {
{
if (this.bundleEvent == null) {
this.bundleEvent =  new org.eclipse.osgi.framework.eventmgr.EventListeners ();
this.framework.bundleEvent.addListener (this, this);
}this.bundleEvent.addListener (listener, listener);
}}}, "org.osgi.framework.BundleListener");
Clazz.overrideMethod (c$, "removeBundleListener", 
function (listener) {
this.checkValid ();
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_EVENTS) {
var listenerName = listener.getClass ().getName () + "@" + Integer.toHexString (listener.hashCode ());
org.eclipse.osgi.framework.debug.Debug.println ("removeBundleListener[" + this.bundle + "](" + listenerName + ")");
}if (Clazz.instanceOf (listener, org.osgi.framework.SynchronousBundleListener)) {
this.framework.checkAdminPermission (this.getBundle (), "listener");
if (this.bundleEventSync != null) {
{
this.bundleEventSync.removeListener (listener);
}}} else {
if (this.bundleEvent != null) {
{
this.bundleEvent.removeListener (listener);
}}}}, "org.osgi.framework.BundleListener");
Clazz.overrideMethod (c$, "addFrameworkListener", 
function (listener) {
this.checkValid ();
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_EVENTS) {
var listenerName = listener.getClass ().getName () + "@" + Integer.toHexString (listener.hashCode ());
org.eclipse.osgi.framework.debug.Debug.println ("addFrameworkListener[" + this.bundle + "](" + listenerName + ")");
}{
if (this.frameworkEvent == null) {
this.frameworkEvent =  new org.eclipse.osgi.framework.eventmgr.EventListeners ();
this.framework.frameworkEvent.addListener (this, this);
}this.frameworkEvent.addListener (listener, listener);
}}, "org.osgi.framework.FrameworkListener");
Clazz.overrideMethod (c$, "removeFrameworkListener", 
function (listener) {
this.checkValid ();
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_EVENTS) {
var listenerName = listener.getClass ().getName () + "@" + Integer.toHexString (listener.hashCode ());
org.eclipse.osgi.framework.debug.Debug.println ("removeFrameworkListener[" + this.bundle + "](" + listenerName + ")");
}if (this.frameworkEvent != null) {
{
this.frameworkEvent.removeListener (listener);
}}}, "org.osgi.framework.FrameworkListener");
Clazz.defineMethod (c$, "registerService", 
function (clazzes, service, properties) {
this.checkValid ();
if (service == null) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SERVICES) {
org.eclipse.osgi.framework.debug.Debug.println ("Service object is null");
}throw  new NullPointerException (org.eclipse.osgi.framework.internal.core.Msg.SERVICE_ARGUMENT_NULL_EXCEPTION);
}var size = clazzes.length;
if (size == 0) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SERVICES) {
org.eclipse.osgi.framework.debug.Debug.println ("Classes array is empty");
}throw  new IllegalArgumentException (org.eclipse.osgi.framework.internal.core.Msg.SERVICE_EMPTY_CLASS_LIST_EXCEPTION);
}var copy =  new Array (clazzes.length);
for (var i = 0; i < clazzes.length; i++) {
copy[i] =  String.instantialize (clazzes[i].getBytes ());
}
clazzes = copy;
this.framework.checkRegisterServicePermission (clazzes);
if (!(Clazz.instanceOf (service, org.osgi.framework.ServiceFactory))) {
var invalidService = org.eclipse.osgi.framework.internal.core.BundleContextImpl.checkServiceClass (clazzes, service);
if (invalidService != null) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SERVICES) {
org.eclipse.osgi.framework.debug.Debug.println ("Service object is not an instanceof " + invalidService);
}throw  new IllegalArgumentException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.SERVICE_NOT_INSTANCEOF_CLASS_EXCEPTION, invalidService));
}}return (this.createServiceRegistration (clazzes, service, properties));
}, "~A,~O,java.util.Dictionary");
c$.checkServiceClass = Clazz.defineMethod (c$, "checkServiceClass", 
function (clazzes, serviceObject) {
var cl = java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.BundleContextImpl$1")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "BundleContextImpl$1", null, java.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
return this.f$.serviceObject.getClass ().getClassLoader ();
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.BundleContextImpl$1, i$, v$);
}) (this, Clazz.cloneFinals ("serviceObject", serviceObject)));
for (var i = 0; i < clazzes.length; i++) {
try {
var serviceClazz = cl == null ? Class.forName (clazzes[i]) : cl.loadClass (clazzes[i]);
if (!serviceClazz.isInstance (serviceObject)) return clazzes[i];
} catch (e) {
if (Clazz.instanceOf (e, ClassNotFoundException)) {
if (org.eclipse.osgi.framework.internal.core.BundleContextImpl.extensiveCheckServiceClass (clazzes[i], serviceObject.getClass ())) return clazzes[i];
} else {
throw e;
}
}
}
return null;
}, "~A,~O");
c$.extensiveCheckServiceClass = Clazz.defineMethod (c$, "extensiveCheckServiceClass", 
($fz = function (clazz, serviceClazz) {
if (clazz.equals (serviceClazz.getName ())) return false;
var interfaces = serviceClazz.getInterfaces ();
for (var i = 0; i < interfaces.length; i++) if (!org.eclipse.osgi.framework.internal.core.BundleContextImpl.extensiveCheckServiceClass (clazz, interfaces[i])) return false;

var superClazz = serviceClazz.getSuperclass ();
if (superClazz != null) if (!org.eclipse.osgi.framework.internal.core.BundleContextImpl.extensiveCheckServiceClass (clazz, superClazz)) return false;
return true;
}, $fz.isPrivate = true, $fz), "~S,Class");
Clazz.defineMethod (c$, "createServiceRegistration", 
function (clazzes, service, properties) {
return ( new org.eclipse.osgi.framework.internal.core.ServiceRegistrationImpl (this, clazzes, service, properties));
}, "~A,~O,java.util.Dictionary");
Clazz.defineMethod (c$, "registerService", 
function (clazz, service, properties) {
var clazzes = [clazz];
return (this.registerService (clazzes, service, properties));
}, "~S,~O,java.util.Dictionary");
Clazz.overrideMethod (c$, "getServiceReferences", 
function (clazz, filter) {
this.checkValid ();
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SERVICES) {
org.eclipse.osgi.framework.debug.Debug.println ("getServiceReferences(" + clazz + ", \"" + filter + "\")");
}return (this.framework.getServiceReferences (clazz, filter, this, false));
}, "~S,~S");
Clazz.overrideMethod (c$, "getAllServiceReferences", 
function (clazz, filter) {
this.checkValid ();
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SERVICES) {
org.eclipse.osgi.framework.debug.Debug.println ("getAllServiceReferences(" + clazz + ", \"" + filter + "\")");
}return (this.framework.getServiceReferences (clazz, filter, this, true));
}, "~S,~S");
Clazz.overrideMethod (c$, "getServiceReference", 
function (clazz) {
this.checkValid ();
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SERVICES) {
org.eclipse.osgi.framework.debug.Debug.println ("getServiceReference(" + clazz + ")");
}try {
var references = this.framework.getServiceReferences (clazz, null, this, false);
if (references != null) {
var index = 0;
var length = references.length;
if (length > 1) {
var rankings =  Clazz.newArray (length, 0);
var count = 0;
var maxRanking = -2147483648;
for (var i = 0; i < length; i++) {
var ranking = (references[i]).getRanking ();
rankings[i] = ranking;
if (ranking > maxRanking) {
index = i;
maxRanking = ranking;
count = 1;
} else {
if (ranking == maxRanking) {
count++;
}}}
if (count > 1) {
var minId = 9223372036854775807;
for (var i = 0; i < length; i++) {
if (rankings[i] == maxRanking) {
var id = (references[i]).getId ();
if (id < minId) {
index = i;
minId = id;
}}}
}}return (references[index]);
}} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.InvalidSyntaxException)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("InvalidSyntaxException w/ null filter" + e.getMessage ());
org.eclipse.osgi.framework.debug.Debug.printStackTrace (e);
}} else {
throw e;
}
}
return (null);
}, "~S");
Clazz.overrideMethod (c$, "getService", 
function (reference) {
this.checkValid ();
if (this.servicesInUse == null) {
{
if (this.servicesInUse == null) {
this.servicesInUse =  new java.util.Hashtable (10);
}}}var registration = (reference).registration;
this.framework.checkGetServicePermission (registration.clazzes);
return registration.getService (this);
}, "org.osgi.framework.ServiceReference");
Clazz.overrideMethod (c$, "ungetService", 
function (reference) {
this.checkValid ();
var registration = (reference).registration;
return registration.ungetService (this);
}, "org.osgi.framework.ServiceReference");
Clazz.overrideMethod (c$, "getDataFile", 
function (filename) {
this.checkValid ();
return (this.framework.getDataFile (this.bundle, filename));
}, "~S");
Clazz.defineMethod (c$, "start", 
function () {
this.activator = this.bundle.loadBundleActivator ();
if (this.activator != null) {
try {
this.startActivator (this.activator);
} catch (be) {
if (Clazz.instanceOf (be, org.osgi.framework.BundleException)) {
this.activator = null;
throw be;
} else {
throw be;
}
}
}});
Clazz.defineMethod (c$, "startActivator", 
function (bundleActivator) {
if (true && org.eclipse.osgi.internal.profile.Profile.STARTUP) org.eclipse.osgi.internal.profile.Profile.logEnter ("BundleContextImpl.startActivator()", null);
try {
java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.BundleContextImpl$2")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "BundleContextImpl$2", null, java.security.PrivilegedExceptionAction);
Clazz.overrideMethod (c$, "run", 
function () {
if (this.f$.bundleActivator != null) {
if (true && org.eclipse.osgi.internal.profile.Profile.STARTUP) org.eclipse.osgi.internal.profile.Profile.logTime ("BundleContextImpl.startActivator()", "calling " + this.b$["org.eclipse.osgi.framework.internal.core.BundleContextImpl"].bundle.getLocation () + " bundle activator");
this.f$.bundleActivator.start (this.b$["org.eclipse.osgi.framework.internal.core.BundleContextImpl"]);
if (true && org.eclipse.osgi.internal.profile.Profile.STARTUP) org.eclipse.osgi.internal.profile.Profile.logTime ("BundleContextImpl.startActivator()", "returned from " + this.b$["org.eclipse.osgi.framework.internal.core.BundleContextImpl"].bundle.getLocation () + " bundle activator");
}return null;
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.BundleContextImpl$2, i$, v$);
}) (this, Clazz.cloneFinals ("bundleActivator", bundleActivator)));
} catch (t) {
if (Clazz.instanceOf (t, Throwable)) {
if (Clazz.instanceOf (t, java.security.PrivilegedActionException)) {
t = (t).getException ();
}if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.printStackTrace (t);
}var clazz = null;
clazz = bundleActivator.getClass ().getName ();
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_ACTIVATOR_EXCEPTION, [clazz, "start", this.bundle.getSymbolicName () == null ? "" + this.bundle.getBundleId () : this.bundle.getSymbolicName ()]), t);
} else {
throw t;
}
} finally {
if (true && org.eclipse.osgi.internal.profile.Profile.STARTUP) org.eclipse.osgi.internal.profile.Profile.logExit ("BundleContextImpl.startActivator()");
}
}, "org.osgi.framework.BundleActivator");
Clazz.defineMethod (c$, "stop", 
function () {
try {
java.security.AccessController.doPrivileged ((function (i$, v$) {
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.BundleContextImpl$3")) {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (org.eclipse.osgi.framework.internal.core, "BundleContextImpl$3", null, java.security.PrivilegedExceptionAction);
Clazz.overrideMethod (c$, "run", 
function () {
if (this.b$["org.eclipse.osgi.framework.internal.core.BundleContextImpl"].activator != null) {
this.b$["org.eclipse.osgi.framework.internal.core.BundleContextImpl"].activator.stop (this.b$["org.eclipse.osgi.framework.internal.core.BundleContextImpl"]);
}return null;
});
c$ = Clazz.p0p ();
}
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.BundleContextImpl$3, i$, v$);
}) (this, null));
} catch (t) {
if (Clazz.instanceOf (t, Throwable)) {
if (Clazz.instanceOf (t, java.security.PrivilegedActionException)) {
t = (t).getException ();
}if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.printStackTrace (t);
}var clazz = (this.activator == null) ? "" : this.activator.getClass ().getName ();
throw  new org.osgi.framework.BundleException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_ACTIVATOR_EXCEPTION, [clazz, "stop", this.bundle.getSymbolicName () == null ? "" + this.bundle.getBundleId () : this.bundle.getSymbolicName ()]), t);
} else {
throw t;
}
} finally {
this.activator = null;
}
});
Clazz.defineMethod (c$, "getRegisteredServices", 
function () {
var services = null;
{
services = this.framework.serviceRegistry.lookupServiceReferences (this);
if (services == null) {
return null;
}var removed = 0;
for (var i = services.length - 1; i >= 0; i--) {
var ref = services[i];
var classes = ref.getClasses ();
try {
this.framework.checkGetServicePermission (classes);
} catch (se) {
if (Clazz.instanceOf (se, SecurityException)) {
services[i] = null;
removed++;
} else {
throw se;
}
}
}
if (removed > 0) {
var temp = services;
services =  new Array (temp.length - removed);
for (var i = temp.length - 1; i >= 0; i--) {
if (temp[i] == null) removed--;
 else services[i - removed] = temp[i];
}
}}return (services);
});
Clazz.defineMethod (c$, "getServicesInUse", 
function () {
if (this.servicesInUse == null) {
return (null);
}{
var size = this.servicesInUse.size ();
if (size == 0) {
return (null);
}var references =  new Array (size);
var refcount = 0;
var refsEnum = this.servicesInUse.keys ();
for (var i = 0; i < size; i++) {
var reference = refsEnum.nextElement ();
try {
this.framework.checkGetServicePermission (reference.registration.clazzes);
} catch (se) {
if (Clazz.instanceOf (se, SecurityException)) {
continue ;} else {
throw se;
}
}
references[refcount] = reference;
refcount++;
}
if (refcount < size) {
if (refcount == 0) {
return (null);
}var refs = references;
references =  new Array (refcount);
System.arraycopy (refs, 0, references, 0, refcount);
}return (references);
}});
Clazz.overrideMethod (c$, "dispatchEvent", 
function (originalListener, l, action, object) {
var tmpBundle = this.bundle;
try {
if (this.isValid ()) {
switch (action) {
case 1:
case 2:
{
var listener = l;
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_EVENTS) {
var listenerName = listener.getClass ().getName () + "@" + Integer.toHexString (listener.hashCode ());
org.eclipse.osgi.framework.debug.Debug.println ("dispatchBundleEvent[" + tmpBundle + "](" + listenerName + ")");
}var event = object;
switch (event.getType ()) {
case -2147483647:
{
if (Clazz.instanceOf (listener, org.eclipse.osgi.event.BatchBundleListener)) (listener).batchBegin ();
break;
}case -2147483648:
{
if (Clazz.instanceOf (listener, org.eclipse.osgi.event.BatchBundleListener)) (listener).batchEnd ();
break;
}default:
{
listener.bundleChanged (object);
}}
break;
}case 3:
{
var event = object;
var listener = l;
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_EVENTS) {
var listenerName = listener.getClass ().getName () + "@" + Integer.toHexString (listener.hashCode ());
org.eclipse.osgi.framework.debug.Debug.println ("dispatchServiceEvent[" + tmpBundle + "](" + listenerName + ")");
}listener.serviceChanged (event);
break;
}case 4:
{
var listener = l;
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_EVENTS) {
var listenerName = listener.getClass ().getName () + "@" + Integer.toHexString (listener.hashCode ());
org.eclipse.osgi.framework.debug.Debug.println ("dispatchFrameworkEvent[" + tmpBundle + "](" + listenerName + ")");
}listener.frameworkEvent (object);
break;
}}
}} catch (t) {
if (Clazz.instanceOf (t, Throwable)) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Exception in bottom level event dispatcher: " + t.getMessage ());
org.eclipse.osgi.framework.debug.Debug.printStackTrace (t);
}this.framework.adaptor.handleRuntimeError (t);
publisherror : {
if (action == 4) {
var event = object;
if (event.getType () == 2) {
break publisherror;
}}this.framework.publishFrameworkEvent (2, tmpBundle, t);
}} else {
throw t;
}
}
}, "~O,~O,~N,~O");
Clazz.defineMethod (c$, "hasListenServicePermission", 
function (event) {
var domain = this.bundle.getProtectionDomain ();
if (domain != null) {
var reference = event.getServiceReference ();
var names = reference.registration.clazzes;
var len = names.length;
for (var i = 0; i < len; i++) {
if (domain.implies ( new org.osgi.framework.ServicePermission (names[i], "get"))) {
return true;
}}
return false;
}return (true);
}, "org.osgi.framework.ServiceEvent");
Clazz.overrideMethod (c$, "createFilter", 
function (filter) {
this.checkValid ();
return ( new org.eclipse.osgi.framework.internal.core.FilterImpl (filter));
}, "~S");
Clazz.defineMethod (c$, "checkValid", 
function () {
if (!this.isValid ()) {
throw  new IllegalStateException (org.eclipse.osgi.framework.internal.core.Msg.BUNDLE_CONTEXT_INVALID_EXCEPTION);
}});
Clazz.defineMethod (c$, "isValid", 
function () {
return this.valid;
});
Clazz.defineMethod (c$, "isAssignableTo", 
function (reference) {
if (!org.eclipse.osgi.framework.internal.core.BundleContextImpl.scopeEvents) return true;
var clazzes = reference.getClasses ();
for (var i = 0; i < clazzes.length; i++) if (!reference.isAssignableTo (this.bundle, clazzes[i])) return false;

return true;
}, "org.eclipse.osgi.framework.internal.core.ServiceReferenceImpl");
Clazz.defineStatics (c$,
"PROP_SCOPE_SERVICE_EVENTS", "osgi.scopeServiceEvents");
c$.scopeEvents = c$.prototype.scopeEvents = Boolean.$valueOf (System.getProperty ("osgi.scopeServiceEvents", "true")).booleanValue ();
});
