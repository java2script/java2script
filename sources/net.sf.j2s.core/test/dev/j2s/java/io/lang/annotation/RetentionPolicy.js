Clazz.load (["java.lang.Enum"], "java.lang.annotation.RetentionPolicy", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang.annotation, "RetentionPolicy", Enum);

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);
var vals = [];
vals.push(Clazz.$newEnumConst(C$.construct, "SOURCE", 0, [], null));
vals.push(Clazz.$newEnumConst(C$.construct, "CLASS", 1, [], null));
vals.push(Clazz.$newEnumConst(C$.construct, "RUNTIME", 2, [], null));
Clazz.newMethod$(C$, 'values', function() { return vals }, 1);
Clazz.newMethod$(Enum, 'valueOf$Class$S', function(cl, name) { return cl[name] }, 1);
})()
});

//Created 2017-08-18 22:18:01
