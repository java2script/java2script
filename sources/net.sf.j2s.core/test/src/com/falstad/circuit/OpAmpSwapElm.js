(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "OpAmpSwapElm", null, 'com.falstad.circuit.OpAmpElm');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I$I', function (xx, yy) {
C$.superclazz.c$$I$I.apply(this, [xx, yy]);
C$.$init$.apply(this);
this.flags = this.flags|(1);
}, 1);

Clazz.newMeth(C$, 'getDumpClass', function () {
return Clazz.getClass((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.OpAmpElm'))));
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:20
