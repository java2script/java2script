Clazz.load (["java.util.Dictionary", "$.Enumeration", "$.Iterator", "$.Map", "$.MapEntry", "$.NoSuchElementException"], "java.util.Hashtable", ["java.lang.IllegalArgumentException", "$.IllegalStateException", "$.NullPointerException", "$.StringBuilder", "java.util.AbstractCollection", "$.AbstractSet", "$.Arrays", "$.Collections", "$.ConcurrentModificationException"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
java.util.Hashtable.HashIterator || java.util.Hashtable.$Hashtable$HashIterator$ ();

java.util.Hashtable.HashEnumerator || java.util.Hashtable.$Hashtable$HashEnumerator$ ();

Clazz.newInstance$ (this, arguments);
}, java.util, "Hashtable", java.util.Dictionary, [java.util.Map, Cloneable, java.io.Serializable]);

Clazz.newMethod$(C$, '$init$', function () {
this.elementCount = 0;
this.elementData = null;
this.loadFactor = 0;
this.threshold = 0;
this.firstSlot = 0;
this.lastSlot = -1;
this.modCount = 0;
}, 1);

Clazz.newMethod$(C$, 'newEntry$TK$TV$I', function (key, value, hash) {
return Clazz.$new(java.util.Hashtable.Entry.construct$TK$TV,[key, value]);
}, 1);

Clazz.newMethod$(C$, 'construct', function () {
C$.construct$I.apply(this, [11]);
}, 1);

Clazz.newMethod$(C$, 'construct$I', function (capacity) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
if (capacity >= 0) {
this.elementCount = 0;
this.elementData = C$.prototype.newElementArray$I.apply(this, [capacity == 0 ? 1 : capacity]);
this.firstSlot = this.elementData.length;
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
this.firstSlot = capacity;
this.elementData = C$.prototype.newElementArray$I.apply(this, [capacity == 0 ? 1 : capacity]);
this.loadFactor = loadFactor;
C$.prototype.computeMaxSize.apply(this, []);
} else {
throw Clazz.$new(IllegalArgumentException.construct,[]);
}}, 1);

Clazz.newMethod$(C$, 'construct$java_util_Map', function (map) {
C$.construct$I.apply(this, [map.size () < 6 ? 11 : (Clazz.doubleToInt (map.size () * 4 / 3)) + 11]);
this.putAll$java_util_Map (map);
}, 1);

Clazz.newMethod$(C$, 'newElementArray$I', function (size) {
return  Clazz.newArray$(java.util.Hashtable.Entry, [size]);
});

Clazz.newMethod$(C$, 'clear', function () {
this.elementCount = 0;
java.util.Arrays.fill$OA$O (this.elementData, null);
this.modCount++;
});

