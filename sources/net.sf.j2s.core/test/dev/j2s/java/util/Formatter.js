Clazz.declarePackage ("java.util");
Clazz.load (["java.io.Flushable", "java.util.regex.Pattern"], "java.util.Formatter", ["java.io.Closeable", "$.UnsupportedEncodingException", "java.lang.Boolean", "$.Byte", "$.Character", "$.Double", "$.Float", "$.Long", "$.Short", "$.StringBuilder", "java.util.ArrayList", "$.Date", "JU.Rdr", "java.text.DateFormatSymbols", "$.DecimalFormatSymbols", "$.NumberFormat", "java.util.Calendar", "$.DuplicateFormatFlagsException", "$.FormatFlagsConversionMismatchException", "$.Formattable", "$.FormatterClosedException", "$.IllegalFormatCodePointException", "$.IllegalFormatConversionException", "$.IllegalFormatFlagsException", "$.IllegalFormatPrecisionException", "$.IllegalFormatWidthException", "$.Locale", "$.MissingFormatArgumentException", "$.MissingFormatWidthException", "$.UnknownFormatConversionException", "$.UnknownFormatFlagsException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.a = null;
this.l = null;
this.lastException = null;
this.zero = '0';
if (!Clazz.isClassDefined ("java.util.Formatter.FixedString")) {
java.util.Formatter.$Formatter$FixedString$ ();
}
if (!Clazz.isClassDefined ("java.util.Formatter.FormatSpecifier")) {
java.util.Formatter.$Formatter$FormatSpecifier$ ();
}
if (!Clazz.isClassDefined ("java.util.Formatter.FormattedFloatingDecimal")) {
java.util.Formatter.$Formatter$FormattedFloatingDecimal$ ();
}
Clazz.instantialize (this, arguments);
}, java.util, "Formatter", null, java.io.Flushable);
Clazz.defineMethod (c$, "init", 
 function (a, l) {
this.a = a;
this.l = l;
this.setZero ();
}, "Appendable,java.util.Locale");
Clazz.makeConstructor (c$, 
function () {
this.init ( new StringBuilder (), java.util.Locale.getDefault ());
});
Clazz.makeConstructor (c$, 
function (a) {
if (a == null) a =  new StringBuilder ();
this.init (a, java.util.Locale.getDefault ());
}, "Appendable");
Clazz.makeConstructor (c$, 
function (l) {
this.init ( new StringBuilder (), l);
}, "java.util.Locale");
Clazz.makeConstructor (c$, 
function (a, l) {
if (a == null) a =  new StringBuilder ();
this.init (a, l);
}, "Appendable,java.util.Locale");
Clazz.makeConstructor (c$, 
function (os) {
this.init (JU.Rdr.getBufferedWriter (os, null), java.util.Locale.getDefault ());
}, "java.io.OutputStream");
Clazz.makeConstructor (c$, 
function (os, csn) {
this.construct (os, csn, java.util.Locale.getDefault ());
}, "java.io.OutputStream,~S");
Clazz.makeConstructor (c$, 
function (os, csn, l) {
this.init (JU.Rdr.getBufferedWriter (os, csn), l);
}, "java.io.OutputStream,~S,java.util.Locale");
Clazz.defineMethod (c$, "setZero", 
 function () {
if ((this.l != null) && !this.l.equals (java.util.Locale.US)) {
var dfs = java.text.DecimalFormatSymbols.getInstance (this.l);
this.zero = dfs.getZeroDigit ();
}});
Clazz.defineMethod (c$, "locale", 
function () {
this.ensureOpen ();
return this.l;
});
Clazz.defineMethod (c$, "out", 
function () {
this.ensureOpen ();
return this.a;
});
Clazz.defineMethod (c$, "toString", 
function () {
this.ensureOpen ();
return this.a.toString ();
});
Clazz.defineMethod (c$, "flush", 
function () {
this.ensureOpen ();
if (Clazz.instanceOf (this.a, java.io.Flushable)) {
try {
(this.a).flush ();
} catch (ioe) {
if (Clazz.exceptionOf (ioe, java.io.IOException)) {
this.lastException = ioe;
} else {
throw ioe;
}
}
}});
Clazz.defineMethod (c$, "close", 
function () {
if (this.a == null) return;
try {
if (Clazz.instanceOf (this.a, java.io.Closeable)) (this.a).close ();
} catch (ioe) {
if (Clazz.exceptionOf (ioe, java.io.IOException)) {
this.lastException = ioe;
} else {
throw ioe;
}
} finally {
this.a = null;
}
});
Clazz.defineMethod (c$, "ensureOpen", 
 function () {
if (this.a == null) throw  new java.util.FormatterClosedException ();
});
Clazz.defineMethod (c$, "ioException", 
function () {
return this.lastException;
});
Clazz.defineMethod (c$, "format", 
function (format, args) {
return this.format (this.l, format, args);
}, "~S,~A");
Clazz.defineMethod (c$, "format", 
function (l, format, args) {
this.ensureOpen ();
var last = -1;
var lasto = -1;
var fsa = this.parse (format);
for (var i = 0; i < fsa.length; i++) {
var fs = fsa[i];
var index = fs.index ();
try {
switch (index) {
case -2:
fs.printOL (null, l);
break;
case -1:
if (last < 0 || (args != null && last > args.length - 1)) throw  new java.util.MissingFormatArgumentException (fs.toString ());
fs.printOL ((args == null ? null : args[last]), l);
break;
case 0:
lasto++;
last = lasto;
if (args != null && lasto > args.length - 1) throw  new java.util.MissingFormatArgumentException (fs.toString ());
fs.printOL ((args == null ? null : args[lasto]), l);
break;
default:
last = index - 1;
if (args != null && last > args.length - 1) throw  new java.util.MissingFormatArgumentException (fs.toString ());
fs.printOL ((args == null ? null : args[last]), l);
break;
}
} catch (x) {
if (Clazz.exceptionOf (x, java.io.IOException)) {
this.lastException = x;
} else {
throw x;
}
}
}
return this;
}, "java.util.Locale,~S,~A");
Clazz.defineMethod (c$, "parse", 
 function (s) {
var al =  new java.util.ArrayList ();
var m = java.util.Formatter.fsPattern.matcher (s);
var i = 0;
while (i < s.length) {
var have = false;
{
have = m.findFrom(i);
}if (have) {
if (m.start () != i) {
this.checkText (s.substring (i, m.start ()));
al.add (Clazz.innerTypeInstance (java.util.Formatter.FixedString, this, null, s.substring (i, m.start ())));
}var n = m.groupCount () - 1;
var sa =  new Array (n);
for (var j = 0; j < n; j++) {
sa[j] = m.group (j + 1);
}
al.add (Clazz.innerTypeInstance (java.util.Formatter.FormatSpecifier, this, null, this, sa));
i = m.end ();
} else {
this.checkText (s.substring (i));
al.add (Clazz.innerTypeInstance (java.util.Formatter.FixedString, this, null, s.substring (i)));
break;
}}
return al.toArray ( new Array (0));
}, "~S");
Clazz.defineMethod (c$, "checkText", 
 function (s) {
var idx;
if ((idx = s.indexOf ('%')) != -1) {
var c = (idx > s.length - 2 ? '%' : s.charAt (idx + 1));
throw  new java.util.UnknownFormatConversionException (String.valueOf (c));
}}, "~S");
c$.$Formatter$FixedString$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.s = null;
Clazz.instantialize (this, arguments);
}, java.util.Formatter, "FixedString", null, java.util.Formatter.FormatString);
Clazz.makeConstructor (c$, 
function (a) {
this.s = a;
}, "~S");
Clazz.overrideMethod (c$, "index", 
function () {
return -2;
});
Clazz.overrideMethod (c$, "printOL", 
function (a, b) {
this.b$["java.util.Formatter"].a.append (this.s);
}, "~O,java.util.Locale");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.s;
});
c$ = Clazz.p0p ();
};
c$.$Formatter$FormatSpecifier$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.$index = -1;
this.f = null;
this.$width = 0;
this.$precision = 0;
this.dt = false;
this.c = '\0';
this.formatter = null;
this.ls = null;
Clazz.instantialize (this, arguments);
}, java.util.Formatter, "FormatSpecifier", null, java.util.Formatter.FormatString);
Clazz.prepareFields (c$, function () {
this.f = java.util.Formatter.Flags.NONE;
});
Clazz.defineMethod (c$, "index", 
 function (a) {
if (a != null) {
try {
this.$index = Integer.parseInt (a.substring (0, a.length - 1));
} catch (x) {
if (Clazz.exceptionOf (x, NumberFormatException)) {
} else {
throw x;
}
}
} else {
this.$index = 0;
}return this.$index;
}, "~S");
Clazz.defineMethod (c$, "index", 
function () {
return this.$index;
});
Clazz.defineMethod (c$, "flags", 
 function (a) {
this.f = java.util.Formatter.Flags.parse (a);
if (this.f.contains (java.util.Formatter.Flags.PREVIOUS)) this.$index = -1;
return this.f;
}, "~S");
Clazz.defineMethod (c$, "width", 
 function (a) {
this.$width = -1;
if (a != null) {
try {
this.$width = Integer.parseInt (a);
if (this.$width < 0) throw  new java.util.IllegalFormatWidthException (this.$width);
} catch (x) {
if (Clazz.exceptionOf (x, NumberFormatException)) {
} else {
throw x;
}
}
}return this.$width;
}, "~S");
Clazz.defineMethod (c$, "precision", 
 function (a) {
this.$precision = -1;
if (a != null) {
try {
this.$precision = Integer.parseInt (a.substring (1));
if (this.$precision < 0) throw  new java.util.IllegalFormatPrecisionException (this.$precision);
} catch (x) {
if (Clazz.exceptionOf (x, NumberFormatException)) {
} else {
throw x;
}
}
}return this.$precision;
}, "~S");
Clazz.defineMethod (c$, "conversion", 
 function (a) {
this.c = a.charAt (0);
if (!this.dt) {
if (!java.util.Formatter.Conversion.isValid (this.c)) throw  new java.util.UnknownFormatConversionException (String.valueOf (this.c));
if (Character.isUpperCase (this.c)) this.f.add (java.util.Formatter.Flags.UPPERCASE);
this.c = Character.toLowerCase (this.c);
if (java.util.Formatter.Conversion.isText (this.c)) this.$index = -2;
}return this.c;
}, "~S");
Clazz.makeConstructor (c$, 
function (a, b) {
this.formatter = a;
this.index (b[0]);
this.flags (b[1]);
this.width (b[2]);
this.precision (b[3]);
if (b[4] != null) {
this.dt = true;
if (b[4].equals ("T")) this.f.add (java.util.Formatter.Flags.UPPERCASE);
}this.conversion (b[5]);
if (this.dt) this.checkDateTime ();
 else if (java.util.Formatter.Conversion.isGeneral (this.c)) this.checkGeneral ();
 else if (java.util.Formatter.Conversion.isCharacter (this.c)) this.checkCharacter ();
 else if (java.util.Formatter.Conversion.isInteger (this.c)) this.checkInteger ();
 else if (java.util.Formatter.Conversion.isFloat (this.c)) this.checkFloat ();
 else if (java.util.Formatter.Conversion.isText (this.c)) this.checkText ();
 else throw  new java.util.UnknownFormatConversionException (String.valueOf (this.c));
}, "java.util.Formatter,~A");
Clazz.overrideMethod (c$, "printOL", 
function (a, b) {
if (this.dt) {
this.printDateTime (a, b);
return;
}switch (this.c) {
case 'd':
case 'o':
case 'x':
this.printInteger (a, b);
break;
case 'e':
case 'g':
case 'f':
case 'a':
this.printFloat (a, b);
break;
case 'c':
case 'C':
this.printCharacter (a);
break;
case 'b':
this.printBoolean (a);
break;
case 's':
this.printString (a, b);
break;
case 'h':
this.printHashCode (a);
break;
case 'n':
if (this.ls == null) this.ls = System.getProperty ("line.separator");
this.b$["java.util.Formatter"].a.append (this.ls);
break;
case '%':
this.b$["java.util.Formatter"].a.append ("%");
break;
default:
}
}, "~O,java.util.Locale");
Clazz.defineMethod (c$, "printInteger", 
 function (a, b) {
if (a == null) this.printS ("null");
 else if (Clazz.instanceOf (a, Byte)) this.printB ((a).byteValue (), b);
 else if (Clazz.instanceOf (a, Short)) this.printSh ((a).shortValue (), b);
 else if (Clazz.instanceOf (a, Integer)) this.printI ((a).intValue (), b);
 else if (Clazz.instanceOf (a, Long)) this.printL ((a).longValue (), b);
 else this.failConversion (this.c, a);
}, "~O,java.util.Locale");
Clazz.defineMethod (c$, "printFloat", 
 function (a, b) {
if (a == null) this.printS ("null");
 else if (Clazz.instanceOf (a, Float)) this.printF ((a).floatValue (), b);
 else if (Clazz.instanceOf (a, Double)) this.printDL ((a).doubleValue (), b);
 else this.failConversion (this.c, a);
}, "~O,java.util.Locale");
Clazz.defineMethod (c$, "printDateTime", 
 function (a, b) {
if (a == null) {
this.printS ("null");
return;
}var c = null;
if (Clazz.instanceOf (a, java.util.Date)) {
c = java.util.Calendar.getInstance (b == null ? java.util.Locale.US : b);
c.setTime (a);
} else if (Clazz.instanceOf (a, java.util.Calendar)) {
c = (a).clone ();
c.setLenient (true);
} else {
this.failConversion (this.c, a);
}this.printDT (c, this.c, b);
}, "~O,java.util.Locale");
Clazz.defineMethod (c$, "printCharacter", 
 function (a) {
if (a == null) {
this.printS ("null");
return;
}var b = null;
if (Clazz.instanceOf (a, Character)) {
b = (a).toString ();
} else if (Clazz.instanceOf (a, Byte)) {
var c = (a).byteValue ();
if (Character.isValidCodePoint (c)) b =  String.instantialize (Character.toChars (c));
 else throw  new java.util.IllegalFormatCodePointException (c);
} else if (Clazz.instanceOf (a, Short)) {
var c = (a).shortValue ();
if (Character.isValidCodePoint (c)) b =  String.instantialize (Character.toChars (c));
 else throw  new java.util.IllegalFormatCodePointException (c);
} else if (Clazz.instanceOf (a, Integer)) {
var c = (a).intValue ();
if (Character.isValidCodePoint (c)) b =  String.instantialize (Character.toChars (c));
 else throw  new java.util.IllegalFormatCodePointException (c);
} else {
this.failConversion (this.c, a);
}this.printS (b);
}, "~O");
Clazz.defineMethod (c$, "printString", 
 function (a, b) {
if (a == null) {
this.printS ("null");
} else if (Clazz.instanceOf (a, java.util.Formattable)) {
var c = this.formatter;
if (this.formatter.locale () !== b) c =  new java.util.Formatter (this.formatter.out (), b);
(a).formatTo (c, this.f.$valueOf (), this.$width, this.$precision);
} else {
this.printS (a.toString ());
}}, "~O,java.util.Locale");
Clazz.defineMethod (c$, "printBoolean", 
 function (a) {
var b;
if (a != null) b = ((Clazz.instanceOf (a, Boolean)) ? (a).toString () : "true");
 else b = "false";
this.printS (b);
}, "~O");
Clazz.defineMethod (c$, "printHashCode", 
 function (a) {
var b = (a == null ? "null" : Integer.toHexString (a.hashCode ()));
this.printS (b);
}, "~O");
Clazz.defineMethod (c$, "printS", 
 function (a) {
if (this.$precision != -1 && this.$precision < a.length) a = a.substring (0, this.$precision);
if (this.f.contains (java.util.Formatter.Flags.UPPERCASE)) a = a.toUpperCase ();
this.b$["java.util.Formatter"].a.append (this.justify (a));
}, "~S");
Clazz.defineMethod (c$, "justify", 
 function (a) {
if (this.$width == -1) return a;
var b =  new StringBuilder ();
var c = this.f.contains (java.util.Formatter.Flags.LEFT_JUSTIFY);
var d = this.$width - a.length;
if (!c) for (var e = 0; e < d; e++) b.append (' ');

b.append (a);
if (c) for (var f = 0; f < d; f++) b.append (' ');

return b.toString ();
}, "~S");
Clazz.overrideMethod (c$, "toString", 
function () {
var a =  new StringBuilder (37);
var b = this.f.dup ().remove (java.util.Formatter.Flags.UPPERCASE);
a.append (b.toString ());
if (this.$index > 0) a.append (this.$index).append ('$');
if (this.$width != -1) a.append (this.$width);
if (this.$precision != -1) a.append ('.').append (this.$precision);
if (this.dt) a.append (this.f.contains (java.util.Formatter.Flags.UPPERCASE) ? 'T' : 't');
a.append (this.f.contains (java.util.Formatter.Flags.UPPERCASE) ? Character.toUpperCase (this.c) : this.c);
return a.toString ();
});
Clazz.defineMethod (c$, "checkGeneral", 
 function () {
if ((this.c == 'b' || this.c == 'h') && this.f.contains (java.util.Formatter.Flags.ALTERNATE)) this.failMismatch (java.util.Formatter.Flags.ALTERNATE, this.c);
if (this.$width == -1 && this.f.contains (java.util.Formatter.Flags.LEFT_JUSTIFY)) throw  new java.util.MissingFormatWidthException (this.toString ());
this.checkBadFlags ([java.util.Formatter.Flags.PLUS, java.util.Formatter.Flags.LEADING_SPACE, java.util.Formatter.Flags.ZERO_PAD, java.util.Formatter.Flags.GROUP, java.util.Formatter.Flags.PARENTHESES]);
});
Clazz.defineMethod (c$, "checkDateTime", 
 function () {
if (this.$precision != -1) throw  new java.util.IllegalFormatPrecisionException (this.$precision);
if (!java.util.Formatter.DateTime.isValid (this.c)) throw  new java.util.UnknownFormatConversionException ("t" + this.c);
this.checkBadFlags ([java.util.Formatter.Flags.ALTERNATE, java.util.Formatter.Flags.PLUS, java.util.Formatter.Flags.LEADING_SPACE, java.util.Formatter.Flags.ZERO_PAD, java.util.Formatter.Flags.GROUP, java.util.Formatter.Flags.PARENTHESES]);
if (this.$width == -1 && this.f.contains (java.util.Formatter.Flags.LEFT_JUSTIFY)) throw  new java.util.MissingFormatWidthException (this.toString ());
});
Clazz.defineMethod (c$, "checkCharacter", 
 function () {
if (this.$precision != -1) throw  new java.util.IllegalFormatPrecisionException (this.$precision);
this.checkBadFlags ([java.util.Formatter.Flags.ALTERNATE, java.util.Formatter.Flags.PLUS, java.util.Formatter.Flags.LEADING_SPACE, java.util.Formatter.Flags.ZERO_PAD, java.util.Formatter.Flags.GROUP, java.util.Formatter.Flags.PARENTHESES]);
if (this.$width == -1 && this.f.contains (java.util.Formatter.Flags.LEFT_JUSTIFY)) throw  new java.util.MissingFormatWidthException (this.toString ());
});
Clazz.defineMethod (c$, "checkInteger", 
 function () {
this.checkNumeric ();
if (this.$precision != -1) throw  new java.util.IllegalFormatPrecisionException (this.$precision);
if (this.c == 'd') this.checkBadFlags ([java.util.Formatter.Flags.ALTERNATE]);
 else if (this.c == 'o') this.checkBadFlags ([java.util.Formatter.Flags.GROUP]);
 else this.checkBadFlags ([java.util.Formatter.Flags.GROUP]);
});
Clazz.defineMethod (c$, "checkBadFlags", 
 function (a) {
for (var b = 0; b < a.length; b++) if (this.f.contains (a[b])) this.failMismatch (a[b], this.c);

}, "~A");
Clazz.defineMethod (c$, "checkFloat", 
 function () {
this.checkNumeric ();
if (this.c == 'f') {
} else if (this.c == 'a') {
this.checkBadFlags ([java.util.Formatter.Flags.PARENTHESES, java.util.Formatter.Flags.GROUP]);
} else if (this.c == 'e') {
this.checkBadFlags ([java.util.Formatter.Flags.GROUP]);
} else if (this.c == 'g') {
this.checkBadFlags ([java.util.Formatter.Flags.ALTERNATE]);
}});
Clazz.defineMethod (c$, "checkNumeric", 
 function () {
if (this.$width != -1 && this.$width < 0) throw  new java.util.IllegalFormatWidthException (this.$width);
if (this.$precision != -1 && this.$precision < 0) throw  new java.util.IllegalFormatPrecisionException (this.$precision);
if (this.$width == -1 && (this.f.contains (java.util.Formatter.Flags.LEFT_JUSTIFY) || this.f.contains (java.util.Formatter.Flags.ZERO_PAD))) throw  new java.util.MissingFormatWidthException (this.toString ());
if ((this.f.contains (java.util.Formatter.Flags.PLUS) && this.f.contains (java.util.Formatter.Flags.LEADING_SPACE)) || (this.f.contains (java.util.Formatter.Flags.LEFT_JUSTIFY) && this.f.contains (java.util.Formatter.Flags.ZERO_PAD))) throw  new java.util.IllegalFormatFlagsException (this.f.toString ());
});
Clazz.defineMethod (c$, "checkText", 
 function () {
if (this.$precision != -1) throw  new java.util.IllegalFormatPrecisionException (this.$precision);
switch (this.c) {
case '%':
if (this.f.$valueOf () != java.util.Formatter.Flags.LEFT_JUSTIFY.$valueOf () && this.f.$valueOf () != java.util.Formatter.Flags.NONE.$valueOf ()) throw  new java.util.IllegalFormatFlagsException (this.f.toString ());
if (this.$width == -1 && this.f.contains (java.util.Formatter.Flags.LEFT_JUSTIFY)) throw  new java.util.MissingFormatWidthException (this.toString ());
break;
case 'n':
if (this.$width != -1) throw  new java.util.IllegalFormatWidthException (this.$width);
if (this.f.$valueOf () != java.util.Formatter.Flags.NONE.$valueOf ()) throw  new java.util.IllegalFormatFlagsException (this.f.toString ());
break;
default:
}
});
Clazz.defineMethod (c$, "printB", 
 function (a, b) {
var c = a;
if (a < 0 && (this.c == 'o' || this.c == 'x')) {
c += (256);
}this.printL (c, b);
}, "~N,java.util.Locale");
Clazz.defineMethod (c$, "printSh", 
 function (a, b) {
var c = a;
if (a < 0 && (this.c == 'o' || this.c == 'x')) {
c += (65536);
}this.printL (c, b);
}, "~N,java.util.Locale");
Clazz.defineMethod (c$, "printI", 
 function (a, b) {
var c = a;
if (a < 0 && (this.c == 'o' || this.c == 'x')) {
c += (4294967296);
}this.printL (c, b);
}, "~N,java.util.Locale");
Clazz.defineMethod (c$, "printL", 
 function (a, b) {
var c =  new StringBuilder ();
if (this.c == 'd') {
var d = a < 0;
var e;
if (a < 0) e = Long.toString (a, 10).substring (1).toCharArray ();
 else e = Long.toString (a, 10).toCharArray ();
this.leadingSign (c, d);
this.localizedMagnitude (c, e, this.f, this.adjustWidth (this.$width, this.f, d), b);
this.trailingSign (c, d);
} else if (this.c == 'o') {
this.checkBadFlags ([java.util.Formatter.Flags.PARENTHESES, java.util.Formatter.Flags.LEADING_SPACE, java.util.Formatter.Flags.PLUS]);
var d = Long.toOctalString (a);
var e = (this.f.contains (java.util.Formatter.Flags.ALTERNATE) ? d.length + 1 : d.length);
if (this.f.contains (java.util.Formatter.Flags.ALTERNATE)) c.append ('0');
if (this.f.contains (java.util.Formatter.Flags.ZERO_PAD)) for (var f = 0; f < this.$width - e; f++) c.append ('0');

c.append (d);
} else if (this.c == 'x') {
this.checkBadFlags ([java.util.Formatter.Flags.PARENTHESES, java.util.Formatter.Flags.LEADING_SPACE, java.util.Formatter.Flags.PLUS]);
var d = Long.toHexString (a);
var e = (this.f.contains (java.util.Formatter.Flags.ALTERNATE) ? d.length + 2 : d.length);
if (this.f.contains (java.util.Formatter.Flags.ALTERNATE)) c.append (this.f.contains (java.util.Formatter.Flags.UPPERCASE) ? "0X" : "0x");
if (this.f.contains (java.util.Formatter.Flags.ZERO_PAD)) for (var f = 0; f < this.$width - e; f++) c.append ('0');

if (this.f.contains (java.util.Formatter.Flags.UPPERCASE)) d = d.toUpperCase ();
c.append (d);
}this.b$["java.util.Formatter"].a.append (this.justify (c.toString ()));
}, "~N,java.util.Locale");
Clazz.defineMethod (c$, "leadingSign", 
 function (a, b) {
if (!b) {
if (this.f.contains (java.util.Formatter.Flags.PLUS)) {
a.append ('+');
} else if (this.f.contains (java.util.Formatter.Flags.LEADING_SPACE)) {
a.append (' ');
}} else {
if (this.f.contains (java.util.Formatter.Flags.PARENTHESES)) a.append ('(');
 else a.append ('-');
}return a;
}, "StringBuilder,~B");
Clazz.defineMethod (c$, "trailingSign", 
 function (a, b) {
if (b && this.f.contains (java.util.Formatter.Flags.PARENTHESES)) a.append (')');
return a;
}, "StringBuilder,~B");
Clazz.defineMethod (c$, "printF", 
 function (a, b) {
this.printDL (a, b);
}, "~N,java.util.Locale");
Clazz.defineMethod (c$, "printDL", 
 function (a, b) {
var c =  new StringBuilder ();
var d = Double.compare (a, 0.0) == -1;
if (!Double.isNaN (a)) {
var e = Math.abs (a);
this.leadingSign (c, d);
if (!Double.isInfinite (e)) this.printD (c, e, b, this.f, this.c, this.$precision, d);
 else c.append (this.f.contains (java.util.Formatter.Flags.UPPERCASE) ? "INFINITY" : "Infinity");
this.trailingSign (c, d);
} else {
c.append (this.f.contains (java.util.Formatter.Flags.UPPERCASE) ? "NAN" : "NaN");
}this.b$["java.util.Formatter"].a.append (this.justify (c.toString ()));
}, "~N,java.util.Locale");
Clazz.defineMethod (c$, "printD", 
 function (a, b, c, d, e, f, g) {
if (e == 'e') {
var h = (f == -1 ? 6 : f);
var i = Clazz.innerTypeInstance (java.util.Formatter.FormattedFloatingDecimal, this, null, b, h, 2);
var j =  Clazz.newCharArray (30, '\0');
var k = i.getChars (j);
var l = this.addZeros (this.mantissa (j, k), h);
if (d.contains (java.util.Formatter.Flags.ALTERNATE) && (h == 0)) l = this.addDot (l);
var m = (b == 0.0) ?  Clazz.newCharArray (-1, ['+', '0', '0']) : this.exponent (j, k);
var n = this.$width;
if (this.$width != -1) n = this.adjustWidth (this.$width - m.length - 1, d, g);
this.localizedMagnitude (a, l, d, n, c);
a.append (d.contains (java.util.Formatter.Flags.UPPERCASE) ? 'E' : 'e');
var o = d.dup ().remove (java.util.Formatter.Flags.GROUP);
var p = m[0];
a.append (p);
var q =  Clazz.newCharArray (m.length - 1, '\0');
System.arraycopy (m, 1, q, 0, m.length - 1);
a.append (this.localizedMagnitude (null, q, o, -1, c));
} else if (e == 'f') {
var h = (f == -1 ? 6 : f);
var i = Clazz.innerTypeInstance (java.util.Formatter.FormattedFloatingDecimal, this, null, b, h, 1);
var j =  Clazz.newCharArray (30 + 1 + Math.abs (i.getExponent ()), '\0');
var k = i.getChars (j);
var l = this.addZeros (this.mantissa (j, k), h);
if (d.contains (java.util.Formatter.Flags.ALTERNATE) && (h == 0)) l = this.addDot (l);
var m = this.$width;
if (this.$width != -1) m = this.adjustWidth (this.$width, d, g);
this.localizedMagnitude (a, l, d, m, c);
} else if (e == 'g') {
var h = f;
if (f == -1) h = 6;
 else if (f == 0) h = 1;
var i = Clazz.innerTypeInstance (java.util.Formatter.FormattedFloatingDecimal, this, null, b, h, 0);
var j =  Clazz.newCharArray (30 + 1 + Math.abs (i.getExponent ()), '\0');
var k = i.getChars (j);
var l = this.exponent (j, k);
if (l != null) {
h -= 1;
} else {
h = h - (b == 0 ? 0 : i.getExponentRounded ()) - 1;
}var m = this.addZeros (this.mantissa (j, k), h);
if (d.contains (java.util.Formatter.Flags.ALTERNATE) && (h == 0)) m = this.addDot (m);
var n = this.$width;
if (this.$width != -1) {
if (l != null) n = this.adjustWidth (this.$width - l.length - 1, d, g);
 else n = this.adjustWidth (this.$width, d, g);
}this.localizedMagnitude (a, m, d, n, c);
if (l != null) {
a.append (d.contains (java.util.Formatter.Flags.UPPERCASE) ? 'E' : 'e');
var o = d.dup ().remove (java.util.Formatter.Flags.GROUP);
var p = l[0];
a.append (p);
var q =  Clazz.newCharArray (l.length - 1, '\0');
System.arraycopy (l, 1, q, 0, l.length - 1);
a.append (this.localizedMagnitude (null, q, o, -1, c));
}} else if (e == 'a') {
var h = f;
if (f == -1) h = 0;
 else if (f == 0) h = 1;
var i = this.hexDouble (b, h);
var j;
var k = d.contains (java.util.Formatter.Flags.UPPERCASE);
a.append (k ? "0X" : "0x");
if (d.contains (java.util.Formatter.Flags.ZERO_PAD)) for (var l = 0; l < this.$width - i.length - 2; l++) a.append ('0');

var m = i.indexOf ('p');
j = i.substring (0, m).toCharArray ();
if (k) {
var n =  String.instantialize (j);
n = n.toUpperCase ();
j = n.toCharArray ();
}a.append (h != 0 ? this.addZeros (j, h) : j);
a.append (k ? 'P' : 'p');
a.append (i.substring (m + 1));
}}, "StringBuilder,~N,java.util.Locale,java.util.Formatter.Flags,~S,~N,~B");
Clazz.defineMethod (c$, "mantissa", 
 function (a, b) {
var c;
for (c = 0; c < b; c++) {
if (a[c] == 'e') break;
}
var d =  Clazz.newCharArray (c, '\0');
System.arraycopy (a, 0, d, 0, c);
return d;
}, "~A,~N");
Clazz.defineMethod (c$, "exponent", 
 function (a, b) {
var c;
for (c = b - 1; c >= 0; c--) {
if (a[c] == 'e') break;
}
if (c == -1) return null;
var d =  Clazz.newCharArray (b - c - 1, '\0');
System.arraycopy (a, c + 1, d, 0, b - c - 1);
return d;
}, "~A,~N");
Clazz.defineMethod (c$, "addZeros", 
 function (a, b) {
var c;
for (c = 0; c < a.length; c++) {
if (a[c] == '.') break;
}
var d = false;
if (c == a.length) {
d = true;
}var e = a.length - c - (d ? 0 : 1);
if (e == b) return a;
var f =  Clazz.newCharArray (a.length + b - e + (d ? 1 : 0), '\0');
System.arraycopy (a, 0, f, 0, a.length);
var g = a.length;
if (d) {
f[a.length] = '.';
g++;
}for (var h = g; h < f.length; h++) f[h] = '0';

return f;
}, "~A,~N");
Clazz.defineMethod (c$, "hexDouble", 
 function (a, b) {
return Integer.toHexString (Clazz.doubleToInt (a));
}, "~N,~N");
Clazz.defineMethod (c$, "adjustWidth", 
 function (a, b, c) {
var d = a;
if (d != -1 && c && b.contains (java.util.Formatter.Flags.PARENTHESES)) d--;
return d;
}, "~N,java.util.Formatter.Flags,~B");
Clazz.defineMethod (c$, "addDot", 
 function (a) {
var b = a;
b =  Clazz.newCharArray (a.length + 1, '\0');
System.arraycopy (a, 0, b, 0, a.length);
b[b.length - 1] = '.';
return b;
}, "~A");
Clazz.defineMethod (c$, "printDT", 
 function (a, b, c) {
var d =  new StringBuilder ();
this.printDTL (d, a, b, c);
var e = this.justify (d.toString ());
if (this.f.contains (java.util.Formatter.Flags.UPPERCASE)) e = e.toUpperCase ();
this.b$["java.util.Formatter"].a.append (e);
}, "java.util.Calendar,~S,java.util.Locale");
Clazz.defineMethod (c$, "printDTL", 
 function (a, b, c, d) {
if (a == null) a =  new StringBuilder ();
switch (c) {
case 'H':
case 'I':
case 'k':
case 'l':
{
var e = b.get (11);
if (c == 'I' || c == 'l') e = (e == 0 || e == 12 ? 12 : e % 12);
var f = (c == 'H' || c == 'I' ? java.util.Formatter.Flags.ZERO_PAD : java.util.Formatter.Flags.NONE);
a.append (this.localizedMagnitude (null, e, f, 2, d));
break;
}case 'M':
{
var e = b.get (12);
var f = java.util.Formatter.Flags.ZERO_PAD;
a.append (this.localizedMagnitude (null, e, f, 2, d));
break;
}case 'N':
{
var e = b.get (14) * 1000000;
var f = java.util.Formatter.Flags.ZERO_PAD;
a.append (this.localizedMagnitude (null, e, f, 9, d));
break;
}case 'L':
{
var e = b.get (14);
var f = java.util.Formatter.Flags.ZERO_PAD;
a.append (this.localizedMagnitude (null, e, f, 3, d));
break;
}case 'Q':
{
var e = b.getTimeInMillis ();
var f = java.util.Formatter.Flags.NONE;
a.append (this.localizedMagnitude (null, e, f, this.$width, d));
break;
}case 'p':
{
var e =  Clazz.newArray (-1, ["AM", "PM"]);
if (d != null && d !== java.util.Locale.US) {
var f = java.text.DateFormatSymbols.getInstance (d);
e = f.getAmPmStrings ();
}var f = e[b.get (9)];
a.append (f.toLowerCase ());
break;
}case 's':
{
var e = Clazz.doubleToInt (b.getTimeInMillis () / 1000);
var f = java.util.Formatter.Flags.NONE;
a.append (this.localizedMagnitude (null, e, f, this.$width, d));
break;
}case 'S':
{
var e = b.get (13);
var f = java.util.Formatter.Flags.ZERO_PAD;
a.append (this.localizedMagnitude (null, e, f, 2, d));
break;
}case 'z':
{
var e = b.get (15) + b.get (16);
var f = e < 0;
a.append (f ? '-' : '+');
if (f) e = -e;
var g = Clazz.doubleToInt (e / 60000);
var h = (Clazz.doubleToInt (g / 60)) * 100 + (g % 60);
var i = java.util.Formatter.Flags.ZERO_PAD;
a.append (this.localizedMagnitude (null, h, i, 4, d));
break;
}case 'Z':
{
throw  new java.io.UnsupportedEncodingException ();
}case 'a':
case 'A':
{
var e = b.get (7);
var f = ((d == null) ? java.util.Locale.US : d);
var g = java.text.DateFormatSymbols.getInstance (f);
if (c == 'A') a.append (g.getWeekdays ()[e]);
 else a.append (g.getShortWeekdays ()[e]);
break;
}case 'b':
case 'h':
case 'B':
{
var e = b.get (2);
var f = ((d == null) ? java.util.Locale.US : d);
var g = java.text.DateFormatSymbols.getInstance (f);
if (c == 'B') a.append (g.getMonths ()[e]);
 else a.append (g.getShortMonths ()[e]);
break;
}case 'C':
case 'y':
case 'Y':
{
var e = b.get (1);
var f = 2;
switch (c) {
case 'C':
e /= 100;
break;
case 'y':
e %= 100;
break;
case 'Y':
f = 4;
break;
}
var g = java.util.Formatter.Flags.ZERO_PAD;
a.append (this.localizedMagnitude (null, e, g, f, d));
break;
}case 'd':
case 'e':
{
var e = b.get (5);
var f = (c == 'd' ? java.util.Formatter.Flags.ZERO_PAD : java.util.Formatter.Flags.NONE);
a.append (this.localizedMagnitude (null, e, f, 2, d));
break;
}case 'j':
{
var e = b.get (6);
var f = java.util.Formatter.Flags.ZERO_PAD;
a.append (this.localizedMagnitude (null, e, f, 3, d));
break;
}case 'm':
{
var e = b.get (2) + 1;
var f = java.util.Formatter.Flags.ZERO_PAD;
a.append (this.localizedMagnitude (null, e, f, 2, d));
break;
}case 'T':
case 'R':
{
var e = ":";
this.printDTL (a, b, 'H', d).append (e);
this.printDTL (a, b, 'M', d);
if (c == 'T') {
a.append (e);
this.printDTL (a, b, 'S', d);
}break;
}case 'r':
{
var e = ":";
this.printDTL (a, b, 'I', d).append (e);
this.printDTL (a, b, 'M', d).append (e);
this.printDTL (a, b, 'S', d).append (" ");
var f =  new StringBuilder ();
this.printDTL (f, b, 'p', d);
a.append (f.toString ().toUpperCase ());
break;
}case 'c':
{
var e = " ";
this.printDTL (a, b, 'a', d).append (e);
this.printDTL (a, b, 'b', d).append (e);
this.printDTL (a, b, 'd', d).append (e);
this.printDTL (a, b, 'T', d).append (e);
this.printDTL (a, b, 'Z', d).append (e);
this.printDTL (a, b, 'Y', d);
break;
}case 'D':
{
var e = "/";
this.printDTL (a, b, 'm', d).append (e);
this.printDTL (a, b, 'd', d).append (e);
this.printDTL (a, b, 'y', d);
break;
}case 'F':
{
var e = "-";
this.printDTL (a, b, 'Y', d).append (e);
this.printDTL (a, b, 'm', d).append (e);
this.printDTL (a, b, 'd', d);
break;
}default:
}
return a;
}, "StringBuilder,java.util.Calendar,~S,java.util.Locale");
Clazz.defineMethod (c$, "failMismatch", 
 function (a, b) {
var c = a.toString ();
throw  new java.util.FormatFlagsConversionMismatchException (c, b);
}, "java.util.Formatter.Flags,~S");
Clazz.defineMethod (c$, "failConversion", 
 function (a, b) {
throw  new java.util.IllegalFormatConversionException (a, b.getClass ());
}, "~S,~O");
Clazz.defineMethod (c$, "getZero", 
 function (a) {
if ((a != null) && !a.equals (this.b$["java.util.Formatter"].locale ())) {
var b = java.text.DecimalFormatSymbols.getInstance (a);
return b.getZeroDigit ();
}return this.b$["java.util.Formatter"].zero;
}, "java.util.Locale");
Clazz.defineMethod (c$, "localizedMagnitude", 
 function (a, b, c, d, e) {
var f = Long.toString (b, 10).toCharArray ();
return this.localizedMagnitude (a, f, c, d, e);
}, "StringBuilder,~N,java.util.Formatter.Flags,~N,java.util.Locale");
Clazz.defineMethod (c$, "localizedMagnitude", 
 function (a, b, c, d, e) {
if (a == null) a =  new StringBuilder ();
var f = a.length ();
var g = this.getZero (e);
var h = '\u0000';
var i = -1;
var j = '\u0000';
var k = b.length;
var l = k;
for (var m = 0; m < k; m++) {
if (b[m] == '.') {
l = m;
break;
}}
if (l < k) {
if (e == null || e.equals (java.util.Locale.US)) {
j = '.';
} else {
var n = java.text.DecimalFormatSymbols.getInstance (e);
j = n.getDecimalSeparator ();
}}if (c.contains (java.util.Formatter.Flags.GROUP)) {
if (e == null || e.equals (java.util.Locale.US)) {
h = ',';
i = 3;
} else {
var n = java.text.DecimalFormatSymbols.getInstance (e);
h = n.getGroupingSeparator ();
var o = java.text.NumberFormat.getIntegerInstance (e);
i = o.getGroupingSize ();
}}for (var n = 0; n < k; n++) {
if (n == l) {
a.append (j);
h = '\0';
continue;
}var o = b[n];
a.append (String.fromCharCode ((o.charCodeAt (0) - 48) + g.charCodeAt (0)));
if (h != '\0' && n != l - 1 && ((l - n) % i == 1)) a.append (h);
}
k = a.length ();
if (d != -1 && c.contains (java.util.Formatter.Flags.ZERO_PAD)) for (var o = 0; o < d - k; o++) a.insert (f, g);

return a;
}, "StringBuilder,~A,java.util.Formatter.Flags,~N,java.util.Locale");
c$ = Clazz.p0p ();
};
c$.$Formatter$FormattedFloatingDecimal$ = function () {
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.str = null;
this.exp = 0;
this.expr = 0;
Clazz.instantialize (this, arguments);
}, java.util.Formatter, "FormattedFloatingDecimal");
Clazz.makeConstructor (c$, 
function (a, b, c) {
this.str = "" + a;
this.getString (c, a, b);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getString", 
 function (a, b, c) {
if (Double.isNaN (b) || Double.isInfinite (b)) return;
var d = "";
var e = "";
var f = true;
{
if (typeof j2sCompilerOK != "undefined") {
sNoRound= value.toExponential(); sRound =
value.toExponential(prec);
} else {
d = b.toExponential();
e = b.toExponential(c);
}
}this.exp = this.getExp (d);
this.expr = this.getExp (e);
if (a == 0) {
{
if (typeof j2sCompilerOK != "undefined") {
sRound = value.toExponential(prec-1);
} else {
e = b.toExponential(c-1);
}
}if (this.expr < -4 || this.exp >= c) a = 2;
}if (a == 1) {
{
if (typeof j2sCompilerOK != "undefined") {
sRound = value.toFixed(); sNoRound = value.toFixed(prec);
} else {
e = b.toFixed();
d = b.toFixed(c);
}
}}if (d.length < e.length) e = d;
var g = e.indexOf ("e");
switch (a) {
case 2:
if (e.indexOf ("e-") < 0) e = e.substring (0, g + 1) + "+" + e.substring (g + 1);
if (g == e.length - 2) e = e.substring (0, g + 2) + "0" + e.substring (g + 2);
break;
case 1:
e = d;
break;
case 0:
var h = g - (b < 0 ? 2 : 1);
h = Math.max (0, h - 1 - this.exp);
{
if (typeof j2sCompilerOK != "undefined") {
sRound = ParseFloat(sRound).toFixed(ndig);
} else {
e = ParseFloat(e).toFixed(g);
}
}}
this.str = e;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getExp", 
 function (a) {
return Integer.parseInt (a.substring (a.indexOf ("e") + 1));
}, "~S");
Clazz.defineMethod (c$, "getChars", 
function (a) {
var b = this.str.length;
System.arraycopy (this.str.toCharArray (), 0, a, 0, b);
return b;
}, "~A");
Clazz.defineMethod (c$, "getExponent", 
function () {
return this.exp;
});
Clazz.defineMethod (c$, "getExponentRounded", 
function () {
return this.expr;
});
Clazz.defineStatics (c$,
"GENERAL", 0,
"DECIMAL_FLOAT", 1,
"SCIENTIFIC", 2);
c$ = Clazz.p0p ();
};
Clazz.declareInterface (java.util.Formatter, "FormatString");
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.flags = 0;
Clazz.instantialize (this, arguments);
}, java.util.Formatter, "Flags");
Clazz.makeConstructor (c$, 
 function (a) {
this.flags = a;
}, "~N");
Clazz.defineMethod (c$, "$valueOf", 
function () {
return this.flags;
});
Clazz.defineMethod (c$, "contains", 
function (a) {
return (this.flags & a.$valueOf ()) == a.$valueOf ();
}, "java.util.Formatter.Flags");
Clazz.defineMethod (c$, "dup", 
function () {
return  new java.util.Formatter.Flags (this.flags);
});
Clazz.defineMethod (c$, "add", 
function (a) {
this.flags |= a.$valueOf ();
return this;
}, "java.util.Formatter.Flags");
Clazz.defineMethod (c$, "remove", 
function (a) {
this.flags &= ~a.$valueOf ();
return this;
}, "java.util.Formatter.Flags");
c$.parse = Clazz.defineMethod (c$, "parse", 
function (a) {
var b =  new java.util.Formatter.Flags (0);
if (a == null) return b;
var c = a.toCharArray ();
for (var d = 0; d < c.length; d++) {
var e = java.util.Formatter.Flags.parseChar (c[d]);
if (b.contains (e)) throw  new java.util.DuplicateFormatFlagsException (e.toString ());
b.add (e);
}
return b;
}, "~S");
c$.parseChar = Clazz.defineMethod (c$, "parseChar", 
 function (a) {
switch (a) {
case '-':
return java.util.Formatter.Flags.LEFT_JUSTIFY;
case '#':
return java.util.Formatter.Flags.ALTERNATE;
case '+':
return java.util.Formatter.Flags.PLUS;
case ' ':
return java.util.Formatter.Flags.LEADING_SPACE;
case '0':
return java.util.Formatter.Flags.ZERO_PAD;
case ',':
return java.util.Formatter.Flags.GROUP;
case '(':
return java.util.Formatter.Flags.PARENTHESES;
case '<':
return java.util.Formatter.Flags.PREVIOUS;
default:
throw  new java.util.UnknownFormatFlagsException (String.valueOf (a));
}
}, "~S");
Clazz.overrideMethod (c$, "toString", 
function () {
var a =  new StringBuilder ();
if (this.contains (java.util.Formatter.Flags.LEFT_JUSTIFY)) a.append ('-');
if (this.contains (java.util.Formatter.Flags.UPPERCASE)) a.append ('^');
if (this.contains (java.util.Formatter.Flags.ALTERNATE)) a.append ('#');
if (this.contains (java.util.Formatter.Flags.PLUS)) a.append ('+');
if (this.contains (java.util.Formatter.Flags.LEADING_SPACE)) a.append (' ');
if (this.contains (java.util.Formatter.Flags.ZERO_PAD)) a.append ('0');
if (this.contains (java.util.Formatter.Flags.GROUP)) a.append (',');
if (this.contains (java.util.Formatter.Flags.PARENTHESES)) a.append ('(');
if (this.contains (java.util.Formatter.Flags.PREVIOUS)) a.append ('<');
return a.toString ();
});
c$.NONE = c$.prototype.NONE =  new java.util.Formatter.Flags (0);
c$.LEFT_JUSTIFY = c$.prototype.LEFT_JUSTIFY =  new java.util.Formatter.Flags (1);
c$.UPPERCASE = c$.prototype.UPPERCASE =  new java.util.Formatter.Flags (2);
c$.ALTERNATE = c$.prototype.ALTERNATE =  new java.util.Formatter.Flags (4);
c$.PLUS = c$.prototype.PLUS =  new java.util.Formatter.Flags (8);
c$.LEADING_SPACE = c$.prototype.LEADING_SPACE =  new java.util.Formatter.Flags (16);
c$.ZERO_PAD = c$.prototype.ZERO_PAD =  new java.util.Formatter.Flags (32);
c$.GROUP = c$.prototype.GROUP =  new java.util.Formatter.Flags (64);
c$.PARENTHESES = c$.prototype.PARENTHESES =  new java.util.Formatter.Flags (128);
c$.PREVIOUS = c$.prototype.PREVIOUS =  new java.util.Formatter.Flags (256);
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.declareType (java.util.Formatter, "Conversion");
c$.isValid = Clazz.defineMethod (c$, "isValid", 
function (a) {
return (java.util.Formatter.Conversion.isGeneral (a) || java.util.Formatter.Conversion.isInteger (a) || java.util.Formatter.Conversion.isFloat (a) || java.util.Formatter.Conversion.isText (a) || a == 't' || java.util.Formatter.Conversion.isCharacter (a));
}, "~S");
c$.isGeneral = Clazz.defineMethod (c$, "isGeneral", 
function (a) {
switch (a) {
case 'b':
case 'B':
case 's':
case 'S':
case 'h':
case 'H':
return true;
default:
return false;
}
}, "~S");
c$.isCharacter = Clazz.defineMethod (c$, "isCharacter", 
function (a) {
switch (a) {
case 'c':
case 'C':
return true;
default:
return false;
}
}, "~S");
c$.isInteger = Clazz.defineMethod (c$, "isInteger", 
function (a) {
switch (a) {
case 'd':
case 'o':
case 'x':
case 'X':
return true;
default:
return false;
}
}, "~S");
c$.isFloat = Clazz.defineMethod (c$, "isFloat", 
function (a) {
switch (a) {
case 'e':
case 'E':
case 'g':
case 'G':
case 'f':
case 'a':
case 'A':
return true;
default:
return false;
}
}, "~S");
c$.isText = Clazz.defineMethod (c$, "isText", 
function (a) {
switch (a) {
case 'n':
case '%':
return true;
default:
return false;
}
}, "~S");
Clazz.defineStatics (c$,
"DECIMAL_INTEGER", 'd',
"OCTAL_INTEGER", 'o',
"HEXADECIMAL_INTEGER", 'x',
"HEXADECIMAL_INTEGER_UPPER", 'X',
"SCIENTIFIC", 'e',
"SCIENTIFIC_UPPER", 'E',
"GENERAL", 'g',
"GENERAL_UPPER", 'G',
"DECIMAL_FLOAT", 'f',
"HEXADECIMAL_FLOAT", 'a',
"HEXADECIMAL_FLOAT_UPPER", 'A',
"CHARACTER", 'c',
"CHARACTER_UPPER", 'C',
"DATE_TIME", 't',
"DATE_TIME_UPPER", 'T',
"BOOLEAN", 'b',
"BOOLEAN_UPPER", 'B',
"STRING", 's',
"STRING_UPPER", 'S',
"HASHCODE", 'h',
"HASHCODE_UPPER", 'H',
"LINE_SEPARATOR", 'n',
"PERCENT_SIGN", '%');
c$ = Clazz.p0p ();
Clazz.pu$h(c$);
c$ = Clazz.declareType (java.util.Formatter, "DateTime");
c$.isValid = Clazz.defineMethod (c$, "isValid", 
function (a) {
switch (a) {
case 'H':
case 'I':
case 'k':
case 'l':
case 'M':
case 'N':
case 'L':
case 'Q':
case 'p':
case 's':
case 'S':
case 'T':
case 'z':
case 'Z':
case 'a':
case 'A':
case 'b':
case 'B':
case 'C':
case 'd':
case 'e':
case 'h':
case 'j':
case 'm':
case 'y':
case 'Y':
case 'r':
case 'R':
case 'c':
case 'D':
case 'F':
return true;
default:
return false;
}
}, "~S");
Clazz.defineStatics (c$,
"HOUR_OF_DAY_0", 'H',
"HOUR_0", 'I',
"HOUR_OF_DAY", 'k',
"HOUR", 'l',
"MINUTE", 'M',
"NANOSECOND", 'N',
"MILLISECOND", 'L',
"MILLISECOND_SINCE_EPOCH", 'Q',
"AM_PM", 'p',
"SECONDS_SINCE_EPOCH", 's',
"SECOND", 'S',
"TIME", 'T',
"ZONE_NUMERIC", 'z',
"ZONE", 'Z',
"NAME_OF_DAY_ABBREV", 'a',
"NAME_OF_DAY", 'A',
"NAME_OF_MONTH_ABBREV", 'b',
"NAME_OF_MONTH", 'B',
"CENTURY", 'C',
"DAY_OF_MONTH_0", 'd',
"DAY_OF_MONTH", 'e',
"NAME_OF_MONTH_ABBREV_X", 'h',
"DAY_OF_YEAR", 'j',
"MONTH", 'm',
"YEAR_2", 'y',
"YEAR_4", 'Y',
"TIME_12_HOUR", 'r',
"TIME_24_HOUR", 'R',
"DATE_TIME", 'c',
"DATE", 'D',
"ISO_STANDARD_DATE", 'F');
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"scaleUp", 0,
"MAX_FD_CHARS", 30,
"formatSpecifier", "%(\\d+\\$)?([-#+ 0,(\\<]*)?(\\d+)?(\\.\\d+)?([tT])?([a-zA-Z%])");
c$.fsPattern = c$.prototype.fsPattern = java.util.regex.Pattern.compile ("%(\\d+\\$)?([-#+ 0,(\\<]*)?(\\d+)?(\\.\\d+)?([tT])?([a-zA-Z%])");
});
