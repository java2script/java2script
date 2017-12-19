(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "LogicOutputElm", null, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.FLAG_TERNARY = 0;
this.FLAG_NUMERIC = 0;
this.FLAG_PULLDOWN = 0;
this.threshold = 0;
this.value = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.FLAG_TERNARY = 1;
this.FLAG_NUMERIC = 2;
this.FLAG_PULLDOWN = 4;
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.threshold = 2.5;
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
try {
this.threshold =  new Double(st.nextToken()).doubleValue();
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
this.threshold = 2.5;
} else {
throw e;
}
}
}, 1);

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + new Double(this.threshold).toString() ;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 'M'.$c();
});

Clazz.newMeth(C$, 'getPostCount', function () {
return 1;
});

Clazz.newMeth(C$, 'isTernary', function () {
return (this.flags & 1) != 0;
});

Clazz.newMeth(C$, 'isNumeric', function () {
return (this.flags & 3) != 0;
});

Clazz.newMeth(C$, 'needsPullDown', function () {
return (this.flags & 4) != 0;
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
this.lead1 = this.interpPoint$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 1 - 12 / this.dn);
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
var f = Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.awt.Font'))).c$$S$I$I,["SansSerif", 1, 20]);
g.setFont$java_awt_Font(f);
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).lightGrayColor);
var s = (this.volts[0] < this.threshold ) ? "L" : "H";
if (this.isTernary()) {
if (this.volts[0] > 3.75 ) s = "2";
 else if (this.volts[0] > 1.25 ) s = "1";
 else s = "0";
} else if (this.isNumeric()) s = (this.volts[0] < this.threshold ) ? "0" : "1";
this.value = s;
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.lead1, 0);
this.drawCenteredText$java_awt_Graphics$S$I$I$Z(g, s, this.x2, this.y2, true);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[0]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.point1, this.lead1);
this.drawPosts$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'stamp', function () {
if (this.needsPullDown()) (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampResistor$I$I$D(this.nodes[0], 0, 1000000.0);
});

Clazz.newMeth(C$, 'getVoltageDiff', function () {
return this.volts[0];
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = "logic output";
arr[1] = (this.volts[0] < this.threshold ) ? "low" : "high";
if (this.isNumeric()) arr[1] = this.value;
arr[2] = "V = " + P$.CircuitElm.getVoltageText$D(this.volts[0]);
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Threshold", this.threshold, 10, -10]);
if (n == 1) {
var ei = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[3]||(I$[3]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Current Required", this.needsPullDown()]);
return ei;
}return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 0) this.threshold = ei.value;
if (n == 1) {
if (ei.checkbox.getState()) this.flags = 4;
 else this.flags = this.flags&(-5);
}});

Clazz.newMeth(C$, 'getShortcut', function () {
return 'o'.$c();
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:20
