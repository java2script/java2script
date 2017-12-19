(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "Quantum1DCrystal", null, 'a2s.Applet', 'java.awt.event.ComponentListener');
C$.qf = null;

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
if (C$.qf != null ) C$.qf.dispose();
C$.qf = null;
this.repaint();
});

Clazz.newMeth(C$, 'main', function (args) {
C$.qf = Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.Quantum1DCrystalFrame'))).c$$com_falstad_Quantum1DCrystal,[null]);
C$.qf.init();
}, 1);

Clazz.newMeth(C$, 'init', function () {
this.addComponentListener$java_awt_event_ComponentListener(this);
});

Clazz.newMeth(C$, 'showFrame', function () {
if (C$.qf == null ) {
this.started = true;
C$.qf = Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.Quantum1DCrystalFrame'))).c$$com_falstad_Quantum1DCrystal,[this]);
C$.qf.init();
this.repaint();
}});

Clazz.newMeth(C$, 'paint$java_awt_Graphics', function (g) {
var s = "Applet is open in a separate window.";
if (!this.started) s = "Applet is starting.";
 else if (C$.qf == null ) s = "Applet is finished.";
 else C$.qf.show();
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
});

Clazz.newMeth(C$, 'destroy', function () {
if (C$.qf != null ) C$.qf.dispose();
C$.qf = null;
this.repaint();
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 22:25:36
