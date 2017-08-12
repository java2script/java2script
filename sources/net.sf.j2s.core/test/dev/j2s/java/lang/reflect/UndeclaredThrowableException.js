Clazz.load (["java.lang.RuntimeException"], "java.lang.reflect.UndeclaredThrowableException", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang.reflect, "UndeclaredThrowableException", RuntimeException);

Clazz.newMethod$(C$, '$init$', function () {
this.undeclaredThrowable = null;
}, 1);

Clazz.newMethod$ (C$, 'construct$Throwable', function (exception) {
C$.superClazz.construct.apply(this);
C$.$init$.apply(this);
this.undeclaredThrowable = exception;
this.initCause$Throwable (exception);
}, 1);

Clazz.newMethod$ (C$, 'construct$Throwable$S', function (exception, detailMessage) {
C$.superClazz.construct$S.apply(this, [detailMessage]);
C$.$init$.apply(this);
this.undeclaredThrowable = exception;
this.initCause$Throwable (exception);
}, 1);

Clazz.newMethod$ (C$, 'getUndeclaredThrowable', function () {
return this.undeclaredThrowable;
});

Clazz.newMethod$ (C$, 'getCause', function () {
return this.undeclaredThrowable;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
});

//Created 2017-08-12 07:32:18
