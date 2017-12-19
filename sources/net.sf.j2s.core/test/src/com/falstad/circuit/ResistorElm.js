(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "ResistorElm", null, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.resistance = 0;
this.ps3 = null;
this.ps4 = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.resistance = 100;
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
this.resistance =  new Double(st.nextToken()).doubleValue();
}, 1);

Clazz.newMeth(C$, 'getDumpType', function () {
return 'r'.$c();
});

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + new Double(this.resistance).toString() ;
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
this.calcLeads$I(32);
this.ps3 = Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.awt.Point'))));
this.ps4 = Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.awt.Point'))));
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
var segments = 16;
var i;
var ox = 0;
var hs = (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.euroResistorCheckItem.getState() ? 6 : 8;
var v1 = this.volts[0];
var v2 = this.volts[1];
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, hs);
this.draw2Leads$java_awt_Graphics(g);
this.setPowerColor$java_awt_Graphics$Z(g, true);
var segf = 1.0 / segments;
if (!(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.euroResistorCheckItem.getState()) {
for (i = 0; i != segments; i++) {
var nx = 0;
switch (i & 3) {
case 0:
nx = 1;
break;
case 2:
nx = -1;
break;
default:
nx = 0;
break;
}
var v = v1 + (v2 - v1) * i / segments;
this.setVoltageColor$java_awt_Graphics$D(g, v);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1, i * segf, hs * ox);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2, (i + 1) * segf, hs * nx);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1, (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2);
ox = nx;
}
} else {
this.setVoltageColor$java_awt_Graphics$D(g, v1);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1, (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2, 0, hs);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1, (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2);
for (i = 0; i != segments; i++) {
var v = v1 + (v2 - v1) * i / segments;
this.setVoltageColor$java_awt_Graphics$D(g, v);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1, (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2, i * segf, hs);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, this.ps3, this.ps4, (i + 1) * segf, hs);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1, this.ps3);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2, this.ps4);
}
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1, (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2, 1, hs);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1, (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2);
}if ((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.showValuesCheckItem.getState()) {
var s = P$.CircuitElm.getShortUnitText$D$S(this.resistance, "");
this.drawValues$java_awt_Graphics$S$D(g, s, hs);
}this.doDots$java_awt_Graphics(g);
this.drawPosts$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'calculateCurrent', function () {
this.current = (this.volts[0] - this.volts[1]) / this.resistance;
});

Clazz.newMeth(C$, 'stamp', function () {
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampResistor$I$I$D(this.nodes[0], this.nodes[1], this.resistance);
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = "resistor";
this.getBasicInfo$SA(arr);
arr[3] = "R = " + P$.CircuitElm.getUnitText$D$S(this.resistance, P$.CirSim.ohmString);
arr[4] = "P = " + P$.CircuitElm.getUnitText$D$S(this.getPower(), "W");
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Resistance (ohms)", this.resistance, 0, 0]);
return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (ei.value > 0 ) this.resistance = ei.value;
});

Clazz.newMeth(C$, 'getShortcut', function () {
return 'r'.$c();
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:21
