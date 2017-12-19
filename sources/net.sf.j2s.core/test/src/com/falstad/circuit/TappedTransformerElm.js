(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "TappedTransformerElm", null, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.inductance = 0;
this.ratio = 0;
this.ptEnds = null;
this.ptCoil = null;
this.ptCore = null;
this.$current = null;
this.$curcount = null;
this.a = null;
this.curSourceValue = null;
this.voltdiff = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.inductance = 4;
this.ratio = 1;
this.noDiagonal = true;
this.$current = Clazz.array(Double.TYPE, [4]);
this.$curcount = Clazz.array(Double.TYPE, [4]);
this.voltdiff = Clazz.array(Double.TYPE, [3]);
this.curSourceValue = Clazz.array(Double.TYPE, [3]);
this.a = Clazz.array(Double.TYPE, [9]);
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
this.inductance =  new Double(st.nextToken()).doubleValue();
this.ratio =  new Double(st.nextToken()).doubleValue();
this.$current = Clazz.array(Double.TYPE, [4]);
this.$curcount = Clazz.array(Double.TYPE, [4]);
this.$current[0] =  new Double(st.nextToken()).doubleValue();
this.$current[1] =  new Double(st.nextToken()).doubleValue();
try {
this.$current[2] =  new Double(st.nextToken()).doubleValue();
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
this.voltdiff = Clazz.array(Double.TYPE, [3]);
this.curSourceValue = Clazz.array(Double.TYPE, [3]);
this.noDiagonal = true;
this.a = Clazz.array(Double.TYPE, [9]);
}, 1);

Clazz.newMeth(C$, 'getDumpType', function () {
return 169;
});

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + new Double(this.inductance).toString() + " " + new Double(this.ratio).toString() + " " + new Double(this.$current[0]).toString() + " " + new Double(this.$current[1]).toString() + " " + new Double(this.$current[2]).toString() ;
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
var i;
for (i = 0; i != 5; i++) {
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[i]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.ptEnds[i], this.ptCoil[i]);
}
for (i = 0; i != 4; i++) {
if (i == 1) continue;
this.setPowerColor$java_awt_Graphics$D(g, this.$current[i] * (this.volts[i] - this.volts[i + 1]));
this.drawCoil$java_awt_Graphics$I$java_awt_Point$java_awt_Point$D$D(g, i > 1 ? -6 : 6, this.ptCoil[i], this.ptCoil[i + 1], this.volts[i], this.volts[i + 1]);
}
g.setColor$java_awt_Color(this.needsHighlight() ? (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).selectColor : (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).lightGrayColor);
for (i = 0; i != 4; i = i+(2)) {
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.ptCore[i], this.ptCore[i + 1]);
}
this.$current[3] = this.$current[1] - this.$current[2];
for (i = 0; i != 4; i++) this.$curcount[i] = this.updateDotCount$D$D(this.$current[i], this.$curcount[i]);

this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.ptEnds[0], this.ptCoil[0], this.$curcount[0]);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.ptCoil[0], this.ptCoil[1], this.$curcount[0]);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.ptCoil[1], this.ptEnds[1], this.$curcount[0]);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.ptEnds[2], this.ptCoil[2], this.$curcount[1]);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.ptCoil[2], this.ptCoil[3], this.$curcount[1]);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.ptCoil[3], this.ptEnds[3], this.$curcount[3]);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.ptCoil[3], this.ptCoil[4], this.$curcount[2]);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.ptCoil[4], this.ptEnds[4], this.$curcount[2]);
this.drawPosts$java_awt_Graphics(g);
this.setBbox$java_awt_Point$java_awt_Point$D(this.ptEnds[0], this.ptEnds[4], 0);
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
var hs = 32;
this.ptEnds = this.newPointArray$I(5);
this.ptCoil = this.newPointArray$I(5);
this.ptCore = this.newPointArray$I(4);
this.ptEnds[0] = this.point1;
this.ptEnds[2] = this.point2;
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.ptEnds[1], 0, -hs * 2);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.ptEnds[3], 1, -hs);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.ptEnds[4], 1, -hs * 2);
var ce = 0.5 - 12 / this.dn;
var cd = 0.5 - 2 / this.dn;
var i;
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D(this.ptEnds[0], this.ptEnds[2], this.ptCoil[0], ce);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.ptEnds[0], this.ptEnds[2], this.ptCoil[1], ce, -hs * 2);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D(this.ptEnds[0], this.ptEnds[2], this.ptCoil[2], 1 - ce);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.ptEnds[0], this.ptEnds[2], this.ptCoil[3], 1 - ce, -hs);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.ptEnds[0], this.ptEnds[2], this.ptCoil[4], 1 - ce, -hs * 2);
for (i = 0; i != 2; i++) {
var b = -hs * i * 2 ;
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.ptEnds[0], this.ptEnds[2], this.ptCore[i], cd, b);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.ptEnds[0], this.ptEnds[2], this.ptCore[i + 2], 1 - cd, b);
}
});

Clazz.newMeth(C$, 'getPost$I', function (n) {
return this.ptEnds[n];
});

