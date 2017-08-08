Clazz.load (["java.lang.Enum"], "java.lang.annotation.ElementType", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang.annotation, "ElementType", Enum);

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);
Clazz.$newEnumConst(C$.construct, "TYPE", 0, null);
Clazz.$newEnumConst(C$.construct, "FIELD", 1, null);
Clazz.$newEnumConst(C$.construct, "METHOD", 2, null);
Clazz.$newEnumConst(C$.construct, "PARAMETER", 3, null);
Clazz.$newEnumConst(C$.construct, "CONSTRUCTOR", 4, null);
Clazz.$newEnumConst(C$.construct, "LOCAL_VARIABLE", 5, null);
Clazz.$newEnumConst(C$.construct, "ANNOTATION_TYPE", 6, null);
Clazz.$newEnumConst(C$.construct, "PACKAGE", 7, null);
})()
});

//Created 2017-08-08 06:13:45
