Clazz.load (["java.util.AbstractCollection", "$.AbstractMap", "$.AbstractSet", "$.Iterator", "$.MapEntry", "$.Set", "$.SortedMap"], "java.util.TreeMap", ["java.lang.IllegalArgumentException", "$.IllegalStateException", "java.util.ConcurrentModificationException", "java.util.Map.Entry", "java.util.NoSuchElementException"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "TreeMap", java.util.AbstractMap, [java.util.SortedMap, Cloneable, java.io.Serializable]);

Clazz.newMethod$(C$, '$init$', function () {
this.$size = 0;
this.root = null;
this.$comparator = null;
this.modCount = 0;
this.$entrySet = null;
}, 1);

Clazz.newMethod$ (C$, 'toComparable$TT', function (obj) {
return obj;
}, 1);

Clazz.newMethod$ (C$, 'construct', function () {
C$.superClazz.construct.apply(this);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_Comparator', function (comparator) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.$comparator = comparator;
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_Map', function (map) {
C$.construct.apply(this);
this.putAll$java_util_Map (map);
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_SortedMap', function (map) {
C$.construct$java_util_Comparator.apply(this, [map.comparator ()]);
var it = map.entrySet ().iterator ();
if (it.hasNext ()) {
var entry = it.next ();
var last = Clazz.$new(java.util.TreeMap.Entry.construct$TK$TV,[entry.getKey (), entry.getValue ()]);
this.root = last;
this.$size = 1;
while (it.hasNext ()) {
entry = it.next ();
var x = Clazz.$new(java.util.TreeMap.Entry.construct$TK$TV,[entry.getKey (), entry.getValue ()]);
x.parent = last;
last.right = x;
this.$size++;
this.balance$java_util_TreeMap_Entry (x);
last = x;
}
}}, 1);

Clazz.newMethod$ (C$, 'balance$java_util_TreeMap_Entry', function (x) {
var y;
x.color = true;
while (x !== this.root && x.parent.color) {
if (x.parent === x.parent.parent.left) {
y = x.parent.parent.right;
if (y != null && y.color) {
x.parent.color = false;
y.color = false;
x.parent.parent.color = true;
x = x.parent.parent;
} else {
if (x === x.parent.right) {
x = x.parent;
C$.prototype.leftRotate$java_util_TreeMap_Entry.apply(this, [x]);
}x.parent.color = false;
x.parent.parent.color = true;
C$.prototype.rightRotate$java_util_TreeMap_Entry.apply(this, [x.parent.parent]);
}} else {
y = x.parent.parent.left;
if (y != null && y.color) {
x.parent.color = false;
y.color = false;
x.parent.parent.color = true;
x = x.parent.parent;
} else {
if (x === x.parent.left) {
x = x.parent;
C$.prototype.rightRotate$java_util_TreeMap_Entry.apply(this, [x]);
}x.parent.color = false;
x.parent.parent.color = true;
C$.prototype.leftRotate$java_util_TreeMap_Entry.apply(this, [x.parent.parent]);
}}}
this.root.color = false;
});

Clazz.newMethod$ (C$, 'clear', function () {
this.root = null;
this.$size = 0;
this.modCount++;
});

Clazz.newMethod$ (C$, 'clone', function () {
try {
var clone = C$.superClazz.prototype.clone.apply(this, arguments);
clone.$entrySet = null;
if (this.root != null) {
clone.root = this.root.clone$java_util_TreeMap_Entry (null);
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
return this.$comparator;
});

Clazz.newMethod$ (C$, 'containsKey$O', function (key) {
return C$.prototype.find$O.apply(this, [key]) != null;
});

Clazz.newMethod$ (C$, 'containsValue$O', function (value) {
if (this.root != null) {
return C$.prototype.containsValue$java_util_TreeMap_Entry$O.apply(this, [this.root, value]);
}return false;
});

Clazz.newMethod$ (C$, 'containsValue$java_util_TreeMap_Entry$O', function (node, value) {
if (value == null ? node.value == null : value.equals$O (node.value)) {
return true;
}if (node.left != null) {
if (C$.prototype.containsValue$java_util_TreeMap_Entry$O.apply(this, [node.left, value])) {
return true;
}}if (node.right != null) {
if (C$.prototype.containsValue$java_util_TreeMap_Entry$O.apply(this, [node.right, value])) {
return true;
}}return false;
});

Clazz.newMethod$ (C$, 'entrySet', function () {
if (this.$entrySet == null) {
this.$entrySet = ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "TreeMap$1", java.util.AbstractSet);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'size', function () {
return this.b$["java.util.TreeMap"].$size;
});

Clazz.newMethod$ (C$, 'clear', function () {
this.b$["java.util.TreeMap"].clear ();
});

Clazz.newMethod$ (C$, 'contains$O', function (object) {
if (Clazz.instanceOf (object, java.util.Map.Entry)) {
var entry = object;
var v1 = this.b$["java.util.TreeMap"].get$O (entry.getKey ());
var v2 = entry.getValue ();
return v1 == null ? v2 == null : v1.equals$O (v2);
}return false;
});

Clazz.newMethod$ (C$, 'iterator', function () {
return Clazz.$new(java.util.TreeMap.UnboundedEntryIterator.construct$java_util_TreeMap,[this.b$["java.util.TreeMap"]]);
});
})()
), Clazz.$new(java.util.TreeMap$1.superClazz.construct, [this, null],java.util.TreeMap$1));
}return this.$entrySet;
});

