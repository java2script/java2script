Clazz.declarePackage ("org.eclipse.jface.resource");
Clazz.load (["org.eclipse.jface.resource.DeviceResourceDescriptor"], "org.eclipse.jface.resource.ColorDescriptor", null, function () {
c$ = Clazz.declareType (org.eclipse.jface.resource, "ColorDescriptor", org.eclipse.jface.resource.DeviceResourceDescriptor);
c$.createFrom = Clazz.defineMethod (c$, "createFrom", 
function (toCreate, originalDevice) {
return  new org.eclipse.jface.resource.RGBColorDescriptor (toCreate, originalDevice);
}, "$wt.graphics.Color,$wt.graphics.Device");
c$.createFrom = Clazz.defineMethod (c$, "createFrom", 
function (toCreate) {
return  new org.eclipse.jface.resource.RGBColorDescriptor (toCreate);
}, "$wt.graphics.Color");
c$.createFrom = Clazz.defineMethod (c$, "createFrom", 
function (toCreate) {
return  new org.eclipse.jface.resource.RGBColorDescriptor (toCreate);
}, "$wt.graphics.RGB");
Clazz.overrideMethod (c$, "createResource", 
function (device) {
return this.createColor (device);
}, "$wt.graphics.Device");
Clazz.overrideMethod (c$, "destroyResource", 
function (previouslyCreatedObject) {
this.destroyColor (previouslyCreatedObject);
}, "~O");
});
