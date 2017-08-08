Clazz.load (["java.util.AbstractCollection", "$.Set"], "java.util.AbstractSet", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "AbstractSet", java.util.AbstractCollection, java.util.Set);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'construct', function () {
C$.superClazz.construct.apply(this);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'equals$O', function (object) {
if (this === object) {
return true;
}if (Clazz.instanceOf (object, java.util.Set)) {
var s = object;
return this.size () == s.size () && this.containsAll$java_util_Collection (s);
}return false;
});

Clazz.newMethod$ (C$, 'hashCode', function () {
var result = 0;
var it = this.iterator ();
while (it.hasNext ()) {
var next = it.next ();
result += next == null ? 0 : next.hashCode ();
}
return result;
});

Clazz.newMethod$ (C$, 'removeAll$java_util_Collection', function (collection) {
var result = false;
if (this.size () <= collection.size ()) {
var it = this.iterator ();
while (it.hasNext ()) {
if (collection.contains$O (it.next ())) {
it.remove ();
result = true;
}}
} else {
var it = collection.iterator ();
while (it.hasNext ()) {
result = this.remove$O (it.next ()) || result;
}
}return result;
});
})()
});

//Created 2017-08-08 06:13:46
