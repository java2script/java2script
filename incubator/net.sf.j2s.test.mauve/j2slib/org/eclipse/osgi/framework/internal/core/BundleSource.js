Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["java.net.URLConnection"], "org.eclipse.osgi.framework.internal.core.BundleSource", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.$in = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "BundleSource", java.net.URLConnection);
Clazz.makeConstructor (c$, 
function ($in) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.internal.core.BundleSource, [null]);
this.$in = $in;
}, "java.io.InputStream");
Clazz.overrideMethod (c$, "connect", 
function () {
this.connected = true;
});
Clazz.overrideMethod (c$, "getInputStream", 
function () {
return (this.$in);
});
});
