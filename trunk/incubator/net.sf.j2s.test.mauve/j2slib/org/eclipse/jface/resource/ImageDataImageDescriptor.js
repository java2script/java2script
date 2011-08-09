Clazz.declarePackage ("org.eclipse.jface.resource");
Clazz.load (["org.eclipse.jface.resource.ImageDescriptor"], "org.eclipse.jface.resource.ImageDataImageDescriptor", ["org.eclipse.jface.resource.DeviceResourceException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.data = null;
this.originalImage = null;
this.originalDevice = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.resource, "ImageDataImageDescriptor", org.eclipse.jface.resource.ImageDescriptor);
Clazz.makeConstructor (c$, 
function (originalImage, originalDevice) {
this.construct (originalImage.getImageData ());
this.originalImage = originalImage;
this.originalDevice = originalDevice;
}, "$wt.graphics.Image,$wt.graphics.Device");
Clazz.makeConstructor (c$, 
function (originalImage) {
this.construct (originalImage.getImageData ());
this.originalImage = originalImage;
}, "$wt.graphics.Image");
Clazz.makeConstructor (c$, 
function (data) {
Clazz.superConstructor (this, org.eclipse.jface.resource.ImageDataImageDescriptor, []);
this.data = data;
}, "$wt.graphics.ImageData");
Clazz.defineMethod (c$, "createResource", 
function (device) {
if (this.originalImage != null) {
if (this.originalDevice == null) {
var result = this.createImage (false, device);
if (result == null) {
throw  new org.eclipse.jface.resource.DeviceResourceException (this);
}if (result.equals (this.originalImage)) {
result.dispose ();
this.originalDevice = device;
return this.originalImage;
}return result;
}if (this.originalDevice === device) {
return this.originalImage;
}}return Clazz.superCall (this, org.eclipse.jface.resource.ImageDataImageDescriptor, "createResource", [device]);
}, "$wt.graphics.Device");
Clazz.defineMethod (c$, "destroyResource", 
function (previouslyCreatedObject) {
if (previouslyCreatedObject === this.originalImage) {
return ;
}Clazz.superCall (this, org.eclipse.jface.resource.ImageDataImageDescriptor, "destroyResource", [previouslyCreatedObject]);
}, "~O");
Clazz.overrideMethod (c$, "getImageData", 
function () {
return this.data;
});
Clazz.defineMethod (c$, "hashCode", 
function () {
return this.data.hashCode ();
});
Clazz.defineMethod (c$, "equals", 
function (obj) {
if (!(Clazz.instanceOf (obj, org.eclipse.jface.resource.ImageDataImageDescriptor))) return false;
var imgWrap = obj;
if (this.originalImage != null) {
return imgWrap.originalImage === this.originalImage;
}return (imgWrap.originalImage == null && this.data.equals (imgWrap.data));
}, "~O");
});
