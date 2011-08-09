Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["java.net.URLConnection"], "org.eclipse.osgi.framework.internal.core.BundleURLConnection", ["java.io.IOException", "org.eclipse.osgi.framework.adaptor.core.AdaptorMsg", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bundleEntry = null;
this.$in = null;
this.contentType = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "BundleURLConnection", java.net.URLConnection);
Clazz.makeConstructor (c$, 
function (url, bundleEntry) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.internal.core.BundleURLConnection, [url]);
this.bundleEntry = bundleEntry;
this.$in = null;
this.contentType = null;
}, "java.net.URL,org.eclipse.osgi.framework.adaptor.core.BundleEntry");
Clazz.overrideMethod (c$, "connect", 
function () {
if (!this.connected) {
if (this.bundleEntry != null) {
this.$in = this.bundleEntry.getInputStream ();
this.connected = true;
} else {
throw  new java.io.IOException (org.eclipse.osgi.util.NLS.bind (org.eclipse.osgi.framework.adaptor.core.AdaptorMsg.RESOURCE_NOT_FOUND_EXCEPTION, this.url));
}}});
Clazz.overrideMethod (c$, "getContentLength", 
function () {
return (this.bundleEntry.getSize ());
});
Clazz.overrideMethod (c$, "getContentType", 
function () {
if (this.contentType == null) {
this.contentType = java.net.URLConnection.guessContentTypeFromName (this.bundleEntry.getName ());
if (this.contentType == null) {
if (!this.connected) {
try {
this.connect ();
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
return (null);
} else {
throw e;
}
}
}try {
if (this.$in.markSupported ()) this.contentType = java.net.URLConnection.guessContentTypeFromStream (this.$in);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
} else {
throw e;
}
}
}}return (this.contentType);
});
Clazz.overrideMethod (c$, "getDoInput", 
function () {
return (true);
});
Clazz.overrideMethod (c$, "getDoOutput", 
function () {
return (false);
});
Clazz.overrideMethod (c$, "getInputStream", 
function () {
if (!this.connected) {
this.connect ();
}return (this.$in);
});
Clazz.overrideMethod (c$, "getLastModified", 
function () {
var lastModified = this.bundleEntry.getTime ();
if (lastModified == -1) {
return (0);
}return (lastModified);
});
Clazz.defineMethod (c$, "getLocalURL", 
function () {
return this.bundleEntry.getLocalURL ();
});
Clazz.defineMethod (c$, "getFileURL", 
function () {
return this.bundleEntry.getFileURL ();
});
});
