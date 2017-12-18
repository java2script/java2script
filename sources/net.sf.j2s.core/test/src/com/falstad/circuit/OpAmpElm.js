(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "OpAmpElm", null, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.opsize = 0;
this.opheight = 0;
this.opwidth = 0;
this.opaddtext = 0;
this.maxOut = 0;
this.minOut = 0;
this.gain = 0;
this.gbw = 0;
this.$reset = false;
this.FLAG_SWAP = 0;
this.FLAG_SMALL = 0;
this.FLAG_LOWGAIN = 0;
this.in1p = null;
this.in2p = null;
this.textp = null;
this.triangle = null;
this.plusFont = null;
this.lastvd = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.FLAG_SWAP = 1;
this.FLAG_SMALL = 2;
this.FLAG_LOWGAIN = 4;
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.noDiagonal = true;
this.maxOut = 15;
this.minOut = -15;
this.gbw = 1000000.0;
this.setSize$I((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.smallGridCheckItem.getState() ? 1 : 2);
this.setGain();
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
this.maxOut = 15;
this.minOut = -15;
this.gbw = 1000000.0;
try {
this.maxOut =  new Double(st.nextToken()).doubleValue();
this.minOut =  new Double(st.nextToken()).doubleValue();
this.gbw =  new Double(st.nextToken()).doubleValue();
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
this.noDiagonal = true;
this.setSize$I((f & 2) != 0 ? 1 : 2);
this.setGain();
}, 1);

Clazz.newMeth(C$, 'setGain', function () {
this.gain = ((this.flags & 4) != 0) ? 1000 : 100000;
});

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + new Double(this.maxOut).toString() + " " + new Double(this.minOut).toString() + " " + new Double(this.gbw).toString() ;
});

Clazz.newMeth(C$, 'nonLinear', function () {
return true;
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, this.opheight * 2);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[0]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.in1p[0], this.in1p[1]);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[1]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.in2p[0], this.in2p[1]);
g.setColor$java_awt_Color(this.needsHighlight() ? (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).selectColor : (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).lightGrayColor);
this.setPowerColor$java_awt_Graphics$Z(g, true);
P$.CircuitElm.drawThickPolygon$java_awt_Graphics$java_awt_Polygon(g, this.triangle);
g.setFont$java_awt_Font(this.plusFont);
this.drawCenteredText$java_awt_Graphics$S$I$I$Z(g, "-", this.textp[0].x, this.textp[0].y - 2, true);
this.drawCenteredText$java_awt_Graphics$S$I$I$Z(g, "+", this.textp[1].x, this.textp[1].y, true);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[2]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.lead2, this.point2);
this.curcount = this.updateDotCount$D$D(this.current, this.curcount);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.point2, this.lead2, this.curcount);
this.drawPosts$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'getPower', function () {
return this.volts[2] * this.current;
});

Clazz.newMeth(C$, 'setSize$I', function (s) {
this.opsize = s;
this.opheight = 8 * s;
this.opwidth = 13 * s;
this.flags = (this.flags & -3) | ((s == 1) ? 2 : 0);
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
if (this.dn > 150  && this === (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.dragElm  ) this.setSize$I(2);
var ww = this.opwidth;
if (ww > this.dn / 2 ) ww = ((this.dn / 2)|0);
this.calcLeads$I(ww * 2);
var hs = this.opheight * this.dsign;
if ((this.flags & 1) != 0) hs = -hs;
this.in1p = this.newPointArray$I(2);
this.in2p = this.newPointArray$I(2);
this.textp = this.newPointArray$I(2);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.in1p[0], this.in2p[0], 0, hs);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, this.in1p[1], this.in2p[1], 0, hs);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, this.textp[0], this.textp[1], 0.2, hs);
var tris = this.newPointArray$I(2);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, tris[0], tris[1], 0, hs * 2);
this.triangle = this.createPolygon$java_awt_Point$java_awt_Point$java_awt_Point(tris[0], tris[1], this.lead2);
this.plusFont = Clazz.new_((I$[1]||(I$[1]=Clazz.load('java.awt.Font'))).c$$S$I$I,["SansSerif", 0, this.opsize == 2 ? 14 : 10]);
});

Clazz.newMeth(C$, 'getPostCount', function () {
return 3;
});

Clazz.newMeth(C$, 'getPost$I', function (n) {
return (n == 0) ? this.in1p[0] : (n == 1) ? this.in2p[0] : this.point2;
});

Clazz.newMeth(C$, 'getVoltageSourceCount', function () {
return 1;
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = "op-amp";
arr[1] = "V+ = " + P$.CircuitElm.getVoltageText$D(this.volts[1]);
arr[2] = "V- = " + P$.CircuitElm.getVoltageText$D(this.volts[0]);
var vo = Math.max(Math.min(this.volts[2], this.maxOut), this.minOut);
arr[3] = "Vout = " + P$.CircuitElm.getVoltageText$D(vo);
arr[4] = "Iout = " + P$.CircuitElm.getCurrentText$D(this.getCurrent());
arr[5] = "range = " + P$.CircuitElm.getVoltageText$D(this.minOut) + " to " + P$.CircuitElm.getVoltageText$D(this.maxOut) ;
});

Clazz.newMeth(C$, 'stamp', function () {
var vn = (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.nodeList.size() + this.voltSource;
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(vn);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampMatrix$I$I$D(this.nodes[2], vn, 1);
});

Clazz.newMeth(C$, 'doStep', function () {
var vd = this.volts[1] - this.volts[0];
if (Math.abs(this.lastvd - vd) > 0.1 ) (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.converged = false;
 else if (this.volts[2] > this.maxOut + 0.1  || this.volts[2] < this.minOut - 0.1  ) (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.converged = false;
var x = 0;
var vn = (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.nodeList.size() + this.voltSource;
var dx = 0;
if (vd >= this.maxOut / this.gain  && (this.lastvd >= 0  || (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.getrand$I(4) == 1 ) ) {
dx = 1.0E-4;
x = this.maxOut - dx * this.maxOut / this.gain;
} else if (vd <= this.minOut / this.gain  && (this.lastvd <= 0  || (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.getrand$I(4) == 1 ) ) {
dx = 1.0E-4;
x = this.minOut - dx * this.minOut / this.gain;
} else dx = this.gain;
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampMatrix$I$I$D(vn, this.nodes[0], dx);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampMatrix$I$I$D(vn, this.nodes[1], -dx);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampMatrix$I$I$D(vn, this.nodes[2], 1);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampRightSide$I$D(vn, x);
this.lastvd = vd;
});

Clazz.newMeth(C$, 'getConnection$I$I', function (n1, n2) {
return false;
});

Clazz.newMeth(C$, 'hasGroundConnection$I', function (n1) {
return (n1 == 2);
});

Clazz.newMeth(C$, 'getVoltageDiff', function () {
return this.volts[2] - this.volts[1];
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 'a'.$c();
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Max Output (V)", this.maxOut, 1, 20]);
if (n == 1) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Min Output (V)", this.minOut, -20, 0]);
return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 0) this.maxOut = ei.value;
if (n == 1) this.minOut = ei.value;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:20
