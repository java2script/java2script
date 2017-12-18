(function(){var P$=Clazz.newPackage("com.falstad");
var C$=Clazz.newClass(P$, "FFT");
var p$=C$.prototype;

Clazz.newMeth(C$, '$init0$', function () {
var c;if((c = C$.superclazz) && (c = c.$init0$))c.apply(this);
this.wtabf = null;
this.wtabi = null;
this.size = 0;
}, 1);

Clazz.newMeth(C$, '$init$', function () {
}, 1);

Clazz.newMeth(C$, 'c$$I', function (size) {
C$.$init$.apply(this);
this.size = size;
if ((size & (size - 1)) != 0) throw Clazz.new_(Clazz.load('java.lang.ArithmeticException').c$$S,["FFT size must be power of two"]);
p$.calcWTable.apply(this, []);
}, 1);

Clazz.newMeth(C$, 'getSize', function () {
return this.size;
});

Clazz.newMeth(C$, 'transform$DA', function (data) {
this.transform$DA$Z(data, false);
});

Clazz.newMeth(C$, 'transform$DA$Z', function (data, isInverse) {
var i;
var j = 0;
var size2 = this.size * 2;
var q;
var bit;
for (i = 0; i != size2; i = i+(2)) {
if (i > j) {
q = data[i];
data[i] = data[j];
data[j] = q;
q = data[i + 1];
data[i + 1] = data[j + 1];
data[j + 1] = q;
}bit = this.size;
while ((bit & j) != 0){
j = j&(~bit);
bit = bit>>(1);
}
j = j|(bit);
}
var tabskip = this.size << 1;
var wtab = (isInverse) ? this.wtabi : this.wtabf;
var skip1;
var skip2;
var ix;
var j2;
var wr;
var wi;
var d1r;
var d1i;
var d2r;
var d2i;
var d2wr;
var d2wi;
for (i = 0; i != size2; i = i+(4)) {
d1r = data[i];
d1i = data[i + 1];
d2r = data[i + 2];
d2i = data[i + 3];
data[i] = d1r + d2r;
data[i + 1] = d1i + d2i;
data[i + 2] = d1r - d2r;
data[i + 3] = d1i - d2i;
}
tabskip = tabskip>>(1);
var imult = (isInverse) ? -1 : 1;
for (i = 0; i != size2; i = i+(8)) {
d1r = data[i];
d1i = data[i + 1];
d2r = data[i + 4];
d2i = data[i + 5];
data[i] = d1r + d2r;
data[i + 1] = d1i + d2i;
data[i + 4] = d1r - d2r;
data[i + 5] = d1i - d2i;
d1r = data[i + 2];
d1i = data[i + 3];
d2r = data[i + 6] * imult;
d2i = data[i + 7] * imult;
data[i + 2] = d1r - d2i;
data[i + 3] = d1i + d2r;
data[i + 6] = d1r + d2i;
data[i + 7] = d1i - d2r;
}
tabskip = tabskip>>(1);
for (skip1 = 16; skip1 <= size2; skip1 = skip1<<(1)) {
skip2 = skip1 >> 1;
tabskip = tabskip>>(1);
for (i = 0; i < size2; i = i+(skip1)) {
ix = 0;
for (j = i; j != i + skip2; j = j+(2), ix = ix+(tabskip)) {
wr = wtab[ix];
wi = wtab[ix + 1];
d1r = data[j];
d1i = data[j + 1];
j2 = j + skip2;
d2r = data[j2];
d2i = data[j2 + 1];
d2wr = d2r * wr - d2i * wi;
d2wi = d2r * wi + d2i * wr;
data[j] = d1r + d2wr;
data[j + 1] = d1i + d2wi;
data[j2] = d1r - d2wr;
data[j2 + 1] = d1i - d2wi;
}
}
}
});

Clazz.newMeth(C$, 'calcWTable', function () {
this.wtabf = Clazz.array(Double.TYPE, [this.size]);
this.wtabi = Clazz.array(Double.TYPE, [this.size]);
var i;
for (i = 0; i != this.size; i = i+(2)) {
var th = 3.141592653589793 * i / this.size;
this.wtabf[i] = Math.cos(th);
this.wtabf[i + 1] = Math.sin(th);
this.wtabi[i] = this.wtabf[i];
this.wtabi[i + 1] = -this.wtabf[i + 1];
}
});

Clazz.newMeth(C$);
})();
//Created 2017-12-17 19:28:05
