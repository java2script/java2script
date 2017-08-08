Clazz.declarePackage ("java.awt.geom");
Clazz.load (["java.awt.geom.PathIterator"], "java.awt.geom.QuadIterator", ["java.util.NoSuchElementException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.quad = null;
this.affine = null;
this.index = 0;
Clazz.instantialize (this, arguments);
}, java.awt.geom, "QuadIterator", null, java.awt.geom.PathIterator);
Clazz.makeConstructor (c$, 
function (q, at) {
this.quad = q;
this.affine = at;
}, "java.awt.geom.QuadCurve2D,java.awt.geom.AffineTransform");
Clazz.overrideMethod (c$, "getWindingRule", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "isDone", 
function () {
return (this.index > 1);
});
Clazz.overrideMethod (c$, "next", 
function () {
this.index++;
});
Clazz.defineMethod (c$, "currentSegment", 
function (coords) {
if (this.isDone ()) {
throw  new java.util.NoSuchElementException ("quad iterator iterator out of bounds");
}var type;
if (this.index == 0) {
coords[0] = this.quad.getX1 ();
coords[1] = this.quad.getY1 ();
type = 0;
} else {
coords[0] = this.quad.getCtrlX ();
coords[1] = this.quad.getCtrlY ();
coords[2] = this.quad.getX2 ();
coords[3] = this.quad.getY2 ();
type = 2;
}if (this.affine != null) {
this.affine.transform (coords, 0, coords, 0, this.index == 0 ? 1 : 2);
}return type;
}, "~A");
Clazz.defineMethod (c$, "currentSegment", 
function (coords) {
if (this.isDone ()) {
throw  new java.util.NoSuchElementException ("quad iterator iterator out of bounds");
}var type;
if (this.index == 0) {
coords[0] = this.quad.getX1 ();
coords[1] = this.quad.getY1 ();
type = 0;
} else {
coords[0] = this.quad.getCtrlX ();
coords[1] = this.quad.getCtrlY ();
coords[2] = this.quad.getX2 ();
coords[3] = this.quad.getY2 ();
type = 2;
}if (this.affine != null) {
this.affine.transform (coords, 0, coords, 0, this.index == 0 ? 1 : 2);
}return type;
}, "~A");
});
