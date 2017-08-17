Clazz.load (["java.lang.ref.WeakReference", "java.util.AbstractMap", "$.Iterator", "$.Map"], "java.util.WeakHashMap", ["java.lang.IllegalArgumentException", "$.IllegalStateException", "java.lang.ref.ReferenceQueue", "java.util.AbstractCollection", "$.AbstractSet", "$.Arrays", "$.ConcurrentModificationException", "java.util.Map.Entry", "java.util.NoSuchElementException"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
java.util.WeakHashMap.HashIterator || java.util.WeakHashMap.$WeakHashMap$HashIterator$ ();

Clazz.newInstance$ (this, arguments);
}, java.util, "WeakHashMap", java.util.AbstractMap, java.util.Map);

Clazz.newMethod$(C$, '$init$', function () {
this.referenceQueue = null;
this.elementCount = 0;
this.elementData = null;
this.loadFactor = 0;
this.threshold = 0;
this.modCount = 0;
}, 1);

Clazz.newMethod$(C$, 'newEntryArray$I', function (size) {
return  Clazz.newArray$('java_util_WeakHashMap_EntryA', 1, [size]);
}, 1);

Clazz.newMethod$(C$, 'construct', function () {
C$.construct$I.apply(this, [16]);
}, 1);

Clazz.newMethod$(C$, 'construct$I', function (capacity) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
if (capacity >= 0) {
this.elementCount = 0;
this.elementData = java.util.WeakHashMap.newEntryArray$I (capacity == 0 ? 1 : capacity);
this.loadFactor = 7500;
C$.prototype.computeMaxSize.apply(this, []);
this.referenceQueue = Clazz.$new(java.lang.ref.ReferenceQueue.construct,[]);
} else {
throw Clazz.$new(IllegalArgumentException.construct,[]);
}}, 1);

Clazz.newMethod$(C$, 'construct$I$F', function (capacity, loadFactor) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
if (capacity >= 0 && loadFactor > 0) {
this.elementCount = 0;
this.elementData = java.util.WeakHashMap.newEntryArray$I (capacity == 0 ? 1 : capacity);
this.loadFactor = Clazz.floatToInt (loadFactor * 10000);
C$.prototype.computeMaxSize.apply(this, []);
this.referenceQueue = Clazz.$new(java.lang.ref.ReferenceQueue.construct,[]);
} else {
throw Clazz.$new(IllegalArgumentException.construct,[]);
}}, 1);

Clazz.newMethod$(C$, 'construct$java_util_Map', function (map) {
C$.construct$I.apply(this, [map.size () < 6 ? 11 : map.size () * 2]);
C$.prototype.putAllImpl$java_util_Map.apply(this, [map]);
}, 1);

Clazz.newMethod$(C$, 'clear', function () {
if (this.elementCount > 0) {
this.elementCount = 0;
java.util.Arrays.fill$OA$O (this.elementData, null);
this.modCount++;
while (this.referenceQueue.poll () != null) {
}
}});

Clazz.newMethod$(C$, 'computeMaxSize', function () {
this.threshold = (Clazz.doubleToInt (this.elementData.length * this.loadFactor / 10000));
});

Clazz.newMethod$(C$, 'containsKey$O', function (key) {
return this.getEntry$O (key) != null;
});

Clazz.newMethod$(C$, 'entrySet', function () {
this.poll ();
return ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "WeakHashMap$1", java.util.AbstractSet);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'size', function () {
return this.b$["java.util.WeakHashMap"].size ();
});

Clazz.newMethod$(C$, 'clear', function () {
this.b$["java.util.WeakHashMap"].clear ();
});

Clazz.newMethod$(C$, 'remove$O', function (object) {
if (this.contains$O (object)) {
this.b$["java.util.WeakHashMap"].remove$O ((object).getKey ());
return true;
}return false;
});

Clazz.newMethod$(C$, 'contains$O', function (object) {
if (Clazz.instanceOf(object, java.util.Map.Entry)) {
var entry = this.b$["java.util.WeakHashMap"].getEntry$O ((object).getKey ());
if (entry != null) {
var key = entry.get ();
if (key != null || entry.isNull) {
return object.equals$O (entry);
}}}return false;
});

