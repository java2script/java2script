Clazz.load (["java.lang.Error"], "java.lang.annotation.AnnotationFormatError", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang.annotation, "AnnotationFormatError", Error);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'construct$S', function (message) {
C$.superClazz.construct$S.apply(this, [message]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'construct$S$Throwable', function (message, cause) {
C$.superClazz.construct$S$Throwable.apply(this, [message, cause]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'construct$Throwable', function (cause) {
C$.superClazz.construct$S$Throwable.apply(this, [cause == null ? null : cause.toString (), cause]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
});

//Created 2017-08-18 22:18:00
