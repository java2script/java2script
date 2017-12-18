(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "SparkGapElm", null, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.resistance = 0;
this.onresistance = 0;
this.offresistance = 0;
this.breakdown = 0;
this.holdcurrent = 0;
this.state = false;
this.arrow1 = null;
this.arrow2 = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.offresistance = 1.0E9;
this.onresistance = 1000.0;
this.breakdown = 1000.0;
this.holdcurrent = 0.001;
this.state = false;
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
this.onresistance =  new Double(st.nextToken()).doubleValue();
this.offresistance =  new Double(st.nextToken()).doubleValue();
this.breakdown =  new Double(st.nextToken()).doubleValue();
this.holdcurrent =  new Double(st.nextToken()).doubleValue();
}, 1);

Clazz.newMeth(C$, 'nonLinear', function () {
return true;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 187;
});

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + new Double(this.onresistance).toString() + " " + new Double(this.offresistance).toString() + " " + new Double(this.breakdown).toString() + " " + new Double(this.holdcurrent).toString() ;
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
var dist = 16;
var alen = 8;
this.calcLeads$I(dist + alen);
var p1 = this.interpPoint$java_awt_Point$java_awt_Point$D(this.point1, this.point2, (this.dn - alen) / (2 * this.dn));
this.arrow1 = this.calcArrow$java_awt_Point$java_awt_Point$D$D(this.point1, p1, alen, alen);
p1 = this.interpPoint$java_awt_Point$java_awt_Point$D(this.point1, this.point2, (this.dn + alen) / (2 * this.dn));
this.arrow2 = this.calcArrow$java_awt_Point$java_awt_Point$D$D(this.point2, p1, alen, alen);
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
var i;
var v1 = this.volts[0];
var v2 = this.volts[1];
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 8);
this.draw2Leads$java_awt_Graphics(g);
this.setPowerColor$java_awt_Graphics$Z(g, true);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[0]);
g.fillPolygon$java_awt_Polygon(this.arrow1);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[1]);
g.fillPolygon$java_awt_Polygon(this.arrow2);
if (this.state) this.doDots$java_awt_Graphics(g);
this.drawPosts$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'calculateCurrent', function () {
var vd = this.volts[0] - this.volts[1];
this.current = vd / this.resistance;
});

Clazz.newMeth(C$, 'reset', function () {
C$.superclazz.prototype.reset.apply(this, []);
this.state = false;
});

Clazz.newMeth(C$, 'startIteration', function () {
if (Math.abs(this.current) < this.holdcurrent ) this.state = false;
var vd = this.volts[0] - this.volts[1];
if (Math.abs(vd) > this.breakdown ) this.state = true;
});

Clazz.newMeth(C$, 'doStep', function () {
this.resistance = (this.state) ? this.onresistance : this.offresistance;
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampResistor$I$I$D(this.nodes[0], this.nodes[1], this.resistance);
});

Clazz.newMeth(C$, 'stamp', function () {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[0]);
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[1]);
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = "spark gap";
this.getBasicInfo$SA(arr);
arr[3] = this.state ? "on" : "off";
arr[4] = "Ron = " + P$.CircuitElm.getUnitText$D$S(this.onresistance, P$.CirSim.ohmString);
arr[5] = "Roff = " + P$.CircuitElm.getUnitText$D$S(this.offresistance, P$.CirSim.ohmString);
arr[6] = "Vbreakdown = " + P$.CircuitElm.getUnitText$D$S(this.breakdown, "V");
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) return Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["On resistance (ohms)", this.onresistance, 0, 0]);
if (n == 1) return Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Off resistance (ohms)", this.offresistance, 0, 0]);
if (n == 2) return Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Breakdown voltage", this.breakdown, 0, 0]);
if (n == 3) return Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Holding current (A)", this.holdcurrent, 0, 0]);
return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (ei.value > 0  && n == 0 ) this.onresistance = ei.value;
if (ei.value > 0  && n == 1 ) this.offresistance = ei.value;
if (ei.value > 0  && n == 2 ) this.breakdown = ei.value;
if (ei.value > 0  && n == 3 ) this.holdcurrent = ei.value;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:22
