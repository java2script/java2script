Clazz.declarePackage ("org.eclipse.osgi.framework.internal.protocol");
Clazz.load (["java.net.URLStreamHandlerFactory", "org.eclipse.osgi.framework.util.SecureAction"], "org.eclipse.osgi.framework.internal.protocol.StreamHandlerFactory", ["java.lang.StringBuffer", "java.util.Hashtable", "$.StringTokenizer", "org.eclipse.osgi.framework.internal.protocol.URLStreamHandlerProxy", "org.osgi.util.tracker.ServiceTracker"], function () {
c$ = Clazz.decorateAsClass (function () {
this.context = null;
this.adaptor = null;
this.handlerTracker = null;
this.proxies = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.protocol, "StreamHandlerFactory", null, java.net.URLStreamHandlerFactory);
Clazz.makeConstructor (c$, 
function (context, adaptor) {
this.context = context;
this.adaptor = adaptor;
this.proxies =  new java.util.Hashtable (15);
this.handlerTracker =  new org.osgi.util.tracker.ServiceTracker (context, "org.osgi.service.url.URLStreamHandlerService", null);
this.handlerTracker.open ();
}, "org.osgi.framework.BundleContext,org.eclipse.osgi.framework.adaptor.FrameworkAdaptor");
Clazz.overrideMethod (c$, "createURLStreamHandler", 
function (protocol) {
var builtInHandlers = org.eclipse.osgi.framework.internal.protocol.StreamHandlerFactory.secureAction.getProperty ("java.protocol.handler.pkgs");
var clazz = null;
if (builtInHandlers != null) {
var tok =  new java.util.StringTokenizer (builtInHandlers, "|");
while (tok.hasMoreElements ()) {
var name =  new StringBuffer ();
name.append (tok.nextToken ());
name.append (".");
name.append (protocol);
name.append (".Handler");
try {
clazz = org.eclipse.osgi.framework.internal.protocol.StreamHandlerFactory.secureAction.forName (name.toString ());
if (clazz != null) {
return (null);
}} catch (ex) {
if (Clazz.instanceOf (ex, ClassNotFoundException)) {
} else {
throw ex;
}
}
}
}var name = "org.eclipse.osgi.framework.internal.protocol." + protocol + ".Handler";
try {
clazz = org.eclipse.osgi.framework.internal.protocol.StreamHandlerFactory.secureAction.forName (name);
} catch (t) {
if (Clazz.instanceOf (t, Throwable)) {
var handler = this.proxies.get (protocol);
if (handler != null) {
return (handler);
}var serviceReferences = this.handlerTracker.getServiceReferences ();
if (serviceReferences != null) {
for (var i = 0; i < serviceReferences.length; i++) {
var prop = serviceReferences[i].getProperty ("url.handler.protocol");
if (prop != null && Clazz.instanceOf (prop, Array)) {
var protocols = prop;
for (var j = 0; j < protocols.length; j++) {
if (protocols[j].equals (protocol)) {
handler =  new org.eclipse.osgi.framework.internal.protocol.URLStreamHandlerProxy (protocol, serviceReferences[i], this.context);
this.proxies.put (protocol, handler);
return (handler);
}}
}}
}return (null);
} else {
throw t;
}
}
if (clazz == null) {
return null;
}try {
var handler = clazz.newInstance ();
if (Clazz.instanceOf (handler, org.eclipse.osgi.framework.internal.protocol.ProtocolActivator)) {
(handler).start (this.context, this.adaptor);
}return handler;
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
return null;
} else {
throw e;
}
}
}, "~S");
c$.secureAction = c$.prototype.secureAction =  new org.eclipse.osgi.framework.util.SecureAction ();
Clazz.defineStatics (c$,
"URLSTREAMHANDLERCLASS", "org.osgi.service.url.URLStreamHandlerService",
"PROTOCOL_HANDLER_PKGS", "java.protocol.handler.pkgs",
"INTERNAL_PROTOCOL_HANDLER_PKG", "org.eclipse.osgi.framework.internal.protocol.");
});
