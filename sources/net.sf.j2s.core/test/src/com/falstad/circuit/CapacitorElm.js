(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "CapacitorElm", null, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.capacitance = 0;
this.compResistance = 0;
this.voltdiff = 0;
this.plate1 = null;
this.plate2 = null;
this.curSourceValue = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.capacitance = 1.0E-5;
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
this.capacitance =  new Double(st.nextToken()).doubleValue();
this.voltdiff =  new Double(st.nextToken()).doubleValue();
}, 1);

Clazz.newMeth(C$, 'isTrapezoidal', function () {
return (this.flags & 2) == 0;
});

Clazz.newMeth(C$, 'setNodeVoltage$I$D', function (n, c) {
C$.superclazz.prototype.setNodeVoltage$I$D.apply(this, [n, c]);
this.voltdiff = this.volts[0] - this.volts[1];
});

Clazz.newMeth(C$, 'reset', function () {
this.current = this.curcount = 0;
this.voltdiff = 0.001;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 'c'.$c();
});

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + new Double(this.capacitance).toString() + " " + new Double(this.voltdiff).toString() ;
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
var f = (this.dn / 2 - 4) / this.dn;
this.lead1 = this.interpPoint$java_awt_Point$java_awt_Point$D(this.point1, this.point2, f);
this.lead2 = this.interpPoint$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 1 - f);
this.plate1 = this.newPointArray$I(2);
this.plate2 = this.newPointArray$I(2);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.plate1[0], this.plate1[1], f, 12);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.plate2[0], this.plate2[1], 1 - f, 12);
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
var hs = 12;
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, hs);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[0]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.point1, this.lead1);
this.setPowerColor$java_awt_Graphics$Z(g, false);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.plate1[0], this.plate1[1]);
if ((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.powerCheckItem.getState()) g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).gray);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[1]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.point2, this.lead2);
this.setPowerColor$java_awt_Graphics$Z(g, false);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.plate2[0], this.plate2[1]);
this.updateDotCount();
if ((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.dragElm !== this ) {
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.point1, this.lead1, this.curcount);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.point2, this.lead2, -this.curcount);
}this.drawPosts$java_awt_Graphics(g);
if ((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.showValuesCheckItem.getState()) {
var s = P$.CircuitElm.getShortUnitText$D$S(this.capacitance, "F");
this.drawValues$java_awt_Graphics$S$D(g, s, hs);
}});

Clazz.newMeth(C$, 'stamp', function () {
if (this.isTrapezoidal()) this.compResistance = (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.timeStep / (2 * this.capacitance);
 else this.compResistance = (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.timeStep / this.capacitance;
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampResistor$I$I$D(this.nodes[0], this.nodes[1], this.compResistance);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampRightSide$I(this.nodes[0]);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampRightSide$I(this.nodes[1]);
});

Clazz.newMeth(C$, 'startIteration', function () {
if (this.isTrapezoidal()) this.curSourceValue = -this.voltdiff / this.compResistance - this.current;
 else this.curSourceValue = -this.voltdiff / this.compResistance;
});

Clazz.newMeth(C$, 'calculateCurrent', function () {
var voltdiff = this.volts[0] - this.volts[1];
if (this.compResistance > 0 ) this.current = voltdiff / this.compResistance + this.curSourceValue;
});

Clazz.newMeth(C$, 'doStep', function () {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampCurrentSource$I$I$D(this.nodes[0], this.nodes[1], this.curSourceValue);
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = "capacitor";
this.getBasicInfo$SA(arr);
arr[3] = "C = " + P$.CircuitElm.getUnitText$D$S(this.capacitance, "F");
arr[4] = "P = " + P$.CircuitElm.getUnitText$D$S(this.getPower(), "W");
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Capacitance (F)", this.capacitance, 0, 0]);
if (n == 1) {
var ei = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[3]||(I$[3]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Trapezoidal Approximation", this.isTrapezoidal()]);
return ei;
}return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 0 && ei.value > 0  ) this.capacitance = ei.value;
if (n == 1) {
if (ei.checkbox.getState()) this.flags = this.flags&(-3);
 else this.flags = this.flags|(2);
}});

Clazz.newMeth(C$, 'getShortcut', function () {
return 'c'.$c();
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:17
