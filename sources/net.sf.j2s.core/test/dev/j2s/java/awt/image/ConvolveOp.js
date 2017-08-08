Clazz.declarePackage ("java.awt.image");
Clazz.load (["java.awt.image.BufferedImageOp", "$.RasterOp"], "java.awt.image.ConvolveOp", ["java.lang.IllegalArgumentException", "$.NullPointerException", "java.awt.geom.Point2D", "java.awt.image.BufferedImage", "$.ImagingOpException", "sun.awt.image.ImagingLib"], function () {
c$ = Clazz.decorateAsClass (function () {
this.kernel = null;
this.edgeHint = 0;
this.hints = null;
this.swingJStype = 'C';
Clazz.instantialize (this, arguments);
}, java.awt.image, "ConvolveOp", null, [java.awt.image.BufferedImageOp, java.awt.image.RasterOp]);
Clazz.makeConstructor (c$, 
function (kernel, edgeCondition, hints) {
this.kernel = kernel;
this.edgeHint = edgeCondition;
this.hints = hints;
}, "java.awt.image.Kernel,~N,java.awt.RenderingHints");
Clazz.makeConstructor (c$, 
function (kernel) {
this.kernel = kernel;
this.edgeHint = 0;
}, "java.awt.image.Kernel");
Clazz.defineMethod (c$, "getEdgeCondition", 
function () {
return this.edgeHint;
});
Clazz.defineMethod (c$, "getKernel", 
function () {
return this.kernel.clone ();
});
Clazz.defineMethod (c$, "filter", 
function (src, dst) {
if (src == null) {
throw  new NullPointerException ("src image is null");
}if (src === dst) {
throw  new IllegalArgumentException ("src image cannot be the same as the dst image");
}var needToConvert = false;
var srcCM = src.getColorModel ();
var dstCM;
var origDst = dst;
if (dst == null) {
dst = this.createCompatibleDestImage (src, null);
dstCM = srcCM;
origDst = dst;
} else {
dstCM = dst.getColorModel ();
if (srcCM.getColorSpace ().getType () != dstCM.getColorSpace ().getType ()) {
throw  new java.awt.image.ImagingOpException ("SwingJS: Differing color spaces not allowed");
}}if (sun.awt.image.ImagingLib.filter (this, src, dst) == null) {
throw  new java.awt.image.ImagingOpException ("Unable to convolve src image");
}if (origDst !== dst) {
var g = origDst.createGraphics ();
try {
(g).drawImagePriv (dst, 0, 0, null);
} finally {
g.dispose ();
}
}return origDst;
}, "java.awt.image.BufferedImage,java.awt.image.BufferedImage");
Clazz.defineMethod (c$, "filter", 
function (src, dst) {
if (dst == null) {
dst = this.createCompatibleDestRaster (src);
} else if (src === dst) {
throw  new IllegalArgumentException ("src image cannot be the same as the dst image");
} else if (src.getNumBands () != dst.getNumBands ()) {
throw  new java.awt.image.ImagingOpException ("Different number of bands in src  and dst Rasters");
}if (sun.awt.image.ImagingLib.filter (this, src, dst) == null) {
throw  new java.awt.image.ImagingOpException ("Unable to convolve src image");
}return dst;
}, "java.awt.image.Raster,java.awt.image.WritableRaster");
Clazz.overrideMethod (c$, "createCompatibleDestImage", 
function (src, destCM) {
var image;
var w = src.getWidth ();
var h = src.getHeight ();
var wr = null;
if (destCM == null) {
destCM = src.getColorModel ();
{
wr = src.getData ().createCompatibleWritableRaster (w, h);
}}if (wr == null) {
wr = destCM.createCompatibleWritableRaster (w, h);
}image =  new java.awt.image.BufferedImage (destCM, wr, destCM.isAlphaPremultiplied (), null);
return image;
}, "java.awt.image.BufferedImage,java.awt.image.ColorModel");
Clazz.overrideMethod (c$, "createCompatibleDestRaster", 
function (src) {
return src.createCompatibleWritableRaster ();
}, "java.awt.image.Raster");
Clazz.defineMethod (c$, "getBounds2D", 
function (src) {
return this.getBounds2D (src.getRaster ());
}, "java.awt.image.BufferedImage");
Clazz.defineMethod (c$, "getBounds2D", 
function (src) {
return src.getBounds ();
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
Clazz.defineStatics (c$,
"EDGE_ZERO_FILL", 0,
"EDGE_NO_OP", 1);
});
