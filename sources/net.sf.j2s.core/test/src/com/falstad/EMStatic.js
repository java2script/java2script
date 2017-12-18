(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "EMStatic", null, 'a2s.Applet');
C$.ogf = null;

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
if (C$.ogf != null ) C$.ogf.dispose();
C$.ogf = null;
});

Clazz.newMeth(C$, 'main', function (args) {
C$.ogf = Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.EMStaticFrame'))).c$$com_falstad_EMStatic,[null]);
C$.ogf.init();
}, 1);

Clazz.newMeth(C$, 'init', function () {
C$.ogf = Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.EMStaticFrame'))).c$$com_falstad_EMStatic,[this]);
C$.ogf.init();
});

Clazz.newMeth(C$, 'destroy', function () {
if (C$.ogf != null ) C$.ogf.dispose();
C$.ogf = null;
});

Clazz.newMeth(C$, 'paint$java_awt_Graphics', function (g) {
C$.superclazz.prototype.paint$java_awt_Graphics.apply(this, [g]);
var s = "Applet is open in a separate window.";
if (!this.started) s = "Applet is starting.";
 else if (C$.ogf == null ) s = "Applet is finished.";
 else if (C$.ogf.useFrame) C$.ogf.triggerShow();
if (C$.ogf == null  || C$.ogf.useFrame ) g.drawString$S$I$I(s, 10, 30);
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:03
