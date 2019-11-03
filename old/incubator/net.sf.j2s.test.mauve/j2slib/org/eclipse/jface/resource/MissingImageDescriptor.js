Clazz.declarePackage ("org.eclipse.jface.resource");
Clazz.load (["org.eclipse.jface.resource.ImageDescriptor"], "org.eclipse.jface.resource.MissingImageDescriptor", null, function () {
c$ = Clazz.declareType (org.eclipse.jface.resource, "MissingImageDescriptor", org.eclipse.jface.resource.ImageDescriptor);
Clazz.overrideMethod (c$, "getImageData", 
function () {
return org.eclipse.jface.resource.ImageDescriptor.DEFAULT_IMAGE_DATA;
});
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function () {
if (org.eclipse.jface.resource.MissingImageDescriptor.instance == null) {
($t$ = org.eclipse.jface.resource.MissingImageDescriptor.instance =  new org.eclipse.jface.resource.MissingImageDescriptor (), org.eclipse.jface.resource.MissingImageDescriptor.prototype.instance = org.eclipse.jface.resource.MissingImageDescriptor.instance, $t$);
}return org.eclipse.jface.resource.MissingImageDescriptor.instance;
});
Clazz.defineStatics (c$,
"instance", null);
});
