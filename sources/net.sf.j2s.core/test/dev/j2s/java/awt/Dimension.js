Clazz.declarePackage ("java.awt");
Clazz.load (["java.awt.geom.Dimension2D"], "java.awt.Dimension", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.width = 0;
this.height = 0;
Clazz.instantialize (this, arguments);
}, java.awt, "Dimension", java.awt.geom.Dimension2D);
Clazz.makeConstructor (c$, 
function () {
this.construct (0, 0);
});
Clazz.makeConstructor (c$, 
function (d) {
this.construct (d.width, d.height);
}, "java.awt.Dimension");
Clazz.makeConstructor (c$, 
function (width, height) {
Clazz.superConstructor (this, java.awt.Dimension, []);
this.width = width;
this.height = height;
}, "~N,~N");
Clazz.overrideMethod (c$, "getWidth", 
function () {
return this.width;
});
Clazz.overrideMethod (c$, "getHeight", 
function () {
return this.height;
});
Clazz.defineMethod (c$, "getSize", 
function () {
return  new java.awt.Dimension (this.width, this.height);
});
Clazz.defineMethod (c$, "setSize", 
function (d) {
this.width = d.width;
this.height = d.height;
}, "java.awt.Dimension");
Clazz.defineMethod (c$, "setSize", 
function (width, height) {
this.width = Clazz.doubleToInt (Math.ceil (width));
this.height = Clazz.doubleToInt (Math.ceil (height));
}, "~N,~N");
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (Clazz.instanceOf (obj, java.awt.Dimension)) {
var d = obj;
return (this.width == d.width) && (this.height == d.height);
}return false;
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
var sum = this.width + this.height;
return Clazz.doubleToInt (sum * (sum + 1) / 2) + this.width;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getClass ().getName () + "[width=" + this.width + ",height=" + this.height + "]";
});
});
