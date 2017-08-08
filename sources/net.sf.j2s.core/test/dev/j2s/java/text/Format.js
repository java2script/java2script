Clazz.declarePackage ("java.text");
Clazz.load (["java.text.AttributedCharacterIterator"], "java.text.Format", ["java.lang.StringBuffer", "java.text.AttributedString", "$.FieldPosition", "$.ParseException", "$.ParsePosition"], function () {
c$ = Clazz.declareType (java.text, "Format", null, [java.io.Serializable, Cloneable]);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "format", 
function (obj) {
return this.format (obj,  new StringBuffer (),  new java.text.FieldPosition (0)).toString ();
}, "~O");
Clazz.defineMethod (c$, "formatToCharacterIterator", 
function (obj) {
return this.createAttributedCharacterIterator (this.format (obj));
}, "~O");
Clazz.defineMethod (c$, "parseObject", 
function (source) {
var pos =  new java.text.ParsePosition (0);
var result = this.parseObject (source, pos);
if (pos.index == 0) {
throw  new java.text.ParseException ("Format.parseObject(String) failed", pos.errorIndex);
}return result;
}, "~S");
Clazz.defineMethod (c$, "clone", 
function () {
try {
return Clazz.superCall (this, java.text.Format, "clone", []);
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
return null;
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "createAttributedCharacterIterator", 
function (s) {
var as =  new java.text.AttributedString (s);
return as.getIterator ();
}, "~S");
Clazz.defineMethod (c$, "createAttributedCharacterIterator", 
function (iterators) {
var as =  new java.text.AttributedString (iterators);
return as.getIterator ();
}, "~A");
Clazz.defineMethod (c$, "createAttributedCharacterIterator", 
function (string, key, value) {
var as =  new java.text.AttributedString (string);
as.addAttribute (key, value);
return as.getIterator ();
}, "~S,java.text.AttributedCharacterIterator.Attribute,~O");
Clazz.defineMethod (c$, "createAttributedCharacterIterator", 
function (iterator, key, value) {
var as =  new java.text.AttributedString (iterator);
as.addAttribute (key, value);
return as.getIterator ();
}, "java.text.AttributedCharacterIterator,java.text.AttributedCharacterIterator.Attribute,~O");
Clazz.pu$h(c$);
c$ = Clazz.declareType (java.text.Format, "Field", java.text.AttributedCharacterIterator.Attribute);
c$ = Clazz.p0p ();
Clazz.declareInterface (java.text.Format, "FieldDelegate");
});