Clazz.newMethod$(C$, 'clone', function () {
try {
var hashtable = C$.superClazz.prototype.clone.apply(this, arguments);
hashtable.elementData = this.elementData.clone ();
var entry;
for (var i = this.elementData.length; --i >= 0; ) {
if ((entry = this.elementData[i]) != null) {
hashtable.elementData[i] = entry.clone ();
}}
return hashtable;
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

Clazz.newMethod$(C$, 'contains$O', function (value) {
if (value == null) {
throw Clazz.$new(NullPointerException.construct,[]);
}for (var i = this.elementData.length; --i >= 0; ) {
var entry = this.elementData[i];
while (entry != null) {
if (value.equals$O (entry.value)) {
return true;
}entry = entry.next;
}
}
return false;
});

Clazz.newMethod$(C$, 'containsKey$O', function (key) {
return this.getEntry$O (key) != null;
});

Clazz.newMethod$(C$, 'containsValue$O', function (value) {
return this.contains$O (value);
});

Clazz.newMethod$(C$, 'elements', function () {
if (this.elementCount == 0) {
return java.util.Hashtable.EMPTY_ENUMERATION;
}return Clazz.$new(java.util.Hashtable.HashEnumerator.construct$Z, [this, null, false]);
});

Clazz.newMethod$(C$, 'entrySet', function () {
return Clazz.$new(java.util.Collections.SynchronizedSet.construct$java_util_Set$O,[((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "Hashtable$2", java.util.AbstractSet);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'size', function () {
return this.b$["java.util.Hashtable"].elementCount;
});

Clazz.newMethod$(C$, 'clear', function () {
this.b$["java.util.Hashtable"].clear ();
});

Clazz.newMethod$(C$, 'remove$O', function (object) {
if (this.contains$O (object)) {
this.b$["java.util.Hashtable"].remove$O ((object).getKey ());
return true;
}return false;
});

Clazz.newMethod$(C$, 'contains$O', function (object) {
var entry = this.b$["java.util.Hashtable"].getEntry$O ((object).getKey ());
return object.equals$O (entry);
});

Clazz.newMethod$(C$, 'iterator', function () {
return Clazz.$new(java.util.Hashtable.HashIterator.construct$java_util_MapEntry_Type, [this, null, ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "Hashtable$2$1", null, java.util.MapEntry.Type);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'get$java_util_MapEntry', function (entry) {
return entry;
});
})()
), Clazz.$new(java.util.Hashtable$2$1.$init$, [this, null]))]);
});
})()
), Clazz.$new(java.util.Hashtable$2.superClazz.construct, [this, null],java.util.Hashtable$2)), this]);
});

Clazz.newMethod$(C$, 'equals$O', function (object) {
if (this === object) {
return true;
}if (Clazz.instanceOf(object, java.util.Map)) {
var map = object;
if (this.size () != map.size ()) {
return false;
}var entries = this.entrySet ();
for (var e, $e = map.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
if (!entries.contains$O (e)) {
return false;
}}
return true;
}return false;
});

Clazz.newMethod$(C$, 'get$O', function (key) {
var hash = key.hashCode ();
var index = (hash & 0x7FFFFFFF) % this.elementData.length;
var entry = this.elementData[index];
while (entry != null) {
if (entry.equalsKey$O$I (key, hash)) {
return entry.value;
}entry = entry.next;
}
return null;
});

Clazz.newMethod$(C$, 'getEntry$O', function (key) {
var hash = key.hashCode ();
var index = (hash & 0x7FFFFFFF) % this.elementData.length;
var entry = this.elementData[index];
while (entry != null) {
if (entry.equalsKey$O$I (key, hash)) {
return entry;
}entry = entry.next;
}
return null;
});

Clazz.newMethod$(C$, 'hashCode', function () {
var result = 0;
var it = this.entrySet ().iterator ();
while (it.hasNext ()) {
var entry = it.next ();
var key = entry.getKey ();
var value = entry.getValue ();
var hash = (key !== this ? key.hashCode () : 0) ^ (value !== this ? (value != null ? value.hashCode () : 0) : 0);
result += hash;
}
return result;
});

Clazz.newMethod$(C$, 'isEmpty', function () {
return this.elementCount == 0;
});

Clazz.newMethod$(C$, 'keys', function () {
if (this.elementCount == 0) {
return java.util.Hashtable.EMPTY_ENUMERATION;
}return Clazz.$new(java.util.Hashtable.HashEnumerator.construct$Z, [this, null, true]);
});

Clazz.newMethod$(C$, 'keySet', function () {
return Clazz.$new(java.util.Collections.SynchronizedSet.construct$java_util_Set$O,[((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "Hashtable$3", java.util.AbstractSet);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'contains$O', function (object) {
return this.b$["java.util.Hashtable"].containsKey$O (object);
});

Clazz.newMethod$(C$, 'size', function () {
return this.b$["java.util.Hashtable"].elementCount;
});

Clazz.newMethod$(C$, 'clear', function () {
this.b$["java.util.Hashtable"].clear ();
});

Clazz.newMethod$(C$, 'remove$O', function (key) {
if (this.b$["java.util.Hashtable"].containsKey$O (key)) {
this.b$["java.util.Hashtable"].remove$O (key);
return true;
}return false;
});

Clazz.newMethod$(C$, 'iterator', function () {
return Clazz.$new(java.util.Hashtable.HashIterator.construct$java_util_MapEntry_Type, [this, null, ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "Hashtable$3$1", null, java.util.MapEntry.Type);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'get$java_util_MapEntry', function (entry) {
return entry.key;
});
})()
), Clazz.$new(java.util.Hashtable$3$1.$init$, [this, null]))]);
});
})()
), Clazz.$new(java.util.Hashtable$3.superClazz.construct, [this, null],java.util.Hashtable$3)), this]);
});

