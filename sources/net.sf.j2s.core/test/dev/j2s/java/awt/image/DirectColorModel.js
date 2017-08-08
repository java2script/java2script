Clazz.declarePackage ("java.awt.image");
Clazz.load (["java.awt.image.PackedColorModel"], "java.awt.image.DirectColorModel", ["java.lang.ClassCastException", "$.IllegalArgumentException", "$.UnsupportedOperationException", "java.awt.color.ColorSpace", "java.awt.image.ColorModel", "$.Raster"], function () {
c$ = Clazz.decorateAsClass (function () {
this.red_mask = 0;
this.green_mask = 0;
this.blue_mask = 0;
this.alpha_mask = 0;
this.is_LinearRGB = false;
this.lRGBprecision = 0;
this.tosRGB8LUT = null;
this.fromsRGB8LUT8 = null;
this.fromsRGB8LUT16 = null;
Clazz.instantialize (this, arguments);
}, java.awt.image, "DirectColorModel", java.awt.image.PackedColorModel);
Clazz.makeConstructor (c$, 
function (bits, rmask, gmask, bmask) {
this.construct (bits, rmask, gmask, bmask, 0);
}, "~N,~N,~N,~N");
Clazz.makeConstructor (c$, 
function (bits, rmask, gmask, bmask, amask) {
Clazz.superConstructor (this, java.awt.image.DirectColorModel, [java.awt.color.ColorSpace.getInstance (1000), bits, rmask, gmask, bmask, amask, false, amask == 0 ? 1 : 3, java.awt.image.ColorModel.getDefaultTransferType (bits)]);
}, "~N,~N,~N,~N,~N");
Clazz.makeConstructor (c$, 
function (space, bits, rmask, gmask, bmask, amask, isAlphaPremultiplied, transferType) {
Clazz.superConstructor (this, java.awt.image.DirectColorModel, [space, bits, rmask, gmask, bmask, amask, isAlphaPremultiplied, amask == 0 ? 1 : 3, transferType]);
}, "java.awt.color.ColorSpace,~N,~N,~N,~N,~N,~B,~N");
Clazz.defineMethod (c$, "getRedMask", 
function () {
return this.maskArray[0];
});
Clazz.defineMethod (c$, "getGreenMask", 
function () {
return this.maskArray[1];
});
Clazz.defineMethod (c$, "getBlueMask", 
function () {
return this.maskArray[2];
});
Clazz.defineMethod (c$, "getAlphaMask", 
function () {
if (this.supportsAlpha) {
return this.maskArray[3];
} else {
return 0;
}});
Clazz.defineMethod (c$, "getDefaultRGBComponents", 
 function (pixel) {
var components = this.getComponents (pixel, null, 0);
var norm = this.getNormalizedComponents (components, 0, null, 0);
return this.colorSpace.toRGB (norm);
}, "~N");
Clazz.defineMethod (c$, "getsRGBComponentFromsRGB", 
 function (pixel, idx) {
var c = ((pixel & this.maskArray[idx]) >>> this.maskOffsets[idx]);
if (this.$isAlphaPremultiplied) {
var a = ((pixel & this.maskArray[3]) >>> this.maskOffsets[3]);
c = (a == 0) ? 0 : Clazz.floatToInt (((c * this.scaleFactors[idx]) * 255.0 / (a * this.scaleFactors[3])) + 0.5);
} else if (this.scaleFactors[idx] != 1.0) {
c = Clazz.floatToInt ((c * this.scaleFactors[idx]) + 0.5);
}return c;
}, "~N,~N");
Clazz.defineMethod (c$, "getsRGBComponentFromLinearRGB", 
 function (pixel, idx) {
var c = ((pixel & this.maskArray[idx]) >>> this.maskOffsets[idx]);
if (this.$isAlphaPremultiplied) {
var factor = ((1 << this.lRGBprecision) - 1);
var a = ((pixel & this.maskArray[3]) >>> this.maskOffsets[3]);
c = (a == 0) ? 0 : Clazz.floatToInt (((c * this.scaleFactors[idx]) * factor / (a * this.scaleFactors[3])) + 0.5);
} else if (this.nBits[idx] != this.lRGBprecision) {
if (this.lRGBprecision == 16) {
c = Clazz.floatToInt ((c * this.scaleFactors[idx] * 257.0) + 0.5);
} else {
c = Clazz.floatToInt ((c * this.scaleFactors[idx]) + 0.5);
}}return this.tosRGB8LUT[c] & 0xff;
}, "~N,~N");
Clazz.defineMethod (c$, "getRed", 
function (pixel) {
if (this.is_sRGB) {
return this.getsRGBComponentFromsRGB (pixel, 0);
} else if (this.is_LinearRGB) {
return this.getsRGBComponentFromLinearRGB (pixel, 0);
}var rgb = this.getDefaultRGBComponents (pixel);
return Clazz.floatToInt (rgb[0] * 255.0 + 0.5);
}, "~N");
Clazz.defineMethod (c$, "getGreen", 
function (pixel) {
if (this.is_sRGB) {
return this.getsRGBComponentFromsRGB (pixel, 1);
} else if (this.is_LinearRGB) {
return this.getsRGBComponentFromLinearRGB (pixel, 1);
}var rgb = this.getDefaultRGBComponents (pixel);
return Clazz.floatToInt (rgb[1] * 255.0 + 0.5);
}, "~N");
Clazz.defineMethod (c$, "getBlue", 
function (pixel) {
if (this.is_sRGB) {
return this.getsRGBComponentFromsRGB (pixel, 2);
} else if (this.is_LinearRGB) {
return this.getsRGBComponentFromLinearRGB (pixel, 2);
}var rgb = this.getDefaultRGBComponents (pixel);
return Clazz.floatToInt (rgb[2] * 255.0 + 0.5);
}, "~N");
Clazz.defineMethod (c$, "getAlpha", 
function (pixel) {
if (!this.supportsAlpha) return 255;
var a = ((pixel & this.maskArray[3]) >>> this.maskOffsets[3]);
if (this.scaleFactors[3] != 1.0) {
a = Clazz.floatToInt (a * this.scaleFactors[3] + 0.5);
}return a;
}, "~N");
Clazz.defineMethod (c$, "getRGB", 
function (pixel) {
if (this.is_sRGB || this.is_LinearRGB) {
return (this.getAlpha (pixel) << 24) | (this.getRed (pixel) << 16) | (this.getGreen (pixel) << 8) | (this.getBlue (pixel) << 0);
}var rgb = this.getDefaultRGBComponents (pixel);
return (this.getAlpha (pixel) << 24) | ((Clazz.floatToInt (rgb[0] * 255.0 + 0.5)) << 16) | ((Clazz.floatToInt (rgb[1] * 255.0 + 0.5)) << 8) | ((Clazz.floatToInt (rgb[2] * 255.0 + 0.5)) << 0);
}, "~N");
Clazz.defineMethod (c$, "getRed", 
function (inData) {
var pixel = 0;
switch (this.transferType) {
case 0:
var bdata = inData;
pixel = bdata[0] & 0xff;
break;
case 3:
var idata = inData;
pixel = idata[0];
break;
default:
throw  new UnsupportedOperationException ("This method has not been " + "implemented for transferType " + this.transferType);
}
return this.getRed (pixel);
}, "~O");
Clazz.defineMethod (c$, "getGreen", 
function (inData) {
var pixel = 0;
switch (this.transferType) {
case 0:
var bdata = inData;
pixel = bdata[0] & 0xff;
break;
case 3:
var idata = inData;
pixel = idata[0];
break;
default:
throw  new UnsupportedOperationException ("This method has not been " + "implemented for transferType " + this.transferType);
}
return this.getGreen (pixel);
}, "~O");
Clazz.defineMethod (c$, "getBlue", 
function (inData) {
var pixel = 0;
switch (this.transferType) {
case 0:
var bdata = inData;
pixel = bdata[0] & 0xff;
break;
case 3:
var idata = inData;
pixel = idata[0];
break;
default:
throw  new UnsupportedOperationException ("This method has not been " + "implemented for transferType " + this.transferType);
}
return this.getBlue (pixel);
}, "~O");
Clazz.defineMethod (c$, "getAlpha", 
function (inData) {
var pixel = 0;
switch (this.transferType) {
case 0:
var bdata = inData;
pixel = bdata[0] & 0xff;
break;
case 3:
var idata = inData;
pixel = idata[0];
break;
default:
throw  new UnsupportedOperationException ("This method has not been " + "implemented for transferType " + this.transferType);
}
return this.getAlpha (pixel);
}, "~O");
Clazz.defineMethod (c$, "getRGB", 
function (inData) {
var pixel = 0;
switch (this.transferType) {
case 0:
var bdata = inData;
pixel = bdata[0] & 0xff;
break;
case 3:
var idata = inData;
pixel = idata[0];
break;
default:
throw  new UnsupportedOperationException ("This method has not been " + "implemented for transferType " + this.transferType);
}
return this.getRGB (pixel);
}, "~O");
Clazz.defineMethod (c$, "getDataElements", 
function (rgb, pixel) {
var intpixel = null;
if (this.transferType == 3 && pixel != null) {
intpixel = pixel;
intpixel[0] = 0;
} else {
intpixel =  Clazz.newIntArray (1, 0);
}var defaultCM = java.awt.image.ColorModel.getRGBdefault ();
if (this === defaultCM || this.equals (defaultCM)) {
intpixel[0] = rgb;
return intpixel;
}var red;
var grn;
var blu;
var alp;
red = (rgb >> 16) & 0xff;
grn = (rgb >> 8) & 0xff;
blu = rgb & 0xff;
if (this.is_sRGB || this.is_LinearRGB) {
var precision;
var factor;
if (this.is_LinearRGB) {
if (this.lRGBprecision == 8) {
red = this.fromsRGB8LUT8[red] & 0xff;
grn = this.fromsRGB8LUT8[grn] & 0xff;
blu = this.fromsRGB8LUT8[blu] & 0xff;
precision = 8;
factor = 0.003921569;
} else {
red = this.fromsRGB8LUT16[red] & 0xffff;
grn = this.fromsRGB8LUT16[grn] & 0xffff;
blu = this.fromsRGB8LUT16[blu] & 0xffff;
precision = 16;
factor = 1.5259022E-5;
}} else {
precision = 8;
factor = 0.003921569;
}if (this.supportsAlpha) {
alp = (rgb >> 24) & 0xff;
if (this.$isAlphaPremultiplied) {
factor *= (alp * (0.003921569));
precision = -1;
}if (this.nBits[3] != 8) {
alp = Clazz.floatToInt ((alp * (0.003921569) * ((1 << this.nBits[3]) - 1)) + 0.5);
if (alp > ((1 << this.nBits[3]) - 1)) {
alp = (1 << this.nBits[3]) - 1;
}}intpixel[0] = alp << this.maskOffsets[3];
}if (this.nBits[0] != precision) {
red = Clazz.floatToInt ((red * factor * ((1 << this.nBits[0]) - 1)) + 0.5);
}if (this.nBits[1] != precision) {
grn = Clazz.floatToInt ((grn * factor * ((1 << this.nBits[1]) - 1)) + 0.5);
}if (this.nBits[2] != precision) {
blu = Clazz.floatToInt ((blu * factor * ((1 << this.nBits[2]) - 1)) + 0.5);
}} else {
var norm =  Clazz.newFloatArray (3, 0);
var factor = 0.003921569;
norm[0] = red * factor;
norm[1] = grn * factor;
norm[2] = blu * factor;
norm = this.colorSpace.fromRGB (norm);
if (this.supportsAlpha) {
alp = (rgb >> 24) & 0xff;
if (this.$isAlphaPremultiplied) {
factor *= alp;
for (var i = 0; i < 3; i++) {
norm[i] *= factor;
}
}if (this.nBits[3] != 8) {
alp = Clazz.floatToInt ((alp * (0.003921569) * ((1 << this.nBits[3]) - 1)) + 0.5);
if (alp > ((1 << this.nBits[3]) - 1)) {
alp = (1 << this.nBits[3]) - 1;
}}intpixel[0] = alp << this.maskOffsets[3];
}red = Clazz.floatToInt ((norm[0] * ((1 << this.nBits[0]) - 1)) + 0.5);
grn = Clazz.floatToInt ((norm[1] * ((1 << this.nBits[1]) - 1)) + 0.5);
blu = Clazz.floatToInt ((norm[2] * ((1 << this.nBits[2]) - 1)) + 0.5);
}if (this.maxBits > 23) {
if (red > ((1 << this.nBits[0]) - 1)) {
red = (1 << this.nBits[0]) - 1;
}if (grn > ((1 << this.nBits[1]) - 1)) {
grn = (1 << this.nBits[1]) - 1;
}if (blu > ((1 << this.nBits[2]) - 1)) {
blu = (1 << this.nBits[2]) - 1;
}}intpixel[0] |= (red << this.maskOffsets[0]) | (grn << this.maskOffsets[1]) | (blu << this.maskOffsets[2]);
switch (this.transferType) {
case 0:
{
var bdata;
if (pixel == null) {
bdata =  Clazz.newByteArray (1, 0);
} else {
bdata = pixel;
}bdata[0] = (0xff & intpixel[0]);
return bdata;
}case 3:
return intpixel;
}
throw  new UnsupportedOperationException ("This method has not been " + "implemented for transferType " + this.transferType);
}, "~N,~O");
Clazz.defineMethod (c$, "getComponents", 
function (pixel, components, offset) {
if (components == null) {
components =  Clazz.newIntArray (offset + this.numComponents, 0);
}for (var i = 0; i < this.numComponents; i++) {
components[offset + i] = (pixel & this.maskArray[i]) >>> this.maskOffsets[i];
}
return components;
}, "~N,~A,~N");
Clazz.defineMethod (c$, "getComponents", 
function (pixel, components, offset) {
var intpixel = 0;
switch (this.transferType) {
case 0:
var bdata = pixel;
intpixel = bdata[0] & 0xff;
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
Clazz.overrideMethod (c$, "createCompatibleWritableRaster", 
function (w, h) {
if ((w <= 0) || (h <= 0)) {
throw  new IllegalArgumentException ("Width (" + w + ") and height (" + h + ") cannot be <= 0");
}var bandmasks;
if (this.supportsAlpha) {
bandmasks =  Clazz.newIntArray (4, 0);
bandmasks[3] = this.alpha_mask;
} else {
bandmasks =  Clazz.newIntArray (3, 0);
}bandmasks[0] = this.red_mask;
bandmasks[1] = this.green_mask;
bandmasks[2] = this.blue_mask;
if (this.pixel_bits > 8) {
return java.awt.image.Raster.createPackedRaster (3, w, h, bandmasks, null);
} else {
return java.awt.image.Raster.createPackedRaster (0, w, h, bandmasks, null);
}}, "~N,~N");
Clazz.defineMethod (c$, "getDataElement", 
function (components, offset) {
var pixel = 0;
for (var i = 0; i < this.numComponents; i++) {
pixel |= ((components[offset + i] << this.maskOffsets[i]) & this.maskArray[i]);
}
return pixel;
}, "~A,~N");
Clazz.defineMethod (c$, "getDataElements", 
function (components, offset, obj) {
var pixel = 0;
for (var i = 0; i < this.numComponents; i++) {
pixel |= ((components[offset + i] << this.maskOffsets[i]) & this.maskArray[i]);
}
switch (this.transferType) {
case 0:
if (Clazz.instanceOf (obj, Array)) {
var bdata = obj;
bdata[0] = (pixel & 0xff);
return bdata;
} else {
var bdata =  Clazz.newByteArray (-1, [(pixel & 0xff)]);
return bdata;
}case 3:
if (Clazz.instanceOf (obj, Array)) {
var idata = obj;
idata[0] = pixel;
return idata;
} else {
var idata =  Clazz.newIntArray (-1, [pixel]);
return idata;
}default:
throw  new ClassCastException ("This method has not been " + "implemented for transferType " + this.transferType);
}
}, "~A,~N,~O");
Clazz.overrideMethod (c$, "toString", 
function () {
return  String.instantialize ("DirectColorModel: rmask=" + Integer.toHexString (this.red_mask) + " gmask=" + Integer.toHexString (this.green_mask) + " bmask=" + Integer.toHexString (this.blue_mask) + " amask=" + Integer.toHexString (this.alpha_mask));
});
});
