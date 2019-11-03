Clazz.declarePackage ("org.eclipse.osgi.internal.module");
Clazz.load (["org.eclipse.osgi.internal.module.VersionSupplier", "java.util.ArrayList"], "org.eclipse.osgi.internal.module.ResolverBundle", ["java.lang.Long", "java.util.HashMap", "org.eclipse.osgi.internal.module.BundleConstraint", "$.ResolverExport", "$.ResolverImport"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bundle = null;
this.bundleID = null;
this.host = null;
this.imports = null;
this.exports = null;
this.requires = null;
this.fragments = null;
this.fragmentExports = null;
this.fragmentImports = null;
this.fragmentRequires = null;
this.resolvable = true;
this.state = 0;
this.cyclicDependencies = null;
this.resolver = null;
this.newFragmentExports = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.internal.module, "ResolverBundle", null, org.eclipse.osgi.internal.module.VersionSupplier);
Clazz.prepareFields (c$, function () {
this.cyclicDependencies =  new java.util.ArrayList ();
});
Clazz.makeConstructor (c$, 
function (bundle, resolver) {
this.bundle = bundle;
this.bundleID =  new Long (bundle.getBundleId ());
this.resolver = resolver;
this.initialize (bundle.isResolved ());
}, "org.eclipse.osgi.service.resolver.BundleDescription,org.eclipse.osgi.internal.module.ResolverImpl");
Clazz.defineMethod (c$, "initialize", 
function (useSelectedExports) {
if (this.bundle.getHost () != null) {
this.host =  new org.eclipse.osgi.internal.module.BundleConstraint (this, this.bundle.getHost ());
this.exports =  new Array (0);
this.imports =  new Array (0);
this.requires =  new Array (0);
return ;
}var actualImports = this.bundle.getImportPackages ();
var importList =  new java.util.ArrayList (actualImports.length);
for (var i = actualImports.length - 1; i >= 0; i--) {
if ("optional".equals (actualImports[i].getDirective ("resolution"))) {
importList.add ( new org.eclipse.osgi.internal.module.ResolverImport (this, actualImports[i]));
} else {
importList.add (0,  new org.eclipse.osgi.internal.module.ResolverImport (this, actualImports[i]));
}}
this.imports = importList.toArray ( new Array (importList.size ()));
var actualExports;
if (useSelectedExports) {
actualExports = this.bundle.getSelectedExports ();
} else {
actualExports = this.bundle.getExportPackages ();
}this.exports =  new Array (actualExports.length);
for (var i = 0; i < actualExports.length; i++) {
this.exports[i] =  new org.eclipse.osgi.internal.module.ResolverExport (this, actualExports[i]);
}
var actualRequires = this.bundle.getRequiredBundles ();
this.requires =  new Array (actualRequires.length);
for (var i = 0; i < this.requires.length; i++) this.requires[i] =  new org.eclipse.osgi.internal.module.BundleConstraint (this, actualRequires[i]);

this.fragments = null;
this.fragmentExports = null;
this.fragmentImports = null;
this.fragmentRequires = null;
}, "~B");
Clazz.defineMethod (c$, "isExported", 
function (exp) {
var exports = this.getExportPackages ();
for (var i = 0; i < exports.length; i++) {
if (exp === exports[i]) {
return true;
}}
return false;
}, "org.eclipse.osgi.internal.module.ResolverExport");
Clazz.defineMethod (c$, "getImport", 
function (exp) {
var imports = this.getImportPackages ();
for (var i = 0; i < imports.length; i++) {
if (exp.getName ().equals (imports[i].getName ())) {
return imports[i];
}}
return null;
}, "org.eclipse.osgi.internal.module.ResolverExport");
Clazz.defineMethod (c$, "getExport", 
function (imp) {
var exports = this.getExportPackages ();
for (var i = 0; i < exports.length; i++) {
if (imp.getName ().equals (exports[i].getName ()) && exports[i].getExportPackageDescription ().isRoot ()) {
return exports[i];
}}
return null;
}, "org.eclipse.osgi.internal.module.ResolverImport");
Clazz.defineMethod (c$, "getExport", 
function (name) {
var exports = this.getExportPackages ();
for (var i = 0; i < exports.length; i++) {
if (name.equals (exports[i].getName ())) {
return exports[i];
}}
return null;
}, "~S");
Clazz.defineMethod (c$, "isFullyWired", 
function () {
if (this.host != null && this.host.foundMatchingBundles ()) return false;
var imports = this.getImportPackages ();
for (var i = 0; i < imports.length; i++) {
if (imports[i].getMatchingExport () == null && !imports[i].isOptional () && !imports[i].isDynamic ()) {
return false;
}}
var requires = this.getRequires ();
for (var i = 0; i < requires.length; i++) if (requires[i].getMatchingBundle () == null && !requires[i].isOptional ()) return false;

return true;
});
Clazz.defineMethod (c$, "clearWires", 
function () {
var allImports = this.getImportPackages ();
for (var i = 0; i < allImports.length; i++) {
allImports[i].setMatchingExport (null);
}
if (this.host != null) this.host.removeAllMatchingBundles ();
var allRequires = this.getRequires ();
for (var i = 0; i < allRequires.length; i++) allRequires[i].setMatchingBundle (null);

});
Clazz.defineMethod (c$, "isResolved", 
function () {
return this.getState () == 2;
});
Clazz.defineMethod (c$, "isFragment", 
function () {
return this.host != null;
});
Clazz.defineMethod (c$, "getState", 
function () {
return this.state;
});
Clazz.defineMethod (c$, "setState", 
function (state) {
this.state = state;
}, "~N");
Clazz.defineMethod (c$, "getImportPackages", 
function () {
if (this.isFragment ()) return  new Array (0);
if (this.fragments == null || this.fragments.size () == 0) return this.imports;
var resultList =  new java.util.ArrayList (this.imports.length);
for (var i = 0; i < this.imports.length; i++) resultList.add (this.imports[i]);

for (var iter = this.fragments.iterator (); iter.hasNext (); ) {
var fragment = iter.next ();
var fragImports = this.fragmentImports.get (fragment.bundleID);
if (fragImports != null) resultList.addAll (fragImports);
}
return resultList.toArray ( new Array (resultList.size ()));
});
Clazz.defineMethod (c$, "getExportPackages", 
function () {
if (this.isFragment ()) return  new Array (0);
if (this.fragments == null || this.fragments.size () == 0) return this.exports;
var resultList =  new java.util.ArrayList (this.exports.length);
for (var i = 0; i < this.exports.length; i++) resultList.add (this.exports[i]);

for (var iter = this.fragments.iterator (); iter.hasNext (); ) {
var fragment = iter.next ();
var fragExports = this.fragmentExports.get (fragment.bundleID);
if (fragExports != null) resultList.addAll (fragExports);
}
return resultList.toArray ( new Array (resultList.size ()));
});
Clazz.defineMethod (c$, "getSelectedExports", 
function () {
var exports = this.getExportPackages ();
var removedList = null;
for (var i = 0; i < exports.length; i++) {
var imp = this.getImport (exports[i].getName ());
if (imp != null && imp.getMatchingExport () !== exports[i] && exports[i].getExportPackageDescription ().isRoot ()) {
if (removedList == null) removedList =  new java.util.ArrayList (1);
removedList.add (exports[i]);
}}
if (removedList == null) return exports;
var selectedExports =  new Array (exports.length - removedList.size ());
var removedExports = removedList.toArray ( new Array (removedList.size ()));
var index = 0;
for (var i = 0; i < exports.length; i++) {
var removed = false;
for (var j = 0; j < removedExports.length; j++) {
if (exports[i] === removedExports[j]) {
removed = true;
break;
}}
if (!removed) {
selectedExports[index] = exports[i];
index++;
}}
return selectedExports;
});
Clazz.defineMethod (c$, "getHost", 
function () {
return this.host;
});
Clazz.defineMethod (c$, "getRequires", 
function () {
if (this.isFragment ()) return  new Array (0);
if (this.fragments == null || this.fragments.size () == 0) return this.requires;
var resultList =  new java.util.ArrayList (this.requires.length);
for (var i = 0; i < this.requires.length; i++) resultList.add (this.requires[i]);

for (var iter = this.fragments.iterator (); iter.hasNext (); ) {
var fragment = iter.next ();
var fragRequires = this.fragmentRequires.get (fragment.bundleID);
if (fragRequires != null) resultList.addAll (fragRequires);
}
return resultList.toArray ( new Array (resultList.size ()));
});
Clazz.defineMethod (c$, "getRequire", 
function (name) {
var requires = this.getRequires ();
for (var i = 0; i < requires.length; i++) if (requires[i].getVersionConstraint ().getName ().equals (name)) return requires[i];

return null;
}, "~S");
Clazz.defineMethod (c$, "isDependentOnCycle", 
function () {
return this.cyclicDependencies.size () > 0;
});
Clazz.defineMethod (c$, "recordCyclicDependency", 
function (dependentOn) {
if (!this.cyclicDependencies.contains (dependentOn)) {
this.cyclicDependencies.add (dependentOn);
}}, "org.eclipse.osgi.internal.module.ResolverBundle");
Clazz.defineMethod (c$, "getCyclicDependencies", 
function () {
return this.cyclicDependencies;
});
Clazz.defineMethod (c$, "cyclicDependencyResolved", 
function (dependentOn) {
for (var i = 0; i < this.cyclicDependencies.size (); i++) {
if (dependentOn === this.cyclicDependencies.get (i)) {
this.cyclicDependencies.remove (i);
}}
return !this.isDependentOnCycle ();
}, "org.eclipse.osgi.internal.module.ResolverBundle");
Clazz.defineMethod (c$, "cyclicDependencyFailed", 
function (dependentOn) {
this.cyclicDependencies =  new java.util.ArrayList ();
this.detachAllFragments ();
var imports = this.getImportPackages ();
for (var i = 0; i < imports.length; i++) {
imports[i].clearUnresolvableWirings ();
}
}, "org.eclipse.osgi.internal.module.ResolverBundle");
Clazz.overrideMethod (c$, "getBundle", 
function () {
return this.bundle;
});
Clazz.defineMethod (c$, "getImport", 
function (name) {
var imports = this.getImportPackages ();
for (var i = 0; i < imports.length; i++) {
if (imports[i].getName ().equals (name)) {
return imports[i];
}}
return null;
}, "~S");
Clazz.overrideMethod (c$, "toString", 
function () {
return "[" + this.bundle + "]";
});
Clazz.overrideMethod (c$, "getVersion", 
function () {
return this.bundle.getVersion ();
});
Clazz.overrideMethod (c$, "getName", 
function () {
return this.bundle.getName ();
});
Clazz.defineMethod (c$, "initFragments", 
($fz = function () {
if (this.fragments == null) this.fragments =  new java.util.ArrayList (1);
if (this.fragmentExports == null) this.fragmentExports =  new java.util.HashMap (1);
if (this.fragmentImports == null) this.fragmentImports =  new java.util.HashMap (1);
if (this.fragmentRequires == null) this.fragmentRequires =  new java.util.HashMap (1);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "isImported", 
($fz = function (packageName) {
var imports = this.getImportPackages ();
for (var i = 0; i < imports.length; i++) if (packageName.equals (imports[i].getName ())) return true;

return false;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "isExported", 
($fz = function (packageName) {
var exports = this.getExportPackages ();
for (var i = 0; i < exports.length; i++) if (packageName.equals (exports[i].getName ())) return true;

return false;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "isRequired", 
($fz = function (bundleName) {
var requires = this.getRequires ();
for (var i = 0; i < requires.length; i++) if (bundleName.equals (requires[i].getVersionConstraint ().getName ())) return true;

return false;
}, $fz.isPrivate = true, $fz), "~S");
Clazz.defineMethod (c$, "attachFragment", 
function (fragment, addExports) {
if (this.isFragment ()) return  new Array (0);
if (!this.bundle.attachFragments () || (this.isResolved () && !this.bundle.dynamicFragments ())) return  new Array (0);
if (fragment.getHost ().getMatchingBundles () != null && !(fragment.getHost ().getVersionConstraint ()).isMultiHost ()) return  new Array (0);
var newImports = fragment.getBundle ().getImportPackages ();
var newRequires = fragment.getBundle ().getRequiredBundles ();
var newExports = fragment.getBundle ().getExportPackages ();
if (this.constraintsConflict (newImports, newRequires)) return  new Array (0);
if (this.isResolved () && newExports.length > 0) fragment.setNewFragmentExports (true);
this.initFragments ();
if (this.fragments.contains (fragment)) return  new Array (0);
this.fragments.add (fragment);
fragment.getHost ().addMatchingBundle (this);
if (newImports.length > 0) {
var hostImports =  new java.util.ArrayList (newImports.length);
for (var i = 0; i < newImports.length; i++) if (!this.isImported (newImports[i].getName ())) hostImports.add ( new org.eclipse.osgi.internal.module.ResolverImport (this, newImports[i]));

this.fragmentImports.put (fragment.bundleID, hostImports);
}if (newRequires.length > 0) {
var hostRequires =  new java.util.ArrayList (newRequires.length);
for (var i = 0; i < newRequires.length; i++) if (!this.isRequired (newRequires[i].getName ())) hostRequires.add ( new org.eclipse.osgi.internal.module.BundleConstraint (this, newRequires[i]));

this.fragmentRequires.put (fragment.bundleID, hostRequires);
}var hostExports =  new java.util.ArrayList (newExports.length);
if (newExports.length > 0 && addExports) {
var factory = this.resolver.getState ().getFactory ();
for (var i = 0; i < newExports.length; i++) {
if (!this.isExported (newExports[i].getName ())) {
var hostExport = factory.createExportPackageDescription (newExports[i].getName (), newExports[i].getVersion (), newExports[i].getDirectives (), newExports[i].getAttributes (), newExports[i].isRoot (), this.bundle);
hostExports.add ( new org.eclipse.osgi.internal.module.ResolverExport (this, hostExport));
}}
this.fragmentExports.put (fragment.bundleID, hostExports);
}return hostExports.toArray ( new Array (hostExports.size ()));
}, "org.eclipse.osgi.internal.module.ResolverBundle,~B");
Clazz.defineMethod (c$, "constraintsConflict", 
($fz = function (newImports, newRequires) {
for (var i = 0; i < newImports.length; i++) {
var importPkg = this.getImport (newImports[i].getName ());
if (importPkg == null && this.isResolved ()) return true;
if (importPkg != null && !newImports[i].getVersionRange ().equals (importPkg.getImportPackageSpecification ().getVersionRange ())) return true;
}
for (var i = 0; i < newRequires.length; i++) {
var constraint = this.getRequire (newRequires[i].getName ());
if (constraint == null && this.isResolved ()) return true;
if (constraint != null && !newRequires[i].getVersionRange ().equals (constraint.getVersionConstraint ().getVersionRange ())) return true;
}
return false;
}, $fz.isPrivate = true, $fz), "~A,~A");
Clazz.defineMethod (c$, "setNewFragmentExports", 
($fz = function (newFragmentExports) {
this.newFragmentExports = newFragmentExports;
}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineMethod (c$, "isNewFragmentExports", 
function () {
return this.newFragmentExports;
});
Clazz.defineMethod (c$, "detachFragment", 
function (fragment) {
if (this.isFragment ()) return  new Array (0);
this.initFragments ();
if (!this.fragments.remove (fragment)) return  new Array (0);
fragment.getHost ().removeMatchingBundle (this);
this.fragmentImports.remove (fragment.bundleID);
this.fragmentRequires.remove (fragment.bundleID);
var removedExports = this.fragmentExports.remove (fragment.bundleID);
return removedExports == null ?  new Array (0) : removedExports.toArray ( new Array (removedExports.size ()));
}, "org.eclipse.osgi.internal.module.ResolverBundle");
Clazz.defineMethod (c$, "detachAllFragments", 
function () {
if (this.fragments == null) return ;
var allFragments = this.fragments.toArray ( new Array (this.fragments.size ()));
for (var i = 0; i < allFragments.length; i++) this.detachFragment (allFragments[i]);

});
Clazz.defineMethod (c$, "isDependentOnUnresolvedFragment", 
function (dependent) {
var imports = dependent.getImportPackages ();
for (var i = 0; i < imports.length; i++) {
var exp = imports[i].getMatchingExport ();
if (exp == null || exp.getExporter () !== this) continue ;if (!this.isExported (exp)) return true;
}
return false;
}, "org.eclipse.osgi.internal.module.ResolverBundle");
Clazz.defineMethod (c$, "isResolvable", 
function () {
return this.resolvable;
});
Clazz.defineMethod (c$, "setResolvable", 
function (resolvable) {
this.resolvable = resolvable;
}, "~B");
Clazz.defineMethod (c$, "addExport", 
function (re) {
var newExports =  new Array (this.exports.length + 1);
for (var i = 0; i < this.exports.length; i++) {
newExports[i] = this.exports[i];
}
newExports[this.exports.length] = re;
this.exports = newExports;
}, "org.eclipse.osgi.internal.module.ResolverExport");
Clazz.defineMethod (c$, "getResolver", 
function () {
return this.resolver;
});
Clazz.defineStatics (c$,
"UNRESOLVED", 0,
"RESOLVING", 1,
"RESOLVED", 2);
});
