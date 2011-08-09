Clazz.declarePackage ("org.eclipse.osgi.internal.resolver");
Clazz.load (["org.eclipse.osgi.internal.resolver.VersionConstraintImpl", "org.eclipse.osgi.service.resolver.HostSpecification"], "org.eclipse.osgi.internal.resolver.HostSpecificationImpl", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.hosts = null;
this.multihost = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.internal.resolver, "HostSpecificationImpl", org.eclipse.osgi.internal.resolver.VersionConstraintImpl, org.eclipse.osgi.service.resolver.HostSpecification);
Clazz.overrideMethod (c$, "isSatisfiedBy", 
function (supplier) {
if (!(Clazz.instanceOf (supplier, org.eclipse.osgi.service.resolver.BundleDescription))) return false;
var candidate = supplier;
if (candidate.getHost () != null) return false;
if (this.getName () != null && this.getName ().equals (candidate.getSymbolicName ()) && (this.getVersionRange () == null || this.getVersionRange ().isIncluded (candidate.getVersion ()))) return true;
return false;
}, "org.eclipse.osgi.service.resolver.BaseDescription");
Clazz.overrideMethod (c$, "getHosts", 
function () {
return this.hosts;
});
Clazz.overrideMethod (c$, "isResolved", 
function () {
return this.hosts != null && this.hosts.length > 0;
});
Clazz.defineMethod (c$, "setHosts", 
function (hosts) {
this.hosts = hosts;
}, "~A");
Clazz.overrideMethod (c$, "toString", 
function () {
return "Fragment-Host: " + this.getName () + " - version: " + this.getVersionRange ();
});
Clazz.overrideMethod (c$, "getSupplier", 
function () {
if (this.hosts == null || this.hosts.length == 0) return null;
return this.hosts[0];
});
Clazz.overrideMethod (c$, "isMultiHost", 
function () {
return this.multihost;
});
Clazz.defineMethod (c$, "setIsMultiHost", 
function (multihost) {
this.multihost = multihost;
}, "~B");
});
