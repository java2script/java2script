(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "WireElm", null, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[0]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.point1, this.point2);
this.doDots$java_awt_Graphics(g);
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 3);
if (this.mustShowCurrent()) {
var s = P$.CircuitElm.getShortUnitText$D$S(Math.abs(this.getCurrent()), "A");
this.drawValues$java_awt_Graphics$S$D(g, s, 4);
} else if (this.mustShowVoltage()) {
var s = P$.CircuitElm.getShortUnitText$D$S(this.volts[0], "V");
this.drawValues$java_awt_Graphics$S$D(g, s, 4);
}this.drawPosts$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'stamp', function () {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampVoltageSource$I$I$I$D(this.nodes[0], this.nodes[1], this.voltSource, 0);
});

Clazz.newMeth(C$, 'mustShowCurrent', function () {
return (this.flags & 1) != 0;
});

Clazz.newMeth(C$, 'mustShowVoltage', function () {
return (this.flags & 2) != 0;
});

Clazz.newMeth(C$, 'getVoltageSourceCount', function () {
return 1;
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = "wire";
arr[1] = "I = " + P$.CircuitElm.getCurrentDText$D(this.getCurrent());
arr[2] = "V = " + P$.CircuitElm.getVoltageText$D(this.volts[0]);
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 'w'.$c();
});

Clazz.newMeth(C$, 'getPower', function () {
return 0;
});

Clazz.newMeth(C$, 'getVoltageDiff', function () {
return this.volts[0];
});

Clazz.newMeth(C$, 'isWire', function () {
return true;
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) {
var ei = Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[2]||(I$[2]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Show Current", this.mustShowCurrent()]);
return ei;
}if (n == 1) {
var ei = Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[2]||(I$[2]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Show Voltage", this.mustShowVoltage()]);
return ei;
}return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 0) {
if (ei.checkbox.getState()) this.flags = 1;
 else this.flags = this.flags&(-2);
}if (n == 1) {
if (ei.checkbox.getState()) this.flags = 2;
 else this.flags = this.flags&(-3);
}});

Clazz.newMeth(C$, 'getShortcut', function () {
return 'w'.$c();
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:23
