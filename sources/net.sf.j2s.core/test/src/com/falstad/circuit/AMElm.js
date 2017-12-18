(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "AMElm", null, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.carrierfreq = 0;
this.signalfreq = 0;
this.maxVoltage = 0;
this.freqTimeZero = 0;
this.circleSize = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.circleSize = 17;
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.maxVoltage = 5;
this.carrierfreq = 1000;
this.signalfreq = 40;
this.reset();
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
this.carrierfreq =  new Double(st.nextToken()).doubleValue();
this.signalfreq =  new Double(st.nextToken()).doubleValue();
this.maxVoltage =  new Double(st.nextToken()).doubleValue();
if ((this.flags & 2) != 0) {
this.flags = this.flags&(-3);
}this.reset();
}, 1);

Clazz.newMeth(C$, 'getDumpType', function () {
return 200;
});

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + new Double(this.carrierfreq).toString() + " " + new Double(this.signalfreq).toString() + " " + new Double(this.maxVoltage).toString() ;
});

Clazz.newMeth(C$, 'reset', function () {
this.freqTimeZero = 0;
this.curcount = 0;
});

Clazz.newMeth(C$, 'getPostCount', function () {
return 1;
});

Clazz.newMeth(C$, 'stamp', function () {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampVoltageSource$I$I$I(0, this.nodes[0], this.voltSource);
});

Clazz.newMeth(C$, 'doStep', function () {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.updateVoltageSource$I$I$I$D(0, this.nodes[0], this.voltSource, this.getVoltage());
});

Clazz.newMeth(C$, 'getVoltage', function () {
var w = 2 * 3.141592653589793 * ((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.t - this.freqTimeZero) ;
return ((Math.sin(w * this.signalfreq) + 1) / 2) * Math.sin(w * this.carrierfreq) * this.maxVoltage ;
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 17);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[0]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.point1, this.lead1);
var f = Clazz.new_((I$[1]||(I$[1]=Clazz.load('java.awt.Font'))).c$$S$I$I,["SansSerif", 0, 12]);
g.setFont$java_awt_Font(f);
g.setColor$java_awt_Color(this.needsHighlight() ? (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).selectColor : (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).whiteColor);
this.setPowerColor$java_awt_Graphics$Z(g, false);
var v = this.getVoltage();
var s = "AM";
this.drawCenteredText$java_awt_Graphics$S$I$I$Z(g, s, this.x2, this.y2, true);
this.drawWaveform$java_awt_Graphics$java_awt_Point(g, this.point2);
this.drawPosts$java_awt_Graphics(g);
this.curcount = this.updateDotCount$D$D(-this.current, this.curcount);
if ((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.dragElm !== this ) this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.point1, this.lead1, this.curcount);
});

Clazz.newMeth(C$, 'drawWaveform$java_awt_Graphics$java_awt_Point', function (g, center) {
g.setColor$java_awt_Color(this.needsHighlight() ? (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).selectColor : (I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).gray);
this.setPowerColor$java_awt_Graphics$Z(g, false);
var xc = center.x;
var yc = center.y;
P$.CircuitElm.drawThickCircle$java_awt_Graphics$I$I$I(g, xc, yc, 17);
var wl = 8;
this.adjustBbox$I$I$I$I(xc - 17, yc - 17, xc + 17, yc + 17);
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
this.lead1 = this.interpPoint$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 1 - 17 / this.dn);
});

Clazz.newMeth(C$, 'getVoltageDiff', function () {
return this.volts[0];
});

Clazz.newMeth(C$, 'hasGroundConnection$I', function (n1) {
return true;
});

Clazz.newMeth(C$, 'getVoltageSourceCount', function () {
return 1;
});

Clazz.newMeth(C$, 'getPower', function () {
return -this.getVoltageDiff() * this.current;
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = "AM Source";
arr[1] = "I = " + P$.CircuitElm.getCurrentText$D(this.getCurrent());
arr[2] = "V = " + P$.CircuitElm.getVoltageText$D(this.getVoltageDiff());
arr[3] = "cf = " + P$.CircuitElm.getUnitText$D$S(this.carrierfreq, "Hz");
arr[4] = "sf = " + P$.CircuitElm.getUnitText$D$S(this.signalfreq, "Hz");
arr[5] = "Vmax = " + P$.CircuitElm.getVoltageText$D(this.maxVoltage);
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) return Clazz.new_((I$[3]||(I$[3]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Max Voltage", this.maxVoltage, -20, 20]);
if (n == 1) return Clazz.new_((I$[3]||(I$[3]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Carrier Frequency (Hz)", this.carrierfreq, 4, 500]);
if (n == 2) return Clazz.new_((I$[3]||(I$[3]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Signal Frequency (Hz)", this.signalfreq, 4, 500]);
return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 0) this.maxVoltage = ei.value;
if (n == 1) this.carrierfreq = ei.value;
if (n == 2) this.signalfreq = ei.value;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:17
