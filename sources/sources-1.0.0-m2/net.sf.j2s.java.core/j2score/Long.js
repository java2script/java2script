Clazz.declarePackage ("java.lang");
java.lang.Long = Long = function () {
Clazz.instantialize (this, arguments);
};
Clazz.decorateAsType (Long, "Long", Number, Comparable);
Long.prototype.valueOf = function () { return 0; };
Integer.prototype.toString = function () {
	return "" + this.valueOf ();
};
Clazz.makeConstructor (Long, 
function () {
this.valueOf = function () {
	return 0;
};
});
Clazz.makeConstructor (Long, 
function (value) {
var v = Math.round (value);
this.valueOf = function () {
	return v;
};
}, "Number");
Clazz.makeConstructor (Long, 
function (s) {
var value = Long.parseLong (s, 10);
this.valueOf = function () {
	return value;
};
}, "String");
Long.serialVersionUID = Long.prototype.serialVersionUID = 4290774380558885855;
Long.MIN_VALUE = Long.prototype.MIN_VALUE = -0x8000000000000000;
Long.MAX_VALUE = Long.prototype.MAX_VALUE = 0x7fffffffffffffff;

Clazz.defineMethod (Long, "parseLong", 
function (s, radix) {
if (s == null) {
throw  new NumberFormatException ("null");
}if (radix < 2) {
throw  new NumberFormatException ("radix " + radix + " less than Character.MIN_RADIX");
}if (radix > 36) {
throw  new NumberFormatException ("radix " + radix + " greater than Character.MAX_RADIX");
}
return parseInt (s, radix);
}, "String, Number");
Long.parseLong = Long.prototype.parseLong;
Clazz.defineMethod (Long, "parseLong", 
function (s) {
return Long.parseLong (s, 10);
}, "String");
Long.parseLong = Long.prototype.parseLong;
