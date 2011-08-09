Clazz.declarePackage ("org.eclipse.osgi.framework.internal.protocol");
Clazz.load (["java.net.URLStreamHandler", "org.osgi.util.tracker.ServiceTrackerCustomizer"], "org.eclipse.osgi.framework.internal.protocol.URLStreamHandlerProxy", ["org.eclipse.osgi.framework.internal.protocol.NullURLStreamHandlerService", "$.StreamHandlerFactory", "$.URLStreamHandlerSetter", "org.osgi.util.tracker.ServiceTracker"], function () {
c$ = Clazz.decorateAsClass (function () {
this.realHandlerService = null;
this.urlSetter = null;
this.urlStreamHandlerServiceTracker = null;
this.handlerRegistered = false;
this.context = null;
this.urlStreamServiceReference = null;
this.protocol = null;
this.ranking = -1;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.protocol, "URLStreamHandlerProxy", java.net.URLStreamHandler, org.osgi.util.tracker.ServiceTrackerCustomizer);
Clazz.makeConstructor (c$, 
function (protocol, reference, context) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.internal.protocol.URLStreamHandlerProxy, []);
this.handlerRegistered = true;
this.context = context;
this.protocol = protocol;
this.urlSetter =  new org.eclipse.osgi.framework.internal.protocol.URLStreamHandlerSetter (this);
this.setNewHandler (reference, this.getRank (reference));
this.urlStreamHandlerServiceTracker =  new org.osgi.util.tracker.ServiceTracker (context, "org.osgi.service.url.URLStreamHandlerService", this);
org.eclipse.osgi.framework.internal.protocol.StreamHandlerFactory.secureAction.open (this.urlStreamHandlerServiceTracker);
}, "~S,org.osgi.framework.ServiceReference,org.osgi.framework.BundleContext");
Clazz.defineMethod (c$, "setNewHandler", 
($fz = function (reference, rank) {
this.urlStreamServiceReference = reference;
this.ranking = rank;
this.realHandlerService = org.eclipse.osgi.framework.internal.protocol.StreamHandlerFactory.secureAction.getService (reference, this.context);
}, $fz.isPrivate = true, $fz), "org.osgi.framework.ServiceReference,~N");
Clazz.defineMethod (c$, "equals", 
function (url1, url2) {
return this.realHandlerService.equals (url1, url2);
}, "java.net.URL,java.net.URL");
Clazz.overrideMethod (c$, "getDefaultPort", 
function () {
return this.realHandlerService.getDefaultPort ();
});
Clazz.overrideMethod (c$, "getHostAddress", 
function (url) {
return this.realHandlerService.getHostAddress (url);
}, "java.net.URL");
Clazz.defineMethod (c$, "hashCode", 
function (url) {
return this.realHandlerService.hashCode (url);
}, "java.net.URL");
Clazz.overrideMethod (c$, "hostsEqual", 
function (url1, url2) {
return this.realHandlerService.hostsEqual (url1, url2);
}, "java.net.URL,java.net.URL");
Clazz.defineMethod (c$, "openConnection", 
function (url) {
return this.realHandlerService.openConnection (url);
}, "java.net.URL");
Clazz.overrideMethod (c$, "parseURL", 
function (url, str, start, end) {
this.realHandlerService.parseURL (this.urlSetter, url, str, start, end);
}, "java.net.URL,~S,~N,~N");
Clazz.overrideMethod (c$, "sameFile", 
function (url1, url2) {
return this.realHandlerService.sameFile (url1, url2);
}, "java.net.URL,java.net.URL");
Clazz.overrideMethod (c$, "toExternalForm", 
function (url) {
return this.realHandlerService.toExternalForm (url);
}, "java.net.URL");
Clazz.defineMethod (c$, "setURL", 
function (url, protocol, host, port, file, ref) {
Clazz.superCall (this, org.eclipse.osgi.framework.internal.protocol.URLStreamHandlerProxy, "setURL", [url, protocol, host, port, null, null, file, null, ref]);
}, "java.net.URL,~S,~S,~N,~S,~S");
Clazz.overrideMethod (c$, "addingService", 
function (reference) {
var prop = reference.getProperty ("url.handler.protocol");
if (!(Clazz.instanceOf (prop, Array))) return null;
var protocols = prop;
for (var i = 0; i < protocols.length; i++) {
if (protocols[i].equals (this.protocol)) {
var property = reference.getProperty ("service.ranking");
var newServiceRanking = (Clazz.instanceOf (property, Integer)) ? (property).intValue () : 0;
if (!this.handlerRegistered) {
this.setNewHandler (reference, newServiceRanking);
this.handlerRegistered = true;
}if (newServiceRanking > this.ranking) {
this.setNewHandler (reference, newServiceRanking);
}return (reference);
}}
return (null);
}, "org.osgi.framework.ServiceReference");
Clazz.overrideMethod (c$, "modifiedService", 
function (reference, service) {
var newRank = this.getRank (reference);
if (reference === this.urlStreamServiceReference) {
if (newRank < this.ranking) {
var newReference = this.urlStreamHandlerServiceTracker.getServiceReference ();
if (newReference !== this.urlStreamServiceReference && newReference != null) {
this.setNewHandler (newReference, (newReference.getProperty ("service.ranking")).intValue ());
}}} else if (newRank > this.ranking) {
this.setNewHandler (reference, newRank);
}}, "org.osgi.framework.ServiceReference,~O");
Clazz.overrideMethod (c$, "removedService", 
function (reference, service) {
if (reference === this.urlStreamServiceReference) {
var newReference = this.urlStreamHandlerServiceTracker.getServiceReference ();
if (newReference != null) {
this.setNewHandler (newReference, this.getRank (newReference));
} else {
this.handlerRegistered = false;
this.realHandlerService =  new org.eclipse.osgi.framework.internal.protocol.NullURLStreamHandlerService ();
this.ranking = -1;
}}}, "org.osgi.framework.ServiceReference,~O");
Clazz.defineMethod (c$, "getRank", 
($fz = function (reference) {
var property = reference.getProperty ("service.ranking");
return (Clazz.instanceOf (property, Integer)) ? (property).intValue () : 0;
}, $fz.isPrivate = true, $fz), "org.osgi.framework.ServiceReference");
});
