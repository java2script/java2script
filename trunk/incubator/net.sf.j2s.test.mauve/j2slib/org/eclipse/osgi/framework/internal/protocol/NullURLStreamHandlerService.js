Clazz.declarePackage ("org.eclipse.osgi.framework.internal.protocol");
Clazz.load (["org.osgi.service.url.URLStreamHandlerService"], "org.eclipse.osgi.framework.internal.protocol.NullURLStreamHandlerService", ["java.lang.IllegalStateException", "java.net.MalformedURLException"], function () {
c$ = Clazz.declareType (org.eclipse.osgi.framework.internal.protocol, "NullURLStreamHandlerService", null, org.osgi.service.url.URLStreamHandlerService);
Clazz.overrideMethod (c$, "openConnection", 
function (u) {
throw  new java.net.MalformedURLException ();
}, "java.net.URL");
Clazz.defineMethod (c$, "equals", 
function (url1, url2) {
throw  new IllegalStateException ();
}, "java.net.URL,java.net.URL");
Clazz.overrideMethod (c$, "getDefaultPort", 
function () {
throw  new IllegalStateException ();
});
Clazz.overrideMethod (c$, "getHostAddress", 
function (url) {
throw  new IllegalStateException ();
}, "java.net.URL");
Clazz.defineMethod (c$, "hashCode", 
function (url) {
throw  new IllegalStateException ();
}, "java.net.URL");
Clazz.overrideMethod (c$, "hostsEqual", 
function (url1, url2) {
throw  new IllegalStateException ();
}, "java.net.URL,java.net.URL");
Clazz.overrideMethod (c$, "sameFile", 
function (url1, url2) {
throw  new IllegalStateException ();
}, "java.net.URL,java.net.URL");
Clazz.defineMethod (c$, "setURL", 
function (u, protocol, host, port, authority, userInfo, file, query, ref) {
throw  new IllegalStateException ();
}, "java.net.URL,~S,~S,~N,~S,~S,~S,~S,~S");
Clazz.defineMethod (c$, "setURL", 
function (u, protocol, host, port, file, ref) {
throw  new IllegalStateException ();
}, "java.net.URL,~S,~S,~N,~S,~S");
Clazz.overrideMethod (c$, "toExternalForm", 
function (url) {
throw  new IllegalStateException ();
}, "java.net.URL");
Clazz.overrideMethod (c$, "parseURL", 
function (realHandler, u, spec, start, limit) {
throw  new IllegalStateException ();
}, "org.osgi.service.url.URLStreamHandlerSetter,java.net.URL,~S,~N,~N");
});
