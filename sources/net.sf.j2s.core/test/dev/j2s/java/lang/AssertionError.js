Clazz.load (["java.lang.Error"], "java.lang.AssertionError", ["java.lang.Double", "$.Float", "$.Long", "$.Throwable"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang, "AssertionError", Error);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'construct', function () {
C$.superClazz.construct.apply(this);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'construct$O', function (detailMessage) {
C$.superClazz.construct$S$Throwable.apply(this, [String.valueOf (detailMessage), (Clazz.instanceOf (detailMessage, Throwable) ? detailMessage : null)]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'construct$b', function (detailMessage) {
C$.construct$O.apply(this, [String.valueOf (detailMessage)]);
}, 1);

Clazz.newMethod$ (C$, 'construct$char', function (detailMessage) {
C$.construct$O.apply(this, [String.valueOf (detailMessage)]);
}, 1);

Clazz.newMethod$ (C$, 'construct$I', function (detailMessage) {
C$.construct$O.apply(this, [Integer.toString (detailMessage)]);
}, 1);

Clazz.newMethod$ (C$, 'construct$L', function (detailMessage) {
C$.construct$O.apply(this, [Long.toString (detailMessage)]);
}, 1);

Clazz.newMethod$ (C$, 'construct$F', function (detailMessage) {
C$.construct$O.apply(this, [Float.toString (detailMessage)]);
}, 1);

Clazz.newMethod$ (C$, 'construct$D', function (detailMessage) {
C$.construct$O.apply(this, [Double.toString (detailMessage)]);
}, 1);
})()
});

//Created 2017-08-08 06:13:42
