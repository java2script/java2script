Clazz.load (["java.util.AbstractMap", "$.AbstractSet", "$.Iterator", "$.Map", "$.MapEntry"], "java.util.IdentityHashMap", ["java.lang.IllegalArgumentException", "$.IllegalStateException", "java.util.AbstractCollection", "$.ConcurrentModificationException", "java.util.Map.Entry", "java.util.NoSuchElementException"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "IdentityHashMap", java.util.AbstractMap, [java.util.Map, java.io.Serializable, Cloneable]);

Clazz.newMethod$(C$, '$init$', function () {
this.elementData = null;
this.$size = 0;
this.threshold = 0;
this.modCount = 0;
}, 1);

Clazz.newMethod$ (C$, 'construct', function () {
C$.construct$I.apply(this, [21]);
}, 1);

Clazz.newMethod$ (C$, 'construct$I', function (maxSize) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
if (maxSize >= 0) {
this.$size = 0;
this.threshold = C$.prototype.getThreshold$I.apply(this, [maxSize]);
this.elementData = C$.prototype.newElementArray$I.apply(this, [C$.prototype.computeElementArraySize.apply(this, [])]);
} else {
throw Clazz.$new(IllegalArgumentException.construct);
}}, 1);

Clazz.newMethod$ (C$, 'getThreshold$I', function (maxSize) {
return maxSize > 3 ? maxSize : 3;
});

Clazz.newMethod$ (C$, 'computeElementArraySize', function () {
return (Clazz.doubleToInt ((this.threshold * 10000) / 7500)) * 2;
});

Clazz.newMethod$ (C$, 'newElementArray$I', function (s) {
return  Clazz.newArray$('OA', Clazz.newA$, [s]);
});

Clazz.newMethod$ (C$, 'construct$java_util_Map', function (map) {
C$.construct$I.apply(this, [map.size () < 6 ? 11 : map.size () * 2]);
C$.prototype.putAllImpl$java_util_Map.apply(this, [map]);
}, 1);

Clazz.newMethod$ (C$, 'massageValue$O', function (value) {
return ((value === java.util.IdentityHashMap.NULL_OBJECT) ? null : value);
});

Clazz.newMethod$ (C$, 'clear', function () {
this.$size = 0;
for (var i = 0; i < this.elementData.length; i++) {
this.elementData[i] = null;
}
this.modCount++;
});

Clazz.newMethod$ (C$, 'containsKey$O', function (key) {
if (key == null) {
key = java.util.IdentityHashMap.NULL_OBJECT;
}var index = C$.prototype.findIndex$O$OA.apply(this, [key, this.elementData]);
return this.elementData[index] === key;
});

Clazz.newMethod$ (C$, 'containsValue$O', function (value) {
if (value == null) {
value = java.util.IdentityHashMap.NULL_OBJECT;
}for (var i = 1; i < this.elementData.length; i = i + 2) {
if (this.elementData[i] === value) {
return true;
}}
return false;
});

Clazz.newMethod$ (C$, 'get$O', function (key) {
if (key == null) {
key = java.util.IdentityHashMap.NULL_OBJECT;
}var index = C$.prototype.findIndex$O$OA.apply(this, [key, this.elementData]);
if (this.elementData[index] === key) {
var result = this.elementData[index + 1];
return C$.prototype.massageValue$O.apply(this, [result]);
}return null;
});

Clazz.newMethod$ (C$, 'getEntry$O', function (key) {
if (key == null) {
key = java.util.IdentityHashMap.NULL_OBJECT;
}var index = C$.prototype.findIndex$O$OA.apply(this, [key, this.elementData]);
if (this.elementData[index] === key) {
return C$.prototype.getEntry$I.apply(this, [index]);
}return null;
});

Clazz.newMethod$ (C$, 'getEntry$I', function (index) {
var key = this.elementData[index];
var value = this.elementData[index + 1];
if (key === java.util.IdentityHashMap.NULL_OBJECT) {
key = null;
}if (value === java.util.IdentityHashMap.NULL_OBJECT) {
value = null;
}return Clazz.$new(java.util.IdentityHashMap.IdentityHashMapEntry.construct$TK$TV,[key, value]);
});

