Clazz.declarePackage ("java.awt");
Clazz.load (["java.awt.Shape", "java.awt.geom.PathIterator"], "java.awt.Polygon", ["java.lang.IndexOutOfBoundsException", "$.NegativeArraySizeException", "java.util.Arrays", "java.awt.Rectangle", "sun.awt.geom.Crossings"], function () {
c$ = Clazz.decorateAsClass (function () {
this.npoints = 0;
this.xpoints = null;
this.ypoints = null;
this.bounds = null;
if (!Clazz.isClassDefined ("java.awt.Polygon.PolygonPathIterator")) {
java.awt.Polygon.$Polygon$PolygonPathIterator$ ();
}
Clazz.instantialize (this, arguments);
}, java.awt, "Polygon", null, java.awt.Shape);
Clazz.makeConstructor (c$, 
function () {
this.xpoints =  Clazz.newIntArray (4, 0);
this.ypoints =  Clazz.newIntArray (4, 0);
});
Clazz.makeConstructor (c$, 
function (xpoints, ypoints, npoints) {
if (npoints > xpoints.length || npoints > ypoints.length) {
throw  new IndexOutOfBoundsException ("npoints > xpoints.length || npoints > ypoints.length");
}if (npoints < 0) {
throw  new NegativeArraySizeException ("npoints < 0");
}this.npoints = npoints;
this.xpoints = java.util.Arrays.copyOf (xpoints, npoints);
this.ypoints = java.util.Arrays.copyOf (ypoints, npoints);
}, "~A,~A,~N");
Clazz.defineMethod (c$, "reset", 
function () {
this.npoints = 0;
this.bounds = null;
});
Clazz.defineMethod (c$, "invalidate", 
function () {
this.bounds = null;
});
Clazz.defineMethod (c$, "translate", 
function (deltaX, deltaY) {
for (var i = 0; i < this.npoints; i++) {
this.xpoints[i] += deltaX;
this.ypoints[i] += deltaY;
}
if (this.bounds != null) {
this.bounds.translate (deltaX, deltaY);
}}, "~N,~N");
Clazz.defineMethod (c$, "calculateBounds", 
function (xpoints, ypoints, npoints) {
var boundsMinX = 2147483647;
var boundsMinY = 2147483647;
var boundsMaxX = -2147483648;
var boundsMaxY = -2147483648;
for (var i = 0; i < npoints; i++) {
var x = xpoints[i];
boundsMinX = Math.min (boundsMinX, x);
boundsMaxX = Math.max (boundsMaxX, x);
var y = ypoints[i];
boundsMinY = Math.min (boundsMinY, y);
boundsMaxY = Math.max (boundsMaxY, y);
}
this.bounds =  new java.awt.Rectangle (boundsMinX, boundsMinY, boundsMaxX - boundsMinX, boundsMaxY - boundsMinY);
}, "~A,~A,~N");
Clazz.defineMethod (c$, "updateBounds", 
function (x, y) {
if (x < this.bounds.x) {
this.bounds.width = this.bounds.width + (this.bounds.x - x);
this.bounds.x = x;
} else {
this.bounds.width = Math.max (this.bounds.width, x - this.bounds.x);
}if (y < this.bounds.y) {
this.bounds.height = this.bounds.height + (this.bounds.y - y);
this.bounds.y = y;
} else {
this.bounds.height = Math.max (this.bounds.height, y - this.bounds.y);
}}, "~N,~N");
Clazz.defineMethod (c$, "addPoint", 
function (x, y) {
if (this.npoints >= this.xpoints.length || this.npoints >= this.ypoints.length) {
var newLength = this.npoints * 2;
if (newLength < 4) {
newLength = 4;
} else if ((newLength & (newLength - 1)) != 0) {
newLength = Integer.highestOneBit (newLength);
}this.xpoints = java.util.Arrays.copyOf (this.xpoints, newLength);
this.ypoints = java.util.Arrays.copyOf (this.ypoints, newLength);
}this.xpoints[this.npoints] = x;
this.ypoints[this.npoints] = y;
this.npoints++;
if (this.bounds != null) {
this.updateBounds (x, y);
}}, "~N,~N");
Clazz.overrideMethod (c$, "getBounds", 
function () {
return this.getBoundingBox ();
});
Clazz.defineMethod (c$, "getBoundingBox", 
function () {
if (this.npoints == 0) {
return  new java.awt.Rectangle ();
}if (this.bounds == null) {
this.calculateBounds (this.xpoints, this.ypoints, this.npoints);
}return this.bounds.getBounds ();
});
Clazz.defineMethod (c$, "contains", 
function (p) {
return this.contains (p.x, p.y);
}, "java.awt.Point");
Clazz.defineMethod (c$, "contains", 
function (x, y) {
return this.contains (x, y);
}, "~N,~N");
Clazz.defineMethod (c$, "inside", 
function (x, y) {
return this.contains (x, y);
}, "~N,~N");
Clazz.overrideMethod (c$, "getBounds2D", 
function () {
return this.getBounds ();
});
Clazz.defineMethod (c$, "contains", 
function (x, y) {
if (this.npoints <= 2 || !this.getBoundingBox ().contains (x, y)) {
return false;
}var hits = 0;
var lastx = this.xpoints[this.npoints - 1];
var lasty = this.ypoints[this.npoints - 1];
var curx;
var cury;
for (var i = 0; i < this.npoints; lastx = curx, lasty = cury, i++) {
curx = this.xpoints[i];
cury = this.ypoints[i];
if (cury == lasty) {
continue;
}var leftx;
if (curx < lastx) {
if (x >= lastx) {
continue;
}leftx = curx;
} else {
if (x >= curx) {
continue;
}leftx = lastx;
}var test1;
var test2;
if (cury < lasty) {
if (y < cury || y >= lasty) {
continue;
}if (x < leftx) {
hits++;
continue;
}test1 = x - curx;
test2 = y - cury;
} else {
if (y < lasty || y >= cury) {
continue;
}if (x < leftx) {
hits++;
continue;
}test1 = x - lastx;
test2 = y - lasty;
}if (test1 < (test2 / (lasty - cury) * (lastx - curx))) {
hits++;
}}
return ((hits & 1) != 0);
}, "~N,~N");
Clazz.defineMethod (c$, "getCrossings", 
 function (xlo, ylo, xhi, yhi) {
var cross =  new sun.awt.geom.Crossings.EvenOdd (xlo, ylo, xhi, yhi);
var lastx = this.xpoints[this.npoints - 1];
var lasty = this.ypoints[this.npoints - 1];
var curx;
var cury;
for (var i = 0; i < this.npoints; i++) {
curx = this.xpoints[i];
cury = this.ypoints[i];
if (cross.accumulateLine (lastx, lasty, curx, cury)) {
return null;
}lastx = curx;
lasty = cury;
}
return cross;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "contains", 
function (p) {
return this.contains (p.getX (), p.getY ());
}, "java.awt.geom.Point2D");
Clazz.defineMethod (c$, "intersects", 
function (x, y, w, h) {
if (this.npoints <= 0 || !this.getBoundingBox ().intersects (x, y, w, h)) {
return false;
}var cross = this.getCrossings (x, y, x + w, y + h);
return (cross == null || !cross.isEmpty ());
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "intersects", 
function (r) {
return this.intersects (r.getX (), r.getY (), r.getWidth (), r.getHeight ());
}, "java.awt.geom.Rectangle2D");
Clazz.defineMethod (c$, "contains", 
function (x, y, w, h) {
if (this.npoints <= 0 || !this.getBoundingBox ().intersects (x, y, w, h)) {
return false;
}var cross = this.getCrossings (x, y, x + w, y + h);
return (cross != null && cross.covers (y, y + h));
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "contains", 
function (r) {
return this.contains (r.getX (), r.getY (), r.getWidth (), r.getHeight ());
}, "java.awt.geom.Rectangle2D");
Clazz.defineMethod (c$, "getPathIterator", 
function (at) {
return Clazz.innerTypeInstance (java.awt.Polygon.PolygonPathIterator, this, null, this, at);
}, "java.awt.geom.AffineTransform");
Clazz.defineMethod (c$, "getPathIterator", 
function (at, flatness) {
return this.getPathIterator (at);
}, "java.awt.geom.AffineTransform,~N");
c$.$Polygon$PolygonPathIterator$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.poly = null;
this.transform = null;
this.index = 0;
Clazz.instantialize (this, arguments);
}, java.awt.Polygon, "PolygonPathIterator", null, java.awt.geom.PathIterator);
Clazz.makeConstructor (c$, 
function (a, b) {
this.poly = a;
this.transform = b;
if (a.npoints == 0) {
this.index = 1;
}}, "java.awt.Polygon,java.awt.geom.AffineTransform");
Clazz.overrideMethod (c$, "getWindingRule", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "isDone", 
function () {
return this.index > this.poly.npoints;
});
Clazz.overrideMethod (c$, "next", 
function () {
this.index++;
});
Clazz.defineMethod (c$, "currentSegment", 
function (a) {
if (this.index >= this.poly.npoints) {
return 4;
}a[0] = this.poly.xpoints[this.index];
a[1] = this.poly.ypoints[this.index];
if (this.transform != null) {
this.transform.transform (a, 0, a, 0, 1);
}return (this.index == 0 ? 0 : 1);
}, "~A");
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"MIN_LENGTH", 4);
});
