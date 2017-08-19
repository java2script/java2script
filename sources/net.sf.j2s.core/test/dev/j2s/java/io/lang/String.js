Clazz.load (null, "java.lang.String", ["java.lang.AbstractStringBuilder", "$.ConditionalSpecialCasing", "$.IllegalArgumentException", "$.IndexOutOfBoundsException", "$.NullPointerException", "$.StringCoding", "$.StringIndexOutOfBoundsException", "java.util.Arrays", "$.Formatter", "$.Locale", "java.util.regex.Matcher", "$.Pattern"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang, "String", null, [java.io.Serializable, Comparable, CharSequence]);

Clazz.newMethod$(C$, '$init$', function () {
this.value = null;
this.offset = 0;
this.count = 0;
this.hash = 0;
}, 1);

Clazz.newMethod$(C$, 'construct', function () {
C$.$init$.apply(this);
this.offset = 0;
this.count = 0;
this.value =  Clazz.newArray$(Character.TYPE, [0]);
}, 1);

Clazz.newMethod$(C$, 'construct$S', function (original) {
C$.$init$.apply(this);
var size = original.count;
var originalValue = original.value;
var v;
if (originalValue.length > size) {
var off = original.offset;
v = java.util.Arrays.copyOfRange$CA$I$I (originalValue, off, off + size);
} else {
v = originalValue;
}this.offset = 0;
this.count = size;
this.value = v;
}, 1);

Clazz.newMethod$(C$, 'construct$CA', function (value) {
C$.$init$.apply(this);
var size = value.length;
this.offset = 0;
this.count = size;
this.value = java.util.Arrays.copyOf$CA$I (value, size);
}, 1);

Clazz.newMethod$(C$, 'construct$CA$I$I', function (value, offset, count) {
C$.$init$.apply(this);
if (offset < 0) {
throw Clazz.$new(StringIndexOutOfBoundsException.construct$I,[offset]);
}if (count < 0) {
throw Clazz.$new(StringIndexOutOfBoundsException.construct$I,[count]);
}if (offset > value.length - count) {
throw Clazz.$new(StringIndexOutOfBoundsException.construct$I,[offset + count]);
}this.offset = 0;
this.count = count;
this.value = java.util.Arrays.copyOfRange$CA$I$I (value, offset, offset + count);
}, 1);

Clazz.newMethod$(C$, 'construct$IA$I$I', function (codePoints, offset, count) {
C$.$init$.apply(this);
if (offset < 0) {
throw Clazz.$new(StringIndexOutOfBoundsException.construct$I,[offset]);
}if (count < 0) {
throw Clazz.$new(StringIndexOutOfBoundsException.construct$I,[count]);
}if (offset > codePoints.length - count) {
throw Clazz.$new(StringIndexOutOfBoundsException.construct$I,[offset + count]);
}var n = 0;
for (var i = offset; i < offset + count; i++) {
var c = codePoints[i];
if (c >= 0 && c < 65536) n += 1;
 else if (Character.isSupplementaryCodePoint (c)) n += 2;
 else throw Clazz.$new(IllegalArgumentException.construct$S,[Integer.toString (c)]);
}
var v =  Clazz.newArray$(Character.TYPE, [n]);
for (var i = offset, j = 0; i < offset + count; i++) {
var c = codePoints[i];
if (c < 65536) {
v[j++] = String.fromCharCode (c);
} else {
Character.toSurrogates (c, v, j);
j += 2;
}}
this.value = v;
this.count = v.length;
this.offset = 0;
}, 1);

Clazz.newMethod$(C$, 'construct$BA$I$I$I', function (ascii, hibyte, offset, count) {
C$.$init$.apply(this);
String.checkBounds$BA$I$I (ascii, offset, count);
var value =  Clazz.newArray$(Character.TYPE, [count]);
if (hibyte == 0) {
for (var i = count; i-- > 0; ) {
value[i] = String.fromCharCode (ascii[i + offset] & 0xff);
}
} else {
hibyte <<= 8;
for (var i = count; i-- > 0; ) {
value[i] = String.fromCharCode (hibyte | (ascii[i + offset] & 0xff));
}
}this.offset = 0;
this.count = count;
this.value = value;
}, 1);

Clazz.newMethod$(C$, 'construct$BA$I', function (ascii, hibyte) {
C$.construct$BA$I$I$I.apply(this, [ascii, hibyte, 0, ascii.length]);
}, 1);

Clazz.newMethod$(C$, 'checkBounds$BA$I$I', function (bytes, offset, length) {
if (length < 0) throw Clazz.$new(StringIndexOutOfBoundsException.construct$I,[length]);
if (offset < 0) throw Clazz.$new(StringIndexOutOfBoundsException.construct$I,[offset]);
if (offset > bytes.length - length) throw Clazz.$new(StringIndexOutOfBoundsException.construct$I,[offset + length]);
}, 1);

Clazz.newMethod$(C$, 'construct$BA$I$I$S', function (bytes, offset, length, charsetName) {
C$.$init$.apply(this);
if (charsetName == null) throw Clazz.$new(NullPointerException.construct$S,["charsetName"]);
String.checkBounds$BA$I$I (bytes, offset, length);
var v = StringCoding.decode$S$BA$I$I (charsetName, bytes, offset, length);
this.offset = 0;
this.count = v.length;
this.value = v;
}, 1);

Clazz.newMethod$(C$, 'construct$BA$I$I$java_nio_charset_Charset', function (bytes, offset, length, charset) {
C$.$init$.apply(this);
if (charset == null) throw Clazz.$new(NullPointerException.construct$S,["charset"]);
String.checkBounds$BA$I$I (bytes, offset, length);
var v = StringCoding.decode$java_nio_charset_Charset$BA$I$I (charset, bytes, offset, length);
this.offset = 0;
this.count = v.length;
this.value = v;
}, 1);

Clazz.newMethod$(C$, 'construct$BA$S', function (bytes, charsetName) {
C$.construct$BA$I$I$S.apply(this, [bytes, 0, bytes.length, charsetName]);
}, 1);

Clazz.newMethod$(C$, 'construct$BA$java_nio_charset_Charset', function (bytes, charset) {
C$.construct$BA$I$I$java_nio_charset_Charset.apply(this, [bytes, 0, bytes.length, charset]);
}, 1);

Clazz.newMethod$(C$, 'construct$BA$I$I', function (bytes, offset, length) {
C$.$init$.apply(this);
String.checkBounds$BA$I$I (bytes, offset, length);
var v = StringCoding.decode$BA$I$I (bytes, offset, length);
this.offset = 0;
this.count = v.length;
this.value = v;
}, 1);

Clazz.newMethod$(C$, 'construct$BA', function (bytes) {
C$.construct$BA$I$I.apply(this, [bytes, 0, bytes.length]);
}, 1);

Clazz.newMethod$(C$, 'construct$StringBuffer', function (buffer) {
C$.$init$.apply(this);
var result = buffer.toString ();
this.value = result.value;
this.count = result.count;
this.offset = result.offset;
}, 1);

Clazz.newMethod$(C$, 'construct$StringBuilder', function (builder) {
C$.$init$.apply(this);
var result = builder.toString ();
this.value = result.value;
this.count = result.count;
this.offset = result.offset;
}, 1);

Clazz.newMethod$(C$, 'construct$I$I$CA', function (offset, count, value) {
C$.$init$.apply(this);
this.value = value;
this.offset = offset;
this.count = count;
}, 1);

Clazz.newMethod$(C$, 'length', function () {
return this.count;
});

Clazz.newMethod$(C$, 'isEmpty', function () {
return this.count == 0;
});

Clazz.newMethod$(C$, 'charAt$I', function (index) {
if ((index < 0) || (index >= this.count)) {
throw Clazz.$new(StringIndexOutOfBoundsException.construct$I,[index]);
}return this.value[index + this.offset];
});

Clazz.newMethod$(C$, 'codePointAt$I', function (index) {
if ((index < 0) || (index >= this.count)) {
throw Clazz.$new(StringIndexOutOfBoundsException.construct$I,[index]);
}return Character.codePointAtImpl (this.value, this.offset + index, this.offset + this.count);
});

Clazz.newMethod$(C$, 'codePointBefore$I', function (index) {
var i = index - 1;
if ((i < 0) || (i >= this.count)) {
throw Clazz.$new(StringIndexOutOfBoundsException.construct$I,[index]);
}return Character.codePointBeforeImpl (this.value, this.offset + index, this.offset);
});

Clazz.newMethod$(C$, 'codePointCount$I$I', function (beginIndex, endIndex) {
if (beginIndex < 0 || endIndex > this.count || beginIndex > endIndex) {
throw Clazz.$new(IndexOutOfBoundsException.construct,[]);
}return Character.codePointCountImpl (this.value, this.offset + beginIndex, endIndex - beginIndex);
});

Clazz.newMethod$(C$, 'offsetByCodePoints$I$I', function (index, codePointOffset) {
if (index < 0 || index > this.count) {
throw Clazz.$new(IndexOutOfBoundsException.construct,[]);
}return Character.offsetByCodePointsImpl (this.value, this.offset, this.count, this.offset + index, codePointOffset) - this.offset;
});

Clazz.newMethod$(C$, 'getChars$CA$I', function (dst, dstBegin) {
System.arraycopy$O$I$O$I$I (this.value, this.offset, dst, dstBegin, this.count);
});

Clazz.newMethod$(C$, 'getChars$I$I$CA$I', function (srcBegin, srcEnd, dst, dstBegin) {
if (srcBegin < 0) {
throw Clazz.$new(StringIndexOutOfBoundsException.construct$I,[srcBegin]);
}if (srcEnd > this.count) {
throw Clazz.$new(StringIndexOutOfBoundsException.construct$I,[srcEnd]);
}if (srcBegin > srcEnd) {
throw Clazz.$new(StringIndexOutOfBoundsException.construct$I,[srcEnd - srcBegin]);
}System.arraycopy$O$I$O$I$I (this.value, this.offset + srcBegin, dst, dstBegin, srcEnd - srcBegin);
});

Clazz.newMethod$(C$, 'getBytes$I$I$BA$I', function (srcBegin, srcEnd, dst, dstBegin) {
if (srcBegin < 0) {
throw Clazz.$new(StringIndexOutOfBoundsException.construct$I,[srcBegin]);
}if (srcEnd > this.count) {
throw Clazz.$new(StringIndexOutOfBoundsException.construct$I,[srcEnd]);
}if (srcBegin > srcEnd) {
throw Clazz.$new(StringIndexOutOfBoundsException.construct$I,[srcEnd - srcBegin]);
}var j = dstBegin;
var n = this.offset + srcEnd;
var i = this.offset + srcBegin;
var val = this.value;
while (i < n) {
dst[j++] = (val[i++]).charCodeAt (0);
}
});

Clazz.newMethod$(C$, 'getBytes$S', function (charsetName) {
if (charsetName == null) throw Clazz.$new(NullPointerException.construct,[]);
return StringCoding.encode$S$CA$I$I (charsetName, this.value, this.offset, this.count);
});

Clazz.newMethod$(C$, 'getBytes$java_nio_charset_Charset', function (charset) {
if (charset == null) throw Clazz.$new(NullPointerException.construct,[]);
return StringCoding.encode$java_nio_charset_Charset$CA$I$I (charset, this.value, this.offset, this.count);
});

Clazz.newMethod$(C$, 'getBytes', function () {
return StringCoding.encode$CA$I$I (this.value, this.offset, this.count);
});

Clazz.newMethod$(C$, 'equals$O', function (anObject) {
if (this === anObject) {
return true;
}if (Clazz.instanceOf(anObject, String)) {
var anotherString = anObject;
var n = this.count;
if (n == anotherString.count) {
var v1 = this.value;
var v2 = anotherString.value;
var i = this.offset;
var j = anotherString.offset;
while (n-- != 0) {
if (v1[i++] != v2[j++]) return false;
}
return true;
}}return false;
});

Clazz.newMethod$(C$, 'contentEquals$StringBuffer', function (sb) {
{
return this.contentEquals$CharSequence (sb);
}});

Clazz.newMethod$(C$, 'contentEquals$CharSequence', function (cs) {
if (this.count != cs.length) return false;
if (Clazz.instanceOf(cs, AbstractStringBuilder)) {
var v1 = this.value;
var v2 = (cs).getValue ();
var i = this.offset;
var j = 0;
var n = this.count;
while (n-- != 0) {
if (v1[i++] != v2[j++]) return false;
}
return true;
}if (cs.equals$O (this)) return true;
var v1 = this.value;
var i = this.offset;
var j = 0;
var n = this.count;
while (n-- != 0) {
if (v1[i++] != cs.charAt$I (j++)) return false;
}
return true;
});

Clazz.newMethod$(C$, 'equalsIgnoreCase$S', function (anotherString) {
return (this === anotherString) ? true : (anotherString != null) && (anotherString.count == this.count) && this.regionMatches$Z$I$S$I$I (true, 0, anotherString, 0, this.count);
});

Clazz.newMethod$(C$, 'compareTo$S', function (anotherString) {
var len1 = this.count;
var len2 = anotherString.count;
var n = Math.min (len1, len2);
var v1 = this.value;
var v2 = anotherString.value;
var i = this.offset;
var j = anotherString.offset;
if (i == j) {
var k = i;
var lim = n + i;
while (k < lim) {
var c1 = v1[k];
var c2 = v2[k];
if (c1 != c2) {
return c1.charCodeAt (0) - c2.charCodeAt (0);
}k++;
}
} else {
while (n-- != 0) {
var c1 = v1[i++];
var c2 = v2[j++];
if (c1 != c2) {
return c1.charCodeAt (0) - c2.charCodeAt (0);
}}
}return len1 - len2;
});

Clazz.newMethod$(C$, 'compareToIgnoreCase$S', function (str) {
return String.CASE_INSENSITIVE_ORDER.compare$S$S (this, str);
});

Clazz.newMethod$(C$, 'regionMatches$I$S$I$I', function (toffset, other, ooffset, len) {
var ta = this.value;
var to = this.offset + toffset;
var pa = other.value;
var po = other.offset + ooffset;
if ((ooffset < 0) || (toffset < 0) || (toffset > this.count - len) || (ooffset > other.count - len)) {
return false;
}while (len-- > 0) {
if (ta[to++] != pa[po++]) {
return false;
}}
return true;
});

Clazz.newMethod$(C$, 'regionMatches$Z$I$S$I$I', function (ignoreCase, toffset, other, ooffset, len) {
var ta = this.value;
var to = this.offset + toffset;
var pa = other.value;
var po = other.offset + ooffset;
if ((ooffset < 0) || (toffset < 0) || (toffset > this.count - len) || (ooffset > other.count - len)) {
return false;
}while (len-- > 0) {
var c1 = ta[to++];
var c2 = pa[po++];
if (c1 == c2) {
continue;
}if (ignoreCase) {
var u1 = Character.toUpperCase (c1);
var u2 = Character.toUpperCase (c2);
if (u1 == u2) {
continue;
}if (Character.toLowerCase (u1) == Character.toLowerCase (u2)) {
continue;
}}return false;
}
return true;
});

Clazz.newMethod$(C$, 'startsWith$S$I', function (prefix, toffset) {
var ta = this.value;
var to = this.offset + toffset;
var pa = prefix.value;
var po = prefix.offset;
var pc = prefix.count;
if ((toffset < 0) || (toffset > this.count - pc)) {
return false;
}while (--pc >= 0) {
if (ta[to++] != pa[po++]) {
return false;
}}
return true;
});

Clazz.newMethod$(C$, 'startsWith$S', function (prefix) {
return this.startsWith$S$I (prefix, 0);
});

Clazz.newMethod$(C$, 'endsWith$S', function (suffix) {
return this.startsWith$S$I (suffix, this.count - suffix.count);
});

Clazz.newMethod$(C$, 'hashCode', function () {
var h = this.hash;
if (h == 0) {
var off = this.offset;
var val = this.value;
var len = this.count;
for (var i = 0; i < len; i++) {
h = 31 * h + (val[off++]).charCodeAt (0);
}
this.hash = h;
}return h;
});

Clazz.newMethod$(C$, 'indexOf$I', function (ch) {
return this.indexOf$I$I (ch, 0);
});

Clazz.newMethod$(C$, 'indexOf$I$I', function (ch, fromIndex) {
var max = this.offset + this.count;
var v = this.value;
if (fromIndex < 0) {
fromIndex = 0;
} else if (fromIndex >= this.count) {
return -1;
}var i = this.offset + fromIndex;
if (ch < 65536) {
for (; i < max; i++) {
if ((v[i]).charCodeAt (0) == ch) {
return i - this.offset;
}}
return -1;
}if (ch <= 1114111) {
var surrogates = Character.toChars (ch);
for (; i < max; i++) {
if (v[i] == surrogates[0]) {
if (i + 1 == max) {
break;
}if (v[i + 1] == surrogates[1]) {
return i - this.offset;
}}}
}return -1;
});

Clazz.newMethod$(C$, 'lastIndexOf$I', function (ch) {
return this.lastIndexOf$I$I (ch, this.count - 1);
});

Clazz.newMethod$(C$, 'lastIndexOf$I$I', function (ch, fromIndex) {
var min = this.offset;
var v = this.value;
var i = this.offset + ((fromIndex >= this.count) ? this.count - 1 : fromIndex);
if (ch < 65536) {
for (; i >= min; i--) {
if ((v[i]).charCodeAt (0) == ch) {
return i - this.offset;
}}
return -1;
}var max = this.offset + this.count;
if (ch <= 1114111) {
var surrogates = Character.toChars (ch);
for (; i >= min; i--) {
if (v[i] == surrogates[0]) {
if (i + 1 == max) {
break;
}if (v[i + 1] == surrogates[1]) {
return i - this.offset;
}}}
}return -1;
});

Clazz.newMethod$(C$, 'indexOf$S', function (str) {
return this.indexOf$S$I (str, 0);
});

Clazz.newMethod$(C$, 'indexOf$S$I', function (str, fromIndex) {
return String.indexOf$CA$I$I$CA$I$I$I (this.value, this.offset, this.count, str.value, str.offset, str.count, fromIndex);
});

Clazz.newMethod$(C$, 'indexOf$CA$I$I$CA$I$I$I', function (source, sourceOffset, sourceCount, target, targetOffset, targetCount, fromIndex) {
if (fromIndex >= sourceCount) {
return (targetCount == 0 ? sourceCount : -1);
}if (fromIndex < 0) {
fromIndex = 0;
}if (targetCount == 0) {
return fromIndex;
}var first = target[targetOffset];
var max = sourceOffset + (sourceCount - targetCount);
for (var i = sourceOffset + fromIndex; i <= max; i++) {
if (source[i] != first) {
while (++i <= max && source[i] != first) ;
}if (i <= max) {
var j = i + 1;
var end = j + targetCount - 1;
for (var k = targetOffset + 1; j < end && source[j] == target[k]; j++, k++) ;
if (j == end) {
return i - sourceOffset;
}}}
return -1;
}, 1);

Clazz.newMethod$(C$, 'lastIndexOf$S', function (str) {
return this.lastIndexOf$S$I (str, this.count);
});

Clazz.newMethod$(C$, 'lastIndexOf$S$I', function (str, fromIndex) {
return String.lastIndexOf$CA$I$I$CA$I$I$I (this.value, this.offset, this.count, str.value, str.offset, str.count, fromIndex);
});

Clazz.newMethod$(C$, 'lastIndexOf$CA$I$I$CA$I$I$I', function (source, sourceOffset, sourceCount, target, targetOffset, targetCount, fromIndex) {
var rightIndex = sourceCount - targetCount;
if (fromIndex < 0) {
return -1;
}if (fromIndex > rightIndex) {
fromIndex = rightIndex;
}if (targetCount == 0) {
return fromIndex;
}var strLastIndex = targetOffset + targetCount - 1;
var strLastChar = target[strLastIndex];
var min = sourceOffset + targetCount - 1;
var i = min + fromIndex;
startSearchForLastChar : while (true) {
while (i >= min && source[i] != strLastChar) {
i--;
}
if (i < min) {
return -1;
}var j = i - 1;
var start = j - (targetCount - 1);
var k = strLastIndex - 1;
while (j > start) {
if (source[j--] != target[k--]) {
i--;
continue startSearchForLastChar;
}}
return start - sourceOffset + 1;
}
}, 1);

Clazz.newMethod$(C$, 'substring$I', function (beginIndex) {
return this.substring$I$I (beginIndex, this.count);
});

Clazz.newMethod$(C$, 'substring$I$I', function (beginIndex, endIndex) {
if (beginIndex < 0) {
throw Clazz.$new(StringIndexOutOfBoundsException.construct$I,[beginIndex]);
}if (endIndex > this.count) {
throw Clazz.$new(StringIndexOutOfBoundsException.construct$I,[endIndex]);
}if (beginIndex > endIndex) {
throw Clazz.$new(StringIndexOutOfBoundsException.construct$I,[endIndex - beginIndex]);
}return ((beginIndex == 0) && (endIndex == this.count)) ? this :  String.instantialize(this.offset + beginIndex, endIndex - beginIndex, this.value);
});

Clazz.newMethod$(C$, 'subSequence$I$I', function (beginIndex, endIndex) {
return this.substring$I$I (beginIndex, endIndex);
});

Clazz.newMethod$(C$, 'concat$S', function (str) {
var otherLen = str.length;
if (otherLen == 0) {
return this;
}var buf =  Clazz.newArray$(Character.TYPE, [this.count + otherLen]);
this.getChars$I$I$CA$I (0, this.count, buf, 0);
str.getChars$I$I$CA$I (0, otherLen, buf, this.count);
return  String.instantialize(0, this.count + otherLen, buf);
});

Clazz.newMethod$(C$, 'replace$C$C', function (oldChar, newChar) {
if (oldChar != newChar) {
var len = this.count;
var i = -1;
var val = this.value;
var off = this.offset;
while (++i < len) {
if (val[off + i] == oldChar) {
break;
}}
if (i < len) {
var buf =  Clazz.newArray$(Character.TYPE, [len]);
for (var j = 0; j < i; j++) {
buf[j] = val[off + j];
}
while (i < len) {
var c = val[off + i];
buf[i] = (c == oldChar) ? newChar : c;
i++;
}
return  String.instantialize(0, len, buf);
}}return this;
});

Clazz.newMethod$(C$, 'matches$S', function (regex) {
return java.util.regex.Pattern.matches$S$CharSequence (regex, this);
});

Clazz.newMethod$(C$, 'contains$CharSequence', function (s) {
return this.indexOf$S (s.toString ()) > -1;
});

Clazz.newMethod$(C$, 'replaceFirst$S$S', function (regex, replacement) {
return java.util.regex.Pattern.compile$S (regex).matcher$CharSequence (this).replaceFirst$S (replacement);
});

Clazz.newMethod$(C$, 'replaceAll$S$S', function (regex, replacement) {
return java.util.regex.Pattern.compile$S (regex).matcher$CharSequence (this).replaceAll$S (replacement);
});

Clazz.newMethod$(C$, 'replace$CharSequence$CharSequence', function (target, replacement) {
return java.util.regex.Pattern.compile$S$I (target.toString (), 16).matcher$CharSequence (this).replaceAll$S (java.util.regex.Matcher.quoteReplacement$S (replacement.toString ()));
});

Clazz.newMethod$(C$, 'split$S$I', function (regex, limit) {
return java.util.regex.Pattern.compile$S (regex).split$CharSequence$I (this, limit);
});

Clazz.newMethod$(C$, 'split$S', function (regex) {
return $plit (regex, 0);
});

Clazz.newMethod$(C$, 'toLowerCase$java_util_Locale', function (locale) {
if (locale == null) {
throw Clazz.$new(NullPointerException.construct,[]);
}var firstUpper;
scan : {
for (firstUpper = 0; firstUpper < this.count; ) {
var c = this.value[this.offset + firstUpper];
if ((c >= '\ud800') && (c <= '\udbff')) {
var supplChar = this.codePointAt$I (firstUpper);
if (supplChar != Character.toLowerCase (supplChar)) {
break scan;
}firstUpper += Character.charCount (supplChar);
} else {
if (c != Character.toLowerCase (c)) {
break scan;
}firstUpper++;
}}
return this;
}var result =  Clazz.newArray$(Character.TYPE, [this.count]);
var resultOffset = 0;
System.arraycopy$O$I$O$I$I (this.value, this.offset, result, 0, firstUpper);
var lang = locale.getLanguage ();
var localeDependent = (lang === "tr" || lang === "az" || lang === "lt");
var lowerCharArray;
var lowerChar;
var srcChar;
var srcCount;
for (var i = firstUpper; i < this.count; i += srcCount) {
srcChar = (this.value[this.offset + i]).charCodeAt (0);
if (String.fromCharCode (srcChar) >= '\ud800' && String.fromCharCode (srcChar) <= '\udbff') {
srcChar = this.codePointAt$I (i);
srcCount = Character.charCount (srcChar);
} else {
srcCount = 1;
}if (localeDependent || srcChar == 931) {
lowerChar = ConditionalSpecialCasing.toLowerCaseEx$S$I$java_util_Locale (this, i, locale);
} else {
lowerChar = Character.toLowerCase (srcChar);
}if ((lowerChar == -1) || (lowerChar >= 65536)) {
if (lowerChar == -1) {
lowerCharArray = ConditionalSpecialCasing.toLowerCaseCharArray$S$I$java_util_Locale (this, i, locale);
} else if (srcCount == 2) {
resultOffset += Character.toChars (lowerChar, result, i + resultOffset) - srcCount;
continue;
} else {
lowerCharArray = Character.toChars (lowerChar);
}var mapLen = lowerCharArray.length;
if (mapLen > srcCount) {
var result2 =  Clazz.newArray$(Character.TYPE, [result.length + mapLen - srcCount]);
System.arraycopy$O$I$O$I$I (result, 0, result2, 0, i + resultOffset);
result = result2;
}for (var x = 0; x < mapLen; ++x) {
result[i + resultOffset + x] = lowerCharArray[x];
}
resultOffset += (mapLen - srcCount);
} else {
result[i + resultOffset] = String.fromCharCode (lowerChar);
}}
return  String.instantialize(0, this.count + resultOffset, result);
});

Clazz.newMethod$(C$, 'toLowerCase', function () {
return this.toLowerCase$java_util_Locale (java.util.Locale.getDefault ());
});

Clazz.newMethod$(C$, 'toUpperCase$java_util_Locale', function (locale) {
if (locale == null) {
throw Clazz.$new(NullPointerException.construct,[]);
}var firstLower;
scan : {
for (firstLower = 0; firstLower < this.count; ) {
var c = (this.value[this.offset + firstLower]).charCodeAt (0);
var srcCount;
if ((c >= '\ud800'.charCodeAt (0)) && (c <= '\udbff'.charCodeAt (0))) {
c = this.codePointAt$I (firstLower);
srcCount = Character.charCount (c);
} else {
srcCount = 1;
}var upperCaseChar = Character.toUpperCaseEx (c);
if ((upperCaseChar == -1) || (c != upperCaseChar)) {
break scan;
}firstLower += srcCount;
}
return this;
}var result =  Clazz.newArray$(Character.TYPE, [this.count]);
var resultOffset = 0;
System.arraycopy$O$I$O$I$I (this.value, this.offset, result, 0, firstLower);
var lang = locale.getLanguage ();
var localeDependent = (lang === "tr" || lang === "az" || lang === "lt");
var upperCharArray;
var upperChar;
var srcChar;
var srcCount;
for (var i = firstLower; i < this.count; i += srcCount) {
srcChar = (this.value[this.offset + i]).charCodeAt (0);
if (String.fromCharCode (srcChar) >= '\ud800' && String.fromCharCode (srcChar) <= '\udbff') {
srcChar = this.codePointAt$I (i);
srcCount = Character.charCount (srcChar);
} else {
srcCount = 1;
}if (localeDependent) {
upperChar = ConditionalSpecialCasing.toUpperCaseEx$S$I$java_util_Locale (this, i, locale);
} else {
upperChar = Character.toUpperCaseEx (srcChar);
}if ((upperChar == -1) || (upperChar >= 65536)) {
if (upperChar == -1) {
if (localeDependent) {
upperCharArray = ConditionalSpecialCasing.toUpperCaseCharArray$S$I$java_util_Locale (this, i, locale);
} else {
upperCharArray = Character.toUpperCaseCharArray (srcChar);
}} else if (srcCount == 2) {
resultOffset += Character.toChars (upperChar, result, i + resultOffset) - srcCount;
continue;
} else {
upperCharArray = Character.toChars (upperChar);
}var mapLen = upperCharArray.length;
if (mapLen > srcCount) {
var result2 =  Clazz.newArray$(Character.TYPE, [result.length + mapLen - srcCount]);
System.arraycopy$O$I$O$I$I (result, 0, result2, 0, i + resultOffset);
result = result2;
}for (var x = 0; x < mapLen; ++x) {
result[i + resultOffset + x] = upperCharArray[x];
}
resultOffset += (mapLen - srcCount);
} else {
result[i + resultOffset] = String.fromCharCode (upperChar);
}}
return  String.instantialize(0, this.count + resultOffset, result);
});

Clazz.newMethod$(C$, 'toUpperCase', function () {
return this.toUpperCase$java_util_Locale (java.util.Locale.getDefault ());
});

Clazz.newMethod$(C$, 'trim', function () {
var len = this.count;
var st = 0;
var off = this.offset;
var val = this.value;
while ((st < len) && (val[off + st] <= ' ')) {
st++;
}
while ((st < len) && (val[off + len - 1] <= ' ')) {
len--;
}
return ((st > 0) || (len < this.count)) ? this.substring$I$I (st, len) : this;
});

Clazz.newMethod$(C$, 'toString', function () {
return this;
});

Clazz.newMethod$(C$, 'toCharArray', function () {
var result =  Clazz.newArray$(Character.TYPE, [this.count]);
this.getChars$I$I$CA$I (0, this.count, result, 0);
return result;
});

Clazz.newMethod$(C$, 'format$S$OA', function (format, args) {
return Clazz.$new(java.util.Formatter.construct,[]).format$S$OA (format, args).toString ();
}, 1);

Clazz.newMethod$(C$, 'format$java_util_Locale$S$OA', function (l, format, args) {
return Clazz.$new(java.util.Formatter.construct$java_util_Locale,[l]).format$S$OA (format, args).toString ();
}, 1);

Clazz.newMethod$(C$, '$valueOf$O', function (obj) {
return (obj == null) ? "null" : obj.toString ();
}, 1);

Clazz.newMethod$(C$, '$valueOf$CA', function (data) {
return  String.instantialize(data);
}, 1);

Clazz.newMethod$(C$, '$valueOf$CA$I$I', function (data, offset, count) {
return  String.instantialize(data, offset, count);
}, 1);

Clazz.newMethod$(C$, 'copyValueOf$CA$I$I', function (data, offset, count) {
return  String.instantialize(data, offset, count);
}, 1);

Clazz.newMethod$(C$, 'copyValueOf$CA', function (data) {
return String.copyValueOf$CA$I$I (data, 0, data.length);
}, 1);

Clazz.newMethod$(C$, '$valueOf$Z', function (b) {
return b ? "true" : "false";
}, 1);

Clazz.newMethod$(C$, '$valueOf$C', function (c) {
var data =  Clazz.newArray$(Character.TYPE, -1, [c]);
return  String.instantialize(0, 1, data);
}, 1);

Clazz.newMethod$(C$, '$valueOf$I', function (i) {
return Integer.toString (i, 10);
}, 1);

Clazz.newMethod$(C$, '$valueOf$J', function (l) {
return Long.toString (l, 10);
}, 1);

Clazz.newMethod$(C$, '$valueOf$F', function (f) {
return Float.toString (f);
}, 1);

Clazz.newMethod$(C$, '$valueOf$D', function (d) {
return Double.toString (d);
}, 1);

Clazz.newMethod$(C$, 'intern', function () {
// native_code
});
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], false);
}, String, "CaseInsensitiveComparator", null, [java.util.Comparator, java.io.Serializable]);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'compare$S$S', function (s1, s2) {
var n1 = s1.length;
var n2 = s2.length;
var min = Math.min (n1, n2);
for (var i = 0; i < min; i++) {
var c1 = s1.charAt$I (i);
var c2 = s2.charAt$I (i);
if (c1 != c2) {
c1 = Character.toUpperCase (c1);
c2 = Character.toUpperCase (c2);
if (c1 != c2) {
c1 = Character.toLowerCase (c1);
c2 = Character.toLowerCase (c2);
if (c1 != c2) {
return c1.charCodeAt (0) - c2.charCodeAt (0);
}}}}
return n1 - n2;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
Clazz.defineStatics$ (C$, ["serialPersistentFields",  Clazz.newArray$(java.io.ObjectStreamField, [0]),
"CASE_INSENSITIVE_ORDER", Clazz.$new(String.CaseInsensitiveComparator.construct,[])
]);
})()
});

//Created 2017-08-18 22:18:00
