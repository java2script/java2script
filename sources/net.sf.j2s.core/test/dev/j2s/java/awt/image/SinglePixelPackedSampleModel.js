Clazz.declarePackage ("java.awt.image");
Clazz.load (["java.awt.image.SampleModel"], "java.awt.image.SinglePixelPackedSampleModel", ["java.lang.ArrayIndexOutOfBoundsException", "$.IllegalArgumentException", "java.util.Arrays", "java.awt.image.DataBufferByte", "$.DataBufferInt", "$.RasterFormatException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bitMasks = null;
this.bitOffsets = null;
this.bitSizes = null;
this.maxBitSize = 0;
this.scanlineStride = 0;
Clazz.instantialize (this, arguments);
}, java.awt.image, "SinglePixelPackedSampleModel", java.awt.image.SampleModel);
Clazz.makeConstructor (c$, 
function (dataType, w, h, bitMasks) {
this.construct (dataType, w, h, w, bitMasks);
if (dataType != 0 && dataType != 3) {
throw  new IllegalArgumentException ("Unsupported data type " + dataType);
}}, "~N,~N,~N,~A");
Clazz.makeConstructor (c$, 
function (dataType, w, h, scanlineStride, bitMasks) {
Clazz.superConstructor (this, java.awt.image.SinglePixelPackedSampleModel, [dataType, w, h, bitMasks.length]);
if (dataType != 0 && dataType != 3) {
throw  new IllegalArgumentException ("Unsupported data type " + dataType);
}this.dataType = dataType;
this.bitMasks = bitMasks.clone ();
this.scanlineStride = scanlineStride;
this.bitOffsets =  Clazz.newIntArray (this.numBands, 0);
this.bitSizes =  Clazz.newIntArray (this.numBands, 0);
this.maxBitSize = 0;
for (var i = 0; i < this.numBands; i++) {
var bitOffset = 0;
var bitSize = 0;
var mask;
mask = bitMasks[i];
if (mask != 0) {
while ((mask & 1) == 0) {
mask = mask >>> 1;
bitOffset++;
}
while ((mask & 1) == 1) {
mask = mask >>> 1;
bitSize++;
}
if (mask != 0) {
throw  new IllegalArgumentException ("Mask " + bitMasks[i] + " must be contiguous");
}}this.bitOffsets[i] = bitOffset;
this.bitSizes[i] = bitSize;
if (bitSize > this.maxBitSize) {
this.maxBitSize = bitSize;
}}
}, "~N,~N,~N,~N,~A");
Clazz.overrideMethod (c$, "getNumDataElements", 
function () {
return 1;
});
Clazz.defineMethod (c$, "getBufferSize", 
 function () {
var size = this.scanlineStride * (this.height - 1) + this.width;
return size;
});
Clazz.overrideMethod (c$, "createCompatibleSampleModel", 
function (w, h) {
var sampleModel =  new java.awt.image.SinglePixelPackedSampleModel (this.dataType, w, h, this.bitMasks);
return sampleModel;
}, "~N,~N");
Clazz.overrideMethod (c$, "createDataBuffer", 
function () {
var dataBuffer = null;
var size = this.getBufferSize ();
switch (this.dataType) {
case 0:
dataBuffer =  new java.awt.image.DataBufferByte (size);
break;
case 3:
dataBuffer =  new java.awt.image.DataBufferInt (size);
break;
}
return dataBuffer;
});
Clazz.defineMethod (c$, "getSampleSize", 
function () {
var mask;
var sampleSize =  Clazz.newIntArray (this.numBands, 0);
for (var i = 0; i < this.numBands; i++) {
sampleSize[i] = 0;
mask = this.bitMasks[i] >>> this.bitOffsets[i];
while ((mask & 1) != 0) {
sampleSize[i]++;
mask = mask >>> 1;
}
}
return sampleSize;
});
Clazz.defineMethod (c$, "getSampleSize", 
function (band) {
var sampleSize = 0;
var mask = this.bitMasks[band] >>> this.bitOffsets[band];
while ((mask & 1) != 0) {
sampleSize++;
mask = mask >>> 1;
}
return sampleSize;
}, "~N");
Clazz.defineMethod (c$, "getOffset", 
function (x, y) {
var offset = y * this.scanlineStride + x;
return offset;
}, "~N,~N");
Clazz.defineMethod (c$, "getBitOffsets", 
function () {
return this.bitOffsets.clone ();
});
Clazz.defineMethod (c$, "getBitMasks", 
function () {
return this.bitMasks.clone ();
});
Clazz.defineMethod (c$, "getScanlineStride", 
function () {
return this.scanlineStride;
});
Clazz.overrideMethod (c$, "createSubsetSampleModel", 
function (bands) {
if (bands.length > this.numBands) throw  new java.awt.image.RasterFormatException ("There are only " + this.numBands + " bands");
var newBitMasks =  Clazz.newIntArray (bands.length, 0);
for (var i = 0; i < bands.length; i++) newBitMasks[i] = this.bitMasks[bands[i]];

return  new java.awt.image.SinglePixelPackedSampleModel (this.dataType, this.width, this.height, this.scanlineStride, newBitMasks);
}, "~A");
Clazz.defineMethod (c$, "getDataElements", 
function (x, y, obj, data) {
if ((x < 0) || (y < 0) || (x >= this.width) || (y >= this.height)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var type = this.getTransferType ();
switch (type) {
case 0:
var bdata;
if (obj == null) bdata =  Clazz.newByteArray (1, 0);
 else bdata = obj;
bdata[0] = data.getElem (y * this.scanlineStride + x);
obj = bdata;
break;
case 3:
var idata;
if (obj == null) idata =  Clazz.newIntArray (1, 0);
 else idata = obj;
idata[0] = data.getElem (y * this.scanlineStride + x);
obj = idata;
break;
}
return obj;
}, "~N,~N,~O,java.awt.image.DataBuffer");
Clazz.defineMethod (c$, "getPixel", 
function (x, y, iArray, data) {
if ((x < 0) || (y < 0) || (x >= this.width) || (y >= this.height)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var pixels;
if (iArray == null) {
pixels =  Clazz.newIntArray (this.numBands, 0);
} else {
pixels = iArray;
}var value = data.getElem (y * this.scanlineStride + x);
for (var i = 0; i < this.numBands; i++) {
pixels[i] = (value & this.bitMasks[i]) >>> this.bitOffsets[i];
}
return pixels;
}, "~N,~N,~A,java.awt.image.DataBuffer");
Clazz.defineMethod (c$, "getPixels", 
function (x, y, w, h, iArray, data) {
if ((x < 0) || (y < 0) || (x + w > this.width) || (y + h > this.height)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var pixels;
if (iArray != null) {
pixels = iArray;
} else {
pixels =  Clazz.newIntArray (w * h * this.numBands, 0);
}var lineOffset = y * this.scanlineStride + x;
var dstOffset = 0;
for (var i = 0; i < h; i++) {
for (var j = 0; j < w; j++) {
var value = data.getElem (lineOffset + j);
for (var k = 0; k < this.numBands; k++) {
pixels[dstOffset++] = ((value & this.bitMasks[k]) >>> this.bitOffsets[k]);
}
}
lineOffset += this.scanlineStride;
}
return pixels;
}, "~N,~N,~N,~N,~A,java.awt.image.DataBuffer");
Clazz.overrideMethod (c$, "getSample", 
function (x, y, b, data) {
if ((x < 0) || (y < 0) || (x >= this.width) || (y >= this.height)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var sample = data.getElem (y * this.scanlineStride + x);
return ((sample & this.bitMasks[b]) >>> this.bitOffsets[b]);
}, "~N,~N,~N,java.awt.image.DataBuffer");
Clazz.defineMethod (c$, "getSamples", 
function (x, y, w, h, b, iArray, data) {
if ((x < 0) || (y < 0) || (x + w > this.width) || (y + h > this.height)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var samples;
if (iArray != null) {
samples = iArray;
} else {
samples =  Clazz.newIntArray (w * h, 0);
}var lineOffset = y * this.scanlineStride + x;
var dstOffset = 0;
for (var i = 0; i < h; i++) {
for (var j = 0; j < w; j++) {
var value = data.getElem (lineOffset + j);
samples[dstOffset++] = ((value & this.bitMasks[b]) >>> this.bitOffsets[b]);
}
lineOffset += this.scanlineStride;
}
return samples;
}, "~N,~N,~N,~N,~N,~A,java.awt.image.DataBuffer");
Clazz.defineMethod (c$, "setDataElements", 
function (x, y, obj, data) {
if ((x < 0) || (y < 0) || (x >= this.width) || (y >= this.height)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var type = this.getTransferType ();
switch (type) {
case 0:
var barray = obj;
data.setElem (y * this.scanlineStride + x, (barray[0]) & 0xff);
break;
case 3:
var iarray = obj;
data.setElem (y * this.scanlineStride + x, iarray[0]);
break;
}
}, "~N,~N,~O,java.awt.image.DataBuffer");
Clazz.defineMethod (c$, "setPixel", 
function (x, y, iArray, data) {
if ((x < 0) || (y < 0) || (x >= this.width) || (y >= this.height)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var lineOffset = y * this.scanlineStride + x;
var value = data.getElem (lineOffset);
for (var i = 0; i < this.numBands; i++) {
value &= ~this.bitMasks[i];
value |= ((iArray[i] << this.bitOffsets[i]) & this.bitMasks[i]);
}
data.setElem (lineOffset, value);
}, "~N,~N,~A,java.awt.image.DataBuffer");
Clazz.defineMethod (c$, "setPixels", 
function (x, y, w, h, iArray, data) {
if ((x < 0) || (y < 0) || (x + w > this.width) || (y + h > this.height)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var lineOffset = y * this.scanlineStride + x;
var srcOffset = 0;
for (var i = 0; i < h; i++) {
for (var j = 0; j < w; j++) {
var value = data.getElem (lineOffset + j);
for (var k = 0; k < this.numBands; k++) {
value &= ~this.bitMasks[k];
var srcValue = iArray[srcOffset++];
value |= ((srcValue << this.bitOffsets[k]) & this.bitMasks[k]);
}
data.setElem (lineOffset + j, value);
}
lineOffset += this.scanlineStride;
}
}, "~N,~N,~N,~N,~A,java.awt.image.DataBuffer");
Clazz.defineMethod (c$, "setSample", 
function (x, y, b, s, data) {
if ((x < 0) || (y < 0) || (x >= this.width) || (y >= this.height)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var value = data.getElem (y * this.scanlineStride + x);
value &= ~this.bitMasks[b];
value |= (s << this.bitOffsets[b]) & this.bitMasks[b];
data.setElem (y * this.scanlineStride + x, value);
}, "~N,~N,~N,~N,java.awt.image.DataBuffer");
Clazz.defineMethod (c$, "setSamples", 
function (x, y, w, h, b, iArray, data) {
if ((x < 0) || (y < 0) || (x + w > this.width) || (y + h > this.height)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var lineOffset = y * this.scanlineStride + x;
var srcOffset = 0;
for (var i = 0; i < h; i++) {
for (var j = 0; j < w; j++) {
var value = data.getElem (lineOffset + j);
value &= ~this.bitMasks[b];
var sample = iArray[srcOffset++];
value |= (sample << this.bitOffsets[b]) & this.bitMasks[b];
data.setElem (lineOffset + j, value);
}
lineOffset += this.scanlineStride;
}
}, "~N,~N,~N,~N,~N,~A,java.awt.image.DataBuffer");
Clazz.overrideMethod (c$, "equals", 
function (o) {
if ((o == null) || !(Clazz.instanceOf (o, java.awt.image.SinglePixelPackedSampleModel))) {
return false;
}var that = o;
return this.width == that.width && this.height == that.height && this.numBands == that.numBands && this.dataType == that.dataType && java.util.Arrays.equals (this.bitMasks, that.bitMasks) && java.util.Arrays.equals (this.bitOffsets, that.bitOffsets) && java.util.Arrays.equals (this.bitSizes, that.bitSizes) && this.maxBitSize == that.maxBitSize && this.scanlineStride == that.scanlineStride;
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
var hash = 0;
hash = this.width;
hash <<= 8;
hash ^= this.height;
hash <<= 8;
hash ^= this.numBands;
hash <<= 8;
hash ^= this.dataType;
hash <<= 8;
for (var i = 0; i < this.bitMasks.length; i++) {
hash ^= this.bitMasks[i];
hash <<= 8;
}
for (var i = 0; i < this.bitOffsets.length; i++) {
hash ^= this.bitOffsets[i];
hash <<= 8;
}
for (var i = 0; i < this.bitSizes.length; i++) {
hash ^= this.bitSizes[i];
hash <<= 8;
}
hash ^= this.maxBitSize;
hash <<= 8;
hash ^= this.scanlineStride;
return hash;
});
});
