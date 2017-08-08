Clazz.load (["java.lang.RuntimeException"], "java.util.MissingResourceException", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "MissingResourceException", RuntimeException);

Clazz.newMethod$(C$, '$init$', function () {
this.className = null;
this.key = null;
}, 1);

Clazz.newMethod$ (C$, 'construct$S$S$S', function (detailMessage, className, resourceName) {
C$.superClazz.construct$S.apply(this, [detailMessage]);
C$.$init$.apply(this);
this.className = className;
this.key = resourceName;
}, 1);

Clazz.newMethod$ (C$, 'getClassName', function () {
return this.className;
});

Clazz.newMethod$ (C$, 'getKey', function () {
return this.key;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
});

//Created 2017-08-08 06:13:48
