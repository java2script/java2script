Clazz.declarePackage ("java.text");
Clazz.load (["java.text.CharacterIterator", "java.io.InvalidObjectException", "java.util.HashMap"], "java.text.AttributedCharacterIterator", null, function () {
Clazz.declareInterface (java.text, "AttributedCharacterIterator", java.text.CharacterIterator);
Clazz.pu$h(c$);
c$ = Clazz.decorateAsClass (function () {
this.name = null;
Clazz.instantialize (this, arguments);
}, java.text.AttributedCharacterIterator, "Attribute", null, java.io.Serializable);
Clazz.makeConstructor (c$, 
function (a) {
this.name = a;
if (this.getClass () === java.text.AttributedCharacterIterator.Attribute) {
java.text.AttributedCharacterIterator.Attribute.instanceMap.put (a, this);
}}, "~S");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getClass ().getName () + "(" + this.name + ")";
});
Clazz.defineMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.defineMethod (c$, "readResolve", 
function () {
if (this.getClass () !== java.text.AttributedCharacterIterator.Attribute) {
throw  new java.io.InvalidObjectException ("subclass didn't correctly implement readResolve");
}var a = java.text.AttributedCharacterIterator.Attribute.instanceMap.get (this.getName ());
if (a != null) {
return a;
} else {
throw  new java.io.InvalidObjectException ("unknown attribute name");
}});
c$.instanceMap = c$.prototype.instanceMap =  new java.util.HashMap (7);
c$.LANGUAGE = c$.prototype.LANGUAGE =  new java.text.AttributedCharacterIterator.Attribute ("language");
c$.READING = c$.prototype.READING =  new java.text.AttributedCharacterIterator.Attribute ("reading");
c$.INPUT_METHOD_SEGMENT = c$.prototype.INPUT_METHOD_SEGMENT =  new java.text.AttributedCharacterIterator.Attribute ("input_method_segment");
c$ = Clazz.p0p ();
});
