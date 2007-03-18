Clazz.load (["java.lang.Comparable", "$.Number"], "java.lang.Long", null, function () {
java.lang.Long = Long = function () {
Clazz.instantialize (this, arguments);
};
Clazz.decorateAsType (Long, "Long", Number, Comparable);
Long.prototype.valueOf = function () { return 0; };
Long.toString = Long.prototype.toString = function () {
	if (arguments.length != 0) {
		return "" + arguments[0];
	}
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
var longVal = parseInt (s, radix);
if(isNaN(longVal)){
throw  new NumberFormatException ("Not a Number : " + s);
}
return longVal;
}, "String, Number");

Clazz.defineMethod (Long, "parseLong", 
function (s) {
return Long.parseLong (s, 10);
}, "String");

Long.parseLong = Long.prototype.parseLong;

Clazz.defineMethod (Long, "$valueOf", 
function (s) {
return new Long(Long.parseLong (s, 10));
}, "String");

Clazz.defineMethod (Long, "$valueOf", 
function (s) {
return new Long(s);
}, "Number");

Clazz.defineMethod (Long, "$valueOf", 
function (s, r) {
return new Long(Long.parseLong (s, r));
}, "String, Number");

Long.$valueOf = Long.prototype.$valueOf;
Clazz.defineMethod (Long, "equals", 
function (s) {
if(s == null || ! Clazz.instanceOf(s, Long) ){
	return false;
}
return s.valueOf()  == this.valueOf();
}, "Object");
});

