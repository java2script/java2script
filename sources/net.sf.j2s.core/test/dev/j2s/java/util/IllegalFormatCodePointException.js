Clazz.load (["java.util.IllegalFormatException"], "java.util.IllegalFormatCodePointException", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "IllegalFormatCodePointException", java.util.IllegalFormatException, java.io.Serializable);

Clazz.newMethod$(C$, '$init$', function () {
this.c = 0;
}, 1);

Clazz.newMethod$ (C$, 'construct$I', function (c) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.c = c;
}, 1);

Clazz.newMethod$ (C$, 'getCodePoint', function () {
return this.c;
});

Clazz.newMethod$ (C$, 'getMessage', function () {
return "Code point is " + this.c;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
});

//Created 2017-08-08 06:13:47
