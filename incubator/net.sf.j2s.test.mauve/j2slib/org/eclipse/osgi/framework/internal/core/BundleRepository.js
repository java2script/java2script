Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (null, "org.eclipse.osgi.framework.internal.core.BundleRepository", ["java.lang.Long", "java.util.ArrayList", "$.HashMap", "org.eclipse.osgi.framework.internal.core.Constants", "$.KeyedHashSet"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bundlesByInstallOrder = null;
this.bundlesById = null;
this.bundlesBySymbolicName = null;
this.packageAdmin = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "BundleRepository");
Clazz.makeConstructor (c$, 
function (initialCapacity, packageAdmin) {
this.bundlesByInstallOrder =  new java.util.ArrayList (initialCapacity);
this.bundlesById =  new org.eclipse.osgi.framework.internal.core.KeyedHashSet (initialCapacity, true);
this.bundlesBySymbolicName =  new java.util.HashMap (initialCapacity);
this.packageAdmin = packageAdmin;
}, "~N,org.eclipse.osgi.framework.internal.core.PackageAdminImpl");
Clazz.defineMethod (c$, "getBundles", 
function () {
return this.bundlesByInstallOrder;
});
Clazz.defineMethod (c$, "getBundle", 
function (bundleId) {
var key =  new Long (bundleId);
return this.bundlesById.getByKey (key);
}, "~N");
Clazz.defineMethod (c$, "getBundles", 
function (symbolicName) {
if (org.eclipse.osgi.framework.internal.core.Constants.getInternalSymbolicName ().equals (symbolicName)) symbolicName = "system.bundle";
return this.bundlesBySymbolicName.get (symbolicName);
}, "~S");
Clazz.defineMethod (c$, "getBundle", 
function (symbolicName, version) {
var bundles = this.getBundles (symbolicName);
if (bundles != null) {
if (bundles.length > 0) {
for (var i = 0; i < bundles.length; i++) {
if (bundles[i].getVersion ().equals (version)) {
return bundles[i];
}}
}}return null;
}, "~S,org.osgi.framework.Version");
Clazz.defineMethod (c$, "add", 
function (bundle) {
this.bundlesByInstallOrder.add (bundle);
this.bundlesById.add (bundle);
var symbolicName = bundle.getSymbolicName ();
if (symbolicName != null) {
var bundles = this.bundlesBySymbolicName.get (symbolicName);
if (bundles == null) {
bundles =  new Array (1);
bundles[0] = bundle;
this.bundlesBySymbolicName.put (symbolicName, bundles);
return ;
}var list =  new java.util.ArrayList (bundles.length + 1);
var newVersion = bundle.getVersion ();
var added = false;
for (var i = 0; i < bundles.length; i++) {
var oldBundle = bundles[i];
var oldVersion = oldBundle.getVersion ();
if (!added && newVersion.compareTo (oldVersion) >= 0) {
added = true;
list.add (bundle);
}list.add (oldBundle);
}
if (!added) {
list.add (bundle);
}bundles =  new Array (list.size ());
list.toArray (bundles);
this.bundlesBySymbolicName.put (symbolicName, bundles);
}}, "org.eclipse.osgi.framework.internal.core.AbstractBundle");
Clazz.defineMethod (c$, "remove", 
function (bundle) {
var found = this.bundlesById.remove (bundle);
if (!found) return false;
this.bundlesByInstallOrder.remove (bundle);
var symbolicName = bundle.getSymbolicName ();
if (symbolicName == null) return true;
var bundles = this.bundlesBySymbolicName.get (symbolicName);
if (bundles == null) return true;
var numRemoved = 0;
for (var i = 0; i < bundles.length; i++) {
if (bundle === bundles[i]) {
numRemoved++;
bundles[i] = null;
}}
if (numRemoved > 0) {
if (bundles.length - numRemoved <= 0) {
this.bundlesBySymbolicName.remove (symbolicName);
} else {
var newBundles =  new Array (bundles.length - numRemoved);
var indexCnt = 0;
for (var i = 0; i < bundles.length; i++) {
if (bundles[i] != null) {
newBundles[indexCnt] = bundles[i];
indexCnt++;
}}
this.bundlesBySymbolicName.put (symbolicName, newBundles);
}}return true;
}, "org.eclipse.osgi.framework.internal.core.AbstractBundle");
Clazz.defineMethod (c$, "removeAllBundles", 
function () {
this.bundlesByInstallOrder.clear ();
this.bundlesById =  new org.eclipse.osgi.framework.internal.core.KeyedHashSet ();
this.bundlesBySymbolicName.clear ();
});
});
