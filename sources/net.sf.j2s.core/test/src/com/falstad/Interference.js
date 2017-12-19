(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "Interference", null, 'a2s.Applet');
C$.ff = null;

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
if (C$.ff != null ) C$.ff.dispose();
C$.ff = null;
});

Clazz.newMeth(C$, 'main', function (args) {
C$.ff = Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.InterferenceFrame'))).c$$com_falstad_Interference,[null]);
C$.ff.init();
}, 1);

Clazz.newMeth(C$, 'init', function () {
C$.ff = Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.InterferenceFrame'))).c$$com_falstad_Interference,[this]);
C$.ff.init();
});

Clazz.newMeth(C$, 'destroy', function () {
if (C$.ff != null ) C$.ff.dispose();
C$.ff = null;
});

Clazz.newMeth(C$, 'paint$java_awt_Graphics', function (g) {
C$.superclazz.prototype.paint$java_awt_Graphics.apply(this, [g]);
var s = "Applet is open in a separate window.";
if (!this.started) s = "Applet is starting.";
 else if (C$.ff == null ) s = "Applet is finished.";
 else if (C$.ff.useFrame) C$.ff.triggerShow();
if (C$.ff == null  || C$.ff.useFrame ) g.drawString$S$I$I(s, 10, 30);
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:06
