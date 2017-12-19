(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "RelayElm", null, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.inductance = 0;
this.ind = null;
this.r_on = 0;
this.r_off = 0;
this.onCurrent = 0;
this.coilPosts = null;
this.coilLeads = null;
this.swposts = null;
this.swpoles = null;
this.ptSwitch = null;
this.lines = null;
this.coilCurrent = 0;
this.switchCurrent = 0;
this.coilCurCount = 0;
this.switchCurCount = 0;
this.d_position = 0;
this.coilR = 0;
this.i_position = 0;
this.poleCount = 0;
this.openhs = 0;
this.nSwitch0 = 0;
this.nSwitch1 = 0;
this.nSwitch2 = 0;
this.nCoil1 = 0;
this.nCoil2 = 0;
this.nCoil3 = 0;
this.FLAG_SWAP_COIL = 0;
this.a1 = 0;
this.a2 = 0;
this.a3 = 0;
this.a4 = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.nSwitch0 = 0;
this.nSwitch1 = 1;
this.nSwitch2 = 2;
this.FLAG_SWAP_COIL = 1;
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.ind = Clazz.new_((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.Inductor'))).c$$com_falstad_circuit_CirSim,[(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim]);
this.inductance = 0.2;
this.ind.setup$D$D$I(this.inductance, 0, 2);
this.noDiagonal = true;
this.onCurrent = 0.02;
this.r_on = 0.05;
this.r_off = 1000000.0;
this.coilR = 20;
this.coilCurrent = this.coilCurCount = 0;
this.poleCount = 1;
this.setupPoles();
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
this.poleCount =  new Integer(st.nextToken()).intValue();
this.inductance =  new Double(st.nextToken()).doubleValue();
this.coilCurrent =  new Double(st.nextToken()).doubleValue();
this.r_on =  new Double(st.nextToken()).doubleValue();
this.r_off =  new Double(st.nextToken()).doubleValue();
this.onCurrent =  new Double(st.nextToken()).doubleValue();
this.coilR =  new Double(st.nextToken()).doubleValue();
this.noDiagonal = true;
this.ind = Clazz.new_((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.Inductor'))).c$$com_falstad_circuit_CirSim,[(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim]);
this.ind.setup$D$D$I(this.inductance, this.coilCurrent, 2);
this.setupPoles();
}, 1);

Clazz.newMeth(C$, 'setupPoles', function () {
this.nCoil1 = 3 * this.poleCount;
this.nCoil2 = this.nCoil1 + 1;
this.nCoil3 = this.nCoil1 + 2;
if (this.switchCurrent == null  || this.switchCurrent.length != this.poleCount ) {
this.switchCurrent = Clazz.array(Double.TYPE, [this.poleCount]);
this.switchCurCount = Clazz.array(Double.TYPE, [this.poleCount]);
}});

Clazz.newMeth(C$, 'getDumpType', function () {
return 178;
});

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + this.poleCount + " " + new Double(this.inductance).toString() + " " + new Double(this.coilCurrent).toString() + " " + new Double(this.r_on).toString() + " " + new Double(this.r_off).toString() + " " + new Double(this.onCurrent).toString() + " " + new Double(this.coilR).toString() ;
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
var i;
var p;
for (i = 0; i != 2; i++) {
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[this.nCoil1 + i]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.coilLeads[i], this.coilPosts[i]);
}
var x = ((this.flags & 1) != 0) ? 1 : 0;
this.drawCoil$java_awt_Graphics$I$java_awt_Point$java_awt_Point$D$D(g, this.dsign * 6, this.coilLeads[x], this.coilLeads[1 - x], this.volts[this.nCoil1 + x], this.volts[this.nCoil2 - x]);
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).darkGray);
for (i = 0; i != this.poleCount; i++) {
if (i == 0) this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.lines[i * 2], 0.5, this.openhs * 2 + 5 * this.dsign - i * this.openhs * 3 );
 else this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.lines[i * 2], 0.5, ((this.openhs * (-i * 3 + 3 - 0.5 + this.d_position))|0) + 5 * this.dsign);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.lines[i * 2 + 1], 0.5, ((this.openhs * (-i * 3 - 0.5 + this.d_position))|0) - 5 * this.dsign);