Clazz.newMeth(C$, 'getPostCount', function () {
return 5;
});

Clazz.newMeth(C$, 'reset', function () {
this.$current[0] = this.$current[1] = this.volts[0] = this.volts[1] = this.volts[2] = this.volts[3] = this.$curcount[0] = this.$curcount[1] = 0;
});

Clazz.newMeth(C$, 'stamp', function () {
var l1 = this.inductance;
var l2 = this.inductance * this.ratio * this.ratio  / 4;
var cc = 0.99;
this.a[0] = (1 + cc) / (l1 * (1 + cc - 2 * cc * cc ));
this.a[1] = this.a[2] = this.a[3] = this.a[6] = 2 * cc / ((2 * cc * cc  - cc - 1) * this.inductance * this.ratio );
this.a[4] = this.a[8] = -4 * (1 + cc) / ((2 * cc * cc  - cc - 1) * l1 * this.ratio * this.ratio );
this.a[5] = this.a[7] = 4 * cc / ((2 * cc * cc  - cc - 1) * l1 * this.ratio * this.ratio );
var i;
for (i = 0; i != 9; i++) this.a[i] *= (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.timeStep / 2;

(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampConductance$I$I$D(this.nodes[0], this.nodes[1], this.a[0]);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampVCCurrentSource$I$I$I$I$D(this.nodes[0], this.nodes[1], this.nodes[2], this.nodes[3], this.a[1]);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampVCCurrentSource$I$I$I$I$D(this.nodes[0], this.nodes[1], this.nodes[3], this.nodes[4], this.a[2]);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampVCCurrentSource$I$I$I$I$D(this.nodes[2], this.nodes[3], this.nodes[0], this.nodes[1], this.a[3]);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampConductance$I$I$D(this.nodes[2], this.nodes[3], this.a[4]);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampVCCurrentSource$I$I$I$I$D(this.nodes[2], this.nodes[3], this.nodes[3], this.nodes[4], this.a[5]);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampVCCurrentSource$I$I$I$I$D(this.nodes[3], this.nodes[4], this.nodes[0], this.nodes[1], this.a[6]);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampVCCurrentSource$I$I$I$I$D(this.nodes[3], this.nodes[4], this.nodes[2], this.nodes[3], this.a[7]);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampConductance$I$I$D(this.nodes[3], this.nodes[4], this.a[8]);
for (i = 0; i != 5; i++) (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampRightSide$I(this.nodes[i]);

});

Clazz.newMeth(C$, 'startIteration', function () {
this.voltdiff[0] = this.volts[0] - this.volts[1];
this.voltdiff[1] = this.volts[2] - this.volts[3];
this.voltdiff[2] = this.volts[3] - this.volts[4];
var i;
var j;
for (i = 0; i != 3; i++) {
this.curSourceValue[i] = this.$current[i];
for (j = 0; j != 3; j++) this.curSourceValue[i] += this.a[i * 3 + j] * this.voltdiff[j];

}
});

Clazz.newMeth(C$, 'doStep', function () {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampCurrentSource$I$I$D(this.nodes[0], this.nodes[1], this.curSourceValue[0]);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampCurrentSource$I$I$D(this.nodes[2], this.nodes[3], this.curSourceValue[1]);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampCurrentSource$I$I$D(this.nodes[3], this.nodes[4], this.curSourceValue[2]);
});

Clazz.newMeth(C$, 'calculateCurrent', function () {
this.voltdiff[0] = this.volts[0] - this.volts[1];
this.voltdiff[1] = this.volts[2] - this.volts[3];
this.voltdiff[2] = this.volts[3] - this.volts[4];
var i;
var j;
for (i = 0; i != 3; i++) {
this.$current[i] = this.curSourceValue[i];
for (j = 0; j != 3; j++) this.$current[i] += this.a[i * 3 + j] * this.voltdiff[j];

}
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = "transformer";
arr[1] = "L = " + P$.CircuitElm.getUnitText$D$S(this.inductance, "H");
arr[2] = "Ratio = " + new Double(this.ratio).toString();
arr[3] = "Vd1 = " + P$.CircuitElm.getVoltageText$D(this.volts[0] - this.volts[2]);
arr[4] = "Vd2 = " + P$.CircuitElm.getVoltageText$D(this.volts[1] - this.volts[3]);
});

Clazz.newMeth(C$, 'getConnection$I$I', function (n1, n2) {
if (this.comparePair$I$I$I$I(n1, n2, 0, 1)) return true;
if (this.comparePair$I$I$I$I(n1, n2, 2, 3)) return true;
if (this.comparePair$I$I$I$I(n1, n2, 3, 4)) return true;
if (this.comparePair$I$I$I$I(n1, n2, 2, 4)) return true;
return false;
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) return Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Primary Inductance (H)", this.inductance, 0.01, 5]);
if (n == 1) return Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Ratio", this.ratio, 1, 10]).setDimensionless();
return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 0) this.inductance = ei.value;
if (n == 1) this.ratio = ei.value;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:22
