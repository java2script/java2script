Clazz.declarePackage ("org.eclipse.osgi.event");
Clazz.load (["org.osgi.framework.BundleListener"], "org.eclipse.osgi.event.BatchBundleListener", null, function () {
Clazz.declareInterface (org.eclipse.osgi.event, "BatchBundleListener", org.osgi.framework.BundleListener);
});
