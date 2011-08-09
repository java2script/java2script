Clazz.declarePackage ("org.eclipse.core.runtime.internal.adaptor");
Clazz.load (["org.eclipse.osgi.framework.adaptor.core.BundleInstaller"], "org.eclipse.core.runtime.internal.adaptor.EclipseBundleInstaller", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.context = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.runtime.internal.adaptor, "EclipseBundleInstaller", null, org.eclipse.osgi.framework.adaptor.core.BundleInstaller);
Clazz.makeConstructor (c$, 
function (context) {
this.context = context;
}, "org.osgi.framework.BundleContext");
Clazz.overrideMethod (c$, "installBundle", 
function (toInstall) {
this.context.installBundle (toInstall.getLocation ());
}, "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.overrideMethod (c$, "uninstallBundle", 
function (toUninstallId) {
var toUninstall = this.context.getBundle (toUninstallId.getBundleId ());
if (toUninstall != null) toUninstall.uninstall ();
}, "org.eclipse.osgi.service.resolver.BundleDescription");
Clazz.overrideMethod (c$, "updateBundle", 
function (toUpdateId) {
var toUpdate = this.context.getBundle (toUpdateId.getBundleId ());
if (toUpdate != null) toUpdate.update ();
}, "org.eclipse.osgi.service.resolver.BundleDescription");
});
