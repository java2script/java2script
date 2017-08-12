Clazz.load (["java.util.HashSet", "$.Set", "$.LinkedHashMap"], "java.util.LinkedHashSet", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "LinkedHashSet", java.util.HashSet, [java.util.Set, Cloneable, java.io.Serializable]);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'construct', function () {
C$.superClazz.construct$java_util_HashMap.apply(this, [Clazz.$new(java.util.LinkedHashMap.construct)]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'construct$I', function (capacity) {
C$.superClazz.construct$java_util_HashMap.apply(this, [Clazz.$new(java.util.LinkedHashMap.construct$I,[capacity])]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'construct$I$F', function (capacity, loadFactor) {
C$.superClazz.construct$java_util_HashMap.apply(this, [Clazz.$new(java.util.LinkedHashMap.construct$I$F,[capacity, loadFactor])]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'construct$java_util_Collection', function (collection) {
C$.superClazz.construct$java_util_HashMap.apply(this, [Clazz.$new(java.util.LinkedHashMap.construct$I,[collection.size () < 6 ? 11 : collection.size () * 2])]);
C$.$init$.apply(this);
for (var e, $e = collection.iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
this.add$TE (e);
}
}, 1);

Clazz.newMethod$ (C$, 'createBackingMap$I$F', function (capacity, loadFactor) {
return Clazz.$new(java.util.LinkedHashMap.construct$I$F,[capacity, loadFactor]);
});
})()
});

//Created 2017-08-12 07:32:20
