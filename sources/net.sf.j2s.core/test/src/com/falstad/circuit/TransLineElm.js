(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "TransLineElm", null, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.delay = 0;
this.imped = 0;
this.voltageL = null;
this.voltageR = null;
this.lenSteps = 0;
this.ptr = 0;
this.width = 0;
this.posts = null;
this.inner = null;
this.voltSource1 = 0;
this.voltSource2 = 0;
this.current1 = 0;
this.current2 = 0;
this.curCount1 = 0;
this.curCount2 = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.delay = 1000 * (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.timeStep;
this.imped = 75;
this.noDiagonal = true;
this.reset();
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
this.delay =  new Double(st.nextToken()).doubleValue();
this.imped =  new Double(st.nextToken()).doubleValue();
this.width =  new Integer(st.nextToken()).intValue();
st.nextToken();
this.noDiagonal = true;
this.reset();
}, 1);

Clazz.newMeth(C$, 'getDumpType', function () {
return 171;
});

Clazz.newMeth(C$, 'getPostCount', function () {
return 4;
});

Clazz.newMeth(C$, 'getInternalNodeCount', function () {
return 2;
});

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + new Double(this.delay).toString() + " " + new Double(this.imped).toString() + " " + this.width + " " + new Double(0.).toString() ;
});

Clazz.newMeth(C$, 'drag$I$I', function (xx, yy) {
xx = (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.snapGrid$I(xx);
yy = (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.snapGrid$I(yy);
var w1 = P$.CircuitElm.max$I$I((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.gridSize, P$.CircuitElm.abs$I(yy - this.y));
var w2 = P$.CircuitElm.max$I$I((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.gridSize, P$.CircuitElm.abs$I(xx - this.x));
if (w1 > w2) {
xx = this.x;
this.width = w2;
} else {
yy = this.y;
this.width = w1;
}this.x2 = xx;
this.y2 = yy;
this.setPoints();
});

Clazz.newMeth(C$, 'reset', function () {
if ((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.timeStep == 0 ) return;
this.lenSteps = ((this.delay / (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.timeStep)|0);
System.out.println$S(this.lenSteps + " steps");
if (this.lenSteps > 100000) this.voltageL = this.voltageR = null;
 else {
this.voltageL = Clazz.array(Double.TYPE, [this.lenSteps]);
this.voltageR = Clazz.array(Double.TYPE, [this.lenSteps]);
}this.ptr = 0;
C$.superclazz.prototype.reset.apply(this, []);
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
var ds = (this.dy == 0) ? P$.CircuitElm.sign$I(this.dx) : -P$.CircuitElm.sign$I(this.dy);
var p3 = this.interpPoint$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, 0, -this.width * ds);
var p4 = this.interpPoint$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, 1, -this.width * ds);
var sep = ((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.gridSize/2|0);
var p5 = this.interpPoint$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, 0, -((this.width/2|0) - sep) * ds);
var p6 = this.interpPoint$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, 1, -((this.width/2|0) - sep) * ds);
var p7 = this.interpPoint$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, 0, -((this.width/2|0) + sep) * ds);
var p8 = this.interpPoint$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, 1, -((this.width/2|0) + sep) * ds);
this.posts = Clazz.array((I$[1]||(I$[1]=Clazz.load('java.awt.Point'))), -1, [p3, p4, this.point1, this.point2]);
this.inner = Clazz.array((I$[1]||(I$[1]=Clazz.load('java.awt.Point'))), -1, [p7, p8, p5, p6]);
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
this.setBbox$java_awt_Point$java_awt_Point$D(this.posts[0], this.posts[3], 0);
var segments = ((this.dn / 2)|0);
var ix0 = this.ptr - 1 + this.lenSteps;
var segf = 1.0 / segments;
var i;
g.setColor$java_awt_Color((I$[2]||(I$[2]=Clazz.load('java.awt.Color'))).darkGray);
g.fillRect$I$I$I$I(this.inner[2].x, this.inner[2].y, this.inner[1].x - this.inner[2].x + 2, this.inner[1].y - this.inner[2].y + 2);
for (i = 0; i != 4; i++) {
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[i]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.posts[i], this.inner[i]);
}
if (this.voltageL != null ) {
for (i = 0; i != segments; i++) {
var ix1 = (ix0 - (this.lenSteps * i/segments|0)) % this.lenSteps;
var ix2 = (ix0 - (this.lenSteps * (segments - 1 - i )/segments|0)) % this.lenSteps;
var v = (this.voltageL[ix1] + this.voltageR[ix2]) / 2;
this.setVoltageColor$java_awt_Graphics$D(g, v);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D(this.inner[0], this.inner[1], (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1, i * segf);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D(this.inner[2], this.inner[3], (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2, i * segf);
g.drawLine$I$I$I$I((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1.x, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1.y, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2.x, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2.y);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D(this.inner[2], this.inner[3], (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1, (i + 1) * segf);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2);
}
}this.setVoltageColor$java_awt_Graphics$D(g, this.volts[0]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.inner[0], this.inner[1]);
this.drawPosts$java_awt_Graphics(g);
this.curCount1 = this.updateDotCount$D$D(-this.current1, this.curCount1);
this.curCount2 = this.updateDotCount$D$D(this.current2, this.curCount2);
if ((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.dragElm !== this ) {
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.posts[0], this.inner[0], this.curCount1);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.posts[2], this.inner[2], -this.curCount1);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.posts[1], this.inner[1], -this.curCount2);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.posts[3], this.inner[3], this.curCount2);
}});

