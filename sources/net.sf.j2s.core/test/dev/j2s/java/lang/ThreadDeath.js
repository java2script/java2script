Clazz.load (["java.lang.Error"], "java.lang.ThreadDeath", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang, "ThreadDeath", Error);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'construct', function () {
Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
});

//Created 2017-08-17 10:33:14
