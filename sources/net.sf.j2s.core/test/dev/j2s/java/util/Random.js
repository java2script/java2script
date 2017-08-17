Clazz.load (null, "java.util.Random", ["java.lang.IllegalArgumentException"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "Random", null, java.io.Serializable);

Clazz.newMethod$(C$, '$init$', function () {
this.haveNextNextGaussian = false;
this.seed = 0;
this.nextNextGaussian = 0;
}, 1);

Clazz.newMethod$(C$, 'construct', function () {
C$.$init$.apply(this);
this.setSeed$J (System.currentTimeMillis ());
}, 1);

Clazz.newMethod$(C$, 'construct$J', function (seed) {
C$.$init$.apply(this);
this.setSeed$J (seed);
}, 1);

Clazz.newMethod$(C$, 'next$I', function (bits) {
this.seed = (this.seed * 25214903917 + 0xb) & (281474976710655);
return (this.seed >>> (48 - bits));
});

Clazz.newMethod$(C$, 'nextBoolean', function () {
return Math.random () > 0.5;
});

Clazz.newMethod$(C$, 'nextBytes$BA', function (buf) {
for (var i = 0; i < bytes.length; i++) {
bytes[i] = Math.round (0x100 * Math.random ());
}
});

Clazz.newMethod$(C$, 'nextDouble', function () {
return Math.random ();
});

Clazz.newMethod$(C$, 'nextFloat', function () {
return Math.random ();
});

Clazz.newMethod$(C$, 'nextGaussian', function () {
if (this.haveNextNextGaussian) {
this.haveNextNextGaussian = false;
return this.nextNextGaussian;
}var v1;
var v2;
var s;
do {
v1 = 2 * this.nextDouble () - 1;
v2 = 2 * this.nextDouble () - 1;
s = v1 * v1 + v2 * v2;
} while (s >= 1);
var norm = Math.sqrt (-2 * Math.log (s) / s);
this.nextNextGaussian = v2 * norm;
this.haveNextNextGaussian = true;
return v1 * norm;
});

Clazz.newMethod$(C$, 'nextInt', function () {
return Math.ceil (0xffff * Math.random ()) - 0x8000;
});

Clazz.newMethod$(C$, 'nextInt$I', function (n) {
if (n > 0) {
if ((n & -n) == n) {
return ((n * this.next$I (31)) >> 31);
}var bits;
var val;
do {
bits = this.next$I (31);
val = bits % n;
} while (bits - val + (n - 1) < 0);
return val;
}throw Clazz.$new(IllegalArgumentException.construct,[]);
});

Clazz.newMethod$(C$, 'nextLong', function () {
return Math.ceil (0xffffffff * Math.random ()) - 0x80000000;
});

Clazz.newMethod$(C$, 'setSeed$J', function (seed) {
this.seed = (seed ^ 25214903917) & (281474976710655);
this.haveNextNextGaussian = false;
});
Clazz.defineStatics (C$,
"multiplier", 0x5deece66d);
})()
});

//Created 2017-08-17 10:33:18
