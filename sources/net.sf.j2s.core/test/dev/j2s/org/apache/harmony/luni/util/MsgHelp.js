Clazz.declarePackage ("org.apache.harmony.luni.util");
Clazz.load (["java.util.ResourceBundle"], "org.apache.harmony.luni.util.MsgHelp", ["java.lang.StringBuilder"], function () {

(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, org.apache.harmony.luni.util, "MsgHelp");

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'format$S$OA', function (format, args) {
var answer = Clazz.$new(StringBuilder.construct,[format.length + (args.length * 20)]);
var argStrings =  new Array (args.length);
for (var i = 0; i < args.length; ++i) {
if (args[i] == null) argStrings[i] = "<null>";
 else argStrings[i] = args[i].toString ();
}
var lastI = 0;
for (var i = format.indexOf ('{', 0); i >= 0; i = format.indexOf ('{', lastI)) {
if (i != 0 && format.charAt (i - 1) == '\\') {
if (i != 1) answer.append (format.substring (lastI, i - 1));
answer.append ('{');
lastI = i + 1;
} else {
if (i > format.length - 3) {
answer.append (format.substring (lastI, format.length));
lastI = format.length;
} else {
var argnum = (format.charCodeAt (i + 1) - 48);
if (argnum < 0 || format.charAt (i + 2) != '}') {
answer.append (format.substring (lastI, i + 1));
lastI = i + 1;
} else {
answer.append (format.substring (lastI, i));
if (argnum >= argStrings.length) answer.append ("<missing argument>");
 else answer.append (argStrings[argnum]);
lastI = i + 3;
}}}}
if (lastI < format.length) answer.append (format.substring (lastI, format.length));
return answer.toString ();
}, 1);

Clazz.newMethod$ (C$, 'setLocale$java_util_Locale$S', function (locale, resource) {
return java.util.ResourceBundle.getBundle$S (resource);
}, 1);

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
});

//Created 2017-08-08 06:13:50
