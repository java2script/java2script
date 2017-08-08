Clazz.declarePackage ("java.text");

(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.text, "Annotation");

Clazz.newMethod$(C$, '$init$', function () {
this.value = null;
}, 1);

Clazz.newMethod$ (C$, 'construct$O', function (attribute) {
C$.$init$.apply(this);
this.value = attribute;
}, 1);

Clazz.newMethod$ (C$, 'getValue', function () {
return this.value;
});

Clazz.newMethod$ (C$, 'toString', function () {
return this.getClass ().getName () + "[value=" + this.value + ']';
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()

//Created 2017-08-08 06:13:45
