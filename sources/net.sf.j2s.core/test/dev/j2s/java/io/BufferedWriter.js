Clazz.load (["java.io.Writer"], "java.io.BufferedWriter", ["java.io.IOException", "java.lang.IllegalArgumentException", "$.IndexOutOfBoundsException", "$.StringIndexOutOfBoundsException", "org.apache.harmony.luni.util.Msg"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.io, "BufferedWriter", java.io.Writer);

Clazz.newMethod$(C$, '$init$', function () {
this.out = null;
this.buf = null;
this.pos = 0;
this.lineSeparator = "\r\n";
}, 1);

Clazz.newMethod$ (C$, 'construct$java_io_Writer', function (out) {
C$.superClazz.construct$O.apply(this, [out]);
C$.$init$.apply(this);
this.out = out;
this.buf =  Clazz.newCharArray (8192, '\0');
}, 1);

Clazz.newMethod$ (C$, 'construct$java_io_Writer$I', function (out, size) {
C$.superClazz.construct$O.apply(this, [out]);
C$.$init$.apply(this);
if (size > 0) {
this.out = out;
this.buf =  Clazz.newCharArray (size, '\0');
} else {
throw Clazz.$new(IllegalArgumentException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K0058")]);
}}, 1);

Clazz.newMethod$ (C$, 'close', function () {
{
if (C$.prototype.isOpen.apply(this, [])) {
this.flush ();
this.out.close ();
this.buf = null;
this.out = null;
}}});

Clazz.newMethod$ (C$, 'flush', function () {
{
if (C$.prototype.isOpen.apply(this, [])) {
if (this.pos > 0) {
this.out.write$charA$I$I (this.buf, 0, this.pos);
}this.pos = 0;
this.out.flush ();
} else {
throw Clazz.$new(java.io.IOException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K005d")]);
}}});

Clazz.newMethod$ (C$, 'isOpen', function () {
return this.out != null;
});

Clazz.newMethod$ (C$, 'newLine', function () {
this.write$S$I$I ("\r\n", 0, "\r\n".length);
});

Clazz.newMethod$ (C$, 'write$charA$I$I', function (cbuf, offset, count) {
{
if (!C$.prototype.isOpen.apply(this, [])) {
throw Clazz.$new(java.io.IOException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K005d")]);
}if (offset < 0 || offset > cbuf.length - count || count < 0) {
throw Clazz.$new(IndexOutOfBoundsException.construct);
}if (this.pos == 0 && count >= this.buf.length) {
this.out.write$charA$I$I (cbuf, offset, count);
return;
}var available = this.buf.length - this.pos;
if (count < available) {
available = count;
}if (available > 0) {
System.arraycopy (cbuf, offset, this.buf, this.pos, available);
this.pos += available;
}if (this.pos == this.buf.length) {
this.out.write$charA$I$I (this.buf, 0, this.buf.length);
this.pos = 0;
if (count > available) {
offset += available;
available = count - available;
if (available >= this.buf.length) {
this.out.write$charA$I$I (cbuf, offset, available);
return;
}System.arraycopy (cbuf, offset, this.buf, this.pos, available);
this.pos += available;
}}}});

Clazz.newMethod$ (C$, 'write$I', function (oneChar) {
{
if (C$.prototype.isOpen.apply(this, [])) {
if (this.pos >= this.buf.length) {
this.out.write$charA$I$I (this.buf, 0, this.buf.length);
this.pos = 0;
}this.buf[this.pos++] = String.fromCharCode (oneChar);
} else {
throw Clazz.$new(java.io.IOException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K005d")]);
}}});

Clazz.newMethod$ (C$, 'write$S$I$I', function (str, offset, count) {
{
if (!C$.prototype.isOpen.apply(this, [])) {
throw Clazz.$new(java.io.IOException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K005d")]);
}if (count <= 0) {
return;
}if (offset > str.length - count || offset < 0) {
throw Clazz.$new(StringIndexOutOfBoundsException.construct);
}if (this.pos == 0 && count >= this.buf.length) {
var chars =  Clazz.newCharArray (count, '\0');
str.getChars (offset, offset + count, chars, 0);
this.out.write$charA$I$I (chars, 0, count);
return;
}var available = this.buf.length - this.pos;
if (count < available) {
available = count;
}if (available > 0) {
str.getChars (offset, offset + available, this.buf, this.pos);
this.pos += available;
}if (this.pos == this.buf.length) {
this.out.write$charA$I$I (this.buf, 0, this.buf.length);
this.pos = 0;
if (count > available) {
offset += available;
available = count - available;
if (available >= this.buf.length) {
var chars =  Clazz.newCharArray (count, '\0');
str.getChars (offset, offset + available, chars, 0);
this.out.write$charA$I$I (chars, 0, available);
return;
}str.getChars (offset, offset + available, this.buf, this.pos);
this.pos += available;
}}}});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
})()
});

//Created 2017-08-08 06:13:41
