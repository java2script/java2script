(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "SchmittElm", null, 'com.falstad.circuit.InvertingSchmittElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.$gatePoly = null;
this.$symbolPoly = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I$java_util_StringTokenizer.apply(this, [xa, ya, xb, yb, f, st]);
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'getDumpType', function () {
return 182;
});

Clazz.newMeth(C$, 'doStep', function () {
var v0 = this.volts[1];
var out;
if (this.state) {
if (this.volts[0] > this.upperTrigger ) {
this.state = false;
out = 5;
} else {
out = 0;
}} else {
if (this.volts[0] < this.lowerTrigger ) {
this.state = true;
out = 0;
} else {
out = 5;
}}var maxStep = this.slewRate * (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.timeStep * 1.0E9 ;
out = Math.max(Math.min(v0 + maxStep, out), v0 - maxStep);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.updateVoltageSource$I$I$I$D(0, this.nodes[1], this.voltSource, out);
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
this.drawPosts$java_awt_Graphics(g);
this.draw2Leads$java_awt_Graphics(g);
g.setColor$java_awt_Color(this.needsHighlight() ? (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).selectColor : (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).lightGrayColor);
P$.CircuitElm.drawThickPolygon$java_awt_Graphics$java_awt_Polygon(g, this.$gatePoly);
P$.CircuitElm.drawThickPolygon$java_awt_Graphics$java_awt_Polygon(g, this.$symbolPoly);
this.curcount = this.updateDotCount$D$D(this.current, this.curcount);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.lead2, this.point2, this.curcount);
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
var hs = 16;
var ww = 16;
if (ww > this.dn / 2 ) ww = ((this.dn / 2)|0);
this.lead1 = this.interpPoint$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 0.5 - ww / this.dn);
this.lead2 = this.interpPoint$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 0.5 + (ww - 3) / this.dn);
var triPoints = this.newPointArray$I(3);
var symPoints = this.newPointArray$I(6);
var dummy = Clazz.new_((I$[1]||(I$[1]=Clazz.load('java.awt.Point'))).c$$I$I,[0, 0]);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, triPoints[0], triPoints[1], 0, hs);
triPoints[2] = this.interpPoint$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 0.5 + (ww - 5) / this.dn);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, symPoints[4], symPoints[5], 0.25, (hs/4|0));
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, symPoints[2], symPoints[1], 0.4, (hs/4|0));
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, dummy, symPoints[0], 0.1, (hs/4|0));
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, symPoints[3], dummy, 0.52, (hs/4|0));
this.$gatePoly = this.createPolygon$java_awt_PointA(triPoints);
this.$symbolPoly = this.createPolygon$java_awt_PointA(symPoints);
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, hs);
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = "Schmitt";
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:21
