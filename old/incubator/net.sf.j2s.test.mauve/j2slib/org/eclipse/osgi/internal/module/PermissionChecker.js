Clazz.declarePackage ("org.eclipse.osgi.internal.module");
Clazz.load (null, "org.eclipse.osgi.internal.module.PermissionChecker", ["org.osgi.framework.BundlePermission", "$.PackagePermission"], function () {
c$ = Clazz.decorateAsClass (function () {
this.context = null;
this.checkPermissions = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.internal.module, "PermissionChecker");
Clazz.makeConstructor (c$, 
function (context, checkPermissions) {
this.context = context;
this.checkPermissions = checkPermissions;
}, "org.osgi.framework.BundleContext,~B");
Clazz.defineMethod (c$, "checkImportPermission", 
function (ips, epd) {
if (!this.checkPermissions) return true;
var success = true;
var exporter = this.context.getBundle (epd.getExporter ().getBundleId ());
if (exporter != null && (exporter.getState () & 1) == 0) success = exporter.hasPermission ( new org.osgi.framework.PackagePermission (epd.getName (), "export"));
var importer = this.context.getBundle (ips.getBundle ().getBundleId ());
if (success && importer != null && (importer.getState () & 1) == 0) success = importer.hasPermission ( new org.osgi.framework.PackagePermission (ips.getName (), "import"));
return success;
}, "org.eclipse.osgi.service.resolver.ImportPackageSpecification,org.eclipse.osgi.service.resolver.ExportPackageDescription");
Clazz.defineMethod (c$, "checkBundlePermission", 
function (vc, bd) {
if (!this.checkPermissions) return true;
var success = true;
var requireBundle = Clazz.instanceOf (vc, org.eclipse.osgi.service.resolver.BundleSpecification);
var provider = this.context.getBundle (bd.getBundleId ());
if (provider != null && (provider.getState () & 1) == 0) success = provider.hasPermission ( new org.osgi.framework.BundlePermission (bd.getSymbolicName (), requireBundle ? "provide" : "host"));
var requirer = this.context.getBundle (vc.getBundle ().getBundleId ());
if (success && requirer != null && (requirer.getState () & 1) == 0) success = requirer.hasPermission ( new org.osgi.framework.BundlePermission (vc.getName (), requireBundle ? "require" : "fragment"));
return success;
}, "org.eclipse.osgi.service.resolver.VersionConstraint,org.eclipse.osgi.service.resolver.BundleDescription");
});
