Clazz.load (["java.util.HashMap"], "java.lang.Character", ["java.lang.CharacterData", "$.IllegalArgumentException", "$.IndexOutOfBoundsException", "$.NullPointerException", "java.util.Locale"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang, "Character", null, [java.io.Serializable, Comparable]);

Clazz.newMethod$(C$, '$init$', function () {
this.value = '\0';
}, 1);

Clazz.newMethod$(C$, 'construct', function (value) {
C$.$init$.apply(this);
this.value = value;
}, 1);

Clazz.newMethod$(C$, '$valueOf', function (c) {
if (c.charCodeAt (0) <= 127) {
return Character.CharacterCache.cache[(c).charCodeAt (0)];
}return Clazz.$new(Character.construct,[c]);
}, 1);

Clazz.newMethod$(C$, 'charValue', function () {
return this.value;
});

Clazz.newMethod$(C$, 'hashCode', function () {
return (this.value).charCodeAt (0);
});

Clazz.newMethod$(C$, 'equals', function (obj) {
if (Clazz.instanceOf(obj, Character)) {
return this.value == (obj).charValue ();
}return false;
});

Clazz.newMethod$(C$, 'toString', function () {
var buf =  Clazz.newArray$(Character.TYPE, -1, [this.value]);
return String.valueOf$CA (buf);
});

Clazz.newMethod$(C$, 'toString', function (c) {
return String.valueOf$C (c);
}, 1);

Clazz.newMethod$(C$, 'isValidCodePoint', function (codePoint) {
return codePoint >= 0 && codePoint <= 1114111;
}, 1);

Clazz.newMethod$(C$, 'isSupplementaryCodePoint', function (codePoint) {
return codePoint >= 65536 && codePoint <= 1114111;
}, 1);

Clazz.newMethod$(C$, 'isHighSurrogate', function (ch) {
return ch >= '\ud800' && ch <= '\udbff';
}, 1);

Clazz.newMethod$(C$, 'isLowSurrogate', function (ch) {
return ch >= '\udc00' && ch <= '\udfff';
}, 1);

Clazz.newMethod$(C$, 'isSurrogatePair', function (high, low) {
return Character.isHighSurrogate (high) && Character.isLowSurrogate (low);
}, 1);

Clazz.newMethod$(C$, 'charCount', function (codePoint) {
return codePoint >= 65536 ? 2 : 1;
}, 1);

Clazz.newMethod$(C$, 'toCodePoint', function (high, low) {
return ((high.charCodeAt (0) - '\ud800'.charCodeAt (0)) << 10) + (low.charCodeAt (0) - '\udc00'.charCodeAt (0)) + 65536;
}, 1);

Clazz.newMethod$(C$, 'codePointAt', function (seq, index) {
var c1 = seq.charAt$I (index++);
if (Character.isHighSurrogate (c1)) {
if (index < seq.length) {
var c2 = seq.charAt$I (index);
if (Character.isLowSurrogate (c2)) {
return Character.toCodePoint (c1, c2);
}}}return c1;
}, 1);

Clazz.newMethod$(C$, 'codePointAt', function (a, index) {
return Character.codePointAtImpl (a, index, a.length);
}, 1);

Clazz.newMethod$(C$, 'codePointAt', function (a, index, limit) {
if (index >= limit || limit < 0 || limit > a.length) {
throw Clazz.$new(IndexOutOfBoundsException.construct,[]);
}return Character.codePointAtImpl (a, index, limit);
}, 1);

Clazz.newMethod$(C$, 'codePointAtImpl', function (a, index, limit) {
var c1 = a[index++];
if (Character.isHighSurrogate (c1)) {
if (index < limit) {
var c2 = a[index];
if (Character.isLowSurrogate (c2)) {
return Character.toCodePoint (c1, c2);
}}}return c1;
}, 1);

Clazz.newMethod$(C$, 'codePointBefore', function (seq, index) {
var c2 = seq.charAt$I (--index);
if (Character.isLowSurrogate (c2)) {
if (index > 0) {
var c1 = seq.charAt$I (--index);
if (Character.isHighSurrogate (c1)) {
return Character.toCodePoint (c1, c2);
}}}return c2;
}, 1);

Clazz.newMethod$(C$, 'codePointBefore', function (a, index) {
return Character.codePointBeforeImpl (a, index, 0);
}, 1);

Clazz.newMethod$(C$, 'codePointBefore', function (a, index, start) {
if (index <= start || start < 0 || start >= a.length) {
throw Clazz.$new(IndexOutOfBoundsException.construct,[]);
}return Character.codePointBeforeImpl (a, index, start);
}, 1);

Clazz.newMethod$(C$, 'codePointBeforeImpl', function (a, index, start) {
var c2 = a[--index];
if (Character.isLowSurrogate (c2)) {
if (index > start) {
var c1 = a[--index];
if (Character.isHighSurrogate (c1)) {
return Character.toCodePoint (c1, c2);
}}}return c2;
}, 1);

Clazz.newMethod$(C$, 'toChars', function (codePoint, dst, dstIndex) {
if (codePoint < 0 || codePoint > 1114111) {
throw Clazz.$new(IllegalArgumentException.construct,[]);
}if (codePoint < 65536) {
dst[dstIndex] = String.fromCharCode (codePoint);
return 1;
}Character.toSurrogates (codePoint, dst, dstIndex);
return 2;
}, 1);

Clazz.newMethod$(C$, 'toChars', function (codePoint) {
if (codePoint < 0 || codePoint > 1114111) {
throw Clazz.$new(IllegalArgumentException.construct,[]);
}if (codePoint < 65536) {
return  Clazz.newArray$(Character.TYPE, -1, [String.fromCharCode (codePoint)]);
}var result =  Clazz.newArray$(Character.TYPE, [2]);
Character.toSurrogates (codePoint, result, 0);
return result;
}, 1);

Clazz.newMethod$(C$, 'toSurrogates', function (codePoint, dst, index) {
var offset = codePoint - 65536;
dst[index + 1] = String.fromCharCode ((offset & 0x3ff) + '\udc00'.charCodeAt (0));
dst[index] = String.fromCharCode ((offset >>> 10) + '\ud800'.charCodeAt (0));
}, 1);

Clazz.newMethod$(C$, 'codePointCount', function (seq, beginIndex, endIndex) {
var length = seq.length;
if (beginIndex < 0 || endIndex > length || beginIndex > endIndex) {
throw Clazz.$new(IndexOutOfBoundsException.construct,[]);
}var n = 0;
for (var i = beginIndex; i < endIndex; ) {
n++;
if (Character.isHighSurrogate (seq.charAt$I (i++))) {
if (i < endIndex && Character.isLowSurrogate (seq.charAt$I (i))) {
i++;
}}}
return n;
}, 1);

Clazz.newMethod$(C$, 'codePointCount', function (a, offset, count) {
if (count > a.length - offset || offset < 0 || count < 0) {
throw Clazz.$new(IndexOutOfBoundsException.construct,[]);
}return Character.codePointCountImpl (a, offset, count);
}, 1);

Clazz.newMethod$(C$, 'codePointCountImpl', function (a, offset, count) {
var endIndex = offset + count;
var n = 0;
for (var i = offset; i < endIndex; ) {
n++;
if (Character.isHighSurrogate (a[i++])) {
if (i < endIndex && Character.isLowSurrogate (a[i])) {
i++;
}}}
return n;
}, 1);

Clazz.newMethod$(C$, 'offsetByCodePoints', function (seq, index, codePointOffset) {
var length = seq.length;
if (index < 0 || index > length) {
throw Clazz.$new(IndexOutOfBoundsException.construct,[]);
}var x = index;
if (codePointOffset >= 0) {
var i;
for (i = 0; x < length && i < codePointOffset; i++) {
if (Character.isHighSurrogate (seq.charAt$I (x++))) {
if (x < length && Character.isLowSurrogate (seq.charAt$I (x))) {
x++;
}}}
if (i < codePointOffset) {
throw Clazz.$new(IndexOutOfBoundsException.construct,[]);
}} else {
var i;
for (i = codePointOffset; x > 0 && i < 0; i++) {
if (Character.isLowSurrogate (seq.charAt$I (--x))) {
if (x > 0 && Character.isHighSurrogate (seq.charAt$I (x - 1))) {
x--;
}}}
if (i < 0) {
throw Clazz.$new(IndexOutOfBoundsException.construct,[]);
}}return x;
}, 1);

Clazz.newMethod$(C$, 'offsetByCodePoints', function (a, start, count, index, codePointOffset) {
if (count > a.length - start || start < 0 || count < 0 || index < start || index > start + count) {
throw Clazz.$new(IndexOutOfBoundsException.construct,[]);
}return Character.offsetByCodePointsImpl (a, start, count, index, codePointOffset);
}, 1);

Clazz.newMethod$(C$, 'offsetByCodePointsImpl', function (a, start, count, index, codePointOffset) {
var x = index;
if (codePointOffset >= 0) {
var limit = start + count;
var i;
for (i = 0; x < limit && i < codePointOffset; i++) {
if (Character.isHighSurrogate (a[x++])) {
if (x < limit && Character.isLowSurrogate (a[x])) {
x++;
}}}
if (i < codePointOffset) {
throw Clazz.$new(IndexOutOfBoundsException.construct,[]);
}} else {
var i;
for (i = codePointOffset; x > start && i < 0; i++) {
if (Character.isLowSurrogate (a[--x])) {
if (x > start && Character.isHighSurrogate (a[x - 1])) {
x--;
}}}
if (i < 0) {
throw Clazz.$new(IndexOutOfBoundsException.construct,[]);
}}return x;
}, 1);

Clazz.newMethod$(C$, 'isLowerCase', function (ch) {
return Character.isLowerCase ((ch).charCodeAt (0));
}, 1);

Clazz.newMethod$(C$, 'isLowerCase', function (codePoint) {
return Character.getType (codePoint) == 2;
}, 1);

Clazz.newMethod$(C$, 'isUpperCase', function (ch) {
return Character.isUpperCase ((ch).charCodeAt (0));
}, 1);

Clazz.newMethod$(C$, 'isUpperCase', function (codePoint) {
return Character.getType (codePoint) == 1;
}, 1);

Clazz.newMethod$(C$, 'isTitleCase', function (ch) {
return Character.isTitleCase ((ch).charCodeAt (0));
}, 1);

Clazz.newMethod$(C$, 'isTitleCase', function (codePoint) {
return Character.getType (codePoint) == 3;
}, 1);

Clazz.newMethod$(C$, 'isDigit', function (ch) {
return Character.isDigit ((ch).charCodeAt (0));
}, 1);

Clazz.newMethod$(C$, 'isDigit', function (codePoint) {
return Character.getType (codePoint) == 9;
}, 1);

Clazz.newMethod$(C$, 'isDefined', function (ch) {
return Character.isDefined ((ch).charCodeAt (0));
}, 1);

Clazz.newMethod$(C$, 'isDefined', function (codePoint) {
return Character.getType (codePoint) != 0;
}, 1);

Clazz.newMethod$(C$, 'isLetter', function (ch) {
return Character.isLetter ((ch).charCodeAt (0));
}, 1);

Clazz.newMethod$(C$, 'isLetter', function (codePoint) {
return (((62) >> Character.getType (codePoint)) & 1) != 0;
}, 1);

Clazz.newMethod$(C$, 'isLetterOrDigit', function (ch) {
return Character.isLetterOrDigit ((ch).charCodeAt (0));
}, 1);

Clazz.newMethod$(C$, 'isLetterOrDigit', function (codePoint) {
return (((574) >> Character.getType (codePoint)) & 1) != 0;
}, 1);

Clazz.newMethod$(C$, 'isJavaLetter', function (ch) {
return Character.isJavaIdentifierStart (ch);
}, 1);

Clazz.newMethod$(C$, 'isJavaLetterOrDigit', function (ch) {
return Character.isJavaIdentifierPart (ch);
}, 1);

Clazz.newMethod$(C$, 'isJavaIdentifierStart', function (ch) {
return Character.isJavaIdentifierStart ((ch).charCodeAt (0));
}, 1);

Clazz.newMethod$(C$, 'isJavaIdentifierStart', function (codePoint) {
return CharacterData.of (codePoint).isJavaIdentifierStart (codePoint);
}, 1);

Clazz.newMethod$(C$, 'isJavaIdentifierPart', function (ch) {
return Character.isJavaIdentifierPart ((ch).charCodeAt (0));
}, 1);

Clazz.newMethod$(C$, 'isJavaIdentifierPart', function (codePoint) {
return CharacterData.of (codePoint).isJavaIdentifierPart (codePoint);
}, 1);

Clazz.newMethod$(C$, 'isUnicodeIdentifierStart', function (ch) {
return Character.isUnicodeIdentifierStart ((ch).charCodeAt (0));
}, 1);

Clazz.newMethod$(C$, 'isUnicodeIdentifierStart', function (codePoint) {
return CharacterData.of (codePoint).isUnicodeIdentifierStart (codePoint);
}, 1);

Clazz.newMethod$(C$, 'isUnicodeIdentifierPart', function (ch) {
return Character.isUnicodeIdentifierPart ((ch).charCodeAt (0));
}, 1);

Clazz.newMethod$(C$, 'isUnicodeIdentifierPart', function (codePoint) {
return CharacterData.of (codePoint).isUnicodeIdentifierPart (codePoint);
}, 1);

Clazz.newMethod$(C$, 'isIdentifierIgnorable', function (ch) {
return Character.isIdentifierIgnorable ((ch).charCodeAt (0));
}, 1);

Clazz.newMethod$(C$, 'isIdentifierIgnorable', function (codePoint) {
return CharacterData.of (codePoint).isIdentifierIgnorable (codePoint);
}, 1);

Clazz.newMethod$(C$, 'toLowerCase', function (ch) {
return String.fromCharCode (Character.toLowerCase ((ch).charCodeAt (0)));
}, 1);

Clazz.newMethod$(C$, 'toLowerCase', function (codePoint) {
return CharacterData.of (codePoint).toLowerCase (codePoint);
}, 1);

Clazz.newMethod$(C$, 'toUpperCase', function (ch) {
return String.fromCharCode (Character.toUpperCase ((ch).charCodeAt (0)));
}, 1);

Clazz.newMethod$(C$, 'toUpperCase', function (codePoint) {
return CharacterData.of (codePoint).toUpperCase (codePoint);
}, 1);

Clazz.newMethod$(C$, 'toTitleCase', function (ch) {
return String.fromCharCode (Character.toTitleCase ((ch).charCodeAt (0)));
}, 1);

Clazz.newMethod$(C$, 'toTitleCase', function (codePoint) {
return CharacterData.of (codePoint).toTitleCase (codePoint);
}, 1);

Clazz.newMethod$(C$, 'digit', function (ch, radix) {
return Character.digit ((ch).charCodeAt (0), radix);
}, 1);

Clazz.newMethod$(C$, 'digit', function (codePoint, radix) {
return CharacterData.of (codePoint).digit (codePoint, radix);
}, 1);

Clazz.newMethod$(C$, 'getNumericValue', function (ch) {
return Character.getNumericValue ((ch).charCodeAt (0));
}, 1);

Clazz.newMethod$(C$, 'getNumericValue', function (codePoint) {
return CharacterData.of (codePoint).getNumericValue (codePoint);
}, 1);

Clazz.newMethod$(C$, 'isSpace', function (ch) {
return (ch.charCodeAt (0) <= 0x0020) && ((((4294981120) >> ch.charCodeAt (0)) & 1) != 0);
}, 1);

Clazz.newMethod$(C$, 'isSpaceChar', function (ch) {
return Character.isSpaceChar ((ch).charCodeAt (0));
}, 1);

Clazz.newMethod$(C$, 'isSpaceChar', function (codePoint) {
return (((28672) >> Character.getType (codePoint)) & 1) != 0;
}, 1);

Clazz.newMethod$(C$, 'isWhitespace', function (ch) {
return Character.isWhitespace ((ch).charCodeAt (0));
}, 1);

Clazz.newMethod$(C$, 'isWhitespace', function (codePoint) {
return CharacterData.of (codePoint).isWhitespace (codePoint);
}, 1);

Clazz.newMethod$(C$, 'isISOControl', function (ch) {
return Character.isISOControl ((ch).charCodeAt (0));
}, 1);

Clazz.newMethod$(C$, 'isISOControl', function (codePoint) {
return (codePoint >= 0x0000 && codePoint <= 0x001F) || (codePoint >= 0x007F && codePoint <= 0x009F);
}, 1);

Clazz.newMethod$(C$, 'getType', function (ch) {
return Character.getType ((ch).charCodeAt (0));
}, 1);

Clazz.newMethod$(C$, 'getType', function (codePoint) {
return CharacterData.of (codePoint).getType (codePoint);
}, 1);

Clazz.newMethod$(C$, 'forDigit', function (digit, radix) {
if ((digit >= radix) || (digit < 0)) {
return '\0';
}if ((radix < 2) || (radix > 36)) {
return '\0';
}if (digit < 10) {
return String.fromCharCode (48 + digit);
}return String.fromCharCode (87 + digit);
}, 1);

Clazz.newMethod$(C$, 'getDirectionality', function (ch) {
return Character.getDirectionality ((ch).charCodeAt (0));
}, 1);

Clazz.newMethod$(C$, 'getDirectionality', function (codePoint) {
return CharacterData.of (codePoint).getDirectionality (codePoint);
}, 1);

Clazz.newMethod$(C$, 'isMirrored', function (ch) {
return Character.isMirrored ((ch).charCodeAt (0));
}, 1);

Clazz.newMethod$(C$, 'isMirrored', function (codePoint) {
return CharacterData.of (codePoint).isMirrored (codePoint);
}, 1);

Clazz.newMethod$(C$, 'compareTo', function (anotherCharacter) {
return (this.value).charCodeAt (0) - anotherCharacter.value.charCodeAt (0);
});

Clazz.newMethod$(C$, 'toUpperCaseEx', function (codePoint) {
return CharacterData.of (codePoint).toUpperCaseEx (codePoint);
}, 1);

Clazz.newMethod$(C$, 'toUpperCaseCharArray', function (codePoint) {
return CharacterData.of (codePoint).toUpperCaseCharArray (codePoint);
}, 1);

Clazz.newMethod$(C$, 'reverseBytes', function (ch) {
return String.fromCharCode (((ch.charCodeAt (0) & 0xFF00) >> 8) | (ch.charCodeAt (0) << 8));
}, 1);

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], false);
}, Character, "Subset");

