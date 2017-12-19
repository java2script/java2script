(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "InverterElm", null, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.slewRate = 0;
this.gatePoly = null;
this.pcircle = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.noDiagonal = true;
this.slewRate = 0.5;
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
this.noDiagonal = true;
try {
this.slewRate =  new Double(st.nextToken()).doubleValue();
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
this.slewRate = 0.5;
} else {
throw e;
}
}
}, 1);

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + new Double(this.slewRate).toString() ;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 'I'.$c();
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
this.drawPosts$java_awt_Graphics(g);
this.draw2Leads$java_awt_Graphics(g);
g.setColor$java_awt_Color(this.needsHighlight() ? (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).selectColor : (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).lightGrayColor);
P$.CircuitElm.drawThickPolygon$java_awt_Graphics$java_awt_Polygon(g, this.gatePoly);
P$.CircuitElm.drawThickCircle$java_awt_Graphics$I$I$I(g, this.pcircle.x, this.pcircle.y, 3);
this.curcount = this.updateDotCount$D$D(this.current, this.curcount);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.lead2, this.point2, this.curcount);
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
var hs = 16;
var ww = 16;
if (ww > this.dn / 2 ) ww = ((this.dn / 2)|0);
this.lead1 = this.interpPoint$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 0.5 - ww / this.dn);
this.lead2 = this.interpPoint$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 0.5 + (ww + 2) / this.dn);
this.pcircle = this.interpPoint$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 0.5 + (ww - 2) / this.dn);
var triPoints = this.newPointArray$I(3);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, triPoints[0], triPoints[1], 0, hs);
triPoints[2] = this.interpPoint$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 0.5 + (ww - 5) / this.dn);
this.gatePoly = this.createPolygon$java_awt_PointA(triPoints);
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, hs);
});

Clazz.newMeth(C$, 'getVoltageSourceCount', function () {
return 1;
});

Clazz.newMeth(C$, 'stamp', function () {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampVoltageSource$I$I$I(0, this.nodes[1], this.voltSource);
});

Clazz.newMeth(C$, 'doStep', function () {
var v0 = this.volts[1];
var out = this.volts[0] > 2.5  ? 0 : 5;
var maxStep = this.slewRate * (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.timeStep * 1.0E9 ;
out = Math.max(Math.min(v0 + maxStep, out), v0 - maxStep);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.updateVoltageSource$I$I$I$D(0, this.nodes[1], this.voltSource, out);
});

Clazz.newMeth(C$, 'getVoltageDiff', function () {
return this.volts[0];
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = "inverter";
arr[1] = "Vi = " + P$.CircuitElm.getVoltageText$D(this.volts[0]);
arr[2] = "Vo = " + P$.CircuitElm.getVoltageText$D(this.volts[1]);
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) return Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Slew Rate (V/ns)", this.slewRate, 0, 0]);
return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
this.slewRate = ei.value;
});

Clazz.newMeth(C$, 'getConnection$I$I', function (n1, n2) {
return false;
});

Clazz.newMeth(C$, 'hasGroundConnection$I', function (n1) {
return (n1 == 1);
});

Clazz.newMeth(C$, 'getShortcut', function () {
return '1'.$c();
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:20
