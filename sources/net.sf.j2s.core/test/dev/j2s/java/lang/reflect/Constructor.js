Clazz.load (["java.lang.reflect.AccessibleObject", "$.GenericDeclaration", "$.Member", "java.lang.Void"], "java.lang.reflect.Constructor", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang.reflect, "Constructor", java.lang.reflect.AccessibleObject, [java.lang.reflect.GenericDeclaration, java.lang.reflect.Member]);

Clazz.newMethod$(C$, '$init$', function () {
this.clazz = null;
this.parameterTypes = null;
this.exceptionTypes = null;
this.modifiers = 0;
}, 1);

Clazz.newMethod$ (C$, 'construct$Class$ClassA$ClassA$I', function (declaringClass, parameterTypes, checkedExceptions, modifiers) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.clazz = declaringClass;
this.parameterTypes = parameterTypes;
this.exceptionTypes = checkedExceptions;
this.modifiers = modifiers;
}, 1);

Clazz.newMethod$ (C$, 'getTypeParameters', function () {
return null;
});

Clazz.newMethod$ (C$, 'toGenericString', function () {
return null;
});

Clazz.newMethod$ (C$, 'getGenericParameterTypes', function () {
return null;
});

Clazz.newMethod$ (C$, 'getGenericExceptionTypes', function () {
return null;
});

Clazz.newMethod$ (C$, 'getParameterAnnotations', function () {
return null;
});

Clazz.newMethod$ (C$, 'isVarArgs', function () {
return false;
});

Clazz.newMethod$ (C$, 'isSynthetic', function () {
return false;
});

Clazz.newMethod$ (C$, 'equals$O', function (object) {
if (object != null && Clazz.instanceOf(object, java.lang.reflect.Constructor)) {
var other = object;
if (this.getDeclaringClass () === other.getDeclaringClass ()) {
var params1 = this.parameterTypes;
var params2 = other.parameterTypes;
if (params1.length == params2.length) {
for (var i = 0; i < params1.length; i++) {
if (params1[i] !== params2[i]) return false;
}
return true;
}}}return false;
});

Clazz.newMethod$ (C$, 'getDeclaringClass', function () {
return this.clazz;
});

Clazz.newMethod$ (C$, 'getExceptionTypes', function () {
return this.exceptionTypes;
});

Clazz.newMethod$ (C$, 'getModifiers', function () {
return this.modifiers;
});

Clazz.newMethod$ (C$, 'getName', function () {
return this.getDeclaringClass ().getName ();
});

Clazz.newMethod$ (C$, 'getParameterTypes', function () {
return this.parameterTypes;
});

Clazz.newMethod$ (C$, 'hashCode', function () {
return this.getDeclaringClass ().getName ().hashCode ();
});

Clazz.newMethod$ (C$, 'newInstance$OA', function (args) {
var instance = new this.clazz (Clazz.inheritArgs);
Clazz.instantialize (instance, args);
return instance;
});

Clazz.newMethod$ (C$, 'toString', function () {
return null;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
});

//Created 2017-08-12 07:32:17
