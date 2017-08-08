Clazz.declarePackage ("java.awt");
Clazz.load (["java.awt.PaintContext"], "java.awt.ColorPaintContext", ["java.awt.image.ColorModel"], function () {
c$ = Clazz.decorateAsClass (function () {
this.color = 0;
Clazz.instantialize (this, arguments);
}, java.awt, "ColorPaintContext", null, java.awt.PaintContext);
Clazz.makeConstructor (c$, 
function (color, cm) {
this.color = color;
}, "~N,java.awt.image.ColorModel");
Clazz.overrideMethod (c$, "dispose", 
function () {
});
Clazz.defineMethod (c$, "getRGB", 
function () {
return this.color;
});
Clazz.overrideMethod (c$, "getColorModel", 
function () {
return java.awt.image.ColorModel.getRGBdefault ();
});
});
