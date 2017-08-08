Clazz.declarePackage ("org.ultrastudio");
Clazz.load (["javax.swing.JApplet", "$.JComponent", "java.awt.BasicStroke", "$.Point"], "org.ultrastudio.PrismApplet", ["java.awt.BorderLayout", "$.Color", "java.lang.Double", "javax.swing.BorderFactory", "$.JSlider", "javax.swing.event.ChangeListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.angle = null;
this.density = null;
this.bAngle = null;
this.bDensity = null;
this.prism = null;
if (!Clazz.isClassDefined ("org.ultrastudio.PrismApplet.Prism")) {
org.ultrastudio.PrismApplet.$PrismApplet$Prism$ ();
}
Clazz.instantialize (this, arguments);
}, org.ultrastudio, "PrismApplet", javax.swing.JApplet);
Clazz.overrideMethod (c$, "init", 
function () {
this.setLayout ( new java.awt.BorderLayout ());
this.angle =  new javax.swing.JSlider ();
this.angle.setMaximum (180);
this.angle.setMajorTickSpacing (30);
this.angle.setMinorTickSpacing (5);
this.angle.setMaximum (90);
this.angle.setMinimum (0);
this.angle.setValue (45);
this.bAngle = javax.swing.BorderFactory.createTitledBorder ("Incidence angle");
this.angle.setBorder (this.bAngle);
this.angle.setPaintTicks (true);
this.angle.setPaintLabels (true);
this.add (this.angle, "South");
this.density =  new javax.swing.JSlider ();
this.density.setMinimum (1000);
this.density.setMaximum (2000);
this.density.setMinorTickSpacing (20);
this.density.setMajorTickSpacing (100);
this.bDensity = javax.swing.BorderFactory.createTitledBorder ("Refraction coefficient ");
this.density.setBorder (this.bDensity);
this.add (this.density, "North");
this.density.setValue (1600);
this.density.addChangeListener (((Clazz.isClassDefined ("org.ultrastudio.PrismApplet$1") ? 0 : org.ultrastudio.PrismApplet.$PrismApplet$1$ ()), Clazz.innerTypeInstance (org.ultrastudio.PrismApplet$1, this, null)));
this.prism = Clazz.innerTypeInstance (org.ultrastudio.PrismApplet.Prism, this, null);
this.add (this.prism, "Center");
this.prism.setRayEntry (this.angle.getValue ());
this.angle.addChangeListener (((Clazz.isClassDefined ("org.ultrastudio.PrismApplet$2") ? 0 : org.ultrastudio.PrismApplet.$PrismApplet$2$ ()), Clazz.innerTypeInstance (org.ultrastudio.PrismApplet$2, this, null)));
});
Clazz.defineMethod (c$, "updateLabels", 
 function () {
var a1 = this.angle.getValue ();
var nn = org.ultrastudio.PrismApplet.myName (this.prism.n);
if (nn.length > 0) nn = ", " + nn;
this.bDensity.setTitle (String.format ("Refraction %.3f" + nn, [new Double (this.prism.n)]));
this.bAngle.setTitle (String.format ("Incidence %d, bending %.2f", [new Integer (a1), new Double (Math.toDegrees (this.prism.dev (Math.toRadians (a1))))]));
this.angle.repaint ();
this.density.repaint ();
});
c$.myName = Clazz.defineMethod (c$, "myName", 
 function (n) {
var d = Clazz.doubleToInt (n * 10);
switch (d) {
case 10:
return "air";
case 13:
return "ice";
case 14:
return "teflon";
case 15:
return "salt";
case 16:
case 17:
return "glass";
case 18:
return "sapphire";
case 24:
return "diamond";
default:
return "";
}
}, "~N");
c$.$PrismApplet$Prism$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.A = null;
this.AH = null;
this.B1 = null;
this.B2 = null;
this.E = null;
this.O = null;
this.h = 0;
this.l = 0;
this.rayEntry = 0;
this.n = 1.6;
this.rayStroke = null;
this.simpleStroke = null;
Clazz.instantialize (this, arguments);
}, org.ultrastudio.PrismApplet, "Prism", javax.swing.JComponent);
Clazz.prepareFields (c$, function () {
this.A =  new java.awt.Point ();
this.AH =  new java.awt.Point ();
this.B1 =  new java.awt.Point ();
this.B2 =  new java.awt.Point ();
this.E =  new java.awt.Point ();
this.O =  new java.awt.Point ();
this.rayStroke =  new java.awt.BasicStroke (3);
});
Clazz.defineMethod (c$, "dev", 
function (a) {
return a + this.a2 (a) - org.ultrastudio.PrismApplet.AA;
}, "~N");
Clazz.defineMethod (c$, "a2", 
function (a) {
var b = Math.asin (this.n * Math.sin (org.ultrastudio.PrismApplet.AA - Math.asin (Math.sin (a) / this.n)));
return b;
}, "~N");
Clazz.defineMethod (c$, "beta1", 
function (a) {
return Math.asin (Math.sin (a) / this.n);
}, "~N");
Clazz.defineMethod (c$, "delta1", 
function (a) {
return a - this.beta1 (a);
}, "~N");
Clazz.defineMethod (c$, "setRayEntry", 
function (a) {
this.rayEntry = a;
this.repaint ();
}, "~N");
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.ultrastudio.PrismApplet.Prism, []);
this.setOpaque (true);
});
Clazz.overrideMethod (c$, "paintComponent", 
function (a) {
var b = a;
this.simpleStroke = b.getStroke ();
b.setColor (java.awt.Color.WHITE);
var c = this.getWidth ();
var d = this.getHeight ();
b.fillRect (0, 0, c, d);
this.A.x = Clazz.doubleToInt (c / 2);
this.A.y = 0;
this.h = d;
this.AH.x = this.A.x;
this.AH.y = this.h;
this.l = Clazz.doubleToInt (this.h * org.ultrastudio.PrismApplet.TAN_30);
this.B1.x = this.AH.x - this.l;
this.B2.x = this.AH.x + this.l;
this.B1.y = this.B2.y = this.h;
this.E.x = Clazz.doubleToInt ((this.B1.x + this.A.x) / 2);
this.E.y = Clazz.doubleToInt ((this.B1.y + this.A.y) / 2);
this.O.x = Clazz.doubleToInt ((this.B2.x + this.A.x) / 2);
this.O.y = Clazz.doubleToInt ((this.B2.y + this.A.y) / 2);
var e =  Clazz.newIntArray (-1, [this.B1.x, this.A.x, this.B2.x]);
var f =  Clazz.newIntArray (-1, [this.B1.y, this.A.y, this.B2.y]);
b.setColor ( new java.awt.Color (255, 255, Clazz.doubleToInt (255 * (2.0 - this.n))));
b.fillPolygon (e, f, 3);
b.setColor (java.awt.Color.YELLOW.darker ());
b.setStroke (this.rayStroke);
b.drawPolygon (e, f, 3);
b.setStroke (this.simpleStroke);
b.setColor (java.awt.Color.GREEN);
this.line (b, this.E, this.B2);
var g = b.create ();
g.setStroke (this.rayStroke);
g.rotate (Math.toRadians (-this.rayEntry) + org.ultrastudio.PrismApplet.AA / 2, this.E.x, this.E.y);
g.setColor (java.awt.Color.RED);
g.drawLine (this.E.x, this.E.y, this.E.x - 100, this.E.y);
g.setStroke (this.simpleStroke);
g.setColor (java.awt.Color.ORANGE);
g.drawLine (this.E.x, this.E.y, this.E.x + 100 + c, this.E.y);
var h = Math.toRadians (this.rayEntry);
var i = this.delta1 (h);
var j = this.a2 (h);
var k = 1.5707963267948966 - this.beta1 (h);
var l = 1.5707963267948966 - (org.ultrastudio.PrismApplet.AA - this.beta1 (h));
var m = this.E.distance (this.A);
var n = Math.sin (k) * m / Math.sin (l);
this.O.x = this.A.x + Clazz.doubleToInt (n * Math.sin (org.ultrastudio.PrismApplet.AA / 2));
this.O.y = this.A.y + Clazz.doubleToInt (n * Math.cos (org.ultrastudio.PrismApplet.AA / 2));
g.dispose ();
g = b.create ();
g.setColor (java.awt.Color.RED);
if (!Double.isNaN (j)) {
g.rotate (j - org.ultrastudio.PrismApplet.AA / 2, this.O.x, this.O.y);
g.drawLine (this.O.x, this.O.y, this.O.x - 200, this.O.y);
}g.dispose ();
g = b.create ();
g.setColor (java.awt.Color.RED);
g.setStroke (this.rayStroke);
this.line (g, this.E, this.O);
if (!Double.isNaN (j)) {
g.rotate (j - org.ultrastudio.PrismApplet.AA / 2, this.O.x, this.O.y);
g.drawLine (this.O.x, this.O.y, this.O.x + 100, this.O.y);
}}, "java.awt.Graphics");
Clazz.defineMethod (c$, "line", 
 function (a, b, c) {
a.drawLine (b.x, b.y, c.x, c.y);
}, "java.awt.Graphics2D,java.awt.Point,java.awt.Point");
Clazz.defineMethod (c$, "setDensity", 
function (a) {
this.n = a;
this.repaint ();
}, "~N");
c$ = Clazz.p0p ();
};
c$.$PrismApplet$1$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.declareAnonymous (org.ultrastudio, "PrismApplet$1", null, javax.swing.event.ChangeListener);
Clazz.overrideMethod (c$, "stateChanged", 
function (e) {
var n = this.b$["org.ultrastudio.PrismApplet"].density.getValue () * 0.001;
this.b$["org.ultrastudio.PrismApplet"].prism.setDensity (n);
this.b$["org.ultrastudio.PrismApplet"].updateLabels ();
}, "javax.swing.event.ChangeEvent");
c$ = Clazz.p0p ();
};
c$.$PrismApplet$2$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.declareAnonymous (org.ultrastudio, "PrismApplet$2", null, javax.swing.event.ChangeListener);
Clazz.overrideMethod (c$, "stateChanged", 
function (e) {
this.b$["org.ultrastudio.PrismApplet"].prism.setRayEntry (this.b$["org.ultrastudio.PrismApplet"].angle.getValue ());
this.b$["org.ultrastudio.PrismApplet"].updateLabels ();
}, "javax.swing.event.ChangeEvent");
c$ = Clazz.p0p ();
};
c$.TAN_30 = c$.prototype.TAN_30 = Math.tan (Math.toRadians (30));
c$.AA = c$.prototype.AA = Math.toRadians (60);
});