Clazz.newMethod$(C$, 'put$TK$TV', function (key, value) {
if (key != null && value != null) {
var hash = key.hashCode ();
var index = (hash & 0x7FFFFFFF) % this.elementData.length;
var entry = this.elementData[index];
while (entry != null && !entry.equalsKey$O$I (key, hash)) {
entry = entry.next;
}
if (entry == null) {
this.modCount++;
if (++this.elementCount > this.threshold) {
this.rehash ();
index = (hash & 0x7FFFFFFF) % this.elementData.length;
}if (index < this.firstSlot) {
this.firstSlot = index;
}if (index > this.lastSlot) {
this.lastSlot = index;
}entry = java.util.Hashtable.newEntry$TK$TV$I (key, value, hash);
entry.next = this.elementData[index];
this.elementData[index] = entry;
return null;
}var result = entry.value;
entry.value = value;
return result;
}throw Clazz.$new(NullPointerException.construct,[]);
});

Clazz.newMethod$(C$, 'putAll$java_util_Map', function (map) {
for (var entry, $entry = map.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
this.put$TK$TV (entry.getKey (), entry.getValue ());
}
});

Clazz.newMethod$(C$, 'rehash', function () {
var length = (this.elementData.length << 1) + 1;
if (length == 0) {
length = 1;
}var newFirst = length;
var newLast = -1;
var newData = C$.prototype.newElementArray$I.apply(this, [length]);
for (var i = this.lastSlot + 1; --i >= this.firstSlot; ) {
var entry = this.elementData[i];
while (entry != null) {
var index = (entry.getKeyHash () & 0x7FFFFFFF) % length;
if (index < newFirst) {
newFirst = index;
}if (index > newLast) {
newLast = index;
}var next = entry.next;
entry.next = newData[index];
newData[index] = entry;
entry = next;
}
}
this.firstSlot = newFirst;
this.lastSlot = newLast;
this.elementData = newData;
C$.prototype.computeMaxSize.apply(this, []);
});

Clazz.newMethod$(C$, 'remove$O', function (key) {
var hash = key.hashCode ();
var index = (hash & 0x7FFFFFFF) % this.elementData.length;
var last = null;
var entry = this.elementData[index];
while (entry != null && !entry.equalsKey$O$I (key, hash)) {
last = entry;
entry = entry.next;
}
if (entry != null) {
this.modCount++;
if (last == null) {
this.elementData[index] = entry.next;
} else {
last.next = entry.next;
}this.elementCount--;
var result = entry.value;
entry.value = null;
return result;
}return null;
});

Clazz.newMethod$(C$, 'size', function () {
return this.elementCount;
});

Clazz.newMethod$(C$, 'toString', function () {
if (this.isEmpty ()) {
return "{}";
}var buffer = Clazz.$new(StringBuilder.construct$I,[this.size () * 28]);
buffer.append$C ('{');
for (var i = this.lastSlot; i >= this.firstSlot; i--) {
var entry = this.elementData[i];
while (entry != null) {
if (entry.key !== this) {
buffer.append$O (entry.key);
} else {
buffer.append$S ("(this Map)");
}buffer.append$C ('=');
if (entry.value !== this) {
buffer.append$O (entry.value);
} else {
buffer.append$S ("(this Map)");
}buffer.append$S (", ");
entry = entry.next;
}
}
if (this.elementCount > 0) {
buffer.setLength$I (buffer.length () - 2);
}buffer.append$C ('}');
return buffer.toString ();
});

