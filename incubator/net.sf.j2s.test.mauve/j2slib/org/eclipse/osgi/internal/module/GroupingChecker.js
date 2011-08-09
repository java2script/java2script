Clazz.declarePackage ("org.eclipse.osgi.internal.module");
Clazz.load (["java.util.HashMap"], "org.eclipse.osgi.internal.module.GroupingChecker", ["java.util.ArrayList", "org.eclipse.osgi.internal.module.ResolverExport"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bundles = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.internal.module, "GroupingChecker");
Clazz.prepareFields (c$, function () {
this.bundles =  new java.util.HashMap ();
});
Clazz.defineMethod (c$, "getConstraints", 
($fz = function (constrained) {
var exports = this.bundles.get (constrained.getExporter ());
if (exports == null) return null;
var constraints = exports.get (constrained);
if (constraints == null) return null;
var results =  new java.util.ArrayList (constraints.size ());
for (var iter = constraints.iterator (); iter.hasNext (); ) {
var constraint = iter.next ();
if (Clazz.instanceOf (constraint, org.eclipse.osgi.internal.module.ResolverExport) && !results.contains (constraint)) results.add (constraint);
 else {
var imp = constraint;
if (imp.getMatchingExport () != null) {
var impConstraint = imp.getMatchingExport ().getRoot ();
if (impConstraint != null && !results.contains (impConstraint)) results.add (impConstraint);
}}}
return results;
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.module.ResolverExport");
Clazz.defineMethod (c$, "createConstraints", 
($fz = function (constrained) {
var exports = this.bundles.get (constrained.getExporter ());
if (exports == null) {
exports =  new java.util.HashMap ();
this.bundles.put (constrained.getExporter (), exports);
}var constraints = exports.get (constrained);
if (constraints == null) {
constraints =  new java.util.ArrayList ();
exports.put (constrained, constraints);
}return constraints;
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.module.ResolverExport");
Clazz.defineMethod (c$, "addConstraint", 
($fz = function (constrained, constraint) {
var list = this.createConstraints (constrained);
if (!list.contains (constraint)) list.add (constraint);
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.module.ResolverExport,~O");
Clazz.defineMethod (c$, "addConstraints", 
($fz = function (constrained, newConstraints) {
var list = this.createConstraints (constrained);
for (var i = 0; i < newConstraints.size (); i++) {
var constraint = newConstraints.get (i);
if (!list.contains (constraint)) list.add (constraint);
}
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.module.ResolverExport,java.util.ArrayList");
Clazz.defineMethod (c$, "removeAllExportConstraints", 
function (bundle) {
this.bundles.remove (bundle);
}, "org.eclipse.osgi.internal.module.ResolverBundle");
Clazz.defineMethod (c$, "isConsistent", 
function (imp, exp) {
var imports = imp.getBundle ().getImportPackages ();
var requires = imp.getBundle ().getRequires ();
for (var i = 0; i < imports.length; i++) {
var wire = imports[i].getMatchingExport ();
if (wire == null) continue ;var list = this.getConstraints (wire);
if (list != null) {
for (var j = 0; j < list.size (); j++) {
var re = list.get (j);
if (re.isDropped ()) continue ;if (re.getExporter ().isResolvable () && exp.getName ().equals (re.getName ()) && !org.eclipse.osgi.internal.module.ResolverExport.isOnRootPath (re.getExporter (), imp.getMatchingExport ()) && !imp.isOnRootPathSplit (imp.getMatchingExport ().getExporter (), re.getExporter ())) return wire;
}
}list = this.getConstraints (exp);
if (list != null) {
for (var j = 0; j < list.size (); j++) {
var re = list.get (j);
if (re.isDropped ()) continue ;if (re.getExporter ().isResolvable () && wire.getName ().equals (re.getName ()) && !org.eclipse.osgi.internal.module.ResolverExport.isOnRootPath (re.getExporter (), imports[i].getMatchingExport ()) && !imp.isOnRootPathSplit (imp.getMatchingExport ().getExporter (), re.getExporter ())) return wire;
for (var k = 0; k < requires.length; k++) {
if (requires[k].getMatchingBundle () == null) continue ;var exports = requires[k].getMatchingBundle ().getExportPackages ();
for (var m = 0; m < exports.length; m++) {
if (re.getExporter ().isResolvable () && exports[m].getName ().equals (re.getName ()) && !org.eclipse.osgi.internal.module.ResolverExport.isOnRootPath (re.getExporter (), exports[m])) return re;
}
}
}
}}
for (var i = 0; i < requires.length; i++) {
if (requires[i].getMatchingBundle () == null) continue ;var exports = requires[i].getMatchingBundle ().getExportPackages ();
for (var j = 0; j < exports.length; j++) {
var list = this.getConstraints (exports[j]);
if (list != null) {
for (var k = 0; k < list.size (); k++) {
var re = list.get (k);
if (re.getExporter ().isResolvable () && exp.getName ().equals (re.getName ()) && !org.eclipse.osgi.internal.module.ResolverExport.isOnRootPath (re.getExporter (), imp.getMatchingExport ())) return re;
}
}}
}
return null;
}, "org.eclipse.osgi.internal.module.ResolverImport,org.eclipse.osgi.internal.module.ResolverExport");
Clazz.defineMethod (c$, "checkRequiresConstraints", 
function (bundle) {
var requires = bundle.getRequires ();
if (requires == null) return true;
for (var i = 0; i < requires.length; i++) {
var matchingBundle = requires[i].getMatchingBundle ();
if (matchingBundle == null) continue ;var exports = matchingBundle.getExportPackages ();
for (var j = 0; j < exports.length; j++) {
var list = this.getConstraints (exports[j]);
if (list == null) continue ;for (var k = 0; k < list.size (); k++) {
var constraint = list.get (k);
var foundPotential = false;
var found = false;
for (var m = 0; m < requires.length; m++) {
if (requires[m].getMatchingBundle () == null) continue ;var exps = requires[m].getMatchingBundle ().getExportPackages ();
for (var n = 0; n < exps.length; n++) {
if (constraint.getExporter ().isResolvable () && constraint.getName ().equals (exps[n].getName ())) {
foundPotential = true;
if (exps[n] === constraint || org.eclipse.osgi.internal.module.ResolverExport.isOnRootPath (constraint.getExporter (), exps[n])) {
found = true;
break;
}}}
if (found) break;
}
if (foundPotential && !found) {
return false;
}}
}
}
return true;
}, "org.eclipse.osgi.internal.module.ResolverBundle");
Clazz.defineMethod (c$, "addInitialGroupingConstraints", 
function (initBundles) {
for (var i = 0; i < initBundles.length; i++) {
if (this.bundles.containsKey (initBundles[i])) continue ;var exports = initBundles[i].getExportPackages ();
for (var j = 0; j < exports.length; j++) {
var uses = exports[j].getExportPackageDescription ().getDirective ("uses");
if (uses == null) continue ;for (var k = 0; k < uses.length; k++) {
var constraint = initBundles[i].getExport (uses[k]);
if (constraint != null) {
this.addConstraint (exports[j], constraint);
this.addTransitiveGroupingConstraints (exports[j], constraint);
}constraint = initBundles[i].getImport (uses[k]);
if (constraint != null) this.addConstraint (exports[j], constraint);
}
}
if (this.bundles.get (initBundles[i]) == null) this.bundles.put (initBundles[i], null);
}
}, "~A");
Clazz.defineMethod (c$, "addTransitiveGroupingConstraints", 
($fz = function ($export, constraint) {
if ($export === constraint) return ;
var uses = constraint.getExportPackageDescription ().getDirective ("uses");
if (uses == null) return ;
for (var i = 0; i < uses.length; i++) {
var newConstraint = $export.getExporter ().getExport (uses[i]);
if (newConstraint == null) newConstraint = $export.getExporter ().getImport (uses[i]);
if (newConstraint == null || newConstraint === constraint) continue ;var list = this.getConstraints ($export);
if (list != null && list.contains (newConstraint)) continue ;this.addConstraint ($export, newConstraint);
if (Clazz.instanceOf (newConstraint, org.eclipse.osgi.internal.module.ResolverExport)) this.addTransitiveGroupingConstraints ($export, newConstraint);
}
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.internal.module.ResolverExport,org.eclipse.osgi.internal.module.ResolverExport");
Clazz.defineMethod (c$, "addReExportConstraints", 
function (bundle) {
var exports = bundle.getExportPackages ();
for (var i = 0; i < exports.length; i++) {
if (exports[i].getExportPackageDescription ().isRoot ()) continue ;var root = exports[i].getRoot ();
if (root == null) continue ;var list = this.getConstraints (root);
if (list == null) continue ;this.addConstraints (exports[i], list);
}
}, "org.eclipse.osgi.internal.module.ResolverBundle");
Clazz.defineMethod (c$, "addRequireConstraints", 
function (exports, bundle) {
var requires = bundle.getRequires ();
for (var i = 0; i < exports.length; i++) {
if (exports[i].getExportPackageDescription ().isRoot ()) continue ;for (var j = 0; j < requires.length; j++) {
if (requires[j].getMatchingBundle () == null || exports[i].getExporter () === requires[j].getMatchingBundle ()) continue ;var requireExports = requires[j].getMatchingBundle ().getExportPackages ();
for (var k = 0; k < requireExports.length; k++) {
if (!exports[i].getName ().equals (requireExports[k].getName ())) continue ;var list = this.getConstraints (requireExports[k]);
if (list == null) continue ;for (var m = 0; m < list.size (); m++) {
this.addConstraint (exports[i], list.get (m));
}
}
}
}
}, "~A,org.eclipse.osgi.internal.module.ResolverBundle");
Clazz.defineMethod (c$, "addReprovideConstraints", 
function (re) {
var requires = re.getExporter ().getRequires ();
for (var i = 0; i < requires.length; i++) {
if (requires[i].getMatchingBundle () == null) return ;
var requireExports = requires[i].getMatchingBundle ().getExportPackages ();
for (var j = 0; j < requireExports.length; j++) {
if (!re.getName ().equals (requireExports[j].getName ())) continue ;var list = this.getConstraints (requireExports[j]);
if (list == null) continue ;for (var k = 0; k < list.size (); k++) {
this.addConstraint (re, list.get (k));
}
}
}
}, "org.eclipse.osgi.internal.module.ResolverExport");
});
