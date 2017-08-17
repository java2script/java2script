Clazz.load (["java.lang.RuntimeException"], "java.util.EmptyStackException", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "EmptyStackException", RuntimeException);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'construct', function () {
C$.superClazz.construct.apply(this, []);
C$.$init$.apply(this);
}, 1);
})()
});

//Created 2017-08-17 10:33:16
