Clazz.load (["java.lang.CharacterData"], "java.lang.CharacterDataUndefined", null, function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang, "CharacterDataUndefined", CharacterData);

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'getProperties', function (ch) {
return 0;
});

Clazz.newMethod$(C$, 'getType', function (ch) {
return 0;
});

Clazz.newMethod$(C$, 'isJavaIdentifierStart', function (ch) {
return false;
});

Clazz.newMethod$(C$, 'isJavaIdentifierPart', function (ch) {
return false;
});

Clazz.newMethod$(C$, 'isUnicodeIdentifierStart', function (ch) {
return false;
});

Clazz.newMethod$(C$, 'isUnicodeIdentifierPart', function (ch) {
return false;
});

Clazz.newMethod$(C$, 'isIdentifierIgnorable', function (ch) {
return false;
});

Clazz.newMethod$(C$, 'toLowerCase', function (ch) {
return ch;
});

Clazz.newMethod$(C$, 'toUpperCase', function (ch) {
return ch;
});

Clazz.newMethod$(C$, 'toTitleCase', function (ch) {
return ch;
});

Clazz.newMethod$(C$, 'digit', function (ch, radix) {
return -1;
});

Clazz.newMethod$(C$, 'getNumericValue', function (ch) {
return -1;
});

Clazz.newMethod$(C$, 'isWhitespace', function (ch) {
return false;
});

Clazz.newMethod$(C$, 'getDirectionality', function (ch) {
return -1;
});

Clazz.newMethod$(C$, 'isMirrored', function (ch) {
return false;
});

Clazz.newMethod$(C$, 'construct', function () {
Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
Clazz.defineStatics (C$,
"instance", Clazz.$new(CharacterDataUndefined.construct,[]));
})()
});

//Created 2017-08-17 10:33:13
