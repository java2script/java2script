Clazz.declarePackage ("org.eclipse.osgi.internal.module");
Clazz.load (["java.util.ArrayList"], "org.eclipse.osgi.internal.module.ResolverImport", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.importPackageSpecification = null;
this.matchingExport = null;
this.bundle = null;
this.unresolvableWirings = null;
this.name = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.internal.module, "ResolverImport");
Clazz.prepareFields (c$, function () {
this.unresolvableWirings =  new java.util.ArrayList ();
});
Clazz.makeConstructor (c$, 
function (bundle, ips) {
this.bundle = bundle;
this.importPackageSpecification = ips;
}, "org.eclipse.osgi.internal.module.ResolverBundle,org.eclipse.osgi.service.resolver.ImportPackageSpecification");
Clazz.defineMethod (c$, "isFromFragment", 
function () {
return this.importPackageSpecification.getBundle ().getHost () != null;
});
Clazz.defineMethod (c$, "getName", 
function () {
if (this.name != null) {
return this.name;
} else {
return this.importPackageSpecification.getName ();
}});
Clazz.defineMethod (c$, "setName", 
function (name) {
this.name = name;
}, "~S");
Clazz.defineMethod (c$, "getBundle", 
function () {
return this.bundle;
});
Clazz.defineMethod (c$, "getActualBundle", 
function () {
return this.bundle.getBundle ();
});
Clazz.defineMethod (c$, "isSatisfiedBy", 
function (re) {
if (!this.bundle.getResolver ().getPermissionChecker ().checkImportPermission (this.importPackageSpecification, re.getExportPackageDescription ())) return false;
if (!this.importPackageSpecification.isSatisfiedBy (re.getExportPackageDescription ())) {
return false;
}return true;
}, "org.eclipse.osgi.internal.module.ResolverExport");
Clazz.defineMethod (c$, "getMatchingExport", 
function () {
return this.matchingExport;
});
Clazz.defineMethod (c$, "setMatchingExport", 
function (matchingExport) {
this.matchingExport = matchingExport;
}, "org.eclipse.osgi.internal.module.ResolverExport");
Clazz.defineMethod (c$, "isOnRootPathSplit", 
function (bundle, toFind) {
if (bundle == null) return false;
var requires = bundle.getRequires ();
for (var i = 0; i < requires.length; i++) {
if (requires[i].getMatchingBundle () === toFind) return true;
if (this.isOnRootPathSplit (requires[i].getMatchingBundle (), toFind)) return true;
}
return false;
}, "org.eclipse.osgi.internal.module.ResolverBundle,org.eclipse.osgi.internal.module.ResolverBundle");
Clazz.defineMethod (c$, "addUnresolvableWiring", 
function (module) {
this.unresolvableWirings.add (module);
}, "org.eclipse.osgi.internal.module.ResolverBundle");
Clazz.defineMethod (c$, "removeUnresolvableWiring", 
function (module) {
this.unresolvableWirings.remove (module);
}, "org.eclipse.osgi.internal.module.ResolverBundle");
Clazz.defineMethod (c$, "clearUnresolvableWirings", 
function () {
this.unresolvableWirings =  new java.util.ArrayList ();
});
Clazz.defineMethod (c$, "isNotAnUnresolvableWiring", 
function (exp) {
return !this.unresolvableWirings.contains (exp.getExporter ());
}, "org.eclipse.osgi.internal.module.ResolverExport");
Clazz.defineMethod (c$, "getImportPackageSpecification", 
function () {
return this.importPackageSpecification;
});
Clazz.defineMethod (c$, "isOptional", 
function () {
return "optional".equals (this.importPackageSpecification.getDirective ("resolution"));
});
Clazz.defineMethod (c$, "isDynamic", 
function () {
return "dynamic".equals (this.importPackageSpecification.getDirective ("resolution"));
});
Clazz.defineMethod (c$, "toString", 
function () {
return this.importPackageSpecification.toString ();
});
});
