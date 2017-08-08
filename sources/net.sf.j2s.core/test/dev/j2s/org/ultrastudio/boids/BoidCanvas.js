Clazz.declarePackage ("org.ultrastudio.boids");
Clazz.load (["javax.swing.JPanel"], "org.ultrastudio.boids.BoidCanvas", ["java.awt.Color"], function () {
c$ = Clazz.decorateAsClass (function () {
this.flock = null;
this.xx = null;
this.yy = null;
Clazz.instantialize (this, arguments);
}, org.ultrastudio.boids, "BoidCanvas", javax.swing.JPanel);
Clazz.prepareFields (c$, function () {
this.xx =  Clazz.newIntArray (3, 0);
this.yy =  Clazz.newIntArray (3, 0);
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.ultrastudio.boids.BoidCanvas, []);
this.setBackground (java.awt.Color.WHITE);
this.setForeground (java.awt.Color.BLACK);
this.setOpaque (true);
});
Clazz.overrideMethod (c$, "paintComponent", 
function (gg) {
var g = gg;
g.setColor (this.getBackground ());
g.fillRect (0, 0, this.getWidth (), this.getHeight ());
g.setColor (this.getForeground ());
for (var b, $b = this.flock.iterator (); $b.hasNext () && ((b = $b.next ()) || true);) {
var x = Clazz.doubleToInt (b.location.x);
var y = Clazz.doubleToInt (b.location.y);
var vr = Math.sqrt (b.speed.x * b.speed.x + b.speed.y * b.speed.y);
var scale = 10 / vr;
var vx = Clazz.doubleToInt (b.speed.x * scale);
var vy = Clazz.doubleToInt (b.speed.y * scale);
g.setColor (java.awt.Color.YELLOW);
this.xx[0] = x - vy;
this.xx[1] = x + vy;
this.xx[2] = x + vx;
this.yy[0] = y + vx;
this.yy[1] = y - vx;
this.yy[2] = y + vy;
g.fillPolygon (this.xx, this.yy, 3);
g.setColor (java.awt.Color.BLACK);
g.drawPolygon (this.xx, this.yy, 3);
}
}, "java.awt.Graphics");
});
