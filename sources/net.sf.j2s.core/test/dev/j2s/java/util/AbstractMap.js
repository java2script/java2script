Clazz.load (["java.util.Map"], "java.util.AbstractMap", ["java.lang.StringBuilder", "$.UnsupportedOperationException", "java.util.AbstractCollection", "$.AbstractSet", "$.Iterator"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "AbstractMap", null, java.util.Map);

Clazz.newMethod$(C$, '$init$', function () {
this.$keySet = null;
this.valuesCollection = null;
}, 1);

Clazz.newMethod$(C$, 'construct', function () {
}, 1);

Clazz.newMethod$(C$, 'clear', function () {
this.entrySet ().clear ();
});

Clazz.newMethod$(C$, 'containsKey$O', function (key) {
var it = this.entrySet ().iterator ();
if (key != null) {
while (it.hasNext ()) {
if (key.equals$O (it.next ().getKey ())) {
return true;
}}
} else {
while (it.hasNext ()) {
if (it.next ().getKey () == null) {
return true;
}}
}return false;
});

Clazz.newMethod$(C$, 'containsValue$O', function (value) {
var it = this.entrySet ().iterator ();
if (value != null) {
while (it.hasNext ()) {
if (value.equals$O (it.next ().getValue ())) {
return true;
}}
} else {
while (it.hasNext ()) {
if (it.next ().getValue () == null) {
return true;
}}
}return false;
});

Clazz.newMethod$(C$, 'equals$O', function (object) {
if (this === object) {
return true;
}if (Clazz.instanceOf(object, java.util.Map)) {
var map = object;
if (this.size () != map.size ()) {
return false;
}var objectSet = map.entrySet ();
var it = this.entrySet ().iterator ();
while (it.hasNext ()) {
if (!objectSet.contains$O (it.next ())) {
return false;
}}
return true;
}return false;
});

Clazz.newMethod$(C$, 'get$O', function (key) {
var it = this.entrySet ().iterator ();
if (key != null) {
while (it.hasNext ()) {
var entry = it.next ();
if (key.equals$O (entry.getKey ())) {
return entry.getValue ();
}}
} else {
while (it.hasNext ()) {
var entry = it.next ();
if (entry.getKey () == null) {
return entry.getValue ();
}}
}return null;
});

Clazz.newMethod$(C$, 'hashCode', function () {
var result = 0;
var it = this.entrySet ().iterator ();
while (it.hasNext ()) {
result += it.next ().hashCode ();
}
return result;
});

Clazz.newMethod$(C$, 'isEmpty', function () {
return this.size () == 0;
});

Clazz.newMethod$(C$, 'keySet', function () {
if (this.$keySet == null) {
this.$keySet = ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "AbstractMap$1", java.util.AbstractSet);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'contains$O', function (object) {
return this.b$["java.util.AbstractMap"].containsKey$O (object);
});

Clazz.newMethod$(C$, 'size', function () {
return this.b$["java.util.AbstractMap"].size ();
});

Clazz.newMethod$(C$, 'iterator', function () {
return ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "AbstractMap$1$1", null, java.util.Iterator);

Clazz.newMethod$(C$, '$init$', function () {
this.setIterator = this.b$["java.util.AbstractMap"].entrySet ().iterator ();
}, 1);

Clazz.newMethod$(C$, 'hasNext', function () {
return this.setIterator.hasNext ();
});

Clazz.newMethod$(C$, 'next', function () {
return this.setIterator.next ().getKey ();
});

Clazz.newMethod$(C$, 'remove', function () {
this.setIterator.remove ();
});
})()
), Clazz.$new(java.util.AbstractMap$1$1.$init$, [this, null]));
});
})()
), Clazz.$new(java.util.AbstractMap$1.superClazz.construct, [this, null],java.util.AbstractMap$1));
}return this.$keySet;
});

Clazz.newMethod$(C$, 'put$TK$TV', function (key, value) {
throw Clazz.$new(UnsupportedOperationException.construct,[]);
});

Clazz.newMethod$(C$, 'putAll$java_util_Map', function (map) {
for (var entry, $entry = map.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
this.put$TK$TV (entry.getKey (), entry.getValue ());
}
});

Clazz.newMethod$(C$, 'remove$O', function (key) {
var it = this.entrySet ().iterator ();
if (key != null) {
while (it.hasNext ()) {
var entry = it.next ();
if (key.equals$O (entry.getKey ())) {
it.remove ();
return entry.getValue ();
}}
} else {
while (it.hasNext ()) {
var entry = it.next ();
if (entry.getKey () == null) {
it.remove ();
return entry.getValue ();
}}
}return null;
});

Clazz.newMethod$(C$, 'size', function () {
return this.entrySet ().size ();
});

Clazz.newMethod$(C$, 'toString', function () {
if (this.isEmpty ()) {
return "{}";
}var buffer = Clazz.$new(StringBuilder.construct$I,[this.size () * 28]);
buffer.append$C ('{');
var it = this.entrySet ().iterator ();
while (it.hasNext ()) {
var entry = it.next ();
var key = entry.getKey ();
if (key !== this) {
buffer.append$O (key);
} else {
buffer.append$S ("(this Map)");
}buffer.append$C ('=');
var value = entry.getValue ();
if (value !== this) {
buffer.append$O (value);
} else {
buffer.append$S ("(this Map)");
}if (it.hasNext ()) {
buffer.append$S (", ");
}}
buffer.append$C ('}');
return buffer.toString ();
});

Clazz.newMethod$(C$, 'values', function () {
if (this.valuesCollection == null) {
this.valuesCollection = ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "AbstractMap$2", java.util.AbstractCollection);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'size', function () {
return this.b$["java.util.AbstractMap"].size ();
});

Clazz.newMethod$(C$, 'contains$O', function (object) {
return this.b$["java.util.AbstractMap"].containsValue$O (object);
});

Clazz.newMethod$(C$, 'iterator', function () {
return ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.util, "AbstractMap$2$1", null, java.util.Iterator);

Clazz.newMethod$(C$, '$init$', function () {
this.setIterator = this.b$["java.util.AbstractMap"].entrySet ().iterator ();
}, 1);

Clazz.newMethod$(C$, 'hasNext', function () {
return this.setIterator.hasNext ();
});

Clazz.newMethod$(C$, 'next', function () {
return this.setIterator.next ().getValue ();
});

Clazz.newMethod$(C$, 'remove', function () {
this.setIterator.remove ();
});
})()
), Clazz.$new(java.util.AbstractMap$2$1.$init$, [this, null]));
});
})()
), Clazz.$new(java.util.AbstractMap$2.superClazz.construct, [this, null],java.util.AbstractMap$2));
}return this.valuesCollection;
});

Clazz.newMethod$(C$, 'clone', function () {
var result = C$.superClazz.prototype.clone.apply(this, arguments);
result.$keySet = null;
result.valuesCollection = null;
return result;
});
})()
});

//Created 2017-08-18 22:18:02
