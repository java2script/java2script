Clazz.load (["java.util.AbstractSequentialList", "$.List", "$.ListIterator", "$.Queue"], "java.util.LinkedList", ["java.lang.IllegalStateException", "$.IndexOutOfBoundsException", "java.lang.reflect.Array", "java.util.ConcurrentModificationException", "$.NoSuchElementException"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "LinkedList", java.util.AbstractSequentialList, [java.util.List, java.util.Queue, Cloneable, java.io.Serializable]);

Clazz.newMethod$(C$, '$init$', function () {
this.$size = 0;
this.voidLink = null;
}, 1);

Clazz.newMethod$ (C$, 'construct', function () {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.voidLink = Clazz.$new(java.util.LinkedList.Link.construct$TE$java_util_LinkedList_Link$java_util_LinkedList_Link,[null, null, null]);
this.voidLink.previous = this.voidLink;
this.voidLink.next = this.voidLink;
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_Collection', function (collection) {
C$.construct.apply(this);
this.addAll$java_util_Collection (collection);
}, 1);

Clazz.newMethod$ (C$, 'add$I$TE', function (location, object) {
if (0 <= location && location <= this.$size) {
var link = this.voidLink;
if (location < (Clazz.doubleToInt (this.$size / 2))) {
for (var i = 0; i <= location; i++) {
link = link.next;
}
} else {
for (var i = this.$size; i > location; i--) {
link = link.previous;
}
}var previous = link.previous;
var newLink = Clazz.$new(java.util.LinkedList.Link.construct$TE$java_util_LinkedList_Link$java_util_LinkedList_Link,[object, previous, link]);
previous.next = newLink;
link.previous = newLink;
this.$size++;
this.modCount++;
} else {
throw Clazz.$new(IndexOutOfBoundsException.construct);
}});

Clazz.newMethod$ (C$, 'add$TE', function (object) {
var oldLast = this.voidLink.previous;
var newLink = Clazz.$new(java.util.LinkedList.Link.construct$TE$java_util_LinkedList_Link$java_util_LinkedList_Link,[object, oldLast, this.voidLink]);
this.voidLink.previous = newLink;
oldLast.next = newLink;
this.$size++;
this.modCount++;
return true;
});

Clazz.newMethod$ (C$, 'addAll$I$java_util_Collection', function (location, collection) {
if (location < 0 || location > this.$size) {
throw Clazz.$new(IndexOutOfBoundsException.construct);
}var adding = collection.size ();
if (adding == 0) {
return false;
}var previous = this.voidLink;
if (location < (Clazz.doubleToInt (this.$size / 2))) {
for (var i = 0; i < location; i++) {
previous = previous.next;
}
} else {
for (var i = this.$size; i >= location; i--) {
previous = previous.previous;
}
}var next = previous.next;
for (var e, $e = collection.iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var newLink = Clazz.$new(java.util.LinkedList.Link.construct$TE$java_util_LinkedList_Link$java_util_LinkedList_Link,[e, previous, null]);
previous.next = newLink;
previous = newLink;
}
previous.next = next;
next.previous = previous;
this.$size += adding;
this.modCount++;
return true;
});

Clazz.newMethod$ (C$, 'addAll$java_util_Collection', function (collection) {
var adding = collection.size ();
if (adding == 0) {
return false;
}var previous = this.voidLink.previous;
for (var e, $e = collection.iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var newLink = Clazz.$new(java.util.LinkedList.Link.construct$TE$java_util_LinkedList_Link$java_util_LinkedList_Link,[e, previous, null]);
previous.next = newLink;
previous = newLink;
}
previous.next = this.voidLink;
this.voidLink.previous = previous;
this.$size += adding;
this.modCount++;
return true;
});

Clazz.newMethod$ (C$, 'addFirst$TE', function (object) {
var oldFirst = this.voidLink.next;
var newLink = Clazz.$new(java.util.LinkedList.Link.construct$TE$java_util_LinkedList_Link$java_util_LinkedList_Link,[object, this.voidLink, oldFirst]);
this.voidLink.next = newLink;
oldFirst.previous = newLink;
this.$size++;
this.modCount++;
});

Clazz.newMethod$ (C$, 'addLast$TE', function (object) {
var oldLast = this.voidLink.previous;
var newLink = Clazz.$new(java.util.LinkedList.Link.construct$TE$java_util_LinkedList_Link$java_util_LinkedList_Link,[object, oldLast, this.voidLink]);
this.voidLink.previous = newLink;
oldLast.next = newLink;
this.$size++;
this.modCount++;
});

Clazz.newMethod$ (C$, 'clear', function () {
if (this.$size > 0) {
this.$size = 0;
this.voidLink.next = this.voidLink;
this.voidLink.previous = this.voidLink;
this.modCount++;
}});

Clazz.newMethod$ (C$, 'clone', function () {
return Clazz.$new(java.util.LinkedList.construct$java_util_Collection,[this]);
});

Clazz.newMethod$ (C$, 'contains$O', function (object) {
var link = this.voidLink.next;
if (object != null) {
while (link !== this.voidLink) {
if (object.equals$O (link.data)) {
return true;
}link = link.next;
}
} else {
while (link !== this.voidLink) {
if (link.data == null) {
return true;
}link = link.next;
}
}return false;
});

Clazz.newMethod$ (C$, 'get$I', function (location) {
if (0 <= location && location < this.$size) {
var link = this.voidLink;
if (location < (Clazz.doubleToInt (this.$size / 2))) {
for (var i = 0; i <= location; i++) {
link = link.next;
}
} else {
for (var i = this.$size; i > location; i--) {
link = link.previous;
}
}return link.data;
}throw Clazz.$new(IndexOutOfBoundsException.construct);
});

Clazz.newMethod$ (C$, 'getFirst', function () {
var first = this.voidLink.next;
if (first !== this.voidLink) {
return first.data;
}throw Clazz.$new(java.util.NoSuchElementException.construct);
});

Clazz.newMethod$ (C$, 'getLast', function () {
var last = this.voidLink.previous;
if (last !== this.voidLink) {
return last.data;
}throw Clazz.$new(java.util.NoSuchElementException.construct);
});

Clazz.newMethod$ (C$, 'indexOf$O', function (object) {
var pos = 0;
var link = this.voidLink.next;
if (object != null) {
while (link !== this.voidLink) {
if (object.equals$O (link.data)) {
return pos;
}link = link.next;
pos++;
}
} else {
while (link !== this.voidLink) {
if (link.data == null) {
return pos;
}link = link.next;
pos++;
}
}return -1;
});

Clazz.newMethod$ (C$, 'lastIndexOf$O', function (object) {
var pos = this.$size;
var link = this.voidLink.previous;
if (object != null) {
while (link !== this.voidLink) {
pos--;
if (object.equals$O (link.data)) {
return pos;
}link = link.previous;
}
} else {
while (link !== this.voidLink) {
pos--;
if (link.data == null) {
return pos;
}link = link.previous;
}
}return -1;
});

Clazz.newMethod$ (C$, 'listIterator$I', function (location) {
return Clazz.$new(java.util.LinkedList.LinkIterator.construct$java_util_LinkedList$I,[this, location]);
});

Clazz.newMethod$ (C$, 'remove$I', function (location) {
if (0 <= location && location < this.$size) {
var link = this.voidLink;
if (location < (Clazz.doubleToInt (this.$size / 2))) {
for (var i = 0; i <= location; i++) {
link = link.next;
}
} else {
for (var i = this.$size; i > location; i--) {
link = link.previous;
}
}var previous = link.previous;
var next = link.next;
previous.next = next;
next.previous = previous;
this.$size--;
this.modCount++;
return link.data;
}throw Clazz.$new(IndexOutOfBoundsException.construct);
});

Clazz.newMethod$ (C$, 'remove$O', function (object) {
var link = this.voidLink.next;
if (object != null) {
while (link !== this.voidLink && !object.equals$O (link.data)) {
link = link.next;
}
} else {
while (link !== this.voidLink && link.data != null) {
link = link.next;
}
}if (link === this.voidLink) {
return false;
}var next = link.next;
var previous = link.previous;
previous.next = next;
next.previous = previous;
this.$size--;
this.modCount++;
return true;
});

Clazz.newMethod$ (C$, 'removeFirst', function () {
var first = this.voidLink.next;
if (first !== this.voidLink) {
var next = first.next;
this.voidLink.next = next;
next.previous = this.voidLink;
this.$size--;
this.modCount++;
return first.data;
}throw Clazz.$new(java.util.NoSuchElementException.construct);
});

Clazz.newMethod$ (C$, 'removeLast', function () {
var last = this.voidLink.previous;
if (last !== this.voidLink) {
var previous = last.previous;
this.voidLink.previous = previous;
previous.next = this.voidLink;
this.$size--;
this.modCount++;
return last.data;
}throw Clazz.$new(java.util.NoSuchElementException.construct);
});

Clazz.newMethod$ (C$, 'set$I$TE', function (location, object) {
if (0 <= location && location < this.$size) {
var link = this.voidLink;
if (location < (Clazz.doubleToInt (this.$size / 2))) {
for (var i = 0; i <= location; i++) {
link = link.next;
}
} else {
for (var i = this.$size; i > location; i--) {
link = link.previous;
}
}var result = link.data;
link.data = object;
return result;
}throw Clazz.$new(IndexOutOfBoundsException.construct);
});

Clazz.newMethod$ (C$, 'size', function () {
return this.$size;
});

Clazz.newMethod$ (C$, 'offer$TE', function (o) {
this.add$TE (o);
return true;
});

Clazz.newMethod$ (C$, 'poll', function () {
return this.$size == 0 ? null : this.removeFirst ();
});

Clazz.newMethod$ (C$, 'remove', function () {
return this.removeFirst ();
});

Clazz.newMethod$ (C$, 'peek', function () {
var first = this.voidLink.next;
return first === this.voidLink ? null : first.data;
});

Clazz.newMethod$ (C$, 'element', function () {
return this.getFirst ();
});

Clazz.newMethod$ (C$, 'toArray', function () {
var index = 0;
var contents =  new Array (this.$size);
var link = this.voidLink.next;
while (link !== this.voidLink) {
contents[index++] = link.data;
link = link.next;
}
return contents;
});

Clazz.newMethod$ (C$, 'toArray$TTA', function (contents) {
var index = 0;
if (this.$size > contents.length) {
var ct = contents.getClass ().getComponentType ();
contents = java.lang.reflect.Array.newInstance (ct, this.$size);
}var link = this.voidLink.next;
while (link !== this.voidLink) {
contents[index++] = link.data;
link = link.next;
}
if (index < contents.length) {
contents[index] = null;
}return contents;
});

Clazz.newMethod$ (C$, 'writeObject$java_io_ObjectOutputStream', function (stream) {
stream.defaultWriteObject ();
stream.writeInt$I (this.$size);
var it = this.iterator ();
while (it.hasNext ()) {
stream.writeObject$O (it.next ());
}
});

Clazz.newMethod$ (C$, 'readObject$java_io_ObjectInputStream', function (stream) {
stream.defaultReadObject ();
this.$size = stream.readInt ();
this.voidLink = Clazz.$new(java.util.LinkedList.Link.construct$TE$java_util_LinkedList_Link$java_util_LinkedList_Link,[null, null, null]);
var link = this.voidLink;
for (var i = this.$size; --i >= 0; ) {
var nextLink = Clazz.$new(java.util.LinkedList.Link.construct$TE$java_util_LinkedList_Link$java_util_LinkedList_Link,[stream.readObject (), link, null]);
link.next = nextLink;
link = nextLink;
}
link.next = this.voidLink;
this.voidLink.previous = link;
});
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.LinkedList, "Link");