g.drawLine$I$I$I$I(this.lines[i * 2].x, this.lines[i * 2].y, this.lines[i * 2 + 1].x, this.lines[i * 2 + 1].y);
}
for (p = 0; p != this.poleCount; p++) {
var po = p * 3;
for (i = 0; i != 3; i++) {
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[0 + po + i ]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.swposts[p][i], this.swpoles[p][i]);
}
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D(this.swpoles[p][1], this.swpoles[p][2], this.ptSwitch[p], this.d_position);
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).lightGray);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.swpoles[p][0], this.ptSwitch[p]);
this.switchCurCount[p] = this.updateDotCount$D$D(this.switchCurrent[p], this.switchCurCount[p]);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.swposts[p][0], this.swpoles[p][0], this.switchCurCount[p]);
if (this.i_position != 2) this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.swpoles[p][this.i_position + 1], this.swposts[p][this.i_position + 1], this.switchCurCount[p]);
}
this.coilCurCount = this.updateDotCount$D$D(this.coilCurrent, this.coilCurCount);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.coilPosts[0], this.coilLeads[0], this.coilCurCount);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.coilLeads[0], this.coilLeads[1], this.coilCurCount);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.coilLeads[1], this.coilPosts[1], this.coilCurCount);
this.drawPosts$java_awt_Graphics(g);
this.setBbox$java_awt_Point$java_awt_Point$D(this.coilPosts[0], this.coilLeads[1], 0);
this.adjustBbox$java_awt_Point$java_awt_Point(this.swpoles[this.poleCount - 1][0], this.swposts[this.poleCount - 1][1]);
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
this.setupPoles();
this.allocNodes();
this.openhs = -this.dsign * 16;
this.calcLeads$I(32);
this.swposts = Clazz.array((I$[3]||(I$[3]=Clazz.load('java.awt.Point'))), [this.poleCount, 3]);
this.swpoles = Clazz.array((I$[3]||(I$[3]=Clazz.load('java.awt.Point'))), [this.poleCount, 3]);
var i;
var j;
for (i = 0; i != this.poleCount; i++) {
for (j = 0; j != 3; j++) {
this.swposts[i][j] = Clazz.new_((I$[3]||(I$[3]=Clazz.load('java.awt.Point'))));
this.swpoles[i][j] = Clazz.new_((I$[3]||(I$[3]=Clazz.load('java.awt.Point'))));
}
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, this.swpoles[i][0], 0, -this.openhs * 3 * i );
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, this.swpoles[i][1], 1, -this.openhs * 3 * i  - this.openhs);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, this.swpoles[i][2], 1, -this.openhs * 3 * i  + this.openhs);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.swposts[i][0], 0, -this.openhs * 3 * i );
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.swposts[i][1], 1, -this.openhs * 3 * i  - this.openhs);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.swposts[i][2], 1, -this.openhs * 3 * i  + this.openhs);
}
this.coilPosts = this.newPointArray$I(2);
this.coilLeads = this.newPointArray$I(2);
this.ptSwitch = this.newPointArray$I(this.poleCount);
var x = ((this.flags & 1) != 0) ? 1 : 0;
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.coilPosts[0], x, this.openhs * 2);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.coilPosts[1], x, this.openhs * 3);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.coilLeads[0], 0.5, this.openhs * 2);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.coilLeads[1], 0.5, this.openhs * 3);
this.lines = this.newPointArray$I(this.poleCount * 2);
});

Clazz.newMeth(C$, 'getPost$I', function (n) {
if (n < 3 * this.poleCount) return this.swposts[(n/3|0)][n % 3];
return this.coilPosts[n - 3 * this.poleCount];
});

Clazz.newMeth(C$, 'getPostCount', function () {
return 2 + this.poleCount * 3;
});

Clazz.newMeth(C$, 'getInternalNodeCount', function () {
return 1;
});

Clazz.newMeth(C$, 'reset', function () {
C$.superclazz.prototype.reset.apply(this, []);
this.ind.reset();
this.coilCurrent = this.coilCurCount = 0;
var i;
for (i = 0; i != this.poleCount; i++) this.switchCurrent[i] = this.switchCurCount[i] = 0;

});

Clazz.newMeth(C$, 'stamp', function () {
this.ind.stamp$I$I(this.nodes[this.nCoil1], this.nodes[this.nCoil3]);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampResistor$I$I$D(this.nodes[this.nCoil3], this.nodes[this.nCoil2], this.coilR);
var i;
for (i = 0; i != this.poleCount * 3; i++) (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[0 + i]);

});