Clazz.newMeth(C$, 'setVoltageSource$I$I', function (n, v) {
if (n == 0) this.voltSource1 = v;
 else this.voltSource2 = v;
});

Clazz.newMeth(C$, 'setCurrent$I$D', function (v, c) {
if (v == this.voltSource1) this.current1 = c;
 else this.current2 = c;
});

Clazz.newMeth(C$, 'stamp', function () {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampVoltageSource$I$I$I(this.nodes[4], this.nodes[0], this.voltSource1);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampVoltageSource$I$I$I(this.nodes[5], this.nodes[1], this.voltSource2);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampResistor$I$I$D(this.nodes[2], this.nodes[4], this.imped);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampResistor$I$I$D(this.nodes[3], this.nodes[5], this.imped);
});

Clazz.newMeth(C$, 'startIteration', function () {
if (this.voltageL == null ) {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stop$S$com_falstad_circuit_CircuitElm("Transmission line delay too large!", this);
return;
}this.voltageL[this.ptr] = this.volts[2] - this.volts[0] + this.volts[2] - this.volts[4];
this.voltageR[this.ptr] = this.volts[3] - this.volts[1] + this.volts[3] - this.volts[5];
this.ptr = (this.ptr + 1) % this.lenSteps;
});

Clazz.newMeth(C$, 'doStep', function () {
if (this.voltageL == null ) {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stop$S$com_falstad_circuit_CircuitElm("Transmission line delay too large!", this);
return;
}(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.updateVoltageSource$I$I$I$D(this.nodes[4], this.nodes[0], this.voltSource1, -this.voltageR[this.ptr]);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.updateVoltageSource$I$I$I$D(this.nodes[5], this.nodes[1], this.voltSource2, -this.voltageL[this.ptr]);
if (Math.abs(this.volts[0]) > 1.0E-5  || Math.abs(this.volts[1]) > 1.0E-5  ) {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stop$S$com_falstad_circuit_CircuitElm("Need to ground transmission line!", this);
return;
}});

Clazz.newMeth(C$, 'getPost$I', function (n) {
return this.posts[n];
});

Clazz.newMeth(C$, 'getVoltageSourceCount', function () {
return 2;
});

Clazz.newMeth(C$, 'hasGroundConnection$I', function (n1) {
return false;
});

Clazz.newMeth(C$, 'getConnection$I$I', function (n1, n2) {
return false;
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = "transmission line";
arr[1] = P$.CircuitElm.getUnitText$D$S(this.imped, P$.CirSim.ohmString);
arr[2] = "length = " + P$.CircuitElm.getUnitText$D$S(2.9979E8 * this.delay, "m");
arr[3] = "delay = " + P$.CircuitElm.getUnitText$D$S(this.delay, "s");
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) return Clazz.new_((I$[3]||(I$[3]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Delay (s)", this.delay, 0, 0]);
if (n == 1) return Clazz.new_((I$[3]||(I$[3]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Impedance (ohms)", this.imped, 0, 0]);
return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 0) {
this.delay = ei.value;
this.reset();
}if (n == 1) {
this.imped = ei.value;
this.reset();
}});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:22
