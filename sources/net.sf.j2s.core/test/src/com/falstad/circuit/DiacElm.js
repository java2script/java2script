(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "DiacElm", null, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.onresistance = 0;
this.offresistance = 0;
this.breakdown = 0;
this.holdcurrent = 0;
this.state = false;
this.ps3 = null;
this.ps4 = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.offresistance = 1.0E9;
this.onresistance = 1000.0;
this.breakdown = 1000.0;
this.holdcurrent = 0.001;
this.state = false;
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
this.onresistance =  new Double(st.nextToken()).doubleValue();
this.offresistance =  new Double(st.nextToken()).doubleValue();
this.breakdown =  new Double(st.nextToken()).doubleValue();
this.holdcurrent =  new Double(st.nextToken()).doubleValue();
}, 1);

Clazz.newMeth(C$, 'nonLinear', function () {
return true;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 203;
});

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + new Double(this.onresistance).toString() + " " + new Double(this.offresistance).toString() + " " + new Double(this.breakdown).toString() + " " + new Double(this.holdcurrent).toString() ;
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
this.calcLeads$I(32);
this.ps3 = Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.awt.Point'))));
this.ps4 = Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.awt.Point'))));
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
var i;
var v1 = this.volts[0];
var v2 = this.volts[1];
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 6);
this.draw2Leads$java_awt_Graphics(g);
this.setPowerColor$java_awt_Graphics$Z(g, true);
this.doDots$java_awt_Graphics(g);
this.drawPosts$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'calculateCurrent', function () {
var vd = this.volts[0] - this.volts[1];
if (this.state) this.current = vd / this.onresistance;
 else this.current = vd / this.offresistance;
});

Clazz.newMeth(C$, 'startIteration', function () {
var vd = this.volts[0] - this.volts[1];
if (Math.abs(this.current) < this.holdcurrent ) this.state = false;
if (Math.abs(vd) > this.breakdown ) this.state = true;
});

Clazz.newMeth(C$, 'doStep', function () {
if (this.state) (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampResistor$I$I$D(this.nodes[0], this.nodes[1], this.onresistance);
 else (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampResistor$I$I$D(this.nodes[0], this.nodes[1], this.offresistance);
});

Clazz.newMeth(C$, 'stamp', function () {
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[0]);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[1]);
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = "spark gap";
this.getBasicInfo$SA(arr);
arr[3] = this.state ? "on" : "off";
arr[4] = "Ron = " + P$.CircuitElm.getUnitText$D$S(this.onresistance, P$.CirSim.ohmString);
arr[5] = "Roff = " + P$.CircuitElm.getUnitText$D$S(this.offresistance, P$.CirSim.ohmString);
arr[6] = "Vbrkdn = " + P$.CircuitElm.getUnitText$D$S(this.breakdown, "V");
arr[7] = "Ihold = " + P$.CircuitElm.getUnitText$D$S(this.holdcurrent, "A");
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["On resistance (ohms)", this.onresistance, 0, 0]);
if (n == 1) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Off resistance (ohms)", this.offresistance, 0, 0]);
if (n == 2) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Breakdown voltage (volts)", this.breakdown, 0, 0]);
if (n == 3) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Hold current (amps)", this.holdcurrent, 0, 0]);
return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (ei.value > 0  && n == 0 ) this.onresistance = ei.value;
if (ei.value > 0  && n == 1 ) this.offresistance = ei.value;
if (ei.value > 0  && n == 2 ) this.breakdown = ei.value;
if (ei.value > 0  && n == 3 ) this.holdcurrent = ei.value;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:19
