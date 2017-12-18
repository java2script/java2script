(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "GroundElm", null, 'com.falstad.circuit.CircuitElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'c$$I$I$I$I$I$java_util_StringTokenizer', function (xa, ya, xb, yb, f, st) {
C$.superclazz.c$$I$I$I$I$I.apply(this, [xa, ya, xb, yb, f]);
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'getDumpType', function () {
return 'g'.$c();
});

Clazz.newMeth(C$, 'getPostCount', function () {
return 1;
});

Clazz.newMeth(C$, 'draw$java_awt_Graphics', function (g) {
this.setVoltageColor$java_awt_Graphics$D(g, 0);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, this.point1, this.point2);
var i;
for (i = 0; i != 3; i++) {
var a = 10 - i * 4;
var b = i * 5;
this.interpPoint2$java_awt_Point$java_awt_Point$java_awt_Point$java_awt_Point$D$D(this.point1, this.point2, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2, 1 + b / this.dn, a);
P$.CircuitElm.drawThickLine$java_awt_Graphics$java_awt_Point$java_awt_Point(g, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps1, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2);
}
this.doDots$java_awt_Graphics(g);
this.interpPoint$java_awt_Point$java_awt_Point$java_awt_Point$D(this.point1, this.point2, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2, 1 + 11.0 / this.dn);
this.setBbox$java_awt_Point$java_awt_Point$D(this.point1, (I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).ps2, 11);
this.drawPost$java_awt_Graphics$I$I$I(g, this.x, this.y, this.nodes[0]);
});

Clazz.newMeth(C$, 'setCurrent$I$D', function (x, c) {
this.current = -c;
});

Clazz.newMeth(C$, 'stamp', function () {
(I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CircuitElm'))).sim.stampVoltageSource$I$I$I$D(0, this.nodes[0], this.voltSource, 0);
});

Clazz.newMeth(C$, 'getVoltageDiff', function () {
return 0;
});

Clazz.newMeth(C$, 'getVoltageSourceCount', function () {
return 1;
});

Clazz.newMeth(C$, 'getInfo$SA', function (arr) {
arr[0] = "ground";
arr[1] = "I = " + P$.CircuitElm.getCurrentText$D(this.getCurrent());
});

Clazz.newMeth(C$, 'hasGroundConnection$I', function (n1) {
return true;
});

Clazz.newMeth(C$, 'getShortcut', function () {
return 'g'.$c();
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:19
