Clazz.load (["java.lang.AbstractStringBuilder", "$.Appendable"], "java.lang.StringBuffer", ["java.lang.Character", "$.Double", "$.Float", "$.Long"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang, "StringBuffer", AbstractStringBuilder, [Appendable, java.io.Serializable, CharSequence]);

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

Clazz.newMethod$ (C$, 'construct', function (string) {
C$.superClazz.construct$S.apply(this, [string]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$ (C$, 'construct', function (cs) {
if (cs == null) {
throw new NullPointerException();
}
Clazz.superConstructor(this, StringBuffer, [cs.toString()]);
}, 1);

Clazz.newMethod$ (C$, 'append', function (b) {
return this.append (b ? "true" : "false");
});

Clazz.newMethod$ (C$, 'append', function (ch) {
this.append0$char (ch);
return this;
});

Clazz.newMethod$ (C$, 'append', function (d) {
return this.append (Double.toString (d));
});

Clazz.newMethod$ (C$, 'append', function (obj) {
if (obj == null) {
this.appendNull ();
} else {
this.append0$S (obj.toString ());
}return this;
});

Clazz.newMethod$ (C$, 'append', function (string) {
this.append0$S (string);
return this;
});

Clazz.newMethod$ (C$, 'append', function (sb) {
if (sb == null) {
this.appendNull ();
} else {
{
this.append0$charA$I$I (sb.getValue (), 0, sb.length ());
}}return this;
});

Clazz.newMethod$ (C$, 'append', function (chars) {
this.append0$charA (chars);
return this;
});

Clazz.newMethod$ (C$, 'append', function (chars, start, length) {
this.append0$charA$I$I (chars, start, length);
return this;
});

Clazz.newMethod$ (C$, 'append', function (s) {
if (s == null) {
this.appendNull ();
} else {
this.append0$S (s.toString ());
}return this;
});

Clazz.newMethod$ (C$, 'append', function (s, start, end) {
this.append0$CharSequence$I$I (s, start, end);
return this;
});

Clazz.newMethod$ (C$, 'appendCodePoint', function (codePoint) {
return this.append (Character.toChars (codePoint));
});

Clazz.newMethod$ (C$, 'charAt', function (index) {
return C$.superClazz.prototype.charAt$I.apply(this, arguments);
});

Clazz.newMethod$ (C$, 'codePointAt', function (index) {
return C$.superClazz.prototype.codePointAt$I.apply(this, arguments);
});

Clazz.newMethod$ (C$, 'codePointBefore', function (index) {
return C$.superClazz.prototype.codePointBefore$I.apply(this, arguments);
});

Clazz.newMethod$ (C$, 'codePointCount', function (beginIndex, endIndex) {
return C$.superClazz.prototype.codePointCount$I$I.apply(this, arguments);
});

Clazz.newMethod$ (C$, 'delete', function (start, end) {
this.delete0$I$I (start, end);
return this;
});

Clazz.newMethod$ (C$, 'deleteCharAt', function (location) {
this.deleteCharAt0$I (location);
return this;
});

Clazz.newMethod$ (C$, 'ensureCapacity', function (min) {
C$.superClazz.prototype.ensureCapacity$I.apply(this, arguments);
});

Clazz.newMethod$ (C$, 'getChars', function (start, end, buffer, idx) {
C$.superClazz.prototype.getChars$I$I$charA$I.apply(this, arguments);
});

Clazz.newMethod$ (C$, 'indexOf', function (subString, start) {
return C$.superClazz.prototype.indexOf$S$I.apply(this, arguments);
});

Clazz.newMethod$ (C$, 'insert', function (index, ch) {
this.insert0$I$char (index, ch);
return this;
});

Clazz.newMethod$ (C$, 'insert', function (index, b) {
return this.insert (index, b ? "true" : "false");
});

Clazz.newMethod$ (C$, 'insert', function (index, i) {
return this.insert (index, Integer.toString (i));
});

Clazz.newMethod$ (C$, 'insert', function (index, l) {
return this.insert (index, Long.toString (l));
});

Clazz.newMethod$ (C$, 'insert', function (index, d) {
return this.insert (index, Double.toString (d));
});

Clazz.newMethod$ (C$, 'insert', function (index, f) {
return this.insert (index, Float.toString (f));
});

Clazz.newMethod$ (C$, 'insert', function (index, obj) {
return this.insert (index, obj == null ? "null" : obj.toString ());
});

Clazz.newMethod$ (C$, 'insert', function (index, string) {
this.insert0$I$S (index, string);
return this;
});

Clazz.newMethod$ (C$, 'insert', function (index, chars) {
this.insert0$I$charA (index, chars);
return this;
});

Clazz.newMethod$ (C$, 'insert', function (index, chars, start, length) {
this.insert0$I$charA$I$I (index, chars, start, length);
return this;
});

Clazz.newMethod$ (C$, 'insert', function (index, s) {
this.insert0$I$S (index, s == null ? "null" : s.toString ());
return this;
});

Clazz.newMethod$ (C$, 'insert', function (index, s, start, end) {
this.insert0$I$CharSequence$I$I (index, s, start, end);
return this;
});

Clazz.newMethod$ (C$, 'lastIndexOf', function (subString, start) {
return C$.superClazz.prototype.lastIndexOf$S$I.apply(this, arguments);
});

Clazz.newMethod$ (C$, 'offsetByCodePoints', function (index, codePointOffset) {
return C$.superClazz.prototype.offsetByCodePoints$I$I.apply(this, arguments);
});

Clazz.newMethod$ (C$, 'replace', function (start, end, string) {
this.replace0$I$I$S (start, end, string);
return this;
});

Clazz.newMethod$ (C$, 'reverse', function () {
this.reverse0 ();
return this;
});

Clazz.newMethod$ (C$, 'setCharAt', function (index, ch) {
C$.superClazz.prototype.setCharAt$I$char.apply(this, arguments);
});

Clazz.newMethod$ (C$, 'setLength', function (length) {
C$.superClazz.prototype.setLength$I.apply(this, arguments);
});

Clazz.newMethod$ (C$, 'subSequence', function (start, end) {
return C$.superClazz.prototype.substring$I$I.apply(this, arguments);
});

Clazz.newMethod$ (C$, 'substring', function (start) {
return C$.superClazz.prototype.substring$I.apply(this, arguments);
});

Clazz.newMethod$ (C$, 'substring', function (start, end) {
return C$.superClazz.prototype.substring$I$I.apply(this, arguments);
});

Clazz.newMethod$ (C$, 'toString', function () {
return C$.superClazz.prototype.toString.apply(this, arguments);
});

Clazz.newMethod$ (C$, 'trimToSize', function () {
C$.superClazz.prototype.trimToSize.apply(this, arguments);
});

Clazz.newMethod$ (C$, 'writeObject', function (out) {
var fields = out.putFields ();
fields.put$S$I ("count", this.length ());
fields.put$S$b ("shared", false);
fields.put$S$O ("value", this.getValue ());
out.writeFields ();
});

Clazz.newMethod$ (C$, 'readObject', function ($in) {
var fields = $in.readFields ();
var count = fields.get$S$I ("count", 0);
var value = fields.get$S$O ("value", null);
this.set$charA$I (value, count);
});
})()
});

//Created 2017-08-08 06:13:43
