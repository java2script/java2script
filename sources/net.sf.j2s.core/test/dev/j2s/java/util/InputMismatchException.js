Clazz.load (["java.util.NoSuchElementException"], "java.util.InputMismatchException", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "InputMismatchException", java.util.NoSuchElementException, java.io.Serializable);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'construct', function () {
C$.superClazz.construct.apply(this, []);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'construct$S', function (msg) {
C$.superClazz.construct$S.apply(this, [msg]);
C$.$init$.apply(this);
}, 1);
})()
});

//Created 2017-08-17 10:33:17
