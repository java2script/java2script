Clazz.load (["java.io.Writer"], "java.io.CharArrayWriter", ["java.lang.IllegalArgumentException", "$.IndexOutOfBoundsException", "$.NullPointerException", "$.StringIndexOutOfBoundsException", "org.apache.harmony.luni.util.Msg"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.io, "CharArrayWriter", java.io.Writer);

Clazz.newMethod$(C$, '$init$', function () {
this.buf = null;
this.count = 0;
}, 1);

Clazz.newMethod$(C$, 'construct', function () {
C$.superClazz.construct.apply(this, []);
C$.$init$.apply(this);
this.buf =  Clazz.newArray$(Character.TYPE, [32]);
this.lock = this.buf;
}, 1);

Clazz.newMethod$(C$, 'construct$I', function (initialSize) {
C$.superClazz.construct.apply(this, []);
C$.$init$.apply(this);
if (initialSize >= 0) {
this.buf =  Clazz.newArray$(Character.TYPE, [initialSize]);
this.lock = this.buf;
} else {
throw Clazz.$new(IllegalArgumentException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K005e")]);
}}, 1);

Clazz.newMethod$(C$, 'close', function () {
});

Clazz.newMethod$(C$, 'expand$I', function (i) {
if (this.count + i <= this.buf.length) {
return;
}var newbuf =  Clazz.newArray$(Character.TYPE, [this.buf.length + (2 * i)]);
System.arraycopy$O$I$O$I$I (this.buf, 0, newbuf, 0, this.count);
this.buf = newbuf;
});

Clazz.newMethod$(C$, 'flush', function () {
});

Clazz.newMethod$(C$, 'reset', function () {
{
this.count = 0;
}});

Clazz.newMethod$(C$, 'size', function () {
{
return this.count;
}});

Clazz.newMethod$(C$, 'toCharArray', function () {
{
var result =  Clazz.newArray$(Character.TYPE, [this.count]);
System.arraycopy$O$I$O$I$I (this.buf, 0, result, 0, this.count);
return result;
}});

Clazz.newMethod$(C$, 'toString', function () {
{
return  String.instantialize(this.buf, 0, this.count);
}});

Clazz.newMethod$(C$, 'write$CA$I$I', function (c, offset, len) {
if (0 <= offset && offset <= c.length && 0 <= len && len <= c.length - offset) {
{
C$.prototype.expand$I.apply(this, [len]);
System.arraycopy$O$I$O$I$I (c, offset, this.buf, this.count, len);
this.count += len;
}} else {
throw Clazz.$new(IndexOutOfBoundsException.construct,[]);
}});

Clazz.newMethod$(C$, 'write$I', function (oneChar) {
{
C$.prototype.expand$I.apply(this, [1]);
this.buf[this.count++] = String.fromCharCode (oneChar);
}});

Clazz.newMethod$(C$, 'write$S$I$I', function (str, offset, len) {
if (str == null) {
throw Clazz.$new(NullPointerException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K0047")]);
}if (0 <= offset && offset <= str.length && 0 <= len && len <= str.length - offset) {
{
C$.prototype.expand$I.apply(this, [len]);
str.getChars$I$I$CA$I (offset, offset + len, this.buf, this.count);
this.count += len;
}} else {
throw Clazz.$new(StringIndexOutOfBoundsException.construct,[]);
}});

Clazz.newMethod$(C$, 'writeTo$java_io_Writer', function (out) {
{
out.write$CA$I$I (this.buf, 0, this.count);
}});

Clazz.newMethod$(C$, 'append$C', function (c) {
this.write$I (c.charCodeAt (0));
return this;
});

Clazz.newMethod$(C$, 'append$CharSequence', function (csq) {
if (null == csq) {
this.append$CharSequence$I$I ("null", 0, "null".length);
} else {
this.append$CharSequence$I$I (csq, 0, csq.length);
}return this;
});

Clazz.newMethod$(C$, 'append$CharSequence$I$I', function (csq, start, end) {
if (null == csq) {
csq = "null";
}var output = csq.subSequence$I$I (start, end).toString ();
this.write$S$I$I (output, 0, output.length);
return this;
});
})()
});

//Created 2017-08-18 22:17:57
