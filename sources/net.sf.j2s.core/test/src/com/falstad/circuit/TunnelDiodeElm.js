(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "TunnelDiodeElm", null, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.hs = 0;
this.poly = null;
this.cathode = null;
this.lastvoltdiff = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.hs = 8;
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.setup();
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
this.setup();
}, 1);

Clazz.newMeth(C$, 'nonLinear', function () {
return true;
});

Clazz.newMeth(C$, 'setup', function () {
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 175;
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
this.calcLeads$I(16);
this.cathode = this.newPointArray$I(4);
var pa = this.newPointArray$I(2);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, pa[0], pa[1], 0, 8);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, this.cathode[0], this.cathode[1], 1, 8);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, this.cathode[2], this.cathode[3], 0.8, 8);
this.poly = this.createPolygon$java_awt_Point$java_awt_Point$java_awt_Point(pa[0], pa[1], this.lead2);
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 8);
var v1 = this.volts[0];
var v2 = this.volts[1];
this.draw2Leads$java_awt_Graphics(g);
this.setPowerColor$java_awt_Graphics$Z(g, true);
this.setVoltageColor$java_awt_Graphics$D(g, v1);
g.fillPolygon$java_awt_Polygon(this.poly);
this.setVoltageColor$java_awt_Graphics$D(g, v2);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.cathode[0], this.cathode[1]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.cathode[2], this.cathode[0]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.cathode[3], this.cathode[1]);
this.doDots$java_awt_Graphics(g);
this.drawPosts$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'reset', function () {
this.lastvoltdiff = this.volts[0] = this.volts[1] = this.curcount = 0;
});

Clazz.newMeth(C$, 'limitStep$D$D', function (vnew, vold) {
if (vnew > vold + 1 ) return vold + 1;
if (vnew < vold - 1 ) return vold - 1;
return vnew;
});

Clazz.newMeth(C$, 'stamp', function () {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[0]);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[1]);
});

Clazz.newMeth(C$, 'doStep', function () {
var voltdiff = this.volts[0] - this.volts[1];
if (Math.abs(voltdiff - this.lastvoltdiff) > 0.01 ) (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.converged = false;
voltdiff = this.limitStep$D$D(voltdiff, this.lastvoltdiff);
this.lastvoltdiff = voltdiff;
var i = 0.0047 * Math.exp(-20.192307692307693) * (Math.exp(voltdiff / 0.026) - 1)  + 0.0047 * (voltdiff / 0.1) * Math.exp(1 - voltdiff / 0.1)  + 3.7E-4 * Math.exp(voltdiff - 0.37);
var geq = 0.0047 * Math.exp(-20.192307692307693) * Math.exp(voltdiff / 0.026)  / 0.026 + 0.0047 * Math.exp(1 - voltdiff / 0.1) / 0.1 - Math.exp(1 - voltdiff / 0.1) * 0.0047 * voltdiff  / 0.010000000000000002 + Math.exp(voltdiff - 0.37) * 3.7E-4;
var nc = i - geq * voltdiff;
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampConductance$I$I$D(this.nodes[0], this.nodes[1], geq);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampCurrentSource$I$I$D(this.nodes[0], this.nodes[1], nc);
});

Clazz.newMeth(C$, 'calculateCurrent', function () {
var voltdiff = this.volts[0] - this.volts[1];
this.current = 0.0047 * Math.exp(-20.192307692307693) * (Math.exp(voltdiff / 0.026) - 1)  + 0.0047 * (voltdiff / 0.1) * Math.exp(1 - voltdiff / 0.1)  + 3.7E-4 * Math.exp(voltdiff - 0.37);
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = "tunnel diode";
arr[1] = "I = " + P$.CircuitElm.getCurrentText$D(this.getCurrent());
arr[2] = "Vd = " + P$.CircuitElm.getVoltageText$D(this.getVoltageDiff());
arr[3] = "P = " + P$.CircuitElm.getUnitText$D$S(this.getPower(), "W");
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:23
