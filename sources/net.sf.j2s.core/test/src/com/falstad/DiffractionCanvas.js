(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "DiffractionCanvas", null, 'a2s.Canvas');
C$.pg = null;

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$com_falstad_DiffractionFrame', function (p) {
Clazz.super_(C$, this,1);
C$.pg = p;
}, 1);

Clazz.newMeth(C$, 'getPreferredSize', function () {
return Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.awt.Dimension'))).c$$I$I,[300, 400]);
});

Clazz.newMeth(C$, 'update$java_awt_Graphics', function (g) {
C$.pg.updateDiffraction$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'paintComponent$java_awt_Graphics', function (g) {
C$.pg.updateDiffraction$java_awt_Graphics(g);
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:02
