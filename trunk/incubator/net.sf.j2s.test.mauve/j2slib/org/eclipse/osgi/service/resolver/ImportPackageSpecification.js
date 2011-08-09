Clazz.declarePackage ("org.eclipse.osgi.service.resolver");
Clazz.load (["org.eclipse.osgi.service.resolver.VersionConstraint"], "org.eclipse.osgi.service.resolver.ImportPackageSpecification", null, function () {
c$ = Clazz.declareInterface (org.eclipse.osgi.service.resolver, "ImportPackageSpecification", org.eclipse.osgi.service.resolver.VersionConstraint);
Clazz.defineStatics (c$,
"RESOLUTION_STATIC", "static",
"RESOLUTION_OPTIONAL", "optional",
"RESOLUTION_DYNAMIC", "dynamic");
});
