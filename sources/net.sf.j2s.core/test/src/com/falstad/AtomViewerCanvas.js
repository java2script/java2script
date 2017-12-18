(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "AtomViewerCanvas", null, 'a2s.Canvas');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.pg = null;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$com_falstad_AtomViewerFrame', function (p) {
Clazz.super_(C$, this,1);
this.pg = p;
}, 1);

Clazz.newMeth(C$, 'getPreferredSize', function () {
return Clazz.new_((I$[0]||(I$[0]=Clazz.load('java.awt.Dimension'))).c$$I$I,[300, 400]);
});

Clazz.newMeth(C$, 'update$java_awt_Graphics', function (g) {
this.pg.updateAtomViewer$java_awt_Graphics(g);
});

Clazz.newMeth(C$, 'paintComponent$java_awt_Graphics', function (g) {
this.pg.updateAtomViewer$java_awt_Graphics(g);
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:00
