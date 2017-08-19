Clazz.declarePackage ("sun.awt.image");
Clazz.load (["sun.awt.image.SunWritableRaster"], "sun.awt.image.ByteComponentRaster", ["java.lang.ArrayIndexOutOfBoundsException", "java.awt.Point", "$.Rectangle", "java.awt.image.DataBufferByte", "$.RasterFormatException", "$.SinglePixelPackedSampleModel"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bandOffset = 0;
this.dataOffsets = null;
this.scanlineStride = 0;
this.pixelStride = 0;
this.data = null;
this.type = 0;
this.maxX = 0;
this.maxY = 0;
Clazz.instantialize (this, arguments);
}, sun.awt.image, "ByteComponentRaster", sun.awt.image.SunWritableRaster);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, sun.awt.image.ByteComponentRaster, []);
});
Clazz.makeConstructor (c$, 
function (sampleModel, origin) {
Clazz.superConstructor (this, sun.awt.image.ByteComponentRaster, []);
this.setByteCompRaster (sampleModel, sampleModel.createDataBuffer (),  new java.awt.Rectangle (origin.x, origin.y, sampleModel.getWidth (), sampleModel.getHeight ()), origin, null);
}, "java.awt.image.SampleModel,java.awt.Point");
Clazz.makeConstructor (c$, 
function (sampleModel, dataBuffer, origin) {
Clazz.superConstructor (this, sun.awt.image.ByteComponentRaster, []);
this.setByteCompRaster (sampleModel, dataBuffer,  new java.awt.Rectangle (origin.x, origin.y, sampleModel.getWidth (), sampleModel.getHeight ()), origin, null);
}, "java.awt.image.SampleModel,java.awt.image.DataBuffer,java.awt.Point");
Clazz.makeConstructor (c$, 
function (sampleModel, dataBuffer, aRegion, origin, parent) {
Clazz.superConstructor (this, sun.awt.image.ByteComponentRaster, []);
this.setByteCompRaster (sampleModel, dataBuffer, aRegion, origin, parent);
}, "java.awt.image.SampleModel,java.awt.image.DataBuffer,java.awt.Rectangle,java.awt.Point,sun.awt.image.ByteComponentRaster");
Clazz.defineMethod (c$, "setByteCompRaster", 
function (sampleModel, dataBuffer, aRegion, origin, parent) {
this.setSunRaster (sampleModel, dataBuffer, aRegion, origin, parent);
this.maxX = this.minX + this.width;
this.maxY = this.minY + this.height;
if (!(Clazz.instanceOf (dataBuffer, java.awt.image.DataBufferByte))) {
throw  new java.awt.image.RasterFormatException ("ByteComponentRasters must have byte DataBuffers");
}var dbb = dataBuffer;
this.data = sun.awt.image.SunWritableRaster.stealData (dbb, 0);
if (dbb.getNumBanks () != 1) {
throw  new java.awt.image.RasterFormatException ("DataBuffer for ByteComponentRasters must only have 1 bank.");
}var dbOffset = dbb.getOffset ();
if (Clazz.instanceOf (sampleModel, java.awt.image.SinglePixelPackedSampleModel)) {
var sppsm = sampleModel;
this.scanlineStride = sppsm.getScanlineStride ();
this.pixelStride = 1;
this.dataOffsets =  Clazz.newIntArray (1, 0);
this.dataOffsets[0] = dbOffset;
var xOffset = aRegion.x - origin.x;
var yOffset = aRegion.y - origin.y;
this.dataOffsets[0] += xOffset * this.pixelStride + yOffset * this.scanlineStride;
} else {
throw  new java.awt.image.RasterFormatException ("IntegerComponentRasters must have ComponentSampleModel or SinglePixelPackedSampleModel");
}this.bandOffset = this.dataOffsets[0];
this.verify ();
}, "java.awt.image.SampleModel,java.awt.image.DataBuffer,java.awt.Rectangle,java.awt.Point,sun.awt.image.ByteComponentRaster");
Clazz.defineMethod (c$, "getDataOffsets", 
function () {
return this.dataOffsets.clone ();
});
Clazz.defineMethod (c$, "getDataOffset", 
function (band) {
return this.dataOffsets[band];
}, "~N");
Clazz.defineMethod (c$, "getScanlineStride", 
function () {
return this.scanlineStride;
});
Clazz.defineMethod (c$, "getPixelStride", 
function () {
return this.pixelStride;
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
}var off = (y - this.minY) * this.scanlineStride + (x - this.minX) * this.pixelStride;
for (var band = 0; band < this.numDataElements; band++) {
outData[band] = this.data[this.dataOffsets[band] + off];
}
return outData;
}, "~N,~N,~O");
Clazz.defineMethod (c$, "getDataElements", 
function (x, y, w, h, obj) {
if ((x < this.minX) || (y < this.minY) || (x + w > this.maxX) || (y + h > this.maxY)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var outData;
if (obj == null) {
outData =  Clazz.newByteArray (w * h * this.numDataElements, 0);
} else {
outData = obj;
}var yoff = (y - this.minY) * this.scanlineStride + (x - this.minX) * this.pixelStride;
var xoff;
var off = 0;
var xstart;
var ystart;
for (ystart = 0; ystart < h; ystart++, yoff += this.scanlineStride) {
xoff = yoff;
for (xstart = 0; xstart < w; xstart++, xoff += this.pixelStride) {
for (var c = 0; c < this.numDataElements; c++) {
outData[off++] = this.data[this.dataOffsets[c] + xoff];
}
}
}
return outData;
}, "~N,~N,~N,~N,~O");
Clazz.defineMethod (c$, "getByteData", 
function (x, y, w, h, band, outData) {
if ((x < this.minX) || (y < this.minY) || (x + w > this.maxX) || (y + h > this.maxY)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}if (outData == null) {
outData =  Clazz.newByteArray (this.scanlineStride * h, 0);
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
if ((x < this.minX) || (y < this.minY) || (x + w > this.maxX) || (y + h > this.maxY)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}if (outData == null) {
outData =  Clazz.newByteArray (this.numDataElements * this.scanlineStride * h, 0);
}var yoff = (y - this.minY) * this.scanlineStride + (x - this.minX) * this.pixelStride;
var xoff;
var off = 0;
var xstart;
var ystart;
for (ystart = 0; ystart < h; ystart++, yoff += this.scanlineStride) {
xoff = yoff;
for (xstart = 0; xstart < w; xstart++, xoff += this.pixelStride) {
for (var c = 0; c < this.numDataElements; c++) {
outData[off++] = this.data[this.dataOffsets[c] + xoff];
}
}
}
return outData;
}, "~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "setDataElements", 
function (x, y, obj) {
if ((x < this.minX) || (y < this.minY) || (x >= this.maxX) || (y >= this.maxY)) {
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
var dstOffX = inRaster.getMinX () + x;
var dstOffY = inRaster.getMinY () + y;
var width = inRaster.getWidth ();
var height = inRaster.getHeight ();
if ((dstOffX < this.minX) || (dstOffY < this.minY) || (dstOffX + width > this.maxX) || (dstOffY + height > this.maxY)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}this.setDataElements (dstOffX, dstOffY, width, height, inRaster);
}, "~N,~N,java.awt.image.Raster");
Clazz.defineMethod (c$, "setDataElements", 
 function (dstX, dstY, width, height, inRaster) {
if (width <= 0 || height <= 0) {
return;
}var srcOffX = inRaster.getMinX ();
var srcOffY = inRaster.getMinY ();
var tdata = null;
if (Clazz.instanceOf (inRaster, sun.awt.image.ByteComponentRaster)) {
var bct = inRaster;
var bdata = bct.getDataStorage ();
if (this.numDataElements == 1) {
var toff = bct.getDataOffset (0);
var tss = bct.getScanlineStride ();
var srcOffset = toff;
var dstOffset = this.dataOffsets[0] + (dstY - this.minY) * this.scanlineStride + (dstX - this.minX);
if (this.pixelStride == bct.getPixelStride ()) {
width *= this.pixelStride;
for (var tmpY = 0; tmpY < height; tmpY++) {
System.arraycopy (bdata, srcOffset, this.data, dstOffset, width);
srcOffset += tss;
dstOffset += this.scanlineStride;
}
this.markDirty ();
return;
}}}for (var startY = 0; startY < height; startY++) {
tdata = inRaster.getDataElements (srcOffX, srcOffY + startY, width, 1, tdata);
this.setDataElements (dstX, dstY + startY, width, 1, tdata);
}
}, "~N,~N,~N,~N,java.awt.image.Raster");
Clazz.defineMethod (c$, "setDataElements", 
function (x, y, w, h, obj) {
if ((x < this.minX) || (y < this.minY) || (x + w > this.maxX) || (y + h > this.maxY)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var inData = obj;
var yoff = (y - this.minY) * this.scanlineStride + (x - this.minX) * this.pixelStride;
var xoff;
var off = 0;
var xstart;
var ystart;
if (this.numDataElements == 1) {
var srcOffset = 0;
var dstOffset = yoff + this.dataOffsets[0];
for (ystart = 0; ystart < h; ystart++) {
xoff = yoff;
System.arraycopy (inData, srcOffset, this.data, dstOffset, w);
srcOffset += w;
dstOffset += this.scanlineStride;
}
this.markDirty ();
return;
}for (ystart = 0; ystart < h; ystart++, yoff += this.scanlineStride) {
xoff = yoff;
for (xstart = 0; xstart < w; xstart++, xoff += this.pixelStride) {
for (var c = 0; c < this.numDataElements; c++) {
this.data[this.dataOffsets[c] + xoff] = inData[off++];
}
}
}
this.markDirty ();
}, "~N,~N,~N,~N,~O");
Clazz.defineMethod (c$, "putByteData", 
function (x, y, w, h, band, inData) {
if ((x < this.minX) || (y < this.minY) || (x + w > this.maxX) || (y + h > this.maxY)) {
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
if ((x < this.minX) || (y < this.minY) || (x + w > this.maxX) || (y + h > this.maxY)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var yoff = (y - this.minY) * this.scanlineStride + (x - this.minX) * this.pixelStride;
var xoff;
var off = 0;
var xstart;
var ystart;
if (this.numDataElements == 1) {
yoff += this.dataOffsets[0];
if (this.pixelStride == 1) {
if (this.scanlineStride == w) {
System.arraycopy (inData, 0, this.data, yoff, w * h);
} else {
for (ystart = 0; ystart < h; ystart++) {
System.arraycopy (inData, off, this.data, yoff, w);
off += w;
yoff += this.scanlineStride;
}
}} else {
for (ystart = 0; ystart < h; ystart++, yoff += this.scanlineStride) {
xoff = yoff;
for (xstart = 0; xstart < w; xstart++, xoff += this.pixelStride) {
this.data[xoff] = inData[off++];
}
}
}} else {
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
return  new sun.awt.image.ByteComponentRaster (sm, this.dataBuffer,  new java.awt.Rectangle (x0, y0, width, height),  new java.awt.Point (this.sampleModelTranslateX + deltaX, this.sampleModelTranslateY + deltaY), this);
}, "~N,~N,~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "createCompatibleWritableRaster", 
function (w, h) {
if (w <= 0 || h <= 0) {
throw  new java.awt.image.RasterFormatException ("negative " + ((w <= 0) ? "width" : "height"));
}var sm = this.sampleModel.createCompatibleSampleModel (w, h);
return  new sun.awt.image.ByteComponentRaster (sm,  new java.awt.Point (0, 0));
}, "~N,~N");
Clazz.defineMethod (c$, "createCompatibleWritableRaster", 
function () {
return this.createCompatibleWritableRaster (this.width, this.height);
});
Clazz.defineMethod (c$, "verify", 
function () {
if (this.width <= 0 || this.height <= 0 || this.height > (Clazz.doubleToInt (2147483647 / this.width))) {
throw  new java.awt.image.RasterFormatException ("Invalid raster dimension");
}for (var i = 0; i < this.dataOffsets.length; i++) {
if (this.dataOffsets[i] < 0) {
throw  new java.awt.image.RasterFormatException ("Data offsets for band " + i + "(" + this.dataOffsets[i] + ") must be >= 0");
}}
if (this.minX - this.sampleModelTranslateX < 0 || this.minY - this.sampleModelTranslateY < 0) {
throw  new java.awt.image.RasterFormatException ("Incorrect origin/translate: (" + this.minX + ", " + this.minY + ") / (" + this.sampleModelTranslateX + ", " + this.sampleModelTranslateY + ")");
}if (this.scanlineStride < 0 || this.scanlineStride > (Clazz.doubleToInt (2147483647 / this.height))) {
throw  new java.awt.image.RasterFormatException ("Incorrect scanline stride: " + this.scanlineStride);
}if (this.height > 1 || this.minY - this.sampleModelTranslateY > 0) {
if (this.scanlineStride > this.data.length) {
throw  new java.awt.image.RasterFormatException ("Incorrect scanline stride: " + this.scanlineStride);
}}var lastScanOffset = (this.height - 1) * this.scanlineStride;
if (this.pixelStride < 0 || this.pixelStride > (Clazz.doubleToInt (2147483647 / this.width)) || this.pixelStride > this.data.length) {
throw  new java.awt.image.RasterFormatException ("Incorrect pixel stride: " + this.pixelStride);
}var lastPixelOffset = (this.width - 1) * this.pixelStride;
if (lastPixelOffset > (2147483647 - lastScanOffset)) {
throw  new java.awt.image.RasterFormatException ("Incorrect raster attributes");
}lastPixelOffset += lastScanOffset;
var index;
var maxIndex = 0;
for (var i = 0; i < this.numDataElements; i++) {
if (this.dataOffsets[i] > (2147483647 - lastPixelOffset)) {
throw  new java.awt.image.RasterFormatException ("Incorrect band offset: " + this.dataOffsets[i]);
}index = lastPixelOffset + this.dataOffsets[i];
if (index > maxIndex) {
maxIndex = index;
}}
if (this.data.length <= maxIndex) {
throw  new java.awt.image.RasterFormatException ("Data array too small (should be > " + maxIndex + " )");
}});
Clazz.overrideMethod (c$, "toString", 
function () {
return  String.instantialize ("ByteComponentRaster: width = " + this.width + " height = " + this.height + " #numDataElements " + this.numDataElements + " dataOff[0] = " + this.dataOffsets[0]);
});
});
