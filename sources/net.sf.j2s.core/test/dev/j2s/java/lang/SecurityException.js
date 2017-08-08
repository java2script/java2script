Clazz.load (["java.lang.RuntimeException"], "java.lang.SecurityException", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang, "SecurityException", RuntimeException);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'construct', function () {
C$.superClazz.construct.apply(this);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'construct$S', function (detailMessage) {
C$.superClazz.construct$S.apply(this, [detailMessage]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'construct$S$Throwable', function (message, cause) {
C$.superClazz.construct$S$Throwable.apply(this, [message, cause]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'construct$Throwable', function (cause) {
C$.superClazz.construct$S$Throwable.apply(this, [(cause == null ? null : cause.toString ()), cause]);
C$.$init$.apply(this);
}, 1);
})()
});

//Created 2017-08-08 06:13:43
