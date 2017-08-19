Clazz.declarePackage ("sun.awt.geom");
Clazz.load (["sun.awt.geom.Curve"], "sun.awt.geom.Order0", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.x = 0;
this.y = 0;
Clazz.instantialize (this, arguments);
}, sun.awt.geom, "Order0", sun.awt.geom.Curve);
Clazz.makeConstructor (c$, 
function (x, y) {
Clazz.superConstructor (this, sun.awt.geom.Order0, [1]);
this.x = x;
this.y = y;
}, "~N,~N");
Clazz.overrideMethod (c$, "getOrder", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "getXTop", 
function () {
return this.x;
});
Clazz.overrideMethod (c$, "getYTop", 
function () {
return this.y;
});
Clazz.overrideMethod (c$, "getXBot", 
function () {
return this.x;
});
Clazz.overrideMethod (c$, "getYBot", 
function () {
return this.y;
});
Clazz.overrideMethod (c$, "getXMin", 
function () {
return this.x;
});
Clazz.overrideMethod (c$, "getXMax", 
function () {
return this.x;
});
Clazz.overrideMethod (c$, "getX0", 
function () {
return this.x;
});
Clazz.overrideMethod (c$, "getY0", 
function () {
return this.y;
});
Clazz.overrideMethod (c$, "getX1", 
function () {
return this.x;
});
Clazz.overrideMethod (c$, "getY1", 
function () {
return this.y;
});
Clazz.overrideMethod (c$, "XforY", 
function (y) {
return y;
}, "~N");
Clazz.overrideMethod (c$, "TforY", 
function (y) {
return 0;
}, "~N");
Clazz.overrideMethod (c$, "XforT", 
function (t) {
return this.x;
}, "~N");
Clazz.overrideMethod (c$, "YforT", 
function (t) {
return this.y;
}, "~N");
Clazz.overrideMethod (c$, "dXforT", 
function (t, deriv) {
return 0;
}, "~N,~N");
Clazz.overrideMethod (c$, "dYforT", 
function (t, deriv) {
return 0;
}, "~N,~N");
Clazz.overrideMethod (c$, "nextVertical", 
function (t0, t1) {
return t1;
}, "~N,~N");
Clazz.overrideMethod (c$, "crossingsFor", 
function (x, y) {
return 0;
}, "~N,~N");
Clazz.overrideMethod (c$, "accumulateCrossings", 
function (c) {
return (this.x > c.getXLo () && this.x < c.getXHi () && this.y > c.getYLo () && this.y < c.getYHi ());
}, "sun.awt.geom.Crossings");
Clazz.overrideMethod (c$, "enlarge", 
function (r) {
r.add (this.x, this.y);
}, "java.awt.geom.Rectangle2D");
Clazz.defineMethod (c$, "getSubCurve", 
function (ystart, yend, dir) {
return this;
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "getReversedCurve", 
function () {
return this;
});
Clazz.overrideMethod (c$, "getSegment", 
function (coords) {
coords[0] = this.x;
coords[1] = this.y;
return 0;
}, "~A");
});
