Clazz.load (["java.lang.Comparable", "$.Number"], "java.lang.Long", null, function () {
java.lang.Long = Long = function () {
Clazz.instantialize (this, arguments);
};
Clazz.decorateAsType (Long, "Long", Number, Comparable, null, true);
Long.prototype.valueOf = function () { return 0; };
Long.toString = Long.prototype.toString = function () {
	if (arguments.length != 0) {
		return "" + arguments[0];
	} else if (this === Long) {
		return "class java.lang.Long"; // Long.class.toString
	}
	return "" + this.valueOf ();
};
/*
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
// */
Clazz.makeConstructor (Long, 
function (s) {
var v = 0;
if (arguments.length > 0) {
	if (typeof s == "string") {
		v = Long.parseLong (s, 10);
	} else {
		v = s;
	}
}
this.valueOf = function () {
	return v;
};
}, "Object");
Long.serialVersionUID = Long.prototype.serialVersionUID = 4290774380558885855;
Long.MIN_VALUE = Long.prototype.MIN_VALUE = -0x8000000000000000;
Long.MAX_VALUE = Long.prototype.MAX_VALUE = 0x7fffffffffffffff;
Long.TYPE = Long.prototype.TYPE = Long;

Clazz.defineMethod (Long, "parseLong", 
function (s, radix) {
if (arguments.length < 2 || radix == null) {
radix = 10;
}
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
/*
Clazz.defineMethod (Long, "parseLong", 
function (s) {
return Long.parseLong (s, 10);
}, "String");
// */
Long.parseLong = Long.prototype.parseLong;

/*
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
// */

Long.$valueOf = Long.prototype.$valueOf = function (s, r) {
	if (arguments.length == 2) { // String, Number
		return new Long(Long.parseLong (s, r));
	} else if (typeof s == "string") { // String
		return new Long(Long.parseLong (s, 10));
	} else { // Number
		return new Long(s);
	}
};

Clazz.overrideMethod (Long, "equals", 
function (s) {
if(s == null || !Clazz.instanceOf(s, Long) ){
	return false;
}
return s.valueOf()  == this.valueOf();
}, "Object");

Clazz.defineMethod (Long, "toHexString", 
function (d) {
if(d.valueOf)d=d.valueOf();
var r = d.to$tring(16);
return r;
}, "Number");
Long.toHexString = Long.prototype.toHexString;

Clazz.defineMethod (Long, "toOctalString", 
function (d) {
if(d.valueOf)d=d.valueOf();
var r = d.to$tring(8);
return r;
}, "Number");
Long.toOctalString = Long.prototype.toOctalString;

Clazz.defineMethod (Long, "toBinaryString", 
function (d) {
if(d.valueOf)d=d.valueOf();
var r = d.to$tring(2);
return r;
}, "Number");
Long.toBinaryString = Long.prototype.toBinaryString;

Long.decode = Clazz.defineMethod (Long, "decode", 
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
result = Long.$valueOf (nm.substring (index), radix);
result = negative ?  new Long (-result.longValue ()) : result;
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
var constant = negative ?  String.instantialize ("-" + nm.substring (index)) : nm.substring (index);
result = Long.$valueOf (constant, radix);
} else {
throw e;
}
}
return result;
}, "~S");
//sgurin compare and compareTo. the same implementation as in Integer
Long.compare = Clazz.defineMethod (Long, "compare", 
function (f1, f2) {
if (f1 < f2) return -1;
if (f1 > f2) return 1;
return 0;
}, "~N,~N");
Long.prototype.compareTo=function(anotherInt) {
var otherValue = anotherInt;
if(anotherInt.valueOf) otherValue=anotherInt.valueOf();	
return java.lang.Long.compare(this.valueOf(), otherValue);
};
//sgurin bitwise related static methods 
Long.bitCount = Clazz.defineMethod (Long, "bitCount", function (i) {
i = i - ((i >>> 1) & 0x5555555555555555);
i = (i & 0x3333333333333333) + ((i >>> 2) & 0x3333333333333333);
i = (i + (i >>> 4)) & 0x0f0f0f0f0f0f0f0f;
i = i + (i >>> 8);
i = i + (i >>> 16);
i = i + (i >>> 32);
return i & 0x7f;
}, "~N");
Long.rotateLeft = Clazz.defineMethod (Long, "rotateLeft", function (i, distance) {
return (i << distance) | (i >>> -distance);
}, "~N,~N");
Long.rotateRight = Clazz.defineMethod (Long, "rotateRight", function (i, distance) {
return (i >>> distance) | (i << -distance);
}, "~N,~N");
Long.highestOneBit = Clazz.defineMethod (Long, "highestOneBit", function (i) {
i |= (i >> 1);i |= (i >> 2);i |= (i >> 4);
i |= (i >> 8);i |= (i >> 16);i |= (i >> 32);
return i - (i >>> 1);
}, "~N");
Long.lowestOneBit = Clazz.defineMethod (Long, "lowestOneBit", function (i) {
return i & -i;}, "~N");
Long.numberOfLeadingZeros = Clazz.defineMethod (Long, "numberOfLeadingZeros", function (i) {
if (i == 0) return 64;
var n = 1;var x = (i >>> 32);
if (x == 0) {n += 32;x = i;}
if (x >>> 16 == 0) {n += 16;x <<= 16;}
if (x >>> 24 == 0) {n += 8;x <<= 8;}
if (x >>> 28 == 0) {n += 4;x <<= 4;}
if (x >>> 30 == 0) {n += 2;x <<= 2;}
n -= x >>> 31;return n;}, "~N");
Long.numberOfTrailingZeros = Clazz.defineMethod (Long, "numberOfTrailingZeros", function (i) {
var x;var y;
if (i == 0) return 64;
var n = 63;y = i;
if (y != 0) {n = n - 32;x = y;} 
else x = (i >>> 32);
y = x << 16;
if (y != 0) {n = n - 16;x = y;}
y = x << 8;
if (y != 0) {n = n - 8;x = y;
}y = x << 4;
if (y != 0) {n = n - 4;x = y;
}y = x << 2;
if (y != 0) {n = n - 2;x = y;
}return n - ((x << 1) >>> 31);}, "~N");
Long.signum = Clazz.defineMethod (Long, "signum", function (i) {
return ((i >> 63) | (-i >>> 63));}, "~N");
Long.reverseBytes = Clazz.defineMethod (Long, "reverseBytes", function (i) {
i = (i & 0x00ff00ff00ff00ff) << 8 | (i >>> 8) & 0x00ff00ff00ff00ff;
return (i << 48) | ((i & 0xffff0000) << 16) | ((i >>> 16) & 0xffff0000) | (i >>> 48);}, "~N");
Long.reverse = Clazz.defineMethod (Long, "reverse", function (i) {
i = (i & 0x5555555555555555) << 1 | (i >>> 1) & 0x5555555555555555;
i = (i & 0x3333333333333333) << 2 | (i >>> 2) & 0x3333333333333333;
i = (i & 0x0f0f0f0f0f0f0f0f) << 4 | (i >>> 4) & 0x0f0f0f0f0f0f0f0f;
i = (i & 0x00ff00ff00ff00ff) << 8 | (i >>> 8) & 0x00ff00ff00ff00ff;
i = (i << 48) | ((i & 0xffff0000) << 16) | ((i >>> 16) & 0xffff0000) | (i >>> 48);
return i;}, "~N");
});

