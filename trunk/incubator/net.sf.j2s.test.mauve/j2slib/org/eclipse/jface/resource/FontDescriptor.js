Clazz.declarePackage ("org.eclipse.jface.resource");
Clazz.load (["org.eclipse.jface.resource.DeviceResourceDescriptor"], "org.eclipse.jface.resource.FontDescriptor", ["$wt.graphics.FontData"], function () {
c$ = Clazz.declareType (org.eclipse.jface.resource, "FontDescriptor", org.eclipse.jface.resource.DeviceResourceDescriptor);
c$.createFrom = Clazz.defineMethod (c$, "createFrom", 
function (font, originalDevice) {
return  new org.eclipse.jface.resource.ArrayFontDescriptor (font, originalDevice);
}, "$wt.graphics.Font,$wt.graphics.Device");
c$.createFrom = Clazz.defineMethod (c$, "createFrom", 
function (font) {
return  new org.eclipse.jface.resource.ArrayFontDescriptor (font);
}, "$wt.graphics.Font");
c$.createFrom = Clazz.defineMethod (c$, "createFrom", 
function (data) {
return  new org.eclipse.jface.resource.ArrayFontDescriptor (data);
}, "~A");
c$.createFrom = Clazz.defineMethod (c$, "createFrom", 
function (data) {
return  new org.eclipse.jface.resource.NamedFontDescriptor (data);
}, "$wt.graphics.FontData");
c$.createFrom = Clazz.defineMethod (c$, "createFrom", 
function (name, height, style) {
return org.eclipse.jface.resource.FontDescriptor.createFrom ( new $wt.graphics.FontData (name, height, style));
}, "~S,~N,~N");
Clazz.overrideMethod (c$, "createResource", 
function (device) {
return this.createFont (device);
}, "$wt.graphics.Device");
Clazz.overrideMethod (c$, "destroyResource", 
function (previouslyCreatedObject) {
this.destroyFont (previouslyCreatedObject);
}, "~O");
});
