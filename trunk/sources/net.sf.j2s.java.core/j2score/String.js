Clazz.load (["java.lang.CharSequence", "$.Comparable", "java.io.Serializable", "java.util.Comparator"], "java.lang.String", null, function () {
java.lang.String = String;
//Clazz.decorateAsType (String, "String", null, [java.io.Serializable, CharSequence, Comparable]);
Clazz.implementOf (String, [java.io.Serializable, CharSequence, Comparable]);
//Number.equals = Clazz.innerFunctions.equals;
String.getName = Clazz.innerFunctions.getName;

String.serialVersionUID = String.prototype.serialVersionUID = -6849794470754667710;

String.prototype.$replace = function (c1, c2) {
	/*
	var sp = "\\$.*+{}?^()[]";
	if (sp.indexOf (c1) != -1) {
		c1 = "\\" + c1;
	}
	*/
	c1 = c1.replace (/([\\\/\$\.\*\+\{\}\?\^\(\)\[\]])/g, function ($0, $1) {
		return "\\" + $1;
	});
	var regExp = new RegExp (c1, "gm");
	return this.replace (regExp, c2);
};
String.prototype.replaceAll = function (exp, str) {
	var regExp = new RegExp (exp, "gm");
	return this.replace (regExp, str);
};
String.prototype.replaceFirst = function (exp, str) {
	var regExp = new RegExp (exp, "m");
	return this.replace (regExp, str);
};
String.prototype.matches = function (exp) {
	var regExp = new RegExp (exp, "gm");
	var m = this.match (regExp);
	return m != null && m.length != 0;
};
String.prototype.regionMatches = function (ignoreCase, toffset,
		other, ooffset, len) {
	/*
	 * Support different method signatures
	 */
	if (typeof ignoreCase == "number"
			|| (ignoreCase != true && ignoreCase != false)) {
		len = ooffset;
		ooffset = other;
		other = toffset;
		toffset = ignoreCase;
		ignoreCase = false;
	}
	var to = toffset;
	var po = ooffset;
	// Note: toffset, ooffset, or len might be near -1>>>1.
	if ((ooffset < 0) || (toffset < 0) || (toffset > this.length - len) ||
			(ooffset > other.length - len)) {
		return false;
	}
	var s1 = this.substring (toffset, toffset + len);
	var s2 = this.substring (ooffset, ooffset + len);
	if (ignoreCase) {
		s1 = s1.toLowerCase ();
		s2 = s2.toLowerCase ();
	}
	return s1 == s2;
};
String.prototype.$plit = function (regex, limit) {
	/*
	 * Support different method signatures
	 */
	if (limit != null && limit > 0) {
		if (limit == 1) {
			return this;
		}
		var regExp = new RegExp ("(" + regex + ")", "gm");
		var count = 1;
		var s = this.replace (regExp, function ($0, $1) {
			count++;
			if (count == limit) {
				return "@@_@@";
			} else if (count > limit) {
				return $0;
			} else {
				return $0;
			}
		});
		regExp = new RegExp (regex, "gm");
		var arr = this.split (regExp);
		if (arr.length > limit) {
			arr[limit - 1] = s.substring (s.indexOf ("@@_@@") + 5);
			arr.length = limit;
		}
		return arr;
	} else {
		var regExp = new RegExp (regex, "gm");
		return this.split (regExp);
	}
};

String.prototype.trim = function () {
	var len = this.length;
	var st = 0;

	while ((st < len) && (this.charAt (st) <= ' ')) {
	    st++;
	}
	while ((st < len) && (this.charAt (len - 1) <= ' ')) {
	    len--;
	}
	return ((st > 0) || (len < len)) ? this.substring (st, len) : this;
};

String.prototype.trim = function () {
	return this.replace (/^\s+/g, '').replace (/\s+$/g, '');
};

/* private */
String.prototype.startsWith_string_number = function (prefix, toffset) {
	var to = toffset;
	var po = 0;
	var pc = prefix.length;
	// Note: toffset might be near -1>>>1.
	if ((toffset < 0) || (toffset > this.length - pc)) {
	    return false;
	}
	while (--pc >= 0) {
	    if (this.charAt (to++) != prefix.charAt (po++)) {
	        return false;
	    }
	}
	return true;
};

String.prototype.startsWith = function (prefix) { /* prefix, toffset */
	if (arguments.length == 1) {
		return this.startsWith_string_number (arguments[0], 0);
	} else if (arguments.length == 2) {
		return this.startsWith_string_number (arguments[0], arguments[1]);
	} else {
		return false;
	}
};

String.prototype.endsWith = function (suffix) {
	return this.startsWith (suffix, this.length - suffix.length);
};

String.prototype.equals = function (anObject) {
	return this == anObject;
};

String.prototype.equalsIgnoreCase = function (anotherString) {
	return this == anotherString 
			|| this.toLowerCase () == anotherString.toLowerCase ();
};

/* private */
String.prototype.hash = 0;

String.prototype.hashCode = function () {
	var h = this.hash;
	if (h == 0) {
		var off = 0;
		var len = this.length;
		for (var i = 0; i < len; i++) {
			h = 31*h + this.charCodeAt (off++);
			h &= 0xffffffff;
		}
		this.hash = h;
	}
    return h;
};

String.prototype.getBytes = function () {
	var utf8Str = Encoding.convert2UTF8 (this);
	var arrs = new Array (utf8Str.length);
	for (var i = 0; i < utf8Str.length; i++) {
		arrs[i] = utf8Str.charCodeAt (i);
	}
	return arrs;
};

String.prototype.compareTo = function (anotherString) {
	var len1 = this.length;
	var len2 = anotherString.length;
	var n = Math.min (len1, len2);
	var k = 0;
    while (k < n) {
		var c1 = this.charCodeAt (k);
		var c2 = anotherString.charCodeAt (k);
		if (c1 != c2) {
			return c1 - c2;
		}
		k++;
	}
	return len1 - len2;
};

String.prototype.toCharArray = function () {
	var result = new Array (this.length);
	for (var i = 0; i < this.length; i++) {
		result[i] = this.charAt (i);
	}
	return result;
};

String.valueOf = function (o) {
	return "" + o;
};

String.prototype.subSequence = function (beginIndex, endIndex) {
	return this.substring(beginIndex, endIndex);
};

String.prototype.compareToIgnoreCase = function (str) {
	if (this == str) {
		return 0;
	} else if (this > str) {
		return 1;
	} else {
		return -1;
	}
};

String.prototype.contentEquals = function (sb) {
	if (this.length != sb.length ()) {
		return false;
	}
	var v = sb.getValue ();
	var i = 0;
	var j = 0;
	var n = count;
	while (n-- != 0) {
		if (this.charCodeAt (i++) != v[j++]) {
			return false;
		}
	}
	return true;
};

String.prototype.getChars = function (srcBegin, srcEnd, dst, dstBegin) {
	if (srcBegin < 0) {
		throw new StringIndexOutOfBoundsException(srcBegin);
	}
	if (srcEnd > this.length) {
		throw new StringIndexOutOfBoundsException(srcEnd);
	}
	if (srcBegin > srcEnd) {
		throw new StringIndexOutOfBoundsException(srcEnd - srcBegin);
	}
	for (var i = 0; i < srcEnd - srcBegin; i++) {
		dst[dstBegin + i] = this.charAt (srcBegin + i);
	}
};

String.indexOf = function (source, sourceOffset, sourceCount,
		target, targetOffset, targetCount, fromIndex) {
	if (fromIndex >= sourceCount) {
		return (targetCount == 0 ? sourceCount : -1);
	}
	if (fromIndex < 0) {
		fromIndex = 0;
	}
	if (targetCount == 0) {
		return fromIndex;
	}

	var first  = target[targetOffset];
	var i = sourceOffset + fromIndex;
	var max = sourceOffset + (sourceCount - targetCount);

	startSearchForFirstChar:
	while (true) {
		/* Look for first character. */
		while (i <= max && source[i] != first) {
			i++;
		}
		if (i > max) {
			return -1;
		}

		/* Found first character, now look at the rest of v2 */
		var j = i + 1;
		var end = j + targetCount - 1;
		var k = targetOffset + 1;
		while (j < end) {
			if (source[j++] != target[k++]) {
				i++;
				/* Look for str's first char again. */
				continue startSearchForFirstChar;
			}
		}
		return i - sourceOffset;	/* Found whole string. */
	}
};

String.instantialize = function () {
	if (arguments.length == 0) {
		return new String ();
	} else if (arguments.length == 1) {
		var x = arguments[0];
		if (typeof x == "string" || x instanceof String) {
			return new String (x);
		} else if (x instanceof Array) {
			if (x.length > 0 && typeof x[0] == "number") {
				var arr = new Array (x.length);
				for (var i = 0; i < x.length; i++) {
					arr[i] = String.fromCharCode (x[i] & 0xff);
				}
				return Encoding.readUTF8 (arr.join (''));
			}
			return x.join ('');
		} else if (x.__CLASS_NAME__ == "StringBuffer" 
				|| x.__CLASS_NAME__ == "java.lang.StringBuffer") {
			x.setShared();
			var value = x.getValue();
			var length = x.length ();
			var valueCopy = new Array (length);
			for (var i = 0; i < length; i++) {
				valueCopy[i] = value[i];
			}
			return valueCopy.join ('')
			//return x.value.join ('');
		} else {
			return "" + x;
		}
	} else if (arguments.length == 2) {
		var x = arguments[0];
		var y = arguments[1];
		return String.instantialize (x, 0, x.length, y);
	} else if (arguments.length == 3) {
		var bytes = arguments[0];
		var offset = arguments[1];
		var length = arguments[2];
		var arr = new Array (length);
		for (var i = 0; i < length; i++) {
			arr[i] = bytes[offset + i];
		}
		return arr.join ('');
	} else if (arguments.length == 4) {
		var bytes = arguments[0];
		var y = arguments[3];
		if (typeof y == "string" || y instanceof String) {
			var offset = arguments[1];
			var length = arguments[2];
			var arr = new Array (length);
			for (var i = 0; i < length; i++) {
				arr[i] = bytes[offset + i];
				if (typeof arr[i] == "number") {
					arr[i] = String.fromCharCode (arr[i] & 0xff);
				}
			}
			if (y.toLowerCase () == "utf-8") {
				return Encoding.readUTF8 (arr.join (''));
			} else {
				return arr.join ('');
			}
		} else {
			var value = new Array (count);

			if (hibyte == 0) {
				for (var i = count ; i-- > 0 ;) {
					value[i] = String.fromCharCode (ascii[i + offset] & 0xff);
				}
			} else {
				hibyte <<= 8;
				for (var i = count ; i-- > 0 ;) {
					value[i] = String.fromCharCode (hibyte | (ascii[i + offset] & 0xff));
				}
			}
			return value.join ('');
		}
	} else {
		var s = "";
		for (var i = 0; i < arguments.length; i++) {
		s += arguments[i];
		}
		return s;
	}
};
});