Clazz.load (["java.lang.reflect.AccessibleObject", "$.GenericDeclaration", "$.Member", "java.lang.Void"], "java.lang.reflect.Method", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang.reflect, "Method", java.lang.reflect.AccessibleObject, [java.lang.reflect.GenericDeclaration, java.lang.reflect.Member]);

Clazz.newMethod$(C$, '$init$', function () {
this.clazz = null;
this.name = null;
this.returnType = null;
this.parameterTypes = null;
this.exceptionTypes = null;
this.modifiers = 0;
}, 1);

Clazz.newMethod$(C$, 'construct$Class$S$ClassA$Class$ClassA$I', function (declaringClass, name, parameterTypes, returnType, checkedExceptions, modifiers) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.clazz = declaringClass;
this.name = name;
this.parameterTypes = parameterTypes;
this.returnType = returnType;
this.exceptionTypes = checkedExceptions;
this.modifiers = modifiers;
}, 1);

Clazz.newMethod$(C$, 'getTypeParameters', function () {
return null;
});

Clazz.newMethod$(C$, 'toGenericString', function () {
return null;
});

Clazz.newMethod$(C$, 'getGenericParameterTypes', function () {
return null;
});

Clazz.newMethod$(C$, 'getGenericExceptionTypes', function () {
return null;
});

Clazz.newMethod$(C$, 'getGenericReturnType', function () {
return null;
});

Clazz.newMethod$(C$, 'getParameterAnnotations', function () {
return null;
});

Clazz.newMethod$(C$, 'isVarArgs', function () {
return false;
});

Clazz.newMethod$(C$, 'isBridge', function () {
return false;
});

Clazz.newMethod$(C$, 'isSynthetic', function () {
return false;
});

Clazz.newMethod$(C$, 'getDefaultValue', function () {
return null;
});

Clazz.newMethod$(C$, 'equals$O', function (object) {
if (object != null && Clazz.instanceOf(object, java.lang.reflect.Method)) {
var other = object;
if ((this.getDeclaringClass () === other.getDeclaringClass ()) && (this.getName () === other.getName ())) {
var params1 = this.parameterTypes;
var params2 = other.parameterTypes;
if (params1.length == params2.length) {
for (var i = 0; i < params1.length; i++) {
if (params1[i] !== params2[i]) return false;
}
return true;
}}}return false;
});

Clazz.newMethod$(C$, 'getDeclaringClass', function () {
return this.clazz;
});

Clazz.newMethod$(C$, 'getExceptionTypes', function () {
return this.exceptionTypes;
});

Clazz.newMethod$(C$, 'getModifiers', function () {
return this.modifiers;
});

Clazz.newMethod$(C$, 'getName', function () {
return this.name;
});

Clazz.newMethod$(C$, 'getParameterTypes', function () {
return this.parameterTypes;
});

Clazz.newMethod$(C$, 'getReturnType', function () {
return this.returnType;
});

Clazz.newMethod$(C$, 'hashCode', function () {
return this.getDeclaringClass ().getName ().hashCode () ^ this.getName ().hashCode ();
});

Clazz.newMethod$(C$, 'invoke$O$OA', function (receiver, args) {
var m = this.clazz.prototype[this.getName ()];
if (m == null) {
m = this.clazz[this.getName ()];
}
if (m != null) {
return m.apply(receiver,args);
} else {
// should never reach here!
}
});

Clazz.newMethod$(C$, 'toString', function () {
return null;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
});

//Created 2017-08-17 10:33:15
