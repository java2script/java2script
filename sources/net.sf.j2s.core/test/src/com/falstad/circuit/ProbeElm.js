(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "ProbeElm", null, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.center = null;
}, 1);

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

Clazz.newMeth(C$, 'getDumpType', function () {
return 'p'.$c();
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
if (this.point2.y < this.point1.y) {
var x = this.point1;
this.point1 = this.point2;
this.point2 = x;
}this.center = this.interpPoint$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 0.5);
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
var hs = 8;
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, hs);
var selected = (this.needsHighlight() || (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.plotYElm === this  );
var len = (selected || (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.dragElm === this  ) ? 16 : this.dn - 32;
this.calcLeads$I((len|0));
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[0]);
if (selected) g.setColor$java_awt_Color((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).selectColor);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.point1, this.lead1);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[1]);
if (selected) g.setColor$java_awt_Color((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).selectColor);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.lead2, this.point2);
var f = Clazz.new_((I$[1]||(I$[1]=Clazz.load('java.awt.Font'))).c$$S$I$I,["SansSerif", 1, 14]);
g.setFont$java_awt_Font(f);
if (this === (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.plotXElm ) this.drawCenteredText$java_awt_Graphics$S$I$I$Z(g, "X", this.center.x, this.center.y, true);
if (this === (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.plotYElm ) this.drawCenteredText$java_awt_Graphics$S$I$I$Z(g, "Y", this.center.x, this.center.y, true);
if (this.mustShowVoltage()) {
var s = P$.CircuitElm.getShortUnitText$D$S(this.volts[0], "V");
this.drawValues$java_awt_Graphics$S$D(g, s, 4);
}this.drawPosts$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'mustShowVoltage', function () {
return (this.flags & 1) != 0;
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = "scope probe";
arr[1] = "Vd = " + P$.CircuitElm.getVoltageText$D(this.getVoltageDiff());
});

Clazz.newMeth(C$, 'getConnection$I$I', function (n1, n2) {
return false;
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) {
var ei = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[3]||(I$[3]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Show Voltage", this.mustShowVoltage()]);
return ei;
}return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 0) {
if (ei.checkbox.getState()) this.flags = 1;
 else this.flags = this.flags&(-2);
}});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:21
