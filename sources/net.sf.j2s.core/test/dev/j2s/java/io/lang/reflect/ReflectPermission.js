Clazz.load (["java.security.BasicPermission"], "java.lang.reflect.ReflectPermission", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang.reflect, "ReflectPermission", java.security.BasicPermission);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'construct$S', function (permissionName) {
C$.superClazz.construct$S.apply(this, [permissionName]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'construct$S$S', function (name, actions) {
C$.superClazz.construct$S$S.apply(this, [name, actions]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
});

//Created 2017-08-18 22:18:01
