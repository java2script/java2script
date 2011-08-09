Clazz.declarePackage ("org.eclipse.core.internal.registry");
Clazz.load (null, "org.eclipse.core.internal.registry.KeyedHashSet", ["java.lang.StringBuffer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.capacity = 0;
this.elementCount = 0;
this.$elements = null;
this.replace = false;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.registry, "KeyedHashSet");
Clazz.makeConstructor (c$, 
function () {
this.construct (7, true);
});
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
}, "org.eclipse.core.internal.registry.KeyedElement");
Clazz.defineMethod (c$, "clear", 
function () {
this.$elements =  new Array (Math.max (7, this.capacity * 2));
this.elementCount = 0;
});
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
}, "org.eclipse.core.internal.registry.KeyedElement");
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
Clazz.defineMethod (c$, "hash", 
($fz = function (element) {
return Math.abs (element.getKeyHashCode ()) % this.$elements.length;
}, $fz.isPrivate = true, $fz), "org.eclipse.core.internal.registry.KeyedElement");
Clazz.defineMethod (c$, "isEmpty", 
function () {
return this.elementCount == 0;
});
Clazz.defineMethod (c$, "keyHash", 
($fz = function (key) {
return Math.abs (key.hashCode ()) % this.$elements.length;
}, $fz.isPrivate = true, $fz), "~O");
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
}, "org.eclipse.core.internal.registry.KeyedElement");
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
Clazz.defineStatics (c$,
"MINIMUM_SIZE", 7);
});
