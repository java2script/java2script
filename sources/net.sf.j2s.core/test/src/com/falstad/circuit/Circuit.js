(function(){var P$=Clazz.newPackage("com.falstad.circuit"),I$=[];
var C$=Clazz.newClass(P$, "Circuit", null, 'a2s.Applet', 'java.awt.event.ComponentListener');
C$.ogf = null;

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.finished = false;
this.started = false;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.finished = false;
this.started = false;
}, 1);

Clazz.newMeth(C$, 'destroyFrame', function () {
if (C$.ogf != null ) C$.ogf.dispose();
C$.ogf = null;
this.repaint();
this.finished = true;
});

Clazz.newMeth(C$, 'init', function () {
this.addComponentListener$java_awt_event_ComponentListener(this);
this.showFrame();
});

Clazz.newMeth(C$, 'main', function (args) {
C$.ogf = Clazz.new_((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CirSim'))).c$$com_falstad_circuit_Circuit,[null]);
C$.ogf.init();
}, 1);

Clazz.newMeth(C$, 'showFrame', function () {
if (this.finished) {
this.repaint();
return;
}if (C$.ogf == null ) {
this.started = true;
C$.ogf = Clazz.new_((I$[0]||(I$[0]=Clazz.load('com.falstad.circuit.CirSim'))).c$$com_falstad_circuit_Circuit,[this]);
C$.ogf.init();
}C$.ogf.setVisible$Z(true);
this.repaint();
});

Clazz.newMeth(C$, 'hideFrame', function () {
if (this.finished) return;
C$.ogf.setVisible$Z(false);
this.repaint();
});

Clazz.newMeth(C$, 'toggleSwitch$I', function (x) {
C$.ogf.toggleSwitch$I(x);
});

Clazz.newMeth(C$, 'paint$java_awt_Graphics', function (g) {
C$.superclazz.prototype.paint$java_awt_Graphics.apply(this, [g]);
var s = "Applet is open in a separate window.";
if (C$.ogf != null  && !C$.ogf.isVisible() ) s = "Applet window is hidden.";
if (!this.started) s = "Applet is starting.";
 else if (C$.ogf == null  || this.finished ) s = "Applet is finished.";
 else if (C$.ogf != null  && C$.ogf.useFrame ) C$.ogf.triggerShow();
g.drawString$S$I$I(s, 10, 30);
});

Clazz.newMeth(C$, 'componentHidden$java_awt_event_ComponentEvent', function (e) {
});

Clazz.newMeth(C$, 'componentMoved$java_awt_event_ComponentEvent', function (e) {
});

Clazz.newMeth(C$, 'componentShown$java_awt_event_ComponentEvent', function (e) {
this.showFrame();
});

Clazz.newMeth(C$, 'componentResized$java_awt_event_ComponentEvent', function (e) {
if (C$.ogf != null ) C$.ogf.componentResized$java_awt_event_ComponentEvent(e);
});

Clazz.newMeth(C$, 'destroy', function () {
if (C$.ogf != null ) C$.ogf.dispose();
C$.ogf = null;
this.repaint();
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:18
