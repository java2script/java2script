Clazz.declarePackage ("java.awt.image");
Clazz.load (["java.awt.image.MultiPixelPackedSampleModel", "$.SinglePixelPackedSampleModel"], "java.awt.image.Raster", ["java.lang.IllegalArgumentException", "$.NullPointerException", "java.awt.Point", "$.Rectangle", "java.awt.image.DataBuffer", "$.DataBufferByte", "$.DataBufferInt", "$.RasterFormatException", "swingjs.api.Interface"], function () {
c$ = Clazz.decorateAsClass (function () {
this.sampleModel = null;
this.dataBuffer = null;
this.minX = 0;
this.minY = 0;
this.width = 0;
this.height = 0;
this.sampleModelTranslateX = 0;
this.sampleModelTranslateY = 0;
this.numBands = 0;
this.numDataElements = 0;
this.parent = null;
Clazz.instantialize (this, arguments);
}, java.awt.image, "Raster");
c$.createPackedRaster = Clazz.defineMethod (c$, "createPackedRaster", 
function (dataType, w, h, bandMasks, location) {
var d;
switch (dataType) {
case 0:
d =  new java.awt.image.DataBufferByte (w * h);
break;
case 3:
d =  new java.awt.image.DataBufferInt (w * h);
break;
default:
throw  new IllegalArgumentException ("Unsupported data type " + dataType);
}
return java.awt.image.Raster.createPackedRaster (d, w, h, w, bandMasks, location);
}, "~N,~N,~N,~A,java.awt.Point");
c$.createPackedRaster = Clazz.defineMethod (c$, "createPackedRaster", 
function (dataType, w, h, bands, bitsPerBand, location) {
var d;
if (bands <= 0) {
throw  new IllegalArgumentException ("Number of bands (" + bands + ") must be greater than 0");
}if (bitsPerBand <= 0) {
throw  new IllegalArgumentException ("Bits per band (" + bitsPerBand + ") must be greater than 0");
}if (bands != 1) {
var masks =  Clazz.newIntArray (bands, 0);
var mask = (1 << bitsPerBand) - 1;
var shift = (bands - 1) * bitsPerBand;
if (shift + bitsPerBand > java.awt.image.DataBuffer.getDataTypeSize (dataType)) {
throw  new IllegalArgumentException ("bitsPerBand(" + bitsPerBand + ") * bands is " + " greater than data type " + "size.");
}switch (dataType) {
case 0:
case 3:
break;
default:
throw  new IllegalArgumentException ("Unsupported data type " + dataType);
}
for (var i = 0; i < bands; i++) {
masks[i] = mask << shift;
shift = shift - bitsPerBand;
}
return java.awt.image.Raster.createPackedRaster (dataType, w, h, masks, location);
} else {
var fw = w;
switch (dataType) {
case 0:
d =  new java.awt.image.DataBufferByte (Clazz.doubleToInt (Math.ceil (fw / (Clazz.doubleToInt (8 / bitsPerBand)))) * h);
break;
case 3:
d =  new java.awt.image.DataBufferInt (Clazz.doubleToInt (Math.ceil (fw / (Clazz.doubleToInt (32 / bitsPerBand)))) * h);
break;
default:
throw  new IllegalArgumentException ("Unsupported data type " + dataType);
}
return java.awt.image.Raster.createPackedRaster (d, w, h, bitsPerBand, location);
}}, "~N,~N,~N,~N,~N,java.awt.Point");
c$.createPackedRaster = Clazz.defineMethod (c$, "createPackedRaster", 
function (dataBuffer, w, h, scanlineStride, bandMasks, location) {
if (dataBuffer == null) {
throw  new NullPointerException ("DataBuffer cannot be null");
}if (location == null) {
location =  new java.awt.Point (0, 0);
}var dataType = dataBuffer.getDataType ();
var sppsm =  new java.awt.image.SinglePixelPackedSampleModel (dataType, w, h, scanlineStride, bandMasks);
switch (dataType) {
case 0:
case 3:
break;
default:
throw  new IllegalArgumentException ("Unsupported data type " + dataType);
}
var r = swingjs.api.Interface.getInstance ("sun.awt.image." + (dataType == 0 ? "Byte" : "Integer") + "InterleavedRaster", true);
r.setParams (sppsm, dataBuffer, location);
return r;
}, "java.awt.image.DataBuffer,~N,~N,~N,~A,java.awt.Point");
c$.createPackedRaster = Clazz.defineMethod (c$, "createPackedRaster", 
function (dataBuffer, w, h, bitsPerPixel, location) {
if (dataBuffer == null) {
throw  new NullPointerException ("DataBuffer cannot be null");
}if (location == null) {
location =  new java.awt.Point (0, 0);
}var dataType = dataBuffer.getDataType ();
if (dataType != 0 && dataType != 3) {
throw  new IllegalArgumentException ("Unsupported data type " + dataType);
}if (dataBuffer.getNumBanks () != 1) {
throw  new java.awt.image.RasterFormatException ("DataBuffer for packed Rasters must only have 1 bank.");
}var mppsm =  new java.awt.image.MultiPixelPackedSampleModel (dataType, w, h, bitsPerPixel);
if (dataType == 0 && (bitsPerPixel == 1 || bitsPerPixel == 2 || bitsPerPixel == 4)) {
return  new sun.awt.image.BytePackedRaster (mppsm, dataBuffer, location);
} else {
return  new sun.awt.image.SunWritableRaster (mppsm, dataBuffer, location);
}}, "java.awt.image.DataBuffer,~N,~N,~N,java.awt.Point");
c$.createRaster = Clazz.defineMethod (c$, "createRaster", 
function (sm, db, location) {
if ((sm == null) || (db == null)) {
throw  new NullPointerException ("SampleModel and DataBuffer cannot be null");
}if (location == null) {
location =  new java.awt.Point (0, 0);
}var dataType = sm.getDataType ();
if (Clazz.instanceOf (sm, java.awt.image.MultiPixelPackedSampleModel) && dataType == 0 && sm.getSampleSize (0) < 8) {
return  new sun.awt.image.BytePackedRaster (sm, db, location);
}return  new java.awt.image.Raster (sm, db, location);
}, "java.awt.image.SampleModel,java.awt.image.DataBuffer,java.awt.Point");
c$.createWritableRaster = Clazz.defineMethod (c$, "createWritableRaster", 
function (sm, location) {
if (location == null) {
location =  new java.awt.Point (0, 0);
}return java.awt.image.Raster.createWritableRaster (sm, sm.createDataBuffer (), location);
}, "java.awt.image.SampleModel,java.awt.Point");
c$.createWritableRaster = Clazz.defineMethod (c$, "createWritableRaster", 
function (sm, db, location) {
if ((sm == null) || (db == null)) {
throw  new NullPointerException ("SampleModel and DataBuffer cannot be null");
}if (location == null) {
location =  new java.awt.Point (0, 0);
}var dataType = sm.getDataType ();
if (Clazz.instanceOf (sm, java.awt.image.MultiPixelPackedSampleModel) && dataType == 0 && sm.getSampleSize (0) < 8) {
return  new sun.awt.image.BytePackedRaster (sm, db, location);
}return  new sun.awt.image.SunWritableRaster (sm, db, location);
}, "java.awt.image.SampleModel,java.awt.image.DataBuffer,java.awt.Point");
Clazz.makeConstructor (c$, 
function (sampleModel, origin) {
this.setRaster (sampleModel, sampleModel.createDataBuffer (),  new java.awt.Rectangle (origin.x, origin.y, sampleModel.getWidth (), sampleModel.getHeight ()), origin, null);
}, "java.awt.image.SampleModel,java.awt.Point");
Clazz.makeConstructor (c$, 
function (sampleModel, dataBuffer, origin) {
this.setRaster (sampleModel, dataBuffer,  new java.awt.Rectangle (origin.x, origin.y, sampleModel.getWidth (), sampleModel.getHeight ()), origin, null);
}, "java.awt.image.SampleModel,java.awt.image.DataBuffer,java.awt.Point");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (sampleModel, dataBuffer, aRegion, sampleModelTranslate, parent) {
this.setRaster (sampleModel, dataBuffer, aRegion, sampleModelTranslate, parent);
}, "java.awt.image.SampleModel,java.awt.image.DataBuffer,java.awt.Rectangle,java.awt.Point,java.awt.image.Raster");
Clazz.defineMethod (c$, "setRaster", 
function (sampleModel, dataBuffer, aRegion, sampleModelTranslate, parent) {
if ((sampleModel == null) || (dataBuffer == null) || (aRegion == null) || (sampleModelTranslate == null)) {
throw  new NullPointerException ("SampleModel, dataBuffer, aRegion and sampleModelTranslate cannot be null");
}this.sampleModel = sampleModel;
this.dataBuffer = dataBuffer;
this.minX = aRegion.x;
this.minY = aRegion.y;
this.width = aRegion.width;
this.height = aRegion.height;
if (this.width <= 0 || this.height <= 0) {
throw  new java.awt.image.RasterFormatException ("negative or zero " + ((this.width <= 0) ? "width" : "height"));
}if ((this.minX + this.width) < this.minX) {
throw  new java.awt.image.RasterFormatException ("overflow condition for X coordinates of Raster");
}if ((this.minY + this.height) < this.minY) {
throw  new java.awt.image.RasterFormatException ("overflow condition for Y coordinates of Raster");
}this.sampleModelTranslateX = sampleModelTranslate.x;
this.sampleModelTranslateY = sampleModelTranslate.y;
this.numBands = sampleModel.getNumBands ();
this.numDataElements = sampleModel.getNumDataElements ();
this.parent = parent;
}, "java.awt.image.SampleModel,java.awt.image.DataBuffer,java.awt.Rectangle,java.awt.Point,java.awt.image.Raster");
Clazz.defineMethod (c$, "getParent", 
function () {
return this.parent;
});
Clazz.defineMethod (c$, "getSampleModelTranslateX", 
function () {
return this.sampleModelTranslateX;
});
Clazz.defineMethod (c$, "getSampleModelTranslateY", 
function () {
return this.sampleModelTranslateY;
});
Clazz.defineMethod (c$, "createCompatibleWritableRaster", 
function () {
return  new sun.awt.image.SunWritableRaster (this.sampleModel,  new java.awt.Point (0, 0));
});
Clazz.defineMethod (c$, "createCompatibleWritableRaster", 
function (w, h) {
if (w <= 0 || h <= 0) {
throw  new java.awt.image.RasterFormatException ("negative " + ((w <= 0) ? "width" : "height"));
}var sm = this.sampleModel.createCompatibleSampleModel (w, h);
return  new sun.awt.image.SunWritableRaster (sm,  new java.awt.Point (0, 0));
}, "~N,~N");
Clazz.defineMethod (c$, "createCompatibleWritableRaster", 
function (rect) {
if (rect == null) {
throw  new NullPointerException ("Rect cannot be null");
}return this.createCompatibleWritableRaster (rect.x, rect.y, rect.width, rect.height);
}, "java.awt.Rectangle");
Clazz.defineMethod (c$, "createCompatibleWritableRaster", 
function (x, y, w, h) {
var ret = this.createCompatibleWritableRaster (w, h);
return ret.createWritableChild (0, 0, w, h, x, y, null);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "createTranslatedChild", 
function (childMinX, childMinY) {
return this.createChild (this.minX, this.minY, this.width, this.height, childMinX, childMinY, null);
}, "~N,~N");
Clazz.defineMethod (c$, "createChild", 
function (parentX, parentY, width, height, childMinX, childMinY, bandList) {
if (parentX < this.minX) {
throw  new java.awt.image.RasterFormatException ("parentX lies outside raster");
}if (parentY < this.minY) {
throw  new java.awt.image.RasterFormatException ("parentY lies outside raster");
}if ((parentX + width < parentX) || (parentX + width > this.width + this.minX)) {
throw  new java.awt.image.RasterFormatException ("(parentX + width) is outside raster");
}if ((parentY + height < parentY) || (parentY + height > this.height + this.minY)) {
throw  new java.awt.image.RasterFormatException ("(parentY + height) is outside raster");
}var subSampleModel;
if (bandList == null) {
subSampleModel = this.sampleModel;
} else {
subSampleModel = this.sampleModel.createSubsetSampleModel (bandList);
}var deltaX = childMinX - parentX;
var deltaY = childMinY - parentY;
return  new java.awt.image.Raster (subSampleModel, this.getDataBuffer (),  new java.awt.Rectangle (childMinX, childMinY, width, height),  new java.awt.Point (this.sampleModelTranslateX + deltaX, this.sampleModelTranslateY + deltaY), this);
}, "~N,~N,~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "getBounds", 
function () {
return  new java.awt.Rectangle (this.minX, this.minY, this.width, this.height);
});
Clazz.defineMethod (c$, "getMinX", 
function () {
return this.minX;
});
Clazz.defineMethod (c$, "getMinY", 
function () {
return this.minY;
});
Clazz.defineMethod (c$, "getWidth", 
function () {
return this.width;
});
Clazz.defineMethod (c$, "getHeight", 
function () {
return this.height;
});
Clazz.defineMethod (c$, "getNumBands", 
function () {
return this.numBands;
});
Clazz.defineMethod (c$, "getNumDataElements", 
function () {
return this.sampleModel.getNumDataElements ();
});
Clazz.defineMethod (c$, "getTransferType", 
function () {
return this.sampleModel.getTransferType ();
});
Clazz.defineMethod (c$, "getDataBuffer", 
function () {
return this.dataBuffer;
});
Clazz.defineMethod (c$, "getSampleModel", 
function () {
return this.sampleModel;
});
Clazz.defineMethod (c$, "getDataElements", 
function (x, y, outData) {
return this.sampleModel.getDataElements (x - this.sampleModelTranslateX, y - this.sampleModelTranslateY, outData, this.dataBuffer);
}, "~N,~N,~O");
Clazz.defineMethod (c$, "getDataElements", 
function (x, y, w, h, outData) {
return this.sampleModel.getDataElements (x - this.sampleModelTranslateX, y - this.sampleModelTranslateY, w, h, outData, this.dataBuffer);
}, "~N,~N,~N,~N,~O");
Clazz.defineMethod (c$, "getPixel", 
function (x, y, iArray) {
return this.sampleModel.getPixel (x - this.sampleModelTranslateX, y - this.sampleModelTranslateY, iArray, this.dataBuffer);
}, "~N,~N,~A");
Clazz.defineMethod (c$, "getPixel", 
function (x, y, fArray) {
return this.sampleModel.getPixel (x - this.sampleModelTranslateX, y - this.sampleModelTranslateY, fArray, this.dataBuffer);
}, "~N,~N,~A");
Clazz.defineMethod (c$, "getPixel", 
function (x, y, dArray) {
return this.sampleModel.getPixel (x - this.sampleModelTranslateX, y - this.sampleModelTranslateY, dArray, this.dataBuffer);
}, "~N,~N,~A");
Clazz.defineMethod (c$, "getPixels", 
function (x, y, w, h, iArray) {
return this.sampleModel.getPixels (x - this.sampleModelTranslateX, y - this.sampleModelTranslateY, w, h, iArray, this.dataBuffer);
}, "~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "getPixels", 
function (x, y, w, h, fArray) {
return this.sampleModel.getPixels (x - this.sampleModelTranslateX, y - this.sampleModelTranslateY, w, h, fArray, this.dataBuffer);
}, "~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "getPixels", 
function (x, y, w, h, dArray) {
return this.sampleModel.getPixels (x - this.sampleModelTranslateX, y - this.sampleModelTranslateY, w, h, dArray, this.dataBuffer);
}, "~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "getSample", 
function (x, y, b) {
return this.sampleModel.getSample (x - this.sampleModelTranslateX, y - this.sampleModelTranslateY, b, this.dataBuffer);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getSampleFloat", 
function (x, y, b) {
return this.sampleModel.getSampleFloat (x - this.sampleModelTranslateX, y - this.sampleModelTranslateY, b, this.dataBuffer);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getSampleDouble", 
function (x, y, b) {
return this.sampleModel.getSampleDouble (x - this.sampleModelTranslateX, y - this.sampleModelTranslateY, b, this.dataBuffer);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getSamples", 
function (x, y, w, h, b, iArray) {
return this.sampleModel.getSamples (x - this.sampleModelTranslateX, y - this.sampleModelTranslateY, w, h, b, iArray, this.dataBuffer);
}, "~N,~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "getSamples", 
function (x, y, w, h, b, fArray) {
return this.sampleModel.getSamples (x - this.sampleModelTranslateX, y - this.sampleModelTranslateY, w, h, b, fArray, this.dataBuffer);
}, "~N,~N,~N,~N,~N,~A");
Clazz.defineMethod (c$, "getSamples", 
function (x, y, w, h, b, dArray) {
return this.sampleModel.getSamples (x - this.sampleModelTranslateX, y - this.sampleModelTranslateY, w, h, b, dArray, this.dataBuffer);
}, "~N,~N,~N,~N,~N,~A");
});
