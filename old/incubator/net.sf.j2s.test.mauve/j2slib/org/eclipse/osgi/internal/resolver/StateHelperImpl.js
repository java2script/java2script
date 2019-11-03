Clazz.declarePackage ("org.eclipse.osgi.internal.resolver");
Clazz.load (["org.eclipse.osgi.service.resolver.StateHelper"], "org.eclipse.osgi.internal.resolver.StateHelperImpl", ["java.lang.IllegalStateException", "java.util.ArrayList", "$.HashSet", "org.eclipse.osgi.internal.resolver.ComputeNodeOrder"], function () {
c$ = Clazz.declareType (org.eclipse.osgi.internal.resolver, "StateHelperImpl", null, org.eclipse.osgi.service.resolver.StateHelper);
Clazz.overrideMethod (c$, "getDependentBundles", 
function (roots) {
if (roots == null || roots.length == 0) return  new Array (0);
var reachable =  new java.util.HashSet (roots.length);
for (var i = 0; i < roots.length; i++) {
if (!roots[i].isResolved ()) continue ;this.addDependentBundles (roots[i], reachable);
}
return reachable.toArray ( new Array (reachable.size ()));
}, "~A");
Clazz.defineMethod (c$, "addDependentBundles", 
($fz = function (root, reachable) {
if (reachable.contains (root)) return ;
reachable.add (root);
var dependents = root.getDependents ();
for (var i = 0; i < dependents.length; i++) this.addDependentBundles (dependents[i], reachable);

}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.service.resolver.BundleDescription,java.util.Set");
Clazz.overrideMethod (c$, "getUnsatisfiedConstraints", 
function (bundle) {
var containingState = bundle.getContainingState ();
if (containingState == null) throw  new IllegalStateException ("Does not belong to a state");
var unsatisfied =  new java.util.ArrayList ();
var host = bundle.getHost ();
if (host != null) if (!host.isResolved () && !this.isResolvable (host)) unsatisfied.add (host);
var requiredBundles = bundle.getRequiredBundles ();
for (var i = 0; i < requiredBundles.length; i++) if (!requiredBundles[i].isResolved () && !this.isResolvable (requiredBundles[i])) unsatisfied.add (requiredBundles[i]);

var packages = bundle.getImportPackages ();
for (var i = 0; i < packages.length; i++) if (!packages[i].isResolved () && !this.isResolvable (packages[i])) unsatisfied.add (packages[i]);

return unsatisfied.toArray ( new Array (unsatisfied.size ()));
}, "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.defineMethod (c$, "isResolvable", 
function (constraint) {
var exports = constraint.getBundle ().getContainingState ().getExportedPackages ();
for (var i = 0; i < exports.length; i++) if (constraint.isSatisfiedBy (exports[i])) return true;

return false;
}, "org.eclipse.osgi.service.resolver.ImportPackageSpecification");
Clazz.defineMethod (c$, "isResolvable", 
function (specification) {
return this.isBundleConstraintResolvable (specification);
}, "org.eclipse.osgi.service.resolver.BundleSpecification");
Clazz.defineMethod (c$, "isResolvable", 
function (specification) {
return this.isBundleConstraintResolvable (specification);
}, "org.eclipse.osgi.service.resolver.HostSpecification");
Clazz.defineMethod (c$, "isBundleConstraintResolvable", 
($fz = function (constraint) {
var availableBundles = constraint.getBundle ().getContainingState ().getBundles (constraint.getName ());
for (var i = 0; i < availableBundles.length; i++) if (availableBundles[i].isResolved () && constraint.isSatisfiedBy (availableBundles[i])) return true;

return false;
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.service.resolver.VersionConstraint");
Clazz.overrideMethod (c$, "sortBundles", 
function (toSort) {
var references =  new java.util.ArrayList (toSort.length);
for (var i = 0; i < toSort.length; i++) if (toSort[i].isResolved ()) this.buildReferences (toSort[i], references);

return org.eclipse.osgi.internal.resolver.ComputeNodeOrder.computeNodeOrder (toSort, references.toArray ( new Array (references.size ())));
}, "~A");
Clazz.defineMethod (c$, "buildReferences", 
($fz = function (description, references) {
var host = description.getHost ();
if (host != null) {
if (host.getHosts () != null) {
var hosts = host.getHosts ();
for (var i = 0; i < hosts.length; i++) if (hosts[i] !== description) references.add ([description, hosts[i]]);

}} else {
this.buildReferences (description, (description).getBundleDependencies (), references);
}}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.service.resolver.BundleDescription,java.util.List");
Clazz.defineMethod (c$, "buildReferences", 
($fz = function (description, dependencies, references) {
for (var iter = dependencies.iterator (); iter.hasNext (); ) this.addReference (description, iter.next (), references);

}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.service.resolver.BundleDescription,java.util.List,java.util.List");
Clazz.defineMethod (c$, "addReference", 
($fz = function (description, reference, references) {
if (description === reference || reference == null) return ;
references.add ([description, reference]);
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.service.resolver.BundleDescription,org.eclipse.osgi.service.resolver.BundleDescription,java.util.List");
Clazz.overrideMethod (c$, "getVisiblePackages", 
function (bundle) {
var state = bundle.getContainingState ();
var strict = false;
if (state != null) strict = state.inStrictMode ();
var packageList =  new java.util.ArrayList ();
var importList =  new java.util.ArrayList ();
var resolvedImports = bundle.getResolvedImports ();
for (var i = 0; i < resolvedImports.length; i++) {
packageList.add (resolvedImports[i]);
importList.add (resolvedImports[i].getName ());
}
var requiredBundles = bundle.getResolvedRequires ();
var visited =  new java.util.ArrayList (requiredBundles.length);
for (var i = 0; i < requiredBundles.length; i++) this.getPackages (requiredBundles[i], bundle.getSymbolicName (), importList, packageList, visited, strict);

return packageList.toArray ( new Array (packageList.size ()));
}, "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.defineMethod (c$, "getPackages", 
($fz = function (requiredBundle, symbolicName, importList, packageList, visited, strict) {
if (visited.contains (requiredBundle)) return ;
visited.add (requiredBundle);
var exports = requiredBundle.getSelectedExports ();
for (var i = 0; i < exports.length; i++) if (!this.isSystemExport (exports[i]) && this.isFriend (symbolicName, exports[i], strict) && !importList.contains (exports[i].getName ())) packageList.add (exports[i]);

var requiredBundles = requiredBundle.getRequiredBundles ();
for (var i = 0; i < requiredBundles.length; i++) if (requiredBundles[i].isExported () && requiredBundles[i].getSupplier () != null) this.getPackages (requiredBundles[i].getSupplier (), symbolicName, importList, packageList, visited, strict);

}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.service.resolver.BundleDescription,~S,java.util.List,java.util.List,java.util.List,~B");
Clazz.defineMethod (c$, "isSystemExport", 
($fz = function ($export) {
var state = $export.getExporter ().getContainingState ();
if (state == null) return false;
var systemExports = state.getSystemPackages ();
for (var i = 0; i < systemExports.length; i++) if (systemExports[i] === $export) return true;

return false;
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.service.resolver.ExportPackageDescription");
Clazz.defineMethod (c$, "isFriend", 
($fz = function (consumerBSN, $export, strict) {
if (!strict) return true;
var friends = $export.getDirective ("x-friends");
if (friends == null) return true;
for (var i = 0; i < friends.length; i++) if (friends[i].equals (consumerBSN)) return true;

return false;
}, $fz.isPrivate = true, $fz), "~S,org.eclipse.osgi.service.resolver.ExportPackageDescription,~B");
Clazz.overrideMethod (c$, "getAccessCode", 
function (bundle, $export) {
if (($export.getDirective ("x-internal")).booleanValue ()) return 2;
if (!this.isFriend (bundle.getSymbolicName (), $export, true)) return 2;
return 1;
}, "org.eclipse.osgi.service.resolver.BundleDescription,org.eclipse.osgi.service.resolver.ExportPackageDescription");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function () {
return org.eclipse.osgi.internal.resolver.StateHelperImpl.instance;
});
c$.instance = c$.prototype.instance =  new org.eclipse.osgi.internal.resolver.StateHelperImpl ();
});
