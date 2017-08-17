Clazz.load (["java.lang.CharacterData"], "java.lang.CharacterDataLatin1", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang, "CharacterDataLatin1", CharacterData);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'getProperties', function (ch) {
var offset = String.fromCharCode (ch);
var props = CharacterDataLatin1.A[offset.charCodeAt (0)];
return props;
});

Clazz.newMethod$(C$, 'getType', function (ch) {
var props = this.getProperties (ch);
return (props & 0x1F);
});

Clazz.newMethod$(C$, 'isJavaIdentifierStart', function (ch) {
var props = this.getProperties (ch);
return ((props & 0x00007000) >= 0x00005000);
});

Clazz.newMethod$(C$, 'isJavaIdentifierPart', function (ch) {
var props = this.getProperties (ch);
return ((props & 0x00003000) != 0);
});

Clazz.newMethod$(C$, 'isUnicodeIdentifierStart', function (ch) {
var props = this.getProperties (ch);
return ((props & 0x00007000) == 0x00007000);
});

Clazz.newMethod$(C$, 'isUnicodeIdentifierPart', function (ch) {
var props = this.getProperties (ch);
return ((props & 0x00001000) != 0);
});

Clazz.newMethod$(C$, 'isIdentifierIgnorable', function (ch) {
var props = this.getProperties (ch);
return ((props & 0x00007000) == 0x00001000);
});

Clazz.newMethod$(C$, 'toLowerCase', function (ch) {
var mapChar = ch;
var val = this.getProperties (ch);
if (((val & 0x00020000) != 0) && ((val & 0x07FC0000) != 0x07FC0000)) {
var offset = val << 5 >> (23);
mapChar = ch + offset;
}return mapChar;
});

Clazz.newMethod$(C$, 'toUpperCase', function (ch) {
var mapChar = ch;
var val = this.getProperties (ch);
if ((val & 0x00010000) != 0) {
if ((val & 0x07FC0000) != 0x07FC0000) {
var offset = val << 5 >> (23);
mapChar = ch - offset;
} else if (ch == 0x00B5) {
mapChar = 0x039C;
}}return mapChar;
});

Clazz.newMethod$(C$, 'toTitleCase', function (ch) {
return this.toUpperCase (ch);
});

Clazz.newMethod$(C$, 'digit', function (ch, radix) {
var value = -1;
if (radix >= 2 && radix <= 36) {
var val = this.getProperties (ch);
var kind = val & 0x1F;
if (kind == 9) {
value = ch + ((val & 0x3E0) >> 5) & 0x1F;
} else if ((val & 0xC00) == 0x00000C00) {
value = (ch + ((val & 0x3E0) >> 5) & 0x1F) + 10;
}}return (value < radix) ? value : -1;
});

Clazz.newMethod$(C$, 'getNumericValue', function (ch) {
var val = this.getProperties (ch);
var retval = -1;
switch (val & 0xC00) {
default:
case (0x00000000):
retval = -1;
break;
case (0x00000400):
retval = ch + ((val & 0x3E0) >> 5) & 0x1F;
break;
case (0x00000800):
retval = -2;
break;
case (0x00000C00):
retval = (ch + ((val & 0x3E0) >> 5) & 0x1F) + 10;
break;
}
return retval;
});

Clazz.newMethod$(C$, 'isWhitespace', function (ch) {
var props = this.getProperties (ch);
return ((props & 0x00007000) == 0x00004000);
});

Clazz.newMethod$(C$, 'getDirectionality', function (ch) {
var val = this.getProperties (ch);
var directionality = ((val & 0x78000000) >> 27);
if (directionality == 0xF) {
directionality = -1;
}return directionality;
});

Clazz.newMethod$(C$, 'isMirrored', function (ch) {
var props = this.getProperties (ch);
return ((props & 0x80000000) != 0);
});

Clazz.newMethod$(C$, 'toUpperCaseEx', function (ch) {
var mapChar = ch;
var val = this.getProperties (ch);
if ((val & 0x00010000) != 0) {
if ((val & 0x07FC0000) != 0x07FC0000) {
var offset = val << 5 >> (23);
mapChar = ch - offset;
} else {
switch (ch) {
case 0x00B5:
mapChar = 0x039C;
break;
default:
mapChar = -1;
break;
}
}}return mapChar;
});

Clazz.newMethod$(C$, 'toUpperCaseCharArray', function (ch) {
var upperMap =  Clazz.newArray$('CA', -1, [-1, [String.fromCharCode (ch)]]);
if (ch == 0x00DF) {
upperMap = CharacterDataLatin1.sharpsMap;
}return upperMap;
});

