Clazz.declarePackage ("org.eclipse.jface.resource");
Clazz.load (["org.eclipse.jface.resource.ImageDescriptor"], "org.eclipse.jface.resource.DerivedImageDescriptor", ["org.eclipse.jface.resource.DeviceResourceException", "$wt.graphics.Image", "$wt.widgets.Display"], function () {
c$ = Clazz.decorateAsClass (function () {
this.original = null;
this.flags = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.resource, "DerivedImageDescriptor", org.eclipse.jface.resource.ImageDescriptor);
Clazz.makeConstructor (c$, 
function (original, swtFlags) {
Clazz.superConstructor (this, org.eclipse.jface.resource.DerivedImageDescriptor, []);
this.original = original;
this.flags = swtFlags;
}, "org.eclipse.jface.resource.ImageDescriptor,~N");
Clazz.overrideMethod (c$, "createResource", 
function (device) {
try {
return this.internalCreateImage (device);
} catch (e) {
if (Clazz.instanceOf (e, $wt.SWTException)) {
throw  new org.eclipse.jface.resource.DeviceResourceException (this, e);
} else {
throw e;
}
}
}, "$wt.graphics.Device");
Clazz.defineMethod (c$, "createImage", 
function (device) {
return this.internalCreateImage (device);
}, "$wt.graphics.Device");
Clazz.defineMethod (c$, "hashCode", 
function () {
return this.original.hashCode () + this.flags;
});
Clazz.overrideMethod (c$, "equals", 
function (arg0) {
if (Clazz.instanceOf (arg0, org.eclipse.jface.resource.DerivedImageDescriptor)) {
var desc = arg0;
return desc.original === this.original && this.flags == desc.flags;
}return false;
}, "~O");
Clazz.defineMethod (c$, "internalCreateImage", 
($fz = function (device) {
var originalImage = this.original.createImage (device);
var result =  new $wt.graphics.Image (device, originalImage, this.flags);
this.original.destroyResource (originalImage);
return result;
}, $fz.isPrivate = true, $fz), "$wt.graphics.Device");
Clazz.overrideMethod (c$, "getImageData", 
function () {
var image = this.internalCreateImage ($wt.widgets.Display.getCurrent ());
var result = image.getImageData ();
image.dispose ();
return result;
});
});
