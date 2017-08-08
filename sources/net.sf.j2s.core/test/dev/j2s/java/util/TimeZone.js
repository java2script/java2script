Clazz.declarePackage ("java.util");
Clazz.load (null, "java.util.TimeZone", ["java.lang.InternalError", "$.NullPointerException", "java.util.Date", "$.HashMap"], function () {
c$ = Clazz.decorateAsClass (function () {
this.ID = "GMT";
Clazz.instantialize (this, arguments);
}, java.util, "TimeZone", null, Cloneable);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "getOffset", 
function (date) {
if (this.inDaylightTime ( new java.util.Date (date))) {
return this.getRawOffset () + this.getDSTSavings ();
}return this.getRawOffset ();
}, "~N");
Clazz.defineMethod (c$, "getOffsets", 
function (date, offsets) {
var rawoffset = this.getRawOffset ();
var dstoffset = 0;
if (this.inDaylightTime ( new java.util.Date (date))) {
dstoffset = this.getDSTSavings ();
}if (offsets != null) {
offsets[0] = rawoffset;
offsets[1] = dstoffset;
}return rawoffset + dstoffset;
}, "~N,~A");
Clazz.defineMethod (c$, "getID", 
function () {
return this.ID;
});
Clazz.defineMethod (c$, "setID", 
function (ID) {
if (ID == null) {
throw  new NullPointerException ();
}this.ID = ID;
}, "~S");
Clazz.defineMethod (c$, "getDSTSavings", 
function () {
if (this.useDaylightTime ()) {
return 3600000;
}return 0;
});
c$.getTimeZone = Clazz.defineMethod (c$, "getTimeZone", 
function (ID) {
return java.util.TimeZone.getTimeZone (ID, true);
}, "~S");
c$.getTimeZone = Clazz.defineMethod (c$, "getTimeZone", 
 function (ID, fallback) {
var tz = null;
tz = java.util.TimeZone.parseCustomTimeZone (ID);
if (tz == null && fallback) {
tz =  new sun.util.calendar.ZoneInfo ("GMT", 0);
}return tz;
}, "~S,~B");
c$.getAvailableIDs = Clazz.defineMethod (c$, "getAvailableIDs", 
function (rawOffset) {
return null;
}, "~N");
c$.getAvailableIDs = Clazz.defineMethod (c$, "getAvailableIDs", 
function () {
return null;
});
c$.getDefault = Clazz.defineMethod (c$, "getDefault", 
function () {
return java.util.TimeZone.getDefaultRef ().clone ();
});
c$.getDefaultRef = Clazz.defineMethod (c$, "getDefaultRef", 
function () {
if (java.util.TimeZone.defaultTimeZone == null) {
var ms = java.util.TimeZone.getTimeZoneOffsetMillis ();
var gmtOffsetID = java.util.TimeZone.getGMTID (ms);
java.util.TimeZone.defaultTimeZone = java.util.TimeZone.getTimeZone (gmtOffsetID, true);
java.util.TimeZone.addToCache (gmtOffsetID,  new sun.util.calendar.ZoneInfo (gmtOffsetID, ms));
}return java.util.TimeZone.defaultTimeZone;
});
c$.getTimeZoneOffsetMillis = Clazz.defineMethod (c$, "getTimeZoneOffsetMillis", 
 function () {
{
return -(new Date()).getTimezoneOffset() * 60000;
}});
c$.setDefault = Clazz.defineMethod (c$, "setDefault", 
function (zone) {
}, "java.util.TimeZone");
Clazz.defineMethod (c$, "hasSameRules", 
function (other) {
return other != null && this.getRawOffset () == other.getRawOffset () && this.useDaylightTime () == other.useDaylightTime ();
}, "java.util.TimeZone");
Clazz.defineMethod (c$, "clone", 
function () {
try {
var other = Clazz.superCall (this, java.util.TimeZone, "clone", []);
other.ID = this.ID;
return other;
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
throw  new InternalError ();
} else {
throw e;
}
}
});
c$.parseCustomTimeZone = Clazz.defineMethod (c$, "parseCustomTimeZone", 
 function (id) {
if ((id.length) < (5) || id.indexOf ("GMT") != 0) {
return null;
}var zi;
var neghrmin = java.util.TimeZone.getOffsetHHMM (id);
if (neghrmin == null) return null;
var gmtOffset = (neghrmin[0]) * (neghrmin[1] * 60 + neghrmin[2]) * 60 * 1000;
var gmtID = java.util.TimeZone.getGMTID (gmtOffset);
zi =  new sun.util.calendar.ZoneInfo ();
if (gmtOffset == 0) {
} else {
zi.setRawOffsetReally (gmtOffset);
}zi.setID (gmtID);
return zi;
}, "~S");
c$.getOffsetHHMM = Clazz.defineMethod (c$, "getOffsetHHMM", 
 function (id) {
var index = 3;
var length = id.length;
var negative = false;
var c = id.charAt (index++);
if (c == '-') {
negative = true;
} else if (c != '+') {
return null;
}var hours = 0;
var num = 0;
var countDelim = 0;
var len = 0;
while (index < length) {
c = id.charAt (index++);
if (c == ':') {
if (countDelim > 0) {
return null;
}if (len > 2) {
return null;
}hours = num;
countDelim++;
num = 0;
len = 0;
continue;
}if (c < '0' || c > '9') {
return null;
}num = num * 10 + (c.charCodeAt (0) - 48);
len++;
}
if (index != length) {
return null;
}if (countDelim == 0) {
if (len <= 2) {
hours = num;
num = 0;
} else {
hours = Clazz.doubleToInt (num / 100);
num %= 100;
}} else {
if (len != 2) {
return null;
}}if (hours > 23 || num > 59) {
return null;
}return  Clazz.newIntArray (-1, [(negative ? -1 : 1), hours, num]);
}, "~S");
c$.getGMTID = Clazz.defineMethod (c$, "getGMTID", 
 function (gmtOffset) {
var isNegative = (gmtOffset < 0);
if (isNegative) gmtOffset = -gmtOffset;
gmtOffset = Clazz.doubleToInt (gmtOffset / 60000);
var hours = Clazz.doubleToInt (gmtOffset / 60);
var min = gmtOffset - hours * 60;
var NN = "00" + hours;
NN = NN.substring (NN.length - 2);
var MM = "00" + min;
MM = MM.substring (MM.length - 2);
return "GMT" + (isNegative ? "-" : "") + NN;
}, "~N");
c$.getCustomTimeZone = Clazz.defineMethod (c$, "getCustomTimeZone", 
function (originalId, gmtOffset) {
var id = java.util.TimeZone.toCustomID (gmtOffset);
var zi = java.util.TimeZone.getFromCache (id);
if (zi == null) {
zi =  new sun.util.calendar.ZoneInfo (id, gmtOffset);
zi = java.util.TimeZone.addToCache (id, zi);
if (originalId != null && !id.equals (originalId)) {
zi = java.util.TimeZone.addToCache (originalId, zi);
}}return zi.clone ();
}, "~S,~N");
c$.toCustomID = Clazz.defineMethod (c$, "toCustomID", 
function (gmtOffset) {
var sign;
var offset = Clazz.doubleToInt (gmtOffset / 60000);
if (offset >= 0) {
sign = '+';
} else {
sign = '-';
offset = -offset;
}var hh = Clazz.doubleToInt (offset / 60);
var mm = offset % 60;
var buf =  Clazz.newCharArray (-1, ['G', 'M', 'T', sign, '0', '0', ':', '0', '0']);
if (hh >= 10) {
buf[4] = String.fromCharCode ((buf[4]).charCodeAt (0) + (Clazz.doubleToInt (hh / 10)));
}buf[5] = String.fromCharCode ((buf[5]).charCodeAt (0) + (hh % 10));
if (mm != 0) {
buf[7] = String.fromCharCode ((buf[7]).charCodeAt (0) + (Clazz.doubleToInt (mm / 10)));
buf[8] = String.fromCharCode ((buf[8]).charCodeAt (0) + (mm % 10));
}return  String.instantialize (buf);
}, "~N");
c$.getFromCache = Clazz.defineMethod (c$, "getFromCache", 
function (id) {
if (java.util.TimeZone.zoneInfoObjects == null) {
return null;
}return java.util.TimeZone.zoneInfoObjects.get (id);
}, "~S");
c$.addToCache = Clazz.defineMethod (c$, "addToCache", 
function (id, zi) {
if (java.util.TimeZone.zoneInfoObjects == null) {
java.util.TimeZone.zoneInfoObjects =  new java.util.HashMap ();
} else {
var zone = java.util.TimeZone.zoneInfoObjects.get (id);
if (zone != null) {
return zone;
}}java.util.TimeZone.zoneInfoObjects.put (id, zi);
return zi;
}, "~S,sun.util.calendar.ZoneInfo");
Clazz.defineStatics (c$,
"SHORT", 0,
"LONG", 1,
"NO_TIMEZONE", null,
"defaultTimeZone", null,
"GMT_ID", "GMT",
"GMT_ID_LENGTH", 3,
"zoneInfoObjects", null);
});
