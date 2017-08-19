Clazz.declarePackage ("sun.awt.geom");
Clazz.load (null, "sun.awt.geom.CurveLink", ["java.lang.InternalError", "sun.awt.geom.Order0"], function () {
c$ = Clazz.decorateAsClass (function () {
this.curve = null;
this.ytop = 0;
this.ybot = 0;
this.etag = 0;
this.next = null;
Clazz.instantialize (this, arguments);
}, sun.awt.geom, "CurveLink");
Clazz.makeConstructor (c$, 
function (curve, ystart, yend, etag) {
this.curve = curve;
this.ytop = ystart;
this.ybot = yend;
this.etag = etag;
if (this.ytop < curve.getYTop () || this.ybot > curve.getYBot ()) {
throw  new InternalError ("bad curvelink [" + this.ytop + "=>" + this.ybot + "] for " + curve);
}}, "sun.awt.geom.Curve,~N,~N,~N");
Clazz.defineMethod (c$, "absorb", 
function (link) {
return this.absorb (link.curve, link.ytop, link.ybot, link.etag);
}, "sun.awt.geom.CurveLink");
Clazz.defineMethod (c$, "absorb", 
function (curve, ystart, yend, etag) {
if (this.curve !== curve || this.etag != etag || this.ybot < ystart || this.ytop > yend) {
return false;
}if (ystart < curve.getYTop () || yend > curve.getYBot ()) {
throw  new InternalError ("bad curvelink [" + ystart + "=>" + yend + "] for " + curve);
}this.ytop = Math.min (this.ytop, ystart);
this.ybot = Math.max (this.ybot, yend);
return true;
}, "sun.awt.geom.Curve,~N,~N,~N");
Clazz.defineMethod (c$, "isEmpty", 
function () {
return (this.ytop == this.ybot);
});
Clazz.defineMethod (c$, "getCurve", 
function () {
return this.curve;
});
Clazz.defineMethod (c$, "getSubCurve", 
function () {
if (this.ytop == this.curve.getYTop () && this.ybot == this.curve.getYBot ()) {
return this.curve.getWithDirection (this.etag);
}return this.curve.getSubCurve (this.ytop, this.ybot, this.etag);
});
Clazz.defineMethod (c$, "getMoveto", 
function () {
return  new sun.awt.geom.Order0 (this.getXTop (), this.getYTop ());
});
Clazz.defineMethod (c$, "getXTop", 
function () {
return this.curve.XforY (this.ytop);
});
Clazz.defineMethod (c$, "getYTop", 
function () {
return this.ytop;
});
Clazz.defineMethod (c$, "getXBot", 
function () {
return this.curve.XforY (this.ybot);
});
Clazz.defineMethod (c$, "getYBot", 
function () {
return this.ybot;
});
Clazz.defineMethod (c$, "getX", 
function () {
return this.curve.XforY (this.ytop);
});
Clazz.defineMethod (c$, "getEdgeTag", 
function () {
return this.etag;
});
Clazz.defineMethod (c$, "setNext", 
function (link) {
this.next = link;
}, "sun.awt.geom.CurveLink");
Clazz.defineMethod (c$, "getNext", 
function () {
return this.next;
});
});
