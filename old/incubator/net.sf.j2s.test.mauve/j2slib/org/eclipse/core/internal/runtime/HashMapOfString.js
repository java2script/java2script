Clazz.declarePackage ("org.eclipse.core.internal.runtime");
c$ = Clazz.decorateAsClass (function () {
this.elementSize = 0;
this.keyTable = null;
this.threshold = 0;
this.valueTable = null;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.runtime, "HashMapOfString");
Clazz.makeConstructor (c$, 
function () {
this.construct (16);
});
Clazz.makeConstructor (c$, 
function (size) {
this.elementSize = 0;
var tableLen = 1;
while (tableLen < size) tableLen *= 2;

this.keyTable =  new Array (tableLen);
this.valueTable =  new Array (tableLen);
this.threshold = Math.round ((tableLen * 0.45));
}, "~N");
Clazz.defineMethod (c$, "get", 
function (key) {
var lengthMask = this.keyTable.length - 1;
var index = key.hashCode () & lengthMask;
var currentKey;
while ((currentKey = this.keyTable[index]) != null) {
if (currentKey.equals (key)) return this.valueTable[index];
index = (index + 1) & lengthMask;
}
return null;
}, "~S");
Clazz.defineMethod (c$, "isEmpty", 
function () {
return this.elementSize == 0;
});
Clazz.defineMethod (c$, "keys", 
function () {
var result =  new Array (this.elementSize);
var next = 0;
for (var i = 0; i < this.keyTable.length; i++) if (this.keyTable[i] != null) result[next++] = this.keyTable[i];

return result;
});
Clazz.defineMethod (c$, "put", 
function (key, value) {
var lengthMask = this.keyTable.length - 1;
var index = key.hashCode () & lengthMask;
var currentKey;
while ((currentKey = this.keyTable[index]) != null) {
if (currentKey.equals (key)) return this.valueTable[index] = value;
index = (index + 1) & lengthMask;
}
this.keyTable[index] = key;
this.valueTable[index] = value;
if (++this.elementSize > this.threshold) this.rehash (this.keyTable.length * 2);
return value;
}, "~S,~S");
Clazz.defineMethod (c$, "rehash", 
($fz = function (newLen) {
var newHashtable =  new org.eclipse.core.internal.runtime.HashMapOfString (newLen);
var currentKey;
var oldLen = this.keyTable.length;
for (var i = oldLen; --i >= 0; ) if ((currentKey = this.keyTable[i]) != null) newHashtable.put (currentKey, this.valueTable[i]);

this.keyTable = newHashtable.keyTable;
this.valueTable = newHashtable.valueTable;
this.threshold = newHashtable.threshold;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "removeKey", 
function (key) {
var lengthMask = this.keyTable.length - 1;
var index = key.hashCode () & lengthMask;
var currentKey;
while ((currentKey = this.keyTable[index]) != null) {
if (currentKey.equals (key)) {
var value = this.valueTable[index];
this.elementSize--;
this.keyTable[index] = null;
this.valueTable[index] = null;
this.rehash (Math.round ((this.elementSize / 0.45)));
return value;
}index = (index + 1) & lengthMask;
}
return null;
}, "~S");
Clazz.defineMethod (c$, "shareStrings", 
function (set) {
var array = this.keyTable;
if (array == null) return ;
for (var i = 0; i < array.length; i++) {
var o = array[i];
if (o != null) array[i] = set.add (o);
}
array = this.valueTable;
if (array == null) return ;
for (var i = 0; i < array.length; i++) {
var o = array[i];
if (o != null) array[i] = set.add (o);
}
}, "org.eclipse.core.internal.preferences.StringPool");
Clazz.defineMethod (c$, "size", 
function () {
return this.elementSize;
});
Clazz.overrideMethod (c$, "toString", 
function () {
var s = "";
var value;
for (var i = 0, length = this.valueTable.length; i < length; i++) if ((value = this.valueTable[i]) != null) s += this.keyTable[i] + " -> " + value.toString () + "\n";

return s;
});
Clazz.defineStatics (c$,
"LOAD_FACTOR", 0.45);
