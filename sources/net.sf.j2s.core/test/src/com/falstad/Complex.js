(function(){var P$=Clazz.newPackage("com.falstad");
var C$=Clazz.newClass(P$, "Complex");

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.re = 0;
this.im = 0;
this.mag = 0;
this.phase = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$', function () {
C$.$init$.apply(this);
this.re = this.im = this.mag = this.phase = 0;
}, 1);

Clazz.newMeth(C$, 'magSquared', function () {
return this.mag * this.mag;
});

Clazz.newMeth(C$, 'set$com_falstad_Complex', function (c) {
this.re = c.re;
this.im = c.im;
this.mag = c.mag;
this.phase = c.phase;
});

Clazz.newMeth(C$, 'setRe$D', function (r) {
this.re = r;
this.im = 0;
this.setMP();
});

Clazz.newMeth(C$, 'setReIm$D$D', function (r, i) {
this.re = r;
this.im = i;
this.setMP();
return this;
});

Clazz.newMeth(C$, 'setMagPhase$D$D', function (magnitude, phase) {
this.mag = magnitude;
this.phase = phase;
this.re = magnitude * Math.cos(phase);
this.im = magnitude * Math.sin(phase);
});

Clazz.newMeth(C$, 'add$com_falstad_Complex', function (c) {
this.re += c.re;
this.im += c.im;
this.setMP();
});

Clazz.newMeth(C$, 'addRe$D', function (r) {
this.re += r;
this.setMP();
});

Clazz.newMeth(C$, 'addReIm$D$D', function (r, i) {
this.re += r;
this.im += i;
this.setMP();
});

Clazz.newMeth(C$, 'addQuick$D$D', function (r, i) {
this.re += r;
this.im += i;
});

Clazz.newMeth(C$, 'subtract$com_falstad_Complex', function (c) {
this.re -= c.re;
this.im -= c.im;
this.setMP();
});

Clazz.newMeth(C$, 'mult$com_falstad_Complex', function (c) {
this.multReIm$D$D(c.re, c.im);
});

Clazz.newMeth(C$, 'multRe$D', function (c) {
this.re *= c;
this.im *= c;
this.mag *= c;
});

Clazz.newMeth(C$, 'multReIm$D$D', function (r, i) {
this.setReIm$D$D(this.re * r - this.im * i, this.re * i + this.im * r);
});

Clazz.newMeth(C$, 'divide$com_falstad_Complex', function (c) {
var n = c.re * c.re + c.im * c.im;
this.multReIm$D$D(c.re / n, -c.im / n);
});

Clazz.newMeth(C$, 'scaleAdd$D$com_falstad_Complex', function (x, z) {
this.re += z.re * x;
this.im += z.im * x;
this.setMP();
});

Clazz.newMeth(C$, 'scaleAdd2$D$com_falstad_Complex$com_falstad_Complex', function (x, c1, c2) {
this.re += x * (c1.re * c2.re - c1.im * c2.im);
this.im += x * (c1.re * c2.im + c1.im * c2.re);
this.setMP();
});

Clazz.newMeth(C$, 'square', function () {
this.setReIm$D$D(this.re * this.re - this.im * this.im, 2 * this.re * this.im );
});

Clazz.newMeth(C$, 'sqrt', function () {
this.setMagPhase$D$D(Math.sqrt(this.mag), this.phase * 0.5);
});

Clazz.newMeth(C$, 'recip', function () {
var n = this.re * this.re + this.im * this.im;
this.setReIm$D$D(this.re / n, -this.im / n);
});

Clazz.newMeth(C$, 'rotate$D', function (a) {
this.setMagPhase$D$D(this.mag, (this.phase + a) % 6.283185307179586);
});

Clazz.newMeth(C$, 'conjugate', function () {
this.im = -this.im;
this.phase = -this.phase;
});

Clazz.newMeth(C$, 'pow$D', function (p) {
this.phase *= p;
var abs = Math.pow(this.re * this.re + this.im * this.im, p * 0.5);
this.setMagPhase$D$D(abs, this.phase);
});

Clazz.newMeth(C$, 'toString', function () {
return new Double(this.re).toString() + "+" + new Double(this.im).toString() + "i" ;
});

Clazz.newMeth(C$, 'setMP', function () {
this.mag = Math.sqrt(this.re * this.re + this.im * this.im);
this.phase = Math.atan2(this.im, this.re);
});

Clazz.newMeth(C$, 'log', function () {
this.setReIm$D$D(java.lang.Math.log(this.re * this.re + this.im * this.im), java.lang.Math.atan2(this.im, this.re));
});

Clazz.newMeth(C$, 'arcsin', function () {
var z2 = Clazz.new_(C$);
z2.set$com_falstad_Complex(this);
z2.square();
z2.multRe$D(-1);
z2.addRe$D(1);
z2.pow$D(0.5);
this.multReIm$D$D(0, 1);
this.add$com_falstad_Complex(z2);
this.log();
this.multReIm$D$D(0, -1);
});
})();
//Created 2017-12-17 19:28:01