Clazz.newMethod$(C$, '$init$', function () {
this.name = null;
}, 1);

Clazz.newMethod$(C$, 'construct', function (name) {
C$.$init$.apply(this);
if (name == null) {
throw Clazz.$new(NullPointerException.construct$S,["name"]);
}this.name = name;
}, 1);

Clazz.newMethod$(C$, 'equals', function (obj) {
return (this === obj);
});

Clazz.newMethod$(C$, 'hashCode', function () {
return C$.superClazz.prototype.hashCode.apply(this, arguments);
});

Clazz.newMethod$(C$, 'toString', function () {
return this.name;
});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], false);
}, Character, "UnicodeBlock", Character.Subset);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'construct', function (idName) {
C$.superClazz.construct.apply(this, [idName]);
C$.$init$.apply(this);
Character.UnicodeBlock.map.put$S$Character_UnicodeBlock (idName.toUpperCase$java_util_Locale (java.util.Locale.US), this);
}, 1);

Clazz.newMethod$(C$, 'construct', function (idName, alias) {
C$.construct.apply(this, [idName]);
Character.UnicodeBlock.map.put$S$Character_UnicodeBlock (alias.toUpperCase$java_util_Locale (java.util.Locale.US), this);
}, 1);

Clazz.newMethod$(C$, 'construct', function (idName, aliasName) {
C$.construct.apply(this, [idName]);
if (aliasName != null) {
for (var x = 0; x < aliasName.length; ++x) {
Character.UnicodeBlock.map.put$S$Character_UnicodeBlock (aliasName[x].toUpperCase$java_util_Locale (java.util.Locale.US), this);
}
}}, 1);

