Clazz.declarePackage ("org.eclipse.osgi.framework.adaptor");
Clazz.load (["java.security.ProtectionDomain"], "org.eclipse.osgi.framework.adaptor.BundleProtectionDomain", null, function () {
c$ = Clazz.declareType (org.eclipse.osgi.framework.adaptor, "BundleProtectionDomain", java.security.ProtectionDomain);
Clazz.makeConstructor (c$, 
function (permCollection) {
Clazz.superConstructor (this, org.eclipse.osgi.framework.adaptor.BundleProtectionDomain, [null, permCollection]);
}, "java.security.PermissionCollection");
});
