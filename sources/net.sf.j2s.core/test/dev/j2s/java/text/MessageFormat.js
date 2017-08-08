Clazz.declarePackage ("java.text");

(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.text, "MessageFormat");

Clazz.newMethod$(C$, '$init$', function () {
this.pattern = null;
}, 1);

Clazz.newMethod$ (C$, 'construct$S', function (pattern) {
C$.$init$.apply(this);
this.pattern = pattern;
}, 1);

Clazz.newMethod$ (C$, 'construct$S$java_util_Locale', function (pattern, locale) {
C$.$init$.apply(this);
this.pattern = pattern;
}, 1);

Clazz.newMethod$ (C$, 'format$S$OA', function (pattern, args) {
return pattern.replace (/\{(\d+)\}/g, function ($0, $1) {
var i = parseInt ($1);
if (args == null) return null;
return args[i];
});
}, 1);

Clazz.newMethod$ (C$, 'format$O', function (obj) {
return java.text.MessageFormat.format$S$OA (this.pattern,  Clazz.newArray (-1, [obj]));
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()

//Created 2017-08-08 06:13:45
