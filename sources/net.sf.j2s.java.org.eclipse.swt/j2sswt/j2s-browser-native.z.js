/*=j2s=
#Java2Script Configuration
#Sun Jan 22 00:50:30 CST 2006
j2s.resources.list=browser/native/Support.js
=*/
BrowserNative = new Object ();
BrowserNative.getDelimiterCount = function (s) {
	/*
	 * FIXME: counting delimiters is incorrect!
	 */
	var count = 0;
	s = s.replace (/\r\n/g, function () {
		count++;
		return "";
	});
	s = s.replace (/\n/g, function () {
		count++;
		return "";
	});
	s = s.replace (/\r/g, function () {
		count++;
		return "";
	});
	return count;
};

BrowserNative.setTextSelection = function (handle, start, end) {
	handle.focus ();
	if (!(handle.setSelectionRange && handle.createTextRange)) {
		var s = handle.value.substring (0, start);
		var count = BrowserNative.getDelimiterCount (s);
		start -= count;
		end -= count;
		s = handle.value.substring (start, end);
		end -= BrowserNative.getDelimiterCount (s);
	}
	if (handle.setSelectionRange) {
		handle.setSelectionRange (start, end);
	} else if (handle.createTextRange) {
		var range = handle.createTextRange ();
		range.collapse (true);
		range.moveStart ("character", start);
		range.moveEnd ("character", end - start + 1);
		range.select ();
	}
	handle.focus ();
};
/*
 * Used for Browser to copy *.style object
 */
BrowserNative.copyStructs = function (o1, o2) {
	for (var s in o2) {
		try {
			o1[s] = o2[s];
		} catch (e) {
			try {
				copyStructs(o1[s], o2[s]);
			} catch (e) {
				//
			}
		}
	}
};

BrowserNative.iframeDocumentWrite = function (handle, html) {
	if (handle.contentWindow != null) {
		handle.contentWindow.location = "about:blank";
	} else { // Opera
		handle.src = "about:blank";
	}
	try {
		handle.contentWindow.document.write (html);
		handle.contentWindow.document.close ();
	} catch (e) {
		window.setTimeout ((function () {
			return function () {
				handle.contentWindow.document.write (html);
				handle.contentWindow.document.close ();
			};
		}) (), 25);
	}
};

function parseInnerText (s, key) {
	var idx1 = s.lastIndexOf ("</" + key + ">");
	if (idx1 != -1) {
		var idx2 = s.lastIndexOf ("<" + key, idx1);
		if (idx2 != -1) {
			var idx3 = s.indexOf (">", idx2);
			if (idx3 != -1) {
				s = s.substring (idx3 + 1, idx1);
				s = s.replace (/&gt;/g, ">")
						.replace (/&lt;/g, "<")
						.replace (/&quot;/g, "\"")
						.replace (/&apos;/g, "\'")
						.replace (/&nbsp;/g, " ")
						.replace (/&amp;/g, "&");
				/* FIXME: still buggy here! */
				return s;
			}
		}
	}
	return null;
};

BrowserNative.getTextCaretPosition = function (handle) {
	if (typeof handle.selectionStart != "undefined") {
		return handle.selectionStart;
	} else if (document.selection) {
		handle.focus ();
		var workRange = document.selection.createRange();
		workRange.moveStart ("character", -32767);
		if (workRange.htmlText != null) {
			var s = workRange.htmlText;
			var key = handle.nodeName;
			var txt = parseInnerText (s, key);
			if (txt != null) {
				return txt.length;
			}
		}
		return workRange.text.length;
	}
	return -1;
};

BrowserNative.getTextCaretPositionEnd = function (handle) {
	if (typeof handle.selectionEnd != "undefined") {
		return handle.selectionEnd;
	} else if (document.selection) {
		handle.focus ();
		var workRange = document.selection.createRange();
		if (workRange.htmlText != null) {
			var s = workRange.htmlText;
			var key = handle.nodeName;
			var txt = parseInnerText (s, key);
			if (txt != null) {
				return txt.length;
			}
		}
		return workRange.text.length;
	}
	return -1;
};

