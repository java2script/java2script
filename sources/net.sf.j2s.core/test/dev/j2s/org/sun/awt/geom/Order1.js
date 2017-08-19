Clazz.declarePackage ("sun.awt.geom");
Clazz.load (["sun.awt.geom.Curve"], "sun.awt.geom.Order1", ["java.lang.InternalError"], function () {
c$ = Clazz.decorateAsClass (function () {
this.x0 = 0;
this.y0 = 0;
this.x1 = 0;
this.y1 = 0;
this.xmin = 0;
this.xmax = 0;
Clazz.instantialize (this, arguments);
}, sun.awt.geom, "Order1", sun.awt.geom.Curve);
Clazz.makeConstructor (c$, 
function (x0, y0, x1, y1, direction) {
Clazz.superConstructor (this, sun.awt.geom.Order1, [direction]);
this.x0 = x0;
this.y0 = y0;
this.x1 = x1;
this.y1 = y1;
if (x0 < x1) {
this.xmin = x0;
this.xmax = x1;
} else {
this.xmin = x1;
this.xmax = x0;
}}, "~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "getOrder", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "getXTop", 
function () {
return this.x0;
});
Clazz.overrideMethod (c$, "getYTop", 
function () {
return this.y0;
});
Clazz.overrideMethod (c$, "getXBot", 
function () {
return this.x1;
});
Clazz.overrideMethod (c$, "getYBot", 
function () {
return this.y1;
});
Clazz.overrideMethod (c$, "getXMin", 
function () {
return this.xmin;
});
Clazz.overrideMethod (c$, "getXMax", 
function () {
return this.xmax;
});
Clazz.overrideMethod (c$, "getX0", 
function () {
return (this.direction == 1) ? this.x0 : this.x1;
});
Clazz.overrideMethod (c$, "getY0", 
function () {
return (this.direction == 1) ? this.y0 : this.y1;
});
Clazz.overrideMethod (c$, "getX1", 
function () {
return (this.direction == -1) ? this.x0 : this.x1;
});
Clazz.overrideMethod (c$, "getY1", 
function () {
return (this.direction == -1) ? this.y0 : this.y1;
});
Clazz.overrideMethod (c$, "XforY", 
function (y) {
if (this.x0 == this.x1 || y <= this.y0) {
return this.x0;
}if (y >= this.y1) {
return this.x1;
}return (this.x0 + (y - this.y0) * (this.x1 - this.x0) / (this.y1 - this.y0));
}, "~N");
Clazz.overrideMethod (c$, "TforY", 
function (y) {
if (y <= this.y0) {
return 0;
}if (y >= this.y1) {
return 1;
}return (y - this.y0) / (this.y1 - this.y0);
}, "~N");
Clazz.overrideMethod (c$, "XforT", 
function (t) {
return this.x0 + t * (this.x1 - this.x0);
}, "~N");
Clazz.overrideMethod (c$, "YforT", 
function (t) {
return this.y0 + t * (this.y1 - this.y0);
}, "~N");
Clazz.overrideMethod (c$, "dXforT", 
function (t, deriv) {
switch (deriv) {
case 0:
return this.x0 + t * (this.x1 - this.x0);
case 1:
return (this.x1 - this.x0);
default:
return 0;
}
}, "~N,~N");
Clazz.overrideMethod (c$, "dYforT", 
function (t, deriv) {
switch (deriv) {
case 0:
return this.y0 + t * (this.y1 - this.y0);
case 1:
return (this.y1 - this.y0);
default:
return 0;
}
}, "~N,~N");
Clazz.overrideMethod (c$, "nextVertical", 
function (t0, t1) {
return t1;
}, "~N,~N");
Clazz.overrideMethod (c$, "accumulateCrossings", 
function (c) {
var xlo = c.getXLo ();
var ylo = c.getYLo ();
var xhi = c.getXHi ();
var yhi = c.getYHi ();
if (this.xmin >= xhi) {
return false;
}var xstart;
var ystart;
var xend;
var yend;
if (this.y0 < ylo) {
if (this.y1 <= ylo) {
return false;
}ystart = ylo;
xstart = this.XforY (ylo);
} else {
if (this.y0 >= yhi) {
return false;
}ystart = this.y0;
xstart = this.x0;
}if (this.y1 > yhi) {
yend = yhi;
xend = this.XforY (yhi);
} else {
yend = this.y1;
xend = this.x1;
}if (xstart >= xhi && xend >= xhi) {
return false;
}if (xstart > xlo || xend > xlo) {
return true;
}c.record (ystart, yend, this.direction);
return false;
}, "sun.awt.geom.Crossings");
Clazz.overrideMethod (c$, "enlarge", 
function (r) {
r.add (this.x0, this.y0);
r.add (this.x1, this.y1);
}, "java.awt.geom.Rectangle2D");
Clazz.defineMethod (c$, "getSubCurve", 
function (ystart, yend, dir) {
if (ystart == this.y0 && yend == this.y1) {
return this.getWithDirection (dir);
}if (this.x0 == this.x1) {
return  new sun.awt.geom.Order1 (this.x0, ystart, this.x1, yend, dir);
}var num = this.x0 - this.x1;
var denom = this.y0 - this.y1;
var xstart = (this.x0 + (ystart - this.y0) * num / denom);
var xend = (this.x0 + (yend - this.y0) * num / denom);
return  new sun.awt.geom.Order1 (xstart, ystart, xend, yend, dir);
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "getReversedCurve", 
function () {
return  new sun.awt.geom.Order1 (this.x0, this.y0, this.x1, this.y1, -this.direction);
});
Clazz.defineMethod (c$, "compareTo", 
function (other, yrange) {
if (!(Clazz.instanceOf (other, sun.awt.geom.Order1))) {
return Clazz.superCall (this, sun.awt.geom.Order1, "compareTo", [other, yrange]);
}var c1 = other;
if (yrange[1] <= yrange[0]) {
throw  new InternalError ("yrange already screwed up...");
}yrange[1] = Math.min (Math.min (yrange[1], this.y1), c1.y1);
if (yrange[1] <= yrange[0]) {
throw  new InternalError ("backstepping from " + yrange[0] + " to " + yrange[1]);
}if (this.xmax <= c1.xmin) {
return (this.xmin == c1.xmax) ? 0 : -1;
}if (this.xmin >= c1.xmax) {
return 1;
}var dxa = this.x1 - this.x0;
var dya = this.y1 - this.y0;
var dxb = c1.x1 - c1.x0;
var dyb = c1.y1 - c1.y0;
var denom = dxb * dya - dxa * dyb;
var y;
if (denom != 0) {
var num = ((this.x0 - c1.x0) * dya * dyb - this.y0 * dxa * dyb + c1.y0 * dxb * dya);
y = num / denom;
if (y <= yrange[0]) {
y = Math.min (this.y1, c1.y1);
} else {
if (y < yrange[1]) {
yrange[1] = y;
}y = Math.max (this.y0, c1.y0);
}} else {
y = Math.max (this.y0, c1.y0);
}return sun.awt.geom.Curve.orderof (this.XforY (y), c1.XforY (y));
}, "sun.awt.geom.Curve,~A");
Clazz.overrideMethod (c$, "getSegment", 
function (coords) {
if (this.direction == 1) {
coords[0] = this.x1;
coords[1] = this.y1;
} else {
coords[0] = this.x0;
coords[1] = this.y0;
}return 1;
}, "~A");
});
