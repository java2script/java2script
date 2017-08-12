Clazz.load (null, "java.lang.StrictMath", ["java.lang.Double", "$.Float"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang, "StrictMath");

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'construct', function () {
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'abs$D', function (d) {
return Math.abs (d);
}, 1);

Clazz.newMethod$ (C$, 'acos$D', function (d) {
return Math.acos (d);
}, 1);

Clazz.newMethod$ (C$, 'asin$D', function (d) {
return Math.asin (d);
}, 1);

Clazz.newMethod$ (C$, 'atan$D', function (d) {
return Math.atan (d);
}, 1);

Clazz.newMethod$ (C$, 'atan2$D$D', function (d1, d2) {
return Math.atan2 (d1, d2);
}, 1);

Clazz.newMethod$ (C$, 'ceil$D', function (d) {
return Math.ceil (d);
}, 1);

Clazz.newMethod$ (C$, 'cosh$D', function (d) {
return Math.cosh (d);
}, 1);

Clazz.newMethod$ (C$, 'cos$D', function (d) {
return Math.cos (d);
}, 1);

Clazz.newMethod$ (C$, 'exp$D', function (d) {
return Math.exp (d);
}, 1);

Clazz.newMethod$ (C$, 'floor$D', function (d) {
return Math.floor (d);
}, 1);

Clazz.newMethod$ (C$, 'log$D', function (d) {
return Math.log (d);
}, 1);

Clazz.newMethod$ (C$, 'log10$D', function (d) {
return Math.log10 (d);
}, 1);

Clazz.newMethod$ (C$, 'max$D$D', function (d1, d2) {
return Math.max (d1, d2);
}, 1);

Clazz.newMethod$ (C$, 'min$D$D', function (d1, d2) {
return Math.min (d1, d2);
}, 1);

Clazz.newMethod$ (C$, 'pow$D$D', function (d1, d2) {
return Math.pow (d1, d2);
}, 1);

Clazz.newMethod$ (C$, 'random', function () {
return Math.random ();
}, 1);

Clazz.newMethod$ (C$, 'rint$D', function (d) {
return Math.round (d);
}, 1);

Clazz.newMethod$ (C$, 'round$D', function (d) {
return Math.round (d);
}, 1);

Clazz.newMethod$ (C$, 'signum$D', function (d) {
if (Double.isNaN (d)) {
return NaN;
}var sig = d;
if (d > 0) {
sig = 1.0;
} else if (d < 0) {
sig = -1.0;
}return sig;
}, 1);

Clazz.newMethod$ (C$, 'signum$F', function (f) {
if (Float.isNaN (f)) {
return NaN;
}var sig = f;
if (f > 0) {
sig = 1.0;
} else if (f < 0) {
sig = -1.0;
}return sig;
}, 1);

Clazz.newMethod$ (C$, 'sinh$D', function (d) {
return Math.sinh (d);
}, 1);

Clazz.newMethod$ (C$, 'sin$D', function (d) {
return Math.sin (d);
}, 1);

Clazz.newMethod$ (C$, 'sqrt$D', function (d) {
return Math.sqrt (d);
}, 1);

Clazz.newMethod$ (C$, 'tan$D', function (d) {
return Math.tan (d);
}, 1);

Clazz.newMethod$ (C$, 'tanh$D', function (d) {
return Math.tanh (d);
}, 1);

Clazz.newMethod$ (C$, 'toDegrees$D', function (angrad) {
return angrad * 180 / 3.141592653589793;
}, 1);

Clazz.newMethod$ (C$, 'toRadians$D', function (angdeg) {
return angdeg / 180 * 3.141592653589793;
}, 1);
Clazz.defineStatics (C$,
"E", 2.718281828459045,
"PI", 3.141592653589793,
"$random", null);
})()
});

//Created 2017-08-12 07:32:16
