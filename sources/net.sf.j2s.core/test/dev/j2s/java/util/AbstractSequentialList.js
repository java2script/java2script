Clazz.load (["java.util.AbstractList"], "java.util.AbstractSequentialList", ["java.lang.IndexOutOfBoundsException"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "AbstractSequentialList", java.util.AbstractList);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'construct', function () {
C$.superClazz.construct.apply(this);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'add$I$TE', function (location, object) {
this.listIterator$I (location).add$TE (object);
});

Clazz.newMethod$ (C$, 'addAll$I$java_util_Collection', function (location, collection) {
var it = this.listIterator$I (location);
var colIt = collection.iterator ();
var next = it.nextIndex ();
while (colIt.hasNext ()) {
it.add$TE (colIt.next ());
it.previous ();
}
return next != it.nextIndex ();
});

Clazz.newMethod$ (C$, 'get$I', function (location) {
try {
return this.listIterator$I (location).next ();
} catch (e) {
if (Clazz.exceptionOf (e, java.util.NoSuchElementException)) {
throw Clazz.$new(IndexOutOfBoundsException.construct);
} else {
throw e;
}
}
});

Clazz.newMethod$ (C$, 'iterator', function () {
return this.listIterator$I (0);
});

Clazz.newMethod$ (C$, 'remove$I', function (location) {
try {
var it = this.listIterator$I (location);
var result = it.next ();
it.remove ();
return result;
} catch (e) {
if (Clazz.exceptionOf (e, java.util.NoSuchElementException)) {
throw Clazz.$new(IndexOutOfBoundsException.construct);
} else {
throw e;
}
}
});

Clazz.newMethod$ (C$, 'set$I$TE', function (location, object) {
var it = this.listIterator$I (location);
var result = it.next ();
it.set$TE (object);
return result;
});
})()
});

//Created 2017-08-12 07:32:18