Clazz.newMethod$ (C$, 'findIndex$O$OA', function (key, array) {
var length = array.length;
var index = C$.prototype.getModuloHash$O$I.apply(this, [key, length]);
var last = (index + length - 2) % length;
while (index != last) {
if (array[index] === key || (array[index] == null)) {
break;
}index = (index + 2) % length;
}
return index;
});

Clazz.newMethod$ (C$, 'getModuloHash$O$I', function (key, length) {
return ((System.identityHashCode (key) & 0x7FFFFFFF) % (Clazz.doubleToInt (length / 2))) * 2;
});

Clazz.newMethod$ (C$, 'put$TK$TV', function (key, value) {
var _key = key;
var _value = value;
if (_key == null) {
_key = java.util.IdentityHashMap.NULL_OBJECT;
}if (_value == null) {
_value = java.util.IdentityHashMap.NULL_OBJECT;
}var index = C$.prototype.findIndex$O$OA.apply(this, [_key, this.elementData]);
if (this.elementData[index] !== _key) {
this.modCount++;
if (++this.$size > this.threshold) {
C$.prototype.rehash.apply(this, []);
index = C$.prototype.findIndex$O$OA.apply(this, [_key, this.elementData]);
}this.elementData[index] = _key;
this.elementData[index + 1] = null;
}var result = this.elementData[index + 1];
this.elementData[index + 1] = _value;
return C$.prototype.massageValue$O.apply(this, [result]);
});

Clazz.newMethod$ (C$, 'putAll$java_util_Map', function (map) {
C$.prototype.putAllImpl$java_util_Map.apply(this, [map]);
});

Clazz.newMethod$ (C$, 'rehash', function () {
var newlength = this.elementData.length << 1;
if (newlength == 0) {
newlength = 1;
}var newData = C$.prototype.newElementArray$I.apply(this, [newlength]);
for (var i = 0; i < this.elementData.length; i = i + 2) {
var key = this.elementData[i];
if (key != null) {
var index = C$.prototype.findIndex$O$OA.apply(this, [key, newData]);
newData[index] = key;
newData[index + 1] = this.elementData[i + 1];
}}
this.elementData = newData;
C$.prototype.computeMaxSize.apply(this, []);
});

Clazz.newMethod$ (C$, 'computeMaxSize', function () {
this.threshold = (Clazz.doubleToInt ((Clazz.doubleToInt (this.elementData.length / 2)) * 7500 / 10000));
});

Clazz.newMethod$ (C$, 'remove$O', function (key) {
if (key == null) {
key = java.util.IdentityHashMap.NULL_OBJECT;
}var hashedOk;
var index;
var next;
var hash;
var result;
var object;
index = next = C$.prototype.findIndex$O$OA.apply(this, [key, this.elementData]);
if (this.elementData[index] !== key) {
return null;
}result = this.elementData[index + 1];
var length = this.elementData.length;
while (true) {
next = (next + 2) % length;
object = this.elementData[next];
if (object == null) {
break;
}hash = C$.prototype.getModuloHash$O$I.apply(this, [object, length]);
hashedOk = hash > index;
if (next < index) {
hashedOk = hashedOk || (hash <= next);
} else {
hashedOk = hashedOk && (hash <= next);
}if (!hashedOk) {
this.elementData[index] = object;
this.elementData[index + 1] = this.elementData[next + 1];
index = next;
}}
this.$size--;
this.modCount++;
this.elementData[index] = null;
this.elementData[index + 1] = null;
return C$.prototype.massageValue$O.apply(this, [result]);
});

Clazz.newMethod$ (C$, 'entrySet', function () {
return Clazz.$new(java.util.IdentityHashMap.IdentityHashMapEntrySet.construct$java_util_IdentityHashMap,[this]);
});

