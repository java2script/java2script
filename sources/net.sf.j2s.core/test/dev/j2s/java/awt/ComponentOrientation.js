Clazz.declarePackage ("java.awt");
Clazz.load (null, "java.awt.ComponentOrientation", ["java.util.Locale"], function () {
c$ = Clazz.decorateAsClass (function () {
this.orientation = 0;
Clazz.instantialize (this, arguments);
}, java.awt, "ComponentOrientation");
Clazz.defineMethod (c$, "isHorizontal", 
function () {
return (this.orientation & 2) != 0;
});
Clazz.defineMethod (c$, "isLeftToRight", 
function () {
return (this.orientation & 4) != 0;
});
c$.getOrientation = Clazz.defineMethod (c$, "getOrientation", 
function (locale) {
var lang = locale.getLanguage ();
if ("iw".equals (lang) || "ar".equals (lang) || "fa".equals (lang) || "ur".equals (lang)) {
return java.awt.ComponentOrientation.RIGHT_TO_LEFT;
} else {
return java.awt.ComponentOrientation.LEFT_TO_RIGHT;
}}, "java.util.Locale");
c$.getOrientation = Clazz.defineMethod (c$, "getOrientation", 
function (bdl) {
var result = null;
try {
result = bdl.getObject ("Orientation");
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
if (result == null) {
result = java.awt.ComponentOrientation.getOrientation (bdl.getLocale ());
}if (result == null) {
result = java.awt.ComponentOrientation.getOrientation (java.util.Locale.getDefault ());
}return result;
}, "java.util.ResourceBundle");
Clazz.makeConstructor (c$, 
 function (value) {
this.orientation = value;
}, "~N");
Clazz.defineStatics (c$,
"UNK_BIT", 1,
"HORIZ_BIT", 2,
"LTR_BIT", 4);
c$.LEFT_TO_RIGHT = c$.prototype.LEFT_TO_RIGHT =  new java.awt.ComponentOrientation (6);
c$.RIGHT_TO_LEFT = c$.prototype.RIGHT_TO_LEFT =  new java.awt.ComponentOrientation (2);
c$.UNKNOWN = c$.prototype.UNKNOWN =  new java.awt.ComponentOrientation (7);
});
