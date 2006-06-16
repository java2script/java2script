Clazz.declarePackage ("java.lang");
java.lang.Number = Number;
//Clazz.decorateAsType (Number, "Number", null, java.io.Serializable);
Number.__CLASS_NAME__ = "Number";
Clazz.implementOf (Number, java.io.Serializable);
Number.equals = Clazz.innerFunctions.equals;
Number.getName = Clazz.innerFunctions.getName;

Number.serialVersionUID = Number.prototype.serialVersionUID = -8742448824652078965;

Clazz.defineMethod (Number, "shortValue", 
function () {
return Math.round (this) & 0xffff;
});

Clazz.defineMethod (Number, "byteValue", 
function () {
return Math.round (this) & 0xff;
});

Clazz.defineMethod (Number, "intValue", 
function () {
return Math.round (this) & 0xffffffff;
});

Clazz.defineMethod (Number, "longValue", 
function () {
return Math.round (this);
});

Clazz.defineMethod (Number, "floatValue", 
function () {
return this;
});

Clazz.defineMethod (Number, "doubleValue", 
function () {
return this;
});

Clazz.defineMethod (Number, "hashCode", 
function () {
return this.valueOf ();
});
