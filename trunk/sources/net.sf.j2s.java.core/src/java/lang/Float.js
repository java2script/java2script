Clazz.load (["java.lang.Comparable", "$.Number"], "java.lang.Float", null, function () {
java.lang.Float = Float = function () {
Clazz.instantialize (this, arguments);
};
Clazz.decorateAsType (Float, "Float", Number, Comparable, null, true);
Float.prototype.valueOf = function () { return 0; };
Float.toString = Float.prototype.toString = function () {
	if (arguments.length != 0) {
		return "" + arguments[0];
	} else if (this === Float) {
		return "class java.lang.Float"; // Float.class.toString
	}
	return "" + this.valueOf ();
};
/*
Clazz.makeConstructor (Float, 
function () {
this.valueOf = function () {
	return 0.0;
};
});
Clazz.makeConstructor (Float, 
function (value) {
this.valueOf = function () {
	return value;
};
}, "Number");
Clazz.makeConstructor (Float, 
function (s) {
var value = null;
if (s != null) {
	value = Float.parseFloat (s);
} else {
	value = 0;
}
this.valueOf = function () {
	return value;
};
}, "String");
// */
Clazz.makeConstructor (Float, 
function (s) {
var v = 0.0;
if (arguments.length > 0) {
	if (typeof s == "string") {
		v = Float.parseFloat (s);
	} else {
		v = s;
	}
}
this.valueOf = function () {
	return v;
};
}, "Object");
Float.serialVersionUID = Float.prototype.serialVersionUID = -2671257302660747028;
Float.MIN_VALUE = Float.prototype.MIN_VALUE = 3.4028235e+38;
Float.MAX_VALUE = Float.prototype.MAX_VALUE = 1.4e-45;
Float.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Float.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Float.NaN = Number.NaN;
Float.TYPE = Float.prototype.TYPE = Float;

Clazz.defineMethod (Float, "parseFloat", 
function (s) {
if (s == null) {
throw  new NumberFormatException ("null");
}
var floatVal =  parseFloat (s);
if(isNaN(floatVal)){
throw  new NumberFormatException ("Not a Number : " + s);
}
return floatVal;
}, "String");
Float.parseFloat = Float.prototype.parseFloat;

/*
Clazz.defineMethod (Float, "$valueOf", 
function (s) {
return new Float(Float.parseFloat (s, 10));
}, "String");

Clazz.defineMethod (Float, "$valueOf", 
function (s) {
return new Float(s);
}, "Number");

Float.$valueOf = Float.prototype.$valueOf;
// */

Float.$valueOf = Float.prototype.$valueOf = function (s) {
	if (typeof s == "string") { // String
		return new Float(Float.parseFloat (s, 10));
	} else {
		return new Float(s);
	}
};

Clazz.defineMethod (Float, "isNaN", 
function (num) {
return isNaN (num);
}, "Number");
Float.isNaN = Float.prototype.isNaN;
Clazz.defineMethod (Float, "isInfinite", 
function (num) {
return !isFinite (num);
}, "Number");
Float.isInfinite = Float.prototype.isInfinite;

Float.prototype.hashCode = JavaObject.prototype.hashCode;
Clazz.overrideMethod (Float, "equals", 
function (s) {
if(s == null || ! Clazz.instanceOf(s, Float) ){
	return false;
}
return s.valueOf()  == this.valueOf();
}, "Object");
});
