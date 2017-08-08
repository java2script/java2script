Clazz.declarePackage ("java.util");
Clazz.load (["java.util.Calendar", "sun.util.calendar.Gregorian"], "java.util.GregorianCalendar", ["java.lang.ArrayIndexOutOfBoundsException", "$.IllegalArgumentException", "java.util.Date", "java.util.Locale", "$.TimeZone", "sun.util.calendar.AbstractCalendar", "$.CalendarSystem", "$.CalendarUtils", "$.ZoneInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.gregorianCutover = -12219292800000;
this.gregorianCutoverDate = 577736;
this.gregorianCutoverYear = 1582;
this.gregorianCutoverYearJulian = 1582;
this.gdate = null;
this.cdate = null;
this.calsys = null;
this.zoneOffsets = null;
this.originalFields = null;
this.cachedFixedDate = -9223372036854775808;
Clazz.instantialize (this, arguments);
}, java.util, "GregorianCalendar", java.util.Calendar);
Clazz.defineMethod (c$, "getGcal", 
 function () {
return (java.util.GregorianCalendar.gcal == null ? (java.util.GregorianCalendar.gcal = sun.util.calendar.CalendarSystem.getGregorianCalendar ()) : java.util.GregorianCalendar.gcal);
});
Clazz.makeConstructor (c$, 
function () {
this.construct (java.util.TimeZone.getDefaultRef (), java.util.Locale.getDefault ());
this.setZoneShared (true);
});
Clazz.makeConstructor (c$, 
function (zone) {
this.construct (zone, java.util.Locale.getDefault ());
}, "java.util.TimeZone");
Clazz.makeConstructor (c$, 
function (aLocale) {
this.construct (java.util.TimeZone.getDefaultRef (), aLocale);
this.setZoneShared (true);
}, "java.util.Locale");
Clazz.makeConstructor (c$, 
function (zone, aLocale) {
Clazz.superConstructor (this, java.util.GregorianCalendar, [zone, aLocale]);
this.gdate = this.getGcal ().newCalendarDate (zone);
this.setTimeInMillis (System.currentTimeMillis ());
}, "java.util.TimeZone,java.util.Locale");
Clazz.makeConstructor (c$, 
function (year, month, dayOfMonth) {
this.construct (year, month, dayOfMonth, 0, 0, 0, 0);
}, "~N,~N,~N");
Clazz.makeConstructor (c$, 
function (year, month, dayOfMonth, hourOfDay, minute) {
this.construct (year, month, dayOfMonth, hourOfDay, minute, 0, 0);
}, "~N,~N,~N,~N,~N");
Clazz.makeConstructor (c$, 
function (year, month, dayOfMonth, hourOfDay, minute, second) {
this.construct (year, month, dayOfMonth, hourOfDay, minute, second, 0);
}, "~N,~N,~N,~N,~N,~N");
Clazz.makeConstructor (c$, 
function (year, month, dayOfMonth, hourOfDay, minute, second, millis) {
Clazz.superConstructor (this, java.util.GregorianCalendar);
this.gdate = this.getGcal ().newCalendarDate (this.getZone ());
this.set (1, year);
this.set (2, month);
this.set (5, dayOfMonth);
if (hourOfDay >= 12 && hourOfDay <= 23) {
this.internalSet (9, 1);
this.internalSet (10, hourOfDay - 12);
} else {
this.internalSet (10, hourOfDay);
}this.setFieldsComputed (1536);
this.set (11, hourOfDay);
this.set (12, minute);
this.set (13, second);
this.internalSet (14, millis);
}, "~N,~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getGregorianChange", 
function () {
return  new java.util.Date (this.gregorianCutover);
});
Clazz.defineMethod (c$, "isLeapYear", 
function (year) {
if ((year & 3) != 0) {
return false;
}if (year > this.gregorianCutoverYear) {
return (year % 100 != 0) || (year % 400 == 0);
}if (year < this.gregorianCutoverYearJulian) {
return true;
}var gregorian;
if (this.gregorianCutoverYear == this.gregorianCutoverYearJulian) {
var d = this.getCalendarDate (this.gregorianCutoverDate);
gregorian = d.getMonth () < 3;
} else {
gregorian = year == this.gregorianCutoverYear;
}return gregorian ? (year % 100 != 0) || (year % 400 == 0) : true;
}, "~N");
Clazz.defineMethod (c$, "equals", 
function (obj) {
return Clazz.instanceOf (obj, java.util.GregorianCalendar) && Clazz.superCall (this, java.util.GregorianCalendar, "equals", [obj]) && this.gregorianCutover == (obj).gregorianCutover;
}, "~O");
Clazz.defineMethod (c$, "hashCode", 
function () {
return Clazz.superCall (this, java.util.GregorianCalendar, "hashCode", []) ^ this.gregorianCutoverDate;
});
Clazz.overrideMethod (c$, "add", 
function (field, amount) {
if (amount == 0) {
return;
}if (field < 0 || field >= 15) {
throw  new IllegalArgumentException ();
}this.complete ();
if (field == 1) {
var year = this.internalGet (1);
if (this.internalGetEra () == 1) {
year += amount;
if (year > 0) {
this.set (1, year);
} else {
this.set (1, 1 - year);
this.set (0, 0);
}} else {
year -= amount;
if (year > 0) {
this.set (1, year);
} else {
this.set (1, 1 - year);
this.set (0, 1);
}}this.pinDayOfMonth ();
} else if (field == 2) {
var month = this.internalGet (2) + amount;
var year = this.internalGet (1);
var y_amount;
if (month >= 0) {
y_amount = Clazz.doubleToInt (month / 12);
} else {
y_amount = Clazz.doubleToInt ((month + 1) / 12) - 1;
}if (y_amount != 0) {
if (this.internalGetEra () == 1) {
year += y_amount;
if (year > 0) {
this.set (1, year);
} else {
this.set (1, 1 - year);
this.set (0, 0);
}} else {
year -= y_amount;
if (year > 0) {
this.set (1, year);
} else {
this.set (1, 1 - year);
this.set (0, 1);
}}}if (month >= 0) {
this.set (2, (month % 12));
} else {
month %= 12;
if (month < 0) {
month += 12;
}this.set (2, 0 + month);
}this.pinDayOfMonth ();
} else if (field == 0) {
var era = this.internalGet (0) + amount;
if (era < 0) {
era = 0;
}if (era > 1) {
era = 1;
}this.set (0, era);
} else {
var delta = amount;
var timeOfDay = 0;
switch (field) {
case 10:
case 11:
delta *= 3600000;
break;
case 12:
delta *= 60000;
break;
case 13:
delta *= 1000;
break;
case 14:
break;
case 3:
case 4:
case 8:
delta *= 7;
break;
case 5:
case 6:
case 7:
break;
case 9:
delta = Clazz.doubleToInt (amount / 2);
timeOfDay = 12 * (amount % 2);
break;
}
if (field >= 10) {
this.setTimeInMillis (this.time + delta);
return;
}var fd = this.getCurrentFixedDate ();
timeOfDay += this.internalGet (11);
timeOfDay *= 60;
timeOfDay += this.internalGet (12);
timeOfDay *= 60;
timeOfDay += this.internalGet (13);
timeOfDay *= 1000;
timeOfDay += this.internalGet (14);
if (timeOfDay >= 86400000) {
fd++;
timeOfDay -= 86400000;
} else if (timeOfDay < 0) {
fd--;
timeOfDay += 86400000;
}fd += delta;
var zoneOffset = this.internalGet (15) + this.internalGet (16);
this.setTimeInMillis ((fd - 719163) * 86400000 + timeOfDay - zoneOffset);
zoneOffset -= this.internalGet (15) + this.internalGet (16);
if (zoneOffset != 0) {
this.setTimeInMillis (this.time + zoneOffset);
var fd2 = this.getCurrentFixedDate ();
if (fd2 != fd) {
this.setTimeInMillis (this.time - zoneOffset);
}}}}, "~N,~N");
Clazz.defineMethod (c$, "roll", 
function (field, up) {
this.roll (field, up ? 1 : -1);
}, "~N,~B");
Clazz.defineMethod (c$, "roll", 
function (field, amount) {
if (amount == 0) {
return;
}if (field < 0 || field >= 15) {
throw  new IllegalArgumentException ();
}this.complete ();
var min = this.getMinimum (field);
var max = this.getMaximum (field);
switch (field) {
case 9:
case 0:
case 1:
case 12:
case 13:
case 14:
break;
case 10:
case 11:
{
var unit = max + 1;
var h = this.internalGet (field);
var nh = (h + amount) % unit;
if (nh < 0) {
nh += unit;
}this.time += 3600000 * (nh - h);
var d = this.calsys.getCalendarDate (this.time, this.getZone ());
if (this.internalGet (5) != d.getDayOfMonth ()) {
d.setDate (this.internalGet (1), this.internalGet (2) + 1, this.internalGet (5));
if (field == 10) {
d.addHours (12);
}this.time = this.calsys.getTime (d);
}var hourOfDay = d.getHours ();
this.internalSet (field, hourOfDay % unit);
if (field == 10) {
this.internalSet (11, hourOfDay);
} else {
this.internalSet (9, Clazz.doubleToInt (hourOfDay / 12));
this.internalSet (10, hourOfDay % 12);
}var zoneOffset = d.getZoneOffset ();
var saving = d.getDaylightSaving ();
this.internalSet (15, zoneOffset - saving);
this.internalSet (16, saving);
return;
}case 2:
{
var mon = (this.internalGet (2) + amount) % 12;
if (mon < 0) {
mon += 12;
}this.set (2, mon);
var monthLen = this.monthLength (mon);
if (this.internalGet (5) > monthLen) {
this.set (5, monthLen);
}return;
}case 3:
{
var y = this.cdate.getNormalizedYear ();
max = this.getActualMaximum (3);
this.set (7, this.internalGet (7));
var woy = this.internalGet (3);
var value = woy + amount;
if (value > min && value < max) {
this.set (3, value);
return;
}var fd = this.getCurrentFixedDate ();
var day1 = fd - (7 * (woy - min));
if (this.calsys.getYearFromFixedDate (day1) != y) {
min++;
}fd += 7 * (max - this.internalGet (3));
if (this.calsys.getYearFromFixedDate (fd) != y) {
max--;
}break;
}case 4:
{
var dow = this.internalGet (7) - this.getFirstDayOfWeek ();
if (dow < 0) {
dow += 7;
}var fd = this.getCurrentFixedDate ();
var month1;
var monthLength;
month1 = fd - this.internalGet (5) + 1;
monthLength = this.calsys.getMonthLength (this.cdate);
var monthDay1st = sun.util.calendar.AbstractCalendar.getDayOfWeekDateOnOrBefore (month1 + 6, this.getFirstDayOfWeek ());
if ((monthDay1st - month1) >= this.getMinimalDaysInFirstWeek ()) {
monthDay1st -= 7;
}max = this.getActualMaximum (field);
var value = java.util.GregorianCalendar.getRolledValue (this.internalGet (field), amount, 1, max) - 1;
var nfd = monthDay1st + value * 7 + dow;
if (nfd < month1) {
nfd = month1;
} else if (nfd >= (month1 + monthLength)) {
nfd = month1 + monthLength - 1;
}var dayOfMonth;
dayOfMonth = (nfd - month1) + 1;
this.set (5, dayOfMonth);
return;
}case 5:
{
max = this.calsys.getMonthLength (this.cdate);
break;
}case 6:
{
max = this.getActualMaximum (field);
break;
}case 7:
{
var weekOfYear = this.internalGet (3);
this.set (3, weekOfYear);
max = 7;
break;
}case 8:
{
min = 1;
var dom = this.internalGet (5);
var monthLength = this.calsys.getMonthLength (this.cdate);
var lastDays = monthLength % 7;
max = Clazz.doubleToInt (monthLength / 7);
var x = (dom - 1) % 7;
if (x < lastDays) {
max++;
}this.set (7, this.internalGet (7));
break;
}}
this.set (field, java.util.GregorianCalendar.getRolledValue (this.internalGet (field), amount, min, max));
}, "~N,~N");
Clazz.overrideMethod (c$, "getMinimum", 
function (field) {
return java.util.GregorianCalendar.MIN_VALUES[field];
}, "~N");
Clazz.overrideMethod (c$, "getMaximum", 
function (field) {
switch (field) {
case 2:
case 5:
case 6:
case 3:
case 4:
case 8:
case 1:
{
if (this.gregorianCutoverYear > 200) {
break;
}var gc = this.clone ();
gc.setLenient (true);
gc.setTimeInMillis (this.gregorianCutover);
var v1 = gc.getActualMaximum (field);
gc.setTimeInMillis (this.gregorianCutover - 1);
var v2 = gc.getActualMaximum (field);
return Math.max (java.util.GregorianCalendar.MAX_VALUES[field], Math.max (v1, v2));
}}
return java.util.GregorianCalendar.MAX_VALUES[field];
}, "~N");
Clazz.overrideMethod (c$, "getGreatestMinimum", 
function (field) {
return java.util.GregorianCalendar.MIN_VALUES[field];
}, "~N");
Clazz.overrideMethod (c$, "getLeastMaximum", 
function (field) {
switch (field) {
case 2:
case 5:
case 6:
case 3:
case 4:
case 8:
case 1:
{
var gc = this.clone ();
gc.setLenient (true);
gc.setTimeInMillis (this.gregorianCutover);
var v1 = gc.getActualMaximum (field);
gc.setTimeInMillis (this.gregorianCutover - 1);
var v2 = gc.getActualMaximum (field);
return Math.min (java.util.GregorianCalendar.LEAST_MAX_VALUES[field], Math.min (v1, v2));
}}
return java.util.GregorianCalendar.LEAST_MAX_VALUES[field];
}, "~N");
Clazz.overrideMethod (c$, "getActualMinimum", 
function (field) {
if (field == 5) {
}return this.getMinimum (field);
}, "~N");
Clazz.overrideMethod (c$, "getActualMaximum", 
function (field) {
var fieldsForFixedMax = 130689;
if ((130689 & (1 << field)) != 0) {
return this.getMaximum (field);
}var gc = this.getNormalizedCalendar ();
var date = gc.cdate;
var cal = gc.calsys;
var value = -1;
var d;
var dd;
switch (field) {
case 2:
{
}break;
case 5:
value = cal.getMonthLength (date);
break;
case 6:
value = cal.getYearLength (date);
break;
case 3:
{
dd = cal.newCalendarDate (java.util.TimeZone.NO_TIMEZONE);
dd.setDate (date.getYear (), 1, 1);
var dayOfWeek = cal.getDayOfWeek (dd);
dayOfWeek -= this.getFirstDayOfWeek ();
if (dayOfWeek < 0) {
dayOfWeek += 7;
}value = 52;
var magic = dayOfWeek + this.getMinimalDaysInFirstWeek () - 1;
if ((magic == 6) || (date.isLeapYear () && (magic == 5 || magic == 12))) {
value++;
}}break;
case 4:
dd = cal.newCalendarDate (null);
dd.setDate (date.getYear (), date.getMonth (), 1);
var dayOfWeek = cal.getDayOfWeek (dd);
var monthLength = cal.getMonthLength (dd);
dayOfWeek -= this.getFirstDayOfWeek ();
if (dayOfWeek < 0) {
dayOfWeek += 7;
}var nDaysFirstWeek = 7 - dayOfWeek;
value = 3;
if (nDaysFirstWeek >= this.getMinimalDaysInFirstWeek ()) {
value++;
}monthLength -= nDaysFirstWeek + 21;
if (monthLength > 0) {
value++;
if (monthLength > 7) {
value++;
}}break;
case 8:
{
var ndays;
var dow1;
var dow = date.getDayOfWeek ();
d = date.clone ();
ndays = cal.getMonthLength (d);
d.setDayOfMonth (1);
cal.normalize (d);
dow1 = d.getDayOfWeek ();
var x = dow - dow1;
if (x < 0) {
x += 7;
}ndays -= x;
value = Clazz.doubleToInt ((ndays + 6) / 7);
}break;
case 1:
{
if (gc === this) {
gc = this.clone ();
}var current = gc.getYearOffsetInMillis ();
if (gc.internalGetEra () == 1) {
gc.setTimeInMillis (9223372036854775807);
value = gc.get (1);
var maxEnd = gc.getYearOffsetInMillis ();
if (current > maxEnd) {
value--;
}} else {
var mincal = this.getGcal ();
dd = mincal.getCalendarDate (-9223372036854775808, this.getZone ());
var maxEnd = (cal.getDayOfYear (dd) - 1) * 24 + dd.getHours ();
maxEnd *= 60;
maxEnd += dd.getMinutes ();
maxEnd *= 60;
maxEnd += dd.getSeconds ();
maxEnd *= 1000;
maxEnd += dd.getMillis ();
value = dd.getYear ();
if (value <= 0) {
value = 1 - value;
}if (current < maxEnd) {
value--;
}}}break;
default:
throw  new ArrayIndexOutOfBoundsException (field);
}
return value;
}, "~N");
Clazz.defineMethod (c$, "getYearOffsetInMillis", 
 function () {
var t = (this.internalGet (6) - 1) * 24;
t += this.internalGet (11);
t *= 60;
t += this.internalGet (12);
t *= 60;
t += this.internalGet (13);
t *= 1000;
return t + this.internalGet (14) - (this.internalGet (15) + this.internalGet (16));
});
Clazz.defineMethod (c$, "clone", 
function () {
var other = Clazz.superCall (this, java.util.GregorianCalendar, "clone", []);
other.gdate = this.gdate.clone ();
if (this.cdate != null) {
if (this.cdate !== this.gdate) {
other.cdate = this.cdate.clone ();
} else {
other.cdate = other.gdate;
}}other.originalFields = null;
other.zoneOffsets = null;
return other;
});
Clazz.defineMethod (c$, "getTimeZone", 
function () {
var zone = Clazz.superCall (this, java.util.GregorianCalendar, "getTimeZone", []);
this.gdate.setZone (zone);
if (this.cdate != null && this.cdate !== this.gdate) {
this.cdate.setZone (zone);
}return zone;
});
Clazz.defineMethod (c$, "setTimeZone", 
function (zone) {
Clazz.superCall (this, java.util.GregorianCalendar, "setTimeZone", [zone]);
this.gdate.setZone (zone);
if (this.cdate != null && this.cdate !== this.gdate) {
this.cdate.setZone (zone);
}}, "java.util.TimeZone");
Clazz.defineMethod (c$, "computeFields", 
function () {
var mask = 0;
if (this.isPartiallyNormalized ()) {
mask = this.getSetStateFields ();
var fieldMask = ~mask & 131071;
if (fieldMask != 0 || this.calsys == null) {
mask |= this.computeFields (fieldMask, mask & (98304));
}} else {
mask = 131071;
this.computeFields (mask, 0);
}this.setFieldsComputed (mask);
});
Clazz.defineMethod (c$, "computeFields", 
 function (fieldMask, tzMask) {
var zoneOffset = 0;
var tz = this.getZone ();
if (this.zoneOffsets == null) {
this.zoneOffsets =  Clazz.newIntArray (2, 0);
}if (tzMask != (98304)) {
if (Clazz.instanceOf (tz, sun.util.calendar.ZoneInfo)) {
zoneOffset = (tz).getOffsets (this.time, this.zoneOffsets);
} else {
zoneOffset = tz.getOffset (this.time);
this.zoneOffsets[0] = tz.getRawOffset ();
this.zoneOffsets[1] = zoneOffset - this.zoneOffsets[0];
}}if (tzMask != 0) {
if (java.util.Calendar.isFieldSet (tzMask, 15)) {
this.zoneOffsets[0] = this.internalGet (15);
}if (java.util.Calendar.isFieldSet (tzMask, 16)) {
this.zoneOffsets[1] = this.internalGet (16);
}zoneOffset = this.zoneOffsets[0] + this.zoneOffsets[1];
}var fixedDate = Clazz.doubleToInt (zoneOffset / 86400000);
var timeOfDay = zoneOffset % 86400000;
fixedDate += Clazz.doubleToInt (this.time / 86400000);
timeOfDay += (this.time % 86400000);
if (timeOfDay >= 86400000) {
timeOfDay -= 86400000;
++fixedDate;
} else {
while (timeOfDay < 0) {
timeOfDay += 86400000;
--fixedDate;
}
}fixedDate += 719163;
var era = 1;
var year;
if (fixedDate != this.cachedFixedDate) {
this.getGcal ().getCalendarDateFromFixedDate (this.gdate, fixedDate);
this.cachedFixedDate = fixedDate;
}year = this.gdate.getYear ();
if (year <= 0) {
year = 1 - year;
era = 0;
}this.calsys = this.getGcal ();
this.cdate = this.gdate;
this.internalSet (0, era);
this.internalSet (1, year);
var mask = fieldMask | (3);
var month = this.cdate.getMonth () - 1;
var dayOfMonth = this.cdate.getDayOfMonth ();
if ((fieldMask & (164)) != 0) {
this.internalSet (2, month);
this.internalSet (5, dayOfMonth);
this.internalSet (7, this.cdate.getDayOfWeek ());
mask |= 164;
}if ((fieldMask & (32256)) != 0) {
if (timeOfDay != 0) {
var hours = Clazz.doubleToInt (timeOfDay / 3600000);
this.internalSet (11, hours);
this.internalSet (9, Clazz.doubleToInt (hours / 12));
this.internalSet (10, hours % 12);
var r = timeOfDay % 3600000;
this.internalSet (12, Clazz.doubleToInt (r / 60000));
r %= 60000;
this.internalSet (13, Clazz.doubleToInt (r / 1000));
this.internalSet (14, r % 1000);
} else {
this.internalSet (11, 0);
this.internalSet (9, 0);
this.internalSet (10, 0);
this.internalSet (12, 0);
this.internalSet (13, 0);
this.internalSet (14, 0);
}mask |= (32256);
}if ((fieldMask & (98304)) != 0) {
this.internalSet (15, this.zoneOffsets[0]);
this.internalSet (16, this.zoneOffsets[1]);
mask |= (98304);
}if ((fieldMask & (344)) != 0) {
var normalizedYear = this.cdate.getNormalizedYear ();
var fixedDateJan1 = this.calsys.getFixedDate (normalizedYear, 1, 1, this.cdate);
var dayOfYear = (fixedDate - fixedDateJan1) + 1;
var fixedDateMonth1 = fixedDate - dayOfMonth + 1;
var cutoverYear = (this.calsys === this.getGcal ()) ? this.gregorianCutoverYear : this.gregorianCutoverYearJulian;
var relativeDayOfMonth = dayOfMonth - 1;
if (normalizedYear == cutoverYear) {
var realDayOfYear = (fixedDate - fixedDateJan1) + 1;
dayOfYear = realDayOfYear;
relativeDayOfMonth = (fixedDate - fixedDateMonth1);
}this.internalSet (6, dayOfYear);
this.internalSet (8, Clazz.doubleToInt (relativeDayOfMonth / 7) + 1);
var weekOfYear = this.getWeekNumber (fixedDateJan1, fixedDate);
if (weekOfYear == 0) {
var fixedDec31 = fixedDateJan1 - 1;
var prevJan1;
prevJan1 = fixedDateJan1 - 365;
if (sun.util.calendar.CalendarUtils.isGregorianLeapYear (normalizedYear - 1)) {
--prevJan1;
}weekOfYear = this.getWeekNumber (prevJan1, fixedDec31);
} else {
if (normalizedYear > this.gregorianCutoverYear || normalizedYear < (this.gregorianCutoverYearJulian - 1)) {
if (weekOfYear >= 52) {
var nextJan1 = fixedDateJan1 + 365;
if (this.cdate.isLeapYear ()) {
nextJan1++;
}var nextJan1st = sun.util.calendar.AbstractCalendar.getDayOfWeekDateOnOrBefore (nextJan1 + 6, this.getFirstDayOfWeek ());
var ndays = (nextJan1st - nextJan1);
if (ndays >= this.getMinimalDaysInFirstWeek () && fixedDate >= (nextJan1st - 7)) {
weekOfYear = 1;
}}} else {
var calForJan1 = this.calsys;
var nextYear = normalizedYear + 1;
var nextJan1 = calForJan1.getFixedDate (nextYear, 1, 1, null);
if (nextJan1 < fixedDate) {
nextJan1 = this.gregorianCutoverDate;
calForJan1 = this.getGcal ();
}var nextJan1st = sun.util.calendar.AbstractCalendar.getDayOfWeekDateOnOrBefore (nextJan1 + 6, this.getFirstDayOfWeek ());
var ndays = (nextJan1st - nextJan1);
if (ndays >= this.getMinimalDaysInFirstWeek () && fixedDate >= (nextJan1st - 7)) {
weekOfYear = 1;
}}}this.internalSet (3, weekOfYear);
this.internalSet (4, this.getWeekNumber (fixedDateMonth1, fixedDate));
mask |= (344);
}return mask;
}, "~N,~N");
Clazz.defineMethod (c$, "getWeekNumber", 
 function (fixedDay1, fixedDate) {
var fixedDay1st = sun.util.calendar.AbstractCalendar.getDayOfWeekDateOnOrBefore (fixedDay1 + 6, this.getFirstDayOfWeek ());
var ndays = (fixedDay1st - fixedDay1);
if (ndays >= this.getMinimalDaysInFirstWeek ()) {
fixedDay1st -= 7;
}var normalizedDayOfPeriod = (fixedDate - fixedDay1st);
if (normalizedDayOfPeriod >= 0) {
return Clazz.doubleToInt (normalizedDayOfPeriod / 7) + 1;
}return sun.util.calendar.CalendarUtils.floorDivide (normalizedDayOfPeriod, 7) + 1;
}, "~N,~N");
Clazz.overrideMethod (c$, "computeTime", 
function () {
if (!this.isLenient ()) {
if (this.originalFields == null) {
this.originalFields =  Clazz.newIntArray (17, 0);
}for (var field = 0; field < 17; field++) {
var value = this.internalGet (field);
if (this.isExternallySet (field)) {
if (value < this.getMinimum (field) || value > this.getMaximum (field)) {
throw  new IllegalArgumentException (java.util.Calendar.getFieldName (field));
}}this.originalFields[field] = value;
}
}var fieldMask = this.selectFields ();
var year = this.isSet (1) ? this.internalGet (1) : 1970;
var era = this.internalGetEra ();
if (era == 0) {
year = 1 - year;
} else if (era != 1) {
throw  new IllegalArgumentException ("Invalid era");
}if (year <= 0 && !this.isSet (0)) {
fieldMask |= 1;
this.setFieldsComputed (1);
}var timeOfDay = 0;
if (java.util.Calendar.isFieldSet (fieldMask, 11)) {
timeOfDay += this.internalGet (11);
} else {
timeOfDay += this.internalGet (10);
if (java.util.Calendar.isFieldSet (fieldMask, 9)) {
timeOfDay += 12 * this.internalGet (9);
}}timeOfDay *= 60;
timeOfDay += this.internalGet (12);
timeOfDay *= 60;
timeOfDay += this.internalGet (13);
timeOfDay *= 1000;
timeOfDay += this.internalGet (14);
var fixedDate = Clazz.doubleToInt (timeOfDay / 86400000);
timeOfDay %= 86400000;
while (timeOfDay < 0) {
timeOfDay += 86400000;
--fixedDate;
}
calculateFixedDate : {
var gfd;
gfd = fixedDate + this.getFixedDate (this.getGcal (), year, fieldMask);
fixedDate = gfd;
break calculateFixedDate;
}var millis = (fixedDate - 719163) * 86400000 + timeOfDay;
var zone = this.getZone ();
if (this.zoneOffsets == null) {
this.zoneOffsets =  Clazz.newIntArray (2, 0);
}var tzMask = fieldMask & (98304);
if (tzMask != (98304)) {
if (Clazz.instanceOf (zone, sun.util.calendar.ZoneInfo)) {
(zone).getOffsetsByWall (millis, this.zoneOffsets);
} else {
var gmtOffset = java.util.Calendar.isFieldSet (fieldMask, 15) ? this.internalGet (15) : zone.getRawOffset ();
zone.getOffsets (millis - gmtOffset, this.zoneOffsets);
}}if (tzMask != 0) {
if (java.util.Calendar.isFieldSet (tzMask, 15)) {
this.zoneOffsets[0] = this.internalGet (15);
}if (java.util.Calendar.isFieldSet (tzMask, 16)) {
this.zoneOffsets[1] = this.internalGet (16);
}}millis -= this.zoneOffsets[0] + this.zoneOffsets[1];
this.time = millis;
var mask = this.computeFields (fieldMask | this.getSetStateFields (), tzMask);
if (!this.isLenient ()) {
for (var field = 0; field < 17; field++) {
if (!this.isExternallySet (field)) {
continue;
}if (this.originalFields[field] != this.internalGet (field)) {
System.arraycopy (this.originalFields, 0, this.fields, 0, this.fields.length);
throw  new IllegalArgumentException (java.util.Calendar.getFieldName (field));
}}
}this.setFieldsNormalized (mask);
});
Clazz.defineMethod (c$, "getFixedDate", 
 function (cal, year, fieldMask) {
var month = 0;
if (java.util.Calendar.isFieldSet (fieldMask, 2)) {
month = this.internalGet (2);
if (month > 11) {
year += Clazz.doubleToInt (month / 12);
month %= 12;
} else if (month < 0) {
var rem =  Clazz.newIntArray (1, 0);
year += sun.util.calendar.CalendarUtils.floorDivide (month, 12, rem);
month = rem[0];
}}var fixedDate = cal.getFixedDate (year, month + 1, 1, cal === this.getGcal () ? this.gdate : null);
if (java.util.Calendar.isFieldSet (fieldMask, 2)) {
if (java.util.Calendar.isFieldSet (fieldMask, 5)) {
if (this.isSet (5)) {
fixedDate += this.internalGet (5);
fixedDate--;
}} else {
if (java.util.Calendar.isFieldSet (fieldMask, 4)) {
var firstDayOfWeek = sun.util.calendar.AbstractCalendar.getDayOfWeekDateOnOrBefore (fixedDate + 6, this.getFirstDayOfWeek ());
if ((firstDayOfWeek - fixedDate) >= this.getMinimalDaysInFirstWeek ()) {
firstDayOfWeek -= 7;
}if (java.util.Calendar.isFieldSet (fieldMask, 7)) {
firstDayOfWeek = sun.util.calendar.AbstractCalendar.getDayOfWeekDateOnOrBefore (firstDayOfWeek + 6, this.internalGet (7));
}fixedDate = firstDayOfWeek + 7 * (this.internalGet (4) - 1);
} else {
var dayOfWeek;
if (java.util.Calendar.isFieldSet (fieldMask, 7)) {
dayOfWeek = this.internalGet (7);
} else {
dayOfWeek = this.getFirstDayOfWeek ();
}var dowim;
if (java.util.Calendar.isFieldSet (fieldMask, 8)) {
dowim = this.internalGet (8);
} else {
dowim = 1;
}if (dowim >= 0) {
fixedDate = sun.util.calendar.AbstractCalendar.getDayOfWeekDateOnOrBefore (fixedDate + (7 * dowim) - 1, dayOfWeek);
} else {
var lastDate = this.monthLength (month, year) + (7 * (dowim + 1));
fixedDate = sun.util.calendar.AbstractCalendar.getDayOfWeekDateOnOrBefore (fixedDate + lastDate - 1, dayOfWeek);
}}}} else {
if (year == this.gregorianCutoverYear && cal === this.getGcal () && fixedDate < this.gregorianCutoverDate && this.gregorianCutoverYear != this.gregorianCutoverYearJulian) {
fixedDate = this.gregorianCutoverDate;
}if (java.util.Calendar.isFieldSet (fieldMask, 6)) {
fixedDate += this.internalGet (6);
fixedDate--;
} else {
var firstDayOfWeek = sun.util.calendar.AbstractCalendar.getDayOfWeekDateOnOrBefore (fixedDate + 6, this.getFirstDayOfWeek ());
if ((firstDayOfWeek - fixedDate) >= this.getMinimalDaysInFirstWeek ()) {
firstDayOfWeek -= 7;
}if (java.util.Calendar.isFieldSet (fieldMask, 7)) {
var dayOfWeek = this.internalGet (7);
if (dayOfWeek != this.getFirstDayOfWeek ()) {
firstDayOfWeek = sun.util.calendar.AbstractCalendar.getDayOfWeekDateOnOrBefore (firstDayOfWeek + 6, dayOfWeek);
}}fixedDate = firstDayOfWeek + 7 * (this.internalGet (3) - 1);
}}return fixedDate;
}, "sun.util.calendar.BaseCalendar,~N,~N");
Clazz.defineMethod (c$, "getNormalizedCalendar", 
 function () {
var gc;
if (this.isFullyNormalized ()) {
gc = this;
} else {
gc = this.clone ();
gc.setLenient (true);
gc.complete ();
}return gc;
});
Clazz.defineMethod (c$, "getCalendarDate", 
 function (fd) {
var cal = this.getGcal ();
var d = cal.newCalendarDate (java.util.TimeZone.NO_TIMEZONE);
cal.getCalendarDateFromFixedDate (d, fd);
return d;
}, "~N");
Clazz.defineMethod (c$, "monthLength", 
 function (month, year) {
return this.isLeapYear (year) ? java.util.GregorianCalendar.LEAP_MONTH_LENGTH[month] : java.util.GregorianCalendar.MONTH_LENGTH[month];
}, "~N,~N");
Clazz.defineMethod (c$, "monthLength", 
 function (month) {
var year = this.internalGet (1);
if (this.internalGetEra () == 0) {
year = 1 - year;
}return this.monthLength (month, year);
}, "~N");
Clazz.defineMethod (c$, "pinDayOfMonth", 
 function () {
var year = this.internalGet (1);
var monthLen;
if (year > this.gregorianCutoverYear || year < this.gregorianCutoverYearJulian) {
monthLen = this.monthLength (this.internalGet (2));
} else {
var gc = this.getNormalizedCalendar ();
monthLen = gc.getActualMaximum (5);
}var dom = this.internalGet (5);
if (dom > monthLen) {
this.set (5, monthLen);
}});
Clazz.defineMethod (c$, "getCurrentFixedDate", 
 function () {
return (this.calsys === this.getGcal ()) ? this.cachedFixedDate : this.calsys.getFixedDate (this.cdate);
});
c$.getRolledValue = Clazz.defineMethod (c$, "getRolledValue", 
 function (value, amount, min, max) {
var range = max - min + 1;
amount %= range;
var n = value + amount;
if (n > max) {
n -= range;
} else if (n < min) {
n += range;
}return n;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "internalGetEra", 
 function () {
return this.isSet (0) ? this.internalGet (0) : 1;
});
Clazz.defineStatics (c$,
"BC", 0,
"BCE", 0,
"AD", 1,
"CE", 1,
"EPOCH_OFFSET", 719163,
"EPOCH_YEAR", 1970,
"MONTH_LENGTH",  Clazz.newIntArray (-1, [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]),
"LEAP_MONTH_LENGTH",  Clazz.newIntArray (-1, [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]),
"ONE_SECOND", 1000,
"ONE_MINUTE", 60000,
"ONE_HOUR", 3600000,
"ONE_DAY", 86400000,
"MIN_VALUES",  Clazz.newIntArray (-1, [0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, -46800000, 0]),
"LEAST_MAX_VALUES",  Clazz.newIntArray (-1, [1, 292269054, 11, 52, 4, 28, 365, 7, 4, 1, 11, 23, 59, 59, 999, 50400000, 1200000]),
"MAX_VALUES",  Clazz.newIntArray (-1, [1, 292278994, 11, 53, 6, 31, 366, 7, 6, 1, 11, 23, 59, 59, 999, 50400000, 7200000]),
"gcal", null,
"DEFAULT_GREGORIAN_CUTOVER", -12219292800000);
});
