Clazz.declarePackage ("java.text");
Clazz.load (["java.util.Hashtable", "sun.util.resources.LocaleData"], "java.text.DateFormatSymbols", ["java.lang.IllegalArgumentException", "$.InternalError", "java.util.Arrays", "java.util.Locale"], function () {
c$ = Clazz.decorateAsClass (function () {
this.eras = null;
this.months = null;
this.shortMonths = null;
this.weekdays = null;
this.shortWeekdays = null;
this.ampms = null;
this.zoneStrings = null;
this.isZoneStringsSet = false;
this.localPatternChars = null;
this.locale = null;
Clazz.instantialize (this, arguments);
}, java.text, "DateFormatSymbols", null, Cloneable);
Clazz.makeConstructor (c$, 
function () {
this.initializeData (java.util.Locale.getDefault ());
});
Clazz.makeConstructor (c$, 
function (locale) {
this.initializeData (locale);
}, "java.util.Locale");
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function () {
return java.text.DateFormatSymbols.getInstance (java.util.Locale.getDefault ());
});
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function (locale) {
return  new java.text.DateFormatSymbols (locale);
}, "java.util.Locale");
Clazz.defineMethod (c$, "getEras", 
function () {
return this.duplicate (this.eras);
});
Clazz.defineMethod (c$, "setEras", 
function (newEras) {
this.eras = this.duplicate (newEras);
}, "~A");
Clazz.defineMethod (c$, "getMonths", 
function () {
return this.duplicate (this.months);
});
Clazz.defineMethod (c$, "setMonths", 
function (newMonths) {
this.months = this.duplicate (newMonths);
}, "~A");
Clazz.defineMethod (c$, "getShortMonths", 
function () {
return this.duplicate (this.shortMonths);
});
Clazz.defineMethod (c$, "setShortMonths", 
function (newShortMonths) {
this.shortMonths = this.duplicate (newShortMonths);
}, "~A");
Clazz.defineMethod (c$, "getWeekdays", 
function () {
return this.duplicate (this.weekdays);
});
Clazz.defineMethod (c$, "setWeekdays", 
function (newWeekdays) {
this.weekdays = this.duplicate (newWeekdays);
}, "~A");
Clazz.defineMethod (c$, "getShortWeekdays", 
function () {
return this.duplicate (this.shortWeekdays);
});
Clazz.defineMethod (c$, "setShortWeekdays", 
function (newShortWeekdays) {
this.shortWeekdays = this.duplicate (newShortWeekdays);
}, "~A");
Clazz.defineMethod (c$, "getAmPmStrings", 
function () {
return this.duplicate (this.ampms);
});
Clazz.defineMethod (c$, "setAmPmStrings", 
function (newAmpms) {
this.ampms = this.duplicate (newAmpms);
}, "~A");
Clazz.defineMethod (c$, "setZoneStrings", 
function (newZoneStrings) {
var aCopy =  new Array (newZoneStrings.length);
for (var i = 0; i < newZoneStrings.length; ++i) {
if (newZoneStrings[i].length < 5) {
throw  new IllegalArgumentException ();
}aCopy[i] = this.duplicate (newZoneStrings[i]);
}
this.zoneStrings = aCopy;
this.isZoneStringsSet = true;
}, "~A");
Clazz.defineMethod (c$, "getLocalPatternChars", 
function () {
return  String.instantialize (this.localPatternChars);
});
Clazz.defineMethod (c$, "setLocalPatternChars", 
function (newLocalPatternChars) {
this.localPatternChars =  String.instantialize (newLocalPatternChars);
}, "~S");
Clazz.defineMethod (c$, "clone", 
function () {
try {
var other = Clazz.superCall (this, java.text.DateFormatSymbols, "clone", []);
this.copyMembers (this, other);
return other;
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
throw  new InternalError ();
} else {
throw e;
}
}
});
Clazz.overrideMethod (c$, "hashCode", 
function () {
var hashcode = 0;
return hashcode;
});
Clazz.defineMethod (c$, "equals", 
function (obj) {
if (this === obj) return true;
if (obj == null || this.getClass () !== obj.getClass ()) return false;
var that = obj;
return (java.util.Arrays.equals (this.eras, that.eras) && java.util.Arrays.equals (this.months, that.months) && java.util.Arrays.equals (this.shortMonths, that.shortMonths) && java.util.Arrays.equals (this.weekdays, that.weekdays) && java.util.Arrays.equals (this.shortWeekdays, that.shortWeekdays) && java.util.Arrays.equals (this.ampms, that.ampms) && ((this.localPatternChars != null && this.localPatternChars.equals (that.localPatternChars)) || (this.localPatternChars == null && that.localPatternChars == null)));
}, "~O");
c$.cacheLookup = Clazz.defineMethod (c$, "cacheLookup", 
 function (desiredLocale) {
var rb = java.text.DateFormatSymbols.cachedLocaleData.get (desiredLocale);
if (rb == null) {
rb = sun.util.resources.LocaleData.getDateFormatData (desiredLocale);
java.text.DateFormatSymbols.cachedLocaleData.put (desiredLocale, rb);
}return rb;
}, "java.util.Locale");
Clazz.defineMethod (c$, "initializeData", 
 function (desiredLocale) {
var i;
var resource = java.text.DateFormatSymbols.cacheLookup (desiredLocale);
this.eras = resource.getObject ("Eras");
this.months = resource.getStringArray ("MonthNames");
this.shortMonths = resource.getStringArray ("MonthAbbreviations");
var lWeekdays = resource.getStringArray ("DayNames");
this.weekdays =  new Array (8);
this.weekdays[0] = "";
for (i = 0; i < lWeekdays.length; i++) this.weekdays[i + 1] = lWeekdays[i];

var sWeekdays = resource.getStringArray ("DayAbbreviations");
this.shortWeekdays =  new Array (8);
this.shortWeekdays[0] = "";
for (i = 0; i < sWeekdays.length; i++) this.shortWeekdays[i + 1] = sWeekdays[i];

this.ampms = resource.getStringArray ("AmPmMarkers");
this.localPatternChars = resource.getString ("DateTimePatternChars");
this.locale = desiredLocale;
}, "java.util.Locale");
Clazz.defineMethod (c$, "duplicate", 
 function (srcArray) {
var dstArray =  new Array (srcArray.length);
System.arraycopy (srcArray, 0, dstArray, 0, srcArray.length);
return dstArray;
}, "~A");
Clazz.defineMethod (c$, "copyMembers", 
 function (src, dst) {
dst.eras = this.duplicate (src.eras);
dst.months = this.duplicate (src.months);
dst.shortMonths = this.duplicate (src.shortMonths);
dst.weekdays = this.duplicate (src.weekdays);
dst.shortWeekdays = this.duplicate (src.shortWeekdays);
dst.ampms = this.duplicate (src.ampms);
if (src.zoneStrings != null) {
if (dst.zoneStrings == null) {
dst.zoneStrings =  new Array (src.zoneStrings.length);
}for (var i = 0; i < dst.zoneStrings.length; ++i) {
dst.zoneStrings[i] = this.duplicate (src.zoneStrings[i]);
}
} else {
dst.zoneStrings = null;
}dst.localPatternChars =  String.instantialize (src.localPatternChars);
}, "java.text.DateFormatSymbols,java.text.DateFormatSymbols");
Clazz.defineStatics (c$,
"patternChars", "GyMdkHmsSEDFwWahKzZ",
"millisPerHour", 3600000);
c$.cachedLocaleData = c$.prototype.cachedLocaleData =  new java.util.Hashtable (3);
});
