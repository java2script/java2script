Clazz.load (["java.util.AbstractMap", "$.AbstractSet", "$.Iterator", "$.Map", "$.MapEntry"], "java.util.HashMap", ["java.lang.IllegalArgumentException", "$.IllegalStateException", "java.util.AbstractCollection", "$.Arrays", "$.ConcurrentModificationException", "java.util.Map.Entry", "java.util.NoSuchElementException"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "HashMap", java.util.AbstractMap, [java.util.Map, Cloneable, java.io.Serializable]);

Clazz.newMethod$(C$, '$init$', function () {
this.elementCount = 0;
this.elementData = null;
this.loadFactor = 0;
this.threshold = 0;
this.modCount = 0;
}, 1);

Clazz.newMethod$(C$, 'newElementArray$I', function (s) {
return  Clazz.newArray$('java_util_HashMap_EntryA', 1, [s]);
});

Clazz.newMethod$(C$, 'construct', function () {
C$.construct$I.apply(this, [16]);
}, 1);

Clazz.newMethod$(C$, 'construct$I', function (capacity) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
if (capacity >= 0) {
this.elementCount = 0;
this.elementData = this.newElementArray$I (capacity == 0 ? 1 : capacity);
this.loadFactor = 0.75;
C$.prototype.computeMaxSize.apply(this, []);
} else {
throw Clazz.$new(IllegalArgumentException.construct,[]);
}}, 1);

Clazz.newMethod$(C$, 'construct$I$F', function (capacity, loadFactor) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
if (capacity >= 0 && loadFactor > 0) {
this.elementCount = 0;
this.elementData = this.newElementArray$I (capacity == 0 ? 1 : capacity);
this.loadFactor = loadFactor;
C$.prototype.computeMaxSize.apply(this, []);
} else {
throw Clazz.$new(IllegalArgumentException.construct,[]);
}}, 1);

Clazz.newMethod$(C$, 'construct$java_util_Map', function (map) {
C$.construct.apply(this, []);
this.putAll$java_util_Map (map);
}, 1);

Clazz.newMethod$(C$, 'clear', function () {
if (this.elementCount > 0) {
this.elementCount = 0;
java.util.Arrays.fill$OA$O (this.elementData, null);
this.modCount++;
}});

Clazz.newMethod$(C$, 'clone', function () {
try {
var map = C$.superClazz.prototype.clone.apply(this, arguments);
map.elementData = this.newElementArray$I (this.elementData.length);
var entry;
for (var i = 0; i < this.elementData.length; i++) {
if ((entry = this.elementData[i]) != null) {
map.elementData[i] = entry.clone ();
}}
return map;
} catch (e) {
if (Clazz.exceptionOf(e, CloneNotSupportedException)){
return null;
} else {
throw e;
}
}
});

Clazz.newMethod$(C$, 'computeMaxSize', function () {
this.threshold = Clazz.floatToInt (this.elementData.length * this.loadFactor);
});

Clazz.newMethod$(C$, 'containsKey$O', function (key) {
return this.getEntry$O (key) != null;
});

Clazz.newMethod$(C$, 'keysEqual$O$java_util_HashMap_Entry', function (k1, entry) {
var k1Hash = k1 == null ? 0 : k1.hashCode ();
if (k1Hash != entry.origKeyHash) {
return false;
}if (k1 == null && entry.key == null) {
return true;
}return k1.equals$O (entry.key);
});

Clazz.newMethod$(C$, 'containsValue$O', function (value) {
if (value != null) {
for (var i = this.elementData.length; --i >= 0; ) {
var entry = this.elementData[i];
while (entry != null) {
if (value.equals$O (entry.value)) {
return true;
}entry = entry.next;
}
}
} else {
for (var i = this.elementData.length; --i >= 0; ) {
var entry = this.elementData[i];
while (entry != null) {
if (entry.value == null) {
return true;
}entry = entry.next;
}
}
}return false;
});

