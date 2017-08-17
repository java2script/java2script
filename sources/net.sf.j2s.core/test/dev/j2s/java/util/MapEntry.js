Clazz.load (["java.util.Map"], "java.util.MapEntry", ["java.util.Map.Entry"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "MapEntry", null, [java.util.Map.Entry, Cloneable]);

Clazz.newMethod$(C$, '$init$', function () {
this.key = null;
this.value = null;
}, 1);

Clazz.newMethod$(C$, 'construct$TK', function (theKey) {
C$.$init$.apply(this);
this.key = theKey;
}, 1);

Clazz.newMethod$(C$, 'construct$TK$TV', function (theKey, theValue) {
C$.$init$.apply(this);
this.key = theKey;
this.value = theValue;
}, 1);

Clazz.newMethod$(C$, 'clone', function () {
try {
return C$.superClazz.prototype.clone.apply(this, arguments);
} catch (e) {
if (Clazz.exceptionOf(e, CloneNotSupportedException)){
return null;
} else {
throw e;
}
}
});

Clazz.newMethod$(C$, 'equals$O', function (object) {
if (this === object) {
return true;
}if (Clazz.instanceOf(object, java.util.Map.Entry)) {
var entry = object;
return (this.key == null ? entry.getKey () == null : this.key.equals$O (entry.getKey ())) && (this.value == null ? entry.getValue () == null : this.value.equals$O (entry.getValue ()));
}return false;
});

Clazz.newMethod$(C$, 'getKey', function () {
return this.key;
});

Clazz.newMethod$(C$, 'getValue', function () {
return this.value;
});

Clazz.newMethod$(C$, 'hashCode', function () {
return (this.key == null ? 0 : this.key.hashCode ()) ^ (this.value == null ? 0 : this.value.hashCode ());
});

Clazz.newMethod$(C$, 'setValue$TV', function (object) {
var result = this.value;
this.value = object;
return result;
});

Clazz.newMethod$(C$, 'toString', function () {
return this.key + "=" + this.value;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
Clazz.declareInterface (java.util.MapEntry, "Type");
})()
});

//Created 2017-08-17 10:33:17
