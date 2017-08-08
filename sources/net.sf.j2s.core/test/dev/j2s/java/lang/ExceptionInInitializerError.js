Clazz.load (["java.lang.LinkageError"], "java.lang.ExceptionInInitializerError", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang, "ExceptionInInitializerError", LinkageError);

Clazz.newMethod$(C$, '$init$', function () {
this.exception = null;
}, 1);

Clazz.newMethod$ (C$, 'construct', function () {
C$.superClazz.construct.apply(this);
C$.$init$.apply(this);
this.initCause$Throwable (null);
}, 1);

Clazz.newMethod$ (C$, 'construct$S', function (detailMessage) {
C$.superClazz.construct$S.apply(this, [detailMessage]);
C$.$init$.apply(this);
this.initCause$Throwable (null);
}, 1);

Clazz.newMethod$ (C$, 'construct$Throwable', function (exception) {
C$.superClazz.construct.apply(this);
C$.$init$.apply(this);
this.exception = exception;
this.initCause$Throwable (exception);
}, 1);

Clazz.newMethod$ (C$, 'getException', function () {
return this.exception;
});

Clazz.newMethod$ (C$, 'getCause', function () {
return this.exception;
});
})()
});

//Created 2017-08-08 06:13:43
