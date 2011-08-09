Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.eclipse.osgi.framework.internal.core.PackageSource"], "org.eclipse.osgi.framework.internal.core.NullPackageSource", ["org.eclipse.osgi.framework.internal.core.KeyedHashSet"], function () {
c$ = Clazz.declareType (org.eclipse.osgi.framework.internal.core, "NullPackageSource", org.eclipse.osgi.framework.internal.core.PackageSource);
Clazz.overrideMethod (c$, "getSuppliers", 
function () {
return null;
});
Clazz.overrideMethod (c$, "isNullSource", 
function () {
return true;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.id + " -> null";
});
Clazz.overrideMethod (c$, "loadClass", 
function (name) {
return null;
}, "~S");
Clazz.overrideMethod (c$, "getResource", 
function (name) {
return null;
}, "~S");
Clazz.overrideMethod (c$, "getResources", 
function (name) {
return null;
}, "~S");
c$.getNullPackageSource = Clazz.defineMethod (c$, "getNullPackageSource", 
function (name) {
if (org.eclipse.osgi.framework.internal.core.NullPackageSource.sources == null) ($t$ = org.eclipse.osgi.framework.internal.core.NullPackageSource.sources =  new org.eclipse.osgi.framework.internal.core.KeyedHashSet (), org.eclipse.osgi.framework.internal.core.NullPackageSource.prototype.sources = org.eclipse.osgi.framework.internal.core.NullPackageSource.sources, $t$);
var result = org.eclipse.osgi.framework.internal.core.NullPackageSource.sources.getByKey (name);
if (result != null) return result;
result =  new org.eclipse.osgi.framework.internal.core.NullPackageSource (name);
org.eclipse.osgi.framework.internal.core.NullPackageSource.sources.add (result);
return result;
}, "~S");
Clazz.defineStatics (c$,
"sources", null);
});
