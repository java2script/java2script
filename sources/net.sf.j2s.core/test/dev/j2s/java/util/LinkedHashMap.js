Clazz.load (["java.util.HashMap"], "java.util.LinkedHashMap", ["java.lang.IllegalStateException", "java.util.AbstractCollection", "$.AbstractSet", "$.MapEntry", "$.NoSuchElementException"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "LinkedHashMap", java.util.HashMap);

Clazz.newMethod$(C$, '$init$', function () {
this.accessOrder = false;
this.head = null;
this.tail = null;
}, 1);

Clazz.newMethod$(C$, 'construct', function () {
C$.superClazz.construct.apply(this, []);
C$.$init$.apply(this);
this.accessOrder = false;
this.head = null;
}, 1);

Clazz.newMethod$(C$, 'construct$I', function (s) {
C$.superClazz.construct$I.apply(this, [s]);
C$.$init$.apply(this);
this.accessOrder = false;
this.head = null;
}, 1);

Clazz.newMethod$(C$, 'construct$I$F', function (s, lf) {
C$.superClazz.construct$I$F.apply(this, [s, lf]);
C$.$init$.apply(this);
this.accessOrder = false;
this.head = null;
this.tail = null;
}, 1);

Clazz.newMethod$(C$, 'construct$I$F$Z', function (s, lf, order) {
C$.superClazz.construct$I$F.apply(this, [s, lf]);
C$.$init$.apply(this);
this.accessOrder = order;
this.head = null;
this.tail = null;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_Map', function (m) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.accessOrder = false;
this.head = null;
this.tail = null;
this.putAll$java_util_Map (m);
}, 1);

Clazz.newMethod$(C$, 'newElementArray$I', function (s) {
return  Clazz.newArray$('java_util_LinkedHashMap_LinkedHashMapEntryA', 1, [s]);
});

Clazz.newMethod$(C$, 'get$O', function (key) {
var m = this.getEntry$O (key);
if (m == null) {
return null;
}if (this.accessOrder && this.tail !== m) {
var p = m.chainBackward;
var n = m.chainForward;
n.chainBackward = p;
if (p != null) {
p.chainForward = n;
} else {
this.head = n;
}m.chainForward = null;
m.chainBackward = this.tail;
this.tail.chainForward = m;
this.tail = m;
}return m.value;
});

Clazz.newMethod$(C$, 'createEntry$TK$I$TV', function (key, index, value) {
var m = Clazz.$new(java.util.LinkedHashMap.LinkedHashMapEntry.construct$TK$TV,[key, value]);
m.next = this.elementData[index];
this.elementData[index] = m;
this.linkEntry$java_util_LinkedHashMap_LinkedHashMapEntry (m);
return m;
});

Clazz.newMethod$(C$, 'put$TK$TV', function (key, value) {
var index = this.getModuloHash$O (key);
var m = this.findEntry$O$I (key, index);
if (m == null) {
this.modCount++;
if (++this.elementCount > this.threshold) {
this.rehash ();
index = key == null ? 0 : (key.hashCode () & 0x7FFFFFFF) % this.elementData.length;
}m = this.createEntry$TK$I$TV (key, index, null);
} else {
this.linkEntry$java_util_LinkedHashMap_LinkedHashMapEntry (m);
}var result = m.value;
m.value = value;
if (this.removeEldestEntry$java_util_Map_Entry (this.head)) {
this.remove$O (this.head.key);
}return result;
});

Clazz.newMethod$(C$, 'linkEntry$java_util_LinkedHashMap_LinkedHashMapEntry', function (m) {
if (this.tail === m) {
return;
}if (this.head == null) {
this.head = this.tail = m;
return;
}var p = m.chainBackward;
var n = m.chainForward;
if (p == null) {
if (n != null) {
if (this.accessOrder) {
this.head = n;
n.chainBackward = null;
m.chainBackward = this.tail;
m.chainForward = null;
this.tail.chainForward = m;
this.tail = m;
}} else {
m.chainBackward = this.tail;
m.chainForward = null;
this.tail.chainForward = m;
this.tail = m;
}return;
}if (n == null) {
return;
}if (this.accessOrder) {
p.chainForward = n;
n.chainBackward = p;
m.chainForward = null;
m.chainBackward = this.tail;
this.tail.chainForward = m;
this.tail = m;
}});

Clazz.newMethod$(C$, 'entrySet', function () {
return Clazz.$new(java.util.LinkedHashMap.LinkedHashMapEntrySet.construct$java_util_LinkedHashMap,[this]);
});

Clazz.newMethod$(C$, 'keySet', function () {
if (this.$keySet == null) {
this.$keySet = ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "LinkedHashMap$1", java.util.AbstractSet);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'contains$O', function (object) {
return this.b$["java.util.LinkedHashMap"].containsKey$O (object);
});

Clazz.newMethod$(C$, 'size', function () {
return this.b$["java.util.LinkedHashMap"].size ();
});

Clazz.newMethod$(C$, 'clear', function () {
this.b$["java.util.LinkedHashMap"].clear ();
});

Clazz.newMethod$(C$, 'remove$O', function (key) {
if (this.b$["java.util.LinkedHashMap"].containsKey$O (key)) {
this.b$["java.util.LinkedHashMap"].remove$O (key);
return true;
}return false;
});

Clazz.newMethod$(C$, 'iterator', function () {
return Clazz.$new(java.util.LinkedHashMap.LinkedHashIterator.construct$java_util_MapEntry_Type$java_util_LinkedHashMap,[((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "LinkedHashMap$1$1", null, java.util.MapEntry.Type);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'get$java_util_MapEntry', function (entry) {
return entry.key;
});
})()
), Clazz.$new(java.util.LinkedHashMap$1$1.$init$, [this, null])), this.b$["java.util.LinkedHashMap"]]);
});
})()
), Clazz.$new(java.util.LinkedHashMap$1.superClazz.construct, [this, null],java.util.LinkedHashMap$1));
}return this.$keySet;
});

