// DEPRECATED -- SEE J2SSwingJS.js

Encoding = new Object();
Encoding.UTF8 = "utf-8";
Encoding.UTF16 = "utf-16";
Encoding.ASCII = "ascii";

/* protected */
Encoding.guessEncoding = function (str) {
	if (str.charCodeAt(0) == 0xEF && str.charCodeAt(1) == 0xBB && str.charCodeAt(2) == 0xBF) {
		return Encoding.UTF8;
	} else if (str.charCodeAt(0) == 0xFF && str.charCodeAt(1) == 0xFE) {
		return Encoding.UTF16;
	} else {
		return Encoding.ASCII;
	}
};
/* public */
Encoding.readUTF8 = function (str) {
	var encoding = this.guessEncoding(str);
	var startIdx = 0;
	if (encoding == Encoding.UTF8) {
		startIdx = 3;
	} else if (encoding == Encoding.UTF16) {
		startIdx = 2;
	}
	var arrs = new Array();
	for (var i = startIdx; i < str.length; i++) {
		var charCode = str.charCodeAt(i);
		if (charCode < 0x80) {
			arrs[arrs.length] = str.charAt(i);
		} else if (charCode > 0xc0 && charCode < 0xe0) {
			var c1 = charCode & 0x1f;
			i++;
			var c2 = str.charCodeAt(i) & 0x3f;
			var c = (c1 << 6) + c2;
			arrs[arrs.length] = String.fromCharCode(c);
		} else if (charCode >= 0xe0 && charCode < 0xf0) {
			var c1 = charCode & 0x0f;
			i++;
			var c2 = str.charCodeAt(i) & 0x3f;
			i++;
			var c3 = str.charCodeAt(i) & 0x3f;
			var c = (c1 << 12) + (c2 << 6) + c3;
			arrs[arrs.length] = String.fromCharCode(c);
		} else if (charCode >= 0xf0) {
			var c1 = charCode & 0x07;
			i++;
			var c2 = str.charCodeAt(i);
			i++;
			var c3 = str.charCodeAt(i);
			i++;
			var c4 = str.charCodeAt(i);
			//var c = ((c1 & 0x06) << 18) + ((c2 & 0x3f)<< 12) + ((c3 & 0x3f) << 6) + (c4 & 0x3f) - 0x10000;
			var highCode = (c1 & 0x07 << 8) + ((c2 & 0x3f) << 2) + ((c3 & 0x30) >> 4) + 0xd800 - 0x0040;
			var lowCode = ((c3 & 0x0f) << 6) + (c4 & 0x3f) + 0xdc00;
			arrs[arrs.length] = String.fromCharCode(highCode);
			arrs[arrs.length] = String.fromCharCode(lowCode);
		}
	}
	return arrs.join ('');
};
/* public */
Encoding.convert2UTF8 = function (str) {
	var encoding = this.guessEncoding(str);
	var startIdx = 0;
	if (encoding == Encoding.UTF8) {
		return str;
	} else if (encoding == Encoding.UTF16) {
		startIdx = 2;
	}
	
	var offset = 0;
	var arrs = new Array(offset + str.length - startIdx);
	/*
	arrs[0] = String.fromCharCode(0xEF).charAt(0);
	arrs[1] = String.fromCharCode(0xBB).charAt(0);
	arrs[2] = String.fromCharCode(0xBF).charAt(0);
	*/
	for (var i = startIdx; i < str.length; i++) {
		var charCode = str.charCodeAt(i);
		if (charCode < 0x80) {
			arrs[offset + i - startIdx] = str.charAt(i);
			continue;
		} else if (charCode <= 0x07ff) { //(charCode > 0xc0 && charCode < 0xe0) {
			var c1 = 0xc0 + ((charCode & 0x07c0) >> 6);
			var c2 = 0x80 + (charCode & 0x003f);
			arrs[offset + i - startIdx] = String.fromCharCode(c1) + String.fromCharCode(c2);
			continue;
		} else if (charCode >= 0xd800 && charCode <= 0xdbff) { // high-surrogate code point
			if (i < str.length - 1) {
				var lowCode = str.charCodeAt(i+1);
				if (lowCode >= 0xdc00 && lowCode <= 0xdfff) { // low-surrogate code point
					i++;
					// charCode = ((charCode & 0x03ff) << 10) + (lowCode & 0x03ff) + 0x10000;
					// utf8mb4: 0x10000 <= charCode <= 0x1fffff
					var highCode = charCode + 0x0040; // + 0x10000 
					var c1 = 0xf0 + ((highCode & 0x0700) >> 16);
					var c2 = 0x80 + ((highCode & 0x00fc) >> 2);
					var c3 = 0x80 + ((highCode & 0x0003) << 4) + ((lowCode & 0x03c0) >> 6);
					var c4 = 0x80 + (lowCode & 0x003f);
					arrs[offset + i - startIdx] = String.fromCharCode(c1) + String.fromCharCode(c2) + String.fromCharCode(c3) + String.fromCharCode(c4);
					continue;
				}
			} 
		}
		var c1 = 0xe0 + ((charCode & 0xf000) >> 12);
		var c2 = 0x80 + ((charCode & 0x0fc0) >> 6);
		var c3 = 0x80 + (charCode & 0x003f);
		arrs[offset + i - startIdx] = String.fromCharCode(c1) + String.fromCharCode(c2) + String.fromCharCode(c3);
	}
	return arrs.join ('');
};
Encoding.base64Chars = new Array(
    'A','B','C','D','E','F','G','H',
    'I','J','K','L','M','N','O','P',
    'Q','R','S','T','U','V','W','X',
    'Y','Z','a','b','c','d','e','f',
    'g','h','i','j','k','l','m','n',
    'o','p','q','r','s','t','u','v',
    'w','x','y','z','0','1','2','3',
    '4','5','6','7','8','9','+','/'
);
Encoding.encodeBase64 = function (str) {
	if (str == null || str.length == 0) return str;
	var b64 = Encoding.base64Chars;
	var length = str.length;
	var index = 0;
	var buf = [];
	var c0, c1, c2;
	while (index < length) {
		c0 = str.charCodeAt (index++);
		buf[buf.length] = b64[c0 >> 2];
		if (index < length) {
			c1 = str.charCodeAt (index++);
            buf[buf.length] = b64[((c0 << 4 ) & 0x30) | (c1 >> 4)];
            if (index < length){
				c2 = str.charCodeAt (index++);
                buf[buf.length] = b64[((c1 << 2) & 0x3c) | (c2 >> 6)];
                buf[buf.length] = b64[c2 & 0x3F];
            } else {
                buf[buf.length] = b64[((c1 << 2) & 0x3c)];
                buf[buf.length] = '=';
            }
		} else {
			buf[buf.length] = b64[(c0 << 4) & 0x30];
			buf[buf.length] = '=';
			buf[buf.length] = '=';
		}
	}
	return buf.join ('');
};
Encoding.decodeBase64 = function (str) {
	if (str == null || str.length == 0) return str;
	var b64 = Encoding.base64Chars;
	var xb64 = Encoding.xBase64Chars;
	if (Encoding.xBase64Chars == null) {
		xb64 = new Object();
		for (var i = 0; i < b64.length; i++){
		    xb64[b64[i]] = i;
		}
		Encoding.xBase64Chars = xb64;
	}
	var length = str.length;
	var index = 0;
	var buf = [];
	var c0, c1, c2, c3;
	var c = 0;
	while (index < length && c++ < 60000) {
		c0 = xb64[str.charAt (index++)];
		c1 = xb64[str.charAt (index++)];
		c2 = xb64[str.charAt (index++)];
		c3 = xb64[str.charAt (index++)];
		buf[buf.length] = String.fromCharCode(((c0 << 2) & 0xff) | c1 >> 4);
		if (c2 != null) {
			buf[buf.length] = String.fromCharCode(((c1 << 4) & 0xff) | c2 >> 2);
			if (c3 != null) {
				buf[buf.length] = String.fromCharCode(((c2 << 6) & 0xff) | c3);
			}
		}
	}
	return buf.join ('');
};
