Clazz.declarePackage ("java.awt.image");
Clazz.load (["java.awt.image.BufferedImageOp", "$.RasterOp"], "java.awt.image.LookupOp", ["java.lang.IllegalArgumentException", "java.awt.geom.Point2D", "java.awt.image.BufferedImage", "$.ByteLookupTable", "$.ImagingOpException", "sun.awt.image.ImagingLib"], function () {
c$ = Clazz.decorateAsClass (function () {
this.ltable = null;
this.swingJStype = 'L';
this.hints = null;
Clazz.instantialize (this, arguments);
}, java.awt.image, "LookupOp", null, [java.awt.image.BufferedImageOp, java.awt.image.RasterOp]);
Clazz.makeConstructor (c$, 
function (lookup, hints) {
this.ltable = lookup;
this.hints = hints;
}, "java.awt.image.LookupTable,java.awt.RenderingHints");
Clazz.defineMethod (c$, "getTable", 
function () {
return this.ltable;
});
Clazz.defineMethod (c$, "filter", 
function (src, dst) {
var srcCM = src.getColorModel ();
var numBands = srcCM.getNumColorComponents ();
var dstCM;
var numComponents = this.ltable.getNumComponents ();
if (numComponents != 1 && numComponents != srcCM.getNumComponents () && numComponents != srcCM.getNumColorComponents ()) {
throw  new IllegalArgumentException ("Number of arrays in the  lookup table (" + numComponents + " is not compatible with the " + " src image: " + src);
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
throw  new java.awt.image.ImagingOpException ("SwingJS: Only RGB color space is supported");
}}var origDst = dst;
var srcRaster = src.getRaster ();
var dstRaster = dst.getRaster ();
if (srcCM.hasAlpha ()) {
if (numBands - 1 == numComponents || numComponents == 1) {
var minx = srcRaster.getMinX ();
var miny = srcRaster.getMinY ();
var bands =  Clazz.newIntArray (numBands - 1, 0);
for (var i = 0; i < numBands - 1; i++) {
bands[i] = i;
}
srcRaster = srcRaster.createWritableChild (minx, miny, srcRaster.getWidth (), srcRaster.getHeight (), minx, miny, bands);
}}if (dstCM.hasAlpha ()) {
var dstNumBands = dstRaster.getNumBands ();
if (dstNumBands - 1 == numComponents || numComponents == 1) {
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
var dstLength = dst.getNumBands ();
var height = src.getHeight ();
var width = src.getWidth ();
var srcPix =  Clazz.newIntArray (numBands, 0);
if (height != dst.getHeight () || width != dst.getWidth ()) {
throw  new IllegalArgumentException ("Width or height of Rasters do not match");
}dstLength = dst.getNumBands ();
if (numBands != dstLength) {
throw  new IllegalArgumentException ("Number of channels in the src (" + numBands + ") does not match number of channels" + " in the destination (" + dstLength + ")");
}var numComponents = this.ltable.getNumComponents ();
if (numComponents != 1 && numComponents != src.getNumBands ()) {
throw  new IllegalArgumentException ("Number of arrays in the  lookup table (" + numComponents + " is not compatible with the " + " src Raster: " + src);
}if (sun.awt.image.ImagingLib.filter (this, src, dst) != null) {
return dst;
}if (Clazz.instanceOf (this.ltable, java.awt.image.ByteLookupTable)) {
this.byteFilter (this.ltable, src, dst, width, height, numBands);
} else {
var sminX = src.getMinX ();
var sY = src.getMinY ();
var dminX = dst.getMinX ();
var dY = dst.getMinY ();
for (var y = 0; y < height; y++, sY++, dY++) {
var sX = sminX;
var dX = dminX;
for (var x = 0; x < width; x++, sX++, dX++) {
src.getPixel (sX, sY, srcPix);
this.ltable.lookupPixel (srcPix, srcPix);
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
var w = src.getWidth ();
var h = src.getHeight ();
if (destCM == null) {
var cm = src.getColorModel ();
image =  new java.awt.image.BufferedImage (cm, cm.createCompatibleWritableRaster (w, h), cm.isAlphaPremultiplied (), null);
} else {
image =  new java.awt.image.BufferedImage (destCM, destCM.createCompatibleWritableRaster (w, h), destCM.isAlphaPremultiplied (), null);
}return image;
}, "java.awt.image.BufferedImage,java.awt.image.ColorModel");
Clazz.overrideMethod (c$, "createCompatibleDestRaster", 
function (src) {
return src.createCompatibleWritableRaster ();
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
Clazz.defineMethod (c$, "byteFilter", 
 function (lookup, src, dst, width, height, numBands) {
var srcPix = null;
var table = lookup.getTable ();
var offset = lookup.getOffset ();
var tidx;
var step = 1;
if (table.length == 1) {
step = 0;
}var x;
var y;
var band;
var len = table[0].length;
for (y = 0; y < height; y++) {
tidx = 0;
for (band = 0; band < numBands; band++, tidx += step) {
srcPix = src.getSamples (0, y, width, 1, band, srcPix);
for (x = 0; x < width; x++) {
var index = srcPix[x] - offset;
if (index < 0 || index > len) {
throw  new IllegalArgumentException ("index (" + index + "(out of range: " + " srcPix[" + x + "]=" + srcPix[x] + " offset=" + offset);
}srcPix[x] = table[tidx][index];
}
dst.setSamples (0, y, width, 1, band, srcPix);
}
}
}, "java.awt.image.ByteLookupTable,java.awt.image.Raster,java.awt.image.WritableRaster,~N,~N,~N");
});