Clazz.newMethod$(C$, 'of', function (c) {
return Character.UnicodeBlock.of ((c).charCodeAt (0));
}, 1);

Clazz.newMethod$(C$, 'of', function (codePoint) {
if (!Character.isValidCodePoint (codePoint)) {
throw Clazz.$new(IllegalArgumentException.construct,[]);
}var top;
var bottom;
var current;
bottom = 0;
top = Character.UnicodeBlock.blockStarts.length;
current = Clazz.doubleToInt (top / 2);
while (top - bottom > 1) {
if (codePoint >= Character.UnicodeBlock.blockStarts[current]) {
bottom = current;
} else {
top = current;
}current = Clazz.doubleToInt ((top + bottom) / 2);
}
return Character.UnicodeBlock.blocks[current];
}, 1);

Clazz.newMethod$(C$, 'forName', function (blockName) {
var block = Character.UnicodeBlock.map.get$O (blockName.toUpperCase$java_util_Locale (java.util.Locale.US));
if (block == null) {
throw Clazz.$new(IllegalArgumentException.construct,[]);
}return block;
}, 1);

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
Clazz.defineStatics$ (C$, ["map", Clazz.$new(java.util.HashMap.construct,[]),
"BASIC_LATIN", Clazz.$new(Character.UnicodeBlock.construct,["BASIC_LATIN",  Clazz.newArray$(java.lang.String, -1, ["Basic Latin", "BasicLatin"])]),
"LATIN_1_SUPPLEMENT", Clazz.$new(Character.UnicodeBlock.construct,["LATIN_1_SUPPLEMENT",  Clazz.newArray$(java.lang.String, -1, ["Latin-1 Supplement", "Latin-1Supplement"])]),
"LATIN_EXTENDED_A", Clazz.$new(Character.UnicodeBlock.construct,["LATIN_EXTENDED_A",  Clazz.newArray$(java.lang.String, -1, ["Latin Extended-A", "LatinExtended-A"])]),
"LATIN_EXTENDED_B", Clazz.$new(Character.UnicodeBlock.construct,["LATIN_EXTENDED_B",  Clazz.newArray$(java.lang.String, -1, ["Latin Extended-B", "LatinExtended-B"])]),
"IPA_EXTENSIONS", Clazz.$new(Character.UnicodeBlock.construct,["IPA_EXTENSIONS",  Clazz.newArray$(java.lang.String, -1, ["IPA Extensions", "IPAExtensions"])]),
"SPACING_MODIFIER_LETTERS", Clazz.$new(Character.UnicodeBlock.construct,["SPACING_MODIFIER_LETTERS",  Clazz.newArray$(java.lang.String, -1, ["Spacing Modifier Letters", "SpacingModifierLetters"])]),
"COMBINING_DIACRITICAL_MARKS", Clazz.$new(Character.UnicodeBlock.construct,["COMBINING_DIACRITICAL_MARKS",  Clazz.newArray$(java.lang.String, -1, ["Combining Diacritical Marks", "CombiningDiacriticalMarks"])]),
"GREEK", Clazz.$new(Character.UnicodeBlock.construct,["GREEK",  Clazz.newArray$(java.lang.String, -1, ["Greek and Coptic", "GreekandCoptic"])]),
"CYRILLIC", Clazz.$new(Character.UnicodeBlock.construct,["CYRILLIC"]),
"ARMENIAN", Clazz.$new(Character.UnicodeBlock.construct,["ARMENIAN"]),
"HEBREW", Clazz.$new(Character.UnicodeBlock.construct,["HEBREW"]),
"ARABIC", Clazz.$new(Character.UnicodeBlock.construct,["ARABIC"]),
"DEVANAGARI", Clazz.$new(Character.UnicodeBlock.construct,["DEVANAGARI"]),
"BENGALI", Clazz.$new(Character.UnicodeBlock.construct,["BENGALI"]),
"GURMUKHI", Clazz.$new(Character.UnicodeBlock.construct,["GURMUKHI"]),
"GUJARATI", Clazz.$new(Character.UnicodeBlock.construct,["GUJARATI"]),
"ORIYA", Clazz.$new(Character.UnicodeBlock.construct,["ORIYA"]),
"TAMIL", Clazz.$new(Character.UnicodeBlock.construct,["TAMIL"]),
"TELUGU", Clazz.$new(Character.UnicodeBlock.construct,["TELUGU"]),
"KANNADA", Clazz.$new(Character.UnicodeBlock.construct,["KANNADA"]),
"MALAYALAM", Clazz.$new(Character.UnicodeBlock.construct,["MALAYALAM"]),
"THAI", Clazz.$new(Character.UnicodeBlock.construct,["THAI"]),
"LAO", Clazz.$new(Character.UnicodeBlock.construct,["LAO"]),
"TIBETAN", Clazz.$new(Character.UnicodeBlock.construct,["TIBETAN"]),
"GEORGIAN", Clazz.$new(Character.UnicodeBlock.construct,["GEORGIAN"]),
"HANGUL_JAMO", Clazz.$new(Character.UnicodeBlock.construct,["HANGUL_JAMO",  Clazz.newArray$(java.lang.String, -1, ["Hangul Jamo", "HangulJamo"])]),
"LATIN_EXTENDED_ADDITIONAL", Clazz.$new(Character.UnicodeBlock.construct,["LATIN_EXTENDED_ADDITIONAL",  Clazz.newArray$(java.lang.String, -1, ["Latin Extended Additional", "LatinExtendedAdditional"])]),
"GREEK_EXTENDED", Clazz.$new(Character.UnicodeBlock.construct,["GREEK_EXTENDED",  Clazz.newArray$(java.lang.String, -1, ["Greek Extended", "GreekExtended"])]),
"GENERAL_PUNCTUATION", Clazz.$new(Character.UnicodeBlock.construct,["GENERAL_PUNCTUATION",  Clazz.newArray$(java.lang.String, -1, ["General Punctuation", "GeneralPunctuation"])]),
"SUPERSCRIPTS_AND_SUBSCRIPTS", Clazz.$new(Character.UnicodeBlock.construct,["SUPERSCRIPTS_AND_SUBSCRIPTS",  Clazz.newArray$(java.lang.String, -1, ["Superscripts and Subscripts", "SuperscriptsandSubscripts"])]),
"CURRENCY_SYMBOLS", Clazz.$new(Character.UnicodeBlock.construct,["CURRENCY_SYMBOLS",  Clazz.newArray$(java.lang.String, -1, ["Currency Symbols", "CurrencySymbols"])]),
"COMBINING_MARKS_FOR_SYMBOLS", Clazz.$new(Character.UnicodeBlock.construct,["COMBINING_MARKS_FOR_SYMBOLS",  Clazz.newArray$(java.lang.String, -1, ["Combining Diacritical Marks for Symbols", "CombiningDiacriticalMarksforSymbols", "Combining Marks for Symbols", "CombiningMarksforSymbols"])]),
"LETTERLIKE_SYMBOLS", Clazz.$new(Character.UnicodeBlock.construct,["LETTERLIKE_SYMBOLS",  Clazz.newArray$(java.lang.String, -1, ["Letterlike Symbols", "LetterlikeSymbols"])]),
"NUMBER_FORMS", Clazz.$new(Character.UnicodeBlock.construct,["NUMBER_FORMS",  Clazz.newArray$(java.lang.String, -1, ["Number Forms", "NumberForms"])]),
"ARROWS", Clazz.$new(Character.UnicodeBlock.construct,["ARROWS"]),
"MATHEMATICAL_OPERATORS", Clazz.$new(Character.UnicodeBlock.construct,["MATHEMATICAL_OPERATORS",  Clazz.newArray$(java.lang.String, -1, ["Mathematical Operators", "MathematicalOperators"])]),
"MISCELLANEOUS_TECHNICAL", Clazz.$new(Character.UnicodeBlock.construct,["MISCELLANEOUS_TECHNICAL",  Clazz.newArray$(java.lang.String, -1, ["Miscellaneous Technical", "MiscellaneousTechnical"])]),
"CONTROL_PICTURES", Clazz.$new(Character.UnicodeBlock.construct,["CONTROL_PICTURES",  Clazz.newArray$(java.lang.String, -1, ["Control Pictures", "ControlPictures"])]),
"OPTICAL_CHARACTER_RECOGNITION", Clazz.$new(Character.UnicodeBlock.construct,["OPTICAL_CHARACTER_RECOGNITION",  Clazz.newArray$(java.lang.String, -1, ["Optical Character Recognition", "OpticalCharacterRecognition"])]),
"ENCLOSED_ALPHANUMERICS", Clazz.$new(Character.UnicodeBlock.construct,["ENCLOSED_ALPHANUMERICS",  Clazz.newArray$(java.lang.String, -1, ["Enclosed Alphanumerics", "EnclosedAlphanumerics"])]),
"BOX_DRAWING", Clazz.$new(Character.UnicodeBlock.construct,["BOX_DRAWING",  Clazz.newArray$(java.lang.String, -1, ["Box Drawing", "BoxDrawing"])]),
"BLOCK_ELEMENTS", Clazz.$new(Character.UnicodeBlock.construct,["BLOCK_ELEMENTS",  Clazz.newArray$(java.lang.String, -1, ["Block Elements", "BlockElements"])]),
"GEOMETRIC_SHAPES", Clazz.$new(Character.UnicodeBlock.construct,["GEOMETRIC_SHAPES",  Clazz.newArray$(java.lang.String, -1, ["Geometric Shapes", "GeometricShapes"])]),
"MISCELLANEOUS_SYMBOLS", Clazz.$new(Character.UnicodeBlock.construct,["MISCELLANEOUS_SYMBOLS",  Clazz.newArray$(java.lang.String, -1, ["Miscellaneous Symbols", "MiscellaneousSymbols"])]),
"DINGBATS", Clazz.$new(Character.UnicodeBlock.construct,["DINGBATS"]),
"CJK_SYMBOLS_AND_PUNCTUATION", Clazz.$new(Character.UnicodeBlock.construct,["CJK_SYMBOLS_AND_PUNCTUATION",  Clazz.newArray$(java.lang.String, -1, ["CJK Symbols and Punctuation", "CJKSymbolsandPunctuation"])]),
"HIRAGANA", Clazz.$new(Character.UnicodeBlock.construct,["HIRAGANA"]),
"KATAKANA", Clazz.$new(Character.UnicodeBlock.construct,["KATAKANA"]),
"BOPOMOFO", Clazz.$new(Character.UnicodeBlock.construct,["BOPOMOFO"]),
"HANGUL_COMPATIBILITY_JAMO", Clazz.$new(Character.UnicodeBlock.construct,["HANGUL_COMPATIBILITY_JAMO",  Clazz.newArray$(java.lang.String, -1, ["Hangul Compatibility Jamo", "HangulCompatibilityJamo"])]),
"KANBUN", Clazz.$new(Character.UnicodeBlock.construct,["KANBUN"]),
"ENCLOSED_CJK_LETTERS_AND_MONTHS", Clazz.$new(Character.UnicodeBlock.construct,["ENCLOSED_CJK_LETTERS_AND_MONTHS",  Clazz.newArray$(java.lang.String, -1, ["Enclosed CJK Letters and Months", "EnclosedCJKLettersandMonths"])]),
"CJK_COMPATIBILITY", Clazz.$new(Character.UnicodeBlock.construct,["CJK_COMPATIBILITY",  Clazz.newArray$(java.lang.String, -1, ["CJK Compatibility", "CJKCompatibility"])]),
"CJK_UNIFIED_IDEOGRAPHS", Clazz.$new(Character.UnicodeBlock.construct,["CJK_UNIFIED_IDEOGRAPHS",  Clazz.newArray$(java.lang.String, -1, ["CJK Unified Ideographs", "CJKUnifiedIdeographs"])]),
"HANGUL_SYLLABLES", Clazz.$new(Character.UnicodeBlock.construct,["HANGUL_SYLLABLES",  Clazz.newArray$(java.lang.String, -1, ["Hangul Syllables", "HangulSyllables"])]),
"PRIVATE_USE_AREA", Clazz.$new(Character.UnicodeBlock.construct,["PRIVATE_USE_AREA",  Clazz.newArray$(java.lang.String, -1, ["Private Use Area", "PrivateUseArea"])]),
"CJK_COMPATIBILITY_IDEOGRAPHS", Clazz.$new(Character.UnicodeBlock.construct,["CJK_COMPATIBILITY_IDEOGRAPHS",  Clazz.newArray$(java.lang.String, -1, ["CJK Compatibility Ideographs", "CJKCompatibilityIdeographs"])]),
"ALPHABETIC_PRESENTATION_FORMS", Clazz.$new(Character.UnicodeBlock.construct,["ALPHABETIC_PRESENTATION_FORMS",  Clazz.newArray$(java.lang.String, -1, ["Alphabetic Presentation Forms", "AlphabeticPresentationForms"])]),
"ARABIC_PRESENTATION_FORMS_A", Clazz.$new(Character.UnicodeBlock.construct,["ARABIC_PRESENTATION_FORMS_A",  Clazz.newArray$(java.lang.String, -1, ["Arabic Presentation Forms-A", "ArabicPresentationForms-A"])]),
"COMBINING_HALF_MARKS", Clazz.$new(Character.UnicodeBlock.construct,["COMBINING_HALF_MARKS",  Clazz.newArray$(java.lang.String, -1, ["Combining Half Marks", "CombiningHalfMarks"])]),
"CJK_COMPATIBILITY_FORMS", Clazz.$new(Character.UnicodeBlock.construct,["CJK_COMPATIBILITY_FORMS",  Clazz.newArray$(java.lang.String, -1, ["CJK Compatibility Forms", "CJKCompatibilityForms"])]),
"SMALL_FORM_VARIANTS", Clazz.$new(Character.UnicodeBlock.construct,["SMALL_FORM_VARIANTS",  Clazz.newArray$(java.lang.String, -1, ["Small Form Variants", "SmallFormVariants"])]),
"ARABIC_PRESENTATION_FORMS_B", Clazz.$new(Character.UnicodeBlock.construct,["ARABIC_PRESENTATION_FORMS_B",  Clazz.newArray$(java.lang.String, -1, ["Arabic Presentation Forms-B", "ArabicPresentationForms-B"])]),
"HALFWIDTH_AND_FULLWIDTH_FORMS", Clazz.$new(Character.UnicodeBlock.construct,["HALFWIDTH_AND_FULLWIDTH_FORMS",  Clazz.newArray$(java.lang.String, -1, ["Halfwidth and Fullwidth Forms", "HalfwidthandFullwidthForms"])]),
"SPECIALS", Clazz.$new(Character.UnicodeBlock.construct,["SPECIALS"]),
"SURROGATES_AREA", Clazz.$new(Character.UnicodeBlock.construct,["SURROGATES_AREA"]),
"SYRIAC", Clazz.$new(Character.UnicodeBlock.construct,["SYRIAC"]),
"THAANA", Clazz.$new(Character.UnicodeBlock.construct,["THAANA"]),
"SINHALA", Clazz.$new(Character.UnicodeBlock.construct,["SINHALA"]),
"MYANMAR", Clazz.$new(Character.UnicodeBlock.construct,["MYANMAR"]),
"ETHIOPIC", Clazz.$new(Character.UnicodeBlock.construct,["ETHIOPIC"]),
"CHEROKEE", Clazz.$new(Character.UnicodeBlock.construct,["CHEROKEE"]),
"UNIFIED_CANADIAN_ABORIGINAL_SYLLABICS", Clazz.$new(Character.UnicodeBlock.construct,["UNIFIED_CANADIAN_ABORIGINAL_SYLLABICS",  Clazz.newArray$(java.lang.String, -1, ["Unified Canadian Aboriginal Syllabics", "UnifiedCanadianAboriginalSyllabics"])]),
"OGHAM", Clazz.$new(Character.UnicodeBlock.construct,["OGHAM"]),
"RUNIC", Clazz.$new(Character.UnicodeBlock.construct,["RUNIC"]),
"KHMER", Clazz.$new(Character.UnicodeBlock.construct,["KHMER"]),
"MONGOLIAN", Clazz.$new(Character.UnicodeBlock.construct,["MONGOLIAN"]),
"BRAILLE_PATTERNS", Clazz.$new(Character.UnicodeBlock.construct,["BRAILLE_PATTERNS",  Clazz.newArray$(java.lang.String, -1, ["Braille Patterns", "BraillePatterns"])]),
"CJK_RADICALS_SUPPLEMENT", Clazz.$new(Character.UnicodeBlock.construct,["CJK_RADICALS_SUPPLEMENT",  Clazz.newArray$(java.lang.String, -1, ["CJK Radicals Supplement", "CJKRadicalsSupplement"])]),
"KANGXI_RADICALS", Clazz.$new(Character.UnicodeBlock.construct,["KANGXI_RADICALS",  Clazz.newArray$(java.lang.String, -1, ["Kangxi Radicals", "KangxiRadicals"])]),
"IDEOGRAPHIC_DESCRIPTION_CHARACTERS", Clazz.$new(Character.UnicodeBlock.construct,["IDEOGRAPHIC_DESCRIPTION_CHARACTERS",  Clazz.newArray$(java.lang.String, -1, ["Ideographic Description Characters", "IdeographicDescriptionCharacters"])]),
"BOPOMOFO_EXTENDED", Clazz.$new(Character.UnicodeBlock.construct,["BOPOMOFO_EXTENDED",  Clazz.newArray$(java.lang.String, -1, ["Bopomofo Extended", "BopomofoExtended"])]),
"CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A", Clazz.$new(Character.UnicodeBlock.construct,["CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A",  Clazz.newArray$(java.lang.String, -1, ["CJK Unified Ideographs Extension A", "CJKUnifiedIdeographsExtensionA"])]),
"YI_SYLLABLES", Clazz.$new(Character.UnicodeBlock.construct,["YI_SYLLABLES",  Clazz.newArray$(java.lang.String, -1, ["Yi Syllables", "YiSyllables"])]),
"YI_RADICALS", Clazz.$new(Character.UnicodeBlock.construct,["YI_RADICALS",  Clazz.newArray$(java.lang.String, -1, ["Yi Radicals", "YiRadicals"])]),
"CYRILLIC_SUPPLEMENTARY", Clazz.$new(Character.UnicodeBlock.construct,["CYRILLIC_SUPPLEMENTARY",  Clazz.newArray$(java.lang.String, -1, ["Cyrillic Supplementary", "CyrillicSupplementary"])]),
"TAGALOG", Clazz.$new(Character.UnicodeBlock.construct,["TAGALOG"]),
"HANUNOO", Clazz.$new(Character.UnicodeBlock.construct,["HANUNOO"]),
"BUHID", Clazz.$new(Character.UnicodeBlock.construct,["BUHID"]),
"TAGBANWA", Clazz.$new(Character.UnicodeBlock.construct,["TAGBANWA"]),
"LIMBU", Clazz.$new(Character.UnicodeBlock.construct,["LIMBU"]),
"TAI_LE", Clazz.$new(Character.UnicodeBlock.construct,["TAI_LE",  Clazz.newArray$(java.lang.String, -1, ["Tai Le", "TaiLe"])]),
"KHMER_SYMBOLS", Clazz.$new(Character.UnicodeBlock.construct,["KHMER_SYMBOLS",  Clazz.newArray$(java.lang.String, -1, ["Khmer Symbols", "KhmerSymbols"])]),
"PHONETIC_EXTENSIONS", Clazz.$new(Character.UnicodeBlock.construct,["PHONETIC_EXTENSIONS",  Clazz.newArray$(java.lang.String, -1, ["Phonetic Extensions", "PhoneticExtensions"])]),
"MISCELLANEOUS_MATHEMATICAL_SYMBOLS_A", Clazz.$new(Character.UnicodeBlock.construct,["MISCELLANEOUS_MATHEMATICAL_SYMBOLS_A",  Clazz.newArray$(java.lang.String, -1, ["Miscellaneous Mathematical Symbols-A", "MiscellaneousMathematicalSymbols-A"])]),
"SUPPLEMENTAL_ARROWS_A", Clazz.$new(Character.UnicodeBlock.construct,["SUPPLEMENTAL_ARROWS_A",  Clazz.newArray$(java.lang.String, -1, ["Supplemental Arrows-A", "SupplementalArrows-A"])]),
"SUPPLEMENTAL_ARROWS_B", Clazz.$new(Character.UnicodeBlock.construct,["SUPPLEMENTAL_ARROWS_B",  Clazz.newArray$(java.lang.String, -1, ["Supplemental Arrows-B", "SupplementalArrows-B"])]),
"MISCELLANEOUS_MATHEMATICAL_SYMBOLS_B", Clazz.$new(Character.UnicodeBlock.construct,["MISCELLANEOUS_MATHEMATICAL_SYMBOLS_B",  Clazz.newArray$(java.lang.String, -1, ["Miscellaneous Mathematical Symbols-B", "MiscellaneousMathematicalSymbols-B"])]),
"SUPPLEMENTAL_MATHEMATICAL_OPERATORS", Clazz.$new(Character.UnicodeBlock.construct,["SUPPLEMENTAL_MATHEMATICAL_OPERATORS",  Clazz.newArray$(java.lang.String, -1, ["Supplemental Mathematical Operators", "SupplementalMathematicalOperators"])]),
"MISCELLANEOUS_SYMBOLS_AND_ARROWS", Clazz.$new(Character.UnicodeBlock.construct,["MISCELLANEOUS_SYMBOLS_AND_ARROWS",  Clazz.newArray$(java.lang.String, -1, ["Miscellaneous Symbols and Arrows", "MiscellaneousSymbolsandArrows"])]),
"KATAKANA_PHONETIC_EXTENSIONS", Clazz.$new(Character.UnicodeBlock.construct,["KATAKANA_PHONETIC_EXTENSIONS",  Clazz.newArray$(java.lang.String, -1, ["Katakana Phonetic Extensions", "KatakanaPhoneticExtensions"])]),
"YIJING_HEXAGRAM_SYMBOLS", Clazz.$new(Character.UnicodeBlock.construct,["YIJING_HEXAGRAM_SYMBOLS",  Clazz.newArray$(java.lang.String, -1, ["Yijing Hexagram Symbols", "YijingHexagramSymbols"])]),
"VARIATION_SELECTORS", Clazz.$new(Character.UnicodeBlock.construct,["VARIATION_SELECTORS",  Clazz.newArray$(java.lang.String, -1, ["Variation Selectors", "VariationSelectors"])]),
"LINEAR_B_SYLLABARY", Clazz.$new(Character.UnicodeBlock.construct,["LINEAR_B_SYLLABARY",  Clazz.newArray$(java.lang.String, -1, ["Linear B Syllabary", "LinearBSyllabary"])]),
"LINEAR_B_IDEOGRAMS", Clazz.$new(Character.UnicodeBlock.construct,["LINEAR_B_IDEOGRAMS",  Clazz.newArray$(java.lang.String, -1, ["Linear B Ideograms", "LinearBIdeograms"])]),
"AEGEAN_NUMBERS", Clazz.$new(Character.UnicodeBlock.construct,["AEGEAN_NUMBERS",  Clazz.newArray$(java.lang.String, -1, ["Aegean Numbers", "AegeanNumbers"])]),
"OLD_ITALIC", Clazz.$new(Character.UnicodeBlock.construct,["OLD_ITALIC",  Clazz.newArray$(java.lang.String, -1, ["Old Italic", "OldItalic"])]),
"GOTHIC", Clazz.$new(Character.UnicodeBlock.construct,["GOTHIC"]),
"UGARITIC", Clazz.$new(Character.UnicodeBlock.construct,["UGARITIC"]),
"DESERET", Clazz.$new(Character.UnicodeBlock.construct,["DESERET"]),
"SHAVIAN", Clazz.$new(Character.UnicodeBlock.construct,["SHAVIAN"]),
"OSMANYA", Clazz.$new(Character.UnicodeBlock.construct,["OSMANYA"]),
"CYPRIOT_SYLLABARY", Clazz.$new(Character.UnicodeBlock.construct,["CYPRIOT_SYLLABARY",  Clazz.newArray$(java.lang.String, -1, ["Cypriot Syllabary", "CypriotSyllabary"])]),
"BYZANTINE_MUSICAL_SYMBOLS", Clazz.$new(Character.UnicodeBlock.construct,["BYZANTINE_MUSICAL_SYMBOLS",  Clazz.newArray$(java.lang.String, -1, ["Byzantine Musical Symbols", "ByzantineMusicalSymbols"])]),
"MUSICAL_SYMBOLS", Clazz.$new(Character.UnicodeBlock.construct,["MUSICAL_SYMBOLS",  Clazz.newArray$(java.lang.String, -1, ["Musical Symbols", "MusicalSymbols"])]),
"TAI_XUAN_JING_SYMBOLS", Clazz.$new(Character.UnicodeBlock.construct,["TAI_XUAN_JING_SYMBOLS",  Clazz.newArray$(java.lang.String, -1, ["Tai Xuan Jing Symbols", "TaiXuanJingSymbols"])]),
"MATHEMATICAL_ALPHANUMERIC_SYMBOLS", Clazz.$new(Character.UnicodeBlock.construct,["MATHEMATICAL_ALPHANUMERIC_SYMBOLS",  Clazz.newArray$(java.lang.String, -1, ["Mathematical Alphanumeric Symbols", "MathematicalAlphanumericSymbols"])]),
"CJK_UNIFIED_IDEOGRAPHS_EXTENSION_B", Clazz.$new(Character.UnicodeBlock.construct,["CJK_UNIFIED_IDEOGRAPHS_EXTENSION_B",  Clazz.newArray$(java.lang.String, -1, ["CJK Unified Ideographs Extension B", "CJKUnifiedIdeographsExtensionB"])]),
"CJK_COMPATIBILITY_IDEOGRAPHS_SUPPLEMENT", Clazz.$new(Character.UnicodeBlock.construct,["CJK_COMPATIBILITY_IDEOGRAPHS_SUPPLEMENT",  Clazz.newArray$(java.lang.String, -1, ["CJK Compatibility Ideographs Supplement", "CJKCompatibilityIdeographsSupplement"])]),
"TAGS", Clazz.$new(Character.UnicodeBlock.construct,["TAGS"]),
"VARIATION_SELECTORS_SUPPLEMENT", Clazz.$new(Character.UnicodeBlock.construct,["VARIATION_SELECTORS_SUPPLEMENT",  Clazz.newArray$(java.lang.String, -1, ["Variation Selectors Supplement", "VariationSelectorsSupplement"])]),
"SUPPLEMENTARY_PRIVATE_USE_AREA_A", Clazz.$new(Character.UnicodeBlock.construct,["SUPPLEMENTARY_PRIVATE_USE_AREA_A",  Clazz.newArray$(java.lang.String, -1, ["Supplementary Private Use Area-A", "SupplementaryPrivateUseArea-A"])]),
"SUPPLEMENTARY_PRIVATE_USE_AREA_B", Clazz.$new(Character.UnicodeBlock.construct,["SUPPLEMENTARY_PRIVATE_USE_AREA_B",  Clazz.newArray$(java.lang.String, -1, ["Supplementary Private Use Area-B", "SupplementaryPrivateUseArea-B"])]),
"HIGH_SURROGATES", Clazz.$new(Character.UnicodeBlock.construct,["HIGH_SURROGATES",  Clazz.newArray$(java.lang.String, -1, ["High Surrogates", "HighSurrogates"])]),
"HIGH_PRIVATE_USE_SURROGATES", Clazz.$new(Character.UnicodeBlock.construct,["HIGH_PRIVATE_USE_SURROGATES",  Clazz.newArray$(java.lang.String, -1, ["High Private Use Surrogates", "HighPrivateUseSurrogates"])]),
"LOW_SURROGATES", Clazz.$new(Character.UnicodeBlock.construct,["LOW_SURROGATES",  Clazz.newArray$(java.lang.String, -1, ["Low Surrogates", "LowSurrogates"])]),
"blockStarts",  Clazz.newArray$(Integer.TYPE, -1, [0x0000, 0x0080, 0x0100, 0x0180, 0x0250, 0x02B0, 0x0300, 0x0370, 0x0400, 0x0500, 0x0530, 0x0590, 0x0600, 0x0700, 0x0750, 0x0780, 0x07C0, 0x0900, 0x0980, 0x0A00, 0x0A80, 0x0B00, 0x0B80, 0x0C00, 0x0C80, 0x0D00, 0x0D80, 0x0E00, 0x0E80, 0x0F00, 0x1000, 0x10A0, 0x1100, 0x1200, 0x1380, 0x13A0, 0x1400, 0x1680, 0x16A0, 0x1700, 0x1720, 0x1740, 0x1760, 0x1780, 0x1800, 0x18B0, 0x1900, 0x1950, 0x1980, 0x19E0, 0x1A00, 0x1D00, 0x1D80, 0x1E00, 0x1F00, 0x2000, 0x2070, 0x20A0, 0x20D0, 0x2100, 0x2150, 0x2190, 0x2200, 0x2300, 0x2400, 0x2440, 0x2460, 0x2500, 0x2580, 0x25A0, 0x2600, 0x2700, 0x27C0, 0x27F0, 0x2800, 0x2900, 0x2980, 0x2A00, 0x2B00, 0x2C00, 0x2E80, 0x2F00, 0x2FE0, 0x2FF0, 0x3000, 0x3040, 0x30A0, 0x3100, 0x3130, 0x3190, 0x31A0, 0x31C0, 0x31F0, 0x3200, 0x3300, 0x3400, 0x4DC0, 0x4E00, 0xA000, 0xA490, 0xA4D0, 0xAC00, 0xD7B0, 0xD800, 0xDB80, 0xDC00, 0xE000, 0xF900, 0xFB00, 0xFB50, 0xFE00, 0xFE10, 0xFE20, 0xFE30, 0xFE50, 0xFE70, 0xFF00, 0xFFF0, 0x10000, 0x10080, 0x10100, 0x10140, 0x10300, 0x10330, 0x10350, 0x10380, 0x103A0, 0x10400, 0x10450, 0x10480, 0x104B0, 0x10800, 0x10840, 0x1D000, 0x1D100, 0x1D200, 0x1D300, 0x1D360, 0x1D400, 0x1D800, 0x20000, 0x2A6E0, 0x2F800, 0x2FA20, 0xE0000, 0xE0080, 0xE0100, 0xE01F0, 0xF0000, 0x100000]),
"blocks",  Clazz.newArray$(java.lang.Character.UnicodeBlock, -1, [Character.UnicodeBlock.BASIC_LATIN, Character.UnicodeBlock.LATIN_1_SUPPLEMENT, Character.UnicodeBlock.LATIN_EXTENDED_A, Character.UnicodeBlock.LATIN_EXTENDED_B, Character.UnicodeBlock.IPA_EXTENSIONS, Character.UnicodeBlock.SPACING_MODIFIER_LETTERS, Character.UnicodeBlock.COMBINING_DIACRITICAL_MARKS, Character.UnicodeBlock.GREEK, Character.UnicodeBlock.CYRILLIC, Character.UnicodeBlock.CYRILLIC_SUPPLEMENTARY, Character.UnicodeBlock.ARMENIAN, Character.UnicodeBlock.HEBREW, Character.UnicodeBlock.ARABIC, Character.UnicodeBlock.SYRIAC, null, Character.UnicodeBlock.THAANA, null, Character.UnicodeBlock.DEVANAGARI, Character.UnicodeBlock.BENGALI, Character.UnicodeBlock.GURMUKHI, Character.UnicodeBlock.GUJARATI, Character.UnicodeBlock.ORIYA, Character.UnicodeBlock.TAMIL, Character.UnicodeBlock.TELUGU, Character.UnicodeBlock.KANNADA, Character.UnicodeBlock.MALAYALAM, Character.UnicodeBlock.SINHALA, Character.UnicodeBlock.THAI, Character.UnicodeBlock.LAO, Character.UnicodeBlock.TIBETAN, Character.UnicodeBlock.MYANMAR, Character.UnicodeBlock.GEORGIAN, Character.UnicodeBlock.HANGUL_JAMO, Character.UnicodeBlock.ETHIOPIC, null, Character.UnicodeBlock.CHEROKEE, Character.UnicodeBlock.UNIFIED_CANADIAN_ABORIGINAL_SYLLABICS, Character.UnicodeBlock.OGHAM, Character.UnicodeBlock.RUNIC, Character.UnicodeBlock.TAGALOG, Character.UnicodeBlock.HANUNOO, Character.UnicodeBlock.BUHID, Character.UnicodeBlock.TAGBANWA, Character.UnicodeBlock.KHMER, Character.UnicodeBlock.MONGOLIAN, null, Character.UnicodeBlock.LIMBU, Character.UnicodeBlock.TAI_LE, null, Character.UnicodeBlock.KHMER_SYMBOLS, null, Character.UnicodeBlock.PHONETIC_EXTENSIONS, null, Character.UnicodeBlock.LATIN_EXTENDED_ADDITIONAL, Character.UnicodeBlock.GREEK_EXTENDED, Character.UnicodeBlock.GENERAL_PUNCTUATION, Character.UnicodeBlock.SUPERSCRIPTS_AND_SUBSCRIPTS, Character.UnicodeBlock.CURRENCY_SYMBOLS, Character.UnicodeBlock.COMBINING_MARKS_FOR_SYMBOLS, Character.UnicodeBlock.LETTERLIKE_SYMBOLS, Character.UnicodeBlock.NUMBER_FORMS, Character.UnicodeBlock.ARROWS, Character.UnicodeBlock.MATHEMATICAL_OPERATORS, Character.UnicodeBlock.MISCELLANEOUS_TECHNICAL, Character.UnicodeBlock.CONTROL_PICTURES, Character.UnicodeBlock.OPTICAL_CHARACTER_RECOGNITION, Character.UnicodeBlock.ENCLOSED_ALPHANUMERICS, Character.UnicodeBlock.BOX_DRAWING, Character.UnicodeBlock.BLOCK_ELEMENTS, Character.UnicodeBlock.GEOMETRIC_SHAPES, Character.UnicodeBlock.MISCELLANEOUS_SYMBOLS, Character.UnicodeBlock.DINGBATS, Character.UnicodeBlock.MISCELLANEOUS_MATHEMATICAL_SYMBOLS_A, Character.UnicodeBlock.SUPPLEMENTAL_ARROWS_A, Character.UnicodeBlock.BRAILLE_PATTERNS, Character.UnicodeBlock.SUPPLEMENTAL_ARROWS_B, Character.UnicodeBlock.MISCELLANEOUS_MATHEMATICAL_SYMBOLS_B, Character.UnicodeBlock.SUPPLEMENTAL_MATHEMATICAL_OPERATORS, Character.UnicodeBlock.MISCELLANEOUS_SYMBOLS_AND_ARROWS, null, Character.UnicodeBlock.CJK_RADICALS_SUPPLEMENT, Character.UnicodeBlock.KANGXI_RADICALS, null, Character.UnicodeBlock.IDEOGRAPHIC_DESCRIPTION_CHARACTERS, Character.UnicodeBlock.CJK_SYMBOLS_AND_PUNCTUATION, Character.UnicodeBlock.HIRAGANA, Character.UnicodeBlock.KATAKANA, Character.UnicodeBlock.BOPOMOFO, Character.UnicodeBlock.HANGUL_COMPATIBILITY_JAMO, Character.UnicodeBlock.KANBUN, Character.UnicodeBlock.BOPOMOFO_EXTENDED, null, Character.UnicodeBlock.KATAKANA_PHONETIC_EXTENSIONS, Character.UnicodeBlock.ENCLOSED_CJK_LETTERS_AND_MONTHS, Character.UnicodeBlock.CJK_COMPATIBILITY, Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A, Character.UnicodeBlock.YIJING_HEXAGRAM_SYMBOLS, Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS, Character.UnicodeBlock.YI_SYLLABLES, Character.UnicodeBlock.YI_RADICALS, null, Character.UnicodeBlock.HANGUL_SYLLABLES, null, Character.UnicodeBlock.HIGH_SURROGATES, Character.UnicodeBlock.HIGH_PRIVATE_USE_SURROGATES, Character.UnicodeBlock.LOW_SURROGATES, Character.UnicodeBlock.PRIVATE_USE_AREA, Character.UnicodeBlock.CJK_COMPATIBILITY_IDEOGRAPHS, Character.UnicodeBlock.ALPHABETIC_PRESENTATION_FORMS, Character.UnicodeBlock.ARABIC_PRESENTATION_FORMS_A, Character.UnicodeBlock.VARIATION_SELECTORS, null, Character.UnicodeBlock.COMBINING_HALF_MARKS, Character.UnicodeBlock.CJK_COMPATIBILITY_FORMS, Character.UnicodeBlock.SMALL_FORM_VARIANTS, Character.UnicodeBlock.ARABIC_PRESENTATION_FORMS_B, Character.UnicodeBlock.HALFWIDTH_AND_FULLWIDTH_FORMS, Character.UnicodeBlock.SPECIALS, Character.UnicodeBlock.LINEAR_B_SYLLABARY, Character.UnicodeBlock.LINEAR_B_IDEOGRAMS, Character.UnicodeBlock.AEGEAN_NUMBERS, null, Character.UnicodeBlock.OLD_ITALIC, Character.UnicodeBlock.GOTHIC, null, Character.UnicodeBlock.UGARITIC, null, Character.UnicodeBlock.DESERET, Character.UnicodeBlock.SHAVIAN, Character.UnicodeBlock.OSMANYA, null, Character.UnicodeBlock.CYPRIOT_SYLLABARY, null, Character.UnicodeBlock.BYZANTINE_MUSICAL_SYMBOLS, Character.UnicodeBlock.MUSICAL_SYMBOLS, null, Character.UnicodeBlock.TAI_XUAN_JING_SYMBOLS, null, Character.UnicodeBlock.MATHEMATICAL_ALPHANUMERIC_SYMBOLS, null, Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_B, null, Character.UnicodeBlock.CJK_COMPATIBILITY_IDEOGRAPHS_SUPPLEMENT, null, Character.UnicodeBlock.TAGS, null, Character.UnicodeBlock.VARIATION_SELECTORS_SUPPLEMENT, null, Character.UnicodeBlock.SUPPLEMENTARY_PRIVATE_USE_AREA_A, Character.UnicodeBlock.SUPPLEMENTARY_PRIVATE_USE_AREA_B])
]);
})()
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments[0], false);
}, Character, "CharacterCache");

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'construct', function () {
C$.$init$.apply(this);
}, 1);
Clazz.defineStatics$ (C$, ["cache",  Clazz.newArray$(java.lang.Character, [128])]);
{
for (var i = 0; i < Character.CharacterCache.cache.length; i++) Character.CharacterCache.cache[i] = Clazz.$new(Character.construct,[String.fromCharCode (i)]);

}
})()
Clazz.defineStatics$ (C$, ["MIN_RADIX", 2,
"MAX_RADIX", 36,
"MIN_VALUE", '\u0000',
"MAX_VALUE", '\uffff',
"TYPE", Class.getPrimitiveClass$S ("char"),
"UNASSIGNED", 0,
"UPPERCASE_LETTER", 1,
"LOWERCASE_LETTER", 2,
"TITLECASE_LETTER", 3,
"MODIFIER_LETTER", 4,
"OTHER_LETTER", 5,
"NON_SPACING_MARK", 6,
"ENCLOSING_MARK", 7,
"COMBINING_SPACING_MARK", 8,
"DECIMAL_DIGIT_NUMBER", 9,
"LETTER_NUMBER", 10,
"OTHER_NUMBER", 11,
"SPACE_SEPARATOR", 12,
"LINE_SEPARATOR", 13,
"PARAGRAPH_SEPARATOR", 14,
"CONTROL", 15,
"FORMAT", 16,
"PRIVATE_USE", 18,
"SURROGATE", 19,
"DASH_PUNCTUATION", 20,
"START_PUNCTUATION", 21,
"END_PUNCTUATION", 22,
"CONNECTOR_PUNCTUATION", 23,
"OTHER_PUNCTUATION", 24,
"MATH_SYMBOL", 25,
"CURRENCY_SYMBOL", 26,
"MODIFIER_SYMBOL", 27,
"OTHER_SYMBOL", 28,
"INITIAL_QUOTE_PUNCTUATION", 29,
"FINAL_QUOTE_PUNCTUATION", 30,
"ERROR", 0xFFFFFFFF,
"DIRECTIONALITY_UNDEFINED", -1,
"DIRECTIONALITY_LEFT_TO_RIGHT", 0,
"DIRECTIONALITY_RIGHT_TO_LEFT", 1,
"DIRECTIONALITY_RIGHT_TO_LEFT_ARABIC", 2,
"DIRECTIONALITY_EUROPEAN_NUMBER", 3,
"DIRECTIONALITY_EUROPEAN_NUMBER_SEPARATOR", 4,
"DIRECTIONALITY_EUROPEAN_NUMBER_TERMINATOR", 5,
"DIRECTIONALITY_ARABIC_NUMBER", 6,
"DIRECTIONALITY_COMMON_NUMBER_SEPARATOR", 7,
"DIRECTIONALITY_NONSPACING_MARK", 8,
"DIRECTIONALITY_BOUNDARY_NEUTRAL", 9,
"DIRECTIONALITY_PARAGRAPH_SEPARATOR", 10,
"DIRECTIONALITY_SEGMENT_SEPARATOR", 11,
"DIRECTIONALITY_WHITESPACE", 12,
"DIRECTIONALITY_OTHER_NEUTRALS", 13,
"DIRECTIONALITY_LEFT_TO_RIGHT_EMBEDDING", 14,
"DIRECTIONALITY_LEFT_TO_RIGHT_OVERRIDE", 15,
"DIRECTIONALITY_RIGHT_TO_LEFT_EMBEDDING", 16,
"DIRECTIONALITY_RIGHT_TO_LEFT_OVERRIDE", 17,
"DIRECTIONALITY_POP_DIRECTIONAL_FORMAT", 18,
"MIN_HIGH_SURROGATE", '\uD800',
"MAX_HIGH_SURROGATE", '\uDBFF',
"MIN_LOW_SURROGATE", '\uDC00',
"MAX_LOW_SURROGATE", '\uDFFF',
"MIN_SURROGATE", '\ud800',
"MAX_SURROGATE", '\udfff',
"MIN_SUPPLEMENTARY_CODE_POINT", 0x010000,
"MIN_CODE_POINT", 0x000000,
"MAX_CODE_POINT", 0x10ffff,
"SIZE", 16
]);
})()
});

//Created 2017-08-18 22:17:58
