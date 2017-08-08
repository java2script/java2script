Clazz.declarePackage ("java.awt.image");
Clazz.load (["java.awt.Transparency", "java.awt.color.ColorSpace"], "java.awt.image.ColorModel", ["java.lang.IllegalArgumentException", "$.NullPointerException", "$.UnsupportedOperationException", "JU.AU"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pixel_bits = 0;
this.nBits = null;
this.transparency = 3;
this.supportsAlpha = true;
this.$isAlphaPremultiplied = false;
this.numComponents = -1;
this.numColorComponents = -1;
this.colorSpace = null;
this.colorSpaceType = 5;
this.maxBits = 0;
this.is_sRGB = true;
this.transferType = 0;
Clazz.instantialize (this, arguments);
}, java.awt.image, "ColorModel", null, java.awt.Transparency);
Clazz.prepareFields (c$, function () {
this.colorSpace = java.awt.color.ColorSpace.getInstance (1000);
});
c$.getRGBdefault = Clazz.defineMethod (c$, "getRGBdefault", 
function () {
if (java.awt.image.ColorModel.RGBdefault == null) {
java.awt.image.ColorModel.RGBdefault =  new java.awt.image.DirectColorModel (32, 0x00ff0000, 0x0000ff00, 0x000000ff, 0xff000000);
}return java.awt.image.ColorModel.RGBdefault;
});
Clazz.makeConstructor (c$, 
function (bits) {
this.pixel_bits = bits;
if (bits < 1) {
throw  new IllegalArgumentException ("Number of bits must be > 0");
}this.numComponents = 4;
this.numColorComponents = 3;
this.maxBits = bits;
this.transferType = java.awt.image.ColorModel.getDefaultTransferType (bits);
}, "~N");
Clazz.makeConstructor (c$, 
function (pixel_bits, bits, cspace, hasAlpha, isAlphaPremultiplied, transparency, transferType) {
this.colorSpace = cspace;
this.colorSpaceType = cspace.getType ();
this.numColorComponents = cspace.getNumComponents ();
this.numComponents = this.numColorComponents + (hasAlpha ? 1 : 0);
this.supportsAlpha = hasAlpha;
if (bits.length < this.numComponents) {
throw  new IllegalArgumentException ("Number of color/alpha components should be " + this.numComponents + " but length of bits array is " + bits.length);
}if (transparency < 1 || transparency > 3) {
throw  new IllegalArgumentException ("Unknown transparency: " + transparency);
}if (this.supportsAlpha == false) {
this.$isAlphaPremultiplied = false;
this.transparency = 1;
} else {
this.$isAlphaPremultiplied = isAlphaPremultiplied;
this.transparency = transparency;
}this.nBits = bits.clone ();
this.pixel_bits = pixel_bits;
if (pixel_bits <= 0) {
throw  new IllegalArgumentException ("Number of pixel bits must be > 0");
}this.maxBits = 0;
for (var i = 0; i < bits.length; i++) {
if (bits[i] < 0) {
throw  new IllegalArgumentException ("Number of bits must be >= 0");
}if (this.maxBits < bits[i]) {
this.maxBits = bits[i];
}}
if (this.maxBits == 0) {
throw  new IllegalArgumentException ("There must be at least one component with > 0 pixel bits.");
}if (cspace !== java.awt.color.ColorSpace.getInstance (1000)) {
this.is_sRGB = false;
}this.transferType = transferType;
}, "~N,~A,java.awt.color.ColorSpace,~B,~B,~N,~N");
Clazz.defineMethod (c$, "hasAlpha", 
function () {
return this.supportsAlpha;
});
Clazz.defineMethod (c$, "isAlphaPremultiplied", 
function () {
return this.$isAlphaPremultiplied;
});
Clazz.defineMethod (c$, "getTransferType", 
function () {
return this.transferType;
});
Clazz.defineMethod (c$, "getPixelSize", 
function () {
return this.pixel_bits;
});
Clazz.defineMethod (c$, "getComponentSize", 
function (componentIdx) {
if (this.nBits == null) {
throw  new NullPointerException ("Number of bits array is null.");
}return this.nBits[componentIdx];
}, "~N");
Clazz.defineMethod (c$, "getComponentSize", 
function () {
if (this.nBits != null) {
return this.nBits.clone ();
}return null;
});
Clazz.overrideMethod (c$, "getTransparency", 
function () {
return this.transparency;
});
Clazz.defineMethod (c$, "getNumComponents", 
function () {
return this.numComponents;
});
Clazz.defineMethod (c$, "getNumColorComponents", 
function () {
return this.numColorComponents;
});
Clazz.defineMethod (c$, "getRGB", 
function (pixel) {
return (this.getAlpha (pixel) << 24) | (this.getRed (pixel) << 16) | (this.getGreen (pixel) << 8) | (this.getBlue (pixel) << 0);
}, "~N");
Clazz.defineMethod (c$, "getRed", 
function (inData) {
var pixel = 0;
var length = 0;
switch (this.transferType) {
case 0:
var bdata = inData;
pixel = bdata[0] & 0xff;
length = bdata.length;
break;
case 1:
var sdata = inData;
pixel = sdata[0] & 0xffff;
length = sdata.length;
break;
case 3:
var idata = inData;
pixel = idata[0];
length = idata.length;
break;
default:
throw  new UnsupportedOperationException ("This method has not been " + "implemented for transferType " + this.transferType);
}
if (length == 1) {
return this.getRed (pixel);
} else {
throw  new UnsupportedOperationException ("This method is not supported by this color model");
}}, "~O");
Clazz.defineMethod (c$, "getGreen", 
function (inData) {
var pixel = 0;
var length = 0;
switch (this.transferType) {
case 0:
var bdata = inData;
pixel = bdata[0] & 0xff;
length = bdata.length;
break;
case 1:
var sdata = inData;
pixel = sdata[0] & 0xffff;
length = sdata.length;
break;
case 3:
var idata = inData;
pixel = idata[0];
length = idata.length;
break;
default:
throw  new UnsupportedOperationException ("This method has not been " + "implemented for transferType " + this.transferType);
}
if (length == 1) {
return this.getGreen (pixel);
} else {
throw  new UnsupportedOperationException ("This method is not supported by this color model");
}}, "~O");
Clazz.defineMethod (c$, "getBlue", 
function (inData) {
var pixel = 0;
var length = 0;
switch (this.transferType) {
case 0:
var bdata = inData;
pixel = bdata[0] & 0xff;
length = bdata.length;
break;
case 1:
var sdata = inData;
pixel = sdata[0] & 0xffff;
length = sdata.length;
break;
case 3:
var idata = inData;
pixel = idata[0];
length = idata.length;
break;
default:
throw  new UnsupportedOperationException ("This method has not been " + "implemented for transferType " + this.transferType);
}
if (length == 1) {
return this.getBlue (pixel);
} else {
throw  new UnsupportedOperationException ("This method is not supported by this color model");
}}, "~O");
Clazz.defineMethod (c$, "getAlpha", 
function (inData) {
var pixel = 0;
var length = 0;
switch (this.transferType) {
case 0:
var bdata = inData;
pixel = bdata[0] & 0xff;
length = bdata.length;
break;
case 1:
var sdata = inData;
pixel = sdata[0] & 0xffff;
length = sdata.length;
break;
case 3:
var idata = inData;
pixel = idata[0];
length = idata.length;
break;
default:
throw  new UnsupportedOperationException ("This method has not been " + "implemented for transferType " + this.transferType);
}
if (length == 1) {
return this.getAlpha (pixel);
} else {
throw  new UnsupportedOperationException ("This method is not supported by this color model");
}}, "~O");
Clazz.defineMethod (c$, "getRGB", 
function (inData) {
return (this.getAlpha (inData) << 24) | (this.getRed (inData) << 16) | (this.getGreen (inData) << 8) | (this.getBlue (inData) << 0);
}, "~O");
Clazz.defineMethod (c$, "getDataElements", 
function (rgb, pixel) {
throw  new UnsupportedOperationException ("This method is not supported by this color model.");
}, "~N,~O");
Clazz.defineMethod (c$, "getComponents", 
function (pixel, components, offset) {
throw  new UnsupportedOperationException ("This method is not supported by this color model.");
}, "~N,~A,~N");
Clazz.defineMethod (c$, "getComponents", 
function (pixel, components, offset) {
throw  new UnsupportedOperationException ("This method is not supported by this color model.");
}, "~O,~A,~N");
Clazz.defineMethod (c$, "getUnnormalizedComponents", 
function (normComponents, normOffset, components, offset) {
if (this.colorSpace == null) {
throw  new UnsupportedOperationException ("This method is not supported by this color model.");
}if (this.nBits == null) {
throw  new UnsupportedOperationException ("This method is not supported.  Unable to determine #bits per component.");
}if ((normComponents.length - normOffset) < this.numComponents) {
throw  new IllegalArgumentException ("Incorrect number of components.  Expecting " + this.numComponents);
}if (components == null) {
components =  Clazz.newIntArray (offset + this.numComponents, 0);
}if (this.supportsAlpha && this.$isAlphaPremultiplied) {
var normAlpha = normComponents[normOffset + this.numColorComponents];
for (var i = 0; i < this.numColorComponents; i++) {
components[offset + i] = Clazz.floatToInt (normComponents[normOffset + i] * ((1 << this.nBits[i]) - 1) * normAlpha + 0.5);
}
components[offset + this.numColorComponents] = Clazz.floatToInt (normAlpha * ((1 << this.nBits[this.numColorComponents]) - 1) + 0.5);
} else {
for (var i = 0; i < this.numComponents; i++) {
components[offset + i] = Clazz.floatToInt (normComponents[normOffset + i] * ((1 << this.nBits[i]) - 1) + 0.5);
}
}return components;
}, "~A,~N,~A,~N");
Clazz.defineMethod (c$, "getNormalizedComponents", 
function (components, offset, normComponents, normOffset) {
if (this.colorSpace == null) {
throw  new UnsupportedOperationException ("This method is not supported by this color model.");
}if (this.nBits == null) {
throw  new UnsupportedOperationException ("This method is not supported.  Unable to determine #bits per component.");
}if ((components.length - offset) < this.numComponents) {
throw  new IllegalArgumentException ("Incorrect number of components.  Expecting " + this.numComponents);
}if (normComponents == null) {
normComponents =  Clazz.newFloatArray (this.numComponents + normOffset, 0);
}if (this.supportsAlpha && this.$isAlphaPremultiplied) {
var normAlpha = components[offset + this.numColorComponents];
normAlpha /= ((1 << this.nBits[this.numColorComponents]) - 1);
if (normAlpha != 0.0) {
for (var i = 0; i < this.numColorComponents; i++) {
normComponents[normOffset + i] = (components[offset + i]) / (normAlpha * (((1 << this.nBits[i]) - 1)));
}
} else {
for (var i = 0; i < this.numColorComponents; i++) {
normComponents[normOffset + i] = 0.0;
}
}normComponents[normOffset + this.numColorComponents] = normAlpha;
} else {
for (var i = 0; i < this.numComponents; i++) {
normComponents[normOffset + i] = (components[offset + i]) / (((1 << this.nBits[i]) - 1));
}
}return normComponents;
}, "~A,~N,~A,~N");
Clazz.defineMethod (c$, "getDataElement", 
function (components, offset) {
return this.getDataElementInt (components, offset);
}, "~A,~N");
Clazz.defineMethod (c$, "getDataElementInt", 
function (components, offset) {
throw  new UnsupportedOperationException ("This method is not supported by this color model.");
}, "~A,~N");
Clazz.defineMethod (c$, "getDataElement", 
function (normComponents, normOffset) {
if (JU.AU.isAI (normComponents)) {
var ints = normComponents;
return this.getDataElementInt (ints, normOffset);
}var components = this.getUnnormalizedComponents (normComponents, normOffset, null, 0);
return this.getDataElement (components, 0);
}, "~A,~N");
Clazz.defineMethod (c$, "getDataElements", 
function (normComponents, normOffset, obj) {
var components = this.getUnnormalizedComponents (normComponents, normOffset, null, 0);
return this.getDataElements (components, 0, obj);
}, "~A,~N,~O");
Clazz.defineMethod (c$, "getNormalizedComponents", 
function (pixel, normComponents, normOffset) {
var components = this.getComponents (pixel, null, 0);
return this.getNormalizedComponents (components, 0, normComponents, normOffset);
}, "~O,~A,~N");
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (!(Clazz.instanceOf (obj, java.awt.image.ColorModel))) {
return false;
}var cm = obj;
if (this === cm) {
return true;
}if (this.supportsAlpha != cm.hasAlpha () || this.$isAlphaPremultiplied != cm.isAlphaPremultiplied () || this.pixel_bits != cm.getPixelSize () || this.transparency != cm.getTransparency () || this.numComponents != cm.getNumComponents ()) {
return false;
}var nb = cm.getComponentSize ();
if ((this.nBits != null) && (nb != null)) {
for (var i = 0; i < this.numComponents; i++) {
if (this.nBits[i] != nb[i]) {
return false;
}}
} else {
return ((this.nBits == null) && (nb == null));
}return true;
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
var result = 0;
result = (this.supportsAlpha ? 2 : 3) + (this.$isAlphaPremultiplied ? 4 : 5) + this.pixel_bits * 6 + this.transparency * 7 + this.numComponents * 8;
if (this.nBits != null) {
for (var i = 0; i < this.numComponents; i++) {
result = result + this.nBits[i] * (i + 9);
}
}return result;
});
Clazz.defineMethod (c$, "getColorSpace", 
function () {
return this.colorSpace;
});
Clazz.defineMethod (c$, "isCompatibleRaster", 
function (raster) {
throw  new UnsupportedOperationException ("This method has not been implemented for this ColorModel.");
}, "java.awt.image.Raster");
Clazz.defineMethod (c$, "createCompatibleWritableRaster", 
function (w, h) {
throw  new UnsupportedOperationException ("This method is not supported by this color model");
}, "~N,~N");
Clazz.defineMethod (c$, "createCompatibleSampleModel", 
function (w, h) {
throw  new UnsupportedOperationException ("This method is not supported by this color model");
}, "~N,~N");
Clazz.defineMethod (c$, "isCompatibleSampleModel", 
function (sm) {
throw  new UnsupportedOperationException ("This method is not supported by this color model");
}, "java.awt.image.SampleModel");
Clazz.overrideMethod (c$, "finalize", 
function () {
});
Clazz.defineMethod (c$, "getAlphaRaster", 
function (raster) {
return null;
}, "java.awt.image.WritableRaster");
Clazz.overrideMethod (c$, "toString", 
function () {
return  String.instantialize ("ColorModel: #pixelBits = " + this.pixel_bits + " numComponents = " + this.numComponents + " color space = " + this.colorSpace + " transparency = " + this.transparency + " has alpha = " + this.supportsAlpha + " isAlphaPre = " + this.$isAlphaPremultiplied);
});
c$.getDefaultTransferType = Clazz.defineMethod (c$, "getDefaultTransferType", 
function (pixel_bits) {
if (pixel_bits <= 8) {
return 0;
}return 3;
}, "~N");
c$.isLinearRGBspace = Clazz.defineMethod (c$, "isLinearRGBspace", 
function (cs) {
return false;
}, "java.awt.color.ColorSpace");
c$.isLinearGRAYspace = Clazz.defineMethod (c$, "isLinearGRAYspace", 
function (cs) {
return false;
}, "java.awt.color.ColorSpace");
Clazz.defineStatics (c$,
"RGBdefault", null,
"l8Tos8", null,
"s8Tol8", null,
"l16Tos8", null,
"s8Tol16", null,
"g8Tos8Map", null,
"lg16Toog8Map", null,
"g16Tos8Map", null,
"lg16Toog16Map", null);
});
