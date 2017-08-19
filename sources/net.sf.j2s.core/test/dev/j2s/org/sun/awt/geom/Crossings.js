Clazz.declarePackage ("sun.awt.geom");
Clazz.load (["java.util.Vector"], "sun.awt.geom.Crossings", ["sun.awt.geom.Curve"], function () {
c$ = Clazz.decorateAsClass (function () {
this.limit = 0;
this.yranges = null;
this.xlo = 0;
this.ylo = 0;
this.xhi = 0;
this.yhi = 0;
this.tmp = null;
Clazz.instantialize (this, arguments);
}, sun.awt.geom, "Crossings");
Clazz.prepareFields (c$, function () {
this.yranges =  Clazz.newDoubleArray (10, 0);
this.tmp =  new java.util.Vector ();
});
Clazz.makeConstructor (c$, 
function (xlo, ylo, xhi, yhi) {
this.xlo = xlo;
this.ylo = ylo;
this.xhi = xhi;
this.yhi = yhi;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "getXLo", 
function () {
return this.xlo;
});
Clazz.defineMethod (c$, "getYLo", 
function () {
return this.ylo;
});
Clazz.defineMethod (c$, "getXHi", 
function () {
return this.xhi;
});
Clazz.defineMethod (c$, "getYHi", 
function () {
return this.yhi;
});
Clazz.defineMethod (c$, "print", 
function () {
System.out.println ("Crossings [");
System.out.println ("  bounds = [" + this.ylo + ", " + this.yhi + "]");
for (var i = 0; i < this.limit; i += 2) {
System.out.println ("  [" + this.yranges[i] + ", " + this.yranges[i + 1] + "]");
}
System.out.println ("]");
});
Clazz.defineMethod (c$, "isEmpty", 
function () {
return (this.limit == 0);
});
c$.findCrossings = Clazz.defineMethod (c$, "findCrossings", 
function (curves, xlo, ylo, xhi, yhi) {
var cross =  new sun.awt.geom.Crossings.EvenOdd (xlo, ylo, xhi, yhi);
var enum_ = curves.elements ();
while (enum_.hasMoreElements ()) {
var c = enum_.nextElement ();
if (c.accumulateCrossings (cross)) {
return null;
}}
return cross;
}, "java.util.Vector,~N,~N,~N,~N");
Clazz.defineMethod (c$, "accumulateLine", 
function (x0, y0, x1, y1) {
if (y0 <= y1) {
return this.accumulateLine (x0, y0, x1, y1, 1);
} else {
return this.accumulateLine (x1, y1, x0, y0, -1);
}}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "accumulateLine", 
function (x0, y0, x1, y1, direction) {
if (this.yhi <= y0 || this.ylo >= y1) {
return false;
}if (x0 >= this.xhi && x1 >= this.xhi) {
return false;
}if (y0 == y1) {
return (x0 >= this.xlo || x1 >= this.xlo);
}var xstart;
var ystart;
var xend;
var yend;
var dx = (x1 - x0);
var dy = (y1 - y0);
if (y0 < this.ylo) {
xstart = x0 + (this.ylo - y0) * dx / dy;
ystart = this.ylo;
} else {
xstart = x0;
ystart = y0;
}if (this.yhi < y1) {
xend = x0 + (this.yhi - y0) * dx / dy;
yend = this.yhi;
} else {
xend = x1;
yend = y1;
}if (xstart >= this.xhi && xend >= this.xhi) {
return false;
}if (xstart > this.xlo || xend > this.xlo) {
return true;
}this.record (ystart, yend, direction);
return false;
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "accumulateQuad", 
function (x0, y0, coords) {
if (y0 < this.ylo && coords[1] < this.ylo && coords[3] < this.ylo) {
return false;
}if (y0 > this.yhi && coords[1] > this.yhi && coords[3] > this.yhi) {
return false;
}if (x0 > this.xhi && coords[0] > this.xhi && coords[2] > this.xhi) {
return false;
}if (x0 < this.xlo && coords[0] < this.xlo && coords[2] < this.xlo) {
if (y0 < coords[3]) {
this.record (Math.max (y0, this.ylo), Math.min (coords[3], this.yhi), 1);
} else if (y0 > coords[3]) {
this.record (Math.max (coords[3], this.ylo), Math.min (y0, this.yhi), -1);
}return false;
}sun.awt.geom.Curve.insertQuad (this.tmp, x0, y0, coords);
var enum_ = this.tmp.elements ();
while (enum_.hasMoreElements ()) {
var c = enum_.nextElement ();
if (c.accumulateCrossings (this)) {
return true;
}}
this.tmp.clear ();
return false;
}, "~N,~N,~A");
Clazz.defineMethod (c$, "accumulateCubic", 
function (x0, y0, coords) {
if (y0 < this.ylo && coords[1] < this.ylo && coords[3] < this.ylo && coords[5] < this.ylo) {
return false;
}if (y0 > this.yhi && coords[1] > this.yhi && coords[3] > this.yhi && coords[5] > this.yhi) {
return false;
}if (x0 > this.xhi && coords[0] > this.xhi && coords[2] > this.xhi && coords[4] > this.xhi) {
return false;
}if (x0 < this.xlo && coords[0] < this.xlo && coords[2] < this.xlo && coords[4] < this.xlo) {
if (y0 <= coords[5]) {
this.record (Math.max (y0, this.ylo), Math.min (coords[5], this.yhi), 1);
} else {
this.record (Math.max (coords[5], this.ylo), Math.min (y0, this.yhi), -1);
}return false;
}sun.awt.geom.Curve.insertCubic (this.tmp, x0, y0, coords);
var enum_ = this.tmp.elements ();
while (enum_.hasMoreElements ()) {
var c = enum_.nextElement ();
if (c.accumulateCrossings (this)) {
return true;
}}
this.tmp.clear ();
return false;
}, "~N,~N,~A");
Clazz.pu$h(c$);
c$ = Clazz.declareType (sun.awt.geom.Crossings, "EvenOdd", sun.awt.geom.Crossings);
Clazz.overrideMethod (c$, "covers", 
function (a, b) {
return (this.limit == 2 && this.yranges[0] <= a && this.yranges[1] >= b);
}, "~N,~N");
Clazz.overrideMethod (c$, "record", 
function (a, b, c) {
if (a >= b) {
return;
}var d = 0;
while (d < this.limit && a > this.yranges[d + 1]) {
d += 2;
}
var e = d;
while (d < this.limit) {
var f = this.yranges[d++];
var g = this.yranges[d++];
if (b < f) {
this.yranges[e++] = a;
this.yranges[e++] = b;
a = f;
b = g;
continue;
}var h;
var i;
var j;
var k;
if (a < f) {
h = a;
i = f;
} else {
h = f;
i = a;
}if (b < g) {
j = b;
k = g;
} else {
j = g;
k = b;
}if (i == j) {
a = h;
b = k;
} else {
if (i > j) {
a = j;
j = i;
i = a;
}if (h != i) {
this.yranges[e++] = h;
this.yranges[e++] = i;
}a = j;
b = k;
}if (a >= b) {
break;
}}
if (e < d && d < this.limit) {
System.arraycopy (this.yranges, d, this.yranges, e, this.limit - d);
}e += (this.limit - d);
if (a < b) {
if (e >= this.yranges.length) {
var f =  Clazz.newDoubleArray (e + 10, 0);
System.arraycopy (this.yranges, 0, f, 0, e);
this.yranges = f;
}this.yranges[e++] = a;
this.yranges[e++] = b;
}this.limit = e;
}, "~N,~N,~N");
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.crosscounts = null;
Clazz.instantialize (this, arguments);
}, sun.awt.geom.Crossings, "NonZero", sun.awt.geom.Crossings);
Clazz.makeConstructor (c$, 
function (a, b, c, d) {
Clazz.superConstructor (this, sun.awt.geom.Crossings.NonZero, [a, b, c, d]);
this.crosscounts =  Clazz.newIntArray (Clazz.doubleToInt (this.yranges.length / 2), 0);
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "covers", 
function (a, b) {
var c = 0;
while (c < this.limit) {
var d = this.yranges[c++];
var e = this.yranges[c++];
if (a >= e) {
continue;
}if (a < d) {
return false;
}if (b <= e) {
return true;
}a = e;
}
return (a >= b);
}, "~N,~N");
Clazz.defineMethod (c$, "remove", 
function (a) {
this.limit -= 2;
var b = this.limit - a;
if (b > 0) {
System.arraycopy (this.yranges, a + 2, this.yranges, a, b);
System.arraycopy (this.crosscounts, Clazz.doubleToInt (a / 2) + 1, this.crosscounts, Clazz.doubleToInt (a / 2), Clazz.doubleToInt (b / 2));
}}, "~N");
Clazz.defineMethod (c$, "insert", 
function (a, b, c, d) {
var e = this.limit - a;
var f = this.yranges;
var g = this.crosscounts;
if (this.limit >= this.yranges.length) {
this.yranges =  Clazz.newDoubleArray (this.limit + 10, 0);
System.arraycopy (f, 0, this.yranges, 0, a);
this.crosscounts =  Clazz.newIntArray (Clazz.doubleToInt ((this.limit + 10) / 2), 0);
System.arraycopy (g, 0, this.crosscounts, 0, Clazz.doubleToInt (a / 2));
}if (e > 0) {
System.arraycopy (f, a, this.yranges, a + 2, e);
System.arraycopy (g, Clazz.doubleToInt (a / 2), this.crosscounts, Clazz.doubleToInt (a / 2) + 1, Clazz.doubleToInt (e / 2));
}this.yranges[a + 0] = b;
this.yranges[a + 1] = c;
this.crosscounts[Clazz.doubleToInt (a / 2)] = d;
this.limit += 2;
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "record", 
function (a, b, c) {
if (a >= b) {
return;
}var d = 0;
while (d < this.limit && a > this.yranges[d + 1]) {
d += 2;
}
if (d < this.limit) {
var e = this.crosscounts[Clazz.doubleToInt (d / 2)];
var f = this.yranges[d + 0];
var g = this.yranges[d + 1];
if (g == a && e == c) {
if (d + 2 == this.limit) {
this.yranges[d + 1] = b;
return;
}this.remove (d);
a = f;
e = this.crosscounts[Clazz.doubleToInt (d / 2)];
f = this.yranges[d + 0];
g = this.yranges[d + 1];
}if (b < f) {
this.insert (d, a, b, c);
return;
}if (b == f && e == c) {
this.yranges[d] = a;
return;
}if (a < f) {
this.insert (d, a, f, c);
d += 2;
a = f;
} else if (f < a) {
this.insert (d, f, a, e);
d += 2;
f = a;
}var h = e + c;
var i = Math.min (b, g);
if (h == 0) {
this.remove (d);
} else {
this.crosscounts[Clazz.doubleToInt (d / 2)] = h;
this.yranges[d++] = a;
this.yranges[d++] = i;
}a = f = i;
if (f < g) {
this.insert (d, f, g, e);
}}if (a < b) {
this.insert (d, a, b, c);
}}, "~N,~N,~N");
c$ = Clazz.p0p ();
});
