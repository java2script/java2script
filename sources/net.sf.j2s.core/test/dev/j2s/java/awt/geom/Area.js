Clazz.declarePackage ("java.awt.geom");
Clazz.load (["java.awt.Shape", "java.awt.geom.PathIterator", "java.util.Vector"], ["java.awt.geom.AreaIterator", "$.Area"], ["java.lang.NullPointerException", "java.util.NoSuchElementException", "java.awt.geom.FlatteningPathIterator", "$.Rectangle2D", "sun.awt.geom.AreaOp", "$.Crossings", "$.Curve"], function () {
c$ = Clazz.decorateAsClass (function () {
this.curves = null;
this.cachedBounds = null;
Clazz.instantialize (this, arguments);
}, java.awt.geom, "Area", null, [java.awt.Shape, Cloneable]);
Clazz.makeConstructor (c$, 
function () {
this.curves = java.awt.geom.Area.EmptyCurves;
});
Clazz.makeConstructor (c$, 
function (s) {
if (Clazz.instanceOf (s, java.awt.geom.Area)) {
this.curves = (s).curves;
} else {
this.curves = java.awt.geom.Area.pathToCurves (s.getPathIterator (null));
}}, "java.awt.Shape");
c$.pathToCurves = Clazz.defineMethod (c$, "pathToCurves", 
 function (pi) {
var curves =  new java.util.Vector ();
var windingRule = pi.getWindingRule ();
var coords =  Clazz.newDoubleArray (23, 0);
var movx = 0;
var movy = 0;
var curx = 0;
var cury = 0;
var newx;
var newy;
while (!pi.isDone ()) {
switch (pi.currentSegment (coords)) {
case 0:
sun.awt.geom.Curve.insertLine (curves, curx, cury, movx, movy);
curx = movx = coords[0];
cury = movy = coords[1];
sun.awt.geom.Curve.insertMove (curves, movx, movy);
break;
case 1:
newx = coords[0];
newy = coords[1];
sun.awt.geom.Curve.insertLine (curves, curx, cury, newx, newy);
curx = newx;
cury = newy;
break;
case 2:
newx = coords[2];
newy = coords[3];
sun.awt.geom.Curve.insertQuad (curves, curx, cury, coords);
curx = newx;
cury = newy;
break;
case 3:
newx = coords[4];
newy = coords[5];
sun.awt.geom.Curve.insertCubic (curves, curx, cury, coords);
curx = newx;
cury = newy;
break;
case 4:
sun.awt.geom.Curve.insertLine (curves, curx, cury, movx, movy);
curx = movx;
cury = movy;
break;
}
pi.next ();
}
sun.awt.geom.Curve.insertLine (curves, curx, cury, movx, movy);
var operator;
if (windingRule == 0) {
operator =  new sun.awt.geom.AreaOp.EOWindOp ();
} else {
operator =  new sun.awt.geom.AreaOp.NZWindOp ();
}return operator.calculate (curves, java.awt.geom.Area.EmptyCurves);
}, "java.awt.geom.PathIterator");
Clazz.defineMethod (c$, "add", 
function (rhs) {
this.curves =  new sun.awt.geom.AreaOp.AddOp ().calculate (this.curves, rhs.curves);
this.invalidateBounds ();
}, "java.awt.geom.Area");
Clazz.defineMethod (c$, "subtract", 
function (rhs) {
this.curves =  new sun.awt.geom.AreaOp.SubOp ().calculate (this.curves, rhs.curves);
this.invalidateBounds ();
}, "java.awt.geom.Area");
Clazz.defineMethod (c$, "intersect", 
function (rhs) {
this.curves =  new sun.awt.geom.AreaOp.IntOp ().calculate (this.curves, rhs.curves);
this.invalidateBounds ();
}, "java.awt.geom.Area");
Clazz.defineMethod (c$, "exclusiveOr", 
function (rhs) {
this.curves =  new sun.awt.geom.AreaOp.XorOp ().calculate (this.curves, rhs.curves);
this.invalidateBounds ();
}, "java.awt.geom.Area");
Clazz.defineMethod (c$, "reset", 
function () {
this.curves =  new java.util.Vector ();
this.invalidateBounds ();
});
Clazz.defineMethod (c$, "isEmpty", 
function () {
return (this.curves.size () == 0);
});
Clazz.defineMethod (c$, "isPolygonal", 
function () {
var enum_ = this.curves.elements ();
while (enum_.hasMoreElements ()) {
if ((enum_.nextElement ()).getOrder () > 1) {
return false;
}}
return true;
});
Clazz.defineMethod (c$, "isRectangular", 
function () {
var size = this.curves.size ();
if (size == 0) {
return true;
}if (size > 3) {
return false;
}var c1 = this.curves.get (1);
var c2 = this.curves.get (2);
if (c1.getOrder () != 1 || c2.getOrder () != 1) {
return false;
}if (c1.getXTop () != c1.getXBot () || c2.getXTop () != c2.getXBot ()) {
return false;
}if (c1.getYTop () != c2.getYTop () || c1.getYBot () != c2.getYBot ()) {
return false;
}return true;
});
Clazz.defineMethod (c$, "isSingular", 
function () {
if (this.curves.size () < 3) {
return true;
}var enum_ = this.curves.elements ();
enum_.nextElement ();
while (enum_.hasMoreElements ()) {
if ((enum_.nextElement ()).getOrder () == 0) {
return false;
}}
return true;
});
Clazz.defineMethod (c$, "invalidateBounds", 
 function () {
this.cachedBounds = null;
});
Clazz.defineMethod (c$, "getCachedBounds", 
 function () {
if (this.cachedBounds != null) {
return this.cachedBounds;
}var r =  new java.awt.geom.Rectangle2D.Double ();
if (this.curves.size () > 0) {
var c = this.curves.get (0);
r.setRect (c.getX0 (), c.getY0 (), 0, 0);
for (var i = 1; i < this.curves.size (); i++) {
(this.curves.get (i)).enlarge (r);
}
}return (this.cachedBounds = r);
});
Clazz.defineMethod (c$, "getBounds2D", 
function () {
return this.getCachedBounds ().getBounds2D ();
});
Clazz.overrideMethod (c$, "getBounds", 
function () {
return this.getCachedBounds ().getBounds ();
});
Clazz.overrideMethod (c$, "clone", 
function () {
return  new java.awt.geom.Area (this);
});
Clazz.defineMethod (c$, "equals", 
function (other) {
if (other === this) {
return true;
}if (other == null) {
return false;
}var c =  new sun.awt.geom.AreaOp.XorOp ().calculate (this.curves, other.curves);
return c.isEmpty ();
}, "java.awt.geom.Area");
Clazz.defineMethod (c$, "transform", 
function (t) {
if (t == null) {
throw  new NullPointerException ("transform must not be null");
}this.curves = java.awt.geom.Area.pathToCurves (this.getPathIterator (t));
this.invalidateBounds ();
}, "java.awt.geom.AffineTransform");
Clazz.defineMethod (c$, "createTransformedArea", 
function (t) {
var a =  new java.awt.geom.Area (this);
a.transform (t);
return a;
}, "java.awt.geom.AffineTransform");
Clazz.defineMethod (c$, "contains", 
function (x, y) {
if (!this.getCachedBounds ().contains (x, y)) {
return false;
}var enum_ = this.curves.elements ();
var crossings = 0;
while (enum_.hasMoreElements ()) {
var c = enum_.nextElement ();
crossings += c.crossingsFor (x, y);
}
return ((crossings & 1) == 1);
}, "~N,~N");
Clazz.defineMethod (c$, "contains", 
function (p) {
return this.contains (p.getX (), p.getY ());
}, "java.awt.geom.Point2D");
Clazz.defineMethod (c$, "contains", 
function (x, y, w, h) {
if (w < 0 || h < 0) {
return false;
}if (!this.getCachedBounds ().contains (x, y, w, h)) {
return false;
}var c = sun.awt.geom.Crossings.findCrossings (this.curves, x, y, x + w, y + h);
return (c != null && c.covers (y, y + h));
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "contains", 
function (r) {
return this.contains (r.getX (), r.getY (), r.getWidth (), r.getHeight ());
}, "java.awt.geom.Rectangle2D");
Clazz.defineMethod (c$, "intersects", 
function (x, y, w, h) {
if (w < 0 || h < 0) {
return false;
}if (!this.getCachedBounds ().intersects (x, y, w, h)) {
return false;
}var c = sun.awt.geom.Crossings.findCrossings (this.curves, x, y, x + w, y + h);
return (c == null || !c.isEmpty ());
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "intersects", 
function (r) {
return this.intersects (r.getX (), r.getY (), r.getWidth (), r.getHeight ());
}, "java.awt.geom.Rectangle2D");
Clazz.defineMethod (c$, "getPathIterator", 
function (at) {
return  new java.awt.geom.AreaIterator (this.curves, at);
}, "java.awt.geom.AffineTransform");
Clazz.defineMethod (c$, "getPathIterator", 
function (at, flatness) {
return  new java.awt.geom.FlatteningPathIterator (this.getPathIterator (at), flatness);
}, "java.awt.geom.AffineTransform,~N");
c$.EmptyCurves = c$.prototype.EmptyCurves =  new java.util.Vector ();
c$ = Clazz.decorateAsClass (function () {
this.transform = null;
this.curves = null;
this.index = 0;
this.prevcurve = null;
this.thiscurve = null;
Clazz.instantialize (this, arguments);
}, java.awt.geom, "AreaIterator", null, java.awt.geom.PathIterator);
Clazz.makeConstructor (c$, 
function (curves, at) {
this.curves = curves;
this.transform = at;
if (curves.size () >= 1) {
this.thiscurve = curves.get (0);
}}, "java.util.Vector,java.awt.geom.AffineTransform");
Clazz.overrideMethod (c$, "getWindingRule", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "isDone", 
function () {
return (this.prevcurve == null && this.thiscurve == null);
});
Clazz.overrideMethod (c$, "next", 
function () {
if (this.prevcurve != null) {
this.prevcurve = null;
} else {
this.prevcurve = this.thiscurve;
this.index++;
if (this.index < this.curves.size ()) {
this.thiscurve = this.curves.get (this.index);
if (this.thiscurve.getOrder () != 0 && this.prevcurve.getX1 () == this.thiscurve.getX0 () && this.prevcurve.getY1 () == this.thiscurve.getY0 ()) {
this.prevcurve = null;
}} else {
this.thiscurve = null;
}}});
Clazz.defineMethod (c$, "currentSegment", 
function (coords) {
var dcoords =  Clazz.newDoubleArray (6, 0);
var segtype = this.currentSegment (dcoords);
var numpoints = (segtype == 4 ? 0 : (segtype == 2 ? 2 : (segtype == 3 ? 3 : 1)));
for (var i = 0; i < numpoints * 2; i++) {
coords[i] = dcoords[i];
}
return segtype;
}, "~A");
Clazz.defineMethod (c$, "currentSegment", 
function (coords) {
var segtype;
var numpoints;
if (this.prevcurve != null) {
if (this.thiscurve == null || this.thiscurve.getOrder () == 0) {
return 4;
}coords[0] = this.thiscurve.getX0 ();
coords[1] = this.thiscurve.getY0 ();
segtype = 1;
numpoints = 1;
} else if (this.thiscurve == null) {
throw  new java.util.NoSuchElementException ("area iterator out of bounds");
} else {
segtype = this.thiscurve.getSegment (coords);
numpoints = this.thiscurve.getOrder ();
if (numpoints == 0) {
numpoints = 1;
}}if (this.transform != null) {
this.transform.transform (coords, 0, coords, 0, numpoints);
}return segtype;
}, "~A");
});
