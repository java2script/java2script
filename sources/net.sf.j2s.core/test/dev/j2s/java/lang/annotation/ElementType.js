Clazz.load (["java.lang.Enum"], "java.lang.annotation.ElementType", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang.annotation, "ElementType", Enum);

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);
var vals = [];
vals.push(Clazz.$newEnumConst(C$.construct, "TYPE", 0, [], null));
vals.push(Clazz.$newEnumConst(C$.construct, "FIELD", 1, [], null));
vals.push(Clazz.$newEnumConst(C$.construct, "METHOD", 2, [], null));
vals.push(Clazz.$newEnumConst(C$.construct, "PARAMETER", 3, [], null));
vals.push(Clazz.$newEnumConst(C$.construct, "CONSTRUCTOR", 4, [], null));
vals.push(Clazz.$newEnumConst(C$.construct, "LOCAL_VARIABLE", 5, [], null));
vals.push(Clazz.$newEnumConst(C$.construct, "ANNOTATION_TYPE", 6, [], null));
vals.push(Clazz.$newEnumConst(C$.construct, "PACKAGE", 7, [], null));
Clazz.newMethod$(C$, 'values', function() { return vals }, 1);
Clazz.newMethod$(Enum, 'valueOf$Class$S', function(cl, name) { return cl[name] }, 1);
})()
});

//Created 2017-08-17 10:33:15
