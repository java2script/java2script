Clazz.declarePackage ("java.net");
Clazz.load (null, "java.net.URLDecoder", ["java.lang.NullPointerException"], function () {

(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.net, "URLDecoder");

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'decode$S', function (s) {
return decodeURIComponent(arguments[0]);
}, 1);

Clazz.newMethod$ (C$, 'decode$S$S', function (s, enc) {
if (enc == null) {
throw Clazz.$new(NullPointerException.construct);
}{
return decodeURIComponent(arguments[0]);
}return null;
}, 1);

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
});

//Created 2017-08-12 07:32:18
