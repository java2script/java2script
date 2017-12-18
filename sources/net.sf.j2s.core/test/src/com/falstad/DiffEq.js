(function(){var P$=Clazz.newPackage("com.falstad"),I$=[];
var C$=Clazz.newClass(P$, "DiffEq", null, 'a2s.Applet', 'java.awt.event.ComponentListener');

C$.$clinit$ = function() {Clazz.load(C$, 1);
}

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.ogf = null;
this.started = false;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
this.started = false;
}, 1);

Clazz.newMeth(C$, 'destroyFrame', function () {
if (this.ogf != null ) this.ogf.dispose();
this.ogf = null;
this.repaint();
});

Clazz.newMeth(C$, 'init', function () {
this.addComponentListener$java_awt_event_ComponentListener(this);
});

Clazz.newMeth(C$, 'showFrame', function () {
if (this.ogf == null ) {
this.started = true;
this.ogf = Clazz.new_((I$[1]||(I$[1]=Clazz.load('com.falstad.DiffEqFrame'))).c$$com_falstad_DiffEq,[this]);
this.ogf.init();
this.repaint();
}});

Clazz.newMeth(C$, 'paint$java_awt_Graphics', function (g) {
C$.superclazz.prototype.paint$java_awt_Graphics.apply(this, [g]);
var s = "Applet is open in a separate window.";
if (!this.started) s = "Applet is starting.";
 else if (this.ogf == null ) s = "Applet is finished.";
 else if (this.ogf.useFrame) this.ogf.triggerShow();
if (this.ogf == null  || this.ogf.useFrame ) g.drawString$S$I$I(s, 10, 30);
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
if (this.ogf != null ) this.ogf.dispose();
this.ogf = null;
this.repaint();
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:01