Clazz.newMethod$(C$, 'construct', function () {
Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
Clazz.defineStatics (C$,
"sharpsMap",  Clazz.newArray$('CA', -1, [-1, ['S', 'S']]),
"instance", Clazz.$new(CharacterDataLatin1.construct,[]),
"A",  Clazz.newArray$('IA', 1, [256]),
"A_DATA", "\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u5800\u400f\u5000\u400f\u5800\u400f\u6000\u400f\u5000\u400f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u5000\u400f\u5000\u400f\u5000\u400f\u5800\u400f\u6000\u400c\u6800\u0018\u6800\u0018\u2800\u0018\u2800\u601a\u2800\u0018\u6800\u0018\u6800\u0018\ue800\u0015\ue800\u0016\u6800\u0018\u2800\u0019\u3800\u0018\u2800\u0014\u3800\u0018\u2000\u0018\u1800\u3609\u1800\u3609\u1800\u3609\u1800\u3609\u1800\u3609\u1800\u3609\u1800\u3609\u1800\u3609\u1800\u3609\u1800\u3609\u3800\u0018\u6800\u0018\ue800\u0019\u6800\u0019\ue800\u0019\u6800\u0018\u6800\u0018\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\ue800\u0015\u6800\u0018\ue800\u0016\u6800\u001b\u6800\u5017\u6800\u001b\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\ue800\u0015\u6800\u0019\ue800\u0016\u6800\u0019\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u5000\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u3800\f\u6800\u0018\u2800\u601a\u2800\u601a\u2800\u601a\u2800\u601a\u6800\u001c\u6800\u001c\u6800\u001b\u6800\u001c\u0000\u7002\ue800\u001d\u6800\u0019\u6800\u1010\u6800\u001c\u6800\u001b\u2800\u001c\u2800\u0019\u1800\u060b\u1800\u060b\u6800\u001b\u07fd\u7002\u6800\u001c\u6800\u0018\u6800\u001b\u1800\u050b\u0000\u7002\ue800\u001e\u6800\u080b\u6800\u080b\u6800\u080b\u6800\u0018\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u6800\u0019\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u07fd\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u6800\u0019\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u061d\u7002");
{
{
var data = "\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u5800\u400f\u5000\u400f\u5800\u400f\u6000\u400f\u5000\u400f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u5000\u400f\u5000\u400f\u5000\u400f\u5800\u400f\u6000\u400c\u6800\u0018\u6800\u0018\u2800\u0018\u2800\u601a\u2800\u0018\u6800\u0018\u6800\u0018\ue800\u0015\ue800\u0016\u6800\u0018\u2800\u0019\u3800\u0018\u2800\u0014\u3800\u0018\u2000\u0018\u1800\u3609\u1800\u3609\u1800\u3609\u1800\u3609\u1800\u3609\u1800\u3609\u1800\u3609\u1800\u3609\u1800\u3609\u1800\u3609\u3800\u0018\u6800\u0018\ue800\u0019\u6800\u0019\ue800\u0019\u6800\u0018\u6800\u0018\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\u0082\u7fe1\ue800\u0015\u6800\u0018\ue800\u0016\u6800\u001b\u6800\u5017\u6800\u001b\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\u0081\u7fe2\ue800\u0015\u6800\u0019\ue800\u0016\u6800\u0019\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u5000\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u4800\u100f\u3800\f\u6800\u0018\u2800\u601a\u2800\u601a\u2800\u601a\u2800\u601a\u6800\u001c\u6800\u001c\u6800\u001b\u6800\u001c\u0000\u7002\ue800\u001d\u6800\u0019\u6800\u1010\u6800\u001c\u6800\u001b\u2800\u001c\u2800\u0019\u1800\u060b\u1800\u060b\u6800\u001b\u07fd\u7002\u6800\u001c\u6800\u0018\u6800\u001b\u1800\u050b\u0000\u7002\ue800\u001e\u6800\u080b\u6800\u080b\u6800\u080b\u6800\u0018\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u6800\u0019\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u0082\u7001\u07fd\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u6800\u0019\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u0081\u7002\u061d\u7002".toCharArray ();
var i = 0;
var j = 0;
while (i < (512)) {
var entry = (data[i++]).charCodeAt (0) << 16;
CharacterDataLatin1.A[j++] = entry | (data[i++]).charCodeAt (0);
}
}}
})()
});

//Created 2017-08-17 10:33:13
