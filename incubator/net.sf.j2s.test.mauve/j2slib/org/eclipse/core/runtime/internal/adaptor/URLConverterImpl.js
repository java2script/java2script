Clazz.declarePackage ("org.eclipse.core.runtime.internal.adaptor");
Clazz.load (["org.eclipse.osgi.service.urlconversion.URLConverter"], "org.eclipse.core.runtime.internal.adaptor.URLConverterImpl", null, function () {
c$ = Clazz.declareType (org.eclipse.core.runtime.internal.adaptor, "URLConverterImpl", null, org.eclipse.osgi.service.urlconversion.URLConverter);
Clazz.overrideMethod (c$, "convertToFileURL", 
function (url) {
var connection = url.openConnection ();
if (Clazz.instanceOf (connection, org.eclipse.osgi.framework.internal.core.BundleURLConnection)) {
return (connection).getFileURL ();
} else {
return url;
}}, "java.net.URL");
Clazz.overrideMethod (c$, "convertToLocalURL", 
function (url) {
var connection = url.openConnection ();
if (Clazz.instanceOf (connection, org.eclipse.osgi.framework.internal.core.BundleURLConnection)) {
return (connection).getLocalURL ();
} else {
return url;
}}, "java.net.URL");
});
