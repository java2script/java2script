Clazz.declarePackage ("java.util");
Clazz.load (["java.util.TimeZone", "sun.util.calendar.Gregorian"], "java.util.SimpleTimeZone", ["java.lang.IllegalArgumentException", "sun.util.calendar.CalendarSystem", "$.CalendarUtils"], function () {
c$ = Clazz.decorateAsClass (function () {
this.startMonth = 0;
this.startDay = 0;
this.startDayOfWeek = 0;
this.startTime = 0;
this.startTimeMode = 0;
this.endMonth = 0;
this.endDay = 0;
this.endDayOfWeek = 0;
this.endTime = 0;
this.endTimeMode = 0;
this.startYear = 0;
this.rawOffset = 0;
this.useDaylight = false;
this.monthLength = null;
this.startMode = 0;
this.endMode = 0;
this.dstSavings = 0;
this.cacheYear = 0;
this.cacheStart = 0;
this.cacheEnd = 0;
this.serialVersionOnStream = 2;
Clazz.instantialize (this, arguments);
}, java.util, "SimpleTimeZone", java.util.TimeZone);
Clazz.prepareFields (c$, function () {
this.monthLength = java.util.SimpleTimeZone.staticMonthLength;
});
Clazz.makeConstructor (c$, 
function (rawOffset, ID) {
Clazz.superConstructor (this, java.util.SimpleTimeZone, []);
this.rawOffset = rawOffset;
this.setID (ID);
this.dstSavings = 3600000;
}, "~N,~S");
Clazz.makeConstructor (c$, 
function (rawOffset, ID, startMonth, startDay, startDayOfWeek, startTime, endMonth, endDay, endDayOfWeek, endTime) {
this.construct (rawOffset, ID, startMonth, startDay, startDayOfWeek, startTime, 0, endMonth, endDay, endDayOfWeek, endTime, 0, 3600000);
}, "~N,~S,~N,~N,~N,~N,~N,~N,~N,~N");
Clazz.makeConstructor (c$, 
function (rawOffset, ID, startMonth, startDay, startDayOfWeek, startTime, endMonth, endDay, endDayOfWeek, endTime, dstSavings) {
this.construct (rawOffset, ID, startMonth, startDay, startDayOfWeek, startTime, 0, endMonth, endDay, endDayOfWeek, endTime, 0, dstSavings);
}, "~N,~S,~N,~N,~N,~N,~N,~N,~N,~N,~N");
Clazz.makeConstructor (c$, 
function (rawOffset, ID, startMonth, startDay, startDayOfWeek, startTime, startTimeMode, endMonth, endDay, endDayOfWeek, endTime, endTimeMode, dstSavings) {
Clazz.superConstructor (this, java.util.SimpleTimeZone, []);
this.setID (ID);
this.rawOffset = rawOffset;
this.startMonth = startMonth;
this.startDay = startDay;
this.startDayOfWeek = startDayOfWeek;
this.startTime = startTime;
this.startTimeMode = startTimeMode;
this.endMonth = endMonth;
this.endDay = endDay;
this.endDayOfWeek = endDayOfWeek;
this.endTime = endTime;
this.endTimeMode = endTimeMode;
this.dstSavings = dstSavings;
this.decodeRules ();
if (dstSavings <= 0) {
throw  new IllegalArgumentException ("Illegal daylight saving value: " + dstSavings);
}}, "~N,~S,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "setStartYear", 
function (year) {
this.startYear = year;
this.invalidateCache ();
}, "~N");
Clazz.defineMethod (c$, "setStartRule", 
function (startMonth, startDay, startDayOfWeek, startTime) {
this.startMonth = startMonth;
this.startDay = startDay;
this.startDayOfWeek = startDayOfWeek;
this.startTime = startTime;
this.startTimeMode = 0;
this.decodeStartRule ();
this.invalidateCache ();
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setStartRule", 
function (startMonth, startDay, startTime) {
this.setStartRule (startMonth, startDay, 0, startTime);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "setStartRule", 
function (startMonth, startDay, startDayOfWeek, startTime, after) {
if (after) {
this.setStartRule (startMonth, startDay, -startDayOfWeek, startTime);
} else {
this.setStartRule (startMonth, -startDay, -startDayOfWeek, startTime);
}}, "~N,~N,~N,~N,~B");
Clazz.defineMethod (c$, "setEndRule", 
function (endMonth, endDay, endDayOfWeek, endTime) {
this.endMonth = endMonth;
this.endDay = endDay;
this.endDayOfWeek = endDayOfWeek;
this.endTime = endTime;
this.endTimeMode = 0;
this.decodeEndRule ();
this.invalidateCache ();
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setEndRule", 
function (endMonth, endDay, endTime) {
this.setEndRule (endMonth, endDay, 0, endTime);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "setEndRule", 
function (endMonth, endDay, endDayOfWeek, endTime, after) {
if (after) {
this.setEndRule (endMonth, endDay, -endDayOfWeek, endTime);
} else {
this.setEndRule (endMonth, -endDay, -endDayOfWeek, endTime);
}}, "~N,~N,~N,~N,~B");
Clazz.defineMethod (c$, "getOffset", 
function (date) {
return this.getOffsets (date, null);
}, "~N");
Clazz.overrideMethod (c$, "getOffsets", 
function (date, offsets) {
var offset = this.rawOffset;
computeOffset : if (this.useDaylight) {
{
if (this.cacheStart != 0) {
if (date >= this.cacheStart && date < this.cacheEnd) {
offset += this.dstSavings;
break computeOffset;
}}}var cal = date >= -12219292800000 ? this.getGcal () : sun.util.calendar.CalendarSystem.forName ("julian");
var cdate = cal.newCalendarDate (java.util.TimeZone.NO_TIMEZONE);
cal.getCalendarDate (date + this.rawOffset, cdate);
var year = cdate.getNormalizedYear ();
if (year >= this.startYear) {
cdate.setTimeOfDay (0, 0, 0, 0);
offset = this.getOffset (cal, cdate, year, date);
}}if (offsets != null) {
offsets[0] = this.rawOffset;
offsets[1] = offset - this.rawOffset;
}return offset;
}, "~N,~A");
Clazz.defineMethod (c$, "getGcal", 
 function () {
return (java.util.SimpleTimeZone.gcal == null ? (java.util.SimpleTimeZone.gcal = sun.util.calendar.CalendarSystem.getGregorianCalendar ()) : java.util.SimpleTimeZone.gcal);
});
Clazz.defineMethod (c$, "getOffset", 
function (era, year, month, day, dayOfWeek, millis) {
if (era != 1 && era != 0) {
throw  new IllegalArgumentException ("Illegal era " + era);
}var y = year;
if (era == 0) {
y = 1 - y;
}if (y >= 292278994) {
y = 2800 + y % 2800;
} else if (y <= -292269054) {
y = sun.util.calendar.CalendarUtils.mod (y, 28);
}var m = month + 1;
var cal = this.getGcal ();
var cdate = cal.newCalendarDate (java.util.TimeZone.NO_TIMEZONE);
cdate.setDate (y, m, day);
var time = cal.getTime (cdate);
time += millis - this.rawOffset;
if (time < -12219292800000) {
cal = sun.util.calendar.CalendarSystem.forName ("julian");
cdate = cal.newCalendarDate (java.util.TimeZone.NO_TIMEZONE);
cdate.setNormalizedDate (y, m, day);
time = cal.getTime (cdate) + millis - this.rawOffset;
}if ((cdate.getNormalizedYear () != y) || (cdate.getMonth () != m) || (cdate.getDayOfMonth () != day) || (dayOfWeek < 1 || dayOfWeek > 7) || (millis < 0 || millis >= (86400000))) {
throw  new IllegalArgumentException ();
}if (!this.useDaylight || year < this.startYear || era != 1) {
return this.rawOffset;
}return this.getOffset (cal, cdate, y, time);
}, "~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getOffset", 
 function (cal, cdate, year, time) {
{
if (this.cacheStart != 0) {
if (time >= this.cacheStart && time < this.cacheEnd) {
return this.rawOffset + this.dstSavings;
}if (year == this.cacheYear) {
return this.rawOffset;
}}}var start = this.getStart (cal, cdate, year);
var end = this.getEnd (cal, cdate, year);
var offset = this.rawOffset;
if (start <= end) {
if (time >= start && time < end) {
offset += this.dstSavings;
}{
this.cacheYear = year;
this.cacheStart = start;
this.cacheEnd = end;
}} else {
if (time < end) {
start = this.getStart (cal, cdate, year - 1);
if (time >= start) {
offset += this.dstSavings;
}} else if (time >= start) {
end = this.getEnd (cal, cdate, year + 1);
if (time < end) {
offset += this.dstSavings;
}}if (start <= end) {
{
this.cacheYear = this.startYear - 1;
this.cacheStart = start;
this.cacheEnd = end;
}}}return offset;
}, "sun.util.calendar.BaseCalendar,sun.util.calendar.BaseCalendar.Date,~N,~N");
Clazz.defineMethod (c$, "getStart", 
 function (cal, cdate, year) {
var time = this.startTime;
if (this.startTimeMode != 2) {
time -= this.rawOffset;
}return this.getTransition (cal, cdate, this.startMode, year, this.startMonth, this.startDay, this.startDayOfWeek, time);
}, "sun.util.calendar.BaseCalendar,sun.util.calendar.BaseCalendar.Date,~N");
Clazz.defineMethod (c$, "getEnd", 
 function (cal, cdate, year) {
var time = this.endTime;
if (this.endTimeMode != 2) {
time -= this.rawOffset;
}if (this.endTimeMode == 0) {
time -= this.dstSavings;
}return this.getTransition (cal, cdate, this.endMode, year, this.endMonth, this.endDay, this.endDayOfWeek, time);
}, "sun.util.calendar.BaseCalendar,sun.util.calendar.BaseCalendar.Date,~N");
Clazz.defineMethod (c$, "getTransition", 
 function (cal, cdate, mode, year, month, dayOfMonth, dayOfWeek, timeOfDay) {
cdate.setNormalizedYear (year);
cdate.setMonth (month + 1);
switch (mode) {
case 1:
cdate.setDayOfMonth (dayOfMonth);
break;
case 2:
cdate.setDayOfMonth (1);
if (dayOfMonth < 0) {
cdate.setDayOfMonth (cal.getMonthLength (cdate));
}cdate = cal.getNthDayOfWeek (dayOfMonth, dayOfWeek, cdate);
break;
case 3:
cdate.setDayOfMonth (dayOfMonth);
cdate = cal.getNthDayOfWeek (1, dayOfWeek, cdate);
break;
case 4:
cdate.setDayOfMonth (dayOfMonth);
cdate = cal.getNthDayOfWeek (-1, dayOfWeek, cdate);
break;
}
return cal.getTime (cdate) + timeOfDay;
}, "sun.util.calendar.BaseCalendar,sun.util.calendar.BaseCalendar.Date,~N,~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "getRawOffset", 
function () {
return this.rawOffset;
});
Clazz.overrideMethod (c$, "setRawOffset", 
function (offsetMillis) {
this.rawOffset = offsetMillis;
}, "~N");
Clazz.defineMethod (c$, "setDSTSavings", 
function (millisSavedDuringDST) {
if (millisSavedDuringDST <= 0) {
throw  new IllegalArgumentException ("Illegal daylight saving value: " + millisSavedDuringDST);
}this.dstSavings = millisSavedDuringDST;
}, "~N");
Clazz.overrideMethod (c$, "getDSTSavings", 
function () {
if (this.useDaylight) {
return this.dstSavings;
}return 0;
});
Clazz.overrideMethod (c$, "useDaylightTime", 
function () {
return this.useDaylight;
});
Clazz.overrideMethod (c$, "inDaylightTime", 
function (date) {
return (this.getOffset (date.getTime ()) != this.rawOffset);
}, "java.util.Date");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.startMonth ^ this.startDay ^ this.startDayOfWeek ^ this.startTime ^ this.endMonth ^ this.endDay ^ this.endDayOfWeek ^ this.endTime ^ this.rawOffset;
});
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (this === obj) {
return true;
}if (!(Clazz.instanceOf (obj, java.util.SimpleTimeZone))) {
return false;
}var that = obj;
return this.getID ().equals (that.getID ()) && this.hasSameRules (that);
}, "~O");
Clazz.overrideMethod (c$, "hasSameRules", 
function (other) {
if (this === other) {
return true;
}if (!(Clazz.instanceOf (other, java.util.SimpleTimeZone))) {
return false;
}var that = other;
return this.rawOffset == that.rawOffset && this.useDaylight == that.useDaylight && (!this.useDaylight || (this.dstSavings == that.dstSavings && this.startMode == that.startMode && this.startMonth == that.startMonth && this.startDay == that.startDay && this.startDayOfWeek == that.startDayOfWeek && this.startTime == that.startTime && this.startTimeMode == that.startTimeMode && this.endMode == that.endMode && this.endMonth == that.endMonth && this.endDay == that.endDay && this.endDayOfWeek == that.endDayOfWeek && this.endTime == that.endTime && this.endTimeMode == that.endTimeMode && this.startYear == that.startYear));
}, "java.util.TimeZone");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getClass ().getName () + "[id=" + this.getID () + ",offset=" + this.rawOffset + ",dstSavings=" + this.dstSavings + ",useDaylight=" + this.useDaylight + ",startYear=" + this.startYear + ",startMode=" + this.startMode + ",startMonth=" + this.startMonth + ",startDay=" + this.startDay + ",startDayOfWeek=" + this.startDayOfWeek + ",startTime=" + this.startTime + ",startTimeMode=" + this.startTimeMode + ",endMode=" + this.endMode + ",endMonth=" + this.endMonth + ",endDay=" + this.endDay + ",endDayOfWeek=" + this.endDayOfWeek + ",endTime=" + this.endTime + ",endTimeMode=" + this.endTimeMode + ']';
});
Clazz.defineMethod (c$, "invalidateCache", 
 function () {
this.cacheYear = this.startYear - 1;
this.cacheStart = this.cacheEnd = 0;
});
Clazz.defineMethod (c$, "decodeRules", 
 function () {
this.decodeStartRule ();
this.decodeEndRule ();
});
Clazz.defineMethod (c$, "decodeStartRule", 
 function () {
this.useDaylight = (this.startDay != 0) && (this.endDay != 0);
if (this.startDay != 0) {
if (this.startMonth < 0 || this.startMonth > 11) {
throw  new IllegalArgumentException ("Illegal start month " + this.startMonth);
}if (this.startTime < 0 || this.startTime > 86400000) {
throw  new IllegalArgumentException ("Illegal start time " + this.startTime);
}if (this.startDayOfWeek == 0) {
this.startMode = 1;
} else {
if (this.startDayOfWeek > 0) {
this.startMode = 2;
} else {
this.startDayOfWeek = -this.startDayOfWeek;
if (this.startDay > 0) {
this.startMode = 3;
} else {
this.startDay = -this.startDay;
this.startMode = 4;
}}if (this.startDayOfWeek > 7) {
throw  new IllegalArgumentException ("Illegal start day of week " + this.startDayOfWeek);
}}if (this.startMode == 2) {
if (this.startDay < -5 || this.startDay > 5) {
throw  new IllegalArgumentException ("Illegal start day of week in month " + this.startDay);
}} else if (this.startDay < 1 || this.startDay > java.util.SimpleTimeZone.staticMonthLength[this.startMonth]) {
throw  new IllegalArgumentException ("Illegal start day " + this.startDay);
}}});
Clazz.defineMethod (c$, "decodeEndRule", 
 function () {
this.useDaylight = (this.startDay != 0) && (this.endDay != 0);
if (this.endDay != 0) {
if (this.endMonth < 0 || this.endMonth > 11) {
throw  new IllegalArgumentException ("Illegal end month " + this.endMonth);
}if (this.endTime < 0 || this.endTime > 86400000) {
throw  new IllegalArgumentException ("Illegal end time " + this.endTime);
}if (this.endDayOfWeek == 0) {
this.endMode = 1;
} else {
if (this.endDayOfWeek > 0) {
this.endMode = 2;
} else {
this.endDayOfWeek = -this.endDayOfWeek;
if (this.endDay > 0) {
this.endMode = 3;
} else {
this.endDay = -this.endDay;
this.endMode = 4;
}}if (this.endDayOfWeek > 7) {
throw  new IllegalArgumentException ("Illegal end day of week " + this.endDayOfWeek);
}}if (this.endMode == 2) {
if (this.endDay < -5 || this.endDay > 5) {
throw  new IllegalArgumentException ("Illegal end day of week in month " + this.endDay);
}} else if (this.endDay < 1 || this.endDay > java.util.SimpleTimeZone.staticMonthLength[this.endMonth]) {
throw  new IllegalArgumentException ("Illegal end day " + this.endDay);
}}});
Clazz.defineStatics (c$,
"millisPerHour", 3600000,
"millisPerDay", 86400000,
"staticMonthLength",  Clazz.newByteArray (-1, [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]),
"staticLeapMonthLength",  Clazz.newByteArray (-1, [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]),
"gcal", null,
"DOM_MODE", 1,
"DOW_IN_MONTH_MODE", 2,
"DOW_GE_DOM_MODE", 3,
"DOW_LE_DOM_MODE", 4,
"WALL_TIME", 0,
"STANDARD_TIME", 1,
"UTC_TIME", 2,
"currentSerialVersion", 2);
});
