Clazz.load (["java.util.IllegalFormatException"], "java.util.IllegalFormatPrecisionException", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "IllegalFormatPrecisionException", java.util.IllegalFormatException);

Clazz.newMethod$(C$, '$init$', function () {
this.p = 0;
}, 1);

Clazz.newMethod$ (C$, 'construct$I', function (p) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.p = p;
}, 1);

Clazz.newMethod$ (C$, 'getPrecision', function () {
return this.p;
});

Clazz.newMethod$ (C$, 'getMessage', function () {
return String.valueOf$I (this.p);
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
});

//Created 2017-08-12 07:32:19
