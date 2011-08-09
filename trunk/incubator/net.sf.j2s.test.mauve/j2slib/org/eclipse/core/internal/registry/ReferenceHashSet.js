Clazz.declarePackage ("org.eclipse.core.internal.registry");
Clazz.load (["java.lang.ref.SoftReference", "$.WeakReference", "$.ReferenceQueue"], "org.eclipse.core.internal.registry.ReferenceHashSet", ["java.lang.Error", "$.StringBuffer"], function () {
c$ = Clazz.decorateAsClass (function () {
if (!Clazz.isClassDefined ("org.eclipse.core.internal.registry.ReferenceHashSet.HashableWeakReference")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.$hashCode = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.registry.ReferenceHashSet, "HashableWeakReference", java.lang.ref.WeakReference, org.eclipse.core.internal.registry.ReferenceHashSet.HashedReference);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, org.eclipse.core.internal.registry.ReferenceHashSet.HashableWeakReference, [a, b]);
this.$hashCode = a.hashCode ();
}, "~O,java.lang.ref.ReferenceQueue");
Clazz.defineMethod (c$, "equals", 
function (a) {
if (!(Clazz.instanceOf (a, org.eclipse.core.internal.registry.ReferenceHashSet.HashableWeakReference))) return false;
var b = this.get ();
var c = (a).get ();
if (b == null) return c == null;
return b.equals (c);
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.$hashCode;
});
Clazz.defineMethod (c$, "toString", 
function () {
var a = this.get ();
if (a == null) return "[hashCode=" + this.$hashCode + "] <referent was garbage collected>";
return "[hashCode=" + this.$hashCode + "] " + a.toString ();
});
c$ = Clazz.p0p ();
}
if (!Clazz.isClassDefined ("org.eclipse.core.internal.registry.ReferenceHashSet.HashableSoftReference")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.$hashCode = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.registry.ReferenceHashSet, "HashableSoftReference", java.lang.ref.SoftReference, org.eclipse.core.internal.registry.ReferenceHashSet.HashedReference);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, org.eclipse.core.internal.registry.ReferenceHashSet.HashableSoftReference, [a, b]);
this.$hashCode = a.hashCode ();
}, "~O,java.lang.ref.ReferenceQueue");
Clazz.defineMethod (c$, "equals", 
function (a) {
if (!(Clazz.instanceOf (a, org.eclipse.core.internal.registry.ReferenceHashSet.HashableWeakReference))) return false;
var b = this.get ();
var c = (a).get ();
if (b == null) return c == null;
return b.equals (c);
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.$hashCode;
});
Clazz.defineMethod (c$, "toString", 
function () {
var a = this.get ();
if (a == null) return "[hashCode=" + this.$hashCode + "] <referent was garbage collected>";
return "[hashCode=" + this.$hashCode + "] " + a.toString ();
});
c$ = Clazz.p0p ();
}
if (!Clazz.isClassDefined ("org.eclipse.core.internal.registry.ReferenceHashSet.StrongReference")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.referent = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.registry.ReferenceHashSet, "StrongReference", null, org.eclipse.core.internal.registry.ReferenceHashSet.HashedReference);
Clazz.makeConstructor (c$, 
function (a, b) {
this.referent = a;
}, "~O,java.lang.ref.ReferenceQueue");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.referent.hashCode ();
});
Clazz.overrideMethod (c$, "get", 
function () {
return this.referent;
});
Clazz.defineMethod (c$, "equals", 
function (a) {
return this.referent.equals (a);
}, "~O");
c$ = Clazz.p0p ();
}
this.values = null;
this.elementSize = 0;
this.threshold = 0;
this.referenceQueue = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.registry, "ReferenceHashSet");
Clazz.declareInterface (org.eclipse.core.internal.registry.ReferenceHashSet, "HashedReference");
Clazz.prepareFields (c$, function () {
this.referenceQueue =  new java.lang.ref.ReferenceQueue ();
});
Clazz.makeConstructor (c$, 
function () {
this.construct (5);
});
Clazz.makeConstructor (c$, 
function (size) {
this.elementSize = 0;
this.threshold = size;
var extraRoom = Math.round ((size * 1.75));
if (this.threshold == extraRoom) extraRoom++;
this.values =  new Array (extraRoom);
}, "~N");
Clazz.defineMethod (c$, "toReference", 
($fz = function (type, referent) {
switch (type) {
case 0:
return Clazz.innerTypeInstance (org.eclipse.core.internal.registry.ReferenceHashSet.StrongReference, this, null, referent, this.referenceQueue);
case 1:
return Clazz.innerTypeInstance (org.eclipse.core.internal.registry.ReferenceHashSet.HashableSoftReference, this, null, referent, this.referenceQueue);
case 2:
return Clazz.innerTypeInstance (org.eclipse.core.internal.registry.ReferenceHashSet.HashableWeakReference, this, null, referent, this.referenceQueue);
default:
throw  new Error ();
}
}, $fz.isPrivate = true, $fz), "~N,~O");
Clazz.defineMethod (c$, "add", 
function (obj, referenceType) {
this.cleanupGarbageCollectedValues ();
var index = (obj.hashCode () & 0x7FFFFFFF) % this.values.length;
var currentValue;
while ((currentValue = this.values[index]) != null) {
var referent;
if (obj.equals (referent = currentValue.get ())) {
return referent;
}index = (index + 1) % this.values.length;
}
this.values[index] = this.toReference (referenceType, obj);
if (++this.elementSize > this.threshold) this.rehash ();
return obj;
}, "~O,~N");
Clazz.defineMethod (c$, "addValue", 
($fz = function (value) {
var obj = value.get ();
if (obj == null) return ;
var valuesLength = this.values.length;
var index = (value.hashCode () & 0x7FFFFFFF) % valuesLength;
var currentValue;
while ((currentValue = this.values[index]) != null) {
if (obj.equals (currentValue.get ())) {
return ;
}index = (index + 1) % valuesLength;
}
this.values[index] = value;
if (++this.elementSize > this.threshold) this.rehash ();
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.registry.ReferenceHashSet.HashedReference");
Clazz.defineMethod (c$, "cleanupGarbageCollectedValues", 
($fz = function () {
var toBeRemoved;
while ((toBeRemoved = this.referenceQueue.poll ()) != null) {
var hashCode = toBeRemoved.hashCode ();
var valuesLength = this.values.length;
var index = (hashCode & 0x7FFFFFFF) % valuesLength;
var currentValue;
while ((currentValue = this.values[index]) != null) {
if (currentValue === toBeRemoved) {
var sameHash = index;
var current;
while ((currentValue = this.values[current = (sameHash + 1) % valuesLength]) != null && currentValue.hashCode () == hashCode) sameHash = current;

this.values[index] = this.values[sameHash];
this.values[sameHash] = null;
this.elementSize--;
break;
}index = (index + 1) % valuesLength;
}
}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "contains", 
function (obj) {
return this.get (obj) != null;
}, "~O");
Clazz.defineMethod (c$, "get", 
function (obj) {
this.cleanupGarbageCollectedValues ();
var valuesLength = this.values.length;
var index = (obj.hashCode () & 0x7FFFFFFF) % valuesLength;
var currentValue;
while ((currentValue = this.values[index]) != null) {
var referent;
if (obj.equals (referent = currentValue.get ())) {
return referent;
}index = (index + 1) % valuesLength;
}
return null;
}, "~O");
Clazz.defineMethod (c$, "rehash", 
($fz = function () {
var newHashSet =  new org.eclipse.core.internal.registry.ReferenceHashSet (this.elementSize * 2);
newHashSet.referenceQueue = this.referenceQueue;
var currentValue;
for (var i = 0, length = this.values.length; i < length; i++) if ((currentValue = this.values[i]) != null) newHashSet.addValue (currentValue);

this.values = newHashSet.values;
this.threshold = newHashSet.threshold;
this.elementSize = newHashSet.elementSize;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "remove", 
function (obj) {
this.cleanupGarbageCollectedValues ();
var valuesLength = this.values.length;
var index = (obj.hashCode () & 0x7FFFFFFF) % valuesLength;
var currentValue;
while ((currentValue = this.values[index]) != null) {
var referent;
if (obj.equals (referent = currentValue.get ())) {
this.elementSize--;
this.values[index] = null;
this.rehash ();
return referent;
}index = (index + 1) % valuesLength;
}
return null;
}, "~O");
Clazz.defineMethod (c$, "size", 
function () {
return this.elementSize;
});
Clazz.defineMethod (c$, "toString", 
function () {
var buffer =  new StringBuffer ("{");
for (var i = 0, length = this.values.length; i < length; i++) {
var value = this.values[i];
if (value != null) {
var ref = value.get ();
if (ref != null) {
buffer.append (ref.toString ());
buffer.append (", ");
}}}
buffer.append ("}");
return buffer.toString ();
});
Clazz.defineMethod (c$, "toArray", 
function () {
this.cleanupGarbageCollectedValues ();
var result =  new Array (this.elementSize);
var resultSize = 0;
for (var i = 0; i < this.values.length; i++) {
if (this.values[i] == null) continue ;var tmp = this.values[i].get ();
if (tmp != null) result[resultSize++] = tmp;
}
if (result.length == resultSize) return result;
var finalResult =  new Array (resultSize);
System.arraycopy (result, 0, finalResult, 0, resultSize);
return finalResult;
});
Clazz.defineStatics (c$,
"HARD", 0,
"SOFT", 1,
"WEAK", 2);
});