Clazz.newMethod$(C$, 'entrySet', function () {
return Clazz.$new(java.util.HashMap.HashMapEntrySet.construct$java_util_HashMap,[this]);
});

Clazz.newMethod$(C$, 'get$O', function (key) {
var m = this.getEntry$O (key);
if (m != null) {
return m.value;
}return null;
});

Clazz.newMethod$(C$, 'getEntry$O', function (key) {
var index = this.getModuloHash$O (key);
return this.findEntry$O$I (key, index);
});

Clazz.newMethod$(C$, 'getModuloHash$O', function (key) {
if (key == null) {
return 0;
}return (key.hashCode () & 0x7FFFFFFF) % this.elementData.length;
});

Clazz.newMethod$(C$, 'findEntry$O$I', function (key, index) {
var m;
m = this.elementData[index];
if (key != null) {
while (m != null && !this.keysEqual$O$java_util_HashMap_Entry (key, m)) {
m = m.next;
}
} else {
while (m != null && m.key != null) {
m = m.next;
}
}return m;
});

Clazz.newMethod$(C$, 'isEmpty', function () {
return this.elementCount == 0;
});

Clazz.newMethod$(C$, 'keySet', function () {
if (this.$keySet == null) {
this.$keySet = ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "HashMap$1", java.util.AbstractSet);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'contains$O', function (object) {
return this.b$["java.util.HashMap"].containsKey$O (object);
});

Clazz.newMethod$(C$, 'size', function () {
return this.b$["java.util.HashMap"].size ();
});

Clazz.newMethod$(C$, 'clear', function () {
this.b$["java.util.HashMap"].clear ();
});

Clazz.newMethod$(C$, 'remove$O', function (key) {
if (this.b$["java.util.HashMap"].containsKey$O (key)) {
this.b$["java.util.HashMap"].remove$O (key);
return true;
}return false;
});

Clazz.newMethod$(C$, 'iterator', function () {
return Clazz.$new(java.util.HashMap.HashMapIterator.construct$java_util_MapEntry_Type$java_util_HashMap,[((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "HashMap$1$1", null, java.util.MapEntry.Type);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'get$java_util_MapEntry', function (entry) {
return entry.key;
});
})()
), Clazz.$new(java.util.HashMap$1$1.$init$, [this, null])), this.b$["java.util.HashMap"]]);
});
})()
), Clazz.$new(java.util.HashMap$1.superClazz.construct, [this, null],java.util.HashMap$1));
}return this.$keySet;
});

Clazz.newMethod$(C$, 'put$TK$TV', function (key, value) {
var index = this.getModuloHash$O (key);
var entry = this.findEntry$O$I (key, index);
if (entry == null) {
this.modCount++;
if (++this.elementCount > this.threshold) {
this.rehash ();
index = key == null ? 0 : (key.hashCode () & 0x7FFFFFFF) % this.elementData.length;
}entry = this.createEntry$TK$I$TV (key, index, value);
return null;
}var result = entry.value;
entry.value = value;
return result;
});

Clazz.newMethod$(C$, 'createEntry$TK$I$TV', function (key, index, value) {
var entry = Clazz.$new(java.util.HashMap.Entry.construct$TK$TV,[key, value]);
entry.next = this.elementData[index];
this.elementData[index] = entry;
return entry;
});

Clazz.newMethod$(C$, 'putAll$java_util_Map', function (map) {
if (!map.isEmpty ()) {
var capacity = this.elementCount + map.size ();
if (capacity > this.threshold) {
this.rehash$I (capacity);
}C$.superClazz.prototype.putAll$java_util_Map.apply(this, arguments);
}});

Clazz.newMethod$(C$, 'rehash$I', function (capacity) {
var length = (capacity == 0 ? 1 : capacity << 1);
var newData = this.newElementArray$I (length);
for (var i = 0; i < this.elementData.length; i++) {
var entry = this.elementData[i];
while (entry != null) {
var key = entry.key;
var index = key == null ? 0 : (key.hashCode () & 0x7FFFFFFF) % length;
var next = entry.next;
entry.next = newData[index];
newData[index] = entry;
entry = next;
}
}
this.elementData = newData;
C$.prototype.computeMaxSize.apply(this, []);
});

