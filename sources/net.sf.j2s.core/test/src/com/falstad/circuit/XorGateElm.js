(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "XorGateElm", null, 'com.falstad.circuit.OrGateElm');

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
return "XOR gate";
});

Clazz.newMeth(C$, 'calcFunction', function () {
var i;
var f = false;
for (i = 0; i != this.inputCount; i++) f = (f!=this.getInput$I(i));

return f;
});

Clazz.newMeth(C$, 'getDumpType', function () {
return 154;
});

Clazz.newMeth(C$, 'getShortcut', function () {
return '4'.$c();
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:23
