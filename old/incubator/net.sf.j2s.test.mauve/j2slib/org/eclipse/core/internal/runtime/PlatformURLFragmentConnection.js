Clazz.declarePackage ("org.eclipse.core.internal.runtime");
Clazz.load (["org.eclipse.core.internal.boot.PlatformURLConnection"], "org.eclipse.core.internal.runtime.PlatformURLFragmentConnection", ["java.io.IOException", "java.net.URL", "org.eclipse.core.internal.boot.PlatformURLHandler", "org.eclipse.core.internal.runtime.InternalPlatform", "$.Messages", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.target = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.runtime, "PlatformURLFragmentConnection", org.eclipse.core.internal.boot.PlatformURLConnection);
Clazz.overrideMethod (c$, "allowCaching", 
function () {
return true;
});
Clazz.overrideMethod (c$, "resolve", 
function () {
var spec = this.url.getFile ().trim ();
if (spec.startsWith ("/")) spec = spec.substring (1);
if (!spec.startsWith ("fragment")) throw  new java.io.IOException (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.url_badVariant, this.url));
var ix = spec.indexOf ("/", "fragment".length + 1);
var ref = ix == -1 ? spec.substring ("fragment".length + 1) : spec.substring ("fragment".length + 1, ix);
var id = this.getId (ref);
this.target = org.eclipse.core.internal.runtime.InternalPlatform.getDefault ().getBundle (id);
if (this.target == null) throw  new java.io.IOException (org.eclipse.osgi.util.NLS.bind (org.eclipse.core.internal.runtime.Messages.url_resolveFragment, this.url));
var result = this.target.getEntry ("/");
if (ix == -1 || (ix + 1) >= spec.length) return result;
 else return  new java.net.URL (result, spec.substring (ix + 1));
});
c$.startup = Clazz.defineMethod (c$, "startup", 
function () {
if (org.eclipse.core.internal.runtime.PlatformURLFragmentConnection.isRegistered) return ;
org.eclipse.core.internal.boot.PlatformURLHandler.register ("fragment", org.eclipse.core.internal.runtime.PlatformURLFragmentConnection);
($t$ = org.eclipse.core.internal.runtime.PlatformURLFragmentConnection.isRegistered = true, org.eclipse.core.internal.runtime.PlatformURLFragmentConnection.prototype.isRegistered = org.eclipse.core.internal.runtime.PlatformURLFragmentConnection.isRegistered, $t$);
});
Clazz.defineStatics (c$,
"isRegistered", false,
"FRAGMENT", "fragment");
});
