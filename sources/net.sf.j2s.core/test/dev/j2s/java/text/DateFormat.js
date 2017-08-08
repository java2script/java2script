Clazz.declarePackage ("java.text");
Clazz.load (["java.text.Format", "java.util.HashMap"], "java.text.DateFormat", ["java.io.InvalidObjectException", "java.lang.IllegalArgumentException", "$.Number", "$.StringBuffer", "java.util.Date", "java.text.DontCareFieldPosition", "$.ParseException", "$.ParsePosition", "java.util.Locale"], function () {
c$ = Clazz.decorateAsClass (function () {
this.calendar = null;
this.numberFormat = null;
Clazz.instantialize (this, arguments);
}, java.text, "DateFormat", java.text.Format);
Clazz.defineMethod (c$, "format", 
function (obj, toAppendTo, fieldPosition) {
if (Clazz.instanceOf (obj, java.util.Date)) return this.format (obj, toAppendTo, fieldPosition);
 else if (Clazz.instanceOf (obj, Number)) return this.format ( new java.util.Date ((obj).longValue ()), toAppendTo, fieldPosition);
 else throw  new IllegalArgumentException ("Cannot format given Object as a Date");
}, "~O,StringBuffer,java.text.FieldPosition");
Clazz.defineMethod (c$, "format", 
function (date) {
return this.format (date,  new StringBuffer (), java.text.DontCareFieldPosition.INSTANCE).toString ();
}, "java.util.Date");
Clazz.defineMethod (c$, "parse", 
function (source) {
var pos =  new java.text.ParsePosition (0);
var result = this.parse (source, pos);
if (pos.index == 0) throw  new java.text.ParseException ("Unparseable date: \"" + source + "\"", pos.errorIndex);
return result;
}, "~S");
Clazz.defineMethod (c$, "parseObject", 
function (source, pos) {
return this.parse (source, pos);
}, "~S,java.text.ParsePosition");
c$.getTimeInstance = Clazz.defineMethod (c$, "getTimeInstance", 
function () {
return java.text.DateFormat.get (2, 0, 1, java.util.Locale.getDefault ());
});
c$.getTimeInstance = Clazz.defineMethod (c$, "getTimeInstance", 
function (style) {
return java.text.DateFormat.get (style, 0, 1, java.util.Locale.getDefault ());
}, "~N");
c$.getTimeInstance = Clazz.defineMethod (c$, "getTimeInstance", 
function (style, aLocale) {
return java.text.DateFormat.get (style, 0, 1, aLocale);
}, "~N,java.util.Locale");
c$.getDateInstance = Clazz.defineMethod (c$, "getDateInstance", 
function () {
return java.text.DateFormat.get (0, 2, 2, java.util.Locale.getDefault ());
});
c$.getDateInstance = Clazz.defineMethod (c$, "getDateInstance", 
function (style) {
return java.text.DateFormat.get (0, style, 2, java.util.Locale.getDefault ());
}, "~N");
c$.getDateInstance = Clazz.defineMethod (c$, "getDateInstance", 
function (style, aLocale) {
return java.text.DateFormat.get (0, style, 2, aLocale);
}, "~N,java.util.Locale");
c$.getDateTimeInstance = Clazz.defineMethod (c$, "getDateTimeInstance", 
function () {
return java.text.DateFormat.get (2, 2, 3, java.util.Locale.getDefault ());
});
c$.getDateTimeInstance = Clazz.defineMethod (c$, "getDateTimeInstance", 
function (dateStyle, timeStyle) {
return java.text.DateFormat.get (timeStyle, dateStyle, 3, java.util.Locale.getDefault ());
}, "~N,~N");
c$.getDateTimeInstance = Clazz.defineMethod (c$, "getDateTimeInstance", 
function (dateStyle, timeStyle, aLocale) {
return java.text.DateFormat.get (timeStyle, dateStyle, 3, aLocale);
}, "~N,~N,java.util.Locale");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function () {
return java.text.DateFormat.getDateTimeInstance (3, 3);
});
Clazz.defineMethod (c$, "setCalendar", 
function (newCalendar) {
this.calendar = newCalendar;
}, "java.util.Calendar");
Clazz.defineMethod (c$, "getCalendar", 
function () {
return this.calendar;
});
Clazz.defineMethod (c$, "setNumberFormat", 
function (newNumberFormat) {
this.numberFormat = newNumberFormat;
}, "java.text.NumberFormat");
Clazz.defineMethod (c$, "getNumberFormat", 
function () {
return this.numberFormat;
});
Clazz.defineMethod (c$, "setTimeZone", 
function (zone) {
this.calendar.setTimeZone (zone);
}, "java.util.TimeZone");
Clazz.defineMethod (c$, "getTimeZone", 
function () {
return this.calendar.getTimeZone ();
});
Clazz.defineMethod (c$, "setLenient", 
function (lenient) {
this.calendar.setLenient (lenient);
}, "~B");
Clazz.defineMethod (c$, "isLenient", 
function () {
return this.calendar.isLenient ();
});
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.numberFormat.hashCode ();
});
Clazz.defineMethod (c$, "equals", 
function (obj) {
if (this === obj) return true;
if (obj == null || this.getClass () !== obj.getClass ()) return false;
var other = obj;
return (this.calendar.getFirstDayOfWeek () == other.calendar.getFirstDayOfWeek () && this.calendar.getMinimalDaysInFirstWeek () == other.calendar.getMinimalDaysInFirstWeek () && this.calendar.isLenient () == other.calendar.isLenient () && this.calendar.getTimeZone ().equals (other.calendar.getTimeZone ()) && this.numberFormat.equals (other.numberFormat));
}, "~O");
Clazz.defineMethod (c$, "clone", 
function () {
var other = Clazz.superCall (this, java.text.DateFormat, "clone", []);
other.calendar = this.calendar.clone ();
other.numberFormat = this.numberFormat.clone ();
return other;
});
c$.get = Clazz.defineMethod (c$, "get", 
 function (timeStyle, dateStyle, flags, loc) {
if ((flags & 1) != 0) {
if (timeStyle < 0 || timeStyle > 3) {
throw  new IllegalArgumentException ("Illegal time style " + timeStyle);
}} else {
timeStyle = -1;
}if ((flags & 2) != 0) {
if (dateStyle < 0 || dateStyle > 3) {
throw  new IllegalArgumentException ("Illegal date style " + dateStyle);
}} else {
dateStyle = -1;
}try {
return  new java.text.SimpleDateFormat (timeStyle, dateStyle, loc);
} catch (e) {
if (Clazz.exceptionOf (e, java.util.MissingResourceException)) {
return  new java.text.SimpleDateFormat ("M/d/yy h:mm a");
} else {
throw e;
}
}
}, "~N,~N,~N,java.util.Locale");
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.text.DateFormat, []);
});
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.calendarField = 0;
Clazz.instantialize (this, arguments);
}, java.text.DateFormat, "Field", java.text.Format.Field);
c$.ofCalendarField = Clazz.defineMethod (c$, "ofCalendarField", 
function (a) {
if (a < 0 || a >= java.text.DateFormat.Field.calendarToFieldMapping.length) {
throw  new IllegalArgumentException ("Unknown Calendar constant " + a);
}return java.text.DateFormat.Field.calendarToFieldMapping[a];
}, "~N");
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, java.text.DateFormat.Field, [a]);
this.calendarField = b;
if (this.getClass () === java.text.DateFormat.Field) {
java.text.DateFormat.Field.$instanceMap.put (a, this);
if (b >= 0) {
java.text.DateFormat.Field.calendarToFieldMapping[b] = this;
}}}, "~S,~N");
Clazz.defineMethod (c$, "getCalendarField", 
function () {
return this.calendarField;
});
Clazz.overrideMethod (c$, "readResolve", 
function () {
if (this.getClass () !== java.text.DateFormat.Field) {
throw  new java.io.InvalidObjectException ("subclass didn't correctly implement readResolve");
}var a = java.text.DateFormat.Field.$instanceMap.get (this.getName ());
if (a != null) {
return a;
} else {
throw  new java.io.InvalidObjectException ("unknown attribute name");
}});
c$.$instanceMap = c$.prototype.$instanceMap =  new java.util.HashMap (18);
c$.calendarToFieldMapping = c$.prototype.calendarToFieldMapping =  new Array (17);
c$.ERA = c$.prototype.ERA =  new java.text.DateFormat.Field ("era", 0);
c$.YEAR = c$.prototype.YEAR =  new java.text.DateFormat.Field ("year", 1);
c$.MONTH = c$.prototype.MONTH =  new java.text.DateFormat.Field ("month", 2);
c$.DAY_OF_MONTH = c$.prototype.DAY_OF_MONTH =  new java.text.DateFormat.Field ("day of month", 5);
c$.HOUR_OF_DAY1 = c$.prototype.HOUR_OF_DAY1 =  new java.text.DateFormat.Field ("hour of day 1", -1);
c$.HOUR_OF_DAY0 = c$.prototype.HOUR_OF_DAY0 =  new java.text.DateFormat.Field ("hour of day", 11);
c$.MINUTE = c$.prototype.MINUTE =  new java.text.DateFormat.Field ("minute", 12);
c$.SECOND = c$.prototype.SECOND =  new java.text.DateFormat.Field ("second", 13);
c$.MILLISECOND = c$.prototype.MILLISECOND =  new java.text.DateFormat.Field ("millisecond", 14);
c$.DAY_OF_WEEK = c$.prototype.DAY_OF_WEEK =  new java.text.DateFormat.Field ("day of week", 7);
c$.DAY_OF_YEAR = c$.prototype.DAY_OF_YEAR =  new java.text.DateFormat.Field ("day of year", 6);
c$.DAY_OF_WEEK_IN_MONTH = c$.prototype.DAY_OF_WEEK_IN_MONTH =  new java.text.DateFormat.Field ("day of week in month", 8);
c$.WEEK_OF_YEAR = c$.prototype.WEEK_OF_YEAR =  new java.text.DateFormat.Field ("week of year", 3);
c$.WEEK_OF_MONTH = c$.prototype.WEEK_OF_MONTH =  new java.text.DateFormat.Field ("week of month", 4);
c$.AM_PM = c$.prototype.AM_PM =  new java.text.DateFormat.Field ("am pm", 9);
c$.HOUR1 = c$.prototype.HOUR1 =  new java.text.DateFormat.Field ("hour 1", -1);
c$.HOUR0 = c$.prototype.HOUR0 =  new java.text.DateFormat.Field ("hour", 10);
c$.TIME_ZONE = c$.prototype.TIME_ZONE =  new java.text.DateFormat.Field ("time zone", -1);
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"ERA_FIELD", 0,
"YEAR_FIELD", 1,
"MONTH_FIELD", 2,
"DATE_FIELD", 3,
"HOUR_OF_DAY1_FIELD", 4,
"HOUR_OF_DAY0_FIELD", 5,
"MINUTE_FIELD", 6,
"SECOND_FIELD", 7,
"MILLISECOND_FIELD", 8,
"DAY_OF_WEEK_FIELD", 9,
"DAY_OF_YEAR_FIELD", 10,
"DAY_OF_WEEK_IN_MONTH_FIELD", 11,
"WEEK_OF_YEAR_FIELD", 12,
"WEEK_OF_MONTH_FIELD", 13,
"AM_PM_FIELD", 14,
"HOUR1_FIELD", 15,
"HOUR0_FIELD", 16,
"TIMEZONE_FIELD", 17,
"FULL", 0,
"LONG", 1,
"MEDIUM", 2,
"SHORT", 3,
"DEFAULT", 2);
});
