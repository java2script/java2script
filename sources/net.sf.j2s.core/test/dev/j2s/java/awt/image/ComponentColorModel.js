Clazz.declarePackage ("java.awt.image");
Clazz.load (["java.awt.image.ColorModel"], "java.awt.image.ComponentColorModel", ["java.lang.IllegalArgumentException", "$.UnsupportedOperationException", "java.util.Arrays", "java.awt.image.ComponentSampleModel", "$.DataBuffer", "$.Raster"], function () {
c$ = Clazz.decorateAsClass (function () {
this.signed = false;
this.is_sRGB_stdScale = false;
this.is_LinearRGB_stdScale = false;
this.is_LinearGray_stdScale = false;
this.is_ICCGray_stdScale = false;
this.tosRGB8LUT = null;
this.fromsRGB8LUT8 = null;
this.fromsRGB8LUT16 = null;
this.fromLinearGray16ToOtherGray8LUT = null;
this.fromLinearGray16ToOtherGray16LUT = null;
this.needScaleInit = false;
this.noUnnorm = false;
this.nonStdScale = false;
this.min = null;
this.diffMinMax = null;
this.compOffset = null;
this.compScale = null;
Clazz.instantialize (this, arguments);
}, java.awt.image, "ComponentColorModel", java.awt.image.ColorModel);
Clazz.makeConstructor (c$, 
function (colorSpace, bits, hasAlpha, isAlphaPremultiplied, transparency, transferType) {
Clazz.superConstructor (this, java.awt.image.ComponentColorModel, [java.awt.image.ComponentColorModel.bitsHelper (transferType, colorSpace, hasAlpha), java.awt.image.ComponentColorModel.bitsArrayHelper (bits, transferType, colorSpace, hasAlpha), colorSpace, hasAlpha, isAlphaPremultiplied, transparency, transferType]);
switch (transferType) {
case 0:
case 1:
case 3:
this.signed = false;
this.needScaleInit = true;
break;
case 2:
this.signed = true;
this.needScaleInit = true;
break;
default:
throw  new IllegalArgumentException ("This constructor is not " + "compatible with transferType " + transferType);
}
this.setupLUTs ();
}, "java.awt.color.ColorSpace,~A,~B,~B,~N,~N");
Clazz.makeConstructor (c$, 
function (colorSpace, hasAlpha, isAlphaPremultiplied, transparency, transferType) {
this.construct (colorSpace, null, hasAlpha, isAlphaPremultiplied, transparency, transferType);
}, "java.awt.color.ColorSpace,~B,~B,~N,~N");
c$.bitsHelper = Clazz.defineMethod (c$, "bitsHelper", 
 function (transferType, colorSpace, hasAlpha) {
var numBits = java.awt.image.DataBuffer.getDataTypeSize (transferType);
var numComponents = colorSpace.getNumComponents ();
if (hasAlpha) {
++numComponents;
}return numBits * numComponents;
}, "~N,java.awt.color.ColorSpace,~B");
c$.bitsArrayHelper = Clazz.defineMethod (c$, "bitsArrayHelper", 
 function (origBits, transferType, colorSpace, hasAlpha) {
switch (transferType) {
case 0:
case 1:
case 3:
if (origBits != null) {
return origBits;
}break;
default:
break;
}
var numBits = java.awt.image.DataBuffer.getDataTypeSize (transferType);
var numComponents = colorSpace.getNumComponents ();
if (hasAlpha) {
++numComponents;
}var bits =  Clazz.newIntArray (numComponents, 0);
for (var i = 0; i < numComponents; i++) {
bits[i] = numBits;
}
return bits;
}, "~A,~N,java.awt.color.ColorSpace,~B");
Clazz.defineMethod (c$, "setupLUTs", 
 function () {
if (this.is_sRGB) {
this.is_sRGB_stdScale = true;
this.nonStdScale = false;
} else if (this.needScaleInit) {
this.nonStdScale = false;
for (var i = 0; i < this.numColorComponents; i++) {
if ((this.colorSpace.getMinValue (i) != 0.0) || (this.colorSpace.getMaxValue (i) != 1.0)) {
this.nonStdScale = true;
break;
}}
if (this.nonStdScale) {
this.min =  Clazz.newFloatArray (this.numColorComponents, 0);
this.diffMinMax =  Clazz.newFloatArray (this.numColorComponents, 0);
for (var i = 0; i < this.numColorComponents; i++) {
this.min[i] = this.colorSpace.getMinValue (i);
this.diffMinMax[i] = this.colorSpace.getMaxValue (i) - this.min[i];
}
}}});
Clazz.defineMethod (c$, "initScale", 
 function () {
this.needScaleInit = false;
if (this.nonStdScale || this.signed) {
this.noUnnorm = true;
} else {
this.noUnnorm = false;
}var lowVal;
var highVal;
switch (this.transferType) {
case 0:
{
var bpixel =  Clazz.newByteArray (this.numComponents, 0);
for (var i = 0; i < this.numColorComponents; i++) {
bpixel[i] = 0;
}
if (this.supportsAlpha) {
bpixel[this.numColorComponents] = ((1 << this.nBits[this.numColorComponents]) - 1);
}lowVal = this.getNormalizedComponents (bpixel, null, 0);
for (var i = 0; i < this.numColorComponents; i++) {
bpixel[i] = ((1 << this.nBits[i]) - 1);
}
highVal = this.getNormalizedComponents (bpixel, null, 0);
}break;
case 1:
{
var uspixel =  Clazz.newShortArray (this.numComponents, 0);
for (var i = 0; i < this.numColorComponents; i++) {
uspixel[i] = 0;
}
if (this.supportsAlpha) {
uspixel[this.numColorComponents] = ((1 << this.nBits[this.numColorComponents]) - 1);
}lowVal = this.getNormalizedComponents (uspixel, null, 0);
for (var i = 0; i < this.numColorComponents; i++) {
uspixel[i] = ((1 << this.nBits[i]) - 1);
}
highVal = this.getNormalizedComponents (uspixel, null, 0);
}break;
case 3:
{
var ipixel =  Clazz.newIntArray (this.numComponents, 0);
for (var i = 0; i < this.numColorComponents; i++) {
ipixel[i] = 0;
}
if (this.supportsAlpha) {
ipixel[this.numColorComponents] = ((1 << this.nBits[this.numColorComponents]) - 1);
}lowVal = this.getNormalizedComponents (ipixel, null, 0);
for (var i = 0; i < this.numColorComponents; i++) {
ipixel[i] = ((1 << this.nBits[i]) - 1);
}
highVal = this.getNormalizedComponents (ipixel, null, 0);
}break;
case 2:
{
var spixel =  Clazz.newShortArray (this.numComponents, 0);
for (var i = 0; i < this.numColorComponents; i++) {
spixel[i] = 0;
}
if (this.supportsAlpha) {
spixel[this.numColorComponents] = 32767;
}lowVal = this.getNormalizedComponents (spixel, null, 0);
for (var i = 0; i < this.numColorComponents; i++) {
spixel[i] = 32767;
}
highVal = this.getNormalizedComponents (spixel, null, 0);
}break;
default:
lowVal = highVal = null;
break;
}
this.nonStdScale = false;
for (var i = 0; i < this.numColorComponents; i++) {
if ((lowVal[i] != 0.0) || (highVal[i] != 1.0)) {
this.nonStdScale = true;
break;
}}
if (this.nonStdScale) {
this.noUnnorm = true;
this.is_sRGB_stdScale = false;
this.is_LinearRGB_stdScale = false;
this.is_LinearGray_stdScale = false;
this.is_ICCGray_stdScale = false;
this.compOffset =  Clazz.newFloatArray (this.numColorComponents, 0);
this.compScale =  Clazz.newFloatArray (this.numColorComponents, 0);
for (var i = 0; i < this.numColorComponents; i++) {
this.compOffset[i] = lowVal[i];
this.compScale[i] = 1.0 / (highVal[i] - lowVal[i]);
}
}});
Clazz.defineMethod (c$, "getRGBComponent", 
 function (pixel, idx) {
if (this.numComponents > 1) {
throw  new IllegalArgumentException ("More than one component per pixel");
}if (this.signed) {
throw  new IllegalArgumentException ("Component value is signed");
}if (this.needScaleInit) {
this.initScale ();
}var opixel = null;
switch (this.transferType) {
case 0:
{
var bpixel =  Clazz.newByteArray (-1, [pixel]);
opixel = bpixel;
}break;
case 1:
{
var spixel =  Clazz.newShortArray (-1, [pixel]);
opixel = spixel;
}break;
case 3:
{
var ipixel =  Clazz.newIntArray (-1, [pixel]);
opixel = ipixel;
}break;
}
var norm = this.getNormalizedComponents (opixel, null, 0);
var rgb = this.colorSpace.toRGB (norm);
return Clazz.floatToInt (rgb[idx] * 255.0 + 0.5);
}, "~N,~N");
Clazz.defineMethod (c$, "getRed", 
function (pixel) {
return this.getRGBComponent (pixel, 0);
}, "~N");
Clazz.defineMethod (c$, "getGreen", 
function (pixel) {
return this.getRGBComponent (pixel, 1);
}, "~N");
Clazz.defineMethod (c$, "getBlue", 
function (pixel) {
return this.getRGBComponent (pixel, 2);
}, "~N");
Clazz.defineMethod (c$, "getAlpha", 
function (pixel) {
if (this.supportsAlpha == false) {
return 255;
}if (this.numComponents > 1) {
throw  new IllegalArgumentException ("More than one component per pixel");
}if (this.signed) {
throw  new IllegalArgumentException ("Component value is signed");
}return Clazz.floatToInt (((pixel) / ((1 << this.nBits[0]) - 1)) * 255.0 + 0.5);
}, "~N");
Clazz.defineMethod (c$, "getRGB", 
function (pixel) {
if (this.numComponents > 1) {
throw  new IllegalArgumentException ("More than one component per pixel");
}if (this.signed) {
throw  new IllegalArgumentException ("Component value is signed");
}return (this.getAlpha (pixel) << 24) | (this.getRed (pixel) << 16) | (this.getGreen (pixel) << 8) | (this.getBlue (pixel) << 0);
}, "~N");
Clazz.defineMethod (c$, "extractComponent", 
 function (inData, idx, precision) {
var needAlpha = (this.supportsAlpha && this.$isAlphaPremultiplied);
var alp = 0;
var comp;
var mask = (1 << this.nBits[idx]) - 1;
switch (this.transferType) {
case 2:
{
var sdata = inData;
var scalefactor = ((1 << precision) - 1);
if (needAlpha) {
var s = sdata[this.numColorComponents];
if (s != 0) {
return Clazz.floatToInt (((sdata[idx]) / (s)) * scalefactor + 0.5);
} else {
return 0;
}} else {
return Clazz.floatToInt ((sdata[idx] / 32767.0) * scalefactor + 0.5);
}}case 0:
var bdata = inData;
comp = bdata[idx] & mask;
precision = 8;
if (needAlpha) {
alp = bdata[this.numColorComponents] & mask;
}break;
case 1:
var usdata = inData;
comp = usdata[idx] & mask;
if (needAlpha) {
alp = usdata[this.numColorComponents] & mask;
}break;
case 3:
var idata = inData;
comp = idata[idx];
if (needAlpha) {
alp = idata[this.numColorComponents];
}break;
default:
throw  new UnsupportedOperationException ("This method has not " + "been implemented for transferType " + this.transferType);
}
if (needAlpha) {
if (alp != 0) {
var scalefactor = ((1 << precision) - 1);
var fcomp = (comp) / (mask);
var invalp = (((1 << this.nBits[this.numColorComponents]) - 1)) / (alp);
return Clazz.floatToInt (fcomp * invalp * scalefactor + 0.5);
} else {
return 0;
}} else {
if (this.nBits[idx] != precision) {
var scalefactor = ((1 << precision) - 1);
var fcomp = (comp) / (mask);
return Clazz.floatToInt (fcomp * scalefactor + 0.5);
}return comp;
}}, "~O,~N,~N");
Clazz.defineMethod (c$, "getRGBComponent", 
 function (inData, idx) {
if (this.needScaleInit) {
this.initScale ();
}if (this.is_sRGB_stdScale) {
return this.extractComponent (inData, idx, 8);
} else if (this.is_LinearRGB_stdScale) {
var lutidx = this.extractComponent (inData, idx, 16);
return this.tosRGB8LUT[lutidx] & 0xff;
} else if (this.is_ICCGray_stdScale) {
var lutidx = this.extractComponent (inData, 0, 16);
return this.tosRGB8LUT[lutidx] & 0xff;
}var norm = this.getNormalizedComponents (inData, null, 0);
var rgb = this.colorSpace.toRGB (norm);
return Clazz.floatToInt (rgb[idx] * 255.0 + 0.5);
}, "~O,~N");
Clazz.defineMethod (c$, "getRed", 
function (inData) {
return this.getRGBComponent (inData, 0);
}, "~O");
Clazz.defineMethod (c$, "getGreen", 
function (inData) {
return this.getRGBComponent (inData, 1);
}, "~O");
Clazz.defineMethod (c$, "getBlue", 
function (inData) {
return this.getRGBComponent (inData, 2);
}, "~O");
Clazz.defineMethod (c$, "getAlpha", 
function (inData) {
if (this.supportsAlpha == false) {
return 255;
}var alpha = 0;
var aIdx = this.numColorComponents;
var mask = (1 << this.nBits[aIdx]) - 1;
switch (this.transferType) {
case 2:
var sdata = inData;
alpha = Clazz.floatToInt ((sdata[aIdx] / 32767.0) * 255.0 + 0.5);
return alpha;
case 0:
var bdata = inData;
alpha = bdata[aIdx] & mask;
break;
case 1:
var usdata = inData;
alpha = usdata[aIdx] & mask;
break;
case 3:
var idata = inData;
alpha = idata[aIdx];
break;
default:
throw  new UnsupportedOperationException ("This method has not " + "been implemented for transferType " + this.transferType);
}
if (this.nBits[aIdx] == 8) {
return alpha;
} else {
return Clazz.floatToInt (((alpha) / (((1 << this.nBits[aIdx]) - 1))) * 255.0 + 0.5);
}}, "~O");
Clazz.defineMethod (c$, "getRGB", 
function (inData) {
if (this.needScaleInit) {
this.initScale ();
}if (this.is_sRGB_stdScale || this.is_LinearRGB_stdScale) {
return (this.getAlpha (inData) << 24) | (this.getRed (inData) << 16) | (this.getGreen (inData) << 8) | (this.getBlue (inData));
} else if (this.colorSpaceType == 6) {
var gray = this.getRed (inData);
return (this.getAlpha (inData) << 24) | (gray << 16) | (gray << 8) | gray;
}var norm = this.getNormalizedComponents (inData, null, 0);
var rgb = this.colorSpace.toRGB (norm);
return (this.getAlpha (inData) << 24) | ((Clazz.floatToInt (rgb[0] * 255.0 + 0.5)) << 16) | ((Clazz.floatToInt (rgb[1] * 255.0 + 0.5)) << 8) | ((Clazz.floatToInt (rgb[2] * 255.0 + 0.5)) << 0);
}, "~O");
Clazz.defineMethod (c$, "getDataElements", 
function (rgb, pixel) {
var red;
var grn;
var blu;
var alp;
red = (rgb >> 16) & 0xff;
grn = (rgb >> 8) & 0xff;
blu = rgb & 0xff;
if (this.needScaleInit) {
this.initScale ();
}if (this.signed) {
switch (this.transferType) {
case 2:
{
var sdata;
if (pixel == null) {
sdata =  Clazz.newShortArray (this.numComponents, 0);
} else {
sdata = pixel;
}var factor;
if (this.is_sRGB_stdScale || this.is_LinearRGB_stdScale) {
factor = 128.49803;
if (this.is_LinearRGB_stdScale) {
red = this.fromsRGB8LUT16[red] & 0xffff;
grn = this.fromsRGB8LUT16[grn] & 0xffff;
blu = this.fromsRGB8LUT16[blu] & 0xffff;
factor = 0.49999237;
}if (this.supportsAlpha) {
alp = (rgb >> 24) & 0xff;
sdata[3] = Clazz.floatToShort (alp * (128.49803) + 0.5);
if (this.$isAlphaPremultiplied) {
factor = alp * factor * (0.003921569);
}}sdata[0] = Clazz.floatToShort (red * factor + 0.5);
sdata[1] = Clazz.floatToShort (grn * factor + 0.5);
sdata[2] = Clazz.floatToShort (blu * factor + 0.5);
} else if (this.is_LinearGray_stdScale) {
red = this.fromsRGB8LUT16[red] & 0xffff;
grn = this.fromsRGB8LUT16[grn] & 0xffff;
blu = this.fromsRGB8LUT16[blu] & 0xffff;
var gray = ((0.2125 * red) + (0.7154 * grn) + (0.0721 * blu)) / 65535.0;
factor = 32767.0;
if (this.supportsAlpha) {
alp = (rgb >> 24) & 0xff;
sdata[1] = Clazz.floatToShort (alp * (128.49803) + 0.5);
if (this.$isAlphaPremultiplied) {
factor = alp * factor * (0.003921569);
}}sdata[0] = Clazz.floatToShort (gray * factor + 0.5);
} else if (this.is_ICCGray_stdScale) {
red = this.fromsRGB8LUT16[red] & 0xffff;
grn = this.fromsRGB8LUT16[grn] & 0xffff;
blu = this.fromsRGB8LUT16[blu] & 0xffff;
var gray = Clazz.floatToInt ((0.2125 * red) + (0.7154 * grn) + (0.0721 * blu) + 0.5);
gray = this.fromLinearGray16ToOtherGray16LUT[gray] & 0xffff;
factor = 0.49999237;
if (this.supportsAlpha) {
alp = (rgb >> 24) & 0xff;
sdata[1] = Clazz.floatToShort (alp * (128.49803) + 0.5);
if (this.$isAlphaPremultiplied) {
factor = alp * factor * (0.003921569);
}}sdata[0] = Clazz.floatToShort (gray * factor + 0.5);
} else {
factor = 0.003921569;
var norm =  Clazz.newFloatArray (3, 0);
norm[0] = red * factor;
norm[1] = grn * factor;
norm[2] = blu * factor;
norm = this.colorSpace.fromRGB (norm);
if (this.nonStdScale) {
for (var i = 0; i < this.numColorComponents; i++) {
norm[i] = (norm[i] - this.compOffset[i]) * this.compScale[i];
if (norm[i] < 0.0) {
norm[i] = 0.0;
}if (norm[i] > 1.0) {
norm[i] = 1.0;
}}
}factor = 32767.0;
if (this.supportsAlpha) {
alp = (rgb >> 24) & 0xff;
sdata[this.numColorComponents] = Clazz.floatToShort (alp * (128.49803) + 0.5);
if (this.$isAlphaPremultiplied) {
factor *= alp * (0.003921569);
}}for (var i = 0; i < this.numColorComponents; i++) {
sdata[i] = Clazz.floatToShort (norm[i] * factor + 0.5);
}
}return sdata;
}}
}var intpixel;
if (this.transferType == 3 && pixel != null) {
intpixel = pixel;
} else {
intpixel =  Clazz.newIntArray (this.numComponents, 0);
}if (this.is_sRGB_stdScale || this.is_LinearRGB_stdScale) {
var precision;
var factor;
if (this.is_LinearRGB_stdScale) {
if (this.transferType == 0) {
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
if (this.nBits[3] == 8) {
intpixel[3] = alp;
} else {
intpixel[3] = Clazz.floatToInt (alp * (0.003921569) * ((1 << this.nBits[3]) - 1) + 0.5);
}if (this.$isAlphaPremultiplied) {
factor *= (alp * (0.003921569));
precision = -1;
}}if (this.nBits[0] == precision) {
intpixel[0] = red;
} else {
intpixel[0] = Clazz.floatToInt (red * factor * ((1 << this.nBits[0]) - 1) + 0.5);
}if (this.nBits[1] == precision) {
intpixel[1] = (grn);
} else {
intpixel[1] = Clazz.floatToInt (grn * factor * ((1 << this.nBits[1]) - 1) + 0.5);
}if (this.nBits[2] == precision) {
intpixel[2] = (blu);
} else {
intpixel[2] = Clazz.floatToInt (blu * factor * ((1 << this.nBits[2]) - 1) + 0.5);
}} else if (this.is_LinearGray_stdScale) {
red = this.fromsRGB8LUT16[red] & 0xffff;
grn = this.fromsRGB8LUT16[grn] & 0xffff;
blu = this.fromsRGB8LUT16[blu] & 0xffff;
var gray = ((0.2125 * red) + (0.7154 * grn) + (0.0721 * blu)) / 65535.0;
if (this.supportsAlpha) {
alp = (rgb >> 24) & 0xff;
if (this.nBits[1] == 8) {
intpixel[1] = alp;
} else {
intpixel[1] = Clazz.floatToInt (alp * (0.003921569) * ((1 << this.nBits[1]) - 1) + 0.5);
}if (this.$isAlphaPremultiplied) {
gray *= (alp * (0.003921569));
}}intpixel[0] = Clazz.floatToInt (gray * ((1 << this.nBits[0]) - 1) + 0.5);
} else if (this.is_ICCGray_stdScale) {
red = this.fromsRGB8LUT16[red] & 0xffff;
grn = this.fromsRGB8LUT16[grn] & 0xffff;
blu = this.fromsRGB8LUT16[blu] & 0xffff;
var gray16 = Clazz.floatToInt ((0.2125 * red) + (0.7154 * grn) + (0.0721 * blu) + 0.5);
var gray = (this.fromLinearGray16ToOtherGray16LUT[gray16] & 0xffff) / 65535.0;
if (this.supportsAlpha) {
alp = (rgb >> 24) & 0xff;
if (this.nBits[1] == 8) {
intpixel[1] = alp;
} else {
intpixel[1] = Clazz.floatToInt (alp * (0.003921569) * ((1 << this.nBits[1]) - 1) + 0.5);
}if (this.$isAlphaPremultiplied) {
gray *= (alp * (0.003921569));
}}intpixel[0] = Clazz.floatToInt (gray * ((1 << this.nBits[0]) - 1) + 0.5);
} else {
var norm =  Clazz.newFloatArray (3, 0);
var factor = 0.003921569;
norm[0] = red * factor;
norm[1] = grn * factor;
norm[2] = blu * factor;
norm = this.colorSpace.fromRGB (norm);
if (this.nonStdScale) {
for (var i = 0; i < this.numColorComponents; i++) {
norm[i] = (norm[i] - this.compOffset[i]) * this.compScale[i];
if (norm[i] < 0.0) {
norm[i] = 0.0;
}if (norm[i] > 1.0) {
norm[i] = 1.0;
}}
}if (this.supportsAlpha) {
alp = (rgb >> 24) & 0xff;
if (this.nBits[this.numColorComponents] == 8) {
intpixel[this.numColorComponents] = alp;
} else {
intpixel[this.numColorComponents] = Clazz.floatToInt (alp * factor * ((1 << this.nBits[this.numColorComponents]) - 1) + 0.5);
}if (this.$isAlphaPremultiplied) {
factor *= alp;
for (var i = 0; i < this.numColorComponents; i++) {
norm[i] *= factor;
}
}}for (var i = 0; i < this.numColorComponents; i++) {
intpixel[i] = Clazz.floatToInt (norm[i] * ((1 << this.nBits[i]) - 1) + 0.5);
}
}switch (this.transferType) {
case 0:
{
var bdata;
if (pixel == null) {
bdata =  Clazz.newByteArray (this.numComponents, 0);
} else {
bdata = pixel;
}for (var i = 0; i < this.numComponents; i++) {
bdata[i] = (0xff & intpixel[i]);
}
return bdata;
}case 1:
{
var sdata;
if (pixel == null) {
sdata =  Clazz.newShortArray (this.numComponents, 0);
} else {
sdata = pixel;
}for (var i = 0; i < this.numComponents; i++) {
sdata[i] = (intpixel[i] & 0xffff);
}
return sdata;
}case 3:
if (this.maxBits > 23) {
for (var i = 0; i < this.numComponents; i++) {
if (intpixel[i] > ((1 << this.nBits[i]) - 1)) {
intpixel[i] = (1 << this.nBits[i]) - 1;
}}
}return intpixel;
}
throw  new IllegalArgumentException ("This method has not been " + "implemented for transferType " + this.transferType);
}, "~N,~O");
Clazz.defineMethod (c$, "getComponents", 
function (pixel, components, offset) {
if (this.numComponents > 1) {
throw  new IllegalArgumentException ("More than one component per pixel");
}if (this.needScaleInit) {
this.initScale ();
}if (this.noUnnorm) {
throw  new IllegalArgumentException ("This ColorModel does not support the unnormalized form");
}if (components == null) {
components =  Clazz.newIntArray (offset + 1, 0);
}components[offset + 0] = (pixel & ((1 << this.nBits[0]) - 1));
return components;
}, "~N,~A,~N");
Clazz.defineMethod (c$, "getComponents", 
function (pixel, components, offset) {
var intpixel;
if (this.needScaleInit) {
this.initScale ();
}if (this.noUnnorm) {
throw  new IllegalArgumentException ("This ColorModel does not support the unnormalized form");
}if (Clazz.instanceOf (pixel, Array)) {
intpixel = pixel;
} else {
intpixel = java.awt.image.DataBuffer.toIntArray (pixel);
if (intpixel == null) {
throw  new UnsupportedOperationException ("This method has not been " + "implemented for transferType " + this.transferType);
}}if (intpixel.length < this.numComponents) {
throw  new IllegalArgumentException ("Length of pixel array < number of components in model");
}if (components == null) {
components =  Clazz.newIntArray (offset + this.numComponents, 0);
} else if ((components.length - offset) < this.numComponents) {
throw  new IllegalArgumentException ("Length of components array < number of components in model");
}System.arraycopy (intpixel, 0, components, offset, this.numComponents);
return components;
}, "~O,~A,~N");
Clazz.defineMethod (c$, "getUnnormalizedComponents", 
function (normComponents, normOffset, components, offset) {
if (this.needScaleInit) {
this.initScale ();
}if (this.noUnnorm) {
throw  new IllegalArgumentException ("This ColorModel does not support the unnormalized form");
}return Clazz.superCall (this, java.awt.image.ComponentColorModel, "getUnnormalizedComponents", [normComponents, normOffset, components, offset]);
}, "~A,~N,~A,~N");
Clazz.defineMethod (c$, "getNormalizedComponents", 
function (components, offset, normComponents, normOffset) {
if (this.needScaleInit) {
this.initScale ();
}if (this.noUnnorm) {
throw  new IllegalArgumentException ("This ColorModel does not support the unnormalized form");
}return Clazz.superCall (this, java.awt.image.ComponentColorModel, "getNormalizedComponents", [components, offset, normComponents, normOffset]);
}, "~A,~N,~A,~N");
Clazz.defineMethod (c$, "getDataElement", 
function (components, offset) {
if (this.needScaleInit) {
this.initScale ();
}if (this.numComponents == 1) {
if (this.noUnnorm) {
throw  new IllegalArgumentException ("This ColorModel does not support the unnormalized form");
}return components[offset + 0];
}throw  new IllegalArgumentException ("This model returns " + this.numComponents + " elements in the pixel array.");
}, "~A,~N");
Clazz.defineMethod (c$, "getDataElements", 
function (components, offset, obj) {
if (this.needScaleInit) {
this.initScale ();
}if (this.noUnnorm) {
throw  new IllegalArgumentException ("This ColorModel does not support the unnormalized form");
}if ((components.length - offset) < this.numComponents) {
throw  new IllegalArgumentException ("Component array too small" + " (should be " + this.numComponents);
}switch (this.transferType) {
case 3:
{
var pixel;
if (obj == null) {
pixel =  Clazz.newIntArray (this.numComponents, 0);
} else {
pixel = obj;
}System.arraycopy (components, offset, pixel, 0, this.numComponents);
return pixel;
}case 0:
{
var pixel;
if (obj == null) {
pixel =  Clazz.newByteArray (this.numComponents, 0);
} else {
pixel = obj;
}for (var i = 0; i < this.numComponents; i++) {
pixel[i] = (components[offset + i] & 0xff);
}
return pixel;
}case 1:
{
var pixel;
if (obj == null) {
pixel =  Clazz.newShortArray (this.numComponents, 0);
} else {
pixel = obj;
}for (var i = 0; i < this.numComponents; i++) {
pixel[i] = (components[offset + i] & 0xffff);
}
return pixel;
}default:
throw  new UnsupportedOperationException ("This method has not been " + "implemented for transferType " + this.transferType);
}
}, "~A,~N,~O");
Clazz.defineMethod (c$, "getDataElement", 
function (normComponents, normOffset) {
if (this.numComponents > 1) {
throw  new IllegalArgumentException ("More than one component per pixel");
}if (this.signed) {
throw  new IllegalArgumentException ("Component value is signed");
}if (this.needScaleInit) {
this.initScale ();
}var pixel = this.getDataElements (normComponents, normOffset, null);
switch (this.transferType) {
case 0:
{
var bpixel = pixel;
return bpixel[0] & 0xff;
}case 1:
{
var uspixel = pixel;
return uspixel[0] & 0xffff;
}case 3:
{
var ipixel = pixel;
return ipixel[0];
}default:
throw  new UnsupportedOperationException ("This method has not been " + "implemented for transferType " + this.transferType);
}
}, "~A,~N");
Clazz.defineMethod (c$, "getDataElements", 
function (normComponents, normOffset, obj) {
var needAlpha = this.supportsAlpha && this.$isAlphaPremultiplied;
var stdNormComponents;
if (this.needScaleInit) {
this.initScale ();
}if (this.nonStdScale) {
stdNormComponents =  Clazz.newFloatArray (this.numComponents, 0);
for (var c = 0, nc = normOffset; c < this.numColorComponents; c++, nc++) {
stdNormComponents[c] = (normComponents[nc] - this.compOffset[c]) * this.compScale[c];
if (stdNormComponents[c] < 0.0) {
stdNormComponents[c] = 0.0;
}if (stdNormComponents[c] > 1.0) {
stdNormComponents[c] = 1.0;
}}
if (this.supportsAlpha) {
stdNormComponents[this.numColorComponents] = normComponents[this.numColorComponents + normOffset];
}normOffset = 0;
} else {
stdNormComponents = normComponents;
}switch (this.transferType) {
case 0:
var bpixel;
if (obj == null) {
bpixel =  Clazz.newByteArray (this.numComponents, 0);
} else {
bpixel = obj;
}if (needAlpha) {
var alpha = stdNormComponents[this.numColorComponents + normOffset];
for (var c = 0, nc = normOffset; c < this.numColorComponents; c++, nc++) {
bpixel[c] = Clazz.floatToByte ((stdNormComponents[nc] * alpha) * (((1 << this.nBits[c]) - 1)) + 0.5);
}
bpixel[this.numColorComponents] = Clazz.floatToByte (alpha * (((1 << this.nBits[this.numColorComponents]) - 1)) + 0.5);
} else {
for (var c = 0, nc = normOffset; c < this.numComponents; c++, nc++) {
bpixel[c] = Clazz.floatToByte (stdNormComponents[nc] * (((1 << this.nBits[c]) - 1)) + 0.5);
}
}return bpixel;
case 1:
var uspixel;
if (obj == null) {
uspixel =  Clazz.newShortArray (this.numComponents, 0);
} else {
uspixel = obj;
}if (needAlpha) {
var alpha = stdNormComponents[this.numColorComponents + normOffset];
for (var c = 0, nc = normOffset; c < this.numColorComponents; c++, nc++) {
uspixel[c] = Clazz.floatToShort ((stdNormComponents[nc] * alpha) * (((1 << this.nBits[c]) - 1)) + 0.5);
}
uspixel[this.numColorComponents] = Clazz.floatToShort (alpha * (((1 << this.nBits[this.numColorComponents]) - 1)) + 0.5);
} else {
for (var c = 0, nc = normOffset; c < this.numComponents; c++, nc++) {
uspixel[c] = Clazz.floatToShort (stdNormComponents[nc] * (((1 << this.nBits[c]) - 1)) + 0.5);
}
}return uspixel;
case 3:
var ipixel;
if (obj == null) {
ipixel =  Clazz.newIntArray (this.numComponents, 0);
} else {
ipixel = obj;
}if (needAlpha) {
var alpha = stdNormComponents[this.numColorComponents + normOffset];
for (var c = 0, nc = normOffset; c < this.numColorComponents; c++, nc++) {
ipixel[c] = Clazz.floatToInt ((stdNormComponents[nc] * alpha) * (((1 << this.nBits[c]) - 1)) + 0.5);
}
ipixel[this.numColorComponents] = Clazz.floatToInt (alpha * (((1 << this.nBits[this.numColorComponents]) - 1)) + 0.5);
} else {
for (var c = 0, nc = normOffset; c < this.numComponents; c++, nc++) {
ipixel[c] = Clazz.floatToInt (stdNormComponents[nc] * (((1 << this.nBits[c]) - 1)) + 0.5);
}
}return ipixel;
case 2:
var spixel;
if (obj == null) {
spixel =  Clazz.newShortArray (this.numComponents, 0);
} else {
spixel = obj;
}if (needAlpha) {
var alpha = stdNormComponents[this.numColorComponents + normOffset];
for (var c = 0, nc = normOffset; c < this.numColorComponents; c++, nc++) {
spixel[c] = Clazz.floatToShort (stdNormComponents[nc] * alpha * 32767.0 + 0.5);
}
spixel[this.numColorComponents] = Clazz.floatToShort (alpha * 32767.0 + 0.5);
} else {
for (var c = 0, nc = normOffset; c < this.numComponents; c++, nc++) {
spixel[c] = Clazz.floatToShort (stdNormComponents[nc] * 32767.0 + 0.5);
}
}return spixel;
default:
throw  new UnsupportedOperationException ("This method has not been " + "implemented for transferType " + this.transferType);
}
}, "~A,~N,~O");
Clazz.defineMethod (c$, "getNormalizedComponents", 
function (pixel, normComponents, normOffset) {
if (normComponents == null) {
normComponents =  Clazz.newFloatArray (this.numComponents + normOffset, 0);
}switch (this.transferType) {
case 0:
var bpixel = pixel;
for (var c = 0, nc = normOffset; c < this.numComponents; c++, nc++) {
normComponents[nc] = ((bpixel[c] & 0xff)) / (((1 << this.nBits[c]) - 1));
}
break;
case 1:
var uspixel = pixel;
for (var c = 0, nc = normOffset; c < this.numComponents; c++, nc++) {
normComponents[nc] = ((uspixel[c] & 0xffff)) / (((1 << this.nBits[c]) - 1));
}
break;
case 3:
var ipixel = pixel;
for (var c = 0, nc = normOffset; c < this.numComponents; c++, nc++) {
normComponents[nc] = (ipixel[c]) / (((1 << this.nBits[c]) - 1));
}
break;
case 2:
var spixel = pixel;
for (var c = 0, nc = normOffset; c < this.numComponents; c++, nc++) {
normComponents[nc] = (spixel[c]) / 32767.0;
}
break;
default:
throw  new UnsupportedOperationException ("This method has not been " + "implemented for transferType " + this.transferType);
}
if (this.supportsAlpha && this.$isAlphaPremultiplied) {
var alpha = normComponents[this.numColorComponents + normOffset];
if (alpha != 0.0) {
var invAlpha = 1.0 / alpha;
for (var c = normOffset; c < this.numColorComponents + normOffset; c++) {
normComponents[c] *= invAlpha;
}
}}if (this.min != null) {
for (var c = 0; c < this.numColorComponents; c++) {
normComponents[c + normOffset] = this.min[c] + this.diffMinMax[c] * normComponents[c + normOffset];
}
}return normComponents;
}, "~O,~A,~N");
Clazz.defineMethod (c$, "coerceData", 
function (raster, isAlphaPremultiplied) {
if ((this.supportsAlpha == false) || (this.$isAlphaPremultiplied == isAlphaPremultiplied)) {
return this;
}var w = raster.getWidth ();
var h = raster.getHeight ();
var aIdx = raster.getNumBands () - 1;
var normAlpha;
var rminX = raster.getMinX ();
var rY = raster.getMinY ();
var rX;
if (isAlphaPremultiplied) {
switch (this.transferType) {
case 0:
{
var pixel = null;
var zpixel = null;
var alphaScale = 1.0 / (((1 << this.nBits[aIdx]) - 1));
for (var y = 0; y < h; y++, rY++) {
rX = rminX;
for (var x = 0; x < w; x++, rX++) {
pixel = raster.getDataElements (rX, rY, pixel);
normAlpha = (pixel[aIdx] & 0xff) * alphaScale;
if (normAlpha != 0.0) {
for (var c = 0; c < aIdx; c++) {
pixel[c] = Clazz.floatToByte ((pixel[c] & 0xff) * normAlpha + 0.5);
}
raster.setDataElements (rX, rY, pixel);
} else {
if (zpixel == null) {
zpixel =  Clazz.newByteArray (this.numComponents, 0);
java.util.Arrays.fill (zpixel, 0);
}raster.setDataElements (rX, rY, zpixel);
}}
}
}break;
case 1:
{
var pixel = null;
var zpixel = null;
var alphaScale = 1.0 / (((1 << this.nBits[aIdx]) - 1));
for (var y = 0; y < h; y++, rY++) {
rX = rminX;
for (var x = 0; x < w; x++, rX++) {
pixel = raster.getDataElements (rX, rY, pixel);
normAlpha = (pixel[aIdx] & 0xffff) * alphaScale;
if (normAlpha != 0.0) {
for (var c = 0; c < aIdx; c++) {
pixel[c] = Clazz.floatToShort ((pixel[c] & 0xffff) * normAlpha + 0.5);
}
raster.setDataElements (rX, rY, pixel);
} else {
if (zpixel == null) {
zpixel =  Clazz.newShortArray (this.numComponents, 0);
java.util.Arrays.fill (zpixel, 0);
}raster.setDataElements (rX, rY, zpixel);
}}
}
}break;
case 3:
{
var pixel = null;
var zpixel = null;
var alphaScale = 1.0 / (((1 << this.nBits[aIdx]) - 1));
for (var y = 0; y < h; y++, rY++) {
rX = rminX;
for (var x = 0; x < w; x++, rX++) {
pixel = raster.getDataElements (rX, rY, pixel);
normAlpha = pixel[aIdx] * alphaScale;
if (normAlpha != 0.0) {
for (var c = 0; c < aIdx; c++) {
pixel[c] = Clazz.floatToInt (pixel[c] * normAlpha + 0.5);
}
raster.setDataElements (rX, rY, pixel);
} else {
if (zpixel == null) {
zpixel =  Clazz.newIntArray (this.numComponents, 0);
java.util.Arrays.fill (zpixel, 0);
}raster.setDataElements (rX, rY, zpixel);
}}
}
}break;
case 2:
{
var pixel = null;
var zpixel = null;
var alphaScale = 3.051851E-5;
for (var y = 0; y < h; y++, rY++) {
rX = rminX;
for (var x = 0; x < w; x++, rX++) {
pixel = raster.getDataElements (rX, rY, pixel);
normAlpha = pixel[aIdx] * alphaScale;
if (normAlpha != 0.0) {
for (var c = 0; c < aIdx; c++) {
pixel[c] = Clazz.floatToShort (pixel[c] * normAlpha + 0.5);
}
raster.setDataElements (rX, rY, pixel);
} else {
if (zpixel == null) {
zpixel =  Clazz.newShortArray (this.numComponents, 0);
java.util.Arrays.fill (zpixel, 0);
}raster.setDataElements (rX, rY, zpixel);
}}
}
}break;
default:
throw  new UnsupportedOperationException ("This method has not been " + "implemented for transferType " + this.transferType);
}
} else {
switch (this.transferType) {
case 0:
{
var pixel = null;
var alphaScale = 1.0 / (((1 << this.nBits[aIdx]) - 1));
for (var y = 0; y < h; y++, rY++) {
rX = rminX;
for (var x = 0; x < w; x++, rX++) {
pixel = raster.getDataElements (rX, rY, pixel);
normAlpha = (pixel[aIdx] & 0xff) * alphaScale;
if (normAlpha != 0.0) {
var invAlpha = 1.0 / normAlpha;
for (var c = 0; c < aIdx; c++) {
pixel[c] = Clazz.floatToByte ((pixel[c] & 0xff) * invAlpha + 0.5);
}
raster.setDataElements (rX, rY, pixel);
}}
}
}break;
case 1:
{
var pixel = null;
var alphaScale = 1.0 / (((1 << this.nBits[aIdx]) - 1));
for (var y = 0; y < h; y++, rY++) {
rX = rminX;
for (var x = 0; x < w; x++, rX++) {
pixel = raster.getDataElements (rX, rY, pixel);
normAlpha = (pixel[aIdx] & 0xffff) * alphaScale;
if (normAlpha != 0.0) {
var invAlpha = 1.0 / normAlpha;
for (var c = 0; c < aIdx; c++) {
pixel[c] = Clazz.floatToShort ((pixel[c] & 0xffff) * invAlpha + 0.5);
}
raster.setDataElements (rX, rY, pixel);
}}
}
}break;
case 3:
{
var pixel = null;
var alphaScale = 1.0 / (((1 << this.nBits[aIdx]) - 1));
for (var y = 0; y < h; y++, rY++) {
rX = rminX;
for (var x = 0; x < w; x++, rX++) {
pixel = raster.getDataElements (rX, rY, pixel);
normAlpha = pixel[aIdx] * alphaScale;
if (normAlpha != 0.0) {
var invAlpha = 1.0 / normAlpha;
for (var c = 0; c < aIdx; c++) {
pixel[c] = Clazz.floatToInt (pixel[c] * invAlpha + 0.5);
}
raster.setDataElements (rX, rY, pixel);
}}
}
}break;
case 2:
{
var pixel = null;
var alphaScale = 3.051851E-5;
for (var y = 0; y < h; y++, rY++) {
rX = rminX;
for (var x = 0; x < w; x++, rX++) {
pixel = raster.getDataElements (rX, rY, pixel);
normAlpha = pixel[aIdx] * alphaScale;
if (normAlpha != 0.0) {
var invAlpha = 1.0 / normAlpha;
for (var c = 0; c < aIdx; c++) {
pixel[c] = Clazz.floatToShort (pixel[c] * invAlpha + 0.5);
}
raster.setDataElements (rX, rY, pixel);
}}
}
}break;
default:
throw  new UnsupportedOperationException ("This method has not been " + "implemented for transferType " + this.transferType);
}
}if (!this.signed) {
return  new java.awt.image.ComponentColorModel (this.colorSpace, this.nBits, this.supportsAlpha, isAlphaPremultiplied, this.transparency, this.transferType);
} else {
return  new java.awt.image.ComponentColorModel (this.colorSpace, this.supportsAlpha, isAlphaPremultiplied, this.transparency, this.transferType);
}}, "java.awt.image.WritableRaster,~B");
Clazz.overrideMethod (c$, "isCompatibleRaster", 
function (raster) {
var sm = raster.getSampleModel ();
if (Clazz.instanceOf (sm, java.awt.image.ComponentSampleModel)) {
if (sm.getNumBands () != this.getNumComponents ()) {
return false;
}for (var i = 0; i < this.nBits.length; i++) {
if (sm.getSampleSize (i) < this.nBits[i]) {
return false;
}}
return (raster.getTransferType () == this.transferType);
} else {
return false;
}}, "java.awt.image.Raster");
Clazz.overrideMethod (c$, "createCompatibleWritableRaster", 
function (w, h) {
var dataSize = w * h * this.numComponents;
var raster = null;
switch (this.transferType) {
case 0:
case 1:
break;
default:
var sm = this.createCompatibleSampleModel (w, h);
var db = sm.createDataBuffer ();
raster = java.awt.image.Raster.createWritableRaster (sm, db, null);
}
return raster;
}, "~N,~N");
Clazz.overrideMethod (c$, "createCompatibleSampleModel", 
function (w, h) {
var bandOffsets =  Clazz.newIntArray (this.numComponents, 0);
for (var i = 0; i < this.numComponents; i++) {
bandOffsets[i] = i;
}
switch (this.transferType) {
case 0:
case 1:
return null;
default:
return  new java.awt.image.ComponentSampleModel (this.transferType, w, h, this.numComponents, w * this.numComponents, bandOffsets);
}
}, "~N,~N");
Clazz.overrideMethod (c$, "isCompatibleSampleModel", 
function (sm) {
if (!(Clazz.instanceOf (sm, java.awt.image.ComponentSampleModel))) {
return false;
}if (this.numComponents != sm.getNumBands ()) {
return false;
}if (sm.getTransferType () != this.transferType) {
return false;
}return true;
}, "java.awt.image.SampleModel");
Clazz.overrideMethod (c$, "getAlphaRaster", 
function (raster) {
if (this.hasAlpha () == false) {
return null;
}var x = raster.getMinX ();
var y = raster.getMinY ();
var band =  Clazz.newIntArray (1, 0);
band[0] = raster.getNumBands () - 1;
return raster.createWritableChild (x, y, raster.getWidth (), raster.getHeight (), x, y, band);
}, "java.awt.image.WritableRaster");
Clazz.defineMethod (c$, "equals", 
function (obj) {
if (!Clazz.superCall (this, java.awt.image.ComponentColorModel, "equals", [obj])) {
return false;
}if (obj.getClass () !== this.getClass ()) {
return false;
}return true;
}, "~O");
});