Clazz.newMethod$(C$, 'values', function () {
return Clazz.$new(java.util.Collections.SynchronizedCollection.construct$java_util_Collection$O,[((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "Hashtable$4", java.util.AbstractCollection);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'contains$O', function (object) {
return this.b$["java.util.Hashtable"].contains$O (object);
});

Clazz.newMethod$(C$, 'size', function () {
return this.b$["java.util.Hashtable"].elementCount;
});

Clazz.newMethod$(C$, 'clear', function () {
this.b$["java.util.Hashtable"].clear ();
});

Clazz.newMethod$(C$, 'iterator', function () {
return Clazz.$new(java.util.Hashtable.HashIterator.construct$java_util_MapEntry_Type, [this, null, ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "Hashtable$4$1", null, java.util.MapEntry.Type);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'get$java_util_MapEntry', function (entry) {
return entry.value;
});
})()
), Clazz.$new(java.util.Hashtable$4$1.$init$, [this, null]))]);
});
})()
), Clazz.$new(java.util.Hashtable$4.superClazz.construct, [this, null],java.util.Hashtable$4)), this]);
});

Clazz.newMethod$(C$, 'writeObject$java_io_ObjectOutputStream', function (stream) {
stream.defaultWriteObject ();
stream.writeInt$I (this.elementData.length);
stream.writeInt$I (this.elementCount);
for (var i = this.elementData.length; --i >= 0; ) {
var entry = this.elementData[i];
while (entry != null) {
stream.writeObject$O (entry.key);
stream.writeObject$O (entry.value);
entry = entry.next;
}
}
});

Clazz.newMethod$(C$, 'readObject$java_io_ObjectInputStream', function (stream) {
stream.defaultReadObject ();
var length = stream.readInt ();
this.elementData = C$.prototype.newElementArray$I.apply(this, [length]);
this.elementCount = stream.readInt ();
for (var i = this.elementCount; --i >= 0; ) {
var key = stream.readObject ();
var hash = key.hashCode ();
var index = (hash & 0x7FFFFFFF) % length;
if (index < this.firstSlot) {
this.firstSlot = index;
}if (index > this.lastSlot) {
this.lastSlot = index;
}var entry = java.util.Hashtable.newEntry$TK$TV$I (key, stream.readObject (), hash);
entry.next = this.elementData[index];
this.elementData[index] = entry;
}
});
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], false);
}, java.util.Hashtable, "Entry", java.util.MapEntry);

Clazz.newMethod$(C$, '$init$', function () {
this.next = null;
this.hashcode = 0;
}, 1);

Clazz.newMethod$(C$, 'construct$TK$TV', function (theKey, theValue) {
C$.superClazz.construct$TK$TV.apply(this, [theKey, theValue]);
C$.$init$.apply(this);
this.hashcode = theKey.hashCode ();
}, 1);

Clazz.newMethod$(C$, 'clone', function () {
var entry = C$.superClazz.prototype.clone.apply(this, arguments);
if (this.next != null) {
entry.next = this.next.clone ();
}return entry;
});

Clazz.newMethod$(C$, 'setValue$TV', function (object) {
if (object == null) {
throw Clazz.$new(NullPointerException.construct,[]);
}var result = this.value;
this.value = object;
return result;
});

Clazz.newMethod$(C$, 'getKeyHash', function () {
return this.key.hashCode ();
});

Clazz.newMethod$(C$, 'equalsKey$O$I', function (aKey, hash) {
return this.hashcode == aKey.hashCode () && this.key.equals$O (aKey);
});

