Clazz.declarePackage ("org.ultrastudio");
Clazz.load (["javax.swing.JApplet", "$.JPanel", "javax.swing.event.ChangeListener", "java.awt.GridLayout", "javax.swing.JSlider"], "org.ultrastudio.LissajousSimple", ["java.awt.BasicStroke", "$.BorderLayout", "$.Color", "$.Dimension", "java.awt.geom.Line2D", "javax.swing.BorderFactory"], function () {
c$ = Clazz.decorateAsClass (function () {
this.acceleration = 100;
if (!Clazz.isClassDefined ("org.ultrastudio.LissajousSimple.LisChart")) {
org.ultrastudio.LissajousSimple.$LissajousSimple$LisChart$ ();
}
if (!Clazz.isClassDefined ("org.ultrastudio.LissajousSimple.SigChart")) {
org.ultrastudio.LissajousSimple.$LissajousSimple$SigChart$ ();
}
this.fySlider = null;
this.fxSlider = null;
this.aySlider = null;
this.axSlider = null;
this.sliders = null;
this.MAX_POINTS = 1000;
this.xx = null;
this.yy = null;
this.tt = null;
this.count = 1000;
Clazz.instantialize (this, arguments);
}, org.ultrastudio, "LissajousSimple", javax.swing.JApplet, javax.swing.event.ChangeListener);
Clazz.prepareFields (c$, function () {
this.fySlider =  new javax.swing.JSlider ();
this.fxSlider =  new javax.swing.JSlider ();
this.aySlider =  new javax.swing.JSlider ();
this.axSlider =  new javax.swing.JSlider ();
this.sliders =  new javax.swing.JPanel ( new java.awt.GridLayout (4, 1));
this.xx =  Clazz.newFloatArray (1000, 0);
this.yy =  Clazz.newFloatArray (1000, 0);
this.tt =  Clazz.newFloatArray (1000, 0);
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.ultrastudio.LissajousSimple, []);
this.setLayout ( new java.awt.BorderLayout (4, 4));
this.fySlider.setValue (2);
this.fxSlider.setValue (3);
this.fySlider.setMaximum (10);
this.aySlider.setMaximum (180);
this.fxSlider.setMaximum (10);
this.axSlider.setMaximum (180);
this.fxSlider.setMinimum (1);
this.fySlider.setMinimum (1);
this.fxSlider.setMinorTickSpacing (1);
this.fySlider.setMinorTickSpacing (1);
this.aySlider.setValue (0);
this.axSlider.setValue (120);
this.axSlider.setMinorTickSpacing (10);
this.aySlider.setMinorTickSpacing (10);
this.aySlider.setMajorTickSpacing (60);
this.axSlider.setMajorTickSpacing (60);
this.fxSlider.setMajorTickSpacing (1);
this.fySlider.setMajorTickSpacing (1);
this.fxSlider.setBorder (javax.swing.BorderFactory.createTitledBorder ("First frequency, Hz"));
this.axSlider.setBorder (javax.swing.BorderFactory.createTitledBorder ("First phase, degrees"));
this.fySlider.setBorder (javax.swing.BorderFactory.createTitledBorder ("Second frequency, Hz"));
this.aySlider.setBorder (javax.swing.BorderFactory.createTitledBorder ("Second phase, degrees"));
var lissajousChart = Clazz.innerTypeInstance (org.ultrastudio.LissajousSimple.LisChart, this, null);
lissajousChart.setBorder (javax.swing.BorderFactory.createLineBorder (java.awt.Color.BLACK));
var signalChart = Clazz.innerTypeInstance (org.ultrastudio.LissajousSimple.SigChart, this, null);
signalChart.setPreferredSize ( new java.awt.Dimension (500, 100));
signalChart.setBorder (javax.swing.BorderFactory.createLineBorder (java.awt.Color.BLACK));
this.setupSlider (this.fxSlider);
this.setupSlider (this.fySlider);
this.setupSlider (this.axSlider);
this.setupSlider (this.aySlider);
this.add (signalChart, "South");
this.add (lissajousChart, "Center");
this.add (this.sliders, "East");
this.createLissajousDataSet ();
});
Clazz.defineMethod (c$, "setupSlider", 
 function (slider) {
slider.setPaintLabels (true);
slider.setPaintTicks (true);
slider.setPaintTrack (true);
slider.setSnapToTicks (true);
slider.setPreferredSize ( new java.awt.Dimension (200, 30));
this.sliders.add (slider);
slider.addChangeListener (this);
}, "javax.swing.JSlider");
Clazz.defineMethod (c$, "createLissajousDataSet", 
function () {
var fx = this.fxSlider.getValue () / 100.0;
var fy = this.fySlider.getValue () / 100.0;
var ax = Math.toRadians (this.aySlider.getValue ());
var ay = Math.toRadians (this.axSlider.getValue ());
this.xx =  Clazz.newFloatArray (1000, 0);
this.yy =  Clazz.newFloatArray (1000, 0);
var p2 = (6.283185307179586);
for (this.count = 0; this.count < this.xx.length; this.count++) {
var ff = 100.0 * 6.2831855 * (this.count) / 1000;
this.yy[this.count] = Math.sin (ax + fx * ff);
this.xx[this.count] = Math.sin (ay + fy * ff);
this.tt[this.count] = 10.0 * ff / 6.2831855;
}
if (this.count < 999) this.count++;
});
Clazz.overrideMethod (c$, "stateChanged", 
function (e) {
this.createLissajousDataSet ();
this.repaint (50);
}, "javax.swing.event.ChangeEvent");
c$.$LissajousSimple$LisChart$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.scale = 0;
Clazz.instantialize (this, arguments);
}, org.ultrastudio.LissajousSimple, "LisChart", javax.swing.JPanel);
Clazz.overrideMethod (c$, "paint", 
function (a) {
var b = a;
var c = this.getWidth ();
var d = this.getHeight ();
var e = Math.min (c, d);
this.scale = e / 2.2;
b.setStroke ( new java.awt.BasicStroke (2));
b.setColor (java.awt.Color.RED);
var f =  new java.awt.geom.Line2D.Float ();
f.x2 = this.g (this.b$["org.ultrastudio.LissajousSimple"].xx[0]);
f.y2 = this.g (this.b$["org.ultrastudio.LissajousSimple"].yy[0]);
for (var g = 1; g < this.b$["org.ultrastudio.LissajousSimple"].count; g++) {
f.x1 = f.x2;
f.y1 = f.y2;
f.x2 = this.g (this.b$["org.ultrastudio.LissajousSimple"].xx[g]);
f.y2 = this.g (this.b$["org.ultrastudio.LissajousSimple"].yy[g]);
b.draw (f);
}
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "g", 
function (a) {
return (a + 1.1) * this.scale;
}, "~N");
c$ = Clazz.p0p ();
};
c$.$LissajousSimple$SigChart$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.sx = 0;
this.sy = 0;
Clazz.instantialize (this, arguments);
}, org.ultrastudio.LissajousSimple, "SigChart", javax.swing.JPanel);
Clazz.overrideMethod (c$, "paint", 
function (a) {
var b = a;
var c = this.getWidth ();
var d = this.getHeight ();
var e = (6.283185307179586);
var f = 100.0 * e * (this.b$["org.ultrastudio.LissajousSimple"].count) / 1000;
this.sx = c / f;
this.sy = d / 2.2;
b.setStroke ( new java.awt.BasicStroke (2));
b.setColor (java.awt.Color.RED);
this.paintSignal (b, this.b$["org.ultrastudio.LissajousSimple"].xx);
b.setColor (java.awt.Color.BLUE);
this.paintSignal (b, this.b$["org.ultrastudio.LissajousSimple"].yy);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "paintSignal", 
 function (a, b) {
var c =  new java.awt.geom.Line2D.Float ();
c.x2 = this.gx (this.b$["org.ultrastudio.LissajousSimple"].tt[0]);
c.y2 = this.gy (b[0]);
for (var d = 1; d < this.b$["org.ultrastudio.LissajousSimple"].count; d++) {
c.x1 = c.x2;
c.y1 = c.y2;
c.x2 = this.gx (this.b$["org.ultrastudio.LissajousSimple"].tt[d]);
c.y2 = this.gy (b[d]);
a.draw (c);
}
}, "java.awt.Graphics2D,~A");
Clazz.defineMethod (c$, "gy", 
function (a) {
return (a + 1.1) * this.sy;
}, "~N");
Clazz.defineMethod (c$, "gx", 
function (a) {
return a * this.sx;
}, "~N");
c$ = Clazz.p0p ();
};
});