Clazz.newMethod$(C$, 'values', function () {
if (this.valuesCollection == null) {
this.valuesCollection = ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "LinkedHashMap$2", java.util.AbstractCollection);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'contains$O', function (object) {
return this.b$["java.util.LinkedHashMap"].containsValue$O (object);
});

Clazz.newMethod$(C$, 'size', function () {
return this.b$["java.util.LinkedHashMap"].size ();
});

Clazz.newMethod$(C$, 'clear', function () {
this.b$["java.util.LinkedHashMap"].clear ();
});

Clazz.newMethod$(C$, 'iterator', function () {
return Clazz.$new(java.util.LinkedHashMap.LinkedHashIterator.construct$java_util_MapEntry_Type$java_util_LinkedHashMap,[((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "LinkedHashMap$2$1", null, java.util.MapEntry.Type);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'get$java_util_MapEntry', function (entry) {
return entry.value;
});
})()
), Clazz.$new(java.util.LinkedHashMap$2$1.$init$, [this, null])), this.b$["java.util.LinkedHashMap"]]);
});
})()
), Clazz.$new(java.util.LinkedHashMap$2.superClazz.construct, [this, null],java.util.LinkedHashMap$2));
}return this.valuesCollection;
});

Clazz.newMethod$(C$, 'remove$O', function (key) {
var m = this.removeEntry$O (key);
if (m == null) {
return null;
}var p = m.chainBackward;
var n = m.chainForward;
if (p != null) {
p.chainForward = n;
} else {
this.head = n;
}if (n != null) {
n.chainBackward = p;
} else {
this.tail = p;
}return m.value;
});

Clazz.newMethod$(C$, 'removeEldestEntry$java_util_Map_Entry', function (eldest) {
return false;
});