Clazz.newMethod$ (C$, 'find$O', function (keyObj) {
var result;
var key = keyObj;
var object = null;
if (this.$comparator == null) {
object = java.util.TreeMap.toComparable$TK (key);
}var x = this.root;
while (x != null) {
result = object != null ? object.compareTo$TK (x.key) : this.$comparator.compare$$ (key, x.key);
if (result == 0) {
return x;
}x = result < 0 ? x.left : x.right;
}
return null;
});

Clazz.newMethod$ (C$, 'findAfter$O', function (keyObj) {
var key = keyObj;
var result;
var object = null;
if (this.$comparator == null) {
object = java.util.TreeMap.toComparable$TK (key);
}var x = this.root;
var last = null;
while (x != null) {
result = object != null ? object.compareTo$TK (x.key) : this.$comparator.compare$$ (key, x.key);
if (result == 0) {
return x;
}if (result < 0) {
last = x;
x = x.left;
} else {
x = x.right;
}}
return last;
});

Clazz.newMethod$ (C$, 'findBefore$TK', function (key) {
var result;
var object = null;
if (this.$comparator == null) {
object = java.util.TreeMap.toComparable$TK (key);
}var x = this.root;
var last = null;
while (x != null) {
result = object != null ? object.compareTo$TK (x.key) : this.$comparator.compare$$ (key, x.key);
if (result <= 0) {
x = x.left;
} else {
last = x;
x = x.right;
}}
return last;
});

Clazz.newMethod$ (C$, 'firstKey', function () {
if (this.root != null) {
return java.util.TreeMap.minimum$java_util_TreeMap_Entry (this.root).key;
}throw Clazz.$new(java.util.NoSuchElementException.construct);
});

Clazz.newMethod$ (C$, 'fixup$java_util_TreeMap_Entry', function (x) {
var w;
while (x !== this.root && !x.color) {
if (x === x.parent.left) {
w = x.parent.right;
if (w == null) {
x = x.parent;
continue;
}if (w.color) {
w.color = false;
x.parent.color = true;
C$.prototype.leftRotate$java_util_TreeMap_Entry.apply(this, [x.parent]);
w = x.parent.right;
if (w == null) {
x = x.parent;
continue;
}}if ((w.left == null || !w.left.color) && (w.right == null || !w.right.color)) {
w.color = true;
x = x.parent;
} else {
if (w.right == null || !w.right.color) {
w.left.color = false;
w.color = true;
C$.prototype.rightRotate$java_util_TreeMap_Entry.apply(this, [w]);
w = x.parent.right;
}w.color = x.parent.color;
x.parent.color = false;
w.right.color = false;
C$.prototype.leftRotate$java_util_TreeMap_Entry.apply(this, [x.parent]);
x = this.root;
}} else {
w = x.parent.left;
if (w == null) {
x = x.parent;
continue;
}if (w.color) {
w.color = false;
x.parent.color = true;
C$.prototype.rightRotate$java_util_TreeMap_Entry.apply(this, [x.parent]);
w = x.parent.left;
if (w == null) {
x = x.parent;
continue;
}}if ((w.left == null || !w.left.color) && (w.right == null || !w.right.color)) {
w.color = true;
x = x.parent;
} else {
if (w.left == null || !w.left.color) {
w.right.color = false;
w.color = true;
C$.prototype.leftRotate$java_util_TreeMap_Entry.apply(this, [w]);
w = x.parent.left;
}w.color = x.parent.color;
x.parent.color = false;
w.left.color = false;
C$.prototype.rightRotate$java_util_TreeMap_Entry.apply(this, [x.parent]);
x = this.root;
}}}
x.color = false;
});

Clazz.newMethod$ (C$, 'get$O', function (key) {
var node = C$.prototype.find$O.apply(this, [key]);
if (node != null) {
return node.value;
}return null;
});

Clazz.newMethod$ (C$, 'headMap$TK', function (endKey) {
if (this.$comparator == null) {
java.util.TreeMap.toComparable$TK (endKey).compareTo$TK (endKey);
} else {
this.$comparator.compare$$ (endKey, endKey);
}return Clazz.$new(java.util.TreeMap.SubMap.construct$java_util_TreeMap$TK,[this, endKey]);
});

