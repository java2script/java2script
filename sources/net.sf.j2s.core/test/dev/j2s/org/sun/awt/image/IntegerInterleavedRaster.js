Clazz.declarePackage ("sun.awt.image");
Clazz.load (["sun.awt.image.IntegerComponentRaster"], "sun.awt.image.IntegerInterleavedRaster", ["java.lang.ArrayIndexOutOfBoundsException", "java.awt.Point", "$.Rectangle", "java.awt.image.DataBufferInt", "$.RasterFormatException", "$.SinglePixelPackedSampleModel"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$maxX = 0;
this.$maxY = 0;
Clazz.instantialize (this, arguments);
}, sun.awt.image, "IntegerInterleavedRaster", sun.awt.image.IntegerComponentRaster);
Clazz.makeConstructor (c$, 
function (sampleModel, origin) {
Clazz.superConstructor (this, sun.awt.image.IntegerInterleavedRaster, []);
this.setIntInterRaster (sampleModel, sampleModel.createDataBuffer (),  new java.awt.Rectangle (origin.x, origin.y, sampleModel.getWidth (), sampleModel.getHeight ()), origin, null);
}, "java.awt.image.SampleModel,java.awt.Point");
Clazz.makeConstructor (c$, 
function (sampleModel, dataBuffer, origin) {
Clazz.superConstructor (this, sun.awt.image.IntegerInterleavedRaster, []);
this.setParams (sampleModel, dataBuffer, origin);
}, "java.awt.image.SampleModel,java.awt.image.DataBuffer,java.awt.Point");
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, sun.awt.image.IntegerInterleavedRaster, []);
});
Clazz.overrideMethod (c$, "setParams", 
function (sampleModel, dataBuffer, origin) {
this.setIntInterRaster (sampleModel, dataBuffer,  new java.awt.Rectangle (origin.x, origin.y, sampleModel.getWidth (), sampleModel.getHeight ()), origin, null);
}, "java.awt.image.SampleModel,java.awt.image.DataBuffer,java.awt.Point");
Clazz.makeConstructor (c$, 
function (sampleModel, dataBuffer, aRegion, origin, parent) {
Clazz.superConstructor (this, sun.awt.image.IntegerInterleavedRaster, []);
this.setIntInterRaster (sampleModel, dataBuffer, aRegion, origin, parent);
}, "java.awt.image.SampleModel,java.awt.image.DataBuffer,java.awt.Rectangle,java.awt.Point,sun.awt.image.IntegerInterleavedRaster");
Clazz.defineMethod (c$, "setIntInterRaster", 
 function (sampleModel, dataBuffer, aRegion, origin, parent) {
this.setIntCompRaster (sampleModel, dataBuffer, aRegion, origin, parent);
this.$maxX = this.minX + this.width;
this.$maxY = this.minY + this.height;
if (!(Clazz.instanceOf (dataBuffer, java.awt.image.DataBufferInt))) {
throw  new java.awt.image.RasterFormatException ("IntegerInterleavedRasters must haveinteger DataBuffers");
}var dbi = dataBuffer;
this.data = sun.awt.image.SunWritableRaster.stealData (dbi, 0);
if (Clazz.instanceOf (sampleModel, java.awt.image.SinglePixelPackedSampleModel)) {
var sppsm = sampleModel;
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
throw  new java.awt.image.RasterFormatException ("IntegerInterleavedRasters must have SinglePixelPackedSampleModel");
}this.verify ();
}, "java.awt.image.SampleModel,java.awt.image.DataBuffer,java.awt.Rectangle,java.awt.Point,sun.awt.image.IntegerInterleavedRaster");
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
outData =  Clazz.newIntArray (1, 0);
} else {
outData = obj;
}var off = (y - this.minY) * this.scanlineStride + (x - this.minX) + this.dataOffsets[0];
outData[0] = this.data[off];
return outData;
}, "~N,~N,~O");
Clazz.defineMethod (c$, "getDataElements", 
function (x, y, w, h, obj) {
if ((x < this.minX) || (y < this.minY) || (x + w > this.$maxX) || (y + h > this.$maxY)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var outData;
if (Clazz.instanceOf (obj, Array)) {
outData = obj;
} else {
outData =  Clazz.newIntArray (w * h, 0);
}var yoff = (y - this.minY) * this.scanlineStride + (x - this.minX) + this.dataOffsets[0];
var off = 0;
for (var ystart = 0; ystart < h; ystart++) {
System.arraycopy (this.data, yoff, outData, off, w);
off += w;
yoff += this.scanlineStride;
}
return outData;
}, "~N,~N,~N,~N,~O");
Clazz.defineMethod (c$, "setDataElements", 
function (x, y, obj) {
if ((x < this.minX) || (y < this.minY) || (x >= this.$maxX) || (y >= this.$maxY)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var inData = obj;
var off = (y - this.minY) * this.scanlineStride + (x - this.minX) + this.dataOffsets[0];
this.data[off] = inData[0];
this.markDirty ();
}, "~N,~N,~O");
Clazz.defineMethod (c$, "setDataElements", 
function (x, y, inRaster) {
var dstOffX = x + inRaster.getMinX ();
var dstOffY = y + inRaster.getMinY ();
var width = inRaster.getWidth ();
var height = inRaster.getHeight ();
if ((dstOffX < this.minX) || (dstOffY < this.minY) || (dstOffX + width > this.$maxX) || (dstOffY + height > this.$maxY)) {
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
if (Clazz.instanceOf (inRaster, sun.awt.image.IntegerInterleavedRaster)) {
var ict = inRaster;
tdata = ict.getDataStorage ();
var tss = ict.getScanlineStride ();
var toff = ict.getDataOffset (0);
var srcOffset = toff;
var dstOffset = this.dataOffsets[0] + (dstY - this.minY) * this.scanlineStride + (dstX - this.minX);
for (var startY = 0; startY < height; startY++) {
System.arraycopy (tdata, srcOffset, this.data, dstOffset, width);
srcOffset += tss;
dstOffset += this.scanlineStride;
}
this.markDirty ();
return;
}var odata = null;
for (var startY = 0; startY < height; startY++) {
odata = inRaster.getDataElements (srcOffX, srcOffY + startY, width, 1, odata);
this.setDataElements (dstX, dstY + startY, width, 1, odata);
}
}, "~N,~N,~N,~N,java.awt.image.Raster");
Clazz.defineMethod (c$, "setDataElements", 
function (x, y, w, h, obj) {
if ((x < this.minX) || (y < this.minY) || (x + w > this.$maxX) || (y + h > this.$maxY)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var inData = obj;
var yoff = (y - this.minY) * this.scanlineStride + (x - this.minX) + this.dataOffsets[0];
var off = 0;
for (var ystart = 0; ystart < h; ystart++) {
System.arraycopy (inData, off, this.data, yoff, w);
off += w;
yoff += this.scanlineStride;
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
return  new sun.awt.image.IntegerInterleavedRaster (sm, this.dataBuffer,  new java.awt.Rectangle (x0, y0, width, height),  new java.awt.Point (this.sampleModelTranslateX + deltaX, this.sampleModelTranslateY + deltaY), this);
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
return  new sun.awt.image.IntegerInterleavedRaster (sm,  new java.awt.Point (0, 0));
}, "~N,~N");
Clazz.defineMethod (c$, "createCompatibleWritableRaster", 
function () {
return this.createCompatibleWritableRaster (this.width, this.height);
});
Clazz.overrideMethod (c$, "toString", 
function () {
return  String.instantialize ("IntegerInterleavedRaster: width = " + this.width + " height = " + this.height + " #Bands = " + this.numBands + " xOff = " + this.sampleModelTranslateX + " yOff = " + this.sampleModelTranslateY + " dataOffset[0] " + this.dataOffsets[0]);
});
});
