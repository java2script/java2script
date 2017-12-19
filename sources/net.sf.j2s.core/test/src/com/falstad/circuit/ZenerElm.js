(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "ZenerElm", null, 'com.falstad.circuit.DiodeElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.$hs = 0;
this.$poly = null;
this.$cathode = null;
this.wing = null;
this.default_zvoltage = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.$hs = 8;
this.default_zvoltage = 5.6;
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.zvoltage = 5.6;
this.setup();
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I$java_util_StringTokenizer.apply(this, [xa, ya, xb, yb, f, st]);
C$.$init$.apply(this);
this.zvoltage =  new Double(st.nextToken()).doubleValue();
this.setup();
}, 1);

Clazz.newMeth(C$, 'setup', function () {
this.diode.leakage = 5.0E-6;
C$.superclazz.prototype.setup.apply(this, []);
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 'z'.$c();
});

Clazz.newMeth(C$, 'dump', function () {
return C$.superclazz.prototype.dump.apply(this, []) + " " + new Double(this.zvoltage).toString() ;
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
this.calcLeads$I(16);
this.$cathode = this.newPointArray$I(2);
this.wing = this.newPointArray$I(2);
var pa = this.newPointArray$I(2);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, pa[0], pa[1], 0, 8);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, this.$cathode[0], this.$cathode[1], 1, 8);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.$cathode[0], this.$cathode[1], this.wing[0], -0.2, -8);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.$cathode[1], this.$cathode[0], this.wing[1], -0.2, -8);
this.$poly = this.createPolygon$java_awt_Point$java_awt_Point$java_awt_Point(pa[0], pa[1], this.lead2);
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 8);
var v1 = this.volts[0];
var v2 = this.volts[1];
this.draw2Leads$java_awt_Graphics(g);
this.setPowerColor$java_awt_Graphics$Z(g, true);
this.setVoltageColor$java_awt_Graphics$D(g, v1);
g.fillPolygon$java_awt_Polygon(this.$poly);
this.setVoltageColor$java_awt_Graphics$D(g, v2);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.$cathode[0], this.$cathode[1]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.wing[0], this.$cathode[0]);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.wing[1], this.$cathode[1]);
this.doDots$java_awt_Graphics(g);
this.drawPosts$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
C$.superclazz.prototype.getInfo$SA.apply(this, [arr]);
arr[0] = "Zener diode";
arr[5] = "Vz = " + P$.CircuitElm.getVoltageText$D(this.zvoltage);
});

Clazz.newMeth(C$, 'getEditInfo$I', function (n) {
if (n == 0) return Clazz.new_((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Fwd Voltage @ 1A", this.fwdrop, 10, 1000]);
if (n == 1) return Clazz.new_((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.EditInfo'))).c$$S$D$D$D,["Zener Voltage @ 5mA", this.zvoltage, 1, 25]);
return null;
});

Clazz.newMeth(C$, 'setEditValue$I$com_falstad_circuit_EditInfo', function (n, ei) {
if (n == 0) this.fwdrop = ei.value;
if (n == 1) this.zvoltage = ei.value;
this.setup();
});

Clazz.newMeth(C$, 'getShortcut', function () {
return 0;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:23
