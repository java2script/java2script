Clazz.declarePackage ("java.text");
Clazz.load (["java.math.RoundingMode"], "java.text.DigitList", ["java.lang.ArithmeticException", "$.Double", "$.InternalError", "$.Long", "$.StringBuffer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.decimalAt = 0;
this.count = 0;
this.digits = null;
this.data = null;
this.roundingMode = null;
this.isNegative = false;
this.tempBuffer = null;
Clazz.instantialize (this, arguments);
}, java.text, "DigitList", null, Cloneable);
Clazz.prepareFields (c$, function () {
this.digits =  Clazz.newCharArray (19, '\0');
this.roundingMode = java.math.RoundingMode.HALF_EVEN;
});
Clazz.defineMethod (c$, "isZero", 
function () {
for (var i = 0; i < this.count; ++i) {
if (this.digits[i] != '0') {
return false;
}}
return true;
});
Clazz.defineMethod (c$, "setRoundingMode", 
function (r) {
this.roundingMode = r;
}, "java.math.RoundingMode");
Clazz.defineMethod (c$, "clear", 
function () {
this.decimalAt = 0;
this.count = 0;
});
Clazz.defineMethod (c$, "append", 
function (digit) {
if (this.count == this.digits.length) {
var data =  Clazz.newCharArray (this.count + 100, '\0');
System.arraycopy (this.digits, 0, data, 0, this.count);
this.digits = data;
}this.digits[this.count++] = digit;
}, "~S");
Clazz.defineMethod (c$, "getDouble", 
function () {
if (this.count == 0) {
return 0.0;
}var temp = this.getStringBuffer ();
temp.append ('.');
temp.append (this.digits, 0, this.count);
temp.append ('E');
temp.append ("" + this.decimalAt);
return Double.parseDouble (temp.toString ());
});
Clazz.defineMethod (c$, "getLong", 
function () {
if (this.count == 0) {
return 0;
}if (this.isLongMIN_VALUE ()) {
return -9223372036854775808;
}var temp = this.getStringBuffer ();
temp.append (this.digits, 0, this.count);
for (var i = this.count; i < this.decimalAt; ++i) {
temp.append ('0');
}
return Long.parseLong (temp.toString ());
});
Clazz.defineMethod (c$, "fitsIntoLong", 
function (isPositive, ignoreNegativeZero) {
while (this.count > 0 && this.digits[this.count - 1] == '0') {
--this.count;
}
if (this.count == 0) {
return isPositive || ignoreNegativeZero;
}if (this.decimalAt < this.count || this.decimalAt > 19) {
return false;
}if (this.decimalAt < 19) return true;
for (var i = 0; i < this.count; ++i) {
var dig = this.digits[i];
var max = java.text.DigitList.LONG_MIN_REP[i];
if (dig > max) return false;
if (dig < max) return true;
}
if (this.count < this.decimalAt) return true;
return !isPositive;
}, "~B,~B");
Clazz.defineMethod (c$, "setDouble", 
function (isNegative, source, maximumFractionDigits) {
this.set (isNegative, source, maximumFractionDigits, true);
}, "~B,~N,~N");
Clazz.defineMethod (c$, "set", 
function (isNegative, source, maximumDigits, fixedPoint) {
this.set (isNegative, Double.toString (source), maximumDigits, fixedPoint);
}, "~B,~N,~N,~B");
Clazz.defineMethod (c$, "set", 
function (isNegative, s, maximumDigits, fixedPoint) {
this.isNegative = isNegative;
var len = s.length;
var source = this.getDataChars (len);
s.getChars (0, len, source, 0);
this.decimalAt = -1;
this.count = 0;
var exponent = 0;
var leadingZerosAfterDecimal = 0;
var nonZeroDigitSeen = false;
for (var i = 0; i < len; ) {
var c = source[i++];
if (c == '.') {
this.decimalAt = this.count;
} else if (c == 'e' || c == 'E') {
exponent = java.text.DigitList.parseInt (source, i, len);
break;
} else {
if (!nonZeroDigitSeen) {
nonZeroDigitSeen = (c != '0');
if (!nonZeroDigitSeen && this.decimalAt != -1) ++leadingZerosAfterDecimal;
}if (nonZeroDigitSeen) {
this.digits[this.count++] = c;
}}}
if (this.decimalAt == -1) {
this.decimalAt = this.count;
}if (nonZeroDigitSeen) {
this.decimalAt += exponent - leadingZerosAfterDecimal;
}if (fixedPoint) {
if (-this.decimalAt > maximumDigits) {
this.count = 0;
return;
} else if (-this.decimalAt == maximumDigits) {
if (this.shouldRoundUp (0)) {
this.count = 1;
++this.decimalAt;
this.digits[0] = '1';
} else {
this.count = 0;
}return;
}}while (this.count > 1 && this.digits[this.count - 1] == '0') {
--this.count;
}
this.round (fixedPoint ? (maximumDigits + this.decimalAt) : maximumDigits);
}, "~B,~S,~N,~B");
Clazz.defineMethod (c$, "round", 
 function (maximumDigits) {
if (maximumDigits >= 0 && maximumDigits < this.count) {
if (this.shouldRoundUp (maximumDigits)) {
for (; ; ) {
--maximumDigits;
if (maximumDigits < 0) {
this.digits[0] = '1';
++this.decimalAt;
maximumDigits = 0;
break;
}this.digits[maximumDigits] = String.fromCharCode (this.digits[maximumDigits].charCodeAt (0) + 1);
if (this.digits[maximumDigits] <= '9') break;
}
++maximumDigits;
}this.count = maximumDigits;
while (this.count > 1 && this.digits[this.count - 1] == '0') {
--this.count;
}
}}, "~N");
Clazz.defineMethod (c$, "shouldRoundUp", 
 function (maximumDigits) {
if (maximumDigits < this.count) {
switch (this.roundingMode) {
case java.math.RoundingMode.UP:
for (var i = maximumDigits; i < this.count; ++i) {
if (this.digits[i] != '0') {
return true;
}}
break;
case java.math.RoundingMode.DOWN:
break;
case java.math.RoundingMode.CEILING:
for (var i = maximumDigits; i < this.count; ++i) {
if (this.digits[i] != '0') {
return !this.isNegative;
}}
break;
case java.math.RoundingMode.FLOOR:
for (var i = maximumDigits; i < this.count; ++i) {
if (this.digits[i] != '0') {
return this.isNegative;
}}
break;
case java.math.RoundingMode.HALF_UP:
if (this.digits[maximumDigits] >= '5') {
return true;
}break;
case java.math.RoundingMode.HALF_DOWN:
if (this.digits[maximumDigits] > '5') {
return true;
} else if (this.digits[maximumDigits] == '5') {
for (var i = maximumDigits + 1; i < this.count; ++i) {
if (this.digits[i] != '0') {
return true;
}}
}break;
case java.math.RoundingMode.HALF_EVEN:
if (this.digits[maximumDigits] > '5') {
return true;
} else if (this.digits[maximumDigits] == '5') {
for (var i = maximumDigits + 1; i < this.count; ++i) {
if (this.digits[i] != '0') {
return true;
}}
return maximumDigits > 0 && ((this.digits[maximumDigits - 1]).charCodeAt (0) % 2 != 0);
}break;
case java.math.RoundingMode.UNNECESSARY:
for (var i = maximumDigits; i < this.count; ++i) {
if (this.digits[i] != '0') {
throw  new ArithmeticException ("Rounding needed with the rounding mode being set to RoundingMode.UNNECESSARY");
}}
break;
default:
}
}return false;
}, "~N");
Clazz.defineMethod (c$, "setExp", 
function (isNegative, source) {
this.setLong (isNegative, source, 0);
}, "~B,~N");
Clazz.defineMethod (c$, "setLong", 
function (isNegative, source, maximumDigits) {
this.isNegative = isNegative;
if (source <= 0) {
if (source == -9223372036854775808) {
this.decimalAt = this.count = 19;
System.arraycopy (java.text.DigitList.LONG_MIN_REP, 0, this.digits, 0, this.count);
} else {
this.decimalAt = this.count = 0;
}} else {
var left = 19;
var right;
while (source >= 1) {
this.digits[--left] = String.fromCharCode (48 + (source % 10));
source = Clazz.doubleToInt (source / 10);
}
this.decimalAt = 19 - left;
for (right = 18; this.digits[right] == '0'; --right) ;
this.count = right - left + 1;
System.arraycopy (this.digits, left, this.digits, 0, this.count);
}if (maximumDigits > 0) this.round (maximumDigits);
}, "~B,~N,~N");
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (this === obj) return true;
if (!(Clazz.instanceOf (obj, java.text.DigitList))) return false;
var other = obj;
if (this.count != other.count || this.decimalAt != other.decimalAt) return false;
for (var i = 0; i < this.count; i++) if (this.digits[i] != other.digits[i]) return false;

