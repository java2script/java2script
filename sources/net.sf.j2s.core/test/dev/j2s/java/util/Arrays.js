Clazz.load (["java.util.AbstractList", "$.RandomAccess"], "java.util.Arrays", ["java.lang.ArrayIndexOutOfBoundsException", "$.IllegalArgumentException", "$.NullPointerException", "$.StringBuilder", "java.util.HashSet"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "Arrays");

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'construct', function () {
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'sort$JA', function (a) {
java.util.Arrays.sort1$JA$I$I (a, 0, a.length);
}, 1);

Clazz.newMethod$(C$, 'sort$JA$I$I', function (a, fromIndex, toIndex) {
java.util.Arrays.rangeCheck$I$I$I (a.length, fromIndex, toIndex);
java.util.Arrays.sort1$JA$I$I (a, fromIndex, toIndex - fromIndex);
}, 1);

Clazz.newMethod$(C$, 'sort$IA', function (a) {
java.util.Arrays.sort1$IA$I$I (a, 0, a.length);
}, 1);

Clazz.newMethod$(C$, 'sort$IA$I$I', function (a, fromIndex, toIndex) {
java.util.Arrays.rangeCheck$I$I$I (a.length, fromIndex, toIndex);
java.util.Arrays.sort1$IA$I$I (a, fromIndex, toIndex - fromIndex);
}, 1);

Clazz.newMethod$(C$, 'sort$HA', function (a) {
java.util.Arrays.sort1$HA$I$I (a, 0, a.length);
}, 1);

Clazz.newMethod$(C$, 'sort$HA$I$I', function (a, fromIndex, toIndex) {
java.util.Arrays.rangeCheck$I$I$I (a.length, fromIndex, toIndex);
java.util.Arrays.sort1$HA$I$I (a, fromIndex, toIndex - fromIndex);
}, 1);

Clazz.newMethod$(C$, 'sort$CA', function (a) {
java.util.Arrays.sort1$CA$I$I (a, 0, a.length);
}, 1);

Clazz.newMethod$(C$, 'sort$CA$I$I', function (a, fromIndex, toIndex) {
java.util.Arrays.rangeCheck$I$I$I (a.length, fromIndex, toIndex);
java.util.Arrays.sort1$CA$I$I (a, fromIndex, toIndex - fromIndex);
}, 1);

Clazz.newMethod$(C$, 'sort$BA', function (a) {
java.util.Arrays.sort1$BA$I$I (a, 0, a.length);
}, 1);

Clazz.newMethod$(C$, 'sort$BA$I$I', function (a, fromIndex, toIndex) {
java.util.Arrays.rangeCheck$I$I$I (a.length, fromIndex, toIndex);
java.util.Arrays.sort1$BA$I$I (a, fromIndex, toIndex - fromIndex);
}, 1);

Clazz.newMethod$(C$, 'sort$DA', function (a) {
java.util.Arrays.sort2$DA$I$I (a, 0, a.length);
}, 1);

Clazz.newMethod$(C$, 'sort$DA$I$I', function (a, fromIndex, toIndex) {
java.util.Arrays.rangeCheck$I$I$I (a.length, fromIndex, toIndex);
java.util.Arrays.sort2$DA$I$I (a, fromIndex, toIndex);
}, 1);

Clazz.newMethod$(C$, 'sort$FA', function (a) {
java.util.Arrays.sort2$FA$I$I (a, 0, a.length);
}, 1);

Clazz.newMethod$(C$, 'sort$FA$I$I', function (a, fromIndex, toIndex) {
java.util.Arrays.rangeCheck$I$I$I (a.length, fromIndex, toIndex);
java.util.Arrays.sort2$FA$I$I (a, fromIndex, toIndex);
}, 1);

Clazz.newMethod$(C$, 'sort2$DA$I$I', function (a, fromIndex, toIndex) {
var NEG_ZERO_BITS = Double.doubleToLongBits (-0.0);
var numNegZeros = 0;
var i = fromIndex;
var n = toIndex;
while (i < n) {
if (a[i] != a[i]) {
java.util.Arrays.swap$DA$I$I (a, i, --n);
} else {
if (a[i] == 0 && Double.doubleToLongBits (a[i]) == NEG_ZERO_BITS) {
a[i] = 0.0;
numNegZeros++;
}i++;
}}
java.util.Arrays.sort1$DA$I$I (a, fromIndex, n - fromIndex);
if (numNegZeros != 0) {
var j = java.util.Arrays.binarySearch0$DA$I$I$D (a, fromIndex, n, 0.0);
do {
j--;
} while (j >= fromIndex && a[j] == 0.0);
for (var k = 0; k < numNegZeros; k++) a[++j] = -0.0;

}}, 1);

Clazz.newMethod$(C$, 'sort2$FA$I$I', function (a, fromIndex, toIndex) {
var NEG_ZERO_BITS = Float.floatToIntBits (-0.0);
var numNegZeros = 0;
var i = fromIndex;
var n = toIndex;
while (i < n) {
if (a[i] != a[i]) {
java.util.Arrays.swap$FA$I$I (a, i, --n);
} else {
if (a[i] == 0 && Float.floatToIntBits (a[i]) == NEG_ZERO_BITS) {
a[i] = 0.0;
numNegZeros++;
}i++;
}}
java.util.Arrays.sort1$FA$I$I (a, fromIndex, n - fromIndex);
if (numNegZeros != 0) {
var j = java.util.Arrays.binarySearch0$FA$I$I$F (a, fromIndex, n, 0.0);
do {
j--;
} while (j >= fromIndex && a[j] == 0.0);
for (var k = 0; k < numNegZeros; k++) a[++j] = -0.0;

}}, 1);

Clazz.newMethod$(C$, 'sort1$JA$I$I', function (x, off, len) {
if (len < 7) {
for (var i = off; i < len + off; i++) for (var j = i; j > off && x[j - 1] > x[j]; j--) java.util.Arrays.swap$JA$I$I (x, j, j - 1);


return;
}var m = off + (len >> 1);
if (len > 7) {
var l = off;
var n = off + len - 1;
if (len > 40) {
var s = Clazz.doubleToInt (len / 8);
l = java.util.Arrays.med3$JA$I$I$I (x, l, l + s, l + 2 * s);
m = java.util.Arrays.med3$JA$I$I$I (x, m - s, m, m + s);
n = java.util.Arrays.med3$JA$I$I$I (x, n - 2 * s, n - s, n);
}m = java.util.Arrays.med3$JA$I$I$I (x, l, m, n);
}var v = x[m];
var a = off;
var b = a;
var c = off + len - 1;
var d = c;
while (true) {
while (b <= c && x[b] <= v) {
if (x[b] == v) java.util.Arrays.swap$JA$I$I (x, a++, b);
b++;
}
while (c >= b && x[c] >= v) {
if (x[c] == v) java.util.Arrays.swap$JA$I$I (x, c, d--);
c--;
}
if (b > c) break;
java.util.Arrays.swap$JA$I$I (x, b++, c--);
}
var s;
var n = off + len;
s = Math.min (a - off, b - a);
java.util.Arrays.vecswap$JA$I$I$I (x, off, b - s, s);
s = Math.min (d - c, n - d - 1);
java.util.Arrays.vecswap$JA$I$I$I (x, b, n - s, s);
if ((s = b - a) > 1) java.util.Arrays.sort1$JA$I$I (x, off, s);
if ((s = d - c) > 1) java.util.Arrays.sort1$JA$I$I (x, n - s, s);
}, 1);

Clazz.newMethod$(C$, 'swap$JA$I$I', function (x, a, b) {
var t = x[a];
x[a] = x[b];
x[b] = t;
}, 1);

Clazz.newMethod$(C$, 'vecswap$JA$I$I$I', function (x, a, b, n) {
for (var i = 0; i < n; i++, a++, b++) java.util.Arrays.swap$JA$I$I (x, a, b);

}, 1);

Clazz.newMethod$(C$, 'med3$JA$I$I$I', function (x, a, b, c) {
return (x[a] < x[b] ? (x[b] < x[c] ? b : x[a] < x[c] ? c : a) : (x[b] > x[c] ? b : x[a] > x[c] ? c : a));
}, 1);

Clazz.newMethod$(C$, 'sort1$IA$I$I', function (x, off, len) {
if (len < 7) {
for (var i = off; i < len + off; i++) for (var j = i; j > off && x[j - 1] > x[j]; j--) java.util.Arrays.swap$IA$I$I (x, j, j - 1);


return;
}var m = off + (len >> 1);
if (len > 7) {
var l = off;
var n = off + len - 1;
if (len > 40) {
var s = Clazz.doubleToInt (len / 8);
l = java.util.Arrays.med3$IA$I$I$I (x, l, l + s, l + 2 * s);
m = java.util.Arrays.med3$IA$I$I$I (x, m - s, m, m + s);
n = java.util.Arrays.med3$IA$I$I$I (x, n - 2 * s, n - s, n);
}m = java.util.Arrays.med3$IA$I$I$I (x, l, m, n);
}var v = x[m];
var a = off;
var b = a;
var c = off + len - 1;
var d = c;
while (true) {
while (b <= c && x[b] <= v) {
if (x[b] == v) java.util.Arrays.swap$IA$I$I (x, a++, b);
b++;
}
while (c >= b && x[c] >= v) {
if (x[c] == v) java.util.Arrays.swap$IA$I$I (x, c, d--);
c--;
}
if (b > c) break;
java.util.Arrays.swap$IA$I$I (x, b++, c--);
}
var s;
var n = off + len;
s = Math.min (a - off, b - a);
java.util.Arrays.vecswap$IA$I$I$I (x, off, b - s, s);
s = Math.min (d - c, n - d - 1);
java.util.Arrays.vecswap$IA$I$I$I (x, b, n - s, s);
if ((s = b - a) > 1) java.util.Arrays.sort1$IA$I$I (x, off, s);
if ((s = d - c) > 1) java.util.Arrays.sort1$IA$I$I (x, n - s, s);
}, 1);

Clazz.newMethod$(C$, 'swap$IA$I$I', function (x, a, b) {
var t = x[a];
x[a] = x[b];
x[b] = t;
}, 1);

Clazz.newMethod$(C$, 'vecswap$IA$I$I$I', function (x, a, b, n) {
for (var i = 0; i < n; i++, a++, b++) java.util.Arrays.swap$IA$I$I (x, a, b);

}, 1);

Clazz.newMethod$(C$, 'med3$IA$I$I$I', function (x, a, b, c) {
return (x[a] < x[b] ? (x[b] < x[c] ? b : x[a] < x[c] ? c : a) : (x[b] > x[c] ? b : x[a] > x[c] ? c : a));
}, 1);

Clazz.newMethod$(C$, 'sort1$HA$I$I', function (x, off, len) {
if (len < 7) {
for (var i = off; i < len + off; i++) for (var j = i; j > off && x[j - 1] > x[j]; j--) java.util.Arrays.swap$HA$I$I (x, j, j - 1);


return;
}var m = off + (len >> 1);
if (len > 7) {
var l = off;
var n = off + len - 1;
if (len > 40) {
var s = Clazz.doubleToInt (len / 8);
l = java.util.Arrays.med3$HA$I$I$I (x, l, l + s, l + 2 * s);
m = java.util.Arrays.med3$HA$I$I$I (x, m - s, m, m + s);
n = java.util.Arrays.med3$HA$I$I$I (x, n - 2 * s, n - s, n);
}m = java.util.Arrays.med3$HA$I$I$I (x, l, m, n);
}var v = x[m];
var a = off;
var b = a;
var c = off + len - 1;
var d = c;
while (true) {
while (b <= c && x[b] <= v) {
if (x[b] == v) java.util.Arrays.swap$HA$I$I (x, a++, b);
b++;
}
while (c >= b && x[c] >= v) {
if (x[c] == v) java.util.Arrays.swap$HA$I$I (x, c, d--);
c--;
}
if (b > c) break;
java.util.Arrays.swap$HA$I$I (x, b++, c--);
}
var s;
var n = off + len;
s = Math.min (a - off, b - a);
java.util.Arrays.vecswap$HA$I$I$I (x, off, b - s, s);
s = Math.min (d - c, n - d - 1);
java.util.Arrays.vecswap$HA$I$I$I (x, b, n - s, s);
if ((s = b - a) > 1) java.util.Arrays.sort1$HA$I$I (x, off, s);
if ((s = d - c) > 1) java.util.Arrays.sort1$HA$I$I (x, n - s, s);
}, 1);

Clazz.newMethod$(C$, 'swap$HA$I$I', function (x, a, b) {
var t = x[a];
x[a] = x[b];
x[b] = t;
}, 1);

Clazz.newMethod$(C$, 'vecswap$HA$I$I$I', function (x, a, b, n) {
for (var i = 0; i < n; i++, a++, b++) java.util.Arrays.swap$HA$I$I (x, a, b);

}, 1);

Clazz.newMethod$(C$, 'med3$HA$I$I$I', function (x, a, b, c) {
return (x[a] < x[b] ? (x[b] < x[c] ? b : x[a] < x[c] ? c : a) : (x[b] > x[c] ? b : x[a] > x[c] ? c : a));
}, 1);

Clazz.newMethod$(C$, 'sort1$CA$I$I', function (x, off, len) {
if (len < 7) {
for (var i = off; i < len + off; i++) for (var j = i; j > off && x[j - 1] > x[j]; j--) java.util.Arrays.swap$CA$I$I (x, j, j - 1);


return;
}var m = off + (len >> 1);
if (len > 7) {
var l = off;
var n = off + len - 1;
if (len > 40) {
var s = Clazz.doubleToInt (len / 8);
l = java.util.Arrays.med3$CA$I$I$I (x, l, l + s, l + 2 * s);
m = java.util.Arrays.med3$CA$I$I$I (x, m - s, m, m + s);
n = java.util.Arrays.med3$CA$I$I$I (x, n - 2 * s, n - s, n);
}m = java.util.Arrays.med3$CA$I$I$I (x, l, m, n);
}var v = x[m];
var a = off;
var b = a;
var c = off + len - 1;
var d = c;
while (true) {
while (b <= c && x[b] <= v) {
if (x[b] == v) java.util.Arrays.swap$CA$I$I (x, a++, b);
b++;
}
while (c >= b && x[c] >= v) {
if (x[c] == v) java.util.Arrays.swap$CA$I$I (x, c, d--);
c--;
}
if (b > c) break;
java.util.Arrays.swap$CA$I$I (x, b++, c--);
}
var s;
var n = off + len;
s = Math.min (a - off, b - a);
java.util.Arrays.vecswap$CA$I$I$I (x, off, b - s, s);
s = Math.min (d - c, n - d - 1);
java.util.Arrays.vecswap$CA$I$I$I (x, b, n - s, s);
if ((s = b - a) > 1) java.util.Arrays.sort1$CA$I$I (x, off, s);
if ((s = d - c) > 1) java.util.Arrays.sort1$CA$I$I (x, n - s, s);
}, 1);

Clazz.newMethod$(C$, 'swap$CA$I$I', function (x, a, b) {
var t = x[a];
x[a] = x[b];
x[b] = t;
}, 1);

Clazz.newMethod$(C$, 'vecswap$CA$I$I$I', function (x, a, b, n) {
for (var i = 0; i < n; i++, a++, b++) java.util.Arrays.swap$CA$I$I (x, a, b);

}, 1);

Clazz.newMethod$(C$, 'med3$CA$I$I$I', function (x, a, b, c) {
return (x[a] < x[b] ? (x[b] < x[c] ? b : x[a] < x[c] ? c : a) : (x[b] > x[c] ? b : x[a] > x[c] ? c : a));
}, 1);

Clazz.newMethod$(C$, 'sort1$BA$I$I', function (x, off, len) {
if (len < 7) {
for (var i = off; i < len + off; i++) for (var j = i; j > off && x[j - 1] > x[j]; j--) java.util.Arrays.swap$BA$I$I (x, j, j - 1);


return;
}var m = off + (len >> 1);
if (len > 7) {
var l = off;
var n = off + len - 1;
if (len > 40) {
var s = Clazz.doubleToInt (len / 8);
l = java.util.Arrays.med3$BA$I$I$I (x, l, l + s, l + 2 * s);
m = java.util.Arrays.med3$BA$I$I$I (x, m - s, m, m + s);
n = java.util.Arrays.med3$BA$I$I$I (x, n - 2 * s, n - s, n);
}m = java.util.Arrays.med3$BA$I$I$I (x, l, m, n);
}var v = x[m];
var a = off;
var b = a;
var c = off + len - 1;
var d = c;
while (true) {
while (b <= c && x[b] <= v) {
if (x[b] == v) java.util.Arrays.swap$BA$I$I (x, a++, b);
b++;
}
while (c >= b && x[c] >= v) {
if (x[c] == v) java.util.Arrays.swap$BA$I$I (x, c, d--);
c--;
}
if (b > c) break;
java.util.Arrays.swap$BA$I$I (x, b++, c--);
}
var s;
var n = off + len;
s = Math.min (a - off, b - a);
java.util.Arrays.vecswap$BA$I$I$I (x, off, b - s, s);
s = Math.min (d - c, n - d - 1);
java.util.Arrays.vecswap$BA$I$I$I (x, b, n - s, s);
if ((s = b - a) > 1) java.util.Arrays.sort1$BA$I$I (x, off, s);
if ((s = d - c) > 1) java.util.Arrays.sort1$BA$I$I (x, n - s, s);
}, 1);

Clazz.newMethod$(C$, 'swap$BA$I$I', function (x, a, b) {
var t = x[a];
x[a] = x[b];
x[b] = t;
}, 1);

Clazz.newMethod$(C$, 'vecswap$BA$I$I$I', function (x, a, b, n) {
for (var i = 0; i < n; i++, a++, b++) java.util.Arrays.swap$BA$I$I (x, a, b);

}, 1);

Clazz.newMethod$(C$, 'med3$BA$I$I$I', function (x, a, b, c) {
return (x[a] < x[b] ? (x[b] < x[c] ? b : x[a] < x[c] ? c : a) : (x[b] > x[c] ? b : x[a] > x[c] ? c : a));
}, 1);

Clazz.newMethod$(C$, 'sort1$DA$I$I', function (x, off, len) {
if (len < 7) {
for (var i = off; i < len + off; i++) for (var j = i; j > off && x[j - 1] > x[j]; j--) java.util.Arrays.swap$DA$I$I (x, j, j - 1);


return;
}var m = off + (len >> 1);
if (len > 7) {
var l = off;
var n = off + len - 1;
if (len > 40) {
var s = Clazz.doubleToInt (len / 8);
l = java.util.Arrays.med3$DA$I$I$I (x, l, l + s, l + 2 * s);
m = java.util.Arrays.med3$DA$I$I$I (x, m - s, m, m + s);
n = java.util.Arrays.med3$DA$I$I$I (x, n - 2 * s, n - s, n);
}m = java.util.Arrays.med3$DA$I$I$I (x, l, m, n);
}var v = x[m];
var a = off;
var b = a;
var c = off + len - 1;
var d = c;
while (true) {
while (b <= c && x[b] <= v) {
if (x[b] == v) java.util.Arrays.swap$DA$I$I (x, a++, b);
b++;
}
while (c >= b && x[c] >= v) {
if (x[c] == v) java.util.Arrays.swap$DA$I$I (x, c, d--);
c--;
}
if (b > c) break;
java.util.Arrays.swap$DA$I$I (x, b++, c--);
}
var s;
var n = off + len;
s = Math.min (a - off, b - a);
java.util.Arrays.vecswap$DA$I$I$I (x, off, b - s, s);
s = Math.min (d - c, n - d - 1);
java.util.Arrays.vecswap$DA$I$I$I (x, b, n - s, s);
if ((s = b - a) > 1) java.util.Arrays.sort1$DA$I$I (x, off, s);
if ((s = d - c) > 1) java.util.Arrays.sort1$DA$I$I (x, n - s, s);
}, 1);

Clazz.newMethod$(C$, 'swap$DA$I$I', function (x, a, b) {
var t = x[a];
x[a] = x[b];
x[b] = t;
}, 1);

Clazz.newMethod$(C$, 'vecswap$DA$I$I$I', function (x, a, b, n) {
for (var i = 0; i < n; i++, a++, b++) java.util.Arrays.swap$DA$I$I (x, a, b);

}, 1);

Clazz.newMethod$(C$, 'med3$DA$I$I$I', function (x, a, b, c) {
return (x[a] < x[b] ? (x[b] < x[c] ? b : x[a] < x[c] ? c : a) : (x[b] > x[c] ? b : x[a] > x[c] ? c : a));
}, 1);

Clazz.newMethod$(C$, 'sort1$FA$I$I', function (x, off, len) {
if (len < 7) {
for (var i = off; i < len + off; i++) for (var j = i; j > off && x[j - 1] > x[j]; j--) java.util.Arrays.swap$FA$I$I (x, j, j - 1);


return;
}var m = off + (len >> 1);
if (len > 7) {
var l = off;
var n = off + len - 1;
if (len > 40) {
var s = Clazz.doubleToInt (len / 8);
l = java.util.Arrays.med3$FA$I$I$I (x, l, l + s, l + 2 * s);
m = java.util.Arrays.med3$FA$I$I$I (x, m - s, m, m + s);
n = java.util.Arrays.med3$FA$I$I$I (x, n - 2 * s, n - s, n);
}m = java.util.Arrays.med3$FA$I$I$I (x, l, m, n);
}var v = x[m];
var a = off;
var b = a;
var c = off + len - 1;
var d = c;
while (true) {
while (b <= c && x[b] <= v) {
if (x[b] == v) java.util.Arrays.swap$FA$I$I (x, a++, b);
b++;
}
while (c >= b && x[c] >= v) {
if (x[c] == v) java.util.Arrays.swap$FA$I$I (x, c, d--);
c--;
}
if (b > c) break;
java.util.Arrays.swap$FA$I$I (x, b++, c--);
}
var s;
var n = off + len;
s = Math.min (a - off, b - a);
java.util.Arrays.vecswap$FA$I$I$I (x, off, b - s, s);
s = Math.min (d - c, n - d - 1);
java.util.Arrays.vecswap$FA$I$I$I (x, b, n - s, s);
if ((s = b - a) > 1) java.util.Arrays.sort1$FA$I$I (x, off, s);
if ((s = d - c) > 1) java.util.Arrays.sort1$FA$I$I (x, n - s, s);
}, 1);

Clazz.newMethod$(C$, 'swap$FA$I$I', function (x, a, b) {
var t = x[a];
x[a] = x[b];
x[b] = t;
}, 1);

Clazz.newMethod$(C$, 'vecswap$FA$I$I$I', function (x, a, b, n) {
for (var i = 0; i < n; i++, a++, b++) java.util.Arrays.swap$FA$I$I (x, a, b);

}, 1);

Clazz.newMethod$(C$, 'med3$FA$I$I$I', function (x, a, b, c) {
return (x[a] < x[b] ? (x[b] < x[c] ? b : x[a] < x[c] ? c : a) : (x[b] > x[c] ? b : x[a] > x[c] ? c : a));
}, 1);

Clazz.newMethod$(C$, 'sort$OA', function (a) {
var aux = a.clone ();
java.util.Arrays.mergeSort$OA$OA$I$I$I (aux, a, 0, a.length, 0);
}, 1);

Clazz.newMethod$(C$, 'sort$OA$I$I', function (a, fromIndex, toIndex) {
java.util.Arrays.rangeCheck$I$I$I (a.length, fromIndex, toIndex);
var aux = java.util.Arrays.copyOfRange$OA$I$I (a, fromIndex, toIndex);
java.util.Arrays.mergeSort$OA$OA$I$I$I (aux, a, fromIndex, toIndex, -fromIndex);
}, 1);

Clazz.newMethod$(C$, 'mergeSort$OA$OA$I$I$I', function (src, dest, low, high, off) {
var length = high - low;
if (length < 7) {
for (var i = low; i < high; i++) for (var j = i; j > low && (dest[j - 1]).compareTo$O (dest[j]) > 0; j--) java.util.Arrays.swap$OA$I$I (dest, j, j - 1);


return;
}var destLow = low;
var destHigh = high;
low += off;
high += off;
var mid = (low + high) >>> 1;
java.util.Arrays.mergeSort$OA$OA$I$I$I (dest, src, low, mid, -off);
java.util.Arrays.mergeSort$OA$OA$I$I$I (dest, src, mid, high, -off);
if ((src[mid - 1]).compareTo$O (src[mid]) <= 0) {
System.arraycopy$O$I$O$I$I (src, low, dest, destLow, length);
return;
}for (var i = destLow, p = low, q = mid; i < destHigh; i++) {
if (q >= high || p < mid && (src[p]).compareTo$O (src[q]) <= 0) dest[i] = src[p++];
 else dest[i] = src[q++];
}
}, 1);

Clazz.newMethod$(C$, 'swap$OA$I$I', function (x, a, b) {
var t = x[a];
x[a] = x[b];
x[b] = t;
}, 1);

Clazz.newMethod$(C$, 'sort$TTA$java_util_Comparator', function (a, c) {
var aux = a.clone ();
if (c == null) java.util.Arrays.mergeSort$OA$OA$I$I$I (aux, a, 0, a.length, 0);
 else java.util.Arrays.mergeSort$OA$OA$I$I$I$java_util_Comparator (aux, a, 0, a.length, 0, c);
}, 1);

Clazz.newMethod$(C$, 'sort$TTA$I$I$java_util_Comparator', function (a, fromIndex, toIndex, c) {
java.util.Arrays.rangeCheck$I$I$I (a.length, fromIndex, toIndex);
var aux = java.util.Arrays.copyOfRange$TTA$I$I (a, fromIndex, toIndex);
if (c == null) java.util.Arrays.mergeSort$OA$OA$I$I$I (aux, a, fromIndex, toIndex, -fromIndex);
 else java.util.Arrays.mergeSort$OA$OA$I$I$I$java_util_Comparator (aux, a, fromIndex, toIndex, -fromIndex, c);
}, 1);

Clazz.newMethod$(C$, 'mergeSort$OA$OA$I$I$I$java_util_Comparator', function (src, dest, low, high, off, c) {
var length = high - low;
if (length < 7) {
for (var i = low; i < high; i++) for (var j = i; j > low && c.compare$O$O (dest[j - 1], dest[j]) > 0; j--) java.util.Arrays.swap$OA$I$I (dest, j, j - 1);


return;
}var destLow = low;
var destHigh = high;
low += off;
high += off;
var mid = (low + high) >>> 1;
java.util.Arrays.mergeSort$OA$OA$I$I$I$java_util_Comparator (dest, src, low, mid, -off, c);
java.util.Arrays.mergeSort$OA$OA$I$I$I$java_util_Comparator (dest, src, mid, high, -off, c);
if (c.compare$O$O (src[mid - 1], src[mid]) <= 0) {
System.arraycopy$O$I$O$I$I (src, low, dest, destLow, length);
return;
}for (var i = destLow, p = low, q = mid; i < destHigh; i++) {
if (q >= high || p < mid && c.compare$O$O (src[p], src[q]) <= 0) dest[i] = src[p++];
 else dest[i] = src[q++];
}
}, 1);

Clazz.newMethod$(C$, 'rangeCheck$I$I$I', function (arrayLen, fromIndex, toIndex) {
if (fromIndex > toIndex) throw Clazz.$new(IllegalArgumentException.construct$S,["fromIndex(" + fromIndex + ") > toIndex(" + toIndex + ")"]);
if (fromIndex < 0) throw Clazz.$new(ArrayIndexOutOfBoundsException.construct$I,[fromIndex]);
if (toIndex > arrayLen) throw Clazz.$new(ArrayIndexOutOfBoundsException.construct$I,[toIndex]);
}, 1);

Clazz.newMethod$(C$, 'binarySearch$JA$J', function (a, key) {
return java.util.Arrays.binarySearch0$JA$I$I$J (a, 0, a.length, key);
}, 1);

Clazz.newMethod$(C$, 'binarySearch$JA$I$I$J', function (a, fromIndex, toIndex, key) {
java.util.Arrays.rangeCheck$I$I$I (a.length, fromIndex, toIndex);
return java.util.Arrays.binarySearch0$JA$I$I$J (a, fromIndex, toIndex, key);
}, 1);

Clazz.newMethod$(C$, 'binarySearch0$JA$I$I$J', function (a, fromIndex, toIndex, key) {
var low = fromIndex;
var high = toIndex - 1;
while (low <= high) {
var mid = (low + high) >>> 1;
var midVal = a[mid];
if (midVal < key) low = mid + 1;
 else if (midVal > key) high = mid - 1;
 else return mid;
}
return -(low + 1);
}, 1);

Clazz.newMethod$(C$, 'binarySearch$IA$I', function (a, key) {
return java.util.Arrays.binarySearch0$IA$I$I$I (a, 0, a.length, key);
}, 1);

Clazz.newMethod$(C$, 'binarySearch$IA$I$I$I', function (a, fromIndex, toIndex, key) {
java.util.Arrays.rangeCheck$I$I$I (a.length, fromIndex, toIndex);
return java.util.Arrays.binarySearch0$IA$I$I$I (a, fromIndex, toIndex, key);
}, 1);

Clazz.newMethod$(C$, 'binarySearch0$IA$I$I$I', function (a, fromIndex, toIndex, key) {
var low = fromIndex;
var high = toIndex - 1;
while (low <= high) {
var mid = (low + high) >>> 1;
var midVal = a[mid];
if (midVal < key) low = mid + 1;
 else if (midVal > key) high = mid - 1;
 else return mid;
}
return -(low + 1);
}, 1);

Clazz.newMethod$(C$, 'binarySearch$HA$H', function (a, key) {
return java.util.Arrays.binarySearch0$HA$I$I$H (a, 0, a.length, key);
}, 1);

Clazz.newMethod$(C$, 'binarySearch$HA$I$I$H', function (a, fromIndex, toIndex, key) {
java.util.Arrays.rangeCheck$I$I$I (a.length, fromIndex, toIndex);
return java.util.Arrays.binarySearch0$HA$I$I$H (a, fromIndex, toIndex, key);
}, 1);

Clazz.newMethod$(C$, 'binarySearch0$HA$I$I$H', function (a, fromIndex, toIndex, key) {
var low = fromIndex;
var high = toIndex - 1;
while (low <= high) {
var mid = (low + high) >>> 1;
var midVal = a[mid];
if (midVal < key) low = mid + 1;
 else if (midVal > key) high = mid - 1;
 else return mid;
}
return -(low + 1);
}, 1);

Clazz.newMethod$(C$, 'binarySearch$CA$C', function (a, key) {
return java.util.Arrays.binarySearch0$CA$I$I$C (a, 0, a.length, key);
}, 1);

Clazz.newMethod$(C$, 'binarySearch$CA$I$I$C', function (a, fromIndex, toIndex, key) {
java.util.Arrays.rangeCheck$I$I$I (a.length, fromIndex, toIndex);
return java.util.Arrays.binarySearch0$CA$I$I$C (a, fromIndex, toIndex, key);
}, 1);

Clazz.newMethod$(C$, 'binarySearch0$CA$I$I$C', function (a, fromIndex, toIndex, key) {
var low = fromIndex;
var high = toIndex - 1;
while (low <= high) {
var mid = (low + high) >>> 1;
var midVal = a[mid];
if (midVal < key) low = mid + 1;
 else if (midVal > key) high = mid - 1;
 else return mid;
}
return -(low + 1);
}, 1);

Clazz.newMethod$(C$, 'binarySearch$BA$B', function (a, key) {
return java.util.Arrays.binarySearch0$BA$I$I$B (a, 0, a.length, key);
}, 1);

Clazz.newMethod$(C$, 'binarySearch$BA$I$I$B', function (a, fromIndex, toIndex, key) {
java.util.Arrays.rangeCheck$I$I$I (a.length, fromIndex, toIndex);
return java.util.Arrays.binarySearch0$BA$I$I$B (a, fromIndex, toIndex, key);
}, 1);

Clazz.newMethod$(C$, 'binarySearch0$BA$I$I$B', function (a, fromIndex, toIndex, key) {
var low = fromIndex;
var high = toIndex - 1;
while (low <= high) {
var mid = (low + high) >>> 1;
var midVal = a[mid];
if (midVal < key) low = mid + 1;
 else if (midVal > key) high = mid - 1;
 else return mid;
}
return -(low + 1);
}, 1);

Clazz.newMethod$(C$, 'binarySearch$DA$D', function (a, key) {
return java.util.Arrays.binarySearch0$DA$I$I$D (a, 0, a.length, key);
}, 1);

Clazz.newMethod$(C$, 'binarySearch$DA$I$I$D', function (a, fromIndex, toIndex, key) {
java.util.Arrays.rangeCheck$I$I$I (a.length, fromIndex, toIndex);
return java.util.Arrays.binarySearch0$DA$I$I$D (a, fromIndex, toIndex, key);
}, 1);

Clazz.newMethod$(C$, 'binarySearch0$DA$I$I$D', function (a, fromIndex, toIndex, key) {
var low = fromIndex;
var high = toIndex - 1;
while (low <= high) {
var mid = (low + high) >>> 1;
var midVal = a[mid];
if (midVal < key) low = mid + 1;
 else if (midVal > key) high = mid - 1;
 else {
var midBits = Double.doubleToLongBits (midVal);
var keyBits = Double.doubleToLongBits (key);
if (midBits == keyBits) return mid;
 else if (midBits < keyBits) low = mid + 1;
 else high = mid - 1;
}}
return -(low + 1);
}, 1);

Clazz.newMethod$(C$, 'binarySearch$FA$F', function (a, key) {
return java.util.Arrays.binarySearch0$FA$I$I$F (a, 0, a.length, key);
}, 1);

Clazz.newMethod$(C$, 'binarySearch$FA$I$I$F', function (a, fromIndex, toIndex, key) {
java.util.Arrays.rangeCheck$I$I$I (a.length, fromIndex, toIndex);
return java.util.Arrays.binarySearch0$FA$I$I$F (a, fromIndex, toIndex, key);
}, 1);

Clazz.newMethod$(C$, 'binarySearch0$FA$I$I$F', function (a, fromIndex, toIndex, key) {
var low = fromIndex;
var high = toIndex - 1;
while (low <= high) {
var mid = (low + high) >>> 1;
var midVal = a[mid];
if (midVal < key) low = mid + 1;
 else if (midVal > key) high = mid - 1;
 else {
var midBits = Float.floatToIntBits (midVal);
var keyBits = Float.floatToIntBits (key);
if (midBits == keyBits) return mid;
 else if (midBits < keyBits) low = mid + 1;
 else high = mid - 1;
}}
return -(low + 1);
}, 1);

Clazz.newMethod$(C$, 'binarySearch$OA$O', function (a, key) {
return java.util.Arrays.binarySearch0$OA$I$I$O (a, 0, a.length, key);
}, 1);

Clazz.newMethod$(C$, 'binarySearch$OA$I$I$O', function (a, fromIndex, toIndex, key) {
java.util.Arrays.rangeCheck$I$I$I (a.length, fromIndex, toIndex);
return java.util.Arrays.binarySearch0$OA$I$I$O (a, fromIndex, toIndex, key);
}, 1);

Clazz.newMethod$(C$, 'binarySearch0$OA$I$I$O', function (a, fromIndex, toIndex, key) {
var low = fromIndex;
var high = toIndex - 1;
while (low <= high) {
var mid = (low + high) >>> 1;
var midVal = a[mid];
var cmp = midVal.compareTo$O (key);
if (cmp < 0) low = mid + 1;
 else if (cmp > 0) high = mid - 1;
 else return mid;
}
return -(low + 1);
}, 1);

Clazz.newMethod$(C$, 'binarySearch$TTA$TT$java_util_Comparator', function (a, key, c) {
return java.util.Arrays.binarySearch0$TTA$I$I$TT$java_util_Comparator (a, 0, a.length, key, c);
}, 1);

Clazz.newMethod$(C$, 'binarySearch$TTA$I$I$TT$java_util_Comparator', function (a, fromIndex, toIndex, key, c) {
java.util.Arrays.rangeCheck$I$I$I (a.length, fromIndex, toIndex);
return java.util.Arrays.binarySearch0$TTA$I$I$TT$java_util_Comparator (a, fromIndex, toIndex, key, c);
}, 1);

Clazz.newMethod$(C$, 'binarySearch0$TTA$I$I$TT$java_util_Comparator', function (a, fromIndex, toIndex, key, c) {
if (c == null) {
return java.util.Arrays.binarySearch0$OA$I$I$O (a, fromIndex, toIndex, key);
}var low = fromIndex;
var high = toIndex - 1;
while (low <= high) {
var mid = (low + high) >>> 1;
var midVal = a[mid];
var cmp = c.compare$$ (midVal, key);
if (cmp < 0) low = mid + 1;
 else if (cmp > 0) high = mid - 1;
 else return mid;
}
return -(low + 1);
}, 1);

Clazz.newMethod$(C$, 'equals$JA$JA', function (a, a2) {
if (a === a2) return true;
if (a == null || a2 == null) return false;
var length = a.length;
if (a2.length != length) return false;
for (var i = 0; i < length; i++) if (a[i] != a2[i]) return false;

return true;
}, 1);

Clazz.newMethod$(C$, 'equals$IA$IA', function (a, a2) {
if (a === a2) return true;
if (a == null || a2 == null) return false;
var length = a.length;
if (a2.length != length) return false;
for (var i = 0; i < length; i++) if (a[i] != a2[i]) return false;

return true;
}, 1);

Clazz.newMethod$(C$, 'equals$HA$HA', function (a, a2) {
if (a === a2) return true;
if (a == null || a2 == null) return false;
var length = a.length;
if (a2.length != length) return false;
for (var i = 0; i < length; i++) if (a[i] != a2[i]) return false;

return true;
}, 1);

Clazz.newMethod$(C$, 'equals$CA$CA', function (a, a2) {
if (a === a2) return true;
if (a == null || a2 == null) return false;
var length = a.length;
if (a2.length != length) return false;
for (var i = 0; i < length; i++) if (a[i] != a2[i]) return false;

return true;
}, 1);

Clazz.newMethod$(C$, 'equals$BA$BA', function (a, a2) {
if (a === a2) return true;
if (a == null || a2 == null) return false;
var length = a.length;
if (a2.length != length) return false;
for (var i = 0; i < length; i++) if (a[i] != a2[i]) return false;

return true;
}, 1);

Clazz.newMethod$(C$, 'equals$ZA$ZA', function (a, a2) {
if (a === a2) return true;
if (a == null || a2 == null) return false;
var length = a.length;
if (a2.length != length) return false;
for (var i = 0; i < length; i++) if (a[i] != a2[i]) return false;

return true;
}, 1);

Clazz.newMethod$(C$, 'equals$DA$DA', function (a, a2) {
if (a === a2) return true;
if (a == null || a2 == null) return false;
var length = a.length;
if (a2.length != length) return false;
for (var i = 0; i < length; i++) if (Double.doubleToLongBits (a[i]) != Double.doubleToLongBits (a2[i])) return false;

return true;
}, 1);

Clazz.newMethod$(C$, 'equals$FA$FA', function (a, a2) {
if (a === a2) return true;
if (a == null || a2 == null) return false;
var length = a.length;
if (a2.length != length) return false;
for (var i = 0; i < length; i++) if (Float.floatToIntBits (a[i]) != Float.floatToIntBits (a2[i])) return false;

return true;
}, 1);

Clazz.newMethod$(C$, 'equals$OA$OA', function (a, a2) {
if (a === a2) return true;
if (a == null || a2 == null) return false;
var length = a.length;
if (a2.length != length) return false;
for (var i = 0; i < length; i++) {
var o1 = a[i];
var o2 = a2[i];
if (!(o1 == null ? o2 == null : o1.equals$O (o2))) return false;
}
return true;
}, 1);

Clazz.newMethod$(C$, 'fill$JA$J', function (a, val) {
for (var i = 0, len = a.length; i < len; i++) a[i] = val;

}, 1);

Clazz.newMethod$(C$, 'fill$JA$I$I$J', function (a, fromIndex, toIndex, val) {
java.util.Arrays.rangeCheck$I$I$I (a.length, fromIndex, toIndex);
for (var i = fromIndex; i < toIndex; i++) a[i] = val;

}, 1);

Clazz.newMethod$(C$, 'fill$IA$I', function (a, val) {
for (var i = 0, len = a.length; i < len; i++) a[i] = val;

}, 1);

Clazz.newMethod$(C$, 'fill$IA$I$I$I', function (a, fromIndex, toIndex, val) {
java.util.Arrays.rangeCheck$I$I$I (a.length, fromIndex, toIndex);
for (var i = fromIndex; i < toIndex; i++) a[i] = val;

}, 1);

Clazz.newMethod$(C$, 'fill$HA$H', function (a, val) {
for (var i = 0, len = a.length; i < len; i++) a[i] = val;

}, 1);

Clazz.newMethod$(C$, 'fill$HA$I$I$H', function (a, fromIndex, toIndex, val) {
java.util.Arrays.rangeCheck$I$I$I (a.length, fromIndex, toIndex);
for (var i = fromIndex; i < toIndex; i++) a[i] = val;

}, 1);

Clazz.newMethod$(C$, 'fill$CA$C', function (a, val) {
for (var i = 0, len = a.length; i < len; i++) a[i] = val;

}, 1);

Clazz.newMethod$(C$, 'fill$CA$I$I$C', function (a, fromIndex, toIndex, val) {
java.util.Arrays.rangeCheck$I$I$I (a.length, fromIndex, toIndex);
for (var i = fromIndex; i < toIndex; i++) a[i] = val;

}, 1);

Clazz.newMethod$(C$, 'fill$BA$B', function (a, val) {
for (var i = 0, len = a.length; i < len; i++) a[i] = val;

}, 1);

Clazz.newMethod$(C$, 'fill$BA$I$I$B', function (a, fromIndex, toIndex, val) {
java.util.Arrays.rangeCheck$I$I$I (a.length, fromIndex, toIndex);
for (var i = fromIndex; i < toIndex; i++) a[i] = val;

}, 1);

Clazz.newMethod$(C$, 'fill$ZA$Z', function (a, val) {
for (var i = 0, len = a.length; i < len; i++) a[i] = val;

}, 1);

Clazz.newMethod$(C$, 'fill$ZA$I$I$Z', function (a, fromIndex, toIndex, val) {
java.util.Arrays.rangeCheck$I$I$I (a.length, fromIndex, toIndex);
for (var i = fromIndex; i < toIndex; i++) a[i] = val;

}, 1);

Clazz.newMethod$(C$, 'fill$DA$D', function (a, val) {
for (var i = 0, len = a.length; i < len; i++) a[i] = val;

}, 1);

Clazz.newMethod$(C$, 'fill$DA$I$I$D', function (a, fromIndex, toIndex, val) {
java.util.Arrays.rangeCheck$I$I$I (a.length, fromIndex, toIndex);
for (var i = fromIndex; i < toIndex; i++) a[i] = val;

}, 1);

Clazz.newMethod$(C$, 'fill$FA$F', function (a, val) {
for (var i = 0, len = a.length; i < len; i++) a[i] = val;

}, 1);

Clazz.newMethod$(C$, 'fill$FA$I$I$F', function (a, fromIndex, toIndex, val) {
java.util.Arrays.rangeCheck$I$I$I (a.length, fromIndex, toIndex);
for (var i = fromIndex; i < toIndex; i++) a[i] = val;

}, 1);

Clazz.newMethod$(C$, 'fill$OA$O', function (a, val) {
for (var i = 0, len = a.length; i < len; i++) a[i] = val;

}, 1);

Clazz.newMethod$(C$, 'fill$OA$I$I$O', function (a, fromIndex, toIndex, val) {
java.util.Arrays.rangeCheck$I$I$I (a.length, fromIndex, toIndex);
for (var i = fromIndex; i < toIndex; i++) a[i] = val;

}, 1);

Clazz.newMethod$(C$, 'copyOf$TTA$I', function (original, newLength) {
return java.util.Arrays.copyOf$TTA$I$ClassA> (original, newLength, original.getClass ());
}, 1);

Clazz.newMethod$(C$, 'copyOf$TUA$I$ClassA>', function (original, newLength, newType) {
var copy = (newType === Clazz.arrayClass$('OA',1)) ?  Clazz.newArray$('OA', 1, [newLength]) : Clazz.newArray$ (newType.getComponentType (), newLength);
System.arraycopy$O$I$O$I$I (original, 0, copy, 0, Math.min (original.length, newLength));
return copy;
}, 1);

Clazz.newMethod$(C$, 'copyOf$BA$I', function (original, newLength) {
var copy =  Clazz.newArray$('BA', 1, [newLength]);
System.arraycopy$O$I$O$I$I (original, 0, copy, 0, Math.min (original.length, newLength));
return copy;
}, 1);

Clazz.newMethod$(C$, 'copyOf$HA$I', function (original, newLength) {
var copy =  Clazz.newArray$('HA', 1, [newLength]);
System.arraycopy$O$I$O$I$I (original, 0, copy, 0, Math.min (original.length, newLength));
return copy;
}, 1);

Clazz.newMethod$(C$, 'copyOf$IA$I', function (original, newLength) {
var copy =  Clazz.newArray$('IA', 1, [newLength]);
System.arraycopy$O$I$O$I$I (original, 0, copy, 0, Math.min (original.length, newLength));
return copy;
}, 1);

Clazz.newMethod$(C$, 'copyOf$JA$I', function (original, newLength) {
var copy =  Clazz.newArray$('JA', 1, [newLength]);
System.arraycopy$O$I$O$I$I (original, 0, copy, 0, Math.min (original.length, newLength));
return copy;
}, 1);

Clazz.newMethod$(C$, 'copyOf$CA$I', function (original, newLength) {
var copy =  Clazz.newArray$('CA', 1, [newLength]);
System.arraycopy$O$I$O$I$I (original, 0, copy, 0, Math.min (original.length, newLength));
return copy;
}, 1);

Clazz.newMethod$(C$, 'copyOf$FA$I', function (original, newLength) {
var copy =  Clazz.newArray$('FA', 1, [newLength]);
System.arraycopy$O$I$O$I$I (original, 0, copy, 0, Math.min (original.length, newLength));
return copy;
}, 1);

Clazz.newMethod$(C$, 'copyOf$DA$I', function (original, newLength) {
var copy =  Clazz.newArray$('DA', 1, [newLength]);
System.arraycopy$O$I$O$I$I (original, 0, copy, 0, Math.min (original.length, newLength));
return copy;
}, 1);

Clazz.newMethod$(C$, 'copyOf$ZA$I', function (original, newLength) {
var copy =  Clazz.newArray$('ZA', 1, [newLength]);
System.arraycopy$O$I$O$I$I (original, 0, copy, 0, Math.min (original.length, newLength));
return copy;
}, 1);

Clazz.newMethod$(C$, 'copyOfRange$TTA$I$I', function (original, from, to) {
return java.util.Arrays.copyOfRange$TTA$I$I$ClassA> (original, from, to, original.getClass ());
}, 1);

Clazz.newMethod$(C$, 'copyOfRange$TUA$I$I$ClassA>', function (original, from, to, newType) {
var newLength = to - from;
if (newLength < 0) throw Clazz.$new(IllegalArgumentException.construct$S,[from + " > " + to]);
var copy = (newType === Clazz.arrayClass$('OA',1)) ?  Clazz.newArray$('OA', 1, [newLength]) : Clazz.newArray$ (newType.getComponentType (), newLength);
System.arraycopy$O$I$O$I$I (original, from, copy, 0, Math.min (original.length - from, newLength));
return copy;
}, 1);

Clazz.newMethod$(C$, 'copyOfRange$BA$I$I', function (original, from, to) {
var newLength = to - from;
if (newLength < 0) throw Clazz.$new(IllegalArgumentException.construct$S,[from + " > " + to]);
var copy =  Clazz.newArray$('BA', 1, [newLength]);
System.arraycopy$O$I$O$I$I (original, from, copy, 0, Math.min (original.length - from, newLength));
return copy;
}, 1);

Clazz.newMethod$(C$, 'copyOfRange$HA$I$I', function (original, from, to) {
var newLength = to - from;
if (newLength < 0) throw Clazz.$new(IllegalArgumentException.construct$S,[from + " > " + to]);
var copy =  Clazz.newArray$('HA', 1, [newLength]);
System.arraycopy$O$I$O$I$I (original, from, copy, 0, Math.min (original.length - from, newLength));
return copy;
}, 1);

Clazz.newMethod$(C$, 'copyOfRange$IA$I$I', function (original, from, to) {
var newLength = to - from;
if (newLength < 0) throw Clazz.$new(IllegalArgumentException.construct$S,[from + " > " + to]);
var copy =  Clazz.newArray$('IA', 1, [newLength]);
System.arraycopy$O$I$O$I$I (original, from, copy, 0, Math.min (original.length - from, newLength));
return copy;
}, 1);

Clazz.newMethod$(C$, 'copyOfRange$JA$I$I', function (original, from, to) {
var newLength = to - from;
if (newLength < 0) throw Clazz.$new(IllegalArgumentException.construct$S,[from + " > " + to]);
var copy =  Clazz.newArray$('JA', 1, [newLength]);
System.arraycopy$O$I$O$I$I (original, from, copy, 0, Math.min (original.length - from, newLength));
return copy;
}, 1);

Clazz.newMethod$(C$, 'copyOfRange$CA$I$I', function (original, from, to) {
var newLength = to - from;
if (newLength < 0) throw Clazz.$new(IllegalArgumentException.construct$S,[from + " > " + to]);
var copy =  Clazz.newArray$('CA', 1, [newLength]);
System.arraycopy$O$I$O$I$I (original, from, copy, 0, Math.min (original.length - from, newLength));
return copy;
}, 1);

Clazz.newMethod$(C$, 'copyOfRange$FA$I$I', function (original, from, to) {
var newLength = to - from;
if (newLength < 0) throw Clazz.$new(IllegalArgumentException.construct$S,[from + " > " + to]);
var copy =  Clazz.newArray$('FA', 1, [newLength]);
System.arraycopy$O$I$O$I$I (original, from, copy, 0, Math.min (original.length - from, newLength));
return copy;
}, 1);

Clazz.newMethod$(C$, 'copyOfRange$DA$I$I', function (original, from, to) {
var newLength = to - from;
if (newLength < 0) throw Clazz.$new(IllegalArgumentException.construct$S,[from + " > " + to]);
var copy =  Clazz.newArray$('DA', 1, [newLength]);
System.arraycopy$O$I$O$I$I (original, from, copy, 0, Math.min (original.length - from, newLength));
return copy;
}, 1);

Clazz.newMethod$(C$, 'copyOfRange$ZA$I$I', function (original, from, to) {
var newLength = to - from;
if (newLength < 0) throw Clazz.$new(IllegalArgumentException.construct$S,[from + " > " + to]);
var copy =  Clazz.newArray$('ZA', 1, [newLength]);
System.arraycopy$O$I$O$I$I (original, from, copy, 0, Math.min (original.length - from, newLength));
return copy;
}, 1);

Clazz.newMethod$(C$, 'asList$TTA', function (a) {
return Clazz.$new(java.util.Arrays.ArrayList.construct$TTA,[a]);
}, 1);

Clazz.newMethod$(C$, 'hashCode$JA', function (a) {
if (a == null) return 0;
var result = 1;
for (var element, $element = 0, $$element = a; $element < $$element.length && ((element = $$element[$element]) || true); $element++) {
var elementHash = (element ^ (element >>> 32));
result = 31 * result + elementHash;
}
return result;
}, 1);

Clazz.newMethod$(C$, 'hashCode$IA', function (a) {
if (a == null) return 0;
var result = 1;
for (var element, $element = 0, $$element = a; $element < $$element.length && ((element = $$element[$element]) || true); $element++) result = 31 * result + element;

return result;
}, 1);

Clazz.newMethod$(C$, 'hashCode$HA', function (a) {
if (a == null) return 0;
var result = 1;
for (var element, $element = 0, $$element = a; $element < $$element.length && ((element = $$element[$element]) || true); $element++) result = 31 * result + element;

return result;
}, 1);

Clazz.newMethod$(C$, 'hashCode$CA', function (a) {
if (a == null) return 0;
var result = 1;
for (var element, $element = 0, $$element = a; $element < $$element.length && ((element = $$element[$element]) || true); $element++) result = 31 * result + element.charCodeAt (0);

return result;
}, 1);

Clazz.newMethod$(C$, 'hashCode$BA', function (a) {
if (a == null) return 0;
var result = 1;
for (var element, $element = 0, $$element = a; $element < $$element.length && ((element = $$element[$element]) || true); $element++) result = 31 * result + element;

return result;
}, 1);

Clazz.newMethod$(C$, 'hashCode$ZA', function (a) {
if (a == null) return 0;
var result = 1;
for (var element, $element = 0, $$element = a; $element < $$element.length && ((element = $$element[$element]) || true); $element++) result = 31 * result + (element ? 1231 : 1237);

return result;
}, 1);

Clazz.newMethod$(C$, 'hashCode$FA', function (a) {
if (a == null) return 0;
var result = 1;
for (var element, $element = 0, $$element = a; $element < $$element.length && ((element = $$element[$element]) || true); $element++) result = 31 * result + Float.floatToIntBits (element);

return result;
}, 1);

Clazz.newMethod$(C$, 'hashCode$DA', function (a) {
if (a == null) return 0;
var result = 1;
for (var element, $element = 0, $$element = a; $element < $$element.length && ((element = $$element[$element]) || true); $element++) {
var bits = Double.doubleToLongBits (element);
result = 31 * result + (bits ^ (bits >>> 32));
}
return result;
}, 1);

Clazz.newMethod$(C$, 'hashCode$OA', function (a) {
if (a == null) return 0;
var result = 1;
for (var element, $element = 0, $$element = a; $element < $$element.length && ((element = $$element[$element]) || true); $element++) result = 31 * result + (element == null ? 0 : element.hashCode ());

return result;
}, 1);

Clazz.newMethod$(C$, 'deepHashCode$OA', function (a) {
if (a == null) return 0;
var result = 1;
for (var element, $element = 0, $$element = a; $element < $$element.length && ((element = $$element[$element]) || true); $element++) {
var elementHash = 0;
if (Clazz.instanceOf(element, Clazz.arrayClass$('OA',1))) elementHash = java.util.Arrays.deepHashCode$OA (element);
 else if (Clazz.instanceOf(element, Clazz.arrayClass$('BA',1))) elementHash = java.util.Arrays.hashCode$BA (element);
 else if (Clazz.instanceOf(element, Clazz.arrayClass$('HA',1))) elementHash = java.util.Arrays.hashCode$HA (element);
 else if (Clazz.instanceOf(element, Clazz.arrayClass$('IA',1))) elementHash = java.util.Arrays.hashCode$IA (element);
 else if (Clazz.instanceOf(element, Clazz.arrayClass$('JA',1))) elementHash = java.util.Arrays.hashCode$JA (element);
 else if (Clazz.instanceOf(element, Clazz.arrayClass$('CA',1))) elementHash = java.util.Arrays.hashCode$CA (element);
 else if (Clazz.instanceOf(element, Clazz.arrayClass$('FA',1))) elementHash = java.util.Arrays.hashCode$FA (element);
 else if (Clazz.instanceOf(element, Clazz.arrayClass$('DA',1))) elementHash = java.util.Arrays.hashCode$DA (element);
 else if (Clazz.instanceOf(element, Clazz.arrayClass$('ZA',1))) elementHash = java.util.Arrays.hashCode$ZA (element);
 else if (element != null) elementHash = element.hashCode ();
result = 31 * result + elementHash;
}
return result;
}, 1);

Clazz.newMethod$(C$, 'deepEquals$OA$OA', function (a1, a2) {
if (a1 === a2) return true;
if (a1 == null || a2 == null) return false;
var length = a1.length;
if (a2.length != length) return false;
for (var i = 0; i < length; i++) {
var e1 = a1[i];
var e2 = a2[i];
if (e1 === e2) continue;
if (e1 == null) return false;
var eq;
if (Clazz.instanceOf(e1, Clazz.arrayClass$('OA',1)) && Clazz.instanceOf(e2, Clazz.arrayClass$('OA',1))) eq = java.util.Arrays.deepEquals$OA$OA (e1, e2);
 else if (Clazz.instanceOf(e1, Clazz.arrayClass$('BA',1)) && Clazz.instanceOf(e2, Clazz.arrayClass$('BA',1))) eq = java.util.Arrays.equals$BA$BA (e1, e2);
 else if (Clazz.instanceOf(e1, Clazz.arrayClass$('HA',1)) && Clazz.instanceOf(e2, Clazz.arrayClass$('HA',1))) eq = java.util.Arrays.equals$HA$HA (e1, e2);
 else if (Clazz.instanceOf(e1, Clazz.arrayClass$('IA',1)) && Clazz.instanceOf(e2, Clazz.arrayClass$('IA',1))) eq = java.util.Arrays.equals$IA$IA (e1, e2);
 else if (Clazz.instanceOf(e1, Clazz.arrayClass$('JA',1)) && Clazz.instanceOf(e2, Clazz.arrayClass$('JA',1))) eq = java.util.Arrays.equals$JA$JA (e1, e2);
 else if (Clazz.instanceOf(e1, Clazz.arrayClass$('CA',1)) && Clazz.instanceOf(e2, Clazz.arrayClass$('CA',1))) eq = java.util.Arrays.equals$CA$CA (e1, e2);
 else if (Clazz.instanceOf(e1, Clazz.arrayClass$('FA',1)) && Clazz.instanceOf(e2, Clazz.arrayClass$('FA',1))) eq = java.util.Arrays.equals$FA$FA (e1, e2);
 else if (Clazz.instanceOf(e1, Clazz.arrayClass$('DA',1)) && Clazz.instanceOf(e2, Clazz.arrayClass$('DA',1))) eq = java.util.Arrays.equals$DA$DA (e1, e2);
 else if (Clazz.instanceOf(e1, Clazz.arrayClass$('ZA',1)) && Clazz.instanceOf(e2, Clazz.arrayClass$('ZA',1))) eq = java.util.Arrays.equals$ZA$ZA (e1, e2);
 else eq = e1.equals$O (e2);
if (!eq) return false;
}
return true;
}, 1);

Clazz.newMethod$(C$, 'toString$JA', function (a) {
if (a == null) return "null";
var iMax = a.length - 1;
if (iMax == -1) return "[]";
var b = Clazz.$new(StringBuilder.construct,[]);
b.append$C ('[');
for (var i = 0; ; i++) {
b.append$J (a[i]);
if (i == iMax) return b.append$C (']').toString ();
b.append$S (", ");
}
}, 1);

Clazz.newMethod$(C$, 'toString$IA', function (a) {
if (a == null) return "null";
var iMax = a.length - 1;
if (iMax == -1) return "[]";
var b = Clazz.$new(StringBuilder.construct,[]);
b.append$C ('[');
for (var i = 0; ; i++) {
b.append$I (a[i]);
if (i == iMax) return b.append$C (']').toString ();
b.append$S (", ");
}
}, 1);

Clazz.newMethod$(C$, 'toString$HA', function (a) {
if (a == null) return "null";
var iMax = a.length - 1;
if (iMax == -1) return "[]";
var b = Clazz.$new(StringBuilder.construct,[]);
b.append$C ('[');
for (var i = 0; ; i++) {
b.append$I (a[i]);
if (i == iMax) return b.append$C (']').toString ();
b.append$S (", ");
}
}, 1);

Clazz.newMethod$(C$, 'toString$CA', function (a) {
if (a == null) return "null";
var iMax = a.length - 1;
if (iMax == -1) return "[]";
var b = Clazz.$new(StringBuilder.construct,[]);
b.append$C ('[');
for (var i = 0; ; i++) {
b.append$C (a[i]);
if (i == iMax) return b.append$C (']').toString ();
b.append$S (", ");
}
}, 1);

Clazz.newMethod$(C$, 'toString$BA', function (a) {
if (a == null) return "null";
var iMax = a.length - 1;
if (iMax == -1) return "[]";
var b = Clazz.$new(StringBuilder.construct,[]);
b.append$C ('[');
for (var i = 0; ; i++) {
b.append$I (a[i]);
if (i == iMax) return b.append$C (']').toString ();
b.append$S (", ");
}
}, 1);

Clazz.newMethod$(C$, 'toString$ZA', function (a) {
if (a == null) return "null";
var iMax = a.length - 1;
if (iMax == -1) return "[]";
var b = Clazz.$new(StringBuilder.construct,[]);
b.append$C ('[');
for (var i = 0; ; i++) {
b.append$Z (a[i]);
if (i == iMax) return b.append$C (']').toString ();
b.append$S (", ");
}
}, 1);

Clazz.newMethod$(C$, 'toString$FA', function (a) {
if (a == null) return "null";
var iMax = a.length - 1;
if (iMax == -1) return "[]";
var b = Clazz.$new(StringBuilder.construct,[]);
b.append$C ('[');
for (var i = 0; ; i++) {
b.append$F (a[i]);
if (i == iMax) return b.append$C (']').toString ();
b.append$S (", ");
}
}, 1);

Clazz.newMethod$(C$, 'toString$DA', function (a) {
if (a == null) return "null";
var iMax = a.length - 1;
if (iMax == -1) return "[]";
var b = Clazz.$new(StringBuilder.construct,[]);
b.append$C ('[');
for (var i = 0; ; i++) {
b.append$D (a[i]);
if (i == iMax) return b.append$C (']').toString ();
b.append$S (", ");
}
}, 1);

Clazz.newMethod$(C$, 'toString$OA', function (a) {
if (a == null) return "null";
var iMax = a.length - 1;
if (iMax == -1) return "[]";
var b = Clazz.$new(StringBuilder.construct,[]);
b.append$C ('[');
for (var i = 0; ; i++) {
b.append$S (String.valueOf$O (a[i]));
if (i == iMax) return b.append$C (']').toString ();
b.append$S (", ");
}
}, 1);

Clazz.newMethod$(C$, 'deepToString$OA', function (a) {
if (a == null) return "null";
var bufLen = 20 * a.length;
if (a.length != 0 && bufLen <= 0) bufLen = 2147483647;
var buf = Clazz.$new(StringBuilder.construct$I,[bufLen]);
java.util.Arrays.deepToString$OA$StringBuilder$java_util_SetA> (a, buf, Clazz.$new(java.util.HashSet.construct,[]));
return buf.toString ();
}, 1);

Clazz.newMethod$(C$, 'deepToString$OA$StringBuilder$java_util_SetA>', function (a, buf, dejaVu) {
if (a == null) {
buf.append$S ("null");
return;
}var iMax = a.length - 1;
if (iMax == -1) {
buf.append$S ("[]");
return;
}dejaVu.add$OA (a);
buf.append$C ('[');
for (var i = 0; ; i++) {
var element = a[i];
if (element == null) {
buf.append$S ("null");
} else {
var eClass = element.getClass ();
if (eClass.isArray ()) {
if (eClass === Clazz.arrayClass$('BA',1)) buf.append$S (java.util.Arrays.toString$BA (element));
 else if (eClass === Clazz.arrayClass$('HA',1)) buf.append$S (java.util.Arrays.toString$HA (element));
 else if (eClass === Clazz.arrayClass$('IA',1)) buf.append$S (java.util.Arrays.toString$IA (element));
 else if (eClass === Clazz.arrayClass$('JA',1)) buf.append$S (java.util.Arrays.toString$JA (element));
 else if (eClass === Clazz.arrayClass$('CA',1)) buf.append$S (java.util.Arrays.toString$CA (element));
 else if (eClass === Clazz.arrayClass$('FA',1)) buf.append$S (java.util.Arrays.toString$FA (element));
 else if (eClass === Clazz.arrayClass$('DA',1)) buf.append$S (java.util.Arrays.toString$DA (element));
 else if (eClass === Clazz.arrayClass$('ZA',1)) buf.append$S (java.util.Arrays.toString$ZA (element));
 else {
if (dejaVu.contains$O (element)) buf.append$S ("[...]");
 else java.util.Arrays.deepToString$OA$StringBuilder$java_util_SetA> (element, buf, dejaVu);
}} else {
buf.append$S (element.toString ());
}}if (i == iMax) break;
buf.append$S (", ");
}
buf.append$C (']');
dejaVu.remove$O (a);
}, 1);
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Arrays, "ArrayList", java.util.AbstractList, [java.util.RandomAccess, java.io.Serializable]);

