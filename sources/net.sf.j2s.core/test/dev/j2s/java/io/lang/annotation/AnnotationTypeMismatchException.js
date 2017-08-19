Clazz.load (["java.lang.RuntimeException"], "java.lang.annotation.AnnotationTypeMismatchException", ["org.apache.harmony.luni.util.Msg"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang.annotation, "AnnotationTypeMismatchException", RuntimeException);

Clazz.newMethod$(C$, '$init$', function () {
this.$element = null;
this.$foundType = null;
}, 1);

Clazz.newMethod$(C$, 'construct$reflect_Method$S', function (element, foundType) {
C$.superClazz.construct$S.apply(this, [org.apache.harmony.luni.util.Msg.getString$S$O$O ("annotation.1", element, foundType)]);
C$.$init$.apply(this);
this.$element = element;
this.$foundType = foundType;
}, 1);

Clazz.newMethod$(C$, 'element', function () {
return this.$element;
});

Clazz.newMethod$(C$, 'foundType', function () {
return this.$foundType;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
});

//Created 2017-08-18 22:18:00
