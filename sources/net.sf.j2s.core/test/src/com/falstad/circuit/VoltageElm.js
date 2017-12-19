(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "VoltageElm", null, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.waveform = 0;
this.frequency = 0;
this.maxVoltage = 0;
this.freqTimeZero = 0;
this.bias = 0;
this.phaseShift = 0;
this.dutyCycle = 0;
this.circleSize = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.circleSize = 17;
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I', function (xx, yy, wf) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.waveform = wf;
this.maxVoltage = 5;
this.frequency = 40;
this.dutyCycle = 0.5;
this.reset();
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
this.maxVoltage = 5;
this.frequency = 40;
this.waveform = 0;
this.dutyCycle = 0.5;
try {
this.waveform =  new Integer(st.nextToken()).intValue();
this.frequency =  new Double(st.nextToken()).doubleValue();
this.maxVoltage =  new Double(st.nextToken()).doubleValue();
this.bias =  new Double(st.nextToken()).doubleValue();
this.phaseShift =  new Double(st.nextToken()).doubleValue();
this.dutyCycle =  new Double(st.nextToken()).doubleValue();
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
if ((this.flags & 2) != 0) {
this.flags = this.flags&(-3);
this.phaseShift = 1.5707963267948966;
}this.reset();
}, 1);

Clazz.newMeth(C$, 'getDumpType', function () {
return 'v'.$c();
});

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + this.waveform + " " + new Double(this.frequency).toString() + " " + new Double(this.maxVoltage).toString() + " " + new Double(this.bias).toString() + " " + new Double(this.phaseShift).toString() + " " + new Double(this.dutyCycle).toString() ;
});

Clazz.newMeth(C$, 'reset', function () {
this.freqTimeZero = 0;
this.curcount = 0;
});

Clazz.newMeth(C$, 'triangleFunc$D', function (x) {
if (x < 3.141592653589793 ) return x * 0.6366197723675814 - 1;
return 1 - (x - 3.141592653589793) * 0.6366197723675814;
});