return true;
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
var hashcode = this.decimalAt;
for (var i = 0; i < this.count; i++) {
hashcode = hashcode * 37 + (this.digits[i]).charCodeAt (0);
}
return hashcode;
});
Clazz.defineMethod (c$, "clone", 
function () {
try {
var other = Clazz.superCall (this, java.text.DigitList, "clone", []);
var newDigits =  Clazz.newCharArray (this.digits.length, '\0');
System.arraycopy (this.digits, 0, newDigits, 0, this.digits.length);
other.digits = newDigits;
other.tempBuffer = null;
return other;
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
throw  new InternalError ();
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "isLongMIN_VALUE", 
 function () {
if (this.decimalAt != this.count || this.count != 19) {
return false;
}for (var i = 0; i < this.count; ++i) {
if (this.digits[i] != java.text.DigitList.LONG_MIN_REP[i]) return false;
}
return true;
});
c$.parseInt = Clazz.defineMethod (c$, "parseInt", 
 function (str, offset, strLen) {
var c;
var positive = true;
if ((c = str[offset]) == '-') {
positive = false;
offset++;
} else if (c == '+') {
offset++;
}var value = 0;
while (offset < strLen) {
c = str[offset++];
if (c >= '0' && c <= '9') {
value = value * 10 + (c.charCodeAt (0) - 48);
} else {
break;
}}
return positive ? value : -value;
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "toString", 
function () {
if (this.isZero ()) {
return "0";
}var buf = this.getStringBuffer ();
buf.append ("0.");
buf.append (this.digits, 0, this.count);
buf.append ("x10^");
buf.append ("" + this.decimalAt);
return buf.toString ();
});
Clazz.defineMethod (c$, "getStringBuffer", 
 function () {
if (this.tempBuffer == null) {
this.tempBuffer =  new StringBuffer (19);
} else {
this.tempBuffer.setLength (0);
}return this.tempBuffer;
});
Clazz.defineMethod (c$, "getDataChars", 
 function (length) {
if (this.data == null || this.data.length < length) {
this.data =  Clazz.newCharArray (length, '\0');
}return this.data;
}, "~N");
Clazz.defineStatics (c$,
"MAX_COUNT", 19);
c$.LONG_MIN_REP = c$.prototype.LONG_MIN_REP = "9223372036854775808".toCharArray ();
});
