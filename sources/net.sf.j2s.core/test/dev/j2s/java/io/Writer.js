Clazz.load (["java.io.Closeable", "$.Flushable", "java.lang.Appendable"], "java.io.Writer", ["java.lang.NullPointerException", "$.StringIndexOutOfBoundsException"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.io, "Writer", null, [Appendable, java.io.Closeable, java.io.Flushable]);

Clazz.newMethod$(C$, '$init$', function () {
this.lock = null;
}, 1);

Clazz.newMethod$ (C$, 'construct', function () {
this.lock = this;
}, 1);

Clazz.newMethod$ (C$, 'construct$O', function (lock) {
C$.$init$.apply(this);
if (lock != null) {
this.lock = lock;
} else {
throw Clazz.$new(NullPointerException.construct);
}}, 1);

Clazz.newMethod$ (C$, 'write$charA', function (buf) {
this.write$charA$I$I (buf, 0, buf.length);
});

Clazz.newMethod$ (C$, 'write$I', function (oneChar) {
{
var oneCharArray =  Clazz.newCharArray (1, '\0');
oneCharArray[0] = String.fromCharCode (oneChar);
this.write$charA (oneCharArray);
}});

Clazz.newMethod$ (C$, 'write$S', function (str) {
var buf =  Clazz.newCharArray (str.length, '\0');
str.getChars (0, buf.length, buf, 0);
{
this.write$charA (buf);
}});

Clazz.newMethod$ (C$, 'write$S$I$I', function (str, offset, count) {
if (count >= 0) {
var buf =  Clazz.newCharArray (count, '\0');
str.getChars (offset, offset + count, buf, 0);
{
this.write$charA (buf);
}} else {
throw Clazz.$new(StringIndexOutOfBoundsException.construct);
}});

Clazz.newMethod$ (C$, 'append$char', function (c) {
this.write$I (c.charCodeAt (0));
return this;
});

Clazz.newMethod$ (C$, 'append$CharSequence', function (csq) {
if (null == csq) {
this.write$S ("null");
} else {
this.write$S (csq.toString ());
}return this;
});

Clazz.newMethod$ (C$, 'append$CharSequence$I$I', function (csq, start, end) {
if (null == csq) {
this.write$S ("null".substring (start, end));
} else {
this.write$S (csq.subSequence$I$I (start, end).toString ());
}return this;
});
Clazz.defineStatics (C$,
"TOKEN_NULL", "null");
})()
});

//Created 2017-08-08 06:13:42
