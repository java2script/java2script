Clazz.declarePackage ("java.awt.geom");
Clazz.load (["java.awt.geom.PathIterator"], "java.awt.geom.EllipseIterator", ["java.util.NoSuchElementException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.x = 0;
this.y = 0;
this.w = 0;
this.h = 0;
this.affine = null;
this.index = 0;
Clazz.instantialize (this, arguments);
}, java.awt.geom, "EllipseIterator", null, java.awt.geom.PathIterator);
Clazz.makeConstructor (c$, 
function (e, at) {
this.x = e.getX ();
this.y = e.getY ();
this.w = e.getWidth ();
this.h = e.getHeight ();
this.affine = at;
if (this.w < 0 || this.h < 0) {
this.index = 6;
}}, "java.awt.geom.Ellipse2D,java.awt.geom.AffineTransform");
Clazz.overrideMethod (c$, "getWindingRule", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "isDone", 
function () {
return this.index > 5;
});
Clazz.overrideMethod (c$, "next", 
function () {
this.index++;
});
Clazz.defineMethod (c$, "currentSegment", 
function (coords) {
if (this.isDone ()) {
throw  new java.util.NoSuchElementException ("ellipse iterator out of bounds");
}if (this.index == 5) {
return 4;
}if (this.index == 0) {
var ctrls = java.awt.geom.EllipseIterator.ctrlpts[3];
coords[0] = (this.x + ctrls[4] * this.w);
coords[1] = (this.y + ctrls[5] * this.h);
if (this.affine != null) {
this.affine.transform (coords, 0, coords, 0, 1);
}return 0;
}var ctrls = java.awt.geom.EllipseIterator.ctrlpts[this.index - 1];
coords[0] = (this.x + ctrls[0] * this.w);
coords[1] = (this.y + ctrls[1] * this.h);
coords[2] = (this.x + ctrls[2] * this.w);
coords[3] = (this.y + ctrls[3] * this.h);
coords[4] = (this.x + ctrls[4] * this.w);
coords[5] = (this.y + ctrls[5] * this.h);
if (this.affine != null) {
this.affine.transform (coords, 0, coords, 0, 3);
}return 3;
}, "~A");
Clazz.defineMethod (c$, "currentSegment", 
function (coords) {
if (this.isDone ()) {
throw  new java.util.NoSuchElementException ("ellipse iterator out of bounds");
}if (this.index == 5) {
return 4;
}if (this.index == 0) {
var ctrls = java.awt.geom.EllipseIterator.ctrlpts[3];
coords[0] = this.x + ctrls[4] * this.w;
coords[1] = this.y + ctrls[5] * this.h;
if (this.affine != null) {
this.affine.transform (coords, 0, coords, 0, 1);
}return 0;
}var ctrls = java.awt.geom.EllipseIterator.ctrlpts[this.index - 1];
coords[0] = this.x + ctrls[0] * this.w;
coords[1] = this.y + ctrls[1] * this.h;
coords[2] = this.x + ctrls[2] * this.w;
coords[3] = this.y + ctrls[3] * this.h;
coords[4] = this.x + ctrls[4] * this.w;
coords[5] = this.y + ctrls[5] * this.h;
if (this.affine != null) {
this.affine.transform (coords, 0, coords, 0, 3);
}return 3;
}, "~A");
Clazz.defineStatics (c$,
"CtrlVal", 0.5522847498307933,
"pcv", 0.7761423749153966,
"ncv", 0.22385762508460333,
"ctrlpts",  Clazz.newArray (-1, [ Clazz.newDoubleArray (-1, [1.0, 0.7761423749153966, 0.7761423749153966, 1.0, 0.5, 1.0]),  Clazz.newDoubleArray (-1, [0.22385762508460333, 1.0, 0.0, 0.7761423749153966, 0.0, 0.5]),  Clazz.newDoubleArray (-1, [0.0, 0.22385762508460333, 0.22385762508460333, 0.0, 0.5, 0.0]),  Clazz.newDoubleArray (-1, [0.7761423749153966, 0.0, 1.0, 0.22385762508460333, 1.0, 0.5])]));
});
