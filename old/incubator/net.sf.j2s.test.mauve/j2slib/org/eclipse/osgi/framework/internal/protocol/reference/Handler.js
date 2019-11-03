Clazz.declarePackage ("org.eclipse.osgi.framework.internal.protocol.reference");
Clazz.load (["java.net.URLStreamHandler"], "org.eclipse.osgi.framework.internal.protocol.reference.Handler", ["org.eclipse.osgi.framework.internal.protocol.reference.ReferenceURLConnection"], function () {
c$ = Clazz.declareType (org.eclipse.osgi.framework.internal.protocol.reference, "Handler", java.net.URLStreamHandler);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.osgi.framework.internal.protocol.reference.Handler, []);
});
Clazz.defineMethod (c$, "openConnection", 
function (url) {
return  new org.eclipse.osgi.framework.internal.protocol.reference.ReferenceURLConnection (url);
}, "java.net.URL");
Clazz.overrideMethod (c$, "parseURL", 
function (url, str, start, end) {
if (end < start) {
return ;
}var reference = (start < end) ? str.substring (start, end) : url.getPath ();
this.setURL (url, url.getProtocol (), null, -1, null, null, reference, null, null);
}, "java.net.URL,~S,~N,~N");
});
