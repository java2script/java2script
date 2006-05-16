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
/*
 * Take a second to thought that this utility is time consuming.
 */
UIStringUtil = new Object ();
UIStringUtil.invisbleContainer = null;
UIStringUtil.lineContainer = null;
UIStringUtil.blockContainer = null;
UIStringUtil.init = function () {
	if (this.invisbleContainer == null) {
		var el = document.createElement ("DIV");
		document.body.appendChild (el);
		var s = el.style;
		s.position = "absolute";
		s.top = "-200px";
		s.width = "100px";
		s.height = "100px";
		s.overflow = "scroll";
		this.invisbleContainer = el;
		
		el = document.createElement ("DIV");
		this.invisbleContainer.appendChild (el);
		el.style.display = "inline";
		el.style.whiteSpace = "nowrap";
		this.lineContainer = el;
		
		el = document.createElement ("DIV");
		this.invisbleContainer.appendChild (el);
		this.blockContainer = el;
	}
};
UIStringUtil.release = function () {
	this.invisbleContainer.removeChild (this.lineContainer);
	this.invisbleContainer.removeChild (this.blockContainer);
	document.body.removeChild (this.invisbleContainer);
};
UIStringUtil.resetLineContainer = function () {
	var container = this.lineContainer;
	for (var i = container.childNodes.length - 1; i >= 0; i--) {
		container.removeChild (container.childNodes[i]);
	}
	container.className = "";
};
UIStringUtil.resetBlockContainer = function () {
	var container = this.blockContainer;
	for (var i = container.childNodes.length - 1; i >= 0; i--) {
		container.removeChild (container.childNodes[i]);
	}
	container.className = "";
	container.style.width = "auto";
	container.style.height = "auto";
	container.style.overflow = "auto";
};
UIStringUtil.getContainerWidth = function (container) {
	return Math.max(container.offsetWidth, container.clientWidth, container.scrollWidth);
};
UIStringUtil.getContainerHeight = function (container) {
	return Math.max(container.offsetHeight, container.clientHeight, container.scrollHeight);
};
UIStringUtil.calculatePlainStringLineWidth = function (str) {
	this.init ();
	this.resetLineContainer ();
	this.lineContainer.appendChild (document.createTextNode (str));
	return this.getContainerWidth (this.lineContainer);
};
UIStringUtil.calculatePlainStringLineHeight = function (str) {
	this.init ();
	this.resetLineContainer ();
	this.lineContainer.appendChild (document.createTextNode (str));
	return this.getContainerHeight (this.lineContainer);
};
UIStringUtil.calculatePlainStringBlockHeight = function (str, width) {
	this.init ();
	this.resetBlockContainer ();
	this.blockContainer.style.width = width + "px";
	this.blockContainer.style.overflow = "scroll";
	this.blockContainer.appendChild (document.createTextNode (str));
	return this.getContainerHeight (this.blockContainer);
};
UIStringUtil.calculateStyledStringLineWidth = function (str, cssClassName) {
	this.init ();
	this.resetLineContainer ();
	this.lineContainer.className = cssClassName;
	this.lineContainer.appendChild (document.createTextNode (str));
	return this.getContainerWidth (this.lineContainer);
};
UIStringUtil.calculateStyledStringLineHeight = function (str, cssClassName) {
	this.init ();
	this.resetLineContainer ();
	this.lineContainer.className = cssClassName;
	this.lineContainer.appendChild (document.createTextNode (str));
	return this.getContainerHeight (this.lineContainer);
};
UIStringUtil.calculateStyledStringBlockHeight = function (str, width, cssClassName) {
	this.init ();
	this.resetBlockContainer ();
	this.blockContainer.className = cssClassName;
	this.blockContainer.style.width = width + "px";
	this.blockContainer.style.overflow = "scroll";
	this.blockContainer.appendChild (document.createTextNode (str));
	return this.getContainerHeight (this.blockContainer);
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

// written by Dean Edwards, 2005
// with input from Tino Zijdel

// http://dean.edwards.name/weblog/2005/10/add-event/

function addEvent(element, type, handler) {
	// assign each event handler a unique ID
	if (!handler.$$guid) handler.$$guid = addEvent.guid++;
	// create a hash table of event types for the element
	if (!element.events) element.events = {};
	// create a hash table of event handlers for each element/event pair
	var handlers = element.events[type];
	if (!handlers) {
		handlers = element.events[type] = {};
		// store the existing event handler (if there is one)
		if (element["on" + type]) {
			handlers[0] = element["on" + type];
		}
	}
	// store the event handler in the hash table
	handlers[handler.$$guid] = handler;
	// assign a global event handler to do all the work
	element["on" + type] = handleEvent;
};
// a counter used to create unique IDs
addEvent.guid = 1;

function removeEvent(element, type, handler) {
	// delete the event handler from the hash table
	if (element.events && element.events[type]) {
		delete element.events[type][handler.$$guid];
	}
};

function handleEvent(event) {
	var returnValue = true;
	// grab the event object (IE uses a global event object)
	event = event || fixEvent(window.event);
	// get a reference to the hash table of event handlers
	var handlers = this.events[event.type];
	// execute each event handler
	for (var i in handlers) {
		this.$$handleEvent = handlers[i];
		if (this.$$handleEvent(event) === false) {
			returnValue = false;
		}
	}
	return returnValue;
};

function fixEvent(event) {
	// add W3C standard event methods
	event.preventDefault = fixEvent.preventDefault;
	event.stopPropagation = fixEvent.stopPropagation;
	return event;
};
fixEvent.preventDefault = function() {
	this.returnValue = false;
};
fixEvent.stopPropagation = function() {
	this.cancelBubble = true;
};

