;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang, "Character", null, [java.io.Serializable, Comparable]);

Clazz.newMethod$(C$, '$init$', function () {
this.value = '\0';
}, 1);

Clazz.newMethod$ (C$, 'construct', function (value) {
C$.$init$.apply(this);
this.value = value;
}, 1);

Clazz.newMethod$ (C$, 'charValue', function () {
return this.value;
});

Clazz.newMethod$ (C$, 'hashCode', function () {
return (this.value).charCodeAt (0);
});

Clazz.newMethod$ (C$, 'equals', function (obj) {
if (Clazz.instanceOf(obj, Character)) {
return this.value == (obj).charValue ();
}return false;
});

Clazz.newMethod$ (C$, 'compareTo', function (c) {
return this.value.charCodeAt (0) - c.value.charCodeAt (0);
});

Clazz.newMethod$ (C$, 'toLowerCase', function (c) {
return ("" + c).toLowerCase ().charAt$I (0);
}, 1);

Clazz.newMethod$ (C$, 'toUpperCase', function (c) {
return ("" + c).toUpperCase ().charAt$I (0);
}, 1);

Clazz.newMethod$ (C$, 'isDigit', function (c) {
if ('0' <= c && c <= '9') return true;
if (c.charCodeAt (0) < 1632) return false;
return false;
}, 1);

Clazz.newMethod$ (C$, 'forDigit', function (digit, radix) {
if ((digit >= radix) || (digit < 0)) {
return '\0';
}if ((radix < 2) || (radix > 36)) {
return '\0';
}if (digit < 10) {
return String.fromCharCode (48 + digit);
}return String.fromCharCode (87 + digit);
}, 1);

Clazz.newMethod$ (C$, 'isUpperCase', function (c) {
if ('A' <= c && c <= 'Z') {
return true;
}return false;
}, 1);

Clazz.newMethod$ (C$, 'isLowerCase', function (c) {
if ('a' <= c && c <= 'z') {
return true;
}return false;
}, 1);

Clazz.newMethod$ (C$, 'isWhitespace', function (c) {
if ((c.charCodeAt (0) >= 0x1c && c.charCodeAt (0) <= 0x20) || (c.charCodeAt (0) >= 0x9 && c.charCodeAt (0) <= 0xd)) return true;
if (c.charCodeAt (0) == 0x1680) return true;
if (c.charCodeAt (0) < 0x2000 || c.charCodeAt (0) == 0x2007) return false;
return c.charCodeAt (0) <= 0x200b || c.charCodeAt (0) == 0x2028 || c.charCodeAt (0) == 0x2029 || c.charCodeAt (0) == 0x3000;
}, 1);

Clazz.newMethod$ (C$, 'isLetter', function (c) {
if (('A' <= c && c <= 'Z') || ('a' <= c && c <= 'z')) return true;
if (c.charCodeAt (0) < 128) return false;
return false;
}, 1);

Clazz.newMethod$ (C$, 'isLetterOrDigit', function (c) {
return Character.isLetter (c) || Character.isDigit (c);
}, 1);

Clazz.newMethod$ (C$, 'isSpaceChar', function (c) {
if (c.charCodeAt (0) == 0x20 || c.charCodeAt (0) == 0xa0 || c.charCodeAt (0) == 0x1680) return true;
if (c.charCodeAt (0) < 0x2000) return false;
return c.charCodeAt (0) <= 0x200b || c.charCodeAt (0) == 0x2028 || c.charCodeAt (0) == 0x2029 || c.charCodeAt (0) == 0x202f || c.charCodeAt (0) == 0x3000;
}, 1);

Clazz.newMethod$ (C$, 'digit', function (c, radix) {
if (radix >= 2 && radix <= 36) {
if (c.charCodeAt (0) < 128) {
var result = -1;
if ('0' <= c && c <= '9') {
result = c.charCodeAt (0) - 48;
} else if ('a' <= c && c <= 'z') {
result = c.charCodeAt (0) - (87);
} else if ('A' <= c && c <= 'Z') {
result = c.charCodeAt (0) - (55);
}return result < radix ? result : -1;
}}return -1;
}, 1);

Clazz.newMethod$ (C$, 'toString', function () {
var buf =  Clazz.newArray$('CA', Clazz.newA$, [-1, [this.value]]);
return String.valueOf$CA (buf);
});

Clazz.newMethod$ (C$, 'toString', function (c) {
{
if (this === Character) {
return "class java.lang.Character"; // Character.class.toString
}
}return String.valueOf$C (c);
}, 1);

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
Clazz.defineStatics (C$,
"MIN_VALUE", '\u0000',
"MAX_VALUE", '\uffff',
"MIN_RADIX", 2,
"MAX_RADIX", 36,
"TYPE", null);

java.lang.Character.TYPE=java.lang.Character.prototype.TYPE=java.lang.Character;
})()

//Created 2017-08-12 07:32:15