Clazz.newMethod$(C$, 'clear', function () {
C$.superClazz.prototype.clear.apply(this, arguments);
this.head = this.tail = null;
});

Clazz.newMethod$(C$, 'clone', function () {
var map = C$.superClazz.prototype.clone.apply(this, arguments);
map.clear ();
for (var entry, $entry = this.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
map.put$TK$TV (entry.getKey (), entry.getValue ());
}
return map;
});
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.LinkedHashMap, "LinkedHashIterator", java.util.HashMap.HashMapIterator);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_MapEntry_Type$java_util_LinkedHashMap', function (value, hm) {
C$.superClazz.construct$java_util_MapEntry_Type$java_util_HashMap.apply(this, [value, hm]);
C$.$init$.apply(this);
this.entry = hm.head;
}, 1);

Clazz.newMethod$(C$, 'hasNext', function () {
return (this.entry != null);
});

Clazz.newMethod$(C$, 'next', function () {
this.checkConcurrentMod ();
if (!this.hasNext ()) {
throw Clazz.$new(java.util.NoSuchElementException.construct,[]);
}var result = this.type.get$java_util_MapEntry (this.entry);
this.lastEntry = this.entry;
this.entry = (this.entry).chainForward;
this.canRemove = true;
return result;
});

Clazz.newMethod$(C$, 'remove', function () {
this.checkConcurrentMod ();
if (!this.canRemove) {
throw Clazz.$new(IllegalStateException.construct,[]);
}this.canRemove = false;
this.associatedMap.modCount++;
var index = this.associatedMap.getModuloHash$O (this.lastEntry.key);
var m = this.associatedMap.elementData[index];
if (m === this.lastEntry) {
this.associatedMap.elementData[index] = this.lastEntry.next;
} else {
while (m.next != null) {
if (m.next === this.lastEntry) {
break;
}m = m.next;
}
m.next = this.lastEntry.next;
}var lhme = this.lastEntry;
var p = lhme.chainBackward;
var n = lhme.chainForward;
var lhm = this.associatedMap;
if (p != null) {
p.chainForward = n;
if (n != null) {
n.chainBackward = p;
} else {
lhm.tail = p;
}} else {
lhm.head = n;
if (n != null) {
n.chainBackward = null;
} else {
lhm.tail = null;
}}this.associatedMap.elementCount--;
this.expectedModCount++;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.LinkedHashMap, "LinkedHashMapEntrySet", java.util.HashMap.HashMapEntrySet);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_LinkedHashMap', function (lhm) {
C$.superClazz.construct$java_util_HashMap.apply(this, [lhm]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'iterator', function () {
return Clazz.$new(java.util.LinkedHashMap.LinkedHashIterator.construct$java_util_MapEntry_Type$java_util_LinkedHashMap,[((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "LinkedHashMap$LinkedHashMapEntrySet$1", null, java.util.MapEntry.Type);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'get$java_util_MapEntry', function (entry) {
return entry;
});
})()
), Clazz.$new(java.util.LinkedHashMap$LinkedHashMapEntrySet$1.$init$, [this, null])), this.hashMap ()]);
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.LinkedHashMap, "LinkedHashMapEntry", java.util.HashMap.Entry);

Clazz.newMethod$(C$, '$init$', function () {
this.chainForward = null;
this.chainBackward = null;
}, 1);

Clazz.newMethod$(C$, 'construct$TK$TV', function (theKey, theValue) {
C$.superClazz.construct$TK$TV.apply(this, [theKey, theValue]);
C$.$init$.apply(this);
this.chainForward = null;
this.chainBackward = null;
}, 1);

Clazz.newMethod$(C$, 'clone', function () {
var entry = C$.superClazz.prototype.clone.apply(this, arguments);
entry.chainBackward = this.chainBackward;
entry.chainForward = this.chainForward;
var lnext = entry.next;
if (lnext != null) {
entry.next = lnext.clone ();
}return entry;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
})()
});

//Created 2017-08-17 10:33:17
