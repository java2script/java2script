Clazz.load (["java.io.Closeable"], "java.io.InputStream", ["java.io.IOException", "java.lang.ArrayIndexOutOfBoundsException"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.io, "InputStream", null, java.io.Closeable);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'construct', function () {
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'available', function () {
return 0;
});

Clazz.newMethod$ (C$, 'close', function () {
});

Clazz.newMethod$ (C$, 'mark$I', function (readlimit) {
});

Clazz.newMethod$ (C$, 'markSupported', function () {
return false;
});

Clazz.newMethod$ (C$, 'read$BA', function (b) {
return this.read$BA$I$I (b, 0, b.length);
});

Clazz.newMethod$ (C$, 'read$BA$I$I', function (b, offset, length) {
if (offset <= b.length && 0 <= offset && 0 <= length && length <= b.length - offset) {
for (var i = 0; i < length; i++) {
var c;
try {
if ((c = this.read ()) == -1) return i == 0 ? -1 : i;
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
if (i != 0) return i;
throw e;
} else {
throw e;
}
}
b[offset + i] = c;
}
return length;
}throw Clazz.$new(ArrayIndexOutOfBoundsException.construct);
});

Clazz.newMethod$ (C$, 'reset', function () {
throw Clazz.$new(java.io.IOException.construct);
});

Clazz.newMethod$ (C$, 'skip$J', function (n) {
if (n <= 0) return 0;
var skipped = 0;
var toRead = n < 4096 ? n : 4096;
if (java.io.InputStream.skipBuf == null || java.io.InputStream.skipBuf.length < toRead) java.io.InputStream.skipBuf =  Clazz.newArray$('BA', Clazz.newByteA$, [toRead, 0]);
while (skipped < n) {
var read = this.read$BA$I$I (java.io.InputStream.skipBuf, 0, toRead);
if (read == -1) return skipped;
skipped += read;
if (read < toRead) return skipped;
if (n - skipped < toRead) toRead = (n - skipped);
}
return skipped;
});
Clazz.defineStatics (C$,
"skipBuf", null);
})()
});

//Created 2017-08-12 07:32:14
