Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.eclipse.osgi.framework.util.Headers", "org.osgi.framework.ServiceRegistration"], "org.eclipse.osgi.framework.internal.core.ServiceRegistrationImpl", ["java.lang.IllegalStateException", "$.Long", "$.StringBuffer", "java.lang.reflect.Array", "java.util.ArrayList", "org.eclipse.osgi.framework.debug.Debug", "org.eclipse.osgi.framework.internal.core.Msg", "$.ServiceReferenceImpl", "$.ServiceUse"], function () {
c$ = Clazz.decorateAsClass (function () {
this.reference = null;
this.framework = null;
this.context = null;
this.bundle = null;
this.contextsUsing = null;
this.clazzes = null;
this.service = null;
this.properties = null;
this.serviceid = 0;
this.serviceranking = 0;
this.registrationLock = null;
this.state = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "ServiceRegistrationImpl", null, org.osgi.framework.ServiceRegistration);
Clazz.pu$h ();
c$ = Clazz.declareType (org.eclipse.osgi.framework.internal.core.ServiceRegistrationImpl, "Properties", org.eclipse.osgi.framework.util.Headers);
Clazz.makeConstructor (c$, 
($fz = function (a, b) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.internal.core.ServiceRegistrationImpl.Properties, [(a << 1) + 1]);
if (b != null) {
{
var c = b.keys ();
while (c.hasMoreElements ()) {
var d = c.nextElement ();
if (Clazz.instanceOf (d, String)) {
var e = d;
this.setProperty (e, b.get (e));
}}
}}}, $fz.isPrivate = true, $fz), "~N,java.util.Dictionary");
Clazz.makeConstructor (c$, 
function (a) {
this.construct ((a == null) ? 2 : Math.max (2, a.size ()), a);
}, "java.util.Dictionary");
Clazz.defineMethod (c$, "getProperty", 
function (a) {
return (org.eclipse.osgi.framework.internal.core.ServiceRegistrationImpl.Properties.cloneValue (this.get (a)));
}, "~S");
Clazz.defineMethod (c$, "getPropertyKeys", 
function () {
var a = this.size ();
var b =  new Array (a);
var c = this.keys ();
for (var d = 0; d < a; d++) {
b[d] = c.nextElement ();
}
return (b);
});
Clazz.defineMethod (c$, "setProperty", 
function (a, b) {
return (this.set (a, org.eclipse.osgi.framework.internal.core.ServiceRegistrationImpl.Properties.cloneValue (b)));
}, "~S,~O");
c$.cloneValue = Clazz.defineMethod (c$, "cloneValue", 
function (a) {
if (a == null) return null;
if (Clazz.instanceOf (a, String)) return (a);
var b = a.getClass ();
if (b.isArray ()) {
var c = b.getComponentType ();
var d = java.lang.reflect.Array.getLength (a);
var e = java.lang.reflect.Array.newInstance (c, d);
System.arraycopy (a, 0, e, 0, d);
return e;
}try {
return (b.getMethod ("clone", [null]).invoke (a, [null]));
} catch (e$$) {
if (Clazz.instanceOf (e$$, Exception)) {
var e = e$$;
{
}
} else if (Clazz.instanceOf (e$$, Error)) {
var e = e$$;
{
if (Clazz.instanceOf (a, java.util.Vector)) return ((a).clone ());
if (Clazz.instanceOf (a, java.util.Hashtable)) return ((a).clone ());
}
} else {
throw e$$;
}
}
return (a);
}, "~O");
Clazz.overrideMethod (c$, "toString", 
function () {
var a = this.getPropertyKeys ();
var b = a.length;
var c =  new StringBuffer (20 * b);
c.append ('{');
var d = 0;
for (var e = 0; e < b; e++) {
var f = a[e];
if (!f.equals ("objectClass")) {
if (d > 0) {
c.append (", ");
}c.append (f);
c.append ('=');
c.append (this.get (f));
d++;
}}
c.append ('}');
return (c.toString ());
});
c$ = Clazz.p0p ();
Clazz.prepareFields (c$, function () {
this.registrationLock =  new Object ();
});
Clazz.makeConstructor (c$, 
function (context, clazzes, service, properties) {
this.context = context;
this.bundle = context.bundle;
this.framework = context.framework;
this.clazzes = clazzes;
this.service = service;
this.contextsUsing = null;
this.reference =  new org.eclipse.osgi.framework.internal.core.ServiceReferenceImpl (this);
{
this.serviceid = this.framework.getNextServiceId ();
this.properties = this.createProperties (properties);
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SERVICES) {
org.eclipse.osgi.framework.debug.Debug.println ("registerService[" + this.bundle + "](" + this + ")");
}this.framework.serviceRegistry.publishService (context, this);
}this.framework.publishServiceEvent (1, this.reference);
}, "org.eclipse.osgi.framework.internal.core.BundleContextImpl,~A,~O,java.util.Dictionary");
Clazz.overrideMethod (c$, "unregister", 
function () {
{
if (this.state != 0) {
throw  new IllegalStateException (org.eclipse.osgi.framework.internal.core.Msg.SERVICE_ALREADY_UNREGISTERED_EXCEPTION);
}if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SERVICES) {
org.eclipse.osgi.framework.debug.Debug.println ("unregisterService[" + this.bundle + "](" + this + ")");
}{
this.framework.serviceRegistry.unpublishService (this.context, this);
}this.state = 1;
}this.framework.publishServiceEvent (4, this.reference);
this.service = null;
this.state = 2;
var size = 0;
var users = null;
{
if (this.contextsUsing != null) {
size = this.contextsUsing.size ();
if (size > 0) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SERVICES) {
org.eclipse.osgi.framework.debug.Debug.println ("unregisterService: releasing users");
}users = this.contextsUsing.toArray ( new Array (size));
}}}for (var i = 0; i < size; i++) {
this.releaseService (users[i]);
}
this.contextsUsing = null;
this.reference = null;
this.context = null;
});
Clazz.overrideMethod (c$, "getReference", 
function () {
if (this.reference == null) {
throw  new IllegalStateException (org.eclipse.osgi.framework.internal.core.Msg.SERVICE_ALREADY_UNREGISTERED_EXCEPTION);
}return (this.reference);
});
Clazz.overrideMethod (c$, "setProperties", 
function (props) {
{
if (this.state != 0) {
throw  new IllegalStateException (org.eclipse.osgi.framework.internal.core.Msg.SERVICE_ALREADY_UNREGISTERED_EXCEPTION);
}this.properties = this.createProperties (props);
}this.framework.publishServiceEvent (2, this.reference);
}, "java.util.Dictionary");
Clazz.defineMethod (c$, "createProperties", 
function (props) {
var properties =  new org.eclipse.osgi.framework.internal.core.ServiceRegistrationImpl.Properties (props);
properties.setProperty ("objectClass", null);
properties.setProperty ("objectClass", this.clazzes);
properties.setProperty ("service.id", null);
properties.setProperty ("service.id",  new Long (this.serviceid));
var ranking = properties.getProperty ("service.ranking");
this.serviceranking = (Clazz.instanceOf (ranking, Integer)) ? (ranking).intValue () : 0;
return (properties);
}, "java.util.Dictionary");
Clazz.defineMethod (c$, "getProperty", 
function (key) {
{
return (this.properties.getProperty (key));
}}, "~S");
Clazz.defineMethod (c$, "getPropertyKeys", 
function () {
{
return (this.properties.getPropertyKeys ());
}});
Clazz.defineMethod (c$, "getBundle", 
function () {
if (this.reference == null) {
return (null);
}return (this.bundle);
});
Clazz.defineMethod (c$, "getService", 
function (user) {
{
if (this.state == 2) {
return (null);
}if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SERVICES) {
org.eclipse.osgi.framework.debug.Debug.println ("getService[" + user.bundle + "](" + this + ")");
}var servicesInUse = user.servicesInUse;
var use = servicesInUse.get (this.reference);
if (use == null) {
use =  new org.eclipse.osgi.framework.internal.core.ServiceUse (user, this);
var service = use.getService ();
if (service != null) {
servicesInUse.put (this.reference, use);
if (this.contextsUsing == null) {
this.contextsUsing =  new java.util.ArrayList (10);
}this.contextsUsing.add (user);
}return (service);
} else {
return (use.getService ());
}}}, "org.eclipse.osgi.framework.internal.core.BundleContextImpl");
Clazz.defineMethod (c$, "ungetService", 
function (user) {
{
if (this.state == 2) {
return (false);
}if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SERVICES) {
var bundle = (user.bundle == null) ? "" : user.bundle.toString ();
org.eclipse.osgi.framework.debug.Debug.println ("ungetService[" + bundle + "](" + this + ")");
}var servicesInUse = user.servicesInUse;
if (servicesInUse != null) {
var use = servicesInUse.get (this.reference);
if (use != null) {
if (use.ungetService ()) {
servicesInUse.remove (this.reference);
this.contextsUsing.remove (user);
}return (true);
}}return (false);
}}, "org.eclipse.osgi.framework.internal.core.BundleContextImpl");
Clazz.defineMethod (c$, "releaseService", 
function (user) {
{
if (this.reference == null) {
return ;
}if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_SERVICES) {
var bundle = (user.bundle == null) ? "" : user.bundle.toString ();
org.eclipse.osgi.framework.debug.Debug.println ("releaseService[" + bundle + "](" + this + ")");
}var servicesInUse = user.servicesInUse;
if (servicesInUse != null) {
var use = servicesInUse.remove (this.reference);
if (use != null) {
use.releaseService ();
this.contextsUsing.remove (user);
}}}}, "org.eclipse.osgi.framework.internal.core.BundleContextImpl");
Clazz.defineMethod (c$, "getUsingBundles", 
function () {
{
if (this.state == 2) return (null);
if (this.contextsUsing == null) return (null);
var size = this.contextsUsing.size ();
if (size == 0) return (null);
var bundles =  new Array (size);
for (var i = 0; i < size; i++) bundles[i] = (this.contextsUsing.get (i)).bundle;

return (bundles);
}});
Clazz.overrideMethod (c$, "toString", 
function () {
var clazzes = this.clazzes;
var size = clazzes.length;
var sb =  new StringBuffer (50 * size);
sb.append ('{');
for (var i = 0; i < size; i++) {
if (i > 0) {
sb.append (", ");
}sb.append (clazzes[i]);
}
sb.append ("}=");
sb.append (this.properties);
return (sb.toString ());
});
Clazz.defineStatics (c$,
"REGISTERED", 0x00,
"UNREGISTERING", 0x01,
"UNREGISTERED", 0x02);
});
