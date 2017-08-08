Clazz.declarePackage ("java.awt.geom");
Clazz.load (["java.awt.Shape", "java.awt.geom.PathIterator"], "java.awt.geom.Path2D", ["java.lang.Double", "$.IllegalArgumentException", "java.util.Arrays", "java.awt.geom.FlatteningPathIterator", "$.IllegalPathStateException", "$.Point2D", "$.Rectangle2D", "sun.awt.geom.Curve"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pointTypes = null;
this.numTypes = 0;
this.numCoords = 0;
this.windingRule = 0;
Clazz.instantialize (this, arguments);
}, java.awt.geom, "Path2D", null, [java.awt.Shape, Cloneable]);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (rule, initialTypes) {
this.setWindingRule (rule);
this.pointTypes =  Clazz.newByteArray (initialTypes, 0);
}, "~N,~N");
Clazz.defineMethod (c$, "closePath", 
function () {
if (this.numTypes == 0 || this.pointTypes[this.numTypes - 1] != 4) {
this.needRoom (true, 0);
this.pointTypes[this.numTypes++] = 4;
}});
Clazz.defineMethod (c$, "append", 
function (s, connect) {
this.append (s.getPathIterator (null), connect);
}, "java.awt.Shape,~B");
Clazz.defineMethod (c$, "getWindingRule", 
function () {
return this.windingRule;
});
Clazz.defineMethod (c$, "setWindingRule", 
function (rule) {
if (rule != 0 && rule != 1) {
throw  new IllegalArgumentException ("winding rule must be WIND_EVEN_ODD or WIND_NON_ZERO");
}this.windingRule = rule;
}, "~N");
Clazz.defineMethod (c$, "getCurrentPoint", 
function () {
var index = this.numCoords;
if (this.numTypes < 1 || index < 1) {
return null;
}if (this.pointTypes[this.numTypes - 1] == 4) {
loop : for (var i = this.numTypes - 2; i > 0; i--) {
switch (this.pointTypes[i]) {
case 0:
break loop;
case 1:
index -= 2;
break;
case 2:
index -= 4;
break;
case 3:
index -= 6;
break;
case 4:
break;
}
}
}return this.getPoint (index - 2);
});
Clazz.defineMethod (c$, "reset", 
function () {
this.numTypes = this.numCoords = 0;
});
Clazz.defineMethod (c$, "createTransformedShape", 
function (at) {
var p2d = this.clone ();
if (at != null) {
p2d.transform (at);
}return p2d;
}, "java.awt.geom.AffineTransform");
Clazz.overrideMethod (c$, "getBounds", 
function () {
return this.getBounds2D ().getBounds ();
});
c$.contains = Clazz.defineMethod (c$, "contains", 
function (pi, x, y) {
if (x * 0.0 + y * 0.0 == 0.0) {
var mask = (pi.getWindingRule () == 1 ? -1 : 1);
var cross = sun.awt.geom.Curve.pointCrossingsForPath (pi, x, y);
return ((cross & mask) != 0);
} else {
return false;
}}, "java.awt.geom.PathIterator,~N,~N");
c$.contains = Clazz.defineMethod (c$, "contains", 
function (pi, p) {
return java.awt.geom.Path2D.contains (pi, p.getX (), p.getY ());
}, "java.awt.geom.PathIterator,java.awt.geom.Point2D");
Clazz.defineMethod (c$, "contains", 
function (x, y) {
if (x * 0.0 + y * 0.0 == 0.0) {
if (this.numTypes < 2) {
return false;
}var mask = (this.windingRule == 1 ? -1 : 1);
return ((this.pointCrossings (x, y) & mask) != 0);
} else {
return false;
}}, "~N,~N");
Clazz.defineMethod (c$, "contains", 
function (p) {
return this.contains (p.getX (), p.getY ());
}, "java.awt.geom.Point2D");
c$.contains = Clazz.defineMethod (c$, "contains", 
function (pi, x, y, w, h) {
if (java.lang.Double.isNaN (x + w) || java.lang.Double.isNaN (y + h)) {
return false;
}if (w <= 0 || h <= 0) {
return false;
}var mask = (pi.getWindingRule () == 1 ? -1 : 2);
var crossings = sun.awt.geom.Curve.rectCrossingsForPath (pi, x, y, x + w, y + h);
return (crossings != -2147483648 && (crossings & mask) != 0);
}, "java.awt.geom.PathIterator,~N,~N,~N,~N");
c$.contains = Clazz.defineMethod (c$, "contains", 
function (pi, r) {
return java.awt.geom.Path2D.contains (pi, r.getX (), r.getY (), r.getWidth (), r.getHeight ());
}, "java.awt.geom.PathIterator,java.awt.geom.Rectangle2D");
Clazz.defineMethod (c$, "contains", 
function (x, y, w, h) {
if (java.lang.Double.isNaN (x + w) || java.lang.Double.isNaN (y + h)) {
return false;
}if (w <= 0 || h <= 0) {
return false;
}var mask = (this.windingRule == 1 ? -1 : 2);
var crossings = this.rectCrossings (x, y, x + w, y + h);
return (crossings != -2147483648 && (crossings & mask) != 0);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "contains", 
function (r) {
return this.contains (r.getX (), r.getY (), r.getWidth (), r.getHeight ());
}, "java.awt.geom.Rectangle2D");
c$.intersects = Clazz.defineMethod (c$, "intersects", 
function (pi, x, y, w, h) {
if (java.lang.Double.isNaN (x + w) || java.lang.Double.isNaN (y + h)) {
return false;
}if (w <= 0 || h <= 0) {
return false;
}var mask = (pi.getWindingRule () == 1 ? -1 : 2);
var crossings = sun.awt.geom.Curve.rectCrossingsForPath (pi, x, y, x + w, y + h);
return (crossings == -2147483648 || (crossings & mask) != 0);
}, "java.awt.geom.PathIterator,~N,~N,~N,~N");
c$.intersects = Clazz.defineMethod (c$, "intersects", 
function (pi, r) {
return java.awt.geom.Path2D.intersects (pi, r.getX (), r.getY (), r.getWidth (), r.getHeight ());
}, "java.awt.geom.PathIterator,java.awt.geom.Rectangle2D");
Clazz.defineMethod (c$, "intersects", 
function (x, y, w, h) {
if (java.lang.Double.isNaN (x + w) || java.lang.Double.isNaN (y + h)) {
return false;
}if (w <= 0 || h <= 0) {
return false;
}var mask = (this.windingRule == 1 ? -1 : 2);
var crossings = this.rectCrossings (x, y, x + w, y + h);
return (crossings == -2147483648 || (crossings & mask) != 0);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "intersects", 
function (r) {
return this.intersects (r.getX (), r.getY (), r.getWidth (), r.getHeight ());
}, "java.awt.geom.Rectangle2D");
Clazz.overrideMethod (c$, "getPathIterator", 
function (at, flatness) {
return  new java.awt.geom.FlatteningPathIterator (this.getPathIterator (at), flatness);
}, "java.awt.geom.AffineTransform,~N");
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.typeIdx = 0;
this.pointIdx = 0;
this.path = null;
Clazz.instantialize (this, arguments);
}, java.awt.geom.Path2D, "Iterator", null, java.awt.geom.PathIterator);
Clazz.makeConstructor (c$, 
function (a) {
this.path = a;
}, "java.awt.geom.Path2D");
Clazz.overrideMethod (c$, "getWindingRule", 
function () {
return this.path.getWindingRule ();
});
Clazz.overrideMethod (c$, "isDone", 
function () {
return (this.typeIdx >= this.path.numTypes);
});
Clazz.overrideMethod (c$, "next", 
function () {
var a = this.path.pointTypes[this.typeIdx++];
this.pointIdx += java.awt.geom.Path2D.Iterator.curvecoords[a];
});
Clazz.defineStatics (c$,
"curvecoords",  Clazz.newIntArray (-1, [2, 2, 4, 6, 0]));
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.floatCoords = null;
Clazz.instantialize (this, arguments);
}, java.awt.geom.Path2D, "Float", java.awt.geom.Path2D);
Clazz.makeConstructor (c$, 
function () {
this.construct (1, 20);
});
Clazz.makeConstructor (c$, 
function (a) {
this.construct (a, 20);
}, "~N");
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, java.awt.geom.Path2D.Float, []);
this.setWindingRule (a);
this.pointTypes =  Clazz.newByteArray (b, 0);
this.floatCoords =  Clazz.newFloatArray (b * 2, 0);
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (a) {
this.construct (a, null);
}, "java.awt.Shape");
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, java.awt.geom.Path2D.Float, []);
this.setPath (a, b);
}, "java.awt.Shape,java.awt.geom.AffineTransform");
Clazz.defineMethod (c$, "setPath", 
 function (a, b) {
if (Clazz.instanceOf (a, java.awt.geom.Path2D)) {
var c = a;
this.setWindingRule (c.windingRule);
this.numTypes = c.numTypes;
this.pointTypes = java.util.Arrays.copyOf (c.pointTypes, c.pointTypes.length);
this.numCoords = c.numCoords;
this.floatCoords = c.cloneCoordsFloat (b);
} else {
var c = a.getPathIterator (b);
this.setWindingRule (c.getWindingRule ());
this.pointTypes =  Clazz.newByteArray (20, 0);
this.floatCoords =  Clazz.newFloatArray (40, 0);
this.append (c, false);
}}, "java.awt.Shape,java.awt.geom.AffineTransform");
Clazz.defineMethod (c$, "cloneCoordsFloat", 
function (a) {
var b;
if (a == null) {
b = java.util.Arrays.copyOf (this.floatCoords, this.floatCoords.length);
} else {
b =  Clazz.newFloatArray (this.floatCoords.length, 0);
a.transform (this.floatCoords, 0, b, 0, Clazz.doubleToInt (this.numCoords / 2));
}return b;
}, "java.awt.geom.AffineTransform");
Clazz.overrideMethod (c$, "cloneCoordsDouble", 
function (a) {
var b =  Clazz.newDoubleArray (this.floatCoords.length, 0);
if (a == null) {
for (var c = 0; c < this.numCoords; c++) {
b[c] = this.floatCoords[c];
}
} else {
a.transform (this.floatCoords, 0, b, 0, Clazz.doubleToInt (this.numCoords / 2));
}return b;
}, "java.awt.geom.AffineTransform");
Clazz.defineMethod (c$, "append", 
function (a, b) {
{
if (typeof pi == "number") {
this.floatCoords[this.numCoords++] = pi;
this.floatCoords[this.numCoords++] = connect;
return;
}
}var c =  Clazz.newFloatArray (6, 0);
while (!a.isDone ()) {
switch (a.currentSegment (c)) {
case 0:
if (!b || this.numTypes < 1 || this.numCoords < 1) {
this.moveTo (c[0], c[1]);
break;
}if (this.pointTypes[this.numTypes - 1] != 4 && this.floatCoords[this.numCoords - 2] == c[0] && this.floatCoords[this.numCoords - 1] == c[1]) {
break;
}case 1:
this.lineTo (c[0], c[1]);
break;
case 2:
this.quadTo (c[0], c[1], c[2], c[3]);
break;
case 3:
this.curveTo (c[0], c[1], c[2], c[3], c[4], c[5]);
break;
case 4:
this.closePath ();
break;
}
a.next ();
b = false;
}
}, "java.awt.geom.PathIterator,~B");
Clazz.overrideMethod (c$, "getPoint", 
function (a) {
return  new java.awt.geom.Point2D.Float (this.floatCoords[a], this.floatCoords[a + 1]);
}, "~N");
Clazz.overrideMethod (c$, "needRoom", 
function (a, b) {
if (a && this.numTypes == 0) {
throw  new java.awt.geom.IllegalPathStateException ("missing initial moveto in path definition");
}var c = this.pointTypes.length;
if (this.numTypes >= c) {
var d = c;
if (d > 500) {
d = 500;
}this.pointTypes = java.util.Arrays.copyOf (this.pointTypes, c + d);
}c = this.floatCoords.length;
if (this.numCoords + b > c) {
var d = c;
if (d > 1000) {
d = 1000;
}if (d < b) {
d = b;
}this.floatCoords = java.util.Arrays.copyOf (this.floatCoords, c + d);
}}, "~B,~N");
Clazz.defineMethod (c$, "moveTo", 
function (a, b) {
if (this.numTypes > 0 && this.pointTypes[this.numTypes - 1] == 0) {
this.floatCoords[this.numCoords - 2] = a;
this.floatCoords[this.numCoords - 1] = b;
} else {
this.needRoom (false, 2);
this.pointTypes[this.numTypes++] = 0;
this.floatCoords[this.numCoords++] = a;
this.floatCoords[this.numCoords++] = b;
}}, "~N,~N");
Clazz.defineMethod (c$, "moveTo", 
function (a, b) {
if (this.numTypes > 0 && this.pointTypes[this.numTypes - 1] == 0) {
this.floatCoords[this.numCoords - 2] = a;
this.floatCoords[this.numCoords - 1] = b;
} else {
this.needRoom (false, 2);
this.pointTypes[this.numTypes++] = 0;
this.floatCoords[this.numCoords++] = a;
this.floatCoords[this.numCoords++] = b;
}}, "~N,~N");
Clazz.defineMethod (c$, "lineTo", 
function (a, b) {
this.needRoom (true, 2);
this.pointTypes[this.numTypes++] = 1;
this.floatCoords[this.numCoords++] = a;
this.floatCoords[this.numCoords++] = b;
}, "~N,~N");
Clazz.defineMethod (c$, "lineTo", 
function (a, b) {
this.needRoom (true, 2);
this.pointTypes[this.numTypes++] = 1;
this.floatCoords[this.numCoords++] = a;
this.floatCoords[this.numCoords++] = b;
}, "~N,~N");
Clazz.defineMethod (c$, "quadTo", 
function (a, b, c, d) {
this.needRoom (true, 4);
this.pointTypes[this.numTypes++] = 2;
this.floatCoords[this.numCoords++] = a;
this.floatCoords[this.numCoords++] = b;
this.floatCoords[this.numCoords++] = c;
this.floatCoords[this.numCoords++] = d;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "quadTo", 
function (a, b, c, d) {
this.needRoom (true, 4);
this.pointTypes[this.numTypes++] = 2;
this.floatCoords[this.numCoords++] = a;
this.floatCoords[this.numCoords++] = b;
this.floatCoords[this.numCoords++] = c;
this.floatCoords[this.numCoords++] = d;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "curveTo", 
function (a, b, c, d, e, f) {
this.needRoom (true, 6);
this.pointTypes[this.numTypes++] = 3;
this.floatCoords[this.numCoords++] = a;
this.floatCoords[this.numCoords++] = b;
this.floatCoords[this.numCoords++] = c;
this.floatCoords[this.numCoords++] = d;
this.floatCoords[this.numCoords++] = e;
this.floatCoords[this.numCoords++] = f;
}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "curveTo", 
function (a, b, c, d, e, f) {
this.needRoom (true, 6);
this.pointTypes[this.numTypes++] = 3;
this.floatCoords[this.numCoords++] = a;
this.floatCoords[this.numCoords++] = b;
this.floatCoords[this.numCoords++] = c;
this.floatCoords[this.numCoords++] = d;
this.floatCoords[this.numCoords++] = e;
this.floatCoords[this.numCoords++] = f;
}, "~N,~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "pointCrossings", 
function (a, b) {
var c;
var d;
var e;
var f;
var g;
var h;
var i = this.floatCoords;
e = c = i[0];
f = d = i[1];
var j = 0;
var k = 2;
for (var l = 1; l < this.numTypes; l++) {
switch (this.pointTypes[l]) {
case 0:
if (f != d) {
j += sun.awt.geom.Curve.pointCrossingsForLine (a, b, e, f, c, d);
}c = e = i[k++];
d = f = i[k++];
break;
case 1:
j += sun.awt.geom.Curve.pointCrossingsForLine (a, b, e, f, g = i[k++], h = i[k++]);
e = g;
f = h;
break;
case 2:
j += sun.awt.geom.Curve.pointCrossingsForQuad (a, b, e, f, i[k++], i[k++], g = i[k++], h = i[k++], 0);
e = g;
f = h;
break;
case 3:
j += sun.awt.geom.Curve.pointCrossingsForCubic (a, b, e, f, i[k++], i[k++], i[k++], i[k++], g = i[k++], h = i[k++], 0);
e = g;
f = h;
break;
case 4:
if (f != d) {
j += sun.awt.geom.Curve.pointCrossingsForLine (a, b, e, f, c, d);
}e = c;
f = d;
break;
}
}
if (f != d) {
j += sun.awt.geom.Curve.pointCrossingsForLine (a, b, e, f, c, d);
}return j;
}, "~N,~N");
Clazz.overrideMethod (c$, "rectCrossings", 
function (a, b, c, d) {
var e = this.floatCoords;
var f;
var g;
var h;
var i;
var j;
var k;
f = h = e[0];
g = i = e[1];
var l = 0;
var m = 2;
for (var n = 1; l != -2147483648 && n < this.numTypes; n++) {
switch (this.pointTypes[n]) {
case 0:
if (f != h || g != i) {
l = sun.awt.geom.Curve.rectCrossingsForLine (l, a, b, c, d, f, g, h, i);
}h = f = e[m++];
i = g = e[m++];
break;
case 1:
l = sun.awt.geom.Curve.rectCrossingsForLine (l, a, b, c, d, f, g, j = e[m++], k = e[m++]);
f = j;
g = k;
break;
case 2:
l = sun.awt.geom.Curve.rectCrossingsForQuad (l, a, b, c, d, f, g, e[m++], e[m++], j = e[m++], k = e[m++], 0);
f = j;
g = k;
break;
case 3:
l = sun.awt.geom.Curve.rectCrossingsForCubic (l, a, b, c, d, f, g, e[m++], e[m++], e[m++], e[m++], j = e[m++], k = e[m++], 0);
f = j;
g = k;
break;
case 4:
if (f != h || g != i) {
l = sun.awt.geom.Curve.rectCrossingsForLine (l, a, b, c, d, f, g, h, i);
}f = h;
g = i;
break;
}
}
if (l != -2147483648 && (f != h || g != i)) {
l = sun.awt.geom.Curve.rectCrossingsForLine (l, a, b, c, d, f, g, h, i);
}return l;
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "transform", 
function (a) {
a.transform (this.floatCoords, 0, this.floatCoords, 0, Clazz.doubleToInt (this.numCoords / 2));
}, "java.awt.geom.AffineTransform");
Clazz.overrideMethod (c$, "getBounds2D", 
function () {
var a;
var b;
var c;
var d;
var e = this.numCoords;
if (e > 0) {
b = d = this.floatCoords[--e];
a = c = this.floatCoords[--e];
while (e > 0) {
var f = this.floatCoords[--e];
var g = this.floatCoords[--e];
if (g < a) a = g;
if (f < b) b = f;
if (g > c) c = g;
if (f > d) d = f;
}
} else {
a = b = c = d = 0.0;
}return  new java.awt.geom.Rectangle2D.Float (a, b, c - a, d - b);
});
Clazz.defineMethod (c$, "getPathIterator", 
function (a) {
if (a == null) {
return  new java.awt.geom.Path2D.Float.CopyIterator (this);
} else {
return  new java.awt.geom.Path2D.Float.TxIterator (this, a);
}}, "java.awt.geom.AffineTransform");
Clazz.overrideMethod (c$, "clone", 
function () {
return  new java.awt.geom.Path2D.Float (this);
});
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.floatCoords = null;
Clazz.instantialize (this, arguments);
}, java.awt.geom.Path2D.Float, "CopyIterator", java.awt.geom.Path2D.Iterator);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, java.awt.geom.Path2D.Float.CopyIterator, [a]);
this.floatCoords = a.floatCoords;
}, "java.awt.geom.Path2D.Float");
Clazz.defineMethod (c$, "currentSegment", 
function (a) {
var b = this.path.pointTypes[this.typeIdx];
var c = java.awt.geom.Path2D.Iterator.curvecoords[b];
if (c > 0) {
for (var d = 0; d < c; d++) {
a[d] = this.floatCoords[this.pointIdx + d];
}
}return b;
}, "~A");
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.floatCoords = null;
this.affine = null;
Clazz.instantialize (this, arguments);
}, java.awt.geom.Path2D.Float, "TxIterator", java.awt.geom.Path2D.Iterator);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, java.awt.geom.Path2D.Float.TxIterator, [a]);
this.floatCoords = a.floatCoords;
this.affine = b;
}, "java.awt.geom.Path2D.Float,java.awt.geom.AffineTransform");
Clazz.defineMethod (c$, "currentSegment", 
function (a) {
var b = this.path.pointTypes[this.typeIdx];
var c = java.awt.geom.Path2D.Iterator.curvecoords[b];
if (c > 0) {
this.affine.transform (this.floatCoords, this.pointIdx, a, 0, Clazz.doubleToInt (c / 2));
}return b;
}, "~A");
c$ = Clazz.p0p ();
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.doubleCoords = null;
Clazz.instantialize (this, arguments);
}, java.awt.geom.Path2D, "Double", java.awt.geom.Path2D);
Clazz.makeConstructor (c$, 
function () {
this.construct (1, 20);
});
Clazz.makeConstructor (c$, 
function (a) {
this.construct (a, 20);
}, "~N");
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, java.awt.geom.Path2D.Double, [a, b]);
this.doubleCoords =  Clazz.newDoubleArray (b * 2, 0);
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (a) {
this.construct (a, null);
}, "java.awt.Shape");
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, java.awt.geom.Path2D.Double, []);
if (Clazz.instanceOf (a, java.awt.geom.Path2D)) {
var c = a;
this.setWindingRule (c.windingRule);
this.numTypes = c.numTypes;
this.pointTypes = java.util.Arrays.copyOf (c.pointTypes, c.pointTypes.length);
this.numCoords = c.numCoords;
this.doubleCoords = c.cloneCoordsDouble (b);
} else {
var c = a.getPathIterator (b);
this.setWindingRule (c.getWindingRule ());
this.pointTypes =  Clazz.newByteArray (20, 0);
this.doubleCoords =  Clazz.newDoubleArray (40, 0);
this.append (c, false);
}}, "java.awt.Shape,java.awt.geom.AffineTransform");
Clazz.overrideMethod (c$, "cloneCoordsFloat", 
function (a) {
var b =  Clazz.newFloatArray (this.doubleCoords.length, 0);
if (a == null) {
for (var c = 0; c < this.numCoords; c++) {
b[c] = this.doubleCoords[c];
}
} else {
a.transform (this.doubleCoords, 0, b, 0, Clazz.doubleToInt (this.numCoords / 2));
}return b;
}, "java.awt.geom.AffineTransform");
Clazz.defineMethod (c$, "cloneCoordsDouble", 
function (a) {
var b;
if (a == null) {
b = java.util.Arrays.copyOf (this.doubleCoords, this.doubleCoords.length);
} else {
b =  Clazz.newDoubleArray (this.doubleCoords.length, 0);
a.transform (this.doubleCoords, 0, b, 0, Clazz.doubleToInt (this.numCoords / 2));
}return b;
}, "java.awt.geom.AffineTransform");
Clazz.defineMethod (c$, "append", 
function (a, b) {
{
if (typeof pi == "number") {
this.floatCoords[this.numCoords++] = pi;
this.floatCoords[this.numCoords++] = connect;
return;
}
}var c =  Clazz.newDoubleArray (6, 0);
while (!a.isDone ()) {
switch (a.currentSegment (c)) {
case 0:
if (!b || this.numTypes < 1 || this.numCoords < 1) {
this.moveTo (c[0], c[1]);
break;
}if (this.pointTypes[this.numTypes - 1] != 4 && this.doubleCoords[this.numCoords - 2] == c[0] && this.doubleCoords[this.numCoords - 1] == c[1]) {
break;
}case 1:
this.lineTo (c[0], c[1]);
break;
case 2:
this.quadTo (c[0], c[1], c[2], c[3]);
break;
case 3:
this.curveTo (c[0], c[1], c[2], c[3], c[4], c[5]);
break;
case 4:
this.closePath ();
break;
}
a.next ();
b = false;
}
}, "java.awt.geom.PathIterator,~B");
Clazz.overrideMethod (c$, "getPoint", 
function (a) {
return  new java.awt.geom.Point2D.Double (this.doubleCoords[a], this.doubleCoords[a + 1]);
}, "~N");
Clazz.overrideMethod (c$, "needRoom", 
function (a, b) {
if (a && this.numTypes == 0) {
throw  new java.awt.geom.IllegalPathStateException ("missing initial moveto in path definition");
}var c = this.pointTypes.length;
if (this.numTypes >= c) {
var d = c;
if (d > 500) {
d = 500;
}this.pointTypes = java.util.Arrays.copyOf (this.pointTypes, c + d);
}c = this.doubleCoords.length;
if (this.numCoords + b > c) {
var d = c;
if (d > 1000) {
d = 1000;
}if (d < b) {
d = b;
}this.doubleCoords = java.util.Arrays.copyOf (this.doubleCoords, c + d);
}}, "~B,~N");
Clazz.overrideMethod (c$, "moveTo", 
function (a, b) {
if (this.numTypes > 0 && this.pointTypes[this.numTypes - 1] == 0) {
this.doubleCoords[this.numCoords - 2] = a;
this.doubleCoords[this.numCoords - 1] = b;
} else {
this.needRoom (false, 2);
this.pointTypes[this.numTypes++] = 0;
this.doubleCoords[this.numCoords++] = a;
this.doubleCoords[this.numCoords++] = b;
}}, "~N,~N");
Clazz.overrideMethod (c$, "lineTo", 
function (a, b) {
this.needRoom (true, 2);
this.pointTypes[this.numTypes++] = 1;
this.doubleCoords[this.numCoords++] = a;
this.doubleCoords[this.numCoords++] = b;
}, "~N,~N");
Clazz.overrideMethod (c$, "quadTo", 
function (a, b, c, d) {
this.needRoom (true, 4);
this.pointTypes[this.numTypes++] = 2;
this.doubleCoords[this.numCoords++] = a;
this.doubleCoords[this.numCoords++] = b;
this.doubleCoords[this.numCoords++] = c;
this.doubleCoords[this.numCoords++] = d;
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "curveTo", 
function (a, b, c, d, e, f) {
this.needRoom (true, 6);
this.pointTypes[this.numTypes++] = 3;
this.doubleCoords[this.numCoords++] = a;
this.doubleCoords[this.numCoords++] = b;
this.doubleCoords[this.numCoords++] = c;
this.doubleCoords[this.numCoords++] = d;
this.doubleCoords[this.numCoords++] = e;
this.doubleCoords[this.numCoords++] = f;
}, "~N,~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "pointCrossings", 
function (a, b) {
var c;
var d;
var e;
var f;
var g;
var h;
var i = this.doubleCoords;
e = c = i[0];
f = d = i[1];
var j = 0;
var k = 2;
for (var l = 1; l < this.numTypes; l++) {
switch (this.pointTypes[l]) {
case 0:
if (f != d) {
j += sun.awt.geom.Curve.pointCrossingsForLine (a, b, e, f, c, d);
}c = e = i[k++];
d = f = i[k++];
break;
case 1:
j += sun.awt.geom.Curve.pointCrossingsForLine (a, b, e, f, g = i[k++], h = i[k++]);
e = g;
f = h;
break;
case 2:
j += sun.awt.geom.Curve.pointCrossingsForQuad (a, b, e, f, i[k++], i[k++], g = i[k++], h = i[k++], 0);
e = g;
f = h;
break;
case 3:
j += sun.awt.geom.Curve.pointCrossingsForCubic (a, b, e, f, i[k++], i[k++], i[k++], i[k++], g = i[k++], h = i[k++], 0);
e = g;
f = h;
break;
case 4:
if (f != d) {
j += sun.awt.geom.Curve.pointCrossingsForLine (a, b, e, f, c, d);
}e = c;
f = d;
break;
}
}
if (f != d) {
j += sun.awt.geom.Curve.pointCrossingsForLine (a, b, e, f, c, d);
}return j;
}, "~N,~N");
Clazz.overrideMethod (c$, "rectCrossings", 
function (a, b, c, d) {
var e = this.doubleCoords;
var f;
var g;
var h;
var i;
var j;
var k;
f = h = e[0];
g = i = e[1];
var l = 0;
var m = 2;
for (var n = 1; l != -2147483648 && n < this.numTypes; n++) {
switch (this.pointTypes[n]) {
case 0:
if (f != h || g != i) {
l = sun.awt.geom.Curve.rectCrossingsForLine (l, a, b, c, d, f, g, h, i);
}h = f = e[m++];
i = g = e[m++];
break;
case 1:
j = e[m++];
k = e[m++];
l = sun.awt.geom.Curve.rectCrossingsForLine (l, a, b, c, d, f, g, j, k);
f = j;
g = k;
break;
case 2:
l = sun.awt.geom.Curve.rectCrossingsForQuad (l, a, b, c, d, f, g, e[m++], e[m++], j = e[m++], k = e[m++], 0);
f = j;
g = k;
break;
case 3:
l = sun.awt.geom.Curve.rectCrossingsForCubic (l, a, b, c, d, f, g, e[m++], e[m++], e[m++], e[m++], j = e[m++], k = e[m++], 0);
f = j;
g = k;
break;
case 4:
if (f != h || g != i) {
l = sun.awt.geom.Curve.rectCrossingsForLine (l, a, b, c, d, f, g, h, i);
}f = h;
g = i;
break;
}
}
if (l != -2147483648 && (f != h || g != i)) {
l = sun.awt.geom.Curve.rectCrossingsForLine (l, a, b, c, d, f, g, h, i);
}return l;
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "transform", 
function (a) {
a.transform (this.doubleCoords, 0, this.doubleCoords, 0, Clazz.doubleToInt (this.numCoords / 2));
}, "java.awt.geom.AffineTransform");
Clazz.overrideMethod (c$, "getBounds2D", 
function () {
var a;
var b;
var c;
var d;
var e = this.numCoords;
if (e > 0) {
b = d = this.doubleCoords[--e];
a = c = this.doubleCoords[--e];
while (e > 0) {
var f = this.doubleCoords[--e];
var g = this.doubleCoords[--e];
if (g < a) a = g;
if (f < b) b = f;
if (g > c) c = g;
if (f > d) d = f;
}
} else {
a = b = c = d = 0.0;
}return  new java.awt.geom.Rectangle2D.Double (a, b, c - a, d - b);
});
Clazz.defineMethod (c$, "getPathIterator", 
function (a) {
if (a == null) {
return  new java.awt.geom.Path2D.Double.CopyIterator (this);
} else {
return  new java.awt.geom.Path2D.Double.TxIterator (this, a);
}}, "java.awt.geom.AffineTransform");
Clazz.overrideMethod (c$, "clone", 
function () {
return  new java.awt.geom.Path2D.Double (this);
});
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.doubleCoords = null;
Clazz.instantialize (this, arguments);
}, java.awt.geom.Path2D.Double, "CopyIterator", java.awt.geom.Path2D.Iterator);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, java.awt.geom.Path2D.Double.CopyIterator, [a]);
this.doubleCoords = a.doubleCoords;
}, "java.awt.geom.Path2D.Double");
Clazz.defineMethod (c$, "currentSegment", 
function (a) {
var b = this.path.pointTypes[this.typeIdx];
var c = java.awt.geom.Path2D.Iterator.curvecoords[b];
if (c > 0) {
for (var d = 0; d < c; d++) {
a[d] = this.doubleCoords[this.pointIdx + d];
}
}return b;
}, "~A");
Clazz.defineMethod (c$, "currentSegment", 
function (a) {
var b = this.path.pointTypes[this.typeIdx];
var c = java.awt.geom.Path2D.Iterator.curvecoords[b];
if (c > 0) {
System.arraycopy (this.doubleCoords, this.pointIdx, a, 0, c);
}return b;
}, "~A");
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.doubleCoords = null;
this.affine = null;
Clazz.instantialize (this, arguments);
}, java.awt.geom.Path2D.Double, "TxIterator", java.awt.geom.Path2D.Iterator);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, java.awt.geom.Path2D.Double.TxIterator, [a]);
this.doubleCoords = a.doubleCoords;
this.affine = b;
}, "java.awt.geom.Path2D.Double,java.awt.geom.AffineTransform");
Clazz.defineMethod (c$, "currentSegment", 
function (a) {
var b = this.path.pointTypes[this.typeIdx];
var c = java.awt.geom.Path2D.Iterator.curvecoords[b];
if (c > 0) {
this.affine.transform (this.doubleCoords, this.pointIdx, a, 0, Clazz.doubleToInt (c / 2));
}return b;
}, "~A");
Clazz.defineMethod (c$, "currentSegment", 
function (a) {
var b = this.path.pointTypes[this.typeIdx];
var c = java.awt.geom.Path2D.Iterator.curvecoords[b];
if (c > 0) {
this.affine.transform (this.doubleCoords, this.pointIdx, a, 0, Clazz.doubleToInt (c / 2));
}return b;
}, "~A");
c$ = Clazz.p0p ();
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"WIND_EVEN_ODD", 0,
"WIND_NON_ZERO", 1,
"SEG_MOVETO", 0,
"SEG_LINETO", 1,
"SEG_QUADTO", 2,
"SEG_CUBICTO", 3,
"SEG_CLOSE", 4,
"INIT_SIZE", 20,
"EXPAND_MAX", 500);
});
