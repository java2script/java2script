Clazz.load (["java.lang.LinkageError"], "java.lang.IncompatibleClassChangeError", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang, "IncompatibleClassChangeError", LinkageError);

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
})()
});

//Created 2017-08-08 06:13:43
