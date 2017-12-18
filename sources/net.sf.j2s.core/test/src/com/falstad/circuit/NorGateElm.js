(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "NorGateElm", null, 'com.falstad.circuit.OrGateElm');

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
return "NOR gate";
});

Clazz.newMeth(C$, 'isInverting', function () {
return true;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 153;
});

Clazz.newMeth(C$, 'getShortcut', function () {
return '#'.$c();
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:20
