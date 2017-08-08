Clazz.declarePackage ("java.awt");
c$ = Clazz.decorateAsClass (function () {
this.accelerationPriority = .5;
Clazz.instantialize (this, arguments);
}, java.awt, "Image");
Clazz.defineMethod (c$, "getScaledInstance", 
function (width, height, hints) {
return null;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "flush", 
function () {
});
Clazz.defineMethod (c$, "setAccelerationPriority", 
function (priority) {
}, "~N");
Clazz.defineMethod (c$, "getAccelerationPriority", 
function () {
return this.accelerationPriority;
});
c$.UndefinedProperty = c$.prototype.UndefinedProperty =  new Clazz._O ();
Clazz.defineStatics (c$,
"SCALE_DEFAULT", 1,
"SCALE_FAST", 2,
"SCALE_SMOOTH", 4,
"SCALE_REPLICATE", 8,
"SCALE_AREA_AVERAGING", 16);
