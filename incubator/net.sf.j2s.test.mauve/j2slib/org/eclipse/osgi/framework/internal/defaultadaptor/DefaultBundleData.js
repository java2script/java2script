Clazz.declarePackage ("org.eclipse.osgi.framework.internal.defaultadaptor");
Clazz.load (["org.eclipse.osgi.framework.adaptor.core.AbstractBundleData"], "org.eclipse.osgi.framework.internal.defaultadaptor.DefaultBundleData", ["java.io.File", "$.IOException", "org.eclipse.osgi.framework.debug.Debug"], function () {
c$ = Clazz.declareType (org.eclipse.osgi.framework.internal.defaultadaptor, "DefaultBundleData", org.eclipse.osgi.framework.adaptor.core.AbstractBundleData);
Clazz.defineMethod (c$, "initializeExistingBundle", 
function () {
var $delete =  new java.io.File (this.getBundleStoreDir (), ".delete");
if ($delete.exists ()) throw  new java.io.IOException ();
this.createBaseBundleFile ();
this.loadFromManifest ();
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getLocation ();
});
Clazz.overrideMethod (c$, "save", 
function () {
if (this.adaptor.canWrite ()) (this.adaptor).saveMetaDataFor (this);
});
Clazz.defineMethod (c$, "createBundleStoreDir", 
function () {
if (!this.getBundleStoreDir ().exists () && !this.getBundleStoreDir ().mkdirs ()) {
if (true && org.eclipse.osgi.framework.debug.Debug.DEBUG_GENERAL) {
org.eclipse.osgi.framework.debug.Debug.println ("Unable to create bundle store directory: " + this.getBundleStoreDir ().getPath ());
}}return this.getBundleStoreDir ();
});
});
