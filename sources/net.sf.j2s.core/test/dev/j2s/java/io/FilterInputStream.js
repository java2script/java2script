Clazz.load (["java.io.InputStream"], "java.io.FilterInputStream", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.io, "FilterInputStream", java.io.InputStream);

Clazz.newMethod$(C$, '$init$', function () {
this.$in = null;
}, 1);

Clazz.newMethod$(C$, 'construct$java_io_InputStream', function ($in) {
C$.superClazz.construct.apply(this, []);
C$.$init$.apply(this);
this.$in = $in;
}, 1);

Clazz.newMethod$(C$, 'available', function () {
return this.$in.available ();
});

Clazz.newMethod$(C$, 'close', function () {
this.$in.close ();
});

Clazz.newMethod$(C$, 'mark$I', function (readlimit) {
this.$in.mark$I (readlimit);
});

Clazz.newMethod$(C$, 'markSupported', function () {
return this.$in.markSupported ();
});

Clazz.newMethod$(C$, 'read', function () {
return this.$in.read ();
});

Clazz.newMethod$(C$, 'read$BA', function (buffer) {
return this.read$BA$I$I (buffer, 0, buffer.length);
});

Clazz.newMethod$(C$, 'read$BA$I$I', function (buffer, offset, count) {
return this.$in.read$BA$I$I (buffer, offset, count);
});

Clazz.newMethod$(C$, 'reset', function () {
this.$in.reset ();
});

Clazz.newMethod$(C$, 'skip$J', function (count) {
return this.$in.skip$J (count);
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
});

//Created 2017-08-17 10:33:12
