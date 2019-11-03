Clazz.declarePackage ("org.osgi.util.tracker");
Clazz.load (["java.util.Hashtable", "org.osgi.framework.AllServiceListener", "$.ServiceListener", "org.osgi.util.tracker.ServiceTrackerCustomizer"], "org.osgi.util.tracker.ServiceTracker", ["java.lang.IllegalArgumentException", "$.NullPointerException", "$.RuntimeException", "java.util.ArrayList"], function () {
c$ = Clazz.decorateAsClass (function () {
this.context = null;
this.filter = null;
this.customizer = null;
this.listenerFilter = null;
this.trackClass = null;
this.trackReference = null;
this.tracked = null;
this.trackingCount = -1;
this.cachedReference = null;
this.cachedService = null;
if (!Clazz.isClassDefined ("org.osgi.util.tracker.ServiceTracker.Tracked")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.adding = null;
this.closed = false;
Clazz.instantialize (this, arguments);
}, org.osgi.util.tracker.ServiceTracker, "Tracked", java.util.Hashtable, org.osgi.framework.ServiceListener);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.osgi.util.tracker.ServiceTracker.Tracked);
this.closed = false;
this.adding =  new java.util.ArrayList (6);
});
Clazz.defineMethod (c$, "close", 
function () {
this.closed = true;
});
Clazz.overrideMethod (c$, "serviceChanged", 
function (a) {
if (this.closed) {
return ;
}var b = a.getServiceReference ();
switch (a.getType ()) {
case 1:
case 2:
if (this.b$["org.osgi.util.tracker.ServiceTracker"].listenerFilter != null) {
this.track (b);
} else {
if (this.b$["org.osgi.util.tracker.ServiceTracker"].filter.match (b)) {
this.track (b);
} else {
this.untrack (b);
}}break;
case 4:
this.untrack (b);
break;
}
}, "org.osgi.framework.ServiceEvent");
Clazz.defineMethod (c$, "track", 
function (a) {
var b;
{
b = this.get (a);
}if (b != null) {
if (false) {
System.out.println ("ServiceTracker.Tracked.track[modified]: " + a);
}this.b$["org.osgi.util.tracker.ServiceTracker"].customizer.modifiedService (a, b);
return ;
}{
if (this.adding.contains (a)) {
if (false) {
System.out.println ("ServiceTracker.Tracked.track[already adding]: " + a);
}return ;
}this.adding.add (a);
}if (false) {
System.out.println ("ServiceTracker.Tracked.track[adding]: " + a);
}var c = false;
try {
b = this.b$["org.osgi.util.tracker.ServiceTracker"].customizer.addingService (a);
} finally {
{
if (this.adding.remove (a)) {
if (b != null) {
this.put (a, b);
this.b$["org.osgi.util.tracker.ServiceTracker"].modified ();
this.notifyAll ();
}} else {
c = true;
}}}
if (c) {
if (false) {
System.out.println ("ServiceTracker.Tracked.track[removed]: " + a);
}this.b$["org.osgi.util.tracker.ServiceTracker"].customizer.removedService (a, b);
}}, "org.osgi.framework.ServiceReference");
Clazz.defineMethod (c$, "untrack", 
function (a) {
var b;
{
if (this.adding.remove (a)) {
if (false) {
System.out.println ("ServiceTracker.Tracked.untrack[being added]: " + a);
}return ;
}b = this.remove (a);
if (b == null) {
return ;
}this.b$["org.osgi.util.tracker.ServiceTracker"].modified ();
}if (false) {
System.out.println ("ServiceTracker.Tracked.untrack[removed]: " + a);
}this.b$["org.osgi.util.tracker.ServiceTracker"].customizer.removedService (a, b);
}, "org.osgi.framework.ServiceReference");
c$ = Clazz.p0p ();
}
if (!Clazz.isClassDefined ("org.osgi.util.tracker.ServiceTracker.AllTracked")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, org.osgi.util.tracker.ServiceTracker, "AllTracked", org.osgi.util.tracker.ServiceTracker.Tracked, org.osgi.framework.AllServiceListener, Clazz.innerTypeInstance (org.osgi.util.tracker.ServiceTracker.Tracked, this, null, Clazz.inheritArgs));
c$ = Clazz.p0p ();
}
Clazz.instantialize (this, arguments);
}, org.osgi.util.tracker, "ServiceTracker", null, org.osgi.util.tracker.ServiceTrackerCustomizer);
Clazz.makeConstructor (c$, 
function (context, reference, customizer) {
this.context = context;
this.trackReference = reference;
this.trackClass = null;
this.customizer = (customizer == null) ? this : customizer;
this.listenerFilter = "(" + "service.id" + "=" + reference.getProperty ("service.id").toString () + ")";
try {
this.filter = context.createFilter (this.listenerFilter);
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.InvalidSyntaxException)) {
throw  new IllegalArgumentException ("unexpected InvalidSyntaxException: " + e.getMessage ());
} else {
throw e;
}
}
}, "org.osgi.framework.BundleContext,org.osgi.framework.ServiceReference,org.osgi.util.tracker.ServiceTrackerCustomizer");
Clazz.makeConstructor (c$, 
function (context, clazz, customizer) {
this.context = context;
this.trackReference = null;
this.trackClass = clazz;
this.customizer = (customizer == null) ? this : customizer;
this.listenerFilter = "(" + "objectClass" + "=" + clazz.toString () + ")";
try {
this.filter = context.createFilter (this.listenerFilter);
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.InvalidSyntaxException)) {
throw  new IllegalArgumentException ("unexpected InvalidSyntaxException: " + e.getMessage ());
} else {
throw e;
}
}
}, "org.osgi.framework.BundleContext,~S,org.osgi.util.tracker.ServiceTrackerCustomizer");
Clazz.makeConstructor (c$, 
function (context, filter, customizer) {
this.context = context;
this.trackReference = null;
this.trackClass = null;
this.listenerFilter = null;
this.filter = filter;
this.customizer = (customizer == null) ? this : customizer;
if ((context == null) || (filter == null)) {
throw  new NullPointerException ();
}}, "org.osgi.framework.BundleContext,org.osgi.framework.Filter,org.osgi.util.tracker.ServiceTrackerCustomizer");
Clazz.defineMethod (c$, "open", 
function () {
this.open (false);
});
Clazz.defineMethod (c$, "open", 
function (trackAllServices) {
if (this.tracked != null) {
return ;
}if (false) {
System.out.println ("ServiceTracker.open: " + this.filter);
}this.tracked = trackAllServices ? Clazz.innerTypeInstance (org.osgi.util.tracker.ServiceTracker.AllTracked, this, null) : Clazz.innerTypeInstance (org.osgi.util.tracker.ServiceTracker.Tracked, this, null);
this.trackingCount = 0;
var references;
{
try {
this.context.addServiceListener (this.tracked, this.listenerFilter);
if (this.listenerFilter == null) {
references = this.getInitialReferences (trackAllServices, null, this.filter.toString ());
} else {
if (this.trackClass == null) {
references = [this.trackReference];
} else {
references = this.getInitialReferences (trackAllServices, this.trackClass, null);
}}} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.InvalidSyntaxException)) {
throw  new RuntimeException ("unexpected InvalidSyntaxException: " + e.getMessage ());
} else {
throw e;
}
}
}if (references != null) {
var length = references.length;
for (var i = 0; i < length; i++) {
var reference = references[i];
if (reference.getBundle () != null) {
this.tracked.track (reference);
}}
}}, "~B");
Clazz.defineMethod (c$, "getInitialReferences", 
($fz = function (trackAllServices, trackClass, filterString) {
if (trackAllServices) {
return this.context.getAllServiceReferences (trackClass, filterString);
} else {
return this.context.getServiceReferences (trackClass, filterString);
}}, $fz.isPrivate = true, $fz), "~B,~S,~S");
Clazz.defineMethod (c$, "close", 
function () {
if (this.tracked == null) {
return ;
}if (false) {
System.out.println ("ServiceTracker.close: " + this.filter);
}this.tracked.close ();
var references = this.getServiceReferences ();
var outgoing = this.tracked;
this.tracked = null;
try {
this.context.removeServiceListener (outgoing);
} catch (e) {
if (Clazz.instanceOf (e, IllegalStateException)) {
} else {
throw e;
}
}
if (references != null) {
for (var i = 0; i < references.length; i++) {
outgoing.untrack (references[i]);
}
}this.trackingCount = -1;
if (false) {
if ((this.cachedReference == null) && (this.cachedService == null)) {
System.out.println ("ServiceTracker.close[cached cleared]: " + this.filter);
}}});
Clazz.defineMethod (c$, "addingService", 
function (reference) {
return this.context.getService (reference);
}, "org.osgi.framework.ServiceReference");
Clazz.defineMethod (c$, "modifiedService", 
function (reference, service) {
}, "org.osgi.framework.ServiceReference,~O");
Clazz.defineMethod (c$, "removedService", 
function (reference, service) {
this.context.ungetService (reference);
}, "org.osgi.framework.ServiceReference,~O");
Clazz.defineMethod (c$, "waitForService", 
function (timeout) {
if (timeout < 0) {
throw  new IllegalArgumentException ("timeout value is negative");
}var object = this.getService ();
while (object == null) {
var tracked = this.tracked;
if (tracked == null) {
return null;
}{
if (tracked.size () == 0) {
tracked.wait (timeout);
}}object = this.getService ();
if (timeout > 0) {
return object;
}}
return object;
}, "~N");
Clazz.defineMethod (c$, "getServiceReferences", 
function () {
var tracked = this.tracked;
if (tracked == null) {
return null;
}{
var length = tracked.size ();
if (length == 0) {
return null;
}var references =  new Array (length);
var keys = tracked.keys ();
for (var i = 0; i < length; i++) {
references[i] = keys.nextElement ();
}
return references;
}});
Clazz.defineMethod (c$, "getServiceReference", 
function () {
var reference = this.cachedReference;
if (reference != null) {
if (false) {
System.out.println ("ServiceTracker.getServiceReference[cached]: " + this.filter);
}return reference;
}if (false) {
System.out.println ("ServiceTracker.getServiceReference: " + this.filter);
}var references = this.getServiceReferences ();
var length = (references == null) ? 0 : references.length;
if (length == 0) {
return null;
}var index = 0;
if (length > 1) {
var rankings =  Clazz.newArray (length, 0);
var count = 0;
var maxRanking = -2147483648;
for (var i = 0; i < length; i++) {
var property = references[i].getProperty ("service.ranking");
var ranking = (Clazz.instanceOf (property, Integer)) ? (property).intValue () : 0;
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
var id = ((references[i].getProperty ("service.id"))).longValue ();
if (id < minId) {
index = i;
minId = id;
}}}
}}return this.cachedReference = references[index];
});
Clazz.defineMethod (c$, "getService", 
function (reference) {
var tracked = this.tracked;
if (tracked == null) {
return null;
}{
return tracked.get (reference);
}}, "org.osgi.framework.ServiceReference");
Clazz.defineMethod (c$, "getServices", 
function () {
var tracked = this.tracked;
if (tracked == null) {
return null;
}{
var references = this.getServiceReferences ();
var length = (references == null) ? 0 : references.length;
if (length == 0) {
return null;
}var objects =  new Array (length);
for (var i = 0; i < length; i++) {
objects[i] = this.getService (references[i]);
}
return objects;
}});
Clazz.defineMethod (c$, "getService", 
function () {
var service = this.cachedService;
if (service != null) {
if (false) {
System.out.println ("ServiceTracker.getService[cached]: " + this.filter);
}return service;
}if (false) {
System.out.println ("ServiceTracker.getService: " + this.filter);
}var reference = this.getServiceReference ();
if (reference == null) {
return null;
}return this.cachedService = this.getService (reference);
});
Clazz.defineMethod (c$, "remove", 
function (reference) {
var tracked = this.tracked;
if (tracked == null) {
return ;
}tracked.untrack (reference);
}, "org.osgi.framework.ServiceReference");
Clazz.defineMethod (c$, "size", 
function () {
var tracked = this.tracked;
if (tracked == null) {
return 0;
}return tracked.size ();
});
Clazz.defineMethod (c$, "getTrackingCount", 
function () {
return this.trackingCount;
});
Clazz.defineMethod (c$, "modified", 
($fz = function () {
this.trackingCount++;
this.cachedReference = null;
this.cachedService = null;
if (false) {
System.out.println ("ServiceTracker.modified: " + this.filter);
}}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "finalize", 
function () {
});
Clazz.defineStatics (c$,
"DEBUG", false);
});
