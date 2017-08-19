Clazz.declarePackage ("sun.awt.geom");
Clazz.load (null, "sun.awt.geom.Curve", ["java.lang.Double", "$.InternalError", "java.awt.geom.IllegalPathStateException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.direction = 0;
Clazz.instantialize (this, arguments);
}, sun.awt.geom, "Curve");
c$.insertMove = Clazz.defineMethod (c$, "insertMove", 
function (curves, x, y) {
curves.add ( new sun.awt.geom.Order0 (x, y));
}, "java.util.Vector,~N,~N");
c$.insertLine = Clazz.defineMethod (c$, "insertLine", 
function (curves, x0, y0, x1, y1) {
if (y0 < y1) {
curves.add ( new sun.awt.geom.Order1 (x0, y0, x1, y1, 1));
} else if (y0 > y1) {
curves.add ( new sun.awt.geom.Order1 (x1, y1, x0, y0, -1));
} else {
}}, "java.util.Vector,~N,~N,~N,~N");
c$.insertQuad = Clazz.defineMethod (c$, "insertQuad", 
function (curves, x0, y0, coords) {
var y1 = coords[3];
if (y0 > y1) {
sun.awt.geom.Order2.insert (curves, coords, coords[2], y1, coords[0], coords[1], x0, y0, -1);
} else if (y0 == y1 && y0 == coords[1]) {
return;
} else {
sun.awt.geom.Order2.insert (curves, coords, x0, y0, coords[0], coords[1], coords[2], y1, 1);
}}, "java.util.Vector,~N,~N,~A");
c$.insertCubic = Clazz.defineMethod (c$, "insertCubic", 
function (curves, x0, y0, coords) {
var y1 = coords[5];
if (y0 > y1) {
sun.awt.geom.Order3.insert (curves, coords, coords[4], y1, coords[2], coords[3], coords[0], coords[1], x0, y0, -1);
} else if (y0 == y1 && y0 == coords[1] && y0 == coords[3]) {
return;
} else {
sun.awt.geom.Order3.insert (curves, coords, x0, y0, coords[0], coords[1], coords[2], coords[3], coords[4], y1, 1);
}}, "java.util.Vector,~N,~N,~A");
c$.pointCrossingsForPath = Clazz.defineMethod (c$, "pointCrossingsForPath", 
function (pi, px, py) {
if (pi.isDone ()) {
return 0;
}var coords =  Clazz.newDoubleArray (6, 0);
if (pi.currentSegment (coords) != 0) {
throw  new java.awt.geom.IllegalPathStateException ("missing initial moveto in path definition");
}pi.next ();
var movx = coords[0];
var movy = coords[1];
var curx = movx;
var cury = movy;
var endx;
var endy;
var crossings = 0;
while (!pi.isDone ()) {
switch (pi.currentSegment (coords)) {
case 0:
if (cury != movy) {
crossings += sun.awt.geom.Curve.pointCrossingsForLine (px, py, curx, cury, movx, movy);
}movx = curx = coords[0];
movy = cury = coords[1];
break;
case 1:
endx = coords[0];
endy = coords[1];
crossings += sun.awt.geom.Curve.pointCrossingsForLine (px, py, curx, cury, endx, endy);
curx = endx;
cury = endy;
break;
case 2:
endx = coords[2];
endy = coords[3];
crossings += sun.awt.geom.Curve.pointCrossingsForQuad (px, py, curx, cury, coords[0], coords[1], endx, endy, 0);
curx = endx;
cury = endy;
break;
case 3:
endx = coords[4];
endy = coords[5];
crossings += sun.awt.geom.Curve.pointCrossingsForCubic (px, py, curx, cury, coords[0], coords[1], coords[2], coords[3], endx, endy, 0);
curx = endx;
cury = endy;
break;
case 4:
if (cury != movy) {
crossings += sun.awt.geom.Curve.pointCrossingsForLine (px, py, curx, cury, movx, movy);
}curx = movx;
cury = movy;
break;
}
pi.next ();
}
if (cury != movy) {
crossings += sun.awt.geom.Curve.pointCrossingsForLine (px, py, curx, cury, movx, movy);
}return crossings;
}, "java.awt.geom.PathIterator,~N,~N");
c$.pointCrossingsForLine = Clazz.defineMethod (c$, "pointCrossingsForLine", 
function (px, py, x0, y0, x1, y1) {
if (py < y0 && py < y1) return 0;
if (py >= y0 && py >= y1) return 0;
if (px >= x0 && px >= x1) return 0;
if (px < x0 && px < x1) return (y0 < y1) ? 1 : -1;
var xintercept = x0 + (py - y0) * (x1 - x0) / (y1 - y0);
if (px >= xintercept) return 0;
return (y0 < y1) ? 1 : -1;
}, "~N,~N,~N,~N,~N,~N");
c$.pointCrossingsForQuad = Clazz.defineMethod (c$, "pointCrossingsForQuad", 
function (px, py, x0, y0, xc, yc, x1, y1, level) {
if (py < y0 && py < yc && py < y1) return 0;
if (py >= y0 && py >= yc && py >= y1) return 0;
if (px >= x0 && px >= xc && px >= x1) return 0;
if (px < x0 && px < xc && px < x1) {
if (py >= y0) {
if (py < y1) return 1;
} else {
if (py >= y1) return -1;
}return 0;
}if (level > 52) return sun.awt.geom.Curve.pointCrossingsForLine (px, py, x0, y0, x1, y1);
var x0c = (x0 + xc) / 2;
var y0c = (y0 + yc) / 2;
var xc1 = (xc + x1) / 2;
var yc1 = (yc + y1) / 2;
xc = (x0c + xc1) / 2;
yc = (y0c + yc1) / 2;
if (Double.isNaN (xc) || Double.isNaN (yc)) {
return 0;
}return (sun.awt.geom.Curve.pointCrossingsForQuad (px, py, x0, y0, x0c, y0c, xc, yc, level + 1) + sun.awt.geom.Curve.pointCrossingsForQuad (px, py, xc, yc, xc1, yc1, x1, y1, level + 1));
}, "~N,~N,~N,~N,~N,~N,~N,~N,~N");
c$.pointCrossingsForCubic = Clazz.defineMethod (c$, "pointCrossingsForCubic", 
function (px, py, x0, y0, xc0, yc0, xc1, yc1, x1, y1, level) {
if (py < y0 && py < yc0 && py < yc1 && py < y1) return 0;
if (py >= y0 && py >= yc0 && py >= yc1 && py >= y1) return 0;
if (px >= x0 && px >= xc0 && px >= xc1 && px >= x1) return 0;
if (px < x0 && px < xc0 && px < xc1 && px < x1) {
if (py >= y0) {
if (py < y1) return 1;
} else {
if (py >= y1) return -1;
}return 0;
}if (level > 52) return sun.awt.geom.Curve.pointCrossingsForLine (px, py, x0, y0, x1, y1);
var xmid = (xc0 + xc1) / 2;
var ymid = (yc0 + yc1) / 2;
xc0 = (x0 + xc0) / 2;
yc0 = (y0 + yc0) / 2;
xc1 = (xc1 + x1) / 2;
yc1 = (yc1 + y1) / 2;
var xc0m = (xc0 + xmid) / 2;
var yc0m = (yc0 + ymid) / 2;
var xmc1 = (xmid + xc1) / 2;
var ymc1 = (ymid + yc1) / 2;
xmid = (xc0m + xmc1) / 2;
ymid = (yc0m + ymc1) / 2;
if (Double.isNaN (xmid) || Double.isNaN (ymid)) {
return 0;
}return (sun.awt.geom.Curve.pointCrossingsForCubic (px, py, x0, y0, xc0, yc0, xc0m, yc0m, xmid, ymid, level + 1) + sun.awt.geom.Curve.pointCrossingsForCubic (px, py, xmid, ymid, xmc1, ymc1, xc1, yc1, x1, y1, level + 1));
}, "~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N");
c$.rectCrossingsForPath = Clazz.defineMethod (c$, "rectCrossingsForPath", 
function (pi, rxmin, rymin, rxmax, rymax) {
if (rxmax <= rxmin || rymax <= rymin) {
return 0;
}if (pi.isDone ()) {
return 0;
}var coords =  Clazz.newDoubleArray (6, 0);
if (pi.currentSegment (coords) != 0) {
throw  new java.awt.geom.IllegalPathStateException ("missing initial moveto in path definition");
}pi.next ();
var curx;
var cury;
var movx;
var movy;
var endx;
var endy;
curx = movx = coords[0];
cury = movy = coords[1];
var crossings = 0;
while (crossings != -2147483648 && !pi.isDone ()) {
switch (pi.currentSegment (coords)) {
case 0:
if (curx != movx || cury != movy) {
crossings = sun.awt.geom.Curve.rectCrossingsForLine (crossings, rxmin, rymin, rxmax, rymax, curx, cury, movx, movy);
}movx = curx = coords[0];
movy = cury = coords[1];
break;
case 1:
endx = coords[0];
endy = coords[1];
crossings = sun.awt.geom.Curve.rectCrossingsForLine (crossings, rxmin, rymin, rxmax, rymax, curx, cury, endx, endy);
curx = endx;
cury = endy;
break;
case 2:
endx = coords[2];
endy = coords[3];
crossings = sun.awt.geom.Curve.rectCrossingsForQuad (crossings, rxmin, rymin, rxmax, rymax, curx, cury, coords[0], coords[1], endx, endy, 0);
curx = endx;
cury = endy;
break;
case 3:
endx = coords[4];
endy = coords[5];
crossings = sun.awt.geom.Curve.rectCrossingsForCubic (crossings, rxmin, rymin, rxmax, rymax, curx, cury, coords[0], coords[1], coords[2], coords[3], endx, endy, 0);
curx = endx;
cury = endy;
break;
case 4:
if (curx != movx || cury != movy) {
crossings = sun.awt.geom.Curve.rectCrossingsForLine (crossings, rxmin, rymin, rxmax, rymax, curx, cury, movx, movy);
}curx = movx;
cury = movy;
break;
}
pi.next ();
}
if (crossings != -2147483648 && (curx != movx || cury != movy)) {
crossings = sun.awt.geom.Curve.rectCrossingsForLine (crossings, rxmin, rymin, rxmax, rymax, curx, cury, movx, movy);
}return crossings;
}, "java.awt.geom.PathIterator,~N,~N,~N,~N");
c$.rectCrossingsForLine = Clazz.defineMethod (c$, "rectCrossingsForLine", 
function (crossings, rxmin, rymin, rxmax, rymax, x0, y0, x1, y1) {
if (y0 >= rymax && y1 >= rymax) return crossings;
if (y0 <= rymin && y1 <= rymin) return crossings;
if (x0 <= rxmin && x1 <= rxmin) return crossings;
if (x0 >= rxmax && x1 >= rxmax) {
if (y0 < y1) {
if (y0 <= rymin) crossings++;
if (y1 >= rymax) crossings++;
} else if (y1 < y0) {
if (y1 <= rymin) crossings--;
if (y0 >= rymax) crossings--;
}return crossings;
}if ((x0 > rxmin && x0 < rxmax && y0 > rymin && y0 < rymax) || (x1 > rxmin && x1 < rxmax && y1 > rymin && y1 < rymax)) {
return -2147483648;
}var xi0 = x0;
if (y0 < rymin) {
xi0 += ((rymin - y0) * (x1 - x0) / (y1 - y0));
} else if (y0 > rymax) {
xi0 += ((rymax - y0) * (x1 - x0) / (y1 - y0));
}var xi1 = x1;
if (y1 < rymin) {
xi1 += ((rymin - y1) * (x0 - x1) / (y0 - y1));
} else if (y1 > rymax) {
xi1 += ((rymax - y1) * (x0 - x1) / (y0 - y1));
}if (xi0 <= rxmin && xi1 <= rxmin) return crossings;
if (xi0 >= rxmax && xi1 >= rxmax) {
if (y0 < y1) {
if (y0 <= rymin) crossings++;
if (y1 >= rymax) crossings++;
} else if (y1 < y0) {
if (y1 <= rymin) crossings--;
if (y0 >= rymax) crossings--;
}return crossings;
}return -2147483648;
}, "~N,~N,~N,~N,~N,~N,~N,~N,~N");
c$.rectCrossingsForQuad = Clazz.defineMethod (c$, "rectCrossingsForQuad", 
function (crossings, rxmin, rymin, rxmax, rymax, x0, y0, xc, yc, x1, y1, level) {
if (y0 >= rymax && yc >= rymax && y1 >= rymax) return crossings;
if (y0 <= rymin && yc <= rymin && y1 <= rymin) return crossings;
if (x0 <= rxmin && xc <= rxmin && x1 <= rxmin) return crossings;
if (x0 >= rxmax && xc >= rxmax && x1 >= rxmax) {
if (y0 < y1) {
if (y0 <= rymin && y1 > rymin) crossings++;
if (y0 < rymax && y1 >= rymax) crossings++;
} else if (y1 < y0) {
if (y1 <= rymin && y0 > rymin) crossings--;
if (y1 < rymax && y0 >= rymax) crossings--;
}return crossings;
}if ((x0 < rxmax && x0 > rxmin && y0 < rymax && y0 > rymin) || (x1 < rxmax && x1 > rxmin && y1 < rymax && y1 > rymin)) {
return -2147483648;
}if (level > 52) {
return sun.awt.geom.Curve.rectCrossingsForLine (crossings, rxmin, rymin, rxmax, rymax, x0, y0, x1, y1);
}var x0c = (x0 + xc) / 2;
var y0c = (y0 + yc) / 2;
var xc1 = (xc + x1) / 2;
var yc1 = (yc + y1) / 2;
xc = (x0c + xc1) / 2;
yc = (y0c + yc1) / 2;
if (Double.isNaN (xc) || Double.isNaN (yc)) {
return 0;
}crossings = sun.awt.geom.Curve.rectCrossingsForQuad (crossings, rxmin, rymin, rxmax, rymax, x0, y0, x0c, y0c, xc, yc, level + 1);
if (crossings != -2147483648) {
crossings = sun.awt.geom.Curve.rectCrossingsForQuad (crossings, rxmin, rymin, rxmax, rymax, xc, yc, xc1, yc1, x1, y1, level + 1);
}return crossings;
}, "~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N");
c$.rectCrossingsForCubic = Clazz.defineMethod (c$, "rectCrossingsForCubic", 
function (crossings, rxmin, rymin, rxmax, rymax, x0, y0, xc0, yc0, xc1, yc1, x1, y1, level) {
if (y0 >= rymax && yc0 >= rymax && yc1 >= rymax && y1 >= rymax) {
return crossings;
}if (y0 <= rymin && yc0 <= rymin && yc1 <= rymin && y1 <= rymin) {
return crossings;
}if (x0 <= rxmin && xc0 <= rxmin && xc1 <= rxmin && x1 <= rxmin) {
return crossings;
}if (x0 >= rxmax && xc0 >= rxmax && xc1 >= rxmax && x1 >= rxmax) {
if (y0 < y1) {
if (y0 <= rymin && y1 > rymin) crossings++;
if (y0 < rymax && y1 >= rymax) crossings++;
} else if (y1 < y0) {
if (y1 <= rymin && y0 > rymin) crossings--;
if (y1 < rymax && y0 >= rymax) crossings--;
}return crossings;
}if ((x0 > rxmin && x0 < rxmax && y0 > rymin && y0 < rymax) || (x1 > rxmin && x1 < rxmax && y1 > rymin && y1 < rymax)) {
return -2147483648;
}if (level > 52) {
return sun.awt.geom.Curve.rectCrossingsForLine (crossings, rxmin, rymin, rxmax, rymax, x0, y0, x1, y1);
}var xmid = (xc0 + xc1) / 2;
var ymid = (yc0 + yc1) / 2;
xc0 = (x0 + xc0) / 2;
yc0 = (y0 + yc0) / 2;
xc1 = (xc1 + x1) / 2;
yc1 = (yc1 + y1) / 2;
var xc0m = (xc0 + xmid) / 2;
var yc0m = (yc0 + ymid) / 2;
var xmc1 = (xmid + xc1) / 2;
var ymc1 = (ymid + yc1) / 2;
xmid = (xc0m + xmc1) / 2;
ymid = (yc0m + ymc1) / 2;
if (Double.isNaN (xmid) || Double.isNaN (ymid)) {
return 0;
}crossings = sun.awt.geom.Curve.rectCrossingsForCubic (crossings, rxmin, rymin, rxmax, rymax, x0, y0, xc0, yc0, xc0m, yc0m, xmid, ymid, level + 1);
if (crossings != -2147483648) {
crossings = sun.awt.geom.Curve.rectCrossingsForCubic (crossings, rxmin, rymin, rxmax, rymax, xmid, ymid, xmc1, ymc1, xc1, yc1, x1, y1, level + 1);
}return crossings;
}, "~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N");
Clazz.makeConstructor (c$, 
function (direction) {
this.direction = direction;
}, "~N");
Clazz.defineMethod (c$, "getDirection", 
function () {
return this.direction;
});
Clazz.defineMethod (c$, "getWithDirection", 
function (direction) {
return (this.direction == direction ? this : this.getReversedCurve ());
}, "~N");
c$.round = Clazz.defineMethod (c$, "round", 
function (v) {
return v;
}, "~N");
c$.orderof = Clazz.defineMethod (c$, "orderof", 
function (x1, x2) {
if (x1 < x2) {
return -1;
}if (x1 > x2) {
return 1;
}return 0;
}, "~N,~N");
c$.signeddiffbits = Clazz.defineMethod (c$, "signeddiffbits", 
function (y1, y2) {
return (Double.doubleToLongBits (y1) - Double.doubleToLongBits (y2));
}, "~N,~N");
c$.diffbits = Clazz.defineMethod (c$, "diffbits", 
function (y1, y2) {
return Math.abs (Double.doubleToLongBits (y1) - Double.doubleToLongBits (y2));
}, "~N,~N");
c$.prev = Clazz.defineMethod (c$, "prev", 
function (v) {
return Double.longBitsToDouble (Double.doubleToLongBits (v) - 1);
}, "~N");
c$.next = Clazz.defineMethod (c$, "next", 
function (v) {
return Double.longBitsToDouble (Double.doubleToLongBits (v) + 1);
}, "~N");
Clazz.overrideMethod (c$, "toString", 
function () {
return ("Curve[" + this.getOrder () + ", " + ("(" + sun.awt.geom.Curve.round (this.getX0 ()) + ", " + sun.awt.geom.Curve.round (this.getY0 ()) + "), ") + this.controlPointString () + ("(" + sun.awt.geom.Curve.round (this.getX1 ()) + ", " + sun.awt.geom.Curve.round (this.getY1 ()) + "), ") + (this.direction == 1 ? "D" : "U") + "]");
});
Clazz.defineMethod (c$, "controlPointString", 
function () {
return "";
});
Clazz.defineMethod (c$, "crossingsFor", 
function (x, y) {
if (y >= this.getYTop () && y < this.getYBot ()) {
if (x < this.getXMax () && (x < this.getXMin () || x < this.XforY (y))) {
return 1;
}}return 0;
}, "~N,~N");
Clazz.defineMethod (c$, "accumulateCrossings", 
function (c) {
var xhi = c.getXHi ();
if (this.getXMin () >= xhi) {
return false;
}var xlo = c.getXLo ();
var ylo = c.getYLo ();
var yhi = c.getYHi ();
var y0 = this.getYTop ();
var y1 = this.getYBot ();
var tstart;
var ystart;
var tend;
var yend;
if (y0 < ylo) {
if (y1 <= ylo) {
return false;
}ystart = ylo;
tstart = this.TforY (ylo);
} else {
if (y0 >= yhi) {
return false;
}ystart = y0;
tstart = 0;
}if (y1 > yhi) {
yend = yhi;
tend = this.TforY (yhi);
} else {
yend = y1;
tend = 1;
}var hitLo = false;
var hitHi = false;
while (true) {
var x = this.XforT (tstart);
if (x < xhi) {
if (hitHi || x > xlo) {
return true;
}hitLo = true;
} else {
if (hitLo) {
return true;
}hitHi = true;
}if (tstart >= tend) {
break;
}tstart = this.nextVertical (tstart, tend);
}
if (hitLo) {
c.record (ystart, yend, this.direction);
}return false;
}, "sun.awt.geom.Crossings");
Clazz.defineMethod (c$, "getSubCurve", 
function (ystart, yend) {
return this.getSubCurve (ystart, yend, this.direction);
}, "~N,~N");
Clazz.defineMethod (c$, "compareTo", 
function (that, yrange) {
var y0 = yrange[0];
var y1 = yrange[1];
y1 = Math.min (Math.min (y1, this.getYBot ()), that.getYBot ());
if (y1 <= yrange[0]) {
System.err.println ("this == " + this);
System.err.println ("that == " + that);
System.out.println ("target range = " + yrange[0] + "=>" + yrange[1]);
throw  new InternalError ("sun.awt.geom.Curve backstepping from " + yrange[0] + " to " + y1);
}yrange[1] = y1;
if (this.getXMax () <= that.getXMin ()) {
if (this.getXMin () == that.getXMax ()) {
return 0;
}return -1;
}if (this.getXMin () >= that.getXMax ()) {
return 1;
}var s0 = this.TforY (y0);
var ys0 = this.YforT (s0);
if (ys0 < y0) {
s0 = this.refineTforY (s0, ys0, y0);
ys0 = this.YforT (s0);
}var s1 = this.TforY (y1);
if (this.YforT (s1) < y0) {
s1 = this.refineTforY (s1, this.YforT (s1), y0);
}var t0 = that.TforY (y0);
var yt0 = that.YforT (t0);
if (yt0 < y0) {
t0 = that.refineTforY (t0, yt0, y0);
yt0 = that.YforT (t0);
}var t1 = that.TforY (y1);
if (that.YforT (t1) < y0) {
t1 = that.refineTforY (t1, that.YforT (t1), y0);
}var xs0 = this.XforT (s0);
var xt0 = that.XforT (t0);
var scale = Math.max (Math.abs (y0), Math.abs (y1));
var ymin = Math.max (scale * 1E-14, 1E-300);
if (this.fairlyClose (xs0, xt0)) {
var bump = ymin;
var maxbump = Math.min (ymin * 1E13, (y1 - y0) * .1);
var y = y0 + bump;
while (y <= y1) {
if (this.fairlyClose (this.XforY (y), that.XforY (y))) {
if ((bump *= 2) > maxbump) {
bump = maxbump;
}} else {
y -= bump;
while (true) {
bump /= 2;
var newy = y + bump;
if (newy <= y) {
break;
}if (this.fairlyClose (this.XforY (newy), that.XforY (newy))) {
y = newy;
}}
break;
}y += bump;
}
if (y > y0) {
if (y < y1) {
yrange[1] = y;
}return 0;
}}if (ymin <= 0) {
System.out.println ("ymin = " + ymin);
}while (s0 < s1 && t0 < t1) {
var sh = this.nextVertical (s0, s1);
var xsh = this.XforT (sh);
var ysh = this.YforT (sh);
var th = that.nextVertical (t0, t1);
var xth = that.XforT (th);
var yth = that.YforT (th);
try {
if (this.findIntersect (that, yrange, ymin, 0, 0, s0, xs0, ys0, sh, xsh, ysh, t0, xt0, yt0, th, xth, yth)) {
break;
}} catch (t) {
System.err.println ("Error: " + t);
System.err.println ("y range was " + yrange[0] + "=>" + yrange[1]);
System.err.println ("s y range is " + ys0 + "=>" + ysh);
System.err.println ("t y range is " + yt0 + "=>" + yth);
System.err.println ("ymin is " + ymin);
return 0;
}
if (ysh < yth) {
if (ysh > yrange[0]) {
if (ysh < yrange[1]) {
yrange[1] = ysh;
}break;
}s0 = sh;
xs0 = xsh;
ys0 = ysh;
} else {
if (yth > yrange[0]) {
if (yth < yrange[1]) {
yrange[1] = yth;
}break;
}t0 = th;
xt0 = xth;
yt0 = yth;
}}
var ymid = (yrange[0] + yrange[1]) / 2;
return sun.awt.geom.Curve.orderof (this.XforY (ymid), that.XforY (ymid));
}, "sun.awt.geom.Curve,~A");
Clazz.defineMethod (c$, "findIntersect", 
function (that, yrange, ymin, slevel, tlevel, s0, xs0, ys0, s1, xs1, ys1, t0, xt0, yt0, t1, xt1, yt1) {
if (ys0 > yt1 || yt0 > ys1) {
return false;
}if (Math.min (xs0, xs1) > Math.max (xt0, xt1) || Math.max (xs0, xs1) < Math.min (xt0, xt1)) {
return false;
}if (s1 - s0 > 0.001) {
var s = (s0 + s1) / 2;
var xs = this.XforT (s);
var ys = this.YforT (s);
if (s == s0 || s == s1) {
System.out.println ("s0 = " + s0);
System.out.println ("s1 = " + s1);
throw  new InternalError ("no s progress!");
}if (t1 - t0 > 0.001) {
var t = (t0 + t1) / 2;
var xt = that.XforT (t);
var yt = that.YforT (t);
if (t == t0 || t == t1) {
System.out.println ("t0 = " + t0);
System.out.println ("t1 = " + t1);
throw  new InternalError ("no t progress!");
}if (ys >= yt0 && yt >= ys0) {
if (this.findIntersect (that, yrange, ymin, slevel + 1, tlevel + 1, s0, xs0, ys0, s, xs, ys, t0, xt0, yt0, t, xt, yt)) {
return true;
}}if (ys >= yt) {
if (this.findIntersect (that, yrange, ymin, slevel + 1, tlevel + 1, s0, xs0, ys0, s, xs, ys, t, xt, yt, t1, xt1, yt1)) {
return true;
}}if (yt >= ys) {
if (this.findIntersect (that, yrange, ymin, slevel + 1, tlevel + 1, s, xs, ys, s1, xs1, ys1, t0, xt0, yt0, t, xt, yt)) {
return true;
}}if (ys1 >= yt && yt1 >= ys) {
if (this.findIntersect (that, yrange, ymin, slevel + 1, tlevel + 1, s, xs, ys, s1, xs1, ys1, t, xt, yt, t1, xt1, yt1)) {
return true;
}}} else {
if (ys >= yt0) {
if (this.findIntersect (that, yrange, ymin, slevel + 1, tlevel, s0, xs0, ys0, s, xs, ys, t0, xt0, yt0, t1, xt1, yt1)) {
return true;
}}if (yt1 >= ys) {
if (this.findIntersect (that, yrange, ymin, slevel + 1, tlevel, s, xs, ys, s1, xs1, ys1, t0, xt0, yt0, t1, xt1, yt1)) {
return true;
}}}} else if (t1 - t0 > 0.001) {
var t = (t0 + t1) / 2;
var xt = that.XforT (t);
var yt = that.YforT (t);
if (t == t0 || t == t1) {
System.out.println ("t0 = " + t0);
System.out.println ("t1 = " + t1);
throw  new InternalError ("no t progress!");
}if (yt >= ys0) {
if (this.findIntersect (that, yrange, ymin, slevel, tlevel + 1, s0, xs0, ys0, s1, xs1, ys1, t0, xt0, yt0, t, xt, yt)) {
return true;
}}if (ys1 >= yt) {
if (this.findIntersect (that, yrange, ymin, slevel, tlevel + 1, s0, xs0, ys0, s1, xs1, ys1, t, xt, yt, t1, xt1, yt1)) {
return true;
}}} else {
var xlk = xs1 - xs0;
var ylk = ys1 - ys0;
var xnm = xt1 - xt0;
var ynm = yt1 - yt0;
var xmk = xt0 - xs0;
var ymk = yt0 - ys0;
var det = xnm * ylk - ynm * xlk;
if (det != 0) {
var detinv = 1 / det;
var s = (xnm * ymk - ynm * xmk) * detinv;
var t = (xlk * ymk - ylk * xmk) * detinv;
if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
s = s0 + s * (s1 - s0);
t = t0 + t * (t1 - t0);
if (s < 0 || s > 1 || t < 0 || t > 1) {
System.out.println ("Uh oh!");
}var y = (this.YforT (s) + that.YforT (t)) / 2;
if (y <= yrange[1] && y > yrange[0]) {
yrange[1] = y;
return true;
}}}}return false;
}, "sun.awt.geom.Curve,~A,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "refineTforY", 
function (t0, yt0, y0) {
var t1 = 1;
while (true) {
var th = (t0 + t1) / 2;
if (th == t0 || th == t1) {
return t1;
}var y = this.YforT (th);
if (y < y0) {
t0 = th;
yt0 = y;
} else if (y > y0) {
t1 = th;
} else {
return t1;
}}
}, "~N,~N,~N");
Clazz.defineMethod (c$, "fairlyClose", 
function (v1, v2) {
return (Math.abs (v1 - v2) < Math.max (Math.abs (v1), Math.abs (v2)) * 1E-10);
}, "~N,~N");
Clazz.defineStatics (c$,
"INCREASING", 1,
"DECREASING", -1,
"RECT_INTERSECTS", 0x80000000,
"TMIN", 1E-3);
});
