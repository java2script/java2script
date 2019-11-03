Clazz.declarePackage ("org.eclipse.osgi.internal.resolver");
Clazz.load (["org.eclipse.osgi.util.NLS"], "org.eclipse.osgi.internal.resolver.StateMsg", null, function () {
c$ = Clazz.declareType (org.eclipse.osgi.internal.resolver, "StateMsg", org.eclipse.osgi.util.NLS);
Clazz.defineStatics (c$,
"BUNDLE_NAME", "org.eclipse.osgi.internal.resolver.StateMessages",
"COMMIT_INVALID_TIMESTAMP", null,
"HEADER_REQUIRED", null,
"HEADER_PACKAGE_DUPLICATES", null,
"HEADER_PACKAGE_JAVA", null,
"HEADER_VERSION_ERROR", null,
"HEADER_EXPORT_ATTR_ERROR", null,
"HEADER_DIRECTIVE_DUPLICATES", null,
"HEADER_REEXPORT_USES", null);
{
org.eclipse.osgi.util.NLS.initializeMessages ("org.eclipse.osgi.internal.resolver.StateMessages", org.eclipse.osgi.internal.resolver.StateMsg);
}});