Clazz.newMeth(C$, 'startIteration', function () {
this.ind.startIteration$D(this.volts[this.nCoil1] - this.volts[this.nCoil3]);
var magic = 1.3;
var pmult = Math.sqrt(magic + 1);
var p = this.coilCurrent * pmult / this.onCurrent;
this.d_position = Math.abs(p * p) - 1.3;
if (this.d_position < 0 ) this.d_position = 0;
if (this.d_position > 1 ) this.d_position = 1;
if (this.d_position < 0.1 ) this.i_position = 0;
 else if (this.d_position > 0.9 ) this.i_position = 1;
 else this.i_position = 2;
});

Clazz.newMeth(C$, 'nonLinear', function () {
return true;
});

Clazz.newMeth(C$, 'doStep', function () {
var voltdiff = this.volts[this.nCoil1] - this.volts[this.nCoil3];
this.ind.doStep$D(voltdiff);
var p;
for (p = 0; p != this.poleCount * 3; p = p+(3)) {
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampResistor$I$I$D(this.nodes[0 + p], this.nodes[1 + p], this.i_position == 0 ? this.r_on : this.r_off);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampResistor$I$I$D(this.nodes[0 + p], this.nodes[2 + p], this.i_position == 1 ? this.r_on : this.r_off);
}
});

Clazz.newMeth(C$, 'calculateCurrent', function () {
var voltdiff = this.volts[this.nCoil1] - this.volts[this.nCoil3];
this.coilCurrent = this.ind.calculateCurrent$D(voltdiff);
var p;
for (p = 0; p != this.poleCount; p++) {
if (this.i_position == 2) this.switchCurrent[p] = 0;
 else this.switchCurrent[p] = (this.volts[0 + p * 3] - this.volts[1 + p * 3 + this.i_position]) / this.r_on;
}
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = this.i_position == 0 ? "relay (off)" : this.i_position == 1 ? "relay (on)" : "relay";
var i;
var ln = 1;
for (i = 0; i != this.poleCount; i++) arr[ln++] = "I" + (i + 1) + " = " + P$.CircuitElm.getCurrentDText$D(this.switchCurrent[i]) ;

arr[ln++] = "coil I = " + P$.CircuitElm.getCurrentDText$D(this.coilCurrent);
arr[ln++] = "coil Vd = " + P$.CircuitElm.getVoltageDText$D(this.volts[this.nCoil1] - this.volts[this.nCoil2]);
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) return Clazz.new_((I$[4]||(I$[4]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Inductance (H)", this.inductance, 0, 0]);
if (n == 1) return Clazz.new_((I$[4]||(I$[4]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["On Resistance (ohms)", this.r_on, 0, 0]);
if (n == 2) return Clazz.new_((I$[4]||(I$[4]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Off Resistance (ohms)", this.r_off, 0, 0]);
if (n == 3) return Clazz.new_((I$[4]||(I$[4]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["On Current (A)", this.onCurrent, 0, 0]);
if (n == 4) return Clazz.new_((I$[4]||(I$[4]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Number of Poles", this.poleCount, 1, 4]).setDimensionless();
if (n == 5) return Clazz.new_((I$[4]||(I$[4]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Coil Resistance (ohms)", this.coilR, 0, 0]);
if (n == 6) {
var ei = Clazz.new_((I$[4]||(I$[4]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[5]||(I$[5]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Swap Coil Direction", (this.flags & 1) != 0]);
return ei;
}return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 0 && ei.value > 0  ) {
this.inductance = ei.value;
this.ind.setup$D$D$I(this.inductance, this.coilCurrent, 2);
}if (n == 1 && ei.value > 0  ) this.r_on = ei.value;
if (n == 2 && ei.value > 0  ) this.r_off = ei.value;
if (n == 3 && ei.value > 0  ) this.onCurrent = ei.value;
if (n == 4 && ei.value >= 1  ) {
this.poleCount = (ei.value|0);
this.setPoints();
}if (n == 5 && ei.value > 0  ) this.coilR = ei.value;
if (n == 6) {
if (ei.checkbox.getState()) this.flags = this.flags|(1);
 else this.flags = this.flags&(-2);
this.setPoints();
}});

Clazz.newMeth(C$, 'getConnection$I$I', function (n1, n2) {
return ((n1/3|0) == (n2/3|0));
});

Clazz.newMeth(C$, 'getShortcut', function () {
return 'R'.$c();
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:21
