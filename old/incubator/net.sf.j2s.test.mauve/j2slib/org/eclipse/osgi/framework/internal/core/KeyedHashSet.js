Clazz.declarePackage ("org.eclipse.osgi.framework.internal.core");
Clazz.load (["java.util.Iterator"], "org.eclipse.osgi.framework.internal.core.KeyedHashSet", ["java.lang.StringBuffer", "$.UnsupportedOperationException", "java.util.NoSuchElementException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.elementCount = 0;
this.$elements = null;
this.replace = false;
this.capacity = 0;
if (!Clazz.isClassDefined ("org.eclipse.osgi.framework.internal.core.KeyedHashSet.KeyedHashSetIterator")) {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.currentIndex = -1;
this.found = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core.KeyedHashSet, "KeyedHashSetIterator", null, java.util.Iterator);
Clazz.overrideMethod (c$, "hasNext", 
function () {
return this.found < this.b$["org.eclipse.osgi.framework.internal.core.KeyedHashSet"].elementCount;
});
Clazz.overrideMethod (c$, "next", 
function () {
if (!this.hasNext ()) throw  new java.util.NoSuchElementException ();
while (++this.currentIndex < this.b$["org.eclipse.osgi.framework.internal.core.KeyedHashSet"].$elements.length) if (this.b$["org.eclipse.osgi.framework.internal.core.KeyedHashSet"].$elements[this.currentIndex] != null) {
this.found++;
return this.b$["org.eclipse.osgi.framework.internal.core.KeyedHashSet"].$elements[this.currentIndex];
}
throw  new java.util.NoSuchElementException ();
});
Clazz.overrideMethod (c$, "remove", 
function () {
throw  new UnsupportedOperationException ();
});
c$ = Clazz.p0p ();
}
Clazz.instantialize (this, arguments);
}, org.eclipse.osgi.framework.internal.core, "KeyedHashSet");
Clazz.makeConstructor (c$, 
function () {
this.construct (7, true);
});
Clazz.makeConstructor (c$, 
function (replace) {
this.construct (7, replace);
}, "~B");
Clazz.makeConstructor (c$, 
function (capacity) {
this.construct (capacity, true);
}, "~N");
Clazz.makeConstructor (c$, 
function (capacity, replace) {
this.$elements =  new Array (Math.max (7, capacity * 2));
this.replace = replace;
this.capacity = capacity;
}, "~N,~B");
Clazz.makeConstructor (c$, 
function (original) {
this.$elements =  new Array (original.$elements.length);
System.arraycopy (original.$elements, 0, this.$elements, 0, original.$elements.length);
this.elementCount = original.elementCount;
this.replace = original.replace;
this.capacity = original.capacity;
}, "org.eclipse.osgi.framework.internal.core.KeyedHashSet");
Clazz.defineMethod (c$, "add", 
function (element) {
var hash = this.hash (element);
for (var i = hash; i < this.$elements.length; i++) {
if (this.$elements[i] == null) {
this.$elements[i] = element;
this.elementCount++;
if (this.shouldGrow ()) this.expand ();
return true;
}if (this.$elements[i].compare (element)) {
if (this.replace) this.$elements[i] = element;
return this.replace;
}}
for (var i = 0; i < hash - 1; i++) {
if (this.$elements[i] == null) {
this.$elements[i] = element;
this.elementCount++;
if (this.shouldGrow ()) this.expand ();
return true;
}if (this.$elements[i].compare (element)) {
if (this.replace) this.$elements[i] = element;
return this.replace;
}}
this.expand ();
return this.add (element);
}, "org.eclipse.osgi.framework.internal.core.KeyedElement");
Clazz.defineMethod (c$, "addAll", 
function (toAdd) {
for (var i = 0; i < toAdd.length; i++) this.add (toAdd[i]);

}, "~A");
Clazz.defineMethod (c$, "contains", 
function (element) {
return this.get (element) != null;
}, "org.eclipse.osgi.framework.internal.core.KeyedElement");
Clazz.defineMethod (c$, "containsKey", 
function (key) {
return this.getByKey (key) != null;
}, "~O");
Clazz.defineMethod (c$, "elements", 
function () {
return this.elements ( new Array (this.elementCount));
});
Clazz.defineMethod (c$, "elements", 
function (result) {
var j = 0;
for (var i = 0; i < this.$elements.length; i++) {
var element = this.$elements[i];
if (element != null) result[j++] = element;
}
return result;
}, "~A");
Clazz.defineMethod (c$, "expand", 
function () {
var oldElements = this.$elements;
this.$elements =  new Array (this.$elements.length * 2);
var maxArrayIndex = this.$elements.length - 1;
for (var i = 0; i < oldElements.length; i++) {
var element = oldElements[i];
if (element != null) {
var hash = this.hash (element);
while (this.$elements[hash] != null) {
hash++;
if (hash > maxArrayIndex) hash = 0;
}
this.$elements[hash] = element;
}}
});
Clazz.defineMethod (c$, "getByKey", 
function (key) {
if (this.elementCount == 0) return null;
var hash = this.keyHash (key);
for (var i = hash; i < this.$elements.length; i++) {
var element = this.$elements[i];
if (element == null) return null;
if (element.getKey ().equals (key)) return element;
}
for (var i = 0; i < hash - 1; i++) {
var element = this.$elements[i];
if (element == null) return null;
if (element.getKey ().equals (key)) return element;
}
return null;
}, "~O");
Clazz.defineMethod (c$, "get", 
function (key) {
if (this.elementCount == 0) return null;
var hash = this.hash (key);
for (var i = hash; i < this.$elements.length; i++) {
var element = this.$elements[i];
if (element == null) return null;
if (element.compare (key)) return element;
}
for (var i = 0; i < hash - 1; i++) {
var element = this.$elements[i];
if (element == null) return null;
if (element.compare (key)) return element;
}
return null;
}, "org.eclipse.osgi.framework.internal.core.KeyedElement");
Clazz.defineMethod (c$, "isEmpty", 
function () {
return this.elementCount == 0;
});
Clazz.defineMethod (c$, "rehashTo", 
function (anIndex) {
var target = anIndex;
var index = anIndex + 1;
if (index >= this.$elements.length) index = 0;
var element = this.$elements[index];
while (element != null) {
var hashIndex = this.hash (element);
var match;
if (index < target) match = !(hashIndex > target || hashIndex <= index);
 else match = !(hashIndex > target && hashIndex <= index);
if (match) {
this.$elements[target] = element;
target = index;
}index++;
if (index >= this.$elements.length) index = 0;
element = this.$elements[index];
}
this.$elements[target] = null;
}, "~N");
Clazz.defineMethod (c$, "removeByKey", 
function (key) {
if (this.elementCount == 0) return false;
var hash = this.keyHash (key);
for (var i = hash; i < this.$elements.length; i++) {
var element = this.$elements[i];
if (element == null) return false;
if (element.getKey ().equals (key)) {
this.rehashTo (i);
this.elementCount--;
return true;
}}
for (var i = 0; i < hash - 1; i++) {
var element = this.$elements[i];
if (element == null) return false;
if (element.getKey ().equals (key)) {
this.rehashTo (i);
this.elementCount--;
return true;
}}
return true;
}, "~O");
Clazz.defineMethod (c$, "remove", 
function (toRemove) {
if (this.elementCount == 0) return false;
var hash = this.hash (toRemove);
for (var i = hash; i < this.$elements.length; i++) {
var element = this.$elements[i];
if (element == null) return false;
if (element.compare (toRemove)) {
this.rehashTo (i);
this.elementCount--;
return true;
}}
for (var i = 0; i < hash - 1; i++) {
var element = this.$elements[i];
if (element == null) return false;
if (element.compare (toRemove)) {
this.rehashTo (i);
this.elementCount--;
return true;
}}
return false;
}, "org.eclipse.osgi.framework.internal.core.KeyedElement");
Clazz.defineMethod (c$, "hash", 
($fz = function (element) {
return Math.abs (element.getKeyHashCode ()) % this.$elements.length;
}, $fz.isPrivate = true, $fz), "org.eclipse.osgi.framework.internal.core.KeyedElement");
Clazz.defineMethod (c$, "keyHash", 
($fz = function (key) {
return Math.abs (key.hashCode ()) % this.$elements.length;
}, $fz.isPrivate = true, $fz), "~O");
Clazz.defineMethod (c$, "removeAll", 
function (toRemove) {
for (var i = 0; i < toRemove.length; i++) this.remove (toRemove[i]);

}, "~A");
Clazz.defineMethod (c$, "shouldGrow", 
($fz = function () {
return this.elementCount > this.$elements.length * 0.75;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "size", 
function () {
return this.elementCount;
});
Clazz.overrideMethod (c$, "toString", 
function () {
var result =  new StringBuffer (100);
result.append ("{");
var first = true;
for (var i = 0; i < this.$elements.length; i++) {
if (this.$elements[i] != null) {
if (first) first = false;
 else result.append (", ");
result.append (this.$elements[i]);
}}
result.append ("}");
return result.toString ();
});
Clazz.defineMethod (c$, "countCollisions", 
function () {
var result = 0;
var lastHash = 0;
var found = false;
for (var i = 0; i < this.$elements.length; i++) {
var element = this.$elements[i];
if (element == null) found = false;
 else {
var hash = this.hash (element);
if (found) if (lastHash == hash) result++;
 else found = false;
 else {
lastHash = hash;
found = true;
}}}
return result;
});
Clazz.defineMethod (c$, "iterator", 
function () {
return Clazz.innerTypeInstance (org.eclipse.osgi.framework.internal.core.KeyedHashSet.KeyedHashSetIterator, this, null);
});
Clazz.defineMethod (c$, "clear", 
function () {
this.$elements =  new Array (Math.max (7, this.capacity * 2));
this.elementCount = 0;
});
Clazz.defineStatics (c$,
"MINIMUM_SIZE", 7);
});
