Clazz.load (["java.util.AbstractCollection", "$.Iterator", "$.List", "$.ListIterator", "$.RandomAccess", "$.NoSuchElementException"], "java.util.AbstractList", ["java.lang.IllegalArgumentException", "$.IllegalStateException", "$.IndexOutOfBoundsException", "$.UnsupportedOperationException", "java.util.ConcurrentModificationException"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
java.util.AbstractList.SimpleListIterator || java.util.AbstractList.$AbstractList$SimpleListIterator$ ();

java.util.AbstractList.FullListIterator || java.util.AbstractList.$AbstractList$FullListIterator$ ();

Clazz.newInstance$ (this, arguments);
}, java.util, "AbstractList", java.util.AbstractCollection, java.util.List);

Clazz.newMethod$(C$, '$init$', function () {
this.modCount = 0;
}, 1);

Clazz.newMethod$(C$, 'construct', function () {
C$.superClazz.construct.apply(this, []);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'add$I$TE', function (location, object) {
throw Clazz.$new(UnsupportedOperationException.construct,[]);
});

Clazz.newMethod$(C$, 'add$TE', function (object) {
this.add$I$TE (this.size (), object);
return true;
});

Clazz.newMethod$(C$, 'addAll$I$java_util_Collection', function (location, collection) {
var it = collection.iterator ();
while (it.hasNext ()) {
this.add$I$TE (location++, it.next ());
}
return !collection.isEmpty ();
});

Clazz.newMethod$(C$, 'clear', function () {
this.removeRange$I$I (0, this.size ());
});

Clazz.newMethod$(C$, 'equals$O', function (object) {
if (this === object) {
return true;
}if (Clazz.instanceOf(object, java.util.List)) {
var list = object;
if (list.size () != this.size ()) {
return false;
}var it1 = this.iterator ();
var it2 = list.iterator ();
while (it1.hasNext ()) {
var e1 = it1.next ();
var e2 = it2.next ();
if (!(e1 == null ? e2 == null : e1.equals$O (e2))) {
return false;
}}
return true;
}return false;
});

Clazz.newMethod$(C$, 'hashCode', function () {
var result = 1;
var it = this.iterator ();
while (it.hasNext ()) {
var object = it.next ();
result = (31 * result) + (object == null ? 0 : object.hashCode ());
}
return result;
});

Clazz.newMethod$(C$, 'indexOf$O', function (object) {
var it = this.listIterator ();
if (object != null) {
while (it.hasNext ()) {
if (object.equals$O (it.next ())) {
return it.previousIndex ();
}}
} else {
while (it.hasNext ()) {
if (it.next () == null) {
return it.previousIndex ();
}}
}return -1;
});

Clazz.newMethod$(C$, 'iterator', function () {
return Clazz.$new(java.util.AbstractList.SimpleListIterator.construct, [this, null]);
});

Clazz.newMethod$(C$, 'lastIndexOf$O', function (object) {
var it = this.listIterator$I (this.size ());
if (object != null) {
while (it.hasPrevious ()) {
if (object.equals$O (it.previous ())) {
return it.nextIndex ();
}}
} else {
while (it.hasPrevious ()) {
if (it.previous () == null) {
return it.nextIndex ();
}}
}return -1;
});

Clazz.newMethod$(C$, 'listIterator', function () {
return this.listIterator$I (0);
});

Clazz.newMethod$(C$, 'listIterator$I', function (location) {
return Clazz.$new(java.util.AbstractList.FullListIterator.construct$I, [this, null, location]);
});

Clazz.newMethod$(C$, 'remove$I', function (location) {
throw Clazz.$new(UnsupportedOperationException.construct,[]);
});

Clazz.newMethod$(C$, 'removeRange$I$I', function (start, end) {
var it = this.listIterator$I (start);
for (var i = start; i < end; i++) {
it.next ();
it.remove ();
}
});

Clazz.newMethod$(C$, 'set$I$TE', function (location, object) {
throw Clazz.$new(UnsupportedOperationException.construct,[]);
});

Clazz.newMethod$(C$, 'subList$I$I', function (start, end) {
if (0 <= start && end <= this.size ()) {
if (start <= end) {
if (Clazz.instanceOf(this, java.util.RandomAccess)) {
return Clazz.$new(java.util.AbstractList.SubAbstractListRandomAccess.construct$java_util_AbstractList$I$I,[this, start, end]);
}return Clazz.$new(java.util.AbstractList.SubAbstractList.construct$java_util_AbstractList$I$I,[this, start, end]);
}throw Clazz.$new(IllegalArgumentException.construct,[]);
}throw Clazz.$new(IndexOutOfBoundsException.construct,[]);
});
C$.$AbstractList$SimpleListIterator$ = function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.AbstractList, "SimpleListIterator", null, java.util.Iterator);

