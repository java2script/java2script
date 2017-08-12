Clazz.load (["java.io.ObjectStreamException"], "java.io.InvalidClassException", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.io, "InvalidClassException", java.io.ObjectStreamException);

Clazz.newMethod$(C$, '$init$', function () {
this.classname = null;
}, 1);

Clazz.newMethod$ (C$, 'construct$S', function (detailMessage) {
C$.superClazz.construct$S.apply(this, [detailMessage]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'construct$S$S', function (className, detailMessage) {
C$.superClazz.construct$S.apply(this, [detailMessage]);
C$.$init$.apply(this);
this.classname = className;
}, 1);

Clazz.newMethod$ (C$, 'getMessage', function () {
var msg = C$.superClazz.prototype.getMessage.apply(this, arguments);
if (this.classname != null) {
msg = this.classname + ';' + ' ' + msg;
}return msg;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
});

//Created 2017-08-12 07:32:14
