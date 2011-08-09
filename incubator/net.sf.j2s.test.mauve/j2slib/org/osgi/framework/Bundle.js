Clazz.declarePackage ("org.osgi.framework");
c$ = Clazz.declareInterface (org.osgi.framework, "Bundle");
Clazz.defineStatics (c$,
"UNINSTALLED", 0x00000001,
"INSTALLED", 0x00000002,
"RESOLVED", 0x00000004,
"STARTING", 0x00000008,
"STOPPING", 0x00000010,
"ACTIVE", 0x00000020);
