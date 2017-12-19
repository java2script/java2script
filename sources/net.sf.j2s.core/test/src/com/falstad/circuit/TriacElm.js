(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "TriacElm", null, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.anode = 0;
this.cnode = 0;
this.gnode = 0;
this.inode = 0;
this.diode = null;
this.ia = 0;
this.ic = 0;
this.ig = 0;
this.curcount_a = 0;
this.curcount_c = 0;
this.curcount_g = 0;
this.lastvac = 0;
this.lastvag = 0;
this.cresistance = 0;
this.triggerI = 0;
this.holdingI = 0;
this.hs = 0;
this.poly = null;
this.cathode = null;
this.gate = null;
this.aresistance = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.anode = 0;
this.cnode = 1;
this.gnode = 2;
this.inode = 3;
this.hs = 8;
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.setDefaults();
this.setup();
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
this.setDefaults();
try {
this.lastvac =  new Double(st.nextToken()).doubleValue();
this.lastvag =  new Double(st.nextToken()).doubleValue();
this.volts[0] = 0;
this.volts[1] = -this.lastvac;
this.volts[2] = -this.lastvag;
this.triggerI =  new Double(st.nextToken()).doubleValue();
this.holdingI =  new Double(st.nextToken()).doubleValue();
this.cresistance =  new Double(st.nextToken()).doubleValue();
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
this.setup();
}, 1);

Clazz.newMeth(C$, 'setDefaults', function () {
this.cresistance = 50;
this.holdingI = 0.0082;
this.triggerI = 0.01;
});

Clazz.newMeth(C$, 'setup', function () {
this.diode = Clazz.new_((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.Diode'))).c$$com_falstad_circuit_CirSim,[(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim]);
this.diode.setup$D$D(0.8, 0);
});

Clazz.newMeth(C$, 'nonLinear', function () {
return true;
});

Clazz.newMeth(C$, 'reset', function () {
this.volts[0] = this.volts[1] = this.volts[2] = 0;
this.diode.reset();
this.lastvag = this.lastvac = this.curcount_a = this.curcount_c = this.curcount_g = 0;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 206;
});

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + new Double((this.volts[0] - this.volts[1])).toString() + " " + new Double((this.volts[0] - this.volts[2])).toString() + " " + new Double(this.triggerI).toString() + " " + new Double(this.holdingI).toString() + " " + new Double(this.cresistance).toString() ;
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
var dir = 0;
if (P$.CircuitElm.abs$I(this.dx) > P$.CircuitElm.abs$I(this.dy)) {
dir = -P$.CircuitElm.sign$I(this.dx) * P$.CircuitElm.sign$I(this.dy);
this.point2.y = this.point1.y;
} else {
dir = P$.CircuitElm.sign$I(this.dy) * P$.CircuitElm.sign$I(this.dx);
this.point2.x = this.point1.x;
}if (dir == 0) dir = 1;
this.calcLeads$I(16);
this.cathode = this.newPointArray$I(2);
var pa = this.newPointArray$I(2);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, pa[0], pa[1], 0, 8);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, this.cathode[0], this.cathode[1], 1, 8);
this.poly = this.createPolygon$java_awt_Point$java_awt_Point$java_awt_Point(pa[0], pa[1], this.lead2);
this.gate = this.newPointArray$I(2);
var leadlen = (this.dn - 16) / 2;
var gatelen = (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.gridSize;
gatelen = (gatelen+(leadlen % (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.gridSize)|0);
if (leadlen < gatelen ) {
this.x2 = this.x;
this.y2 = this.y;
return;
}this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead2, this.point2, this.gate[0], gatelen / leadlen, gatelen * dir);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead2, this.point2, this.gate[1], gatelen / leadlen, (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.gridSize * 2 * dir );
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 8);
this.adjustBbox$java_awt_Point$java_awt_Point(this.gate[0], this.gate[1]);
var v1 = this.volts[0];
var v2 = this.volts[1];
this.draw2Leads$java_awt_Graphics(g);
this.setPowerColor$java_awt_Graphics$Z(g, true);
this.setVoltageColor$java_awt_Graphics$D(g, v1);
g.fillPolygon$java_awt_Polygon(this.poly);
this.setVoltageColor$java_awt_Graphics$D(g, v2);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.cathode[0], this.cathode[1]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.lead2, this.gate[0]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.gate[0], this.gate[1]);
this.curcount_a = this.updateDotCount$D$D(this.ia, this.curcount_a);
this.curcount_c = this.updateDotCount$D$D(this.ic, this.curcount_c);
this.curcount_g = this.updateDotCount$D$D(this.ig, this.curcount_g);
if ((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.dragElm !== this ) {
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.point1, this.lead2, this.curcount_a);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.point2, this.lead2, this.curcount_c);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.gate[1], this.gate[0], this.curcount_g);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.gate[0], this.lead2, this.curcount_g + P$.CircuitElm.distance$java_awt_Point$java_awt_Point(this.gate[1], this.gate[0]));
}this.drawPosts$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'getPost$I', function (n) {
return (n == 0) ? this.point1 : (n == 1) ? this.point2 : this.gate[1];
});

