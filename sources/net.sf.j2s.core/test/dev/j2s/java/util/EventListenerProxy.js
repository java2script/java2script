Clazz.load (["java.util.EventListener"], "java.util.EventListenerProxy", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "EventListenerProxy", null, java.util.EventListener);

Clazz.newMethod$(C$, '$init$', function () {
this.listener = null;
}, 1);

Clazz.newMethod$(C$, 'construct', function (listener) {
this.listener = listener;
}, 1);

Clazz.newMethod$(C$, 'getListener', function () {
return this.listener;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
});

//Created 2017-08-17 10:33:16
