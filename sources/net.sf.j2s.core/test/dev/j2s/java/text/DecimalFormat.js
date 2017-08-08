Clazz.declarePackage ("java.text");
Clazz.load (["java.text.NumberFormat", "java.util.Hashtable", "java.text.DecimalFormatSymbols", "$.DigitList"], "java.text.DecimalFormat", ["java.lang.Byte", "$.Character", "$.Double", "$.Float", "$.IllegalArgumentException", "$.InternalError", "$.Long", "$.NullPointerException", "$.Number", "$.Short", "$.StringBuffer", "java.util.ArrayList", "java.text.CharacterIteratorFieldDelegate", "$.FieldPosition", "$.ParsePosition", "java.util.Locale", "sun.util.resources.LocaleData"], function () {
c$ = Clazz.decorateAsClass (function () {
this.digitList = null;
this.positivePrefix = "";
this.positiveSuffix = "";
this.negativePrefix = "-";
this.negativeSuffix = "";
this.posPrefixPattern = null;
this.posSuffixPattern = null;
this.negPrefixPattern = null;
this.negSuffixPattern = null;
this.multiplier = 1;
this.groupingSize = 3;
this.decimalSeparatorAlwaysShown = false;
this.parseBigDecimal = false;
this.isCurrencyFormat = false;
this.symbols = null;
this.useExponentialNotation = false;
this.positivePrefixFieldPositions = null;
this.positiveSuffixFieldPositions = null;
this.negativePrefixFieldPositions = null;
this.negativeSuffixFieldPositions = null;
this.minExponentDigits = 0;
this.$maximumIntegerDigits = 0;
this.$minimumIntegerDigits = 0;
this.$maximumFractionDigits = 0;
this.$minimumFractionDigits = 0;
this.roundingMode = null;
Clazz.instantialize (this, arguments);
}, java.text, "DecimalFormat", java.text.NumberFormat);
Clazz.prepareFields (c$, function () {
this.digitList =  new java.text.DigitList ();
this.$maximumIntegerDigits = Clazz.superCall (this, java.text.DecimalFormat, "getMaximumIntegerDigits", []);
this.$minimumIntegerDigits = Clazz.superCall (this, java.text.DecimalFormat, "getMinimumIntegerDigits", []);
this.$maximumFractionDigits = Clazz.superCall (this, java.text.DecimalFormat, "getMaximumFractionDigits", []);
this.$minimumFractionDigits = Clazz.superCall (this, java.text.DecimalFormat, "getMinimumFractionDigits", []);
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.text.DecimalFormat, []);
var def = java.util.Locale.getDefault ();
var pattern = java.text.DecimalFormat.$cachedLocaleData.get (def);
if (pattern == null) {
var rb = sun.util.resources.LocaleData.getNumberFormatData (def);
var all = rb.getStringArray ("NumberPatterns");
pattern = all[0];
java.text.DecimalFormat.$cachedLocaleData.put (def, pattern);
}this.symbols =  new java.text.DecimalFormatSymbols (def);
this.applyPattern (pattern, false);
});
Clazz.makeConstructor (c$, 
function (pattern) {
Clazz.superConstructor (this, java.text.DecimalFormat, []);
this.symbols =  new java.text.DecimalFormatSymbols (java.util.Locale.getDefault ());
this.applyPattern (pattern, false);
}, "~S");
Clazz.makeConstructor (c$, 
function (pattern, symbols) {
Clazz.superConstructor (this, java.text.DecimalFormat, []);
this.symbols = symbols.clone ();
this.applyPattern (pattern, false);
}, "~S,java.text.DecimalFormatSymbols");
Clazz.defineMethod (c$, "format", 
function (number, toAppendTo, pos) {
if (Clazz.instanceOf (number, Long) || Clazz.instanceOf (number, Integer) || Clazz.instanceOf (number, Short) || Clazz.instanceOf (number, Byte)) {
return this.format ((number).longValue (), toAppendTo, pos);
} else if (Clazz.instanceOf (number, Number)) {
return this.format ((number).doubleValue (), toAppendTo, pos);
} else {
throw  new IllegalArgumentException ("Cannot format given Object as a Number");
}}, "~O,StringBuffer,java.text.FieldPosition");
Clazz.defineMethod (c$, "format", 
function (number, result, fieldPosition) {
fieldPosition.setBeginIndex (0);
fieldPosition.setEndIndex (0);
var isInt = (number == Clazz.doubleToInt (number) && Math.abs (number) < 2147483647);
if (isInt) return this.formatLong (Clazz.doubleToInt (number), result, fieldPosition.getFieldDelegate ());
 else return this.formatDouble (number, result, fieldPosition.getFieldDelegate ());
}, "~N,StringBuffer,java.text.FieldPosition");
Clazz.defineMethod (c$, "formatDouble", 
 function (number, result, delegate) {
if (Double.isNaN (number) || (Double.isInfinite (number) && this.multiplier == 0)) {
var iFieldStart = result.length ();
result.append (this.symbols.getNaN ());
delegate.formatted (0, java.text.NumberFormat.Field.INTEGER, java.text.NumberFormat.Field.INTEGER, iFieldStart, result.length (), result);
return result;
}var isNegative =  new Boolean (((number < 0.0) || (number == 0.0 && 1 / number < 0.0)) ^ (this.multiplier < 0)).valueOf ();
if (this.multiplier != 1) {
number *= this.multiplier;
}if (Double.isInfinite (number)) {
if (isNegative) {
this.append (result, this.negativePrefix, delegate, this.getNegativePrefixFieldPositions (), java.text.NumberFormat.Field.SIGN);
} else {
this.append (result, this.positivePrefix, delegate, this.getPositivePrefixFieldPositions (), java.text.NumberFormat.Field.SIGN);
}var iFieldStart = result.length ();
result.append (this.symbols.getInfinity ());
delegate.formatted (0, java.text.NumberFormat.Field.INTEGER, java.text.NumberFormat.Field.INTEGER, iFieldStart, result.length (), result);
if (isNegative) {
this.append (result, this.negativeSuffix, delegate, this.getNegativeSuffixFieldPositions (), java.text.NumberFormat.Field.SIGN);
} else {
this.append (result, this.positiveSuffix, delegate, this.getPositiveSuffixFieldPositions (), java.text.NumberFormat.Field.SIGN);
}return result;
}if (isNegative) {
number = -number;
}{
var maxIntDigits = Clazz.superCall (this, java.text.DecimalFormat, "getMaximumIntegerDigits", []);
var minIntDigits = Clazz.superCall (this, java.text.DecimalFormat, "getMinimumIntegerDigits", []);
var maxFraDigits = Clazz.superCall (this, java.text.DecimalFormat, "getMaximumFractionDigits", []);
var minFraDigits = Clazz.superCall (this, java.text.DecimalFormat, "getMinimumFractionDigits", []);
this.digitList.set (isNegative, number, this.useExponentialNotation ? maxIntDigits + maxFraDigits : maxFraDigits, !this.useExponentialNotation);
return this.subformat (result, delegate, isNegative, false, maxIntDigits, minIntDigits, maxFraDigits, minFraDigits);
}}, "~N,StringBuffer,java.text.Format.FieldDelegate");
Clazz.defineMethod (c$, "formatLong", 
 function (number, result, delegate) {
var isNegative = (number < 0);
if (isNegative) {
number = -number;
}if (number < 0) {
} else if (this.multiplier != 1 && this.multiplier != 0) {
var cutoff = Clazz.doubleToInt (9223372036854775807 / this.multiplier);
if (cutoff < 0) {
cutoff = -cutoff;
}}number *= this.multiplier;
if (number == 0) {
isNegative = false;
} else {
if (this.multiplier < 0) {
number = -number;
isNegative = !isNegative;
}}{
var maxIntDigits = Clazz.superCall (this, java.text.DecimalFormat, "getMaximumIntegerDigits", []);
var minIntDigits = Clazz.superCall (this, java.text.DecimalFormat, "getMinimumIntegerDigits", []);
var maxFraDigits = Clazz.superCall (this, java.text.DecimalFormat, "getMaximumFractionDigits", []);
var minFraDigits = Clazz.superCall (this, java.text.DecimalFormat, "getMinimumFractionDigits", []);
this.digitList.setLong (isNegative, number, this.useExponentialNotation ? maxIntDigits + maxFraDigits : 0);
return this.subformat (result, delegate, isNegative, true, maxIntDigits, minIntDigits, maxFraDigits, minFraDigits);
}}, "~N,StringBuffer,java.text.Format.FieldDelegate");
Clazz.overrideMethod (c$, "formatToCharacterIterator", 
function (obj) {
var delegate =  new java.text.CharacterIteratorFieldDelegate ();
var sb =  new StringBuffer ();
if (Clazz.instanceOf (obj, Double) || Clazz.instanceOf (obj, Float)) {
this.formatDouble ((obj).doubleValue (), sb, delegate);
} else if (Clazz.instanceOf (obj, Long) || Clazz.instanceOf (obj, Integer) || Clazz.instanceOf (obj, Short) || Clazz.instanceOf (obj, Byte)) {
this.formatLong ((obj).longValue (), sb, delegate);
} else if (obj == null) {
throw  new NullPointerException ("formatToCharacterIterator must be passed non-null object");
} else {
throw  new IllegalArgumentException ("Cannot format given Object as a Number");
}return delegate.getIterator (sb.toString ());
}, "~O");
Clazz.defineMethod (c$, "subformat", 
 function (result, delegate, isNegative, isInteger, maxIntDigits, minIntDigits, maxFraDigits, minFraDigits) {
var zero = this.symbols.getZeroDigit ();
var zeroDelta = zero.charCodeAt (0) - 48;
var grouping = this.symbols.getGroupingSeparator ();
var decimal = this.isCurrencyFormat ? this.symbols.getMonetaryDecimalSeparator () : this.symbols.getDecimalSeparator ();
if (this.digitList.isZero ()) {
this.digitList.decimalAt = 0;
}if (isNegative) {
this.append (result, this.negativePrefix, delegate, this.getNegativePrefixFieldPositions (), java.text.NumberFormat.Field.SIGN);
} else {
this.append (result, this.positivePrefix, delegate, this.getPositivePrefixFieldPositions (), java.text.NumberFormat.Field.SIGN);
}if (this.useExponentialNotation) {
var iFieldStart = result.length ();
var iFieldEnd = -1;
var fFieldStart = -1;
var exponent = this.digitList.decimalAt;
var repeat = maxIntDigits;
var minimumIntegerDigits = minIntDigits;
if (repeat > 1 && repeat > minIntDigits) {
if (exponent >= 1) {
exponent = (Clazz.doubleToInt ((exponent - 1) / repeat)) * repeat;
} else {
exponent = (Clazz.doubleToInt ((exponent - repeat) / repeat)) * repeat;
}minimumIntegerDigits = 1;
} else {
exponent -= minimumIntegerDigits;
}var minimumDigits = minIntDigits + minFraDigits;
if (minimumDigits < 0) {
minimumDigits = 2147483647;
}var integerDigits = this.digitList.isZero () ? minimumIntegerDigits : this.digitList.decimalAt - exponent;
if (minimumDigits < integerDigits) {
minimumDigits = integerDigits;
}var totalDigits = this.digitList.count;
if (minimumDigits > totalDigits) {
totalDigits = minimumDigits;
}var addedDecimalSeparator = false;
for (var i = 0; i < totalDigits; ++i) {
if (i == integerDigits) {
iFieldEnd = result.length ();
result.append (decimal);
addedDecimalSeparator = true;
fFieldStart = result.length ();
}result.append ((i < this.digitList.count) ? String.fromCharCode ((this.digitList.digits[i]).charCodeAt (0) + zeroDelta) : zero);
}
if (this.decimalSeparatorAlwaysShown && totalDigits == integerDigits) {
iFieldEnd = result.length ();
result.append (decimal);
addedDecimalSeparator = true;
fFieldStart = result.length ();
}if (iFieldEnd == -1) {
iFieldEnd = result.length ();
}delegate.formatted (0, java.text.NumberFormat.Field.INTEGER, java.text.NumberFormat.Field.INTEGER, iFieldStart, iFieldEnd, result);
if (addedDecimalSeparator) {
delegate.formatted (java.text.NumberFormat.Field.DECIMAL_SEPARATOR, java.text.NumberFormat.Field.DECIMAL_SEPARATOR, iFieldEnd, fFieldStart, result);
}if (fFieldStart == -1) {
fFieldStart = result.length ();
}delegate.formatted (1, java.text.NumberFormat.Field.FRACTION, java.text.NumberFormat.Field.FRACTION, fFieldStart, result.length (), result);
var fieldStart = result.length ();
result.append (this.symbols.getExponentSeparator ());
delegate.formatted (java.text.NumberFormat.Field.EXPONENT_SYMBOL, java.text.NumberFormat.Field.EXPONENT_SYMBOL, fieldStart, result.length (), result);
if (this.digitList.isZero ()) {
exponent = 0;
}var negativeExponent = exponent < 0;
if (negativeExponent) {
exponent = -exponent;
fieldStart = result.length ();
result.append (this.symbols.getMinusSign ());
delegate.formatted (java.text.NumberFormat.Field.EXPONENT_SIGN, java.text.NumberFormat.Field.EXPONENT_SIGN, fieldStart, result.length (), result);
}this.digitList.setExp (negativeExponent, exponent);
var eFieldStart = result.length ();
for (var i = this.digitList.decimalAt; i < this.minExponentDigits; ++i) {
result.append (zero);
}
for (var i = 0; i < this.digitList.decimalAt; ++i) {
result.append ((i < this.digitList.count) ? String.fromCharCode ((this.digitList.digits[i]).charCodeAt (0) + zeroDelta) : zero);
}
delegate.formatted (java.text.NumberFormat.Field.EXPONENT, java.text.NumberFormat.Field.EXPONENT, eFieldStart, result.length (), result);
} else {
var iFieldStart = result.length ();
var count = minIntDigits;
var digitIndex = 0;
if (this.digitList.decimalAt > 0 && count < this.digitList.decimalAt) {
count = this.digitList.decimalAt;
}if (count > maxIntDigits) {
count = maxIntDigits;
digitIndex = this.digitList.decimalAt - count;
}var sizeBeforeIntegerPart = result.length ();
for (var i = count - 1; i >= 0; --i) {
if (i < this.digitList.decimalAt && digitIndex < this.digitList.count) {
result.append (String.fromCharCode ((this.digitList.digits[digitIndex++]).charCodeAt (0) + zeroDelta));
} else {
result.append (zero);
}if (this.isGroupingUsed () && i > 0 && (this.groupingSize != 0) && (i % this.groupingSize == 0)) {
var gStart = result.length ();
result.append (grouping);
delegate.formatted (java.text.NumberFormat.Field.GROUPING_SEPARATOR, java.text.NumberFormat.Field.GROUPING_SEPARATOR, gStart, result.length (), result);
}}
var fractionPresent = (minFraDigits > 0) || (!isInteger && digitIndex < this.digitList.count);
if (!fractionPresent && result.length () == sizeBeforeIntegerPart) {
result.append (zero);
}delegate.formatted (0, java.text.NumberFormat.Field.INTEGER, java.text.NumberFormat.Field.INTEGER, iFieldStart, result.length (), result);
var sStart = result.length ();
if (this.decimalSeparatorAlwaysShown || fractionPresent) {
result.append (decimal);
}if (sStart != result.length ()) {
delegate.formatted (java.text.NumberFormat.Field.DECIMAL_SEPARATOR, java.text.NumberFormat.Field.DECIMAL_SEPARATOR, sStart, result.length (), result);
}var fFieldStart = result.length ();
for (var i = 0; i < maxFraDigits; ++i) {
if (i >= minFraDigits && (isInteger || digitIndex >= this.digitList.count)) {
break;
}if (-1 - i > (this.digitList.decimalAt - 1)) {
result.append (zero);
continue;
}if (!isInteger && digitIndex < this.digitList.count) {
result.append (String.fromCharCode ((this.digitList.digits[digitIndex++]).charCodeAt (0) + zeroDelta));
} else {
result.append (zero);
}}
delegate.formatted (1, java.text.NumberFormat.Field.FRACTION, java.text.NumberFormat.Field.FRACTION, fFieldStart, result.length (), result);
}if (isNegative) {
this.append (result, this.negativeSuffix, delegate, this.getNegativeSuffixFieldPositions (), java.text.NumberFormat.Field.SIGN);
} else {
this.append (result, this.positiveSuffix, delegate, this.getPositiveSuffixFieldPositions (), java.text.NumberFormat.Field.SIGN);
}return result;
}, "StringBuffer,java.text.Format.FieldDelegate,~B,~B,~N,~N,~N,~N");
Clazz.defineMethod (c$, "append", 
 function (result, string, delegate, positions, signAttribute) {
var start = result.length ();
if (string.length > 0) {
result.append (string);
for (var counter = 0, max = positions.length; counter < max; counter++) {
var fp = positions[counter];
var attribute = fp.getFieldAttribute ();
if (attribute === java.text.NumberFormat.Field.SIGN) {
attribute = signAttribute;
}delegate.formatted (attribute, attribute, start + fp.getBeginIndex (), start + fp.getEndIndex (), result);
}
}}, "StringBuffer,~S,java.text.Format.FieldDelegate,~A,java.text.Format.Field");
Clazz.defineMethod (c$, "parse", 
function (text, pos) {
if (text.regionMatches (pos.index, this.symbols.getNaN (), 0, this.symbols.getNaN ().length)) {
pos.index = pos.index + this.symbols.getNaN ().length;
return  new Double (NaN);
}var status =  Clazz.newBooleanArray (2, false);
if (!this.subparse (text, pos, this.positivePrefix, this.negativePrefix, this.digitList, false, status)) {
return null;
}if (status[0]) {
if (status[1] == (this.multiplier >= 0)) {
return  new Double (Infinity);
} else {
return  new Double (-Infinity);
}}if (this.multiplier == 0) {
if (this.digitList.isZero ()) {
return  new Double (NaN);
} else if (status[1]) {
return  new Double (Infinity);
} else {
return  new Double (-Infinity);
}}var gotDouble = true;
var gotLongMinimum = false;
var doubleResult = 0.0;
var longResult = 0;
if (this.digitList.fitsIntoLong (status[1], this.isParseIntegerOnly ())) {
gotDouble = false;
longResult = this.digitList.getLong ();
if (longResult < 0) {
gotLongMinimum = true;
}} else {
doubleResult = this.digitList.getDouble ();
}if (this.multiplier != 1) {
if (gotDouble) {
doubleResult /= this.multiplier;
} else {
if (longResult % this.multiplier == 0) {
longResult = Clazz.doubleToInt (longResult / this.multiplier);
} else {
doubleResult = (longResult) / this.multiplier;
gotDouble = true;
}}}if (!status[1] && !gotLongMinimum) {
doubleResult = -doubleResult;
longResult = -longResult;
}if (this.multiplier != 1 && gotDouble) {
longResult = Clazz.doubleToLong (doubleResult);
gotDouble = ((doubleResult != longResult) || (doubleResult == 0.0 && 1 / doubleResult < 0.0)) && !this.isParseIntegerOnly ();
}return gotDouble ?  new Double (doubleResult) :  new Long (longResult);
}, "~S,java.text.ParsePosition");
Clazz.defineMethod (c$, "subparse", 
 function (text, parsePosition, positivePrefix, negativePrefix, digits, isExponent, status) {
var position = parsePosition.index;
var oldStart = parsePosition.index;
var backup;
var gotPositive;
var gotNegative;
gotPositive = text.regionMatches (position, positivePrefix, 0, positivePrefix.length);
gotNegative = text.regionMatches (position, negativePrefix, 0, negativePrefix.length);
if (gotPositive && gotNegative) {
if (positivePrefix.length > negativePrefix.length) {
gotNegative = false;
} else if (positivePrefix.length < negativePrefix.length) {
gotPositive = false;
}}if (gotPositive) {
position += positivePrefix.length;
} else if (gotNegative) {
position += negativePrefix.length;
} else {
parsePosition.errorIndex = position;
return false;
}status[0] = false;
if (!isExponent && text.regionMatches (position, this.symbols.getInfinity (), 0, this.symbols.getInfinity ().length)) {
position += this.symbols.getInfinity ().length;
status[0] = true;
} else {
digits.decimalAt = digits.count = 0;
var zero = this.symbols.getZeroDigit ();
var decimal = this.isCurrencyFormat ? this.symbols.getMonetaryDecimalSeparator () : this.symbols.getDecimalSeparator ();
var grouping = this.symbols.getGroupingSeparator ();
var exponentString = this.symbols.getExponentSeparator ();
var sawDecimal = false;
var sawExponent = false;
var sawDigit = false;
var exponent = 0;
var digitCount = 0;
backup = -1;
for (; position < text.length; ++position) {
var ch = text.charAt (position);
var digit = ch.charCodeAt (0) - zero.charCodeAt (0);
if (digit < 0 || digit > 9) {
digit = Character.digit (ch, 10);
}if (digit == 0) {
backup = -1;
sawDigit = true;
if (digits.count == 0) {
if (!sawDecimal) {
continue;
}--digits.decimalAt;
} else {
++digitCount;
digits.append (String.fromCharCode (digit + 48));
}} else if (digit > 0 && digit <= 9) {
sawDigit = true;
++digitCount;
digits.append (String.fromCharCode (digit + 48));
backup = -1;
} else if (!isExponent && ch == decimal) {
if (this.isParseIntegerOnly () || sawDecimal) {
break;
}digits.decimalAt = digitCount;
sawDecimal = true;
} else if (!isExponent && ch == grouping && this.isGroupingUsed ()) {
if (sawDecimal) {
break;
}backup = position;
} else if (!isExponent && text.regionMatches (position, exponentString, 0, exponentString.length) && !sawExponent) {
var pos =  new java.text.ParsePosition (position + exponentString.length);
var stat =  Clazz.newBooleanArray (2, false);
var exponentDigits =  new java.text.DigitList ();
if (this.subparse (text, pos, "", Character.toString (this.symbols.getMinusSign ()), exponentDigits, true, stat) && exponentDigits.fitsIntoLong (stat[1], true)) {
position = pos.index;
exponent = exponentDigits.getLong ();
if (!stat[1]) {
exponent = -exponent;
}sawExponent = true;
}break;
} else {
break;
}}
if (backup != -1) {
position = backup;
}if (!sawDecimal) {
digits.decimalAt = digitCount;
}digits.decimalAt += exponent;
if (!sawDigit && digitCount == 0) {
parsePosition.index = oldStart;
parsePosition.errorIndex = oldStart;
return false;
}}if (!isExponent) {
if (gotPositive) {
gotPositive = text.regionMatches (position, this.positiveSuffix, 0, this.positiveSuffix.length);
}if (gotNegative) {
gotNegative = text.regionMatches (position, this.negativeSuffix, 0, this.negativeSuffix.length);
}if (gotPositive && gotNegative) {
if (this.positiveSuffix.length > this.negativeSuffix.length) {
gotNegative = false;
} else if (this.positiveSuffix.length < this.negativeSuffix.length) {
gotPositive = false;
}}if (gotPositive == gotNegative) {
parsePosition.errorIndex = position;
return false;
}parsePosition.index = position + (gotPositive ? this.positiveSuffix.length : this.negativeSuffix.length);
} else {
parsePosition.index = position;
}status[1] = gotPositive;
if (parsePosition.index == oldStart) {
parsePosition.errorIndex = position;
return false;
}return true;
}, "~S,java.text.ParsePosition,~S,~S,java.text.DigitList,~B,~A");
Clazz.defineMethod (c$, "getDecimalFormatSymbols", 
function () {
try {
return this.symbols.clone ();
} catch (foo) {
if (Clazz.exceptionOf (foo, Exception)) {
return null;
} else {
throw foo;
}
}
});
Clazz.defineMethod (c$, "setDecimalFormatSymbols", 
function (newSymbols) {
try {
this.symbols = newSymbols.clone ();
this.expandAffixes ();
} catch (foo) {
if (Clazz.exceptionOf (foo, Exception)) {
} else {
throw foo;
}
}
}, "java.text.DecimalFormatSymbols");
Clazz.defineMethod (c$, "getPositivePrefix", 
function () {
return this.positivePrefix;
});
Clazz.defineMethod (c$, "setPositivePrefix", 
function (newValue) {
this.positivePrefix = newValue;
this.posPrefixPattern = null;
this.positivePrefixFieldPositions = null;
}, "~S");
Clazz.defineMethod (c$, "getPositivePrefixFieldPositions", 
 function () {
if (this.positivePrefixFieldPositions == null) {
if (this.posPrefixPattern != null) {
this.positivePrefixFieldPositions = this.expandAffix (this.posPrefixPattern);
} else {
this.positivePrefixFieldPositions = java.text.DecimalFormat.EmptyFieldPositionArray;
}}return this.positivePrefixFieldPositions;
});
Clazz.defineMethod (c$, "getNegativePrefix", 
function () {
return this.negativePrefix;
});
Clazz.defineMethod (c$, "setNegativePrefix", 
function (newValue) {
this.negativePrefix = newValue;
this.negPrefixPattern = null;
}, "~S");
Clazz.defineMethod (c$, "getNegativePrefixFieldPositions", 
 function () {
if (this.negativePrefixFieldPositions == null) {
if (this.negPrefixPattern != null) {
this.negativePrefixFieldPositions = this.expandAffix (this.negPrefixPattern);
} else {
this.negativePrefixFieldPositions = java.text.DecimalFormat.EmptyFieldPositionArray;
}}return this.negativePrefixFieldPositions;
});
Clazz.defineMethod (c$, "getPositiveSuffix", 
function () {
return this.positiveSuffix;
});
Clazz.defineMethod (c$, "setPositiveSuffix", 
function (newValue) {
this.positiveSuffix = newValue;
this.posSuffixPattern = null;
}, "~S");
Clazz.defineMethod (c$, "getPositiveSuffixFieldPositions", 
 function () {
if (this.positiveSuffixFieldPositions == null) {
if (this.posSuffixPattern != null) {
this.positiveSuffixFieldPositions = this.expandAffix (this.posSuffixPattern);
} else {
this.positiveSuffixFieldPositions = java.text.DecimalFormat.EmptyFieldPositionArray;
}}return this.positiveSuffixFieldPositions;
});
Clazz.defineMethod (c$, "getNegativeSuffix", 
function () {
return this.negativeSuffix;
});
Clazz.defineMethod (c$, "setNegativeSuffix", 
function (newValue) {
this.negativeSuffix = newValue;
this.negSuffixPattern = null;
}, "~S");
Clazz.defineMethod (c$, "getNegativeSuffixFieldPositions", 
 function () {
if (this.negativeSuffixFieldPositions == null) {
if (this.negSuffixPattern != null) {
this.negativeSuffixFieldPositions = this.expandAffix (this.negSuffixPattern);
} else {
this.negativeSuffixFieldPositions = java.text.DecimalFormat.EmptyFieldPositionArray;
}}return this.negativeSuffixFieldPositions;
});
Clazz.defineMethod (c$, "getMultiplier", 
function () {
return this.multiplier;
});
Clazz.defineMethod (c$, "setMultiplier", 
function (newValue) {
this.multiplier = newValue;
}, "~N");
Clazz.defineMethod (c$, "getGroupingSize", 
function () {
return this.groupingSize;
});
Clazz.defineMethod (c$, "setGroupingSize", 
function (newValue) {
this.groupingSize = newValue;
}, "~N");
Clazz.defineMethod (c$, "isDecimalSeparatorAlwaysShown", 
function () {
return this.decimalSeparatorAlwaysShown;
});
Clazz.defineMethod (c$, "setDecimalSeparatorAlwaysShown", 
function (newValue) {
this.decimalSeparatorAlwaysShown = newValue;
}, "~B");
Clazz.defineMethod (c$, "isParseBigDecimal", 
function () {
return this.parseBigDecimal;
});
Clazz.defineMethod (c$, "setParseBigDecimal", 
function (newValue) {
this.parseBigDecimal = newValue;
}, "~B");
Clazz.defineMethod (c$, "clone", 
function () {
try {
var other = Clazz.superCall (this, java.text.DecimalFormat, "clone", []);
other.symbols = this.symbols.clone ();
other.digitList = this.digitList.clone ();
return other;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
throw  new InternalError ();
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "equals", 
function (obj) {
if (obj == null) return false;
if (!Clazz.superCall (this, java.text.DecimalFormat, "equals", [obj])) return false;
var other = obj;
return ((this.posPrefixPattern === other.posPrefixPattern && this.positivePrefix.equals (other.positivePrefix)) || (this.posPrefixPattern != null && this.posPrefixPattern.equals (other.posPrefixPattern))) && ((this.posSuffixPattern === other.posSuffixPattern && this.positiveSuffix.equals (other.positiveSuffix)) || (this.posSuffixPattern != null && this.posSuffixPattern.equals (other.posSuffixPattern))) && ((this.negPrefixPattern === other.negPrefixPattern && this.negativePrefix.equals (other.negativePrefix)) || (this.negPrefixPattern != null && this.negPrefixPattern.equals (other.negPrefixPattern))) && ((this.negSuffixPattern === other.negSuffixPattern && this.negativeSuffix.equals (other.negativeSuffix)) || (this.negSuffixPattern != null && this.negSuffixPattern.equals (other.negSuffixPattern))) && this.multiplier == other.multiplier && this.groupingSize == other.groupingSize && this.decimalSeparatorAlwaysShown == other.decimalSeparatorAlwaysShown && this.parseBigDecimal == other.parseBigDecimal && this.useExponentialNotation == other.useExponentialNotation && (!this.useExponentialNotation || this.minExponentDigits == other.minExponentDigits) && this.$maximumIntegerDigits == other.$maximumIntegerDigits && this.$minimumIntegerDigits == other.$minimumIntegerDigits && this.$maximumFractionDigits == other.$maximumFractionDigits && this.$minimumFractionDigits == other.$minimumFractionDigits && this.roundingMode === other.roundingMode && this.symbols.equals (other.symbols);
}, "~O");
Clazz.defineMethod (c$, "hashCode", 
function () {
return Clazz.superCall (this, java.text.DecimalFormat, "hashCode", []) * 37 + this.positivePrefix.hashCode ();
});
Clazz.defineMethod (c$, "toPattern", 
function () {
return this.toPattern (false);
});
Clazz.defineMethod (c$, "toLocalizedPattern", 
function () {
return this.toPattern (true);
});
Clazz.defineMethod (c$, "expandAffixes", 
 function () {
var buffer =  new StringBuffer ();
if (this.posPrefixPattern != null) {
this.positivePrefix = this.expandAffix (this.posPrefixPattern, buffer);
this.positivePrefixFieldPositions = null;
}if (this.posSuffixPattern != null) {
this.positiveSuffix = this.expandAffix (this.posSuffixPattern, buffer);
this.positiveSuffixFieldPositions = null;
}if (this.negPrefixPattern != null) {
this.negativePrefix = this.expandAffix (this.negPrefixPattern, buffer);
this.negativePrefixFieldPositions = null;
}if (this.negSuffixPattern != null) {
this.negativeSuffix = this.expandAffix (this.negSuffixPattern, buffer);
this.negativeSuffixFieldPositions = null;
}});
Clazz.defineMethod (c$, "expandAffix", 
 function (pattern, buffer) {
buffer.setLength (0);
for (var i = 0; i < pattern.length; ) {
var c = pattern.charAt (i++);
if (c == '\'') {
c = pattern.charAt (i++);
switch (c) {
case '\u00a4':
if (i < pattern.length && pattern.charAt (i) == '\u00a4') {
++i;
buffer.append (this.symbols.getInternationalCurrencySymbol ());
} else {
buffer.append (this.symbols.getCurrencySymbol ());
}continue;
case '%':
c = this.symbols.getPercent ();
break;
case '\u2030':
c = this.symbols.getPerMill ();
break;
case '-':
c = this.symbols.getMinusSign ();
break;
}
}buffer.append (c);
}
return buffer.toString ();
}, "~S,StringBuffer");
Clazz.defineMethod (c$, "expandAffix", 
 function (pattern) {
var positions = null;
var stringIndex = 0;
for (var i = 0; i < pattern.length; ) {
var c = pattern.charAt (i++);
if (c == '\'') {
var field = -1;
var fieldID = null;
c = pattern.charAt (i++);
switch (c) {
case '\u00a4':
var string;
if (i < pattern.length && pattern.charAt (i) == '\u00a4') {
++i;
string = this.symbols.getInternationalCurrencySymbol ();
} else {
string = this.symbols.getCurrencySymbol ();
}if (string.length > 0) {
if (positions == null) {
positions =  new java.util.ArrayList (2);
}var fp =  new java.text.FieldPosition (java.text.NumberFormat.Field.CURRENCY);
fp.setBeginIndex (stringIndex);
fp.setEndIndex (stringIndex + string.length);
positions.add (fp);
stringIndex += string.length;
}continue;
case '%':
c = this.symbols.getPercent ();
field = -1;
fieldID = java.text.NumberFormat.Field.PERCENT;
break;
case '\u2030':
c = this.symbols.getPerMill ();
field = -1;
fieldID = java.text.NumberFormat.Field.PERMILLE;
break;
case '-':
c = this.symbols.getMinusSign ();
field = -1;
fieldID = java.text.NumberFormat.Field.SIGN;
break;
}
if (fieldID != null) {
if (positions == null) {
positions =  new java.util.ArrayList (2);
}var fp =  new java.text.FieldPosition (fieldID, field);
fp.setBeginIndex (stringIndex);
fp.setEndIndex (stringIndex + 1);
positions.add (fp);
}}stringIndex++;
}
if (positions != null) {
return positions.toArray (java.text.DecimalFormat.EmptyFieldPositionArray);
}return java.text.DecimalFormat.EmptyFieldPositionArray;
}, "~S");
Clazz.defineMethod (c$, "appendAffix", 
 function (buffer, affixPattern, expAffix, localized) {
if (affixPattern == null) {
this.appendAffix (buffer, expAffix, localized);
} else {
var i;
for (var pos = 0; pos < affixPattern.length; pos = i) {
i = affixPattern.indexOf ('\'', pos);
if (i < 0) {
this.appendAffix (buffer, affixPattern.substring (pos), localized);
break;
}if (i > pos) {
this.appendAffix (buffer, affixPattern.substring (pos, i), localized);
}var c = affixPattern.charAt (++i);
++i;
if (c == '\'') {
buffer.append (c);
} else if (c == '\u00a4' && i < affixPattern.length && affixPattern.charAt (i) == '\u00a4') {
++i;
buffer.append (c);
} else if (localized) {
switch (c) {
case '%':
c = this.symbols.getPercent ();
break;
case '\u2030':
c = this.symbols.getPerMill ();
break;
case '-':
c = this.symbols.getMinusSign ();
break;
}
}buffer.append (c);
}
}}, "StringBuffer,~S,~S,~B");
Clazz.defineMethod (c$, "appendAffix", 
 function (buffer, affix, localized) {
var needQuote;
if (localized) {
needQuote = affix.indexOf (this.symbols.getZeroDigit ()) >= 0 || affix.indexOf (this.symbols.getGroupingSeparator ()) >= 0 || affix.indexOf (this.symbols.getDecimalSeparator ()) >= 0 || affix.indexOf (this.symbols.getPercent ()) >= 0 || affix.indexOf (this.symbols.getPerMill ()) >= 0 || affix.indexOf (this.symbols.getDigit ()) >= 0 || affix.indexOf (this.symbols.getPatternSeparator ()) >= 0 || affix.indexOf (this.symbols.getMinusSign ()) >= 0 || affix.indexOf ('\u00a4') >= 0;
} else {
needQuote = affix.indexOf ('0') >= 0 || affix.indexOf (',') >= 0 || affix.indexOf ('.') >= 0 || affix.indexOf ('%') >= 0 || affix.indexOf ('\u2030') >= 0 || affix.indexOf ('#') >= 0 || affix.indexOf (';') >= 0 || affix.indexOf ('-') >= 0 || affix.indexOf ('\u00a4') >= 0;
}if (needQuote) buffer.append ('\'');
if (affix.indexOf ('\'') < 0) buffer.append (affix);
 else {
for (var j = 0; j < affix.length; ++j) {
var c = affix.charAt (j);
buffer.append (c);
if (c == '\'') buffer.append (c);
}
}if (needQuote) buffer.append ('\'');
}, "StringBuffer,~S,~B");
Clazz.defineMethod (c$, "toPattern", 
 function (localized) {
var result =  new StringBuffer ();
for (var j = 1; j >= 0; --j) {
if (j == 1) this.appendAffix (result, this.posPrefixPattern, this.positivePrefix, localized);
 else this.appendAffix (result, this.negPrefixPattern, this.negativePrefix, localized);
var i;
var digitCount = this.useExponentialNotation ? this.getMaximumIntegerDigits () : Math.max (this.groupingSize, this.getMinimumIntegerDigits ()) + 1;
for (i = digitCount; i > 0; --i) {
if (i != digitCount && this.isGroupingUsed () && this.groupingSize != 0 && i % this.groupingSize == 0) {
result.append (localized ? this.symbols.getGroupingSeparator () : ',');
}result.append (i <= this.getMinimumIntegerDigits () ? (localized ? this.symbols.getZeroDigit () : '0') : (localized ? this.symbols.getDigit () : '#'));
}
if (this.getMaximumFractionDigits () > 0 || this.decimalSeparatorAlwaysShown) result.append (localized ? this.symbols.getDecimalSeparator () : '.');
for (i = 0; i < this.getMaximumFractionDigits (); ++i) {
if (i < this.getMinimumFractionDigits ()) {
result.append (localized ? this.symbols.getZeroDigit () : '0');
} else {
result.append (localized ? this.symbols.getDigit () : '#');
}}
if (this.useExponentialNotation) {
result.append (localized ? this.symbols.getExponentSeparator () : "E");
for (i = 0; i < this.minExponentDigits; ++i) result.append (localized ? this.symbols.getZeroDigit () : '0');

}if (j == 1) {
this.appendAffix (result, this.posSuffixPattern, this.positiveSuffix, localized);
if ((this.negSuffixPattern === this.posSuffixPattern && this.negativeSuffix.equals (this.positiveSuffix)) || (this.negSuffixPattern != null && this.negSuffixPattern.equals (this.posSuffixPattern))) {
if ((this.negPrefixPattern != null && this.posPrefixPattern != null && this.negPrefixPattern.equals ("'-" + this.posPrefixPattern)) || (this.negPrefixPattern === this.posPrefixPattern && this.negativePrefix.equals (this.symbols.getMinusSign () + this.positivePrefix))) break;
}result.append (localized ? this.symbols.getPatternSeparator () : ';');
} else this.appendAffix (result, this.negSuffixPattern, this.negativeSuffix, localized);
}
return result.toString ();
}, "~B");
Clazz.defineMethod (c$, "applyPattern", 
function (pattern) {
this.applyPattern (pattern, false);
}, "~S");
Clazz.defineMethod (c$, "applyLocalizedPattern", 
function (pattern) {
this.applyPattern (pattern, true);
}, "~S");
Clazz.defineMethod (c$, "applyPattern", 
 function (pattern, localized) {
var zeroDigit = '0';
var groupingSeparator = ',';
var decimalSeparator = '.';
var percent = '%';
var perMill = '\u2030';
var digit = '#';
var separator = ';';
var exponent = "E";
var minus = '-';
if (localized) {
zeroDigit = this.symbols.getZeroDigit ();
groupingSeparator = this.symbols.getGroupingSeparator ();
decimalSeparator = this.symbols.getDecimalSeparator ();
percent = this.symbols.getPercent ();
perMill = this.symbols.getPerMill ();
digit = this.symbols.getDigit ();
separator = this.symbols.getPatternSeparator ();
exponent = this.symbols.getExponentSeparator ();
minus = this.symbols.getMinusSign ();
}var gotNegative = false;
this.decimalSeparatorAlwaysShown = false;
this.isCurrencyFormat = false;
this.useExponentialNotation = false;
var phaseOneLength = 0;
var start = 0;
for (var j = 1; j >= 0 && start < pattern.length; --j) {
var inQuote = false;
var prefix =  new StringBuffer ();
var suffix =  new StringBuffer ();
var decimalPos = -1;
var multiplier = 1;
var digitLeftCount = 0;
var zeroDigitCount = 0;
var digitRightCount = 0;
var groupingCount = -1;
var phase = 0;
var affix = prefix;
for (var pos = start; pos < pattern.length; ++pos) {
var ch = pattern.charAt (pos);
switch (phase) {
case 0:
case 2:
if (inQuote) {
if (ch == '\'') {
if ((pos + 1) < pattern.length && pattern.charAt (pos + 1) == '\'') {
++pos;
affix.append ("''");
} else {
inQuote = false;
}continue;
}} else {
if (ch == digit || ch == zeroDigit || ch == groupingSeparator || ch == decimalSeparator) {
phase = 1;
--pos;
continue;
} else if (ch == '\u00a4') {
var doubled = (pos + 1) < pattern.length && pattern.charAt (pos + 1) == '\u00a4';
if (doubled) {
++pos;
}this.isCurrencyFormat = true;
affix.append (doubled ? "'\u00A4\u00A4" : "'\u00A4");
continue;
} else if (ch == '\'') {
if (ch == '\'') {
if ((pos + 1) < pattern.length && pattern.charAt (pos + 1) == '\'') {
++pos;
affix.append ("''");
} else {
inQuote = true;
}continue;
}} else if (ch == separator) {
if (phase == 0 || j == 0) {
throw  new IllegalArgumentException ("Unquoted special character '" + ch + "' in pattern \"" + pattern + '"');
}start = pos + 1;
pos = pattern.length;
continue;
} else if (ch == percent) {
if (multiplier != 1) {
throw  new IllegalArgumentException ("Too many percent/per mille characters in pattern \"" + pattern + '"');
}multiplier = 100;
affix.append ("'%");
continue;
} else if (ch == perMill) {
if (multiplier != 1) {
throw  new IllegalArgumentException ("Too many percent/per mille characters in pattern \"" + pattern + '"');
}multiplier = 1000;
affix.append ("'\u2030");
continue;
} else if (ch == minus) {
affix.append ("'-");
continue;
}}affix.append (ch);
break;
case 1:
if (j == 1) {
++phaseOneLength;
} else {
if (--phaseOneLength == 0) {
phase = 2;
affix = suffix;
}continue;
}if (ch == digit) {
if (zeroDigitCount > 0) {
++digitRightCount;
} else {
++digitLeftCount;
}if (groupingCount >= 0 && decimalPos < 0) {
++groupingCount;
}} else if (ch == zeroDigit) {
if (digitRightCount > 0) {
throw  new IllegalArgumentException ("Unexpected '0' in pattern \"" + pattern + '"');
}++zeroDigitCount;
if (groupingCount >= 0 && decimalPos < 0) {
++groupingCount;
}} else if (ch == groupingSeparator) {
groupingCount = 0;
} else if (ch == decimalSeparator) {
if (decimalPos >= 0) {
throw  new IllegalArgumentException ("Multiple decimal separators in pattern \"" + pattern + '"');
}decimalPos = digitLeftCount + zeroDigitCount + digitRightCount;
} else if (pattern.regionMatches (pos, exponent, 0, exponent.length)) {
if (this.useExponentialNotation) {
throw  new IllegalArgumentException ("Multiple exponential symbols in pattern \"" + pattern + '"');
}this.useExponentialNotation = true;
this.minExponentDigits = 0;
pos = pos + exponent.length;
while (pos < pattern.length && pattern.charAt (pos) == zeroDigit) {
++this.minExponentDigits;
++phaseOneLength;
++pos;
}
if ((digitLeftCount + zeroDigitCount) < 1 || this.minExponentDigits < 1) {
throw  new IllegalArgumentException ("Malformed exponential pattern \"" + pattern + '"');
}phase = 2;
affix = suffix;
--pos;
continue;
} else {
phase = 2;
affix = suffix;
--pos;
--phaseOneLength;
continue;
}break;
}
}
if (zeroDigitCount == 0 && digitLeftCount > 0 && decimalPos >= 0) {
var n = decimalPos;
if (n == 0) {
++n;
}digitRightCount = digitLeftCount - n;
digitLeftCount = n - 1;
zeroDigitCount = 1;
}if ((decimalPos < 0 && digitRightCount > 0) || (decimalPos >= 0 && (decimalPos < digitLeftCount || decimalPos > (digitLeftCount + zeroDigitCount))) || groupingCount == 0 || inQuote) {
throw  new IllegalArgumentException ("Malformed pattern \"" + pattern + '"');
}if (j == 1) {
this.posPrefixPattern = prefix.toString ();
this.posSuffixPattern = suffix.toString ();
this.negPrefixPattern = this.posPrefixPattern;
this.negSuffixPattern = this.posSuffixPattern;
var digitTotalCount = digitLeftCount + zeroDigitCount + digitRightCount;
var effectiveDecimalPos = decimalPos >= 0 ? decimalPos : digitTotalCount;
this.setMinimumIntegerDigits (effectiveDecimalPos - digitLeftCount);
this.setMaximumIntegerDigits (this.useExponentialNotation ? digitLeftCount + this.getMinimumIntegerDigits () : 2147483647);
this.setMaximumFractionDigits (decimalPos >= 0 ? (digitTotalCount - decimalPos) : 0);
this.setMinimumFractionDigits (decimalPos >= 0 ? (digitLeftCount + zeroDigitCount - decimalPos) : 0);
this.setGroupingUsed (groupingCount > 0);
this.groupingSize = (groupingCount > 0) ? groupingCount : 0;
this.multiplier = multiplier;
this.setDecimalSeparatorAlwaysShown (decimalPos == 0 || decimalPos == digitTotalCount);
} else {
this.negPrefixPattern = prefix.toString ();
this.negSuffixPattern = suffix.toString ();
gotNegative = true;
}}
if (pattern.length == 0) {
this.posPrefixPattern = this.posSuffixPattern = "";
this.setMinimumIntegerDigits (0);
this.setMaximumIntegerDigits (2147483647);
this.setMinimumFractionDigits (0);
this.setMaximumFractionDigits (2147483647);
}if (!gotNegative || (this.negPrefixPattern.equals (this.posPrefixPattern) && this.negSuffixPattern.equals (this.posSuffixPattern))) {
this.negSuffixPattern = this.posSuffixPattern;
this.negPrefixPattern = "'-" + this.posPrefixPattern;
}this.expandAffixes ();
}, "~S,~B");
Clazz.defineMethod (c$, "setMaximumIntegerDigits", 
function (newValue) {
this.$maximumIntegerDigits = Math.min (Math.max (0, newValue), 2147483647);
Clazz.superCall (this, java.text.DecimalFormat, "setMaximumIntegerDigits", [(this.$maximumIntegerDigits > 309) ? 309 : this.$maximumIntegerDigits]);
if (this.$minimumIntegerDigits > this.$maximumIntegerDigits) {
this.$minimumIntegerDigits = this.$maximumIntegerDigits;
Clazz.superCall (this, java.text.DecimalFormat, "setMinimumIntegerDigits", [(this.$minimumIntegerDigits > 309) ? 309 : this.$minimumIntegerDigits]);
}}, "~N");
Clazz.defineMethod (c$, "setMinimumIntegerDigits", 
function (newValue) {
this.$minimumIntegerDigits = Math.min (Math.max (0, newValue), 2147483647);
Clazz.superCall (this, java.text.DecimalFormat, "setMinimumIntegerDigits", [(this.$minimumIntegerDigits > 309) ? 309 : this.$minimumIntegerDigits]);
if (this.$minimumIntegerDigits > this.$maximumIntegerDigits) {
this.$maximumIntegerDigits = this.$minimumIntegerDigits;
Clazz.superCall (this, java.text.DecimalFormat, "setMaximumIntegerDigits", [(this.$maximumIntegerDigits > 309) ? 309 : this.$maximumIntegerDigits]);
}}, "~N");
Clazz.defineMethod (c$, "setMaximumFractionDigits", 
function (newValue) {
this.$maximumFractionDigits = Math.min (Math.max (0, newValue), 2147483647);
Clazz.superCall (this, java.text.DecimalFormat, "setMaximumFractionDigits", [(this.$maximumFractionDigits > 340) ? 340 : this.$maximumFractionDigits]);
if (this.$minimumFractionDigits > this.$maximumFractionDigits) {
this.$minimumFractionDigits = this.$maximumFractionDigits;
Clazz.superCall (this, java.text.DecimalFormat, "setMinimumFractionDigits", [(this.$minimumFractionDigits > 340) ? 340 : this.$minimumFractionDigits]);
}}, "~N");
Clazz.defineMethod (c$, "setMinimumFractionDigits", 
function (newValue) {
this.$minimumFractionDigits = Math.min (Math.max (0, newValue), 2147483647);
Clazz.superCall (this, java.text.DecimalFormat, "setMinimumFractionDigits", [(this.$minimumFractionDigits > 340) ? 340 : this.$minimumFractionDigits]);
if (this.$minimumFractionDigits > this.$maximumFractionDigits) {
this.$maximumFractionDigits = this.$minimumFractionDigits;
Clazz.superCall (this, java.text.DecimalFormat, "setMaximumFractionDigits", [(this.$maximumFractionDigits > 340) ? 340 : this.$maximumFractionDigits]);
}}, "~N");
Clazz.defineMethod (c$, "getMaximumIntegerDigits", 
function () {
return this.$maximumIntegerDigits;
});
Clazz.defineMethod (c$, "getMinimumIntegerDigits", 
function () {
return this.$minimumIntegerDigits;
});
Clazz.defineMethod (c$, "getMaximumFractionDigits", 
function () {
return this.$maximumFractionDigits;
});
Clazz.defineMethod (c$, "getMinimumFractionDigits", 
function () {
return this.$minimumFractionDigits;
});
Clazz.overrideMethod (c$, "getRoundingMode", 
function () {
return this.roundingMode;
});
Clazz.overrideMethod (c$, "setRoundingMode", 
function (roundingMode) {
if (roundingMode == null) {
throw  new NullPointerException ();
}this.roundingMode = roundingMode;
this.digitList.setRoundingMode (roundingMode);
}, "java.math.RoundingMode");
Clazz.defineMethod (c$, "adjustForCurrencyDefaultFractionDigits", 
function () {
var digits = 2;
var oldMinDigits = this.getMinimumFractionDigits ();
if (oldMinDigits == this.getMaximumFractionDigits ()) {
this.setMinimumFractionDigits (digits);
this.setMaximumFractionDigits (digits);
} else {
this.setMinimumFractionDigits (Math.min (digits, oldMinDigits));
this.setMaximumFractionDigits (digits);
}});
Clazz.defineStatics (c$,
"STATUS_INFINITE", 0,
"STATUS_POSITIVE", 1,
"STATUS_LENGTH", 2,
"PATTERN_ZERO_DIGIT", '0',
"PATTERN_GROUPING_SEPARATOR", ',',
"PATTERN_DECIMAL_SEPARATOR", '.',
"PATTERN_PER_MILLE", '\u2030',
"PATTERN_PERCENT", '%',
"PATTERN_DIGIT", '#',
"PATTERN_SEPARATOR", ';',
"PATTERN_EXPONENT", "E",
"PATTERN_MINUS", '-',
"CURRENCY_SIGN", '\u00A4',
"QUOTE", '\'');
c$.EmptyFieldPositionArray = c$.prototype.EmptyFieldPositionArray =  new Array (0);
Clazz.defineStatics (c$,
"DOUBLE_INTEGER_DIGITS", 309,
"DOUBLE_FRACTION_DIGITS", 340,
"MAXIMUM_INTEGER_DIGITS", 2147483647,
"MAXIMUM_FRACTION_DIGITS", 2147483647);
c$.$cachedLocaleData = c$.prototype.$cachedLocaleData =  new java.util.Hashtable (3);
});
