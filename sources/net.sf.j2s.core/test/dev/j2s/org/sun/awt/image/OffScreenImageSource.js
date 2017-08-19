Clazz.declarePackage ("sun.awt.image");
Clazz.load (["java.awt.image.ImageProducer"], "sun.awt.image.OffScreenImageSource", ["java.util.Hashtable"], function () {
c$ = Clazz.decorateAsClass (function () {
this.image = null;
this.width = 0;
this.height = 0;
this.properties = null;
this.theConsumer = null;
Clazz.instantialize (this, arguments);
}, sun.awt.image, "OffScreenImageSource", null, java.awt.image.ImageProducer);
Clazz.makeConstructor (c$, 
function (image, properties) {
this.image = image;
if (properties != null) {
this.properties = properties;
} else {
this.properties =  new java.util.Hashtable ();
}this.width = image.getWidth ();
this.height = image.getHeight ();
}, "java.awt.image.BufferedImage,java.util.Hashtable");
Clazz.makeConstructor (c$, 
function (image) {
this.construct (image, null);
}, "java.awt.image.BufferedImage");
Clazz.overrideMethod (c$, "addConsumer", 
function (ic) {
this.theConsumer = ic;
this.produce ();
}, "java.awt.image.ImageConsumer");
Clazz.overrideMethod (c$, "isConsumer", 
function (ic) {
return (ic === this.theConsumer);
}, "java.awt.image.ImageConsumer");
Clazz.overrideMethod (c$, "removeConsumer", 
function (ic) {
if (this.theConsumer === ic) {
this.theConsumer = null;
}}, "java.awt.image.ImageConsumer");
Clazz.overrideMethod (c$, "startProduction", 
function (ic) {
this.addConsumer (ic);
}, "java.awt.image.ImageConsumer");
Clazz.overrideMethod (c$, "requestTopDownLeftRightResend", 
function (ic) {
}, "java.awt.image.ImageConsumer");
Clazz.defineMethod (c$, "sendPixels", 
 function () {
var cm = this.image.getColorModel ();
});
Clazz.defineMethod (c$, "produce", 
 function () {
try {
this.theConsumer.setDimensions (this.image.getWidth (), this.image.getHeight ());
this.theConsumer.setProperties (this.properties);
this.sendPixels ();
this.theConsumer.imageComplete (2);
} catch (e) {
if (Clazz.exceptionOf (e, NullPointerException)) {
if (this.theConsumer != null) {
this.theConsumer.imageComplete (1);
}} else {
throw e;
}
}
});
});
