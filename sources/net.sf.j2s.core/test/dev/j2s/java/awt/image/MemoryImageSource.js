Clazz.declarePackage ("java.awt.image");
Clazz.load (["java.awt.image.ImageProducer", "java.util.Vector", "java.awt.image.ColorModel"], "java.awt.image.MemoryImageSource", ["java.util.Hashtable", "JU.AU"], function () {
c$ = Clazz.decorateAsClass (function () {
this.width = 0;
this.height = 0;
this.model = null;
this.pixels = null;
this.pixeloffset = 0;
this.pixelscan = 0;
this.properties = null;
this.theConsumers = null;
this.animating = false;
this.fullbuffers = false;
Clazz.instantialize (this, arguments);
}, java.awt.image, "MemoryImageSource", null, java.awt.image.ImageProducer);
Clazz.prepareFields (c$, function () {
this.theConsumers =  new java.util.Vector ();
});
Clazz.makeConstructor (c$, 
function (w, h, cm, pix, off, scan) {
this.initialize (w, h, cm, pix, off, scan, null);
}, "~N,~N,java.awt.image.ColorModel,~A,~N,~N");
Clazz.makeConstructor (c$, 
function (w, h, cm, pix, off, scan, props) {
this.initialize (w, h, cm, pix, off, scan, props);
}, "~N,~N,java.awt.image.ColorModel,~A,~N,~N,java.util.Hashtable");
Clazz.makeConstructor (c$, 
function (w, h, cm, pix, off, scan) {
this.initialize (w, h, cm, pix, off, scan, null);
}, "~N,~N,java.awt.image.ColorModel,~A,~N,~N");
Clazz.makeConstructor (c$, 
function (w, h, cm, pix, off, scan, props) {
this.initialize (w, h, cm, pix, off, scan, props);
}, "~N,~N,java.awt.image.ColorModel,~A,~N,~N,java.util.Hashtable");
Clazz.defineMethod (c$, "initialize", 
 function (w, h, cm, pix, off, scan, props) {
this.width = w;
this.height = h;
this.model = cm;
this.pixels = pix;
this.pixeloffset = off;
this.pixelscan = scan;
if (props == null) {
props =  new java.util.Hashtable ();
}this.properties = props;
}, "~N,~N,java.awt.image.ColorModel,~O,~N,~N,java.util.Hashtable");
Clazz.makeConstructor (c$, 
function (w, h, pix, off, scan) {
this.initialize (w, h, java.awt.image.ColorModel.getRGBdefault (), pix, off, scan, null);
}, "~N,~N,~A,~N,~N");
Clazz.makeConstructor (c$, 
function (w, h, pix, off, scan, props) {
this.initialize (w, h, java.awt.image.ColorModel.getRGBdefault (), pix, off, scan, props);
}, "~N,~N,~A,~N,~N,java.util.Hashtable");
Clazz.overrideMethod (c$, "addConsumer", 
function (ic) {
if (this.theConsumers.contains (ic)) {
return;
}this.theConsumers.addElement (ic);
try {
this.initConsumer (ic);
this.sendPixels (ic, 0, 0, this.width, this.height);
if (this.isConsumer (ic)) {
ic.imageComplete (this.animating ? 2 : 3);
if (!this.animating && this.isConsumer (ic)) {
ic.imageComplete (1);
this.removeConsumer (ic);
}}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
if (this.isConsumer (ic)) {
ic.imageComplete (1);
}} else {
throw e;
}
}
}, "java.awt.image.ImageConsumer");
Clazz.overrideMethod (c$, "isConsumer", 
function (ic) {
return this.theConsumers.contains (ic);
}, "java.awt.image.ImageConsumer");
Clazz.overrideMethod (c$, "removeConsumer", 
function (ic) {
this.theConsumers.removeElement (ic);
}, "java.awt.image.ImageConsumer");
Clazz.overrideMethod (c$, "startProduction", 
function (ic) {
this.addConsumer (ic);
}, "java.awt.image.ImageConsumer");
Clazz.overrideMethod (c$, "requestTopDownLeftRightResend", 
function (ic) {
}, "java.awt.image.ImageConsumer");
Clazz.defineMethod (c$, "setAnimated", 
function (animated) {
this.animating = animated;
if (!this.animating) {
var enum_ = this.theConsumers.elements ();
while (enum_.hasMoreElements ()) {
var ic = enum_.nextElement ();
ic.imageComplete (3);
if (this.isConsumer (ic)) {
ic.imageComplete (1);
}}
this.theConsumers.removeAllElements ();
}}, "~B");
Clazz.defineMethod (c$, "setFullBufferUpdates", 
function (fullbuffers) {
if (this.fullbuffers == fullbuffers) {
return;
}this.fullbuffers = fullbuffers;
if (this.animating) {
var enum_ = this.theConsumers.elements ();
while (enum_.hasMoreElements ()) {
var ic = enum_.nextElement ();
ic.setHints (fullbuffers ? (6) : 1);
}
}}, "~B");
Clazz.defineMethod (c$, "newPixels", 
function () {
this.newPixels (0, 0, this.width, this.height, true);
});
Clazz.defineMethod (c$, "newPixels", 
function (x, y, w, h) {
this.newPixels (x, y, w, h, true);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "newPixels", 
function (x, y, w, h, framenotify) {
{
if (this.pixels.img && this.pixels.img._g) {
this.pixels.img._pix = this.pixels;
this.pixels.img._g.drawImage(this.pixels.img, 0, 0, null);
this.pixels.img._pix = null;
}
}if (this.animating) {
if (this.fullbuffers) {
x = y = 0;
w = this.width;
h = this.height;
} else {
if (x < 0) {
w += x;
x = 0;
}if (x + w > this.width) {
w = this.width - x;
}if (y < 0) {
h += y;
y = 0;
}if (y + h > this.height) {
h = this.height - y;
}}if ((w <= 0 || h <= 0) && !framenotify) {
return;
}var enum_ = this.theConsumers.elements ();
while (enum_.hasMoreElements ()) {
var ic = enum_.nextElement ();
if (w > 0 && h > 0) {
this.sendPixels (ic, x, y, w, h);
}if (framenotify && this.isConsumer (ic)) {
ic.imageComplete (2);
}}
}}, "~N,~N,~N,~N,~B");
Clazz.defineMethod (c$, "newPixels", 
function (newpix, newmodel, offset, scansize) {
this.pixels = newpix;
this.model = newmodel;
this.pixeloffset = offset;
this.pixelscan = scansize;
this.newPixels ();
}, "~A,java.awt.image.ColorModel,~N,~N");
Clazz.defineMethod (c$, "newPixels", 
function (newpix, newmodel, offset, scansize) {
this.pixels = newpix;
this.model = newmodel;
this.pixeloffset = offset;
this.pixelscan = scansize;
this.newPixels ();
}, "~A,java.awt.image.ColorModel,~N,~N");
Clazz.defineMethod (c$, "initConsumer", 
 function (ic) {
if (this.isConsumer (ic)) {
ic.setDimensions (this.width, this.height);
}if (this.isConsumer (ic)) {
ic.setProperties (this.properties);
}if (this.isConsumer (ic)) {
ic.setColorModel (this.model);
}if (this.isConsumer (ic)) {
ic.setHints (this.animating ? (this.fullbuffers ? (6) : 1) : (30));
}}, "java.awt.image.ImageConsumer");
Clazz.defineMethod (c$, "sendPixels", 
 function (ic, x, y, w, h) {
var off = this.pixeloffset + this.pixelscan * y + x;
if (this.isConsumer (ic)) {
var isbytes = JU.AU.isAB (this.pixels);
if (isbytes) {
ic.setPixels (x, y, w, h, this.model, this.pixels, off, this.pixelscan);
} else {
ic.setPixels (x, y, w, h, this.model, this.pixels, off, this.pixelscan);
}}}, "java.awt.image.ImageConsumer,~N,~N,~N,~N");
});
