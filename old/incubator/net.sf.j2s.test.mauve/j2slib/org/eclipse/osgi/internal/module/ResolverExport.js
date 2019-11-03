Clazz.declarePackage ("org.eclipse.osgi.internal.module");
Clazz.load (["org.eclipse.osgi.internal.module.VersionSupplier"], "org.eclipse.osgi.internal.module.ResolverExport", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.exporter = null;
this.exportPackageDescription = null;
this.reprovide = false;
this.dropped = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.internal.module, "ResolverExport", null, org.eclipse.osgi.internal.module.VersionSupplier);
Clazz.makeConstructor (c$, 
function (bundle, $export) {
this.exporter = bundle;
this.exportPackageDescription = $export;
}, "org.eclipse.osgi.internal.module.ResolverBundle,org.eclipse.osgi.service.resolver.ExportPackageDescription");
Clazz.makeConstructor (c$, 
function (bundle, $export, reprovide) {
this.construct (bundle, $export);
this.reprovide = reprovide;
}, "org.eclipse.osgi.internal.module.ResolverBundle,org.eclipse.osgi.service.resolver.ExportPackageDescription,~B");
Clazz.overrideMethod (c$, "getName", 
function () {
return this.exportPackageDescription.getName ();
});
Clazz.overrideMethod (c$, "getVersion", 
function () {
return this.exportPackageDescription.getVersion ();
});
Clazz.overrideMethod (c$, "getBundle", 
function () {
return this.exportPackageDescription.getExporter ();
});
Clazz.defineMethod (c$, "getExporter", 
function () {
return this.exporter;
});
Clazz.defineMethod (c$, "getExportPackageDescription", 
function () {
return this.exportPackageDescription;
});
Clazz.defineMethod (c$, "getRoot", 
function () {
var ri;
var re = this;
while (re != null && !re.getExportPackageDescription ().isRoot ()) {
var root = null;
var reExporter = re.getExporter ();
ri = reExporter.getImport (re.getName ());
if (ri != null) root = ri.getMatchingExport ();
 else root = org.eclipse.osgi.internal.module.ResolverExport.getRootRequires (re, reExporter);
if (root == null || root === re || root === this) return null;
re = root;
}
return re;
});
c$.getRootRequires = Clazz.defineMethod (c$, "getRootRequires", 
function (re, reExporter) {
var requires = reExporter.getRequires ();
for (var i = 0; i < requires.length; i++) {
if (requires[i].getMatchingBundle () == null) continue ;var exports = requires[i].getMatchingBundle ().getExportPackages ();
for (var j = 0; j < exports.length; j++) {
if (re.getName ().equals (exports[j].getName ())) {
return exports[j];
}}
re = org.eclipse.osgi.internal.module.ResolverExport.getRootRequires (re, requires[i].getMatchingBundle ());
if (re.getExportPackageDescription ().isRoot ()) return re;
}
return re;
}, "org.eclipse.osgi.internal.module.ResolverExport,org.eclipse.osgi.internal.module.ResolverBundle");
c$.isOnRootPath = Clazz.defineMethod (c$, "isOnRootPath", 
function (rb, re) {
var ri;
if (re.getExporter () === rb) return true;
while (re != null && !re.getExportPackageDescription ().isRoot ()) {
var reExporter = re.getExporter ();
ri = reExporter.getImport (re.getName ());
if (ri != null) {
re = ri.getMatchingExport ();
if (re.getExporter () === rb) return true;
continue ;}re = org.eclipse.osgi.internal.module.ResolverExport.getRootRequires (re, reExporter);
if (re.getExporter () === rb) return true;
}
return false;
}, "org.eclipse.osgi.internal.module.ResolverBundle,org.eclipse.osgi.internal.module.ResolverExport");
Clazz.defineMethod (c$, "isReprovide", 
function () {
return this.reprovide;
});
Clazz.defineMethod (c$, "toString", 
function () {
return this.exportPackageDescription.toString ();
});
Clazz.defineMethod (c$, "isDropped", 
function () {
return this.dropped;
});
Clazz.defineMethod (c$, "setDropped", 
function (dropped) {
this.dropped = dropped;
}, "~B");
});