Clazz.newMethod$(C$, 'iterator', function () {
return Clazz.$new(java.util.WeakHashMap.HashIterator.construct$java_util_WeakHashMap_Entry_Type, [this, null, ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "WeakHashMap$1$1", null, java.util.WeakHashMap.Entry.Type);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'get$java_util_Map_Entry', function (entry) {
return entry;
});
})()
), Clazz.$new(java.util.WeakHashMap$1$1.$init$, [this, null]))]);
});
})()
), Clazz.$new(java.util.WeakHashMap$1.superClazz.construct, [this, null],java.util.WeakHashMap$1));
});

Clazz.newMethod$(C$, 'keySet', function () {
this.poll ();
if (this.$keySet == null) {
this.$keySet = ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "WeakHashMap$2", java.util.AbstractSet);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'contains$O', function (object) {
return this.b$["java.util.WeakHashMap"].containsKey$O (object);
});

Clazz.newMethod$(C$, 'size', function () {
return this.b$["java.util.WeakHashMap"].size ();
});

Clazz.newMethod$(C$, 'clear', function () {
this.b$["java.util.WeakHashMap"].clear ();
});

Clazz.newMethod$(C$, 'remove$O', function (key) {
if (this.b$["java.util.WeakHashMap"].containsKey$O (key)) {
this.b$["java.util.WeakHashMap"].remove$O (key);
return true;
}return false;
});

Clazz.newMethod$(C$, 'iterator', function () {
return Clazz.$new(java.util.WeakHashMap.HashIterator.construct$java_util_WeakHashMap_Entry_Type, [this, null, ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "WeakHashMap$2$1", null, java.util.WeakHashMap.Entry.Type);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'get$java_util_Map_Entry', function (entry) {
return entry.getKey ();
});
})()
), Clazz.$new(java.util.WeakHashMap$2$1.$init$, [this, null]))]);
});
})()
), Clazz.$new(java.util.WeakHashMap$2.superClazz.construct, [this, null],java.util.WeakHashMap$2));
}return this.$keySet;
});

Clazz.newMethod$(C$, 'values', function () {
this.poll ();
if (this.valuesCollection == null) {
this.valuesCollection = ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "WeakHashMap$3", java.util.AbstractCollection);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'size', function () {
return this.b$["java.util.WeakHashMap"].size ();
});

Clazz.newMethod$(C$, 'clear', function () {
this.b$["java.util.WeakHashMap"].clear ();
});

Clazz.newMethod$(C$, 'contains$O', function (object) {
return this.b$["java.util.WeakHashMap"].containsValue$O (object);
});

Clazz.newMethod$(C$, 'iterator', function () {
return Clazz.$new(java.util.WeakHashMap.HashIterator.construct$java_util_WeakHashMap_Entry_Type, [this, null, ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "WeakHashMap$3$1", null, java.util.WeakHashMap.Entry.Type);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'get$java_util_Map_Entry', function (entry) {
return entry.getValue ();
});
})()
), Clazz.$new(java.util.WeakHashMap$3$1.$init$, [this, null]))]);
});
})()
), Clazz.$new(java.util.WeakHashMap$3.superClazz.construct, [this, null],java.util.WeakHashMap$3));
}return this.valuesCollection;
});

Clazz.newMethod$(C$, 'get$O', function (key) {
this.poll ();
if (key != null) {
var index = (key.hashCode () & 0x7FFFFFFF) % this.elementData.length;
var entry = this.elementData[index];
while (entry != null) {
if (key.equals$O (entry.get ())) {
return entry.value;
}entry = entry.$next;
}
return null;
}var entry = this.elementData[0];
while (entry != null) {
if (entry.isNull) {
return entry.value;
}entry = entry.$next;
}
return null;
});

Clazz.newMethod$(C$, 'getEntry$O', function (key) {
this.poll ();
if (key != null) {
var index = (key.hashCode () & 0x7FFFFFFF) % this.elementData.length;
var entry = this.elementData[index];
while (entry != null) {
if (key.equals$O (entry.get ())) {
return entry;
}entry = entry.$next;
}
return null;
}var entry = this.elementData[0];
while (entry != null) {
if (entry.isNull) {
return entry;
}entry = entry.$next;
}
return null;
});

