Clazz.declarePackage ("java.awt.geom");
Clazz.load (["java.awt.geom.PathIterator"], "java.awt.geom.RoundRectIterator", ["java.util.NoSuchElementException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.x = 0;
this.y = 0;
this.w = 0;
this.h = 0;
this.aw = 0;
this.ah = 0;
this.affine = null;
this.index = 0;
Clazz.instantialize (this, arguments);
}, java.awt.geom, "RoundRectIterator", null, java.awt.geom.PathIterator);
Clazz.makeConstructor (c$, 
function (rr, at) {
this.x = rr.getX ();
this.y = rr.getY ();
this.w = rr.getWidth ();
this.h = rr.getHeight ();
this.aw = Math.min (this.w, Math.abs (rr.getArcWidth ()));
this.ah = Math.min (this.h, Math.abs (rr.getArcHeight ()));
this.affine = at;
if (this.aw < 0 || this.ah < 0) {
this.index = java.awt.geom.RoundRectIterator.ctrlpts.length;
}}, "java.awt.geom.RoundRectangle2D,java.awt.geom.AffineTransform");
Clazz.overrideMethod (c$, "getWindingRule", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "isDone", 
function () {
return this.index >= java.awt.geom.RoundRectIterator.ctrlpts.length;
});
Clazz.overrideMethod (c$, "next", 
function () {
this.index++;
});
Clazz.defineMethod (c$, "currentSegment", 
function (coords) {
if (this.isDone ()) {
throw  new java.util.NoSuchElementException ("roundrect iterator out of bounds");
}var ctrls = java.awt.geom.RoundRectIterator.ctrlpts[this.index];
var nc = 0;
for (var i = 0; i < ctrls.length; i += 4) {
coords[nc++] = (this.x + ctrls[i + 0] * this.w + ctrls[i + 1] * this.aw);
coords[nc++] = (this.y + ctrls[i + 2] * this.h + ctrls[i + 3] * this.ah);
}
if (this.affine != null) {
this.affine.transform (coords, 0, coords, 0, Clazz.doubleToInt (nc / 2));
}return java.awt.geom.RoundRectIterator.types[this.index];
}, "~A");
Clazz.defineMethod (c$, "currentSegment", 
function (coords) {
if (this.isDone ()) {
throw  new java.util.NoSuchElementException ("roundrect iterator out of bounds");
}var ctrls = java.awt.geom.RoundRectIterator.ctrlpts[this.index];
var nc = 0;
for (var i = 0; i < ctrls.length; i += 4) {
coords[nc++] = (this.x + ctrls[i + 0] * this.w + ctrls[i + 1] * this.aw);
coords[nc++] = (this.y + ctrls[i + 2] * this.h + ctrls[i + 3] * this.ah);
}
if (this.affine != null) {
this.affine.transform (coords, 0, coords, 0, Clazz.doubleToInt (nc / 2));
}return java.awt.geom.RoundRectIterator.types[this.index];
}, "~A");
Clazz.defineStatics (c$,
"angle", 0.7853981633974483);
c$.a = c$.prototype.a = 1.0 - Math.cos (0.7853981633974483);
c$.b = c$.prototype.b = Math.tan (0.7853981633974483);
c$.c = c$.prototype.c = Math.sqrt (1.0 + java.awt.geom.RoundRectIterator.b * java.awt.geom.RoundRectIterator.b) - 1 + java.awt.geom.RoundRectIterator.a;
c$.cv = c$.prototype.cv = 1.3333333333333333 * java.awt.geom.RoundRectIterator.a * java.awt.geom.RoundRectIterator.b / java.awt.geom.RoundRectIterator.c;
c$.acv = c$.prototype.acv = (1.0 - java.awt.geom.RoundRectIterator.cv) / 2.0;
c$.ctrlpts = c$.prototype.ctrlpts =  Clazz.newArray (-1, [ Clazz.newDoubleArray (-1, [0.0, 0.0, 0.0, 0.5]),  Clazz.newDoubleArray (-1, [0.0, 0.0, 1.0, -0.5]),  Clazz.newDoubleArray (-1, [0.0, 0.0, 1.0, -java.awt.geom.RoundRectIterator.acv, 0.0, java.awt.geom.RoundRectIterator.acv, 1.0, 0.0, 0.0, 0.5, 1.0, 0.0]),  Clazz.newDoubleArray (-1, [1.0, -0.5, 1.0, 0.0]),  Clazz.newDoubleArray (-1, [1.0, -java.awt.geom.RoundRectIterator.acv, 1.0, 0.0, 1.0, 0.0, 1.0, -java.awt.geom.RoundRectIterator.acv, 1.0, 0.0, 1.0, -0.5]),  Clazz.newDoubleArray (-1, [1.0, 0.0, 0.0, 0.5]),  Clazz.newDoubleArray (-1, [1.0, 0.0, 0.0, java.awt.geom.RoundRectIterator.acv, 1.0, -java.awt.geom.RoundRectIterator.acv, 0.0, 0.0, 1.0, -0.5, 0.0, 0.0]),  Clazz.newDoubleArray (-1, [0.0, 0.5, 0.0, 0.0]),  Clazz.newDoubleArray (-1, [0.0, java.awt.geom.RoundRectIterator.acv, 0.0, 0.0, 0.0, 0.0, 0.0, java.awt.geom.RoundRectIterator.acv, 0.0, 0.0, 0.0, 0.5]),  Clazz.newDoubleArray (-1, [])]);
Clazz.defineStatics (c$,
"types",  Clazz.newIntArray (-1, [0, 1, 3, 1, 3, 1, 3, 1, 3, 4]));
});
