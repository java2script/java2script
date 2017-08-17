;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.lang, "CharacterData");

Clazz.newMethod$(C$, '$init$', function () {
}, 1);

Clazz.newMethod$(C$, 'toUpperCaseEx', function (ch) {
return this.toUpperCase (ch);
});

Clazz.newMethod$(C$, 'toUpperCaseCharArray', function (ch) {
return null;
});

Clazz.newMethod$(C$, 'of', function (ch) {
if (ch >>> 8 == 0) {
return CharacterDataLatin1.instance;
} else {
switch (ch >>> 16) {
case (0):
return CharacterData00.instance;
case (1):
return CharacterData01.instance;
case (2):
return CharacterData02.instance;
case (14):
return CharacterData0E.instance;
case (15):
case (16):
return CharacterDataPrivateUse.instance;
default:
return CharacterDataUndefined.instance;
}
}}, 1);

Clazz.newMethod$(C$, 'of1', function (ch) {
if (ch >>> 8 == 0) {
return CharacterDataLatin1.instance;
} else {
switch (ch >>> 16) {
case (0):
return CharacterData00.instance;
case (1):
return CharacterData01.instance;
case (2):
return CharacterData02.instance;
case (14):
return CharacterData0E.instance;
case (15):
case (16):
return CharacterDataPrivateUse.instance;
default:
return CharacterDataUndefined.instance;
}
}});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
}, 1);
})()

//Created 2017-08-17 10:33:13