Clazz.newMethod$(C$, '$init$', function () {
this.data = null;
this.previous = null;
this.next = null;
}, 1);

Clazz.newMethod$ (C$, 'construct$ET$java_util_LinkedList_Link$java_util_LinkedList_Link', function (o, p, n) {
C$.$init$.apply(this);
this.data = o;
this.previous = p;
this.next = n;
}, 1);

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util.LinkedList, "LinkIterator", null, java.util.ListIterator);

Clazz.newMethod$(C$, '$init$', function () {
this.pos = 0;
this.expectedModCount = 0;
this.list = null;
this.link = null;
this.lastLink = null;
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_LinkedList$I', function (object, location) {
C$.$init$.apply(this);
this.list = object;
this.expectedModCount = this.list.modCount;
if (0 <= location && location <= this.list.$size) {
this.link = this.list.voidLink;
if (location < Clazz.doubleToInt (this.list.$size / 2)) {
for (this.pos = -1; this.pos + 1 < location; this.pos++) {
this.link = this.link.next;
}
} else {
for (this.pos = this.list.$size; this.pos >= location; this.pos--) {
this.link = this.link.previous;
}
}} else {
throw Clazz.$new(IndexOutOfBoundsException.construct);
}}, 1);

Clazz.newMethod$ (C$, 'add$ET', function (object) {
if (this.expectedModCount == this.list.modCount) {
var next = this.link.next;
var newLink = Clazz.$new(java.util.LinkedList.Link.construct$ET$java_util_LinkedList_Link$java_util_LinkedList_Link,[object, this.link, next]);
this.link.next = newLink;
next.previous = newLink;
this.link = newLink;
this.lastLink = null;
this.pos++;
this.expectedModCount++;
this.list.$size++;
this.list.modCount++;
} else {
throw Clazz.$new(java.util.ConcurrentModificationException.construct);
}});

