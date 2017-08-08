Clazz.declarePackage ("java.awt.font");
Clazz.load (null, "java.awt.font.GraphicAttribute", ["java.lang.IllegalArgumentException", "java.awt.geom.Rectangle2D"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fAlignment = 0;
Clazz.instantialize (this, arguments);
}, java.awt.font, "GraphicAttribute");
Clazz.makeConstructor (c$, 
function (alignment) {
if (alignment < -2 || alignment > 2) {
throw  new IllegalArgumentException ("bad alignment");
}this.fAlignment = alignment;
}, "~N");
Clazz.defineMethod (c$, "getBounds", 
function () {
var ascent = this.getAscent ();
return  new java.awt.geom.Rectangle2D.Float (0, -ascent, this.getAdvance (), ascent + this.getDescent ());
});
Clazz.defineMethod (c$, "getAlignment", 
function () {
return this.fAlignment;
});
Clazz.defineStatics (c$,
"TOP_ALIGNMENT", -1,
"BOTTOM_ALIGNMENT", -2,
"ROMAN_BASELINE", 0,
"CENTER_BASELINE", 1,
"HANGING_BASELINE", 2);
});
