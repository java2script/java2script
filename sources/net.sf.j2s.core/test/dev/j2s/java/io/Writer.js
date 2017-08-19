Clazz.load (["java.io.Closeable", "$.Flushable", "java.lang.Appendable"], "java.io.Writer", ["java.lang.NullPointerException", "$.StringIndexOutOfBoundsException"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.io, "Writer", null, [Appendable, java.io.Closeable, java.io.Flushable]);

Clazz.newMethod$(C$, '$init$', function () {
this.lock = null;
}, 1);

Clazz.newMethod$(C$, 'construct', function () {
this.lock = this;
}, 1);

Clazz.newMethod$(C$, 'construct$O', function (lock) {
C$.$init$.apply(this);
if (lock != null) {
this.lock = lock;
} else {
throw Clazz.$new(NullPointerException.construct,[]);
}}, 1);

Clazz.newMethod$(C$, 'write$CA', function (buf) {
this.write$CA$I$I (buf, 0, buf.length);
});

Clazz.newMethod$(C$, 'write$I', function (oneChar) {
{
var oneCharArray =  Clazz.newArray$(Character.TYPE, [1]);
oneCharArray[0] = String.fromCharCode (oneChar);
this.write$CA (oneCharArray);
}});

Clazz.newMethod$(C$, 'write$S', function (str) {
var buf =  Clazz.newArray$(Character.TYPE, [str.length]);
str.getChars$I$I$CA$I (0, buf.length, buf, 0);
{
this.write$CA (buf);
}});

Clazz.newMethod$(C$, 'write$S$I$I', function (str, offset, count) {
if (count >= 0) {
var buf =  Clazz.newArray$(Character.TYPE, [count]);
str.getChars$I$I$CA$I (offset, offset + count, buf, 0);
{
this.write$CA (buf);
}} else {
throw Clazz.$new(StringIndexOutOfBoundsException.construct,[]);
}});

Clazz.newMethod$(C$, 'append$C', function (c) {
this.write$I (c.charCodeAt (0));
return this;
});

Clazz.newMethod$(C$, 'append$CharSequence', function (csq) {
if (null == csq) {
this.write$S ("null");
} else {
this.write$S (csq.toString ());
}return this;
});

Clazz.newMethod$(C$, 'append$CharSequence$I$I', function (csq, start, end) {
if (null == csq) {
this.write$S ("null".substring$I$I (start, end));
} else {
this.write$S (csq.subSequence$I$I (start, end).toString ());
}return this;
});
Clazz.defineStatics$ (C$, ["TOKEN_NULL", "null"
]);
})()
});

//Created 2017-08-18 22:17:58
