Clazz.declarePackage ("org.osgi.service.url");
Clazz.load (["java.net.URLStreamHandler", "org.osgi.service.url.URLStreamHandlerService"], "org.osgi.service.url.AbstractURLStreamHandlerService", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.realHandler = null;
Clazz.instantialize (this, arguments);
}, org.osgi.service.url, "AbstractURLStreamHandlerService", java.net.URLStreamHandler, org.osgi.service.url.URLStreamHandlerService);
Clazz.defineMethod (c$, "parseURL", 
function (realHandler, u, spec, start, limit) {
this.realHandler = realHandler;
this.parseURL (u, spec, start, limit);
}, "org.osgi.service.url.URLStreamHandlerSetter,java.net.URL,~S,~N,~N");
Clazz.defineMethod (c$, "setURL", 
function (u, proto, host, port, file, ref) {
this.realHandler.setURL (u, proto, host, port, file, ref);
}, "java.net.URL,~S,~S,~N,~S,~S");
Clazz.defineMethod (c$, "setURL", 
function (u, proto, host, port, auth, user, path, query, ref) {
this.realHandler.setURL (u, proto, host, port, auth, user, path, query, ref);
}, "java.net.URL,~S,~S,~N,~S,~S,~S,~S,~S");
});
