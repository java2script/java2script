Clazz.load (["java.lang.Throwable"], "java.lang.Error", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang, "Error", Throwable);

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

Clazz.newMethod$ (C$, 'construct$S$Throwable', function (detailMessage, throwable) {
C$.superClazz.construct$S$Throwable.apply(this, [detailMessage, throwable]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'construct$Throwable', function (throwable) {
C$.superClazz.construct$Throwable.apply(this, [throwable]);
C$.$init$.apply(this);
}, 1);
})()
});

//Created 2017-08-12 07:32:15
