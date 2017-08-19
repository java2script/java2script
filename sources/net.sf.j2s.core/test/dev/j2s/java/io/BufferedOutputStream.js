Clazz.load (["java.io.FilterOutputStream"], "java.io.BufferedOutputStream", ["java.lang.ArrayIndexOutOfBoundsException", "$.IllegalArgumentException", "$.NullPointerException", "org.apache.harmony.luni.util.Msg"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.io, "BufferedOutputStream", java.io.FilterOutputStream);

Clazz.newMethod$(C$, '$init$', function () {
this.buf = null;
this.count = 0;
}, 1);

Clazz.newMethod$(C$, 'construct$java_io_OutputStream', function (out) {
C$.superClazz.construct$java_io_OutputStream.apply(this, [out]);
C$.$init$.apply(this);
this.buf =  Clazz.newArray$(Byte.TYPE, [8192]);
}, 1);

Clazz.newMethod$(C$, 'construct$java_io_OutputStream$I', function (out, size) {
C$.superClazz.construct$java_io_OutputStream.apply(this, [out]);
C$.$init$.apply(this);
if (size <= 0) {
throw Clazz.$new(IllegalArgumentException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K0058")]);
}this.buf =  Clazz.newArray$(Byte.TYPE, [size]);
}, 1);

Clazz.newMethod$(C$, 'flush', function () {
if (this.count > 0) {
this.out.write$BA$I$I (this.buf, 0, this.count);
}this.count = 0;
this.out.flush ();
});

Clazz.newMethod$(C$, 'write$BA$I$I', function (buffer, offset, length) {
if (buffer == null) {
throw Clazz.$new(NullPointerException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K0047")]);
}if (offset < 0 || offset > buffer.length - length || length < 0) {
throw Clazz.$new(ArrayIndexOutOfBoundsException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K002f")]);
}if (this.count == 0 && length >= this.buf.length) {
this.out.write$BA$I$I (buffer, offset, length);
return;
}var available = this.buf.length - this.count;
if (length < available) {
available = length;
}if (available > 0) {
System.arraycopy$O$I$O$I$I (buffer, offset, this.buf, this.count, available);
this.count += available;
}if (this.count == this.buf.length) {
this.out.write$BA$I$I (this.buf, 0, this.buf.length);
this.count = 0;
if (length > available) {
offset += available;
available = length - available;
if (available >= this.buf.length) {
this.out.write$BA$I$I (buffer, offset, available);
} else {
System.arraycopy$O$I$O$I$I (buffer, offset, this.buf, this.count, available);
this.count += available;
}}}});

Clazz.newMethod$(C$, 'write$I', function (oneByte) {
if (this.count == this.buf.length) {
this.out.write$BA$I$I (this.buf, 0, this.count);
this.count = 0;
}this.buf[this.count++] = oneByte;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
});

//Created 2017-08-18 22:17:56
