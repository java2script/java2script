Clazz.declarePackage ("java.awt.image");
Clazz.load (["java.awt.image.SampleModel"], "java.awt.image.MultiPixelPackedSampleModel", ["java.lang.ArrayIndexOutOfBoundsException", "$.IllegalArgumentException", "java.awt.image.DataBuffer", "$.DataBufferByte", "$.DataBufferInt", "$.RasterFormatException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pixelBitStride = 0;
this.bitMask = 0;
this.pixelsPerDataElement = 0;
this.dataElementSize = 0;
this.dataBitOffset = 0;
this.scanlineStride = 0;
Clazz.instantialize (this, arguments);
}, java.awt.image, "MultiPixelPackedSampleModel", java.awt.image.SampleModel);
Clazz.makeConstructor (c$, 
function (dataType, w, h, numberOfBits) {
this.construct (dataType, w, h, numberOfBits, Clazz.doubleToInt ((w * numberOfBits + java.awt.image.DataBuffer.getDataTypeSize (dataType) - 1) / java.awt.image.DataBuffer.getDataTypeSize (dataType)), 0);
if (dataType != 0 && dataType != 3) {
throw  new IllegalArgumentException ("Unsupported data type " + dataType);
}}, "~N,~N,~N,~N");
Clazz.makeConstructor (c$, 
function (dataType, w, h, numberOfBits, scanlineStride, dataBitOffset) {
Clazz.superConstructor (this, java.awt.image.MultiPixelPackedSampleModel, [dataType, w, h, 1]);
if (dataType != 0 && dataType != 3) {
throw  new IllegalArgumentException ("Unsupported data type " + dataType);
}this.dataType = dataType;
this.pixelBitStride = numberOfBits;
this.scanlineStride = scanlineStride;
this.dataBitOffset = dataBitOffset;
this.dataElementSize = java.awt.image.DataBuffer.getDataTypeSize (dataType);
this.pixelsPerDataElement = Clazz.doubleToInt (this.dataElementSize / numberOfBits);
if (this.pixelsPerDataElement * numberOfBits != this.dataElementSize) {
throw  new java.awt.image.RasterFormatException ("MultiPixelPackedSampleModel does not allow pixels to span data element boundaries");
}this.bitMask = (1 << numberOfBits) - 1;
}, "~N,~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "createCompatibleSampleModel", 
function (w, h) {
var sampleModel =  new java.awt.image.MultiPixelPackedSampleModel (this.dataType, w, h, this.pixelBitStride);
return sampleModel;
}, "~N,~N");
Clazz.overrideMethod (c$, "createDataBuffer", 
function () {
var dataBuffer = null;
var size = this.scanlineStride * this.height;
switch (this.dataType) {
case 0:
dataBuffer =  new java.awt.image.DataBufferByte (size + Clazz.doubleToInt ((this.dataBitOffset + 7) / 8));
break;
case 3:
dataBuffer =  new java.awt.image.DataBufferInt (size + Clazz.doubleToInt ((this.dataBitOffset + 31) / 32));
break;
}
return dataBuffer;
});
Clazz.overrideMethod (c$, "getNumDataElements", 
function () {
return 1;
});
Clazz.defineMethod (c$, "getSampleSize", 
function () {
var sampleSize =  Clazz.newIntArray (-1, [this.pixelBitStride]);
return sampleSize;
});
Clazz.defineMethod (c$, "getSampleSize", 
function (band) {
return this.pixelBitStride;
}, "~N");
Clazz.defineMethod (c$, "getOffset", 
function (x, y) {
var offset = y * this.scanlineStride;
offset += Clazz.doubleToInt ((x * this.pixelBitStride + this.dataBitOffset) / this.dataElementSize);
return offset;
}, "~N,~N");
Clazz.defineMethod (c$, "getBitOffset", 
function (x) {
return (x * this.pixelBitStride + this.dataBitOffset) % this.dataElementSize;
}, "~N");
Clazz.defineMethod (c$, "getScanlineStride", 
function () {
return this.scanlineStride;
});
Clazz.defineMethod (c$, "getPixelBitStride", 
function () {
return this.pixelBitStride;
});
Clazz.defineMethod (c$, "getDataBitOffset", 
function () {
return this.dataBitOffset;
});
Clazz.overrideMethod (c$, "getTransferType", 
function () {
return 3;
});
Clazz.overrideMethod (c$, "createSubsetSampleModel", 
function (bands) {
if (bands != null) {
if (bands.length != 1) throw  new java.awt.image.RasterFormatException ("MultiPixelPackedSampleModel has only one band.");
}var sm = this.createCompatibleSampleModel (this.width, this.height);
return sm;
}, "~A");
Clazz.overrideMethod (c$, "getSample", 
function (x, y, b, data) {
if ((x < 0) || (y < 0) || (x >= this.width) || (y >= this.height) || (b != 0)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var bitnum = this.dataBitOffset + x * this.pixelBitStride;
var element = data.getElem (y * this.scanlineStride + Clazz.doubleToInt (bitnum / this.dataElementSize));
var shift = this.dataElementSize - (bitnum & (this.dataElementSize - 1)) - this.pixelBitStride;
return (element >> shift) & this.bitMask;
}, "~N,~N,~N,java.awt.image.DataBuffer");
Clazz.defineMethod (c$, "setSample", 
function (x, y, b, s, data) {
if ((x < 0) || (y < 0) || (x >= this.width) || (y >= this.height) || (b != 0)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var bitnum = this.dataBitOffset + x * this.pixelBitStride;
var index = y * this.scanlineStride + (Clazz.doubleToInt (bitnum / this.dataElementSize));
var shift = this.dataElementSize - (bitnum & (this.dataElementSize - 1)) - this.pixelBitStride;
var element = data.getElem (index);
element &= ~(this.bitMask << shift);
element |= (s & this.bitMask) << shift;
data.setElem (index, element);
}, "~N,~N,~N,~N,java.awt.image.DataBuffer");
Clazz.defineMethod (c$, "getDataElements", 
function (x, y, obj, data) {
if ((x < 0) || (y < 0) || (x >= this.width) || (y >= this.height)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var type = this.getTransferType ();
var bitnum = this.dataBitOffset + x * this.pixelBitStride;
var shift = this.dataElementSize - (bitnum & (this.dataElementSize - 1)) - this.pixelBitStride;
var element = 0;
switch (type) {
case 0:
var bdata;
if (obj == null) bdata =  Clazz.newByteArray (1, 0);
 else bdata = obj;
element = data.getElem (y * this.scanlineStride + Clazz.doubleToInt (bitnum / this.dataElementSize));
bdata[0] = ((element >> shift) & this.bitMask);
obj = bdata;
break;
case 3:
var idata;
if (obj == null) idata =  Clazz.newIntArray (1, 0);
 else idata = obj;
element = data.getElem (y * this.scanlineStride + Clazz.doubleToInt (bitnum / this.dataElementSize));
idata[0] = (element >> shift) & this.bitMask;
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
if (iArray != null) {
pixels = iArray;
} else {
pixels =  Clazz.newIntArray (this.numBands, 0);
}var bitnum = this.dataBitOffset + x * this.pixelBitStride;
var element = data.getElem (y * this.scanlineStride + Clazz.doubleToInt (bitnum / this.dataElementSize));
var shift = this.dataElementSize - (bitnum & (this.dataElementSize - 1)) - this.pixelBitStride;
pixels[0] = (element >> shift) & this.bitMask;
return pixels;
}, "~N,~N,~A,java.awt.image.DataBuffer");
Clazz.defineMethod (c$, "setDataElements", 
function (x, y, obj, data) {
if ((x < 0) || (y < 0) || (x >= this.width) || (y >= this.height)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var type = this.getTransferType ();
var bitnum = this.dataBitOffset + x * this.pixelBitStride;
var index = y * this.scanlineStride + (Clazz.doubleToInt (bitnum / this.dataElementSize));
var shift = this.dataElementSize - (bitnum & (this.dataElementSize - 1)) - this.pixelBitStride;
var element = data.getElem (index);
element &= ~(this.bitMask << shift);
switch (type) {
case 0:
var barray = obj;
element |= (((barray[0]) & 0xff) & this.bitMask) << shift;
data.setElem (index, element);
break;
case 3:
var iarray = obj;
element |= (iarray[0] & this.bitMask) << shift;
data.setElem (index, element);
break;
}
}, "~N,~N,~O,java.awt.image.DataBuffer");
Clazz.defineMethod (c$, "setPixel", 
function (x, y, iArray, data) {
if ((x < 0) || (y < 0) || (x >= this.width) || (y >= this.height)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var bitnum = this.dataBitOffset + x * this.pixelBitStride;
var index = y * this.scanlineStride + (Clazz.doubleToInt (bitnum / this.dataElementSize));
var shift = this.dataElementSize - (bitnum & (this.dataElementSize - 1)) - this.pixelBitStride;
var element = data.getElem (index);
element &= ~(this.bitMask << shift);
element |= (iArray[0] & this.bitMask) << shift;
data.setElem (index, element);
}, "~N,~N,~A,java.awt.image.DataBuffer");
Clazz.overrideMethod (c$, "equals", 
function (o) {
if ((o == null) || !(Clazz.instanceOf (o, java.awt.image.MultiPixelPackedSampleModel))) {
return false;
}var that = o;
return this.width == that.width && this.height == that.height && this.numBands == that.numBands && this.dataType == that.dataType && this.pixelBitStride == that.pixelBitStride && this.bitMask == that.bitMask && this.pixelsPerDataElement == that.pixelsPerDataElement && this.dataElementSize == that.dataElementSize && this.dataBitOffset == that.dataBitOffset && this.scanlineStride == that.scanlineStride;
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
hash ^= this.pixelBitStride;
hash <<= 8;
hash ^= this.bitMask;
hash <<= 8;
hash ^= this.pixelsPerDataElement;
hash <<= 8;
hash ^= this.dataElementSize;
hash <<= 8;
hash ^= this.dataBitOffset;
hash <<= 8;
hash ^= this.scanlineStride;
return hash;
});
});
