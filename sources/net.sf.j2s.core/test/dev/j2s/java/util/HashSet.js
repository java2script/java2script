Clazz.load (["java.util.AbstractSet", "$.Set"], "java.util.HashSet", ["java.util.HashMap"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "HashSet", java.util.AbstractSet, [java.util.Set, Cloneable, java.io.Serializable]);

Clazz.newMethod$(C$, '$init$', function () {
this.backingMap = null;
}, 1);

Clazz.newMethod$ (C$, 'construct', function () {
C$.construct$java_util_HashMap.apply(this, [Clazz.$new(java.util.HashMap.construct)]);
}, 1);

Clazz.newMethod$ (C$, 'construct$I', function (capacity) {
C$.construct$java_util_HashMap.apply(this, [Clazz.$new(java.util.HashMap.construct$I,[capacity])]);
}, 1);

Clazz.newMethod$ (C$, 'construct$I$F', function (capacity, loadFactor) {
C$.construct$java_util_HashMap.apply(this, [Clazz.$new(java.util.HashMap.construct$I$F,[capacity, loadFactor])]);
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_Collection', function (collection) {
C$.construct$java_util_HashMap.apply(this, [Clazz.$new(java.util.HashMap.construct$I,[collection.size () < 6 ? 11 : collection.size () * 2])]);
for (var e, $e = collection.iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
this.add$TE (e);
}
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_HashMap', function (backingMap) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.backingMap = backingMap;
}, 1);

Clazz.newMethod$ (C$, 'add$TE', function (object) {
return this.backingMap.put$TE$java_util_HashSet (object, this) == null;
});

Clazz.newMethod$ (C$, 'clear', function () {
this.backingMap.clear ();
});

Clazz.newMethod$ (C$, 'clone', function () {
try {
var clone = C$.superClazz.prototype.clone.apply(this, arguments);
clone.backingMap = this.backingMap.clone ();
return clone;
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
return null;
} else {
throw e;
}
}
});

Clazz.newMethod$ (C$, 'contains$O', function (object) {
return this.backingMap.containsKey$O (object);
});

Clazz.newMethod$ (C$, 'isEmpty', function () {
return this.backingMap.isEmpty ();
});

Clazz.newMethod$ (C$, 'iterator', function () {
return this.backingMap.keySet ().iterator ();
});

Clazz.newMethod$ (C$, 'remove$O', function (object) {
return this.backingMap.remove$O (object) != null;
});

Clazz.newMethod$ (C$, 'size', function () {
return this.backingMap.size ();
});

Clazz.newMethod$ (C$, 'writeObject$java_io_ObjectOutputStream', function (stream) {
stream.defaultWriteObject ();
stream.writeInt$I (this.backingMap.elementData.length);
stream.writeFloat$F (this.backingMap.loadFactor);
stream.writeInt$I (this.backingMap.elementCount);
for (var i = this.backingMap.elementData.length; --i >= 0; ) {
var entry = this.backingMap.elementData[i];
while (entry != null) {
stream.writeObject$O (entry.key);
entry = entry.next;
}
}
});

Clazz.newMethod$ (C$, 'readObject$java_io_ObjectInputStream', function (stream) {
stream.defaultReadObject ();
var length = stream.readInt ();
var loadFactor = stream.readFloat ();
this.backingMap = this.createBackingMap$I$F (length, loadFactor);
var elementCount = stream.readInt ();
for (var i = elementCount; --i >= 0; ) {
var key = stream.readObject ();
this.backingMap.put$TE$java_util_HashSet (key, this);
}
});

Clazz.newMethod$ (C$, 'createBackingMap$I$F', function (capacity, loadFactor) {
return Clazz.$new(java.util.HashMap.construct$I$F,[capacity, loadFactor]);
});
})()
});

//Created 2017-08-08 06:13:47