Clazz.newMeth(C$, 'stamp', function () {
if (this.waveform == 0) (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampVoltageSource$I$I$I$D(this.nodes[0], this.nodes[1], this.voltSource, this.getVoltage());
 else (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampVoltageSource$I$I$I(this.nodes[0], this.nodes[1], this.voltSource);
});

Clazz.newMeth(C$, 'doStep', function () {
if (this.waveform != 0) (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.updateVoltageSource$I$I$I$D(this.nodes[0], this.nodes[1], this.voltSource, this.getVoltage());
});

Clazz.newMeth(C$, 'getVoltage', function () {
var w = 2 * 3.141592653589793 * ((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.t - this.freqTimeZero) * this.frequency  + this.phaseShift;
switch (this.waveform) {
case 0:
return this.maxVoltage + this.bias;
case 1:
return Math.sin(w) * this.maxVoltage + this.bias;
case 2:
return this.bias + ((w % 6.283185307179586 > (2 * 3.141592653589793 * this.dutyCycle ) ) ? -this.maxVoltage : this.maxVoltage);
case 3:
return this.bias + this.triangleFunc$D(w % 6.283185307179586) * this.maxVoltage;
case 4:
return this.bias + (w % 6.283185307179586) * (this.maxVoltage / 3.141592653589793) - this.maxVoltage;
case 5:
return ((w % 6.283185307179586) < 1 ) ? this.maxVoltage + this.bias : this.bias;
default:
return 0;
}
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
this.calcLeads$I((this.waveform == 0 || this.waveform == 6 ) ? 8 : 34);
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
this.setBbox$I$I$I$I(this.x, this.y, this.x2, this.y2);
this.draw2Leads$java_awt_Graphics(g);
if (this.waveform == 0) {
this.setPowerColor$java_awt_Graphics$Z(g, false);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[0]);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2, 0, 10);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[1]);
var hs = 16;
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, hs);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2, 1, hs);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2);
} else {
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 17);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D(this.lead1, this.lead2, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1, 0.5);
this.drawWaveform$java_awt_Graphics$java_awt_Point(g, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1);
}this.updateDotCount();
if ((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.dragElm !== this ) {
if (this.waveform == 0) this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.point1, this.point2, this.curcount);
 else {
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.point1, this.lead1, this.curcount);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.point2, this.lead2, -this.curcount);
}}this.drawPosts$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'drawWaveform$java_awt_Graphics$java_awt_Point', function (g, center) {
g.setColor$java_awt_Color(this.needsHighlight() ? (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).selectColor : (I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).gray);
this.setPowerColor$java_awt_Graphics$Z(g, false);
var xc = center.x;
var yc = center.y;
P$.CircuitElm.drawThickCircle$java_awt_Graphics$I$I$I(g, xc, yc, 17);
var wl = 8;
this.adjustBbox$I$I$I$I(xc - 17, yc - 17, xc + 17, yc + 17);
var xc2;
switch (this.waveform) {
case 0:
{
break;
}case 2:
xc2 = ((wl * 2 * this.dutyCycle  - wl + xc)|0);
xc2 = P$.CircuitElm.max$I$I(xc - wl + 3, P$.CircuitElm.min$I$I(xc + wl - 3, xc2));
P$.CircuitElm.drawThickLine$java_awt_Graphics$I$I$I$I(g, xc - wl, yc - wl, xc - wl, yc);
P$.CircuitElm.drawThickLine$java_awt_Graphics$I$I$I$I(g, xc - wl, yc - wl, xc2, yc - wl);
P$.CircuitElm.drawThickLine$java_awt_Graphics$I$I$I$I(g, xc2, yc - wl, xc2, yc + wl);
P$.CircuitElm.drawThickLine$java_awt_Graphics$I$I$I$I(g, xc + wl, yc + wl, xc2, yc + wl);
P$.CircuitElm.drawThickLine$java_awt_Graphics$I$I$I$I(g, xc + wl, yc, xc + wl, yc + wl);
break;
case 5:
yc = yc+((wl/2|0));
P$.CircuitElm.drawThickLine$java_awt_Graphics$I$I$I$I(g, xc - wl, yc - wl, xc - wl, yc);
P$.CircuitElm.drawThickLine$java_awt_Graphics$I$I$I$I(g, xc - wl, yc - wl, xc - (wl/2|0), yc - wl);
P$.CircuitElm.drawThickLine$java_awt_Graphics$I$I$I$I(g, xc - (wl/2|0), yc - wl, xc - (wl/2|0), yc);
P$.CircuitElm.drawThickLine$java_awt_Graphics$I$I$I$I(g, xc - (wl/2|0), yc, xc + wl, yc);
break;
case 4:
P$.CircuitElm.drawThickLine$java_awt_Graphics$I$I$I$I(g, xc, yc - wl, xc - wl, yc);
P$.CircuitElm.drawThickLine$java_awt_Graphics$I$I$I$I(g, xc, yc - wl, xc, yc + wl);
P$.CircuitElm.drawThickLine$java_awt_Graphics$I$I$I$I(g, xc, yc + wl, xc + wl, yc);
break;
case 3:
{
var xl = 5;
P$.CircuitElm.drawThickLine$java_awt_Graphics$I$I$I$I(g, xc - xl * 2, yc, xc - xl, yc - wl);
P$.CircuitElm.drawThickLine$java_awt_Graphics$I$I$I$I(g, xc - xl, yc - wl, xc, yc);
P$.CircuitElm.drawThickLine$java_awt_Graphics$I$I$I$I(g, xc, yc, xc + xl, yc + wl);
P$.CircuitElm.drawThickLine$java_awt_Graphics$I$I$I$I(g, xc + xl, yc + wl, xc + xl * 2, yc);
break;
}case 1:
{
var i;
var xl = 10;
var ox = -1;
var oy = -1;
for (i = -xl; i <= xl; i++) {
var yy = yc + ((0.95 * Math.sin(i * 3.141592653589793 / xl) * wl )|0);
if (ox != -1) P$.CircuitElm.drawThickLine$java_awt_Graphics$I$I$I$I(g, ox, oy, xc + i, yy);
ox = xc + i;
oy = yy;
}
break;
}}
if ((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.showValuesCheckItem.getState()) {
var s = P$.CircuitElm.getShortUnitText$D$S(this.frequency, "Hz");
if (this.dx == 0 || this.dy == 0 ) this.drawValues$java_awt_Graphics$S$D(g, s, 17);
}});

