Clazz.declarePackage ("org.eclipse.osgi.framework.internal.protocol.bundleentry");
Clazz.load (["org.eclipse.osgi.framework.internal.core.BundleResourceHandler"], "org.eclipse.osgi.framework.internal.protocol.bundleentry.Handler", ["java.io.FileNotFoundException"], function () {
c$ = Clazz.declareType (org.eclipse.osgi.framework.internal.protocol.bundleentry, "Handler", org.eclipse.osgi.framework.internal.core.BundleResourceHandler);
Clazz.overrideMethod (c$, "findBundleEntry", 
function (url, bundle) {
var bundleData = bundle.getBundleData ();
var entry = bundleData.getBaseBundleFile ().getEntry (url.getPath ());
if (entry == null) throw  new java.io.FileNotFoundException (url.getPath ());
return entry;
}, "java.net.URL,org.eclipse.osgi.framework.internal.core.AbstractBundle");
});
