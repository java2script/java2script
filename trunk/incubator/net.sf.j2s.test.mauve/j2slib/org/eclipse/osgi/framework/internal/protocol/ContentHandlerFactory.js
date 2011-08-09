Clazz.declarePackage ("org.eclipse.osgi.framework.internal.protocol");
Clazz.load (["java.net.ContentHandlerFactory"], "org.eclipse.osgi.framework.internal.protocol.ContentHandlerFactory", ["java.lang.StringBuffer", "java.util.Hashtable", "$.StringTokenizer", "org.eclipse.osgi.framework.internal.protocol.ContentHandlerProxy", "$.StreamHandlerFactory", "org.osgi.util.tracker.ServiceTracker"], function () {
c$ = Clazz.decorateAsClass (function () {
this.contentHandlerTracker = null;
this.context = null;
this.proxies = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.protocol, "ContentHandlerFactory", null, java.net.ContentHandlerFactory);
Clazz.makeConstructor (c$, 
function (context) {
this.context = context;
this.proxies =  new java.util.Hashtable (5);
this.contentHandlerTracker =  new org.osgi.util.tracker.ServiceTracker (context, "java.net.ContentHandler", null);
this.contentHandlerTracker.open ();
}, "org.osgi.framework.BundleContext");
Clazz.overrideMethod (c$, "createContentHandler", 
function (contentType) {
var builtInHandlers = org.eclipse.osgi.framework.internal.protocol.StreamHandlerFactory.secureAction.getProperty ("java.content.handler.pkgs");
builtInHandlers = builtInHandlers == null ? "sun.net.www.content" : "sun.net.www.content" + '|' + builtInHandlers;
var clazz = null;
if (builtInHandlers != null) {
var convertedContentType = contentType.$replace ('.', '_');
convertedContentType = convertedContentType.$replace ('/', '.');
convertedContentType = convertedContentType.$replace ('-', '_');
var tok =  new java.util.StringTokenizer (builtInHandlers, "|");
while (tok.hasMoreElements ()) {
var name =  new StringBuffer ();
name.append (tok.nextToken ());
name.append (".");
name.append (convertedContentType);
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
}var proxy = this.proxies.get (contentType);
if (proxy != null) {
return (proxy);
}var serviceReferences = this.contentHandlerTracker.getServiceReferences ();
if (serviceReferences != null) {
for (var i = 0; i < serviceReferences.length; i++) {
var obj = serviceReferences[i].getProperty ("url.content.mimetype");
if (obj != null && Clazz.instanceOf (obj, Array)) {
var contentHandler = obj;
for (var j = 0; j < contentHandler.length; j++) {
if (contentHandler[j].equals (contentType)) {
proxy =  new org.eclipse.osgi.framework.internal.protocol.ContentHandlerProxy (contentType, serviceReferences[i], this.context);
this.proxies.put (contentType, proxy);
return (proxy);
}}
}}
}proxy =  new org.eclipse.osgi.framework.internal.protocol.ContentHandlerProxy (contentType, null, this.context);
this.proxies.put (contentType, proxy);
return (proxy);
}, "~S");
Clazz.defineStatics (c$,
"contentHandlerClazz", "java.net.ContentHandler",
"CONTENT_HANDLER_PKGS", "java.content.handler.pkgs",
"DEFAULT_VM_CONTENT_HANDLERS", "sun.net.www.content");
});
