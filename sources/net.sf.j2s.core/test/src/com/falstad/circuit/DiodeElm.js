(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "DiodeElm", null, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.diode = null;
this.defaultdrop = 0;
this.fwdrop = 0;
this.zvoltage = 0;
this.hs = 0;
this.poly = null;
this.cathode = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.defaultdrop = 0.805904783;
this.hs = 8;
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.diode = Clazz.new_((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.Diode'))).c$$com_falstad_circuit_CirSim,[(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim]);
this.fwdrop = 0.805904783;
this.zvoltage = 0;
this.setup();
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
this.diode = Clazz.new_((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.Diode'))).c$$com_falstad_circuit_CirSim,[(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim]);
this.fwdrop = 0.805904783;
this.zvoltage = 0;
if ((f & 1) > 0) {
try {
this.fwdrop =  new Double(st.nextToken()).doubleValue();
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
}this.setup();
}, 1);

Clazz.newMeth(C$, 'nonLinear', function () {
return true;
});

Clazz.newMeth(C$, 'setup', function () {
this.diode.setup$D$D(this.fwdrop, this.zvoltage);
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 'd'.$c();
});

Clazz.newMeth(C$, 'dump', function () {
this.flags = this.flags|(1);
return C$.superclazz.prototype.dump.apply(this, []) + " " + new Double(this.fwdrop).toString() ;
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
this.calcLeads$I(16);
this.cathode = this.newPointArray$I(2);
var pa = this.newPointArray$I(2);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, pa[0], pa[1], 0, 8);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, this.cathode[0], this.cathode[1], 1, 8);
this.poly = this.createPolygon$java_awt_Point$java_awt_Point$java_awt_Point(pa[0], pa[1], this.lead2);
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
this.drawDiode$java_awt_Graphics(g);
this.doDots$java_awt_Graphics(g);
this.drawPosts$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'reset', function () {
this.diode.reset();
this.volts[0] = this.volts[1] = this.curcount = 0;
});

Clazz.newMeth(C$, 'drawDiode$java_awt_Graphics', function (g) {
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 8);
var v1 = this.volts[0];
var v2 = this.volts[1];
this.draw2Leads$java_awt_Graphics(g);
this.setPowerColor$java_awt_Graphics$Z(g, true);
this.setVoltageColor$java_awt_Graphics$D(g, v1);
g.fillPolygon$java_awt_Polygon(this.poly);
this.setVoltageColor$java_awt_Graphics$D(g, v2);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.cathode[0], this.cathode[1]);
});

Clazz.newMeth(C$, 'stamp', function () {
this.diode.stamp$I$I(this.nodes[0], this.nodes[1]);
});

Clazz.newMeth(C$, 'doStep', function () {
this.diode.doStep$D(this.volts[0] - this.volts[1]);
});

Clazz.newMeth(C$, 'calculateCurrent', function () {
this.current = this.diode.calculateCurrent$D(this.volts[0] - this.volts[1]);
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = "diode";
arr[1] = "I = " + P$.CircuitElm.getCurrentText$D(this.getCurrent());
arr[2] = "Vd = " + P$.CircuitElm.getVoltageText$D(this.getVoltageDiff());
arr[3] = "P = " + P$.CircuitElm.getUnitText$D$S(this.getPower(), "W");
arr[4] = "Vf = " + P$.CircuitElm.getVoltageText$D(this.fwdrop);
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Fwd Voltage @ 1A", this.fwdrop, 10, 1000]);
return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
this.fwdrop = ei.value;
this.setup();
});

Clazz.newMeth(C$, 'getShortcut', function () {
return 'd'.$c();
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:19