Clazz.newMethod$(C$, 'rehash', function () {
this.rehash$I (this.elementData.length);
});

Clazz.newMethod$(C$, 'remove$O', function (key) {
var entry = this.removeEntry$O (key);
if (entry != null) {
return entry.value;
}return null;
});

Clazz.newMethod$(C$, 'removeEntry$O', function (key) {
var index = 0;
var entry;
var last = null;
if (key != null) {
index = (key.hashCode () & 0x7FFFFFFF) % this.elementData.length;
entry = this.elementData[index];
while (entry != null && !this.keysEqual$O$java_util_HashMap_Entry (key, entry)) {
last = entry;
entry = entry.next;
}
} else {
entry = this.elementData[0];
while (entry != null && entry.key != null) {
last = entry;
entry = entry.next;
}
}if (entry == null) {
return null;
}if (last == null) {
this.elementData[index] = entry.next;
} else {
last.next = entry.next;
}this.modCount++;
this.elementCount--;
return entry;
});

Clazz.newMethod$(C$, 'size', function () {
return this.elementCount;
});

Clazz.newMethod$(C$, 'values', function () {
if (this.valuesCollection == null) {
this.valuesCollection = ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "HashMap$2", java.util.AbstractCollection);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'contains$O', function (object) {
return this.b$["java.util.HashMap"].containsValue$O (object);
});

Clazz.newMethod$(C$, 'size', function () {
return this.b$["java.util.HashMap"].size ();
});

Clazz.newMethod$(C$, 'clear', function () {
this.b$["java.util.HashMap"].clear ();
});

Clazz.newMethod$(C$, 'iterator', function () {
return Clazz.$new(java.util.HashMap.HashMapIterator.construct$java_util_MapEntry_Type$java_util_HashMap,[((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "HashMap$2$1", null, java.util.MapEntry.Type);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'get$java_util_MapEntry', function (entry) {
return entry.value;
});
})()
), Clazz.$new(java.util.HashMap$2$1.$init$, [this, null])), this.b$["java.util.HashMap"]]);
});
})()
), Clazz.$new(java.util.HashMap$2.superClazz.construct, [this, null],java.util.HashMap$2));
}return this.valuesCollection;
});

Clazz.newMethod$(C$, 'writeObject$java_io_ObjectOutputStream', function (stream) {
stream.defaultWriteObject ();
stream.writeInt$I (this.elementData.length);
stream.writeInt$I (this.elementCount);
var iterator = this.entrySet ().iterator ();
while (iterator.hasNext ()) {
var entry = iterator.next ();
stream.writeObject$O (entry.key);
stream.writeObject$O (entry.value);
entry = entry.next;
}
});

Clazz.newMethod$(C$, 'readObject$java_io_ObjectInputStream', function (stream) {
stream.defaultReadObject ();
var length = stream.readInt ();
this.elementData = this.newElementArray$I (length);
this.elementCount = stream.readInt ();
for (var i = this.elementCount; --i >= 0; ) {
var key = stream.readObject ();
var index = (null == key) ? 0 : (key.hashCode () & 0x7FFFFFFF) % length;
this.createEntry$TK$I$TV (key, index, stream.readObject ());
}
});
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.HashMap, "Entry", java.util.MapEntry);

Clazz.newMethod$(C$, '$init$', function () {
this.origKeyHash = 0;
this.next = null;
}, 1);

Clazz.newMethod$(C$, 'construct$TK$TV', function (theKey, theValue) {
C$.superClazz.construct$TK$TV.apply(this, [theKey, theValue]);
C$.$init$.apply(this);
this.origKeyHash = (theKey == null ? 0 : theKey.hashCode ());
}, 1);

