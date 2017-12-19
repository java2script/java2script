(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "InductorElm", null, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.ind = null;
this.inductance = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.ind = Clazz.new_((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.Inductor'))).c$$com_falstad_circuit_CirSim,[(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim]);
this.inductance = 1;
this.ind.setup$D$D$I(this.inductance, this.current, this.flags);
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
this.ind = Clazz.new_((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.Inductor'))).c$$com_falstad_circuit_CirSim,[(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim]);
this.inductance =  new Double(st.nextToken()).doubleValue();
this.current =  new Double(st.nextToken()).doubleValue();
this.ind.setup$D$D$I(this.inductance, this.current, this.flags);
}, 1);

Clazz.newMeth(C$, 'getDumpType', function () {
return 'l'.$c();
});

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + new Double(this.inductance).toString() + " " + new Double(this.current).toString() ;
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
this.calcLeads$I(32);
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
var v1 = this.volts[0];
var v2 = this.volts[1];
var i;
var hs = 8;
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, hs);
this.draw2Leads$java_awt_Graphics(g);
this.setPowerColor$java_awt_Graphics$Z(g, false);
this.drawCoil$java_awt_Graphics$I$java_awt_Point$java_awt_Point$D$D(g, 8, this.lead1, this.lead2, v1, v2);
if ((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.showValuesCheckItem.getState()) {
var s = P$.CircuitElm.getShortUnitText$D$S(this.inductance, "H");
this.drawValues$java_awt_Graphics$S$D(g, s, hs);
}this.doDots$java_awt_Graphics(g);
this.drawPosts$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'reset', function () {
this.current = this.volts[0] = this.volts[1] = this.curcount = 0;
this.ind.reset();
});

Clazz.newMeth(C$, 'stamp', function () {
this.ind.stamp$I$I(this.nodes[0], this.nodes[1]);
});

Clazz.newMeth(C$, 'startIteration', function () {
this.ind.startIteration$D(this.volts[0] - this.volts[1]);
});

Clazz.newMeth(C$, 'nonLinear', function () {
return this.ind.nonLinear();
});

Clazz.newMeth(C$, 'calculateCurrent', function () {
var voltdiff = this.volts[0] - this.volts[1];
this.current = this.ind.calculateCurrent$D(voltdiff);
});

Clazz.newMeth(C$, 'doStep', function () {
var voltdiff = this.volts[0] - this.volts[1];
this.ind.doStep$D(voltdiff);
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = "inductor";
this.getBasicInfo$SA(arr);
arr[3] = "L = " + P$.CircuitElm.getUnitText$D$S(this.inductance, "H");
arr[4] = "P = " + P$.CircuitElm.getUnitText$D$S(this.getPower(), "W");
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Inductance (H)", this.inductance, 0, 0]);
if (n == 1) {
var ei = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[3]||(I$[3]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Trapezoidal Approximation", this.ind.isTrapezoidal()]);
return ei;
}return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 0) this.inductance = ei.value;
if (n == 1) {
if (ei.checkbox.getState()) this.flags = this.flags&(-3);
 else this.flags = this.flags|(2);
}this.ind.setup$D$D$I(this.inductance, this.current, this.flags);
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:20
