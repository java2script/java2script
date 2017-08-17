Clazz.load (["java.util.IllegalFormatException"], "java.util.IllegalFormatWidthException", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "IllegalFormatWidthException", java.util.IllegalFormatException);

Clazz.newMethod$(C$, '$init$', function () {
this.w = 0;
}, 1);

Clazz.newMethod$(C$, 'construct$I', function (w) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.w = w;
}, 1);

Clazz.newMethod$(C$, 'getWidth', function () {
return this.w;
});

Clazz.newMethod$(C$, 'getMessage', function () {
return String.valueOf$I (this.w);
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
});

//Created 2017-08-17 10:33:17
