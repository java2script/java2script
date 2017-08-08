Clazz.declarePackage ("java.util");
Clazz.load (["java.util.Hashtable", "sun.util.resources.LocaleData"], "java.util.Calendar", ["java.lang.IllegalArgumentException", "$.InternalError", "$.NullPointerException", "$.StringBuilder", "java.util.Date", "$.HashMap", "java.text.DateFormatSymbols", "java.util.Locale", "$.TimeZone", "sun.util.calendar.ZoneInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fields = null;
this.$isSet = null;
this.stamp = null;
this.time = 0;
this.isTimeSet = false;
this.areFieldsSet = false;
this.areAllFieldsSet = false;
this.lenient = true;
this.zone = null;
this.sharedZone = false;
this.firstDayOfWeek = 0;
this.minimalDaysInFirstWeek = 0;
this.nextStamp = 2;
this.serialVersionOnStream = 1;
Clazz.instantialize (this, arguments);
}, java.util, "Calendar", null, [Cloneable, Comparable]);
Clazz.makeConstructor (c$, 
function () {
this.construct (java.util.TimeZone.getDefaultRef (), java.util.Locale.getDefault ());
this.sharedZone = true;
});
Clazz.makeConstructor (c$, 
function (zone, aLocale) {
this.fields =  Clazz.newIntArray (17, 0);
this.$isSet =  Clazz.newBooleanArray (17, false);
this.stamp =  Clazz.newIntArray (17, 0);
this.zone = zone;
this.setWeekCountData (aLocale);
}, "java.util.TimeZone,java.util.Locale");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function () {
var cal = java.util.Calendar.createCalendar (java.util.TimeZone.getDefaultRef (), java.util.Locale.getDefault ());
cal.sharedZone = true;
return cal;
});
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function (zone) {
return java.util.Calendar.createCalendar (zone, java.util.Locale.getDefault ());
}, "java.util.TimeZone");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function (aLocale) {
var cal = java.util.Calendar.createCalendar (java.util.TimeZone.getDefaultRef (), aLocale);
cal.sharedZone = true;
return cal;
}, "java.util.Locale");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function (zone, aLocale) {
return java.util.Calendar.createCalendar (zone, aLocale);
}, "java.util.TimeZone,java.util.Locale");
c$.createCalendar = Clazz.defineMethod (c$, "createCalendar", 
 function (zone, aLocale) {
return  new java.util.GregorianCalendar (zone, aLocale);
}, "java.util.TimeZone,java.util.Locale");
Clazz.defineMethod (c$, "getTime", 
function () {
return  new java.util.Date (this.getTimeInMillis ());
});
Clazz.defineMethod (c$, "setTime", 
function (date) {
this.setTimeInMillis (date.getTime ());
}, "java.util.Date");
Clazz.defineMethod (c$, "getTimeInMillis", 
function () {
if (!this.isTimeSet) {
this.updateTime ();
}return this.time;
});
Clazz.defineMethod (c$, "setTimeInMillis", 
function (millis) {
if (this.time == millis && this.isTimeSet && this.areFieldsSet && this.areAllFieldsSet && (Clazz.instanceOf (this.zone, sun.util.calendar.ZoneInfo)) && !(this.zone).isDirty ()) {
return;
}this.time = millis;
this.isTimeSet = true;
this.areFieldsSet = false;
this.computeFields ();
this.areAllFieldsSet = this.areFieldsSet = true;
}, "~N");
Clazz.defineMethod (c$, "get", 
function (field) {
this.complete ();
return this.internalGet (field);
}, "~N");
Clazz.defineMethod (c$, "internalGet", 
function (field) {
return this.fields[field];
}, "~N");
Clazz.defineMethod (c$, "internalSet", 
function (field, value) {
this.fields[field] = value;
}, "~N,~N");
Clazz.defineMethod (c$, "set", 
function (field, value) {
if (this.isLenient () && this.areFieldsSet && !this.areAllFieldsSet) {
this.computeFields ();
}this.internalSet (field, value);
this.isTimeSet = false;
this.areFieldsSet = false;
this.$isSet[field] = true;
this.stamp[field] = this.nextStamp++;
if (this.nextStamp == 2147483647) {
this.adjustStamp ();
}}, "~N,~N");
Clazz.defineMethod (c$, "set", 
function (year, month, date) {
this.set (1, year);
this.set (2, month);
this.set (5, date);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "set", 
function (year, month, date, hourOfDay, minute) {
this.set (1, year);
this.set (2, month);
this.set (5, date);
this.set (11, hourOfDay);
this.set (12, minute);
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "set", 
function (year, month, date, hourOfDay, minute, second) {
this.set (1, year);
this.set (2, month);
this.set (5, date);
this.set (11, hourOfDay);
this.set (12, minute);
this.set (13, second);
}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "clear", 
function () {
for (var i = 0; i < this.fields.length; ) {
this.stamp[i] = this.fields[i] = 0;
this.$isSet[i++] = false;
}
this.areAllFieldsSet = this.areFieldsSet = false;
this.isTimeSet = false;
});
Clazz.defineMethod (c$, "clear", 
function (field) {
this.fields[field] = 0;
this.stamp[field] = 0;
this.$isSet[field] = false;
this.areAllFieldsSet = this.areFieldsSet = false;
this.isTimeSet = false;
}, "~N");
Clazz.defineMethod (c$, "isSet", 
function (field) {
return this.stamp[field] != 0;
}, "~N");
Clazz.defineMethod (c$, "getDisplayName", 
function (field, style, locale) {
if (!this.checkDisplayNameParams (field, style, 0, 2, locale, 645)) {
return null;
}var symbols = java.text.DateFormatSymbols.getInstance (locale);
var strings = this.getFieldStrings (field, style, symbols);
if (strings != null) {
var fieldValue = this.get (field);
if (fieldValue < strings.length) {
return strings[fieldValue];
}}return null;
}, "~N,~N,java.util.Locale");
Clazz.defineMethod (c$, "getDisplayNames", 
function (field, style, locale) {
if (!this.checkDisplayNameParams (field, style, 0, 2, locale, 645)) {
return null;
}if (style == 0) {
var shortNames = this.getDisplayNamesImpl (field, 1, locale);
if (field == 0 || field == 9) {
return shortNames;
}var longNames = this.getDisplayNamesImpl (field, 2, locale);
if (shortNames == null) {
return longNames;
}if (longNames != null) {
shortNames.putAll (longNames);
}return shortNames;
}return this.getDisplayNamesImpl (field, style, locale);
}, "~N,~N,java.util.Locale");
Clazz.defineMethod (c$, "getDisplayNamesImpl", 
 function (field, style, locale) {
var symbols = java.text.DateFormatSymbols.getInstance (locale);
var strings = this.getFieldStrings (field, style, symbols);
if (strings != null) {
var names =  new java.util.HashMap ();
for (var i = 0; i < strings.length; i++) {
if (strings[i].length == 0) {
continue;
}names.put (strings[i], new Integer (i));
}
return names;
}return null;
}, "~N,~N,java.util.Locale");
Clazz.defineMethod (c$, "checkDisplayNameParams", 
function (field, style, minStyle, maxStyle, locale, fieldMask) {
if (field < 0 || field >= this.fields.length || style < minStyle || style > maxStyle) {
throw  new IllegalArgumentException ();
}if (locale == null) {
throw  new NullPointerException ();
}return java.util.Calendar.isFieldSet (fieldMask, field);
}, "~N,~N,~N,~N,java.util.Locale,~N");
Clazz.defineMethod (c$, "getFieldStrings", 
 function (field, style, symbols) {
var strings = null;
switch (field) {
case 0:
strings = symbols.getEras ();
break;
case 2:
strings = (style == 2) ? symbols.getMonths () : symbols.getShortMonths ();
break;
case 7:
strings = (style == 2) ? symbols.getWeekdays () : symbols.getShortWeekdays ();
break;
case 9:
strings = symbols.getAmPmStrings ();
break;
}
return strings;
}, "~N,~N,java.text.DateFormatSymbols");
Clazz.defineMethod (c$, "complete", 
function () {
if (!this.isTimeSet) this.updateTime ();
if (!this.areFieldsSet || !this.areAllFieldsSet) {
this.computeFields ();
this.areAllFieldsSet = this.areFieldsSet = true;
}});
Clazz.defineMethod (c$, "isExternallySet", 
function (field) {
return this.stamp[field] >= 2;
}, "~N");
Clazz.defineMethod (c$, "getSetStateFields", 
function () {
var mask = 0;
for (var i = 0; i < this.fields.length; i++) {
if (this.stamp[i] != 0) {
mask |= 1 << i;
}}
return mask;
});
Clazz.defineMethod (c$, "setFieldsComputed", 
function (fieldMask) {
if (fieldMask == 131071) {
for (var i = 0; i < this.fields.length; i++) {
this.stamp[i] = 1;
this.$isSet[i] = true;
}
this.areFieldsSet = this.areAllFieldsSet = true;
} else {
for (var i = 0; i < this.fields.length; i++) {
if ((fieldMask & 1) == 1) {
this.stamp[i] = 1;
this.$isSet[i] = true;
} else {
if (this.areAllFieldsSet && !this.$isSet[i]) {
this.areAllFieldsSet = false;
}}fieldMask >>>= 1;
}
}}, "~N");
Clazz.defineMethod (c$, "setFieldsNormalized", 
function (fieldMask) {
if (fieldMask != 131071) {
for (var i = 0; i < this.fields.length; i++) {
if ((fieldMask & 1) == 0) {
this.stamp[i] = this.fields[i] = 0;
this.$isSet[i] = false;
}fieldMask >>= 1;
}
}this.areFieldsSet = true;
this.areAllFieldsSet = false;
}, "~N");
Clazz.defineMethod (c$, "isPartiallyNormalized", 
function () {
return this.areFieldsSet && !this.areAllFieldsSet;
});
Clazz.defineMethod (c$, "isFullyNormalized", 
function () {
return this.areFieldsSet && this.areAllFieldsSet;
});
Clazz.defineMethod (c$, "setUnnormalized", 
function () {
this.areFieldsSet = this.areAllFieldsSet = false;
});
c$.isFieldSet = Clazz.defineMethod (c$, "isFieldSet", 
function (fieldMask, field) {
return (fieldMask & (1 << field)) != 0;
}, "~N,~N");
Clazz.defineMethod (c$, "selectFields", 
function () {
var fieldMask = 2;
if (this.stamp[0] != 0) {
fieldMask |= 1;
}var dowStamp = this.stamp[7];
var monthStamp = this.stamp[2];
var domStamp = this.stamp[5];
var womStamp = java.util.Calendar.aggregateStamp (this.stamp[4], dowStamp);
var dowimStamp = java.util.Calendar.aggregateStamp (this.stamp[8], dowStamp);
var doyStamp = this.stamp[6];
var woyStamp = java.util.Calendar.aggregateStamp (this.stamp[3], dowStamp);
var bestStamp = domStamp;
if (womStamp > bestStamp) {
bestStamp = womStamp;
}if (dowimStamp > bestStamp) {
bestStamp = dowimStamp;
}if (doyStamp > bestStamp) {
bestStamp = doyStamp;
}if (woyStamp > bestStamp) {
bestStamp = woyStamp;
}if (bestStamp == 0) {
womStamp = this.stamp[4];
dowimStamp = Math.max (this.stamp[8], dowStamp);
woyStamp = this.stamp[3];
bestStamp = Math.max (Math.max (womStamp, dowimStamp), woyStamp);
if (bestStamp == 0) {
bestStamp = domStamp = monthStamp;
}}if (bestStamp == domStamp || (bestStamp == womStamp && this.stamp[4] >= this.stamp[3]) || (bestStamp == dowimStamp && this.stamp[8] >= this.stamp[3])) {
fieldMask |= 4;
if (bestStamp == domStamp) {
fieldMask |= 32;
} else {
if (dowStamp != 0) {
fieldMask |= 128;
}if (womStamp == dowimStamp) {
if (this.stamp[4] >= this.stamp[8]) {
fieldMask |= 16;
} else {
fieldMask |= 256;
}} else {
if (bestStamp == womStamp) {
fieldMask |= 16;
} else {
if (this.stamp[8] != 0) {
fieldMask |= 256;
}}}}} else {
if (bestStamp == doyStamp) {
fieldMask |= 64;
} else {
if (dowStamp != 0) {
fieldMask |= 128;
}fieldMask |= 8;
}}var hourOfDayStamp = this.stamp[11];
var hourStamp = java.util.Calendar.aggregateStamp (this.stamp[10], this.stamp[9]);
bestStamp = (hourStamp > hourOfDayStamp) ? hourStamp : hourOfDayStamp;
if (bestStamp == 0) {
bestStamp = Math.max (this.stamp[10], this.stamp[9]);
}if (bestStamp != 0) {
if (bestStamp == hourOfDayStamp) {
fieldMask |= 2048;
} else {
fieldMask |= 1024;
if (this.stamp[9] != 0) {
fieldMask |= 512;
}}}if (this.stamp[12] != 0) {
fieldMask |= 4096;
}if (this.stamp[13] != 0) {
fieldMask |= 8192;
}if (this.stamp[14] != 0) {
fieldMask |= 16384;
}if (this.stamp[15] >= 2) {
fieldMask |= 32768;
}if (this.stamp[16] >= 2) {
fieldMask |= 65536;
}return fieldMask;
});
c$.aggregateStamp = Clazz.defineMethod (c$, "aggregateStamp", 
 function (stamp_a, stamp_b) {
if (stamp_a == 0 || stamp_b == 0) {
return 0;
}return (stamp_a > stamp_b) ? stamp_a : stamp_b;
}, "~N,~N");
Clazz.defineMethod (c$, "equals", 
function (obj) {
if (this === obj) return true;
try {
var that = obj;
return this.compareTo (java.util.Calendar.getMillisOf (that)) == 0 && this.lenient == that.lenient && this.firstDayOfWeek == that.firstDayOfWeek && this.minimalDaysInFirstWeek == that.minimalDaysInFirstWeek && this.zone.equals (that.zone);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return false;
}, "~O");
Clazz.defineMethod (c$, "hashCode", 
function () {
var otheritems = (this.lenient ? 1 : 0) | (this.firstDayOfWeek << 1) | (this.minimalDaysInFirstWeek << 4) | (this.zone.hashCode () << 7);
var t = java.util.Calendar.getMillisOf (this);
return t ^ (t >> 32) ^ otheritems;
});
Clazz.defineMethod (c$, "before", 
function (when) {
return Clazz.instanceOf (when, java.util.Calendar) && this.compareTo (when) < 0;
}, "~O");
Clazz.defineMethod (c$, "after", 
function (when) {
return Clazz.instanceOf (when, java.util.Calendar) && this.compareTo (when) > 0;
}, "~O");
Clazz.defineMethod (c$, "compareTo", 
function (anotherCalendar) {
return this.compareTo (java.util.Calendar.getMillisOf (anotherCalendar));
}, "java.util.Calendar");
Clazz.defineMethod (c$, "roll", 
function (field, amount) {
while (amount > 0) {
this.roll (field, true);
amount--;
}
while (amount < 0) {
this.roll (field, false);
amount++;
}
}, "~N,~N");
Clazz.defineMethod (c$, "setTimeZone", 
function (value) {
this.zone = value;
this.sharedZone = false;
this.areAllFieldsSet = this.areFieldsSet = false;
}, "java.util.TimeZone");
Clazz.defineMethod (c$, "getTimeZone", 
function () {
if (this.sharedZone) {
this.zone = this.zone.clone ();
this.sharedZone = false;
}return this.zone;
});
Clazz.defineMethod (c$, "getZone", 
function () {
return this.zone;
});
Clazz.defineMethod (c$, "setZoneShared", 
function (shared) {
this.sharedZone = shared;
}, "~B");
Clazz.defineMethod (c$, "setLenient", 
function (lenient) {
this.lenient = lenient;
}, "~B");
Clazz.defineMethod (c$, "isLenient", 
function () {
return this.lenient;
});
Clazz.defineMethod (c$, "setFirstDayOfWeek", 
function (value) {
if (this.firstDayOfWeek == value) {
return;
}this.firstDayOfWeek = value;
this.invalidateWeekFields ();
}, "~N");
Clazz.defineMethod (c$, "getFirstDayOfWeek", 
function () {
return this.firstDayOfWeek;
});
Clazz.defineMethod (c$, "setMinimalDaysInFirstWeek", 
function (value) {
if (this.minimalDaysInFirstWeek == value) {
return;
}this.minimalDaysInFirstWeek = value;
this.invalidateWeekFields ();
}, "~N");
Clazz.defineMethod (c$, "getMinimalDaysInFirstWeek", 
function () {
return this.minimalDaysInFirstWeek;
});
Clazz.defineMethod (c$, "getActualMinimum", 
function (field) {
var fieldValue = this.getGreatestMinimum (field);
var endValue = this.getMinimum (field);
if (fieldValue == endValue) {
return fieldValue;
}var work = this.clone ();
work.setLenient (true);
var result = fieldValue;
do {
work.set (field, fieldValue);
if (work.get (field) != fieldValue) {
break;
} else {
result = fieldValue;
fieldValue--;
}} while (fieldValue >= endValue);
return result;
}, "~N");
Clazz.defineMethod (c$, "getActualMaximum", 
function (field) {
var fieldValue = this.getLeastMaximum (field);
var endValue = this.getMaximum (field);
if (fieldValue == endValue) {
return fieldValue;
}var work = this.clone ();
work.setLenient (true);
if (field == 3 || field == 4) work.set (7, this.firstDayOfWeek);
var result = fieldValue;
do {
work.set (field, fieldValue);
if (work.get (field) != fieldValue) {
break;
} else {
result = fieldValue;
fieldValue++;
}} while (fieldValue <= endValue);
return result;
}, "~N");
Clazz.defineMethod (c$, "clone", 
function () {
try {
var other = Clazz.superCall (this, java.util.Calendar, "clone", []);
other.fields =  Clazz.newIntArray (17, 0);
other.$isSet =  Clazz.newBooleanArray (17, false);
other.stamp =  Clazz.newIntArray (17, 0);
for (var i = 0; i < 17; i++) {
other.fields[i] = this.fields[i];
other.stamp[i] = this.stamp[i];
other.$isSet[i] = this.$isSet[i];
}
other.zone = this.zone.clone ();
return other;
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
throw  new InternalError ();
} else {
throw e;
}
}
});
c$.getFieldName = Clazz.defineMethod (c$, "getFieldName", 
function (field) {
return java.util.Calendar.FIELD_NAME[field];
}, "~N");
Clazz.overrideMethod (c$, "toString", 
function () {
var buffer =  new StringBuilder (800);
buffer.append (this.getClass ().getName ()).append ('[');
java.util.Calendar.appendValue (buffer, "time", this.isTimeSet, this.time);
buffer.append (",areFieldsSet=").append (this.areFieldsSet);
buffer.append (",areAllFieldsSet=").append (this.areAllFieldsSet);
buffer.append (",lenient=").append (this.lenient);
buffer.append (",zone=").append (this.zone);
java.util.Calendar.appendValue (buffer, ",firstDayOfWeek", true, this.firstDayOfWeek);
java.util.Calendar.appendValue (buffer, ",minimalDaysInFirstWeek", true, this.minimalDaysInFirstWeek);
for (var i = 0; i < 17; ++i) {
buffer.append (',');
java.util.Calendar.appendValue (buffer, java.util.Calendar.FIELD_NAME[i], this.isSet (i), this.fields[i]);
}
buffer.append (']');
return buffer.toString ();
});
c$.appendValue = Clazz.defineMethod (c$, "appendValue", 
 function (sb, item, valid, value) {
sb.append (item).append ('=');
if (valid) {
sb.append (value);
} else {
sb.append ('?');
}}, "StringBuilder,~S,~B,~N");
Clazz.defineMethod (c$, "setWeekCountData", 
 function (desiredLocale) {
var data = java.util.Calendar.cachedLocaleData.get (desiredLocale);
if (data == null) {
var bundle = sun.util.resources.LocaleData.getCalendarData (desiredLocale);
data =  Clazz.newIntArray (2, 0);
data[0] = Integer.parseInt (bundle.getString ("firstDayOfWeek"));
data[1] = Integer.parseInt (bundle.getString ("minimalDaysInFirstWeek"));
java.util.Calendar.cachedLocaleData.put (desiredLocale, data);
}this.firstDayOfWeek = data[0];
this.minimalDaysInFirstWeek = data[1];
}, "java.util.Locale");
Clazz.defineMethod (c$, "updateTime", 
 function () {
this.computeTime ();
this.isTimeSet = true;
});
Clazz.defineMethod (c$, "compareTo", 
 function (t) {
var thisTime = java.util.Calendar.getMillisOf (this);
return (thisTime > t) ? 1 : (thisTime == t) ? 0 : -1;
}, "~N");
c$.getMillisOf = Clazz.defineMethod (c$, "getMillisOf", 
 function (calendar) {
if (calendar.isTimeSet) {
return calendar.time;
}var cal = calendar.clone ();
cal.setLenient (true);
return cal.getTimeInMillis ();
}, "java.util.Calendar");
Clazz.defineMethod (c$, "adjustStamp", 
 function () {
var max = 2;
var newStamp = 2;
for (; ; ) {
var min = 2147483647;
for (var i = 0; i < this.stamp.length; i++) {
var v = this.stamp[i];
if (v >= newStamp && min > v) {
min = v;
}if (max < v) {
max = v;
}}
if (max != min && min == 2147483647) {
break;
}for (var i = 0; i < this.stamp.length; i++) {
if (this.stamp[i] == min) {
this.stamp[i] = newStamp;
}}
newStamp++;
if (min == max) {
break;
}}
this.nextStamp = newStamp;
});
Clazz.defineMethod (c$, "invalidateWeekFields", 
 function () {
if (this.stamp[4] != 1 && this.stamp[3] != 1) {
return;
}var cal = this.clone ();
cal.setLenient (true);
cal.clear (4);
cal.clear (3);
if (this.stamp[4] == 1) {
var weekOfMonth = cal.get (4);
if (this.fields[4] != weekOfMonth) {
this.fields[4] = weekOfMonth;
}}if (this.stamp[3] == 1) {
var weekOfYear = cal.get (3);
if (this.fields[3] != weekOfYear) {
this.fields[3] = weekOfYear;
}}});
Clazz.defineStatics (c$,
"ERA", 0,
"YEAR", 1,
"MONTH", 2,
"WEEK_OF_YEAR", 3,
"WEEK_OF_MONTH", 4,
"DATE", 5,
"DAY_OF_MONTH", 5,
"DAY_OF_YEAR", 6,
"DAY_OF_WEEK", 7,
"DAY_OF_WEEK_IN_MONTH", 8,
"AM_PM", 9,
"HOUR", 10,
"HOUR_OF_DAY", 11,
"MINUTE", 12,
"SECOND", 13,
"MILLISECOND", 14,
"ZONE_OFFSET", 15,
"DST_OFFSET", 16,
"FIELD_COUNT", 17,
"SUNDAY", 1,
"MONDAY", 2,
"TUESDAY", 3,
"WEDNESDAY", 4,
"THURSDAY", 5,
"FRIDAY", 6,
"SATURDAY", 7,
"JANUARY", 0,
"FEBRUARY", 1,
"MARCH", 2,
"APRIL", 3,
"MAY", 4,
"JUNE", 5,
"JULY", 6,
"AUGUST", 7,
"SEPTEMBER", 8,
"OCTOBER", 9,
"NOVEMBER", 10,
"DECEMBER", 11,
"UNDECIMBER", 12,
"AM", 0,
"PM", 1,
"ALL_STYLES", 0,
"SHORT", 1,
"LONG", 2);
c$.cachedLocaleData = c$.prototype.cachedLocaleData =  new java.util.Hashtable (3);
Clazz.defineStatics (c$,
"UNSET", 0,
"COMPUTED", 1,
"MINIMUM_USER_STAMP", 2,
"ALL_FIELDS", 131071,
"currentSerialVersion", 1,
"ERA_MASK", (1),
"YEAR_MASK", (2),
"MONTH_MASK", (4),
"WEEK_OF_YEAR_MASK", (8),
"WEEK_OF_MONTH_MASK", (16),
"DAY_OF_MONTH_MASK", (32),
"DATE_MASK", 32,
"DAY_OF_YEAR_MASK", (64),
"DAY_OF_WEEK_MASK", (128),
"DAY_OF_WEEK_IN_MONTH_MASK", (256),
"AM_PM_MASK", (512),
"HOUR_MASK", (1024),
"HOUR_OF_DAY_MASK", (2048),
"MINUTE_MASK", (4096),
"SECOND_MASK", (8192),
"MILLISECOND_MASK", (16384),
"ZONE_OFFSET_MASK", (32768),
"DST_OFFSET_MASK", (65536),
"FIELD_NAME",  Clazz.newArray (-1, ["ERA", "YEAR", "MONTH", "WEEK_OF_YEAR", "WEEK_OF_MONTH", "DAY_OF_MONTH", "DAY_OF_YEAR", "DAY_OF_WEEK", "DAY_OF_WEEK_IN_MONTH", "AM_PM", "HOUR", "HOUR_OF_DAY", "MINUTE", "SECOND", "MILLISECOND", "ZONE_OFFSET", "DST_OFFSET"]));
});
