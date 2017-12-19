(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "TransistorElm", null, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.pnp = 0;
this.beta = 0;
this.fgain = 0;
this.gmin = 0;
this.FLAG_FLIP = 0;
this.ic = 0;
this.ie = 0;
this.ib = 0;
this.curcount_c = 0;
this.curcount_e = 0;
this.curcount_b = 0;
this.rectPoly = null;
this.arrowPoly = null;
this.rect = null;
this.coll = null;
this.emit = null;
this.base = null;
this.vcrit = 0;
this.lastvbc = 0;
this.lastvbe = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.FLAG_FLIP = 1;
}, 1);

Clazz.newMeth(C$, 'c$$I$I$Z', function (xx, yy, pnpflag) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.pnp = (pnpflag) ? -1 : 1;
this.beta = 100;
this.setup();
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
this.pnp =  new Integer(st.nextToken()).intValue();
this.beta = 100;
try {
this.lastvbe =  new Double(st.nextToken()).doubleValue();
this.lastvbc =  new Double(st.nextToken()).doubleValue();
this.volts[0] = 0;
this.volts[1] = -this.lastvbe;
this.volts[2] = -this.lastvbc;
this.beta =  new Double(st.nextToken()).doubleValue();
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
this.setup();
}, 1);

Clazz.newMeth(C$, 'setup', function () {
this.vcrit = 0.025 * Math.log(0.025 / (Math.sqrt(2) * 1.0E-13));
this.fgain = this.beta / (this.beta + 1);
this.noDiagonal = true;
});

Clazz.newMeth(C$, 'nonLinear', function () {
return true;
});

Clazz.newMeth(C$, 'reset', function () {
this.volts[0] = this.volts[1] = this.volts[2] = 0;
this.lastvbc = this.lastvbe = this.curcount_c = this.curcount_e = this.curcount_b = 0;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 't'.$c();
});

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + this.pnp + " " + new Double((this.volts[0] - this.volts[1])).toString() + " " + new Double((this.volts[0] - this.volts[2])).toString() + " " + new Double(this.beta).toString() ;
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 16);
this.setPowerColor$java_awt_Graphics$Z(g, true);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[1]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.coll[0], this.coll[1]);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[2]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.emit[0], this.emit[1]);
g.setColor$java_awt_Color((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).lightGrayColor);
g.fillPolygon$java_awt_Polygon(this.arrowPoly);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[0]);
if ((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.powerCheckItem.getState()) g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).gray);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.point1, this.base);
this.curcount_b = this.updateDotCount$D$D(-this.ib, this.curcount_b);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.base, this.point1, this.curcount_b);
this.curcount_c = this.updateDotCount$D$D(-this.ic, this.curcount_c);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.coll[1], this.coll[0], this.curcount_c);
this.curcount_e = this.updateDotCount$D$D(-this.ie, this.curcount_e);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.emit[1], this.emit[0], this.curcount_e);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[0]);
this.setPowerColor$java_awt_Graphics$Z(g, true);
g.fillPolygon$java_awt_Polygon(this.rectPoly);
if ((this.needsHighlight() || (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.dragElm === this  ) && this.dy == 0 ) {
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('java.awt.Color'))).white);
g.setFont$java_awt_Font((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).unitsFont);
var ds = P$.CircuitElm.sign$I(this.dx);
g.drawString$S$I$I("B", this.base.x - 10 * ds, this.base.y - 5);
g.drawString$S$I$I("C", this.coll[0].x - 3 + 9 * ds, this.coll[0].y + 4);
g.drawString$S$I$I("E", this.emit[0].x - 3 + 9 * ds, this.emit[0].y + 4);
}this.drawPosts$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'getPost$I', function (n) {
return (n == 0) ? this.point1 : (n == 1) ? this.coll[0] : this.emit[0];
});

Clazz.newMeth(C$, 'getPostCount', function () {
return 3;
});

Clazz.newMeth(C$, 'getPower', function () {
return (this.volts[0] - this.volts[2]) * this.ib + (this.volts[1] - this.volts[2]) * this.ic;
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
var hs = 16;
if ((this.flags & 1) != 0) this.dsign = -this.dsign;
var hs2 = hs * this.dsign * this.pnp ;
this.coll = this.newPointArray$I(2);
this.emit = this.newPointArray$I(2);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.coll[0], this.emit[0], 1, hs2);
this.rect = this.newPointArray$I(4);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.rect[0], this.rect[1], 1 - 16 / this.dn, hs);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.rect[2], this.rect[3], 1 - 13 / this.dn, hs);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.coll[1], this.emit[1], 1 - 13 / this.dn, 6 * this.dsign * this.pnp );
this.base = Clazz.new_((I$[2]||(I$[2]=Clazz.load('java.awt.Point'))));
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D(this.point1, this.point2, this.base, 1 - 16 / this.dn);
this.rectPoly = this.createPolygon$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point(this.rect[0], this.rect[2], this.rect[3], this.rect[1]);
if (this.pnp == 1) this.arrowPoly = this.calcArrow$java_awt_Point$java_awt_Point$D$D(this.emit[1], this.emit[0], 8, 4);
 else {
var pt = this.interpPoint$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, 1 - 11 / this.dn, -5 * this.dsign * this.pnp );
this.arrowPoly = this.calcArrow$java_awt_Point$java_awt_Point$D$D(this.emit[0], pt, 8, 4);
}});

