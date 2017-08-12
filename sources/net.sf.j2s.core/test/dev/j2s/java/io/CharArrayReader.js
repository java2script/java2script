Clazz.load (["java.io.Reader"], "java.io.CharArrayReader", ["java.io.IOException", "java.lang.ArrayIndexOutOfBoundsException", "$.IllegalArgumentException", "org.apache.harmony.luni.util.Msg"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.io, "CharArrayReader", java.io.Reader);

Clazz.newMethod$(C$, '$init$', function () {
this.buf = null;
this.pos = 0;
this.markedPos = -1;
this.count = 0;
}, 1);

Clazz.newMethod$ (C$, 'construct$CA', function (buf) {
C$.superClazz.construct$O.apply(this, [buf]);
C$.$init$.apply(this);
this.buf = buf;
this.count = buf.length;
}, 1);

Clazz.newMethod$ (C$, 'construct$CA$I$I', function (buf, offset, length) {
C$.superClazz.construct$O.apply(this, [buf]);
C$.$init$.apply(this);
if (0 <= offset && offset <= buf.length && length >= 0) {
this.buf = buf;
this.pos = offset;
this.count = this.pos + length < buf.length ? length : buf.length;
} else {
throw Clazz.$new(IllegalArgumentException.construct);
}}, 1);

Clazz.newMethod$ (C$, 'close', function () {
{
if (C$.prototype.isOpen.apply(this, [])) {
this.buf = null;
}}});

Clazz.newMethod$ (C$, 'isOpen', function () {
return this.buf != null;
});

Clazz.newMethod$ (C$, 'mark$I', function (readLimit) {
{
if (C$.prototype.isOpen.apply(this, [])) {
this.markedPos = this.pos;
} else {
throw Clazz.$new(java.io.IOException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K0060")]);
}}});

Clazz.newMethod$ (C$, 'markSupported', function () {
return true;
});

Clazz.newMethod$ (C$, 'read', function () {
{
if (C$.prototype.isOpen.apply(this, [])) {
if (this.pos != this.count) {
return this.buf[this.pos++];
}return -1;
}throw Clazz.$new(java.io.IOException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K0060")]);
}});

Clazz.newMethod$ (C$, 'read$CA$I$I', function (buffer, offset, len) {
if (0 <= offset && offset <= buffer.length && 0 <= len && len <= buffer.length - offset) {
{
if (C$.prototype.isOpen.apply(this, [])) {
if (this.pos < this.count) {
var bytesRead = this.pos + len > this.count ? this.count - this.pos : len;
System.arraycopy (this.buf, this.pos, buffer, offset, bytesRead);
this.pos += bytesRead;
return bytesRead;
}return -1;
}throw Clazz.$new(java.io.IOException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K0060")]);
}}throw Clazz.$new(ArrayIndexOutOfBoundsException.construct);
});

Clazz.newMethod$ (C$, 'ready', function () {
{
if (C$.prototype.isOpen.apply(this, [])) {
return this.pos != this.count;
}throw Clazz.$new(java.io.IOException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K0060")]);
}});

Clazz.newMethod$ (C$, 'reset', function () {
{
if (C$.prototype.isOpen.apply(this, [])) {
this.pos = this.markedPos != -1 ? this.markedPos : 0;
} else {
throw Clazz.$new(java.io.IOException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K0060")]);
}}});

Clazz.newMethod$ (C$, 'skip$J', function (n) {
{
if (C$.prototype.isOpen.apply(this, [])) {
if (n <= 0) {
return 0;
}var skipped = 0;
if (n < this.count - this.pos) {
this.pos = this.pos + n;
skipped = n;
} else {
skipped = this.count - this.pos;
this.pos = this.count;
}return skipped;
}throw Clazz.$new(java.io.IOException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K0060")]);
}});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
});

//Created 2017-08-12 07:32:13
