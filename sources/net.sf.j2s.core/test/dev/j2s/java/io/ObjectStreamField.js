Clazz.load (null, "java.io.ObjectStreamField", ["java.lang.Boolean", "$.Byte", "$.Character", "$.Double", "$.Float", "$.Long", "$.NullPointerException", "$.Short", "java.util.Arrays"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.io, "ObjectStreamField", null, Comparable);

Clazz.newMethod$(C$, '$init$', function () {
this.name = null;
this.type = null;
this.offset = 0;
this.typeString = null;
this.unshared = false;
this.isDeserialized = false;
}, 1);

Clazz.newMethod$ (C$, 'construct$S$Class', function (name, cl) {
C$.$init$.apply(this);
if (name == null || cl == null) {
throw Clazz.$new(NullPointerException.construct);
}this.name = name;
this.type = cl;
}, 1);

Clazz.newMethod$ (C$, 'construct$S$Class$Z', function (name, cl, unshared) {
C$.$init$.apply(this);
if (name == null || cl == null) {
throw Clazz.$new(NullPointerException.construct);
}this.name = name;
this.type = cl;
this.unshared = unshared;
}, 1);

Clazz.newMethod$ (C$, 'construct$S$S', function (signature, name) {
C$.$init$.apply(this);
if (name == null) {
throw Clazz.$new(NullPointerException.construct);
}this.name = name;
this.typeString = signature.$replace ('.', '/');
this.isDeserialized = true;
}, 1);

Clazz.newMethod$ (C$, 'compareTo$O', function (o) {
var f = o;
var thisPrimitive = this.isPrimitive ();
var fPrimitive = f.isPrimitive ();
if (thisPrimitive != fPrimitive) {
return thisPrimitive ? -1 : 1;
}return this.getName ().compareTo$S (f.getName ());
});

Clazz.newMethod$ (C$, 'equals$O', function (arg0) {
return this.compareTo$O (arg0) == 0;
});

Clazz.newMethod$ (C$, 'hashCode', function () {
return this.getName ().hashCode ();
});

Clazz.newMethod$ (C$, 'getName', function () {
return this.name;
});

Clazz.newMethod$ (C$, 'getOffset', function () {
return this.offset;
});

Clazz.newMethod$ (C$, 'getTypeInternal', function () {
return this.type;
});

Clazz.newMethod$ (C$, 'getType', function () {
var cl = C$.prototype.getTypeInternal.apply(this, []);
if (this.isDeserialized && !cl.isPrimitive ()) {
return Clazz._O;
}return cl;
});

Clazz.newMethod$ (C$, 'getTypeCode', function () {
var t = C$.prototype.getTypeInternal.apply(this, []);
if (t === Integer.TYPE) {
return 'I';
}if (t === Byte.TYPE) {
return 'B';
}if (t === Character.TYPE) {
return 'C';
}if (t === Short.TYPE) {
return 'S';
}if (t === Boolean.TYPE) {
return 'Z';
}if (t === Long.TYPE) {
return 'J';
}if (t === Float.TYPE) {
return 'F';
}if (t === Double.TYPE) {
return 'D';
}if (t.isArray ()) {
return '[';
}return 'L';
});

Clazz.newMethod$ (C$, 'getTypeString', function () {
if (this.isPrimitive ()) {
return null;
}if (this.typeString == null) {
var t = C$.prototype.getTypeInternal.apply(this, []);
var typeName = t.getName ().$replace ('.', '/');
var str = (t.isArray ()) ? typeName : ("L" + typeName + ';');
this.typeString = str.intern ();
}return this.typeString;
});

Clazz.newMethod$ (C$, 'isPrimitive', function () {
var t = C$.prototype.getTypeInternal.apply(this, []);
return t != null && t.isPrimitive ();
});

Clazz.newMethod$ (C$, 'setOffset$I', function (newValue) {
this.offset = newValue;
});

Clazz.newMethod$ (C$, 'toString', function () {
return this.getClass ().getName () + '(' + this.getName () + ':' + C$.prototype.getTypeInternal.apply(this, []) + ')';
});

Clazz.newMethod$ (C$, 'sortFields$java_io_ObjectStreamFieldA', function (fields) {
if (fields.length > 1) {
var fieldDescComparator = ((
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], true);
}, java.io, "ObjectStreamField$1", null, java.util.Comparator);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'compare$java_io_ObjectStreamField$java_io_ObjectStreamField', function (f1, f2) {
return f1.compareTo$O (f2);
});
})()
), Clazz.$new(java.io.ObjectStreamField$1.$init$, [this, null]));
java.util.Arrays.sort$OA$java_util_Comparator (fields, fieldDescComparator);
}}, 1);

Clazz.newMethod$ (C$, 'resolve$ClassLoader', function (loader) {
if (this.typeString.length == 1) {
switch (this.typeString.charAt$I (0)) {
case 'I':
this.type = Integer.TYPE;
return;
case 'B':
this.type = Byte.TYPE;
return;
case 'C':
this.type = Character.TYPE;
return;
case 'S':
this.type = Short.TYPE;
return;
case 'Z':
this.type = Boolean.TYPE;
return;
case 'J':
this.type = Long.TYPE;
return;
case 'F':
this.type = Float.TYPE;
return;
case 'D':
this.type = Double.TYPE;
return;
}
}var className = this.typeString.$replace ('/', '.');
if (className.charAt$I (0) == 'L') {
className = className.substring$I$I (1, className.length - 1);
}try {
var cl = Class.forName$S$Z$ClassLoader (className, false, loader);
this.type = cl;
} catch (e) {
if (Clazz.exceptionOf (e, ClassNotFoundException)) {
} else {
throw e;
}
}
});

Clazz.newMethod$ (C$, 'isUnshared', function () {
return this.unshared;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
});

//Created 2017-08-12 07:32:14
