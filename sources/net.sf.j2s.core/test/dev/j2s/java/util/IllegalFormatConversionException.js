Clazz.load (["java.util.IllegalFormatException"], "java.util.IllegalFormatConversionException", ["java.lang.NullPointerException"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "IllegalFormatConversionException", java.util.IllegalFormatException, java.io.Serializable);

Clazz.newMethod$(C$, '$init$', function () {
this.c = '\0';
this.arg = null;
}, 1);

Clazz.newMethod$ (C$, 'construct$char$Class', function (c, arg) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.c = c;
if (arg == null) {
throw Clazz.$new(NullPointerException.construct);
}this.arg = arg;
}, 1);

Clazz.newMethod$ (C$, 'getArgumentClass', function () {
return this.arg;
});

Clazz.newMethod$ (C$, 'getConversion', function () {
return this.c;
});

Clazz.newMethod$ (C$, 'getMessage', function () {
return "" + this.c + " is incompatible with " + this.arg.getName ();
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
});

//Created 2017-08-08 06:13:48
