Clazz.load (["java.lang.AbstractStringBuilder", "$.Appendable"], "java.lang.StringBuffer", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang, "StringBuffer", AbstractStringBuilder, [Appendable, java.io.Serializable, CharSequence]);

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

Clazz.newMethod$(C$, 'construct$S', function (string) {
C$.superClazz.construct$S.apply(this, [string]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'construct$CharSequence', function (cs) {
C$.superClazz.construct$S.apply(this, [cs == null ? null : cs.toString ()]);
C$.$init$.apply(this);
}, 1);

Clazz.newMethod$(C$, 'append$Z', function (b) {
return this.append$S (b ? "true" : "false");
});

Clazz.newMethod$(C$, 'append$C', function (ch) {
this.append0$C (ch);
return this;
});

Clazz.newMethod$(C$, 'append$D', function (d) {
return this.append$S (Double.toString (d));
});

Clazz.newMethod$(C$, 'append$O', function (obj) {
if (obj == null) {
this.appendNull ();
} else {
this.append0$S (obj.toString ());
}return this;
});

Clazz.newMethod$(C$, 'append$S', function (string) {
this.append0$S (string);
return this;
});

Clazz.newMethod$(C$, 'append$StringBuffer', function (sb) {
if (sb == null) {
this.appendNull ();
} else {
{
this.append0$CA$I$I (sb.getValue (), 0, sb.length ());
}}return this;
});

Clazz.newMethod$(C$, 'append$CA', function (chars) {
this.append0$CA (chars);
return this;
});

Clazz.newMethod$(C$, 'append$CA$I$I', function (chars, start, length) {
this.append0$CA$I$I (chars, start, length);
return this;
});

Clazz.newMethod$(C$, 'append$CharSequence', function (s) {
if (s == null) {
this.appendNull ();
} else {
this.append0$S (s.toString ());
}return this;
});

Clazz.newMethod$(C$, 'append$CharSequence$I$I', function (s, start, end) {
this.append0$CharSequence$I$I (s, start, end);
return this;
});

Clazz.newMethod$(C$, 'appendCodePoint$I', function (codePoint) {
return this.append$CA (Character.toChars (codePoint));
});

Clazz.newMethod$(C$, 'charAt$I', function (index) {
return C$.superClazz.prototype.charAt$I.apply(this, arguments);
});

Clazz.newMethod$(C$, 'codePointAt$I', function (index) {
return C$.superClazz.prototype.codePointAt$I.apply(this, arguments);
});

Clazz.newMethod$(C$, 'codePointBefore$I', function (index) {
return C$.superClazz.prototype.codePointBefore$I.apply(this, arguments);
});

Clazz.newMethod$(C$, 'codePointCount$I$I', function (beginIndex, endIndex) {
return C$.superClazz.prototype.codePointCount$I$I.apply(this, arguments);
});

Clazz.newMethod$(C$, '$delete$I$I', function (start, end) {
this.delete0$I$I (start, end);
return this;
});

Clazz.newMethod$(C$, 'deleteCharAt$I', function (location) {
this.deleteCharAt0$I (location);
return this;
});

Clazz.newMethod$(C$, 'ensureCapacity$I', function (min) {
C$.superClazz.prototype.ensureCapacity$I.apply(this, arguments);
});

Clazz.newMethod$(C$, 'getChars$I$I$CA$I', function (start, end, buffer, idx) {
C$.superClazz.prototype.getChars$I$I$CA$I.apply(this, arguments);
});

Clazz.newMethod$(C$, 'indexOf$S$I', function (subString, start) {
return C$.superClazz.prototype.indexOf$S$I.apply(this, arguments);
});

Clazz.newMethod$(C$, 'insert$I$C', function (index, ch) {
this.insert0$I$C (index, ch);
return this;
});

Clazz.newMethod$(C$, 'insert$I$Z', function (index, b) {
return this.insert$I$S (index, b ? "true" : "false");
});

Clazz.newMethod$(C$, 'insert$I$I', function (index, i) {
return this.insert$I$S (index, Integer.toString (i));
});

Clazz.newMethod$(C$, 'insert$I$J', function (index, l) {
return this.insert$I$S (index, Long.toString (l));
});

Clazz.newMethod$(C$, 'insert$I$D', function (index, d) {
return this.insert$I$S (index, Double.toString (d));
});

Clazz.newMethod$(C$, 'insert$I$F', function (index, f) {
return this.insert$I$S (index, Float.toString (f));
});

Clazz.newMethod$(C$, 'insert$I$O', function (index, obj) {
return this.insert$I$S (index, obj == null ? "null" : obj.toString ());
});

Clazz.newMethod$(C$, 'insert$I$S', function (index, string) {
this.insert0$I$S (index, string);
return this;
});

Clazz.newMethod$(C$, 'insert$I$CA', function (index, chars) {
this.insert0$I$CA (index, chars);
return this;
});

Clazz.newMethod$(C$, 'insert$I$CA$I$I', function (index, chars, start, length) {
this.insert0$I$CA$I$I (index, chars, start, length);
return this;
});

Clazz.newMethod$(C$, 'insert$I$CharSequence', function (index, s) {
this.insert0$I$S (index, s == null ? "null" : s.toString ());
return this;
});

Clazz.newMethod$(C$, 'insert$I$CharSequence$I$I', function (index, s, start, end) {
this.insert0$I$CharSequence$I$I (index, s, start, end);
return this;
});

Clazz.newMethod$(C$, 'lastIndexOf$S$I', function (subString, start) {
return C$.superClazz.prototype.lastIndexOf$S$I.apply(this, arguments);
});

Clazz.newMethod$(C$, 'offsetByCodePoints$I$I', function (index, codePointOffset) {
return C$.superClazz.prototype.offsetByCodePoints$I$I.apply(this, arguments);
});

Clazz.newMethod$(C$, 'replace$I$I$S', function (start, end, string) {
this.replace0$I$I$S (start, end, string);
return this;
});

Clazz.newMethod$(C$, 'reverse', function () {
this.reverse0 ();
return this;
});

Clazz.newMethod$(C$, 'setCharAt$I$C', function (index, ch) {
C$.superClazz.prototype.setCharAt$I$C.apply(this, arguments);
});

Clazz.newMethod$(C$, 'setLength$I', function (length) {
C$.superClazz.prototype.setLength$I.apply(this, arguments);
});

Clazz.newMethod$(C$, 'subSequence$I$I', function (start, end) {
return C$.superClazz.prototype.substring$I$I.apply(this, arguments);
});

Clazz.newMethod$(C$, 'substring$I', function (start) {
return C$.superClazz.prototype.substring$I.apply(this, arguments);
});

Clazz.newMethod$(C$, 'substring$I$I', function (start, end) {
return C$.superClazz.prototype.substring$I$I.apply(this, arguments);
});

Clazz.newMethod$(C$, 'toString', function () {
return C$.superClazz.prototype.toString.apply(this, arguments);
});

Clazz.newMethod$(C$, 'trimToSize', function () {
C$.superClazz.prototype.trimToSize.apply(this, arguments);
});

Clazz.newMethod$(C$, 'writeObject$java_io_ObjectOutputStream', function (out) {
var fields = out.putFields ();
fields.put$S$I ("count", this.length ());
fields.put$S$Z ("shared", false);
fields.put$S$O ("value", this.getValue ());
out.writeFields ();
});

Clazz.newMethod$(C$, 'readObject$java_io_ObjectInputStream', function ($in) {
var fields = $in.readFields ();
var count = fields.get$S$I ("count", 0);
var value = fields.get$S$O ("value", null);
this.set$CA$I (value, count);
});
})()
});

//Created 2017-08-17 10:33:14
