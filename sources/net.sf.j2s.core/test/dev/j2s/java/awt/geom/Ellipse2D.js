Clazz.declarePackage ("java.awt.geom");
Clazz.load (["java.awt.geom.RectangularShape"], "java.awt.geom.Ellipse2D", ["java.lang.Double", "java.awt.geom.EllipseIterator", "$.Rectangle2D"], function () {
c$ = Clazz.declareType (java.awt.geom, "Ellipse2D", java.awt.geom.RectangularShape);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.awt.geom.Ellipse2D, []);
});
Clazz.defineMethod (c$, "contains", 
function (x, y) {
var ellw = this.getWidth ();
if (ellw <= 0.0) {
return false;
}var normx = (x - this.getX ()) / ellw - 0.5;
var ellh = this.getHeight ();
if (ellh <= 0.0) {
return false;
}var normy = (y - this.getY ()) / ellh - 0.5;
return (normx * normx + normy * normy) < 0.25;
}, "~N,~N");
Clazz.defineMethod (c$, "intersects", 
function (x, y, w, h) {
if (w <= 0.0 || h <= 0.0) {
return false;
}var ellw = this.getWidth ();
if (ellw <= 0.0) {
return false;
}var normx0 = (x - this.getX ()) / ellw - 0.5;
var normx1 = normx0 + w / ellw;
var ellh = this.getHeight ();
if (ellh <= 0.0) {
return false;
}var normy0 = (y - this.getY ()) / ellh - 0.5;
var normy1 = normy0 + h / ellh;
var nearx;
var neary;
if (normx0 > 0.0) {
nearx = normx0;
} else if (normx1 < 0.0) {
nearx = normx1;
} else {
nearx = 0.0;
}if (normy0 > 0.0) {
neary = normy0;
} else if (normy1 < 0.0) {
neary = normy1;
} else {
neary = 0.0;
}return (nearx * nearx + neary * neary) < 0.25;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "contains", 
function (x, y, w, h) {
return (this.contains (x, y) && this.contains (x + w, y) && this.contains (x, y + h) && this.contains (x + w, y + h));
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "getPathIterator", 
function (at) {
return  new java.awt.geom.EllipseIterator (this, at);
}, "java.awt.geom.AffineTransform");
Clazz.overrideMethod (c$, "hashCode", 
function () {
var bits = java.lang.Double.doubleToLongBits (this.getX ());
bits += java.lang.Double.doubleToLongBits (this.getY ()) * 37;
bits += java.lang.Double.doubleToLongBits (this.getWidth ()) * 43;
bits += java.lang.Double.doubleToLongBits (this.getHeight ()) * 47;
return ((bits) ^ ((bits >> 32)));
});
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (obj === this) {
return true;
}if (Clazz.instanceOf (obj, java.awt.geom.Ellipse2D)) {
var e2d = obj;
return ((this.getX () == e2d.getX ()) && (this.getY () == e2d.getY ()) && (this.getWidth () == e2d.getWidth ()) && (this.getHeight () == e2d.getHeight ()));
}return false;
}, "~O");
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.x = 0;
this.y = 0;
this.width = 0;
this.height = 0;
Clazz.instantialize (this, arguments);
}, java.awt.geom.Ellipse2D, "Float", java.awt.geom.Ellipse2D);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.awt.geom.Ellipse2D.Float, []);
});
Clazz.makeConstructor (c$, 
function (a, b, c, d) {
Clazz.superConstructor (this, java.awt.geom.Ellipse2D.Float, []);
this.setFrame (a, b, c, d);
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "getX", 
function () {
return this.x;
});
Clazz.overrideMethod (c$, "getY", 
function () {
return this.y;
});
Clazz.overrideMethod (c$, "getWidth", 
function () {
return this.width;
});
Clazz.overrideMethod (c$, "getHeight", 
function () {
return this.height;
});
Clazz.overrideMethod (c$, "isEmpty", 
function () {
return (this.width <= 0.0 || this.height <= 0.0);
});
Clazz.defineMethod (c$, "setFrame", 
function (a, b, c, d) {
this.x = a;
this.y = b;
this.width = c;
this.height = d;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setFrame", 
function (a, b, c, d) {
this.x = a;
this.y = b;
this.width = c;
this.height = d;
}, "~N,~N,~N,~N");
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
Clazz.instantialize (this, arguments);
}, java.awt.geom.Ellipse2D, "Double", java.awt.geom.Ellipse2D);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.awt.geom.Ellipse2D.Double, []);
});
Clazz.makeConstructor (c$, 
function (a, b, c, d) {
Clazz.superConstructor (this, java.awt.geom.Ellipse2D.Double, []);
this.setFrame (a, b, c, d);
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "getX", 
function () {
return this.x;
});
Clazz.overrideMethod (c$, "getY", 
function () {
return this.y;
});
Clazz.overrideMethod (c$, "getWidth", 
function () {
return this.width;
});
Clazz.overrideMethod (c$, "getHeight", 
function () {
return this.height;
});
Clazz.overrideMethod (c$, "isEmpty", 
function () {
return (this.width <= 0.0 || this.height <= 0.0);
});
Clazz.defineMethod (c$, "setFrame", 
function (a, b, c, d) {
this.x = a;
this.y = b;
this.width = c;
this.height = d;
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "getBounds2D", 
function () {
return  new java.awt.geom.Rectangle2D.Double (this.x, this.y, this.width, this.height);
});
c$ = Clazz.p0p ();
});
