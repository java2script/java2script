Clazz.declarePackage ("org.eclipse.core.internal.registry");
Clazz.load (null, "org.eclipse.core.internal.registry.HashtableOfStringAndInt", ["java.lang.CloneNotSupportedException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.keyTable = null;
this.valueTable = null;
this.elementSize = 0;
this.threshold = 0;
Clazz.instantialize (this, arguments);
}, org.eclipse.core.internal.registry, "HashtableOfStringAndInt", null, Cloneable);
Clazz.makeConstructor (c$, 
function () {
this.construct (13);
});
Clazz.makeConstructor (c$, 
function (size) {
this.elementSize = 0;
this.threshold = size;
var extraRoom = Math.round ((size * 1.75));
if (this.threshold == extraRoom) extraRoom++;
this.keyTable =  new Array (extraRoom);
this.valueTable =  Clazz.newArray (extraRoom, 0);
}, "~N");
Clazz.overrideMethod (c$, "clone", 
function () {
throw  new CloneNotSupportedException ();
});
Clazz.defineMethod (c$, "containsKey", 
function (key) {
var index = (key.hashCode () & 0x7FFFFFFF) % this.valueTable.length;
var keyLength = key.length;
var currentKey;
while ((currentKey = this.keyTable[index]) != null) {
if (currentKey.length == keyLength && currentKey.equals (key)) return true;
index = (index + 1) % this.keyTable.length;
}
return false;
}, "~S");
Clazz.defineMethod (c$, "get", 
function (key) {
var index = (key.hashCode () & 0x7FFFFFFF) % this.valueTable.length;
var keyLength = key.length;
var currentKey;
while ((currentKey = this.keyTable[index]) != null) {
if (currentKey.length == keyLength && currentKey.equals (key)) return this.valueTable[index];
index = (index + 1) % this.keyTable.length;
}
return -2147483648;
}, "~S");
Clazz.defineMethod (c$, "put", 
function (key, value) {
var index = (key.hashCode () & 0x7FFFFFFF) % this.valueTable.length;
var keyLength = key.length;
var currentKey;
while ((currentKey = this.keyTable[index]) != null) {
if (currentKey.length == keyLength && currentKey.equals (key)) return this.valueTable[index] = value;
index = (index + 1) % this.keyTable.length;
}
this.keyTable[index] = key;
this.valueTable[index] = value;
if (++this.elementSize > this.threshold) this.rehash ();
return value;
}, "~S,~N");
Clazz.defineMethod (c$, "removeKey", 
function (key) {
var index = (key.hashCode () & 0x7FFFFFFF) % this.valueTable.length;
var keyLength = key.length;
var currentKey;
while ((currentKey = this.keyTable[index]) != null) {
if (currentKey.length == keyLength && currentKey.equals (key)) {
var value = this.valueTable[index];
this.elementSize--;
this.keyTable[index] = null;
this.valueTable[index] = -2147483648;
this.rehash ();
return value;
}index = (index + 1) % this.keyTable.length;
}
return -2147483648;
}, "~S");
Clazz.defineMethod (c$, "rehash", 
($fz = function () {
var newHashtable =  new org.eclipse.core.internal.registry.HashtableOfStringAndInt (Math.round ((this.elementSize * 1.33)));
var currentKey;
for (var i = this.keyTable.length; --i >= 0; ) if ((currentKey = this.keyTable[i]) != null) newHashtable.put (currentKey, this.valueTable[i]);

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
for (var i = 0, length = this.valueTable.length; i < length; i++) if ((object = this.valueTable[i]) != -2147483648) s +=  String.instantialize (this.keyTable[i]) + " -> " + object + "\n";

return s;
});
Clazz.defineMethod (c$, "getValues", 
function () {
var keyTableLength = this.keyTable.length;
var result =  Clazz.newArray (this.size (), 0);
var j = 0;
for (var i = 0; i < keyTableLength; i++) {
if (this.keyTable[i] != null) result[j++] = this.valueTable[i];
}
return result;
});
Clazz.defineMethod (c$, "save", 
function (out) {
out.writeInt (this.elementSize);
var tableSize = this.keyTable.length;
out.writeInt (tableSize);
out.writeInt (this.threshold);
for (var i = 0; i < tableSize; i++) {
this.writeStringOrNull (this.keyTable[i], out);
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
this.keyTable =  new Array (Math.round ((this.elementSize * 1.33)));
this.valueTable =  Clazz.newArray (Math.round ((this.elementSize * 1.33)), 0);
this.elementSize = 0;
fastMode = false;
} else {
this.keyTable =  new Array (tableSize);
this.valueTable =  Clazz.newArray (tableSize, 0);
}for (var i = 0; i < tableSize; i++) {
var key = this.readStringOrNull ($in);
var value = $in.readInt ();
if (fastMode) {
this.keyTable[i] = key;
this.valueTable[i] = value;
} else {
if (key != null) this.put (key, value);
}}
}, "java.io.DataInputStream");
Clazz.defineMethod (c$, "writeStringOrNull", 
($fz = function (string, out) {
if (string == null) out.writeByte (0);
 else {
out.writeByte (1);
out.writeUTF (string);
}}, $fz.isPrivate = true, $fz), "~S,java.io.DataOutputStream");
Clazz.defineMethod (c$, "readStringOrNull", 
($fz = function ($in) {
var type = $in.readByte ();
if (type == 0) return null;
return $in.readUTF ();
}, $fz.isPrivate = true, $fz), "java.io.DataInputStream");
Clazz.defineStatics (c$,
"MISSING_ELEMENT", -2147483648,
"GROWTH_FACTOR", 1.33,
"NULL", 0,
"OBJECT", 1);
});
