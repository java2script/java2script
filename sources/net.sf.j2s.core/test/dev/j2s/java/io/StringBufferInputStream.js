Clazz.load (["java.io.InputStream"], "java.io.StringBufferInputStream", ["java.lang.ArrayIndexOutOfBoundsException", "$.NullPointerException", "org.apache.harmony.luni.util.Msg"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.io, "StringBufferInputStream", java.io.InputStream);

Clazz.newMethod$(C$, '$init$', function () {
this.buffer = null;
this.count = 0;
this.pos = 0;
}, 1);

Clazz.newMethod$ (C$, 'construct$S', function (str) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
if (str != null) {
this.buffer = str;
this.count = str.length;
} else {
throw Clazz.$new(NullPointerException.construct);
}}, 1);

Clazz.newMethod$ (C$, 'available', function () {
return this.count - this.pos;
});

Clazz.newMethod$ (C$, 'read', function () {
return this.pos < this.count ? (this.buffer.charAt$I (this.pos++)).charCodeAt (0) & 0xFF : -1;
});

Clazz.newMethod$ (C$, 'read$BA$I$I', function (b, offset, length) {
if (this.pos >= this.count) {
return -1;
}if (b != null) {
if (0 <= offset && offset <= b.length && 0 <= length && length <= b.length - offset) {
if (length == 0) {
return 0;
}var copylen = this.count - this.pos < length ? this.count - this.pos : length;
for (var i = 0; i < copylen; i++) {
b[offset + i] = (this.buffer.charAt$I (this.pos + i)).charCodeAt (0);
}
this.pos += copylen;
return copylen;
}throw Clazz.$new(ArrayIndexOutOfBoundsException.construct);
}throw Clazz.$new(NullPointerException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K0047")]);
});

Clazz.newMethod$ (C$, 'reset', function () {
this.pos = 0;
});

Clazz.newMethod$ (C$, 'skip$J', function (n) {
if (n <= 0) {
return 0;
}var numskipped;
if (this.count - this.pos < n) {
numskipped = this.count - this.pos;
this.pos = this.count;
} else {
numskipped = n;
this.pos += n;
}return numskipped;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
});

//Created 2017-08-12 07:32:14
