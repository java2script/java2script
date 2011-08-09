Clazz.declarePackage ("org.eclipse.core.internal.runtime");
Clazz.load (["org.eclipse.core.internal.boot.PlatformURLConnection"], "org.eclipse.core.internal.runtime.PlatformURLPluginConnection", ["java.io.IOException", "java.net.URL", "org.eclipse.core.internal.boot.PlatformURLHandler", "org.eclipse.core.internal.runtime.InternalPlatform", "$.Messages", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.target = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.runtime, "PlatformURLPluginConnection", org.eclipse.core.internal.boot.PlatformURLConnection);
Clazz.overrideMethod (c$, "allowCaching", 
function () {
return true;
});
Clazz.overrideMethod (c$, "resolve", 
function () {
var spec = this.url.getFile ().trim ();
if (spec.startsWith ("/")) spec = spec.substring (1);
if (!spec.startsWith ("plugin")) throw  new java.io.IOException (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.url_badVariant, this.url));
var ix = spec.indexOf ("/", "plugin".length + 1);
var ref = ix == -1 ? spec.substring ("plugin".length + 1) : spec.substring ("plugin".length + 1, ix);
var id = this.getId (ref);
this.target = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getBundle (id);
if (this.target == null) throw  new java.io.IOException (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.url_resolvePlugin, this.url));
if (ix == -1 || (ix + 1) >= spec.length) return this.target.getEntry ("/");
var result = this.target.getEntry (spec.substring (ix + 1));
if (result != null) return result;
return  new java.net.URL (this.target.getEntry ("/"), spec.substring (ix + 1));
});
c$.startup = Clazz.defineMethod (c$, "startup", 
function () {
if (org.eclipse.core.internal.runtime.PlatformURLPluginConnection.isRegistered) return ;
org.eclipse.core.internal.boot.PlatformURLHandler.register ("plugin", org.eclipse.core.internal.runtime.PlatformURLPluginConnection);
($t$ = org.eclipse.core.internal.runtime.PlatformURLPluginConnection.isRegistered = true, org.eclipse.core.internal.runtime.PlatformURLPluginConnection.prototype.isRegistered = org.eclipse.core.internal.runtime.PlatformURLPluginConnection.isRegistered, $t$);
});
Clazz.overrideMethod (c$, "getAuxillaryURLs", 
function () {
if (this.target == null) {
var spec = this.url.getFile ().trim ();
if (spec.startsWith ("/")) spec = spec.substring (1);
if (!spec.startsWith ("plugin")) throw  new java.io.IOException (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.url_badVariant, this.url));
var ix = spec.indexOf ("/", "plugin".length + 1);
var ref = ix == -1 ? spec.substring ("plugin".length + 1) : spec.substring ("plugin".length + 1, ix);
var id = this.getId (ref);
this.target = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getBundle (id);
if (this.target == null) throw  new java.io.IOException (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.url_resolvePlugin, this.url));
}var fragments = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getFragments (this.target);
var fragmentLength = (fragments == null) ? 0 : fragments.length;
if (fragmentLength == 0) return null;
var result =  new Array (fragmentLength);
for (var i = 0; i < fragmentLength; i++) result[i] = fragments[i].getEntry ("/");

return result;
});
Clazz.defineStatics (c$,
"isRegistered", false,
"PLUGIN", "plugin");
});
