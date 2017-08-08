Clazz.declarePackage ("java.text");
Clazz.load (["java.lang.Exception"], "java.text.ParseException", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.errorOffset = 0;
Clazz.instantialize (this, arguments);
}, java.text, "ParseException", Exception);
Clazz.makeConstructor (c$, 
function (s, errorOffset) {
Clazz.superConstructor (this, java.text.ParseException, [s]);
this.errorOffset = errorOffset;
}, "~S,~N");
Clazz.defineMethod (c$, "getErrorOffset", 
function () {
return this.errorOffset;
});
});
