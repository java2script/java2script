Clazz.declarePackage ("org.eclipse.osgi.framework.adaptor");
c$ = Clazz.declareInterface (org.eclipse.osgi.framework.adaptor, "BundleData");
Clazz.defineStatics (c$,
"TYPE_FRAGMENT", 0x00000001,
"TYPE_FRAMEWORK_EXTENSION", 0x00000002,
"TYPE_BOOTCLASSPATH_EXTENSION", 0x00000004,
"TYPE_SINGLETON", 0x00000008);
