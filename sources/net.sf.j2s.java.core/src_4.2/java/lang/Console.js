/******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *****************************************************************************/
/*******
 * @author zhou renjian
 * @create Nov 5, 2005
 *******/

if (window["Console"] == null) {
/*-#
 # Console -> C_$
 #
 # <<< Console = C_$;
 #-*/
 
/* protected */
Console = {};

/**
 * Setting maxTotalLines to -1 will not limit the console result
 */
/* protected */
/*-# maxTotalLines -> mtl #-*/
Console.maxTotalLines =	1000;

/* protected */
Console.setMaxTotalLines = function (lines) {
	if (lines <= 0) {
		Console.maxTotalLines = 999999; // Won't reach before browser cracks
	} else {
		Console.maxTotalLines = lines;
	}
};

/*
 * The console window will be flicking badly in some situation. Try to use
 * double buffer to avoid flicking.
 */
/* protected */
/*-# buffering -> bi #-*/
Console.buffering = false;

/* protected */
Console.enableBuffering = function (enabled) {
	Console.buffering = enabled;
};

/* protected */
/*-# maxBufferedLines -> mbl #-*/
Console.maxBufferedLines = 20;

/* protected */
Console.setMaxBufferedLines = function (lines) {
	if (lines <= 0) {
		Console.maxBufferedLines = 20;
	} else {
		Console.maxBufferedLines = lines;
	}
};

/* protected */
/*-# maxLatency -> mlc #-*/
Console.maxLatency = 40;

/* protected */
Console.setMaxLatency = function (latency) {
	if (latency <= 0) {
		Console.maxLatency = 40;
	} else {
		Console.maxLatency = latency;
	}
};

/* protected */
/*-# pinning -> pi #-*/
Console.pinning  = false;

/* protected */
Console.enablePinning = function (enabled) {
	Console.pinning = enabled;
};

/* private */
/*-# linesCount -> lc #-*/
Console.linesCount = 0;

/* private */
/*-# metLineBreak -> mbr #-*/
Console.metLineBreak = false;

/* private */
Console.splitNeedFixed = "\n".split (/\n/).length != 2; // IE

/**
 * For IE to get a correct split result.
 */
/* private */
/*-# splitIntoLineByR -> slr #-*/
Console.splitIntoLineByR = function (s) {
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
};

/**
 * For IE to get a correct split result.
 */
/* private */
/*-# splitIntoLines -> sil #-*/
Console.splitIntoLines = function (s) {
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
		var rArr = Console.splitIntoLineByR (str);
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
};

/**
 * Cache the console until the document.body is ready and console element
 * is created.
 */
/* private */
/*-# consoleBuffer -> cB #-*/
Console.consoleBuffer = new Array ();

/* private */
/*-# lastOutputTime -> oT #-*/
Console.lastOutputTime = new Date ().getTime ();

/* private */
/*-# checkingTimer -> lct #-*/
Console.checkingTimer = 0;

/* private */
/*-# loopChecking -> li  #-*/
Console.loopChecking = function () {
	if (Console.consoleBuffer.length == 0) {
		return ;
	}
	var console = document.getElementById ("_console_");;
	if (console == null) {
		if (document.body == null) {
			if (Console.checkingTimer == 0) {
				Console.checkingTimer = window.setTimeout (
						"Console.loopChecking ();", Console.maxLatency);
			}
			return ;
		}
	}
	Console.consoleOutput ();
};

/*
 * Give an extension point so external script can create and bind the console
 * themself.
 *
 * TODO: provide more template of binding console window to browser.
 */
/* protected */
Console.createConsoleWindow = function (parentEl) {
	var console = document.createElement ("DIV");
	console.style.cssText = "font-family:monospace, Arial, sans-serif;";
	document.body.appendChild (console);
	return console;
};

/* protected */
/*-#
 # consoleOutput -> cot 
 #
 # isBuffered -> bed
 #-*/
Console.consoleOutput = function (s, color, isBuffered) {
	var console = document.getElementById ("_console_");;
	if (console == null) {
		if (document.body == null) {
			Console.consoleBuffer[Console.consoleBuffer.length] = {
				message: s,
				color: color
			};
			if (Console.checkingTimer == 0) {
				Console.checkingTimer = window.setTimeout (
						"Console.loopChecking ();", Console.maxLatency);
			}
			return false;
		} else {
			console = Console.createConsoleWindow ();
			console.id = "_console_";
		}
	}
	/*
	 * Try to implement double buffer here for the console
	 */
	if (Console.buffering && !isBuffered && 
			Console.consoleBuffer.length < Console.maxBufferedLines &&
			new Date ().getTime () - Console.lastOutputTime < 
			Console.maxLatency) {
		Console.consoleBuffer[Console.consoleBuffer.length] = {
			message: s,
			color: color
		};
		if (Console.checkingTimer == 0) {
			Console.checkingTimer = window.setTimeout (
					"Console.loopChecking ();", Console.maxLatency);
		}
		return false;
	}
	
	if (Console.buffering && isBuffered && Console.checkingTimer != 0) {
		window.clearTimeout (Console.checkingTimer);
		Console.checkingTimer = 0;
	}
	
	if (!isBuffered && Console.consoleBuffer.length != 0) {
		for (var i = 0; i < Console.consoleBuffer.length; i++) {
			var o = Console.consoleBuffer[i];
			Console.consoleOutput (o.message, o.color, true);
		}
		Console.consoleBuffer = new Array ();
	}
	if (Console.linesCount > Console.maxTotalLines) {
		for (var i = 0; i < Console.linesCount - Console.maxTotalLines; i++) {
			if (console != null && console.childNodes.length > 0) {
				console.removeChild (console.childNodes[0]);
			}
		}
		Console.linesCount = Console.maxTotalLines;
	}
	
	/*-# willMeetLineBreak -> wbr #-*/
	var willMeetLineBreak = false;
	if (typeof s == "undefined") {
		s = "";
	} else if (s == null) {
		s = "null";
	} else {
		s = "" + s;
	}
	if (s.length > 0) {
		/*-# lastChar -> lc #-*/
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
	s = s.replace (/\t/g, c160 + c160 + c160 + c160 + 
			c160 + c160 + c160 + c160);
	if (Console.splitNeedFixed) { // IE
		try {
			lines = Console.splitIntoLines (s);
		} catch (e) {
			window.popup (e.message);
		}
	} else { // Mozilla/Firefox, Opera
		lines = s.split (/\r\n|\r|\n/g);
	}
	for (var i = 0; i < lines.length; i++) {
		/*-# lastLineEl -> lE #-*/
		var lastLineEl = null;
		if (Console.metLineBreak || Console.linesCount == 0 
				|| console.childNodes.length < 1) {
			lastLineEl = document.createElement ("DIV");
			console.appendChild (lastLineEl);
			lastLineEl.style.whiteSpace = "nowrap";
			Console.linesCount++;
		} else {
			try {
				lastLineEl = console.childNodes[console.childNodes.length - 1];
			} catch (e) {
				lastLineEl = document.createElement ("DIV");
				console.appendChild (lastLineEl);
				lastLineEl.style.whiteSpace = "nowrap";
				Console.linesCount++;
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
		if (!Console.pinning) {
			console.scrollTop += 100;
		}
		
		if (i != lines.length - 1) {
			Console.metLineBreak = true;
		} else {
			Console.metLineBreak = willMeetLineBreak;
		}
	}
	
	var cssClazzName = console.parentNode.className;
	if (!Console.pinning && cssClazzName != null
			&& cssClazzName.indexOf ("composite") != -1) {
		console.parentNode.scrollTop = console.parentNode.scrollHeight;
	}
	Console.lastOutputTime = new Date ().getTime ();
};

/*
 * Clear all contents inside the console.
 */
/* public */
Console.clear = function () {
	Console.metLineBreak = true;
	var console = document.getElementById ("_console_");;
	if (console == null) {
		if (document.body == null) {
			Console.consoleBuffer = [];
		}
		return;
	}
	Console.consoleBuffer = [];
	var childNodes = console.childNodes;
	for (var i = childNodes.length - 1; i >= 0; i--) {
		console.removeChild (childNodes[i]);
	}
	Console.linesCount = 0;
};

/**
 * popup is caching the original alert 
 */
/* public */
window.popup = window.alert;

/* public */
window.alert = function (s) {
	Console.consoleOutput (s + "\r\n");
};

/* public */
window.error = function (s) {
	Console.consoleOutput (s + "\r\n", "red");
};

/* public */
window.log = function (s) {
	Console.consoleOutput (s + "\r\n", "blue");
};

/**
 * TODO: assert need more work
 */
/* public */
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
		Console.consoleOutput ("Passed\r\n", "green");
	} else {
		// TODO: Should throw exceptions here
		if (arguments.length >= 2) {
			Console.consoleOutput ("Failed: expecting " + arguments[1] 
					+ ", but " + arguments[0] + " !\r\n", "red");
		} else {
			Console.consoleOutput ("Failed\r\n", "red");
		}
	}
};

//if (window["System"] == null) { // System is not defined yet
	/**
	 * java.lang.System may be overriden later
	 */
	/* public */
	System = new JavaObject ();
	
	System.currentTimeMillis = function () {
		return new Date ().getTime ();
	};

	/* public */
	System.arraycopy = function (src, srcPos, dest, destPos, length) {
		if (src != dest) {
			for (var i = 0; i < length; i++) {
				dest[destPos + i] = src[srcPos + i];
			}
		} else {
			var swap = [];
			for (var i = 0; i < length; i++) {
				swap[i] = src[srcPos + i];
			}
			for (var i = 0; i < length; i++) {
				dest[destPos + i] = swap[i];
			}
		}
	};
	System.identityHashCode = function (obj) {
		if (obj == null) {
			return 0;
		}
		try {
			return obj.toString ().hashCode ();
		} catch (e) {
			var str = ":";
			for (var s in obj) {
				str += s + ":"
			}
			return str.hashCode ();
		}
	};
	
	System.props = null; //new java.util.Properties ();
	System.getProperties = function () {
		return System.props;
	};
	System.getProperty = function (key, def) {
		if (System.props != null) {
			return System.props.getProperty (key, def);
		}
		if (def != null) {
			return def;
		}
		return key;
	};
	System.setProperties = function (props) {
		System.props = props;
	};
	System.setProperty = function (key, val) {
		if (System.props == null) {
			return ;
		}
		System.props.setProperty (key, val);
	};

	/* public */
	System.out = new JavaObject ();
	System.out.__CLASS_NAME__ = "java.io.PrintStream";
	
	/* public */
	System.out.print = function (s) { 
		Console.consoleOutput (s);
	};
	
	/* public */
	System.out.println = function (s) {
		if (typeof s == "undefined") {
			s = "\r\n";
		} else if (s == null) {
			s = "null\r\n";
		} else {
			s = s + "\r\n";
		}
		Console.consoleOutput (s);
	};
	
	/* public */
	System.err = new JavaObject ();
	System.err.__CLASS_NAME__ = "java.io.PrintStream";
	
	/* public */
	System.err.print = function (s) { 
		Console.consoleOutput (s, "red");
	};
	
	/* public */
	System.err.println = function (s) {
		if (typeof s == "undefined") {
			s = "\r\n";
		} else if (s == null) {
			s = "null\r\n";
		} else {
			s = s + "\r\n";
		}
		Console.consoleOutput (s, "red");
	};
	
	/**
	 * TODO: printf need more work for those quatities of formats
	 */
	/* public */
	System.out.printf = System.err.printf = function (format, args) {
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
		var str = format.replace (
			/%(\d+\$)?([-#+ 0,\(<]*)?(\d+)?(\.\d+)?([tT])?([a-zA-Z%])/g, 
			function ($0, $1, $2, $3, $4, $5, $6) {
				var o = null;
				if ($1 != null && $1.length != 0) {
					var i = parseInt ($1) - 1;
					o = xargs[i];
				} else if ($2 != null && $2.length != 0) {
					o = xargs[index - 1];
				} else if ($5 != null && $5.length != 0) {
					o = this.formatTime (xargs[index], $6);
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
	
	/* public */
	System.out.formatTime = System.err.formatTime = function (t, p) {
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
//}
}