Clazz.newMethod$(C$, 'containsValue$O', function (value) {
this.poll ();
if (value != null) {
for (var i = this.elementData.length; --i >= 0; ) {
var entry = this.elementData[i];
while (entry != null) {
var key = entry.get ();
if ((key != null || entry.isNull) && value.equals$O (entry.value)) {
return true;
}entry = entry.$next;
}
}
} else {
for (var i = this.elementData.length; --i >= 0; ) {
var entry = this.elementData[i];
while (entry != null) {
var key = entry.get ();
if ((key != null || entry.isNull) && entry.value == null) {
return true;
}entry = entry.$next;
}
}
}return false;
});

Clazz.newMethod$(C$, 'isEmpty', function () {
return this.size () == 0;
});

Clazz.newMethod$(C$, 'poll', function () {
var toRemove;
while ((toRemove = this.referenceQueue.poll ()) != null) {
this.removeEntry$java_util_WeakHashMap_Entry (toRemove);
}
});

Clazz.newMethod$(C$, 'removeEntry$java_util_WeakHashMap_Entry', function (toRemove) {
var entry;
var last = null;
var index = (toRemove.hash & 0x7FFFFFFF) % this.elementData.length;
entry = this.elementData[index];
while (entry != null) {
if (toRemove === entry) {
this.modCount++;
if (last == null) {
this.elementData[index] = entry.$next;
} else {
last.$next = entry.$next;
}this.elementCount--;
break;
}last = entry;
entry = entry.$next;
}
});

Clazz.newMethod$(C$, 'put$TK$TV', function (key, value) {
this.poll ();
var index = 0;
var entry;
if (key != null) {
index = (key.hashCode () & 0x7FFFFFFF) % this.elementData.length;
entry = this.elementData[index];
while (entry != null && !key.equals$O (entry.get ())) {
entry = entry.$next;
}
} else {
entry = this.elementData[0];
while (entry != null && !entry.isNull) {
entry = entry.$next;
}
}if (entry == null) {
this.modCount++;
if (++this.elementCount > this.threshold) {
C$.prototype.rehash.apply(this, []);
index = key == null ? 0 : (key.hashCode () & 0x7FFFFFFF) % this.elementData.length;
}entry = Clazz.$new(java.util.WeakHashMap.Entry.construct$TK$TV$ref_ReferenceQueue,[key, value, this.referenceQueue]);
entry.$next = this.elementData[index];
this.elementData[index] = entry;
return null;
}var result = entry.value;
entry.value = value;
return result;
});

Clazz.newMethod$(C$, 'rehash', function () {
var length = this.elementData.length << 1;
if (length == 0) {
length = 1;
}var newData = java.util.WeakHashMap.newEntryArray$I (length);
for (var i = 0; i < this.elementData.length; i++) {
var entry = this.elementData[i];
while (entry != null) {
var index = entry.isNull ? 0 : (entry.hash & 0x7FFFFFFF) % length;
var next = entry.$next;
entry.$next = newData[index];
newData[index] = entry;
entry = next;
}
}
this.elementData = newData;
C$.prototype.computeMaxSize.apply(this, []);
});

Clazz.newMethod$(C$, 'putAll$java_util_Map', function (map) {
C$.prototype.putAllImpl$java_util_Map.apply(this, [map]);
});

Clazz.newMethod$(C$, 'remove$O', function (key) {
this.poll ();
var index = 0;
var entry;
var last = null;
if (key != null) {
index = (key.hashCode () & 0x7FFFFFFF) % this.elementData.length;
entry = this.elementData[index];
while (entry != null && !key.equals$O (entry.get ())) {
last = entry;
entry = entry.$next;
}
} else {
entry = this.elementData[0];
while (entry != null && !entry.isNull) {
last = entry;
entry = entry.$next;
}
}if (entry != null) {
this.modCount++;
if (last == null) {
this.elementData[index] = entry.$next;
} else {
last.$next = entry.$next;
}this.elementCount--;
return entry.value;
}return null;
});

Clazz.newMethod$(C$, 'size', function () {
this.poll ();
return this.elementCount;
});

