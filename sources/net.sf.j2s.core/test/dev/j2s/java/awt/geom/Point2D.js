Clazz.declarePackage ("java.awt.geom");
Clazz.load (null, "java.awt.geom.Point2D", ["java.lang.Double"], function () {
c$ = Clazz.declareType (java.awt.geom, "Point2D", null, Cloneable);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "setLocation", 
function (p) {
this.setLocation (p.getX (), p.getY ());
}, "java.awt.geom.Point2D");
c$.distanceSq = Clazz.defineMethod (c$, "distanceSq", 
function (x1, y1, x2, y2) {
x1 -= x2;
y1 -= y2;
return (x1 * x1 + y1 * y1);
}, "~N,~N,~N,~N");
c$.distance = Clazz.defineMethod (c$, "distance", 
function (x1, y1, x2, y2) {
x1 -= x2;
y1 -= y2;
return Math.sqrt (x1 * x1 + y1 * y1);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "distanceSq", 
function (px, py) {
px -= this.getX ();
py -= this.getY ();
return (px * px + py * py);
}, "~N,~N");
Clazz.defineMethod (c$, "distanceSq", 
function (pt) {
var px = pt.getX () - this.getX ();
var py = pt.getY () - this.getY ();
return (px * px + py * py);
}, "java.awt.geom.Point2D");
Clazz.defineMethod (c$, "distance", 
function (px, py) {
px -= this.getX ();
py -= this.getY ();
return Math.sqrt (px * px + py * py);
}, "~N,~N");
Clazz.defineMethod (c$, "distance", 
function (pt) {
var px = pt.getX () - this.getX ();
var py = pt.getY () - this.getY ();
return Math.sqrt (px * px + py * py);
}, "java.awt.geom.Point2D");
Clazz.overrideMethod (c$, "hashCode", 
function () {
var bits = java.lang.Double.doubleToLongBits (this.getX ());
bits ^= java.lang.Double.doubleToLongBits (this.getY ()) * 31;
return ((bits) ^ ((bits >> 32)));
});
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.x = 0;
this.y = 0;
Clazz.instantialize (this, arguments);
}, java.awt.geom.Point2D, "Float", java.awt.geom.Point2D);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.awt.geom.Point2D.Float, []);
});
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, java.awt.geom.Point2D.Float, []);
this.x = a;
this.y = b;
}, "~N,~N");
Clazz.overrideMethod (c$, "getX", 
function () {
return this.x;
});
Clazz.overrideMethod (c$, "getY", 
function () {
return this.y;
});
Clazz.defineMethod (c$, "setLocation", 
function (a, b) {
this.x = a;
this.y = b;
}, "~N,~N");
Clazz.defineMethod (c$, "setLocation", 
function (a, b) {
this.x = a;
this.y = b;
}, "~N,~N");
Clazz.overrideMethod (c$, "toString", 
function () {
return "Point2D.Float[" + this.x + ", " + this.y + "]";
});
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.x = 0;
this.y = 0;
Clazz.instantialize (this, arguments);
}, java.awt.geom.Point2D, "Double", java.awt.geom.Point2D);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.awt.geom.Point2D.Double, []);
});
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, java.awt.geom.Point2D.Double, []);
this.x = a;
this.y = b;
}, "~N,~N");
Clazz.overrideMethod (c$, "getX", 
function () {
return this.x;
});
Clazz.overrideMethod (c$, "getY", 
function () {
return this.y;
});
Clazz.defineMethod (c$, "setLocation", 
function (a, b) {
this.x = a;
this.y = b;
}, "~N,~N");
Clazz.overrideMethod (c$, "toString", 
function () {
return "Point2D.Double[" + this.x + ", " + this.y + "]";
});
c$ = Clazz.p0p ();
});
