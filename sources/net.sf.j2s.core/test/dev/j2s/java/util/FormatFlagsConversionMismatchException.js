Clazz.load (["java.util.IllegalFormatException"], "java.util.FormatFlagsConversionMismatchException", ["java.lang.NullPointerException"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "FormatFlagsConversionMismatchException", java.util.IllegalFormatException, java.io.Serializable);

Clazz.newMethod$(C$, '$init$', function () {
this.f = null;
this.c = '\0';
}, 1);

Clazz.newMethod$(C$, 'construct$S$C', function (f, c) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
if (null == f) {
throw Clazz.$new(NullPointerException.construct,[]);
}this.f = f;
this.c = c;
}, 1);

Clazz.newMethod$(C$, 'getFlags', function () {
return this.f;
});

Clazz.newMethod$(C$, 'getConversion', function () {
return this.c;
});

Clazz.newMethod$(C$, 'getMessage', function () {
return "Mismatched Convertor =" + this.c + ", Flags= " + this.f;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
});

//Created 2017-08-18 22:18:02
