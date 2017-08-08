Clazz.declarePackage ("java.awt.image");
Clazz.load (["java.awt.image.ColorModel"], "java.awt.image.PackedColorModel", ["java.lang.IllegalArgumentException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.maskArray = null;
this.maskOffsets = null;
this.scaleFactors = null;
Clazz.instantialize (this, arguments);
}, java.awt.image, "PackedColorModel", java.awt.image.ColorModel);
Clazz.makeConstructor (c$, 
function (space, bits, colorMaskArray, alphaMask, isAlphaPremultiplied, trans, transferType) {
Clazz.superConstructor (this, java.awt.image.PackedColorModel, [bits, java.awt.image.PackedColorModel.createBitsArray (colorMaskArray, alphaMask), space, (alphaMask == 0 ? false : true), isAlphaPremultiplied, trans, transferType]);
if (bits < 1 || bits > 32) {
throw  new IllegalArgumentException ("Number of bits must be between 1 and 32.");
}this.maskArray =  Clazz.newIntArray (this.numComponents, 0);
this.maskOffsets =  Clazz.newIntArray (this.numComponents, 0);
this.scaleFactors =  Clazz.newFloatArray (this.numComponents, 0);
for (var i = 0; i < this.numColorComponents; i++) {
this.DecomposeMask (colorMaskArray[i], i, space.getName (i));
}
if (alphaMask != 0) {
this.DecomposeMask (alphaMask, this.numColorComponents, "alpha");
if (this.nBits[this.numComponents - 1] == 1) {
this.transparency = 2;
}}}, "java.awt.color.ColorSpace,~N,~A,~N,~B,~N,~N");
Clazz.makeConstructor (c$, 
function (space, bits, rmask, gmask, bmask, amask, isAlphaPremultiplied, trans, transferType) {
Clazz.superConstructor (this, java.awt.image.PackedColorModel, [bits, java.awt.image.PackedColorModel.createBitsArray (rmask, gmask, bmask, amask), space, (amask == 0 ? false : true), isAlphaPremultiplied, trans, transferType]);
if (space.getType () != 5) {
throw  new IllegalArgumentException ("ColorSpace must be TYPE_RGB.");
}this.maskArray =  Clazz.newIntArray (this.numComponents, 0);
this.maskOffsets =  Clazz.newIntArray (this.numComponents, 0);
this.scaleFactors =  Clazz.newFloatArray (this.numComponents, 0);
this.DecomposeMask (rmask, 0, "red");
this.DecomposeMask (gmask, 1, "green");
this.DecomposeMask (bmask, 2, "blue");
if (amask != 0) {
this.DecomposeMask (amask, 3, "alpha");
if (this.nBits[3] == 1) {
this.transparency = 2;
}}}, "java.awt.color.ColorSpace,~N,~N,~N,~N,~N,~B,~N,~N");
Clazz.defineMethod (c$, "getMask", 
function (index) {
return this.maskArray[index];
}, "~N");
Clazz.defineMethod (c$, "getMasks", 
function () {
return this.maskArray.clone ();
});
Clazz.defineMethod (c$, "DecomposeMask", 
 function (mask, idx, componentName) {
var off = 0;
var count = this.nBits[idx];
this.maskArray[idx] = mask;
if (mask != 0) {
while ((mask & 1) == 0) {
mask >>>= 1;
off++;
}
}if (off + count > this.pixel_bits) {
throw  new IllegalArgumentException (componentName + " mask " + Integer.toHexString (this.maskArray[idx]) + " overflows pixel (expecting " + this.pixel_bits + " bits");
}this.maskOffsets[idx] = off;
if (count == 0) {
this.scaleFactors[idx] = 256.0;
} else {
this.scaleFactors[idx] = 255.0 / ((1 << count) - 1);
}}, "~N,~N,~S");
Clazz.defineMethod (c$, "equals", 
function (obj) {
if (!(Clazz.instanceOf (obj, java.awt.image.PackedColorModel))) {
return false;
}if (!Clazz.superCall (this, java.awt.image.PackedColorModel, "equals", [obj])) {
return false;
}var cm = obj;
var numC = cm.getNumComponents ();
if (numC != this.numComponents) {
return false;
}for (var i = 0; i < numC; i++) {
if (this.maskArray[i] != cm.getMask (i)) {
return false;
}}
return true;
}, "~O");
c$.createBitsArray = Clazz.defineMethod (c$, "createBitsArray", 
 function (colorMaskArray, alphaMask) {
var numColors = colorMaskArray.length;
var numAlpha = (alphaMask == 0 ? 0 : 1);
var arr =  Clazz.newIntArray (numColors + numAlpha, 0);
for (var i = 0; i < numColors; i++) {
arr[i] = java.awt.image.PackedColorModel.countBits (colorMaskArray[i]);
if (arr[i] < 0) {
throw  new IllegalArgumentException ("Noncontiguous color mask (" + Integer.toHexString (colorMaskArray[i]) + "at index " + i);
}}
if (alphaMask != 0) {
arr[numColors] = java.awt.image.PackedColorModel.countBits (alphaMask);
if (arr[numColors] < 0) {
throw  new IllegalArgumentException ("Noncontiguous alpha mask (" + Integer.toHexString (alphaMask));
}}return arr;
}, "~A,~N");
c$.createBitsArray = Clazz.defineMethod (c$, "createBitsArray", 
 function (rmask, gmask, bmask, amask) {
var arr =  Clazz.newIntArray (3 + (amask == 0 ? 0 : 1), 0);
arr[0] = java.awt.image.PackedColorModel.countBits (rmask);
arr[1] = java.awt.image.PackedColorModel.countBits (gmask);
arr[2] = java.awt.image.PackedColorModel.countBits (bmask);
if (arr[0] < 0) {
throw  new IllegalArgumentException ("Noncontiguous red mask (" + Integer.toHexString (rmask));
} else if (arr[1] < 0) {
throw  new IllegalArgumentException ("Noncontiguous green mask (" + Integer.toHexString (gmask));
} else if (arr[2] < 0) {
throw  new IllegalArgumentException ("Noncontiguous blue mask (" + Integer.toHexString (bmask));
}if (amask != 0) {
arr[3] = java.awt.image.PackedColorModel.countBits (amask);
if (arr[3] < 0) {
throw  new IllegalArgumentException ("Noncontiguous alpha mask (" + Integer.toHexString (amask));
}}return arr;
}, "~N,~N,~N,~N");
c$.countBits = Clazz.defineMethod (c$, "countBits", 
 function (mask) {
var count = 0;
if (mask != 0) {
while ((mask & 1) == 0) {
mask >>>= 1;
}
while ((mask & 1) == 1) {
mask >>>= 1;
count++;
}
}if (mask != 0) {
return -1;
}return count;
}, "~N");
});
