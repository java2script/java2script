(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "CurrentElm", null, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.currentValue = 0;
this.arrow = null;
this.ashaft1 = null;
this.ashaft2 = null;
this.center = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.currentValue = 0.01;
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
try {
this.currentValue =  new Double(st.nextToken()).doubleValue();
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
this.currentValue = 0.01;
} else {
throw e;
}
}
}, 1);

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + new Double(this.currentValue).toString() ;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 'i'.$c();
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
this.calcLeads$I(26);
this.ashaft1 = this.interpPoint$java_awt_Point$java_awt_Point$D(this.lead1, this.lead2, 0.25);
this.ashaft2 = this.interpPoint$java_awt_Point$java_awt_Point$D(this.lead1, this.lead2, 0.6);
this.center = this.interpPoint$java_awt_Point$java_awt_Point$D(this.lead1, this.lead2, 0.5);
var p2 = this.interpPoint$java_awt_Point$java_awt_Point$D(this.lead1, this.lead2, 0.75);
this.arrow = this.calcArrow$java_awt_Point$java_awt_Point$D$D(this.center, p2, 4, 4);
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
var cr = 12;
this.draw2Leads$java_awt_Graphics(g);
this.setVoltageColor$java_awt_Graphics$D(g, (this.volts[0] + this.volts[1]) / 2);
this.setPowerColor$java_awt_Graphics$Z(g, false);
P$.CircuitElm.drawThickCircle$java_awt_Graphics$I$I$I(g, this.center.x, this.center.y, cr);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.ashaft1, this.ashaft2);
g.fillPolygon$java_awt_Polygon(this.arrow);
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, cr);
this.doDots$java_awt_Graphics(g);
if ((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.showValuesCheckItem.getState()) {
var s = P$.CircuitElm.getShortUnitText$D$S(this.currentValue, "A");
if (this.dx == 0 || this.dy == 0 ) this.drawValues$java_awt_Graphics$S$D(g, s, cr);
}this.drawPosts$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'stamp', function () {
this.current = this.currentValue;
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampCurrentSource$I$I$D(this.nodes[0], this.nodes[1], this.current);
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) return Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Current (A)", this.currentValue, 0, 0.1]);
return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
this.currentValue = ei.value;
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = "current source";
this.getBasicInfo$SA(arr);
});

Clazz.newMeth(C$, 'getVoltageDiff', function () {
return this.volts[1] - this.volts[0];
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:18
