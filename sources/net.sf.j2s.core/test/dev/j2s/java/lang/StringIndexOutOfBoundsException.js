Clazz.load (["java.lang.IndexOutOfBoundsException"], "java.lang.StringIndexOutOfBoundsException", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang, "StringIndexOutOfBoundsException", IndexOutOfBoundsException);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'construct', function () {
C$.superClazz.construct.apply(this);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'construct', function (index) {
C$.superClazz.construct$S.apply(this, ["String index out of range: " + index]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'construct', function (detailMessage) {
C$.superClazz.construct$S.apply(this, [detailMessage]);
C$.$init$.apply(this);
}, 1);
})()
});

//Created 2017-08-08 06:13:44
