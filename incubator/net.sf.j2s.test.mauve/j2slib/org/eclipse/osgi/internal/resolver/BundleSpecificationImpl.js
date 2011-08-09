Clazz.declarePackage ("org.eclipse.osgi.internal.resolver");
Clazz.load (["org.eclipse.osgi.internal.resolver.VersionConstraintImpl", "org.eclipse.osgi.service.resolver.BundleSpecification"], "org.eclipse.osgi.internal.resolver.BundleSpecificationImpl", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.exported = false;
this.optional = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.internal.resolver, "BundleSpecificationImpl", org.eclipse.osgi.internal.resolver.VersionConstraintImpl, org.eclipse.osgi.service.resolver.BundleSpecification);
Clazz.defineMethod (c$, "setExported", 
function (exported) {
this.exported = exported;
}, "~B");
Clazz.defineMethod (c$, "setOptional", 
function (optional) {
this.optional = optional;
}, "~B");
Clazz.overrideMethod (c$, "isExported", 
function () {
return this.exported;
});
Clazz.overrideMethod (c$, "isOptional", 
function () {
return this.optional;
});
Clazz.overrideMethod (c$, "isSatisfiedBy", 
function (supplier) {
if (!(Clazz.instanceOf (supplier, org.eclipse.osgi.service.resolver.BundleDescription))) return false;
var candidate = supplier;
if (candidate.getHost () != null) return false;
if (this.getName () != null && this.getName ().equals (candidate.getSymbolicName ()) && (this.getVersionRange () == null || this.getVersionRange ().isIncluded (candidate.getVersion ()))) return true;
return false;
}, "org.eclipse.osgi.service.resolver.BaseDescription");
Clazz.overrideMethod (c$, "toString", 
function () {
return "Require-Bundle: " + this.getName () + " - version: " + this.getVersionRange ();
});
});
