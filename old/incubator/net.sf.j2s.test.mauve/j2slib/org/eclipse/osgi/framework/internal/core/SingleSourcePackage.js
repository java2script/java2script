Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.eclipse.osgi.framework.internal.core.PackageSource"], "org.eclipse.osgi.framework.internal.core.SingleSourcePackage", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.supplier = null;
this.expid = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "SingleSourcePackage", org.eclipse.osgi.framework.internal.core.PackageSource);
Clazz.makeConstructor (c$, 
function (id, expid, supplier) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.internal.core.SingleSourcePackage, [id]);
this.expid = expid;
this.supplier = supplier;
}, "~S,~N,org.eclipse.osgi.framework.internal.core.BundleLoaderProxy");
Clazz.overrideMethod (c$, "getSuppliers", 
function () {
return [this];
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.id + " -> " + this.supplier;
});
Clazz.overrideMethod (c$, "loadClass", 
function (name) {
return this.supplier.getBundleLoader ().findLocalClass (name);
}, "~S");
Clazz.overrideMethod (c$, "getResource", 
function (name) {
return this.supplier.getBundleLoader ().findLocalResource (name);
}, "~S");
Clazz.overrideMethod (c$, "getResources", 
function (name) {
return this.supplier.getBundleLoader ().findLocalResources (name);
}, "~S");
Clazz.overrideMethod (c$, "equals", 
function (source) {
if (this === source) return true;
if (!(Clazz.instanceOf (source, org.eclipse.osgi.framework.internal.core.SingleSourcePackage))) return false;
var singleSource = source;
return this.supplier === singleSource.supplier && this.expid == singleSource.expid;
}, "~O");
});
