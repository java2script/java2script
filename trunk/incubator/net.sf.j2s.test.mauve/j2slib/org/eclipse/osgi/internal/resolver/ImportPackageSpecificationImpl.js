Clazz.declarePackage ("org.eclipse.osgi.internal.resolver");
Clazz.load (["org.eclipse.osgi.internal.resolver.VersionConstraintImpl", "org.eclipse.osgi.service.resolver.ImportPackageSpecification"], "org.eclipse.osgi.internal.resolver.ImportPackageSpecificationImpl", ["java.util.HashMap", "org.eclipse.osgi.service.resolver.VersionRange"], function () {
c$ = Clazz.decorateAsClass (function () {
this.resolution = "static";
this.symbolicName = null;
this.bundleVersionRange = null;
this.attributes = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.internal.resolver, "ImportPackageSpecificationImpl", org.eclipse.osgi.internal.resolver.VersionConstraintImpl, org.eclipse.osgi.service.resolver.ImportPackageSpecification);
Clazz.overrideMethod (c$, "getDirectives", 
function () {
var result =  new java.util.HashMap (5);
if (this.resolution != null) result.put ("resolution", this.resolution);
return result;
});
Clazz.overrideMethod (c$, "getDirective", 
function (key) {
if (key.equals ("resolution")) return this.resolution;
return null;
}, "~S");
Clazz.defineMethod (c$, "setDirective", 
function (key, value) {
if (key.equals ("resolution")) return this.resolution = value;
return null;
}, "~S,~O");
Clazz.defineMethod (c$, "setDirectives", 
function (directives) {
if (directives == null) return ;
this.resolution = directives.get ("resolution");
}, "java.util.Map");
Clazz.overrideMethod (c$, "getBundleSymbolicName", 
function () {
return this.symbolicName;
});
Clazz.overrideMethod (c$, "getBundleVersionRange", 
function () {
if (this.bundleVersionRange == null) return org.eclipse.osgi.service.resolver.VersionRange.emptyRange;
return this.bundleVersionRange;
});
Clazz.overrideMethod (c$, "getAttributes", 
function () {
return this.attributes;
});
Clazz.overrideMethod (c$, "isSatisfiedBy", 
function (supplier) {
if (!(Clazz.instanceOf (supplier, org.eclipse.osgi.service.resolver.ExportPackageDescription))) return false;
var pkgDes = supplier;
var friends = pkgDes.getDirective ("x-friends");
var internal = pkgDes.getDirective ("x-internal");
if (internal.booleanValue () || friends != null) {
var strict = (this.getBundle ().getContainingState ()).inStrictMode ();
if (strict) {
if (internal.booleanValue ()) return false;
var found = false;
if (friends != null) for (var i = 0; i < friends.length; i++) if (this.getBundle ().getSymbolicName ().equals (friends[i])) found = true;

if (!found) return false;
}}var matchName = false;
if (this.symbolicName != null) {
var exporter = pkgDes.getExporter ();
if (!this.symbolicName.equals (exporter.getSymbolicName ())) return false;
if (this.getBundleVersionRange () != null && !this.getBundleVersionRange ().isIncluded (exporter.getVersion ())) return false;
}var name = this.getName ();
if ("*".equals (name) || "*".equals (pkgDes.getName ())) {
matchName = true;
} else if (name.endsWith (".*")) {
if (pkgDes.getName ().startsWith ((name.substring (0, name.length - 1)))) matchName = true;
} else if (pkgDes.getName ().equals (name)) {
matchName = true;
} else if (pkgDes.getName ().endsWith (".*")) {
if (name.startsWith ((pkgDes.getName ().substring (0, name.length - 1)))) matchName = true;
}if (!matchName) return false;
if (this.getVersionRange () != null && !this.getVersionRange ().isIncluded (pkgDes.getVersion ())) return false;
var importAttrs = this.getAttributes ();
if (importAttrs != null) {
var exportAttrs = pkgDes.getAttributes ();
if (exportAttrs == null) return false;
for (var i = importAttrs.keySet ().iterator (); i.hasNext (); ) {
var importKey = i.next ();
var importValue = importAttrs.get (importKey);
var exportValue = exportAttrs.get (importKey);
if (exportValue == null || !importValue.equals (exportValue)) return false;
}
}var mandatory = pkgDes.getDirective ("mandatory");
if (mandatory != null) {
for (var i = 0; i < mandatory.length; i++) {
if ("bundle-symbolic-name".equals (mandatory[i])) {
if (this.symbolicName == null) return false;
} else if ("bundle-version".equals (mandatory[i])) {
if (this.bundleVersionRange == null) return false;
} else if ("specification-version".equals (mandatory[i]) || "version".equals (mandatory[i])) {
if (this.getVersionRange () == null) return false;
} else {
if (importAttrs == null) return false;
if (importAttrs.get (mandatory[i]) == null) return false;
}}
}return true;
}, "org.eclipse.osgi.service.resolver.BaseDescription");
Clazz.defineMethod (c$, "setBundleSymbolicName", 
function (symbolicName) {
this.symbolicName = symbolicName;
}, "~S");
Clazz.defineMethod (c$, "setBundleVersionRange", 
function (bundleVersionRange) {
this.bundleVersionRange = bundleVersionRange;
}, "org.eclipse.osgi.service.resolver.VersionRange");
Clazz.defineMethod (c$, "setAttributes", 
function (attributes) {
this.attributes = attributes;
}, "java.util.Map");
Clazz.overrideMethod (c$, "toString", 
function () {
return "Import-Package: " + this.getName () + " - version: " + this.getVersionRange ();
});
Clazz.defineStatics (c$,
"ALL_PACKAGES", "*");
});
