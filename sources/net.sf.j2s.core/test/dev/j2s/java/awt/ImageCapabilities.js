Clazz.declarePackage ("java.awt");
Clazz.load (null, "java.awt.ImageCapabilities", ["java.lang.InternalError"], function () {
c$ = Clazz.decorateAsClass (function () {
this.accelerated = false;
Clazz.instantialize (this, arguments);
}, java.awt, "ImageCapabilities", null, Cloneable);
Clazz.makeConstructor (c$, 
function (accelerated) {
this.accelerated = accelerated;
}, "~B");
Clazz.defineMethod (c$, "isAccelerated", 
function () {
return this.accelerated;
});
Clazz.defineMethod (c$, "isTrueVolatile", 
function () {
return false;
});
Clazz.defineMethod (c$, "clone", 
function () {
try {
return Clazz.superCall (this, java.awt.ImageCapabilities, "clone", []);
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
throw  new InternalError ();
} else {
throw e;
}
}
});
});
