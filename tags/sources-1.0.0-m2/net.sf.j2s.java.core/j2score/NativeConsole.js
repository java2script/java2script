/*******
 * Copyright ognize.com (2005).
 *
 * @author josson smith
 * @create Nov 5, 2005
 *******/

var maxTotalLines =	1000;
var linesCount = 0;
var metLineBreak = false;

var splitNeedFixed = "\n".split (/\n/).length != 2; // IE

function splitIntoLineByR (s) {
	var arr = new Array ();
	var i = 0;
	var last = -1;
	while (true) {
		i = s.indexOf ('\r', last + 1);
		if (i != -1) {
			arr[arr.length] = s.substring (last + 1, i);
			last = i;
			if (last + 1 == s.length) {
				arr[arr.length] = "";
				break;
			}
		} else {
			arr[arr.length] = s.substring (last + 1);
			break;
		}
	}
	return arr;
}
function splitIntoLines (s) {
	var arr = new Array ();
	if (s == null) {
		return arr;
	}
	var i = 0;
	var last = -1;
	while (true) {
		i = s.indexOf ('\n', last + 1);
		var str = null;
		if (i != -1) {
			if (i > 0 && s.charAt (i - 1) == '\r') {
				str = s.substring (last + 1, i - 1);
			} else {
				str = s.substring (last + 1, i);
			}
			last = i;
		} else {
			str = s.substring (last + 1);
		}
		var rArr = splitIntoLineByR (str);
		for (var k = 0; k < rArr.length; k++) {
			arr[arr.length] = rArr[k];
		}
		if (i == -1) {
			break;
		} else if (last + 1 == s.length) {
			arr[arr.length] = "";
			break;
		}
	}
	return arr;
}
var consoleBuffer = new Array ();
function loopConsole () {
	if (consoleBuffer.length == 0) {
		return ;
	}
	var console = document.getElementById ("_console_");;
	if (console == null) {
		if (document.body == null) {
			window.setTimeout ("loopConsole ();", 100);
			return ;
		}
	}
	consoleOutput ();
}
function consoleOutput (s, color, isBuffered) {
	var console = document.getElementById ("_console_");;
	if (console == null) {
		if (document.body == null) {
			consoleBuffer[consoleBuffer.length] = {
				message: s,
				color: color
			};
			window.setTimeout ("loopConsole ();", 100);
			return false;
		} else {
			console = document.createElement ("div");
			console.id = "_console_";
			console.className = "consolewindow";
			document.body.appendChild (console);
		}
	}
	if (!isBuffered && consoleBuffer.length != 0) {
		for (var i = 0; i < consoleBuffer.length; i++) {
			var o = consoleBuffer[i];
			consoleOutput (o.message, o.color, true);
		}
		consoleBuffer = new Array ();
	}
	if (typeof s == "undefined") {
		s = "";
	} else if (s == null) {
		s = "null";
	} else {
		s = "" + s;
	}
	if (linesCount > maxTotalLines) {
		//popupAlert (linesCount - maxTotalLines);
		for (var i = 0; i < linesCount - maxTotalLines; i++) {
			//if (console.childNodes.length > 0) {
				console.removeChild (console.childNodes[0]);
			//}
		}
		linesCount = maxTotalLines;
	}
	var willMeetLineBreak = false;
	if (s.length > 0) {
		var lastChar = s.charAt (s.length - 1);
		if (lastChar == '\n') {
			if (s.length > 1) {
				var preLastChar = s.charAt (s.length - 2);
				if (preLastChar == '\r') {
					s = s.substring (0, s.length - 2);
				} else {
					s = s.substring (0, s.length - 1);
				}
			} else {
				s = "";
			}
			willMeetLineBreak = true;
		} else if (lastChar == '\r') {
			s = s.substring (0, s.length - 1);
			willMeetLineBreak = true;
		}
	}

	var lines = null;
	var c160 = String.fromCharCode (160);
	s = s.replace (/\t/g, c160 + c160 + c160 + c160 + c160 + c160 + c160 + c160);
	if (splitNeedFixed) {
		try {
		lines = splitIntoLines (s);
		} catch (e) {
			popupAlert (e.message);
		}
	} else {
		lines = s.split (/\r\n|\r|\n/g);
	}
	for (var i = 0; i < lines.length; i++) {
		var lastLineEl = null;
		if (metLineBreak || linesCount == 0 || console.childNodes.length < 1) {
			lastLineEl = document.createElement ("DIV");
			console.appendChild (lastLineEl);
			lastLineEl.style.whiteSpace = "nowrap";
			linesCount++;
		} else {
			try {
				lastLineEl = console.childNodes[console.childNodes.length - 1];
			} catch (e) {
				lastLineEl = document.createElement ("DIV");
				console.appendChild (lastLineEl);
				lastLineEl.style.whiteSpace = "nowrap";
				linesCount++;
			}
		}
		var el = document.createElement ("SPAN");
		lastLineEl.appendChild (el);
		el.style.whiteSpace = "nowrap";
		if (color != null) {
			el.style.color = color;
		}
		if (lines[i].length == 0) {
			lines[i] = String.fromCharCode (160);
			//el.style.height = "1em";
		}
		el.appendChild (document.createTextNode (lines[i]));
		console.scrollTop += 100;
		
		if (i != lines.length - 1) {
			metLineBreak = true;
		} else {
			metLineBreak = willMeetLineBreak;
		}
	}
};

