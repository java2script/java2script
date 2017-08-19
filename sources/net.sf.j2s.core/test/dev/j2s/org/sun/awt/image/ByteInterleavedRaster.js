Clazz.declarePackage ("sun.awt.image");
Clazz.load (["sun.awt.image.ByteComponentRaster"], "sun.awt.image.ByteInterleavedRaster", ["java.lang.ArrayIndexOutOfBoundsException", "java.awt.Point", "$.Rectangle", "java.awt.image.DataBufferByte", "$.RasterFormatException", "$.SinglePixelPackedSampleModel"], function () {
c$ = Clazz.decorateAsClass (function () {
this.inOrder = false;
this.dbOffset = 0;
this.dbOffsetPacked = 0;
this.packed = false;
this.bitMasks = null;
this.bitOffsets = null;
this.$maxX = 0;
this.$maxY = 0;
Clazz.instantialize (this, arguments);
}, sun.awt.image, "ByteInterleavedRaster", sun.awt.image.ByteComponentRaster);
Clazz.makeConstructor (c$, 
function (sampleModel, origin) {
Clazz.superConstructor (this, sun.awt.image.ByteInterleavedRaster, []);
this.setByteInterRaster (sampleModel, sampleModel.createDataBuffer (),  new java.awt.Rectangle (origin.x, origin.y, sampleModel.getWidth (), sampleModel.getHeight ()), origin, null);
}, "java.awt.image.SampleModel,java.awt.Point");
Clazz.makeConstructor (c$, 
function (sampleModel, dataBuffer, origin) {
Clazz.superConstructor (this, sun.awt.image.ByteInterleavedRaster, []);
this.setParams (sampleModel, dataBuffer, origin);
}, "java.awt.image.SampleModel,java.awt.image.DataBuffer,java.awt.Point");
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, sun.awt.image.ByteInterleavedRaster, []);
});
Clazz.overrideMethod (c$, "setParams", 
function (sampleModel, dataBuffer, origin) {
this.setByteInterRaster (sampleModel, dataBuffer,  new java.awt.Rectangle (origin.x, origin.y, sampleModel.getWidth (), sampleModel.getHeight ()), origin, null);
}, "java.awt.image.SampleModel,java.awt.image.DataBuffer,java.awt.Point");
Clazz.makeConstructor (c$, 
function (sampleModel, dataBuffer, aRegion, origin, parent) {
Clazz.superConstructor (this, sun.awt.image.ByteInterleavedRaster, []);
this.setByteInterRaster (sampleModel, dataBuffer, aRegion, origin, parent);
}, "java.awt.image.SampleModel,java.awt.image.DataBuffer,java.awt.Rectangle,java.awt.Point,sun.awt.image.ByteInterleavedRaster");
Clazz.defineMethod (c$, "setByteInterRaster", 
 function (sampleModel, dataBuffer, aRegion, origin, parent) {
this.$maxX = this.minX + this.width;
this.$maxY = this.minY + this.height;
if (!(Clazz.instanceOf (dataBuffer, java.awt.image.DataBufferByte))) {
throw  new java.awt.image.RasterFormatException ("ByteInterleavedRasters must have byte DataBuffers");
}var dbb = dataBuffer;
this.data = sun.awt.image.SunWritableRaster.stealData (dbb, 0);
var xOffset = aRegion.x - origin.x;
var yOffset = aRegion.y - origin.y;
if (Clazz.instanceOf (sampleModel, java.awt.image.SinglePixelPackedSampleModel)) {
var sppsm = sampleModel;
this.packed = true;
this.bitMasks = sppsm.getBitMasks ();
this.bitOffsets = sppsm.getBitOffsets ();
this.scanlineStride = sppsm.getScanlineStride ();
this.pixelStride = 1;
this.dataOffsets =  Clazz.newIntArray (1, 0);
this.dataOffsets[0] = dbb.getOffset ();
this.dataOffsets[0] += xOffset * this.pixelStride + yOffset * this.scanlineStride;
} else {
throw  new java.awt.image.RasterFormatException ("ByteInterleavedRasters must " + "have PixelInterleavedSampleModel, SinglePixelPackedSampleModel" + " or interleaved ComponentSampleModel.  Sample model is " + sampleModel);
}this.bandOffset = this.dataOffsets[0];
this.dbOffsetPacked = dataBuffer.getOffset () - this.sampleModelTranslateY * this.scanlineStride - this.sampleModelTranslateX * this.pixelStride;
this.dbOffset = this.dbOffsetPacked - (xOffset * this.pixelStride + yOffset * this.scanlineStride);
this.inOrder = false;
if (this.numDataElements == this.pixelStride) {
this.inOrder = true;
for (var i = 1; i < this.numDataElements; i++) {
if (this.dataOffsets[i] - this.dataOffsets[0] != i) {
this.inOrder = false;
break;
}}
}this.verify ();
}, "java.awt.image.SampleModel,java.awt.image.DataBuffer,java.awt.Rectangle,java.awt.Point,sun.awt.image.ByteInterleavedRaster");
Clazz.overrideMethod (c$, "getDataOffsets", 
function () {
return this.dataOffsets.clone ();
});
Clazz.overrideMethod (c$, "getDataOffset", 
function (band) {
return this.dataOffsets[band];
}, "~N");
Clazz.overrideMethod (c$, "getScanlineStride", 
function () {
return this.scanlineStride;
});
Clazz.overrideMethod (c$, "getPixelStride", 
function () {
return this.pixelStride;
});
Clazz.overrideMethod (c$, "getDataStorage", 
function () {
return this.data;
});
Clazz.defineMethod (c$, "getDataElements", 
function (x, y, obj) {
if ((x < this.minX) || (y < this.minY) || (x >= this.$maxX) || (y >= this.$maxY)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var outData;
if (obj == null) {
outData =  Clazz.newByteArray (this.numDataElements, 0);
} else {
outData = obj;
}var off = (y - this.minY) * this.scanlineStride + (x - this.minX) * this.pixelStride;
for (var band = 0; band < this.numDataElements; band++) {
outData[band] = this.data[this.dataOffsets[band] + off];
}
return outData;
}, "~N,~N,~O");
Clazz.defineMethod (c$, "getDataElements", 
function (x, y, w, h, obj) {
return this.getByteData (x, y, w, h, obj);
}, "~N,~N,~N,~N,~O");
Clazz.defineMethod (c$, "getByteData", 
function (x, y, w, h, band, outData) {
if ((x < this.minX) || (y < this.minY) || (x + w > this.$maxX) || (y + h > this.$maxY)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}if (outData == null) {
outData =  Clazz.newByteArray (w * h, 0);
}var yoff = (y - this.minY) * this.scanlineStride + (x - this.minX) * this.pixelStride + this.dataOffsets[band];
var xoff;
var off = 0;
var xstart;
var ystart;
if (this.pixelStride == 1) {
if (this.scanlineStride == w) {
System.arraycopy (this.data, yoff, outData, 0, w * h);
} else {
for (ystart = 0; ystart < h; ystart++, yoff += this.scanlineStride) {
System.arraycopy (this.data, yoff, outData, off, w);
off += w;
}
}} else {
for (ystart = 0; ystart < h; ystart++, yoff += this.scanlineStride) {
xoff = yoff;
for (xstart = 0; xstart < w; xstart++, xoff += this.pixelStride) {
outData[off++] = this.data[xoff];
}
}
}return outData;
}, "~N,~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "getByteData", 
function (x, y, w, h, outData) {
if ((x < this.minX) || (y < this.minY) || (x + w > this.$maxX) || (y + h > this.$maxY)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}if (outData == null) {
outData =  Clazz.newByteArray (this.numDataElements * w * h, 0);
}var yoff = (y - this.minY) * this.scanlineStride + (x - this.minX) * this.pixelStride;
var xoff;
var off = 0;
var xstart;
var ystart;
if (this.inOrder) {
yoff += this.dataOffsets[0];
var rowBytes = w * this.pixelStride;
if (this.scanlineStride == rowBytes) {
System.arraycopy (this.data, yoff, outData, off, rowBytes * h);
} else {
for (ystart = 0; ystart < h; ystart++, yoff += this.scanlineStride) {
System.arraycopy (this.data, yoff, outData, off, rowBytes);
off += rowBytes;
}
}} else if (this.numDataElements == 1) {
yoff += this.dataOffsets[0];
for (ystart = 0; ystart < h; ystart++, yoff += this.scanlineStride) {
xoff = yoff;
for (xstart = 0; xstart < w; xstart++, xoff += this.pixelStride) {
outData[off++] = this.data[xoff];
}
}
} else if (this.numDataElements == 2) {
yoff += this.dataOffsets[0];
var d1 = this.dataOffsets[1] - this.dataOffsets[0];
for (ystart = 0; ystart < h; ystart++, yoff += this.scanlineStride) {
xoff = yoff;
for (xstart = 0; xstart < w; xstart++, xoff += this.pixelStride) {
outData[off++] = this.data[xoff];
outData[off++] = this.data[xoff + d1];
}
}
} else if (this.numDataElements == 3) {
yoff += this.dataOffsets[0];
var d1 = this.dataOffsets[1] - this.dataOffsets[0];
var d2 = this.dataOffsets[2] - this.dataOffsets[0];
for (ystart = 0; ystart < h; ystart++, yoff += this.scanlineStride) {
xoff = yoff;
for (xstart = 0; xstart < w; xstart++, xoff += this.pixelStride) {
outData[off++] = this.data[xoff];
outData[off++] = this.data[xoff + d1];
outData[off++] = this.data[xoff + d2];
}
}
} else if (this.numDataElements == 4) {
yoff += this.dataOffsets[0];
var d1 = this.dataOffsets[1] - this.dataOffsets[0];
var d2 = this.dataOffsets[2] - this.dataOffsets[0];
var d3 = this.dataOffsets[3] - this.dataOffsets[0];
for (ystart = 0; ystart < h; ystart++, yoff += this.scanlineStride) {
xoff = yoff;
for (xstart = 0; xstart < w; xstart++, xoff += this.pixelStride) {
outData[off++] = this.data[xoff];
outData[off++] = this.data[xoff + d1];
outData[off++] = this.data[xoff + d2];
outData[off++] = this.data[xoff + d3];
}
}
} else {
for (ystart = 0; ystart < h; ystart++, yoff += this.scanlineStride) {
xoff = yoff;
for (xstart = 0; xstart < w; xstart++, xoff += this.pixelStride) {
for (var c = 0; c < this.numDataElements; c++) {
outData[off++] = this.data[this.dataOffsets[c] + xoff];
}
}
}
}return outData;
}, "~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "setDataElements", 
function (x, y, obj) {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
if ((x < this.minX) || (y < this.minY) || (x >= this.$maxX) || (y >= this.$maxY)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var inData = obj;
var off = (y - this.minY) * this.scanlineStride + (x - this.minX) * this.pixelStride;
for (var i = 0; i < this.numDataElements; i++) {
this.data[this.dataOffsets[i] + off] = inData[i];
}
this.markDirty ();
}, "~N,~N,~O");
Clazz.defineMethod (c$, "setDataElements", 
function (x, y, inRaster) {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
var srcOffX = inRaster.getMinX ();
var srcOffY = inRaster.getMinY ();
var dstOffX = x + srcOffX;
var dstOffY = y + srcOffY;
var width = inRaster.getWidth ();
var height = inRaster.getHeight ();
if ((dstOffX < this.minX) || (dstOffY < this.minY) || (dstOffX + width > this.$maxX) || (dstOffY + height > this.$maxY)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}this.setDataElements (dstOffX, dstOffY, srcOffX, srcOffY, width, height, inRaster);
}, "~N,~N,java.awt.image.Raster");
Clazz.defineMethod (c$, "setDataElements", 
 function (dstX, dstY, srcX, srcY, width, height, inRaster) {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
if (width <= 0 || height <= 0) {
return;
}var srcOffX = inRaster.getMinX ();
var srcOffY = inRaster.getMinY ();
var tdata = null;
if (Clazz.instanceOf (inRaster, sun.awt.image.ByteInterleavedRaster)) {
var bct = inRaster;
var bdata = bct.getDataStorage ();
if (this.inOrder && bct.inOrder && this.pixelStride == bct.pixelStride) {
var toff = bct.getDataOffset (0);
var tss = bct.getScanlineStride ();
var tps = bct.getPixelStride ();
var srcOffset = toff + (srcY - srcOffY) * tss + (srcX - srcOffX) * tps;
var dstOffset = this.dataOffsets[0] + (dstY - this.minY) * this.scanlineStride + (dstX - this.minX) * this.pixelStride;
var nbytes = width * this.pixelStride;
for (var tmpY = 0; tmpY < height; tmpY++) {
System.arraycopy (bdata, srcOffset, this.data, dstOffset, nbytes);
srcOffset += tss;
dstOffset += this.scanlineStride;
}
this.markDirty ();
return;
}}for (var startY = 0; startY < height; startY++) {
tdata = inRaster.getDataElements (srcOffX, srcOffY + startY, width, 1, tdata);
this.setDataElements (dstX, dstY + startY, width, 1, tdata);
}
}, "~N,~N,~N,~N,~N,~N,java.awt.image.Raster");
Clazz.defineMethod (c$, "setDataElements", 
function (x, y, w, h, obj) {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
this.putByteData (x, y, w, h, obj);
}, "~N,~N,~N,~N,~O");
Clazz.defineMethod (c$, "putByteData", 
function (x, y, w, h, band, inData) {
if ((x < this.minX) || (y < this.minY) || (x + w > this.$maxX) || (y + h > this.$maxY)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var yoff = (y - this.minY) * this.scanlineStride + (x - this.minX) * this.pixelStride + this.dataOffsets[band];
var xoff;
var off = 0;
var xstart;
var ystart;
if (this.pixelStride == 1) {
if (this.scanlineStride == w) {
System.arraycopy (inData, 0, this.data, yoff, w * h);
} else {
for (ystart = 0; ystart < h; ystart++, yoff += this.scanlineStride) {
System.arraycopy (inData, off, this.data, yoff, w);
off += w;
}
}} else {
for (ystart = 0; ystart < h; ystart++, yoff += this.scanlineStride) {
xoff = yoff;
for (xstart = 0; xstart < w; xstart++, xoff += this.pixelStride) {
this.data[xoff] = inData[off++];
}
}
}this.markDirty ();
}, "~N,~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "putByteData", 
function (x, y, w, h, inData) {
if ((x < this.minX) || (y < this.minY) || (x + w > this.$maxX) || (y + h > this.$maxY)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var yoff = (y - this.minY) * this.scanlineStride + (x - this.minX) * this.pixelStride;
var xoff;
var off = 0;
var xstart;
var ystart;
if (this.inOrder) {
yoff += this.dataOffsets[0];
var rowBytes = w * this.pixelStride;
if (rowBytes == this.scanlineStride) {
System.arraycopy (inData, 0, this.data, yoff, rowBytes * h);
} else {
for (ystart = 0; ystart < h; ystart++, yoff += this.scanlineStride) {
System.arraycopy (inData, off, this.data, yoff, rowBytes);
off += rowBytes;
}
}} else if (this.numDataElements == 1) {
yoff += this.dataOffsets[0];
for (ystart = 0; ystart < h; ystart++, yoff += this.scanlineStride) {
xoff = yoff;
for (xstart = 0; xstart < w; xstart++, xoff += this.pixelStride) {
this.data[xoff] = inData[off++];
}
}
} else if (this.numDataElements == 2) {
yoff += this.dataOffsets[0];
var d1 = this.dataOffsets[1] - this.dataOffsets[0];
for (ystart = 0; ystart < h; ystart++, yoff += this.scanlineStride) {
xoff = yoff;
for (xstart = 0; xstart < w; xstart++, xoff += this.pixelStride) {
this.data[xoff] = inData[off++];
this.data[xoff + d1] = inData[off++];
}
}
} else if (this.numDataElements == 3) {
yoff += this.dataOffsets[0];
var d1 = this.dataOffsets[1] - this.dataOffsets[0];
var d2 = this.dataOffsets[2] - this.dataOffsets[0];
for (ystart = 0; ystart < h; ystart++, yoff += this.scanlineStride) {
xoff = yoff;
for (xstart = 0; xstart < w; xstart++, xoff += this.pixelStride) {
this.data[xoff] = inData[off++];
this.data[xoff + d1] = inData[off++];
this.data[xoff + d2] = inData[off++];
}
}
} else if (this.numDataElements == 4) {
yoff += this.dataOffsets[0];
var d1 = this.dataOffsets[1] - this.dataOffsets[0];
var d2 = this.dataOffsets[2] - this.dataOffsets[0];
var d3 = this.dataOffsets[3] - this.dataOffsets[0];
for (ystart = 0; ystart < h; ystart++, yoff += this.scanlineStride) {
xoff = yoff;
for (xstart = 0; xstart < w; xstart++, xoff += this.pixelStride) {
this.data[xoff] = inData[off++];
this.data[xoff + d1] = inData[off++];
this.data[xoff + d2] = inData[off++];
this.data[xoff + d3] = inData[off++];
}
}
} else {
for (ystart = 0; ystart < h; ystart++, yoff += this.scanlineStride) {
xoff = yoff;
for (xstart = 0; xstart < w; xstart++, xoff += this.pixelStride) {
for (var c = 0; c < this.numDataElements; c++) {
this.data[this.dataOffsets[c] + xoff] = inData[off++];
}
}
}
}this.markDirty ();
}, "~N,~N,~N,~N,~A");
Clazz.overrideMethod (c$, "getSample", 
function (x, y, b) {
if ((x < this.minX) || (y < this.minY) || (x >= this.$maxX) || (y >= this.$maxY)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}if (this.packed) {
var offset = y * this.scanlineStride + x + this.dbOffsetPacked;
var sample = this.data[offset];
return (sample & this.bitMasks[b]) >>> this.bitOffsets[b];
} else {
var offset = y * this.scanlineStride + x * this.pixelStride + this.dbOffset;
return this.data[offset + this.dataOffsets[b]] & 0xff;
}}, "~N,~N,~N");
Clazz.defineMethod (c$, "setSample", 
function (x, y, b, s) {
if ((x < this.minX) || (y < this.minY) || (x >= this.$maxX) || (y >= this.$maxY)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}if (this.packed) {
var offset = y * this.scanlineStride + x + this.dbOffsetPacked;
var bitMask = this.bitMasks[b];
var value = this.data[offset];
value &= ~bitMask;
value |= (s << this.bitOffsets[b]) & bitMask;
this.data[offset] = value;
} else {
var offset = y * this.scanlineStride + x * this.pixelStride + this.dbOffset;
this.data[offset + this.dataOffsets[b]] = s;
}this.markDirty ();
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "getSamples", 
function (x, y, w, h, b, iArray) {
if ((x < this.minX) || (y < this.minY) || (x + w > this.$maxX) || (y + h > this.$maxY)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var samples;
if (iArray != null) {
samples = iArray;
} else {
samples =  Clazz.newIntArray (w * h, 0);
}var lineOffset = y * this.scanlineStride + x * this.pixelStride;
var dstOffset = 0;
if (this.packed) {
lineOffset += this.dbOffsetPacked;
var bitMask = this.bitMasks[b];
var bitOffset = this.bitOffsets[b];
for (var j = 0; j < h; j++) {
var sampleOffset = lineOffset;
for (var i = 0; i < w; i++) {
var value = this.data[sampleOffset++];
samples[dstOffset++] = ((value & bitMask) >>> bitOffset);
}
lineOffset += this.scanlineStride;
}
} else {
lineOffset += this.dbOffset + this.dataOffsets[b];
for (var j = 0; j < h; j++) {
var sampleOffset = lineOffset;
for (var i = 0; i < w; i++) {
samples[dstOffset++] = this.data[sampleOffset] & 0xff;
sampleOffset += this.pixelStride;
}
lineOffset += this.scanlineStride;
}
}return samples;
}, "~N,~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "setSamples", 
function (x, y, w, h, b, iArray) {
if ((x < this.minX) || (y < this.minY) || (x + w > this.$maxX) || (y + h > this.$maxY)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var lineOffset = y * this.scanlineStride + x * this.pixelStride;
var srcOffset = 0;
if (this.packed) {
lineOffset += this.dbOffsetPacked;
var bitMask = this.bitMasks[b];
for (var j = 0; j < h; j++) {
var sampleOffset = lineOffset;
for (var i = 0; i < w; i++) {
var value = this.data[sampleOffset];
value &= ~bitMask;
var sample = iArray[srcOffset++];
value |= (sample << this.bitOffsets[b]) & bitMask;
this.data[sampleOffset++] = value;
}
lineOffset += this.scanlineStride;
}
} else {
lineOffset += this.dbOffset + this.dataOffsets[b];
for (var i = 0; i < h; i++) {
var sampleOffset = lineOffset;
for (var j = 0; j < w; j++) {
this.data[sampleOffset] = iArray[srcOffset++];
sampleOffset += this.pixelStride;
}
lineOffset += this.scanlineStride;
}
}this.markDirty ();
}, "~N,~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "getPixels", 
function (x, y, w, h, iArray) {
if ((x < this.minX) || (y < this.minY) || (x + w > this.$maxX) || (y + h > this.$maxY)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var pixels;
if (iArray != null) {
pixels = iArray;
} else {
pixels =  Clazz.newIntArray (w * h * this.numBands, 0);
}var lineOffset = y * this.scanlineStride + x * this.pixelStride;
var dstOffset = 0;
if (this.packed) {
lineOffset += this.dbOffsetPacked;
for (var j = 0; j < h; j++) {
for (var i = 0; i < w; i++) {
var value = this.data[lineOffset + i];
for (var k = 0; k < this.numBands; k++) {
pixels[dstOffset++] = (value & this.bitMasks[k]) >>> this.bitOffsets[k];
}
}
lineOffset += this.scanlineStride;
}
} else {
lineOffset += this.dbOffset;
var d0 = this.dataOffsets[0];
if (this.numBands == 1) {
for (var j = 0; j < h; j++) {
var pixelOffset = lineOffset + d0;
for (var i = 0; i < w; i++) {
pixels[dstOffset++] = this.data[pixelOffset] & 0xff;
pixelOffset += this.pixelStride;
}
lineOffset += this.scanlineStride;
}
} else if (this.numBands == 2) {
var d1 = this.dataOffsets[1] - d0;
for (var j = 0; j < h; j++) {
var pixelOffset = lineOffset + d0;
for (var i = 0; i < w; i++) {
pixels[dstOffset++] = this.data[pixelOffset] & 0xff;
pixels[dstOffset++] = this.data[pixelOffset + d1] & 0xff;
pixelOffset += this.pixelStride;
}
lineOffset += this.scanlineStride;
}
} else if (this.numBands == 3) {
var d1 = this.dataOffsets[1] - d0;
var d2 = this.dataOffsets[2] - d0;
for (var j = 0; j < h; j++) {
var pixelOffset = lineOffset + d0;
for (var i = 0; i < w; i++) {
pixels[dstOffset++] = this.data[pixelOffset] & 0xff;
pixels[dstOffset++] = this.data[pixelOffset + d1] & 0xff;
pixels[dstOffset++] = this.data[pixelOffset + d2] & 0xff;
pixelOffset += this.pixelStride;
}
lineOffset += this.scanlineStride;
}
} else if (this.numBands == 4) {
var d1 = this.dataOffsets[1] - d0;
var d2 = this.dataOffsets[2] - d0;
var d3 = this.dataOffsets[3] - d0;
for (var j = 0; j < h; j++) {
var pixelOffset = lineOffset + d0;
for (var i = 0; i < w; i++) {
pixels[dstOffset++] = this.data[pixelOffset] & 0xff;
pixels[dstOffset++] = this.data[pixelOffset + d1] & 0xff;
pixels[dstOffset++] = this.data[pixelOffset + d2] & 0xff;
pixels[dstOffset++] = this.data[pixelOffset + d3] & 0xff;
pixelOffset += this.pixelStride;
}
lineOffset += this.scanlineStride;
}
} else {
for (var j = 0; j < h; j++) {
var pixelOffset = lineOffset;
for (var i = 0; i < w; i++) {
for (var k = 0; k < this.numBands; k++) {
pixels[dstOffset++] = this.data[pixelOffset + this.dataOffsets[k]] & 0xff;
}
pixelOffset += this.pixelStride;
}
lineOffset += this.scanlineStride;
}
}}return pixels;
}, "~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "setPixels", 
function (x, y, w, h, iArray) {
if ((x < this.minX) || (y < this.minY) || (x + w > this.$maxX) || (y + h > this.$maxY)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var lineOffset = y * this.scanlineStride + x * this.pixelStride;
var srcOffset = 0;
if (this.packed) {
lineOffset += this.dbOffsetPacked;
for (var j = 0; j < h; j++) {
for (var i = 0; i < w; i++) {
var value = 0;
for (var k = 0; k < this.numBands; k++) {
var srcValue = iArray[srcOffset++];
value |= ((srcValue << this.bitOffsets[k]) & this.bitMasks[k]);
}
this.data[lineOffset + i] = value;
}
lineOffset += this.scanlineStride;
}
} else {
lineOffset += this.dbOffset;
var d0 = this.dataOffsets[0];
if (this.numBands == 1) {
for (var j = 0; j < h; j++) {
var pixelOffset = lineOffset + d0;
for (var i = 0; i < w; i++) {
this.data[pixelOffset] = iArray[srcOffset++];
pixelOffset += this.pixelStride;
}
lineOffset += this.scanlineStride;
}
} else if (this.numBands == 2) {
var d1 = this.dataOffsets[1] - d0;
for (var j = 0; j < h; j++) {
var pixelOffset = lineOffset + d0;
for (var i = 0; i < w; i++) {
this.data[pixelOffset] = iArray[srcOffset++];
this.data[pixelOffset + d1] = iArray[srcOffset++];
pixelOffset += this.pixelStride;
}
lineOffset += this.scanlineStride;
}
} else if (this.numBands == 3) {
var d1 = this.dataOffsets[1] - d0;
var d2 = this.dataOffsets[2] - d0;
for (var j = 0; j < h; j++) {
var pixelOffset = lineOffset + d0;
for (var i = 0; i < w; i++) {
this.data[pixelOffset] = iArray[srcOffset++];
this.data[pixelOffset + d1] = iArray[srcOffset++];
this.data[pixelOffset + d2] = iArray[srcOffset++];
pixelOffset += this.pixelStride;
}
lineOffset += this.scanlineStride;
}
} else if (this.numBands == 4) {
var d1 = this.dataOffsets[1] - d0;
var d2 = this.dataOffsets[2] - d0;
var d3 = this.dataOffsets[3] - d0;
for (var j = 0; j < h; j++) {
var pixelOffset = lineOffset + d0;
for (var i = 0; i < w; i++) {
this.data[pixelOffset] = iArray[srcOffset++];
this.data[pixelOffset + d1] = iArray[srcOffset++];
this.data[pixelOffset + d2] = iArray[srcOffset++];
this.data[pixelOffset + d3] = iArray[srcOffset++];
pixelOffset += this.pixelStride;
}
lineOffset += this.scanlineStride;
}
} else {
for (var j = 0; j < h; j++) {
var pixelOffset = lineOffset;
for (var i = 0; i < w; i++) {
for (var k = 0; k < this.numBands; k++) {
this.data[pixelOffset + this.dataOffsets[k]] = iArray[srcOffset++];
}
pixelOffset += this.pixelStride;
}
lineOffset += this.scanlineStride;
}
}}this.markDirty ();
}, "~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "setRect", 
function (dx, dy, srcRaster) {
if (!(Clazz.instanceOf (srcRaster, sun.awt.image.ByteInterleavedRaster))) {
Clazz.superCall (this, sun.awt.image.ByteInterleavedRaster, "setRect", [dx, dy, srcRaster]);
return;
}var width = srcRaster.getWidth ();
var height = srcRaster.getHeight ();
var srcOffX = srcRaster.getMinX ();
var srcOffY = srcRaster.getMinY ();
var dstOffX = dx + srcOffX;
var dstOffY = dy + srcOffY;
if (dstOffX < this.minX) {
var skipX = this.minX - dstOffX;
width -= skipX;
srcOffX += skipX;
dstOffX = this.minX;
}if (dstOffY < this.minY) {
var skipY = this.minY - dstOffY;
height -= skipY;
srcOffY += skipY;
dstOffY = this.minY;
}if (dstOffX + width > this.$maxX) {
width = this.$maxX - dstOffX;
}if (dstOffY + height > this.$maxY) {
height = this.$maxY - dstOffY;
}this.setDataElements (dstOffX, dstOffY, srcOffX, srcOffY, width, height, srcRaster);
}, "~N,~N,java.awt.image.Raster");
Clazz.overrideMethod (c$, "createChild", 
function (x, y, width, height, x0, y0, bandList) {
var newRaster = this.createWritableChild (x, y, width, height, x0, y0, bandList);
return newRaster;
}, "~N,~N,~N,~N,~N,~N,~A");
Clazz.overrideMethod (c$, "createWritableChild", 
function (x, y, width, height, x0, y0, bandList) {
if (x < this.minX) {
throw  new java.awt.image.RasterFormatException ("x lies outside the raster");
}if (y < this.minY) {
throw  new java.awt.image.RasterFormatException ("y lies outside the raster");
}if ((x + width < x) || (x + width > this.minX + this.width)) {
throw  new java.awt.image.RasterFormatException ("(x + width) is outside of Raster");
}if ((y + height < y) || (y + height > this.minY + this.height)) {
throw  new java.awt.image.RasterFormatException ("(y + height) is outside of Raster");
}var sm;
if (bandList != null) sm = this.sampleModel.createSubsetSampleModel (bandList);
 else sm = this.sampleModel;
var deltaX = x0 - x;
var deltaY = y0 - y;
return  new sun.awt.image.ByteInterleavedRaster (sm, this.dataBuffer,  new java.awt.Rectangle (x0, y0, width, height),  new java.awt.Point (this.sampleModelTranslateX + deltaX, this.sampleModelTranslateY + deltaY), this);
}, "~N,~N,~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "createCompatibleWritableRaster", 
function (w, h) {
if (w <= 0 || h <= 0) {
throw  new java.awt.image.RasterFormatException ("negative " + ((w <= 0) ? "width" : "height"));
}var sm = this.sampleModel.createCompatibleSampleModel (w, h);
return  new sun.awt.image.ByteInterleavedRaster (sm,  new java.awt.Point (0, 0));
}, "~N,~N");
Clazz.defineMethod (c$, "createCompatibleWritableRaster", 
function () {
return this.createCompatibleWritableRaster (this.width, this.height);
});
Clazz.overrideMethod (c$, "toString", 
function () {
return  String.instantialize ("ByteInterleavedRaster: width = " + this.width + " height = " + this.height + " #numDataElements " + this.numDataElements + " dataOff[0] = " + this.dataOffsets[0]);
});
});
