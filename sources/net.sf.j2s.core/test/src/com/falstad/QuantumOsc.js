(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "QuantumOsc", null, 'a2s.Applet');
C$.mf = null;

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'main', function (args) {
C$.mf = Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.QuantumOscFrame'))).c$$com_falstad_QuantumOsc,[null]);
C$.mf.init();
}, 1);

Clazz.newMeth(C$, 'destroyFrame', function () {
if (C$.mf != null ) C$.mf.dispose();
C$.mf = null;
});

Clazz.newMeth(C$, 'init', function () {
C$.mf = Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.QuantumOscFrame'))).c$$com_falstad_QuantumOsc,[this]);
C$.mf.init();
});

Clazz.newMeth(C$, 'destroy', function () {
if (C$.mf != null ) C$.mf.dispose();
C$.mf = null;
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:09
