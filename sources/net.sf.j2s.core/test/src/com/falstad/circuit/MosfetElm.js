(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "MosfetElm", null, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.pnp = 0;
this.FLAG_PNP = 0;
this.FLAG_SHOWVT = 0;
this.FLAG_DIGITAL = 0;
this.vt = 0;
this.hs = 0;
this.pcircler = 0;
this.src = null;
this.drn = null;
this.gate = null;
this.pcircle = null;
this.arrowPoly = null;
this.lastv1 = 0;
this.lastv2 = 0;
this.ids = 0;
this.mode = 0;
this.gm = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.FLAG_PNP = 1;
this.FLAG_SHOWVT = 2;
this.FLAG_DIGITAL = 4;
this.hs = 16;
this.mode = 0;
this.gm = 0;
}, 1);

Clazz.newMeth(C$, 'c$$I$I$Z', function (xx, yy, pnpflag) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.pnp = (pnpflag) ? -1 : 1;
this.flags = (pnpflag) ? this.FLAG_PNP : 0;
this.noDiagonal = true;
this.vt = this.getDefaultThreshold();
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
this.pnp = ((f & this.FLAG_PNP) != 0) ? -1 : 1;
this.noDiagonal = true;
this.vt = this.getDefaultThreshold();
try {
this.vt =  new Double(st.nextToken()).doubleValue();
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
}, 1);

Clazz.newMeth(C$, 'getDefaultThreshold', function () {
return 1.5;
});

Clazz.newMeth(C$, 'getBeta', function () {
return 0.02;
});

Clazz.newMeth(C$, 'nonLinear', function () {
return true;
});

Clazz.newMeth(C$, 'drawDigital', function () {
return (this.flags & this.FLAG_DIGITAL) != 0;
});

Clazz.newMeth(C$, 'reset', function () {
this.lastv1 = this.lastv2 = this.volts[0] = this.volts[1] = this.volts[2] = this.curcount = 0;
});

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + new Double(this.vt).toString() ;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 'f'.$c();
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 16);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[1]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.src[0], this.src[1]);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[2]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.drn[0], this.drn[1]);
var segments = 6;
var i;
this.setPowerColor$java_awt_Graphics$Z(g, true);
var segf = 1.0 / segments;
for (i = 0; i != segments; i++) {
var v = this.volts[1] + (this.volts[2] - this.volts[1]) * i / segments;
this.setVoltageColor$java_awt_Graphics$D(g, v);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D(this.src[1], this.drn[1], (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1, i * segf);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D(this.src[1], this.drn[1], (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2, (i + 1) * segf);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2);
}
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[1]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.src[1], this.src[2]);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[2]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.drn[1], this.drn[2]);
if (!this.drawDigital()) {
this.setVoltageColor$java_awt_Graphics$D(g, this.pnp == 1 ? this.volts[1] : this.volts[2]);
g.fillPolygon$java_awt_Polygon(this.arrowPoly);
}if ((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.powerCheckItem.getState()) g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).gray);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[0]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.point1, this.gate[1]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.gate[0], this.gate[2]);
if (this.drawDigital() && this.pnp == -1 ) P$.CircuitElm.drawThickCircle$java_awt_Graphics$I$I$I(g, this.pcircle.x, this.pcircle.y, this.pcircler);
if ((this.flags & this.FLAG_SHOWVT) != 0) {
var s = "" + new Double((this.vt * this.pnp)).toString();
g.setColor$java_awt_Color((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).whiteColor);
g.setFont$java_awt_Font((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).unitsFont);
this.drawCenteredText$java_awt_Graphics$S$I$I$Z(g, s, this.x2 + 2, this.y2, false);
}if ((this.needsHighlight() || (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.dragElm === this  ) && this.dy == 0 ) {
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).white);
g.setFont$java_awt_Font((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).unitsFont);
var ds = P$.CircuitElm.sign$I(this.dx);
g.drawString$S$I$I("G", this.gate[1].x - 10 * ds, this.gate[1].y - 5);
g.drawString$S$I$I(this.pnp == -1 ? "D" : "S", this.src[0].x - 3 + 9 * ds, this.src[0].y + 4);
g.drawString$S$I$I(this.pnp == -1 ? "S" : "D", this.drn[0].x - 3 + 9 * ds, this.drn[0].y + 4);
}this.curcount = this.updateDotCount$D$D(-this.ids, this.curcount);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.src[0], this.src[1], this.curcount);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.src[1], this.drn[1], this.curcount);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.drn[1], this.drn[0], this.curcount);
this.drawPosts$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'getPost$I', function (n) {
return (n == 0) ? this.point1 : (n == 1) ? this.src[0] : this.drn[0];
});

Clazz.newMeth(C$, 'getCurrent', function () {
return this.ids;
});

Clazz.newMeth(C$, 'getPower', function () {
return this.ids * (this.volts[2] - this.volts[1]);
});

Clazz.newMeth(C$, 'getPostCount', function () {
return 3;
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
var hs2 = 16 * this.dsign;
this.src = this.newPointArray$I(3);
this.drn = this.newPointArray$I(3);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.src[0], this.drn[0], 1, -hs2);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.src[1], this.drn[1], 1 - 22 / this.dn, -hs2);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.src[2], this.drn[2], 1 - 22 / this.dn, (-hs2 * 4/3|0));
this.gate = this.newPointArray$I(3);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.gate[0], this.gate[2], 1 - 28 / this.dn, (hs2/2|0));
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D(this.gate[0], this.gate[2], this.gate[1], 0.5);
if (!this.drawDigital()) {
if (this.pnp == 1) this.arrowPoly = this.calcArrow$java_awt_Point$java_awt_Point$D$D(this.src[1], this.src[0], 10, 4);
 else this.arrowPoly = this.calcArrow$java_awt_Point$java_awt_Point$D$D(this.drn[0], this.drn[1], 12, 5);
} else if (this.pnp == -1) {
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D(this.point1, this.point2, this.gate[1], 1 - 36 / this.dn);
var dist = (this.dsign < 0) ? 32 : 31;
this.pcircle = this.interpPoint$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 1 - dist / this.dn);
this.pcircler = 3;
}});

