Clazz.load (["java.io.Writer"], "java.io.StringWriter", ["java.lang.IllegalArgumentException", "$.IndexOutOfBoundsException", "$.StringBuffer"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.io, "StringWriter", java.io.Writer);

Clazz.newMethod$(C$, '$init$', function () {
this.buf = null;
}, 1);

Clazz.newMethod$ (C$, 'construct', function () {
C$.superClazz.construct.apply(this);
C$.$init$.apply(this);
this.buf = Clazz.$new(StringBuffer.construct$I,[16]);
this.lock = this.buf;
}, 1);

Clazz.newMethod$ (C$, 'construct$I', function (initialSize) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
if (initialSize >= 0) {
this.buf = Clazz.$new(StringBuffer.construct$I,[initialSize]);
this.lock = this.buf;
} else {
throw Clazz.$new(IllegalArgumentException.construct);
}}, 1);

Clazz.newMethod$ (C$, 'close', function () {
});

Clazz.newMethod$ (C$, 'flush', function () {
});

Clazz.newMethod$ (C$, 'getBuffer', function () {
{
return this.buf;
}});

Clazz.newMethod$ (C$, 'toString', function () {
{
return this.buf.toString ();
}});

Clazz.newMethod$ (C$, 'write$CA$I$I', function (cbuf, offset, count) {
if (0 <= offset && offset <= cbuf.length && 0 <= count && count <= cbuf.length - offset) {
{
this.buf.append$CA$I$I (cbuf, offset, count);
}} else {
throw Clazz.$new(IndexOutOfBoundsException.construct);
}});

Clazz.newMethod$ (C$, 'write$I', function (oneChar) {
{
this.buf.append$C (String.fromCharCode (oneChar));
}});

Clazz.newMethod$ (C$, 'write$S', function (str) {
{
this.buf.append$S (str);
}});

Clazz.newMethod$ (C$, 'write$S$I$I', function (str, offset, count) {
var sub = str.substring$I$I (offset, offset + count);
{
this.buf.append$S (sub);
}});

Clazz.newMethod$ (C$, 'append$C', function (c) {
this.write$I (c.charCodeAt (0));
return this;
});

Clazz.newMethod$ (C$, 'append$CharSequence', function (csq) {
if (null == csq) {
this.append$CharSequence$I$I ("null", 0, "null".length);
} else {
this.append$CharSequence$I$I (csq, 0, csq.length);
}return this;
});

Clazz.newMethod$ (C$, 'append$CharSequence$I$I', function (csq, start, end) {
if (null == csq) {
csq = "null";
}var output = csq.subSequence$I$I (start, end).toString ();
this.write$S$I$I (output, 0, output.length);
return this;
});
})()
});

//Created 2017-08-12 07:32:14