Clazz.newMethod$ (C$, 'keySet', function () {
if (this.$keySet == null) {
this.$keySet = ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "TreeMap$2", java.util.AbstractSet);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'contains$O', function (object) {
return this.b$["java.util.TreeMap"].containsKey$O (object);
});

Clazz.newMethod$ (C$, 'size', function () {
return this.b$["java.util.TreeMap"].$size;
});

Clazz.newMethod$ (C$, 'clear', function () {
this.b$["java.util.TreeMap"].clear ();
});

Clazz.newMethod$ (C$, 'iterator', function () {
return Clazz.$new(java.util.TreeMap.UnboundedKeyIterator.construct$java_util_TreeMap,[this.b$["java.util.TreeMap"]]);
});
})()
), Clazz.$new(java.util.TreeMap$2.superClazz.construct, [this, null],java.util.TreeMap$2));
}return this.$keySet;
});

Clazz.newMethod$ (C$, 'lastKey', function () {
if (this.root != null) {
return java.util.TreeMap.maximum$java_util_TreeMap_Entry (this.root).key;
}throw Clazz.$new(java.util.NoSuchElementException.construct);
});

Clazz.newMethod$ (C$, 'leftRotate$java_util_TreeMap_Entry', function (x) {
var y = x.right;
x.right = y.left;
if (y.left != null) {
y.left.parent = x;
}y.parent = x.parent;
if (x.parent == null) {
this.root = y;
} else {
if (x === x.parent.left) {
x.parent.left = y;
} else {
x.parent.right = y;
}}y.left = x;
x.parent = y;
});

Clazz.newMethod$ (C$, 'maximum$java_util_TreeMap_Entry', function (x) {
while (x.right != null) {
x = x.right;
}
return x;
}, 1);

Clazz.newMethod$ (C$, 'minimum$java_util_TreeMap_Entry', function (x) {
while (x.left != null) {
x = x.left;
}
return x;
}, 1);

Clazz.newMethod$ (C$, 'predecessor$java_util_TreeMap_Entry', function (x) {
if (x.left != null) {
return java.util.TreeMap.maximum$java_util_TreeMap_Entry (x.left);
}var y = x.parent;
while (y != null && x === y.left) {
x = y;
y = y.parent;
}
return y;
}, 1);

Clazz.newMethod$ (C$, 'put$TK$TV', function (key, value) {
var entry = C$.prototype.rbInsert$TK.apply(this, [key]);
var result = entry.value;
entry.value = value;
return result;
});

Clazz.newMethod$ (C$, 'putAll$java_util_Map', function (map) {
C$.superClazz.prototype.putAll$java_util_Map.apply(this, arguments);
});

Clazz.newMethod$ (C$, 'rbDelete$java_util_TreeMap_Entry', function (z) {
var y = z.left == null || z.right == null ? z : java.util.TreeMap.successor$java_util_TreeMap_Entry (z);
var x = y.left != null ? y.left : y.right;
if (x != null) {
x.parent = y.parent;
}if (y.parent == null) {
this.root = x;
} else if (y === y.parent.left) {
y.parent.left = x;
} else {
y.parent.right = x;
}this.modCount++;
if (y !== z) {
z.key = y.key;
z.value = y.value;
}if (!y.color && this.root != null) {
if (x == null) {
C$.prototype.fixup$java_util_TreeMap_Entry.apply(this, [y.parent]);
} else {
C$.prototype.fixup$java_util_TreeMap_Entry.apply(this, [x]);
}}this.$size--;
});

Clazz.newMethod$ (C$, 'rbInsert$TK', function (object) {
var result = 0;
var y = null;
if (this.$size != 0) {
var key = null;
if (this.$comparator == null) {
key = java.util.TreeMap.toComparable$TK (object);
}var x = this.root;
while (x != null) {
y = x;
result = key != null ? key.compareTo$TK (x.key) : this.$comparator.compare$$ (object, x.key);
if (result == 0) {
return x;
}x = result < 0 ? x.left : x.right;
}
}this.$size++;
this.modCount++;
var z = Clazz.$new(java.util.TreeMap.Entry.construct$TK,[object]);
if (y == null) {
return this.root = z;
}z.parent = y;
if (result < 0) {
y.left = z;
} else {
y.right = z;
}this.balance$java_util_TreeMap_Entry (z);
return z;
});

Clazz.newMethod$ (C$, 'remove$O', function (key) {
var node = C$.prototype.find$O.apply(this, [key]);
if (node == null) {
return null;
}var result = node.value;
this.rbDelete$java_util_TreeMap_Entry (node);
return result;
});

Clazz.newMethod$ (C$, 'rightRotate$java_util_TreeMap_Entry', function (x) {
var y = x.left;
x.left = y.right;
if (y.right != null) {
y.right.parent = x;
}y.parent = x.parent;
if (x.parent == null) {
this.root = y;
} else {
if (x === x.parent.right) {
x.parent.right = y;
} else {
x.parent.left = y;
}}y.right = x;
x.parent = y;
});

Clazz.newMethod$ (C$, 'size', function () {
return this.$size;
});

