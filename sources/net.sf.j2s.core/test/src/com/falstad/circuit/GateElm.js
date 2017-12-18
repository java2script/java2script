(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "GateElm", null, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.FLAG_SMALL = 0;
this.inputCount = 0;
this.lastOutput = false;
this.gsize = 0;
this.gwidth = 0;
this.gwidth2 = 0;
this.gheight = 0;
this.hs2 = 0;
this.inPosts = null;
this.inGates = null;
this.ww = 0;
this.gatePoly = null;
this.pcircle = null;
this.linePoints = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.FLAG_SMALL = 1;
this.inputCount = 2;
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.noDiagonal = true;
this.inputCount = 2;
this.setSize$I((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.smallGridCheckItem.getState() ? 1 : 2);
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
this.inputCount =  new Integer(st.nextToken()).intValue();
this.lastOutput =  new Double(st.nextToken()).doubleValue() > 2.5 ;
this.noDiagonal = true;
this.setSize$I((f & 1) != 0 ? 1 : 2);
}, 1);

Clazz.newMeth(C$, 'isInverting', function () {
return false;
});

Clazz.newMeth(C$, 'setSize$I', function (s) {
this.gsize = s;
this.gwidth = 7 * s;
this.gwidth2 = 14 * s;
this.gheight = 8 * s;
this.flags = (s == 1) ? 1 : 0;
});

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + this.inputCount + " " + new Double(this.volts[this.inputCount]).toString() ;
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
if (this.dn > 150  && this === (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.dragElm  ) this.setSize$I(2);
var hs = this.gheight;
var i;
this.ww = this.gwidth2;
if (this.ww > this.dn / 2 ) this.ww = ((this.dn / 2)|0);
if (this.isInverting() && this.ww + 8 > this.dn / 2  ) this.ww = ((this.dn / 2 - 8)|0);
this.calcLeads$I(this.ww * 2);
this.inPosts = Clazz.array((I$[1]||(I$[1]=Clazz.load('java.awt.Point'))), [this.inputCount]);
this.inGates = Clazz.array((I$[1]||(I$[1]=Clazz.load('java.awt.Point'))), [this.inputCount]);
this.allocNodes();
var i0 = (-this.inputCount/2|0);
for (i = 0; i != this.inputCount; i++, i0++) {
if (i0 == 0 && (this.inputCount & 1) == 0 ) i0++;
this.inPosts[i] = this.interpPoint$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, 0, hs * i0);
this.inGates[i] = this.interpPoint$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, 0, hs * i0);
this.volts[i] = (!!(this.lastOutput ^ this.isInverting())) ? 5 : 0;
}
this.hs2 = this.gwidth * ((this.inputCount/2|0) + 1);
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, this.hs2);
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
var i;
for (i = 0; i != this.inputCount; i++) {
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[i]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.inPosts[i], this.inGates[i]);
}
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[this.inputCount]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.lead2, this.point2);
g.setColor$java_awt_Color(this.needsHighlight() ? (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).selectColor : (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).lightGrayColor);
P$.CircuitElm.drawThickPolygon$java_awt_Graphics$java_awt_Polygon(g, this.gatePoly);
if (this.linePoints != null ) for (i = 0; i != this.linePoints.length - 1; i++) P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.linePoints[i], this.linePoints[i + 1]);

if (this.isInverting()) P$.CircuitElm.drawThickCircle$java_awt_Graphics$I$I$I(g, this.pcircle.x, this.pcircle.y, 3);
this.curcount = this.updateDotCount$D$D(this.current, this.curcount);
this.drawDots$java_awt_Graphics$java_awt_Point$java_awt_Point$D(g, this.lead2, this.point2, this.curcount);
this.drawPosts$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'getPostCount', function () {
return this.inputCount + 1;
});

Clazz.newMeth(C$, 'getPost$I', function (n) {
if (n == this.inputCount) return this.point2;
return this.inPosts[n];
});

Clazz.newMeth(C$, 'getVoltageSourceCount', function () {
return 1;
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = this.getGateName();
arr[1] = "Vout = " + P$.CircuitElm.getVoltageText$D(this.volts[this.inputCount]);
arr[2] = "Iout = " + P$.CircuitElm.getCurrentText$D(this.getCurrent());
});

Clazz.newMeth(C$, 'stamp', function () {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampVoltageSource$I$I$I(0, this.nodes[this.inputCount], this.voltSource);
});

Clazz.newMeth(C$, 'getInput$I', function (x) {
return this.volts[x] > 2.5 ;
});

Clazz.newMeth(C$, 'doStep', function () {
var i;
var f = this.calcFunction();
if (this.isInverting()) f = !f;
this.lastOutput = f;
var res = f ? 5 : 0;
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.updateVoltageSource$I$I$I$D(0, this.nodes[this.inputCount], this.voltSource, res);
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["# of Inputs", this.inputCount, 1, 8]).setDimensionless();
return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
this.inputCount = (ei.value|0);
this.setPoints();
});

Clazz.newMeth(C$, 'getConnection$I$I', function (n1, n2) {
return false;
});

Clazz.newMeth(C$, 'hasGroundConnection$I', function (n1) {
return (n1 == this.inputCount);
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:19
