Clazz.declarePackage ("org.eclipse.core.internal.runtime");
Clazz.load (["org.eclipse.core.internal.boot.PlatformURLConnection"], "org.eclipse.core.internal.runtime.PlatformURLConfigConnection", ["java.io.File", "$.FileOutputStream", "$.IOException", "java.net.URL", "$.UnknownServiceException", "org.eclipse.core.internal.boot.PlatformURLHandler", "org.eclipse.core.internal.runtime.Messages", "org.eclipse.core.runtime.Platform", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.parentConfiguration = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.runtime, "PlatformURLConfigConnection", org.eclipse.core.internal.boot.PlatformURLConnection);
Clazz.overrideMethod (c$, "resolve", 
function () {
var spec = this.url.getFile ().trim ();
if (spec.startsWith ("/")) spec = spec.substring (1);
if (!spec.startsWith ("config")) throw  new java.io.IOException (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.url_badVariant, this.url.toString ()));
var path = spec.substring ("config".length + 1);
var localConfig = org.eclipse.core.runtime.Platform.getConfigurationLocation ();
var parentConfig = localConfig.getParentLocation ();
var localURL =  new java.net.URL (localConfig.getURL (), path);
if (!"file".equals (localURL.getProtocol ()) || parentConfig == null) return localURL;
var localFile =  new java.io.File (localURL.getPath ());
if (localFile.exists ()) return localURL;
var parentURL =  new java.net.URL (parentConfig.getURL (), path);
if ("file".equals (parentURL.getProtocol ())) {
var parentFile =  new java.io.File (parentURL.getPath ());
if (parentFile.exists ()) {
this.parentConfiguration = true;
return parentURL;
}}return localURL;
});
c$.startup = Clazz.defineMethod (c$, "startup", 
function () {
if (org.eclipse.core.internal.runtime.PlatformURLConfigConnection.isRegistered) return ;
org.eclipse.core.internal.boot.PlatformURLHandler.register ("config", org.eclipse.core.internal.runtime.PlatformURLConfigConnection);
($t$ = org.eclipse.core.internal.runtime.PlatformURLConfigConnection.isRegistered = true, org.eclipse.core.internal.runtime.PlatformURLConfigConnection.prototype.isRegistered = org.eclipse.core.internal.runtime.PlatformURLConfigConnection.isRegistered, $t$);
});
Clazz.overrideMethod (c$, "getOutputStream", 
function () {
if (this.parentConfiguration || org.eclipse.core.runtime.Platform.getConfigurationLocation ().isReadOnly ()) throw  new java.net.UnknownServiceException (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.url_noOutput, this.url));
var resolved = this.getResolvedURL ();
if (resolved != null) {
var fileString = resolved.getFile ();
if (fileString != null) {
var file =  new java.io.File (fileString);
var parent = file.getParent ();
if (parent != null)  new java.io.File (parent).mkdirs ();
return  new java.io.FileOutputStream (file);
}}return null;
});
Clazz.defineStatics (c$,
"FILE_PROTOCOL", "file",
"isRegistered", false,
"CONFIG", "config");
});