Clazz.newMethod$(C$, 'toString', function () {
return this.key + "=" + this.value;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
C$.$Hashtable$HashIterator$ = function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Hashtable, "HashIterator", null, java.util.Iterator);

Clazz.newMethod$(C$, '$init$', function () {
this.position = 0;
this.expectedModCount = 0;
this.type = null;
this.lastEntry = null;
this.lastPosition = 0;
this.canRemove = false;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_MapEntry_Type', function (value) {
C$.$init$.apply(this);
this.type = value;
this.position = this.b$["java.util.Hashtable"].lastSlot;
this.expectedModCount = this.b$["java.util.Hashtable"].modCount;
}, 1);

Clazz.newMethod$(C$, 'hasNext', function () {
if (this.lastEntry != null && this.lastEntry.next != null) {
return true;
}while (this.position >= this.b$["java.util.Hashtable"].firstSlot) {
if (this.b$["java.util.Hashtable"].elementData[this.position] == null) {
this.position--;
} else {
return true;
}}
return false;
});

Clazz.newMethod$(C$, 'next', function () {
if (this.expectedModCount == this.b$["java.util.Hashtable"].modCount) {
if (this.lastEntry != null) {
this.lastEntry = this.lastEntry.next;
}if (this.lastEntry == null) {
while (this.position >= this.b$["java.util.Hashtable"].firstSlot && (this.lastEntry = this.b$["java.util.Hashtable"].elementData[this.position]) == null) {
this.position--;
}
if (this.lastEntry != null) {
this.lastPosition = this.position;
this.position--;
}}if (this.lastEntry != null) {
this.canRemove = true;
return this.type.get$java_util_MapEntry (this.lastEntry);
}throw Clazz.$new(java.util.NoSuchElementException.construct,[]);
}throw Clazz.$new(java.util.ConcurrentModificationException.construct,[]);
});

Clazz.newMethod$(C$, 'remove', function () {
if (this.expectedModCount == this.b$["java.util.Hashtable"].modCount) {
if (this.canRemove) {
this.canRemove = false;
{
var removed = false;
var entry = this.b$["java.util.Hashtable"].elementData[this.lastPosition];
if (entry === this.lastEntry) {
this.b$["java.util.Hashtable"].elementData[this.lastPosition] = entry.next;
removed = true;
} else {
while (entry != null && entry.next !== this.lastEntry) {
entry = entry.next;
}
if (entry != null) {
entry.next = this.lastEntry.next;
removed = true;
}}if (removed) {
this.b$["java.util.Hashtable"].modCount++;
this.b$["java.util.Hashtable"].elementCount--;
this.expectedModCount++;
return;
}}} else {
throw Clazz.$new(IllegalStateException.construct,[]);
}}throw Clazz.$new(java.util.ConcurrentModificationException.construct,[]);
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
};
C$.$Hashtable$HashEnumerator$ = function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.Hashtable, "HashEnumerator", null, java.util.Enumeration);

Clazz.newMethod$(C$, '$init$', function () {
this.key = false;
this.start = 0;
this.entry = null;
}, 1);

Clazz.newMethod$(C$, 'construct$Z', function (isKey) {
C$.$init$.apply(this);
this.key = isKey;
this.start = this.b$["java.util.Hashtable"].lastSlot + 1;
}, 1);

Clazz.newMethod$(C$, 'hasMoreElements', function () {
if (this.entry != null) {
return true;
}while (--this.start >= this.b$["java.util.Hashtable"].firstSlot) {
if (this.b$["java.util.Hashtable"].elementData[this.start] != null) {
this.entry = this.b$["java.util.Hashtable"].elementData[this.start];
return true;
}}
return false;
});

Clazz.newMethod$(C$, 'nextElement', function () {
if (this.hasMoreElements ()) {
var result = this.key ? this.entry.key : this.entry.value;
this.entry = this.entry.next;
return result;
}throw Clazz.$new(java.util.NoSuchElementException.construct,[]);
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
};
Clazz.defineStatics$ (C$, ["EMPTY_ENUMERATION", ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "Hashtable$1", null, java.util.Enumeration);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'hasMoreElements', function () {
return false;
});

Clazz.newMethod$(C$, 'nextElement', function () {
throw Clazz.$new(java.util.NoSuchElementException.construct,[]);
});
})()
), Clazz.$new(java.util.Hashtable$1.$init$, [this, null]))
]);
})()
});

//Created 2017-08-18 22:18:03
