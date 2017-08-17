Clazz.load (["java.lang.Exception"], "java.lang.reflect.InvocationTargetException", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang.reflect, "InvocationTargetException", Exception);

Clazz.newMethod$(C$, '$init$', function () {
this.target = null;
}, 1);

Clazz.newMethod$(C$, 'construct', function () {
C$.superClazz.construct$Throwable.apply(this, [null]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'construct$Throwable', function (exception) {
C$.superClazz.construct$S$Throwable.apply(this, [null, exception]);
C$.$init$.apply(this);
this.target = exception;
}, 1);

Clazz.newMethod$(C$, 'construct$Throwable$S', function (exception, detailMessage) {
C$.superClazz.construct$S$Throwable.apply(this, [detailMessage, exception]);
C$.$init$.apply(this);
this.target = exception;
}, 1);

Clazz.newMethod$(C$, 'getTargetException', function () {
return this.target;
});

Clazz.newMethod$(C$, 'getCause', function () {
return this.target;
});
})()
});

//Created 2017-08-17 10:33:15
