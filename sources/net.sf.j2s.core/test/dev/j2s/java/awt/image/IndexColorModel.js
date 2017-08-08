Clazz.declarePackage ("java.awt.image");
Clazz.load (["java.awt.image.ColorModel"], "java.awt.image.IndexColorModel", ["java.lang.IllegalArgumentException", "$.UnsupportedOperationException", "java.awt.color.ColorSpace", "java.awt.image.BufferedImage", "$.ComponentSampleModel", "$.DataBuffer", "$.DirectColorModel", "$.MultiPixelPackedSampleModel", "$.Raster"], function () {
c$ = Clazz.decorateAsClass (function () {
this.rgb = null;
this.map_size = 0;
this.pixel_mask = 0;
this.transparent_index = -1;
this.allgrayopaque = false;
this.lookupcache = null;
Clazz.instantialize (this, arguments);
}, java.awt.image, "IndexColorModel", java.awt.image.ColorModel);
Clazz.prepareFields (c$, function () {
this.lookupcache =  Clazz.newIntArray (40, 0);
});
Clazz.makeConstructor (c$, 
function (bits, size, r, g, b) {
Clazz.superConstructor (this, java.awt.image.IndexColorModel, [bits, java.awt.image.IndexColorModel.opaqueBits, java.awt.color.ColorSpace.getInstance (1000), false, false, 1, java.awt.image.ColorModel.getDefaultTransferType (bits)]);
if (bits < 1 || bits > 16) {
throw  new IllegalArgumentException ("Number of bits must be between 1 and 16.");
}this.setRGBs (size, r, g, b, null);
this.calculatePixelMask ();
}, "~N,~N,~A,~A,~A");
Clazz.makeConstructor (c$, 
function (bits, size, r, g, b, trans) {
Clazz.superConstructor (this, java.awt.image.IndexColorModel, [bits, java.awt.image.IndexColorModel.opaqueBits, java.awt.color.ColorSpace.getInstance (1000), false, false, 1, java.awt.image.ColorModel.getDefaultTransferType (bits)]);
if (bits < 1 || bits > 16) {
throw  new IllegalArgumentException ("Number of bits must be between 1 and 16.");
}this.setRGBs (size, r, g, b, null);
this.setTransparentPixel (trans);
this.calculatePixelMask ();
}, "~N,~N,~A,~A,~A,~N");
Clazz.makeConstructor (c$, 
function (bits, size, r, g, b, a) {
Clazz.superConstructor (this, java.awt.image.IndexColorModel, [bits, java.awt.image.IndexColorModel.alphaBits, java.awt.color.ColorSpace.getInstance (1000), true, false, 3, java.awt.image.ColorModel.getDefaultTransferType (bits)]);
if (bits < 1 || bits > 16) {
throw  new IllegalArgumentException ("Number of bits must be between 1 and 16.");
}this.setRGBs (size, r, g, b, a);
this.calculatePixelMask ();
}, "~N,~N,~A,~A,~A,~A");
Clazz.makeConstructor (c$, 
function (bits, size, cmap, start, hasalpha) {
this.construct (bits, size, cmap, start, hasalpha, -1);
if (bits < 1 || bits > 16) {
throw  new IllegalArgumentException ("Number of bits must be between 1 and 16.");
}}, "~N,~N,~A,~N,~B");
Clazz.makeConstructor (c$, 
function (bits, size, cmap, start, hasalpha, trans) {
Clazz.superConstructor (this, java.awt.image.IndexColorModel, [bits, java.awt.image.IndexColorModel.opaqueBits, java.awt.color.ColorSpace.getInstance (1000), false, false, 1, java.awt.image.ColorModel.getDefaultTransferType (bits)]);
if (bits < 1 || bits > 16) {
throw  new IllegalArgumentException ("Number of bits must be between 1 and 16.");
}if (size < 1) {
throw  new IllegalArgumentException ("Map size (" + size + ") must be >= 1");
}this.map_size = size;
this.rgb =  Clazz.newIntArray (this.calcRealMapSize (bits, size), 0);
var j = start;
var alpha = 0xff;
var allgray = true;
var transparency = 1;
for (var i = 0; i < size; i++) {
var r = cmap[j++] & 0xff;
var g = cmap[j++] & 0xff;
var b = cmap[j++] & 0xff;
allgray = allgray && (r == g) && (g == b);
if (hasalpha) {
alpha = cmap[j++] & 0xff;
if (alpha != 0xff) {
if (alpha == 0x00) {
if (transparency == 1) {
transparency = 2;
}if (this.transparent_index < 0) {
this.transparent_index = i;
}} else {
transparency = 3;
}allgray = false;
}}this.rgb[i] = (alpha << 24) | (r << 16) | (g << 8) | b;
}
this.allgrayopaque = allgray;
this.setTransparency (transparency);
this.setTransparentPixel (trans);
this.calculatePixelMask ();
}, "~N,~N,~A,~N,~B,~N");
Clazz.makeConstructor (c$, 
function (bits, size, cmap, start, hasalpha, trans, transferType) {
Clazz.superConstructor (this, java.awt.image.IndexColorModel, [bits, java.awt.image.IndexColorModel.opaqueBits, java.awt.color.ColorSpace.getInstance (1000), false, false, 1, transferType]);
if (bits < 1 || bits > 16) {
throw  new IllegalArgumentException ("Number of bits must be between 1 and 16.");
}if (size < 1) {
throw  new IllegalArgumentException ("Map size (" + size + ") must be >= 1");
}if ((transferType != 0) && (transferType != 1)) {
throw  new IllegalArgumentException ("transferType must be eitherDataBuffer.TYPE_BYTE or DataBuffer.TYPE_USHORT");
}this.setRGBs (size, cmap, start, hasalpha);
this.setTransparentPixel (trans);
this.calculatePixelMask ();
}, "~N,~N,~A,~N,~B,~N,~N");
Clazz.defineMethod (c$, "setRGBs", 
 function (size, r, g, b, a) {
if (size < 1) {
throw  new IllegalArgumentException ("Map size (" + size + ") must be >= 1");
}this.map_size = size;
this.rgb =  Clazz.newIntArray (this.calcRealMapSize (this.pixel_bits, size), 0);
var alpha = 0xff;
var transparency = 1;
var allgray = true;
for (var i = 0; i < size; i++) {
var rc = r[i] & 0xff;
var gc = g[i] & 0xff;
var bc = b[i] & 0xff;
allgray = allgray && (rc == gc) && (gc == bc);
if (a != null) {
alpha = a[i] & 0xff;
if (alpha != 0xff) {
if (alpha == 0x00) {
if (transparency == 1) {
transparency = 2;
}if (this.transparent_index < 0) {
this.transparent_index = i;
}} else {
transparency = 3;
}allgray = false;
}}this.rgb[i] = (alpha << 24) | (rc << 16) | (gc << 8) | bc;
}
this.allgrayopaque = allgray;
this.setTransparency (transparency);
}, "~N,~A,~A,~A,~A");
Clazz.defineMethod (c$, "setRGBs", 
 function (size, cmap, start, hasalpha) {
this.map_size = size;
this.rgb =  Clazz.newIntArray (this.calcRealMapSize (this.pixel_bits, size), 0);
var j = start;
var transparency = 1;
var allgray = true;
for (var i = 0; i < size; i++, j++) {
var cmaprgb = cmap[j];
var r = (cmaprgb >> 16) & 0xff;
var g = (cmaprgb >> 8) & 0xff;
var b = (cmaprgb) & 0xff;
allgray = allgray && (r == g) && (g == b);
if (hasalpha) {
var alpha = cmaprgb >>> 24;
if (alpha != 0xff) {
if (alpha == 0x00) {
if (transparency == 1) {
transparency = 2;
}if (this.transparent_index < 0) {
this.transparent_index = i;
}} else {
transparency = 3;
}allgray = false;
}} else {
cmaprgb |= 0xff000000;
}this.rgb[i] = cmaprgb;
}
this.allgrayopaque = allgray;
this.setTransparency (transparency);
}, "~N,~A,~N,~B");
Clazz.defineMethod (c$, "calcRealMapSize", 
 function (bits, size) {
var newSize = Math.max (1 << bits, size);
return Math.max (newSize, 256);
}, "~N,~N");
Clazz.overrideMethod (c$, "getTransparency", 
function () {
return this.transparency;
});
Clazz.defineMethod (c$, "getComponentSize", 
function () {
if (this.nBits == null) {
if (this.supportsAlpha) {
this.nBits =  Clazz.newIntArray (4, 0);
this.nBits[3] = 8;
} else {
this.nBits =  Clazz.newIntArray (3, 0);
}this.nBits[0] = this.nBits[1] = this.nBits[2] = 8;
}return this.nBits;
});
Clazz.defineMethod (c$, "getMapSize", 
function () {
return this.map_size;
});
Clazz.defineMethod (c$, "getTransparentPixel", 
function () {
return this.transparent_index;
});
Clazz.defineMethod (c$, "getReds", 
function (r) {
for (var i = 0; i < this.map_size; i++) {
r[i] = (this.rgb[i] >> 16);
}
}, "~A");
Clazz.defineMethod (c$, "getGreens", 
function (g) {
for (var i = 0; i < this.map_size; i++) {
g[i] = (this.rgb[i] >> 8);
}
}, "~A");
Clazz.defineMethod (c$, "getBlues", 
function (b) {
for (var i = 0; i < this.map_size; i++) {
b[i] = this.rgb[i];
}
}, "~A");
Clazz.defineMethod (c$, "getAlphas", 
function (a) {
for (var i = 0; i < this.map_size; i++) {
a[i] = (this.rgb[i] >> 24);
}
}, "~A");
Clazz.defineMethod (c$, "getRGBs", 
function (rgb) {
System.arraycopy (this.rgb, 0, rgb, 0, this.map_size);
}, "~A");
Clazz.defineMethod (c$, "setTransparentPixel", 
 function (trans) {
if (trans >= 0 && trans < this.map_size) {
this.rgb[trans] &= 0x00ffffff;
this.transparent_index = trans;
this.allgrayopaque = false;
if (this.transparency == 1) {
this.setTransparency (2);
}}}, "~N");
Clazz.defineMethod (c$, "setTransparency", 
 function (transparency) {
if (this.transparency != transparency) {
this.transparency = transparency;
if (transparency == 1) {
this.supportsAlpha = false;
this.numComponents = 3;
this.nBits = java.awt.image.IndexColorModel.opaqueBits;
} else {
this.supportsAlpha = true;
this.numComponents = 4;
this.nBits = java.awt.image.IndexColorModel.alphaBits;
}}}, "~N");
Clazz.defineMethod (c$, "calculatePixelMask", 
 function () {
var maskbits = this.pixel_bits;
if (maskbits == 3) {
maskbits = 4;
} else if (maskbits > 4 && maskbits < 8) {
maskbits = 8;
}this.pixel_mask = (1 << maskbits) - 1;
});
Clazz.defineMethod (c$, "getRed", 
function (pixel) {
return (this.rgb[pixel & this.pixel_mask] >> 16) & 0xff;
}, "~N");
Clazz.defineMethod (c$, "getGreen", 
function (pixel) {
return (this.rgb[pixel & this.pixel_mask] >> 8) & 0xff;
}, "~N");
Clazz.defineMethod (c$, "getBlue", 
function (pixel) {
return this.rgb[pixel & this.pixel_mask] & 0xff;
}, "~N");
Clazz.defineMethod (c$, "getAlpha", 
function (pixel) {
return (this.rgb[pixel & this.pixel_mask] >> 24) & 0xff;
}, "~N");
Clazz.defineMethod (c$, "getRGB", 
function (pixel) {
return this.rgb[pixel & this.pixel_mask];
}, "~N");
Clazz.defineMethod (c$, "getDataElements", 
function (rgb, pixel) {
var red = (rgb >> 16) & 0xff;
var green = (rgb >> 8) & 0xff;
var blue = rgb & 0xff;
var alpha = (rgb >>> 24);
var pix = 0;
for (var i = 38; i >= 0; i -= 2) {
if ((pix = this.lookupcache[i]) == 0) {
break;
}if (rgb == this.lookupcache[i + 1]) {
return this.installpixel (pixel, ~pix);
}}
if (this.allgrayopaque) {
var minDist = 256;
var d;
var gray = Clazz.doubleToInt ((red * 77 + green * 150 + blue * 29 + 128) / 256);
for (var i = 0; i < this.map_size; i++) {
if (this.rgb[i] == 0x0) {
continue;
}d = (this.rgb[i] & 0xff) - gray;
if (d < 0) d = -d;
if (d < minDist) {
pix = i;
if (d == 0) {
break;
}minDist = d;
}}
} else if (this.transparency == 1) {
var smallestError = 2147483647;
var lut = this.rgb;
var lutrgb;
for (var i = 0; i < this.map_size; i++) {
lutrgb = lut[i];
if (lutrgb == rgb && lutrgb != 0) {
pix = i;
smallestError = 0;
break;
}}
if (smallestError != 0) {
for (var i = 0; i < this.map_size; i++) {
lutrgb = lut[i];
if (lutrgb == 0) {
continue;
}var tmp = ((lutrgb >> 16) & 0xff) - red;
var currentError = tmp * tmp;
if (currentError < smallestError) {
tmp = ((lutrgb >> 8) & 0xff) - green;
currentError += tmp * tmp;
if (currentError < smallestError) {
tmp = (lutrgb & 0xff) - blue;
currentError += tmp * tmp;
if (currentError < smallestError) {
pix = i;
smallestError = currentError;
}}}}
}} else if (alpha == 0 && this.transparent_index >= 0) {
pix = this.transparent_index;
} else {
var smallestError = 2147483647;
var lut = this.rgb;
for (var i = 0; i < this.map_size; i++) {
var lutrgb = lut[i];
if (lutrgb == rgb) {
pix = i;
break;
}var tmp = ((lutrgb >> 16) & 0xff) - red;
var currentError = tmp * tmp;
if (currentError < smallestError) {
tmp = ((lutrgb >> 8) & 0xff) - green;
currentError += tmp * tmp;
if (currentError < smallestError) {
tmp = (lutrgb & 0xff) - blue;
currentError += tmp * tmp;
if (currentError < smallestError) {
tmp = (lutrgb >>> 24) - alpha;
currentError += tmp * tmp;
if (currentError < smallestError) {
pix = i;
smallestError = currentError;
}}}}}
}System.arraycopy (this.lookupcache, 2, this.lookupcache, 0, 38);
this.lookupcache[39] = rgb;
this.lookupcache[38] = ~pix;
return this.installpixel (pixel, pix);
}, "~N,~O");
Clazz.defineMethod (c$, "installpixel", 
 function (pixel, pix) {
switch (this.transferType) {
case 3:
var intObj;
if (pixel == null) {
pixel = intObj =  Clazz.newIntArray (1, 0);
} else {
intObj = pixel;
}intObj[0] = pix;
break;
case 0:
var byteObj;
if (pixel == null) {
pixel = byteObj =  Clazz.newByteArray (1, 0);
} else {
byteObj = pixel;
}byteObj[0] = pix;
break;
case 1:
var shortObj;
if (pixel == null) {
pixel = shortObj =  Clazz.newShortArray (1, 0);
} else {
shortObj = pixel;
}shortObj[0] = pix;
break;
default:
throw  new UnsupportedOperationException ("This method has not been " + "implemented for transferType " + this.transferType);
}
return pixel;
}, "~O,~N");
Clazz.defineMethod (c$, "getComponents", 
function (pixel, components, offset) {
if (components == null) {
components =  Clazz.newIntArray (offset + this.numComponents, 0);
}components[offset + 0] = this.getRed (pixel);
components[offset + 1] = this.getGreen (pixel);
components[offset + 2] = this.getBlue (pixel);
if (this.supportsAlpha && (components.length - offset) > 3) {
components[offset + 3] = this.getAlpha (pixel);
}return components;
}, "~N,~A,~N");
Clazz.defineMethod (c$, "getComponents", 
function (pixel, components, offset) {
var intpixel;
switch (this.transferType) {
case 0:
var bdata = pixel;
intpixel = bdata[0] & 0xff;
break;
case 1:
var sdata = pixel;
intpixel = sdata[0] & 0xffff;
break;
case 3:
var idata = pixel;
intpixel = idata[0];
break;
default:
throw  new UnsupportedOperationException ("This method has not been " + "implemented for transferType " + this.transferType);
}
return this.getComponents (intpixel, components, offset);
}, "~O,~A,~N");
Clazz.defineMethod (c$, "getDataElement", 
function (components, offset) {
var rgb = (components[offset + 0] << 16) | (components[offset + 1] << 8) | (components[offset + 2]);
if (this.supportsAlpha) {
rgb |= (components[offset + 3] << 24);
} else {
rgb |= 0xff000000;
}var inData = this.getDataElements (rgb, null);
var pixel;
switch (this.transferType) {
case 0:
var bdata = inData;
pixel = bdata[0] & 0xff;
break;
case 1:
var sdata = inData;
pixel = sdata[0];
break;
case 3:
var idata = inData;
pixel = idata[0];
break;
default:
throw  new UnsupportedOperationException ("This method has not been " + "implemented for transferType " + this.transferType);
}
return pixel;
}, "~A,~N");
Clazz.defineMethod (c$, "getDataElements", 
function (components, offset, pixel) {
var rgb = (components[offset + 0] << 16) | (components[offset + 1] << 8) | (components[offset + 2]);
if (this.supportsAlpha) {
rgb |= (components[offset + 3] << 24);
} else {
rgb &= 0xff000000;
}return this.getDataElements (rgb, pixel);
}, "~A,~N,~O");
Clazz.defineMethod (c$, "createCompatibleWritableRaster", 
function (w, h) {
var raster;
if (this.pixel_bits == 1 || this.pixel_bits == 2 || this.pixel_bits == 4) {
raster = java.awt.image.Raster.createPackedRaster (0, w, h, 1, this.pixel_bits, null);
} else {
throw  new UnsupportedOperationException ("This method is not supported  for pixel bits > 16.");
}return raster;
}, "~N,~N");
Clazz.overrideMethod (c$, "isCompatibleRaster", 
function (raster) {
var size = raster.getSampleModel ().getSampleSize (0);
return ((raster.getTransferType () == this.transferType) && (raster.getNumBands () == 1) && ((1 << size) >= this.map_size));
}, "java.awt.image.Raster");
Clazz.overrideMethod (c$, "createCompatibleSampleModel", 
function (w, h) {
var off =  Clazz.newIntArray (1, 0);
off[0] = 0;
if (this.pixel_bits == 1 || this.pixel_bits == 2 || this.pixel_bits == 4) {
return  new java.awt.image.MultiPixelPackedSampleModel (this.transferType, w, h, this.pixel_bits);
} else {
return  new java.awt.image.ComponentSampleModel (this.transferType, w, h, 1, w, off);
}}, "~N,~N");
Clazz.overrideMethod (c$, "isCompatibleSampleModel", 
function (sm) {
if (!(Clazz.instanceOf (sm, java.awt.image.ComponentSampleModel)) && !(Clazz.instanceOf (sm, java.awt.image.MultiPixelPackedSampleModel))) {
return false;
}if (sm.getTransferType () != this.transferType) {
return false;
}if (sm.getNumBands () != 1) {
return false;
}return true;
}, "java.awt.image.SampleModel");
Clazz.defineMethod (c$, "convertToIntDiscrete", 
function (raster, forceARGB) {
var cm;
if (!this.isCompatibleRaster (raster)) {
throw  new IllegalArgumentException ("This raster is not compatiblewith this IndexColorModel.");
}if (forceARGB || this.transparency == 3) {
cm = java.awt.image.ColorModel.getRGBdefault ();
} else if (this.transparency == 2) {
cm =  new java.awt.image.DirectColorModel (25, 0xff0000, 0x00ff00, 0x0000ff, 0x1000000);
} else {
cm =  new java.awt.image.DirectColorModel (24, 0xff0000, 0x00ff00, 0x0000ff);
}var w = raster.getWidth ();
var h = raster.getHeight ();
var discreteRaster = cm.createCompatibleWritableRaster (w, h);
var obj = null;
var data = null;
var rX = raster.getMinX ();
var rY = raster.getMinY ();
for (var y = 0; y < h; y++, rY++) {
obj = raster.getDataElements (rX, rY, w, 1, obj);
if (Clazz.instanceOf (obj, Array)) {
data = obj;
} else {
data = java.awt.image.DataBuffer.toIntArray (obj);
}for (var x = 0; x < w; x++) {
data[x] = this.rgb[data[x] & this.pixel_mask];
}
discreteRaster.setDataElements (0, y, w, 1, data);
}
return  new java.awt.image.BufferedImage (cm, discreteRaster, false, null);
}, "java.awt.image.Raster,~B");
Clazz.defineMethod (c$, "isValid", 
function (pixel) {
return true;
}, "~N");
Clazz.defineMethod (c$, "isValid", 
function () {
return true;
});
Clazz.overrideMethod (c$, "finalize", 
function () {
});
Clazz.overrideMethod (c$, "toString", 
function () {
return  String.instantialize ("IndexColorModel: #pixelBits = " + this.pixel_bits + " numComponents = " + this.numComponents + " color space = " + this.colorSpace + " transparency = " + this.transparency + " transIndex   = " + this.transparent_index + " has alpha = " + this.supportsAlpha + " isAlphaPre = " + this.$isAlphaPremultiplied);
});
Clazz.defineStatics (c$,
"opaqueBits",  Clazz.newIntArray (-1, [8, 8, 8]),
"alphaBits",  Clazz.newIntArray (-1, [8, 8, 8, 8]),
"CACHESIZE", 40);
});
