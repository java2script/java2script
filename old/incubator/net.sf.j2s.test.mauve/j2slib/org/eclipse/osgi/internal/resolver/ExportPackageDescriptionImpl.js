Clazz.declarePackage ("org.eclipse.osgi.internal.resolver");
Clazz.load (["org.eclipse.osgi.internal.resolver.BaseDescriptionImpl", "org.eclipse.osgi.service.resolver.ExportPackageDescription", "java.lang.Boolean"], "org.eclipse.osgi.internal.resolver.ExportPackageDescriptionImpl", ["java.util.HashMap"], function () {
c$ = Clazz.decorateAsClass (function () {
this.uses = null;
this.attributes = null;
this.exporter = null;
this.exclude = null;
this.include = null;
this.friends = null;
this.mandatory = null;
this.internal = null;
this.root = false;
this.tableIndex = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.internal.resolver, "ExportPackageDescriptionImpl", org.eclipse.osgi.internal.resolver.BaseDescriptionImpl, org.eclipse.osgi.service.resolver.ExportPackageDescription);
Clazz.prepareFields (c$, function () {
this.internal = Boolean.FALSE;
});
Clazz.overrideMethod (c$, "getDirectives", 
function () {
var result =  new java.util.HashMap (5);
if (this.uses != null) result.put ("uses", this.uses);
if (this.exclude != null) result.put ("exclude", this.exclude);
if (this.include != null) result.put ("include", this.include);
if (this.mandatory != null) result.put ("mandatory", this.mandatory);
if (this.friends != null) result.put ("x-friends", this.friends);
result.put ("x-internal", this.internal);
return result;
});
Clazz.overrideMethod (c$, "getDirective", 
function (key) {
if (key.equals ("uses")) return this.uses;
if (key.equals ("exclude")) return this.exclude;
if (key.equals ("include")) return this.include;
if (key.equals ("mandatory")) return this.mandatory;
if (key.equals ("x-friends")) return this.friends;
if (key.equals ("x-internal")) return this.internal;
return null;
}, "~S");
Clazz.defineMethod (c$, "setDirective", 
function (key, value) {
if (key.equals ("uses")) return this.uses = value;
if (key.equals ("exclude")) return this.exclude = value;
if (key.equals ("include")) return this.include = value;
if (key.equals ("mandatory")) return this.mandatory = value;
if (key.equals ("x-friends")) return this.friends = value;
if (key.equals ("x-internal")) return this.internal = value;
return null;
}, "~S,~O");
Clazz.defineMethod (c$, "setDirectives", 
function (directives) {
if (directives == null) return ;
this.uses = directives.get ("uses");
this.exclude = directives.get ("exclude");
this.include = directives.get ("include");
this.mandatory = directives.get ("mandatory");
this.friends = directives.get ("x-friends");
this.internal = directives.get ("x-internal");
}, "java.util.Map");
Clazz.overrideMethod (c$, "getAttributes", 
function () {
return this.attributes;
});
Clazz.overrideMethod (c$, "getExporter", 
function () {
return this.exporter;
});
Clazz.overrideMethod (c$, "isRoot", 
function () {
return this.root;
});
Clazz.defineMethod (c$, "setAttributes", 
function (attributes) {
this.attributes = attributes;
}, "java.util.Map");
Clazz.defineMethod (c$, "setExporter", 
function (exporter) {
this.exporter = exporter;
}, "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.defineMethod (c$, "setRoot", 
function (root) {
this.root = root;
}, "~B");
Clazz.overrideMethod (c$, "toString", 
function () {
return "Export-Package: " + this.getName () + "; version=\"" + this.getVersion () + "\"";
});
Clazz.defineMethod (c$, "getTableIndex", 
function () {
return this.tableIndex;
});
Clazz.defineMethod (c$, "setTableIndex", 
function (tableIndex) {
this.tableIndex = tableIndex;
}, "~N");
});
