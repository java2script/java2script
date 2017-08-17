Clazz.load (["java.lang.Error"], "java.lang.AssertionError", ["java.lang.Throwable"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang, "AssertionError", Error);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'construct', function () {
C$.superClazz.construct.apply(this, []);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'construct$O', function (detailMessage) {
C$.superClazz.construct$S$Throwable.apply(this, [String.valueOf$O (detailMessage), (Clazz.instanceOf(detailMessage, Throwable) ? detailMessage : null)]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'construct$Z', function (detailMessage) {
C$.construct$O.apply(this, [String.valueOf$Z (detailMessage)]);
}, 1);

Clazz.newMethod$(C$, 'construct$C', function (detailMessage) {
C$.construct$O.apply(this, [String.valueOf$C (detailMessage)]);
}, 1);

Clazz.newMethod$(C$, 'construct$I', function (detailMessage) {
C$.construct$O.apply(this, [Integer.toString (detailMessage)]);
}, 1);

Clazz.newMethod$(C$, 'construct$J', function (detailMessage) {
C$.construct$O.apply(this, [Long.toString (detailMessage)]);
}, 1);

Clazz.newMethod$(C$, 'construct$F', function (detailMessage) {
C$.construct$O.apply(this, [Float.toString (detailMessage)]);
}, 1);

Clazz.newMethod$(C$, 'construct$D', function (detailMessage) {
C$.construct$O.apply(this, [Double.toString (detailMessage)]);
}, 1);
})()
});

//Created 2017-08-17 10:33:13
