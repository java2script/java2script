Clazz.load (["java.io.IOException"], "java.io.InterruptedIOException", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.io, "InterruptedIOException", java.io.IOException);

Clazz.newMethod$(C$, '$init$', function () {
this.bytesTransferred = 0;
}, 1);

Clazz.newMethod$(C$, 'construct', function () {
C$.superClazz.construct.apply(this, []);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'construct$S', function (detailMessage) {
C$.superClazz.construct$S.apply(this, [detailMessage]);
C$.$init$.apply(this);
}, 1);
})()
});

//Created 2017-08-17 10:33:12