Clazz.newMethod$(C$, 'clone', function () {
var entry = C$.superClazz.prototype.clone.apply(this, arguments);
if (this.next != null) {
entry.next = this.next.clone ();
}return entry;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.HashMap, "HashMapIterator", null, java.util.Iterator);

Clazz.newMethod$(C$, '$init$', function () {
this.position = 0;
this.expectedModCount = 0;
this.type = null;
this.canRemove = false;
this.entry = null;
this.lastEntry = null;
this.associatedMap = null;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_MapEntry_Type$java_util_HashMap', function (value, hm) {
C$.$init$.apply(this);
this.associatedMap = hm;
this.type = value;
this.expectedModCount = hm.modCount;
}, 1);

Clazz.newMethod$(C$, 'hasNext', function () {
if (this.entry != null) {
return true;
}while (this.position < this.associatedMap.elementData.length) {
if (this.associatedMap.elementData[this.position] == null) {
this.position++;
} else {
return true;
}}
return false;
});

Clazz.newMethod$(C$, 'checkConcurrentMod', function () {
if (this.expectedModCount != this.associatedMap.modCount) {
throw Clazz.$new(java.util.ConcurrentModificationException.construct,[]);
}});

Clazz.newMethod$(C$, 'next', function () {
this.checkConcurrentMod ();
if (!this.hasNext ()) {
throw Clazz.$new(java.util.NoSuchElementException.construct,[]);
}var result;
if (this.entry == null) {
result = this.lastEntry = this.associatedMap.elementData[this.position++];
this.entry = this.lastEntry.next;
} else {
if (this.lastEntry.next !== this.entry) {
this.lastEntry = this.lastEntry.next;
}result = this.entry;
this.entry = this.entry.next;
}this.canRemove = true;
return this.type.get$java_util_MapEntry (result);
});

Clazz.newMethod$(C$, 'remove', function () {
this.checkConcurrentMod ();
if (!this.canRemove) {
throw Clazz.$new(IllegalStateException.construct,[]);
}this.canRemove = false;
this.associatedMap.modCount++;
if (this.lastEntry.next === this.entry) {
while (this.associatedMap.elementData[--this.position] == null) {
;}
this.associatedMap.elementData[this.position] = this.associatedMap.elementData[this.position].next;
this.entry = null;
} else {
this.lastEntry.next = this.entry;
}this.associatedMap.elementCount--;
this.expectedModCount++;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.HashMap, "HashMapEntrySet", java.util.AbstractSet);

Clazz.newMethod$(C$, '$init$', function () {
this.associatedMap = null;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_HashMap', function (hm) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.associatedMap = hm;
}, 1);

Clazz.newMethod$(C$, 'hashMap', function () {
return this.associatedMap;
});

Clazz.newMethod$(C$, 'size', function () {
return this.associatedMap.elementCount;
});

Clazz.newMethod$(C$, 'clear', function () {
this.associatedMap.clear ();
});

Clazz.newMethod$(C$, 'remove$O', function (object) {
if (this.contains$O (object)) {
this.associatedMap.remove$O ((object).getKey ());
return true;
}return false;
});

Clazz.newMethod$(C$, 'contains$O', function (object) {
if (Clazz.instanceOf(object, java.util.Map.Entry)) {
var entry = this.associatedMap.getEntry$O ((object).getKey ());
return object.equals$O (entry);
}return false;
});

Clazz.newMethod$(C$, 'iterator', function () {
return Clazz.$new(java.util.HashMap.HashMapIterator.construct$java_util_MapEntry_Type$java_util_HashMap,[((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "HashMap$HashMapEntrySet$1", null, java.util.MapEntry.Type);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'get$java_util_MapEntry', function (entry) {
return entry;
});
})()
), Clazz.$new(java.util.HashMap$HashMapEntrySet$1.$init$, [this, null])), this.associatedMap]);
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
Clazz.defineStatics (C$,
"DEFAULT_SIZE", 16);
})()
});

//Created 2017-08-17 10:33:16
