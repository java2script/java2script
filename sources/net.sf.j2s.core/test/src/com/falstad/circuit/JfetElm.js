(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "JfetElm", null, 'com.falstad.circuit.MosfetElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.gatePoly = null;
this.$arrowPoly = null;
this.gatePt = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$I$Z', function (xx, yy, pnpflag) {
C$.superclazz.c$$I$I$Z.apply(this, [xx, yy, pnpflag]);
C$.$init$.apply(this);
this.noDiagonal = true;
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I$java_util_StringTokenizer.apply(this, [xa, ya, xb, yb, f, st]);
C$.$init$.apply(this);
this.noDiagonal = true;
}, 1);

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 16);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[1]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.src[0], this.src[1]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.src[1], this.src[2]);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[2]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.drn[0], this.drn[1]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.drn[1], this.drn[2]);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[0]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.point1, this.gatePt);
g.fillPolygon$java_awt_Polygon(this.$arrowPoly);
this.setPowerColor$java_awt_Graphics$Z(g, true);
g.fillPolygon$java_awt_Polygon(this.gatePoly);
this.curcount = this.updateDotCount$D$D(-this.ids, this.curcount);
if (this.curcount != 0 ) {
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.src[0], this.src[1], this.curcount);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.src[1], this.src[2], this.curcount + 8);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.drn[0], this.drn[1], -this.curcount);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.drn[1], this.drn[2], -(this.curcount + 8));
}this.drawPosts$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
var hs2 = 16 * this.dsign;
this.src = this.newPointArray$I(3);
this.drn = this.newPointArray$I(3);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.src[0], this.drn[0], 1, hs2);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.src[1], this.drn[1], 1, (hs2/2|0));
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.src[2], this.drn[2], 1 - 10 / this.dn, (hs2/2|0));
this.gatePt = this.interpPoint$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 1 - 14 / this.dn);
var ra = this.newPointArray$I(4);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, ra[0], ra[1], 1 - 13 / this.dn, 16);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, ra[2], ra[3], 1 - 10 / this.dn, 16);
this.gatePoly = this.createPolygon$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point(ra[0], ra[1], ra[3], ra[2]);
if (this.pnp == -1) {
var x = this.interpPoint$java_awt_Point$java_awt_Point$D(this.gatePt, this.point1, 18 / this.dn);
this.$arrowPoly = this.calcArrow$java_awt_Point$java_awt_Point$D$D(this.gatePt, x, 8, 3);
} else this.$arrowPoly = this.calcArrow$java_awt_Point$java_awt_Point$D$D(this.point1, this.gatePt, 8, 3);
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 'j'.$c();
});

Clazz.newMeth(C$, 'getDefaultThreshold', function () {
return -4;
});

Clazz.newMeth(C$, 'getBeta', function () {
return 0.00125;
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
this.getFetInfo$SA$S(arr, "JFET");
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:20
