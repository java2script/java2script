Clazz.load (["java.io.OutputStream"], "java.io.FilterOutputStream", ["java.lang.ArrayIndexOutOfBoundsException", "org.apache.harmony.luni.util.Msg"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.io, "FilterOutputStream", java.io.OutputStream);

Clazz.newMethod$(C$, '$init$', function () {
this.out = null;
}, 1);

Clazz.newMethod$(C$, 'construct$java_io_OutputStream', function (out) {
Clazz.super$(C$, this);
C$.$init$.apply(this);
this.out = out;
}, 1);

Clazz.newMethod$(C$, 'close', function () {
try {
this.flush ();
} catch (e) {
if (Clazz.exceptionOf(e, java.io.IOException)){
} else {
throw e;
}
}
this.out.close ();
});

Clazz.newMethod$(C$, 'flush', function () {
this.out.flush ();
});

Clazz.newMethod$(C$, 'write$BA', function (buffer) {
this.write$BA$I$I (buffer, 0, buffer.length);
});

Clazz.newMethod$(C$, 'write$BA$I$I', function (buffer, offset, count) {
if (offset <= buffer.length && 0 <= offset && 0 <= count && count <= buffer.length - offset) {
for (var i = 0; i < count; i++) {
this.write$I (buffer[offset + i]);
}
} else {
throw Clazz.$new(ArrayIndexOutOfBoundsException.construct$S,[org.apache.harmony.luni.util.Msg.getString$S ("K002f")]);
}});

Clazz.newMethod$(C$, 'write$I', function (oneByte) {
this.out.write$I (oneByte);
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
});

//Created 2017-08-18 22:17:57
