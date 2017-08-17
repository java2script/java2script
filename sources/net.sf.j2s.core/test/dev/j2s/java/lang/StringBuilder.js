Clazz.load (["java.lang.AbstractStringBuilder", "$.Appendable"], "java.lang.StringBuilder", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang, "StringBuilder", AbstractStringBuilder, [Appendable, CharSequence, java.io.Serializable]);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'construct', function () {
C$.superClazz.construct.apply(this, []);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'construct$I', function (capacity) {
C$.superClazz.construct$I.apply(this, [capacity]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'construct$CharSequence', function (seq) {
C$.superClazz.construct$S.apply(this, [seq.toString ()]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'construct$S', function (str) {
C$.superClazz.construct$S.apply(this, [str]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'append$Z', function (b) {
this.append0$S (b ? "true" : "false");
return this;
});

Clazz.newMethod$(C$, 'append$C', function (c) {
this.append0$C (c);
return this;
});

Clazz.newMethod$(C$, 'append$I', function (i) {
this.append0$S (Integer.toString (i));
return this;
});

Clazz.newMethod$(C$, 'append$J', function (lng) {
this.append0$S (Long.toString (lng));
return this;
});

Clazz.newMethod$(C$, 'append$F', function (f) {
this.append0$S (Float.toString (f));
return this;
});

Clazz.newMethod$(C$, 'append$D', function (d) {
this.append0$S (Double.toString (d));
return this;
});

Clazz.newMethod$(C$, 'append$O', function (obj) {
if (obj == null) {
this.appendNull ();
} else {
this.append0$S (obj.toString ());
}return this;
});

Clazz.newMethod$(C$, 'append$S', function (str) {
this.append0$S (str);
return this;
});

Clazz.newMethod$(C$, 'append$StringBuffer', function (sb) {
if (sb == null) {
this.appendNull ();
} else {
this.append0$CA$I$I (sb.getValue (), 0, sb.length ());
}return this;
});

Clazz.newMethod$(C$, 'append$CA', function (ch) {
this.append0$CA (ch);
return this;
});

Clazz.newMethod$(C$, 'append$CA$I$I', function (str, offset, len) {
this.append0$CA$I$I (str, offset, len);
return this;
});

Clazz.newMethod$(C$, 'append$CharSequence', function (csq) {
if (csq == null) {
this.appendNull ();
} else {
this.append0$S (csq.toString ());
}return this;
});

Clazz.newMethod$(C$, 'append$CharSequence$I$I', function (csq, start, end) {
this.append0$CharSequence$I$I (csq, start, end);
return this;
});

Clazz.newMethod$(C$, '$delete$I$I', function (start, end) {
this.delete0$I$I (start, end);
return this;
});

Clazz.newMethod$(C$, 'deleteCharAt$I', function (index) {
this.deleteCharAt0$I (index);
return this;
});

Clazz.newMethod$(C$, 'insert$I$Z', function (offset, b) {
this.insert0$I$S (offset, b ? "true" : "false");
return this;
});

Clazz.newMethod$(C$, 'insert$I$C', function (offset, c) {
this.insert0$I$C (offset, c);
return this;
});

Clazz.newMethod$(C$, 'insert$I$I', function (offset, i) {
this.insert0$I$S (offset, Integer.toString (i));
return this;
});

Clazz.newMethod$(C$, 'insert$I$J', function (offset, l) {
this.insert0$I$S (offset, Long.toString (l));
return this;
});

Clazz.newMethod$(C$, 'insert$I$F', function (offset, f) {
this.insert0$I$S (offset, Float.toString (f));
return this;
});

Clazz.newMethod$(C$, 'insert$I$D', function (offset, d) {
this.insert0$I$S (offset, Double.toString (d));
return this;
});

Clazz.newMethod$(C$, 'insert$I$O', function (offset, obj) {
this.insert0$I$S (offset, obj == null ? "null" : obj.toString ());
return this;
});

Clazz.newMethod$(C$, 'insert$I$S', function (offset, str) {
this.insert0$I$S (offset, str);
return this;
});

Clazz.newMethod$(C$, 'insert$I$CA', function (offset, ch) {
this.insert0$I$CA (offset, ch);
return this;
});

Clazz.newMethod$(C$, 'insert$I$CA$I$I', function (offset, str, strOffset, strLen) {
this.insert0$I$CA$I$I (offset, str, strOffset, strLen);
return this;
});

Clazz.newMethod$(C$, 'insert$I$CharSequence', function (offset, s) {
this.insert0$I$S (offset, s == null ? "null" : s.toString ());
return this;
});

Clazz.newMethod$(C$, 'insert$I$CharSequence$I$I', function (offset, s, start, end) {
this.insert0$I$CharSequence$I$I (offset, s, start, end);
return this;
});

Clazz.newMethod$(C$, 'replace$I$I$S', function (start, end, str) {
this.replace0$I$I$S (start, end, str);
return this;
});

Clazz.newMethod$(C$, 'reverse', function () {
this.reverse0 ();
return this;
});

Clazz.newMethod$(C$, 'toString', function () {
return C$.superClazz.prototype.toString.apply(this, arguments);
});

Clazz.newMethod$(C$, 'readObject$java_io_ObjectInputStream', function ($in) {
$in.defaultReadObject ();
var count = $in.readInt ();
var value = $in.readObject ();
this.set$CA$I (value, count);
});

Clazz.newMethod$(C$, 'writeObject$java_io_ObjectOutputStream', function (out) {
out.defaultWriteObject ();
out.writeInt$I (this.length ());
out.writeObject$O (this.getValue ());
});
})()
});

//Created 2017-08-17 10:33:14
