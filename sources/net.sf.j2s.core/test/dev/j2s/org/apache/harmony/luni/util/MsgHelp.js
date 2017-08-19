Clazz.declarePackage ("org.apache.harmony.luni.util");
Clazz.load (["java.util.ResourceBundle"], "org.apache.harmony.luni.util.MsgHelp", ["java.lang.StringBuilder"], function () {

(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, org.apache.harmony.luni.util, "MsgHelp");

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'format$S$OA', function (format, args) {
var answer = Clazz.$new(StringBuilder.construct$I,[format.length + (args.length * 20)]);
var argStrings =  Clazz.newArray$(java.lang.String, [args.length]);
for (var i = 0; i < args.length; ++i) {
if (args[i] == null) argStrings[i] = "<null>";
 else argStrings[i] = args[i].toString ();
}
var lastI = 0;
for (var i = format.indexOf$I$I ('{', 0); i >= 0; i = format.indexOf$I$I ('{', lastI)) {
if (i != 0 && format.charAt$I (i - 1) == '\\') {
if (i != 1) answer.append$S (format.substring$I$I (lastI, i - 1));
answer.append$C ('{');
lastI = i + 1;
} else {
if (i > format.length - 3) {
answer.append$S (format.substring$I$I (lastI, format.length));
lastI = format.length;
} else {
var argnum = ((format.charAt$I (i + 1)).charCodeAt (0) - 48);
if (argnum < 0 || format.charAt$I (i + 2) != '}') {
answer.append$S (format.substring$I$I (lastI, i + 1));
lastI = i + 1;
} else {
answer.append$S (format.substring$I$I (lastI, i));
if (argnum >= argStrings.length) answer.append$S ("<missing argument>");
 else answer.append$S (argStrings[argnum]);
lastI = i + 3;
}}}}
if (lastI < format.length) answer.append$S (format.substring$I$I (lastI, format.length));
return answer.toString ();
}, 1);

Clazz.newMethod$(C$, 'setLocale$java_util_Locale$S', function (locale, resource) {
return java.util.ResourceBundle.getBundle$S (resource);
}, 1);

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
});

//Created 2017-08-18 22:18:05