Clazz.newMeth(C$, 'getPostCount', function () {
return 3;
});

Clazz.newMeth(C$, 'getInternalNodeCount', function () {
return 1;
});

Clazz.newMeth(C$, 'getPower', function () {
return (this.volts[0] - this.volts[2]) * this.ia + (this.volts[1] - this.volts[2]) * this.ic;
});

Clazz.newMeth(C$, 'stamp', function () {
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[0]);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[1]);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[2]);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[3]);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampResistor$I$I$D(this.nodes[2], this.nodes[1], this.cresistance);
this.diode.stamp$I$I(this.nodes[3], this.nodes[2]);
});

Clazz.newMeth(C$, 'doStep', function () {
var vac = this.volts[0] - this.volts[1];
var vag = this.volts[0] - this.volts[2];
if (Math.abs(vac - this.lastvac) > 0.01  || Math.abs(vag - this.lastvag) > 0.01  ) (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.converged = false;
this.lastvac = vac;
this.lastvag = vag;
this.diode.doStep$D(this.volts[3] - this.volts[2]);
var icmult = 1 / this.triggerI;
var iamult = 1 / this.holdingI - icmult;
this.aresistance = (-icmult * this.ic + this.ia * iamult > 1 ) ? 0.0105 : 1000000.0;
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampResistor$I$I$D(this.nodes[0], this.nodes[3], this.aresistance);
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = "SCR";
var vac = this.volts[0] - this.volts[1];
var vag = this.volts[0] - this.volts[2];
var vgc = this.volts[2] - this.volts[1];
arr[1] = "Ia = " + P$.CircuitElm.getCurrentText$D(this.ia);
arr[2] = "Ig = " + P$.CircuitElm.getCurrentText$D(this.ig);
arr[3] = "Vac = " + P$.CircuitElm.getVoltageText$D(vac);
arr[4] = "Vag = " + P$.CircuitElm.getVoltageText$D(vag);
arr[5] = "Vgc = " + P$.CircuitElm.getVoltageText$D(vgc);
});

Clazz.newMeth(C$, 'calculateCurrent', function () {
this.ic = (this.volts[1] - this.volts[2]) / this.cresistance;
this.ia = (this.volts[0] - this.volts[3]) / this.aresistance;
this.ig = -this.ic - this.ia;
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Trigger Current (A)", this.triggerI, 0, 0]);
if (n == 1) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Holding Current (A)", this.holdingI, 0, 0]);
if (n == 2) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Gate-Cathode Resistance (ohms)", this.cresistance, 0, 0]);
return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 0 && ei.value > 0  ) this.triggerI = ei.value;
if (n == 1 && ei.value > 0  ) this.holdingI = ei.value;
if (n == 2 && ei.value > 0  ) this.cresistance = ei.value;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:22