Clazz.newMethod$ (C$, 'keySet', function () {
if (this.$keySet == null) {
this.$keySet = ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "IdentityHashMap$1", java.util.AbstractSet);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'contains$O', function (object) {
return this.b$["java.util.IdentityHashMap"].containsKey$O (object);
});

Clazz.newMethod$ (C$, 'size', function () {
return this.b$["java.util.IdentityHashMap"].size ();
});

Clazz.newMethod$ (C$, 'clear', function () {
this.b$["java.util.IdentityHashMap"].clear ();
});

Clazz.newMethod$ (C$, 'remove$O', function (key) {
if (this.b$["java.util.IdentityHashMap"].containsKey$O (key)) {
this.b$["java.util.IdentityHashMap"].remove$O (key);
return true;
}return false;
});

Clazz.newMethod$ (C$, 'iterator', function () {
return Clazz.$new(java.util.IdentityHashMap.IdentityHashMapIterator.construct$java_util_MapEntry_Type$java_util_IdentityHashMap,[((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "IdentityHashMap$1$1", null, java.util.MapEntry.Type);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'get$java_util_MapEntry', function (entry) {
return entry.key;
});
})()
), Clazz.$new(java.util.IdentityHashMap$1$1.$init$, [this, null])), this.b$["java.util.IdentityHashMap"]]);
});
})()
), Clazz.$new(java.util.IdentityHashMap$1.superClazz.construct, [this, null],java.util.IdentityHashMap$1));
}return this.$keySet;
});

Clazz.newMethod$ (C$, 'values', function () {
if (this.valuesCollection == null) {
this.valuesCollection = ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "IdentityHashMap$2", java.util.AbstractCollection);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'contains$O', function (object) {
return this.b$["java.util.IdentityHashMap"].containsValue$O (object);
});

Clazz.newMethod$ (C$, 'size', function () {
return this.b$["java.util.IdentityHashMap"].size ();
});

Clazz.newMethod$ (C$, 'clear', function () {
this.b$["java.util.IdentityHashMap"].clear ();
});

Clazz.newMethod$ (C$, 'iterator', function () {
return Clazz.$new(java.util.IdentityHashMap.IdentityHashMapIterator.construct$java_util_MapEntry_Type$java_util_IdentityHashMap,[((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "IdentityHashMap$2$1", null, java.util.MapEntry.Type);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'get$java_util_MapEntry', function (entry) {
return entry.value;
});
})()
), Clazz.$new(java.util.IdentityHashMap$2$1.$init$, [this, null])), this.b$["java.util.IdentityHashMap"]]);
});

Clazz.newMethod$ (C$, 'remove$O', function (object) {
var it = this.iterator ();
while (it.hasNext ()) {
if (object === it.next ()) {
it.remove ();
return true;
}}
return false;
});
})()
), Clazz.$new(java.util.IdentityHashMap$2.superClazz.construct, [this, null],java.util.IdentityHashMap$2));
}return this.valuesCollection;
});

Clazz.newMethod$ (C$, 'equals$O', function (object) {
if (this === object) {
return true;
}if (Clazz.instanceOf(object, java.util.Map)) {
var map = object;
if (this.size () != map.size ()) {
return false;
}var set = this.entrySet ();
return set.equals$O (map.entrySet ());
}return false;
});

Clazz.newMethod$ (C$, 'clone', function () {
try {
return C$.superClazz.prototype.clone.apply(this, arguments);
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
return null;
} else {
throw e;
}
}
});

Clazz.newMethod$ (C$, 'isEmpty', function () {
return this.$size == 0;
});

Clazz.newMethod$ (C$, 'size', function () {
return this.$size;
});

Clazz.newMethod$ (C$, 'writeObject$java_io_ObjectOutputStream', function (stream) {
stream.defaultWriteObject ();
stream.writeInt$I (this.$size);
var iterator = this.entrySet ().iterator ();
while (iterator.hasNext ()) {
var entry = iterator.next ();
stream.writeObject$O (entry.key);
stream.writeObject$O (entry.value);
}
});

Clazz.newMethod$ (C$, 'readObject$java_io_ObjectInputStream', function (stream) {
stream.defaultReadObject ();
var savedSize = stream.readInt ();
this.threshold = C$.prototype.getThreshold$I.apply(this, [21]);
this.elementData = C$.prototype.newElementArray$I.apply(this, [C$.prototype.computeElementArraySize.apply(this, [])]);
for (var i = savedSize; --i >= 0; ) {
var key = stream.readObject ();
this.put$TK$TV (key, stream.readObject ());
}
this.$size = savedSize;
});

