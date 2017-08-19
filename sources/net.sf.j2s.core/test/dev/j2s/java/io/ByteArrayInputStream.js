Clazz.load (["java.io.InputStream"], "java.io.ByteArrayInputStream", ["java.lang.ArrayIndexOutOfBoundsException", "$.NullPointerException"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.io, "ByteArrayInputStream", java.io.InputStream);

Clazz.newMethod$(C$, '$init$', function () {
this.buf = null;
this.pos = 0;
this.$mark = 0;
this.count = 0;
}, 1);

Clazz.newMethod$(C$, 'construct$BA', function (buf) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.$mark = 0;
this.buf = buf;
this.count = buf.length;
}, 1);

Clazz.newMethod$(C$, 'construct$BA$I$I', function (buf, offset, length) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.buf = buf;
this.pos = offset >= buf.length ? buf.length : offset;
this.$mark = this.pos;
this.count = length + this.pos > buf.length ? buf.length : length + this.pos;
}, 1);

Clazz.newMethod$(C$, 'available', function () {
return this.count - this.pos;
});

Clazz.newMethod$(C$, 'close', function () {
});

Clazz.newMethod$(C$, 'mark$I', function (readlimit) {
this.$mark = this.pos;
});

Clazz.newMethod$(C$, 'markSupported', function () {
return true;
});

Clazz.newMethod$(C$, 'read', function () {
return this.pos < this.count ? this.buf[this.pos++] & 0xFF : -1;
});

Clazz.newMethod$(C$, 'read$BA$I$I', function (b, offset, length) {
if (this.pos >= this.count) {
return -1;
}if (b != null) {
if (0 <= offset && offset <= b.length && 0 <= length && length <= b.length - offset) {
if (length == 0) {
return 0;
}var copylen = this.count - this.pos < length ? this.count - this.pos : length;
System.arraycopy$O$I$O$I$I (this.buf, this.pos, b, offset, copylen);
this.pos += copylen;
return copylen;
}throw Clazz.$new(ArrayIndexOutOfBoundsException.construct,[]);
}throw Clazz.$new(NullPointerException.construct,[]);
});

Clazz.newMethod$(C$, 'reset', function () {
this.pos = this.$mark;
});

Clazz.newMethod$(C$, 'skip$J', function (n) {
if (n <= 0) {
return 0;
}var temp = this.pos;
this.pos = this.count - this.pos < n ? this.count : (this.pos + n);
return this.pos - temp;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
});

//Created 2017-08-18 22:17:57
