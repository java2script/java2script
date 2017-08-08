Clazz.declarePackage ("java.awt");
Clazz.load (["java.awt.Shape", "java.awt.geom.Rectangle2D"], "java.awt.Rectangle", ["java.awt.Dimension", "$.Point"], function () {
c$ = Clazz.decorateAsClass (function () {
this.x = 0;
this.y = 0;
this.width = 0;
this.height = 0;
Clazz.instantialize (this, arguments);
}, java.awt, "Rectangle", java.awt.geom.Rectangle2D, java.awt.Shape);
Clazz.makeConstructor (c$, 
function () {
this.construct (0, 0, 0, 0);
});
Clazz.makeConstructor (c$, 
function (r) {
this.construct (r.x, r.y, r.width, r.height);
}, "java.awt.Rectangle");
Clazz.makeConstructor (c$, 
function (x, y, width, height) {
Clazz.superConstructor (this, java.awt.Rectangle, []);
this.x = x;
this.y = y;
this.width = width;
this.height = height;
}, "~N,~N,~N,~N");
Clazz.makeConstructor (c$, 
function (width, height) {
this.construct (0, 0, width, height);
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (p, d) {
this.construct (p.x, p.y, d.width, d.height);
}, "java.awt.Point,java.awt.Dimension");
Clazz.makeConstructor (c$, 
function (p) {
this.construct (p.x, p.y, 0, 0);
}, "java.awt.Point");
Clazz.makeConstructor (c$, 
function (d) {
this.construct (0, 0, d.width, d.height);
}, "java.awt.Dimension");
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
Clazz.overrideMethod (c$, "getBounds", 
function () {
return  new java.awt.Rectangle (this.x, this.y, this.width, this.height);
});
Clazz.overrideMethod (c$, "getBounds2D", 
function () {
return  new java.awt.Rectangle (this.x, this.y, this.width, this.height);
});
Clazz.defineMethod (c$, "setBounds", 
function (r) {
this.reshape (r.x, r.y, r.width, r.height);
}, "java.awt.Rectangle");
Clazz.defineMethod (c$, "setBounds", 
function (x, y, width, height) {
this.reshape (x, y, width, height);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setRect", 
function (x, y, width, height) {
var newx;
var newy;
var neww;
var newh;
if (x > 4.294967294E9) {
newx = 2147483647;
neww = -1;
} else {
newx = java.awt.Rectangle.clip (x, false);
if (width >= 0) width += x - newx;
neww = java.awt.Rectangle.clip (width, width >= 0);
}if (y > 4.294967294E9) {
newy = 2147483647;
newh = -1;
} else {
newy = java.awt.Rectangle.clip (y, false);
if (height >= 0) height += y - newy;
newh = java.awt.Rectangle.clip (height, height >= 0);
}this.reshape (newx, newy, neww, newh);
}, "~N,~N,~N,~N");
c$.clip = Clazz.defineMethod (c$, "clip", 
 function (v, doceil) {
if (v <= -2147483648) {
return -2147483648;
}if (v >= 2147483647) {
return 2147483647;
}return Clazz.doubleToInt (doceil ? Math.ceil (v) : Math.floor (v));
}, "~N,~B");
Clazz.defineMethod (c$, "reshape", 
function (x, y, width, height) {
this.x = x;
this.y = y;
this.width = width;
this.height = height;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "getLocation", 
function () {
return  new java.awt.Point (this.x, this.y);
});
Clazz.defineMethod (c$, "setLocation", 
function (p) {
this.setLocation (p.x, p.y);
}, "java.awt.Point");
Clazz.defineMethod (c$, "setLocation", 
function (x, y) {
this.move (x, y);
}, "~N,~N");
Clazz.defineMethod (c$, "move", 
function (x, y) {
this.x = x;
this.y = y;
}, "~N,~N");
Clazz.defineMethod (c$, "translate", 
function (dx, dy) {
var oldv = this.x;
var newv = oldv + dx;
if (dx < 0) {
if (newv > oldv) {
if (this.width >= 0) {
this.width += newv - -2147483648;
}newv = -2147483648;
}} else {
if (newv < oldv) {
if (this.width >= 0) {
this.width += newv - 2147483647;
if (this.width < 0) this.width = 2147483647;
}newv = 2147483647;
}}this.x = newv;
oldv = this.y;
newv = oldv + dy;
if (dy < 0) {
if (newv > oldv) {
if (this.height >= 0) {
this.height += newv - -2147483648;
}newv = -2147483648;
}} else {
if (newv < oldv) {
if (this.height >= 0) {
this.height += newv - 2147483647;
if (this.height < 0) this.height = 2147483647;
}newv = 2147483647;
}}this.y = newv;
}, "~N,~N");
Clazz.defineMethod (c$, "getSize", 
function () {
return  new java.awt.Dimension (this.width, this.height);
});
Clazz.defineMethod (c$, "setSize", 
function (d) {
this.setSize (d.width, d.height);
}, "java.awt.Dimension");
Clazz.defineMethod (c$, "setSize", 
function (width, height) {
this.resize (width, height);
}, "~N,~N");
Clazz.defineMethod (c$, "resize", 
function (width, height) {
this.width = width;
this.height = height;
}, "~N,~N");
Clazz.defineMethod (c$, "contains", 
function (p) {
return this.contains (p.x, p.y);
}, "java.awt.Point");
Clazz.defineMethod (c$, "contains", 
function (x, y) {
return this.inside (x, y);
}, "~N,~N");
Clazz.defineMethod (c$, "contains", 
function (r) {
return this.contains (r.x, r.y, r.width, r.height);
}, "java.awt.Rectangle");
Clazz.defineMethod (c$, "contains", 
function (X, Y, W, H) {
var w = this.width;
var h = this.height;
if ((w | h | W | H) < 0) {
return false;
}var x = this.x;
var y = this.y;
if (X < x || Y < y) {
return false;
}w += x;
W += X;
if (W <= X) {
if (w >= x || W > w) return false;
} else {
if (w >= x && W > w) return false;
}h += y;
H += Y;
if (H <= Y) {
if (h >= y || H > h) return false;
} else {
if (h >= y && H > h) return false;
}return true;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "inside", 
function (X, Y) {
var w = this.width;
var h = this.height;
if ((w | h) < 0) {
return false;
}var x = this.x;
var y = this.y;
if (X < x || Y < y) {
return false;
}w += x;
h += y;
return ((w < x || w > X) && (h < y || h > Y));
}, "~N,~N");
Clazz.defineMethod (c$, "intersects", 
function (r) {
var tw = this.width;
var th = this.height;
var rw = r.width;
var rh = r.height;
if (rw <= 0 || rh <= 0 || tw <= 0 || th <= 0) {
return false;
}var tx = this.x;
var ty = this.y;
var rx = r.x;
var ry = r.y;
rw += rx;
rh += ry;
tw += tx;
th += ty;
return ((rw < rx || rw > tx) && (rh < ry || rh > ty) && (tw < tx || tw > rx) && (th < ty || th > ry));
}, "java.awt.Rectangle");
Clazz.defineMethod (c$, "intersection", 
function (r) {
var tx1 = this.x;
var ty1 = this.y;
var rx1 = r.x;
var ry1 = r.y;
var tx2 = tx1;
tx2 += this.width;
var ty2 = ty1;
ty2 += this.height;
var rx2 = rx1;
rx2 += r.width;
var ry2 = ry1;
ry2 += r.height;
if (tx1 < rx1) tx1 = rx1;
if (ty1 < ry1) ty1 = ry1;
if (tx2 > rx2) tx2 = rx2;
if (ty2 > ry2) ty2 = ry2;
tx2 -= tx1;
ty2 -= ty1;
if (tx2 < -2147483648) tx2 = -2147483648;
if (ty2 < -2147483648) ty2 = -2147483648;
return  new java.awt.Rectangle (tx1, ty1, tx2, ty2);
}, "java.awt.Rectangle");
Clazz.defineMethod (c$, "union", 
function (r) {
var tx2 = this.width;
var ty2 = this.height;
if ((tx2 | ty2) < 0) {
return  new java.awt.Rectangle (r);
}var rx2 = r.width;
var ry2 = r.height;
if ((rx2 | ry2) < 0) {
return  new java.awt.Rectangle (this);
}var tx1 = this.x;
var ty1 = this.y;
tx2 += tx1;
ty2 += ty1;
var rx1 = r.x;
var ry1 = r.y;
rx2 += rx1;
ry2 += ry1;
if (tx1 > rx1) tx1 = rx1;
if (ty1 > ry1) ty1 = ry1;
if (tx2 < rx2) tx2 = rx2;
if (ty2 < ry2) ty2 = ry2;
tx2 -= tx1;
ty2 -= ty1;
if (tx2 > 2147483647) tx2 = 2147483647;
if (ty2 > 2147483647) ty2 = 2147483647;
return  new java.awt.Rectangle (tx1, ty1, tx2, ty2);
}, "java.awt.Rectangle");
Clazz.defineMethod (c$, "add", 
function (newx, newy) {
if ((this.width | this.height) < 0) {
this.x = newx;
this.y = newy;
this.width = this.height = 0;
return;
}var x1 = this.x;
var y1 = this.y;
var x2 = this.width;
var y2 = this.height;
x2 += x1;
y2 += y1;
if (x1 > newx) x1 = newx;
if (y1 > newy) y1 = newy;
if (x2 < newx) x2 = newx;
if (y2 < newy) y2 = newy;
x2 -= x1;
y2 -= y1;
if (x2 > 2147483647) x2 = 2147483647;
if (y2 > 2147483647) y2 = 2147483647;
this.reshape (x1, y1, x2, y2);
}, "~N,~N");
Clazz.defineMethod (c$, "add", 
function (pt) {
this.add (pt.x, pt.y);
}, "java.awt.Point");
Clazz.defineMethod (c$, "add", 
function (r) {
var tx2 = this.width;
var ty2 = this.height;
if ((tx2 | ty2) < 0) {
this.reshape (r.x, r.y, r.width, r.height);
}var rx2 = r.width;
var ry2 = r.height;
if ((rx2 | ry2) < 0) {
return;
}var tx1 = this.x;
var ty1 = this.y;
tx2 += tx1;
ty2 += ty1;
var rx1 = r.x;
var ry1 = r.y;
rx2 += rx1;
ry2 += ry1;
if (tx1 > rx1) tx1 = rx1;
if (ty1 > ry1) ty1 = ry1;
if (tx2 < rx2) tx2 = rx2;
if (ty2 < ry2) ty2 = ry2;
tx2 -= tx1;
ty2 -= ty1;
if (tx2 > 2147483647) tx2 = 2147483647;
if (ty2 > 2147483647) ty2 = 2147483647;
this.reshape (tx1, ty1, tx2, ty2);
}, "java.awt.Rectangle");
Clazz.defineMethod (c$, "grow", 
function (h, v) {
var x0 = this.x;
var y0 = this.y;
var x1 = this.width;
var y1 = this.height;
x1 += x0;
y1 += y0;
x0 -= h;
y0 -= v;
x1 += h;
y1 += v;
if (x1 < x0) {
x1 -= x0;
if (x1 < -2147483648) x1 = -2147483648;
if (x0 < -2147483648) x0 = -2147483648;
 else if (x0 > 2147483647) x0 = 2147483647;
} else {
if (x0 < -2147483648) x0 = -2147483648;
 else if (x0 > 2147483647) x0 = 2147483647;
x1 -= x0;
if (x1 < -2147483648) x1 = -2147483648;
 else if (x1 > 2147483647) x1 = 2147483647;
}if (y1 < y0) {
y1 -= y0;
if (y1 < -2147483648) y1 = -2147483648;
if (y0 < -2147483648) y0 = -2147483648;
 else if (y0 > 2147483647) y0 = 2147483647;
} else {
if (y0 < -2147483648) y0 = -2147483648;
 else if (y0 > 2147483647) y0 = 2147483647;
y1 -= y0;
if (y1 < -2147483648) y1 = -2147483648;
 else if (y1 > 2147483647) y1 = 2147483647;
}this.reshape (x0, y0, x1, y1);
}, "~N,~N");
Clazz.overrideMethod (c$, "isEmpty", 
function () {
return (this.width <= 0) || (this.height <= 0);
});
Clazz.defineMethod (c$, "outcode", 
function (x, y) {
var out = 0;
if (this.width <= 0) {
out |= 5;
} else if (x < this.x) {
out |= 1;
} else if (x > this.x + this.width) {
out |= 4;
}if (this.height <= 0) {
out |= 10;
} else if (y < this.y) {
out |= 2;
} else if (y > this.y + this.height) {
out |= 8;
}return out;
}, "~N,~N");
Clazz.overrideMethod (c$, "createIntersection", 
function (r) {
if (Clazz.instanceOf (r, java.awt.Rectangle)) {
return this.intersection (r);
}var dest =  new java.awt.geom.Rectangle2D.Double ();
java.awt.geom.Rectangle2D.intersect (this, r, dest);
return dest;
}, "java.awt.geom.Rectangle2D");
Clazz.overrideMethod (c$, "createUnion", 
function (r) {
if (Clazz.instanceOf (r, java.awt.Rectangle)) {
return this.union (r);
}var dest =  new java.awt.geom.Rectangle2D.Double ();
java.awt.geom.Rectangle2D.union (this, r, dest);
return dest;
}, "java.awt.geom.Rectangle2D");
Clazz.defineMethod (c$, "equals", 
function (obj) {
if (Clazz.instanceOf (obj, java.awt.Rectangle)) {
var r = obj;
return ((this.x == r.x) && (this.y == r.y) && (this.width == r.width) && (this.height == r.height));
}return Clazz.superCall (this, java.awt.Rectangle, "equals", [obj]);
}, "~O");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getClass ().getName () + "[x=" + this.x + ",y=" + this.y + ",width=" + this.width + ",height=" + this.height + "]";
});
});
