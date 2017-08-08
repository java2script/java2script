Clazz.declarePackage ("org.physicslab.mechanics.vernier");
Clazz.load (["java.awt.Shape", "java.awt.event.MouseListener", "$.MouseMotionListener", "$.MouseWheelListener", "javax.swing.JPanel"], "org.physicslab.mechanics.vernier.VernierPanel", ["java.awt.Color", "$.Dimension", "$.Font", "$.RenderingHints", "java.awt.geom.GeneralPath", "$.Line2D", "$.Rectangle2D", "org.physicslab.mechanics.vernier.CommonUtils"], function () {
c$ = Clazz.decorateAsClass (function () {
this.mx = 0;
this.my = 0;
this.isdragging = false;
this.MMTOPIXELFACTOR = 10;
this.msd = 10;
this.vsd = 9;
this.vernier = null;
this.mainscaleHeight = 80;
this.mainscaleWidth = 500;
this.vernierscaleHeight = 50;
this.vernierscaleWidth = 100;
this.mainscaleZero = 10;
this.vernierscaleZero = 10;
this.numDiv = 30;
this.Xoffset = 55;
this.Yoffset = 45;
this.path = null;
this.displayInfo = false;
this.msReading = 0;
this.vsReading = 0;
this.zeroerror = 0;
if (!Clazz.isClassDefined ("org.physicslab.mechanics.vernier.VernierPanel.Vernier")) {
org.physicslab.mechanics.vernier.VernierPanel.$VernierPanel$Vernier$ ();
}
Clazz.instantialize (this, arguments);
}, org.physicslab.mechanics.vernier, "VernierPanel", javax.swing.JPanel, [java.awt.event.MouseMotionListener, java.awt.event.MouseListener, java.awt.event.MouseWheelListener]);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.physicslab.mechanics.vernier.VernierPanel, []);
this.vernierscaleWidth = Clazz.doubleToInt (2 * this.vernierscaleZero + this.vsd * 10);
this.mainscaleWidth = Clazz.doubleToInt (this.msd * this.numDiv) + this.vernierscaleWidth;
this.createmainscalePath ();
this.vernier = Clazz.innerTypeInstance (org.physicslab.mechanics.vernier.VernierPanel.Vernier, this, null, this.Xoffset, this.Yoffset + this.mainscaleHeight, this.vernierscaleWidth, this.vernierscaleHeight);
this.setPreferredSize ( new java.awt.Dimension (this.mainscaleWidth + 2 * this.Xoffset, this.mainscaleHeight + 3 * this.vernierscaleHeight));
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
this.path.moveTo (10, 10 + 1.5 * t1);
this.path.lineTo (10 + t2, 10 + 1.5 * t1);
this.path.lineTo (10 + t2, 10);
this.path.quadTo (10 + t2 + 0.6 * this.mainscaleZero, 10 + 0.5 * t1, 10 + t2 + this.mainscaleZero, 10 + 1.5 * t1);
this.path.lineTo (10 + t2 + this.mainscaleWidth, 10 + 1.5 * t1);
this.path.lineTo (10 + t2 + this.mainscaleWidth, 10 + 1.5 * t1 + this.mainscaleHeight);
this.path.lineTo (10 + t2, 10 + 1.5 * t1 + this.mainscaleHeight);
this.path.lineTo (10 + t2, 10 + 1.5 * t1 + this.mainscaleHeight + 3 * t2);
this.path.lineTo (10 + 0.7 * t2, 10 + 1.5 * t1 + this.mainscaleHeight + 2.7 * t2);
this.path.lineTo (10, 10 + 1.5 * t1 + this.mainscaleHeight);
this.path.lineTo (10, 10 + 1.5 * t1);
this.path.moveTo (10, 10 + 1.5 * t1);
this.Xoffset = Clazz.doubleToInt (10 + t2);
this.Yoffset = Clazz.doubleToInt (10 + 1.5 * t1);
});
Clazz.defineMethod (c$, "drawMainScale", 
 function (g) {
var g2d = g;
var rect =  new java.awt.geom.Rectangle2D.Double (this.Xoffset, this.Yoffset, this.mainscaleWidth, this.mainscaleHeight);
g2d.setPaint ( new java.awt.Color (210, 210, 210));
g2d.fill (this.path);
g2d.setPaint (java.awt.Color.black);
g2d.draw (this.path);
var x = this.Xoffset;
var y = this.Yoffset + this.mainscaleHeight;
var ticklength = 8;
g.setFont ( new java.awt.Font ("arial", 0, 12));
for (var i = 0; i <= this.numDiv; i++) {
x = this.Xoffset + this.mainscaleZero + this.msd * i;
ticklength = (i % 5 == 0) ? 12 : 8;
g.draw ( new java.awt.geom.Line2D.Double (x, y, x, y - ticklength));
if (i % 10 == 0) org.physicslab.mechanics.vernier.CommonUtils.outString (g2d, Clazz.doubleToInt (x), Clazz.doubleToInt (y - ticklength - 3), String.valueOf (i), 1, 2);
}
x = this.Xoffset + this.mainscaleZero + this.msd * this.numDiv + 10;
org.physicslab.mechanics.vernier.CommonUtils.outString (g2d, Clazz.doubleToInt (x), Clazz.doubleToInt (y - ticklength - 3), "mm", 0, 2);
this.vernier.draw (g);
this.drawInfo (g2d);
}, "java.awt.Graphics2D");
Clazz.defineMethod (c$, "calculateReading", 
 function () {
var reading = Clazz.doubleToInt (Math.floor (this.vernier.x - this.Xoffset));
reading += this.zeroerror;
this.msReading = Clazz.doubleToInt (reading / 10);
this.vsReading = reading % 10;
});
Clazz.defineMethod (c$, "getReading", 
function () {
this.calculateReading ();
return this.msReading + this.vsReading / 10.0;
});
Clazz.defineMethod (c$, "getCorrectedReading", 
function () {
return this.getReading () - this.zeroerror / 10.0;
});
Clazz.defineMethod (c$, "drawInfo", 
 function (g) {
g.setFont ( new java.awt.Font ("Arial", 0, 11));
g.setPaint (java.awt.Color.gray);
var x1;
var y1;
var x2;
var y2;
x1 = this.Xoffset + 1;
x2 = Clazz.doubleToInt (this.vernier.x - 1);
y1 = this.Yoffset + this.mainscaleHeight + this.vernierscaleHeight * 2;
g.drawLine (x1, y1, x2, y1);
g.drawLine (x1, y1, x1 + 3, y1 + 3);
g.drawLine (x1, y1, x1 + 3, y1 - 3);
g.drawLine (x2, y1, x2 - 3, y1 + 3);
g.drawLine (x2, y1, x2 - 3, y1 - 3);
y1 = this.Yoffset + this.mainscaleHeight + this.vernierscaleHeight * 2 + 15;
if (this.displayInfo) {
this.calculateReading ();
var s;
g.setPaint (java.awt.Color.RED);
if (this.zeroerror != 0) {
s = String.format ("%.1f", [new Double (this.getReading ())]) + "-(" + String.format ("%.1f", [new Double (this.zeroerror / 10.0)]) + ") = " + String.format ("%.1f", [new Double (this.getCorrectedReading ())]) + " mm";
} else {
s = String.format ("%.1f", [new Double (this.getCorrectedReading ())]) + " mm";
}org.physicslab.mechanics.vernier.CommonUtils.outString (g, Clazz.doubleToInt ((x1 + x2) / 2), y1, s, 1, 2);
} else {
org.physicslab.mechanics.vernier.CommonUtils.outString (g, Clazz.doubleToInt ((x1 + x2) / 2), y1, "?", 1, 2);
}if (this.displayInfo == false) return;
g.setPaint (java.awt.Color.RED);
x1 = Clazz.doubleToInt (this.vernier.x + this.vernierscaleZero);
y1 = Clazz.doubleToInt (this.vernier.y) - 1;
y2 = y1 - 20;
g.drawLine (x1, y1, x1, y2);
g.drawLine (x1, y2, x1 - 3, y2 + 3);
g.drawLine (x1, y2, x1 + 3, y2 + 3);
x1 = Clazz.doubleToInt (this.vernier.x + this.vernierscaleZero + this.vsReading * this.vsd);
y1 = Clazz.doubleToInt (this.vernier.y) + 20;
y2 = y1 + 20;
g.drawLine (x1, y1, x1, y2);
g.drawLine (x1, y1, x1 - 3, y1 + 3);
g.drawLine (x1, y1, x1 + 3, y1 + 3);
org.physicslab.mechanics.vernier.CommonUtils.outString (g, x1, y2 + 2, "VSR = " + String.format ("%.1f", [new Double (this.vsReading / 10.0)]) + " mm", 1, 0);
x1 = Clazz.doubleToInt (this.Xoffset + this.mainscaleZero + this.msReading * this.msd);
y1 = Clazz.doubleToInt (this.vernier.y) - 25;
y2 = y1 - 20;
g.drawLine (x1, y1, x1, y2);
g.drawLine (x1, y1, x1 - 3, y1 - 3);
g.drawLine (x1, y1, x1 + 3, y1 - 3);
org.physicslab.mechanics.vernier.CommonUtils.outString (g, x1, y2 - 2, "MSR = " + this.msReading + " mm", 1, 2);
}, "java.awt.Graphics2D");
Clazz.defineMethod (c$, "paint", 
function (g) {
Clazz.superCall (this, org.physicslab.mechanics.vernier.VernierPanel, "paint", [g]);
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
dx = me.getX () - this.mx;
this.mx = me.getX ();
this.my = me.getY ();
if ( Boolean.from ((this.vernier.x <= this.Xoffset) & dx < 0).valueOf ()) return;
if ( Boolean.from ((this.vernier.x >= this.mainscaleWidth - this.vernierscaleWidth + this.Xoffset) & dx > 0).valueOf ()) return;
if ((this.vernier.x + dx < this.Xoffset)) {
this.vernier.setX (this.Xoffset);
this.repaint ();
return;
}if ((this.vernier.x + dx >= this.mainscaleWidth - this.vernierscaleWidth + this.Xoffset)) {
this.vernier.setX (this.mainscaleWidth - this.vernierscaleWidth + this.Xoffset);
this.repaint ();
return;
};this.vernier.translate (dx);
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
this.vernier.translate (e.getWheelRotation ());
this.repaint ();
}, "java.awt.event.MouseWheelEvent");
Clazz.defineMethod (c$, "getZeroerror", 
function () {
return this.zeroerror;
});
Clazz.defineMethod (c$, "setZeroerror", 
function (zeroerror) {
this.zeroerror = zeroerror;
if (true) this.vernierscaleZero = this.mainscaleZero + zeroerror;
this.calculateReading ();
this.repaint ();
}, "~N");
c$.$VernierPanel$Vernier$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.path = null;
this.x = 0;
this.y = 0;
this.w = 0;
this.h = 0;
this.t = 0;
Clazz.instantialize (this, arguments);
}, org.physicslab.mechanics.vernier.VernierPanel, "Vernier", null, java.awt.Shape);
Clazz.makeConstructor (c$, 
function (a, b, c, d) {
this.x = a;
this.y = b;
this.w = c;
this.h = d;
this.t = 0.7 * d;
this.createPath ();
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "createPath", 
 function () {
this.path =  new java.awt.geom.GeneralPath ();
this.path.moveTo (this.x, this.y);
this.path.lineTo (this.x, this.y + 3 * this.t);
this.path.lineTo (this.x + 0.3 * this.t, this.y + 2.7 * this.t);
this.path.lineTo (this.x + this.t, this.y + this.t);
this.path.lineTo (this.x + this.w, this.y + this.t);
this.path.lineTo (this.x + this.w, this.y);
this.path.lineTo (this.x, this.y);
var a = this.b$["org.physicslab.mechanics.vernier.VernierPanel"].mainscaleZero;
this.path.moveTo (this.x, this.y - this.b$["org.physicslab.mechanics.vernier.VernierPanel"].mainscaleHeight);
this.path.lineTo (this.x, this.y - this.b$["org.physicslab.mechanics.vernier.VernierPanel"].mainscaleHeight - 1.5 * a);
this.path.quadTo (this.x - 0.8 * a, this.y - this.b$["org.physicslab.mechanics.vernier.VernierPanel"].mainscaleHeight - 0.6 * a, this.x - a, this.y - this.b$["org.physicslab.mechanics.vernier.VernierPanel"].mainscaleHeight);
this.path.lineTo (this.x, this.y - this.b$["org.physicslab.mechanics.vernier.VernierPanel"].mainscaleHeight);
var b = 10;
this.path.moveTo (this.b$["org.physicslab.mechanics.vernier.VernierPanel"].Xoffset + this.b$["org.physicslab.mechanics.vernier.VernierPanel"].mainscaleWidth, this.b$["org.physicslab.mechanics.vernier.VernierPanel"].Yoffset + Clazz.doubleToInt (this.b$["org.physicslab.mechanics.vernier.VernierPanel"].mainscaleHeight / 2) - Clazz.doubleToInt (b / 2));
this.path.lineTo (this.b$["org.physicslab.mechanics.vernier.VernierPanel"].Xoffset + this.b$["org.physicslab.mechanics.vernier.VernierPanel"].mainscaleWidth + this.x - this.b$["org.physicslab.mechanics.vernier.VernierPanel"].Xoffset, this.b$["org.physicslab.mechanics.vernier.VernierPanel"].Yoffset + Clazz.doubleToInt (this.b$["org.physicslab.mechanics.vernier.VernierPanel"].mainscaleHeight / 2) - Clazz.doubleToInt (b / 2));
this.path.lineTo (this.b$["org.physicslab.mechanics.vernier.VernierPanel"].Xoffset + this.b$["org.physicslab.mechanics.vernier.VernierPanel"].mainscaleWidth + this.x - this.b$["org.physicslab.mechanics.vernier.VernierPanel"].Xoffset, this.b$["org.physicslab.mechanics.vernier.VernierPanel"].Yoffset + Clazz.doubleToInt (this.b$["org.physicslab.mechanics.vernier.VernierPanel"].mainscaleHeight / 2) + Clazz.doubleToInt (b / 2));
this.path.lineTo (this.b$["org.physicslab.mechanics.vernier.VernierPanel"].Xoffset + this.b$["org.physicslab.mechanics.vernier.VernierPanel"].mainscaleWidth, this.b$["org.physicslab.mechanics.vernier.VernierPanel"].Yoffset + Clazz.doubleToInt (this.b$["org.physicslab.mechanics.vernier.VernierPanel"].mainscaleHeight / 2) + Clazz.doubleToInt (b / 2));
this.path.lineTo (this.b$["org.physicslab.mechanics.vernier.VernierPanel"].Xoffset + this.b$["org.physicslab.mechanics.vernier.VernierPanel"].mainscaleWidth, this.b$["org.physicslab.mechanics.vernier.VernierPanel"].Yoffset + Clazz.doubleToInt (this.b$["org.physicslab.mechanics.vernier.VernierPanel"].mainscaleHeight / 2) - Clazz.doubleToInt (b / 2));
});
Clazz.defineMethod (c$, "setX", 
function (a) {
this.x = a;
this.createPath ();
}, "~N");
Clazz.defineMethod (c$, "translate", 
function (a) {
if ( Boolean.from ((this.b$["org.physicslab.mechanics.vernier.VernierPanel"].vernier.x <= this.b$["org.physicslab.mechanics.vernier.VernierPanel"].Xoffset) & a <= 0).valueOf ()) return;
if ( Boolean.from ((this.b$["org.physicslab.mechanics.vernier.VernierPanel"].vernier.x >= this.b$["org.physicslab.mechanics.vernier.VernierPanel"].mainscaleWidth - this.b$["org.physicslab.mechanics.vernier.VernierPanel"].vernierscaleWidth + this.b$["org.physicslab.mechanics.vernier.VernierPanel"].Xoffset) & a >= 0).valueOf ()) return;
if ((this.b$["org.physicslab.mechanics.vernier.VernierPanel"].vernier.x + a < this.b$["org.physicslab.mechanics.vernier.VernierPanel"].Xoffset)) {
this.b$["org.physicslab.mechanics.vernier.VernierPanel"].vernier.setX (this.b$["org.physicslab.mechanics.vernier.VernierPanel"].Xoffset);
this.b$["org.physicslab.mechanics.vernier.VernierPanel"].repaint ();
return;
}if ((this.b$["org.physicslab.mechanics.vernier.VernierPanel"].vernier.x + a >= this.b$["org.physicslab.mechanics.vernier.VernierPanel"].mainscaleWidth - this.b$["org.physicslab.mechanics.vernier.VernierPanel"].vernierscaleWidth + this.b$["org.physicslab.mechanics.vernier.VernierPanel"].Xoffset)) {
this.b$["org.physicslab.mechanics.vernier.VernierPanel"].vernier.setX (this.b$["org.physicslab.mechanics.vernier.VernierPanel"].mainscaleWidth - this.b$["org.physicslab.mechanics.vernier.VernierPanel"].vernierscaleWidth + this.b$["org.physicslab.mechanics.vernier.VernierPanel"].Xoffset);
this.b$["org.physicslab.mechanics.vernier.VernierPanel"].repaint ();
return;
};this.x += a;
this.createPath ();
}, "~N");
Clazz.defineMethod (c$, "draw", 
function (a) {
a.setPaint ( new java.awt.Color (229, 229, 229));
a.fill (this.path);
a.setPaint (java.awt.Color.black);
a.draw (this.path);
var b = 8;
var c;
var d;
a.setFont ( new java.awt.Font ("arial", 0, 9));
for (var e = 0; e <= 10; e++) {
c = this.x + this.b$["org.physicslab.mechanics.vernier.VernierPanel"].vernierscaleZero + this.b$["org.physicslab.mechanics.vernier.VernierPanel"].vsd * e;
d = this.y;
a.draw ( new java.awt.geom.Line2D.Double (c, d, c, d + b));
org.physicslab.mechanics.vernier.CommonUtils.outString (a, Clazz.doubleToInt (c), Clazz.doubleToInt (d + b + 2), String.valueOf (e), 1, 0);
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
