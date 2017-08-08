Clazz.declarePackage ("java.text");
Clazz.load (["java.text.DateFormat", "java.util.Hashtable", "java.text.DecimalFormat", "java.util.Calendar", "$.GregorianCalendar", "$.TimeZone", "sun.util.calendar.ZoneInfo"], "java.text.SimpleDateFormat", ["java.lang.IllegalArgumentException", "$.NullPointerException", "$.Number", "$.StringBuffer", "$.StringBuilder", "java.text.MessageFormat", "java.util.Date", "java.text.CharacterIteratorFieldDelegate", "$.DateFormatSymbols", "$.DontCareFieldPosition", "$.NumberFormat", "java.util.Locale", "sun.util.calendar.CalendarUtils", "sun.util.resources.LocaleData"], function () {
c$ = Clazz.decorateAsClass (function () {
this.serialVersionOnStream = 1;
this.pattern = null;
this.compiledPattern = null;
this.zeroDigit = '\0';
this.formatData = null;
this.defaultCenturyStart = null;
this.defaultCenturyStartYear = 0;
this.locale = null;
this.$useDateFormatSymbols = false;
Clazz.instantialize (this, arguments);
}, java.text, "SimpleDateFormat", java.text.DateFormat);
Clazz.makeConstructor (c$, 
function () {
this.construct (3, 3, java.util.Locale.getDefault ());
});
Clazz.makeConstructor (c$, 
function (pattern) {
this.construct (pattern, java.util.Locale.getDefault ());
}, "~S");
Clazz.makeConstructor (c$, 
function (pattern, locale) {
Clazz.superConstructor (this, java.text.SimpleDateFormat, []);
if (pattern == null || locale == null) {
throw  new NullPointerException ();
}this.initializeCalendar (locale);
this.pattern = pattern;
this.formatData = java.text.DateFormatSymbols.getInstance (locale);
this.locale = locale;
this.initialize (locale);
}, "~S,java.util.Locale");
Clazz.makeConstructor (c$, 
function (pattern, formatSymbols) {
Clazz.superConstructor (this, java.text.SimpleDateFormat, []);
if (pattern == null || formatSymbols == null) {
throw  new NullPointerException ();
}this.pattern = pattern;
this.formatData = formatSymbols.clone ();
this.locale = java.util.Locale.getDefault ();
this.initializeCalendar (this.locale);
this.initialize (this.locale);
this.$useDateFormatSymbols = true;
}, "~S,java.text.DateFormatSymbols");
Clazz.makeConstructor (c$, 
function (timeStyle, dateStyle, loc) {
Clazz.superConstructor (this, java.text.SimpleDateFormat, []);
if (loc == null) {
throw  new NullPointerException ();
}this.locale = loc;
this.initializeCalendar (loc);
var key = this.getKey ();
var dateTimePatterns = java.text.SimpleDateFormat.cachedLocaleData.get (key);
if (dateTimePatterns == null) {
var r = sun.util.resources.LocaleData.getDateFormatData (loc);
if (!this.isGregorianCalendar ()) {
try {
dateTimePatterns = r.getStringArray (this.getCalendarName () + ".DateTimePatterns");
} catch (e) {
if (Clazz.exceptionOf (e, java.util.MissingResourceException)) {
} else {
throw e;
}
}
}if (dateTimePatterns == null) {
dateTimePatterns = r.getStringArray ("DateTimePatterns");
}java.text.SimpleDateFormat.cachedLocaleData.put (key, dateTimePatterns);
}this.formatData = java.text.DateFormatSymbols.getInstance (loc);
if ((timeStyle >= 0) && (dateStyle >= 0)) {
var dateTimeArgs =  Clazz.newArray (-1, [dateTimePatterns[timeStyle], dateTimePatterns[dateStyle + 4]]);
this.pattern = java.text.MessageFormat.format (dateTimePatterns[8], dateTimeArgs);
} else if (timeStyle >= 0) {
this.pattern = dateTimePatterns[timeStyle];
} else if (dateStyle >= 0) {
this.pattern = dateTimePatterns[dateStyle + 4];
} else {
throw  new IllegalArgumentException ("No date or time style specified");
}this.initialize (loc);
}, "~N,~N,java.util.Locale");
Clazz.defineMethod (c$, "initialize", 
 function (loc) {
this.compiledPattern = this.compile (this.pattern);
this.numberFormat = java.text.SimpleDateFormat.cachedNumberFormatData.get (loc);
if (this.numberFormat == null) {
this.numberFormat = java.text.NumberFormat.getIntegerInstance (loc);
this.numberFormat.setGroupingUsed (false);
java.text.SimpleDateFormat.cachedNumberFormatData.put (loc, this.numberFormat);
}this.numberFormat = this.numberFormat.clone ();
this.initializeDefaultCentury ();
}, "java.util.Locale");
Clazz.defineMethod (c$, "initializeCalendar", 
 function (loc) {
if (this.calendar == null) {
this.calendar = java.util.Calendar.getInstance (java.util.TimeZone.getDefault (), loc);
}}, "java.util.Locale");
Clazz.defineMethod (c$, "getKey", 
 function () {
var sb =  new StringBuilder ();
sb.append (this.getCalendarName ()).append ('.');
sb.append (this.locale.getLanguage ()).append ('_').append (this.locale.getCountry ()).append ('_').append (this.locale.getVariant ());
return sb.toString ();
});
Clazz.defineMethod (c$, "compile", 
 function (pattern) {
var length = pattern.length;
var inQuote = false;
var compiledPattern =  new StringBuilder (length * 2);
var tmpBuffer = null;
var count = 0;
var lastTag = -1;
for (var i = 0; i < length; i++) {
var c = pattern.charAt (i);
if (c == '\'') {
if ((i + 1) < length) {
c = pattern.charAt (i + 1);
if (c == '\'') {
i++;
if (count != 0) {
java.text.SimpleDateFormat.encode (lastTag, count, compiledPattern);
lastTag = -1;
count = 0;
}if (inQuote) {
tmpBuffer.append (c);
} else {
compiledPattern.append (String.fromCharCode (25600 | c.charCodeAt (0)));
}continue;
}}if (!inQuote) {
if (count != 0) {
java.text.SimpleDateFormat.encode (lastTag, count, compiledPattern);
lastTag = -1;
count = 0;
}if (tmpBuffer == null) {
tmpBuffer =  new StringBuilder (length);
} else {
tmpBuffer.setLength (0);
}inQuote = true;
} else {
var len = tmpBuffer.length ();
if (len == 1) {
var ch = tmpBuffer.charAt (0);
if (ch.charCodeAt (0) < 128) {
compiledPattern.append (String.fromCharCode (25600 | ch.charCodeAt (0)));
} else {
compiledPattern.append (String.fromCharCode (25857));
compiledPattern.append (ch);
}} else {
java.text.SimpleDateFormat.encode (101, len, compiledPattern);
compiledPattern.append (tmpBuffer);
}inQuote = false;
}continue;
}if (inQuote) {
tmpBuffer.append (c);
continue;
}if (!(c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z')) {
if (count != 0) {
java.text.SimpleDateFormat.encode (lastTag, count, compiledPattern);
lastTag = -1;
count = 0;
}if (c.charCodeAt (0) < 128) {
compiledPattern.append (String.fromCharCode (25600 | c.charCodeAt (0)));
} else {
var j;
for (j = i + 1; j < length; j++) {
var d = pattern.charAt (j);
if (d == '\'' || (d >= 'a' && d <= 'z' || d >= 'A' && d <= 'Z')) {
break;
}}
compiledPattern.append (String.fromCharCode (25856 | (j - i)));
for (; i < j; i++) {
compiledPattern.append (pattern.charAt (i));
}
i--;
}continue;
}var tag;
if ((tag = "GyMdkHmsSEDFwWahKzZ".indexOf (c)) == -1) {
throw  new IllegalArgumentException ("Illegal pattern character \'" + c + "'");
}if (lastTag == -1 || lastTag == tag) {
lastTag = tag;
count++;
continue;
}java.text.SimpleDateFormat.encode (lastTag, count, compiledPattern);
lastTag = tag;
count = 1;
}
if (inQuote) {
throw  new IllegalArgumentException ("Unterminated quote");
}if (count != 0) {
java.text.SimpleDateFormat.encode (lastTag, count, compiledPattern);
}var len = compiledPattern.length ();
var r =  Clazz.newCharArray (len, '\0');
compiledPattern.getChars (0, len, r, 0);
return r;
}, "~S");
c$.encode = Clazz.defineMethod (c$, "encode", 
 function (tag, length, buffer) {
if (length < 255) {
buffer.append (String.fromCharCode (tag << 8 | length));
} else {
buffer.append (String.fromCharCode ((tag << 8) | 0xff));
buffer.append (String.fromCharCode (length >>> 16));
buffer.append (String.fromCharCode (length & 0xffff));
}}, "~N,~N,StringBuilder");
Clazz.defineMethod (c$, "initializeDefaultCentury", 
 function () {
this.calendar.setTime ( new java.util.Date ());
this.calendar.add (1, -80);
this.parseAmbiguousDatesAsAfter (this.calendar.getTime ());
});
Clazz.defineMethod (c$, "parseAmbiguousDatesAsAfter", 
 function (startDate) {
this.defaultCenturyStart = startDate;
this.calendar.setTime (startDate);
this.defaultCenturyStartYear = this.calendar.get (1);
}, "java.util.Date");
Clazz.defineMethod (c$, "set2DigitYearStart", 
function (startDate) {
this.parseAmbiguousDatesAsAfter (startDate);
}, "java.util.Date");
Clazz.defineMethod (c$, "get2DigitYearStart", 
function () {
return this.defaultCenturyStart;
});
Clazz.defineMethod (c$, "format", 
function (date, toAppendTo, pos) {
pos.beginIndex = pos.endIndex = 0;
return this.format (date, toAppendTo, pos.getFieldDelegate ());
}, "java.util.Date,StringBuffer,java.text.FieldPosition");
Clazz.defineMethod (c$, "format", 
 function (date, toAppendTo, delegate) {
this.calendar.setTime (date);
var useDateFormatSymbols = this.useDateFormatSymbols ();
for (var i = 0; i < this.compiledPattern.length; ) {
var tag = (this.compiledPattern[i]).charCodeAt (0) >>> 8;
var count = (this.compiledPattern[i++]).charCodeAt (0) & 0xff;
if (count == 255) {
count = (this.compiledPattern[i++]).charCodeAt (0) << 16;
count |= (this.compiledPattern[i++]).charCodeAt (0);
}switch (tag) {
case 100:
toAppendTo.append (String.fromCharCode (count));
break;
case 101:
toAppendTo.append (this.compiledPattern, i, count);
i += count;
break;
default:
this.subFormat (tag, count, delegate, toAppendTo, useDateFormatSymbols);
break;
}
}
return toAppendTo;
}, "java.util.Date,StringBuffer,java.text.Format.FieldDelegate");
Clazz.overrideMethod (c$, "formatToCharacterIterator", 
function (obj) {
var sb =  new StringBuffer ();
var delegate =  new java.text.CharacterIteratorFieldDelegate ();
if (Clazz.instanceOf (obj, java.util.Date)) {
this.format (obj, sb, delegate);
} else if (Clazz.instanceOf (obj, Number)) {
this.format ( new java.util.Date ((obj).longValue ()), sb, delegate);
} else if (obj == null) {
throw  new NullPointerException ("formatToCharacterIterator must be passed non-null object");
} else {
throw  new IllegalArgumentException ("Cannot format given Object as a Date");
}return delegate.getIterator (sb.toString ());
}, "~O");
Clazz.defineMethod (c$, "subFormat", 
 function (patternCharIndex, count, delegate, buffer, useDateFormatSymbols) {
var maxIntCount = 2147483647;
var current = null;
var beginOffset = buffer.length ();
var field = java.text.SimpleDateFormat.PATTERN_INDEX_TO_CALENDAR_FIELD[patternCharIndex];
var value = this.calendar.get (field);
var style = (count >= 4) ? 2 : 1;
if (!useDateFormatSymbols) {
current = this.calendar.getDisplayName (field, style, this.locale);
}switch (patternCharIndex) {
case 0:
if (useDateFormatSymbols) {
var eras = this.formatData.getEras ();
if (value < eras.length) current = eras[value];
}if (current == null) current = "";
break;
case 1:
if (Clazz.instanceOf (this.calendar, java.util.GregorianCalendar)) {
if (count >= 4) this.zeroPaddingNumber (value, count, maxIntCount, buffer);
 else this.zeroPaddingNumber (value, 2, 2, buffer);
} else {
if (current == null) {
this.zeroPaddingNumber (value, style == 2 ? 1 : count, maxIntCount, buffer);
}}break;
case 2:
if (useDateFormatSymbols) {
var months;
if (count >= 4) {
months = this.formatData.getMonths ();
current = months[value];
} else if (count == 3) {
months = this.formatData.getShortMonths ();
current = months[value];
}} else {
if (count < 3) {
current = null;
}}if (current == null) {
this.zeroPaddingNumber (value + 1, count, maxIntCount, buffer);
}break;
case 4:
if (current == null) {
if (value == 0) this.zeroPaddingNumber (this.calendar.getMaximum (11) + 1, count, maxIntCount, buffer);
 else this.zeroPaddingNumber (value, count, maxIntCount, buffer);
}break;
case 9:
if (useDateFormatSymbols) {
var weekdays;
if (count >= 4) {
weekdays = this.formatData.getWeekdays ();
current = weekdays[value];
} else {
weekdays = this.formatData.getShortWeekdays ();
current = weekdays[value];
}}break;
case 14:
if (useDateFormatSymbols) {
var ampm = this.formatData.getAmPmStrings ();
current = ampm[value];
}break;
case 15:
if (current == null) {
if (value == 0) this.zeroPaddingNumber (this.calendar.getLeastMaximum (10) + 1, count, maxIntCount, buffer);
 else this.zeroPaddingNumber (value, count, maxIntCount, buffer);
}break;
case 17:
if (current == null) {
var id = this.calendar.getTimeZone ().getID ();
buffer.append (id);
}break;
case 18:
value = Clazz.doubleToInt ((this.calendar.get (15) + this.calendar.get (16)) / 60000);
var width = 4;
if (value >= 0) {
buffer.append ('+');
} else {
width++;
}var num = (Clazz.doubleToInt (value / 60)) * 100 + (value % 60);
sun.util.calendar.CalendarUtils.sprintf0d (buffer, num, width);
break;
default:
if (current == null) {
this.zeroPaddingNumber (value, count, maxIntCount, buffer);
}break;
}
if (current != null) {
buffer.append (current);
}var fieldID = java.text.SimpleDateFormat.PATTERN_INDEX_TO_DATE_FORMAT_FIELD[patternCharIndex];
var f = java.text.SimpleDateFormat.PATTERN_INDEX_TO_DATE_FORMAT_FIELD_ID[patternCharIndex];
delegate.formatted (fieldID, f, f, beginOffset, buffer.length (), buffer);
}, "~N,~N,java.text.Format.FieldDelegate,StringBuffer,~B");
Clazz.defineMethod (c$, "zeroPaddingNumber", 
 function (value, minDigits, maxDigits, buffer) {
try {
if (this.zeroDigit.charCodeAt (0) == 0) {
this.zeroDigit = (this.numberFormat).getDecimalFormatSymbols ().getZeroDigit ();
}if (value >= 0) {
if (value < 100 && minDigits >= 1 && minDigits <= 2) {
if (value < 10) {
if (minDigits == 2) {
buffer.append (this.zeroDigit);
}buffer.append (String.fromCharCode (this.zeroDigit.charCodeAt (0) + value));
} else {
buffer.append (String.fromCharCode (this.zeroDigit.charCodeAt (0) + Clazz.doubleToInt (value / 10)));
buffer.append (String.fromCharCode (this.zeroDigit.charCodeAt (0) + value % 10));
}return;
} else if (value >= 1000 && value < 10000) {
if (minDigits == 4) {
buffer.append (String.fromCharCode (this.zeroDigit.charCodeAt (0) + Clazz.doubleToInt (value / 1000)));
value %= 1000;
buffer.append (String.fromCharCode (this.zeroDigit.charCodeAt (0) + Clazz.doubleToInt (value / 100)));
value %= 100;
buffer.append (String.fromCharCode (this.zeroDigit.charCodeAt (0) + Clazz.doubleToInt (value / 10)));
buffer.append (String.fromCharCode (this.zeroDigit.charCodeAt (0) + value % 10));
return;
}if (minDigits == 2 && maxDigits == 2) {
this.zeroPaddingNumber (value % 100, 2, 2, buffer);
return;
}}}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
this.numberFormat.setMinimumIntegerDigits (minDigits);
this.numberFormat.setMaximumIntegerDigits (maxDigits);
this.numberFormat.format (value, buffer, java.text.DontCareFieldPosition.INSTANCE);
}, "~N,~N,~N,StringBuffer");
Clazz.defineMethod (c$, "parse", 
function (text, pos) {
{
var i0 = pos.index; pos.index = Math.min(80, text.length()); while
(pos.index >= i0) { var d = new Date(text.substring(i0,
pos.index)); var x = d.getMilliseconds(); if (!isNaN(x))
return d; pos.index--; }
pos.index = i0;
return null;
}}, "~S,java.text.ParsePosition");
Clazz.defineMethod (c$, "getCalendarName", 
 function () {
return this.calendar.getClass ().getName ();
});
Clazz.defineMethod (c$, "useDateFormatSymbols", 
 function () {
if (this.$useDateFormatSymbols) {
return true;
}return this.isGregorianCalendar () || this.locale == null;
});
Clazz.defineMethod (c$, "isGregorianCalendar", 
 function () {
return "java.util.GregorianCalendar".equals (this.getCalendarName ());
});
Clazz.defineMethod (c$, "translatePattern", 
 function (pattern, from, to) {
var result =  new StringBuilder ();
var inQuote = false;
for (var i = 0; i < pattern.length; ++i) {
var c = pattern.charAt (i);
if (inQuote) {
if (c == '\'') inQuote = false;
} else {
if (c == '\'') inQuote = true;
 else if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
var ci = from.indexOf (c);
if (ci == -1) throw  new IllegalArgumentException ("Illegal pattern  character \'" + c + "'");
c = to.charAt (ci);
}}result.append (c);
}
if (inQuote) throw  new IllegalArgumentException ("Unfinished quote in pattern");
return result.toString ();
}, "~S,~S,~S");
Clazz.defineMethod (c$, "toPattern", 
function () {
return this.pattern;
});
Clazz.defineMethod (c$, "toLocalizedPattern", 
function () {
return this.translatePattern (this.pattern, "GyMdkHmsSEDFwWahKzZ", this.formatData.getLocalPatternChars ());
});
Clazz.defineMethod (c$, "applyPattern", 
function (pattern) {
this.compiledPattern = this.compile (pattern);
this.pattern = pattern;
}, "~S");
Clazz.defineMethod (c$, "applyLocalizedPattern", 
function (pattern) {
var p = this.translatePattern (pattern, this.formatData.getLocalPatternChars (), "GyMdkHmsSEDFwWahKzZ");
this.compiledPattern = this.compile (p);
this.pattern = p;
}, "~S");
Clazz.defineMethod (c$, "getDateFormatSymbols", 
function () {
return this.formatData.clone ();
});
Clazz.defineMethod (c$, "setDateFormatSymbols", 
function (newFormatSymbols) {
this.formatData = newFormatSymbols.clone ();
this.$useDateFormatSymbols = true;
}, "java.text.DateFormatSymbols");
Clazz.defineMethod (c$, "clone", 
function () {
var other = Clazz.superCall (this, java.text.SimpleDateFormat, "clone", []);
other.formatData = this.formatData.clone ();
return other;
});
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.pattern.hashCode ();
});
Clazz.defineMethod (c$, "equals", 
function (obj) {
if (!Clazz.superCall (this, java.text.SimpleDateFormat, "equals", [obj])) return false;
var that = obj;
return (this.pattern.equals (that.pattern) && this.formatData.equals (that.formatData));
}, "~O");
Clazz.defineStatics (c$,
"currentSerialVersion", 1,
"TAG_QUOTE_ASCII_CHAR", 100,
"TAG_QUOTE_CHARS", 101,
"millisPerHour", 3600000,
"millisPerMinute", 60000,
"GMT", "GMT");
c$.cachedLocaleData = c$.prototype.cachedLocaleData =  new java.util.Hashtable (3);
c$.cachedNumberFormatData = c$.prototype.cachedNumberFormatData =  new java.util.Hashtable (3);
Clazz.defineStatics (c$,
"PATTERN_INDEX_TO_CALENDAR_FIELD",  Clazz.newIntArray (-1, [0, 1, 2, 5, 11, 11, 12, 13, 14, 7, 6, 8, 3, 4, 9, 10, 10, 15, 15]),
"PATTERN_INDEX_TO_DATE_FORMAT_FIELD",  Clazz.newIntArray (-1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 17]));
c$.PATTERN_INDEX_TO_DATE_FORMAT_FIELD_ID = c$.prototype.PATTERN_INDEX_TO_DATE_FORMAT_FIELD_ID =  Clazz.newArray (-1, [java.text.DateFormat.Field.ERA, java.text.DateFormat.Field.YEAR, java.text.DateFormat.Field.MONTH, java.text.DateFormat.Field.DAY_OF_MONTH, java.text.DateFormat.Field.HOUR_OF_DAY1, java.text.DateFormat.Field.HOUR_OF_DAY0, java.text.DateFormat.Field.MINUTE, java.text.DateFormat.Field.SECOND, java.text.DateFormat.Field.MILLISECOND, java.text.DateFormat.Field.DAY_OF_WEEK, java.text.DateFormat.Field.DAY_OF_YEAR, java.text.DateFormat.Field.DAY_OF_WEEK_IN_MONTH, java.text.DateFormat.Field.WEEK_OF_YEAR, java.text.DateFormat.Field.WEEK_OF_MONTH, java.text.DateFormat.Field.AM_PM, java.text.DateFormat.Field.HOUR1, java.text.DateFormat.Field.HOUR0, java.text.DateFormat.Field.TIME_ZONE, java.text.DateFormat.Field.TIME_ZONE]);
});
