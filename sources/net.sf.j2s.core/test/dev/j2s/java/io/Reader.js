Clazz.load (["java.io.Closeable", "java.lang.Readable"], "java.io.Reader", ["java.io.IOException", "java.lang.IllegalArgumentException", "$.NullPointerException"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.io, "Reader", null, [Readable, java.io.Closeable]);

Clazz.newMethod$(C$, '$init$', function () {
this.lock = null;
}, 1);

Clazz.newMethod$(C$, 'construct', function () {
this.lock = this;
}, 1);

Clazz.newMethod$(C$, 'construct$O', function (lock) {
C$.$init$.apply(this);
if (lock != null) this.lock = lock;
 else throw Clazz.$new(NullPointerException.construct,[]);
}, 1);

Clazz.newMethod$(C$, 'mark$I', function (readLimit) {
throw Clazz.$new(java.io.IOException.construct,[]);
});

Clazz.newMethod$(C$, 'markSupported', function () {
return false;
});

Clazz.newMethod$(C$, 'read', function () {
{
var charArray =  Clazz.newArray$('CA', 1, [1]);
if (this.read$CA$I$I (charArray, 0, 1) != -1) return charArray[0];
return -1;
}});

Clazz.newMethod$(C$, 'read$CA', function (buf) {
return this.read$CA$I$I (buf, 0, buf.length);
});

Clazz.newMethod$(C$, 'ready', function () {
return false;
});

Clazz.newMethod$(C$, 'reset', function () {
throw Clazz.$new(java.io.IOException.construct,[]);
});

Clazz.newMethod$(C$, 'skip$J', function (count) {
if (count >= 0) {
{
var skipped = 0;
var toRead = count < 512 ? count : 512;
var charsSkipped =  Clazz.newArray$('CA', 1, [toRead]);
while (skipped < count) {
var read = this.read$CA$I$I (charsSkipped, 0, toRead);
if (read == -1) {
return skipped;
}skipped += read;
if (read < toRead) {
return skipped;
}if (count - skipped < toRead) {
toRead = (count - skipped);
}}
return skipped;
}}throw Clazz.$new(IllegalArgumentException.construct,[]);
});

Clazz.newMethod$(C$, 'read$java_nio_CharBuffer', function (target) {
if (null == target) {
throw Clazz.$new(NullPointerException.construct,[]);
}var length = target.length ();
var buf =  Clazz.newArray$('CA', 1, [length]);
length = Math.min (length, this.read$CA (buf));
if (length > 0) {
target.put$CA$I$I (buf, 0, length);
}return length;
});
})()
});

//Created 2017-08-17 10:33:12
