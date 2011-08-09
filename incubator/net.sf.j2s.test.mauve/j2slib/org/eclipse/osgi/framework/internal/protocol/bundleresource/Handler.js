Clazz.declarePackage ("org.eclipse.osgi.framework.internal.protocol.bundleresource");
Clazz.load (["org.eclipse.osgi.framework.internal.core.BundleResourceHandler"], "org.eclipse.osgi.framework.internal.protocol.bundleresource.Handler", ["java.io.FileNotFoundException"], function () {
c$ = Clazz.declareType (org.eclipse.osgi.framework.internal.protocol.bundleresource, "Handler", org.eclipse.osgi.framework.internal.core.BundleResourceHandler);
Clazz.overrideMethod (c$, "findBundleEntry", 
function (url, bundle) {
var cl = org.eclipse.osgi.framework.internal.core.BundleResourceHandler.getBundleClassLoader (bundle);
if (cl == null) throw  new java.io.FileNotFoundException (url.getPath ());
var index = url.getPort ();
var entry = null;
if (index == 0) {
entry = cl.findLocalObject (url.getPath ());
} else {
var entries = cl.findLocalObjects (url.getPath ());
if (entries != null) for (var i = 0; entries.hasMoreElements () && i <= index; i++) entry = entries.nextElement ();

}if (entry == null) throw  new java.io.FileNotFoundException (url.getPath ());
return entry;
}, "java.net.URL,org.eclipse.osgi.framework.internal.core.AbstractBundle");
});
