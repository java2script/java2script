Clazz.load (["java.io.ObjectStreamException"], "java.io.WriteAbortedException", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.io, "WriteAbortedException", java.io.ObjectStreamException);

Clazz.newMethod$(C$, '$init$', function () {
this.detail = null;
}, 1);

Clazz.newMethod$ (C$, 'construct$S$Exception', function (detailMessage, rootCause) {
C$.superClazz.construct$S.apply(this, [detailMessage]);
C$.$init$.apply(this);
this.detail = rootCause;
this.initCause$Throwable (rootCause);
}, 1);

Clazz.newMethod$ (C$, 'getMessage', function () {
var msg = C$.superClazz.prototype.getMessage.apply(this, arguments);
if (this.detail != null) {
msg = msg + "; " + this.detail.toString ();
}return msg;
});

Clazz.newMethod$ (C$, 'getCause', function () {
return this.detail;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
});

//Created 2017-08-12 07:32:15
