Clazz.load (["java.lang.AbstractStringBuilder", "$.Appendable"], "java.lang.StringBuilder", ["java.lang.Double", "$.Float", "$.Long"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang, "StringBuilder", AbstractStringBuilder, [Appendable, CharSequence, java.io.Serializable]);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$ (C$, 'construct', function () {
C$.superClazz.construct.apply(this);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'construct', function (capacity) {
C$.superClazz.construct$I.apply(this, [capacity]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'construct', function (seq) {
C$.superClazz.construct$S.apply(this, [seq.toString ()]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'construct', function (str) {
C$.superClazz.construct$S.apply(this, [str]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'append', function (b) {
this.append0$S (b ? "true" : "false");
return this;
});

Clazz.newMethod$ (C$, 'append', function (c) {
this.append0$char (c);
return this;
});

Clazz.newMethod$ (C$, 'append', function (i) {
this.append0$S (Integer.toString (i));
return this;
});

Clazz.newMethod$ (C$, 'append', function (lng) {
this.append0$S (Long.toString (lng));
return this;
});

Clazz.newMethod$ (C$, 'append', function (f) {
this.append0$S (Float.toString (f));
return this;
});

Clazz.newMethod$ (C$, 'append', function (d) {
this.append0$S (Double.toString (d));
return this;
});

Clazz.newMethod$ (C$, 'append', function (obj) {
if (obj == null) {
this.appendNull ();
} else {
this.append0$S (obj.toString ());
}return this;
});

Clazz.newMethod$ (C$, 'append', function (str) {
this.append0$S (str);
return this;
});

Clazz.newMethod$ (C$, 'append', function (sb) {
if (sb == null) {
this.appendNull ();
} else {
this.append0$charA$I$I (sb.getValue (), 0, sb.length ());
}return this;
});

Clazz.newMethod$ (C$, 'append', function (ch) {
this.append0$charA (ch);
return this;
});

Clazz.newMethod$ (C$, 'append', function (str, offset, len) {
this.append0$charA$I$I (str, offset, len);
return this;
});

Clazz.newMethod$ (C$, 'append', function (csq) {
if (csq == null) {
this.appendNull ();
} else {
this.append0$S (csq.toString ());
}return this;
});

Clazz.newMethod$ (C$, 'append', function (csq, start, end) {
this.append0$CharSequence$I$I (csq, start, end);
return this;
});

Clazz.newMethod$ (C$, 'delete', function (start, end) {
this.delete0$I$I (start, end);
return this;
});

Clazz.newMethod$ (C$, 'deleteCharAt', function (index) {
this.deleteCharAt0$I (index);
return this;
});

Clazz.newMethod$ (C$, 'insert', function (offset, b) {
this.insert0$I$S (offset, b ? "true" : "false");
return this;
});

Clazz.newMethod$ (C$, 'insert', function (offset, c) {
this.insert0$I$char (offset, c);
return this;
});

Clazz.newMethod$ (C$, 'insert', function (offset, i) {
this.insert0$I$S (offset, Integer.toString (i));
return this;
});

Clazz.newMethod$ (C$, 'insert', function (offset, l) {
this.insert0$I$S (offset, Long.toString (l));
return this;
});

Clazz.newMethod$ (C$, 'insert', function (offset, f) {
this.insert0$I$S (offset, Float.toString (f));
return this;
});

Clazz.newMethod$ (C$, 'insert', function (offset, d) {
this.insert0$I$S (offset, Double.toString (d));
return this;
});

Clazz.newMethod$ (C$, 'insert', function (offset, obj) {
this.insert0$I$S (offset, obj == null ? "null" : obj.toString ());
return this;
});

Clazz.newMethod$ (C$, 'insert', function (offset, str) {
this.insert0$I$S (offset, str);
return this;
});

Clazz.newMethod$ (C$, 'insert', function (offset, ch) {
this.insert0$I$charA (offset, ch);
return this;
});

Clazz.newMethod$ (C$, 'insert', function (offset, str, strOffset, strLen) {
this.insert0$I$charA$I$I (offset, str, strOffset, strLen);
return this;
});

Clazz.newMethod$ (C$, 'insert', function (offset, s) {
this.insert0$I$S (offset, s == null ? "null" : s.toString ());
return this;
});

Clazz.newMethod$ (C$, 'insert', function (offset, s, start, end) {
this.insert0$I$CharSequence$I$I (offset, s, start, end);
return this;
});

Clazz.newMethod$ (C$, 'replace', function (start, end, str) {
this.replace0$I$I$S (start, end, str);
return this;
});

Clazz.newMethod$ (C$, 'reverse', function () {
this.reverse0 ();
return this;
});

Clazz.newMethod$ (C$, 'toString', function () {
return C$.superClazz.prototype.toString.apply(this, arguments);
});

Clazz.newMethod$ (C$, 'readObject', function ($in) {
$in.defaultReadObject ();
var count = $in.readInt ();
var value = $in.readObject ();
this.set$charA$I (value, count);
});

Clazz.newMethod$ (C$, 'writeObject', function (out) {
out.defaultWriteObject ();
out.writeInt$I (this.length ());
out.writeObject$O (this.getValue ());
});
})()
});

//Created 2017-08-08 06:13:44