window.popupAlert = window.alert;

window.alert = function (s) {
	consoleOutput (s + "\r\n");
};

window.error = function (s) {
	consoleOutput (s + "\r\n", "red");
};

window.log = function (s) {
	consoleOutput (s + "\r\n", "yellow");
};

window.assert = function () {
	var b = true;
	if (arguments.length == 1) {
		b = arguments[0];
	} else if (arguments.length == 2) {
		var x1 = arguments[0];
		var x2 = arguments[1];
		b = (x1 == x2);
	} else {
		var x1 = arguments[0];
		var x2 = arguments[1];
		var delta = arguments[2];
		b = Math.abs (x1 - x2) < Math.abs (delta);
	}
	if (b) {
		consoleOutput ("Passed\r\n", "green");
	} else {
		if (arguments.length >= 2) {
			consoleOutput ("Failed: expecting " + arguments[1] 
					+ ", but " + arguments[0] + " !\r\n", "red");
		} else {
			consoleOutput ("Failed\r\n", "red");
		}
	}
};


System = new Object ();

System.arraycopy = function (src, srcPos, dest, destPos, length) {
	for (var i = 0; i < length; i++) {
		dest[destPos + i] = src[srcPos + i];
	}
};

System.out = new Object ();

System.out.print = function (s) { 
	consoleOutput (s);
};

System.out.println = function (s) {
	if (typeof s == "undefined") {
		s = "\r\n";
	} else if (s == null) {
		s = "null\r\n";
	} else {
		s = s + "\r\n";
	}
	consoleOutput (s);
};
System.out.printf = function (format, args) {
	if (format == null || format.length == 0) {
		return ;
	}
	var xargs = new Array ();
	if (arguments.length != 2) {
		for (var i = 1; i < arguments.length; i++) {
			xargs[i - 1] = arguments[i];
		}
	} else if (arguments[1] instanceof Array) {
		xargs = arguments[1];
	} else {
		xargs = [args];
	}
	
	var index = 0;
	var str = format.replace (/%(\d+\$)?([-#+ 0,\(<]*)?(\d+)?(\.\d+)?([tT])?([a-zA-Z%])/g, 
		function ($0, $1, $2, $3, $4, $5, $6) {
			var o = null;
			if ($1 != null && $1.length != 0) {
				var i = parseInt ($1) - 1;
				o = xargs[i];
			} else if ($2 != null && $2.length != 0) {
				o = xargs[index - 1];
			} else if ($5 != null && $5.length != 0) {
				o = System.out.formatTime (xargs[index], $6);
				index++;
			} else if ($6 == "n") {
				o = "\r\n";
			} else if ($6 == "%") {
				o = "%";
			} else {
				o = xargs[index];
				index++;
			}
			return o.toString ();
		});
	this.print (str);
};
System.out.formatTime = function (t, p) {
	var o = t;
	if (p == "H") {
		o = "" + t.getHours ();
		if (o.lenght < 2) {
			o = "0" + o;
		}
	} else if (p == "I") {
		o = "" + (t.getHours () % 12);
		if (o.lenght < 2) {
			o = "0" + o;
		}
	} else if (p == "k") {
		o = "" + t.getHours ();
	} else if (p == "l") {
		o = "" + (t.getHours () % 12);
	} else if (p == "M") {
		o = "" + t.getMinutes ();
		if (o.lenght < 2) {
			o = "0" + o;
		}
	} else if (p == "S") {
		o = "" + t.getSeconds ();
		if (o.lenght < 2) {
			o = "0" + o;
		}
	} else if (p == "L") {
		o = "000";
	} else if (p == "N") {
		o = "000000000";
	} else if (p == "k") {
		o = (t.getHours () > 12) ? "pm" : "am";
	} else if (p == "z") {
		o = "+0800";
	// ... More ...
	}
	return o;
};

System.err = new Object ();

System.err.print = function (s) { 
	consoleOutput (s, "red");
};

System.err.println = function (s) {
	if (typeof s == "undefined") {
		s = "\r\n";
	} else if (s == null) {
		s = "null\r\n";
	} else {
		s = s + "\r\n";
	}
	consoleOutput (s, "red");
};

System.err.printf = System.out.printf;