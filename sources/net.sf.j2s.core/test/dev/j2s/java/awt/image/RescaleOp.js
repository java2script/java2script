Clazz.declarePackage ("java.awt.image");
Clazz.load (["java.awt.image.BufferedImageOp", "$.RasterOp"], "java.awt.image.RescaleOp", ["java.lang.IllegalArgumentException", "java.awt.geom.Point2D", "java.awt.image.BufferedImage", "$.ByteLookupTable", "$.ImagingOpException", "$.LookupOp", "swingjs.JSToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.scaleFactors = null;
this.offsets = null;
this.length = 0;
this.hints = null;
this.swingJStype = 'R';
this.srcNbits = 0;
this.dstNbits = 0;
Clazz.instantialize (this, arguments);
}, java.awt.image, "RescaleOp", null, [java.awt.image.BufferedImageOp, java.awt.image.RasterOp]);
Clazz.makeConstructor (c$, 
function (scaleFactors, offsets, hints) {
this.length = scaleFactors.length;
if (this.length > offsets.length) this.length = offsets.length;
this.scaleFactors =  Clazz.newFloatArray (this.length, 0);
this.offsets =  Clazz.newFloatArray (this.length, 0);
for (var i = 0; i < this.length; i++) {
this.scaleFactors[i] = scaleFactors[i];
this.offsets[i] = offsets[i];
}
this.hints = hints;
}, "~A,~A,java.awt.RenderingHints");
Clazz.makeConstructor (c$, 
function (scaleFactor, offset, hints) {
this.length = 1;
this.scaleFactors =  Clazz.newFloatArray (1, 0);
this.offsets =  Clazz.newFloatArray (1, 0);
this.scaleFactors[0] = scaleFactor;
this.offsets[0] = offset;
this.hints = hints;
}, "~N,~N,java.awt.RenderingHints");
Clazz.defineMethod (c$, "getScaleFactors", 
function (scaleFactors) {
if (scaleFactors == null) {
return this.scaleFactors.clone ();
}System.arraycopy (this.scaleFactors, 0, scaleFactors, 0, Math.min (this.scaleFactors.length, scaleFactors.length));
return scaleFactors;
}, "~A");
Clazz.defineMethod (c$, "getOffsets", 
function (offsets) {
if (offsets == null) {
return this.offsets.clone ();
}System.arraycopy (this.offsets, 0, offsets, 0, Math.min (this.offsets.length, offsets.length));
return offsets;
}, "~A");
Clazz.defineMethod (c$, "getNumFactors", 
function () {
return this.length;
});
Clazz.defineMethod (c$, "createByteLut", 
 function (scale, off, nBands, nElems) {
var lutData =  Clazz.newByteArray (scale.length, nElems, 0);
for (var band = 0; band < scale.length; band++) {
var bandScale = scale[band];
var bandOff = off[band];
var bandLutData = lutData[band];
for (var i = 0; i < nElems; i++) {
var val = Clazz.floatToInt (i * bandScale + bandOff);
if ((val & 0xffffff00) != 0) {
if (val < 0) {
val = 0;
} else {
val = 255;
}}bandLutData[i] = val;
}
}
return  new java.awt.image.ByteLookupTable (0, lutData);
}, "~A,~A,~N,~N");
Clazz.defineMethod (c$, "canUseLookup", 
 function (src, dst) {
var datatype = src.getDataBuffer ().getDataType ();
if (datatype != 0) {
return false;
}var dstSM = dst.getSampleModel ();
this.dstNbits = dstSM.getSampleSize (0);
if (!(this.dstNbits == 8 || this.dstNbits == 16)) {
return false;
}for (var i = 1; i < src.getNumBands (); i++) {
var bandSize = dstSM.getSampleSize (i);
if (bandSize != this.dstNbits) {
return false;
}}
var srcSM = src.getSampleModel ();
this.srcNbits = srcSM.getSampleSize (0);
if (this.srcNbits > 16) {
return false;
}for (var i = 1; i < src.getNumBands (); i++) {
var bandSize = srcSM.getSampleSize (i);
if (bandSize != this.srcNbits) {
return false;
}}
return true;
}, "java.awt.image.Raster,java.awt.image.Raster");
Clazz.defineMethod (c$, "filter", 
function (src, dst) {
var srcCM = src.getColorModel ();
var dstCM;
var numBands = srcCM.getNumColorComponents ();
if (this.length != 1 && this.length != numBands && this.length != srcCM.getNumComponents ()) {
throw  new IllegalArgumentException ("Number of scaling constants does not equal the number of of color or color/alpha  components");
}if (this.length > numBands && srcCM.hasAlpha ()) {
this.length = numBands + 1;
}var width = src.getWidth ();
var height = src.getHeight ();
if (dst == null) {
dst = this.createCompatibleDestImage (src, null);
dstCM = srcCM;
} else {
if (width != dst.getWidth ()) {
throw  new IllegalArgumentException ("Src width (" + width + ") not equal to dst width (" + dst.getWidth () + ")");
}if (height != dst.getHeight ()) {
throw  new IllegalArgumentException ("Src height (" + height + ") not equal to dst height (" + dst.getHeight () + ")");
}dstCM = dst.getColorModel ();
if (srcCM.getColorSpace ().getType () != dstCM.getColorSpace ().getType ()) {
swingjs.JSToolkit.notImplemented (null);
throw  new java.awt.image.ImagingOpException ("SwingJS only supports RGB color space");
}}var origDst = dst;
var srcRaster = src.getRaster ();
var dstRaster = dst.getRaster ();
if (srcCM.hasAlpha ()) {
if (numBands - 1 == this.length || this.length == 1) {
var minx = srcRaster.getMinX ();
var miny = srcRaster.getMinY ();
var bands =  Clazz.newIntArray (numBands - 1, 0);
for (var i = 0; i < numBands - 1; i++) {
bands[i] = i;
}
srcRaster = srcRaster.createWritableChild (minx, miny, srcRaster.getWidth (), srcRaster.getHeight (), minx, miny, bands);
}}if (dstCM.hasAlpha ()) {
var dstNumBands = dstRaster.getNumBands ();
if (dstNumBands - 1 == this.length || this.length == 1) {
var minx = dstRaster.getMinX ();
var miny = dstRaster.getMinY ();
var bands =  Clazz.newIntArray (numBands - 1, 0);
for (var i = 0; i < numBands - 1; i++) {
bands[i] = i;
}
dstRaster = dstRaster.createWritableChild (minx, miny, dstRaster.getWidth (), dstRaster.getHeight (), minx, miny, bands);
}}this.filter (srcRaster, dstRaster);
return origDst;
}, "java.awt.image.BufferedImage,java.awt.image.BufferedImage");
Clazz.defineMethod (c$, "filter", 
function (src, dst) {
var numBands = src.getNumBands ();
var width = src.getWidth ();
var height = src.getHeight ();
var srcPix = null;
var step = 0;
var tidx = 0;
if (dst == null) {
dst = this.createCompatibleDestRaster (src);
} else if (height != dst.getHeight () || width != dst.getWidth ()) {
throw  new IllegalArgumentException ("Width or height of Rasters do not match");
} else if (numBands != dst.getNumBands ()) {
throw  new IllegalArgumentException ("Number of bands in src " + numBands + " does not equal number of bands in dest " + dst.getNumBands ());
}if (this.length != 1 && this.length != src.getNumBands ()) {
throw  new IllegalArgumentException ("Number of scaling constants does not equal the number of of bands in the src raster");
}if (this.canUseLookup (src, dst)) {
var srcNgray = (1 << this.srcNbits);
var dstNgray = (1 << this.dstNbits);
if (dstNgray != 256) {
throw  new java.awt.image.ImagingOpException ("SwingJS requires 256 gray scale");
}if (dstNgray == 256) {
var lut = this.createByteLut (this.scaleFactors, this.offsets, numBands, srcNgray);
var op =  new java.awt.image.LookupOp (lut, this.hints);
op.filter (src, dst);
}} else {
if (this.length > 1) {
step = 1;
}var sminX = src.getMinX ();
var sY = src.getMinY ();
var dminX = dst.getMinX ();
var dY = dst.getMinY ();
var sX;
var dX;
var nbits;
var dstMax =  Clazz.newIntArray (numBands, 0);
var dstMask =  Clazz.newIntArray (numBands, 0);
var dstSM = dst.getSampleModel ();
for (var z = 0; z < numBands; z++) {
nbits = dstSM.getSampleSize (z);
dstMax[z] = (1 << nbits) - 1;
dstMask[z] = ~(dstMax[z]);
}
var val;
for (var y = 0; y < height; y++, sY++, dY++) {
dX = dminX;
sX = sminX;
for (var x = 0; x < width; x++, sX++, dX++) {
srcPix = src.getPixel (sX, sY, srcPix);
tidx = 0;
for (var z = 0; z < numBands; z++, tidx += step) {
val = Clazz.floatToInt (srcPix[z] * this.scaleFactors[tidx] + this.offsets[tidx]);
if ((val & dstMask[z]) != 0) {
if (val < 0) {
val = 0;
} else {
val = dstMax[z];
}}srcPix[z] = val;
}
dst.setPixel (dX, dY, srcPix);
}
}
}return dst;
}, "java.awt.image.Raster,java.awt.image.WritableRaster");
Clazz.defineMethod (c$, "getBounds2D", 
function (src) {
return this.getBounds2D (src.getRaster ());
}, "java.awt.image.BufferedImage");
Clazz.defineMethod (c$, "getBounds2D", 
function (src) {
return src.getBounds ();
}, "java.awt.image.Raster");
Clazz.overrideMethod (c$, "createCompatibleDestImage", 
function (src, destCM) {
var image;
if (destCM == null) {
var cm = src.getColorModel ();
image =  new java.awt.image.BufferedImage (cm, src.getRaster ().createCompatibleWritableRaster (), cm.isAlphaPremultiplied (), null);
} else {
var w = src.getWidth ();
var h = src.getHeight ();
image =  new java.awt.image.BufferedImage (destCM, destCM.createCompatibleWritableRaster (w, h), destCM.isAlphaPremultiplied (), null);
}return image;
}, "java.awt.image.BufferedImage,java.awt.image.ColorModel");
Clazz.overrideMethod (c$, "createCompatibleDestRaster", 
function (src) {
return src.createCompatibleWritableRaster (src.getWidth (), src.getHeight ());
}, "java.awt.image.Raster");
Clazz.overrideMethod (c$, "getPoint2D", 
function (srcPt, dstPt) {
if (dstPt == null) {
dstPt =  new java.awt.geom.Point2D.Float ();
}dstPt.setLocation (srcPt.getX (), srcPt.getY ());
return dstPt;
}, "java.awt.geom.Point2D,java.awt.geom.Point2D");
Clazz.overrideMethod (c$, "getRenderingHints", 
function () {
return this.hints;
});
});
