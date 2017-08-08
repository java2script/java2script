Clazz.load (["java.lang.ClassFormatError"], "java.lang.reflect.GenericSignatureFormatError", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang.reflect, "GenericSignatureFormatError", ClassFormatError);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'construct', function () {
C$.superClazz.construct.apply(this);
C$.$init$.apply(this);
}, 1);
})()
});

//Created 2017-08-08 06:13:45
