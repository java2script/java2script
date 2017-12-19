(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "OutputElm", null, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.FLAG_VALUE = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.FLAG_VALUE = 1;
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
return 'O'.$c();
});

Clazz.newMeth(C$, 'getPostCount', function () {
return 1;
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
this.lead1 = Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.awt.Point'))));
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
var selected = (this.needsHighlight() || (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.plotYElm === this  );
var f = Clazz.new_((I$[2]||(I$[2]=Clazz.load('java.awt.Font'))).c$$S$I$I,["SansSerif", selected ? 1 : 0, 14]);
g.setFont$java_awt_Font(f);
g.setColor$java_awt_Color(selected ? (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).selectColor : (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).whiteColor);
var s = (this.flags & 1) != 0 ? P$.CircuitElm.getVoltageText$D(this.volts[0]) : "out";
var fm = g.getFontMetrics();
if (this === (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.plotXElm ) s = "X";
if (this === (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.plotYElm ) s = "Y";
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D(this.point1, this.point2, this.lead1, 1 - ((fm.stringWidth$S(s)/2|0) + 8) / this.dn);
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.lead1, 0);
this.drawCenteredText$java_awt_Graphics$S$I$I$Z(g, s, this.x2, this.y2, true);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[0]);
if (selected) g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).selectColor);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.point1, this.lead1);
this.drawPosts$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'getVoltageDiff', function () {
return this.volts[0];
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = "output";
arr[1] = "V = " + P$.CircuitElm.getVoltageText$D(this.volts[0]);
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) {
var ei = Clazz.new_((I$[3]||(I$[3]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[4]||(I$[4]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Show Voltage", (this.flags & 1) != 0]);
return ei;
}return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 0) this.flags = (ei.checkbox.getState()) ? (this.flags | 1) : (this.flags & -2);
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:21