Clazz.newMethod$ (C$, 'subMap$TK$TK', function (startKey, endKey) {
if (this.$comparator == null) {
if (java.util.TreeMap.toComparable$TK (startKey).compareTo$TK (endKey) <= 0) {
return Clazz.$new(java.util.TreeMap.SubMap.construct$TK$java_util_TreeMap$TK,[startKey, this, endKey]);
}} else {
if (this.$comparator.compare$$ (startKey, endKey) <= 0) {
return Clazz.$new(java.util.TreeMap.SubMap.construct$TK$java_util_TreeMap$TK,[startKey, this, endKey]);
}}throw Clazz.$new(IllegalArgumentException.construct);
});

Clazz.newMethod$ (C$, 'successor$java_util_TreeMap_Entry', function (x) {
if (x.right != null) {
return java.util.TreeMap.minimum$java_util_TreeMap_Entry (x.right);
}var y = x.parent;
while (y != null && x === y.right) {
x = y;
y = y.parent;
}
return y;
}, 1);

Clazz.newMethod$ (C$, 'tailMap$TK', function (startKey) {
if (this.$comparator == null) {
java.util.TreeMap.toComparable$TK (startKey).compareTo$TK (startKey);
} else {
this.$comparator.compare$$ (startKey, startKey);
}return Clazz.$new(java.util.TreeMap.SubMap.construct$TK$java_util_TreeMap,[startKey, this]);
});

Clazz.newMethod$ (C$, 'values', function () {
if (this.valuesCollection == null) {
this.valuesCollection = ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "TreeMap$3", java.util.AbstractCollection);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'contains$O', function (object) {
return this.b$["java.util.TreeMap"].containsValue$O (object);
});

Clazz.newMethod$ (C$, 'size', function () {
return this.b$["java.util.TreeMap"].$size;
});

Clazz.newMethod$ (C$, 'clear', function () {
this.b$["java.util.TreeMap"].clear ();
});

Clazz.newMethod$ (C$, 'iterator', function () {
return Clazz.$new(java.util.TreeMap.UnboundedValueIterator.construct$java_util_TreeMap,[this.b$["java.util.TreeMap"]]);
});
})()
), Clazz.$new(java.util.TreeMap$3.superClazz.construct, [this, null],java.util.TreeMap$3));
}return this.valuesCollection;
});

Clazz.newMethod$ (C$, 'writeObject$java_io_ObjectOutputStream', function (stream) {
stream.defaultWriteObject ();
stream.writeInt$I (this.$size);
if (this.$size > 0) {
var node = java.util.TreeMap.minimum$java_util_TreeMap_Entry (this.root);
while (node != null) {
stream.writeObject$O (node.key);
stream.writeObject$O (node.value);
node = java.util.TreeMap.successor$java_util_TreeMap_Entry (node);
}
}});

Clazz.newMethod$ (C$, 'readObject$java_io_ObjectInputStream', function (stream) {
stream.defaultReadObject ();
this.$size = stream.readInt ();
var last = null;
for (var i = this.$size; --i >= 0; ) {
var node = Clazz.$new(java.util.TreeMap.Entry.construct$TK,[stream.readObject ()]);
node.value = stream.readObject ();
if (last == null) {
this.root = node;
} else {
node.parent = last;
last.right = node;
this.balance$java_util_TreeMap_Entry (node);
}last = node;
}
});
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.TreeMap, "Entry", java.util.MapEntry);

Clazz.newMethod$(C$, '$init$', function () {
this.parent = null;
this.left = null;
this.right = null;
this.color = false;
}, 1);

