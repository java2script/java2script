Clazz.declarePackage ("java.awt.image");
Clazz.load (["java.awt.image.ImageConsumer"], "java.awt.image.PixelGrabber", ["java.awt.image.ColorModel", "swingjs.JSToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.producer = null;
this.dstX = 0;
this.dstY = 0;
this.dstW = 0;
this.dstH = 0;
this.imageModel = null;
this.bytePixels = null;
this.intPixels = null;
this.dstOff = 0;
this.dstScan = 0;
this.grabbing = false;
this.flags = 0;
Clazz.instantialize (this, arguments);
}, java.awt.image, "PixelGrabber", null, java.awt.image.ImageConsumer);
Clazz.makeConstructor (c$, 
function (img, x, y, w, h, pix, off, scansize) {
this.construct (img.getSource (), x, y, w, h, pix, off, scansize);
}, "java.awt.Image,~N,~N,~N,~N,~A,~N,~N");
Clazz.makeConstructor (c$, 
function (ip, x, y, w, h, pix, off, scansize) {
this.producer = ip;
this.dstX = x;
this.dstY = y;
this.dstW = w;
this.dstH = h;
this.dstOff = off;
this.dstScan = scansize;
this.intPixels = pix;
this.imageModel = java.awt.image.ColorModel.getRGBdefault ();
}, "java.awt.image.ImageProducer,~N,~N,~N,~N,~A,~N,~N");
Clazz.makeConstructor (c$, 
function (img, x, y, w, h, forceRGB) {
this.producer = img.getSource ();
this.dstX = x;
this.dstY = y;
this.dstW = w;
this.dstH = h;
if (forceRGB) {
this.imageModel = java.awt.image.ColorModel.getRGBdefault ();
}}, "java.awt.Image,~N,~N,~N,~N,~B");
Clazz.defineMethod (c$, "startGrabbing", 
function () {
if ((this.flags & 112) != 0) {
return;
}if (!this.grabbing) {
this.grabbing = true;
this.flags &= -129;
this.producer.startProduction (this);
}});
Clazz.defineMethod (c$, "abortGrabbing", 
function () {
this.imageComplete (4);
});
Clazz.defineMethod (c$, "grabPixels", 
function () {
return this.grabPixels (0);
});
Clazz.defineMethod (c$, "grabPixels", 
function (ms) {
if ((this.flags & 112) != 0) {
return (this.flags & 48) != 0;
}var end = ms + System.currentTimeMillis ();
if (!this.grabbing) {
this.grabbing = true;
this.flags &= -129;
this.producer.startProduction (this);
}while (this.grabbing) {
var timeout;
if (ms == 0) {
timeout = 0;
} else {
timeout = end - System.currentTimeMillis ();
if (timeout <= 0) {
break;
}}swingjs.JSToolkit.warn ("wait in PixelGrabber.grabPixels");
this.wait (timeout);
}
return (this.flags & 48) != 0;
}, "~N");
Clazz.defineMethod (c$, "getStatus", 
function () {
return this.flags;
});
Clazz.defineMethod (c$, "getWidth", 
function () {
return (this.dstW < 0) ? -1 : this.dstW;
});
Clazz.defineMethod (c$, "getHeight", 
function () {
return (this.dstH < 0) ? -1 : this.dstH;
});
Clazz.defineMethod (c$, "getPixels", 
function () {
return (this.bytePixels == null) ? (this.intPixels) : (this.bytePixels);
});
Clazz.defineMethod (c$, "getColorModel", 
function () {
return this.imageModel;
});
Clazz.overrideMethod (c$, "setDimensions", 
function (width, height) {
if (this.dstW < 0) {
this.dstW = width - this.dstX;
}if (this.dstH < 0) {
this.dstH = height - this.dstY;
}if (this.dstW <= 0 || this.dstH <= 0) {
this.imageComplete (3);
} else if (this.intPixels == null && this.imageModel === java.awt.image.ColorModel.getRGBdefault ()) {
this.intPixels =  Clazz.newIntArray (this.dstW * this.dstH, 0);
this.dstScan = this.dstW;
this.dstOff = 0;
}this.flags |= (3);
}, "~N,~N");
Clazz.overrideMethod (c$, "setHints", 
function (hints) {
return;
}, "~N");
Clazz.overrideMethod (c$, "setProperties", 
function (props) {
return;
}, "java.util.Hashtable");
Clazz.overrideMethod (c$, "setColorModel", 
function (model) {
return;
}, "java.awt.image.ColorModel");
Clazz.defineMethod (c$, "convertToRGB", 
 function () {
var size = this.dstW * this.dstH;
var newpixels =  Clazz.newIntArray (size, 0);
if (this.bytePixels != null) {
for (var i = 0; i < size; i++) {
newpixels[i] = this.imageModel.getRGB (this.bytePixels[i] & 0xff);
}
} else if (this.intPixels != null) {
for (var i = 0; i < size; i++) {
newpixels[i] = this.imageModel.getRGB (this.intPixels[i]);
}
}this.bytePixels = null;
this.intPixels = newpixels;
this.dstScan = this.dstW;
this.dstOff = 0;
this.imageModel = java.awt.image.ColorModel.getRGBdefault ();
});
Clazz.defineMethod (c$, "setPixels", 
function (srcX, srcY, srcW, srcH, model, pixels, srcOff, srcScan) {
if (srcY < this.dstY) {
var diff = this.dstY - srcY;
if (diff >= srcH) {
return;
}srcOff += srcScan * diff;
srcY += diff;
srcH -= diff;
}if (srcY + srcH > this.dstY + this.dstH) {
srcH = (this.dstY + this.dstH) - srcY;
if (srcH <= 0) {
return;
}}if (srcX < this.dstX) {
var diff = this.dstX - srcX;
if (diff >= srcW) {
return;
}srcOff += diff;
srcX += diff;
srcW -= diff;
}if (srcX + srcW > this.dstX + this.dstW) {
srcW = (this.dstX + this.dstW) - srcX;
if (srcW <= 0) {
return;
}}var dstPtr = this.dstOff + (srcY - this.dstY) * this.dstScan + (srcX - this.dstX);
if (this.intPixels == null) {
if (this.bytePixels == null) {
this.bytePixels =  Clazz.newByteArray (this.dstW * this.dstH, 0);
this.dstScan = this.dstW;
this.dstOff = 0;
this.imageModel = model;
} else if (this.imageModel !== model) {
this.convertToRGB ();
}if (this.bytePixels != null) {
for (var h = srcH; h > 0; h--) {
System.arraycopy (pixels, srcOff, this.bytePixels, dstPtr, srcW);
srcOff += srcScan;
dstPtr += this.dstScan;
}
}}if (this.intPixels != null) {
var dstRem = this.dstScan - srcW;
var srcRem = srcScan - srcW;
for (var h = srcH; h > 0; h--) {
for (var w = srcW; w > 0; w--) {
this.intPixels[dstPtr++] = model.getRGB (pixels[srcOff++] & 0xff);
}
srcOff += srcRem;
dstPtr += dstRem;
}
}this.flags |= 8;
}, "~N,~N,~N,~N,java.awt.image.ColorModel,~A,~N,~N");
Clazz.defineMethod (c$, "setPixels", 
function (srcX, srcY, srcW, srcH, model, pixels, srcOff, srcScan) {
if (srcY < this.dstY) {
var diff = this.dstY - srcY;
if (diff >= srcH) {
return;
}srcOff += srcScan * diff;
srcY += diff;
srcH -= diff;
}if (srcY + srcH > this.dstY + this.dstH) {
srcH = (this.dstY + this.dstH) - srcY;
if (srcH <= 0) {
return;
}}if (srcX < this.dstX) {
var diff = this.dstX - srcX;
if (diff >= srcW) {
return;
}srcOff += diff;
srcX += diff;
srcW -= diff;
}if (srcX + srcW > this.dstX + this.dstW) {
srcW = (this.dstX + this.dstW) - srcX;
if (srcW <= 0) {
return;
}}if (this.intPixels == null) {
if (this.bytePixels == null) {
this.intPixels =  Clazz.newIntArray (this.dstW * this.dstH, 0);
this.dstScan = this.dstW;
this.dstOff = 0;
this.imageModel = model;
} else {
this.convertToRGB ();
}}var dstPtr = this.dstOff + (srcY - this.dstY) * this.dstScan + (srcX - this.dstX);
if (this.imageModel === model) {
for (var h = srcH; h > 0; h--) {
System.arraycopy (pixels, srcOff, this.intPixels, dstPtr, srcW);
srcOff += srcScan;
dstPtr += this.dstScan;
}
} else {
if (this.imageModel !== java.awt.image.ColorModel.getRGBdefault ()) {
this.convertToRGB ();
}var dstRem = this.dstScan - srcW;
var srcRem = srcScan - srcW;
for (var h = srcH; h > 0; h--) {
for (var w = srcW; w > 0; w--) {
this.intPixels[dstPtr++] = model.getRGB (pixels[srcOff++]);
}
srcOff += srcRem;
dstPtr += dstRem;
}
}this.flags |= 8;
}, "~N,~N,~N,~N,java.awt.image.ColorModel,~A,~N,~N");
Clazz.overrideMethod (c$, "imageComplete", 
function (status) {
this.grabbing = false;
switch (status) {
default:
case 1:
this.flags |= 192;
break;
case 4:
this.flags |= 128;
break;
case 3:
this.flags |= 32;
break;
case 2:
this.flags |= 16;
break;
}
this.producer.removeConsumer (this);
}, "~N");
Clazz.defineMethod (c$, "status", 
function () {
return this.flags;
});
Clazz.defineStatics (c$,
"GRABBEDBITS", (48),
"DONEBITS", (112));
});
