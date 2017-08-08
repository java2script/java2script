Clazz.declarePackage ("java.awt");
Clazz.load (null, "java.awt.GraphicsConfiguration", ["java.lang.Boolean", "$.IllegalArgumentException", "java.util.Hashtable", "java.awt.AWTException", "swingjs.api.Interface"], function () {
c$ = Clazz.declareType (java.awt, "GraphicsConfiguration");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "createCompatibleImage", 
function (width, height, transparency) {
if (this.getColorModel ().getTransparency () == transparency) {
return this.createCompatibleImage (width, height);
}var cm = this.getColorModel (transparency);
if (cm == null) {
throw  new IllegalArgumentException ("Unknown transparency: " + transparency);
}var wr = cm.createCompatibleWritableRaster (width, height);
return this.newBufferedImage (cm, wr, cm.isAlphaPremultiplied (), null);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "newBufferedImage", 
function (cm, wr, alphaPremultiplied, properties) {
return swingjs.api.Interface.getInstanceWithParams ("java.awt.image.BufferedImage",  Clazz.newArray (-1, [java.awt.image.ColorModel, java.awt.image.WritableRaster, Boolean, java.util.Hashtable]),  Clazz.newArray (-1, [cm, wr, alphaPremultiplied ? Boolean.TRUE : Boolean.FALSE, properties]));
}, "java.awt.image.ColorModel,java.awt.image.WritableRaster,~B,java.util.Hashtable");
Clazz.defineMethod (c$, "createCompatibleVolatileImage", 
function (width, height) {
var vi = null;
try {
vi = this.createCompatibleVolatileImage (width, height, null, 1);
} catch (e) {
if (Clazz.exceptionOf (e, java.awt.AWTException)) {
} else {
throw e;
}
}
return vi;
}, "~N,~N");
Clazz.defineMethod (c$, "createCompatibleVolatileImage", 
function (width, height, transparency) {
var vi = null;
try {
vi = this.createCompatibleVolatileImage (width, height, null, transparency);
} catch (e) {
if (Clazz.exceptionOf (e, java.awt.AWTException)) {
} else {
throw e;
}
}
return vi;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "createCompatibleVolatileImage", 
function (width, height, caps, transparency) {
var vi = swingjs.api.Interface.getInstanceWithParams ("sun.awt.image.SunVolatileImage",  Clazz.newArray (-1, [java.awt.GraphicsConfiguration, Integer, Integer, Boolean, Clazz._O, Integer]),  Clazz.newArray (-1, [this, Integer.$valueOf (width), Integer.$valueOf (height), caps, Integer.$valueOf (transparency)]));
if (caps != null && caps.isAccelerated () && !vi.getCapabilities ().isAccelerated ()) {
throw  new java.awt.AWTException ("Supplied image capabilities could not be met by this graphics configuration.");
}return vi;
}, "~N,~N,java.awt.ImageCapabilities,~N");
Clazz.defineMethod (c$, "isTranslucencyCapable", 
function () {
return false;
});
});
