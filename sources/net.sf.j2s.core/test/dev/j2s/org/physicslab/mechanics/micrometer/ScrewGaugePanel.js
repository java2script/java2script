Clazz.declarePackage ("org.physicslab.mechanics.micrometer");
Clazz.load (["java.awt.Shape", "java.awt.event.MouseListener", "$.MouseMotionListener", "$.MouseWheelListener", "javax.swing.JPanel"], "org.physicslab.mechanics.micrometer.ScrewGaugePanel", ["java.awt.Color", "$.Dimension", "$.Font", "$.RenderingHints", "java.awt.geom.Arc2D", "$.GeneralPath", "$.Line2D", "$.Rectangle2D", "java.lang.Double", "org.physicslab.mechanics.micrometer.CommonUtils"], function () {
c$ = Clazz.decorateAsClass (function () {
this.mx = 0;
this.my = 0;
this.isdragging = false;
this.MMTOPIXELFACTOR = 10;
this.msd = 10;
this.vsd = 9;
this.t = 25;
this.w1 = 50;
this.w2 = 40;
this.R = 113;
this.Xoffset = 20;
this.Yoffset = 20;
this.numDiv = 20;
this.path = null;
this.vernier = null;
this.mainscaleHeight = 80;
this.mainscaleWidth = 500;
this.vernierscaleHeight = 50;
this.vernierscaleWidth = 100;
this.mainscaleZero = 10;
this.vernierscaleZero = 10;
this.displayInfo = false;
this.msReading = 0;
this.vsReading = 0;
this.zeroerror = 0;
this.reading = 0;
if (!Clazz.isClassDefined ("org.physicslab.mechanics.micrometer.ScrewGaugePanel.Vernier")) {
org.physicslab.mechanics.micrometer.ScrewGaugePanel.$ScrewGaugePanel$Vernier$ ();
}
Clazz.instantialize (this, arguments);
}, org.physicslab.mechanics.micrometer, "ScrewGaugePanel", javax.swing.JPanel, [java.awt.event.MouseMotionListener, java.awt.event.MouseListener, java.awt.event.MouseWheelListener]);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.physicslab.mechanics.micrometer.ScrewGaugePanel, []);
this.mainscaleZero = this.Xoffset + this.t + this.w2 + 2 * this.R + this.w2 + 2 * this.t + this.w2;
this.vernierscaleZero = this.Xoffset + this.t + this.w2 + 2 * this.R + this.w2 + 2 * this.t + this.w2;
this.vernierscaleWidth = this.w1 + this.R;
this.mainscaleWidth = this.msd * this.numDiv;
this.createmainscalePath ();
this.vernier = Clazz.innerTypeInstance (org.physicslab.mechanics.micrometer.ScrewGaugePanel.Vernier, this, null, this.vernierscaleZero, this.Yoffset, this.vernierscaleWidth, this.vernierscaleHeight);
this.setPreferredSize ( new java.awt.Dimension (Clazz.doubleToInt (this.mainscaleZero + this.mainscaleWidth * 1.8 + 2 * this.Xoffset), 400));
this.addMouseMotionListener (this);
this.addMouseListener (this);
this.addMouseWheelListener (this);
this.setFocusable (true);
});
Clazz.defineMethod (c$, "createmainscalePath", 
 function () {
this.path =  new java.awt.geom.GeneralPath ();
var t1 = this.mainscaleZero;
var t2 = 0.7 * this.vernierscaleHeight;
var x;
var y;
x = this.Xoffset + this.t;
y = this.Yoffset + this.t;
this.path.moveTo (x, y);
this.path.lineTo (x + this.w2, y);
this.path.lineTo (x + this.w2, y + this.w1 + 4 * this.t);
var arc =  new java.awt.geom.Arc2D.Double (x + this.w2, y + this.w1 + 4 * this.t - this.R, 2 * this.R, 2 * this.R, 180, 180, 0);
this.path.append (arc, true);
this.path.moveTo (x + this.w2 + 2 * this.R, y + this.w1 + 4 * this.t);
this.path.lineTo (x + this.w2 + 2 * this.R, this.Yoffset);
this.path.lineTo (x + this.w2 + 2 * this.R + this.w2 + 2 * this.t, this.Yoffset);
this.path.lineTo (x + this.w2 + 2 * this.R + this.w2 + 2 * this.t, this.Yoffset + this.w1 + 4 * this.t);
arc =  new java.awt.geom.Arc2D.Double (x + this.w2 - this.w2 - this.t, y + this.w1 + 4 * this.t - (this.R + this.w2 + this.t), 2 * (this.R + this.w2 + this.t), 2 * (this.R + this.w2 + this.t), 0, -180, 0);
this.path.append (arc, true);
this.path.lineTo (x - this.t, y);
this.path.lineTo (x, y);
});
Clazz.defineMethod (c$, "drawMainScale", 
 function (g) {
var g2d = g;
g2d.setPaint ( new java.awt.Color (206, 206, 200));
g2d.fill (this.path);
g2d.setPaint (java.awt.Color.black);
g2d.draw (this.path);
var rect =  new java.awt.geom.Rectangle2D.Double (this.Xoffset + this.t + this.w2, this.Yoffset + 2 * this.t, this.t, this.w1);
g2d.setPaint ( new java.awt.Color (225, 225, 225));
g2d.fill (rect);
g2d.setPaint (java.awt.Color.black);
g2d.draw (rect);
var gap = (this.reading - this.zeroerror) * this.vernier.pitch + 1;
rect =  new java.awt.geom.Rectangle2D.Double (this.Xoffset + this.t + this.w2 + this.t + gap, this.Yoffset + 2 * this.t, 2 * this.R - this.t - gap, this.w1);
g2d.setPaint ( new java.awt.Color (225, 225, 225));
g2d.fill (rect);
g2d.setPaint (java.awt.Color.black);
g2d.draw (rect);
rect =  new java.awt.geom.Rectangle2D.Double (this.Xoffset + this.t + this.w2 + 2 * this.R + this.w2 + 2 * this.t, this.Yoffset + this.t, this.w2 + this.msd * this.numDiv, this.w1 + 2 * this.t);
g2d.setPaint ( new java.awt.Color (220, 220, 210));
g2d.fill (rect);
g2d.setPaint (java.awt.Color.black);
g2d.draw (rect);
var x = this.Xoffset + this.t + this.w2 + 2 * this.R + this.w2 + 2 * this.t;
var y = this.Yoffset + this.t + Clazz.doubleToInt (this.w1 / 2) + this.t;
g.draw ( new java.awt.geom.Line2D.Double (x, y, this.msd * this.numDiv + this.mainscaleZero, y));
var ticklength = 8;
g.setFont ( new java.awt.Font ("arial", 0, 12));
for (var i = 0; i <= this.numDiv; i++) {
x = this.mainscaleZero + this.msd * i;
ticklength = (i % 5 == 0) ? 8 : 5;
ticklength = (i % 2 == 0) ? ticklength : -ticklength;
g.draw ( new java.awt.geom.Line2D.Double (x, y, x, y - ticklength));
g.setFont ( new java.awt.Font ("Arial", 0, 10));
if (i % 10 == 0) org.physicslab.mechanics.micrometer.CommonUtils.outString (g2d, Clazz.doubleToInt (x), Clazz.doubleToInt (y - ticklength - 3), String.valueOf (Clazz.doubleToInt (i / 2)), 1, 2);
}
x = this.Xoffset + this.t + this.w2 + this.R;
y = this.Yoffset + this.w1 + 4 * this.t + this.R + this.w2 + this.t;
g.setFont ( new java.awt.Font ("arial", 0, 11));
org.physicslab.mechanics.micrometer.CommonUtils.outString (g2d, Clazz.doubleToInt (x), Clazz.doubleToInt (y - ticklength - 3), "1 msd = pitch = 0.50 mm", 1, 2);
this.vernier.draw (g);
this.drawInfo (g2d);
}, "java.awt.Graphics2D");
Clazz.defineMethod (c$, "calculateReading", 
 function () {
});
Clazz.defineMethod (c$, "getReading", 
function () {
this.calculateReading ();
return this.reading / 100.0;
});
Clazz.defineMethod (c$, "getCorrectedReading", 
function () {
return this.getReading () - this.zeroerror / 100.0;
});
Clazz.defineMethod (c$, "drawInfo", 
 function (g) {
g.setFont ( new java.awt.Font ("Arial", 0, 11));
g.setPaint (java.awt.Color.gray);
var x1;
var y1;
var x2;
var y2;
x1 = this.Xoffset + this.t + this.w2 + this.t + 1;
y1 = this.Yoffset + 2 * this.t + Clazz.doubleToInt (this.w1 / 2);
x2 = Clazz.doubleToInt (x1 + (this.reading - this.zeroerror) * this.vernier.pitch) - 2;
if (this.displayInfo) g.setPaint (java.awt.Color.RED);
g.drawLine (x1, y1, x2, y1);
g.drawLine (x1, y1, x1 + 3, y1 + 3);
g.drawLine (x1, y1, x1 + 3, y1 - 3);
g.drawLine (x2, y1, x2 - 3, y1 + 3);
g.drawLine (x2, y1, x2 - 3, y1 - 3);
y1 = y1 + 15;
if (this.displayInfo) {
this.calculateReading ();
var s;
if (this.zeroerror != 0) {
s = String.format ("%.2f", [new Double (this.getReading ())]) + "-(" + String.format ("%.2f", [new Double (this.zeroerror / 100.0)]) + ") =" + String.format ("%.2f", [new Double (this.getCorrectedReading ())]) + " mm";
} else {
s = String.format ("%.2f", [new Double (this.getCorrectedReading ())]) + " mm";
}g.setPaint (java.awt.Color.RED);
org.physicslab.mechanics.micrometer.CommonUtils.outString (g, Clazz.doubleToInt ((x1 + x2) / 2), y1, s, 1, 2);
} else {
org.physicslab.mechanics.micrometer.CommonUtils.outString (g, Clazz.doubleToInt ((x1 + x2) / 2), y1, "?", 1, 2);
}if (this.displayInfo == false) return;
g.setPaint (java.awt.Color.RED);
x1 = Clazz.doubleToInt (this.vernier.x + 14);
y1 = this.Yoffset + this.t + Clazz.doubleToInt (this.w1 / 2) + this.t;
x2 = x1 + 20;
g.drawLine (x1, y1, x2, y1);
g.drawLine (x1, y1, x1 + 3, y1 + 3);
g.drawLine (x1, y1, x1 + 3, y1 - 3);
org.physicslab.mechanics.micrometer.CommonUtils.outString (g, x2 + 2, y1, "VSR = " + String.format ("%.2f", [Double.$valueOf (this.vsReading / 100)]) + " mm", 0, 1);
x1 = (this.mainscaleZero + this.msReading * this.msd);
y1 = this.Yoffset + this.t + Clazz.doubleToInt (this.w1 / 2) + this.t - 2;
y2 = y1 - 20;
g.drawLine (x1, y1, x1, y2);
g.drawLine (x1, y1, x1 - 3, y1 - 3);
g.drawLine (x1, y1, x1 + 3, y1 - 3);
org.physicslab.mechanics.micrometer.CommonUtils.outString (g, x1, y2 - 2, "MSR = " + String.format ("%.1f", [Double.$valueOf (this.msReading / 2.0)]) + " mm", 2, 2);
}, "java.awt.Graphics2D");
Clazz.defineMethod (c$, "paint", 
function (g) {
Clazz.superCall (this, org.physicslab.mechanics.micrometer.ScrewGaugePanel, "paint", [g]);
var g2 = g;
var rh =  new java.awt.RenderingHints (java.awt.RenderingHints.KEY_ANTIALIASING, java.awt.RenderingHints.VALUE_ANTIALIAS_ON);
rh.put (java.awt.RenderingHints.KEY_RENDERING, java.awt.RenderingHints.VALUE_RENDER_QUALITY);
g2.setRenderingHints (rh);
this.drawMainScale (g2);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "mouseDragged", 
function (me) {
if (!this.isdragging) return;
var dx;
var dy;
dx = me.getX () - this.mx;
dy = me.getY () - this.my;
this.mx = me.getX ();
this.my = me.getY ();
if ((this.vernier.x <= this.mainscaleZero) && dy < 0) return;
if ((this.vernier.x >= this.mainscaleZero + this.mainscaleWidth) && (dy > 0)) return;
this.vernier.Rotate (Math.round (dy));
this.repaint ();
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseMoved", 
function (me) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseClicked", 
function (me) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mousePressed", 
function (me) {
this.mx = me.getX ();
this.my = me.getY ();
this.isdragging = this.vernier.contains (this.mx, this.my);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseReleased", 
function (me) {
this.isdragging = false;
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseEntered", 
function (me) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseExited", 
function (me) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseWheelMoved", 
function (e) {
System.out.println (e.getWheelRotation ());
this.vernier.Rotate (e.getWheelRotation ());
this.repaint ();
}, "java.awt.event.MouseWheelEvent");
Clazz.defineMethod (c$, "getZeroerror", 
function () {
return this.zeroerror;
});
Clazz.defineMethod (c$, "setZeroerror", 
function (newzeroerror) {
var delta;
delta = newzeroerror - this.zeroerror;
this.zeroerror = newzeroerror;
this.reading += delta;
this.vernier.Rotate (0);
this.repaint ();
}, "~N");
c$.$ScrewGaugePanel$Vernier$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.path = null;
this.x = 0;
this.y = 0;
this.w = 0;
this.h = 0;
this.pitch = 0;
Clazz.instantialize (this, arguments);
}, org.physicslab.mechanics.micrometer.ScrewGaugePanel, "Vernier", null, java.awt.Shape);
Clazz.makeConstructor (c$, 
function (a, b, c, d) {
this.x = a;
this.y = b;
this.w = c;
this.h = d;
this.createPath ();
this.pitch = (this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].msd) / 50.0;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "createPath", 
 function () {
this.path =  new java.awt.geom.GeneralPath ();
this.path.moveTo (this.x, this.y + this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].t);
this.path.lineTo (this.x + this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].w1, this.y);
this.path.lineTo (this.x + this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].w1 + this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].msd * this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].numDiv, this.y);
this.path.lineTo (this.x + this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].w1 + this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].msd * this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].numDiv, this.y + this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].w1 + 4 * this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].t);
this.path.lineTo (this.x + this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].w1, this.y + this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].w1 + 4 * this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].t);
this.path.lineTo (this.x, this.y + this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].w1 + 3 * this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].t);
this.path.lineTo (this.x, this.y + this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].t);
});
Clazz.defineMethod (c$, "setX", 
function (a) {
this.x = a;
this.createPath ();
}, "~N");
Clazz.defineMethod (c$, "translate", 
function (a) {
if (a == 0) return;
this.x += a;
this.createPath ();
}, "~N");
Clazz.defineMethod (c$, "Rotate", 
function (a) {
if ((this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].reading <= this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].zeroerror) && (a <= 0)) return;
if ((this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].reading >= this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].zeroerror + this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].msd * 200) && (a >= 0)) return;
this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].reading += a;
if (this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].reading < this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].zeroerror) this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].reading = this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].zeroerror;
if (this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].reading > this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].zeroerror + this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].msd * 100) this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].reading = this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].zeroerror + this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].msd * 100;
this.x = this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].mainscaleZero + (this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].reading - this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].zeroerror) * this.pitch;
this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].vsReading = this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].reading % 50;
this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].msReading = Clazz.doubleToInt (Math.floor (Clazz.doubleToInt ((this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].reading - this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].zeroerror) / 50)));
this.createPath ();
}, "~N");
Clazz.defineMethod (c$, "draw", 
function (a) {
a.setPaint ( new java.awt.Color (208, 212, 205));
a.fill (this.path);
a.setPaint (java.awt.Color.black);
a.draw (this.path);
var b = 8;
var c;
var d;
a.setFont ( new java.awt.Font ("arial", 0, 9));
var e = this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].vsReading;
if (this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].vsReading < 0) e = 50 + this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].vsReading;
for (var f = 0; f <= 10; f++) {
c = this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].vernier.x;
b = ((f + e % 5) % 5 == 0) ? 8 : 5;
d = this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].Yoffset + this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].t + Clazz.doubleToInt (this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].w1 / 2) + this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].t - f * 5;
a.draw ( new java.awt.geom.Line2D.Double (c, d, c + b, d));
var g;
g = String.valueOf ((e + f < 50) ? e + f : e + f - 50);
if ((f + e % 5) % 5 == 0) org.physicslab.mechanics.micrometer.CommonUtils.outString (a, Clazz.doubleToInt (c + b + 2), Clazz.doubleToInt (d), g, 0, 1);
if (f == 0) continue;
d = this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].Yoffset + this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].t + Clazz.doubleToInt (this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].w1 / 2) + this.b$["org.physicslab.mechanics.micrometer.ScrewGaugePanel"].t + f * 5;
b = ((f - e % 5) % 5 == 0) ? 8 : 5;
a.draw ( new java.awt.geom.Line2D.Double (c, d, c + b, d));
g = String.valueOf ((e >= f) ? e - f : 50 + (e - f));
if ((f - e % 5) % 5 == 0) org.physicslab.mechanics.micrometer.CommonUtils.outString (a, Clazz.doubleToInt (c + b + 2), Clazz.doubleToInt (d), g, 0, 1);
}
}, "java.awt.Graphics2D");
Clazz.overrideMethod (c$, "getBounds", 
function () {
return this.path.getBounds ();
});
Clazz.overrideMethod (c$, "getBounds2D", 
function () {
return this.path.getBounds2D ();
});
Clazz.defineMethod (c$, "contains", 
function (a, b) {
return this.path.contains (a, b);
}, "~N,~N");
Clazz.defineMethod (c$, "contains", 
function (a) {
return this.path.contains (a);
}, "java.awt.geom.Point2D");
Clazz.defineMethod (c$, "intersects", 
function (a, b, c, d) {
return this.path.intersects (a, b, c, d);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "intersects", 
function (a) {
return this.path.intersects (a);
}, "java.awt.geom.Rectangle2D");
Clazz.defineMethod (c$, "contains", 
function (a, b, c, d) {
return this.path.contains (a, b);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "contains", 
function (a) {
return this.path.contains (a);
}, "java.awt.geom.Rectangle2D");
Clazz.defineMethod (c$, "getPathIterator", 
function (a) {
return this.path.getPathIterator (a);
}, "java.awt.geom.AffineTransform");
Clazz.defineMethod (c$, "getPathIterator", 
function (a, b) {
return this.path.getPathIterator (a, b);
}, "java.awt.geom.AffineTransform,~N");
c$ = Clazz.p0p ();
};
});
