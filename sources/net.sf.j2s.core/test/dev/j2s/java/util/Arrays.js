Clazz.load (["java.util.AbstractList", "$.RandomAccess"], "java.util.Arrays", ["java.lang.ArrayIndexOutOfBoundsException", "$.IllegalArgumentException", "$.NullPointerException"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "Arrays");

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'construct', function () {
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'sort$OA', function (a) {
var aux = a.sort (function (o1, o2) {
if (typeof o1 == "string" || o1 instanceof Comparable){
return o1.compareTo (o2);
}
return o1 - o2;
});
for (var i = 0; i < a.length; i++) {
a[i] = aux[i];
}
}, 1);

Clazz.newMethod$ (C$, 'sort$OA$I$I', function (a, fromIndex, toIndex) {
this.rangeCheck(a.length, fromIndex, toIndex);
var aux = new Array ();
for (var i = fromIndex; i < toIndex; i++) {
aux[i - fromIndex] = a[i];
}
aux = aux.sort (function (o1, o2) {
if (typeof o1 == "string" || o1 instanceof Comparable){
return o1.compareTo (o2);
}
return o1 - o2;
});
for (var i = fromIndex; i < toIndex; i++) {
a[i] = aux[i - fromIndex];
}
}, 1);

Clazz.newMethod$ (C$, 'sort$OA$java_util_Comparator', function (a, c) {
var aux = a.sort (function (o1, o2) {
if (c != null) {
return c.compare (o1, o2);
} else if (typeof o1 == "string" || o1 instanceof Comparable){
return o1.compareTo (o2);
}
return o1 - o2;
});
for (var i = 0; i < a.length; i++) {
a[i] = aux[i];
}
}, 1);

Clazz.newMethod$ (C$, 'sort$OA$I$I$java_util_Comparator', function (a, fromIndex, toIndex, c) {
this.rangeCheck(a.length, fromIndex, toIndex);
var aux = new Array ();
for (var i = fromIndex; i < toIndex; i++) {
aux[i - fromIndex] = a[i];
}
aux = aux.sort (function (o1, o2) {
if (c != null) {
return c.compare (o1, o2);
} else if (typeof o1 == "string" || o1 instanceof Comparable){
return o1.compareTo (o2);
}
return o1 - o2;
});
for (var i = fromIndex; i < toIndex; i++) {
a[i] = aux[i - fromIndex];
}
}, 1);

Clazz.newMethod$ (C$, 'rangeCheck$I$I$I', function (arrayLen, fromIndex, toIndex) {
if (fromIndex > toIndex) throw Clazz.$new(IllegalArgumentException.construct$S,["fromIndex(" + fromIndex + ") > toIndex(" + toIndex + ")"]);
if (fromIndex < 0) throw Clazz.$new(ArrayIndexOutOfBoundsException.construct$I,[fromIndex]);
if (toIndex > arrayLen) throw Clazz.$new(ArrayIndexOutOfBoundsException.construct$I,[toIndex]);
}, 1);

Clazz.newMethod$ (C$, 'binarySearch$IA$I', function (a, key) {
var low = 0;
var high = a.length - 1;
while (low <= high) {
var mid = (low + high) >> 1;
var midVal = a[mid];
if (midVal < key) low = mid + 1;
 else if (midVal > key) high = mid - 1;
 else return mid;
}
return -(low + 1);
}, 1);

Clazz.newMethod$ (C$, 'binarySearch$OA$O', function (a, key) {
var low = 0;
var high = a.length - 1;
while (low <= high) {
var mid = (low + high) >> 1;
var midVal = a[mid];
var cmp = (midVal).compareTo$O (key);
if (cmp < 0) low = mid + 1;
 else if (cmp > 0) high = mid - 1;
 else return mid;
}
return -(low + 1);
}, 1);

Clazz.newMethod$ (C$, 'binarySearch$OA$O$java_util_Comparator', function (a, key, c) {
if (c == null) return java.util.Arrays.binarySearch$OA$O (a, key);
var low = 0;
var high = a.length - 1;
while (low <= high) {
var mid = (low + high) >> 1;
var midVal = a[mid];
var cmp = c.compare$O$O (midVal, key);
if (cmp < 0) low = mid + 1;
 else if (cmp > 0) high = mid - 1;
 else return mid;
}
return -(low + 1);
}, 1);

Clazz.newMethod$ (C$, 'equals$OA$OA', function (a, a2) {
if (a === a2) return true;
if (a == null || a2 == null) return false;
var length = a.length;
if (a2.length != length) return false;
for (var i = 0; i < length; i++) {
var o1 = a[i];
var o2 = a2[i];
{
if(!(o1==null?o2==null:(o1.equals==null?o1==o2:o1.equals(o2))))return false;
}}
return true;
}, 1);

Clazz.newMethod$ (C$, 'fill$OA$O', function (a, val) {
java.util.Arrays.fill$OA$I$I$O (a, 0, a.length, val);
}, 1);

Clazz.newMethod$ (C$, 'fill$OA$I$I$O', function (a, fromIndex, toIndex, val) {
java.util.Arrays.rangeCheck$I$I$I (a.length, fromIndex, toIndex);
for (var i = fromIndex; i < toIndex; i++) a[i] = val;

}, 1);

Clazz.newMethod$ (C$, 'asList$OA', function (a) {
return Clazz.$new(java.util.Arrays.ArrayList.construct$OA,[a]);
}, 1);
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Arrays, "ArrayList", java.util.AbstractList, [java.util.RandomAccess, java.io.Serializable]);

Clazz.newMethod$(C$, '$init$', function () {
this.a = null;
}, 1);

Clazz.newMethod$ (C$, 'construct$OA', function (array) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
if (array == null) throw Clazz.$new(NullPointerException.construct);
this.a = array;
}, 1);

Clazz.newMethod$ (C$, 'size', function () {
return this.a.length;
});

Clazz.newMethod$ (C$, 'toArray', function () {
return this.a.clone ();
});

Clazz.newMethod$ (C$, 'get$I', function (index) {
return this.a[index];
});

Clazz.newMethod$ (C$, 'set$I$O', function (index, element) {
var oldValue = this.a[index];
this.a[index] = element;
return oldValue;
});

Clazz.newMethod$ (C$, 'indexOf$O', function (o) {
if (o == null) {
for (var i = 0; i < this.a.length; i++) if (this.a[i] == null) return i;

} else {
for (var i = 0; i < this.a.length; i++) if (o.equals$O (this.a[i])) return i;

}return -1;
});

Clazz.newMethod$ (C$, 'contains$O', function (o) {
return this.indexOf$O (o) != -1;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
Clazz.defineStatics (C$,
"INSERTIONSORT_THRESHOLD", 7);
})()
});

//Created 2017-08-12 07:32:18
