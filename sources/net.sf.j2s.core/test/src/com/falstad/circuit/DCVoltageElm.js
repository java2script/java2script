(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "DCVoltageElm", null, 'com.falstad.circuit.VoltageElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I$I.apply(this, [xx, yy, 0]);
C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$, 'getDumpClass', function () {
return Clazz.getClass((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.VoltageElm'))));
});

Clazz.newMeth(C$, 'getShortcut', function () {
return 'v'.$c();
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:18