BrowserNative.getTextSelection = function (handle) {
	if (typeof handle.selectionStart != "undefined") {
		return new org.eclipse.swt.graphics.Point (handle.selectionStart, 
				handle.selectionEnd);
	} else if (document.selection) {
		return new org.eclipse.swt.graphics.Point (
				BrowserNative.getTextCaretPosition (), 
				BrowserNative.getTextCaretPositionEnd ());
	}
	return new new org.eclipse.swt.graphics.Point (0, 0);
};

BrowserNative.getTextCaretLineNumber = function (handle) {
	var txt = "";
	if (typeof handle.selectionStart != "undefined") {
		txt = handle.value.substring (0, handle.selectionStart);
	} else if (document.selection) {
		handle.focus ();
		var workRange=document.selection.createRange();
		workRange.moveStart("character", -65535);
		if (workRange.htmlText != null) {
			var s = workRange.htmlText;
			var key = handle.nodeName;
			txt = parseInnerText (s, key);
		} else {
			txt = workRange.text;
		}
	}
	return BrowserNative.getDelimiterCount (txt);
};

BrowserNative.getSelectionText = function (handle) {
	handle.focus ();
	if (typeof handle.selectionStart != "undefined") {
		var start = handle.selectionStart;
		return handle.value.substring (start, handle.selectionEnd);
	} else if (document.selection) {
		var workRange=document.selection.createRange();
		return workRange.text;
	}
	return "";
};

BrowserNative.insertTextString = function (handle, str) {
	handle.focus ();
	if (typeof handle.selectionStart != "undefined") {
		var start = handle.selectionStart;
		handle.value = handle.value.substring (0, start) + str + handle.value.substring (handle.selectionEnd);
		handle.setSelectionRange (start + str.length, start + str.length);
	} else if (document.selection) {
		var workRange=document.selection.createRange();
		workRange.text = str;
		workRange.select ();
	}
};

BrowserNative.clearSelection = function (handle) {
	handle.focus ();
	if (typeof handle.selectionStart != "undefined") {
		var start = handle.selectionStart;
		handle.setSelectionRange (start, start);
	} else if (document.selection) {
		var workRange=document.selection.createRange();
		workRange.text = workRange.text;
		workRange.select ();
	}
};

BrowserNative.releaseHandle = function (handle) {
	if (handle == null) {
		return ;
	}
	handle.onblur = null;
	handle.onchange = null;
	handle.onclick = null;
	handle.oncontextmenu = null;
	handle.onfocus = null;
	handle.onkeydown = null;
	handle.onkeypress = null;
	handle.onkeyup = null;
	handle.onmousedown = null;
	handle.onmousemove = null;
	handle.onmouseout = null;
	handle.onmouseover = null;
	handle.onmouseup = null;
	handle.onselectchange = null;
	handle.onselectstart = null;
	if (handle.parentNode != null) {
		try {
			handle.parentNode.removeChild (handle);
		} catch (e) {
		}
	}
};

BrowserNative.resizingHandle = null;
BrowserNative.layoutResize = function () {
	if (BrowserNative.resizingHandle != null) {
		window.clearTimeout (BrowserNative.resizingHandle);
	}
	BrowserNative.resizingHandle = window.setTimeout (function () {
		org.eclipse.swt.internal.ResizeSystem.updateResize ();
	}, 50);
};

try {
	window.addEventListener('resize', BrowserNative.layoutResize, true);
} catch (e) {
	window.onresize = BrowserNative.layoutResize;
}

/*
 * Only IE need to release the resources so that no memory is leaked
 */
if (window.attachEvent) {
	window.attachEvent ("onunload", function () {
		try {
			org.eclipse.swt.widgets.Display.releaseAllDisplays ();
		} catch (e) {
			popupAlert (e.message);
		}
		return true;
	});
}

