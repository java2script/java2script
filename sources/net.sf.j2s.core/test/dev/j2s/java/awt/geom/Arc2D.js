Clazz.declarePackage ("java.awt.geom");
Clazz.load (["java.awt.geom.RectangularShape"], "java.awt.geom.Arc2D", ["java.lang.Double", "$.IllegalArgumentException", "java.awt.geom.ArcIterator", "$.Line2D", "$.Point2D", "$.Rectangle2D"], function () {
c$ = Clazz.decorateAsClass (function () {
this.type = 0;
Clazz.instantialize (this, arguments);
}, java.awt.geom, "Arc2D", java.awt.geom.RectangularShape);
Clazz.makeConstructor (c$, 
function () {
this.construct (0);
});
Clazz.makeConstructor (c$, 
function (type) {
Clazz.superConstructor (this, java.awt.geom.Arc2D, []);
this.setArcType (type);
}, "~N");
Clazz.defineMethod (c$, "getArcType", 
function () {
return this.type;
});
Clazz.defineMethod (c$, "getStartPoint", 
function () {
var angle = Math.toRadians (-this.getAngleStart ());
var x = this.getX () + (Math.cos (angle) * 0.5 + 0.5) * this.getWidth ();
var y = this.getY () + (Math.sin (angle) * 0.5 + 0.5) * this.getHeight ();
return  new java.awt.geom.Point2D.Double (x, y);
});
Clazz.defineMethod (c$, "getEndPoint", 
function () {
var angle = Math.toRadians (-this.getAngleStart () - this.getAngleExtent ());
var x = this.getX () + (Math.cos (angle) * 0.5 + 0.5) * this.getWidth ();
var y = this.getY () + (Math.sin (angle) * 0.5 + 0.5) * this.getHeight ();
return  new java.awt.geom.Point2D.Double (x, y);
});
Clazz.defineMethod (c$, "setArc", 
function (loc, size, angSt, angExt, closure) {
this.setArc (loc.getX (), loc.getY (), size.getWidth (), size.getHeight (), angSt, angExt, closure);
}, "java.awt.geom.Point2D,java.awt.geom.Dimension2D,~N,~N,~N");
Clazz.defineMethod (c$, "setArc", 
function (rect, angSt, angExt, closure) {
this.setArc (rect.getX (), rect.getY (), rect.getWidth (), rect.getHeight (), angSt, angExt, closure);
}, "java.awt.geom.Rectangle2D,~N,~N,~N");
Clazz.defineMethod (c$, "setArc", 
function (a) {
this.setArc (a.getX (), a.getY (), a.getWidth (), a.getHeight (), a.getAngleStart (), a.getAngleExtent (), a.type);
}, "java.awt.geom.Arc2D");
Clazz.defineMethod (c$, "setArcByCenter", 
function (x, y, radius, angSt, angExt, closure) {
this.setArc (x - radius, y - radius, radius * 2.0, radius * 2.0, angSt, angExt, closure);
}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "setArcByTangent", 
function (p1, p2, p3, radius) {
var ang1 = Math.atan2 (p1.getY () - p2.getY (), p1.getX () - p2.getX ());
var ang2 = Math.atan2 (p3.getY () - p2.getY (), p3.getX () - p2.getX ());
var diff = ang2 - ang1;
if (diff > 3.141592653589793) {
ang2 -= 6.283185307179586;
} else if (diff < -3.141592653589793) {
ang2 += 6.283185307179586;
}var bisect = (ang1 + ang2) / 2.0;
var theta = Math.abs (ang2 - bisect);
var dist = radius / Math.sin (theta);
var x = p2.getX () + dist * Math.cos (bisect);
var y = p2.getY () + dist * Math.sin (bisect);
if (ang1 < ang2) {
ang1 -= 1.5707963267948966;
ang2 += 1.5707963267948966;
} else {
ang1 += 1.5707963267948966;
ang2 -= 1.5707963267948966;
}ang1 = Math.toDegrees (-ang1);
ang2 = Math.toDegrees (-ang2);
diff = ang2 - ang1;
if (diff < 0) {
diff += 360;
} else {
diff -= 360;
}this.setArcByCenter (x, y, radius, ang1, diff, this.type);
}, "java.awt.geom.Point2D,java.awt.geom.Point2D,java.awt.geom.Point2D,~N");
Clazz.defineMethod (c$, "setAngleStart", 
function (p) {
var dx = this.getHeight () * (p.getX () - this.getCenterX ());
var dy = this.getWidth () * (p.getY () - this.getCenterY ());
this.setAngleStart (-Math.toDegrees (Math.atan2 (dy, dx)));
}, "java.awt.geom.Point2D");
Clazz.defineMethod (c$, "setAngles", 
function (x1, y1, x2, y2) {
var x = this.getCenterX ();
var y = this.getCenterY ();
var w = this.getWidth ();
var h = this.getHeight ();
var ang1 = Math.atan2 (w * (y - y1), h * (x1 - x));
var ang2 = Math.atan2 (w * (y - y2), h * (x2 - x));
ang2 -= ang1;
if (ang2 <= 0.0) {
ang2 += 6.283185307179586;
}this.setAngleStart (Math.toDegrees (ang1));
this.setAngleExtent (Math.toDegrees (ang2));
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setAngles", 
function (p1, p2) {
this.setAngles (p1.getX (), p1.getY (), p2.getX (), p2.getY ());
}, "java.awt.geom.Point2D,java.awt.geom.Point2D");
Clazz.defineMethod (c$, "setArcType", 
function (type) {
if (type < 0 || type > 2) {
throw  new IllegalArgumentException ("invalid type for Arc: " + type);
}this.type = type;
}, "~N");
Clazz.defineMethod (c$, "setFrame", 
function (x, y, w, h) {
this.setArc (x, y, w, h, this.getAngleStart (), this.getAngleExtent (), this.type);
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "getBounds2D", 
function () {
if (this.isEmpty ()) {
return this.makeBounds (this.getX (), this.getY (), this.getWidth (), this.getHeight ());
}var x1;
var y1;
var x2;
var y2;
if (this.getArcType () == 2) {
x1 = y1 = x2 = y2 = 0.0;
} else {
x1 = y1 = 1.0;
x2 = y2 = -1.0;
}var angle = 0.0;
for (var i = 0; i < 6; i++) {
if (i < 4) {
angle += 90.0;
if (!this.containsAngle (angle)) {
continue;
}} else if (i == 4) {
angle = this.getAngleStart ();
} else {
angle += this.getAngleExtent ();
}var rads = Math.toRadians (-angle);
var xe = Math.cos (rads);
var ye = Math.sin (rads);
x1 = Math.min (x1, xe);
y1 = Math.min (y1, ye);
x2 = Math.max (x2, xe);
y2 = Math.max (y2, ye);
}
var w = this.getWidth ();
var h = this.getHeight ();
x2 = (x2 - x1) * 0.5 * w;
y2 = (y2 - y1) * 0.5 * h;
x1 = this.getX () + (x1 * 0.5 + 0.5) * w;
y1 = this.getY () + (y1 * 0.5 + 0.5) * h;
return this.makeBounds (x1, y1, x2, y2);
});
c$.normalizeDegrees = Clazz.defineMethod (c$, "normalizeDegrees", 
function (angle) {
if (angle > 180.0) {
if (angle <= (540.0)) {
angle = angle - 360.0;
} else {
angle = Math.IEEEremainder (angle, 360.0);
if (angle == -180.0) {
angle = 180.0;
}}} else if (angle <= -180.0) {
if (angle > (-540.0)) {
angle = angle + 360.0;
} else {
angle = Math.IEEEremainder (angle, 360.0);
if (angle == -180.0) {
angle = 180.0;
}}}return angle;
}, "~N");
Clazz.defineMethod (c$, "containsAngle", 
function (angle) {
var angExt = this.getAngleExtent ();
var backwards = (angExt < 0.0);
if (backwards) {
angExt = -angExt;
}if (angExt >= 360.0) {
return true;
}angle = java.awt.geom.Arc2D.normalizeDegrees (angle) - java.awt.geom.Arc2D.normalizeDegrees (this.getAngleStart ());
if (backwards) {
angle = -angle;
}if (angle < 0.0) {
angle += 360.0;
}return (angle >= 0.0) && (angle < angExt);
}, "~N");
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
var distSq = (normx * normx + normy * normy);
if (distSq >= 0.25) {
return false;
}var angExt = Math.abs (this.getAngleExtent ());
if (angExt >= 360.0) {
return true;
}var inarc = this.containsAngle (-Math.toDegrees (Math.atan2 (normy, normx)));
if (this.type == 2) {
return inarc;
}if (inarc) {
if (angExt >= 180.0) {
return true;
}} else {
if (angExt <= 180.0) {
return false;
}}var angle = Math.toRadians (-this.getAngleStart ());
var x1 = Math.cos (angle);
var y1 = Math.sin (angle);
angle += Math.toRadians (-this.getAngleExtent ());
var x2 = Math.cos (angle);
var y2 = Math.sin (angle);
var inside = (java.awt.geom.Line2D.relativeCCW (x1, y1, x2, y2, 2 * normx, 2 * normy) * java.awt.geom.Line2D.relativeCCW (x1, y1, x2, y2, 0, 0) >= 0);
return inarc ? !inside : inside;
}, "~N,~N");
Clazz.defineMethod (c$, "intersects", 
function (x, y, w, h) {
var aw = this.getWidth ();
var ah = this.getHeight ();
if (w <= 0 || h <= 0 || aw <= 0 || ah <= 0) {
return false;
}var ext = this.getAngleExtent ();
if (ext == 0) {
return false;
}var ax = this.getX ();
var ay = this.getY ();
var axw = ax + aw;
var ayh = ay + ah;
var xw = x + w;
var yh = y + h;
if (x >= axw || y >= ayh || xw <= ax || yh <= ay) {
return false;
}var axc = this.getCenterX ();
var ayc = this.getCenterY ();
var sp = this.getStartPoint ();
var ep = this.getEndPoint ();
var sx = sp.getX ();
var sy = sp.getY ();
var ex = ep.getX ();
var ey = ep.getY ();
if (ayc >= y && ayc <= yh) {
if ((sx < xw && ex < xw && axc < xw && axw > x && this.containsAngle (0)) || (sx > x && ex > x && axc > x && ax < xw && this.containsAngle (180))) {
return true;
}}if (axc >= x && axc <= xw) {
if ((sy > y && ey > y && ayc > y && ay < yh && this.containsAngle (90)) || (sy < yh && ey < yh && ayc < yh && ayh > y && this.containsAngle (270))) {
return true;
}}var rect =  new java.awt.geom.Rectangle2D.Double (x, y, w, h);
if (this.type == 2 || Math.abs (ext) > 180) {
if (rect.intersectsLine (axc, ayc, sx, sy) || rect.intersectsLine (axc, ayc, ex, ey)) {
return true;
}} else {
if (rect.intersectsLine (sx, sy, ex, ey)) {
return true;
}}if (this.contains (x, y) || this.contains (x + w, y) || this.contains (x, y + h) || this.contains (x + w, y + h)) {
return true;
}return false;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "contains", 
function (x, y, w, h) {
return this.contains (x, y, w, h, null);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "contains", 
function (r) {
return this.contains (r.getX (), r.getY (), r.getWidth (), r.getHeight (), r);
}, "java.awt.geom.Rectangle2D");
Clazz.defineMethod (c$, "contains", 
 function (x, y, w, h, origrect) {
if (!(this.contains (x, y) && this.contains (x + w, y) && this.contains (x, y + h) && this.contains (x + w, y + h))) {
return false;
}if (this.type != 2 || Math.abs (this.getAngleExtent ()) <= 180.0) {
return true;
}if (origrect == null) {
origrect =  new java.awt.geom.Rectangle2D.Double (x, y, w, h);
}var halfW = this.getWidth () / 2.0;
var halfH = this.getHeight () / 2.0;
var xc = this.getX () + halfW;
var yc = this.getY () + halfH;
var angle = Math.toRadians (-this.getAngleStart ());
var xe = xc + halfW * Math.cos (angle);
var ye = yc + halfH * Math.sin (angle);
if (origrect.intersectsLine (xc, yc, xe, ye)) {
return false;
}angle += Math.toRadians (-this.getAngleExtent ());
xe = xc + halfW * Math.cos (angle);
ye = yc + halfH * Math.sin (angle);
return !origrect.intersectsLine (xc, yc, xe, ye);
}, "~N,~N,~N,~N,java.awt.geom.Rectangle2D");
Clazz.defineMethod (c$, "getPathIterator", 
function (at) {
return  new java.awt.geom.ArcIterator (this, at);
}, "java.awt.geom.AffineTransform");
Clazz.overrideMethod (c$, "hashCode", 
function () {
var bits = java.lang.Double.doubleToLongBits (this.getX ());
bits += java.lang.Double.doubleToLongBits (this.getY ()) * 37;
bits += java.lang.Double.doubleToLongBits (this.getWidth ()) * 43;
bits += java.lang.Double.doubleToLongBits (this.getHeight ()) * 47;
bits += java.lang.Double.doubleToLongBits (this.getAngleStart ()) * 53;
bits += java.lang.Double.doubleToLongBits (this.getAngleExtent ()) * 59;
bits += this.getArcType () * 61;
return ((bits) ^ ((bits >> 32)));
});
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (obj === this) {
return true;
}if (Clazz.instanceOf (obj, java.awt.geom.Arc2D)) {
var a2d = obj;
return ((this.getX () == a2d.getX ()) && (this.getY () == a2d.getY ()) && (this.getWidth () == a2d.getWidth ()) && (this.getHeight () == a2d.getHeight ()) && (this.getAngleStart () == a2d.getAngleStart ()) && (this.getAngleExtent () == a2d.getAngleExtent ()) && (this.getArcType () == a2d.getArcType ()));
}return false;
}, "~O");
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.x = 0;
this.y = 0;
this.width = 0;
this.height = 0;
this.start = 0;
this.extent = 0;
Clazz.instantialize (this, arguments);
}, java.awt.geom.Arc2D, "Float", java.awt.geom.Arc2D);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.awt.geom.Arc2D.Float, [0]);
});
Clazz.makeConstructor (c$, 
function (a, b, c, d, e, f, g) {
Clazz.superConstructor (this, java.awt.geom.Arc2D.Float, [g]);
this.x = a;
this.y = b;
this.width = c;
this.height = d;
this.start = e;
this.extent = f;
}, "~N,~N,~N,~N,~N,~N,~N");
Clazz.makeConstructor (c$, 
function (a, b, c, d) {
Clazz.superConstructor (this, java.awt.geom.Arc2D.Float, [d]);
this.x = a.getX ();
this.y = a.getY ();
this.width = a.getWidth ();
this.height = a.getHeight ();
this.start = b;
this.extent = c;
}, "java.awt.geom.Rectangle2D,~N,~N,~N");
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
Clazz.overrideMethod (c$, "getAngleStart", 
function () {
return this.start;
});
Clazz.overrideMethod (c$, "getAngleExtent", 
function () {
return this.extent;
});
Clazz.overrideMethod (c$, "isEmpty", 
function () {
return (this.width <= 0.0 || this.height <= 0.0);
});
Clazz.defineMethod (c$, "setArc", 
function (a, b, c, d, e, f, g) {
this.setArcType (g);
this.x = a;
this.y = b;
this.width = c;
this.height = d;
this.start = e;
this.extent = f;
}, "~N,~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "setAngleStart", 
function (a) {
this.start = a;
}, "~N");
Clazz.overrideMethod (c$, "setAngleExtent", 
function (a) {
this.extent = a;
}, "~N");
Clazz.overrideMethod (c$, "makeBounds", 
function (a, b, c, d) {
return  new java.awt.geom.Rectangle2D.Float (a, b, c, d);
}, "~N,~N,~N,~N");
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.x = 0;
this.y = 0;
this.width = 0;
this.height = 0;
this.start = 0;
this.extent = 0;
Clazz.instantialize (this, arguments);
}, java.awt.geom.Arc2D, "Double", java.awt.geom.Arc2D);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.awt.geom.Arc2D.Double, [0]);
});
Clazz.makeConstructor (c$, 
function (a, b, c, d, e, f, g) {
Clazz.superConstructor (this, java.awt.geom.Arc2D.Double, [g]);
this.x = a;
this.y = b;
this.width = c;
this.height = d;
this.start = e;
this.extent = f;
}, "~N,~N,~N,~N,~N,~N,~N");
Clazz.makeConstructor (c$, 
function (a, b, c, d) {
Clazz.superConstructor (this, java.awt.geom.Arc2D.Double, [d]);
this.x = a.getX ();
this.y = a.getY ();
this.width = a.getWidth ();
this.height = a.getHeight ();
this.start = b;
this.extent = c;
}, "java.awt.geom.Rectangle2D,~N,~N,~N");
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
Clazz.overrideMethod (c$, "getAngleStart", 
function () {
return this.start;
});
Clazz.overrideMethod (c$, "getAngleExtent", 
function () {
return this.extent;
});
Clazz.overrideMethod (c$, "isEmpty", 
function () {
return (this.width <= 0.0 || this.height <= 0.0);
});
Clazz.defineMethod (c$, "setArc", 
function (a, b, c, d, e, f, g) {
this.setArcType (g);
this.x = a;
this.y = b;
this.width = c;
this.height = d;
this.start = e;
this.extent = f;
}, "~N,~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "setAngleStart", 
function (a) {
this.start = a;
}, "~N");
Clazz.overrideMethod (c$, "setAngleExtent", 
function (a) {
this.extent = a;
}, "~N");
Clazz.overrideMethod (c$, "makeBounds", 
function (a, b, c, d) {
return  new java.awt.geom.Rectangle2D.Double (a, b, c, d);
}, "~N,~N,~N,~N");
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"OPEN", 0,
"CHORD", 1,
"PIE", 2);
});