Clazz.newMeth(C$, 'getVoltageSourceCount', function () {
return 1;
});

Clazz.newMeth(C$, 'getPower', function () {
return -this.getVoltageDiff() * this.current;
});

Clazz.newMeth(C$, 'getVoltageDiff', function () {
return this.volts[1] - this.volts[0];
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
switch (this.waveform) {
case 0:
case 6:
arr[0] = "voltage source";
break;
case 1:
arr[0] = "A/C source";
break;
case 2:
arr[0] = "square wave gen";
break;
case 5:
arr[0] = "pulse gen";
break;
case 4:
arr[0] = "sawtooth gen";
break;
case 3:
arr[0] = "triangle gen";
break;
}
arr[1] = "I = " + P$.CircuitElm.getCurrentText$D(this.getCurrent());
arr[2] = ((Clazz.instanceOf(this, "com.falstad.circuit.RailElm")) ? "V = " : "Vd = ") + P$.CircuitElm.getVoltageText$D(this.getVoltageDiff());
if (this.waveform != 0 && this.waveform != 6 ) {
arr[3] = "f = " + P$.CircuitElm.getUnitText$D$S(this.frequency, "Hz");
arr[4] = "Vmax = " + P$.CircuitElm.getVoltageText$D(this.maxVoltage);
var i = 5;
if (this.bias != 0 ) arr[i++] = "Voff = " + P$.CircuitElm.getVoltageText$D(this.bias);
 else if (this.frequency > 500 ) arr[i++] = "wavelength = " + P$.CircuitElm.getUnitText$D$S(2.9979E8 / this.frequency, "m");
arr[i++] = "P = " + P$.CircuitElm.getUnitText$D$S(this.getPower(), "W");
}});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,[this.waveform == 0 ? "Voltage" : "Max Voltage", this.maxVoltage, -20, 20]);
if (n == 1) {
var ei = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Waveform", this.waveform, -1, -1]);
ei.choice = Clazz.new_((I$[3]||(I$[3]=Clazz.load('a2s.Choice'))));
ei.choice.add$S("D/C");
ei.choice.add$S("A/C");
ei.choice.add$S("Square Wave");
ei.choice.add$S("Triangle");
ei.choice.add$S("Sawtooth");
ei.choice.add$S("Pulse");
ei.choice.select$I(this.waveform);
return ei;
}if (this.waveform == 0) return null;
if (n == 2) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Frequency (Hz)", this.frequency, 4, 500]);
if (n == 3) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["DC Offset (V)", this.bias, -20, 20]);
if (n == 4) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Phase Offset (degrees)", this.phaseShift * 180 / 3.141592653589793, -180, 180]).setDimensionless();
if (n == 5 && this.waveform == 2 ) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Duty Cycle", this.dutyCycle * 100, 0, 100]).setDimensionless();
return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 0) this.maxVoltage = ei.value;
if (n == 3) this.bias = ei.value;
if (n == 2) {
var oldfreq = this.frequency;
this.frequency = ei.value;
var maxfreq = 1 / (8 * (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.timeStep);
if (this.frequency > maxfreq ) this.frequency = maxfreq;
var adj = this.frequency - oldfreq;
this.freqTimeZero = (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.t - oldfreq * ((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.t - this.freqTimeZero) / this.frequency;
}if (n == 1) {
var ow = this.waveform;
this.waveform = ei.choice.getSelectedIndex();
if (this.waveform == 0 && ow != 0 ) {
ei.newDialog = true;
this.bias = 0;
} else if (this.waveform != 0 && ow == 0 ) {
ei.newDialog = true;
}if ((this.waveform == 2 || ow == 2 ) && this.waveform != ow ) ei.newDialog = true;
this.setPoints();
}if (n == 4) this.phaseShift = ei.value * 3.141592653589793 / 180;
if (n == 5) this.dutyCycle = ei.value * 0.01;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:23
