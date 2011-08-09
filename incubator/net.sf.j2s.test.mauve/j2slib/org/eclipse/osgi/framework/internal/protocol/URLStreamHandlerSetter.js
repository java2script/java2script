Clazz.declarePackage ("org.eclipse.osgi.framework.internal.protocol");
Clazz.load (["org.osgi.service.url.URLStreamHandlerSetter"], "org.eclipse.osgi.framework.internal.protocol.URLStreamHandlerSetter", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.handlerProxy = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.protocol, "URLStreamHandlerSetter", null, org.osgi.service.url.URLStreamHandlerSetter);
Clazz.makeConstructor (c$, 
function (handler) {
this.handlerProxy = handler;
}, "org.eclipse.osgi.framework.internal.protocol.URLStreamHandlerProxy");
Clazz.defineMethod (c$, "setURL", 
function (url, protocol, host, port, file, ref) {
this.handlerProxy.setURL (url, protocol, host, port, file, ref);
}, "java.net.URL,~S,~S,~N,~S,~S");
Clazz.defineMethod (c$, "setURL", 
function (url, protocol, host, port, authority, userInfo, path, query, ref) {
this.handlerProxy.setURL (url, protocol, host, port, authority, userInfo, path, query, ref);
}, "java.net.URL,~S,~S,~N,~S,~S,~S,~S,~S");
});
