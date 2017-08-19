Clazz.declarePackage ("sun.font");
Clazz.load (["java.lang.Enum"], "sun.font.EAttribute", ["java.awt.font.TextAttribute"], function () {
c$ = Clazz.decorateAsClass (function () {
this.mask = 0;
this.att = null;
Clazz.instantialize (this, arguments);
}, sun.font, "EAttribute", Enum);
Clazz.makeConstructor (c$, 
function (ta) {
this.mask = 1 << this.ordinal ();
this.att = ta;
}, "java.awt.font.TextAttribute");
c$.forAttribute = Clazz.defineMethod (c$, "forAttribute", 
function (ta) {
for (var ea, $ea = 0, $$ea = sun.font.EAttribute.atts; $ea < $$ea.length && ((ea = $$ea[$ea]) || true); $ea++) {
if (ea.att === ta) {
return ea;
}}
return null;
}, "java.text.AttributedCharacterIterator.Attribute");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.name ().substring (1).toLowerCase ();
});
c$.atts = sun.font.EAttribute.getEnumConstants ();
Clazz.defineEnumConstant (c$, "EFAMILY", 0, [java.awt.font.TextAttribute.FAMILY]);
Clazz.defineEnumConstant (c$, "EWEIGHT", 1, [java.awt.font.TextAttribute.WEIGHT]);
Clazz.defineEnumConstant (c$, "EWIDTH", 2, [java.awt.font.TextAttribute.WIDTH]);
Clazz.defineEnumConstant (c$, "EPOSTURE", 3, [java.awt.font.TextAttribute.POSTURE]);
Clazz.defineEnumConstant (c$, "ESIZE", 4, [java.awt.font.TextAttribute.SIZE]);
Clazz.defineEnumConstant (c$, "ETRANSFORM", 5, [java.awt.font.TextAttribute.TRANSFORM]);
Clazz.defineEnumConstant (c$, "ESUPERSCRIPT", 6, [java.awt.font.TextAttribute.SUPERSCRIPT]);
Clazz.defineEnumConstant (c$, "EFONT", 7, [java.awt.font.TextAttribute.FONT]);
Clazz.defineEnumConstant (c$, "ECHAR_REPLACEMENT", 8, [java.awt.font.TextAttribute.CHAR_REPLACEMENT]);
Clazz.defineEnumConstant (c$, "EFOREGROUND", 9, [java.awt.font.TextAttribute.FOREGROUND]);
Clazz.defineEnumConstant (c$, "EBACKGROUND", 10, [java.awt.font.TextAttribute.BACKGROUND]);
Clazz.defineEnumConstant (c$, "EUNDERLINE", 11, [java.awt.font.TextAttribute.UNDERLINE]);
Clazz.defineEnumConstant (c$, "ESTRIKETHROUGH", 12, [java.awt.font.TextAttribute.STRIKETHROUGH]);
Clazz.defineEnumConstant (c$, "ERUN_DIRECTION", 13, [java.awt.font.TextAttribute.RUN_DIRECTION]);
Clazz.defineEnumConstant (c$, "EBIDI_EMBEDDING", 14, [java.awt.font.TextAttribute.BIDI_EMBEDDING]);
Clazz.defineEnumConstant (c$, "EJUSTIFICATION", 15, [java.awt.font.TextAttribute.JUSTIFICATION]);
Clazz.defineEnumConstant (c$, "EINPUT_METHOD_HIGHLIGHT", 16, [java.awt.font.TextAttribute.INPUT_METHOD_HIGHLIGHT]);
Clazz.defineEnumConstant (c$, "EINPUT_METHOD_UNDERLINE", 17, [java.awt.font.TextAttribute.INPUT_METHOD_UNDERLINE]);
Clazz.defineEnumConstant (c$, "ESWAP_COLORS", 18, [java.awt.font.TextAttribute.SWAP_COLORS]);
Clazz.defineEnumConstant (c$, "ENUMERIC_SHAPING", 19, [java.awt.font.TextAttribute.NUMERIC_SHAPING]);
Clazz.defineEnumConstant (c$, "EKERNING", 20, [java.awt.font.TextAttribute.KERNING]);
Clazz.defineEnumConstant (c$, "ELIGATURES", 21, [java.awt.font.TextAttribute.LIGATURES]);
Clazz.defineEnumConstant (c$, "ETRACKING", 22, [java.awt.font.TextAttribute.TRACKING]);
Clazz.defineEnumConstant (c$, "EBASELINE_TRANSFORM", 23, [null]);
});
