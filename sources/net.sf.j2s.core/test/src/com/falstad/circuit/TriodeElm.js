(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "TriodeElm", null, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.mu = 0;
this.kg1 = 0;
this.curcountp = 0;
this.curcountc = 0;
this.curcountg = 0;
this.currentp = 0;
this.currentg = 0;
this.currentc = 0;
this.gridCurrentR = 0;
this.plate = null;
this.grid = null;
this.cath = null;
this.midgrid = null;
this.midcath = null;
this.circler = 0;
this.lastv0 = 0;
this.lastv1 = 0;
this.lastv2 = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.gridCurrentR = 6000;
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.mu = 93;
this.kg1 = 680;
this.setup();
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
this.mu =  new Double(st.nextToken()).doubleValue();
this.kg1 =  new Double(st.nextToken()).doubleValue();
this.setup();
}, 1);

Clazz.newMeth(C$, 'setup', function () {
this.noDiagonal = true;
});

Clazz.newMeth(C$, 'nonLinear', function () {
return true;
});

Clazz.newMeth(C$, 'reset', function () {
this.volts[0] = this.volts[1] = this.volts[2] = 0;
this.curcount = 0;
});

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + new Double(this.mu).toString() + " " + new Double(this.kg1).toString() ;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 173;
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
this.plate = this.newPointArray$I(4);
this.grid = this.newPointArray$I(8);
this.cath = this.newPointArray$I(4);
this.grid[0] = this.point1;
var nearw = 8;
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.plate[1], 1, nearw);
var farw = 32;
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.plate[0], 1, farw);
var platew = 18;
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point2, this.plate[1], this.plate[2], this.plate[3], 1, platew);
this.circler = 24;
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, this.grid[1], (this.dn - this.circler) / this.dn, 0);
var i;
for (i = 0; i != 3; i++) {
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.grid[1], this.point2, this.grid[2 + i * 2], (i * 3 + 1) / 4.5, 0);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.grid[1], this.point2, this.grid[3 + i * 2], (i * 3 + 2) / 4.5, 0);
}
this.midgrid = this.point2;
var cathw = 16;
this.midcath = this.interpPoint$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, 1, -nearw);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point2, this.plate[1], this.cath[1], this.cath[2], -1, cathw);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point2, this.plate[1], this.cath[3], -1.2, -cathw);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point2, this.plate[1], this.cath[0], -farw / nearw, cathw);
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
g.setColor$java_awt_Color((I$[0]||(I$[0]=Clazz.load('java.awt.Color'))).gray);
P$.CircuitElm.drawThickCircle$java_awt_Graphics$I$I$I(g, this.point2.x, this.point2.y, this.circler);
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.plate[0], 16);
this.adjustBbox$I$I$I$I(this.cath[0].x, this.cath[1].y, this.point2.x + this.circler, this.point2.y + this.circler);
this.setPowerColor$java_awt_Graphics$Z(g, true);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[0]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.plate[0], this.plate[1]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.plate[2], this.plate[3]);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[1]);
var i;
for (i = 0; i != 8; i = i+(2)) P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.grid[i], this.grid[i + 1]);

this.setVoltageColor$java_awt_Graphics$D(g, this.volts[2]);
for (i = 0; i != 3; i++) P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.cath[i], this.cath[i + 1]);

this.curcountp = this.updateDotCount$D$D(this.currentp, this.curcountp);
this.curcountc = this.updateDotCount$D$D(this.currentc, this.curcountc);
this.curcountg = this.updateDotCount$D$D(this.currentg, this.curcountg);
if ((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.dragElm !== this ) {
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.plate[0], this.midgrid, this.curcountp);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.midgrid, this.midcath, this.curcountc);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.midcath, this.cath[1], this.curcountc + 8);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.cath[1], this.cath[0], this.curcountc + 8);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.point1, this.midgrid, this.curcountg);
}this.drawPosts$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'getPost$I', function (n) {
return (n == 0) ? this.plate[0] : (n == 1) ? this.grid[0] : this.cath[0];
});

Clazz.newMeth(C$, 'getPostCount', function () {
return 3;
});

Clazz.newMeth(C$, 'getPower', function () {
return (this.volts[0] - this.volts[2]) * this.current;
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
var grid = 1;
var cath = 2;
var plate = 0;
var vgk = vs[grid] - vs[cath];
var vpk = vs[plate] - vs[cath];
if (Math.abs(this.lastv0 - vs[0]) > 0.01  || Math.abs(this.lastv1 - vs[1]) > 0.01   || Math.abs(this.lastv2 - vs[2]) > 0.01  ) (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.converged = false;
this.lastv0 = vs[0];
this.lastv1 = vs[1];
this.lastv2 = vs[2];
var ids = 0;
var gm = 0;
var Gds = 0;
var ival = vgk + vpk / this.mu;
this.currentg = 0;
if (vgk > 0.01 ) {
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampResistor$I$I$D(this.nodes[grid], this.nodes[cath], 6000.0);
this.currentg = vgk / 6000.0;
}if (ival < 0 ) {
Gds = 1.0E-8;
ids = vpk * Gds;
} else {
ids = Math.pow(ival, 1.5) / this.kg1;
var q = 1.5 * Math.sqrt(ival) / this.kg1;
Gds = q;
gm = q / this.mu;
}this.currentp = ids;
this.currentc = ids + this.currentg;
var rs = -ids + Gds * vpk + gm * vgk;
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampMatrix$I$I$D(this.nodes[plate], this.nodes[plate], Gds);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampMatrix$I$I$D(this.nodes[plate], this.nodes[cath], -Gds - gm);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampMatrix$I$I$D(this.nodes[plate], this.nodes[grid], gm);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampMatrix$I$I$D(this.nodes[cath], this.nodes[plate], -Gds);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampMatrix$I$I$D(this.nodes[cath], this.nodes[cath], Gds + gm);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampMatrix$I$I$D(this.nodes[cath], this.nodes[grid], -gm);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampRightSide$I$D(this.nodes[plate], rs);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampRightSide$I$D(this.nodes[cath], -rs);
});

Clazz.newMeth(C$, 'stamp', function () {
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[0]);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[1]);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[2]);
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = "triode";
var vbc = this.volts[0] - this.volts[1];
var vbe = this.volts[0] - this.volts[2];
var vce = this.volts[1] - this.volts[2];
arr[1] = "Vbe = " + P$.CircuitElm.getVoltageText$D(vbe);
arr[2] = "Vbc = " + P$.CircuitElm.getVoltageText$D(vbc);
arr[3] = "Vce = " + P$.CircuitElm.getVoltageText$D(vce);
});

Clazz.newMeth(C$, 'getConnection$I$I', function (n1, n2) {
return !(n1 == 1 || n2 == 1 );
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:23
