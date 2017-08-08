Clazz.load (["java.io.Reader"], "java.io.BufferedReader", ["java.io.IOException", "java.lang.IllegalArgumentException", "$.IndexOutOfBoundsException", "$.StringBuilder", "org.apache.harmony.luni.util.Msg"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.io, "BufferedReader", java.io.Reader);

Clazz.newMethod$(C$, '$init$', function () {
this.$in = null;
this.buf = null;
this.marklimit = -1;
this.count = 0;
this.markpos = -1;
this.pos = 0;
}, 1);

Clazz.newMethod$ (C$, 'construct$java_io_Reader', function ($in) {
C$.superClazz.construct$O.apply(this, [$in]);
C$.$init$.apply(this);
this.$in = $in;
this.buf =  Clazz.newCharArray (8192, '\0');
}, 1);

Clazz.newMethod$ (C$, 'construct$java_io_Reader$I', function ($in, size) {
C$.superClazz.construct$O.apply(this, [$in]);
C$.$init$.apply(this);
if (size > 0) {
this.$in = $in;
this.buf =  Clazz.newCharArray (size, '\0');
} else {
throw Clazz.$new(IllegalArgumentException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K0058")]);
}}, 1);

Clazz.newMethod$ (C$, 'close', function () {
{
if (C$.prototype.isOpen.apply(this, [])) {
this.$in.close ();
this.buf = null;
}}});

Clazz.newMethod$ (C$, 'fillbuf', function () {
if (this.markpos == -1 || (this.pos - this.markpos >= this.marklimit)) {
var result = this.$in.read$charA$I$I (this.buf, 0, this.buf.length);
if (result > 0) {
this.markpos = -1;
this.pos = 0;
this.count = result == -1 ? 0 : result;
}return result;
}if (this.markpos == 0 && this.marklimit > this.buf.length) {
var newLength = this.buf.length * 2;
if (newLength > this.marklimit) {
newLength = this.marklimit;
}var newbuf =  Clazz.newCharArray (newLength, '\0');
System.arraycopy (this.buf, 0, newbuf, 0, this.buf.length);
this.buf = newbuf;
} else if (this.markpos > 0) {
System.arraycopy (this.buf, this.markpos, this.buf, 0, this.buf.length - this.markpos);
}this.pos -= this.markpos;
this.count = this.markpos = 0;
var charsread = this.$in.read$charA$I$I (this.buf, this.pos, this.buf.length - this.pos);
this.count = charsread == -1 ? this.pos : this.pos + charsread;
return charsread;
});

Clazz.newMethod$ (C$, 'isOpen', function () {
return this.buf != null;
});

Clazz.newMethod$ (C$, 'mark$I', function (readlimit) {
if (readlimit >= 0) {
{
if (C$.prototype.isOpen.apply(this, [])) {
this.marklimit = readlimit;
this.markpos = this.pos;
} else {
throw Clazz.$new(java.io.IOException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K005b")]);
}}} else {
throw Clazz.$new(IllegalArgumentException.construct);
}});

Clazz.newMethod$ (C$, 'markSupported', function () {
return true;
});

Clazz.newMethod$ (C$, 'read', function () {
{
if (C$.prototype.isOpen.apply(this, [])) {
if (this.pos < this.count || C$.prototype.fillbuf.apply(this, []) != -1) {
return this.buf[this.pos++];
}return -1;
}throw Clazz.$new(java.io.IOException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K005b")]);
}});

Clazz.newMethod$ (C$, 'read$charA$I$I', function (buffer, offset, length) {
{
if (!C$.prototype.isOpen.apply(this, [])) {
throw Clazz.$new(java.io.IOException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K005b")]);
}if (offset < 0 || offset > buffer.length - length || length < 0) {
throw Clazz.$new(IndexOutOfBoundsException.construct);
}if (length == 0) {
return 0;
}var required;
if (this.pos < this.count) {
var copylength = this.count - this.pos >= length ? length : this.count - this.pos;
System.arraycopy (this.buf, this.pos, buffer, offset, copylength);
this.pos += copylength;
if (copylength == length || !this.$in.ready ()) {
return copylength;
}offset += copylength;
required = length - copylength;
} else {
required = length;
}while (true) {
var read;
if (this.markpos == -1 && required >= this.buf.length) {
read = this.$in.read$charA$I$I (buffer, offset, required);
if (read == -1) {
return required == length ? -1 : length - required;
}} else {
if (C$.prototype.fillbuf.apply(this, []) == -1) {
return required == length ? -1 : length - required;
}read = this.count - this.pos >= required ? required : this.count - this.pos;
System.arraycopy (this.buf, this.pos, buffer, offset, read);
this.pos += read;
}required -= read;
if (required == 0) {
return length;
}if (!this.$in.ready ()) {
return length - required;
}offset += read;
}
}});

Clazz.newMethod$ (C$, 'readLine', function () {
{
if (C$.prototype.isOpen.apply(this, [])) {
if ((this.pos >= this.count) && (C$.prototype.fillbuf.apply(this, []) == -1)) {
return null;
}for (var charPos = this.pos; charPos < this.count; charPos++) {
var ch = this.buf[charPos];
if (ch > '\r') continue;
if (ch == '\n') {
var res =  String.instantialize(this.buf, this.pos, charPos - this.pos);
this.pos = charPos + 1;
return res;
} else if (ch == '\r') {
var res =  String.instantialize(this.buf, this.pos, charPos - this.pos);
this.pos = charPos + 1;
if (((this.pos < this.count) || (C$.prototype.fillbuf.apply(this, []) != -1)) && (this.buf[this.pos] == '\n')) {
this.pos++;
}return res;
}}
var eol = '\u0000';
var result = Clazz.$new(StringBuilder.construct,[80]);
result.append (this.buf, this.pos, this.count - this.pos);
this.pos = this.count;
while (true) {
if (this.pos >= this.count) {
if (eol == '\n') {
return result.toString ();
}if (C$.prototype.fillbuf.apply(this, []) == -1) {
return result.length () > 0 || eol != '\0' ? result.toString () : null;
}}for (var charPos = this.pos; charPos < this.count; charPos++) {
if (eol == '\0') {
if ((this.buf[charPos] == '\n' || this.buf[charPos] == '\r')) {
eol = this.buf[charPos];
}} else if (eol == '\r' && (this.buf[charPos] == '\n')) {
if (charPos > this.pos) {
result.append (this.buf, this.pos, charPos - this.pos - 1);
}this.pos = charPos + 1;
return result.toString ();
} else if (eol != '\0') {
if (charPos > this.pos) {
result.append (this.buf, this.pos, charPos - this.pos - 1);
}this.pos = charPos;
return result.toString ();
}}
if (eol == '\0') {
result.append (this.buf, this.pos, this.count - this.pos);
} else {
result.append (this.buf, this.pos, this.count - this.pos - 1);
}this.pos = this.count;
}
}throw Clazz.$new(java.io.IOException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K005b")]);
}});

Clazz.newMethod$ (C$, 'ready', function () {
{
if (C$.prototype.isOpen.apply(this, [])) {
return ((this.count - this.pos) > 0) || this.$in.ready ();
}throw Clazz.$new(java.io.IOException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K005b")]);
}});

Clazz.newMethod$ (C$, 'reset', function () {
{
if (C$.prototype.isOpen.apply(this, [])) {
if (this.markpos != -1) {
this.pos = this.markpos;
} else {
throw Clazz.$new(java.io.IOException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K005c")]);
}} else {
throw Clazz.$new(java.io.IOException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K005b")]);
}}});

Clazz.newMethod$ (C$, 'skip$L', function (amount) {
if (amount >= 0) {
{
if (C$.prototype.isOpen.apply(this, [])) {
if (amount < 1) {
return 0;
}if (this.count - this.pos >= amount) {
this.pos += amount;
return amount;
}var read = this.count - this.pos;
this.pos = this.count;
while (read < amount) {
if (C$.prototype.fillbuf.apply(this, []) == -1) {
return read;
}if (this.count - this.pos >= amount - read) {
this.pos += amount - read;
return amount;
}read += (this.count - this.pos);
this.pos = this.count;
}
return amount;
}throw Clazz.$new(java.io.IOException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K005b")]);
}}throw Clazz.$new(IllegalArgumentException.construct);
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
});

//Created 2017-08-08 06:13:41
