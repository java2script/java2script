Clazz.declarePackage ("org.eclipse.jface.resource");
Clazz.load (["org.eclipse.jface.resource.DeviceResourceDescriptor", "$wt.graphics.ImageData", "$.PaletteData", "$.RGB"], "org.eclipse.jface.resource.ImageDescriptor", ["org.eclipse.jface.resource.DeviceResourceException", "$wt.graphics.Image", "$wt.widgets.Display"], function () {
c$ = Clazz.declareType (org.eclipse.jface.resource, "ImageDescriptor", org.eclipse.jface.resource.DeviceResourceDescriptor);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.eclipse.jface.resource.ImageDescriptor, []);
});
c$.createFromFile = Clazz.defineMethod (c$, "createFromFile", 
function (location, filename) {
return  new org.eclipse.jface.resource.FileImageDescriptor (location, filename);
}, "Class,~S");
c$.createFromImageData = Clazz.defineMethod (c$, "createFromImageData", 
function (data) {
return  new org.eclipse.jface.resource.ImageDataImageDescriptor (data);
}, "$wt.graphics.ImageData");
c$.createFromImage = Clazz.defineMethod (c$, "createFromImage", 
function (img) {
return  new org.eclipse.jface.resource.ImageDataImageDescriptor (img);
}, "$wt.graphics.Image");
c$.createWithFlags = Clazz.defineMethod (c$, "createWithFlags", 
function (originalImage, swtFlags) {
return  new org.eclipse.jface.resource.DerivedImageDescriptor (originalImage, swtFlags);
}, "org.eclipse.jface.resource.ImageDescriptor,~N");
c$.createFromImage = Clazz.defineMethod (c$, "createFromImage", 
function (img, theDevice) {
return  new org.eclipse.jface.resource.ImageDataImageDescriptor (img, theDevice);
}, "$wt.graphics.Image,$wt.graphics.Device");
c$.createFromURL = Clazz.defineMethod (c$, "createFromURL", 
function (url) {
if (url == null) {
return org.eclipse.jface.resource.ImageDescriptor.getMissingImageDescriptor ();
}return  new org.eclipse.jface.resource.URLImageDescriptor (url);
}, "java.net.URL");
Clazz.overrideMethod (c$, "createResource", 
function (device) {
var result = this.createImage (false, device);
if (result == null) {
throw  new org.eclipse.jface.resource.DeviceResourceException (this);
}return result;
}, "$wt.graphics.Device");
Clazz.overrideMethod (c$, "destroyResource", 
function (previouslyCreatedObject) {
(previouslyCreatedObject).dispose ();
}, "~O");
Clazz.defineMethod (c$, "createImage", 
function () {
return this.createImage (true);
});
Clazz.defineMethod (c$, "createImage", 
function (returnMissingImageOnError) {
return this.createImage (returnMissingImageOnError, $wt.widgets.Display.getCurrent ());
}, "~B");
Clazz.defineMethod (c$, "createImage", 
function (device) {
return this.createImage (true, device);
}, "$wt.graphics.Device");
Clazz.defineMethod (c$, "createImage", 
function (returnMissingImageOnError, device) {
var data = this.getImageData ();
if (data == null) {
if (!returnMissingImageOnError) {
return null;
}data = org.eclipse.jface.resource.ImageDescriptor.DEFAULT_IMAGE_DATA;
}try {
if (data.transparentPixel >= 0) {
var maskData = data.getTransparencyMask ();
return  new $wt.graphics.Image (device, data, maskData);
}return  new $wt.graphics.Image (device, data);
} catch (exception) {
if (Clazz.instanceOf (exception, $wt.SWTException)) {
if (returnMissingImageOnError) {
try {
return  new $wt.graphics.Image (device, org.eclipse.jface.resource.ImageDescriptor.DEFAULT_IMAGE_DATA);
} catch (nextException) {
if (Clazz.instanceOf (nextException, $wt.SWTException)) {
return null;
} else {
throw nextException;
}
}
}return null;
} else {
throw exception;
}
}
}, "~B,$wt.graphics.Device");
c$.getMissingImageDescriptor = Clazz.defineMethod (c$, "getMissingImageDescriptor", 
function () {
return org.eclipse.jface.resource.MissingImageDescriptor.getInstance ();
});
c$.DEFAULT_IMAGE_DATA = c$.prototype.DEFAULT_IMAGE_DATA =  new $wt.graphics.ImageData (6, 6, 1,  new $wt.graphics.PaletteData ([ new $wt.graphics.RGB (255, 0, 0)]));
});
