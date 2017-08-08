Clazz.declarePackage ("java.awt.geom");
Clazz.load (["java.awt.geom.RectangularShape"], "java.awt.geom.RoundRectangle2D", ["java.lang.Double", "java.awt.geom.Rectangle2D", "$.RoundRectIterator"], function () {
c$ = Clazz.declareType (java.awt.geom, "RoundRectangle2D", java.awt.geom.RectangularShape);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.awt.geom.RoundRectangle2D, []);
});
Clazz.defineMethod (c$, "setRoundRect", 
function (rr) {
this.setRoundRect (rr.getX (), rr.getY (), rr.getWidth (), rr.getHeight (), rr.getArcWidth (), rr.getArcHeight ());
}, "java.awt.geom.RoundRectangle2D");
Clazz.defineMethod (c$, "setFrame", 
function (x, y, w, h) {
this.setRoundRect (x, y, w, h, this.getArcWidth (), this.getArcHeight ());
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "contains", 
function (x, y) {
if (this.isEmpty ()) {
return false;
}var rrx0 = this.getX ();
var rry0 = this.getY ();
var rrx1 = rrx0 + this.getWidth ();
var rry1 = rry0 + this.getHeight ();
if (x < rrx0 || y < rry0 || x >= rrx1 || y >= rry1) {
return false;
}var aw = Math.min (this.getWidth (), Math.abs (this.getArcWidth ())) / 2.0;
var ah = Math.min (this.getHeight (), Math.abs (this.getArcHeight ())) / 2.0;
if (x >= (rrx0 += aw) && x < (rrx0 = rrx1 - aw)) {
return true;
}if (y >= (rry0 += ah) && y < (rry0 = rry1 - ah)) {
return true;
}x = (x - rrx0) / aw;
y = (y - rry0) / ah;
return (x * x + y * y <= 1.0);
}, "~N,~N");
Clazz.defineMethod (c$, "classify", 
 function (coord, left, right, arcsize) {
if (coord < left) {
return 0;
} else if (coord < left + arcsize) {
return 1;
} else if (coord < right - arcsize) {
return 2;
} else if (coord < right) {
return 3;
} else {
return 4;
}}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "intersects", 
function (x, y, w, h) {
if (this.isEmpty () || w <= 0 || h <= 0) {
return false;
}var rrx0 = this.getX ();
var rry0 = this.getY ();
var rrx1 = rrx0 + this.getWidth ();
var rry1 = rry0 + this.getHeight ();
if (x + w <= rrx0 || x >= rrx1 || y + h <= rry0 || y >= rry1) {
return false;
}var aw = Math.min (this.getWidth (), Math.abs (this.getArcWidth ())) / 2.0;
var ah = Math.min (this.getHeight (), Math.abs (this.getArcHeight ())) / 2.0;
var x0class = this.classify (x, rrx0, rrx1, aw);
var x1class = this.classify (x + w, rrx0, rrx1, aw);
var y0class = this.classify (y, rry0, rry1, ah);
var y1class = this.classify (y + h, rry0, rry1, ah);
if (x0class == 2 || x1class == 2 || y0class == 2 || y1class == 2) {
return true;
}if ((x0class < 2 && x1class > 2) || (y0class < 2 && y1class > 2)) {
return true;
}x = (x1class == 1) ? (x = x + w - (rrx0 + aw)) : (x = x - (rrx1 - aw));
y = (y1class == 1) ? (y = y + h - (rry0 + ah)) : (y = y - (rry1 - ah));
x = x / aw;
y = y / ah;
return (x * x + y * y <= 1.0);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "contains", 
function (x, y, w, h) {
if (this.isEmpty () || w <= 0 || h <= 0) {
return false;
}return (this.contains (x, y) && this.contains (x + w, y) && this.contains (x, y + h) && this.contains (x + w, y + h));
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "getPathIterator", 
function (at) {
return  new java.awt.geom.RoundRectIterator (this, at);
}, "java.awt.geom.AffineTransform");
Clazz.overrideMethod (c$, "hashCode", 
function () {
var bits = java.lang.Double.doubleToLongBits (this.getX ());
bits += java.lang.Double.doubleToLongBits (this.getY ()) * 37;
bits += java.lang.Double.doubleToLongBits (this.getWidth ()) * 43;
bits += java.lang.Double.doubleToLongBits (this.getHeight ()) * 47;
bits += java.lang.Double.doubleToLongBits (this.getArcWidth ()) * 53;
bits += java.lang.Double.doubleToLongBits (this.getArcHeight ()) * 59;
return ((bits) ^ ((bits >> 32)));
});
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (obj === this) {
return true;
}if (Clazz.instanceOf (obj, java.awt.geom.RoundRectangle2D)) {
var rr2d = obj;
return ((this.getX () == rr2d.getX ()) && (this.getY () == rr2d.getY ()) && (this.getWidth () == rr2d.getWidth ()) && (this.getHeight () == rr2d.getHeight ()) && (this.getArcWidth () == rr2d.getArcWidth ()) && (this.getArcHeight () == rr2d.getArcHeight ()));
}return false;
}, "~O");
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.x = 0;
this.y = 0;
this.width = 0;
this.height = 0;
this.arcwidth = 0;
this.archeight = 0;
Clazz.instantialize (this, arguments);
}, java.awt.geom.RoundRectangle2D, "Float", java.awt.geom.RoundRectangle2D);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.awt.geom.RoundRectangle2D.Float, []);
});
Clazz.makeConstructor (c$, 
function (a, b, c, d, e, f) {
Clazz.superConstructor (this, java.awt.geom.RoundRectangle2D.Float, []);
this.setRoundRect (a, b, c, d, e, f);
}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getX", 
function () {
return this.x;
});
Clazz.defineMethod (c$, "getY", 
function () {
return this.y;
});
Clazz.defineMethod (c$, "getWidth", 
function () {
return this.width;
});
Clazz.defineMethod (c$, "getHeight", 
function () {
return this.height;
});
Clazz.defineMethod (c$, "getArcWidth", 
function () {
return this.arcwidth;
});
Clazz.defineMethod (c$, "getArcHeight", 
function () {
return this.archeight;
});
Clazz.overrideMethod (c$, "isEmpty", 
function () {
return (this.width <= 0.0) || (this.height <= 0.0);
});
Clazz.defineMethod (c$, "setRoundRect", 
function (a, b, c, d, e, f) {
this.x = a;
this.y = b;
this.width = c;
this.height = d;
this.arcwidth = e;
this.archeight = f;
}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "setRoundRect", 
function (a, b, c, d, e, f) {
this.x = a;
this.y = b;
this.width = c;
this.height = d;
this.arcwidth = e;
this.archeight = f;
}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "setRoundRect", 
function (a) {
this.x = a.getX ();
this.y = a.getY ();
this.width = a.getWidth ();
this.height = a.getHeight ();
this.arcwidth = a.getArcWidth ();
this.archeight = a.getArcHeight ();
}, "java.awt.geom.RoundRectangle2D");
Clazz.overrideMethod (c$, "getBounds2D", 
function () {
return  new java.awt.geom.Rectangle2D.Float (this.x, this.y, this.width, this.height);
});
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.x = 0;
this.y = 0;
this.width = 0;
this.height = 0;
this.arcwidth = 0;
this.archeight = 0;
Clazz.instantialize (this, arguments);
}, java.awt.geom.RoundRectangle2D, "Double", java.awt.geom.RoundRectangle2D);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.awt.geom.RoundRectangle2D.Double, []);
});
Clazz.makeConstructor (c$, 
function (a, b, c, d, e, f) {
Clazz.superConstructor (this, java.awt.geom.RoundRectangle2D.Double, []);
this.setRoundRect (a, b, c, d, e, f);
}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getX", 
function () {
return this.x;
});
Clazz.defineMethod (c$, "getY", 
function () {
return this.y;
});
Clazz.defineMethod (c$, "getWidth", 
function () {
return this.width;
});
Clazz.defineMethod (c$, "getHeight", 
function () {
return this.height;
});
Clazz.defineMethod (c$, "getArcWidth", 
function () {
return this.arcwidth;
});
Clazz.defineMethod (c$, "getArcHeight", 
function () {
return this.archeight;
});
Clazz.overrideMethod (c$, "isEmpty", 
function () {
return (this.width <= 0.0) || (this.height <= 0.0);
});
Clazz.defineMethod (c$, "setRoundRect", 
function (a, b, c, d, e, f) {
this.x = a;
this.y = b;
this.width = c;
this.height = d;
this.arcwidth = e;
this.archeight = f;
}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "setRoundRect", 
function (a) {
this.x = a.getX ();
this.y = a.getY ();
this.width = a.getWidth ();
this.height = a.getHeight ();
this.arcwidth = a.getArcWidth ();
this.archeight = a.getArcHeight ();
}, "java.awt.geom.RoundRectangle2D");
Clazz.overrideMethod (c$, "getBounds2D", 
function () {
return  new java.awt.geom.Rectangle2D.Double (this.x, this.y, this.width, this.height);
});
c$ = Clazz.p0p ();
});
