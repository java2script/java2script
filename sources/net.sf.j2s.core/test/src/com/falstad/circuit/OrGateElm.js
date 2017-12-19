(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "OrGateElm", null, 'com.falstad.circuit.GateElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I$java_util_StringTokenizer.apply(this, [xa, ya, xb, yb, f, st]);
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'getGateName', function () {
return "OR gate";
});

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
var triPoints = this.newPointArray$I(38);
if (Clazz.instanceOf(this, "com.falstad.circuit.XorGateElm")) this.linePoints = Clazz.array((I$[0]||(I$[0]=Clazz.load('java.awt.Point'))), [5]);
var i;
for (i = 0; i != 16; i++) {
var a = i / 16.0;
var b = 1 - a * a;
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, triPoints[i], triPoints[32 - i], 0.5 + a / 2, b * this.hs2);
}
var ww2 = (this.ww == 0) ? this.dn * 2 : this.ww * 2;
for (i = 0; i != 5; i++) {
var a = (i - 2) / 2.0;
var b = 4 * (1 - a * a) - 2;
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, triPoints[33 + i], b / (ww2), a * this.hs2);
if (Clazz.instanceOf(this, "com.falstad.circuit.XorGateElm")) this.linePoints[i] = this.interpPoint$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, (b - 5) / (ww2), a * this.hs2);
}
triPoints[16] = Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.awt.Point'))).c$$java_awt_Point,[this.lead2]);
if (this.isInverting()) {
this.pcircle = this.interpPoint$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 0.5 + (this.ww + 4) / this.dn);
this.lead2 = this.interpPoint$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 0.5 + (this.ww + 8) / this.dn);
}this.gatePoly = this.createPolygon$java_awt_PointA(triPoints);
});

Clazz.newMeth(C$, 'calcFunction', function () {
var i;
var f = false;
for (i = 0; i != this.inputCount; i++) f = (f||this.getInput$I(i));

return f;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 152;
});

Clazz.newMeth(C$, 'getShortcut', function () {
return '3'.$c();
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:20