Clazz.newMethod$ (C$, 'hasNext', function () {
return this.link.next !== this.list.voidLink;
});

Clazz.newMethod$ (C$, 'hasPrevious', function () {
return this.link !== this.list.voidLink;
});

Clazz.newMethod$ (C$, 'next', function () {
if (this.expectedModCount == this.list.modCount) {
var next = this.link.next;
if (next !== this.list.voidLink) {
this.lastLink = this.link = next;
this.pos++;
return this.link.data;
}throw Clazz.$new(java.util.NoSuchElementException.construct);
}throw Clazz.$new(java.util.ConcurrentModificationException.construct);
});

Clazz.newMethod$ (C$, 'nextIndex', function () {
return this.pos + 1;
});

Clazz.newMethod$ (C$, 'previous', function () {
if (this.expectedModCount == this.list.modCount) {
if (this.link !== this.list.voidLink) {
this.lastLink = this.link;
this.link = this.link.previous;
this.pos--;
return this.lastLink.data;
}throw Clazz.$new(java.util.NoSuchElementException.construct);
}throw Clazz.$new(java.util.ConcurrentModificationException.construct);
});

Clazz.newMethod$ (C$, 'previousIndex', function () {
return this.pos;
});

Clazz.newMethod$ (C$, 'remove', function () {
if (this.expectedModCount == this.list.modCount) {
if (this.lastLink != null) {
var next = this.lastLink.next;
var previous = this.lastLink.previous;
next.previous = previous;
previous.next = next;
if (this.lastLink === this.link) {
this.pos--;
}this.link = previous;
this.lastLink = null;
this.expectedModCount++;
this.list.$size--;
this.list.modCount++;
} else {
throw Clazz.$new(IllegalStateException.construct);
}} else {
throw Clazz.$new(java.util.ConcurrentModificationException.construct);
}});

Clazz.newMethod$ (C$, 'set$ET', function (object) {
if (this.expectedModCount == this.list.modCount) {
if (this.lastLink != null) {
this.lastLink.data = object;
} else {
throw Clazz.$new(IllegalStateException.construct);
}} else {
throw Clazz.$new(java.util.ConcurrentModificationException.construct);
}});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
})()
});

//Created 2017-08-08 06:13:48
