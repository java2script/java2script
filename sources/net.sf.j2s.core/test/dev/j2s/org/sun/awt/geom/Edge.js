Clazz.declarePackage ("sun.awt.geom");
c$ = Clazz.decorateAsClass (function () {
this.curve = null;
this.ctag = 0;
this.etag = 0;
this.activey = 0;
this.equivalence = 0;
this.lastEdge = null;
this.lastResult = 0;
this.lastLimit = 0;
Clazz.instantialize (this, arguments);
}, sun.awt.geom, "Edge");
Clazz.makeConstructor (c$, 
function (c, ctag) {
this.construct (c, ctag, 0);
}, "sun.awt.geom.Curve,~N");
Clazz.makeConstructor (c$, 
function (c, ctag, etag) {
this.curve = c;
this.ctag = ctag;
this.etag = etag;
}, "sun.awt.geom.Curve,~N,~N");
Clazz.defineMethod (c$, "getCurve", 
function () {
return this.curve;
});
Clazz.defineMethod (c$, "getCurveTag", 
function () {
return this.ctag;
});
Clazz.defineMethod (c$, "getEdgeTag", 
function () {
return this.etag;
});
Clazz.defineMethod (c$, "setEdgeTag", 
function (etag) {
this.etag = etag;
}, "~N");
Clazz.defineMethod (c$, "getEquivalence", 
function () {
return this.equivalence;
});
Clazz.defineMethod (c$, "setEquivalence", 
function (eq) {
this.equivalence = eq;
}, "~N");
Clazz.defineMethod (c$, "compareTo", 
function (other, yrange) {
if (other === this.lastEdge && yrange[0] < this.lastLimit) {
if (yrange[1] > this.lastLimit) {
yrange[1] = this.lastLimit;
}return this.lastResult;
}if (this === other.lastEdge && yrange[0] < other.lastLimit) {
if (yrange[1] > other.lastLimit) {
yrange[1] = other.lastLimit;
}return 0 - other.lastResult;
}var ret = this.curve.compareTo (other.curve, yrange);
this.lastEdge = other;
this.lastLimit = yrange[1];
this.lastResult = ret;
return ret;
}, "sun.awt.geom.Edge,~A");
Clazz.defineMethod (c$, "record", 
function (yend, etag) {
this.activey = yend;
this.etag = etag;
}, "~N,~N");
Clazz.defineMethod (c$, "isActiveFor", 
function (y, etag) {
return (this.etag == etag && this.activey >= y);
}, "~N,~N");
Clazz.overrideMethod (c$, "toString", 
function () {
return ("Edge[" + this.curve + ", " + (this.ctag == 0 ? "L" : "R") + ", " + (this.etag == 1 ? "I" : (this.etag == -1 ? "O" : "N")) + "]");
});
Clazz.defineStatics (c$,
"INIT_PARTS", 4,
"GROW_PARTS", 10);
