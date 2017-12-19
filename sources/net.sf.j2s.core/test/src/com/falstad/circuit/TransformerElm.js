(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "TransformerElm", null, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.inductance = 0;
this.ratio = 0;
this.couplingCoef = 0;
this.ptEnds = null;
this.ptCoil = null;
this.ptCore = null;
this.$current = null;
this.$curcount = null;
this.width = 0;
this.a1 = 0;
this.a2 = 0;
this.a3 = 0;
this.a4 = 0;
this.curSourceValue1 = 0;
this.curSourceValue2 = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.inductance = 4;
this.ratio = 1;
this.width = 32;
this.noDiagonal = true;
this.couplingCoef = 0.999;
this.$current = Clazz.array(Double.TYPE, [2]);
this.$curcount = Clazz.array(Double.TYPE, [2]);
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
this.width = P$.CircuitElm.max$I$I(32, P$.CircuitElm.abs$I(yb - ya));
this.inductance =  new Double(st.nextToken()).doubleValue();
this.ratio =  new Double(st.nextToken()).doubleValue();
this.$current = Clazz.array(Double.TYPE, [2]);
this.$curcount = Clazz.array(Double.TYPE, [2]);
this.$current[0] =  new Double(st.nextToken()).doubleValue();
this.$current[1] =  new Double(st.nextToken()).doubleValue();
this.couplingCoef = 0.999;
try {
this.couplingCoef =  new Double(st.nextToken()).doubleValue();
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
this.noDiagonal = true;
}, 1);

Clazz.newMeth(C$, 'drag$I$I', function (xx, yy) {
xx = (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.snapGrid$I(xx);
yy = (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.snapGrid$I(yy);
this.width = P$.CircuitElm.max$I$I(32, P$.CircuitElm.abs$I(yy - this.y));
if (xx == this.x) yy = this.y;
this.x2 = xx;
this.y2 = yy;
this.setPoints();
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 'T'.$c();
});

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + new Double(this.inductance).toString() + " " + new Double(this.ratio).toString() + " " + new Double(this.$current[0]).toString() + " " + new Double(this.$current[1]).toString() + " " + new Double(this.couplingCoef).toString() ;
});

Clazz.newMeth(C$, 'isTrapezoidal', function () {
return (this.flags & 2) == 0;
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
var i;
for (i = 0; i != 4; i++) {
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[i]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.ptEnds[i], this.ptCoil[i]);
}
for (i = 0; i != 2; i++) {
this.setPowerColor$java_awt_Graphics$D(g, this.$current[i] * (this.volts[i] - this.volts[i + 2]));
this.drawCoil$java_awt_Graphics$I$java_awt_Point$java_awt_Point$D$D(g, this.dsign * (i == 1 ? -6 : 6), this.ptCoil[i], this.ptCoil[i + 2], this.volts[i], this.volts[i + 2]);
}
g.setColor$java_awt_Color(this.needsHighlight() ? (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).selectColor : (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).lightGrayColor);
for (i = 0; i != 2; i++) {
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.ptCore[i], this.ptCore[i + 2]);
this.$curcount[i] = this.updateDotCount$D$D(this.$current[i], this.$curcount[i]);
}
for (i = 0; i != 2; i++) {
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.ptEnds[i], this.ptCoil[i], this.$curcount[i]);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.ptCoil[i], this.ptCoil[i + 2], this.$curcount[i]);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.ptEnds[i + 2], this.ptCoil[i + 2], -this.$curcount[i]);
}
this.drawPosts$java_awt_Graphics(g);
this.setBbox$java_awt_Point$java_awt_Point$D(this.ptEnds[0], this.ptEnds[3], 0);
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
this.point2.y = this.point1.y;
this.ptEnds = this.newPointArray$I(4);
this.ptCoil = this.newPointArray$I(4);
this.ptCore = this.newPointArray$I(4);
this.ptEnds[0] = this.point1;
this.ptEnds[1] = this.point2;
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.ptEnds[2], 0, -this.dsign * this.width);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.ptEnds[3], 1, -this.dsign * this.width);
var ce = 0.5 - 12 / this.dn;
var cd = 0.5 - 2 / this.dn;
var i;
for (i = 0; i != 4; i = i+(2)) {
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D(this.ptEnds[i], this.ptEnds[i + 1], this.ptCoil[i], ce);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D(this.ptEnds[i], this.ptEnds[i + 1], this.ptCoil[i + 1], 1 - ce);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D(this.ptEnds[i], this.ptEnds[i + 1], this.ptCore[i], cd);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D(this.ptEnds[i], this.ptEnds[i + 1], this.ptCore[i + 1], 1 - cd);
}
});

