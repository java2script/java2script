Clazz.declarePackage ("org.eclipse.jface.viewers");
Clazz.load (["java.util.Enumeration"], "org.eclipse.jface.viewers.CustomHashtable", ["java.lang.IllegalArgumentException", "$.NullPointerException", "$.StringBuffer", "java.util.NoSuchElementException"], function () {
c$ = Clazz.decorateAsClass (function () {
if (!Clazz.isClassDefined ("org.eclipse.jface.viewers.CustomHashtable.HashEnumerator")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.key = false;
this.start = 0;
this.entry = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers.CustomHashtable, "HashEnumerator", null, java.util.Enumeration);
Clazz.makeConstructor (c$, 
function (a) {
this.key = a;
this.start = this.b$["org.eclipse.jface.viewers.CustomHashtable"].firstSlot;
}, "~B");
Clazz.overrideMethod (c$, "hasMoreElements", 
function () {
if (this.entry != null) return true;
while (this.start <= this.b$["org.eclipse.jface.viewers.CustomHashtable"].lastSlot) if (this.b$["org.eclipse.jface.viewers.CustomHashtable"].elementData[this.start++] != null) {
this.entry = this.b$["org.eclipse.jface.viewers.CustomHashtable"].elementData[this.start - 1];
return true;
}
return false;
});
Clazz.overrideMethod (c$, "nextElement", 
function () {
if (this.hasMoreElements ()) {
var a = this.key ? this.entry.key : this.entry.value;
this.entry = this.entry.next;
return a;
} else throw  new java.util.NoSuchElementException ();
});
c$ = Clazz.p0p ();
}
this.elementCount = 0;
this.elementData = null;
this.loadFactor = 0;
this.threshold = 0;
this.firstSlot = 0;
this.lastSlot = -1;
this.comparer = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers, "CustomHashtable");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.key = null;
this.value = null;
this.next = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.jface.viewers.CustomHashtable, "HashMapEntry");
Clazz.makeConstructor (c$, 
function (a, b) {
this.key = a;
this.value = b;
}, "~O,~O");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (org.eclipse.jface.viewers.CustomHashtable, "EmptyEnumerator", null, java.util.Enumeration);
Clazz.overrideMethod (c$, "hasMoreElements", 
function () {
return false;
});
Clazz.overrideMethod (c$, "nextElement", 
function () {
throw  new java.util.NoSuchElementException ();
});
c$ = Clazz.p0p ();
Clazz.makeConstructor (c$, 
function () {
this.construct (13);
});
Clazz.makeConstructor (c$, 
function (capacity) {
this.construct (capacity, null);
}, "~N");
Clazz.makeConstructor (c$, 
function (comparer) {
this.construct (13, comparer);
}, "org.eclipse.jface.viewers.IElementComparer");
Clazz.makeConstructor (c$, 
function (capacity, comparer) {
if (capacity >= 0) {
this.elementCount = 0;
this.elementData =  new Array (capacity == 0 ? 1 : capacity);
this.firstSlot = this.elementData.length;
this.loadFactor = 0.75;
this.computeMaxSize ();
} else throw  new IllegalArgumentException ();
this.comparer = comparer;
}, "~N,org.eclipse.jface.viewers.IElementComparer");
Clazz.makeConstructor (c$, 
function (table, comparer) {
this.construct (table.size () * 2, comparer);
for (var i = table.elementData.length; --i >= 0; ) {
var entry = table.elementData[i];
while (entry != null) {
this.put (entry.key, entry.value);
entry = entry.next;
}
}
}, "org.eclipse.jface.viewers.CustomHashtable,org.eclipse.jface.viewers.IElementComparer");
Clazz.defineMethod (c$, "computeMaxSize", 
($fz = function () {
this.threshold = Math.round ((this.elementData.length * this.loadFactor));
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "containsKey", 
function (key) {
return this.getEntry (key) != null;
}, "~O");
Clazz.defineMethod (c$, "elements", 
function () {
if (this.elementCount == 0) return org.eclipse.jface.viewers.CustomHashtable.emptyEnumerator;
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.CustomHashtable.HashEnumerator, this, null, false);
});
Clazz.defineMethod (c$, "get", 
function (key) {
var index = (this.hashCode (key) & 0x7FFFFFFF) % this.elementData.length;
var entry = this.elementData[index];
while (entry != null) {
if (this.keyEquals (key, entry.key)) return entry.value;
entry = entry.next;
}
return null;
}, "~O");
Clazz.defineMethod (c$, "getEntry", 
($fz = function (key) {
var index = (this.hashCode (key) & 0x7FFFFFFF) % this.elementData.length;
var entry = this.elementData[index];
while (entry != null) {
if (this.keyEquals (key, entry.key)) return entry;
entry = entry.next;
}
return null;
}, $fz.isPrivate = true, $fz), "~O");
Clazz.defineMethod (c$, "hashCode", 
($fz = function (key) {
if (this.comparer == null) return key.hashCode ();
 else return this.comparer.hashCode (key);
}, $fz.isPrivate = true, $fz), "~O");
Clazz.defineMethod (c$, "keyEquals", 
($fz = function (a, b) {
if (this.comparer == null) return a.equals (b);
 else return this.comparer.equals (a, b);
}, $fz.isPrivate = true, $fz), "~O,~O");
Clazz.defineMethod (c$, "keys", 
function () {
if (this.elementCount == 0) return org.eclipse.jface.viewers.CustomHashtable.emptyEnumerator;
return Clazz.innerTypeInstance (org.eclipse.jface.viewers.CustomHashtable.HashEnumerator, this, null, true);
});
Clazz.defineMethod (c$, "put", 
function (key, value) {
if (key != null && value != null) {
var index = (this.hashCode (key) & 0x7FFFFFFF) % this.elementData.length;
var entry = this.elementData[index];
while (entry != null && !this.keyEquals (key, entry.key)) entry = entry.next;

if (entry == null) {
if (++this.elementCount > this.threshold) {
this.rehash ();
index = (this.hashCode (key) & 0x7FFFFFFF) % this.elementData.length;
}if (index < this.firstSlot) this.firstSlot = index;
if (index > this.lastSlot) this.lastSlot = index;
entry =  new org.eclipse.jface.viewers.CustomHashtable.HashMapEntry (key, value);
entry.next = this.elementData[index];
this.elementData[index] = entry;
return null;
}var result = entry.value;
entry.key = key;
entry.value = value;
return result;
} else throw  new NullPointerException ();
}, "~O,~O");
Clazz.defineMethod (c$, "rehash", 
($fz = function () {
var length = this.elementData.length << 1;
if (length == 0) length = 1;
this.firstSlot = length;
this.lastSlot = -1;
var newData =  new Array (length);
for (var i = this.elementData.length; --i >= 0; ) {
var entry = this.elementData[i];
while (entry != null) {
var index = (this.hashCode (entry.key) & 0x7FFFFFFF) % length;
if (index < this.firstSlot) this.firstSlot = index;
if (index > this.lastSlot) this.lastSlot = index;
var next = entry.next;
entry.next = newData[index];
newData[index] = entry;
entry = next;
}
}
this.elementData = newData;
this.computeMaxSize ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "remove", 
function (key) {
var last = null;
var index = (this.hashCode (key) & 0x7FFFFFFF) % this.elementData.length;
var entry = this.elementData[index];
while (entry != null && !this.keyEquals (key, entry.key)) {
last = entry;
entry = entry.next;
}
if (entry != null) {
if (last == null) this.elementData[index] = entry.next;
 else last.next = entry.next;
this.elementCount--;
return entry.value;
}return null;
}, "~O");
Clazz.defineMethod (c$, "size", 
function () {
return this.elementCount;
});
Clazz.overrideMethod (c$, "toString", 
function () {
if (this.size () == 0) return "{}";
var buffer =  new StringBuffer ();
buffer.append ('{');
for (var i = this.elementData.length; --i >= 0; ) {
var entry = this.elementData[i];
while (entry != null) {
buffer.append (entry.key);
buffer.append ('=');
buffer.append (entry.value);
buffer.append (", ");
entry = entry.next;
}
}
if (this.elementCount > 0) buffer.setLength (buffer.length () - 2);
buffer.append ('}');
return buffer.toString ();
});
c$.emptyEnumerator = c$.prototype.emptyEnumerator =  new org.eclipse.jface.viewers.CustomHashtable.EmptyEnumerator ();
Clazz.defineStatics (c$,
"DEFAULT_CAPACITY", 13);
});
