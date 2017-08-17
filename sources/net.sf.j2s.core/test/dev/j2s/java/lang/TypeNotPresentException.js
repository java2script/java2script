Clazz.load (["java.lang.RuntimeException"], "java.lang.TypeNotPresentException", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang, "TypeNotPresentException", RuntimeException);

Clazz.newMethod$(C$, '$init$', function () {
this.$typeName = null;
}, 1);

Clazz.newMethod$(C$, 'construct$S$Throwable', function (typeName, cause) {
C$.superClazz.construct$S$Throwable.apply(this, ["Type " + typeName + " not present", cause]);
C$.$init$.apply(this);
this.$typeName = typeName;
}, 1);

Clazz.newMethod$(C$, 'typeName', function () {
return this.$typeName;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
});

//Created 2017-08-17 10:33:14