Clazz.newMethod$(C$, '$init$', function () {
this.a = null;
}, 1);

Clazz.newMethod$(C$, 'construct$TEA', function (array) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
if (array == null) throw Clazz.$new(NullPointerException.construct,[]);
this.a = array;
}, 1);

Clazz.newMethod$(C$, 'size', function () {
return this.a.length;
});

Clazz.newMethod$(C$, 'toArray', function () {
return this.a.clone ();
});

Clazz.newMethod$(C$, 'toArray$TTA', function (a) {
var size = this.size ();
if (a.length < size) return java.util.Arrays.copyOf$TEA$I$ClassA> (this.a, size, a.getClass ());
System.arraycopy$O$I$O$I$I (this.a, 0, a, 0, size);
if (a.length > size) a[size] = null;
return a;
});

Clazz.newMethod$(C$, 'get$I', function (index) {
return this.a[index];
});

Clazz.newMethod$(C$, 'set$I$TE', function (index, element) {
var oldValue = this.a[index];
this.a[index] = element;
return oldValue;
});

Clazz.newMethod$(C$, 'indexOf$O', function (o) {
if (o == null) {
for (var i = 0; i < this.a.length; i++) if (this.a[i] == null) return i;

} else {
for (var i = 0; i < this.a.length; i++) if (o.equals$O (this.a[i])) return i;

}return -1;
});

Clazz.newMethod$(C$, 'contains$O', function (o) {
return this.indexOf$O (o) != -1;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
Clazz.defineStatics (C$,
"INSERTIONSORT_THRESHOLD", 7);
})()
});

//Created 2017-08-17 10:33:16
