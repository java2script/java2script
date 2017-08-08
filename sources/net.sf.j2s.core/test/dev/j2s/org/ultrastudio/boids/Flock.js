Clazz.declarePackage ("org.ultrastudio.boids");
Clazz.load (["java.util.ArrayList", "java.awt.geom.Rectangle2D"], "org.ultrastudio.boids.Flock", ["org.ultrastudio.boids.Boid"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$$size = null;
this.scared = false;
this.cooperative = true;
Clazz.instantialize (this, arguments);
}, org.ultrastudio.boids, "Flock", java.util.ArrayList);
Clazz.prepareFields (c$, function () {
this.$$size =  new java.awt.geom.Rectangle2D.Double ();
});
Clazz.defineMethod (c$, "iteration", 
function (time) {
for (var boid, $boid = this.iterator (); $boid.hasNext () && ((boid = $boid.next ()) || true);) boid.moveAhead (time);

}, "~N");
Clazz.defineMethod (c$, "setScared", 
function (scared) {
this.scared = scared;
}, "~B");
Clazz.defineMethod (c$, "setCooperative", 
function (cooperative) {
this.cooperative = cooperative;
}, "~B");
Clazz.defineMethod (c$, "multiply", 
function () {
for (var i = this.size (); --i >= 0; ) this.addBoid ();

});
Clazz.defineMethod (c$, "addBoid", 
function () {
var boid =  new org.ultrastudio.boids.Boid ();
boid.flock = this;
this.add (boid);
});
});
