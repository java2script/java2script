Clazz.declarePackage ("org.eclipse.core.internal.registry");
c$ = Clazz.decorateAsClass (function () {
this.keyTable = null;
this.valueTable = null;
this.elementSize = 0;
this.threshold = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.registry, "HashtableOfInt");
Clazz.makeConstructor (c$, 
function () {
this.construct (13);
});
Clazz.makeConstructor (c$, 
function (size) {
this.elementSize = 0;
this.threshold = size;
var extraRoom = Math.round ((size * 1.33));
if (this.threshold == extraRoom) extraRoom++;
this.keyTable =  Clazz.newArray (extraRoom, 0);
this.valueTable =  Clazz.newArray (extraRoom, 0);
}, "~N");
Clazz.defineMethod (c$, "containsKey", 
function (key) {
var index = key % this.valueTable.length;
var currentKey;
while ((currentKey = this.keyTable[index]) != 0) {
if (currentKey == key) return true;
index = (index + 1) % this.keyTable.length;
}
return false;
}, "~N");
Clazz.defineMethod (c$, "get", 
function (key) {
var index = key % this.valueTable.length;
var currentKey;
while ((currentKey = this.keyTable[index]) != 0) {
if (currentKey == key) return this.valueTable[index];
index = (index + 1) % this.keyTable.length;
}
return -2147483648;
}, "~N");
Clazz.defineMethod (c$, "removeKey", 
function (key) {
var index = key % this.valueTable.length;
var currentKey;
while ((currentKey = this.keyTable[index]) != 0) {
if (currentKey == key) {
return this.valueTable[index];
}index = (index + 1) % this.keyTable.length;
}
return -2147483648;
}, "~N");
Clazz.defineMethod (c$, "put", 
function (key, value) {
var index = key % this.valueTable.length;
var currentKey;
while ((currentKey = this.keyTable[index]) != 0) {
if (currentKey == key) return this.valueTable[index] = value;
index = (index + 1) % this.keyTable.length;
}
this.keyTable[index] = key;
this.valueTable[index] = value;
if (++this.elementSize > this.threshold) this.rehash ();
return value;
}, "~N,~N");
Clazz.defineMethod (c$, "rehash", 
($fz = function () {
var newHashtable =  new org.eclipse.core.internal.registry.HashtableOfInt (Math.round ((this.elementSize * 1.33)));
var currentKey;
for (var i = this.keyTable.length; --i >= 0; ) if ((currentKey = this.keyTable[i]) != 0) newHashtable.put (currentKey, this.valueTable[i]);

this.keyTable = newHashtable.keyTable;
this.valueTable = newHashtable.valueTable;
this.threshold = newHashtable.threshold;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "size", 
function () {
return this.elementSize;
});
Clazz.overrideMethod (c$, "toString", 
function () {
var s = "";
var object;
for (var i = 0, length = this.valueTable.length; i < length; i++) if ((object = this.valueTable[i]) != -2147483648) s += this.keyTable[i] + " -> " + object + "\n";

return s;
});
Clazz.defineMethod (c$, "save", 
function (out) {
out.writeInt (this.elementSize);
var tableSize = this.keyTable.length;
out.writeInt (tableSize);
out.writeInt (this.threshold);
for (var i = 0; i < tableSize; i++) {
out.writeInt (this.keyTable[i]);
out.writeInt (this.valueTable[i]);
}
}, "java.io.DataOutputStream");
Clazz.defineMethod (c$, "load", 
function ($in) {
this.elementSize = $in.readInt ();
var tableSize = $in.readInt ();
this.threshold = $in.readInt ();
var fastMode = true;
if ((tableSize / this.elementSize) < 1.33) {
this.keyTable =  Clazz.newArray (Math.round ((this.elementSize * 1.33)), 0);
this.valueTable =  Clazz.newArray (Math.round ((this.elementSize * 1.33)), 0);
this.elementSize = 0;
fastMode = false;
} else {
this.keyTable =  Clazz.newArray (tableSize, 0);
this.valueTable =  Clazz.newArray (tableSize, 0);
}for (var i = 0; i < tableSize; i++) {
var key = $in.readInt ();
var value = $in.readInt ();
if (fastMode) {
this.keyTable[i] = key;
this.valueTable[i] = value;
} else {
this.put (key, value);
}}
}, "java.io.DataInputStream");
Clazz.defineStatics (c$,
"GROWTH_FACTOR", 1.33);
