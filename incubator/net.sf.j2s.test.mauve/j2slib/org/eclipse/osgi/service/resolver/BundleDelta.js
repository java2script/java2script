Clazz.declarePackage ("org.eclipse.osgi.service.resolver");
c$ = Clazz.declareInterface (org.eclipse.osgi.service.resolver, "BundleDelta", Comparable);
Clazz.defineStatics (c$,
"ADDED", 0x1,
"REMOVED", 0x2,
"UPDATED", 0x4,
"RESOLVED", 0x8,
"UNRESOLVED", 0x10,
"LINKAGE_CHANGED", 0x20,
"OPTIONAL_LINKAGE_CHANGED", 0x40,
"REMOVAL_PENDING", 0x80,
"REMOVAL_COMPLETE", 0x100);
