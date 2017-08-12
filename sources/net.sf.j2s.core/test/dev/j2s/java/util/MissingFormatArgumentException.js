Clazz.load (["java.util.IllegalFormatException"], "java.util.MissingFormatArgumentException", ["java.lang.NullPointerException"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "MissingFormatArgumentException", java.util.IllegalFormatException);

Clazz.newMethod$(C$, '$init$', function () {
this.s = null;
}, 1);

Clazz.newMethod$ (C$, 'construct$S', function (s) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
if (null == s) {
throw Clazz.$new(NullPointerException.construct);
}this.s = s;
}, 1);

Clazz.newMethod$ (C$, 'getFormatSpecifier', function () {
return this.s;
});

Clazz.newMethod$ (C$, 'getMessage', function () {
return "Format specifier '" + this.s + "'";
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
});

//Created 2017-08-12 07:32:20
