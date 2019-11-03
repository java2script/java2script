Clazz.declarePackage ("org.eclipse.osgi.framework.internal.protocol");
Clazz.load (["java.net.ContentHandler", "org.osgi.util.tracker.ServiceTrackerCustomizer"], "org.eclipse.osgi.framework.internal.protocol.ContentHandlerProxy", ["org.eclipse.osgi.framework.internal.protocol.StreamHandlerFactory", "org.osgi.util.tracker.ServiceTracker"], function () {
c$ = Clazz.decorateAsClass (function () {
this.realHandler = null;
this.contentHandlerServiceTracker = null;
this.context = null;
this.contentHandlerServiceReference = null;
this.contentType = null;
this.ranking = -1;
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.protocol.ContentHandlerProxy.DefaultContentHandler")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.protocol.ContentHandlerProxy, "DefaultContentHandler", java.net.ContentHandler);
Clazz.defineMethod (c$, "getContent", 
function (a) {
return a.getInputStream ();
}, "java.net.URLConnection");
c$ = Clazz.p0p ();
}
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.protocol, "ContentHandlerProxy", java.net.ContentHandler, org.osgi.util.tracker.ServiceTrackerCustomizer);
Clazz.makeConstructor (c$, 
function (contentType, reference, context) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.internal.protocol.ContentHandlerProxy, []);
this.context = context;
this.contentType = contentType;
if (reference != null) {
this.setNewHandler (reference, this.getRank (reference));
} else {
this.realHandler = Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.protocol.ContentHandlerProxy.DefaultContentHandler, this, null);
}this.contentHandlerServiceTracker =  new org.osgi.util.tracker.ServiceTracker (context, java.net.ContentHandler.getName (), this);
org.eclipse.osgi.framework.internal.protocol.StreamHandlerFactory.secureAction.open (this.contentHandlerServiceTracker);
}, "~S,org.osgi.framework.ServiceReference,org.osgi.framework.BundleContext");
Clazz.defineMethod (c$, "setNewHandler", 
($fz = function (reference, rank) {
this.contentHandlerServiceReference = reference;
this.ranking = rank;
this.realHandler = org.eclipse.osgi.framework.internal.protocol.StreamHandlerFactory.secureAction.getService (reference, this.context);
}, $fz.isPrivate = true, $fz), "org.osgi.framework.ServiceReference,~N");
Clazz.overrideMethod (c$, "addingService", 
function (reference) {
var prop = reference.getProperty ("url.content.mimetype");
if (!(Clazz.instanceOf (prop, Array))) return null;
var contentTypes = prop;
for (var i = 0; i < contentTypes.length; i++) {
if (contentTypes[i].equals (this.contentType)) {
var newServiceRanking = this.getRank (reference);
if (newServiceRanking > this.ranking) {
this.setNewHandler (reference, newServiceRanking);
}return (reference);
}}
return (null);
}, "org.osgi.framework.ServiceReference");
Clazz.overrideMethod (c$, "modifiedService", 
function (reference, service) {
var newrank = this.getRank (reference);
if (reference === this.contentHandlerServiceReference) {
if (newrank < this.ranking) {
var newReference = this.contentHandlerServiceTracker.getServiceReference ();
if (newReference !== this.contentHandlerServiceReference && newReference != null) {
this.setNewHandler (newReference, (newReference.getProperty ("service.ranking")).intValue ());
}}} else if (newrank > this.ranking) {
this.setNewHandler (reference, newrank);
}}, "org.osgi.framework.ServiceReference,~O");
Clazz.overrideMethod (c$, "removedService", 
function (reference, service) {
if (reference === this.contentHandlerServiceReference) {
var newReference = this.contentHandlerServiceTracker.getServiceReference ();
if (newReference != null) {
this.setNewHandler (newReference, this.getRank (newReference));
} else {
this.ranking = -1;
this.realHandler = Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.protocol.ContentHandlerProxy.DefaultContentHandler, this, null);
}}}, "org.osgi.framework.ServiceReference,~O");
Clazz.defineMethod (c$, "getContent", 
function (uConn) {
return this.realHandler.getContent (uConn);
}, "java.net.URLConnection");
Clazz.defineMethod (c$, "getRank", 
($fz = function (reference) {
var property = reference.getProperty ("service.ranking");
return (Clazz.instanceOf (property, Integer)) ? (property).intValue () : 0;
}, $fz.isPrivate = true, $fz), "org.osgi.framework.ServiceReference");
});
