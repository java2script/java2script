Clazz.declarePackage ("sun.awt.image");
Clazz.load (["sun.awt.image.SunWritableRaster"], "sun.awt.image.BytePackedRaster", ["java.lang.ArrayIndexOutOfBoundsException", "java.awt.Point", "$.Rectangle", "java.awt.image.DataBufferByte", "$.MultiPixelPackedSampleModel", "$.RasterFormatException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.dataBitOffset = 0;
this.scanlineStride = 0;
this.pixelBitStride = 0;
this.bitMask = 0;
this.data = null;
this.shiftOffset = 0;
this.type = 0;
this.maxX = 0;
this.maxY = 0;
Clazz.instantialize (this, arguments);
}, sun.awt.image, "BytePackedRaster", sun.awt.image.SunWritableRaster);
Clazz.makeConstructor (c$, 
function (sampleModel, origin) {
this.construct (sampleModel, sampleModel.createDataBuffer (),  new java.awt.Rectangle (origin.x, origin.y, sampleModel.getWidth (), sampleModel.getHeight ()), origin, null);
}, "java.awt.image.SampleModel,java.awt.Point");
Clazz.makeConstructor (c$, 
function (sampleModel, dataBuffer, origin) {
this.construct (sampleModel, dataBuffer,  new java.awt.Rectangle (origin.x, origin.y, sampleModel.getWidth (), sampleModel.getHeight ()), origin, null);
}, "java.awt.image.SampleModel,java.awt.image.DataBuffer,java.awt.Point");
Clazz.makeConstructor (c$, 
function (sampleModel, dataBuffer, aRegion, origin, parent) {
Clazz.superConstructor (this, sun.awt.image.BytePackedRaster, [sampleModel, dataBuffer, aRegion, origin, parent]);
this.maxX = this.minX + this.width;
this.maxY = this.minY + this.height;
if (!(Clazz.instanceOf (dataBuffer, java.awt.image.DataBufferByte))) {
throw  new java.awt.image.RasterFormatException ("BytePackedRasters must havebyte DataBuffers");
}var dbb = dataBuffer;
this.data = sun.awt.image.SunWritableRaster.stealData (dbb, 0);
if (dbb.getNumBanks () != 1) {
throw  new java.awt.image.RasterFormatException ("DataBuffer for BytePackedRasters must only have 1 bank.");
}var dbOffset = dbb.getOffset ();
if (Clazz.instanceOf (sampleModel, java.awt.image.MultiPixelPackedSampleModel)) {
var mppsm = sampleModel;
this.pixelBitStride = mppsm.getPixelBitStride ();
if (this.pixelBitStride != 1 && this.pixelBitStride != 2 && this.pixelBitStride != 4) {
throw  new java.awt.image.RasterFormatException ("BytePackedRasters must have a bit depth of 1, 2, or 4");
}this.scanlineStride = mppsm.getScanlineStride ();
this.dataBitOffset = mppsm.getDataBitOffset () + dbOffset * 8;
var xOffset = aRegion.x - origin.x;
var yOffset = aRegion.y - origin.y;
this.dataBitOffset += xOffset * this.pixelBitStride + yOffset * this.scanlineStride * 8;
this.bitMask = (1 << this.pixelBitStride) - 1;
this.shiftOffset = 8 - this.pixelBitStride;
} else {
throw  new java.awt.image.RasterFormatException ("BytePackedRasters must haveMultiPixelPackedSampleModel");
}this.verify (false);
}, "java.awt.image.SampleModel,java.awt.image.DataBuffer,java.awt.Rectangle,java.awt.Point,sun.awt.image.BytePackedRaster");
Clazz.defineMethod (c$, "getDataBitOffset", 
function () {
return this.dataBitOffset;
});
Clazz.defineMethod (c$, "getScanlineStride", 
function () {
return this.scanlineStride;
});
Clazz.defineMethod (c$, "getPixelBitStride", 
function () {
return this.pixelBitStride;
});
Clazz.defineMethod (c$, "getDataStorage", 
function () {
return this.data;
});
Clazz.defineMethod (c$, "getDataElements", 
function (x, y, obj) {
if ((x < this.minX) || (y < this.minY) || (x >= this.maxX) || (y >= this.maxY)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var outData;
if (obj == null) {
outData =  Clazz.newByteArray (this.numDataElements, 0);
} else {
outData = obj;
}var bitnum = this.dataBitOffset + (x - this.minX) * this.pixelBitStride;
var element = this.data[(y - this.minY) * this.scanlineStride + (bitnum >> 3)] & 0xff;
var shift = this.shiftOffset - (bitnum & 7);
outData[0] = ((element >> shift) & this.bitMask);
return outData;
}, "~N,~N,~O");
Clazz.defineMethod (c$, "getDataElements", 
function (x, y, w, h, outData) {
return this.getByteData (x, y, w, h, outData);
}, "~N,~N,~N,~N,~O");
Clazz.defineMethod (c$, "getPixelData", 
function (x, y, w, h, obj) {
if ((x < this.minX) || (y < this.minY) || (x + w > this.maxX) || (y + h > this.maxY)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var outData;
if (obj == null) {
outData =  Clazz.newByteArray (this.numDataElements * w * h, 0);
} else {
outData = obj;
}var pixbits = this.pixelBitStride;
var scanbit = this.dataBitOffset + (x - this.minX) * pixbits;
var index = (y - this.minY) * this.scanlineStride;
var outindex = 0;
var data = this.data;
for (var j = 0; j < h; j++) {
var bitnum = scanbit;
for (var i = 0; i < w; i++) {
var shift = this.shiftOffset - (bitnum & 7);
outData[outindex++] = (this.bitMask & (data[index + (bitnum >> 3)] >> shift));
bitnum += pixbits;
}
index += this.scanlineStride;
}
return outData;
}, "~N,~N,~N,~N,~O");
Clazz.defineMethod (c$, "getByteData", 
function (x, y, w, h, band, outData) {
return this.getByteData (x, y, w, h, outData);
}, "~N,~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "getByteData", 
function (x, y, w, h, outData) {
if ((x < this.minX) || (y < this.minY) || (x + w > this.maxX) || (y + h > this.maxY)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}if (outData == null) {
outData =  Clazz.newByteArray (w * h, 0);
}var pixbits = this.pixelBitStride;
var scanbit = this.dataBitOffset + (x - this.minX) * pixbits;
var index = (y - this.minY) * this.scanlineStride;
var outindex = 0;
var data = this.data;
for (var j = 0; j < h; j++) {
var bitnum = scanbit;
var element;
var i = 0;
while ((i < w) && ((bitnum & 7) != 0)) {
var shift = this.shiftOffset - (bitnum & 7);
outData[outindex++] = (this.bitMask & (data[index + (bitnum >> 3)] >> shift));
bitnum += pixbits;
i++;
}
var inIndex = index + (bitnum >> 3);
switch (pixbits) {
case 1:
for (; i < w - 7; i += 8) {
element = data[inIndex++];
outData[outindex++] = ((element >> 7) & 1);
outData[outindex++] = ((element >> 6) & 1);
outData[outindex++] = ((element >> 5) & 1);
outData[outindex++] = ((element >> 4) & 1);
outData[outindex++] = ((element >> 3) & 1);
outData[outindex++] = ((element >> 2) & 1);
outData[outindex++] = ((element >> 1) & 1);
outData[outindex++] = (element & 1);
bitnum += 8;
}
break;
case 2:
for (; i < w - 7; i += 8) {
element = data[inIndex++];
outData[outindex++] = ((element >> 6) & 3);
outData[outindex++] = ((element >> 4) & 3);
outData[outindex++] = ((element >> 2) & 3);
outData[outindex++] = (element & 3);
element = data[inIndex++];
outData[outindex++] = ((element >> 6) & 3);
outData[outindex++] = ((element >> 4) & 3);
outData[outindex++] = ((element >> 2) & 3);
outData[outindex++] = (element & 3);
bitnum += 16;
}
break;
case 4:
for (; i < w - 7; i += 8) {
element = data[inIndex++];
outData[outindex++] = ((element >> 4) & 0xf);
outData[outindex++] = (element & 0xf);
element = data[inIndex++];
outData[outindex++] = ((element >> 4) & 0xf);
outData[outindex++] = (element & 0xf);
element = data[inIndex++];
outData[outindex++] = ((element >> 4) & 0xf);
outData[outindex++] = (element & 0xf);
element = data[inIndex++];
outData[outindex++] = ((element >> 4) & 0xf);
outData[outindex++] = (element & 0xf);
bitnum += 32;
}
break;
}
for (; i < w; i++) {
var shift = this.shiftOffset - (bitnum & 7);
outData[outindex++] = (this.bitMask & (data[index + (bitnum >> 3)] >> shift));
bitnum += pixbits;
}
index += this.scanlineStride;
}
return outData;
}, "~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "setDataElements", 
function (x, y, obj) {
if ((x < this.minX) || (y < this.minY) || (x >= this.maxX) || (y >= this.maxY)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var inData = obj;
var bitnum = this.dataBitOffset + (x - this.minX) * this.pixelBitStride;
var index = (y - this.minY) * this.scanlineStride + (bitnum >> 3);
var shift = this.shiftOffset - (bitnum & 7);
var element = this.data[index];
element &= ~(this.bitMask << shift);
element |= (inData[0] & this.bitMask) << shift;
this.data[index] = element;
this.markDirty ();
}, "~N,~N,~O");
Clazz.defineMethod (c$, "setDataElements", 
function (x, y, inRaster) {
if (!(Clazz.instanceOf (inRaster, sun.awt.image.BytePackedRaster)) || (inRaster).pixelBitStride != this.pixelBitStride) {
Clazz.superCall (this, sun.awt.image.BytePackedRaster, "setDataElements", [x, y, inRaster]);
return;
}var srcOffX = inRaster.getMinX ();
var srcOffY = inRaster.getMinY ();
var dstOffX = srcOffX + x;
var dstOffY = srcOffY + y;
var width = inRaster.getWidth ();
var height = inRaster.getHeight ();
if ((dstOffX < this.minX) || (dstOffY < this.minY) || (dstOffX + width > this.maxX) || (dstOffY + height > this.maxY)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}this.setDataElements (dstOffX, dstOffY, srcOffX, srcOffY, width, height, inRaster);
}, "~N,~N,java.awt.image.Raster");
Clazz.defineMethod (c$, "setDataElements", 
 function (dstX, dstY, srcX, srcY, width, height, inRaster) {
if (width <= 0 || height <= 0) {
return;
}var inData = inRaster.data;
var outData = this.data;
var inscan = inRaster.scanlineStride;
var outscan = this.scanlineStride;
var inbit = inRaster.dataBitOffset + 8 * (srcY - inRaster.minY) * inscan + (srcX - inRaster.minX) * inRaster.pixelBitStride;
var outbit = (this.dataBitOffset + 8 * (dstY - this.minY) * outscan + (dstX - this.minX) * this.pixelBitStride);
var copybits = width * this.pixelBitStride;
if ((inbit & 7) == (outbit & 7)) {
var bitpos = outbit & 7;
if (bitpos != 0) {
var bits = 8 - bitpos;
var inbyte = inbit >> 3;
var outbyte = outbit >> 3;
var mask = 0xff >> bitpos;
if (copybits < bits) {
mask &= 0xff << (bits - copybits);
bits = copybits;
}for (var j = 0; j < height; j++) {
var element = outData[outbyte];
element &= ~mask;
element |= (inData[inbyte] & mask);
outData[outbyte] = element;
inbyte += inscan;
outbyte += outscan;
}
inbit += bits;
outbit += bits;
copybits -= bits;
}if (copybits >= 8) {
var inbyte = inbit >> 3;
var outbyte = outbit >> 3;
var copybytes = copybits >> 3;
if (copybytes == inscan && inscan == outscan) {
System.arraycopy (inData, inbyte, outData, outbyte, inscan * height);
} else {
for (var j = 0; j < height; j++) {
System.arraycopy (inData, inbyte, outData, outbyte, copybytes);
inbyte += inscan;
outbyte += outscan;
}
}var bits = copybytes * 8;
inbit += bits;
outbit += bits;
copybits -= bits;
}if (copybits > 0) {
var inbyte = inbit >> 3;
var outbyte = outbit >> 3;
var mask = (0xff00 >> copybits) & 0xff;
for (var j = 0; j < height; j++) {
var element = outData[outbyte];
element &= ~mask;
element |= (inData[inbyte] & mask);
outData[outbyte] = element;
inbyte += inscan;
outbyte += outscan;
}
}} else {
var bitpos = outbit & 7;
if (bitpos != 0 || copybits < 8) {
var bits = 8 - bitpos;
var inbyte = inbit >> 3;
var outbyte = outbit >> 3;
var lshift = inbit & 7;
var rshift = 8 - lshift;
var mask = 0xff >> bitpos;
if (copybits < bits) {
mask &= 0xff << (bits - copybits);
bits = copybits;
}var lastByte = inData.length - 1;
for (var j = 0; j < height; j++) {
var inData0 = inData[inbyte];
var inData1 = 0;
if (inbyte < lastByte) {
inData1 = inData[inbyte + 1];
}var element = outData[outbyte];
element &= ~mask;
element |= (((inData0 << lshift) | ((inData1 & 0xff) >> rshift)) >> bitpos) & mask;
outData[outbyte] = element;
inbyte += inscan;
outbyte += outscan;
}
inbit += bits;
outbit += bits;
copybits -= bits;
}if (copybits >= 8) {
var inbyte = inbit >> 3;
var outbyte = outbit >> 3;
var copybytes = copybits >> 3;
var lshift = inbit & 7;
var rshift = 8 - lshift;
for (var j = 0; j < height; j++) {
var ibyte = inbyte + j * inscan;
var obyte = outbyte + j * outscan;
var inData0 = inData[ibyte];
for (var i = 0; i < copybytes; i++) {
var inData1 = inData[ibyte + 1];
var val = (inData0 << lshift) | ((inData1 & 0xff) >> rshift);
outData[obyte] = val;
inData0 = inData1;
++ibyte;
++obyte;
}
}
var bits = copybytes * 8;
inbit += bits;
outbit += bits;
copybits -= bits;
}if (copybits > 0) {
var inbyte = inbit >> 3;
var outbyte = outbit >> 3;
var mask = (0xff00 >> copybits) & 0xff;
var lshift = inbit & 7;
var rshift = 8 - lshift;
var lastByte = inData.length - 1;
for (var j = 0; j < height; j++) {
var inData0 = inData[inbyte];
var inData1 = 0;
if (inbyte < lastByte) {
inData1 = inData[inbyte + 1];
}var element = outData[outbyte];
element &= ~mask;
element |= ((inData0 << lshift) | ((inData1 & 0xff) >> rshift)) & mask;
outData[outbyte] = element;
inbyte += inscan;
outbyte += outscan;
}
}}this.markDirty ();
}, "~N,~N,~N,~N,~N,~N,sun.awt.image.BytePackedRaster");
Clazz.defineMethod (c$, "setRect", 
function (dx, dy, srcRaster) {
if (!(Clazz.instanceOf (srcRaster, sun.awt.image.BytePackedRaster)) || (srcRaster).pixelBitStride != this.pixelBitStride) {
Clazz.superCall (this, sun.awt.image.BytePackedRaster, "setRect", [dx, dy, srcRaster]);
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
}if (dstOffX + width > this.maxX) {
width = this.maxX - dstOffX;
}if (dstOffY + height > this.maxY) {
height = this.maxY - dstOffY;
}this.setDataElements (dstOffX, dstOffY, srcOffX, srcOffY, width, height, srcRaster);
}, "~N,~N,java.awt.image.Raster");
Clazz.defineMethod (c$, "setDataElements", 
function (x, y, w, h, obj) {
this.putByteData (x, y, w, h, obj);
}, "~N,~N,~N,~N,~O");
Clazz.defineMethod (c$, "putByteData", 
function (x, y, w, h, band, inData) {
this.putByteData (x, y, w, h, inData);
}, "~N,~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "putByteData", 
function (x, y, w, h, inData) {
if ((x < this.minX) || (y < this.minY) || (x + w > this.maxX) || (y + h > this.maxY)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}if (w == 0 || h == 0) {
return;
}var pixbits = this.pixelBitStride;
var scanbit = this.dataBitOffset + (x - this.minX) * pixbits;
var index = (y - this.minY) * this.scanlineStride;
var outindex = 0;
var data = this.data;
for (var j = 0; j < h; j++) {
var bitnum = scanbit;
var element;
var i = 0;
while ((i < w) && ((bitnum & 7) != 0)) {
var shift = this.shiftOffset - (bitnum & 7);
element = data[index + (bitnum >> 3)];
element &= ~(this.bitMask << shift);
element |= (inData[outindex++] & this.bitMask) << shift;
data[index + (bitnum >> 3)] = element;
bitnum += pixbits;
i++;
}
var inIndex = index + (bitnum >> 3);
switch (pixbits) {
case 1:
for (; i < w - 7; i += 8) {
element = (inData[outindex++] & 1) << 7;
element |= (inData[outindex++] & 1) << 6;
element |= (inData[outindex++] & 1) << 5;
element |= (inData[outindex++] & 1) << 4;
element |= (inData[outindex++] & 1) << 3;
element |= (inData[outindex++] & 1) << 2;
element |= (inData[outindex++] & 1) << 1;
element |= (inData[outindex++] & 1);
data[inIndex++] = element;
bitnum += 8;
}
break;
case 2:
for (; i < w - 7; i += 8) {
element = (inData[outindex++] & 3) << 6;
element |= (inData[outindex++] & 3) << 4;
element |= (inData[outindex++] & 3) << 2;
element |= (inData[outindex++] & 3);
data[inIndex++] = element;
element = (inData[outindex++] & 3) << 6;
element |= (inData[outindex++] & 3) << 4;
element |= (inData[outindex++] & 3) << 2;
element |= (inData[outindex++] & 3);
data[inIndex++] = element;
bitnum += 16;
}
break;
case 4:
for (; i < w - 7; i += 8) {
element = (inData[outindex++] & 0xf) << 4;
element |= (inData[outindex++] & 0xf);
data[inIndex++] = element;
element = (inData[outindex++] & 0xf) << 4;
element |= (inData[outindex++] & 0xf);
data[inIndex++] = element;
element = (inData[outindex++] & 0xf) << 4;
element |= (inData[outindex++] & 0xf);
data[inIndex++] = element;
element = (inData[outindex++] & 0xf) << 4;
element |= (inData[outindex++] & 0xf);
data[inIndex++] = element;
bitnum += 32;
}
break;
}
for (; i < w; i++) {
var shift = this.shiftOffset - (bitnum & 7);
element = data[index + (bitnum >> 3)];
element &= ~(this.bitMask << shift);
element |= (inData[outindex++] & this.bitMask) << shift;
data[index + (bitnum >> 3)] = element;
bitnum += pixbits;
}
index += this.scanlineStride;
}
this.markDirty ();
}, "~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "getPixels", 
function (x, y, w, h, iArray) {
if ((x < this.minX) || (y < this.minY) || (x + w > this.maxX) || (y + h > this.maxY)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}if (iArray == null) {
iArray =  Clazz.newIntArray (w * h, 0);
}var pixbits = this.pixelBitStride;
var scanbit = this.dataBitOffset + (x - this.minX) * pixbits;
var index = (y - this.minY) * this.scanlineStride;
var outindex = 0;
var data = this.data;
for (var j = 0; j < h; j++) {
var bitnum = scanbit;
var element;
var i = 0;
while ((i < w) && ((bitnum & 7) != 0)) {
var shift = this.shiftOffset - (bitnum & 7);
iArray[outindex++] = this.bitMask & (data[index + (bitnum >> 3)] >> shift);
bitnum += pixbits;
i++;
}
var inIndex = index + (bitnum >> 3);
switch (pixbits) {
case 1:
for (; i < w - 7; i += 8) {
element = data[inIndex++];
iArray[outindex++] = (element >> 7) & 1;
iArray[outindex++] = (element >> 6) & 1;
iArray[outindex++] = (element >> 5) & 1;
iArray[outindex++] = (element >> 4) & 1;
iArray[outindex++] = (element >> 3) & 1;
iArray[outindex++] = (element >> 2) & 1;
iArray[outindex++] = (element >> 1) & 1;
iArray[outindex++] = element & 1;
bitnum += 8;
}
break;
case 2:
for (; i < w - 7; i += 8) {
element = data[inIndex++];
iArray[outindex++] = (element >> 6) & 3;
iArray[outindex++] = (element >> 4) & 3;
iArray[outindex++] = (element >> 2) & 3;
iArray[outindex++] = element & 3;
element = data[inIndex++];
iArray[outindex++] = (element >> 6) & 3;
iArray[outindex++] = (element >> 4) & 3;
iArray[outindex++] = (element >> 2) & 3;
iArray[outindex++] = element & 3;
bitnum += 16;
}
break;
case 4:
for (; i < w - 7; i += 8) {
element = data[inIndex++];
iArray[outindex++] = (element >> 4) & 0xf;
iArray[outindex++] = element & 0xf;
element = data[inIndex++];
iArray[outindex++] = (element >> 4) & 0xf;
iArray[outindex++] = element & 0xf;
element = data[inIndex++];
iArray[outindex++] = (element >> 4) & 0xf;
iArray[outindex++] = element & 0xf;
element = data[inIndex++];
iArray[outindex++] = (element >> 4) & 0xf;
iArray[outindex++] = element & 0xf;
bitnum += 32;
}
break;
}
for (; i < w; i++) {
var shift = this.shiftOffset - (bitnum & 7);
iArray[outindex++] = this.bitMask & (data[index + (bitnum >> 3)] >> shift);
bitnum += pixbits;
}
index += this.scanlineStride;
}
return iArray;
}, "~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "setPixels", 
function (x, y, w, h, iArray) {
if ((x < this.minX) || (y < this.minY) || (x + w > this.maxX) || (y + h > this.maxY)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var pixbits = this.pixelBitStride;
var scanbit = this.dataBitOffset + (x - this.minX) * pixbits;
var index = (y - this.minY) * this.scanlineStride;
var outindex = 0;
var data = this.data;
for (var j = 0; j < h; j++) {
var bitnum = scanbit;
var element;
var i = 0;
while ((i < w) && ((bitnum & 7) != 0)) {
var shift = this.shiftOffset - (bitnum & 7);
element = data[index + (bitnum >> 3)];
element &= ~(this.bitMask << shift);
element |= (iArray[outindex++] & this.bitMask) << shift;
data[index + (bitnum >> 3)] = element;
bitnum += pixbits;
i++;
}
var inIndex = index + (bitnum >> 3);
switch (pixbits) {
case 1:
for (; i < w - 7; i += 8) {
element = (iArray[outindex++] & 1) << 7;
element |= (iArray[outindex++] & 1) << 6;
element |= (iArray[outindex++] & 1) << 5;
element |= (iArray[outindex++] & 1) << 4;
element |= (iArray[outindex++] & 1) << 3;
element |= (iArray[outindex++] & 1) << 2;
element |= (iArray[outindex++] & 1) << 1;
element |= (iArray[outindex++] & 1);
data[inIndex++] = element;
bitnum += 8;
}
break;
case 2:
for (; i < w - 7; i += 8) {
element = (iArray[outindex++] & 3) << 6;
element |= (iArray[outindex++] & 3) << 4;
element |= (iArray[outindex++] & 3) << 2;
element |= (iArray[outindex++] & 3);
data[inIndex++] = element;
element = (iArray[outindex++] & 3) << 6;
element |= (iArray[outindex++] & 3) << 4;
element |= (iArray[outindex++] & 3) << 2;
element |= (iArray[outindex++] & 3);
data[inIndex++] = element;
bitnum += 16;
}
break;
case 4:
for (; i < w - 7; i += 8) {
element = (iArray[outindex++] & 0xf) << 4;
element |= (iArray[outindex++] & 0xf);
data[inIndex++] = element;
element = (iArray[outindex++] & 0xf) << 4;
element |= (iArray[outindex++] & 0xf);
data[inIndex++] = element;
element = (iArray[outindex++] & 0xf) << 4;
element |= (iArray[outindex++] & 0xf);
data[inIndex++] = element;
element = (iArray[outindex++] & 0xf) << 4;
element |= (iArray[outindex++] & 0xf);
data[inIndex++] = element;
bitnum += 32;
}
break;
}
for (; i < w; i++) {
var shift = this.shiftOffset - (bitnum & 7);
element = data[index + (bitnum >> 3)];
element &= ~(this.bitMask << shift);
element |= (iArray[outindex++] & this.bitMask) << shift;
data[index + (bitnum >> 3)] = element;
bitnum += pixbits;
}
index += this.scanlineStride;
}
this.markDirty ();
}, "~N,~N,~N,~N,~A");
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
if (bandList != null) {
sm = this.sampleModel.createSubsetSampleModel (bandList);
} else {
sm = this.sampleModel;
}var deltaX = x0 - x;
var deltaY = y0 - y;
return  new sun.awt.image.BytePackedRaster (sm, this.dataBuffer,  new java.awt.Rectangle (x0, y0, width, height),  new java.awt.Point (this.sampleModelTranslateX + deltaX, this.sampleModelTranslateY + deltaY), this);
}, "~N,~N,~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "createCompatibleWritableRaster", 
function (w, h) {
if (w <= 0 || h <= 0) {
throw  new java.awt.image.RasterFormatException ("negative " + ((w <= 0) ? "width" : "height"));
}var sm = this.sampleModel.createCompatibleSampleModel (w, h);
return  new sun.awt.image.BytePackedRaster (sm,  new java.awt.Point (0, 0));
}, "~N,~N");
Clazz.defineMethod (c$, "createCompatibleWritableRaster", 
function () {
return this.createCompatibleWritableRaster (this.width, this.height);
});
Clazz.defineMethod (c$, "verify", 
 function (strictCheck) {
if (this.dataBitOffset < 0) {
throw  new java.awt.image.RasterFormatException ("Data offsets must be >= 0");
}if (this.width <= 0 || this.height <= 0 || this.height > (Clazz.doubleToInt (2147483647 / this.width))) {
throw  new java.awt.image.RasterFormatException ("Invalid raster dimension");
}if ((this.width - 1) > Clazz.doubleToInt (2147483647 / this.pixelBitStride)) {
throw  new java.awt.image.RasterFormatException ("Invalid raster dimension");
}if (this.minX - this.sampleModelTranslateX < 0 || this.minY - this.sampleModelTranslateY < 0) {
throw  new java.awt.image.RasterFormatException ("Incorrect origin/translate: (" + this.minX + ", " + this.minY + ") / (" + this.sampleModelTranslateX + ", " + this.sampleModelTranslateY + ")");
}if (this.scanlineStride < 0 || this.scanlineStride > (Clazz.doubleToInt (2147483647 / this.height))) {
throw  new java.awt.image.RasterFormatException ("Invalid scanline stride");
}if (this.height > 1 || this.minY - this.sampleModelTranslateY > 0) {
if (this.scanlineStride > this.data.length) {
throw  new java.awt.image.RasterFormatException ("Incorrect scanline stride: " + this.scanlineStride);
}}var lastbit = this.dataBitOffset + (this.height - 1) * this.scanlineStride * 8 + (this.width - 1) * this.pixelBitStride + this.pixelBitStride - 1;
if (lastbit < 0 || Clazz.doubleToInt (lastbit / 8) >= this.data.length) {
throw  new java.awt.image.RasterFormatException ("raster dimensions overflow array bounds");
}if (strictCheck) {
if (this.height > 1) {
lastbit = this.width * this.pixelBitStride - 1;
if (Clazz.doubleToInt (lastbit / 8) >= this.scanlineStride) {
throw  new java.awt.image.RasterFormatException ("data for adjacent scanlines overlaps");
}}}}, "~B");
Clazz.overrideMethod (c$, "toString", 
function () {
return  String.instantialize ("BytePackedRaster: width = " + this.width + " height = " + this.height + " #channels " + this.numBands + " xOff = " + this.sampleModelTranslateX + " yOff = " + this.sampleModelTranslateY);
});
});
