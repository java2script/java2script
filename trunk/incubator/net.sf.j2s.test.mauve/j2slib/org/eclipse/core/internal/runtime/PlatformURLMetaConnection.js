Clazz.declarePackage ("org.eclipse.core.internal.runtime");
Clazz.load (["org.eclipse.core.internal.boot.PlatformURLConnection"], "org.eclipse.core.internal.runtime.PlatformURLMetaConnection", ["java.io.File", "$.FileOutputStream", "$.IOException", "org.eclipse.core.internal.boot.PlatformURLHandler", "org.eclipse.core.internal.runtime.InternalPlatform", "$.Messages", "org.eclipse.core.runtime.Platform", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.target = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.runtime, "PlatformURLMetaConnection", org.eclipse.core.internal.boot.PlatformURLConnection);
Clazz.overrideMethod (c$, "resolve", 
function () {
var spec = this.url.getFile ().trim ();
if (spec.startsWith ("/")) spec = spec.substring (1);
if (!spec.startsWith ("meta")) throw  new java.io.IOException (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.url_badVariant, this.url.toString ()));
var ix = spec.indexOf ("/", "meta".length + 1);
var ref = ix == -1 ? spec.substring ("meta".length + 1) : spec.substring ("meta".length + 1, ix);
var id = this.getId (ref);
this.target = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getBundle (id);
if (this.target == null) throw  new java.io.IOException (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.url_resolvePlugin, this.url.toString ()));
var path = org.eclipse.core.runtime.Platform.getStateLocation (this.target);
if (ix != -1 || (ix + 1) <= spec.length) path = path.append (spec.substring (ix + 1));
return path.toFile ().toURL ();
});
c$.startup = Clazz.defineMethod (c$, "startup", 
function () {
if (org.eclipse.core.internal.runtime.PlatformURLMetaConnection.isRegistered) return ;
org.eclipse.core.internal.boot.PlatformURLHandler.register ("meta", org.eclipse.core.internal.runtime.PlatformURLMetaConnection);
($t$ = org.eclipse.core.internal.runtime.PlatformURLMetaConnection.isRegistered = true, org.eclipse.core.internal.runtime.PlatformURLMetaConnection.prototype.isRegistered = org.eclipse.core.internal.runtime.PlatformURLMetaConnection.isRegistered, $t$);
});
Clazz.overrideMethod (c$, "getOutputStream", 
function () {
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
"isRegistered", false,
"META", "meta");
});
