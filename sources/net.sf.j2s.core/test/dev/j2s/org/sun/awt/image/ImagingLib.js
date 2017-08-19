Clazz.declarePackage ("sun.awt.image");
Clazz.load (null, "sun.awt.image.ImagingLib", ["swingjs.JSToolkit"], function () {
c$ = Clazz.declareType (sun.awt.image, "ImagingLib");
c$.filter = Clazz.defineMethod (c$, "filter", 
function (op, src, dst) {
if (dst == null) {
dst = op.createCompatibleDestRaster (src);
}return swingjs.JSToolkit.filterRaster (src, dst, op);
}, "java.awt.image.RasterOp,java.awt.image.Raster,java.awt.image.WritableRaster");
c$.filter = Clazz.defineMethod (c$, "filter", 
function (op, src, dst) {
if (sun.awt.image.ImagingLib.verbose) {
System.out.println ("in filter and op is " + op + "bufimage is " + src + " and " + dst);
}if (dst == null) {
dst = op.createCompatibleDestImage (src, null);
}return swingjs.JSToolkit.filterImage (src, dst, op);
}, "java.awt.image.BufferedImageOp,java.awt.image.BufferedImage,java.awt.image.BufferedImage");
Clazz.defineStatics (c$,
"verbose", false,
"NUM_NATIVE_OPS", 3,
"LOOKUP_OP", 0,
"AFFINE_OP", 1,
"CONVOLVE_OP", 2);
});
