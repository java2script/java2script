Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.eclipse.osgi.framework.internal.core.IBuddyPolicy"], "org.eclipse.osgi.framework.internal.core.GlobalPolicy", ["org.eclipse.osgi.framework.internal.core.BundleLoader"], function () {
c$ = Clazz.decorateAsClass (function () {
this.admin = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "GlobalPolicy", null, org.eclipse.osgi.framework.internal.core.IBuddyPolicy);
Clazz.makeConstructor (c$, 
function (admin) {
this.admin = admin;
}, "org.osgi.service.packageadmin.PackageAdmin");
Clazz.overrideMethod (c$, "loadClass", 
function (name) {
var pkg = this.admin.getExportedPackage (org.eclipse.osgi.framework.internal.core.BundleLoader.getPackageName (name));
if (pkg == null) return null;
try {
return pkg.getExportingBundle ().loadClass (name);
} catch (e) {
if (Clazz.instanceOf (e, ClassNotFoundException)) {
return null;
} else {
throw e;
}
}
}, "~S");
Clazz.overrideMethod (c$, "loadResource", 
function (name) {
var pkg = this.admin.getExportedPackage (org.eclipse.osgi.framework.internal.core.BundleLoader.getPackageName (name));
if (pkg == null) return null;
return pkg.getExportingBundle ().getResource (name);
}, "~S");
Clazz.overrideMethod (c$, "loadResources", 
function (name) {
var pkg = this.admin.getExportedPackage (org.eclipse.osgi.framework.internal.core.BundleLoader.getPackageName (name));
if (pkg == null) return null;
try {
return pkg.getExportingBundle ().getResources (name);
} catch (e) {
if (Clazz.instanceOf (e, java.io.IOException)) {
return null;
} else {
throw e;
}
}
}, "~S");
});
