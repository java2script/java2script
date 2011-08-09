Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.osgi.service.packageadmin.ExportedPackage"], "org.eclipse.osgi.framework.internal.core.ExportedPackageImpl", ["java.lang.StringBuffer", "java.util.ArrayList"], function () {
c$ = Clazz.decorateAsClass (function () {
this.specVersion = null;
this.exportedPackage = null;
this.supplier = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "ExportedPackageImpl", null, org.osgi.service.packageadmin.ExportedPackage);
Clazz.makeConstructor (c$, 
function (exportedPackage, supplier) {
this.exportedPackage = exportedPackage;
this.supplier = supplier;
var version = exportedPackage.getVersion ();
if (version != null) this.specVersion = version.toString ();
}, "org.eclipse.osgi.service.resolver.ExportPackageDescription,org.eclipse.osgi.framework.internal.core.BundleLoaderProxy");
Clazz.overrideMethod (c$, "getName", 
function () {
return this.exportedPackage.getName ();
});
Clazz.overrideMethod (c$, "getExportingBundle", 
function () {
if (this.supplier.isStale ()) return null;
return this.supplier.getBundleHost ();
});
Clazz.overrideMethod (c$, "getImportingBundles", 
function () {
if (this.supplier.isStale ()) return null;
var bundle = this.getExportingBundle ();
if (bundle == null) return null;
var bundles = bundle.framework.getAllBundles ();
var importers =  new java.util.ArrayList (10);
var supplierSource = this.supplier.createPackageSource (this.exportedPackage, false);
for (var i = 0; i < bundles.length; i++) {
if (!(Clazz.instanceOf (bundles[i], org.eclipse.osgi.framework.internal.core.BundleHost))) continue ;var loader = (bundles[i]).getBundleLoader ();
if (loader == null) continue ;var importerSource = loader.getPackageSource (this.getName ());
if (supplierSource != null && supplierSource.hasCommonSource (importerSource)) importers.add (bundles[i]);
}
return importers.toArray ( new Array (importers.size ()));
});
Clazz.overrideMethod (c$, "getSpecificationVersion", 
function () {
return this.specVersion;
});
Clazz.overrideMethod (c$, "getVersion", 
function () {
return this.exportedPackage.getVersion ();
});
Clazz.overrideMethod (c$, "isRemovalPending", 
function () {
var exporter = this.exportedPackage.getExporter ();
if (exporter != null) return exporter.isRemovalPending ();
return true;
});
Clazz.overrideMethod (c$, "toString", 
function () {
var result =  new StringBuffer (this.getName ());
if (this.specVersion != null) {
result.append ("; ").append ("specification-version");
result.append ("=\"").append (this.specVersion).append ("\"");
}return result.toString ();
});
});
