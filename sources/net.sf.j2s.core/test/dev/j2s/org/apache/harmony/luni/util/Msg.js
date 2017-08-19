Clazz.declarePackage ("org.apache.harmony.luni.util");
Clazz.load (["java.util.Locale", "org.apache.harmony.luni.util.MsgHelp"], "org.apache.harmony.luni.util.Msg", null, function () {

(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, org.apache.harmony.luni.util, "Msg");

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'getString$S', function (msg) {
if (org.apache.harmony.luni.util.Msg.bundle == null) return msg;
try {
return org.apache.harmony.luni.util.Msg.bundle.getString$S (msg);
} catch (e) {
if (Clazz.exceptionOf(e, java.util.MissingResourceException)){
return msg;
} else {
throw e;
}
}
}, 1);

Clazz.newMethod$(C$, 'getString$S$O', function (msg, arg) {
return org.apache.harmony.luni.util.Msg.getString$S$OA (msg,  Clazz.newArray$(java.lang.Object, -1, [arg]));
}, 1);

Clazz.newMethod$(C$, 'getString$S$I', function (msg, arg) {
return org.apache.harmony.luni.util.Msg.getString$S$OA (msg,  Clazz.newArray$(java.lang.Object, -1, [Integer.toString (arg)]));
}, 1);

Clazz.newMethod$(C$, 'getString$S$C', function (msg, arg) {
return org.apache.harmony.luni.util.Msg.getString$S$OA (msg,  Clazz.newArray$(java.lang.Object, -1, [String.valueOf$C (arg)]));
}, 1);

Clazz.newMethod$(C$, 'getString$S$O$O', function (msg, arg1, arg2) {
return org.apache.harmony.luni.util.Msg.getString$S$OA (msg,  Clazz.newArray$(java.lang.Object, -1, [arg1, arg2]));
}, 1);

Clazz.newMethod$(C$, 'getString$S$OA', function (msg, args) {
var format = msg;
if (org.apache.harmony.luni.util.Msg.bundle != null) {
try {
format = org.apache.harmony.luni.util.Msg.bundle.getString$S (msg);
} catch (e) {
if (Clazz.exceptionOf(e, java.util.MissingResourceException)){
} else {
throw e;
}
}
}return org.apache.harmony.luni.util.MsgHelp.format$S$OA (format, args);
}, 1);

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
Clazz.defineStatics$ (C$, ["bundle", null
]);
})()
});

//Created 2017-08-18 22:18:05
