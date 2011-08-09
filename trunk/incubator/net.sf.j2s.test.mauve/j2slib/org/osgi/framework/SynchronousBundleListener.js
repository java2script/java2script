Clazz.declarePackage ("org.osgi.framework");
Clazz.load (["org.osgi.framework.BundleListener"], "org.osgi.framework.SynchronousBundleListener", null, function () {
Clazz.declareInterface (org.osgi.framework, "SynchronousBundleListener", org.osgi.framework.BundleListener);
});
