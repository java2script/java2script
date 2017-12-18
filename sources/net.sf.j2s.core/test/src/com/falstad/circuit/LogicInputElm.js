(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "LogicInputElm", null, 'com.falstad.circuit.SwitchElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.FLAG_TERNARY = 0;
this.FLAG_NUMERIC = 0;
this.hiV = 0;
this.loV = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.FLAG_TERNARY = 1;
this.FLAG_NUMERIC = 2;
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I$Z.apply(this, [xx, yy, false]);
C$.$init$.apply(this);
this.hiV = 5;
this.loV = 0;
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I$java_util_StringTokenizer.apply(this, [xa, ya, xb, yb, f, st]);
C$.$init$.apply(this);
try {
this.hiV =  new Double(st.nextToken()).doubleValue();
this.loV =  new Double(st.nextToken()).doubleValue();
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
this.hiV = 5;
this.loV = 0;
} else {
throw e;
}
}
if (this.isTernary()) this.posCount = 3;
}, 1);

Clazz.newMeth(C$, 'isTernary', function () {
return (this.flags & 1) != 0;
});

Clazz.newMeth(C$, 'isNumeric', function () {
return (this.flags & 3) != 0;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 'L'.$c();
});

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + new Double(this.hiV).toString() + " " + new Double(this.loV).toString() ;
});

Clazz.newMeth(C$, 'getPostCount', function () {
return 1;
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
this.lead1 = this.interpPoint$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 1 - 12 / this.dn);
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
var f = Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.awt.Font'))).c$$S$I$I,["SansSerif", 1, 20]);
g.setFont$java_awt_Font(f);
g.setColor$java_awt_Color(this.needsHighlight() ? (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).selectColor : (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).whiteColor);
var s = this.position == 0 ? "L" : "H";
if (this.isNumeric()) s = "" + this.position;
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.lead1, 0);
this.drawCenteredText$java_awt_Graphics$S$I$I$Z(g, s, this.x2, this.y2, true);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[0]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.point1, this.lead1);
this.updateDotCount();
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.point1, this.lead1, this.curcount);
this.drawPosts$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'setCurrent$I$D', function (vs, c) {
this.current = -c;
});

Clazz.newMeth(C$, 'stamp', function () {
var v = (this.position == 0) ? this.loV : this.hiV;
if (this.isTernary()) v = this.position * 2.5;
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampVoltageSource$I$I$I$D(0, this.nodes[0], this.voltSource, v);
});

Clazz.newMeth(C$, 'getVoltageSourceCount', function () {
return 1;
});

Clazz.newMeth(C$, 'getVoltageDiff', function () {
return this.volts[0];
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = "logic input";
arr[1] = (this.position == 0) ? "low" : "high";
if (this.isNumeric()) arr[1] = "" + this.position;
arr[1] += " (" + P$.CircuitElm.getVoltageText$D(this.volts[0]) + ")" ;
arr[2] = "I = " + P$.CircuitElm.getCurrentText$D(this.getCurrent());
});

Clazz.newMeth(C$, 'hasGroundConnection$I', function (n1) {
return true;
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) {
var ei = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, 0, 0]);
ei.checkbox = Clazz.new_((I$[3]||(I$[3]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Momentary Switch", this.momentary]);
return ei;
}if (n == 1) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["High Voltage", this.hiV, 10, -10]);
if (n == 2) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Low Voltage", this.loV, 10, -10]);
return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 0) this.momentary = ei.checkbox.getState();
if (n == 1) this.hiV = ei.value;
if (n == 2) this.loV = ei.value;
});

Clazz.newMeth(C$, 'getShortcut', function () {
return 'i'.$c();
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:20
