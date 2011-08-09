Clazz.declarePackage ("org.eclipse.core.internal.registry");
Clazz.load (["java.lang.ref.SoftReference", "$.ReferenceQueue"], "org.eclipse.core.internal.registry.ReferenceMap", ["java.lang.Error", "$.IllegalArgumentException", "$.NullPointerException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.entryCount = 0;
this.loadFactor = 0;
this.queue = null;
this.size = 0;
this.table = null;
this.threshold = 0;
this.valueType = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.registry, "ReferenceMap");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.key = 0;
this.next = null;
this.value = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.registry.ReferenceMap, "HardRef", null, org.eclipse.core.internal.registry.ReferenceMap.IEntry);
Clazz.makeConstructor (c$, 
function (a, b, c) {
this.key = a;
this.value = b;
this.next = c;
}, "~N,~O,org.eclipse.core.internal.registry.ReferenceMap.IEntry");
Clazz.overrideMethod (c$, "getKey", 
function () {
return this.key;
});
Clazz.overrideMethod (c$, "getNext", 
function () {
return this.next;
});
Clazz.overrideMethod (c$, "getValue", 
function () {
return this.value;
});
Clazz.overrideMethod (c$, "setNext", 
function (a) {
this.next = a;
}, "org.eclipse.core.internal.registry.ReferenceMap.IEntry");
Clazz.overrideMethod (c$, "toString", 
function () {
return "HardRef(" + this.key + ',' + this.value + ')';
});
c$ = Clazz.p0p ();
Clazz.declareInterface (org.eclipse.core.internal.registry.ReferenceMap, "IEntry");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.key = 0;
this.$next = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.registry.ReferenceMap, "SoftRef", java.lang.ref.SoftReference, org.eclipse.core.internal.registry.ReferenceMap.IEntry);
Clazz.makeConstructor (c$, 
function (a, b, c, d) {
Clazz.superConstructor (this, org.eclipse.core.internal.registry.ReferenceMap.SoftRef, [b, d]);
this.key = a;
this.$next = c;
}, "~N,~O,org.eclipse.core.internal.registry.ReferenceMap.IEntry,java.lang.ref.ReferenceQueue");
Clazz.overrideMethod (c$, "getKey", 
function () {
return this.key;
});
Clazz.overrideMethod (c$, "getNext", 
function () {
return this.$next;
});
Clazz.overrideMethod (c$, "getValue", 
function () {
return Clazz.superCall (this, org.eclipse.core.internal.registry.ReferenceMap.SoftRef, "get", []);
});
Clazz.overrideMethod (c$, "setNext", 
function (a) {
this.$next = a;
}, "org.eclipse.core.internal.registry.ReferenceMap.IEntry");
c$ = Clazz.p0p ();
Clazz.prepareFields (c$, function () {
this.queue =  new java.lang.ref.ReferenceQueue ();
});
Clazz.makeConstructor (c$, 
function (referenceType, capacity, loadFactor) {
if (referenceType != 0 && referenceType != 1) throw  new IllegalArgumentException (" must be HARD or SOFT.");
if (capacity <= 0) throw  new IllegalArgumentException ("capacity must be positive");
if ((loadFactor <= 0.0) || (loadFactor >= 1.0)) throw  new IllegalArgumentException ("Load factor must be greater than 0 and less than 1.");
this.valueType = referenceType;
var initialSize = 1;
while (initialSize < capacity) initialSize *= 2;

this.table =  new Array (initialSize);
this.loadFactor = loadFactor;
this.threshold = Math.round ((initialSize * loadFactor));
}, "~N,~N,~N");
Clazz.defineMethod (c$, "doRemove", 
($fz = function (key) {
var index = this.indexFor (key);
var previous = null;
var entry = this.table[index];
while (entry != null) {
if (key == entry.getKey ()) {
if (previous == null) this.table[index] = entry.getNext ();
 else previous.setNext (entry.getNext ());
this.size--;
return entry.getValue ();
}previous = entry;
entry = entry.getNext ();
}
return null;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "get", 
function (key) {
this.purge ();
for (var entry = this.table[this.indexFor (key)]; entry != null; entry = entry.getNext ()) if (entry.getKey () == key) return entry.getValue ();

return null;
}, "~N");
Clazz.defineMethod (c$, "indexFor", 
($fz = function (hash) {
hash += ~(hash << 15);
hash ^= (hash >>> 10);
hash += (hash << 3);
hash ^= (hash >>> 6);
hash += ~(hash << 11);
hash ^= (hash >>> 16);
return hash & (this.table.length - 1);
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "newEntry", 
($fz = function (key, value, next) {
this.entryCount++;
switch (this.valueType) {
case 0:
return  new org.eclipse.core.internal.registry.ReferenceMap.HardRef (key, value, next);
case 1:
return  new org.eclipse.core.internal.registry.ReferenceMap.SoftRef (key, value, next, this.queue);
default:
throw  new Error ();
}
}, $fz.isPrivate = true, $fz), "~N,~O,org.eclipse.core.internal.registry.ReferenceMap.IEntry");
Clazz.defineMethod (c$, "purge", 
($fz = function () {
var ref = this.queue.poll ();
while (ref != null) {
this.doRemove ((ref).getKey ());
ref.clear ();
ref = this.queue.poll ();
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "put", 
function (key, value) {
if (value == null) throw  new NullPointerException ("null values not allowed");
this.purge ();
if (this.size + 1 > this.threshold) this.resize ();
var index = this.indexFor (key);
var previous = null;
var entry = this.table[index];
while (entry != null) {
if (key == entry.getKey ()) {
if (previous == null) this.table[index] = this.newEntry (key, value, entry.getNext ());
 else previous.setNext (this.newEntry (key, value, entry.getNext ()));
return ;
}previous = entry;
entry = entry.getNext ();
}
this.size++;
this.table[index] = this.newEntry (key, value, this.table[index]);
}, "~N,~O");
Clazz.defineMethod (c$, "remove", 
function (key) {
this.purge ();
return this.doRemove (key);
}, "~N");
Clazz.defineMethod (c$, "resize", 
($fz = function () {
var old = this.table;
this.table =  new Array (old.length * 2);
for (var i = 0; i < old.length; i++) {
var next = old[i];
while (next != null) {
var entry = next;
next = next.getNext ();
var index = this.indexFor (entry.getKey ());
entry.setNext (this.table[index]);
this.table[index] = entry;
}
old[i] = null;
}
this.threshold = Math.round ((this.table.length * this.loadFactor));
}, $fz.isPrivate = true, $fz));
Clazz.defineStatics (c$,
"HARD", 0,
"SOFT", 1);
});
