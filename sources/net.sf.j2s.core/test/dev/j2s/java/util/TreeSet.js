Clazz.load (["java.util.AbstractSet", "$.SortedSet", "$.TreeMap"], "java.util.TreeSet", ["java.lang.IllegalArgumentException"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "TreeSet", java.util.AbstractSet, [java.util.SortedSet, Cloneable, java.io.Serializable]);

Clazz.newMethod$(C$, '$init$', function () {
this.backingMap = null;
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_SortedMap', function (map) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.backingMap = map;
}, 1);

Clazz.newMethod$ (C$, 'construct', function () {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.backingMap = Clazz.$new(java.util.TreeMap.construct);
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_Collection', function (collection) {
C$.construct.apply(this);
this.addAll$java_util_Collection (collection);
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_Comparator', function (comparator) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.backingMap = Clazz.$new(java.util.TreeMap.construct$java_util_Comparator,[comparator]);
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_SortedSet', function (set) {
C$.construct$java_util_Comparator.apply(this, [set.comparator ()]);
var it = set.iterator ();
while (it.hasNext ()) {
this.add$TE (it.next ());
}
}, 1);

Clazz.newMethod$ (C$, 'add$TE', function (object) {
return this.backingMap.put$TE$TE (object, object) == null;
});

Clazz.newMethod$ (C$, 'addAll$java_util_Collection', function (collection) {
return C$.superClazz.prototype.addAll$java_util_Collection.apply(this, arguments);
});

Clazz.newMethod$ (C$, 'clear', function () {
this.backingMap.clear ();
});

Clazz.newMethod$ (C$, 'clone', function () {
try {
var clone = C$.superClazz.prototype.clone.apply(this, arguments);
if (Clazz.instanceOf (this.backingMap, java.util.TreeMap)) {
clone.backingMap = (this.backingMap).clone ();
} else {
clone.backingMap = Clazz.$new(java.util.TreeMap.construct$java_util_SortedMap,[this.backingMap]);
}return clone;
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
return null;
} else {
throw e;
}
}
});

Clazz.newMethod$ (C$, 'comparator', function () {
return this.backingMap.comparator ();
});

Clazz.newMethod$ (C$, 'contains$O', function (object) {
return this.backingMap.containsKey$O (object);
});

Clazz.newMethod$ (C$, 'first', function () {
return this.backingMap.firstKey ();
});

Clazz.newMethod$ (C$, 'headSet$TE', function (end) {
var c = this.backingMap.comparator ();
if (c == null) {
(end).compareTo$TE (end);
} else {
c.compare$$ (end, end);
}return Clazz.$new(java.util.TreeSet.construct$java_util_SortedMap,[this.backingMap.headMap$TE (end)]);
});

Clazz.newMethod$ (C$, 'isEmpty', function () {
return this.backingMap.isEmpty ();
});

Clazz.newMethod$ (C$, 'iterator', function () {
return this.backingMap.keySet ().iterator ();
});

Clazz.newMethod$ (C$, 'last', function () {
return this.backingMap.lastKey ();
});

Clazz.newMethod$ (C$, 'remove$O', function (object) {
return this.backingMap.remove$O (object) != null;
});

Clazz.newMethod$ (C$, 'size', function () {
return this.backingMap.size ();
});

Clazz.newMethod$ (C$, 'subSet$TE$TE', function (start, end) {
var c = this.backingMap.comparator ();
if (c == null) {
if ((start).compareTo$TE (end) <= 0) {
return Clazz.$new(java.util.TreeSet.construct$java_util_SortedMap,[this.backingMap.subMap$TE$TE (start, end)]);
}} else {
if (c.compare$$ (start, end) <= 0) {
return Clazz.$new(java.util.TreeSet.construct$java_util_SortedMap,[this.backingMap.subMap$TE$TE (start, end)]);
}}throw Clazz.$new(IllegalArgumentException.construct);
});

Clazz.newMethod$ (C$, 'tailSet$TE', function (start) {
var c = this.backingMap.comparator ();
if (c == null) {
(start).compareTo$TE (start);
} else {
c.compare$$ (start, start);
}return Clazz.$new(java.util.TreeSet.construct$java_util_SortedMap,[this.backingMap.tailMap$TE (start)]);
});

Clazz.newMethod$ (C$, 'writeObject$java_io_ObjectOutputStream', function (stream) {
stream.defaultWriteObject ();
stream.writeObject$O (this.backingMap.comparator ());
var size = this.backingMap.size ();
stream.writeInt$I (size);
if (size > 0) {
var it = this.backingMap.keySet ().iterator ();
while (it.hasNext ()) {
stream.writeObject$O (it.next ());
}
}});

Clazz.newMethod$ (C$, 'readObject$java_io_ObjectInputStream', function (stream) {
stream.defaultReadObject ();
var map = Clazz.$new(java.util.TreeMap.construct$java_util_Comparator,[stream.readObject ()]);
var size = stream.readInt ();
if (size > 0) {
var key = stream.readObject ();
var last = Clazz.$new(java.util.TreeMap.Entry.construct$TE$TE,[key, key]);
map.root = last;
map.$size = 1;
for (var i = 1; i < size; i++) {
key = stream.readObject ();
var x = Clazz.$new(java.util.TreeMap.Entry.construct$TE$TE,[key, key]);
x.parent = last;
last.right = x;
map.$size++;
map.balance$java_util_TreeMap_Entry (x);
last = x;
}
}this.backingMap = map;
});
})()
});

//Created 2017-08-08 06:13:49
