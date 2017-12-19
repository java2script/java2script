(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "AnalogSwitchElm", null, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.FLAG_INVERT = 0;
this.resistance = 0;
this.r_on = 0;
this.r_off = 0;
this.open = false;
this.ps = null;
this.point3 = null;
this.lead3 = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.FLAG_INVERT = 1;
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.r_on = 20;
this.r_off = 1.0E10;
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
this.r_on = 20;
this.r_off = 1.0E10;
try {
this.r_on =  new Double(st.nextToken()).doubleValue();
this.r_off =  new Double(st.nextToken()).doubleValue();
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
}, 1);

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + new Double(this.r_on).toString() + " " + new Double(this.r_off).toString() ;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 159;
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
this.calcLeads$I(32);
this.ps = Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.awt.Point'))));
var openhs = 16;
this.point3 = this.interpPoint$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, 0.5, -openhs);
this.lead3 = this.interpPoint$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, 0.5, (-openhs/2|0));
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
var openhs = 16;
var hs = (this.open) ? openhs : 0;
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, openhs);
this.draw2Leads$java_awt_Graphics(g);
g.setColor$java_awt_Color((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).lightGrayColor);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, this.ps, 1, hs);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.lead1, this.ps);
this.setVoltageColor$java_awt_Graphics$D(g, this.volts[2]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.point3, this.lead3);
if (!this.open) this.doDots$java_awt_Graphics(g);
this.drawPosts$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'calculateCurrent', function () {
this.current = (this.volts[0] - this.volts[1]) / this.resistance;
});

Clazz.newMeth(C$, 'nonLinear', function () {
return true;
});

Clazz.newMeth(C$, 'stamp', function () {
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[0]);
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampNonLinear$I(this.nodes[1]);
});

Clazz.newMeth(C$, 'doStep', function () {
this.open = (this.volts[2] < 2.5 );
if ((this.flags & 1) != 0) this.open = !this.open;
this.resistance = (this.open) ? this.r_off : this.r_on;
(I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampResistor$I$I$D(this.nodes[0], this.nodes[1], this.resistance);
});

Clazz.newMeth(C$, 'drag$I$I', function (xx, yy) {
xx = (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.snapGrid$I(xx);
yy = (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.snapGrid$I(yy);
if (P$.CircuitElm.abs$I(this.x - xx) < P$.CircuitElm.abs$I(this.y - yy)) xx = this.x;
 else yy = this.y;
var q1 = P$.CircuitElm.abs$I(this.x - xx) + P$.CircuitElm.abs$I(this.y - yy);
var q2 = ((q1/2|0)) % (I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.gridSize;
if (q2 != 0) return;
this.x2 = xx;
this.y2 = yy;
this.setPoints();
});

Clazz.newMeth(C$, 'getPostCount', function () {
return 3;
});

Clazz.newMeth(C$, 'getPost$I', function (n) {
return (n == 0) ? this.point1 : (n == 1) ? this.point2 : this.point3;
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = "analog switch";
arr[1] = this.open ? "open" : "closed";
arr[2] = "Vd = " + P$.CircuitElm.getVoltageDText$D(this.getVoltageDiff());
arr[3] = "I = " + P$.CircuitElm.getCurrentDText$D(this.getCurrent());
arr[4] = "Vc = " + P$.CircuitElm.getVoltageText$D(this.volts[2]);
});

Clazz.newMeth(C$, 'getConnection$I$I', function (n1, n2) {
if (n1 == 2 || n2 == 2 ) return false;
return true;
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) {
var ei = Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["", 0, -1, -1]);
ei.checkbox = Clazz.new_((I$[3]||(I$[3]=Clazz.load('a2s.Checkbox'))).c$$S$Z,["Normally closed", (this.flags & 1) != 0]);
return ei;
}if (n == 1) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["On Resistance (ohms)", this.r_on, 0, 0]);
if (n == 2) return Clazz.new_((I$[2]||(I$[2]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Off Resistance (ohms)", this.r_off, 0, 0]);
return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 0) this.flags = (ei.checkbox.getState()) ? (this.flags | 1) : (this.flags & -2);
if (n == 1 && ei.value > 0  ) this.r_on = ei.value;
if (n == 2 && ei.value > 0  ) this.r_off = ei.value;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:17