Clazz.newMethod$(C$, '$init$', function () {
this.pos = -1;
this.expectedModCount = 0;
this.lastPosition = -1;
}, 1);

Clazz.newMethod$(C$, 'construct', function () {
this.expectedModCount = this.b$["java.util.AbstractList"].modCount;
}, 1);

Clazz.newMethod$(C$, 'hasNext', function () {
return this.pos + 1 < this.b$["java.util.AbstractList"].size ();
});

Clazz.newMethod$(C$, 'next', function () {
if (this.expectedModCount == this.b$["java.util.AbstractList"].modCount) {
try {
var result = this.b$["java.util.AbstractList"].get$I (this.pos + 1);
this.lastPosition = ++this.pos;
return result;
} catch (e) {
if (Clazz.exceptionOf(e, IndexOutOfBoundsException)){
throw Clazz.$new(java.util.NoSuchElementException.construct,[]);
} else {
throw e;
}
}
}throw Clazz.$new(java.util.ConcurrentModificationException.construct,[]);
});

Clazz.newMethod$(C$, 'remove', function () {
if (this.expectedModCount == this.b$["java.util.AbstractList"].modCount) {
try {
this.b$["java.util.AbstractList"].remove$I (this.lastPosition);
} catch (e) {
if (Clazz.exceptionOf(e, IndexOutOfBoundsException)){
throw Clazz.$new(IllegalStateException.construct,[]);
} else {
throw e;
}
}
if (this.b$["java.util.AbstractList"].modCount != this.expectedModCount) {
this.expectedModCount++;
}if (this.pos == this.lastPosition) {
this.pos--;
}this.lastPosition = -1;
} else {
throw Clazz.$new(java.util.ConcurrentModificationException.construct,[]);
}});
})()
};
C$.$AbstractList$FullListIterator$ = function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.AbstractList, "FullListIterator", java.util.AbstractList.SimpleListIterator, java.util.ListIterator,Clazz.$new(java.util.AbstractList.SimpleListIterator.$init$, [this, null, Clazz.inheritArgs]));

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'construct$I', function (start) {
C$.superClazz.construct.apply(this, []);
C$.$init$.apply(this);
if (0 <= start && start <= this.b$["java.util.AbstractList"].size ()) {
this.pos = start - 1;
} else {
throw Clazz.$new(IndexOutOfBoundsException.construct,[]);
}}, 1);

Clazz.newMethod$(C$, 'add$TE', function (object) {
if (this.expectedModCount == this.b$["java.util.AbstractList"].modCount) {
try {
this.b$["java.util.AbstractList"].add$I$TE (this.pos + 1, object);
} catch (e) {
if (Clazz.exceptionOf(e, IndexOutOfBoundsException)){
throw Clazz.$new(java.util.NoSuchElementException.construct,[]);
} else {
throw e;
}
}
this.pos++;
this.lastPosition = -1;
if (this.b$["java.util.AbstractList"].modCount != this.expectedModCount) {
this.expectedModCount++;
}} else {
throw Clazz.$new(java.util.ConcurrentModificationException.construct,[]);
}});

Clazz.newMethod$(C$, 'hasPrevious', function () {
return this.pos >= 0;
});

