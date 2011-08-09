Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["org.eclipse.osgi.framework.adaptor.BundleProtectionDomain"], "org.eclipse.osgi.framework.internal.core.BundleProtectionDomainImpl", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.bundle = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "BundleProtectionDomainImpl", org.eclipse.osgi.framework.adaptor.BundleProtectionDomain);
Clazz.makeConstructor (c$, 
function (bundle, permCollection) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.internal.core.BundleProtectionDomainImpl, [permCollection]);
this.bundle = bundle;
}, "org.eclipse.osgi.framework.internal.core.AbstractBundle,java.security.PermissionCollection");
});
