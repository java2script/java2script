Clazz.declarePackage ("org.eclipse.osgi.internal.module");
Clazz.load (["org.eclipse.osgi.service.resolver.Resolver", "java.util.HashMap"], "org.eclipse.osgi.internal.module.ResolverImpl", ["java.lang.IllegalStateException", "$.Long", "java.util.ArrayList", "org.eclipse.osgi.framework.debug.Debug", "$.FrameworkDebugOptions", "org.eclipse.osgi.internal.module.CyclicDependencyHashMap", "$.GroupingChecker", "$.PermissionChecker", "$.ResolverBundle", "$.ResolverExport", "$.ResolverImport", "$.VersionHashMap"], function () {
c$ = Clazz.decorateAsClass (function () {
this.removalPending = null;
this.state = null;
this.resolverExports = null;
this.resolverBundles = null;
this.unresolvedBundles = null;
this.resolvedBundles = null;
this.resolvingBundles = null;
this.cyclicDependencies = null;
this.bundleMapping = null;
this.initialized = false;
this.permissionChecker = null;
this.groupingChecker = null;
this.context = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.internal.module, "ResolverImpl", null, org.eclipse.osgi.service.resolver.Resolver);
Clazz.prepareFields (c$, function () {
this.removalPending =  new java.util.HashMap ();
});
Clazz.makeConstructor (c$, 
function (context, checkPermissions) {
this.context = context;
this.permissionChecker =  new org.eclipse.osgi.internal.module.PermissionChecker (context, checkPermissions);
}, "org.osgi.framework.BundleContext,~B");
Clazz.defineMethod (c$, "getPermissionChecker", 
function () {
return this.permissionChecker;
});
Clazz.defineMethod (c$, "initialize", 
($fz = function () {
this.resolverExports =  new org.eclipse.osgi.internal.module.VersionHashMap ();
this.resolverBundles =  new org.eclipse.osgi.internal.module.VersionHashMap ();
this.unresolvedBundles =  new java.util.ArrayList ();
this.bundleMapping =  new java.util.HashMap ();
this.cyclicDependencies =  new org.eclipse.osgi.internal.module.CyclicDependencyHashMap ();
var bundles = this.state.getBundles ();
this.groupingChecker =  new org.eclipse.osgi.internal.module.GroupingChecker ();
var fragmentBundles =  new java.util.ArrayList ();
for (var i = 0; i < bundles.length; i++) this.initResolverBundle (bundles[i], fragmentBundles, false);

var removedBundles = this.getRemovalPending ();
for (var i = 0; i < removedBundles.length; i++) this.initResolverBundle (removedBundles[i], fragmentBundles, true);

for (var iter = fragmentBundles.iterator (); iter.hasNext (); ) {
var fragment = iter.next ();
var hosts = (fragment.getHost ().getVersionConstraint ()).getHosts ();
for (var i = 0; i < hosts.length; i++) {
var host = this.bundleMapping.get (hosts[i]);
if (host != null) host.attachFragment (fragment, false);
}
}
this.rewireBundles ();
this.groupingChecker.addInitialGroupingConstraints (this.bundleMapping.values ().toArray ( new Array (this.bundleMapping.size ())));
this.setDebugOptions ();
this.initialized = true;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "initResolverBundle", 
($fz = function (bundleDesc, fragmentBundles, pending) {
var bundle =  new org.eclipse.osgi.internal.module.ResolverBundle (bundleDesc, this);
this.bundleMapping.put (bundleDesc, bundle);
if (pending) return ;
this.resolverBundles.put (bundle);
if (bundleDesc.isResolved ()) {
bundle.setState (2);
if (bundleDesc.getHost () != null) fragmentBundles.add (bundle);
} else {
this.unresolvedBundles.add (bundle);
}this.resolverExports.put (bundle.getExportPackages ());
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.service.resolver.BundleDescription,java.util.ArrayList,~B");
Clazz.defineMethod (c$, "rewireBundles", 
($fz = function () {
for (var iter = this.bundleMapping.values ().iterator (); iter.hasNext (); ) {
var rb = iter.next ();
if (!rb.getBundle ().isResolved () || rb.isFragment ()) continue ;this.rewireBundle (rb);
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "rewireBundle", 
($fz = function (rb) {
if (rb.isFullyWired ()) return ;
var requires = rb.getRequires ();
for (var i = 0; i < requires.length; i++) {
this.rewireRequire (requires[i]);
}
var imports = rb.getImportPackages ();
for (var i = 0; i < imports.length; i++) {
this.rewireImport (imports[i]);
}
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.module.ResolverBundle");
Clazz.defineMethod (c$, "rewireRequire", 
($fz = function (req) {
if (req.getMatchingBundle () != null) return ;
var matchingBundle = this.bundleMapping.get (req.getVersionConstraint ().getSupplier ());
req.setMatchingBundle (matchingBundle);
if (matchingBundle == null && !req.isOptional ()) {
System.err.println ("Could not find matching bundle for " + req.getVersionConstraint ());
}if (matchingBundle != null) {
this.rewireBundle (matchingBundle);
}}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.module.BundleConstraint");
Clazz.defineMethod (c$, "rewireImport", 
($fz = function (imp) {
if (imp.isDynamic () || imp.getMatchingExport () != null) return ;
var matchingExport = null;
var importSupplier = imp.getImportPackageSpecification ().getSupplier ();
var exporter = importSupplier == null ? null : this.bundleMapping.get (importSupplier.getExporter ());
var matches = this.resolverExports.getArray (imp.getName ());
for (var j = 0; j < matches.length; j++) {
var $export = matches[j];
if ($export.getExporter () === exporter && imp.isSatisfiedBy ($export)) {
matchingExport = $export;
break;
}}
imp.setMatchingExport (matchingExport);
if (matchingExport == null && exporter != null) {
var reprovidedExport =  new org.eclipse.osgi.internal.module.ResolverExport (exporter, importSupplier);
if (exporter.getExport (imp) == null) {
exporter.addExport (reprovidedExport);
this.resolverExports.put (reprovidedExport);
}imp.setMatchingExport (reprovidedExport);
}if (imp.getMatchingExport () == null && !imp.isOptional ()) {
System.err.println ("Could not find matching export for " + imp.getImportPackageSpecification ());
}if (imp.getMatchingExport () != null) {
this.rewireBundle (imp.getMatchingExport ().getExporter ());
}}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.module.ResolverImport");
Clazz.defineMethod (c$, "isResolvable", 
($fz = function (bundle, platformProperties, rejectedSingletons) {
if (rejectedSingletons.contains (bundle)) return false;
var imports = bundle.getImportPackages ();
for (var i = 0; i < imports.length; i++) {
if (!"dynamic".equals (imports[i].getDirective ("resolution")) && imports[i].getName ().endsWith ("*")) return false;
for (var j = 0; j < i; j++) {
if (imports[i] !== imports[j] && imports[i].getName ().equals (imports[j])) return false;
}
}
var platformFilter = bundle.getPlatformFilter ();
if (platformFilter == null) {
return true;
}if (platformProperties == null) return false;
try {
var filter = this.context.createFilter (platformFilter);
for (var i = 0; i < platformProperties.length; i++) if (filter.match (platformProperties[i])) return true;

} catch (e) {
if (Clazz.instanceOf (e, org.osgi.framework.InvalidSyntaxException)) {
return false;
} else {
throw e;
}
}
return false;
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.service.resolver.BundleDescription,~A,java.util.ArrayList");
Clazz.defineMethod (c$, "attachFragment", 
($fz = function (bundle, rejectedSingletons) {
if (!bundle.isFragment () || !bundle.isResolvable () || rejectedSingletons.contains (bundle.getBundle ())) return ;
if (bundle.getBundle ().isSingleton ()) {
var bundleDesc = bundle.getBundle ();
var sameName = this.resolverBundles.getArray (bundleDesc.getName ());
if (sameName.length > 1) {
for (var j = 0; j < sameName.length; j++) {
var sameNameDesc = sameName[j].getBundle ();
if (sameName[j] === bundle || !sameNameDesc.isSingleton () || rejectedSingletons.contains (sameNameDesc)) continue ;if (sameNameDesc.isResolved () || sameNameDesc.getVersion ().compareTo (bundle.getBundle ().getVersion ()) > 0) {
rejectedSingletons.add (bundle.getBundle ());
return ;
}rejectedSingletons.add (sameNameDesc);
}
}}var hostConstraint = bundle.getHost ();
var hosts = this.resolverBundles.getArray (hostConstraint.getVersionConstraint ().getName ());
for (var i = 0; i < hosts.length; i++) {
if ((hosts[i]).isResolvable () && hostConstraint.isSatisfiedBy (hosts[i])) this.resolverExports.put ((hosts[i]).attachFragment (bundle, true));
}
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.module.ResolverBundle,java.util.ArrayList");
Clazz.overrideMethod (c$, "resolve", 
function (reRefresh, platformProperties) {
if (org.eclipse.osgi.internal.module.ResolverImpl.DEBUG) org.eclipse.osgi.internal.module.ResolverImpl.log ("*** BEGIN RESOLUTION ***");
if (this.state == null) throw  new IllegalStateException ("RESOLVER_NO_STATE");
if (!this.initialized) {
this.initialize ();
}if (reRefresh != null) for (var i = 0; i < reRefresh.length; i++) {
var rb = this.bundleMapping.get (reRefresh[i]);
if (rb != null) this.unresolveBundle (rb, false);
}
var rejectedSingletons =  new java.util.ArrayList ();
var bundles = this.unresolvedBundles.toArray ( new Array (this.unresolvedBundles.size ()));
this.resolveBundles (bundles, platformProperties, rejectedSingletons);
if (this.selectSingletons (bundles, rejectedSingletons)) {
bundles = this.unresolvedBundles.toArray ( new Array (this.unresolvedBundles.size ()));
this.resolveBundles (bundles, platformProperties, rejectedSingletons);
}if (org.eclipse.osgi.internal.module.ResolverImpl.DEBUG_WIRING) this.printWirings ();
if (org.eclipse.osgi.internal.module.ResolverImpl.DEBUG) org.eclipse.osgi.internal.module.ResolverImpl.log ("*** END RESOLUTION ***");
}, "~A,~A");
Clazz.defineMethod (c$, "resolveBundles", 
($fz = function (bundles, platformProperties, rejectedSingletons) {
this.resolvingBundles =  new java.util.ArrayList (this.unresolvedBundles.size ());
this.resolvedBundles =  new java.util.ArrayList (this.unresolvedBundles.size ());
this.groupingChecker.addInitialGroupingConstraints (bundles);
for (var i = 0; i < bundles.length; i++) bundles[i].setResolvable (this.isResolvable (bundles[i].getBundle (), platformProperties, rejectedSingletons));

for (var i = 0; i < bundles.length; i++) this.attachFragment (bundles[i], rejectedSingletons);

for (var i = 0; i < bundles.length; i++) {
if (org.eclipse.osgi.internal.module.ResolverImpl.DEBUG) org.eclipse.osgi.internal.module.ResolverImpl.log ("** RESOLVING " + bundles[i] + " **");
this.resolveBundle (bundles[i]);
while (this.resolvingBundles.size () > 0) {
var rb = this.resolvingBundles.get (0);
var imports = rb.getImportPackages ();
var needRewire = false;
for (var j = 0; j < imports.length; j++) {
if (imports[j].getMatchingExport () != null && !this.resolverExports.contains (imports[j].getMatchingExport ())) {
imports[j].setMatchingExport (null);
needRewire = true;
}}
if (needRewire) this.resolveBundle (rb);
if (rb.isFullyWired ()) {
if (org.eclipse.osgi.internal.module.ResolverImpl.DEBUG || org.eclipse.osgi.internal.module.ResolverImpl.DEBUG_CYCLES) org.eclipse.osgi.internal.module.ResolverImpl.log ("Pushing " + rb + " to RESOLVED");
this.setBundleResolved (rb);
}}
}
if (this.unresolvedBundles.size () > 0) {
bundles = this.unresolvedBundles.toArray ( new Array (this.unresolvedBundles.size ()));
for (var i = 0; i < bundles.length; i++) this.resolveFragment (bundles[i]);

}this.stateResolveBundles ();
this.resolvingBundles = null;
this.resolvedBundles = null;
}, $fz.isPrivate = true, $fz), "~A,~A,java.util.ArrayList");
Clazz.defineMethod (c$, "selectSingletons", 
($fz = function (bundles, rejectedSingletons) {
var result = false;
for (var i = 0; i < bundles.length; i++) {
var bundleDesc = bundles[i].getBundle ();
if (!bundleDesc.isSingleton () || !bundleDesc.isResolved () || rejectedSingletons.contains (bundleDesc)) continue ;var sameName = this.resolverBundles.getArray (bundleDesc.getName ());
if (sameName.length > 1) {
var numDeps = bundleDesc.getDependents ().length;
for (var j = 0; j < sameName.length; j++) {
var sameNameDesc = sameName[j].getBundle ();
if (sameName[j] === bundles[i] || !sameNameDesc.isSingleton () || !sameNameDesc.isResolved () || rejectedSingletons.contains (sameNameDesc)) continue ;result = true;
if (sameNameDesc.getVersion ().compareTo (bundleDesc.getVersion ()) > 0 && (sameNameDesc.getDependents ().length > 0 || numDeps == 0)) {
if (!rejectedSingletons.contains (bundles[i].getBundle ())) rejectedSingletons.add (bundles[i].getBundle ());
break;
}if (!rejectedSingletons.contains (sameNameDesc)) rejectedSingletons.add (sameNameDesc);
}
}}
for (var rejects = rejectedSingletons.iterator (); rejects.hasNext (); ) this.unresolveBundle (this.bundleMapping.get (rejects.next ()), false);

return result;
}, $fz.isPrivate = true, $fz), "~A,java.util.ArrayList");
Clazz.defineMethod (c$, "resolveFragment", 
($fz = function (fragment) {
if (!fragment.isFragment ()) return ;
if (fragment.getHost ().foundMatchingBundles ()) this.setBundleResolved (fragment);
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.module.ResolverBundle");
Clazz.defineMethod (c$, "resolveBundle", 
($fz = function (bundle) {
if (bundle.isFragment ()) return false;
if (!bundle.isResolvable ()) {
if (org.eclipse.osgi.internal.module.ResolverImpl.DEBUG) org.eclipse.osgi.internal.module.ResolverImpl.log ("  - " + bundle + " is unresolvable");
return false;
}if (bundle.getState () == 2) {
if (org.eclipse.osgi.internal.module.ResolverImpl.DEBUG) org.eclipse.osgi.internal.module.ResolverImpl.log ("  - " + bundle + " already resolved");
return true;
} else if (bundle.getState () == 0) {
bundle.clearWires ();
this.setBundleResolving (bundle);
}var failed = false;
if (bundle.getBundle ().isSingleton ()) {
var sameName = this.resolverBundles.getArray (bundle.getName ());
if (sameName.length > 1) for (var i = 0; i < sameName.length; i++) {
if (sameName[i] === bundle || !sameName[i].getBundle ().isSingleton ()) continue ;if ((sameName[i]).getBundle ().isResolved ()) {
failed = true;
break;
}}
}if (!failed) {
var requires = bundle.getRequires ();
for (var i = 0; i < requires.length; i++) {
if (!this.resolveRequire (requires[i])) {
if (org.eclipse.osgi.internal.module.ResolverImpl.DEBUG || org.eclipse.osgi.internal.module.ResolverImpl.DEBUG_REQUIRES) org.eclipse.osgi.internal.module.ResolverImpl.log ("** REQUIRE " + requires[i].getVersionConstraint ().getName () + "[" + requires[i].getActualBundle () + "] failed to resolve");
if (requires[i].isFromFragment ()) {
this.resolverExports.remove (bundle.detachFragment (this.bundleMapping.get (requires[i].getVersionConstraint ().getBundle ())));
continue ;}failed = true;
break;
}}
}if (!failed) {
var imports = bundle.getImportPackages ();
for (var i = 0; i < imports.length; i++) {
if (!imports[i].isDynamic ()) {
if (!this.resolveImport (imports[i], true)) {
if (org.eclipse.osgi.internal.module.ResolverImpl.DEBUG || org.eclipse.osgi.internal.module.ResolverImpl.DEBUG_IMPORTS) org.eclipse.osgi.internal.module.ResolverImpl.log ("** IMPORT " + imports[i].getName () + "[" + imports[i].getActualBundle () + "] failed to resolve");
if (imports[i].isFromFragment ()) {
this.resolverExports.remove (bundle.detachFragment (this.bundleMapping.get (imports[i].getImportPackageSpecification ().getBundle ())));
continue ;}failed = true;
break;
}}}
}var fullyWired = bundle.isFullyWired ();
if (!failed && fullyWired && !bundle.isDependentOnCycle ()) {
if (!this.groupingChecker.checkRequiresConstraints (bundle)) {
this.setBundleUnresolved (bundle, false);
if (org.eclipse.osgi.internal.module.ResolverImpl.DEBUG) org.eclipse.osgi.internal.module.ResolverImpl.log (bundle + " NOT RESOLVED due to propagation or grouping constraints");
} else {
this.setBundleResolved (bundle);
if (org.eclipse.osgi.internal.module.ResolverImpl.DEBUG) org.eclipse.osgi.internal.module.ResolverImpl.log (bundle + " RESOLVED");
}} else if (failed || !fullyWired) {
this.setBundleUnresolved (bundle, false);
if (org.eclipse.osgi.internal.module.ResolverImpl.DEBUG) org.eclipse.osgi.internal.module.ResolverImpl.log (bundle + " NOT RESOLVED");
}if (!failed && fullyWired) {
this.groupingChecker.addReExportConstraints (bundle);
this.groupingChecker.addRequireConstraints (bundle.getExportPackages (), bundle);
}var v = this.cyclicDependencies.remove (bundle);
if (v != null) {
for (var i = 0; i < v.size (); i++) {
var dependent = v.get (i);
if (bundle.isDependentOnUnresolvedFragment (dependent)) {
dependent.cyclicDependencyFailed (bundle);
this.setBundleUnresolved (dependent, false);
if (org.eclipse.osgi.internal.module.ResolverImpl.DEBUG_CYCLES) org.eclipse.osgi.internal.module.ResolverImpl.log ("Setting dependent bundle (" + dependent + ") to unresolved (due to fragment)");
} else if (bundle.getState () == 2) {
if (dependent.cyclicDependencyResolved (bundle)) {
this.setBundleResolved (dependent);
if (org.eclipse.osgi.internal.module.ResolverImpl.DEBUG_CYCLES) org.eclipse.osgi.internal.module.ResolverImpl.log ("Telling dependent bundle (" + dependent + ") that " + bundle + " has resolved");
}} else if (bundle.getState () == 0) {
dependent.cyclicDependencyFailed (bundle);
this.setBundleUnresolved (dependent, false);
if (org.eclipse.osgi.internal.module.ResolverImpl.DEBUG_CYCLES) org.eclipse.osgi.internal.module.ResolverImpl.log ("Setting dependent bundle (" + dependent + ") to unresolved");
}}
}if (bundle.getState () == 0) bundle.setResolvable (false);
this.stateResolveConstraints (bundle);
return bundle.getState () != 0;
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.module.ResolverBundle");
Clazz.defineMethod (c$, "resolveRequire", 
($fz = function (req) {
if (org.eclipse.osgi.internal.module.ResolverImpl.DEBUG_REQUIRES) org.eclipse.osgi.internal.module.ResolverImpl.log ("Trying to resolve: " + req.getBundle () + ", " + req.getVersionConstraint ());
if (req.getMatchingBundle () != null) {
if (req.getMatchingBundle ().getState () == 1) {
this.cyclicDependencies.put (req.getMatchingBundle (), req.getBundle ());
req.getBundle ().recordCyclicDependency (req.getMatchingBundle ());
}if (org.eclipse.osgi.internal.module.ResolverImpl.DEBUG_REQUIRES) org.eclipse.osgi.internal.module.ResolverImpl.log ("  - already wired");
return true;
}var bundles = this.resolverBundles.getArray (req.getVersionConstraint ().getName ());
for (var i = 0; i < bundles.length; i++) {
var bundle = bundles[i];
if (org.eclipse.osgi.internal.module.ResolverImpl.DEBUG_REQUIRES) org.eclipse.osgi.internal.module.ResolverImpl.log ("CHECKING: " + bundle.getBundle ());
if (req.isSatisfiedBy (bundle)) {
var originalState = bundle.getState ();
req.setMatchingBundle (bundle);
if (req.getBundle () === bundle) return true;
if ((originalState == 0 && !this.resolveBundle (bundle))) {
req.setMatchingBundle (null);
continue ;}if (originalState == 1) {
this.cyclicDependencies.put (bundle, req.getBundle ());
req.getBundle ().recordCyclicDependency (bundle);
} else if (originalState == 0 && bundle.getState () == 1) {
var exportersCyclicDependencies = bundle.getCyclicDependencies ();
for (var k = 0; k < exportersCyclicDependencies.size (); k++) {
var dependentOn = exportersCyclicDependencies.get (k);
if (dependentOn !== req.getBundle ()) {
this.cyclicDependencies.put (dependentOn, req.getBundle ());
req.getBundle ().recordCyclicDependency (dependentOn);
}}
}if (org.eclipse.osgi.internal.module.ResolverImpl.DEBUG_REQUIRES) org.eclipse.osgi.internal.module.ResolverImpl.log ("Found match: " + bundle.getBundle () + ". Wiring");
return true;
}}
if (req.isOptional ()) return true;
return false;
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.module.BundleConstraint");
Clazz.defineMethod (c$, "resolveImport", 
($fz = function (imp, checkReexportsFromRequires) {
if (org.eclipse.osgi.internal.module.ResolverImpl.DEBUG_IMPORTS) org.eclipse.osgi.internal.module.ResolverImpl.log ("Trying to resolve: " + imp.getBundle () + ", " + imp.getName ());
if (imp.getMatchingExport () != null) {
if (imp.getMatchingExport ().getExporter ().getState () == 1) {
this.cyclicDependencies.put (imp.getMatchingExport ().getExporter (), imp.getBundle ());
imp.getBundle ().recordCyclicDependency (imp.getMatchingExport ().getExporter ());
}if (org.eclipse.osgi.internal.module.ResolverImpl.DEBUG_IMPORTS) org.eclipse.osgi.internal.module.ResolverImpl.log ("  - already wired");
return true;
}var exports = this.resolverExports.getArray (imp.getName ());
for (var i = 0; i < exports.length; i++) {
var $export = exports[i];
if (org.eclipse.osgi.internal.module.ResolverImpl.DEBUG_IMPORTS) org.eclipse.osgi.internal.module.ResolverImpl.log ("CHECKING: " + $export.getExporter ().getBundle () + ", " + exports[i].getName ());
if (imp.isSatisfiedBy ($export) && imp.isNotAnUnresolvableWiring ($export)) {
var originalState = $export.getExporter ().getState ();
if (imp.isDynamic () && originalState != 2) return false;
if (imp.getBundle () === $export.getExporter () && !$export.getExportPackageDescription ().isRoot ()) continue ;imp.setMatchingExport ($export);
if (imp.getBundle () !== $export.getExporter ()) {
var exp = imp.getBundle ().getExport (imp);
if (exp != null) {
if (exp.getExportPackageDescription ().isRoot () && !$export.getExportPackageDescription ().isRoot ()) continue ;this.resolverExports.remove (exp);
exp.setDropped (true);
}if (((originalState == 0 || !$export.getExportPackageDescription ().isRoot ()) && !this.resolveBundle ($export.getExporter ())) || !this.resolverExports.contains ($export)) {
if (exp != null) {
this.resolverExports.put (exp);
exp.setDropped (false);
}imp.setMatchingExport (null);
continue ;}}if (!imp.getBundle ().isResolvable ()) return false;
if (this.checkAndResolveDependencies (imp, imp.getMatchingExport ())) {
if (imp.getMatchingExport () !== $export) return true;
if (imp.getBundle () !== $export.getExporter ()) {
if (originalState == 1) {
this.cyclicDependencies.put ($export.getExporter (), imp.getBundle ());
imp.getBundle ().recordCyclicDependency ($export.getExporter ());
} else if (originalState == 0 && $export.getExporter ().getState () == 1) {
var exportersCyclicDependencies = $export.getExporter ().getCyclicDependencies ();
for (var k = 0; k < exportersCyclicDependencies.size (); k++) {
var dependentOn = exportersCyclicDependencies.get (k);
if (dependentOn !== imp.getBundle ()) {
this.cyclicDependencies.put (dependentOn, imp.getBundle ());
imp.getBundle ().recordCyclicDependency (dependentOn);
}}
}}if (org.eclipse.osgi.internal.module.ResolverImpl.DEBUG_IMPORTS) org.eclipse.osgi.internal.module.ResolverImpl.log ("Found match: " + $export.getExporter () + ". Wiring " + imp.getBundle () + ":" + imp.getName ());
return true;
} else if (!imp.getBundle ().isResolvable ()) {
return false;
}}}
if (checkReexportsFromRequires && this.resolveImportReprovide (imp)) return true;
if (imp.isOptional ()) return true;
return false;
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.module.ResolverImport,~B");
Clazz.defineMethod (c$, "resolveImportReprovide", 
($fz = function (imp) {
var bsn = imp.getImportPackageSpecification ().getBundleSymbolicName ();
if (bsn == null) {
return false;
}if (org.eclipse.osgi.internal.module.ResolverImpl.DEBUG_IMPORTS) org.eclipse.osgi.internal.module.ResolverImpl.log ("Checking reprovides: " + imp.getName ());
var rb;
for (var iter = this.bundleMapping.values ().iterator (); iter.hasNext (); ) {
rb = iter.next ();
if (bsn.equals (rb.getBundle ().getSymbolicName ()) && !rb.isFragment ()) {
if (this.resolveBundle (rb)) if (this.resolveImportReprovide0 (imp, rb, rb)) return true;
}}
return false;
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.module.ResolverImport");
Clazz.defineMethod (c$, "resolveImportReprovide0", 
($fz = function (imp, reexporter, rb) {
var requires = rb.getRequires ();
for (var i = 0; i < requires.length; i++) {
if (!(requires[i].getVersionConstraint ()).isExported ()) continue ;if (requires[i].getMatchingBundle () == null) continue ;var exports = requires[i].getMatchingBundle ().getExportPackages ();
for (var j = 0; j < exports.length; j++) {
if (imp.getName ().equals (exports[j].getName ())) {
var directives = exports[j].getExportPackageDescription ().getDirectives ();
directives.remove ("uses");
var epd = this.state.getFactory ().createExportPackageDescription (exports[j].getName (), exports[j].getVersion (), directives, exports[j].getExportPackageDescription ().getAttributes (), false, reexporter.getBundle ());
if (imp.getImportPackageSpecification ().isSatisfiedBy (epd)) {
if (org.eclipse.osgi.internal.module.ResolverImpl.DEBUG_IMPORTS) org.eclipse.osgi.internal.module.ResolverImpl.log (" - Creating re-export for reprovide: " + reexporter + ":" + epd.getName ());
var re =  new org.eclipse.osgi.internal.module.ResolverExport (reexporter, epd, true);
reexporter.addExport (re);
this.groupingChecker.addReprovideConstraints (re);
this.resolverExports.put (re);
if (this.resolveImport (imp, false)) return true;
}}}
if (this.resolveImportReprovide0 (imp, reexporter, requires[i].getMatchingBundle ())) return true;
}
return false;
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.module.ResolverImport,org.eclipse.osgi.internal.module.ResolverBundle,org.eclipse.osgi.internal.module.ResolverBundle");
Clazz.defineMethod (c$, "checkAndResolveDependencies", 
($fz = function (imp, exp) {
if (org.eclipse.osgi.internal.module.ResolverImpl.DEBUG_GROUPING) org.eclipse.osgi.internal.module.ResolverImpl.log ("  Checking grouping for " + imp.getBundle () + ":" + imp.getName () + " -> " + exp.getExporter () + ":" + exp.getName ());
var importer = imp.getBundle ();
var clash = this.groupingChecker.isConsistent (imp, exp);
if (clash == null) return true;
if (org.eclipse.osgi.internal.module.ResolverImpl.DEBUG_GROUPING) org.eclipse.osgi.internal.module.ResolverImpl.log ("  * grouping clash with " + clash.getExporter () + ":" + clash.getName ());
imp.addUnresolvableWiring (exp.getExporter ());
imp.setMatchingExport (null);
if (this.resolveImport (imp, false)) return true;
if (imp.isDynamic ()) return false;
imp.clearUnresolvableWirings ();
imp.setMatchingExport (exp);
var imports = importer.getImportPackages ();
for (var i = 0; i < imports.length; i++) {
if (imports[i].getMatchingExport () != null && imports[i].getMatchingExport ().getName ().equals (clash.getName ())) {
imports[i].addUnresolvableWiring (imports[i].getMatchingExport ().getExporter ());
importer.clearWires ();
var removed = importer.getExport (imports[i]);
if (removed != null) this.resolverExports.put (removed);
if (this.resolveBundle (importer)) return true;
return false;
}}
return false;
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.module.ResolverImport,org.eclipse.osgi.internal.module.ResolverExport");
Clazz.defineMethod (c$, "setBundleUnresolved", 
($fz = function (bundle, removed) {
if (bundle.getState () == 0) return ;
if (bundle.getBundle ().isResolved ()) {
this.resolverExports.remove (bundle.getExportPackages ());
bundle.initialize (false);
if (!removed) this.resolverExports.put (bundle.getExportPackages ());
}if (this.resolvingBundles != null) this.resolvingBundles.remove (bundle);
if (this.resolvedBundles != null) this.resolvedBundles.remove (bundle);
if (!removed) {
this.unresolvedBundles.add (bundle);
}bundle.detachAllFragments ();
bundle.setState (0);
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.module.ResolverBundle,~B");
Clazz.defineMethod (c$, "setBundleResolved", 
($fz = function (bundle) {
if (bundle.getState () == 2) return ;
this.resolvingBundles.remove (bundle);
this.unresolvedBundles.remove (bundle);
this.resolvedBundles.add (bundle);
bundle.setState (2);
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.module.ResolverBundle");
Clazz.defineMethod (c$, "setBundleResolving", 
($fz = function (bundle) {
if (bundle.getState () == 1) return ;
this.resolvedBundles.remove (bundle);
this.unresolvedBundles.remove (bundle);
this.resolvingBundles.add (bundle);
bundle.setState (1);
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.module.ResolverBundle");
Clazz.defineMethod (c$, "stateResolveBundles", 
($fz = function () {
for (var i = 0; i < this.resolvedBundles.size (); i++) {
var rb = this.resolvedBundles.get (i);
if (!rb.getBundle ().isResolved ()) {
this.stateResolveBundle (rb);
}}
this.resolverExports.reorder ();
this.resolverBundles.reorder ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "stateResolveConstraints", 
($fz = function (rb) {
var imports = rb.getImportPackages ();
for (var i = 0; i < imports.length; i++) {
var $export = imports[i].getMatchingExport ();
var supplier = $export == null ? null : $export.getExportPackageDescription ();
this.state.resolveConstraint (imports[i].getImportPackageSpecification (), supplier);
}
var requires = rb.getRequires ();
for (var i = 0; i < requires.length; i++) {
var bundle = requires[i].getMatchingBundle ();
var supplier = bundle == null ? null : bundle.getBundle ();
this.state.resolveConstraint (requires[i].getVersionConstraint (), supplier);
}
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.module.ResolverBundle");
Clazz.defineMethod (c$, "stateResolveBundle", 
($fz = function (rb) {
var exports = rb.getSelectedExports ();
var selectedExports =  new java.util.ArrayList (exports.length);
for (var i = 0; i < exports.length; i++) {
selectedExports.add (exports[i].getExportPackageDescription ());
}
var selectedExportsArray = selectedExports.toArray ( new Array (selectedExports.size ()));
var imports = rb.getImportPackages ();
var exportsWiredTo =  new java.util.ArrayList (imports.length);
for (var i = 0; i < imports.length; i++) {
if (imports[i].getMatchingExport () != null) {
exportsWiredTo.add (imports[i].getMatchingExport ().getExportPackageDescription ());
}}
var exportsWiredToArray = exportsWiredTo.toArray ( new Array (exportsWiredTo.size ()));
var requires = rb.getRequires ();
var bundlesWiredTo =  new java.util.ArrayList (requires.length);
for (var i = 0; i < requires.length; i++) if (requires[i].getMatchingBundle () != null) bundlesWiredTo.add (requires[i].getMatchingBundle ().getBundle ());

var bundlesWiredToArray = bundlesWiredTo.toArray ( new Array (bundlesWiredTo.size ()));
var hostBundles = null;
if (rb.isFragment ()) {
var matchingBundles = rb.getHost ().getMatchingBundles ();
if (matchingBundles != null && matchingBundles.length > 0) {
hostBundles =  new Array (matchingBundles.length);
for (var i = 0; i < matchingBundles.length; i++) {
hostBundles[i] = matchingBundles[i].getBundle ();
if (rb.isNewFragmentExports ()) {
var hostExports = matchingBundles[i].getSelectedExports ();
var hostExportsArray =  new Array (hostExports.length);
for (var j = 0; j < hostExports.length; j++) hostExportsArray[j] = hostExports[j].getExportPackageDescription ();

this.state.resolveBundle (hostBundles[i], true, null, hostExportsArray, hostBundles[i].getResolvedRequires (), hostBundles[i].getResolvedImports ());
}}
}}this.state.resolveBundle (rb.getBundle (), true, hostBundles, selectedExportsArray, bundlesWiredToArray, exportsWiredToArray);
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.module.ResolverBundle");
Clazz.overrideMethod (c$, "resolveDynamicImport", 
function (importingBundle, requestedPackage) {
if (this.state == null) throw  new IllegalStateException ("RESOLVER_NO_STATE");
if (!this.initialized) this.initialize ();
var rb = this.bundleMapping.get (importingBundle);
var resolverImports = rb.getImportPackages ();
var found = false;
for (var j = 0; j < resolverImports.length; j++) {
if (!"dynamic".equals (resolverImports[j].getImportPackageSpecification ().getDirective ("resolution"))) continue ;var importName = resolverImports[j].getName ();
if (importName.equals ("*") || (importName.endsWith (".*") && requestedPackage.startsWith (importName.substring (0, importName.length - 2)))) {
resolverImports[j].setName (requestedPackage);
}if (requestedPackage.equals (resolverImports[j].getName ())) {
found = true;
var resolved = this.resolveImport (resolverImports[j], true);
while (resolved && !this.checkDynamicGrouping (resolverImports[j])) {
resolved = this.resolveImport (resolverImports[j], true);
}
if (resolved) {
resolverImports[j].setName (null);
if (org.eclipse.osgi.internal.module.ResolverImpl.DEBUG_IMPORTS) org.eclipse.osgi.internal.module.ResolverImpl.log ("Resolved dynamic import: " + rb + ":" + resolverImports[j].getName () + " -> " + resolverImports[j].getMatchingExport ().getExporter () + ":" + requestedPackage);
var matchingExport = resolverImports[j].getMatchingExport ().getExportPackageDescription ();
if (importName.endsWith ("*")) {
resolverImports[j].setMatchingExport (null);
}return matchingExport;
}}resolverImports[j].setName (null);
}
if (!found) {
var directives =  new java.util.HashMap (1);
directives.put ("resolution", "dynamic");
var packageSpec = this.state.getFactory ().createImportPackageSpecification (requestedPackage, null, null, null, directives, null, importingBundle);
var newImport =  new org.eclipse.osgi.internal.module.ResolverImport (rb, packageSpec);
var resolved = this.resolveImport (newImport, true);
while (resolved && !this.checkDynamicGrouping (newImport)) resolved = this.resolveImport (newImport, true);

if (resolved) return newImport.getMatchingExport ().getExportPackageDescription ();
}if (org.eclipse.osgi.internal.module.ResolverImpl.DEBUG || org.eclipse.osgi.internal.module.ResolverImpl.DEBUG_IMPORTS) org.eclipse.osgi.internal.module.ResolverImpl.log ("Failed to resolve dynamic import: " + requestedPackage);
return null;
}, "org.eclipse.osgi.service.resolver.BundleDescription,~S");
Clazz.defineMethod (c$, "checkDynamicGrouping", 
($fz = function (imp) {
if (this.groupingChecker.isConsistent (imp, imp.getMatchingExport ()) != null) {
imp.addUnresolvableWiring (imp.getMatchingExport ().getExporter ());
imp.setMatchingExport (null);
if (org.eclipse.osgi.internal.module.ResolverImpl.DEBUG_GROUPING) org.eclipse.osgi.internal.module.ResolverImpl.log ("  Dynamic grouping failed: " + imp.getName ());
return false;
}return true;
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.module.ResolverImport");
Clazz.overrideMethod (c$, "bundleAdded", 
function (bundle) {
if (!this.initialized) return ;
var alreadyThere = false;
for (var i = 0; i < this.unresolvedBundles.size (); i++) {
var rb = this.unresolvedBundles.get (i);
if (rb.getBundle () === bundle) {
alreadyThere = true;
}}
if (!alreadyThere) {
var rb =  new org.eclipse.osgi.internal.module.ResolverBundle (bundle, this);
this.bundleMapping.put (bundle, rb);
this.unresolvedBundles.add (rb);
this.resolverExports.put (rb.getExportPackages ());
this.resolverBundles.put (rb);
}}, "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.overrideMethod (c$, "bundleRemoved", 
function (bundle, pending) {
if (pending) this.addRemovalPending (bundle);
if (!this.initialized) return ;
var rb = this.bundleMapping.get (bundle);
if (rb == null) return ;
if (!pending) {
this.bundleMapping.remove (bundle);
this.groupingChecker.removeAllExportConstraints (rb);
}this.unresolvedBundles.remove (rb);
this.resolverExports.remove (rb.getExportPackages ());
this.resolverBundles.remove (rb);
}, "org.eclipse.osgi.service.resolver.BundleDescription,~B");
Clazz.defineMethod (c$, "addRemovalPending", 
($fz = function (bundle) {
var id =  new Long (bundle.getBundleId ());
var removedBundles = this.removalPending.get (id);
if (removedBundles == null) {
removedBundles =  new java.util.ArrayList (1);
removedBundles.add (bundle);
this.removalPending.put (id, removedBundles);
} else {
removedBundles.add (bundle);
}}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.defineMethod (c$, "getRemovalPending", 
($fz = function (bundle) {
var id =  new Long (bundle.getBundleId ());
var removedBundles = this.removalPending.remove (id);
if (removedBundles == null) return null;
return removedBundles.toArray ( new Array (removedBundles.size ()));
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.defineMethod (c$, "unresolveBundle", 
($fz = function (bundle, removed) {
if (bundle == null) return ;
var removedBundles = null;
if ((removedBundles = this.getRemovalPending (bundle.getBundle ())) != null) {
for (var i = 0; i < removedBundles.length; i++) {
var re = this.bundleMapping.get (removedBundles[i]);
this.unresolveBundle (re, true);
this.state.removeBundleComplete (removedBundles[i]);
this.bundleMapping.remove (removedBundles[i]);
this.groupingChecker.removeAllExportConstraints (re);
if (removedBundles[i] === bundle.getBundle ()) removed = true;
}
}if (!bundle.getBundle ().isResolved ()) return ;
this.setBundleUnresolved (bundle, removed);
var dependents = bundle.getBundle ().getDependents ();
bundle.setState (0);
this.state.resolveBundle (bundle.getBundle (), false, null, null, null, null);
for (var i = 0; i < dependents.length; i++) {
this.unresolveBundle (this.bundleMapping.get (dependents[i]), false);
}
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.module.ResolverBundle,~B");
Clazz.overrideMethod (c$, "bundleUpdated", 
function (newDescription, existingDescription, pending) {
this.bundleRemoved (existingDescription, pending);
this.bundleAdded (newDescription);
}, "org.eclipse.osgi.service.resolver.BundleDescription,org.eclipse.osgi.service.resolver.BundleDescription,~B");
Clazz.overrideMethod (c$, "flush", 
function () {
this.resolverExports = null;
this.resolverBundles = null;
this.unresolvedBundles = null;
this.bundleMapping = null;
this.cyclicDependencies = null;
if (this.removalPending.size () > 0) {
var pending = this.getRemovalPending ();
for (var i = 0; i < pending.length; i++) this.state.removeBundleComplete (pending[i]);

}this.removalPending.clear ();
this.initialized = false;
});
Clazz.overrideMethod (c$, "getState", 
function () {
return this.state;
});
Clazz.overrideMethod (c$, "setState", 
function (newState) {
this.state = newState;
this.flush ();
}, "org.eclipse.osgi.service.resolver.State");
Clazz.defineMethod (c$, "getRemovalPending", 
($fz = function () {
if (this.removalPending.size () == 0) return  new Array (0);
var results =  new java.util.ArrayList (this.removalPending.size ());
var iter = this.removalPending.values ().iterator ();
while (iter.hasNext ()) {
var removedBundles = iter.next ();
results.addAll (removedBundles);
}
return results.toArray ( new Array (results.size ()));
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setDebugOptions", 
($fz = function () {
var options = org.eclipse.osgi.framework.debug.FrameworkDebugOptions.getDefault ();
if (options == null) return ;
($t$ = org.eclipse.osgi.internal.module.ResolverImpl.DEBUG = options.getBooleanOption ("org.eclipse.osgi/resolver/debug", false), org.eclipse.osgi.internal.module.ResolverImpl.prototype.DEBUG = org.eclipse.osgi.internal.module.ResolverImpl.DEBUG, $t$);
($t$ = org.eclipse.osgi.internal.module.ResolverImpl.DEBUG_WIRING = options.getBooleanOption ("org.eclipse.osgi/resolver/wiring", false), org.eclipse.osgi.internal.module.ResolverImpl.prototype.DEBUG_WIRING = org.eclipse.osgi.internal.module.ResolverImpl.DEBUG_WIRING, $t$);
($t$ = org.eclipse.osgi.internal.module.ResolverImpl.DEBUG_IMPORTS = options.getBooleanOption ("org.eclipse.osgi/resolver/imports", false), org.eclipse.osgi.internal.module.ResolverImpl.prototype.DEBUG_IMPORTS = org.eclipse.osgi.internal.module.ResolverImpl.DEBUG_IMPORTS, $t$);
($t$ = org.eclipse.osgi.internal.module.ResolverImpl.DEBUG_REQUIRES = options.getBooleanOption ("org.eclipse.osgi/resolver/requires", false), org.eclipse.osgi.internal.module.ResolverImpl.prototype.DEBUG_REQUIRES = org.eclipse.osgi.internal.module.ResolverImpl.DEBUG_REQUIRES, $t$);
($t$ = org.eclipse.osgi.internal.module.ResolverImpl.DEBUG_GROUPING = options.getBooleanOption ("org.eclipse.osgi/resolver/grouping", false), org.eclipse.osgi.internal.module.ResolverImpl.prototype.DEBUG_GROUPING = org.eclipse.osgi.internal.module.ResolverImpl.DEBUG_GROUPING, $t$);
($t$ = org.eclipse.osgi.internal.module.ResolverImpl.DEBUG_CYCLES = options.getBooleanOption ("org.eclipse.osgi/resolver/cycles", false), org.eclipse.osgi.internal.module.ResolverImpl.prototype.DEBUG_CYCLES = org.eclipse.osgi.internal.module.ResolverImpl.DEBUG_CYCLES, $t$);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "printWirings", 
($fz = function () {
for (var k = 0; k < this.resolvedBundles.size (); k++) {
var rb = this.resolvedBundles.get (k);
if (rb.getBundle ().isResolved ()) {
continue ;}org.eclipse.osgi.internal.module.ResolverImpl.log ("    * WIRING for " + rb);
var requireBundles = rb.getRequires ();
if (requireBundles.length == 0) {
org.eclipse.osgi.internal.module.ResolverImpl.log ("        (r) no requires");
} else {
for (var i = 0; i < requireBundles.length; i++) {
if (requireBundles[i].getMatchingBundle () == null) {
org.eclipse.osgi.internal.module.ResolverImpl.log ("        (r) " + rb.getBundle () + " -> NULL!!!");
} else {
org.eclipse.osgi.internal.module.ResolverImpl.log ("        (r) " + rb.getBundle () + " -> " + requireBundles[i].getMatchingBundle ());
}}
}var hostSpec = rb.getHost ();
if (hostSpec != null) {
var hosts = hostSpec.getMatchingBundles ();
if (hosts != null) for (var i = 0; i < hosts.length; i++) {
org.eclipse.osgi.internal.module.ResolverImpl.log ("        (h) " + rb.getBundle () + " -> " + hosts[i].getBundle ());
}
}var imports = rb.getImportPackages ();
if (imports.length == 0) {
org.eclipse.osgi.internal.module.ResolverImpl.log ("        (w) no imports");
continue ;}for (var i = 0; i < imports.length; i++) {
if (imports[i].isDynamic () && imports[i].getMatchingExport () == null) {
org.eclipse.osgi.internal.module.ResolverImpl.log ("        (w) " + imports[i].getBundle () + ":" + imports[i].getName () + " -> DYNAMIC");
} else if (imports[i].isOptional () && imports[i].getMatchingExport () == null) {
org.eclipse.osgi.internal.module.ResolverImpl.log ("        (w) " + imports[i].getBundle () + ":" + imports[i].getName () + " -> OPTIONAL (could not be wired)");
} else if (imports[i].getMatchingExport () == null) {
org.eclipse.osgi.internal.module.ResolverImpl.log ("        (w) " + imports[i].getBundle () + ":" + imports[i].getName () + " -> NULL!!!");
} else {
org.eclipse.osgi.internal.module.ResolverImpl.log ("        (w) " + imports[i].getBundle () + ":" + imports[i].getName () + " -> " + imports[i].getMatchingExport ().getExporter () + ":" + imports[i].getMatchingExport ().getName ());
}}
}
}, $fz.isPrivate = true, $fz));
c$.log = Clazz.defineMethod (c$, "log", 
function (message) {
org.eclipse.osgi.framework.debug.Debug.println (message);
}, "~S");
c$.RESOLVER = c$.prototype.RESOLVER = "org.eclipse.osgi/resolver";
c$.OPTION_DEBUG = c$.prototype.OPTION_DEBUG = "org.eclipse.osgi/resolver/debug";
c$.OPTION_WIRING = c$.prototype.OPTION_WIRING = "org.eclipse.osgi/resolver/wiring";
c$.OPTION_IMPORTS = c$.prototype.OPTION_IMPORTS = "org.eclipse.osgi/resolver/imports";
c$.OPTION_REQUIRES = c$.prototype.OPTION_REQUIRES = "org.eclipse.osgi/resolver/requires";
c$.OPTION_GROUPING = c$.prototype.OPTION_GROUPING = "org.eclipse.osgi/resolver/grouping";
c$.OPTION_CYCLES = c$.prototype.OPTION_CYCLES = "org.eclipse.osgi/resolver/cycles";
Clazz.defineStatics (c$,
"DEBUG", false,
"DEBUG_WIRING", false,
"DEBUG_IMPORTS", false,
"DEBUG_REQUIRES", false,
"DEBUG_GROUPING", false,
"DEBUG_CYCLES", false);
});
