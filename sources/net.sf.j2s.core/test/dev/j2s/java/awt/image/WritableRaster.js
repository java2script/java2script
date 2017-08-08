Clazz.declarePackage ("java.awt.image");
Clazz.load (["java.awt.image.Raster"], "java.awt.image.WritableRaster", ["java.lang.ArrayIndexOutOfBoundsException", "java.awt.Point", "$.Rectangle", "java.awt.image.RasterFormatException"], function () {
c$ = Clazz.declareType (java.awt.image, "WritableRaster", java.awt.image.Raster);
Clazz.defineMethod (c$, "setParams", 
function (model, dataBuffer, origin) {
}, "java.awt.image.SampleModel,java.awt.image.DataBuffer,java.awt.Point");
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.awt.image.WritableRaster, []);
});
Clazz.makeConstructor (c$, 
function (sampleModel, origin) {
Clazz.superConstructor (this, java.awt.image.WritableRaster, []);
this.setRaster (sampleModel, sampleModel.createDataBuffer (),  new java.awt.Rectangle (origin.x, origin.y, sampleModel.getWidth (), sampleModel.getHeight ()), origin, null);
}, "java.awt.image.SampleModel,java.awt.Point");
Clazz.makeConstructor (c$, 
function (sampleModel, dataBuffer, origin) {
Clazz.superConstructor (this, java.awt.image.WritableRaster, []);
this.setRaster (sampleModel, dataBuffer,  new java.awt.Rectangle (origin.x, origin.y, sampleModel.getWidth (), sampleModel.getHeight ()), origin, null);
}, "java.awt.image.SampleModel,java.awt.image.DataBuffer,java.awt.Point");
Clazz.makeConstructor (c$, 
function (sampleModel, dataBuffer, aRegion, sampleModelTranslate, parent) {
Clazz.superConstructor (this, java.awt.image.WritableRaster, []);
this.setRaster (sampleModel, dataBuffer, aRegion, sampleModelTranslate, parent);
}, "java.awt.image.SampleModel,java.awt.image.DataBuffer,java.awt.Rectangle,java.awt.Point,java.awt.image.Raster");
Clazz.defineMethod (c$, "getWritableParent", 
function () {
return this.parent;
});
Clazz.defineMethod (c$, "createWritableTranslatedChild", 
function (childMinX, childMinY) {
return this.createWritableChild (this.minX, this.minY, this.width, this.height, childMinX, childMinY, null);
}, "~N,~N");
Clazz.defineMethod (c$, "createWritableChild", 
function (parentX, parentY, w, h, childMinX, childMinY, bandList) {
if (parentX < this.minX) {
throw  new java.awt.image.RasterFormatException ("parentX lies outside raster");
}if (parentY < this.minY) {
throw  new java.awt.image.RasterFormatException ("parentY lies outside raster");
}if ((parentX + w < parentX) || (parentX + w > this.width + this.minX)) {
throw  new java.awt.image.RasterFormatException ("(parentX + width) is outside raster");
}if ((parentY + h < parentY) || (parentY + h > this.height + this.minY)) {
throw  new java.awt.image.RasterFormatException ("(parentY + height) is outside raster");
}var sm;
if (bandList != null) {
sm = this.sampleModel.createSubsetSampleModel (bandList);
} else {
sm = this.sampleModel;
}var deltaX = childMinX - parentX;
var deltaY = childMinY - parentY;
return  new java.awt.image.WritableRaster (sm, this.getDataBuffer (),  new java.awt.Rectangle (childMinX, childMinY, w, h),  new java.awt.Point (this.sampleModelTranslateX + deltaX, this.sampleModelTranslateY + deltaY), this);
}, "~N,~N,~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "setDataElements", 
function (x, y, inData) {
if (Clazz.instanceOf (inData, java.awt.image.Raster)) {
this.setDataElementsRaster (x, y, inData);
} else {
this.sampleModel.setDataElements (x - this.sampleModelTranslateX, y - this.sampleModelTranslateY, inData, this.dataBuffer);
}}, "~N,~N,~O");
Clazz.defineMethod (c$, "setDataElementsRaster", 
function (x, y, inRaster) {
var dstOffX = x + inRaster.getMinX ();
var dstOffY = y + inRaster.getMinY ();
var width = inRaster.getWidth ();
var height = inRaster.getHeight ();
if ((dstOffX < this.minX) || (dstOffY < this.minY) || (dstOffX + width > this.minX + this.width) || (dstOffY + height > this.minY + this.height)) {
throw  new ArrayIndexOutOfBoundsException ("Coordinate out of bounds!");
}var srcOffX = inRaster.getMinX ();
var srcOffY = inRaster.getMinY ();
var tdata = null;
for (var startY = 0; startY < height; startY++) {
tdata = inRaster.getDataElements (srcOffX, srcOffY + startY, width, 1, tdata);
this.setDataElements (dstOffX, dstOffY + startY, width, 1, tdata);
}
}, "~N,~N,java.awt.image.Raster");
Clazz.defineMethod (c$, "setDataElements", 
function (x, y, w, h, inData) {
this.sampleModel.setDataElements (x - this.sampleModelTranslateX, y - this.sampleModelTranslateY, w, h, inData, this.dataBuffer);
}, "~N,~N,~N,~N,~O");
Clazz.defineMethod (c$, "setRect", 
function (srcRaster) {
this.setRect (0, 0, srcRaster);
}, "java.awt.image.Raster");
Clazz.defineMethod (c$, "setRect", 
function (dx, dy, srcRaster) {
var width = srcRaster.getWidth ();
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
}if (dstOffX + width > this.minX + this.width) {
width = this.minX + this.width - dstOffX;
}if (dstOffY + height > this.minY + this.height) {
height = this.minY + this.height - dstOffY;
}if (width <= 0 || height <= 0) {
return;
}switch (srcRaster.getSampleModel ().getDataType ()) {
case 0:
case 3:
var iData = null;
for (var startY = 0; startY < height; startY++) {
iData = srcRaster.getPixels (srcOffX, srcOffY + startY, width, 1, iData);
this.setPixels (dstOffX, dstOffY + startY, width, 1, iData);
}
break;
}
}, "~N,~N,java.awt.image.Raster");
Clazz.defineMethod (c$, "setPixel", 
function (x, y, iArray) {
this.sampleModel.setPixel (x - this.sampleModelTranslateX, y - this.sampleModelTranslateY, iArray, this.dataBuffer);
}, "~N,~N,~A");
Clazz.defineMethod (c$, "setPixel", 
function (x, y, fArray) {
this.sampleModel.setPixel (x - this.sampleModelTranslateX, y - this.sampleModelTranslateY, fArray, this.dataBuffer);
}, "~N,~N,~A");
Clazz.defineMethod (c$, "setPixel", 
function (x, y, dArray) {
this.sampleModel.setPixel (x - this.sampleModelTranslateX, y - this.sampleModelTranslateY, dArray, this.dataBuffer);
}, "~N,~N,~A");
Clazz.defineMethod (c$, "setPixels", 
function (x, y, w, h, iArray) {
this.sampleModel.setPixels (x - this.sampleModelTranslateX, y - this.sampleModelTranslateY, w, h, iArray, this.dataBuffer);
}, "~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "setPixels", 
function (x, y, w, h, fArray) {
this.sampleModel.setPixels (x - this.sampleModelTranslateX, y - this.sampleModelTranslateY, w, h, fArray, this.dataBuffer);
}, "~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "setPixels", 
function (x, y, w, h, dArray) {
this.sampleModel.setPixels (x - this.sampleModelTranslateX, y - this.sampleModelTranslateY, w, h, dArray, this.dataBuffer);
}, "~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "setSample", 
function (x, y, b, s) {
this.sampleModel.setSample (x - this.sampleModelTranslateX, y - this.sampleModelTranslateY, b, s, this.dataBuffer);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setSample", 
function (x, y, b, s) {
this.sampleModel.setSample (x - this.sampleModelTranslateX, y - this.sampleModelTranslateY, b, s, this.dataBuffer);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setSample", 
function (x, y, b, s) {
this.sampleModel.setSample (x - this.sampleModelTranslateX, y - this.sampleModelTranslateY, b, s, this.dataBuffer);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setSamples", 
function (x, y, w, h, b, iArray) {
this.sampleModel.setSamples (x - this.sampleModelTranslateX, y - this.sampleModelTranslateY, w, h, b, iArray, this.dataBuffer);
}, "~N,~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "setSamples", 
function (x, y, w, h, b, fArray) {
this.sampleModel.setSamples (x - this.sampleModelTranslateX, y - this.sampleModelTranslateY, w, h, b, fArray, this.dataBuffer);
}, "~N,~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "setSamples", 
function (x, y, w, h, b, dArray) {
this.sampleModel.setSamples (x - this.sampleModelTranslateX, y - this.sampleModelTranslateY, w, h, b, dArray, this.dataBuffer);
}, "~N,~N,~N,~N,~N,~A");
});
