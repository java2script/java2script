Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.osgi.framework.ServiceListener"], "org.eclipse.osgi.framework.internal.core.FilteredServiceListener", ["org.eclipse.osgi.framework.debug.Debug", "org.eclipse.osgi.framework.internal.core.FilterImpl"], function () {
c$ = Clazz.decorateAsClass (function () {
this.filter = null;
this.listener = null;
this.context = null;
this.allservices = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "FilteredServiceListener", null, org.osgi.framework.ServiceListener);
Clazz.makeConstructor (c$, 
function (filterstring, listener, context) {
if (filterstring != null) this.filter =  new org.eclipse.osgi.framework.internal.core.FilterImpl (filterstring);
this.listener = listener;
this.context = context;
this.allservices = (Clazz.instanceOf (listener, org.osgi.framework.AllServiceListener));
}, "~S,org.osgi.framework.ServiceListener,org.eclipse.osgi.framework.internal.core.BundleContextImpl");
Clazz.defineMethod (c$, "serviceChanged", 
function (event) {
if (!this.context.hasListenServicePermission (event)) return ;
if (this.filter == null) {
if (this.allservices || this.context.isAssignableTo (event.getServiceReference ())) this.listener.serviceChanged (event);
return ;
}var reference = event.getServiceReference ();
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_EVENTS) {
var listenerName = this.getClass ().getName () + "@" + Integer.toHexString (this.hashCode ());
org.eclipse.osgi.framework.debug.Debug.println ("filterServiceEvent(" + listenerName + ", \"" + this.filter + "\", " + reference.registration.properties + ")");
}if (this.filter.match (reference) && (this.allservices || this.context.isAssignableTo (event.getServiceReference ()))) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_EVENTS) {
var listenerName = this.listener.getClass ().getName () + "@" + Integer.toHexString (this.listener.hashCode ());
org.eclipse.osgi.framework.debug.Debug.println ("dispatchFilteredServiceEvent(" + listenerName + ")");
}this.listener.serviceChanged (event);
}}, "org.osgi.framework.ServiceEvent");
Clazz.defineMethod (c$, "toString", 
function () {
return this.filter == null ? this.listener.toString () : this.filter.toString ();
});
});
