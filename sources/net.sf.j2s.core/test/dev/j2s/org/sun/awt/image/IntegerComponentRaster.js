Clazz.declarePackage ("sun.awt.image");
Clazz.load (["sun.awt.image.SunWritableRaster"], "sun.awt.image.IntegerComponentRaster", ["java.lang.ArrayIndexOutOfBoundsException", "java.awt.Point", "$.Rectangle", "java.awt.image.DataBufferInt", "$.RasterFormatException", "$.SinglePixelPackedSampleModel"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bandOffset = 0;
this.dataOffsets = null;
this.scanlineStride = 0;
this.pixelStride = 0;
this.data = null;
this.numDataElems = 0;
this.type = 0;
this.maxX = 0;
this.maxY = 0;
Clazz.instantialize (this, arguments);
}, sun.awt.image, "IntegerComponentRaster", sun.awt.image.SunWritableRaster);
Clazz.makeConstructor (c$, 
function (sampleModel, origin) {
Clazz.superConstructor (this, sun.awt.image.IntegerComponentRaster, []);
this.setIntCompRaster (sampleModel, sampleModel.createDataBuffer (),  new java.awt.Rectangle (origin.x, origin.y, sampleModel.getWidth (), sampleModel.getHeight ()), origin, null);
}, "java.awt.image.SampleModel,java.awt.Point");
Clazz.makeConstructor (c$, 
function (sampleModel, dataBuffer, origin) {
Clazz.superConstructor (this, sun.awt.image.IntegerComponentRaster, []);
this.setIntCompRaster (sampleModel, dataBuffer,  new java.awt.Rectangle (origin.x, origin.y, sampleModel.getWidth (), sampleModel.getHeight ()), origin, null);
}, "java.awt.image.SampleModel,java.awt.image.DataBuffer,java.awt.Point");
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, sun.awt.image.IntegerComponentRaster, []);
});
Clazz.makeConstructor (c$, 
function (sampleModel, dataBuffer, aRegion, origin, parent) {
Clazz.superConstructor (this, sun.awt.image.IntegerComponentRaster, []);
this.setIntCompRaster (sampleModel, dataBuffer, aRegion, origin, parent);
}, "java.awt.image.SampleModel,java.awt.image.DataBuffer,java.awt.Rectangle,java.awt.Point,java.awt.image.Raster");
Clazz.defineMethod (c$, "setIntCompRaster", 
function (sampleModel, dataBuffer, aRegion, origin, parent) {
this.setSunRaster (sampleModel, dataBuffer, aRegion, origin, parent);
this.maxX = this.minX + this.width;
this.maxY = this.minY + this.height;
if (!(Clazz.instanceOf (dataBuffer, java.awt.image.DataBufferInt))) {
throw  new java.awt.image.RasterFormatException ("IntegerComponentRasters must haveinteger DataBuffers");
}var dbi = dataBuffer;
if (dbi.getNumBanks () != 1) {
throw  new java.awt.image.RasterFormatException ("DataBuffer for IntegerComponentRasters must only have 1 bank.");
}this.data = sun.awt.image.SunWritableRaster.stealData (dbi, 0);
if (Clazz.instanceOf (sampleModel, java.awt.image.SinglePixelPackedSampleModel)) {
var sppsm = sampleModel;
var boffsets = sppsm.getBitOffsets ();
var notByteBoundary = false;
for (var i = 1; i < boffsets.length; i++) {
if ((boffsets[i] % 8) != 0) {
notByteBoundary = true;
}}
this.type = (notByteBoundary ? 9 : 10);
this.scanlineStride = sppsm.getScanlineStride ();
this.pixelStride = 1;
this.dataOffsets =  Clazz.newIntArray (1, 0);
this.dataOffsets[0] = dbi.getOffset ();
this.bandOffset = this.dataOffsets[0];
var xOffset = aRegion.x - origin.x;
var yOffset = aRegion.y - origin.y;
this.dataOffsets[0] += xOffset + yOffset * this.scanlineStride;
this.numDataElems = sppsm.getNumDataElements ();
} else {
throw  new java.awt.image.RasterFormatException ("IntegerComponentRasters must have SinglePixelPackedSampleModel");
}this.verify ();
}, "java.awt.image.SampleModel,java.awt.image.DataBuffer,java.awt.Rectangle,java.awt.Point,java.awt.image.Raster");
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
outData =  Clazz.newIntArray (this.numDataElements, 0);
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
if (Clazz.instanceOf (obj, Array)) {
outData = obj;
} else {
outData =  Clazz.newIntArray (this.numDataElements * w * h, 0);
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
Clazz.overrideMethod (c$, "setDataElementsRaster", 
function (x, y, inRaster) {
var dstOffX = x + inRaster.getMinX ();
var dstOffY = y + inRaster.getMinY ();
var width = inRaster.getWidth ();
var height = inRaster.getHeight ();
if ((dstOffX < this.minX) || (dstOffY < this.minY) || (dstOffX + width > this.maxX) || (dstOffY + height > this.maxY)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}this.setDataElementsRaster4 (dstOffX, dstOffY, width, height, inRaster);
}, "~N,~N,java.awt.image.Raster");
Clazz.defineMethod (c$, "setDataElementsRaster4", 
 function (dstX, dstY, width, height, inRaster) {
if (width <= 0 || height <= 0) {
return;
}var srcOffX = inRaster.getMinX ();
var srcOffY = inRaster.getMinY ();
var tdata = null;
if (Clazz.instanceOf (inRaster, sun.awt.image.IntegerComponentRaster) && (this.pixelStride == 1) && (this.numDataElements == 1)) {
var ict = inRaster;
if (ict.getNumDataElements () != 1) {
throw  new ArrayIndexOutOfBoundsException ("Number of bands does not match");
}tdata = ict.getDataStorage ();
var tss = ict.getScanlineStride ();
var toff = ict.getDataOffset (0);
var srcOffset = toff;
var dstOffset = this.dataOffsets[0] + (dstY - this.minY) * this.scanlineStride + (dstX - this.minX);
if (ict.getPixelStride () == this.pixelStride) {
width *= this.pixelStride;
for (var startY = 0; startY < height; startY++) {
System.arraycopy (tdata, srcOffset, this.data, dstOffset, width);
srcOffset += tss;
dstOffset += this.scanlineStride;
}
this.markDirty ();
return;
}}var odata = null;
for (var startY = 0; startY < height; startY++) {
odata = inRaster.getDataElements (srcOffX, srcOffY + startY, width, 1, odata);
this.setDataElements (dstX, dstY + startY, width, 1, odata);
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
for (ystart = 0; ystart < h; ystart++, yoff += this.scanlineStride) {
xoff = yoff;
for (xstart = 0; xstart < w; xstart++, xoff += this.pixelStride) {
for (var c = 0; c < this.numDataElements; c++) {
this.data[this.dataOffsets[c] + xoff] = inData[off++];
}
}
}
this.markDirty ();
}, "~N,~N,~N,~N,~O");
Clazz.overrideMethod (c$, "createWritableChild", 
function (x, y, width, height, x0, y0, bandList) {
if (x < this.minX) {
throw  new java.awt.image.RasterFormatException ("x lies outside raster");
}if (y < this.minY) {
throw  new java.awt.image.RasterFormatException ("y lies outside raster");
}if ((x + width < x) || (x + width > this.minX + this.width)) {
throw  new java.awt.image.RasterFormatException ("(x + width) is outside raster");
}if ((y + height < y) || (y + height > this.minY + this.height)) {
throw  new java.awt.image.RasterFormatException ("(y + height) is outside raster");
}var sm;
if (bandList != null) sm = this.sampleModel.createSubsetSampleModel (bandList);
 else sm = this.sampleModel;
var deltaX = x0 - x;
var deltaY = y0 - y;
return  new sun.awt.image.IntegerComponentRaster (sm, this.dataBuffer,  new java.awt.Rectangle (x0, y0, width, height),  new java.awt.Point (this.sampleModelTranslateX + deltaX, this.sampleModelTranslateY + deltaY), this);
}, "~N,~N,~N,~N,~N,~N,~A");
Clazz.overrideMethod (c$, "createChild", 
function (x, y, width, height, x0, y0, bandList) {
return this.createWritableChild (x, y, width, height, x0, y0, bandList);
}, "~N,~N,~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "createCompatibleWritableRaster", 
function (w, h) {
if (w <= 0 || h <= 0) {
throw  new java.awt.image.RasterFormatException ("negative " + ((w <= 0) ? "width" : "height"));
}var sm = this.sampleModel.createCompatibleSampleModel (w, h);
return  new sun.awt.image.IntegerComponentRaster (sm,  new java.awt.Point (0, 0));
}, "~N,~N");
Clazz.defineMethod (c$, "createCompatibleWritableRaster", 
function () {
return this.createCompatibleWritableRaster (this.width, this.height);
});
Clazz.defineMethod (c$, "verify", 
function () {
if (this.width <= 0 || this.height <= 0 || this.height > (Clazz.doubleToInt (2147483647 / this.width))) {
throw  new java.awt.image.RasterFormatException ("Invalid raster dimension");
}if (this.dataOffsets[0] < 0) {
throw  new java.awt.image.RasterFormatException ("Data offset (" + this.dataOffsets[0] + ") must be >= 0");
}if (this.minX - this.sampleModelTranslateX < 0 || this.minY - this.sampleModelTranslateY < 0) {
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
return  String.instantialize ("IntegerComponentRaster: width = " + this.width + " height = " + this.height + " #Bands = " + this.numBands + " #DataElements " + this.numDataElements + " xOff = " + this.sampleModelTranslateX + " yOff = " + this.sampleModelTranslateY + " dataOffset[0] " + this.dataOffsets[0]);
});
Clazz.defineStatics (c$,
"TYPE_CUSTOM", 0,
"TYPE_BYTE_SAMPLES", 1,
"TYPE_USHORT_SAMPLES", 2,
"TYPE_INT_SAMPLES", 3,
"TYPE_BYTE_BANDED_SAMPLES", 4,
"TYPE_USHORT_BANDED_SAMPLES", 5,
"TYPE_INT_BANDED_SAMPLES", 6,
"TYPE_BYTE_PACKED_SAMPLES", 7,
"TYPE_USHORT_PACKED_SAMPLES", 8,
"TYPE_INT_PACKED_SAMPLES", 9,
"TYPE_INT_8BIT_SAMPLES", 10,
"TYPE_BYTE_BINARY_SAMPLES", 11);
});
