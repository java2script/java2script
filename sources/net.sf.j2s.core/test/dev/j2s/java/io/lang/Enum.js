Clazz.load (null, "java.lang.Enum", ["java.lang.ClassCastException", "$.CloneNotSupportedException", "$.IllegalArgumentException", "$.NullPointerException"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang, "Enum", null, [Comparable, java.io.Serializable]);

Clazz.newMethod$(C$, '$init$', function () {
this.$name = null;
this.$ordinal = 0;
}, 1);

Clazz.newMethod$(C$, 'name', function () {
return this.$name;
});

Clazz.newMethod$(C$, 'ordinal', function () {
return this.$ordinal;
});

Clazz.newMethod$(C$, 'construct$S$I', function (name, ordinal) {
C$.$init$.apply(this);
this.$name = name;
this.$ordinal = ordinal;
}, 1);

Clazz.newMethod$(C$, 'toString', function () {
return this.$name;
});

Clazz.newMethod$(C$, 'equals$O', function (other) {
return this === other;
});

Clazz.newMethod$(C$, 'hashCode', function () {
return C$.superClazz.prototype.hashCode.apply(this, arguments);
});

Clazz.newMethod$(C$, 'clone', function () {
throw Clazz.$new(CloneNotSupportedException.construct,[]);
});

Clazz.newMethod$(C$, 'compareTo$TE', function (o) {
var other = o;
var self = this;
if (self.getClass () !== other.getClass () && self.getDeclaringClass () !== other.getDeclaringClass ()) throw Clazz.$new(ClassCastException.construct,[]);
return self.$ordinal - other.$ordinal;
});

Clazz.newMethod$(C$, 'getDeclaringClass', function () {
var clazz = this.getClass ();
var zuper = clazz.getSuperclass ();
return ((zuper === Enum) ? clazz : zuper);
});

Clazz.newMethod$(C$, '$valueOf$Class$S', function (enumType, name) {
var result = enumType.enumConstantDirectory ().get$O (name);
if (result != null) return result;
if (name == null) throw Clazz.$new(NullPointerException.construct$S,["Name is null"]);
throw Clazz.$new(IllegalArgumentException.construct$S,["No enum const " + enumType + "." + name]);
}, 1);

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
});

//Created 2017-08-18 22:17:59
