Clazz.declarePackage ("org.ultrastudio.boids");
Clazz.load (["java.awt.geom.Point2D"], "org.ultrastudio.boids.Boid", ["org.ultrastudio.boids.Constants"], function () {
c$ = Clazz.decorateAsClass (function () {
this.location = null;
this.speed = null;
this.flock = null;
Clazz.instantialize (this, arguments);
}, org.ultrastudio.boids, "Boid");
Clazz.prepareFields (c$, function () {
this.location =  new java.awt.geom.Point2D.Double (100 * Math.random (), 100 * Math.random ());
this.speed =  new java.awt.geom.Point2D.Double (Math.random (), Math.random ());
});
Clazz.defineMethod (c$, "moveAhead", 
function (time) {
this.location.x += this.speed.x * time * org.ultrastudio.boids.Constants.stepTime;
this.location.y += this.speed.y * time * org.ultrastudio.boids.Constants.stepTime;
if (this.flock.cooperative) {
if (!this.flock.scared) this.matchSpeed (time);
this.keepSpeed (time);
this.flyTowardsCenterOfMass (time);
}this.keepAway (time);
this.bounceFromWalls ();
}, "~N");
Clazz.defineMethod (c$, "matchSpeed", 
function (time) {
var x = 0;
var y = 0;
var n = this.flock.size () - 1;
for (var boid, $boid = this.flock.iterator (); $boid.hasNext () && ((boid = $boid.next ()) || true);) if (boid !== this) {
x += boid.speed.x;
y += boid.speed.y;
}
x /= n;
y /= n;
var vx = x - this.speed.x;
var vy = y - this.speed.y;
this.speed.x += vx * org.ultrastudio.boids.Constants.speedAdjust * time;
this.speed.y += vy * org.ultrastudio.boids.Constants.speedAdjust * time;
}, "~N");
Clazz.defineMethod (c$, "flyTowardsCenterOfMass", 
function (time) {
var x = 0;
var y = 0;
var n = this.flock.size () - 1;
for (var boid, $boid = this.flock.iterator (); $boid.hasNext () && ((boid = $boid.next ()) || true);) if (boid !== this) {
x += boid.location.x;
y += boid.location.y;
}
x /= n;
y /= n;
var vx = x - this.location.x;
var vy = y - this.location.y;
if (this.flock.scared) {
vx = -vx;
vy = -vy;
}this.move (time, vx, vy, org.ultrastudio.boids.Constants.holdFlockCenter);
}, "~N");
Clazz.defineMethod (c$, "keepSpeed", 
function (time) {
var v = Math.sqrt (this.speed.x * this.speed.x + this.speed.y * this.speed.y);
var r = org.ultrastudio.boids.Constants.minSpeed - v;
if (r > 0 && v < org.ultrastudio.boids.Constants.maxSpeed) r = 1 + org.ultrastudio.boids.Constants.speedAdjust;
 else r = 1 - org.ultrastudio.boids.Constants.speedAdjust;
this.speed.x *= r;
this.speed.y *= r;
}, "~N");
Clazz.defineMethod (c$, "move", 
 function (time, vx, vy, weight) {
this.location.x += vx * weight * time;
this.location.y += vy * weight * time;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "keepAway", 
function (time) {
var vx = 0;
var vy = 0;
for (var boid, $boid = this.flock.iterator (); $boid.hasNext () && ((boid = $boid.next ()) || true);) {
var distance = boid.location.distance (this.location);
if (boid !== this && distance < org.ultrastudio.boids.Constants.keepAwayDistance) {
if (distance < 1) distance = 1;
var s = 1 / distance;
vx += s * (this.location.x - boid.location.x);
vy += s * (this.location.y - boid.location.y);
}}
this.move (time, vx, vy, org.ultrastudio.boids.Constants.avoidNeibourthood);
}, "~N");
Clazz.defineMethod (c$, "bounceFromWalls", 
function () {
if (this.location.x < org.ultrastudio.boids.Constants.keepAwayDistance) {
this.speed.x += org.ultrastudio.boids.Constants.avoidNeibourthood;
}if (this.location.y < org.ultrastudio.boids.Constants.keepAwayDistance) {
this.speed.y += org.ultrastudio.boids.Constants.avoidNeibourthood;
}if (this.location.x > this.flock.$$size.width - org.ultrastudio.boids.Constants.keepAwayDistance) {
this.speed.x -= org.ultrastudio.boids.Constants.avoidNeibourthood;
}if (this.location.y > this.flock.$$size.height - org.ultrastudio.boids.Constants.keepAwayDistance) {
this.speed.y -= org.ultrastudio.boids.Constants.avoidNeibourthood;
}if (this.location.x < 0) {
this.location.x = 0;
this.speed.x = -this.speed.x;
}if (this.location.y < 0) {
this.location.y = 0;
this.speed.y = -this.speed.y;
}if (this.location.x > this.flock.$$size.width) {
this.location.x = this.flock.$$size.width;
this.speed.x = -this.speed.x;
}if (this.location.y > this.flock.$$size.height) {
this.location.y = this.flock.$$size.height;
this.speed.y = -this.speed.y;
}});
});