Clazz.newMeth(C$, 'limitStep$D$D', function (vnew, vold) {
var arg;
var oo = vnew;
if (vnew > this.vcrit  && Math.abs(vnew - vold) > 0.05  ) {
if (vold > 0 ) {
arg = 1 + (vnew - vold) / 0.025;
if (arg > 0 ) {
vnew = vold + 0.025 * Math.log(arg);
} else {
vnew = this.vcrit;
}} else {
vnew = 0.025 * Math.log(vnew / 0.025);
}(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.converged = false;
}return (vnew);
});

Clazz.newMeth(C$, 'stamp', function () {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[0]);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[1]);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[2]);
});

Clazz.newMeth(C$, 'doStep', function () {
var vbc = this.volts[0] - this.volts[1];
var vbe = this.volts[0] - this.volts[2];
if (Math.abs(vbc - this.lastvbc) > 0.01  || Math.abs(vbe - this.lastvbe) > 0.01  ) (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.converged = false;
this.gmin = 0;
if ((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.subIterations > 100) {
this.gmin = Math.exp(-9 * Math.log(10) * (1 - (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.subIterations / 3000.0) );
if (this.gmin > 0.1 ) this.gmin = 0.1;
}vbc = this.pnp * this.limitStep$D$D(this.pnp * vbc, this.pnp * this.lastvbc);
vbe = this.pnp * this.limitStep$D$D(this.pnp * vbe, this.pnp * this.lastvbe);
this.lastvbc = vbc;
this.lastvbe = vbe;
var pcoef = 40.0 * this.pnp;
var expbc = Math.exp(vbc * pcoef);
var expbe = Math.exp(vbe * pcoef);
if (expbe < 1 ) expbe = 1;
this.ie = this.pnp * 1.0E-13 * (-(expbe - 1) + 0.5 * (expbc - 1)) ;
this.ic = this.pnp * 1.0E-13 * (this.fgain * (expbe - 1) - (expbc - 1)) ;
this.ib = -(this.ie + this.ic);
var gee = -1.0E-13 * 40.0 * expbe ;
var gec = 0.5 * 1.0E-13 * 40.0 * expbc ;
var gce = -gee * this.fgain;
var gcc = -gec * 2.0;
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampMatrix$I$I$D(this.nodes[0], this.nodes[0], -gee - gec - gce - gcc  + this.gmin * 2);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampMatrix$I$I$D(this.nodes[0], this.nodes[1], gec + gcc - this.gmin);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampMatrix$I$I$D(this.nodes[0], this.nodes[2], gee + gce - this.gmin);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampMatrix$I$I$D(this.nodes[1], this.nodes[0], gce + gcc - this.gmin);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampMatrix$I$I$D(this.nodes[1], this.nodes[1], -gcc + this.gmin);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampMatrix$I$I$D(this.nodes[1], this.nodes[2], -gce);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampMatrix$I$I$D(this.nodes[2], this.nodes[0], gee + gec - this.gmin);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampMatrix$I$I$D(this.nodes[2], this.nodes[1], -gec);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampMatrix$I$I$D(this.nodes[2], this.nodes[2], -gee + this.gmin);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampRightSide$I$D(this.nodes[0], -this.ib - (gec + gcc) * vbc - (gee + gce) * vbe);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampRightSide$I$D(this.nodes[1], -this.ic + gce * vbe + gcc * vbc);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampRightSide$I$D(this.nodes[2], -this.ie + gee * vbe + gec * vbc);
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = "transistor (" + ((this.pnp == -1) ? "PNP)" : "NPN)") + " beta=" + (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).showFormat.format$D(this.beta) ;
var vbc = this.volts[0] - this.volts[1];
var vbe = this.volts[0] - this.volts[2];
var vce = this.volts[1] - this.volts[2];
if (vbc * this.pnp > 0.2 ) arr[1] = vbe * this.pnp > 0.2  ? "saturation" : "reverse active";
 else arr[1] = vbe * this.pnp > 0.2  ? "fwd active" : "cutoff";
arr[2] = "Ic = " + P$.CircuitElm.getCurrentText$D(this.ic);
arr[3] = "Ib = " + P$.CircuitElm.getCurrentText$D(this.ib);
arr[4] = "Vbe = " + P$.CircuitElm.getVoltageText$D(vbe);
arr[5] = "Vbc = " + P$.CircuitElm.getVoltageText$D(vbc);
arr[6] = "Vce = " + P$.CircuitElm.getVoltageText$D(vce);
});

Clazz.newMeth(C$, 'getScopeValue$I', function (x) {
switch (x) {
case 1:
return this.ib;
case 2:
return this.ic;
case 3:
return this.ie;
case 4:
return this.volts[0] - this.volts[2];
case 5:
return this.volts[0] - this.volts[1];
case 6:
return this.volts[1] - this.volts[2];
}
return 0;
});

Clazz.newMeth(C$, 'getScopeUnits$I', function (x) {
switch (x) {
case 1:
case 2:
case 3:
return "A";
default:
return "V";
}
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) return Clazz.new_((I$[3]||(I$[3]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Beta/hFE", this.beta, 10, 1000]).setDimensionless();
if (n == 1) {
var ei = Clazz.new_((I$[3]||(I$[3]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[4]||(I$[4]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Swap E/C", (this.flags & 1) != 0]);
return ei;
}return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 0) {
this.beta = ei.value;
this.setup();
}if (n == 1) {
if (ei.checkbox.getState()) this.flags = this.flags|(1);
 else this.flags = this.flags&(-2);
this.setPoints();
}});

Clazz.newMeth(C$, 'canViewInScope', function () {
return true;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:22
