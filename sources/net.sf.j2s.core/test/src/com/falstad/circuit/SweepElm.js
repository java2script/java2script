(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "SweepElm", null, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.maxV = 0;
this.maxF = 0;
this.minF = 0;
this.sweepTime = 0;
this.frequency = 0;
this.FLAG_LOG = 0;
this.FLAG_BIDIR = 0;
this.circleSize = 0;
this.fadd = 0;
this.fmul = 0;
this.freqTime = 0;
this.savedTimeStep = 0;
this.dir = 0;
this.v = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.FLAG_LOG = 1;
this.FLAG_BIDIR = 2;
this.circleSize = 17;
this.dir = 1;
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.minF = 20;
this.maxF = 4000;
this.maxV = 5;
this.sweepTime = 0.1;
this.flags = 2;
this.reset();
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
this.minF =  new Double(st.nextToken()).doubleValue();
this.maxF =  new Double(st.nextToken()).doubleValue();
this.maxV =  new Double(st.nextToken()).doubleValue();
this.sweepTime =  new Double(st.nextToken()).doubleValue();
this.reset();
}, 1);

Clazz.newMeth(C$, 'getDumpType', function () {
return 170;
});

Clazz.newMeth(C$, 'getPostCount', function () {
return 1;
});

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + new Double(this.minF).toString() + " " + new Double(this.maxF).toString() + " " + new Double(this.maxV).toString() + " " + new Double(this.sweepTime).toString() ;
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
this.lead1 = this.interpPoint$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 1 - 17 / this.dn);
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 17);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[0]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.point1, this.lead1);
g.setColor$java_awt_Color(this.needsHighlight() ? (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).selectColor : (I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).gray);
this.setPowerColor$java_awt_Graphics$Z(g, false);
var xc = this.point2.x;
var yc = this.point2.y;
P$.CircuitElm.drawThickCircle$java_awt_Graphics$I$I$I(g, xc, yc, 17);
var wl = 8;
this.adjustBbox$I$I$I$I(xc - 17, yc - 17, xc + 17, yc + 17);
var i;
var xl = 10;
var ox = -1;
var oy = -1;
var tm = System.currentTimeMillis();
tm = tm%(2000);
if (tm > 1000) tm = 2000 - tm;
var w = 1 + tm * 0.002;
if (!(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stoppedCheck.getState()) w = 1 + 2 * (this.frequency - this.minF) / (this.maxF - this.minF);
for (i = -xl; i <= xl; i++) {
var yy = yc + ((0.95 * Math.sin(i * 3.141592653589793 * w  / xl) * wl )|0);
if (ox != -1) P$.CircuitElm.drawThickLine$java_awt_Graphics$I$I$I$I(g, ox, oy, xc + i, yy);
ox = xc + i;
oy = yy;
}
if ((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.showValuesCheckItem.getState()) {
var s = P$.CircuitElm.getShortUnitText$D$S(this.frequency, "Hz");
if (this.dx == 0 || this.dy == 0 ) this.drawValues$java_awt_Graphics$S$D(g, s, 17);
}this.drawPosts$java_awt_Graphics(g);
this.curcount = this.updateDotCount$D$D(-this.current, this.curcount);
if ((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.dragElm !== this ) this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.point1, this.lead1, this.curcount);
});

Clazz.newMeth(C$, 'stamp', function () {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampVoltageSource$I$I$I(0, this.nodes[0], this.voltSource);
});

Clazz.newMeth(C$, 'setParams', function () {
if (this.frequency < this.minF  || this.frequency > this.maxF  ) {
this.frequency = this.minF;
this.freqTime = 0;
this.dir = 1;
}if ((this.flags & 1) == 0) {
this.fadd = this.dir * (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.timeStep * (this.maxF - this.minF)  / this.sweepTime;
this.fmul = 1;
} else {
this.fadd = 0;
this.fmul = Math.pow(this.maxF / this.minF, this.dir * (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.timeStep / this.sweepTime);
}this.savedTimeStep = (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.timeStep;
});

Clazz.newMeth(C$, 'reset', function () {
this.frequency = this.minF;
this.freqTime = 0;
this.dir = 1;
this.setParams();
});

Clazz.newMeth(C$, 'startIteration', function () {
if ((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.timeStep != this.savedTimeStep ) this.setParams();
this.v = Math.sin(this.freqTime) * this.maxV;
this.freqTime += this.frequency * 2 * 3.141592653589793 * (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.timeStep ;
this.frequency = this.frequency * this.fmul + this.fadd;
if (this.frequency >= this.maxF  && this.dir == 1 ) {
if ((this.flags & 2) != 0) {
this.fadd = -this.fadd;
this.fmul = 1 / this.fmul;
this.dir = -1;
} else this.frequency = this.minF;
}if (this.frequency <= this.minF  && this.dir == -1 ) {
this.fadd = -this.fadd;
this.fmul = 1 / this.fmul;
this.dir = 1;
}});

Clazz.newMeth(C$, 'doStep', function () {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.updateVoltageSource$I$I$I$D(0, this.nodes[0], this.voltSource, this.v);
});

Clazz.newMeth(C$, 'getVoltageDiff', function () {
return this.volts[0];
});

Clazz.newMeth(C$, 'getVoltageSourceCount', function () {
return 1;
});

Clazz.newMeth(C$, 'hasGroundConnection$I', function (n1) {
return true;
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = "sweep " + (((this.flags & 1) == 0) ? "(linear)" : "(log)");
arr[1] = "I = " + P$.CircuitElm.getCurrentDText$D(this.getCurrent());
arr[2] = "V = " + P$.CircuitElm.getVoltageText$D(this.volts[0]);
arr[3] = "f = " + P$.CircuitElm.getUnitText$D$S(this.frequency, "Hz");
arr[4] = "range = " + P$.CircuitElm.getUnitText$D$S(this.minF, "Hz") + " .. " + P$.CircuitElm.getUnitText$D$S(this.maxF, "Hz") ;
arr[5] = "time = " + P$.CircuitElm.getUnitText$D$S(this.sweepTime, "s");
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Min Frequency (Hz)", this.minF, 0, 0]);
if (n == 1) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Max Frequency (Hz)", this.maxF, 0, 0]);
if (n == 2) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Sweep Time (s)", this.sweepTime, 0, 0]);
if (n == 3) {
var ei = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[3]||(I$[3]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Logarithmic", (this.flags & 1) != 0]);
return ei;
}if (n == 4) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Max Voltage", this.maxV, 0, 0]);
if (n == 5) {
var ei = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[3]||(I$[3]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Bidirectional", (this.flags & 2) != 0]);
return ei;
}return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
var maxfreq = 1 / (8 * (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.timeStep);
if (n == 0) {
this.minF = ei.value;
if (this.minF > maxfreq ) this.minF = maxfreq;
}if (n == 1) {
this.maxF = ei.value;
if (this.maxF > maxfreq ) this.maxF = maxfreq;
}if (n == 2) this.sweepTime = ei.value;
if (n == 3) {
this.flags = this.flags&(-2);
if (ei.checkbox.getState()) this.flags = this.flags|(1);
}if (n == 4) this.maxV = ei.value;
if (n == 5) {
this.flags = this.flags&(-3);
if (ei.checkbox.getState()) this.flags = this.flags|(2);
}this.setParams();
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:22
