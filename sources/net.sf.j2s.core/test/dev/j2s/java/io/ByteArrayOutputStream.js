Clazz.load (["java.io.OutputStream"], "java.io.ByteArrayOutputStream", ["java.lang.IllegalArgumentException", "$.IndexOutOfBoundsException", "$.NullPointerException", "org.apache.harmony.luni.util.Msg"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.io, "ByteArrayOutputStream", java.io.OutputStream);

Clazz.newMethod$(C$, '$init$', function () {
this.buf = null;
this.count = 0;
}, 1);

Clazz.newMethod$ (C$, 'construct', function () {
C$.superClazz.construct.apply(this);
C$.$init$.apply(this);
this.buf =  Clazz.newArray$('BA', Clazz.newByteA$, [32, 0]);
}, 1);

Clazz.newMethod$ (C$, 'construct$I', function (size) {
C$.superClazz.construct.apply(this);
C$.$init$.apply(this);
if (size >= 0) {
this.buf =  Clazz.newArray$('BA', Clazz.newByteA$, [size, 0]);
} else {
throw Clazz.$new(IllegalArgumentException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K005e")]);
}}, 1);

Clazz.newMethod$ (C$, 'close', function () {
C$.superClazz.prototype.close.apply(this, arguments);
});

Clazz.newMethod$ (C$, 'expand$I', function (i) {
if (this.count + i <= this.buf.length) {
return;
}var newbuf =  Clazz.newArray$('BA', Clazz.newByteA$, [(this.count + i) * 2, 0]);
System.arraycopy (this.buf, 0, newbuf, 0, this.count);
this.buf = newbuf;
});

Clazz.newMethod$ (C$, 'reset', function () {
this.count = 0;
});

Clazz.newMethod$ (C$, 'size', function () {
return this.count;
});

Clazz.newMethod$ (C$, 'toByteArray', function () {
var newArray =  Clazz.newArray$('BA', Clazz.newByteA$, [this.count, 0]);
System.arraycopy (this.buf, 0, newArray, 0, this.count);
return newArray;
});

Clazz.newMethod$ (C$, 'toString', function () {
return  String.instantialize(this.buf, 0, this.count);
});

Clazz.newMethod$ (C$, 'toString$I', function (hibyte) {
var newBuf =  Clazz.newArray$('CA', Clazz.newA$, [this.size (), '\0']);
for (var i = 0; i < newBuf.length; i++) {
newBuf[i] = String.fromCharCode (((hibyte & 0xff) << 8) | (this.buf[i] & 0xff));
}
return  String.instantialize(newBuf);
});

Clazz.newMethod$ (C$, 'toString$S', function (enc) {
return  String.instantialize(this.buf, 0, this.count, enc);
});

Clazz.newMethod$ (C$, 'write$BA$I$I', function (buffer, offset, len) {
if (this.buf == null) {
return;
}if (buffer != null) {
if (0 <= offset && offset <= buffer.length && 0 <= len && len <= buffer.length - offset) {
C$.prototype.expand$I.apply(this, [len]);
System.arraycopy (buffer, offset, this.buf, this.count, len);
this.count += len;
} else {
throw Clazz.$new(IndexOutOfBoundsException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K002f")]);
}} else {
throw Clazz.$new(NullPointerException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K0047")]);
}});

Clazz.newMethod$ (C$, 'write$I', function (oneByte) {
try {
this.buf[this.count] = oneByte;
this.count++;
} catch (e$$) {
if (Clazz.exceptionOf (e$$, IndexOutOfBoundsException)) {
var e = e$$;
{
C$.prototype.expand$I.apply(this, [1]);
this.buf[this.count++] = oneByte;
}
} else if (Clazz.exceptionOf (e$$, NullPointerException)) {
var e = e$$;
{
}
} else {
throw e$$;
}
}
});

Clazz.newMethod$ (C$, 'writeTo$java_io_OutputStream', function (out) {
out.write$BA$I$I (this.buf, 0, this.count);
});
})()
});

//Created 2017-08-12 07:32:13
