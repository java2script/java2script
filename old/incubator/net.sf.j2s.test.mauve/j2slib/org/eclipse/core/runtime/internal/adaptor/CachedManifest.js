Clazz.declarePackage ("org.eclipse.core.runtime.internal.adaptor");
Clazz.load (["java.util.Dictionary"], "org.eclipse.core.runtime.internal.adaptor.CachedManifest", ["org.eclipse.core.runtime.adaptor.EclipseAdaptor", "$.EclipseAdaptorMsg", "org.eclipse.osgi.framework.log.FrameworkLogEntry", "org.eclipse.osgi.util.NLS"], function () {
c$ = Clazz.decorateAsClass (function () {
this.manifest = null;
this.bundledata = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.internal.adaptor, "CachedManifest", java.util.Dictionary);
Clazz.makeConstructor (c$, 
function (bundledata) {
Clazz.superConstructor (this, org.eclipse.core.runtime.internal.adaptor.CachedManifest, []);
this.bundledata = bundledata;
}, "org.eclipse.core.runtime.adaptor.EclipseBundleData");
Clazz.defineMethod (c$, "getManifest", 
function () {
if (this.manifest == null) try {
this.manifest = this.bundledata.loadManifest ();
} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.BundleException)) {
var message = org.eclipse.osgi.util.NLS.bind (org.eclipse.core.runtime.adaptor.EclipseAdaptorMsg.ECLIPSE_CACHEDMANIFEST_UNEXPECTED_EXCEPTION, this.bundledata.getLocation ());
var entry =  new org.eclipse.osgi.framework.log.FrameworkLogEntry ("org.eclipse.osgi", message, 0, e, null);
org.eclipse.core.runtime.adaptor.EclipseAdaptor.getDefault ().getFrameworkLog ().log (entry);
return null;
} else {
throw e;
}
}
return this.manifest;
});
Clazz.defineMethod (c$, "size", 
function () {
return this.getManifest ().size ();
});
Clazz.overrideMethod (c$, "isEmpty", 
function () {
return this.size () == 0;
});
Clazz.defineMethod (c$, "elements", 
function () {
return this.getManifest ().elements ();
});
Clazz.defineMethod (c$, "keys", 
function () {
return this.getManifest ().keys ();
});
Clazz.defineMethod (c$, "get", 
function (key) {
var keyString = key;
if ("Bundle-Version".equalsIgnoreCase (keyString)) {
var result = this.bundledata.getVersion ();
return result == null ? null : result.toString ();
}if ("Plugin-Class".equalsIgnoreCase (keyString)) return this.bundledata.getPluginClass ();
if ("Bundle-SymbolicName".equalsIgnoreCase (keyString)) {
if ((this.bundledata.getType () & 8) == 0) return this.bundledata.getSymbolicName ();
return this.bundledata.getSymbolicName () + ';' + "singleton" + ":=true";
}if ("Eclipse-BuddyPolicy".equalsIgnoreCase (keyString)) return this.bundledata.getBuddyList ();
if ("Eclipse-RegisterBuddy".equalsIgnoreCase (keyString)) return this.bundledata.getRegisteredBuddyList ();
var result = this.getManifest ();
return result == null ? null : result.get (key);
}, "~O");
Clazz.defineMethod (c$, "remove", 
function (key) {
return this.getManifest ().remove (key);
}, "~O");
Clazz.defineMethod (c$, "put", 
function (key, value) {
return this.getManifest ().put (key, value);
}, "~O,~O");
});
