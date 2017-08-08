Clazz.load (["java.lang.Exception"], "java.lang.ClassNotFoundException", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang, "ClassNotFoundException", Exception);

Clazz.newMethod$(C$, '$init$', function () {
this.ex = null;
}, 1);

Clazz.newMethod$ (C$, 'construct', function () {
C$.superClazz.construct$Throwable.apply(this, [null]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'construct$S', function (detailMessage) {
C$.superClazz.construct$S$Throwable.apply(this, [detailMessage, null]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'construct$S$Throwable', function (detailMessage, exception) {
C$.superClazz.construct$S.apply(this, [detailMessage]);
C$.$init$.apply(this);
this.ex = exception;
}, 1);

Clazz.newMethod$ (C$, 'getException', function () {
return this.ex;
});

Clazz.newMethod$ (C$, 'getCause', function () {
return this.ex;
});
})()
});

//Created 2017-08-08 06:13:42