Clazz.newMethod$(C$, 'putAllImpl$java_util_Map', function (map) {
if (map.entrySet () != null) {
C$.superClazz.prototype.putAll$java_util_Map.apply(this, arguments);
}});
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.WeakHashMap, "Entry", java.lang.ref.WeakReference, java.util.Map.Entry);

Clazz.newMethod$(C$, '$init$', function () {
this.hash = 0;
this.isNull = false;
this.value = null;
this.$next = null;
}, 1);

Clazz.newMethod$(C$, 'construct$TK$TV$ref_ReferenceQueue', function (key, object, queue) {
C$.superClazz.construct$TK$ref_ReferenceQueue.apply(this, [key, queue]);
C$.$init$.apply(this);
this.isNull = key == null;
this.hash = this.isNull ? 0 : key.hashCode ();
this.value = object;
}, 1);

Clazz.newMethod$(C$, 'getKey', function () {
return C$.superClazz.prototype.get.apply(this, arguments);
});

Clazz.newMethod$(C$, 'getValue', function () {
return this.value;
});

Clazz.newMethod$(C$, 'setValue$TV', function (object) {
var result = this.value;
this.value = object;
return result;
});

Clazz.newMethod$(C$, 'equals$O', function (other) {
if (!(Clazz.instanceOf(other, java.util.Map.Entry))) {
return false;
}var entry = other;
var key = C$.superClazz.prototype.get.apply(this, arguments);
return (key == null ? key === entry.getKey () : key.equals$O (entry.getKey ())) && (this.value == null ? this.value === entry.getValue () : this.value.equals$O (entry.getValue ()));
});

Clazz.newMethod$(C$, 'hashCode', function () {
return this.hash + (this.value == null ? 0 : this.value.hashCode ());
});

Clazz.newMethod$(C$, 'toString', function () {
return C$.superClazz.prototype.get.apply(this, arguments) + "=" + this.value;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
Clazz.declareInterface (java.util.WeakHashMap.Entry, "Type");
})()
C$.$WeakHashMap$HashIterator$ = function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.WeakHashMap, "HashIterator", null, java.util.Iterator);

Clazz.newMethod$(C$, '$init$', function () {
this.position = 0;
this.expectedModCount = 0;
this.currentEntry = null;
this.nextEntry = null;
this.nextKey = null;
this.type = null;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_WeakHashMap_Entry_Type', function (type) {
C$.$init$.apply(this);
this.type = type;
this.expectedModCount = this.b$["java.util.WeakHashMap"].modCount;
}, 1);

Clazz.newMethod$(C$, 'hasNext', function () {
if (this.nextEntry != null) {
return true;
}while (true) {
if (this.nextEntry == null) {
while (this.position < this.b$["java.util.WeakHashMap"].elementData.length) {
if ((this.nextEntry = this.b$["java.util.WeakHashMap"].elementData[this.position++]) != null) {
break;
}}
if (this.nextEntry == null) {
return false;
}}this.nextKey = this.nextEntry.get ();
if (this.nextKey != null || this.nextEntry.isNull) {
return true;
}this.nextEntry = this.nextEntry.$next;
}
});

Clazz.newMethod$(C$, 'next', function () {
if (this.expectedModCount == this.b$["java.util.WeakHashMap"].modCount) {
if (this.hasNext ()) {
this.currentEntry = this.nextEntry;
this.nextEntry = this.currentEntry.$next;
var result = this.type.get$java_util_Map_Entry (this.currentEntry);
this.nextKey = null;
return result;
}throw Clazz.$new(java.util.NoSuchElementException.construct,[]);
}throw Clazz.$new(java.util.ConcurrentModificationException.construct,[]);
});

Clazz.newMethod$(C$, 'remove', function () {
if (this.expectedModCount == this.b$["java.util.WeakHashMap"].modCount) {
if (this.currentEntry != null) {
this.b$["java.util.WeakHashMap"].removeEntry$java_util_WeakHashMap_Entry (this.currentEntry);
this.currentEntry = null;
this.expectedModCount++;
} else {
throw Clazz.$new(IllegalStateException.construct,[]);
}} else {
throw Clazz.$new(java.util.ConcurrentModificationException.construct,[]);
}});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
};
Clazz.defineStatics (C$,
"DEFAULT_SIZE", 16);
})()
});

//Created 2017-08-17 10:33:18
