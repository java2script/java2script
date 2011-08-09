Clazz.declarePackage ("org.eclipse.osgi.internal.module");
Clazz.load (null, "org.eclipse.osgi.internal.module.BundleConstraint", ["java.util.ArrayList"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bundle = null;
this.bundleConstraint = null;
this.matchingBundle = null;
this.matchingBundles = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.internal.module, "BundleConstraint");
Clazz.makeConstructor (c$, 
function (bundle, bundleConstraint) {
this.bundle = bundle;
this.bundleConstraint = bundleConstraint;
}, "org.eclipse.osgi.internal.module.ResolverBundle,org.eclipse.osgi.service.resolver.VersionConstraint");
Clazz.defineMethod (c$, "isFromFragment", 
function () {
return this.bundleConstraint.getBundle ().getHost () != null;
});
Clazz.defineMethod (c$, "getBundle", 
function () {
return this.bundle;
});
Clazz.defineMethod (c$, "getActualBundle", 
function () {
return this.bundle.getBundle ();
});
Clazz.defineMethod (c$, "isSatisfiedBy", 
function (rb) {
if (!this.bundle.getResolver ().getPermissionChecker ().checkBundlePermission (this.bundleConstraint, rb.getBundle ())) return false;
return this.bundleConstraint.isSatisfiedBy (rb.getBundle ());
}, "org.eclipse.osgi.internal.module.ResolverBundle");
Clazz.defineMethod (c$, "isOptional", 
function () {
if (Clazz.instanceOf (this.bundleConstraint, org.eclipse.osgi.service.resolver.HostSpecification)) return false;
return (this.bundleConstraint).isOptional ();
});
Clazz.defineMethod (c$, "getVersionConstraint", 
function () {
return this.bundleConstraint;
});
Clazz.defineMethod (c$, "getMatchingBundle", 
function () {
return this.matchingBundle;
});
Clazz.defineMethod (c$, "getMatchingBundles", 
function () {
if (this.matchingBundles == null) return null;
var results =  new Array (this.matchingBundles.size ());
var i = 0;
for (var iter = this.matchingBundles.iterator (); iter.hasNext (); i++) {
results[i] = iter.next ();
}
return results.length == 0 ? null : results;
});
Clazz.defineMethod (c$, "addMatchingBundle", 
function (rb) {
if (this.matchingBundles == null) this.matchingBundles =  new java.util.ArrayList (1);
if (!this.matchingBundles.contains (rb)) this.matchingBundles.add (rb);
}, "org.eclipse.osgi.internal.module.ResolverBundle");
Clazz.defineMethod (c$, "removeMatchingBundle", 
function (rb) {
if (this.matchingBundles == null) return ;
this.matchingBundles.remove (rb);
}, "org.eclipse.osgi.internal.module.ResolverBundle");
Clazz.defineMethod (c$, "removeAllMatchingBundles", 
function () {
this.matchingBundles = null;
});
Clazz.defineMethod (c$, "setMatchingBundle", 
function (rb) {
this.matchingBundle = rb;
}, "org.eclipse.osgi.internal.module.ResolverBundle");
Clazz.defineMethod (c$, "foundMatchingBundles", 
function () {
return this.matchingBundles == null ? false : this.matchingBundles.size () > 0;
});
});