Clazz.newMethod$ (C$, 'putAllImpl$java_util_Map', function (map) {
if (map.entrySet () != null) {
C$.superClazz.prototype.putAll$java_util_Map.apply(this, arguments);
}});
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.IdentityHashMap, "IdentityHashMapEntry", java.util.MapEntry);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'construct$TK$TV', function (theKey, theValue) {
C$.superClazz.construct$TK$TV.apply(this, [theKey, theValue]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'clone', function () {
return C$.superClazz.prototype.clone.apply(this, arguments);
});

Clazz.newMethod$ (C$, 'equals$O', function (object) {
if (this === object) {
return true;
}if (Clazz.instanceOf(object, java.util.Map.Entry)) {
var entry = object;
return (this.key === entry.getKey ()) && (this.value === entry.getValue ());
}return false;
});

Clazz.newMethod$ (C$, 'hashCode', function () {
return System.identityHashCode (this.key) ^ System.identityHashCode (this.value);
});

Clazz.newMethod$ (C$, 'toString', function () {
return this.key + "=" + this.value;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.IdentityHashMap, "IdentityHashMapIterator", null, java.util.Iterator);

Clazz.newMethod$(C$, '$init$', function () {
this.position = 0;
this.lastPosition = 0;
this.associatedMap = null;
this.expectedModCount = 0;
this.type = null;
this.canRemove = false;
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_MapEntry_Type$java_util_IdentityHashMap', function (value, hm) {
C$.$init$.apply(this);
this.associatedMap = hm;
this.type = value;
this.expectedModCount = hm.modCount;
}, 1);

Clazz.newMethod$ (C$, 'hasNext', function () {
while (this.position < this.associatedMap.elementData.length) {
if (this.associatedMap.elementData[this.position] == null) {
this.position += 2;
} else {
return true;
}}
return false;
});

Clazz.newMethod$ (C$, 'checkConcurrentMod', function () {
if (this.expectedModCount != this.associatedMap.modCount) {
throw Clazz.$new(java.util.ConcurrentModificationException.construct);
}});

Clazz.newMethod$ (C$, 'next', function () {
this.checkConcurrentMod ();
if (!this.hasNext ()) {
throw Clazz.$new(java.util.NoSuchElementException.construct);
}var result = this.associatedMap.getEntry$I (this.position);
this.lastPosition = this.position;
this.position += 2;
this.canRemove = true;
return this.type.get$java_util_MapEntry (result);
});

Clazz.newMethod$ (C$, 'remove', function () {
this.checkConcurrentMod ();
if (!this.canRemove) {
throw Clazz.$new(IllegalStateException.construct);
}this.canRemove = false;
this.associatedMap.remove$O (this.associatedMap.elementData[this.lastPosition]);
this.position = this.lastPosition;
this.expectedModCount++;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.IdentityHashMap, "IdentityHashMapEntrySet", java.util.AbstractSet);

Clazz.newMethod$(C$, '$init$', function () {
this.associatedMap = null;
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_IdentityHashMap', function (hm) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.associatedMap = hm;
}, 1);

Clazz.newMethod$ (C$, 'hashMap', function () {
return this.associatedMap;
});

Clazz.newMethod$ (C$, 'size', function () {
return this.associatedMap.$size;
});

Clazz.newMethod$ (C$, 'clear', function () {
this.associatedMap.clear ();
});

Clazz.newMethod$ (C$, 'remove$O', function (object) {
if (this.contains$O (object)) {
this.associatedMap.remove$O ((object).getKey ());
return true;
}return false;
});

Clazz.newMethod$ (C$, 'contains$O', function (object) {
if (Clazz.instanceOf(object, java.util.Map.Entry)) {
var entry = this.associatedMap.getEntry$O ((object).getKey ());
return entry != null && entry.equals$O (object);
}return false;
});

Clazz.newMethod$ (C$, 'iterator', function () {
return Clazz.$new(java.util.IdentityHashMap.IdentityHashMapIterator.construct$java_util_MapEntry_Type$java_util_IdentityHashMap,[((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "IdentityHashMap$IdentityHashMapEntrySet$1", null, java.util.MapEntry.Type);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'get$java_util_MapEntry', function (entry) {
return entry;
});
})()
), Clazz.$new(java.util.IdentityHashMap$IdentityHashMapEntrySet$1.$init$, [this, null])), this.associatedMap]);
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
Clazz.defineStatics (C$,
"DEFAULT_MAX_SIZE", 21,
"loadFactor", 7500);
C$.NULL_OBJECT = C$.prototype.NULL_OBJECT =  new Clazz._O();
})()
});

//Created 2017-08-12 07:32:19
