Clazz.load (["java.io.Closeable", "$.Flushable"], "java.io.OutputStream", ["java.lang.IndexOutOfBoundsException", "org.apache.harmony.luni.util.Msg"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.io, "OutputStream", null, [java.io.Closeable, java.io.Flushable]);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'construct', function () {
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'close', function () {
});

Clazz.newMethod$ (C$, 'flush', function () {
});

Clazz.newMethod$ (C$, 'write$BA', function (buffer) {
this.write$BA$I$I (buffer, 0, buffer.length);
});

Clazz.newMethod$ (C$, 'write$BA$I$I', function (buffer, offset, count) {
if (offset <= buffer.length && 0 <= offset && 0 <= count && count <= buffer.length - offset) {
for (var i = offset; i < offset + count; i++) this.write$I (buffer[i]);

} else throw Clazz.$new(IndexOutOfBoundsException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K002f")]);
});
})()
});

//Created 2017-08-12 07:32:14
