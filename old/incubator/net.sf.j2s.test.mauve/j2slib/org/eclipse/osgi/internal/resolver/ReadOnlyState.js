Clazz.declarePackage ("org.eclipse.osgi.internal.resolver");
Clazz.load (["org.eclipse.osgi.service.resolver.State"], "org.eclipse.osgi.internal.resolver.ReadOnlyState", ["java.lang.UnsupportedOperationException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.target = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.internal.resolver, "ReadOnlyState", null, org.eclipse.osgi.service.resolver.State);
Clazz.makeConstructor (c$, 
function (target) {
this.target = target;
}, "org.eclipse.osgi.service.resolver.State");
Clazz.overrideMethod (c$, "addBundle", 
function (description) {
throw  new UnsupportedOperationException ();
}, "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.defineMethod (c$, "compare", 
function (state) {
return this.target.compare (state);
}, "org.eclipse.osgi.service.resolver.State");
Clazz.defineMethod (c$, "getBundle", 
function (id) {
return this.target.getBundle (id);
}, "~N");
Clazz.defineMethod (c$, "getBundle", 
function (symbolicName, version) {
return this.target.getBundle (symbolicName, version);
}, "~S,org.osgi.framework.Version");
Clazz.defineMethod (c$, "getBundleByLocation", 
function (location) {
return this.target.getBundleByLocation (location);
}, "~S");
Clazz.defineMethod (c$, "getBundles", 
function () {
return this.target.getBundles ();
});
Clazz.defineMethod (c$, "getBundles", 
function (symbolicName) {
return this.target.getBundles (symbolicName);
}, "~S");
Clazz.defineMethod (c$, "getChanges", 
function () {
return this.target.getChanges ();
});
Clazz.defineMethod (c$, "getExportedPackages", 
function () {
return this.target.getExportedPackages ();
});
Clazz.defineMethod (c$, "getFactory", 
function () {
return this.target.getFactory ();
});
Clazz.defineMethod (c$, "getResolvedBundles", 
function () {
return this.target.getResolvedBundles ();
});
Clazz.defineMethod (c$, "getTimeStamp", 
function () {
return this.target.getTimeStamp ();
});
Clazz.defineMethod (c$, "isEmpty", 
function () {
return this.target.isEmpty ();
});
Clazz.defineMethod (c$, "isResolved", 
function () {
return this.target.isResolved ();
});
Clazz.defineMethod (c$, "removeBundle", 
function (bundle) {
throw  new UnsupportedOperationException ();
}, "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.defineMethod (c$, "removeBundle", 
function (bundleId) {
throw  new UnsupportedOperationException ();
}, "~N");
Clazz.defineMethod (c$, "resolve", 
function () {
throw  new UnsupportedOperationException ();
});
Clazz.defineMethod (c$, "resolve", 
function (incremental) {
throw  new UnsupportedOperationException ();
}, "~B");
Clazz.defineMethod (c$, "resolve", 
function (discard) {
throw  new UnsupportedOperationException ();
}, "~A");
Clazz.overrideMethod (c$, "setOverrides", 
function (value) {
throw  new UnsupportedOperationException ();
}, "~O");
Clazz.overrideMethod (c$, "updateBundle", 
function (newDescription) {
throw  new UnsupportedOperationException ();
}, "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.overrideMethod (c$, "resolveConstraint", 
function (constraint, supplier) {
throw  new UnsupportedOperationException ();
}, "org.eclipse.osgi.service.resolver.VersionConstraint,org.eclipse.osgi.service.resolver.BaseDescription");
Clazz.overrideMethod (c$, "resolveBundle", 
function (bundle, status, host, selectedExports, resolvedRequires, resolveImports) {
throw  new UnsupportedOperationException ();
}, "org.eclipse.osgi.service.resolver.BundleDescription,~B,~A,~A,~A,~A");
Clazz.overrideMethod (c$, "removeBundleComplete", 
function (bundle) {
throw  new UnsupportedOperationException ();
}, "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.overrideMethod (c$, "getResolver", 
function () {
return null;
});
Clazz.overrideMethod (c$, "setResolver", 
function (value) {
throw  new UnsupportedOperationException ();
}, "org.eclipse.osgi.service.resolver.Resolver");
Clazz.defineMethod (c$, "setPlatformProperties", 
function (platformProperties) {
throw  new UnsupportedOperationException ();
}, "java.util.Dictionary");
Clazz.defineMethod (c$, "setPlatformProperties", 
function (platformProperties) {
throw  new UnsupportedOperationException ();
}, "~A");
Clazz.defineMethod (c$, "getPlatformProperties", 
function () {
return this.target.getPlatformProperties ();
});
Clazz.overrideMethod (c$, "linkDynamicImport", 
function (importingBundle, requestedPackage) {
throw  new UnsupportedOperationException ();
}, "org.eclipse.osgi.service.resolver.BundleDescription,~S");
Clazz.overrideMethod (c$, "setTimeStamp", 
function (timeStamp) {
throw  new UnsupportedOperationException ();
}, "~N");
Clazz.defineMethod (c$, "getSystemPackages", 
function () {
return this.target.getSystemPackages ();
});
});