Clazz.newMeth(C$, 'getPost$I', function (n) {
return this.ptEnds[n];
});

Clazz.newMeth(C$, 'getPostCount', function () {
return 4;
});

Clazz.newMeth(C$, 'reset', function () {
this.$current[0] = this.$current[1] = this.volts[0] = this.volts[1] = this.volts[2] = this.volts[3] = this.$curcount[0] = this.$curcount[1] = 0;
});

Clazz.newMeth(C$, 'stamp', function () {
var l1 = this.inductance;
var l2 = this.inductance * this.ratio * this.ratio ;
var m = this.couplingCoef * Math.sqrt(l1 * l2);
var deti = 1 / (l1 * l2 - m * m);
var ts = this.isTrapezoidal() ? (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.timeStep / 2 : (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.timeStep;
this.a1 = l2 * deti * ts ;
this.a2 = -m * deti * ts ;
this.a3 = -m * deti * ts ;
this.a4 = l1 * deti * ts ;
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampConductance$I$I$D(this.nodes[0], this.nodes[2], this.a1);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampVCCurrentSource$I$I$I$I$D(this.nodes[0], this.nodes[2], this.nodes[1], this.nodes[3], this.a2);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampVCCurrentSource$I$I$I$I$D(this.nodes[1], this.nodes[3], this.nodes[0], this.nodes[2], this.a3);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampConductance$I$I$D(this.nodes[1], this.nodes[3], this.a4);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampRightSide$I(this.nodes[0]);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampRightSide$I(this.nodes[1]);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampRightSide$I(this.nodes[2]);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampRightSide$I(this.nodes[3]);
});

Clazz.newMeth(C$, 'startIteration', function () {
var voltdiff1 = this.volts[0] - this.volts[2];
var voltdiff2 = this.volts[1] - this.volts[3];
if (this.isTrapezoidal()) {
this.curSourceValue1 = voltdiff1 * this.a1 + voltdiff2 * this.a2 + this.$current[0];
this.curSourceValue2 = voltdiff1 * this.a3 + voltdiff2 * this.a4 + this.$current[1];
} else {
this.curSourceValue1 = this.$current[0];
this.curSourceValue2 = this.$current[1];
}});

Clazz.newMeth(C$, 'doStep', function () {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampCurrentSource$I$I$D(this.nodes[0], this.nodes[2], this.curSourceValue1);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampCurrentSource$I$I$D(this.nodes[1], this.nodes[3], this.curSourceValue2);
});

Clazz.newMeth(C$, 'calculateCurrent', function () {
var voltdiff1 = this.volts[0] - this.volts[2];
var voltdiff2 = this.volts[1] - this.volts[3];
this.$current[0] = voltdiff1 * this.a1 + voltdiff2 * this.a2 + this.curSourceValue1;
this.$current[1] = voltdiff1 * this.a3 + voltdiff2 * this.a4 + this.curSourceValue2;
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = "transformer";
arr[1] = "L = " + P$.CircuitElm.getUnitText$D$S(this.inductance, "H");
arr[2] = "Ratio = 1:" + new Double(this.ratio).toString();
arr[3] = "Vd1 = " + P$.CircuitElm.getVoltageText$D(this.volts[0] - this.volts[2]);
arr[4] = "Vd2 = " + P$.CircuitElm.getVoltageText$D(this.volts[1] - this.volts[3]);
arr[5] = "I1 = " + P$.CircuitElm.getCurrentText$D(this.$current[0]);
arr[6] = "I2 = " + P$.CircuitElm.getCurrentText$D(this.$current[1]);
});

Clazz.newMeth(C$, 'getConnection$I$I', function (n1, n2) {
if (this.comparePair$I$I$I$I(n1, n2, 0, 2)) return true;
if (this.comparePair$I$I$I$I(n1, n2, 1, 3)) return true;
return false;
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) return Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Primary Inductance (H)", this.inductance, 0.01, 5]);
if (n == 1) return Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Ratio", this.ratio, 1, 10]).setDimensionless();
if (n == 2) return Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Coupling Coefficient", this.couplingCoef, 0, 1]).setDimensionless();
if (n == 3) {
var ei = Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[2]||(I$[2]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Trapezoidal Approximation", this.isTrapezoidal()]);
return ei;
}return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 0) this.inductance = ei.value;
if (n == 1) this.ratio = ei.value;
if (n == 2 && ei.value > 0   && ei.value < 1  ) this.couplingCoef = ei.value;
if (n == 3) {
if (ei.checkbox.getState()) this.flags = this.flags&(-3);
 else this.flags = this.flags|(2);
}});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:22
