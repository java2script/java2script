Clazz.declarePackage ("java.net");

(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.net, "URLEncoder");

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'construct', function () {
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'encode$S', function (s) {
return encodeURIComponent(arguments[0]);
}, 1);

Clazz.newMethod$(C$, 'encode$S$S', function (s, enc) {
return encodeURIComponent(arguments[0]);
}, 1);
Clazz.defineStatics$ (C$, ["digits", "0123456789ABCDEF"
]);
})()

//Created 2017-08-18 22:18:01
