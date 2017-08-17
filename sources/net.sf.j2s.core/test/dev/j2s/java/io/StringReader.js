Clazz.load (["java.io.Reader"], "java.io.StringReader", ["java.io.IOException", "java.lang.ArrayIndexOutOfBoundsException", "$.IllegalArgumentException", "org.apache.harmony.luni.util.Msg"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.io, "StringReader", java.io.Reader);

Clazz.newMethod$(C$, '$init$', function () {
this.str = null;
this.markpos = -1;
this.pos = 0;
this.count = 0;
}, 1);

Clazz.newMethod$(C$, 'construct$S', function (str) {
C$.superClazz.construct$O.apply(this, [str]);
C$.$init$.apply(this);
this.str = str;
this.count = str.length;
}, 1);

Clazz.newMethod$(C$, 'close', function () {
{
if (C$.prototype.isOpen.apply(this, [])) {
this.str = null;
}}});

Clazz.newMethod$(C$, 'isOpen', function () {
return this.str != null;
});

Clazz.newMethod$(C$, 'mark$I', function (readLimit) {
if (readLimit >= 0) {
{
if (C$.prototype.isOpen.apply(this, [])) {
this.markpos = this.pos;
} else {
throw Clazz.$new(java.io.IOException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K0083")]);
}}} else {
throw Clazz.$new(IllegalArgumentException.construct,[]);
}});

Clazz.newMethod$(C$, 'markSupported', function () {
return true;
});

Clazz.newMethod$(C$, 'read', function () {
{
if (C$.prototype.isOpen.apply(this, [])) {
if (this.pos != this.count) {
return this.str.charAt$I (this.pos++);
}return -1;
}throw Clazz.$new(java.io.IOException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K0083")]);
}});

Clazz.newMethod$(C$, 'read$CA$I$I', function (buf, offset, len) {
if (0 <= offset && offset <= buf.length && 0 <= len && len <= buf.length - offset) {
{
if (C$.prototype.isOpen.apply(this, [])) {
if (this.pos == this.count) {
return -1;
}var end = this.pos + len > this.count ? this.count : this.pos + len;
this.str.getChars$I$I$CA$I (this.pos, end, buf, offset);
var read = end - this.pos;
this.pos = end;
return read;
}throw Clazz.$new(java.io.IOException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K0083")]);
}}throw Clazz.$new(ArrayIndexOutOfBoundsException.construct,[]);
});

Clazz.newMethod$(C$, 'ready', function () {
{
if (C$.prototype.isOpen.apply(this, [])) {
return true;
}throw Clazz.$new(java.io.IOException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K0083")]);
}});

Clazz.newMethod$(C$, 'reset', function () {
{
if (C$.prototype.isOpen.apply(this, [])) {
this.pos = this.markpos != -1 ? this.markpos : 0;
} else {
throw Clazz.$new(java.io.IOException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K0083")]);
}}});

Clazz.newMethod$(C$, 'skip$J', function (ns) {
{
if (C$.prototype.isOpen.apply(this, [])) {
if (ns <= 0) {
return 0;
}var skipped = 0;
if (ns < this.count - this.pos) {
this.pos = this.pos + ns;
skipped = ns;
} else {
skipped = this.count - this.pos;
this.pos = this.count;
}return skipped;
}throw Clazz.$new(java.io.IOException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K0083")]);
}});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
});

//Created 2017-08-17 10:33:12
