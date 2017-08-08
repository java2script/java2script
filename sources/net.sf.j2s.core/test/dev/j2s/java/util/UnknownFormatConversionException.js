Clazz.load (["java.util.IllegalFormatException"], "java.util.UnknownFormatConversionException", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "UnknownFormatConversionException", java.util.IllegalFormatException);

Clazz.newMethod$(C$, '$init$', function () {
this.s = null;
}, 1);

Clazz.newMethod$ (C$, 'construct$S', function (s) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.s = s;
}, 1);

Clazz.newMethod$ (C$, 'getConversion', function () {
return this.s;
});

Clazz.newMethod$ (C$, 'getMessage', function () {
return "Conversion = '" + this.s + "'";
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
});

//Created 2017-08-08 06:13:49
