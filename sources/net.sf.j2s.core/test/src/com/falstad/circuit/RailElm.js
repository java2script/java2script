(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "RailElm", null, 'com.falstad.circuit.VoltageElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.FLAG_CLOCK = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.FLAG_CLOCK = 1;
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I$I.apply(this, [xx, yy, 0]);
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I', function (xx, yy, wf) {
C$.superclazz.c$$I$I$I.apply(this, [xx, yy, wf]);
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I$java_util_StringTokenizer.apply(this, [xa, ya, xb, yb, f, st]);
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'getDumpType', function () {
return 'R'.$c();
});

Clazz.newMeth(C$, 'getPostCount', function () {
return 1;
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
this.lead1 = this.interpPoint$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 1 - 17 / this.dn);
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 17);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[0]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.point1, this.lead1);
var clock = this.waveform == 2 && (this.flags & 1) != 0 ;
if (this.waveform == 0 || this.waveform == 6  || clock ) {
var f = Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.awt.Font'))).c$$S$I$I,["SansSerif", 0, 12]);
g.setFont$java_awt_Font(f);
g.setColor$java_awt_Color(this.needsHighlight() ? (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).selectColor : (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).whiteColor);
this.setPowerColor$java_awt_Graphics$Z(g, false);
var v = this.getVoltage();
var s = P$.CircuitElm.getShortUnitText$D$S(v, "V");
if (Math.abs(v) < 1 ) s = (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).showFormat.format$D(v) + "V";
if (this.getVoltage() > 0 ) s = "+" + s;
if (Clazz.instanceOf(this, "com.falstad.circuit.AntennaElm")) s = "Ant";
if (clock) s = "CLK";
this.drawCenteredText$java_awt_Graphics$S$I$I$Z(g, s, this.x2, this.y2, true);
} else {
this.drawWaveform$java_awt_Graphics$java_awt_Point(g, this.point2);
}this.drawPosts$java_awt_Graphics(g);
this.curcount = this.updateDotCount$D$D(-this.current, this.curcount);
if ((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.dragElm !== this ) this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.point1, this.lead1, this.curcount);
});

Clazz.newMeth(C$, 'getVoltageDiff', function () {
return this.volts[0];
});

Clazz.newMeth(C$, 'stamp', function () {
if (this.waveform == 0) (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampVoltageSource$I$I$I$D(0, this.nodes[0], this.voltSource, this.getVoltage());
 else (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampVoltageSource$I$I$I(0, this.nodes[0], this.voltSource);
});

Clazz.newMeth(C$, 'doStep', function () {
if (this.waveform != 0) (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.updateVoltageSource$I$I$I$D(0, this.nodes[0], this.voltSource, this.getVoltage());
});

Clazz.newMeth(C$, 'hasGroundConnection$I', function (n1) {
return true;
});

Clazz.newMeth(C$, 'getShortcut', function () {
return 'V'.$c();
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:21
