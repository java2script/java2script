Clazz.declarePackage ("org.eclipse.core.internal.boot");
Clazz.load (["org.osgi.service.url.AbstractURLStreamHandlerService", "java.util.Hashtable"], "org.eclipse.core.internal.boot.PlatformURLHandler", ["java.io.IOException", "java.net.MalformedURLException", "$.URL", "org.eclipse.core.internal.runtime.Messages", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.declareType (org.eclipse.core.internal.boot, "PlatformURLHandler", org.osgi.service.url.AbstractURLStreamHandlerService);
Clazz.defineMethod (c$, "openConnection", 
function (url) {
var spec = url.getFile ().trim ();
if (spec.startsWith ("/")) spec = spec.substring (1);
var ix = spec.indexOf ("/");
if (ix == -1) throw  new java.net.MalformedURLException (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.url_invalidURL, url.toExternalForm ()));
var type = spec.substring (0, ix);
var construct = org.eclipse.core.internal.boot.PlatformURLHandler.connectionType.get (type);
if (construct == null) throw  new java.net.MalformedURLException (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.url_badVariant, type));
var connection = null;
try {
connection = construct.newInstance ([url]);
} catch (e) {
if (Clazz.instanceOf (e, Exception)) {
throw  new java.io.IOException (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.url_createConnection, e.getMessage ()));
} else {
throw e;
}
}
connection.setResolvedURL (connection.resolve ());
return connection;
}, "java.net.URL");
c$.register = Clazz.defineMethod (c$, "register", 
function (type, connectionClass) {
try {
var c = connectionClass.getConstructor ([java.net.URL]);
org.eclipse.core.internal.boot.PlatformURLHandler.connectionType.put (type, c);
} catch (e) {
if (Clazz.instanceOf (e, NoSuchMethodException)) {
} else {
throw e;
}
}
}, "~S,Class");
c$.unregister = Clazz.defineMethod (c$, "unregister", 
function (type) {
org.eclipse.core.internal.boot.PlatformURLHandler.connectionType.remove (type);
}, "~S");
c$.connectionType = c$.prototype.connectionType =  new java.util.Hashtable ();
Clazz.defineStatics (c$,
"PROTOCOL", "platform",
"FILE", "file",
"JAR", "jar",
"BUNDLE", "bundle",
"JAR_SEPARATOR", "!/",
"PROTOCOL_SEPARATOR", ":");
});