Clazz.newMethod$(C$, 'nextIndex', function () {
return this.pos + 1;
});

Clazz.newMethod$(C$, 'previous', function () {
if (this.expectedModCount == this.b$["java.util.AbstractList"].modCount) {
try {
var result = this.b$["java.util.AbstractList"].get$I (this.pos);
this.lastPosition = this.pos;
this.pos--;
return result;
} catch (e) {
if (Clazz.exceptionOf(e, IndexOutOfBoundsException)){
throw Clazz.$new(java.util.NoSuchElementException.construct,[]);
} else {
throw e;
}
}
}throw Clazz.$new(java.util.ConcurrentModificationException.construct,[]);
});

Clazz.newMethod$(C$, 'previousIndex', function () {
return this.pos;
});

Clazz.newMethod$(C$, 'set$TE', function (object) {
if (this.expectedModCount == this.b$["java.util.AbstractList"].modCount) {
try {
this.b$["java.util.AbstractList"].set$I$TE (this.lastPosition, object);
} catch (e) {
if (Clazz.exceptionOf(e, IndexOutOfBoundsException)){
throw Clazz.$new(IllegalStateException.construct,[]);
} else {
throw e;
}
}
} else {
throw Clazz.$new(java.util.ConcurrentModificationException.construct,[]);
}});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
};
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.AbstractList, "SubAbstractListRandomAccess", java.util.AbstractList.SubAbstractList, java.util.RandomAccess);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_AbstractList$I$I', function (list, start, end) {
C$.superClazz.construct$java_util_AbstractList$I$I.apply(this, [list, start, end]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.AbstractList, "SubAbstractList", java.util.AbstractList);

Clazz.newMethod$(C$, '$init$', function () {
this.fullList = null;
this.offset = 0;
this.$size = 0;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_AbstractList$I$I', function (list, start, end) {
C$.superClazz.construct.apply(this, []);
C$.$init$.apply(this);
this.fullList = list;
this.modCount = this.fullList.modCount;
this.offset = start;
this.$size = end - start;
}, 1);

Clazz.newMethod$(C$, 'add$I$TE', function (location, object) {
if (this.modCount == this.fullList.modCount) {
if (0 <= location && location <= this.$size) {
this.fullList.add$I$TE (location + this.offset, object);
this.$size++;
this.modCount = this.fullList.modCount;
} else {
throw Clazz.$new(IndexOutOfBoundsException.construct,[]);
}} else {
throw Clazz.$new(java.util.ConcurrentModificationException.construct,[]);
}});

Clazz.newMethod$(C$, 'addAll$I$java_util_Collection', function (location, collection) {
if (this.modCount == this.fullList.modCount) {
if (0 <= location && location <= this.$size) {
var result = this.fullList.addAll$I$java_util_Collection (location + this.offset, collection);
if (result) {
this.$size += collection.size ();
this.modCount = this.fullList.modCount;
}return result;
}throw Clazz.$new(IndexOutOfBoundsException.construct,[]);
}throw Clazz.$new(java.util.ConcurrentModificationException.construct,[]);
});

Clazz.newMethod$(C$, 'addAll$java_util_Collection', function (collection) {
if (this.modCount == this.fullList.modCount) {
var result = this.fullList.addAll$I$java_util_Collection (this.offset + this.$size, collection);
if (result) {
this.$size += collection.size ();
this.modCount = this.fullList.modCount;
}return result;
}throw Clazz.$new(java.util.ConcurrentModificationException.construct,[]);
});

Clazz.newMethod$(C$, 'get$I', function (location) {
if (this.modCount == this.fullList.modCount) {
if (0 <= location && location < this.$size) {
return this.fullList.get$I (location + this.offset);
}throw Clazz.$new(IndexOutOfBoundsException.construct,[]);
}throw Clazz.$new(java.util.ConcurrentModificationException.construct,[]);
});

Clazz.newMethod$(C$, 'iterator', function () {
return this.listIterator$I (0);
});