Clazz.newMethod$ (C$, 'construct$TK', function (key) {
C$.superClazz.construct$TK.apply(this, [key]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'construct$TK$TV', function (key, value) {
C$.superClazz.construct$TK$TV.apply(this, [key, value]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'clone$java_util_TreeMap_Entry', function (parent) {
var clone = C$.superClazz.prototype.clone.apply(this, arguments);
clone.parent = parent;
if (this.left != null) {
clone.left = this.left.clone$java_util_TreeMap_Entry (clone);
}if (this.right != null) {
clone.right = this.right.clone$java_util_TreeMap_Entry (clone);
}return clone;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.TreeMap, "AbstractMapIterator");

Clazz.newMethod$(C$, '$init$', function () {
this.backingMap = null;
this.expectedModCount = 0;
this.node = null;
this.lastNode = null;
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_TreeMap$java_util_TreeMap_Entry', function (map, startNode) {
C$.$init$.apply(this);
this.backingMap = map;
this.expectedModCount = map.modCount;
this.node = startNode;
}, 1);

Clazz.newMethod$ (C$, 'hasNext', function () {
return this.node != null;
});

Clazz.newMethod$ (C$, 'remove', function () {
if (this.expectedModCount == this.backingMap.modCount) {
if (this.lastNode != null) {
this.backingMap.rbDelete$java_util_TreeMap_Entry (this.lastNode);
this.lastNode = null;
this.expectedModCount++;
} else {
throw Clazz.$new(IllegalStateException.construct);
}} else {
throw Clazz.$new(java.util.ConcurrentModificationException.construct);
}});

Clazz.newMethod$ (C$, 'makeNext', function () {
if (this.expectedModCount != this.backingMap.modCount) {
throw Clazz.$new(java.util.ConcurrentModificationException.construct);
} else if (this.node == null) {
throw Clazz.$new(java.util.NoSuchElementException.construct);
}this.lastNode = this.node;
this.node = java.util.TreeMap.successor$java_util_TreeMap_Entry (this.node);
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.TreeMap, "UnboundedEntryIterator", java.util.TreeMap.AbstractMapIterator, java.util.Iterator);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_TreeMap$java_util_TreeMap_Entry', function (map, startNode) {
C$.superClazz.construct$java_util_TreeMap$java_util_TreeMap_Entry.apply(this, [map, startNode]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_TreeMap', function (map) {
C$.superClazz.construct$java_util_TreeMap$java_util_TreeMap_Entry.apply(this, [map, map.root == null ? null : java.util.TreeMap.minimum$java_util_TreeMap_Entry (map.root)]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'next', function () {
this.makeNext ();
return this.lastNode;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.TreeMap, "UnboundedKeyIterator", java.util.TreeMap.AbstractMapIterator, java.util.Iterator);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_TreeMap$java_util_TreeMap_Entry', function (treeMap, entry) {
C$.superClazz.construct$java_util_TreeMap$java_util_TreeMap_Entry.apply(this, [treeMap, entry]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_TreeMap', function (map) {
C$.superClazz.construct$java_util_TreeMap$java_util_TreeMap_Entry.apply(this, [map, map.root == null ? null : java.util.TreeMap.minimum$java_util_TreeMap_Entry (map.root)]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'next', function () {
this.makeNext ();
return this.lastNode.key;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.TreeMap, "UnboundedValueIterator", java.util.TreeMap.AbstractMapIterator, java.util.Iterator);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_TreeMap$java_util_TreeMap_Entry', function (treeMap, startNode) {
C$.superClazz.construct$java_util_TreeMap$java_util_TreeMap_Entry.apply(this, [treeMap, startNode]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_TreeMap', function (map) {
C$.superClazz.construct$java_util_TreeMap$java_util_TreeMap_Entry.apply(this, [map, map.root == null ? null : java.util.TreeMap.minimum$java_util_TreeMap_Entry (map.root)]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'next', function () {
this.makeNext ();
return this.lastNode.value;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.TreeMap, "ComparatorBoundedIterator", java.util.TreeMap.AbstractMapIterator);

Clazz.newMethod$(C$, '$init$', function () {
this.endKey = null;
this.cmp = null;
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_TreeMap$java_util_TreeMap_Entry$TK', function (map, startNode, end) {
C$.superClazz.construct$java_util_TreeMap$java_util_TreeMap_Entry.apply(this, [map, startNode]);
C$.$init$.apply(this);
this.endKey = end;
this.cmp = map.comparator ();
}, 1);

Clazz.newMethod$ (C$, 'cleanNext', function () {
if (this.node != null && this.cmp.compare$$ (this.endKey, this.node.key) <= 0) {
this.node = null;
}});

Clazz.newMethod$ (C$, 'hasNext', function () {
return (this.node != null && this.endKey != null) && (this.cmp.compare$$ (this.node.key, this.endKey) < 0);
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.TreeMap, "ComparatorBoundedEntryIterator", java.util.TreeMap.ComparatorBoundedIterator, java.util.Iterator);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_TreeMap$java_util_TreeMap_Entry$TK', function (map, startNode, end) {
C$.superClazz.construct$java_util_TreeMap$java_util_TreeMap_Entry$TK.apply(this, [map, startNode, end]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'next', function () {
this.makeNext ();
this.cleanNext ();
return this.lastNode;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.TreeMap, "ComparatorBoundedKeyIterator", java.util.TreeMap.ComparatorBoundedIterator, java.util.Iterator);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_TreeMap$java_util_TreeMap_Entry$TK', function (map, startNode, end) {
C$.superClazz.construct$java_util_TreeMap$java_util_TreeMap_Entry$TK.apply(this, [map, startNode, end]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'next', function () {
this.makeNext ();
this.cleanNext ();
return this.lastNode.key;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.TreeMap, "ComparatorBoundedValueIterator", java.util.TreeMap.ComparatorBoundedIterator, java.util.Iterator);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_TreeMap$java_util_TreeMap_Entry$TK', function (map, startNode, end) {
C$.superClazz.construct$java_util_TreeMap$java_util_TreeMap_Entry$TK.apply(this, [map, startNode, end]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'next', function () {
this.makeNext ();
this.cleanNext ();
return this.lastNode.value;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.TreeMap, "ComparableBoundedIterator", java.util.TreeMap.AbstractMapIterator);

Clazz.newMethod$(C$, '$init$', function () {
this.endKey = null;
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_TreeMap$java_util_TreeMap_Entry$Comparable', function (treeMap, entry, endKey) {
C$.superClazz.construct$java_util_TreeMap$java_util_TreeMap_Entry.apply(this, [treeMap, entry]);
C$.$init$.apply(this);
this.endKey = endKey;
}, 1);

Clazz.newMethod$ (C$, 'cleanNext', function () {
if ((this.node != null) && (this.endKey.compareTo$TK (this.node.key) <= 0)) {
this.node = null;
}});

Clazz.newMethod$ (C$, 'hasNext', function () {
return (this.node != null) && (this.endKey.compareTo$TK (this.node.key) > 0);
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.TreeMap, "ComparableBoundedEntryIterator", java.util.TreeMap.ComparableBoundedIterator, java.util.Iterator);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_TreeMap$java_util_TreeMap_Entry$Comparable', function (map, startNode, end) {
C$.superClazz.construct$java_util_TreeMap$java_util_TreeMap_Entry$Comparable.apply(this, [map, startNode, end]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'next', function () {
this.makeNext ();
this.cleanNext ();
return this.lastNode;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.TreeMap, "ComparableBoundedKeyIterator", java.util.TreeMap.ComparableBoundedIterator, java.util.Iterator);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_TreeMap$java_util_TreeMap_Entry$Comparable', function (map, startNode, end) {
C$.superClazz.construct$java_util_TreeMap$java_util_TreeMap_Entry$Comparable.apply(this, [map, startNode, end]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'next', function () {
this.makeNext ();
this.cleanNext ();
return this.lastNode.key;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.TreeMap, "ComparableBoundedValueIterator", java.util.TreeMap.ComparableBoundedIterator, java.util.Iterator);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_TreeMap$java_util_TreeMap_Entry$Comparable', function (map, startNode, end) {
C$.superClazz.construct$java_util_TreeMap$java_util_TreeMap_Entry$Comparable.apply(this, [map, startNode, end]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'next', function () {
this.makeNext ();
this.cleanNext ();
return this.lastNode.value;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.TreeMap, "SubMap", java.util.AbstractMap, [java.util.SortedMap, java.io.Serializable]);

Clazz.newMethod$(C$, '$init$', function () {
this.backingMap = null;
this.hasStart = false;
this.hasEnd = false;
this.startKey = null;
this.endKey = null;
this.$entrySet = null;
}, 1);

Clazz.newMethod$ (C$, 'construct$TK$java_util_TreeMap', function (start, map) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.backingMap = map;
this.hasStart = true;
this.startKey = start;
}, 1);

Clazz.newMethod$ (C$, 'construct$TK$java_util_TreeMap$TK', function (start, map, end) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.backingMap = map;
this.hasStart = this.hasEnd = true;
this.startKey = start;
this.endKey = end;
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_TreeMap$TK', function (map, end) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.backingMap = map;
this.hasEnd = true;
this.endKey = end;
}, 1);

Clazz.newMethod$ (C$, 'checkRange$TK', function (key) {
var cmp = this.backingMap.$comparator;
if (cmp == null) {
var object = java.util.TreeMap.toComparable$TK (key);
if (this.hasStart && object.compareTo$TK (this.startKey) < 0) {
throw Clazz.$new(IllegalArgumentException.construct);
}if (this.hasEnd && object.compareTo$TK (this.endKey) >= 0) {
throw Clazz.$new(IllegalArgumentException.construct);
}} else {
if (this.hasStart && this.backingMap.comparator ().compare$$ (key, this.startKey) < 0) {
throw Clazz.$new(IllegalArgumentException.construct);
}if (this.hasEnd && this.backingMap.comparator ().compare$$ (key, this.endKey) >= 0) {
throw Clazz.$new(IllegalArgumentException.construct);
}}});

Clazz.newMethod$ (C$, 'isInRange$TK', function (key) {
var cmp = this.backingMap.$comparator;
if (cmp == null) {
var object = java.util.TreeMap.toComparable$TK (key);
if (this.hasStart && object.compareTo$TK (this.startKey) < 0) {
return false;
}if (this.hasEnd && object.compareTo$TK (this.endKey) >= 0) {
return false;
}} else {
if (this.hasStart && cmp.compare$$ (key, this.startKey) < 0) {
return false;
}if (this.hasEnd && cmp.compare$$ (key, this.endKey) >= 0) {
return false;
}}return true;
});

Clazz.newMethod$ (C$, 'checkUpperBound$TK', function (key) {
if (this.hasEnd) {
var cmp = this.backingMap.$comparator;
if (cmp == null) {
return (java.util.TreeMap.toComparable$TK (key).compareTo$TK (this.endKey) < 0);
}return (cmp.compare$$ (key, this.endKey) < 0);
}return true;
});

Clazz.newMethod$ (C$, 'checkLowerBound$TK', function (key) {
if (this.hasStart) {
var cmp = this.backingMap.$comparator;
if (cmp == null) {
return (java.util.TreeMap.toComparable$TK (key).compareTo$TK (this.startKey) >= 0);
}return (cmp.compare$$ (key, this.startKey) >= 0);
}return true;
});

Clazz.newMethod$ (C$, 'comparator', function () {
return this.backingMap.comparator ();
});

Clazz.newMethod$ (C$, 'containsKey$O', function (key) {
if (C$.prototype.isInRange$TK.apply(this, [key])) {
return this.backingMap.containsKey$O (key);
}return false;
});

Clazz.newMethod$ (C$, 'entrySet', function () {
if (this.$entrySet == null) {
this.$entrySet = Clazz.$new(java.util.TreeMap.SubMapEntrySet.construct$java_util_TreeMap_SubMap,[this]);
}return this.$entrySet;
});

Clazz.newMethod$ (C$, 'firstKey', function () {
var node = this.firstEntry ();
if (node != null) {
return node.key;
}throw Clazz.$new(java.util.NoSuchElementException.construct);
});

Clazz.newMethod$ (C$, 'firstEntry', function () {
if (!this.hasStart) {
var root = this.backingMap.root;
return (root == null) ? null : java.util.TreeMap.minimum$java_util_TreeMap_Entry (this.backingMap.root);
}var node = this.backingMap.findAfter$O (this.startKey);
if (node != null && C$.prototype.checkUpperBound$TK.apply(this, [node.key])) {
return node;
}return null;
});

Clazz.newMethod$ (C$, 'get$O', function (key) {
if (C$.prototype.isInRange$TK.apply(this, [key])) {
return this.backingMap.get$O (key);
}return null;
});

Clazz.newMethod$ (C$, 'headMap$TK', function (endKey) {
C$.prototype.checkRange$TK.apply(this, [endKey]);
if (this.hasStart) {
return Clazz.$new(java.util.TreeMap.SubMap.construct$TK$java_util_TreeMap$TK,[this.startKey, this.backingMap, endKey]);
}return Clazz.$new(java.util.TreeMap.SubMap.construct$java_util_TreeMap$TK,[this.backingMap, endKey]);
});

Clazz.newMethod$ (C$, 'isEmpty', function () {
if (this.hasStart) {
var node = this.backingMap.findAfter$O (this.startKey);
return node == null || !C$.prototype.checkUpperBound$TK.apply(this, [node.key]);
}return this.backingMap.findBefore$TK (this.endKey) == null;
});

Clazz.newMethod$ (C$, 'keySet', function () {
if (this.$keySet == null) {
this.$keySet = Clazz.$new(java.util.TreeMap.SubMapKeySet.construct$java_util_TreeMap_SubMap,[this]);
}return this.$keySet;
});

Clazz.newMethod$ (C$, 'lastKey', function () {
if (!this.hasEnd) {
return this.backingMap.lastKey ();
}var node = this.backingMap.findBefore$TK (this.endKey);
if (node != null && C$.prototype.checkLowerBound$TK.apply(this, [node.key])) {
return node.key;
}throw Clazz.$new(java.util.NoSuchElementException.construct);
});

Clazz.newMethod$ (C$, 'put$TK$TV', function (key, value) {
if (C$.prototype.isInRange$TK.apply(this, [key])) {
return this.backingMap.put$TK$TV (key, value);
}throw Clazz.$new(IllegalArgumentException.construct);
});

Clazz.newMethod$ (C$, 'remove$O', function (key) {
if (C$.prototype.isInRange$TK.apply(this, [key])) {
return this.backingMap.remove$O (key);
}return null;
});

Clazz.newMethod$ (C$, 'subMap$TK$TK', function (startKey, endKey) {
C$.prototype.checkRange$TK.apply(this, [startKey]);
C$.prototype.checkRange$TK.apply(this, [endKey]);
var c = this.backingMap.comparator ();
if (c == null) {
if (java.util.TreeMap.toComparable$TK (startKey).compareTo$TK (endKey) <= 0) {
return Clazz.$new(java.util.TreeMap.SubMap.construct$TK$java_util_TreeMap$TK,[startKey, this.backingMap, endKey]);
}} else {
if (c.compare$$ (startKey, endKey) <= 0) {
return Clazz.$new(java.util.TreeMap.SubMap.construct$TK$java_util_TreeMap$TK,[startKey, this.backingMap, endKey]);
}}throw Clazz.$new(IllegalArgumentException.construct);
});

Clazz.newMethod$ (C$, 'tailMap$TK', function (startKey) {
C$.prototype.checkRange$TK.apply(this, [startKey]);
if (this.hasEnd) {
return Clazz.$new(java.util.TreeMap.SubMap.construct$TK$java_util_TreeMap$TK,[startKey, this.backingMap, this.endKey]);
}return Clazz.$new(java.util.TreeMap.SubMap.construct$TK$java_util_TreeMap,[startKey, this.backingMap]);
});

Clazz.newMethod$ (C$, 'values', function () {
if (this.valuesCollection == null) {
this.valuesCollection = Clazz.$new(java.util.TreeMap.SubMapValuesCollection.construct$java_util_TreeMap_SubMap,[this]);
}return this.valuesCollection;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.TreeMap, "SubMapEntrySet", java.util.AbstractSet, java.util.Set);

Clazz.newMethod$(C$, '$init$', function () {
this.subMap = null;
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_TreeMap_SubMap', function (map) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.subMap = map;
}, 1);

Clazz.newMethod$ (C$, 'isEmpty', function () {
return this.subMap.isEmpty ();
});

Clazz.newMethod$ (C$, 'iterator', function () {
var startNode = this.subMap.firstEntry ();
if (this.subMap.hasEnd) {
var cmp = this.subMap.comparator ();
if (cmp == null) {
return Clazz.$new(java.util.TreeMap.ComparableBoundedEntryIterator.construct$java_util_TreeMap$java_util_TreeMap_Entry$Comparable,[this.subMap.backingMap, startNode, java.util.TreeMap.toComparable$TK (this.subMap.endKey)]);
}return Clazz.$new(java.util.TreeMap.ComparatorBoundedEntryIterator.construct$java_util_TreeMap$java_util_TreeMap_Entry$TK,[this.subMap.backingMap, startNode, this.subMap.endKey]);
}return Clazz.$new(java.util.TreeMap.UnboundedEntryIterator.construct$java_util_TreeMap$java_util_TreeMap_Entry,[this.subMap.backingMap, startNode]);
});

Clazz.newMethod$ (C$, 'size', function () {
var size = 0;
var it = this.iterator ();
while (it.hasNext ()) {
size++;
it.next ();
}
return size;
});

Clazz.newMethod$ (C$, 'contains$O', function (object) {
if (Clazz.instanceOf (object, java.util.Map.Entry)) {
var entry = object;
var key = entry.getKey ();
if (this.subMap.isInRange$TK (key)) {
var v1 = this.subMap.get$O (key);
var v2 = entry.getValue ();
return v1 == null ? v2 == null : v1.equals$O (v2);
}}return false;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.TreeMap, "SubMapKeySet", java.util.AbstractSet, java.util.Set);

Clazz.newMethod$(C$, '$init$', function () {
this.subMap = null;
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_TreeMap_SubMap', function (map) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.subMap = map;
}, 1);

Clazz.newMethod$ (C$, 'contains$O', function (object) {
return this.subMap.containsKey$O (object);
});

Clazz.newMethod$ (C$, 'isEmpty', function () {
return this.subMap.isEmpty ();
});

Clazz.newMethod$ (C$, 'size', function () {
var size = 0;
var it = this.iterator ();
while (it.hasNext ()) {
size++;
it.next ();
}
return size;
});

Clazz.newMethod$ (C$, 'iterator', function () {
var startNode = this.subMap.firstEntry ();
if (this.subMap.hasEnd) {
var cmp = this.subMap.comparator ();
if (cmp == null) {
return Clazz.$new(java.util.TreeMap.ComparableBoundedKeyIterator.construct$java_util_TreeMap$java_util_TreeMap_Entry$Comparable,[this.subMap.backingMap, startNode, java.util.TreeMap.toComparable$TK (this.subMap.endKey)]);
}return Clazz.$new(java.util.TreeMap.ComparatorBoundedKeyIterator.construct$java_util_TreeMap$java_util_TreeMap_Entry$TK,[this.subMap.backingMap, startNode, this.subMap.endKey]);
}return Clazz.$new(java.util.TreeMap.UnboundedKeyIterator.construct$java_util_TreeMap$java_util_TreeMap_Entry,[this.subMap.backingMap, startNode]);
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.TreeMap, "SubMapValuesCollection", java.util.AbstractCollection);

Clazz.newMethod$(C$, '$init$', function () {
this.subMap = null;
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_TreeMap_SubMap', function (subMap) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.subMap = subMap;
}, 1);

Clazz.newMethod$ (C$, 'isEmpty', function () {
return this.subMap.isEmpty ();
});

Clazz.newMethod$ (C$, 'iterator', function () {
var startNode = this.subMap.firstEntry ();
if (this.subMap.hasEnd) {
var cmp = this.subMap.comparator ();
if (cmp == null) {
return Clazz.$new(java.util.TreeMap.ComparableBoundedValueIterator.construct$java_util_TreeMap$java_util_TreeMap_Entry$Comparable,[this.subMap.backingMap, startNode, java.util.TreeMap.toComparable$TK (this.subMap.endKey)]);
}return Clazz.$new(java.util.TreeMap.ComparatorBoundedValueIterator.construct$java_util_TreeMap$java_util_TreeMap_Entry$TK,[this.subMap.backingMap, startNode, this.subMap.endKey]);
}return Clazz.$new(java.util.TreeMap.UnboundedValueIterator.construct$java_util_TreeMap$java_util_TreeMap_Entry,[this.subMap.backingMap, startNode]);
});

Clazz.newMethod$ (C$, 'size', function () {
var cnt = 0;
for (var it = this.iterator (); it.hasNext (); ) {
it.next ();
cnt++;
}
return cnt;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
})()
});

//Created 2017-08-08 06:13:49
