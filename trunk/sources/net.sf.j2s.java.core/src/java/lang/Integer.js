Clazz.load (["java.lang.Comparable", "$.Number"], "java.lang.Integer", null, function () {
java.lang.Integer = Integer = function () {
Clazz.instantialize (this, arguments);
};
Clazz.decorateAsType (Integer, "Integer", Number, Comparable, null, true);
Integer.prototype.valueOf = function () { return 0; };
Integer.toString = Integer.prototype.toString = function () {
	if (arguments.length != 0) {
		return "" + arguments[0];
	} else if (this === Integer) {
		return "class java.lang.Integer"; // Integer.class.toString
	}
	return "" + this.valueOf ();
};
/*
Clazz.makeConstructor (Integer, 
function () {
this.valueOf = function () {
	return 0;
};
});
Clazz.makeConstructor (Integer, 
function (value) {
var v = Math.round (value) & 0xffffffff;
this.valueOf = function () {
	return v;
};
}, "Number");
Clazz.makeConstructor (Integer, 
function (s) {
var value = Integer.parseInt (s, 10);
this.valueOf = function () {
	return value;
};
}, "String");
// */
Clazz.makeConstructor (Integer, 
function (s) {
var v = 0;
if (arguments.length > 0) {
	if (typeof s == "string") {
		v = Integer.parseInt (s, 10);
	} else {
		v = s;
	}
}
this.valueOf = function () {
	return v;
};
}, "Object");
Integer.serialVersionUID = Integer.prototype.serialVersionUID = 1360826667806852920;
Integer.MIN_VALUE = Integer.prototype.MIN_VALUE = -0x80000000;
Integer.MAX_VALUE = Integer.prototype.MAX_VALUE = 0x7fffffff;
Integer.TYPE = Integer.prototype.TYPE = Integer;

Clazz.defineMethod (Integer, "parseInt", 
function (s, radix) {
if (arguments.length < 2 || radix == null) {
radix = 10;
}
if (s == null) {
throw new NumberFormatException ("null");
}if (radix < 2) {
throw new NumberFormatException ("radix " + radix + " less than Character.MIN_RADIX");
}if (radix > 36) {
throw new NumberFormatException ("radix " + radix + " greater than Character.MAX_RADIX");
}
var integer = parseInt (s, radix);
if(isNaN(integer)){
throw new NumberFormatException ("Not a Number : " + s);
}
return integer;
}, "String, Number");
/*
Integer.parseInt = Integer.prototype.parseInt;
Clazz.defineMethod (Integer, "parseInt", 
function (s) {
return Integer.parseInt (s, 10);
}, "String");
// */
Integer.parseInt = Integer.prototype.parseInt;

/*
Clazz.defineMethod (Integer, "$valueOf", 
function (s, r) {
return new Integer(Integer.parseInt (s, 10));
}, "String");

Clazz.defineMethod (Integer, "$valueOf", 
function (s) {
return new Integer(s);
}, "Number");

Clazz.defineMethod (Integer, "$valueOf", 
function (s, r) {
return new Integer(Integer.parseInt (s, r));
}, "String, Number");

Integer.$valueOf = Integer.prototype.$valueOf;
// */

Integer.$valueOf = Integer.prototype.$valueOf = function (s, r) {
	if (arguments.length == 2) { // String, Number
		return new Integer(Integer.parseInt (s, r));
	} else if (typeof s == "string") { // String
		return new Integer(Integer.parseInt (s, 10));
	} else { // Number
		return new Integer(s);
	}
};

Clazz.overrideMethod (Integer, "equals", 
function (s) {
if(s == null || ! Clazz.instanceOf(s, Integer) ){
	return false;
}
return s.valueOf()  == this.valueOf();
}, "Object");
Integer.toHexString = Integer.prototype.toHexString = function (d) {
	if(d.valueOf)d=d.valueOf();
	return d.to$tring(16);
};
Integer.toOctalString = Integer.prototype.toOctalString = function (d) {
	if(d.valueOf)d=d.valueOf();
	return d.to$tring(8);
};
Integer.toBinaryString = Integer.prototype.toBinaryString = function (d) {
	if(d.valueOf)d=d.valueOf();
	return d.to$tring(2);
};
Integer.decode = Clazz.defineMethod (Integer, "decode", 
function (nm) {
var radix = 10;
var index = 0;
var negative = false;
var result;
if (nm.startsWith ("-")) {
negative = true;
index++;
}if (nm.startsWith ("0x", index) || nm.startsWith ("0X", index)) {
index += 2;
radix = 16;
} else if (nm.startsWith ("#", index)) {
index++;
radix = 16;
} else if (nm.startsWith ("0", index) && nm.length > 1 + index) {
index++;
radix = 8;
}if (nm.startsWith ("-", index)) throw  new NumberFormatException ("Negative sign in wrong position");
try {
result = Integer.$valueOf (nm.substring (index), radix);
result = negative ?  new Integer (-result.intValue ()) : result;
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
var constant = negative ?  String.instantialize ("-" + nm.substring (index)) : nm.substring (index);
result = Integer.$valueOf (constant, radix);
} else {
throw e;
}
}
return result;
}, "~S");
//sgurin compare and compareTo 
Integer.compare = Clazz.defineMethod (Integer, "compare", 
function (f1, f2) {
if (f1 < f2) return -1;
if (f1 > f2) return 1;
return 0;
}, "~N,~N");
Integer.prototype.compareTo=function(anotherInt) {
var otherValue = anotherInt;
if(anotherInt.valueOf) otherValue=anotherInt.valueOf();	
return java.lang.Integer.compare(this.valueOf(), otherValue);
};
//sgurin bit related methods
Integer.highestOneBit = Clazz.defineMethod (Integer, "highestOneBit", 
function (i) {
i |= (i >> 1);
i |= (i >> 2);
i |= (i >> 4);
i |= (i >> 8);
i |= (i >> 16);
return i - (i >>> 1);
}, "~N");
Integer.lowestOneBit = Clazz.defineMethod (Integer, "lowestOneBit", 
function (i) {return i & -i;}, "~N");
Integer.numberOfLeadingZeros = Clazz.defineMethod (Integer, "numberOfLeadingZeros", 
function (i) {
if (i == 0) return 32;
var n = 1;
if (i >>> 16 == 0) {n += 16;i <<= 16;}
if (i >>> 24 == 0) {n += 8;i <<= 8;}
if (i >>> 28 == 0) {n += 4;i <<= 4;}
if (i >>> 30 == 0) {n += 2;i <<= 2;}
n -= i >>> 31;
return n;
}, "~N");
Integer.numberOfTrailingZeros = Clazz.defineMethod (Integer, "numberOfTrailingZeros", 
function (i) {
var y;
if (i == 0) return 32;
var n = 31;
y = i << 16;
if (y != 0) {n = n - 16;i = y;}
y = i << 8;
if (y != 0) {n = n - 8;i = y;}
y = i << 4;
if (y != 0) {n = n - 4;i = y;}
y = i << 2;
if (y != 0) {n = n - 2;i = y;}
return n - ((i << 1) >>> 31);
}, "~N");
Integer.reverse = Clazz.defineMethod (Integer, "reverse", 
function (i) {
i = (i & 0x55555555) << 1 | (i >>> 1) & 0x55555555;
i = (i & 0x33333333) << 2 | (i >>> 2) & 0x33333333;
i = (i & 0x0f0f0f0f) << 4 | (i >>> 4) & 0x0f0f0f0f;
i = (i << 24) | ((i & 0xff00) << 8) | ((i >>> 8) & 0xff00) | (i >>> 24);
return i;
}, "~N");
Integer.reverseBytes = Clazz.defineMethod (Integer, "reverseBytes", 
function (i) {
return ((i >>> 24)) | ((i >> 8) & 0xFF00) | ((i << 8) & 0xFF0000) | ((i << 24));
}, "~N");
Integer.rotateLeft = Clazz.defineMethod (Integer, "rotateLeft", 
function (i, distance) {
return (i << distance) | (i >>> -distance);
}, "~N,~N");
Integer.rotateRight = Clazz.defineMethod (Integer, "rotateRight", 
function (i, distance) {
return (i >>> distance) | (i << -distance);
}, "~N,~N");
Integer.signum = Clazz.defineMethod (Integer, "signum", 
function (i) {
return (i >> 31) | (-i >>> 31);
}, "~N");
Integer.bitCount = Clazz.defineMethod (Integer, "bitCount", 
function (i) {
i = i - ((i >>> 1) & 0x55555555);
i = (i & 0x33333333) + ((i >>> 2) & 0x33333333);
i = (i + (i >>> 4)) & 0x0f0f0f0f;
i = i + (i >>> 8);
i = i + (i >>> 16);
return i & 0x3f;
}, "~N");
});

