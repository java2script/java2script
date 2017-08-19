Clazz.load (["java.lang.RuntimeException"], "java.lang.annotation.IncompleteAnnotationException", ["org.apache.harmony.luni.util.Msg"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang.annotation, "IncompleteAnnotationException", RuntimeException);

Clazz.newMethod$(C$, '$init$', function () {
this.$annotationType = null;
this.$elementName = null;
}, 1);

Clazz.newMethod$(C$, 'construct$Class$S', function (annotationType, elementName) {
C$.superClazz.construct$S.apply(this, [org.apache.harmony.luni.util.Msg.getString$S$O$O ("annotation.0", elementName, annotationType)]);
C$.$init$.apply(this);
this.$annotationType = annotationType;
this.$elementName = elementName;
}, 1);

Clazz.newMethod$(C$, 'annotationType', function () {
return this.$annotationType;
});

Clazz.newMethod$(C$, 'elementName', function () {
return this.$elementName;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
});

//Created 2017-08-18 22:18:00
