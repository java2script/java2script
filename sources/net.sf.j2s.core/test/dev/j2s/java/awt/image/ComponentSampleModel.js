Clazz.declarePackage ("java.awt.image");
Clazz.load (["java.awt.image.SampleModel"], "java.awt.image.ComponentSampleModel", ["java.lang.ArrayIndexOutOfBoundsException", "$.IllegalArgumentException", "java.util.Arrays", "java.awt.image.DataBuffer", "$.DataBufferByte", "$.DataBufferInt", "$.DataBufferShort", "$.DataBufferUShort", "$.RasterFormatException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bandOffsets = null;
this.bankIndices = null;
this.$numBands = 1;
this.numBanks = 1;
this.scanlineStride = 0;
this.pixelStride = 0;
Clazz.instantialize (this, arguments);
}, java.awt.image, "ComponentSampleModel", java.awt.image.SampleModel);
Clazz.makeConstructor (c$, 
function (dataType, w, h, pixelStride, scanlineStride, bandOffsets) {
Clazz.superConstructor (this, java.awt.image.ComponentSampleModel, [dataType, w, h, bandOffsets.length]);
this.dataType = dataType;
this.pixelStride = pixelStride;
this.scanlineStride = scanlineStride;
this.bandOffsets = bandOffsets.clone ();
this.$numBands = bandOffsets.length;
if (pixelStride < 0) {
throw  new IllegalArgumentException ("Pixel stride must be >= 0");
}if (scanlineStride < 0) {
throw  new IllegalArgumentException ("Scanline stride must be >= 0");
}if (this.$numBands < 1) {
throw  new IllegalArgumentException ("Must have at least one band.");
}if ((dataType < 0)) {
throw  new IllegalArgumentException ("Unsupported dataType.");
}this.bankIndices =  Clazz.newIntArray (this.$numBands, 0);
for (var i = 0; i < this.$numBands; i++) {
this.bankIndices[i] = 0;
}
}, "~N,~N,~N,~N,~N,~A");
Clazz.makeConstructor (c$, 
function (dataType, w, h, pixelStride, scanlineStride, bankIndices, bandOffsets) {
Clazz.superConstructor (this, java.awt.image.ComponentSampleModel, [dataType, w, h, bandOffsets.length]);
this.dataType = dataType;
this.pixelStride = pixelStride;
this.scanlineStride = scanlineStride;
this.bandOffsets = bandOffsets.clone ();
this.bankIndices = bankIndices.clone ();
if (pixelStride < 0) {
throw  new IllegalArgumentException ("Pixel stride must be >= 0");
}if (scanlineStride < 0) {
throw  new IllegalArgumentException ("Scanline stride must be >= 0");
}if ((dataType < 0)) {
throw  new IllegalArgumentException ("Unsupported dataType.");
}var maxBank = bankIndices[0];
if (maxBank < 0) {
throw  new IllegalArgumentException ("Index of bank 0 is less than 0 (" + maxBank + ")");
}for (var i = 1; i < bankIndices.length; i++) {
if (bankIndices[i] > maxBank) {
maxBank = bankIndices[i];
} else if (bankIndices[i] < 0) {
throw  new IllegalArgumentException ("Index of bank " + i + " is less than 0 (" + maxBank + ")");
}}
this.numBanks = maxBank + 1;
this.$numBands = bandOffsets.length;
if (bandOffsets.length != bankIndices.length) {
throw  new IllegalArgumentException ("Length of bandOffsets must equal length of bankIndices.");
}}, "~N,~N,~N,~N,~N,~A,~A");
Clazz.defineMethod (c$, "getBufferSize", 
 function () {
var maxBandOff = this.bandOffsets[0];
for (var i = 1; i < this.bandOffsets.length; i++) maxBandOff = Math.max (maxBandOff, this.bandOffsets[i]);

var size = 0;
if (maxBandOff >= 0) size += maxBandOff + 1;
if (this.pixelStride > 0) size += this.pixelStride * (this.width - 1);
if (this.scanlineStride > 0) size += this.scanlineStride * (this.height - 1);
return size;
});
Clazz.defineMethod (c$, "orderBands", 
function (orig, step) {
var map =  Clazz.newIntArray (orig.length, 0);
var ret =  Clazz.newIntArray (orig.length, 0);
for (var i = 0; i < map.length; i++) map[i] = i;

for (var i = 0; i < ret.length; i++) {
var index = i;
for (var j = i + 1; j < ret.length; j++) {
if (orig[map[index]] > orig[map[j]]) {
index = j;
}}
ret[map[index]] = i * step;
map[index] = map[i];
}
return ret;
}, "~A,~N");
Clazz.overrideMethod (c$, "createCompatibleSampleModel", 
function (w, h) {
var ret = null;
var size;
var minBandOff = this.bandOffsets[0];
var maxBandOff = this.bandOffsets[0];
for (var i = 1; i < this.bandOffsets.length; i++) {
minBandOff = Math.min (minBandOff, this.bandOffsets[i]);
maxBandOff = Math.max (maxBandOff, this.bandOffsets[i]);
}
maxBandOff -= minBandOff;
var bands = this.bandOffsets.length;
var bandOff;
var pStride = Math.abs (this.pixelStride);
var lStride = Math.abs (this.scanlineStride);
var bStride = Math.abs (maxBandOff);
if (pStride > lStride) {
if (pStride > bStride) {
if (lStride > bStride) {
bandOff =  Clazz.newIntArray (this.bandOffsets.length, 0);
for (var i = 0; i < bands; i++) bandOff[i] = this.bandOffsets[i] - minBandOff;

lStride = bStride + 1;
pStride = lStride * h;
} else {
bandOff = this.orderBands (this.bandOffsets, lStride * h);
pStride = bands * lStride * h;
}} else {
pStride = lStride * h;
bandOff = this.orderBands (this.bandOffsets, pStride * w);
}} else {
if (pStride > bStride) {
bandOff =  Clazz.newIntArray (this.bandOffsets.length, 0);
for (var i = 0; i < bands; i++) bandOff[i] = this.bandOffsets[i] - minBandOff;

pStride = bStride + 1;
lStride = pStride * w;
} else {
if (lStride > bStride) {
bandOff = this.orderBands (this.bandOffsets, pStride * w);
lStride = bands * pStride * w;
} else {
lStride = pStride * w;
bandOff = this.orderBands (this.bandOffsets, lStride * h);
}}}var base = 0;
if (this.scanlineStride < 0) {
base += lStride * h;
lStride *= -1;
}if (this.pixelStride < 0) {
base += pStride * w;
pStride *= -1;
}for (var i = 0; i < bands; i++) bandOff[i] += base;

return  new java.awt.image.ComponentSampleModel (this.dataType, w, h, pStride, lStride, this.bankIndices, bandOff);
}, "~N,~N");
Clazz.overrideMethod (c$, "createSubsetSampleModel", 
function (bands) {
if (bands.length > this.bankIndices.length) throw  new java.awt.image.RasterFormatException ("There are only " + this.bankIndices.length + " bands");
var newBankIndices =  Clazz.newIntArray (bands.length, 0);
var newBandOffsets =  Clazz.newIntArray (bands.length, 0);
for (var i = 0; i < bands.length; i++) {
newBankIndices[i] = this.bankIndices[bands[i]];
newBandOffsets[i] = this.bandOffsets[bands[i]];
}
return  new java.awt.image.ComponentSampleModel (this.dataType, this.width, this.height, this.pixelStride, this.scanlineStride, newBankIndices, newBandOffsets);
}, "~A");
Clazz.overrideMethod (c$, "createDataBuffer", 
function () {
var dataBuffer = null;
var size = this.getBufferSize ();
switch (this.dataType) {
case 0:
dataBuffer =  new java.awt.image.DataBufferByte (size, this.numBanks);
break;
case 1:
dataBuffer =  new java.awt.image.DataBufferUShort (size, this.numBanks);
break;
case 2:
dataBuffer =  new java.awt.image.DataBufferShort (size, this.numBanks);
break;
case 3:
dataBuffer =  new java.awt.image.DataBufferInt (size, this.numBanks);
break;
}
return dataBuffer;
});
Clazz.defineMethod (c$, "getOffset", 
function (x, y) {
var offset = y * this.scanlineStride + x * this.pixelStride + this.bandOffsets[0];
return offset;
}, "~N,~N");
Clazz.defineMethod (c$, "getOffset", 
function (x, y, b) {
var offset = y * this.scanlineStride + x * this.pixelStride + this.bandOffsets[b];
return offset;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getSampleSize", 
function () {
var sampleSize =  Clazz.newIntArray (this.$numBands, 0);
var sizeInBits = this.getSampleSize (0);
for (var i = 0; i < this.$numBands; i++) sampleSize[i] = sizeInBits;

return sampleSize;
});
Clazz.defineMethod (c$, "getSampleSize", 
function (band) {
return java.awt.image.DataBuffer.getDataTypeSize (this.dataType);
}, "~N");
Clazz.defineMethod (c$, "getBankIndices", 
function () {
return this.bankIndices.clone ();
});
Clazz.defineMethod (c$, "getBandOffsets", 
function () {
return this.bandOffsets.clone ();
});
Clazz.defineMethod (c$, "getScanlineStride", 
function () {
return this.scanlineStride;
});
Clazz.defineMethod (c$, "getPixelStride", 
function () {
return this.pixelStride;
});
Clazz.overrideMethod (c$, "getNumDataElements", 
function () {
return this.getNumBands ();
});
Clazz.defineMethod (c$, "getDataElements", 
function (x, y, obj, data) {
if ((x < 0) || (y < 0) || (x >= this.width) || (y >= this.height)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var type = this.getTransferType ();
var numDataElems = this.getNumDataElements ();
var pixelOffset = y * this.scanlineStride + x * this.pixelStride;
switch (type) {
case 0:
var bdata;
if (obj == null) bdata =  Clazz.newByteArray (numDataElems, 0);
 else bdata = obj;
for (var i = 0; i < numDataElems; i++) {
bdata[i] = data.getElem (this.bankIndices[i], pixelOffset + this.bandOffsets[i]);
}
obj = bdata;
break;
case 1:
case 2:
var sdata;
if (obj == null) sdata =  Clazz.newShortArray (numDataElems, 0);
 else sdata = obj;
for (var i = 0; i < numDataElems; i++) {
sdata[i] = data.getElem (this.bankIndices[i], pixelOffset + this.bandOffsets[i]);
}
obj = sdata;
break;
case 3:
var idata;
if (obj == null) idata =  Clazz.newIntArray (numDataElems, 0);
 else idata = obj;
for (var i = 0; i < numDataElems; i++) {
idata[i] = data.getElem (this.bankIndices[i], pixelOffset + this.bandOffsets[i]);
}
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
pixels =  Clazz.newIntArray (this.$numBands, 0);
}var pixelOffset = y * this.scanlineStride + x * this.pixelStride;
for (var i = 0; i < this.$numBands; i++) {
pixels[i] = data.getElem (this.bankIndices[i], pixelOffset + this.bandOffsets[i]);
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
pixels =  Clazz.newIntArray (w * h * this.$numBands, 0);
}var lineOffset = y * this.scanlineStride + x * this.pixelStride;
var srcOffset = 0;
for (var i = 0; i < h; i++) {
var pixelOffset = lineOffset;
for (var j = 0; j < w; j++) {
for (var k = 0; k < this.$numBands; k++) {
pixels[srcOffset++] = data.getElem (this.bankIndices[k], pixelOffset + this.bandOffsets[k]);
}
pixelOffset += this.pixelStride;
}
lineOffset += this.scanlineStride;
}
return pixels;
}, "~N,~N,~N,~N,~A,java.awt.image.DataBuffer");
Clazz.overrideMethod (c$, "getSample", 
function (x, y, b, data) {
if ((x < 0) || (y < 0) || (x >= this.width) || (y >= this.height)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var sample = data.getElem (this.bankIndices[b], y * this.scanlineStride + x * this.pixelStride + this.bandOffsets[b]);
return sample;
}, "~N,~N,~N,java.awt.image.DataBuffer");
Clazz.overrideMethod (c$, "getSampleFloat", 
function (x, y, b, data) {
if ((x < 0) || (y < 0) || (x >= this.width) || (y >= this.height)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var sample = data.getElemFloat (this.bankIndices[b], y * this.scanlineStride + x * this.pixelStride + this.bandOffsets[b]);
return sample;
}, "~N,~N,~N,java.awt.image.DataBuffer");
Clazz.overrideMethod (c$, "getSampleDouble", 
function (x, y, b, data) {
if ((x < 0) || (y < 0) || (x >= this.width) || (y >= this.height)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var sample = data.getElemDouble (this.bankIndices[b], y * this.scanlineStride + x * this.pixelStride + this.bandOffsets[b]);
return sample;
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
}var lineOffset = y * this.scanlineStride + x * this.pixelStride + this.bandOffsets[b];
var srcOffset = 0;
for (var i = 0; i < h; i++) {
var sampleOffset = lineOffset;
for (var j = 0; j < w; j++) {
samples[srcOffset++] = data.getElem (this.bankIndices[b], sampleOffset);
sampleOffset += this.pixelStride;
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
var numDataElems = this.getNumDataElements ();
var pixelOffset = y * this.scanlineStride + x * this.pixelStride;
switch (type) {
case 0:
var barray = obj;
for (var i = 0; i < numDataElems; i++) {
data.setElem (this.bankIndices[i], pixelOffset + this.bandOffsets[i], (barray[i]) & 0xff);
}
break;
case 1:
case 2:
var sarray = obj;
for (var i = 0; i < numDataElems; i++) {
data.setElem (this.bankIndices[i], pixelOffset + this.bandOffsets[i], (sarray[i]) & 0xffff);
}
break;
case 3:
var iarray = obj;
for (var i = 0; i < numDataElems; i++) {
data.setElem (this.bankIndices[i], pixelOffset + this.bandOffsets[i], iarray[i]);
}
break;
}
}, "~N,~N,~O,java.awt.image.DataBuffer");
Clazz.defineMethod (c$, "setPixel", 
function (x, y, iArray, data) {
if ((x < 0) || (y < 0) || (x >= this.width) || (y >= this.height)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var pixelOffset = y * this.scanlineStride + x * this.pixelStride;
for (var i = 0; i < this.$numBands; i++) {
data.setElem (this.bankIndices[i], pixelOffset + this.bandOffsets[i], iArray[i]);
}
}, "~N,~N,~A,java.awt.image.DataBuffer");
Clazz.defineMethod (c$, "setPixels", 
function (x, y, w, h, iArray, data) {
if ((x < 0) || (y < 0) || (x + w > this.width) || (y + h > this.height)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var lineOffset = y * this.scanlineStride + x * this.pixelStride;
var srcOffset = 0;
for (var i = 0; i < h; i++) {
var pixelOffset = lineOffset;
for (var j = 0; j < w; j++) {
for (var k = 0; k < this.$numBands; k++) {
data.setElem (this.bankIndices[k], pixelOffset + this.bandOffsets[k], iArray[srcOffset++]);
}
pixelOffset += this.pixelStride;
}
lineOffset += this.scanlineStride;
}
}, "~N,~N,~N,~N,~A,java.awt.image.DataBuffer");
Clazz.defineMethod (c$, "setSample", 
function (x, y, b, s, data) {
if ((x < 0) || (y < 0) || (x >= this.width) || (y >= this.height)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}data.setElem (this.bankIndices[b], y * this.scanlineStride + x * this.pixelStride + this.bandOffsets[b], s);
}, "~N,~N,~N,~N,java.awt.image.DataBuffer");
Clazz.defineMethod (c$, "setSample", 
function (x, y, b, s, data) {
if ((x < 0) || (y < 0) || (x >= this.width) || (y >= this.height)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}data.setElemFloat (this.bankIndices[b], y * this.scanlineStride + x * this.pixelStride + this.bandOffsets[b], s);
}, "~N,~N,~N,~N,java.awt.image.DataBuffer");
Clazz.defineMethod (c$, "setSample", 
function (x, y, b, s, data) {
if ((x < 0) || (y < 0) || (x >= this.width) || (y >= this.height)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}data.setElemDouble (this.bankIndices[b], y * this.scanlineStride + x * this.pixelStride + this.bandOffsets[b], s);
}, "~N,~N,~N,~N,java.awt.image.DataBuffer");
Clazz.defineMethod (c$, "setSamples", 
function (x, y, w, h, b, iArray, data) {
if ((x < 0) || (y < 0) || (x + w > this.width) || (y + h > this.height)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var lineOffset = y * this.scanlineStride + x * this.pixelStride + this.bandOffsets[b];
var srcOffset = 0;
for (var i = 0; i < h; i++) {
var sampleOffset = lineOffset;
for (var j = 0; j < w; j++) {
data.setElem (this.bankIndices[b], sampleOffset, iArray[srcOffset++]);
sampleOffset += this.pixelStride;
}
lineOffset += this.scanlineStride;
}
}, "~N,~N,~N,~N,~N,~A,java.awt.image.DataBuffer");
Clazz.overrideMethod (c$, "equals", 
function (o) {
if ((o == null) || !(Clazz.instanceOf (o, java.awt.image.ComponentSampleModel))) {
return false;
}var that = o;
return this.width == that.width && this.height == that.height && this.$numBands == that.$numBands && this.dataType == that.dataType && java.util.Arrays.equals (this.bandOffsets, that.bandOffsets) && java.util.Arrays.equals (this.bankIndices, that.bankIndices) && this.$numBands == that.$numBands && this.numBanks == that.numBanks && this.scanlineStride == that.scanlineStride && this.pixelStride == that.pixelStride;
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
var hash = 0;
hash = this.width;
hash <<= 8;
hash ^= this.height;
hash <<= 8;
hash ^= this.$numBands;
hash <<= 8;
hash ^= this.dataType;
hash <<= 8;
for (var i = 0; i < this.bandOffsets.length; i++) {
hash ^= this.bandOffsets[i];
hash <<= 8;
}
for (var i = 0; i < this.bankIndices.length; i++) {
hash ^= this.bankIndices[i];
hash <<= 8;
}
hash ^= this.$numBands;
hash <<= 8;
hash ^= this.numBanks;
hash <<= 8;
hash ^= this.scanlineStride;
hash <<= 8;
hash ^= this.pixelStride;
return hash;
});
});