Clazz.newMeth(C$, 'stamp', function () {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[1]);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[2]);
});

Clazz.newMeth(C$, 'doStep', function () {
var vs = Clazz.array(Double.TYPE, [3]);
vs[0] = this.volts[0];
vs[1] = this.volts[1];
vs[2] = this.volts[2];
if (vs[1] > this.lastv1 + 0.5 ) vs[1] = this.lastv1 + 0.5;
if (vs[1] < this.lastv1 - 0.5 ) vs[1] = this.lastv1 - 0.5;
if (vs[2] > this.lastv2 + 0.5 ) vs[2] = this.lastv2 + 0.5;
if (vs[2] < this.lastv2 - 0.5 ) vs[2] = this.lastv2 - 0.5;
var source = 1;
var drain = 2;
if (this.pnp * vs[1] > this.pnp * vs[2] ) {
source = 2;
drain = 1;
}var gate = 0;
var vgs = vs[gate] - vs[source];
var vds = vs[drain] - vs[source];
if (Math.abs(this.lastv1 - vs[1]) > 0.01  || Math.abs(this.lastv2 - vs[2]) > 0.01  ) (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.converged = false;
this.lastv1 = vs[1];
this.lastv2 = vs[2];
var realvgs = vgs;
var realvds = vds;
vgs *= this.pnp;
vds *= this.pnp;
this.ids = 0;
this.gm = 0;
var Gds = 0;
var beta = this.getBeta();
if (vgs > 0.5  && Clazz.instanceOf(this, "com.falstad.circuit.JfetElm") ) {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stop$S$com_falstad_circuit_CircuitElm("JFET is reverse biased!", this);
return;
}if (vgs < this.vt ) {
Gds = 1.0E-8;
this.ids = vds * Gds;
this.mode = 0;
} else if (vds < vgs - this.vt ) {
this.ids = beta * ((vgs - this.vt) * vds - vds * vds * 0.5 );
this.gm = beta * vds;
Gds = beta * (vgs - vds - this.vt );
this.mode = 1;
} else {
this.gm = beta * (vgs - this.vt);
Gds = 1.0E-8;
this.ids = 0.5 * beta * (vgs - this.vt) * (vgs - this.vt)  + (vds - (vgs - this.vt)) * Gds;
this.mode = 2;
}var rs = -this.pnp * this.ids + Gds * realvds + this.gm * realvgs;
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampMatrix$I$I$D(this.nodes[drain], this.nodes[drain], Gds);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampMatrix$I$I$D(this.nodes[drain], this.nodes[source], -Gds - this.gm);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampMatrix$I$I$D(this.nodes[drain], this.nodes[gate], this.gm);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampMatrix$I$I$D(this.nodes[source], this.nodes[drain], -Gds);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampMatrix$I$I$D(this.nodes[source], this.nodes[source], Gds + this.gm);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampMatrix$I$I$D(this.nodes[source], this.nodes[gate], -this.gm);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampRightSide$I$D(this.nodes[drain], rs);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampRightSide$I$D(this.nodes[source], -rs);
if (source == 2 && this.pnp == 1  || source == 1 && this.pnp == -1  ) this.ids = -this.ids;
});

Clazz.newMeth(C$, 'getFetInfo$SA$S', function (arr, n) {
arr[0] = ((this.pnp == -1) ? "p-" : "n-") + n;
arr[0] += " (Vt = " + P$.CircuitElm.getVoltageText$D(this.pnp * this.vt) + ")" ;
arr[1] = ((this.pnp == 1) ? "Ids = " : "Isd = ") + P$.CircuitElm.getCurrentText$D(this.ids);
arr[2] = "Vgs = " + P$.CircuitElm.getVoltageText$D(this.volts[0] - this.volts[this.pnp == -1 ? 2 : 1]);
arr[3] = ((this.pnp == 1) ? "Vds = " : "Vsd = ") + P$.CircuitElm.getVoltageText$D(this.volts[2] - this.volts[1]);
arr[4] = (this.mode == 0) ? "off" : (this.mode == 1) ? "linear" : "saturation";
arr[5] = "gm = " + P$.CircuitElm.getUnitText$D$S(this.gm, "A/V");
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
this.getFetInfo$SA$S(arr, "MOSFET");
});

Clazz.newMeth(C$, 'canViewInScope', function () {
return true;
});

Clazz.newMeth(C$, 'getVoltageDiff', function () {
return this.volts[2] - this.volts[1];
});

Clazz.newMeth(C$, 'getConnection$I$I', function (n1, n2) {
return !(n1 == 0 || n2 == 0 );
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Threshold Voltage", this.pnp * this.vt, 0.01, 5]);
if (n == 1) {
var ei = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[3]||(I$[3]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Digital Symbol", this.drawDigital()]);
return ei;
}return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 0) this.vt = this.pnp * ei.value;
if (n == 1) {
this.flags = (ei.checkbox.getState()) ? (this.flags | this.FLAG_DIGITAL) : (this.flags & ~this.FLAG_DIGITAL);
this.setPoints();
}});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:20
