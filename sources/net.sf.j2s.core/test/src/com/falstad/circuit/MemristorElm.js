(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "MemristorElm", null, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.r_on = 0;
this.r_off = 0;
this.dopeWidth = 0;
this.totalWidth = 0;
this.mobility = 0;
this.resistance = 0;
this.ps3 = null;
this.ps4 = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.r_on = 100;
this.r_off = 160 * this.r_on;
this.dopeWidth = 0;
this.totalWidth = 1.0E-8;
this.mobility = 1.0E-10;
this.resistance = 100;
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
this.r_on =  new Double(st.nextToken()).doubleValue();
this.r_off =  new Double(st.nextToken()).doubleValue();
this.dopeWidth =  new Double(st.nextToken()).doubleValue();
this.totalWidth =  new Double(st.nextToken()).doubleValue();
this.mobility =  new Double(st.nextToken()).doubleValue();
this.resistance = 100;
}, 1);

Clazz.newMeth(C$, 'getDumpType', function () {
return 'm'.$c();
});

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + new Double(this.r_on).toString() + " " + new Double(this.r_off).toString() + " " + new Double(this.dopeWidth).toString() + " " + new Double(this.totalWidth).toString() + " " + new Double(this.mobility).toString() ;
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
this.calcLeads$I(32);
this.ps3 = Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.awt.Point'))));
this.ps4 = Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.awt.Point'))));
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
var segments = 6;
var i;
var ox = 0;
var v1 = this.volts[0];
var v2 = this.volts[1];
var hs = 2 + ((8 * (1 - this.dopeWidth / this.totalWidth))|0);
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, hs);
this.draw2Leads$java_awt_Graphics(g);
this.setPowerColor$java_awt_Graphics$Z(g, true);
var segf = 1.0 / segments;
for (i = 0; i <= segments; i++) {
var nx = (i & 1) == 0 ? 1 : -1;
if (i == segments) nx = 0;
var v = v1 + (v2 - v1) * i / segments;
this.setVoltageColor$java_awt_Graphics$D(g, v);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1, i * segf, hs * ox);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2, i * segf, hs * nx);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1, (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2);
if (i == segments) break;
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1, (i + 1) * segf, hs * nx);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1, (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2);
ox = nx;
}
this.doDots$java_awt_Graphics(g);
this.drawPosts$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'nonLinear', function () {
return true;
});

Clazz.newMeth(C$, 'calculateCurrent', function () {
this.current = (this.volts[0] - this.volts[1]) / this.resistance;
});

Clazz.newMeth(C$, 'reset', function () {
this.dopeWidth = 0;
});

Clazz.newMeth(C$, 'startIteration', function () {
var wd = this.dopeWidth / this.totalWidth;
this.dopeWidth += (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.timeStep * this.mobility * this.r_on * this.current  / this.totalWidth;
if (this.dopeWidth < 0 ) this.dopeWidth = 0;
if (this.dopeWidth > this.totalWidth ) this.dopeWidth = this.totalWidth;
this.resistance = this.r_on * wd + this.r_off * (1 - wd);
});

Clazz.newMeth(C$, 'stamp', function () {
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[0]);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[1]);
});

Clazz.newMeth(C$, 'doStep', function () {
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampResistor$I$I$D(this.nodes[0], this.nodes[1], this.resistance);
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = "memristor";
this.getBasicInfo$SA(arr);
arr[3] = "R = " + P$.CircuitElm.getUnitText$D$S(this.resistance, P$.CirSim.ohmString);
arr[4] = "P = " + P$.CircuitElm.getUnitText$D$S(this.getPower(), "W");
});

Clazz.newMeth(C$, 'getScopeValue$I', function (x) {
return (x == 2) ? this.resistance : (x == 1) ? this.getPower() : this.getVoltageDiff();
});

Clazz.newMeth(C$, 'getScopeUnits$I', function (x) {
return (x == 2) ? P$.CirSim.ohmString : (x == 1) ? "W" : "V";
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Max Resistance (ohms)", this.r_on, 0, 0]);
if (n == 1) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Min Resistance (ohms)", this.r_off, 0, 0]);
if (n == 2) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Width of Doped Region (nm)", this.dopeWidth * 1.0E9, 0, 0]);
if (n == 3) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Total Width (nm)", this.totalWidth * 1.0E9, 0, 0]);
if (n == 4) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Mobility (um^2/(s*V))", this.mobility * 1.0E12, 0, 0]);
return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 0) this.r_on = ei.value;
if (n == 1) this.r_off = ei.value;
if (n == 2) this.dopeWidth = ei.value * 1.0E-9;
if (n == 3) this.totalWidth = ei.value * 1.0E-9;
if (n == 4) this.mobility = ei.value * 1.0E-12;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:20
