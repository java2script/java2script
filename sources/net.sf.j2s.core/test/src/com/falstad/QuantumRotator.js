(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "QuantumRotator", null, 'a2s.Applet', 'java.awt.event.ComponentListener');
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
this.repaint();
});

Clazz.newMeth(C$, 'init', function () {
this.showFrame();
});

Clazz.newMeth(C$, 'main', function (args) {
C$.ogf = Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.QuantumRotatorFrame'))).c$$com_falstad_QuantumRotator,[null]);
C$.ogf.init();
}, 1);

Clazz.newMeth(C$, 'showFrame', function () {
if (C$.ogf == null ) {
this.started = true;
C$.ogf = Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.QuantumRotatorFrame'))).c$$com_falstad_QuantumRotator,[this]);
C$.ogf.init();
this.repaint();
}});

Clazz.newMeth(C$, 'paint$java_awt_Graphics', function (g) {
var s = "Applet is open in a separate window.";
if (!this.started) s = "Applet is starting.";
 else if (C$.ogf == null ) s = "Applet is finished.";
 else if (C$.ogf.useFrame) C$.ogf.triggerShow();
g.drawString$S$I$I(s, 10, 30);
C$.superclazz.prototype.paint$java_awt_Graphics.apply(this, [g]);
});

Clazz.newMeth(C$, 'componentHidden$java_awt_event_ComponentEvent', function (e) {
});

Clazz.newMeth(C$, 'componentMoved$java_awt_event_ComponentEvent', function (e) {
});

Clazz.newMeth(C$, 'componentShown$java_awt_event_ComponentEvent', function (e) {
});

Clazz.newMeth(C$, 'componentResized$java_awt_event_ComponentEvent', function (e) {
});

Clazz.newMeth(C$, 'destroy', function () {
if (C$.ogf != null ) C$.ogf.dispose();
C$.ogf = null;
this.repaint();
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:10
