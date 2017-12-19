(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "AndGateElm", null, 'com.falstad.circuit.GateElm');

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

Clazz.newMeth(C$, 'setPoints', function () {
C$.superclazz.prototype.setPoints.apply(this, []);
var triPoints = this.newPointArray$I(23);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, triPoints[0], triPoints[22], 0, this.hs2);
var i;
for (i = 0; i != 10; i++) {
var a = i * 0.1;
var b = Math.sqrt(1 - a * a);
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.lead1, this.lead2, triPoints[i + 1], triPoints[21 - i], 0.5 + a / 2, b * this.hs2);
}
triPoints[11] = Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.awt.Point'))).c$$java_awt_Point,[this.lead2]);
if (this.isInverting()) {
this.pcircle = this.interpPoint$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 0.5 + (this.ww + 4) / this.dn);
this.lead2 = this.interpPoint$java_awt_Point$java_awt_Point$D(this.point1, this.point2, 0.5 + (this.ww + 8) / this.dn);
}this.gatePoly = this.createPolygon$java_awt_PointA(triPoints);
});

Clazz.newMeth(C$, 'getGateName', function () {
return "AND gate";
});

Clazz.newMeth(C$, 'calcFunction', function () {
var i;
var f = true;
for (i = 0; i != this.inputCount; i++) f = (f&&this.getInput$I(i));

return f;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 150;
});

Clazz.newMeth(C$, 'getShortcut', function () {
return '2'.$c();
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:17
