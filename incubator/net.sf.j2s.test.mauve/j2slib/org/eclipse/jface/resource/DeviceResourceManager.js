Clazz.declarePackage ("org.eclipse.jface.resource");
Clazz.load (["org.eclipse.jface.resource.AbstractResourceManager"], "org.eclipse.jface.resource.DeviceResourceManager", ["org.eclipse.jface.resource.ImageDescriptor"], function () {
c$ = Clazz.decorateAsClass (function () {
this.device = null;
this.missingImage = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.resource, "DeviceResourceManager", org.eclipse.jface.resource.AbstractResourceManager);
Clazz.overrideMethod (c$, "getDevice", 
function () {
return this.device;
});
Clazz.makeConstructor (c$, 
function (device) {
Clazz.superConstructor (this, org.eclipse.jface.resource.DeviceResourceManager, []);
this.device = device;
}, "$wt.graphics.Device");
Clazz.overrideMethod (c$, "allocate", 
function (descriptor) {
return descriptor.createResource (this.device);
}, "org.eclipse.jface.resource.DeviceResourceDescriptor");
Clazz.overrideMethod (c$, "deallocate", 
function (resource, descriptor) {
descriptor.destroyResource (resource);
}, "~O,org.eclipse.jface.resource.DeviceResourceDescriptor");
Clazz.overrideMethod (c$, "getDefaultImage", 
function () {
if (this.missingImage == null) {
this.missingImage = org.eclipse.jface.resource.ImageDescriptor.getMissingImageDescriptor ().createImage ();
}return this.missingImage;
});
Clazz.defineMethod (c$, "dispose", 
function () {
Clazz.superCall (this, org.eclipse.jface.resource.DeviceResourceManager, "dispose", []);
if (this.missingImage != null) {
this.missingImage.dispose ();
this.missingImage = null;
}});
});