Clazz.newMethod$(C$, 'listIterator$I', function (location) {
if (this.modCount == this.fullList.modCount) {
if (0 <= location && location <= this.$size) {
return Clazz.$new(java.util.AbstractList.SubAbstractList.SubAbstractListIterator.construct$java_util_ListIterator$java_util_AbstractList_SubAbstractList$I$I,[this.fullList.listIterator$I (location + this.offset), this, this.offset, this.$size]);
}throw Clazz.$new(IndexOutOfBoundsException.construct,[]);
}throw Clazz.$new(java.util.ConcurrentModificationException.construct,[]);
});

Clazz.newMethod$(C$, 'remove$I', function (location) {
if (this.modCount == this.fullList.modCount) {
if (0 <= location && location < this.$size) {
var result = this.fullList.remove$I (location + this.offset);
this.$size--;
this.modCount = this.fullList.modCount;
return result;
}throw Clazz.$new(IndexOutOfBoundsException.construct,[]);
}throw Clazz.$new(java.util.ConcurrentModificationException.construct,[]);
});

Clazz.newMethod$(C$, 'removeRange$I$I', function (start, end) {
if (start != end) {
if (this.modCount == this.fullList.modCount) {
this.fullList.removeRange$I$I (start + this.offset, end + this.offset);
this.$size -= end - start;
this.modCount = this.fullList.modCount;
} else {
throw Clazz.$new(java.util.ConcurrentModificationException.construct,[]);
}}});

Clazz.newMethod$(C$, 'set$I$TE', function (location, object) {
if (this.modCount == this.fullList.modCount) {
if (0 <= location && location < this.$size) {
return this.fullList.set$I$TE (location + this.offset, object);
}throw Clazz.$new(IndexOutOfBoundsException.construct,[]);
}throw Clazz.$new(java.util.ConcurrentModificationException.construct,[]);
});

Clazz.newMethod$(C$, 'size', function () {
return this.$size;
});

Clazz.newMethod$(C$, 'sizeChanged$Z', function (increment) {
if (increment) {
this.$size++;
} else {
this.$size--;
}this.modCount = this.fullList.modCount;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.AbstractList.SubAbstractList, "SubAbstractListIterator", null, java.util.ListIterator);

Clazz.newMethod$(C$, '$init$', function () {
this.subList = null;
this.iterator = null;
this.start = 0;
this.end = 0;
}, 1);

Clazz.newMethod$(C$, 'construct$java_util_ListIterator$java_util_AbstractList_SubAbstractList$I$I', function (it, list, offset, length) {
this.iterator = it;
this.subList = list;
this.start = offset;
this.end = this.start + length;
}, 1);

Clazz.newMethod$(C$, 'add$TE', function (object) {
this.iterator.add$TE (object);
this.subList.sizeChanged$Z (true);
this.end++;
});

Clazz.newMethod$(C$, 'hasNext', function () {
return this.iterator.nextIndex () < this.end;
});

Clazz.newMethod$(C$, 'hasPrevious', function () {
return this.iterator.previousIndex () >= this.start;
});

Clazz.newMethod$(C$, 'next', function () {
if (this.iterator.nextIndex () < this.end) {
return this.iterator.next ();
}throw Clazz.$new(java.util.NoSuchElementException.construct,[]);
});

Clazz.newMethod$(C$, 'nextIndex', function () {
return this.iterator.nextIndex () - this.start;
});

Clazz.newMethod$(C$, 'previous', function () {
if (this.iterator.previousIndex () >= this.start) {
return this.iterator.previous ();
}throw Clazz.$new(java.util.NoSuchElementException.construct,[]);
});

Clazz.newMethod$(C$, 'previousIndex', function () {
var previous = this.iterator.previousIndex ();
if (previous >= this.start) {
return previous - this.start;
}return -1;
});

Clazz.newMethod$(C$, 'remove', function () {
this.iterator.remove ();
this.subList.sizeChanged$Z (false);
this.end--;
});

Clazz.newMethod$(C$, 'set$TE', function (object) {
this.iterator.set$TE (object);
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
})()
})()
});

//Created 2017-08-17 10:33:15
