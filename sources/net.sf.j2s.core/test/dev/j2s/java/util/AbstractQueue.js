Clazz.load (["java.util.AbstractCollection", "$.Queue"], "java.util.AbstractQueue", ["java.lang.IllegalArgumentException", "$.IllegalStateException", "$.NullPointerException", "java.util.NoSuchElementException"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "AbstractQueue", java.util.AbstractCollection, java.util.Queue);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'construct', function () {
C$.superClazz.construct.apply(this);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'add$TE', function (o) {
if (null == o) {
throw Clazz.$new(NullPointerException.construct);
}if (this.offer$TE (o)) {
return true;
}throw Clazz.$new(IllegalStateException.construct);
});

Clazz.newMethod$ (C$, 'addAll$java_util_Collection', function (c) {
if (null == c) {
throw Clazz.$new(NullPointerException.construct);
}if (this === c) {
throw Clazz.$new(IllegalArgumentException.construct);
}return C$.superClazz.prototype.addAll$java_util_Collection.apply(this, arguments);
});

Clazz.newMethod$ (C$, 'remove', function () {
var o = this.poll ();
if (null == o) {
throw Clazz.$new(java.util.NoSuchElementException.construct);
}return o;
});

Clazz.newMethod$ (C$, 'element', function () {
var o = this.peek ();
if (null == o) {
throw Clazz.$new(java.util.NoSuchElementException.construct);
}return o;
});

Clazz.newMethod$ (C$, 'clear', function () {
var o;
do {
o = this.poll ();
} while (null != o);
});
})()
});

//Created 2017-08-12 07:32:18
