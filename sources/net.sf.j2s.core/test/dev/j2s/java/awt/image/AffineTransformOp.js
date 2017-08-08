Clazz.declarePackage ("java.awt.image");
Clazz.load (["java.awt.image.BufferedImageOp", "$.RasterOp"], "java.awt.image.AffineTransformOp", ["java.lang.IllegalArgumentException", "$.InternalError", "$.NullPointerException", "java.awt.AlphaComposite", "$.RenderingHints", "java.awt.geom.Rectangle2D", "java.awt.image.BufferedImage", "$.ImagingOpException", "$.RasterFormatException", "sun.awt.image.ImagingLib"], function () {
c$ = Clazz.decorateAsClass (function () {
this.xform = null;
this.hints = null;
this.swingJStype = 'A';
this.interpolationType = 1;
Clazz.instantialize (this, arguments);
}, java.awt.image, "AffineTransformOp", null, [java.awt.image.BufferedImageOp, java.awt.image.RasterOp]);
Clazz.makeConstructor (c$, 
function (xform, hints) {
this.validateTransform (xform);
this.xform = xform.clone ();
this.hints = hints;
if (hints != null) {
var value = hints.get (java.awt.RenderingHints.KEY_INTERPOLATION);
if (value == null) {
value = hints.get (java.awt.RenderingHints.KEY_RENDERING);
if (value === java.awt.RenderingHints.VALUE_RENDER_SPEED) {
this.interpolationType = 1;
} else if (value === java.awt.RenderingHints.VALUE_RENDER_QUALITY) {
this.interpolationType = 2;
}} else if (value === java.awt.RenderingHints.VALUE_INTERPOLATION_NEAREST_NEIGHBOR) {
this.interpolationType = 1;
} else if (value === java.awt.RenderingHints.VALUE_INTERPOLATION_BILINEAR) {
this.interpolationType = 2;
} else if (value === java.awt.RenderingHints.VALUE_INTERPOLATION_BICUBIC) {
this.interpolationType = 3;
}} else {
this.interpolationType = 1;
}}, "java.awt.geom.AffineTransform,java.awt.RenderingHints");
Clazz.makeConstructor (c$, 
function (xform, interpolationType) {
this.validateTransform (xform);
this.xform = xform.clone ();
switch (interpolationType) {
case 1:
case 2:
case 3:
break;
default:
throw  new IllegalArgumentException ("Unknown interpolation type: " + interpolationType);
}
this.interpolationType = interpolationType;
}, "java.awt.geom.AffineTransform,~N");
Clazz.defineMethod (c$, "getInterpolationType", 
function () {
return this.interpolationType;
});
Clazz.defineMethod (c$, "filter", 
function (src, dst) {
if (src == null) {
throw  new NullPointerException ("src image is null");
}if (src === dst) {
throw  new IllegalArgumentException ("src image cannot be the same as the dst image");
}var srcCM = src.getColorModel ();
var dstCM;
var origDst = dst;
if (dst == null) {
dst = this.createCompatibleDestImage (src, null);
dstCM = srcCM;
origDst = dst;
} else {
dstCM = dst.getColorModel ();
if (srcCM.getColorSpace ().getType () != dstCM.getColorSpace ().getType ()) {
throw  new java.awt.image.ImagingOpException ("SwingJS: Unable to transform src image");
}}if (sun.awt.image.ImagingLib.filter (this, src, dst) == null) {
dst = src;
System.out.println ("Unable to transform src image");
}if (origDst !== dst) {
var g = origDst.createGraphics ();
try {
g.setComposite (java.awt.AlphaComposite.Src);
(g).drawImagePriv (dst, 0, 0, null);
} finally {
g.dispose ();
}
}return origDst;
}, "java.awt.image.BufferedImage,java.awt.image.BufferedImage");
Clazz.defineMethod (c$, "filter", 
function (src, dst) {
if (src == null) {
throw  new NullPointerException ("src image is null");
}if (dst == null) {
dst = this.createCompatibleDestRaster (src);
}if (src === dst) {
throw  new IllegalArgumentException ("src image cannot be the same as the dst image");
}if (src.getNumBands () != dst.getNumBands ()) {
throw  new IllegalArgumentException ("Number of src bands (" + src.getNumBands () + ") does not match number of " + " dst bands (" + dst.getNumBands () + ")");
}if (sun.awt.image.ImagingLib.filter (this, src, dst) == null) {
throw  new java.awt.image.ImagingOpException ("Unable to transform src image");
}return dst;
}, "java.awt.image.Raster,java.awt.image.WritableRaster");
Clazz.defineMethod (c$, "getBounds2D", 
function (src) {
return this.getBounds2D (src.getRaster ());
}, "java.awt.image.BufferedImage");
Clazz.defineMethod (c$, "getBounds2D", 
function (src) {
var w = src.getWidth ();
var h = src.getHeight ();
var pts =  Clazz.newFloatArray (-1, [0, 0, w, 0, w, h, 0, h]);
this.xform.transform (pts, 0, pts, 0, 4);
var fmaxX = pts[0];
var fmaxY = pts[1];
var fminX = pts[0];
var fminY = pts[1];
for (var i = 2; i < 8; i += 2) {
if (pts[i] > fmaxX) {
fmaxX = pts[i];
} else if (pts[i] < fminX) {
fminX = pts[i];
}if (pts[i + 1] > fmaxY) {
fmaxY = pts[i + 1];
} else if (pts[i + 1] < fminY) {
fminY = pts[i + 1];
}}
return  new java.awt.geom.Rectangle2D.Float (fminX, fminY, fmaxX - fminX, fmaxY - fminY);
}, "java.awt.image.Raster");
Clazz.overrideMethod (c$, "createCompatibleDestImage", 
function (src, destCM) {
var image;
var r = this.getBounds2D (src).getBounds ();
var w = r.x + r.width;
var h = r.y + r.height;
if (w <= 0) {
throw  new java.awt.image.RasterFormatException ("Transformed width (" + w + ") is less than or equal to 0.");
}if (h <= 0) {
throw  new java.awt.image.RasterFormatException ("Transformed height (" + h + ") is less than or equal to 0.");
}if (destCM == null) {
var cm = src.getColorModel ();
if (this.interpolationType != 1 && (cm.getTransparency () == 1)) {
image =  new java.awt.image.BufferedImage (w, h, 2);
} else {
image =  new java.awt.image.BufferedImage (cm, src.getRaster ().createCompatibleWritableRaster (w, h), cm.isAlphaPremultiplied (), null);
}} else {
image =  new java.awt.image.BufferedImage (destCM, destCM.createCompatibleWritableRaster (w, h), destCM.isAlphaPremultiplied (), null);
}return image;
}, "java.awt.image.BufferedImage,java.awt.image.ColorModel");
Clazz.overrideMethod (c$, "createCompatibleDestRaster", 
function (src) {
var r = this.getBounds2D (src);
return src.createCompatibleWritableRaster (Clazz.doubleToInt (r.getX ()), Clazz.doubleToInt (r.getY ()), Clazz.doubleToInt (r.getWidth ()), Clazz.doubleToInt (r.getHeight ()));
}, "java.awt.image.Raster");
Clazz.overrideMethod (c$, "getPoint2D", 
function (srcPt, dstPt) {
return this.xform.transform (srcPt, dstPt);
}, "java.awt.geom.Point2D,java.awt.geom.Point2D");
Clazz.defineMethod (c$, "getTransform", 
function () {
return this.xform.clone ();
});
Clazz.overrideMethod (c$, "getRenderingHints", 
function () {
if (this.hints == null) {
var val;
switch (this.interpolationType) {
case 1:
val = java.awt.RenderingHints.VALUE_INTERPOLATION_NEAREST_NEIGHBOR;
break;
case 2:
val = java.awt.RenderingHints.VALUE_INTERPOLATION_BILINEAR;
break;
case 3:
val = java.awt.RenderingHints.VALUE_INTERPOLATION_BICUBIC;
break;
default:
throw  new InternalError ("Unknown interpolation type " + this.interpolationType);
}
this.hints =  new java.awt.RenderingHints (java.awt.RenderingHints.KEY_INTERPOLATION, val);
}return this.hints;
});
Clazz.defineMethod (c$, "validateTransform", 
function (xform) {
if (Math.abs (xform.getDeterminant ()) <= 4.9E-324) {
throw  new java.awt.image.ImagingOpException ("Unable to invert transform " + xform);
}}, "java.awt.geom.AffineTransform");
Clazz.defineStatics (c$,
"TYPE_NEAREST_NEIGHBOR", 1,
"TYPE_BILINEAR", 2,
"TYPE_BICUBIC", 3);
});
