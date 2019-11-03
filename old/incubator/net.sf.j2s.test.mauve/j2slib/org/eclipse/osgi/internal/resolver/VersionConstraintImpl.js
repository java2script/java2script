Clazz.declarePackage ("org.eclipse.osgi.internal.resolver");
Clazz.load (["org.eclipse.osgi.service.resolver.VersionConstraint"], "org.eclipse.osgi.internal.resolver.VersionConstraintImpl", ["org.eclipse.osgi.service.resolver.VersionRange"], function () {
c$ = Clazz.decorateAsClass (function () {
this.name = null;
this.versionRange = null;
this.bundle = null;
this.supplier = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.internal.resolver, "VersionConstraintImpl", null, org.eclipse.osgi.service.resolver.VersionConstraint);
Clazz.overrideMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.overrideMethod (c$, "getVersionRange", 
function () {
if (this.versionRange == null) return org.eclipse.osgi.service.resolver.VersionRange.emptyRange;
return this.versionRange;
});
Clazz.overrideMethod (c$, "getBundle", 
function () {
return this.bundle;
});
Clazz.overrideMethod (c$, "isResolved", 
function () {
return this.supplier != null;
});
Clazz.overrideMethod (c$, "getSupplier", 
function () {
return this.supplier;
});
Clazz.overrideMethod (c$, "isSatisfiedBy", 
function (supplier) {
return false;
}, "org.eclipse.osgi.service.resolver.BaseDescription");
Clazz.defineMethod (c$, "setName", 
function (name) {
this.name = name;
}, "~S");
Clazz.defineMethod (c$, "setVersionRange", 
function (versionRange) {
this.versionRange = versionRange;
}, "org.eclipse.osgi.service.resolver.VersionRange");
Clazz.defineMethod (c$, "setBundle", 
function (bundle) {
this.bundle = bundle;
}, "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.defineMethod (c$, "setSupplier", 
function (supplier) {
this.supplier = supplier;
}, "org.eclipse.osgi.service.resolver.BaseDescription");
});
