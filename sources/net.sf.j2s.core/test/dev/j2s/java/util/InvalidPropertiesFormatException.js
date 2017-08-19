Clazz.load (["java.io.IOException"], "java.util.InvalidPropertiesFormatException", ["java.io.NotSerializableException"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "InvalidPropertiesFormatException", java.io.IOException);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'construct$S', function (m) {
C$.superClazz.construct$S.apply(this, [m]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'construct$Throwable', function (c) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.initCause$Throwable (c);
}, 1);

Clazz.newMethod$(C$, 'writeObject$java_io_ObjectOutputStream', function (out) {
throw Clazz.$new(java.io.NotSerializableException.construct,[]);
});

Clazz.newMethod$(C$, 'readObject$java_io_ObjectInputStream', function ($in) {
throw Clazz.$new(java.io.NotSerializableException.construct,[]);
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
});

//Created 2017-08-18 22:18:03
