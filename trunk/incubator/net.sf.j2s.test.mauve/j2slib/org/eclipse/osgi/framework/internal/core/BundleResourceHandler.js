Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["java.net.URLStreamHandler"], "org.eclipse.osgi.framework.internal.core.BundleResourceHandler", ["java.io.IOException", "java.lang.Long", "$.StringBuffer", "java.net.MalformedURLException", "org.eclipse.osgi.framework.adaptor.core.AdaptorMsg", "org.eclipse.osgi.framework.internal.core.BundleURLConnection", "org.eclipse.osgi.util.NLS", "org.osgi.framework.AdminPermission"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bundleEntry = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "BundleResourceHandler", java.net.URLStreamHandler);
Clazz.makeConstructor (c$, 
function () {
this.construct (null);
});
Clazz.makeConstructor (c$, 
function (bundleEntry) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.internal.core.BundleResourceHandler, []);
this.bundleEntry = bundleEntry;
}, "org.eclipse.osgi.framework.adaptor.core.BundleEntry");
Clazz.overrideMethod (c$, "parseURL", 
function (url, str, start, end) {
if (end < start) return ;
if (url.getPath () != null) this.bundleEntry = null;
var spec = "";
if (start < end) spec = str.substring (start, end);
end -= start;
var path = url.getPath ();
var bundleId = url.getHost ();
var resIndex = 0;
var pathIdx = 0;
if (spec.startsWith ("//")) {
var bundleIdIdx = 2;
pathIdx = spec.indexOf ('/', bundleIdIdx);
if (pathIdx == -1) {
pathIdx = end;
path = "";
}var bundleIdEnd = spec.indexOf (':', bundleIdIdx);
if (bundleIdEnd > pathIdx || bundleIdEnd == -1) bundleIdEnd = pathIdx;
if (bundleIdEnd < pathIdx - 1) try {
resIndex = Integer.parseInt (spec.substring (bundleIdEnd + 1, pathIdx));
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
} else {
throw e;
}
}
bundleId = spec.substring (bundleIdIdx, bundleIdEnd);
}if (pathIdx < end && (spec.charAt (pathIdx)).charCodeAt (0) == ('/').charCodeAt (0)) path = spec.substring (pathIdx, end);
 else if (end > pathIdx) {
if (path == null || path.equals ("")) path = "/";
var last = path.lastIndexOf ('/') + 1;
if (last == 0) path = spec.substring (pathIdx, end);
 else path = path.substring (0, last) + spec.substring (pathIdx, end);
}if (path == null) path = "";
var dotIndex;
while ((dotIndex = path.indexOf ("/./")) >= 0) path = path.substring (0, dotIndex + 1) + path.substring (dotIndex + 3);

if (path.endsWith ("/.")) path = path.substring (0, path.length - 1);
while ((dotIndex = path.indexOf ("/../")) >= 0) {
if (dotIndex != 0) path = path.substring (0, path.lastIndexOf ('/', dotIndex - 1)) + path.substring (dotIndex + 3);
 else path = path.substring (dotIndex + 3);
}
if (path.endsWith ("/..") && path.length > 3) path = path.substring (0, path.length - 2);
this.checkAdminPermission (org.eclipse.osgi.framework.internal.core.BundleResourceHandler.context.getBundle (Long.parseLong (bundleId)));
this.setURL (url, url.getProtocol (), bundleId, resIndex, "SECURITY_AUTHORIZED", null, path, null, null);
}, "java.net.URL,~S,~N,~N");
Clazz.defineMethod (c$, "openConnection", 
function (url) {
if (this.bundleEntry != null) return ( new org.eclipse.osgi.framework.internal.core.BundleURLConnection (url, this.bundleEntry));
var bidString = url.getHost ();
if (bidString == null) {
throw  new java.io.IOException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.URL_NO_BUNDLE_ID, url.toExternalForm ()));
}var bundle = null;
var bundleID;
try {
bundleID = Long.parseLong (bidString);
} catch (nfe) {
if (Clazz.instanceOf (nfe, NumberFormatException)) {
throw  new java.net.MalformedURLException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.URL_INVALID_BUNDLE_ID, bidString));
} else {
throw nfe;
}
}
bundle = org.eclipse.osgi.framework.internal.core.BundleResourceHandler.context.getBundle (bundleID);
if (!url.getAuthority ().equals ("SECURITY_AUTHORIZED")) {
this.checkAdminPermission (bundle);
}if (bundle == null) {
throw  new java.io.IOException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.URL_NO_BUNDLE_FOUND, url.toExternalForm ()));
}return ( new org.eclipse.osgi.framework.internal.core.BundleURLConnection (url, this.findBundleEntry (url, bundle)));
}, "java.net.URL");
Clazz.overrideMethod (c$, "toExternalForm", 
function (url) {
var result =  new StringBuffer (url.getProtocol ());
result.append ("://");
var bundleId = url.getHost ();
if ((bundleId != null) && (bundleId.length > 0)) result.append (bundleId);
var index = url.getPort ();
if (index > 0) result.append (':').append (index);
var path = url.getPath ();
if (path != null) {
if ((path.length > 0) && ((path.charAt (0)).charCodeAt (0) != ('/').charCodeAt (0))) {
result.append ("/");
}result.append (path);
}return (result.toString ());
}, "java.net.URL");
c$.setContext = Clazz.defineMethod (c$, "setContext", 
function (context) {
($t$ = org.eclipse.osgi.framework.internal.core.BundleResourceHandler.context = context, org.eclipse.osgi.framework.internal.core.BundleResourceHandler.prototype.context = org.eclipse.osgi.framework.internal.core.BundleResourceHandler.context, $t$);
}, "org.osgi.framework.BundleContext");
Clazz.defineMethod (c$, "hashCode", 
function (url) {
var hash = 0;
var protocol = url.getProtocol ();
if (protocol != null) hash += protocol.hashCode ();
var host = url.getHost ();
if (host != null) hash += host.hashCode ();
var path = url.getPath ();
if (path != null) hash += path.hashCode ();
return hash;
}, "java.net.URL");
Clazz.defineMethod (c$, "equals", 
function (url1, url2) {
return this.sameFile (url1, url2);
}, "java.net.URL,java.net.URL");
Clazz.overrideMethod (c$, "getHostAddress", 
function (url) {
return null;
}, "java.net.URL");
Clazz.overrideMethod (c$, "hostsEqual", 
function (url1, url2) {
var host1 = url1.getHost ();
var host2 = url2.getHost ();
if (host1 != null && host2 != null) return host1.equalsIgnoreCase (host2);
return (host1 == null && host2 == null);
}, "java.net.URL,java.net.URL");
Clazz.overrideMethod (c$, "sameFile", 
function (url1, url2) {
var p1 = url1.getProtocol ();
var p2 = url2.getProtocol ();
if (!((p1 === p2) || (p1 != null && p1.equalsIgnoreCase (p2)))) return false;
if (!this.hostsEqual (url1, url2)) return false;
if (url1.getPort () != url2.getPort ()) return false;
var a1 = url1.getAuthority ();
var a2 = url2.getAuthority ();
if (!((a1 === a2) || (a1 != null && a1.equals (a2)))) return false;
var path1 = url1.getPath ();
var path2 = url2.getPath ();
if (!((path1 === path2) || (path1 != null && path1.equals (path2)))) return false;
return true;
}, "java.net.URL,java.net.URL");
Clazz.defineMethod (c$, "checkAdminPermission", 
function (bundle) {
var sm = System.getSecurityManager ();
if (sm != null) {
sm.checkPermission ( new org.osgi.framework.AdminPermission (bundle, "resource"));
}}, "org.osgi.framework.Bundle");
c$.getBundleClassLoader = Clazz.defineMethod (c$, "getBundleClassLoader", 
function (bundle) {
var loader = bundle.getBundleLoader ();
if (loader == null) return null;
return loader.createClassLoader ();
}, "org.eclipse.osgi.framework.internal.core.AbstractBundle");
Clazz.defineStatics (c$,
"SECURITY_AUTHORIZED", "SECURITY_AUTHORIZED",
"context", null);
});
