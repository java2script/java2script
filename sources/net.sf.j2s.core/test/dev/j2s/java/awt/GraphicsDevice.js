Clazz.declarePackage ("java.awt");
Clazz.load (["java.lang.Enum"], "java.awt.GraphicsDevice", ["java.lang.UnsupportedOperationException", "java.awt.DisplayMode"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fullScreenWindow = null;
this.windowedModeBounds = null;
Clazz.instantialize (this, arguments);
}, java.awt, "GraphicsDevice");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "getBestConfiguration", 
function (gct) {
return this.getDefaultConfiguration ();
}, "~O");
Clazz.defineMethod (c$, "isFullScreenSupported", 
function () {
return false;
});
Clazz.defineMethod (c$, "setFullScreenWindow", 
function (w) {
}, "java.awt.Window");
Clazz.defineMethod (c$, "getFullScreenWindow", 
function () {
return null;
});
Clazz.defineMethod (c$, "isDisplayChangeSupported", 
function () {
return false;
});
Clazz.defineMethod (c$, "setDisplayMode", 
function (dm) {
throw  new UnsupportedOperationException ("Cannot change display mode");
}, "~O");
Clazz.defineMethod (c$, "getDisplayMode", 
function () {
var gc = this.getDefaultConfiguration ();
var r = gc.getBounds ();
var cm = gc.getColorModel ();
return  new java.awt.DisplayMode (r.width, r.height, cm.getPixelSize (), 0);
});
Clazz.defineMethod (c$, "getDisplayModes", 
function () {
return  Clazz.newArray (-1, [this.getDisplayMode ()]);
});
Clazz.defineMethod (c$, "getAvailableAcceleratedMemory", 
function () {
return -1;
});
Clazz.defineMethod (c$, "isWindowTranslucencySupported", 
function (translucencyKind) {
switch (translucencyKind) {
case java.awt.GraphicsDevice.WindowTranslucency.PERPIXEL_TRANSPARENT:
return java.awt.GraphicsDevice.isWindowShapingSupported ();
case java.awt.GraphicsDevice.WindowTranslucency.TRANSLUCENT:
return java.awt.GraphicsDevice.isWindowOpacitySupported ();
case java.awt.GraphicsDevice.WindowTranslucency.PERPIXEL_TRANSLUCENT:
return this.isWindowPerpixelTranslucencySupported ();
}
return false;
}, "java.awt.GraphicsDevice.WindowTranslucency");
c$.isWindowShapingSupported = Clazz.defineMethod (c$, "isWindowShapingSupported", 
function () {
return false;
});
c$.isWindowOpacitySupported = Clazz.defineMethod (c$, "isWindowOpacitySupported", 
function () {
return false;
});
Clazz.defineMethod (c$, "isWindowPerpixelTranslucencySupported", 
function () {
return true;
});
Clazz.defineMethod (c$, "getTranslucencyCapableGC", 
function () {
var defaultGC = this.getDefaultConfiguration ();
if (defaultGC.isTranslucencyCapable ()) {
return defaultGC;
}var configs = this.getConfigurations ();
for (var j = 0; j < configs.length; j++) {
if (configs[j].isTranslucencyCapable ()) {
return configs[j];
}}
return null;
});
Clazz.pu$h(c$);
c$ = Clazz.declareType (java.awt.GraphicsDevice, "WindowTranslucency", Enum);
Clazz.defineEnumConstant (c$, "PERPIXEL_TRANSPARENT", 0, []);
Clazz.defineEnumConstant (c$, "TRANSLUCENT", 1, []);
Clazz.defineEnumConstant (c$, "PERPIXEL_TRANSLUCENT", 2, []);
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"TYPE_RASTER_SCREEN", 0,
"TYPE_PRINTER", 1,
"TYPE_IMAGE_BUFFER", 2);
});
