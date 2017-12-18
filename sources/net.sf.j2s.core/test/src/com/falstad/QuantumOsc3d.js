(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "QuantumOsc3d", null, 'a2s.Applet');
C$.oc = null;

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.started = false;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.started = false;
}, 1);

Clazz.newMeth(C$, 'destroyFrame', function () {
if (C$.oc != null ) C$.oc.dispose();
C$.oc = null;
});

Clazz.newMeth(C$, 'main', function (args) {
C$.oc = Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.QuantumOsc3dFrame'))).c$$com_falstad_QuantumOsc3d,[null]);
C$.oc.init();
}, 1);

Clazz.newMeth(C$, 'init', function () {
C$.oc = Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.QuantumOsc3dFrame'))).c$$com_falstad_QuantumOsc3d,[this]);
C$.oc.init();
});

Clazz.newMeth(C$, 'destroy', function () {
if (C$.oc != null ) C$.oc.dispose();
C$.oc = null;
});

Clazz.newMeth(C$, 'paint$java_awt_Graphics', function (g) {
var s = "Applet is open in a separate window.";
if (!this.started) s = "Applet is starting.";
 else if (C$.oc == null ) s = "Applet is finished.";
 else if (C$.oc.useFrame) C$.oc.triggerShow();
g.drawString$S$I$I(s, 10, 30);
C$.superclazz.prototype.paint$java_awt_Graphics.apply(this, [g]);
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:10
