Clazz.declarePackage ("org.eclipse.core.internal.runtime");
Clazz.load (["java.util.Map"], "org.eclipse.core.internal.runtime.ObjectMap", ["java.lang.NullPointerException", "java.util.HashMap", "$.HashSet"], function () {
c$ = Clazz.decorateAsClass (function () {
this.count = 0;
this.elements = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.runtime, "ObjectMap", null, java.util.Map);
Clazz.makeConstructor (c$, 
function () {
this.construct (16);
});
Clazz.makeConstructor (c$, 
function (initialCapacity) {
this.elements =  new Array (Math.max (initialCapacity * 2, 0));
}, "~N");
Clazz.makeConstructor (c$, 
function (map) {
this.construct (map.size ());
this.putAll (map);
}, "java.util.Map");
Clazz.overrideMethod (c$, "clear", 
function () {
this.elements = null;
this.count = 0;
});
Clazz.overrideMethod (c$, "clone", 
function () {
return  new org.eclipse.core.internal.runtime.ObjectMap (this);
});
Clazz.overrideMethod (c$, "containsKey", 
function (key) {
if (this.elements == null || this.count == 0) return false;
for (var i = 0; i < this.elements.length; i = i + 2) if (this.elements[i] != null && this.elements[i].equals (key)) return true;

return false;
}, "~O");
Clazz.overrideMethod (c$, "containsValue", 
function (value) {
if (this.elements == null || this.count == 0) return false;
for (var i = 1; i < this.elements.length; i = i + 2) if (this.elements[i] != null && this.elements[i].equals (value)) return true;

return false;
}, "~O");
Clazz.overrideMethod (c$, "entrySet", 
function () {
return this.toHashMap ().entrySet ();
});
Clazz.overrideMethod (c$, "equals", 
function (o) {
if (!(Clazz.instanceOf (o, java.util.Map))) return false;
var other = o;
if (this.count != other.size ()) return false;
if (!this.keySet ().equals (other.keySet ())) return false;
for (var i = 0; i < this.elements.length; i = i + 2) {
if (this.elements[i] != null && (!this.elements[i + 1].equals (other.get (this.elements[i])))) return false;
}
return true;
}, "~O");
Clazz.defineMethod (c$, "get", 
function (key) {
if (this.elements == null || this.count == 0) return null;
for (var i = 0; i < this.elements.length; i = i + 2) if (this.elements[i] != null && this.elements[i].equals (key)) return this.elements[i + 1];

return null;
}, "~O");
Clazz.defineMethod (c$, "grow", 
function () {
var expanded =  new Array (this.elements.length + 10);
System.arraycopy (this.elements, 0, expanded, 0, this.elements.length);
this.elements = expanded;
});
Clazz.overrideMethod (c$, "hashCode", 
function () {
var hash = 0;
for (var i = 0; i < this.elements.length; i = i + 2) {
if (this.elements[i] != null) {
hash += this.elements[i].hashCode ();
}}
return hash;
});
Clazz.overrideMethod (c$, "isEmpty", 
function () {
return this.count == 0;
});
Clazz.defineMethod (c$, "keys", 
function () {
var result =  new Array (this.count);
var next = 0;
for (var i = 0; i < this.elements.length; i = i + 2) if (this.elements[i] != null) result[next++] = this.elements[i];

return result;
});
Clazz.defineMethod (c$, "keySet", 
function () {
var result =  new java.util.HashSet (this.size ());
for (var i = 0; i < this.elements.length; i = i + 2) {
if (this.elements[i] != null) {
result.add (this.elements[i]);
}}
return result;
});
Clazz.overrideMethod (c$, "put", 
function (key, value) {
if (key == null) throw  new NullPointerException ();
if (value == null) return this.remove (key);
if (this.elements == null) this.elements =  new Array (16);
if (this.count == 0) {
this.elements[0] = key;
this.elements[1] = value;
this.count++;
return null;
}var emptyIndex = -1;
for (var i = 0; i < this.elements.length; i += 2) {
if (this.elements[i] != null) {
if (this.elements[i].equals (key)) {
var oldValue = this.elements[i + 1];
this.elements[i + 1] = value;
return oldValue;
}} else if (emptyIndex == -1) {
emptyIndex = i;
}}
if (emptyIndex == -1) emptyIndex = this.count * 2;
if (this.elements.length <= (this.count * 2)) this.grow ();
this.elements[emptyIndex] = key;
this.elements[emptyIndex + 1] = value;
this.count++;
return null;
}, "~O,~O");
Clazz.overrideMethod (c$, "putAll", 
function (map) {
for (var i = map.keySet ().iterator (); i.hasNext (); ) {
var key = i.next ();
var value = map.get (key);
this.put (key, value);
}
}, "java.util.Map");
Clazz.overrideMethod (c$, "remove", 
function (key) {
if (this.elements == null || this.count == 0) return null;
for (var i = 0; i < this.elements.length; i = i + 2) {
if (this.elements[i] != null && this.elements[i].equals (key)) {
this.elements[i] = null;
var result = this.elements[i + 1];
this.elements[i + 1] = null;
this.count--;
return result;
}}
return null;
}, "~O");
Clazz.defineMethod (c$, "shareStrings", 
function (set) {
var array = this.elements;
if (array == null) return ;
for (var i = 0; i < array.length; i++) {
var o = array[i];
if (Clazz.instanceOf (o, String)) array[i] = set.add (o);
}
}, "org.eclipse.core.internal.preferences.StringPool");
Clazz.defineMethod (c$, "size", 
function () {
return this.count;
});
Clazz.defineMethod (c$, "toHashMap", 
($fz = function () {
var result =  new java.util.HashMap (this.size ());
for (var i = 0; i < this.elements.length; i = i + 2) {
if (this.elements[i] != null) {
result.put (this.elements[i], this.elements[i + 1]);
}}
return result;
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "values", 
function () {
var result =  new java.util.HashSet (this.size ());
for (var i = 1; i < this.elements.length; i = i + 2) {
if (this.elements[i] != null) {
result.add (this.elements[i]);
}}
return result;
});
Clazz.defineStatics (c$,
"DEFAULT_SIZE", 16,
"GROW_SIZE", 10);
});
