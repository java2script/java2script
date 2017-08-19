Clazz.load (null, "java.lang.reflect.Modifier", ["java.lang.reflect.Method"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang.reflect, "Modifier");

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'construct', function () {
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'isAbstract$I', function (modifiers) {
return ((modifiers & 1024) != 0);
}, 1);

Clazz.newMethod$(C$, 'isFinal$I', function (modifiers) {
return ((modifiers & 16) != 0);
}, 1);

Clazz.newMethod$(C$, 'isInterface$I', function (modifiers) {
return ((modifiers & 512) != 0);
}, 1);

Clazz.newMethod$(C$, 'isNative$I', function (modifiers) {
return ((modifiers & 256) != 0);
}, 1);

Clazz.newMethod$(C$, 'isPrivate$I', function (modifiers) {
return ((modifiers & 2) != 0);
}, 1);

Clazz.newMethod$(C$, 'isProtected$I', function (modifiers) {
return ((modifiers & 4) != 0);
}, 1);

Clazz.newMethod$(C$, 'isPublic$I', function (modifiers) {
return ((modifiers & 1) != 0);
}, 1);

Clazz.newMethod$(C$, 'isStatic$I', function (modifiers) {
return ((modifiers & 8) != 0);
}, 1);

Clazz.newMethod$(C$, 'isStrict$I', function (modifiers) {
return ((modifiers & 2048) != 0);
}, 1);

Clazz.newMethod$(C$, 'isSynchronized$I', function (modifiers) {
return ((modifiers & 32) != 0);
}, 1);

Clazz.newMethod$(C$, 'isTransient$I', function (modifiers) {
return ((modifiers & 128) != 0);
}, 1);

Clazz.newMethod$(C$, 'isVolatile$I', function (modifiers) {
return ((modifiers & 64) != 0);
}, 1);

Clazz.newMethod$(C$, 'toString$I', function (modifiers) {
var sb =  Clazz.newArray$(java.lang.String, [0]);
if (java.lang.reflect.Modifier.isPublic$I (modifiers)) sb[sb.length] = "public";
if (java.lang.reflect.Modifier.isProtected$I (modifiers)) sb[sb.length] = "protected";
if (java.lang.reflect.Modifier.isPrivate$I (modifiers)) sb[sb.length] = "private";
if (java.lang.reflect.Modifier.isAbstract$I (modifiers)) sb[sb.length] = "abstract";
if (java.lang.reflect.Modifier.isStatic$I (modifiers)) sb[sb.length] = "static";
if (java.lang.reflect.Modifier.isFinal$I (modifiers)) sb[sb.length] = "final";
if (java.lang.reflect.Modifier.isTransient$I (modifiers)) sb[sb.length] = "transient";
if (java.lang.reflect.Modifier.isVolatile$I (modifiers)) sb[sb.length] = "volatile";
if (java.lang.reflect.Modifier.isSynchronized$I (modifiers)) sb[sb.length] = "synchronized";
if (java.lang.reflect.Modifier.isNative$I (modifiers)) sb[sb.length] = "native";
if (java.lang.reflect.Modifier.isStrict$I (modifiers)) sb[sb.length] = "strictfp";
if (java.lang.reflect.Modifier.isInterface$I (modifiers)) sb[sb.length] = "interface";
if (sb.length > 0) {
return sb.join (" ");
}return "";
}, 1);
Clazz.defineStatics$ (C$, ["PUBLIC", 0x1,
"PRIVATE", 0x2,
"PROTECTED", 0x4,
"STATIC", 0x8,
"FINAL", 0x10,
"SYNCHRONIZED", 0x20,
"VOLATILE", 0x40,
"TRANSIENT", 0x80,
"NATIVE", 0x100,
"INTERFACE", 0x200,
"ABSTRACT", 0x400,
"STRICT", 0x800,
"BRIDGE", 0x40,
"VARARGS", 0x80,
"SYNTHETIC", 0x1000,
"ANNOTATION", 0x2000,
"ENUM", 0x4000
]);
})()
});

//Created 2017-08-18 22:18:01
