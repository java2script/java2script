Clazz.declarePackage ("java.util");
Clazz.load (["java.util.AbstractCollection", "$.Iterator", "java.util.Deque"], "java.util.ArrayDeque", ["java.lang.AssertionError", "$.IllegalStateException", "$.NullPointerException", "java.lang.reflect.Array", "java.util.Arrays", "$.ConcurrentModificationException", "$.NoSuchElementException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.elements = null;
this.head = 0;
this.tail = 0;
if (!Clazz.isClassDefined ("java.util.ArrayDeque.DeqIterator")) {
java.util.ArrayDeque.$ArrayDeque$DeqIterator$ ();
}
if (!Clazz.isClassDefined ("java.util.ArrayDeque.DescendingIterator")) {
java.util.ArrayDeque.$ArrayDeque$DescendingIterator$ ();
}
Clazz.instantialize (this, arguments);
}, java.util, "ArrayDeque", java.util.AbstractCollection, [java.util.Deque, Cloneable, java.io.Serializable]);
Clazz.defineMethod (c$, "allocateElements", 
 function (numElements) {
var initialCapacity = 8;
if (numElements >= initialCapacity) {
initialCapacity = numElements;
initialCapacity |= (initialCapacity >>> 1);
initialCapacity |= (initialCapacity >>> 2);
initialCapacity |= (initialCapacity >>> 4);
initialCapacity |= (initialCapacity >>> 8);
initialCapacity |= (initialCapacity >>> 16);
initialCapacity++;
if (initialCapacity < 0) initialCapacity >>>= 1;
}this.elements =  new Array (initialCapacity);
}, "~N");
Clazz.defineMethod (c$, "doubleCapacity", 
 function () {
var p = this.head;
var n = this.elements.length;
var r = n - p;
var newCapacity = n << 1;
if (newCapacity < 0) throw  new IllegalStateException ("Sorry, deque too big");
var a =  new Array (newCapacity);
System.arraycopy (this.elements, p, a, 0, r);
System.arraycopy (this.elements, 0, a, r, p);
this.elements = a;
this.head = 0;
this.tail = n;
});
Clazz.defineMethod (c$, "copyElements", 
 function (a) {
if (this.head < this.tail) {
System.arraycopy (this.elements, this.head, a, 0, this.size ());
} else if (this.head > this.tail) {
var headPortionLen = this.elements.length - this.head;
System.arraycopy (this.elements, this.head, a, 0, headPortionLen);
System.arraycopy (this.elements, 0, a, headPortionLen, this.tail);
}return a;
}, "~A");
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.util.ArrayDeque, []);
this.elements =  new Array (16);
});
Clazz.makeConstructor (c$, 
function (numElements) {
Clazz.superConstructor (this, java.util.ArrayDeque, []);
this.allocateElements (numElements);
}, "~N");
Clazz.makeConstructor (c$, 
function (c) {
Clazz.superConstructor (this, java.util.ArrayDeque, []);
this.allocateElements (c.size ());
this.addAll (c);
}, "java.util.Collection");
Clazz.overrideMethod (c$, "addFirst", 
function (e) {
if (e == null) throw  new NullPointerException ();
this.elements[this.head = (this.head - 1) & (this.elements.length - 1)] = e;
if (this.head == this.tail) this.doubleCapacity ();
}, "~O");
Clazz.overrideMethod (c$, "addLast", 
function (e) {
if (e == null) throw  new NullPointerException ();
this.elements[this.tail] = e;
if ((this.tail = (this.tail + 1) & (this.elements.length - 1)) == this.head) this.doubleCapacity ();
}, "~O");
Clazz.overrideMethod (c$, "offerFirst", 
function (e) {
this.addFirst (e);
return true;
}, "~O");
Clazz.overrideMethod (c$, "offerLast", 
function (e) {
this.addLast (e);
return true;
}, "~O");
Clazz.overrideMethod (c$, "removeFirst", 
function () {
var x = this.pollFirst ();
if (x == null) throw  new java.util.NoSuchElementException ();
return x;
});
Clazz.overrideMethod (c$, "removeLast", 
function () {
var x = this.pollLast ();
if (x == null) throw  new java.util.NoSuchElementException ();
return x;
});
Clazz.overrideMethod (c$, "pollFirst", 
function () {
var h = this.head;
var result = this.elements[h];
if (result == null) return null;
this.elements[h] = null;
this.head = (h + 1) & (this.elements.length - 1);
return result;
});
Clazz.overrideMethod (c$, "pollLast", 
function () {
var t = (this.tail - 1) & (this.elements.length - 1);
var result = this.elements[t];
if (result == null) return null;
this.elements[t] = null;
this.tail = t;
return result;
});
Clazz.overrideMethod (c$, "getFirst", 
function () {
var x = this.elements[this.head];
if (x == null) throw  new java.util.NoSuchElementException ();
return x;
});
Clazz.overrideMethod (c$, "getLast", 
function () {
var x = this.elements[(this.tail - 1) & (this.elements.length - 1)];
if (x == null) throw  new java.util.NoSuchElementException ();
return x;
});
Clazz.overrideMethod (c$, "peekFirst", 
function () {
return this.elements[this.head];
});
Clazz.overrideMethod (c$, "peekLast", 
function () {
return this.elements[(this.tail - 1) & (this.elements.length - 1)];
});
Clazz.overrideMethod (c$, "removeFirstOccurrence", 
function (o) {
if (o == null) return false;
var mask = this.elements.length - 1;
var i = this.head;
var x;
while ((x = this.elements[i]) != null) {
if (o.equals (x)) {
this.$delete (i);
return true;
}i = (i + 1) & mask;
}
return false;
}, "~O");
Clazz.overrideMethod (c$, "removeLastOccurrence", 
function (o) {
if (o == null) return false;
var mask = this.elements.length - 1;
var i = (this.tail - 1) & mask;
var x;
while ((x = this.elements[i]) != null) {
if (o.equals (x)) {
this.$delete (i);
return true;
}i = (i - 1) & mask;
}
return false;
}, "~O");
Clazz.overrideMethod (c$, "add", 
function (e) {
this.addLast (e);
return true;
}, "~O");
Clazz.overrideMethod (c$, "offer", 
function (e) {
return this.offerLast (e);
}, "~O");
Clazz.defineMethod (c$, "remove", 
function () {
return this.removeFirst ();
});
Clazz.overrideMethod (c$, "poll", 
function () {
return this.pollFirst ();
});
Clazz.overrideMethod (c$, "element", 
function () {
return this.getFirst ();
});
Clazz.overrideMethod (c$, "peek", 
function () {
return this.peekFirst ();
});
Clazz.overrideMethod (c$, "push", 
function (e) {
this.addFirst (e);
}, "~O");
Clazz.overrideMethod (c$, "pop", 
function () {
return this.removeFirst ();
});
Clazz.defineMethod (c$, "checkInvariants", 
 function () {
});
Clazz.defineMethod (c$, "$delete", 
 function (i) {
this.checkInvariants ();
var elements = this.elements;
var mask = elements.length - 1;
var h = this.head;
var t = this.tail;
var front = (i - h) & mask;
var back = (t - i) & mask;
if (front >= ((t - h) & mask)) throw  new java.util.ConcurrentModificationException ();
if (front < back) {
if (h <= i) {
System.arraycopy (elements, h, elements, h + 1, front);
} else {
System.arraycopy (elements, 0, elements, 1, i);
elements[0] = elements[mask];
System.arraycopy (elements, h, elements, h + 1, mask - h);
}elements[h] = null;
this.head = (h + 1) & mask;
return false;
} else {
if (i < t) {
System.arraycopy (elements, i + 1, elements, i, back);
this.tail = t - 1;
} else {
System.arraycopy (elements, i + 1, elements, i, mask - i);
elements[mask] = elements[0];
System.arraycopy (elements, 1, elements, 0, t);
this.tail = (t - 1) & mask;
}return true;
}}, "~N");
Clazz.overrideMethod (c$, "size", 
function () {
return (this.tail - this.head) & (this.elements.length - 1);
});
Clazz.overrideMethod (c$, "isEmpty", 
function () {
return this.head == this.tail;
});
Clazz.overrideMethod (c$, "iterator", 
function () {
return Clazz.innerTypeInstance (java.util.ArrayDeque.DeqIterator, this, null);
});
Clazz.overrideMethod (c$, "descendingIterator", 
function () {
return Clazz.innerTypeInstance (java.util.ArrayDeque.DescendingIterator, this, null);
});
Clazz.overrideMethod (c$, "contains", 
function (o) {
if (o == null) return false;
var mask = this.elements.length - 1;
var i = this.head;
var x;
while ((x = this.elements[i]) != null) {
if (o.equals (x)) return true;
i = (i + 1) & mask;
}
return false;
}, "~O");
Clazz.defineMethod (c$, "remove", 
function (o) {
return this.removeFirstOccurrence (o);
}, "~O");
Clazz.overrideMethod (c$, "clear", 
function () {
var h = this.head;
var t = this.tail;
if (h != t) {
this.head = this.tail = 0;
var i = h;
var mask = this.elements.length - 1;
do {
this.elements[i] = null;
i = (i + 1) & mask;
} while (i != t);
}});
Clazz.defineMethod (c$, "toArray", 
function () {
return this.copyElements ( new Array (this.size ()));
});
Clazz.defineMethod (c$, "toArray", 
function (a) {
var size = this.size ();
if (a.length < size) a = java.lang.reflect.Array.newInstance (a.getClass ().getComponentType (), size);
this.copyElements (a);
if (a.length > size) a[size] = null;
return a;
}, "~A");
Clazz.defineMethod (c$, "clone", 
function () {
try {
var result = Clazz.superCall (this, java.util.ArrayDeque, "clone", []);
result.elements = java.util.Arrays.copyOf (this.elements, this.elements.length);
return result;
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
throw  new AssertionError ();
} else {
throw e;
}
}
});
c$.$ArrayDeque$DeqIterator$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.cursor = 0;
this.fence = 0;
this.lastRet = -1;
Clazz.instantialize (this, arguments);
}, java.util.ArrayDeque, "DeqIterator", null, java.util.Iterator);
Clazz.prepareFields (c$, function () {
this.cursor = this.b$["java.util.ArrayDeque"].head;
this.fence = this.b$["java.util.ArrayDeque"].tail;
});
Clazz.overrideMethod (c$, "hasNext", 
function () {
return this.cursor != this.fence;
});
Clazz.overrideMethod (c$, "next", 
function () {
if (this.cursor == this.fence) throw  new java.util.NoSuchElementException ();
var a = this.b$["java.util.ArrayDeque"].elements[this.cursor];
if (this.b$["java.util.ArrayDeque"].tail != this.fence || a == null) throw  new java.util.ConcurrentModificationException ();
this.lastRet = this.cursor;
this.cursor = (this.cursor + 1) & (this.b$["java.util.ArrayDeque"].elements.length - 1);
return a;
});
Clazz.overrideMethod (c$, "remove", 
function () {
if (this.lastRet < 0) throw  new IllegalStateException ();
if (this.b$["java.util.ArrayDeque"].$delete (this.lastRet)) {
this.cursor = (this.cursor - 1) & (this.b$["java.util.ArrayDeque"].elements.length - 1);
this.fence = this.b$["java.util.ArrayDeque"].tail;
}this.lastRet = -1;
});
c$ = Clazz.p0p ();
};
c$.$ArrayDeque$DescendingIterator$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.cursor = 0;
this.fence = 0;
this.lastRet = -1;
Clazz.instantialize (this, arguments);
}, java.util.ArrayDeque, "DescendingIterator", null, java.util.Iterator);
Clazz.prepareFields (c$, function () {
this.cursor = this.b$["java.util.ArrayDeque"].tail;
this.fence = this.b$["java.util.ArrayDeque"].head;
});
Clazz.overrideMethod (c$, "hasNext", 
function () {
return this.cursor != this.fence;
});
Clazz.overrideMethod (c$, "next", 
function () {
if (this.cursor == this.fence) throw  new java.util.NoSuchElementException ();
this.cursor = (this.cursor - 1) & (this.b$["java.util.ArrayDeque"].elements.length - 1);
var a = this.b$["java.util.ArrayDeque"].elements[this.cursor];
if (this.b$["java.util.ArrayDeque"].head != this.fence || a == null) throw  new java.util.ConcurrentModificationException ();
this.lastRet = this.cursor;
return a;
});
Clazz.overrideMethod (c$, "remove", 
function () {
if (this.lastRet < 0) throw  new IllegalStateException ();
if (!this.b$["java.util.ArrayDeque"].$delete (this.lastRet)) {
this.cursor = (this.cursor + 1) & (this.b$["java.util.ArrayDeque"].elements.length - 1);
this.fence = this.b$["java.util.ArrayDeque"].head;
}this.lastRet = -1;
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"MIN_INITIAL_CAPACITY", 8);
});
